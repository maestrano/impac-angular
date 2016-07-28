module = angular.module('impac.components.widgets.accounts-balance-sheet',[])

module.controller('WidgetAccountsBalanceSheetCtrl', ($scope, $q, ImpacWidgetsSvc, ImpacMainSvc, ImpacUtilities, $translate) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.datesPickerDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.datesPickerDeferred.promise
  ]

  $scope.datesPickerTemplate = """
  <div class="row text-right">
    <div class="col-xs-6">
      <to-date>
    </div>
    <div class="col-xs-6">
      <from-date>
    </div>
  </div>
  """

  $scope.ascending = true
  $scope.sortedColumn = 'account'

  # Init dates
  # --------------------------------------
  initDates = ->
    $scope.fromDate = w.metadata.hist_parameters.from
    $scope.toDate = w.metadata.hist_parameters.to
    $scope.keepToday = w.metadata.hist_parameters.keep_today

  # For backward compatibility reasons, this widget must at all cases send hist parameters to the backend.
  unless w.metadata? && w.metadata.hist_parameters?
    w.metadata ||= {}
    w.metadata.hist_parameters = {
      to: moment().format('YYYY-MM-DD')
      keep_today: true
      period: 'RANGE'
    }
    ImpacMainSvc.load().then( (config) ->
      fyEndMonth = parseInt(config.currentOrganization.financial_year_end_month) || 6
      w.metadata.hist_parameters.from = moment(ImpacUtilities.financialYearDates(fyEndMonth).end, 'YYYY-MM-DD').subtract(1, 'year').format('YYYY-MM-DD')
      initDates()
    )
  else
    initDates()


  # Widget specific methods
  # --------------------------------------
  # $scope.periodOptions = [
  #   {label: "Year", value: "YEARLY"},
  #   {label: "Quarter", value: "QUARTERLY"},
  #   {label: "Month", value: "MONTHLY"},
  #   {label: "Week", value: "WEEKLY"},
  #   {label: "Day", value: "DAILY"},
  # ]
  # $scope.period = angular.copy $scope.periodOptions[2]
  w.initContext = ->
    # if w.content? && w.content.period? && _.contains(_.pluck($scope.periodOptions, 'value'), w.content.period)
    #   $scope.period = angular.copy _.find $scope.periodOptions, ((o) -> o.value == w.content.period)

    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)
      $scope.dates = w.content.dates
      $scope.unCollapsed = w.metadata.unCollapsed || []

      $scope.categories = []
      translateCategories(Object.keys(w.content.summary))

    initDates()
    sortData()

  $scope.toggleCollapsed = (categoryName) ->
    if categoryName?
      if _.find($scope.unCollapsed, ((name) -> categoryName == name))
        $scope.unCollapsed = _.reject($scope.unCollapsed, (name) ->
          name == categoryName
        )
      else
        $scope.unCollapsed.push(categoryName)
      ImpacWidgetsSvc.updateWidgetSettings(w,false)

  $scope.isCollapsed = (categoryName) ->
    if categoryName?
      if _.find($scope.unCollapsed, ((name) -> categoryName == name))
        return false
      else
        return true

  translateCategories = (categories) ->
    _.map categories, (category) ->
      $translate('impac.widget.account_balance_sheets.' + category.toLowerCase()).then(
        (translation) ->
          $scope.categories.push({label: translation, key: category})

        (translationId) ->  # If there is no translation, keep the original
          $scope.categories.push({label: category.toLowerCase(), key: category})
      )

  sortAccountsBy = (getElem) ->
    angular.forEach($scope.categories, (cat) ->
      sElem = w.content.summary[cat]
      if sElem.accounts
        sElem.accounts.sort (a, b) ->
          res = if getElem(a) > getElem(b) then 1
          else if getElem(a) < getElem(b) then -1
          else 0
          res *= -1 unless $scope.ascending
          return res
    )

  sortData = ->
    if $scope.sortedColumn == 'account'
      sortAccountsBy( (el) -> el.name )
    else if $scope.sortedColumn == 'total1'
      sortAccountsBy( (el) -> el.totals[1] )
    else if $scope.sortedColumn == 'total2'
      sortAccountsBy( (el) -> el.totals[0] )

  $scope.sort = (col) ->
    if $scope.sortedColumn == col
      $scope.ascending = !$scope.ascending
    else
      $scope.ascending = true
      $scope.sortedColumn = col
    sortData()


  # Mini-settings objects
  # handles the saving of collapsed / uncollapsed list groups.
  # --------------------------------------
  unCollapsedSetting = {}
  unCollapsedSetting.initialized = false

  unCollapsedSetting.initialize = ->
    unCollapsedSetting.initialized = true

  unCollapsedSetting.toMetadata = ->
    {unCollapsed: $scope.unCollapsed}

  w.settings.push(unCollapsedSetting)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetAccountsBalanceSheet', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsBalanceSheetCtrl'
  }
)

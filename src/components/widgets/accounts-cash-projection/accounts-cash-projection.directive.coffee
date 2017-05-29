module = angular.module('impac.components.widgets.accounts-cash-projection', [])
module.controller('WidgetAccountsCashProjectionCtrl', ($scope, $q, $filter) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise,
    $scope.timePeriodDeferred.promise
  ]

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = w.content?
    
    myChart = Highcharts.chart 'cashProjectionChart', {
      chart: 
        type: 'line'
        zoomType: 'x'
        spacingTop: 20
      title: null
      legend:
        layout: 'vertical'
        align: 'left'
        verticalAlign: 'middle'
      xAxis:
        startOnTick: false
        minPadding: 0
        tickInterval: 1
        labels:
          formatter: ->
            $filter('mnoDate')(w.content.chart.labels[this.value], getPeriod())
        plotLines: [{
          color: 'rgba(0, 85, 255, 0.2)'
          value: getTodayMarker()
          width: 1
          label:
            text: null
            verticalAlign: 'top'
            textAlign: 'center'
            rotation: 0
            y: -5
        }]
      yAxis:
        title: null
        startOnTick: true
        minPadding: 0
        labels:
          formatter: ->
            $filter('mnoCurrency')(this.value, w.metadata.currency, false, 0)
      series: w.content.chart.series
    }

  getPeriod = ->
    w.metadata? && w.metadata.hist_parameters? && w.metadata.hist_parameters.period || 'MONTHLY'

  getTodayMarker = ->
    projection_date = _.find(w.content.chart.labels, (label)-> moment(label) >= moment().startOf('day'))
    _.indexOf(w.content.chart.labels, projection_date)

  # Widget is ready: can trigger the "wait for settings to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)
module.directive('widgetAccountsCashProjection', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsCashProjectionCtrl'
  }
)

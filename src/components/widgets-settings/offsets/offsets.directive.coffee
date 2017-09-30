module = angular.module('impac.components.widgets-settings.offsets',[])

module.directive('settingOffsets', ($templateCache, ImpacUtilities) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
      offsetsKey: '@'
      initialOffsets: '='
      currency: '='
      intervalsCount: '='
      period: '='
      showIntervalsMult: '='
      textPlaceholder: '@?'
    },
    template: $templateCache.get('widgets-settings/offsets.tmpl.html'),
    
    link: (scope) ->
      w = scope.parentWidget

      authorized_regex = new RegExp("^(\\{|\\d|\\}|\\/|\\+|-|\\*|\\(|\\)|\\s|\\.)*$")

      setting =
        key: "offsets-#{scope.offsetsKey}"

      setting.initialize = ->
        scope.offsets = []
        for offsetValue in (scope.initialOffsets || [])
          scope.offsets.push offsetValue
        scope.offsetFormula = ""
        scope.periodWord = ImpacUtilities.getPeriodWord(scope.period)
        scope.placeholder = placeholder(scope.period || 'MONTHLY')

      setting.toMetadata = ->
        metadata = { offset: {} }
        metadata.offset[scope.offsetsKey] = scope.offsets unless _.isEmpty(scope.offsets)
        metadata

      scope.addOffset = ->
        result = computedFormula()
        scope.offsets.push(result) if result
        scope.offsetFormula = ""

      scope.removeOffset = (offsetIndex) ->
        scope.offsets.splice(offsetIndex, 1)

      scope.addOffsetOnEnter = (event) ->
        scope.addOffset() if event.keyCode == 13
        
      placeholder = (inputPeriod) ->
        return scope.textPlaceholder if scope.textPlaceholder?
        period = inputPeriod.charAt(0).toUpperCase() + inputPeriod.slice(1).toLowerCase()
        "#{period} adjustment"

      computedFormula = ->
        eval(scope.offsetFormula) if scope.offsetFormula.match(authorized_regex)


      w.settings.push(setting) if w
      # Setting is ready: trigger load content
      # ------------------------------------
      scope.deferred.resolve(setting)
  }
)

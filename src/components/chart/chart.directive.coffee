# chart.js charting attribute directive.
angular
  .module('impac.components.chart',[])
  .directive('dhbChart', ($templateCache, $compile, $timeout, $log) ->
    return {
      restrict: 'A',
      scope: {
        widgetRendered: '='
        deferred: '='
      },
      template: $templateCache.get('chart/chart.tmpl.html'),
      link: (scope,elem,attr) ->
        options = {
          bezierCurve: true,
          pointDotRadius : 3,
          responsive: true,
          scaleShowLabels : true,
          scaleShowLabelBackdrop : true,
          scaleBeginAtZero: true,
          scaleShowGridLines: true,
        }

        # myChart = null
        scope.draw = (data) ->
          if !_.isEmpty(data.options)
            angular.extend(options,data.options)

          ctx = angular.element('#myChart').get(0).getContext("2d")

          # $timeout will make sure the DOM is rendered before calling "new Chart",
          # which is actually drawing the chart in the prepared canvas
          $timeout ->
            switch data.chartType
              when 'Bar'
                new Chart(ctx).Bar(data.data,options)
              when 'Line'
                new Chart(ctx).Line(data.data,options)
              when 'Pie'
                angular.extend(options, {tooltipFixed: true})
                new Chart(ctx).Pie(data.data,options)


        # Triggered by widget.format()
        # ------------------------------------
        scope.widgetRendered.then(
          (success) ->
            $log.warn('chart promise has been resolved: use notify instead')
          (error) ->
            $log.error(error)
          (notifiedData) ->
            scope.draw(notifiedData)
        )


        # Setting is ready: trigger load content
        # ------------------------------------
        scope.deferred.resolve('chart ready')
    }
  )

# chart.js charting attribute directive.
angular
  .module('impac.components.chart',[])
  .directive('impacChart', ($timeout, $log, ChartFormatterSvc) ->
    return {
      restrict: 'A',
      scope: {
        drawTrigger: '='
        deferred: '='
      },
      link: (scope,elem,attr) ->
        # Draw a chart in the canvas
        # (ChartJs way of drawing a chart is to create a new Chart() element in the canvas context)
        # ------------------------------------
        scope.draw = (chartData) ->

          angular.merge(chartData.options, {
            scales: {
              xAxes: [{
                display: false
              }]
            }
          }) if chartData.options.showXLabels? && !chartData.options.showXLabels

          # TODO update chart instead of recreating it?
          # canvas has to be removed/appended to be redrawned without superposition
          elem.children().remove(0) if elem.children().length > 0
          elem.append('<canvas></canvas>')
          canvas = elem.children()[0]
          ctx = canvas.getContext("2d")

          new Chart(ctx, chartData)


        # Triggered by widget.format()
        # ------------------------------------
        scope.drawTrigger.then(
          (success) ->
            $log.warn('chart promise has been resolved: use notify instead')
          (error) ->
            $log.error(error)
          (chartData) ->
            scope.draw(chartData)
        )

        # Chart is ready: trigger load content
        # ------------------------------------
        scope.deferred.resolve('chart ready')
    }
  )

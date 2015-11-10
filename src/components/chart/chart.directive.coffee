# chart.js charting attribute directive.
angular
  .module('impac.components.chart',[])
  .directive('impacChart', ($log) ->
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

          # canvas has to be removed/appended to be redrawned without superposition
          if elem.children().length > 0
            elem.children().remove(0)
            # On dashboard load, there will be no animation to avoid the canvas to be only partially drawn
            # Thus, we set responsiveAnimationDuration only when a chart was already defined before
            chartData.options.responsiveAnimationDuration = 1000

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

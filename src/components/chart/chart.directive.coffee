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
        angular.merge Chart.defaults.global, {
          defaultColor: ChartFormatterSvc.getColor(0)
          responsiveAnimationDuration: 1000
          tooltips: {
            titleFontFamily: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif"
            bodyFontFamily: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif"
            footerFontFamily: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif"
          }
          elements: {
            point: {
              hitRadius: 8
              hoverRadius: 8
            }
            line: {
              tension: 0
              borderWidth: 2
            }
          }
        }

        angular.merge Chart.defaults.scale, {
          ticks: {
            minRotation: 0
            maxRotation: 0
            fontFamily: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif"
          }
          scaleLabel: {
            fontFamily: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif"
          }
        }

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

# chart.js charting attribute directive.
angular
  .module('impac.components.chart',[])
  .directive('impacChart', ($log, $window) ->
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
          if chartData.options.showXLabels? && !chartData.options.showXLabels
            angular.merge(chartData.options, {
              scales: {
                xAxes: [{
                  display: false
                }]
              }
            })

          # canvas has to be removed/appended to be redrawned without superposition
          if elem.children().length > 0
            elem.children().remove(0)
            # On dashboard load, there will be no animation to avoid the canvas to be only partially drawn
            # Thus, we set responsiveAnimationDuration only when a chart was already defined before
            # REMOVED / SOMETIMES CHART IS NOT DRAWN COMPLETELY...
            # chartData.options.responsiveAnimationDuration = 1000

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
            userAgent = $window.navigator.userAgent

            # Previously, this hack was only for Safari,
            # then we activated it for chrome after release of version 51,
            # now it becomes the default behaviour as IE11 has shown some unstability in the display of charts
            # waitUntilVisible = ((userAgent.indexOf('Safari') != -1) || (userAgent.indexOf('Chrome') != -1))
            waitUntilVisible = true

            # Chart.js
            if waitUntilVisible
              timeoutUntilVisible = () ->
                # Use jquery function to detect if the canvas container is visible
                visible = $(elem).is(':visible')
                if visible
                  # Container is visible -> draw the canvas
                  # console.log 'CHART VISIBLE: draw the canvas'
                  scope.draw(chartData)
                else
                  setTimeout ->
                    # debugger
                    # console.log 'CHART NOT VISIBLE: waiting until container is visible'
                    timeoutUntilVisible()
                  , 100 # An optimized digest cycle is less than 25ms

              timeoutUntilVisible()
            else
              scope.draw(chartData)
        )

        # Chart is ready: trigger load content
        # ------------------------------------
        scope.deferred.resolve('chart ready')
    }
  )

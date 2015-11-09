# chart.js charting attribute directive.
angular
  .module('impac.components.chart',[])
  .directive('impacChart', ($timeout, $log) ->
    return {
      restrict: 'A',
      scope: {
        drawTrigger: '='
        deferred: '='
      },
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

        # Draw a chart in the canvas
        # (ChartJs way of drawing a chart is to create a new Chart() element in the canvas context)
        # ------------------------------------
        scope.draw = (data) ->
          if !_.isEmpty(data.options)
            angular.extend(options,data.options)

          args = {data: data.data, options: options}

          # canvas has to be removed/appended to be redrawned without superposition
          elem.children().remove(0) if elem.children().length > 0
          elem.append('<canvas></canvas>')
          canvas = elem.children()[0]
          ctx = canvas.getContext("2d")

          switch data.chartType
            when 'Bar'
              Chart.Bar(ctx, args)
            when 'Line'
              Chart.Line(ctx, args)
            when 'Pie'
              # angular.extend(options, {tooltipFixed: true})
              Chart.Doughnut(ctx, args)

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

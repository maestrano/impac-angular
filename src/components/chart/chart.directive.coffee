# chart.js charting attribute directive.
angular
  .module('impac.components.chart',[])
  .directive('impacChart', ($templateCache, $compile, $timeout, $log, $q) ->
    return {
      restrict: 'A',
      scope: {
        drawTrigger: '='
        deferred: '='
      },
      template: '<canvas></canvas>',
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
          # $timeout will wait for the DOM to be rendered before drawing the chart
          $timeout ->
            if !_.isEmpty(data.options)
              angular.extend(options,data.options)

            canvas = elem.children().get(0)
            ctx = canvas.getContext("2d")

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

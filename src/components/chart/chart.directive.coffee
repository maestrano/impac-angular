# chart.js charting attribute directive.
angular
  .module('impac.components.chart',[])
  .directive('dhbChart', ($templateCache, $compile, $timeout, $log, $q) ->
    return {
      restrict: 'A',
      scope: {
        chartVisible: '='
        drawTrigger: '='
        deferred: '='
      },
      template: '<canvas id="myChart"></canvas>',
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

        scope.draw = (data) ->
          # $timeout will make sure the DOM is rendered before drawing the chart
          $timeout ->
            if !_.isEmpty(data.options)
              angular.extend(options,data.options)

            canvas = angular.element('#myChart').get(0)
            ctx = canvas.getContext("2d")

            switch data.chartType
              when 'Bar'
                new Chart(ctx).Bar(data.data,options)
              when 'Line'
                new Chart(ctx).Line(data.data,options)
              when 'Pie'
                angular.extend(options, {tooltipFixed: true})
                new Chart(ctx).Pie(data.data,options)


        scope.dataAvailable = $q.defer()

        # 1st chart draw
        # ------------------------------------
        $q.all([scope.dataAvailable.promise, scope.chartVisible]).then(
          (success) ->
            chartData = success[0]
            scope.draw(chartData)
            scope.drawnOnce = true
        )

        # All the following chart draws
        # ------------------------------------
        scope.drawTrigger.then(
          (success) ->
            $log.warn('chart promise has been resolved: use notify instead')
          (error) ->
            $log.error(error)
          (chartData) ->
            if scope.drawnOnce
              scope.draw(chartData)
            else
              scope.dataAvailable.resolve(chartData)
        )

        # Chart is ready: trigger load content
        # ------------------------------------
        scope.deferred.resolve('chart ready')
    }
  )

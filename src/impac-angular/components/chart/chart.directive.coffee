# chart.js charting attribute directive.
angular
  .module('impac.components.chart',[])
  .directive('dhbChart', ($templateCache, $compile, $timeout) ->
    return {
      restrict: 'A',
      scope: {
        data: '='
      },
      template: $templateCache.get('chart.html'),
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

        myChart = null
        scope.draw = ->
          if !_.isEmpty(scope.data.options)
            angular.extend(options,scope.data.options)

          if myChart != null then myChart.destroy()
          canvas = elem.children().get(0)
          ctx = canvas.getContext("2d")
          switch scope.data.chartType
            # when 'Doughnut' then myChart = new Chart(ctx).Doughnut(scope.data.data,options)
            when 'Bar' then myChart = new Chart(ctx).Bar(scope.data.data,options)
            when 'Line' then myChart = new Chart(ctx).Line(scope.data.data,options)
            when 'Pie'
              angular.extend(options, {tooltipFixed: true})
              myChart = new Chart(ctx).Pie(scope.data.data,options)
          newWidth = angular.element(canvas).parent().width()

        # Redraw the chart when data changes
        scope.$watch((-> scope.data)
          ,(value) ->
            if value?
              $timeout((-> scope.draw()),100)
        ,true)
    }
  )

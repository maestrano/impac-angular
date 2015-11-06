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
      template: '<canvas height="1" width="1"></canvas>',
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

          # canvas has to be removed/appended to be redrawned without superposition
          elem.children().get(0).remove()
          elem.append('<canvas></canvas>')
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


        getInvisibleParents = (elemsArray, element) ->
          if angular.isDefined(element.parent) && element.parent()?
            parent = element.parent()
            try
              elemsArray.push(parent) if parent.css('display')=='none'
              getInvisibleParents(elemsArray, parent)
            catch e
              return elemsArray
          else
            return elemsArray

        waitForParentsAndDraw = (parentsArray, chartData) ->
          for p in parentsArray
            scope.$watch (-> p.css('display')), ->
              _.remove(parentsArray, (p)->
                p.css('display')!='none'
              )
              scope.draw(chartData) if _.isEmpty parentsArray

        checkVisibilityAndDraw = (chartData) ->
          parentsArray = getInvisibleParents([], elem)
          if parentsArray.length == 0
            scope.draw(chartData)
          else
            waitForParentsAndDraw(parentsArray, chartData)

        # Triggered by widget.format()
        # ------------------------------------
        scope.drawTrigger.then(
          (success) ->
            $log.warn('chart promise has been resolved: use notify instead')
          (error) ->
            $log.error(error)
          (chartData) ->
            checkVisibilityAndDraw(chartData)
        )

        # Chart is ready: trigger load content
        # ------------------------------------
        scope.deferred.resolve('chart ready')
    }
  )

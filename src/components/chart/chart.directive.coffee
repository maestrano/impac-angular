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


        hasVisibleParents = (element) ->
          if angular.isDefined(element.parent) && element.parent()? && angular.isDefined(element.parent().css)
            parent = element.parent()
            try
              return (parent.css('display') != 'none') && hasVisibleParents(parent)
            catch e
              # There will be an error when we reach the root element:
              # TypeError: Cannot read property 'defaultView'
              # ... in this case, we know that all the elements below are visible, so "true" can be returned
              return true
          else
            return true

        checkVisibilityAndDraw = (chartData) ->
          if hasVisibleParents(elem)
            scope.draw(chartData)
          else
            $timeout (-> checkVisibilityAndDraw(chartData)), 50

        # Triggered by widget.format()
        # ------------------------------------
        scope.drawTrigger.then(
          (success) ->
            $log.warn('chart promise has been resolved: use notify instead')
          (error) ->
            $log.error(error)
          (chartData) ->
            # wait for the current digest cycle to complete
            $timeout -> checkVisibilityAndDraw(chartData)
        )

        # Chart is ready: trigger load content
        # ------------------------------------
        scope.deferred.resolve('chart ready')
    }
  )

angular
  .module('impac.services.chart-formatter', [])
  .service('ChartFormatterSvc', (ImpacTheming, $filter, $window, $document, ImpacDashboardsSvc) ->

    _self = @

    COLORS = ImpacTheming.get().chartColors

    # on browser window blur event, remove any lingering chartjs-tooltips from the DOM.
    $window.onblur = ->
      angular.element($document[0].getElementById('chartjs-tooltip')).remove()

    # Returns the color defined for positive values
    @getPositiveColor = ->
      return COLORS.positive

    # Returns the color defined for negative values
    @getNegativeColor = ->
      return COLORS.negative

    # Returns the color defined for "others" value
    @getOthersColor = ->
      return COLORS.others

    # Returns a color from the array retrieved from Maestrano Rails app (set in config files)
    @getColor = (index) ->
      return COLORS.array[index%COLORS.array.length]

    # Removes the # from an HTML color value
    cutHex = (htmlColor) ->
      return htmlColor.replace(/#/,'')

    hexToR = (htmlColor) ->
      return parseInt((cutHex(htmlColor)).substring(0,2),16)

    hexToG = (htmlColor) ->
      return parseInt((cutHex(htmlColor)).substring(2,4),16)

    hexToB = (htmlColor) ->
      return parseInt((cutHex(htmlColor)).substring(4,6),16)

    hexToRGB = (htmlColor) ->
      return [hexToR(htmlColor),hexToG(htmlColor),hexToB(htmlColor)].join(",")

    lightenColor = (htmlColor, alpha) ->
      return "rgba(#{hexToRGB(htmlColor)},#{alpha})"


    # Configure ChartJs global options
    # ----------
    @customTooltip = (tooltip) ->
      # Find the tooltip
      tooltipEl = angular.element('#chartjs-tooltip')
      if (!tooltipEl[0])
        angular.element('body').append('<div id="chartjs-tooltip"></div>')
        tooltipEl = angular.element('#chartjs-tooltip')

      # Hide if no tooltip
      if (!tooltip.opacity)
        tooltipEl.css({
          opacity: 0.5
        })
        return

      # Set caret Position
      tooltipEl.removeClass('above below no-transform')
      if (tooltip.yAlign)
        tooltipEl.addClass(tooltip.yAlign)
      else
        tooltipEl.addClass('no-transform')

      # Set Text
      if (tooltip.body)
        innerHtml = _.compact([
          (tooltip.beforeTitle || []).join('<br/>'), (tooltip.title || []).join('<br/>'), (tooltip.afterTitle || []).join('<br/>'), (tooltip.beforeBody || []).join('<br/>'), (tooltip.body || []).join('<br/>'), (tooltip.afterBody || []).join('<br/>'), (tooltip.beforeFooter || [])
          .join('<br/>'), (tooltip.footer || []).join('<br/>'), (tooltip.afterFooter || []).join('<br/>')
        ])
        tooltipEl.html(innerHtml.join('<br/>'))

      # Alignment
      canvasEl = angular.element(this._chart.canvas)
      offset = canvasEl.offset()

      # Avoid mouse glitches
      canvasEl.bind 'mouseleave', (event) ->
        tooltipEl.remove() unless event.relatedTarget.id == 'chartjs-tooltip'

      tooltipEl.bind 'mouseleave', (event) ->
        tooltipEl.remove() unless event.relatedTarget.tagName == 'CANVAS'


      # Display, position, and set styles for font
      tooltipEl.css({
        'background-color': '#17262d'
        color: 'white'

        opacity: 1
        transition: 'opacity 0.5s, top 0.5s, left 0.5s'

        position: 'absolute'
        width: tooltip.width ? "#{tooltip.width}px" : 'auto'
        left: "#{offset.left + tooltip.x + 10}px"
        top: "#{offset.top + tooltip.y + 10}px"

        fontFamily: tooltip._fontFamily
        fontSize: tooltip.fontSize
        fontStyle: tooltip._fontStyle
        padding: "#{tooltip.yPadding}px #{tooltip.xPadding}px"
        'border-radius': '2px'
      })

    angular.merge Chart.defaults.global, {
      defaultColor: _self.getColor(0)
      # responsiveAnimationDuration: 1000
      tooltips: {
        titleFontFamily: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif"
        bodyFontFamily: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif"
        footerFontFamily: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif"

        enabled: false
        custom: _self.customTooltip
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
        beginAtZero: true
        minRotation: 0
        # maxRotation: 0
        fontFamily: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif"
      }
      scaleLabel: {
        fontFamily: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif"
      }
    }

    @setTooltipsTextLayout = (opts, showSerieInTitle=false) ->
      angular.merge opts, {
        tooltips: {
          callbacks: {
            title: (context, data) ->
              unless showSerieInTitle
                return data.labels[context[0].index]
              else
                title = [data.labels[context[0].index]]
                title.push data.datasets[context[0].datasetIndex].label if data.datasets[context[0].datasetIndex].label
                return title.join(' | ')

            label: (context, data) ->
              currency = opts.currency || ImpacDashboardsSvc.getCurrentDashboard().currency
              unless currency=='hide'
                return $filter('mnoCurrency')(data.datasets[context.datasetIndex].data[context.index], currency)
              else
                return data.datasets[context.datasetIndex].data[context.index]
          }
        }
      }


    # Line Chart of several datasets | versusMode can be used to force positive/negative colors
    # ----------
    # inputDataArray:
    # [{
    #   title: "Serie",
    #   labels: ["date1","date2"],
    #   values: [15.25,7.4]
    # }]
    # versusMode: put the negative dataset first
    @lineChart = (inputDataArray, opts={}, versusMode=false) ->
      _self.setTooltipsTextLayout(opts, true)

      index = 0
      isFilled = inputDataArray.length == 1

      singleValue = false
      if inputDataArray[0].labels.length < 2
        # if the values array have only one entry, we double it to avoid the display of a single point on the chart
        singleValue = true
        inputDataArray[0].labels.push inputDataArray[0].labels[0]

      # Defaut when several datasets or single dataset but with only one value: straight lines without point dot
      if inputDataArray.length > 1 || (opts.pointDot? && !opts.pointDot) || singleValue
        angular.merge(opts, {
          elements: {
            point: {
              radius: 0.0001
            }
            line: {
              tension: 0.3
            }
          }
        })

      return {
        type: 'line',
        options: opts,
        data: {
          labels: inputDataArray[0].labels,
          datasets: _.map inputDataArray, (inputData) ->
            if singleValue
              inputData.values.push inputData.values[0]

            if versusMode
              if index == 0
                color = _self.getNegativeColor()
              else
                color = _self.getPositiveColor()
            else
              color = _self.getColor(index)
            index++
            return {
              label: inputData.title
              data: inputData.values

              fill: isFilled

              backgroundColor: lightenColor(color,0.3)
              borderColor: color
              pointBorderColor: color
              pointBackgroundColor: color
              pointHoverBackgroundColor: 'rgb(255,255,255)'
            }
        }
      }


    # TODO refactor barChart and combinedChart (now we have chartjs v2.0...)
    # Bar Chart of one dataset with several values (eg: different coloured bars for several accounts)
    # ----------
    # inputData:
    # {
    #   labels: ["Account1","Account2"],
    #   values: [15.25,7.4]
    # }
    # positivesOnly: if true (default), negative bars will be turned into their opposite
    @barChart = (inputData, opts={}, positivesOnly=true) ->
      _self.setTooltipsTextLayout(opts)

      index = 0
      colors = []
      for value in inputData.values
        inputData.values[index] = Math.abs(value) if positivesOnly
        colors.push(_self.getColor(index))
        index++

      return {
        type: 'bar'
        options: opts
        data: {
          labels: inputData.labels
          datasets: [{ backgroundColor: colors, data: inputData.values }]
        }
      }


    # Bar Chart of several datasets with several values each
    # ----------
    # inputData:
    #   labels: ['Company A', 'Company B']
    #   datasets:
    #     [
    #       {title: 'ASSET', values: [1566,56156]}
    #       {title: 'LIABILITY', values: [67868,686]}
    #     ]
    # positivesOnly: if true (default), negative bars will be turned into their opposite
    @combinedBarChart = (inputData, opts={}, positivesOnly=true, versusMode=false) ->
      _self.setTooltipsTextLayout(opts, true)

      index = 0
      result = {
        type: 'bar',
        options: opts,
        data: {
          labels: inputData.labels
          datasets: _.map inputData.datasets, (dataset) ->

            color = _self.getColor(index)
            if versusMode
              if index == 0
                color = _self.getNegativeColor()
              else
                color = _self.getPositiveColor()
            index++

            if positivesOnly
              for value in dataset.values
                value = Math.abs(value)

            return {
              label: dataset.title,
              data: dataset.values,
              backgroundColor: color,
            }
        }
      }
      return result


    # inputData:
    # [ {
    #     label: "Customer 1",
    #     value: 1550.12
    # ] }
    @pieChart = (inputData, opts={}, versusMode=false) ->
      _self.setTooltipsTextLayout(opts)

      index=0
      colors=[]
      if versusMode
        colors.push(_self.getNegativeColor())
        for data in inputData
          colors.push(_self.getPositiveColor()) unless index==0
          index++
      else
        for data in inputData
          colors.push(_self.getColor(index))
          index++

      {
        type: 'doughnut',
        options: opts,
        data: {
          datasets: [
            {
              data: _.map inputData, ( (data) -> Math.abs(data.value) )
              backgroundColor: colors
            }
          ]
          labels: _.map inputData, ( (data) -> data.label )
        }
      }

    return
)

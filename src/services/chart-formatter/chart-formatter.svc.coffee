angular
  .module('impac.services.chart-formatter', [])
  .service('ChartFormatterSvc', (ImpacTheming) ->

    _self = @

    COLORS = ImpacTheming.get().chartColors

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
    angular.merge Chart.defaults.global, {
      defaultColor: _self.getColor(0)
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
      index = 0
      isFilled = inputDataArray.length == 1

      # Defaut when several datasets: straight lines without point dot
      if inputDataArray.length > 1 || (opts.pointDot? && !opts.pointDot)
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
              pointHoverBackgroundColor: 'rgb(0,0,0,)'
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
    @combinedBarChart = (inputData, opts={}, positivesOnly=true) ->
      index = 0
      result = {
        type: 'bar',
        options: opts,
        data: {
          labels: inputData.labels
          datasets: _.map inputData.datasets, (dataset) ->
            color = _self.getColor(index)
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
      colors = []
      index = 0

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
              data: _.map inputData, ( (data) -> data.value )
              backgroundColor: colors
            }
          ]
          labels: _.map inputData, ( (data) -> data.label )
        }
      }

    return
)

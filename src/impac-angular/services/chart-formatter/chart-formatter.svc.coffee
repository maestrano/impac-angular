angular
  .module('impac.services.chart-formatter', [])
  .service('ChartFormatterSvc', (ImpacTheming) ->

    _self = @

    COLORS = ImpacTheming.getChartColors()

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
      return {
        chartType: 'Line',
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
              label: inputData.title,
              data: inputData.values,
              fillColor: lightenColor(color,0.3),
              strokeColor: color,
              pointColor: color,
              pointStrokeColor: color,
              pointHighlightFill: color,
              pointHighlightStroke: lightenColor(color,0.3),
            }
        }
      }


    # Bar Chart of several datasets with only 1 value each (eg: different coloured bars for several accounts)
    # ----------
    # inputData:
    # {
    #   labels: ["Account1","Account2"],
    #   values: [15.25,7.4]
    # }
    # positivesOnly: if true (default), negative bars will be turned into their opposite
    @barChart = (inputData, opts={}, positivesOnly=true) ->
      index = 0
      return {
        chartType: 'Bar',
        options: opts,
        data: {
          labels: [""],
          datasets: _.map inputData.values, (value) ->
            color = _self.getColor(index)
            index++

            if !value?
              value = 0.0
              color = "rgba(0,0,0,0)"
            if positivesOnly && value < 0.0
              value = -value

            return {
              label: inputData.labels[index] || "",
              data: [value],
              fillColor: color,
              strokeColor: color,
              highlightFill: color,
              highlightStroke: color,
            }
        }
      }


    # inputData:
    # [ {
    #     label: "Customer 1",
    #     value: 1550.12
    # ] }
    @pieChart = (inputData, opts={}, versusMode=false) ->
      index = 0
      return {
        chartType: 'Pie',
        options: opts,
        data: _.map inputData, (data) ->
          if versusMode
            if index == 0
              color = _self.getNegativeColor()
            else
              color = _self.getPositiveColor()
          else
            color = _self.getColor(index)
          index++
          return {
            value: data.value,
            label: data.label,
            color: color,
            highlight: lightenColor(color,0.7),
          }
      }

    return
)

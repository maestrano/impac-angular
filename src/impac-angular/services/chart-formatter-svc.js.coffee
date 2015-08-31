angular
  .module('maestrano.analytics.chart-formatter-svc', [])
  .factory('ChartFormatterSvc', () ->

    service = {}

    # TODO: Colors should be stored by dashboard and retrieved in analytics services
    # We could populate dashboard.colors with default settings during the dashboard creation.
    # Then, the user could modify the colors palette of a dashboard, or import it from another dashboard
    #
    # Retrieved from Miscellaneous:
    # {
    #   positive: "#1de9b6",
    #   negative: "#7c4dff",
    #   array:
    #     [
    #       "#3fc4ff",
    #       "#ff8e01",
    #       "#c6ff00",
    #     ]
    # }
    COLORS = angular.toJson("{\"positive\":\"#3FC4FF\",\"negative\":\"#1DE9B6\",\"array\":[\"#1de9b6\",\"#7c4dff\",\"#ffc928\",\"#3fc4ff\",\"#ff8e01\",\"#c6ff00\",\"#d500fa\",\"#ff6e41\",\"#ffeb3c\",\"#ff1844\"]}")

    # Returns the color defined for positive values
    service.getPositiveColor = ->
      return COLORS.positive

    # Returns the color defined for negative values
    service.getNegativeColor = ->
      return COLORS.negative

    # Returns the color defined for "others" value
    service.getOthersColor = ->
      return COLORS.others

    # Returns a color from the array retrieved from Maestrano Rails app (set in config files)
    service.getColor = (index) ->
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
    service.lineChart = (inputDataArray, opts={}, versusMode=false) ->
      self = service
      index = 0
      return {
        chartType: 'Line',
        options: opts,
        data: {
          labels: inputDataArray[0].labels,
          datasets: _.map inputDataArray, (inputData) ->
            if versusMode
              if index == 0
                color = self.getNegativeColor()
              else
                color = self.getPositiveColor()
            else
              color = self.getColor(index)
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
    service.barChart = (inputData, opts={}, positivesOnly=true) ->
      self = service
      index = 0
      return {
        chartType: 'Bar',
        options: opts,
        data: {
          labels: [""],
          datasets: _.map inputData.values, (value) ->
            color = self.getColor(index)
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
    service.pieChart = (inputData, opts={}, versusMode=false) ->
      self = service
      index = 0
      return {
        chartType: 'Pie',
        options: opts,
        data: _.map inputData, (data) ->
          if versusMode
            if index == 0
              color = self.getNegativeColor()
            else
              color = self.getPositiveColor()
          else
            color = self.getColor(index)
          index++
          return {
            value: data.value,
            label: data.label,
            color: color,
            highlight: lightenColor(color,0.7),
          }
      }

    return service
)
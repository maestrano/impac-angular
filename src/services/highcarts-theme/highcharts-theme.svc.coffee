angular
.module('impac.services.highcharts-theme', [])
.service('HighchartsThemeService', (ImpacTheming) ->

  Highcharts.theme =
  colors: ImpacTheming.get().chartColors.array
  chart:
    backgroundColor: null
  title: style:
    fontSize: '16px'
    fontWeight: 'bold'
    textTransform: 'uppercase'
  tooltip:
    borderWidth: 0
    backgroundColor: 'rgba(219,219,216,0.8)'
    shadow: true
  legend: itemStyle:
    fontWeight: 'bold'
    fontSize: '13px'
  xAxis:
    labels: style: fontSize: '10px'
  yAxis:
    minorTickInterval: 'auto'
    title: style: textTransform: 'uppercase'
    labels: style: fontSize: '12px'
  plotOptions: candlestick: lineColor: '#404048'
  background2: '#F0F0EA'

  # Apply the theme
  Highcharts.setOptions Highcharts.theme

)

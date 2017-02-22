angular
  .module('impac.services.currency-rates', [])
  .service('ImpacCurrencyRatesSvc', ($log, $http, $filter, $q, $timeout, ImpacRoutes, ImpacMainSvc) ->

    _self = @

    #====================================
    # Getters
    #====================================

    @getSsoSessionId = ImpacMainSvc.getSsoSessionId

    @ratesForPeriod= (hist_parameters) ->
      currrencyRates = []
      currrencyRates.push({base_currency: 'USD', transaction_currency: 'AUD', date: moment.parse('2017-02-20'), rate: 1.30423})
      currrencyRates.push({base_currency: 'USD', transaction_currency: 'AUD', date: moment.parse('2017-02-17'), rate: 1.29898})
      currrencyRates.push({base_currency: 'USD', transaction_currency: 'AUD', date: moment.parse('2017-02-12'), rate: 1.30216})
      currrencyRates.push({base_currency: 'USD', transaction_currency: 'AUD', date: moment.parse('2017-02-10'), rate: 1.31136})
      return currrencyRates
 )

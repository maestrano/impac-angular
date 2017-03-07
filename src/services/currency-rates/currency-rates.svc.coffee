angular
  .module('impac.services.currency-rates', [])
  .service('ImpacCurrencyRatesSvc', ($log, $http, $filter, $q, $timeout, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc) ->

    _self = @

    #====================================
    # Getters
    #====================================

    @getSsoSessionId = ImpacMainSvc.getSsoSessionId
    @getCurrentDashboard = ImpacDashboardsSvc.getCurrentDashboard
    @getOrgUids = _.pluck _self.getCurrentDashboard().data_sources, 'uid'

    @locked = false

    @ratesForPeriod= (hist_parameters) ->
      unless @locked
        @locked = true

        params =
          sso_session: @getSsoSessionId
          engine: "currencies/currency_rates"
          metadata:
            organization_ids: @getOrgUids
            hist_parameters: hist_parameters

        url = formatShowQuery(ImpacRoutes.widgets.show(), params)

        $http.get(url).then(
          (response) ->
            rates = []
            if response? && response.data? && !_.isEmpty(response.data.content)
              for rate in response.data.content['currency_rates']
                rates.push rate

            $log.info("Impac! - CurrencyRatesSvc: ratesForPeriod params #{params}")
            return {organizations: params.metadata.organization_ids, currencyRates: rates }

          (err) ->
            $log.error('Impac! - CurrencyRatesSvc: Cannot retrieve current rates :', err)
            $q.reject(err)
        ).finally(-> _self.locked = false)

      else
        $log.warn "Impac! - CurrencyRatesSvc: ratesForPeriod locked. Trying again in 1s"
        $timeout (-> _self.ratesForPeriod(hist_parameters)), 1000

    #====================================
    # Context helpers
    #====================================

    formatShowQuery = (basePath, params) ->
      url = [basePath,decodeURIComponent( $.param( params ) )].join('?')
      return url

  #  @ratesForPeriod= (hist_parameters) ->
    #      org = ["org-fbbj"]
    #      currencyRates = []
    #      currencyRates.push({base_currency: 'USD', transaction_currency: 'AUD', date: moment.parse('2017-02-20'), rate: 1.30423})
    #      currencyRates.push({base_currency: 'USD', transaction_currency: 'AUD', date: moment.parse('2017-02-17'), rate: 1.29898})
    #      currencyRates.push({base_currency: 'USD', transaction_currency: 'AUD', date: moment.parse('2017-02-12'), rate: 1.30216})
    #      currencyRates.push({base_currency: 'USD', transaction_currency: 'AUD', date: moment.parse('2017-02-10'), rate: 1.31136})
    #      return {organizations: org, currencyRates: currencyRates}

    return @
  )

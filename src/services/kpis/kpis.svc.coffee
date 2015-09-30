angular
  .module('impac.services.kpis', [])
  .service('Kpis', ($log, $http, $filter, $q, ImpacLinking, ImpacRoutes, DhbAnalyticsSvc) ->

    _self = @

    @config = {}

    @load = (force=false) ->
      deferred = $q.defer()

      if _.isEmpty(@config) || force
        ImpacLinking.getSsoSession().then (success) ->
          _self.config.sso_session = success
          deferred.resolve(_self.config)
        ,(error) ->
          $log.error('impac-angular ERROR: Could not retrieve sso_session id')
          deferred.reject(error)

      else
        deferred.resolve(_self.config)

      return deferred.promise


    formatShowQuery = (basePath, endpoint, watchable, params) ->
      baseUrl = [basePath,endpoint,watchable].join('/')
      url = [baseUrl,decodeURIComponent( $.param( params ) )].join('?')
      return url

    # Retrieve all the available kpis from Impac!
    @index = (metadata=null) ->
      deferred = $q.defer()

      _self.load().then (success) ->
        params = {}
        params.sso_session = success.sso_session
        params.metadata = metadata if metadata?

        host = ImpacRoutes.impacKpisBasePath()

        url = [host,decodeURIComponent( $.param( params ) )].join('?')

        $http.get(url).then (response) ->
          deferred.resolve(response.data)
        ,(err) ->
          $log.error 'impac-angular ERROR: Could not retrieve KPI at: ' + kpi.endpoint, err
          deferred.reject(err)
      
      return deferred.promise


    # retrieves data for kpi from api
    @show = (kpi) ->
      deferred = $q.defer()

      _self.load().then (success) ->

        params = {}
        params.sso_session = success.sso_session
        params.target = kpi.target if kpi.target?
        params.metadata = kpi.settings if kpi.settings?
        params.extra_param = kpi.extra_param if kpi.extra_param?

        switch kpi.source
          when 'impac'
            host = ImpacRoutes.impacKpisBasePath()
          when 'local'
            host = ImpacRoutes.localKpisBasePath()

        url = formatShowQuery(host, kpi.endpoint, kpi.element_watched, params)

        $http.get(url).then(
          (response) ->
            kpi.data = response.data.kpi
            $log.debug 'KPI: ', kpi
            deferred.resolve(kpi)
          (err) ->
            $log.error 'impac-angular ERROR: Could not retrieve KPI at: ' + kpi.endpoint, err
            deferred.reject(err)
        )
      
      return deferred.promise


    @create = (endpoint, element_watched, extra_param=null) ->
      deferred = $q.defer()

      params = {
        endpoint: endpoint
        element_watched: element_watched
      }
      params.extra_param = extra_param if extra_param?

      url = ImpacRoutes.createKpiPath DhbAnalyticsSvc.getId()
      
      $http.post(url, params).then(
        (success) ->
          deferred.resolve(success.data)
          $log.debug 'success adding KPI: ', success
        (err) ->
          deferred.reject(err)
          $log.error 'impac-angular ERROR: Unable to add KPI ', err
      )

      return deferred.promise

    @update = (kpi, params) ->
      url = ImpacRoutes.updateKpiPath kpi.id

      filtered_param = {}
      filtered_param.name = params.name if params.name?
      filtered_param.settings = params.metadata if params.metadata?
      filtered_param.target = params.target if params.target?
      filtered_param.extra_param = params.extra_param if params.extra_param?

      if !_.isEmpty filtered_param
        $http.put(url, params).then (success) ->
          # TODO verify
          angular.extend(kpi, success.data)
          _self.show(kpi)
          $log.debug 'success updating KPI: ', success
        ,(err) ->
          $log.error 'impac-angular ERROR: Unable to update KPI ', err

    return @
  )

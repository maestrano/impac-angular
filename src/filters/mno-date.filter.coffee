angular.module('impac.filters.mno-date', []).filter('mnoDate', ($filter) ->
  (date_string, period) ->

    PERIODS = ['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY']
    if date_string?
      unless period? && _.includes(PERIODS, period.toUpperCase())
        period = 'MONTHLY'

      switch period.toUpperCase()
        when 'DAILY'
          return $filter('date')(date_string, 'dd MMM')
        when 'WEEKLY'
          return $filter('date')(date_string, 'dd MMM')
        when 'MONTHLY'
          return $filter('date')(date_string, 'MMM yyyy')
        when 'QUARTERLY'
          return $filter('date')(date_string, 'MMM yyyy')
        when 'YEARLY'
          return $filter('date')(date_string, 'yyyy')

    else
      return ""

)

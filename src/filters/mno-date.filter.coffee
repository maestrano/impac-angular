angular.module('impac.filters.mno-date', []).filter('mnoDate', ($filter) ->
  (date_string, period) ->

    PERIODS = ['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY']
    if date_string?
      unless period? && _.includes(PERIODS, period.toUpperCase())
        period = 'MONTHLY'

      switch period.toUpperCase()
        when 'DAILY'
          return $filter('momentDate')(date_string, 'mno-date-daily')
        when 'WEEKLY'
          return $filter('momentDate')(date_string, 'mno-date-weekly')
        when 'MONTHLY'
          return $filter('momentDate')(date_string, 'mno-date-monthly')
        when 'QUARTERLY'
          return $filter('momentDate')(date_string, 'mno-date-quarterly')
        when 'YEARLY'
          return $filter('momentDate')(date_string, 'mno-date-yearly')


    else
      return ""

)

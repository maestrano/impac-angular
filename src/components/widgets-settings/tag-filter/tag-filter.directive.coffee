module = angular.module('impac.components.widgets-settings.tag-filter',['ngTagsInput'])

module.directive('settingTagFilter', ($templateCache, $timeout) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
    },
    template: $templateCache.get('widgets-settings/tag-filter.tmpl.html'),

  link: (scope) ->
      w = scope.parentWidget

      setting = {}
      setting.key = "tag-filter"
      scope.settingsTags = []


      setting.initialize = ->
        $timeout ->
          loadRules()
          initiateAutoComplete()
          return true

      setting.toMetadata = ->

        # in v1, all rules are combined by OR, and all conditions within a rule a AND
        # TODO: Don't hard code Mongo field names in query
        filterQuery = {}
        filterQuery['condition'] = 'OR'
        filterQueryRules = []
        filterQuery['rules'] = filterQueryRules

        angular.forEach  scope.settingsTags, (settingsTag) ->
          filterQueryCondition = {}
          filterQueryCondition['condition'] = 'AND'
          filterQueryCondition['rules'] = []
          angular.forEach  settingsTag.tags, (filterItem) ->
            filterQueryCondition['rules'].push({'value': filterItem['text']})

          filterQueryRules.push (filterQueryCondition) if settingsTag.tags.length != 0

        if filterQuery['rules'].length==0 then filterQuery = {}

        return {filter_query: filterQuery}

      scope.switchOperator = ($event, rule) ->
        rule.operator = if rule.operator == "OR" then "AND" else "OR"

      # transform filter query in a more simple version for displaying in UI
      filterToSettingTags = (filterQuery) ->
        return if _.isEmpty(filterQuery)
        settingsTags = []
        angular.forEach filterQuery.rules, (filterQueryRule) ->
          settingRule = {}
          settingRule['operator'] ='OR'
          settingRule['tags'] = []
          angular.forEach filterQueryRule.rules, (filterQueryRuleCondition) ->
            settingRule['tags'].push({text: filterQueryRuleCondition['value']})
          settingsTags .push(settingRule)

        return settingsTags

      loadRules= ->
        return if _.isEmpty(w.metadata.filter_query)
        scope.settingsTags = filterToSettingTags (w.metadata.filter_query)

      initiateAutoComplete= ->
        tags = w.content.available_tags || []
        autotags = []
        for org, tag_hash of tags
          angular.forEach tag_hash['tag_references'], (tag_ref) ->
            angular.forEach tag_ref['tag_reference_values'], (tag) ->
              autotags.push({text: tag['value']})

        scope.loadTagList= (query) ->
          return $.grep(autotags, (e) -> e.text.toLowerCase().indexOf(query.toLowerCase()) > -1)

      scope.addRule = ->
        scope.settingsTags.push ({'operator': 'OR', 'tags': []})

      scope.delRule = (index) ->
        scope.settingsTags.splice(index,1)

      w.settings.push(setting)

      # Setting is ready: trigger load content
      # ------------------------------------
      scope.deferred.resolve(setting)
  }
)

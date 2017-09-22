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

        # in the MVP, all rules are combined by OR, and all conditions within a rule a AND

        filterQueryRules = []
        filterQuery =
          condition: 'OR'
          rules: filterQueryRules

        angular.forEach  scope.settingsTags, (settingsTag) ->
          filterQueryCondition =
            condition: 'AND'
            rules: []
          angular.forEach  settingsTag.tags, (filterItem) ->
            ruletag =
              value: filterItem.value
            ruletag.name = filterItem.name if filterItem.name?
            filterQueryCondition.rules.push(ruletag)

          filterQueryRules.push (filterQueryCondition) if settingsTag.tags.length != 0

        if filterQuery.rules.length==0 then filterQuery = {}

        return {filter_query: filterQuery}

      # transform filter query in a more simple version for displaying in UI
      filterToSettingTags = (filterQuery) ->
        return if _.isEmpty(filterQuery)
        settingsTags = []
        angular.forEach filterQuery.rules, (filterQueryRule) ->
          settingRule =
            operator: 'OR'
            tags: []

          angular.forEach filterQueryRule.rules, (filterQueryRuleCondition) ->
            tagtext = _.compact([filterQueryRuleCondition.name,filterQueryRuleCondition.value]).join(":")
            ruletag =
              value: filterQueryRuleCondition.value
              text: tagtext
            ruletag.name = filterQueryRuleCondition.name if filterQueryRuleCondition.name?
            settingRule.tags.push(ruletag)
          settingsTags.push(settingRule)

        return settingsTags

      loadRules= ->
        return if _.isEmpty(w.metadata.filter_query)
        scope.settingsTags = filterToSettingTags (w.metadata.filter_query)

      initiateAutoComplete= ->
        tags = w.content.available_tags || []
        autotags = []
        for org, tag_hash of tags
          angular.forEach tag_hash.tag_references, (tag_ref) ->
            angular.forEach tag_ref.tag_reference_values, (tag) ->
              tagtext = _.compact([tag_ref.name, tag.value]).join(":")
              ruletag =
                text: tagtext
                value: tag.value
              ruletag.name = tag_ref.name if tag_ref.name?
              autotags.push(ruletag)

        scope.loadTagList= (query) ->
          return _.filter(autotags, (e) -> e.text.toLowerCase().indexOf(query.toLowerCase()) > -1)


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

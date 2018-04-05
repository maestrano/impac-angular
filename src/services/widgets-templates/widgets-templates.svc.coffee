# Get dynamic file paths & filenames from widget data.
angular
  .module('impac.services.widgets-templates', [])
  .service('ImpacWidgetsTemplates', ($templateCache, ImpacRoutes) ->

    _self = @

    # Outputs the filename string based on widget data in kebab-case convention.
    @filename = (widget)->
      # 'accounts/accounting_values/ebitda' => ['accounts','accounting_values']
      templateNameArray =
        if template = _.get(widget, 'metadata.template')
          template.split('/').slice(0,2)

        else if widget.endpoint && bolt_path = _.get(widget, 'metadata.bolt_path')
          bolt = _.find ImpacRoutes.bolts(), (bolt) -> bolt.path == bolt_path
          bolt && [bolt.category, widget.endpoint]

        else if widget.endpoint
          widget.endpoint.split('/').slice(0,2)

      return false unless templateNameArray?

      # ['accounts','accounting_values'] => 'accounts-accounting-values'
      return _.kebabCase(templateNameArray)

    # Retrieve the full template path for bolt & legacy widgets (only if template exists).
    @templatePath = (widget)->
      if _.isEmpty(widget.layouts)
        legacyTemplatePath(widget)
      else
        boltTemplatePath(widget)

    # Private

    legacyTemplatePath = (widget) ->
      return false unless filename = _self.filename(widget)
      templatePath = "widgets/#{filename}.tmpl.html"
      return ($templateCache.get(templatePath) && templatePath)

    # Custom templates live in widgets-layouts/custom-templates dir, though gulp omits nested
    # structures from the templateCachekey for brevity.
    boltTemplatePath = (widget)->
      for layout in widget.layouts
        customPath = "widgets-layouts/#{_self.filename(widget)}.tmpl.html"
        return customPath if $templateCache.get(customPath)
        path = "widgets-layouts/#{_.kebabCase(layout)}.tmpl.html"
        return path if $templateCache.get(path)
      false

    return
  )

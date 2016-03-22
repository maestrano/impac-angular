# generator-widget
---

Generator for building impac-angular widget components.

### Todo
---

- read how all widget directives are formed and put together generic scenearios
- prompt chart types
  - generate different chart formatter functions
  - generate different chart html templates
- generate standard widget specific methods based on prompted chart type
- prompt controls for widget specific alterations, e.g:
  - expandable-list with 2 column comparison or single column.
- prompt selection of widgets-settings

### Notes
---

##### generating chart formatter functions and widget specific methods
Can I inject javascript from different file into widget-component.directive? 
Would be cool to be able to build files structures based on widget chart types, and then based on the widget prompt selected & a few other prompts, build out all generic methods and variable settings in the directive controller.

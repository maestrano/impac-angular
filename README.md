# impac-angular
---

#### Information

- Templates for directives must not use double-quotes for strings. Only html attribute values may be wrapped in double qoutes.

#### Version 2

- Refactor angularJS dependency injection annotiations to the simple version, as gulp ng annotate will take care of it on build.
- Re-organise modules
- Re-organise file structure to reflect modules
- By god, do something about the less.
    - Move Less to Sass
    - modular / component structure.
- Console errors are not giving accurate stack trace lines (something to do with the sourcemaps)
- Gulp task for updating dist/.bower.json
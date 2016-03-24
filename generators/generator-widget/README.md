# generator-widget

Generator for generating Impac! Angular widget components.

#### Features
---

- Create a new widget component directory with a html template and angular directive with all boilerplate code written.
- Chart selection and basic configurations for the selected chart written to the template and directive.
- Chart add-ons selection, dependant on chart selection, offers additional 'add-ons' for chart displays.
- Widgets Settings selection and basic configurations for the selected Widgets Settings written to the template and directive.

#### Usage
---

Run the following commands from the `impac-angular/` root directory.

Fetch latest npm modules
```
npm update
```
Begin generating a new Widget component
```
yo widget
```

#### Development
---

Symbolic linking the local module to your node_modules for live development. 
```
cd generators/generator-widget
npm link
cd ../..
npm link generator-widget
```

To unlink simply run the commands below from the impac-angular directory.
```
npm unlink generator-widget
npm install
```

Don't forget to bump the `package.json` version and update the `Changelog.md` with changes / features for each submitted pull request into impac-angular.

#### Todo
---

- define default data values & options for charts so upon generation, charts are displayable!
- static config & options moved into .json config files to clean-up index.js
- add more widget-settings
- specs

#### Notes
---

**generator module versioning**
`npm update` will only update the generator from local when the package.json version changes. How should this me managed? With just a changelog?

**impac-angular module declarations**
I think we will have to refactor how components modules are structured to avoid having to specifically inject each one.


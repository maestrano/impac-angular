# generator-widget

Generator for generating Impac! Angular widget components.

#### Features
---

TODO: list features

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

#### Todo
---

- completion message (e.g "dont forget to add impac-angular module declaration")
- define default data values & options for charts so upon generation, charts are displayable!
- static config & options moved into .json config files to clean-up index.js.
- add more widget-settings
- specs

#### Notes
---

**generator module versioning**
`npm update` will only update the generator from local when the package.json version changes. How should this me managed? With just a changelog?

**impac-angular module declarations**
I think we will have to refactor how components modules are structured to avoid having to specifically inject each one.


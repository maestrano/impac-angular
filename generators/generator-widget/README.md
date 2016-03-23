# generator-widget

Generator for building impac-angular widget components.

#### Features
---

TODO: list features

#### Usage
---

For when new generator versions are published to the repo.
```
npm update
```

TODO: next steps.


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

- completion message 
  - "dont forget to add impac-angular module declaration"
- define default data values & options for charts so upon generation, charts are displayable!
- static config & options moved into .json config files to clean-up index.js.
- add more widget-settings
- specs

#### Notes
---

*generator module versioning*
`npm update` will only update the generator from local when the package.json version changes unless in `npm link` mode. How should this me managed? With just a changelog?

*impac-angular module declarations*
I think we will have to refactor how components modules are structured to avoid having to specifically inject each one.


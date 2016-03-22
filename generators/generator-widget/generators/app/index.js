'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var inquirer = require('inquirer');
var ejs = require('ejs');
var beautify = require('js-beautify');
var fs = require('fs');
var fsHelpers = require('./src/fs-helpers.js');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.charts = [
      new inquirer.Separator(),
      { id: 1, name: 'Pie Chart', value: 'pie', type: 'graph' },
      { id: 2, name: 'Line Chart', value: 'line', type: 'graph' },
      new inquirer.Separator(),
      { id: 3, name: 'Blank - content only / custom', value: 'blank' },
      new inquirer.Separator(),
    ];
    this.chartAddOns = [
      { value: 'legend', name: 'Legend', checked: false }
    ];
    this.buildPartialsPaths = function (options) {
      var templatePath = this.templatePath(), path;
      return _.compact(_.map(options, function (option) {
        path = templatePath + '/widget-component/partials/_' + option + '.html';
        // TODO: existsSync is depreciated - use fs.statSync.
        if (fs.existsSync(path)) {
          return path;
        }
        return null;
      }));
    };
    this.buildDestinationPath = function (ext) {
      // TODO:
      // - file system configurations. E.g defining a `src` for 'src/components/widgets', etc.
      // - path building helper to reduce long concats?
      return 'src/components/widgets/' + this.componentNames.mod + '/' + this.componentNames.mod + ext;
    };
    this.buildComponentNames = function () {
      return {
        ctrl: _.upperFirst(_.camelCase(this.props.widgetName)),
        drct: _.camelCase(this.props.widgetName),
        mod: _.kebabCase(this.props.widgetName)
      };
    };
  },
  prompting: function () {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.green('Welcome to the Impac! widget generator!')
    ));

    var charts = this.charts;
    var chartAddOns = this.chartAddOns;
    var prompts = [
      {
        type: 'input',
        name: 'widgetName',
        message: 'What is the name of your Widget? (e.g accounts-awesome-widget)'
      },
      {
        type: 'list',
        name: 'chartName',
        message: 'Select which chart/content type you would like to build.',
        choices: charts
      },
      {
        when: function (prop) {
          return _.find(charts, { value: prop.chartName }).type === 'graph';
        },
        type: 'checkbox',
        name: 'chartAddOns',
        message: 'Which chart add-ons would you like to include?',
        choices: chartAddOns
      }
    ];

    this.prompt(prompts, function (props) {
      // Array of selections made after prompting.
      this.props = props;
      this.chartType = _.find(charts, { value: props.chartName }).type;
      this.componentNames = this.buildComponentNames();

      done();
    }.bind(this));
  },

  writing: {
    // Write task for generating the new widgets html template file.
    widgetTemplate: function () {
      var data, html, template, path;

      data = {
        chartContainerClass: '',
        componentNames: this.componentNames,
        partials: this.buildPartialsPaths(_.flatten(_.map(this.props, function (prop) {
          return prop;
        })))
      };
      if (this.chartType === 'graph') {
        data.chartContainerClass = 'chart-container';
      }

      path = this.destinationPath(this.buildDestinationPath('.tmpl.html')),

      html = this.fs.read(this.templatePath('widget-component/widget-component.tmpl.html'));

      template = ejs.render(html, data, {filename: this.templatePath('widget-component')});

      template = beautify.html(template, { indent_size: 2 });

      this.fs.write(path, template);
    },
    // Write task for generating the new widgets directive component file.
    widgetDirective: function () {
      var html, template, data, settingsPromises, path;

      settingsPromises = [];
      if (this.chartType === 'graph') settingsPromises.push('chart');

      data = {
        componentNames: this.componentNames,
        settingsPromises: settingsPromises
      };

      path = this.destinationPath(this.buildDestinationPath('.directive.coffee'));

      html = this.fs.read(this.templatePath('widget-component/widget-component.directive.coffee'));

      template = ejs.render(html, {data: data}, {filename: this.templatePath('widget-component')});

      this.fs.write(path, template);
    }
  },

  install: function () {
    this.installDependencies();
  }
});

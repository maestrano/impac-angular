'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var inquirer = require('inquirer');
var ejs = require('ejs');
var beautify = require('js-beautify');
var fs = require('fs');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    // TODO: redesign value / type keys, chart partials are all the same. Keep in mind different charting lib support that may occur in the future.
    this.charts = [
      new inquirer.Separator(),
      { name: 'Pie Chart', value: 'pie', type: 'graph', defaultInputData: '[]' },
      { name: 'Line Chart', value: 'line', type: 'graph', defaultInputData: '[]' },
      { name: 'Bar Chart', value: 'bar', type: 'graph', defaultInputData: '{}' },
      { name: 'Combined Bar Chart', value: 'combined-bar', type: 'graph', defaultInputData: '{}' },
      new inquirer.Separator(),
      { name: 'Blank - content only / custom', value: 'blank' },
      new inquirer.Separator(),
    ];
    this.chartAddOns = [
      { name: 'Legend', value: 'legend', checked: false }
    ];
    this.widgetsSettings = [
      { name: 'Organizations', value: 'org', checked: true }
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
      return this.destinationPath(
        'src/components/widgets/' + this.componentNames.mod + '/' + this.componentNames.mod + ext
      );
    };
    this.buildComponentNames = function () {
      return {
        ctrl: _.upperFirst(_.camelCase(this.props.widgetName)),
        drct: _.camelCase(this.props.widgetName),
        mod: _.kebabCase(this.props.widgetName)
      };
    };

    // The generator has finished it's magic, do any final jobs and say goodbye.
    this.on('end', function () {
      this.log(yosay(
        chalk.green('All done! ') + chalk.yellow('Don\'t forget to add your new component to your App\'s module dependancies!!')
      ));
    });
  },
  prompting: function () {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.green('Welcome to the Impac! widget generator!')
    ));

    var charts = this.charts;
    var chartAddOns = this.chartAddOns;
    var widgetsSettings = this.widgetsSettings;
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
      },
      {
        type: 'checkbox',
        name: 'widgetSettings',
        message: 'Which widgets settings directives would you like to include?',
        choices: widgetsSettings
      }
    ];

    this.prompt(prompts, function (props) {
      // Array of selections made after prompting.
      this.props = props;

      this.selectedChart = _.find(charts, { value: props.chartName });
      this.chartType = this.selectedChart.type;
      this.componentNames = this.buildComponentNames();
      this.hasChart = this.chartType === 'graph';

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
        chartPartials: this.buildPartialsPaths(_.flatten(_.map(
          _.flatten([this.selectedChart.value, this.props.chartAddOns]), function (prop) {
            return prop;
          }
        ))),
        settingsPartials: this.buildPartialsPaths(this.props.widgetSettings)
      };

      if (this.hasChart) data.chartContainerClass = 'chart-container';

      path = this.buildDestinationPath('.tmpl.html'),

      html = this.fs.read(this.templatePath('widget-component/widget-component.tmpl.html'));

      template = ejs.render(html, data, {filename: this.templatePath('widget-component')});

      template = beautify.html(template, { indent_size: 2 });

      this.fs.write(path, template);
    },
    // Write task for generating the new widgets directive component file.
    widgetDirective: function () {
      var coffee, data, deps, settingsPromises, path;

      deps = ['$scope', '$q'];
      settingsPromises = _.cloneDeep(this.props.widgetSettings) || [];

      if (this.hasChart) settingsPromises.push('chart'); deps.push('ChartFormatterSvc');

      data = {
        componentNames: this.componentNames,
        deps: deps,
        settingsPromises: settingsPromises,
        hasChart: this.hasChart,
        chartName: _.camelCase(this.selectedChart.value),
        defaultInputData: this.selectedChart.defaultInputData
      };

      path = this.buildDestinationPath('.directive.coffee');

      coffee = this.fs.read(this.templatePath('widget-component/widget-component.directive.coffee'));

      coffee = ejs.render(coffee, {data: data}, {filename: this.templatePath('widget-component')});

      this.fs.write(path, coffee);
    },
    widgetStyles: function () {
      var less, data, path;

      data = { chartName: this.componentNames.mod };

      path = this.buildDestinationPath('.less');

      less = this.fs.read(this.templatePath('widget-component/widget-component.less'));

      less = ejs.render(less, data, {filename: this.templatePath('widget-component')});

      this.fs.write(path, less);
    }
  },

  install: function () {
    this.installDependencies();
  }
});

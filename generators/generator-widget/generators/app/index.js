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
    this.buildOptionPath = function (options) {
      var templatePath = this.templatePath();
      return _.map(options, function (option) {
        return templatePath + '/widget-component/partials/_' + option + '.html';
      });
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
        message: 'Which chart add-ons would you like to include',
        choices: chartAddOns
      }
    ];

    this.prompt(prompts, function (props) {
      // Array of selections made after prompting.
      this.props = props;
      this.chartType = _.find(charts, { value: props.chartName }).type;

      done();
    }.bind(this));
  },

  writing: {
    // Write task for generating the new widgets html template file.
    widgetTemplate: function () {
      var data, html, template;

      data = {
        chartContainerClass: '',
        options: this.buildOptionPath(_.flatten(_.map(this.props, function (prop) {
          return prop;
        })))
      };
      if (this.chartType === 'graph') {
        data.chartContainerClass = 'chart-container';
      }

      html = this.fs.read(this.templatePath('widget-component/widget-component.tmpl.html'));

      template = ejs.render(html, data, {filename: this.templatePath('widget-component')});

      template = beautify.html(template, { indent_size: 2 });

      this.fs.write(
        this.destinationPath('components/widgets/widget-component.tmpl.html'),
        template
      );
    },
    // Write task for generating the new widgets directive component file.
    widgetDirective: function () {
      var html, template, data, buffer, path, settingsPromises;

      settingsPromises = [];
      if (this.chartType === 'graph') {
        settingsPromises.push('chart');
      }
      data = {
        settingsPromises: settingsPromises
      };

      html = this.fs.read(this.templatePath('widget-component/widget-component.directive.coffee'));
      template = ejs.render(html, {data: data}, {filename: this.templatePath('widget-component')});

      // TODO: move to method.
      // - warning when before overwriting.
      // - nice logs
      // - doc the purpose of not using this.fs for I/O.
      buffer = new Buffer(template);
      path = this.destinationPath('components/widgets/widget-component.directive.coffee');
      fs.open(path, 'w', function(err, fd) {
        if (err) throw 'error opening file: ' + err;

        fs.write(fd, buffer, 0, buffer.length, null, function(err) {
          if (err) throw 'error writing file: ' + err;

          fs.close(fd, function() {
            console.log('file written');
          });
        });
      });
    }
  },

  install: function () {
    this.installDependencies();
  }
});

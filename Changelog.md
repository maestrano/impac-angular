# Impac! Frontend Changelog

## Unreleased - development in progress

-------------------------------------------------------------
-------------------------------------------------------------

## Released

### v1.3.13 | Week 33

#### Adds
- Impac Angular now provides default images.
- Impac Angular less variables to customise no widgets / dhb message styles without overriding.
- Added top-buffer less variables for improved layouts (replaces the need for bootstrap spacer divs) 
- Refactor formula settings
- Added hist mode to custom calculation widget

#### Fixes
- Remove bootstrap spacer divs from impac-angular; improves dashboard layout for parent applications.
- Fix balance sheet display bug

-------------------------------------------------------------

### v1.3.12 | Week 32

#### Adds
- Accounts in drop-downs now grouped by classification
- Better design for info panel
- Expense weight widgets now have a time period selector
- Add a `@reload()` method to dhb service. External apps (e.g mnoe instances) can now properly reload the dashboard with a loading spinner to prevent display issues.


-------------------------------------------------------------

### v1.3.11 | Week 31

#### Adds
- Improve time preset behaviour 
- Add version console command & log (`impac.version`)
- Drill down widgets are now sortable
- Change in selected lines layout display

#### Fixes
- potential fix for stuck dashboard loading
- Fix sales summary data not found condition


-------------------------------------------------------------

### [v1.3.10](https://github.com/maestrano/impac-angular/tree/v1.3.10) (2016-07-15)
[Full Changelog](https://github.com/maestrano/impac-angular/compare/v1.3.9...v1.3.10)

**Fixed bugs:**

- Fix apply button when date range changes [\#208](https://github.com/maestrano/impac-angular/pull/208) ([alexnoox](https://github.com/alexnoox))
- Fix Date Preset auto-selection [\#207](https://github.com/maestrano/impac-angular/pull/207) ([ouranos](https://github.com/ouranos))


-------------------------------------------------------------

### v1.3.9 | Week 27

#### Adds
- Dates picker setting now use dynamic templating
- Time period selection now led by the presets
- Add previous financial year in the default presets
- Can choose to hide time-slider in configuration

#### Fixes
- Flex layout for dashboard settings (currency + sync)
- Patch regarding the stability issue with the display of charts applied to all browsers

#### Config changes
- In ImpacTheming.configure, to hide the slider from the time period selection setting:
```
  widgetSettings:
    timePeriod:
      showSlider: false
```


-------------------------------------------------------------

### v1.3.8 | Week 26

#### Adds
- Widget sales/growth: Better product selection
- Widget opportunities funnel: now filterable by assignee
- Bower dependencies injected to karma config
- Dashboard printing capability (**IMPORTANT** bootstrap print.less has to be ignored for the dashboard to be properly printed)
- Serve assets in the developer workspace

#### Config changes
- In ImpacTheming.configure, to activate the PDF mode (enables dashboard printing capability)
```
  dhbSelectorConfig:
    pdfModeEnabled: true
```

-------------------------------------------------------------

### v1.3.7 | Week 24

#### Adds
- Balance sheet widgets to show balance at end date (instead of current balance)
- Impac favicon in Developer toolkit


-------------------------------------------------------------

### v1.3.6 | Week 22

#### Adds
- Update Chart.js to v2.1.4

#### Fixes
- Accounts balance: wait for updateSettings to finish before calling format()
- KpisSvc.load() to systematically wait for MainSvc and DashboardsSvc loading
- Charts drawing was unstable after update to Chrome v51


-------------------------------------------------------------

### v1.3.5 | Week 21

#### Fixes
- Revert workspace/index.js and workspace/index.css
- Add track by to ng-repeats in widgets


-------------------------------------------------------------

### v1.3.4 | Week 20

#### Adds
- dates-picker to be inversible (from date can be displayed first in bootstrap mode)
- Balance sheet widget to invert from/to dates

#### Fixes
- dates-picker autofocus + remove outline
- sso_session id to be stored only in ImpacMainSvc
- Important refactor of Kpis.svc


-------------------------------------------------------------

### v1.3.3 | Week 19: Accounting behaviours improvements

#### Adds
- Common directive "time-period-info" to display selected time period
- time-period-info added to hist-mode choser and some widgets
- time-presets can now be defined in ThemingSvc
- Better UI for widget Team performance

#### Config changes
- Time presets customization in ImpacTheming:

```coffeescript
   widgetSettings:
    timePeriod:
      presets: [
        {
          label: 'Year to date'
          value:
            // each "value" can be a string or a function that returns a string
            from: (fyEndMonth) ->
              ImpacUtilitiesProvider.$get().financialYearDates(fyEndMonth).start
            to: moment().format('YYYY-MM-DD')
            period: 'MONTHLY'
        }
      ]
```

#### Dependencies
- Impac API v1.3.3


-------------------------------------------------------------

### v1.3.2 | Week 18: Fix widgets reload, custom calculation

#### Fixes
- Custom calculation formula wasn't saved properly (settings where updated upon widget load)
- Widgets setting update function error case
- Widgets reload after currency change or dashboard sync (WidgetsSvc.refreshAll)


-------------------------------------------------------------

### v1.3.1 | Week 17: Params picker improvement

#### Adds
- Params-picker setting selection applicable to all similar widgets

#### Fixes
- dates-pickers' calendars are no longer hidden after widget drag/drop


-------------------------------------------------------------

### v1.3.0 | Better time period selection, accounting behaviours, widgets generator, better dashboard sync...

#### Adds
- Reworked sync-apps UI, statuses & error management: new design & last sync statuses, last sync statuses customizable via ImpacTheming, alerts modal displays successful connector syncs, details & proper error messages for each alert, and a new caution button which opens the alerts modal.
- Workspace Http Interceptor: applys basic auth intelligently to requests to Maestrano's ecosystem.
- Widget Generator: generator widget components from the CLI.
- Gulp Server with live reload for Developer Workspace!
- [new widget] "Net Sales"
- [new widget] "New vs Existing Customers widget"
- [new widget] "Top Customers by Sales".
- Add getDateRange from array of Dates or date-strings method in ImpacUtilities service.
- Widget `metadata.template` now dictates which category the widgets appears in.
- Bump Chart.js from version 2.0.0-beta2
- Add info panel for widgets
- Better display for widgets' top-line and action buttons
- Better time period selection setting (using presets, slider, and dates pickers / financial year handling)
- P&L and Balance sheet behaviours for some accounting widgets

#### Fixes
- KPIs display correctly on dashboard change, remove kpi working properly, initializes properly before loading kpis.
- Better UI for widget name edit (tooltips + can now fully use the mouse without dragging the widget)


-------------------------------------------------------------
-------------------------------------------------------------

### v1.2.1 | Developer provider, Gulp refactor, layout fixes, routing fixes, sync fix

#### Fixes
- Deep routing to dashboards#index when an organization id is specified
- Apps sync: keeps syncing if the sync is just enqueued (and not performed straight away)

#### Adds
- Developer Provider Service - ability to stub widgets templates, and further configure the developer workspace.
- Gulp refactor - the gulp tasks are splitted in several files in the gulp directory.
- Better layout for all widgets using the widget-lines-container (+ adapted to xsmall screens)


-------------------------------------------------------------

### v1.2.0 | Features - Developer toolkit

#### Adds
- Widget setting: dates-picker (can be used in edit mode or on widget's front)
- Use widget setting dates-picker in invoices list, invoices summary, sales list and sales summary
- Allow to use a callback on the dataNotFound link
- Sync Apps feature with last synced timestamps.
- Developer toolkit now available in /workspace


-------------------------------------------------------------
-------------------------------------------------------------

### v1.1.2 | Callbacks, Mass-assignment fix, Currency filter fix

#### Fixes
- Mass Assign: merges the metadata instead of replacing it + update not pushed if the metadata hasn't changed
- mno-currency filter: official symbols for 12/14 supported currencies, 'showName' filter argument changed to 'ISOmode', for switching between suffixed ISO code and prefixed currency symbol display.

#### Adds
- ImpacDashboardsSvc.callbacks.widgetAdded


-------------------------------------------------------------

### v1.1.1 | Fixes - Package.json and bower.json versions

- Just bumps the packages to proper version


-------------------------------------------------------------

### v1.1.0 | Features - Multi-currency handling

#### Adds
- Attach a currency to a dashboard will convert all the amounts in the widgets based on the exchange rate at the corresponding date.
- Add mass-assignment functionalities in WidgetsSvc
- Add callbacks to DashboardsSvc


-------------------------------------------------------------
-------------------------------------------------------------

### v1.0.6 | Dashboard sync fix, line chart layout fix, MYOB custom message

#### Fixes
- Widget invoices list: guarding against metadata.order_by not specified
- Dashboard loading forever when DashboardsSvc was failing
- Guarding across all widgets agains $scope.content not being defined (in w.initContext())
- Organizations not being initialized if WidgetsSvc.show fails
- Broken sales forecast and top opportunities (since 1.0.5)

#### Adds
- Line charts with only one value won't display only one point but an horizontal line
- Configuration parameters for MYOB Essentials custom message


-------------------------------------------------------------

### v1.0.5 | Fixes - Accounting reports / KPIs display / HR figures

#### Fixes
- Superannuation balance to show current balance without selecting any time range
- Leaves balance to show Sick/Vacation leaves balance without selecting any time range
- Aged payables and receivables to display total values instead of values for fixed period
- Widget name edition (layout + add buttons)
- Widgets top bar layout (title and buttons)
- Limit KPI value to avoid scope desync
- KPI alert units
- Invoices list display (big values were hidden)
- Custom calculation: fix formula by adding spaces before and after account balance placeholders ({1}...)
- Sales widgets: fix string matching logic for quantity selectors
- Widget loader to be center on Firefox

#### Adds
- Custom filter for dates based on the selected period
- KPI loader when attaching a KPI
- Better design and consistency for accounting reports: cash summary, profit and loss and balance sheet

#### Removes
- Expand Kpis functionality


-------------------------------------------------------------

### v1.0.4 | Fixes - Chart display / Accounts comparison / Tooltips

#### Fixes

- Charts are now displayed in Safari
- Better logic for widget accounts comparison: can no longer tick "compare matching accounts across entities" when there are only accounts from one entity available
- Drill-down widgets elements will be collapsible only if there are sub-elements present
- Widgets tooltips hanging around fix (+ now compatible with Mozilla)

#### Adds
- Information message when users having only MYOB Essentials are adding accounting widgets


-------------------------------------------------------------

### v1.0.3 | Hotfix - Tab Dashboard Selector

#### Fixes
- Tabs dashboard selector no longer trigger Impac! load on load


-------------------------------------------------------------

### v1.0.2 | Hotfix - Accounts Comparison

#### Fixes
- Prevents running comparison mode or loading comparison mode from metadata settings if there aren't two or more organisations available on the widget (#32)


-------------------------------------------------------------

### v1.0.1 | Hotfix - isDataFound definitions

#### Fixes
- change isDataFound definition in widget hr/payroll-taxes (#26)
- change isDataFound definition in widget sales/customer-details (#26)


-------------------------------------------------------------

### v1.0.0 | First Release

#### Adds
- Includes Chart.js 2.0-beta

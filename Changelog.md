# Impac! Frontend Changelog

### v1.5.3 | 2017 - Week 28

#### Adds
- Fix widget kpis currency not updated on currency change
- [IMPAC-506] Add currency rates service (requires Impac! >= v1.5.10)
- [IMPAC-631] Use ngStyle when binding values instead of angular expressions fixing IE support

-------------------------------------------------------------

### v1.5.2 | 2017 - Week 27

#### Adds
- Re-adds the ability to enable multi-company dashboards
- [IMPAC-598] Better UI for threshold KPI

#### Fixes
- Delegate i18n configuration to the host app
- [IMPAC-592] Use `$translate.instant` in synchronous `initContext` methods

#### Config changes
- Multi-company dashboards enable/disable option to Theming service
```javascript
dhbConfig: {
  multiCompany: true
}
```
- Remove `translateSettings` from ThemingSvc
- Host application must configure `$translateProvider`:
- - indicate how to load the locale files
- - configure `preferredLanguage` and `fallbackLanguage`
- - manage the active language using `$translate.use`

#### Dependencies
- Mno-enterprise >= 3.3.0
- Mno-enterprise Angular >= 1.1.0

-------------------------------------------------------------

### v1.5.1 | 2017 - Week 23

#### Adds
- Routes to Bolt widgets and KPIs (discovery + show)
- Template for Cash Balance widget
- Template for Cash Projection widget
- Component for chart-threshold setting
- Attach threshold KPI to Cash Projection chart
- Adds a HighchartsFactory for creating & updating highchart objects 

#### Fixes
- Settings Time Slider not displaying range period label
- Multi-currency broken on EBITDA widget

#### Config changes
- Default route to Impac! KPIs endpoints is now `api/v1/kpis`

#### Dependencies
- Impac! API >= v1.5.8

-------------------------------------------------------------

### v1.5.0 | 2017 - Week 20

#### Adds
- Internationalization
- Upgrades Angular to v1.6
- Upgrades Angular Bootstrap to v2.3
- [IMPAC-99] Change routes for widgets :index and :show
- sso_session now passed as basic_auth param for widgets :show

#### Fixes
- Uses Firefox instead of PhantomJS for tests fixing issues with Angular v1.6
- [IMPAC-465] Fix dates picker positioning

#### Config Changes
- Internationalization options for angular-translate via ImpacThemingSvc

```javascript
translateSettings: {
  preferredLanguage: 'en-gb',
  fallbackLanguage: 'zh-HK',
  customLocaleFiles: {
    prefix: '',
    suffix: '.json'
  }
}
```

#### Dependencies
- Impac! API >= 1.5.0
- Mno-enterprise > v3.1.2

-------------------------------------------------------------

### v1.5.0-rc8 | 2017 - Week 18
- add v1.4.12

-------------------------------------------------------------

### v1.5.0-rc7 | 2017 - Week 17
- add v1.4.11

-------------------------------------------------------------

### v1.5.0-rc6 | 2017 - Week 16
- add v1.4.10

-------------------------------------------------------------

### v1.5.0-rc5 | 2017 - Week 13
- add v1.4.9

-------------------------------------------------------------

### v1.5.0-rc4 | 2017 - Week 8
- add v1.4.8

-------------------------------------------------------------

### v1.5.0-rc3 | 2017 - Week 5

#### Adds
- [IMPAC-99] Change routes for widgets :index and :show
- sso_session now passed as basic_auth param for widgets :show

#### Fixes
- [IMPAC-465] Fix dates picker positioning

-------------------------------------------------------------

### v1.5.0-rc2 | 2017 - Week 3
- add v1.4.7 changes

-------------------------------------------------------------

### v1.5.0-rc1 | 2017 - Week 1

#### Adds
- Upgrades Angular to v1.6
- Upgrades Angular Bootstrap to v2.3

#### Fixes
- Uses Firefox instead of PhantomJS for tests fixing issues with Angular v1.6

-------------------------------------------------------------

### v1.4.12 | 2017 - Week 18

#### Adds
- Improve widget selector using a Flexbox grid

-------------------------------------------------------------

### v1.4.11 | 2017 - Week 17 

#### Adds
- Apply widget settings on custom calc modal proceed (save)
- An improved configuration / customisation to the README.md

#### Fixes
- [IMPAC-546] currency of widget & dashboard not in sync
- [IMPAC-545] Fix css responsivenes for widgets selector
- [IMPAC-448] Fix period hidden in "show last month"
- Fix refreshAll kpis wrongly forcing a dashboard reload
- Fix ImpacKpisSvc .load & .show method not properly applying refreshCache
- Fix sales-list data not found not displaying
- Fix dates-picker throwing error when onChangeCb is undefined

-------------------------------------------------------------

### v1.4.10 | 2017 - Week 16

#### Adds
- [IMPAC-527] sales segmented minor display improvements: add currency to graph tooltip, & improve price range legend bootstrap col spacing for larger numbers
- [IMPAC-529] Sales Comparison to use common-currency-conversions
- [IMPAC-530] Aged Sales to use common-currency-conversions
- [IMPAC-534] Aged Payables and Receivables to use common-currency-conversions directive
- [IMPAC-535] common-currency-conversions (directive to display more information on currency conversions)
- Add loader for KPIs on delete

#### Fixes
- [IMPAC-262] Fix new vs existing customer widget incorrect tooltip values
- [IMPAC-397] Enforce at least 1 opportunities funnel widget option selection
- [IMPAC-498] Improve widget drill-down selection saved ids
- [IMPAC-536] fix param selector css bleed
- [IMPAC-537] Fix widget content css issues: .widget-lines bootstrap cols & widget content overflow

#### Dependencies
- Depends on Impac! >= 1.5.4

### Config Changes
- Frontend needs to serve dist/images/currency-conversions.png as an asset

-------------------------------------------------------------

### v1.4.9 | 2017 - Week 13

#### Adds
- [IMPAC-521] Better layout for employee details (and other widgets)

#### Dependencies
- Impac! >= v1.5.3


-------------------------------------------------------------

### v1.4.8 | Week 4

#### Adds
- [IMPAC-331] KPIs display layout labels and current value on first add 
- [IMPAC-335] Alerts can have multiple recipients 
- [IMPAC-162] Add time period setting to Accounts Comparison
- [IMPAC-466] Add time period setting to Custom Calculation
- [IMPAC-467] Add time period setting to Accounts Classes Comparison
- Ability to hide period interval on time period setting
- Ability to show a 'Apply changes' button on time period setting

#### Fixes
- [IMPAC-495] KPI accounts from previous organization appearing in select box
- [IMPAC-328] refresh KPIs after first sync
- [IMPAC-485] Fix drill down widget selection params
- [IMPAC-329] Better KPIs dates management: API driven defaults
- [IMPAC-338] KPIs with extra_param do not update kpi "current value" on selection in the edit mode pane
- Code injection issue on setting formula (custom calc.)


-------------------------------------------------------------

### v1.4.7 | Week 3

#### Adds
- [IMPAC-453] New Widget: Debt Service Ratio
- [IMPAC-456] New KPI: Debt Service Ratio
- [IMPAC-460] New Widget: Current Ratio
- [IMPAC-462] New KPI: Current Ratio
- New setting: Offsets - Allows to set metadata[:offset] as a Hash of arrays
- Can now inject text before/after caption of common-time-period-info

#### Fixes
- [IMPAC-420] Fix sync-apps poller on change organisation
- [IMPAC-421] Fix kpis bar dates picker initialization
- [IMPAC-440] fix aged payables & receivables sorting bugs
- [IMPAC-463] No KPIs data when changing to multi-organisation w/ shared dashboard(remove ng-repeat "track by" for kpis)
- Add guarding for account-class-comparison getTotals method
- Formatting of the "real_value" on KPIs

-------------------------------------------------------------

### v1.4.6 | Week 49

#### Adds
- [IMPAC-345] KPI loading spinner
- [IMPAC-342] KPI "data not found" display for no data, Impac! down & tenant disabled.
- [IMPAC-411] KPI's bar is disabled unless current_user contains a `kpi_enabled: true` property, as well as being enabled via the ImpacTheming service.

#### Fixes
- [IMPAC-374] Re-fix widgets being printed in settings mode.
- Fix Add KPIs button being hidden / disabled at incorrect cases.
- [IMPAC-388] Fix "invoices list", "sales leads funnel" & "sales leads list" widget's tooltip hover displays.
- Fix broken error handling for dashboard.svc load method, causing dashboard loading spinner to run endlessly if the ImpacLinking service required methods reject.


-------------------------------------------------------------

### v1.4.5 | Week 44

#### Adds
- Developer Workspace improved for mnoe api plus login, create account & settings configurations features.
- ImpacRoutes service to use mnoe api as default

#### Fixes


-------------------------------------------------------------

### v1.4.4 | Week 40

#### Adds
- [IMPAC-370] Improved failed dashboard load message.

#### Fixes
- [IMPAC-385] prevent empty sync status modal opening
- [IMPAC-385] width of the widget is not saved + refactored widget expand width toggle logic
- [IMPAC-374] prevent widgets being printed in settings mode
- [IMPAC-380] Hide widgets selector on dashboard deletion.
- Fixes for Dashboard & KPI action button positioning on smaller screens
- KPIs bar action buttons position issues on small screens.
- Various error handlers in kpi.svc not rejecting promises

#### Config changes
- Ability to provide custom messages for the dashboard failed error case in the ImpacTheming service.

```javascript
dhbErrorsConfig: {
  failed: {
    first: 'Oops, failed to load Impac!...'
    // Displays after 3 "retry" attempts.
    second: 'Unable to load, please contact support or try again later.'
  }
}
```


-------------------------------------------------------------

### v1.4.3 | Week 39

#### Adds
- IMPAC-333: Show/Hide KPIs bar
- IMPAC-343: Save KPIs on enter keydown

#### Config changes
- Ability to configure optional data via a new method in the ImpacLinkingSvc.

```javascript
  // Allows the optional linked data to be configured after inital app bootstrap, or even re-configured.
  ImpacLinkingSvc.linkOptionalData({pusher_key: '1234'})
```


-------------------------------------------------------------

### v1.4.2 | Week 38

#### Adds
- Ability to customise routes for Alerts via the ImpacRoutes service
- IMPAC-344: Autofocus KPI Target input field on add

#### Fixes
- IMPAC-362: only one instance of sync statuses modal to be displayed at once

#### Config changes
- Ability to enable/disable alerts via `ImpacTheming.configure` (default is false)

```javascript
  alertsConfig: {
    enableAlerts: true
  }
```


-------------------------------------------------------------

### v1.4.1 | Week 35

#### Adds
- Merge v1.3.15


-------------------------------------------------------------

### v1.4.0 | Week 35

#### Adds
- Improved KPI save settings logic
- Kpis bar save button highlighted

#### Fixes
- Update workspace mno_url to uat.maestrano.io
- Removed KPI loading spinner, fixing display glitches
- Fix available KPIs not reseting upon changing dashboard
- Fix kpi extra params de-selecting default on date picker change
- Fix duplicate targets being added on kpi date change


-------------------------------------------------------------

### v1.4.0-rc1 | Week 32

#### Adds
- KPIs & KPIs Bar complete redesign, featuring results in phrases, drag & drop, icons, less form inputs, mass save edit, and a date picker for data within a date range!
- Attach KPIs onto widgets: adds a `settings-attach-kpi` widgets-settings component.
- In-app push notification (Pusher WebSockets) & Email alerts when KPI targets are met.

#### Config changes
- Optional Pusher ImpacLinking configuration (ImpacLinking)

```
  pusher_key: 'pusher-key-goes-here'
```


-------------------------------------------------------------

### v1.3.15 | Week 35

#### Adds
- Update Workspace mno_url to `get-uat.maestrano.io`
- New UI for sync statuses display

#### Fixes
- Workspace is now compatible with KPIs & Alerting across the APIs


-------------------------------------------------------------

### v1.3.14 | Week 34

#### Fixes
- Modify PnL date display
- Add time period selection to "detailed account class" widget, and improve sortable headers display


-------------------------------------------------------------

### v1.3.13 | Week 33

#### Adds
- Impac Angular now provides default images.
- Impac Angular less variables to customise no widgets / dhb message styles without overriding.
- Added top-buffer less variables for improved layouts (replaces the need for bootstrap spacer divs)
- Gulp default task changed to `gulp serve`, added `gulp build:dist` task

#### Fixes
- Remove bootstrap spacer divs from impac-angular; improves dashboard layout for parent applications.

#### Config changes
- In ImpacAssets.configure, to setup default images path (see README.md for more info):
```
  defaultImagesPath: '/dist/images'
```

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
- KPIs target selection is now mandatory, added loading spinner for data fetching.
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

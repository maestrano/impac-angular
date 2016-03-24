# master | Ongoing development

### Adds
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

### Fixes
- Better UI for widget name edit (tooltips + can now fully use the mouse without dragging the widget)

-------------------------------------------------------------
# v1.2 | UNTAGGED

### Fixes
- Deep routing to dashboards#index when an organization id is specified
- Apps sync: keeps syncing if the sync is just enqueued (and not performed straight away)

### Adds
- Developer Provider Service - ability to stub widgets templates, and further configure the developer workspace.
- Gulp refactor - the gulp tasks are splitted in several files in the gulp directory.
- Better layout for all widgets using the widget-lines-container (+ adapted to xsmall screens)

-------------------------------------------------------------
# v1.2.0 | Features - Developer toolkit

### Adds
- Widget setting: dates-picker (can be used in edit mode or on widget's front)
- Use widget setting dates-picker in invoices list, invoices summary, sales list and sales summary
- Allow to use a callback on the dataNotFound link
- Sync Apps feature with last synced timestamps.
- Developer toolkit now available in /workspace

-------------------------------------------------------------
# v1.1 | UNTAGGED

### Fixes
- Mass Assign: merges the metadata instead of replacing it + update not pushed if the metadata hasn't changed
- mno-currency filter: official symbols for 12/14 supported currencies, 'showName' filter argument changed to 'ISOmode', for switching between suffixed ISO code and prefixed currency symbol display.

### Adds
- ImpacDashboardsSvc.callbacks.widgetAdded

-------------------------------------------------------------
# v1.1.1 | Fixes - Package.json and bower.json versions

- Just bumps the packages to proper version

-------------------------------------------------------------
# v1.1.0 | Features - Multi-currency handling

### Adds
- Attach a currency to a dashboard will convert all the amounts in the widgets based on the exchange rate at the corresponding date.
- Add mass-assignment functionalities in WidgetsSvc
- Add callbacks to DashboardsSvc

-------------------------------------------------------------
# v1.0 | UNTAGGED

### Fixes
- Widget invoices list: guarding against metadata.order_by not specified
- Dashboard loading forever when DashboardsSvc was failing
- Guarding across all widgets agains $scope.content not being defined (in w.initContext())
- Organizations not being initialized if WidgetsSvc.show fails
- Broken sales forecast and top opportunities (since 1.0.5)

### Adds
- Line charts with only one value won't display only one point but an horizontal line
- Configuration parameters for MYOB Essentials custom message

-------------------------------------------------------------
# v1.0.5 | Fixes - Accounting reports / KPIs display / HR figures

### Fixes
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

### Adds
- Custom filter for dates based on the selected period
- KPI loader when attaching a KPI
- Better design and consistency for accounting reports: cash summary, profit and loss and balance sheet

### Removes
- Expand Kpis functionality

-------------------------------------------------------------
# v1.0.4 | Fixes - Chart display / Accounts comparison / Tooltips

### Fixes

- Charts are now displayed in Safari
- Better logic for widget accounts comparison: can no longer tick "compare matching accounts across entities" when there are only accounts from one entity available
- Drill-down widgets elements will be collapsible only if there are sub-elements present
- Widgets tooltips hanging around fix (+ now compatible with Mozilla)

### Adds
- Information message when users having only MYOB Essentials are adding accounting widgets

-------------------------------------------------------------
# v1.0.3 | Hotfix - Tab Dashboard Selector

### Fixes
- Tabs dashboard selector no longer trigger Impac! load on load

-------------------------------------------------------------
# v1.0.2 | Hotfix - Accounts Comparison

### Fixes
- Prevents running comparison mode or loading comparison mode from metadata settings if there aren't two or more organisations available on the widget (#32)

-------------------------------------------------------------
# v1.0.1 | Hotfix - isDataFound definitions

### Fixes
- change isDataFound definition in widget hr/payroll-taxes (#26)
- change isDataFound definition in widget sales/customer-details (#26)

-------------------------------------------------------------
# v1.0.0 | First Release

### Adds
- Includes Chart.js 2.0-beta

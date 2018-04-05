module = angular.module('impac.components.widgets-layouts.table-layout', [])
module.component('tableLayout', {
  templateUrl: 'widgets-layouts/table-layout.html'
  bindings:
    table: '<'
    currency: '<'
    unCollapsed: '<'
    onToggleCollapsed: '&?'
    onRowClick: '&?'
  controller: ($filter) ->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.ascending = true
      ctrl.sortedColumn = ctrl.table.headers.cells[0]
      ctrl.colSize = ctrl.table.headers.cells.length
      ctrl.colWidth = "#{100 / ctrl.colSize}%"

    ctrl.cellValue = (v)->
      num = parseFloat(v)
      if _.isNumber(num) && !_.isNaN(num) then $filter('mnoCurrency')(v, ctrl.currency) else v

    ctrl.toggleCollapseOnClick = (row, $event) ->
      $event.stopPropagation()
      return unless (id = row.id)?
      if _.find(ctrl.unCollapsed, ((name) -> id == name))
        ctrl.unCollapsed = _.reject(ctrl.unCollapsed, (name) -> name == id)
      else
        ctrl.unCollapsed.push(id)
      ctrl.onToggleCollapsed($event: { unCollapsed: ctrl.unCollapsed }) if _.isFunction(ctrl.onToggleCollapsed)

    ctrl.rowOnClick = (row, $event) ->
      $event.stopPropagation()
      return unless (id = row.id)?
      ctrl.onRowClick($event: { id: id }) if _.isFunction(ctrl.onRowClick)

    ctrl.isCollapsed = (row) ->
      return unless (id = row.id)?
      if _.find(ctrl.unCollapsed, ((name) -> id == name))
        return false
      else
        return true

    ctrl.sort = (col, $index) ->
      if ctrl.sortedColumn == col
        ctrl.ascending = !ctrl.ascending
      else
        ctrl.ascending = true
        ctrl.sortedColumn = col
      sortData(ctrl.table.rows, $index)

    sortData = (rows, colIndex)->
      rows.single = sortSingleRows(rows.single, colIndex) if rows.single
      if rows.grouped
        for table in rows.grouped
          sortData(table.rows, colIndex)
      return

    sortSingleRows = (rows, colIndex) ->
      _.sortByOrder(rows, ((r)-> r.cells[colIndex]), [ctrl.ascending])

    ctrl
})
module.directive('indentTableRow', ->
  return {
    restrict: 'A',
    link: (_$scope, $element) ->
      if $element.is(':first-child')
        # Get list of ancestor tables up until the root table
        ancestorTables = $element.closest('table').parentsUntil('#table-layout', 'table')
        # Indent <th> equal to the length of ancestors
        nestLevel = ancestorTables.get().length
        # Indent <td> equal to the length of ancestors plus 1
        nestLevel++ if $element.is('td')

        $element.css({ 'padding-left': "#{nestLevel * 20}px" })

      return
  }
)

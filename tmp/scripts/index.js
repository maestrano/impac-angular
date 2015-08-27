(function () {
var module;

module = angular.module('maestrano.analytics.index', ['maestrano.assets']);

module.controller('AnalyticsIndexCtrl', [
  '$scope', '$http', '$q', '$filter', '$modal', '$log', '$timeout', 'AssetPath', 'Utilities', 'Miscellaneous', 'DhbOrganizationSvc', 'DhbAnalyticsSvc', 'UserSvc', 'TemplatePath', 'MsgBus', function($scope, $http, $q, $filter, $modal, $log, $timeout, AssetPath, Utilities, Miscellaneous, DhbOrganizationSvc, DhbAnalyticsSvc, UserSvc, TemplatePath, MsgBus) {
    var modalCreateDashboard, modalDeleteDashboard, modalWidgetSuggestion, saveDashboard, updatePlaceHolderSize;
    $scope.widgetsList = {};
    $scope.assetPath = AssetPath;
    $scope.impacLogo = $scope.assetPath['impac/transparent-logo.png'];
    $scope.isLoading = true;
    $scope.starWizardModal = {
      value: false
    };
    MsgBus.publish('starWizardModal', $scope.starWizardModal);
    $scope.openStarWizard = function() {
      return $scope.starWizardModal.value = true;
    };
    $scope.$watch(DhbOrganizationSvc.getId, function(val) {
      if (val != null) {
        return $q.all([DhbOrganizationSvc.load(), DhbAnalyticsSvc.load(), UserSvc.loadDocument()]).then(function() {
          return $scope.initialize();
        });
      }
    });
    $scope.initialize = function() {
      $scope.user = UserSvc.document.user;
      $scope.widgetsList = Miscellaneous.analyticsWidgets;
      $scope.currentWidget = {};
      $scope.currentDhbId = DhbAnalyticsSvc.getId();
      $scope.refreshDashboards();
      return $scope.isLoading = false;
    };
    $scope.refreshDashboards = function() {
      $scope.dashboardsList = DhbAnalyticsSvc.getDashboards();
      if (DhbOrganizationSvc.getUid() != null) {
        $scope.dashboardsList = _.filter($scope.dashboardsList, function(dhb) {
          return _.some(dhb.data_sources, function(org) {
            return org.uid === DhbOrganizationSvc.getUid();
          });
        });
      }
      $scope.currentDhb = _.where($scope.dashboardsList, {
        id: $scope.currentDhbId
      })[0];
      if ($scope.currentDhb == null) {
        $scope.currentDhb = $scope.dashboardsList[0];
        $scope.currentDhbId = (($scope.currentDhb != null) && $scope.currentDhb.id) || null;
      }
      if (angular.isDefined($scope.currentDhb)) {
        $scope.currentDhb.organizationsNames = _.map($scope.currentDhb.data_sources, function(org) {
          return org.label;
        }).join(", ");
      }
      return $scope.setDisplay();
    };
    $scope.getCurrentDhbWidgetsNumber = function() {
      if ($scope.currentDhb && $scope.currentDhb.widgets) {
        return $scope.currentDhb.widgets.length;
      } else {
        return 0;
      }
    };
    $scope.$watch($scope.getCurrentDhbWidgetsNumber, function(result) {
      return $scope.setDisplay();
    });
    $scope.setDisplay = function() {
      var aDashboardExists, aWidgetExists, severalDashboardsExist;
      aDashboardExists = $scope.currentDhbId != null;
      severalDashboardsExist = aDashboardExists && $scope.dashboardsList.length > 1;
      if (aDashboardExists) {
        aWidgetExists = $scope.currentDhb.widgets.length > 0;
      } else {
        aWidgetExists = false;
      }
      if (aDashboardExists && !aWidgetExists) {
        $timeout((function() {
          return $scope.showWidgetSelector = true;
        }), 300);
      } else if (!aDashboardExists) {
        $scope.showWidgetSelector = false;
      }
      $scope.showDashboardsList = false;
      $scope.showChangeDhbName = false;
      $scope.showCreateDhb = true;
      $scope.showDeleteDhb = aDashboardExists;
      $scope.showCreateWidget = aDashboardExists;
      $scope.showChooseDhbMsg = !aDashboardExists;
      $scope.showNoWidgetsMsg = aDashboardExists && !aWidgetExists;
      return $scope.canManageWidgets = true;
    };
    $scope.selectDashboard = function(dhbId) {
      $scope.currentDhbId = dhbId;
      return $scope.refreshDashboards();
    };
    $scope.toogleShowDashboardsList = function() {
      if ($scope.showChangeDhbName) {
        return;
      }
      if ($scope.dashboardsList.length > 1 || $scope.showCreateDhb) {
        return $scope.showDashboardsList = !$scope.showDashboardsList;
      } else {
        return $scope.showDashboardsList = false;
      }
    };
    $scope.toogleShowChangeDhbName = function(dhb) {
      var tmpDhbCpy;
      tmpDhbCpy = angular.copy(dhb);
      $scope.dashboardToChange = {};
      $scope.dashboardToChange.id = tmpDhbCpy.id;
      $scope.dashboardToChange.name = tmpDhbCpy.full_name;
      $scope.showChangeDhbName = !$scope.showChangeDhbName;
      return $timeout(function() {
        var elem;
        elem = $('#changeDhbNameInput');
        elem.select();
        return elem.focus();
      }, 100);
    };
    $scope.checkChangeDhbNameAndConfirm = function(event) {
      if (event.keyCode === 13) {
        $scope.updateDhbName();
      }
      if (event.keyCode === 27) {
        return $scope.showChangeDhbName = false;
      }
    };
    $scope.updateDhbName = function() {
      if (($scope.dashboardToChange == null) || _.isEmpty($scope.dashboardToChange.name)) {
        return;
      }
      DhbAnalyticsSvc.dashboards.update($scope.dashboardToChange.id, {
        name: $scope.dashboardToChange.name
      });
      _.find($scope.dashboardsList, function(dhb) {
        return dhb.id === $scope.dashboardToChange.id;
      }).full_name = $scope.dashboardToChange.name;
      return $scope.showChangeDhbName = false;
    };
    $scope.selectedCategory = 'accounts';
    $scope.isCategorySelected = function(aCatName) {
      if (($scope.selectedCategory != null) && (aCatName != null)) {
        return $scope.selectedCategory === aCatName;
      } else {
        return false;
      }
    };
    $scope.getSelectedCategoryName = function() {
      if ($scope.selectedCategory != null) {
        switch ($scope.selectedCategory) {
          case 'accounts':
            return 'Accounting';
          case 'invoices':
            return 'Invoicing';
          case 'hr':
            return 'HR / Payroll';
          case 'sales':
            return 'Sales';
          default:
            return false;
        }
      } else {
        return false;
      }
    };
    $scope.getSelectedCategoryTop = function() {
      if ($scope.selectedCategory != null) {
        switch ($scope.selectedCategory) {
          case 'accounts':
            return {
              top: '33px'
            };
          case 'invoices':
            return {
              top: '64px'
            };
          case 'hr':
            return {
              top: '95px'
            };
          case 'sales':
            return {
              top: '126px'
            };
          default:
            return {
              top: '9999999px'
            };
        }
      } else {
        return false;
      }
    };
    $scope.getWidgetsForSelectedCategory = function() {
      if (($scope.selectedCategory != null) && ($scope.widgetsList != null)) {
        return _.select($scope.widgetsList, function(aWidgetTemplate) {
          return aWidgetTemplate.path.split('/')[0] === $scope.selectedCategory;
        });
      } else {
        return [];
      }
    };
    $scope.addWidget = function(widgetPath, widgetMetadata) {
      var params;
      if (widgetMetadata == null) {
        widgetMetadata = null;
      }
      params = {
        widget_category: widgetPath
      };
      if (widgetMetadata != null) {
        angular.extend(params, {
          metadata: widgetMetadata
        });
      }
      angular.element('#widget-selector').css('cursor', 'progress');
      angular.element('#widget-selector .top-container .row.lines p').css('cursor', 'progress');
      return DhbAnalyticsSvc.widgets.create($scope.currentDhbId, params).then(function() {
        $scope.errors = '';
        angular.element('#widget-selector').css('cursor', 'auto');
        angular.element('#widget-selector .top-container .row.lines p').css('cursor', 'pointer');
        angular.element('#widget-selector .badge.confirmation').fadeTo(250, 1);
        return $timeout(function() {
          return angular.element('#widget-selector .badge.confirmation').fadeTo(700, 0);
        }, 4000);
      }, function(errors) {
        $scope.errors = Utilities.processRailsError(errors);
        angular.element('#widget-selector').css('cursor', 'auto');
        return angular.element('#widget-selector .top-container .row.lines p').css('cursor', 'pointer');
      })["finally"](function() {
        return $scope.setDisplay();
      });
    };
    $scope.modal = {};
    $scope.modal.createDashboard = modalCreateDashboard = $scope.$new(true);
    $scope.modal.deleteDashboard = modalDeleteDashboard = $scope.$new(true);
    $scope.modal.widgetSuggestion = modalWidgetSuggestion = $scope.$new(true);
    modalCreateDashboard.config = {
      action: 'create',
      instance: {
        backdrop: 'static',
        templateUrl: TemplatePath['analytics/modals/create.html'],
        size: 'md',
        windowClass: 'inverse connec-analytics-modal',
        scope: modalCreateDashboard
      }
    };
    modalCreateDashboard.open = function() {
      var self;
      self = modalCreateDashboard;
      self.model = {
        name: null
      };
      self.organizations = angular.copy($scope.user.organizations);
      self.currentOrganization = _.findWhere(self.organizations, {
        id: DhbOrganizationSvc.getId()
      });
      self.selectMode('single');
      self.loadingGif = $scope.assetPath['loader-darkblue-bg.gif'];
      self.$instance = $modal.open(self.config.instance);
      self.isLoading = false;
      return self.multiOrganizationReporting = $scope.user.multi_organization_reporting;
    };
    modalCreateDashboard.close = function() {
      return modalCreateDashboard.$instance.close();
    };
    modalCreateDashboard.proceed = function() {
      var dashboard, organizations, self;
      self = modalCreateDashboard;
      self.isLoading = true;
      dashboard = {
        name: self.model.name
      };
      if (self.mode === 'multi') {
        organizations = _.select(self.organizations, function(o) {
          return o.$selected;
        });
      } else {
        organizations = [
          {
            id: DhbOrganizationSvc.getId()
          }
        ];
      }
      if (organizations.length > 0) {
        dashboard.organization_ids = _.pluck(organizations, 'id');
      }
      return DhbAnalyticsSvc.dashboards.create(dashboard).then(function(dashboard) {
        self.errors = '';
        $scope.currentDhbId = dashboard.id;
        return self.close();
      }, function(errors) {
        return self.errors = Utilities.processRailsError(errors);
      })["finally"](function() {
        return $scope.refreshDashboards();
      });
    };
    modalCreateDashboard.proceedDisabled = function() {
      var additional_condition, selectedCompanies, self;
      self = modalCreateDashboard;
      selectedCompanies = _.select(self.organizations, function(o) {
        return o.$selected;
      });
      additional_condition = !self.model.name || self.model.name === '';
      additional_condition || (additional_condition = selectedCompanies.length === 0);
      additional_condition || (additional_condition = _.select(selectedCompanies, function(o) {
        return self.canAccessAnalyticsData(o);
      }).length === 0);
      return self.isLoading || additional_condition;
    };
    modalCreateDashboard.btnBlassFor = function(mode) {
      var self;
      self = modalCreateDashboard;
      if (mode === self.mode) {
        return "btn btn-sm btn-warning active";
      } else {
        return "btn btn-sm btn-default";
      }
    };
    modalCreateDashboard.selectMode = function(mode) {
      var self;
      self = modalCreateDashboard;
      _.each(self.organizations, function(o) {
        return o.$selected = false;
      });
      self.currentOrganization.$selected = mode === 'single';
      return self.mode = mode;
    };
    modalCreateDashboard.isSelectOrganizationShown = function() {
      return modalCreateDashboard.mode === 'multi';
    };
    modalCreateDashboard.isCurrentOrganizationShown = function() {
      return modalCreateDashboard.mode === 'single';
    };
    modalCreateDashboard.canAccessAnalyticsForCurrentOrganization = function() {
      var self;
      self = modalCreateDashboard;
      return self.canAccessAnalyticsData(self.currentOrganization);
    };
    modalCreateDashboard.isMultiCompanyAvailable = function() {
      return modalCreateDashboard.organizations.length > 1 && modalCreateDashboard.multiOrganizationReporting;
    };
    modalCreateDashboard.canAccessAnalyticsData = function(organization) {
      return organization.current_user_role && (organization.current_user_role === "Super Admin" || organization.current_user_role === "Admin");
    };
    modalDeleteDashboard.config = {
      action: 'delete',
      instance: {
        backdrop: 'static',
        templateUrl: TemplatePath['analytics/modals/delete.html'],
        size: 'md',
        windowClass: 'inverse',
        scope: modalDeleteDashboard
      }
    };
    modalDeleteDashboard.open = function() {
      var self;
      self = modalDeleteDashboard;
      self.loadingGif = $scope.assetPath['loader-darkblue-bg.gif'];
      self.$instance = $modal.open(self.config.instance);
      return self.isLoading = false;
    };
    modalDeleteDashboard.close = function() {
      return modalDeleteDashboard.$instance.close();
    };
    modalDeleteDashboard.proceed = function() {
      var self;
      self = modalDeleteDashboard;
      self.isLoading = true;
      return DhbAnalyticsSvc.dashboards["delete"]($scope.currentDhbId).then(function() {
        self.errors = '';
        $scope.currentDhbId = DhbAnalyticsSvc.getId();
        return self.close();
      }, function(errors) {
        return self.errors = Utilities.processRailsError(errors);
      })["finally"](function() {
        return $scope.refreshDashboards();
      });
    };
    modalWidgetSuggestion.widgetDetails = {};
    modalWidgetSuggestion.config = {
      instance: {
        backdrop: 'static',
        templateUrl: TemplatePath['analytics/modals/widget-suggestion.html'],
        size: 'md',
        windowClass: 'inverse impac-widget-suggestion',
        scope: modalWidgetSuggestion
      }
    };
    modalWidgetSuggestion.open = function() {
      var self;
      self = modalWidgetSuggestion;
      self.userName = UserSvc.document.user.name;
      self.loadingGif = $scope.assetPath['loader-darkblue-bg.gif'];
      self.$instance = $modal.open(self.config.instance);
      return self.isLoading = false;
    };
    modalWidgetSuggestion.close = function() {
      return modalWidgetSuggestion.$instance.close();
    };
    modalWidgetSuggestion.proceed = function() {
      var data, self;
      self = modalWidgetSuggestion;
      self.isLoading = true;
      data = {
        widget_name: self.widgetDetails.name,
        widget_category: self.widgetDetails.category,
        widget_description: self.widgetDetails.description
      };
      $http.post('/js_api/v1/mailers', {
        template: 'widget_suggestion',
        opts: data
      });
      return $timeout(function() {
        self.close();
        self.widgetDetails = {};
        return self.isLoading = false;
      }, 3000);
    };
    return $scope.sortableOptions = {
      stop: saveDashboard = function() {
        var data;
        data = {
          widgets_order: _.pluck($scope.currentDhb.widgets, 'id')
        };
        return DhbAnalyticsSvc.dashboards.update($scope.currentDhbId, data, false);
      },
      start: updatePlaceHolderSize = function(e, widget) {
        widget.placeholder.css("width", widget.item.width() - 1);
        return widget.placeholder.css("height", widget.item.height());
      },
      cursorAt: {
        left: 100,
        top: 20
      },
      opacity: 0.5,
      delay: 150,
      tolerance: 'pointer',
      placeholder: "placeHolderBox",
      cursor: "move",
      revert: 250
    };
  }
]);

module.directive('analyticsIndex', [
  'TemplatePath', function(TemplatePath) {
    return {
      restrict: 'A',
      scope: {},
      templateUrl: TemplatePath['analytics/index.html'],
      controller: 'AnalyticsIndexCtrl'
    };
  }
]);
})();
//# sourceMappingURL=data:application/json;base64,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QUEsQ0FKdkI7TUFLSCxVQUFBLEVBQVksb0JBTFQ7O0VBRDJDLENBQWpCO0NBQW5DIiwiZmlsZSI6ImluZGV4LmpzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ21hZXN0cmFuby5hbmFseXRpY3MuaW5kZXgnLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignQW5hbHl0aWNzSW5kZXhDdHJsJyxbXG4gICckc2NvcGUnLCckaHR0cCcsJyRxJywnJGZpbHRlcicsJyRtb2RhbCcsJyRsb2cnLCAnJHRpbWVvdXQnLCdBc3NldFBhdGgnLCdVdGlsaXRpZXMnLCdNaXNjZWxsYW5lb3VzJywnRGhiT3JnYW5pemF0aW9uU3ZjJywnRGhiQW5hbHl0aWNzU3ZjJywnVXNlclN2YycsJ1RlbXBsYXRlUGF0aCcsJ01zZ0J1cycsXG4gICgkc2NvcGUsICRodHRwLCAkcSwgJGZpbHRlciwgJG1vZGFsLCAkbG9nLCAkdGltZW91dCwgQXNzZXRQYXRoLCBVdGlsaXRpZXMsIE1pc2NlbGxhbmVvdXMsIERoYk9yZ2FuaXphdGlvblN2YywgRGhiQW5hbHl0aWNzU3ZjLCBVc2VyU3ZjLCBUZW1wbGF0ZVBhdGgsIE1zZ0J1cykgLT5cblxuICAgICM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAjIEluaXRpYWxpemF0aW9uXG4gICAgIz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICRzY29wZS53aWRnZXRzTGlzdCA9IHt9XG4gICAgJHNjb3BlLmFzc2V0UGF0aCA9IEFzc2V0UGF0aFxuICAgICRzY29wZS5pbXBhY0xvZ28gPSAkc2NvcGUuYXNzZXRQYXRoWydpbXBhYy90cmFuc3BhcmVudC1sb2dvLnBuZyddXG4gICAgJHNjb3BlLmlzTG9hZGluZyA9IHRydWVcblxuICAgICRzY29wZS5zdGFyV2l6YXJkTW9kYWwgPSB7IHZhbHVlOmZhbHNlIH1cbiAgICBNc2dCdXMucHVibGlzaCgnc3RhcldpemFyZE1vZGFsJywkc2NvcGUuc3RhcldpemFyZE1vZGFsKVxuXG4gICAgJHNjb3BlLm9wZW5TdGFyV2l6YXJkID0gLT5cbiAgICAgICRzY29wZS5zdGFyV2l6YXJkTW9kYWwudmFsdWUgPSB0cnVlXG5cblxuICAgICRzY29wZS4kd2F0Y2ggRGhiT3JnYW5pemF0aW9uU3ZjLmdldElkLCAodmFsKSAtPlxuICAgICAgaWYgdmFsP1xuICAgICAgICAkcS5hbGwoW0RoYk9yZ2FuaXphdGlvblN2Yy5sb2FkKCksRGhiQW5hbHl0aWNzU3ZjLmxvYWQoKSxVc2VyU3ZjLmxvYWREb2N1bWVudCgpXSkudGhlbiAoKS0+XG4gICAgICAgICAgJHNjb3BlLmluaXRpYWxpemUoKVxuXG4gICAgJHNjb3BlLmluaXRpYWxpemUgPSAoKSAtPlxuICAgICAgJHNjb3BlLnVzZXIgPSBVc2VyU3ZjLmRvY3VtZW50LnVzZXJcbiAgICAgICRzY29wZS53aWRnZXRzTGlzdCA9IE1pc2NlbGxhbmVvdXMuYW5hbHl0aWNzV2lkZ2V0c1xuICAgICAgJHNjb3BlLmN1cnJlbnRXaWRnZXQgPSB7fVxuICAgICAgJHNjb3BlLmN1cnJlbnREaGJJZCA9IERoYkFuYWx5dGljc1N2Yy5nZXRJZCgpXG4gICAgICAkc2NvcGUucmVmcmVzaERhc2hib2FyZHMoKVxuXG4gICAgICAkc2NvcGUuaXNMb2FkaW5nID0gZmFsc2VcblxuICAgICMgV2hlbiBhIGNhbGwgdG8gdGhlIHNlcnZpY2UgaXMgbmVjZXNzYXJ5IGJlZm9yZSB1cGRhdGluZyB0aGUgZGlzcGxheVxuICAgICMgKGZvciBleGFtcGxlIHdoZW4gdGhlIGRhc2hib2FyZHMgbGlzdCBpcyBtb2RpZmllZClcbiAgICAkc2NvcGUucmVmcmVzaERhc2hib2FyZHMgPSAoKSAtPlxuICAgICAgJHNjb3BlLmRhc2hib2FyZHNMaXN0ID0gRGhiQW5hbHl0aWNzU3ZjLmdldERhc2hib2FyZHMoKVxuXG5cbiAgICAgICMgRmlsdGVyIGJ5IHVpZFxuICAgICAgaWYgRGhiT3JnYW5pemF0aW9uU3ZjLmdldFVpZCgpP1xuICAgICAgICAkc2NvcGUuZGFzaGJvYXJkc0xpc3QgPSBfLmZpbHRlcigkc2NvcGUuZGFzaGJvYXJkc0xpc3QsIChkaGIpIC0+XG4gICAgICAgICAgXy5zb21lKGRoYi5kYXRhX3NvdXJjZXMsIChvcmcpIC0+IG9yZy51aWQgPT0gRGhiT3JnYW5pemF0aW9uU3ZjLmdldFVpZCgpKVxuICAgICAgICAgIClcblxuICAgICAgJHNjb3BlLmN1cnJlbnREaGIgPSBfLndoZXJlKCRzY29wZS5kYXNoYm9hcmRzTGlzdCwge2lkOiAkc2NvcGUuY3VycmVudERoYklkfSlbMF1cblxuICAgICAgIyBDaGFuZ2UgY3VycmVudCBkaGIgaWYgbm90IGZvciB0aGUgc2VsZWN0IG9yZ1xuICAgICAgdW5sZXNzICRzY29wZS5jdXJyZW50RGhiP1xuICAgICAgICAkc2NvcGUuY3VycmVudERoYiA9ICRzY29wZS5kYXNoYm9hcmRzTGlzdFswXVxuICAgICAgICAkc2NvcGUuY3VycmVudERoYklkID0gKCRzY29wZS5jdXJyZW50RGhiPyAmJiAkc2NvcGUuY3VycmVudERoYi5pZCkgfHwgbnVsbFxuXG4gICAgICBpZiBhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuY3VycmVudERoYilcbiAgICAgICAgJHNjb3BlLmN1cnJlbnREaGIub3JnYW5pemF0aW9uc05hbWVzID0gXy5tYXAoJHNjb3BlLmN1cnJlbnREaGIuZGF0YV9zb3VyY2VzLCAob3JnKSAtPlxuICAgICAgICAgIG9yZy5sYWJlbFxuICAgICAgICApLmpvaW4oXCIsIFwiKVxuXG4gICAgICAkc2NvcGUuc2V0RGlzcGxheSgpXG5cblxuICAgICMgVE9ETz8gTW92ZSB0byBzZXJ2aWNlXG4gICAgJHNjb3BlLmdldEN1cnJlbnREaGJXaWRnZXRzTnVtYmVyID0gLT5cbiAgICAgIGlmICRzY29wZS5jdXJyZW50RGhiICYmICRzY29wZS5jdXJyZW50RGhiLndpZGdldHNcbiAgICAgICAgcmV0dXJuICRzY29wZS5jdXJyZW50RGhiLndpZGdldHMubGVuZ3RoXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAwXG5cbiAgICAjIFRPRE8/IE1vdmUgdG8gc2VydmljZVxuICAgICMgQWxsb3dzIHRvIHJlZnJlc2ggdGhlIGRpc3BsYXkgd2hlbiBhIHdpZGdldCBpcyBkZWxldGVkXG4gICAgJHNjb3BlLiR3YXRjaCAkc2NvcGUuZ2V0Q3VycmVudERoYldpZGdldHNOdW1iZXIsIChyZXN1bHQpIC0+XG4gICAgICAkc2NvcGUuc2V0RGlzcGxheSgpXG5cbiAgICAjIFdoZW4gdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIHRoZSBzZXJ2aWNlIGFnYWluIGJlZm9yZSB1cGRhdGluZyB0aGUgZGlzcGxheVxuICAgICMgKGZvciBleGFtcGxlLCB3aGVuIHdpZGdldHMgYXJlIG1vZGlmaWVkKVxuICAgICRzY29wZS5zZXREaXNwbGF5ID0gKCkgLT5cbiAgICAgIGFEYXNoYm9hcmRFeGlzdHMgPSAkc2NvcGUuY3VycmVudERoYklkP1xuICAgICAgc2V2ZXJhbERhc2hib2FyZHNFeGlzdCA9IGFEYXNoYm9hcmRFeGlzdHMgJiYgJHNjb3BlLmRhc2hib2FyZHNMaXN0Lmxlbmd0aCA+IDFcbiAgICAgIGlmIChhRGFzaGJvYXJkRXhpc3RzKVxuICAgICAgICBhV2lkZ2V0RXhpc3RzID0gJHNjb3BlLmN1cnJlbnREaGIud2lkZ2V0cy5sZW5ndGggPiAwXG4gICAgICBlbHNlXG4gICAgICAgIGFXaWRnZXRFeGlzdHMgPSBmYWxzZVxuXG4gICAgICBpZiBhRGFzaGJvYXJkRXhpc3RzICYmICFhV2lkZ2V0RXhpc3RzXG4gICAgICAgICMgYWRkIGEgdGltZXIgdG8gbWFrZSBzdXJlIHRoZSBkb20gaXMgbG9hZGVkIGJlZm9yZSB0aGUgY29sbGFwc2UgZGlyZWN0aXZlIGlzIGNhbGxlZFxuICAgICAgICAkdGltZW91dCAoLT4gJHNjb3BlLnNob3dXaWRnZXRTZWxlY3RvciA9IHRydWUpLCAzMDBcbiAgICAgIGVsc2UgaWYgIWFEYXNoYm9hcmRFeGlzdHNcbiAgICAgICAgJHNjb3BlLnNob3dXaWRnZXRTZWxlY3RvciA9IGZhbHNlXG5cbiAgICAgICMgUGVybWlzc2lvbnMgYW5kICdzaG93IGhlbHBlcnMnXG4gICAgICAjIGRhc2hib2FyZCBuYW1lXG4gICAgICAkc2NvcGUuc2hvd0Rhc2hib2FyZHNMaXN0ID0gZmFsc2VcbiAgICAgICRzY29wZS5zaG93Q2hhbmdlRGhiTmFtZSA9IGZhbHNlXG4gICAgICAjIGJ1dHRvbnNcbiAgICAgICRzY29wZS5zaG93Q3JlYXRlRGhiID0gdHJ1ZVxuICAgICAgJHNjb3BlLnNob3dEZWxldGVEaGIgPSBhRGFzaGJvYXJkRXhpc3RzXG4gICAgICAkc2NvcGUuc2hvd0NyZWF0ZVdpZGdldCA9IGFEYXNoYm9hcmRFeGlzdHNcbiAgICAgICMgbWVzc2FnZXMgICAgICBcbiAgICAgICRzY29wZS5zaG93Q2hvb3NlRGhiTXNnID0gIWFEYXNoYm9hcmRFeGlzdHNcbiAgICAgICRzY29wZS5zaG93Tm9XaWRnZXRzTXNnID0gYURhc2hib2FyZEV4aXN0cyAmJiAhYVdpZGdldEV4aXN0c1xuICAgICAgI3dpZGdldHNcbiAgICAgICRzY29wZS5jYW5NYW5hZ2VXaWRnZXRzID0gdHJ1ZVxuXG5cbiAgICAjIFVzZWQgYnkgdGhlIGRhc2hib2FyZCBzZWxlY3RvciAodG9wIG9mIHRoZSBwYWdlKVxuICAgICRzY29wZS5zZWxlY3REYXNoYm9hcmQgPSAoZGhiSWQpIC0+XG4gICAgICAkc2NvcGUuY3VycmVudERoYklkID0gZGhiSWRcbiAgICAgICRzY29wZS5yZWZyZXNoRGFzaGJvYXJkcygpXG5cbiAgICAkc2NvcGUudG9vZ2xlU2hvd0Rhc2hib2FyZHNMaXN0ID0gLT5cbiAgICAgIHJldHVybiBpZiAkc2NvcGUuc2hvd0NoYW5nZURoYk5hbWVcblxuICAgICAgaWYgKCRzY29wZS5kYXNoYm9hcmRzTGlzdC5sZW5ndGggPiAxIHx8ICRzY29wZS5zaG93Q3JlYXRlRGhiKVxuICAgICAgICAkc2NvcGUuc2hvd0Rhc2hib2FyZHNMaXN0ID0gISRzY29wZS5zaG93RGFzaGJvYXJkc0xpc3RcbiAgICAgIGVsc2VcbiAgICAgICAgJHNjb3BlLnNob3dEYXNoYm9hcmRzTGlzdCA9IGZhbHNlXG5cbiAgICAkc2NvcGUudG9vZ2xlU2hvd0NoYW5nZURoYk5hbWUgPSAoZGhiKSAtPlxuICAgICAgdG1wRGhiQ3B5ID0gYW5ndWxhci5jb3B5KGRoYilcbiAgICAgICRzY29wZS5kYXNoYm9hcmRUb0NoYW5nZSA9IHt9XG4gICAgICAkc2NvcGUuZGFzaGJvYXJkVG9DaGFuZ2UuaWQgPSB0bXBEaGJDcHkuaWRcbiAgICAgICRzY29wZS5kYXNoYm9hcmRUb0NoYW5nZS5uYW1lID0gdG1wRGhiQ3B5LmZ1bGxfbmFtZVxuICAgICAgJHNjb3BlLnNob3dDaGFuZ2VEaGJOYW1lID0gISRzY29wZS5zaG93Q2hhbmdlRGhiTmFtZVxuICAgICAgJHRpbWVvdXQgLT5cbiAgICAgICAgZWxlbSA9ICQoJyNjaGFuZ2VEaGJOYW1lSW5wdXQnKVxuICAgICAgICBlbGVtLnNlbGVjdCgpXG4gICAgICAgIGVsZW0uZm9jdXMoKVxuICAgICAgLDEwMFxuXG4gICAgJHNjb3BlLmNoZWNrQ2hhbmdlRGhiTmFtZUFuZENvbmZpcm0gPSAoZXZlbnQpIC0+XG4gICAgICAkc2NvcGUudXBkYXRlRGhiTmFtZSgpIGlmIGV2ZW50LmtleUNvZGUgPT0gMTNcbiAgICAgICRzY29wZS5zaG93Q2hhbmdlRGhiTmFtZSA9IGZhbHNlIGlmIGV2ZW50LmtleUNvZGUgPT0gMjdcblxuICAgICRzY29wZS51cGRhdGVEaGJOYW1lID0gLT5cbiAgICAgIHJldHVybiBpZiAhJHNjb3BlLmRhc2hib2FyZFRvQ2hhbmdlPyB8fCBfLmlzRW1wdHkoJHNjb3BlLmRhc2hib2FyZFRvQ2hhbmdlLm5hbWUpXG4gICAgICBEaGJBbmFseXRpY3NTdmMuZGFzaGJvYXJkcy51cGRhdGUoJHNjb3BlLmRhc2hib2FyZFRvQ2hhbmdlLmlkLCB7bmFtZTogJHNjb3BlLmRhc2hib2FyZFRvQ2hhbmdlLm5hbWV9KVxuICAgICAgXy5maW5kKCRzY29wZS5kYXNoYm9hcmRzTGlzdCwgKGRoYikgLT5cbiAgICAgICAgZGhiLmlkID09ICRzY29wZS5kYXNoYm9hcmRUb0NoYW5nZS5pZFxuICAgICAgKS5mdWxsX25hbWUgPSAkc2NvcGUuZGFzaGJvYXJkVG9DaGFuZ2UubmFtZVxuICAgICAgJHNjb3BlLnNob3dDaGFuZ2VEaGJOYW1lID0gZmFsc2VcblxuXG4gICAgIz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICMgRGFzaGJvYXJkIG1hbmFnZW1lbnQgLSB3aWRnZXQgc2VsZWN0b3JcbiAgICAjPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFxuXG4gICAgJHNjb3BlLnNlbGVjdGVkQ2F0ZWdvcnkgPSAnYWNjb3VudHMnXG4gICAgJHNjb3BlLmlzQ2F0ZWdvcnlTZWxlY3RlZCA9IChhQ2F0TmFtZSkgLT5cbiAgICAgIGlmICRzY29wZS5zZWxlY3RlZENhdGVnb3J5PyAmJiBhQ2F0TmFtZT9cbiAgICAgICAgcmV0dXJuICRzY29wZS5zZWxlY3RlZENhdGVnb3J5ID09IGFDYXROYW1lXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgJHNjb3BlLmdldFNlbGVjdGVkQ2F0ZWdvcnlOYW1lID0gLT5cbiAgICAgIGlmICRzY29wZS5zZWxlY3RlZENhdGVnb3J5P1xuICAgICAgICBzd2l0Y2ggJHNjb3BlLnNlbGVjdGVkQ2F0ZWdvcnlcbiAgICAgICAgICB3aGVuICdhY2NvdW50cydcbiAgICAgICAgICAgIHJldHVybiAnQWNjb3VudGluZydcbiAgICAgICAgICB3aGVuICdpbnZvaWNlcydcbiAgICAgICAgICAgIHJldHVybiAnSW52b2ljaW5nJ1xuICAgICAgICAgIHdoZW4gJ2hyJ1xuICAgICAgICAgICAgcmV0dXJuICdIUiAvIFBheXJvbGwnXG4gICAgICAgICAgd2hlbiAnc2FsZXMnXG4gICAgICAgICAgICByZXR1cm4gJ1NhbGVzJ1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICRzY29wZS5nZXRTZWxlY3RlZENhdGVnb3J5VG9wID0gLT5cbiAgICAgIGlmICRzY29wZS5zZWxlY3RlZENhdGVnb3J5P1xuICAgICAgICBzd2l0Y2ggJHNjb3BlLnNlbGVjdGVkQ2F0ZWdvcnlcbiAgICAgICAgICB3aGVuICdhY2NvdW50cydcbiAgICAgICAgICAgIHJldHVybiB7dG9wOiAnMzNweCd9XG4gICAgICAgICAgd2hlbiAnaW52b2ljZXMnXG4gICAgICAgICAgICByZXR1cm4ge3RvcDogJzY0cHgnfVxuICAgICAgICAgIHdoZW4gJ2hyJ1xuICAgICAgICAgICAgcmV0dXJuIHt0b3A6ICc5NXB4J31cbiAgICAgICAgICB3aGVuICdzYWxlcydcbiAgICAgICAgICAgIHJldHVybiB7dG9wOiAnMTI2cHgnfVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB7dG9wOiAnOTk5OTk5OXB4J31cbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAkc2NvcGUuZ2V0V2lkZ2V0c0ZvclNlbGVjdGVkQ2F0ZWdvcnkgPSAtPlxuICAgICAgaWYgJHNjb3BlLnNlbGVjdGVkQ2F0ZWdvcnk/ICYmICRzY29wZS53aWRnZXRzTGlzdD9cbiAgICAgICAgcmV0dXJuIF8uc2VsZWN0ICRzY29wZS53aWRnZXRzTGlzdCwgKGFXaWRnZXRUZW1wbGF0ZSkgLT5cbiAgICAgICAgICBhV2lkZ2V0VGVtcGxhdGUucGF0aC5zcGxpdCgnLycpWzBdID09ICRzY29wZS5zZWxlY3RlZENhdGVnb3J5XG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiBbXVxuXG4gICAgJHNjb3BlLmFkZFdpZGdldCA9ICh3aWRnZXRQYXRoLCB3aWRnZXRNZXRhZGF0YT1udWxsKSAtPlxuICAgICAgcGFyYW1zID0ge3dpZGdldF9jYXRlZ29yeTogd2lkZ2V0UGF0aH1cbiAgICAgIGlmIHdpZGdldE1ldGFkYXRhP1xuICAgICAgICBhbmd1bGFyLmV4dGVuZChwYXJhbXMsIHttZXRhZGF0YTogd2lkZ2V0TWV0YWRhdGF9KVxuICAgICAgYW5ndWxhci5lbGVtZW50KCcjd2lkZ2V0LXNlbGVjdG9yJykuY3NzKCdjdXJzb3InLCAncHJvZ3Jlc3MnKVxuICAgICAgYW5ndWxhci5lbGVtZW50KCcjd2lkZ2V0LXNlbGVjdG9yIC50b3AtY29udGFpbmVyIC5yb3cubGluZXMgcCcpLmNzcygnY3Vyc29yJywgJ3Byb2dyZXNzJylcbiAgICAgIERoYkFuYWx5dGljc1N2Yy53aWRnZXRzLmNyZWF0ZSgkc2NvcGUuY3VycmVudERoYklkLHBhcmFtcykudGhlbihcbiAgICAgICAgKCkgLT5cbiAgICAgICAgICAkc2NvcGUuZXJyb3JzID0gJydcbiAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJyN3aWRnZXQtc2VsZWN0b3InKS5jc3MoJ2N1cnNvcicsICdhdXRvJylcbiAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJyN3aWRnZXQtc2VsZWN0b3IgLnRvcC1jb250YWluZXIgLnJvdy5saW5lcyBwJykuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpXG4gICAgICAgICAgYW5ndWxhci5lbGVtZW50KCcjd2lkZ2V0LXNlbGVjdG9yIC5iYWRnZS5jb25maXJtYXRpb24nKS5mYWRlVG8oMjUwLDEpXG4gICAgICAgICAgJHRpbWVvdXQgLT5cbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI3dpZGdldC1zZWxlY3RvciAuYmFkZ2UuY29uZmlybWF0aW9uJykuZmFkZVRvKDcwMCwwKVxuICAgICAgICAgICw0MDAwXG4gICAgICAgICwgKGVycm9ycykgLT5cbiAgICAgICAgICAkc2NvcGUuZXJyb3JzID0gVXRpbGl0aWVzLnByb2Nlc3NSYWlsc0Vycm9yKGVycm9ycylcbiAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJyN3aWRnZXQtc2VsZWN0b3InKS5jc3MoJ2N1cnNvcicsICdhdXRvJylcbiAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJyN3aWRnZXQtc2VsZWN0b3IgLnRvcC1jb250YWluZXIgLnJvdy5saW5lcyBwJykuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpXG4gICAgICApLmZpbmFsbHkoIC0+XG4gICAgICAgICRzY29wZS5zZXREaXNwbGF5KClcbiAgICAgIClcblxuXG4gICAgIz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICMgRGFzaGJvYXJkIG1hbmFnZW1lbnQgLSBNb2RhbHNcbiAgICAjPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICBcblxuICAgICMgV291bGQgaXQgYmUgcG9zc2libGUgdG8gbWFuYWdlIG1vZGFscyBpbiBhIHNlcGFyYXRlIG1vZHVsZSA/IFxuICAgICMgLT4gQ2hlY2sgbWFlc3RyYW5vLW1vZGFsIChtb2RhbC1zdmMpIGZvciBmdXJ0aGVyIHVwZGF0ZVxuICAgICRzY29wZS5tb2RhbCA9IHt9XG4gICAgJHNjb3BlLm1vZGFsLmNyZWF0ZURhc2hib2FyZCA9IG1vZGFsQ3JlYXRlRGFzaGJvYXJkID0gJHNjb3BlLiRuZXcodHJ1ZSlcbiAgICAkc2NvcGUubW9kYWwuZGVsZXRlRGFzaGJvYXJkID0gbW9kYWxEZWxldGVEYXNoYm9hcmQgPSAkc2NvcGUuJG5ldyh0cnVlKVxuICAgICRzY29wZS5tb2RhbC53aWRnZXRTdWdnZXN0aW9uID0gbW9kYWxXaWRnZXRTdWdnZXN0aW9uID0gJHNjb3BlLiRuZXcodHJ1ZSlcblxuXG4gICAgIyBNb2RhbCBDcmVhdGUgRGFzaGJvYXJkXG4gICAgbW9kYWxDcmVhdGVEYXNoYm9hcmQuY29uZmlnID0ge1xuICAgICAgYWN0aW9uOiAnY3JlYXRlJyxcbiAgICAgIGluc3RhbmNlOiB7XG4gICAgICAgIGJhY2tkcm9wOiAnc3RhdGljJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6IFRlbXBsYXRlUGF0aFsnYW5hbHl0aWNzL21vZGFscy9jcmVhdGUuaHRtbCddLFxuICAgICAgICBzaXplOiAnbWQnLFxuICAgICAgICB3aW5kb3dDbGFzczogJ2ludmVyc2UgY29ubmVjLWFuYWx5dGljcy1tb2RhbCcsXG4gICAgICAgIHNjb3BlOiBtb2RhbENyZWF0ZURhc2hib2FyZFxuICAgICAgfVxuICAgIH1cblxuICAgIG1vZGFsQ3JlYXRlRGFzaGJvYXJkLm9wZW4gPSAtPlxuICAgICAgc2VsZiA9IG1vZGFsQ3JlYXRlRGFzaGJvYXJkXG4gICAgICBzZWxmLm1vZGVsID0geyBuYW1lOiBudWxsIH1cbiAgICAgIHNlbGYub3JnYW5pemF0aW9ucyA9IGFuZ3VsYXIuY29weSgkc2NvcGUudXNlci5vcmdhbml6YXRpb25zKVxuICAgICAgc2VsZi5jdXJyZW50T3JnYW5pemF0aW9uID0gXy5maW5kV2hlcmUoc2VsZi5vcmdhbml6YXRpb25zLHtpZDogRGhiT3JnYW5pemF0aW9uU3ZjLmdldElkKCl9KVxuICAgICAgc2VsZi5zZWxlY3RNb2RlKCdzaW5nbGUnKVxuICAgICAgc2VsZi5sb2FkaW5nR2lmID0gJHNjb3BlLmFzc2V0UGF0aFsnbG9hZGVyLWRhcmtibHVlLWJnLmdpZiddXG4gICAgICBzZWxmLiRpbnN0YW5jZSA9ICRtb2RhbC5vcGVuKHNlbGYuY29uZmlnLmluc3RhbmNlKVxuICAgICAgc2VsZi5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgc2VsZi5tdWx0aU9yZ2FuaXphdGlvblJlcG9ydGluZyA9ICRzY29wZS51c2VyLm11bHRpX29yZ2FuaXphdGlvbl9yZXBvcnRpbmdcblxuICAgIG1vZGFsQ3JlYXRlRGFzaGJvYXJkLmNsb3NlID0gLT5cbiAgICAgIG1vZGFsQ3JlYXRlRGFzaGJvYXJkLiRpbnN0YW5jZS5jbG9zZSgpXG5cbiAgICBtb2RhbENyZWF0ZURhc2hib2FyZC5wcm9jZWVkID0gLT5cbiAgICAgIHNlbGYgPSBtb2RhbENyZWF0ZURhc2hib2FyZFxuICAgICAgc2VsZi5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICBkYXNoYm9hcmQgPSB7IG5hbWU6IHNlbGYubW9kZWwubmFtZSB9XG4gICAgICBcbiAgICAgICMgQWRkIG9yZ2FuaXphdGlvbnMgaWYgbXVsdGkgY29tcGFueSBkYXNoYm9hcmRcbiAgICAgIGlmIHNlbGYubW9kZSA9PSAnbXVsdGknXG4gICAgICAgIG9yZ2FuaXphdGlvbnMgPSBfLnNlbGVjdChzZWxmLm9yZ2FuaXphdGlvbnMsIChvKSAtPiBvLiRzZWxlY3RlZCApXG4gICAgICBlbHNlXG4gICAgICAgIG9yZ2FuaXphdGlvbnMgPSBbIHsgaWQ6IERoYk9yZ2FuaXphdGlvblN2Yy5nZXRJZCgpIH0gXVxuICAgICAgXG4gICAgICBpZiBvcmdhbml6YXRpb25zLmxlbmd0aCA+IDBcbiAgICAgICAgZGFzaGJvYXJkLm9yZ2FuaXphdGlvbl9pZHMgPSBfLnBsdWNrKG9yZ2FuaXphdGlvbnMsICdpZCcpXG4gICAgICBcbiAgICAgIERoYkFuYWx5dGljc1N2Yy5kYXNoYm9hcmRzLmNyZWF0ZShkYXNoYm9hcmQpLnRoZW4oXG4gICAgICAgIChkYXNoYm9hcmQpIC0+XG4gICAgICAgICAgc2VsZi5lcnJvcnMgPSAnJ1xuICAgICAgICAgICRzY29wZS5jdXJyZW50RGhiSWQgPSBkYXNoYm9hcmQuaWRcbiAgICAgICAgICBzZWxmLmNsb3NlKClcbiAgICAgICAgLCAoZXJyb3JzKSAtPlxuICAgICAgICAgIHNlbGYuZXJyb3JzID0gVXRpbGl0aWVzLnByb2Nlc3NSYWlsc0Vycm9yKGVycm9ycylcbiAgICAgICkuZmluYWxseSgtPiAkc2NvcGUucmVmcmVzaERhc2hib2FyZHMoKSlcbiAgICAgIFxuICAgIG1vZGFsQ3JlYXRlRGFzaGJvYXJkLnByb2NlZWREaXNhYmxlZCA9IC0+XG4gICAgICBzZWxmID0gbW9kYWxDcmVhdGVEYXNoYm9hcmRcbiAgICAgIHNlbGVjdGVkQ29tcGFuaWVzID0gXy5zZWxlY3Qoc2VsZi5vcmdhbml6YXRpb25zLCAobykgLT4gby4kc2VsZWN0ZWQpXG4gICAgICBcbiAgICAgICMgQ2hlY2sgdGhhdCBkYXNoYm9hcmQgaGFzIGEgbmFtZVxuICAgICAgYWRkaXRpb25hbF9jb25kaXRpb24gPSAhc2VsZi5tb2RlbC5uYW1lIHx8IHNlbGYubW9kZWwubmFtZSA9PSAnJ1xuICAgICAgXG4gICAgICAjIENoZWNrIHRoYXQgc29tZSBjb21wYW5pZXMgaGF2ZSBiZWVuIHNlbGVjdGVkXG4gICAgICBhZGRpdGlvbmFsX2NvbmRpdGlvbiB8fD0gc2VsZWN0ZWRDb21wYW5pZXMubGVuZ3RoID09IDBcbiAgICAgIFxuICAgICAgIyBDaGVjayB0aGF0IHVzZXIgY2FuIGFjY2VzcyB0aGUgYW5hbHl0aWNzIGRhdGEgZm9yIHRoaXMgY29tcGFueVxuICAgICAgYWRkaXRpb25hbF9jb25kaXRpb24gfHw9IF8uc2VsZWN0KHNlbGVjdGVkQ29tcGFuaWVzLCAobykgLT4gc2VsZi5jYW5BY2Nlc3NBbmFseXRpY3NEYXRhKG8pKS5sZW5ndGggPT0gMFxuICAgICAgXG4gICAgICByZXR1cm4gc2VsZi5pc0xvYWRpbmcgfHwgYWRkaXRpb25hbF9jb25kaXRpb25cblxuICAgIG1vZGFsQ3JlYXRlRGFzaGJvYXJkLmJ0bkJsYXNzRm9yID0gKG1vZGUpIC0+XG4gICAgICBzZWxmID0gbW9kYWxDcmVhdGVEYXNoYm9hcmRcbiAgICAgIGlmIG1vZGUgPT0gc2VsZi5tb2RlXG4gICAgICAgIFwiYnRuIGJ0bi1zbSBidG4td2FybmluZyBhY3RpdmVcIlxuICAgICAgZWxzZVxuICAgICAgICBcImJ0biBidG4tc20gYnRuLWRlZmF1bHRcIlxuICAgIFxuICAgIG1vZGFsQ3JlYXRlRGFzaGJvYXJkLnNlbGVjdE1vZGUgPSAobW9kZSkgLT5cbiAgICAgIHNlbGYgPSBtb2RhbENyZWF0ZURhc2hib2FyZFxuICAgICAgXy5lYWNoKHNlbGYub3JnYW5pemF0aW9ucywgKG8pIC0+IG8uJHNlbGVjdGVkID0gZmFsc2UpXG4gICAgICBzZWxmLmN1cnJlbnRPcmdhbml6YXRpb24uJHNlbGVjdGVkID0gKG1vZGUgPT0gJ3NpbmdsZScpXG4gICAgICBzZWxmLm1vZGUgPSBtb2RlXG4gICAgXG4gICAgbW9kYWxDcmVhdGVEYXNoYm9hcmQuaXNTZWxlY3RPcmdhbml6YXRpb25TaG93biA9IC0+XG4gICAgICBtb2RhbENyZWF0ZURhc2hib2FyZC5tb2RlID09ICdtdWx0aSdcbiAgICBcbiAgICBtb2RhbENyZWF0ZURhc2hib2FyZC5pc0N1cnJlbnRPcmdhbml6YXRpb25TaG93biA9IC0+XG4gICAgICBtb2RhbENyZWF0ZURhc2hib2FyZC5tb2RlID09ICdzaW5nbGUnXG4gICAgXG4gICAgbW9kYWxDcmVhdGVEYXNoYm9hcmQuY2FuQWNjZXNzQW5hbHl0aWNzRm9yQ3VycmVudE9yZ2FuaXphdGlvbiA9IC0+XG4gICAgICBzZWxmID0gbW9kYWxDcmVhdGVEYXNoYm9hcmRcbiAgICAgIHNlbGYuY2FuQWNjZXNzQW5hbHl0aWNzRGF0YShzZWxmLmN1cnJlbnRPcmdhbml6YXRpb24pXG4gICAgXG4gICAgbW9kYWxDcmVhdGVEYXNoYm9hcmQuaXNNdWx0aUNvbXBhbnlBdmFpbGFibGUgPSAtPlxuICAgICAgbW9kYWxDcmVhdGVEYXNoYm9hcmQub3JnYW5pemF0aW9ucy5sZW5ndGggPiAxICYmIG1vZGFsQ3JlYXRlRGFzaGJvYXJkLm11bHRpT3JnYW5pemF0aW9uUmVwb3J0aW5nXG5cbiAgICBtb2RhbENyZWF0ZURhc2hib2FyZC5jYW5BY2Nlc3NBbmFseXRpY3NEYXRhID0gKG9yZ2FuaXphdGlvbikgLT5cbiAgICAgIG9yZ2FuaXphdGlvbi5jdXJyZW50X3VzZXJfcm9sZSAmJiAoXG4gICAgICAgIG9yZ2FuaXphdGlvbi5jdXJyZW50X3VzZXJfcm9sZSA9PSBcIlN1cGVyIEFkbWluXCIgfHxcbiAgICAgICAgb3JnYW5pemF0aW9uLmN1cnJlbnRfdXNlcl9yb2xlID09IFwiQWRtaW5cIlxuICAgICAgKVxuXG4gICAgIyBNb2RhbCBEZWxldGUgRGFzaGJvYXJkXG4gICAgbW9kYWxEZWxldGVEYXNoYm9hcmQuY29uZmlnID0ge1xuICAgICAgYWN0aW9uOiAnZGVsZXRlJyxcbiAgICAgIGluc3RhbmNlOiB7XG4gICAgICAgIGJhY2tkcm9wOiAnc3RhdGljJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6IFRlbXBsYXRlUGF0aFsnYW5hbHl0aWNzL21vZGFscy9kZWxldGUuaHRtbCddLFxuICAgICAgICBzaXplOiAnbWQnLFxuICAgICAgICB3aW5kb3dDbGFzczogJ2ludmVyc2UnLFxuICAgICAgICBzY29wZTogbW9kYWxEZWxldGVEYXNoYm9hcmRcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtb2RhbERlbGV0ZURhc2hib2FyZC5vcGVuID0gLT5cbiAgICAgIHNlbGYgPSBtb2RhbERlbGV0ZURhc2hib2FyZFxuICAgICAgc2VsZi5sb2FkaW5nR2lmID0gJHNjb3BlLmFzc2V0UGF0aFsnbG9hZGVyLWRhcmtibHVlLWJnLmdpZiddXG4gICAgICBzZWxmLiRpbnN0YW5jZSA9ICRtb2RhbC5vcGVuKHNlbGYuY29uZmlnLmluc3RhbmNlKVxuICAgICAgc2VsZi5pc0xvYWRpbmcgPSBmYWxzZVxuXG4gICAgbW9kYWxEZWxldGVEYXNoYm9hcmQuY2xvc2UgPSAtPlxuICAgICAgbW9kYWxEZWxldGVEYXNoYm9hcmQuJGluc3RhbmNlLmNsb3NlKClcblxuICAgIG1vZGFsRGVsZXRlRGFzaGJvYXJkLnByb2NlZWQgPSAtPlxuICAgICAgc2VsZiA9IG1vZGFsRGVsZXRlRGFzaGJvYXJkXG4gICAgICBzZWxmLmlzTG9hZGluZyA9IHRydWVcbiAgICAgICAgXG4gICAgICBEaGJBbmFseXRpY3NTdmMuZGFzaGJvYXJkcy5kZWxldGUoJHNjb3BlLmN1cnJlbnREaGJJZCkudGhlbihcbiAgICAgICAgKCkgLT5cbiAgICAgICAgICBzZWxmLmVycm9ycyA9ICcnXG4gICAgICAgICAgJHNjb3BlLmN1cnJlbnREaGJJZCA9IERoYkFuYWx5dGljc1N2Yy5nZXRJZCgpXG4gICAgICAgICAgc2VsZi5jbG9zZSgpXG4gICAgICAgICwgKGVycm9ycykgLT5cbiAgICAgICAgICBzZWxmLmVycm9ycyA9IFV0aWxpdGllcy5wcm9jZXNzUmFpbHNFcnJvcihlcnJvcnMpXG4gICAgICApLmZpbmFsbHkoLT4gJHNjb3BlLnJlZnJlc2hEYXNoYm9hcmRzKCkpXG5cblxuICAgICMgTW9kYWwgV2lkZ2V0IFN1Z2dlc3Rpb25cbiAgICBtb2RhbFdpZGdldFN1Z2dlc3Rpb24ud2lkZ2V0RGV0YWlscyA9IHt9XG4gICAgbW9kYWxXaWRnZXRTdWdnZXN0aW9uLmNvbmZpZyA9IHtcbiAgICAgIGluc3RhbmNlOiB7XG4gICAgICAgIGJhY2tkcm9wOiAnc3RhdGljJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6IFRlbXBsYXRlUGF0aFsnYW5hbHl0aWNzL21vZGFscy93aWRnZXQtc3VnZ2VzdGlvbi5odG1sJ10sXG4gICAgICAgIHNpemU6ICdtZCcsXG4gICAgICAgIHdpbmRvd0NsYXNzOiAnaW52ZXJzZSBpbXBhYy13aWRnZXQtc3VnZ2VzdGlvbicsXG4gICAgICAgIHNjb3BlOiBtb2RhbFdpZGdldFN1Z2dlc3Rpb25cbiAgICAgIH1cbiAgICB9XG5cbiAgICBtb2RhbFdpZGdldFN1Z2dlc3Rpb24ub3BlbiA9IC0+XG4gICAgICBzZWxmID0gbW9kYWxXaWRnZXRTdWdnZXN0aW9uXG4gICAgICBzZWxmLnVzZXJOYW1lID0gVXNlclN2Yy5kb2N1bWVudC51c2VyLm5hbWVcbiAgICAgIHNlbGYubG9hZGluZ0dpZiA9ICRzY29wZS5hc3NldFBhdGhbJ2xvYWRlci1kYXJrYmx1ZS1iZy5naWYnXVxuICAgICAgc2VsZi4kaW5zdGFuY2UgPSAkbW9kYWwub3BlbihzZWxmLmNvbmZpZy5pbnN0YW5jZSlcbiAgICAgIHNlbGYuaXNMb2FkaW5nID0gZmFsc2VcblxuICAgIG1vZGFsV2lkZ2V0U3VnZ2VzdGlvbi5jbG9zZSA9IC0+XG4gICAgICBtb2RhbFdpZGdldFN1Z2dlc3Rpb24uJGluc3RhbmNlLmNsb3NlKClcblxuICAgIG1vZGFsV2lkZ2V0U3VnZ2VzdGlvbi5wcm9jZWVkID0gLT5cbiAgICAgIHNlbGYgPSBtb2RhbFdpZGdldFN1Z2dlc3Rpb25cbiAgICAgIHNlbGYuaXNMb2FkaW5nID0gdHJ1ZVxuXG4gICAgICBkYXRhID0ge1xuICAgICAgICB3aWRnZXRfbmFtZTogc2VsZi53aWRnZXREZXRhaWxzLm5hbWUsXG4gICAgICAgIHdpZGdldF9jYXRlZ29yeTogc2VsZi53aWRnZXREZXRhaWxzLmNhdGVnb3J5LFxuICAgICAgICB3aWRnZXRfZGVzY3JpcHRpb246IHNlbGYud2lkZ2V0RGV0YWlscy5kZXNjcmlwdGlvblxuICAgICAgfVxuXG4gICAgICAkaHR0cC5wb3N0KCcvanNfYXBpL3YxL21haWxlcnMnLHt0ZW1wbGF0ZTogJ3dpZGdldF9zdWdnZXN0aW9uJywgb3B0czogZGF0YX0pXG4gICAgICBcbiAgICAgICMgVGhhbmsgeW91LCB1c2VyLi4uXG4gICAgICAkdGltZW91dCAtPlxuICAgICAgICBzZWxmLmNsb3NlKClcbiAgICAgICAgc2VsZi53aWRnZXREZXRhaWxzID0ge31cbiAgICAgICAgc2VsZi5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgLDMwMDBcbiAgICBcblxuICAgICM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAjIERyYWcgJiBEcm9wIG1hbmFnZW1lbnRcbiAgICAjPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICAgICAgXG5cbiAgICAkc2NvcGUuc29ydGFibGVPcHRpb25zID0ge1xuICAgICAgIyBXaGVuIHRoZSB3aWRnZXQgaXMgZHJvcHBlZFxuICAgICAgc3RvcDogc2F2ZURhc2hib2FyZCA9IC0+XG4gICAgICAgIGRhdGEgPSB7IHdpZGdldHNfb3JkZXI6IF8ucGx1Y2soJHNjb3BlLmN1cnJlbnREaGIud2lkZ2V0cywnaWQnKSB9XG4gICAgICAgIERoYkFuYWx5dGljc1N2Yy5kYXNoYm9hcmRzLnVwZGF0ZSgkc2NvcGUuY3VycmVudERoYklkLGRhdGEsZmFsc2UpXG4gICAgICBcbiAgICAgICMgV2hlbiB0aGUgd2lkZ2V0IGlzIHN0YXJ0aW5nIHRvIGJlIGRyYWdnZWRcbiAgICAgICxzdGFydDogdXBkYXRlUGxhY2VIb2xkZXJTaXplID0gKGUsIHdpZGdldCkgLT5cbiAgICAgICAgIyB3aWR0aC0xIHRvIGF2b2lkIHJldHVybiB0byBsaW5lIChzdWNjZXNzaW9uIG9mIGZsb2F0IGxlZnQgZGl2cy4uLilcbiAgICAgICAgd2lkZ2V0LnBsYWNlaG9sZGVyLmNzcyhcIndpZHRoXCIsd2lkZ2V0Lml0ZW0ud2lkdGgoKSAtIDEpXG4gICAgICAgIHdpZGdldC5wbGFjZWhvbGRlci5jc3MoXCJoZWlnaHRcIix3aWRnZXQuaXRlbS5oZWlnaHQoKSlcblxuICAgICAgICAjICMgRGV0ZXJtaW5pbmcgaGVpZ2h0IG9mIHRoZSBwbGFjZWhvbGRlclxuICAgICAgICAjIG1heEhlaWdodD0wXG4gICAgICAgICMgXy5lYWNoIGUuY3VycmVudFRhcmdldC5jaGlsZHJlbiwgKHcpIC0+XG4gICAgICAgICMgICBpZiAody5jbGFzc05hbWUgIT0gJ3BsYWNlSG9sZGVyQm94JylcbiAgICAgICAgIyAgICAgaGVpZ2h0ID0gdy5jbGllbnRIZWlnaHRcbiAgICAgICAgIyAgICAgaWYgaGVpZ2h0ID4gbWF4SGVpZ2h0XG4gICAgICAgICMgICAgICAgbWF4SGVpZ2h0ID0gaGVpZ2h0XG4gICAgICAgICMgY3NzSGVpZ2h0ID0gJydcbiAgICAgICAgIyBjc3NIZWlnaHQgPSBjc3NIZWlnaHQuY29uY2F0KG1heEhlaWdodClcbiAgICAgICAgIyBjc3NIZWlnaHQgPSBjc3NIZWlnaHQuY29uY2F0KCdweCcpXG4gICAgICAgICMgXy5lYWNoIGUuY3VycmVudFRhcmdldC5jaGlsZHJlbiwgKHcpIC0+XG4gICAgICAgICMgICB3LnN0eWxlLmhlaWdodCA9IGNzc0hlaWdodFxuICAgICAgICAjICAgdy5zdHlsZS5jbGVhciA9ICdub25lJ1xuXG5cbiAgICAgICMgT3B0aW9uc1xuICAgICAgLGN1cnNvckF0OiB7bGVmdDogMTAwLCB0b3A6IDIwfVxuICAgICAgLG9wYWNpdHk6IDAuNVxuICAgICAgLGRlbGF5OiAxNTBcbiAgICAgICx0b2xlcmFuY2U6ICdwb2ludGVyJ1xuICAgICAgLHBsYWNlaG9sZGVyOiBcInBsYWNlSG9sZGVyQm94XCJcbiAgICAgICxjdXJzb3I6IFwibW92ZVwiXG4gICAgICAscmV2ZXJ0OiAyNTBcbiAgICAgIH1cblxuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnYW5hbHl0aWNzSW5kZXgnLCBbJ1RlbXBsYXRlUGF0aCcsIChUZW1wbGF0ZVBhdGgpIC0+XG4gIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgc2NvcGU6IHtcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZVVybDogVGVtcGxhdGVQYXRoWydhbmFseXRpY3MvaW5kZXguaHRtbCddLFxuICAgICAgY29udHJvbGxlcjogJ0FuYWx5dGljc0luZGV4Q3RybCdcbiAgICB9XG5dKSJdfQ==
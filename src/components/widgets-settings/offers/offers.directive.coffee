module = angular.module('impac.components.widgets-settings.offers',[])
module.controller('SettingOffersCtrl', ($scope, $log, ImpacDashboardsSvc) ->

  w = $scope.parentWidget
  $scope.selectedOffer = {}

  # What will be passed to parentWidget
  setting = {}
  setting.key = "offers"
  setting.isInitialized = false

  setting.initialize = ->
    $scope.selectedOffer = _.find w.content.offers, (offer) ->
      offer.id == w.content.selected_offer.id

  setting.toMetadata = ->
    w.content.selected_offer = $scope.selectedOffer
    return { offer: w.content.selected_offer }

  w.settings.push(setting)

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingOffers', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
      onSelect: '&?'
    },
    template: $templateCache.get('widgets-settings/offers.tmpl.html'),
    controller: 'SettingOffersCtrl'
  }
)

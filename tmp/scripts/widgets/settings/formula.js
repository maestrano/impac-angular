(function () {
var module;

module = angular.module('maestrano.analytics.widgets-settings.formula', ['maestrano.assets']);

module.controller('SettingFormulaCtrl', [
  '$scope', '$filter', function($scope, $filter) {
    var authorized_regex, evaluateFormula, formatFormula, getFormula, setting, w;
    w = $scope.parentWidget;
    w.formula = "";
    authorized_regex = new RegExp("^(\\{|\\d|\\}|\\/|\\+|-|\\*|\\(|\\)|\\s|\\.)*$");
    setting = {};
    setting.key = "formula";
    setting.isInitialized = false;
    setting.initialize = function() {
      if ((w.metadata != null) && (w.metadata.formula != null)) {
        w.formula = w.metadata.formula;
        return setting.isInitialized = true;
      } else {
        return w.formula = "";
      }
    };
    setting.toMetadata = function() {
      evaluateFormula();
      if (w.isFormulaCorrect) {
        return {
          formula: w.formula
        };
      } else {
        return {
          formula: ""
        };
      }
    };
    getFormula = function() {
      return w.formula;
    };
    w.formatAmount = function(anAccount) {
      return $filter('mnoCurrency')(anAccount.current_balance, anAccount.currency);
    };
    $scope.$watch(getFormula, function(e) {
      return evaluateFormula();
    });
    evaluateFormula = function() {
      var e, i, legend, str;
      str = angular.copy(w.formula);
      legend = angular.copy(w.formula);
      i = 1;
      angular.forEach(w.selectedAccounts, function(account) {
        var balancePattern;
        balancePattern = "\\{" + i + "\\}";
        str = str.replace(new RegExp(balancePattern, 'g'), account.current_balance_no_format);
        legend = legend.replace(new RegExp(balancePattern, 'g'), account.name);
        return i++;
      });
      if (!str.match(authorized_regex)) {
        w.isFormulaCorrect = false;
        w.evaluatedFormula = "invalid expression";
      }
      try {
        w.evaluatedFormula = eval(str).toFixed(2);
      } catch (_error) {
        e = _error;
        w.evaluatedFormula = "invalid expression";
      }
      if ((w.evaluatedFormula == null) || w.evaluatedFormula === "invalid expression" || w.evaluatedFormula === "Infinity" || w.evaluatedFormula === "-Infinity") {
        return w.isFormulaCorrect = false;
      } else {
        formatFormula();
        w.legend = legend;
        return w.isFormulaCorrect = true;
      }
    };
    formatFormula = function() {
      var currency, firstAcc;
      if (!w.formula.match(/\//g) && (w.selectedAccounts != null)) {
        if (firstAcc = w.selectedAccounts[0]) {
          if (currency = firstAcc.currency) {
            return w.evaluatedFormula = $filter('mnoCurrency')(w.evaluatedFormula, currency);
          }
        }
      }
    };
    w.settings || (w.settings = []);
    return w.settings.push(setting);
  }
]);

module.directive('settingFormula', [
  'TemplatePath', function(TemplatePath) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '='
      },
      controller: 'SettingFormulaCtrl'
    };
  }
]);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvc2V0dGluZ3MvZm9ybXVsYS5qcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSw4Q0FBZixFQUE4RCxDQUFDLGtCQUFELENBQTlEOztBQUVULE1BQU0sQ0FBQyxVQUFQLENBQWtCLG9CQUFsQixFQUF3QztFQUFDLFFBQUQsRUFBVyxTQUFYLEVBQXNCLFNBQUMsTUFBRCxFQUFTLE9BQVQ7QUFFNUQsUUFBQTtJQUFBLENBQUEsR0FBSSxNQUFNLENBQUM7SUFDWCxDQUFDLENBQUMsT0FBRixHQUFZO0lBR1osZ0JBQUEsR0FBdUIsSUFBQSxNQUFBLENBQU8sZ0RBQVA7SUFFdkIsT0FBQSxHQUFVO0lBQ1YsT0FBTyxDQUFDLEdBQVIsR0FBYztJQUNkLE9BQU8sQ0FBQyxhQUFSLEdBQXdCO0lBRXhCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7TUFDbkIsSUFBRyxvQkFBQSxJQUFlLDRCQUFsQjtRQUNFLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQztlQUN2QixPQUFPLENBQUMsYUFBUixHQUF3QixLQUYxQjtPQUFBLE1BQUE7ZUFJRSxDQUFDLENBQUMsT0FBRixHQUFZLEdBSmQ7O0lBRG1CO0lBT3JCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7TUFDbkIsZUFBQSxDQUFBO01BQ0EsSUFBRyxDQUFDLENBQUMsZ0JBQUw7QUFDRSxlQUFPO1VBQUUsT0FBQSxFQUFTLENBQUMsQ0FBQyxPQUFiO1VBRFQ7T0FBQSxNQUFBO0FBR0UsZUFBTztVQUFFLE9BQUEsRUFBUyxFQUFYO1VBSFQ7O0lBRm1CO0lBT3JCLFVBQUEsR0FBYSxTQUFBO0FBQ1gsYUFBTyxDQUFDLENBQUM7SUFERTtJQUdiLENBQUMsQ0FBQyxZQUFGLEdBQWlCLFNBQUMsU0FBRDtBQUNmLGFBQU8sT0FBQSxDQUFRLGFBQVIsQ0FBQSxDQUF1QixTQUFTLENBQUMsZUFBakMsRUFBaUQsU0FBUyxDQUFDLFFBQTNEO0lBRFE7SUFHakIsTUFBTSxDQUFDLE1BQVAsQ0FBYyxVQUFkLEVBQTBCLFNBQUMsQ0FBRDthQUN4QixlQUFBLENBQUE7SUFEd0IsQ0FBMUI7SUFHQSxlQUFBLEdBQWtCLFNBQUE7QUFDaEIsVUFBQTtNQUFBLEdBQUEsR0FBTSxPQUFPLENBQUMsSUFBUixDQUFhLENBQUMsQ0FBQyxPQUFmO01BQ04sTUFBQSxHQUFTLE9BQU8sQ0FBQyxJQUFSLENBQWEsQ0FBQyxDQUFDLE9BQWY7TUFDVCxDQUFBLEdBQUU7TUFDRixPQUFPLENBQUMsT0FBUixDQUFnQixDQUFDLENBQUMsZ0JBQWxCLEVBQW9DLFNBQUMsT0FBRDtBQUNsQyxZQUFBO1FBQUEsY0FBQSxHQUFpQixLQUFBLEdBQU0sQ0FBTixHQUFRO1FBQ3pCLEdBQUEsR0FBTSxHQUFHLENBQUMsT0FBSixDQUFnQixJQUFBLE1BQUEsQ0FBTyxjQUFQLEVBQXVCLEdBQXZCLENBQWhCLEVBQTZDLE9BQU8sQ0FBQyx5QkFBckQ7UUFDTixNQUFBLEdBQVMsTUFBTSxDQUFDLE9BQVAsQ0FBbUIsSUFBQSxNQUFBLENBQU8sY0FBUCxFQUF1QixHQUF2QixDQUFuQixFQUFnRCxPQUFPLENBQUMsSUFBeEQ7ZUFDVCxDQUFBO01BSmtDLENBQXBDO01BUUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFKLENBQVUsZ0JBQVYsQ0FBTDtRQUNFLENBQUMsQ0FBQyxnQkFBRixHQUFxQjtRQUNyQixDQUFDLENBQUMsZ0JBQUYsR0FBcUIscUJBRnZCOztBQUlBO1FBQ0UsQ0FBQyxDQUFDLGdCQUFGLEdBQXFCLElBQUEsQ0FBSyxHQUFMLENBQVMsQ0FBQyxPQUFWLENBQWtCLENBQWxCLEVBRHZCO09BQUEsY0FBQTtRQUVNO1FBQ0osQ0FBQyxDQUFDLGdCQUFGLEdBQXFCLHFCQUh2Qjs7TUFLQSxJQUFJLDRCQUFELElBQXdCLENBQUMsQ0FBQyxnQkFBRixLQUFzQixvQkFBOUMsSUFBc0UsQ0FBQyxDQUFDLGdCQUFGLEtBQXNCLFVBQTVGLElBQTBHLENBQUMsQ0FBQyxnQkFBRixLQUFzQixXQUFuSTtlQUNFLENBQUMsQ0FBQyxnQkFBRixHQUFxQixNQUR2QjtPQUFBLE1BQUE7UUFHRSxhQUFBLENBQUE7UUFDQSxDQUFDLENBQUMsTUFBRixHQUFXO2VBQ1gsQ0FBQyxDQUFDLGdCQUFGLEdBQXFCLEtBTHZCOztJQXJCZ0I7SUE0QmxCLGFBQUEsR0FBZ0IsU0FBQTtBQUNkLFVBQUE7TUFBQSxJQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFWLENBQWdCLEtBQWhCLENBQUQsSUFBMkIsNEJBQTlCO1FBQ0UsSUFBRyxRQUFBLEdBQVcsQ0FBQyxDQUFDLGdCQUFpQixDQUFBLENBQUEsQ0FBakM7VUFDRSxJQUFHLFFBQUEsR0FBVyxRQUFRLENBQUMsUUFBdkI7bUJBQ0UsQ0FBQyxDQUFDLGdCQUFGLEdBQXFCLE9BQUEsQ0FBUSxhQUFSLENBQUEsQ0FBdUIsQ0FBQyxDQUFDLGdCQUF6QixFQUEyQyxRQUEzQyxFQUR2QjtXQURGO1NBREY7O0lBRGM7SUFNaEIsQ0FBQyxDQUFDLGFBQUYsQ0FBQyxDQUFDLFdBQWE7V0FDZixDQUFDLENBQUMsUUFBUSxDQUFDLElBQVgsQ0FBZ0IsT0FBaEI7RUF0RTRELENBQXRCO0NBQXhDOztBQXlFQSxNQUFNLENBQUMsU0FBUCxDQUFpQixnQkFBakIsRUFBbUM7RUFBQyxjQUFELEVBQWlCLFNBQUMsWUFBRDtBQUNsRCxXQUFPO01BQ0wsUUFBQSxFQUFVLEdBREw7TUFFTCxLQUFBLEVBQU87UUFDTCxZQUFBLEVBQWMsR0FEVDtPQUZGO01BS0wsVUFBQSxFQUFZLG9CQUxQOztFQUQyQyxDQUFqQjtDQUFuQyIsImZpbGUiOiJ3aWRnZXRzL3NldHRpbmdzL2Zvcm11bGEuanMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbWFlc3RyYW5vLmFuYWx5dGljcy53aWRnZXRzLXNldHRpbmdzLmZvcm11bGEnLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignU2V0dGluZ0Zvcm11bGFDdHJsJywgWyckc2NvcGUnLCAnJGZpbHRlcicsICgkc2NvcGUsICRmaWx0ZXIpIC0+XG5cbiAgdyA9ICRzY29wZS5wYXJlbnRXaWRnZXRcbiAgdy5mb3JtdWxhID0gXCJcIlxuXG4gICMgIyBPbmx5IGF1dGhvcml6ZSBtYXRoZW1hdGljYWwgZXhwcmVzc2lvbnNcbiAgYXV0aG9yaXplZF9yZWdleCA9IG5ldyBSZWdFeHAoXCJeKFxcXFx7fFxcXFxkfFxcXFx9fFxcXFwvfFxcXFwrfC18XFxcXCp8XFxcXCh8XFxcXCl8XFxcXHN8XFxcXC4pKiRcIilcblxuICBzZXR0aW5nID0ge31cbiAgc2V0dGluZy5rZXkgPSBcImZvcm11bGFcIlxuICBzZXR0aW5nLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZVxuXG4gIHNldHRpbmcuaW5pdGlhbGl6ZSA9IC0+XG4gICAgaWYgdy5tZXRhZGF0YT8gJiYgdy5tZXRhZGF0YS5mb3JtdWxhP1xuICAgICAgdy5mb3JtdWxhID0gdy5tZXRhZGF0YS5mb3JtdWxhXG4gICAgICBzZXR0aW5nLmlzSW5pdGlhbGl6ZWQgPSB0cnVlXG4gICAgZWxzZVxuICAgICAgdy5mb3JtdWxhID0gXCJcIlxuXG4gIHNldHRpbmcudG9NZXRhZGF0YSA9IC0+XG4gICAgZXZhbHVhdGVGb3JtdWxhKClcbiAgICBpZiB3LmlzRm9ybXVsYUNvcnJlY3RcbiAgICAgIHJldHVybiB7IGZvcm11bGE6IHcuZm9ybXVsYSB9XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIHsgZm9ybXVsYTogXCJcIiB9IFxuXG4gIGdldEZvcm11bGEgPSAtPlxuICAgIHJldHVybiB3LmZvcm11bGFcblxuICB3LmZvcm1hdEFtb3VudCA9IChhbkFjY291bnQpIC0+XG4gICAgcmV0dXJuICRmaWx0ZXIoJ21ub0N1cnJlbmN5JykoYW5BY2NvdW50LmN1cnJlbnRfYmFsYW5jZSxhbkFjY291bnQuY3VycmVuY3kpXG5cbiAgJHNjb3BlLiR3YXRjaCBnZXRGb3JtdWxhLCAoZSkgLT5cbiAgICBldmFsdWF0ZUZvcm11bGEoKVxuXG4gIGV2YWx1YXRlRm9ybXVsYSA9IC0+XG4gICAgc3RyID0gYW5ndWxhci5jb3B5KHcuZm9ybXVsYSlcbiAgICBsZWdlbmQgPSBhbmd1bGFyLmNvcHkody5mb3JtdWxhKVxuICAgIGk9MVxuICAgIGFuZ3VsYXIuZm9yRWFjaCh3LnNlbGVjdGVkQWNjb3VudHMsIChhY2NvdW50KSAtPlxuICAgICAgYmFsYW5jZVBhdHRlcm4gPSBcIlxcXFx7I3tpfVxcXFx9XCJcbiAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoYmFsYW5jZVBhdHRlcm4sICdnJyksIGFjY291bnQuY3VycmVudF9iYWxhbmNlX25vX2Zvcm1hdClcbiAgICAgIGxlZ2VuZCA9IGxlZ2VuZC5yZXBsYWNlKG5ldyBSZWdFeHAoYmFsYW5jZVBhdHRlcm4sICdnJyksIGFjY291bnQubmFtZSlcbiAgICAgIGkrK1xuICAgIClcblxuICAgICMgR3VhcmQgYWdhaW5zdCBpbmplY3Rpb25cbiAgICBpZiAoIXN0ci5tYXRjaChhdXRob3JpemVkX3JlZ2V4KSlcbiAgICAgIHcuaXNGb3JtdWxhQ29ycmVjdCA9IGZhbHNlXG4gICAgICB3LmV2YWx1YXRlZEZvcm11bGEgPSBcImludmFsaWQgZXhwcmVzc2lvblwiXG4gICAgXG4gICAgdHJ5XG4gICAgICB3LmV2YWx1YXRlZEZvcm11bGEgPSBldmFsKHN0cikudG9GaXhlZCgyKVxuICAgIGNhdGNoIGVcbiAgICAgIHcuZXZhbHVhdGVkRm9ybXVsYSA9IFwiaW52YWxpZCBleHByZXNzaW9uXCJcblxuICAgIGlmICF3LmV2YWx1YXRlZEZvcm11bGE/IHx8IHcuZXZhbHVhdGVkRm9ybXVsYSA9PSBcImludmFsaWQgZXhwcmVzc2lvblwiIHx8IHcuZXZhbHVhdGVkRm9ybXVsYSA9PSBcIkluZmluaXR5XCIgfHwgdy5ldmFsdWF0ZWRGb3JtdWxhID09IFwiLUluZmluaXR5XCJcbiAgICAgIHcuaXNGb3JtdWxhQ29ycmVjdCA9IGZhbHNlXG4gICAgZWxzZVxuICAgICAgZm9ybWF0Rm9ybXVsYSgpXG4gICAgICB3LmxlZ2VuZCA9IGxlZ2VuZFxuICAgICAgdy5pc0Zvcm11bGFDb3JyZWN0ID0gdHJ1ZVxuXG4gIGZvcm1hdEZvcm11bGEgPSAtPlxuICAgIGlmICF3LmZvcm11bGEubWF0Y2goL1xcLy9nKSAmJiB3LnNlbGVjdGVkQWNjb3VudHM/XG4gICAgICBpZiBmaXJzdEFjYyA9IHcuc2VsZWN0ZWRBY2NvdW50c1swXVxuICAgICAgICBpZiBjdXJyZW5jeSA9IGZpcnN0QWNjLmN1cnJlbmN5XG4gICAgICAgICAgdy5ldmFsdWF0ZWRGb3JtdWxhID0gJGZpbHRlcignbW5vQ3VycmVuY3knKSh3LmV2YWx1YXRlZEZvcm11bGEsIGN1cnJlbmN5KVxuXG4gIHcuc2V0dGluZ3MgfHw9IFtdXG4gIHcuc2V0dGluZ3MucHVzaChzZXR0aW5nKVxuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnc2V0dGluZ0Zvcm11bGEnLCBbJ1RlbXBsYXRlUGF0aCcsIChUZW1wbGF0ZVBhdGgpIC0+XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBzY29wZToge1xuICAgICAgcGFyZW50V2lkZ2V0OiAnPSdcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6ICdTZXR0aW5nRm9ybXVsYUN0cmwnXG4gIH1cbl0pIl19
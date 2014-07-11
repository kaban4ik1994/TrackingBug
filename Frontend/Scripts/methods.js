
var url = 'http://localhost:49732/api/bug';


app.controller('SettingsController', function($scope, $http) {

    $http.get(url).success(function(data) {
        $scope.bugs = data;
        $scope.bugs.Date = data.Date.now;
    });

    $scope.removeBug = function(id) {
        $http({ method: 'DELETE', url: url, params: { id: id } }).success(function(data) {
            $scope.bugs = data;
        });
    };
    $scope.addBug = function() {
        $http({ method: 'POST', url: url }).success(function(data) {
            $scope.bugs = data;
        });
    };

    $scope.changeBug = function(id, date, status, whoReported) {
        $http({
            method: 'PUT',
            url: url,
            params: { id: id, date: date, status: status, whoReported: whoReported }
        }).success(function(data) {
            $scope.bugs = data;
        });
    };
  

});

    


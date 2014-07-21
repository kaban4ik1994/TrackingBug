
var url = 'http://localhost:52998/api/values';

function GetAllBugs($scope, $http) {
    $http({ method: 'GET', url: url }).success(function (data) {
        $scope.bugs = data;
    });
}

function DeleteBug($scope, $http, id) {
    $http({ method: 'DELETE', url: url + id }).success(function (data) {
        $scope.bugs = data;
    });
}



app.controller('BugListCtrl', ['$scope', 'Bug', '$timeout', '$modal', function ($scope, Bug, $timeout, $modal) {



    //////////////////////////////// тут пагинация 
    $scope.totalItems = Bug.get();
    $scope.currentPage = 1;



    $scope.pageChanged = function () {
        $scope.bugs = Bug.query({ offset: ($scope.currentPage - 1) * 10, limit: 10 });
    };
    //////////////////////////////////


    $scope.bugs = Bug.query({ offset: ($scope.currentPage - 1) * 10, limit: 10 });

    //////////////////////////////////////тут модальное окно


    $scope.open = function (bug) {

        var modalInstance = $modal.open({
            templateUrl: 'app/partials/EditBug.html',
            controller: EditBug,

            resolve: {
                item: function () {
                    return bug;
                }
            }
        });

        modalInstance.result.then(function (item) {

            Bug.update({ id: item.Id, status: item.Status, date: item.Date, whoReported: item.WhoReported }, function () {
                if (item.Id == 0) {
                    if ($scope.currentPage == Math.ceil($scope.totalItems.CountBugs / 10)) { //если находимся на посл странице- нужно обновить содержимое

                        $scope.bugs = Bug.query({ offset: ($scope.currentPage - 1) * 10, limit: 10 });
                    }
                    $scope.totalItems.CountBugs++;

                }

            });


        });
    };


    /////////////////////////////////////

    $scope.delete = function (bug) {
        Bug.delete({ id: bug.Id });
        $scope.totalItems.CountBugs--;
        _.remove($scope.bugs, bug);
    };

}
]);





app.controller('Pagination', ['$scope', 'Bug', function ($scope, Bug) {
    $scope.totalItems = Bug.get();
    $scope.currentPage = 1;
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

}]);





var EditBug = function ($scope, $modalInstance, item) {


    $scope.bug = item;

    ////////////////это данные для списков
    $scope.statuses = [
        'fixed',
        'not fixed'
    ];

    $scope.names = ['pupkin', 'ivanov', 'kiselev'];
    //////

    $scope.ok = function (bug) {
        if (isNaN(bug.Id)) {
            bug.Id = 0;
        }
        $modalInstance.close(bug);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
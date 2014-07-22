
app.controller('BugListCtrl', ['$scope', 'Bug', '$timeout', '$modal', function ($scope, Bug, $timeout, $modal) {


    ///////это выпадающий список

    $scope.status = {
        isopen: false
    };
    


    $scope.chooseItem = function (param) {
        $scope.status.isopen = false;
        $scope.selectedItem = param;
        $scope.currentPage = 1;
        $scope.bugs = Bug.query({ offset: ($scope.currentPage - 1) * 10, limit: 10, filter: $scope.selectedItem });
        $scope.parameters = Bug.get({ filter: $scope.selectedItem });
    };
    /////////


    //////////////////////////////// тут пагинация 

    $scope.currentPage = 1;
    $scope.selectedItem = "";

    $scope.parameters = Bug.get({ filter: $scope.selectedItem });
   

    $scope.pageChanged = function () {
        $scope.bugs = Bug.query({ offset: ($scope.currentPage - 1) * 10, limit: 10, filter: $scope.selectedItem });
    };
    //////////////////////////////////


    $scope.bugs = Bug.query({ offset: ($scope.currentPage - 1) * 10, limit: 10, filter: $scope.selectedItem });

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
                    if ($scope.currentPage == Math.ceil($scope.parameters.CountBugs / 10)) { //если находимся на посл странице- нужно обновить содержимое

                        $scope.bugs = Bug.query({ offset: ($scope.currentPage - 1) * 10, limit: 10, filter: $scope.selectedItem });
                    }
                    $scope.parameters.CountBugs++;

                }

            });


        });
    };


    /////////////////////////////////////

    $scope.delete = function (bug) {
        Bug.delete({ id: bug.Id });
        $scope.parameters.CountBugs--;
        _.remove($scope.bugs, bug);
    };

}
]);





app.controller('Pagination', ['$scope', 'Bug', function ($scope, Bug) {
    $scope.parameters = Bug.get();
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
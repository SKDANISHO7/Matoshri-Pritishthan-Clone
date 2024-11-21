var csrfloginHash = $('#csrfloginHash').val();

app.controller('homePopupServicesCtrl', function ($scope, $http, toastr) {

    $scope.homePopupInit = function () {
        $scope.homePopupListArray = [];
        $scope.gethomePopupList();
    }

    // Get all Departments List Service
    $scope.gethomePopupList = function () {
        var transform = function (data) {
            return $.param(data);
        }
        $http.post(window.site_url + 'FrontEndAPI/gethomePopupList', {
            inputSearchValue: $scope.inputSearchValue,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "200") {
                $scope.homePopupListArray = response.data.data;
                $scope.PopupArrayShowupWise = [];
                $scope.PopupArrayShowupWise = $scope.homePopupListArray.filter((data) => data.dp_show_on_website == 1);
                
                if ($scope.PopupArrayShowupWise.length > 0) {
                    OpenBootstrapPopup();
                }
            } else {
                toastr.error(response.data.status.message);
            }

        })
    }

    // Dynamic popup  Start
    function OpenBootstrapPopup() {
        $("#dynamicModal").modal('show');
    }
    // Dynamic popup End

});

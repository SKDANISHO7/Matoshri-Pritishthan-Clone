var csrflistHash = $('#csrflistHash').val();
$(".removeActive").removeClass('active');
$(".toggleNacc").removeClass('show');
app.controller('adminManageAlumniRegistrationServicesCtrl', function ($scope, $http, toastr) {
    setTimeout(() => {
        $("#AlumniListLi").addClass('active');
    },800)
    $scope.manageAlumniRegistrationInit = function () {
        $scope.alumniRegistrationListArray = [];
        $scope.getAllAlumniRegistrationListService();
    }

    $scope.formatDate = function (date) {
        var dateOut = new Date(date);
        return dateOut;
    };

    $scope.getAllAlumniRegistrationListService = function () {

        var transform = function (data) {
            return $.param(data);
        }
        $http.post(window.site_url + 'AdminAlumni/getAlumniList', {
            'csrf_bnp': csrflistHash,
            userFilter: $scope.userFilter,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status != "1") {
                $scope.alumniRegistrationListArray = response.data.data;
                $('.table').DataTable().clear().destroy();
                $(document).ready(function () {
                    $('.table').DataTable({
                        "columnDefs": [{
                            "orderable": false,
                            "targets": [4]
                        },],
                        dom: 'Blfrtip',
                        buttons: ['copy', 'excel', 'print']
                    });
                });
            } else {
                toastr.error(response.data.status.message);
            }
        })
    }
});





var csrfloginHash = $('#csrfloginHash').val();

app.filter('unsafe', function ($sce) { return $sce.trustAsHtml; });

app.controller('departmentMainPageServicesCtrl', function ($scope, $http, toastr, $sce, $location) {
    $(".clearActiveClass").removeClass("active");
    setTimeout(() => {
        $("#DepartmentDetailsLi").addClass("active");
        $("#" + localStorage.getItem('Faculty_Department_Name').split(' ').join('') + "_" + localStorage.getItem('Faculty_dsl_id')).addClass('active');
        $("#" + localStorage.getItem('DepartmentLiId')).addClass('active');
    }, 500)
    $scope.departmentMainPageInit = function () {

        $scope.parameters = $location;
        $scope.url = $scope.parameters.absUrl();
        $scope.departmentDeptSectNameUrl = $scope.url.split("/");
        $scope.DeptSectName = $scope.departmentDeptSectNameUrl[$scope.departmentDeptSectNameUrl.length - 1].split('-');
        $scope.DeptSectNameUrl = $scope.DeptSectName.join(' ');

        $(".breadcrumbTitle").html("Department of " + $scope.DeptSectNameUrl);
        $(".breadcrumbPageTitle").html("Department of " + $scope.DeptSectNameUrl);
        $scope.departmentName = localStorage.getItem('Faculty_Department_Name');
        $scope.Faculty_dsl_id = localStorage.getItem('Faculty_dsl_id');
        $scope.base_url = base_url;
        $scope.SectionInformationArray = [];
        $scope.getDepartmentFacId();
    }

    
    $scope.getDepartmentFacId = () => {
        var transform = function (data) {
            return $.param(data);
        }
        $http.post(window.site_url + 'FrontEndAPI/getDepartmentFacId', {
            DeptSectNameUrl: $scope.DeptSectNameUrl,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "200") {
                $scope.dsl_id_content = response.data.data[0].dsl_id;
                setTimeout(() => {
                    $scope.getSectionsWithContent();
                    }, 100)
            } else {
                toastr.error(response.data.status.message);
            }
        })
    }

    $scope.getSectionsWithContent = () => {
        var transform = function (data) {
            return $.param(data);
        }
        $http.post(window.site_url + 'FrontEndAPI/getSectionOfDepartments', {
            dsl_id: $scope.dsl_id_content,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "200") {
                $scope.SectionInformationArray = response.data.data
                setTimeout(() => {
                    $scope.getFaculty();
                    $('.newsCustomeClass').children().first().find("div").click();
                }, 200)
            } else {
                toastr.error(response.data.status.message);
            }
        })
    }


    $scope.getFaculty = function () {
        var transform = function (data) {
            return $.param(data);

        }
        $http.post(window.site_url + 'FrontEndAPI/getDepartment', {
            dsl_id: $scope.dsl_id_content,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "200") {
                $scope.facultyListArray = response.data.data;
            } else {
                toastr.error(response.data.status.message);
            }

        })
    }
});
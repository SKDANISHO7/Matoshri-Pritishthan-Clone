var csrfloginHash = $('#csrfloginHash').val();

app.filter('unsafe', function ($sce) { return $sce.trustAsHtml; });

app.controller('departmentsListServicesCtrl', function ($scope, $compile, $http, toastr) {
    
    
    $scope.departmentsListInit = function () {
        $scope.pagesListArray = [];
        $scope.menuTypeDrop = 'main-menu';
        $scope.departmentName = '';
        $scope.selectFaculty = '';
        $scope.getDepartments();
    }

    // Get all Departments List Service
    $scope.getDepartments = function () {
        var transform = function (data) {
            return $.param(data);

        }
        $http.post(window.site_url + 'FrontEndAPI/getDepartmentsAndItsFaculty', {
            inputSearchValue: $scope.inputSearchValue,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "200") {
                $scope.departmentListArray = response.data.data;               
            } else {
                $scope.departmentListArray = [];
            }
        })
    }

    $scope.checkAnyDepartmentExist = (getDepartment) => {
        let getFacultyArray = getDepartment.faculty.split('%^%');
        let retrunValue = false;
        for(let i = 0; i < getFacultyArray.length; i++) {
            if(getFacultyArray[i].split('~^~')[2] == 1){
                retrunValue = true;
            }
        }
       return retrunValue;
    }

    $scope.facultyLinkClick = async (event) => {
        var target = angular.element(event.target);
        let facultyObj = target.parent().attr('facultyObj');
        let departmentObj = target.parent().attr('departmentObj');
        localStorage.removeItem('cms_page_id');
        localStorage.removeItem('cms_page_link');
        localStorage.removeItem('cms_page_name');
        localStorage.removeItem('cms_page_type');

        localStorage.setItem('Faculty_dsl_id', facultyObj.split('~^~')[0]);
        localStorage.setItem('Faculty_Department_Name', facultyObj.split('~^~')[1]);
        localStorage.setItem('DepartmentLiId', departmentObj);
        window.open(base_url + 'department', "_self");
    }
});
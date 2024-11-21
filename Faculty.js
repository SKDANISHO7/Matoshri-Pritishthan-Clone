var csrfloginHash = $('#csrfloginHash').val();


app.controller('FacultyServicesCtrl', function ($scope, $http, toastr) {

    $scope.FacultyListInit = function () {
        $scope.base_url = base_url;
        $scope.facultyListArray = [];
        $scope.nonTeachingFacultyListArray = [];
        $scope.TeachingFacultyListArray = [];
        $scope.dataArray = [];
        $scope.facultyDeptListArray = [];
        $scope.getFaculty();
        $scope.getNonTeachingFaculty();
        $scope.getTeachingFaculty();
        $scope.getFacultyDepartment();
    }

    // Get all Departments List Service
    $scope.getFaculty = function () {
        var transform = function (data) {
            return $.param(data);

        }
        $http.post(window.site_url + 'FrontEndAPI/getNonTeachingFacultyList', {
            inputSearchValue: $scope.inputSearchValue,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "200") {
                $scope.facultyListArray = response.data.data;
                console.log(' $scope.facultyListArray', $scope.facultyListArray);
            } else {
                toastr.error(response.data.status.message);
            }

        })
    }
    $scope.getTeachingFaculty = function () {
        var transform = function (data) {
            return $.param(data);

        }
        $http.post(window.site_url + 'FrontEndAPI/getFacultyStream', {
            inputSearchValue: $scope.inputSearchValue,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "200") {
                $scope.TeachingFacultyListArray = response.data.data;
                console.log(' $scope.TeachingFacultyListArray', $scope.TeachingFacultyListArray);

                $scope.TeachingFacultyListArray = response.data.data.filter((key) => key.tu_teaching_or_non_teaching === "Teaching");


            } else {
                toastr.error(response.data.status.message);
            }

        })
    }

    $scope.getNonTeachingFaculty = function () {
        var transform = function (data) {
            return $.param(data);

        }
        $http.post(window.site_url + 'FrontEndAPI/getNonTeachingFacultyList', {
            inputSearchValue: $scope.inputSearchValue,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "200") {
                $scope.nonTeachingFacultyListArray = response.data.data;

                console.log(' $scope.nonTeachingFacultyListArray', $scope.nonTeachingFacultyListArray);
                $scope.nonTeachingFacultyListArray = response.data.data.filter((key) => key.tu_teaching_or_non_teaching === "Non Teaching");


            } else {
                toastr.error(response.data.status.message);
            }

        })
    }


    // Get all Departments List Service
    $scope.getFacultyDepartment = function () {
        var transform = function (data) {
            return $.param(data);

        }
        $http.post(window.site_url + 'FrontEndAPI/getFacultyDept', {
            inputSearchValue: $scope.inputSearchValue,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "200") {
                $scope.facultyDeptListArray = response.data.data;
                $scope.facultyArrayDepatmentWise = [];
                $scope.facultyArrayDepatmentWise = $scope.facultyDeptListArray.filter((data) => data.dsl_dept_name == "English");
            } else {
                toastr.error(response.data.status.message);
            }

        })
    }


    $scope.getSectionsWithContent = (faculty) => {
        localStorage.setItem("facultyDetails", JSON.stringify(faculty));
        window.location.href = window.site_url + `faculty-details`;
    }
    
    // $scope.getSectionsWithContent = async (faculty) => {
    //     // console.log(faculty,'faculty');
    //     // alert(faculty);
    //     // localStorage.setItem('Faculty_dsl_id', faculty.split('~^~')[0]);
    //     // localStorage.setItem('Faculty_Department_Name', faculty.split('~^~')[1]);
    //     localStorage.setItem('DepartmentLiId', faculty.tu_auto_id);
    //     $scope.departmentName = localStorage.getItem('DepartmentLiId');
    //     window.location.href = window.site_url + `faculty-details/` + $scope.departmentName;
    //     // window.open(base_url + 'faculty-details/' + $scope.departmentName);
    // }


});
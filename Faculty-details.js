var csrfloginHash = $('#csrfloginHash').val();


app.controller('FacultyDetailsServicesCtrl', function ($scope, $http, toastr) {
    setTimeout(() => {
        // $("#DepartmentDetailsLi").addClass("active");
        // $("#" + localStorage.getItem('Faculty_Department_Name').split(' ').join('') + "_" + localStorage.getItem('Faculty_dsl_id')).addClass('active');
        $("#" + localStorage.getItem('DepartmentLiId')).addClass('active');
    }, 500)
    $scope.FacultyDetailsListInit = function () {
        $scope.base_url = base_url;
        let getFacultyDetails = JSON.parse(localStorage.getItem('facultyDetails'));
        $scope.FacultyName = getFacultyDetails.tu_name;
        $scope.FacultySection = getFacultyDetails.dsm_section_name;
        $scope.FacultyDesignation = getFacultyDetails.tu_designation;
        $scope.FacultyDepartmentName = getFacultyDetails.dsl_dept_name;
        $scope.FacultyEmail = getFacultyDetails.tu_email;
        $scope.FacultyQualification = getFacultyDetails.tu_qualification;
        $scope.FacultyNatureOfOppinment = getFacultyDetails.tu_nature_of_oppinment;
        $scope.FacultyProfilePic = getFacultyDetails.tu_profile_image_path;
        setTimeout(() => {
            $scope.getSectionsWithContent(getFacultyDetails.tu_auto_id);
        }, 400);
    }

    //get Faculty section 
    $scope.getSectionsWithContent = (faculty) => {
        var transform = function (data) {
            return $.param(data);
        }
        $http.post(window.site_url + 'FrontEndAPI/getSectionOfFaculty', {
            tu_auto_id: faculty,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            // if (faculty.tu_dsl_id != 0) {
            //     var getDepartmentObject = $scope.departmentListArray.filter(function (el) {
            //         return el.dsl_id == faculty.tu_dsl_id
            //     });
            //     $scope.sec_DepartmentName = getDepartmentObject[0].dsl_dept_name;
            // } else {
            //     $scope.sec_DepartmentName = "";
            // }
            if (response.data.status.status == "200") {
                $scope.SectionInformationArray = response.data.data;
                setTimeout(() => {
                    $('.newsCustomeClass').children().first().find("div").click();
                }, 200)
            } else {
                toastr.error(response.data.status.message);
            }
        })
    }

    //get Faculty section  End

});
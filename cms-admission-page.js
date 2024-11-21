var csrfloginHash = $('#csrfloginHash').val();

app.filter('unsafe', function ($sce) { return $sce.trustAsHtml; });

app.controller('admissionMainPageServicesCtrl', function ($scope, $http, toastr, $sce) {
    $(".clearActiveClass").removeClass("active");
    setTimeout(() => {
        $("#AdmissionDetailsLi").addClass("active");
        $("#" + localStorage.getItem('Degree_Year_Name').split(' ').join('') + "_" + localStorage.getItem('Degree_Year_dsl_id')).addClass('active');
        $("#" + localStorage.getItem('AdmissiontLiId')).addClass('active');
    }, 500)
    $scope.admissionMainPageInit = function () {
        $(".breadcrumbTitle").html("Admission of " + localStorage.getItem('Degree_Year_Name'));
        $(".breadcrumbPageTitle").html("Admission of " + localStorage.getItem('Degree_Year_Name'));
        $scope.admissionTypeName = localStorage.getItem('Degree_Year_Name');
        $scope.Degree_Year_dsl_id = localStorage.getItem('Degree_Year_dsl_id');
        $scope.SectionInformationArray = [];
        $scope.getSectionsWithContent();
    }


    $scope.getSectionsWithContent = () => {
        var transform = function (data) {
            return $.param(data);
        }
        $http.post(window.site_url + 'FrontEndAPI/getSectionOfDegreeYear', {
            ayl_id: $scope.Degree_Year_dsl_id,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "200") {
                $scope.SectionInformationArray = response.data.data
                setTimeout(() => {
                    $('.newsCustomeClass').children().first().find("div").click();
                }, 200)
            } else {
                toastr.error(response.data.status.message);
            }
        })
    }

});
var csrfloginHash = $('#csrfloginHash').val();

app.filter('unsafe', function ($sce) { return $sce.trustAsHtml; });

app.controller('activitiesMainPageServicesCtrl', function ($scope, $http, toastr, $sce, $location) {
    $(".clearActiveClass").removeClass("active");
    setTimeout(() => {
        $("#ActivitiesDetailsLi").addClass("active");
        $("#" + localStorage.getItem('activities_name').split(' ').join('') + "_" + localStorage.getItem('activities_id')).addClass('active');
        $("#" + localStorage.getItem('ActivitiesDetailsLi')).addClass('active');
    }, 500)
    $scope.activitiesMainPageInit = function () {

        $scope.parameters = $location;
        $scope.url = $scope.parameters.absUrl();
        $scope.activitiesPageNameUrl = $scope.url.split("/");
        $scope.activitiesPageName = $scope.activitiesPageNameUrl[$scope.activitiesPageNameUrl.length - 1].split('-');
        $scope.activitiesUrl = $scope.activitiesPageName.join(' ');

        $(".breadcrumbTitle").html("Activities of " + $scope.activitiesUrl);
        $(".breadcrumbPageTitle").html("Activities of " + $scope.activitiesUrl);
        $scope.activitiesName = localStorage.getItem('activities_name');
        $scope.activities_id = localStorage.getItem('activities_id');
        $scope.base_url = base_url;

        $scope.sectionInformationArray = [];
        $scope.activitiesListArray = [];
        $scope.getActivitiesId();

    }


    $scope.getActivitiesId = () => {
        var transform = function (data) {
            return $.param(data);
        }
        $http.post(window.site_url + 'FrontEndAPI/getActivitiesId', {
            'activitiesUrl': $scope.activitiesUrl,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "200") {
                $scope.dsl_id_content = response.data.data[0].asl_id;
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
        $http.post(window.site_url + 'FrontEndAPI/getActivitiesSection', {
            'dsl_id': $scope.dsl_id_content,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "200") {
                $scope.sectionInformationArray = response.data.data;
                setTimeout(() => {
                    $scope.getActivities();
                    $('.newsCustomeClass').children().first().find("div").click();
                }, 200)
            } else {
                toastr.error(response.data.status.message);
            }
        })
    }

    $scope.getActivities = function () {
        var transform = function (data) {
            return $.param(data);

        }
        $http.post(window.site_url + 'FrontEndAPI/getActivities', {
            'asl_id': $scope.dsl_id_content,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "200") {
                $scope.activitiesListArray = response.data.data;
            } else {
                toastr.error(response.data.status.message);
            }

        })
    }

});
var csrfloginHash = $('#csrfloginHash').val();

app.filter('unsafe', function ($sce) { return $sce.trustAsHtml; });

app.controller('associationsMainPageServicesCtrl', function ($scope, $http, toastr, $sce, $location) {
    $(".clearActiveClass").removeClass("active");
    setTimeout(() => {
        $("#AssociationsDetailsLi").addClass("active");
        $("#" + localStorage.getItem('associations_name').split(' ').join('') + "_" + localStorage.getItem('associations_id')).addClass('active');
        $("#" + localStorage.getItem('AssociationsDetailsLi')).addClass('active');
    }, 500)
    $scope.associationsMainPageInit = function () {

        $scope.parameters = $location;
        $scope.url = $scope.parameters.absUrl();
        $scope.associationsPageNameUrl = $scope.url.split("/");
        $scope.associationsPageName = $scope.associationsPageNameUrl[$scope.associationsPageNameUrl.length - 1].split('-');
        $scope.associationsUrl = $scope.associationsPageName.join(' ');

        $(".breadcrumbTitle").html(" " + $scope.associationsUrl);
        $(".breadcrumbPageTitle").html("" + $scope.associationsUrl);
        $scope.activitiesName = localStorage.getItem('associations_name');
        $scope.associations_id = localStorage.getItem('associations_id');
        $scope.base_url = base_url;

        $scope.sectionInformationArray = [];
        $scope.associationsListArray = [];
        $scope.getAssocitaionsId();

    }


    $scope.getAssocitaionsId = () => {
        var transform = function (data) {
            return $.param(data);
        }
        $http.post(window.site_url + 'FrontEndAPI/getAssocitaionsId', {
            'associationsUrl': $scope.associationsUrl,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "200") {
                $scope.dsl_id_content = response.data.data[0].assl_id;
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
        $http.post(window.site_url + 'FrontEndAPI/getAssociationsSection', {
            'dsl_id': $scope.dsl_id_content,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "200") {
                $scope.sectionInformationArray = response.data.data;
                console.log('$scope.sectionInformationArray', $scope.sectionInformationArray);

                setTimeout(() => {
                    $scope.getAssociations();
                    $('.newsCustomeClass').children().first().find("div").click();
                }, 200)
            } else {
                toastr.error(response.data.status.message);
            }
        })
    }

    // $scope.getAssociations = function () {
    //     var transform = function (data) {
    //         return $.param(data);

    //     }
    //     $http.post(window.site_url + 'FrontEndAPI/getAssociations', {
    //         'assl_id': $scope.dsl_id_content,
    //     }, {
    //         headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    //         transformRequest: transform
    //     }).then(function (response) {
    //         if (response.data.status.status == "200") {
    //             $scope.associationsListArray = response.data.data;
    //         } else {
    //             toastr.error(response.data.status.message);
    //         }

    //     })
    // }

});
var csrflistHash = $('#csrflistHash').val();


app.controller('headerServicesCtrl', function ($scope, $http, toastr) {
    $scope.headerServicesCtrlInit = function () {

        $scope.fullName = '';
        $scope.email = '';
        $scope.contact = '';
        $scope.course = '';
        $scope.comment = '';
        $scope.whatsappGroupLink = '';
        $scope.isDisplayProgrss = false;

    }
    $scope.createHtmlErrorDiv = function (message) {
        return '<div id="name" ><h4 style="color: red; font-size: small">' + message + '</h4></div>'
    }

    $scope.admissionFormClear = function () {
        $scope.fullName = '';
        $scope.email = '';
        $scope.contact = '';
        $scope.course = '';
        $scope.comment = '';
        $scope.whatsappGroupLink = '';
        $scope.isDisplayProgrss = false;
    }

    $scope.admissionEnquiryFormSubmitButton = function () {
        if ($scope.fullName) {
            if (($scope.contact)) {
                if (($scope.email)) {
                    if (($scope.comment)) {
                        $scope.isDisplayProgrss = true;
                        var transform = function (data) {
                            return $.param(data);

                        }
                        $http.post(window.site_url + 'Website/sendAdmissionEnquiryForm', {
                            fullName: $scope.fullName,
                            email: $scope.email,
                            contact: $scope.contact,
                            course: $scope.course,
                            comment: $scope.comment,
                        }, {
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                            transformRequest: transform
                        }).then(function (response) {

                            if (response.data.status.status == "200") {
                                // toastr.success(response.data.status.message);
                                $scope.headerServicesCtrlInit();
                                $('#admission').modal('hide');
                                $('#whatsappGroupLinkPop').modal('show');
                            } else {
                                toastr.error(response.data.status.message);
                            }
                            $scope.isDisplayProgrss = false;
                        })

                    } else {
                        document.getElementById("comment").focus();
                        var getnameParent = $("#comment").parent();
                        getnameParent.append($scope.createHtmlErrorDiv("Please enter comment"))
                    }
                } else {
                    document.getElementById("email").focus();
                    var getnameParent = $("#email").parent();
                    getnameParent.append($scope.createHtmlErrorDiv("Please enter email address"))
                }
            } else {
                document.getElementById("contact").focus();
                var getnameParent = $("#contact").parent();
                getnameParent.append($scope.createHtmlErrorDiv("Please enter contact"))
            }
        } else {
            document.getElementById("fullName").focus();
            var getnameParent = $("#fullName").parent();
            getnameParent.append($scope.createHtmlErrorDiv("Please enter name"))
        }
    }
});

function onHtmlElementChnage(event) {
    var getThis = event
    if ($(getThis).parent().find("#name").length == 1) {
        $(getThis).parent().find("#name").remove();
    }
    if ($(getThis).parent().parent().find("#name").length == 1) {
        $(getThis).parent().parent().find("#name").remove();
    }
}
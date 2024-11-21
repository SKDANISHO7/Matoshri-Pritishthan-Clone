var csrflistHash = $('#csrflistHash').val();


app.controller('contactServicesCtrl', function ($scope, $http, toastr) {
    $scope.contactServicesCtrlInit = function () {

        $scope.firstName = '';
        $scope.email = '';
        $scope.subject = '';
        $scope.message = '';

    }
    $scope.createHtmlErrorDiv = function (message) {
        return '<div id="name" ><h4 style="color: red; font-size: small">' + message + '</h4></div>'
    }
    $scope.formSubmitButton = function () {
        if ($scope.firstName) {
            if (($scope.firstName.match(/^[a-zA-z\s][a-zA-Z ._-\s]+$/))) {
                if (($scope.email)) {
                    if (($scope.subject)) {
                        checkIsValidForm();
                        var transform = function (data) {
                            return $.param(data);

                        }
                        $http.post(window.site_url + 'Website/sendContactForm', {
                            name: $scope.firstName,
                            email: $scope.email,
                            subject: $scope.subject,
                            message: $scope.message,
                        }, {
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                            transformRequest: transform
                        }).then(function (response) {

                            if (response.data.status.status == "0") {
                                toastr.success(response.data.status.message);
                                $scope.contactServicesCtrlInit();
                                grecaptcha.reset();
                            } else {
                                toastr.error(response.data.status.message);
                            }
                        })




                    } else {
                        document.getElementById("subject").focus();
                        var getFirstNameParent = $("#subject").parent();
                        getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter Subject"))
                    }
                } else {
                    document.getElementById("email").focus();
                    var getFirstNameParent = $("#email").parent();
                    getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter Email address"))
                }
            } else {
                document.getElementById("firstName").focus();
                var getFirstNameParent = $("#firstName").parent();
                getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter valid name"))
            }
        } else {
            document.getElementById("firstName").focus();
            var getFirstNameParent = $("#firstName").parent();
            getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter First name"))
        }
    }
});

function checkIsValidForm() {
    var response = grecaptcha.getResponse();

    if (response.length == 0) {
        alert("Captch is required");
        return false
    }
}
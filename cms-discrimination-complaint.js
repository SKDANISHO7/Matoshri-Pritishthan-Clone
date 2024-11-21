var csrflistHash = $('#csrflistHash').val();


app.controller('discriminationComplaintServicesCtrl', function ($scope, $http, toastr) {

    $scope.discriminationComplaintServicesCtrlInit = function () {
        $scope.firstName = '';
        $scope.middleName = '';
        $scope.lastName = '';
        $scope.phoneNumber = '';
        $scope.mail = '';
        $scope.address = '';
        $scope.class = '';
        $scope.rollno = '';
        $scope.department = '';
        $scope.designation = '';
        $scope.select = '';
        $scope.compaintdetails = '';
        $scope.othercaste = '';
        $scope.otherdesignation = '';
    }

    $scope.createHtmlErrorDiv = function (message) {
        return '<div id="name" ><h4 style="color: red; font-size: small">' + message + '</h4></div>'
    }

    $scope.formSubmitButton = function () {
        if ($scope.firstName) {
            if (($scope.firstName.match(/^[a-zA-z\s][a-zA-Z ._-\s]+$/))) {
                if ($scope.lastName) {
                    if (($scope.lastName.match(/^[a-zA-z\s][a-zA-Z ._-\s]+$/))) {
                        if ($scope.mail) {
                            if ($scope.phoneNumber) {
                                if ($scope.phoneNumber.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
                                    if ($scope.department) {
                                        if (($scope.department.match(/^[a-zA-z\s][a-zA-Z ._-\s]+$/))) {
                                            // if ($scope.designation) {
                                            // if (($scope.designation.match(/^[a-zA-z\s][a-zA-Z ._-\s]+$/))) {

                                            if ($scope.select) {
                                                if ($scope.address) {

                                                    if (($scope.compaintdetails)) {
                                                        // $scope.submitForm();
                                                        var transform = function (data) {
                                                            return $.param(data);
                                                        }
                                                        $http.post(window.site_url + 'Website/InsertDiscriminationComplaintsForm', {
                                                            name: $scope.firstName,
                                                            mname: $scope.middleName,
                                                            lname: $scope.lastName,
                                                            phno: $scope.phoneNumber,
                                                            email: $scope.mail,
                                                            designation: $scope.designation,
                                                            address: $scope.address,
                                                            class: $scope.class,
                                                            department: $scope.department,
                                                            rollno: $scope.rollno,
                                                            compaintdetails: $scope.compaintdetails,
                                                            caste: $scope.select,
                                                            othercaste: $scope.othercaste,
                                                            otherdesignation: $scope.otherdesignation,
                                                        }, {
                                                            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                                                            transformRequest: transform
                                                        }).then(function (response) {
                                                            if (response.data.status.status == "201") {
                                                                toastr.success(response.data.status.message);
                                                                $scope.discriminationComplaintServicesCtrlInit();

                                                            } else {
                                                                toastr.error(response.data.status.message);
                                                            }
                                                        })
                                                    } else {
                                                        document.getElementById("compaintdetails").focus();
                                                        var getnameParent = $("#compaintdetails").parent();
                                                        getnameParent.append($scope.createHtmlErrorDiv("Please enter Complaint Details"))
                                                    }
                                                } else {
                                                    document.getElementById("address").focus();
                                                    var getFirstNameParent = $("#address").parent();
                                                    getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter address"))
                                                }


                                            } else {

                                                document.getElementById("select").focus();
                                                var getFirstNameParent = $("#select").parent();
                                                getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter Caste"))
                                            }
                                            // } else {
                                            //     document.getElementById("designation").focus();
                                            //     var getFirstNameParent = $("#designation").parent();
                                            //     getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter correct designation"))

                                            // }

                                            // } else {
                                            //     document.getElementById("designation").focus();
                                            //     var getFirstNameParent = $("#designation").parent();
                                            //     getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter designation"))
                                            // }

                                        } else {
                                            document.getElementById("department").focus();
                                            var getFirstNameParent = $("#department").parent();
                                            getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter correct department"))

                                        }
                                    } else {
                                        document.getElementById("department").focus();
                                        var getFirstNameParent = $("#department").parent();
                                        getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter department"))
                                    }
                                } else {
                                    document.getElementById("phoneNumber").focus();
                                    var getFirstNameParent = $("#phoneNumber").parent();
                                    getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter valid  phone number"))
                                }
                            } else {
                                document.getElementById("phoneNumber").focus();
                                var getFirstNameParent = $("#phoneNumber").parent();
                                getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter phone number"))
                            }
                        } else {

                            document.getElementById("mail").focus();
                            var getFirstNameParent = $("#mail").parent();
                            getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter email address"))
                        }

                    } else {
                        document.getElementById("lastName").focus();
                        var getFirstNameParent = $("#lastName").parent();
                        getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter only character"))
                    }
                } else {

                    document.getElementById("lastName").focus();
                    var getFirstNameParent = $("#lastName").parent();
                    getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter last name"))
                }
            } else {
                document.getElementById("firstName").focus();
                var getFirstNameParent = $("#firstName").parent();
                getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter only character"))
            }
        } else {

            document.getElementById("firstName").focus();
            var getFirstNameParent = $("#firstName").parent();
            getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter first name"))
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

    // var value = document.getElementById("select").value;
    // var x = document.getElementById("show")
    // if (value === 'Other') {
    //     x.style.display = "block"

    // } else {
    //     x.style.display = "none"

    // }
}

var csrflistHash = $('#csrflistHash').val();


app.controller('grievanceFormServicesCtrl', function ($scope, $http, toastr) {
    $scope.grievanceFormInit = function () {
        $scope.firstName = '';
        $scope.middleName = '';
        $scope.lastName = '';
        $scope.Gender = '';
        $scope.DOB = '';
        $scope.Class = '';
        $scope.mail = '';
        $scope.mobNumber = '';
        $scope.Address = '';
        $scope.complaint = '';
        $scope.status = '';
        $scope.grievance = '';

    }
    $scope.createHtmlErrorDiv = function (message) {
        return '<div id="name" ><h4 style="color: red; font-size: small">' + message + '</h4></div>'
    }

    $scope.formSubmitButton = function () {
        if ($scope.firstName) {
            if (($scope.firstName.match(/^[a-zA-z\s][a-zA-Z ._-\s]+$/))) {
                if ($scope.middleName) {
                    if (($scope.middleName.match(/^[a-zA-z\s][a-zA-Z ._-\s]+$/))) {
                        if ($scope.lastName) {
                            if (($scope.lastName.match(/^[a-zA-z\s][a-zA-Z ._-\s]+$/))) {
                                if ($scope.Gender) {
                                    if ($scope.DOB) {
                                        if ($scope.Class) {
                                            if ($scope.mail) {
                                                if ($scope.mobNumber) {
                                                    if ($scope.mobNumber.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
                                                        if ($scope.Address) {
                                                            if ($scope.complaint) {

                                                                var transform = function (data) {
                                                                    return $.param(data);
                                                                }
                                                                $http.post(window.site_url + 'Website/InsertGrievanceForm', {
                                                                    name: $scope.firstName,
                                                                    mname: $scope.middleName,
                                                                    lname: $scope.lastName,
                                                                    gender: $scope.Gender,
                                                                    status: $scope.status,
                                                                    dob: $scope.DOB.toLocaleDateString("en-US"),
                                                                    class_name: $scope.Class,
                                                                    email: $scope.mail,
                                                                    phno: $scope.mobNumber,
                                                                    address: $scope.Address,
                                                                    complaint: $scope.complaint,
                                                                    grievance: $scope.grievance
                                                                }, {
                                                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                                                                    transformRequest: transform
                                                                }).then(function (response) {
                                                                    if (response.data.status.status == "201") {
                                                                        toastr.success(response.data.status.message);
                                                                        $scope.grievanceFormInit();


                                                                    } else {
                                                                        toastr.error(response.data.status.message);
                                                                    }
                                                                })


                                                            } else {
                                                                document.getElementById("complaint").focus();
                                                                var getFirstNameParent = $("#complaint").parent();
                                                                getFirstNameParent.append($scope.createHtmlErrorDiv("Please fill up the complaint"))
                                                            }
                                                        } else {
                                                            document.getElementById("Address").focus();
                                                            var getFirstNameParent = $("#Address").parent();
                                                            getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter address"))
                                                        }
                                                    } else {
                                                        document.getElementById("mobNumber").focus();
                                                        var getFirstNameParent = $("#mobNumber").parent();
                                                        getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter valid  phone number"))
                                                    }
                                                } else {
                                                    document.getElementById("mobNumber").focus();
                                                    var getFirstNameParent = $("#mobNumber").parent();
                                                    getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter phone number"))
                                                }
                                            } else {
                                                document.getElementById("mail").focus();
                                                var getFirstNameParent = $("#mail").parent();
                                                getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter mail"))
                                            }
                                        } else {
                                            document.getElementById("Class").focus();
                                            var getFirstNameParent = $("#Class").parent();
                                            getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter class"))
                                        }
                                    } else {
                                        document.getElementById("DOB").focus();
                                        var getFirstNameParent = $("#DOB").parent();
                                        getFirstNameParent.append($scope.createHtmlErrorDiv("Please select DOB"))
                                    }
                                } else {
                                    document.getElementById("Gender").focus();
                                    var getFirstNameParent = $("#Gender").parent().parent();
                                    getFirstNameParent.append($scope.createHtmlErrorDiv("Please select gender"))
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
                        document.getElementById("middleName").focus();
                        var getFirstNameParent = $("#middleName").parent();
                        getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter only character"))
                    }
                } else {
                    document.getElementById("middleName").focus();
                    var getFirstNameParent = $("#middleName").parent();
                    getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter middle name"))
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

var csrflistHash = $('#csrflistHash').val();


app.controller('alumniRegisterServicesCtrl', function ($scope, $http, toastr) {

	$scope.alumniRegisterServicesCtrlInit = function () {
		$scope.firstName = '';
		$scope.middleName = '';
		$scope.lastName = '';
		$scope.aftermrgname = '';
		$scope.aftermrgmname = '';
		$scope.aftermrglname = '';
		$scope.Gender = '';
		$scope.marital = '';
		$scope.DOB = '';
		$scope.address = '';
		$scope.country = '';
		$scope.state = '';
		$scope.district = '';
		$scope.Program = '';
		$scope.passingyear = '';
		$scope.phoneNumber = '';
		$scope.email = '';
		$scope.select = '';
		$scope.Village = '';
		$scope.workingorganisation = '';
		$scope.currentworkingplace = '';
		$scope.currentworkingdesignation = '';
		$scope.enteralternatemobilenumber = '';
		$scope.selectother = '';



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
								// if ($scope.aftermrgname) {
								//     if (($scope.aftermrgname.match(/^[a-zA-z\s][a-zA-Z ._-\s]+$/))) {
								//         if ($scope.aftermrgmname) {
								//             if ($scope.aftermrgmname.match(/^[a-zA-z\s][a-zA-Z ._-\s]+$/)) {
								//                 if ($scope.aftermrglname) {
								//                     if (($scope.aftermrglname.match(/^[a-zA-z\s][a-zA-Z ._-\s]+$/))) {
								if ($scope.Gender) {
									if ($scope.marital) {
										if ($scope.DOB) {
											if ($scope.address) {
												if ($scope.country) {
													if (($scope.country.match(/^[a-zA-z\s][a-zA-Z ._-\s]+$/))) {
														if ($scope.state) {
															if (($scope.state.match(/^[a-zA-z\s][a-zA-Z ._-\s]+$/))) {
																if ($scope.district) {
																	if (($scope.district.match(/^[a-zA-z\s][a-zA-Z ._-\s]+$/))) {
																		if ($scope.Program) {
																			if ($scope.passingyear) {
																				if ($scope.passingyear.match(/([0-9]{4})$/)) {
																					if ($scope.phoneNumber) {
																						if ($scope.phoneNumber.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
																							if ($scope.email) {
																								if ($scope.select) {
																									// $scope.submitForm();
																									var transform = function (data) {
																										return $.param(data);
																									}
																									$http.post(window.site_url + 'Website/InsertAlumniForm', {
																										name: $scope.firstName,
																										mname: $scope.middleName,
																										lname: $scope.lastName,
																										gender: $scope.Gender,
																										status: $scope.marital,
																										dob: $scope.DOB.toLocaleDateString("en-US"),
																										address: $scope.address,
																										country: $scope.country,
																										state: $scope.state,
																										district: $scope.district,
																										villege: $scope.Village,
																										EducationQualification: $scope.Program,
																										year_passed: $scope.passingyear,
																										workingplace: $scope.currentworkingplace,
																										workingorganisation: $scope.workingorganisation,
																										workingdesignation: $scope.currentworkingdesignation,
																										phno: $scope.phoneNumber,
																										email: $scope.email,
																										landno: $scope.enteralternatemobilenumber,
																										WhatCanIDo: $scope.select,
																										WhatCanIDoselect: $scope.selectother,
																										aftermrgname: $scope.aftermrgname,
																										aftermrgmname: $scope.aftermrgmname,
																										aftermrglname: $scope.aftermrglname,
																									}, {
																										headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
																										transformRequest: transform
																									}).then(function (response) {
																										if (response.data.status.status == "201") {
																											toastr.success(response.data.status.message);
																											$scope.alumniRegisterServicesCtrlInit();

																										} else {
																											toastr.error(response.data.status.message);
																										}
																									})

																								} else {

																									document.getElementById("select").focus();
																									var getFirstNameParent = $("#select").parent();
																									getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter What Can I Do For My College"))
																								}
																							} else {

																								document.getElementById("email").focus();
																								var getFirstNameParent = $("#email").parent();
																								getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter email address"))
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
																					document.getElementById("passingyear").focus();
																					var getFirstNameParent = $("#passingyear").parent();
																					getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter valid passing year"))

																				}
																			} else {
																				document.getElementById("passingyear").focus();
																				var getFirstNameParent = $("#passingyear").parent();
																				getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter passing year"))
																			}
																		} else {
																			document.getElementById("Program").focus();
																			var getFirstNameParent = $("#Program").parent().parent();
																			getFirstNameParent.append($scope.createHtmlErrorDiv("Please Select Program"))
																		}
																	} else {
																		document.getElementById("district").focus();
																		var getFirstNameParent = $("#district").parent();
																		getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter correct district"))

																	}

																} else {
																	document.getElementById("district").focus();
																	var getFirstNameParent = $("#district").parent();
																	getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter district"))
																}
															} else {
																document.getElementById("state").focus();
																var getFirstNameParent = $("#state").parent();
																getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter correct state"))
															}
														} else {
															document.getElementById("state").focus();
															var getFirstNameParent = $("#state").parent();
															getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter state"))
														}
													} else {
														document.getElementById("country").focus();
														var getFirstNameParent = $("#country").parent();
														getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter correct country"))
													}
												} else {
													document.getElementById("country").focus();
													var getFirstNameParent = $("#country").parent();
													getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter country"))
												}
											} else {
												document.getElementById("address").focus();
												var getFirstNameParent = $("#address").parent();
												getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter address"))
											}
										} else {
											document.getElementById("DOB").focus();
											var getFirstNameParent = $("#DOB").parent();
											getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter DOB"))
										}
									} else {
										document.getElementById("marital").focus();
										var getFirstNameParent = $("#marital").parent().parent();
										getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter marital status"))
									}

								} else {
									document.getElementById("Gender").focus();
									var getFirstNameParent = $("#Gender").parent().parent();
									getFirstNameParent.append($scope.createHtmlErrorDiv("Please select gender"))
								}
								//                     } else {
								//                         document.getElementById("aftermrglname").focus();
								//                         var getFirstNameParent = $("#aftermrglname").parent().parent();
								//                         getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter only character"))
								//                     }
								//                 } else {
								//                     document.getElementById("aftermrglname").focus();
								//                     var getFirstNameParent = $("#aftermrglname").parent().parent();
								//                     getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter last name"))
								//                 }
								//             } else {
								//                 document.getElementById("aftermrgmname").focus();
								//                 var getFirstNameParent = $("#aftermrgmname").parent().parent();
								//                 getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter only character"))
								//             }
								//         } else {
								//             document.getElementById("aftermrgmname").focus();
								//             var getFirstNameParent = $("#aftermrgmname").parent().parent();
								//             getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter middle name"))
								//         }
								//     } else {
								//         document.getElementById("aftermrgname").focus();
								//         var getFirstNameParent = $("#aftermrgname").parent().parent();
								//         getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter only character"))
								//     }
								// } else {
								//     document.getElementById("aftermrgname").focus();
								//     var getFirstNameParent = $("#aftermrgname").parent().parent();
								//     getFirstNameParent.append($scope.createHtmlErrorDiv("Please enter first name"))
								// }
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



function onHtmlElementChnage(event) {
	var getThis = event
	if ($(getThis).parent().find("#name").length == 1) {
		$(getThis).parent().find("#name").remove();
	}
	if ($(getThis).parent().parent().find("#name").length == 1) {
		$(getThis).parent().parent().find("#name").remove();
	}

	var value = document.getElementById("select").value;
	var x = document.getElementById("show")
	if (value === 'Other') {
		x.style.display = "block"

	} else {
		x.style.display = "none"

	}
}

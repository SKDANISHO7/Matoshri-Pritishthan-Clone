var csrfloginHash = $("#csrfloginHash").val();

app.filter("unsafe", function ($sce) {
	return $sce.trustAsHtml;
});

app.controller("menuServicesCtrl", function ($scope, $compile, $http, toastr, $location) {
	// setTimeout(() => {
	// 	$("#TeachingfacultyDetailsLi").addClass("active");
	// 	$(
	// 		"#" +
	// 		localStorage.getItem("sm_stream_name").split(" ").join("") +
	// 		"_" +
	// 		localStorage.getItem("sm_id")
	// 	).addClass("active");
	// 	$("#" + localStorage.getItem("TeachingfacultyDetailsLi")).addClass("active");
	// }, 500);
	let createDynamicHTML = "";
	let createDynamicHTMLForFooter = "";
	let createDynamicHTMLForTopleftMenu = "";
	let createDynamicHTMLForTopRightMenu = "";
	var isInner = 0;
	var isInnerLeft = 0;
	var isInnerRight = 0;
	const base_url_website = base_url;
	$scope.menuInit = function () {
		$scope.pagesListArray = [];
		$scope.FAQListArray = [];
		$scope.FAQCategoryListArray = [];
		$scope.menuTypeDrop = "main-menu";
		$scope.departmentName = "";
		$scope.admissionTypeName = "";
		$scope.selectFaculty = "";
		$scope.getDepartments();
		$scope.getAdmission();
		$scope.getActivities();
		$scope.getGalleryCategory();
		$scope.getAssociations();
		$scope.getStreamsFaculties();
		$scope.getFAQList();

		$scope.getAllPagesList("other");

	};

	createFAQCategoryHTMLDesign = function () {
		var createCategoryHtml = `<div class="msg">
            <span class="avtr">
                <figure style="background-image: url(https://mrseankumar25.github.io/Sandeep-Kumar-Frontend-Developer-UI-Specialist/images/avatar.png)"></figure>
            </span>
            <span class="responsText">
                <div class="same-row question-part text-ltr">
                    <div class="bubble no-border" style="display: table; direction: unset;">
                        <p>What are you <strong>looking</strong> for?</p>
                        <div class="option-wrapper">`;
		var tempHtml = "";
		for (let i = 0; i < $scope.FAQCategoryListArray.length; i++) {
			tempHtml +=
				`<div class="bubble bubble-inline option theme-border theme-color categoryNameClick" categoryName="` +
				$scope.FAQCategoryListArray[i] +
				`">
                            <span>` +
				$scope.FAQCategoryListArray[i] +
				`</span>
                        </div>`;
		}
		createCategoryHtml +=
			`` +
			tempHtml +
			`</div>
                                        <div class="bubble bubble-inline option theme-border theme-color OtherOptionClick">
                                            <span>Other</span>
                                        </div>
                                    </div>
                                </div>
                                </span>
                                </div>`;
		return createCategoryHtml;
	};

	createFAQQuestionsHTMLDesign = function (getCategory) {
		const getFilteredFaqListArray = $scope.FAQListArray.filter(
			(category) => category.tf_category == getCategory.toLowerCase()
		);

		var createQuestionWithSpacificCategoryHtml = `<div class="msg">
            <span class="avtr">
                <figure style="background-image: url(https://mrseankumar25.github.io/Sandeep-Kumar-Frontend-Developer-UI-Specialist/images/avatar.png)"></figure>
            </span>
            <span class="responsText">
                <div class="same-row question-part text-ltr">
                    <div class="bubble no-border" style="display: table; direction: unset;">
                        <p>What are you <strong>looking</strong> for?</p>
                        <div class="option-wrapper">`;
		var tempHtml = "";
		for (let i = 0; i < getFilteredFaqListArray.length; i++) {
			tempHtml +=
				`<div class="bubble bubble-inline option theme-border theme-color questionNameClick" questionID="` +
				getFilteredFaqListArray[i].tf_id +
				`">
                            <span>` +
				getFilteredFaqListArray[i].tf_question +
				`</span>
                        </div>`;
		}
		createQuestionWithSpacificCategoryHtml +=
			`` +
			tempHtml +
			`</div>
                                        <div class="bubble bubble-inline option theme-border theme-color backToMainMenuClick">
                                            <span>Back To Main Menu</span>
                                        </div>
                                        <div class="bubble bubble-inline option theme-border theme-color OtherOptionClick">
                                            <span>Other</span>
                                        </div>
                                    </div>
                                </div>
                                </span>
                                </div>`;
		return createQuestionWithSpacificCategoryHtml;
	};

	$(document).on("click", ".backToMainMenuClick", function (e) {
		setTimeout(() => {
			$(".Messages_list").append(createFAQCategoryHTMLDesign());
			$(".Messages").animate(
				{ scrollTop: $(".Messages_list")[0].scrollHeight },
				"slow"
			);
		}, 1000);
	});

	$scope.checkIsValidateEmail = (inputText) => {
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (inputText.match(mailformat)) {
			return true;
		} else {
			return false;
		}
	};

	$(document).on("click", ".botFormSubmitClick", function (e) {
		let chatbotUserName = $("#chatbotUserName").val();
		let chatbotUserEmail = $("#chatbotUserEmail").val();
		let userBotMessage = $("#userBotMessage").val();
		if (chatbotUserName) {
			if (chatbotUserEmail) {
				if ($scope.checkIsValidateEmail(chatbotUserEmail)) {
					if (userBotMessage) {
						let getFormHtml = `<div class="msg">
                                <span class="avtr">
                                    <figure style="background-image: url(https://mrseankumar25.github.io/Sandeep-Kumar-Frontend-Developer-UI-Specialist/images/avatar.png)"></figure>
                                </span>
                                <span class="responsText">
                                    <div class="same-row question-part text-ltr">
                                        <div class="bubble no-border" style="display: table; direction: unset;">
                                            <p>Thank you for submitting your request we will get in touch with you shortly.</p>
                                        </div>
                                    </div>
                                </span>
                            </div>`;
						setTimeout(() => {
							$(".Messages_list").append(getFormHtml);
							$(".Messages").animate(
								{ scrollTop: $(".Messages_list")[0].scrollHeight },
								"slow"
							);
						}, 1000);
						toastr.success(
							"Thank you for submitting your request we will get in touch with you shortly."
						);
					} else {
						$(this).parent().find("#userBotMessage").focus();
						toastr.error("Please enter your query/message.");
					}
				} else {
					$(this).parent().find("#chatbotUserEmail").focus();
					toastr.error("Email is invalid, Please enter correct email address");
				}
			} else {
				$(this).parent().find("#chatbotUserEmail").focus();
				toastr.error("Please enter your email address.");
			}
		} else {
			$(this).parent().find("#chatbotUserName").focus();
			toastr.error("Please enter your full name");
		}
	});

	$(document).on("click", ".OtherOptionClick", function (e) {
		let getFormHtml = `<div class="msg">
        <span class="avtr">
            <figure style="background-image: url(https://mrseankumar25.github.io/Sandeep-Kumar-Frontend-Developer-UI-Specialist/images/avatar.png)"></figure>
        </span>
        <span class="responsText">
            <div class="same-row question-part text-ltr">
                <div class="bubble no-border" style="display: table; direction: unset;">
                    <p>Please provide your following details. we will contact you soon.</p>
                    <div class="option-wrapper">
                        <form>
                            <div class="form-group ">
                                <label for="chatbotUserName"  style="font-size: 15px;">Full Name</label>
                                <input type="text" class="form-control form-control-sm" id="chatbotUserName" aria-describedby="emailHelp" placeholder="Enter your full name">
                            </div>
                            <div class="form-group mt-2">
                                <label for="chatbotUserEmail" style="font-size: 15px;">Email address</label>
                                <input type="text" class="form-control form-control-sm" id="chatbotUserEmail" aria-describedby="emailHelp" placeholder="Enter email">
                            </div>
                            <div class="form-group  mt-2">
                                <label for="userBotMessage" style="font-size: 15px;">Your Message</label>
                                <textarea style="resize: none;" type="text" class="form-control form-control-sm" id="userBotMessage" placeholder="Enter your message"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary mt-3 botFormSubmitClick">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </span>
    </div>`;
		setTimeout(() => {
			$(".Messages_list").append(getFormHtml);
			$(".Messages").animate(
				{ scrollTop: $(".Messages_list")[0].scrollHeight },
				"slow"
			);
		}, 1000);
	});

	$(document).on("click", ".questionNameClick", function (e) {
		if ($(this).attr("questionID")) {
			const getFilteredFaqListArray = $scope.FAQListArray.filter(
				(category) => category.tf_id == $(this).attr("questionID")
			);
			$(".Messages_list").append(
				`<div class="msg user">
                                        <span class="avtr">
                                            <figure style="background-image: url(https://mrseankumar25.github.io/Sandeep-Kumar-Frontend-Developer-UI-Specialist/images/avatar.png)"></figure>
                                        </span>
                                        <span class="responsText">
                                            <div class="same-row question-part text-ltr">
                                                <div class="bubble no-border" style="display: table; direction: unset;">
                                                    <p>` +
				getFilteredFaqListArray[0].tf_question +
				`</p>
                                                </div>
                                            </div>
                                        </span>
                                    </div>`
			);
			$(".Messages").animate(
				{ scrollTop: $(".Messages_list")[0].scrollHeight },
				"slow"
			);

			var createQuestionWithSpacificCategoryHtml =
				`<div class="msg">
            <span class="avtr">
                <figure style="background-image: url(https://mrseankumar25.github.io/Sandeep-Kumar-Frontend-Developer-UI-Specialist/images/avatar.png)"></figure>
            </span>
            <span class="responsText">
                <div class="same-row question-part text-ltr">
                    <div class="bubble no-border" style="display: table; direction: unset;">
                        <p>` +
				getFilteredFaqListArray[0].tf_answer +
				`</p>
                        <div class="option-wrapper">
                                <div class="bubble bubble-inline option theme-border theme-color backToMainMenuClick">
                                    <span>Back To Main Menu</span>
                                </div>
                                <div class="bubble bubble-inline option theme-border theme-color OtherOptionClick">
                                    <span>Other</span>
                                </div>
                        </div>
                    </div>
                </div>
                </span>
                </div>`;

			setTimeout(() => {
				$(".Messages_list").append(createQuestionWithSpacificCategoryHtml);
				$(".Messages").animate(
					{ scrollTop: $(".Messages_list")[0].scrollHeight },
					"slow"
				);
			}, 1000);
		}
	});

	$(document).on("click", ".categoryNameClick", function (e) {
		if ($(this).attr("categoryName")) {
			let getHTML = createFAQQuestionsHTMLDesign($(this).attr("categoryName"));
			setTimeout(() => {
				$(".Messages_list").append(getHTML);
				$(".Messages").animate(
					{ scrollTop: $(".Messages_list")[0].scrollHeight },
					"slow"
				);
			}, 1000);
		}
	});

	$(document).on("click", ".botIconContainer", function (e) {
		$(".Messages_list").html("");
		$(".Messages_list").append(`<div class="msg">
            <span class="avtr">
                <figure style="background-image: url(https://mrseankumar25.github.io/Sandeep-Kumar-Frontend-Developer-UI-Specialist/images/avatar.png)"></figure>
            </span>
            <span class="responsText">
                <div class="same-row question-part text-ltr">
                    <div class="bubble no-border" style="display: table; direction: unset;">
                        <div class="chat-message">
                            <p class="font-weight-bold">Hello, Welcome to the Matoshri Pratishthan Group of Institutions.</p>
                        </div>
                    </div>
                </div>
            </span>
        </div>`);

		$(".Messages_list").append(createFAQCategoryHTMLDesign());
		$(".Messages").animate(
			{ scrollTop: $(".Messages_list")[0].scrollHeight },
			"slow"
		);
	});

	$scope.getFAQList = function () {
		var transform = function (data) {
			return $.param(data);
		};
		$http
			.post(
				window.site_url + "AdminFAQ/getFaqsList",
				{},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
					transformRequest: transform,
				}
			)
			.then(function (response) {
				if (response.data.status.status == "201") {
					if (response.data.data.length > 0) {
						$scope.FAQListArray = response.data.data;
						let tempCategoryArray = [];
						for (let i = 0; i < $scope.FAQListArray.length; i++) {
							if (
								!tempCategoryArray.includes($scope.FAQListArray[i].tf_category)
							) {
								tempCategoryArray.push($scope.FAQListArray[i].tf_category);
							}
						}
						$scope.FAQCategoryListArray = tempCategoryArray;
					}
				} else {
					toastr.error(response.data.status.message);
				}
			});
	};



	$scope.getAllPagesList = function ($getLocation) {
		var transform = function (data) {
			return $.param(data);
		};
		$http
			.post(
				window.site_url + "WebsiteContentAllPages/getAllPagesList",
				{
					userFilter: "menu-stucture-page",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
					transformRequest: transform,
				}
			)
			.then(function (response) {
				if (response.data.status.status != "1") {
					let tempFileManagerArray = [];
					for (var i = 0; i < response.data.data.length; i++) {
						let getFileManagerObject = response.data.data[i];
						getFileManagerObject["isChecked"] = false;
						tempFileManagerArray.push(getFileManagerObject);
					}
					$scope.pagesListArray = tempFileManagerArray;
					if ($getLocation == "other") {
						$scope.getMenuStucturesForMainMenu();
						$scope.getMenuStucturesForFooter();
						$scope.getMenuStucturesForTopMenu();
					}
				} else {
					toastr.error(response.data.status.message);
				}
			});
	};

	$scope.createDepartmentDesign = function () {
		let createDepartmentHtml = '<ul class="dropdown-menu sub-menu" >';
		let createDepartmentInnerHtml = '<ul class="dropdown-menu sub-menu">';

		for (let i = 0; i < $scope.departmentListArray.length; i++) {
			if (
				$scope.departmentListArray[i]["faculty"].split("%^%").length > 0 &&
				$scope.checkAnyDepartmentExist($scope.departmentListArray[i])
			) {
				let facultyArray =
					$scope.departmentListArray[i]["faculty"].split("%^%");
				for (let j = 0; j < facultyArray.length; j++) {
					if (facultyArray[j].split("~^~")[2] == 1) {
						createDepartmentInnerHtml += `<li class="" facultyObj="${facultyArray[j]
							}" departmentObj="${$scope.departmentListArray[i]["sm_stream_name"] +
							"_" +
							$scope.departmentListArray[i]["sm_id"]
							}" ng-click="facultyLinkClick($event)">
                                     <a id="${facultyArray[j]
								.split("~^~")[1]
								.split(" ")
								.join("") +
							"_" +
							facultyArray[j].split("~^~")[0]
							}" class="dropdown-item ">${facultyArray[j].split("~^~")[1]
							}</a>
                                 </li>`;
					}
				}
				createDepartmentInnerHtml += `</ul>`;
				createDepartmentHtml += `<li class="nav-item dropdown">
                     <a id="${$scope.departmentListArray[i]["sm_stream_name"] +
					"_" +
					$scope.departmentListArray[i]["sm_id"]
					}" href="#" role="button" data-bs-toggle="dropdown" class="dropdown-item dropdown-toggle">
                         ${$scope.departmentListArray[i]["sm_stream_name"]}
                     </a>${createDepartmentInnerHtml}`;
				createDepartmentInnerHtml = '<ul class="dropdown-menu sub-menu" >';
			}
		}

		createDepartmentHtml += `</ul>`;

		return createDepartmentHtml;
	};

	$scope.createActivitiesDesign = function () {
		let createActivitiesHtml = '<ul class="dropdown-menu sub-menu" >';

		for (let i = 0; i < $scope.activitiesListArray.length; i++) {
			createActivitiesHtml += `<li class="nav-item dropdown"
			 activitiesObj="${$scope.activitiesListArray[i]["asl_name"] +
				"_" +
				$scope.activitiesListArray[i]["asl_id"]
				}" ng-click="activitiviesLinkClick($event)">
	                 <a id="${$scope.activitiesListArray[i]["asl_name"] +
				"_" +
				$scope.activitiesListArray[i]["asl_id"]
				}" role="button" data-bs-toggle="dropdown" class="dropdown-item">
	                     ${$scope.activitiesListArray[i]["asl_name"]}
	                 </a> </li>`;
		}
		createActivitiesHtml += `</ul>`;
		return createActivitiesHtml;
	};

	$scope.createGalleyCategoryDesign = function () {
		let createActivitiesHtml = '<ul class="dropdown-menu sub-menu" >';

		for (let i = 0; i < $scope.galleryCategoryListArray.length; i++) {
			createActivitiesHtml += `<li class="nav-item dropdown"
			 galleryObj="${$scope.galleryCategoryListArray[i]["cgl_name"] +
				"_" +
				$scope.galleryCategoryListArray[i]["cgl_id"]
				}" ng-click="galleryLinkClick($event)">
	                 <a id="${$scope.galleryCategoryListArray[i]["cgl_name"] +
				"_" +
				$scope.galleryCategoryListArray[i]["cgl_id"]
				}" role="button" data-bs-toggle="dropdown" class="dropdown-item">
	                     ${$scope.galleryCategoryListArray[i]["cgl_name"]}
	                 </a> </li>`;
		}
		createActivitiesHtml += `</ul>`;
		return createActivitiesHtml;
	};

	$scope.createAssociationsDesign = function () {
		let createAssociationsHtml = '<ul class="dropdown-menu sub-menu" >';

		for (let i = 0; i < $scope.associationsListArray.length; i++) {
			createAssociationsHtml += `<li class="nav-item dropdown"
			 associationsObj="${$scope.associationsListArray[i]["assl_name"] +
				"_" +
				$scope.associationsListArray[i]["assl_id"]
				}" ng-click="associationsLinkClick($event)">
	                 <a id="${$scope.associationsListArray[i]["assl_name"] +
				"_" +
				$scope.associationsListArray[i]["assl_id"]
				}" role="button" data-bs-toggle="dropdown" class="dropdown-item">
	                     ${$scope.associationsListArray[i]["assl_name"]}
	                 </a> </li>`;
		}
		createAssociationsHtml += `</ul>`;
		return createAssociationsHtml;
	};

	$scope.createFacultiesDesign = function () {
		let createFacultiesHtml = '<ul class="dropdown-menu sub-menu" >';

		for (let i = 0; i < $scope.streamListArray.length; i++) {
			createFacultiesHtml += `<li class="nav-item dropdown" 
			 TeachingFacObj="${$scope.streamListArray[i]["sm_stream_name"] +
				"_" +
				$scope.streamListArray[i]["sm_id"]
				}" ng-click="TeachingfacultyLinkClick($event)">
	                 <a id="${$scope.streamListArray[i]["sm_stream_name"] +
				"_" +
				$scope.streamListArray[i]["sm_id"]
				}" role="button" data-bs-toggle="dropdown" class="dropdown-item">
	                     ${$scope.streamListArray[i]["sm_stream_name"]} 
	                 </a> </li>`;
		}
		createFacultiesHtml += `</ul>`;
		return createFacultiesHtml;
	};
	$scope.createNonTeachingFacultiesDesign = function () {
		let createFacultiesHtml = '<ul class="dropdown-menu sub-menu" >';

		for (let i = 0; i < $scope.streamListArray.length; i++) {
			createFacultiesHtml += `<li class="nav-item dropdown" 
			 TeachingFacObj="${$scope.streamListArray[i]["sm_stream_name"] +
				"_" +
				$scope.streamListArray[i]["sm_id"]
				}" ng-click="nonTeachingfacultyLinkClick($event)">
	                 <a id="${$scope.streamListArray[i]["sm_stream_name"] +
				"_" +
				$scope.streamListArray[i]["sm_id"]
				}" role="button" data-bs-toggle="dropdown" class="dropdown-item">
	                     ${$scope.streamListArray[i]["sm_stream_name"]} 
	                 </a> </li>`;
		}
		createFacultiesHtml += `</ul>`;
		return createFacultiesHtml;
	};

	$scope.createAdmissionDesign = function () {
		let createAdmissionHtml = '<ul class="dropdown-menu sub-menu" >';
		let createAdmissionInnerHtml = '<ul class="dropdown-menu sub-menu">';
		for (let i = 0; i < $scope.admissionListArray.length; i++) {
			if (
				$scope.admissionListArray[i]["faculty"].split("%^%").length > 0 &&
				$scope.checkAnyAdmissionDegreeExist($scope.admissionListArray[i])
			) {
				let admissionYearArray =
					$scope.admissionListArray[i]["faculty"].split("%^%");
				for (let j = 0; j < admissionYearArray.length; j++) {
					if (admissionYearArray[j].split("~^~")[2] == 1) {
						createAdmissionInnerHtml += `<li class="" facultyObj="${admissionYearArray[j]
							}" admissionObj="${$scope.admissionListArray[i]["am_degree_name"] +
							"_" +
							$scope.admissionListArray[i]["am_id"]
							}" ng-click="admissionLinkClick($event)">
                                     <a id="${admissionYearArray[j]
								.split("~^~")[1]
								.split(" ")
								.join("") +
							"_" +
							admissionYearArray[j].split("~^~")[0]
							}" class="dropdown-item ">${admissionYearArray[j].split("~^~")[1]
							}</a>
                                 </li>`;
					}
				}
				createAdmissionInnerHtml += `</ul>`;
				createAdmissionHtml += `<li class="nav-item dropdown">
                     <a id="${$scope.admissionListArray[i]["am_degree_name"] +
					"_" +
					$scope.admissionListArray[i]["am_id"]
					}" href="#" role="button" data-bs-toggle="dropdown" class="dropdown-item dropdown-toggle">
                         ${$scope.admissionListArray[i]["am_degree_name"]}
                     </a>${createAdmissionInnerHtml}`;
				createAdmissionInnerHtml = '<ul class="dropdown-menu sub-menu" >';
			}
		}

		createAdmissionHtml += `</ul>`;

		return createAdmissionHtml;
	};

	$scope.getMenuStucturesForMainMenu = function () {
		var transform = function (data) {
			return $.param(data);
		};
		$http
			.post(
				window.site_url + "WebsiteContentMenuStructure/getMenuStuctures",
				{
					menuType: "main-menu",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
					transformRequest: transform,
				}
			)
			.then(function (response) {
				if (response.data.status.status != "1") {
					if (response.data.data.length > 0) {
						createDynamicHTML = "";
						$(".myCustomMenu").html("");
						$scope.menuStucturesArray = response.data.data;
						$scope.commonCreateMenu(
							JSON.parse($scope.menuStucturesArray[0].mm_parent_id)
						);
						var compiledElement = $compile(createDynamicHTML)($scope);
						$(".myCustomMenu").append(compiledElement);
					} else {
						$("#menu-list").html("");
					}
				} else {
					toastr.error(response.data.status.message);
				}
			});
	};

	$scope.getMenuStucturesForFooter = function () {
		var transform = function (data) {
			return $.param(data);
		};
		$http
			.post(
				window.site_url + "WebsiteContentMenuStructure/getMenuStuctures",
				{
					menuType: "footer-menu",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
					transformRequest: transform,
				}
			)
			.then(function (response) {
				if (response.data.status.status != "1") {
					if (response.data.data.length > 0) {
						createDynamicHTMLForFooter = "";
						$(".myCustomMenuFooter").html("");
						$scope.menuStucturesFooterArray = response.data.data;
						$scope.commonCreateFooterMenu(
							JSON.parse($scope.menuStucturesFooterArray[0].mm_parent_id)
						);
						var compiledElement = $compile(createDynamicHTMLForFooter)($scope);
						$(".myCustomMenuFooter").append(compiledElement);
					} else {
						// $("#menu-list").html("");
					}
				} else {
					toastr.error(response.data.status.message);
				}
			});
	};

	$scope.getMenuStucturesForTopMenu = function () {
		var transform = function (data) {
			return $.param(data);
		};
		$http
			.post(
				window.site_url + "WebsiteContentMenuStructure/getMenuStuctures",
				{
					menuType: "top-menu",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
					transformRequest: transform,
				}
			)
			.then(function (response) {
				if (response.data.status.status != "1") {
					if (response.data.data.length > 0) {
						createDynamicHTMLForTopleftMenu = "";
						createDynamicHTMLForTopRightMenu = "";
						$(".myCustomTopLeftMenu").html("");
						// $(".myCustomTopRightMenu").html("");
						$scope.topMenuStucturesArray = response.data.data;
						let getRecoredCount = Math.round(
							JSON.parse($scope.topMenuStucturesArray[0].mm_parent_id).length /
							1
						);

						$scope.commonCreateTopLeftMenu(
							JSON.parse($scope.topMenuStucturesArray[0].mm_parent_id).splice(
								0,
								getRecoredCount
							)
						);
						var compiledLeftElement = $compile(createDynamicHTMLForTopleftMenu)(
							$scope
						);
						$(".myCustomTopLeftMenu").append(compiledLeftElement);

						// $scope.commonCreateTopRightMenu(
						// 	JSON.parse($scope.topMenuStucturesArray[0].mm_parent_id).splice(
						// 		JSON.parse($scope.topMenuStucturesArray[0].mm_parent_id)
						// 			.length - getRecoredCount,
						// 		getRecoredCount
						// 	)
						// );

						// var compiledRightElement = $compile(
						// 	createDynamicHTMLForTopRightMenu
						// )($scope);
						// $(".myCustomTopRightMenu").append(compiledRightElement);
					} else {
						$("#menu-list").html("");
					}
				} else {
					toastr.error(response.data.status.message);
				}
			});
	};

	$scope.commonCreateTopRightMenu = function (node) {
		for (let child of node) {
			let findParentIdInPagesArray = $scope.pagesListArray.find(function (el) {
				if (el.tmp_id == child.id) {
					return el["tmp_pane_name"];
				}
			});
			let getPageType =
				findParentIdInPagesArray.tmp_page_type == "system_defined"
					? "System Page"
					: findParentIdInPagesArray.tmp_page_type == "user_defined"
						? "User Page"
						: "Custom Link";
			let pageLink = findParentIdInPagesArray.tmp_menu_link;
			let pageID = findParentIdInPagesArray.tmp_id;
			let pageName = findParentIdInPagesArray.tmp_pane_name;
			let pageTarget = findParentIdInPagesArray.tmp_menu_target;
			let tmp_page_type = findParentIdInPagesArray.tmp_page_type;
			let tmp_page_menu_type_bit =
				findParentIdInPagesArray.tmp_page_menu_type_bit;
			let departmentDesing = "";
			let admissionDesing = "";
			let activitiesDesing = "";
			let gallerysDesing = "";

			let associationsDesing = "";

			if (
				child.children &&
				Array.isArray(child.children) &&
				child.children.length > 0
			) {
				if (tmp_page_menu_type_bit == "department_menu") {
					departmentDesing = $scope.createDepartmentDesign();
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
                <a id="DepartmentDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${departmentDesing}`;
				} else if (tmp_page_menu_type_bit == "department_menu") {
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass dropdown menuItemForActive_${child.id}">
                    <a id="menuItem_${child.id}" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="<?php echo base_url('department' . '/') ?>{{faculty.split('~^~')[1]}}" id="{{faculty.split('~^~')[1].split(' ').join('')}}_{{faculty.split('~^~')[0]}}" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>`;
				} else if (tmp_page_menu_type_bit == "admission_menu") {
					admissionDesing = $scope.createAdmissionDesign();
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="AdmissionDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${admissionDesing}`;
				} else if (tmp_page_menu_type_bit == "activities_menu") {
					activitiesDesing = $scope.createActivitiesDesign();
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
					<a id="ActivitiesDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
				} else if (tmp_page_menu_type_bit == "gallery_menu") {
					gallerysDesing = $scope.createGalleyCategoryDesign();
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="GallryCategoryDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${gallerysDesing}`;
				} else if (tmp_page_menu_type_bit == "associtions_menu") {
					associationsDesing = $scope.createAssociationsDesign();
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="AssociationsDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${associationsDesing}`;
				} else if (tmp_page_menu_type_bit == "teaching_faculty_menu") {
					activitiesDesing = $scope.createFacultiesDesign();
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="TeachingfacultyDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
				} else if (tmp_page_menu_type_bit == "non-teaching-faculty_menu") {
					activitiesDesing = $scope.createNonTeachingFacultiesDesign();
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="TeachingfacultyDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
				} else {
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass dropdown menuItemForActive_${child.id}">
			        <a id="menuItem_${child.id}" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="${pageLink}" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>`;
				}
				createDynamicHTMLForTopRightMenu += `<ul class="dropdown-menu sub-menu" id="menuItemOl_${child.id}">`;
				isInnerRight = isInnerRight + 1;
				$scope.commonCreateTopRightMenu(child.children);
			} else {
				if (tmp_page_menu_type_bit == "department_menu") {
					departmentDesing = $scope.createDepartmentDesign();
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
                <a id="DepartmentDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href"#" pageName="${child.type}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${child.type}</a>${departmentDesing}`;
				} else if (tmp_page_menu_type_bit == "department_menu") {
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id}">
                    <a id="menuItem_${child.id}" class="nav-link clearActiveClass menuItemForActive_${child.id} " href="<?php echo base_url('department' . '/') ?>{{faculty.split('~^~')[1]}}" id="{{faculty.split('~^~')[1].split(' ').join('')}}_{{faculty.split('~^~')[0]}}" pageName="${child.type}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${child.type}</a>`;
				} else if (tmp_page_menu_type_bit == "admission_menu") {
					admissionDesing = $scope.createAdmissionDesign();
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="AdmissionDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${child.type}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${child.type}</a>${admissionDesing}`;
				} else if (tmp_page_menu_type_bit == "activities_menu") {
					activitiesDesing = $scope.createActivitiesDesign();
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
					<a id="ActivitiesDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="<?php echo base_url('department' . '/') ?> pageName="${child.type}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}">${child.type}</a>${activitiesDesing}`;
				} else if (tmp_page_menu_type_bit == "gallery_menu") {
					gallerysDesing = $scope.createGalleyCategoryDesign();
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="GallryCategoryDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${child.type}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${child.type}</a>${gallerysDesing}`;
				} else if (tmp_page_menu_type_bit == "associtions_menu") {
					associationsDesing = $scope.createAssociationsDesign();
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="AssociationsDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${child.type}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${child.type}</a>${associationsDesing}`;
				} else if (tmp_page_menu_type_bit == "teaching_faculty_menu") {
					activitiesDesing = $scope.createFacultiesDesign();
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="TeachingfacultyDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${child.type}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${child.type}</a>${activitiesDesing}`;
				} else if (tmp_page_menu_type_bit == "non-teaching-faculty_menu") {
					activitiesDesing = $scope.createNonTeachingFacultiesDesign();
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="TeachingfacultyDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${child.type}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${child.type}</a>${activitiesDesing}`;
				} else {
					createDynamicHTMLForTopRightMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id}">
			        <a id="menuItem_${child.id}" class="nav-link clearActiveClass menuItemForActive_${child.id} " href="${pageLink}" pageName="${child.type}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${child.type}</a>`;
				}
				createDynamicHTMLForTopRightMenu += `</li>`;
			}

		}
		if (isInnerRight != 0) {
			if (isInnerRight > 0) {
				createDynamicHTMLForTopRightMenu += `</li></ul>`;
				isInnerRight--;
			}
		} else {
			createDynamicHTMLForTopRightMenu += `</li>`;
		}
	};

	$scope.commonCreateTopLeftMenu = function (node) {
		for (let child of node) {
			let findParentIdInPagesArray = $scope.pagesListArray.find(function (el) {
				if (el.tmp_id == child.id) {
					return el["tmp_pane_name"];
				}
			});
			let getPageType =
				findParentIdInPagesArray.tmp_page_type == "system_defined"
					? "System Page"
					: findParentIdInPagesArray.tmp_page_type == "user_defined"
						? "User Page"
						: "Custom Link";
			let pageLink = findParentIdInPagesArray.tmp_menu_link;
			let pageID = findParentIdInPagesArray.tmp_id;
			let pageName = findParentIdInPagesArray.tmp_pane_name;
			let pageTarget = findParentIdInPagesArray.tmp_menu_target;
			let tmp_page_type = findParentIdInPagesArray.tmp_page_type;
			let tmp_page_menu_type_bit =
				findParentIdInPagesArray.tmp_page_menu_type_bit;
			let departmentDesing = "";
			let admissionDesing = "";
			let activitiesDesing = "";
			let gallerysDesing = "";
			let associationsDesing = "";

			if (
				child.children &&
				Array.isArray(child.children) &&
				child.children.length > 0
			) {
				if (tmp_page_menu_type_bit == "department_menu") {
					departmentDesing = $scope.createDepartmentDesign();
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
                <a id="DepartmentDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${departmentDesing}`;
				} else if (tmp_page_menu_type_bit == "department_menu") {
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass dropdown menuItemForActive_${child.id}">
                    <a id="menuItem_${child.id}" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="<?php echo base_url('department' . '/') ?>{{faculty.split('~^~')[1]}}" id="{{faculty.split('~^~')[1].split(' ').join('')}}_{{faculty.split('~^~')[0]}}" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>`;
				} else if (tmp_page_menu_type_bit == "admission_menu") {
					admissionDesing = $scope.createAdmissionDesign();
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="AdmissionDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${admissionDesing}`;
				} else if (tmp_page_menu_type_bit == "activities_menu") {
					activitiesDesing = $scope.createActivitiesDesign();
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
					<a id="ActivitiesDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
				} else if (tmp_page_menu_type_bit == "gallery_menu") {
					gallerysDesing = $scope.createGalleyCategoryDesign();
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="GallryCategoryDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${gallerysDesing}`;
				} else if (tmp_page_menu_type_bit == "associtions_menu") {
					associationsDesing = $scope.createAssociationsDesign();
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="AssociationsDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${associationsDesing}`;
				} else if (tmp_page_menu_type_bit == "teaching_faculty_menu") {
					activitiesDesing = $scope.createFacultiesDesign();
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="TeachingfacultyDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
				} else if (tmp_page_menu_type_bit == "non-teaching-faculty_menu") {
					activitiesDesing = $scope.createNonTeachingFacultiesDesign();
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="TeachingfacultyDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
				} else {
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass dropdown menuItemForActive_${child.id}">
			        <a id="menuItem_${child.id}" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>`;
				}
				createDynamicHTMLForTopleftMenu += `<ul class="dropdown-menu sub-menu" id="menuItemOl_${child.id}">`;
				isInnerLeft = isInnerLeft + 1;
				$scope.commonCreateTopLeftMenu(child.children);
			} else {
				if (tmp_page_menu_type_bit == "department_menu") {
					departmentDesing = $scope.createDepartmentDesign();
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
                <a id="DepartmentDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${departmentDesing}`;
				} else if (tmp_page_menu_type_bit == "department_menu") {
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id}">
                    <a id="menuItem_${child.id}" class="nav-link clearActiveClass menuItemForActive_${child.id} " href="<?php echo base_url('department' . '/') ?>{{faculty.split('~^~')[1]}}" id="{{faculty.split('~^~')[1].split(' ').join('')}}_{{faculty.split('~^~')[0]}}" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>`;
				} else if (tmp_page_menu_type_bit == "admission_menu") {
					admissionDesing = $scope.createAdmissionDesign();
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="AdmissionDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${admissionDesing}`;
				} else if (tmp_page_menu_type_bit == "admission_menu") {
					activitiesDesing = $scope.createActivitiesDesign();
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
					<a id="ActivitiesDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
				} else if (tmp_page_menu_type_bit == "gallery_menu") {
					gallerysDesing = $scope.createGalleyCategoryDesign();
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="GallryCategoryDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${gallerysDesing}`;
				} else if (tmp_page_menu_type_bit == "admission_menu") {
					associationsDesing = $scope.createAssociationsDesign();
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="AssociationsDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${associationsDesing}`;
				} else if (tmp_page_menu_type_bit == "admission_menu") {
					activitiesDesing = $scope.createFacultiesDesign();
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="TeachingfacultyDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
				} else if (tmp_page_menu_type_bit == "admission_menu") {
					activitiesDesing = $scope.createNonTeachingFacultiesDesign();
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
			    <a id="TeachingfacultyDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
				} else {
					createDynamicHTMLForTopleftMenu += `<li class="nav-item clearActiveClass menuItemForActive_${child.id}">
			        <a id="menuItem_${child.id}" class="nav-link clearActiveClass menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>`;
				}
				createDynamicHTMLForTopleftMenu += `</li>`;
			}
		}
		if (isInnerLeft != 0) {
			if (isInnerLeft > 0) {
				createDynamicHTMLForTopleftMenu += `</li></ul>`;
				isInnerLeft--;
			}
		} else {
			createDynamicHTMLForTopleftMenu += `</li>`;
		}
	};

	$scope.commonCreateFooterMenu = function (node) {
		let countLavel = 0;
		let appendCol = `<div class="col-lg-12">`;
		for (let child of node) {
			let findParentIdInPagesArray = $scope.pagesListArray.find(function (el) {
				if (el.tmp_id == child.id) {
					return el["tmp_pane_name"];
				}
			});
			let pageLink = findParentIdInPagesArray.tmp_menu_link;
			let pageName = findParentIdInPagesArray.tmp_pane_name;
			let pageTarget = findParentIdInPagesArray.tmp_menu_target;
			let tmp_page_type = findParentIdInPagesArray.tmp_page_type;
			if (countLavel == 0) {
				createDynamicHTMLForFooter += appendCol;
			}
			createDynamicHTMLForFooter += `<a id="menuItem_${child.id}" class="btn btn-link" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}`;
			createDynamicHTMLForFooter += `</a>`;
			if (countLavel >= 5) {
				createDynamicHTMLForFooter += `</div><div class="col-lg-12">`;
				countLavel = 0;
			}
			countLavel++;
		}
	};

	$scope.commonCreateMenu = function (node) {
		for (let child of node) {
			let findParentIdInPagesArray = $scope.pagesListArray.find(function (el) {
				if (el.tmp_id == child.id) {
					return el["tmp_pane_name"];
				}
			});
			let getPageType =
				findParentIdInPagesArray.tmp_page_type == "system_defined"
					? "System Page"
					: findParentIdInPagesArray.tmp_page_type == "user_defined"
						? "User Page"
						: "Custom Link";
			let pageLink = findParentIdInPagesArray.tmp_menu_link;
			let pageID = findParentIdInPagesArray.tmp_id;
			let pageName = findParentIdInPagesArray.tmp_pane_name;
			let pageTarget = findParentIdInPagesArray.tmp_menu_target;
			let tmp_page_type = findParentIdInPagesArray.tmp_page_type;
			let tmp_page_menu_type_bit =
				findParentIdInPagesArray.tmp_page_menu_type_bit;
			let departmentDesing = "";
			let admissionDesing = "";
			let activitiesDesing = "";
			let gallerysDesing = "";
			let associationsDesing = "";

			if (
				child.children &&
				Array.isArray(child.children) &&
				child.children.length > 0
			) {
				if (tmp_page_menu_type_bit == "department_menu") {
					departmentDesing = $scope.createDepartmentDesign();
					createDynamicHTML += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
                <a id="DepartmentDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${departmentDesing}`;
				} else if (tmp_page_menu_type_bit == "department_menu") {
					createDynamicHTML += `<li class="nav-item clearActiveClass dropdown menuItemForActive_${child.id}">
                    <a id="menuItem_${child.id}" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="<?php echo base_url('department' . '/') ?>{{faculty.split('~^~')[1]}}" id="{{faculty.split('~^~')[1].split(' ').join('')}}_{{faculty.split('~^~')[0]}}" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>`;
				} else if (tmp_page_menu_type_bit == "admission_menu") {
					admissionDesing = $scope.createAdmissionDesign();
					createDynamicHTML += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
                <a id="AdmissionDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${admissionDesing}`;
				} else if (tmp_page_menu_type_bit == "activities_menu") {
					activitiesDesing = $scope.createActivitiesDesign();
					createDynamicHTML += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
					<a id="ActivitiesDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}">${pageName}</a>${activitiesDesing}`;
				} else if (tmp_page_menu_type_bit == "gallery_menu") {
					gallerysDesing = $scope.createGalleyCategoryDesign();
					createDynamicHTML += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
                <a id="GallryCategoryDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${gallerysDesing}`;
				} else if (tmp_page_menu_type_bit == "associtions_menu") {
					associationsDesing = $scope.createAssociationsDesign();
					createDynamicHTML += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
                <a id="AssociationsDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${associationsDesing}`;
				} else if (tmp_page_menu_type_bit == "teaching_faculty_menu") {
					activitiesDesing = $scope.createFacultiesDesign();
					createDynamicHTML += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
                <a id="TeachingfacultyDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${activitiesDesing}`;
				} else if (tmp_page_menu_type_bit == "non-teaching-faculty_menu") {
					activitiesDesing = $scope.createNonTeachingFacultiesDesign();
					createDynamicHTML += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
                <a id="TeachingfacultyDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${activitiesDesing}`;
				} else {
					createDynamicHTML += `<li class="nav-item clearActiveClass dropdown menuItemForActive_${child.id}">
                    <a id="menuItem_${child.id}" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id}" href="${base_url_website}${pageLink}" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>`;
				}
				createDynamicHTML += `<ul class="dropdown-menu sub-menu" id="menuItemOl_${child.id}">`;
				isInner = isInner + 1;
				$scope.commonCreateMenu(child.children);
			} else {
				if (tmp_page_menu_type_bit == "department_menu") {
					departmentDesing = $scope.createDepartmentDesign();
					createDynamicHTML += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
                <a id="DepartmentDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${departmentDesing}`;
				} else if (tmp_page_menu_type_bit == "department_menu") {
					createDynamicHTML += `<li class="nav-item clearActiveClass menuItemForActive_${child.id}">
                    <a id="menuItem_${child.id}" class="nav-link clearActiveClass menuItemForActive_${child.id} " href="<?php echo base_url('department' . '/') ?>{{faculty.split('~^~')[1]}}" id="{{faculty.split('~^~')[1].split(' ').join('')}}_{{faculty.split('~^~')[0]}}" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>`;
				} else if (tmp_page_menu_type_bit == "admission_menu") {
					admissionDesing = $scope.createAdmissionDesign();
					createDynamicHTML += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
                <a id="AdmissionDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${admissionDesing}`;
				} else if (tmp_page_menu_type_bit == "activities_menu") {
					activitiesDesing = $scope.createActivitiesDesign();
					createDynamicHTML += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
					<a id="ActivitiesDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}">${pageName}</a>${activitiesDesing}`;
				} else if (tmp_page_menu_type_bit == "gallery_menu") {
					activitiesDesing = $scope.createGalleyCategoryDesign();
					createDynamicHTML += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
                <a id="GallryCategoryDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${activitiesDesing}`;
				} else if (tmp_page_menu_type_bit == "associtions_menu") {
					associationsDesing = $scope.createAssociationsDesign();
					createDynamicHTML += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} ">
                <a id="AssociationsDetailsLi" class="nav-link clearActiveClass  menuItemForActive_${child.id} " href="${base_url_website}associations" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${associationsDesing}`;
				} else if (tmp_page_menu_type_bit == "teaching_faculty_menu") {
					activitiesDesing = $scope.createFacultiesDesign();
					createDynamicHTML += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
                <a id="TeachingfacultyDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${activitiesDesing}`;
				} else if (tmp_page_menu_type_bit == "non-teaching-faculty_menu") {
					activitiesDesing = $scope.createNonTeachingFacultiesDesign();
					createDynamicHTML += `<li class="nav-item clearActiveClass menuItemForActive_${child.id} dropdown">
                <a id="TeachingfacultyDetailsLi" class="nav-link clearActiveClass dropdown-toggle menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${activitiesDesing}`;
				} else {
					createDynamicHTML += `<li class="nav-item clearActiveClass menuItemForActive_${child.id}">
                    <a id="menuItem_${child.id}" class="nav-link clearActiveClass menuItemForActive_${child.id} " href="${base_url_website}${pageLink}" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>`;
				}
				createDynamicHTML += `</li>`;
			}
		}
		if (isInner != 0) {
			if (isInner > 0) {
				createDynamicHTML += `</li></ul>`;
				isInner--;
			}
		} else {
			createDynamicHTML += `</li>`;
		}
	};

	
	$scope.onMenuClick = function (event) {
        console.log('event',event);
        var target = angular.element(event.target);
        let pageLink = target.attr("pageLink");
        let pageID = target.attr("pageID");
        let pageTarget = target.attr("pageTarget");
        let pageType = target.attr("tmp_page_type");

        if (pageType == "custom_link") {
            // Prevent default behavior of the link
            event.preventDefault();
            // Open custom links in new window/tab
            if (pageTarget == "same_window") {
                window.open(pageLink, "_self");
                            } else {
                                window.open( pageLink, "_blank");
                            }
        } else {
            // Handle other types of links
            if (pageLink && pageLink !== "null") {
                window.location.href = base_url + pageLink;
            }
        } 
    };
	// Get all Departments List Service
	$scope.getDepartments = function () {
		var transform = function (data) {
			return $.param(data);
		};
		$http
			.post(
				window.site_url + "FrontEndAPI/getDepartmentsAndItsFaculty",
				{
					inputSearchValue: $scope.inputSearchValue,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
					transformRequest: transform,
				}
			)
			.then(function (response) {
				if (response.data.status.status == "200") {
					$scope.departmentListArray = response.data.data;
					// $scope.getAllPagesList("other");
				} else {
					$scope.departmentListArray = [];
					// $scope.getAllPagesList("other");
				}
			});
	};

	// Get all Activities List Service
	$scope.getActivities = function () {
		var transform = function (data) {
			return $.param(data);
		};
		$http
			.post(
				window.site_url + "FrontEndAPI/getActivitiesList",
				{
					inputSearchValue: $scope.inputSearchValue,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
					transformRequest: transform,
				}
			)
			.then(function (response) {
				if (response.data.status.status == "200") {
					$scope.activitiesListArray = response.data.data;
					// $scope.getAllPagesList("other");
				} else {
					$scope.activitiesListArray = [];
					// $scope.getAllPagesList("other");
				}
			});
	};

	$scope.getGalleryCategory = function () {
		var transform = function (data) {
			return $.param(data);
		};
		$http
			.post(
				window.site_url + "FrontEndAPI/getGalleryCategoryList",
				{
					inputSearchValue: $scope.inputSearchValue,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
					transformRequest: transform,
				}
			)
			.then(function (response) {
				if (response.data.status.status == "200") {
					$scope.galleryCategoryListArray = response.data.data;
					console.log('$scope.galleryCategoryListArray', $scope.galleryCategoryListArray);
					// $scope.getAllPagesList("other");
				} else {
					$scope.galleryCategoryListArray = [];
					// $scope.getAllPagesList("other");
				}
			});
	};

	// Get all Associations  List Service
	$scope.getAssociations = function () {
		var transform = function (data) {
			return $.param(data);
		};
		$http
			.post(
				window.site_url + "FrontEndAPI/getAssociationsList",
				{
					inputSearchValue: $scope.inputSearchValue,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
					transformRequest: transform,
				}
			)
			.then(function (response) {
				if (response.data.status.status == "200") {
					$scope.associationsListArray = response.data.data;
					// $scope.getAllPagesList("other");
				} else {
					$scope.associationsListArray = [];
					// $scope.getAllPagesList("other");
				}
			});
	};

	// Get all Faculties Stream List Service
	$scope.getStreamsFaculties = function () {
		var transform = function (data) {
			return $.param(data);
		};
		$http
			.post(
				window.site_url + "FrontEndAPI/getStreamsAndFaculty",
				{
					inputSearchValue: $scope.inputSearchValue,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
					transformRequest: transform,
				}
			)
			.then(function (response) {
				if (response.data.status.status == "200") {
					$scope.streamListArray = response.data.data;
					// $scope.getAllPagesList("other");
				} else {
					$scope.streamListArray = [];
					// $scope.getAllPagesList("other");
				}
			});
	};

	// Get all Admission List Service
	$scope.getAdmission = function () {
		var transform = function (data) {
			return $.param(data);
		};
		$http
			.post(
				window.site_url + "FrontEndAPI/getAdmissionAndItsDegreeYear",
				{
					inputSearchValue: $scope.inputSearchValue,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
					transformRequest: transform,
				}
			)
			.then(function (response) {
				if (response.data.status.status == "200") {
					$scope.admissionListArray = response.data.data;
					// $scope.getAllPagesList("other");
				} else {
					$scope.admissionListArray = [];
					// $scope.getAllPagesList("other");
				}
			});
	};

	$scope.checkAnyDepartmentExist = (getDepartment) => {
		let getFacultyArray = getDepartment.faculty.split("%^%");
		let retrunValue = false;
		for (let i = 0; i < getFacultyArray.length; i++) {
			if (getFacultyArray[i].split("~^~")[2] == 1) {
				retrunValue = true;
			}
		}
		return retrunValue;
	};

	$scope.checkAnyAdmissionDegreeExist = (getAdmission) => {
		let getadmissionYearArray = getAdmission.faculty.split("%^%");
		let retrunValue = false;
		for (let i = 0; i < getadmissionYearArray.length; i++) {
			if (getadmissionYearArray[i].split("~^~")[2] == 1) {
				retrunValue = true;
			}
		}
		return retrunValue;
	};

	$scope.facultyLinkClick = async (event) => {
		var target = angular.element(event.target);
		let facultyObj = target.parent().attr("facultyObj");
		let departmentObj = target.parent().attr("departmentObj");
		localStorage.removeItem("cms_page_id");
		localStorage.removeItem("cms_page_link");
		localStorage.removeItem("cms_page_name");
		localStorage.removeItem("cms_page_type");

		localStorage.setItem("Faculty_dsl_id", facultyObj.split("~^~")[0]);

		localStorage.setItem("Faculty_Department_Name", facultyObj.split("~^~")[1].split(' ').join('-'));
		localStorage.setItem("DepartmentLiId", departmentObj);
		$scope.departmentName = localStorage.getItem('Faculty_Department_Name');
		window.open(base_url + 'department/' + $scope.departmentName, "_self");
	};
	$scope.admissionLinkClick = async (event) => {
		var target = angular.element(event.target);
		let facultyObj = target.parent().attr("facultyObj");
		let admissionObj = target.parent().attr("admissionObj");
		localStorage.removeItem("cms_page_id");
		localStorage.removeItem("cms_page_link");
		localStorage.removeItem("cms_page_name");
		localStorage.removeItem("cms_page_type");

		localStorage.setItem("Degree_Year_dsl_id", facultyObj.split("~^~")[0]);
		localStorage.setItem("Degree_Year_Name", facultyObj.split("~^~")[1]);
		localStorage.setItem("AdmissiontLiId", admissionObj);
		window.open(base_url + "admission", "_self");
	};

	$scope.activitiviesLinkClick = async (event) => {
		var target = angular.element(event.target);

		let activitiesObj = target.parent().attr("activitiesObj");
		localStorage.removeItem("cms_page_id");
		localStorage.removeItem("cms_page_link");
		localStorage.removeItem("cms_page_name");
		localStorage.removeItem("cms_page_type");

		localStorage.setItem("activities_id", activitiesObj.split("_")[1]);
		localStorage.setItem("activities_name", activitiesObj.split("_")[0]);
		localStorage.setItem("ActivitiesDetailsLi", activitiesObj);

		$scope.singlePageName = activitiesObj.split("_")[0];
		$scope.pageUrl = $scope.singlePageName.split(' ').join('-').toLowerCase();
		window.open(base_url + "activities/" + $scope.pageUrl, "_self");
	};

	$scope.galleryLinkClick = async (event) => {
		var target = angular.element(event.target);

		let galleryObj = target.parent().attr("galleryObj");
		localStorage.removeItem("cms_page_id");
		localStorage.removeItem("cms_page_link");
		localStorage.removeItem("cms_page_name");
		localStorage.removeItem("cms_page_type");


		$scope.smId = galleryObj.split("_")[1];

		localStorage.setItem("gallery_id", galleryObj.split("_")[1]);
		localStorage.setItem("gallery_name", galleryObj.split("_")[0]);
		localStorage.setItem("GallryCategoryDetailsLi", galleryObj);

		$scope.singlePageName = galleryObj.split("_")[0];
		$scope.pageUrl = $scope.singlePageName.split(' ').join('-').toLowerCase();
		// alert($scope.gallery_name);
		window.open(base_url + "gallery-category/" + $scope.smId + "/" + $scope.pageUrl, "_self");
	};
	$scope.associationsLinkClick = async (event) => {
		var target = angular.element(event.target);

		let associationsObj = target.parent().attr("associationsObj");
		localStorage.removeItem("cms_page_id");
		localStorage.removeItem("cms_page_link");
		localStorage.removeItem("cms_page_name");
		localStorage.removeItem("cms_page_type");

		localStorage.setItem("associations_id", associationsObj.split("_")[1]);
		localStorage.setItem("associations_name", associationsObj.split("_")[0]);
		localStorage.setItem("AssociationsDetailsLi", associationsObj);

		$scope.singlePageName = associationsObj.split("_")[0];
		$scope.pageUrl = $scope.singlePageName.split(' ').join('-').toLowerCase();
		window.open(base_url + $scope.pageUrl, "_self");
	};

	$scope.TeachingfacultyLinkClick = async (event) => {
		var target = angular.element(event.target);

		let TeachingFacObj = target.parent().attr("TeachingFacObj");
		localStorage.setItem("sm_id", TeachingFacObj.sm_id);
		localStorage.setItem("sm_stream_name", TeachingFacObj.sm_stream_name);
		localStorage.setItem("TeachingfacultyDetailsLi", TeachingFacObj);

		$scope.smId = TeachingFacObj.split("_")[1];
		// $scope.singlePageName = TeachingFacObj.sm_stream_name;

		$scope.singlePageName = TeachingFacObj.split("_")[0];

		$scope.pageUrl = $scope.singlePageName.split(" ").join("-").toLowerCase();
		$scope.pageName = $scope.pageUrl.split("&").join("");

		window.open(
			base_url + "teaching-faculty/" + $scope.smId + "/" + $scope.pageName,
			"_self"
		);
	};
	$scope.nonTeachingfacultyLinkClick = async (event) => {
		var target = angular.element(event.target);

		let TeachingFacObj = target.parent().attr("TeachingFacObj");
		localStorage.setItem("sm_id", TeachingFacObj.sm_id);
		localStorage.setItem("sm_stream_name", TeachingFacObj.sm_stream_name);
		localStorage.setItem("TeachingfacultyDetailsLi", TeachingFacObj);

		$scope.smId = TeachingFacObj.split("_")[1];
		// $scope.singlePageName = TeachingFacObj.sm_stream_name;

		$scope.singlePageName = TeachingFacObj.split("_")[0];

		$scope.pageUrl = $scope.singlePageName.split(" ").join("-").toLowerCase();
		$scope.pageName = $scope.pageUrl.split("&").join("");

		window.open(
			base_url + "non-teaching-faculty/" + $scope.smId + "/" + $scope.pageName,
			"_self"
		);
	};

});

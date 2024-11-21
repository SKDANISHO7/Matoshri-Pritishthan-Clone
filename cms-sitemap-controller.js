var csrflistHash = $('#csrflistHash').val();


app.controller('adminSitemapListServicesCtrl', function ($scope, $http, toastr, $compile, $sce, $location) {

	let createDynamicHTML = "";
	let createDynamicHTMLForTopMenu = "";
	var isInner = 0;
	const base_url_website = base_url;
	$scope.sitemapsListInit = function () {
		$scope.menuListArray = [];
		$scope.pagesListArray = [];
		$scope.inputSearchValue = '';
		$scope.getDepartments();
		$scope.getAdmission();
		$scope.getActivities();
		$scope.getAssociations();
		$scope.getStreamsFaculties();

		const base_url_website = base_url;
		$scope.seperator = "^%^"
		$scope.getAllPagesList("other");
	}

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
						$scope.getAllMenuListService();
						$scope.getMenuStucturesForFooter();
					}
				} else {
					toastr.error(response.data.status.message);
				}
			});
	};


	$scope.createDepartmentDesign = function () {
		let createDepartmentHtml = '<ul class="" >';
		let createDepartmentInnerHtml = '<ul class="">';
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
							}" class=" ">${facultyArray[j].split("~^~")[1]
							}</a>
                                 </li>`;
					}
				}
				createDepartmentInnerHtml += `</ul>`;
				createDepartmentHtml += `<li >
                     <a id="${$scope.departmentListArray[i]["sm_stream_name"] +
					"_" +
					$scope.departmentListArray[i]["sm_id"]
					}" href="#"  class="">
                         ${$scope.departmentListArray[i]["sm_stream_name"]}
                     </a>${createDepartmentInnerHtml}`;
				createDepartmentInnerHtml = '<ul class="" >';
			}
		}

		createDepartmentHtml += `</ul>`;

		return createDepartmentHtml;
	};

	$scope.createActivitiesDesign = function () {
		let createActivitiesHtml = '<ul class="" >';

		for (let i = 0; i < $scope.activitiesListArray.length; i++) {
			createActivitiesHtml += `<li class=""
			 activitiesObj="${$scope.activitiesListArray[i]["asl_name"] +
				"_" +
				$scope.activitiesListArray[i]["asl_id"]
				}" ng-click="activitiviesLinkClick($event)">
	                 <a id="${$scope.activitiesListArray[i]["asl_name"] +
				"_" +
				$scope.activitiesListArray[i]["asl_id"]
				}" class="">
	                     ${$scope.activitiesListArray[i]["asl_name"]}
	                 </a> </li>`;
		}
		createActivitiesHtml += `</ul>`;
		return createActivitiesHtml;
	};

	$scope.createAssociationsDesign = function () {
		let createAssociationsHtml = '<ul class="" >';

		for (let i = 0; i < $scope.associationsListArray.length; i++) {
			createAssociationsHtml += `<li class="display-none"
			 associationsObj="${$scope.associationsListArray[i]["assl_name"] +
				"_" +
				$scope.associationsListArray[i]["assl_id"]
				}" ng-click="associationsLinkClick($event)">
	                 <a id="${$scope.associationsListArray[i]["assl_name"] +
				"_" +
				$scope.associationsListArray[i]["assl_id"]
				}" class="" >
	                     ${$scope.associationsListArray[i]["assl_name"]}
	                 </a> </li>`;
		}
		createAssociationsHtml += `</ul>`;
		return createAssociationsHtml;
	};

	$scope.createFacultiesDesign = function () {
		let createFacultiesHtml = '<ul class="" >';

		for (let i = 0; i < $scope.streamListArray.length; i++) {
			createFacultiesHtml += `<li class="" 
			 TeachingFacObj="${$scope.streamListArray[i]["sm_stream_name"] +
				"_" +
				$scope.streamListArray[i]["sm_id"]
				}" ng-click="TeachingfacultyLinkClick($event)">
	                 <a id="${$scope.streamListArray[i]["sm_stream_name"] +
				"_" +
				$scope.streamListArray[i]["sm_id"]
				}" class="">
	                     ${$scope.streamListArray[i]["sm_stream_name"]} 
	                 </a> </li>`;
		}
		createFacultiesHtml += `</ul>`;
		return createFacultiesHtml;
	};
	$scope.createNonTeachingFacultiesDesign = function () {
		let createFacultiesHtml = '<ul class="" >';

		for (let i = 0; i < $scope.streamListArray.length; i++) {
			createFacultiesHtml += `<li class="" 
			 TeachingFacObj="${$scope.streamListArray[i]["sm_stream_name"] +
				"_" +
				$scope.streamListArray[i]["sm_id"]
				}" ng-click="nonTeachingfacultyLinkClick($event)">
	                 <a id="${$scope.streamListArray[i]["sm_stream_name"] +
				"_" +
				$scope.streamListArray[i]["sm_id"]
				}" >
	                     ${$scope.streamListArray[i]["sm_stream_name"]} 
	                 </a> </li>`;
		}
		createFacultiesHtml += `</ul>`;
		return createFacultiesHtml;
	};

	$scope.createAdmissionDesign = function () {
		let createAdmissionHtml = '<ul class="" >';
		let createAdmissionInnerHtml = '<ul class="">';
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
				createAdmissionHtml += `<li >
                     <a id="${$scope.admissionListArray[i]["am_degree_name"] +
					"_" +
					$scope.admissionListArray[i]["am_id"]
					}" href="#"  class="">
                         ${$scope.admissionListArray[i]["am_degree_name"]}
                     </a>${createAdmissionInnerHtml}`;
				createAdmissionInnerHtml = '<ul class="" >';
			}
		}

		createAdmissionHtml += `</ul>`;

		return createAdmissionHtml;
	};


	$scope.getAllMenuListService = function () {
		var transform = function (data) {
			return $.param(data);
		};
		$http
			.post(
				window.site_url + "FrontEndAPI/getMenuStuctures",
				{
					menuType: "main-menu",
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
				if (response.data.status.status != "1") {
					if (response.data.data.length > 0) {
						createDynamicHTML = "";
						$(".menuHTML").html("");
						$scope.menuStucturesArray = response.data.data;
						$scope.generateMenuHTML(
							JSON.parse($scope.menuStucturesArray[0].mm_parent_id)
						);
						var compiledElement = $compile(createDynamicHTML)($scope);
						$(".menuHTML").append(compiledElement);
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
						createDynamicHTMLForTopMenu = "";
						$(".myCustomMenuFooter").html("");
						$scope.menuStucturesFooterArray = response.data.data;
						$scope.commonCreateTopLeftMenu(
							JSON.parse($scope.menuStucturesFooterArray[0].mm_parent_id)
						);
						var compiledElement = $compile(createDynamicHTMLForTopMenu)($scope);
						$(".myCustomMenuFooter").append(compiledElement);
					} else {
						// $("#menu-list").html("");
					}
				} else {
					toastr.error(response.data.status.message);
				}
			});
	};

	$scope.commonCreateTopLeftMenu = function (node) {
		for (let child of node) {
			let findParentIdInPagesArray = $scope.pagesListArray.find(function (el) {
				return el.tmp_id == child.id;
			});
			// console.log('sitemap-nodefindParentIdInPagesArray', findParentIdInPagesArray);
			if (findParentIdInPagesArray) {
				let getPageType = findParentIdInPagesArray.tmp_page_type == "system_defined" ?
					"System Page" : findParentIdInPagesArray.tmp_page_type == "user_defined" ?
						"User Page" : "Custom Link";

				let pageLink = findParentIdInPagesArray.tmp_menu_link;
				let pageID = findParentIdInPagesArray.tmp_id;
				let pageName = findParentIdInPagesArray.tmp_pane_name;
				let pageTarget = findParentIdInPagesArray.tmp_menu_target;
				let tmp_page_type = findParentIdInPagesArray.tmp_page_type;
				let tmp_page_menu_type_bit = findParentIdInPagesArray.tmp_page_menu_type_bit;

				let departmentDesing = "";
				let admissionDesing = "";
				let activitiesDesing = "";
				let associationsDesing = "";

				if (
					child.children &&
					Array.isArray(child.children) &&
					child.children.length > 0
				) {
					if (tmp_page_menu_type_bit == "department_menu") {
						departmentDesing = $scope.createDepartmentDesign();
						createDynamicHTMLForTopMenu += `<li class=" menuItemForActive_${child.id} ">
					<a id="DepartmentDetailsLi" class="menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${departmentDesing}`;
					} else if (tmp_page_menu_type_bit == "department_menu") {
						createDynamicHTMLForTopMenu += `<li class="menuItemForActive_${child.id}">
						<a id="menuItem_${child.id}" class="menuItemForActive_${child.id}" href="<?php echo base_url('department' . '/') ?>{{faculty.split('~^~')[1]}}" id="{{faculty.split('~^~')[1].split(' ').join('')}}_{{faculty.split('~^~')[0]}}" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>`;
					} else if (tmp_page_menu_type_bit == "admission_menu") {
						admissionDesing = $scope.createAdmissionDesign();
						createDynamicHTMLForTopMenu += `<li class="menuItemForActive_${child.id}">
					<a id="AdmissionDetailsLi" class="menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${admissionDesing}`;
					} else if (tmp_page_menu_type_bit == "activities_menu") {
						activitiesDesing = $scope.createActivitiesDesign();
						createDynamicHTMLForTopMenu += `<li class="menuItemForActive_${child.id}">
					<a id="ActivitiesDetailsLi" class="menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
					} else if (tmp_page_menu_type_bit == "associtions_menu") {
						associationsDesing = $scope.createAssociationsDesign();
						createDynamicHTMLForTopMenu += `<li class="menuItemForActive_${child.id}">
					<a id="AssociationsDetailsLi" class="menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${associationsDesing}`;
					} else if (tmp_page_menu_type_bit == "teaching_faculty_menu") {
						activitiesDesing = $scope.createFacultiesDesign();
						createDynamicHTMLForTopMenu += `<li class="menuItemForActive_${child.id}">
					<a id="TeachingfacultyDetailsLi" class="menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
					} else if (tmp_page_menu_type_bit == "non-teaching-faculty_menu") {
						activitiesDesing = $scope.createNonTeachingFacultiesDesign();
						createDynamicHTMLForTopMenu += `<li class="menuItemForActive_${child.id}">
					<a id="TeachingfacultyDetailsLi" class="menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
					} else {
						createDynamicHTMLForTopMenu += `<li class="menuItemForActive_${child.id}">
						<a id="menuItem_${child.id}" class="menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>`;
					}
					createDynamicHTMLForTopMenu += `<ul class="" id="menuItemOl_${child.id}">`;
					isInner = isInner + 1;
					$scope.commonCreateTopLeftMenu(child.children);
				} else {
					if (tmp_page_menu_type_bit == "department_menu") {
						departmentDesing = $scope.createDepartmentDesign();
						createDynamicHTMLForTopMenu += `<li class="menuItemForActive_${child.id}">
					<a id="DepartmentDetailsLi" class="menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${departmentDesing}`;
					} else if (tmp_page_menu_type_bit == "department_menu") {
						createDynamicHTMLForTopMenu += `<li class="menuItemForActive_${child.id}">
						<a id="menuItem_${child.id}" class=" menuItemForActive_${child.id} " href="<?php echo base_url('department' . '/') ?>{{faculty.split('~^~')[1]}}" id="{{faculty.split('~^~')[1].split(' ').join('')}}_{{faculty.split('~^~')[0]}}" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>`;
					} else if (tmp_page_menu_type_bit == "admission_menu") {
						admissionDesing = $scope.createAdmissionDesign();
						createDynamicHTMLForTopMenu += `<li class="menuItemForActive_${child.id}">
					<a id="AdmissionDetailsLi" class="menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${admissionDesing}`;
					} else if (tmp_page_menu_type_bit == "activities_menu") {
						activitiesDesing = $scope.createActivitiesDesign();
						createDynamicHTMLForTopMenu += `<li class="menuItemForActive_${child.id}">
					<a id="ActivitiesDetailsLi" class="menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
					} else if (tmp_page_menu_type_bit == "associtions_menu") {
						associationsDesing = $scope.createAssociationsDesign();
						createDynamicHTMLForTopMenu += `<li class="menuItemForActive_${child.id} ">
					<a id="AssociationsDetailsLi" class="menuItemForActive_${child.id} " href="${base_url_website}associations" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${associationsDesing}`;
					} else if (tmp_page_menu_type_bit == "teaching_faculty_menu") {
						activitiesDesing = $scope.createFacultiesDesign();
						createDynamicHTMLForTopMenu += `<li class="menuItemForActive_${child.id}">
					<a id="TeachingfacultyDetailsLi" class="menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
					} else if (tmp_page_menu_type_bit == "non-teaching-faculty_menu") {
						activitiesDesing = $scope.createNonTeachingFacultiesDesign();
						createDynamicHTMLForTopMenu += `<li class="menuItemForActive_${child.id}">
					<a id="TeachingfacultyDetailsLi" class="menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
					} else {
						createDynamicHTMLForTopMenu += `<li class="menuItemForActive_${child.id}">
						<a id="menuItem_${child.id}" class=" menuItemForActive_${child.id} " href="${base_url_website}${pageLink}" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>`;
					}
					createDynamicHTMLForTopMenu += `</li>`;
				}
			}
		}
		if (isInner != 0) {
			if (isInner > 0) {
				createDynamicHTMLForTopMenu += `</li></ul>`;
				isInner--;
			}
		} else {
			createDynamicHTMLForTopMenu += `</ul>`;
		}
	};

	$scope.generateMenuHTML = function (node) {
		for (let child of node) {
			let findParentIdInPagesArray = $scope.pagesListArray.find(function (el) {
				return el.tmp_id == child.id;
			});
			if (findParentIdInPagesArray) {
				let getPageType = findParentIdInPagesArray.tmp_page_type == "system_defined" ?
					"System Page" : findParentIdInPagesArray.tmp_page_type == "user_defined" ?
						"User Page" : "Custom Link";

				let pageLink = findParentIdInPagesArray.tmp_menu_link;
				let pageID = findParentIdInPagesArray.tmp_id;
				let pageName = findParentIdInPagesArray.tmp_pane_name;
				let pageTarget = findParentIdInPagesArray.tmp_menu_target;
				let tmp_page_type = findParentIdInPagesArray.tmp_page_type;
				let tmp_page_menu_type_bit = findParentIdInPagesArray.tmp_page_menu_type_bit;

				let departmentDesing = "";
				let admissionDesing = "";
				let activitiesDesing = "";
				let associationsDesing = "";

				if (
					child.children &&
					Array.isArray(child.children) &&
					child.children.length > 0
				) {
					if (tmp_page_menu_type_bit == "department_menu") {
						departmentDesing = $scope.createDepartmentDesign();
						createDynamicHTML += `<li class=" menuItemForActive_${child.id} ">
					<a id="DepartmentDetailsLi" class="menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${departmentDesing}`;
					} else if (tmp_page_menu_type_bit == "department_menu") {
						createDynamicHTML += `<li class="menuItemForActive_${child.id}">
						<a id="menuItem_${child.id}" class="menuItemForActive_${child.id}" href="<?php echo base_url('department' . '/') ?>{{faculty.split('~^~')[1]}}" id="{{faculty.split('~^~')[1].split(' ').join('')}}_{{faculty.split('~^~')[0]}}" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>`;
					} else if (tmp_page_menu_type_bit == "admission_menu") {
						admissionDesing = $scope.createAdmissionDesign();
						createDynamicHTML += `<li class="menuItemForActive_${child.id}">
					<a id="AdmissionDetailsLi" class="menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${admissionDesing}`;
					} else if (tmp_page_menu_type_bit == "activities_menu") {
						activitiesDesing = $scope.createActivitiesDesign();
						createDynamicHTML += `<li class="menuItemForActive_${child.id}">
					<a id="ActivitiesDetailsLi" class="menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
					} else if (tmp_page_menu_type_bit == "associtions_menu") {
						associationsDesing = $scope.createAssociationsDesign();
						createDynamicHTML += `<li class="menuItemForActive_${child.id}">
					<a id="AssociationsDetailsLi" class="menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${associationsDesing}`;
					} else if (tmp_page_menu_type_bit == "teaching_faculty_menu") {
						activitiesDesing = $scope.createFacultiesDesign();
						createDynamicHTML += `<li class="menuItemForActive_${child.id}">
					<a id="TeachingfacultyDetailsLi" class="menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
					} else if (tmp_page_menu_type_bit == "non-teaching-faculty_menu") {
						activitiesDesing = $scope.createNonTeachingFacultiesDesign();
						createDynamicHTML += `<li class="menuItemForActive_${child.id}">
					<a id="TeachingfacultyDetailsLi" class="menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
					} else {
						createDynamicHTML += `<li class="menuItemForActive_${child.id}">
						<a id="menuItem_${child.id}" class="menuItemForActive_${child.id}" href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>`;
					}
					createDynamicHTML += `<ul class="" id="menuItemOl_${child.id}">`;
					isInner = isInner + 1;
					$scope.generateMenuHTML(child.children);
				} else {
					if (tmp_page_menu_type_bit == "department_menu") {
						departmentDesing = $scope.createDepartmentDesign();
						createDynamicHTML += `<li class="menuItemForActive_${child.id}">
					<a id="DepartmentDetailsLi" class="menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>${departmentDesing}`;
					} else if (tmp_page_menu_type_bit == "department_menu") {
						createDynamicHTML += `<li class="menuItemForActive_${child.id}">
						<a id="menuItem_${child.id}" class=" menuItemForActive_${child.id} " href="<?php echo base_url('department' . '/') ?>{{faculty.split('~^~')[1]}}" id="{{faculty.split('~^~')[1].split(' ').join('')}}_{{faculty.split('~^~')[0]}}" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" >${pageName}</a>`;
					} else if (tmp_page_menu_type_bit == "admission_menu") {
						admissionDesing = $scope.createAdmissionDesign();
						createDynamicHTML += `<li class="menuItemForActive_${child.id}">
					<a id="AdmissionDetailsLi" class="menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${admissionDesing}`;
					} else if (tmp_page_menu_type_bit == "activities_menu") {
						activitiesDesing = $scope.createActivitiesDesign();
						createDynamicHTML += `<li class="menuItemForActive_${child.id}">
					<a id="ActivitiesDetailsLi" class="menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
					} else if (tmp_page_menu_type_bit == "associtions_menu") {
						associationsDesing = $scope.createAssociationsDesign();
						createDynamicHTML += `<li class="menuItemForActive_${child.id} ">
					<a id="AssociationsDetailsLi" class="menuItemForActive_${child.id} " href="${base_url_website}associations" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${associationsDesing}`;
					} else if (tmp_page_menu_type_bit == "teaching_faculty_menu") {
						activitiesDesing = $scope.createFacultiesDesign();
						createDynamicHTML += `<li class="menuItemForActive_${child.id}">
					<a id="TeachingfacultyDetailsLi" class="menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
					} else if (tmp_page_menu_type_bit == "non-teaching-faculty_menu") {
						activitiesDesing = $scope.createNonTeachingFacultiesDesign();
						createDynamicHTML += `<li class="menuItemForActive_${child.id}">
					<a id="TeachingfacultyDetailsLi" class="menuItemForActive_${child.id} " href="#" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>${activitiesDesing}`;
					} else {
						createDynamicHTML += `<li class="menuItemForActive_${child.id}">
						<a id="menuItem_${child.id}" class=" menuItemForActive_${child.id} " href="${base_url_website}${pageLink}" pageName="${pageName}" pageLink="${pageLink}" pageTarget="${pageTarget}" pageID="${child.id}" tmp_page_type="${tmp_page_type}" ng-click="onMenuClick($event)">${pageName}</a>`;
					}
					createDynamicHTML += `</li>`;
				}
			}
		}
		if (isInner != 0) {
			if (isInner > 0) {
				createDynamicHTML += `</li></ul>`;
				isInner--;
			}
		} else {
			createDynamicHTML += `</ul>`;
		}
	};

	$scope.onMenuClick = function (event) {
		var target = angular.element(event.target);
		let pageLink = target.attr("pageLink");
		let pageID = target.attr("pageID");
		let pageTarget = target.attr("pageTarget");
		let pageType = target.attr("tmp_page_type");

		if (pageType == "custom_link") {
			// Prevent default behavior of the link
			event.preventDefault();
			// Open custom links in new window/tab
			window.open(pageLink, "_blank");
		} else {
			// Handle other types of links
			if (pageLink && pageLink !== "null") {
				if (pageTarget == "same_window") {
					window.open(base_url + pageLink, "_self");
				} else {
					window.open(base_url + pageLink, "_blank");
				}
			}
		}
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

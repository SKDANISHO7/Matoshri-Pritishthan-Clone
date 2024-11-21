var csrfloginHash = $("#csrfloginHash").val();

app.controller("teachingFacultyServicesCtrl", function ($scope, $http, toastr, $location) {
	setTimeout(() => {
		$("#FacultyDetailsLi").addClass("active");
		$(
			"#" +
			localStorage.getItem("sm_stream_name").split(" ").join("") +
			"_" +
			localStorage.getItem("sm_id")
		).addClass("active");
		$("#" + localStorage.getItem("DepartmentLiId")).addClass("active");
	}, 500);
	$scope.teachingFacultyListInit = function () {

		$scope.parameters = $location;
		$scope.url = $scope.parameters.absUrl();
		$scope.facultyUrl = $scope.url.split("/");
		$scope.facultyDepartmentId = $scope.facultyUrl[$scope.facultyUrl.length - 2];

		$scope.base_url = base_url;
		$scope.facultyListArray = [];
		$scope.nonTeachingFacultyListArray = [];
		$scope.TeachingFacultyListArray = [];
		$scope.dataArray = [];
		$scope.facultyDeptListArray = [];
		$scope.getDepartments();
		$scope.getFaculty();
	};

	// Get all Departments List Service
	$scope.getDepartments = function () {
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
					$scope.departmentListArray = response.data.data;
				} else {
					toastr.error(response.data.status.message);
				}
			});
	};

	// Get all Faculty List Service
	$scope.getFaculty = function () {
		var transform = function (data) {
			return $.param(data);
		};
		$http
			.post(
				window.site_url + "FrontEndAPI/getFacultyStream",
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
					$scope.facultyListArray = response.data.data;

					$scope.TeachingFacultyListArray = response.data.data.filter(
						(key) => key.tu_teaching_or_non_teaching === "Teaching" && key.sm_id === $scope.facultyDepartmentId
					);
				} else {
					toastr.error(response.data.status.message);
				}
			});
	};

	$scope.getSectionsWithContent = (faculty) => {
		localStorage.setItem("facultyDetails", JSON.stringify(faculty));
		window.location.href = window.site_url + `faculty-details`;
	};

	$scope.TeachingfacultyLinkClick = async (departmentObj) => {

		localStorage.setItem("sm_id", departmentObj.sm_id);
		localStorage.setItem("sm_stream_name", departmentObj.sm_stream_name);

		$scope.smId = departmentObj.sm_id;
		$scope.singlePageName = departmentObj.sm_stream_name;
		$scope.pageUrl = $scope.singlePageName.split(" ").join("-").toLowerCase();
		$scope.pageName = $scope.pageUrl.split("&").join("");

		window.open(
			base_url + "teaching-faculty/" + $scope.smId + "/" + $scope.pageName,
			"_self"
		);
	};

	$scope.nonTeachingfacultyLinkClick = async (departmentObj) => {
		// localStorage.setItem("FacultyLiId",departmentObj.sm_stream_name + "_" + departmentObj.sm_id);
		// $scope.pageName = departmentObj.sm_stream_name;
		localStorage.setItem("sm_id", departmentObj.sm_id);
		localStorage.setItem("sm_stream_name", departmentObj.sm_stream_name);
		// localStorage.setItem("FacultyDetailsLi", activitiesObj);

		$scope.smId = departmentObj.sm_id;
		$scope.singlePageName = departmentObj.sm_stream_name;
		$scope.pageUrl = $scope.singlePageName.split(" ").join("-").toLowerCase();
		$scope.pageName = $scope.pageUrl.split("&").join("");

		window.open(
			base_url + "non-teaching-faculty/" + $scope.smId + "/" + $scope.pageName,
			"_self"
		);
	};
});

var csrfloginHash = $('#csrfloginHash').val();


app.controller('DeptFacultyServicesCtrl', function ($scope, $http, toastr) {

	$scope.DeptFacultyListInit = function () {
		$scope.base_url = base_url;
		$scope.facultyListArray = [];
		$scope.nonTeachingFacultyListArray = [];
		$scope.getAllnewsCategory();
		$scope.getCategory = [];
		$scope.TeachingFacultyListArray = [];
		$scope.dataArray = [];
		$scope.facultyDeptListArray = [];
		$scope.getFaculty();
	}

	// Get all Departments List Service
	$scope.getFaculty = function () {
		var transform = function (data) {
			return $.param(data);
		}

		// Include the selected department (tu_dsl_id) in the request
		$http.post(window.site_url + 'FrontEndAPI/getFacultyDepartmentWise', {
			inputSearchValue: $scope.inputSearchValue,
			selectedDepartment: $scope.category // Use the selected department (tu_dsl_id) here
		}, {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
			transformRequest: transform
		}).then(function (response) {
			if (response.data.status.status == "200") {
				$scope.facultyListArray = response.data.data;
				console.log('$scope.facultyListArray', $scope.facultyListArray);
			} else {
				toastr.error(response.data.status.message);
			}
		});
	}

	$scope.changeHomeNewCategory = function () {
		if ($scope.category === null) {
			// If no department is selected, show the entire facultyListArray
			$scope.displayedGallery = $scope.facultyListArray;
		} else {
			// Filter the gallery based on the selected department ID
			$scope.filteredGallery = $scope.facultyListArray.filter(function (gallery) {
				return gallery.tu_dsl_id == $scope.category;
			});

			console.log('Selected Category ID:', $scope.category);
			console.log('Filtered Gallery:', $scope.filteredGallery);

			// Update the displayed gallery with the filtered data
			$scope.displayedGallery = $scope.filteredGallery;
		}
	};




	$scope.getSectionsWithContent = (faculty) => {
		localStorage.setItem("facultyDetails", JSON.stringify(faculty));
		window.location.href = window.site_url + `faculty-details`;
	}



	$scope.getAllnewsCategory = function () {
		var transform = function (data) {
			return $.param(data);
		};
		$http
			.post(
				window.site_url + "FrontEndAPI/deptGalleryName",
				{
					inputSearchValue: $scope.inputSearchValue,
				},
				{
					headers: {
						"Content-Type":
							"application/x-www-form-urlencoded; charset=UTF-8",
					},
					transformRequest: transform,
				}
			)
			.then(function (response) {
				if (response.data.status.status == "201") {
					$scope.getCategory = response.data.data;
				} else {
					toastr.error(response.data.status.message);
				}
			});
	};


});

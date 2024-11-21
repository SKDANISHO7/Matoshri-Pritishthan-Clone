var csrfloginHash = $('#csrfloginHash').val();


app.controller('AdminGalleryCategoryServicesCtrl', function ($scope, $http, toastr, $sce, $location) {
	setTimeout(() => {
		$("#ActivitiesDetailsLi").addClass("active");
		$("#" + localStorage.getItem('gallery_name').split(' ').join('') + "_" + localStorage.getItem('gallery_id')).addClass('active');
		$("#" + localStorage.getItem('ActivitiesDetailsLi')).addClass('active');
	}, 500)
	$scope.AdminGalleryCategoryInit = function () {
		$scope.parameters = $location;
		$scope.url = $scope.parameters.absUrl();
		$scope.activitiesPageNameUrl = $scope.url.split("/");
		$scope.activitiesPageName = $scope.activitiesPageNameUrl[$scope.activitiesPageNameUrl.length - 1].split('-');
		// $scope.activitiesUrl = $scope.activitiesPageName.join(' ');
		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}

		$scope.activitiesUrl = $scope.activitiesPageName.map(capitalizeFirstLetter).join(' ');

		$(".breadcrumbTitle").html("Gallery of " + $scope.activitiesUrl);
		$(".breadcrumbPageTitle").html("Gallery of " + $scope.activitiesUrl);
		$scope.activitiesName = localStorage.getItem('gallery_name');
		$scope.activities_id = localStorage.getItem('gallery_id');

		$scope.base_url = base_url;

		$scope.GalleryImagesArr = [];
		$scope.activeYear = '';
		$scope.getAllgalleryListService();
		$scope.base_url = base_url;
	}

	$scope.getAllgalleryListService = () => {

		var transform = function (data) {
			return $.param(data);
		}
		$http.post(window.site_url + 'FrontEndAPI/getGalleryCategories', {

			galleryCategorysUrl: $scope.activitiesUrl,
			galleryCategorysUrlId: $scope.activities_id,
			inputSearchValue: $scope.inputSearchValue,
		}, {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
			transformRequest: transform
		}).then(function (response) {
			if (response.data.status.status == "201") {
				$scope.GalleryImagesArr = response.data.data;
				$scope.activeYear = Object.keys(response.data.data)[0];
				Object.keys($scope.GalleryImagesArr).map((key) => {
					let imgArr = [];

					for (let i = 0; i < $scope.GalleryImagesArr[key].length; i++) {
						let path = $scope.GalleryImagesArr[key][i]["galleryImage"].split("~^~")

						imgArr = [];

						path.map((p) => {
							let pathAndCaption = p.split("~%~");
							imgArr.push({
								imgPath: pathAndCaption[0],
								caption: pathAndCaption[1],
							})
						})
						$scope.GalleryImagesArr[key][i].galleryImage = imgArr;

					}
				});

				$scope.activeYear = Object.keys($scope.GalleryImagesArr)[0];

				// jQuery(".gallery-holder").html5lightbox();
			} else {
				toastr.error(response.data.status.message);
			}
		})
	}

	$scope.isGalleryPresent = () => {
		return Object.keys($scope.GalleryImagesArr).length > 0 ? true : false;
	}

	$scope.changeActiveYear = (year) => {
		$scope.activeYear = year;
	}

});



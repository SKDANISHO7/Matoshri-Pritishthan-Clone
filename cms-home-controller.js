var csrflistHash = $('#csrflistHash').val();


app.filter('unsafe', function ($sce) { return $sce.trustAsHtml; });

app.controller('homeSliderServicesCtrl', function ($scope, $http, toastr) {
	$scope.homeSliderInit = function () {
		$scope.base_url = base_url;
		$scope.pageName = 'Home'
		$scope.activeIndex = 0;
		$scope.sliderArrayList = [];
		$scope.getSliderList();
		// Set an interval for automatic sliding using window.setInterval
        // $scope.intervalPromise = window.setInterval(function () {
        //     $scope.$apply(function () {
        //         $scope.activeIndex = ($scope.activeIndex + 1) % $scope.sliderArrayList.length;
        //     });
        // }, 5000); // Change 5000 to the desired interval in milliseconds

	}

    $scope.getSliderList = function () {
        var transform = function (data) {
            return $.param(data);
        };
        $http
            .post(
                window.site_url + "Website/getSliderList",
                {
                    pageName: $scope.pageName,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                    transformRequest: transform,
                }
            )
			.then(function (response) {
				if (response.data.status.status == "201") {
					$scope.sliderArrayList = response.data.data;
					
					// Set an interval for automatic sliding using window.setInterval
					$scope.intervalPromise = window.setInterval(function () {
						$('#header-carousel').carousel('next'); // Trigger "next" slide

					}, 5000); // Change 5000 to the desired interval in milliseconds
				} else {
					toastr.error(response.data.status.message);
				}
			});
		
    };

	$scope.setActiveSlide = function (index) {
		$scope.activeIndex = index;
	};
	$scope.$on('$destroy', function () {
        if ($scope.intervalPromise) {
            $interval.cancel($scope.intervalPromise);
        }
    });
});

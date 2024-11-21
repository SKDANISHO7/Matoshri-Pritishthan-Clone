var csrflistHash = $('#csrflistHash').val();

app.controller('eventsListServicesCtrl', function ($scope, $http, toastr) {
	$scope.eventListInit = function () {
		$scope.base_url = base_url;
		$scope.eventListArray = {
			upcomingEvents: [],
			pastEvents: [],
		};
		$scope.getAllEventArray = [];
		$scope.getAllEvents();
		$scope.getAlleventListService();
		$scope.categoryName = "All events";
		$scope.inputSearchValue = '';
		// $scope.seperator = "^%^"
		$scope.eventDetails = null;
		// var eventId = $routeParams.eventId;
	}

	$scope.getAllEvents = function () {
		var transform = function (data) {
			return $.param(data);
		}
		$http.post(window.site_url + 'AdminEvents/getAllEvents', {
			inputSearchValue: $scope.inputSearchValue,
		}, {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
			transformRequest: transform
		}).then(function (response) {
			if (response.data.status.status == "201") {
				$scope.getAllEventArray = response.data.data;
			} else {
				toastr.error(response.data.status.message);
			}
		})
	}

	$scope.getAlleventListService = function () {
		if (document.getElementById('All events')) {
			document.getElementById('All events').classList.add('active');
		}
		if (document.getElementById($scope.categoryName)) {
			document.getElementById($scope.categoryName).classList.remove('active');
		}
		$scope.categoryName = 'All events';
		var transform = function (data) {
			return $.param(data);
		}
		$http.post(window.site_url + 'AdminEvents/getAllEvents', {
			inputSearchValue: $scope.inputSearchValue,
		}, {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
			transformRequest: transform
		}).then(function (response) {
			if (response.data.status.status == "201") {
				$scope.numberOfNews = response.data.data.length;
	
				$scope.eventListArray.upcomingEvents = [];
				$scope.eventListArray.pastEvents = [];
	
				response.data.data.forEach(function (event) {
					let eventObj = {};
					eventObj.evt_id = event.evt_id;
					eventObj.evt_created_date = event.evt_created_date;
					eventObj.evt_title = event.evt_title;
					eventObj.evt_file = event.evt_file;
					eventObj.evt_valid_from = event.evt_valid_from;
					eventObj.evt_valid_till = event.evt_valid_till;
					eventObj.evt_location = event.evt_location;
					eventObj.evt_s_description = event.evt_s_description;
					eventObj.evt_descp_content = event.evt_descp_content;
					eventObj.evt_new_flag = event.evt_new_flag === "1";
					eventObj.isShowEvents = true;
	
					let currentDate = new Date();
					let validFromDate = new Date(event.evt_valid_from);
					let validTillDate = new Date(event.evt_valid_till);
	
					if (event.evt_type === "Upcoming Event" && validTillDate < currentDate && validTillDate === currentDate ) {
						eventObj.isShowEvents = false; 
					}
	
					if (eventObj.isShowEvents) {
						if (event.evt_type === "Upcoming Event") {
							$scope.eventListArray.upcomingEvents.push(eventObj);
						} else if (event.evt_type === "Past Event") {
							$scope.eventListArray.pastEvents.push(eventObj);
						}
					}
				});
			} else {
				toastr.error(response.data.status.message);
			}
		});
	};
	
	
    $scope.getEventDetails = (event) => {
        localStorage.setItem("eventsDetails", JSON.stringify(event));
        window.location.href = window.site_url + `events-details-new`;
    }
	
	
});


app.controller("adminEventsViewAllListServicesCtrl", function ($scope, $http, toastr) {
    $scope.eventViewAllListInit = function () {
        $scope.eventListArray = {
            upcomingEvent: [],
            pastEvent: [],
        };
        $scope.eventCounts = {
            all: 0,
            upcoming: 0,
            past: 0
        };
        $scope.base_url = base_url;
    
        // Inside your Angular controller
$scope.getCategory = [];

        $scope.getAllEventsCategory();
        $scope.getAllEvents();
        $scope.getAlleventListService();
        $scope.inputSearchValue = "";
        $scope.categoryName = "All events";
        $scope.seperator = "^%^";
        
    };

    $scope.changeCategory = function (category) {
        if (document.getElementById("All events")) {
            document.getElementById("All events").classList.remove("active");
        }
        if (document.getElementById(category.evt_type)) {
            document.getElementById(category.evt_type).classList.add("active");
        }
        if (document.getElementById($scope.categoryName)) {
            document.getElementById($scope.categoryName).classList.remove("active");
        }
    
        if (category === 'All events') {
            $scope.categoryName = 'All events';
            $scope.getAllEvents();
        } else {
            $scope.categoryName = category.evt_type;
            $scope.getAlleventListService();
        }
    };
    

    // get category of event
    $scope.getAllEventsCategory = function () {
        var transform = function (data) {
            return $.param(data);
        };
        $http.post(
            window.site_url + "AdminEvents/getAllCategory",
            {
                inputSearchValue: $scope.inputSearchValue,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                transformRequest: transform,
            }
        ).then(function (response) {
            if (response.data.status.status == "201") {
                $scope.getCategory = response.data.data;
            } else {
                toastr.error(response.data.status.message);
            }
        });
    };
    $scope.getAllEvents = function () {
        var transform = function (data) {
            return $.param(data);
        };
        $http.post(
            window.site_url + "AdminEvents/getAllEvents",
            {
                inputSearchValue: $scope.inputSearchValue,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                transformRequest: transform,
            }
        ).then(function (response) {
            if (response.data.status.status == "201") {
                $scope.getAlleventArray = response.data.data;
                $scope.numberOfEvents = $scope.getAlleventArray.length;
                $scope.eventCounts.all = $scope.numberOfEvents;
    
                // Populate eventListArray with all events
                $scope.eventListArray.upcomingEvent = $scope.getAlleventArray;
                $scope.eventListArray.pastEvent = [];
    
                // Reset category name to 'All events'
                $scope.categoryName = "All events";
            } else {
                toastr.error(response.data.status.message);
            }
        });
    };
    
    
    $scope.getAlleventListService = function () {
        
    
        var transform = function (data) {
            return $.param(data);
        };
        $http.post(
            window.site_url + "AdminEvents/getAllEvents",
            {
                inputSearchValue: $scope.inputSearchValue,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                transformRequest: transform,
            }
        ).then(function (response) {
            if (response.data.status.status == "201") {
                $scope.numberOfEvents = response.data.data.length;
                $scope.eventCounts.all = response.data.data.length;
                $scope.eventCounts.upcoming = $scope.eventListArray.upcomingEvent.length;
                $scope.eventCounts.past = $scope.eventListArray.pastEvent.length;
                // Clear existing event lists
                $scope.eventListArray.upcomingEvent = [];
                $scope.eventListArray.pastEvent = [];
    
                response.data.data.map((event) => {
                    let eventObj = {};
                    eventObj.evt_id = event.evt_id;
                    eventObj.eventCategory = event.eventCategory;
                    eventObj.evt_created_date = event.evt_created_date;
                    eventObj.evt_title = event.evt_title;
                    eventObj.evt_s_description = event.evt_s_description;
                    eventObj.evt_valid_from = event.evt_valid_from;
                    eventObj.evt_valid_till = event.evt_valid_till;
                    eventObj.evt_file = event.evt_file;
                    eventObj.evt_location = event.evt_location;
                    eventObj.evt_descp_content = event.evt_descp_content;
                    eventObj.evt_new_flag = event.evt_new_flag === "1" ? true : false;
                    eventObj.isShowEvents = true;
    
                 
                if ($scope.categoryName === "All events" || event.evt_type === $scope.categoryName) {
                    $scope.eventListArray.upcomingEvent.push(eventObj);
                }
                if ($scope.categoryName === "Past Event" && event.evt_type === "Past Event") {
                    $scope.eventListArray.pastEvent.push(eventObj);
                }
                });
                $scope.eventCounts.all = response.data.data.length;
                $scope.eventCounts.upcoming = $scope.eventListArray.upcomingEvent.length;
                $scope.eventCounts.past = $scope.eventListArray.pastEvent.length;
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


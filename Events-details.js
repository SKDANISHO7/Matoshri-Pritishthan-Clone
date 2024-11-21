var csrfloginHash = $('#csrfloginHash').val();


app.controller('EventsDetailsServicesCtrl', function ($scope, $http, toastr) {
    setTimeout(() => {
        // $("#DepartmentDetailsLi").addClass("active");
        // $("#" + localStorage.getItem('Faculty_Department_Name').split(' ').join('') + "_" + localStorage.getItem('Faculty_dsl_id')).addClass('active');
        $("#" + localStorage.getItem('EventLiId')).addClass('active');
    }, 500)
    $scope.EventsDetailsListInit = function () {
        $scope.base_url = base_url;
        $scope.eventListArray = [];
        let getPastEventDetails = JSON.parse(localStorage.getItem('eventsDetails'));
        // $scope.EventId = getPastEventDetails.evt_id;
        $scope.EventTitle = getPastEventDetails.evt_title;
        $scope.EventImage = getPastEventDetails.evt_file;
        $scope.EventDescription = getPastEventDetails.evt_s_description;
        $scope.EventType = getPastEventDetails.evt_type;
       
        setTimeout(() => {
            $scope.getEventDetails(getPastEventDetails.evt_id);
        }, 400);
    }


 
    $scope.getEventDetails = (event) => {
        var transform = function (data) {
            return $.param(data);
        }
        $http.post(window.site_url + 'FrontEndAPI/getPastEventDetails', {
            evt_id:event,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            
            if (response.data.status.status == "200") {
                $scope.eventListArray = response.data.data;
                console.log($scope.eventListArray,'$scope.eventListArray')
                
            } else {
                toastr.error(response.data.status.message);
            }
        })
    }

    

});
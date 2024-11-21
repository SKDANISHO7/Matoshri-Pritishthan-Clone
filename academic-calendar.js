var csrflistHash = $('#csrflistHash').val();
app.controller('academicCalendarServicesCtrl', function ($scope, $http, toastr) {
    
    $('#calendarNew').fullCalendar('removeEvents'); 
    $scope.academicCalendarInit = function () {
        $scope.calendar = '';
        $(document).ready(function () {
            $scope.calendar = $('#calendarNew').fullCalendar({
                height: 650,
                eventTextColor: '#000000',
                editable: false,
                eventStartEditable: false,
                disableDragging: false,
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                events: window.site_url + 'AcademicCalendar/load',
                select: function (start, end, allDay) {
                    $scope.start = $.fullCalendar.formatDate(start, "Y-MM-DD HH:mm:ss");
                    $scope.end = $.fullCalendar.formatDate(end, "Y-MM-DD HH:mm:ss");
                    $('#addEvent').modal("show");
                }, 
            });
        });
    }

    $scope.academicCalendarInitHome = function () {
        $scope.calendarHome = '';
        $(document).ready(function () {
            $scope.calendarHome = $('#calendarHome').fullCalendar({
                defaultView: 'listWeek',
                height: 246,
                editable: false,
                eventStartEditable: false,
                disableDragging: false,
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: ''
                },
                events: window.site_url + 'AcademicCalendar/load',
                select: function (start, end, allDay) {
                    $scope.start = $.fullCalendar.formatDate(start, "Y-MM-DD HH:mm:ss");
                    $scope.end = $.fullCalendar.formatDate(end, "Y-MM-DD HH:mm:ss");
                    $('#addEvent').modal("show");
                },
                
            });
        });
    }
});





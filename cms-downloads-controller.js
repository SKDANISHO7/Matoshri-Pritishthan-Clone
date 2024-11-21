var csrflistHash = $('#csrflistHash').val();


app.controller('adminDownloadsListServicesCtrl', function ($scope, $http, toastr) {
    $scope.downloadsListInit = function () {
        $scope.downloadsistArray = {
            dwonloadFiles: [],
            importantNotices: [],
        };
        $scope.getAllDownloadListService();
        $scope.inputSearchValue = '';

        $scope.seperator = "^%^"
    }

    // get all download and filter them according to download and circular/important notices
    $scope.getAllDownloadListService = function () {

        var transform = function (data) {
            return $.param(data);
        }
        $http.post(window.site_url + 'FrontEndAPI/getDownloadList', {
            inputSearchValue: $scope.inputSearchValue,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "201") {
				console.log('response.data.data',response.data.data);
                response.data.data.map((download) => {
                    let downloadObj = {}
                    let linkInfo = []

                    downloadObj.dwd_id = download.dwd_id;
                    downloadObj.dwd_title = download.dwd_title;
                    downloadObj.dwd_new_flag = download.dwd_new_flag === "1" ? true : false;
                    downloadObj.isShowDownloads = true;

                    if (download.dwd_target === "new") {
                        downloadObj.dwd_target = "_blank";
                    }
                    else if (download.dwd_target === "same") {
                        downloadObj.dwd_target = "_self";
                    }

                    if (download.dwd_link) {
                        linkInfo = download.dwd_link.split($scope.seperator);
                        downloadObj.dwd_link = {
                            actualLink: linkInfo[0],
                            linkOrPath: linkInfo[1],
                        }
                    }
                    else {
                        downloadObj.isShowDownloads = false;
                    }


                    let currentDateWithZeroHours = new Date()
                    currentDateWithZeroHours.setHours(0, 0, 0, 0);
                    let validFromDate, validTillDate;



                    if (downloadObj.isShowDownloads) {
                        if (download.dwd_type === "") {
                            $scope.downloadsistArray.dwonloadFiles.push(downloadObj);
                        }
                    }
                })

            } else {
                toastr.error(response.data.status.message);
            }
        })
    }
});

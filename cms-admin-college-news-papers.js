var csrfloginHash = $('#csrfloginHash').val();


app.controller('AdminNewsPapersGalleryServicesCtrl', function ($scope, $http, toastr) {
    $scope.AdminNewsPapersGalleryInit = function () {
        $scope.NewsPapersGalleryImagesArr = [];
        $scope.activeYear = '';
        $scope.getAllNewsPapersgalleryListService();
        $scope.base_url = base_url;
    }

    $scope.getAllNewsPapersgalleryListService = () => {
        
        var transform = function (data) {
            return $.param(data);
        }
        $http.post(window.site_url + 'FrontEndAPI/getNewsPapersGallery', {
            inputSearchValue: $scope.inputSearchValue,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "201") {
                $scope.NewsPapersGalleryImagesArr = response.data.data;
                $scope.activeYear = Object.keys(response.data.data)[0];
                Object.keys($scope.NewsPapersGalleryImagesArr).map((key) => {
                    let imgArr = [];
        
                    for (let i = 0; i < $scope.NewsPapersGalleryImagesArr[key].length; i++) {
                        let path = $scope.NewsPapersGalleryImagesArr[key][i]["galleryImage"].split("~^~")
        
                        imgArr = [];
        
                        path.map((p) => {
                            let pathAndCaption = p.split("~%~");
                            imgArr.push({
                                imgPath: pathAndCaption[0],
                                caption: pathAndCaption[1],
                            })
                        })
                        $scope.NewsPapersGalleryImagesArr[key][i].galleryImage = imgArr;
        
                    }
                });
                
                $scope.activeYear = Object.keys($scope.NewsPapersGalleryImagesArr)[0];
                
                // jQuery(".gallery-holder").html5lightbox();
            } else {
                toastr.error(response.data.status.message);
            }
        })
    }

    $scope.isGalleryPresent = () => {
        return Object.keys($scope.NewsPapersGalleryImagesArr).length > 0 ? true : false;
    }

    $scope.changeActiveYear = (year) => {
        $scope.activeYear = year;
    }

});



var csrfloginHash = $('#csrfloginHash').val();


app.controller('AdminGalleryServicesCtrl', function ($scope, $http, toastr) {
    $scope.AdminGalleryInit = function () {
        $scope.GalleryImagesArr = [];
        $scope.activeYear = '';
        $scope.getAllgalleryListService();
        $scope.base_url = base_url;
    }

    $scope.getAllgalleryListService = () => {
        
        var transform = function (data) {
            return $.param(data);
        }
        $http.post(window.site_url + 'FrontEndAPI/getGallery', {
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



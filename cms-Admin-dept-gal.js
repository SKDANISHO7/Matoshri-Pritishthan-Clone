var csrfloginHash = $('#csrfloginHash').val();


app.controller('AdminDeptGalleryServicesCtrl', function ($scope, $http, toastr) {
    $scope.AdminDeptGalleryInit = function () {
        $scope.GalleryImagesArr = [];
        $scope.getCategory = [];
        $scope.activeYear = '';
        $scope.getAllgalleryListService();
        $scope.getAllnewsCategory();
        $scope.changeActiveYear();
        $scope.base_url = base_url;
    }

    $scope.getAllgalleryListService = () => {

        var transform = function (data) {
            return $.param(data);
        }
        $http.post(window.site_url + 'FrontEndAPI/DeptgetGallery', {
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

    $scope.changeActiveYear = function (year) {
        // Update the active year
        $scope.activeYear = year;

        // Update the displayed gallery based on the selected year and department
        $scope.updateDisplayedGallery();
    };

    $scope.updateDisplayedGallery = function () {
        // Check if a department is selected
        if ($scope.category === "" || !$scope.category) {
            // If no department is selected or category is blank, get all data for the active year
            $scope.displayedGallery = $scope.GalleryImagesArr[$scope.activeYear] || [];
        } else {
            // Check if the gallery array for the active year is defined
            if ($scope.GalleryImagesArr[$scope.activeYear] && Array.isArray($scope.GalleryImagesArr[$scope.activeYear])) {
                // Filter the gallery based on the selected department ID
                $scope.filteredGallery = $scope.GalleryImagesArr[$scope.activeYear].filter(function (gallery) {
                    return gallery.galleryDeptId == $scope.category;
                });

                // Update the displayed gallery with the filtered data
                $scope.displayedGallery = $scope.filteredGallery;
            } else {
                // Handle the case where the gallery array is undefined or not an array
                $scope.displayedGallery = [];
                // You might want to log a message or take additional actions here
            }
        }
    };

    $scope.changeHomeNewCategory = function () {
        console.log('Selected Category ID:', $scope.category);

        // Update the displayed gallery based on the selected year and department
        $scope.updateDisplayedGallery();

        // Your existing logic for handling department category change
        if ($scope.category === "") {
            $scope.getAllnewsListService();
        } else {
            // Filter the gallery based on the selected department ID
            $scope.filteredGallery = $scope.GalleryImagesArr[$scope.activeYear].filter(function (gallery) {
                return gallery.galleryDeptId == $scope.category;
            });

            console.log('Selected Category ID:', $scope.category);
            console.log('Filtered Gallery:', $scope.filteredGallery);

            // Update the displayed gallery with the filtered data
            $scope.displayedGallery = $scope.filteredGallery;
        }
    };



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
                    console.log('$scope.getCategory', $scope.getCategory);
                } else {
                    toastr.error(response.data.status.message);
                }
            });
    };


});



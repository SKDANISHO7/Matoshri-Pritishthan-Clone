var csrflistHash = $('#csrflistHash').val();


app.controller('adminNewsListServicesCtrl', function ($scope, $http, toastr) {
    $scope.newsListInit = function () {
        $scope.newsListArray = {
            newsAndCircular: [],
            importantNotices: [],
        };
        $scope.getCategory = [];
        $scope.getAllNewArray = [];
        $scope.getAllnewsCategory();
        $scope.getAllNews();
        $scope.getAllnewsListService();
        $scope.inputSearchValue = '';
        $scope.categoryName = 'All News';
        $scope.seperator = "^%^"
    }

    $scope.formatDate = function (inputDate) {
		var date = new Date(inputDate);
		var options = { month: 'short', day: 'numeric' };
		return date.toLocaleDateString('en-US', options);
	};

    $scope.changeHomeNewCategory = function (category) {
        if (category == "") {
            $scope.getAllnewsListService();
        } else {
            let category_id = category;
            let newsArrary = $scope.getAllNewArray;

            let newCategoryArray = [];
            $scope.newsListArray.newsAndCircular = [];
            $scope.newsListArray.importantNotices = [];

            newCategoryArray = newsArrary.filter((data) => data.tncl_nws_category_id === category_id);

            $scope.numberOfNews = newCategoryArray.length;
            newCategoryArray.map((news) => {
                let newsObj = {}
                let linkInfo = []

                newsObj.nws_id = news.nws_id;
                newsObj.nws_title = news.nws_title;
				newsObj.tnbt_name = news.tnbt_name;
                newsObj.tncm_category_name_shortcode = news.tncm_category_name_shortcode;
                newsObj.nws_created_date = news.nws_created_date;
                newsObj.nws_new_flag = news.nws_new_flag === "1" ? true : false;
                newsObj.isShowNews = true;

                if (news.nws_target === "new") {
                    newsObj.nws_target = "_blank";
                }
                else if (news.nws_target === "same") {
                    newsObj.nws_target = "_self";
                }

                if (news.nws_link) {
                    linkInfo = news.nws_link.split($scope.seperator);
                    newsObj.nws_link = {
                        actualLink: linkInfo[0],
                        linkOrPath: linkInfo[1],
                    }
                }
                else {
                    newsObj.isShowNews = true;
                }

                let currentDateWithZeroHours = new Date()
                currentDateWithZeroHours.setHours(0, 0, 0, 0);
                let validFromDate, validTillDate;

                // date validation 
                // both date are present
                if (news.nws_valid_from && news.nws_valid_till) {

                    if (news.nws_valid_from == '0000-00-00 00:00:00' && news.nws_valid_till == '0000-00-00 00:00:00') {
                        newsObj.isShowNews = true;
                    } else {
                        validFromDate = new Date(news.nws_valid_from);
                        validTillDate = new Date(news.nws_valid_till);
                        if (validFromDate.getTime() === validTillDate.getTime() && validTillDate.getTime() != currentDateWithZeroHours.getTime()) {
                            newsObj.isShowNews = false;
                        }
                        // if from date > current date or current date > till then don't show news 
                        else if (validFromDate.getTime() > currentDateWithZeroHours.getTime() || currentDateWithZeroHours.getTime() > validTillDate.getTime()) {
                            newsObj.isShowNews = false;
                        }
                    }
                }
                // only from date is present
                else if (news.nws_valid_from && !news.nws_valid_till) {
                    if (news.nws_valid_from == '0000-00-00 00:00:00') {
                        newsObj.isShowNews = true;
                    } else {
                        validFromDate = new Date(news.nws_valid_from);
                        // if from date > current date then don't show news
                        if (validFromDate.getTime() > currentDateWithZeroHours.getTime()) {
                            newsObj.isShowNews = false;
                        }
                    }
                }
                // only till date is present
                else if (!news.nws_valid_from && news.nws_valid_till) {
                    if (news.nws_valid_till == '0000-00-00 00:00:00') {
                        newsObj.isShowNews = true;
                    } else {
                        validTillDate = new Date(news.nws_valid_till);
                        // if till date is less than current date then don't show news
                        if (validTillDate.getTime() < currentDateWithZeroHours.getTime()) {
                            newsObj.isShowNews = false;
                        }
                    }

                }

                if (newsObj.isShowNews) {
                    if (news.nws_type === "News & Circulars") {
                        $scope.newsListArray.newsAndCircular.push(newsObj);
                    }
                    else if (news.nws_type === "Important Notices") {
                        $scope.newsListArray.importantNotices.push(newsObj);
                    }
                }
            })
        }
    }

    $scope.changeCategory = function (category) {

        if (document.getElementById('All News')) {
            document.getElementById('All News').classList.remove('active');
        }
        if (document.getElementById(category.tncm_category_name)) {
            document.getElementById(category.tncm_category_name).classList.add('active');
        }
        if (document.getElementById($scope.categoryName)) {
            document.getElementById($scope.categoryName).classList.remove('active');
        }

        $scope.categoryName = category.tncm_category_name;
        let category_id = category.tncl_nws_category_id;
        let newsArrary = $scope.getAllNewArray;

        let newCategoryArray = [];
        $scope.newsListArray.newsAndCircular = [];
        $scope.newsListArray.importantNotices = [];

        newCategoryArray = newsArrary.filter((data) => data.tncl_nws_category_id === category_id);

        $scope.numberOfNews = newCategoryArray.length;
        newCategoryArray.map((news) => {
            let newsObj = {}
            let linkInfo = []

            newsObj.nws_id = news.nws_id;
            newsObj.nws_title = news.nws_title;
            newsObj.tnbt_name = news.tnbt_name;
            newsObj.tncm_category_name_shortcode = news.tncm_category_name_shortcode;
            newsObj.nws_created_date = news.nws_created_date;
            newsObj.nws_new_flag = news.nws_new_flag === "1" ? true : false;
            newsObj.isShowNews = true;

            if (news.nws_target === "new") {
                newsObj.nws_target = "_blank";
            }
            else if (news.nws_target === "same") {
                newsObj.nws_target = "_self";
            }

            if (news.nws_link) {
                linkInfo = news.nws_link.split($scope.seperator);
                newsObj.nws_link = {
                    actualLink: linkInfo[0],
                    linkOrPath: linkInfo[1],
                }
            }
            else {
                newsObj.isShowNews = true;
            }


            let currentDateWithZeroHours = new Date()
            currentDateWithZeroHours.setHours(0, 0, 0, 0);
            let validFromDate, validTillDate;

            // date validation 
            // both date are present
            if (news.nws_valid_from && news.nws_valid_till) {

                if (news.nws_valid_from == '0000-00-00 00:00:00' && news.nws_valid_till == '0000-00-00 00:00:00') {
                    newsObj.isShowNews = true;
                } else {
                    validFromDate = new Date(news.nws_valid_from);
                    validTillDate = new Date(news.nws_valid_till);
                    if (validFromDate.getTime() === validTillDate.getTime() && validTillDate.getTime() != currentDateWithZeroHours.getTime()) {
                        newsObj.isShowNews = false;
                    }
                    // if from date > current date or current date > till then don't show news 
                    else if (validFromDate.getTime() > currentDateWithZeroHours.getTime() || currentDateWithZeroHours.getTime() > validTillDate.getTime()) {
                        newsObj.isShowNews = false;
                    }
                }
            }
            // only from date is present
            else if (news.nws_valid_from && !news.nws_valid_till) {
                if (news.nws_valid_from == '0000-00-00 00:00:00') {
                    newsObj.isShowNews = true;
                } else {
                    validFromDate = new Date(news.nws_valid_from);
                    // if from date > current date then don't show news
                    if (validFromDate.getTime() > currentDateWithZeroHours.getTime()) {
                        newsObj.isShowNews = false;
                    }
                }
            }
            // only till date is present
            else if (!news.nws_valid_from && news.nws_valid_till) {
                if (news.nws_valid_till == '0000-00-00 00:00:00') {
                    newsObj.isShowNews = true;
                } else {
                    validTillDate = new Date(news.nws_valid_till);
                    // if till date is less than current date then don't show news
                    if (validTillDate.getTime() < currentDateWithZeroHours.getTime()) {
                        newsObj.isShowNews = false;
                    }
                }

            }


            if (newsObj.isShowNews) {
                if (news.nws_type === "News & Circulars") {
                    $scope.newsListArray.newsAndCircular.push(newsObj);
                }
                else if (news.nws_type === "Important Notices") {
                    $scope.newsListArray.importantNotices.push(newsObj);
                }
            }
        })

    }
    // get category of news

    $scope.getAllnewsCategory = function () {
        var transform = function (data) {
            return $.param(data);
        }
        $http.post(window.site_url + 'AdminNewsEdit/getAllCategory', {
            inputSearchValue: $scope.inputSearchValue,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "201") {
                $scope.getCategory = response.data.data;
            } else {
                toastr.error(response.data.status.message);
            }
        })
    }

    $scope.getAllNews = function () {
        var transform = function (data) {
            return $.param(data);
        }
        $http.post(window.site_url + 'AdminNewsEdit/getAllNews', {
            inputSearchValue: $scope.inputSearchValue,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "201") {
                $scope.getAllNewArray = response.data.data;
            } else {
                toastr.error(response.data.status.message);
            }
        })
    }

    // get all news and filter them according to news and circular/important notices
    $scope.getAllnewsListService = function () {
        if (document.getElementById('All News')) {
            document.getElementById('All News').classList.add('active');
        }
        if (document.getElementById($scope.categoryName)) {
            document.getElementById($scope.categoryName).classList.remove('active');
        }
        $scope.categoryName = 'All News';
        var transform = function (data) {
            return $.param(data);
        }
        $http.post(window.site_url + 'FrontEndAPI/getNewsListForWebsite', {
            inputSearchValue: $scope.inputSearchValue,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "201") {
                $scope.numberOfNews = response.data.data.length;

                $scope.newsListArray.newsAndCircular = [];
                $scope.newsListArray.importantNotices = [];

                response.data.data.map((news) => {
                    let newsObj = {}
                    let linkInfo = []

                    newsObj.nws_id = news.nws_id;
                    newsObj.newsCategory = news.newsCategory;
                    newsObj.nws_created_date = news.nws_created_date;
                    newsObj.nws_title = news.nws_title;
                    newsObj.tnbt_name = news.tnbt_name;
                    newsObj.nws_new_flag = news.nws_new_flag === "1" ? true : false;
                    newsObj.isShowNews = true;

                    if (news.nws_target === "new") {
                        newsObj.nws_target = "_blank";
                    }
                    else if (news.nws_target === "same") {
                        newsObj.nws_target = "_self";
                    }

                    if (news.nws_link) {
                        linkInfo = news.nws_link.split($scope.seperator);
                        newsObj.nws_link = {
                            actualLink: linkInfo[0],
                            linkOrPath: linkInfo[1],
                        }
                    }
                    else {
                        newsObj.isShowNews = true;
                    }


                    let currentDateWithZeroHours = new Date()
                    currentDateWithZeroHours.setHours(0, 0, 0, 0);
                    let validFromDate, validTillDate;

                    // date validation 
                    // both date are present
                    if (news.nws_valid_from && news.nws_valid_till) {

                        if (news.nws_valid_from == '0000-00-00 00:00:00' && news.nws_valid_till == '0000-00-00 00:00:00') {
                            newsObj.isShowNews = true;
                        } else {
                            validFromDate = new Date(news.nws_valid_from);
                            validTillDate = new Date(news.nws_valid_till);
                            if (validFromDate.getTime() === validTillDate.getTime() && validTillDate.getTime() != currentDateWithZeroHours.getTime()) {
                                newsObj.isShowNews = false;
                            }
                            // if from date > current date or current date > till then don't show news 
                            else if (validFromDate.getTime() > currentDateWithZeroHours.getTime() || currentDateWithZeroHours.getTime() > validTillDate.getTime()) {
                                newsObj.isShowNews = false;
                            }
                        }
                    }
                    // only from date is present
                    else if (news.nws_valid_from && !news.nws_valid_till) {
                        if (news.nws_valid_from == '0000-00-00 00:00:00') {
                            newsObj.isShowNews = true;
                        } else {
                            validFromDate = new Date(news.nws_valid_from);
                            // if from date > current date then don't show news
                            if (validFromDate.getTime() > currentDateWithZeroHours.getTime()) {
                                newsObj.isShowNews = false;
                            }
                        }
                    }
                    // only till date is present
                    else if (!news.nws_valid_from && news.nws_valid_till) {
                        if (news.nws_valid_till == '0000-00-00 00:00:00') {
                            newsObj.isShowNews = true;
                        } else {
                            validTillDate = new Date(news.nws_valid_till);
                            // if till date is less than current date then don't show news
                            if (validTillDate.getTime() < currentDateWithZeroHours.getTime()) {
                                newsObj.isShowNews = false;
                            }
                        }

                    }


                    if (newsObj.isShowNews) {
                        if (news.nws_type === "News & Circulars") {
                            $scope.newsListArray.newsAndCircular.push(newsObj);
                        }
                        else if (news.nws_type === "Important Notices") {
                            $scope.newsListArray.importantNotices.push(newsObj);
                        }
                    }
                })
            } else {
                toastr.error(response.data.status.message);
            }
        })
    }
});

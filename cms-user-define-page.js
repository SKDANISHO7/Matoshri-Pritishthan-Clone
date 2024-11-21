var csrfloginHash = $("#csrfloginHash").val();

app.filter("unsafe", function ($sce) {
	return $sce.trustAsHtml;
});

app.controller("userDefinePageServicesCtrl", function ($scope, $compile, $http, toastr, $location) {

	$scope.userDefinePageInit = function () {
		$scope.pageId = "";
		let getSplitUrl = window.location.href.split(base_url);
		let getSubURL = getSplitUrl[1].split("/");
		$scope.pageId = getSubURL[1];
		$scope.SectionInformationArray = [];
		$scope.getPageContent();
	};

	$scope.getPageContent = () => {
		var transform = function (data) {
			return $.param(data);
		};
		$http
			.post(
				window.site_url + "WebsiteContentAllPages/getSinglePagesList",
				{
					page_id: $scope.pageId,
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
					if (response.data.data[0]) {
						$scope.SectionInformationArray = response.data.data[0];
						$(".clearActiveClass").removeClass("active");
						if (response.data.data[0].tmp_page_type == "user_defined") {
							setTimeout(() => {
								$(".cmsCustomBreadcrumbPageTitle").html(
									response.data.data[0].tmp_page_title
								);
							}, 200);
						}
						setTimeout(() => {
							$("." + "menuItemForActive_" + $scope.pageId).addClass("active");
							let getAllParentLi = $(
								"." + "menuItemForActive_" + $scope.pageId
							).parents("li");
							for (let i = 0; i < getAllParentLi.length; i++) {
								if ($(getAllParentLi[i]).find("a.dropdown-toggle").attr("id")) {
									$(
										"#" +
										$(getAllParentLi[i]).find("a.dropdown-toggle").attr("id")
									).addClass("active");
								}
							}
						}, 200);
						$("meta[name=description]").remove();
						$("head").append(
							'<meta name="description" content="' +
							response.data.data[0].tmp_meta_description +
							'">'
						);

						if (response.data.data[0].tmp_meta_title) {
							document.title = response.data.data[0].tmp_meta_title;
						} else {
							document.title =
								"Matoshri Pratishthan Group of Institutions - " + response.data.data[0].tmp_page_title;
						}
					}
				} else {
					toastr.error(response.data.status.message);
				}
			});
	};

});

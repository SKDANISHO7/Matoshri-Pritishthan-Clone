var csrfloginHash = $("#csrfloginHash").val();

app.controller("ssrSupportingDocsController", function ($scope, $http, toastr, $location) {
	$scope.ssrSupportDocsInit = () => {

		// Retrieve sy_year from local storage
		var ssrCycleItem = localStorage.getItem("sy_year");

		$scope.parameters = $location;
		$scope.url = $scope.parameters.absUrl();
		$scope.ssrCycleUrl = $scope.url.split("/");
		$scope.SSRName = $scope.ssrCycleUrl[$scope.ssrCycleUrl.length - 1].split('-');
		$scope.SSRNameUrl = $scope.SSRName.join(' ');

		$(".breadcrumbTitle").html("SSR Supporting Documents " + $scope.SSRNameUrl + ' ' + ssrCycleItem);
		$(".breadcrumbPageTitle").html("Department of " + $scope.SSRNameUrl);



		$scope.base_url = window.base_url;
		$scope.ssrSupportingDocs = [];
		$scope.getAllNaacArr();
		$scope.selectedCriteria = 1;
		$scope.allCriteriaAndKeyIndicator = [];
		$scope.allMetricArray = [];
		$scope.filteredPdfArray = [];
		$scope.getAllSupportingDocsOfPerticularYear();
	};

	$scope.getAllNaacArr = () => {
		$http
			.get(window.site_url + "AdminSsr/GetArr", {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				},
			})
			.then(function (response) {
				$scope.allCriteriaAndKeyIndicator = response.data.allSSRCriteria;
				$scope.allMetricArray = response.data.metricCountByKeySSRIndicator;
			});
	}

	$scope.getAllSupportingDocsOfPerticularYear = () => {
		var transform = function (data) {
			return $.param(data);
		};

		let ssr_cycle = localStorage.getItem("ssr_cycle");

		$http
			.post(
				window.site_url + "FrontEndAPI/getSsrSupportingDocument",
				{
					supportingDocCycle: ssr_cycle,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
					transformRequest: transform,
				}
			)
			.then((response) => {
				if (response.data.status.status == 200) {
					$scope.ssrSupportingDocs = response.data.data;
					$scope.filterPdfsAccordingToKeyIndicators();
				}
			});
	};

	$scope.changeSelectedCriteria = (criteriaId) => {
		$scope.selectedCriteria = criteriaId;
		$scope.filterPdfsAccordingToKeyIndicators();
	};

	$scope.filterPdfsAccordingToKeyIndicators = () => {
		let criteriaFilter = $scope.ssrSupportingDocs.filter(
			(pdf) => pdf.ndi_criteria == $scope.selectedCriteria
		);
		$scope.filteredPdfArray = [];
		for (
			let i = 0;
			i <
			$scope.allCriteriaAndKeyIndicator.find(
				(criteria) => criteria.criteriaId == $scope.selectedCriteria
			).keyIndicators.length;
			i++
		) {
			let keyIndicatorFilter = criteriaFilter.filter(
				(pdf) => pdf.ndi_key_indicator == i + 1
			);
			let metricWisePdf = [];
			for (
				let j = 0;
				j <= $scope.allMetricArray[$scope.selectedCriteria - 1][i].metricCount;
				j++
			) {
				let metricFilter = keyIndicatorFilter.filter(
					(pdf) => pdf.ndi_metric == j
				);
				metricWisePdf.push(metricFilter);
			}
			$scope.filteredPdfArray.push(metricWisePdf);
		}
	};

	$scope.copyTextToClipboard = (text) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    };
    
    $scope.copyLinkToClipboard = (link) => {
        $scope.copyTextToClipboard(link);
        $("#copyLinkToClipboard").attr("title", "Copied");
        toastr.success("Weblink copied successfully");
        setTimeout(function () {
            $("#copyLinkToClipboard").attr("title", "Copy Weblink");
        }, 2000);
    };


});

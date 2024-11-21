var csrfloginHash = $("#csrfloginHash").val();

app.controller("dvvSupportingDocsController", function ($scope, $http, toastr, $location) {
	$scope.dvvSupportDocsInit = () => {

		
		$scope.parameters = $location;
        $scope.url = $scope.parameters.absUrl();
        $scope.dvvNameUrl = $scope.url.split("/");
        $scope.dvvName = $scope.dvvNameUrl[$scope.dvvNameUrl.length - 1].split('-');
        $scope.DVVCycleUrl = $scope.dvvName.join(' ');

        $(".breadcrumbTitle").html("DVV Supporting Documents " + $scope.DVVCycleUrl);
        $(".breadcrumbPageTitle").html("Department of " + $scope.DVVCycleUrl);

		$scope.base_url = window.base_url;
		$scope.dvvSupportingDocs = [];
		$scope.selectedCriteria = 1;
		$scope.getAllNaacArr();
		$scope.allCriteriaAndKeyIndicator = [];
		$scope.allMetricArray = [];
		$scope.filteredPdfArray = [];
		$scope.getAllSupportingDocsOfPerticularYear();
	};

	$scope.getAllNaacArr = () =>{
		$http
		.get(window.site_url + "AdminDvv/GetArr", {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			},
		})
		.then(function (response) {
			$scope.allCriteriaAndKeyIndicator = response.data.allDVVCriteria;
			$scope.allMetricArray = response.data.metricCountByKeyDVVIndicator;
		});
	}

	$scope.getAllSupportingDocsOfPerticularYear = () => {
		var transform = function (data) {
			return $.param(data);
		};

		let dvv_cycle = localStorage.getItem("dvv_cycle");

		$http
			.post(
				window.site_url + "FrontEndAPI/getDvvSupportingDocument",
				{
					supportingDocCycle: dvv_cycle,
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
					$scope.dvvSupportingDocs = response.data.data;
					$scope.filterPdfsAccordingToKeyIndicators();
				}
			});
	};

	$scope.changeSelectedCriteria = (criteriaId) => {
		$scope.selectedCriteria = criteriaId;
		$scope.filterPdfsAccordingToKeyIndicators();
	};

	$scope.filterPdfsAccordingToKeyIndicators = () => {
		let criteriaFilter = $scope.dvvSupportingDocs.filter(
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
			let metricCount = $scope.allMetricArray[$scope.selectedCriteria - 1][i]?.metricCount;
			for (
				let j = 0;
				j <= metricCount;
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

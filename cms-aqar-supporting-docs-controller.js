var csrfloginHash = $('#csrfloginHash').val();


app.controller('aqarSupportingDocsController', function ($scope, $http, toastr) {
    $scope.aqarSupportDocsInit = () => {
        $scope.base_url = window.base_url;
        $scope.aqarSupportingDocs = [];
        $scope.selectedCriteria = 1;
		$scope.getAllNaacArr();
		$scope.allCriteriaAndKeyIndicator = [];
        $scope.filteredPdfArray = [];
        $scope.getAllSupportingDocsOfPerticularYear();
    }
	$scope.getAllNaacArr = () =>{
		$http
		.get(window.site_url + "AdminDvv/GetArr", {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			},
		})
		.then(function (response) {
			$scope.allCriteriaAndKeyIndicator = response.data.allCriteria;
			$scope.allMetricArray = response.data.metricCountByKeyIndicator;
		});
	}


    $scope.getAllSupportingDocsOfPerticularYear = () => {
        var transform = function (data) {
            return $.param(data);
        }

        let aqar_year = localStorage.getItem("aqar_year")

        $http.post(window.site_url + 'FrontEndAPI/getSupportingDocument', {
            supportingDocYear: aqar_year,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then((response) => {
            if (response.data.status.status == 200) {
                $scope.aqarSupportingDocs = response.data.data;
                $scope.filterPdfsAccordingToKeyIndicators();
            }
        })
    }

    $scope.changeSelectedCriteria = (criteriaId) => {
        $scope.selectedCriteria = criteriaId;
        $scope.filterPdfsAccordingToKeyIndicators();
    }

    $scope.filterPdfsAccordingToKeyIndicators = () => {
        let criteriaFilter = $scope.aqarSupportingDocs.filter(pdf => pdf.ndi_criteria == $scope.selectedCriteria);
        $scope.filteredPdfArray = [];
        for (let i = 0; i < $scope.allCriteriaAndKeyIndicator.find(criteria => criteria.criteriaId == $scope.selectedCriteria).keyIndicators.length; i++) {
            let keyIndicatorFilter = criteriaFilter.filter(pdf => pdf.ndi_key_indicator == i + 1);
            let metricWisePdf = []
            for (let j = 0; j <= $scope.allMetricArray[$scope.selectedCriteria - 1][i].metricCount; j++) {
                let metricFilter = keyIndicatorFilter.filter(pdf => pdf.ndi_metric == j);
                metricWisePdf.push(metricFilter);
            }
            $scope.filteredPdfArray.push(metricWisePdf);
        }
    }

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

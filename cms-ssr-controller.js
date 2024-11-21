var csrfloginHash = $('#csrfloginHash').val();


app.controller('AdminSsrServiceCtrl', function ($scope, $http, toastr) {

	$scope.AdminSsrInit = function () {
		$scope.base_url = window.base_url;
		$scope.mainsSsrTable = {
			ssrListArray: []
		}
		$scope.getSSRListService();
	}

	// get all supporting docs and ssr docs for all years
	$scope.getSSRListService = async function () {
		var transform = function (data) {
			return $.param(data);
		}
		await $http.post(window.site_url + 'AdminSsr/getSSRList', {
			inputSearchValue: $scope.inputSearchValue,
		}, {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
			transformRequest: transform
		}).then(function (response) {
			if (response.data.status.status == "201") {
				// fetching unique years from response
				const uniqueCycles = response.data.data.map((item) => item.sy_cycle).filter((value, index, self) => self.indexOf(value) === index).sort().reverse();

				let cycleDataArray = [];
				let allPdfInfo = [];
				let criteriaPdfCounts = {
					individualCriteria: [0, 0, 0, 0, 0, 0, 0],
					allTotal: 0
				};
				let supporting = [];
				let ssr = [];

				// get yearwise supporting docs and ssr
				$scope.mainsSsrTable.ssrListArray = uniqueCycles.map((year) => {
					cycleDataArray = response.data.data.filter((data) => data.sy_cycle === year);

					allPdfInfo = [];
					criteriaPdfCounts = {
						individualCriteria: [0, 0, 0, 0, 0, 0, 0],
						allTotal: 0
					}
					supporting = [];
					ssr = [];

					// this array contain 2 records. one is of supporting and other is of ssr
					// Creating objects of supporting document and ssr document
					cycleDataArray.map((cycleData) => {
						if (cycleData.dtm_type === "ssr-supporting") {
							if (cycleData.pdfs) {
								let pdfs = cycleData.pdfs.split("%^%");
								for (let i = 0; i < pdfs.length; i++) {
									let pdfInfo = pdfs[i].split("~^~");
									allPdfInfo.push({
										naac_doc_id: pdfInfo[0],
										criteria_type: pdfInfo[1],
										key_indicator: pdfInfo[2],
										metric: pdfInfo[3],
										pdf_path: pdfInfo[4],
										uploaded_date: pdfInfo[5],
										uploaded_by: pdfInfo[6],
									})
									criteriaPdfCounts.individualCriteria[parseInt(pdfInfo[1]) - 1] += 1;
									criteriaPdfCounts.allTotal += 1;
								}
							}
							supporting = {
								naac_id: cycleData.nydtl_id,
								doc_type: cycleData.dtm_type,
								all_pdf: allPdfInfo,
								criteria_counts: criteriaPdfCounts,
							}
						}
						else if (cycleData.dtm_type === "ssr") {
							let ssrInfo = cycleData.pdfs.split("~^~");
							ssr = {
								doc_type: cycleData.dtm_type,
								naac_id: cycleData.nydtl_id,
								all_pdf: allPdfInfo,
								sy_year: cycleData.sy_year,
								pdf_path: ssrInfo[2] ? ssrInfo[2] : "",
								naac_doc_id: ssrInfo[0]
							}
						}
					});

					return {
						supporting,
						ssr,
						selectYear: year,
					}
				});
			} else {
				// toastr.error(response.data.status.message);
			}
		})
	}

	$scope.supportingDocumentButtonClick = (year, syYear) => {
		console.log('year', year);
		console.log('sy_year', syYear);
		localStorage.setItem("ssr_cycle", year);
		localStorage.setItem("sy_year", syYear);
		
	}



});

var csrfloginHash = $('#csrfloginHash').val();


app.controller('AdminDvvServiceCtrl', function ($scope, $http, toastr) {

    $scope.AdminDvvInit = function () {
        $scope.base_url = window.base_url;
        $scope.mainsDvvTable = {
            dvvListArray: []
        }
        $scope.getDVVListService();
    }

    // get all supporting docs and dvv docs for all years
    $scope.getDVVListService = async function () {
        var transform = function (data) {
            return $.param(data);
        }
        await $http.post(window.site_url + 'AdminDvv/getDVVList', {
            inputSearchValue: $scope.inputSearchValue,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "201") {
                // fetching unique years from response
                const uniqueCycles = response.data.data.map((item) => item.dy_cycle).filter((value, index, self) => self.indexOf(value) === index).sort().reverse();

                let cycleDataArray = [];
                let allPdfInfo = [];
                let criteriaPdfCounts = {
                    individualCriteria: [0, 0, 0, 0, 0, 0, 0],
                    allTotal: 0
                };
                let supporting = [];
                let dvv = [];

                // get yearwise supporting docs and dvv
                $scope.mainsDvvTable.dvvListArray = uniqueCycles.map((year) => {
                    cycleDataArray = response.data.data.filter((data) => data.dy_cycle === year);

                    allPdfInfo = [];
                    criteriaPdfCounts = {
                        individualCriteria: [0, 0, 0, 0, 0, 0, 0],
                        allTotal: 0
                    }
                    supporting = [];
                    dvv = [];

                    // this array contain 2 records. one is of supporting and other is of dvv
                    // Creating objects of supporting document and dvv document
                    cycleDataArray.map((cycleData) => {
                        if (cycleData.dtm_type === "dvv-supporting") {
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
                        else if (cycleData.dtm_type === "dvv") {
                            let dvvInfo = cycleData.pdfs.split("~^~");
                            dvv = {
                                doc_type: cycleData.dtm_type,
                                naac_id: cycleData.nydtl_id,
                                dy_year: cycleData.dy_year,
                                pdf_path: dvvInfo[1] ? dvvInfo[1] : "",
                                naac_doc_id: dvvInfo[0]
                            }
                        }
                    });

                    return {
                        supporting,
                        dvv,
                        selectYear: year,
                    }
                });
            } else {
                // toastr.error(response.data.status.message);
            }
        })
    }

    $scope.supportingDocumentButtonClick = (year) => {
        localStorage.setItem("dvv_cycle", year);
    }


});
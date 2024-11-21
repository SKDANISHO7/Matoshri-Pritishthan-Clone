var csrfloginHash = $('#csrfloginHash').val();


app.controller('AdminNaacServiceCtrl', function ($scope, $http, toastr) {

    $scope.AdminNaacInit = function () {
        $scope.base_url = window.base_url;
        $scope.mainAqarTable = {
            aqarListArray: []
        }
        $scope.getAQARListService();
    }

    // get all supporting docs and aqar docs for all years
    $scope.getAQARListService = async function () {
        var transform = function (data) {
            return $.param(data);
        }
        await $http.post(window.site_url + 'AdminNaac/getAQARList', {
            inputSearchValue: $scope.inputSearchValue,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            transformRequest: transform
        }).then(function (response) {
            if (response.data.status.status == "201") {
                // fetching unique years from response
                const uniqueYears = response.data.data.map((item) => item.ny_year).filter((value, index, self) => self.indexOf(value) === index).sort().reverse();

                let yearDataArray = [];
                let allPdfInfo = [];
                let criteriaPdfCounts = {
                    individualCriteria: [0, 0, 0, 0, 0, 0, 0],
                    allTotal: 0
                };
                let supporting = [];
                let aqar = [];

                // get yearwise supporting docs and aqar
                $scope.mainAqarTable.aqarListArray = uniqueYears.map((year) => {
                    yearDataArray = response.data.data.filter((data) => data.ny_year === year);

                    allPdfInfo = [];
                    criteriaPdfCounts = {
                        individualCriteria: [0, 0, 0, 0, 0, 0, 0],
                        allTotal: 0
                    }
                    supporting = [];
                    aqar = [];

                    // this array contain 2 records. one is of supporting and other is of aqar
                    // Creating objects of supporting document and aqar document
                    yearDataArray.map((yearData) => {
                        if (yearData.dtm_type === "aqar-supporting") {
                            if (yearData.pdfs) {
                                let pdfs = yearData.pdfs.split("%^%");
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
                                naac_id: yearData.nydtl_id,
                                doc_type: yearData.dtm_type,
                                all_pdf: allPdfInfo,
                                criteria_counts: criteriaPdfCounts,
                            }
                        }
                        else if (yearData.dtm_type === "aqar") {
                            let aqarInfo = yearData.pdfs.split("~^~");
                            aqar = {
                                doc_type: yearData.dtm_type,
                                naac_id: yearData.nydtl_id,
                                pdf_path: aqarInfo[1] ? aqarInfo[1] : "",
                                naac_doc_id: aqarInfo[0]
                            }
                        }
                    });

                    return {
                        supporting,
                        aqar,
                        selectYear: year,
                    }
                }); 
            } else {
                // toastr.error(response.data.status.message);
            }
        })
    }

    $scope.supportingDocumentButtonClick = (year) => {
        localStorage.setItem("aqar_year", year);
    }


});
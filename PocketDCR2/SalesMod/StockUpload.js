function pageLoad() {

    var cdt = new Date();
    // var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    var current_mint = cdt.getMinutes();
    var current_hrs = cdt.getHours();
    var current_date = cdt.getDate();

    var current_month = cdt.getMonth() + 1;
    var month_name = monthNames[current_month - 1];
    var current_year = cdt.getFullYear();

    $("#txtdate4").datepicker({
        format: "mm/yyyy",
        startView: "months",
        minViewMode: "months",
        autoclose: true,
        orientation: "bottom" 

    });

    $("#txtdate4").val(month_name + '/' + current_year);

}


function ExcelUpload() {
   
    var files = $("#excelfile_upload")[0].files;
    var newdate = $('#txtdate4').val();

    if (files.length === 0) {
        alert('Please select a file.');
        return;
    }

    var formData = new FormData();
    formData.append('Filedata', files[0]);
    formData.append('Date', newdate);

    var url = '../Handler/SalesDashboardTarget.ashx';
    var queryParams = {
        Type: 'stock',
        insertmonth: newdate
    };
    url += '?' + $.param(queryParams);  // Construct the full URL with query parameters

    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function () {
            $('#loader').show();
        },
        success: function (data, status) {
            if (data === 'extensionError') {
                alert('Please upload an Excel file only.');
                $('#inputFile').val('');
                $('#dialogProgress').jqmHide();
            } else {
                // Construct the URL for the second AJAX call with query parameters
                var secondUrl = '../Handler/SalesDashboardTarget.ashx';
                var secondQueryParams = {
                    Type: 'StockData',
                    FileName: data,
                    PFileName: data,
                    insertmonth: newdate
                };
                secondUrl += '?' + $.param(secondQueryParams);

                // Make the second AJAX call
                $.ajax({
                    url: secondUrl,
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        if (data === 'extensionError') {
                            alert('Please upload an Excel file only.');
                        } else {
                            // Handle success, update UI, or perform other actions
                            location.reload();
                        }
                    },
                    
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Upload error:', error);
            alert('An error occurred during file upload.');
        },
        complete: function () {
            $('#loader').hide();
        }
    });
}



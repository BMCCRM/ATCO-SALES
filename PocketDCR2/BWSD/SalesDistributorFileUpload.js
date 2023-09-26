// Global Variables
var ID = 0;
var myData = "", mode = "", msg = "", jsonObj = "";
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var current_month="",month_name="",current_year="";

// Event
$(document).ready(function () {
    var cdt = new Date();
    current_month = cdt.getMonth();
    month_name    = monthNames[current_month];
    current_year  = cdt.getFullYear();
    date = month_name + '-' + current_year;
    $('#txtDate').val(month_name + '-' + current_year);

    $('#txtDate').datepicker({
        showOn: "focus",
        showMonthAfterYear: false,
        dateFormat: "dd.mm.yy"
    }).datepicker();
    $('#btnInvMonth').click(InvMonth);

});

function pageLoad() {
    GetDataInGrid();    
}

function InvMonth() {

    var cdtt = new Date($('#txtDate').val());
    current_month = cdtt.getMonth();
    month_name = monthNames[current_month];
    current_year = cdtt.getFullYear();
    date = month_name + '-' + current_year;
    $('#txtDate').val(month_name + '-' + current_year);
    GetDataInGrid();
}



function GetDataInGrid() {
    var date = $('#txtDate').val();
    try {
        
        myData = "{'date':'" + date + "'}";

        $.ajax({
            type: "POST",
            url: "../BWSD/SalesDistributorService.asmx/GetAllSalesDistributorByDate",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            success: onSuccessGridFill,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });
    }
    catch (e) {
        alert(e);
    }
}
function onSuccessGridFill(response, data, status) {
 
    if (response.d != 'No') {
        var jsonObj = $.parseJSON(response.d);
        var tablestring = "<table id='datatables' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'><thead>" +
                      "<tr style='background-color: #217ebd;color: white;'>" +
                       "<th > Region  </th>" +
                       "<th > Sub Region</th>" +
                       "<th > District </th>" +
                       "<th > City NDD Code</th>" +
                       "<th > City  </th>" +
                       "<th > Distributor Code </th>" +
                       "<th > Distributor </th>" +
                       "<th > File Uploaded </th>" +
             "</tr></thead>" +
            "<tbody id='values'>";

       $("#divdistrib").empty();
       $("#divdistrib").append(tablestring);
        var apro = '';

        for (var i = 0; i < jsonObj.length ; i++) {
           
          
            $('#values').append($('<tr>' +
              "<td >" + jsonObj[i].RegionName + "</td>" +
              "<td >" + jsonObj[i].SubRegionName + "</td>" +
              "<td >" + jsonObj[i].DistrictName + "</td>" +
              "<td >" + jsonObj[i].City_NDD_Code + "</td>" +
              "<td >" + jsonObj[i].City + "</td>" +
              "<td >" + jsonObj[i].DistributorCode + "</td>" +
              "<td >" + jsonObj[i].DistributorName + "</td>" +
              "<td >" + jsonObj[i].FileUpload + "</td>" +
           "</tr>"));
        }
        
        $("#divdistrib").append('</tbody></table>');
        $('#datatables').DataTable();
    }
    else {
        var tablestring = "<table id='datatables' class='column-options' ><thead>" +
                           "<tr >" +
                           "<th > Region  </th>" +
                           "<th > Sub Region</th>" +
                           "<th > District </th>" +
                           "<th > City NDD Code</th>" +
                           "<th > City  </th>" +
                           "<th > Distributor Code </th>" +
                           "<th > Distributor </th>" +
                           "<th > File Uploaded </th>" +
                           "</tr></thead>" +
                           "<tbody id='values'>";
        $("#divdistrib").empty();
        $("#divdistrib").append(tablestring);
        $("<div title='Alert'>Not Found.</div>").dialog();
    }

}

function ajaxCompleted() {
    $('#dialog').hide();
}
function onError(request, status, error) {
  
  
    toastr.info(error, 'Alert', {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-center",
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    });
}
function startingAjax() {
   
    $('#dialog').show();
}

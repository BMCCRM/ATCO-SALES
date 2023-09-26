
var PKIDd = [];
var IDD = 0;
var rowID = 0;

var MapPKID = [];

var MapProducID = [];
excelfile_upload
var commentViewDetail = '';
var FK_FiledIDViewDetail = '';
var MonthViewDetail = '';
var YearViewDetail = '';
var SuspectViewDetail = '';
var DistributorViewDetail = '';
var ProductPKID = [];
var porductdd = '';
var UploadedCustomerPKID = [];
var UploadedCustomerNamePKID = [];
var UploadedCustomerBrickPKID = [];
var UploadedCustomerBrickName = [];
var UploadedCustomer = [];
var UploadedCustomerDistID = [];
var UploadedCustomerID = [];
var UploadedCustomerName = [];
var UploadedCustomerBrick = [];
var UploadedBrickName = [];
var UploadedCustPKID = [];
var DSTID = [];
var UploadedBrickPKID = [];
var UploadedMasterBrick = [];

var Code = [];

function pageLoad() {





    $('#overalld').click(getOverallDataList);
    $('#errorfreed').click(getErrorFreeList);
    $('#erroranalysisfile').click(getListCurrentDate);
    $('#erroranalysisfileCustomer').click(getListCurrentDateCust);
    $('#UploadDoneFiles').click(getUploadDoneList);
    $('#FinalInsertInvoice').click(dataId);

    $('#FinalInsertNew').click(getErrorFileFinalInsert);




    GetCurrentUser();
    //FillProduct();
    //$("#txtdate3").datepicker({
    //    format: "mm-yyyy",
    //    startView: "months",
    //    minViewMode: "months"
    //});
   // disableUserControls();

    filltabbutton();

    var cdt = new Date();
    // var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    var current_mint = cdt.getMinutes();
    var current_hrs = cdt.getHours();
    var current_date = cdt.getDate();

    var current_month = cdt.getMonth() + 1;
    var month_name = monthNames[current_month - 1];
    var current_year = cdt.getFullYear();


    //$("#txtdate4").datepicker({
    //    format: "MM yyyy",
    //    startView: "months",
    //    minViewMode: "months",
    //    autoclose: true
    //});

    $("#txtdate4").datepicker({
        format: "mm/yyyy",
        startView: "months",
        minViewMode: "months",
        autoclose: true
    });


    $("#txtdate4").val(month_name + '/' + current_year);

}
function dataId(dat) {
    IDD = dat;
    //getErrorFileFinalInsert();
}

//--------------------------------------Sales Uploader Start--------------------------------------------------//

$(document).ready(function () {
    $('#dialog').hide();
    $('#dialog1').hide();
    var filename = $('#file_upload').val();
    var filena = "";
});

function ExcelUploader() {
    debugger


    //// Get form

    var form = $('#fileForm')[0];

    // Create an FormData object 
    var data = new FormData(form);


    var newdate = $('#txtdate4').val();

    var formData = new FormData();

    var files = $("#excelfile_upload").get(0).files;
    var fileName = $("#excelfile_upload").get(0).files[0].name;
    var today = new Date();
    var selectedMonthYear = today.getFullYear() + '-' + (today.getMonth() + 1);  //$("#txtMYDate").val();


    ///get the file and append it to the FormData object
    formData.append('UploadedFile', $('#excelfile_upload')[0].files[0]);
    formData.append("fileName", fileName);
    formData.append("mydate", selectedMonthYear);







    // Add the uploaded image content to the form data collection
    if (files.length > 0) {

        debugger
        data.append("UploadedFile", files[0]);
        data.append("fileName", fileName);



        $('#dialog').show();

        var fileExt = fileName.split('.')[fileName.split('.').length - 1];

        if (fileExt == "zip") {

            $.ajax({

                type: "POST",
                url: 'ZipSalesUploader.ashx?Type=U' + '&emp=' + EmployeeId + '&filemonthyear=' + newdate,
                data: formData,
                processData: false,
                contentType: false,
                success: function (data, status) {
                    $('#dialog').hide();
                    $("#excelfile_upload").val("");
                    //alert('DONE');
                    // Swal.fire('DONE');
                    Swal.fire('File has been uploaded succesfully in DB. Validation process has started.');
                    //location.reload();
                },
                error: onError,
                //beforeSend: startingAjax,
                //complete: ajaxCompleted,
                async: true,
                cache: false
            });
        }
        else {
            $('#dialog').hide();
            alert("Please Select Zip type allowed");
            $("#excelfile_upload").val("");

        }
    }
    else {
        return false;
    }



}

function GetCurrentUser() {

    $.ajax({
        type: "POST",
        url: "../Form/CommonService.asmx/GetCurrentUser",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUser,
        error: onError,
        cache: false,
        async: false
    });
}
function onSuccessGetCurrentUser(data, status) {

    if (data.d != "") {

        EmployeeId = data.d;
    }

    GetCurrentUserLoginID();
}
function GetCurrentUserLoginID() {

    $.ajax({
        type: "POST",
        url: "../Form/CommonService.asmx/GetCurrentUserLoginID",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUserLoginID,
        error: onError,
        cache: false,
        async: false
    });
}
function onSuccessGetCurrentUserLoginID(data, status) {

    if (data.d != "") {

        CurrentUserLoginId = data.d;
    }

    GetCurrentUserRole(EmployeeId);
}
function GetCurrentUserRole(Empid) {

    $.ajax({
        type: "POST",
        url: "../Form/CommonService.asmx/GetCurrentUserRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUserRole,
        error: onError,
        cache: false,
        async: false
    });
}
function onSuccessGetCurrentUserRole(data, status) {

    if (data.d != "") {
        //jsonObj = jsonParse(data.d);
        CurrentUserRole = data.d;


        modeValue = $('#hdnMode').val();

        if (modeValue == 'EditMode') {

            LoadForEditData();
        }
        else if (modeValue == 'DeleteMode') {

            LoadForDeleteData();
        }
    }

    if (CurrentUserRole == 'rl6' || CurrentUserRole == 'admin') {
        //  $('#EmployeeDropDown').hide();
        //FillBrickGrid(EmployeeId);
    }
    else {
        $('#EmployeeDropDown').show();

    }
}

//--------------------------------------Sales Uploader End--------------------------------------------------//

$(document).ready(function () {
    $('#example1').DataTable();
    $('#example2').DataTable();
    $('#example3').DataTable();
    $('#example4').DataTable();
    $('#example5').DataTable();
    $('#example6').DataTable();
    $('#example7').DataTable();
    $('#example3Cust').DataTable();

});


function filltabbutton() {

    // var date = 'NULL'




    const dateee = new Date();


    let currentDay = String(dateee.getDate()).padStart(2, '0');

    let currentMonth = String(dateee.getMonth() + 1).padStart(2, "0");

    let currentYear = dateee.getFullYear();

    // we will display the date as DD-MM-YYYY 

    let currentDate = `${currentMonth}/${currentDay}/${currentYear}`;


    var distbutorId = 'NULL';

    myData = "{'date':'" + currentDate + "','distbutorId':'" + distbutorId + "' }";
    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/GetOverAllDataList",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: Onsuccessfillbutton,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: function (err) {
            alert(err);
        },
        async: true,
        cache: false
    });
}

function disableUserControls() {
    // Disable user controls here.
    // For example, you can disable all input elements and buttons with jQuery:
    $('input, button,a').prop('disabled', true);
    $('a').removeAttr('href').css('pointer-events', 'none');

}

function enableUserControls() {
    // Enable user controls here.
    // For example, you can enable all input elements and buttons with jQuery:
    $('input, button').prop('disabled', false);
    $('a').attr('href', '#').css('pointer-events', 'auto');



}

function Onsuccessfillbutton(response) {


    if (response.d != '') {

        var jsonObj = $.parseJSON(response.d);

        var tab1 = jsonObj.length - 1;
        //var tab2 = jsonObj.length - 1;

        var TotalCountd = jsonObj[tab1].TotalCount;
        var ProcessCountd = jsonObj[tab1].Process
        var InProcessCountd = jsonObj[tab1].InProcess

        $('#totaldata3').text(TotalCountd);
        $('#totaldata4').text(ProcessCountd);
        $('#totaldata5').text(InProcessCountd);
    }

    else {

        $('#totaldata3').text('0');
        $('#totaldata4').text('0');
        $('#totaldata5').text('0');
    }




    const dateee = new Date();


    let currentDay = String(dateee.getDate()).padStart(2, '0');

    let currentMonth = String(dateee.getMonth() + 1).padStart(2, "0");

    let currentYear = dateee.getFullYear();

    // we will display the date as DD-MM-YYYY 

    let currentDate = `${currentMonth}-${currentDay}-${currentYear}`;
    var distbutorId = 'NULL';

    myData = "{'date':'" + currentDate + "','distbutorId':'" + distbutorId + "' }";

    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/GetErrorFreeFileList",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: function (data) {
            // Check if the data is not null or empty

            if (data.d.length > 0) {

                var jsonObj = $.parseJSON(data.d);

                var tab1 = jsonObj.length - 1;

                var ErrorFreeCountd = jsonObj[tab1].ErrorFree

                $("#totaldata6").text(ErrorFreeCountd);
            } else {
                // Handle the case when the data is null or empty
                $("#totaldata6").text("0"); // Replace "yourButtonId" with the actual ID of your button
            }
        },
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: function (err) {
            alert(err);
        },
        async: true,
        cache: false
    });




    var distbutorId = 'NULL';

    myDataee = "{'date':'" + currentDate + "','distbutorId':'" + distbutorId + "' }";

    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/GetUploadDoneFileList",
        contentType: "application/json; charset=utf-8",
        data: myDataee,
        dataType: "json",
        success: function (data) {

            if (data.d.length > 0) {

                var jsonObj = $.parseJSON(data.d);

                var tab1 = jsonObj.length - 1;
                //var tab2 = jsonObj.length - 1;


                var TotalInserted = jsonObj[tab1].TotalInserted

                $('#totaldata7').text(TotalInserted);

            }
            else {


                $('#totaldata7').text('0');
            }
        },

        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: function (err) {
            alert(err);
        },
        async: true,
        cache: false
    });


    var day = true;

    myDataa = "{'date':'" + currentDate + "','distbutorId':'" + distbutorId + "','today':'" + day + "' }";

    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/GetErrorAnalysisGridList",
        contentType: "application/json; charset=utf-8",
        data: myDataa,
        dataType: "json",
        success: function (dataa) {

            if (dataa.d.length > 0) {

                
                var jsonObj = $.parseJSON(dataa.d);

                var tab1 = jsonObj.length - 1;
                // var tab1 = jsonObj[1];
                //var tab2 = jsonObj.length - 1;

                var filesWithErrors = 0; // Initialize the counter for files with errors

                for (var i = 0; i < jsonObj.length; i++) {
                   

                    var error = parseInt(jsonObj[i].TotalError); // Parse the TotalError value as an integer

                    if (error != 0) {
                        filesWithErrors++;
                    }
                }

                $('#totaldata8').text(filesWithErrors);; //Not setting total number of errors now setting total number of files i.e. rows
            }
            else {


                $('#totaldata8').text('0');
            }
        },

        error: function (err) {
            alert(err);
        },
        async: true,
        cache: false
    });



    var distbutorIdCust = '-1'

    var onday = true;

    myDatae = "{'date':'" + currentDate + "','distbutorId':'" + distbutorIdCust + "','onday':'" + onday + "'} ";

    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/GetErrorAnalysisGridListCust",
        contentType: "application/json; charset=utf-8",
        data: myDatae,
        dataType: "json",
        success: function (data) {

            if (data.d.length > 0 ) {

                var jsonObj = $.parseJSON(data.d);

                var tab1 = jsonObj.length - 1;
                // var tab1 = jsonObj[1];
                //var tab2 = jsonObj.length - 1;
                var errorCount = 0;

                for (var i = 0; i < jsonObj.length; i++) {
                    var error = parseInt(jsonObj[i].TotalError); // Parse the TotalError value as an integer

                    if (error === 0) {
                        errorCount++;
                    }
                }

                //  var TotalError = jsonObj[tab1].TotalError



                $('#totaldata9').text(errorCount);

            }
            else {


                $('#totaldata9').text('0');

            }

           
        },
        //beforeSend: startingAjax,
        //complete: ajaxCompleted,
        //complete: ajaxCompleted,
        error: function (err) {
            alert(err);
        },
        async: true,
        cache: false
    });

}




function DoReloadFunction() {


    //   setTimeout(getOverallDataList, 5 * 60 * 1000);//5 minutes
    setTimeout(getOverallDataList, 2 * 60 * 1000);//2 minutes
   // setTimeout(filltabbutton, 2 * 60 * 1000);//2 minutes
    // setTimeout(getOverallDataList, 5000);//5 Sec
    //setTimeout(getOverallDataList, 5000);

    //setInterval(getOverallDataList, 2 * 60 * 1000);
    console.log("DoReloadFunction working after 2 min");
}
function getOverallDataList() {
    var date = 'NULL'
    var distbutorId = 'NULL';

    myData = "{'date':'" + date + "','distbutorId':'" + distbutorId + "' }";

    //
    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/GetOverAllDataList",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: OnsuccessfillFileGrid,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: function (err) {
            alert(err);
        },
        async: true,
        cache: false
    });
}
function OnsuccessfillFileGrid(response) {


    if (response.d != '') {

        var jsonObj = $.parseJSON(response.d);

        var tab1 = jsonObj.length - 1;
        //var tab2 = jsonObj.length - 1;

        var TotalCountd = jsonObj[tab1].TotalCount;
        var ProcessCountd = jsonObj[tab1].Process
        var InProcessCountd = jsonObj[tab1].InProcess

        $('#totaldata3').text(TotalCountd);
        $('#totaldata4').text(ProcessCountd);
        $('#totaldata5').text(InProcessCountd);


        var tablestring = " <br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +

            "<input type='date' id='txtdate1' class='date-input form-control'/>" +
            "</div>" + "<div class='col-12 col-sm-12 col-md-3'>" +
            "<button type='button' onClick='getOverallDataListByDate();' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" + "</div>" +
            "</div>" +
            "<div class='row mt-3'>" +
            "<div class='col-12'>" +
            "<button type='button' id='totaldata' class='btn btn-primary mr-2'>" +
            "Total Upload Files <span class='badge badge-light'>" + TotalCountd + "</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='successdata' class='btn btn-success mr-2'>" +
            "Successful Upload File <span class='badge badge-light'>" + ProcessCountd + "</span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-danger'>" +
            "In-Process Upload Files <span class='badge badge-light'> " + InProcessCountd + " </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" +
            "</div>" +
            "</div>" +
            "<br/>" + "<table id='example1' class='display' style='width:100%'><thead>" +
            "<tr>" +
            "<th> File Name </th> " +
            "<th> File Path </th> " +
            "<th> File Type </th> " +
            "<th>File Records</th> " +
            "<th> File UploadDate </th> " +
            "<th>File Upload Proccessed</th> " +
            "</tr></thead>" +
            "<tbody id='values1'>";

        $("#overall").empty();
        $("#overall").append(tablestring);

        for (var i = 0; i < tab1; i++) {
            $('#values1').append($('<tr>' +
                "<td>" + jsonObj[i].FileName + "</td>" +
                "<td>" + jsonObj[i].FilePath + "</td>" +
                "<td>" + jsonObj[i].FileType + "</td>" +
                "<td>" + jsonObj[i].FileRecords + "</td>" +
                "<td>" + jsonObj[i].CreateTime + "</td>" +
                "<td id='StausCol" + (i + 1) + "'> </td>" +
                "</tr>"));

            if (jsonObj[i].ProccessStatus == "0" || jsonObj[i].ProccessStatus == "False") {
                $("#StausCol" + (i + 1)).append('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
            }
            else {
                $("#StausCol" + (i + 1)).append('<i class="ti-check"></i>');
            }

        }

        $("#overall").append('</tbody></table>');
        $('#example1').DataTable();
    }
    else {
        var tablestring = "<br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            "<input type='date' id='txtdate1' class='date-input form-control'/>" +
            "</div>" + "<div class='col-12 col-sm-12 col-md-3'>" +
            "<button type='button' onClick='getOverallDataListByDate();' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" + "</div>" +
            "</div>" +
            "<div class='row mt-5'>" +
            "<div class='col-12'>" +
            "<button type='button' id='totaldata' class='btn btn-primary'>" +
            "Total Upload Files <span class='badge badge-light'>0</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='successdata' class='btn btn-success'>" +
            "Successful Upload File <span class='badge badge-light'>0</span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-danger'>" +
            "In-Process Upload Files <span class='badge badge-light'> 0 </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" +
            "</div>" +
            "</div>" +
            "<br/>" + "<table id='example1' class='display' style='width:100%'><thead>" +
            "<tr>" +
            "<th> File Name </th> " +
            "<th> File Path </th> " +
            "<th> File Type </th> " +
            "<th>File Records</th> " +
            "<th> File Upload Date </th> " +
            "<th>File Upload Proccessed</th> " +
            "</tr></thead>" +
            "<tbody id='values1'>";

        $("#overall").empty();
        $("#overall").append(tablestring);
        $('#example1').DataTable();
        // AlertMsg('Data Not Found.');
    }
    DoReloadFunction();
}

function DoReloadFunctionDate() {
    // setTimeout(getOverallDataListByDate, 5 * 60 * 1000);//5 minutes
    setTimeout(getOverallDataListByDate, 2 * 60 * 1000);//2 minutes
    //setTimeout(getOverallDataListByDate,  5000);//5 Sec
    //setInterval(getOverallDataListByDate, 2 * 60 * 1000);

    console.log("DoReloadFunctionDate working after 2 min");
}
function getOverallDataListByDate() {

    //$('#spinner2').show(1000);
    var date = $('#txtdate1').val();
    var distbutorId = '-1';

    if ($('#txtdate1').val() == '' || $('#txtdate1').val() == null || $('#txtdate1').val() == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Date is required',
            //text: 'First select the date then search record',
        });
        return false;
    }

    myData = "{'date':'" + date + "','distbutorId':'" + distbutorId + "' }";

    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/GetOverAllDataListByDate",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: OnsuccessfillFileGridByDate,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: function (err) {
            alert(err);
        },
        async: true,
        cache: false
    });

    // $('#spinner').hide();
}
function OnsuccessfillFileGridByDate(response) {


    if (response.d != '') {

        var jsonObj = $.parseJSON(response.d);
        var tab1 = jsonObj.length - 1;
        //var tab2 = jsonObj.length - 1;

        var TotalCountd = jsonObj[tab1].TotalCount;
        var ProcessCountd = jsonObj[tab1].Process
        var InProcessCountd = jsonObj[tab1].InProcess


        $('#totaldata3').text(TotalCountd);
        $('#totaldata4').text(ProcessCountd);
        $('#totaldata5').text(InProcessCountd);

        var tablestring = " <br/>" + "<div class='row'>" +

            "<div class='col-12 col-sm-12 col-md-5'>" +
            "<input type='date' id='txtdate1' class='date-input form-control'/>" +
            "</div>" + "<div class='col-12 col-sm-12 col-md-3'>" +
            "<button type='button' id='overdated' onClick='getOverallDataListByDate();' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" + "</div>" +
            "</div>" +
            "<div class='row mt-3'>" +
            "<div class='col-12'>" +
            "<button type='button' id='totaldata' class='btn btn-primary mr-2'>" +
            "Total Upload Files <span class='badge badge-light'>" + TotalCountd + "</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='successdata' class='btn btn-success mr-2'>" +
            "Successful Upload File <span class='badge badge-light'>" + ProcessCountd + "</span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-danger'>" +
            "In-Process Upload Files <span class='badge badge-light'> " + InProcessCountd + " </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" +
            "</div>" +
            "</div>" +
            "<br/>" + "<table id='example1' class='display' style='width:100%'><thead>" +
            "<tr>" +
            "<th> File Name </th> " +
            "<th> File Path </th> " +
            "<th> File Type </th> " +
            "<th>File Records</th> " +
            "<th>File Upload Date</th> " +
            "<th>File Upload Proccessed</th> " +

            "</tr></thead>" +
            "<tbody id='values1'>" +
            "<center><div class='spinner-border text-primary'  style='display:none;' id='spinner2'></div></center> ";
        $("#overall").empty();
        $("#overall").append(tablestring);

        for (var i = 0; i < tab1; i++) {
            $('#values1').append($('<tr>' +
                "<td>" + jsonObj[i].FileName + "</td>" +
                "<td>" + jsonObj[i].FilePath + "</td>" +
                "<td>" + jsonObj[i].FileType + "</td>" +
                "<td>" + jsonObj[i].FileRecords + "</td>" +
                "<td>" + jsonObj[i].CreateTime + "</td>" +

                "<td id='StausCol" + (i + 1) + "'> </td>" +
                "</tr>"));

            if (jsonObj[i].ProccessStatus == "0" || jsonObj[i].ProccessStatus == "False") {
                $("#StausCol" + (i + 1)).append('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
            }
            else {
                $("#StausCol" + (i + 1)).append('<i class="ti-check"></i>');
            }

        }

        $("#overall").append('</tbody></table>');
        $('#example1').DataTable();

    }
    else {
        var tablestring = "<br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            "<input type='date' id='date1' class='date-input form-control'/>" +
            "</div>" +
            "<div class='col-12 col-sm-12 col-md-3'>" +
            "<button type='button' id='overdated' onClick='getOverallDataListByDate();' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" +
            "</div>" +
            "</div>" +
            "<div class='row mt-5'>" +
            "<div class='col-12'>" +
            "<button type='button' id='totaldata' class='btn btn-primary'>" +
            "Total Upload Files <span class='badge badge-light'>0</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='successdata' class='btn btn-success'>" +
            "Successful Upload File <span class='badge badge-light'>0</span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-danger'>" +
            "In-Process Upload Files <span class='badge badge-light'> 0 </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" +
            "</div>" +
            "</div>" +
            "<br/>" + "<table id='example1' class='display' style='width:100%'><thead>" +
            "<tr>" +
            "<th> File Name </th> " +
            "<th> File Path </th> " +
            "<th> File Type </th> " +
            "<th>File Records</th> " +
            "<th>File Upload Proccessed</th> " +
            "</tr></thead>" +
            "<tbody id='values1'>";

        $("#overall").empty();
        $("#overall").append(tablestring);
        $('#example1').DataTable();
        // AlertMsg('Data Not Found.');
    }
    DoReloadFunctionDate();

}

function DoReloadFunctionErrorFree() {
    //setTimeout(getErrorFreeList, 5 * 60 * 1000);//5 minutes
    setTimeout(getErrorFreeList, 2 * 60 * 1000);//2 minutes
    // setTimeout(getErrorFreeList,  5000);//5 sec

    console.log("DoReloadFunctionErrorFree working after 2 min");
}

function getErrorFreeList() {
    var date = 'NULL'
    var distbutorId = 'NULL';

    myData = "{'date':'" + date + "','distbutorId':'" + distbutorId + "' }";

    //
    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/GetErrorFreeFileList",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: OnsuccessErrorFreeGrid,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: function (err) {
            alert(err);
        },
        async: true,
        cache: false
    });
}
function OnsuccessErrorFreeGrid(response) {

    
    if (response.d != '') {

        var jsonObj = $.parseJSON(response.d);

        var tab1 = jsonObj.length - 1;
        //var tab2 = jsonObj.length - 1;
        var TotalCountd = jsonObj[tab1].TotalCount;
        var ProcessCountd = jsonObj[tab1].Process
        var InProcessCountd = jsonObj[tab1].InProcess
        var ErrorFreeCountd = jsonObj[tab1].ErrorFree


        $('#totaldata3').text(TotalCountd);
        $('#totaldata4').text(ProcessCountd);
        $('#totaldata5').text(InProcessCountd);

        $("#totaldata6").text(ErrorFreeCountd);

        var tablestring = " <br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            "<input type='date' id='txterrordate' class='date-input form-control'/>" +
            "</div>" + "<div class='col-12 col-sm-12 col-md-3'>" +
            "<button type='button' onClick='getErrorFreeFilesByDate();'  class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" + "</div>" +
            " <div class='col-12 col-sm-12 col-md-2 text-right my-auto'>" +
            "<div class='custom-control custom-checkbox'>" +
            //"<input type='checkbox' class='custom-control-input' id='checkAll' name='example1' />" +
            //"<label class='custom-control-label' for='checkAll'>Check All</label>" +
            "<input style='vertical-align: middle;margin-top: 0px;' type='checkbox' name='checkAll' data-id='" + PKIDd + "' id='checkAll' onClick=\"SelectAllApproveCheckBoxes();\">" +
            "&nbsp;" +
            "<label>Select All for Final Insert</label>" +
            "</div>" +
            "</div>" +
            "<div class='col-12 col-sm-12 col-md-2'>" +
            "<button type='button' onClick='ApproveAll();' class='btn btn-primary'>Submit for Final Insert</button>" +
            "</div>" +
            "</div>" +

            "<div class='row mt-3'>" +
            "<div class='col-12'>" +
            "<button type='button' id='totaldata' class='btn btn-primary mr-2'>" +
            "Total Upload Files <span class='badge badge-light'>" + TotalCountd + "</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='successdata' class='btn btn-secondary mr-2'>" +
            "Total Processed File <span class='badge badge-light'>" + ProcessCountd + "</span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-danger mr-2'>" +
            "Total Inserted File in DB <span class='badge badge-light'> " + InProcessCountd + " </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-success'>" +
            "Total Error Free Files <span class='badge badge-light'> " + ErrorFreeCountd + " </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" +
            "</div>" +
            "</div>" +
            "<br/>" + "<table id='example2' class='display' style='width:100%'><thead>" +
            "<tr>" +
            "<th> File Name </th> " +
            "<th> File Path </th> " +
            "<th> File Type </th> " +
            "<th>File Records</th> " +
            "<th> File Upload Date </th> " +
            "<th>File Upload Proccessed</th> " +
            "<th>Action </th> " +
            "</tr></thead>" +
            "<tbody id='values2'>";

        $("#success").empty();
        $("#success").append(tablestring);

        for (var i = 0; i < tab1; i++) {
            $('#values2').append($('<tr>' +

                "<td>" + jsonObj[i].FileName + "</td>" +
                "<td>" + jsonObj[i].FilePath + "</td>" +
                "<td>" + jsonObj[i].FileType + "</td>" +
                "<td>" + jsonObj[i].FileRecords + "</td>" +
                "<td>" + jsonObj[i].CreateTime + "</td>" +
                "<td id='StausCol2" + (i + 1) + "'> </td>" +
                "<td><div class='custom-control custom-checkbox'><input type='checkbox' class='custom-control-input approveCheckBox' onClick='UnSelectAllApproveCheckBoxes();' data-id='" + jsonObj[i].ID + "' id='customCheck" + (i + 1) + "' name='customCheckAll'/><label class='custom-control-label' for='customCheck" + (i + 1) + "'>Final Insert</label></div></td>" +
                "</tr>"));

            if (jsonObj[i].IsInserted == "0") {
                $("#StausCol2" + (i + 1)).append('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
            }
            else if (jsonObj[i].IsInserted == "1") {
                $("#StausCol2" + (i + 1)).append('<i class="ti-check"></i>');
            }
            else {
                $("#StausCol2" + (i + 1)).append('<i class="ti-reload"></i>');
            }

        }

        $("#success").append('</tbody></table>');
        $('#example2').DataTable();
    }
    else {
        var tablestring = "<br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            "<input type='date' id='txterrordate' class='date-input form-control'/>" +
            "</div>" + "<div class='col-12 col-sm-12 col-md-3'>" +
            "<button type='button' onClick='getErrorFreeFilesByDate();' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" + "</div>" +
            "</div>" +
            "<div class='row mt-5'>" +
            "<div class='col-12'>" +
            "<button type='button' id='totaldata' class='btn btn-primary mr-2'>" +
            "Total Upload Files <span class='badge badge-light'>0</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='successdata' class='btn btn-secondary mr-2'>" +
            "Total Processed File <span class='badge badge-light'>0</span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-danger mr-2'>" +
            "In-Process Upload Files <span class='badge badge-light'> 0 </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" +
            "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-success'>" +
            "Total Error Free Files <span class='badge badge-light'> 0 </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" +
            "</div>" +
            "</div>" +
            "<br/>" + "<table id='example2' class='display' style='width:100%'><thead>" +
            "<tr>" +
            "<th> File Name </th> " +
            "<th> File Path </th> " +
            "<th> File Type </th> " +
            "<th>File Records</th> " +
            "<th> File Upload Date </th> " +
            "<th>File Upload Proccessed</th> " +
            "</tr></thead>" +
            "<tbody id='values2'>";

        $("#success").empty();
        $("#success").append(tablestring);
        $('#example2').DataTable();
        // AlertMsg('Data Not Found.');
    }
    //DoReloadFunctionErrorFree();
}

function DoReloadFunctionErrorFreeDate() {
    //setTimeout(getErrorFreeFilesByDate, 5 * 60 * 1000);//5 minutes
    setTimeout(getErrorFreeFilesByDate, 2 * 60 * 1000);//2 minutes
    // setTimeout(getErrorFreeFilesByDate, 5000);//5 sec

    console.log("DoReloadFunctionErrorFreeDate working after 2 min");
}
function getErrorFreeFilesByDate() {



    var date = $('#txterrordate').val();
    var distbutorId = '-1';

    if ($('#txterrordate').val() == '' || $('#txterrordate').val() == null || $('#txterrordate').val() == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Date is required',
        });
        return false;
    }

    myData = "{'date':'" + date + "','distbutorId':'" + distbutorId + "' }";

    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/GetErrorFreeListByDate",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: OnsuccessErrorFreeFilesByDate,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: function (err) {
            alert(err);
        },
        async: true,
        cache: false
    });


}
function OnsuccessErrorFreeFilesByDate(response) {


    if (response.d != '') {

        var jsonObj = $.parseJSON(response.d);

        var tab1 = jsonObj.length - 1;
        //var tab2 = jsonObj.length - 1;

        var TotalCountd = jsonObj[tab1].TotalCount;
        var ProcessCountd = jsonObj[tab1].Process
        var InProcessCountd = jsonObj[tab1].InProcess
        var ErrorFreeCountd = jsonObj[tab1].ErrorFree

        $('#totaldata3').text(TotalCountd);
        $('#totaldata4').text(ProcessCountd);
        $('#totaldata5').text(InProcessCountd);
        $('#totaldata6').text(ErrorFreeCountd);

        var tablestring = " <br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            "<input type='date' id='txterrordate' class='date-input form-control'/>" +
            "</div>" + "<div class='col-12 col-sm-12 col-md-3'>" +
            "<button type='button' onClick='getErrorFreeFilesByDate();'  class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" + "</div>" +
            " <div class='col-12 col-sm-12 col-md-2 text-right my-auto'>" +
            "<div class='custom-control custom-checkbox'>" +
            "<input style='vertical-align: middle;margin-top: 0px;' type='checkbox' name='checkAll' id='checkAll' onClick=\"SelectAllApproveCheckBoxes();\">" +
            "&nbsp;" +
            "<label>Select All for Final Insert</label>" +
            "</div>" +
            "</div>" +
            "<div class='col-12 col-sm-12 col-md-2'>" +
            "<button type='button' onClick='ApproveAll();' class='btn btn-primary'>Submit for Final Insert</button>" +
            "</div>" +
            "</div>" +

            "<div class='row mt-3'>" +
            "<div class='col-12'>" +
            "<button type='button' id='totaldata' class='btn btn-primary mr-2'>" +
            "Total Upload Files <span class='badge badge-light'>" + TotalCountd + "</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='successdata' class='btn btn-secondary mr-2'>" +
            "Total Processed File <span class='badge badge-light'>" + ProcessCountd + "</span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-danger mr-2'>" +
            "Total Inserted File in DB <span class='badge badge-light'> " + InProcessCountd + " </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-success mr-2'>" +
            "Total Error Free Files <span class='badge badge-light'> " + ErrorFreeCountd + " </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" +
            "</div>" +
            "</div>" +
            "<br/>" + "<table id='example2' class='display' style='width:100%'><thead>" +
            "<tr>" +
            "<th> File Name </th> " +
            "<th> File Path </th> " +
            "<th> File Type </th> " +
            "<th>File Records</th> " +
            "<th> File Upload Date </th> " +
            "<th>File Upload Proccessed</th> " +
            "<th>Action</th> " +
            "</tr></thead>" +
            "<tbody id='values2'>";

        $("#success").empty();
        $("#success").append(tablestring);

        for (var i = 0; i < tab1; i++) {
            $('#values2').append($('<tr>' +
                "<td>" + jsonObj[i].FileName + "</td>" +
                "<td>" + jsonObj[i].FilePath + "</td>" +
                "<td>" + jsonObj[i].FileType + "</td>" +
                "<td>" + jsonObj[i].FileRecords + "</td>" +
                "<td>" + jsonObj[i].CreateTime + "</td>" +
                "<td id='StausCol1" + (i + 1) + "'> </td>" +
                "<td><div class='custom-control custom-checkbox'><input type='checkbox' class='custom-control-input approveCheckBox' onClick='UnSelectAllApproveCheckBoxes();' data-id='" + jsonObj[i].ID + "' id='customCheck" + (i + 1) + "' name='customCheckAll'/><label class='custom-control-label' for='customCheck" + (i + 1) + "'>Final Insert</label></div></td>" +
                "</tr>"));

            if (jsonObj[i].IsInserted == "0") {
                $("#StausCol1" + (i + 1)).append('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
            }
            else if (jsonObj[i].IsInserted == "1") {
                $("#StausCol1" + (i + 1)).append('<i class="ti-check"></i>');
            }
            else {
                $("#StausCol1" + (i + 1)).append('<i class="ti-reload"></i>');
            }

        }

        $("#success").append('</tbody></table>');
        $('#example2').DataTable();
    }
    else {
        var tablestring = "<br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            "<input type='date' id='txterrordate' class='date-input form-control'/>" +
            "</div>" + "<div class='col-12 col-sm-12 col-md-3'>" +
            "<button type='button' onClick='getErrorFreeFilesByDate();'  class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" + "</div>" +
            "</div>" +
            "<div class='row mt-5'>" +
            "<div class='col-12'>" +
            "<button type='button' id='totaldata' class='btn btn-primary mr-2'>" +
            "Total Upload Files <span class='badge badge-light'>0</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='successdata' class='btn btn-secondary mr-2'>" +
            "Total Processed File <span class='badge badge-light'>0</span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-danger mr-2'>" +
            "In-Process Upload Files <span class='badge badge-light'> 0 </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" +
            "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-success'>" +
            "Total Error Free Files <span class='badge badge-light'> 0 </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" +
            "</div>" +
            "</div>" +
            "<br/>" + "<table id='example2' class='display' style='width:100%'><thead>" +
            "<tr>" +
            "<th> File Name </th> " +
            "<th> File Path </th> " +
            "<th> File Type </th> " +
            "<th>File Records</th> " +
            "<th> File Upload Date </th> " +
            "<th>File Upload Proccessed</th> " +
            "</tr></thead>" +
            "<tbody id='values2'>";

        $("#success").empty();
        $("#success").append(tablestring);
        $('#example2').DataTable();
        // AlertMsg('Data Not Found.');
    }
    //DoReloadFunctionErrorFreeDate();
}

function getListCurrentDateCust() {


    $("#spinner3").css("display", "block");

    // var date = 'NULL';
    var distbutorId = '-1';

    //if ($('#txtdate3').val() == '' || $('#txtdate3').val() == null || $('#txtdate3').val() == 0) {
    //    Swal.fire({
    //        icon: 'error',
    //        title: 'Date is required',
    //    });
    //    return false;
    //}



    myData = "{'distbutorId':'" + distbutorId + "' }";//'date':'" + date + "',

    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/GetErrorAnalysisGridListCurrentDateCust",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: OnsuccessfillErrorAnalysisCurrentDateGridCust,
        //beforeSend: startingAjax,
        //complete: ajaxCompleted,
        //complete: ajaxCompleted,
        error: function (err) {
            alert(err);
        },
        async: true,
        cache: false
    });
    // $('#spinner').hide();

}


function OnsuccessfillErrorAnalysisCurrentDateGridCust(response) {


    if (response.d != '') {

        var jsonObj = $.parseJSON(response.d);

        // var tab1 = jsonObj.length - 1;
        //var tab2 = jsonObj.length - 1;

        var tablestring = " <br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            " <input type='date' id='txtdate3Cust' class='date-input form-control'/>" +
            "</div>" +
            "<div class='col-12 col-sm-12 col-md-3'>" +
            // "<button type='button' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" +
            "<button type='button' onclick='getListCust();' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" +
            "</div>" +
            "</div>" +

            "<div class='row mt-5'>" +
            "<div class='col-12'>" +

            "<div class='table-responsive'>" +
            "<table id='example3Cust' class='display' style='width:100%'>" +
            "<thead>" +
            "<tr>" +
            "<th>Distributor Code</th>" +
            "<th>Distributor Name</th>" +
            "<th>Total Errors</th>" +
            "<th>Invoice Month</th>" +
            "<th>Raw Data</th>" +
            "<th>Error Details</th>" +
            "<th></th>" +
            "</tr></thead>" +
            "<tbody id='values3Cust'>";
        $("#errorCust").empty();
        $("#errorCust").append(tablestring);

        for (var i = 0; i < jsonObj.length; i++) {

            $('#values3Cust').append($('<tr>' +
                "<td>" + jsonObj[i].DistributeCode + "</td>" +
                "<td>" + jsonObj[i].DistributorName + "</td>" +
                "<td>" + jsonObj[i].TotalError + "</td>" +
                "<td>" + jsonObj[i].yy + '-' + jsonObj[i].mm + "</td>" +
                "<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModalcus1' title='Raw Data Details!' onClick=\"getRawDetails('" + jsonObj[i].FK_FileId + "');\"><i class='ti-eye'></i></button></td>" +
                "<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModalcus2' data-toggle='tooltip' title='Error Details!' onClick=\"getErrorDetails('" + jsonObj[i].DistributeCode + "','" + jsonObj[i].yy + "','" + jsonObj[i].mm + "','" + jsonObj[i].FK_FileId + "','" + 'CUST' + "');\"><i class='ti-eye'></i></button></td>" +
                //"<td><a href='#' id='FinalInsertInvoice' data-toggle='modal' data-target='#exampleModal' onClick='dataId(" + jsonObj[i].FK_FileId + ")'>Final Insert</a> &nbsp; &nbsp; <a href='#' onClick=getErrorFileRevalidate('" + jsonObj[i].FK_FileId + "');>Revalidation</a></td>" +
                "<td>Customer File</td>" +
                "</tr>"));
        }

        $("#errorCust").append('</tbody></table>');
        $('#example3Cust').DataTable();
        $("#spinner3Cust").hide();
    }
    else {
        var tablestring = "<br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            " <input type='date' id='txtdate3Cust' class='date-input form-control'/>" +
            "</div>" +
            "<div class='col-12 col-sm-12 col-md-3'>" +
            // "<button type='button' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>"+
            "<button type='button' onclick='getListCust();' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" +
            "</div>" +
            "</div>" +

            "<div class='row mt-5'>" +
            "<div class='col-12'>" +
            "<div class='table-responsive'>" +
            "<table id='example3Cust' class='display' style='width:100%'>" +
            "<thead>" +
            "<tr>" +
            "<th>Distributor Code</th>" +
            "<th>Distributor Name</th>" +
            "<th>Total Errors</th>" +
            "<th>Invoice Date</th>" +
            "<th>Raw Data</th>" +
            "<th>Error Details</th>" +
            "<th></th>" +
            "</tr></thead>" +
            "<tbody id='values3Cust'>";

        $("#errorCust").empty();
        $("#errorCust").append(tablestring);
        $('#example3Cust').DataTable();
    }

}

function getListCurrentDate() {


    $("#spinner3").css("display", "block");

    // var date = 'NULL';
    var distbutorId = '-1';

    //if ($('#txtdate3').val() == '' || $('#txtdate3').val() == null || $('#txtdate3').val() == 0) {
    //    Swal.fire({
    //        icon: 'error',
    //        title: 'Date is required',
    //    });
    //    return false;
    //}


    myData = "{'distbutorId':'" + distbutorId + "' }";//'date':'" + date + "',

    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/GetErrorAnalysisGridListCurrentDate",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: OnsuccessfillErrorAnalysisCurrentDateGrid,
        //beforeSend: startingAjax,
        //complete: ajaxCompleted,
        //complete: ajaxCompleted,
        error: function (err) {
            alert(err);
        },
        async: true,
        cache: false
    });
    // $('#spinner').hide();

}

function OnsuccessfillErrorAnalysisCurrentDateGrid(response) {


    if (response.d != '') {

        var jsonObj = $.parseJSON(response.d);

        // var tab1 = jsonObj.length - 1;
        //var tab2 = jsonObj.length - 1;

        var tablestring = " <br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            " <input type='date' id='txtdate3' class='date-input form-control'/>" +
            "</div>" +
            "<div class='col-12 col-sm-12 col-md-3'>" +
            // "<button type='button' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" +
            "<button type='button' onclick='getList();' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" +
            "</div>" +
            "</div>" +

            "<div class='row mt-5'>" +
            "<div class='col-12'>" +

            "<div class='table-responsive'>" +
            "<table id='example3' class='display' style='width:100%'>" +
            "<thead>" +
            "<tr>" +
            "<th>Distributor Code</th>" +
            "<th>Distributor Name</th>" +
            "<th>Total Errors</th>" +
            "<th>Invoice Month</th>" +
            "<th>Raw Data</th>" +
            "<th>Error Details</th>" +
            "<th></th>" +
            "</tr></thead>" +
            "<tbody id='values3'>" +
            "<center><div class='spinner-border text-primary' style='display:none;' id='spinner3'>";
        $("#error").empty();
        $("#error").append(tablestring);

        for (var i = 0; i < jsonObj.length; i++) {

            $('#values3').append($('<tr>' +
                "<td>" + jsonObj[i].DistributeCode + "</td>" +
                "<td>" + jsonObj[i].DistributorName + "</td>" +
                "<td>" + jsonObj[i].TotalError + "</td>" +
                "<td>" + jsonObj[i].yy + '-' + jsonObj[i].mm + "</td>" +
                "<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModalcus1' title='Raw Data Details!' onClick=\"getRawDetails('" + jsonObj[i].FK_FileId + "');\"><i class='ti-eye'></i></button></td>" +
                "<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModalcus2' data-toggle='tooltip' title='Error Details!' onClick=\"getErrorDetails('" + jsonObj[i].DistributeCode + "','" + jsonObj[i].yy + "','" + jsonObj[i].mm + "','" + jsonObj[i].FK_FileId + "','" + 'INV' + "');\"><i class='ti-eye'></i></button></td>" +//'" + jsonObj[i].Date + "',
                "<td><a href='#' id='FinalInsertInvoice' data-toggle='modal' data-target='#exampleModal' onClick='dataId(" + jsonObj[i].FK_FileId + ")'>Final Insert</a> &nbsp; &nbsp; <a href='#' onClick=getErrorFileRevalidate('" + jsonObj[i].FK_FileId + "');>Revalidation</a></td>" +
                "</tr>"));
        }

        $("#error").append('</tbody></table>');
        $('#example3').DataTable();
        $("#spinner3").hide();
    }
    else {
        var tablestring = "<br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            " <input type='date' id='txtdate3' class='date-input form-control'/>" +
            "</div>" +
            "<div class='col-12 col-sm-12 col-md-3'>" +
            // "<button type='button' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>"+
            "<button type='button' onclick='getList();' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" +
            "</div>" +
            "</div>" +

            "<div class='row mt-5'>" +
            "<div class='col-12'>" +
            "<div class='table-responsive'>" +
            "<table id='example3' class='display' style='width:100%'>" +
            "<thead>" +
            "<tr>" +
            "<th>Distributor Code</th>" +
            "<th>Distributor Name</th>" +
            "<th>Total Errors</th>" +
            "<th>Invoice Date</th>" +
            "<th>Raw Data</th>" +
            "<th>Error Details</th>" +
            "<th></th>" +
            "</tr></thead>" +
            "<tbody id='values3'>";

        $("#error").empty();
        $("#error").append(tablestring);
        $('#example3').DataTable();
    }

}
function getListCust() {

    var dateCust = $('#txtdate3Cust').val();
    var distbutorIdCust = '-1'
    if ($('#txtdate3Cust').val() == '' || $('#txtdate3Cust').val() == null || $('#txtdate3Cust').val() == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Date is required',
        });
        return false;
    }

    var onday = false;

    myData = "{'date':'" + dateCust + "','distbutorId':'" + distbutorIdCust + "','onday':'" + onday + "'} ";

    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/GetErrorAnalysisGridListCust",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: OnsuccessfillErrorAnalysisGridCust,
        //beforeSend: startingAjax,
        //complete: ajaxCompleted,
        //complete: ajaxCompleted,
        error: function (err) {
            alert(err);
        },
        async: true,
        cache: false
    });
}

function OnsuccessfillErrorAnalysisGridCust(response) {


    if (response.d != '') {

        var jsonObj = $.parseJSON(response.d);

         var tab1 = jsonObj.length - 1;
        //var tab2 = jsonObj.length - 1;


        var TotalErrors = jsonObj[tab1].TotalError;

        $('#totaldata9').text(TotalErrors);

        var tablestring = " <br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            " <input type='date' id='txtdate3Cust' class='date-input form-control'/>" +
            "</div>" +
            "<div class='col-12 col-sm-12 col-md-3'>" +
            // "<button type='button' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" +
            "<button type='button' onclick='getListCust();' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" +
            "</div>" +
            "</div>" +

            "<div class='row mt-5'>" +
            "<div class='col-12'>" +

            "<div class='table-responsive'>" +
            "<table id='example3Cust' class='display' style='width:100%'>" +
            "<thead>" +
            "<tr>" +
            "<th>Distributor Code</th>" +
            "<th>Distributor Name</th>" +
            "<th>Total Errors</th>" +
            "<th>Invoice Month</th>" +
            "<th>Raw Data</th>" +
            "<th>Error Details</th>" +
            "<th></th>" +
            "</tr></thead>" +
            "<tbody id='values3Cust'>";
        $("#errorCust").empty();
        $("#errorCust").append(tablestring);

        for (var i = 0; i < jsonObj.length; i++) {

            $('#values3Cust').append($('<tr>' +
                "<td>" + jsonObj[i].DistributeCode + "</td>" +
                "<td>" + jsonObj[i].DistributorName + "</td>" +
                "<td>" + jsonObj[i].TotalError + "</td>" +
                "<td>" + jsonObj[i].yy + '-' + jsonObj[i].mm + "</td>" +
                "<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModalcus1' title='Raw Data Details!' onClick=\"getRawDetails('" + jsonObj[i].FK_FileId + "');\"><i class='ti-eye'></i></button></td>" +
                "<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModalcus2' data-toggle='tooltip' title='Error Details!' onClick=\"getErrorDetails('" + jsonObj[i].DistributeCode + "','" + jsonObj[i].yy + "','" + jsonObj[i].mm + "','" + jsonObj[i].FK_FileId + "','" + 'CUST' + "');\"><i class='ti-eye'></i></button></td>" +
                //"<td><a href='#' id='FinalInsertInvoice' data-toggle='modal' data-target='#exampleModal' onClick='dataId(" + jsonObj[i].FK_FileId + ")'>Final Insert</a> &nbsp; &nbsp; <a href='#' onClick=getErrorFileRevalidate('" + jsonObj[i].FK_FileId + "');>Revalidation</a></td>" +
                "<td>Customer File</td>" +
                "</tr>"));
        }

        $("#errorCust").append('</tbody></table>');
        $('#example3Cust').DataTable();
        $("#spinner3Cust").hide();
    }
    else {
        var tablestring = "<br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            " <input type='date' id='txtdate3Cust' class='date-input form-control'/>" +
            "</div>" +
            "<div class='col-12 col-sm-12 col-md-3'>" +
            // "<button type='button' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>"+
            "<button type='button' onclick='getListCust();' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" +
            "</div>" +
            "</div>" +

            "<div class='row mt-5'>" +
            "<div class='col-12'>" +
            "<div class='table-responsive'>" +
            "<table id='example3Cust' class='display' style='width:100%'>" +
            "<thead>" +
            "<tr>" +
            "<th>Distributor Code</th>" +
            "<th>Distributor Name</th>" +
            "<th>Total Errors</th>" +
            "<th>Invoice Date</th>" +
            "<th>Raw Data</th>" +
            "<th>Error Details</th>" +
            "<th></th>" +
            "</tr></thead>" +
            "<tbody id='values3Cust'>";

        $("#errorCust").empty();
        $("#errorCust").append(tablestring);
        $('#example3Cust').DataTable();
    }

}

function getList() {

    

    $("#spinner3").css("display", "block");

    var date = $('#txtdate3').val();
    var distbutorId = '-1'

    if ($('#txtdate3').val() == '' || $('#txtdate3').val() == null || $('#txtdate3').val() == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Date is required',
        });
        return false;
    }


    //var day = false;

    var today = false;

    myData = "{'date':'" + date + "','distbutorId':'" + distbutorId + "','today':'" + today + "' } ";

    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/GetErrorAnalysisGridList",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: OnsuccessfillErrorAnalysisGrid,
        //beforeSend: startingAjax,
        //complete: ajaxCompleted,
        //complete: ajaxCompleted,
        error: function (err) {
            alert(err);
        },
        async: true,
        cache: false
    });
    // $('#spinner').hide();

}

function OnsuccessfillErrorAnalysisGrid(response) {


    if (response.d != '') {
       
        var jsonObj = $.parseJSON(response.d);

         var tab1 = jsonObj.length - 1;
        //var tab2 = jsonObj.length - 1;

        var TotalErrors = jsonObj[tab1].TotalError;

        $('#totaldata8').text(TotalErrors);


        var tablestring = " <br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            " <input type='date' id='txtdate3' class='date-input form-control'/>" +
            "</div>" +
            "<div class='col-12 col-sm-12 col-md-3'>" +
            // "<button type='button' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" +
            "<button type='button' onclick='getList();' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" +
            "</div>" +
            "</div>" +

            "<div class='row mt-5'>" +
            "<div class='col-12'>" +

            "<div class='table-responsive'>" +
            "<table id='example3' class='display' style='width:100%'>" +
            "<thead>" +
            "<tr>" +
            "<th>Distributor Code</th>" +
            "<th>Distributor Name</th>" +
            "<th>Total Errors</th>" +
            "<th>Invoice Month</th>" +
            "<th>Raw Data</th>" +
            "<th>Error Details</th>" +
            "<th></th>" +
            "</tr></thead>" +
            "<tbody id='values3'>";
        $("#error").empty();
        $("#error").append(tablestring);

        for (var i = 0; i < jsonObj.length; i++) {

            $('#values3').append($('<tr>' +
                "<td>" + jsonObj[i].DistributeCode + "</td>" +
                "<td>" + jsonObj[i].DistributorName + "</td>" +
                "<td>" + jsonObj[i].TotalError + "</td>" +
                "<td>" + jsonObj[i].yy + '-' + jsonObj[i].mm + "</td>" +
                "<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModalcus1' title='Raw Data Details!' onClick=\"getRawDetails('" + jsonObj[i].FK_FileId + "');\"><i class='ti-eye'></i></button></td>" +
                "<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModalcus2' data-toggle='tooltip' title='Error Details!' onClick=\"getErrorDetails('" + jsonObj[i].DistributeCode + "','" + jsonObj[i].yy + "','" + jsonObj[i].mm + "','" + jsonObj[i].FK_FileId + "','" + 'INV' + "');\"><i class='ti-eye'></i></button></td>" +//'" + jsonObj[i].Date + "',
                "<td><a href='#' id='FinalInsertInvoice' data-toggle='modal' data-target='#exampleModal' onClick='dataId(" + jsonObj[i].FK_FileId + ")'>Final Insert</a> &nbsp; &nbsp; <a href='#' onClick=getErrorFileRevalidate('" + jsonObj[i].FK_FileId + "');>Revalidation</a></td>" +
                "</tr>"));
        }

        $("#error").append('</tbody></table>');
        $('#example3').DataTable();
        $("#spinner3").hide();
    }
    else {
        var tablestring = "<br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            " <input type='date' id='txtdate3' class='date-input form-control'/>" +
            "</div>" +
            "<div class='col-12 col-sm-12 col-md-3'>" +
            // "<button type='button' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>"+
            "<button type='button' onclick='getList();' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" +
            "</div>" +
            "</div>" +

            "<div class='row mt-5'>" +
            "<div class='col-12'>" +
            "<div class='table-responsive'>" +
            "<table id='example3' class='display' style='width:100%'>" +
            "<thead>" +
            "<tr>" +
            "<th>Distributor Code</th>" +
            "<th>Distributor Name</th>" +
            "<th>Total Errors</th>" +
            "<th>Invoice Date</th>" +
            "<th>Raw Data</th>" +
            "<th>Error Details</th>" +
            "<th></th>" +
            "</tr></thead>" +
            "<tbody id='values3'>";

        $("#error").empty();
        $("#error").append(tablestring);
        $('#example3').DataTable();
    }

}

function getRawDetails(FK_FileId) {

    IDD = FK_FileId;

    $("#spinner").show();
    myData = "{'id':'" + FK_FileId + "' }";

    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/GetRawData",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: OnsuccessRawDetailsGrid,
        beforeSend: startingAjax,
        complete: ajaxCompleted,

        error: function (err) {
            alert(err);
        }
    });
}
function OnsuccessRawDetailsGrid(response) {


    if (response.d != '') {
        var jsonObj = $.parseJSON(response.d);

        var tab1 = jsonObj.length - 1;
        //var tab2 = jsonObj.length - 1;

        var tablestring =
            "<div class='table-responsive'>" +
            "<table id='example4' class='display' style='width:100%'>" +
            "<thead>" +
            "<tr>" +
            "<th>Distribute Code </th> " +
            "<th>Document No </th> " +
            "<th>DOC DATE</th> " +
            "<th>CUST Code</th> " +
            //"<th>CT</th> " +
            "<th>Brick Code</th> " +
            "<th>Product Id</th> " +
            "<th>Product</th> " +
            "<th>BATCH NO</th> " +
            "<th>PRICE</th> " +
            "<th>QUANITITY</th> " +
            "<th>BONUS</th> " +
            "<th>Discount Amount</th> " +
            "<th>Net Amount</th> " +
            "<th>REASON</th> " +


            "</tr></thead>" +
            "<tbody id='values4'>";

        $("#modal1data").empty();
        $("#modal1data").append(tablestring);
        for (var i = 0; i < jsonObj.length; i++) {
            $('#values4').append($('<tr>' +
                "<td>" + jsonObj[i].DistributeCode + "</td>" +
                "<td>" + jsonObj[i].DocumentNo + "</td>" +
                "<td>" + jsonObj[i].DOCDATE + "</td>" +
                "<td>" + jsonObj[i].CUSTCode + "</td>" +
                // "<td>" + jsonObj[i].CT + "</td>" +
                "<td>" + jsonObj[i].BrickCode + "</td>" +
                "<td>" + jsonObj[i].ProductId + "</td>" +
                "<td>" + jsonObj[i].Product + "</td>" +
                "<td>" + jsonObj[i].BATCHNO + "</td>" +
                "<td>" + jsonObj[i].PRICE + "</td>" +
                "<td>" + jsonObj[i].QUANITITY + "</td>" +
                "<td>" + jsonObj[i].BONUS + "</td>" +
                "<td>" + jsonObj[i].DiscountAmount + "</td>" +
                "<td>" + jsonObj[i].NetAmount + "</td>" +
                "<td>" + jsonObj[i].REASON + "</td>" +
                "</tr>"));
        }

        $("#modal1data").append('</tbody></table>');
        $('#example4').DataTable();
    }
    else {
        var tablestring = "<div class='table-responsive'>" +
            "<table id='example4' class='display' style='width:100%'>" +
            "<thead>" +
            "<tr>" +
            "<th> Distribute Code </th> " +
            "<th> Document No </th> " +
            "<th>DOC DATE</th> " +
            "<th>CUST Code</th> " +
            //"<th>CT</th> " +
            "<th>Brick Code</th> " +
            "<th>Product Id</th> " +
            "<th>Product</th> " +
            "<th>BATCH NO</th> " +
            "<th>PRICE</th> " +
            "<th>QUANITITY</th> " +
            "<th>BONUS</th> " +
            "<th>Discount Amount</th> " +
            "<th>Net Amount</th> " +
            "<th>REASON</th> " +
            "</tr></thead>" +
            "<tbody id='values4'>";

        $("#modal1data").empty();
        $("#modal1data").append(tablestring);
        $('#example4').DataTable();
        // AlertMsg('Data Not Found.');
    }

}

function getErrorDetails(DistributeCode, yy, mm, FK_FileId, types) { //Date

    DistributorViewDetail = DistributeCode;
    $("#spinner1").css("display", "block");

    myData = "{'DistributeCode':'" + DistributorViewDetail + "','Year':'" + yy + "','Month':'" + mm + "','id':'" + FK_FileId + "','Type':'" + types + "'}";

    $.ajax({
        type: "POST",

        url: "FileGridList.asmx/GetErrorAnalysisGridListdetail",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: OnsuccessErrorDetailsGrid,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: function (err) {
            alert(err);
        },
        cache: false,
        async: true

    });

}
function OnsuccessErrorDetailsGrid(response) {



    if (response.d != '') {
        // $("#spinner1").show(1000);
        var jsonObj = $.parseJSON(response.d);

        var tab1 = jsonObj.length - 1;
        //var tab2 = jsonObj.length - 1;
        var tablestring =
            "<div class='table-responsive'>" +
            "<table id='example5' class='display' style='width:100%'>" +
            "<thead>" +
            "<tr>" +
            "<th>Distribute Code</th> " +
            "<th>Distributor Name</th> " +
            "<th>File Type</th> " +
            "<th>Comments</th> " +
            "<th>Counts</th> " +
            "<th>View Details</th> " +
            //  "<th>Action</th> " +

            "</tr></thead>" +
            "<tbody id='values5'>";

        $("#modal2data").empty();
        $("#modal2data").append(tablestring);

        for (var i = 0; i < jsonObj.length; i++) {
            $('#values5').append($('<tr>' +
                "<td>" + jsonObj[i].DistributorCode + "</td>" +
                "<td>" + jsonObj[i].DistributorName + "</td>" +
                "<td>" + jsonObj[i].FileType + "</td>" +
                "<td>" + jsonObj[i].Comments + "</td>" +
                "<td>" + jsonObj[i].Counts + "</td>" +
                "<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModalcus3' title='ViewDetails!' onClick=\"getViewDetails('" + jsonObj[i].Comments + "','" + jsonObj[i].FK_FileId + "','" + jsonObj[i].mm + "','" + jsonObj[i].yy + "','" + jsonObj[i].Suspect + "');\">View Details</button></td>" +//<i class='ti-eye'></i>
                // "<td><div class='row'><div class='col-sm-6'><button type='button' class='btn btn-primary' title='Action!' onClick=\"getActionDetails('" + jsonObj[i].DistributorCode + "','" + jsonObj[i].Comments + "','" + jsonObj[i].FK_FileId + "','" + jsonObj[i].Suspect + "','" + jsonObj[i].mm + "','" + jsonObj[i].yy + "');\"><i class='ti-eye'></i></button></div><div class='col-sm-6'><div class='spinner-border text-primary' style='display:none;' id='spinnerAction1'></div></div></div></td>" + //jsonObj[i].InvoiceDate
                "</tr>"));
        }

        $("#modal2data").append('</tbody></table>');
        $('#example5').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },


            buttons: [
                {
                    extend: 'pdf',
                    className: 'btn green btn-outline'
                },
                {
                    extend: 'excel',
                    className: 'btn yellow btn-outline '
                }
            ],


            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    else {
        var tablestring = "<div class='table-responsive'>" +
            "<table id='example4' class='display' style='width:100%'>" +
            "<thead>" +
            "<tr>" +
            "<th>Distribute Code</th> " +
            "<th>Distributor Name</th> " +
            "<th>Comments</th> " +
            "<th>Counts</th> " +
            "<th>View Details</th> " +
            // "<th>Action</th> " +

            "</tr></thead>" +
            "<tbody id='values5'>";

        $("#modal2data").empty();
        $("#modal2data").append(tablestring);
        $('#example5').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },


            buttons: [
                {
                    extend: 'pdf',
                    className: 'btn green btn-outline'
                },
                {
                    extend: 'excel',
                    className: 'btn yellow btn-outline '
                }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
        // AlertMsg('Data Not Found.');
    }
    $("#spinner1").css("display", "none");
}

function DoReloadFunctionDoneFile() {
    //setTimeout(getUploadDoneList, 5 * 60 * 1000);//5 minutes
    setTimeout(getUploadDoneList, 2 * 60 * 1000);//2 minutes
    // setTimeout(getUploadDoneList, 5000);//5 sec
}
function getUploadDoneList() {

    var date = 'NULL'
    var distbutorId = 'NULL';

    myData = "{'date':'" + date + "','distbutorId':'" + distbutorId + "' }";

    //
    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/GetUploadDoneFileList",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: OnsuccessUploadDoneGrid,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: function (err) {
            alert(err);
        },
        async: true,
        cache: false
    });
}
function OnsuccessUploadDoneGrid(response) {

    if (response.d != '') {

        var jsonObj = $.parseJSON(response.d);

        var tab1 = jsonObj.length - 1;
        //var tab2 = jsonObj.length - 1;

        var TotalCountd = jsonObj[tab1].TotalCount;
        var ProcessCountd = jsonObj[tab1].Process
        var InProcessCountd = jsonObj[tab1].InProcess
        var ErrorFreeCountd = jsonObj[tab1].ErrorFree
        var TotalInserted = jsonObj[tab1].TotalInserted


        $('#totaldata3').text(TotalCountd);
        $('#totaldata4').text(ProcessCountd);
        $('#totaldata5').text(InProcessCountd);
        $('#totaldata6').text(ErrorFreeCountd);
        $('#totaldata7').text(TotalInserted);

        var tablestring = " <br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            "<input type='date' id='txterrordate1' class='date-input form-control'/>" +
            "</div>" + "<div class='col-12 col-sm-12 col-md-3'>" +
            "<button type='button' onClick='getUploadFileByDate();'  class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" + "</div></div>" +

            "<div class='row mt-3'>" +
            "<div class='col-12'>" +
            "<button type='button' id='totaldata' class='btn btn-primary mr-2'>" +
            "Total Upload Files <span class='badge badge-light'>" + TotalCountd + "</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='successdata' class='btn btn-secondary mr-2'>" +
            "Total Processed File <span class='badge badge-light'>" + ProcessCountd + "</span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-danger mr-2'>" +
            "Total Inserted File in DB <span class='badge badge-light'> " + InProcessCountd + " </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-success'>" +
            "Total Error Free Files <span class='badge badge-light'> " + ErrorFreeCountd + " </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" +
            "</div>" +
            "</div>" +
            //"</div>" +
            "<br/>" + "<table id='example6' class='display' style='width:100%'><thead>" +
            "<tr>" +
            "<th> File Name </th> " +
            "<th> File Path </th> " +
            "<th> File Type </th> " +
            "<th>File Records</th> " +
            "<th> File Upload Date </th> " +
            "<th>File Upload Proccessed</th> " +

            "</tr></thead>" +
            "<tbody id='values6'>";

        $("#done").empty();
        $("#done").append(tablestring);

        for (var i = 0; i < tab1; i++) {
            $('#values6').append($('<tr>' +
                "<td>" + jsonObj[i].FileName + "</td>" +
                "<td>" + jsonObj[i].FilePath + "</td>" +
                "<td>" + jsonObj[i].FileType + "</td>" +
                "<td>" + jsonObj[i].FileRecords + "</td>" +
                "<td>" + jsonObj[i].CreateTime + "</td>" +
                "<td id='StausCol3" + (i + 1) + "'> </td>" +

                "</tr>"));

            if (jsonObj[i].IsInserted == "1") {
                $("#StausCol3" + (i + 1)).append('<i class="ti-check"></i>');
            }
        }

        $("#done").append('</tbody></table>');
        $('#example6').DataTable();
    }
    else {
        var tablestring = "<br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            "<input type='date' id='txterrordate1' class='date-input form-control'/>" +
            "</div>" + "<div class='col-12 col-sm-12 col-md-3'>" +
            "<button type='button' onClick='getUploadFileByDate();' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" + "</div>" +
            "</div>" +
            "<div class='row mt-5'>" +
            "<div class='col-12'>" +
            "<button type='button' id='totaldata' class='btn btn-primary mr-2'>" +
            "Total Upload Files <span class='badge badge-light'>0</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='successdata' class='btn btn-secondary mr-2'>" +
            "Total Processed File <span class='badge badge-light'>0</span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-danger mr-2'>" +
            "In-Process Upload Files <span class='badge badge-light'> 0 </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" +
            "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-success'>" +
            "Total Error Free Files <span class='badge badge-light'> 0 </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" +
            "</div>" +
            "</div>" +
            "<br/>" + "<table id='example6' class='display' style='width:100%'><thead>" +
            "<tr>" +
            "<th> File Name </th> " +
            "<th> File Path </th> " +
            "<th> File Type </th> " +
            "<th>File Records</th> " +
            "<th> File Upload Date </th> " +
            "<th>File Upload Proccessed</th> " +
            "</tr></thead>" +
            "<tbody id='values6'>";

        $("#done").empty();
        $("#done").append(tablestring);
        $('#example6').DataTable();
        // AlertMsg('Data Not Found.');
    }

    DoReloadFunctionDoneFile();
}

function DoReloadFunctionDoneFileDate() {
    //setTimeout(getUploadFileByDate, 5 * 60 * 1000);//5 minutes
    setTimeout(getUploadFileByDate, 2 * 60 * 1000);//1 minutes
    //  setTimeout(getUploadFileByDate, 5000);//5 sec
}
function getUploadFileByDate() {



    var date = $('#txterrordate1').val();
    var distbutorId = '-1';

    if ($('#txterrordate1').val() == '' || $('#txterrordate1').val() == null || $('#txterrordate1').val() == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Date is required',
        });
        return false;
    }

    myData = "{'date':'" + date + "','distbutorId':'" + distbutorId + "' }";

    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/GetUploadDoneFilesByDate",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: OnsuccessUploadDoneFilesByDate,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: function (err) {
            alert(err);
        },
        async: true,
        cache: false
    });
}
function OnsuccessUploadDoneFilesByDate(response) {

    if (response.d != '') {

        var jsonObj = $.parseJSON(response.d);

        var tab1 = jsonObj.length - 1;
        //var tab2 = jsonObj.length - 1;

        var TotalCountd = jsonObj[tab1].TotalCount;
        var ProcessCountd = jsonObj[tab1].Process
        var InProcessCountd = jsonObj[tab1].InProcess
        var ErrorFreeCountd = jsonObj[tab1].ErrorFree

        var TotalInserted = jsonObj[tab1].TotalInserted


        $('#totaldata3').text(TotalCountd);
        $('#totaldata4').text(ProcessCountd);
        $('#totaldata5').text(InProcessCountd);
        $('#totaldata6').text(ErrorFreeCountd);
        $('#totaldata7').text(TotalInserted);
        $('#totaldata8').text('0');
        $('#totaldata9').text('0');




        var tablestring = " <br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            "<input type='date' id='txterrordate1' class='date-input form-control'/>" +
            "</div>" + "<div class='col-12 col-sm-12 col-md-3'>" +
            "<button type='button' onClick='getUploadFileByDate();'  class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" + "</div>" +

            "<div class='row mt-3'>" +
            "<div class='col-12'>" +
            "<button type='button' id='totaldata' class='btn btn-primary mr-2'>" +
            "Total Upload Files <span class='badge badge-light'>" + TotalCountd + "</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='successdata' class='btn btn-secondary mr-2'>" +
            "Total Processed File <span class='badge badge-light'>" + ProcessCountd + "</span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-danger mr-2'>" +
            "Total Inserted File in DB <span class='badge badge-light'> " + InProcessCountd + " </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-success'>" +
            "Total Error Free Files <span class='badge badge-light'> " + ErrorFreeCountd + " </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<br/>" + "<table id='example6' class='display' style='width:100%'><thead>" +
            "<tr>" +
            "<th> File Name </th> " +
            "<th> File Path </th> " +
            "<th> File Type </th> " +
            "<th>File Records</th> " +
            "<th> File Upload Date </th> " +
            "<th>File Upload Proccessed</th> " +
            "</tr></thead>" +
            "<tbody id='values6'>";

        $("#done").empty();
        $("#done").append(tablestring);

        for (var i = 0; i < tab1; i++) {
            $('#values6').append($('<tr>' +
                "<td>" + jsonObj[i].FileName + "</td>" +
                "<td>" + jsonObj[i].FilePath + "</td>" +
                "<td>" + jsonObj[i].FileType + "</td>" +
                "<td>" + jsonObj[i].FileRecords + "</td>" +
                "<td>" + jsonObj[i].CreateTime + "</td>" +
                "<td id='StausCol3" + (i + 1) + "'> </td>" +
                "</tr>"));


            if (jsonObj[i].IsInserted == "1") {
                $("#StausCol3" + (i + 1)).append('<i class="ti-check"></i>');
            }


        }

        $("#done").append('</tbody></table>');
        $('#example6').DataTable();
    }
    else {
        var tablestring = "<br/>" + "<div class='row'>" +
            "<div class='col-12 col-sm-12 col-md-5'>" +
            "<input type='date' id='txterrordate1' class='date-input form-control'/>" +
            "</div>" + "<div class='col-12 col-sm-12 col-md-3'>" +
            "<button type='button' onClick='getUploadFileByDate();' class='btn btn-primary custom-btn'><i class='ti-angle-double-right'></i></button>" + "</div>" +
            "</div>" +
            "<div class='row mt-5'>" +
            "<div class='col-12'>" +
            "<button type='button' id='totaldata' class='btn btn-primary mr-2'>" +
            "Total Upload Files <span class='badge badge-light'>0</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='successdata' class='btn btn-secondary mr-2'>" +
            "Total Processed File <span class='badge badge-light'>0</span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" + "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-danger mr-2'>" +
            "In-Process Upload Files <span class='badge badge-light'> 0 </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" +
            "&nbsp;" +
            "<button type='button' id='pendingdata' class='btn btn-success'>" +
            "Total Error Free Files <span class='badge badge-light'> 0 </span>" +
            "<span class='sr-only'>unread messages</span>" +
            "</button>" +
            "</div>" +
            "</div>" +
            "<br/>" + "<table id='example6' class='display' style='width:100%'><thead>" +
            "<tr>" +
            "<th> File Name </th> " +
            "<th> File Path </th> " +
            "<th> File Type </th> " +
            "<th>File Records</th> " +
            "<th> File Upload Date </th> " +
            "<th>File Upload Proccessed</th> " +
            "</tr></thead>" +
            "<tbody id='values6'>";

        $("#done").empty();
        $("#done").append(tablestring);
        $('#example6').DataTable();
        // AlertMsg('Data Not Found.');
    }
    DoReloadFunctionDoneFileDate();
}

function SelectAllApproveCheckBoxes() {
    if ($('input[name="checkAll"]').is(':checked')) {
        $('.approveCheckBox').prop('checked', true);
    } else {
        $('.approveCheckBox').prop('checked', false);
    }
}

function SelectAllUploadedCustomerCheckBoxes() {
    if ($('input[name="checkAllUploadedCustomer"]').is(':checked')) {
        $('.UPloadedCustomerCheckBox').prop('checked', true);
    } else {
        $('.UPloadedCustomerCheckBox').prop('checked', false);
    }
}
function UnSelectAllUploadedCustomerCheckBoxes() {
    $('#checkAllUploadedCustomer').prop('checked', false);
}

function SelectAllMasterCustomerCheckBoxes() {
    if ($('input[name="checkAllMasterCustomer"]').is(':checked')) {
        $('.MasterCustomerCheckBox').prop('checked', true);
    } else {
        $('.MasterCustomerCheckBox').prop('checked', false);
    }
}
function UnSelectAllMasterCustomerCheckBoxes() {
    $('#checkAllMasterCustomer').prop('checked', false);
}

function SelectAllUploadedBricksCheckBoxes() {
    if ($('input[name="checkAllUploadedBricks"]').is(':checked')) {
        $('.BrickCheckBox').prop('checked', true);
    } else {
        $('.BrickCheckBox').prop('checked', false);
    }
}
function UnSelectAllUploadedBrickCheckBoxes() {
    $('#checkAllUploadedBricks').prop('checked', false);
}

function SelectAllMasterBricksCheckBoxes() {
    if ($('input[name="checkAllMasterBricks"]').is(':checked')) {
        $('.MasterBrickCheckBox').prop('checked', true);
    } else {
        $('.MasterBrickCheckBox').prop('checked', false);
    }
}
function UnSelectAllMasterBrickCheckBoxes() {
    $('#checkAllMasterBricks').prop('checked', false);
}

function UnSelectAllApproveCheckBoxes() {
    $('#checkAll').prop('checked', false);
}
function ApproveAll() {

    PKIDd = [];
    checkedboxes = document.querySelectorAll('input[name=customCheckAll]:checked');


    if (checkedboxes.length > 0) {
        for (var i = 0; i < checkedboxes.length; i++) {

            PKIDd.push(checkedboxes[i].dataset.id);
        }

        var mydata = "{'id':'" + PKIDd.toString() + "'}";

        $.ajax({
            type: "POST",
            url: "FileGridList.asmx/FinalInsertAll",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data != '') {

                    Swal.fire(
                        'Successfull!',
                        'Successfull Final Insert.',
                        'success'
                    );
                    getErrorFreeList();
                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error Occured',
                    });

                }

            },
            error: onError,
            async: true,
            cache: false
        });

    }
    else {

        Swal.fire({
            icon: 'error',
            title: 'You must select atleast one option!',
        });
        return false;
    }
}


function UpdateAll(PKIDd, Comments, FK_FileId, mm, yy) {
    swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: "You want to perform this action?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        closeOnConfirm: false,
        closeOnCancel: false
    }).then(function (result) {
        if (result.value) {
            commentViewDetail = Comments;
            FK_FiledIDViewDetail = FK_FileId;
            MonthViewDetail = mm;
            YearViewDetail = yy;
            //SuspectViewDetail = Suspect;
            PKIDd = [];
            checkedboxes = document.querySelectorAll('input[name=customCheckAll]:checked');
            if (checkedboxes.length > 0) {
                for (var i = 0; i < checkedboxes.length; i++) {
                    PKIDd.push(checkedboxes[i].dataset.id)
                }
                var mydata = "{'id':'" + PKIDd + "','comment':'" + commentViewDetail + "' ,'pkid':'" + FK_FiledIDViewDetail + "','Month':'" + MonthViewDetail + "','Year':'" + YearViewDetail + "'}";
                $.ajax({
                    type: "POST",
                    url: "FileGridList.asmx/UpdateUploadbrick",
                    data: mydata,
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data != '') {
                            Swal.fire(
                                'Successfull!',
                                'Uploaded Upload Successfull.',
                                'success'
                            );

                            location.reload();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error Occured',
                            });
                        }
                    },
                    error: onError,
                    async: true,
                    cache: false
                });
            }
            else {

                Swal.fire({
                    icon: 'error',
                    title: 'You must select atleast one option!',
                });
                return false;
            }
        }
    });
}

function UpdateAllmaster(PKIDd, Comments, FK_FileId, mm, yy) {
    swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: "You want to perform this action?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        closeOnConfirm: false,
        closeOnCancel: false
    }).then(function (result) {
        if (result.value) {
            debugger
            commentViewDetail = Comments;
            FK_FiledIDViewDetail = FK_FileId;
            MonthViewDetail = mm;
            YearViewDetail = yy;
            //SuspectViewDetail = Suspect;
            PKIDd = [];
            checkedboxes = document.querySelectorAll('input[name=customCheckAll]:checked');
            if (checkedboxes.length > 0) {
                for (var i = 0; i < checkedboxes.length; i++) {
                    PKIDd.push(checkedboxes[i].dataset.id)
                }
                var mydata = "{'id':'" + PKIDd + "','comment':'" + commentViewDetail + "' ,'pkid':'" + FK_FiledIDViewDetail + "','Month':'" + MonthViewDetail + "','Year':'" + YearViewDetail + "'}";
                $.ajax({
                    type: "POST",
                    url: "FileGridList.asmx/Updatemasterbrick",
                    data: mydata,
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data != '') {
                            Swal.fire(
                                'Successfull!',
                                'Mastar data Uploaded Successfull.',
                                'success'
                            );
                            location.reload();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error Occured',
                            });
                        }
                    },
                    error: onError,
                    async: true,
                    cache: false
                });
            }
            else {

                Swal.fire({
                    icon: 'error',
                    title: 'You must select atleast one option!',
                });
                return false;
            }
        }
    });
}




function getUploadedCustomers(code, Comments, FK_FileId, mm, yy) {
    swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: "You want to perform this action?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        closeOnConfirm: false,
        closeOnCancel: false
    }).then(function (result) {
        if (result.value) {
            debugger
            commentViewDetail = Comments;
            FK_FiledIDViewDetail = FK_FileId;
            MonthViewDetail = mm;
            YearViewDetail = yy;
            //SuspectViewDetail = Suspect;
            code = [];
            checkedboxes = document.querySelectorAll('input[name=customCheckAll]:checked');
            if (checkedboxes.length > 0) {
                for (var i = 0; i < checkedboxes.length; i++) {
                    code.push(checkedboxes[i].dataset.id)
                }

                var mydata = "{'id':'" + code + "','comment':'" + commentViewDetail + "' ,'pkid':'" + FK_FiledIDViewDetail + "','Month':'" + MonthViewDetail + "','Year':'" + YearViewDetail + "'}";
                $.ajax({
                    type: "POST",
                    url: "FileGridList.asmx/getUploadedCustomer",
                    data: mydata,
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data != '') {
                            swal.fire('Successfull', 'Data Updated Successfull', 'success');
                            $('.modal').hide();
                            $('.modal-backdrop').hide();
                            setTimeout(function () {
                                $('#spinnerAction').css("display", "none");
                            }, 2000);
                            $('.modal').hide();
                            $('.modal-backdrop').hide();

                        }
                    },
                    error: onError,
                    async: true,
                    cache: false
                });
            }
            else {

                Swal.fire({
                    icon: 'error',
                    title: 'You must select atleast one option!',
                });
                return false;
            }
        }
    });
}



function Opennewcust(Code, Comments, FK_FileId, mm, yy) {
    swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: "You want to perform this action?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        closeOnConfirm: true,
        closeOnCancel: true
    }).then(function (result) {
        if (result.value) {
            debugger
            commentViewDetail = Comments;
            FK_FiledIDViewDetail = FK_FileId;
            MonthViewDetail = mm;
            YearViewDetail = yy;
            //SuspectViewDetail = Suspect;
            Code = [];
            checkedboxes = document.querySelectorAll('input[name=customCheckAll]:checked');
            if (checkedboxes.length > 0) {
                for (var i = 0; i < checkedboxes.length; i++) {
                    Code.push(checkedboxes[i].dataset.id)
                }

                var mydata = "{'id':'" + Code + "','comment':'" + commentViewDetail + "' ,'pkid':'" + FK_FiledIDViewDetail + "','Month':'" + MonthViewDetail + "','Year':'" + YearViewDetail + "'}";
                $.ajax({
                    type: "POST",
                    url: "FileGridList.asmx/OpennewCustomer",
                    data: mydata,
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data != '') {
                            swal.fire('Successfull', 'Data Inserted Successfull', 'success');
                            $('.modal').hide();
                            $('.modal-backdrop').hide();
                            setTimeout(function () {
                                $('#spinnerAction').css("display", "none");
                            }, 2000);
                            $('.modal').hide();
                            $('.modal-backdrop').hide();

                        }
                    },
                    error: onError,
                    async: true,
                    cache: false
                });
            }
            else {

                Swal.fire({
                    icon: 'error',
                    title: 'You must select atleast one option!',
                });
                return false;
            }
        }
    });
}



function Updatepro(Code, Comments, FK_FileId, mm, yy) {
    swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: "You want to perform this action?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        closeOnConfirm: false,
        closeOnCancel: false
    }).then(function (result) {
        if (result.value) {
            debugger
            $("#spinner3").css("display", "block");
            commentViewDetail = Comments;
            FK_FiledIDViewDetail = FK_FileId;
            MonthViewDetail = mm;
            YearViewDetail = yy;
            //SuspectViewDetail = Suspect;
            Code = [];
            checkedboxes = document.querySelectorAll('input[name=customCheckAll]:checked');
            if (checkedboxes.length > 0) {
                for (var i = 0; i < checkedboxes.length; i++) {
                    Code.push(checkedboxes[i].dataset.id)
                }

                var mydata = "{'id':'" + Code + "','comment':'" + commentViewDetail + "' ,'pkid':'" + FK_FiledIDViewDetail + "','Month':'" + MonthViewDetail + "','Year':'" + YearViewDetail + "'}";
                $.ajax({
                    type: "POST",
                    url: "FileGridList.asmx/getUploadedPro",
                    data: mydata,
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data != '') {
                            swal.fire('Successfull', 'Data Updated Successfull', 'success');
                            $('.modal').hide();
                            $('.modal-backdrop').hide();
                            setTimeout(function () {
                                $('#spinnerAction').css("display", "none");
                            }, 2000);
                            $('.modal').hide();
                            $('.modal-backdrop').hide();

                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error Occured',
                            });
                        }
                    },
                    error: onError,
                    async: true,
                    cache: true

                });
            }
            else {

                Swal.fire({
                    icon: 'error',
                    title: 'You must select atleast one option!',
                });
                return false;
            }
            $("#spinner3").hide();
        }
    });
}

function getmasterCustomers(code, Comments, FK_FileId, mm, yy) {

    swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: "You want to perform this action?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        closeOnConfirm: false,
        closeOnCancel: false
    }).then(function (result) {
        if (result.value) {
            debugger
            commentViewDetail = Comments;
            FK_FiledIDViewDetail = FK_FileId;
            MonthViewDetail = mm;
            YearViewDetail = yy;
            //SuspectViewDetail = Suspect;
            code = [];
            checkedboxes = document.querySelectorAll('input[name=customCheckAll]:checked');
            if (checkedboxes.length > 0) {
                for (var i = 0; i < checkedboxes.length; i++) {
                    code.push(checkedboxes[i].dataset.id)
                }



                var mydata = "{'id':'" + code + "','comment':'" + commentViewDetail + "' ,'pkid':'" + FK_FiledIDViewDetail + "','Month':'" + MonthViewDetail + "','Year':'" + YearViewDetail + "'}";
                $.ajax({
                    type: "POST",
                    url: "FileGridList.asmx/getmasterCustomer",
                    data: mydata,
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data != '') {
                            swal.fire('Successfull', 'Data Updated Successfull', 'success');
                            $('.modal').hide();
                            $('.modal-backdrop').hide();
                            setTimeout(function () {
                                $('#spinnerAction').css("display", "none");
                            }, 2000);
                            $('.modal').hide();
                            $('.modal-backdrop').hide();

                        }
                    },
                    error: onError,
                    async: true,
                    cache: false
                });
            }
            else {

                Swal.fire({
                    icon: 'error',
                    title: 'You must select atleast one option!',
                });
                return false;
            }

        }
    });

}




function getActionDetails(DistributorCode, Comments, FK_FileId, Suspect, mm, yy) {

    $('#spinnerAction').css("display", "block");

    if (ProductPKID == '-1' || ProductPKID == '' || ProductPKID == null) {
        alert('Select the System Product');
    }
    var distbutor = DistributorCode;
    var commentd = Comments;
    var FK_ID = FK_FileId;
    var susp = Suspect;
    var month = mm;
    var year = yy;

    FK_FiledIDViewDetail = FK_FileId;

    if (commentd.startsWith(',Product is not Mapped') || commentd.startsWith(',Product Name is not in System')) {
        for (var x = 0; x < ProductPKID.length; x++) {
            if ($('#ddlProduct' + (1 + x)).val() != '-1') {
                MapProducID[x] = $('#ddlProduct' + (1 + x)).val();
                MapPKID[x] = ProductPKID[x];
            }
        }
        btnAlignProduct_ById_Clicked(MapPKID, MapProducID, FK_FiledIDViewDetail);
    } else {
        swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You want to perform this action?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            closeOnConfirm: false,
            closeOnCancel: false
        }).then(function (result) {
            if (result.value) {
                myData = "{'distributorcode':'" + distbutor + "','comment':'" + commentd + "','id':'" + FK_FiledIDViewDetail + "','Suspect':'" + susp + "','Year':'" + year + "','Month':'" + month + "'}"; //'INVDate':'" + INV + "'
                $.ajax({
                    type: "POST",
                    url: "FileGridList.asmx/ErrorCountDetailsAction",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: function (response) {
                        if (response.d != '') {
                            var jsonObj = response.d;
                            if (jsonObj == "OK") {
                                swal.fire('Successfull', 'Data Revalidate Successfull', 'success');
                                $('.modal').hide();
                                $('.modal-backdrop').hide();
                                setTimeout(function () {
                                    $('#spinnerAction').css("display", "none");
                                }, 2000);
                                $('.modal').hide();
                                $('.modal-backdrop').hide();
                            } else if (jsonObj == "OK1") {
                                swal.fire('Successfull', 'Customer Mapped with Brick & Revalidate Successfull', 'success');
                                $('.modal').hide();
                                $('.modal-backdrop').hide();
                                setTimeout(function () {
                                    $('#spinnerAction').css("display", "none");
                                }, 2000);
                                $('.modal').hide();
                                $('.modal-backdrop').hide();
                            }
                            else if (jsonObj == "OK2") {
                                swal.fire('Successfull', 'Brick Mapped & Revalidate Successfull', 'success');
                                $('.modal').hide();
                                $('.modal-backdrop').hide();
                                setTimeout(function () {
                                    $('#spinnerAction').css("display", "none");
                                }, 2000);
                                $('.modal').hide();
                                $('.modal-backdrop').hide();
                            }
                            else if (jsonObj == "Customer Not Exists in Cust File") {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Customer Not Exists in Cust File',
                                });
                                return false;

                            } else if (jsonObj == "Customer Exist") {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Customer Already Exists',
                                });
                                return false;
                            } else if (jsonObj == "Brick Not Exists in Cust File") {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Brick Not Exists in Cust File',
                                });
                                return false;
                            } else if (jsonObj == "Brick Exist") {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Brick Exist',
                                });
                                return false;
                            }
                            else if (jsonObj != "Customer is not Mapped with this Brick" || jsonObj != " ,Customers exists in Invoice File but not in Customer File" || jsonObj != ",Customers exists in Invoice File but not in Customer File" ||
                                jsonObj != "BrickCode is not map with this distributor" || jsonObj != ",Sale In Multiple Brick With Same ID"
                                || jsonObj != " ,Sale In Multiple Brick With Same ID" || jsonObj != "Product is Not Mapped" || jsonObj != "Product Name is not in System") { //Error Occurs

                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Error Occurs.',
                                });
                                return false;
                            }
                            else {

                                Swal.fire({
                                    icon: 'error',
                                    title: 'Something went wrong.',
                                });
                                return false;
                            }
                        }
                    },
                    error: function (err) {
                        alert(err);
                    },
                    async: true,
                    cache: false
                });
            }
            $('#spinnerAction').css("display", "none");
        });
    }
}


function getViewDetails(Comments, FK_FileId, mm, yy, Suspect) {
    //InvoiceDate
   
    commentViewDetail = Comments;
    FK_FiledIDViewDetail = FK_FileId;
    MonthViewDetail = mm;
    YearViewDetail = yy;
    SuspectViewDetail = Suspect;
    $("#spinner5").css("display", "block");


    myData = "{'comment':'" + commentViewDetail + "' ,'id':'" + FK_FiledIDViewDetail + "','Month':'" + MonthViewDetail + "','Year':'" + YearViewDetail + "','Suspect':'" + SuspectViewDetail + "'}"; //,'INVDate':'" + InvoiceDate + "'

    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/ActionErrorDetails",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: OnsuccessErrorActionDetailsGrid,
        //beforeSend: startingAjax5,
        //complete: ajaxCompleted5,
        error: function (err) {
            alert(err);
        },
        cache: false,
        async: true
    });
}



function OnsuccessErrorActionDetailsGrid(response) {
  
    if (response.d != '') {
        if (response.d == 'Something went wrong.') {
            var tablestring = "<div class='table-responsive'>" +
                "<table id='example7' class='display' style='width:100%'>" +
                "<thead>" +
                "<tr>" +
                "<th>Customer Code</th> " +
                "<th>Customer Name</th> " +
                "<th>Brick Code</th> " +
                "<th>Brick Name</th> " +
                "<th>Product Code</th> " +
                "<th>Product Name</th> " +
                "<th>System Product</th> " +

                "</tr></thead>" +
                "<tbody id='values7'>";

            $("#modal3data").empty();
            $("#modal3data").append(tablestring);
            $('#example7').DataTable();
        }
        else {

            var jsonObj = $.parseJSON(response.d);
            for (var x = 0; x < jsonObj.length; x++) {
                ProductPKID[x] = jsonObj[x].pk_ProductMapId;
            }
            //For Products Error details INVOICES
            if (SuspectViewDetail == 'PRODUCTIdSuspect' && commentViewDetail.startsWith(",Changed Product Name with Same Product Id")) {
                var tablestring =
                    "<div class='row'><div class='col-md-3'><button type='button' data-id'" + MapProducID + "' class='btn btn-primary' title='Submit!' onClick=\"Updatepro('" + Code + "','" + commentViewDetail + "','" + FK_FiledIDViewDetail + "','" + MonthViewDetail + "','" + YearViewDetail + "');\">Proceed To overwrite New Name</button></div><div class='col-md-3'><div class='spinner-border text-primary' style='display:none;' id='spinnerAction'></div></div>" +
                    " <div> <label  style='vertical-align: middle;margin-top: 0px;font-weight: bold ;margin-left:950px'>Select All </label>  <input class= 'check'  type='checkbox' name='checkAll' data-id='" + Code + "'  id='checkAll' onClick=\"SelectAllApproveCheckBoxes();\"> </div>"
                    +
                    "<br/>" +
                    "<div class='table-responsive container'>" + "<br/>" +
                    "<table id='example7' class='display' style='width:100%'>" +
                    "<thead>" +
                    "<tr>" +
                    "<th>Product Code</th> " +
                    "<th>Product Name(Already Mapped)</th> " +
                    "<th>Product Name(CurrentFile)</th> " +
                    "<th>Action</th> " +

                    "</tr></thead>" +
                    "<tbody id='values7'>";
                $("#modal3data").empty();
                $("#modal3data").append(tablestring);
                console.log("HElllllloooooo", jsonObj);
                for (var i = 0; i < jsonObj.length; i++) {
                    $('#values7').append($('<tr>' +
                        "<td>" + jsonObj[i].ProductCode + "</td>" +
                        "<td>" + jsonObj[i].Product + "</td>" +
                        "<td>" + jsonObj[i].NAME + "</td>" +
                        "<td><div class='custom-control custom-checkbox'><input type='checkbox' class='custom-control-input approveCheckBox' onClick='UnSelectAllApproveCheckBoxes();' data-id='" + jsonObj[i].ProductCode + "','" + jsonObj[i].Product + "','" + jsonObj[i].NAME + "' id='customCheck" + (i + 1) + "' name='customCheckAll'/><label class='custom-control-label' for='customCheck" + (i + 1) + "'></label></div></td>" +
                        "</tr>"));
                }
                $("#modal3data").append('</tbody></table>');
                $('#example7').DataTable();

            }





            if (SuspectViewDetail == 'PRODUCTIdSuspect' && commentViewDetail.startsWith(",Product is not Mapped")) {
                var tablestring =
                    "<div class='row'><div class='col-md-1 mr-5'><button type='button' data-id'" + MapProducID + "' class='btn btn-primary' title='Action!' onClick=\"getActionDetails('" + DistributorViewDetail + "','" + commentViewDetail + "','" + FK_FiledIDViewDetail + "','" + SuspectViewDetail + "','" + MonthViewDetail + "','" + YearViewDetail + "');\">Action</button></div><div class='col-md-3'><div class='spinner-border text-primary' style='display:none;' id='spinnerAction'></div></div></div>" + //'" + jsonObj[i].DistributorCode + "','" + jsonObj[i].Comments + "','" + jsonObj[i].FK_FileId + "','" + jsonObj[i].Suspect + "','" + jsonObj[i].mm + "','" + jsonObj[i].yy + "'


                    "<br/>" +
                    "<div class='table-responsive container'>" + "<br/>" +
                    "<table id='example7' class='display' style='width:100%'>" +
                    "<thead>" +
                    "<tr>" +
                    "<th>Product Code</th> " +
                    "<th>Product Name</th> " +
                    "<th>System Product</th> " +

                    "</tr></thead>" +
                    "<tbody id='values7'>";

                $("#modal3data").empty();
                $("#modal3data").append(tablestring);
                for (var i = 0; i < jsonObj.length; i++) {
                    $('#values7').append($('<tr>' +

                        "<td>" + jsonObj[i].ProductCode + "</td>" +
                        "<td>" + jsonObj[i].Product + "</td>" +
                        "<td>" + '<select id="ddlProduct' + (i + 1) + '" name="ddlAllProduct" onClick=FillProduct(' + "ddlProduct" + (i + 1) + '); class="form-select productclass" style="padding: 3px; width: 200px;"><option value="-1">Select Product</option></select>' + "</td>" +

                        "</tr>"));
                }
                $("#modal3data").append('</tbody></table>');
                $('#example7').DataTable();
            }

            //For Cust Error Details INVOICES

            if (SuspectViewDetail == 'CustIDSuspect' && commentViewDetail.startsWith("Already Mapped Customer with Are different Brick")) {
                var tablestring =
                    //"<div class='row'><div class='col-md-1 mr-5'><button type='button' data-id'" + MapProducID + "' class='btn btn-primary' title='Action!' onClick=\"getActionDetails('" + DistributorViewDetail + "','" + commentViewDetail + "','" + FK_FiledIDViewDetail + "','" + SuspectViewDetail + "','" + MonthViewDetail + "','" + YearViewDetail + "');\">Action</button></div><div class='col-md-3'><div class='spinner-border text-primary' style='display:none;' id='spinnerAction'></div></div></div>" +
                    "<div class='row'><div class='col-md-3'><button type='button' data-id'" + MapProducID + "' class='btn btn-primary' title='Action!' onClick=\"Opennewcust('" + Code + "','" + commentViewDetail + "','" + FK_FiledIDViewDetail + "','" + MonthViewDetail + "','" + YearViewDetail + "');\">Action</button></div><div class='col-md-3'><div class='spinner-border text-primary' style='display:none;' id='spinnerAction'></div></div>" +

                    " <div> <label  style='vertical-align: middle;margin-top: 0px;font-weight: bold ;margin-left:950px'>Select All </label>  <input   type='checkbox' name='checkAll' class='check' data-id='" + Code + "'  id='checkAll' onClick=\"SelectAllApproveCheckBoxes();\"> </div>"
                    +
                    "<div class='table-responsive container'>" + "<br/>" +
                    "<table id='example7' class='display' style='width:100%'>" +
                    "<thead>" +
                    "<tr>" +
                    "<th>Customer Code</th> " +
                    "<th>Customer Name</th> " +
                    "<th>Brick Code</th> " +
                    "<th>Brick Name(Current File)</th> " +
                    "<th>Action</th> " +
                    "</tr></thead>" +
                    "<tbody id='values7'>";
                $("#modal3data").empty();
                $("#modal3data").append(tablestring);
                for (var i = 0; i < jsonObj.length; i++) {
                    $('#values7').append($('<tr>' +
                        "<td>" + jsonObj[i].CUSTID + "</td>" +
                        "<td>" + jsonObj[i].CUSTNAME + "</td>" +
                        "<td>" + jsonObj[i].TOWNID + "</td>" +
                        "<td>" + jsonObj[i].TOWN + "</td>" +
                        "<td><div class='custom-control custom-checkbox'><input type='checkbox' class='custom-control-input approveCheckBox' onClick='UnSelectAllApproveCheckBoxes();' data-id='" + jsonObj[i].CustCode + "','" + jsonObj[i].CUSTID + "','" + jsonObj[i].CUSTNAME + "','" + jsonObj[i].TOWNID + "','" + jsonObj[i].TOWN + "'      id='customCheck" + (i + 1) + "' name='customCheckAll'/><label class='custom-control-label' for='customCheck" + (i + 1) + "'></label></div></td>" +
                        "</tr>"));
                }
                $("#modal3data").append('</tbody></table>');
                $('#example7').DataTable();
            }
            else if (SuspectViewDetail == 'CustIDSuspect') {
                var tablestring =
                    "<div class='row'><div class='col-md-1 mr-5'><button type='button' data-id'" + MapProducID + "' class='btn btn-primary' title='Action!' onClick=\"getActionDetails('" + DistributorViewDetail + "','" + commentViewDetail + "','" + FK_FiledIDViewDetail + "','" + SuspectViewDetail + "','" + MonthViewDetail + "','" + YearViewDetail + "');\">Action</button></div><div class='col-md-3'><div class='spinner-border text-primary' style='display:none;' id='spinnerAction'></div></div></div>" + //'" + jsonObj[i].DistributorCode + "','" + jsonObj[i].Comments + "','" + jsonObj[i].FK_FileId + "','" + jsonObj[i].Suspect + "','" + jsonObj[i].mm + "','" + jsonObj[i].yy + "'
                    "<br/>" +
                    "<div class='table-responsive container'>" + "<br/>" +
                    "<table id='example7' class='display' style='width:100%'>" +
                    "<thead>" +
                    "<tr>" +
                    "<th>Customer Code</th> " +
                    "<th>Customer Name</th> " +
                    "<th>Brick Code</th> " +
                    "<th>Brick Name</th> " +
                    "</tr></thead>" +
                    "<tbody id='values7'>";

                $("#modal3data").empty();
                $("#modal3data").append(tablestring);

                for (var i = 0; i < jsonObj.length; i++) {
                    $('#values7').append($('<tr>' +
                        "<td>" + jsonObj[i].CUSTID + "</td>" +
                        "<td>" + jsonObj[i].CUSTNAME + "</td>" +
                        "<td>" + jsonObj[i].TOWNID + "</td>" +
                        "<td>" + jsonObj[i].TOWN + "</td>" +
                        // "<td><div class='custom-control custom-checkbox'><input type='checkbox' class='custom-control-input approveCheckBox' onClick='UnSelectAllApproveCheckBoxes();' data-id='" + jsonObj[i].ID + "' id='customCheck" + (i + 1) + "' name='customCheckAll'/><label class='custom-control-label' for='customCheck" + (i + 1) + "'></label></div></td>" +
                        "</tr>"));
                }
                $("#modal3data").append('</tbody></table>');
                $('#example7').DataTable();


            }
            //For Brick error details INVOICES
            if (SuspectViewDetail == 'BRICKIDSuspect') {
                var tablestring =
                    "<div class='row'><div class='col-md-1 mr-5'><button type='button' data-id'" + MapProducID + "' class='btn btn-primary' title='Action!' onClick=\"getActionDetails('" + DistributorViewDetail + "','" + commentViewDetail + "','" + FK_FiledIDViewDetail + "','" + SuspectViewDetail + "','" + MonthViewDetail + "','" + YearViewDetail + "');\">Action</button></div><div class='col-md-3'><div class='spinner-border text-primary' style='display:none;' id='spinnerAction'></div></div></div>" + //'" + jsonObj[i].DistributorCode + "','" + jsonObj[i].Comments + "','" + jsonObj[i].FK_FileId + "','" + jsonObj[i].Suspect + "','" + jsonObj[i].mm + "','" + jsonObj[i].yy + "'
                    "<br/>" +
                    "<div class='table-responsive container'>" + "<br/>" +
                    "<table id='example7' class='display' style='width:100%'>" +
                    "<thead>" +
                    "<tr>" +
                    "<th>Brick Code</th> " +
                    "<th>Brick Name</th> " +

                    "</tr></thead>" +
                    "<tbody id='values7'>";
                $("#modal3data").empty();
                $("#modal3data").append(tablestring);

                for (var i = 0; i < jsonObj.length; i++) {
                    $('#values7').append($('<tr>' +
                        "<td>" + jsonObj[i].TOWNID + "</td>" +
                        "<td>" + jsonObj[i].TOWN + "</td>" +
                        "</tr>"));
                }
                $("#modal3data").append('</tbody></table>');
                $('#example7').DataTable();
            }

            // For Cust Error Details CUSTOMERS
            if (SuspectViewDetail == 'CustomerIDSuspect') {
                var tablestring =
                    //"<div class='row'><div class='col-md-1 mr-5'><button type='button' data-id'" + MapProducID + "' class='btn btn-primary' title='Action!' onClick=\"getActionDetails('" + DistributorViewDetail + "','" + commentViewDetail + "','" + FK_FiledIDViewDetail + "','" + SuspectViewDetail + "','" + MonthViewDetail + "','" + YearViewDetail + "');\">Action</button></div><div class='col-md-3'><div class='spinner-border text-primary' style='display:none;' id='spinnerAction'></div></div></div>" +
                    "<div class='row'><div class='col-md-3'><button type='button' data-id'" + MapProducID + "' class='btn btn-primary' title='Upload Update!' onClick=\"getUploadedCustomers('" + Code + "','" + commentViewDetail + "','" + FK_FiledIDViewDetail + "','" + MonthViewDetail + "','" + YearViewDetail + "');\">Upload Update</button></div><div class='col-md-3'><div class='spinner-border text-primary' style='display:none;' id='spinnerAction'></div></div>" +

                    "<div class='col-md-3'><button type='button' data-id'" + MapProducID + "' class='btn btn-primary' title='Master Update!' onClick=\"getmasterCustomers('" + Code + "','" + commentViewDetail + "','" + FK_FiledIDViewDetail + "','" + MonthViewDetail + "','" + YearViewDetail + "');\">Master Update</button></div><div class='col-md-3'><div class='spinner-border text-primary' style='display:none;' id='spinnerAction'></div></div>" +
                    " <div> <label  style='vertical-align: middle;margin-top: 0px;font-weight: bold ;margin-left:950px'>Select All </label>  <input   type='checkbox' name='checkAll' class='check' data-id='" + Code + "'  id='checkAll' onClick=\"SelectAllApproveCheckBoxes();\"> </div>"
                    +
                    "<div class='table-responsive container'>" + "<br/>" +

                    "<table id='example7' class='display' style='width:100%'>" +
                    "<thead>" +
                    "<tr>" +
                    "<th>Customer Code</th> " +
                    "<th>Uploaded Customer Name</th> " +
                    "<th>Brick Code</th> " +
                    "<th>Brick Name</th> " +
                    "<th>Master Customer Name</th> " +
                    "<th>Action</th> " +

                    "</tr></thead>" +
                    "<tbody id='values7'>";
                $("#modal3data").empty();
                $("#modal3data").append(tablestring);
                for (var i = 0; i < jsonObj.length; i++) {
                    $('#values7').append($('<tr>' +
                        "<td>" + jsonObj[i].CUSTID + "</td>" +
                        "<td>" + jsonObj[i].CUSTNAME + "</td>" +
                        "<td>" + jsonObj[i].TOWNID + "</td>" +
                        "<td>" + jsonObj[i].TOWN + "</td>" +
                        "<td>" + jsonObj[i].PharmacyName + "</td>" +
                        "<td><div class='custom-control custom-checkbox'><input type='checkbox' class='custom-control-input approveCheckBox' onClick='UnSelectAllApproveCheckBoxes();' data-id='" + jsonObj[i].CUSTID + "','" + jsonObj[i].CUSTNAME + "','" + jsonObj[i].TOWNID + "','" + jsonObj[i].TOWN + "','" + jsonObj[i].PharmacyName + "'      id='customCheck" + (i + 1) + "' name='customCheckAll'/><label class='custom-control-label' for='customCheck" + (i + 1) + "'></label></div></td>" +
                        "</tr>"));
                }
                $("#modal3data").append('</tbody></table>');
                $('#example7').DataTable();
            }

            //For Brick error details CUSTOMERS
            if (SuspectViewDetail == 'TOWNIDSuspect') {
                var tablestring =
                    "<div class='row'><div class='col-md-3'><button type='button' data-id'" + MapProducID + "' class='btn btn-primary' title='Upload Update!' onClick=\"UpdateAll('" + PKIDd + "','" + commentViewDetail + "','" + FK_FiledIDViewDetail + "','" + MonthViewDetail + "','" + YearViewDetail + "');\">Upload Update</button></div><div class='col-md-3'><div class='spinner-border text-primary' style='display:none;' id='spinnerAction'></div></div>" +
                    "<div class='col-md-3'><button type='button' data-id'" + MapProducID + "' class='btn btn-primary' title='Master Update!' onClick=\"UpdateAllmaster('" + DistributorViewDetail + "','" + commentViewDetail + "','" + FK_FiledIDViewDetail + "','" + MonthViewDetail + "','" + YearViewDetail + "');\">Master Update</button></div><div class='col-md-3'><div class='spinner-border text-primary' style='display:none;' id='spinnerAction'></div></div>" +
                    " <div> <label  style='vertical-align: middle;margin-top: 0px;font-weight: bold ;margin-left:950px'>Select All </label>  <input class= 'check'  type='checkbox' name='checkAll' data-id='" + PKIDd + "'  id='checkAll' onClick=\"SelectAllApproveCheckBoxes();\"> </div>"
                    +
                    "<br/>" +
                    "<div class='table-responsive container'>" + "<br/>" +
                    "<table id='example7' class='display' style='width:100%'>" +
                    "<thead>" +
                    "<tr>" +
                    "<th>Brick Code</th> " +
                    "<th>Uploaded Brick Name</th> " +
                    "<th>System Brick Name</th> " +
                    "<th>Action</th> " +
                    "</tr></thead>" +
                    "<tbody id='values7'>";
                $("#modal3data").empty();
                $("#modal3data").append(tablestring);
                for (var i = 0; i < jsonObj.length; i++) {
                    $('#values7').append($('<tr>' +
                        "<td>" + jsonObj[i].TOWNID + "</td>" +
                        "<td>" + jsonObj[i].TOWN + "</td>" +
                        "<td>" + jsonObj[i].BrickName + "</td>" +
                        "<td><div class='custom-control custom-checkbox'><input type='checkbox' class='custom-control-input approveCheckBox' onClick='UnSelectAllApproveCheckBoxes();' data-id='" + jsonObj[i].ID + "','" + jsonObj[i].TOWN + "','" + jsonObj[i].TOWNID + "','" + jsonObj[i].BrickName + "' id='customCheck" + (i + 1) + "' name='customCheckAll'/><label class='custom-control-label' for='customCheck" + (i + 1) + "'></label></div></td>" +
                        "</tr>"));
                }
                $("#modal3data").append('</tbody></table>');
                $('#example7').DataTable();
                window.pageLoad();
            }

        }
    }
    else {
        var tablestring = "<div class='table-responsive'>" +
            "<table id='example7' class='display' style='width:100%'>" +
            "<thead>" +
            "<tr>" +
            "<th>Customer Code</th> " +
            "<th>Customer Name</th> " +
            "<th>Brick Code</th> " +
            "<th>Brick Name</th> " +
            "<th>Product Code</th> " +
            "<th>Product Name</th> " +
            //"<th>Product Map ID</th> " +
            "<th>System Product</th> " +

            "</tr></thead>" +
            "<tbody id='values7'>";

        $("#modal3data").empty();
        $("#modal3data").append(tablestring);
        $('#example7').DataTable();

        // AlertMsg('Data Not Found.');
    }
    $("#spinner5").css("display", "none");


}



function getUploadedCustomer(DistributorViewDetail, commentViewDetail, FK_FiledIDViewDetail, SuspectViewDetail, MonthViewDetail, YearViewDetail) {
    debugger
    DistributorViewDetail = [];
    UploadedCustomer = [];
    UploadedCustomerName = [];
    UploadedCustomerBrick = [];
    checkedboxes = document.querySelectorAll('input[name=checkAll]:checked');

    if (checkedboxes.length > 0) {
        for (var i = 0; i < checkedboxes.length; i++) {

            UploadedCustomerID.push(checkedboxes[i].dataset.id);
            UploadedCustomer.push(checkedboxes[i].dataset.valcode);
            UploadedCustomerName.push(checkedboxes[i].dataset.name);
            UploadedCustomerBrick.push(checkedboxes[i].dataset.titles);
        }

        var mydata = "{'id':'" + DistributorViewDetail.toString() + "','customername':'" + UploadedCustomerName.toString() + "','cuscustomerid':'" + UploadedCustomer.toString() + "','custownid':'" + UploadedCustomerBrick.toString() + "'}";

        $.ajax({
            type: "POST",
            url: "FileGridList.asmx/updateCustomerData_NEW",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data != '') {

                    Swal.fire(
                        'Successfull!',
                        'Uploaded Customer has been updated.',
                        'success'
                    );
                    // getErrorFreeList();
                    setTimeout(function () {
                        //$('#dialog').jqmHide();
                        $('#spinnerAction').css("display", "none");
                    }, 2000);
                    // $('#spinnerAction').hide();
                    $('.abc').hide();
                    $('.modal-backdrop').hide();
                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error Occured',
                    });

                }

            },
            beforeSend: startingAjax1,
            complete: ajaxCompleted1,
            error: onError,
            async: true,
            cache: false
        });

    }
    else {

        Swal.fire({
            icon: 'error',
            title: 'You must select atleast one option!',
        });
        return false;
    }

}
function getMasterCustomer(UploadedCustPKID, DSTID, UploadedCustomerPKID, UploadedCustomerNamePKID, UploadedCustomerBrickPKID) {


    UploadedCustomerID = [];
    UploadedCustomerDistID = [];
    UploadedCustomer = [];
    UploadedCustomerName = [];
    UploadedCustomerBrick = [];
    checkedboxes = document.querySelectorAll('input[name=MastercustomerCheckAll]:checked');

    if (checkedboxes.length > 0) {
        for (var i = 0; i < checkedboxes.length; i++) {

            UploadedCustomerID.push(checkedboxes[i].dataset.id);
            UploadedCustomerDistID.push(checkedboxes[i].dataset.dst);
            UploadedCustomer.push(checkedboxes[i].dataset.valcode);
            UploadedCustomerName.push(checkedboxes[i].dataset.name);
            UploadedCustomerBrick.push(checkedboxes[i].dataset.titles);
        }

        var mydata = "{'id':'" + UploadedCustomerID.toString() + "','distributorcode':'" + UploadedCustomerDistID.toString() + "','customername':'" + UploadedCustomerName.toString() + "','cuscustomerid':'" + UploadedCustomer.toString() + "','custownid':'" + UploadedCustomerBrick.toString() + "'}";

        $.ajax({
            type: "POST",
            url: "FileGridList.asmx/updateCustomerDataMaster_New",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {


                if (data.d == 'OK') {

                    Swal.fire(
                        'Successfull!',
                        'Master Customer has been updated.',
                        'success'
                    );
                    // getErrorFreeList();
                    setTimeout(function () {
                        //$('#dialog').jqmHide();
                        $('#spinnerAction').css("display", "none");
                    }, 2000);
                    // $('#spinnerAction').hide();
                    $('.abc').hide();
                    $('.modal-backdrop').hide();

                } else if (data.d == 'SameCode') {

                    Swal.fire({
                        icon: 'warning',
                        title: 'Brick Code is Same',
                    });

                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error Occured',
                    });

                }

            },
            beforeSend: startingAjax1,
            complete: ajaxCompleted1,
            error: onError,
            async: true,
            cache: false
        });

    }
    else {

        Swal.fire({
            icon: 'error',
            title: 'You must select atleast one option!',
        });
        return false;
    }


}

function getUploadedBricks(PKIDd, UploadedCustomerID, UploadedCustomerBrick, UploadedBrickName) {
    debugger
    UploadedCustomerID = [];
    UploadedCustomerBrick = [];
    UploadedBrickName = [];
    checkedboxes = document.querySelectorAll('input[name=checkAll]:checked');

    if (checkedboxes.length > 0) {
        for (var i = 0; i < checkedboxes.length; i++) {

            UploadedCustomerID.push(checkedboxes[i].dataset.id);
            UploadedCustomerBrick.push(checkedboxes[i].dataset.valcode);
            UploadedBrickName.push(checkedboxes[i].dataset.name);
            // UploadedCustomerBrick.push(checkedboxes[i].dataset.titles);
        }

        var mydata = "{'id':'" + UploadedCustomerID.toString() + "','town':'" + UploadedBrickName.toString() + "','custownid':'" + UploadedCustomerBrick.toString() + "'}";

        $.ajax({
            type: "POST",
            url: "FileGridList.asmx/updateBricksData_NEW",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data != '') {

                    Swal.fire(
                        'Successfull!',
                        'Uploaded Brick has been updated.',
                        'success'
                    );
                    // getErrorFreeList();
                    setTimeout(function () {
                        //$('#dialog').jqmHide();
                        $('#spinnerAction').css("display", "none");
                    }, 2000);
                    // $('#spinnerAction').hide();
                    $('.abc').hide();
                    $('.modal-backdrop').hide();
                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error Occured',
                    });

                }

            },
            beforeSend: startingAjax1,
            complete: ajaxCompleted1,
            error: onError,
            async: true,
            cache: false
        });

    }
    else {

        Swal.fire({
            icon: 'error',
            title: 'You must select atleast one option!',
        });
        return false;
    }



}
function getMasterBricks(UploadedCustPKID, DSTID, UploadedCustomerBrickName, UploadedBrickPKID) {


    UploadedCustomerID = [];
    UploadedCustomerDistID = [];
    // UploadedCustomer = [];
    UploadedCustomerName = [];
    UploadedCustomerBrick = [];
    UploadedMasterBrick = [];
    checkedboxes = document.querySelectorAll('input[name=MasterBrickCheckAll]:checked');

    if (checkedboxes.length > 0) {
        for (var i = 0; i < checkedboxes.length; i++) {

            UploadedCustomerID.push(checkedboxes[i].dataset.id);
            UploadedCustomerDistID.push(checkedboxes[i].dataset.dst);
            // UploadedCustomer.push(checkedboxes[i].dataset.valcode);
            UploadedCustomerBrick.push(checkedboxes[i].dataset.name);
            UploadedMasterBrick.push(checkedboxes[i].dataset.valcode);
        }

        var mydata = "{'id':'" + UploadedCustomerID.toString() + "','distributorcode':'" + UploadedCustomerDistID.toString() + "','town':'" + UploadedCustomerBrick.toString() + "','custownid':'" + UploadedMasterBrick.toString() + "'}";

        $.ajax({
            type: "POST",
            url: "FileGridList.asmx/updateBricksMaster_NEW",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {


                if (data.d == 'OK') {

                    Swal.fire(
                        'Successfull!',
                        'Master Customer has been updated.',
                        'success'
                    );
                    // getErrorFreeList();
                    setTimeout(function () {
                        //$('#dialog').jqmHide();
                        $('#spinnerAction').css("display", "none");
                    }, 2000);
                    // $('#spinnerAction').hide();
                    $('.abc').hide();
                    $('.modal-backdrop').hide();

                } else if (data.d == 'SameCode') {

                    Swal.fire({
                        icon: 'warning',
                        title: 'Brick Code is Same',
                    });

                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error Occured',
                    });

                }

            },
            beforeSend: startingAjax1,
            complete: ajaxCompleted1,
            error: onError,
            async: true,
            cache: false
        });

    }
    else {

        Swal.fire({
            icon: 'error',
            title: 'You must select atleast one option!',
        });
        return false;
    }



}

function FillProduct(cmbId) {

    //rowID = rowid + 1;
    porductdd = cmbId;
    $.ajax({
        type: "POST",
        url: "ProductAlignmentService.asmx/GetAllProduct",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddlProduct,
        error: onError,
        cache: false,
        async: true
    });
}
function FillddlProduct(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, tweet) {

            $(porductdd).append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].ProductSku + "</option>");
        });
    }
}

function onError(request, status, error) {

    Swal.fire({
        icon: 'error',
        title: 'Something went wrong.',
    });
}
function getErrorFileFinalInsert() {


    myData = "{'id':'" + IDD + "'}";

    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/SendDbDataInInvoice",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: function (response) {

            if (response.d != '') {
                var jsonObj = response.d;
                if (jsonObj == "OK") {
                    Swal.fire(
                        'SuccessFull!',
                        'Final Insert has been Successfull!',
                        'success'
                    );
                    $('#exampleModal').hide();
                    $('.modal-backdrop').hide();
                } else if (response.d != "OK") {
                    Swal.fire(
                        'Error!',
                        'Error Occured',
                        'error'
                    )
                }
            }
        },
        error: function (err) {
            alert(err);
        },
        async: true,
        cache: false
    });

}

function getErrorFileRevalidate(FK_FileId) {


    //$("#spinner1").show();

    myData = "{'id':'" + FK_FileId + "'}";

    $.ajax({
        type: "POST",
        url: "FileGridList.asmx/RevalidateInvoiceData",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: function (response) {

            if (response.d != '') {
                var jsonObj = response.d;
                if (jsonObj == "OK") {
                    Swal.fire(
                        'SuccessFull!',
                        'Data has been Revalidate Successfully.',
                        'success'
                    )
                } else if (response.d != "OK") {
                    Swal.fire(
                        'Error!',
                        'Error Occured',
                        'error'
                    )
                }
            }
        },
        error: function (err) {
            alert(err);
        },
        async: true,
        cache: false
    });


}
function btnAlignProduct_ById_Clicked(ProductPKID, MapProducID, FK_FiledIDViewDetail) {
    debugger;
    var thisbtn = $(this);
    var id = ProductPKID; //$(this).attr('_id');
    var FK_FID = FK_FiledIDViewDetail;
    var product = MapProducID;
    // var pid = $('#ddlProduct').val();
    //var ptext = $('#ddlAllProduct').text();
    var ptext = $("#ddlProduct option:selected").text();


    //$('#spinnerAction').css("display", "none");

    swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: "You want to Product Mapped?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        closeOnConfirm: false,
        closeOnCancel: false

    }).then(function (result) {
        if (result.value) {

            $('#spinnerAction').css("display", "block");

            if (product == '-1' || product == '' || product == null) {
                //alert('Select the System Product!');

                Swal.fire(
                    'Alert!',
                    'Select the System Product!',
                    'warning'
                );
                $('#spinnerAction').css("display", "none");
                return false;

            }

            var mydata = "{'Id':'" + id + "','systemProductid':'" + product + "','FK_FileID':'" + FK_FiledIDViewDetail + "'}";

            $.ajax({
                type: "POST",
                url: "ProductAlignmentService.asmx/UpdateAlignProduct_ById_NEW",
                data: mydata,
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                    // $(thisbtn).parents('.divTable').find('.requireError').hide();
                    //$(thisbtn).attr('_distid', '');
                    $('#ddlProduct').val('-1')

                    if (data.d == "Already Exist!") {
                        // $("#divProductMapping").modal('hide');
                        //swal("warning", "already exists", "warning")


                        swal.fire('Warning', 'already exists', 'warning');
                        //Adding By meraj
                        $('.modal').hide();
                        $('.modal-backdrop').hide();


                        //$('#spinnerAction').css("display", "none");
                        setTimeout(function () {
                            //$('#dialog').jqmHide();
                            $('#spinnerAction').css("display", "none");
                        }, 2000);


                    }
                    else if (data.d == "OK") {
                        //  $('#ddlAllClass').val(-1);
                        //  $('#frequency').val('');
                        //   $('#val' + cellval).hide();
                        //   $('.replaceme' + cellval).html('Pending');
                        // $("#divProductMapping").modal('hide');
                        $("#modal3data").empty();

                        swal.fire('Successfull', 'Product has been Mapped', 'success');
                        //Adding By meraj
                        $('.modal').hide();
                        $('.modal-backdrop').hide();
                        // }
                        // });

                        $('.abc').hide();
                        $('#spinnerAction').css("display", "none");


                        //   $(".sysName" + id).text(ptext);

                    }
                    else {

                        Swal.fire({
                            icon: 'error',
                            title: 'Something went wrong.',
                        });
                        return false;
                        //Swal.fire({
                        //    icon: 'warning',
                        //    title: 'This error is not solve from here.',
                        //});

                    }
                    //else {

                    //    Swal.fire({
                    //        icon: 'error',
                    //        title: 'Error Occured.',
                    //    });

                    //}

                },
                //beforeSend: startingAjax1,
                //complete: ajaxCompleted1,
                error: onError,
                async: true,
                cache: false
            });

        }
        $('#spinnerAction').css("display", "none");
    });


}

function startingAjax() {

    $("#spinner").show();

}
function ajaxCompleted() {

    $("#spinner").hide();
}

function startingAjax5() {

    $("#spinner5").show();

}
function ajaxCompleted5() {

    setTimeout(function () {
        $("#spinner5").css("display", "none");
    }, 1000)
}

function startingAjax1() {

    setTimeout(function () {
        $("#spinnerAction").css("display", "block");
    }, 2000)

}
function ajaxCompleted1() {

    setTimeout(function () {
        $("#spinnerAction").css("display", "none");
    }, 2000)
}

//-----------Modal1------------//
$("#btn-closed1").on("click", function () {
    $(".modal").hide();
    $("#modal1data").empty();
    $("#spinner1").css("display", "block");
});

$("#btn-closed2").on("click", function () {
    $(".modal").hide();
    $("#modal1data").empty();
    $("#spinner1").css("display", "block");
});

//-----------Modal2------------//
$("#btnclosed").on("click", function () {
    $(".modal").hide();
    $("#modal2data").empty();
    $("#spinner").css("display", "block");
});

$("#btnclosed2").on("click", function () {
    $(".modal").hide();
    $("#modal2data").empty();
    $("#spinner").css("display", "block");
});

$("#btnclosed4").on("click", function () {
    // $("#myModal3").empty();
    //$(".abc").hide();
    $("#modal3data").empty();
    // $(".modal-backdrop").hide();
    //$("#spinner2").css("display", "block");
});

$("#btnclosed3").on("click", function () {
    // $(".abc").hide();
    //$("#myModal3").empty();
    $("#modal3data").empty();
    //$(".modal-backdrop").hide();
    //$("#spinner2").css("display", "block");
});





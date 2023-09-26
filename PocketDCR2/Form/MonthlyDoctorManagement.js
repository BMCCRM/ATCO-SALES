var date = "";
function pageLoad() {


    zoneDDlCound();
    var cdt = new Date();
    var day = cdt.getDate();

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var current_mint = cdt.getMinutes();
    var current_hrs = cdt.getHours();
    var current_date = cdt.getDate();

    var current_month = cdt.getMonth();
    var month_name = monthNames[current_month];
    var current_year = cdt.getFullYear();

    $('#txtDate').val(month_name + '-' + current_year);
    date = month_name + '-' + current_year;
    IsValidUser();
    startdate = $('#txtDate').val();
    $('#ThDownload').show();
    $('#ThUpload').show();

    $('#txtDate').change(OnChangetxtDate);



    $('#sheetUploader').change(uploadFile);


    if (true) {
        $('#ThUpload').show();


        //$('#uploadify_button').uploadify({
        //    'swf': '../Scripts/Uploadify/uploadify.swf',
        //    'uploader': '../Handler/GetExcel.ashx?date=' + date + '&Type=U',
        //    'width': '140',
        //    'height': '25',
        //    'onUploadSuccess': function (file, data, response) {
        //        $('#dialog').jqm({ modal: true });
        //        $('#dialog').jqm();
        //        $('#dialog').jqmShow();

        //        $.ajax({
        //            url: "../Handler/GetExcel.ashx?date=" + date + "&Type=" + 'PF' + '&FileName=' + file.name,
        //            contentType: "application/json; charset=utf-8",
        //            success: OnCompleteDownload,
        //            beforeSend: startingAjax,
        //            complete: ajaxCompleted,
        //            error: onError
        //        });

        //        $('#dialog').jqmHide();
        //    }
        //});
    }
    else {
        $('#ThUpload').hide();
    }
}

function onCalendarShown() {

    var cal = $find("calendar1");
    cal._switchMode("months", true);

    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.addHandler(row.cells[j].firstChild, "click", call);
            }
        }
    }
}
function onCalendarHidden() {
    var cal = $find("calendar1");

    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.removeHandler(row.cells[j].firstChild, "click", call);
            }
        }
    }
}


function OnChangetxtDate() {
    date = $("input[name*='txtDate']").val();
   
}


function zoneDDlCound() {
    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/fillGHForDcotorExcel",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: onSuccessZone,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });
}
function onSuccessZone(data, status) {
    if (data.d != "") {

        value = '-1';
        name = 'Select ' + $('#Label8').text();

        $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#dG3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }
}

function OnCompleteDownload(data, status) {
    var returndata = data;
    $('#dialog').jqmHide();

    alert(returndata);
}


function IsValidUser() {

    $.ajax({
        type: "POST",
        url: "../Reports/NewDashboard.asmx/IsValidUser",
        contentType: "application/json; charset=utf-8",
        success: onSuccessValidUser,
        error: onError,
        cache: false
    });
}
function onSuccessValidUser(data, status) {

    var stat = data.d;
    if (stat) {
        //  GetCurrentUserLoginID(0);

    }
    else {
        window.location = "/Form/Login.aspx";
    }

}


// Hierarchy Enable / Disable
function ShowHierarchy() {

    $('#col1').show();
    $('#col2').show();
    $('#col3').show();
    $('#col4').show();
    $('#col5').show();
    $('#col6').show();

    $('#col11').show();
    $('#col22').show();
    $('#col33').show();
    $('#col44').show();
    $('#col55').show();
    $('#col66').show();
}
function HideHierarchy() {

    $('#col1').hide();
    $('#col2').hide();
    $('#col3').hide();
    $('#col4').hide();
    $('#col5').hide();
    $('#col6').hide();

    $('#col11').hide();
    $('#col22').hide();
    $('#col33').hide();
    $('#col44').hide();
    $('#col55').hide();
    $('#col66').hide();

    $('#g1').hide();
    $('#g2').hide();
    $('#g3').hide();
    $('#g4').hide();


}
function onError(request, status, error) {

    msg = 'Error occoured';

    $.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });
}
function onErrorDt() {

    $('#dialog').jqmHide();
    msg = 'Date Error';
    $.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });

    $('#dialog').jqmHide();
}
function startingAjax() {
    //  $('#imgLoading').show();
    //    $('#dialog').jqm({ modal: true });
    //    $('#dialog').jqm();
    //    $('#dialog').jqmShow();
}
function ajaxCompleted() {

    // $('#dialog') ();
    //$('.loading').fadeOut('slow');
    //$('.loading_bgrd').fadeOut('slow');
    // $('#imgLoading').hide();
}


function downloadDoctorSheet() {


    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date();





    var monthlist = $("#txtDate").val() || '';


    monthlist.split('-')[0];

    var zoneId = $("#dG3").val();
    var type = 'D';

    if (zoneId == '-1') {

        alert('Zone Must be Selected');
        return
    }



    if (monthlist == '' || monthlist == 'Enter Year - Month') {

        alert('Date Is Must To Be Selected');
        return
    }

    window.open("../Handler/DoctorSheetUploader.ashx?Date=" + monthlist + "&Type=" + type + "&Level5=" + zoneId)


}

function uploadFile() {


    var date = new Date();
    var form = $('#fileForm')[0];
    var data = new FormData(form);
    var formData = new FormData();
    formData.append('file', $('#sheetUploader')[0].files[0]);


    $('#jqmloader').html("<p style=\"color: white;padding-left: 20px;\">Please Wait, Uploading Sheet</p>");
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    startingAjax();


    $.ajax({

        type: "POST",
        url: '../Handler/DoctorSheetUploader.ashx?date=' + ('1-' + (date.getMonth() + 1) + '-' + (date.getFullYear())) + '&Type=U',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data, status) {

            $('#dialog').jqmHide();
            alert('File Uploaded Successfully,\nSystem generated e-mail will ' +
                'be forwarded to mentioned e-mail address in the sheet after proccessing.\n Please wait.');

        },
        error: onError,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });



}
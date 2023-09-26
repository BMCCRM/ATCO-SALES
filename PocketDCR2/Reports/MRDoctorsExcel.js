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

    $('#dG3').select2({
        dropdownParent: $('#col22')
    });

    if (day < 32) {
        $('#ThUpload').show();
        

    $('#uploadify_button').uploadify({
        'swf': '../Scripts/Uploadify/uploadify.swf',
        'uploader': '../Handler/GetExcel.ashx?date=' + date + '&Type=U',
        'width': '140',
        'height': '25',
        //'wmode': 'transparent',
        'onUploadSuccess': function (file, data, response) {
            $('#dialog').jqm({ modal: true });
            $('#dialog').jqm();
            $('#dialog').jqmShow();

            $.ajax({
                url: "../Handler/GetExcel.ashx?date=" + date + "&Type=" + 'PF' + '&FileName=' + file.name,
                contentType: "application/json; charset=utf-8",
                success: OnCompleteDownload,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                error: onError
            });

            $('#dialog').jqmHide();
        }
    });
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
    console.log(date);

    $('#uploadify_button').uploadify({
        'swf': '../Scripts/Uploadify/uploadify.swf',
        'uploader': '../Handler/GetExcel.ashx?date=' + date + '&Type=U',
        'width': '140',
        'height': '25',
        //'wmode': 'transparent',
        'onUploadSuccess': function (file, data, response) {
            $('#dialog').jqm({ modal: true });
            $('#dialog').jqm();
            $('#dialog').jqmShow();

            $.ajax({
                url: "../Handler/GetExcel.ashx?date=" + date + "&Type=" + 'PF' + '&FileName=' + file.name,
                contentType: "application/json; charset=utf-8",
                success: OnCompleteDownload,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                error: onError
            });

            $('#dialog').jqmHide();
        }
    });
}

function zoneDDlCound() {
    $.ajax({
        type: "POST",
        url: "NewReports.asmx/fillGHForDcotorExcel",
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
function onSuccessZone(data,status)
{
    if (data.d != "") {

        value = '-1';
        name = 'Select ' + $('#Label8').text();

        $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#dG3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }
}

function OnChangeddreport() {
    reportvalue = $('#ddlreport').val();

    if (reportvalue != -1) {
        $('#h1').val(reportvalue);

        $('#content-table-inner').show();

        //Daily Calls Report
        if (reportvalue == "1") {
            $('#fdform1').show();
            //$('#fdform').show();
            //$('#Th11').show();
            //$('#Th1').show();
            //            $('#Th22').hide();
            //            $('#Th2').hide();
            //            $('#Th33').show();
            //            $('#Th3').show();
            //            $('#Th44').show();
            //            $('#Th4').show();
            //            $('#Th55').show();
            //            $('#Th5').show();
            //            $('#Th66').show();
            //            $('#Th6').show();
        }
        //Described Products
        if (reportvalue == "2") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').show();
            $('#Th1').show();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').show();
            $('#Th3').show();
            $('#Th44').show();
            $('#Th4').show();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').show();
            $('#Th6').show();
        }
        //Detailed Products Frequency
        if (reportvalue == "3") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').show();
            $('#Th1').show();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').show();
            $('#Th3').show();
            $('#Th44').show();
            $('#Th4').show();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').hide();
            $('#Th6').hide();
        }
        //Detailed Products Frequency By Division
        if (reportvalue == "4") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').show();
            $('#Th1').show();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').show();
            $('#Th3').show();
            $('#Th44').show();
            $('#Th4').show();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').hide();
            $('#Th6').hide();
        }
        //Incoming SMS Summary
        if (reportvalue == "5") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').hide();
            $('#Th1').hide();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').hide();
            $('#Th3').hide();
            $('#Th44').hide();
            $('#Th4').hide();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').show();
            $('#Th6').show();
        }
        //JV By Class
        if (reportvalue == "6") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').hide();
            $('#Th1').hide();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').show();
            $('#Th3').show();
            $('#Th44').show();
            $('#Th4').show();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').hide();
            $('#Th6').hide();
        }
        //KPI By Class
        if (reportvalue == "7") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').show();
            $('#Th1').show();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').show();
            $('#Th3').show();
            $('#Th44').show();
            $('#Th4').show();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').show();
            $('#Th6').show();
        }
        //Message Count
        if (reportvalue == "8") {

            $('#fdform1').hide();
            $('#fdform').hide();
            $('#Th11').hide();
            $('#Th1').hide();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').hide();
            $('#Th3').hide();
            $('#Th44').hide();
            $('#Th4').hide();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').show();
            $('#Th6').show();
        }
        //Monthly Visit Analysis
        if (reportvalue == "9") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').hide();
            $('#Th1').hide();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').hide();
            $('#Th3').hide();
            $('#Th44').hide();
            $('#Th4').hide();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').show();
            $('#Th6').show();
        }
        //MR SMS Accuracy
        if (reportvalue == "10") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').hide();
            $('#Th1').hide();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').hide();
            $('#Th3').hide();
            $('#Th44').hide();
            $('#Th4').hide();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').show();
            $('#Th6').show();
        }
        //MR Doctors
        if (reportvalue == "11") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').hide();
            $('#Th1').hide();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').hide();
            $('#Th3').hide();
            $('#Th44').hide();
            $('#Th4').hide();
            $('#Th55').hide();
            $('#Th5').hide();
            $('#Th66').hide();
            $('#Th6').hide();
        }
        //MRs List
        if (reportvalue == "12") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').hide();
            $('#Th1').hide();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').hide();
            $('#Th3').hide();
            $('#Th44').hide();
            $('#Th4').hide();
            $('#Th55').hide();
            $('#Th5').hide();
            $('#Th66').hide();
            $('#Th6').hide();
        }
        //Sample Issued To Doctor
        if (reportvalue == "13") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').show();
            $('#Th1').show();
            $('#Th22').show();
            $('#Th2').show();
            $('#Th33').show();
            $('#Th3').show();
            $('#Th44').hide();
            $('#Th4').hide();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').show();
            $('#Th6').show();
        }
        //SMS Status
        if (reportvalue == "14") {
            $('#fdform1').hide();
            $('#fdform').hide();
            $('#Th11').hide();
            $('#Th1').hide();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').hide();
            $('#Th3').hide();
            $('#Th44').hide();
            $('#Th4').hide();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').show();
            $('#Th6').show();
        }
        //Visit By Time
        if (reportvalue == "15") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').hide();
            $('#Th1').hide();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').hide();
            $('#Th3').hide();
            $('#Th44').hide();
            $('#Th4').hide();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').show();
            $('#Th6').show();
        }
        //Detailed JV Report
        if (reportvalue == "16") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').hide();
            $('#Th1').hide();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').show();
            $('#Th3').show();
            $('#Th44').hide();
            $('#Th4').hide();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').show();
            $('#Th6').show();
        }
        //JV By Region
        if (reportvalue == "17") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').hide();
            $('#Th1').hide();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').show();
            $('#Th3').show();
            $('#Th44').show();
            $('#Th4').show();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').hide();
            $('#Th6').hide();
        }


        //Planning Report
        if (reportvalue == "18") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').hide();
            $('#Th1').hide();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').hide();
            $('#Th3').hide();
            $('#Th44').hide();
            $('#Th4').hide();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').hide();
            $('#Th6').hide();
        }
        //Monthly Visit Analysis With Planning
        if (reportvalue == "19") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').hide();
            $('#Th1').hide();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').hide();
            $('#Th3').hide();
            $('#Th44').hide();
            $('#Th4').hide();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').show();
            $('#Th6').show();
        }
        //KPI by Class With Planning
        if (reportvalue == "20") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').show();
            $('#Th1').show();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').show();
            $('#Th3').show();
            $('#Th44').show();
            $('#Th4').show();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').show();
            $('#Th6').show();
        }

        //Planning Report FOR JV
        if (reportvalue == "21") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').hide();
            $('#Th1').hide();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').hide();
            $('#Th3').hide();
            $('#Th44').hide();
            $('#Th4').hide();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').hide();
            $('#Th6').hide();
        }

        //Planning Report FOR BMD
        if (reportvalue == "22") {
            $('#fdform1').show();
            $('#fdform').show();
            $('#Th11').hide();
            $('#Th1').hide();
            $('#Th22').hide();
            $('#Th2').hide();
            $('#Th33').hide();
            $('#Th3').hide();
            $('#Th44').hide();
            $('#Th4').hide();
            $('#Th55').show();
            $('#Th5').show();
            $('#Th66').hide();
            $('#Th6').hide();
        }


    } else {

        $('#ddlreport').val(reportvalue);
        $('#content-table-inner').hide();
    }
}

function btnGreports() {

    var l98 = $('#h1').val();
    urlservice = '';
    myreportData = '';

    if (l98 != -1) {

        DCR();
    }
    else {
        url = "report_ifram.aspx";
        var iframe = $('#Reportifram');
        $(iframe).attr('src', url);
        $(iframe).attr('class', "reportcl2");
    }
}

function funDownloadExcel() {
    var monthlist = $("input[name*='txtDate']").val();
    var zoneId = $("#dG3").val();

    if (zoneId != '-1') {
        CallHandler(monthlist, 'D', zoneId);
        
    }
    else {
        alert('Zone Must be Selected');
    }
    //    txtDate
    
    //    var mioid = $('#ddl4').val();
    //    if (mioid != null && mioid != -1) {
    //        var asda = mioid;
    //        
    //    }
    //    else {
    //        alert('Territory Level Must be Selected');
    //    }
}

function CallHandler(monthlist, type,zoneid) {

    if (type = 'D') {
        window.open("../Handler/GetExcel.ashx?date=" + monthlist + "&Type=" + type + "&zone=" + zoneid, "Calls");
    }

    //    myData = "{'emp':'" + employeeid + "', 'Type':'" + type + "'}";

    //    $.ajax({
    //        url: "../Handler/GetExcel.ashx?emp=" + employeeid + "&Type=" + type,
    //        contentType: "application/json; charset=utf-8",
    //        //data: myData,
    //        success: OnCompleteDownload,
    //        error: onError
    //    });

}

function OnCompleteDownload(data, status) {
    var returndata = data;
    $('#dialog').jqmHide();

    alert(returndata);
}

function mydatetem() {

    l1 = 0; l2 = 0;
    l3 = $('#h2').val();
    l4 = $('#h3').val();
    l5 = $('#h4').val();
    l6 = $('#h5').val();

    if (l3 == '-1') {
        l3 = 0;
    }
    if (l4 == '-1') {
        l4 = 0;
    }
    if (l5 == '-1') {
        l5 = 0;
    }
    if (l6 == '-1') {
        l6 = 0;
        l8 = 0;
    }
    else {
        l8 = $('#h6').val();
    }

    l9 = $('#h7').val();
    l7 = $('#h8').val();
    l11 = $('#h9').val();
    l12 = $('#h10').val();
    l13 = $('#stdate').val();
    l14 = $('#enddate').val();

    if (l9 == '-1') { l9 = 0 }
    if (l9 == '') { l9 = 0 }
    if (l7 == '-1') { l7 = 0 }
    if (l11 == '-1') { l11 = 0 }
    if (l12 == '-1') { l12 = 0 }
    l10 = 0;
    var SDate = new Date(l13);
    var EDate = new Date(l14);

    diff = 0;

    if (SDate >= EDate) {
        diff = 1;
    }

    if (diff == 0) {

        servicepath();
        myreportData = "{'level1Id':'" + l1
         + "','level2Id':'" + l2
         + "','level3Id':'" + l3
         + "','level4Id':'" + l4
         + "','level5Id':'" + l5
         + "','level6Id':'" + l6
         + "','skuid':'" + l7
         + "','empid':'" + l8
         + "','drid':'" + l9
         + "','clid':'" + l10
         + "','vsid':'" + l11
         + "','jv':'" + l12
         + "','dt1':'" + l13
         + "','dt2':'" + l14
         + "'}";

    }
    else {
        $('#dialog').jqmHide();
        onErrorDt();
    }
}
function servicepath() {

    l99 = $('#h1').val();

    if (l99 == 1) {
        urlservice = "NewReports.asmx/DailyCallReport"

    }
    else if (l99 == 2) {
        urlservice = "NewReports.asmx/DescribedProducts"
    }
    else if (l99 == 3) {
        urlservice = "NewReports.asmx/DetailedProductFrequency"
    }
    else if (l99 == 4) {
        urlservice = "NewReports.asmx/DetailedProductFrequencyByDivision"
    }
    else if (l99 == 5) {
        urlservice = "NewReports.asmx/IncomingSMSSummary"
    }
    else if (l99 == 6) {
        urlservice = "NewReports.asmx/JVByClass"
    }
    else if (l99 == 7) {
        urlservice = "NewReports.asmx/KPIByClass"
    }
    else if (l99 == 8) {
        urlservice = "NewReports.asmx/MessageCount"
    }
    else if (l99 == 9) {
        urlservice = "NewReports.asmx/MonthlyVisitAnalysis"
    }
    else if (l99 == 10) {
        urlservice = "NewReports.asmx/MRSMSAccuracy"
    }
    else if (l99 == 11) {
        urlservice = "NewReports.asmx/MrDrList"
    }
    else if (l99 == 12) {
        urlservice = "NewReports.asmx/MrList"
    }
    else if (l99 == 13) {
        urlservice = "NewReports.asmx/SampleIssuedToDoc"
    }
    else if (l99 == 14) {
        urlservice = "NewReports.asmx/SmsStatus"
    }
    else if (l99 == 15) {
        urlservice = "NewReports.asmx/VisitByTime"
    }
    else if (l99 == 16) {
        urlservice = "NewReports.asmx/JVReport"
    }
    else if (l99 == 17) {
        urlservice = "NewReports.asmx/JVByRegion"
    }
    else if (l99 == 18) {
        urlservice = "NewReports.asmx/PlanningReport1 "
    }
    else if (l99 == 19) {
        urlservice = "NewReports.asmx/MonthlyVisitAnalysisWithPlanning"
    }
    else if (l99 == 20) {
        urlservice = "NewReports.asmx/KPIByClassWithPlanning"
    }
    else if (l99 == 21) {
        urlservice = "NewReports.asmx/PlanningReportJV"
    }
    else if (l99 == 22) {
        urlservice = "NewReports.asmx/PlanningReportBMD"
    }
}

function DCR() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    //    mydatetem();
    servicepath();

    l1 = 0; l2 = 0;
    l3 = $('#h2').val();
    l4 = $('#h3').val();
    l5 = $('#h4').val();
    l6 = $('#h5').val();

    if (l3 == '-1') {
        l3 = 0;
    }
    if (l4 == '-1') {
        l4 = 0;
    }
    if (l5 == '-1') {
        l5 = 0;
    }
    if (l6 == '-1') {
        l6 = 0;
        l8 = 0;
    }
    else {
        l8 = $('#h6').val();
    }

    l9 = $('#h7').val();
    l7 = $('#h8').val();
    l11 = $('#h9').val();
    l12 = $('#h10').val();
    l13 = $('#stdate').val();
    l14 = $('#enddate').val();

    if (l9 == '-1') { l9 = 0 }
    if (l9 == '') { l9 = 0 }
    if (l7 == '-1') { l7 = 0 }
    if (l11 == '-1') { l11 = 0 }
    if (l12 == '-1') { l12 = 0 }
    l10 = 0;
    var SDate = new Date(l13);
    var EDate = new Date(l14);

    diff = 0;

    if (SDate >= EDate) {
        diff = 0;
    }

    if (diff == 0) {

        myreportData = "{'level1Id':'" + l1
         + "','level2Id':'" + l2
         + "','level3Id':'" + l3
         + "','level4Id':'" + l4
         + "','level5Id':'" + l5
         + "','level6Id':'" + l6
         + "','skuid':'" + l7
         + "','empid':'" + l8
         + "','drid':'" + l9
         + "','clid':'" + l10
         + "','vsid':'" + l11
         + "','jv':'" + l12
         + "','dt1':'" + l13
         + "','dt2':'" + l14
         + "'}";

        $.ajax({
            type: "POST",
            url: urlservice,
            contentType: "application/json; charset=utf-8",
            data: myreportData,
            dataType: "json",
            success: onSuccessDCR,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        onErrorDt();
    }





}
function onSuccessDCR(data, status) {
    var repottyp = $('#h1').val();
    url = "report_ifram.aspx?reporttype=" + repottyp;
    var iframe = $('#Reportifram');
    $(iframe).attr('src', url);
    $(iframe).attr('class', "reportcl");
    $('#dialog').jqmHide();
}

function IsValidUser() {

    $.ajax({
        type: "POST",
        url: "NewDashboard.asmx/IsValidUser",
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

function GetCurrentUser() {

    $.ajax({
        type: "POST",
        url: "../form/CommonService.asmx/GetCurrentUser",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUser,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
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
        url: "../form/CommonService.asmx/GetCurrentUserLoginID",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUserLoginID,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetCurrentUserLoginID(data, status) {

    if (data.d != "") {

        CurrentUserLoginId = data.d;
    }

    GetCurrentUserRole();
}
function GetCurrentUserRole() {

    $.ajax({
        type: "POST",
        url: "../form/CommonService.asmx/GetCurrentUserRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUserRole,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetCurrentUserRole(data, status) {

    if (data.d != "") {

        CurrentUserRole = data.d;


        myData = "{'employeeid':'" + EmployeeId + "' }";

        $.ajax({
            type: "POST",
            url: "NewReports.asmx/getemployeeHR",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessdefaulyHR,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });


    }

    // GetEditableDataLoginId();

    RetrieveAppConfig();
}

function GetEditableDataLoginId() {

    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "datascreen.asmx/GetEmployee",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetEditableDataLoginId,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetEditableDataLoginId(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        EditableDataLoginId = jsonObj[0].LoginId;
    }

    // GetEditableDataRole();
}
function GetEditableDataRole() {

    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "datascreen.asmx/GetEditableDataRole",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetEditableDataRole,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetEditableDataRole(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        EditableDataRole = jsonObj[0].LoweredRoleName;
        modeValue = $('#hdnMode').val();

        if (modeValue == 'AuthorizeMode') {

            CheckAuthorize();
        }
        else if (modeValue == 'EditMode') {

            LoadForEditData();
        }
    }
}
// Enable / Disable DropDownLists Filter With Hierarchy
function RetrieveAppConfig() {

    $.ajax({
        type: "POST",
        url: "../form/CommonService.asmx/GetHierarchyLevels",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetLevels,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetLevels(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        glbVarLevelName = jsonObj[0].SettingName;

        if (glbVarLevelName == "Level3") {

            HierarchyLevel3 = jsonObj[0].SettingValue;
            HierarchyLevel4 = jsonObj[1].SettingValue;
            HierarchyLevel5 = jsonObj[2].SettingValue;
            HierarchyLevel6 = jsonObj[3].SettingValue;
        }

        HideHierarchy();
        EnableHierarchyViaLevel();
    }
}
function EnableHierarchyViaLevel() {

    if (glbVarLevelName == "Level3") {

        if (CurrentUserRole == 'admin') {

            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col4').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();
            $('#col44').show();

            $('#g1').show();
            $('#g2').show();
            $('#g3').show();
            $('#g4').show();


        }
        if (CurrentUserRole == 'rl3') {
            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();

            $('#g1').show();
            $('#g2').show();
            $('#g3').show();


        }
        if (CurrentUserRole == 'rl4') {
            $('#col1').show();
            $('#col2').show();
            $('#col11').show();
            $('#col22').show();

            $('#g1').show();
            $('#g2').show();



        }
        if (CurrentUserRole == 'rl5') {
            $('#col1').show();
            $('#col11').show();

            $('#g1').show();

        }
        GetHierarchySelection();
        FillDropDownList();
    }
}

function GetHierarchySelection() {

    myData = "{'systemUserId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/GetHierarchySelection",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetHierarchySelection,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetHierarchySelection(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            //            if (glbVarLevelName == "Level3") {

            level3Id = jsonObj[0].LevelId3;
            level4Id = jsonObj[0].LevelId4;
            level5Id = jsonObj[0].LevelId5;
            level6Id = jsonObj[0].LevelId6;
            //  }
        }
    }

}


function FillDropDownList() {

    myData = "{'levelName':'" + glbVarLevelName + "' }";

    $.ajax({
        type: "POST",
        url: "datascreen.asmx/FilterDropDownList",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: onSuccessFillDropDownList,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessFillDropDownList(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (glbVarLevelName == "Level3") {

            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";

            value = '-1';

            if (CurrentUserRole == 'admin') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel6 + " " + "MIO");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl3') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel6 + " " + "MIO ");


                $('#Label5').append(HierarchyLevel4 + " " + "Level ");
                $('#Label6').append(HierarchyLevel5 + " " + "Level ");
                $('#Label7').append(HierarchyLevel6 + " " + "Level ");



            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel6 + " " + "MIO ");

                $('#Label5').append(HierarchyLevel5 + " " + "Level ");
                $('#Label6').append(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "MIO ");
                $('#Label5').append(HierarchyLevel6 + " " + "Level ");
            }


            name = 'Select ' + $('#Label1').text();
            $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }




        FillGh();
    }
}

function FillAllBricks() {

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/FillAllBricks",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessFillAllBricks,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}
function onSuccessFillAllBricks(data, status) {

    if (data.d != "") {
        value = '-1';
        name = 'Select ALL Brick';

        $("#b2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#b2").append("<option value='" + tweet.LevelId + "'>" + tweet.LevelName + "</option>");
        });

    }
}

function FillMRBricks() {


    if (CurrentUserRole == 'admin') {
        levelValue = $('#ddl4').val();
    }
    if (CurrentUserRole == 'rl3') {

        levelValue = $('#ddl3').val();

    }
    if (CurrentUserRole == 'rl4') {

        levelValue = $('#ddl2').val();


    }
    if (CurrentUserRole == 'rl5') {

        levelValue = $('#ddl1').val();
    }

    myData = "{'employeeid':'" + levelValue + "' }";

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/FillMRBricks",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessMRBricks,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}
function onSuccessMRBricks(data, status) {

    if (data.d != "") {
        value = '-1';
        name = 'Select MR Brick';

        document.getElementById('b1').innerHTML = "";

        $("#b1").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#b1").append("<option value='" + tweet.LevelId + "'>" + tweet.LevelName + "</option>");
        });

    }
}

function FillMRDr() {

    if (CurrentUserRole == 'admin') {
        levelValue = $('#ddl4').val();
    }
    if (CurrentUserRole == 'rl3') {

        levelValue = $('#ddl3').val();

    }
    if (CurrentUserRole == 'rl4') {

        levelValue = $('#ddl2').val();


    }
    if (CurrentUserRole == 'rl5') {

        levelValue = $('#ddl1').val();
    }


    myData = "{'employeeid':'" + levelValue + "' }";

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/FillMrDR",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessMRDr,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}
function onSuccessMRDr(data, status) {

    if (data.d != "") {
        value = '-1';
        name = 'Select MR Doctors';

        document.getElementById('ddlDR').innerHTML = "";

        $("#ddlDR").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddlDR").append("<option value='" + tweet.DoctorId + "'>" + tweet.DoctorName + "</option>");
        });

    }
}

function FillProductSku() {

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/FillProduct",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessFillProduct,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}
function onSuccessFillProduct(data, status) {

    if (data.d != "") {
        value = '-1';
        name = 'Select All Product';

        $("#ddlProduct").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddlProduct").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });

    }
}

function FillGh() {

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/fillGH",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessFillGH,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}
function onSuccessFillGH(data, status) {

    document.getElementById('dG1').innerHTML = "";
    document.getElementById('dG2').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label5').text();

    $("#dG1").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });

}


function defaulyHR() {

    myData = "{'employeeid':'" + EmployeeId + "' }";

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/getemployeeHR",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessdefaulyHR,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessdefaulyHR(data, status) {

    if (data.d != "") {

        if (CurrentUserRole == 'admin') { }
        if (CurrentUserRole == 'rl3') {
            $('#h2').val(data.d[0].LevelId3);
            $('#h3').val(-1);
            $('#h4').val(-1);
            $('#h5').val(-1);
        }
        if (CurrentUserRole == 'rl4') {
            $('#h2').val(data.d[0].LevelId3);
            $('#h3').val(data.d[0].LevelId4);
            $('#h4').val(-1);
            $('#h5').val(-1);
        }
        if (CurrentUserRole == 'rl5') {
            $('#h2').val(data.d[0].LevelId3);
            $('#h3').val(data.d[0].LevelId4);
            $('#h4').val(data.d[0].LevelId5);
            $('#h5').val(-1);
        }
        if (CurrentUserRole == 'rl6') {
            $('#h2').val(data.d[0].LevelId3);
            $('#h3').val(data.d[0].LevelId4);
            $('#h4').val(data.d[0].LevelId5);
            $('#h5').val(data.d[0].LevelId6);
            $('#h6').val(EmployeeId);
        }

    }
}


function OnChangeddl1() {


    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#ddl1').val();
    myData = "{'employeeId':'" + levelValue + "' }";

    document.getElementById('ddlDR').innerHTML = "";


    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl1,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });

    }
    else {
        $('#dG1').val(-1);

        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";

        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
    }



    $('#dialog').jqmHide();

}
function OnChangeddl2() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    document.getElementById('ddlDR').innerHTML = "";



    levelValue = $('#ddl2').val();
    myData = "{'employeeId':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl2,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    } else {
        $('#dG2').val(-1);
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";

        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
    }

    $('#dialog').jqmHide();
}
function OnChangeddl3() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    document.getElementById('ddlDR').innerHTML = "";



    levelValue = $('#ddl3').val();
    myData = "{'employeeId':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl3,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        $('#dG3').val(-1);
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
    }

    $('#dialog').jqmHide();
}
function OnChangeddl4() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    document.getElementById('ddlDR').innerHTML = "";

    //    $('#ThDownload').show();
    //    $('#ThUpload').show();


    levelValue = $('#ddl4').val();
    if (levelValue != -1) {

        myData = "{'employeeid':'" + levelValue + "' }";
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/getemployeeHR",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl14,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {

        $('#dG4').val(-1)

    }


    $('#dialog').jqmHide();
}
function OnChangeddl5() { }
function onSuccessFillddl1(data, status) {

    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";

    document.getElementById('dG2').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';

        name = 'Select ' + $('#Label2').text();
        $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

        levelValue = $('#ddl1').val();

        if (levelValue != -1) {
            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "NewReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl11,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {

            $('#dG1').val(-1)

        }

    }

    //if (CurrentUserRole == 'rl4') {
    levelValue = $('#ddl1').val();
    if (levelValue != -1) {
        myData = "{'employeeid':'" + levelValue + "' }";
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/getemployeeHR",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl11,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    // }

}
function onSuccessFillddl2(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";

    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select ' + $('#Label3').text();
        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

        levelValue = $('#ddl2').val();
        //levelValue = -1;
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "NewReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl12,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {

            $('#dG2').val(-1)

        }

    }



    if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddl2').val();
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "newReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl12,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }


    }

}
function onSuccessFillddl3(data, status) {
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        value = '-1';

        name = 'Select ' + $('#Label4').text();
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });


        levelValue = $('#ddl3').val();
        //levelValue = -1;
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "newReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl13,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {

            $('#dG3').val(-1)

        }
    }

    if (CurrentUserRole == 'rl3') {
        levelValue = $('#ddl3').val();
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "NewReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl13,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
    }

}
function onSuccessFillddl4(data, status) {

}
function onSuccessFillddl5(data, status) { }

function dg1() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#dG1').val();
    myData = "{'level3Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/fillGH_L3",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG1,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });


    }
    else {
        $('#ddl1').val(-1)
        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";

        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";

        document.getElementById('ddlDR').innerHTML = "";

    }




    $('#dialog').jqmHide();
}
function dg2() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    levelValue = $('#dG2').val();
    myData = "{'level4Id':'" + levelValue + "' }";
    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/fillGH_L4",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG2,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });


    }
    else {
        $('#ddl2').val(-1)
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddlDR').innerHTML = "";

    }


    $('#dialog').jqmHide();


}
function dg3() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#dG3').val();
    myData = "{'level5Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/fillGH_L5",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG3,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });


    }
    else {
        $('#ddl3').val(-1)

        document.getElementById('dG4').innerHTML = "";

        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddlDR').innerHTML = "";

    }

    $('#dialog').jqmHide();
}
function dg4() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    // G3d();
    //$('#ddl4').val
    //FillMRDr();
    $('#h6').val(levelValue);

    $('#dialog').jqmHide();
}

function OnChangeddG1() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#dG1').val();
    myData = "{'level3Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/fillGH_L3",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG1,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });

        G3a();
    }
    else {
        $('#ddl1').val(-1)
        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";

        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";

        document.getElementById('ddlDR').innerHTML = "";

    }


    $('#dialog').jqmHide();
}
function OnChangeddG2() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    levelValue = $('#dG2').val();
    myData = "{'level4Id':'" + levelValue + "' }";
    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/fillGH_L4",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG2,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });

        G3b();
    }
    else {
        $('#ddl2').val(-1)
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddlDR').innerHTML = "";

    }


    $('#dialog').jqmHide();


}
function OnChangeddG3() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#dG3').val();
    myData = "{'level5Id':'" + levelValue + "' }";
    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/fillGH_L5",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG3,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });

        G3c();
    }
    else {
        $('#ddl3').val(-1)

        document.getElementById('dG4').innerHTML = "";

        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddlDR').innerHTML = "";

    }

    $('#dialog').jqmHide();
}
function OnChangeddG4() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    $('#ThDownload').show();
    $('#ThUpload').show();


    G3d();

    //FillMRDr();

    $('#dialog').jqmHide();
}
function onSuccessG1(data, status) {
    document.getElementById('dG2').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label6').text();;


    $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });


}
function onSuccessG2(data, status) {
    //    document.getElementById('ddl3').innerHTML = "";
    //    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label7').text();

    $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });

}
function onSuccessG3(data, status) {
    // document.getElementById('ddl4').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label8').text();

    $("#dG4").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });

}


function UH3() {
    document.getElementById('ddlDR').innerHTML = "";

    levelValue = $('#ddl1').val();
    myData = "{'employeeId':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessUH3,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });

    }

}
function UH4() {
    levelValue = $('#ddl2').val();
    myData = "{'employeeId':'" + levelValue + "' }";
    document.getElementById('ddlDR').innerHTML = "";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessUH4,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
}
function UH5() {
    levelValue = $('#ddl3').val();
    myData = "{'employeeId':'" + levelValue + "' }";
    document.getElementById('ddlDR').innerHTML = "";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessUH5,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }

}
function UH6() {

}
function onSuccessUH3(data, status) {

    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select ' + $('#Label2').text();

        $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }

}
function onSuccessUH4(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        value = '-1';
        name = 'Select ' + $('#Label3').text();
        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }


}
function onSuccessUH5(data, status) {

    document.getElementById('ddl4').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select ' + $('#Label4').text();
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }

}

function G3a() {

    setvalue();

    if (CurrentUserRole == 'admin') {

        $('#h2').val($('#dG1').val());
        level3 = $('#dG1').val();
        level4 = 0;
        level5 = 0;
        level6 = 0;
        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl3') {

        $('#h2').val(level3Id);
        $('#h3').val($('#dG1').val());

        level3 = level3Id;
        level4 = $('#dG1').val();
        level5 = 0;
        level6 = 0;
        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl4') {

        $('#h2').val(level3Id);
        $('#h3').val(level4Id);
        $('#h4').val($('#dG1').val());


        level3 = level3Id;
        level4 = level4Id;
        level5 = $('#dG1').val();
        level6 = 0;
        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";



    }
    if (CurrentUserRole == 'rl5') {

        $('#h2').val(level3Id);
        $('#h3').val(level4Id);
        $('#h4').val(level5Id);
        $('#h5').val($('#dG1').val());

        level3 = level3Id;
        level4 = level4Id;
        level5 = level5Id;
        level6 = $('#dG1').val();
        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
    }


    $.ajax({
        type: "POST",
        url: "NewReports.asmx/Fillemp",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessG3a,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });


}
function G3b() {
    setvalue();
    if (CurrentUserRole == 'admin') {
        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());

        level3 = $('#dG1').val();
        level4 = $('#dG2').val();
        level5 = 0;
        level6 = 0;
        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl3') {

        $('#h2').val(level3Id);
        $('#h3').val($('#dG1').val());
        $('#h4').val($('#dG2').val());

        level3 = level3Id;
        level4 = $('#dG1').val();
        level5 = $('#dG2').val();
        level6 = 0;
        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl4') {

        $('#h2').val(level3Id);
        $('#h3').val(level4Id);
        $('#h4').val($('#dG1').val());
        $('#h5').val($('#dG2').val());

        level3 = level3Id;
        level4 = level4Id;
        level5 = $('#dG1').val();
        level6 = $('#dG2').val();
        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";



    }

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/Fillemp",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessG3b,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}
function G3c() {
    setvalue();
    if (CurrentUserRole == 'admin') {
        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());
        $('#h4').val($('#dG3').val());


        level3 = $('#dG1').val();
        level4 = $('#dG2').val();
        level5 = $('#dG3').val();
        level6 = 0;
        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl3') {

        $('#h2').val(level3Id);
        $('#h3').val($('#dG1').val());
        $('#h4').val($('#dG2').val());
        $('#h5').val($('#dG3').val());


        level3 = level3Id;
        level4 = $('#dG1').val();
        level5 = $('#dG2').val();
        level6 = $('#dG3').val();

        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
    }

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/Fillemp",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessG3c,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });
}
function G3d() {
    setvalue();
    level3 = $('#dG1').val();
    level4 = $('#dG2').val();
    level5 = $('#dG3').val();
    level6 = $('#dG4').val();

    $('#h2').val($('#dG1').val());
    $('#h3').val($('#dG2').val());
    $('#h4').val($('#dG3').val());
    $('#h5').val($('#dG4').val());


    myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/Fillemp",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessG3d,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });
}
function onSuccessG3a(data, status) {

    if (data.d != '') {

        $('#ddl1').val(data.d[0].Item1)

        if (CurrentUserRole == 'rl5') {
            $('#h6').val(data.d[0].Item1)
            //FillMRDr();
        }
        if (CurrentUserRole == 'admin') {
            UH3();

        }
        if (CurrentUserRole == 'rl4') {
            UH3();
        }
        if (CurrentUserRole == 'rl3') {
            UH3();

        }

    }

}
function onSuccessG3b(data, status) {
    $('#ddl2').val(data.d[0].Item1)

    if (CurrentUserRole == 'rl4') {
        $('#h6').val(data.d[0].Item1)
        //FillMRDr();
    }

    if (CurrentUserRole == 'admin') {

        UH4();
    }
    if (CurrentUserRole == 'rl3') {

        UH4();
    }
}
function onSuccessG3c(data, status) {
    if (data.d != '') {
        $('#ddl3').val(data.d[0].Item1)

        if (CurrentUserRole == 'rl3') {
            $('#h6').val(data.d[0].Item1)
            //FillMRDr();
        }

        if (CurrentUserRole == 'admin') {
            UH5();

        }
    }
}
function onSuccessG3d(data, status) {
    if (data.d != '') {
        $('#ddl4').val(data.d[0].Item1)
        $('#h6').val(data.d[0].Item1);

        UH6();
    }
    // FillMRDr();
}

function onSuccessFillddl11(data, status) {
    setvalue();
    if (CurrentUserRole == 'admin') {

        $('#dG1').val(data.d[0].LevelId3)
        $('#h2').val(data.d[0].LevelId3)
        dg1();
    }
    if (CurrentUserRole == 'rl3') {
        $('#dG1').val(data.d[0].LevelId4)
        $('#h2').val(data.d[0].LevelId4)
        $('#h3').val(data.d[0].LevelId3)
        dg1();

    }
    if (CurrentUserRole == 'rl4') {
        $('#dG1').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)
        dg1();

    }
    if (CurrentUserRole == 'rl5') {
        $('#dG1').val(data.d[0].LevelId6)
        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)
        $('#h5').val(data.d[0].LevelId6)

        newemployee = $('#ddl1').val();
        $('#h6').val(newemployee);

        //FillMRDr();
    }
}
function onSuccessFillddl12(data, status) {
    setvalue();
    if (CurrentUserRole == 'admin') {
        $('#dG1').val(data.d[0].LevelId3)
        $('#dG2').val(data.d[0].LevelId4)

        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)

        dg2();
    }
    if (CurrentUserRole == 'rl3') {
        $('#dG2').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)
        // $('#h5').val(data.d[0].LevelId6)
        dg2();
    }
    if (CurrentUserRole == 'rl4') {
        $('#dG2').val(data.d[0].LevelId6)
        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)
        $('#h5').val(data.d[0].LevelId6)

        newemployee = $('#ddl2').val();
        $('#h6').val(newemployee);

        //FillMRDr();

    }

    //OnChangeddG2();
}
function onSuccessFillddl13(data, status) {
    setvalue();
    if (CurrentUserRole == 'admin') {
        $('#dG1').val(data.d[0].LevelId3)
        $('#dG2').val(data.d[0].LevelId4)
        $('#dG3').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)
        dg3();
    }

    if (CurrentUserRole == 'rl3') {
        $('#dG3').val(data.d[0].LevelId6)
        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)
        $('#h5').val(data.d[0].LevelId6)

        newemployee = $('#ddl3').val();
        $('#h6').val(newemployee);

        //FillMRDr();


    }


    //OnChangeddG3();
}
function onSuccessFillddl14(data, status) {
    setvalue();
    $('#dG1').val(data.d[0].LevelId3)
    $('#dG2').val(data.d[0].LevelId4)
    $('#dG3').val(data.d[0].LevelId5)
    $('#dG4').val(data.d[0].LevelId6)


    $('#h2').val(data.d[0].LevelId3)
    $('#h3').val(data.d[0].LevelId4)
    $('#h4').val(data.d[0].LevelId5)
    $('#h5').val(data.d[0].LevelId6)

    dg4();
    //OnChangeddG4();


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

function setvalue() {

    $('#h2').val(-1);
    $('#h3').val(-1);
    $('#h4').val(-1);
    $('#h5').val(-1);
    $('#h6').val(-1);
}
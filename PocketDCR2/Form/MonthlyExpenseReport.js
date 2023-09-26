/// <reference path="marketingplansamplenew.asmx" />
var adminExpenseID = 4965;
var expenseIDtoDelete = -2;
var MonthlyExpenseIds = 0
var ExpenseDate = '';
var ExpenseEmployeeId = 0;
var EmployeeId = 0;
var employeeids = [];
var expenseIds = [];
var l1, l2, l3, l4, l5, l6, l7;

$(document).ready(function () {
    //jQuery.noConflict();
    //$('#newloader').hide();
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#btnOk').click(btnOkClicked);
    $('#btnYesForcursor').click(btnYesClickedForCursor);
    $('#btnNoForCursor').click(btnNoClickedForCursor);
    $('#DivForCursor').jqm({ modal: true });
    $('#divConfirmation').jqm({ modal: true });
    $('#Divmessage').jqm({ modal: true });
    $('#DivForApproval').jqm({ modal: true });
    $('#DivForApproval1').jqm({ modal: true });
    $('#BtnSearch').click(BtnLoadData);

    var cdt = new Date();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var current_mint = cdt.getMinutes();
    var current_hrs = cdt.getHours();
    var current_date = cdt.getDate();
    var current_month = cdt.getMonth();
    var month_name = monthNames[current_month];
    var current_year = cdt.getFullYear();
    var current_month2 = cdt.getMonth();
    var current_month2 = current_month2 + 1;

    if (current_date == 1) {
        var current_date2 = current_date;
    }
    else {
        var current_date2 = current_date - 1;
    }

    $('#txtDate').val(month_name + '-' + current_year);
    $('#stdate').val(current_month2 + '/' + current_date2 + '/' + current_year);
    $('#enddate').val(current_month2 + '/' + current_date + '/' + current_year);
    $('#txtDate').change(OnChangedtxtDate);
    $('#create_button').click(function () {
        InsertExpenseMonthly();
    });
    //$('#ddlDataType').change(GridDataType);
    HideHierarchy();
    //$('#colT').hide();
    //$('#colTT').hide();
    l13 = $('#stdate').val();
    l14 = $('#enddate').val();

    IsValidUser();
    //$('#ddlT').change(OnChangeddlTeam);
    $q('#ddl1').change(OnChangeddl1);
    $q('#ddl2').change(OnChangeddl2);
    $q('#ddl3').change(OnChangeddl3);
    $q('#ddl4').change(OnChangeddl4);
    $q('#ddl5').change(OnChangeddl5);
    $q('#ddl6').change(OnChangeddl6);

    $q('#dG1').change(OnChangeddG1);
    $q('#dG2').change(OnChangeddG2);
    $q('#dG3').change(OnChangeddG3);
    $q('#dG4').change(OnChangeddG4);
    $q('#dG5').change(OnChangeddG5);
    $q('#dG6').change(OnChangeddG6);
    $q('#dG7').change(ONteamChnageGetlevel);

    $q('#dG1').select2({
        dropdownParent: $('#g1')
    });
    $q('#dG2').select2({
        dropdownParent: $('#g2')
    });
    $q('#dG3').select2({
        dropdownParent: $('#g3')
    });
    $q('#dG4').select2({
        dropdownParent: $('#g4')
    });
    $q('#dG5').select2({
        dropdownParent: $('#g5')
    });
    $q('#dG6').select2({
        dropdownParent: $('#g6')
    });
    $q('#dG7').select2({
        dropdownParent: $('#g7')
    });

    $q('#ddlTeam').select2({
        dropdownParent: $('#col77')
    });
    $q('#ddl1').select2({
        dropdownParent: $('#col11')
    });
    $q('#ddl2').select2({
        dropdownParent: $('#col22')
    });
    $q('#ddl3').select2({
        dropdownParent: $('#col33')
    });
    $q('#ddl4').select2({
        dropdownParent: $('#col44')
    });
    $q('#ddl5').select2({
        dropdownParent: $('#col55')
    });
    $q('#ddl6').select2({
        dropdownParent: $('#col66')
    });
    $q('#ddlDesig').select2({
        dropdownParent: $('#ThDesign')
    });

    HideHierarchy();
    GetCurrentUser();

    //Select All Working the Expense Approval strt
    $('#checkAll').change(function () {
        if ($(this).attr('checked')) {
            $('input[type=checkbox]').attr('checked', true);
        }
        else {
            $('input[type=checkbox]').removeAttr('checked');
        }
    });

    //Select All Working the Expense Approval end


    //LoadData('0', '0');

    //levelValue = $q('#ddl1').val();

    $('#btnDetailsSubmit').click(function () {
        debugger
        ApproveOrRejectAll();
        if ($('#ddlStatus option:selected').val() != '') {
            if (employeeids.length == 0 && expenseIds.length == 0) {
                var r = confirm("Are you sure you want to submit ?");
                if (r == true) {
                    $.ajax({
                        type: "POST",
                        url: "MonthlyExpenseReport.asmx/SetExpenseApproval",
                        data: "{'EmployeeId':'" + MonthlyExpenseEmployee + "','EmployeeExpenseMonthlyId':'" + MonthlyExpenseIds + "','LevelName':'" + CurrentUserRole + "','ApprovalStatus':'" + $('#ddlStatus option:selected').val() + "','ApprovalAmount':'" + $('#Amount').val() + "','ApprovalComment':'" + $('#Comments').val() + "','Row':'Single'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function () {
                            window.location.reload(true);
                        },
                        error: onError,
                        cache: false,
                        async: false,
                        beforeSend: startingAjax,
                        complete: ajaxCompleted
                    });
                }
                employeeids = [];
                expenseIds = [];
            } else {
                var r = confirm("Are you sure you want to submit ?");
                if (r == true) {
                    $.ajax({
                        type: "POST",
                        url: "MonthlyExpenseReport.asmx/SetExpenseApproval",
                        data: "{'EmployeeId':'" + employeeids.toString() + "','EmployeeExpenseMonthlyId':'" + expenseIds.toString() + "','LevelName':'" + CurrentUserRole + "','ApprovalStatus':'" + $('#ddlStatus option:selected').val() + "','ApprovalAmount':'" + $('#Amount').val() + "','ApprovalComment':'" + $('#Comments').val() + "','Row':'Multiple'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function () {
                            window.location.reload(true);
                        },
                        error: onError,
                        cache: false,
                        async: false,
                        beforeSend: startingAjax,
                        complete: ajaxCompleted
                    });
                }
                employeeids = [];
                expenseIds = [];
            }
        }
        else {
            alert('Status Should be selected..');
        }
    });

    $('#btnDetailsCancel').click(function () {
        $('#DivForApproval').jqmHide();
    });
    // Reimbursment Approval
    $('#btnDetailsSubmit1').click(function () {
        if ($('#ddlStatus1 option:selected').val() != '') {
            if (employeeids.length == 0 && expenseIds.length == 0) {
                var r = confirm("Are you sure you want to submit ?");
                if (r == true) {
                    $.ajax({
                        type: "POST",
                        url: "MonthlyExpenseReport.asmx/SetExpenseReimbursmentApproval",
                        data: "{'EmployeeId':'" + MonthlyExpenseEmployee + "','EmployeeExpenseMonthlyId':'" + MonthlyExpenseIds + "','LevelName':'" + CurrentUserRole + "','ApprovalStatus':'" + $('#ddlStatus1 option:selected').val() + "','ApprovalAmount':'" + $('#Amount1').val() + "','ApprovalComment':'" + $('#Comments1').val() + "','Row':'Single'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function () {
                            window.location.reload(true);
                        },
                        error: onError,
                        cache: false,
                        async: false,
                        beforeSend: startingAjax,
                        complete: ajaxCompleted
                    });
                }
                employeeids = [];
                expenseIds = [];
            } else {
                var r = confirm("Are you sure you want to submit ?");
                if (r == true) {
                    $.ajax({
                        type: "POST",
                        url: "MonthlyExpenseReport.asmx/SetExpenseReimbursmentApproval",
                        data: "{'EmployeeId':'" + employeeids.toString() + "','EmployeeExpenseMonthlyId':'" + expenseIds.toString() + "','LevelName':'" + CurrentUserRole + "','ApprovalStatus':'" + $('#ddlStatus option:selected').val() + "','ApprovalAmount':'" + $('#Amount').val() + "','ApprovalComment':'" + $('#Comments').val() + "','Row':'Multiple'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function () {
                            window.location.reload(true);
                        },
                        error: onError,
                        cache: false,
                        async: false,
                        beforeSend: startingAjax,
                        complete: ajaxCompleted
                    });
                }
                employeeids = [];
                expenseIds = [];
            }
        }
        else {
            alert('Status Should be selected..');
        }
    });

    $('#btnDetailsCancel1').click(function () {
        $('#DivForApproval1').jqmHide();
    });

    // Reimbursment Approval
});

function BtnLoadData() {
    l13 = $('#stdate').val();
    l14 = $('#enddate').val();

    LoadData('1', l13, l14);

}

function GridDataType() {
    l13 = $('#stdate').val();
    l14 = $('#enddate').val();
    if ($('#ddlDataType').val() == 2) {

        //$('#colT').show();
        //$('#colTT').show();
        IsValidUser();
        //$('#ddlT').change(OnChangeddlTeam);
        $q('#ddl1').change(OnChangeddl1);
        $q('#ddl2').change(OnChangeddl2);
        $q('#ddl3').change(OnChangeddl3);
        $q('#ddl4').change(OnChangeddl4);
        $q('#ddl5').change(OnChangeddl5);
        $q('#ddl6').change(OnChangeddl6);

        $q('#dG1').change(OnChangeddG1);
        $q('#dG2').change(OnChangeddG2);
        $q('#dG3').change(OnChangeddG3);
        $q('#dG4').change(OnChangeddG4);
        $q('#dG5').change(OnChangeddG5);
        $q('#dG6').change(OnChangeddG6);
        $q('#dG7').change(ONteamChnageGetlevel);

        HideHierarchy();
        GetCurrentUser();

    }
    else {
        //$('#colT').hide();
        //$('#colTT').hide();
        HideHierarchy();
        //LoadData('0', '0');
        LoadData('0', l13, l14);
    }
}
function funDownloadExcel() {
    $.ajax({
        type: "POST",
        url: "MonthlyExpenseReport.asmx/Dailyallowance",
        contentType: "application/json; charset=utf-8",
        success: onSuccessDailyallowance,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessDailyallowance(response) {
    alert(response.d);
}

//function GetTeams() {
//    //var empid = (EmployeeId == 1) ? '0' : EmployeeId;
//    var empid = 0;
//    $.ajax({
//        type: "POST",
//        url: "../Reports/datascreen.asmx/GetTeams",
//        contentType: "application/json; charset=utf-8",
//        data: "{'empid':'" + empid + "'}",
//        success: onSuccessGetTeams,
//        error: onError,
//        cache: false,
//        asyn: false
//    });
//}
//function onSuccessGetTeams(data, status) {
//    document.getElementById('ddlT').innerHTML = "";

//    if (data.d != "") {

//        jsonObj = jsonParse(data.d);

//        value = '-1';
//        name = 'Select Team';
//        $("#ddlT").append("<option value='" + value + "'>" + name + "</option>");

//        $.each(jsonObj, function (i, tweet) {
//            $("#ddlT").append("<option value='" + jsonObj[i].id + "'>" + jsonObj[i].TeamName + "</option>");
//        });
//    }
//}

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

    }
    else {
        window.location = "/Form/Login.aspx";
    }

}

function setvalue() {

    $('#h2').val(-1);
    $('#h3').val(-1);
    $('#h4').val(-1);
    $('#h5').val(-1);
    $('#h6').val(-1);

}

function btnYesClickedForCursor() {

    $.ajax({
        type: "POST",
        url: "MonthlyExpenseReport.asmx/GenerateCursorForCurrentDay",
        data: "{'Employeeid':'" + ExpenseEmployeeId + "','date':'" + ExpenseDate + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessCursor,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

}

function btnNoClickedForCursor() {

    $('#DivForCursor').jqmHide();
    //$('#hdnMode').val("AddMode");
    //ClearFields();
    ajaxCompleted();
    return false;
}

function btnYesClicked() {

    if (expenseIDtoDelete > -1 && $('#hdnMode').val() == 'DeleteMode') {
        $.ajax({
            type: "POST",
            url: "MonthlyExpenseReport.asmx/DeleteMonthlyExpense",
            data: "{'MonthlyExpenseId':'" + expenseIDtoDelete + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessDelete,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }




    /*myData = "{'CityId':'" + CityId + "'}";
    
    $.ajax({
    type: "POST",
    url: "Cities.asmx/DeleteCity",
    data: myData,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: onSuccess,
    error: onError,
    beforeSend: startingAjax,
    complete: ajaxCompleted,
    cache: false
    });*/
}

function btnNoClicked() {

    $('#divConfirmation').jqmHide();
    $('#hdnMode').val("AddMode");
    //ClearFields();
    ajaxCompleted();
    return false;
}

function btnOkClicked() {

    $('#Divmessage').jqmHide();
    $('#hdnMode').val("AddMode");
    $('#hlabmsg').val("");
    //$("#btnRefresh").trigger('click');
    //ClearFields();
    ajaxCompleted();
    return false;
}

function onError(request, status, error) {

    msg = 'Error is occured';
    $('#hlabmsg').append(msg);
    $('#Divmessage').jqmShow();
    return false;

}

function startingAjax() {

    $('#divConfirmation').jqmHide();
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    //$('#newloader').show();
    //$('#dialog').jqm({ modal: true });
    //$('#dialog').jqm();
    //$('#dialog').jqmShow();
}
function ajaxCompleted() {

    //$('#newloader').hide();
    $('#dialog').jqmHide();
}

function LoadData(flag, startDate, endDate) {
    //l13 = $('#stdate').val();
    //l14 = $('#enddate').val();
    debugger
    startDate = $('#stdate').val();
    endDate = $('#enddate').val();

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
        l7 = $q('#dG7').val()

        mio = $q('#ddl6').val();
        zsm = $q('#ddl5').val();
    }
    if (CurrentUserRole == 'marketingteam') {
        mio = $q('#ddl6').val();
        zsm = $q('#ddl5').val();
    }
    else if (CurrentUserRole == 'rl1') {
        l7 = $q('#dG3').val()

        mio = $q('#ddl5').val();
        zsm = $q('#ddl4').val();
    }
    else if (CurrentUserRole == 'rl2') {
        l7 = $q('#dG2').val()

        mio = $q('#ddl4').val();
        zsm = $q('#ddlTeam').val();
    }
    else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        l7 = $q('#dG1').val()

        mio = $q('#ddlTeam').val();
        zsm = $q('#ddl3').val();
    }
    else if (CurrentUserRole == 'rl4') {
        l7 = $q('#dG1').val()

        mio = $q('#ddlTeam').val();
        zsm = $q('#ddl2').val();
    }
    else if (CurrentUserRole == 'rl5') {
        l7 = 0;

        mio = $q('#ddl1').val();
        zsm = EmployeeId;
    }
    else if (CurrentUserRole == 'rl6') {
        l7 = 0;

        mio = EmployeeId;
        zsm = '0';
    }

    l1 = $('#h2').val();
    l2 = $('#h3').val();
    l3 = $('#h4').val();
    l4 = $('#h5').val();
    l5 = $('#h12').val();
    l6 = $('#h13').val();
    EmpStatus = $('#EmpStatus').val();

    if (CurrentUserRole == 'headoffice') {
        l1 = 0;
        l2 = 0;
        l3 = 0;
    }

    if (l1 == '-1') {
        l1 = 0;
    }
    if (l2 == '-1') {
        l2 = 0;
    }
    if (l3 == '-1') {
        l3 = 0;
    }
    if (l4 == '-1') {
        l4 = 0;
    }
    if (l5 == '-1') {
        l5 = 0;
    }
    else if (zsm == '-1' || zsm == null) {
        l5 = 0;
    }

    if (l6 == '-1') {
        l6 = 0;
        l8 = 0;
    }
    else if (mio == '-1' || mio == null) {
        l6 = 0;
        l8 = 0;
    }
    else {
        l8 = mio;
    }

    l11 = $('#h9').val();
    l12 = $('#h10').val();


    if (l7 == '-1') {
        l7 = 0
    }
    if (l7 == '') {
        l7 = 0
    }
    if (l7 == null) {
        l7 = 0
    }

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    $.ajax({
        type: "POST",
        url: "MonthlyExpenseReport.asmx/GetAllMonthlyExpense",
        data: "{'level1':'" + l1 +
             "','level2':'" + l2 +
             "','level3':'" + l3 +
             "','level4':'" + l4 +
             "','level5':'" + l5 +
             "','level6':'" + l6 +
             "','TeamID':'" + l7 +
             "','flag':'" + flag +
             "','startDate':'" + startDate +
             "','endDate':'" + endDate +
             "','EmpStatus':'" + EmpStatus + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessLoadData,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: onError
        //error:  function(a, b, c, d) {
        //if (d.info == 404)
        //  alert('Could not find upload script. Use a path relative to: ' + '<?= getcwd() ?>');
        // else 
        //alert('error ' + d.type + ": " + d.info);
        //}
    });

}

function onSuccessLoadData(data, status) {
    $('#dialog').jqmHide();
    $('#gridTable').empty();

    var str = '';
    var table = '<table id="grid-basic" class="table">'
    + '<thead><tr>'
    + '<th >Select </th>'
    + '<th>Actions</th>'
    + '<th>Expense Actions</th>'
    + '<th>Expense Refresh</th>'
    + '<th>Emp Status</th>'
    + '<th>HCMS CODE</th>'
    + '<th>Name</th>'
    + '<th>Designation</th>'
    + '<th>TEAM</th>'
    + '<th>REGION</th>'
    + '<th>DISTRICT</th>'
    + '<th>EXPENSE MONTH</th>'
    + '<th>ACTUAL SELLING EXPENSE</th>'
    + '<th>REIMB SELLING EXPENSE</th>'
    + '<th>REIMB MARKETING EXPENSE</th>'
    + '<th>TOTAL CLAIMED EXPENSE</th>'
    + '<th>Total Night Stay</th>'
    + '<th>Total Outback</th>'
    + '<th>DEDUCTION BY DSM</th>'
    + '<th>DEDUCTION BY SM</th>'
    + '<th>DEDUCTION BY BUH</th>'
    + '<th>TOTAL DEDUCTION</th>'
    + '<th>APPROVED EXPENSE</th>'
    + '<th>Status</th>'
    + '<th>DSM</th>'
    + '<th>SM</th>'
    + '<th>BUH</th>'
    + '<th>Expense Admin</th>'
    + '</tr></thead><tbody>';//24 th

    if (data.d != "[]") {
        var jSon = JSON.parse(data.d);

        $.each(jSon, function (i, option) {
            str += '<tr><td>' +
            ((CurrentUserRole == 'rl5' && (option.ReportStatus == 'Submitted' || option.ReportStatus == 'ReSubmitted') && (option.verifiedbyAM == 'Pending' || option.verifiedbyAM == 'Rejected' || option.verifiedbyRTL == 'Discussion') ||
            (CurrentUserRole == 'rl4' && (option.ReportStatus == 'Submitted' || option.ReportStatus == 'ReSubmitted') && (option.verifiedbySM == 'Pending' || option.verifiedbySM == 'Rejected' || option.verifiedbyRTL == 'Discussion')) && (option.verifiedbyAM == 'Approved' || option.verifiedbyAM == 'NotRequired')
            || (CurrentUserRole == 'rl3' && (option.ReportStatus == 'Submitted' || option.ReportStatus == 'ReSubmitted') && (option.verifiedbyRTL == 'Pending' || option.verifiedbyRTL == 'Rejected' || option.verifiedbyRTL == 'Discussion')) && (option.verifiedbySM == 'Approved' || option.verifiedbySM == 'NotRequired')
            || ((CurrentUserRole == "headoffice" && EmployeeId == adminExpenseID) && (option.ReportStatus == 'Submitted' || option.ReportStatus == 'ReSubmitted') && (option.verifiedbySFE == 'Pending' || option.verifiedbySFE == 'Rejected' || option.verifiedbySFE == 'Discussion')) && (option.verifiedbyRTL == 'Approved' || option.verifiedbyRTL == 'NotRequired')

            ) ?
            '<input type="checkbox" _empid="' + option.EmployeeId + '" _monthlyexpenseid="' + option.ID + '" _monthofexpense="' + option.MonthOfExpense + '"/>' : '-')
            //'<input type="checkbox" _empid="' + option.EmployeeId + '" _monthlyexpenseid="' + option.ID + '" _monthofexpense="' + option.MonthOfExpense + '"/>'

            + '</td><td>'
            + '<a href="../Form/EditExpenseDetails.aspx" onmousedown="mouseDownEvents(event,' + option.ID + ',\'' + option.MonthOfExpense + '\',' + option.EmployeeId + ');" onclick="Row_Edit(' + option.ID + ',\'' + option.MonthOfExpense + '\',' + option.EmployeeId + ')">Edit</a> &nbsp;'
            + '<a href="../Form/ReportExpenseDetails.aspx" onmousedown="mouseDownEvents(event,' + option.ID + ',\'' + option.MonthOfExpense + '\',' + option.EmployeeId + ');" onclick="Row_Export(' + option.ID + ',\'' +
            option.MonthOfExpense + '\',' + option.EmployeeId + ')">Export</a>' +
            ((CurrentUserRole == 'rl5' && (option.ReportStatus == 'Submitted' || option.ReportStatus == 'ReSubmitted') && (option.verifiedbyAM == 'Pending' || option.verifiedbyAM == 'Rejected' || option.verifiedbyRTL == 'Discussion') ||
            (CurrentUserRole == 'rl4' && (option.ReportStatus == 'Submitted' || option.ReportStatus == 'ReSubmitted') && (option.verifiedbySM == 'Pending' || option.verifiedbySM == 'Rejected' || option.verifiedbyRTL == 'Discussion')) && (option.verifiedbyAM == 'Approved' || option.verifiedbyAM == 'NotRequired')
            || (CurrentUserRole == 'rl3' && (option.ReportStatus == 'Submitted' || option.ReportStatus == 'ReSubmitted') && (option.verifiedbyRTL == 'Pending' || option.verifiedbyRTL == 'Rejected' || option.verifiedbyRTL == 'Discussion')) && (option.verifiedbySM == 'Approved' || option.verifiedbySM == 'NotRequired')
            || ((CurrentUserRole == "headoffice" && EmployeeId == adminExpenseID) && (option.ReportStatus == 'Submitted' || option.ReportStatus == 'ReSubmitted') && (option.verifiedbySFE == 'Pending' || option.verifiedbySFE == 'Rejected' || option.verifiedbySFE == 'Discussion')) && (option.verifiedbyRTL == 'Approved' || option.verifiedbyRTL == 'NotRequired')

            ) ?
            '&nbsp;<a href="#" onclick="Row_approved(' + option.ID + ',\'' +
            option.MonthOfExpense + '\','
            + option.EmployeeId + ')">Approval</a>' : '') +
            '</td><td>'
            // Reimbursment Approval 

            + ((CurrentUserRole == 'rl5' && (option.ReimStatus == 'Submitted' || option.ReimStatus == 'ReSubmitted') && (option.ReimApprovalByAM == 'Pending' || option.ReimApprovalByAM == 'Rejected' || option.ReimApprovalByRTL == 'Discussion') ||
            (CurrentUserRole == 'rl4' && (option.ReimStatus == 'Submitted' || option.ReimStatus == 'ReSubmitted') && (option.ReimApprovalBySM == 'Pending' || option.ReimApprovalBySM == 'Rejected' || option.ReimApprovalByRTL == 'Discussion')) && (option.ReimApprovalByAM == 'Approved' || option.ReimApprovalByAM == 'NotRequired')
            || (CurrentUserRole == 'rl3' && (option.ReimStatus == 'Submitted' || option.ReimStatus == 'ReSubmitted') && (option.ReimApprovalByRTL == 'Pending' || option.ReimApprovalByRTL == 'Rejected' || option.ReimApprovalByRTL == 'Discussion')) && (option.ReimApprovalBySM == 'Approved' || option.ReimApprovalBySM == 'NotRequired')
            || ((CurrentUserRole == "headoffice" && EmployeeId == adminExpenseID) && (option.ReimStatus == 'Submitted' || option.ReimStatus == 'ReSubmitted') && (option.verifiedbySFE == 'Pending' || option.ReimApprovalBySFE == 'Rejected' || option.ReimApprovalBySFE == 'Discussion')) && (option.ReimApprovalByRTL == 'Approved' || option.ReimApprovalByRTL == 'NotRequired')

            ) ?
            '&nbsp;<a href="#" onclick="Row_Reimbursmentapproved(' + option.ID + ',\'' +
            option.MonthOfExpense + '\','
            + option.EmployeeId + ')">ReimBursment Approval</a>' : '') +
            // Reimbursment Approval 

            // Arsal Hussain
            ((CurrentUserRole == 'admin' || (CurrentUserRole == "headoffice" && EmployeeId == adminExpenseID))
            ? '&nbsp; <a href="#" onclick="Row_Delete(' + option.ID + ')">Delete</a>' : '')


            + '</td><td>'
            + ((option.ForCursor == '1' && CurrentUserRole != 'rl6') ? '<a href="#" onclick="Row_ForCursor(' + option.EmployeeId + ',\'' + option.MonthOfExpense + '\');">Refresh</a>' : '-')
            + '</td><td>'
            + (option.EmpStatus == 'True' ? 'Active' : 'Deactive') + '</td><td>'
            + option.EmployeeCode + '</td><td>'
            + option.Name + '</td><td>'
            + option.DesignationName + '</td><td>'
            + option.Team + '</td><td>'
            + option.Region + '</td><td>'
            + option.District + '</td><td>'
            + (option.MonthOfExpense.split('-')[1] + '-' + option.MonthOfExpense.split('-')[2]) + '</td><td>'
            + option.ExpenseValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td><td>'
            + option.Selling.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td><td>'
            + option.Marketingexp.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td><td>'
            + option.TotalExpense.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td><td>'
            + option.TotalNightStay.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td><td>'
            + option.TotalOutback.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td><td>'
            + option.DeductionByDSM.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td><td>'
            + option.DeductionBySM.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td><td>'
            + option.DeductionByHead.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td><td>'
            + option.TotalDeduction.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td><td>'
            + option.ApprovedExpense.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td><td>'
            + option.ReportStatus + '</td><td>'
            + option.verifiedbyAM + '</td><td>'
            + option.verifiedbySM + '</td><td>'
            + option.verifiedbyRTL + '</td><td>'
            + option.verifiedbySFE + '</td></tr>';
        });
    }
    $('#gridTable').append(table + str + '</tbody></table>');

    $i("#grid-basic").DataTable({
        "scrollX": "200px",
        "scrollX": true

    });

}

function ApproveOrRejectAll() {
    employeeids = [];
    expenseIds = [];

    if ($('#grid-basic tbody tr input[type="checkbox"]:checked').length > 0) {
        var checkbox = $('#grid-basic tbody tr input[type="checkbox"]:checked');

        //Get All Selected EmployeeIds
        $.grep(checkbox, function (check) {
            console.log($(check).attr('_empid'))
            employeeids.push($(check).attr('_empid'));
        });

        //Get All Selected Expense ID
        $.grep(checkbox, function (check) {
            console.log($(check).attr('_monthlyexpenseid'))
            expenseIds.push($(check).attr('_monthlyexpenseid'));
        });
        $('#DivForApproval').jqmShow();

    }
    else {
        alert("Please select Expense");
    }

}

function mouseDownEvents(e, MonthlyExpenseId, MonthOfExpense, EmployeeId) {
    e = e || window.event;
    switch (e.which) {
        case 1:
            $.cookie('expenseid', MonthlyExpenseId, { path: '/' });
            $.cookie('expensemonth', MonthOfExpense, { path: '/' });
            $.cookie('employeeId', EmployeeId, { path: '/' });
            break;
        case 2:
            $.cookie('expenseid', MonthlyExpenseId, { path: '/' });
            $.cookie('expensemonth', MonthOfExpense, { path: '/' });
            $.cookie('employeeId', EmployeeId, { path: '/' });
            break;
        case 3:
            $.cookie('expenseid', MonthlyExpenseId, { path: '/' });
            $.cookie('expensemonth', MonthOfExpense, { path: '/' });
            $.cookie('employeeId', EmployeeId, { path: '/' });
            break;
    }
}

function InsertExpenseMonthly() {
    //if ($('#ddlT').val() > -1) {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    $.ajax({
        type: "POST",
        url: "MonthlyExpenseReport.asmx/InsertMonthlyExpense",
        data: "{'ExpenseMonth':'" + $('#txtDate').val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessInsert,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
    //}
    //else {
    //    window.alert('Please Select Team!');
    //}
}

function onSuccessInsert(data, status) {
    l13 = $('#stdate').val();
    l14 = $('#enddate').val();
    $('#dialog').jqmHide();
    //$('#hlabmsg').val("");
    $('#hlabmsg').empty();
    if (data.d == "OK") {

        msg = 'Data inserted succesfully!';
        $('#hdnMode').val("");

        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

    }
    else if (data.d == "Report Already Exists") {
        msg = 'Expense Report Already Exist!';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
        return false;
    }
    else if (data.d == "Error") {
        $('#divConfirmation').jqmHide();
        msg = 'Error Occured';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

    }
    else if (data.d == "Expense Policy Not Exist") {
        $('#divConfirmation').jqmHide();
        msg = 'Expense Policy Not Exists!';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
    }
    //Comment by Rahim instruct by Ahmer
    //if ($('#ddlDataType').val() == 2) {
    //    if ($q('#ddl1').val() != '-1') {
    //        if ($q('#ddl2').val() != '-1') {
    //            if ($q('#ddl3').val() != '-1') {
    //                if ($q('#ddl4').val() != '-1') {
    //                    //LoadData($q('#ddl4').val(), '1');
    //                    LoadData('1', l13, l14);
    //                }
    //                else {
    //                    // LoadData($q('#ddl3').val(), '1');
    //                    LoadData('1', l13, l14);
    //                }
    //            }
    //            else {
    //                //LoadData($q('#ddl2').val(), '1');
    //                LoadData('1', l13, l14);
    //            }
    //        }
    //        else {
    //            // LoadData($q('#ddl1').val(), '1');
    //            LoadData('1', l13, l14);
    //        }
    //    }
    //    else {
    //        // LoadData('0', '1');
    //        LoadData('1', l13, l14);
    //    }
    //}
    //else {
    //    //LoadData('0', '0');
    //    LoadData('0', l13, l14);
    //}
    LoadData('1', l13, l14);

}

function Row_approved(MonthlyExpenseId, a, EmployeeId) {

    //$('#dialog').jqm({ modal: true });
    //$('#dialog').jqm();
    //$('#dialog').jqmShow();

    // Come Here
    // $('#hdnMode').val("DeleteMode");
    MonthlyExpenseIds = MonthlyExpenseId;
    MonthlyExpenseEmployee = EmployeeId
    $('#DivForApproval').jqmShow();


}

function Row_Reimbursmentapproved(MonthlyExpenseId, a, EmployeeId) {

    //$('#dialog').jqm({ modal: true });
    //$('#dialog').jqm();
    //$('#dialog').jqmShow();

    // Come Here
    // $('#hdnMode').val("DeleteMode");
    MonthlyExpenseIds = MonthlyExpenseId;
    MonthlyExpenseEmployee = EmployeeId
    $('#DivForApproval1').jqmShow();


}

function Row_ForCursor(EmployeeId, ExpenseMonth) {

    //$('#dialog').jqm({ modal: true });
    //$('#dialog').jqm();
    //$('#dialog').jqmShow();

    // Come Here
    ExpenseDate = ExpenseMonth;
    ExpenseEmployeeId = EmployeeId
    $('#DivForCursor').jqmShow();


}

function Row_Delete(MonthlyExpenseId) {

    //$('#dialog').jqm({ modal: true });
    //$('#dialog').jqm();
    //$('#dialog').jqmShow();

    // Come Here
    $('#hdnMode').val("DeleteMode");
    expenseIDtoDelete = MonthlyExpenseId;
    $('#divConfirmation').jqmShow();

}

function onSuccessDelete(data, status) {
    $('#dialog').jqmHide();
    l13 = $('#stdate').val();
    l14 = $('#enddate').val();
    if (data.d == "OK") {
        msg = 'Data deleted succesfully!';
        $('#hdnMode').val("");
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

    }
    else if (data.d == "Not able to delete this record due to linkup.") {
        $('#divConfirmation').jqmHide();
        msg = 'Not able to delete this record due to linkup.';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

    }
    //LoadData('0', '0');
    LoadData('0', l13, l14);
}

function onSuccessCursor(data, status) {
    $('#DivForCursor').jqmHide();
    if (data.d == "OK") {
        msg = 'Data Refresh succesfully!';
        $('#hdnMode').val("");
        $('#hlabmsg').text('');
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

    }
    else if (data.d == "Not able to delete this record due to linkup.") {
        $('#divConfirmation').jqmHide();
        msg = 'Not able to delete this record due to linkup.';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

    }
    LoadData('1', l13, l14);
    //window.location.reload(true);
}

function Row_Edit(MonthlyExpenseId, MonthOfExpense, EmployeeId) {

    //window.open('../Form/EditExpenseDetails.aspx/?id=' + MonthlyExpenseId + '&MonthOfExpense=' + MonthOfExpense, '_blank')
    $.cookie('expenseid', MonthlyExpenseId, { path: '/' });
    $.cookie('expensemonth', MonthOfExpense, { path: '/' });
    $.cookie('employeeId', EmployeeId, { path: '/' });
    window.open('../Form/EditExpenseDetails.aspx', '_self')
}

function Row_Export(MonthlyExpenseId, MonthOfExpense, EmployeeId) {
    $.cookie('expenseid', MonthlyExpenseId, { path: '/' });
    $.cookie('expensemonth', MonthOfExpense, { path: '/' });
    $.cookie('employeeId', EmployeeId, { path: '/' });
    window.open('../Form/ReportExpenseDetails.aspx', '_self');

    /*$('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    
    $.ajax({
    type: "POST",
    url: "MonthlyExpenseReport.asmx/generateExpenseReport",
    data: "{'EmployeeID':'" + EmployeeId + "','MonthlyExpenseId':'" + MonthlyExpenseId + "','ExpenseMonth':'" + MonthOfExpense + "'}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: onSuccessGenerateReport,
    error: onError,
    beforeSend: startingAjax,
    complete: ajaxCompleted,
    cache: false
    });*/
}

function onSuccessGenerateReport(data, status) {
    var repottyp = 50;
    var url = "../Reports/report_ifram.aspx?reporttype=" + repottyp;
    var iframe = $('#Reportifram');
    $(iframe).attr('src', url);
    $(iframe).attr('class', "reportcl");
    $('#dialog').jqmHide();
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

function OnChangedtxtDate() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    $('#dialog').jqmHide();
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

function call(eventElement) {
    var target = eventElement.target;
    switch (target.mode) {
        case "month":
            var cal = $find("calendar1");
            cal._visibleDate = target.date;
            cal.set_selectedDate(target.date);
            cal._switchMonth(target.date);
            cal._blur.post(true);
            cal.raiseDateSelectionChanged();
            break;
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

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
            $('#ddlTeam').attr('disabled', 'disabled')
        }

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'headoffice') {
            $('#ddlTeam').attr('disabled', 'disabled')
        }

        if (data.d == "admin" || data.d == "headoffice") {
            //Comment by Rahim instruct by Ahmer
            // $('#ddlDataType').hide();
            $('#create_button').hide();
            $('#dateForReport').hide();
        }
        else if (CurrentUserRole == 'rl6') {
            //Meraj Working 
            $('#ApprvAllDiv').hide();
        }
        else if (CurrentUserRole == 'rl5') {
            //Meraj Working 
            $('#ApprvAllDiv').hide();
        }
        else if (CurrentUserRole == 'rl4') {
            //Meraj Working 
            $('#ApprvAllDiv').hide();
        }
        else if (CurrentUserRole == 'rl3') {
            //Meraj Working 
            $('#ApprvAllDiv').show();
        }
        else if (CurrentUserRole == 'admin') {
            //Meraj Working 
            $('#ApprvAllDiv').show();
        }
        else if (CurrentUserRole == 'rl2') {
            //Meraj Working 
            $('#ApprvAllDiv').hide();
        }
        else if (CurrentUserRole == 'rl1') {
            //Meraj Working 
            $('#ApprvAllDiv').hide();
        }

        myData = "{'employeeid':'" + EmployeeId + "' }";

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/getemployeeHR",
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
    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        EmployeeIdForTeam = EmployeeId;
        FillTeamsbyBUH();
    } else if (CurrentUserRole == 'rl4') {
        EmployeeIdForTeam = EmployeeId;
        FillTeamsbyBUH();
    }

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

        jsonObj = JSON.parse(data.d);
        EditableDataLoginId = jsonObj[0].LoginId;
    }

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

        jsonObj = JSON.parse(data.d);

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
        url: "CommonService.asmx/GetHierarchyLevels",
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

        jsonObj = JSON.parse(data.d);
        glbVarLevelName = jsonObj[0].SettingName;

        if (glbVarLevelName == "Level1") {

            HierarchyLevel1 = jsonObj[0].SettingValue;
            HierarchyLevel2 = jsonObj[1].SettingValue;
            HierarchyLevel3 = jsonObj[2].SettingValue;
            HierarchyLevel4 = jsonObj[3].SettingValue;
            HierarchyLevel5 = jsonObj[4].SettingValue;
            HierarchyLevel6 = jsonObj[5].SettingValue;
        }
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
    if (glbVarLevelName == "Level1") {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
            $('#btnsubmitbrickdata1').show();
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

            $('#g1').show();
            $('#g2').show();
            $('#g3').show();
            $('#g4').show();
            $('#g5').show();
            $('#g6').show();

        }
        if (CurrentUserRole == 'rl1') {

            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col4').show();
            $('#col5').show();

            $('#col11').show();
            $('#col22').show();
            $('#col33').show();
            $('#col44').show();
            $('#col55').show();


            $('#g1').show();
            $('#g2').show();
            $('#g3').show();
            $('#g4').show();
            $('#g5').show();


        }
        if (CurrentUserRole == 'rl2') {

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

        if (CurrentUserRole == 'headoffice') {
            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();


        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

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
            $('#gs3').hide();
            $('#cols33').hide();
            $('#col1').show();
            $('#col2').show();
            $('#col11').show();
            $('#col22').show();
            $('#g1').show();
            $('#g2').show();
            $('#btnsubmitbrickdata1').show();
        }
        if (CurrentUserRole == 'rl5') {

            $('#col1').show();
            $('#col11').show();

            $('#g1').show();

            $('#uploadify_button2').show();
            $('#exportExcel2').show();
            $('#btnsubmitbrickdata1').show();
        }
        if (CurrentUserRole == 'rl6') {

            $('.Th12').hide();
            $('#col77').hide();
            //$('.Th112').hide();
        }

        GetHierarchySelection();
        FillDropDownList();

    }
    if (glbVarLevelName == "Level3") {

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
            $('#btnsubmitbrickdata1').show();
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
        if (CurrentUserRole == 'headoffice') {

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


        } if (CurrentUserRole == 'marketingteam') {

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
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

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
            $('#gs3').hide();
            $('#cols33').hide();
            $('#col1').show();
            $('#col2').show();
            $('#col11').show();
            $('#col22').show();

            $('#g1').show();
            $('#g2').show();
            $('#btnsubmitbrickdata1').show();

        }
        if (CurrentUserRole == 'rl5') {

            $('#col1').show();
            $('#col11').show();

            $('#g1').show();
            $('#uploadify_button2').show();
            $('#exportExcel2').show();
            $('#btnsubmitbrickdata1').show();
        }
        GetHierarchySelection();
        FillDropDownList();
    }
}

function GetHierarchySelection() {

    myData = "{'systemUserId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/GetHierarchySelection",
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

        jsonObj = JSON.parse(data.d);

        if (jsonObj != "") {
            level3Id = jsonObj[0].LevelId3;
            level4Id = jsonObj[0].LevelId4;
            level5Id = jsonObj[0].LevelId5;
            level6Id = jsonObj[0].LevelId6;
        }
    }

}

function FillTeamsbyBUH() {

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
        myData = "{'LevelId':'" + $('#dG3').val() + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/FillTeamsbyBUH",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessFillTeamsbyBUH,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    } else if (CurrentUserRole == 'rl1') {
        myData = "{'LevelId':'" + $('#dG2').val() + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/FillTeamsbyBUH",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessFillTeamsbyBUH,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    } else if (CurrentUserRole == 'rl2') {
        myData = "{'LevelId':'" + $('#dG1').val() + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/FillTeamsbyBUH",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessFillTeamsbyBUH,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'rl4' || CurrentUserRole == 'headoffice') {
        myData = "{'EmployeeId':'" + EmployeeIdForTeam + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/FillTeamsForLevel3withEmployeeId",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessFillTeamsbyBUH,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }





}
function onSuccessFillTeamsbyBUH(data, status) {

    value = '-1';
    name = 'Select Teams';

    if (CurrentUserRole == 'rl1') {
        if (data.d != "") {
            var jsonObj = JSON.parse(data.d);
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#dG3").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            });

        } else {
            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");
        }
    } else if (CurrentUserRole == 'rl2') {
        if (data.d != "") {
            var jsonObj = JSON.parse(data.d);
            document.getElementById('dG7').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

            $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#dG2").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            });

        } else {
            $("#dG2").append("<option value='" + value + "'>" + name + "</option>");
        }
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'rl4' || CurrentUserRole == 'headoffice') {
        if (data.d != "") {
            var jsonObj = JSON.parse(data.d);
            document.getElementById('dG1').innerHTML = "";

            $("#dG1").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#dG1").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            });

        } else {
            $("#dG1").append("<option value='" + value + "'>" + name + "</option>");
        }
    } else {
        if (data.d != "") {
            var jsonObj = JSON.parse(data.d);
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            //$("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            //$.each(jsonObj, function (i, tweet) {
            //    $("#ddlTeam").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            //});


            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#dG7").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            });

        } else {
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");
            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");
        }
    }
}

function FillDropDownListtop() {
    myData = "{'levelName':'Level1' }";

    $.ajax({
        type: "POST",
        // url: "../Reports/datascreen.asmx/FilterDropDownList",
        url: "../Reports/NewReports.asmx/fillGH",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: function (data, status) {
            $('#ddl111').empty();
            $("#ddl111").append("<option value='-1'>Select BUH Manager</option>");
            if (data.d != "") {
                $.each(data.d, function (i, tweet) {
                    $("#ddl111").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
                });
            }

        },
        error: onError,
        cache: false
    });
}

function FillGh() {

    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/fillGH",
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

    document.getElementById('dG2').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";
    document.getElementById('dG7').innerHTML = "";


    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'rl4' || CurrentUserRole == 'headoffice') {

    } else {
        document.getElementById('dG1').innerHTML = "";
        value = '-1';
        name = 'Select ' + $('#Label5').text();

        $("#dG1").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#dG1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });

    }



    // umer work
    if (CurrentUserRole == 'ftm') {
        SetGMHierarchyForFTM();
    }

}

function defaulyHR() {

    myData = "{'employeeid':'" + EmployeeId + "' }";

    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/getemployeeHR",
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

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
            $('#ddlTeam').attr('disabled', 'disabled')
        }

        if (CurrentUserRole == 'rl1') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(0);
            $('#h4').val(0);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
            $('#ddl3').attr('disabled', 'disabled');
        }
        if (CurrentUserRole == 'rl2') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(0);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
            $('#ddl2').attr('disabled', 'disabled');
        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(data.d[0].LevelId3);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
            $('#ddl1').attr('disabled', 'disabled');
        }
        if (CurrentUserRole == 'rl4') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(data.d[0].LevelId3);
            $('#h5').val(data.d[0].LevelId4);
            $('#h12').val(0);
            $('#h13').val(0);
            $('#ddl1').attr('disabled', 'disabled');
        }
        if (CurrentUserRole == 'rl5') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(data.d[0].LevelId3);
            $('#h5').val(data.d[0].LevelId4);
            $('#h12').val(data.d[0].LevelId5);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl6') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(data.d[0].LevelId3);
            $('#h5').val(data.d[0].LevelId4);
            $('#h12').val(data.d[0].LevelId5);
            $('#h13').val(data.d[0].LevelId6);
        }

    }

}


function ONteamChnageGethierarchy() {

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
        $('#dG7').val($('#ddlTeam').val());
        OnChangeddl3withteamId();
    }
    else if (CurrentUserRole == 'rl1') {
        levelValue = $('#ddlTeam').val();
        var teamid = $('#dG3').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $q('#dG7').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                $('#h13').val(0);
            }
            if (CurrentUserRole != 'rl3' && CurrentUserRole != 'rl1' && CurrentUserRole != 'rl2' || CurrentUserRole != 'headoffice') {
                document.getElementById('ddlTeam').innerHTML = "";
            }

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {
        levelValue = $('#ddlTeam').val();
        var teamid = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel5",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $q('#dG7').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                $('#h13').val(0);
            }
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        $('#dialog').jqmHide();
        //OnChangeddl2withteamId();
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddlTeam').val();
        myData = "{'employeeId':'" + levelValue + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/datascreen.asmx/GetEmployee",
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
            $q('#dG7').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                $('#h13').val(0);
            }
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        $('#dialog').jqmHide();
        //OnChangeddl3withteamId();
    }
    else if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddlTeam').val();
        myData = "{'employeeId':'" + levelValue + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/datascreen.asmx/GetEmployee",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl2,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $q('#dG7').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h3').val(0);
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";


            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        $('#dialog').jqmHide();
    }
}

function ONteamChnageGetlevel() {

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
        $('#ddlTeam').val($('#dG7').val());
        OnChangeddl3withteamId();
    }
    else if (CurrentUserRole == 'rl1') {
        levelValue = $('#dG7').val();
        teamId = $('#dG3').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L3WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG2WithTeam,
                error: onError,
                beforeSend: startingAjax,
                cache: false
            });

            G3c();
        }
        else {
            $('#ddlTeam').val(-1)

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {
        levelValue = $('#dG7').val();
        teamId = $('#dG2').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L3",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG3,
                error: onError,
                beforeSend: startingAjax,
                cache: false
            });

            G3c();
        }
        else {
            $('#ddlTeam').val(-1)

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#dG7').val();
        teamId = $('#dG2').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L3",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG3,
                error: onError,
                beforeSend: startingAjax,
                cache: false
            });

            G3c();
        }
        else {
            $('#ddlTeam').val(-1)

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }

        $('#dialog').jqmHide();
        //OnChangeddl3withteamId();
    }
    else if (CurrentUserRole == 'rl4') {
        levelValue = $('#dG7').val();
        myData = "{'level2Id':'" + levelValue + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L2",
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
            $('#ddlTeam').val(-1)

            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }

        $('#dialog').jqmHide();
        //OnChangeddl4withteamId();
    }
}
function OnChangeddl1() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {


        var teamid = $('#ddl1').val();
        myData = "{'employeeId':'" + EmployeeIdForTeam + "' ,'teamId':'" + teamid + "'}";

        if ($('#ddlreport').val() == 7) {
            $('#Th8').show();
        }

        if (teamid != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteam",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl3withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $q('#dG1').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h2').val(0);
                $('#h3').val(0);
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h3').val(0);
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl3') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'headoffice') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl4') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl5') {
                $('#h13').val(0);
            }


            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";


            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }



        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {


        levelValue = $('#ddl1').val();
        myData = "{'employeeId':'" + levelValue + "' }";
        if ($('#ddlreport').val() == 7) {
            $('#Th8').show();
        }

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/datascreen.asmx/GetEmployee",
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

            $q('#dG1').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h2').val(0);
                $('#h3').val(0);
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h3').val(0);
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl4') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl5') {
                $('#h13').val(0);
            }


            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }



        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl4') {
        if ($('#ddl1').val() == "-1") {
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }
        var teamid = $('#ddl1').val();
        myData = "{'employeeId':'" + EmployeeIdForTeam + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $q('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else {

        levelValue = $('#ddl1').val();
        myData = "{'employeeId':'" + levelValue + "' }";
        if ($('#ddlreport').val() == 7) {
            $('#Th8').show();
        }

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/datascreen.asmx/GetEmployee",
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

            $q('#dG1').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h2').val(0);
                $('#h3').val(0);
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h3').val(0);
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl4') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl5') {
                $('#h13').val(0);
            }


            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            if (CurrentUserRole != 'rl4') {
                document.getElementById('ddlTeam').innerHTML = "";
            }


            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }



        $('#dialog').jqmHide();
    }



}
function OnChangeddl2() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }
    if (CurrentUserRole == 'rl2') {
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        levelValue = $('#ddl1').val();
        var teamid = $('#ddl2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel3",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl1withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $q('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        var teamid = $('#dG1').val();
        levelValue = $('#ddl2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";

        if ($('#ddlreport').val() == 7) {
            $('#Th8').show();
        }

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $q('#dG2').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h2').val(0);
                $('#h3').val(0);
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h3').val(0);
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl4') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl5') {
                $('#h13').val(0);
            }


            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddl2').val();
        teamId = $('#dG1').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamId + "'}";
        if ($('#ddlreport').val() == 7) {
            $('#Th8').show();
        }

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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

            $q('#dG2').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h2').val(0);
                $('#h3').val(0);
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h3').val(0);
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl4') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl5') {
                $('#h13').val(0);
            }
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }
        $('#dialog').jqmHide();
    } else {
        levelValue = $('#ddl2').val();
        myData = "{'employeeId':'" + levelValue + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/datascreen.asmx/GetEmployee",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl2,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $q('#dG2').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h3').val(0);
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";


            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $('#dialog').jqmHide();
    }


}
function OnChangeddl2withteamId() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl1') {

        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        levelValue = $('#ddlTeam').val();
        var teamid = $('#ddl3').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $('#dG7').val(-1)

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {


        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        levelValue = $('#ddlTeam').val();
        var teamid = $('#ddl2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel5",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $('#dG7').val(-1);

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                $('#h13').val(0);
            }
            if (CurrentUserRole != 'rl3' && CurrentUserRole != 'rl1' && CurrentUserRole != 'rl2') {
                document.getElementById('ddlTeam').innerHTML = "";
            }

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        $('#dialog').jqmHide();

        //levelValue = $('#ddl1').val();
        //var teamid = $('#ddlTeam').val();
        //myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        //if (levelValue != -1) {

        //    $.ajax({
        //        type: "POST",
        //        url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel3",
        //        data: myData,
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        success: onSuccessFillddl1withteamId,
        //        error: onError,
        //        beforeSend: startingAjax,
        //        complete: ajaxCompleted,
        //        cache: false
        //    });

        //}
        //else {

        //    $('#dG4').val(-1)

        //    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
        //        $('#h5').val(0);
        //        $('#h12').val(0);
        //        $('#h13').val(0);
        //    }
        //    if (CurrentUserRole == 'rl1') {
        //        $('#h12').val(0);
        //        $('#h13').val(0);
        //    }
        //    if (CurrentUserRole == 'rl2') {
        //        $('#h13').val(0);
        //    }
        //    document.getElementById('ddl5').innerHTML = "";
        //    document.getElementById('ddl6').innerHTML = "";
        //    document.getElementById('dG5').innerHTML = "";
        //    document.getElementById('dG6').innerHTML = "";

        //}

        //$('#dialog').jqmHide();
    }
    else {
        var teamid = $('#ddlTeam').val();
        levelValue = $('#ddl1').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";



        if (levelValue != -1 || teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel2",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl1withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $('#dG2').val(-1);

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h3').val(0);
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }



            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";


            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        $('#dialog').jqmHide();


    }



}
function OnChangeddl3() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl1') {



        levelValue = $('#ddl2').val();
        var teamid = $('#ddl3').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteam",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl3withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $q('#dG3').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                $('#h13').val(0);
            }
            document.getElementById('ddlTeam').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {

        levelValue = $('#ddl3').val();
        var teamid = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";



        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl3withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $q('#dG3').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h3').val(0);
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $('#dialog').jqmHide();

    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddl3').val();
        teamId = $('#dG1').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl2,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $q('#dG3').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h3').val(0);
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $('#dialog').jqmHide();
    } else {
        levelValue = $('#ddl3').val();
        myData = "{'employeeId':'" + levelValue + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/datascreen.asmx/GetEmployee",
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
            $q('#dG3').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                $('#h13').val(0);
            }
            if (CurrentUserRole != 'rl3' && CurrentUserRole != 'rl2') {
                document.getElementById('ddlTeam').innerHTML = "";
            }
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $('#dialog').jqmHide();
    }


}
function OnChangeddl3withteamId() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

        if ($('#ddlTeam').val() == "-1") {
            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('dG1').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        if ($('#ddlTeam').val() != null && $('#ddl1').val() != null) {
            document.getElementById('ddl2').innerHTML = "";

            levelValue = $('#ddl1').val();
            var teamid = $('#ddlTeam').val();
            myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
            if (levelValue != -1) {

                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl3withteamId,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });

            }
            else {

                $('#dG4').val(-1)

                if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                    $('#h5').val(0);
                    $('#h12').val(0);
                    $('#h13').val(0);
                }
                if (CurrentUserRole == 'rl1') {
                    $('#h12').val(0);
                    $('#h13').val(0);
                }
                if (CurrentUserRole == 'rl2') {
                    $('#h13').val(0);
                }
                document.getElementById('ddl5').innerHTML = "";
                document.getElementById('ddl6').innerHTML = "";
                document.getElementById('dG5').innerHTML = "";
                document.getElementById('dG6').innerHTML = "";

            }

            $('#dialog').jqmHide();
        } else {
            var teamid = $('#ddlTeam').val();
            myData = "{'employeeId':'" + EmployeeIdForTeam + "' ,'teamId':'" + teamid + "'}";
            if (teamid != -1) {

                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/GetEmployeewithteam",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl3withteamId,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });

            }
            else {

                $('#dG1').val(-1)

                if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                    $('#h5').val(0);
                    $('#h12').val(0);
                    $('#h13').val(0);
                }
                if (CurrentUserRole == 'rl1') {
                    $('#h12').val(0);
                    $('#h13').val(0);
                }
                if (CurrentUserRole == 'rl2') {
                    $('#h13').val(0);
                }
                document.getElementById('ddl1').innerHTML = "";
                document.getElementById('ddl2').innerHTML = "";
                document.getElementById('ddl3').innerHTML = "";
                document.getElementById('ddl5').innerHTML = "";
                document.getElementById('ddl6').innerHTML = "";
                document.getElementById('dG1').innerHTML = "";
                document.getElementById('dG2').innerHTML = "";
                document.getElementById('dG3').innerHTML = "";
                document.getElementById('dG4').innerHTML = "";
                document.getElementById('dG5').innerHTML = "";
                document.getElementById('dG6').innerHTML = "";

            }

            $('#dialog').jqmHide();
        }


    }

    else {
        levelValue = $('#ddl3').val();
        var teamid = $('#dG7').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteam",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl3withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $('#dG4').val(-1)

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

        }

        $('#dialog').jqmHide();
    }



}
function OnChangeddl4() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }


    if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2') {
        levelValue = $('#ddl4').val();
        teamId = $('#dG3').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "'}";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $q('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else {
        levelValue = $('#ddl4').val();
        var teamid = $('#dG7').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $q('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

        }

        $('#dialog').jqmHide();
    }
}
function OnChangeddl4withteamId() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl4') {

        if ($('#ddlTeam').val() == "-1") {
            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('dG1').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }
        var teamid = $('#ddlTeam').val();
        myData = "{'employeeId':'" + EmployeeIdForTeam + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $('#dG4').val(-1)

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

        }

        $('#dialog').jqmHide();


    } else {
        levelValue = $('#ddl4').val();
        var teamid = $('#ddlTeam').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $('#dG4').val(-1)

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

        }

        $('#dialog').jqmHide();
    }



}
function OnChangeddl5() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    levelValue = $('#ddl5').val();
    teamId = $('#dG7').val();
    myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl5,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });

    }
    else {
        $q('#dG5').val(-1).select2()

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl1') {
            $('#h13').val(0);
        }

        document.getElementById('ddl6').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";
    }

    $('#dialog').jqmHide();

}
function OnChangeddl6() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    if ($('#ddlreport').val() == 7) {
        // document.getElementById("Chkself").checked = false;
        $('#Th8').hide();
    }

    levelValue = $('#ddl6').val();
    if (levelValue != -1) {

        myData = "{'employeeid':'" + levelValue + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/getemployeeHR",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl16,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {

        $q('#dG6').val(-1).select2()
        $('#h13').val(0);
    }

    $('#dialog').jqmHide();
}




function onSuccessFillddl1(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = JSON.parse(data.d);

        if (CurrentUserRole == 'rl2') {
            //document.getElementById('dG2').innerHTML = "";
            //value = '-1';

            //name = 'Select ' + $('#Label2').text();
            //$("#dG2").append("<option value='" + value + "'>" + name + "</option>");

            //$.each(jsonObj, function (i, tweet) {
            //    $("#dG2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            //});
        } else if (CurrentUserRole == 'rl4') {
            document.getElementById('ddlTeam').innerHTML = "";
            value = '-1';

            name = 'Select ' + $('#Label14').text();
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        } else {
            document.getElementById('ddl2').innerHTML = "";
            value = '-1';

            name = 'Select ' + $('#Label2').text();
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }
        if (CurrentUserRole != 'rl2') {
            levelValue = $('#ddl2').val();

            if (levelValue != -1) {
                myData = "{'employeeid':'" + levelValue + "' }";
                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/getemployeeHR",
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
                $('#dG1').val(-1);
            }
        }
    }
    if (CurrentUserRole != 'rl4') {
        levelValue = $('#ddl1').val();

        if (levelValue != -1) {
            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/getemployeeHR",
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
    }
    if (levelValue == -1) {
        $('#dG1').val(-1);
    }

}
function onSuccessFillddl1withteamId(data, status) {


    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = JSON.parse(data.d);

        if (CurrentUserRole == 'rl1') {

            levelValue = $('#ddl1').val();

            if (levelValue != -1) {
                myData = "{'employeeid':'" + levelValue + "' }";
                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/getemployeeHR",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl12withteamId,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            else {
                $('#dG1').val(-1);
            }
        } else if (CurrentUserRole == 'rl2') {
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            value = '-1';

            name = 'Select ' + $('#Label3').text();
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });



            levelValue = $('#ddl1').val();

            if (levelValue != -1) {
                myData = "{'employeeid':'" + levelValue + "' }";
                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/getemployeeHR",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl11withteamId,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            else {
                $('#dG1').val(-1);
            }

        }
        else {
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
                    url: "../Reports/NewReports.asmx/getemployeeHR",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl11withteamId,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            else {
                $('#dG1').val(-1);
            }

        }


    }

    ////levelValue = $('#ddl1').val();

    ////if (levelValue != -1) {
    ////    myData = "{'employeeid':'" + levelValue + "' }";
    ////    $.ajax({
    ////        type: "POST",
    ////        url: "../Reports/NewReports.asmx/getemployeeHR",
    ////        data: myData,
    ////        contentType: "application/json; charset=utf-8",
    ////        dataType: "json",
    ////        success: onSuccessFillddl11withteamId,
    ////        error: onError,
    ////        beforeSend: startingAjax,
    ////        complete: ajaxCompleted,
    ////        cache: false
    ////    });
    ////}

    ////if (levelValue == -1) {
    ////    $('#dG1').val(-1);
    ////}

}
function onSuccessFillddl2withteamId(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";


    if (true) {

    }

    if ($("#ddl2").val() == "-1") { } else {
        //value = '-1';
        //name = 'Select ' + $('#Label3').text();
        //$("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});

        if (data.d != "") {

            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label3').text();
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });

            levelValue = $('#ddl2').val();

            if (levelValue != -1) {

                myData = "{'employeeid':'" + levelValue + "' }";
                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/getemployeeHR",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl12withteamId,
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
    }
    if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddl2').val();
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl12withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
    }

    if (levelValue == -1) {
        $('#ddl2').val(-1);
        $('#dG2').val(-1);
    }

}
function onSuccessFillddl2(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {


        if (CurrentUserRole == 'rl1') {
            levelValue = $('#ddl2').val();

            if (levelValue != -1) {

                myData = "{'employeeid':'" + levelValue + "' }";
                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/getemployeeHR",
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
        } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            document.getElementById('ddlTeam').innerHTML = "";
            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label14').text();
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });


            levelValue = $('#ddl3').val();

            if (levelValue != -1) {

                myData = "{'employeeid':'" + levelValue + "' }";
                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/getemployeeHR",
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
        } else if (CurrentUserRole == 'rl4') {
            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label3').text();
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });


            levelValue = $('#ddlTeam').val();

            if (levelValue != -1) {

                myData = "{'employeeid':'" + levelValue + "' }";
                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/getemployeeHR",
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
        } else if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
            jsonObj = JSON.parse(data.d);
            document.getElementById('ddl3').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label3').text();
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });


            levelValue = $('#ddl2').val();

            if (levelValue != -1) {

                myData = "{'employeeid':'" + levelValue + "' }";
                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/getemployeeHR",
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
        } else {
            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label3').text();
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });


            levelValue = $('#ddl2').val();

            if (levelValue != -1) {

                myData = "{'employeeid':'" + levelValue + "' }";
                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/getemployeeHR",
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

    }

    if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddlTeam').val();
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/getemployeeHR",
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

    if (levelValue == -1) {
        $('#ddl2').val(-1);
        $('#dG2').val(-1);
    }

}
function onSuccessFillddl3(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = JSON.parse(data.d);
        value = '-1';

        //name = 'Select ' + $('#Label4').text();
        //$("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});


        levelValue = $('#ddl3').val();
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/getemployeeHR",
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

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddlTeam').val();
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/getemployeeHR",
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

    if (levelValue == -1) {
        $('#ddl3').val(-1);
        $('#dG3').val(-1);
    }
}
function onSuccessFillddl3withteamId(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    //if ($("#ddl3").val() == "-1") {

    //} else {
    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddlTeam').innerHTML = "";
        document.getElementById('ddl2').innerHTML = "";

        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG7').innerHTML = "";

        //if ($("#ddl2").val() == "-1" || $("#ddl2").val() == " " || $("#ddl2").val() == null) {
        if (data.d != "") {
            document.getElementById('ddl2').innerHTML = "";
            jsonObj = JSON.parse(data.d);
            value = '-1';

            name = 'Select ' + $('#Label2').text();
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });

            myData = "{'employeeid':'" + EmployeeIdForTeam + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl13withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }




        //} else {
        //    if (data.d != "") {
        //        document.getElementById('ddl3').innerHTML = "";
        //        jsonObj = JSON.parse(data.d);
        //        value = '-1';

        //        name = 'Select ' + $('#Label2').text();
        //        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        //        $.each(jsonObj, function (i, tweet) {
        //            $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //        });


        //        levelValue = $('#ddl2').val();
        //        if (levelValue != -1) {

        //            myData = "{'employeeid':'" + levelValue + "' }";
        //            $.ajax({
        //                type: "POST",
        //                url: "../Reports/newReports.asmx/getemployeeHR",
        //                data: myData,
        //                contentType: "application/json; charset=utf-8",
        //                dataType: "json",
        //                success: onSuccessFillddl13withteamId,
        //                error: onError,
        //                beforeSend: startingAjax,
        //                complete: ajaxCompleted,
        //                cache: false
        //            });
        //        }
        //    }
        //}


    } else if (CurrentUserRole == 'rl1') {
        if (data.d != "") {
            document.getElementById('ddlTeam').innerHTML = "";
            jsonObj = JSON.parse(data.d);
            value = '-1';

            name = 'Select ' + $('#Label14').text();
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });


            levelValue = $('#ddl2').val();
            if (levelValue != -1) {

                myData = "{'employeeid':'" + levelValue + "' }";
                $.ajax({
                    type: "POST",
                    url: "../Reports/newReports.asmx/getemployeeHR",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl13withteamId,
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
    } else if (CurrentUserRole == 'rl2') {
        if (data.d != "") {
            document.getElementById('ddlTeam').innerHTML = "";
            jsonObj = JSON.parse(data.d);
            value = '-1';

            name = 'Select ' + $('#Label14').text();
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });


            levelValue = $('#ddl3').val();
            if (levelValue != -1) {

                myData = "{'employeeid':'" + levelValue + "' }";
                $.ajax({
                    type: "POST",
                    url: "../Reports/newReports.asmx/getemployeeHR",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl13withteamId,
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
    }
    else {
        if (data.d != "") {

            jsonObj = JSON.parse(data.d);
            value = '-1';

            name = 'Select ' + $('#Label4').text();
            $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });


            levelValue = $('#ddl3').val();
            if (levelValue != -1) {

                myData = "{'employeeid':'" + levelValue + "' }";
                $.ajax({
                    type: "POST",
                    url: "../Reports/newReports.asmx/getemployeeHR",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl13withteamId,
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
    }
    //}
}
function onSuccessFillddl4(data, status) {

    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";


    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddlTeam').innerHTML = "";

        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG7').innerHTML = "";
        if (data.d != "") {

            document.getElementById('ddl3').innerHTML = "";
            jsonObj = JSON.parse(data.d);
            value = '-1';

            name = 'Select ' + $('#Label3').text();
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });


            levelValue = $('#ddl2').val();
            if (levelValue != -1) {

                myData = "{'employeeid':'" + levelValue + "' }";
                $.ajax({
                    type: "POST",
                    url: "../Reports/newReports.asmx/getemployeeHR",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl13withteamId,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
        }

    } else {
        if (data.d != "") {

            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label9').text();
            $("#ddl5").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl5").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });

            levelValue = $('#ddl4').val();
            if (levelValue != -1) {

                myData = "{'employeeid':'" + levelValue + "' }";
                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/getemployeeHR",
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

        }
    }

    if (CurrentUserRole == 'rl2') {
        levelValue = $('#ddl4').val();
    }
    if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddl5').val();
    }

    if (CurrentUserRole == 'rl2' || CurrentUserRole == 'rl4') {

        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/getemployeeHR",
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
    }

    if (levelValue == -1) {
        $('#ddl4').val(-1);
        $('#dG4').val(-1);
    }
}
function onSuccessFillddl4withteamId(data, status) {

    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (CurrentUserRole == 'rl4') {
        if (data.d != "") {
            document.getElementById('ddl2').innerHTML = "";
            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label2').text();
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });



            myData = "{'employeeid':'" + EmployeeIdForTeam + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl14withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
    } else if (CurrentUserRole == 'rl1') {

        jsonObj = JSON.parse(data.d);
        document.getElementById('ddl4').innerHTML = "";
        value = '-1';
        name = 'Select ' + $('#Label8').text();
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

        levelValue = $('#ddlTeam').val();

        myData = "{'employeeid':'" + levelValue + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/getemployeeHR",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl14withteamId,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    } else if (CurrentUserRole == 'rl2') {
        document.getElementById('ddl4').innerHTML = "";
        jsonObj = JSON.parse(data.d);

        value = '-1';
        name = 'Select ' + $('#Label4').text();
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

        levelValue = $('#ddlTeam').val();

        myData = "{'employeeid':'" + levelValue + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/getemployeeHR",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl14withteamId,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        if (data.d != "") {

            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label9').text();
            $("#ddl5").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl5").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });

            levelValue = $('#ddl4').val();
            if (levelValue != -1) {

                myData = "{'employeeid':'" + levelValue + "' }";
                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/getemployeeHR",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl14withteamId,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            else {
                $('#dG4').val(-1)
            }

        }
    }


    //if (CurrentUserRole == 'rl2') {
    //    levelValue = $('#ddl4').val();
    //}
    //if (CurrentUserRole == 'rl4') {
    //    levelValue = $('#ddl5').val();
    //}

    //if (CurrentUserRole == 'rl2' || CurrentUserRole == 'rl4') {

    //    if (levelValue != -1) {

    //        myData = "{'employeeid':'" + levelValue + "' }";
    //        $.ajax({
    //            type: "POST",
    //            url: "../Reports/newReports.asmx/getemployeeHR",
    //            data: myData,
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: onSuccessFillddl14,
    //            error: onError,
    //            beforeSend: startingAjax,
    //            complete: ajaxCompleted,
    //            cache: false
    //        });
    //    }
    //}

    //if (levelValue == -1) {
    //    $('#ddl4').val(-1);
    //    $('#dG4').val(-1);
    //}
}
function onSuccessFillddl5(data, status) {

    document.getElementById('ddl6').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = JSON.parse(data.d);
        value = '-1';

        name = 'Select ' + $('#Label10').text();
        $("#ddl6").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl6").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

        levelValue = $('#ddl5').val();
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl15,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $('#dG5').val(-1)
        }
    }

    if (CurrentUserRole == 'rl1') {
        levelValue = $('#ddl5').val();
    }
    else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddl3').val();
    }

    if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl15,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
    }

    if (levelValue == -1) {
        $('#ddl5').val(-1);
        $('#dG5').val(-1);
    }
}
function onSuccessFillddl6(data, status) { }


function onSuccessFillddl11(data, status) {
    setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $q('#dG1').val(data.d[0].LevelId1).select2()

            $('#h2').val(data.d[0].LevelId1)

            dg1();

        }
        if (CurrentUserRole == 'rl1') {

            $q('#dG1').val(data.d[0].LevelId2).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            dg1();

        }
        if (CurrentUserRole == 'rl2') {

            $q('#dG1').val(data.d[0].LevelId3).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            dg1();

        }
        if (CurrentUserRole == 'marketingteam') {

            $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)

            dg1();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $q('#dG1').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg1();

        }
        if (CurrentUserRole == 'rl4') {

            $q('#dG2').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            $('#h12').val(data.d[0].LevelId5)

            dg1();

        }
        if (CurrentUserRole == 'rl5') {

            $q('#dG1').val(data.d[0].LevelId6).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

        }
        //if (CurrentUserRole == 'rl1') {
        //    FillTeamsbyBUH();
        //}

    }
    else {
        $('#dG1').val(-1);
    }
}
function onSuccessFillddl11withteamId(data, status) {
    setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)

            // dg1();

        }
        if (CurrentUserRole == 'rl1') {

            $('#dG1').val(data.d[0].LevelId2)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            dg1WithTeam();

        }
        if (CurrentUserRole == 'rl2') {

            //$('#dG1').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            dg1WithTeam();

        }
        if (CurrentUserRole == 'marketingteam') {

            $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)

            dg1();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $('#dG1').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg1();

        }
        if (CurrentUserRole == 'rl4') {

            $('#dG1').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            $('#h12').val(data.d[0].LevelId5)

            dg1();

        }
        if (CurrentUserRole == 'rl5') {

            $q('#dG1').val(data.d[0].LevelId6).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

        }


    }
    else {
        $('#dG1').val(-1);
    }
}
function onSuccessFillddl12(data, status) {

    setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $q('#dG2').val(data.d[0].LevelId2).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            dg2();

        }
        if (CurrentUserRole == 'marketingteam') {
            $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            dg2();

        }
        if (CurrentUserRole == 'rl1') {

            $q('#dG2').val(data.d[0].LevelId3).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            dg2();

        }
        if (CurrentUserRole == 'rl2') {

            $q('#dG2').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg2();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $q('#dG3').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            dg2();

        }
        if (CurrentUserRole == 'rl4') {
            $q('#dG7').val(data.d[0].LevelId6).select2()
            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            newemployee = $('#ddl2').val();
            $('#h6').val(newemployee);

        }
        if (CurrentUserRole == 'rl1') {
            FillTeamsbyBUH();
        }
    }
    else {
        $('#dG2').val(-1);
    }
}
function onSuccessFillddl12withteamId(data, status) {

    setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $q('#dG2').val(data.d[0].LevelId2).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            //dg2();

        }
        if (CurrentUserRole == 'marketingteam') {
            $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            //dg2();

        }
        if (CurrentUserRole == 'rl1') {

            $q('#dG2').val(data.d[0].LevelId3).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            dg2WithTeam();
        }
        if (CurrentUserRole == 'rl2') {

            $q('#dG2').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg2WithTeam();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $q('#dG2').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg2();

        }
        if (CurrentUserRole == 'rl4') {
            $('#dG2').val(data.d[0].LevelId6).select2()
            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            newemployee = $('#ddl2').val();
            $('#h6').val(newemployee);

        }
    }
    else {
        $('#dG2').val(-1);
    }
}
function onSuccessFillddl13(data, status) {

    setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $q('#dG1').val(data.d[0].LevelId1).select2()
            $q('#dG2').val(data.d[0].LevelId2).select2()
            $q('#dG3').val(data.d[0].LevelId3).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            dg3();

        }
        if (CurrentUserRole == 'marketingteam') {

            $('#dG1').val(data.d[0].LevelId1)
            $('#dG2').val(data.d[0].LevelId2)
            $('#dG3').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            dg3();

        }
        if (CurrentUserRole == 'rl1') {

            $('#dG3').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg3();

        }
        if (CurrentUserRole == 'rl2') {

            $('#dG3').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            dg3();

        }
        if (CurrentUserRole == 'rl3') {

            $q('#dG7').val(data.d[0].LevelId6).select2()

            $('#h2').val(data.d[0].LevelId3)
            $('#h3').val(data.d[0].LevelId4)
            $('#h4').val(data.d[0].LevelId5)
            $('#h5').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
        if (CurrentUserRole == 'headoffice') {

            $q('#dG7').val(data.d[0].LevelId6).select2()

            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
        if (CurrentUserRole != 'rl3' && CurrentUserRole != 'headoffice') {
            FillTeamsbyBUH();
        }

    }
    else {
        $('#dG3').val(-1);
    }
}
function onSuccessFillddl13withteamId(data, status) {

    setvalue();


    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1)
            $('#dG2').val(data.d[0].LevelId2)
            $('#dG3').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            dg3WithTeam();

        }
        if (CurrentUserRole == 'marketingteam') {
            $('#dG1').val(data.d[0].LevelId1)
            $('#dG2').val(data.d[0].LevelId2)
            $('#dG3').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)


        }
        if (CurrentUserRole == 'rl1') {

            //$('#dG3').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg3WithTeam();

        }
        if (CurrentUserRole == 'rl2') {

            $q('#dG3').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            dg3WithTeam();

        }
        if (CurrentUserRole == 'rl3') {

            $q('#dG2').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            dg3WithTeam();
            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
        if (CurrentUserRole == 'headoffice') {

            $q('#dG2').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            dg3WithTeam();
            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
    }
    else {
        $('#dG4').val(-1);
    }
}
function onSuccessFillddl14(data, status) {

    setvalue();

    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1)
            $('#dG2').val(data.d[0].LevelId2)
            $('#dG3').val(data.d[0].LevelId3)
            $('#dG4').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg4();
        }
        if (CurrentUserRole == 'marketingteam') {

            $('#dG1').val(data.d[0].LevelId1)
            $('#dG2').val(data.d[0].LevelId2)
            $('#dG3').val(data.d[0].LevelId3)
            $('#dG4').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg4();

        }
        if (CurrentUserRole == 'rl1') {

            $q('#dG4').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            dg4();

        }
        if (CurrentUserRole == 'rl2') {

            $q('#dG4').val(data.d[0].LevelId6).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

            dg4();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $q('#dG3').val(data.d[0].LevelId6).select2()
            $('#h2').val(data.d[0].LevelId3)
            $('#h3').val(data.d[0].LevelId4)
            $('#h4').val(data.d[0].LevelId5)
            $('#h5').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
    }
    else {
        $('#dG4').val(-1);
    }
}
function onSuccessFillddl14withteamId(data, status) {

    setvalue();

    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $q('#dG1').val(data.d[0].LevelId1).select2()
            $q('#dG2').val(data.d[0].LevelId2).select2()
            $q('#dG3').val(data.d[0].LevelId3).select2()
            $q('#dG4').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            dg4WithTeam();
            // dg4();
        }
        if (CurrentUserRole == 'marketingteam') {

            $('#dG1').val(data.d[0].LevelId1)
            $('#dG2').val(data.d[0].LevelId2)
            $('#dG3').val(data.d[0].LevelId3)
            $('#dG4').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg4();

        }
        if (CurrentUserRole == 'rl1') {

            $q('#dG7').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            dg4WithTeam();

        }
        if (CurrentUserRole == 'rl2') {

            $q('#dG7').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

            dg4WithTeam();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $q('#dG3').val(data.d[0].LevelId6).select2()
            $('#h2').val(data.d[0].LevelId3)
            $('#h3').val(data.d[0].LevelId4)
            $('#h4').val(data.d[0].LevelId5)
            $('#h5').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
        if (CurrentUserRole == 'rl4') {

            $q('#dG2').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            dg4WithTeam();
            newemployee = $('#ddl4').val();
            $('#h6').val(newemployee);

        }
    }
    else {
        $('#dG4').val(-1);
    }
}
function onSuccessFillddl15(data, status) {

    setvalue();

    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $q('#dG1').val(data.d[0].LevelId1).select2()
            $q('#dG2').val(data.d[0].LevelId2).select2()
            $q('#dG3').val(data.d[0].LevelId3).select2()
            $q('#dG4').val(data.d[0].LevelId4).select2()
            $q('#dG5').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            dg5();

        }
        if (CurrentUserRole == 'marketingteam') {

            $('#dG1').val(data.d[0].LevelId1)
            $('#dG2').val(data.d[0].LevelId2)
            $('#dG3').val(data.d[0].LevelId3)
            $('#dG4').val(data.d[0].LevelId4)
            $('#dG5').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            dg5();

        }
        if (CurrentUserRole == 'rl1') {

            $q('#dG5').val(data.d[0].LevelId6).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

            dg5();

        }
        if (CurrentUserRole == 'rl2') {
            $('#dG1').val(data.d[0].LevelId1)
            $('#dG2').val(data.d[0].LevelId2)
            $('#dG3').val(data.d[0].LevelId3)
            $('#dG4').val(data.d[0].LevelId4)
            $('#dG5').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            dg5();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $('#dG3').val(data.d[0].LevelId6)

            $('#h2').val(data.d[0].LevelId3)
            $('#h3').val(data.d[0].LevelId4)
            $('#h4').val(data.d[0].LevelId5)
            $('#h5').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);
        }
    }
    else {
        $('#dG5').val(-1);
    }
}
function onSuccessFillddl16(data, status) {

    setvalue();
    if (data.d != '') {
        $q('#dG1').val(data.d[0].LevelId1).select2()
        $q('#dG2').val(data.d[0].LevelId2).select2()
        $q('#dG3').val(data.d[0].LevelId3).select2()
        $q('#dG4').val(data.d[0].LevelId4).select2()
        $q('#dG5').val(data.d[0].LevelId5).select2()
        $q('#dG6').val(data.d[0].LevelId6).select2()

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)
        $('#h12').val(data.d[0].LevelId5)
        $('#h13').val(data.d[0].LevelId6)

        dg6();
        //OnChangeddG4();
    }
    else {
        $('#dG6').val(-1);
    }
}


function dg1() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2') {
        levelValue = $('#dG1').val();
        myData = "{'level1Id':'" + levelValue + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L1",
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
            $('#ddl2').val(-1)
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
        }

    } else {
        levelValue = $('#dG2').val();
        teamId = $('#dG1').val();
        myData = "{'level1Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L1WithTeam",
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
            $('#ddl2').val(-1)
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
        }
    }

    $('#dialog').jqmHide();

}
function dg1WithTeam() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    //levelValue = $('#dG1').val();
    //myData = "{'level1Id':'" + levelValue + "' }";
    if (CurrentUserRole == 'rl2') {
        levelValue = $('#dG1').val();
        teamId = $('#dG2').val();
        myData = "{'level1Id':'" + levelValue + "','teamId':'" + teamId + "' }";


        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L1WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG1WithTeam,
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
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }
    } else {
        levelValue = $('#dG1').val();
        teamId = $('#ddl2').val();
        myData = "{'level1Id':'" + levelValue + "','teamId':'" + teamId + "' }";


        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L1WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG1WithTeam,
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
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }
    }
    $('#dialog').jqmHide();

}
function dg2() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    if (CurrentUserRole == 'rl2') {
        levelValue = $('#dG2').val();
        myData = "{'level2Id':'" + levelValue + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L2",
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
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }
    } else if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'rl1') {
        levelValue = $('#dG2').val();
        myData = "{'level2Id':'" + levelValue + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L2",
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
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#dG3').val();
        teamId = $('#dG1').val();
        myData = "{'level2Id':'" + levelValue + "','teamId':'" + teamId + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L2WithTeam",
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
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }
    } else {
        levelValue = $('#dG3').val();
        myData = "{'level2Id':'" + levelValue + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L2",
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
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }
    }


    $('#dialog').jqmHide();

}
function dg2WithTeam() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    if (CurrentUserRole == 'rl2') {
        levelValue = $('#dG1').val();
        teamId = $('#ddlTeam').val();
        myData = "{'level1Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        //levelValue = $('#dG2').val();
        //myData = "{'level2Id':'" + levelValue + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L1WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG1WithTeam,
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
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }

        $('#dialog').jqmHide();
    } else {
        levelValue = $('#dG2').val();
        teamId = $('#ddlTeam').val();
        myData = "{'level2Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        //levelValue = $('#dG2').val();
        //myData = "{'level2Id':'" + levelValue + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L2WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG2WithTeam,
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
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }

        $('#dialog').jqmHide();
    }


}
function dg3() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#dG3').val();
    teamId = $('#dG2').val();
    myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L3",
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
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
    }

    $('#dialog').jqmHide();

}
function dg3WithTeam() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

        if ($('#ddl2').val() == "-1" || $('#ddl2').val() == " " || $('#ddl2').val() == null) {

            teamId = $('#dG1').val();
            myData = "{'level3Id':'" + EmployeeIdForTeam + "','teamId':'" + teamId + "' }";

            if (teamId != -1) {
                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/fillGH_L3WithTeam",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    async: false,
                    success: onSuccessG3WithTeam,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            else {
                $('#ddl3').val(-1)
                document.getElementById('dG4').innerHTML = "";
                document.getElementById('dG5').innerHTML = "";
                document.getElementById('dG6').innerHTML = "";
                document.getElementById('ddl4').innerHTML = "";
                document.getElementById('ddl5').innerHTML = "";
                document.getElementById('ddl6').innerHTML = "";
            }

            $('#dialog').jqmHide();

        } else {

            levelValue = $('#dG2').val();
            teamId = $('#dG1').val();
            myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";

            if (levelValue != -1) {
                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/fillGH_L3WithTeam",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    async: false,
                    success: onSuccessG3WithTeam,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            else {
                $('#ddl2').val(-1)
                document.getElementById('dG4').innerHTML = "";
                document.getElementById('dG5').innerHTML = "";
                document.getElementById('dG6').innerHTML = "";
                document.getElementById('ddl4').innerHTML = "";
                document.getElementById('ddl5').innerHTML = "";
                document.getElementById('ddl6').innerHTML = "";
            }

            $('#dialog').jqmHide();


        }


    } else if (CurrentUserRole == 'rl1') {

        levelValue = $('#dG2').val();
        teamId = $('#dG3').val();
        myData = "{'level2Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L2WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG3WithTeam,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $('#ddl3').val(-1)
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }

        $('#dialog').jqmHide();
    }
    else if (CurrentUserRole == 'rl2') {

        levelValue = $('#dG3').val();
        teamId = $('#dG2').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L3WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG3WithTeam,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $('#ddl3').val(-1)
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }

        $('#dialog').jqmHide();
    }
    else {

        levelValue = $('#dG3').val();
        teamId = $('#dG7').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L3WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG3WithTeam,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $('#ddl3').val(-1)
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }

        $('#dialog').jqmHide();
    }


}
function dg4() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#dG4').val();
    teamId = $('#dG3').val();
    myData = "{'level4Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L4WithTeam",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG4,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });

    }
    else {
        $('#ddl4').val(-1)
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
    }

    $('#dialog').jqmHide();

}
function dg4WithTeam() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if (CurrentUserRole == 'rl4') {

        teamId = $('#dG1').val();
        myData = "{'level4Id':'" + EmployeeIdForTeam + "','teamId':'" + teamId + "' }";
        //levelValue = $('#dG4').val();
        //teamId = $('#ddlTeam').val();
        //myData = "{'level4Id':'" + levelValue + "','teamId':'" + teamId + "' }";


        if (teamId != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L4WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG4WithTeam,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false

            });

        }
        else {
            $('#ddl4').val(-1)
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl1') {
        levelValue = $('#dG7').val();
        teamId = $('#dG3').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";


        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L3WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG4WithTeam,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false

            });

        }
        else {
            $('#ddlTeam').val(-1)
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }

        $('#dialog').jqmHide();
    }
    else if (CurrentUserRole == 'rl2') {
        levelValue = $('#dG7').val();
        teamId = $('#dG2').val();
        myData = "{'level4Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L4WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG4WithTeam,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false

            });

        }
        else {
            $('#ddl4').val(-1)
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }

        $('#dialog').jqmHide();
    }

    else {
        levelValue = $('#dG4').val();
        teamId = $('#dG7').val();
        myData = "{'level4Id':'" + levelValue + "','teamId':'" + teamId + "' }";


        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L4WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG4WithTeam,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false

            });

        }
        else {
            $('#ddl4').val(-1)
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }

        $('#dialog').jqmHide();
    }





}
function dg5() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();



    levelValue = $('#dG5').val();
    teamId = $('#dG7').val();
    myData = "{'level5Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L5WithTeam",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG5,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        $('#ddl5').val(-1)
        document.getElementById('dG6').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
    }

    $('#dialog').jqmHide();



}
function dg6() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    //FillMRDr();
    $('#h6').val(levelValue);

    $('#dialog').jqmHide();

}

function OnChangeddG1() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

        if ($('#dG1').val() == "-1") {
            $('#h5').val(0);
            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        //if ($('#dG1').val() != null && $('#ddl2').val() != null) {

        //    levelValue = $('#ddl2').val();
        //    var teamid = $('#dG1').val();
        //    myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        //    if (levelValue != -1) {

        //        $.ajax({
        //            type: "POST",
        //            url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel4",
        //            data: myData,
        //            contentType: "application/json; charset=utf-8",
        //            dataType: "json",
        //            success: onSuccessFillddl3withteamId,
        //            error: onError,
        //            beforeSend: startingAjax,
        //            complete: ajaxCompleted,
        //            cache: false
        //        });

        //    }
        //    else {

        //        $('#dG2').val(-1).select2()

        //        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
        //            $('#h5').val(0);
        //            $('#h12').val(0);
        //            $('#h13').val(0);
        //        }
        //        if (CurrentUserRole == 'rl1') {
        //            $('#h12').val(0);
        //            $('#h13').val(0);
        //        }
        //        if (CurrentUserRole == 'rl2') {
        //            $('#h13').val(0);
        //        }
        //        document.getElementById('ddl5').innerHTML = "";
        //        document.getElementById('ddl6').innerHTML = "";
        //        document.getElementById('dG5').innerHTML = "";
        //        document.getElementById('dG6').innerHTML = "";

        //    }

        //    $('#dialog').jqmHide();
        //} else {
        var teamid = $('#dG1').val();
        myData = "{'employeeId':'" + EmployeeIdForTeam + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteam",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl3withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $q('#dG1').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }
            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

        }

        $('#dialog').jqmHide();
        //}
    } else if (CurrentUserRole == 'rl2') {
        levelValue = $('#dG1').val();
        myData = "{'level1Id':'" + levelValue + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L1",
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

            $q('#ddl1').val(-1).select2()

            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl4') {
        var teamid = $('#dG1').val();
        myData = "{'employeeId':'" + EmployeeIdForTeam + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $q('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else {
        levelValue = $('#dG1').val();
        myData = "{'level1Id':'" + levelValue + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L1",
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

            $q('#ddl1').val(-1).select2()


            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $('#dialog').jqmHide();
    }


}
function OnChangeddG2() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }


    if (CurrentUserRole == 'rl2') {

        levelValue = $('#ddl1').val();
        var teamid = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel3",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl1withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $q('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $('#dialog').jqmHide();

    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#dG2').val();
        teamId = $('#dG1').val();
        myData = "{'level1Id':'" + levelValue + "','teamId':'" + teamId + "' }";


        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L1WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG1WithTeam,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

            G3a();

        }
        else {
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
            $q('#ddl2').val(-1).select2()

            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl4') {
        levelValue = $('#dG2').val();
        teamId = $('#dG1').val();
        myData = "{'level1Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L1WithTeam",
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

            $q('#ddl2').val(-1).select2()

            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else {
        levelValue = $('#dG2').val();
        myData = "{'level2Id':'" + levelValue + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L2",
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
            $q('#ddl2').val(-1).select2()
            OnChangeddl2();

            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }

        $('#dialog').jqmHide();
    }



}
function OnChangeddG3() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl1') {
        levelValue = $('#ddl2').val();
        var teamid = $('#dG3').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteam",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl3withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $q('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl1') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {

        levelValue = $('#dG3').val();
        teamId = $('#dG2').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L3WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG2WithTeam,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

            G3b();

        }
        else {
            $q('#ddl3').val(-1).select2()

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#dG3').val();
        teamId = $('#dG1').val();
        myData = "{'level2Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L2WithTeam",
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

            $('#h12').val(0);
            $('#h13').val(0);
            $q('#ddl3').val(-1).select2()

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else {
        levelValue = $('#dG3').val();
        teamId = $('#dG2').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L3",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG3,
                error: onError,
                beforeSend: startingAjax,
                cache: false
            });

            G3c();
        }
        else {
            $q('#ddl3').val(-1).select2()
            OnChangeddl3();

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }

        $('#dialog').jqmHide();
    }


}
function OnChangeddG4() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
        levelValue = $('#dG4').val();
        teamId = $('#dG7').val();
        myData = "{'level4Id':'" + levelValue + "','teamId':'" + teamId + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L4WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG4,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

            G3d();

        }
        else {
            $q('#ddl4').val(-1).select2()
            OnChangeddl4();

            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }
    } else if (CurrentUserRole == 'rl1') {
        levelValue = $('#dG4').val();
        teamId = $('#dG3').val();
        myData = "{'level4Id':'" + levelValue + "','teamId':'" + teamId + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L4WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG4,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

            G3d();

        }
        else {
            $q('#ddl4').val(-1).select2()
            OnChangeddl4();

            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }
    }
    else if (CurrentUserRole == 'headoffice') {
        levelValue = $('#dG4').val();
        teamId = $('#dG1').val();
        myData = "{'level2Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L4WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG4,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

            G3d();

        }
        else {
            $q('#ddl4').val(-1).select2()

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else {
        levelValue = $('#dG4').val();
        teamId = $('#dG2').val();
        myData = "{'level4Id':'" + levelValue + "','teamId':'" + teamId + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L4WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG4,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

            G3d();

        }
        else {
            $q('#ddl4').val(-1).select2()
            OnChangeddl4();

            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }
    }
    $('#dialog').jqmHide();

}
function OnChangeddG5() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    levelValue = $('#dG5').val();
    teamId = $('#dG7').val();
    myData = "{'level5Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";
    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L5WithTeam",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG5,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });

        G3e();

    }
    else {
        $q('#ddl5').val(-1).select2()
        OnChangeddl5();

        document.getElementById('dG6').innerHTML = "";

        document.getElementById('ddl6').innerHTML = "";

    }

    $('#dialog').jqmHide();

}
function OnChangeddG6() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    G3f();
    //FillMRDr();
    $('#dialog').jqmHide();

}

function onSuccessG1(data, status) {

    if (data.d != '') {
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        if (CurrentUserRole == 'rl2') {
            FillTeamsbyBUH();
        } else if (CurrentUserRole == 'rl4') {
            document.getElementById('dG7').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label7').text();;


            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitgm = nameslpit.split("_");
                $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitgm[1] + "</option>");
            });
        } else {
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label6').text();;


            $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitgm = nameslpit.split("_");
                $("#dG2").append("<option value='" + tweet.Item1 + "'>" + splitgm[1] + "</option>");
            });
        }


        //if (CurrentUserRole == 'rl1') {
        //    FillTeamsbyBUH();
        //}
    }

}
function onSuccessG1WithTeam(data, status) {

    if (data.d != '') {

        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";
        document.getElementById('dG7').innerHTML = "";



        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            document.getElementById('dG3').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label7').text();;


            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitgm = nameslpit.split("_");
                $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitgm[1] + "</option>");
            });
        } else if (CurrentUserRole == 'rl2') {
            document.getElementById('dG3').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label7').text();;


            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitgm = nameslpit.split("_");
                $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitgm[1] + "</option>");
            });
        } else {
            value = '-1';
            name = 'Select ' + $('#Label6').text();;


            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitgm = nameslpit.split("_");
                $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitgm[1] + "</option>");
            });
        }




    }

}
function onSuccessG2(data, status) {

    if (data.d != '') {
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        if (CurrentUserRole == 'rl1') {
            FillTeamsbyBUH();
        } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            document.getElementById('dG7').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label13').text();

            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitbuh = nameslpit.split("_");
                $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitbuh[1] + "</option>");
            });
        } else if (CurrentUserRole == 'rl4') {
            document.getElementById('dG3').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label7').text();

            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitbuh = nameslpit.split("_");
                $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitbuh[1] + "</option>");
            });
        } else {
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label7').text();

            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitbuh = nameslpit.split("_");
                $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitbuh[1] + "</option>");
            });
            if (CurrentUserRole == 'ftm') {
                SetNationalHierarchyForFTM();
            }
        }

    }

}
function onSuccessG2WithTeam(data, status) {

    if (data.d != '') {
        //document.getElementById('dG3').innerHTML = "";
        //document.getElementById('dG4').innerHTML = "";
        //document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";


        if (CurrentUserRole == 'rl1') {
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label8').text();

            $("#dG4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitbuh = nameslpit.split("_");
                $("#dG4").append("<option value='" + tweet.Item1 + "'>" + splitbuh[1] + "</option>");
            });
        } else if (CurrentUserRole == 'rl2') {
            document.getElementById('dG7').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label13').text();

            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitbuh = nameslpit.split("_");
                $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitbuh[1] + "</option>");
            });
        } else {
            value = '-1';
            name = 'Select ' + $('#Label7').text();

            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitbuh = nameslpit.split("_");
                $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitbuh[1] + "</option>");
            });
        }



    }

}
function onSuccessG3(data, status) {

    if (data.d != '') {
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";


        if (CurrentUserRole != 'rl2') {
            FillTeamsbyBUH();
        } else if (CurrentUserRole == 'rl2') {
            value = '-1';
            name = 'Select ' + $('#Label8').text();

            $("#dG4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitnsm = nameslpit.split("_");
                $("#dG4").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
            });
        }

        //if (CurrentUserRole == 'ftm') {
        //    SetRegionHierarchyForFTM();
        //}
    }

}
function onSuccessG3WithTeam(data, status) {

    if (data.d != '') {




        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            if ($("#ddl2").val() != null && $("#dG2").val() == null) {
                value = '-1';
                name = 'Select ' + $('#Label6').text();

                $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

                $.each(data.d, function (i, tweet) {
                    var nameslpit = tweet.Item2;
                    var splitnsm = nameslpit.split("_");
                    $("#dG2").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
                });

            } else if ($("#ddl2").val() != null) {
                value = '-1';
                name = 'Select ' + $('#Label7').text();

                $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

                $.each(data.d, function (i, tweet) {
                    var nameslpit = tweet.Item2;
                    var splitnsm = nameslpit.split("_");
                    $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
                });
            }







        } else if (CurrentUserRole == 'rl1') {
            document.getElementById('dG7').innerHTML = "";
            //if ($("#dG7").val() != null) {
            //    value = '-1';
            //    name = 'Select ' + $('#Label8').text();

            //    $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            //    $.each(data.d, function (i, tweet) {
            //        var nameslpit = tweet.Item2;
            //        var splitnsm = nameslpit.split("_");
            //        $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
            //    });
            //    if (CurrentUserRole == 'ftm') {
            //        SetRegionHierarchyForFTM();
            //    }
            //} else {
            value = '-1';
            name = 'Select ' + $('#Label13').text();

            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitnsm = nameslpit.split("_");
                $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
            });
            //}


        }
        else if (CurrentUserRole == 'rl2') {

            document.getElementById('dG7').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label13').text();

            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitnsm = nameslpit.split("_");
                $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
            });



        }
        else {
            value = '-1';
            name = 'Select ' + $('#Label8').text();

            $("#dG4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitnsm = nameslpit.split("_");
                $("#dG4").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
            });
            if (CurrentUserRole == 'ftm') {
                SetRegionHierarchyForFTM();
            }
        }
    }


}
function onSuccessG4(data, status) {

    if (data.d != '') {
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        value = '-1';
        name = 'Select ' + $('#Label11').text();

        $("#dG5").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            var nameslpit = tweet.Item2;
            var splitrsm = nameslpit.split("_");
            $("#dG5").append("<option value='" + tweet.Item1 + "'>" + splitrsm[1] + "</option>");
        });
    }

}
function onSuccessG4WithTeam(data, status) {


    if (CurrentUserRole == 'rl4') {
        if (data.d != '') {
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";


            value = '-1';
            name = 'Select ' + $('#Label6').text();

            $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitrsm = nameslpit.split("_");
                $("#dG2").append("<option value='" + tweet.Item1 + "'>" + splitrsm[1] + "</option>");
            });
        }
    } else if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2') {
        if (data.d != '') {
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";


            value = '-1';
            name = 'Select ' + $('#Label8').text();

            $("#dG4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitrsm = nameslpit.split("_");
                $("#dG4").append("<option value='" + tweet.Item1 + "'>" + splitrsm[1] + "</option>");
            });
        }
    }
    else {
        if (data.d != '') {
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";


            value = '-1';
            name = 'Select ' + $('#Label11').text();

            $("#dG5").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitrsm = nameslpit.split("_");
                $("#dG5").append("<option value='" + tweet.Item1 + "'>" + splitrsm[1] + "</option>");
            });
        }
    }


}
function onSuccessG5(data, status) {

    if (data.d != '') {
        document.getElementById('dG6').innerHTML = "";

        value = '-1';
        name = 'Select ' + $('#Label12').text();

        $("#dG6").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            var nameslpit = tweet.Item2;
            var splitzsm = nameslpit.split("_");
            $("#dG6").append("<option value='" + tweet.Item1 + "'>" + splitzsm[1] + "</option>");
        });
    }

}
function onSuccessG6(data, status) { }

function UH3() {

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddl2').val();
        teamId = $('#dG1').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";


        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
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
    } else if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddl2').val();
        teamId = $('#dG1').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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
    } else {
        levelValue = $('#ddl1').val();
        myData = "{'employeeId':'" + levelValue + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/datascreen.asmx/GetEmployee",
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


}
function UH4() {


    if (CurrentUserRole == 'rl1') {

        levelValue = $('#ddl2').val();
        teamId = $('#dG3').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel3",
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
    } else if (CurrentUserRole == 'rl2') {

        levelValue = $('#ddl3').val();
        teamId = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
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
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddl3').val();
        teamId = $('#dG1').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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
    } else {
        levelValue = $('#ddl2').val();
        myData = "{'employeeId':'" + levelValue + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/datascreen.asmx/GetEmployee",
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


}
function UH5() {


    if (CurrentUserRole == 'rl1') {

        levelValue = $('#ddlTeam').val();
        teamId = $('#dG3').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

        //levelValue = $('#ddl3').val();
        //myData = "{'employeeId':'" + levelValue + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel4",
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
    } else if (CurrentUserRole == 'rl2') {
        levelValue = $('#ddlTeam').val();
        teamId = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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
    else {
        levelValue = $('#dG3').val();
        teamId = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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


}
function UH6() {


    if (CurrentUserRole == 'rl1') {

        levelValue = $('#ddl4').val();
        var teamid = $('#dG3').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        //levelValue = $('#ddl4').val();
        //myData = "{'employeeId':'" + levelValue + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel5",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessUH6,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }

    } else if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
        levelValue = $('#ddl4').val();
        var teamid = $('#dG7').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        //levelValue = $('#ddl4').val();
        //myData = "{'employeeId':'" + levelValue + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessUH6,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
    } else {
        levelValue = $('#ddl4').val();
        var teamid = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        //levelValue = $('#ddl4').val();
        //myData = "{'employeeId':'" + levelValue + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessUH6,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
    }


}
function UH7() {

    levelValue = $('#ddl5').val();
    teamId = $('#dG7').val();
    myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessUH7,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }

}
function UH8() {

    levelValue = $('#ddl6').val();
    myData = "{'employeeId':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessUH8,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }

}

function onSuccessUH3(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";


    if (CurrentUserRole == 'rl1') {
        if (data.d != "") {

            jsonObj = JSON.parse(data.d);
            document.getElementById('ddl2').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label2').text();

            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }

    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        if (data.d != "") {

            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label3').text();

            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }
    } else if (CurrentUserRole == 'rl4') {
        if (data.d != "") {
            document.getElementById('ddlTeam').innerHTML = "";
            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label2').text();

            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }
    } else {
        document.getElementById('ddl2').innerHTML = "";
        if ($("#ddlTeam").val() == "-1") {

        } else {


            if (data.d != "") {

                jsonObj = JSON.parse(data.d);

                value = '-1';
                name = 'Select ' + $('#Label2').text();

                $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

                $.each(jsonObj, function (i, tweet) {
                    $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                });
            }
        }
    }


}
function onSuccessUH4(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (CurrentUserRole == 'rl1') {
        FillTeamsbyBUH();
    } else if (CurrentUserRole == 'rl2' || CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        if (data.d != "") {
            document.getElementById('ddlTeam').innerHTML = "";
            jsonObj = JSON.parse(data.d);
            value = '-1';
            name = 'Select ' + $('#Label14').text();
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }
    } else {
        if (data.d != "") {
            document.getElementById('ddl3').innerHTML = "";
            jsonObj = JSON.parse(data.d);
            value = '-1';
            name = 'Select ' + $('#Label3').text();
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }
    }


}
function onSuccessUH5(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";
    if (data.d != "") {
        if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2') {


            jsonObj = JSON.parse(data.d);
            value = '-1';
            name = 'Select ' + $('#Label4').text();
            $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });



        }
        else {

        }
    }


}
function onSuccessUH6(data, status) {

    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = JSON.parse(data.d);
        value = '-1';
        name = 'Select ' + $('#Label9').text();
        $("#ddl5").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl5").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }

}
function onSuccessUH7(data, status) {

    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = JSON.parse(data.d);
        value = '-1';
        name = 'Select ' + $('#Label10').text();
        $("#ddl6").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl6").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }

}
function onSuccessUH8(data, status) {
}

function G3a() {

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

        $('#h2').val($('#dG1').val());

        level1 = $('#dG1').val();
        level2 = 0;
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'marketingteam') {

        $('#h2').val($('#dG1').val());

        level1 = $('#dG1').val();
        level2 = 0;
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl1') {

        $('#h3').val($('#dG1').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl2') {

        $('#h4').val($('#dG1').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl3') {

        $('#h5').val($('#dG2').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'headoffice') {

        $('#h5').val($('#dG2').val());

        level1 = 0
        level2 = 0
        level3 = 0
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl4') {

        $('#h12').val($('#dG2').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl5') {

        $('#h13').val($('#dG1').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = $('#h13').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }

    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/Fillemp",
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

    //setvalue();
    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());

        level1 = $('#dG1').val();
        level2 = $('#dG2').val();
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'marketingteam') {
        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());

        level1 = $('#dG1').val();
        level2 = $('#dG2').val();
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl1') {

        $('#h4').val($('#dG2').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl2') {

        $('#h5').val($('#dG3').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl3') {

        $('#h12').val($('#dG3').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'headoffice') {

        $('#h12').val($('#dG3').val());

        level1 = 0
        level2 = 0
        level3 = 0
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl4') {

        $('#h13').val($('#dG7').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = $('#h13').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }

    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/Fillemp",
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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());
        $('#h4').val($('#dG3').val());

        level1 = $('#dG1').val();
        level2 = $('#dG2').val();
        level3 = $('#dG3').val();
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'marketingteam') {
        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());
        $('#h4').val($('#dG3').val());

        level1 = $('#dG1').val();
        level2 = $('#dG2').val();
        level3 = $('#dG3').val();
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl1') {

        $('#h5').val($('#dG7').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl2') {

        $('#h12').val($('#dG7').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl3') {

        $('#h13').val($('#dG7').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = $('#h13').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'headoffice') {


        $('#h13').val($('#dG7').val());

        level1 = 0
        level2 = 0
        level3 = 0
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = $('#h13').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/Fillemp",
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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());
        $('#h4').val($('#dG3').val());
        $('#h5').val($('#dG4').val());

        level1 = $('#dG1').val();
        level2 = $('#dG2').val();
        level3 = $('#dG3').val();
        level4 = $('#dG4').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl1') {

        $('#h12').val($('#dG4').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl2') {

        $('#h13').val($('#dG4').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = $('#h13').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'headoffice') {

        $('#h13').val($('#dG4').val());

        level1 = 0
        level2 = 0
        level3 = 0
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = $('#h13').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/Fillemp",
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
function G3e() {

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());
        $('#h4').val($('#dG3').val());
        $('#h5').val($('#dG4').val());
        $('#h12').val($('#dG5').val());

        level1 = $('#dG1').val();
        level2 = $('#dG2').val();
        level3 = $('#dG3').val();
        level4 = $('#dG4').val();
        level5 = $('#dG5').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl1') {

        $('#h13').val($('#dG5').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = $('#h13').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl2') {

        $('#h13').val($('#dG5').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = $('#h13').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }

    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/Fillemp",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessG3e,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

}
function G3f() {

    setvalue();

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());
        $('#h4').val($('#dG3').val());
        $('#h5').val($('#dG4').val());
        $('#h12').val($('#dG5').val());
        $('#h13').val($('#dG6').val());

        level1 = $('#dG1').val();
        level2 = $('#dG2').val();
        level3 = $('#dG3').val();
        level4 = $('#dG4').val();
        level5 = $('#dG5').val();
        level6 = $('#dG6').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }

    if (level6 != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/Fillemp",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG3f,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });

    }
    else {
        $('#ddl6').val(-1)
        OnChangeddl6();
    }
}

function onSuccessG3a(data, status) {

    if (data.d != '') {
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $q('#ddl2').val(data.d[0].Item1).select2()
        } else if (CurrentUserRole == 'rl4') {
            $q('#ddl2').val(data.d[0].Item1).select2()
        } else {
            $q('#ddl1').val(data.d[0].Item1).select2()
        }

    }
    else {
        $('#ddl1').val(-1)
    }
    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm' || CurrentUserRole == 'marketingteam' ||
           CurrentUserRole == 'rl1' || CurrentUserRole == 'rl3' ||
           CurrentUserRole == 'rl4' || CurrentUserRole == 'rl5' || CurrentUserRole == 'headoffice') {
        UH3();
    }

}
function onSuccessG3b(data, status) {

    if (data != '') {
        if (CurrentUserRole == 'rl4') {
            $q('#ddlTeam').val(data.d[0].Item1).select2()
        } else if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'rl1') {
            $q('#ddl2').val(data.d[0].Item1).select2()
        } else {
            $q('#ddl3').val(data.d[0].Item1).select2()
        }
        if (CurrentUserRole == 'rl4') {
            $('#h6').val(data.d[0].Item1)
        }
    }
    else {
        $('#ddl2').val(-1)
    }
    if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2' || CurrentUserRole == 'rl3' ||
           CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm' || CurrentUserRole == 'marketingteam' || CurrentUserRole == 'headoffice') {
        UH4();
    }

}
function onSuccessG3c(data, status) {

    if (data != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
            $q('#ddl3').val(data.d[0].Item1).select2()
        } else {
            $q('#ddlTeam').val(data.d[0].Item1).select2()
        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#h6').val(data.d[0].Item1)

        }

    }
    else {
        //$('#ddl3').val(-1)
    }


    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm' || CurrentUserRole == 'rl1' ||
        CurrentUserRole == 'rl2' || CurrentUserRole == 'marketingteam') {
        UH5();
    }

}
function onSuccessG3d(data, status) {

    if (data != '') {

        $q('#ddl4').val(data.d[0].Item1).select2()

        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#h6').val(data.d[0].Item1)
        }

    }
    else {
        $('#ddl4').val(-1)
    }

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm' || CurrentUserRole == 'rl1' ||
           CurrentUserRole == 'rl2' || CurrentUserRole == 'marketingteam') {
        UH6();
    }

}
function onSuccessG3e(data, status) {

    if (data != '') {
        $q('#ddl5').val(data.d[0].Item1).select2()

        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#h6').val(data.d[0].Item1)
        }
    }
    else {
        $('#ddl5').val(-1)
    }

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm' || CurrentUserRole == 'rl1' ||
        CurrentUserRole == 'rl2' || CurrentUserRole == 'marketingteam') {
        UH7();
    }
}
function onSuccessG3f(data, status) {

    if (data != '') {

        $q('#ddl6').val(data.d[0].Item1).select2()
        $('#h6').val(data.d[0].Item1);


    }
    else {
        $('#ddl6').val(-1)
    }
    UH8();

}

function FillDropDownList() {

    myData = "{'levelName':'" + glbVarLevelName + "' }";

    $.ajax({
        type: "POST",
        url: "../Reports/datascreen.asmx/FilterDropDownList",
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

        jsonObj = JSON.parse(data.d);

        if (glbVarLevelName == "Level1") {
            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            value = '-1';
            //farazlabel
            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                name = 'Select ' + HierarchyLevel1;
                $('#Label1').html(HierarchyLevel1 + " " + "");
                $('#Label2').html(HierarchyLevel2 + " " + "");
                $('#Label3').html(HierarchyLevel3 + " " + "");
                $('#Label4').html(HierarchyLevel4 + " " + "");
                $('#Label9').html(HierarchyLevel5 + " " + "");
                $('#Label10').html(HierarchyLevel6 + " " + "-TMs");
                $('#Label14').html("Team");

                $('#Label5').html(HierarchyLevel1 + " " + "Level ");
                $('#Label6').html(HierarchyLevel2 + " " + "Level ");
                $('#Label7').html(HierarchyLevel3 + " " + "Level ");
                $('#Label8').html(HierarchyLevel4 + " " + "Level ");
                $('#Label11').html(HierarchyLevel5 + " " + "Level ");
                $('#Label12').html(HierarchyLevel6 + " " + "Level ");
                $('#Label13').html("Team");
            }
            if (CurrentUserRole == 'rl1') {
                name = 'Select ' + HierarchyLevel2;
                $('#Label1').html(HierarchyLevel2 + " " + "");
                $('#Label2').html(HierarchyLevel3 + " " + "");
                $('#Label3').html("Team");
                $('#Label14').html(HierarchyLevel4 + " " + "");
                $('#Label4').html(HierarchyLevel5 + " " + "");
                $('#Label9').html(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').html(HierarchyLevel2 + " " + "Level ");
                $('#Label6').html(HierarchyLevel3 + " " + "Level ");
                $('#Label7').html("Team");
                $('#Label13').html(HierarchyLevel4 + " " + "Level ");
                $('#Label8').html(HierarchyLevel5 + " " + "Level ");
                $('#Label11').html(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl2') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').html(HierarchyLevel3 + " " + "");
                $('#Label2').html("Team");
                $('#Label3').html(HierarchyLevel4 + " " + "");
                $('#Label14').html(HierarchyLevel5 + " " + "");
                $('#Label4').html(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').html(HierarchyLevel3 + " " + "Level ");
                $('#Label6').html("Team");
                $('#Label7').html(HierarchyLevel4 + " " + "Level ");
                $('#Label13').html(HierarchyLevel5 + " " + "Level ");
                $('#Label8').html(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').html("Team");
                $('#Label2').html(HierarchyLevel4 + " " + "");
                $('#Label3').html(HierarchyLevel5 + " " + "-TMs ");
                $('#Label14').html(HierarchyLevel6 + " " + "-TMs ");


                $('#Label5').html("Team");
                $('#Label6').html(HierarchyLevel4 + " " + "Level ");
                $('#Label7').html(HierarchyLevel5 + " " + "Level ");
                $('#Label13').html(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').html("Team");
                $('#Label2').html(HierarchyLevel5 + " " + "-TMs ");
                $('#Label14').html(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').html("Team");
                $('#Label6').html(HierarchyLevel5 + " " + "Level ");
                $('#Label13').html(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').html(HierarchyLevel6 + " " + "-TMs ");
                $('#Label5').html(HierarchyLevel6 + " " + "Level ");
                $('#col77').hide();
                $('.Th12').hide();
            }

            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'rl4' || CurrentUserRole == 'headoffice') {

            } else {

                name = 'Select ' + $('#Label1').text();
                $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

                $.each(jsonObj, function (i, tweet) {
                    $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                });
            }


        }
        else if (glbVarLevelName == "Level3") {

            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";

            value = '-1';

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').html(HierarchyLevel3 + " " + "");
                $('#Label2').html(HierarchyLevel4 + " " + "");
                $('#Label3').html(HierarchyLevel5 + " " + "");
                $('#Label4').html(HierarchyLevel6 + " " + "-TMs");

                $('#Label5').html(HierarchyLevel3 + " " + "Level ");
                $('#Label6').html(HierarchyLevel4 + " " + "Level ");
                $('#Label7').html(HierarchyLevel5 + " " + "Level ");
                $('#Label8').html(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'marketingteam') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').html(HierarchyLevel3 + " " + "");
                $('#Label2').html(HierarchyLevel4 + " " + "");
                $('#Label3').html(HierarchyLevel5 + " " + "");
                $('#Label4').html(HierarchyLevel6 + " " + "-TMs");

                $('#Label5').html(HierarchyLevel3 + " " + "Level ");
                $('#Label6').html(HierarchyLevel4 + " " + "Level ");
                $('#Label7').html(HierarchyLevel5 + " " + "Level ");
                $('#Label8').html(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').html(HierarchyLevel4 + " " + "");
                $('#Label2').html(HierarchyLevel5 + " " + "");
                $('#Label3').html(HierarchyLevel6 + " " + "-TMs ");


                $('#Label5').html(HierarchyLevel4 + " " + "Level ");
                $('#Label6').html(HierarchyLevel5 + " " + "Level ");
                $('#Label7').html(HierarchyLevel6 + " " + "Level ");



            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').html(HierarchyLevel5 + " " + "");
                $('#Label2').html(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').html(HierarchyLevel5 + " " + "Level ");
                $('#Label6').html(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').html(HierarchyLevel6 + " " + "-TMs");
                $('#Label5').html(HierarchyLevel6 + " " + "Level ");
            }


            name = 'Select ' + $('#Label1').text();
            $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }

        FillGh();
    }
    if (CurrentUserRole == "admin" || CurrentUserRole == "headoffice") {

    } else {
        //Comment by Rahim instruct by Ahmer
        //if ($('#ddlDataType').val() == 1) {
        //    HideHierarchy()
        //}
    }
    LoadData('0', l13, l14);
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
    $('#g5').hide();
    $('#g6').hide();

    $('#btnsubmitbrickdata1').hide();
    $('#uploadify_button2').hide();
    $('#exportExcel2').hide();
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

function SetGMHierarchyForFTM() {

    $.ajax({
        type: "POST",
        url: "../Form/QuizTestService.asmx/SetHierarchyForFTM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessSetGMHierarchyForFTM,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });

}
function onSuccessSetGMHierarchyForFTM(data, status) {

    if (data.d != '') {
        // set GMids ids only

        var jsonObj = JSON.parse(data.d);
        $.each(jsonObj[1], function (i, tweet) {
            GMids.push(tweet.EmployeeId)
        });

        // get unique GMids id from array
        GMids = GMids.filter(function (itm, i, GMids) {
            return i == GMids.indexOf(itm);
        });

        // show and hide GMids dropdown options
        $("#ddl1").children('option').hide();
        $("#ddl1").children("option[value='-1']").show()
        $.each(GMids, function (i, tweet) {
            $("#ddl1").children("option[value='" + tweet + "']").show()
        });


        // set GMids team ids only
        $.each(jsonObj[1], function (i, tweet) {
            GMteams.push(tweet.Level1LevelId)
        });

        // get unique GMteams id from array
        GMteams = GMteams.filter(function (itm, i, GMteams) {
            return i == GMteams.indexOf(itm);
        });


        // show and hide national team dropdown options
        $("#dG1").children('option').hide();
        $("#dG1").children("option[value='-1']").show()
        $.each(GMteams, function (i, tweet) {
            $("#dG1").children("option[value='" + tweet + "']").show()
        });

        // set BUHids ids only
        $.each(jsonObj[2], function (i, tweet) {
            BUHids.push(tweet.EmployeeId)
        });

        // get unique BUHids id from array
        BUHids = BUHids.filter(function (itm, i, BUHids) {
            return i == BUHids.indexOf(itm);
        });

        // show and hide national dropdown options
        $("#ddl2").children('option').hide();
        $("#ddl2").children("option[value='-1']").show()
        $.each(BUHids, function (i, tweet) {
            $("#ddl2").children("option[value='" + tweet + "']").show()
        });


        // set BUHteams team ids only
        $.each(jsonObj[2], function (i, tweet) {
            BUHteams.push(tweet.Level2LevelId)
        });

        // get unique BUHteams id from array
        BUHteams = BUHteams.filter(function (itm, i, BUHteams) {
            return i == BUHteams.indexOf(itm);
        });


        // show and hide BUHteams team dropdown options
        $("#dG2").children('option').hide();
        $("#dG2").children("option[value='-1']").show()
        $.each(BUHteams, function (i, tweet) {
            $("#dG2").children("option[value='" + tweet + "']").show()
        });


        // set national ids only
        $.each(jsonObj[3], function (i, tweet) {
            nationalids.push(tweet.EmployeeId)
        });

        // get unique national id from array
        nationalids = nationalids.filter(function (itm, i, nationalids) {
            return i == nationalids.indexOf(itm);
        });

        // show and hide national dropdown options
        $("#ddl3").children('option').hide();
        $("#ddl3").children("option[value='-1']").show()
        $.each(nationalids, function (i, tweet) {
            $("#ddl3").children("option[value='" + tweet + "']").show()
        });


        // set national team ids only
        $.each(jsonObj[3], function (i, tweet) {
            nationalteams.push(tweet.Level3LevelId)
        });

        // get unique national id from array
        nationalteams = nationalteams.filter(function (itm, i, nationalteams) {
            return i == nationalteams.indexOf(itm);
        });


        // show and hide national team dropdown options
        $("#dG3").children('option').hide();
        $("#dG3").children("option[value='-1']").show()
        $.each(nationalteams, function (i, tweet) {
            $("#dG3").children("option[value='" + tweet + "']").show()
        });


        // set region ids only        
        $.each(jsonObj[4], function (i, tweet) {
            regionids.push(tweet.EmployeeId)
        });

        // get unique region id from array
        regionids = regionids.filter(function (itm, i, regionids) {
            return i == regionids.indexOf(itm);
        });

        // set region team ids only
        $.each(jsonObj[4], function (i, tweet) {
            regionteams.push(tweet.Level4LevelId)
        });

        // get unique region id from array
        regionteams = regionteams.filter(function (itm, i, regionteams) {
            return i == regionteams.indexOf(itm);
        });

    }

}

function SetBUHHierarchyForFTM() {
    // show and hide region dropdown options
    $("#ddl2").children('option').hide();
    $("#ddl2").children("option[value='-1']").show()
    $.each(BUHids, function (i, tweet) {
        $("#ddl2").children("option[value='" + tweet + "']").show()
    });

    // show and hide region team dropdown options
    $("#dG2").children('option').hide();
    $("#dG2").children("option[value='-1']").show()
    $.each(BUHteams, function (i, tweet) {
        $("#dG2").children("option[value='" + tweet + "']").show()
    });

}
function SetNationalHierarchyForFTM() {
    // show and hide region dropdown options
    $("#ddl3").children('option').hide();
    $("#ddl3").children("option[value='-1']").show()
    $.each(nationalids, function (i, tweet) {
        $("#ddl3").children("option[value='" + tweet + "']").show()
    });

    // show and hide region team dropdown options
    $("#dG3").children('option').hide();
    $("#dG3").children("option[value='-1']").show()
    $.each(nationalteams, function (i, tweet) {
        $("#dG3").children("option[value='" + tweet + "']").show()
    });

}
function SetRegionHierarchyForFTM() {

    // show and hide region dropdown options
    $("#ddl4").children('option').hide();
    $("#ddl4").children("option[value='-1']").show()
    $.each(regionids, function (i, tweet) {
        $("#ddl4").children("option[value='" + tweet + "']").show()
    });

    // show and hide region team dropdown options
    $("#dG4").children('option').hide();
    $("#dG4").children("option[value='-1']").show()
    $.each(regionteams, function (i, tweet) {
        $("#dG4").children("option[value='" + tweet + "']").show()
    });

}
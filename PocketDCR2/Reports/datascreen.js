function pageLoad() {

    IsValidUser();
    $('#ddl1').change(OnChangeddl1);
    $('#ddl2').change(OnChangeddl2);
    $('#ddl3').change(OnChangeddl3);
    $('#ddl4').change(OnChangeddl4);
    HideHierarchy();
    GetCurrentUser();
    GetSuccessSMS();
}

$(function () {



   // $("#txtDate").datepicker();
    var cdt = new Date();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var current_mint = cdt.getMinutes();
    var current_hrs = cdt.getHours();
    var current_date = cdt.getDate();
    var current_month = cdt.getMonth();
    var current_month = current_month + 1;
    var month_name = monthNames[current_month];
    var current_year = cdt.getFullYear();
    $('#txtDate').val(current_month + '/' + current_date + '/' + current_year);


    $('#txtDate').change(function () {
        $('#dialog').jqm({ modal: true });
        $('#dialog').jqm();
        $('#dialog').jqmShow();


        GetSuccessSMS();

        $('#dialog').jqmHide();
    });

});

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
        url: "../Form/CommonService.asmx/GetCurrentUser",
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
        url: "../Form/CommonService.asmx/GetCurrentUserLoginID",
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
        url: "../Form/CommonService.asmx/GetCurrentUserRole",
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
        url: "../Form/CommonService.asmx/GetHierarchyLevels",
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



            FillDropDownList();
        }
        if (CurrentUserRole == 'rl3') {
            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();

            FillDropDownList();
        }
        if (CurrentUserRole == 'rl4') {
            $('#col1').show();
            $('#col2').show();

            $('#col11').show();
            $('#col22').show();

            FillDropDownList();
        }
        if (CurrentUserRole == 'rl5') {
            $('#col1').show();
            $('#col11').show();
            FillDropDownList();
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
                $('#Label1').append(HierarchyLevel3);
                $('#Label2').append(HierarchyLevel4);
                $('#Label3').append(HierarchyLevel5);
                $('#Label4').append(HierarchyLevel6);
            }
            if (CurrentUserRole == 'rl3') {
                name = 'Select ' + HierarchyLevel4;
                $('#Label1').append(HierarchyLevel4);
                $('#Label2').append(HierarchyLevel5);
                $('#Label3').append(HierarchyLevel6);
            }
            if (CurrentUserRole == 'rl4') { name = 'Select ' + HierarchyLevel5; $('#Label1').append(HierarchyLevel5); $('#Label2').append(HierarchyLevel6); }
            if (CurrentUserRole == 'rl5') { name = 'Select ' + HierarchyLevel6; $('#Label1').append(HierarchyLevel6); }


            $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");
            $.each(jsonObj, function (i, tweet) {
                $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }

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

}

function OnChangeddl1() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#ddl1').val();
    myData = "{'employeeId':'" + levelValue + "' }";

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


    } else {

        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
    }

    GetSuccessSMS();

    $('#dialog').jqmHide();

}
function onSuccessFillddl1(data, status) {

    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);


        value = '-1';
        name = 'Select ' + HierarchyLevel4;
        $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }


}

function OnChangeddl2() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

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

        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
    }

    GetSuccessSMS();

    $('#dialog').jqmHide();
}
function onSuccessFillddl2(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);


        value = '-1';
        name = 'Select ' + HierarchyLevel5;
        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }


}

function OnChangeddl3() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

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
        document.getElementById('ddl4').innerHTML = "";
    }

    GetSuccessSMS();


    $('#dialog').jqmHide();
}
function onSuccessFillddl3(data, status) {
    document.getElementById('ddl4').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);


        value = '-1';
        name = 'Select ' + HierarchyLevel6;
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }

}

function OnChangeddl4() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    GetSuccessSMS();

    $('#dialog').jqmHide();
}
function onSuccessFillddl4(data, status) {

}

function OnChangeddl5() { }
function onSuccessFillddl5(data, status) { }

function GetSuccessSMS() {
    //    $('#dialog').jqm({ modal: true });
    //    $('#dialog').jqm();
    //    $('#dialog').jqmShow();


    if ($('#ddl1').val() != null) {
        level3 = $('#ddl1').val();
    } else {
        level3 = -1
    }

    if ($('#ddl2').val() != null) {
        level4 = $('#ddl2').val();
    } else {
        level4 = -1
    }

    if ($('#ddl3').val() != null) {
        level5 = $('#ddl3').val();
    } else {
        level5 = -1
    }

    if ($('#ddl4').val() != null) {
        level6 = $('#ddl4').val();
    } else {
        level6 = -1
    }

    employeeid = 0; startdate = $('#txtDate').val(); enddate = $('#txtDate').val();

    myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6
    + "','EmployeeId':'" + employeeid
    + "','StartingDate':'" + startdate
    + "','EndingDate':'" + enddate
    + "'}";

    $.ajax({
        type: "POST",
        url: "datascreen.asmx/SuccessDCRData",
        data: myData,
        contentType: "application/json",
        async: false,
        success: onSuccessGetSuccessSMS,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });



}
function onSuccessGetSuccessSMS(data, status) {

    $('#SuccessSMS .dataTables_wrapper').remove();

    $('#SuccessSMS').prepend($('<table id="datatables2" class="display"><thead><tr><th>Division</th><th>Region</th><th>Zone</th><th>Territory</th><th>Employee Name</th><th>Mobile Number</th><th>Visit Date</th><th>RecievedDate</th><th>Doctor Name</th><th>Brick</th><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>S1</th><th>SQ1</th><th>S2</th><th>SQ2</th><th>S3</th><th>SQ3</th><th>R1</th><th>R2</th><th>R3</th><th>G1</th><th>G2</th><th>JV1</th><th>JV2</th><th>JV3</th><th>JV4</th></tr></thead><tbody>'));
    $.each(data.d, function (i, option) {
        $('#datatables2').append($('<tr><td>' + option.division + '</td><td>' + option.Region + '</td><td>' + option.zone + '</td><td>' + option.Territory + '</td><td>' + option.EmployeeName + '</td><td>' + option.MobileNumber + '</td><td>' + option.VisitDate.split(' ')[0] + '</td>' + '<td>' + option.RecieveDate + '</td>' + '<td>' + option.DoctorName + '</td><td>' + option.Brick + '</td><td>' + option.P1 + '</td><td>' + option.P2 + '</td><td>' + option.P3 + '</td><td>' + option.P4 + '</td><td>' + option.S1 + '</td><td>' + option.SQ1 + '</td><td>' + option.S2 + '</td><td>' + option.SQ2 + '</td><td>' + option.S3 + '</td><td>' + option.SQ3 + '</td><td>'
          + option.R1 + '</td><td>' + option.R2 + '</td><td>' + option.R3 + '</td><td>' + option.G1 + '</td><td>' + option.G2 + '</td><td>' + option.JV1 + '</td><td>' + option.JV2 + '</td><td>' + option.JV3 + '</td><td>' + option.JV4 + '</td></tr>'));
    });
    $('#SuccessSMS').append($('</tbody></table>'));

    var forScroll = $('.dataTables_wrapper').outerWidth();

    $('#datatables2').dataTable({
        "sPaginationType": "full_numbers",
        "bJQueryUI": true,
        "sScrollX": forScroll,
        "bScrollCollapse": true
    });

    GetErrorSMS();


}

function onSuccessFillDoctor1(data, status) {

    $('#checking .dataTables_wrapper').remove();

    $('#checking').prepend($('<table id="datatables" class="display"><thead><tr><th>Fullname</th><th>Username</th><th>Email ID</th><th>Phone No</th><th>Gender</th></tr></thead><tbody>'));
    $.each(data.d, function (i, option) {
        $('#datatables').append($('<tr><td>' + option.ID + '</td><td>' + option.Code + '</td><td>' + option.Name + '</td><td>' + option.Class + '</td><td>' + option.Class + '</td></tr>'));
    });
    $('#checking').append($('</tbody></table>'));

}

function GetErrorSMS() {

    if ($('#ddl1').val() != null) {
        level3 = $('#ddl1').val();
    } else {
        level3 = -1
    }

    if ($('#ddl2').val() != null) {
        level4 = $('#ddl2').val();
    } else {
        level4 = -1
    }

    if ($('#ddl3').val() != null) {
        level5 = $('#ddl3').val();
    } else {
        level5 = -1
    }

    if ($('#ddl4').val() != null) {
        level6 = $('#ddl4').val();
    } else {
        level6 = -1
    }

    employeeid = 0; startdate = $('#txtDate').val(); enddate = $('#txtDate').val();

    myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6
    + "','EmployeeId':'" + employeeid
    + "','StartingDate':'" + startdate
    + "','EndingDate':'" + enddate
    + "'}";

    $.ajax({
        type: "POST",
        url: "datascreen.asmx/ErrorData",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetErrorSMS,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

}
function onSuccessGetErrorSMS(data, status) {

    $('#checking #datatables_wrapper').remove();

    $('#checking').prepend($('<table id="datatables" class="display"><thead><tr><th>Mobile Number</th><th>Message Text</th><th>Message type</th><th>Remarks</th><th>Created Date</th></tr></thead><tbody>'));
    $.each(data.d, function (i, option) {
        $('#datatables').append($('<tr><td>' + option.mobilenumber + '</td><td>' + option.messagetext + '</td><td>' + option.messagetype + '</td><td>' + option.remarks + '</td><td>' + option.createddate + '</td></tr>'));
    });
    $('#checking').append($('</tbody></table>'));


    $('#datatables').dataTable({
        "sPaginationType": "full_numbers",
        "bJQueryUI": true
    });

    //  
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



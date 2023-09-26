var employeeIDFORDATA = '0';
var startDateValidate = '0';
var EndDateValidate = '0';
function pageLoad() {
    var cdt = new Date();
    var monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    var current_mint = cdt.getMinutes();
    var current_hrs = cdt.getHours();
    var current_date = cdt.getDate();
    var current_month = cdt.getMonth();
    var month_name = monthNames[current_month];
    var current_year = cdt.getFullYear();
    $('#txtDate').val(month_name + '-' + current_year);
    $('#txtenddate').val(month_name + '-' + current_year);
    IsValidUser();
    $('#ddl1').change(OnChangeddl1);
    $('#ddl2').change(OnChangeddl2);
    $('#ddl3').change(OnChangeddl3);
    $('#ddl4').change(OnChangeddl4);
    $('#ddl5').change(OnChangeddl5);
    $('#ddl6').change(OnChangeddl6);
    $('#ddlDoctors').change(OnChangeddlddlDoctors);
    $('#ddlCSRActivities').change(OnChangeddlddlCSRActivities);

    OnChangeddlddlDoctors();
    //$('#ddlCSRActivities').change(OnChangeddl6);
    HideHierarchy();
    GetCurrentUser();
}


function IsValidUser() {
    $.ajax({
        type: 'POST',
        url: 'NewDashboard.asmx/IsValidUser',
        contentType: 'application/json; charset=utf-8',
        success: onSuccessValidUser,
        error: onError,
        cache: false
    });
}
function onSuccessValidUser(data, status) {
    var stat = data.d;
    if (stat) {
        if ($('#ddl1').val() != null) {
            level1 = $('#ddl1').val();
        } else {
            level1 = -1
        }
        if ($('#ddl2').val() != null) {
            level2 = $('#ddl2').val();
        } else {
            level2 = -1
        }
        if ($('#ddl3').val() != null) {
            level3 = $('#ddl3').val();
        } else {
            level3 = -1
        }
        if ($('#ddl4').val() != null) {
            level4 = $('#ddl4').val();
        } else {
            level4 = -1
        }
        if ($('#ddl5').val() != null) {
            level5 = $('#ddl5').val();
        } else {
            level5 = -1
        }
        if ($('#ddl6').val() != null) {
            level6 = $('#ddl6').val();
        } else {
            level6 = -1
        }
        startdate = $('#txtDate').val();
        enddate = $('#txtenddate').val();
        if (level6 != -1) {
            GetCurrentLevelIDs(level6);
        } else if (level5 != -1) {
            GetCurrentLevelIDs(level5);
        } else if (level4 != -1) {
            GetCurrentLevelIDs(level4);
        } else if (level3 != -1) {
            GetCurrentLevelIDs(level3);
        }
        else if (level2 != -1) {
            GetCurrentLevelIDs(level2);
        }
        else if (level1 != -1) {
            GetCurrentLevelIDs(level1);
        }
        else {
            GetCurrentLevelIDs(0);
        }
    }
    else {
        window.location = '/Form/Login.aspx';
    }
}
function GetCurrentLevelIDs(type) {
    myData = '{\'type\':\'' + type + '\'}';
    employeeIDFORDATA = type;
    $.ajax({
        type: 'POST',
        url: 'datascreen.asmx/GetCurrentLevelId',
        contentType: 'application/json; charset=utf-8',
        data: myData,
        success: onSuccessgetCurrentLevelID,
        error: onError,
        cache: false
    });
}
function onSuccessGetCurrentUser(data, status) {
    if (data.d != '') {
        EmployeeId = data.d;
    }
    GetCurrentUserLoginID();
}
function GetCurrentUserLoginID() {
    $.ajax({
        type: 'POST',
        url: '../Form/CommonService.asmx/GetCurrentUserLoginID',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: onSuccessGetCurrentUserLoginID,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetCurrentUserLoginID(data, status) {
    if (data.d != '') {
        CurrentUserLoginId = data.d;
    }
    GetCurrentUserRole();
}
function GetCurrentUserRole() {
    $.ajax({
        type: 'POST',
        url: '../Form/CommonService.asmx/GetCurrentUserRole',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: onSuccessGetCurrentUserRole,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetCurrentUserRole(data, status) {
    if (data.d != '') {
        CurrentUserRole = data.d;
    }  // GetEditableDataLoginId();

    RetrieveAppConfig();
}// Enable / Disable DropDownLists Filter With Hierarchy




function RetrieveAppConfig() {
    $.ajax({
        type: 'POST',
        url: '../Form/CommonService.asmx/GetHierarchyLevels',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: onSuccessGetLevels,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetLevels(data, status) {
    if (data.d != '') {
        jsonObj = jsonParse(data.d);
        glbVarLevelName = jsonObj[0].SettingName;
        if (glbVarLevelName == 'Level1') {
            HierarchyLevel1 = jsonObj[0].SettingValue;
            HierarchyLevel2 = jsonObj[1].SettingValue;
            HierarchyLevel3 = jsonObj[2].SettingValue;
            HierarchyLevel4 = jsonObj[3].SettingValue;
            HierarchyLevel5 = jsonObj[4].SettingValue;
            HierarchyLevel6 = jsonObj[5].SettingValue;
        }
        if (glbVarLevelName == 'Level2') {
            HierarchyLevel1 = 0;
            HierarchyLevel2 = jsonObj[0].SettingValue;
            HierarchyLevel3 = jsonObj[1].SettingValue;
            HierarchyLevel4 = jsonObj[2].SettingValue;
            HierarchyLevel5 = jsonObj[3].SettingValue;
            HierarchyLevel6 = jsonObj[4].SettingValue;
        }
        if (glbVarLevelName == 'Level3') {
            HierarchyLevel1 = 0;
            HierarchyLevel2 = 0;
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
    if (CurrentUserRole == 'admin') {
        if (glbVarLevelName == 'Level1') {
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
        if (glbVarLevelName == 'Level2') {
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
        }
        if (glbVarLevelName == 'Level3') {
            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col4').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();
            $('#col44').show();
        }
        FillDropDownList(CurrentUserRole);
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
        FillDropDownList(CurrentUserRole);
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
        FillDropDownList(CurrentUserRole);
    }
    if (CurrentUserRole == 'rl3') {
        $('#col1').show();
        $('#col2').show();
        $('#col3').show();
        $('#col11').show();
        $('#col22').show();
        $('#col33').show();
        FillDropDownList(CurrentUserRole);
    }
    if (CurrentUserRole == 'rl4') {
        $('#col1').show();
        $('#col2').show();
        $('#col11').show();
        $('#col22').show();
        FillDropDownList(CurrentUserRole);
    }
    if (CurrentUserRole == 'rl5') {
        $('#col1').show();
        $('#col11').show();
        FillDropDownList(CurrentUserRole);
    }
}
function onSuccessgetCurrentLevelID(data, status) {
    if (data.d != '') {
        $('#L1').val(data.d.split(':')[0]);
        $('#L2').val(data.d.split(':')[1]);
        $('#L3').val(data.d.split(':')[2]);
        $('#L4').val(data.d.split(':')[3]);
        $('#L5').val(data.d.split(':')[4]);
        $('#L6').val(data.d.split(':')[5]);
    } else {
        $('#L1').val(0);
        $('#L2').val(0);
        $('#L3').val(0);
        $('#L4').val(0);
        $('#L5').val(0);
        $('#L6').val(0);
    }
}
function onComplete() {
}
function GetCurrentUser() {
    $.ajax({
        type: 'POST',
        url: '../Form/CommonService.asmx/GetCurrentUser',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: onSuccessGetCurrentUser,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetCurrentUser(data, status) {
    if (data.d != '') {
        EmployeeId = data.d;
    }
    GetCurrentUserLoginID();
}
function GetCurrentUserLoginID() {
    $.ajax({
        type: 'POST',
        url: '../Form/CommonService.asmx/GetCurrentUserLoginID',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: onSuccessGetCurrentUserLoginID,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetCurrentUserLoginID(data, status) {
    if (data.d != '') {
        CurrentUserLoginId = data.d;
    }
    GetCurrentUserRole();
}
function GetCurrentUserRole() {
    $.ajax({
        type: 'POST',
        url: '../Form/CommonService.asmx/GetCurrentUserRole',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: onSuccessGetCurrentUserRole,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetCurrentUserRole(data, status) {
    if (data.d != '') {
        CurrentUserRole = data.d;
    }  // GetEditableDataLoginId();

    RetrieveAppConfig();
}
function GetEditableDataLoginId() {
    myData = '{\'employeeId\':\'' + EmployeeId + '\'}';
    $.ajax({
        type: 'POST',
        url: 'datascreen.asmx/GetEmployee',
        data: myData,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: onSuccessGetEditableDataLoginId,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetEditableDataLoginId(data, status) {
    if (data.d != '') {
        jsonObj = jsonParse(data.d);
        EditableDataLoginId = jsonObj[0].LoginId;
    }  // GetEditableDataRole();

}
function GetEditableDataRole() {
    myData = '{\'employeeId\':\'' + EmployeeId + '\'}';
    $.ajax({
        type: 'POST',
        url: 'datascreen.asmx/GetEditableDataRole',
        data: myData,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: onSuccessGetEditableDataRole,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetEditableDataRole(data, status) {
    if (data.d != '') {
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
}// Enable / Disable DropDownLists Filter With Hierarchy




function onError(request, status, error) {

    console.error(request + ' ' + status + ' ' + error);

}
function startingAjax() {
    $('#overlayDiv').show();
}
function ajaxCompleted() {
    $('#overlayDiv').hide();
}


function RetrieveAppConfig() {
    $.ajax({
        type: 'POST',
        url: '../Form/CommonService.asmx/GetHierarchyLevels',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: onSuccessGetLevels,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetLevels(data, status) {
    if (data.d != '') {
        jsonObj = jsonParse(data.d);
        glbVarLevelName = jsonObj[0].SettingName;
        if (glbVarLevelName == 'Level1') {
            HierarchyLevel1 = jsonObj[0].SettingValue;
            HierarchyLevel2 = jsonObj[1].SettingValue;
            HierarchyLevel3 = jsonObj[2].SettingValue;
            HierarchyLevel4 = jsonObj[3].SettingValue;
            HierarchyLevel5 = jsonObj[4].SettingValue;
            HierarchyLevel6 = jsonObj[5].SettingValue;
        }
        if (glbVarLevelName == 'Level2') {
            HierarchyLevel1 = 0;
            HierarchyLevel2 = jsonObj[0].SettingValue;
            HierarchyLevel3 = jsonObj[1].SettingValue;
            HierarchyLevel4 = jsonObj[2].SettingValue;
            HierarchyLevel5 = jsonObj[3].SettingValue;
            HierarchyLevel6 = jsonObj[4].SettingValue;
        }
        if (glbVarLevelName == 'Level3') {
            HierarchyLevel1 = 0;
            HierarchyLevel2 = 0;
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
    if (CurrentUserRole == 'admin') {
        if (glbVarLevelName == 'Level1') {
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
        if (glbVarLevelName == 'Level2') {
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
        }
        if (glbVarLevelName == 'Level3') {
            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col4').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();
            $('#col44').show();
        }
        FillDropDownList(CurrentUserRole);
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
        FillDropDownList(CurrentUserRole);
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
        FillDropDownList(CurrentUserRole);
    }
    if (CurrentUserRole == 'rl3') {
        $('#col1').show();
        $('#col2').show();
        $('#col3').show();
        $('#col11').show();
        $('#col22').show();
        $('#col33').show();
        FillDropDownList(CurrentUserRole);
    }
    if (CurrentUserRole == 'rl4') {
        $('#col1').show();
        $('#col2').show();
        $('#col11').show();
        $('#col22').show();
        FillDropDownList(CurrentUserRole);
    }
    if (CurrentUserRole == 'rl5') {
        $('#col1').show();
        $('#col11').show();
        FillDropDownList(CurrentUserRole);
    }
}
function FillDropDownList() {
    myData = '{\'levelName\':\'' + glbVarLevelName + '\' }';
    $.ajax({
        type: 'POST',
        url: 'datascreen.asmx/FilterDropDownList',
        contentType: 'application/json; charset=utf-8',
        data: myData,
        dataType: 'json',
        success: onSuccessFillDropDownListNew,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessFillDropDownList(data, status) {
    if (data.d != '') {
        jsonObj = jsonParse(data.d);
        if (glbVarLevelName == 'Level3') {
            document.getElementById('ddl1').innerHTML = '';
            document.getElementById('ddl2').innerHTML = '';
            document.getElementById('ddl3').innerHTML = '';
            document.getElementById('ddl4').innerHTML = '';
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
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append(HierarchyLevel5);
                $('#Label2').append(HierarchyLevel6);
            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6);
            }
            $('#ddl1').append('<option value=\'' + value + '\'>' + name + '</option>');
            $.each(jsonObj, function (i, tweet) {
                $('#ddl1').append('<option value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
            });
        }
    }
}
function onSuccessFillDropDownListNew(data, status) {
    if (data.d != '') {
        $('#Label1').empty();
        $('#Label2').empty();
        $('#Label3').empty();
        $('#Label4').empty();
        $('#Label5').empty();
        $('#Label6').empty();
        document.getElementById('ddl1').innerHTML = '';
        document.getElementById('ddl2').innerHTML = '';
        document.getElementById('ddl3').innerHTML = '';
        document.getElementById('ddl4').innerHTML = '';
        document.getElementById('ddl5').innerHTML = '';
        document.getElementById('ddl6').innerHTML = '';
        jsonObj = jsonParse(data.d);
        //if (glbVarLevelName == "Level1") {
        //if (glbVarLevelName == "Level3") {
        document.getElementById('ddl1').innerHTML = '';
        document.getElementById('ddl2').innerHTML = '';
        document.getElementById('ddl3').innerHTML = '';
        document.getElementById('ddl4').innerHTML = '';
        document.getElementById('ddl5').innerHTML = '';
        document.getElementById('ddl6').innerHTML = '';
        value = '-1';
        if (CurrentUserRole == 'admin') {
            if (glbVarLevelName == 'Level1') {
                name = 'Select ' + HierarchyLevel1;
                $('#Label1').append(HierarchyLevel1);
                $('#Label2').append(HierarchyLevel2);
                $('#Label3').append(HierarchyLevel3);
                $('#Label4').append(HierarchyLevel4);
                $('#Label5').append(HierarchyLevel5);
                $('#Label6').append(HierarchyLevel6);
            }
            if (glbVarLevelName == 'Level2') {
                name = 'Select ' + HierarchyLevel2;
                $('#Label1').append(HierarchyLevel2);
                $('#Label2').append(HierarchyLevel3);
                $('#Label3').append(HierarchyLevel4);
                $('#Label4').append(HierarchyLevel5);
                $('#Label5').append(HierarchyLevel6);
            }
            if (glbVarLevelName == 'Level3') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3);
                $('#Label2').append(HierarchyLevel4);
                $('#Label3').append(HierarchyLevel5);
                $('#Label4').append(HierarchyLevel6);
            }
        }
        if (CurrentUserRole == 'rl1') {
            name = 'Select ' + HierarchyLevel2;
            $('#Label1').append(HierarchyLevel2);
            $('#Label2').append(HierarchyLevel3);
            $('#Label3').append(HierarchyLevel4);
            $('#Label4').append(HierarchyLevel5);
            $('#Label5').append(HierarchyLevel6);
        }
        if (CurrentUserRole == 'rl2') {
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
        if (CurrentUserRole == 'rl4') {
            name = 'Select ' + HierarchyLevel5;
            $('#Label1').append(HierarchyLevel5);
            $('#Label2').append(HierarchyLevel6);
        }
        if (CurrentUserRole == 'rl5') {
            name = 'Select ' + HierarchyLevel6;
            $('#Label1').append(HierarchyLevel6);
        }

        if (CurrentUserRole == 'rl4') {
            name = 'Select ' + HierarchyLevel5;
            $('#Label1').append(HierarchyLevel5);
            $('#Label2').append(HierarchyLevel6);
        }
        if (CurrentUserRole == 'rl5') {
            name = 'Select ' + HierarchyLevel6;
            $('#Label1').append(HierarchyLevel6);
        }
        $('#ddl1').append('<option value=\'' + value + '\'>' + name + '</option>');

        $.each(jsonObj, function (i, tweet) {
            //$("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            if ($('#ddlstatus').val() == 'all') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(InActive)') {
                    $('#ddl1').append('<option style=\'background-color: #f57575;\' value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                } else {
                    $('#ddl1').append('<option  value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                }
            }
            if ($('#ddlstatus').val() == 'active') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(Active)') {
                    $('#ddl1').append('<option  value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                }
            }
        });

    }
}// Hierarchy Enable / Disable

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
    levelValue = $('#ddl1').val();
    //myData = "{'EmpID':" + levelValue + "}";
    myData = '{\'employeeId\':' + levelValue + '}';
    if (levelValue != -1) {
        $.ajax({
            type: 'POST',
            //url: "../Reports/datascreen.asmx/FillDropDownHierarchy",
            url: '../Reports/datascreen.asmx/GetEmployee',
            data: myData,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: onSuccessFillddl1,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    } else {
        document.getElementById('ddl2').innerHTML = '';
        document.getElementById('ddl3').innerHTML = '';
        document.getElementById('ddl4').innerHTML = '';
        document.getElementById('ddl5').innerHTML = '';
        document.getElementById('ddl6').innerHTML = '';
    }
}
function onSuccessFillddl1(data, status) {
    document.getElementById('ddl2').innerHTML = '';
    document.getElementById('ddl3').innerHTML = '';
    document.getElementById('ddl4').innerHTML = '';
    document.getElementById('ddl5').innerHTML = '';
    document.getElementById('ddl6').innerHTML = '';
    if (data.d != '') {
        jsonObj = jsonParse(data.d);
        value = '-1';
        if (glbVarLevelName == 'Level1') {
            name = 'Select ' + HierarchyLevel2;
        }
        if (glbVarLevelName == 'Level2') {
            name = 'Select ' + HierarchyLevel3;
        }
        if (glbVarLevelName == 'Level3') {
            name = 'Select ' + HierarchyLevel4;
        }    //name = 'Select ' + HierarchyLevel4;
        //$("#ddl2").append("<option value='" + value + "'>" + name + "</option>");
        //$("#ddl2").append("<option value='" + value + "'>" + "Select Employee" + "</option>");
        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});

        $('#ddl2').append('<option value=\'' + value + '\'>' + name + '</option>');
        $.each(jsonObj, function (i, tweet) {
            //$("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            if ($('#ddlstatus').val() == 'all') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(InActive)') {
                    $('#ddl2').append('<option style=\'background-color: #f57575;\' value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                } else {
                    $('#ddl2').append('<option  style=\'background-color: #ffffff;\' value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                }
            }
            if ($('#ddlstatus').val() == 'active') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(Active)') {
                    $('#ddl2').append('<option  value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                }
            }
        });
    }  //IsValidUser();

}
function OnChangeddl2() {
    levelValue = $('#ddl2').val();
    //myData = "{'employeeId':'" + levelValue + "','teamid':'" + (($('#ddlT').val() > -1) ? $('#ddlT').val() : 0) + "'  }";
    //myData = "{'EmpID':" + levelValue + "}";
    myData = '{\'employeeId\':' + levelValue + '}';
    if (levelValue != -1) {
        $.ajax({
            type: 'POST',
            //url: "../Reports/datascreen.asmx/FillDropDownHierarchy",
            url: '../Reports/datascreen.asmx/GetEmployee',
            data: myData,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: onSuccessFillddl2,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    } else {
        document.getElementById('ddl3').innerHTML = '';
        document.getElementById('ddl4').innerHTML = '';
        document.getElementById('ddl5').innerHTML = '';
        document.getElementById('ddl6').innerHTML = '';
    }
}
function onSuccessFillddl2(data, status) {
    document.getElementById('ddl3').innerHTML = '';
    document.getElementById('ddl4').innerHTML = '';
    document.getElementById('ddl5').innerHTML = '';
    document.getElementById('ddl6').innerHTML = '';
    if (data.d != '') {
        jsonObj = jsonParse(data.d);
        value = '-1';
        if (glbVarLevelName == 'Level1') {
            name = 'Select ' + HierarchyLevel3;
        }
        if (glbVarLevelName == 'Level2') {
            name = 'Select ' + HierarchyLevel4;
        }
        if (glbVarLevelName == 'Level3') {
            name = 'Select ' + HierarchyLevel5;
        }    //name = 'Select ' + HierarchyLevel5;
        //$("#ddl3").append("<option value='" + value + "'>" + name + "</option>");
        //$("#ddl3").append("<option value='" + value + "'>" + "Select Employee" + "</option>");
        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});

        $('#ddl3').append('<option value=\'' + value + '\'>' + name + '</option>');
        $.each(jsonObj, function (i, tweet) {
            //$("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            if ($('#ddlstatus').val() == 'all') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(InActive)') {
                    $('#ddl3').append('<option style=\'background-color: #f57575;\' value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                } else {
                    $('#ddl3').append('<option style=\'background-color: #ffffff;\' value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                }
            }
            if ($('#ddlstatus').val() == 'active') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(Active)') {
                    $('#ddl3').append('<option  value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                }
            }
        });
    }  //IsValidUser();

}
function OnChangeddl3() {
    levelValue = $('#ddl3').val();
    //myData = "{'employeeId':'" + levelValue + "','teamid':'" + (($('#ddlT').val() > -1) ? $('#ddlT').val() : 0) + "'  }";
    //myData = "{'EmpID':" + levelValue + "}";
    myData = '{\'employeeId\':' + levelValue + '}';
    if (levelValue != -1) {
        $.ajax({
            type: 'POST',
            //url: "../Reports/datascreen.asmx/FillDropDownHierarchy",
            url: '../Reports/datascreen.asmx/GetEmployee',
            data: myData,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: onSuccessFillddl3,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        document.getElementById('ddl4').innerHTML = '';
        document.getElementById('ddl5').innerHTML = '';
        document.getElementById('ddl6').innerHTML = '';
    }
}
function onSuccessFillddl3(data, status) {
    document.getElementById('ddl4').innerHTML = '';
    document.getElementById('ddl5').innerHTML = '';
    document.getElementById('ddl6').innerHTML = '';
    if (data.d != '') {
        jsonObj = jsonParse(data.d);
        value = '-1';
        if (glbVarLevelName == 'Level1') {
            name = 'Select ' + HierarchyLevel4;
        }
        if (glbVarLevelName == 'Level2') {
            name = 'Select ' + HierarchyLevel5;
        }
        if (glbVarLevelName == 'Level3') {
            name = 'Select ' + HierarchyLevel6;
        }
        $('#ddl4').append('<option value=\'' + value + '\'>' + name + '</option>');
        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});
        $.each(jsonObj, function (i, tweet) {
            //$("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            if ($('#ddlstatus').val() == 'all') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(InActive)') {
                    $('#ddl4').append('<option style=\'background-color: #f57575;\' value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                } else {
                    $('#ddl4').append('<option style=\'background-color: #ffffff;\' value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                }
            }
            if ($('#ddlstatus').val() == 'active') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(Active)') {
                    $('#ddl4').append('<option  value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                }
            }
        });
    }  //IsValidUser();

}
function OnChangeddl4() {
    levelValue = $('#ddl4').val();
    myData = '{\'employeeId\':' + levelValue + '}';
    if (levelValue != -1) {
        $.ajax({
            type: 'POST',
            //url: "../Reports/datascreen.asmx/FillDropDownHierarchy",
            url: '../Reports/datascreen.asmx/GetEmployee',
            data: myData,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: onSuccessFillddl4,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        document.getElementById('ddl5').innerHTML = '';
        document.getElementById('ddl6').innerHTML = '';
    }
}
function onSuccessFillddl4(data, status) {
    document.getElementById('ddl5').innerHTML = '';
    document.getElementById('ddl6').innerHTML = '';
    if (data.d != '') {
        jsonObj = jsonParse(data.d);
        value = '-1';
        if (glbVarLevelName == 'Level1') {
            name = 'Select ' + HierarchyLevel5;
        }
        if (glbVarLevelName == 'Level2') {
            name = 'Select ' + HierarchyLevel6;
        }    //name = 'Select ' + HierarchyLevel5;

        $('#ddl5').append('<option value=\'' + value + '\'>' + name + '</option>');
        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl5").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});
        $.each(jsonObj, function (i, tweet) {
            //$("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            if ($('#ddlstatus').val() == 'all') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(InActive)') {
                    $('#ddl5').append('<option style=\'background-color: #f57575;\' value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                } else {
                    $('#ddl5').append('<option style=\'background-color: #ffffff;\' value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                }
            }
            if ($('#ddlstatus').val() == 'active') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(Active)') {
                    $('#ddl5').append('<option  value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                }
            }
        });
    }  //IsValidUser();

}
function OnChangeddl5() {
    levelValue = $('#ddl5').val();
    myData = '{\'employeeId\':' + levelValue + '}';
    if (levelValue != -1) {
        $.ajax({
            type: 'POST',
            //url: "../Reports/datascreen.asmx/FillDropDownHierarchy",
            url: '../Reports/datascreen.asmx/GetEmployee',
            data: myData,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: onSuccessFillddl5,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        document.getElementById('ddl6').innerHTML = '';
    }
}
function onSuccessFillddl5(data, status) {
    document.getElementById('ddl6').innerHTML = '';
    if (data.d != '') {
        jsonObj = jsonParse(data.d);
        value = '-1';
        if (glbVarLevelName == 'Level1') {
            name = 'Select ' + HierarchyLevel6;
        }    //name = 'Select ' + HierarchyLevel5;

        $('#ddl6').append('<option value=\'' + value + '\'>' + name + '</option>');
        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl6").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});
        $.each(jsonObj, function (i, tweet) {
            //$("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            if ($('#ddlstatus').val() == 'all') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(InActive)') {
                    $('#ddl6').append('<option style=\'background-color: #f57575;\' value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                } else {
                    $('#ddl6').append('<option style=\'background-color: #ffffff;\' value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                }
            }
            if ($('#ddlstatus').val() == 'active') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(Active)') {
                    $('#ddl6').append('<option  value=\'' + jsonObj[i].EmployeeId + '\'>' + jsonObj[i].EmployeeName + '</option>');
                }
            }
        });
    }  //IsValidUser();

}

function OnChangeddl6() {

    levelValue = $('#ddl6').val();

    if (levelValue != -1) {
        $.ajax({
            type: 'POST',
            url: 'ROIReport.asmx/GetEmployeeDoctors',
            data: JSON.stringify({ level6LevelID: levelValue }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data, status) {

                if (data.d != "") {

                    $("#ddlDoctors").empty().append("<option value='-1'>Select Doctor</option>");
                    $.each(JSON.parse(data.d), function (i, tweet) {
                        $("#ddlDoctors").append("<option value='" + tweet.DoctorId + "'>" + tweet.FirstName + "</option>");
                    });

                }

            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }

}

function OnChangeddlddlDoctors() {

    DoctorID = 133731; $('#ddlDoctors').val();//133731;
    EmployeeID = 886; $('#ddl6').val();//886;

    if (DoctorID != -1) {
        $.ajax({
            type: 'POST',
            url: 'ROIReport.asmx/GetCSRActivities',
            data: JSON.stringify({ EmployeeID: EmployeeID, DoctorID: DoctorID }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data, status) {
                if (data.d != "") {


                    $("#ddlCSRActivities").empty().append("<option value='-1'>Select CSR Activity</option>");

                    $.each(JSON.parse(data.d), function (i, tweet) {
                        $("#ddlCSRActivities").append("<option value='" + tweet.CSRMainDataID + "'>" + tweet.CSRData + "</option>");
                    });

                }
                else {
                    $("#ddlCSRActivities").empty().append("<option value='-1'>No CSR Activity Found</option>");
                }

            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }

}




function OnChangeddlddlCSRActivities() {

    var CSRMainDataID = $('#ddlCSRActivities').val();
    //EmployeeID = 886;//$('#ddl6').val();

    if (CSRMainDataID != -1) {
        $.ajax({
            type: 'POST',
            url: 'ROIReport.asmx/GetCSRDetailsByID',
            data: JSON.stringify({ CSRMainDataID: CSRMainDataID }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data, status) {
                if (data.d != "") {


                    CreateCSRDetailReport(JSON.parse(data.d))
                }

                else {
                    // Show No Such CSR Report Found
                }
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        $('#reportContainer').hide();
        $('#csrSelectOne').show();

    }
}



function CreateCSRDetailReport(CSRDetails) {


    $('#reportContainer').show();
    $('#csrSelectOne').hide();

    var CSRBasicDetails = CSRDetails[0][0];
    var CSRCalenderDetails = CSRDetails[1];
    var CSRDates = CSRDetails[2];
    var CSRChemistsDetails = CSRDetails[3];

    //console.log(CSRBasicDetails);
    //console.log(CSRDates);

    $('#csrNSM').text(CSRBasicDetails.csrNSM);
    $('#csrSM').text(CSRBasicDetails.csrSM);
    $('#csrSMName').text(CSRBasicDetails.csrSM);
    $('#csrZSM').text(CSRBasicDetails.csrZSM);
    $('#csrTM').text(CSRBasicDetails.csrTM);

    $('#csrCommitmentTotal').text(CSRBasicDetails.csrCommitmentTotal);
    $('#csrSPO').text(CSRBasicDetails.csrSPO);
    $('#csrSMName').text(CSRBasicDetails.csrSMName);
    $('#csrDivision').text(CSRBasicDetails.csrDivision);
    $('#csrDuration').text(CSRBasicDetails.csrDuration);
    $('#csrBrick3').text(CSRBasicDetails.csrBrick3);
    $('#csrBrick2').text(CSRBasicDetails.csrBrick2);
    $('#csrRefNo').text(CSRBasicDetails.csrRefNo);
    $('#csrActMonth').text(CSRBasicDetails.csrActMonth);
    $('#csrCity').text(CSRBasicDetails.csrCity);
    $('#csrDSpeciality').text(CSRBasicDetails.csrDSpeciality);
    $('#csrBrick').text(CSRBasicDetails.csrBrick);
    $('#csrDName').text(CSRBasicDetails.csrDName);


    $('#csrCalenderDetails ').find('tr').eq(2).nextAll('tr').remove();
    //CSRCalenderDetails
    $.each(CSRCalenderDetails, function (i, tweet) {

        var totalUnits =
        parseInt(tweet['1']) + parseInt(tweet['2']) + parseInt(tweet['3']) + parseInt(tweet['4']) + parseInt(tweet['5']) + parseInt(tweet['6']) +
        parseInt(tweet['7']) + parseInt(tweet['8']) + parseInt(tweet['9']) + parseInt(tweet['10']) + parseInt(tweet['11']) + parseInt(tweet['12'])

        var totalPrice = tweet.tradePrice * totalUnits;

        var row = '<tr>'
                   + '<td>' + (i + 1) + '- </td>'
                   + '<td>' + tweet.SkuName + '</td>'
                   + '<td>' + tweet.ExpectedUnits + '</td>'
                   + '<td>' + parseFloat(tweet.tradePrice) * parseFloat(tweet.ExpectedUnits) + '</td>'
                   + '<td>' + tweet['1'] + '</td>'
                   + '<td>' + tweet['2'] + '</td>'
                   + '<td>' + tweet['3'] + '</td>'
                   + '<td>' + tweet['4'] + '</td>'
                   + '<td>' + tweet['5'] + '</td>'
                   + '<td>' + tweet['6'] + '</td>'
                   + '<td>' + tweet['7'] + '</td>'
                   + '<td>' + tweet['8'] + '</td>'
                   + '<td>' + tweet['9'] + '</td>'
                   + '<td>' + tweet['10'] + '</td>'
                   + '<td>' + tweet['11'] + '</td>'
                   + '<td>' + tweet['12'] + '</td>'
                   + '<td data-attr="end">' + totalUnits + '</td>'
                   + '<td data-attr="end">' + totalPrice + '</td>'
               + '</tr>'

        $('#csrCalenderDetails').append(row);
    });


    $('#year1').text(CSRDates[0].Date.split('-')[1]);
    $('#year2').text(CSRDates[11].Date.split('-')[1]);

    var totalCSRTimeBusiness = 0;
    var yearSpanStart = 0, activityStartIndex = 0, activityDurationIndex = parseInt(CSRBasicDetails.csrDuration);

    $.each(CSRDates, function (i, tweet) {
                
        if (tweet.MonthNumber == '12')
            yearSpanStart = tweet.RowNumber;

        if (tweet.Date === CSRBasicDetails.csrActMonth)
            activityStartIndex = parseInt(tweet.RowNumber) + 3;
        

        $($('#datesStart').parent().children()[i]).text(tweet.Date);

    });



    $.each($('#csrCalenderDetails ').find('tr').eq(2).nextAll('tr'), function (i, trObj) {


        var tds = $($(trObj).find('td').eq(activityStartIndex));
        for (var i = 1; i <= activityDurationIndex; i++) {

            totalCSRTimeBusiness += parseFloat(tds.text());

            tds = tds.css('background-color', 'antiquewhite').next(); // Adds Color For Selected CSR Range And Move Forward

            if (i + activityStartIndex > 15)
                break; // Break If Months Columns Ends --Arsal


        }

    });

    

    $('#csrBusinessTotal').text(totalCSRTimeBusiness);
    CreateCimmitmentAndSalesGraph(parseFloat(CSRBasicDetails.csrCommitmentTotal), totalCSRTimeBusiness);


    $('#year1').attr('colspan', yearSpanStart);
    $('#year2').attr('colspan', 12 - yearSpanStart);


    $('#csrPharmacyDetails ').find('tr').eq(0).nextAll('tr').remove();
    if (CSRChemistsDetails.length > 0) {
        $.each(CSRChemistsDetails, function (i, tweet) {

            var row = '<tr>'
                        + '<td>' + tweet.PharmacyName + '</td>  <td>' + tweet.PharmacyCode + '</td> <td>' + tweet.Percentage + '%</td>' +
                      '</tr>';

            $('#csrPharmacyDetails').append(row);

        });

    }
    else {
        var row = '<tr><td colspan="3" class="text-center"> No Any Affiliated Pharmacy Found</td></tr>';

        $('#csrPharmacyDetails').append(row);
    }

}



function CreateCimmitmentAndSalesGraph(commitment, business) {

    $('#pieChart').empty();

    Highcharts.chart('pieChart', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Commitment With Doctor Comparison With Sales'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: '',
            colorByPoint: true,
            data: [{
                name: 'Commitment',
                y: commitment
            }, {
                name: 'Business',
                y: business
            }]
        }]
    });

}
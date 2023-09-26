var validation;
var validationAssignFormRules;
var validationAssignFormMessages;

var checkedboxes;
var empids = [];
var formid;
var assignFormid;
var nmbrofques;

$(document).ready(function () {

    $2('#divConfirmation').jqm({ modal: true });
    $2('#Divmessage').jqm({ modal: true });
    $2('#divDeleteConfirmation').jqm({ modal: true });
    $2('#AttemptDateModal').jqm({ modal: true });

    
    $("#attemptdate").datepicker({ dateFormat: 'mm/dd/yy', beforeShowDay: NotBeforeToday });
    //$("#attemptdate").datepicker({ dateFormat: 'mm/dd/yy' }).datepicker("setDate", new Date());
    $("#newAttemptDatetxt").datepicker({ dateFormat: 'mm/dd/yy', beforeShowDay: NotBeforeToday });
    

    GetCurrentUser();
    FillEmployees();
    //FillAssignedQuizTestGrid();
    GetQuizTestForms();

    $('#btnAssignForm').click(AssignForm);

    $('#btnClearFields').click(resetAllFields);

    $('#btnAssignYes').click(AssignConfirm);
    $('#btnAssignNo').click(AssignCancel);

    $('#btnDeleteYes').click(DeleteConfirm);
    $('#btnDeleteNo').click(DeleteCancel);

    $('#btnOk').click(OKClick)
    $('#btnCloseAttemptDateModal').click(CloseAttemptDateModal)

    $('#BtnAttemptDateChange').click(ChangeAttemptDate)

    $('#ddfrm').change(GetNumberOfQuestions);

    $('#ddl1').change(OnChangeddl1);
    $('#ddl2').change(OnChangeddl2);
    $('#ddl3').change(OnChangeddl3);
    $('#ddl4').change(OnChangeddl4);
    $('#ddl5').change(OnChangeddl5);
    $('#ddl6').change(OnChangeddl6);


    validation = $('#form1').validate({
        errorElement: "div",
        errorClass: "help-block help-block-error",
        focusInvalid: !1, ignore: "",
        highlight: function (e) { $(e).closest(".form-group").addClass("has-error") },
        unhighlight: function (e) { $(e).closest(".form-group").removeClass("has-error") },
        success: function (e) { e.closest(".form-group").removeClass("has-error") },
    });

    validationAssignFormRules = {
        ddl1: { required: true },
        ddfrmType: { required: true },
        ddfrm: { required: true },
        nmbrofquestions: { required: true }
    };

    validationAssignFormMessages = {
        ddl1: {
            required: 'Please select BUH'
        },
        ddfrmType: {
            required: 'Please select form type'
        },
        ddfrm: {
            required: 'Please select form'
        },
        nmbrofquestions: {
            required: 'Please enter number of questions',
            number: "true"
        }
    };

});

function NotBeforeToday(date) {
    var now = new Date();//this gets the current date and time
    if (date.getFullYear() == now.getFullYear() && date.getMonth() == now.getMonth() && date.getDate() >= now.getDate())
        return [true];
    if (date.getFullYear() >= now.getFullYear() && date.getMonth() > now.getMonth())
        return [true];
    if (date.getFullYear() > now.getFullYear())
        return [true];
    return [false];
}

function GetCurrentUser() {

    $.ajax({
        type: "POST",
        url: "../form/CommonService.asmx/GetCurrentUser",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUser,
        error: onError,
        async: false,
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
        async: false,
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
        async: false,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetCurrentUserRole(data, status) {

    if (data.d != "") {

        CurrentUserRole = data.d;
        if (CurrentUserRole == 'admin') {
            //$('#rptUserList').show();
            // $("#ddlreport").append("<option value='28' id='rptUserList'>CRM User List</option>");
        }
        //else {
        //    $('#rptUserList').hide();
        //}

        //myData = "{'employeeid':'" + EmployeeId + "' }";

        //$.ajax({
        //    type: "POST",
        //    url: "NewReports.asmx/getemployeeHR",
        //    data: myData,
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: onSuccessdefaulyHR,
        //    error: onError,
        //    beforeSend: startingAjax,
        //    complete: ajaxCompleted,
        //    cache: false
        //});


    }

    // GetEditableDataLoginId();

    RetrieveAppConfig();
}


function RetrieveAppConfig() {

    $.ajax({
        type: "POST",
        url: "../form/CommonService.asmx/GetHierarchyLevels",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetLevels,
        error: onError,
        async: false,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetLevels(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        glbVarLevelName = jsonObj[0].SettingName;

        if (glbVarLevelName == "Level1") {

            HierarchyLevel1 = jsonObj[0].SettingValue;
            HierarchyLevel2 = jsonObj[1].SettingValue;
            HierarchyLevel3 = jsonObj[2].SettingValue;
            HierarchyLevel4 = jsonObj[3].SettingValue;
            HierarchyLevel5 = jsonObj[4].SettingValue;
            HierarchyLevel6 = jsonObj[5].SettingValue;
        }
        if (glbVarLevelName == "Level2") {

            HierarchyLevel1 = 0;
            HierarchyLevel2 = jsonObj[0].SettingValue;
            HierarchyLevel3 = jsonObj[1].SettingValue;
            HierarchyLevel4 = jsonObj[2].SettingValue;
            HierarchyLevel5 = jsonObj[3].SettingValue;
            HierarchyLevel6 = jsonObj[4].SettingValue;
        }
        if (glbVarLevelName == "Level3") {

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


function EnableHierarchyViaLevel() {

    if (CurrentUserRole == 'admin') {
        if (glbVarLevelName == "Level1") {
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
        if (glbVarLevelName == "Level2") {
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
        if (glbVarLevelName == "Level3") {
            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col4').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();
            $('#col44').show();
        }

        //FillDropDownList(CurrentUserRole);
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

        //FillDropDownList(CurrentUserRole);
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

        //FillDropDownList(CurrentUserRole);
    }
    if (CurrentUserRole == 'rl3') {
        $('#col1').show();
        $('#col2').show();
        $('#col3').show();
        $('#col11').show();
        $('#col22').show();
        $('#col33').show();

        //FillDropDownList(CurrentUserRole);
    }
    if (CurrentUserRole == 'rl4') {
        $('#col1').show();
        $('#col2').show();

        $('#col11').show();
        $('#col22').show();

        //FillDropDownList(CurrentUserRole);
    }
    if (CurrentUserRole == 'rl5') {
        $('#col1').show();
        $('#col11').show();
        //FillDropDownList(CurrentUserRole);
    }
    FillGh();
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

        // GetCurrentLevelIDs(0);

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
        } else if (level2 != -1) {
            GetCurrentLevelIDs(level2);
        } else if (level1 != -1) {
            GetCurrentLevelIDs(level1);
        }
        else { GetCurrentLevelIDs(0); }

    }
    else {
        window.location = "/Form/Login.aspx";
    }

}

function GetCurrentLevelIDs(type) {

    myData = "{'type':'" + type + "'}";
    employeeIDFORDATA = type;
    $.ajax({
        type: "POST",
        url: "../Reports/datascreen.asmx/GetCurrentLevelId",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: onSuccessgetCurrentLevelID,
        error: onError,
        cache: false
    });
}
function onSuccessgetCurrentLevelID(data, status) {

    if (data.d != "") {
        $('#L1').val(data.d.split(':')[0]);
        $('#L2').val(data.d.split(':')[1]);
        $('#L3').val(data.d.split(':')[2]);
        $('#L4').val(data.d.split(':')[3]);
        $('#L5').val(data.d.split(':')[4]);
        $('#L6').val(data.d.split(':')[5]);
    }
    else {
        $('#L1').val(0);
        $('#L2').val(0);
        $('#L3').val(0);
        $('#L4').val(0);
        $('#L5').val(0);
        $('#L6').val(0);
    }
}


function FillGh() {

    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/fillGH",
        contentType: "application/json; charset=utf-8",
        // data: myData,
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
    if (CurrentUserRole == 'admin') {
        if (glbVarLevelName == "Level1") {
            name = 'Select ' + HierarchyLevel1;
            $('#Label1').append(HierarchyLevel1);
            $('#Label2').append(HierarchyLevel2);
            $('#Label3').append(HierarchyLevel3);
            $('#Label4').append(HierarchyLevel4);
            $('#Label5').append(HierarchyLevel5);
            $('#Label6').append(HierarchyLevel6);

        }
        if (glbVarLevelName == "Level2") {

            name = 'Select ' + HierarchyLevel2;
            $('#Label1').append(HierarchyLevel2);
            $('#Label2').append(HierarchyLevel3);
            $('#Label3').append(HierarchyLevel4);
            $('#Label4').append(HierarchyLevel5);
            $('#Label5').append(HierarchyLevel6);
        }
        if (glbVarLevelName == "Level3") {

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
    value = '-1';
    name += ' Level';
    document.getElementById('ddl1').innerHTML = "";
    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";
    $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#ddl1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });

}

function FillDropDownList(CurrentUserRole) {
    myData = "{'levelName':'" + glbVarLevelName + "' }";

    $.ajax({
        type: "POST",
        url: "../Reports/datascreen.asmx/FilterDropDownList",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: onSuccessFillDropDownListNew,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}
function onSuccessFillDropDownListNew(data, status) {

    if (data.d != "") {

        $('#Label1').empty();
        $('#Label2').empty();
        $('#Label3').empty();
        $('#Label4').empty();
        $('#Label5').empty();
        $('#Label6').empty();

        document.getElementById('ddl1').innerHTML = "";
        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        jsonObj = jsonParse(data.d);

        value = '-1';

        if (CurrentUserRole == 'admin') {
            if (glbVarLevelName == "Level1") {
                name = 'Select ' + HierarchyLevel1;
                $('#Label1').append(HierarchyLevel1);
                $('#Label2').append(HierarchyLevel2);
                $('#Label3').append(HierarchyLevel3);
                $('#Label4').append(HierarchyLevel4);
                $('#Label5').append(HierarchyLevel5);
                $('#Label6').append(HierarchyLevel6);

            }
            if (glbVarLevelName == "Level2") {

                name = 'Select ' + HierarchyLevel2;
                $('#Label1').append(HierarchyLevel2);
                $('#Label2').append(HierarchyLevel3);
                $('#Label3').append(HierarchyLevel4);
                $('#Label4').append(HierarchyLevel5);
                $('#Label5').append(HierarchyLevel6);
            }
            if (glbVarLevelName == "Level3") {

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
        //$("#ddl1").append("<option value='" + value + "'>" + name + "</option>");
        $("#ddl1").append("<option value='" + value + "'>" + "Select Employee" + "</option>");
        $.each(jsonObj, function (i, tweet) {
            $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
        //}

    }
}





function dg1() {
    
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    levelValue = $('#dG1').val();

    if (glbVarLevelName == "Level1" || glbVarLevelName == "Level2" || glbVarLevelName == "Level3") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'" + glbVarLevelName + "'}";
    }

    //myData = "{'level2Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            //url: "../Reports/NewReports.asmx/fillGH_L2",
            url: "MEmployeesService.asmx/ShowCurrentLevel",
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
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
    }
    $('#dialog').jqmHide();
}
function onSuccessG1(data, status) {
    document.getElementById('dG2').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label22').text();

    $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

    $.each(jsonParse(data.d), function (i, tweet) {
        //$.each(data.d, function (i, tweet) {
        //$("#dG2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        $("#dG2").append("<option value='" + tweet.LevelId + "'>" + tweet.LevelName + "</option>");
    });

}

function dg2() {
    
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    levelValue = $('#dG2').val();

    if (glbVarLevelName == "Level1") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level2'}";
    }
    if (glbVarLevelName == "Level2") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level3'}";
    }
    if (glbVarLevelName == "Level3") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level4'}";
    }

    //myData = "{'level2Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            //url: "../Reports/NewReports.asmx/fillGH_L2",
            url: "MEmployeesService.asmx/ShowCurrentLevel",
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
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
    }
    $('#dialog').jqmHide();
}
function onSuccessG2(data, status) {
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label33').text();

    $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

    $.each(jsonParse(data.d), function (i, tweet) {
        //$.each(data.d, function (i, tweet) {
        //$("#dG3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        $("#dG3").append("<option value='" + tweet.LevelId + "'>" + tweet.LevelName + "</option>");
    });

}

function dg3() {
    
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    levelValue = $('#dG3').val();

    if (glbVarLevelName == "Level1") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level3'}";
    }
    if (glbVarLevelName == "Level2") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level4'}";
    }
    if (glbVarLevelName == "Level3") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level5'}";
    }

    //myData = "{'level2Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            //url: "../Reports/NewReports.asmx/fillGH_L2",
            url: "MEmployeesService.asmx/ShowCurrentLevel",
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
function onSuccessG3(data, status) {
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label44').text();

    $("#dG4").append("<option value='" + value + "'>" + name + "</option>");

    $.each(jsonParse(data.d), function (i, tweet) {
        //$.each(data.d, function (i, tweet) {
        //$("#dG4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        $("#dG4").append("<option value='" + tweet.LevelId + "'>" + tweet.LevelName + "</option>");
    });

}

function dg4() {
    
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    levelValue = $('#dG4').val();

    if (glbVarLevelName == "Level1") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level4'}";
    }
    if (glbVarLevelName == "Level2") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level5'}";
    }
    if (glbVarLevelName == "Level3") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level6'}";
    }

    //myData = "{'level2Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            //url: "../Reports/NewReports.asmx/fillGH_L2",
            url: "MEmployeesService.asmx/ShowCurrentLevel",
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
function onSuccessG4(data, status) {
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label55').text();

    $("#dG5").append("<option value='" + value + "'>" + name + "</option>");

    $.each(jsonParse(data.d), function (i, tweet) {
        //$.each(data.d, function (i, tweet) {
        //$("#dG5").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        $("#dG5").append("<option value='" + tweet.LevelId + "'>" + tweet.LevelName + "</option>");
    });

}

function dg5() {
    
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    levelValue = $('#dG5').val();

    if (glbVarLevelName == "Level1") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level5'}";
    }
    if (glbVarLevelName == "Level2") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level6'}";
    }

    //myData = "{'level2Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            //url: "../Reports/NewReports.asmx/fillGH_L2",
            url: "MEmployeesService.asmx/ShowCurrentLevel",
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
function onSuccessG5(data, status) {
    document.getElementById('dG6').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label66').text();

    $("#dG6").append("<option value='" + value + "'>" + name + "</option>");

    $.each(jsonParse(data.d), function (i, tweet) {
        //$.each(data.d, function (i, tweet) {
        //$("#dG6").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        $("#dG6").append("<option value='" + tweet.LevelId + "'>" + tweet.LevelName + "</option>");
    });

}




function OnChangeddl1() {



    $('input[name="selectAllEmp"]').prop('checked', false);
    $('.empCheckboxes').prop('checked', false);

    levelValue = $('#ddl1').val();

    if (glbVarLevelName == "Level1" || glbVarLevelName == "Level2" || glbVarLevelName == "Level3") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'" + glbVarLevelName + "'}";
    }

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "MEmployeesService.asmx/ShowCurrentLevel",
            //url: "../Reports/datascreen.asmx/GetEmployee",
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
        $("#divEmployees").empty();

        $("#ddl2").val('');
        $("#ddl2").attr('disabled', 'disabled');
        $("#ddl3").val('');
        $("#ddl3").attr('disabled', 'disabled');
        $("#ddl4").val('');
        $("#ddl4").attr('disabled', 'disabled');
        $("#ddl5").val('');
        $("#ddl5").attr('disabled', 'disabled');
        $("#ddl6").val('');
        $("#ddl6").attr('disabled', 'disabled');
        $("#ddemp").val('');
        $("#ddemp").attr('disabled', 'disabled');
    }
}
function onSuccessFillddl1(data, status) {

    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        if (glbVarLevelName == "Level1") {
            name = 'Select ' + HierarchyLevel2;
        }
        if (glbVarLevelName == "Level2") {
            name = 'Select ' + HierarchyLevel3;
        }
        if (glbVarLevelName == "Level3") {
            name = 'Select ' + HierarchyLevel4;
        }
        name += ' Level';
        $("#ddl2").removeAttr('disabled');

        $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");
        $.each(jsonObj, function (i, tweet) {
            $("#ddl2").append("<option value='" + tweet.LevelId + "'>" + tweet.LevelName + "</option>");
        });

        // append employees of this level
        var level1Value = $('#ddl1').val();
        if (glbVarLevelName == "Level1") {
            myData = "{'level1Id':'" + level1Value + "','level2Id':'0','level3Id':'0','level4Id':'0','level5Id':'0','level6Id':'0','level':'buh' }";
        }
        if (glbVarLevelName == "Level2") {
            myData = "{'level1Id':'0','level2Id':'" + level1Value + "','level3Id':'0','level4Id':'0','level5Id':'0','level6Id':'0','level':'gm' }";
        }
        if (glbVarLevelName == "Level3") {
            myData = "{'level1Id':'0','level2Id':'0','level3Id':'" + level1Value + "','level4Id':'0','level5Id':'0','level6Id':'0','level':'nsm' }";
        }

        $.ajax({
            type: "POST",
            url: "QuizTestService.asmx/fillTMList",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.d != "") {
                    var jsonObj = jsonParse(data.d);
                    $("#divEmployees").empty();
                    $.each(jsonObj, function (i, tweet) {
                        $("#divEmployees").append("<div class='col-md-3'><label style='cursor: pointer;'><input type='checkbox' name='empCheckboxes' class='empCheckboxes' style='vertical-align: top;' value='" + tweet.EmployeeId + "' />&nbsp;" + tweet.EmployeeName + "</label></div>");
                    });
                }
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });
    }

    IsValidUser();
}


function OnChangeddl2() {



    $('input[name="selectAllEmp"]').prop('checked', false);
    $('.empCheckboxes').prop('checked', false);

    levelValue = $('#ddl2').val();

    if (glbVarLevelName == "Level1") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level2'}";
    }
    if (glbVarLevelName == "Level2") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level3'}";
    }
    if (glbVarLevelName == "Level3") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level4'}";
    }

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            //url: "../Reports/datascreen.asmx/GetEmployee",
            url: "MEmployeesService.asmx/ShowCurrentLevel",
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
        $("#divEmployees").empty();

        $("#ddl3").val('');
        $("#ddl3").attr('disabled', 'disabled');
        $("#ddl4").val('');
        $("#ddl4").attr('disabled', 'disabled');
        $("#ddl5").val('');
        $("#ddl5").attr('disabled', 'disabled');
        $("#ddl6").val('');
        $("#ddl6").attr('disabled', 'disabled');
        $("#ddemp").val('');
        $("#ddemp").attr('disabled', 'disabled');

        OnChangeddl1();
    }
}
function onSuccessFillddl2(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        if (glbVarLevelName == "Level1") {
            name = 'Select ' + HierarchyLevel3;
        }
        if (glbVarLevelName == "Level2") {
            name = 'Select ' + HierarchyLevel4;
        }
        if (glbVarLevelName == "Level3") {
            name = 'Select ' + HierarchyLevel5;
        }
        name += ' Level';
        $("#ddl3").removeAttr('disabled');

        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");
        $.each(jsonObj, function (i, tweet) {
            $("#ddl3").append("<option value='" + tweet.LevelId + "'>" + tweet.LevelName + "</option>");
        });

        // append employees of this level
        var level1Value = $('#ddl1').val();
        var level2Value = $('#ddl2').val();
        if (glbVarLevelName == "Level1") {
            myData = "{'level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'0','level4Id':'0','level5Id':'0','level6Id':'0','level':'gm' }";
        }
        if (glbVarLevelName == "Level2") {
            myData = "{'level1Id':'0','level2Id':'" + level1Value + "','level3Id':'" + level2Value + "','level4Id':'0','level5Id':'0','level6Id':'0','level':'nsm' }";
        }
        if (glbVarLevelName == "Level3") {
            myData = "{'level1Id':'0','level2Id':'0','level3Id':'" + level1Value + "','level4Id':'" + level2Value + "','level5Id':'0','level6Id':'0','level':'rsm' }";
        }

        $.ajax({
            type: "POST",
            url: "QuizTestService.asmx/fillTMList",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.d != "") {
                    var jsonObj = jsonParse(data.d);
                    $("#divEmployees").empty();
                    $.each(jsonObj, function (i, tweet) {
                        $("#divEmployees").append("<div class='col-md-3'><label style='cursor: pointer;'><input type='checkbox' name='empCheckboxes' class='empCheckboxes' style='vertical-align: top;' value='" + tweet.EmployeeId + "' />&nbsp;" + tweet.EmployeeName + "</label></div>");
                    });
                }
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });
    }

    IsValidUser();
}

function OnChangeddl3() {



    $('input[name="selectAllEmp"]').prop('checked', false);
    $('.empCheckboxes').prop('checked', false);

    levelValue = $('#ddl3').val();

    if (glbVarLevelName == "Level1") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level3'}";
    }
    if (glbVarLevelName == "Level2") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level4'}";
    }
    if (glbVarLevelName == "Level3") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level5'}";
    }
    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            //url: "../Reports/datascreen.asmx/GetEmployee",
            url: "MEmployeesService.asmx/ShowCurrentLevel",
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
        $("#divEmployees").empty();

        $("#ddl4").val('');
        $("#ddl4").attr('disabled', 'disabled');
        $("#ddl5").val('');
        $("#ddl5").attr('disabled', 'disabled');
        $("#ddl6").val('');
        $("#ddl6").attr('disabled', 'disabled');
        $("#ddemp").val('');
        $("#ddemp").attr('disabled', 'disabled');

        OnChangeddl2();
    }
}
function onSuccessFillddl3(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';

        if (glbVarLevelName == "Level1") {
            name = 'Select ' + HierarchyLevel4;
        }
        if (glbVarLevelName == "Level2") {
            name = 'Select ' + HierarchyLevel5;
        }
        if (glbVarLevelName == "Level3") {
            name = 'Select ' + HierarchyLevel6;
        }
        name += ' Level';
        $("#ddl4").removeAttr('disabled');

        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");
        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + tweet.LevelId + "'>" + tweet.LevelName + "</option>");
        });

        // append employees of this level
        var level1Value = $('#ddl1').val();
        var level2Value = $('#ddl2').val();
        var level3Value = $('#ddl3').val();
        if (glbVarLevelName == "Level1") {
            myData = "{'level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'" + level3Value + "','level4Id':'0','level5Id':'0','level6Id':'0','level':'nsm' }";
        }
        if (glbVarLevelName == "Level2") {
            myData = "{'level1Id':'0','level2Id':'" + level1Value + "','level3Id':'" + level2Value + "','level4Id':'" + level3Value + "','level5Id':'0','level6Id':'0','level':'rsm' }";
        }
        if (glbVarLevelName == "Level3") {
            myData = "{'level1Id':'0','level2Id':'0','level3Id':'" + level1Value + "','level4Id':'" + level2Value + "','level5Id':'" + level3Value + "','level6Id':'0','level':'zsm' }";
        }


        $.ajax({
            type: "POST",
            url: "QuizTestService.asmx/fillTMList",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.d != "") {
                    var jsonObj = jsonParse(data.d);
                    $("#divEmployees").empty();
                    $.each(jsonObj, function (i, tweet) {
                        $("#divEmployees").append("<div class='col-md-3'><label style='cursor: pointer;'><input type='checkbox' name='empCheckboxes' class='empCheckboxes' style='vertical-align: top;' value='" + tweet.EmployeeId + "' />&nbsp;" + tweet.EmployeeName + "</label></div>");
                    });
                }
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });
    }

    IsValidUser();
}


function OnChangeddl4() {
    debugger
    levelValue = $('#ddl4').val();

    if (levelValue == -1) {
        $('input[name="selectAllEmp"]').prop('checked', false);
        $('.empCheckboxes').prop('checked', false);

        $("#ddl6").val('');
        $("#ddl6").attr('disabled', 'disabled');
        $("#ddemp").val('');
        $("#ddemp").attr('disabled', 'disabled');

        OnChangeddl3();
    }
    else {
        // append employees of this level
        var level1Value = $('#ddl1').val();
        var level2Value = $('#ddl2').val();
        var level3Value = $('#ddl3').val();
        var level4Value = $('#ddl4').val();
        var level5Value = $('#ddl5').val();
        var level6Value = $('#ddl6').val();
        if (glbVarLevelName == "Level1") {
            myData = "{'level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'" + level3Value + "','level4Id':'0','level5Id':'0','level6Id':'0','level':'rsm' }";
        }
        if (glbVarLevelName == "Level2") {
            myData = "{'level1Id':'0','level2Id':'" + level1Value + "','level3Id':'" + level2Value + "','level4Id':'" + level3Value + "','level5Id':'0','level6Id':'0','level':'zsm' }";
        }
        if (glbVarLevelName == "Level3") {
            myData = "{'level1Id':'0','level2Id':'0','level3Id':'" + level1Value + "','level4Id':'" + level2Value + "','level5Id':'" + level3Value + "','level6Id':'" + level4Value + "','level':'tm' }";
        }

        $.ajax({
            type: "POST",
            url: "QuizTestService.asmx/fillTMList",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.d != "") {
                    var jsonObj = jsonParse(data.d);
                    $("#divEmployees").empty();
                    $.each(jsonObj, function (i, tweet) {
                        $("#divEmployees").append("<div class='col-md-3'><label style='cursor: pointer;'><input type='checkbox' name='empCheckboxes' class='empCheckboxes' style='vertical-align: top;' value='" + tweet.EmployeeId + "' />&nbsp;" + tweet.EmployeeName + "</label></div>");
                    });
                }
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });
    }

    //$('input[name="selectAllEmp"]').prop('checked', false);
    //$('.empCheckboxes').prop('checked', false);

    //levelValue = $('#ddl4').val();
    //if (glbVarLevelName == "Level1") {

    //    myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level4'}";
    //}
    //if (glbVarLevelName == "Level2") {

    //    myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level5'}";
    //}
    //if (glbVarLevelName == "Level3") {

    //    myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level6'}";
    //}
    //if (levelValue != -1) {

    //    $.ajax({
    //        type: "POST",
    //        //url: "../Reports/datascreen.asmx/GetEmployee",
    //        url: "MEmployeesService.asmx/ShowCurrentLevel",
    //        data: myData,
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: onSuccessFillddl4,
    //        error: onError,
    //        beforeSend: startingAjax,
    //        complete: ajaxCompleted,
    //        cache: false
    //    });
    //}
    //else {
    //    $("#ddl5").val('');
    //    $("#ddl5").attr('disabled', 'disabled');
    //    $("#ddl6").val('');
    //    $("#ddl6").attr('disabled', 'disabled');
    //    $("#ddemp").val('');
    //    $("#ddemp").attr('disabled', 'disabled');
    //}
}
function onSuccessFillddl4(data, status) {

    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);


        value = '-1';
        if (glbVarLevelName == "Level1") {
            name = 'Select ' + HierarchyLevel5;
        }
        if (glbVarLevelName == "Level2") {
            name = 'Select ' + HierarchyLevel6;
        }
        name += ' Level';
        $("#ddl5").removeAttr('disabled');

        $("#ddl5").append("<option value='" + value + "'>" + name + "</option>");
        $.each(jsonObj, function (i, tweet) {
            $("#ddl5").append("<option value='" + tweet.LevelId + "'>" + tweet.LevelName + "</option>");
        });

        // append employees of this level
        var level1Value = $('#ddl1').val();
        var level2Value = $('#ddl2').val();
        var level3Value = $('#ddl3').val();
        var level4Value = $('#ddl4').val();
        if (glbVarLevelName == "Level1") {
            myData = "{'level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'" + level3Value + "','level4Id':'" + level4Value + "','level5Id':'0','level6Id':'0','level':'rsm' }";
        }
        if (glbVarLevelName == "Level2") {
            myData = "{'level1Id':'0','level2Id':'" + level1Value + "','level3Id':'" + level2Value + "','level4Id':'" + level3Value + "','level5Id':'" + level4Value + "','level6Id':'0','level':'zsm' }";
        }
        if (glbVarLevelName == "Level3") {
            myData = "{'level1Id':'0','level2Id':'0','level3Id':'" + level1Value + "','level4Id':'" + level2Value + "','level5Id':'" + level3Value + "','level6Id':'" + level4Value + "','level':'tm' }";
        }

        $.ajax({
            type: "POST",
            url: "QuizTestService.asmx/fillTMList",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.d != "") {
                    var jsonObj = jsonParse(data.d);
                    $("#divEmployees").empty();
                    $.each(jsonObj, function (i, tweet) {
                        $("#divEmployees").append("<div class='col-md-3'><label style='cursor: pointer;'><input type='checkbox' name='empCheckboxes' class='empCheckboxes' style='vertical-align: top;' value='" + tweet.EmployeeId + "' />&nbsp;" + tweet.EmployeeName + "</label></div>");
                    });
                }
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });
    }

    IsValidUser();
}

function OnChangeddl5() {



    $('input[name="selectAllEmp"]').prop('checked', false);
    $('.empCheckboxes').prop('checked', false);

    levelValue = $('#ddl5').val();

    if (glbVarLevelName == "Level1") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level5'}";
    }
    if (glbVarLevelName == "Level2") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level6'}";
    }
    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            //url: "../Reports/datascreen.asmx/GetEmployee",
            url: "MEmployeesService.asmx/ShowCurrentLevel",
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
        $("#ddl6").val('');
        $("#ddl6").attr('disabled', 'disabled');
        $("#ddemp").val('');
        $("#ddemp").attr('disabled', 'disabled');
    }
}
function onSuccessFillddl5(data, status) {

    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        if (glbVarLevelName == "Level1") {
            name = 'Select ' + HierarchyLevel6;
        }
        name += ' Level';
        $("#ddl6").removeAttr('disabled');

        $("#ddl6").append("<option value='" + value + "'>" + name + "</option>");
        $.each(jsonObj, function (i, tweet) {
            $("#ddl6").append("<option value='" + tweet.LevelId + "'>" + tweet.LevelName + "</option>");
        });

        // append employees of this level
        var level1Value = $('#ddl1').val();
        var level2Value = $('#ddl2').val();
        var level3Value = $('#ddl3').val();
        var level4Value = $('#ddl4').val();
        var level5Value = $('#ddl5').val();
        if (glbVarLevelName == "Level1") {
            myData = "{'level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'" + level3Value + "','level4Id':'" + level4Value + "','level5Id':'" + level5Value + "','level6Id':'0','level':'zsm' }";
        }
        if (glbVarLevelName == "Level2") {
            myData = "{'level1Id':'0','level2Id':'" + level1Value + "','level3Id':'" + level2Value + "','level4Id':'" + level3Value + "','level5Id':'" + level4Value + "','level6Id':'" + level5Value + "','level':'tm' }";
        }

        $.ajax({
            type: "POST",
            url: "QuizTestService.asmx/fillTMList",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.d != "") {
                    var jsonObj = jsonParse(data.d);
                    $("#divEmployees").empty();
                    $.each(jsonObj, function (i, tweet) {
                        $("#divEmployees").append("<div class='col-md-3'><label style='cursor: pointer;'><input type='checkbox' name='empCheckboxes' class='empCheckboxes' style='vertical-align: top;' value='" + tweet.EmployeeId + "' />&nbsp;" + tweet.EmployeeName + "</label></div>");
                    });
                }
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });
    }

    IsValidUser();
}

function OnChangeddl6() {

    levelValue = $('#ddl6').val();

    if (levelValue == -1) {
        ('input[name="selectAllEmp"]').prop('checked', false);
        $('.empCheckboxes').prop('checked', false);

        $("#ddl6").val('');
        $("#ddl6").attr('disabled', 'disabled');
        $("#ddemp").val('');
        $("#ddemp").attr('disabled', 'disabled');
    }
    else {
        // append employees of this level
        var level1Value = $('#ddl1').val();
        var level2Value = $('#ddl2').val();
        var level3Value = $('#ddl3').val();
        var level4Value = $('#ddl4').val();
        var level5Value = $('#ddl5').val();
        var level6Value = $('#ddl6').val();
        if (glbVarLevelName == "Level1") {
            myData = "{'level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'" + level3Value + "','level4Id':'" + level4Value + "','level5Id':'" + level5Value + "','level6Id':'" + level6Value + "','level':'tm' }";
        }

        $.ajax({
            type: "POST",
            url: "QuizTestService.asmx/fillTMList",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.d != "") {
                    var jsonObj = jsonParse(data.d);
                    $("#divEmployees").empty();
                    $.each(jsonObj, function (i, tweet) {
                        $("#divEmployees").append("<div class='col-md-3'><label style='cursor: pointer;'><input type='checkbox' name='empCheckboxes' class='empCheckboxes' style='vertical-align: top;' value='" + tweet.EmployeeId + "' />&nbsp;" + tweet.EmployeeName + "</label></div>");
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
        async: false,
        cache: false
    });
}
function onSuccessGetHierarchySelection(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {
            level3Id = jsonObj[0].LevelId3;
            level4Id = jsonObj[0].LevelId4;
            level5Id = jsonObj[0].LevelId5;
            level6Id = jsonObj[0].LevelId6;
        }
    }

}


function FillAssignedQuizTestGrid() {
    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/FillAssignedQuizTestGrid",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessFillAssignedQuizTestGrid,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}
function onSuccessFillAssignedQuizTestGrid(data, status) {
    var tabledata;
    $('#AssignedFormList').empty();
    $('#AssignedFormList').append('<table class="table table-striped table-bordered" id="AssignedFormsRecord">' +
            '<thead>' +
                '<tr>' +
                    '<th style="width: 60px;">S.No:</th>' +
                    '<th style="width: 240px;">Form Name</th>' +
                    '<th style="width: 200px;">Employee</th>' +
                    //'<th style="width: 70px;">Questions</th>' +
                    '<th style="width: 110px;">Form Status</th>' +
                    '<th style="width: 100px;">Assigned Date</th>' +
                    '<th style="width: 100px;">Attempt Date</th>' +
                    '<th style="width: 60px;"></th>' +
                '</tr>' +
            '</thead>' +
            '<tbody id="AssignedFormListGrid">');
    if (data.d != '') {
        var jsonObj = jsonParse(data.d);

        for (var i = 0; i < jsonObj.length; i++) {

            tabledata += "<tr>" +
                    "<td style='vertical-align: middle;'>" + (i + 1) + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].FormName + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].EmployeeName + "</td>" +
                    //"<td style='vertical-align: middle;'>" + jsonObj[i].NumberOfQuestions + "</td>" +
                    "<td style='vertical-align: middle;'>" +
                        (jsonObj[i].FormStatus == 'Submitted' ? "<button type='button' class='btn btn-sm btn-primary' onclick='ShowSummary(" + jsonObj[i].QuizSubmittedId + ", " + jsonObj[i].QuizTestFormId + ", " + jsonObj[i].Score + ")'>View Result</button>" : jsonObj[i].FormStatus) +
                    "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].AssignDate + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].FinalAttemptDate + "</td>" +
                    "<td style='vertical-align: middle;'>" +
                        "<button type='button' onclick='On_Delete_AssignForm(" + jsonObj[i].ID + ")' class='btn btn-xs btn-danger' data-toggle='tooltip' title='Delete'><i class='fa fa-times'></i></button>&nbsp;" +
                        (jsonObj[i].FormStatus == 'Not Submitted' ? "&nbsp;&nbsp;<i class='fa fa-calendar-alt' style='cursor: pointer;' onclick='FinalAttemptDateModal(" + jsonObj[i].ID + ',"' + jsonObj[i].FinalAttemptDate1 + "\")'></i>" : "") +
                    "</td>" +
                "</tr>";
        }
        //tabledata += "</tbody></table>";

        $('#AssignedFormListGrid').append(tabledata);
        $('#AssignedFormList').append('</tbody></table>');
    }
    if (!$.fn.DataTable.isDataTable('#AssignedFormsRecord')) {
        $('#AssignedFormsRecord').DataTable({
            "columnDefs": [
                    { "orderable": false, "targets": -1 }
            ]
        });
    }
    else {
        $('#AssignedFormsRecord').DataTable({
            "columnDefs": [
                    { "orderable": false, "targets": -1 }
            ]
        });
    }
}


function FinalAttemptDateModal(assignedid, attemptdate) {
    debugger
    $('#AssignedIdTxt').val(assignedid);
    $('#currentAttemptDate').val(attemptdate);

    $2('#AttemptDateModal').jqmShow();
}

function ChangeAttemptDate() {    
    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/ChangeAttemptDate",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"AssignFormId":"' + $('#AssignedIdTxt').val() + '","NewAttemptDate":"' + $('#newAttemptDatetxt').val() + '","PrevAttemptDate":"' + $('#currentAttemptDate').val() + '"}',
        success: onSuccesChangeAttemptDate,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function onSuccesChangeAttemptDate(data, status) {

    if(data.d != '')
    {        
        var jsonObj = jsonParse(data.d);
        
        if (jsonObj[0].Msg == 'DateExceed')
        {
            $('#Divmessage').find('#hlabmsg').html('New Attempt Date Exceeds From Quiz Expiry Date!')
            $2('#Divmessage').jqmShow();
        }
        else if (jsonObj[0].Msg == 'DateAlreadyAssigned')
        {
            $('#Divmessage').find('#hlabmsg').html('New Attempt Date Already Assigned!')
            $2('#Divmessage').jqmShow();
        }
        else if (jsonObj[0].Msg == 'Done')
        {
            $('#Divmessage').find('#hlabmsg').html('New Attempt Date Saved!')
            $2('#Divmessage').jqmShow();

            //FillAssignedQuizTestGrid();
        }

        CloseAttemptDateModal();

    }
}


function CloseAttemptDateModal() {
    
    $2('#AttemptDateModal').jqmHide();
    $('#currentAttemptDate').val('');
    $('#AssignedIdTxt').val('');
    $('#newAttemptDatetxt').val('');
}



function FillEmployees() {
    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/GetEmployee",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessFillEmployees,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}
function onSuccessFillEmployees(data, status) {

    if (data.d != '') {
        var jsonObj = jsonParse(data.d);
        $("#ddemp").empty();
        $("#ddemp").append("<option value=''>Select Customer</option>");
        if (jsonObj.length > 0) {
            $.each(jsonObj, function (i, option) {
                $("#ddemp").append("<option value='" + option.EmployeeId + "' >" + option.EmployeeName + "</option>");
            });
        }
    }
}


function GetQuizTestForms() {

    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/GetQuizTestForms",
        contentType: "application/json; charset=utf-8",
        //data: '{"formTypeId":"' + id + '"}',
        dataType: "json",
        success: onSuccessGetQuizTestForms,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });

}
function onSuccessGetQuizTestForms(data, status) {

    $("#ddfrm").empty();
    $("#ddfrm").append("<option value=''>Select Form</option>");
    if (data.d != '') {
        var jsonObj = jsonParse(data.d);
        if (jsonObj.length > 0) {
            $.each(jsonObj, function (i, option) {
                $("#ddfrm").append("<option value='" + option.ID + "'>" + option.FormName + "</option>");
            });
        }
    }
}

function GetNumberOfQuestions() {
    debugger
    var frmid = $('#ddfrm').val();

    if (frmid != "") {
        $.ajax({
            type: "POST",
            url: "QuizTestService.asmx/GetNumberOfQuestions",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"FormId":"' + frmid + '"}',
            success: function (data) {
                if (data.d != "") {
                    debugger
                    var jsonObj = jsonParse(data.d);
                    $('#totalQuestionsOfForm').val(jsonObj[0].NumberOfQuestions);
                    $('#enddateofquiz').val(jsonObj[0].EndDate);
                    $('.labelNumberOfQuestions').html("This form has total <b>" + jsonObj[0].NumberOfQuestions + "</b> questions");
                }
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });
    }
    else {
        $('.labelNumberOfQuestions').html('');
    }

}

function AssignForm() {
    validation.resetForm();
    validation.settings.rules = validationAssignFormRules;
    validation.settings.messages = validationAssignFormMessages;

    if (!$('#form1').valid()) {
        return false;
    }

    checkedboxes = document.querySelectorAll('input[name=empCheckboxes]:checked');

    //check if any of the spo is selected
    if (checkedboxes.length > 0) {
        for (var i = 0; i < checkedboxes.length; i++) {
            empids.push(checkedboxes[i].value);
        }
        formid = $('#ddfrm').val();

        nmbrofques = $('#nmbrofquestions').val(); // input value
        var totalquestions = $('#totalQuestionsOfForm').val(); // total questions

        //check if number of questions in quiz are not greater than entered number of question
        if (parseInt(nmbrofques) > parseInt(totalquestions) || parseInt(nmbrofques) < 0 || parseInt(nmbrofques) == 0) {
            $('#Divmessage').find('#hlabmsg').html('Incorrect numbers of questions!')
            $2('#Divmessage').jqmShow();
        }
        else {
            if ($('#attemptdate').val() != '')
            { debugger
                var enddateofquiz = $('#enddateofquiz').val();
                var attemptdate = $('#attemptdate').val();
                if (attemptdate <= enddateofquiz)
                {
                    $2('#divConfirmation').jqmShow();
                    $('#divConfirmation').find('#assignmsg').html("Assign <b>" + $("#ddfrmType option:selected").text() + ": " + $("#ddfrm option:selected").text() + "</b>");
                   
                }
                else
                {
                    $('#Divmessage').find('#hlabmsg').html('Final attempt date should not exceed Quiz expiry date : ' + enddateofquiz)
                    $2('#Divmessage').jqmShow();
                   
                }
            }
            else
            {
                $2('#divConfirmation').jqmShow();
                $('#divConfirmation').find('#assignmsg').html("Assign <b>" + $("#ddfrmType option:selected").text() + ": " + $("#ddfrm option:selected").text() + "</b>");
            }
        }
    }
    else {
        $('#Divmessage').find('#hlabmsg').text('You must select atleast one Customer!.')
        $2('#Divmessage').jqmShow();
    }
}

function AssignConfirm() {

    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/AssignQuizTest",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"FormId":"' + formid + '","EmpId":"' + empids + '","NumberOfQuestions":"' + nmbrofques + '","FinalAttemptDate":"' + $('#attemptdate').val() + '","isTodayAttemptDate":"No"}',
        success: onSuccesAssignForm,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}
function onSuccesAssignForm(data, status) {
    
    if (data.d != "") {
        var jsonObj = jsonParse(data.d);
        
        debugger
        if (jsonObj[0][0].Added == true && jsonObj[1][0].NotAdded == true) {
            $2('#divConfirmation').jqmHide();
            $('#Divmessage').find('#hlabmsg').html('Form assigned successfully but some questions with no answers are not assigned!')
            $2('#Divmessage').jqmShow();
            $('#divConfirmation').find('#assignmsg').text('');
            $('#divEmployees').empty();
        }
        else if (jsonObj[0][0].Added == true && jsonObj[1][0].NotAdded == false) {
            $2('#divConfirmation').jqmHide();
            $('#Divmessage').find('#hlabmsg').html('Form assigned successfully!')
            $2('#Divmessage').jqmShow();
            $('#divConfirmation').find('#assignmsg').text('');
            $('#divEmployees').empty();
        }
        else if (jsonObj[0][0].Added == false && jsonObj[1][0].NotAdded == true) {
            $2('#divConfirmation').jqmHide();
            $('#Divmessage').find('#hlabmsg').html('Form did not assigned because some questions have no answers!')
            $2('#Divmessage').jqmShow();
            $('#divConfirmation').find('#assignmsg').text('');
            $('#divEmployees').empty();
        }
        else if (jsonObj[0][0].Exists == "Exists") {
            $2('#divConfirmation').jqmHide();
            $('#Divmessage').find('#hlabmsg').html('Form already assigned to <br /><b>' + jsonObj[1][0].EmpName + ' </b>!')
            $2('#Divmessage').jqmShow();
            $('#divConfirmation').find('#assignmsg').text('');
        }
        else if (jsonObj[0][0].GradingandScore == "No GradingandScore") {
            $2('#divConfirmation').jqmHide();
            $('#Divmessage').find('#hlabmsg').text('Please define grading and question/answer score for this quiz first!')
            $2('#Divmessage').jqmShow();
            $2('#divDeleteConfirmation').jqmHide();
            $('#divDeleteConfirmation').find('#deletemsg').text('');
        }
        else if (jsonObj[0][0].Grading == "No Grading") {
            $2('#divConfirmation').jqmHide();
            $('#Divmessage').find('#hlabmsg').text('Please define grading for this quiz first!')
            $2('#Divmessage').jqmShow();
            $2('#divDeleteConfirmation').jqmHide();
            $('#divDeleteConfirmation').find('#deletemsg').text('');
        }
        else if (jsonObj[0][0].Score == "No Score") {
            $2('#divConfirmation').jqmHide();
            $('#Divmessage').find('#hlabmsg').text('Please enter proper question/answer with score!')
            $2('#Divmessage').jqmShow();
            $2('#divDeleteConfirmation').jqmHide();
            $('#divDeleteConfirmation').find('#deletemsg').text('');
        }
        else if (jsonObj[0][0].Already == "No Already") {
            $2('#divConfirmation').jqmHide();
            $('#Divmessage').find('#hlabmsg').text('Quiz Already assigned!')
            $2('#Divmessage').jqmShow();
            $2('#divDeleteConfirmation').jqmHide();
            $('#divDeleteConfirmation').find('#deletemsg').text('');
        }
        else {
            $2('#divConfirmation').jqmHide();
            $('#Divmessage').find('#hlabmsg').html('Error is occurred!')
            $2('#Divmessage').jqmShow();
        }

        resetAllFields();
        //FillAssignedQuizTestGrid();
        empids = [];
        formid = 0;
    }
}

function AssignCancel() {
    $2('#divConfirmation').jqmHide();
    $('#divConfirmation').find('#assignmsg').text('');
    empids = [];
    formid = 0;
}


function ShowSummary(id, formId, formScore) {
    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/ShowQuizTestSummary",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"quizSubmittedId":"' + id + '","formId":"' + formId + '","formScore":"' + formScore + '"}',
        success: onSuccessShowSummary,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function onSuccessShowSummary(data, status) {

    if (data.d != '') {

        var jsonObj = jsonParse(data.d);

        if (jsonObj.length > 0) {

            $('#QuizTestSummaryModal').find('.summaryBody').empty();
            tabledata = "";
            
            if (jsonObj[1].length > 0) {
                if (jsonObj[1][0].YourGrade != "") {
                    $('#QuizTestSummaryModal').find('.summaryBody').append('<h2>Grade: ' + jsonObj[1][0].YourGrade + '</h2>');
                }
                else {
                    //$('#QuizTestSummaryModal').find('.summaryBody').append('<h2>Grade: D &nbsp; &nbsp; <span class="label label-danger">Fail</span></h2><br />');
                    $('#QuizTestSummaryModal').find('.summaryBody').append('<h2><span class="label label-danger">Fail</span></h2><br />');
                }
            }
            else {
                $('#QuizTestSummaryModal').find('.summaryBody').append('<h2>Failed</h2>');
            }

            $('#QuizTestSummaryModal').find('.summaryBody').append('<table class="table table-striped table-bordered" id="QuizTestSummaryTable">' +

                '<tbody id="QuizTestSummaryGrid">');

            tabledata += "<tr>" +
                            "<td><label>Submitted by:</label> " + jsonObj[0][0].EmployeeName + "</td>" +
                            "<td><label>Quiz Date:</label> " + jsonObj[0][0].CreateDate + "</td>" +
                         "</tr>";

            tabledata += "<tr>" +
                            "<td><label>Form:</label> " + jsonObj[0][0].FormName + "</td>" +
                            "<td><label>Time Taken:</label> " + jsonObj[0][0].TimeTaken + "</td>" +
                         "</tr>";
            debugger
            tabledata += "<tr>" +
                            "<td><label>Quiz Score:</label> " + jsonObj[1][0].TotalPoints + "</td>" +
                            "<td><label>Your Score:</label> " + jsonObj[1][0].Score + "</td>" +
                         "</tr>";
            tabledata += "<tr>" +
                            //"<td><label>Percentage:</label> " + parseInt(jsonObj[0][0].TotalScore) / parseInt(jsonObj[0][0].FormScore) * 100 + "%</td>" +
                            "<td><label>Percentage:</label> " + parseInt(jsonObj[1][0].Percentage) + "%</td>" +
                            "<td><label>Unanswered Questions:</label> " + jsonObj[0][0].UnansweredAnswers + "</td>" +
                         "</tr>";
            tabledata += "<tr>" +
                            "<td><label>Right Answers:</label> " + jsonObj[0][0].RightAnswers + "</td>" +
                            "<td><label>Wrong Answers:</label> " + jsonObj[0][0].WrongAnswers + "</td>" +
                         "</tr>";

            $('#QuizTestSummaryGrid').append(tabledata);
            $('#QuizTestSummaryTable').append('</tbody></table>');

            $('#QuizTestSummaryModal').modal('show');


        }
    }
}



function On_Delete_AssignForm(id) {
    assignFormid = id;
    $('#divDeleteConfirmation').find('#deletemsg').html("Would you like to delete this record ?");
    $2('#divDeleteConfirmation').jqmShow();
}

function DeleteConfirm() {
    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/DeleteAssignQuizTest",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"AssignFormId":"' + assignFormid + '"}',
        success: function (data) {

            if (data.d == "Deleted") {
                assignFormid = 0;
                resetAllFields();
                //FillAssignedQuizTestGrid();
                $2('#divDeleteConfirmation').jqmHide();
                $('#Divmessage').find('#hlabmsg').text('Assigned form deleted successfully!')
                $2('#Divmessage').jqmShow();
                $('#divDeleteConfirmation').find('#deletemsg').text('');
            }
            else if (data.d == "Not Deleted") {
                $2('#divDeleteConfirmation').jqmHide();
                $('#Divmessage').find('#hlabmsg').text('Assigned form not deleted.')
                $2('#Divmessage').jqmShow();
                $('#divDeleteConfirmation').find('#deletemsg').text('');
            }
            else if (data.d == "Execution Found") {
                $2('#divDeleteConfirmation').jqmHide();
                $('#Divmessage').find('#hlabmsg').text('Assigned form cannot be deleted. An execution is found.')
                $2('#Divmessage').jqmShow();
                $('#divDeleteConfirmation').find('#deletemsg').text('');
            }
            else {
                $2('#divDeleteConfirmation').jqmHide();
                $('#Divmessage').find('#hlabmsg').text('Error is occurred.')
                $2('#Divmessage').jqmShow();
                $('#divDeleteConfirmation').find('#deletemsg').text('');
            }
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function DeleteCancel() {
    $2('#divDeleteConfirmation').jqmHide();
    $('#divDeleteConfirmation').find('#deletemsg').text('');
    assignFormid = 0;
}

function OKClick() {
    $2('#Divmessage').jqmHide();
}

function SelectAllEmployeeCheckBoxes() {

    if ($('input[name="selectAllEmp"]').is(':checked')) {
        $('.empCheckboxes').prop('checked', true);
    } else {
        $('.empCheckboxes').prop('checked', false);
    }

}

function resetAllFields() {

    $("#form1").validate().resetForm();

    $('#btnAssignForm').show();

    $('input[name="selectAllEmp"]').prop('checked', false);
    $('.empCheckboxes').prop('checked', false);
    $("#divEmployees").empty();

    $('#attemptdate').val('');

    $('#ddl1').val('-1');

    $('#ddl2').val('');
    $('#ddl2').attr('disabled', 'disabled');
    $('#ddl3').val('');
    $('#ddl3').attr('disabled', 'disabled');
    $('#ddl4').val('');
    $('#ddl4').attr('disabled', 'disabled');
    $('#ddl5').val('');
    $('#ddl5').attr('disabled', 'disabled');
    $('#ddl6').val('');
    $('#ddl6').attr('disabled', 'disabled');
    $('#ddemp').val('');
    $('#ddemp').attr('disabled', 'disabled');
    $('#ddfrm').val('');

    $('#nmbrofquestions').val('');
    $('.labelNumberOfQuestions').html('');
    nmbrofques = '';
}

function onError(request, status, error) {
    $('#Divmessage').find('#hlabmsg').empty();
    $('#Divmessage').find('#hlabmsg').text('Error is occured.');
    $2('#Divmessage').jqmShow();
}
function startingAjax() {
    $('#UpdateProgress1').show();
}
function ajaxCompleted() {
    $('#UpdateProgress1').hide();
}
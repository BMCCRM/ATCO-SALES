var validation;
var validationAssignFormRules;
var validationAssignFormMessages;


var empids = [];
var formid;
var assignFormid;
var EmployeeData = ""
var RateData = ""
var SetRateCheckboxes=[]
var DeleteFlag = "0";


$(document).ready(function () {

    $2('#divConfirmation').jqm({ modal: true });
    $2('#Divmessage').jqm({ modal: true });
    $2('#divDeleteConfirmation').jqm({ modal: true });
    $2('#AttemptDateModal').jqm({ modal: true });

    
    $("#attemptdate").datepicker({ dateFormat: 'mm/dd/yy', beforeShowDay: NotBeforeToday });
    //$("#attemptdate").datepicker({ dateFormat: 'mm/dd/yy' }).datepicker("setDate", new Date());
    $("#newAttemptDatetxt").datepicker({ dateFormat: 'mm/dd/yy', beforeShowDay: NotBeforeToday });
    

    GetCurrentUser();
  
    FillRateForm();
    FillAssignedRateGrid();
    //GetQuizTestForms();

    $('#btnAssignForm').click(AssignForm);

    $('#btnClearFields').click(resetAllFields);

    $('#btnAssignYes').click(AssignConfirm);
    $('#btnAssignNo').click(AssignCancel);

  
    $('#btnDeleteNo').click(DeleteCancel);

    $('#btnOk').click(OKClick)

    $('#ddl1').change(OnChangeddl1);
    $('#ddl2').change(OnChangeddl2);
    $('#ddl3').change(OnChangeddl3);
    $('#ddl4').change(OnChangeddl4);

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


function FillRateForm()
{
    $("#divRate").empty();
    $.ajax({
        type: "POST",
        url: "RateAssignService.asmx/fillRateForm",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.d != "") {
                var jsonObj = jsonParse(data.d);
                $("#divRate").empty();
                $.each(jsonObj, function (i, tweet) {
                    $("#divRate").append("<div class='col-md-3'><label style='cursor: pointer;' ID='"+"color" + tweet.ID + "'><input type='checkbox' name='rateCheckboxes' class='rateCheckboxes' style='vertical-align: top;' value='" + tweet.ID + "' ID='" + tweet.ID + "' />&nbsp;" + tweet.RatingFormName + "</label></div>");
                });
            }
            else {
                $("#divRate").empty();
                $("#divRate").append("No Form Rate Found");
            }
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });
}

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
        // glbVarLevelName = "Level3";
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

    debugger;
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
        } 
            //  else if (level4 != -1) {
            //    GetCurrentLevelIDs(level4);
            //} else if (level3 != -1) {
            //    GetCurrentLevelIDs(level3);
            //} else if (level2 != -1) {
            //    GetCurrentLevelIDs(level2);
            //} else if (level1 != -1) {
            //    GetCurrentLevelIDs(level1);
            //}
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

    if ( glbVarLevelName == "Level3") {
        myData = "{'level3Id':'0','level4Id':'0','level5Id':'0','level6Id':'0'}";
    }

    if (glbVarLevelName == "Level1") {
        myData = "{'level1Id':'0','level2Id':'0','level3Id':'0','level4Id':'0','level5Id':'0','level6Id':'0'}";
    }

    debugger;
    $.ajax({
        type: "POST",
        url: "RateAssignService.asmx/fillFLMList",
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
            else {
                $("#divEmployees").empty();
                $("#divEmployees").append("No Employee Found");
            }
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

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
      
        $("#ddl5").val('');
        $("#ddl5").attr('disabled', 'disabled');
        $("#ddl6").val('');
        $("#ddl6").attr('disabled', 'disabled');
        $("#ddemp").val('');
        $("#ddemp").attr('disabled', 'disabled');

        if (glbVarLevelName == "Level3") {
            myData = "{'level3Id':'0','level4Id':'0','level5Id':'0','level6Id':'0'}";
        }
        if (glbVarLevelName == "Level1") {
            myData = "{'level1Id':'0','level2Id':'0','level3Id':'0','level4Id':'0','level5Id':'0','level6Id':'0'}";
        }


        $.ajax({
            type: "POST",
            url: "RateAssignService.asmx/fillFLMList",
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
                else {
                    $("#divEmployees").empty();
                    $("#divEmployees").append("No Employee Found");
                }
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });
    }

    if (SetRateCheckboxes.length > 0) {

        for (var i = 0; i < SetRateCheckboxes.length; i++) {
            $('#divRate #' + SetRateCheckboxes[i].value).prop('checked', false);
            $('#divRate #' + SetRateCheckboxes[i].value).prop('disabled', false);
            $("#divRate #color" + SetRateCheckboxes[i].value).css("color", "black");
        }
        SetRateCheckboxes[0] = "0";
    }

    EmployeeData = "";
    DeleteFlag = "0";
    $('#btnAssignForm').html('<i class="fa fa-check"></i>&nbsp;&nbsp;Assign')
}
function onSuccessFillddl1(data, status) {

    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    $('.rateCheckboxes').prop('checked', false);

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
        
        if (glbVarLevelName == "Level3" ) {
            myData = "{'level3Id':'" + level1Value + "','level4Id':'0','level5Id':'0','level6Id':'0'}";
        }

        if (glbVarLevelName == "Level1") {
            myData = "{'level1Id':'" + level1Value + "','level2Id':'0','level3Id':'0','level4Id':'0','level5Id':'0','level6Id':'0'}";
        }


        $.ajax({
            type: "POST",
            url: "RateAssignService.asmx/fillFLMList",
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
                else {
                    $("#divEmployees").empty();
                    $("#divEmployees").append("No Employee Found");
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

    debugger;

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
    debugger;
    
    if (SetRateCheckboxes.length > 0) {

        for (var i = 0; i < SetRateCheckboxes.length; i++) {
            $('#divRate #' + SetRateCheckboxes[i].value).prop('checked', false);
            $('#divRate #' + SetRateCheckboxes[i].value).prop('disabled', false);
            $("#divRate #color" + SetRateCheckboxes[i].value).css("color", "black");
        }
        SetRateCheckboxes[0] = "";
    }
    EmployeeData = "";
    DeleteFlag = "0";
    $('#btnAssignForm').html('<i class="fa fa-check"></i>&nbsp;&nbsp;Assign')
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
        
        if (glbVarLevelName == "Level3") {
            myData = "{'level3Id':'" + level1Value + "','level4Id':'" + level2Value + "','level5Id':'0','level6Id':'0'}";
        }

        if (glbVarLevelName == "Level1") {
            myData = "{'level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'0','level4Id':'0','level5Id':'0','level6Id':'0'}";
        }

        $.ajax({
            type: "POST",
            url: "RateAssignService.asmx/fillFLMList",
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
                else {
                    $("#divEmployees").empty();
                    $("#divEmployees").append("No Employee Found");
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

        OnChangeddl2();
    }
 

    if (SetRateCheckboxes.length > 0) {

        for (var i = 0; i < SetRateCheckboxes.length; i++) {
            $('#divRate #' + SetRateCheckboxes[i].value).prop('checked', false);
            $('#divRate #' + SetRateCheckboxes[i].value).prop('disabled', false);
            $("#divRate #color" + SetRateCheckboxes[i].value).css("color", "black");
        }
        SetRateCheckboxes[0] = "";
    }
    EmployeeData = "";
    DeleteFlag = "0";
    $('#btnAssignForm').html('<i class="fa fa-check"></i>&nbsp;&nbsp;Assign')
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

        if (glbVarLevelName == "Level3") {
            myData = "{'level3Id':'" + level1Value + "','level4Id':'" + level2Value + "','level5Id':'0','level6Id':'0'}";
        }

        if (glbVarLevelName == "Level1") {
            myData = "{'level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'" + level3Value + "','level4Id':'0','level5Id':'0','level6Id':'0'}";
        }

        $.ajax({
            type: "POST",
            url: "RateAssignService.asmx/fillFLMList",
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
                else {
                    $("#divEmployees").empty();
                    $("#divEmployees").append("No Employee Found");
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


    $('input[name="selectAllEmp"]').prop('checked', false);
    $('.empCheckboxes').prop('checked', false);

    levelValue = $('#ddl4').val();

    if (glbVarLevelName == "Level1") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level4'}";
    }
    if (glbVarLevelName == "Level2") {

        myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level5'}";
    }
    if (glbVarLevelName == "Level3") {

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
            success: onSuccessFillddl4,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    } else {
        $("#divEmployees").empty();


        $("#ddl4").val('');
        $("#ddl4").attr('disabled', 'disabled');

        $("#ddl5").val('');
        $("#ddl5").attr('disabled', 'disabled');
        $("#ddl6").val('');
        $("#ddl6").attr('disabled', 'disabled');
        $("#ddemp").val('');
        $("#ddemp").attr('disabled', 'disabled');

        OnChangeddl3();
    }


    if (SetRateCheckboxes.length > 0) {

        for (var i = 0; i < SetRateCheckboxes.length; i++) {
            $('#divRate #' + SetRateCheckboxes[i].value).prop('checked', false);
            $('#divRate #' + SetRateCheckboxes[i].value).prop('disabled', false);
            $("#divRate #color" + SetRateCheckboxes[i].value).css("color", "black");
        }
        SetRateCheckboxes[0] = "";
    }
    EmployeeData = "";
    DeleteFlag = "0";
    $('#btnAssignForm').html('<i class="fa fa-check"></i>&nbsp;&nbsp;Assign')
}
function onSuccessFillddl4(data, status) {


    // document.getElementById('ddl5').innerHTML = "";
    //   document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        //jsonObj = jsonParse(data.d);


        //value = '-1';
        //if (glbVarLevelName == "Level1") {
        //    name = 'Select ' + HierarchyLevel5;
        //}
        //if (glbVarLevelName == "Level2") {
        //    name = 'Select ' + HierarchyLevel5;
        //}
        //if (glbVarLevelName == "Level3") {
        //    name = 'Select ' + HierarchyLevel5;
        //}
        //name += ' Level';
        //$("#ddl5").removeAttr('disabled');

        //$("#ddl5").append("<option value='" + value + "'>" + name + "</option>");
        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl5").append("<option value='" + tweet.LevelId + "'>" + tweet.LevelName + "</option>");
        //});

        // append employees of this level
        var level1Value = $('#ddl1').val();
        var level2Value = $('#ddl2').val();
        var level3Value = $('#ddl3').val();
        var level4Value = $('#ddl4').val();

        if (glbVarLevelName == "Level3") {
            myData = "{'level3Id':'" + level1Value + "','level4Id':'" + level2Value + "','level5Id':'0','level6Id':'0'}";
        }

        if (glbVarLevelName == "Level1") {
            myData = "{'level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'" + level3Value + "','level4Id':'" + level4Value + "','level5Id':'0','level6Id':'0'}";
        }

        $.ajax({
            type: "POST",
            url: "RateAssignService.asmx/fillFLMList",
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
                else {
                    $("#divEmployees").empty();
                    $("#divEmployees").append("No Employee Found");
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
            level1Id = jsonObj[0].LevelId1;
            level2Id = jsonObj[0].LevelId2;
            level3Id = jsonObj[0].LevelId3;
            level4Id = jsonObj[0].LevelId4;
            level5Id = jsonObj[0].LevelId5;
            level6Id = jsonObj[0].LevelId6;
        }
    }

}


function FillAssignedRateGrid() {
    $.ajax({
        type: "POST",
        url: "RateAssignService.asmx/FillAssignedRate",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessFillAssignedRate,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}
function onSuccessFillAssignedRate(data, status) {
    var tabledata;
    $('#AssignedFormList').empty();
    $('#AssignedFormList').append('<table class="table table-striped table-bordered" id="AssignedFormsRecord">' +
            '<thead>' +
                '<tr>' +
                    '<th style="width: 60px;">S.No:</th>' +
                    '<th style="width: 240px;">Division</th>' +
                    '<th style="width: 240px;">Region</th>' +
                    '<th style="width: 240px;">Zone</th>' +
                    '<th style="width: 200px;">Employee Name</th>' +
                    '<th style="width: 100px;">Assigned Date</th>' +
                    '<th style="width: 100px;">Total Rate Forms</th>' +
                    '<th style="width: 140px;"></th>' +
                '</tr>' +
            '</thead>' +
            '<tbody id="AssignedFormListGrid">');
    if (data.d != '') {
        var jsonObj = jsonParse(data.d);

        for (var i = 0; i < jsonObj.length; i++) {
            
            tabledata += "<tr>" +
                    "<td style='vertical-align: middle;'>" + (i + 1) + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].Division + "</td>" +
                     "<td style='vertical-align: middle;'>" + jsonObj[i].Region + "</td>" +
                      "<td style='vertical-align: middle;'>" + jsonObj[i].Zone + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].EmployeeName + "</td>" +
                
                    //"<td style='vertical-align: middle;'>" +
                    //    (jsonObj[i].FormStatus == 'Submitted' ? "<button type='button' class='btn btn-sm btn-primary' onclick='ShowSummary(" + jsonObj[i].QuizSubmittedId + ", " + jsonObj[i].QuizTestFormId + ", " + jsonObj[i].Score + ")'>View Result</button>" : jsonObj[i].FormStatus) +
                    //"</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].AssignDate + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].FormCount + "</td>" +
                    "<td style='vertical-align: middle;'>" +
                        "<button type='button' onclick='On_Delete_AssignForm(" + jsonObj[i].EmpId + ")' class='btn btn-xs btn-danger' data-toggle='tooltip' title='Delete'><i class='fa fa-times'></i></button>&nbsp;" +
                        "<button type='button' onclick='On_Edit_AssignForm(" + jsonObj[i].EmpId + ")' class='btn btn-xs' data-toggle='tooltip' title='Edit Rate Forms'><i class='fa fa-edit'></i></button>&nbsp;" +
                        "<button type='button' onclick='On_View_AssignForm(" + jsonObj[i].EmpId + ")' class='btn btn-xs' data-toggle='tooltip' title='View Rate Forms'><i class='fa fa-eye'></i></button>&nbsp;" +
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

function AssignForm() {
    validation.resetForm();
    validation.settings.rules = validationAssignFormRules;
    validation.settings.messages = validationAssignFormMessages;

    if (!$('#form1').valid()) {
        return false;
    }

    //for updation
    var lastChar = EmployeeData[EmployeeData.length - 1];

    if (EmployeeData=="" && lastChar == undefined && DeleteFlag == "0")
    {
      
    
        var Empcheckedboxes  = document.querySelectorAll('input[name=empCheckboxes]:checked');

        var Ratecheckedboxes = document.querySelectorAll('input[name=rateCheckboxes]:checked');

        EmployeeData = "";
        RateData = "";

        //check if any of the spo is selected
        if (Empcheckedboxes.length > 0) {
            for (var i = 0; i < Empcheckedboxes.length; i++) {
                empids.push(Empcheckedboxes[i].value);
                EmployeeData += Empcheckedboxes[i].value + ",";
            }


            if (Ratecheckedboxes.length > 0) {

                for (var i = 0; i < Ratecheckedboxes.length; i++) {

                    RateData += Ratecheckedboxes[i].value + ",";
                }
            }
            else {
                $('#Divmessage').find('#hlabmsg').text('You must select atleast one Rate!')
                $2('#Divmessage').jqmShow();
            }




        }
        else {
            $('#Divmessage').find('#hlabmsg').text('You must select atleast one Employee!')
            $2('#Divmessage').jqmShow();
        }
      
    }
    else
    {
        
        SetRateCheckboxes = [];
        SetRateCheckboxes = document.querySelectorAll('input[name=rateCheckboxes]:enabled:checked');
      
        RateData = "";
       
        if (SetRateCheckboxes.length > 0) {

            for (var i = 0; i < SetRateCheckboxes.length; i++) {

                RateData += SetRateCheckboxes[i].value + ",";
            }
            EmployeeData = EmployeeData + ',';
        }

        else if (DeleteFlag == "2") {
            $('#Divmessage').find('#hlabmsg').text('You must select atleast one rate for updation!')
            $2('#Divmessage').jqmShow();
        }
        else if (DeleteFlag == "1") {
            $('#Divmessage').find('#hlabmsg').text('You must select atleast one rate for delete!')
            $2('#Divmessage').jqmShow();
        }

    }
    if (EmployeeData != "" && RateData != "" && (DeleteFlag == "0" || DeleteFlag == "2")) {
        $2('#divConfirmation').jqmShow();
        $('#divConfirmation').find('#assignmsg').html("Do You Want To Continue!");
    }
    else if (EmployeeData != "" && RateData != "" && DeleteFlag == "1")
    {
        $2('#divConfirmation').jqmShow();
        $('#divConfirmation').find('#assignmsg').html("Do You Want To Delete!");
    }
}

function AssignConfirm() {
 
 
    if (DeleteFlag == "0"|| DeleteFlag == "2") {
        $.ajax({
            type: "POST",
            url: "RateAssignService.asmx/AssignRate",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"RateData":"' + RateData + '","EmployeeData":"' + EmployeeData + '","DeleteFlag":"' + DeleteFlag + '"}',
            success: onSuccesAssignForm,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });
    }
    else if (DeleteFlag == "1")
    {
        $.ajax({
            type: "POST",
            url: "RateAssignService.asmx/DeleteRate",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"RateData":"' + RateData + '","EmployeeData":"' + EmployeeData + '"}',
            success: onSuccesAssignForm,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });
    }
    
}
function onSuccesAssignForm(data, status) {



    if (data.d != "") {
        var jsonObj = jsonParse(data.d);



        if (jsonObj[0].Status == 'OK' && DeleteFlag == "2") {

            $2('#divConfirmation').jqmHide();
            $('#Divmessage').find('#hlabmsg').html('Form Updated successfully!')
            $2('#Divmessage').jqmShow();
            $('#divConfirmation').find('#assignmsg').text('');
            $('#divEmployees').empty();
        }
        else if (jsonObj[0].Status == 'OK' && DeleteFlag == "0") {

            $2('#divConfirmation').jqmHide();
            $('#Divmessage').find('#hlabmsg').html('Form assigned successfully!')
            $2('#Divmessage').jqmShow();
            $('#divConfirmation').find('#assignmsg').text('');
            $('#divEmployees').empty();
        }
        else if (jsonObj[0].Status == 'OK' && DeleteFlag == "1") {

            $2('#divConfirmation').jqmHide();
            $('#Divmessage').find('#hlabmsg').html('Form Deleted successfully!')
            $2('#Divmessage').jqmShow();
            $('#divConfirmation').find('#assignmsg').text('');
            $('#divEmployees').empty();
        }
        else {
            $2('#divConfirmation').jqmHide();
            $('#Divmessage').find('#hlabmsg').html('Error is occurred!')
            $2('#Divmessage').jqmShow();
        }

        resetAllFields();
        FillAssignedRateGrid();
        EmployeeData = "";
        RateData = "";
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



function On_Edit_AssignForm(EmpId) {

    resetAllFields();
    EmployeeData = EmpId;
    $.ajax({
        type: "POST",
        url: "RateAssignService.asmx/View_AssignForm",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"EmpId":"' + EmpId + '"}',
        success: onSuccessEditAssignForm,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function onSuccessEditAssignForm(data, status) {

    
  
    SetRateCheckboxes = document.querySelectorAll('input[name=rateCheckboxes]');
    //resetAllFields();

    if (SetRateCheckboxes.length > 0) {

        for (var i = 0; i < SetRateCheckboxes.length; i++) {
            $('#divRate #' + SetRateCheckboxes[i].value).prop('checked', false);
            $('#divRate #' + SetRateCheckboxes[i].value).prop('disabled', false);
        }


        if (data.d != "") {
            var jsonObj = jsonParse(data.d);
            $('#divEmployees').html("<h5><b>National : </b><u>" + jsonObj[0].Division + "</u><br><b>  Region : </b><u>" + jsonObj[0].Region + "</u><br><b>  Zone : </b><u>" + jsonObj[0].Zone + "</u><br><b>  Employee Name : </b><u>" + jsonObj[0].EmployeeName + "</u></h5>");

            for (var j = 0; j < jsonObj.length; j++) {
                for (var i = 0; i < SetRateCheckboxes.length; i++) {
                    if (jsonObj[j].ID == SetRateCheckboxes[i].value) {
                        $('#divRate #' + SetRateCheckboxes[i].value).prop('checked', true);
                        $('#divRate #' + SetRateCheckboxes[i].value).prop('disabled', true);
                        //$('#divRate #' + SetRateCheckboxes[i].value).val('0');
                    }
                    //else {
                    //    $('#divRate #' + SetRateCheckboxes[i].value).prop('disabled', false);
                    //}
                }
            }
        }

    }
   

    $('#btnAssignForm').html('<i class="fa fa-check"></i>&nbsp;&nbsp;Update')
    DeleteFlag = "2";
}



function On_View_AssignForm(EmpId) {
    $.ajax({
        type: "POST",
        url: "RateAssignService.asmx/View_AssignForm",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"EmpId":"' + EmpId + '"}',
        success: onSuccessViewAssignForm,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function onSuccessViewAssignForm(data, status) {

    var tabledata="";
    $('#ViewAssignedFormList').empty();
    tabledata ='<table class="table table-striped table-bordered" id="AssignedViewRecord">' +
            '<thead>' +
                '<tr>' +
                    '<th style="width: 20px;">S.No:</th>' +
                    '<th style="width: 240px;">Rating Form Name</th>' +
                    '<th style="width: 240px;">Rating Form Type</th>' +
                    '<th style="width: 240px;">AssignDate</th>' +
                   
                '</tr>' +
            '</thead>' +
            '<tbody>';
    if (data.d != '') {
        var jsonObj = jsonParse(data.d);

        $('#FLMName').html("<h4><b>Employee Name :  </b>" + jsonObj[0].EmployeeName+"</h4>")
        for (var i = 0; i < jsonObj.length; i++) {

            tabledata += "<tr>" +
                    "<td style='vertical-align: middle;'>" + (i + 1) + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].RatingFormName + "</td>" +
                     "<td style='vertical-align: middle;'>" + jsonObj[i].RatingFormType + "</td>" +
                     "<td style='vertical-align: middle;'>" + jsonObj[i].AssignDate + "</td>" +
                   
                "</tr>";
        }
        tabledata += "</tbody></table>";

        $('#ViewAssignedFormList').append(tabledata);
        if (!$.fn.DataTable.isDataTable('#AssignedViewRecord')) {
            $('#AssignedViewRecord').DataTable({
                "columnDefs": [
                        { "orderable": false, "targets": -1 }
                ]
            });
        }
        else {
            $('#AssignedViewRecord').DataTable({
                "columnDefs": [
                        { "orderable": false, "targets": -1 }
                ]
            });
        }


        $('#AssignedFormListModal').modal('show');

    }
       
    
}




function On_Delete_AssignForm(EmpId) {
    EmployeeData = EmpId;
    $.ajax({
        type: "POST",
        url: "RateAssignService.asmx/View_AssignForm",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"EmpId":"' + EmpId + '"}',
        success: onSuccessDeleteAssignForm,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}


function onSuccessDeleteAssignForm(data, status) {



    SetRateCheckboxes = document.querySelectorAll('input[name=rateCheckboxes]');
    //resetAllFields();

    if (SetRateCheckboxes.length > 0) {

        for (var i = 0; i < SetRateCheckboxes.length; i++) {
            $('#divRate #' + SetRateCheckboxes[i].value).prop('checked', false);
            $('#divRate #' + SetRateCheckboxes[i].value).prop('disabled', true);
            $("#divRate #color" + SetRateCheckboxes[i].value).css("color", "black");
        }


        if (data.d != "") {
            var jsonObj = jsonParse(data.d);
            $('#divEmployees').html("<h5><b>National : </b><u>" + jsonObj[0].Division + "</u><br><b>  Region : </b><u>" + jsonObj[0].Region + "</u><br><b>  Zone : </b><u>" + jsonObj[0].Zone + "</u><br><b>  Employee Name : </b><u>" + jsonObj[0].EmployeeName + "</u></h5>");

            for (var j = 0; j < jsonObj.length; j++) {
                for (var i = 0; i < SetRateCheckboxes.length; i++) {
                    if (jsonObj[j].ID == SetRateCheckboxes[i].value) {
                        // $('#divRate #' + SetRateCheckboxes[i].value).prop('checked', true);
                       
                        $("#divRate #color" + SetRateCheckboxes[i].value).css("color", "green");
                        $('#divRate #' + SetRateCheckboxes[i].value).prop('disabled', false);
                        if (jsonObj[j].CallExecuted == '1') {
                            $("#divRate #color" + SetRateCheckboxes[i].value).css("color", "red");
                            $('#divRate #' + SetRateCheckboxes[i].value).prop('disabled', true);
                        }
                   
                    }
                  

                    //if (jsonObj[j].CallExecuted == '1') {
                    //    $("#divRate #color" + SetRateCheckboxes[i].value).css("color", "red");
                    //    //$('#divRate #' + SetRateCheckboxes[i].value).val('0');
                    //}
                    //else {
                    //    $("#divRate #color" + SetRateCheckboxes[i].value).css("color", "black");
                    //}
                    //else {
                    //    $('#divRate #' + SetRateCheckboxes[i].value).prop('disabled', false);
                    //}
                }
            }
        }

    }


    $('#btnAssignForm').html('<i class="fa fa-check"></i>&nbsp;&nbsp;Delete')
    DeleteFlag = "1";
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

function SelectAllRateCheckBoxes() {

    if ($('input[name="selectAllRate"]').is(':checked')) {
        $('.rateCheckboxes').prop('checked', true);
    } else {
        $('.rateCheckboxes').prop('checked', false);
    }

}


function resetAllFields() {

    $("#form1").validate().resetForm();
    $('#btnAssignForm').html('<i class="fa fa-check" id="btnAssignName"></i>&nbsp;&nbsp;assign')
    $('#btnAssignForm').show();

    $('input[name="selectAllEmp"]').prop('checked', false);
    $('input[name="selectAllRate"]').prop('checked', false);
    $('.empCheckboxes').prop('checked', false);
    $('.rateCheckboxes').prop('checked', false);
    EmployeeData = ""
    RateData = ""
    DeleteFlag = "0";


    $("#divEmployees").empty();

    $('#attemptdate').val('');

    $('#ddl1').val('-1');

    $('#ddl2').val('');
    $('#ddl2').attr('disabled', 'disabled');
    $('#ddl3').val('');
    $('#ddl3').attr('disabled', 'disabled');
   
    $('#ddl5').val('');
    $('#ddl5').attr('disabled', 'disabled');
    $('#ddl6').val('');
    $('#ddl6').attr('disabled', 'disabled');
    $('#ddemp').val('');
    $('#ddemp').attr('disabled', 'disabled');
    $('#ddfrm').val('');
    SetRateCheckboxes = document.querySelectorAll('input[name=rateCheckboxes]');
    //resetAllFields();

    if (SetRateCheckboxes.length > 0) {

        for (var i = 0; i < SetRateCheckboxes.length; i++) {
            $('#divRate #' + SetRateCheckboxes[i].value).prop('checked', false);
            $('#divRate #' + SetRateCheckboxes[i].value).prop('disabled', false);
            $("#divRate #color" + SetRateCheckboxes[i].value).css("color", "black");
        }
        SetRateCheckboxes[0] ="";
    }
    OnChangeddl1();
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
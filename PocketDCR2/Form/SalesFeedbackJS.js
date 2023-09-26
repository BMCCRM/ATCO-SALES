var employeeIDFORDATA = "0";
var startDateValidate = "0";
var EndDateValidate = "0";
var locations = [];
function pageLoad() {

   
    IsValidUser();
    $('#ddl1').change(OnChangeddl1);
    $('#ddl2').change(OnChangeddl2);
    $('#ddl3').change(OnChangeddl3);

    $('#ddl5').change(OnChangeddl5);

    fillmiodetailslatlong();      // get latitude longitude
    initMap(24.861462, 67.009939); // and pass value lat longm

    HideHierarchy();
    GetCurrentUserRole();
    totalvisit();
    $('#ddl1').hide();
    $('#Label1').hide();
   
}
function OnshowResultClick() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if (startDateValidate == "0") {
        startDateValidate = new Date();
    }
    if (EndDateValidate == "0") {
        EndDateValidate = new Date();
    }

    if (EndDateValidate < startDateValidate) {
        alert("Please provide correct formated Date...!");

    }
    else {
        IsValidUser();
    }
    $('#dialog').jqmHide();
}

function totalvisit() {

    $.ajax({
        type: "POST",
        url: "../Reports/NewDashboard.asmx/totalviisit",
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data.d != "No") {
                var msg = $.parseJSON(data.d);
                $('#tabbtotal').text(msg[0].totalvisit + "  Total Calls");
            }
            else {
                $('#tabbtotal').text("0 Total Calls");
            }
        },
        error: onError,
        complete: onComplete,
        cache: false
    });
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

        //if ($('#ddl4').val() != null) {
        //    level6 = $('#ddl4').val();
        //}
        //else {
        //    level6 = -1
        //}


        startdate = $('#txtDate').val();
        enddate = $('#txtenddate').val();

        //if (level6 != -1) {
        //    GetCurrentLevelIDs(level6);
        //} else
            if (level5 != -1) {
            GetCurrentLevelIDs(level5);
        } else if (level4 != -1) {
            GetCurrentLevelIDs(level4);
        }
        //else if (level3 != -1) {
        //    GetCurrentLevelIDs(level3);
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
function onSuccessGetCurrentUser(data, status) {

    if (data.d != "") {

        EmployeeId = data.d;
    }

    GetCurrentUserLoginID();
}

function GetCurrentUserRole() {

    $.ajax({
        type: "POST",
        url: "CommonService.asmx/GetCurrentUserRole",
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


            GetRegionalLevelDataForDropDown();
            FillDropDownList();
            
        }
        if (CurrentUserRole == 'vfc') {

            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col4').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();
            $('#col44').show();


            GetRegionalLevelDataForDropDown();
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
            GetRegionalLevelDataForDropDown();
        }
        if (CurrentUserRole == 'rl4') {
            $('#col1').show();
            $('#col2').show();

            $('#col11').show();
            $('#col22').show();

            FillDropDownList();
            GetRegionalLevelDataForDropDown();
        }
        if (CurrentUserRole == 'rl5') {
            $('#col1').show();
            $('#col11').show();
            FillDropDownList();
            GetRegionalLevelDataForDropDown();
        }
    }
}
function onSuccessgetCurrentLevelID(data, status) {

    if (data.d != "") {

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

    //$('#Actcall').jqm({ modal: true });
    //$('#Actcall').jqm();
    //$('#Actcall').jqmShow();

    //barchartEstworkingdays();

    //barchartProdfre();

    //barchartCustomerCov();

    //callsperday();
  
    FillFlmDetails();

    fillmiodetails();
    // FillGridMioInfo();

    //ActualCallWork();

    //DailyCallTrend();

    //PlannedVsActualCalls();

    //VisitFrequency();

    //GetAverageCalls();

    //FillGridTop5();

    //FillGridBottom5();
    //daysinfield();
    //FillGridDailyCall();

    //      FillGridBottom51();

    //SMSCorrectness();

}

var da, pa;

function BeforPOP(day, para) {
    $.ajax({
        type: "POST",
        url: "../Reports/NewDashboard.asmx/GetLevelsID",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: onSuccessGetLevel1,
        error: onError,
        cache: false
    });

    da = day;
    pa = para;
    //alert(day + para);


    return false;
}
function onError(request, status, error) {
    msg = 'Error is occured';
    //alert(error);

}
function onComplete() {

}

function onSuccessGetLevel(data, status) {

    var level1id, level2id, level3id, level4id, level5id, level6id, employeID;

    var json1 = jsonParse(data.d);
    level1id = json1[0].levelvalue;
    level2id = json1[1].levelvalue;
    level3id = json1[2].levelvalue;
    level4id = json1[3].levelvalue;
    level5id = json1[4].levelvalue;
    level6id = json1[5].levelvalue;
    employeID = json1[6].levelvalue;

    ShowSMSCorrectnessReport(xvalue, seriesName, yvalue, 'ZOne', 'MR', level3id, level4id, level5id, level6id, employeID);
}
function onSuccessGetLevel1(data, status) {

    var level1id, level2id, level3id, level4id, level5id, level6id, employeID;

    var json1 = jsonParse(data.d);
    level1id = json1[0].levelvalue;
    level2id = json1[1].levelvalue;
    level3id = json1[2].levelvalue;
    level4id = json1[3].levelvalue;
    level5id = json1[4].levelvalue;
    level6id = json1[5].levelvalue;
    employeID = json1[6].levelvalue;

    OpenPopup(da, pa, level3id, level4id, level5id, level6id, employeID);
}

function OpenPopup(day, parameter1, Level3, Level4, Level5, Level6, employeeid) {
    //alert('Popup ' + parameter1 + ' for day :' + day);
    var ddlReport = $('#txtDate').val();
    // var ddlReport = document.getElementById("<%=txtDate.ClientID%>");
    //alert(ddlReport.value);

    if (parameter1 == "M") {
        //window.open("./Report_Calls.aspx?Day=" + day, "Calls", "status = 0, height = 850, width = 700, resizable = 1");
        window.showModalDialog("./Report_Calls.aspx?Day=" + day + "&Month=" + ddlReport + "&Level3=" + Level3 + "&Level4=" + Level4 + "&Level5=" + Level5 + "&Level6=" + Level6 + "&employeeid=" + employeeid, "Calls", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
    }
    else if (parameter1 == "C") {
        //window.open("./Report_MIO.aspx?Day=" + day, "Calls", "status = 0, height = 850, width = 700, resizable = 1");
        window.showModalDialog("./Report_MIO.aspx?Day=" + day + "&Month=" + ddlReport + "&Level3=" + Level3 + "&Level4=" + Level4 + "&Level5=" + Level5 + "&Level6=" + Level6 + "&employeeid=" + employeeid, "Calls", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
    }

    return false;
}
function ShowMRDetails() {
    //alert('test');
    var ddlReport = $('#txtDate').val();
    window.showModalDialog("./MRDaywiseCallDetails.aspx?Month=" + ddlReport + "&Rndm=" + Math.floor(Math.random() * 101), "Calls", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
    return false;
}
function ShowSMSCorrectnessReport(day, datasettype, value, Zone, MR, Level3id, Level4id, Level5id, Level6id, employeeid) {
    //alert('test');

    var ddlReport = $('#txtDate').val();
    //  var ddlReport = document.getElementById("<%=txtDate.ClientID%>");
    window.showModalDialog("./SMSCorrectnessReport.aspx?Day=" + day + "&DataSetType=" + datasettype + "&Value=" + value + "&Zone=" + Zone + "&MR=" + MR + "&Month=" + ddlReport + "&Level3=" + Level3id + "&Level4=" + Level4id + "&Level5=" + Level5id + "&Level6=" + Level6id + "&employeeid=" + employeeid, "SMS Correctness Report", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
    //window.open("./SMSCorrectnessReport.aspx?Day=" + day + "DataSetType=" + datasettype + "Value=" + value);
    //return false;
}
// Change mY Yaseen

function GetCurrentUserRole() {

    $.ajax({
        type: "POST",
        url: "CommonService.asmx/GetCurrentUserRole",
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


function GetEditableDataRole() {

    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "../Reports/datascreen.asmx/GetEditableDataRole",
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
        if (CurrentUserRole == 'vfc') {

            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col4').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();
            $('#col44').show();


            GetRegionalLevelDataForDropDown();
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

        jsonObj = jsonParse(data.d);

        if (glbVarLevelName == "Level3") {

            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            //document.getElementById('ddl4').innerHTML = "";

            value = '-1';

            if (CurrentUserRole == 'admin') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3);
                $('#Label2').append(HierarchyLevel4);
                $('#Label3').append(HierarchyLevel5);
                $('#Label4').append(HierarchyLevel6);
            }
            if (CurrentUserRole == 'vfc') {
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

            GetRegionalLevelDataForDropDown();
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




    levelValue = $('#ddl1').val();
    myData = "{'employeeId':'" + levelValue + "' }";

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


    } else {

        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        //document.getElementById('ddl4').innerHTML = "";
    }

}
function onSuccessFillddl1(data, status) {

    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    //document.getElementById('ddl4').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);


        value = '-1';
        name = 'Select ' + HierarchyLevel4;
        $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
    //IsValidUser();


}

function OnChangeddl2() {



    levelValue = $('#ddl2').val();
    //levelValue = "476";

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
    } else {

        document.getElementById('ddl3').innerHTML = "";
        //document.getElementById('ddl4').innerHTML = "";
    }


}

function GetRegionalLevelDataForDropDown()
{
    levelValue = "476";

    myData = "{'employeeId':'" + levelValue + "' }";

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


    } else {

        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        //document.getElementById('ddl4').innerHTML = "";
    }

}
function onSuccessFillddl2(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    //document.getElementById('ddl4').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);


        value = '-1';
        name = 'Select ' + HierarchyLevel5;
        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
    IsValidUser();
    //FillGridMioInfo();

}

function OnChangeddl3() {



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
        //document.getElementById('ddl4').innerHTML = "";
    }


}
function onSuccessFillddl3(data, status) {
    //document.getElementById('ddl4').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);


        value = '-1';
        name = 'Select ' + HierarchyLevel6;
        //$("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});
    }
    IsValidUser();
    //FillGridMioInfo();

}

function OnChangeddl5() { }
function onSuccessFillddl5(data, status) { }

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
    //     
    //    
    //   
}
function ajaxCompleted() {
    // 
    //$('.loading').fadeOut('slow');
    //$('.loading_bgrd').fadeOut('slow');
    // $('#imgLoading').hide();
}

function fillmiodetails() {
    $('#loadsalesdata').parent().find('.loding_box_outer').show().fadeIn();

    myData = "{'Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "'}";
    $.ajax({
        type: "POST",
        url: "../Reports/NewDashboard.asmx/FillGridMioInfo",
        data: myData,
        contentType: "application/json",
        async: false,
        success: onSuccessMioFill,
        error: onError,
        complete: onComplete, 
        cache: false
    });
}

function onSuccessMioFill(data, status) {

    $('#miotable').empty();
    $('#miotable').append($('<table class="responstable"> <thead> <tr style="background-color: rgb(100, 146, 207); color: white;">'
        + '<td> Time For Call </td> '
        + '<td>FMO Name </td> '
        + '<td>Last Doctor/Chemist Visit</td> '
        + '<td>Next Doctor/Chemist Visit</td> '
        + '<td>No Of Chemist Visited</td> '
        + '<td>No Of Doctor Visited</td> '
        + '<td>Sales Achieved Yesterday</td>'
        + '<td>Sales Forecast Today</td>'
        + '<td>Spot Check</td> </tr></thead><tbody id="newmiobody">'));
    if (data.d == "[]") {
       
        $('#newmiobody').append($('<tr> '
                             + '<td> -- </td> '
                             + '<td> -- </td> '
                             + '<td> -- </td>'
                             + '<td> -- </td> '
                             + '<td> -- </td> '
                             + '<td> -- </td> '
                             + '<td> -- </td>'
                             + '<td> -- </td> '
                             + '<td><a href="CallDetail.aspx?lastdoc="asd"" target="popup">view</a>  </td></tr> '));
        }

    else {
        var a = data.d.split('|');

        for (var i = 0; i < a.length; i++) {

            var msg = jQuery.parseJSON(a[i]);

            $.each(msg, function (i, option) {
                $('#newmiobody').append($('<tr> '
                                        + '<td>' + option.TimeForCall + '</td> '
                                        + '<td>' + option.name + '</td> '
                                        + '<td>' + option.lastdocvisit + '</td>'
                                        + '<td>' + option.nextdoc + '</td> '
                                        + '<td> -- </td> '
                                        + '<td>' + option.noofdocvisited + '</td> '
                                        + '<td> -- </td>'
                                        + '<td> -- </td> '
                                       + '<td><img src="../assets/img/map-icon.png" style="cursor:pointer;" onclick="calldetailspage(\'' + option.nextdoc + '/' + option.Latitude + '/' + option.Longitude + '/' + option.lastdocvisit + '/' + option.name + '/' + option.mobno + '/' + option.ClassName + '/' + option.TimeForCall + '/medrep\')" /></td></tr>'));
            });
        }
    }
    //<a href = "CallDetail.aspx?nextdoc=' + option.nextdoc + "/" + option.lastdocvisit + "/" + option.name + "/" + option.mobno +"/medrep"+ '" target="popup">view</a>
    //
    $('#miotable').append($('</tbody></table>'));
    $('#loadsalesdata').parent().find('.loding_box_outer').show().fadeOut();
}

function FillFlmDetails() {
    //if ($('#L6').val() == '0' || $('#L6').val() == 'undefined') {
    $('#loadsalesdata').parent().find('.loding_box_outer').show().fadeIn();
        //  myData = "{'Level3':'"+$('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "'}";
        myData = "{'Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "'}";
        $.ajax({
            type: "POST",
            url: "../Reports/NewDashboard.asmx/Mfillflmdetails",
            data: myData,
            contentType: "application/json",
            async: false,
            success: fillflmdetailss,
            error: onError,
            complete: onComplete,
            cache: false
        });
  

}

function fillflmdetailss(data, status) {
    $('#newtable').empty();
    $('#newtable').append($('<table class="responstable"> <thead> <tr style="background-color: rgb(100, 146, 207); color: white;">'
        + '<td>Time For Call </td> '
        + '<td> FLM Name </td> '
        + '<td> FMO Name </td> '
        + '<td>Last Doctor/Chemist Visit</td> '
        + '<td>Next Doctor/Chemist Visit</td> '
        + '<td>No of Chemist Visited</td> '
        + '<td>No of Doctor Visited</td> '
        + '<td>Sales Achieved Yesterday</td>'
        + '<td>Sales Forecast Today</td>'
        + '<td>Spot Check</td> </tr></thead><tbody id="newbody">'));
    if (data.d != "[]") {
        var a = data.d.split('|');

        for (var i = 0; i < a.length; i++) {

            var msg = jQuery.parseJSON(a[i]);
            $.each(msg, function (i, option) {
                $('#newbody').append($('<tr> '
                                        + '<td>' + option.TimeForCall + '</td> '
                                        + '<td>' + option.FlmName + '</td> '
                                        + '<td>' + option.name + '</td> '
                                        + '<td>' + option.lastdocvisit + '</td>'
                                        + '<td>' + option.nextdoc + '</td> '
                                        + '<td> -- </td> '
                                        + '<td>' + option.noofdocvisited + '</td> '
                                        + '<td> -- </td>'
                                        + '<td> -- </td> '
                                        + '<td><img src="../assets/img/map-icon.png" style="cursor:pointer;" onclick="calldetailspage(\'' + option.nextdoc + '/' + option.Latitude + '/' + option.Longitude + '/' + option.lastdocvisit + '/' + option.FlmName + '/' + option.Flmobile + '/Flm\')" /> </td></tr>'));
            });
        }
    }
    else {
        $('#newbody').append($('<tr> '
                            + '<td> -- </td> '
                            + '<td> -- </td> '
                            + '<td> -- </td>'
                            + '<td> -- </td> '
                            + '<td> -- </td> '
                            + '<td> -- </td> '
                            + '<td> -- </td>'
                            + '<td> -- </td> '
                            + '<td><img src="../assets/img/map-icon.png" onclick="calldetailspage()" /> </td></tr> '));
    }
    $('#newtable').append($('</tbody></table>'));
    $('#loadsalesdata').parent().find('.loding_box_outer').show().fadeOut();

  
}

function calldetailspage(nextdoc) {

    nextdoc = nextdoc.split('/');
    var a = nextdoc[0];
    var lat = nextdoc[1];
    var lan = nextdoc[2];
    var last = nextdoc[3];
    var flmn = nextdoc[4];
    var flmm = nextdoc[5];
    var type = nextdoc[8];
    var cls = nextdoc[6];
    var timeforcall = nextdoc[7];
    $.cookie("next", a, { path: '/' });
 //   $.cookie('next', a);
    $.cookie('lastdoc', last, { path: '/' });
    $.cookie('cls', cls, { path: '/' });
    $.cookie('TimeForCall', timeforcall, { path: '/' });
    $.cookie('flmname', flmn, { path: '/' });
    $.cookie('flmmobile', flmm, { path: '/' });
    $.cookie('type', type, { path: '/' });
    $.cookie('lat', lat, { path: '/' });
    $.cookie('lan', lan, { path: '/' });
    window.open('../Reports/CallDetail.aspx', '_blank');
}

function initMap(lat, long) {

    var myLatLng = { lat: parseFloat(lat), lng: parseFloat(long) };

    //var locations = [
    //  [24.868332, 67.085078],
    //  [24.862038, 67.070059],
    //  [24.867114, 67.066883],
    //  [ 24.859599, 67.059588],
    //  [ 24.865109, 67.055640]
    //];

    var map = new google.maps.Map($("#mapppp")[0], {
        zoom: 11,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Location'
    });

    var infoWindow = new google.maps.InfoWindow();
    var latlngbounds = new google.maps.LatLngBounds();

    for (var i = 0; i < locations.length; i++) {

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            title: locations[i][0]
        });

    }


}

function fillmiodetailslatlong() {
    $('#loadsalesdata').parent().find('.loding_box_outer').show().fadeIn();

    myData = "{'Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "'}";
    $.ajax({
        type: "POST",
        url: "../Reports/NewDashboard.asmx/FillGridMioLatlong",
        data: myData,
        contentType: "application/json",
        async: false,
        success: onSuccessMiolatlong,
        error: onError,
        complete: onComplete,
        cache: false
    });
}

function onSuccessMiolatlong(data, status) {

    var a = data.d.split('|');

    for (var i = 0; i < a.length; i++) {

        var msg = jQuery.parseJSON(a[i]);

        $.each(msg, function (i, option) {

            locations.push([option.name, parseFloat(option.Latitude), parseFloat(option.Longitude)]);
        });
    }
}

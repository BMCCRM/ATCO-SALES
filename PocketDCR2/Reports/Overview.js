var isDevice;




function pageLoad() {

    var cdt = new Date();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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


    $('#ddlCity').change(OnChangeCity);
    $('#ddlDistributor').change(OnChangeDistributor);


    //$('#txtDate').change(OnChangedtxtDate);
    HideHierarchy();
    GetCurrentUser();
    FillCity();
    InitiateUtilityFunctions();
   
}

function InitiateUtilityFunctions() {


    $.SumArray = function (arr) {
        var r = 0;
        $.each(arr, function (i, v) {
            r += +v;
        });
        return r;
    }

    $.ParseValidateNumber = function (value) {
        try {
            return parseFloat(value);
        } catch (e) {
            return 0;
        }
    }

    $.CurrencyFormat = function (value) {
        value = parseFloat(value);
        return 'RS ' + value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");;
    }

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
        } else { GetCurrentLevelIDs(0); }







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
        url: "datascreen.asmx/GetCurrentLevelId",
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
        if (glbVarLevelName == "Level1") {
            HierarchyLevel1 = jsonObj[0].SettingValue;
            HierarchyLevel2 = jsonObj[1].SettingValue;
            HierarchyLevel3 = jsonObj[2].SettingValue;
            HierarchyLevel4 = jsonObj[3].SettingValue;
            HierarchyLevel5 = jsonObj[4].SettingValue;
            HierarchyLevel6 = jsonObj[5].SettingValue;
        }
        if (glbVarLevelName == "Level2") {
            HierarchyLevel2 = jsonObj[0].SettingValue;
            HierarchyLevel3 = jsonObj[1].SettingValue;
            HierarchyLevel4 = jsonObj[2].SettingValue;
            HierarchyLevel5 = jsonObj[3].SettingValue;
            HierarchyLevel6 = jsonObj[4].SettingValue;
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

        if (CurrentUserRole == 'admin') {

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





        }
        if (CurrentUserRole == 'rl3') {
            $('#col1').show();
            $('#col2').show();
            $('#col3').show();

            $('#col11').show();
            $('#col22').show();
            $('#col33').show();




        }
        if (CurrentUserRole == 'rl4') {
            $('#col1').show();
            $('#col2').show();
            $('#col11').show();
            $('#col22').show();





        }
        if (CurrentUserRole == 'rl5') {
            $('#col1').show();
            $('#col11').show();



        }
        GetHierarchySelection();
        FillDropDownList();
    }
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




        } if (CurrentUserRole == 'marketingteam') {

            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col4').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();
            $('#col44').show();



        }
        if (CurrentUserRole == 'rl3') {
            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();




        }
        if (CurrentUserRole == 'rl4') {
            $('#col1').show();
            $('#col2').show();
            $('#col11').show();
            $('#col22').show();



        }
        if (CurrentUserRole == 'rl5') {
            $('#col1').show();
            $('#col11').show();


        }
        GetHierarchySelection();
        FillDropDownList();
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
            if (glbVarLevelName == "Level1") {

                level1Id = jsonObj[0].LevelId1;
                level2Id = jsonObj[0].LevelId2;
                level3Id = jsonObj[0].LevelId3;
                level4Id = jsonObj[0].LevelId4;
                level5Id = jsonObj[0].LevelId5;
                level6Id = jsonObj[0].LevelId6;
            }
            if (glbVarLevelName == "Level3") {

                level3Id = jsonObj[0].LevelId3;
                level4Id = jsonObj[0].LevelId4;
                level5Id = jsonObj[0].LevelId5;
                level6Id = jsonObj[0].LevelId6;
            }
        }
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


    createReport(FILTER_DAILY, true);

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
        if (glbVarLevelName == "Level1") {
            HierarchyLevel1 = jsonObj[0].SettingValue;
            HierarchyLevel2 = jsonObj[1].SettingValue;
            HierarchyLevel3 = jsonObj[2].SettingValue;
            HierarchyLevel4 = jsonObj[3].SettingValue;
            HierarchyLevel5 = jsonObj[4].SettingValue;
            HierarchyLevel6 = jsonObj[5].SettingValue;
        }
        if (glbVarLevelName == "Level2") {
            HierarchyLevel2 = jsonObj[0].SettingValue;
            HierarchyLevel3 = jsonObj[1].SettingValue;
            HierarchyLevel4 = jsonObj[2].SettingValue;
            HierarchyLevel5 = jsonObj[3].SettingValue;
            HierarchyLevel6 = jsonObj[4].SettingValue;
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

        if (CurrentUserRole == 'admin') {

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
            FillDropDownList();
        }
        if (CurrentUserRole == 'marketingteam') {

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

            FillDropDownList();
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

            FillDropDownList();
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

    else if (glbVarLevelName == "Level3") {

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
        if (CurrentUserRole == 'marketingteam') {

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


        if (glbVarLevelName == "Level1") {

            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            value = '-1';

            if (CurrentUserRole == 'admin') {
                name = 'Select ' + HierarchyLevel1;
                $('#Label1').append(HierarchyLevel1 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel2 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label5').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label6').append(HierarchyLevel6 + " " + "TMs");


            }
            if (CurrentUserRole == 'rl1') {
                name = 'Select ' + HierarchyLevel2;
                $('#Label1').append(HierarchyLevel2 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label5').append(HierarchyLevel6 + " " + "TMs ");



            }
            if (CurrentUserRole == 'rl2') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel6 + " " + "TMs ");



            }
            if (CurrentUserRole == 'rl3') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel6 + " " + "TMs ");




            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel6 + " " + "TMs ");

            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "TMs ");

            }


            name = 'Select ' + $('#Label1').text();
            $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }
        else if (glbVarLevelName == "Level3") {

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
                $('#Label4').append(HierarchyLevel6 + " " + "TMs");



            }
            if (CurrentUserRole == 'marketingteam') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel6 + " " + "TMs");



            }
            if (CurrentUserRole == 'rl3') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel6 + " " + "TMs ");






            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel6 + " " + "TMs ");




            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "TMs");

            }


            name = 'Select ' + $('#Label1').text();
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
            cache: false,
            async: false
        });


    } else {

        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
        //    IsValidUser();
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
        name = 'Select ' + $('#Label2').text();
        $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
    //    IsValidUser();

}

function OnChangeddl2() {



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
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
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
        name = 'Select ' + $('#Label3').text();
        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
    //  IsValidUser();


}

function OnChangeddl3() {



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
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
    }


}
function onSuccessFillddl3(data, status) {
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);


        value = '-1';
        name = 'Select ' + $('#Label4').text();
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
    // IsValidUser();


}


function OnChangeddl4() {

    levelValue = $('#ddl4').val();
    myData = "{'employeeId':" + levelValue + "}";
    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            //url: "../Reports/datascreen.asmx/FillDropDownHierarchy",
            url: "../Reports/datascreen.asmx/GetEmployee",
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
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
    }


}
function onSuccessFillddl4(data, status) {

    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);


        value = '-1';

        name = 'Select ' + $('#Label5').text();
        $("#ddl5").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl5").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
}

function OnChangeddl5() {

    levelValue = $('#ddl5').val();
    myData = "{'employeeId':" + levelValue + "}";
    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "../Reports/datascreen.asmx/GetEmployee",
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
        document.getElementById('ddl6').innerHTML = "";
    }


}
function onSuccessFillddl5(data, status) {

    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);


        value = '-1';
        name = 'Select ' + $('#Label6').text();
        $("#ddl6").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl6").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
}

function OnChangeddl6() {

    levelValue = $('#ddl6').val();
    if (levelValue != -1) {

    }
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

}
function ajaxCompleted() {


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

function call(eventElement) {
    var target = eventElement.target;
    switch (target.mode) {
        case "month":
            var cal = $find("calendar1");
            startDateValidate = target.date;
            cal._visibleDate = target.date;
            cal.set_selectedDate(target.date);
            cal._switchMonth(target.date);
            cal._blur.post(true);
            cal.raiseDateSelectionChanged();
            break;
    }
}

function onCalendarShown2() {

    var cal = $find("calendar");
    cal._switchMode("months", true);

    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.addHandler(row.cells[j].firstChild, "click", call2);
            }
        }
    }
}

function onCalendarHidden2() {
    var cal = $find("calendar");

    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.removeHandler(row.cells[j].firstChild, "click", call2);
            }
        }
    }

}

function call2(eventElement) {
    var target = eventElement.target;
    switch (target.mode) {
        case "month":
            var cal = $find("calendar");
            EndDateValidate = target.date;
            cal._visibleDate = target.date;
            cal.set_selectedDate(target.date);
            cal._switchMonth(target.date);
            cal._blur.post(true);
            cal.raiseDateSelectionChanged();
            break;
    }
}



function FillCity() {

    myData = JSON.stringify({ 'ID': $('#ddlDistrict').val() || 0 });
    $.ajax({
        type: "POST",
        url: "Overview.asmx/GetAllCity",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {

            $('#ddlCity').empty();
            $("#ddlCity").append("<option value=''>Select City </option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $("#ddlCity").append("<option value='" + option.CityID + "'>" + option.City + "</option>");
                });
            }

        },

        error: onError,
        cache: false

    });
}

function OnChangeCity() {

    myData = JSON.stringify({ 'ID': $('#ddlCity').val() || 0 });
    $.ajax({
        type: "POST",
        url: "Overview.asmx/GetSalesDistributor",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (response, data, status) {

            $('#ddlDistributor').empty();
            $("#ddlDistributor").append("<option value=''>Select Distributor</option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) { 
                    $("#ddlDistributor").append("<option value='" + option.ID + "'>" + option.DistributorCode + " - " + option.DistributorName + "</option>");
                });
            }

        },

        error: onError,
        cache: false

    });
}






function OnChangeDistributor() {

    myData = JSON.stringify({ 'ID': $('#ddlDistributor').val() || 0 });
    $.ajax({
        type: "POST",
        url: "Overview.asmx/GetSalesBricks",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (response, data, status) {

            $('#ddlBrick').empty();
            $("#ddlBrick").append("<option value=''>Select Brick</option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) { 
                    $("#ddlBrick").append("<option value='" + option.brickID + "'>" + option.BrickCode + " - " + option.BrickName + "</option>");
                });
            }

        },

        error: onError,
        cache: false

    });
}




////// *******************************************>>>> DASHBOARD FUNCTIONS <<<<*********************************** ////////


function GrandTotalMonthlyRunRate() {


    var requestObject = {}

    requestObject["level1Id"] = l1;
    requestObject["level2Id"] = l2;
    requestObject["level3Id"] = l3;
    requestObject["level4Id"] = l4;
    requestObject["level5Id"] = l5;
    requestObject["level6Id"] = l6;
    requestObject["empid"] = EmployeeId;
    requestObject["StartingDate"] = l13;
    requestObject["EndingDate"] = l14;


    $.ajax({
        type: "POST",
        url: urlservice,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(requestObject),
        dataType: "json",
        success: null,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });


}

// GLOBAL DATE FORMAT FOR SQL FRIENDLY
const GLOBAL_DATE_FORMAT = "YYYY-MM-DD";


// FILTER TYPE CONSTANTS
const FILTER_DAILY = "DAILY", FILTER_WEEKLY = "WEEKLY", FILTER_MONTHLY = "MONTHLY", FILTER_CUSTOM = "CUSTOM";


//  DAILY CONSTANTS
const DAILY_TODAY = "DAILYTODAY", DAILY_YESTERDAY = "DAILYYESTERDAY";
const DAILY_PREVIOUS_DAY = "DAILYPREVIOUSDAY", DAILY_SAMEDAY_LASTWEEK = "DAILYSAMEDAYLASTWEEK",
      DAILY_SAMEDATE_LASTYEAR = "DAILYSAMEDATELASTYEAR", DAILY_SAMEDAY_OF_LASTYEAR = "DAILYSAMEDAYOFLASTYEAR";


// WEEKLY CONSTANTS
const WEEKLY_LAST_7DAYS = "WEEKLYLAST7DAYS", WEEKLY_THISWEEK = "WEEKLYTHISWEEK", WEEKLY_LASTWEEK = "WEEKLYLASTWEEK";
const WEEKLY_PREVIOUS_WEEK = "WEEKLYPREVIOUSWEEK", WEEKLY_FOUR_WEEKS_AGO = "WEEKLYFOURWEEKSAGO";


// MONTHLY CONSTANTS
const MONTHLY_LAST_30DAYS = "MONTHLYLAST30DAYS", MONTHLY_THISMONTH = "MONTHLYTHISMONTH", MONTHLY_LASTMONTH = "MONTHLYLASTMONTH";
const MONTHLY_PREVIOUS_PERIOD = "MONTHLYPREVIOUSPERIOD", MONTHLY_FOUR_WEEKS_AGO = "MONTHLYFOURWEEKSAGO",
      MONTHLY_PREVIOUS_YEARWEEK = "MONTHLYPREVIOUSYEARWEEK", MONTHLY_52WEEKS_AGO = "MONTHLY52WEEKSAGO";



var GlobalDateRange = {
    Range1: { Label: '', StartDate: '', EndDate: '' },
    Range2: { Label: '', StartDate: '', EndDate: '' }
}



function achieversTabStyler(element) {

    if (!$(element).hasClass('btn-info')) {

        $('.togglebtnAchieves').toggleClass('btn-info');

    }
    else {

        return false;
    }

}

function createReport(range, isAllChartsReload) {
    // RANGE CHEATSHEET : DAILY, WEEKLY, MONTHLY, CUSTOM
    var StartDate = {}, EndDate = {};

    switch (range) {

        case FILTER_DAILY:

            //console.log('DAILY');

            setDateValue($("input[name='rdCompareDailyStart']:checked").val());
            setDateValue($("input[name='rdCompareDailyEnd']:checked").val());

            setLabelsTextValue($("input[name='rdCompareDailyStart']:checked"), $("input[name='rdCompareDailyEnd']:checked"));

            console.log(GlobalDateRange);

            break;

        case FILTER_WEEKLY:


            //console.log('WEEKLY');

            setDateValue($("input[name='rdCompareWeeklyStart']:checked").val());
            setDateValue($("input[name='rdCompareWeeklyEnd']:checked").val());

            setLabelsTextValue($("input[name='rdCompareWeeklyStart']:checked"), $("input[name='rdCompareWeeklyEnd']:checked"));

            console.log(GlobalDateRange);

            break;

        case FILTER_MONTHLY:


            //console.log('MONTHLY');

            setDateValue($("input[name='rdCompareMonthlyStart']:checked").val());
            setDateValue($("input[name='rdCompareMonthlyEnd']:checked").val());

            setLabelsTextValue($("input[name='rdCompareMonthlyStart']:checked"), $("input[name='rdCompareMonthlyEnd']:checked"));
            break;

        case FILTER_CUSTOM:

            //console.log('CUSTOM');

            setDateValue($("input[name='rdCompareMonthlyStart']:checked").val());
            setDateValue($("input[name='rdCompareMonthlyEnd']:checked").val());

            setLabelsTextValue($("input[name='rdCompareMonthlyStart']:checked"), $("input[name='rdCompareMonthlyEnd']:checked"));

            break;
    }

    reloadGraphs(isAllChartsReload);

}



function setDateValue(_type) {




    switch (_type) {


        // ****************** → → →  SWITCH CASE FOR DAILY FILTERS --Arsal
        case DAILY_TODAY:

            GlobalDateRange.Range1.StartDate = moment().format(GLOBAL_DATE_FORMAT);
            GlobalDateRange.Range1.EndDate = moment().format(GLOBAL_DATE_FORMAT);

            break;

        case DAILY_YESTERDAY:

            GlobalDateRange.Range1.StartDate = moment().subtract(1, 'days').format(GLOBAL_DATE_FORMAT);
            GlobalDateRange.Range1.EndDate = moment().subtract(1, 'days').format(GLOBAL_DATE_FORMAT);

            break;

        case DAILY_PREVIOUS_DAY: // Get Selected Day Range For Start And Remove One Day. --Arsal

            GlobalDateRange.Range2.StartDate = moment(GlobalDateRange.Range1.StartDate).subtract(1, 'days').format(GLOBAL_DATE_FORMAT);
            GlobalDateRange.Range2.EndDate = moment(GlobalDateRange.Range1.StartDate).subtract(1, 'days').format(GLOBAL_DATE_FORMAT);

            break;

        case DAILY_SAMEDAY_LASTWEEK:

            GlobalDateRange.Range2.StartDate = moment(GlobalDateRange.Range1.StartDate).subtract(7, 'days').format(GLOBAL_DATE_FORMAT);
            GlobalDateRange.Range2.EndDate = moment(GlobalDateRange.Range1.StartDate).subtract(7, 'days').format(GLOBAL_DATE_FORMAT);

            break;

        case DAILY_SAMEDATE_LASTYEAR:

            GlobalDateRange.Range2.StartDate = moment(GlobalDateRange.Range1.StartDate).subtract(1, 'year').format(GLOBAL_DATE_FORMAT);
            GlobalDateRange.Range2.EndDate = moment(GlobalDateRange.Range1.StartDate).subtract(1, 'year').format(GLOBAL_DATE_FORMAT);

            break;



            // ****************** → → →  SWITCH CASE FOR WEEKLY FILTERS -- Arsal
        case WEEKLY_LAST_7DAYS:

            GlobalDateRange.Range1.StartDate = moment().subtract(6, 'days').format(GLOBAL_DATE_FORMAT);
            GlobalDateRange.Range1.EndDate = moment().format(GLOBAL_DATE_FORMAT);

            break;

        case WEEKLY_THISWEEK:

            GlobalDateRange.Range1.StartDate = moment().startOf('week').format(GLOBAL_DATE_FORMAT);
            GlobalDateRange.Range1.EndDate = moment().format(GLOBAL_DATE_FORMAT);

            break;

        case WEEKLY_LASTWEEK:

            GlobalDateRange.Range1.StartDate = moment().subtract(7, 'days').startOf('week').format(GLOBAL_DATE_FORMAT);
            GlobalDateRange.Range1.EndDate = moment().subtract(7, 'days').endOf('week').format(GLOBAL_DATE_FORMAT);
            break;

        case WEEKLY_PREVIOUS_WEEK:

            GlobalDateRange.Range2.StartDate = moment(GlobalDateRange.Range1.StartDate).subtract(1, 'week').format(GLOBAL_DATE_FORMAT);
            GlobalDateRange.Range2.EndDate = moment(GlobalDateRange.Range1.StartDate).subtract(1, 'week').add(7, 'days').format(GLOBAL_DATE_FORMAT);
            break;

        case WEEKLY_FOUR_WEEKS_AGO:

            GlobalDateRange.Range2.StartDate = moment(GlobalDateRange.Range1.StartDate).subtract(4, 'week').format(GLOBAL_DATE_FORMAT);
            GlobalDateRange.Range2.EndDate = moment(GlobalDateRange.Range1.StartDate).subtract(4, 'week').add(6, 'days').format(GLOBAL_DATE_FORMAT);
            break;

        case MONTHLY_LAST_30DAYS:
            GlobalDateRange.Range1.StartDate = moment().subtract(6, 'days').format(GLOBAL_DATE_FORMAT);
            GlobalDateRange.Range1.EndDate = moment().format(GLOBAL_DATE_FORMAT);
            break;

        case MONTHLY_THISMONTH:

            GlobalDateRange.Range1.StartDate = moment().startOf('month').format(GLOBAL_DATE_FORMAT);
            GlobalDateRange.Range1.EndDate = moment().format(GLOBAL_DATE_FORMAT);
            break;

        case MONTHLY_LASTMONTH:
            GlobalDateRange.Range1.StartDate = moment().startOf('month').subtract(1, 'month').format(GLOBAL_DATE_FORMAT);
            GlobalDateRange.Range1.EndDate = moment().endOf('month').subtract(1, 'month').format(GLOBAL_DATE_FORMAT);
            break;

        case MONTHLY_PREVIOUS_PERIOD:
            GlobalDateRange.Range2.StartDate = moment(GlobalDateRange.Range1.StartDate).subtract(1, 'month').format(GLOBAL_DATE_FORMAT);
            GlobalDateRange.Range2.EndDate = moment(GlobalDateRange.Range1.StartDate).add(1, 'month').add(1, 'month').format(GLOBAL_DATE_FORMAT);
            break;


        case MONTHLY_FOUR_WEEKS_AGO:

            GlobalDateRange.Range2.StartDate = moment(GlobalDateRange.Range1.StartDate).subtract(4, 'month').format(GLOBAL_DATE_FORMAT);
            GlobalDateRange.Range2.EndDate = moment(GlobalDateRange.Range1.StartDate).add(1, 'month').add(7, 'days').format(GLOBAL_DATE_FORMAT);
            break;

        case MONTHLY_PREVIOUS_YEARWEEK:

            break;

        case MONTHLY_52WEEKS_AGO:

            GlobalDateRange.Range2.StartDate = moment(GlobalDateRange.Range1.StartDate).subtract(52, 'week').format(GLOBAL_DATE_FORMAT);
            GlobalDateRange.Range2.EndDate = moment(GlobalDateRange.Range2.StartDate).add(1, 'month').add(7, 'days').format(GLOBAL_DATE_FORMAT);
    }
}

function setLabelsTextValue(Label1, Label2) {

    GlobalDateRange.Range1.Label = Label1.parent().text().trim();
    GlobalDateRange.Range2.Label = Label2.parent().text().trim();

}

function reloadGraphs(isAllChartsReload) {

    requestObject = {
        CityID: $('#ddlCity').val() || 0,
        DistributorID: $('#ddlDistributor').val() || 0,
        BrickID: $('#ddlBrick').val() || 0,
        EmployeeId: EmployeeId,
        GlobalDateRange: GlobalDateRange
    }

    var rootObject = {
        requestObject: requestObject
    };

    // CALLING GRAPHS TO RELOAD --Arsal;
    if (isAllChartsReload) {

        DashboardChartCardData(rootObject);
        DashboardChartSalesRunRate(rootObject);

    }

    DashboardChartGroupSales(rootObject);
    DashboardChartProductRangeValue(rootObject);
    DashboardChartProductRangeUnit(rootObject);
    DashboardChartProductSKUUnit(rootObject);
    DashboardChartProductSKUValue(rootObject);

}




////////////////// CHARTS FUNCTIONS,  ****************** /////////////// >>>>>>>>>>>>>>>>>> --Arsal;


function DashboardChartCardData(rootObject) {

    var divID = 'divChartMTDSales'; // 'divSalesCardBox';
    
    var url = "Overview.asmx/DashboardChartCardData";
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(rootObject),
        contentType: "application/json; charset=utf-8",
        success: function (response, status) {
            var seriesName1, seriesName2;

            try {

                response = JSON.parse(response.d);

                seriesName1 = response[1][0].LabelRange1;
                seriesName2 = response[1][0].LabelRange2;

                response[1][0].DayName[0];

            } catch (e) {
                response = [[{
                    "TeamName": "No Data Found",
                    "R1SaleValue": "0",
                    "R2SaleValue": "0"
                }], ''];
            }

           

            MapChartSummaryData(response[0][0]);
            

            var catagories = [];
            var R1SaleValue = [];
            var R2SaleValue = [];
            var R3SaleValue = [];

            $.each(response[1], function (i, tweet) {

                catagories.push(tweet.DayName);
                R1SaleValue.push(parseFloat(tweet.Sales));
                R2SaleValue.push(parseFloat(tweet.Overload));
                R3SaleValue.push(parseFloat(tweet.Target));

            });



            // Build the chart
            Highcharts.chart(divID, {
                chart: {
                    type: 'column',
                    backgroundColor: 'rgba(255, 255, 255, 0.0)'

                },
                colors: ['#08497F', '#FFF'],
                title: {
                    text: 'Sales Graph'
                },
                xAxis: {
                    categories: catagories,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' '
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {

                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Sales',
                    data: R1SaleValue
                }, {
                    type: 'spline',
                    name: 'Overload',
                    data: R2SaleValue
                }, {
                    type: 'spline',
                    name: 'Target',
                    data: R3SaleValue
                }]
            });







        },
        beforeSend: function () {
            $("#divCardTop").find(".overlay").css('display', 'block')

        },
        complete: function () {
            $("#divCardTop").find(".overlay").css('display', 'none')

        },
        error: function () {
            //$('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();

        },
        cache: false
    });



}


function DashboardChartGroupSales(rootObject) {

    var divID = 'divSalesGraph';


    var url = "Overview.asmx/DashboardChartGroupSales";
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(rootObject),
        contentType: "application/json; charset=utf-8",
        success: function (response, status) {
            var seriesName1, seriesName2;

            try {

                response = JSON.parse(response.d);

                seriesName1 = response[1][0].LabelRange1;
                seriesName2 = response[1][0].LabelRange2;

                response[0][0].TeamName[0];

            } catch (e) {
                response = [[{
                    "TeamName": "No Data Found",
                    "R1SaleValue": "0",
                    "R2SaleValue": "0"
                }], ''];
            }



            var catagories = [];
            var R1SaleValue = [];
            var R2SaleValue = [];

            $.each(response[0], function (i, tweet) {

                catagories.push(tweet.TeamName);
                R1SaleValue.push(parseFloat(tweet.R1Sales));
                R2SaleValue.push(parseFloat(tweet.R2Sales));

            });



            // Build the chart
            Highcharts.chart(divID, {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Sales Graph'
                },
                xAxis: {
                    categories: catagories,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' '
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {

                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: seriesName1,
                    data: R1SaleValue
                }, {
                    name: seriesName2,
                    data: R2SaleValue
                }]
            });







        },
        beforeSend: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();

        },
        complete: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();

        },
        error: function () {
            //$('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();

        },
        cache: false
    });



}


function DashboardChartProductRangeValue(rootObject) {

    var url = "Overview.asmx/DashboardChartProductRangeValue";
    var divID = 'divProductRangeValue';
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(rootObject),
        contentType: "application/json; charset=utf-8",
        success: function (response, status) {

            var seriesName1, seriesName2;

            try {

                response = JSON.parse(response.d);

                seriesName1 = response[1][0].LabelRange1;
                seriesName2 = response[1][0].LabelRange2;

                response[0][0].ProductName[0];

            } catch (e) {
                response = [[{
                    "ProductName": "No Data Found",
                    "R1SaleValue": "0",
                    "R2SaleValue": "0"
                }], ''];
            }



            var catagories = [];
            var R1SaleValue = [];
            var R2SaleValue = [];

            $.each(response[0], function (i, tweet) {

                catagories.push(tweet.ProductName);
                R1SaleValue.push(parseFloat(tweet.R1SaleValue));
                R2SaleValue.push(parseFloat(tweet.R2SaleValue));

            });



            // Build the chart
            Highcharts.chart(divID, {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Product Range Value'
                },
                xAxis: {
                    categories: catagories,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' '
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: seriesName1,
                    data: R1SaleValue
                }, {
                    name: seriesName2,
                    data: R2SaleValue
                }]
            });







        },
        beforeSend: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();

        },
        complete: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();

        },
        error: function () {
            //$('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();

        },
        cache: false
    });



}


function DashboardChartProductRangeUnit(rootObject) {

    var url = "Overview.asmx/DashboardChartProductRangeUnit";
    var divID = 'divProductRangeUnit';
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(rootObject),
        contentType: "application/json; charset=utf-8",
        success: function (response, status) {

            var seriesName1, seriesName2;

            try {

                response = JSON.parse(response.d);

                seriesName1 = response[1][0].LabelRange1;
                seriesName2 = response[1][0].LabelRange2;

                response[0][0].ProductName[0];

            } catch (e) {
                response = [[{
                    "ProductName": "No Data Found",
                    "R1SaleUnit": "0",
                    "R2SaleUnit": "0"
                }], ''];
            }



            
            var catagories = [];
            var R1SaleUnit = [];
            var R2SaleUnit = [];

            $.each(response[0], function (i, tweet) {

                catagories.push(tweet.ProductName);
                R1SaleUnit.push(parseFloat(tweet.R1SaleUnit));
                R2SaleUnit.push(parseFloat(tweet.R2SaleUnit));

            });






            // Build the chart

            Highcharts.chart(divID, {
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: 'Product Range Unit'
                },
                xAxis: [{
                    categories: catagories,
                    crosshair: true
                }],
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: 'K',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: seriesName1,
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }, { // Secondary yAxis
                    title: {
                        text: seriesName2,
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },

                    opposite: true
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 120,
                    verticalAlign: 'top',
                    y: 100,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
                },
                series: [{
                    name: seriesName1,
                    type: 'column',
                    yAxis: 1,
                    data: R1SaleUnit,
                    tooltip: {
                        valueSuffix: ' '
                    }

                }, {
                    name: seriesName2,
                    type: 'spline',
                    data: R2SaleUnit,
                    tooltip: {
                        valueSuffix: ''
                    }
                }]
            });

        },
        beforeSend: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();

        },
        complete: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();

        },
        error: function () {
            //$('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();

        },
        cache: false
    });



}


function DashboardChartProductSKUUnit(rootObject) {

    var url = "Overview.asmx/DashboardChartProductSKUUnit";
    var divID = 'divTopProductSKU';
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(rootObject),
        contentType: "application/json; charset=utf-8",
        success: function (response, status) {

            var seriesName1, seriesName2;

            try {

                response = JSON.parse(response.d);

                seriesName1 = response[1][0].LabelRange1;
                seriesName2 = response[1][0].LabelRange2;

                response[0][0].SKUName[0];

            } catch (e) {
                response = [[{
                    "SKUName": "No Data Found",
                    "R1SaleUnit": "0",
                    "R2SaleUnit": "0"
                }], ''];
            }

            var catagories = [];
            var R1SaleUnit = [];
            var R2SaleUnit = [];

            $.each(response[0], function (i, tweet) {

                catagories.push(tweet.SKUName);
                R1SaleUnit.push(parseFloat(tweet.R1SaleUnit));
                R2SaleUnit.push(parseFloat(tweet.R2SaleUnit));

            });



            // Build the chart
            Highcharts.chart(divID, {
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: 'Product Unit'
                },
                xAxis: [{
                    categories: catagories,
                    crosshair: true
                }],
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: 'K',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: seriesName1,
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }, { // Secondary yAxis
                    title: {
                        text: seriesName2,
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },

                    opposite: true
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 120,
                    verticalAlign: 'top',
                    y: 100,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
                },
                series: [{
                    name: seriesName1,
                    type: 'column',
                    yAxis: 1,
                    data: R1SaleUnit,
                    tooltip: {
                        valueSuffix: ' '
                    }

                }, {
                    name: seriesName2,
                    type: 'spline',
                    data: R2SaleUnit,
                    tooltip: {
                        valueSuffix: ''
                    }
                }]
            });

        },
        beforeSend: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();

        },
        complete: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();

        },
        error: function () {
            //$('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();

        },
        cache: false
    });
}


function DashboardChartProductSKUValue(rootObject) {

    var url = "Overview.asmx/DashboardChartProductSKUValue";
    var divID = 'divProductSKUUnit';
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(rootObject),
        contentType: "application/json; charset=utf-8",
        success: function (response, status) {

            var seriesName1, seriesName2;

            try {

                response = JSON.parse(response.d);

                seriesName1 = response[1][0].LabelRange1;
                seriesName2 = response[1][0].LabelRange2;

                response[0][0].SKUName[0];

            } catch (e) {
                response = [[{
                    "SKUName": "No Data Found",
                    "R1SaleValue": "0",
                    "R2SaleValue": "0"
                }], ''];
            }

            var catagories = [];
            var R1SaleValue = [];
            var R2SaleValue = [];

            $.each(response[0], function (i, tweet) {

                catagories.push(tweet.SKUName);
                R1SaleValue.push(parseFloat(tweet.R1SaleValue));
                R2SaleValue.push(parseFloat(tweet.R2SaleValue));

            });



            // Build the chart
            Highcharts.chart(divID, {
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: 'Product Values'
                },
                xAxis: [{
                    categories: catagories,
                    crosshair: true
                }],
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: 'K',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: seriesName1,
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }, { // Secondary yAxis
                    title: {
                        text: seriesName2,
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },

                    opposite: true
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 120,
                    verticalAlign: 'top',
                    y: 100,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
                },
                series: [{
                    name: seriesName1,
                    type: 'column',
                    yAxis: 1,
                    data: R1SaleValue,
                    tooltip: {
                        valueSuffix: ' '
                    }

                }, {
                    name: seriesName2,
                    type: 'spline',
                    data: R2SaleValue,
                    tooltip: {
                        valueSuffix: ''
                    }
                }]
            });

        },
        beforeSend: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();
        },
        complete: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
        },
        error: function () {
            //$('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();
        },
        cache: false
    });
}


function DashboardChartSalesRunRate(rootObject) {


    var url = "Overview.asmx/DashboardChartSalesRunRate";
    var divID  = 'divChartMTDSalesRunRate';
    var divID2 = 'divChartGrandTotalMTDRunRate';
    var divID3 = 'divChartGroupExpetedSalesTotal';

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(rootObject),
        contentType: "application/json; charset=utf-8",
        success: function (response, status) {

            //var seriesName1, seriesName2;

            try {

                response = JSON.parse(response.d);
                response[0][0].TeamName[0];

            } catch (e) {
                response = [[{
                    "Sales": "No Data Found",
                    "R1SaleValue": "0",
                    "R2SaleValue": "0"
                }], ''];
            }

            var catagories = [];

            var MTDSale = [];
            var PerDaySale = [];
            var ExpLanding = [];
            var Target = [];
            var Difference = [];
            var PerDayOverload = [];
            var chartGroupSalesExpected = [];
            $.each(response[0], function (i, tweet) {

                catagories.push(tweet.TeamName);

                MTDSale.push(parseFloat(tweet.MTDSales));
                PerDaySale.push(parseFloat(tweet.PerDaySale));
                ExpLanding.push(parseFloat(tweet.ExpLanding));
                Target.push(parseFloat(tweet.Target));
                Difference.push(parseFloat(tweet.Difference));
                PerDayOverload.push(parseFloat(tweet.PerDayOverload));

                chartGroupSalesExpected.push({ name: tweet.TeamName, y: parseFloat(tweet.ExpLanding) });
            });


            // Detailed  Chart With Teams
            Highcharts.chart(divID, {
                title: {
                    text: 'MTD Sales Run Rate'
                },
                xAxis: {
                    categories: catagories
                },
                labels: {
                    items: [{
                        html: '',
                        style: {
                            left: '50px',
                            top: '18px',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                        }
                    }]
                },
                legend: {
                    align: 'center',
                    layout: 'horizontal',
                    verticalAlign: 'bottom',
                    floating: false,
                    backgroundColor: '#FFFFFF'
                },
                series: [{
                    type: 'column',
                    name: 'MTD Sales',
                    data: MTDSale,
                    color: '#2196f3'
                }, {
                    type: 'column',
                    name: 'Difference',
                    data: Difference,
                    color: '#1565c0'
                }, {
                    type: 'column',
                    name: 'Per Day Sales',
                    data: PerDaySale,
                    color: '#388e3c'
                }, {
                    type: 'column',
                    name: 'Per Day Overload',
                    data: PerDayOverload,
                    color: '#ef5350'
                }, {
                    type: 'column',
                    name: 'Expected Landing',
                    data: ExpLanding,
                    color: '#90a4ae'
                }, {
                    type: 'spline',
                    name: 'Target',
                    data: Target,
                    color: '#ffb300',
                    //marker: {
                    //    lineWidth: 2,
                    //    lineColor: Highcharts.getOptions().colors[3],
                    //    fillColor: 'white'
                    //}
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 800
                        },
                        chartOptions: {
                            legend: {
                                enabled: true
                            }
                        }
                    }]
                }
            });


            // Chart With Grand Total Run Rate
            Highcharts.chart(divID2, {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Grand Total Monthly Run Rate'
                },
                xAxis: {
                    categories: ['MTDSale', 'PerDaySale', 'ExpLanding', 'Target', 'PerDayOverload'],
                    title: {
                        text: ''
                    }
                },

                yAxis: {
                    min: 0,
                    title: {
                        text: '',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ''
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                series: [{
                    data: [$.SumArray(MTDSale), $.SumArray(PerDaySale), $.SumArray(ExpLanding), $.SumArray(Target), $.SumArray(PerDayOverload)]
                }]
            });





            Highcharts.chart(divID3, {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Group Expected Sales Total'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false,
                            // format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                            distance: -50,
                            filter: {
                                property: 'percentage',
                                operator: '>',
                                value: 4
                            }
                        }
                    }
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'middle',
                    layout: 'vertical'
                },
                series: [{
                    name: 'Expected Sale',
                    data: chartGroupSalesExpected,
                    showInLegend: true
                }]
            });






        },
        beforeSend: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();
            $('#' + divID2).closest(":has(.overlay)").find(".overlay:first").fadeIn();
            $('#' + divID3).closest(":has(.overlay)").find(".overlay:first").fadeIn();
        },
        complete: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
            $('#' + divID2).closest(":has(.overlay)").find(".overlay:first").fadeOut();
            $('#' + divID3).closest(":has(.overlay)").find(".overlay:first").fadeOut();
        },
        error: function () {
            //$('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();
        },
        cache: false
    });



}


function MapChartSummaryData(resutCardJSON) {



    var MonthlyTopCity = resutCardJSON.MonthlyTopCity;
    var MonthlyTopDistributor = resutCardJSON.MonthlyTopDistributor;
    var MonthlyTopProduct = resutCardJSON.MonthlyTopProduct;
    var MonthlyTopTeam = resutCardJSON.MonthlyTopTeam;
     
    var SalesAvgTargetToday = $.ParseValidateNumber(resutCardJSON.SalesAvgTargetToday);
    var SalesDayBeforeYesterday = $.ParseValidateNumber(resutCardJSON.SalesDayBeforeYesterday);
    var SalesMonthlyTargetAchieved = $.ParseValidateNumber(resutCardJSON.SalesMonthlyTargetAchieved);
    var SalesMonthlyTargetTotal = $.ParseValidateNumber(resutCardJSON.SalesMonthlyTargetTotal);
    var SalesYesterday = $.ParseValidateNumber(resutCardJSON.SalesYesterday);
    var salesToday = $.ParseValidateNumber(resutCardJSON.salesToday);

    var TodayTopCity = resutCardJSON.TodayTopCity;
    var TodayTopDistributor = resutCardJSON.TodayTopDistributor;
    var TodayTopProduct = resutCardJSON.TodayTopProduct;
    var TodayTopTeam = resutCardJSON.TodayTopTeam;


    var salesNow, SalesBefore;

    // Sales Today Will Be 0 If Data For Today Is Not Uploaded Yet! --Arsal.
    if (salesToday > 0) {
        salesNow = salesToday;
        SalesBefore = SalesYesterday;
    }
    else {
        salesNow = SalesYesterday;
        SalesBefore = SalesDayBeforeYesterday;
    }

    if (salesNow < SalesBefore) {

        $('#iconUpdDown').removeAttr("class").attr('class', 'fa fa-sort-desc').parent().css('color', 'red');
    }
    else {
        $('#iconUpdDown').removeAttr("class").attr('class', 'fa fa-sort-asc').parent().css('color', 'green');
    }


    $('#lblSalesToday').text($.CurrencyFormat(salesNow));
    $('#lblSalesBefore').text($.CurrencyFormat(SalesBefore));




    var salesMainProgressPercentage = Math.max(salesNow, SalesBefore, SalesAvgTargetToday) * 1.3; // Create 100% From Max --Arsal

    var salesPercentToday = salesNow * 100 / salesMainProgressPercentage;
    var salesPercentYesyt = SalesBefore * 100 / salesMainProgressPercentage;
    var salesPercentTarget= SalesAvgTargetToday * 100 / salesMainProgressPercentage;


    $('#divProgressSalesToday').css('width', salesPercentToday.toFixed(0) + '%');
    $('#divProgressSalesYesterday').css('left', salesPercentYesyt.toFixed(0) + '%');
    $('#divProgressSalesTargetAvg').css('left', salesPercentTarget.toFixed(0) + '%');


    var salesTargetAchievedPercent = SalesMonthlyTargetAchieved * 100 / SalesMonthlyTargetTotal;
    $('#divProgressSalesMTDTarget').css('width', salesTargetAchievedPercent.toFixed(0) + '%');
    

    $('#lblTargetAchieved').text($.CurrencyFormat(SalesMonthlyTargetAchieved));
    $('#lblTargetTotal').text($.CurrencyFormat(SalesMonthlyTargetTotal));

    $('#lblTargetAchievedPercent').text(salesTargetAchievedPercent.toFixed(0));

    
    $('#lblDailyTopTeam').text(TodayTopTeam);
    $('#lblDailyTopProduct').text(TodayTopProduct);
    $('#lblDailyTopCity').text(TodayTopCity);
    $('#lblDailyTopDistributor').text(TodayTopDistributor);

    $('#lblMonthlyTopTeam').text(MonthlyTopTeam);
    $('#lblMonthlyTopProduct').text(MonthlyTopProduct);
    $('#lblMonthlyTopCity').text(MonthlyTopCity);
    $('#lblMonthlyTopDistributor').text(MonthlyTopDistributor);



}







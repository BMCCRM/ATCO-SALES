// GLOBAL DATE FORMAT FOR SQL FRIENDLY
const GLOBAL_DATE_FORMAT = "YYYY-MM-DD", GLOBAL_DATE_FORMAT_FOR_PICKER = "yyyy-mm-dd";

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



// Currently Showing Tab ID --Arsal;
var VisibleDivID = '#divTabMainScreen';

var CurrentUserHierarchy = {
    Level1: '0',
    Level2: '0',
    Level3: '0',
    Level4: '0',
    Level5: '0',
    Level6: '0'

};


xhrChartsPool = [];

var CurrentFilterRange = FILTER_WEEKLY;

var rootObject = {};

var GlobalDateRange = {
    Range1: { Label: '', StartDate: '', EndDate: '' },
    Range2: { Label: '', StartDate: '', EndDate: '' }
}

var simConfig = {

    btnStyle: 'checkbox',
    height: '200px',
    titleIcon: "square-o",
    uncheckedClass: "btn-default",
    checkedClass: "btn-info valSelected",
    selectAllBtn: false,
    selectAllText: 'Select/Unselect All',
    ifToggled: function () {

        // Used This For Reset Selected Item Color --Arsal
        if (($(this).data('value') || '0') == '0') {

            $(this).parent().find('li').removeClass('valSelected btn-info').addClass('btn-default').find('i')
                .removeClass('fa-check-square-o').addClass('fa-square-o');

            $(this).addClass('valSelected btn-info').removeClass('btn-default').find('i').addClass('fa-check-square-o').removeClass('fa-square-o');
        }
        else {
            $(this).parent().find('li[data-value][data-value=0]').removeClass('valSelected btn-info').addClass('btn-default').find('i')
                .removeClass('fa-check-square-o').addClass('fa-square-o')
        }

        switch ($(this).parent().parent().attr('id')) {

            case 'divSelectCities':

                OnChangeCity();
                //GetEmployees();
                break;

            case 'divSelectDistributor':

                OnChangeDistributor();
                //GetEmployees();
                break;

            case 'divSelectBrick':

                OnChangeBrick(); // ~ ~ BREEZE ~ ~
                break;

            case 'divSelectTeams':

                OnChangeTeam();
                break;

            case 'divSelectProducts':

                OnChangeProducts();
                break;


                // Hierachy Select
            case 'divSelectLevel1':

                FillLevel2();
                break;
            case 'divSelectLevel2':

                FillLevel3();
                break;
            case 'divSelectLevel3':

                FillLevel4();
                break;
            case 'divSelectLevel4':

                FillLevel5();
                break;
            case 'divSelectLevel5':

                FillLevel6();
                break;
            case 'divSelectLevel6':

                FillLevel6Brick();

                // ~ ~ BREEZE ~ ~
                break;

            case 'divSelectLevel6Brick':

                FillLevel6BrickPharmacy();

                break;



        }


        //return; // Revoked For Testing --Arsal
        createReport(CurrentFilterRange, true);
    }
}

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
    InitiateUtilityFunctions();

    $('.bottomMainNav > li').click(function () {

        VisibleDivID = $(this).find('a').attr('href')
        createReport(CurrentFilterRange, true);

    });
    
    //$('#isUploaded').change(function () {
    //    createReport(CurrentFilterRange, true);
    //});


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


    $.SalesValueFormat = function (value) {
        value = parseFloat(value);
        return value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");;
    }


    $.GetListsSelectedValue = function (divListID) {

        var selector = " > ul > li.valSelected";

        return ($(divListID + selector).first().data('value') || 0);
    }

    $.GetListsSelectedArrayString = function (divListID) {

        var selector = " > ul > li.valSelected";

        values = [];

        $.each(($(divListID + selector)), function (i, tweet) {
            values.push($(tweet).data('value'));
        });

        return values.toString() || '0';
    }

    $.HideAndResetSelect = function (divListID, hideOnly) {


        $('#' + divListID + ' li').removeClass('valSelected').removeClass('btn-info').addClass('btn-block btn-default').find('i')
            .removeClass('fa-check-square-o').addClass('fa-square-o');

        // Check If Want To Hide Parent Or Not. --Arsal
        if (hideOnly == undefined) {
            $('#' + divListID).parent().hide();
        }

    }


}

function createSelectableList(element, array, _id, _value) {

    element = "#" + element;
    $(element).empty().hide();

    var elementbody = $('<ul />');

    $('<li />').attr("data-value", '0').text('All').appendTo(elementbody);


    $.each(array, function (i, option) {
        $('<li />').attr("data-value", option[_id]).text(option[_value]).appendTo(elementbody);
    });

    $(element).append(elementbody);

    $(function () {//Code That Needs To Be Executed When DOM Is Ready, After Adding Element --Arsal
        $(element + ' > ul').simsCheckbox(simConfig);
        $(element).show();
    });

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


    HierarchySetting();
    createReport(CurrentFilterRange, true);
    // GetEditableDataLoginId();

    FillCity();
    GetAllTeams();

    //GetEmployees();

}

function HierarchySetting() {

    CurrentUserHierarchy.Level1 = $('#L1').val();
    CurrentUserHierarchy.Level2 = $('#L2').val();
    CurrentUserHierarchy.Level3 = $('#L3').val();
    CurrentUserHierarchy.Level4 = $('#L4').val();
    CurrentUserHierarchy.Level5 = $('#L5').val();
    CurrentUserHierarchy.Level6 = $('#L6').val();

    if (CurrentUserHierarchy.Level1 == "0") {

        FillLevel1();
        return;
    }

    if (CurrentUserHierarchy.Level2 == "0") {

        $('#divSelectLevel1').parent().addClass("display-none");
        $('#divSelectLevel2').parent().show();
        FillLevel2();
        return;
    }

    if (CurrentUserHierarchy.Level3 == "0") {

        $('#divSelectLevel1').parent().addClass("display-none");
        $('#divSelectLevel2').parent().addClass("display-none");
        $('#divSelectLevel3').parent().show();
        FillLevel3();
        return;
    }

    if (CurrentUserHierarchy.Level4 == "0") {

        $('#divSelectLevel1').parent().addClass("display-none");
        $('#divSelectLevel2').parent().addClass("display-none");
        $('#divSelectLevel3').parent().addClass("display-none");
        $('#divSelectLevel4').parent().show();
        FillLevel4();
        return;
    }

    if (CurrentUserHierarchy.Level5 == "0") {

        $('#divSelectLevel1').parent().addClass("display-none");
        $('#divSelectLevel2').parent().addClass("display-none");
        $('#divSelectLevel3').parent().addClass("display-none");
        $('#divSelectLevel4').parent().addClass("display-none");
        $('#divSelectLevel5').parent().show();
        FillLevel5();
        return;
    }

    if (CurrentUserHierarchy.Level6 == "0") {

        $('#divSelectLevel1').parent().addClass("display-none");
        $('#divSelectLevel2').parent().addClass("display-none");
        $('#divSelectLevel3').parent().addClass("display-none");
        $('#divSelectLevel4').parent().addClass("display-none");
        $('#divSelectLevel5').parent().addClass("display-none");
        $('#divSelectLevel6').parent().show();
        FillLevel6();
        return;
    }

    // Akhir Kaar Rl6 Tak Sab Ko Hide Hona Para.... --Arsal;
    $('#divSelectLevel1').parent().addClass("display-none");
    $('#divSelectLevel2').parent().addClass("display-none");
    $('#divSelectLevel3').parent().addClass("display-none");
    $('#divSelectLevel4').parent().addClass("display-none");
    $('#divSelectLevel5').parent().addClass("display-none");
    $('#divSelectLevel6').parent().addClass("display-none");
    FillLevel6Brick();


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

    IsValidUser();
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

    //msg = 'Error occoured';

    console.log(request);
    console.log(status);
    console.log(error);

    //    $.fn.jQueryMsg({
    //        msg: msg,
    //        msgClass: 'error',
    //        fx: 'slide',
    //        speed: 500
    //    });
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

    myData = JSON.stringify({ 'ID': EmployeeId });

    var divID = 'divSelectCities';

    $.ajax({
        type: "POST",
        url: "Overview.asmx/GetAllCity",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () {
            $('#' + divID).parent().show();
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").show();
        },
        complete: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
        },
        success: function (response, data, status) {

            if (response.d != 'No') {
                createSelectableList('divSelectCities', $.parseJSON(response.d), 'CityID', 'City');
            }
        },
        error: onError,
        cache: false
    });
}



function GetEmployees() {


    divID = 'divSelectEmployees';


    var requestObject = {

        CityID: $.GetListsSelectedArrayString('#divSelectCities'),
        DistributorID: $.GetListsSelectedArrayString('#divSelectDistributor'),
        BrickID: $.GetListsSelectedArrayString('#divSelectBrick'),
        EmployeeID: EmployeeId
    }


    $.ajax({
        type: "POST",
        url: "Overview.asmx/GetEmployees",
        data: JSON.stringify(requestObject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $('#' + divID).parent().show();
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").show();
        },
        complete: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
        },
        success: function (response, data, status) {

            if (response.d != 'No') {

                createSelectableList(divID, $.parseJSON(response.d), 'EmployeeId', 'EmployeeName');
            }
        },
        cache: false,
        async: false
    });
}

function FillLevel1() {


    divID = 'divSelectLevel1';

    var requestObject = {
        LevelType: 'Level1',
        LevelID: '0'
    }

    $.ajax({
        type: "POST",
        url: "Overview.asmx/GetLevelByID",
        data: JSON.stringify(requestObject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $('#' + divID).parent().show();
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").show();
        },
        complete: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
        },
        success: function (response, data, status) {

            if (response.d != 'No') {

                createSelectableList(divID, $.parseJSON(response.d), 'Level1LevelId', 'EmployeeName');
            }
        },
        cache: false,
        async: false
    });
    //}
    FillLevel2();
}

function FillLevel2() {


    divID = 'divSelectLevel2';



    var value = $('#divSelectLevel1 > ul > li.valSelected').first().data('value') || "0";
    value = CurrentUserHierarchy.Level1 == "0" ? value : CurrentUserHierarchy.Level1;

    myData = JSON.stringify({ 'ID': value });

    if (value == '0') {

        $('#' + divID).empty().parent().fadeOut();

    }


    else {
        var requestObject = {
            LevelType: 'Level2',
            LevelID: CurrentUserHierarchy.Level1 == "0" ? $.GetListsSelectedArrayString('#divSelectLevel1') : CurrentUserHierarchy.Level1
        }

        $.ajax({
            type: "POST",
            url: "Overview.asmx/GetLevelByID",
            data: JSON.stringify(requestObject),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('#' + divID).parent().show();
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").show();
            },
            complete: function () {
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
            },
            success: function (response, data, status) {

                if (response.d != 'No') {

                    createSelectableList(divID, $.parseJSON(response.d), 'Level2LevelId', 'EmployeeName');
                }
            },
            cache: false,
            async: false
        });
    }
    FillLevel3();
}

function FillLevel3() {


    divID = 'divSelectLevel3';



    var value = $('#divSelectLevel2 > ul > li.valSelected').first().data('value') || "0";
    value = CurrentUserHierarchy.Level2 == "0" ? value : CurrentUserHierarchy.Level2;

    myData = JSON.stringify({ 'ID': value });

    if (value == '0') {

        $('#' + divID).empty().parent().fadeOut();

    }

    else {

        var requestObject = {
            LevelType: 'Level3',
            LevelID: CurrentUserHierarchy.Level2 == "0" ? $.GetListsSelectedArrayString('#divSelectLevel2') : CurrentUserHierarchy.Level2
        }

        $.ajax({
            type: "POST",
            url: "Overview.asmx/GetLevelByID",
            data: JSON.stringify(requestObject),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('#' + divID).parent().show();
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").show();
            },
            complete: function () {
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
            },
            success: function (response, data, status) {

                if (response.d != 'No') {

                    createSelectableList(divID, $.parseJSON(response.d), 'Level3LevelId', 'EmployeeName');
                }
            },
            cache: false,
            async: false
        });
    }
    FillLevel4();
}

function FillLevel4() {


    divID = 'divSelectLevel4';



    var value = $('#divSelectLevel3 > ul > li.valSelected').first().data('value') || "0";
    value = CurrentUserHierarchy.Level3 == "0" ? value : CurrentUserHierarchy.Level3;
    myData = JSON.stringify({ 'ID': value });

    if (value == '0') {

        $('#' + divID).empty().parent().fadeOut();
        ;
    }

    else {
        var requestObject = {
            LevelType: 'Level4',
            LevelID: CurrentUserHierarchy.Level3 == "0" ? $.GetListsSelectedArrayString('#divSelectLevel3') : CurrentUserHierarchy.Level3
        }

        $.ajax({
            type: "POST",
            url: "Overview.asmx/GetLevelByID",
            data: JSON.stringify(requestObject),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('#' + divID).parent().show();
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").show();
            },
            complete: function () {
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
            },
            success: function (response, data, status) {

                if (response.d != 'No') {

                    createSelectableList(divID, $.parseJSON(response.d), 'Level4LevelId', 'EmployeeName');
                }
            },
            cache: false,
            async: false
        });

    }
    FillLevel5();

}

function FillLevel5() {


    divID = 'divSelectLevel5';


    var value = $('#divSelectLevel4 > ul > li.valSelected').first().data('value') || "0";
    value = CurrentUserHierarchy.Level4 == "0" ? value : CurrentUserHierarchy.Level4;
    myData = JSON.stringify({ 'ID': value });

    if (value == '0') {

        $('#' + divID).empty().parent().fadeOut();

    }

    else {

        var requestObject = {
            LevelType: 'Level5',
            LevelID: CurrentUserHierarchy.Level4 == "0" ? $.GetListsSelectedArrayString('#divSelectLevel4') : CurrentUserHierarchy.Level4
        }

        $.ajax({
            type: "POST",
            url: "Overview.asmx/GetLevelByID",
            data: JSON.stringify(requestObject),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('#' + divID).parent().show();
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").show();
            },
            complete: function () {
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
            },
            success: function (response, data, status) {

                if (response.d != 'No') {

                    createSelectableList(divID, $.parseJSON(response.d), 'Level5LevelId', 'EmployeeName');
                }
            },
            cache: false,
            async: false
        });

    }
    FillLevel6();

}

function FillLevel6() {


    divID = 'divSelectLevel6';
    var value = $('#divSelectLevel5 > ul > li.valSelected').first().data('value') || "0";
    value = CurrentUserHierarchy.Level5 == "0" ? value : CurrentUserHierarchy.Level5;
    myData = JSON.stringify({ 'ID': value });

    if (value == '0') {

        $('#' + divID).empty().parent().fadeOut();
        return;
    }

    var requestObject = {
        LevelType: 'Level6',
        LevelID: CurrentUserHierarchy.Level5 == "0" ? $.GetListsSelectedArrayString('#divSelectLevel5') : CurrentUserHierarchy.Level5
    }

    $.ajax({
        type: "POST",
        url: "Overview.asmx/GetLevelByID",
        data: JSON.stringify(requestObject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $('#' + divID).parent().show();
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").show();
        },
        complete: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
        },
        success: function (response, data, status) {

            if (response.d != 'No') {

                createSelectableList(divID, $.parseJSON(response.d), 'Level6LevelId', 'EmployeeName');
            }
        },
        cache: false,
        async: false
    });
}

function FillLevel6Brick() {



    $.HideAndResetSelect('divSelectCities', true);
    $.HideAndResetSelect('divSelectDistributor');
    $.HideAndResetSelect('divSelectBrick');
    $.HideAndResetSelect('divSelectPharmacy');

    divID = 'divSelectLevel6Brick';


    var value = $('#divSelectLevel6 > ul > li.valSelected').first().data('value') || "0";
    value = CurrentUserHierarchy.Level6 == "0" ? value : CurrentUserHierarchy.Level6;
    myData = JSON.stringify({ 'ID': value });

    if (value == '0') {

        $('#' + divID).empty().parent().fadeOut();
        return;
    }


    var requestObject = {

        LevelID: $.GetListsSelectedArrayString('#divSelectLevel6')
    }

    $.ajax({
        type: "POST",
        url: "Overview.asmx/GetLevel6BrickByID",
        data: JSON.stringify(requestObject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $('#' + divID).parent().show();
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").show();
        },
        complete: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
        },
        success: function (response, data, status) {

            if (response.d != 'No') {

                createSelectableList(divID, $.parseJSON(response.d), 'BrickId', 'BrickName');
            }
        },
        cache: false,
        async: false
    });




}

function FillLevel6BrickPharmacy() {



    $.HideAndResetSelect('divSelectCities', true);
    $.HideAndResetSelect('divSelectDistributor');
    $.HideAndResetSelect('divSelectBrick');
    $.HideAndResetSelect('divSelectPharmacy');

    divID = 'divSelectLevel6Pharmacy';


    var value = $('#divSelectLevel6Brick > ul > li.valSelected').first().data('value') || "0";

    myData = JSON.stringify({ 'ID': value });

    if (value == '0') {

        $('#' + divID).empty().parent().fadeOut();
        return;
    }


    var requestObject = {

        BrickID: $.GetListsSelectedArrayString('#divSelectLevel6Brick')
    }

    $.ajax({
        type: "POST",
        url: "Overview.asmx/GetLevel6PharmacyByID",
        data: JSON.stringify(requestObject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $('#' + divID).parent().show();
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").show();
        },
        complete: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
        },
        success: function (response, data, status) {

            if (response.d != 'No') {

                createSelectableList(divID, $.parseJSON(response.d), 'PharmacyId', 'PharmacyName');
            }
        },
        cache: false,
        async: false
    });




}

function GetAllTeams() {


    divID = 'divSelectTeams';

    var requestObject = {
        EmployeeID: EmployeeId
    }

    $.ajax({
        type: "POST",
        url: "Overview.asmx/GetAllTeams",
        data: JSON.stringify(requestObject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $('#' + divID).parent().show();
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").show();
        },
        complete: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
        },
        success: function (response, data, status) {

            if (response.d != 'No') {

                createSelectableList(divID, $.parseJSON(response.d), 'TeamId', 'TeamName');
            }
        },
        cache: false,
        async: false
    });
}

function OnChangeCity() {



    if (CurrentUserRole == 'admin') {

        $.HideAndResetSelect('divSelectLevel4', true);
        $.HideAndResetSelect('divSelectLevel5');
        $.HideAndResetSelect('divSelectLevel6');
        $.HideAndResetSelect('divSelectLevel6Brick');
        $.HideAndResetSelect('divSelectLevel6Pharmacy');
    }
    else {
        $.HideAndResetSelect('divSelectLevel4', true);
        $.HideAndResetSelect('divSelectLevel5', true);
        $.HideAndResetSelect('divSelectLevel6', true);
        $.HideAndResetSelect('divSelectLevel6Brick', true);
        $.HideAndResetSelect('divSelectLevel6Pharmacy', true);



    }


    divID = 'divSelectDistributor';
    var value = $.GetListsSelectedArrayString('#divSelectCities');


    myData = JSON.stringify({ 'ID': value, 'EmployeeId': EmployeeId });

    if (value == '0') {

        $('#' + divID).empty().parent().fadeOut();

    }
    else {


        $.ajax({
            type: "POST",
            url: "Overview.asmx/GetSalesDistributor",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: myData,
            async: false,
            beforeSend: function () {
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();
                $('#' + divID).parent().show();
            },
            complete: function () {
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
            },
            success: function (response, data, status) {

                if (response.d != 'No') {

                    createSelectableList(divID, $.parseJSON(response.d), 'ID', 'DistributorName');
                }

            },
            error: onError,
            cache: false

        });
    }
    OnChangeDistributor();
}

function OnChangeDistributor() {

    divID = 'divSelectBrick';
    var value = $.GetListsSelectedArrayString('#divSelectDistributor');//$('#divSelectDistributor > ul > li.valSelected').first().data('value') || "0";

    myData = JSON.stringify({ 'ID': value });

    if (value == '0') {

        $('#' + divID).empty().parent().fadeOut();

    }
    else {

        $.ajax({
            type: "POST",
            url: "Overview.asmx/GetSalesBricks",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: myData,
            async: false,
            beforeSend: function () {
                $('#' + divID).parent().show();
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();
            },
            complete: function () {
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
            },
            success: function (response, data, status) {

                if (response.d != 'No') {

                    createSelectableList(divID, $.parseJSON(response.d), 'brickID', 'BrickName');
                }
            },
            error: onError,
            cache: false

        });
    }
    OnChangeBrick();
}

function OnChangeBrick() {

    divID = 'divSelectPharmacy';
    var value = $.GetListsSelectedArrayString('#divSelectBrick');//$('#divSelectDistributor > ul > li.valSelected').first().data('value') || "0";

    myData = JSON.stringify({ 'ID': value });

    if (value == '0') {

        $('#' + divID).empty().parent().fadeOut();

    }
    else {

        $.ajax({
            type: "POST",
            url: "Overview.asmx/GetPharmaciesByBrickIDs",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: myData,
            async: false,
            beforeSend: function () {
                $('#' + divID).parent().show();
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();
            },
            complete: function () {
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
            },
            success: function (response, data, status) {

                if (response.d != 'No') {

                    createSelectableList(divID, $.parseJSON(response.d), 'ID', 'PharmacyName');
                }
            },
            error: onError,
            cache: false

        });
    }
    // OnChangePharmacy(); // Maybe Can Be, Called..
}

function OnChangeTeam() {

    var divID = 'divSelectProducts';

    var value = $('#divSelectTeams > ul > li.valSelected').first().data('value') || "0";

    myData = JSON.stringify({ 'ID': value });

    if (value == '0') {

        $('#' + divID).empty().parent().fadeOut();

    }

    else {



        myData = JSON.stringify({ TeamID: $.GetListsSelectedArrayString('#divSelectTeams') });

        $.ajax({
            type: "POST",
            url: "Overview.asmx/GetAllProductsByTeamID",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $('#' + divID).parent().show();
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").show();
            },
            complete: function () {
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
            },
            success: function (response, data, status) {

                if (response.d != 'No') {
                    createSelectableList(divID, $.parseJSON(response.d), 'ProductId', 'ProductName');
                }
            },
            error: onError,
            cache: false
        });
    }

    OnChangeProducts();
}

function OnChangeProducts() {


    var divID = 'divSelectProductSKUs';

    var value = $('#divSelectProducts > ul > li.valSelected').first().data('value') || "0";

    myData = JSON.stringify({ 'ID': value });

    if (value == '0') {

        $('#' + divID).empty().parent().fadeOut();

    }

    else {



        myData = JSON.stringify({ ProductID: $.GetListsSelectedArrayString('#divSelectProducts') });

        $.ajax({
            type: "POST",
            url: "Overview.asmx/GetAllSkusByProductIDs",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $('#' + divID).parent().show();
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").show();
            },
            complete: function () {
                $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();
            },
            success: function (response, data, status) {

                if (response.d != 'No') {
                    createSelectableList(divID, $.parseJSON(response.d), 'SkuId', 'SkuName');
                }
            },
            error: onError,
            cache: false
        });
    }


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


function achieversTabStyler(element) {

    if (!$(element).hasClass('btn-info')) $('.togglebtnAchieves').toggleClass('btn-info');

    else return false;


}

function createReport(range, isAllChartsReload) {


    $.each(xhrChartsPool, function (idx, jqXHR) { // Clearing All Charts Ajax Running Requests --Arsal
        jqXHR.abort();
    });
    xhrChartsPool = [];

    CurrentFilterRange = range; // RANGE CHEATSHEET : DAILY, WEEKLY, MONTHLY, CUSTOM

    var StartDate = {}, EndDate = {};

    switch (range) {

        case FILTER_DAILY:

            setDateValue($("input[name='rdCompareDailyStart']:checked").val());
            setDateValue($("input[name='rdCompareDailyEnd']:checked").val());

            setLabelsTextValue($("input[name='rdCompareDailyStart']:checked"), $("input[name='rdCompareDailyEnd']:checked"));

            break;

        case FILTER_WEEKLY:

            setDateValue($("input[name='rdCompareWeeklyStart']:checked").val());
            setDateValue($("input[name='rdCompareWeeklyEnd']:checked").val());

            setLabelsTextValue($("input[name='rdCompareWeeklyStart']:checked"), $("input[name='rdCompareWeeklyEnd']:checked"));

            break;

        case FILTER_MONTHLY:

            setDateValue($("input[name='rdCompareMonthlyStart']:checked").val());
            setDateValue($("input[name='rdCompareMonthlyEnd']:checked").val());

            setLabelsTextValue($("input[name='rdCompareMonthlyStart']:checked"), $("input[name='rdCompareMonthlyEnd']:checked"));
            break;

        case FILTER_CUSTOM:

            setDateValue(FILTER_CUSTOM);
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


            // ****************** → → →  SWITCH CASE FOR MONTHLY FILTERS -- Arsal
        case MONTHLY_LAST_30DAYS:
            GlobalDateRange.Range1.StartDate = moment().subtract(30, 'days').format(GLOBAL_DATE_FORMAT);
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
            GlobalDateRange.Range2.EndDate = moment(GlobalDateRange.Range1.StartDate).subtract(1, 'days').format(GLOBAL_DATE_FORMAT);
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


            // ****************** → → →  CUSTOM FILTERS ARE DIRECTLY CALCULATED HERE -- Arsal
        case FILTER_CUSTOM:

            GlobalDateRange.Range1.StartDate = $('#datePickRangeFirstStart').val();
            GlobalDateRange.Range1.EndDate = $('#datePickRangeFirstEnd').val();

            GlobalDateRange.Range2.StartDate = $('#datePickRangeSecondStart').val();
            GlobalDateRange.Range2.EndDate = $('#datePickRangeSecondEnd').val();

            GlobalDateRange.Range1.Label = 'First Custom Range';
            GlobalDateRange.Range2.Label = 'Second Custom Range';
    }
}

function setLabelsTextValue(Label1, Label2) {

    GlobalDateRange.Range1.Label = Label1.parent().text().trim();
    GlobalDateRange.Range2.Label = Label2.parent().text().trim();

}

function generateDataFilterObject() {

    var requestObject = {


        HierarchyLevel1: (CurrentUserHierarchy.Level1 == '0' ? $.GetListsSelectedArrayString('#divSelectLevel1') : CurrentUserHierarchy.Level1),
        HierarchyLevel2: (CurrentUserHierarchy.Level2 == '0' ? $.GetListsSelectedArrayString('#divSelectLevel2') : CurrentUserHierarchy.Level2),
        HierarchyLevel3: (CurrentUserHierarchy.Level3 == '0' ? $.GetListsSelectedArrayString('#divSelectLevel3') : CurrentUserHierarchy.Level3),
        HierarchyLevel4: (CurrentUserHierarchy.Level4 == '0' ? $.GetListsSelectedArrayString('#divSelectLevel4') : CurrentUserHierarchy.Level4),
        HierarchyLevel5: (CurrentUserHierarchy.Level5 == '0' ? $.GetListsSelectedArrayString('#divSelectLevel5') : CurrentUserHierarchy.Level5),
        HierarchyLevel6: (CurrentUserHierarchy.Level6 == '0' ? $.GetListsSelectedArrayString('#divSelectLevel6') : CurrentUserHierarchy.Level6),

        TeamID: $.GetListsSelectedArrayString('#divSelectTeams'),
        ProductID: $.GetListsSelectedArrayString('#divSelectProducts'),
        ProductSKUID: $.GetListsSelectedArrayString('#divSelectProductSKUs'),
        CityID: $.GetListsSelectedArrayString('#divSelectCities'),
        DistributorID: $.GetListsSelectedArrayString('#divSelectDistributor'),
        BrickID: (function () {

            var bid = $.GetListsSelectedArrayString('#divSelectBrick');
            if (bid == "0") {
                bid = $.GetListsSelectedArrayString('#divSelectLevel6Brick');
            }
            return bid;
        })(),

        PharmacyID: (function () {

            var pid = $.GetListsSelectedArrayString('#divSelectPharmacy');
            if (pid == "0") {
                pid = $.GetListsSelectedArrayString('#divSelectLevel6Pharmacy');
            }
            return pid;
        })(),

        GlobalDateRange: GlobalDateRange//,
        // isUploaded: $('#isUploaded').prop('checked')

    }


    return requestObject;
}

function reloadGraphs(isAllChartsReload, loadType) {

    rootObject = {
        requestObject: generateDataFilterObject()
    };


    //DashboardRegionWiseSalesData(rootObject);

    //return;

    //$('.bottomMainNav > li.active > a').attr('href');

    var visibleDiv = $('#divChartsTabsContainer > .tab-pane.active').attr('ID');
    console.log(visibleDiv);

    switch (VisibleDivID) {

        case '#divTabMainScreen':
            DashboardChartCardData(rootObject);

            break;

        case '#divTabMTDSalesScreen':
            DashboardChartSalesRunRate(rootObject);
            break;

        case '#divTabDistrictWise':
            DashboardChartDistrictSalesByTeamAndProduct(rootObject);

            break;

        case "#divTabBrandWiseData":
            DashboardChartProductRangeValue(rootObject);
            DashboardChartProductRangeUnit(rootObject);
            DashboardChartProductSKUUnit(rootObject);
            DashboardChartProductSKUValue(rootObject);


            break;


        case '#divTabSalesWiseData':
            DashboardChartGroupSales(rootObject);
            break;

        case '#divTabDistributorWise':
            DashboardChartDistributorSales(rootObject);
            break;

        case '#divTabYTDMainScreen':
            //  DashboardChartYTDData(rootObject);
            break;





        case '#divTabChartsSummmary':
            break;


    }



    //DashboardChartGroupSales(rootObject);
    //DashboardChartProductRangeValue(rootObject);
    //DashboardChartProductRangeUnit(rootObject);
    //DashboardChartProductSKUUnit(rootObject);
    //DashboardChartProductSKUValue(rootObject);
    //DashboardChartDistrictSalesByTeamAndProduct(rootObject);

    //// CALLING GRAPHS TO RELOAD --Arsal;
    //if (isAllChartsReload) {

    //    rootObject.requestObject.GlobalDateRange.Range1.StartDate = $('#MTDInputDate > input').val();

    //    // EXCEPTIONAL GRAPH FOR RELOAD --Arsal;
    //    DashboardChartCardData(rootObject);
    //    DashboardChartSalesRunRate(rootObject);
    //}




    //if (loadType == 'MTDCharts') {


    //    DashboardChartCardData(rootObject);
    //    DashboardChartSalesRunRate(rootObject);

    //    return;

    //}


}



////////////////// CHARTS FUNCTIONS,  ****************** /////////////// >>>>>>>>>>>>>>>>>> --Arsal;
function DashboardChartCardData(rootObject) {

    var divID = 'divChartMTDSales'; // 'divSalesCardBox';
    rootObject.requestObject.GlobalDateRange.Range1.StartDate = $('#MTDInputDate > input').val();
    var url = "Overview.asmx/DashboardChartCardDataUnits";
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
                    zoomType: 'xy',
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
        beforeSend: function (jqXHR, settings) {
            xhrChartsPool.push(jqXHR);
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


    var url = "Overview.asmx/DashboardChartGroupSalesUnits";
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
                    type: 'column',
                    zoomType: 'xy'
                },
                title: {
                    text: 'Sales Comparison'
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
        beforeSend: function (jqXHR, settings) {
            xhrChartsPool.push(jqXHR);
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


function DashboardChartDistributorSales(rootObject) {

    var divID = 'divChartDistributorWiseSales';


    var url = "Overview.asmx/DashboardChartDistributorSales";
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

                response[0][0].DistributorName[0];

            } catch (e) {
                response = [[{
                    "DistributorName": "No Data Found",
                    "R1SaleValue": "0",
                    "R2SaleValue": "0"
                }], ''];
            }



            var catagories = [];
            var R1SaleValue = [];
            var R2SaleValue = [];

            var r1 = {}, r2 = {};



            $.each(response[0], function (i, tweet) {

                catagories.push(tweet.DistributorName);            // [a,b,c,d]
                R1SaleValue.push(parseFloat(tweet.R1Sales));    // [4,2,3,1]
                R2SaleValue.push(parseFloat(tweet.R2Sales));    // [5,6,7,8]


                r1[tweet.DistributorName] = tweet.R1Sales;
                r2[tweet.DistributorName] = tweet.R2Sales;
            });

            //var sortedR1 = [];
            //for (var item in r1) {
            //    sortedR1.push([item, r1[item]]);
            //}

            //sortedR1.sort(function (a, b) {
            //    return a[1] - b[1];
            //});



            //var sortedR2 = [];
            //for (var item in r2) {
            //    sortedR2.push([item, r2[item]]);
            //}

            //sortedR2.sort(function (a, b) {
            //    return a[1] - b[1];
            //});

            //var r1btm5 = sortedR1.slice(0, 5);
            //var r1top5 = sortedR1.slice(sortedR1.length - 5, sortedR1.length);

            //var r2btm5 = sortedR2.slice(0, 5);
            //var r2top5 = sortedR2.slice(sortedR2.length - 5, sortedR2.length);


            // Build the chart
            Highcharts.chart(divID, {
                chart: {
                    type: 'column',
                    zoomType: 'xy'
                },
                title: {
                    text: 'Distributor Wise Sales Graph'
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
        beforeSend: function (jqXHR, settings) {
            xhrChartsPool.push(jqXHR);
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
                    type: 'bar',
                    zoomType: 'xy'
                },
                title: {
                    text: 'Brand Value'
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
        beforeSend: function (jqXHR, settings) {
            xhrChartsPool.push(jqXHR);
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
                    text: 'Brand Unit'
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
        beforeSend: function (jqXHR, settings) {
            xhrChartsPool.push(jqXHR);
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
                    text: 'SKU Unit'
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
        beforeSend: function (jqXHR, settings) {
            xhrChartsPool.push(jqXHR);
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
                    text: 'SKU Values'
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
        beforeSend: function (jqXHR, settings) {
            xhrChartsPool.push(jqXHR);
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

    rootObject.requestObject.GlobalDateRange.Range1.StartDate = $('#MTDInputDate > input').val();
    var url = "Overview.asmx/DashboardChartSalesRunRateUnits";
    var divID = 'divChartMTDSalesRunRate';
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

                MTDSale.push((parseFloat(tweet.MTDSales)));
                PerDaySale.push((parseFloat(tweet.PerDaySale)));
                ExpLanding.push((parseFloat(tweet.ExpLanding)));
                Target.push((parseFloat(tweet.Target)));
                Difference.push((parseFloat(tweet.Difference)));
                PerDayOverload.push(parseFloat(tweet.PerDayOverload));

                chartGroupSalesExpected.push({ name: tweet.TeamName, y: (parseFloat(tweet.ExpLanding)) });
            });


            // Detailed  Chart With Teams
            Highcharts.chart(divID, {
                //    tooltip: {
                //        //   pointFormat: "Value: {point.y}"

                //        pointFormat: function () {

                //            return $.SalesValueFormat(this.y)
                //        }


                //},



                title: {
                    text: 'MTD Snapshot'
                },
                chart: {
                    zoomType: 'xy'
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
            //Highcharts.chart(divID2, {
            //    chart: {
            //        type: 'bar'
            //    },
            //    title: {
            //        text: 'Total MTD'
            //    },
            //    xAxis: {
            //        categories: ['MTDSale', 'PerDaySale', 'Exp-Landing', 'Target', 'PerDayOverload'],
            //        title: {
            //            text: ''
            //        }
            //    },

            //    yAxis: {
            //        min: 0,
            //        title: {
            //            text: '',
            //            align: 'high'
            //        },
            //        labels: {
            //            overflow: 'justify'
            //        }
            //    },
            //    tooltip: {
            //        valueSuffix: ''
            //    },
            //    plotOptions: {
            //        bar: {
            //            dataLabels: {
            //                enabled: true
            //            }
            //        }
            //    },
            //    series: [{
            //        data: [$.SumArray(MTDSale), $.SumArray(PerDaySale), $.SumArray(ExpLanding), $.SumArray(Target), $.SumArray(PerDayOverload)]
            //    }]
            //});



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
        beforeSend: function (jqXHR, settings) {
            xhrChartsPool.push(jqXHR);
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


function DashboardChartDistrictSalesByTeamAndProduct(rootObject) {

    var divID = 'divChartDistrictWiseSales';
    var divIDtopr1 = 'divChartTopSalesDistrictsFirst';
    var divIDtopr2 = 'divChartTopSalesDistrictsSecond';
    var divIDbtmr1 = 'divChartBottomSalesDistrictsFirst';
    var divIDbtmr2 = 'divChartBottomSalesDistrictsSecond';

    var url = "Overview.asmx/DashboardChartDistrictSalesByTeamAndProductUnits";
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

                response[0][0].DistrictName[0];

            } catch (e) {
                response = [[{
                    "DistrictName": "No Data Found",
                    "R1SaleValue": "0",
                    "R2SaleValue": "0"
                }], ''];
            }



            var catagories = [];
            var R1SaleValue = [];
            var R2SaleValue = [];

            var r1 = {}, r2 = {};



            $.each(response[0], function (i, tweet) {

                catagories.push(tweet.DistrictName);            // [a,b,c,d]
                R1SaleValue.push(parseFloat(tweet.R1Sales));    // [4,2,3,1]
                R2SaleValue.push(parseFloat(tweet.R2Sales));    // [5,6,7,8]


                r1[tweet.DistrictName] = tweet.R1Sales;
                r2[tweet.DistrictName] = tweet.R2Sales;
            });

            var sortedR1 = [];
            for (var item in r1) {
                sortedR1.push([item, r1[item]]);
            }

            sortedR1.sort(function (a, b) {
                return a[1] - b[1];
            });



            var sortedR2 = [];
            for (var item in r2) {
                sortedR2.push([item, r2[item]]);
            }

            sortedR2.sort(function (a, b) {
                return a[1] - b[1];
            });

            var r1btm5 = sortedR1.slice(0, 5);
            var r1top5 = sortedR1.slice(sortedR1.length - 5, sortedR1.length);

            var r2btm5 = sortedR2.slice(0, 5);
            var r2top5 = sortedR2.slice(sortedR2.length - 5, sortedR2.length);


            // Build the chart
            Highcharts.chart(divID, {
                chart: {
                    type: 'column',
                    zoomType: 'xy'
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


            var r1top5data = [];
            var r1top5name = [];

            $.each(r1top5, function (i, tweet) {
                r1top5name.push(tweet[0])
                r1top5data.push(parseFloat(tweet[1]))
            })

            var r1btm5data = [];
            var r1btm5name = [];
            $.each(r1btm5, function (i, tweet) {
                r1btm5name.push(tweet[0])
                r1btm5data.push(parseFloat(tweet[1]))
            })



            var r2top5data = [];
            var r2top5name = [];
            $.each(r2top5, function (i, tweet) {
                r2top5name.push(tweet[0])
                r2top5data.push(parseFloat(tweet[1]))
            })

            var r2btm5data = [];
            var r2btm5name = [];
            $.each(r2btm5, function (i, tweet) {
                r2btm5name.push(tweet[0])
                r2btm5data.push(parseFloat(tweet[1]))
            })


            //  Build the chart
            Highcharts.chart(divIDtopr1, {
                chart: {
                    zoomType: 'xy',
                    type: 'column'
                },
                title: {
                    text: 'Top 5 (First Range)'
                },
                xAxis: {
                    categories: r1top5name,
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
                    name: 'Top 5 (First Range)',
                    data: r1top5data
                }]
            });


            Highcharts.chart(divIDbtmr1, {
                chart: {
                    zoomType: 'xy',
                    type: 'column'
                },
                title: {
                    text: 'Bottom 5 (First Range)'
                },
                xAxis: {
                    categories: r1btm5name,
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
                    name: 'Bottom 5 (First Range)',
                    data: r1btm5data
                }]
            });


            //  Build the chart
            Highcharts.chart(divIDtopr2, {
                chart: {
                    zoomType: 'xy',
                    type: 'column'
                },
                title: {
                    text: 'Top 5 (Second Range)'
                },
                xAxis: {
                    categories: r2top5name,
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
                    name: 'Top 5 (Second Range)',
                    data: r2top5data
                }]
            });


            Highcharts.chart(divIDbtmr2, {
                chart: {
                    zoomType: 'xy',
                    type: 'column'
                },
                title: {
                    text: 'Bottom 5 (Second Range)'
                },
                xAxis: {
                    categories: r2btm5name,
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
                    name: 'Bottom 5 (Second Range)',
                    data: r2btm5data
                }]
            });

        },
        beforeSend: function (jqXHR, settings) {
            xhrChartsPool.push(jqXHR);
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();

            $('#' + divIDtopr1).closest(":has(.overlay)").find(".overlay:first").fadeIn();
            $('#' + divIDtopr2).closest(":has(.overlay)").find(".overlay:first").fadeIn();
            $('#' + divIDbtmr1).closest(":has(.overlay)").find(".overlay:first").fadeIn();
            $('#' + divIDbtmr2).closest(":has(.overlay)").find(".overlay:first").fadeIn();

        },
        complete: function () {
            $('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeOut();

            $('#' + divIDtopr1).closest(":has(.overlay)").find(".overlay:first").fadeOut();
            $('#' + divIDtopr2).closest(":has(.overlay)").find(".overlay:first").fadeOut();
            $('#' + divIDbtmr1).closest(":has(.overlay)").find(".overlay:first").fadeOut();
            $('#' + divIDbtmr2).closest(":has(.overlay)").find(".overlay:first").fadeOut();


        },
        error: function () {
            //$('#' + divID).closest(":has(.overlay)").find(".overlay:first").fadeIn();

        },
        cache: false
    });

}


function DashboardChartDistrictTopSales(rootObject) {

    var divIDFirst = 'divChartTopSalesDistrictsFirst', divIDSecond = 'divChartTopSalesDistrictsSecond';


    var url = "Overview.asmx/DashboardChartDistrictTopSales";
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
                    "DistrictName": "No Data Found",
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
            Highcharts.chart(divIDFirst, {
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
        beforeSend: function (jqXHR, settings) {
            xhrChartsPool.push(jqXHR);
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


function DashboardChartDistrictBottomSales(rootObject) {

    var divIDFirst = 'divChartBottomSalesDistrictsFirst', divIDSecond = 'divChartBottomSalesDistrictsSecond';


    var url = "Overview.asmx/DashboardChartDistrictTopSales";
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
                    "DistrictName": "No Data Found",
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
            Highcharts.chart(divIDFirst, {
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
        beforeSend: function (jqXHR, settings) {
            xhrChartsPool.push(jqXHR);
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


function DashboardRegionWiseSalesData(rootObject) {

    var url = "Overview.asmx/DashboardRegionWiseSalesData";
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

                generateRegionDistrictSalesTable(response[0]);

                response[0][0].ProductName[0];

            } catch (e) {
                response = [[{
                    "ProductName": "No Data Found",
                    "R1SaleUnit": "0",
                    "R2SaleUnit": "0"
                }], ''];
            }

        },
        beforeSend: function (jqXHR, settings) {
            xhrChartsPool.push(jqXHR);
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
    if (salesToday != 0) {
        salesNow = salesToday;
        SalesBefore = SalesYesterday;
    }
    else {

        salesNow = SalesYesterday;
        SalesBefore = SalesDayBeforeYesterday;
    }

        salesNow = salesToday;
        SalesBefore = SalesYesterday;





    if (salesNow < SalesBefore) {

        $('#iconUpdDown').removeAttr("class").attr('class', 'fa fa-sort-desc').parent().css('color', 'red');
    }
    else {
        $('#iconUpdDown').removeAttr("class").attr('class', 'fa fa-sort-asc').parent().css('color', 'green');
    }


    $('#lblSalesToday').text($.SalesValueFormat(salesNow));
    $('#lblSalesBefore').text($.SalesValueFormat(SalesBefore));




    var salesMainProgressPercentage = Math.max(salesNow, SalesBefore, SalesAvgTargetToday) * 1.3; // Create 100% From Max --Arsal

    var salesPercentToday = salesNow * 100 / salesMainProgressPercentage;
    var salesPercentYesyt = SalesBefore * 100 / salesMainProgressPercentage;
    var salesPercentTarget = SalesAvgTargetToday * 100 / salesMainProgressPercentage;


    $('#divProgressSalesToday').css('width', salesPercentToday.toFixed(0) + '%');
    $('#divProgressSalesYesterday').css('left', salesPercentYesyt.toFixed(0) + '%');
    $('#divProgressSalesTargetAvg').css('left', salesPercentTarget.toFixed(0) + '%');


    var salesTargetAchievedPercent = SalesMonthlyTargetAchieved * 100 / SalesMonthlyTargetTotal;

    $('#divProgressSalesMTDTarget').css('width', salesTargetAchievedPercent.toFixed(0) + '%');



    $('#lblTargetAchieved').text($.SalesValueFormat(SalesMonthlyTargetAchieved));
    $('#lblTargetTotal').text($.SalesValueFormat(SalesMonthlyTargetTotal));

    $('#lblTargetAchievedPercent').text(!isFinite(salesTargetAchievedPercent) || isNaN(salesTargetAchievedPercent) ? "0" : salesTargetAchievedPercent.toFixed(0));


    $('#lblDailyTopTeam').text(TodayTopTeam);
    $('#lblDailyTopProduct').text(TodayTopProduct);
    $('#lblDailyTopCity').text(TodayTopCity);
    $('#lblDailyTopDistributor').text(TodayTopDistributor);

    $('#lblMonthlyTopTeam').text(MonthlyTopTeam);
    $('#lblMonthlyTopProduct').text(MonthlyTopProduct);
    $('#lblMonthlyTopCity').text(MonthlyTopCity);
    $('#lblMonthlyTopDistributor').text(MonthlyTopDistributor);



}


function generateRegionDistrictSalesTable(tableData) {


    console.log(tableData);
    chartRegionalSalesSummary();
    var PieChartData = [];

    var _html = '';



    if (tableData.length == 0) {

        $('#percentCollector').empty();
        $('#tblRegionSalesDataTable').empty().html('<tr> <td colspan="10" > No Data Found </td> </tr>');
        return;

    }

    var totalSales = 0, totalTarget = 0;

    $('#percentCollector').empty().append('<h3 style="margin: -10px;" class="text-center">Region Wise Sales Target Achieved Percentage</h3>');

    $.each(tableData, function (i, tweet) {

        _html += '<tr>';
        _html += '<td>' + (i + 1) + '</td>';

        _html += '<td>' + tweet.RegionName + '</td>';
        _html += '<td>' + tweet.Sales + '</td>';
        _html += '<td>' + tweet.TargetValue + '</td>';
        _html += '<td>' + tweet.AchievedPercent + '</td>';
        _html += '<td>' + tweet.AvgSales + '</td>';
        _html += '<td>' + tweet.AvgTarget + '</td>';
        _html += '<td>' + tweet.GOLM + '</td>';
        _html += '<td>' + tweet.TargetReamaining + '</td>';

        _html += '</tr>';

        circlifulMaker(tweet.RegionName, tweet.AchievedPercent);

        PieChartData.push({
            name: tweet.RegionName,
            y: parseInt(tweet.AvgSales)
        });


        totalSales += parseFloat(tweet.Sales);
        totalTarget += parseFloat(tweet.TargetValue);

    });

    $(".circleMeUp").each(function () {
        $(this).circliful();
    });

    chartGaugeSalesToTarget(((totalSales * 100) / totalTarget), 'chartUnknown2');
    chartPieRegionSalesContribution(PieChartData);
    $('#tblRegionSalesDataTable').empty().html(_html);
}


function circlifulMaker(text, percent) {

    $('#percentCollector').append(
    '<div style="width:200px; display:inline-block">' +
    '<div class="circleMeUp" data-percent="' + Math.round(parseFloat(percent)) + '"></div>' +
        '<h3 class="text-center text-info">' + text + '</h3>' +
    '</div>');
}


function chartRegionalSalesSummary() {


    Highcharts.chart('chartRegionalSalesSummary', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
            }
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'John',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Jane',
            data: [2, 2, 3, 2, 1]
        }, {
            name: 'Joe',
            data: [3, 4, 4, 2, 5]
        }]
    });



}


function chartPieRegionSalesContribution(PieChartData) {

    Highcharts.chart('chartPieRegionSalesContribution', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Region Wise Contribution'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
            name: 'Region Sales Contribution',
            colorByPoint: true,
            data: PieChartData
        }]
    });




}


function chartGaugeSalesToTarget(value, id) {

    $('#' + id).empty();

    new JustGage({
        id: id,
        value: value,
        min: 0,
        max: 100,
        symbol: '%',
        pointer: true,
        gaugeWidthScale: 0.6,
        relativeGaugeSize: true,
        customSectors: [{
            color: '#00ff00',
            lo: 50,
            hi: 100
        }, {
            color: '#ff0000',
            lo: 0,
            hi: 50
        }],
        counter: true
    });

    $('#' + id).prepend('<h4 class="text-center"> Sales To Target Comparison </h3>');

}






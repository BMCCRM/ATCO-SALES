$(document).ready(function () {
    $('#content-table').hide();
    $('#teamdiv').hide();
    $('#brickdiv').hide();
    $('#distributordiv').hide();
    GetEmployeesLevel3();

    HideHierarchy();
    $('#ddlDist').change(distChange);
   
    $('#ddlselectdist').change(distselectChange);

    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });

});


function distselectChange() {
    if ($('#ddlselectdist').val() == '-1') {

        $("#ddlbri").empty();
        $("#ddlbri").append("<option value='-1'>Select Distributors First</option>");

        return false;
    }

    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/GetBricksByDistributors",
        contentType: "application/json; charset=utf-8",
        data: "{'distributorCode':'" + $('#ddlselectdist').val() + "'}",
        success: onSuccessGetBricksByDistributors,
        beforeSend: startingAjax,
        error: onError,
        cache: false,
        asyn: false
    });
}
function distChange() {
    if ($('#ddlDist').val() == '-1') {

        $("#ddlBricks").empty();
        $("#ddlBricks").append("<option value='-1'>Select Distributors First</option>");

        return false;
    }

    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/GetBricksByDistributors",
        contentType: "application/json; charset=utf-8",
        data: "{'distributorCode':'" + $('#ddlDist').val() + "'}",
        success: onSuccessGetBricksByDistributors,
        beforeSend: startingAjax,
        error: onError,
        cache: false,
        asyn: false
    });
}
var distributer = 0;
var brick = 0;
var team = 0;
function GetTeams(empid) {

    $.ajax({
        type: "POST",
        url: "datascreen.asmx/GetTeams",
        contentType: "application/json; charset=utf-8",
        data: "{'empid':'" + empid + "'}",
        success: onSuccessGetTeams,
        error: onError,
        cache: false,
        asyn: false
    });
}
function onSuccessGetTeams(data, status) {
    document.getElementById('ddlteam').innerHTML = "";

    if (data.d != "") {

        jsonObj = $.parseJSON(data.d);
        $('#ddlteam').append('<select data-placeholder="Select Teams ..." class="chosen-select" style="width:100%" id="ddlT" multiple ></select>');
        value = '-1';
        name = 'Select Teams';
        $("#ddlT").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddlT").append("<option value='" + jsonObj[i].id + "'>" + jsonObj[i].TeamName + "</option>");
        });
        MakeDropDown();
    }
    else {
        $('#ddlbricks').append('<select data-placeholder="No Teams Are Available ..." class="chosen-select" style="width:100%" id="ddlbri" multiple ></select>');
        MakeDropDown();
    }

}

function GetEmployeesLevel3() {
    var TeamID = $("#ddlT").val();

    $.ajax({
        type: "POST",
        url: "../Reports/NewDashboard.asmx/FillEmployeesLevel3",
        contentType: "application/json; charset=utf-8",
        data: "{'TeamID':'" + TeamID + "'}",
        success: onSuccessGetEmployeesLevel3,
        error: onError,
        cache: false,
        async: false
    });
}
function onSuccessGetEmployeesLevel3(data, status) {
    document.getElementById('ddl1p').innerHTML = "";

    if (data.d != "") {
        jsonObj = $.parseJSON(data.d);
        value = '-1';
        name = 'Select Employee...';
        $("#ddl4p").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4p").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
}

function GetEmployeesLevel4() {
    var TeamID = $("#ddlT").val();

    $.ajax({
        type: "POST",
        url: "../Reports/NewDashboard.asmx/FillEmployeesLevel4",
        contentType: "application/json; charset=utf-8",
        data: "{'TeamID':'" + TeamID + "'}",
        success: onSuccessGetEmployeesLevel4,
        error: onError,
        cache: false,
        async: false
    });
}
function onSuccessGetEmployeesLevel4(data, status) {
    document.getElementById('ddl1p').innerHTML = "";

    if (data.d != "") {

        jsonObj = $.parseJSON(data.d);

        value = '-1';
        name = 'Select Employee...';
        $("#ddl1p").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl1p").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
}

function GetEmployeesLevel5() {
    var TeamID = $("#ddlT").val();

    $.ajax({
        type: "POST",
        url: "../Reports/NewDashboard.asmx/FillEmployeesLevel5",
        contentType: "application/json; charset=utf-8",
        data: "{'TeamID':'" + TeamID + "'}",
        success: onSuccessGetEmployeesLevel5,
        error: onError,
        cache: false,
        async: false
    });
}
function onSuccessGetEmployeesLevel5(data, status) {
    document.getElementById('ddl2p').innerHTML = "";

    if (data.d != "") {

        jsonObj = $.parseJSON(data.d);

        value = '-1';
        name = 'Select Employee...';
        $("#ddl2p").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl2p").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
}

function GetEmployeesLevel6() {
    var TeamID = $("#ddlT").val();

    $.ajax({
        type: "POST",
        url: "../Reports/NewDashboard.asmx/FillEmployeesLevel6",
        contentType: "application/json; charset=utf-8",
        data: "{'TeamID':'" + TeamID + "'}",
        success: onSuccessGetEmployeesLevel6,
        error: onError,
        cache: false,
        async: false
    });
}
function onSuccessGetEmployeesLevel6(data, status) {
    document.getElementById('ddl3p').innerHTML = "";

    if (data.d != "") {

        jsonObj = $.parseJSON(data.d);

        value = '-1';
        name = 'Select Employee...';
        $("#ddl3p").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl3p").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
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

function OnChangeddlp3() {
    $("#ddl2p").val('-1');
    $("#ddl3p").val('-1');
    $("#ddl1p").val('-1');

    var empid = $("#ddl4p").val();
    if (empid != "-1") {
        if ($('#ddlT').val() > -1) {
            var TeamID = $('#ddlT').val();

        }
        else {

        }
    }
    else {
        if ($('#ddlT').val() > -1) {
            var TeamID = $('#ddlT').val();

        }
        else {

        }
    }
}
function OnChangeddlp4() {
    $("#ddl2p").val('-1');
    $("#ddl3p").val('-1');
    var empid = $("#ddl1p").val();
    if (empid != "-1") {
        if ($('#ddlT').val() > -1) {
            var TeamID = $('#ddlT').val();

        }
        else {

        }
    }
    else {
        if ($('#ddlT').val() > -1) {
            var TeamID = $('#ddlT').val();

        }
        else {

        }
    }
}
function OnChangeddlp5() {
    $("#ddl1p").val('-1');
    $("#ddl3p").val('-1');
    var empid = $("#ddl2p").val();
    if (empid != "-1") {
        if ($('#ddlT').val() > -1) {
            var TeamID = $('#ddlT').val();

        }
        else {


        }
    }
    else {
        if ($('#ddlT').val() > -1) {
            var TeamID = $('#ddlT').val();

        }
        else {

        }
    }
}
function OnChangeddlp6() {
    $("#ddl1p").val('-1');
    $("#ddl2p").val('-1');
    var empid = $("#ddl3p").val();
    if (empid != "-1") {
        if ($('#ddlT').val() > -1) {
            var TeamID = $('#ddlT').val();

        }
        else {

        }
    }
    else {
        if ($('#ddlT').val() > -1) {
            var TeamID = $('#ddlT').val();

        }
        else {

        }
    }

}

var OnchangeOfLevel1DropDown = function () {
    $('#ddl1p').change(function () {
        var employeeid = $('#ddl1p').val();
        $('#ddl2p').val(-1);
        $('#ddl3p').val(-1);
        $('#ddl4p').val(-1);
        if (distributer == 1) {

            $('#btnsubmitdistributordata').show();
            $('#productsalescharts').empty();
            $('#teamdetailschart').empty();
        }
        else if (brick == 1) {
            $('#brickdiv').show();
            fillddlbricks(employeeid);
            $('#btnsubmitbrickdata').show();
            $('#productsalescharts').empty();
            $('#teamdetailschart').empty();
            brickchartdata(employeeid);
            brickchartdatabottom(employeeid);
        }
        else if (team == 1) {
            $('#teamdiv').show();
            GetTeams(employeeid);
            GetTeamsData(employeeid);
            $('#btnsubmitdata').show();
            $('#productsalescharts').empty();
            $('#teamdetailschart').empty();
        }
    });
}
var OnchangeOfLevel2DropDown = function () {
    $('#ddl2p').change(function () {
        var employeeid = $('#ddl2p').val();
        $('#ddl1p').val(-1);
        $('#ddl3p').val(-1);
        $('#ddl4p').val(-1);
        if (distributer == 1) {
            $('#btnsubmitdistributordata').show();
        }
        else if (brick == 1) {
            $('#brickdiv').show();
            $('#productsalescharts').empty();
            $('#teamdetailschart').empty();
            $('#btnsubmitbrickdata').show();
            fillddlbricks(employeeid);
            brickchartdata(employeeid);
            brickchartdatabottom(employeeid);
            
        }
        else if (team == 1) {
            $('#teamdiv').show();
            GetTeams(employeeid);
            GetTeamsData(employeeid);
            $('#btnsubmitdata').show();
            $('#productsalescharts').empty();
            $('#teamdetailschart').empty();
        }
    });
}
var OnchangeOfLevel3DropDown = function () {
    $('#ddl3p').change(function () {
        var employeeid = $('#ddl3p').val();
        $('#ddl2p').val(-1);
        $('#ddl1p').val(-1);
        $('#ddl4p').val(-1);
        if (distributer == 1) {
            $('#btnsubmitdistributordata').show();
        }
        else if (brick == 1) {
            $('#brickdiv').show();
            $('#productsalescharts').empty();
            $('#teamdetailschart').empty();
            $('#btnsubmitbrickdata').show();
            fillddlbricks(employeeid);
            brickchartdata(employeeid);
            brickchartdatabottom(employeeid);
        }
        else if (team == 1) {
            $('#teamdiv').show();
            GetTeams(employeeid);
            GetTeamsData(employeeid);
            $('#btnsubmitdata').show();
            $('#productsalescharts').empty();
            $('#teamdetailschart').empty();
        }
    });
}
var OnchangeOfLevel4DropDown = function () {
    $('#ddl4p').change(function () {
        var employeeid = $('#ddl4p').val();
        $('#ddl2p').val(-1);
        $('#ddl3p').val(-1);
        $('#ddl1p').val(-1);
        if (distributer == 1) {
            $('#btnsubmitdistributordata').show();
        }
        else if (brick == 1) {
            $('#brickdiv').show();
            $('#productsalescharts').empty();
            $('#teamdetailschart').empty();
            $('#btnsubmitbrickdata').show();
            fillddlbricks(employeeid);
            brickchartdata(employeeid);
            brickchartdatabottom(employeeid);
        }
        else if (team == 1) {
            $('#teamdiv').show();
            GetTeams(employeeid);
            GetTeamsData(employeeid);
            $('#btnsubmitdata').show();
            $('#productsalescharts').empty();
            $('#teamdetailschart').empty();
        }
    });
}

function onError(request, status, error) {
    ajaxCompleted();
    alert('Something Went Wrong !!');
}

var OnBrickmenuClick = function () {
    $('#BrickMenu').css({ "background-color": "#9ae4a9" });
    $('#DistributorMenu').css({ "background-color": "#338dc8" });
    $('#TeamMenu').css({ "background-color": "#338dc8" });
    $('#teamdiv').hide();

    $('#filterTeam').show();
    $('#filterBrick').hide();
    $('#filtertext').html("Filter By Teams");

    $('#btnsubmitdata').hide(); 
    menutable();
    $('#ddl1p').val(-1);
    $('#ddl2p').val(-1);
    $('#ddl3p').val(-1);
    $('#ddl4p').val(-1);
    team = 0;
    brick = 1;
}

var OnTeammenuClick = function () {
    $('#TeamMenu').css({ "background-color": "#9ae4a9" });
    $('#DistributorMenu').css({ "background-color": "#338dc8" });
    $('#BrickMenu').css({ "background-color": "#338dc8" });
    $('#brickdiv').hide();


    $('#filterTeam').hide();
    $('#filterBrick').show();
    $('#filtertext').html("Filter By Bricks");


    $('#btnsubmitbrickdata').hide();
    menutable();
    $('#ddl1p').val(-1);
    $('#ddl2p').val(-1);
    $('#ddl3p').val(-1);
    $('#ddl4p').val(-1);
    team = 1;
    brick = 0;
}

var menutable = function () {
    $('#content-table').show();
    GetCurrentUser();
}

var MakeDropDown = function () {
    var config = {
        '.chosen-select': {},
        '.chosen-select-deselect': { allow_single_deselect: true },
        '.chosen-select-no-single': { disable_search_threshold: 10 },
        '.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
        '.chosen-select-width': { width: "95%" }
    }
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }
}

var fillddlbricks = function (empid) {
    var month = 0;
    var year = 0;
    if ($('#txtDate').val() == "Enter Year - Month") {
        var date = new Date()
        month = date.getMonth() + 1
        year = date.getFullYear()
    } else {
        var date = $('#txtDate').val().split('-');
        year = date[1]
        var monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for (var i = 0; i <= monthNames.length; i++) {
            if (monthNames[i] == date[0]) {
                month = i
            }
        }

    }
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/GetEmployeeDistributor",
        contentType: "application/json; charset=utf-8",
        data: "{'empid':'" + empid + "','month':'" + month + "','year':'" + year + "'}",
        success: onSuccessGetBricks,
        beforeSend: startingAjax,
        error: onError,
        cache: false,
        asyn: false
   });

   
}

function onSuccessGetBricksByDistributors(response) {

    ajaxCompleted();
    $("#ddlBricks").empty();
    if (response.d != "") {

        jsonObj = $.parseJSON(response.d);
        //$('#ddlbricks').append('<select data-placeholder="Select Bricks ..." class="chosen-select" style="width:100%" id="ddlbri" multiple ></select>');
        //value = '-1';
        //name = 'Select Bricks';
        //$("#ddlBricks").append("<option value='" + value + "'>" + name + "</option>");

        
        $.each(jsonObj, function (i, tweet) {
            //alert(jsonObj[i].ID);
            $("#ddlBricks").append("<option value='" + jsonObj[i].BrickCode + "'>" + jsonObj[i].BrickName + "</option>");
        });
    }
    else {
        $('#ddlBricks').append('<select data-placeholder="No Bricks Are Available ..." class="chosen-select" style="width:100%" id="ddlbri" multiple ></select>');
    }


}


function onSuccessGetBricksByDistributors(response) {

    ajaxCompleted();
    $("#ddlbri").empty();
    if (response.d != "") {

        jsonObj = $.parseJSON(response.d);
        //$('#ddlbricks').append('<select data-placeholder="Select Bricks ..." class="chosen-select" style="width:100%" id="ddlbri" multiple ></select>');
        //value = '-1';
        //name = 'Select Bricks';
        //$("#ddlBricks").append("<option value='" + value + "'>" + name + "</option>");


        $.each(jsonObj, function (i, tweet) {
            //alert(jsonObj[i].ID);
            $("#ddlbri").append("<option value='" + jsonObj[i].BrickCode + "'>" + jsonObj[i].BrickName + "</option>");
        });
    }
    else {
        $('#ddlbri').append('<select data-placeholder="No Bricks Are Available ..." class="chosen-select" style="width:100%" id="ddlbri" multiple ></select>');
    }


}

var onSuccessGetBricks = function (response) {
    document.getElementById('ddlbricks').innerHTML = "";
    //ajaxCompleted();
    $("#ddlselectdist").empty();
    if (response.d != "") {

        jsonObj = $.parseJSON(response.d);
        
        $('#ddlbricks').append('<select data-placeholder="Select Bricks ..." class="chosen-select" style="width:100%" id="ddlbri" multiple ></select>');
        value = '-1';
        name = 'Select Distributor';
        $("#ddlselectdist").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            //alert(jsonObj[i].ID);
            $("#ddlselectdist").append("<option value='" + jsonObj[i].DistributorCode + "'>" + jsonObj[i].DistributorName + "</option>");
        });
        MakeDropDown();
    }
    else {
        $('#ddlbricks').append('<select data-placeholder="No Bricks Are Available ..." class="chosen-select" style="width:100%" id="ddlbri" multiple ></select>');
        MakeDropDown();
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
        cache: false
    });
}
function onSuccessGetCurrentUser(data, status) {

    if (data.d != "") {

        EmployeeId = data.d;
        GetTeams();
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
        cache: false
    });
}
function onSuccessGetCurrentUserRole(data, status) {

    if (data.d != "") {
        EmployeeIdUserRole = data.d;
        CurrentUserRole = data.d;

        //alert(EmployeeIdUserRole);

    }

    // GetEditableDataLoginId();

    RetrieveAppConfig();
}

function RetrieveAppConfig() {

    $.ajax({
        type: "POST",
        url: "../Form/CommonService.asmx/GetHierarchyLevels",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetLevels,
        error: onError,
        cache: false
    });
}
function onSuccessGetLevels(data, status) {

    if (data.d != "") {

        jsonObj = $.parseJSON(data.d)
        glbVarLevelName = jsonObj[0].SettingName;

        if (glbVarLevelName == "Level1") {

            HierarchyLevel1 = jsonObj[0].SettingValue;
            HierarchyLevel2 = jsonObj[1].SettingValue;
            HierarchyLevel3 = jsonObj[2].SettingValue;
            HierarchyLevel4 = jsonObj[3].SettingValue;
            HierarchyLevel5 = jsonObj[4].SettingValue;
            HierarchyLevel6 = jsonObj[5].SettingValue;
        }

        HideHierarchy();
        EnableHierarchyViaLevel();

    }
}

function EnableHierarchyViaLevel() {

    if (glbVarLevelName == "Level1") {

        if (CurrentUserRole == 'admin') {

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

            //$('#colType').hide();
            //$('#colTType').hide();
            //FillDropDownList();
        }
        if (CurrentUserRole == 'rl1') {
            $('#col1').hide();
            $('#col2').hide();
            $('#col3').hide();
            $('#col4').hide();
            $('#col5').hide();
            $('#col11').hide();
            $('#col22').hide();
            $('#col33').hide();
            $('#col44').hide();
            $('#col55').hide();

            //FillDropDownList();
        }
        if (CurrentUserRole == 'rl2') {
            $('#col1').hide();
            $('#col2').hide();
            $('#col3').hide();
            $('#col4').hide();
            $('#col11').hide();
            $('#col22').hide();
            $('#col33').hide();
            $('#col44').hide();

            //FillDropDownList();
        }
        if (CurrentUserRole == 'rl3') {
            $('#col1').hide();
            $('#col2').hide();
            $('#col3').hide();
            $('#col11').hide();
            $('#col22').hide();
            $('#col33').hide();

            $('#col4p').hide();
            $('#col14p').hide();
            //FillDropDownList();
        }
        //if (CurrentUserRole == 'rl4') {
        //    $('#col1').hide();
        //    $('#col2').hide();

        //    $('#col11').hide();
        //    $('#col22').hide();


        //    //FillDropDownList();
        //}
        //if (CurrentUserRole == 'rl5') {
        //    $('#col1').hide();
        //    $('#col11').hide();
        //    //FillDropDownList();
        //}
        if (CurrentUserRole == 'rl4') {
            $('#col1').hide();
            $('#col2').hide();

            $('#col4p').hide();
            $('#col14p').hide();
            $('#col11').hide();
            $('#col22').hide();

            $('#col1p').hide();
            $('#col11p').hide();



            //FillDropDownList();
        }
        if (CurrentUserRole == 'rl5') {
            $('#col1').hide();
            $('#col11').hide();

            $('#col4p').hide();
            $('#col14p').hide();
            $('#col1p').hide();
            $('#col11p').hide();
            $('#col2p').hide();
            $('#col22p').hide();
            //FillDropDownList();
        }

        if (CurrentUserRole == 'rl6') {
            $('#col1').hide();
            $('#col11').hide();

            $('#col4p').hide();
            $('#col14p').hide();
            $('#col1p').hide();
            $('#col11p').hide();
            $('#col2p').hide();
            $('#col22p').hide();
            $('#col3p').hide();
            $('#col33p').hide();

            $('#colType').hide();
            $('#colTType').hide();
            //FillDropDownList();
        }
    }
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

var GetTeamsData = function (empid) {
    var month = 0;
    var year = 0;
    if ($('#txtDate').val() == "Enter Year - Month") {
        var date = new Date()
        month = date.getMonth() + 1
        year = date.getFullYear()
    } else {
        var date = $('#txtDate').val().split('-');
        year = date[1]
        var monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for (var i = 0; i <= monthNames.length; i++) {
            if (monthNames[i] == date[0]) {
                month = i
            }
        }

    }
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/GetTeamsData",
        contentType: "application/json; charset=utf-8",
        data: "{'empid':'" + empid
           + "','bricksIDs':'" + $('#ddlBricks').val()
           + "','month':'" + month
           + "','year':'"  + year + "'}",
        success: onSuccessGetTeamsData,
        error: onError,
        cache: false,
        asyn: false
    });
}
var onSuccessGetTeamsData = function (response) {
    var msg = $.parseJSON(response.d);
    var data = [];
    $('#teamdetailschart').empty();
    $('#teamdetailschart').append('<div class="col-md-4"><div class="panel panel-heading" style="background-color: #338dc8">'
        + '<span class="text-center" style="color:white;text-align:center;font-weight:800">Team Detailed Sales Chart </span></div><div id="teamsaleunitchart"></div></div>');

    $.each(msg, function (i, option) {
        data.push({
            name: option.TeamName,
            data: [parseInt(option.Sales)]
        });
    });

    $(function () {
        Highcharts.chart('teamsaleunitchart', {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 0,
                    depth: 100
                }
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            plotOptions: {
                column: {
                    depth: 25
                }
            },
            xAxis: {
                categories: null
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            series: data
        });
    });

}

var getnewdata = function () {
    var month = 0;
    var year = 0;
    if ($('#txtDate').val() == "Enter Year - Month") {
        var date = new Date()
        month = date.getMonth() + 1
        year = date.getFullYear()
    } else {
        var date = $('#txtDate').val().split('-');
        year = date[1]
        var monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for (var i = 0; i <= monthNames.length; i++) {
            if (monthNames[i] == date[0]) {
                month = i
            }
        }

    }
    var a = $('#ddlT').val();
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/GetTeamsDataByID",
        contentType: "application/json; charset=utf-8",
        data: "{'TeamIds':'"   + a
            + "','bricksIDs':'" + $('#ddlBricks').val()
            + "','month':'"    + month
            + "','year':'"     + year + "'}",
        success: onSuccessGetTeamsData,
        error: onError,
        cache: false,
        asyn: false
    });

    teamproductdata();
}
var teamproductdata = function () {
    var month = 0;
    var year = 0;
    if ($('#txtDate').val() == "Enter Year - Month") {
        var date = new Date()
        month = date.getMonth() + 1
        year = date.getFullYear()
    } else {
        var date = $('#txtDate').val().split('-');
        year = date[1]
        var monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for (var i = 0; i <= monthNames.length; i++) {
            if (monthNames[i] == date[0]) {
                month = i
            }
        }

    }
    var a = $('#ddlT').val();
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/GetTeamsProductDataByID",
        contentType: "application/json; charset=utf-8",
        data: "{'TeamIds':'"    + a
            + "','bricksIDs':'" + $('#ddlBricks').val()
            + "','month':'"     + month
            + "','year':'"      + year + "'}",
        success: onSuccessGetTeamsProductDataData,
        error: onError,
        cache: false,
        asyn: false
    });
}

var onSuccessGetTeamsProductDataData = function (response) {
    var msg = $.parseJSON(response.d);
    var teamnames = [];

    $.each(msg, function (i, option) {

        teamnames.push(option.TeamName);

    });
   
    $('#productsalescharts').empty();
    var unique = teamnames.filter(function (itm, i, teamnames) {
        return i == teamnames.indexOf(itm);
    });
    for (var a = 0; a < unique.length; a++) {
        var productdata = [];

        $.each(msg, function (i, option) {
            if (option.TeamName == unique[a]) {
                productdata.push({
                    name: option.ProductName,
                    y: parseFloat(option.SumOfProducts)
                });
            }

        });

        $('#productsalescharts').append('<div class="col-md-4"><div class="panel panel-heading" style="background-color: #338dc8"><span class="text-center" style="color:white;text-align:center;font-weight:800">'+unique[a]+' Sales Chart </span>'
                + '</div> <div id="' + unique[a].replace(/ +/g, "") + 'chart"> </div> </div>');
        
        var newid = '#' + unique[a].replace(/ +/g, "") + 'chart';
        onsuccessPiechart(newid, unique[a], productdata);
    }

}

var onsuccessBrickWisePiechart = function (id, title, data) {
    $(function () {

        $(id).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: title
            },
            tooltip: {
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
                name: 'Total',
                colorByPoint: true,
                data: data
            }]
        });
    });
}
var brickchartdata = function (empid) {
    var month = 0;
    var year = 0;
    if ($('#txtDate').val() == "Enter Year - Month") {
        var date = new Date()
        month = date.getMonth() + 1
        year = date.getFullYear()
    } else {
        var date = $('#txtDate').val().split('-');
        year = date[1]
        var monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for (var i = 0; i <= monthNames.length; i++) {
            if (monthNames[i] == date[0]) {
                month = i
            }
        }

    }
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/GetTop5BricksData",
        contentType: "application/json; charset=utf-8",
        data: "{'empid':'" + empid + "','month':'" + month + "','year':'" + year + "'}",
        success: onSuccessGetBrickChart,
        error: onError,
        cache: false,
        asyn: false
    });
}
var onSuccessGetBrickChart = function (response) {
    var parsedvalue = response.d.split('|');
    var msg = $.parseJSON(parsedvalue[0]);
    var drilldownvalue = $.parseJSON(parsedvalue[1]);
    
    var data = [];
    var drilldata = [];
    var bricknames = [];
  //  $('#teamdetailschart').empty();
    $('#teamdetailschart').append('<div class="col-md-6"><div class="panel panel-heading" style="background-color: #338dc8">'
        + '<span class="text-center" style="color:white;text-align:center;font-weight:800">Top 5 Bricks </span></div><div id="teamsaleunitchart"></div></div>');

    $.each(drilldownvalue, function (i, option) {
        bricknames.push(option.BrickName);
    });

    var unique = bricknames.filter(function (itm, i, bricknames) {
        return i == bricknames.indexOf(itm);
    });
    for (var i = 0; i < unique.length; i++) {
        //drilldata
        drilldata.push({
            name: unique[i],
            id: unique[i],
            data: []
        });
    }
    $.each(msg, function (i, option) {
      
        data.push({
            name: option.BrickName,
            y: parseFloat(option.Sales),
            drilldown: option.BrickName
        });
    });

    $.each(drilldownvalue, function (i, option) {

        /*drilldata.push({
            name: option.ProductName,
            id: option.BrickName,
            data: ''
        });*/
        drilldata[unique.indexOf(option.BrickName)].data.push([option.ProductName, parseFloat(option.Sales)]);
    });

    $(function () {
        // Create the chart
        Highcharts.chart('teamsaleunitchart', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Top 5 Bricks'
            },
            subtitle: {
                text: null
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Total percent market share'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
            },

            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: data
            }]
            ,
            drilldown: {
                series: drilldata
            }
        });
    });

}

var brickchartdatabottom = function (empid) {
    var month = 0;
    var year = 0;
    if ($('#txtDate').val() == "Enter Year - Month") {
        var date = new Date()
        month = date.getMonth() + 1
        year = date.getFullYear()
    } else {
        var date = $('#txtDate').val().split('-');
        year = date[1]
        var monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for (var i = 0; i <= monthNames.length; i++) {
            if (monthNames[i] == date[0]) {
                month = i
            }
        }

    }
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/GetBottom5BricksData",
        contentType: "application/json; charset=utf-8",
        data: "{'empid':'" + empid + "','month':'" + month + "','year':'" + year + "'}",
        success: onSuccessGetBrickChartBottom,
        error: onError,
        cache: false,
        asyn: false
    });
}
var onSuccessGetBrickChartBottom = function (response) {
    ajaxCompleted();
    var parsedvalue = response.d.split('|');
    var msg = $.parseJSON(parsedvalue[0]);
    var drilldownvalue = $.parseJSON(parsedvalue[1]);

    var data = [];
    var drilldata = [];
    var bricknames = [];
    //  $('#teamdetailschart').empty();
    $('#teamdetailschart').append('<div class="col-md-6"><div class="panel panel-heading" style="background-color: #338dc8">'
        + '<span class="text-center" style="color:white;text-align:center;font-weight:800">Bottom 5 Bricks </span></div><div id="teamsaleunitchartBottom"></div></div>');

    $.each(drilldownvalue, function (i, option) {
        bricknames.push(option.BrickName);
    });

    var unique = bricknames.filter(function (itm, i, bricknames) {
        return i == bricknames.indexOf(itm);
    });
    for (var i = 0; i < unique.length; i++) {
        //drilldata
        drilldata.push({
            name: unique[i],
            id: unique[i],
            data: []
        });
    }
    $.each(msg, function (i, option) {

        data.push({
            name: option.BrickName,
            y: parseFloat(option.Sales),
            drilldown: option.BrickName
        });
    });

    $.each(drilldownvalue, function (i, option) {

        /*drilldata.push({
            name: option.ProductName,
            id: option.BrickName,
            data: ''
        });*/
        drilldata[unique.indexOf(option.BrickName)].data.push([option.ProductName, parseFloat(option.Sales)]);
    });

    $(function () {
        // Create the chart
        Highcharts.chart('teamsaleunitchartBottom', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Bottom 5 Bricks'
            },
            subtitle: {
                text: null
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: null
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
            },

            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: data
            }]
            ,
            drilldown: {
                series: drilldata
            }
        });
    });

}

var getnewbrickdata = function () {
    var month = 0;
    var year = 0;
    if ($('#txtDate').val() == "Enter Year - Month") {
        var date = new Date()
        month = date.getMonth()+1
        year = date.getFullYear()
    } else {
        var date = $('#txtDate').val().split('-');
        year = date[1]
    var monthNames = ["","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for (var i = 0; i <= monthNames.length; i++) {
        if (monthNames[i] == date[0]) {
            month = i
        }
      }
   }
    var a = $('#ddlbri').val();
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/GetBricksDataByID",
        contentType: "application/json; charset=utf-8",
        data: "{'bricksid':'" + a + "','TeamIDs':'0','month':'01','year':'2018'}",
        success: onSuccessGetBricksData,
        beforeSend: startingAjax,
        error: onError,
        cache: false,
        asyn: false
    });
}

var onSuccessGetBricksData = function (response) {
    var msg = [];
    ajaxCompleted();
    if (response.d != "")
        msg = $.parseJSON(response.d);

    var data = [];
    $('#productsalescharts').empty();
    $('#productsalescharts').append('<div class="col-md-4"><div class="panel panel-heading" style="background-color: #338dc8">'
        + '<span class="text-center" style="color:white;text-align:center;font-weight:800">Brick Detailed Sales Chart </span></div><div id="bricksaleunitchart"></div></div>');
    
    $.each(msg, function (i, option) {
        data.push({
            name: option.BrickName,
            data: [parseInt(option.Sales)]
        });
    });

    $(function () {
        Highcharts.chart('bricksaleunitchart', {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 0,
                    depth: 100
                }
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            plotOptions: {
                column: {
                    depth: 25
                }
            },
            xAxis: {
                categories: null
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            series: data
        });
    });

}

var targetMeterChart = function (targetid,actualid,title,data) {
    $(function () {

        var gaugeOptions = {

            chart: {
                type: 'solidgauge'
            },

            title: title,

            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },

            tooltip: {
                enabled: false
            },

            // the value axis
            yAxis: {
                stops: [
                    [0.1,'#DF5353'], // green
                    [0.5, '#DDDF0D'], // yellow
                    [0.9, '#55BF3B'] // red
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                title: {
                    y: -70
                },
                labels: {
                    y: 16
                }
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            }
        };

        // The speed gauge
        var chartSpeed = Highcharts.chart(targetid, Highcharts.merge(gaugeOptions, {
            yAxis: {
                min: 0,
                max: 50000,
                title: {
                    text: null
                }
            },

            credits: {
                enabled: false
            },

            series: [{
                name: 'Monthly Target',
                data: [50000],
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                           '<span style="font-size:12px;color:silver">Monthly Target</span></div>'
                },
                tooltip: {
                    valueSuffix: null
                }
            }]

        }));

        // The RPM gauge
        var chartRpm = Highcharts.chart(actualid, Highcharts.merge(gaugeOptions, {
            yAxis: {
                min: 0,
                max: 50000,
                title: {
                    text: null
                }
            },

            series: [{
                name: 'Actual Sales',
                data: data,
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                           '<span style="font-size:12px;color:silver">Actual Sales</span></div>'
                },
                tooltip: {
                    valueSuffix: 'Total'
                }
            }]

        }));

    });

}

function startingAjax() {

    $('.loading').show();
}

function ajaxCompleted() {

    $('.loading').hide();
   // alert("GAYAB?..");
}
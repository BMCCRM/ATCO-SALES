var employeeIDFORDATA = "0";
var startDateValidate = "0";
var EndDateValidate = "0";
var CurrentUserRole = "";
var loadflag = 0;

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
    GetCurrentUser();
    IsValidUser();


    $('#ddl1').change(OnChangeddl1);
    $('#ddl2').change(OnChangeddl2);
    $('#ddl3').change(OnChangeddl3);
    $('#ddl4').change(OnChangeddl4);
    $('#ddl5').change(OnChangeddl5);
    $('#ddl6').change(OnChangeddl6);
    $('#ddlTeam').change(ONteamChnageGethierarchy);

    $('#ddlTeam').select2({
        dropdownParent: $('#Th12')
    });
    $('#ddl1').select2({
        dropdownParent: $('#col11')
    });
    $('#ddl2').select2({
        dropdownParent: $('#col22')
    });
    $('#ddl3').select2({
        dropdownParent: $('#col33')
    });
    $('#ddl4').select2({
        dropdownParent: $('#col44')
    });
    $('#ddl5').select2({
        dropdownParent: $('#col55')
    });
    $('#ddl6').select2({
        dropdownParent: $('#col66')
    });

    HideHierarchy();

    if (performance.navigation.type == 1) {
        GetCurrentUser();
        IsValidUser();
       // callCharts();
        $('.overlay')[0].style.display = 'block';
        $("body").css("overflow", "hidden");


    } else {

        GetCurrentUser();
        IsValidUser();
        $('.overlay')[0].style.display = 'block';
        $("body").css("overflow", "hidden");

    }

}


function getFormatedDate(DateFor) {
    const monthNames = {};



    monthNames["january"] = 1;
    monthNames["february"] = 2;
    monthNames["march"] = 3;
    monthNames["april"] = 4;
    monthNames["may"] = 5;
    monthNames["june"] = 6;
    monthNames["july"] = 7;
    monthNames["august"] = 8;
    monthNames["september"] = 9;
    monthNames["october"] = 10;
    monthNames["november"] = 11;
    monthNames["december"] = 12;

    rawDate = DateFor;

    var a = rawDate.split('-')
    var monthNumber = monthNames[a[0].toLocaleLowerCase()]

    //var year = a[1];
    var fdate = monthNumber;
    return fdate;
}



function OnshowResultClick() {
    $2('#dialog').jqm({ modal: true });
    $2('#dialog').jqm();
    $2('#dialog').jqmShow();

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
        loadflag = 1;
        IsValidUser();
    }
    $2('#dialog').jqmHide();
}

function IsValidUser() {

    $.ajax({
        type: "POST",
        url: "NewDashboard.asmx/IsValidUser",
        contentType: "application/json; charset=utf-8",
        success: onSuccessValidUser,
        error: onError,
        cache: false,
        async: false
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

        if ($('#ddlTeam').val() != null) {
            team = $('#ddlTeam').val();
        } else {
            team = -1
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

        if (CurrentUserRole == 'rl1') {
            if (level5 != -1) {
                GetCurrentLevelIDs(level5);
            } else if (level4 != -1) {
                GetCurrentLevelIDs(level4);
            } else if (team != -1) {
                GetCurrentLevelIDs(team);
            }
            else if (level2 != -1) {
                GetCurrentLevelIDs(level2);
            }
            else if (level1 != -1) {
                GetCurrentLevelIDs(level1);
            }
            else { GetCurrentLevelIDs(0); }
        } else if (CurrentUserRole == 'rl2') {
            if (level4 != -1) {
                GetCurrentLevelIDs(level4);
            } else if (team != -1) {
                GetCurrentLevelIDs(team);
            }
            else if (level3 != -1) {
                GetCurrentLevelIDs(level3);
            }
            else if (level1 != -1) {
                GetCurrentLevelIDs(level1);
            }
            else { GetCurrentLevelIDs(0); }
        }

        else if (CurrentUserRole == 'headoffice') {
            if (level1 != -1) {
                GetCurrentLevelIDs(level1);
            }
            else if (level3 != -1) {
                GetCurrentLevelIDs(level3);
            }
            else if (level2 != -1) {
                GetCurrentLevelIDs(level2);
            }
            else { GetCurrentLevelIDs(0); }
        }
        else if (CurrentUserRole == 'rl3') {
            if (team != -1) {
                GetCurrentLevelIDs(team);
            }
            else if (level3 != -1) {
                GetCurrentLevelIDs(level3);
            }
            else if (level2 != -1) {
                GetCurrentLevelIDs(level2);
            }
            else { GetCurrentLevelIDs(0); }
        } else if (CurrentUserRole == 'rl4') {
            if (team != -1) {
                GetCurrentLevelIDs(team);
            }
            else if (level2 != -1) {
                GetCurrentLevelIDs(level2);
            } else { GetCurrentLevelIDs(0); }
        } else {
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

            else { GetCurrentLevelIDs(0); }
        }
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
    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        EmployeeIdForTeam = EmployeeId;
        FillTeamsbyBUH();
    } else if (CurrentUserRole == 'rl4') {
        EmployeeIdForTeam = EmployeeId;
        FillTeamsbyBUH();
    }
    if (CurrentUserRole == 'rl5' || CurrentUserRole == 'rl6') {
        $('#Th112').hide();
        $('#Th12').hide();
    }
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


function onSuccessgetCurrentLevelID(data, status) {


    if (data.d != "") {


        $('#L1').val(data.d.split(':')[0]);
        $('#L2').val(data.d.split(':')[1]);
        $('#L3').val(data.d.split(':')[2]);
        $('#L4').val(data.d.split(':')[3]);
        $('#L5').val(data.d.split(':')[4]);
        $('#L6').val(data.d.split(':')[5]);
        if (CurrentUserRole == 'rl1') {
            if ($('#ddl3').val() == '-1' || $('#ddl3').val() == null) {
                $('#L7').val(0);
            } else {
                $('#L7').val($('#ddl3').val());
            }
        } else if (CurrentUserRole == 'rl2') {
            if ($('#ddl2').val() == '-1' || $('#ddl2').val() == null) {
                $('#L7').val(0);
            } else {
                $('#L7').val($('#ddl2').val());
            }
        } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'rl4' || CurrentUserRole == 'headoffice') {
            if ($('#ddl1').val() == '-1' || $('#ddl1').val() == null) {
                $('#L7').val(0);
            } else {
                $('#L7').val($('#ddl1').val());
            }
        } else {
            if ($('#ddlTeam').val() == '-1' || $('#ddlTeam').val() == null) {
                $('#L7').val(0);
            } else {
                $('#L7').val($('#ddlTeam').val());
            }
        }

    } else {
        $('#L1').val(0);
        $('#L2').val(0);
        $('#L3').val(0);
        $('#L4').val(0);
        $('#L5').val(0);
        $('#L6').val(0);
        $('#L7').val(0);
    }
    if (CurrentUserRole == 'headoffice') {
        if ($('#ddl1').val() == '-1' || $('#ddl1').val() == null) {
            $('#L7').val(0);
            $('#L2').val(0);
            $('#L3').val(0);
            $('#L4').val(0);
            $('#L5').val(0);
            $('#L6').val(0);

        } else {
            $('#L7').val($('#ddl1').val());
            $('#L1').val(0);
            $('#L2').val(0);
            $('#L3').val(0);
            $('#L4').val(0);
            $('#L5').val(0);
            $('#L6').val(0);
        }
    }
    $2('#Actcall').jqm({ modal: true });
    $2('#Actcall').jqm();
    $2('#Actcall').jqmShow();

    if (loadflag == 1) {
        viewCharts();
    }
}

function ActualCallWork() {
    alert("actural data");
    $('#container2').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'" + employeeIDFORDATA + "'}";
    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    $.ajax({
        type: "POST",
        url: "NewDashboard.asmx/StartActualCallsWork",
        contentType: "application/json; charset=utf-8",
        data: myData,
        //async: false,
        success: OnSuccessActualCallWork,
        error: onError,
        cache: false
    });

}
function OnSuccessActualCallWork(data, status) {

    var json = jsonParse(data.d);
    var jsondata = [];
    for (var i in json) {
        jsondata.push([json[i].x, json[i].y]);
    }
    // Build the chart
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container2',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Actual Calls'
        },
        credits: {
            enabled: false
        }
        ,
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage}%</b>',
            percentageDecimals: 1
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    // backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
                    color: '#000000',
                    connectorColor: '#000000',
                    showInLegend: true,
                    formatter: function () {
                        return '<b>' + this.point.name + '</b>';
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Class Visted',
            data: jsondata
        }]
    });

    $('#container2').parent().find('.loding_box_outer').show().fadeOut();

}

//function barchartProdfre() {
//    $('#prodfre').parent().find('.loding_box_outer').show().fadeIn();
//    myData = "{'date':'"
//        + startdate + "','endate':'"
//        + enddate + "' ,'Level1':'"
//        + $('#L1').val() + "','Level2':'"
//        + $('#L2').val() + "','Level3':'"
//        + $('#L3').val() + "','Level4':'"
//        + $('#L4').val() + "','Level5':'"
//        + $('#L5').val() + "','Level6':'"
//        + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";
//    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/ProdFreClass",
//        contentType: "application/json; charset=utf-8",
//        data: myData,
//        //async: true,
//        success: OnSuccessbarChartProdfre,
//        error: onError,
//        cache: false

//    });
//}

function OnSuccessbarChartProdfre(data, status) {


    var dataser1 = [7, 12, 16, 0];

    var OSA = [];


    var OSD = [];
    var Class = [];
    if (data != null && data != "" && data != "[]") {
        var dataser = jsonParse(data);
        $.each(dataser, function (i, option) {
            OSA.push(parseFloat([option.ProdFreq]));
            Class.push(option.ClassName);

        });
    } else {
        OSA = [0, 0, 0];
    }
    var dataSum = 0;
    for (var i = 0; i < OSA.length; i++) {
        dataSum += OSA[i]
    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'prodfre',
            type: 'bar',
            height: 350
        },

        title: {
            text: 'Productive Frequency Coverage %'
        },
        colors: [
                '#604228'
        ],
        credits: { enabled: false },
        legend: {
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: '#F0F0F0'
            },
            formatter: function () {
                //var pcnt = (this.y / dataSum) * 100;
                return this.x + ':' + this.y + '%';
            }
        },
        plotOptions: {
            series: {
                shadow: false,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,

                }
            }
        },
        xAxis: {
            categories: Class,
            labels: {
                style: {
                    fontWeight: 'bold'
                }
            }
        },

        yAxis: {
            title: {
                text: ''
            }
        },

        series: [{
            showInLegend: false,
            data: OSA

        }]
    });

    $('#prodfre').parent().find('.loding_box_outer').show().fadeOut();


}

//function barchartCustomerCov() {
//    $('#customerCov').parent().find('.loding_box_outer').show().fadeIn();
//    myData = "{'date':'"
//        + startdate + "','endate':'"
//        + enddate + "' ,'Level1':'"
//        + $('#L1').val() + "','Level2':'"
//        + $('#L2').val() + "','Level3':'"
//        + $('#L3').val() + "','Level4':'"
//        + $('#L4').val() + "','Level5':'"
//        + $('#L5').val() + "','Level6':'"
//        + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";
//    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/customercoveragebyclass",
//        contentType: "application/json; charset=utf-8",
//        data: myData,
//        //async: true,
//        success: OnSuccessbarCustomerCov,
//        error: onError,
//        cache: false
//    });
//}

function OnSuccessbarCustomerCov(data, status) {



    var dataser1 = [7, 12, 16, 0];

    var OSA = [];

    var OSD = [];
    var Class = [];
    if (data != null && data != "" && data != "[]") {
        var dataser = jsonParse(data);
        $.each(dataser, function (i, option) {
            OSA.push(parseFloat([option.CustomerCoverage]));
            Class.push(option.ClassName);

        });
    } else {
        OSA = [0, 0, 0];
    }

    var dataSum = 0;
    for (var i = 0; i < OSA.length; i++) {
        dataSum += OSA[i]
    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'customerCov',
            type: 'bar',
            height: 350
        },

        title: {
            text: 'Customer Coverage %'
        },
        colors: [
                '#604228'
        ],
        credits: { enabled: false },
        legend: {
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: '#F0F0F0'
            },
            formatter: function () {
                //var pcnt = (this.y / dataSum) * 100;
                return this.x + ':' + this.y + '%';
            }
        },
        plotOptions: {
            series: {
                shadow: false,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,

                }
            }
        },
        xAxis: {
            categories: Class,
            labels: {
                style: {
                    fontWeight: 'bold'
                }
            }
        },

        yAxis: {
            title: {
                text: ''
            }
        },

        series: [{
            showInLegend: false,
            data: OSA

        }]
    });
    $('#customerCov').parent().find('.loding_box_outer').show().fadeOut();

}

//function barchartEstworkingdays() {
//    $('#container2').parent().find('.loding_box_outer').show().fadeIn();
//    myData = "{'date':'" + startdate +
//        "','endate':'" + enddate +
//        "' ,'Level1':'" + $('#L1').val() +
//        "','Level2':'" + $('#L2').val() +
//        "','Level3':'" + $('#L3').val() +
//        "','Level4':'" + $('#L4').val() +
//        "','Level5':'" + $('#L5').val() +
//        "','Level6':'" + $('#L6').val() +
//        "','EmployeeId':'" + employeeIDFORDATA +
//         "','TeamId':'" + $('#L7').val()
//        + "'}";
//    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/estworkinddays",
//        contentType: "application/json; charset=utf-8",
//        //async: true,
//        data: myData,
//        success: OnSuccessbarEstworkingdays,
//        error: onError,
//        cache: false
//    });
//}

function OnSuccessbarEstworkingdays(data, status) {

    var dataser1 = [7, 12, 16, 0];

    var OSA = [];

    if (data != null) {

        var dataser = jsonParse(data);

        $.each(dataser, function (i, option) {

            OSA.push(parseFloat([option.NewRecord2]));
        });
    }

    //var OSA = [];
    //var OSD = [];
    //if (data != null) {
    //    var dataser = jsonParse(data);
    //    $.each(dataser, function (i, option) {
    //        OSA.push(parseFloat([option.CustomerCoverage]));

    //    });
    //}
    //var dataSum = 0;
    //for (var i = 0; i < OSA.length; i++) {
    //    dataSum += OSA[i]
    //}

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container2',
            type: 'bar',
            height: 350
        },

        title: {
            text: ' '
        },
        colors: [
                '#604228'
        ],
        credits: { enabled: false },
        legend: {
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: '#F0F0F0'
            },
            formatter: function () {
                //var pcnt = (this.y / dataSum) * 100;
                //return this.x + ':' + this.y + '%';
                return this.x + ':' + this.y;
            }
        },
        plotOptions: {
            series: {
                shadow: false,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,

                }
            }
        },
        xAxis: {
            categories: ['Est Working Days', 'Working Days', 'Days In Field', 'DIF With Calls', 'Day With No Activity', 'Out Field Days'],
            labels: {
                style: {
                    fontWeight: 'bold'
                }
            }
        },

        yAxis: {
            title: {
                text: ''
            }
        },

        series: [{
            showInLegend: false,
            data: OSA

        }]
    });
    $('#container2').parent().find('.loding_box_outer').show().fadeOut();

}

//function callsperday() {
//    $('#complete').parent().find('.loding_box_outer').show().fadeIn();
//    myData = "{'date':'"
//        + startdate + "','endate':'"
//        + enddate + "' ,'Level1':'"
//        + $('#L1').val() + "','Level2':'"
//        + $('#L2').val() + "','Level3':'"
//        + $('#L3').val() + "','Level4':'"
//        + $('#L4').val() + "','Level5':'"
//        + $('#L5').val() + "','Level6':'"
//        + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";
//    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/callsperday",
//        contentType: "application/json; charset=utf-8",
//        data: myData,
//        //async: true,
//        success: OnSuccessCallsperday,
//        error: onError,
//        cache: false
//    });
//}

function OnSuccessCallsperday(data, status) {

    var datacallperday;
    if (data != null && data != "" && data != "[]") {
        var dataser = jsonParse(data);
        $.each(dataser, function (i, option) {
            datacallperday = parseFloat([option.CallPerDay]);
        });
    }

    $('#h1callperday').empty();
    if (isNaN(datacallperday)) {
        $('#h1callperday').text(0);
    } else {
        $('#h1callperday').text(datacallperday);

    }


    $('#pcallperdayText').empty();
    $('#pcallperdayText').text('Call per day');



    $('#complete').parent().find('.loding_box_outer').show().fadeOut();

}

//function GetSPOsCount() {
//    $('#complete').parent().find('.loding_box_outer').show().fadeIn();
//    myData = "{'date':'"
//        + startdate + "','endate':'"
//        + enddate + "' ,'Level1':'"
//        + $('#L1').val() + "','Level2':'"
//        + $('#L2').val() + "','Level3':'"
//        + $('#L3').val() + "','Level4':'"
//        + $('#L4').val() + "','Level5':'"
//        + $('#L5').val() + "','Level6':'"
//        + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";
//    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/GetSposCount",
//        contentType: "application/json; charset=utf-8",
//        //async: true,
//        data: myData,
//        success: OnSuccessGetSPOsCount,
//        error: onError,
//        cache: false
//    });
//}

function OnSuccessGetSPOsCount(data, status) {
    if (data != null && data != "" && data != "[]") {
        var dataser = jsonParse(data);

        $('#TotalSpoCount').empty();
        $('#TotalSpoCount').text(dataser[0].TotalSpos);
        $('#TotalSpoCountText').text('Total SPOs');

        $('#EmployeesWithNoActivity').empty();
        $('#EmployeesWithNoActivity').text(dataser[0].EmployeesWithNoActivity);
        $('#EmployeesWithNoActivityText').text('SPOs having no activity');

    }

    $('#complete').parent().find('.loding_box_outer').show().fadeOut();
}

//function FillBrandsDetails() {
//    $('#ContainerBrandChart').parent().find('.loding_box_outer').show().fadeIn();
//    myData = "{'date':'"
//        + startdate + "','endate':'"
//        + enddate + "' ,'Level1':'"
//        + $('#L1').val() + "','Level2':'"
//        + $('#L2').val() + "','Level3':'"
//        + $('#L3').val() + "','Level4':'"
//        + $('#L4').val() + "','Level5':'"
//        + $('#L5').val() + "','Level6':'"
//        + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";

//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/BrandDetails",
//        contentType: "application/json; charset=utf-8",
//        //async: true,
//        data: myData,
//        success: onSuccessBrands,
//        error: onError,
//        cache: false
//    });
//}

function onSuccessBrands(data) {

    if (data != null && data != "" && data != "[]") {
        var msg = jQuery.parseJSON(data);
        var data = [];
        var dataP1 = [];

        $.each(msg, function (i, option) {
            data.push({
                name: '<b>' + option.ProductName + '<b> : ' + parseInt(option.CountOfProduct) + ', P1 : ' + parseInt(option.CountOfProductP1),
                data: [parseInt(option.CountOfProduct)]

            });
            //   dataP1.push(parseInt(option.CountOfProductP1));
        });
    }
    //  var p1Hits = "P1 Calls For Product: <br>";

    //$.each(dataP1, function (i, p1Count) {
    //    p1Hits += data[i].name + ": " + p1Count + "<br>";

    //});


    chart = new Highcharts.Chart({
        chart: {
            type: 'column',
            renderTo: 'brandchart',
            //options3d: {
            //    enabled: true,
            //    alpha: 15,
            //    beta: 15,
            //    depth: 50,
            //    viewDistance: 25
            //}
        },
        title: {
            text: null
        },
        //subtitle: {
        //    text: p1Hits
        //},
        plotOptions: {
            column: {
                depth: 25,
                //events: { // disabled click
                //    legendItemClick: function () {
                //        return false;
                //    }
                //}
                //events: { // show alert on click
                //    click: function () {
                //        
                //        alert(this.name)
                //    }
                //}
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
        series: data,
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + ' <b>';

            }
        }
    });
    $('#ContainerBrandChart').parent().find('.loding_box_outer').show().fadeOut();

}

//function fillSpecialityCovered() {

//    $('#ContainerSpecialityChart').parent().find('.loding_box_outer').show().fadeIn();
//    myData = "{'date':'"
//        + startdate + "','endate':'"
//        + enddate + "' ,'Level1':'"
//        + $('#L1').val() + "','Level2':'"
//        + $('#L2').val() + "','Level3':'"
//        + $('#L3').val() + "','Level4':'"
//        + $('#L4').val() + "','Level5':'"
//        + $('#L5').val() + "','Level6':'"
//        + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";

//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/SpecialistCoverd",
//        contentType: "application/json; charset=utf-8",
//        //async: true,
//        data: myData,
//        success: onSuccessSpeciality,
//        error: onError,
//        cache: false
//    });
//}

function onSuccessSpeciality(response) {



    var data = [0, 0, 0];
    if (response != null && response != "" && response != "[]") {
        var msg = jQuery.parseJSON(response);

        $.each(msg, function (i, option) {
            data.push({
                name: option.SpecialiityName,
                y: parseInt(option.CountOfSpecialist)
            });
        });
    }

    chart = new Highcharts.Chart({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            renderTo: 'specialistChart',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: ''
        },
        //tooltip: {
        //    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        //},
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                depth: 35,
                showInLegend: true,
                size: 200,
                //dataLabels: {
                //    enabled: false,
                //    //formatter: function () {
                //    //    return this.percentage.toFixed(2) + '%';
                //    //}
                //}
                //point: {
                //    events: {
                //        legendItemClick: function (e) {
                //            e.preventDefault();
                //            return false;
                //        }
                //    }
                //}
            }
        },
        legend: {
            //enabled: true,
            //layout: 'horizontal',
            //align: 'right',
            //width: 200,
            //verticalAlign: 'middle',
            //useHTML: true,
            labelFormatter: function () {
                return '<div style="text-align: left; width:130px;float:left;">' + this.name + '</div><div style="width:40px; float:left;text-align:right;"> (' + this.y + ')</div>';
            }
        },
        series: [{
            name: 'Total',
            colorByPoint: true,
            data: data
        }]
    });

    $('#ContainerSpecialityChart').parent().find('.loding_box_outer').show().fadeOut();


}

//function DocCountSpecialityWise() {

//    $('#ContainerDocCountSpecialityWiseChart').parent().find('.loding_box_outer').show().fadeIn();
//    myData = "{'date':'"
//        + startdate + "','endate':'"
//        + enddate + "' ,'Level1':'"
//        + $('#L1').val() + "','Level2':'"
//        + $('#L2').val() + "','Level3':'"
//        + $('#L3').val() + "','Level4':'"
//        + $('#L4').val() + "','Level5':'"
//        + $('#L5').val() + "','Level6':'"
//        + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";

//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/DocCountSpecialityWise",
//        contentType: "application/json; charset=utf-8",
//        //async: true,
//        data: myData,
//        success: onSuccessDocCountSpecialityWise,
//        error: onError,
//        cache: false
//    });
//}

function onSuccessDocCountSpecialityWise(response) {

    if (response != null && response != "" && response != "[]") {

        var msg = jQuery.parseJSON(response);
        var data = [];
        $.each(msg, function (i, option) {
            data.push({
                name: option.SpecialiityName,
                y: parseInt(option.CountOfSpecialist)
            });
        });


        chart = new Highcharts.Chart({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                renderTo: 'doccountspecialitywisechart',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: ''
            },
            //tooltip: {
            //    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            //},
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true,
                    size: 200,
                    //dataLabels: {
                    //    enabled: false,
                    //    //formatter: function () {
                    //    //    return this.percentage.toFixed(2) + '%';
                    //    //}
                    //}
                    //point: {
                    //    events: {
                    //        legendItemClick: function (e) {
                    //            e.preventDefault();
                    //            return false;
                    //        }
                    //    }
                    //}
                }
            },
            legend: {
                //enabled: true,
                //layout: 'horizontal',
                //align: 'right',
                //width: 200,
                //verticalAlign: 'middle',
                //useHTML: true,
                labelFormatter: function () {
                    return '<div style="text-align: left; width:130px;float:left;">' + this.name + '</div><div style="width:40px; float:left;text-align:right;"> (' + this.y + ')</div>';
                }
            },
            series: [{
                name: 'Total',
                colorByPoint: true,
                data: data
            }]
        });

        $('#ContainerDocCountSpecialityWiseChart').parent().find('.loding_box_outer').show().fadeOut();

    }
}

//function DocCountClassWise() {

//    $('#ContainerDocCountClassWiseChart').parent().find('.loding_box_outer').show().fadeIn();
//    myData = "{'date':'"
//        + startdate + "','endate':'"
//        + enddate + "' ,'Level1':'"
//        + $('#L1').val() + "','Level2':'"
//        + $('#L2').val() + "','Level3':'"
//        + $('#L3').val() + "','Level4':'"
//        + $('#L4').val() + "','Level5':'"
//        + $('#L5').val() + "','Level6':'"
//        + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";

//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/DocCountClassWise",
//        contentType: "application/json; charset=utf-8",
//        //async: true,
//        data: myData,
//        success: onSuccessDocCountClassWise,
//        error: onError,
//        cache: false
//    });
//}

function onSuccessDocCountClassWise(response) {
    if (response != null && response != "" && response != "[]") {

        var msg = jQuery.parseJSON(response);
        var data = [];
        $.each(msg, function (i, option) {
            data.push({
                name: option.ClassName,
                y: parseInt(option.CountOfClasses)
            });
        });

        chart = new Highcharts.Chart({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                renderTo: 'doccountclasswisechart',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: ''
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: true,
                    size: 200,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            },
            legend: {
                //enabled: true,
                //layout: 'horizontal',
                //align: 'right',
                //width: 200,
                //verticalAlign: 'middle',
                //useHTML: true,
                labelFormatter: function () {
                    return '<div style="text-align: left; width:130px;float:left;">' + this.name + '</div><div style="width:40px; float:left;text-align:right;"> (' + this.y + ')</div>';
                }
            },
            series: [{
                name: 'Total',
                colorByPoint: true,
                data: data
            }]
        });

        $('#ContainerDocCountClassWiseChart').parent().find('.loding_box_outer').show().fadeOut();
    }
}

//function daysinfield() {
//    $('#complete').parent().find('.loding_box_outer').show().fadeIn();
//    myData = "{'date':'"
//        + startdate + "','endate':'"
//        + enddate + "' ,'Level1':'"
//        + $('#L1').val() + "','Level2':'"
//        + $('#L2').val() + "','Level3':'"
//        + $('#L3').val() + "','Level4':'"
//        + $('#L4').val() + "','Level5':'"
//        + $('#L5').val() + "','Level6':'"
//        + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";
//    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/daysinfield",
//        contentType: "application/json; charset=utf-8",
//        data: myData,
//        //async: true,
//        success: OnSuccessdaysinfield,
//        error: onError,
//        cache: false
//    });
//}

function OnSuccessdaysinfield(data, status) {

    var dayinfield;
    if (data != null) {
        var dataser = jsonParse(data);
        $.each(dataser, function (i, option) {
            dayinfield = parseFloat([option.Final]);
        });
    }

    $('#h1daysinfield').empty();
    $('#h1daysinfield').text(dayinfield + '%');

    $('#pdaysinfieldText').empty();
    $('#pdaysinfieldText').text('% Days in Field');

    $('#complete').parent().find('.loding_box_outer').show().fadeOut();

}

//function DailyCallTrend() {
//    $('#ContanerDailyCallTrend').parent().find('.loding_box_outer').show().fadeIn();
//    // myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
//    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'" + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";

//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/StartDailyCallTrendWork",
//        contentType: "application/json; charset=utf-8",
//        //async: true,
//        data: myData,
//        success: OnSuccessDailyCallTrend,
//        error: onError,
//        cache: false
//    });

//}

function OnSuccessDailyCallTrend(data, status) {

    if (data != null && data != "" && data != "[]") {
        var json = jsonParse(data);
        var Series1Name = json[0].name;
        var jsondata = [];
        for (var i in json) {
            jsondata.push(json[i].data);
        }

        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'ContanerDailyCallTrend',
                type: 'line'
            },
            title: {
                text: 'DAILY CALL TRENDS - AVERAGE CALLS PER DAY',
                x: -20 //center
            },
            credits: {
                enabled: false
            },
            subtitle: {
                x: -20
            },
            xAxis: {
                allowDecimals: true,
                categories: ['1', '2', '3', '4', '5', '6',
                            '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
                            '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28',
                            '29', '30', '31']

            },
            yAxis: {
                title: {
                    text: 'Avg Calls'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                            this.x + ': ' + this.y;
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 100,
                borderWidth: 0
            },
            series: [{
                type: 'line',
                name: Series1Name,
                data: json[0].data
            }
            ,
            {
                name: 'Target Calls',
                //data: [13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0,
                //13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0,
                //13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0]
                data: [14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0,
                14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0,
                14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0]
            }
            ]
        });
    }
    $('#ContanerDailyCallTrend').parent().find('.loding_box_outer').show().fadeOut();
}

//function VisitFrequency() {

//    $('#ContainerVisitFrequency').parent().find('.loding_box_outer').show().fadeIn();
//    //    myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
//    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";

//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/StartVisitFrequency",
//        contentType: "application/json; charset=utf-8",
//        //async: true,
//        data: myData,
//        success: OnSuccessVisitFrequency,
//        error: onError,
//        cache: false
//    });

//}

function OnSuccessVisitFrequency(data, status) {

    if (data != null && data != "" && data != "[]") {

        var json = jsonParse(data);
        var Series1Name = json[0].name;
        var jsondata = [];
        for (var i in json) {
            jsondata.push(json[i].data);
        }

        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'ContainerVisitFrequency',
                type: 'column'
            },
            title: {
                text: "DOCTOR'S VISIT RANGE ANALYSIS"
            },
            xAxis: {
                categories: ['4+', '3', '2', '1', '0']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Visits'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -100,
                verticalAlign: 'top',
                y: 20,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: json
        });

        $('#ContainerVisitFrequency').parent().find('.loding_box_outer').show().fadeOut();
    }
}

//function PlannedVsActualCalls() {
//    $('#ContainerPlannedvsAcutalCalls').parent().find('.loding_box_outer').show().fadeIn();
//    // myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";

//    myData = "{'date':'" + startdate + "','endate':'" + enddate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";

//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/PlannedVsActualCalls",
//        contentType: "application/json; charset=utf-8",
//        //async: true,
//        data: myData,
//        success: OnSuccessPlannedVsActualCalls,
//        error: onError,
//        cache: false
//    });


//}

function OnSuccessPlannedVsActualCalls(data, status) {

    if (data != '') {

        var json = jsonParse(data);
        var Series1Name = json[0].name;
        var jsondata = [];
        for (var i in json) {
            jsondata.push(json[i].data);
        }

        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'ContainerPlannedvsAcutalCalls',
                type: 'column'
            },
            title: {
                text: 'TARGET VS ACTUAL CALLS(MTD)'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: [
                        'A+', //ST
                        'A', //T1
                        'B' //T2
                ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Visits'
                }
            },
            legend: {
                layout: 'vertical',
                backgroundColor: '#FFFFFF',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 70,
                floating: true,
                shadow: true
            },
            tooltip: {
                formatter: function () {
                    return '' +
                            this.x + ': ' + this.y + ' Visits';
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: json
        });

        $('#ContainerPlannedvsAcutalCalls').parent().find('.loding_box_outer').show().fadeOut();
    }
}

//function GetAverageCalls() {
//    $('#ContainerAverageCalls').parent().find('.loding_box_outer').show().fadeIn();
//    //    myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
//    myData = "{'date':'" + startdate + "','endate':'" + enddate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";

//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/GetAverageCalls",
//        contentType: "application/json; charset=utf-8",
//        data: myData,
//        //async: true,
//        success: OnSuccessAverageCalls,
//        error: onError,
//        cache: false
//    });


//}

function OnSuccessAverageCalls(data, status) {
    if (data != null && data != "" && data != "[]") {
        var json = Number(jsonParse(data));
        var json1 = Number('80');


        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'ContainerAverageCalls',
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: 'MTD Average Calls'
            },
            credits: {
                enabled: false
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 30,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: 'MTD Calls'
                },
                plotBands: [{
                    from: 0,
                    to: 12,
                    color: '#DF5353' // green
                }, {
                    from: 12,
                    to: 30,
                    color: '#55BF3B' // yellow
                }]
            },

            series: [{
                name: 'MTD AVG CALLS',
                data: [json]
            }]

        });
    }
    $('#ContainerAverageCalls').parent().find('.loding_box_outer').show().fadeOut();
}

//function FillGridTop5() {

//    //    myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
//    myData = "{'date':'" + startdate + "','endate':'" + enddate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";


//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/Top5Mr",
//        data: myData,
//        contentType: "application/json",
//        //async: true,
//        success: onSuccessTop5,
//        error: onError,
//        complete: onComplete,
//        cache: false
//    });

//}

function onSuccessTop5(data, status) {
    if (data != null && data != "" && data != "[]") {
        var json = jsonParse(data);
        $('#top5div #top5table').remove();
        $('#top5div').prepend($('<table class="mGrid1" cellspacing="0" cellpadding="2" id="top5table" style="width:100%;border-collapse:collapse;"><tr style="font-weight:bold;"><th scope="col">MR</th><th scope="col">MTD Average Calls</th><th scope="col">MTD Joint Visits</th></tr>'));
        $.each(json, function (i, option) {
            $('#top5table').append($('<tr><td>' + option.MR + '</td><td align="center">' + option.Avg + '</td><td align="center">' + option.JVC + '</td></tr>'));
        });
        $('#top5div').append($('</table>'));
    }

}

//function FillGridBottom5() {

//    // myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
//    myData = "{'date':'" + startdate + "','endate':'" + enddate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";

//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/Bottom5Mr",
//        data: myData,
//        contentType: "application/json",
//        //async: true,
//        success: onSuccessBottom5,
//        error: onError,
//        complete: onComplete,
//        cache: false
//    });

//}

function onSuccessBottom5(data, status) {
    if (data != null && data != "" && data != "[]") {
        var json = jsonParse(data);
        $('#bottom5div #bottom5table').remove();
        $('#bottom5div').prepend($('<table class="mGrid1" cellspacing="0" cellpadding="2" id="bottom5table" style="width:100%;border-collapse:collapse;"><th scope="col">MR</th><th scope="col">MTD Average Calls</th><th scope="col">MTD Joint Visits</th></tr>'));
        $.each(json, function (i, option) {
            $('#bottom5table').append($('<tr><td>' + option.MR + '</td><td align="center">' + option.Avg + '</td><td align="center">' + option.JVC + '</td></tr>'));
        });
        $('#bottom5div').append($('</table>'));
    }

}


//function TotalDocsPlannedVsActualCalls() {
//    $('#TotalDoctorsPlannedvsAcutalCalls').parent().find('.loding_box_outer').show().fadeIn();


//    myData = "{'date':'" + startdate + "','endate':'" + enddate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";

//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/TotalDoctorsPlannedVsActualCalls",
//        contentType: "application/json; charset=utf-8",
//        //async: true,
//        data: myData,
//        success: OnSuccessTotalDocsPlannedVsActualCalls,
//        error: onError,
//        cache: false
//    });


//}

function OnSuccessTotalDocsPlannedVsActualCalls(data, status) {

    if (data != null && data != "" && data != "[]") {

        var json = jsonParse(data);
        var Series1Name = json[0].name;
        var jsondata = [];
        for (var i in json) {
            jsondata.push(json[i].data);
        }

        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'TotalDoctorsPlannedvsAcutalCalls',
                type: 'column'
            },
            title: {
                text: 'Plan Doctors VS Actual Calls(MTD)'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: [
                        'A+', //ST
                        'A', //T1
                        'B' //T2
                ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            legend: {
                layout: 'vertical',
                backgroundColor: '#FFFFFF',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 70,
                floating: true,
                shadow: true
            },
            tooltip: {
                formatter: function () {
                    return '' +
                            this.x + ': ' + this.y;
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: json
        });
    }
    $('#TotalDoctorsPlannedvsAcutalCalls').parent().find('.loding_box_outer').show().fadeOut();
}









//function FillGridDailyCall() {

//    //myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
//    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";


//    $.ajax({
//        type: "POST",
//        url: "NewDashboard.asmx/DailyCall",
//        data: myData,
//        contentType: "application/json",
//        //async: true,
//        success: onSuccessDailyCall,
//        error: onError,
//        complete: onComplete,
//        cache: false
//    });

//}

function onSuccessDailyCall(data, status) {

if (data != null && data != "" && data != "[]") {

    var json = jsonParse(data);

        $('#dailycalldiv #dailycalltable').remove();

        var month = getFormatedDate($('#txtDate').val());
        var year = $('#txtDate').val().split('-');
        year = year[1];

        var numberOfDaysMonth = getDaysInMonth(month, year);

        var dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


        $('#dailycalldiv').prepend($('<table id="dailycalltable" border="0" style="background-color: #D8D0C9;border-bottom-width: medium; border-color: #D8D0C9" width="900px">'));
        $('#dailycalltable').append($('<tr><td style="font-family: News Gothic MT; color:#fff" class="style8" bgcolor="#21668d">Day</td></tr>'));

        for (var i = 1; i <= 31; i++) {

            $('#dailycalltable tr:first-child').append($('<td style="Color:#fff;text-align:Center;" bgcolor="#21668d" width="27px" align="left">' + i + '</td>'));

        }

        $('#dailycalltable').append($('<tr><td style="font-family: News Gothic MT; color:#fff" class="stzyle8" bgcolor="#21668d">Day Name</td></tr>'));

        for (var i = 1; i <= numberOfDaysMonth; i++) {

            var nexDate = month + '/' + i + '/' + year;
            var d = new Date(nexDate);

            if (dayName[d.getDay()] == 'Sun') {
                $('#dailycalltable  tr:last-child').append($('<td style="Color:#fff;text-align:Center;" bgcolor="#aa4643" width="27px" align="left">' + dayName[d.getDay()] + '</td>'));
            } else {
                $('#dailycalltable  tr:last-child').append($('<td style="Color:#fff;text-align:Center;" bgcolor="#21668D" width="27px" align="left">' + dayName[d.getDay()] + '</td>'));
            }
        }



        $('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style7" bgcolor="#21668d">Calls</td>'));
        var ji = 0;
        var l = 31;
        var t = 0;
        var p = 'C';


        $.each(json, function (i, option) {
            t++;
        });
        jj = 1;

        var level1id, level2id, level3id, level4id, level5id, level6id, employeID;
        level1id = $('#L1').val();
        level2id = $('#L2').val();
        level3id = $('#L3').val();
        level4id = $('#L4').val();
        level5id = $('#L5').val();
        level6id = $('#L6').val();
        employeID = $('#L6').val();
        var ddlReport = $('#txtDate').val();

        var oncl = 'onclick="return !window.open(this.href,' + "'myWindow'," + "'status = 1, height = 500, width = 600, scrollbars=yes, resizable = 0'" + ')"';
        var ahref = "";

        for (var ii = 1; ii <= 31; ii++) {
            var flag = false;
            $.each(json, function (i, option) {
                var cday = json[i].days;
                var cvalue = json[i].correctsms;

                var M = "./Report_Calls.aspx?Day=" + cday + "&Month=" + ddlReport + "&Level1=" + level1id + "&Level2=" + level2id + "&Level3=" + level3id + "&Level4=" + level4id + "&Level5=" + level5id + "&Level6=" + level6id + "&employeeid=" + employeID + "&flag=2";
                var C = "./Report_MIO.aspx?Day=" + cday + "&Month=" + ddlReport + "&Level1=" + level1id + "&Level2=" + level2id + "&Level3=" + level3id + "&Level4=" + level4id + "&Level5=" + level5id + "&Level6=" + level6id + "&employeeid=" + employeID + "&flag=2";

                if (parseInt(cday) === ii) {
                    //ahmer edit start
                    if (p == "M") {
                        ahref = '<a ' + 'href="' + M + '"' + oncl + '> ';
                    } else { ahref = '<a ' + 'href="' + C + '"' + oncl + '> '; }
                    $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;">' + ahref + ' ' + cvalue + '</a></td>'));
                    flag = true;
                }
            });

            if (flag == false) {
                $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> 0  </td>'));
                flag = false;
            }
        }

        var p = 'M';
        $('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style8" bgcolor="#21668D"><a style="color:#fff;" href="" onclick="return ShowMRDetails();">SPOs</a> </td>'));
        for (var ii = 1; ii <= 31; ii++) {
            var flag = false;
            $.each(json, function (i, option) {
                var cday = json[i].days;
                var cvalue = json[i].mios;

                var M = "./Report_Calls.aspx?Day=" + cday + "&Month=" + ddlReport + "&Level1=" + level1id + "&Level2=" + level2id + "&Level3=" + level3id + "&Level4=" + level4id + "&Level5=" + level5id + "&Level6=" + level6id + "&employeeid=" + employeID + "&flag=2";
                var C = "./Report_MIO.aspx?Day=" + cday + "&Month=" + ddlReport + "&Level1=" + level1id + "&Level2=" + level2id + "&Level3=" + level3id + "&Level4=" + level4id + "&Level5=" + level5id + "&Level6=" + level6id + "&employeeid=" + employeID + "&flag=2";

                if (parseInt(cday) === ii) {
                    //ahmer edit start
                    if (p == "M") {
                        ahref = '<a ' + 'href="' + M + '"' + oncl + '> ';
                    } else { ahref = '<a ' + 'href="' + C + '"' + oncl + '> '; }
                    $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fff" style="font-size:10 pt;color:#000;">' + ahref + ' ' + cvalue + '</a></td>'));
                    flag = true;
                }
            });

            if (flag == false) {
                $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fff" style="font-size:10 pt;color:#000;"> 0  </td>'));
                flag = false;
            }
        }

        $('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style9" bgcolor="#21668d">Avg Calls</td>'));
        for (var ii = 1; ii <= 31; ii++) {
            var flag = false;
            $.each(json, function (i, option) {
                var cday = json[i].days;
                var cvalue = json[i].avgc;
                if (parseInt(cday) === ii) {
                    $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fff" style="font-size:10 pt;color:#000;">' + cvalue + '</td>'));

                    flag = true;
                }
            });

            if (flag == false) {
                $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fff" style="font-size:10 pt;color:#000;"> 0  </td>'));
                flag = false;
            }
        }

        $('#dailycalltable').append($('</tr>'));
        $('#dailycalldiv').append($('</table>'));
    }
}

var getDaysInMonth = function (month, year) {
    return new Date(year, month, 0).getDate();
};



function FillGridDailyRating() {

    //myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
         + employeeIDFORDATA + "','TeamId':'" + $('#L7').val() + "'}";



    $.ajax({
        type: "POST",
        url: "NewDashboard.asmx/DailyRating",
        data: myData,
        contentType: "application/json",
        //async: false,
        success: onSuccessDailyRating,
        error: onError,
        complete: onComplete,
        cache: false
    });

}
function onSuccessDailyRating(data, status) {

    $('#dailyratingdiv #dailyratingtable').remove();

    data = jQuery.parseJSON(data);
    $('#dailyratingdiv').prepend($('<table id="dailyratingtable" border="0" style="background-color: #D8D0C9;border-bottom-width: medium; border-color: #D8D0C9" width="900px">'));
    $('#dailyratingtable').append($('<tr><td style="font-family: News Gothic MT; color:#fff" class="style8" bgcolor="#21668d">Day</td></tr>'));

    for (var i = 0; i < data.length; i++) {

        $('#dailyratingtable tr:first-child').append($('<td style="Color:#fff;text-align:Center;" bgcolor="#21668d" width="27px" align="left">' + data[i].allday + '</td>'));

    }
    $('#dailyratingtable tr:first-child').append($('<td style="Color:#fff;text-align:Center;" bgcolor="#21668d" width="27px" align="left">Avg</td>'));


    $('#dailyratingtable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style7" bgcolor="#21668d">ZSM</td>'));
    var ji = 0;
    var l = 31;
    var t = 0;
    var p = 'C';
    var zsmdatacount = 0;
    for (var ii = 0; ii < data.length ; ii++) {
        var flag = false;


        $('#dailyratingtable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fff" style="font-size:10 pt;color:#000;">' + data[ii].zsm + '</td>'));

        flag = true;

        if (data[ii].zsm != "-") {

            zsmdatacount += parseFloat(data[ii].zsm);
            t++;
        }

        if (flag == false) {
            $('#dailyratingtable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fff" style="font-size:10 pt;color:#000;"> 0  </td>'));
            flag = false;
        }


    }
    var zsm;
    if (isNaN(zsmdatacount / t)) {
        zsm = 0;
    }
    else {
        zsm = zsmdatacount / t;
    }

    $('#dailyratingtable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fff" style="font-size:10 pt;color:#000;">' + zsm + '</td>'));


    $.each(data, function (i, option) {
        t++;
    });
    jj = 1;

    //var level1id, level2id, level3id, level4id, level5id, level6id, employeID;
    //level1id = $('#L1').val();
    //level2id = $('#L2').val();
    //level3id = $('#L3').val();
    //level4id = $('#L4').val();
    //level5id = $('#L5').val();
    //level6id = $('#L6').val();
    //employeID = $('#L6').val();
    //var ddlReport = $('#txtDate').val();

    //var oncl = 'onclick="return !window.open(this.href,' + "'myWindow'," + "'status = 1, height = 500, width = 600, scrollbars=yes, resizable = 0'" + ')"';
    //var ahref = "";

    //for (var ii = 1; ii <= data[i].days; ii++) {
    //    var flag = false;
    //    $.each(data, function (i, option) {
    //        var cday = data[i].days;
    //        var cvalue = data[i].correctsms;

    //        var M = "./Report_Calls.aspx?Day=" + cday + "&Month=" + ddlReport + "&Level1=" + level1id + "&Level2=" + level2id + "&Level3=" + level3id + "&Level4=" + level4id + "&Level5=" + level5id + "&Level6=" + level6id + "&employeeid=" + employeID + "&flag=2";
    //        var C = "./Report_MIO.aspx?Day=" + cday + "&Month=" + ddlReport + "&Level1=" + level1id + "&Level2=" + level2id + "&Level3=" + level3id + "&Level4=" + level4id + "&Level5=" + level5id + "&Level6=" + level6id + "&employeeid=" + employeID + "&flag=2";

    //        if (parseInt(cday) === ii) {
    //            //ahmer edit start
    //            if (p == "M") {
    //                ahref = '<a ' + 'href="' + M + '"' + oncl + '> ';
    //            } else { ahref = '<a ' + 'href="' + C + '"' + oncl + '> '; }
    //            $('#dailyratingtable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;">' + ahref + ' ' + cvalue + '</a></td>'));
    //            flag = true;
    //        }
    //    });

    //    if (flag == false) {
    //        $('#dailyratingtable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> 0  </td>'));
    //        flag = false;
    //    }
    //}
    var rsmdatacount = 0;
    var p = 'M';
    var r = 0;
    $('#dailyratingtable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style8" bgcolor="#21668D"> RTM </td>'));
    for (var ii = 0; ii < data.length; ii++) {
        var flag = false;

        //var cday = data[i].days;
        //var cvalue = data[i].Ftm;


        //ahmer edit start

        $('#dailyratingtable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fff" style="font-size:10 pt;color:#000;">' + data[ii].rsm + '</a></td>'));
        flag = true;



        if (data[ii].rsm != "-") {
            rsmdatacount += 0 + parseFloat(data[ii].rsm);
            r++;
        }


        if (flag == false) {
            $('#dailyratingtable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fff" style="font-size:10 pt;color:#000;"> 0  </td>'));
            flag = false;
        }

    }
    var rsm;
    if (isNaN(rsmdatacount / r)) {
        rsm = 0;
    }
    else {
        rsm = rsmdatacount / r;
    }

    $('#dailyratingtable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fff" style="font-size:10 pt;color:#000;">' + rsm + '</a></td>'));

    var ftmdatacount = 0;
    var f = 0;
    $('#dailyratingtable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style9" bgcolor="#21668d">FTM</td>'));
    for (var ii = 0; ii < data.length ; ii++) {
        var flag = false;


        $('#dailyratingtable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fff" style="font-size:10 pt;color:#000;">' + data[ii].Ftm + '</td>'));

        flag = true;

        if (data[ii].Ftm != "-") {
            ftmdatacount += parseFloat(data[ii].Ftm);

            f++;
        }


        if (flag == false) {
            $('#dailyratingtable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fff" style="font-size:10 pt;color:#000;"> 0  </td>'));
            flag = false;
        }
    }
    var ftm;
    if (isNaN(ftmdatacount / f)) {
        ftm = 0;
    }
    else {
        ftm = ftmdatacount / f;
    }

    $('#dailyratingtable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fff" style="font-size:10 pt;color:#000;">' + ftm + '</a></td>'));

    $('#dailyratingtable').append($('</tr>'));
    $('#dailyratingdiv').append($('</table>'));

}
var da, pa;

function BeforPOP(day, para) {
    $.ajax({
        type: "POST",
        url: "NewDashboard.asmx/GetLevelsID",
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
function FillGridBottom51() {

    myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";

    $.ajax({
        type: "POST",
        url: "NewDashboard.asmx/Bottom5Mr1",
        data: myData,
        contentType: "application/json",
        //async: false,
        success: onSuccessBottom51,
        error: onError,
        complete: onComplete,
        cache: false
    });

}
function onSuccessBottom51(data, status) {

    $('#bottom5div #bottom5table').remove();
    $('#bottom5div').prepend($('<table class="mGrid1" cellspacing="0" cellpadding="2" id="bottom5table" style="width:100%;border-collapse:collapse;"><th scope="col">MR</th><th scope="col">Average Calls</th><th scope="col">Average Joint Visits</th></tr>'));
    $.each(data, function (i, option) {
        $('#bottom5table').append($('<tr><td>' + option.mr + '</td><td align="center">' + option.avg + '</td></tr>'));
    });
    $('#bottom5div').append($('</table>'));

}


function SMSCorrectness() {

    //    myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";


    $.ajax({
        type: "POST",
        url: "NewDashboard.asmx/SmsCorrectness",
        data: myData,
        contentType: "application/json",
        //async: false,
        success: onSuccessSMSCorrectness,
        error: onError,
        complete: onComplete,
        cache: false
    });
}
var seriesName;
var xvalue;
var yvalue;
function onSuccessSMSCorrectness(data, status) {

    if (data != '') {

        var json = jsonParse(data);
        var Series1Name = json[0].name;
        var jsondata = [];
        for (var i in json) {
            jsondata.push(json[i].data);
        }

        var abc;

        //var chart;
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'SMSCorrectInCorrect',
                type: 'column'
            },
            xAxis: {
                max: 30,
                categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Daily Call Trends'
                }
            },
            tooltip: {
                formatter: function () {

                    abc = '' + this.series.name + ': ' + this.y + ' (' + Math.round(this.percentage) + '%) ' + this.x;
                    seriesName = this.series.name;
                    xvalue = this.x;
                    yvalue = this.y;
                    return '' +
                            this.series.name + ': ' + this.y + ' (' + Math.round(this.percentage) + '%)' + this.x;

                }
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                },
                cursor: 'pointer'
            },
            series: [
                    {
                        cursor: 'pointer',
                        events: {
                            click: function () {

                                $.ajax({
                                    type: "POST",
                                    url: "NewDashboard.asmx/GetLevelsID",
                                    contentType: "application/json; charset=utf-8",
                                    data: myData,
                                    success: onSuccessGetLevel,
                                    error: onError,
                                    cache: false
                                });
                            }
                        },
                        name: json[1].name,
                        data: json[1].data
                    },
                    {
                        cursor: 'pointer',
                        events: {
                            click: function () {

                                $.ajax({
                                    type: "POST",
                                    url: "NewDashboard.asmx/GetLevelsID",
                                    contentType: "application/json; charset=utf-8",
                                    data: myData,
                                    success: onSuccessGetLevel,
                                    error: onError,
                                    cache: false
                                });
                            }
                        },
                        name: json[0].name,
                        data: json[0].data
                    }
            ]
        });

    }
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
        //window.showModalDialog("./Report_Calls.aspx?Day=" + day + "&Month=" + ddlReport + "&Level3=" + Level3 + "&Level4=" + Level4 + "&Level5=" + Level5 + "&Level6=" + Level6 + "&employeeid=" + employeeid, "Calls", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
        window.open("./Report_Calls.aspx?Day=" + day + "&Month=" + ddlReport + "&Level3=" + Level3 + "&Level4=" + Level4 + "&Level5=" + Level5 + "&Level6=" + Level6 + "&employeeid=" + employeeid + "&flag=2", "Calls", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");

    }
    else if (parameter1 == "C") {
        //window.open("./Report_MIO.aspx?Day=" + day, "Calls", "status = 0, height = 850, width = 700, resizable = 1");
        //window.showModalDialog("./Report_MIO.aspx?Day=" + day + "&Month=" + ddlReport + "&Level3=" + Level3 + "&Level4=" + Level4 + "&Level5=" + Level5 + "&Level6=" + Level6 + "&employeeid=" + employeeid, "Calls", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
        window.open("./Report_MIO.aspx?Day=" + day + "&Month=" + ddlReport + "&Level3=" + Level3 + "&Level4=" + Level4 + "&Level5=" + Level5 + "&Level6=" + Level6 + "&employeeid=" + employeeid + "&flag=2", "Calls", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");

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
        cache: false,
        async: false
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
        cache: false,
        async: false
    });
}
function onSuccessGetCurrentUserLoginID(data, status) {

    if (data.d != "") {

        CurrentUserLoginId = data.d;
    }

    GetCurrentUserRole();
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




        FillDropDownList(CurrentUserRole);
    }

    if (CurrentUserRole == 'headoffice') {
        $('#col1').show();
        $('#col2').show();
        $('#col3').show();
        $('#col11').show();
        $('#col22').show();
        $('#col33').show();

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

    myData = "{'levelName':'" + glbVarLevelName + "' }";

    $.ajax({
        type: "POST",
        url: "datascreen.asmx/FilterDropDownList",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: onSuccessFillDropDownListNew,
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

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'headoffice') {
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
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6);
            }
            $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");
            $.each(jsonObj, function (i, tweet) {
                $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }

    }
}
function onSuccessFillDropDownListNew(data, status) {

    if (data.d != "") {

        $('#Label1').empty();
        $('#Label2').empty();
        $('#Label3').empty();
        $('#Label4').empty();
        $('#Label5').empty();
        $('#Label6').empty();
        $('#Label7').empty();

        jsonObj = jsonParse(data.d);

        //document.getElementById('ddl1').innerHTML = "";
        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        value = '-1';

        if (CurrentUserRole == 'admin') {
            if (glbVarLevelName == "Level1") {

                name = 'Select ' + HierarchyLevel1;

                $('#Label1').append(HierarchyLevel1 + " " + "");
                $('#Label2').append(HierarchyLevel2 + " " + "");
                $('#Label3').append(HierarchyLevel3 + " " + "");
                $('#Label4').append(HierarchyLevel4 + " " + "");
                $('#Label5').append(HierarchyLevel5 + " " + "");
                $('#Label6').append(HierarchyLevel6 + " " + "-TMs");
                $('#Label7').append("Teams");

            }
            if (glbVarLevelName == "Level2") {

                name = 'Select ' + HierarchyLevel2;
                $('#Label1').append(HierarchyLevel2 + " " + "");
                $('#Label2').append(HierarchyLevel3 + " " + "");
                $('#Label3').append(HierarchyLevel4 + " " + "");
                $('#Label4').append(HierarchyLevel5 + " " + "");
                $('#Label5').append(HierarchyLevel6 + " " + "-TMs");
                $('#Label7').append("Teams");
            }
            if (glbVarLevelName == "Level3") {

                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "");
                $('#Label2').append(HierarchyLevel4 + " " + "");
                $('#Label3').append(HierarchyLevel5 + " " + "");
                $('#Label4').append(HierarchyLevel6 + " " + "-TMs");
                $('#Label7').append("Teams");
            }

        }
        if (CurrentUserRole == 'headoffice') {
            name = 'Select ' + HierarchyLevel4;
            $('#Label1').append("Teams");
            $('#Label2').append(HierarchyLevel4 + " " + "");
            $('#Label3').append(HierarchyLevel5 + " " + "");
            $('#Label7').append(HierarchyLevel6 + " " + "-TMs");
        }
        if (CurrentUserRole == 'rl1') {
            name = 'Select ' + HierarchyLevel2;
            $('#Label1').append(HierarchyLevel2 + " " + "");
            $('#Label2').append(HierarchyLevel3 + " " + "");
            $('#Label3').append("Teams");
            $('#Label7').append(HierarchyLevel4 + " " + "");
            $('#Label4').append(HierarchyLevel5 + " " + "");
            $('#Label5').append(HierarchyLevel6 + " " + "-TMs");

        }
        if (CurrentUserRole == 'rl2') {
            name = 'Select ' + HierarchyLevel3;
            $('#Label1').append(HierarchyLevel3 + " " + "");
            $('#Label2').append("Teams");
            $('#Label3').append(HierarchyLevel4 + " " + "");
            $('#Label7').append(HierarchyLevel5 + " " + "");
            $('#Label4').append(HierarchyLevel6 + " " + "-TMs");
        }
        if (CurrentUserRole == 'rl3') {
            name = 'Select ' + HierarchyLevel4;
            $('#Label1').append("Teams");
            $('#Label2').append(HierarchyLevel4 + " " + "");
            $('#Label3').append(HierarchyLevel5 + " " + "");
            $('#Label7').append(HierarchyLevel6 + " " + "-TMs");
        }
        if (CurrentUserRole == 'rl4') {
            name = 'Select ' + HierarchyLevel5;
            $('#Label1').append("Teams");
            $('#Label2').append(HierarchyLevel5 + " " + "");
            $('#Label7').append(HierarchyLevel6 + " " + "-TMs");
        }
        if (CurrentUserRole == 'rl5') {
            name = 'Select ' + HierarchyLevel6;
            $('#Label1').append(HierarchyLevel6 + " " + "-TMs");
        }
        //$("#ddl1").append("<option value='" + value + "'>" + name + "</option>");


        //$("#ddl1").append("<option value='" + value + "'>" + "Select Employee" + "</option>");
        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //}); update--


        //if (CurrentUserRole == 'rl4') { name = 'Select ' + HierarchyLevel5; $('#Label1').append(HierarchyLevel5); $('#Label2').append(HierarchyLevel6); }
        //if (CurrentUserRole == 'rl5') { name = 'Select ' + HierarchyLevel6; $('#Label1').append(HierarchyLevel6); }


        if (CurrentUserRole != 'rl3' && CurrentUserRole != 'rl4' && CurrentUserRole != 'headoffice')//&& CurrentUserRole != 'rl5') 
        {
            document.getElementById('ddl1').innerHTML = "";
            $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");
            $.each(jsonObj, function (i, tweet) {
                //$("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                if ($("#ddlstatus").val() == 'all') {
                    if (jsonObj[i].EmployeeName.split(' - ')[1] == '(InActive)') {
                        $("#ddl1").append("<option style='background-color: #f57575;' value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                    } else {
                        $("#ddl1").append("<option  value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                    }
                }
                if ($("#ddlstatus").val() == 'active') {
                    if (jsonObj[i].EmployeeName.split(' - ')[1] == '(Active)') {
                        $("#ddl1").append("<option  value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                    }
                }
            });
        }




        //}
        //IsValidUser();
    }

}

function FillTeamsbyBUH() {

    if (CurrentUserRole == 'admin') {
        myData = "{'EmployeeId':'" + $('#ddl3').val() + "' }";
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/FillTeamsForLevel3withEmployeeId",
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
        myData = "{'EmployeeId':'" + $('#ddl2').val() + "' }";
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/FillTeamsForLevel3withEmployeeId",
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
        myData = "{'EmployeeId':'" + $('#ddl1').val() + "' }";
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/FillTeamsForLevel3withEmployeeId",
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
            url: "NewReports.asmx/FillTeamsForLevel3withEmployeeId",
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


    if (data.d != "") {
        var jsonObj = jsonParse(data.d);
        if (CurrentUserRole == 'rl1') {
            document.getElementById('ddl3').innerHTML = "";
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            });
        } else if (CurrentUserRole == 'admin') {
            document.getElementById('ddlTeam').innerHTML = "";
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            });
        }
        else if (CurrentUserRole == 'rl2') {
            document.getElementById('ddl2').innerHTML = "";
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            });
        } else {
            document.getElementById('ddl1').innerHTML = "";
            $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl1").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            });
        }


    } else {
        $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");
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


function ONteamChnageGethierarchy() {

    if ($('#L7').val() != '-1') {
        $('#L7').val($('#ddlTeam').val());
    } else {
        $('#L7').val(0);
    }

    if (CurrentUserRole == 'admin') {
        OnChangeddl3withteamId();
    }
    else if (CurrentUserRole == 'rl1') {
        $('#L7').val($('#ddl3').val());
        OnChangeddl2withteamId();
    } else if (CurrentUserRole == 'rl2') {
        OnChangeddl2withteamId();
    }
    else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        OnChangeddl3withteamId();
    }
    else if (CurrentUserRole == 'rl4') {
        OnChangeddl4withteamId();
    }
}
function OnChangeddl1() {

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        var teamid = $('#ddl1').val();
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

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {
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
        }
    }
    else if (CurrentUserRole == 'rl4') {

        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";

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
            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {
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
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }
    }
    else {

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
            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {
                $('#h2').val(0);
                $('#h3').val(0);
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
                document.getElementById('ddlTeam').innerHTML = "";
            }
            if (CurrentUserRole == 'rl1') {
                $('#h3').val(0);
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
                document.getElementById('ddlTeam').innerHTML = "";
            }
            if (CurrentUserRole == 'rl2') {
                $('#h4').val(0);
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
                document.getElementById('ddlTeam').innerHTML = "";
            }
            if (CurrentUserRole == 'rl3') {
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
        }
    }
}
function OnChangeddl2() {


    if (CurrentUserRole == 'rl2') {

        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddlTeam').innerHTML = "";

        levelValue = $('#ddl1').val();
        var teamid = $('#ddl2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteam",
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

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {
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
                success: onSuccessFillddl2,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            //$('#dG2').val(-1);

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {
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
                document.getElementById('ddlTeam').innerHTML = "";
            }
            if (CurrentUserRole == 'rl2') {
                $('#h5').val(0);
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl3') {
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
        }
    }
}
function OnChangeddl2withteamId() {

    //$('#dialog').jqm({ modal: true });
    //$('#dialog').jqm();
    //$('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl1') {


        //document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        //document.getElementById('dG3').innerHTML = "";
        //document.getElementById('dG4').innerHTML = "";
        //document.getElementById('dG5').innerHTML = "";
        //document.getElementById('dG6').innerHTML = "";

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

            //levelValue = $('#ddl2').val();
            //var teamid = $('#ddlTeam').val();
            //myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
            //if (levelValue != -1) {

            //    $.ajax({
            //        type: "POST",
            //        url: "../Reports/NewReports.asmx/GetEmployeewithteam",
            //        data: myData,
            //        contentType: "application/json; charset=utf-8",
            //        dataType: "json",
            //        success: onSuccessFillddl3withteamId,
            //        error: onError,
            //        beforeSend: startingAjax,
            //        complete: ajaxCompleted,
            //        cache: false
            //    });

            //}
        else {

            //$('#dG4').val(-1)

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {
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
            //document.getElementById('dG5').innerHTML = "";
            //document.getElementById('dG6').innerHTML = "";

        }

        //$('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {

        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        levelValue = $('#ddlTeam').val();
        var teamid = $('#ddl2').val();
        myData = "{'employeeId':'" + levelValue + "' }";

        //myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/datascreen.asmx/GetEmployee",
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

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {
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

        }
    } else {
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
            //  $('#dG2').val(-1);

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {
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
            if (CurrentUserRole == 'rl3') {
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


            //document.getElementById('dG3').innerHTML = "";
            //document.getElementById('dG4').innerHTML = "";
            //document.getElementById('dG5').innerHTML = "";
            //document.getElementById('dG6').innerHTML = "";
        }

        //$('#dialog').jqmHide();


    }



}
function OnChangeddl3() {

    //$('#dialog').jqm({ modal: true });
    //$('#dialog').jqm();
    //$('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl1') {

        document.getElementById('ddlTeam').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";

        levelValue = $('#ddl2').val();
        var teamid = $('#ddl3').val();
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

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole != 'rl3' && CurrentUserRole != 'rl1') {
                document.getElementById('ddlTeam').innerHTML = "";
            }

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }
    } else if (CurrentUserRole == 'rl2') {
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

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole != 'rl3' || CurrentUserRole != 'headoffice') {
                document.getElementById('ddlTeam').innerHTML = "";
            }
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

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

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {
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
        }
    }
    else if (CurrentUserRole == 'admin') {
        levelValue = $('#ddl3').val();
        if (levelValue != -1) {
            FillTeamsbyBUH();
        } else {
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }
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
            //  $('#dG3').val(-1);

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole != 'rl3') {
                document.getElementById('ddlTeam').innerHTML = "";
            }
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }
    }


}
function OnChangeddl3withteamId() {

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

        if ($('#ddlTeam').val() != null && $('#ddl1').val() != null) {

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
                    success: onSuccessFillddl3,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });

            }
            else {

                if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {
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
            }
        } else {
            var teamid = $('#ddl1').val();
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
                if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {
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
            }
        }
    }

    else {
        levelValue = $('#ddl3').val();
        var teamid = $('#ddlTeam').val();
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

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {
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
        }
    }
}
function OnChangeddl4() {

    //$('#dialog').jqm({ modal: true });
    //$('#dialog').jqm();
    //$('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }


    if (CurrentUserRole == 'rl1') {
        levelValue = $('#ddl4').val();
        myData = "{'employeeId':'" + levelValue + "' }";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
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

            //  $('#dG4').val(-1)

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {
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
            //document.getElementById('dG5').innerHTML = "";
            //document.getElementById('dG6').innerHTML = "";

        }

        // $('#dialog').jqmHide();
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

            //  $('#dG4').val(-1)

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {
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
            //document.getElementById('dG5').innerHTML = "";
            //document.getElementById('dG6').innerHTML = "";

        }

        // $('#dialog').jqmHide();
    }
}
function OnChangeddl4withteamId() {

    //$('#dialog').jqm({ modal: true });
    //$('#dialog').jqm();
    //$('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl4') {

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

            //  $('#dG4').val(-1)

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {
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

        }

        //   $('#dialog').jqmHide();


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

            // $('#dG4').val(-1)

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {
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
            //document.getElementById('dG5').innerHTML = "";
            //document.getElementById('dG6').innerHTML = "";

        }

        //   $('#dialog').jqmHide();
    }



}
function OnChangeddl5() {

    //$('#dialog').jqm({ modal: true });
    //$('#dialog').jqm();
    //$('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    levelValue = $('#ddl5').val();
    myData = "{'employeeId':'" + levelValue + "' }";

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
        // $('#dG5').val(-1);

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl1') {
            $('#h13').val(0);
        }

        document.getElementById('ddl6').innerHTML = "";
        //document.getElementById('dG6').innerHTML = "";
    }

    //   $('#dialog').jqmHide();

}
function OnChangeddl6() {

    //$('#dialog').jqm({ modal: true });
    //$('#dialog').jqm();
    //$('#dialog').jqmShow();


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

        //  $('#dG6').val(-1)
        $('#h13').val(0);
    }

    // $('#dialog').jqmHide();
}




function onSuccessFillddl1(data, status) {

    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";
    document.getElementById('ddlTeam').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (CurrentUserRole == 'rl1' || CurrentUserRole == 'admin' || CurrentUserRole == 'rl4' || CurrentUserRole == 'headoffice') {
            value = '-1';

            name = 'Select ' + $('#Label2').text();
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }
        else {
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
    }
}
function onSuccessFillddl1withteamId(data, status) {


    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

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
                //  $('#dG1').val(-1);
            }
        } else {
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
                // $('#dG1').val(-1);
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

    //document.getElementById('dG3').innerHTML = "";
    //document.getElementById('dG4').innerHTML = "";
    //document.getElementById('dG5').innerHTML = "";
    //document.getElementById('dG6').innerHTML = "";


    if ($("#ddl2").val() == "-1") { } else {
        //value = '-1';
        //name = 'Select ' + $('#Label3').text();
        //$("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});

        if (data.d != "") {

            jsonObj = jsonParse(data.d);

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
                // $('#dG2').val(-1)
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
        // $('#dG2').val(-1);
    }

}
function onSuccessFillddl2(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    //document.getElementById('dG3').innerHTML = "";
    //document.getElementById('dG4').innerHTML = "";
    //document.getElementById('dG5').innerHTML = "";
    //document.getElementById('dG6').innerHTML = "";

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
                //  $('#dG2').val(-1)
            }
        } else if (CurrentUserRole == 'admin') {
            jsonObj = jsonParse(data.d);

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
                //   $('#dG2').val(-1)
            }
        } else if (CurrentUserRole == 'rl2') {
            jsonObj = jsonParse(data.d);

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
                //   $('#dG2').val(-1)
            }
        } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            jsonObj = jsonParse(data.d);

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
                //   $('#dG2').val(-1)
            }
        } else {
            jsonObj = jsonParse(data.d);
            document.getElementById('ddlTeam').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label3').text();
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
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
                //   $('#dG2').val(-1)
            }
        }

    }

    //if (CurrentUserRole == 'rl4') {
    //    levelValue = $('#ddl2').val();
    //    if (levelValue != -1) {

    //        myData = "{'employeeid':'" + levelValue + "' }";
    //        $.ajax({
    //            type: "POST",
    //            url: "../Reports/newReports.asmx/getemployeeHR",
    //            data: myData,
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: onSuccessFillddl12,
    //            error: onError,
    //            beforeSend: startingAjax,
    //            complete: ajaxCompleted,
    //            cache: false
    //        });
    //    }
    //}

    if (levelValue == -1) {
        $('#ddl2').val(-1);
        //$('#dG2').val(-1);
    }

}
function onSuccessFillddl3(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    //document.getElementById('dG4').innerHTML = "";
    //document.getElementById('dG5').innerHTML = "";
    //document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        value = '-1';

        if (CurrentUserRole == 'rl2' || CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            document.getElementById('ddlTeam').innerHTML = "";

            name = 'Select ' + $('#Label4').text();
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }



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
            // $('#dG3').val(-1)
        }
    }

    //if (CurrentUserRole == 'rl3') {
    //    levelValue = $('#ddl3').val();
    //    if (levelValue != -1) {

    //        myData = "{'employeeid':'" + levelValue + "' }";
    //        $.ajax({
    //            type: "POST",
    //            url: "../Reports/NewReports.asmx/getemployeeHR",
    //            data: myData,
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: onSuccessFillddl13,
    //            error: onError,
    //            beforeSend: startingAjax,
    //            complete: ajaxCompleted,
    //            cache: false
    //        });
    //    }
    //}

    if (levelValue == -1) {
        $('#ddl3').val(-1);
        // $('#dG3').val(-1);
    }
}
function onSuccessFillddl3withteamId(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddlTeam').innerHTML = "";
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

    } else if (CurrentUserRole == 'rl1') {
        if (data.d != "") {

            jsonObj = jsonParse(data.d);
            value = '-1';

            name = 'Select ' + $('#Label3').text();
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
                //  $('#dG3').val(-1)
            }
        }
    } else if (CurrentUserRole == 'rl2') {
        if (data.d != "") {

            jsonObj = jsonParse(data.d);
            value = '-1';

            name = 'Select ' + $('#Label2').text();
            $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });


            levelValue = $('#ddl4').val();
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
                //  $('#dG3').val(-1)
            }
        }
    }


    else {
        if (data.d != "") {

            jsonObj = jsonParse(data.d);
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
                //  $('#dG3').val(-1)
            }
        }
    }



}
function onSuccessFillddl4(data, status) {

    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    //document.getElementById('dG5').innerHTML = "";
    //document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

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
            //$('#dG4').val(-1)
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
        //  $('#dG4').val(-1);
    }
}
function onSuccessFillddl4withteamId(data, status) {
    //if (CurrentUserRole != 'rl2' && CurrentUserRole != 'rl1' && CurrentUserRole != 'admin') {
    //    document.getElementById('ddl1').innerHTML = "";
    //    document.getElementById('ddl2').innerHTML = "";
    //}

    //document.getElementById('dG5').innerHTML = "";
    //document.getElementById('dG6').innerHTML = "";

    if (CurrentUserRole == 'rl4') {
        if (data.d != "") {

            jsonObj = jsonParse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label1').text();
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
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

        }
    } else if (CurrentUserRole == 'rl1') {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select ' + $('#Label4').text();
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

        levelValue = $('#ddl4').val();

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

            jsonObj = jsonParse(data.d);
            document.getElementById('ddl5').innerHTML = "";
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
                //   $('#dG4').val(-1)
            }

        }
    }
}
function onSuccessFillddl5(data, status) {

    document.getElementById('ddl6').innerHTML = "";
    //document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
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
            //  $('#dG5').val(-1)
        }
    }

    if (CurrentUserRole == 'rl1') {
        levelValue = $('#ddl5').val();
    }
    else if (CurrentUserRole == 'rl3') {
        levelValue = $('#ddl3').val();
    }

    if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl3') {
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
        //$('#dG5').val(-1);
    }
}
function onSuccessFillddl6(data, status) { }


function onSuccessFillddl11(data, status) {
    /// //setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {

            //  $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)

            //    dg1();

        }
        if (CurrentUserRole == 'rl1') {

            $('#dG1').val(data.d[0].LevelId2)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            //    dg1();

        }
        if (CurrentUserRole == 'rl2') {

            //  $('#dG1').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            //    dg1();

        }
        if (CurrentUserRole == 'marketingteam') {

            //  $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)

            //    dg1();

        }
        if (CurrentUserRole == 'rl3') {

            //  $('#dG1').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            //     dg1();

        }
        if (CurrentUserRole == 'rl4') {

            //  $('#dG1').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            $('#h12').val(data.d[0].LevelId5)

            //     dg1();

        }
        if (CurrentUserRole == 'rl5') {

            //  $('#dG1').val(data.d[0].LevelId6)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

        }
        if (CurrentUserRole == 'rl2') {
            FillTeamsbyBUH();
        }

    }
    else {
        // $('#dG1').val(-1);
    }
}
function onSuccessFillddl11withteamId(data, status) {
    //setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {

            //  $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)

            // dg1();

        }
        if (CurrentUserRole == 'rl1') {

            ///  $('#dG1').val(data.d[0].LevelId2)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            //   dg1WithTeam();

        }
        if (CurrentUserRole == 'rl2') {

            //   $('#dG1').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            //     dg1();

        }
        if (CurrentUserRole == 'marketingteam') {

            //   $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)

            //     dg1();

        }
        if (CurrentUserRole == 'rl3') {

            ///   $('#dG1').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            //    dg1();

        }
        if (CurrentUserRole == 'rl4') {

            //   $('#dG1').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            $('#h12').val(data.d[0].LevelId5)

            //   dg1();

        }
        if (CurrentUserRole == 'rl5') {

            //  $('#dG1').val(data.d[0].LevelId6)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

        }


    }
    else {
        // $('#dG1').val(-1);
    }
}
function onSuccessFillddl12(data, status) {

    //setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {

            //  $('#dG2').val(data.d[0].LevelId2)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            //   dg2();

        }
        if (CurrentUserRole == 'marketingteam') {
            //   $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            //   dg2();

        }
        if (CurrentUserRole == 'rl1') {

            //   $('#dG2').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            //   dg2();

        }
        if (CurrentUserRole == 'rl2') {

            //   $('#dG2').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            //    dg2();

        }
        if (CurrentUserRole == 'rl3') {

            //  $('#dG2').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            //   dg2();

        }
        if (CurrentUserRole == 'rl4') {
            //    $('#dG2').val(data.d[0].LevelId6)
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
        // $('#dG2').val(-1);
    }
}
function onSuccessFillddl12withteamId(data, status) {

    //setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {

            // $('#dG2').val(data.d[0].LevelId2)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            //dg2();

        }
        if (CurrentUserRole == 'marketingteam') {
            //   $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            //dg2();

        }
        if (CurrentUserRole == 'rl1') {

            //  $('#dG2').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            //   dg2WithTeam();
        }
        if (CurrentUserRole == 'rl2') {

            //  $('#dG2').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            //    dg2();

        }
        if (CurrentUserRole == 'rl3') {

            // $('#dG2').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            //  dg2();

        }
        if (CurrentUserRole == 'rl4') {
            // $('#dG2').val(data.d[0].LevelId6)
            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            newemployee = $('#ddl2').val();
            $('#h6').val(newemployee);

        }
    }
    else {
        // $('#dG2').val(-1);
    }
}
function onSuccessFillddl13(data, status) {

    //setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

            //  $('#dG1').val(data.d[0].LevelId1)
            // $('#dG2').val(data.d[0].LevelId2)
            // $('#dG3').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            //    dg3();

        }
        if (CurrentUserRole == 'marketingteam') {

            //   $('#dG1').val(data.d[0].LevelId1)
            // $('#dG2').val(data.d[0].LevelId2)
            //   $('#dG3').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            //   dg3();

        }
        if (CurrentUserRole == 'rl1') {

            // $('#dG3').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            //   dg3();

        }
        if (CurrentUserRole == 'rl2') {

            // $('#dG3').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            //    dg3();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            //  $('#dG3').val(data.d[0].LevelId6)

            $('#h2').val(data.d[0].LevelId3)
            $('#h3').val(data.d[0].LevelId4)
            $('#h4').val(data.d[0].LevelId5)
            $('#h5').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
        if (!CurrentUserRole == 'rl2' || !CurrentUserRole == 'rl3' || !CurrentUserRole == 'headoffice') {
            FillTeamsbyBUH();
        }

    }
    else {
        // $('#dG3').val(-1);
    }
}
function onSuccessFillddl13withteamId(data, status) {

    //setvalue();


    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

            // $('#dG1').val(data.d[0].LevelId1)
            // $('#dG2').val(data.d[0].LevelId2)
            // $('#dG3').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            //   dg3WithTeam();

        }
        if (CurrentUserRole == 'marketingteam') {
            //  $('#dG1').val(data.d[0].LevelId1)
            //   $('#dG2').val(data.d[0].LevelId2)
            //  $('#dG3').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)


        }
        if (CurrentUserRole == 'rl1') {

            //  $('#dG3').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            //  dg3WithTeam();

        }
        if (CurrentUserRole == 'rl2') {

            //  $('#dG3').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)



        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            //  $('#dG1').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            dg3WithTeam();
            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
    }
    else {
        //$('#dG4').val(-1);
    }
}
function onSuccessFillddl14(data, status) {

    //setvalue();

    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

            //  $('#dG1').val(data.d[0].LevelId1)
            //  $('#dG2').val(data.d[0].LevelId2)
            //  $('#dG3').val(data.d[0].LevelId3)
            //  $('#dG4').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            //    dg4();
        }
        if (CurrentUserRole == 'marketingteam') {

            //  $('#dG1').val(data.d[0].LevelId1)
            //   $('#dG2').val(data.d[0].LevelId2)
            //   $('#dG3').val(data.d[0].LevelId3)
            //  $('#dG4').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            //   dg4();

        }
        if (CurrentUserRole == 'rl1') {

            //   $('#dG4').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            //  dg4();

        }
        if (CurrentUserRole == 'rl2') {

            //   $('#dG4').val(data.d[0].LevelId6)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

            //    dg4();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            //  $('#dG3').val(data.d[0].LevelId6)
            $('#h2').val(data.d[0].LevelId3)
            $('#h3').val(data.d[0].LevelId4)
            $('#h4').val(data.d[0].LevelId5)
            $('#h5').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
    }
    else {
        // $('#dG4').val(-1);
    }
}
function onSuccessFillddl14withteamId(data, status) {

    //setvalue();

    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

            //  $('#dG1').val(data.d[0].LevelId1)
            //  $('#dG2').val(data.d[0].LevelId2)
            //  $('#dG3').val(data.d[0].LevelId3)
            //  $('#dG4').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            //   dg4WithTeam();
            // dg4();
        }
        if (CurrentUserRole == 'marketingteam') {

            //  $('#dG1').val(data.d[0].LevelId1)
            //  $('#dG2').val(data.d[0].LevelId2)
            //  $('#dG3').val(data.d[0].LevelId3)
            //  $('#dG4').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            //  dg4();

        }
        if (CurrentUserRole == 'rl1') {

            //   $('#dG3').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            //   dg4WithTeam();

        }
        if (CurrentUserRole == 'rl2') {

            // $('#dG4').val(data.d[0].LevelId6)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

            //    dg4();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            //  $('#dG3').val(data.d[0].LevelId6)
            $('#h2').val(data.d[0].LevelId3)
            $('#h3').val(data.d[0].LevelId4)
            $('#h4').val(data.d[0].LevelId5)
            $('#h5').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
        if (CurrentUserRole == 'rl4') {

            //  $('#dG1').val(data.d[0].LevelId5)

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
        //  $('#dG4').val(-1);
    }
}
function onSuccessFillddl15(data, status) {

    //setvalue();

    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

            //  $('#dG1').val(data.d[0].LevelId1)
            //   $('#dG2').val(data.d[0].LevelId2)
            //   $('#dG3').val(data.d[0].LevelId3)
            ///  $('#dG4').val(data.d[0].LevelId4)
            //  $('#dG5').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            //  dg5();

        }
        if (CurrentUserRole == 'marketingteam') {

            //     $('#dG1').val(data.d[0].LevelId1)
            //    $('#dG2').val(data.d[0].LevelId2)
            //   $('#dG3').val(data.d[0].LevelId3)
            //   $('#dG4').val(data.d[0].LevelId4)
            //  $('#dG5').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            //  dg5();

        }
        if (CurrentUserRole == 'rl1') {

            //      $('#dG5').val(data.d[0].LevelId6)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

            //  dg5();

        }
        if (CurrentUserRole == 'rl2') {
            //     $('#dG1').val(data.d[0].LevelId1)
            //    $('#dG2').val(data.d[0].LevelId2)
            //    $('#dG3').val(data.d[0].LevelId3)
            //    $('#dG4').val(data.d[0].LevelId4)
            //    $('#dG5').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            // dg5();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            //  $('#dG3').val(data.d[0].LevelId6)

            $('#h2').val(data.d[0].LevelId3)
            $('#h3').val(data.d[0].LevelId4)
            $('#h4').val(data.d[0].LevelId5)
            $('#h5').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);
        }
    }
    else {
        //   $('#dG5').val(-1);
    }
}
function onSuccessFillddl16(data, status) {

    //setvalue();
    if (data.d != '') {
        //$('#dG1').val(data.d[0].LevelId1)
        //$('#dG2').val(data.d[0].LevelId2)
        //$('#dG3').val(data.d[0].LevelId3)
        //$('#dG4').val(data.d[0].LevelId4)
        //$('#dG5').val(data.d[0].LevelId5)
        //$('#dG6').val(data.d[0].LevelId6)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)
        $('#h12').val(data.d[0].LevelId5)
        $('#h13').val(data.d[0].LevelId6)

        // dg6();
        //OnChangeddG4();
    }
    else {
        // $('#dG6').val(-1);
    }
}


function dg1() {

    //$('#dialog').jqm({ modal: true });
    //$('#dialog').jqm();
    //$('#dialog').jqmShow();

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
function dg1WithTeam() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    //levelValue = $('#dG1').val();
    //myData = "{'level1Id':'" + levelValue + "' }";

    levelValue = $('#dG1').val();
    teamId = $('#ddlTeam').val();
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

    $('#dialog').jqmHide();

}
function dg2() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

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

    $('#dialog').jqmHide();

}
function dg2WithTeam() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

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
function dg3() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#dG3').val();
    myData = "{'level3Id':'" + levelValue + "' }";

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

        if ($('#ddl1').val() == "-1" || $('#ddl1').val() == " " || $('#ddl1').val() == null) {

            teamId = $('#ddlTeam').val();
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

            levelValue = $('#dG1').val();
            teamId = $('#ddlTeam').val();
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


    } else if (CurrentUserRole == 'rl1') {

        levelValue = $('#dG2').val();
        teamId = $('#ddlTeam').val();
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

    else {

        levelValue = $('#dG3').val();
        teamId = $('#ddlTeam').val();
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
    myData = "{'level4Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L4",
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

        teamId = $('#ddlTeam').val();
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
        levelValue = $('#dG3').val();
        teamId = $('#ddlTeam').val();
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
        teamId = $('#ddlTeam').val();
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
    myData = "{'level5Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L5",
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

    if (CurrentUserRole == 'rl3') {

        levelValue = $('#dG1').val();
        teamId = $('#ddlTeam').val();
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

            $('#ddl1').val(-1)
            OnChangeddl1();

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

            $('#ddl1').val(-1)
            OnChangeddl1();

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


}
function OnChangeddG2() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }


    if (true) {
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
            $('#ddl2').val(-1)
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

        levelValue = $('#dG3').val();
        teamId = $('#ddlTeam').val();
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
            $('#ddl3').val(-1)
            OnChangeddl3();

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else {
        levelValue = $('#dG3').val();
        myData = "{'level3Id':'" + levelValue + "' }";
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
            $('#ddl3').val(-1)
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


    levelValue = $('#dG4').val();
    teamId = $('#ddlTeam').val();
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
        $('#ddl4').val(-1)
        OnChangeddl4();

        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

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
    myData = "{'level5Id':'" + levelValue + "' }";
    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L5",
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
        $('#ddl5').val(-1)
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

    if ($('#ddlreport').val() == 7) {
        // document.getElementById("Chkself").checked = false;
        $('#Th8').hide();
    }

    G3f();
    //FillMRDr();
    $('#dialog').jqmHide();

}

function onSuccessG1(data, status) {

    if (data.d != '') {
        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        //if (CurrentUserRole == 'rl1') {

        //} else {
        value = '-1';
        name = 'Select ' + $('#Label6').text();;


        $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            var nameslpit = tweet.Item2;
            var splitgm = nameslpit.split("_");
            $("#dG2").append("<option value='" + tweet.Item1 + "'>" + splitgm[1] + "</option>");
        });
        //}


        //if (CurrentUserRole == 'rl1') {
        //    FillTeamsbyBUH();
        //}
    }

}
function onSuccessG1WithTeam(data, status) {

    if (data.d != '') {
        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";


        value = '-1';
        name = 'Select ' + $('#Label6').text();;


        $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            var nameslpit = tweet.Item2;
            var splitgm = nameslpit.split("_");
            $("#dG2").append("<option value='" + tweet.Item1 + "'>" + splitgm[1] + "</option>");
        });




    }

}
function onSuccessG2(data, status) {

    if (data.d != '') {
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        if (CurrentUserRole == 'rl1') {

        } else {
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
            value = '-1';
            name = 'Select ' + $('#Label8').text();

            $("#dG4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitbuh = nameslpit.split("_");
                $("#dG4").append("<option value='" + tweet.Item1 + "'>" + splitbuh[1] + "</option>");
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

        //value = '-1';
        //name = 'Select ' + $('#Label8').text();

        //$("#dG4").append("<option value='" + value + "'>" + name + "</option>");

        //$.each(data.d, function (i, tweet) {
        //    var nameslpit = tweet.Item2;
        //    var splitnsm = nameslpit.split("_");
        //    $("#dG4").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
        //});
        FillTeamsbyBUH();
        if (CurrentUserRole == 'ftm') {
            SetRegionHierarchyForFTM();
        }
    }

}
function onSuccessG3WithTeam(data, status) {

    if (data.d != '') {




        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            if ($("#ddl1").val() != null && $("#dG1").val() == null) {
                value = '-1';
                name = 'Select ' + $('#Label5').text();

                $("#dG1").append("<option value='" + value + "'>" + name + "</option>");

                $.each(data.d, function (i, tweet) {
                    var nameslpit = tweet.Item2;
                    var splitnsm = nameslpit.split("_");
                    $("#dG1").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
                });

            } else if ($("#ddl2").val() != null) {
                value = '-1';
                name = 'Select ' + $('#Label6').text();

                $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

                $.each(data.d, function (i, tweet) {
                    var nameslpit = tweet.Item2;
                    var splitnsm = nameslpit.split("_");
                    $("#dG2").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
                });
            }







        } else if (CurrentUserRole == 'rl1') {
            if ($("#dG3").val() != null) {
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
            } else {
                value = '-1';
                name = 'Select ' + $('#Label7').text();

                $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

                $.each(data.d, function (i, tweet) {
                    var nameslpit = tweet.Item2;
                    var splitnsm = nameslpit.split("_");
                    $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
                });
            }


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
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";


            value = '-1';
            name = 'Select ' + $('#Label5').text();

            $("#dG1").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitrsm = nameslpit.split("_");
                $("#dG1").append("<option value='" + tweet.Item1 + "'>" + splitrsm[1] + "</option>");
            });
        }
    } else if (CurrentUserRole == 'rl1') {
        if (data.d != '') {
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";


            value = '-1';
            name = 'Select ' + $('#Label4').text();

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

    if (CurrentUserRole == 'rl3') {
        levelValue = $('#ddl1').val();
        teamId = $('#ddlTeam').val();
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
        levelValue = $('#ddl1').val();
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

        levelValue = $('#ddl3').val();
        teamId = $('#ddlTeam').val();
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
    }
    else {
        levelValue = $('#ddl3').val();
        myData = "{'employeeId':'" + levelValue + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/datascreen.asmx/GetEmployee",
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


    if (true) {

        levelValue = $('#ddl4').val();
        var teamid = $('#ddlTeam').val();
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
        var teamid = $('#ddlTeam').val();
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
    myData = "{'employeeId':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/datascreen.asmx/GetEmployee",
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

    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if ($("#ddlTeam").val() == "-1") {

    } else {


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
}
function onSuccessUH4(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (CurrentUserRole == 'rl1') {
        FillTeamsbyBUH();
    } else {
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


}
function onSuccessUH5(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";
    if (data.d != "") {
        if (CurrentUserRole == 'rl1') {


            jsonObj = jsonParse(data.d);
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

        jsonObj = jsonParse(data.d);
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

        jsonObj = jsonParse(data.d);
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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {

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

        $('#h5').val($('#dG1').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl4') {

        $('#h12').val($('#dG1').val());

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

    ////setvalue();
    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {

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

        $('#h5').val($('#dG2').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl3') {

        $('#h12').val($('#dG2').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl4') {

        $('#h13').val($('#dG2').val());

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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {

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

        $('#h5').val($('#dG3').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl2') {

        $('#h12').val($('#dG3').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl3') {

        $('#h13').val($('#dG3').val());

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
        success: onSuccessG3c,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}
function G3d() {

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {

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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {

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

    //setvalue();

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'headoffice') {

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
        $('#ddl1').val(data.d[0].Item1)

    }
    else {
        $('#ddl1').val(-1)
    }
    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'marketingteam' ||
           CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2' || CurrentUserRole == 'rl3' ||
           CurrentUserRole == 'rl4' || CurrentUserRole == 'rl5' || CurrentUserRole == 'headoffice') {
        UH3();
    }

}
function onSuccessG3b(data, status) {

    if (data != '') {
        $('#ddl2').val(data.d[0].Item1)

        if (CurrentUserRole == 'rl4') {
            $('#h6').val(data.d[0].Item1)
        }
    }
    else {
        $('#ddl2').val(-1)
    }
    if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2' || CurrentUserRole == 'rl3' ||
           CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'marketingteam' || CurrentUserRole == 'headoffice') {
        UH4();
    }

}
function onSuccessG3c(data, status) {

    if (data != '') {
        $('#ddl3').val(data.d[0].Item1)

        if (CurrentUserRole == 'rl3') {
            $('#h6').val(data.d[0].Item1)

        }
    }
    else {
        $('#ddl3').val(-1)
    }


    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'rl1' ||
        CurrentUserRole == 'rl2' || CurrentUserRole == 'marketingteam' || CurrentUserRole == 'headoffice') {
        UH5();
    }

}
function onSuccessG3d(data, status) {

    if (data != '') {

        $('#ddl4').val(data.d[0].Item1)

        if (CurrentUserRole == 'rl3') {
            $('#h6').val(data.d[0].Item1)
        }

    }
    else {
        $('#ddl4').val(-1)
    }

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'rl1' ||
           CurrentUserRole == 'rl2' || CurrentUserRole == 'marketingteam' || CurrentUserRole == 'headoffice') {
        UH6();
    }

}
function onSuccessG3e(data, status) {

    if (data != '') {
        $('#ddl5').val(data.d[0].Item1)

        if (CurrentUserRole == 'rl3') {
            $('#h6').val(data.d[0].Item1)
        }
    }
    else {
        $('#ddl5').val(-1)
    }

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'rl1' ||
        CurrentUserRole == 'rl2' || CurrentUserRole == 'marketingteam' || CurrentUserRole == 'headoffice') {
        UH7();
    }
}
function onSuccessG3f(data, status) {

    if (data != '') {

        $('#ddl6').val(data.d[0].Item1)
        $('#h6').val(data.d[0].Item1);


    }
    else {
        $('#ddl6').val(-1)
    }
    UH8();

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

function onSuccessMioFill(data, status) {

    $('#newtable').empty();
    $('#newtable').append($('<table class="responstable"> <thead> <tr style="background-color: rgb(100, 146, 207); color: white;">'
        + '<td> Time For Call </td> '
        + '<td> Name </td> '
        + '<td>Last Doctor/Chemist Visit</td> '
        + '<td>Next Doctor/Chemist Visit</td> '
        + '<td>No of Chemist Visited</td> '
        + '<td>No of Doctor Visited</td> '
        + '<td>Sales Achived Yesterday</td>'
        + '<td>Sales Forcast Today</td>'
        + '<td>Spot Check</td> </tr></thead><tbody id="newbody">'));
    if (data.d == "[]") {
        $('#newbody').append($('<tr> '
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
        var msg = jQuery.parseJSON(data.d);
        $.each(msg, function (i, option) {
            $('#newbody').append($('<tr> '
                                    + '<td>' + option.TimeForCall + '</td> '
                                    + '<td>' + option.name + '</td> '
                                    + '<td>' + option.lastdocvisit + '</td>'
                                    + '<td>' + option.nextdoc + '</td> '
                                    + '<td>' + option.Noofchem + '</td> '
                                    + '<td>' + option.noofdocvisited + '</td> '
                                    + '<td> -- </td>'
                                    + '<td> -- </td> '
                                    + '<td><img src="../assets/img/map-icon.png" style="cursor:pointer;" onclick="calldetailspage(\'' + option.nextdoc + '/' + option.lastdocvisit + '/' + option.name + '/' + option.mobno + '/medrep\')" /></td></tr>'));
        });
    }
    //<a href = "CallDetail.aspx?nextdoc=' + option.nextdoc + "/" + option.lastdocvisit + "/" + option.name + "/" + option.mobno +"/medrep"+ '" target="popup">view</a>
    //
    $('#newtable').append($('</tbody></table>'));
    $('#ContainerPlannedvsAcutalCalls').parent().find('.loding_box_outer').show().fadeOut();
}

function FillFlmDetails() {
    if ($('#L6').val() == '0' || $('#L6').val() == 'undefined') {
        $('#ContainerPlannedvsAcutalCalls').parent().find('.loding_box_outer').show().fadeIn();
        //  myData = "{'Level3':'"+$('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "'}";
        myData = "{'Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "'}";
        $.ajax({
            type: "POST",
            url: "NewDashboard.asmx/Mfillflmdetails",
            data: myData,
            contentType: "application/json",
            //async: false,
            success: fillflmdetailss,
            error: onError,
            complete: onComplete,
            cache: false
        });
    }
    else {
        $('#ContainerPlannedvsAcutalCalls').parent().find('.loding_box_outer').show().fadeIn();

        myData = "{'Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "'}";
        $.ajax({
            type: "POST",
            url: "NewDashboard.asmx/FillGridMioInfo",
            data: myData,
            contentType: "application/json",
            //async: false,
            success: onSuccessMioFill,
            error: onError,
            complete: onComplete,
            cache: false
        });
    }

}

function CallAllCharts() {
    $('#customerCov').parent().find('.loding_box_outer').show().fadeIn();
    $('#prodfre').parent().find('.loding_box_outer').show().fadeIn();
    $('#complete').parent().find('.loding_box_outer').show().fadeIn();
    $('#complete').parent().find('.loding_box_outer').show().fadeIn();
    $('#ContainerDocCountClassWiseChart').parent().find('.loding_box_outer').show().fadeIn();
    $('#ContainerPlannedvsAcutalCalls').parent().find('.loding_box_outer').show().fadeIn();
    $('#ContainerVisitFrequency').parent().find('.loding_box_outer').show().fadeIn();
    $('#ContainerBrandChart').parent().find('.loding_box_outer').show().fadeIn();
    $('#ContainerSpecialityChart').parent().find('.loding_box_outer').show().fadeIn();
    $('#ContainerDocCountSpecialityWiseChart').parent().find('.loding_box_outer').show().fadeIn();
    $('#TotalDoctorsPlannedvsAcutalCalls').parent().find('.loding_box_outer').show().fadeIn();
    $('#ContainerAverageCalls').parent().find('.loding_box_outer').show().fadeIn();
    $('#ContanerDailyCallTrend').parent().find('.loding_box_outer').show().fadeIn();
    $('#container2').parent().find('.loding_box_outer').show().fadeIn();

    myData = "{'date':'" + startdate +
           "','endate':'" + enddate +
           "' ,'Level1':'" + $('#L1').val() +
           "','Level2':'" + $('#L2').val() +
           "','Level3':'" + $('#L3').val() +
           "','Level4':'" + $('#L4').val() +
           "','Level5':'" + $('#L5').val() +
           "','Level6':'" + $('#L6').val() +
           "','EmployeeId':'" + employeeIDFORDATA +
            "','TeamId':'" + $('#L7').val()
           + "'}";
    $.ajax({
        type: "POST",
        url: "NewDashboard.asmx/AllChartsData",
        contentType: "application/json; charset=utf-8",
        //async: true,
        data: myData,
        success: OnSuccessCallAllCharts,
        error: onError,
        cache: false
    });


}

function OnSuccessCallAllCharts(data, status) {
    if (data != '') {
        const myArr = data.d.split("~");

        OnSuccessbarCustomerCov(myArr[0], '');
        OnSuccessbarChartProdfre(myArr[1], '');
        OnSuccessCallsperday(myArr[2], '');
        OnSuccessGetSPOsCount(myArr[3], '');
        onSuccessDocCountClassWise(myArr[4], '');
        OnSuccessTotalDocsPlannedVsActualCalls(myArr[5], '');
        OnSuccessPlannedVsActualCalls(myArr[6], '');
        onSuccessBrands(myArr[7], '');
        onSuccessSpeciality(myArr[8], '');
        onSuccessDocCountSpecialityWise(myArr[9], '');
        OnSuccessDailyCallTrend(myArr[10], '');
        OnSuccessAverageCalls(myArr[11], '');
        onSuccessDailyCall(myArr[12], '');
        OnSuccessVisitFrequency(myArr[13], '');
        onSuccessTop5(myArr[14], '');
        onSuccessBottom5(myArr[15], '');
        OnSuccessbarEstworkingdays(myArr[16], '');
        OnSuccessdaysinfield(myArr[17], '');
    }
}

function callCharts() {


    CallAllCharts();


    //barchartCustomerCov();
    //barchartProdfre();
    //barchartEstworkingdays();
    //callsperday();
    //daysinfield();
    //GetSPOsCount();
    //DocCountClassWise();
    //TotalDocsPlannedVsActualCalls();
    //PlannedVsActualCalls();
    //FillBrandsDetails();
    //fillSpecialityCovered();
    //DocCountSpecialityWise();
    //DailyCallTrend();
    //GetAverageCalls();
    //FillGridDailyCall();
    //VisitFrequency();
}

function viewCharts() {

    $('.overlay')[0].style.display = 'none';
    $("body").css("overflow", "scroll");
    callCharts();
}

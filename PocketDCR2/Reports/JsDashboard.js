Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i].toString() === obj.toString()) {
            return true;
        }
    }
    return false;
}

var employeeIDFORDATA = "0";
var CurrentUserRole = 0;
var startDateValidate = "0";
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

    IsValidUser();
    $('#ddl1').change(OnChangeddl1);
    $('#ddl2').change(OnChangeddl2);
    $('#ddl3').change(OnChangeddl3);
    $('#ddl4').change(OnChangeddl4);
    $('#ddl5').change(OnChangeddl5);
    $('#tableddl1').change(OnChangetableddl);
    $('#txtDate').change(OnChangedtxtDate);
    HideHierarchy();
    GetCurrentUser();
}
function OnChangedtxtDate() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    //IsValidUser();
    $('#dialog').jqmHide();
}

function OnshowResultClick() {
  
    if ( startDateValidate==0) {
        alert("Please provide correct formated Date...!");

    }
    else {
        
        IsValidUser();
    }
}

function IsValidUser() {

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/IsValidUser",
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

        if ($('#ddl4').val() != null) {
            level6 = $('#ddl4').val();
        } else {
            level6 = -1
        }


        startdate = $('#txtDate').val();

        if (level6 != -1) {
            GetCurrentLevelIDs(level6);
        } else if (level5 != -1) {
            GetCurrentLevelIDs(level5);
        } else if (level4 != -1) {
            GetCurrentLevelIDs(level4);
        } else if (level3 != -1) {
            GetCurrentLevelIDs(level3);
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

    $('#Actcall').jqm({ modal: true });
    $('#Actcall').jqm();
    $('#Actcall').jqmShow();

    //barchartEstworkingdays();

    //barchartProdfre();

    //barchartCustomerCov();

    //callsperday();

    //daysinfield();

    //ActualCallWork();

    //DailyCallTrend();

    //PlannedVsActualCalls();

    //VisitFrequency();

    GetAverageCalls();

    //FillGridTop5();

    //FillGridBottom5();

    //FillGridDailyCall();

    //FillGridBottom51();

    //SMSCorrectness();

    // New Dashboard Working Attach here.
    barchartEstworkingdays_EstDaysnational();
    barchartEstworkingdays_National();
    barchartEstworkingdays_Acer_Team();
    barchartEstworkingdays_AdvanceTeam();
    barchartEstworkingdays_AlphaTeam();
    barchartEstworkingdays_DynamicTeam();
    barchartEstworkingdays_Elite_Team();
    barchartEstworkingdays_Galaxy_Team();
    barchartEstworkingdays_MassTeam();
    barchartProdfreForNewDb();
    barchartCustomerCovForNewDb();
    DailyCallTrendForNewDb();
    PlannedVsActualCallsForNEWDB();
    FillGridDailyCallForNewDb();
    GetAverageCalls();
    GetAverageCallsForTeam();
    FillGridTopForNewDb();
    // New Dashboard Working Attach here.

}

function ActualCallWork() {
    $('#container2').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'" + employeeIDFORDATA + "'}";
    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/StartActualCallsWork",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessActualCallWork,
        error: onError,
        cache: false
    });

}
function OnSuccessActualCallWork(data, status) {

    var json = jsonParse(data.d);
    var jsondata = [];
    for (var i in json) {
        // var serie = new Array(json[i].Projects, json[i].Bugs);
        jsondata.push([json[i].x, json[i].y]);
    }

    //    Highcharts.getOptions().colors = $.map(Highcharts.getOptions().colors, function (color) {
    //        return {
    //            radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
    //            stops: [
    //		            [0, color],
    //		            [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
    //		        ]
    //        };
    //    });

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

function barchartProdfre() {
    $('#prodfre').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'"
        + startdate + "','Level1':'"
        + $('#L1').val() + "','Level2':'"
        + $('#L2').val() + "','Level3':'"
        + $('#L3').val() + "','Level4':'"
        + $('#L4').val() + "','Level5':'"
        + $('#L5').val() + "','Level6':'"
        + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";
    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/ProdFreClass",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessbarChartProdfre,
        error: onError,
        cache: false
    });
}

function OnSuccessbarChartProdfre(data, status) {

    var dataser1 = [7, 12, 16, 0];

    var OSA = [];//random Data
    var OSD = [];
    var OSAProd = [];//Asc Data in categories
    if (data.d != null) {
        var dataser = jsonParse(data.d);
        $.each(dataser, function (i, option) {
            OSA.push(parseFloat([option.ProdFreq]));

        });
    }
    var dataSum = 0;
    for (var i = 0; i < OSA.length; i++) {
        dataSum += OSA[i]
    }
    if (OSA.length > 0) {
        OSAProd.push(parseFloat([OSA[3]]));
        OSAProd.push(parseFloat([OSA[0]]));
        OSAProd.push(parseFloat([OSA[1]]));
        OSAProd.push(parseFloat([OSA[2]]));
        OSAProd.push(parseFloat([OSA[4]]));

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
                '#2484C6'
        ],
        credits: { enabled: false },
        legend: {
        },
        tooltip: {
            backgroundColor: '#2484C6',
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
            categories: ['PF A+', 'PF A', 'PF B', 'PF C', 'PF D'],
            labels: {
                style: {
                    fontWeight: 'bold'
                }
            },
        },

        yAxis: {
            title: {
                text: ''
            }
        },

        series: [{
            showInLegend: false,
            data: OSAProd

        }]
    });
    $('#prodfre').parent().find('.loding_box_outer').show().fadeOut();

}

function barchartCustomerCov() {
    $('#customerCov').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'"
        + startdate + "','Level1':'"
        + $('#L1').val() + "','Level2':'"
        + $('#L2').val() + "','Level3':'"
        + $('#L3').val() + "','Level4':'"
        + $('#L4').val() + "','Level5':'"
        + $('#L5').val() + "','Level6':'"
        + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";
    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/customercoveragebyclass",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessbarCustomerCov,
        error: onError,
        cache: false
    });
}

function OnSuccessbarCustomerCov(data, status) {

    var dataser1 = [7, 12, 16, 0];

    var OSA = [];//Random Data from Proc
    var OSD = [];
    var OSAFinal = [];//Asc Data from ploting
    if (data.d != null) {
        var dataser = jsonParse(data.d);
        $.each(dataser, function (i, option) {
            OSA.push(parseFloat([option.CustomerCoverage]));

        });
    }

    var dataSum = 0;
    for (var i = 0; i < OSA.length; i++) {
        dataSum += OSA[i]
    }
    //plote values in categoriess
    if (OSA.length > 0) {
        OSAFinal.push(parseFloat([OSA[3]]));//A+
        OSAFinal.push(parseFloat([OSA[0]]));//A
        OSAFinal.push(parseFloat([OSA[1]]));//B
        OSAFinal.push(parseFloat([OSA[2]]));//C
        OSAFinal.push(parseFloat([OSA[4]]));//D

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
                '#2484C6'
        ],
        credits: { enabled: false },
        legend: {
        },
        tooltip: {
            backgroundColor: '#2484C6',
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
            categories: ['A+', 'A', 'B', 'C', 'D'],
            labels: {
                style: {
                    fontWeight: 'bold'
                }
            },
        },

        yAxis: {
            title: {
                text: ''
            }
        },

        series: [{
            showInLegend: false,
            data: OSAFinal

        }]
    });
    $('#customerCov').parent().find('.loding_box_outer').show().fadeOut();

}

function barchartEstworkingdays() {
    

    $('#container2').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'"
        + startdate + "','endate':'" + enddate +
        "','Level1':'" + $('#L1').val() + "','Level2':'"
        + $('#L2').val() + "','Level3':'"
        + $('#L3').val() + "','Level4':'"
        + $('#L4').val() + "','Level5':'"
        + $('#L5').val() + "','Level6':'"
        + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";
    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    alert(myData);

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/estworkinddays",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessbarEstworkingdays,
        error: onError,
        cache: false
    });
}

function OnSuccessbarEstworkingdays(data, status) {

    var dataser1 = [7, 12, 16, 0];

    var OSA = [];

    if (data.d != null) {

        var dataser = jsonParse(data.d);

        $.each(dataser, function (i, option) {

            OSA.push(parseFloat([option.NewRecord2]));
        });
    }

    //var OSA = [];
    //var OSD = [];
    //if (data.d != null) {
    //    var dataser = jsonParse(data.d);
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
                '#2484C6'
        ],
        credits: { enabled: false },
        legend: {
        },
        tooltip: {
            backgroundColor: '#2484C6',
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
            },
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

function callsperday() {
    $('#complete').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'"
        + startdate + "','Level1':'"
        + $('#L1').val() + "','Level2':'"
        + $('#L2').val() + "','Level3':'"
        + $('#L3').val() + "','Level4':'"
        + $('#L4').val() + "','Level5':'"
        + $('#L5').val() + "','Level6':'"
        + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";
    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/callsperday",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessCallsperday,
        error: onError,
        cache: false
    });
}
function OnSuccessCallsperday(data, status) {

    var datacallperday;
    if (data.d != null) {
        var dataser = jsonParse(data.d);
        $.each(dataser, function (i, option) {
            datacallperday = parseFloat([option.CallPerDay]);
        });
    }

    $('#h1callperday').empty();
    $('#h1callperday').text(datacallperday);

    $('#pcallperdayText').empty();
    $('#pcallperdayText').text('Call per day');



    $('#complete').parent().find('.loding_box_outer').show().fadeOut();

}

function daysinfield() {
    $('#complete').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'"
        + startdate + "','Level1':'"
        + $('#L1').val() + "','Level2':'"
        + $('#L2').val() + "','Level3':'"
        + $('#L3').val() + "','Level4':'"
        + $('#L4').val() + "','Level5':'"
        + $('#L5').val() + "','Level6':'"
        + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";
    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/daysinfield",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessdaysinfield,
        error: onError,
        cache: false
    });
}

function OnSuccessdaysinfield(data, status) {

    var dayinfield;
    if (data.d != null) {
        var dataser = jsonParse(data.d);
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

function DailyCallTrend() {
    $('#ContanerDailyCallTrend').parent().find('.loding_box_outer').show().fadeIn();
    // myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'" + employeeIDFORDATA + "'}";

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/StartDailyCallTrendWork",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessDailyCallTrend,
        error: onError,
        cache: false
    });

}
function OnSuccessDailyCallTrend(data, status) {
    if (data != '') {
        var json = jsonParse(data.d);
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
                    color: '#1B1464'
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
                data: json[0].data,
                color: '#2484C6'
            }
            ,
            {
                name: 'Target Calls',
                data: [13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0,
                13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0,
                13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0],
                color: '#1B1464'
            }
            ]
        });
    }
    $('#ContanerDailyCallTrend').parent().find('.loding_box_outer').show().fadeOut();
}

function VisitFrequency() {
    $('#ContainerVisitFrequency').parent().find('.loding_box_outer').show().fadeIn();
    //    myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/StartVisitFrequency",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessVisitFrequency,
        error: onError,
        cache: false
    });

}
function OnSuccessVisitFrequency(data, status) {

    var json = jsonParse(data.d);
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

function PlannedVsActualCalls() {
    $('#ContainerPlannedvsAcutalCalls').parent().find('.loding_box_outer').show().fadeIn();
    // myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";

    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/PlannedVsActualCalls",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessPlannedVsActualCalls,
        error: onError,
        cache: false
    });


}
function OnSuccessPlannedVsActualCalls(data, status) {

    var json = jsonParse(data.d);
    var Series1Name = json[0].name;
    var jsondata = []; //Random Data Fatch

    for (var i = 0; i < json.length; i++) {
        jsondata.push({ name: json[i].name, data: [json[i].data[3], json[i].data[0], json[i].data[1], json[i].data[2], json[i].data[4]] });
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
                    'A+',
                    'A',
                    'B',
					'C',
					'D'
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
                //colorByPoint: true

            }
        },
        //colors: ['#1B1464', '#2484C6'],

        series: jsondata,

        color: '#FFf',
        negativeColor: '#1B8753'


    });
    $('#ContainerPlannedvsAcutalCalls').parent().find('.loding_box_outer').show().fadeOut();
}


function GetAverageCalls() {
   
    $('#ContainerAverageCalls').parent().find('.loding_box_outer').show().fadeIn();
    //    myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
    myData = "{'date':'" + startdate + "','endate':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";
         
    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/GetAverageCalls",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessAverageCalls,
        error: onError,
        cache: false
    });


}
function OnSuccessAverageCalls(data, status) {

    var json = Number(jsonParse(data.d));
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
                color: '#2484C6' // green
            }, {
                from: 12,
                to: 30,
                color: '#1B1464' // yellow
            }]
        },

        series: [{
            name: 'MTD AVG CALLS',
            data: [json]
        }]

    });
    $('#ContainerAverageCalls').parent().find('.loding_box_outer').show().fadeOut();

}

//function FillGridTop5() {

//    //    myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
//    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "'}";


//    $.ajax({
//        type: "POST",
//        url: "ActiveInActiveDashboard.asmx/Top5Mr",
//        data: myData,
//        contentType: "application/json",
//        async: false,
//        success: onSuccessTop5,
//        error: onError,
//        complete: onComplete,
//        cache: false
//    });

//}
//function onSuccessTop5(data, status) {

//    $('#top5div #top5table').remove();
//    $('#top5div').prepend($('<table class="mGrid1" cellspacing="0" cellpadding="2" id="top5table" style="width:100%;border-collapse:collapse;"><tr style="font-weight:bold;color:#1B1464"><th scope="col">MR</th><th style="color:#1B1464;" scope="col">Average Calls</th></tr>'));
//    $.each(data.d, function (i, option) {
//        $('#top5table').append($('<tr><td style="color:#2484C6">' + option.mr + '</td><td style="color:#2484C6;"align="center">' + option.avg + '</td></tr>'));
//    });
//    $('#top5div').append($('</table>'));

//}

//function FillGridBottom5() {

//    // myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
//    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "'}";

//    $.ajax({
//        type: "POST",
//        url: "ActiveInActiveDashboard.asmx/Bottom5Mr",
//        data: myData,
//        contentType: "application/json",
//        async: false,
//        success: onSuccessBottom5,
//        error: onError,
//        complete: onComplete,
//        cache: false
//    });

//}
//function onSuccessBottom5(data, status) {

//    $('#bottom5div #bottom5table').remove();
//    $('#bottom5div').prepend($('<table class="mGrid1" cellspacing="0" cellpadding="2" id="bottom5table" style="width:100%;border-collapse:collapse;color:#1B1464""><th scope="col">MR</th><th style="color:#1B1464; scope="col">Average Calls</th></tr>'));
//    $.each(data.d, function (i, option) {
//        $('#bottom5table').append($('<tr><td style="color:#2484C6">' + option.mr + '</td><td style="color:#2484C6;"align="center">' + option.avg + '</td></tr>'));
//    });
//    $('#bottom5div').append($('</table>'));

//}

//function FillGridDailyCall() {

//    //myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
//    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
//        + employeeIDFORDATA + "'}";


//    $.ajax({
//        type: "POST",
//        url: "ActiveInActiveDashboard.asmx/DailyCall",
//        data: myData,
//        contentType: "application/json",
//        async: false,
//        success: onSuccessDailyCall,
//        error: onError,
//        complete: onComplete,
//        cache: false
//    });

//}
//function onSuccessDailyCall(data, status) {

//    $('#dailycalldiv #dailycalltable').remove();


//    $('#dailycalldiv').prepend($('<table id="dailycalltable" border="0" style="background-color: #D8D0C9;border-bottom-width: medium; border-color: #D8D0C9" width="900px">'));
//    $('#dailycalltable').append($('<tr><td style="font-family: News Gothic MT; color:#fff" class="style8" bgcolor="#2484C6">Day</td></tr>'));

//    for (var i = 1; i <= 31; i++) {

//        $('#dailycalltable tr:first-child').append($('<td style="Color:#fffff;text-align:Center;" bgcolor="#2484C6" width="27px" align="left">' + i + '</td>'));

//    }
//    $('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style7" bgcolor="#2484C6">Calls</td>'));
//    var ji = 0;
//    var l = 31;
//    var t = 0;
//    var p = 'C';


//    $.each(data.d, function (i, option) {
//        t++;
//    });
//    jj = 1;
//    for (var ii = 1; ii <= 31; ii++) {
//        var flag = false;
//        $.each(data.d, function (i, option) {
//            var cday = data.d[i].days;
//            var cvalue = data.d[i].correctsms;
//            if (parseInt(cday) === ii) {
//                $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> <a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a> </td>'));
//                flag = true;
//            }
//        });

//        if (flag == false) {
//            $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> 0  </td>'));
//            flag = false;
//        }
//    }

//    var p = 'M';
//    //    $('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style8" bgcolor="#A28F7F">MIOs</td>'));
//    $('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style8" bgcolor="#2484C6"><a style="color:#fff;" href="" onclick="return ShowMRDetails();">TMs</a> </td>'));
//    for (var ii = 1; ii <= 31; ii++) {
//        var flag = false;
//        $.each(data.d, function (i, option) {
//            var cday = data.d[i].days;
//            var cvalue = data.d[i].mios;
//            if (parseInt(cday) === ii) {
//                // $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> <a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a> </td>'));
//                $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"><a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a></td>'));

//                flag = true;
//            }
//        });

//        if (flag == false) {
//            $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
//            flag = false;
//        }
//    }

//    $('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style9" bgcolor="#2484C6">Avg Calls</td>'));
//    for (var ii = 1; ii <= 31; ii++) {
//        var flag = false;
//        $.each(data.d, function (i, option) {
//            var cday = data.d[i].days;
//            var cvalue = data.d[i].avgc;
//            if (parseInt(cday) === ii) {
//                $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;">' + cvalue + '</td>'));

//                flag = true;
//            }
//        });

//        if (flag == false) {
//            $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
//            flag = false;
//        }
//    }

//    $('#dailycalltable').append($('</tr>'));
//    $('#dailycalldiv').append($('</table>'));

//}


var da, pa;

function BeforPOP(day, para) {
   
    debugger
    myData = "{'Level1':'"
        + $('#L1').val() + "','Level2':'"
        + $('#L2').val() + "','Level3':'"
        + $('#L3').val() + "','Level4':'"
        + $('#L4').val() + "','Level5':'"
        + $('#L5').val() + "','Level6':'"
        + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";
    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/GetLevelsID",
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
        url: "ActiveInActiveDashboard.asmx/Bottom5Mr1",
        data: myData,
        contentType: "application/json",
        async: false,
        success: onSuccessBottom51,
        error: onError,
        complete: onComplete,
        cache: false
    });

}
function onSuccessBottom51(data, status) {

    $('#bottom5div #bottom5table').remove();
    $('#bottom5div').prepend($('<table class="mGrid1" cellspacing="0" cellpadding="2" id="bottom5table" style="width:100%;border-collapse:collapse;"><th scope="col">MR</th><th scope="col">Average Calls</th></tr>'));
    $.each(data.d, function (i, option) {
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
        url: "ActiveInActiveDashboard.asmx/SmsCorrectness",
        data: myData,
        contentType: "application/json",
        async: false,
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

    var json = jsonParse(data.d);
    var Series1Name = json[0].name;
    var jsondata = [];
    for (var i in json) {
        jsondata.push(json[i].data);
    }

    var abc;

    var chart;
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
                                url: "ActiveInActiveDashboard.asmx/GetLevelsID",
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
                                url: "ActiveInActiveDashboard.asmx/GetLevelsID",
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
   
         debugger
    var level1id, level2id, level3id, level4id, level5id, level6id, employeID;

    var json1 = jsonParse(data.d);
    level1id = json1[0].levelvalue;
    level2id = json1[1].levelvalue;
    level3id = json1[2].levelvalue;
    level4id = json1[3].levelvalue;
    level5id = json1[4].levelvalue;
    level6id = json1[5].levelvalue;
    employeID = json1[6].levelvalue;

    OpenPopup(da, pa, level1id, level2id, level3id, level4id, level5id, level6id, employeID);
}

function OpenPopup(day, parameter1,Level1, Level2, Level3, Level4, Level5, Level6, employeeid) {

    //alert('Popup ' + parameter1 + ' for day :' + day);
    var ddlReport = $('#txtDate').val();
    // var ddlReport = document.getElementById("<%=txtDate.ClientID%>");
    //alert(ddlReport.value);

    if (parameter1 == "M") {
        //window.open("./Report_Calls.aspx?Day=" + day, "Calls", "status = 0, height = 850, width = 700, resizable = 1");
        //  window.showModalDialog("./Report_Calls.aspx?Day=" + day + "&Month=" + ddlReport + "&Level3=" + Level3 + "&Level4=" + Level4 + "&Level5=" + Level5 + "&Level6=" + Level6 + "&employeeid=" + employeeid, "Calls", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
        window.open("./Report_Calls.aspx?Day=" + day + "&Month=" + ddlReport + "&Level1=" + Level1 + "&Level2=" + Level2 + "&Level3=" + Level3 + "&Level4=" + Level4 + "&Level5=" + Level5 + "&Level6=" + Level6 + "&employeeid=" + employeeid + "&flag=1", "Calls", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
      
    }
    else if (parameter1 == "C") {
        //window.open("./Report_MIO.aspx?Day=" + day, "Calls", "status = 0, height = 850, width = 700, resizable = 1");
        //window.showModalDialog("./Report_MIO.aspx?Day=" + day + "&Month=" + ddlReport + "&Level3=" + Level3 + "&Level4=" + Level4 + "&Level5=" + Level5 + "&Level6=" + Level6 + "&employeeid=" + employeeid, "Calls", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
        window.open("./Report_MIO.aspx?Day=" + day + "&Month=" + ddlReport + "&Level1=" + Level1 + "&Level2=" + Level2 + "&Level3=" + Level3 + "&Level4=" + Level4 + "&Level5=" + Level5 + "&Level6=" + Level6 + "&employeeid=" + employeeid + "&flag=1", "Calls", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");

    }

    return false;
}
function ShowMRDetails() {
    //alert('test');
    var ddlReport = $('#txtDate').val();
    // window.showModalDialog("./MRDaywiseCallDetails.aspx?Month=" + ddlReport + "&Rndm=" + Math.floor(Math.random() * 101), "Calls", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
    window.open("./MRDaywiseCallDetails.aspx?Month=" + ddlReport + "&Rndm=" + Math.floor(Math.random() * 101), "Calls", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");

    return false;
}
function ShowSMSCorrectnessReport(day, datasettype, value, Zone, MR, Level3id, Level4id, Level5id, Level6id, employeeid) {
    //alert('test');

    var ddlReport = $('#txtDate').val();
    //  var ddlReport = document.getElementById("<%=txtDate.ClientID%>");
  //  window.showModalDialog("./SMSCorrectnessReport.aspx?Day=" + day + "&DataSetType=" + datasettype + "&Value=" + value + "&Zone=" + Zone + "&MR=" + MR + "&Month=" + ddlReport + "&Level3=" + Level3id + "&Level4=" + Level4id + "&Level5=" + Level5id + "&Level6=" + Level6id + "&employeeid=" + employeeid, "SMS Correctness Report", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
    window.open("./SMSCorrectnessReport.aspx?Day=" + day + "&DataSetType=" + datasettype + "&Value=" + value + "&Zone=" + Zone + "&MR=" + MR + "&Month=" + ddlReport + "&Level3=" + Level3id + "&Level4=" + Level4id + "&Level5=" + Level5id + "&Level6=" + Level6id + "&employeeid=" + employeeid, "SMS Correctness Report", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");

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
        cache: false
    });
}
function onSuccessGetCurrentUser(data, status) {
debugger
    if (data.d != "") {

        EmployeeId = data.d;
    }

    GetCurrentUserLoginID();
}
function GetCurrentUserLoginID() {
      debugger
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
           debugger
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
        debugger
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
                  debugger
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
    
                            debugger
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
   
    debugger
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


    //if (glbVarLevelName == "Level3") {

    //    if (CurrentUserRole == 'admin') {

    //        $('#col1').show();
    //        $('#col2').show();
    //        $('#col3').show();
    //        $('#col4').show();
    //        $('#col11').show();
    //        $('#col22').show();
    //        $('#col33').show();
    //        $('#col44').show();



    //        FillDropDownList();
    //    }
    //    if (CurrentUserRole == 'marketingteam') {

    //        $('#col1').show();
    //        $('#col2').show();
    //        $('#col3').show();
    //        $('#col4').show();
    //        $('#col11').show();
    //        $('#col22').show();
    //        $('#col33').show();
    //        $('#col44').show();



    //        FillDropDownList();
    //    }
    //    if (CurrentUserRole == 'rl3') {
    //        $('#col1').show();
    //        $('#col2').show();
    //        $('#col3').show();
    //        $('#col11').show();
    //        $('#col22').show();
    //        $('#col33').show();

    //        FillDropDownList();
    //    }
    //    if (CurrentUserRole == 'rl4') {
    //        $('#col1').show();
    //        $('#col2').show();

    //        $('#col11').show();
    //        $('#col22').show();

    //        FillDropDownList();
    //    }
    //    if (CurrentUserRole == 'rl5') {
    //        $('#col1').show();
    //        $('#col11').show();
    //        FillDropDownList();
    //    }
    //}
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

        //if (glbVarLevelName == "Level1") {
        //if (glbVarLevelName == "Level3") {

        document.getElementById('ddl1').innerHTML = "";
        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

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

        ////$("#ddl1").append("<option value='" + value + "'>" + name + "</option>");
        //$("#ddl1").append("<option value='" + value + "'>" + "Select Employee" + "</option>");
        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});
        ////}



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

        //IsValidUser();
    }

}
//function onSuccessFillDropDownList(data, status) {

//    if (data.d != "") {

//        jsonObj = jsonParse(data.d);

//        if (glbVarLevelName == "Level3") {

//            document.getElementById('ddl1').innerHTML = "";
//            document.getElementById('ddl2').innerHTML = "";
//            document.getElementById('ddl3').innerHTML = "";
//            document.getElementById('ddl4').innerHTML = "";

//            value = '-1';

//            if (CurrentUserRole == 'admin') {
//                name = 'Select ' + HierarchyLevel3;
//                $('#Label1').append(HierarchyLevel3);
//                $('#Label2').append(HierarchyLevel4);
//                $('#Label3').append(HierarchyLevel5);
//                $('#Label4').append(HierarchyLevel6);
//            }
//            if (CurrentUserRole == 'marketingteam') {
//                name = 'Select ' + HierarchyLevel3;
//                $('#Label1').append(HierarchyLevel3);
//                $('#Label2').append(HierarchyLevel4);
//                $('#Label3').append(HierarchyLevel5);
//                $('#Label4').append(HierarchyLevel6);
//            }
//            if (CurrentUserRole == 'rl3') {
//                name = 'Select ' + HierarchyLevel4;
//                $('#Label1').append(HierarchyLevel4);
//                $('#Label2').append(HierarchyLevel5);
//                $('#Label3').append(HierarchyLevel6);
//            }
//            if (CurrentUserRole == 'rl4') { name = 'Select ' + HierarchyLevel5; $('#Label1').append(HierarchyLevel5); $('#Label2').append(HierarchyLevel6); }
//            if (CurrentUserRole == 'rl5') { name = 'Select ' + HierarchyLevel6; $('#Label1').append(HierarchyLevel6); }
//            $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");
//            $.each(jsonObj, function (i, tweet) {
//                $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
//            });
//        }

//    }
//}


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
            cache: false
        });


    } else {

        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
    }

}
function onSuccessFillddl1(data, status) {

    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);


        value = '-1';
        name = 'Select ' + HierarchyLevel2;
        //$("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});


        $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            //$("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            if ($("#ddlstatus").val() == 'all') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(InActive)') {
                    $("#ddl2").append("<option style='background-color: #f57575;' value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                } else {
                    $("#ddl2").append("<option  style='background-color: #ffffff;' value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                }
            }
            if ($("#ddlstatus").val() == 'active') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(Active)') {
                    $("#ddl2").append("<option  value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                }
            }
        });

    }
    //IsValidUser();


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
    }


}
function onSuccessFillddl2(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);


        value = '-1';
        name = 'Select ' + HierarchyLevel3;
        

        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            //$("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            if ($("#ddlstatus").val() == 'all') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(InActive)') {
                    $("#ddl3").append("<option style='background-color: #f57575;' value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                } else {
                    $("#ddl3").append("<option style='background-color: #ffffff;' value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                }
            }
            if ($("#ddlstatus").val() == 'active') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(Active)') {
                    $("#ddl3").append("<option  value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                }
            }
        });
    }
    //IsValidUser();


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
    }


}
function onSuccessFillddl3(data, status) {
    document.getElementById('ddl4').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);


        value = '-1';
        name = 'Select ' + HierarchyLevel4;
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");
        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});


        $.each(jsonObj, function (i, tweet) {
            //$("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            if ($("#ddlstatus").val() == 'all') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(InActive)') {
                    $("#ddl4").append("<option style='background-color: #f57575;' value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                } else {
                    $("#ddl4").append("<option style='background-color: #ffffff;' value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                }
            }
            if ($("#ddlstatus").val() == 'active') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(Active)') {
                    $("#ddl4").append("<option  value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                }
            }
        });
    }
    //IsValidUser();


}

function OnChangeddl4() {



    levelValue = $('#ddl4').val();
    myData = "{'employeeId':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "datascreen.asmx/GetEmployee",
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
    }

    //IsValidUser();

}
function onSuccessFillddl4(data, status) {

    document.getElementById('ddl5').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);


        value = '-1';
        name = 'Select ' + HierarchyLevel5;
        $("#ddl5").append("<option value='" + value + "'>" + name + "</option>");

        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl5").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});

        $.each(jsonObj, function (i, tweet) {
            //$("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            if ($("#ddlstatus").val() == 'all') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(InActive)') {
                    $("#ddl5").append("<option style='background-color: #f57575;' value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                } else {
                    $("#ddl5").append("<option style='background-color: #ffffff;' value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                }
            }
            if ($("#ddlstatus").val() == 'active') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(Active)') {
                    $("#ddl5").append("<option  value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                }
            }
        });
    }


    //IsValidUser();

}

function OnChangeddl5() {

    levelValue = $('#ddl5').val();
    myData = "{'employeeId':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "datascreen.asmx/GetEmployee",
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
        name = 'Select ' + HierarchyLevel6;
        $("#ddl6").append("<option value='" + value + "'>" + name + "</option>");

        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl6").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});


        $.each(jsonObj, function (i, tweet) {
            //$("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            if ($("#ddlstatus").val() == 'all') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(InActive)') {
                    $("#ddl6").append("<option style='background-color: #f57575;' value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                } else {
                    $("#ddl6").append("<option style='background-color: #ffffff;' value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                }
            }
            if ($("#ddlstatus").val() == 'active') {
                if (jsonObj[i].EmployeeName.split(' - ')[1] == '(Active)') {
                    $("#ddl6").append("<option  value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                }
            }
        });
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

//function getFile() {
//    document.getElementById("upfile").click();
//}
//function sub(obj) {
//    var file = obj.value;
//    var fileName = file.split("\\");

//    var imageExten = file.split(".").pop();

//    if ((imageExten == "jpg") || (imageExten == "jpeg") || (imageExten == "png") || (imageExten == "gif")) {

//        var im = $('#upfile').get(0).files[0];
//        //alert(fileName);

//        $.ajax({
//            type: 'POST',
//            url: '/Reports/WCF_Image.svc/UploadPhoto/' + fileName,
//            contentType: 'application/octet-stream',
//            processData: false,
//            data: im,
//            success: function (data) {
//                window.location.reload();
//            },
//            error: function (data) {
//                alert('Error in getting');
//            }
//        });
//    }

//    else {
//        alert("Please Select A valid Image File Only jpeg, jpg, png and gif Images type allowed");
//    }
//    // document.getElementById("yourBtn").innerHTML = fileName[fileName.length - 1];
//    // document.myForm.submit();
//    //event.preventDefault();

//}


//FOR NEW Dboard Working Here....
function barchartProdfreForNewDb() {
    $('#prodfreFornewDb').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'"
        + startdate + "','Level1':'"
        + $('#L1').val() + "','Level2':'"
        + $('#L2').val() + "','Level3':'"
        + $('#L3').val() + "','Level4':'"
        + $('#L4').val() + "','Level5':'"
        + $('#L5').val() + "','Level6':'"
        + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";
    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/ProdFreClassForNewDb",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessbarChartProdfreForNewDb,
        error: onError,
        cache: false
        //async: false
    });
}
function OnSuccessbarChartProdfreForNewDb(data, status) {

    var dataser1 = [7, 12, 16, 0];

    var OSA = [];//random Data
    var Class = [];
    var ClassName = [];
    var ClassAdd = [];
    var TeamProd = [];
    var TeamAdd = [];
    var Teamarrange = [];
    var ProdAdd = [];
    var OSAProd = [];//Asc Data in categories
    var masterteamIDs = [];//DivisionID
    var masterteamNames = [];//DivisionName
    if (data.d != null) {
        var dataser = jsonParse(data.d);
        $.each(dataser, function (i, option) {
            OSA.push(parseFloat([option.ProdFreq]));
            TeamProd.push([option.Team]);
            masterteamIDs.push([option.DivisionID]);
            masterteamNames.push([option.Division]);
        });
    }
    var uniqueIDs = [];
    var uniqueNames = [];
    for (var i = 0; i < masterteamIDs.length; i++) {
        if (!uniqueIDs.contains(masterteamIDs[i])) {
            uniqueIDs.push(masterteamIDs[i]);
        }
    }
    for (var i = 0; i < masterteamNames.length; i++) {
        if (!uniqueNames.contains(masterteamNames[i])) {
            uniqueNames.push(masterteamNames[i]);
        }
    }
    //uniqueIDs.sort(function (a,b) {return a-b });
    var dataValues = [];
    for (var i = 0; i < uniqueIDs.length; i++) {
        dataValues.push([]);
    }
    for (var t = 0; t < TeamProd.length; t++) {
        for (var i = 0; i < uniqueIDs.length; i++) {
            if (masterteamIDs[t].toString() == uniqueIDs[i].toString()) {
                dataValues[i].push(OSA[t]);
            }
            else {
                dataValues[i].push('');
            }
        }
    }
    var data = [];
    for (var i = 0; i < uniqueIDs.length; i++) {
        data.push({
            name: uniqueNames[i].toString(),
            data: dataValues[i]
        });
    }
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'prodfreFornewDb',
            type: 'column',
            height: '400',

        },//Cardio,Green,Blue,women,hospicare,pulmcare Onco
        colors: ['#d35400', ' #229954', '#2484C6', '#ff6384', '#ff3333', '#bf00ff', '#ffd0d0'],
        title: {
            text: 'Team Wise Productive Frequency Coverage %'
        },
        credits: { enabled: false },
        xAxis: {
            categories: TeamProd,//Team ploting here...
        },
        yAxis: {
            min: 0,
            title: {
            }
        },
        tooltip: {
            formatter: function () {
                return this.x + ':' + this.y + '%';
            }
        },
        plotOptions: {
            column: {
                borderWidth: 0
            },
            series: {
                shadow: false,
                borderWidth: 0,
                pointWidth: 50,
                dataLabels: {
                    enabled: true,
                }
            }
        },
        legend: {
            color: '#F0F0F0'
        },
        series:
            data,//teamData with frequency
        maxPointWidth: 50,
    });
    $('#prodfreFornewDb').parent().find('.loding_box_outer').show().fadeOut();

}

function barchartCustomerCovForNewDb() {
    $('#customerCovForNewDb').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'"
        + startdate + "','Level1':'"
        + $('#L1').val() + "','Level2':'"
        + $('#L2').val() + "','Level3':'"
        + $('#L3').val() + "','Level4':'"
        + $('#L4').val() + "','Level5':'"
        + $('#L5').val() + "','Level6':'"
        + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";
    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/customercoveragebyclassForNewDb",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessbarCustomerCovForNewDb,
        error: onError,
        cache: false
        //async: false
    });
}
function OnSuccessbarCustomerCovForNewDb(data, status) {

    var dataser1 = [7, 12, 16, 0];
    var OSA = [];//random Data
    var Class = [];
    var ClassName = [];
    var ClassAdd = [];
    var TeamProd = [];
    var TeamAdd = [];
    var Teamarrange = [];
    var ProdAdd = [];
    var OSAFinal = [];//Asc Data in categories
    var masterteamIDs = [];//DivisionID
    var masterteamNames = [];//DivisionName

    if (data.d != null) {
        var dataser = jsonParse(data.d);
        $.each(dataser, function (i, option) {
            OSA.push(parseFloat([option.CustomerCoverage]));
            TeamProd.push([option.Team]);
            masterteamIDs.push([option.DivisionID]);
            masterteamNames.push([option.Division]);
        });
    }
    var uniqueIDs = [];
    var uniqueNames = [];
    for (var i = 0; i < masterteamIDs.length; i++) {
        if (!uniqueIDs.contains(masterteamIDs[i])) {
            uniqueIDs.push(masterteamIDs[i]);
        }
    }
    for (var i = 0; i < masterteamNames.length; i++) {
        if (!uniqueNames.contains(masterteamNames[i])) {
            uniqueNames.push(masterteamNames[i]);
        }
    }
    var dataValues = [];
    for (var i = 0; i < uniqueIDs.length; i++) {
        dataValues.push([]);
    }
    for (var t = 0; t < TeamProd.length; t++) {
        for (var i = 0; i < uniqueIDs.length; i++) {
            if (masterteamIDs[t].toString() == uniqueIDs[i].toString()) {
                dataValues[i].push(OSA[t]);
            }
            else {
                dataValues[i].push('');
            }
        }
    }
    var data = [];
    for (var i = 0; i < uniqueIDs.length; i++) {
        data.push({
            name: uniqueNames[i].toString(),
            data: dataValues[i]
        });
    }


    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'customerCovForNewDb',
            type: 'column',
            height: '400',

        },//Cardio,Green,Blue,women,hospicare,pulmcare Onco
        colors: ['#d35400', ' #229954', '#2484C6', '#ff6384', '#ff3333', '#bf00ff', '#ffd0d0'],
        title: {
            text: 'Team Wise Customer Coverage %'
        },
        credits: { enabled: false },
        xAxis: {
            categories: TeamProd,//Team ploting here...
        },
        yAxis: {
            min: 0,
            title: {
            }
        },
        tooltip: {
            formatter: function () {
                return this.x + ':' + this.y + '%';
            }
        },
        plotOptions: {
            column: {
                borderWidth: 0,
                //groupPadding: 0,//add here
                //pointPadding: 0,//add here
            },
            series: {
                shadow: false,
                borderWidth: 0,
                pointWidth: 50,
                dataLabels: {
                    enabled: true,
                }
            }

        },
        legend: {
            color: '#F0F0F0'
        },
        series:
            data,//teamData with frequency
    });
    $('#customerCovForNewDb').parent().find('.loding_box_outer').show().fadeOut();

}

function barchartEstworkingdays_EstDaysnational() {
    
    $('#National_Estworkingsdays').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'" + startdate +
        "','endate':'" + startdate +
        "','Level1':'"
        + 0 + "','Level2':'"
        + 0 + "','Level3':'"
        + 0 + "','Level4':'"
        + 0 + "','Level5':'"
        + 0 + "','Level6':'"
        + 0 + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";
    

    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/estworkinddays",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessbarEstworkingdays_EstNational,
        error: onError,
        cache: false
        //async: false
    });
}

function OnSuccessbarEstworkingdays_EstNational(data, status) {
   
    var dataser1 = [7, 12, 16, 0];

    var OSA = [];
    var Estdays = [];

    if (data.d != null) {

        var dataser = jsonParse(data.d);

        $.each(dataser, function (i, option) {

            OSA.push(parseFloat([option.NewRecord2]));
        });
        Estdays.push(OSA[0]);
    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'National_Estworkingsdays',
            type: 'column',
            height: 350,
            width: 300
        },

        title: {
            text: 'Estimate Working Days',


        },
        colors: [
                '#003366'
        ],
        credits: { enabled: false },
        legend: {
        },
        tooltip: {
            backgroundColor: '#003366',
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
            categories: ['Est Working Days'],
            labels: {
                style: {
                    //fontWeight: 'bold'
                }
            },
        },

        yAxis: {
            title: {
                text: ''
            }
        },

        series: [{
            showInLegend: false,
            data: Estdays

        }]
    });
    $('#National_Estworkingsdays').parent().find('.loding_box_outer').show().fadeOut();

}

function barchartEstworkingdays_National() {
   
    $('#National_workingdays').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'" + startdate +
        "','endate':'" + startdate +
        "','Level1':'"
        + 0 + "','Level2':'"
        + 0 + "','Level3':'"
        + 0 + "','Level4':'"
        + 0 + "','Level5':'"
        + 0 + "','Level6':'"
        + 0 + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";

    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/estworkinddays",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessbarEstworkingdays_National,
        error: onError,
        cache: false
        //async: false
    });
}

function OnSuccessbarEstworkingdays_National(data, status) {

    

    var dataser1 = [7, 12, 16, 0];

    var OSA = [];
    var FinalData = [];
    if (data.d != null) {
        var dataser = jsonParse(data.d);
        $.each(dataser, function (i, option) {

            OSA.push(parseFloat([option.NewRecord2]));

        });
        //plote values in categoriess
        FinalData.push(parseFloat([OSA[1]]))
        FinalData.push(parseFloat([OSA[2]]))
        FinalData.push(parseFloat([OSA[4]]))
        FinalData.push(parseFloat([OSA[5]]))

    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'National_workingdays',
            type: 'column',
            height: 350,
            width: 300

        },

        title: {
            text: 'Working Days VS Field Working Days '
        },
        colors: [
                '#003366'
        ],
        credits: { enabled: false },
        legend: {
        },
        tooltip: {
            backgroundColor: '#003366',
            style: {
                color: '#F0F0F0',
                fontSize: '14px'
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
                groupPadding: 0,//add here
                pointPadding: 0.1,//add here
                dataLabels: {
                    enabled: true,

                }
            }
        },
        xAxis: {
            categories: ['Working Days', 'Days In Field', 'Day With No Activity', 'Out Field Days'],
            labels: {
                style: {
                    //fontWeight: 'bold'
                }
            },
        },

        yAxis: {
            title: {
                text: ''
            }
        },

        series: [{
            showInLegend: false,
            data: FinalData

        }]
    });
    $('#National_workingdays').parent().find('.loding_box_outer').show().fadeOut();

}

function barchartEstworkingdays_Acer_Team() {
    $('#Acer_Team_workingdays').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'" + startdate
        + "','endate':'" + startdate
        + "','Level1':'" + 0
        + "','Level2':'" + 0
        + "','Level3':'" + 18
        + "','Level4':'" + 0
        + "','Level5':'" + 0
        + "','Level6':'" + 0
        + "','EmployeeId':'" + employeeIDFORDATA + "'}";
    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6
   
    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/estworkinddays",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessbarEstworkingdays_Acer_Team,
        error: onError,
        cache: false
        //async: false
    });
}

function OnSuccessbarEstworkingdays_Acer_Team(data, status) {

    var dataser1 = [7, 12, 16, 0];

    var OSA = [];
    var Cardio = [];

    if (data.d != null) {

        var dataser = jsonParse(data.d);

        $.each(dataser, function (i, option) {

            OSA.push(parseFloat([option.NewRecord2]));

        });
        Cardio.push(parseFloat([OSA[1]]))
        Cardio.push(parseFloat([OSA[2]]))
        Cardio.push(parseFloat([OSA[4]]))
        Cardio.push(parseFloat([OSA[5]]))
    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'Acer_Team_workingdays',
            type: 'column',
            height: 350,
            width: 300
        },

        title: {
            text: 'Working Days VS Field Working Days '
        },
        colors: [
                '#d35400'
        ],
        credits: { enabled: false },
        legend: {
        },
        tooltip: {
            backgroundColor: '#d35400',
            style: {
                color: '#F0F0F0',
                fontSize: '14px'
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
                groupPadding: 0,//add here
                pointPadding: 0.1,//add here
                dataLabels: {
                    enabled: true,

                }
            }
        },
        xAxis: {
            categories: ['Working Days', 'Days In Field', 'Day With No Activity', 'Out Field Days'],
            labels: {
                style: {
                    //fontWeight: 'bold'
                }
            },
        },

        yAxis: {
            title: {
                text: ''
            }
        },

        series: [{
            showInLegend: false,
            data: Cardio

        }]
    });
    $('#Acer_Team_workingdays').parent().find('.loding_box_outer').show().fadeOut();

}

function barchartEstworkingdays_AdvanceTeam() {
    $('#AdvanceTeam_Estworkingsdays').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'" + startdate
            + "','endate':'" + startdate
            + "','Level1':'" + 0
            + "','Level2':'" + 0
            + "','Level3':'" + 25
            + "','Level4':'" + 0
            + "','Level5':'" + 0
            + "','Level6':'" + 0
            + "','EmployeeId':'" + employeeIDFORDATA + "'}";
    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/estworkinddays",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessbarEstworkingdays_AdvanceTeam,
        error: onError,
        cache: false
        //async: false
    });
}

function OnSuccessbarEstworkingdays_AdvanceTeam(data, status) {

    var dataser1 = [7, 12, 16, 0];

    var OSA = [];
    var Green = [];

    if (data.d != null) {

        var dataser = jsonParse(data.d);

        $.each(dataser, function (i, option) {

            OSA.push(parseFloat([option.NewRecord2]));

        });
        Green.push(parseFloat([OSA[1]]))
        Green.push(parseFloat([OSA[2]]))
        Green.push(parseFloat([OSA[4]]))
        Green.push(parseFloat([OSA[5]]))
    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'AdvanceTeam_Estworkingsdays',
            type: 'column',
            height: 350,
            width: 300
        },

        title: {
            text: 'Working Days VS Field Working Days '
        },
        colors: [
                '#229954'
        ],
        credits: { enabled: false },
        legend: {
        },
        tooltip: {
            backgroundColor: '#229954',
            style: {
                color: '#F0F0F0',
                fontSize: '14px'
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
                groupPadding: 0,//add here
                pointPadding: 0.1,//add here
                dataLabels: {
                    enabled: true,

                }
            }
        },
        xAxis: {
            categories: ['Working Days', 'Days In Field', 'Day With No Activity', 'Out Field Days'],
            labels: {
                style: {
                    //fontWeight: 'bold'
                }
            },
        },

        yAxis: {
            title: {
                text: ''
            }
        },

        series: [{
            showInLegend: false,
            data: Green

        }]
    });
    $('#AdvanceTeam_Estworkingsdays').parent().find('.loding_box_outer').show().fadeOut();

}

function barchartEstworkingdays_AlphaTeam() {
    $('#AlphaTeam_workingdays').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'" + startdate
              + "','endate':'" + startdate
              + "','Level1':'" + 0
              + "','Level2':'" + 0
              + "','Level3':'" + 27
              + "','Level4':'" + 0
              + "','Level5':'" + 0
              + "','Level6':'" + 0
              + "','EmployeeId':'" + employeeIDFORDATA + "'}";
    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/estworkinddays",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessbarEstworkingdays_AlphaTeam,
        error: onError,
        cache: false
        //async: false
    });
}

function OnSuccessbarEstworkingdays_AlphaTeam(data, status) {

    var dataser1 = [7, 12, 16, 0];

    var OSA = [];
    var Blue = [];

    if (data.d != null) {

        var dataser = jsonParse(data.d);

        $.each(dataser, function (i, option) {

            OSA.push(parseFloat([option.NewRecord2]));

        });
        Blue.push(parseFloat([OSA[1]]))
        Blue.push(parseFloat([OSA[2]]))
        Blue.push(parseFloat([OSA[4]]))
        Blue.push(parseFloat([OSA[5]]))
    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'AlphaTeam_workingdays',
            type: 'column',
            height: 350,
            width: 300
        },

        title: {
            text: 'Working Days VS Field Working Days '
        },
        colors: [
                '#2484C6'
        ],
        credits: { enabled: false },
        legend: {
        },
        tooltip: {
            backgroundColor: '#2484C6',
            style: {
                color: '#F0F0F0',
                fontSize: '14px'
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
                groupPadding: 0,//add here
                pointPadding: 0.1,//add here
                dataLabels: {
                    enabled: true,

                }
            }
        },
        xAxis: {
            categories: ['Working Days', 'Days In Field', 'Day With No Activity', 'Out Field Days'],
            labels: {
                style: {
                    //fontWeight: 'bold'
                }
            },
        },

        yAxis: {
            title: {
                text: ''
            }
        },

        series: [{
            showInLegend: false,
            data: Blue

        }]
    });
    $('#AlphaTeam_workingdays').parent().find('.loding_box_outer').show().fadeOut();

}

function barchartEstworkingdays_DynamicTeam() {
    $('#DynamicTeam_workingdays').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'" + startdate
              + "','endate':'" + startdate
              + "','Level1':'" + 0
              + "','Level2':'" + 0
              + "','Level3':'" + 32
              + "','Level4':'" + 0
              + "','Level5':'" + 0
              + "','Level6':'" + 0
              + "','EmployeeId':'" + employeeIDFORDATA + "'}";
    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/estworkinddays",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessbarEstworkingdays_DynamicTeam,
        error: onError,
        cache: false
        //async: false
    });
}

function OnSuccessbarEstworkingdays_DynamicTeam(data, status) {

    var dataser1 = [7, 12, 16, 0];

    var OSA = [];
    var Onco = [];

    if (data.d != null) {

        var dataser = jsonParse(data.d);

        $.each(dataser, function (i, option) {

            OSA.push(parseFloat([option.NewRecord2]));

        });
        Onco.push(parseFloat([OSA[1]]))
        Onco.push(parseFloat([OSA[2]]))
        Onco.push(parseFloat([OSA[4]]))
        Onco.push(parseFloat([OSA[5]]))
    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'DynamicTeam_workingdays',
            type: 'column',
            height: 350,
            width: 300
        },

        title: {
            text: 'Working Days VS Field Working Days '
        },
        colors: [
                '#ffd0d0'
        ],
        credits: { enabled: false },
        legend: {
        },
        tooltip: {
            backgroundColor: '#ffd0d0',
            style: {
                color: '#F0F0F0',
                fontSize: '14px'
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
                groupPadding: 0,//add here
                pointPadding: 0.1,//add here
                dataLabels: {
                    enabled: true,

                }
            }
        },
        xAxis: {
            categories: ['Working Days', 'Days In Field', 'Day With No Activity', 'Out Field Days'],
            labels: {
                style: {
                    //fontWeight: 'bold'
                }
            },
        },

        yAxis: {
            title: {
                text: ''
            }
        },

        series: [{
            showInLegend: false,
            data: Onco

        }]
    });
    $('#DynamicTeam_workingdays').parent().find('.loding_box_outer').show().fadeOut();

}

function barchartEstworkingdays_Elite_Team() {
    $('#Elite_Team_workingdays').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'" + startdate
              + "','endate':'" + startdate
              + "','Level1':'" + 0
              + "','Level2':'" + 0
              + "','Level3':'" + 24
              + "','Level4':'" + 0
              + "','Level5':'" + 0
              + "','Level6':'" + 0
              + "','EmployeeId':'" + employeeIDFORDATA + "'}";
    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/estworkinddays",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessbarEstworkingdays_Elite_Team,
        error: onError,
        cache: false
        //async: false
    });
}

function OnSuccessbarEstworkingdays_Elite_Team(data, status) {

    var dataser1 = [7, 12, 16, 0];

    var OSA = [];
    var Women = [];

    if (data.d != null) {

        var dataser = jsonParse(data.d);

        $.each(dataser, function (i, option) {

            OSA.push(parseFloat([option.NewRecord2]));

        });
        Women.push(parseFloat([OSA[1]]))
        Women.push(parseFloat([OSA[2]]))
        Women.push(parseFloat([OSA[4]]))
        Women.push(parseFloat([OSA[5]]))
    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'Elite_Team_workingdays',
            type: 'column',
            height: 350,
            width: 300
        },

        title: {
            text: 'Working Days VS Field Working Days'
        },
        colors: [
                '#ff6384'
        ],
        credits: { enabled: false },
        legend: {
        },
        tooltip: {
            backgroundColor: '#ff6384',
            style: {
                color: '#F0F0F0',
                fontSize: '14px'
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
                groupPadding: 0,//add here
                pointPadding: 0.1,//add here
                dataLabels: {
                    enabled: true,

                }
            }
        },
        xAxis: {
            categories: ['Working Days', 'Days In Field', 'Day With No Activity', 'Out Field Days'],
            labels: {
                style: {
                    //fontWeight: 'bold'
                }
            },
        },

        yAxis: {
            title: {
                text: ''
            }
        },

        series: [{
            showInLegend: false,
            data: Women

        }]
    });
    $('#Elite_Team_workingdays').parent().find('.loding_box_outer').show().fadeOut();

}

function barchartEstworkingdays_Galaxy_Team() {
    $('#Galaxy_Team_workingdays').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'" + startdate
               + "','endate':'" + startdate
               + "','Level1':'" + 0
               + "','Level2':'" + 0
               + "','Level3':'" + 21
               + "','Level4':'" + 0
               + "','Level5':'" + 0
               + "','Level6':'" + 0
               + "','EmployeeId':'" + employeeIDFORDATA + "'}";
    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/estworkinddays",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessbarEstworkingdays_Galaxy_Team,
        error: onError,
        cache: false
        //async: false
    });
}

function OnSuccessbarEstworkingdays_Galaxy_Team(data, status) {

    var dataser1 = [7, 12, 16, 0];

    var OSA = [];
    var Hospicare = [];

    if (data.d != null) {

        var dataser = jsonParse(data.d);

        $.each(dataser, function (i, option) {

            OSA.push(parseFloat([option.NewRecord2]));

        });
        Hospicare.push(parseFloat([OSA[1]]))
        Hospicare.push(parseFloat([OSA[2]]))
        Hospicare.push(parseFloat([OSA[4]]))
        Hospicare.push(parseFloat([OSA[5]]))
    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'Galaxy_Team_workingdays',
            type: 'column',
            height: 350,
            width: 300
        },

        title: {
            text: 'Working Days VS Field Working Days'
        },
        colors: [
                '#ff3333'
        ],
        credits: { enabled: false },
        legend: {
        },
        tooltip: {
            backgroundColor: '#ff3333',
            style: {
                color: '#F0F0F0',
                fontSize: '14px'
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
                groupPadding: 0,//add here
                pointPadding: 0.1,//add here
                dataLabels: {
                    enabled: true,

                }
            }
        },
        xAxis: {
            categories: ['Working Days', 'Days In Field', 'Day With No Activity', 'Out Field Days'],
            labels: {
                style: {
                    //fontWeight: 'bold'
                }
            },
        },

        yAxis: {
            title: {
                text: ''
            }
        },

        series: [{
            showInLegend: false,
            data: Hospicare

        }]
    });
    $('#Galaxy_Team_workingdays').parent().find('.loding_box_outer').show().fadeOut();

}


function barchartEstworkingdays_MassTeam() {
    $('#Mass_Team_workingdays').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'" + startdate
               + "','endate':'" + startdate
               + "','Level1':'" + 0
               + "','Level2':'" + 0
               + "','Level3':'" + 30
               + "','Level4':'" + 0
               + "','Level5':'" + 0
               + "','Level6':'" + 0
               + "','EmployeeId':'" + employeeIDFORDATA + "'}";
    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/estworkinddays",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessbarEstworkingdays_Mass_Team,
        error: onError,
        cache: false
        //async: false
    });
}

function OnSuccessbarEstworkingdays_Mass_Team(data, status) {

    var dataser1 = [7, 12, 16, 0];

    var OSA = [];
    var Pulmocare = [];

    if (data.d != null) {

        var dataser = jsonParse(data.d);

        $.each(dataser, function (i, option) {

            OSA.push(parseFloat([option.NewRecord2]));

        });
        Pulmocare.push(parseFloat([OSA[1]]))
        Pulmocare.push(parseFloat([OSA[2]]))
        Pulmocare.push(parseFloat([OSA[4]]))
        Pulmocare.push(parseFloat([OSA[5]]))
    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'Mass_Team_workingdays',
            type: 'column',
            height: 350,
            width: 300
        },

        title: {
            text: 'Working Days VS Field Working Days'
        },
        colors: [
                '#bf00ff'
        ],
        credits: { enabled: false },
        legend: {
        },
        tooltip: {
            backgroundColor: '#bf00ff',
            style: {
                color: '#F0F0F0',
                fontSize: '14px'
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
                groupPadding: 0,//add here
                pointPadding: 0.1,//add here
                dataLabels: {
                    enabled: true,

                }
            }
        },
        xAxis: {
            categories: ['Working Days', 'Days In Field', 'Day With No Activity', 'Out Field Days'],
            labels: {
                style: {
                    //fontWeight: 'bold'
                }
            },
        },

        yAxis: {
            title: {
                text: ''
            }
        },

        series: [{
            showInLegend: false,
            data: Pulmocare

        }]
    });
    $('#Mass_Team_workingdays').parent().find('.loding_box_outer').show().fadeOut();

}



function DailyCallTrendForNewDb() {
    $('#ContanerDailyCallTrendForNewCalls').parent().find('.loding_box_outer').show().fadeIn();
    // myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'" + employeeIDFORDATA + "'}";

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/StartDailyCallTrendWorkForNewDb",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessDailyCallTrendForNewDb,
        error: onError,
        cache: false
    });

}
function OnSuccessDailyCallTrendForNewDb(data, status) {

    if (data != '') {
        var OSA = [];//random Data
        var Days = [];
        var Class = [];
        var CardioTeam = [];
        var GreenTeam = [];
        var BlueTeam = [];
        var OncologyTeam = [];
        var WomenTeam = [];
        var OSATarget = [];
        var OSAActual = [];//Asc Data in categories
        var masterteamIDs = [];//DivisionID
        var masterteamNames = [];//DivisionName
        var colors = ['#d35400', ' #229954', '#2484C6', ' #ffd0d0 ', '#ff6384','#ff3333', '#bf00ff'];
        if (data.d != null) {
            var json = jsonParse(data.d);
            $.each(json, function (i, option) {
                OSA.push(parseFloat([option.AVGC]));
                Days.push([option.Days]);
                masterteamIDs.push([option.DivisionID]);
                masterteamNames.push([option.Division]);
            });
        }

        var uniqueIDs = [];
        var uniqueNames = [];
        for (var i = 0; i < masterteamIDs.length; i++) {
            if (!uniqueIDs.contains(masterteamIDs[i])) {
                uniqueIDs.push(masterteamIDs[i]);
            }
        }
        for (var i = 0; i < masterteamNames.length; i++) {
            if (!uniqueNames.contains(masterteamNames[i])) {
                uniqueNames.push(masterteamNames[i]);
            }
        }
        var dataValues = [];
        for (var i = 0; i < uniqueIDs.length; i++) {
            dataValues.push([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
        }
        for (var t = 0; t < masterteamIDs.length; t++) {
            for (var i = 0; i < uniqueIDs.length; i++) {
                if (masterteamIDs[t].toString() == uniqueIDs[i].toString()) {
                    var index = parseInt(Days[t].toString());
                    dataValues[i][index - 1] = OSA[t];
                }
                //else {
                //    dataValues[i].push('');
                //}
            }
        }
        var data = [];
        for (var i = 0; i < uniqueIDs.length; i++) {
            data.push({
                name: uniqueNames[i].toString(),
                data: dataValues[i],
                color: colors[i]
            });
        }
        data.push({
            name: 'Target Calls',
            data: [13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0,
            13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0,
            13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0],
            color: '#1B1464'
        });

        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'ContanerDailyCallTrendForNewCalls',
                type: 'line'
            },

            title: {
                text: 'TEAM WISE DAILY CALL TRENDS - AVERAGE CALLS PER DAY',
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
                    color: '#1B1464'
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
            series: data
        });
    }
    $('#ContanerDailyCallTrendForNewCalls').parent().find('.loding_box_outer').show().fadeOut();
}

function PlannedVsActualCallsForNEWDB() {
    $('#ContainerPlannedvsAcutalCallsForNewCall').parent().find('.loding_box_outer').show().fadeIn();
    // myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";

    myData1 = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/PlannedVsActualCallsForNewDb",
        contentType: "application/json; charset=utf-8",
        data: myData1,
        success: OnSuccessPlannedVsActualCallsForNewDb,
        error: onError,
        cache: false
    });


}
function OnSuccessPlannedVsActualCallsForNewDb(data, status) {

    var OSA = [];//random Data
    var Class = [];
    var ClassName = [];
    var ClassAdd = [];
    var TeamProd = [];
    var TeamAdd = [];
    var Teamarrange = [];
    var OSATarget = [];
    var OSAVisit = [];//Asc Data in categories
    var masterteamIDs = [];//DivisionID
    var masterteamNames = [];//DivisionName

    if (data.d != null) {
        var jsonNewDb = jsonParse(data.d);
        $.each(jsonNewDb, function (i, option) {
            OSAVisit.push(parseFloat([option.PlanVisits]));
            OSATarget.push(parseFloat([option.ActualVisits]));
            TeamProd.push([option.Team]);
            masterteamIDs.push([option.DivisionID]);
            masterteamNames.push([option.Division]);
        });
    }
    var uniqueIDs = [];
    var uniqueNames = [];
    for (var i = 0; i < masterteamIDs.length; i++) {
        if (!uniqueIDs.contains(masterteamIDs[i])) {
            uniqueIDs.push(masterteamIDs[i]);
        }
    }
    for (var i = 0; i < masterteamNames.length; i++) {
        if (!uniqueNames.contains(masterteamNames[i])) {
            uniqueNames.push(masterteamNames[i]);
        }
    }
    var dataValuesVisit = [];
    for (var i = 0; i < uniqueIDs.length; i++) {
        dataValuesVisit.push([]);
    }
    var dataValuesTarget = [];
    for (var i = 0; i < uniqueIDs.length; i++) {
        dataValuesTarget.push([]);
    }
    for (var v = 0; v < TeamProd.length; v++) {
        for (var i = 0; i < uniqueIDs.length; i++) {
            if (masterteamIDs[v].toString() == uniqueIDs[i].toString()) {
                dataValuesVisit[i].push(OSAVisit[v]);
            }
            else {
                dataValuesVisit[i].push('');
            }
        }
    }
    for (var t = 0; t < TeamProd.length; t++) {
        for (var i = 0; i < uniqueIDs.length; i++) {
            if (masterteamIDs[t].toString() == uniqueIDs[i].toString()) {
                dataValuesTarget[i].push(OSATarget[t]);
            }
            else {
                dataValuesTarget[i].push('');
            }
        }
    }
    var dataVisit = [];
    for (var i = 0; i < TeamProd.length; i++) {
        dataVisit.push(OSAVisit[i]);
    }

    var dataActual = [];
    for (var i = 0; i < TeamProd.length; i++) {
        dataActual.push(OSATarget[i]);
    }
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'ContainerPlannedvsAcutalCallsForNewCall',
            type: 'column',
            height: '400'

        },//BlueICI,maroon
        colors: ['#2484C6', '#800000'],
        title: {
            text: 'TEAM WISE TARGET VS ACTUAL CALLS(MTD)'
        },
        credits: { enabled: false },
        xAxis: {
            categories: TeamProd,//Team ploting here...
        },
        yAxis: {
            min: 0,
            title: {
            }
        },
        tooltip: {
            formatter: function () {
                return this.x + ':' + this.y + '%';
            }
        },
        plotOptions: {
            column: {
                borderWidth: 0
            },
            series: {
                shadow: false,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                }
            }
        },
        legend: {
            color: '#F0F0F0'
        },

        series: [{
            name: 'Target',
            data: dataVisit

        }, {
            name: 'Actual',
            data: dataActual

        }]
    });
    $('#ContainerPlannedvsAcutalCallsForNewCall').parent().find('.loding_box_outer').show().fadeOut();
}

function GetAverageCallsForTeam() {
    $('#ContainerAverageCallsForTeam').parent().find('.loding_box_outer').show().fadeIn();
    //    myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/GetAverageCallsForTeam",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessAverageCallsForTeam,
        error: onError,
        cache: false
        //async: false

    });


}
function OnSuccessAverageCallsForTeam(data, status) {
    var OSA = [];//random Data
    var masterteamIDs = [];//DivisionID
    var masterteamNames = [];//DivisionName

    if (data.d != null) {
        var dataser = jsonParse(data.d);
        $.each(dataser, function (i, option) {
            OSA.push(parseFloat([option.CallAvg]));
            masterteamIDs.push([option.DivisionID]);
            masterteamNames.push([option.Division]);
        });
    }

    var uniqueIDs = [];
    var uniqueNames = [];
    for (var i = 0; i < masterteamIDs.length; i++) {
        if (!uniqueIDs.contains(masterteamIDs[i])) {
            uniqueIDs.push(masterteamIDs[i]);
        }
    }
    for (var i = 0; i < masterteamNames.length; i++) {
        if (!uniqueNames.contains(masterteamNames[i])) {
            uniqueNames.push(masterteamNames[i]);
        }
    }
    var dataValues = [];
    for (var i = 0; i < uniqueIDs.length; i++) {
        dataValues.push([]);
    }
    for (var t = 0; t < masterteamNames.length; t++) {
        for (var i = 0; i < uniqueIDs.length; i++) {
            if (masterteamIDs[t].toString() == uniqueIDs[i].toString()) {
                dataValues[i].push(OSA[t]);
            }
            else {
                dataValues[i].push('');
            }
        }
    }
    var data = [];
    for (var i = 0; i < uniqueIDs.length; i++) {
        data.push({
            name: uniqueNames[i].toString(),
            data: dataValues[i]
        });
    }
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'ContainerAverageCallsForTeam',
            type: 'column',
            height: '350',
        },//Cardio,Green,Blue,Onco,women,hospicare,pulmcare
        colors: ['#d35400', ' #229954', '#2484C6', ' #ffd0d0 ', '#ff6384', '#ff3333', '#bf00ff'],
        title: {
            text: 'Team Wise Calls Average'
        },
        credits: { enabled: false },
        xAxis: {
            categories: masterteamNames,//Team ploting here...
        },
        yAxis: {
            min: 0,
            title: {
            }
        },
        tooltip: {
            formatter: function () {
                return this.x + ':' + this.y + '%';
            }
        },
        plotOptions: {
            column: {
                borderWidth: 0,
                //groupPadding: 0,//add here
                //pointPadding: 0,//add here
            },
            series: {
                shadow: false,
                borderWidth: 0,
                pointWidth: 50,
                dataLabels: {
                    enabled: true,
                },


            }
        },
        legend: {
            color: '#F0F0F0'
        },
        series:
            data,//teamData with frequency
        maxPointWidth: 50,
    });

    $('#ContainerAverageCallsForTeam').parent().find('.loding_box_outer').show().fadeOut();

}

function FillGridTopForNewDb() {

    //    myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";
    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/TopMRFinalNewDB",
        data: myData,
        contentType: "application/json",
        async: false,
        success: onSuccessTopForNewDb,
        error: onError,
        complete: onComplete,
        cache: false
    });

}
function onSuccessTopForNewDb(data, status) {
    //alert(data);
    
    var tablestring = "";
    $("#topdivForNewDb").empty();
    $("#topdivForNewDb").prepend("<table id='top5table'   class='column-options'><thead>" +
                        "<tr>" +

                         " <th > Acer Team   </th>  " +
                         "<th> TeamCall Avg  </th> " +

                         " <th > Advance Team   </th>  " +
                         "<th> TeamCall Avg  </th> " +

                         " <th > Alpha Team   </th>  " +
                         "<th> TeamCall Avg  </th> " +

                         " <th > Dynamic Team   </th>  " +
                         "<th> TeamCall Avg  </th> " +

                         " <th > Elite Team   </th>  " +
                         "<th> TeamCall Avg  </th> " +

                         " <th > Exampler Team   </th>  " +
                         "<th> TeamCall Avg  </th> " +


                         " <th > Galaxy Team   </th>  " +
                         "<th> TeamCall Avg  </th> " +


                         " <th > International Acer   </th>  " +
                         "<th> TeamCall Avg  </th> " +


                         " <th > International Max   </th>  " +
                         "<th> TeamCall Avg  </th> " +

                         " <th > MassTeam   </th>  " +
                         "<th> TeamCall Avg  </th> " +

                         " <th > Matrix Team   </th>  " +
                         "<th> TeamCall Avg  </th> " +


                         " <th > Max Team   </th>  " +
                         "<th> TeamCall Avg  </th> " +

                         " <th > Nationtesting   </th>  " +
                         "<th> TeamCall Avg  </th> " +


                         " <th > Pacer Team   </th>  " +
                         "<th> TeamCall Avg  </th> " +

                         " <th > Specialty Team   </th>  " +
                         "<th> TeamCall Avg  </th> " +

                         " <th > Specialty Team   </th>  " +
                         "<th> TeamCall Avg  </th> " +

                        "</tr>" +
                      "</thead>" +
                      "<tbody id='carvalues'>");


    if (data.d != null) {

        var odeven = '';
        $.each(data.d, function (i, option) {


            if (i % 2 == 0) {
                odeven = "<tr class='odd'>";
            }
            else {
                odeven = "<tr>";
            }

            $('#carvalues').append(odeven+'<td >' + option.mr + '</td>' +
                '<td >' + option.acer_Team + '</td>' +

               '<td >' + option.mr2 + '</td>' +
               '<td >' + option.advance_Team + '</td>' +

                '<td >' + option.mr3 + '</td>' +
                '<td >' + option.alpha_Team + '</td>' +

                '<td >' + option.mr4 + '</td>' +
                '<td >' + option.dynamic_Team + '</td>' +

                '<td >' + option.mr5 + '</td>' +
                '<td >' + option.elite_Team + '</td>' +

                '<td >' + option.mr6 + '</td>' +
                '<td >' + option.exampler_Team + '</td>' +

                '<td >' + option.mr7 + '</td>' +
                '<td >' + option.galaxy_Team + '</td>' +

                '<td >' + option.mr8 + '</td>' +
                '<td >' + option.international_Acer + '</td>' +

                '<td >' + option.mr9 + '</td>' +
                '<td >' + option.international_Max + '</td>' +


                '<td >' + option.mr10 + '</td>' +
                '<td >' + option.massTeam + '</td>' +


                '<td >' + option.mr11 + '</td>' +
                '<td >' + option.matrix_Team + '</td>' +


                '<td >' + option.mr12 + '</td>' +
                '<td >' + option.max_Team + '</td>' +


                '<td >' + option.mr13 + '</td>' +
                '<td >' + option.nationtesting + '</td>' +


                '<td >' + option.mr14 + '</td>' +
                '<td >' + option.pacer_Team + '</td>' +


                '<td >' + option.mr15 + '</td>' +
                '<td >' + option.specialty_Team + '</td>' +


                '<td >' + option.mr16 + '</td>' +
                '<td >' + option.star_Team + '</td>' +




       



                "</tr>");

        });
    }
    $('#topdivForNewDb').append("</tbody></table>");
}

function FillGridDailyCallForNewDb() {

    //myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";


    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/DailyCallForNewDb",
        data: myData,
        contentType: "application/json",
        async: false,
        success: onSuccessDailyCallForNewDb,
        error: onError,
        complete: onComplete,
        cache: false
    });

}
function onSuccessDailyCallForNewDb(data, status) {



    $('#dailycalldivHeader #dailycalltableHeader').remove();
    $('#dailycallforNewDB #dailycalltableForNewDB').remove();

    $('#dailycalldivHeader').prepend($('<table id="dailycalltableHeader" border="0" style="background-color: #D8D0C9;border-bottom-width: medium; border-color: #D8D0C9" width="1196px" height="50px">'));
    $('#dailycalltableHeader').append($('<tr><td style="font-family: News Gothic MT; color:#fff" bgcolor="#2484C6" id="tableCol1">TEAM SELECTION <select id="tableddl1" name="tableddl1" class="styledselect_form_1"><option value="-1">Select...</option></select></td><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6" align="Center"><h5 id="teamname"></h5> INFORMATION TABLE</td></tr>'));
    $('#dailycalltableHeader').append($('</tr>'));
    $('#dailycalldivHeader').append($('</table>'));

    $('#dailycallforNewDB').prepend($('<table id="dailycalltableForNewDB" border="0" style="background-color: #D8D0C9;border-bottom-width: medium; border-color: #D8D0C9" width="1196px">'));
    $('#dailycalltableForNewDB').append($('<tr><td style="font-family: News Gothic MT; color:#fff" bgcolor="#2484C6">Day</td></tr>'));
    var daycount = data.d;
  
    for (var i = 1; i <= daycount.length; i++) {

        $('#dailycalltableForNewDB tr:first-child').append($('<td style="Color:#fffff;text-align:Center;" bgcolor="#2484C6" width="27px" align="left">' + i + '</td>'));

    }
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">Day Name</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].Dayname;
            if (parseInt(cday) === ii) {
                // $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> <a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a> </td>'));
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    var ji = 0;
    var l = 31;
    var t = 0;
    var p = 'C';

    // Total TM  here..
    var p = 'M';
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">Total No of TMs</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].tmios;
            if (parseInt(cday) === ii) {
                // $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> <a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a> </td>'));
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    //Field MIOS  here..
    var p = 'M';
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6"><a style="color:#fff;" href="" onclick="return ShowMRDetails();">TMs in the Field</a> </td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].mios;
            if (parseInt(cday) === ii) {
                // $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> <a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a> </td>'));
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"><a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a></td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    var p = 'C';
        //Call  here..
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6"><a style="color:#fff;" href="" onclick="return ShowMRDetails();">No.of Calls</a></td>'));
    $.each(data.d, function (i, option) {
        t++;
    });
    jj = 1;
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].correctsms;
            if (parseInt(cday) === ii) {
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> <a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a> </td>'));
                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> 0  </td>'));
            flag = false;
        }
    }
   
    //In Range here..
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">In Range</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].inrange;
            if (parseInt(cday) === ii) {
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    //Out Range here..
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">Out of Range</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].outrange;
            if (parseInt(cday) === ii) {
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }
    //Call Avg here..
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">Avg Calls</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].avgc;
            if (parseInt(cday) === ii) {
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    //vacancies Wrk here..
    var p = 'M';
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">Vacancies</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].vacancies;
            if (parseInt(cday) === ii) {
                // $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> <a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a> </td>'));
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    //Planned Leave Wrk here..
    var p = 'M';
    //    $('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style8" bgcolor="#A28F7F">MIOs</td>'));
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">TMs ON PL</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].tmpl;
            if (parseInt(cday) === ii) {
                // $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> <a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a> </td>'));
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    //Meeting Wrk here..
    var p = 'M';
    //    $('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style8" bgcolor="#A28F7F">MIOs</td>'));
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">Planned Meetings</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].meeting;
            if (parseInt(cday) === ii) {
                // $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> <a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a> </td>'));
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">Unplanned Meetings</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].Meetst;
            if (parseInt(cday) === ii) {
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">TMs On SL</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].SKleave;
            if (parseInt(cday) === ii) {
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    $('#dailycalltableForNewDB').append($('</tr>'));
    $('#dailycallforNewDB').append($('</table>'));
    FillDropDownListtableddl();
    $('#tableddl1').change(OnChangetableddl);
    if (CurrentUserRole == 'admin') {
        $('#teamname').text("National");
        $('#tableddl1').change(OnChangetableddl);
    }

}

function FillDropDownListtableddl() {

    myData = "{'levelName':'Level3' }";
    $.ajax({
        type: "POST",
        url: "NewReports.asmx/fillGH",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessFillDropDownListtable,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });
}
function onSuccessFillDropDownListtable(data, status) {

    document.getElementById('tableddl1').innerHTML = "";

    if (data.d != "") {

        $("#tableddl1").append("<option value='0'>Select Team </option>");
        $.each(data.d, function (i, tweet) {
            //$("#tableddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            $("#tableddl1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }

}

function OnChangetableddl() {

    levelValueTeam = $('#tableddl1').val();
    if (levelValueTeam == "-1") {
        levelValueTeamName = "National";
        levelValueTeam = 0;
        if (levelValueTeam == 0) {
            levelValueTeamName = "National";
            FillDropDownListtableddl();
        }
    }
    else {
        levelValueTeamName = $("#tableddl1 option:selected").text();
    }
    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + levelValueTeam + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
      + employeeIDFORDATA + "'}";

    $.ajax({
        type: "POST",
        url: "ActiveInActiveDashboard.asmx/DailyCallForNewDb",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessFilltableddl1,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        async: false
    });


}
function onSuccessFilltableddl1(data, status) {


    $('#dailycalldivHeader #dailycalltableHeader').remove();
    $('#dailycallforNewDB #dailycalltableForNewDB').remove();


    $('#dailycalldivHeader').prepend($('<table id="dailycalltableHeader" border="0" style="background-color: #D8D0C9;border-bottom-width: medium; border-color: #D8D0C9" width="1196px" height="50px">'));
    $('#dailycalltableHeader').append($('<tr><td style="font-family: News Gothic MT; color:#fff" bgcolor="#2484C6" id="tableCol1">TEAM SELECTION <select id="tableddl1" name="tableddl1" class="styledselect_form_1"><option value="-1">Select...</option></select></td><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6" align="Center"><h5 id="teamname"></h5> INFORMATION TABLE</td></tr>'));

    $('#dailycalltableHeader').append($('</tr>'));
    $('#dailycalldivHeader').append($('</table>'));

    $('#dailycallforNewDB').prepend($('<table id="dailycalltableForNewDB" border="0" style="background-color: #D8D0C9;border-bottom-width: medium; border-color: #D8D0C9" width="1196px">'));
    $('#dailycalltableForNewDB').append($('<tr><td style="font-family: News Gothic MT; color:#fff" bgcolor="#2484C6">Name</td></tr>'));

    var daycount = data.d;
  
    for (var i = 1; i <= daycount.length; i++) {

        $('#dailycalltableForNewDB tr:first-child').append($('<td style="Color:#fffff;text-align:Center;" bgcolor="#2484C6" width="27px" align="left">' + i + '</td>'));

    }

    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">Day Name</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].Dayname;
            if (parseInt(cday) === ii) {
                // $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> <a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a> </td>'));
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    var ji = 0;
    var l = 31;
    var t = 0;
    var p = 'C';


    var p = 'M';

    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">Total No of TMs</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].tmios;
            if (parseInt(cday) === ii) {

                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }


    var p = 'M';
    //    $('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style8" bgcolor="#A28F7F">MIOs</td>'));
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6"><a style="color:#fff;" href="" onclick="return ShowMRDetails();">TMs in the Field</a> </td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].mios;
            if (parseInt(cday) === ii) {
                // $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> <a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a> </td>'));
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"><a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a></td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    var p = 'C';
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6"><a style="color:#fff;" href="" onclick="return ShowMRDetails();">No.of Calls</a></td>'));
    $.each(data.d, function (i, option) {
        t++;
    });
    jj = 1;
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].correctsms;
            if (parseInt(cday) === ii) {
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> <a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a> </td>'));
                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> 0  </td>'));
            flag = false;
        }
    }
    //In Range here..
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">In Range</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].inrange;
            if (parseInt(cday) === ii) {
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    //Out Range here..
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">Out of Range</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].outrange;
            if (parseInt(cday) === ii) {
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">Avg Calls</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].avgc;
            if (parseInt(cday) === ii) {
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    var p = 'M';
    //    $('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style8" bgcolor="#A28F7F">MIOs</td>'));
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">Vacancies</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].vacancies;
            if (parseInt(cday) === ii) {
                // $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> <a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a> </td>'));
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    var p = 'M';
    //    $('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style8" bgcolor="#A28F7F">MIOs</td>'));
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">TMs ON PL</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].tmpl;
            if (parseInt(cday) === ii) {
                // $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> <a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a> </td>'));
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    var p = 'M';
    //    $('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style8" bgcolor="#A28F7F">MIOs</td>'));
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">Planned Meetings</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].meeting;
            if (parseInt(cday) === ii) {
                // $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> <a href="" onclick="return BeforPOP(\'' + ii + '\'' + ',' + '\'' + p + '\');">' + cvalue + '</a> </td>'));
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }

    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">Unplanned Meetings</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].Meetst;
            if (parseInt(cday) === ii) {
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }//
    $('#dailycalltableForNewDB').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff"  bgcolor="#2484C6">TMs On SL</td>'));
    for (var ii = 1; ii <= daycount.length; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].SKleave;
            if (parseInt(cday) === ii) {
                $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltableForNewDB tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#1B1464;"> 0  </td>'));
            flag = false;
        }
    }
    $('#dailycalltableForNewDB').append($('</tr>'));
    $('#dailycallforNewDB').append($('</table>'));
    FillDropDownListtableddl();
    $('#tableddl1').change(OnChangetableddl);
    $('#tableddl1').val(levelValueTeam);
    $('#teamname').text(levelValueTeamName);

}
// New Dashborad Work End Here....
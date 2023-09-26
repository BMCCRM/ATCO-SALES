var employeeIDFORDATA = "0";
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
    $('#txtDate').change(OnChangedtxtDate);
    HideHierarchy();
    GetCurrentUser();
}
function OnChangedtxtDate() {
    //$('#dialog').jqm({ modal: true });
    //$('#dialog').jqm();
    //$('#dialog').jqmShow();
    IsValidUser();
    //$('#dialog').jqmHide();
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

        if (CurrentUserRole == 'headoffice') {

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
function onSuccessgetCurrentLevelID(data, status) {

    if (data.d != "") {

        $('#L1').val(data.d.split(':')[0]);
        $('#L2').val(data.d.split(':')[1]);
        $('#L3').val(data.d.split(':')[2]);
        $('#L4').val(data.d.split(':')[3]);
        $('#L5').val(data.d.split(':')[4]);
        $('#L6').val(data.d.split(':')[5]);
    } else { $('#L1').val(0); $('#L2').val(0); $('#L3').val(0); $('#L4').val(0); $('#L5').val(0); $('#L6').val(0); }

    //$('#Actcall').jqm({ modal: true });
    //$('#Actcall').jqm();
    //$('#Actcall').jqmShow();


    //    $('#TarActcall').jqm({ modal: true });
    //    $('#TarActcall').jqm();
    //    $('#TarActcall').jqmShow();

    //    $('#Drvisit').jqm({ modal: true });
    //    $('#Drvisit').jqm();
    //    $('#Drvisit').jqmShow();

    barchartEstworkingdays();

    barchartProdfre();

    barchartCustomerCov();

    callsperday();

    daysinfield();

    //ActualCallWork();

    DailyCallTrend();

    PlannedVsActualCalls();

    VisitFrequency();

    GetAverageCalls();

    FillGridTop5();

    FillGridBottom5();

    FillGridDailyCall();

    // FillGridBottom51();

    SMSCorrectness();

    SpecialityChart();
}


function SpecialityChart() {

    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'" + employeeIDFORDATA + "'}";


    $.ajax({
        type: "POST",
        url: "NewDashboard.asmx/VisitBySpeciality",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessSpecialityChart,
        error: onError,
        cache: false
    });


}

function OnSuccessSpecialityChart(data, status) {

    var json = jsonParse(data.d);
    var Series1Name = json[0].name;
    var jsondata = [];
    for (var i in json) {
        jsondata.push(json[i].data);
    }


    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'specilityChart',
            type: 'column'
        },
        title: {
            text: ' '
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: [],
            labels: {
                rotation: -45,
                align: 'right',
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
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
                        this.x + ': ' + this.y + ' ';
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


    myData = "{'date':'2015-03-01','Level1':'1','Level2':'0','Level3':'0','Level4':'0','Level5':'0','Level6':'0'}";
    $.ajax({
        type: "POST",
        url: "NewDashboard.asmx/VisitBySpecialityXaxisFill",
        contentType: "application/json; charset=utf-8",
        data: myData,
        error: onError,
        cache: false,
        success: function (data) {
            var json2 = jsonParse(data.d);
            var jsondata1 = [];
            for (var i in json2) {
                jsondata1.push(json2[i].x);
            }
            chart.xAxis[0].setCategories(jsondata1);
        }
    });

}

function ActualCallWork() {
    $('#container2').parent().find('.loding_box_outer').show().fadeIn();
    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'" + employeeIDFORDATA + "'}";
    //myData = "{'level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level6

    $.ajax({
        type: "POST",
        url: "NewDashboard.asmx/StartActualCallsWork",
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
        url: "NewDashboard.asmx/ProdFreClass",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessbarChartProdfre,
        error: onError,
        cache: false
    });
}

function OnSuccessbarChartProdfre(data, status) {

    var dataser1 = [7, 12, 16, 0];

    var OSA = [];
    var OSD = [];
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

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'prodfre',
            type: 'bar',
            spacingBottom: 15,
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10,
            width: null,
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
            backgroundColor: 'rgba(246, 246, 246, 1)',
            style: {
                color: '#00000',
                fontSize: "10px"
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
                    align: 'right',
                    color: '#FFFFFF',
                    style: {
                        fontSize: '10px'
                    }
                }
            }
        },
        xAxis: {
            categories: ['PF A', 'PF B', 'PF C', 'PF Unspecified'],
            labels: {
                style: {
                    fontWeight: 'lighter',
                    fontSize: "10px",
                    color: '#000000'
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
        url: "NewDashboard.asmx/customercoveragebyclass",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessbarCustomerCov,
        error: onError,
        cache: false
    });
}

function OnSuccessbarCustomerCov(data, status) {

    var dataser1 = [7, 12, 16, 0];

    var OSA = [];
    var OSD = [];
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

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'customerCov',
            type: 'bar',
            spacingBottom: 15,
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10,
            width: null,
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
            backgroundColor: 'rgba(246, 246, 246, 1)',
            style: {
                color: '#00000',
                fontSize: "10px"
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
                    align: 'right',
                    color: '#FFFFFF',
                    style: {
                        fontSize: '10px'
                    }
                }
            }
        },
        xAxis: {
            categories: ['A', 'B', 'C', 'Unspecified'],
            labels: {
                style: {
                    fontWeight: 'lighter',
                    fontSize: "10px",
                    color: '#000000'
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

function barchartEstworkingdays() {
    $('#container2').parent().find('.loding_box_outer').show().fadeIn();
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
        url: "NewDashboard.asmx/estworkinddays",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessbarEstworkingdays,
        error: onError,
        cache: false
    });
}

function OnSuccessbarEstworkingdays(data, status) {

    //var dataser1 = [7, 12, 16, 0, 0, 0];
    //var OSA = [];
    //$.each(dataser1, function (i, option) {

    //    OSA.push(parseFloat([option.NewRecord2]));
    //});

    var dataser1 = [7, 12, 16, 0];

    var OSA = [];

    if (data.d != null) {

        var dataser = jsonParse(data.d);

        $.each(dataser, function (i, option) {

            OSA.push(parseFloat([option.NewRecord2]));
        });
    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container2',
            type: 'bar',
            spacingBottom: 15,
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10,
            width: null,
            height: 350
        },
        credits: {
            position: {
                align: 'center'
            }
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
            backgroundColor: 'rgba(246, 246, 246, 1)',
            style: {
                color: '#00000',
                fontSize: "10px"
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
                    align: 'right',
                    color: '#FFFFFF',
                    style: {
                        fontSize: '10px'
                    }
                }
            }
        },
        xAxis: {
            categories: ['Est Working Days', 'Working Days', 'Days In Field', 'DIF With Calls', 'Day With No Activity', 'Out Field Days'],
            labels: {
                style: {
                    fontWeight: 'lighter',
                    fontSize: "10px",
                    color: '#000000'
                }
            }
        },

        yAxis: {
            title: {
                text: ' '
            }
        },

        series: [{
            showInLegend: false,
            data: OSA
            //data: dataser1

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
        url: "NewDashboard.asmx/callsperday",
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
        url: "NewDashboard.asmx/daysinfield",
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
        url: "NewDashboard.asmx/StartDailyCallTrendWork",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: OnSuccessDailyCallTrend,
        error: onError,
        cache: false
    });

}
function OnSuccessDailyCallTrend(data, status) {

    var json = jsonParse(data.d);
    var Series1Name = json[0].name;
    var jsondata = [];
    for (var i in json) {
        jsondata.push(json[i].data);
    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'ContanerDailyCallTrend',
            type: 'line',
            spacingBottom: 15,
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10,
            width: null,
            height: 300
        },
        title: {
            text: ' ',
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
            data: [13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0,
            13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0,
            13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0]
        }
        ]
    });

    $('#ContanerDailyCallTrend').parent().find('.loding_box_outer').show().fadeOut();
}

function VisitFrequency() {
    $('#ContainerVisitFrequency').parent().find('.loding_box_outer').show().fadeIn();
    //    myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";

    $.ajax({
        type: "POST",
        url: "NewDashboard.asmx/StartVisitFrequency",
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
            type: 'column',
            spacingBottom: 15,
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10,
            width: null,
            height: 350
        },
        title: {
            text: " "
        },
        credits: {
            enabled: false
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
        url: "NewDashboard.asmx/PlannedVsActualCalls",
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
    var jsondata = [];
    for (var i in json) {
        jsondata.push(json[i].data);
    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'ContainerPlannedvsAcutalCalls',
            type: 'column',
            spacingBottom: 15,
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10,
            width: null,
            height: 350
        },
        title: {
            text: ' '
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: [
                    'A',
                    'B',
                    'C'
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
                        this.x + ': ' + this.y + ' Calls';
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

function GetAverageCalls() {
    $('#ContainerAverageCalls').parent().find('.loding_box_outer').show().fadeIn();
    //    myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";

    $.ajax({
        type: "POST",
        url: "NewDashboard.asmx/GetAverageCalls",
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
            plotShadow: false,
            height: 300

        },
        title: {
            text: ' '
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
    $('#ContainerAverageCalls').parent().find('.loding_box_outer').show().fadeOut();

}

function FillGridTop5() {

    //    myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";


    $.ajax({
        type: "POST",
        url: "NewDashboard.asmx/Top5Mr",
        data: myData,
        contentType: "application/json",
        async: false,
        success: onSuccessTop5,
        error: onError,
        complete: onComplete,
        cache: false
    });

}
function onSuccessTop5(data, status) {

    $('#top5div #top5table').remove();
    $('#top5div').prepend($('<table class="mGrid1" cellspacing="0" cellpadding="2" id="top5table" style="width:100%;border-collapse:collapse;"><tr style="font-weight:bold;"><th scope="col" style="text-align:center; text-decoration:underline;">MR</th><th scope="col" style="text-align:center; text-decoration:underline;">Average Calls</th></tr>'));
    $.each(data.d, function (i, option) {
        $('#top5table').append($('<tr><td>' + option.mr + '</td><td align="center">' + option.avg + '</td></tr>'));
    });
    $('#top5div').append($('</table>'));

}

function FillGridBottom5() {

    // myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";

    $.ajax({
        type: "POST",
        url: "NewDashboard.asmx/Bottom5Mr",
        data: myData,
        contentType: "application/json",
        async: false,
        success: onSuccessBottom5,
        error: onError,
        complete: onComplete,
        cache: false
    });

}
function onSuccessBottom5(data, status) {

    $('#bottom5div #bottom5table').remove();
    $('#bottom5div').prepend($('<table class="mGrid1" cellspacing="0" cellpadding="2" id="bottom5table" style="width:100%;border-collapse:collapse;"><th scope="col" style="text-align:center;  text-decoration:underline;">MR</th><th scope="col" style="text-align:center; text-decoration:underline;">Average Calls</th></tr>'));
    $.each(data.d, function (i, option) {
        $('#bottom5table').append($('<tr><td>' + option.mr + '</td><td align="center">' + option.avg + '</td></tr>'));
    });
    $('#bottom5div').append($('</table>'));

}

function FillGridDailyCall() {

    //myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";
    myData = "{'date':'" + startdate + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'"
        + employeeIDFORDATA + "'}";


    $.ajax({
        type: "POST",
        url: "NewDashboard.asmx/DailyCall",
        data: myData,
        contentType: "application/json",
        async: false,
        success: onSuccessDailyCall,
        error: onError,
        complete: onComplete,
        cache: false
    });

}
function onSuccessDailyCall(data, status) {

    $('#dailycalldiv #dailycalltable').remove();


    $('#dailycalldiv').prepend($('<table id="dailycalltable" border="0" style="background-color: #0099da;border-bottom-width: medium; border-color: #D8D0C9" width="100%" height="200px">'));
    $('#dailycalltable').append($('<tr><td style="font-family: News Gothic MT; color:black" class="style8" bgcolor="#0099da">Day</td></tr>'));

    for (var i = 1; i <= 31; i++) {

        $('#dailycalltable tr:first-child').append($('<td style="Color:black;text-align:Center;" bgcolor="#0099da" width="27px" align="left">' + i + '</td>'));

    }

    //Plans 
    //$('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style9" bgcolor="#21668D">Plans</td>'));
    //for (var ii = 1; ii <= 31; ii++) {
    //    var flag = false;
    //    $.each(data.d, function (i, option) {
    //        console.log(option);
    //        var cday = data.d[i].days;
    //        var cvalue = data.d[i].plan;
    //        if (parseInt(cday) === ii) {
    //            $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;">' + cvalue + '</td>'));

    //            flag = true;
    //        }
    //    });

    //    if (flag == false) {
    //        $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> 0  </td>'));
    //        flag = false;
    //    }
    //}
    //end plans


    $('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:black" class="style7" bgcolor="#0099da" width="90px">Calls</td>'));
    var ji = 0;
    var l = 31;
    var t = 0;
    var p = 'C';


    $.each(data.d, function (i, option) {
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
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].correctsms;

            var M = "./Report_Calls.aspx?Day=" + cday + "&Month=" + ddlReport + "&Level3=" + level3id + "&Level4=" + level4id + "&Level5=" + level5id + "&Level6=" + level6id + "&employeeid=" + employeID;
            var C = "./Report_MIO.aspx?Day=" + cday + "&Month=" + ddlReport + "&Level3=" + level3id + "&Level4=" + level4id + "&Level5=" + level5id + "&Level6=" + level6id + "&employeeid=" + employeID;

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
    //    $('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style8" bgcolor="#A28F7F">MIOs</td>'));
    $('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:#fff" class="style8" bgcolor="#0099da"><a style="color:black;" href="" onclick="return ShowMRDetails();">SPOs</a> </td>'));

    var oncl = 'onclick="return !window.open(this.href,' + "'myWindow'," + "'status = 1, height = 500, width = 600, scrollbars=yes, resizable = 0'" + ')"';
    var ahref = "";

    for (var ii = 1; ii <= 31; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].mios;

            var M = "./Report_Calls.aspx?Day=" + cday + "&Month=" + ddlReport + "&Level3=" + level3id + "&Level4=" + level4id + "&Level5=" + level5id + "&Level6=" + level6id + "&employeeid=" + employeID;
            var C = "./Report_MIO.aspx?Day=" + cday + "&Month=" + ddlReport + "&Level3=" + level3id + "&Level4=" + level4id + "&Level5=" + level5id + "&Level6=" + level6id + "&employeeid=" + employeID;

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

    $('#dailycalltable').append($('</tr><tr><td style="font-family: News Gothic MT; color:black" class="style9" bgcolor="#0099da">Avg Calls</td>'));
    for (var ii = 1; ii <= 31; ii++) {
        var flag = false;
        $.each(data.d, function (i, option) {
            var cday = data.d[i].days;
            var cvalue = data.d[i].avgc;
            if (parseInt(cday) === ii) {
                $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;">' + cvalue + '</td>'));

                flag = true;
            }
        });

        if (flag == false) {
            $('#dailycalltable tr:last-child').append($('<td width="27px" align="Center" bgcolor="#fffff" style="font-size:10 pt;color:#000;"> 0  </td>'));
            flag = false;
        }
    }

    $('#dailycalltable').append($('</tr>'));
    $('#dailycalldiv').append($('</table>'));

}


var da, pa;

function BeforPOP(day, para) {
    myData = '';
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

    myData = "{'date':'" + 0 + "','Level1':'" + 1 + "','Level2':'" + 2 + "','Level3':'" + 3 + "','Level4':'" + 4 + "','Level5':'" + 5 + "','Level6':'" + 6 + "'}";

    $.ajax({
        type: "POST",
        url: "NewDashboard.asmx/Bottom5Mr1",
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
        url: "NewDashboard.asmx/SmsCorrectness",
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
    $('#SMSCorrectInCorrect').parent().find('.loding_box_outer').show().fadeIn();
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
        credits: {
            enabled: false
        },
        xAxis: {
            max: 30,
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
        },
        yAxis: {
            min: 0,
            title: {
                text: ' '
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
                    //events: {
                    //    click: function () {

                    //        $.ajax({
                    //            type: "POST",
                    //            url: "NewDashboard.asmx/GetLevelsID",
                    //            contentType: "application/json; charset=utf-8",
                    //            data: myData,
                    //            success: onSuccessGetLevel,
                    //            error: onError,
                    //            cache: false
                    //        });
                    //    }
                    //},
                    name: json[1].name,
                    data: json[1].data
                },
                {
                    cursor: 'pointer',
                    //events: {
                    //    click: function () {

                    //        $.ajax({
                    //            type: "POST",
                    //            url: "NewDashboard.asmx/GetLevelsID",
                    //            contentType: "application/json; charset=utf-8",
                    //            data: myData,
                    //            success: onSuccessGetLevel,
                    //            error: onError,
                    //            cache: false
                    //        });
                    //    }
                    //},
                    name: json[0].name,
                    data: json[0].data
                }
        ]
    });
    $('#SMSCorrectInCorrect').parent().find('.loding_box_outer').show().fadeOut();

}
function onSuccessGetLevel(data, status) {

    var level1id, level2id, level3id, level4id, level5id, level6id, employeID;

    var json1 = jsonParse(data.d);
    //    level1id = json1[0].levelvalue;
    //    level2id = json1[1].levelvalue;
    //    level3id = json1[2].levelvalue;
    //    level4id = json1[3].levelvalue;
    //    level5id = json1[4].levelvalue;
    //    level6id = json1[5].levelvalue;
    //    employeID = json1[6].levelvalue;
    level1id = $('#L1').val();
    level2id = $('#L2').val();
    level3id = $('#L3').val();
    level4id = $('#L4').val();
    level5id = $('#L5').val();
    level6id = $('#L6').val();
    employeID = $('#L6').val();

    ShowSMSCorrectnessReport(xvalue, seriesName, yvalue, 'ZOne', 'MR', level3id, level4id, level5id, level6id, employeID);
}
function onSuccessGetLevel1(data, status) {

    var level1id, level2id, level3id, level4id, level5id, level6id, employeID;

    var json1 = jsonParse(data.d);
    //    level1id = json1[0].levelvalue;
    //    level2id = json1[1].levelvalue;
    //    level3id = json1[2].levelvalue;
    //    level4id = json1[3].levelvalue;
    //    level5id = json1[4].levelvalue;
    //    level6id = json1[5].levelvalue;
    //    employeID = json1[6].levelvalue;
    level1id = $('#L1').val();
    level2id = $('#L2').val();
    level3id = $('#L3').val();
    level4id = $('#L4').val();
    level5id = $('#L5').val();
    level6id = $('#L6').val();
    employeID = $('#L6').val();

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
            if (CurrentUserRole == 'headoffice') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3);
                $('#Label2').append(HierarchyLevel4);
                $('#Label3').append(HierarchyLevel5);
                $('#Label4').append(HierarchyLevel6);
            }
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
        name = 'Select ' + HierarchyLevel4;
        $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
    IsValidUser();


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
        name = 'Select ' + HierarchyLevel5;
        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
    IsValidUser();


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
        name = 'Select ' + HierarchyLevel6;
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
    IsValidUser();


}

function OnChangeddl4() {



    IsValidUser();

}
function onSuccessFillddl4(data, status) {



    IsValidUser();

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
            cal._visibleDate = target.date;
            cal.set_selectedDate(target.date);
            cal._switchMonth(target.date);
            cal._blur.post(true);
            cal.raiseDateSelectionChanged();
            break;
    }
}
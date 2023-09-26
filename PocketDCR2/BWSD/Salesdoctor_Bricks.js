var employeeIDFORDATA = "0";
var startDateValidate = "0";

var
    HierarchyLevel1,
    HierarchyLevel2,
    HierarchyLevel3,
    HierarchyLevel4,
    HierarchyLevel5,
    HierarchyLevel6


$(document).ready(function () {

    OnChangeddl6();

    $("#ddl7Doc").change(function () {

        var selectedProId = $("#ddl7Doc").val();    //$(this).val();
        GetProductddl(selectedProId);
    });

   
    $('#contain').hide();

    var cdt = new Date();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var current_mint = cdt.getMinutes();
    var current_hrs = cdt.getHours();
    var current_date = cdt.getDate();

    var current_month = cdt.getMonth();
    var month_name = monthNames[current_month];
    var current_year = cdt.getFullYear();


    if (current_date == cdt.getDate()) {

        var current_date2 = current_date;
        var current_date3 = current_date + 1;
    }

    var current_month1 = cdt.getMonth();
    var current_month1 = current_month + 1;
    var month_name1 = monthNames[current_month];
    var current_year1 = cdt.getFullYear();

    $('#stdate').val(current_month1 + '/' + current_date2 + '/' + current_year1);
    $('#enddate').val(current_month1 + '/' + current_date3 + '/' + current_year1);

    //$('#stdate').val(current_year1 + '-' + current_month1 + '-' + current_date2);
    //$('#enddate').val(current_year1 + '-' + current_month1 + '-' + current_date3);

    $('#txtDate').val(month_name + '-' + current_year);
    $('#txtYear').val(current_year);


   



    $('#txtDate').datepicker({
        autoclose: true,
        todayHighlight: true,
        viewMode: 'months',
        minViewMode: "months",
        format: 'MM-yyyy'
    }).datepicker();

    $('#txtYear').datepicker({
        autoclose: true,
        todayHighlight: true,
        viewMode: 'years',
        minViewMode: "years",
        format: 'yyyy'
    }).datepicker();


    $('#stdate').datepicker({
        autoclose: true,
        todayHighlight: true,
        viewMode: 'date',
        minViewMode: "date",
        dateFormat: 'MM dd, yy'
    }).datepicker();

    $('#enddate').datepicker({
        autoclose: true,
        todayHighlight: true,
        viewMode: 'date',
        minViewMode: "date",
        dateFormat: 'MM dd, yy'
    }).datepicker();


    //IsValidUser();
    //$('#ddl1').change(OnChangeddl1);
    //$('#ddl2').change(OnChangeddl2);
    //$('#ddl3').change(OnChangeddl3);
    //$('#ddl4').change(OnChangeddl4);
    //$('#ddl5').change(OnChangeddl5);
    //$('#ddl6').change(OnChangeddl6);

    //$('#ddlreport').change(OnChangeddreport);

    //$('#ddldistrib').change(OnChangeddlDistributer);
    //$('#ddlBricks').change(OnChangeddlBricks);

    //HideHierarchy();
    //GetCurrentUser();
    //FillDistributor();

   
});


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

        if ($('#ddl4').val() != null) {
            level6 = $('#ddl4').val();
        } else {
            level6 = -1
        }


        startdate = $('#txtDate').val();
        // enddate = $('#txtenddate').val();

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
        url: "../Reports/datascreen.asmx/GetCurrentLevelId",
        contentType: "application/json; charset=utf-8",
        data: myData,
        success: onSuccessgetCurrentLevelID,
        error: onError,
        cache: false
    });

}


function EnableHierarchyViaLevel() {

    if (glbVarLevelName == "Level1") {

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {

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

    if (data.d != "" && data.d != "[]") {

        $('#L1').val(data.d.split(':')[0]);
        $('#L2').val(data.d.split(':')[1]);
        $('#L3').val(data.d.split(':')[2]);
        $('#L4').val(data.d.split(':')[3]);
        $('#L5').val(data.d.split(':')[4]);
        $('#L6').val(data.d.split(':')[5]);
        $('#L7').val('');
        $('#L8').val('');
    } else {
        $('#L1').val(0);
        $('#L2').val(0);
        $('#L3').val(0);
        $('#L4').val(0);
        $('#L5').val(0);
        $('#L6').val(0);
        $('#L7').val(0);
        $('#L8').val(0);
    }

    //$('#Actcall').jqm({ modal: true });
    //$('#Actcall').jqm();
    //$('#Actcall').jqmShow();

    //this all level call
    //faraz
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

    if (data.d != "" && data.d != "[]") {

        EmployeeId = data.d;
    }
    GetTeams(EmployeeId);
    GetProducts(EmployeeId);
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

    if (data.d != "" && data.d != "[]") {

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

    if (data.d != "" && data.d != "[]") {

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

    if (data.d != "" && data.d != "[]") {

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

    if (data.d != "" && data.d != "[]") {

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

    if (data.d != "" && data.d != "[]") {

        jsonObj = jsonParse(data.d);
        glbVarLevelName = jsonObj[0].SettingName;

        if (glbVarLevelName == "Level1") {
            try {

                HierarchyLevel1 = jsonObj[0].SettingValue;
                HierarchyLevel2 = jsonObj[1].SettingValue;
                HierarchyLevel3 = jsonObj[2].SettingValue;
                HierarchyLevel4 = jsonObj[3].SettingValue;
                HierarchyLevel5 = jsonObj[4].SettingValue;
                HierarchyLevel6 = jsonObj[5].SettingValue;

            } catch (e) {
                console.log(e);
            }

        }

        HideHierarchy();
        EnableHierarchyViaLevel();
    }
}
function EnableHierarchyViaLevel() {

    if (glbVarLevelName == "Level1") {

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {

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
        //  url: "../Reports/datascreen.asmx/FilterDropDownList",
        url: "../Reports/NewReports.asmx/fillGH",
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


    if (data.d != "" && data.d != "[]") {

        //  jsonObj = jsonParse(data.d);

        if (glbVarLevelName == "Level1") {


            try {
                document.getElementById('ddl1').innerHTML = "";
                document.getElementById('ddl2').innerHTML = "";
                document.getElementById('ddl3').innerHTML = "";
                document.getElementById('ddl4').innerHTML = "";
                document.getElementById('ddl5').innerHTML = "";
                document.getElementById('ddl6').innerHTML = "";

            } catch (e) {
                console.log(e);
            }


            value = '-1';

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
                name = 'Select ' + HierarchyLevel1;
                $('#Label1').append(HierarchyLevel1);
                $('#Label2').append(HierarchyLevel2);
                $('#Label3').append(HierarchyLevel3);
                $('#Label4').append(HierarchyLevel4);
                $('#Label5').append(HierarchyLevel5);
                $('#Label6').append(HierarchyLevel6);
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

            $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                $("#ddl1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            });

        }

    }
}


function OnChangeddl1() {
    debugger;

    levelValue = $('#ddl1').val();
    myData = "{'level1Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L1",
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
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
    }

}
function onSuccessFillddl1(data, status) {

    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "" && data.d != "[]") {

        //  jsonObj = jsonParse(data.d);
        value = '-1';
        name = 'Select ' + HierarchyLevel2;
        $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddl2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }
    //  IsValidUser();
    // OnChangeddl4();

}

function OnChangeddl2() {

    debugger;

    levelValue = $('#ddl2').val();

    myData = "{'level2Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L2",
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

    if (data.d != "" && data.d != "[]") {

        //    jsonObj = jsonParse(data.d);


        value = '-1';
        name = 'Select ' + HierarchyLevel3;
        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddl3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }
    // IsValidUser();
    //FillGridMioInfo();
    // OnChangeddl4();
}

function OnChangeddl3() {

    debugger;

    levelValue = $('#ddl3').val();
    myData = "{'level3Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L3",
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

    if (data.d != "" && data.d != "[]") {
        //   jsonObj = jsonParse(data.d);
        value = '-1';
        name = 'Select ' + HierarchyLevel4;
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddl4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }
    //  IsValidUser();
    //FillGridMioInfo();
    //  OnChangeddl4();
}

function OnChangeddl4() {

    debugger;
    levelValue = $('#ddl4').val();
    myData = "{'level4Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L4",
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


    //if ($('#ddl1').val() != '-1' && $('#ddl2').val() == '-1') {
    //    $('#L1').val($('#ddl1').val());
    //    $('#L2').val(0);
    //    $('#L3').val(0);
    //    $('#L4').val(0);
    //    $('#L5').val(0);
    //    $('#L6').val(0);
    //    $('#L7').val(0);
    //}
    //if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() == '-1') {

    //    $('#L1').val($('#ddl1').val());
    //    $('#L2').val($('#ddl2').val());
    //    $('#L3').val(0);
    //    $('#L4').val(0);
    //    $('#L5').val(0);
    //    $('#L6').val(0);
    //    $('#L7').val(0);
    //}
    //if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() != '-1' && $('#ddl4').val() == '-1') {

    //    $('#L1').val($('#ddl1').val());
    //    $('#L2').val($('#ddl2').val());
    //    $('#L3').val($('#ddl3').val());
    //    $('#L4').val(0);
    //    $('#L5').val(0);
    //    $('#L6').val(0);
    //    $('#L7').val(0);
    //}

    //if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() != '-1' && $('#ddl4').val() != '-1' && $('#ddldistrib').val() == '-1') {
    //    $('#L1').val($('#ddl1').val());
    //    $('#L2').val($('#ddl2').val());
    //    $('#L3').val($('#ddl3').val());
    //    $('#L4').val($('#ddl4').val());
    //    $('#L5').val(0);
    //    $('#L6').val(0);
    //    $('#L7').val(0);
    //}


    //  IsValidUser();

}
function onSuccessFillddl4(data, status) {



    {

        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        if (data.d != "" && data.d != "[]") {

            name = 'Select ' + HierarchyLevel4;
            $("#ddl5").append("<option value='" + value + "'>" + name + "</option>");
            $.each(data.d, function (i, tweet) {
                $("#ddl5").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            });

        }

    }



    // IsValidUser();

}

function OnChangeddl5() {
    debugger;
    levelValue = $('#ddl5').val();
    myData = "{'level5Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            //  url: "../Reports/datascreen.asmx/GetEmployee",
            url: "../Reports/NewReports.asmx/fillGH_L5",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl5,
            error: onError,
            cache: false
        });
    }
    else {
        document.getElementById('ddl6').innerHTML = "";
    }

}
function onSuccessFillddl5(data, status) {

    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "" && data.d != "[]") {

        $("#ddl6").append("<option value='-1'>Select SPO</option>");
        $.each(data.d, function (i, tweet) {
            $("#ddl6").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });

    }

}

//-------------------------------------- For Doctor -----------------------------------------------------------------------------------

function OnChangeddl6() {

    $.ajax({
        type: "POST",
        url: "Salesdoctor_Bricks.asmx/GetDoctor",
       // data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessFillDoc,
        //success: function (response) {
        //    console.log(response);
        //},
        error: onError,
        //function(response) {
        //    console.log(response);
        //},

        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
    //}
    //else {
    //    document.getElementById('ddl7Doc').innerHTML = "";
    //}

}
function OnSuccessFillDoc(data, status) {

    $("#ddl7Doc").empty();
    $("#ddl7Doc").append("<option value='-1'>Select doctor</option>");

    if (data.d != "" && data.d != "[]") {

        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, tweet) {
            $("#ddl7Doc").append("<option value='" + jsonObj[i].DoctorCode + "'>" + jsonObj[i].DoctorName + "</option>");
        });
    }

    // OnChangeddlDistributer();
}

function GetProductddl(Dcotor_id) {
    debugger;
    myData = "{'Dcotor_id':'" + Dcotor_id + "'}";
    $.ajax({
        type: "POST",
        url: "Salesdoctor_Bricks.asmx/GetProduct",
        contentType: "application/json;",
        data: myData,
        dataType: "json",
        async: false,
        success: function (response, data, status) {
            $("#ddlPro").empty();
            $("#ddlPro").append("<option value='-1'>Select Product</option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $("#ddlPro").append("<option value='" + option.SkuId + "'>" + option.SkuName + "</option>");
                });
            }
        },
        error: onError,
        cache: false
    });
}
//----------------------------------------------------Product ddl--------------------------------------------------





function OnChangeddreport() {
    reportvalue = $('#ddlreport').val();

    $('#divSalesGeographyContainer').show();
    $('#divTeams').hide();

    if (reportvalue != -1) {
        $('#h1').val(reportvalue);

        //if (reportvalue == "1") {
        //    $('#divDist').show();
        //    $('#divBrick').show();
        //    $('#divCust').hide();
        //    $('#divProd').hide();
        //    $('#divDDL1').show();
        //    $('#divDDL2').show();
        //    $('#divDDL3').show();
        //    $('#divDDL4').show();
        //    $('#divDDL5').show();
        //    $('#divDDL6').show();
        //    $('#lblMonth').show();
        //    $('#divMonth').show();

        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYearfromdate').hide();
        //    $('#lblYeartodate').hide();
        //    $('#divYearfromday').hide();
        //    $('#divYeartomday').hide();


        //}
        //else if (reportvalue == "7") {
        //    $('#divCust').hide();
        //    $('#divDDL1').show();
        //    $('#divDDL2').show();
        //    $('#divDDL3').show();
        //    $('#divDDL4').show();
        //    $('#divDDL5').show();
        //    $('#divDDL6').show();
        //    $('#divProd').hide();
        //    $('#lblMonth').show();
        //    $('#divMonth').show();

        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYearfromdate').hide();
        //    $('#lblYeartodate').hide();
        //    $('#divYearfromday').hide();
        //    $('#divYeartomday').hide();
        //}
        //else if (reportvalue == "17") {
        //    $('#divDist').hide();
        //    $('#divBrick').hide();
        //    $('#divCust').hide();
        //    $('#divDDL1').hide();
        //    $('#divDDL2').hide();
        //    $('#divDDL3').hide();
        //    $('#divDDL4').hide();
        //    $('#divDDL5').hide();
        //    $('#divDDL6').hide();
        //    $('#divProd').hide();

        //    $('#lblMonth').show();
        //    $('#divMonth').show();

        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYearfromdate').hide();
        //    $('#lblYeartodate').hide();
        //    $('#divYearfromday').hide();
        //    $('#divYeartomday').hide();
        //}
        //else if (reportvalue == "18") {
        //    $('#divDist').hide();
        //    $('#divBrick').hide();
        //    $('#divCust').hide();
        //    $('#divDDL1').hide();
        //    $('#divDDL2').hide();
        //    $('#divDDL3').hide();
        //    $('#divDDL4').hide();
        //    $('#divDDL5').hide();
        //    $('#divDDL6').hide();
        //    $('#divProd').hide();
        //    $('#ddl7Doc').hide();

        //    $('#lblMonth').hide();
        //    $('#divMonth').hide();
        //    $('#lblYear').show();
        //    $('#divYear').show();
        //    $('#lblYear').show();
        //    $('#divYear').show();
        //    $('#lblYearfromdate').hide();
        //    $('#lblYeartodate').hide();
        //    $('#divYearfromday').hide();
        //    $('#divYeartomday').hide();
        //}
        //else if (reportvalue == "19") {

        //    $('#divDist').show();
        //    $('#divBrick').hide();
        //    $('#divCust').hide();
        //    $('#divDDL1').hide();
        //    $('#divDDL2').hide();
        //    $('#divDDL3').hide();
        //    $('#divDDL4').hide();
        //    $('#divDDL5').hide();
        //    $('#divDDL6').hide();
        //    $('#ddl7Doc').hide();
        //    $('#lblMonth').hide();
        //    $('#divMonth').hide();
        //    $('#divProd').show();
        //    $('#lblYear').show();
        //    $('#divYear').show();

        //    $('#lblYearfromdate').hide();
        //    $('#lblYeartodate').hide();
        //    $('#divYearfromday').hide();
        //    $('#divYeartomday').hide();
        //}
        //else if (reportvalue == "20") {

        //    $('#divSalesGeographyContainer').hide();
        //    $('#divDist').show();
        //    $('#divBrick').show();
        //    $('#divCust').hide();
        //    $('#divDDL1').show();
        //    $('#divDDL2').show();
        //    $('#divDDL3').show();
        //    $('#divDDL4').show();
        //    $('#divDDL5').show();
        //    $('#divDDL6').show();
        //    $('#divProd').hide();
        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYearfromdate').hide();
        //    $('#lblYeartodate').hide();
        //    $('#divYearfromday').hide();
        //    $('#divYeartomday').hide();
        //}
        //else if (reportvalue == "21") {

        //    $('#divSalesGeographyContainer').hide();
        //    $('#divTeams').show();
        //    $('#divDist').show();
        //    $('#divBrick').show();
        //    $('#divCust').hide();
        //    $('#divDDL1').show();
        //    $('#divDDL2').show();
        //    $('#divDDL3').show();
        //    $('#divDDL4').show();
        //    $('#divDDL5').show();
        //    $('#divDDL6').show();
        //    $('#lblMonth').hide();
        //    $('#divMonth').hide();
        //    $('#lblYear').show();
        //    $('#divYear').show();
        //    $('#divProd').hide();
        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYearfromdate').hide();
        //    $('#lblYeartodate').hide();
        //    $('#divYearfromday').hide();
        //    $('#divYeartomday').hide();
        //}
        //else if (reportvalue == "22") {

        //    $('#divSalesGeographyContainer').hide();
        //    $('#divTeams').show();
        //    $('#divDist').show();
        //    $('#divBrick').show();
        //    $('#divCust').hide();
        //    $('#divDDL1').show();
        //    $('#divDDL2').show();
        //    $('#divDDL3').show();
        //    $('#divDDL4').show();
        //    $('#divDDL5').show();
        //    $('#divDDL6').show();
        //    $('#lblMonth').hide();
        //    $('#divMonth').hide();
        //    $('#lblYear').show();
        //    $('#divYear').show();
        //    $('#divProd').hide();
        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYearfromdate').hide();
        //    $('#lblYeartodate').hide();
        //    $('#divYearfromday').hide();
        //    $('#divYeartomday').hide();
        //}
        //else if (reportvalue == "23") {

        //    $('#divSalesGeographyContainer').hide();
        //    $('#divTeams').show();
        //    $('#divDist').show();
        //    $('#divBrick').show();
        //    $('#divCust').hide();
        //    $('#divProd').hide();
        //    $('#divDDL1').show();
        //    $('#divDDL2').show();
        //    $('#divDDL3').show();
        //    $('#divDDL4').show();
        //    $('#divDDL5').show();
        //    $('#divDDL6').show();
        //    $('#lblMonth').hide();
        //    $('#divMonth').hide();
        //    $('#lblYear').show();
        //    $('#divYear').show();
        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYearfromdate').hide();
        //    $('#lblYeartodate').hide();
        //    $('#divYearfromday').hide();
        //    $('#divYeartomday').hide();


        //}
        //else if (reportvalue == "24") {

        //    $('#divSalesGeographyContainer').hide();
        //    $('#divTeams').hide();
        //    $('#divDist').hide();
        //    $('#divBrick').hide();
        //    $('#divCust').hide();
        //    $('#divProd').hide();
        //    $('#divDDL1').hide();
        //    $('#divDDL2').hide();
        //    $('#divDDL3').hide();
        //    $('#divDDL4').hide();
        //    $('#divDDL5').hide();
        //    $('#divDDL6').hide();
        //    $('#ddl7Doc').hide();
        //    $('#lblMonth').hide();
        //    $('#divMonth').hide();
        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYearfromdate').hide();
        //    $('#lblYeartodate').hide();
        //    $('#divYearfromday').hide();
        //    $('#divYeartomday').hide();

        //}


        //else if (reportvalue == "26") {

        //    $('#divSalesGeographyContainer').hide();
        //    $('#divTeams').hide();
        //    $('#divDist').hide();
        //    $('#divBrick').hide();
        //    $('#divCust').hide();
        //    $('#divProd').hide();
        //    $('#divDDL1').show();
        //    $('#divDDL2').show();
        //    $('#divDDL3').show();
        //    $('#divDDL4').show();
        //    $('#divDDL5').show();
        //    $('#divDDL6').show();
        //    $('#ddl7Doc').hide();
        //    $('#lblMonth').show();
        //    $('#divMonth').show();
        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYearfromdate').hide();
        //    $('#lblYeartodate').hide();
        //    $('#divYearfromday').hide();
        //    $('#divYeartomday').hide();

        //}

        //else if (reportvalue == "28") {
        //    $('#divSalesGeographyContainer').show();

        //    $('#lblMonth').show();
        //    $('#divMonth').show();
        //    $('#divTeams').show();
        //    $('#divDist').show();
        //    $('#divBrick').show();
        //    $('#divCust').show();
        //    $('#divProd').hide();
        //    $('#divDDL1').hide();
        //    $('#divDDL2').hide();
        //    $('#divDDL3').hide();
        //    $('#divDDL4').hide();
        //    $('#divDDL5').hide();
        //    $('#divDDL6').hide();
        //    $('#divDDL7').hide();
        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYearfromdate').hide();
        //    $('#lblYeartodate').hide();
        //    $('#divYearfromday').hide();
        //    $('#divYeartomday').hide();

        //}

        //else if (reportvalue == "29") {
        //    $('#divSalesGeographyContainer').show();

        //    $('#lblMonth').hide();
        //    $('#divMonth').hide();
        //    $('#divTeams').show();
        //    $('#divDist').show();
        //    $('#divBrick').show();
        //    $('#divCust').show();
        //    $('#divProd').show();
        //    $('#divDDL1').hide();
        //    $('#divDDL2').hide();
        //    $('#divDDL3').hide();
        //    $('#divDDL4').hide();
        //    $('#divDDL5').hide();
        //    $('#divDDL6').hide();
        //    $('#divDDL7').hide();
        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYearfromdate').show();
        //    $('#lblYeartodate').show();
        //    $('#divYearfromday').show();
        //    $('#divYeartomday').show();

        //}
        //else if (reportvalue == "30") {
        //    $('#divSalesGeographyContainer').show();

        //    $('#lblMonth').show();
        //    $('#divMonth').show();
        //    $('#divTeams').hide();
        //    $('#divDist').hide();
        //    $('#divBrick').hide();
        //    $('#divCust').hide();
        //    $('#divProd').hide();
        //    $('#divDDL1').hide();
        //    $('#divDDL2').hide();
        //    $('#divDDL3').hide();
        //    $('#divDDL4').hide();
        //    $('#divDDL5').hide();
        //    $('#divDDL6').hide();
        //    $('#divDDL7').hide();
        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYear').hide();
        //    $('#divYear').hide();
        //    $('#lblYearfromdate').hide();
        //    $('#lblYeartodate').hide();
        //    $('#divYearfromday').hide();
        //    $('#divYeartomday').hide();

        //}
        ////else if (reportvalue == "25") {

        ////    $('#divSalesGeographyContainer').hide();
        ////    $('#divTeams').hide();
        ////    $('#divDist').hide();
        ////    $('#divBrick').hide();
        ////    $('#divCust').hide();
        ////    $('#divDDL1').hide();
        ////    $('#divDDL2').hide();
        ////    $('#divDDL3').hide();
        ////    $('#divDDL4').hide();
        ////    $('#divDDL5').hide();
        ////    $('#divDDL6').hide();
        ////    $('#lblMonth').hide();
        ////    $('#divMonth').hide();
        ////    $('#lblYear').hide();
        ////    $('#divYear').hide();
        ////}
        if (reportvalue == "4")
        {
            $('#divDist').show();
            $('#divTeams').hide();  //show();
            $('#divCust').show();
            $('#divDDL1').show();
            $('#divDDL2').show();
            $('#divDDL3').show();
            $('#divDDL4').show();
            $('#divDDL5').show();
            $('#divDDL6').show();
            $('#lblMonth').show();
            $('#divMonth').show();
            $('#lblYear').hide();
            $('#divYear').hide();
            $('#divProd').hide();
        }

    }

    else {

        $('#ddlreport').val(reportvalue);
        //  $('#content-table-inner').hide();
    }


}

function FillDistributor() {


    $.ajax({
        type: "POST",
        url: "../SalesMod/ProductAlignmentService.asmx/GetAllDistributor",
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d != '' && response.d != '[]') {
                var msg = $.parseJSON(response.d);
                $('#ddldistrib').empty();
                $('#ddldistrib').append('<option value="-1" selected="selected">Select distributor</option>');
                for (var i = 0; i < msg.length; i++) {

                    if (i < 1) {
                        $('#ddldistrib').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');
                    } else {
                        $('#ddldistrib').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');
                    }
                }
            }
        },
        error: onError,
        async: false,
        cache: false
    });
}

function OnChangeddlDistributer() {

    TerritoryID = $('#ddl6').val();
    levelValue = $('#ddldistrib').val();
    myData = "{'TerritoryID':'" + TerritoryID + "','DistributorID':'" + levelValue + "' }";



    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "NewSalesdashboard.asmx/GetDistributorbrick",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnChangeddlDistributerSuccess,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        document.getElementById('ddlBricks').innerHTML = "";
    }
}

function OnChangeddlDistributerSuccess(data, status) {

    $("#ddlBricks").empty();
    $("#ddlBricks").append("<option value='-1'>Select brick</option>");
    if (data.d != "" && data.d != "[]") {
        jsonObj = jsonParse(data.d);
        $.each(jsonObj, function (i, tweet) {
            $("#ddlBricks").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].BrickName + "</option>");
        });
    }
}


function OnChangeddlBricks() {


    levelValue = $('#ddldistrib').val();
    brickID = $('#ddlBricks').val();
    myData = "{'DistributorID':'" + levelValue + "','BrickID':'" + brickID + "' }";

    if (brickID != -1) {

        $.ajax({
            type: "POST",
            url: "NewSalesdashboard.asmx/GetClient",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessOnChangeddlBricks,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        document.getElementById('ddlcustomer').innerHTML = "";
    }
}
function onSuccessOnChangeddlBricks(data, status) {

    $("#ddlcustomer").empty();
    $("#ddlcustomer").append("<option value='-1'>Select Customer</option>");
    if (data.d != "" && data.d != "[]") {
        jsonObj = jsonParse(data.d);
        $.each(jsonObj, function (i, tweet) {
            $("#ddlcustomer").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].PharmacyCode + '-' + jsonObj[i].PharmacyName + "</option>");
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

function onError(request, status, error) {

    msg = 'Error occoured';

    $('#loadingdiv div').hide();

    $('#RenderReport').html('<h5 style="text-align:center">Some Error Found While Creating Report.</h5>').parent().parent().show();
    //$.fn.jQueryMsg({
    //    msg: msg,
    //    msgClass: 'error',
    //    fx: 'slide',
    //    speed: 500
    //});
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
//----------------------------------------------


function GetAlldata() {
    //if ($('#ddlreport').val() == '-1') {
    //    $("#report").addClass("has-error");
    //    return false;
    //} else {
    //    $("#report").removeClass("has-error");
    //}

    //$('#RenderReport').html('<h4 style="text-align:center">No Data Found</h4>').parent().parent().show();

    //if ($('#ddl1').val() != '-1' && $('#ddl2').val() == '-1') {
    //    $('#L1').val($('#ddl1').val());
    //    $('#L2').val(0);
    //    $('#L3').val(0);
    //    $('#L4').val(0);
    //    $('#L5').val(0);
    //    $('#L6').val(0);
    //    $('#L7').val(0);
    //    $('#L8').val(0);
    //    $('#L9').val(0);
    //}
    //if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() == '-1') {

    //    $('#L1').val($('#ddl1').val());
    //    $('#L2').val($('#ddl2').val());
    //    $('#L3').val(0);
    //    $('#L4').val(0);
    //    $('#L5').val(0);
    //    $('#L6').val(0);
    //    $('#L7').val(0);
    //    $('#L8').val(0);
    //    $('#L9').val(0);
    //}
    //if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() != '-1' && $('#ddl4').val() == '-1') {
    //    $('#L1').val($('#ddl1').val());
    //    $('#L2').val($('#ddl2').val());
    //    $('#L3').val($('#ddl3').val());
    //    $('#L4').val(0);
    //    $('#L5').val(0);
    //    $('#L6').val(0);
    //    $('#L7').val(0);
    //    $('#L8').val(0);
    //    $('#L9').val(0);
    //}

    //if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() != '-1' && $('#ddl4').val() != '-1' && $('#ddldistrib').val() == '-1') {
    //    $('#L1').val($('#ddl1').val());
    //    $('#L2').val($('#ddl2').val());
    //    $('#L3').val($('#ddl3').val());
    //    $('#L4').val($('#ddl4').val());
    //    $('#L5').val(0);
    //    $('#L6').val(0);
    //    $('#L7').val(0);
    //    $('#L8').val(0);
    //    $('#L9').val(0);
    //}

    //if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() != '-1' && $('#ddl4').val() != '-1' && $('#ddldistrib').val() != '-1') {
    //    $('#L1').val($('#ddl1').val());
    //    $('#L2').val($('#ddl2').val());
    //    $('#L3').val($('#ddl3').val());
    //    $('#L4').val($('#ddl4').val());
    //    $('#L5').val(0);
    //    $('#L6').val(0);

    //    $('#L7').val($('#ddldistrib').val());
    //    $('#L8').val(0);
    //    $('#L9').val(0);
    //}
    //if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() != '-1' && $('#ddl4').val() != '-1' && $('#ddldistrib').val() != '-1' && $('#ddlBricks').val() != '-1' && $('#ddlcustomer').val() == '-1') {
    //    $('#L1').val($('#ddl1').val());
    //    $('#L2').val($('#ddl2').val());
    //    $('#L3').val($('#ddl3').val());
    //    $('#L4').val($('#ddl4').val());
    //    $('#L5').val(0);
    //    $('#L6').val(0);
    //    $('#L7').val($('#ddldistrib').val());
    //    $('#L8').val($('#ddlBricks').val());
    //    $('#L9').val(0);
    //}
    //if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() != '-1' && $('#ddl4').val() != '-1' && $('#ddldistrib').val() != '-1' && $('#ddlBricks').val() != '-1' && $('#ddlcustomer').val() != '-1') {
    //    $('#L1').val($('#ddl1').val());
    //    $('#L2').val($('#ddl2').val());
    //    $('#L3').val($('#ddl3').val());
    //    $('#L4').val($('#ddl4').val());
    //    $('#L5').val(0);
    //    $('#L6').val(0);
    //    $('#L7').val($('#ddldistrib').val());
    //    $('#L8').val($('#ddlBricks').val());
    //    $('#L9').val($('#ddlcustomer').val());
    //}

    //if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() != '-1' && $('#ddl4').val() != '-1' && $('#ddl5').val() != '-1') {
    //    $('#L1').val($('#ddl1').val());
    //    $('#L2').val($('#ddl2').val());
    //    $('#L3').val($('#ddl3').val());
    //    $('#L4').val($('#ddl4').val());
    //    $('#L5').val($('#ddl5').val());
    //    $('#L6').val($('#ddl6').val());
    //    $('#L7').val($('#ddldistrib').val());
    //    $('#L8').val($('#ddlBricks').val());
    //    $('#L9').val($('#ddlcustomer').val());
    //}

    //if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() != '-1' && $('#ddl4').val() != '-1' && $('#ddl5').val() != '-1' && $('#ddl6').val() != '-1') {
    //    $('#L1').val($('#ddl1').val());
    //    $('#L2').val($('#ddl2').val());
    //    $('#L3').val($('#ddl3').val());
    //    $('#L4').val($('#ddl4').val());
    //    $('#L5').val($('#ddl5').val());
    //    $('#L6').val($('#ddl6').val());
    //    $('#L7').val($('#ddldistrib').val());
    //    $('#L8').val($('#ddlBricks').val());
    //    $('#L9').val($('#ddlcustomer').val());
    //}

    //$('#L7').val($('#ddldistrib').val());

    debugger;

    //GetSummarywiseReport();


   


    //if ($('#ddlreport').val() == '1') {
    //    GetNationalBrickwiseReport();
    //}
    //else if ($('#ddlreport').val() == '2') {
    //    GetClientBrickwiseReport();
    //}
    //else if ($('#ddlreport').val() == '3') {
    //    GetIncentiveReport();
    //}
    //else 
    if ($('#ddlreport').val() == '4') {
        $('#loadingdiv div').show();
        GetSummarywiseReport();
    }
    else if ($('#ddlreport').val() == '5') {
        $('#contain').show();
        $('#hirarchy').show();
        debugger;
       GetSummarywiseReport_Graph();
      //  Graph1();
        $('#loadingdiv div').hide();

    }
    //else if ($('#ddlreport').val() == '6') {
    //    GetDailywiseReport();
    //}
    //else if ($('#ddlreport').val() == '7') {
    //    GetMTDCurrentLastMonthSaleReport();
    //}
    //else if ($('#ddlreport').val() == '8') {
    //    GetCityWiseSaleReport();
    //}
    //else if ($('#ddlreport').val() == '9') {
    //    GetRangeSaleUnit();
    //}
    //else if ($('#ddlreport').val() == '10') {
    //    GetRangeSaleValue();
    //}
    //else if ($('#ddlreport').val() == '11') {
    //    GetProductSaleUnit();
    //}
    //else if ($('#ddlreport').val() == '12') {
    //    GetProductSaleValue();
    //}
    //else if ($('#ddlreport').val() == '13') {
    //    GetTopProductValueReport();
    //}

    //else if ($('#ddlreport').val() == '14') {
    //    GetSalesBonusExcelReport();
    //}

    //else if ($('#ddlreport').val() == '15') {
    //    GetSalesDiscountExcelReport();
    //}
    //else if ($('#ddlreport').val() == '16') {
    //    GetSalesStockExcelReport();
    //}
    //else if ($('#ddlreport').val() == '17') {
    //    GetTeamWiseStockReport();
    //}
    //else if ($('#ddlreport').val() == '18') {
    //    GetDistributorWiseSaleReport();
    //}
    //else if ($('#ddlreport').val() == '19') {
    //    GetTeamProductWiseSaleReport();
    //}
    //else if ($('#ddlreport').val() == '20') {
    //    GetMDReport();
    //}
    //else if ($('#ddlreport').val() == '21') {
    //    GetBrickToProductSalesReport();
    //}
    //else if ($('#ddlreport').val() == '22') {
    //    GetProductsSalesPerPharmacy();
    //}
    //else if ($('#ddlreport').val() == '23') {
    //    GetLocalVsUpcountryReport();
    //}
    //else if ($('#ddlreport').val() == '24') {
    //    DistributorProfileReport();
    //}

    ////else if ($('#ddlreport').val() == '25') {
    ////    //GetDailywiseReport();
    ////    GetCustomerWiseDailywiseReport();
    ////}
    //else if ($('#ddlreport').val() == '26') {
    //    // GetNationalBrickwiseReport();
    //    SPOwiseSalesReportReport();
    //} else if ($('#ddlreport').val() == '27') {
    //    // GetNationalBrickwiseReport();
    //    TMDoctorPharmacySalesReport();
    //}
    //else if ($('#ddlreport').val() == '28') {
    //    // GetNationalBrickwiseReport();
    //    CustomerWiseSalesReport();
    //}
    //else if ($('#ddlreport').val() == '29') {
    //    // GetNationalBrickwiseReport();
    //    InvoiceVoiceSalesReport();
    //}
    //else if ($('#ddlreport').val() == '30') {
    //    // GetNationalBrickwiseReport();
    //    DistributorFileStatus();
    //}

}

var SPOwiseSalesReportReport = function () {

    debugger
    //var brick = $('#ddlBricks').val();

    //if (brick == '-1' || brick == null) {
    //    brick = 0;
    //}

    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetSPOWiseSalesReport",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'0'}",//,'DistributorID':'" + $('#ddldistrib').val() + "','BrickID':'" + brick + "',
        success: onSuccessGetSPOWiseReport,
        error: onError,
        cache: false,
        asyn: false
    });
}
function onSuccessGetSPOWiseReport(data, status) {
    var msg = [];

    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);
        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Brick Wise Sale Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>" +
            "<tr >" +
            "<th > EmployeeName </th>" +
            "<th > DistributorName </th>" +
            "<th > BrickName </th>" +
            "<th > Description </th>" +
            "<th > Units</th>" +
            "<th > TP </th>" +
            "</tr ></thead> <tbody>";
        //style='background-color: #217ebd;color: white;' Division	Region	Zone	Territory	RegionName	SubRegionName	DistrictName	City	DistributorName	BrickName	Total	SalePercentage
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";
            tablestring += "<td  >" + jsonObj[i].EmployeeName + "</td>";
            tablestring += "<td  >" + jsonObj[i].DistributorName + "</td>";
            tablestring += "<td  >" + jsonObj[i].BrickName + "</td>";
            tablestring += "<td  >" + jsonObj[i].Description + "</td>";
            tablestring += "<td  >" + jsonObj[i].Units + "</td>";
            tablestring += "<td  >" + jsonObj[i].TP + " </td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },

            // Or you can use remote translation file
            //"language": {
            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},


            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}


var TMDoctorPharmacySalesReport = function () {
    debugger
    var Level1 = $('#L1').val() == null || $('#L1').val() == '-1' || $('#L1').val() == '' ? 0 : $('#L1').val();
    var Level2 = $('#L2').val() == null || $('#L2').val() == '-1' || $('#L2').val() == '' ? 0 : $('#L2').val();
    var Level3 = $('#L3').val() == null || $('#L3').val() == '-1' || $('#L3').val() == '' ? 0 : $('#L3').val();
    var Level4 = $('#L4').val() == null || $('#L4').val() == '-1' || $('#L4').val() == '' ? 0 : $('#L4').val();
    var Level5 = $('#L5').val() == null || $('#L5').val() == '-1' || $('#L5').val() == '' ? 0 : $('#L5').val();
    var Level6 = $('#L6').val() == null || $('#L6').val() == '-1' || $('#L6').val() == '' ? 0 : $('#L6').val();
    var Doc = $('#ddl7Doc').val() == null || $('#ddl7Doc').val() == '-1' || $('#ddl7Doc').val() == '' ? 0 : $('#ddl7Doc').val();

    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetTMDoctorsSalesReport",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + Level1 + "','Level2':'" + Level2 + "','Level3':'" + Level3 + "','Level4':'" + Level4 + "','Level5':'" + Level5 + "','Level6':'" + Level6 + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0','DoctorCode':'" + Doc + "'}",
        success: onSuccessGetTMDoctorSaleReport,
        error: onError,
        cache: false,
        asyn: false
    });
}

function onSuccessGetTMDoctorSaleReport(data, status) {
    debugger
    var msg = [];

    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);
        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>TM Doctors Pharmacy Sales Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>" +
            "<tr >" +
            "<th > Employee Code </th>" +
            "<th > Employee Name </th>" +
            "<th > Doctor Code </th>" +
            "<th > Doctor Name </th>" +
            "<th > Pharmacy Name </th>" +
            "<th > Product Name </th>" +
            "<th > Units  </th>" +
            "<th > Per Unit Amount </th>" +
            "<th > Total Amouont </th>" +

            "</tr ></thead> <tbody>";
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";

            tablestring += "<td  >" + jsonObj[i].EmployeeCode + "</td>";
            tablestring += "<td  >" + jsonObj[i].EmployeeName + "</td>";
            tablestring += "<td  >" + jsonObj[i].DoctorCode + " </td>";
            tablestring += "<td  >" + jsonObj[i].DoctorName + " </td>";
            tablestring += "<td  >" + jsonObj[i].ClientName + " </td>";
            tablestring += "<td  >" + jsonObj[i].ProductName + " </td>";
            tablestring += "<td  >" + jsonObj[i].Units + " </td>";
            tablestring += "<td  >" + jsonObj[i].TradePrice + " </td>";
            tablestring += "<td  >" + jsonObj[i].TotalAmount + " </td>";
            // tablestring += "<td  >" + jsonObj[i].TotalTradePrice + " </td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },


            buttons: [{
                extend: 'print',
                className: 'btn dark btn-outline'
            },
            {
                extend: 'copy',
                className: 'btn red btn-outline'
            },
            {
                extend: 'pdf',
                className: 'btn green btn-outline'
            },
            {
                extend: 'excel',
                className: 'btn yellow btn-outline '
            },
            {
                extend: 'csv',
                className: 'btn purple btn-outline '
            },
            {
                extend: 'colvis',
                className: 'btn dark btn-outline',
                text: 'Columns'
            }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}




var GetNationalBrickwiseReport = function () {


    var brick = $('#ddlBricks').val();

    if (brick == '-1' || brick == null) {
        brick = 0;
    }

    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetNationalWiseBrickSale",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#ddldistrib').val() + "','BrickID':'" + brick + "','EmployeeId':'0'}",
        success: onSuccessGetnatbrick,
        error: onError,
        cache: false,
        asyn: false
    });
}


function onSuccessGetnatbrick(data, status) {
    var msg = [];


    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);
        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Brick Wise Sale Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>" +
            "<tr >" +
            // "<th > Division </th>" +
            //  "<th > Region  </th>" +
            //  "<th > Zone </th>" +
            //  "<th > Territory </th>" +
            "<th > Month-Year </th>" +
            "<th > Distributor </th>" +
            "<th > Team </th>" +
            "<th > Brick Name  </th>" +
            "<th > Product Name  </th>" +
            "<th > TP  </th>" +
            "<th > Units  </th>" +
            "<th > Sale Value </th>" +
            //  "<th > Percentage </th>"+
            "</tr ></thead> <tbody>";
        //style='background-color: #217ebd;color: white;' Division	Region	Zone	Territory	RegionName	SubRegionName	DistrictName	City	DistributorName	BrickName	Total	SalePercentage
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";

            //  tablestring += "<td  >" + jsonObj[i].Region + " </td>";
            //  tablestring += "<td  >" + jsonObj[i].Zone + " </td>";
            //   tablestring += "<td  >" + jsonObj[i].Territory + " </td>";

            tablestring += "<td  >" + jsonObj[i].MonthYear + "</td>";
            tablestring += "<td  >" + jsonObj[i].DistributorName + "</td>";
            tablestring += "<td  >" + jsonObj[i].TeamName + "</td>";
            tablestring += "<td  >" + jsonObj[i].BrickName + " </td>";
            tablestring += "<td  >" + jsonObj[i].Product + " </td>";
            tablestring += "<td  >" + jsonObj[i].TP + " </td>";
            tablestring += "<td  >" + jsonObj[i].units + " </td>";
            tablestring += "<td  >" + jsonObj[i].SaleValue + " </td>";
            // tablestring += "<td  >" + jsonObj[i].SalePercentage + " </td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },

            // Or you can use remote translation file
            //"language": {
            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},


            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}

//--------------------------------------------------------- GETALL For Doctor Brick Sales  -------------------------------------------------------------------------------
var GetSummarywiseReport = function () {

   
    $.ajax({
        type: "POST",
        url: "Salesdoctor_Bricks.asmx/GetSummaryProductSale",
        contentType: "application/json; charset=utf-8",
       // data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0'}",

        data: "{'ProductId':'" + $('#ddlPro').val() + "','doctorId':'" + $('#ddl7Doc').val() + "','From':'" + $('#stdate').val() + "','To':'" + $('#enddate').val() + "'}",

        success: onSuccessGetSummaryReport,
        error: onError,
        cache: false,
        asyn: false
    });
}

function onSuccessGetSummaryReport(data, status) {
    var msg = [];

    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);
        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Product Wise Sale </span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>" +
            "<tr >" +
            "<th > Product </th>" +
            "<th > PharmacyName </th>" +
            "<th > BrickName </th>" +
            "<th > units </th>" +
            "<th > Year/Month  </th>" +
            //"<th > Units  </th>" +
            //"<th > Sale Value </th>" +
            //  "<th > Percentage </th>"+
            "</tr ></thead> <tbody>";
        //style='background-color: #217ebd;color: white;' Division	Region	Zone	Territory	RegionName	SubRegionName	DistrictName	City	DistributorName	BrickName	Total	SalePercentage
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";

            tablestring += "<td  >" + jsonObj[i].product + "</td>";
            tablestring += "<td  >" + jsonObj[i].PharmacyName + "</td>";
            tablestring += "<td  >" + jsonObj[i].BrickName + "</td>";
            tablestring += "<td  >" + jsonObj[i].units + " </td>";
            tablestring += "<td  >" + jsonObj[i].MonthYear + " </td>";
            //tablestring += "<td  >" + jsonObj[i].units + " </td>";
            //tablestring += "<td  >" + jsonObj[i].SaleValue + " </td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },




            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}

//---------------------------------- For Graph ------------------------------------------



var GetSummarywiseReport_Graph = function () {

    debugger;

    $.ajax({
        type: "POST",
        url: "Salesdoctor_Bricks.asmx/GetSummaryProductSale",
        contentType: "application/json; charset=utf-8",
        // data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0'}",

        data: "{'ProductId':'" + $('#ddlPro').val() + "','doctorId':'" + $('#ddl7Doc').val() + "','From':'" + $('#stdate').val() + "','To':'" + $('#enddate').val() + "'}",

        success: onSuccessGetSummaryReport_Graph,
        error: onError,
        cache: false,
        asyn: false
    });
}
function onSuccessGetSummaryReport_Graph(data, status) {
    var msg = [];

    debugger; 


    if (data.d != "" && data.d != "[]") {
       
        var jsonObj = $.parseJSON(data.d);

        Graph(jsonObj);
    }
    $('#loadingdiv div').hide();
}


//function Graph1() {

//    Highcharts.chart('container', {

//        title: {
//            text: 'Product Wise Sales',
//            align: 'left'
//        },

//        //subtitle: {
//        //    text: 'By Job Category. Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>.',
//        //    align: 'left'
//        //},

//        yAxis: {
//            title: {
//                text: 'Number of Employees'
//            }
//        },

//        xAxis: {
//            accessibility: {
//                rangeDescription: 'Range: 2010 to 2020'
//            }
//        },

//        legend: {
//            layout: 'vertical',
//            align: 'right',
//            verticalAlign: 'middle'
//        },

//        plotOptions: {
//            series: {
//                label: {
//                    connectorAllowed: false
//                },
//                pointStart: 2010
//            }
//        },

//        series: [{
//            name: 'Installation & Developers',
//            data: [43934, 48656, 65165, 81827, 112143, 142383,
//                171533, 165174, 155157, 161454, 154610]
//        }, {
//            name: 'Manufacturing',
//            data: [24916, 37941, 29742, 29851, 32490, 30282,
//                38121, 36885, 33726, 34243, 31050]
//        }, {
//            name: 'Sales & Distribution',
//            data: [11744, 30000, 16005, 19771, 20185, 24377,
//                32147, 30912, 29243, 29213, 25663]
//        }, {
//            name: 'Operations & Maintenance',
//            data: [null, null, null, null, null, null, null,
//                null, 11164, 11218, 10077]
//        }, {
//            name: 'Other',
//            data: [21908, 5548, 8105, 11248, 8989, 11816, 18274,
//                17300, 13053, 11906, 10073]
//        }],

//        responsive: {
//            rules: [{
//                condition: {
//                    maxWidth: 500
//                },
//                chartOptions: {
//                    legend: {
//                        layout: 'horizontal',
//                        align: 'center',
//                        verticalAlign: 'bottom'
//                    }
//                }
//            }]
//        }

//    });
//}


function Graph_beforeDoctorName(data) {
    var seriesData = [];

    var seriesMap = {};

    // Iterate through the data and group it by product name
    for (var i = 0; i < data.length; i++) {
        var product = data[i].product;
        var units = parseFloat(data[i].units);
        var CDate = data[i].MonthYear; //CreateDateTT
        var doctorname = data[i].DoctorName;

        if (seriesMap.hasOwnProperty(product)) {
            seriesMap[product].push([CDate, units]);
        } else {
            seriesMap[product] = [[CDate, units]];
        }
    }

    // Now, create the Highcharts series data from the series map
    for (var productName in seriesMap) {
        if (seriesMap.hasOwnProperty(productName)) {
            seriesData.push({
                name: productName,
                data: seriesMap[productName]
            });
        }
    }

    // Your Highcharts configuration
    Highcharts.chart('container', {

        chart: {
            type: 'spline',
            scrollablePlotArea: {
                minWidth: 600,
                scrollPositionX: 1
            }
        },


        title: {
            text: 'Product Wise Sales',
            align: 'left'
        },
        yAxis: {
            title: {
                text: 'Number of Units Sold'
            }
        },
        xAxis: {
            type: 'category',
            accessibility: {
                rangeDescription: 'Range: 2010 to 2020'
            },
            labels: {
                rotation:0, //-45,
                style: {
                    fontSize: '10px'
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },


        //plotOptions: {
        //    series: {
        //        label: {
        //            connectorAllowed: false
        //        },
        //        pointStart: 2010
        //    }
        //},



        series: seriesData,
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
 }


//---------------------------------------------- bar Chart --------------------------------------------------------------

//function Graph(data) {
//    var seriesData = [];
//    var seriesMap = {};

//    // Iterate through the data and group it by product name
//    for (var i = 0; i < data.length; i++) {
//        var product = data[i].product;
//        var units = parseFloat(data[i].units);
//        var CDate = data[i].MonthYear; //CreateDateTT MonthYear

//        if (seriesMap.hasOwnProperty(product)) {
//            seriesMap[product].push([CDate, units]);
//        } else {
//            seriesMap[product] = [[CDate, units]];
//        }
//    }

//    // Now, create the Highcharts series data from the series map
//    for (var productName in seriesMap) {
//        if (seriesMap.hasOwnProperty(productName)) {
//            seriesData.push({
//                name: productName,
//                data: seriesMap[productName]
//            });
//        }
//    }

//    // Your Highcharts configuration for the column (bar) chart
//    Highcharts.chart('container', {
//        chart: {
//            type: 'column'
//        },
//        title: {
//            text: 'Product Wise Sales',
//            align: 'left'
//        },
//        yAxis: {
//            title: {
//                text: 'Number of Units Sold'
//            }
//        },
//        xAxis: {
//            type: 'category',
//            accessibility: {
//                rangeDescription: 'Range: 2010 to 2020'
//            },
//            labels: {
//                rotation: 0,
//                style: {
//                    fontSize: '10px'
//                }
//            }
//        },
//        legend: {
//            layout: 'vertical',
//            align: 'right',
//            verticalAlign: 'middle'
//        },


//        plotOptions: {
//            column: {
//                borderRadius: '30%',
//                pointWidth: 15 // Adjust this value to change the width of the bars
//            }
//        },



//        series: seriesData,
//        responsive: {
//            rules: [{
//                condition: {
//                    maxWidth: 500
//                },
//                chartOptions: {
//                    legend: {
//                        layout: 'horizontal',
//                        align: 'center',
//                        verticalAlign: 'bottom'
//                    }
//                }
//            }]
//        }
//    });
//}

function Graph(data) {
    var seriesData = [];
    var seriesMap = {};

    // Iterate through the data and group it by product name
    for (var i = 0; i < data.length; i++) {
        var product = data[i].product;
        var units = parseFloat(data[i].units);
        var CDate = data[i].MonthYear; //CreateDateTT
        var doctorname = data[i].DoctorName;

        if (seriesMap.hasOwnProperty(product)) {
            seriesMap[product].push([CDate, units]);
        } else {
            seriesMap[product] = [[CDate, units]];
        }
    }

    // Now, create the Highcharts series data from the series map
    for (var productName in seriesMap) {
        if (seriesMap.hasOwnProperty(productName)) {
            seriesData.push({
                name: productName,
                data: seriesMap[productName]
            });
        }
    }

    // Concatenate the doctorname with the title text
    var titleText = 'Product Wise Sales';
    if (data.length > 0) {
        titleText += ' - Doctor: ' + data[0].DoctorName;
    }

    // Your Highcharts configuration
    Highcharts.chart('container', {
        chart: {
            type: 'spline',
            scrollablePlotArea: {
                minWidth: 600,
                scrollPositionX: 1
            }
        },
        title: {
            text: titleText, // Updated title with concatenated doctorname
            align: 'left'
        },
        yAxis: {
            title: {
                text: 'Number of Units Sold'
            }
        },
        xAxis: {
            type: 'category',
            accessibility: {
                rangeDescription: 'Range: 2010 to 2020'
            },
            labels: {
                rotation: 0,
                style: {
                    fontSize: '10px'
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series: seriesData,
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
}



var GetCustomerwiseReport = function () {
    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetCustomerWiseSale",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0'}",
        success: onSuccessGetCustomerReport,
        error: onError,
        cache: false,
        asyn: false
    });
}


function onSuccessGetCustomerReport(data, status) {
    var msg = [];

    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);
        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Customer Wise Sale Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>" +
            "<tr >" +
            "<th > Month-Year </th>" +
            "<th > Distributor </th>" +
            "<th > Team </th>" +
            "<th > Customer Name  </th>" +
            "<th > Brick Name  </th>" +
            "<th > Product Name  </th>" +
            "<th > TP  </th>" +
            "<th > Units  </th>" +
            "<th > Sale Value </th>" +
            //  "<th > Percentage </th>"+
            "</tr ></thead> <tbody>";
        //style='background-color: #217ebd;color: white;' Division	Region	Zone	Territory	RegionName	SubRegionName	DistrictName	City	DistributorName	BrickName	Total	SalePercentage
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";

            tablestring += "<td  >" + jsonObj[i].MonthYear + "</td>";
            tablestring += "<td  >" + jsonObj[i].DistributorName + "</td>";
            tablestring += "<td  >" + jsonObj[i].TeamName + "</td>";
            tablestring += "<td  >" + jsonObj[i].ClientName + " </td>";
            tablestring += "<td  >" + jsonObj[i].BrickName + " </td>";
            tablestring += "<td  >" + jsonObj[i].Product + " </td>";
            tablestring += "<td  >" + jsonObj[i].TP + " </td>";
            tablestring += "<td  >" + jsonObj[i].units + " </td>";
            tablestring += "<td  >" + jsonObj[i].SaleValue + " </td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },




            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}


var GetDailywiseReport = function () {
    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetDailySale",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0'}",
        success: onSuccessGetDailySaleReport,
        error: onError,
        cache: false,
        asyn: false
    });
}



function onSuccessGetDailySaleReport(data, status) {
    var msg = [];


    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);
        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Daily Sale Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>" +
            "<tr >" +
            "<th > Month-Year </th>" +
            "<th > Distributor </th>" +
            "<th > Product Name  </th>" +
            "<th > 1 </th>" +
            "<th > 2 </th>" +
            "<th > 3 </th>" +
            "<th > 4 </th>" +
            "<th > 5 </th>" +
            "<th > 6 </th>" +
            "<th > 7 </th>" +
            "<th > 8 </th>" +
            "<th > 9 </th>" +
            "<th > 10 </th>" +
            "<th > 11 </th>" +
            "<th > 12 </th>" +
            "<th > 13 </th>" +
            "<th > 14 </th>" +
            "<th > 15 </th>" +
            "<th > 16 </th>" +
            "<th > 17 </th>" +
            "<th > 18 </th>" +
            "<th > 19 </th>" +
            "<th > 20 </th>" +
            "<th > 21 </th>" +
            "<th > 22 </th>" +
            "<th > 23 </th>" +
            "<th > 24 </th>" +
            "<th > 15 </th>" +
            "<th > 26 </th>" +
            "<th > 27 </th>" +
            "<th > 28 </th>" +
            "<th > 29 </th>" +
            "<th > 30 </th>" +
            "<th > 31 </th>" +

            "</tr ></thead> <tbody>";
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";

            tablestring += "<td  >" + jsonObj[i].MonthYear + "</td>";
            tablestring += "<td  >" + jsonObj[i].DistributorName + "</td>";
            tablestring += "<td  >" + jsonObj[i].Product + " </td>";
            tablestring += "<td  >" + jsonObj[i].d1 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d2 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d3 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d4 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d5 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d6 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d7 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d8 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d9 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d10 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d11 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d12 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d13 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d14 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d15 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d16 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d17 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d18 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d19 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d20 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d21 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d22 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d23 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d24 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d25 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d26 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d27 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d28 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d29 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d30 + " </td>";
            tablestring += "<td  >" + jsonObj[i].d31 + " </td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },




            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}
function onSuccessOldGetnatbrick(data, status) {
    var msg = [];


    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);
        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Brick Wise Sale Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>" +
            "<tr >" +
            "<th > Division </th>" +
            "<th > Region  </th>" +
            "<th > Zone </th>" +
            "<th > Territory </th>" +
            "<th > Distributor </th>" +
            "<th > BrickName  </th>" +
            "<th > Total </th>" +
            "<th > Percentage </th></tr ></thead> <tbody>";
        //style='background-color: #217ebd;color: white;' Division	Region	Zone	Territory	RegionName	SubRegionName	DistrictName	City	DistributorName	BrickName	Total	SalePercentage
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";
            tablestring += "<td  >" + jsonObj[i].Division + "</td>";
            tablestring += "<td  >" + jsonObj[i].Region + " </td>";
            tablestring += "<td  >" + jsonObj[i].Zone + " </td>";
            tablestring += "<td  >" + jsonObj[i].Territory + " </td>";

            tablestring += "<td  >" + jsonObj[i].DistributorName + "</td>";
            tablestring += "<td  >" + jsonObj[i].BrickName + " </td>";
            tablestring += "<td  >" + jsonObj[i].SystemTotal + " </td>";
            tablestring += "<td  >" + jsonObj[i].SalePercentage + " </td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },

            // Or you can use remote translation file
            //"language": {
            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},


            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}


var GetMTDCurrentLastSaleReport = function () {
    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetDailySale",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0'}",
        success: onSuccessMTDCurrentLastSaleReport,
        error: onError,
        cache: false,
        asyn: false
    });
}
var GetCityWiseSaleReport = function () {
    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetCityWiseSale",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0'}",
        success: onSuccessGetCityWiseSaleReport,
        error: onError,
        cache: false,
        asyn: false
    });
}
function onSuccessGetCityWiseSaleReport(data, status) {
    var msg = [];


    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);

        HeadObj = Object.keys(jsonObj[0]);

        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>City Wise Sale Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>";

        tablestring += "<tr>";
        for (var i = 0; i < HeadObj.length; i++) {


            tablestring += "<th >" + HeadObj[i] + "</th>";


        }
        tablestring += "</tr ></thead> <tbody>";
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";

            tablestring += "<td  >" + jsonObj[i][HeadObj[0]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[1]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[2]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[3]] + "</td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },




            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}
var GetMTDCurrentLastMonthSaleReport = function () {
    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetMTDCurrentLastMonthSale",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0'}",
        success: onSuccessGetMTDCurrentLastMonthSaleReport,
        error: onError,
        cache: false,
        asyn: false
    });
}

function onSuccessGetMTDCurrentLastMonthSaleReport(data, status) {
    var msg = [];


    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);

        HeadObj = Object.keys(jsonObj[0]);

        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>MTD Current & Last Month Sale Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>";

        tablestring += "<tr>";
        for (var i = 0; i < HeadObj.length; i++) {


            tablestring += "<th >" + HeadObj[i] + "</th>";


        }
        tablestring += "</tr ></thead> <tbody>";
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";

            tablestring += "<td  >" + jsonObj[i][HeadObj[0]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[1]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[2]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[3]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[4]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[5]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[6]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[7]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[8]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[9]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[10]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[11]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[12]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[13]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[14]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[15]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[16]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[17]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[18]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[19]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[20]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[21]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[22]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[23]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[24]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[25]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[26]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[27]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[28]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[29]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[30]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[31]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[32]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[33]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[34]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[35]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[36]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[37]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[38]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[39]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[40]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[41]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[42]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[43]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[44]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[45]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[46]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[47]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[48]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[49]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[50]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[51]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[52]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[53]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[54]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[55]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[56]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[57]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[58]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[59]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[60]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[61]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[62]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[63]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[64]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[65]] + "</td>";


            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },




            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}

var GetTopProductValueReport = function () {
    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetTopSKUSale",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0'}",
        success: onSuccessGetTopProductValueReport,
        error: onError,
        cache: false,
        asyn: false
    });
}
var GetSalesBonusExcelReport = function () {


    var distid = $('#ddldistrib').val();
    var date = $('#txtDate').val();

    if (distid != null || distid != '-1') {

        window.open("../Handler/GetSalesReport.ashx?date=" + date + "&DistId=" + distid + "&reportName=Bonus", "Report");

    }
    $('#loadingdiv div').hide();
}
var GetSalesDiscountExcelReport = function () {


    var distid = $('#ddldistrib').val();
    var date = $('#txtDate').val();

    if (distid != null || distid != '-1') {

        window.open("../Handler/GetSalesReport.ashx?date=" + date + "&DistId=" + distid + "&reportName=Discount", "Report");

    }
    $('#loadingdiv div').hide();
}
var GetSalesStockExcelReport = function () {


    var distid = $('#ddldistrib').val();
    var date = $('#txtDate').val();

    if (distid != null || distid != '-1') {

        window.open("../Handler/GetSalesReport.ashx?date=" + date + "&DistId=" + distid + "&reportName=Stock", "Report");

    }
    $('#loadingdiv div').hide();
}
function onSuccessGetTopProductValueReport(data, status) {
    var msg = [];


    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);

        HeadObj = Object.keys(jsonObj[0]);

        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Top Product Value Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>";

        tablestring += "<tr>";
        for (var i = 0; i < HeadObj.length; i++) {


            tablestring += "<th >" + HeadObj[i] + "</th>";


        }
        tablestring += "</tr ></thead> <tbody>";
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";

            tablestring += "<td  >" + jsonObj[i][HeadObj[0]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[1]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[2]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[3]] + "</td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },




            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}
var GetRangeSaleUnit = function () {
    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetRangeSaleUnit",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0'}",
        success: onSuccessGetRangeSaleUnitReport,
        error: onError,
        cache: false,
        asyn: false
    });
}
function onSuccessGetRangeSaleUnitReport(data, status) {
    var msg = [];


    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);

        HeadObj = Object.keys(jsonObj[0]);

        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Range Sale Unit Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>";

        tablestring += "<tr>";
        for (var i = 0; i < HeadObj.length; i++) {


            tablestring += "<th >" + HeadObj[i] + "</th>";


        }
        tablestring += "</tr ></thead> <tbody>";
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";

            tablestring += "<td  >" + jsonObj[i][HeadObj[0]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[1]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[2]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[3]] + "</td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },




            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}
var GetRangeSaleValue = function () {
    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetRangeSaleValue",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0'}",
        success: onSuccessGetRangeSaleValueReport,
        error: onError,
        cache: false,
        asyn: false
    });
}
function onSuccessGetRangeSaleValueReport(data, status) {
    var msg = [];


    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);

        HeadObj = Object.keys(jsonObj[0]);

        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'> Range Sale Value Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>";

        tablestring += "<tr>";
        for (var i = 0; i < HeadObj.length; i++) {


            tablestring += "<th >" + HeadObj[i] + "</th>";


        }
        tablestring += "</tr ></thead> <tbody>";
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";

            tablestring += "<td  >" + jsonObj[i][HeadObj[0]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[1]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[2]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[3]] + "</td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },




            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}
var GetProductSaleUnit = function () {
    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetProductSaleUnit",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0'}",
        success: onSuccessGetProductSaleUnitReport,
        error: onError,
        cache: false,
        asyn: false
    });
}
function onSuccessGetProductSaleUnitReport(data, status) {
    var msg = [];


    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);

        HeadObj = Object.keys(jsonObj[0]);

        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Product Unit Report (Current vs Last)</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>";

        tablestring += "<tr>";
        for (var i = 0; i < HeadObj.length; i++) {


            tablestring += "<th >" + HeadObj[i] + "</th>";


        }
        tablestring += "</tr ></thead> <tbody>";
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";

            tablestring += "<td  >" + jsonObj[i][HeadObj[0]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[1]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[2]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[3]] + "</td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },




            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}
var GetProductSaleValue = function () {
    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetProductSaleValue",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0'}",
        success: onSuccessGetProductSaleValueReport,
        error: onError,
        cache: false,
        asyn: false
    });
}
function onSuccessGetProductSaleValueReport(data, status) {
    var msg = [];


    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);

        HeadObj = Object.keys(jsonObj[0]);

        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Product Sale Value Report (Current vs Last)</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>";

        tablestring += "<tr>";
        for (var i = 0; i < HeadObj.length; i++) {


            tablestring += "<th >" + HeadObj[i] + "</th>";


        }
        tablestring += "</tr ></thead> <tbody>";
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";

            tablestring += "<td  >" + jsonObj[i][HeadObj[0]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[1]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[2]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[3]] + "</td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },




            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}
var GetCurrentMonthSaleValue = function () {
    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetCurrentMonthSaleValue",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0'}",
        success: onSuccessGetCurrentMonthSaleValueReport,
        error: onError,
        cache: false,
        asyn: false
    });
}
function onSuccessGetCurrentMonthSaleValueReport(data, status) {
    var msg = [];


    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);

        HeadObj = Object.keys(jsonObj[0]);

        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Product Sale Value Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>";

        tablestring += "<tr>";
        for (var i = 0; i < HeadObj.length; i++) {


            tablestring += "<th >" + HeadObj[i] + "</th>";


        }
        tablestring += "</tr ></thead> <tbody>";
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";

            tablestring += "<td  >" + jsonObj[i][HeadObj[0]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[1]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[2]] + "</td>";
            tablestring += "<td  >" + jsonObj[i][HeadObj[3]] + "</td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },




            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}
var GetClientBrickwiseReport = function () {
    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetClientWiseBrickSale",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0'}",
        success: onSuccessGetclientbrick,
        error: onError,
        cache: false,
        asyn: false
    });
}

function onSuccessGetclientbrick(data, status) {
    var msg = [];


    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);
        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Customer Wise Sale Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>" +
            "<tr >" +
            "<th > Zone </th>" +
            "<th > Territory </th>" +
            "<th > Distributor </th>" +
            "<th > Brick  </th>" +
            "<th > Customer  </th>" +
            "<th > Units  </th>" +
            "<th > Total </th> </tr ></thead> <tbody>";
        //style='background-color: #217ebd;color: white;' Division	Region	Zone	Territory	RegionName	SubRegionName	DistrictName	City	DistributorName	BrickName	Total	SalePercentage
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";

            tablestring += "<td  >" + jsonObj[i].Zone + " </td>";
            tablestring += "<td  >" + jsonObj[i].Territory + " </td>";

            tablestring += "<td  >" + jsonObj[i].DistributorName + "</td>";
            tablestring += "<td  >" + jsonObj[i].BrickName + " </td>";
            tablestring += "<td  >" + jsonObj[i].ClientName + " </td>";
            tablestring += "<td  >" + jsonObj[i].Units + " </td>";
            tablestring += "<td  >" + jsonObj[i].Total + " </td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        //$('#datatables').DataTable({

        //    "pageLength": 25
        //    //  "ajax": '../ajax/data/arrays.txt'
        //});
        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },

            // Or you can use remote translation file
            //"language": {
            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},


            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //   responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 25,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}
var GetIncentiveReport = function () {
    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetIncentiveSaleReport",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0'}",
        success: onSuccessIncentiveReport,
        error: onError,
        cache: false,
        asyn: false
    });
}
function onSuccessIncentiveReport(data, status) {
    var msg = [];


    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);
        var tablestring = "<div class='portlet light portlet-fit'> " +
            "<div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Incentive Wise Report</span></div>" +
            "</div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>" +
            "<tr >" +
            "<th > Territory </th>" +
            "<th > Name </th>" +
            "<th > Total Doctor </th>" +
            "<th > Visited Doctor  </th>" +
            "<th > Coverage  </th>" +
            "<th > Productove Frequency </th>" +
            "<th > Target Visits </th> " +
            "<th > Achieve Visits </th> " +
            "<th > Sale </th> " +
            "</tr ></thead> <tbody>";
        //BUH	GM	Division	Region	Zone	Territory	Level6LevelId	EmployeeName	DocVisited	TotalDoc	CustomerCoverage	CallObjectiveFlag	prodfreq	TargetVisits	AchVisits

        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";

            tablestring += "<td  >" + jsonObj[i].Territory + " </td>";
            tablestring += "<td  >" + jsonObj[i].EmployeeName + " </td>";

            tablestring += "<td  >" + jsonObj[i].TotalDoc + "</td>";
            tablestring += "<td  >" + jsonObj[i].DocVisited + " </td>";
            tablestring += "<td  >" + jsonObj[i].CustomerCoverage + " </td>";
            tablestring += "<td  >" + jsonObj[i].prodfreq + " </td>";
            tablestring += "<td  >" + jsonObj[i].TargetVisits + " </td>";
            tablestring += "<td  >" + jsonObj[i].AchVisits + " </td>";
            tablestring += "<td  >" + jsonObj[i].Sale + " </td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        //$('#datatables').DataTable({

        //    "pageLength": 25
        //    //  "ajax": '../ajax/data/arrays.txt'
        //});
        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },



            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],


            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 25,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}
var GetTeamWiseStockReport = function () {
    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetTeamWiseStockReport",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0'}",
        success: onSuccessGetTeamWiseStockReport,
        error: onError,
        cache: false,
        asyn: false
    });
}
function onSuccessGetTeamWiseStockReport(data, status) {
    var msg = [];

    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);
        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Team Wise Stock Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>" +
            "<tr >" +

            "<th > Distributor </th>" +
            "<th > Team </th>" +
            "<th > Product Name  </th>" +
            "<th > Closing Date  </th>" +
            "<th > Closing Stock </th>" +
            "</tr ></thead> <tbody>";

        //style='background-color: #217ebd;color: white;' Division	Region	Zone	Territory	RegionName	SubRegionName	DistrictName	City	DistributorName	BrickName	Total	SalePercentage
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";

            tablestring += "<td  >" + jsonObj[i].DistributorName + "</td>";
            tablestring += "<td  >" + jsonObj[i].TeamName + "</td>";
            tablestring += "<td  >" + jsonObj[i].SkuName + " </td>";
            tablestring += "<td  >" + jsonObj[i].ClosingDate + " </td>";
            tablestring += "<td  >" + jsonObj[i].ClosingStock + " </td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },

            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}
var GetDistributorWiseSaleReport = function () {

    debugger;
    var distid = $('#ddldistrib').val();


    var date1 = new Date($('#txtYear').val());
    var date = date1.getFullYear();

    if (distid != null || distid != '-1') {

        window.open("../BWSD/SalesReportHandler.ashx?date=" + date + "&DistId=" + distid + "&reportType=MonthlySales", "Report");

    }
    $('#loadingdiv div').hide();
}
var GetTeamProductWiseSaleReport = function () {


    var distid = $('#ddldistrib').val();
    var date = $('#txtYear').val();
    var ProductId = $('#ddlPro').val();
    //"&ProductId=" + ProductId +
    if (distid != null || distid != '-1') {

        window.open("../BWSD/SalesReportHandler.ashx?date=" + date + "&DistId=" + distid + "&ProductId=" + ProductId + "&reportType=TeamProductSales", "Report");

    }
    $('#loadingdiv div').hide();
}
function GetTeams(empid) {

    //if (1==1) {
    //    return;
    //}
    $.ajax({
        type: "POST",
        url: "../Form/Products.asmx/GetTeam",
        contentType: "application/json; charset=utf-8",
        data: "{'empid':'" + empid + "'}",
        success: onSuccessGetTeams,
        error: onError,
        cache: false
    });
}
function onSuccessGetTeams(data, status) {

    document.getElementById('ddlteam').innerHTML = "";

    if (data.d != "") {

        jsonObj = $.parseJSON(data.d);
        $('#ddlteam').append('<select data-placeholder="Select Teams ..." class="chosen-select" style="width:100%" id="ddlT" multiple ></select>');
        value = '-1';
        name = 'Select Teams';
        $("#ddlteam").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddlteam").append("<option value='" + tweet.ID + "'>" + tweet.TeamName + "</option>");
        });
    }
    else {
        $('#ddlteam').append('<select data-placeholder="No Teams Are Available ..." class="chosen-select" style="width:100%" id="ddlbri" multiple ></select>');

    }

}

function GetMDReport() {


    let tabParams = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=300,left=100,top=100";

    let params = "date=" + $('#txtYear').val() + "&Level1=" + $('#L1').val() + "&Level2=" + $('#L2').val() + "&Level3=" + $('#L3').val() + "&Level4=" + $('#L4').val() + "&Level5=" + $('#L5').val() + "&Level6=" + $('#L6').val();

    window.open("../BWSD/Report/ReportsHandler/MDReportExcel.ashx?" + params, tabParams);

    $('#loadingdiv div').hide();
}


function GetBrickToProductSalesReport() {


    var teamID = $('#ddlteam').val();

    if (teamID == "-1") {
        alert('Please Select Team For This Report');

        $('#loadingdiv div').hide();
        return false;
    }

    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetBrickToProductSalesReport",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtYear').val() + "','Level1':'" + $('#L1').val() +
            "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() +
            "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#ddldistrib').val() +
            "','BrickID':'0" + $('#ddldistrib').val() + "','TeamID':'" + teamID + "','EmployeeId':'0'}",
        success: onSuccessBrickToProductSalesReport,
        error: onError,
        cache: false,
        asyn: false
    });
}


function onSuccessBrickToProductSalesReport(data, status) {
    var msg = [];

    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);
        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Brick To Product Sales Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'>"; // <thead class='flip-content'>" +
        "<tr >" +
            //"<th> Zone </th>" +
            "<th> DistributorName </th>" +
            "<th> BrickName </th>" +
            "<th> BrickID </th>" +
            "<th> ClientName </th>" +
            "<th> ProductName </th>" +
            "<th> Units </th>" +
            "<th> July </th>" +
            "<th> August </th>" +
            "<th> September </th>" +
            "<th> October </th>" +
            "<th> November </th>" +
            "<th> December </th>" +
            "<th> January </th>" +
            "<th> February </th>" +
            "<th> March </th>" +
            "<th> April </th>" +
            "<th> May </th>" +
            "<th> June </th>" +
            "</tr ></thead> <tbody>";

        //for (var i = 0; i < jsonObj.length ; i++) {

        //  tablestring += "<tr>";

        //    tablestring += "<td>" + jsonObj[i].Zone, + "</td>";
        //    tablestring += "<td>" + jsonObj[i].DistributorName + "</td>";
        //    tablestring += "<td>" + jsonObj[i].BrickName + "</td>";
        //    tablestring += "<td>" + jsonObj[i].BrickID + "</td>";
        //    tablestring += "<td>" + jsonObj[i].ClientName + "</td>";
        //    tablestring += "<td>" + jsonObj[i].ProductName + "</td>";
        //    tablestring += "<td>" + jsonObj[i].Units + "</td>";
        //    tablestring += "<td>" + jsonObj[i].July + "</td>";
        //    tablestring += "<td>" + jsonObj[i].August + "</td>";
        //    tablestring += "<td>" + jsonObj[i].September + "</td>";
        //    tablestring += "<td>" + jsonObj[i].October + "</td>";
        //    tablestring += "<td>" + jsonObj[i].November + "</td>";
        //    tablestring += "<td>" + jsonObj[i].December + "</td>";
        //    tablestring += "<td>" + jsonObj[i].January + "</td>";
        //    tablestring += "<td>" + jsonObj[i].February + "</td>";
        //    tablestring += "<td>" + jsonObj[i].March + "</td>";
        //    tablestring += "<td>" + jsonObj[i].April + "</td>";
        //    tablestring += "<td>" + jsonObj[i].May + "</td>";
        //    tablestring += "<td>" + jsonObj[i].June + "</td>";


        //   tablestring += "</tr>";
        //}

        tablestring += "</table></div></div></div></div>";
        //tablestring += "</tbody></table></div></div></div></div>";

        var data = [];

        $.each(jsonObj, function (i, tweet) {

            data.push([
                //tweet.Zone,
                tweet.DistributorName
                , tweet.BrickName
                , tweet.ClientName
                , tweet.ProductName
                , tweet.Units
                , tweet.July
                , tweet.August
                , tweet.September
                , tweet.October
                , tweet.November
                , tweet.December
                , tweet.January
                , tweet.February
                , tweet.March
                , tweet.April
                , tweet.May
                , tweet.June

            ]);

        });


        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "data": data,
            "columns": [
                //{ title: "Zone" },
                { title: "DistributorName" },
                { title: "BrickName" },
                { title: "ClientName" },
                { title: "ProductName" },
                { title: "Units" },
                { title: "July" },
                { title: "August" },
                { title: "September" },
                { title: "October" },
                { title: "November" },
                { title: "December" },
                { title: "January" },
                { title: "February" },
                { title: "March" },
                { title: "April" },
                { title: "May" },
                { title: "June" }
            ],
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },
            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],
            "order": [
                [0, 'asc']
            ],
            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}




function GetProductsSalesPerPharmacy() {


    var teamID = $('#ddlteam').val();

    if (teamID == "-1") {
        alert('Please Select Team For This Report');

        $('#loadingdiv div').hide();
        return false;
    }

    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetProductsSalesPerPharmacy",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtYear').val() + "','Level1':'" + $('#L1').val() +
            "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() +
            "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#ddldistrib').val() +
            "','BrickID':'0" + $('#ddldistrib').val() + "','TeamID':'" + teamID + "','EmployeeId':'0'}",
        success: onSuccessGetProductsSalesPerPharmacy,
        error: onError,
        cache: false,
        asyn: false
    });
}


function onSuccessGetProductsSalesPerPharmacy(data, status) {
    var msg = [];

    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);
        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Products Sales Per Pharmacy</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'>";
        tablestring += "</table></div></div></div></div>";
        var data = [];

        $.each(jsonObj, function (i, tweet) {

            data.push([tweet.ClientName
                , tweet.ProductName
                , tweet.Units
                , tweet.July
                , tweet.August
                , tweet.September
                , tweet.October
                , tweet.November
                , tweet.December
                , tweet.January
                , tweet.February
                , tweet.March
                , tweet.April
                , tweet.May
                , tweet.June]);
        });
        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);
        $('#datatables').DataTable({
            "data": data,
            "columns": [
                { title: "Pharmacy Name" },
                { title: "Product Name" },
                { title: "Units" },
                { title: "July" },
                { title: "August" },
                { title: "September" },
                { title: "October" },
                { title: "November" },
                { title: "December" },
                { title: "January" },
                { title: "February" },
                { title: "March" },
                { title: "April" },
                { title: "May" },
                { title: "June" }
            ],
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },
            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],
            "order": [
                [0, 'asc']
            ],
            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}

function GetLocalVsUpcountryReport() {


    var teamID = $('#ddlteam').val();

    if (teamID == "-1") {
        alert('Please Select Team For This Report');

        $('#loadingdiv div').hide();
        return false;
    }
    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetLocalVsUpcountryReport",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() +
            "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() +
            "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#ddldistrib').val() +
            "','BrickID':'0" + $('#ddldistrib').val() + "','TeamID':'" + teamID + "','EmployeeId':'0'}",
        success: onSuccessGetLocalVsUpcountryReport,
        error: onError,
        cache: false,
        asyn: false
    });
}


function onSuccessGetLocalVsUpcountryReport(data, status) {
    var msg = [];
    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);
        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Local Vs Upcountry Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'>"; // <thead class='flip-content'>";
        //                    "<tr >" +
        //                            "<th> Region </th>" +
        //                            "<th> No. Doctors </th>" +
        //                            "<th> Brick Name </th>" +
        //                            "<th> July </th>" +
        //                            "<th> August </th>" +
        //                            "<th> September </th>" +
        //                            "<th> October </th>" +
        //                            "<th> November </th>" +
        //                            "<th> December </th>" +
        //                            "<th> January </th>" +
        //                            "<th> February </th>" +
        //                            "<th> March </th>" +
        //                            "<th> April </th>" +
        //                            "<th> May </th>" +
        //                            "<th> June </th>" +
        //                    "</tr ></thead> <tbody>";

        //for (var i = 0; i < jsonObj.length ; i++) {

        //    tablestring += "<tr>";

        //    tablestring += "<td>" + jsonObj[i].Region + "</td>";
        //    tablestring += "<td>" + jsonObj[i].DoctorsCount + "</td>";
        //    tablestring += "<td>" + jsonObj[i].BrickName + "</td>";
        //    tablestring += "<td>" + jsonObj[i].July + "</td>";
        //    tablestring += "<td>" + jsonObj[i].August + "</td>";
        //    tablestring += "<td>" + jsonObj[i].September + "</td>";
        //    tablestring += "<td>" + jsonObj[i].October + "</td>";
        //    tablestring += "<td>" + jsonObj[i].November + "</td>";
        //    tablestring += "<td>" + jsonObj[i].December + "</td>";
        //    tablestring += "<td>" + jsonObj[i].January + "</td>";
        //    tablestring += "<td>" + jsonObj[i].February + "</td>";
        //    tablestring += "<td>" + jsonObj[i].March + "</td>";
        //    tablestring += "<td>" + jsonObj[i].April + "</td>";
        //    tablestring += "<td>" + jsonObj[i].May + "</td>";
        //    tablestring += "<td>" + jsonObj[i].June + "</td>";


        //    tablestring += "</tr>";
        //}

        tablestring += "</tbody></table></div></div></div></div>";
        //tablestring += "</tbody></table></div></div></div></div>";


        var data = [];

        $.each(jsonObj, function (i, tweet) {

            data.push([
                tweet.Region
                , tweet.DoctorsCount
                , tweet.BrickName
                , tweet.July
                , tweet.August
                , tweet.September
                , tweet.October
                , tweet.November
                , tweet.December
                , tweet.January
                , tweet.February
                , tweet.March
                , tweet.April
                , tweet.May
                , tweet.June]);

        });


        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "data": data,
            "columns": [
                { title: "Region" },
                { title: "No.Doctors" },
                { title: "Brick" },
                { title: "July" },
                { title: "August" },
                { title: "September" },
                { title: "October" },
                { title: "November" },
                { title: "December" },
                { title: "January" },
                { title: "February" },
                { title: "March" },
                { title: "April" },
                { title: "May" },
                { title: "June" }
            ],
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },
            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],
            "order": [
                [0, 'asc']
            ],
            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}

var DistributorProfileReport = function () {

    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/DistributorProfileReport",
        contentType: "application/json; charset=utf-8",
        //data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','ClientID':'" + $('#L9').val() + "','EmployeeId':'0'}",
        success: onSuccessDistributorProfileReport,
        error: onError,
        cache: false,
        asyn: false
    });
}



function onSuccessDistributorProfileReport(data, status) {
    var msg = [];


    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);
        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Distributor Profile Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>" +
            "<tr >" +
            "<th > Region </th>" +
            "<th > District </th>" +
            "<th > SubRegion </th>" +
            "<th > City </th>" +
            "<th > DistributorType  </th>" +
            "<th > Code </th>" +
            "<th > Name </th>" +
            "<th > Holiday </th>" +
            "<th > Address </th>" +
            "<th > EmailAddress </th>" +
            "<th > Province </th>" +
            "<th > PhoneNo </th>" +
            "<th > ContactPersonName </th>" +
            "<th > ContactPersonDesignation </th>" +
            "<th > ContactPersonMobile </th>" +
            "<th > OwnerName </th>" +
            "<th > MobileOwner </th>" +
            "<th > DistributorSoftwareName </th>" +
            "<th > ProgrammerName </th>" +
            "<th > TotalNoOfStaff </th>" +
            "<th > DistributorClients </th>" +
            "<th > DrugSalesLisenseNo </th>" +
            "</tr ></thead> <tbody>";
        //style='background-color: #217ebd;color: white;' Division	Region	Zone	Territory	RegionName	SubRegionName	DistrictName	City	DistributorName	BrickName	Total	SalePercentage
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";

            tablestring += "<td  >" + jsonObj[i].Region + "</td>";
            tablestring += "<td  >" + jsonObj[i].District + "</td>";
            tablestring += "<td  >" + jsonObj[i].SubRegion + " </td>";
            tablestring += "<td  >" + jsonObj[i].City + " </td>";
            tablestring += "<td  >" + jsonObj[i].DistributorType + " </td>";
            tablestring += "<td  >" + jsonObj[i].Code + "</td>";
            tablestring += "<td  >" + jsonObj[i].Name + " </td>";
            tablestring += "<td  >" + jsonObj[i].Holiday + " </td>";
            tablestring += "<td  >" + jsonObj[i].Address + " </td>";
            tablestring += "<td  >" + jsonObj[i].EmailAddress1 + " </td>";
            tablestring += "<td  >" + jsonObj[i].EmailAddress2 + " </td>";
            tablestring += "<td  >" + jsonObj[i].PhoneNo + " </td>";
            tablestring += "<td  >" + jsonObj[i].ContactPersonName + " </td>";
            tablestring += "<td  >" + jsonObj[i].ContactPersonDesignation + " </td>";
            tablestring += "<td  >" + jsonObj[i].ContactPersonMobile + " </td>";
            tablestring += "<td  >" + jsonObj[i].OwnerName + " </td>";
            tablestring += "<td  >" + jsonObj[i].MobileOwner + " </td>";
            tablestring += "<td  >" + jsonObj[i].DistributorSoftwareName + " </td>";
            tablestring += "<td  >" + jsonObj[i].ProgrammerName + " </td>";
            tablestring += "<td  >" + jsonObj[i].TotalNoOfStaff + " </td>";
            tablestring += "<td  >" + jsonObj[i].DistributorClients + " </td>";
            tablestring += "<td  >" + jsonObj[i].DrugSalesLisenseNo + " </td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },




            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}


var DistributorFileStatus = function () {
    debugger

    $.ajax({
        type: "POST",
        url: "SaleReport.asmx/GetUploaded",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "'}",
        success: onSuccessUploaded,
        error: onError,
        cache: false,
        asyn: false
    });
}


function onSuccessUploaded(data, status) {
    var msg = [];


    if (data.d != "" && data.d != "[]") {
        $('#contain').show();
        jsonObj = $.parseJSON(data.d);
        var tablestring = "<div class='portlet light portlet-fit'> " +
            "  <div class='portlet-title'>" + "   <div class='caption'>" + "  <span class='caption-subject font-red sbold uppercase'>Distributor File Upload Updates Report</span></div>" +
            " </div>" +
            "<div class='portlet-body'>  <div class='portlet-body flip-scroll'><div class='dataTables_wrapper'><table id='datatables' class='table table-bordered table-striped table-condensed flip-content'> <thead class='flip-content'>" +
            "<tr >" +
            "<th > DistributorCode </th>" +
            "<th > FileUploadDate </th>" +
            "<th > FileStatus </th>" +
            "</tr ></thead> <tbody>";
        //style='background-color: #217ebd;color: white;' Division	Region	Zone	Territory	RegionName	SubRegionName	DistrictName	City	DistributorName	BrickName	Total	SalePercentage
        for (var i = 0; i < jsonObj.length; i++) {
            tablestring += "<tr>";
            tablestring += "<td  >" + jsonObj[i].DistributorCode + "</td>";
            tablestring += "<td  >" + jsonObj[i].UploadDate + "</td>";
            tablestring += "<td  >" + jsonObj[i].FileStatus + " </td>";
            tablestring += "</tr>";
        }
        tablestring += "</tbody></table></div></div></div></div>";

        $("#RenderReport").empty();
        $("#RenderReport").append(tablestring);

        $('#datatables').DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },




            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns' }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            //  responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }
    $('#loadingdiv div').hide();
}



var CustomerWiseSalesReport = function () {
    var date = $('#txtDate').val();
    var Distid = $('#ddldistrib').val() == null || $('#ddldistrib').val() == '-1' ? 0 : $('#ddldistrib').val();
    var Brickid = $('#ddlBricks').val() == null || $('#ddlBricks').val() == '-1' ? 0 : $('#ddlBricks').val();
    var Teamid = $('#ddlteam').val() == null || $('#ddlteam').val() == '-1' ? 0 : $('#ddlteam').val();
    var ClientId = $('#ddlcustomer').val() == null || $('#ddlcustomer').val() == '-1' ? 0 : $('#ddlcustomer').val();

    var Level1 = $('#L1').val() == null || $('#L1').val() == '-1' || $('#L1').val() == '' ? 0 : $('#L1').val();
    var Level2 = $('#L2').val() == null || $('#L2').val() == '-1' || $('#L2').val() == '' ? 0 : $('#L2').val();
    var Level3 = $('#L3').val() == null || $('#L3').val() == '-1' || $('#L3').val() == '' ? 0 : $('#L3').val();
    var Level4 = $('#L4').val() == null || $('#L4').val() == '-1' || $('#L4').val() == '' ? 0 : $('#L4').val();
    var Level5 = $('#L5').val() == null || $('#L5').val() == '-1' || $('#L5').val() == '' ? 0 : $('#L5').val();
    var Level6 = $('#L6').val() == null || $('#L6').val() == '-1' || $('#L6').val() == '' ? 0 : $('#L6').val();

    window.open("../Handler/GetSalesReport.ashx?date=" + date + "&DistId=" + Distid + "&BrickId=" + Brickid + "&TeamId=" + Teamid + "&ClientId=" + ClientId + "&reportName=CustomerWiseSalesReport", "Report");


    $('#loadingdiv div').hide();
}

var InvoiceVoiceSalesReport = function () {
    var date1 = $('#stdate').val();
    var date2 = $('#enddate').val();
    var Distid = $('#ddldistrib').val() == null || $('#ddldistrib').val() == '-1' ? 0 : $('#ddldistrib').val();
    var Brickid = $('#ddlBricks').val() == null || $('#ddlBricks').val() == '-1' ? 0 : $('#ddlBricks').val();
    var Teamid = $('#ddlteam').val() == null || $('#ddlteam').val() == '-1' ? 0 : $('#ddlteam').val();
    var ClientId = $('#ddlcustomer').val() == null || $('#ddlcustomer').val() == '-1' ? 0 : $('#ddlcustomer').val();
    var ProductId = $('#ddlPro').val() == null || $('#ddlPro').val() == '-1' ? 0 : $('#ddlPro').val();

    var Level1 = $('#L1').val() == null || $('#L1').val() == '-1' || $('#L1').val() == '' ? 0 : $('#L1').val();
    var Level2 = $('#L2').val() == null || $('#L2').val() == '-1' || $('#L2').val() == '' ? 0 : $('#L2').val();
    var Level3 = $('#L3').val() == null || $('#L3').val() == '-1' || $('#L3').val() == '' ? 0 : $('#L3').val();
    var Level4 = $('#L4').val() == null || $('#L4').val() == '-1' || $('#L4').val() == '' ? 0 : $('#L4').val();
    var Level5 = $('#L5').val() == null || $('#L5').val() == '-1' || $('#L5').val() == '' ? 0 : $('#L5').val();
    var Level6 = $('#L6').val() == null || $('#L6').val() == '-1' || $('#L6').val() == '' ? 0 : $('#L6').val();

    window.open("../Handler/GetSalesReport.ashx?date1=" + date1 + "&date2=" + date2 + "&DistId=" + Distid + "&BrickId=" + Brickid + "&TeamId=" + Teamid + "&ClientId=" + ClientId + "&ProductId=" + ProductId + "&reportName=InvoiceVoiceSalesReport", "Report");


    $('#loadingdiv div').hide();
}


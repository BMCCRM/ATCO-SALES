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
    
   
    var cdt = new Date();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var current_mint = cdt.getMinutes();
    var current_hrs = cdt.getHours();
    var current_date = cdt.getDate();

    var current_month = cdt.getMonth();
    var month_name = monthNames[current_month];
    var current_year = cdt.getFullYear();

    $('#txtDate').val(month_name + '-' + current_year);
    //   $('#txtenddate').val(month_name + '-' + current_year);

    $('#txtDate').datepicker({
        autoclose: true,
        todayHighlight: true,
        viewMode: 'months',
        minViewMode: "months",
        format: 'MM-yyyy'
    }).datepicker();

  
    IsValidUser();

    $('#ddl1').change(OnChangeddl1);
    $('#ddl2').change(OnChangeddl2);
    $('#ddl3').change(OnChangeddl3);
    $('#ddl4').change(OnChangeddl4);
    $('#ddl5').change(OnChangeddl5);
    $('#ddl6').change(OnChangeddl6);




    //$('#ddl11').change(OnChangeddl1);
    //$('#ddl22').change(OnChangeddl2);
    //$('#ddl33').change(OnChangeddl3);
    //$('#ddl44').change(OnChangeddl4);
    //$('#ddl55').change(OnChangeddl5);


    $('#ddldistrib').change(OnChangeddlDistrib);

    HideHierarchy();
    GetCurrentUser();

    OnChangeProduct();
    $('#ddlPro').change(OnChangeProductSku);
    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.2).get('rgb')] // darken
            ]
        };
    });

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
        $('#L7').val('');
    } else {
        $('#L1').val(0);
        $('#L2').val(0);
        $('#L3').val(0);
        $('#L4').val(0);
        $('#L5').val(0);
        $('#L6').val(0);
        $('#L7').val(0);
        $('#L9').val($('#ddlPro').val() == "-1" ? "0" : $('#ddlPro').val());
        $('#L10').val($('#ddlProsku').val() == "-1" ? "0" : $('#ddlProsku').val());
    }

    //$('#Actcall').jqm({ modal: true });
    //$('#Actcall').jqm();
    //$('#Actcall').jqmShow();

    //this all level call
    //OnChangeddl4();

    AllSaleCount();
    AllDistributorBrickWise();
    AllProductWiseSale();
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

    debugger

    if (data.d != "") {

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

            if (CurrentUserRole == 'admin') {
                name = 'Select ' + HierarchyLevel3;
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

function xOnChangeddl1() {

    levelValue = $('#ddl1').val();
    myData = "{'level3Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L3",
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
function xonSuccessFillddl1(data, status) {

    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";

    if (data.d != "") {

      //  jsonObj = jsonParse(data.d);
        value = '-1';
        name = 'Select ' + HierarchyLevel4;
        $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddl2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }
  //  IsValidUser();
  //  OnChangeddl4();

}

function xOnChangeddl2() {



    levelValue = $('#ddl2').val();

    myData = "{'level4Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L4",
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
function xonSuccessFillddl2(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";

    if (data.d != "") {

    //    jsonObj = jsonParse(data.d);


        value = '-1';
        name = 'Select ' + HierarchyLevel5;
        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddl3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }
   // IsValidUser();
    //FillGridMioInfo();
   // OnChangeddl4();
}

function xOnChangeddl3() {



    levelValue = $('#ddl3').val();
    myData = "{'level5Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L5",
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
function xonSuccessFillddl3(data, status) {
    document.getElementById('ddl4').innerHTML = "";

    if (data.d != "") {
     //   jsonObj = jsonParse(data.d);
        value = '-1';
        name = 'Select ' + HierarchyLevel6;
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddl4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }
  //  IsValidUser();
  //FillGridMioInfo();
  //  OnChangeddl4();
}

function OnChangeddl6() {
    //if ($('#ddl1').val() != '-1' && $('#ddl2').val() == '-1') {
    //    $('#L1').val(0);
    //    $('#L2').val(0);
    //    $('#L3').val($('#ddl1').val());
    //    $('#L4').val(0);
    //    $('#L5').val(0);
    //    $('#L6').val(0);
    //    $('#L7').val(0);
    //}
    //if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() == '-1') {
      
    //    $('#L1').val(0);
    //    $('#L2').val(0);
    //    $('#L3').val($('#ddl1').val());
    //    $('#L4').val($('#ddl2').val());
    //    $('#L5').val(0);
    //    $('#L6').val(0);
    //    $('#L7').val(0);
    //}
    //if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() != '-1' && $('#ddl4').val() == '-1') {
    //    $('#L1').val(0);
    //    $('#L2').val(0);
    //    $('#L3').val($('#ddl1').val());
    //    $('#L4').val($('#ddl2').val());
    //    $('#L5').val($('#ddl3').val());
    //    $('#L6').val(0);
    //    $('#L7').val(0);
    //}

    //if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() != '-1' && $('#ddl4').val() != '-1' && $('#ddldistrib').val() == '-1') {
    //    $('#L1').val(0);
    //    $('#L2').val(0);
    //    $('#L3').val($('#ddl1').val());
    //    $('#L4').val($('#ddl2').val());
    //    $('#L5').val($('#ddl3').val());
    //    $('#L6').val($('#ddl4').val());
    //    $('#L7').val(0);
    //}

    levelValue = $('#ddl6').val(); 
    myData = "{'DivisionID':'" + $('#L3').val() + "','RegionID':'" + $('#L4').val() + "','ZoneID':'" + $('#L5').val() + "','TerritoryID':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "NewSalesdashboard.asmx/GetTerritoryDistributor",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillDistrib,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        document.getElementById('ddldistrib').innerHTML = "";
    }

  //  IsValidUser();

}
function onSuccessFillDistrib(data, status) {

    $("#ddldistrib").empty();
    $("#ddldistrib").append("<option value='-1'>Select Distributor</option>");

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
       
        $.each(jsonObj, function (i, tweet) {
            $("#ddldistrib").append("<option value='" + jsonObj[i].DistributorID + "'>" + jsonObj[i].DistributorName + "</option>");
        });
    }
   
   // IsValidUser();

}

function OnChangeddlDistrib() {
    // 
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
            success: onSuccessFillddlBricks,
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
function onSuccessFillddlBricks(data, status) {
  
    $("#ddlBricks").empty();
    $("#ddlBricks").append("<option value='-1'>Select Brick</option>");
    if (data.d != "") {
        jsonObj = jsonParse(data.d);
        $.each(jsonObj, function (i, tweet) {
            $("#ddlBricks").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].BrickName + "</option>");
        });
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






















function onError(request, status, error) {

    toastr.error(error, 'Error', {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-center",
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    });

    //msg = 'Error occoured';
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
    debugger;

    $('#allproductwisecharts').empty();
    $('#distributorbricksalescharts').empty();
    $('#productsalescharts').empty();

    //if ($('#ddl1').val() == '-1') {
    //    $("#col1").addClass("has-error");
    //    return false;
    //} else {
    //    $("#col1").removeClass("has-error");
    //}

    if ($('#ddl1').val() != '-1' && $('#ddl2').val() == '-1') {
       // alert('2')
        $('#L1').val($('#ddl1').val());
        $('#L2').val(0);
        $('#L3').val(0);
        $('#L4').val(0);
        $('#L5').val(0);
        $('#L6').val(0);
        $('#L7').val(0);
        $('#L9').val($('#ddlPro').val() == "-1" ? "0" : $('#ddlPro').val());
        $('#L10').val($('#ddlProsku').val() == "-1" ? "0" : $('#ddlProsku').val());


        AllSaleCount();
        getBUHDistributorkWise();
        BUHBrickWisedata();
    }
    if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() == '-1') {
      //  alert('3')
        $('#L1').val($('#ddl1').val());
        $('#L2').val($('#ddl2').val());
        $('#L3').val(0);
        $('#L4').val(0);
        $('#L5').val(0);
        $('#L6').val(0);
        $('#L7').val(0);
        $('#L9').val($('#ddlPro').val() == "-1" ? "0" : $('#ddlPro').val());
        $('#L10').val($('#ddlProsku').val() == "-1" ? "0" : $('#ddlProsku').val());
        AllSaleCount();
        getGMDistributorkWise();
        GMBrickWisedata();
    }

    if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() != '-1' && $('#ddl4').val() == '-1') {
      //  alert('4')
        $('#L1').val($('#ddl1').val());
        $('#L2').val($('#ddl2').val());
        $('#L3').val($('#ddl3').val());
        $('#L4').val(0);
        $('#L5').val(0);
        $('#L6').val(0);
        $('#L7').val(0);
        $('#L9').val($('#ddlPro').val() == "-1" ? "0" : $('#ddlPro').val());
        $('#L10').val($('#ddlProsku').val() == "-1" ? "0" : $('#ddlProsku').val());
       

        AllSaleCount();
        getNationalDistributorkWise();
        BrickWisedata();
    }
    if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() != '-1' && $('#ddl4').val() != '-1' && $('#ddl5').val() == '-1') {
      //  alert('5')
        $('#L1').val($('#ddl1').val());
        $('#L2').val($('#ddl2').val());
        $('#L3').val($('#ddl3').val());
        $('#L4').val($('#ddl4').val());
        $('#L5').val(0);
        $('#L6').val(0);
        $('#L7').val(0);
        $('#L9').val($('#ddlPro').val() == "-1" ? "0" : $('#ddlPro').val());
        $('#L10').val($('#ddlProsku').val() == "-1" ? "0" : $('#ddlProsku').val());
        AllSaleCount();
        getRegionDistributorkWise();
        RegionBrickWisedata();
    }
    if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() != '-1' && $('#ddl4').val() != '-1' && $('#ddl5').val() != '-1' && $('#ddl6').val() == '-1') {
        //alert('6')
        $('#L1').val($('#ddl1').val());
        $('#L2').val($('#ddl2').val());
        $('#L3').val($('#ddl3').val());
        $('#L4').val($('#ddl4').val());
        $('#L5').val($('#ddl5').val());
        $('#L6').val(0);
        $('#L7').val(0);
        $('#L9').val($('#ddlPro').val() == "-1" ? "0" : $('#ddlPro').val());
        $('#L10').val($('#ddlProsku').val() == "-1" ? "0" : $('#ddlProsku').val());
        AllSaleCount();
        getRegionDistributorkWise();
        ZoneBrickWisedata();
    }
    if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() != '-1' && $('#ddl4').val() != '-1' && $('#ddl5').val() != '-1' && $('#ddl6').val() != '-1' && $('#ddldistrib').val() == '-1') { //&& $('#ddldistrib').val() == '-1'
      //  alert('7')
        $('#L1').val($('#ddl1').val());
        $('#L2').val($('#ddl2').val());
        $('#L3').val($('#ddl3').val());
        $('#L4').val($('#ddl4').val());
        $('#L5').val($('#ddl5').val());
        $('#L6').val($('#ddl6').val());
        $('#L7').val(0);
        $('#L9').val($('#ddlPro').val() == "-1" ? "0" : $('#ddlPro').val());
        $('#L10').val($('#ddlProsku').val() == "-1" ? "0" : $('#ddlProsku').val());
        AllSaleCount();
        getdistributorwisedata();
        DistributorWiseBrickSale();
   } 
    if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() != '-1' && $('#ddl4').val() != '-1' && $('#ddl5').val() != '-1' && $('#ddl6').val() != '-1'  && $('#ddldistrib').val() != '-1' && $('#ddlBricks').val() == '-1') {
        //alert('8')
        $('#L1').val($('#ddl1').val());
        $('#L2').val($('#ddl2').val());
        $('#L3').val($('#ddl3').val());
        $('#L4').val($('#ddl4').val());
        $('#L5').val($('#ddl5').val());
        $('#L6').val($('#ddl6').val());
        $('#L7').val($('#ddldistrib').val());
        $('#L9').val($('#ddlPro').val() == "-1" ? "0" : $('#ddlPro').val());
        $('#L10').val($('#ddlProsku').val() == "-1" ? "0" : $('#ddlProsku').val());
        AllSaleCount();

        getToptenbrickdata();
        ClientWiseBrickSale();

    }
  
    if ($('#ddl1').val() != '-1' && $('#ddl2').val() != '-1' && $('#ddl3').val() != '-1' && $('#ddl4').val() != '-1' && $('#ddl5').val() != '-1' && $('#ddl6').val() != '-1'  && $('#ddldistrib').val() != '-1' && $('#ddlBricks').val() != '-1') {
        //alert('9')
        $('#L1').val($('#ddl1').val());
        $('#L2').val($('#ddl2').val());
        $('#L3').val($('#ddl3').val());
        $('#L4').val($('#ddl4').val());
        $('#L5').val($('#ddl5').val());
        $('#L6').val($('#ddl6').val());
        $('#L7').val($('#ddldistrib').val());
        $('#L8').val($('#ddlBricks').val());
        $('#L9').val($('#ddlPro').val() == "-1" ? "0" : $('#ddlPro').val());
        $('#L10').val($('#ddlProsku').val() == "-1" ? "0" : $('#ddlProsku').val());
        AllSaleCount();

        getToptenProductdata();
        ClientproducWiseBrickSale();
        // ProductWiseBrickSale();
    }
    /*
    if ($('#ddl1').val() == '-1' && $('#ddldistrib').val() != '-1' && $('#ddlBricks').val() == '-1') {

        $('#L1').val(0);
        $('#L2').val(0);
        $('#L3').val(0);
        $('#L4').val(0);
        $('#L5').val(0);
        $('#L6').val(0);
        $('#L7').val($('#ddldistrib').val());
        $('#L9').val($('#ddlPro').val() == "-1" ? "0" : $('#ddlPro').val());
        $('#L10').val($('#ddlProsku').val() == "-1" ? "0" : $('#ddlProsku').val());
        AllSaleCount();

        getToptenProductdata();
        ProductWiseBrickSale();
    }   */
    if ($('#ddl1').val() == '-1' && $('#ddl2').val() == null) {

        $('#L1').val(0);
        $('#L2').val(0);
        $('#L3').val(0);
        $('#L4').val(0);
        $('#L5').val(0);
        $('#L6').val(0);
        $('#L7').val(0);
        $('#L9').val($('#ddlPro').val() == "-1" ? "0" : $('#ddlPro').val());
        $('#L10').val($('#ddlProsku').val() == "-1" ? "0" : $('#ddlProsku').val());

        AllSaleCount();
        AllDistributorBrickWise();
        AllProductWiseSale();
    }
 
}
//------------------------------------------------------

var AllSaleCount = function () {
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/AllSaleCount",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessGetAllSaleCount,
        error: onError,
        cache: false,
        asyn: false
    });
}
var onSuccessGetAllSaleCount = function (response) {
    var msg = [];
    // ajaxCompleted();
    if (response.d != "") {
        msg = $.parseJSON(response.d);

        $('#totalsale').empty();
        $('#totalsale').append($('<span class="counter"  >' + msg[0].TotalSale + '</span> '));
        //$('#totalsale .counter').countUp({ delay: 10, time: 1000 });

        $('#TotalUnits').empty();
        $('#TotalUnits').append($('<span class="counter"  >' + msg[0].TotalUnits + '</span> '));
        //   $('#TotalUnits .counter').countUp({ delay: 10, time: 1000 });

        $('#TotalProduct').empty();
        $('#TotalProduct').append($('<span class="counter"  >' + msg[0].TotalProduct + '</span> '));
        //  $('#TotalProduct .counter').countUp({ delay: 10, time: 1000 });

        $('#TotalDistributor').empty();
        $('#TotalDistributor').append($('<span class="counter"  >' + msg[0].TotalDistributor + '</span> '));

        $('.counter').countUp({ delay: 10, time: 1000 });

    }

    //  alert(msg[0].TotalSale);
    //var data = [];
    //$('#productsalescharts').empty();
}
//------------------Over All------------
//GetAllDistributorBrickWise
var AllDistributorBrickWise = function () {
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/GetAllDistributorBrickWise",
        contentType: "application/json; charset=utf-8",//string date, string Level3, string Level4, string Level5, string Level6, string EmployeeId
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessAllDistributorBrickWise,
        error: onError,
        cache: false,
        asyn: false
    });
}
var onSuccessAllDistributorBrickWise = function (response) {
    if (response.d != "") {
        var msg = $.parseJSON(response.d);
        var DistributorID = [];
        var DistributorName = [];
        //DistributorId,final.DistributorName,
        $.each(msg, function (i, option) {
            DistributorID.push(option.DistributorId);
            DistributorName.push(option.DistributorName);

        });

        var uniqueid = DistributorID.filter(function (itm, i, teamnames) {
            return i == teamnames.indexOf(itm);
        });

        var unique = DistributorName.filter(function (itm, i, teamnames) {
            return i == teamnames.indexOf(itm);
        });

        $('#productsalescharts').empty();
        for (var a = 0; a < unique.length; a++) {
            var productdata = [];

            $.each(msg, function (i, option) {
                if (option.DistributorName == unique[a]) {
                    productdata.push({
                        name: option.BrickName,
                        y: parseFloat(option.Total)
                    });
                }

            });

            $('#productsalescharts').append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
                                    + '<div class="portlet light ">'
                                    + '<div class="portlet-title">'
                                    + '<div class="caption caption-md">'
                                    + '<i class="icon-bar-chart font-dark hide"></i>'
                                    + '<span class="caption-subject font-blue-steel uppercase bold">' + unique[a] + '</span>'
                                    + '</div>'
                                    + '</div>'
                                    + '<div id="' + uniqueid[a].replace(/ +/g, "") + 'chart"></div>'
                                    + '</div>'
                                    + '</div>');

            //$('#productsalescharts').append('<div class="col-md-4">'+
            //  +'  <div class="panel panel-heading" style="background-color: #338dc8">'+
            // +'  <span class="text-center" style="color:white;text-align:center;font-weight:800">' + unique[a] + ' Sales Chart </span>'
            //        + '</div> <div id="' + unique[a].replace(/ +/g, "") + 'chart"> </div> </div>');

            var newid = '#' + uniqueid[a].replace(/ +/g, "") + 'chart';
            onsuccessalldistrub(newid, unique[a], productdata);
        }
    } else {
        toastr.info('Data Not Found!', 'Alert', {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-center",
            "onclick": null,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        });
    }
}

var onsuccessalldistrub = function (id, title, data) {

    $(function () {

        $(id).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
            },
            plotOptions: {

                pie: {
                    //innerSize: 120,
                    //depth: 50,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                    },
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        distance: -50,
                        filter: {
                            property: 'percentage',
                            operator: '>',
                            value: 4
                        }
                    }
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

//AllProductWiseSale
var AllProductWiseSale = function () {
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/AllProductWiseSale",
        contentType: "application/json; charset=utf-8",//string date, string Level3, string Level4, string Level5, string Level6, string EmployeeId
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessAllProductWiseSale,
        error: onError,
        cache: false,
        asyn: false
    });
}
var onSuccessAllProductWiseSale = function (response) {
    debugger;
    var msg = $.parseJSON(response.d);
    var BrickID = [];
    var BrickName = [];
    //BrickId, final.BrickName ,final.ProductName
    $.each(msg, function (i, option) {
        BrickID.push(option.ClientID);
        BrickName.push(option.ClientName);

    });

    var uniqueid = BrickID.filter(function (itm, i, teamnames) {
        return i == teamnames.indexOf(itm);
    });

    var unique = BrickName.filter(function (itm, i, teamnames) {
        return i == teamnames.indexOf(itm);
    });

    $('#allproductwisecharts').empty();
    for (var a = 0; a < unique.length; a++) {
        var productdata = [];

        $.each(msg, function (i, option) {
            if (option.ClientName == unique[a]) {
                productdata.push({
                    name: option.ProductName,
                    y: parseFloat(option.Total)
                });
            }

        });

        $('#allproductwisecharts').append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
            + '<div class="portlet light ">'

            + '<div class="portlet-title">'
                + '  <div class="caption caption-md">'
                    + '  <i class="icon-bar-chart font-dark hide"></i>'
                      + '  <span class="caption-subject font-blue-steel uppercase bold">' + unique[a] + '</span>'
                    + ' </div>'
                     + '  </div>'

                      + ' <div id="' + uniqueid[a].replace(/ +/g, "") + 'chart"></div>'
                    + '  </div>'
                     + '  </div>');


        var newid = '#' + uniqueid[a].replace(/ +/g, "") + 'chart';
        onsuccessallproductwisecharts(newid, unique[a], productdata);
    }

}

var onsuccessallproductwisecharts = function (id, title, data) {
    debugger;
    $(function () {

        $(id).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
            },
            plotOptions: {

                pie: {
                    //innerSize: 120,
                    //depth: 50,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                    },
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        distance: -50,
                        filter: {
                            property: 'percentage',
                            operator: '>',
                            value: 4
                        }
                    }
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

//--------------------------

//-------------------------
//BUHDistributorkWise

var getBUHDistributorkWise = function () {
    //string ProductId,string SkuId)
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/BUHDistributorkWise",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessBUHDistributorkWise,
        //  beforeSend: startingAjax,
        error: onError,
        cache: false,
        asyn: false
    });
}

var onSuccessBUHDistributorkWise = function (response) {
    var msg = [];
    // ajaxCompleted();
    if (response.d != "") {
        msg = $.parseJSON(response.d);

        var data = [];

        $('#distributorbricksalescharts').empty();
        $('#distributorbricksalescharts').append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
             + '<div class="portlet light ">'

             + '<div class="portlet-title">'
                 + '  <div class="caption caption-md">'
                     + '  <i class="icon-bar-chart font-dark hide"></i>'
                       + '  <span class="caption-subject font-blue-steel uppercase bold">Distributor Detailed Sales</span>'
                     + ' </div>'
                      + '  </div>'

                       + ' <div id="bricksaleunitchart"></div>'


                     + '  </div>'
                      + '  </div>');

        $.each(msg, function (i, option) {
            data.push({
                name: option.DistributorName,
                data: [parseFloat(option.Total)]
            });
        });

        //  $(function () {
        Highcharts.chart('bricksaleunitchart', {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 0,
                    depth: 100
                    //enabled: true,
                    //alpha: 15,
                    //beta: 15,
                    //viewDistance: 25,
                    //depth: 40
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

                    depth: 40
                    //depth: 25
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
        // });
    }
}


var BUHBrickWisedata = function () {
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/BUHBrickWise",
        contentType: "application/json; charset=utf-8",//string date, string Level3, string Level4, string Level5, string Level6, string EmployeeId
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessGetBUHBrickWiseData,
        error: onError,
        cache: false,
        asyn: false
    });
}

var onSuccessGetBUHBrickWiseData = function (response) {
    var msg = $.parseJSON(response.d);
    var GM = [];

    $.each(msg, function (i, option) {

        GM.push(option.GM);

    });

    var unique = GM.filter(function (itm, i, teamnames) {
        return i == teamnames.indexOf(itm);
    });

    $('#productsalescharts').empty();
    for (var a = 0; a < unique.length; a++) {
        var productdata = [];

        $.each(msg, function (i, option) {
            if (option.GM == unique[a]) {
                productdata.push({
                    name: option.BrickName,
                    y: parseFloat(option.Total)
                });
            }

        });
        
        $('#productsalescharts').append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
                + '<div class="portlet light ">'

                + '<div class="portlet-title">'
                + '<div class="caption caption-md">'
                + '<i class="icon-bar-chart font-dark hide"></i>'
                + '<span class="caption-subject font-blue-steel uppercase bold">' + unique[a] + '</span>'
                + '</div>'
                + '</div>'
                + '<div id="' + unique[a].replace(/ +/g, "") + 'chart"></div>'
                + '</div>'
                + '</div>');

        //$('#productsalescharts').append('<div class="col-md-4">'+
        //  +'  <div class="panel panel-heading" style="background-color: #338dc8">'+
        // +'  <span class="text-center" style="color:white;text-align:center;font-weight:800">' + unique[a] + ' Sales Chart </span>'
        //        + '</div> <div id="' + unique[a].replace(/ +/g, "") + 'chart"> </div> </div>');

        var newid = '#' + unique[a].replace(/ +/g, "") + 'chart';
        onsuccessBUHbrikPiechart(newid, unique[a], productdata);
    }

}

var onsuccessBUHbrikPiechart = function (id, title, data) {
    $(function () {

        $(id).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
            },
            plotOptions: {

                pie: {
                    //innerSize: 50,
                    //depth: 45,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                    },
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        distance: -50,
                        filter: {
                            property: 'percentage',
                            operator: '>',
                            value: 4
                        }
                    }
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
//--------------------------

//GMDistributorkWise

var getGMDistributorkWise = function () {
    //string ProductId,string SkuId)
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/GMDistributorkWise",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessGMDistributorkWise,
        //  beforeSend: startingAjax,
        error: onError,
        cache: false,
        asyn: false
    });
}

var onSuccessGMDistributorkWise = function (response) {
    var msg = [];
    // ajaxCompleted();
    if (response.d != "") {
        msg = $.parseJSON(response.d);

        var data = [];

        $('#distributorbricksalescharts').empty();
        $('#distributorbricksalescharts').append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
             + '<div class="portlet light ">'

             + '<div class="portlet-title">'
                 + '  <div class="caption caption-md">'
                     + '  <i class="icon-bar-chart font-dark hide"></i>'
                       + '  <span class="caption-subject font-blue-steel uppercase bold">Distributor Detailed Sales</span>'
                     + ' </div>'
                      + '  </div>'

                       + ' <div id="bricksaleunitchart"></div>'


                     + '  </div>'
                      + '  </div>');

        $.each(msg, function (i, option) {
            data.push({
                name: option.DistributorName,
                data: [parseFloat(option.Total)]
            });
        });

        //  $(function () {
        Highcharts.chart('bricksaleunitchart', {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 0,
                    depth: 100
                    //enabled: true,
                    //alpha: 15,
                    //beta: 15,
                    //viewDistance: 25,
                    //depth: 40
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

                    depth: 40
                    //depth: 25
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
        // });
    }
}


var GMBrickWisedata = function () {
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/GMBrickWise",
        contentType: "application/json; charset=utf-8",//string date, string Level3, string Level4, string Level5, string Level6, string EmployeeId
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessGetGMBrickWiseData,
        error: onError,
        cache: false,
        asyn: false
    });
}

var onSuccessGetGMBrickWiseData = function (response) {
    var msg = $.parseJSON(response.d);
    var Division = [];

    $.each(msg, function (i, option) {

        Division.push(option.Division);

    });

    var unique = Division.filter(function (itm, i, teamnames) {
        return i == teamnames.indexOf(itm);
    });
    for (var a = 0; a < unique.length; a++) {
        var productdata = [];

        $.each(msg, function (i, option) {
            if (option.Division == unique[a]) {
                productdata.push({
                    name: option.BrickName,
                    y: parseFloat(option.Total)
                });
            }

        });
        $('#productsalescharts').empty();
        $('#productsalescharts').append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
                + '<div class="portlet light ">'

                + '<div class="portlet-title">'
                + '<div class="caption caption-md">'
                + '<i class="icon-bar-chart font-dark hide"></i>'
                + '<span class="caption-subject font-blue-steel uppercase bold">' + unique[a] + '</span>'
                + '</div>'
                + '</div>'
                + '<div id="' + unique[a].replace(/ +/g, "") + 'chart"></div>'
                + '</div>'
                + '</div>');

        //$('#productsalescharts').append('<div class="col-md-4">'+
        //  +'  <div class="panel panel-heading" style="background-color: #338dc8">'+
        // +'  <span class="text-center" style="color:white;text-align:center;font-weight:800">' + unique[a] + ' Sales Chart </span>'
        //        + '</div> <div id="' + unique[a].replace(/ +/g, "") + 'chart"> </div> </div>');

        var newid = '#' + unique[a].replace(/ +/g, "") + 'chart';
        onsuccessGMbrikPiechart(newid, unique[a], productdata);
    }

}

var onsuccessGMbrikPiechart = function (id, title, data) {
    $(function () {

        $(id).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
            },
            plotOptions: {

                pie: {
                    //innerSize: 50,
                    //depth: 45,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                    },
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        distance: -50,
                        filter: {
                            property: 'percentage',
                            operator: '>',
                            value: 4
                        }
                    }
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
//--------------------------

//NationalDistributorkWise

var getNationalDistributorkWise = function () {
    //string ProductId,string SkuId)
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/NationalDistributorkWise",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessNationalDistributorkWise,
        //  beforeSend: startingAjax,
        error: onError,
        cache: false,
        asyn: false
    });
}

var onSuccessNationalDistributorkWise = function (response) {
    var msg = [];
    // ajaxCompleted();
    if (response.d != "") {
        msg = $.parseJSON(response.d);

        var data = [];

        $('#distributorbricksalescharts').empty();
        $('#distributorbricksalescharts').append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
             + '<div class="portlet light ">'
             + '<div class="portlet-title">'
            + '  <div class="caption caption-md">'
            + '  <i class="icon-bar-chart font-dark hide"></i>'
            + '  <span class="caption-subject font-blue-steel uppercase bold">Distributor Detailed Sales</span>'
            + ' </div>'
            + '  </div>'
            + ' <div id="bricksaleunitchart"></div>'
            + '  </div>'
            + '  </div>');

        $.each(msg, function (i, option) {
            data.push({
                name: option.DistributorName,
                data: [parseFloat(option.Total)]
            });
        });

        //  $(function () {
        Highcharts.chart('bricksaleunitchart', {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 0,
                    depth: 100
                    //enabled: true,
                    //alpha: 15,
                    //beta: 15,
                    //viewDistance: 25,
                    //depth: 40
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

                    depth: 40
                    //depth: 25
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
        // });
    }
}


var BrickWisedata = function () {
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/NationalBrickWise",
        contentType: "application/json; charset=utf-8",//string date, string Level3, string Level4, string Level5, string Level6, string EmployeeId
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessGetBrickWiseData,
        error: onError,
        cache: false,
        asyn: false
    });
}

var onSuccessGetBrickWiseData = function (response) {
    var msg = $.parseJSON(response.d);
    var Region = [];

    $.each(msg, function (i, option) {

        Region.push(option.Region);

    });

    var unique = Region.filter(function (itm, i, teamnames) {
        return i == teamnames.indexOf(itm);
    });
    for (var a = 0; a < unique.length; a++) {
        var productdata = [];

        $.each(msg, function (i, option) {
            if (option.Region == unique[a]) {
                productdata.push({
                    name: option.BrickName,
                    y: parseFloat(option.Total)
                });
            }

        });
        $('#productsalescharts').empty();
        $('#productsalescharts').append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
                + '<div class="portlet light ">'

                + '<div class="portlet-title">'
                + '<div class="caption caption-md">'
                + '<i class="icon-bar-chart font-dark hide"></i>'
                + '<span class="caption-subject font-blue-steel uppercase bold">' + unique[a] + '</span>'
                + '</div>'
                + '</div>'
                + '<div id="' + unique[a].replace(/ +/g, "") + 'chart"></div>'
                + '</div>'
                + '</div>');

        //$('#productsalescharts').append('<div class="col-md-4">'+
        //  +'  <div class="panel panel-heading" style="background-color: #338dc8">'+
        // +'  <span class="text-center" style="color:white;text-align:center;font-weight:800">' + unique[a] + ' Sales Chart </span>'
        //        + '</div> <div id="' + unique[a].replace(/ +/g, "") + 'chart"> </div> </div>');

        var newid = '#' + unique[a].replace(/ +/g, "") + 'chart';
        onsuccessbrikPiechart(newid, unique[a], productdata);
    }

}

var onsuccessbrikPiechart = function (id, title, data) {
    $(function () {

        $(id).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
            },
            plotOptions: {

                pie: {
                    //innerSize: 50,
                    //depth: 45,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                    },
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        distance: -50,
                        filter: {
                            property: 'percentage',
                            operator: '>',
                            value: 4
                        }
                    }
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
//--------------------------

var getRegionDistributorkWise = function () {

    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/RegionDistributorkWise",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessRegionDistributor,
        //  beforeSend: startingAjax,
        error: onError,
        cache: false,
        asyn: false
    });
}

var onSuccessRegionDistributor = function (response) {
    var msg = [];
    // ajaxCompleted();
    if (response.d != "")
        msg = $.parseJSON(response.d);

    var data = [];

    $('#distributorbricksalescharts').empty();
    $('#distributorbricksalescharts').append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
         + '<div class="portlet light ">'

         + '<div class="portlet-title">'
             + '  <div class="caption caption-md">'
                 + '  <i class="icon-bar-chart font-dark hide"></i>'
                   + '  <span class="caption-subject font-blue-steel uppercase bold">Distributor Detailed Sales</span>'
                 + ' </div>'
                  + '  </div>'

                   + ' <div id="bricksaleunitchart"></div>'


                 + '  </div>'
                  + '  </div>');

    $.each(msg, function (i, option) {
        data.push({
            name: option.DistributorName,
            data: [parseFloat(option.Total)]
        });
    });

    //  $(function () {
    Highcharts.chart('bricksaleunitchart', {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 0,
                depth: 100
                //enabled: true,
                //alpha: 15,
                //beta: 15,
                //viewDistance: 25,
                //depth: 40
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

                depth: 40
                //depth: 25
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
    // });

}


var RegionBrickWisedata = function () {
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/RegionBrickWise",
        contentType: "application/json; charset=utf-8",//string date, string Level3, string Level4, string Level5, string Level6, string EmployeeId
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessGetRegionBrickWiseData,
        error: onError,
        cache: false,
        asyn: false
    });
}

var onSuccessGetRegionBrickWiseData = function (response) {
    var msg = $.parseJSON(response.d);
    var Zone = [];

    $.each(msg, function (i, option) {

        Zone.push(option.Zone);

    });

    $('#productsalescharts').empty();
    var unique = Zone.filter(function (itm, i, teamnames) {
        return i == teamnames.indexOf(itm);
    });
    for (var a = 0; a < unique.length; a++) {
        var productdata = [];

        $.each(msg, function (i, option) {
            if (option.Zone == unique[a]) {
                productdata.push({
                    name: option.BrickName,
                    y: parseFloat(option.Total)
                });
            }

        });

        $('#productsalescharts').append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
          + '<div class="portlet light ">'

          + '<div class="portlet-title">'
              + '  <div class="caption caption-md">'
                  + '  <i class="icon-bar-chart font-dark hide"></i>'
                    + '  <span class="caption-subject font-blue-steel uppercase bold">' + unique[a] + '</span>'
                  + ' </div>'
                   + '  </div>'

                    + ' <div id="' + unique[a].replace(/ +/g, "") + 'chart"></div>'


                  + '  </div>'
                   + '  </div>');

        //$('#productsalescharts').append('<div class="col-md-4"><div class="panel panel-heading" style="background-color: #338dc8"><span class="text-center" style="color:white;text-align:center;font-weight:800">' + unique[a] + ' Sales Chart </span>'
        //        + '</div> <div id="' + unique[a].replace(/ +/g, "") + 'chart"> </div> </div>');

        var newid = '#' + unique[a].replace(/ +/g, "") + 'chart';
        onsuccessRegionbrikPiechart(newid, unique[a], productdata);
    }

}

var onsuccessRegionbrikPiechart = function (id, title, data) {
    $(function () {

        $(id).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
                //   pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {

                pie: {
                    //innerSize: 50,
                    //depth: 45,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                    },
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        distance: -50,
                        filter: {
                            property: 'percentage',
                            operator: '>',
                            value: 4
                        }
                    }
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

//----------------------sp_ZoneWiseBrickSale

var ZoneBrickWisedata = function () {
    //"{'date':'" + $('#txtDate').val() + "','Level3':'" + $('#ddl1').val() + "','Level4':'" + $('#ddl2').val() + "','Level5':'" + $('#ddl3').val() + "','Level6':'" + $('#ddl4').val() + "','EmployeeId':'null'}",
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/ZoneBrickWise",
        contentType: "application/json; charset=utf-8",//string date, string Level3, string Level4, string Level5, string Level6, string EmployeeId
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessGetZonenBrickWiseData,
        error: onError,
        cache: false,
        asyn: false
    });
}

var onSuccessGetZonenBrickWiseData = function (response) {
    var msg = $.parseJSON(response.d);
    var Territory = [];

    $.each(msg, function (i, option) {
        Territory.push(option.Territory);
    });

    $('#productsalescharts').empty();
    var unique = Territory.filter(function (itm, i, teamnames) {
        return i == teamnames.indexOf(itm);
    });
    for (var a = 0; a < unique.length; a++) {
        var productdata = [];

        $.each(msg, function (i, option) {
            if (option.Territory == unique[a]) {
                productdata.push({
                    name: option.BrickName,
                    y: parseFloat(option.Total)
                });
            }

        });

        $('#productsalescharts').append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
          + '<div class="portlet light ">'

          + '<div class="portlet-title">'
              + '  <div class="caption caption-md">'
                  + '  <i class="icon-bar-chart font-dark hide"></i>'
                    + '  <span class="caption-subject font-blue-steel uppercase bold">' + unique[a] + '</span>'
                  + ' </div>'
                   + '  </div>'

                    + ' <div id="' + unique[a].replace(/ +/g, "") + 'chart"></div>'


                  + '  </div>'
                   + '  </div>');

        //$('#productsalescharts').append('<div class="col-md-4"><div class="panel panel-heading" style="background-color: #338dc8"><span class="text-center" style="color:white;text-align:center;font-weight:800">' + unique[a] + ' Sales Chart </span>'
        //        + '</div> <div id="' + unique[a].replace(/ +/g, "") + 'chart"> </div> </div>');

        var newid = '#' + unique[a].replace(/ +/g, "") + 'chart';
        onsuccessZonebrikPiechart(newid, unique[a], productdata);
    }

}

var onsuccessZonebrikPiechart = function (id, title, data) {
    $(function () {

        $(id).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
                //   pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                //pie: {
                //    allowPointSelect: true,
                //    cursor: 'pointer',
                //    dataLabels: {
                //        enabled: true,
                //        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                //        style: {
                //            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                //        }
                //    }
                //}
                pie: {
                    //innerSize: 50,
                    //depth: 45,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                    },
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        distance: -50,
                        filter: {
                            property: 'percentage',
                            operator: '>',
                            value: 4
                        }
                    }
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


//--------------------------Distributor Wise Sale (Territory selection )

var getdistributorwisedata = function () {

    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/DistributorWiseSale",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessGetDistributoData,
        //  beforeSend: startingAjax,
        error: onError,
        cache: false,
        asyn: false
    });
}

var onSuccessGetDistributoData = function (response) {
    var msg = [];
    // ajaxCompleted();
    if (response.d != "")
        msg = $.parseJSON(response.d);

    var data = [];
    $('#distributorbricksalescharts').empty();

    $('#distributorbricksalescharts').append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
         + '<div class="portlet light ">'

         + '<div class="portlet-title">'
             + '  <div class="caption caption-md">'
                 + '  <i class="icon-bar-chart font-dark hide"></i>'
                   + '  <span class="caption-subject font-blue-steel uppercase bold">Distributor Detailed Sales</span>'
                 + ' </div>'
                  + '  </div>'

                   + ' <div id="bricksaleunitchart"></div>'


                 + '  </div>'
                  + '  </div>');


    //$('#productsalescharts').append('<div class="col-md-4"><div class="panel panel-heading" style="background-color: #338dc8">'
    //    + '<span class="text-center" style="color:white;text-align:center;font-weight:800">Distributor Detailed Sales </span></div><div id="bricksaleunitchart"></div></div>');

    $.each(msg, function (i, option) {
        data.push({
            name: option.DistributorName,
            data: [parseFloat(option.Total)]
        });
    });

    //  $(function () {
    Highcharts.chart('bricksaleunitchart', {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 0,
                depth: 100
                //enabled: true,
                //alpha: 15,
                //beta: 15,
                //viewDistance: 25,
                //depth: 40
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

                depth: 40
                //depth: 25
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
    // });

}

//----------sp_DistributorWiseBrickSale

var DistributorWiseBrickSale = function () {
    //"{'date':'" + $('#txtDate').val() + "','Level3':'" + $('#ddl1').val() + "','Level4':'" + $('#ddl2').val() + "','Level5':'" + $('#ddl3').val() + "','Level6':'" + $('#ddl4').val() + "','EmployeeId':'null'}",
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/DistributorbrickWiseSale",
        contentType: "application/json; charset=utf-8",//string date, string Level3, string Level4, string Level5, string Level6, string EmployeeId
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessGetDistributorWiseBrickSale,
        error: onError,
        cache: false,
        asyn: false
    });
}

var onSuccessGetDistributorWiseBrickSale = function (response) {
    var msg = $.parseJSON(response.d);
    var DistributorID = [];
    var DistributorName = [];

    $.each(msg, function (i, option) {

        DistributorID.push(option.DistributorId);
        DistributorName.push(option.DistributorName);

    });

    $('#productsalescharts').empty();
    var uniqueid = DistributorID.filter(function (itm, i, teamnames) {
        return i == teamnames.indexOf(itm);
    });

    var unique = DistributorName.filter(function (itm, i, teamnames) {
        return i == teamnames.indexOf(itm);
    });
    for (var a = 0; a < unique.length; a++) {
        var productdata = [];

        $.each(msg, function (i, option) {
            if (option.DistributorName == unique[a]) {
                productdata.push({
                    name: option.BrickName,
                    y: parseFloat(option.Total)
                });
            }

        });

        $('#productsalescharts').append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
        + '<div class="portlet light ">'

        + '<div class="portlet-title">'
            + '  <div class="caption caption-md">'
                + '  <i class="icon-bar-chart font-dark hide"></i>'
                  + '  <span class="caption-subject font-blue-steel uppercase bold">' + unique[a] + '</span>'
                + ' </div>'
                 + '  </div>'

                  + ' <div id="' + uniqueid[a].replace(/ +/g, "") + 'chart"></div>'


                + '  </div>'
                 + '  </div>');

        //$('#distributorbricksalescharts').append('<div class="col-md-4"><div class="panel panel-heading" style="background-color: #338dc8"><span class="text-center" style="color:white;text-align:center;font-weight:800">' + unique[a] + ' Sales Chart </span>'
        //        + '</div> <div id="' + unique[a].replace(/ +/g, "") + 'chart"> </div> </div>');

        var newid = '#' + uniqueid[a].replace(/ +/g, "") + 'chart';
        onsuccessonSuccessGetDistributorBrickSPiechart(newid, unique[a], productdata);
    }

}

var onsuccessonSuccessGetDistributorBrickSPiechart = function (id, title, data) {
    $(function () {

        $(id).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
                //   pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                //pie: {
                //    allowPointSelect: true,
                //    cursor: 'pointer',
                //    dataLabels: {
                //        enabled: true,
                //        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                //        style: {
                //            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                //        }
                //    }
                //}
                pie: {
                    //innerSize: 50,
                    //depth: 45,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                    },
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        distance: -50,
                        filter: {
                            property: 'percentage',
                            operator: '>',
                            value: 4
                        }
                    }
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

//----------------------------------client wise


var getToptenbrickdata = function () {

    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/toptenbrickWiseSale",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessGetToptenbrick,
        //  beforeSend: startingAjax,
        error: onError,
        cache: false,
        asyn: false
    });
}

var onSuccessGetToptenbrick = function (response) {
    var msg = [];
    // ajaxCompleted();
    if (response.d != "")
        msg = $.parseJSON(response.d);

    var data = [];
    $('#distributorbricksalescharts').empty();
    $('#distributorbricksalescharts').append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
       + '<div class="portlet light ">'

       + '<div class="portlet-title">'
           + '  <div class="caption caption-md">'
               + '  <i class="icon-bar-chart font-dark hide"></i>'
                 + '  <span class="caption-subject font-blue-steel uppercase bold">Product Detailed Sales </span>'
               + ' </div>'
                + '  </div>'

                 + ' <div id="bricksaleunitchart"></div>'


               + '  </div>'
                + '  </div>');

    //$('#productsalescharts').append('<div class="col-md-4"><div class="panel panel-heading" style="background-color: #338dc8">'
    //    + '<span class="text-center" style="color:white;text-align:center;font-weight:800">TOP 10 Product Detailed Sales </span></div><div id="bricksaleunitchart"></div></div>');

    $.each(msg, function (i, option) {
        data.push({
            name: option.BrickName,
            data: [parseFloat(option.Total)]
        });
    });

    //  $(function () {
    Highcharts.chart('bricksaleunitchart', {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 0,
                depth: 100
                //enabled: true,
                //alpha: 15,
                //beta: 15,
                //viewDistance: 25,
                //depth: 40
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

                depth: 40
                //depth: 25
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
    // });

}

var ClientWiseBrickSale = function () {
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/ClientbrickWiseSale", //ProductbrickWiseSale"
        contentType: "application/json; charset=utf-8",//string date, string Level3, string Level4, string Level5, string Level6, string EmployeeId
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#ddldistrib').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessGetProductWiseBrickSale,
        error: onError,
        cache: false,
        asyn: false
    });
}

var onSuccessGetProductWiseBrickSale = function (response) {
    var msg = $.parseJSON(response.d);
    var BrickID = [];
    var BrickName = [];

    $.each(msg, function (i, option) {
        BrickID.push(option.BrickId);
        BrickName.push(option.BrickName);

    });

    $('#productsalescharts').empty();
    var uniqueid = BrickID.filter(function (itm, i, teamnames) {
        return i == teamnames.indexOf(itm);
    });

    var unique = BrickName.filter(function (itm, i, teamnames) {
        return i == teamnames.indexOf(itm);
    });
    for (var a = 0; a < unique.length; a++) {
        var productdata = [];

        $.each(msg, function (i, option) {
            if (option.BrickName == unique[a]) {//BrickId
                productdata.push({
                    name: option.ClientName,
                    y: parseFloat(option.Total)
                });
            }

        });

        $('#productsalescharts').append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
     + '<div class="portlet light ">'

     + '<div class="portlet-title">'
         + '  <div class="caption caption-md">'
             + '  <i class="icon-bar-chart font-dark hide"></i>'
               + '  <span class="caption-subject font-blue-steel uppercase bold">' + unique[a] + ' Sales Chart </span>'
             + ' </div>'
              + '  </div>'

               + ' <div id="' + uniqueid[a].replace(/ +/g, "") + 'chart"></div>'


             + '  </div>'
              + '  </div>');

        //$('#productsalescharts').append('<div class="col-md-4"><div class="panel panel-heading" style="background-color: #338dc8"><span class="text-center" style="color:white;text-align:center;font-weight:800">' + unique[a] + ' Sales Chart </span>'
        //        + '</div> <div id="' + uniqueid[a].replace(/ +/g, "") + 'chart"> </div> </div>');

        var newid = '#' + uniqueid[a].replace(/ +/g, "") + 'chart';
        onsuccessonSuccessonPiechart(newid, unique[a], productdata);
    }

}

var onsuccessonSuccessonPiechart = function (id, title, data) {
    $(function () {

        $(id).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
                //   pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {

                pie: {
                    //innerSize: 50,
                    //depth: 45,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                    },
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        distance: -50,
                        filter: {
                            property: 'percentage',
                            operator: '>',
                            value: 4
                        }
                    }
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


//----------------------------------client Producct wise

var getToptenProductdata = function () {

    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/ProductWiseSale",
        contentType: "application/json; charset=utf-8",
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessGetToptenProduct,
        //  beforeSend: startingAjax,
        error: onError,
        cache: false,
        asyn: false
    });
}

var onSuccessGetToptenProduct = function (response) {
    var msg = [];
    // ajaxCompleted();
    if (response.d != "")
        msg = $.parseJSON(response.d);

    var data = [];
    $('#distributorbricksalescharts').empty();
    $('#distributorbricksalescharts').append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
       + '<div class="portlet light ">'

       + '<div class="portlet-title">'
           + '  <div class="caption caption-md">'
               + '  <i class="icon-bar-chart font-dark hide"></i>'
                 + '  <span class="caption-subject font-blue-steel uppercase bold">Product Detailed Sales </span>'
               + ' </div>'
                + '  </div>'

                 + ' <div id="bricksaleunitchart"></div>'


               + '  </div>'
                + '  </div>');

    //$('#productsalescharts').append('<div class="col-md-4"><div class="panel panel-heading" style="background-color: #338dc8">'
    //    + '<span class="text-center" style="color:white;text-align:center;font-weight:800">TOP 10 Product Detailed Sales </span></div><div id="bricksaleunitchart"></div></div>');

    $.each(msg, function (i, option) {
        data.push({
            name: option.ProductName,
            data: [parseFloat(option.Total)]
        });
    });

    //  $(function () {
    Highcharts.chart('bricksaleunitchart', {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 0,
                depth: 100
                //enabled: true,
                //alpha: 15,
                //beta: 15,
                //viewDistance: 25,
                //depth: 40
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

                depth: 40
                //depth: 25
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
    // });

}
//AllProductWiseSale

var ClientproducWiseBrickSale = function () {
    $.ajax({
        type: "POST",
        url: "NewSalesdashboard.asmx/AllProductWiseSale", //ProductbrickWiseSale"
        contentType: "application/json; charset=utf-8",//string date, string Level3, string Level4, string Level5, string Level6, string EmployeeId
        data: "{'date':'" + $('#txtDate').val() + "','Level1':'" + $('#L1').val() + "','Level2':'" + $('#L2').val() + "','Level3':'" + $('#L3').val() + "','Level4':'" + $('#L4').val() + "','Level5':'" + $('#L5').val() + "','Level6':'" + $('#L6').val() + "','DistributorID':'" + $('#L7').val() + "','BrickID':'" + $('#L8').val() + "','EmployeeId':'0','ProductId':'" + $('#L9').val() + "','SkuId':'" + $('#L10').val() + "'}",
        success: onSuccessGetClientproducWiseBrickSale,
        error: onError,
        cache: false,
        asyn: false
    });
}

var onSuccessGetClientproducWiseBrickSale = function (response) {
    var msg = $.parseJSON(response.d);
    var ClientID = [];
    var ClientName = [];

    $.each(msg, function (i, option) {
        ClientID.push(option.ClientID);
        ClientName.push(option.ClientName);

    });

    $('#productsalescharts').empty();
    var uniqueid = ClientID.filter(function (itm, i, teamnames) {
        return i == teamnames.indexOf(itm);
    });

    var unique = ClientName.filter(function (itm, i, teamnames) {
        return i == teamnames.indexOf(itm);
    });
    for (var a = 0; a < unique.length; a++) {
        var productdata = [];

        $.each(msg, function (i, option) {
            if (option.ClientName == unique[a]) {//BrickId
                productdata.push({
                    name: option.ProductName,
                    y: parseFloat(option.Total)
                });
            }

        });

        $('#productsalescharts').append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'
                        + '<div class="portlet light ">'
                        + '<div class="portlet-title">'
                        + '  <div class="caption caption-md">'
                        + '  <i class="icon-bar-chart font-dark hide"></i>'
                        + '  <span class="caption-subject font-blue-steel uppercase bold">' + unique[a] + ' Sales Chart </span>'
                        + ' </div>'
                        + '  </div>'
                        + ' <div id="' + uniqueid[a].replace(/ +/g, "") + 'chart"></div>'
                        + '  </div>'
                        + '  </div>');

        //$('#productsalescharts').append('<div class="col-md-4"><div class="panel panel-heading" style="background-color: #338dc8"><span class="text-center" style="color:white;text-align:center;font-weight:800">' + unique[a] + ' Sales Chart </span>'
        //        + '</div> <div id="' + uniqueid[a].replace(/ +/g, "") + 'chart"> </div> </div>');

        var newid = '#' + uniqueid[a].replace(/ +/g, "") + 'chart';
        onsuccessonSuccessonclpPiechart(newid, unique[a], productdata);
    }

}

var onsuccessonSuccessonclpPiechart = function (id, title, data) {
    $(function () {

        $(id).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
                //   pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {

                pie: {
                    //innerSize: 50,
                    //depth: 45,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                    },
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        distance: -50,
                        filter: {
                            property: 'percentage',
                            operator: '>',
                            value: 4
                        }
                    }
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


















function OnChangeddl1() {
    levelValue = $('#ddl1').val();
    myData = "{'level1Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            // url: "../Reports/datascreen.asmx/GetEmployee",
            url: "../Reports/NewReports.asmx/fillGH_L1",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl1,
            error: onError,
            //beforeSend: startingAjax,
            //complete: ajaxCompleted,
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
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        $("#ddl2").append("<option value='-1'>Select National Manager</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddl2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }
}

function OnChangeddl2() {

    levelValue = $('#ddl2').val();
    myData = "{'level2Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            // url: "../Reports/datascreen.asmx/GetEmployee",
            url: "../Reports/NewReports.asmx/fillGH_L2",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl2,
            error: onError,
            //beforeSend: startingAjax,
            //complete: ajaxCompleted,
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

        $("#ddl3").append("<option value='-1'>Select Regional Manager</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddl3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }

}

function OnChangeddl3() {

    levelValue = $('#ddl3').val();
    myData = "{'level3Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            //  url: "../Reports/datascreen.asmx/GetEmployee",
            url: "../Reports/NewReports.asmx/fillGH_L3",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl3,
            error: onError,
            cache: false
        });
    }
    else {
        document.getElementById('ddl4').innerHTML = "";
    }


}
function onSuccessFillddl3(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        $("#ddl4").append("<option value='-1'>Select Zonal Manager</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddl4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }

}

function OnChangeddl4() {

    levelValue = $('#ddl4').val();
    myData = "{'level4Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            //  url: "../Reports/datascreen.asmx/GetEmployee",
            url: "../Reports/NewReports.asmx/fillGH_L4",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl4,
            error: onError,
            cache: false
        });
    }
    else {
        document.getElementById('ddl5').innerHTML = "";
    }


}
function onSuccessFillddl4(data, status) {

    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        $("#ddl5").append("<option value='-1'>Select Zonal Manager</option>");
        $.each(data.d, function (i, tweet) {
            $("#ddl5").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });

    }

}

function OnChangeddl5() {

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

    if (data.d != "") {

        $("#ddl6").append("<option value='-1'>Select SPO</option>");
        $.each(data.d, function (i, tweet) {
            $("#ddl6").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });

    }

}









function OnChangeProduct() {
    levelValue = $('#ddlPro').val();
 

    //if (levelValue != -1) {
        debugger;
        $.ajax({
            type: "POST",
            // url: "../Reports/datascreen.asmx/GetEmployee",
            url: "NewSalesdashboard.asmx/GetProducts",
           // data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddlPro,
            error: onError,
            //beforeSend: startingAjax,
            //complete: ajaxCompleted,
            cache: false
        });


    //} else {

       
    //}

}
function onSuccessFillddlPro(data, status) {
    msg = $.parseJSON(data.d);
    $("#ddlPro").empty();
    if (msg != "") {

        $("#ddlPro").append("<option value='-1'>Select Product</option>");

        $.each(msg, function (i, tweet) {
            $("#ddlPro").append("<option value='" + tweet.ID + "'>" + tweet.Name + "</option>");
        });
    }
}


function OnChangeProductSku() {
    levelValue = $('#ddlPro').val();

    myData = "{'ProdId':'" + levelValue + "' }";
    if (levelValue != -1) {
    debugger;
    $.ajax({
        type: "POST",
        // url: "../Reports/datascreen.asmx/GetEmployee",
        url: "NewSalesdashboard.asmx/GetProductsSku",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessFillddlProSku,
        error: onError,
        //beforeSend: startingAjax,
        //complete: ajaxCompleted,
        cache: false
    });


    } else {

        $("#ddlProsku").val(-1);
    }

}
function onSuccessFillddlProSku(data, status) {
    msg = $.parseJSON(data.d);
    $("#ddlProsku").empty();
    if (msg != "") {

        $("#ddlProsku").append("<option value='-1'>Select Product Sku</option>");

        $.each(msg, function (i, tweet) {
            $("#ddlProsku").append("<option value='" + tweet.ID + "'>" + tweet.Name + "</option>");
        });
    }
}
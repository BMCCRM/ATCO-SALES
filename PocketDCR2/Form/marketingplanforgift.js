var id;
function pageLoad() {
    var cdt = new Date();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var current_mint = cdt.getMinutes();
    var current_hrs = cdt.getHours();
    var current_date = cdt.getDate();

    var current_month = cdt.getMonth() + 1;
    var month_name = monthNames[current_month - 1];
    var current_year = cdt.getFullYear();

    //$('#txtDate').val(month_name + '-' + current_year);

    if (current_month == 1) {

        $('#date1').val("01/01/" + current_year);
        $('#date2').val("01/31/" + current_year);
        $('#Labq').text("January " + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 2) {
        $('#date1').val("02/01/" + current_year);
        $('#date2').val("02/29/" + current_year);
        $('#Labq').text("February " + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 3) {

        $('#date1').val("03/01/" + current_year);
        $('#date2').val("03/31/" + current_year);
        $('#Labq').text("March " + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 4) {
        $('#date1').val("04/01/" + current_year);
        $('#date2').val("04/30/" + current_year);
        $('#Labq').text("April " + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 5) {

        $('#date1').val("05/01/" + current_year);
        $('#date2').val("05/31/" + current_year);
        $('#Labq').text("May " + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 6) {
        $('#date1').val("06/01/" + current_year);
        $('#date2').val("06/30/" + current_year);
        $('#Labq').text("June " + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 7) {
        $('#date1').val("07/01/" + current_year);
        $('#date2').val("07/31/" + current_year);
        $('#Labq').text("July " + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    } else if (current_month == 8) {

        $('#date1').val("08/01/" + current_year);
        $('#date2').val("08/31/" + current_year);
        $('#Labq').text("August " + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 9) {
        $('#date1').val("09/01/" + current_year);
        $('#date2').val("09/30/" + current_year);
        $('#Labq').text("September " + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 10) {

        $('#date1').val("10/01/" + current_year);
        $('#date2').val("10/31/" + current_year);
        $('#Labq').text("October " + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 11) {
        $('#date1').val("11/01/" + current_year);
        $('#date2').val("11/30/" + current_year);
        $('#Labq').text("November " + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 12) {
        $('#date1').val("12/01/" + current_year);
        $('#date2').val("12/31/" + current_year);
        $('#Labq').text("December " + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    //   IsValidUser();
    //Ahmer
    $('#dG1').change(OnChangeddG1);
    $('#dG2').change(OnChangeddG2);
    $('#dG3').change(OnChangeddG3);
    $('#dG4').change(OnChangeddG4);

    $('#btnSearch').click(btnSearch);
    $('#btnSetbalance').click(btnSetbalance);


    HideHierarchy();
    // RetrieveAppConfig();
    GetCurrentUser();
    //  FillGh();
    // FillDropDownList();

    if (CurrentUserRole == "admin") {
        //$('#btnSetbalance').visible(false);
    }
    else {

        document.getElementById("btnSetbalance").style.display = "none";
    }

    if (CurrentUserRole == "rl6") {
        level3 = level3Id;
        level4 = level4Id;
        level5 = level5Id;
        level6 = level6Id;
        GetDataInGrid();
    }
}

//var CurrentUserRole;
function OnChangeddG1() {

    levelValue = $('#dG1').val();
    myData = "{'level3Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L3",
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
        // $('#ddl1').val(-1)
        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";


        //document.getElementById('ddl2').innerHTML = "";
        //document.getElementById('ddl3').innerHTML = "";
        //document.getElementById('ddl4').innerHTML = "";

        //document.getElementById('ddlDR').innerHTML = "";

    }

    GetDataInGrid();

}
function OnChangeddG2() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    levelValue = $('#dG2').val();
    myData = "{'level4Id':'" + levelValue + "' }";
    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L4",
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
        //   $('#ddl2').val(-1)
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        //document.getElementById('ddl3').innerHTML = "";
        //document.getElementById('ddl4').innerHTML = "";
        //document.getElementById('ddlDR').innerHTML = "";

    }
    GetDataInGrid();
    $('#dialog').jqmHide();
}
function OnChangeddG3() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#dG3').val();
    myData = "{'level5Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L5",
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

        G3c();
    }
    else {
        //  $('#ddl3').val(-1)

        document.getElementById('dG4').innerHTML = "";

        //document.getElementById('ddl4').innerHTML = "";
        //document.getElementById('ddlDR').innerHTML = "";

    }
    GetDataInGrid();
    $('#dialog').jqmHide();
}
function OnChangeddG4() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    G3d();

    // FillMRDr();
    GetDataInGrid();
    $('#dialog').jqmHide();
}

function onSuccessG1(data, status) {
    document.getElementById('dG2').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label6').text();;


    $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });


}
function onSuccessG2(data, status) {
    //    document.getElementById('ddl3').innerHTML = "";
    //    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label7').text();

    $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });

}
function onSuccessG3(data, status) {
    // document.getElementById('ddl4').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label8').text();

    $("#dG4").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });

}
function G3a() {

    //setvalue();

    if (CurrentUserRole == 'admin') {

        // $('#h2').val($('#dG1').val());
        level3 = $('#dG1').val();
        level4 = 0;
        level5 = 0;
        level6 = 0;
        // myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl3') {

        // $('#h2').val(level3Id);
        //  $('#h3').val($('#dG1').val());

        level3 = level3Id;
        level4 = $('#dG1').val();
        level5 = 0;
        level6 = 0;
        // myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl4') {

        //$('#h2').val(level3Id);
        //$('#h3').val(level4Id);
        //$('#h4').val($('#dG1').val());


        level3 = level3Id;
        level4 = level4Id;
        level5 = $('#dG1').val();
        level6 = 0;
        // myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";



    }
    if (CurrentUserRole == 'rl5') {

        //$('#h2').val(level3Id);
        //$('#h3').val(level4Id);
        //$('#h4').val(level5Id);
        //$('#h5').val($('#dG1').val());

        level3 = level3Id;
        level4 = level4Id;
        level5 = level5Id;
        level6 = $('#dG1').val();
        // myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
    }

}
function G3b() {
    //setvalue();
    if (CurrentUserRole == 'admin') {
        //$('#h2').val($('#dG1').val());
        //$('#h3').val($('#dG2').val());

        level3 = $('#dG1').val();
        level4 = $('#dG2').val();
        level5 = 0;
        level6 = 0;
        // myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl3') {

        //$('#h2').val(level3Id);
        //$('#h3').val($('#dG1').val());
        //$('#h4').val($('#dG2').val());

        level3 = level3Id;
        level4 = $('#dG1').val();
        level5 = $('#dG2').val();
        level6 = 0;
        //myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl4') {

        //$('#h2').val(level3Id);
        //$('#h3').val(level4Id);
        //$('#h4').val($('#dG1').val());
        //$('#h5').val($('#dG2').val());

        level3 = level3Id;
        level4 = level4Id;
        level5 = $('#dG1').val();
        level6 = $('#dG2').val();
        // myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";



    }


}
function G3c() {
    // setvalue();
    if (CurrentUserRole == 'admin') {
        //$('#h2').val($('#dG1').val());
        //$('#h3').val($('#dG2').val());
        //$('#h4').val($('#dG3').val());


        level3 = $('#dG1').val();
        level4 = $('#dG2').val();
        level5 = $('#dG3').val();
        level6 = 0;
        //  myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl3') {

        //$('#h2').val(level3Id);
        //$('#h3').val($('#dG1').val());
        //$('#h4').val($('#dG2').val());
        //$('#h5').val($('#dG3').val());


        level3 = level3Id;
        level4 = $('#dG1').val();
        level5 = $('#dG2').val();
        level6 = $('#dG3').val();

        // myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
    }


}
function G3d() {
    //setvalue();
    level3 = $('#dG1').val();
    level4 = $('#dG2').val();
    level5 = $('#dG3').val();
    level6 = $('#dG4').val();

    //$('#h2').val($('#dG1').val());
    //$('#h3').val($('#dG2').val());
    //$('#h4').val($('#dG3').val());
    //$('#h5').val($('#dG4').val());


    // myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";

}

function FillDropDownList() {
    //alert("asd");
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
        async: false,
        cache: false
    });
}
function onSuccessFillDropDownList(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (glbVarLevelName == "Level3") {

            //document.getElementById('ddl1').innerHTML = "";
            //document.getElementById('ddl2').innerHTML = "";
            //document.getElementById('ddl3').innerHTML = "";
            //document.getElementById('ddl4').innerHTML = "";

            value = '-1';

            if (CurrentUserRole == 'admin') {
                name = 'Select ' + HierarchyLevel3;
                //$('#Label1').append(HierarchyLevel3 + " " + "Manager ");
                //$('#Label2').append(HierarchyLevel4 + " " + "Manager ");
                //$('#Label3').append(HierarchyLevel5 + " " + "Manager ");
                //$('#Label4').append(HierarchyLevel6 + " " + "TMs");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl3') {
                name = 'Select ' + HierarchyLevel4;

                //$('#Label1').append(HierarchyLevel4 + " " + "Manager ");
                //$('#Label2').append(HierarchyLevel5 + " " + "Manager ");
                //$('#Label3').append(HierarchyLevel6 + " " + "TMs ");


                $('#Label5').append(HierarchyLevel4 + " " + "Level ");
                $('#Label6').append(HierarchyLevel5 + " " + "Level ");
                $('#Label7').append(HierarchyLevel6 + " " + "Level ");



            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                //$('#Label1').append(HierarchyLevel5 + " " + "Manager ");
                //$('#Label2').append(HierarchyLevel6 + " " + "TMs ");

                $('#Label5').append(HierarchyLevel5 + " " + "Level ");
                $('#Label6').append(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                //  $('#Label1').append(HierarchyLevel6 + " " + "TMs");
                $('#Label5').append(HierarchyLevel6 + " " + "Level ");
            }


            //name = 'Select ' + $('#Label1').text();
            //$("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

            //$.each(jsonObj, function (i, tweet) {
            //    $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            //});
        }




        FillGh();
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

    document.getElementById('dG1').innerHTML = "";
    //document.getElementById('dG2').innerHTML = "";
    //document.getElementById('dG3').innerHTML = "";
    //document.getElementById('dG4').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label5').text();

    $("#dG1").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
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
        //  GetCurrentUserLoginID(0);
    }
    else {
        window.location = "/Form/Login.aspx";
    }

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


// Enable / Disable DropDownLists Filter With Hierarchy
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

function HideHierarchy() {

    //$('#col1').hide();
    //$('#col2').hide();
    //$('#col3').hide();
    //$('#col4').hide();
    //$('#col5').hide();
    //$('#col6').hide();

    //$('#col11').hide();
    //$('#col22').hide();
    //$('#col33').hide();
    //$('#col44').hide();
    //$('#col55').hide();
    //$('#col66').hide();

    $('#g1').hide();
    $('#g2').hide();
    $('#g3').hide();
    $('#g4').hide();


}

function EnableHierarchyViaLevel() {

    if (glbVarLevelName == "Level3") {

        if (CurrentUserRole == 'admin') {

            //$('#col1').show();
            //$('#col2').show();
            //$('#col3').show();
            //$('#col4').show();
            //$('#col11').show();
            //$('#col22').show();
            //$('#col33').show();
            //$('#col44').show();

            $('#g1').show();
            $('#g2').show();
            $('#g3').show();
            $('#g4').show();


        }
        if (CurrentUserRole == 'rl3') {
            //$('#col1').show();
            //$('#col2').show();
            //$('#col3').show();
            //$('#col11').show();
            //$('#col22').show();
            //$('#col33').show();

            $('#g1').show();
            $('#g2').show();
            $('#g3').show();


        }
        if (CurrentUserRole == 'rl4') {
            //$('#col1').show();
            //$('#col2').show();
            //$('#col11').show();
            //$('#col22').show();

            $('#g1').show();
            $('#g2').show();



        }
        if (CurrentUserRole == 'rl5') {
            //$('#col1').show();
            //$('#col11').show();

            $('#g1').show();

        }
        GetHierarchySelection();
        FillDropDownList();
    }
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

            //            if (glbVarLevelName == "Level3") {

            level3Id = jsonObj[0].LevelId3;
            level4Id = jsonObj[0].LevelId4;
            level5Id = jsonObj[0].LevelId5;
            level6Id = jsonObj[0].LevelId6;
            //  }
        }
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
    //    $('#dialog').jqm({ modal: true });
    //    $('#dialog').jqm();
    //    $('#dialog').jqmShow();
}
function ajaxCompleted() {

    // $('#dialog') ();
    //$('.loading').fadeOut('slow');
    //$('.loading_bgrd').fadeOut('slow');
    // $('#imgLoading').hide();
}


//Get Data Of Hirarchy level Product IN Grid
function GetDataInGrid() {

    try {

        var date1 = $('#date1').val();
        var date2 = $('#date2').val();
        //var level3 = $('#dG1').val();
        //var level4 = $('#dG2').val();
        //var level5 = $('#dG3').val();
        //var level6 = $('#dG4').val();

        //if (level3 == '-1' || level3 == null) {
        //    level3 = 0;
        //}
        //if (level4 == '-1' || level4 == null) {
        //    level4 = 0;
        //}
        //if (level5 == '-1' || level5 == null) {
        //    level5 = 0;
        //}
        //if (level6 == '-1' || level6 == null) {
        //    level6 = 0;
        //}

        //string level3,string level4,string level5,string level6, string txtDate1, string txtDate2
        //myData = "{'level3':'" + (level3 == "-1") ? 0 : level3 + "','level4':'" + (level4 == "-1") ? 0 : level4 + "','level5':'" + (level5 == "-1") ? 0 : level5 + "','level6':'" + (level6 == "-1") ? 0 : level6 + "','txtDate1':'" + date1 + "','txtDate2':'" + date2 + "'}";
        myData = "{'level3':'" + (($('#dG1').val() == "-1") ? "0" : level3) + "','level4':'" + (($('#dG2').val() == "-1") ? 0 : level4) + "','level5':'" + (($('#dG3').val() == "-1") ? 0 : level5) + "','level6':'" + (($('#dG4').val() == "-1") ? 0 : level6) + "','txtDate1':'" + date1 + "','txtDate2':'" + date2 + "'}";

        $.ajax({
            type: "POST",
            url: "marketingplanforgift.asmx/GetGift",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            success: onSuccessGridFill,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });
    }
    catch (e) {
        Console.log(e.description);
    }
    //  $('#dialog').jqmHide();

}
function onSuccessGridFill(data, status) {

    if (data.d != 'No') {
        jsonObj = jsonParse(data.d);
        var tablestring = "<table id='datatables' class='column-options' ><thead>" +
                      "<tr >" +
                      //"<th>SKU ID</th>" +
                      "<th >  Gift </th>" +
                       "<th > Gift Issue </th>" +
                       "<th  > Previous Balance </th>" +
       "<th > Total </th>" +
       "<th > Gift Distributed </th>" +
       "<th > Current Month Balance </th>";
        if (CurrentUserRole == "admin") {
            tablestring += "<th > Enter Received Quantity </th><th > Action </th></tr>" +
            "</thead>" +
            "<tbody id='values'>";
        }
        if (CurrentUserRole == 'rl3') {
            tablestring += "</tr>" +
            "</thead>" +
            "<tbody id='values'>"
        }
        if (CurrentUserRole == 'rl4') {
            tablestring += "</tr>" +
            "</thead>" +
            "<tbody id='values'>"
        }
        if (CurrentUserRole == 'rl5') {
            tablestring += "</tr>" +
            "</thead>" +
            "<tbody id='values'>"
        }
        if (CurrentUserRole == 'rl6') {
            tablestring += "</tr>" +
            "</thead>" +
            "<tbody id='values'>"
        }
        $("#gridgift").empty();
        $("#gridgift").append(tablestring);

        if (CurrentUserRole == "admin") {

            var odeven = '';

            for (var i = 0; i < jsonObj.length ; i++) {

                if (i % 2 == 0) {
                    odeven = "<tr class='odd'>";
                }
                else {
                    odeven = "<tr>";
                }

                $('#values').append($(odeven +
                    //"<td class='ob_text'>" + jsonObj[i].SkuId + "</td>" +
                    //"<td  >" + jsonObj[i].SkuName + "</td>" +
                    "<td  >" + jsonObj[i].ProductName + "</td>" +
                     "<td  >" + jsonObj[i].Qty + "</td>" +
                      "<td >" + jsonObj[i].pre + "</td>" +
                       "<td >" + jsonObj[i].Total + "</td>" +
                        "<td  >" + jsonObj[i].Balance + "</td>" +
                        "<td >" + jsonObj[i].balancet + "</td>" +
                  //"<td  >" + "<input type='text' id='ProQty" + jsonObj[i].SkuId + "' name='ProQty' >" + "</td>" +
                  "<td  >" + "<input type='text' id='ProQty" + jsonObj[i].ProductId + "' name='ProQty' >" + "</td>" +
                  //"<td  >" + ' <a href="#" class="buttonlink" onclick="oGrid_Edit(' + jsonObj[i].SkuId + ');return false">Save/Update</a> ' + "</td>" +
                  "<td  >" + ' <a href="#" class="buttonlink" onclick="oGrid_Edit(' + jsonObj[i].ProductId + ');return false">Save/Update</a> ' + "</td>" +

                "</tr></tbody></table>"));
            }
        }
        if (CurrentUserRole == 'rl3') {
            for (var i = 0; i < jsonObj.length ; i++) {
                var odeven = '';
                if (i % 2 == 0) {
                    odeven = "<tr class='odd'>";
                }
                else {
                    odeven = "<tr>";
                }
                $('#values').append($(odeven +
                    //"<td>" + jsonObj[i].SkuId + "</td>" +
                    //"<td  >" + jsonObj[i].SkuName + "</td>" +
                    "<td  >" + jsonObj[i].ProductName + "</td>" +
                     "<td >" + jsonObj[i].Qty + "</td>" +
                 "<td  >" + jsonObj[i].pre + "</td>" +
                       "<td >" + jsonObj[i].Total + "</td>" +
                        "<td  >" + jsonObj[i].Balance + "</td>" +
                        "<td  >" + jsonObj[i].balancet + "</td>" +


                "</tr></tbody></table>"));
            }
        }
        if (CurrentUserRole == 'rl4') {
            for (var i = 0; i < jsonObj.length ; i++) {
                var odeven = '';
                if (i % 2 == 0) {
                    odeven = "<tr class='odd'>";
                }
                else {
                    odeven = "<tr>";
                }
                $('#values').append($(odeven +
                    //"<td>" + jsonObj[i].SkuId + "</td>" +
                    //"<td  >" + jsonObj[i].SkuName + "</td>" +
                    "<td  >" + jsonObj[i].ProductName + "</td>" +
                     "<td >" + jsonObj[i].Qty + "</td>" +
                 "<td  >" + jsonObj[i].pre + "</td>" +
                       "<td >" + jsonObj[i].Total + "</td>" +
                        "<td  >" + jsonObj[i].Balance + "</td>" +
                        "<td  >" + jsonObj[i].balancet + "</td>" +


                "</tr></tbody></table>"));
            }
        }
        if (CurrentUserRole == 'rl5') {
            for (var i = 0; i < jsonObj.length ; i++) {
                var odeven = '';
                if (i % 2 == 0) {
                    odeven = "<tr class='odd'>";
                }
                else {
                    odeven = "<tr>";
                }
                $('#values').append($(odeven +
                    //"<td>" + jsonObj[i].SkuId + "</td>" +
                    //"<td  >" + jsonObj[i].SkuName + "</td>" +
                    "<td  >" + jsonObj[i].ProductName + "</td>" +
                     "<td >" + jsonObj[i].Qty + "</td>" +
                 "<td  >" + jsonObj[i].pre + "</td>" +
                       "<td >" + jsonObj[i].Total + "</td>" +
                        "<td  >" + jsonObj[i].Balance + "</td>" +
                        "<td  >" + jsonObj[i].balancet + "</td>" +


                "</tr></tbody></table>"));
            }
        }
        if (CurrentUserRole == 'rl6') {
            for (var i = 0; i < jsonObj.length ; i++) {
                var odeven = '';
                if (i % 2 == 0) {
                    odeven = "<tr class='odd'>";
                }
                else {
                    odeven = "<tr>";
                }
                $('#values').append($(odeven +
                    //"<td>" + jsonObj[i].SkuId + "</td>" +
                    //"<td  >" + jsonObj[i].SkuName + "</td>" +
                    "<td  >" + jsonObj[i].ProductName + "</td>" +
                     "<td >" + jsonObj[i].Qty + "</td>" +
                 "<td  >" + jsonObj[i].pre + "</td>" +
                       "<td >" + jsonObj[i].Total + "</td>" +
                        "<td  >" + jsonObj[i].Balance + "</td>" +
                        "<td  >" + jsonObj[i].balancet + "</td>" +


                "</tr></tbody></table>"));
            }
        }
    }
    else {
        var tablestring = "<table id='datatables' class='column-options' ><thead>" +
        "<tr >" +
        //"<th>SKU ID</th>" +
        "<th > Gift </th>" +
         "<th > Gift Issue </th>" +
         "<th  > Previous Balance </th>" +
            "<th > Total </th>" +
            "<th > Gift Distributed </th>" +
            "<th > Current Month Balance </th>" +
        "</thead>" +
            "<tbody id='values'>";
        $("#gridgift").empty();
        $("#gridgift").append(tablestring);
        $('#dialog').jqmHide();
        alert('Data Not Found');
    }


    // table.column(0).visible(true);
    //$('#datatabl').dataTable({
    // "sPaginationType": "full_numbers"
    //});
}

function btnSearch() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    var getdate = $('#txtDate').val();
    $('#Labq').text(getdate);

    var month = getdate.split('-')[0];
    var year = getdate.split('-')[1];

    if (month == "January") {
        $('#date1').val("01/01/" + year);
        $('#date2').val("01/31/" + year);
        GetDataInGrid();
    } else if (month == "February") {
        $('#date1').val("02/01/" + year);
        $('#date2').val("02/29/" + year);
        GetDataInGrid();
    } else if (month == "March") {
        $('#date1').val("03/01/" + year);
        $('#date2').val("03/31/" + year);
        GetDataInGrid();
    } else if (month == "April") {
        $('#date1').val("04/01/" + year);
        $('#date2').val("04/30/" + year);
        GetDataInGrid();
    } else if (month == "May") {
        $('#date1').val("05/01/" + year);
        $('#date2').val("05/31/" + year);
        GetDataInGrid();
    } else if (month == "June") {
        $('#date1').val("06/01/" + year);
        $('#date2').val("06/30/" + year);
        GetDataInGrid();
    } else if (month == "July") {
        $('#date1').val("07/01/" + year);
        $('#date2').val("07/31/" + year);
        GetDataInGrid();
    } else if (month == "August") {
        $('#date1').val("08/01/" + year);
        $('#date2').val("08/31/" + year);
        GetDataInGrid();
    } else if (month == "September") {
        $('#date1').val("09/01/" + year);
        $('#date2').val("09/30/" + year);
        GetDataInGrid();
    } else if (month == "October") {
        $('#date1').val("10/01/" + year);
        $('#date2').val("10/31/" + year);
        GetDataInGrid();
    } else if (month == "November") {
        $('#date1').val("11/01/" + year);
        $('#date2').val("11/30/" + year);
        GetDataInGrid();
    } else if (month == "December") {
        $('#date1').val("12/01/" + year);
        $('#date2').val("12/31/" + year);
        GetDataInGrid();
    }

    $('#dialog').jqmHide();
}

function btnSetbalance() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    var getdate = $('#txtDate').val();
    $('#Labq').text(getdate);

    var month = getdate.split('-')[0];
    var year = getdate.split('-')[1];

    if (month == "January") {
        $('#date1').val("01/01/" + year);
        $('#date2').val("01/31/" + year);

    } else if (month == "February") {
        $('#date1').val("02/01/" + year);
        $('#date2').val("02/29/" + year);

    } else if (month == "March") {
        $('#date1').val("03/01/" + year);
        $('#date2').val("03/31/" + year);

    } else if (month == "April") {
        $('#date1').val("04/01/" + year);
        $('#date2').val("04/30/" + year);

    } else if (month == "May") {
        $('#date1').val("05/01/" + year);
        $('#date2').val("05/31/" + year);

    } else if (month == "June") {
        $('#date1').val("06/01/" + year);
        $('#date2').val("06/30/" + year);

    } else if (month == "July") {
        $('#date1').val("07/01/" + year);
        $('#date2').val("07/31/" + year);

    } else if (month == "August") {
        $('#date1').val("08/01/" + year);
        $('#date2').val("08/31/" + year);

    } else if (month == "September") {
        $('#date1').val("09/01/" + year);
        $('#date2').val("09/30/" + year);

    } else if (month == "October") {
        $('#date1').val("10/01/" + year);
        $('#date2').val("10/31/" + year);

    } else if (month == "November") {
        $('#date1').val("11/01/" + year);
        $('#date2').val("11/30/" + year);

    } else if (month == "December") {
        $('#date1').val("12/01/" + year);
        $('#date2').val("12/31/" + year);

    }

    myData = "{'level3':'" + $('#dG1').val() + "','txtDate1':'" + $('#date1').val() + "','txtDate2':'" + $('#date2').val() + "'}";
    $.ajax({
        type: "POST",
        url: "marketingplansample.asmx/Setbalance",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessSetbalance,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}
function onSuccessSetbalance(data, status) {
    if (data.d == "OK") {
        GetDataInGrid();
        $('#dialog').jqmHide();
        alert("Data Successfully Shift");
    }

}

function oGrid_Edit(sender) {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    id = sender;
    var qty = document.getElementById('ProQty' + id).value;
    if (qty == null || qty == "") {
        $('#dialog').jqmHide();
        //alert('Insert Quantity');
        alert('Please enter gift quantity');
        return false;
    }

    if (!/^[0-9]+$/.test(qty)) {
        $('#dialog').jqmHide();

        //alert("Please only enter numeric Number only! (Allowed input:0-9)");
        alert("You can only assign gift in numeric value");
        return false;
    }


    var date1 = $('#date1').val();
    var date2 = $('#date2').val();
    //var level3 = $('#dG1').val();
    //var level4 = $('#dG2').val();
    //var level5 = $('#dG3').val();
    //var level6 = $('#dG4').val();

    //if (level3 == '-1' || level3 == null) {
    //    level3 = 0;
    //}
    //if (level4 == '-1' || level4 == null) {
    //    level4 = 0;
    //}
    //if (level5 == '-1' || level5 == null) {
    //    level5 = 0;
    //}
    //if (level6 == '-1' || level6 == null) {
    //    level6 = 0;
    //}

    // myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
    myData = "{'giftid':'" + id + "','qty1':'" + qty + "','txtDate1':'" + date1 + "','txtDate2':'" + date2 + "','level3':'" + level3 + "','level4':'" + level4 + "','level5':'" + level5 + "','level6':'" + level6 + "'}";

    $.ajax({
        type: "POST",
        url: "marketingplanforgift.asmx/GiftQtyInsert",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGiftQtyInsert,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}



function onSuccessGetRecNo(data, status) {

    // string level3, string level4, string level5, string level6
    var date1 = $('#date1').val();
    var date2 = $('#date2').val();
    var level3 = $('#dG1').val();
    var level4 = $('#dG2').val();
    var level5 = $('#dG3').val();
    var level6 = $('#dG4').val();

    if (level3 == '-1' || level3 == null) {
        level3 = 0;
    }
    if (level4 == '-1' || level4 == null) {
        level4 = 0;
    }
    if (level5 == '-1' || level5 == null) {
        level5 = 0;
    }
    if (level6 == '-1' || level6 == null) {
        level6 = 0;
    }

    var qty = document.getElementById('ProQty' + id).value;

    if (data.d == "No") {
        var recno = '';
        ProductQtyInsert(id, qty, date1, date2, level3, level4, level5, level6, recno);
    }
    else {
        var recno = jsonParse(data.d);
        ProductQtyInsert(id, qty, date1, date2, level3, level4, level5, level6, recno);
    }


}
function ProductQtyInsert() {


    var qty = document.getElementById('ProQty' + id).value;

    var date1 = $('#date1').val();
    var date2 = $('#date2').val();
    var level3 = $('#dG1').val();
    var level4 = $('#dG2').val();
    var level5 = $('#dG3').val();
    var level6 = $('#dG4').val();

    if (level3 == '-1' || level3 == null) {
        level3 = 0;
    }
    if (level4 == '-1' || level4 == null) {
        level4 = 0;
    }
    if (level5 == '-1' || level5 == null) {
        level5 = 0;
    }
    if (level6 == '-1' || level6 == null) {
        level6 = 0;
    }
    myData = "{'skuid':'" + id + "','qty1':'" + qty + "','txtDate1':'" + date1 + "','txtDate2':'" + date2 + "','level3':'" + level3 + "','level4':'" + level4 + "','level5':'" + level5 + "','level6':'" + level6 + "','RecNo':'" + recno + "'}";

    $.ajax({
        type: "POST",
        url: "marketingplansample.asmx/ProductQtyInsert",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessProductQtyInsert,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}
function onSuccessGiftQtyInsert(data, status) {
    if (data.d == "OK") {
        GetDataInGrid();
        $('#dialog').jqmHide();
        //alert("Data Successfully insert");
        alert("Gift have been assigned successfully");
    }
    //else if (data.d == "NOT") {
    //    GetDataInGrid();
    //    $('#dialog').jqmHide();
    //    alert("Not Allowed Zero");
    //    return false;
    //}
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
var nationalids = [];
var regionids = [];
var nationalteams = [];
var regionteams = [];

var GlobalID=0;

function pageLoad() {
//$(document).ready(function(){
   
        IsValidUser();
        $('#ddl1').change(OnChangeddl1);
        $('#ddl2').change(OnChangeddl2);
        $('#ddl3').change(OnChangeddl3);
        $('#ddl4').change(OnChangeddl4);
        $('#ddl5').change(OnChangeddl5);
        $('#ddl6').change(OnChangeddl6);

        $('#dG1').change(OnChangeddG1);
        $('#dG2').change(OnChangeddG2);
        $('#dG3').change(OnChangeddG3);
        $('#dG4').change(OnChangeddG4);
        $('#dG5').change(OnChangeddG5);
        $('#dG6').change(OnChangeddG6);

        var cdt = new Date();
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var current_mint = cdt.getMinutes();
        var current_hrs = cdt.getHours();
        var current_date = cdt.getDate();

        if (current_date == 1) {

            var current_date2 = current_date;
        }
        else {

            var current_date2 = current_date - 1;
        }


        var current_month = cdt.getMonth();
        var current_month = current_month + 1;
        var month_name = monthNames[current_month];
        var current_year = cdt.getFullYear();
        $('#stdate').val(current_month + '/' + 01 + '/' + current_year);
        $('#enddate').val(current_month + '/' + current_date + '/' + current_year);


        // FillProductSku();
        HideHierarchy();
        //EnableHierarchyViaLevel();
        GetCurrentUser();

        $('#btnApprovedYes').click(ApprovedYes);
        $('#btnApprovedNo').click(ApprovedNo);

        $('#jqmID1, .jqmOverlay, .loading').hide();
        $('#Th77').hide();
        $('#FormStatus').hide();
     
        

}

function oGrid_Approved(sender){
    GlobalID=sender.toString();
    $('#divConfirmation').modal('show');
}
function ApprovedYes() {
    var Comment = $('#LevelComment').val();
    $.ajax({
        type: "POST",
        url: "CSRApprovalRequisition.asmx/Approvedbylevel",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"ID":"' + GlobalID + '","Comment":"' + Comment + '","EmployeeID":"' + EmployeeId + '"}',
        success: onSuccessApprovedbylevel,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}
function onSuccessApprovedbylevel(data, status) {

    if (data.d != '') {
        var jsonObj = jsonParse(data.d);
        assignvalues();
        window.location.reload();
        $('#divConfirmation').modal('hide');

    }

}

function ApprovedNo() {
    $('#divConfirmation').modal('hide');
}
//});
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
        window.location = "Login.aspx";
    }

}

function GetCurrentUser() {

    $.ajax({
        type: "POST",
        url: "CommonService.asmx/GetCurrentUser",
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
        url: "CommonService.asmx/GetCurrentUserLoginID",
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
        

        myData = "{'employeeid':'" + EmployeeId + "' }";

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/getemployeeHR",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessdefaulyHR,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });


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
        if (glbVarLevelName == "Level1") {

            HierarchyLevel1 = jsonObj[0].SettingValue;
            HierarchyLevel2 = jsonObj[1].SettingValue;

            HierarchyLevel3 = jsonObj[2].SettingValue;
            HierarchyLevel4 = jsonObj[3].SettingValue;
            HierarchyLevel5 = jsonObj[4].SettingValue;
            HierarchyLevel6 = jsonObj[5].SettingValue;
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

    //if (data.d != "") {

    //    jsonObj = jsonParse(data.d);
    //    glbVarLevelName = jsonObj[0].SettingName;

    //    if (glbVarLevelName == "Level3") {

    //        HierarchyLevel3 = jsonObj[0].SettingValue;
    //        HierarchyLevel4 = jsonObj[1].SettingValue;
    //        HierarchyLevel5 = jsonObj[2].SettingValue;
    //        HierarchyLevel6 = jsonObj[3].SettingValue;
    //    }

    //    HideHierarchy();
    //    EnableHierarchyViaLevel();
    //}
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

            $('#g1').show();
            $('#g2').show();
            $('#g3').show();
            $('#g4').show();
            $('#g5').show();
            $('#g6').show();

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


            $('#g1').show();
            $('#g2').show();
            $('#g3').show();
            $('#g4').show();
            $('#g5').show();


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


            $('#g1').show();
            $('#g2').show();
            $('#g3').show();
            $('#g4').show();


        }
        if (CurrentUserRole == 'rl3') {
            $('#col1').show();
            $('#col2').show();
            $('#col3').show();

            $('#col11').show();
            $('#col22').show();
            $('#col33').show();

            $('#g1').show();
            $('#g2').show();
            $('#g3').show();


        }
        if (CurrentUserRole == 'rl4') {
            $('#col1').show();
            $('#col2').show();
            $('#col11').show();
            $('#col22').show();

            $('#g1').show();
            $('#g2').show();



        }
        if (CurrentUserRole == 'rl5') {
            $('#col1').show();
            $('#col11').show();

            $('#g1').show();

        }
       // GetHierarchySelection();
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

            $('#g1').show();
            $('#g2').show();
            $('#g3').show();
            $('#g4').show();


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

            $('#g1').show();
            $('#g2').show();
            $('#g3').show();
            $('#g4').show();


        } if (CurrentUserRole == 'marketingteam') {

            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col4').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();
            $('#col44').show();

            $('#g1').show();
            $('#g2').show();
            $('#g3').show();
            $('#g4').show();


        }
        if (CurrentUserRole == 'rl3') {
            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();

            $('#g1').show();
            $('#g2').show();
            $('#g3').show();


        }
        if (CurrentUserRole == 'rl4') {
            $('#col1').show();
            $('#col2').show();
            $('#col11').show();
            $('#col22').show();

            $('#g1').show();
            $('#g2').show();



        }
        if (CurrentUserRole == 'rl5') {
            $('#col1').show();
            $('#col11').show();

            $('#g1').show();

        }
        GetHierarchySelection();
        FillDropDownList();
    }

    //if (glbVarLevelName == "Level3") {

    //    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

    //        $('#col1').show();
    //        $('#col2').show();
    //        $('#col3').show();
    //        $('#col4').show();
    //        $('#col11').show();
    //        $('#col22').show();
    //        $('#col33').show();
    //        $('#col44').show();

    //        $('#g1').show();
    //        $('#g2').show();
    //        $('#g3').show();
    //        $('#g4').show();


    //    }
    //    if (CurrentUserRole == 'rl3') {
    //        $('#col1').show();
    //        $('#col2').show();
    //        $('#col3').show();
    //        $('#col11').show();
    //        $('#col22').show();
    //        $('#col33').show();

    //        $('#g1').show();
    //        $('#g2').show();
    //        $('#g3').show();


    //    }
    //    if (CurrentUserRole == 'rl4') {
    //        $('#col1').show();
    //        $('#col2').show();
    //        $('#col11').show();
    //        $('#col22').show();

    //        $('#g1').show();
    //        $('#g2').show();



    //    }
    //    if (CurrentUserRole == 'rl5') {
    //        $('#col1').show();
    //        $('#col11').show();

    //        $('#g1').show();

    //    }
    //    GetHierarchySelection();
    //    FillDropDownList();
    //}
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

            //            if (glbVarLevelName == "Level3") {

            level3Id = jsonObj[0].LevelId3;
            level4Id = jsonObj[0].LevelId4;
            level5Id = jsonObj[0].LevelId5;
            level6Id = jsonObj[0].LevelId6;
            //  }
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

    debugger
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
                $('#Label9').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label10').append(HierarchyLevel6 + " " + "TMs");

                $('#Label5').append(HierarchyLevel1 + " " + "Level ");
                $('#Label6').append(HierarchyLevel2 + " " + "Level ");
                $('#Label7').append(HierarchyLevel3 + " " + "Level ");
                $('#Label8').append(HierarchyLevel4 + " " + "Level ");
                $('#Label11').append(HierarchyLevel5 + " " + "Level ");
                $('#Label12').append(HierarchyLevel6 + " " + "Level ");
            }
            if (CurrentUserRole == 'rl1') {
                name = 'Select ' + HierarchyLevel2;
                $('#Label1').append(HierarchyLevel2 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label9').append(HierarchyLevel6 + " " + "TMs ");

                $('#Label5').append(HierarchyLevel2 + " " + "Level ");
                $('#Label6').append(HierarchyLevel3 + " " + "Level ");
                $('#Label7').append(HierarchyLevel4 + " " + "Level ");
                $('#Label8').append(HierarchyLevel5 + " " + "Level ");
                $('#Label11').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl2') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel6 + " " + "TMs ");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl3') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel6 + " " + "TMs ");


                $('#Label5').append(HierarchyLevel4 + " " + "Level ");
                $('#Label6').append(HierarchyLevel5 + " " + "Level ");
                $('#Label7').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel6 + " " + "TMs ");

                $('#Label5').append(HierarchyLevel5 + " " + "Level ");
                $('#Label6').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "TMs ");
                $('#Label5').append(HierarchyLevel6 + " " + "Level ");
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

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'marketingteam') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel6 + " " + "TMs");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl3') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel6 + " " + "TMs ");


                $('#Label5').append(HierarchyLevel4 + " " + "Level ");
                $('#Label6').append(HierarchyLevel5 + " " + "Level ");
                $('#Label7').append(HierarchyLevel6 + " " + "Level ");



            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel6 + " " + "TMs ");

                $('#Label5').append(HierarchyLevel5 + " " + "Level ");
                $('#Label6').append(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "TMs");
                $('#Label5').append(HierarchyLevel6 + " " + "Level ");
            }


            name = 'Select ' + $('#Label1').text();
            $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }




        FillGh();
    }
}

function FillGh() {

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/fillGH",
        contentType: "application/json; charset=utf-8",
        data: myData,
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
    document.getElementById('dG2').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label5').text();

    $("#dG1").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });



    // umer work
    if (CurrentUserRole == 'ftm') {
        SetNationalHierarchyForFTM();
    }

}


function defaulyHR() {

    myData = "{'employeeid':'" + EmployeeId + "' }";

    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/getemployeeHR",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessdefaulyHR,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessdefaulyHR(data, status) {

    if (data.d != "") {

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') { }
        if (CurrentUserRole == 'rl3') {
            $('#h2').val(data.d[0].LevelId3);
            $('#h3').val(-1);
            $('#h4').val(-1);
            $('#h5').val(-1);
        }
        if (CurrentUserRole == 'rl4') {
            $('#h2').val(data.d[0].LevelId3);
            $('#h3').val(data.d[0].LevelId4);
            $('#h4').val(-1);
            $('#h5').val(-1);
        }
        if (CurrentUserRole == 'rl5') {
            $('#h2').val(data.d[0].LevelId3);
            $('#h3').val(data.d[0].LevelId4);
            $('#h4').val(data.d[0].LevelId5);
            $('#h5').val(-1);
        }
        if (CurrentUserRole == 'rl6') {
            $('#h2').val(data.d[0].LevelId3);
            $('#h3').val(data.d[0].LevelId4);
            $('#h4').val(data.d[0].LevelId5);
            $('#h5').val(data.d[0].LevelId6);
            $('#h6').val(EmployeeId);
        }

    }
}



function OnChangeddl1() {

    $('#jqmID1, .jqmOverlay, .loading').show();


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
        $('#dG1').val(-1);

        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";
    }



    $('#jqmID1, .jqmOverlay, .loading').hide();

}
function OnChangeddl2() {
    $('#jqmID1, .jqmOverlay, .loading').show();


    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

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
    } else {
        $('#dG2').val(-1);

        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";


        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";
    }

    $('#jqmID1, .jqmOverlay, .loading').hide();
}
function OnChangeddl3() {

    $('#jqmID1, .jqmOverlay, .loading').show();


    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

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
        $('#dG3').val(-1);

        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";
    }

    $('#jqmID1, .jqmOverlay, .loading').hide();
}
function OnChangeddl4() {
   
    $('#jqmID1, .jqmOverlay, .loading').show();



    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

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

        $('#dG4').val(-1)
        //document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
        //document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";
    }


    $('#jqmID1, .jqmOverlay, .loading').hide();
}
function OnChangeddl5() {
    $('#jqmID1, .jqmOverlay, .loading').show();


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
        $('#dG5').val(-1);


        document.getElementById('ddl6').innerHTML = "";

        document.getElementById('dG6').innerHTML = "";

    }

    $('#jqmID1, .jqmOverlay, .loading').hide();
}
function OnChangeddl6() {
    $('#jqmID1, .jqmOverlay, .loading').show();


    if ($('#ddlreport').val() == 7) {
        document.getElementById("Chkself").checked = false;
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

        $('#dG6').val(-1)

    }

    $('#jqmID1, .jqmOverlay, .loading').hide();
}

function onSuccessFillddl1(data, status) {

    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG2').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

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
        else {

            $('#dG1').val(-1)

        }

    }

    //if (CurrentUserRole == 'rl4') {
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
    // }

}
function onSuccessFillddl2(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select ' + $('#Label3').text();
        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

        levelValue = $('#ddl2').val();
        //levelValue = -1;
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

            $('#dG2').val(-1)

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
                success: onSuccessFillddl12,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }


    }

}
function onSuccessFillddl3(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        value = '-1';

        name = 'Select ' + $('#Label4').text();
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });


        levelValue = $('#ddl3').val();
        //levelValue = -1;
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

            $('#dG3').val(-1)

        }
    }

    if (CurrentUserRole == 'rl3') {
        levelValue = $('#ddl3').val();
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/getemployeeHR",
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
    }

}
function onSuccessFillddl4(data, status) {

    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select ' + $('#Label9').text();
        $("#ddl5").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl5").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

        levelValue = $('#ddl4').val();
        //levelValue = -1;
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

            $('#dG4').val(-1)

        }

    }



    if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddl5').val();
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

}
function onSuccessFillddl5(data, status) {

    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        value = '-1';

        name = 'Select ' + $('#Label10').text();
        $("#ddl6").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl6").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });


        levelValue = $('#ddl5').val();
        //levelValue = -1;
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

            $('#dG5').val(-1)

        }
    }

    if (CurrentUserRole == 'rl3') {
        levelValue = $('#ddl3').val();
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

}
function onSuccessFillddl6(data, status) { }

function dg1() {
    $('#jqmID1, .jqmOverlay, .loading').show();

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

    $('#jqmID1, .jqmOverlay, .loading').hide();
}

function dg2() {
    $('#jqmID1, .jqmOverlay, .loading').show();


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


    $('#jqmID1, .jqmOverlay, .loading').hide();


}
function dg3() {
    $('#jqmID1, .jqmOverlay, .loading').show();

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

    $('#jqmID1, .jqmOverlay, .loading').hide();
}
function dg4() {
    $('#jqmID1, .jqmOverlay, .loading').show();

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

    $('#jqmID1, .jqmOverlay, .loading').hide();
}
function dg5() {
    $('#jqmID1, .jqmOverlay, .loading').show();

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

    $('#jqmID1, .jqmOverlay, .loading').hide();
}
function dg6() {
    $('#jqmID1, .jqmOverlay, .loading').show();


    // G3d();
    //$('#ddl4').val
    //FillMRDr();
    $('#h6').val(levelValue);

    $('#jqmID1, .jqmOverlay, .loading').hide();
}

function OnChangeddG1() {

    debugger
    $('#jqmID1, .jqmOverlay, .loading').show();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }
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


    $('#jqmID1, .jqmOverlay, .loading').hide();
}
function OnChangeddG2() {
    $('#jqmID1, .jqmOverlay, .loading').show();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

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
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";



    }


    $('#jqmID1, .jqmOverlay, .loading').hide();


}
function OnChangeddG3() {
    $('#jqmID1, .jqmOverlay, .loading').show();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

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

        G3c();
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

    $('#jqmID1, .jqmOverlay, .loading').hide();
}
function OnChangeddG4() {
    $('#jqmID1, .jqmOverlay, .loading').show();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

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

        G3d();
    }
    else {
        $('#ddl4').val(-1)

        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";



    }

    $('#jqmID1, .jqmOverlay, .loading').hide();
}
function OnChangeddG5() {
    $('#jqmID1, .jqmOverlay, .loading').show();

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

        document.getElementById('dG6').innerHTML = "";


        document.getElementById('ddl6').innerHTML = "";



    }

    $('#jqmID1, .jqmOverlay, .loading').hide();
}
function OnChangeddG6() {
    $('#jqmID1, .jqmOverlay, .loading').show();

    if ($('#ddlreport').val() == 7) {
        // Uncheck
        document.getElementById("Chkself").checked = false;
        $('#Th8').hide();
    }


    G3f();
    //FillMRDr();
    $('#jqmID1, .jqmOverlay, .loading').hide();
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
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label7').text();

    $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });

}
function onSuccessG3(data, status) {
    //console.log(data.d);
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label8').text();

    $("#dG4").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });

}
function onSuccessG4(data, status) {
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label11').text();

    $("#dG5").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG5").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });

}
function onSuccessG5(data, status) {
    document.getElementById('dG6').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label12').text();

    $("#dG6").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG6").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });

}


function onSuccessFillddl11(data, status) {
    setvalue();
    if (CurrentUserRole == 'admin') {

        $('#dG1').val(data.d[0].LevelId1)
        $('#h2').val(data.d[0].LevelId1)
        dg1();
    }
    if (CurrentUserRole == 'rl1') {

        $('#dG1').val(data.d[0].LevelId2)
        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)

        dg1();
    }
    if (CurrentUserRole == 'rl2') {

        $('#dG1').val(data.d[0].LevelId3)
        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)

        dg1();
    }
    if (CurrentUserRole == 'marketingteam') {

        $('#dG1').val(data.d[0].LevelId1)
        $('#h2').val(data.d[0].LevelId1)

        dg1();
    }
    if (CurrentUserRole == 'rl3') {
        $('#dG1').val(data.d[0].LevelId4)
        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)

        dg1();

    }
    if (CurrentUserRole == 'rl4') {
        $('#dG1').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)

        $('#h12').val(data.d[0].LevelId5)

        dg1();

    }
    if (CurrentUserRole == 'rl5') {
        $('#dG1').val(data.d[0].LevelId6)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)

        $('#h12').val(data.d[0].LevelId5)
        $('#h13').val(data.d[0].LevelId6)

        newemployee = $('#ddl1').val();
        $('#h6').val(newemployee);


    }
}
function onSuccessFillddl12(data, status) {
    setvalue();
    if (CurrentUserRole == 'admin') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)

        dg2();
    }
    if (CurrentUserRole == 'marketingteam') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)

        dg2();
    }
    if (CurrentUserRole == 'rl1') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)

        dg2();
    }
    if (CurrentUserRole == 'rl2') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)

        dg2();
    }
    if (CurrentUserRole == 'rl3') {
        $('#dG2').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)




        dg2();
    }
    if (CurrentUserRole == 'rl4') {
        $('#dG2').val(data.d[0].LevelId6)
        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)

        newemployee = $('#ddl2').val();
        $('#h6').val(newemployee);



    }

    //OnChangeddG2();
}
function onSuccessFillddl13(data, status) {
    setvalue();
    if (CurrentUserRole == 'admin') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        dg3();
    }
    if (CurrentUserRole == 'marketingteam') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        dg3();
    }
    if (CurrentUserRole == 'rl1') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        dg3();
    }
    if (CurrentUserRole == 'rl2') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        dg3();
    }
    if (CurrentUserRole == 'rl3') {
        $('#dG3').val(data.d[0].LevelId6)
        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)
        $('#h5').val(data.d[0].LevelId6)

        newemployee = $('#ddl3').val();
        $('#h6').val(newemployee);




    }


    //OnChangeddG3();
}
function onSuccessFillddl14(data, status) {
    setvalue();
    if (CurrentUserRole == 'admin') {
        debugger;
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)
        $('#dG4').val(data.d[0].LevelId4)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)
        dg4();
    }
    if (CurrentUserRole == 'marketingteam') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)
        $('#dG4').val(data.d[0].LevelId4)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)
        dg4();
    }
    if (CurrentUserRole == 'rl1') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        dg4();
    }
    if (CurrentUserRole == 'rl2') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        dg4();
    }
    if (CurrentUserRole == 'rl3') {
        $('#dG3').val(data.d[0].LevelId6)
        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)
        $('#h5').val(data.d[0].LevelId6)

        newemployee = $('#ddl3').val();
        $('#h6').val(newemployee);




    }


    //OnChangeddG3();
}
function onSuccessFillddl15(data, status) {
    setvalue();
    if (CurrentUserRole == 'admin') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)
        $('#dG4').val(data.d[0].LevelId4)
        $('#dG5').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)
        $('#h12').val(data.d[0].LevelId5)
        dg5();
    }
    if (CurrentUserRole == 'marketingteam') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)
        $('#dG4').val(data.d[0].LevelId4)
        $('#dG5').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)
        $('#h12').val(data.d[0].LevelId5)
        dg5();
    }
    if (CurrentUserRole == 'rl1') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)
        $('#dG4').val(data.d[0].LevelId4)
        $('#dG5').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)
        $('#h12').val(data.d[0].LevelId5)
        dg5();
    }
    if (CurrentUserRole == 'rl2') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)
        $('#dG4').val(data.d[0].LevelId4)
        $('#dG5').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)
        $('#h12').val(data.d[0].LevelId5)
        dg5();
    }
    if (CurrentUserRole == 'rl3') {
        $('#dG3').val(data.d[0].LevelId6)
        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)
        $('#h5').val(data.d[0].LevelId6)

        newemployee = $('#ddl3').val();
        $('#h6').val(newemployee);

        //FillMRDr();


    }


    //OnChangeddG3();
}
function onSuccessFillddl16(data, status) {
    setvalue();
    $('#dG1').val(data.d[0].LevelId1)
    $('#dG2').val(data.d[0].LevelId2)
    $('#dG3').val(data.d[0].LevelId3)
    $('#dG4').val(data.d[0].LevelId4)
    $('#dG5').val(data.d[0].LevelId5)
    $('#dG6').val(data.d[0].LevelId6)

    $('#h2').val(data.d[0].LevelId1)
    $('#h3').val(data.d[0].LevelId2)
    $('#h4').val(data.d[0].LevelId3)
    $('#h5').val(data.d[0].LevelId4)
    $('#h12').val(data.d[0].LevelId5)
    $('#h13').val(data.d[0].LevelId6)

    dg6();
    //OnChangeddG4();


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


        if (glbVarLevelName == "Level1") {

            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            value = '-1';
            //farazlabel
            if (CurrentUserRole == 'admin') {
                name = 'Select ' + HierarchyLevel1;
                $('#Label1').append(HierarchyLevel1 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel2 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label9').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label10').append(HierarchyLevel6 + " " + "TMs");

                $('#Label5').append(HierarchyLevel1 + " " + "Level ");
                $('#Label6').append(HierarchyLevel2 + " " + "Level ");
                $('#Label7').append(HierarchyLevel3 + " " + "Level ");
                $('#Label8').append(HierarchyLevel4 + " " + "Level ");
                $('#Label11').append(HierarchyLevel5 + " " + "Level ");
                $('#Label12').append(HierarchyLevel6 + " " + "Level ");
            }
            if (CurrentUserRole == 'rl1') {
                name = 'Select ' + HierarchyLevel2;
                $('#Label1').append(HierarchyLevel2 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label9').append(HierarchyLevel6 + " " + "TMs ");

                $('#Label5').append(HierarchyLevel2 + " " + "Level ");
                $('#Label6').append(HierarchyLevel3 + " " + "Level ");
                $('#Label7').append(HierarchyLevel4 + " " + "Level ");
                $('#Label8').append(HierarchyLevel5 + " " + "Level ");
                $('#Label11').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl2') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel6 + " " + "TMs ");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl3') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel6 + " " + "TMs ");


                $('#Label5').append(HierarchyLevel4 + " " + "Level ");
                $('#Label6').append(HierarchyLevel5 + " " + "Level ");
                $('#Label7').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel6 + " " + "TMs ");

                $('#Label5').append(HierarchyLevel5 + " " + "Level ");
                $('#Label6').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "TMs ");
                $('#Label5').append(HierarchyLevel6 + " " + "Level ");
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

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'marketingteam') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel6 + " " + "TMs");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl3') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel6 + " " + "TMs ");


                $('#Label5').append(HierarchyLevel4 + " " + "Level ");
                $('#Label6').append(HierarchyLevel5 + " " + "Level ");
                $('#Label7').append(HierarchyLevel6 + " " + "Level ");



            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel6 + " " + "TMs ");

                $('#Label5').append(HierarchyLevel5 + " " + "Level ");
                $('#Label6').append(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "TMs");
                $('#Label5').append(HierarchyLevel6 + " " + "Level ");
            }


            name = 'Select ' + $('#Label1').text();
            $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }




        FillGh();
    }
}

function FillGh() {

    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/fillGH",
        contentType: "application/json; charset=utf-8",
        data: myData,
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
    //console.log(data.d);
    debugger
    document.getElementById('dG1').innerHTML = "";
    document.getElementById('dG2').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label5').text();

    $("#dG1").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });

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

    $('#g1').hide();
    $('#g2').hide();
    $('#g3').hide();
    $('#g4').hide();
    $('#g5').hide();
    $('#g6').hide();


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

function onErrorDt() {
    $('#jqmID1, .jqmOverlay, .loading').hide();
    msg = 'Date Error';
    $.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });

    $('#jqmID1, .jqmOverlay, .loading').hide();
}
function startingAjax() {
    //$('#jqmID1, .jqmOverlay, .loading').show();
}
function ajaxCompleted() {

    //$('#jqmID1, .jqmOverlay, .loading').hide();
}

function setvalue() {

    $('#h2').val(-1);
    $('#h3').val(-1);
    $('#h4').val(-1);
    $('#h5').val(-1);
    $('#h6').val(-1);
}


function btnCSRData() {
    //var requestObject = {};
    //requestObject["id"] = "test";
    //var data =JSON.stringify(requestObject);

    var L1='', L2='', L3='', L4='', L5='', L6='', EmpID='', stdate='', enddate=''

    if ($('#dG1').val() == -1 || $('#dG1').val()==undefined) L1 = 0; else L1 = $('#dG1').val();
    if ($('#dG2').val() == -1 || $('#dG2').val() == undefined) L2 = 0; else L2 = $('#dG2').val();
    if ($('#dG3').val() == -1 || $('#dG3').val() == undefined) L3 = 0; else L3 = $('#dG3').val();
    if ($('#dG4').val() == -1 || $('#dG4').val() == undefined) L4 = 0; else L4 = $('#dG4').val();
    if ($('#dG5').val() == -1 || $('#dG5').val() == undefined) L5 = 0; else L5 = $('#dG5').val();
    if ($('#dG6').val() == -1 || $('#dG5').val() == undefined) L6 = 0; else L6 = $('#dG6').val();
    if ($('#ddl6').val() == -1 || $('#ddl6').val() == undefined) EmpID = 0; else EmpID = $('#ddl6').val();

    stdate = $('#stdate').val()
    enddate = $('#enddate').val()
    



    var data = "{'Level1Id': '" + L1 + "','Level2Id': '" + L2 + "','Level3Id': '" + L3 + "','Level4Id': '" + L4 + "','Level5Id': '" + L5 + "','Level6Id': '" + L6 + "','EmployeeId': '" + EmpID + "','StartingDate': '" + stdate + "','EndingDate': '" + enddate + "'}"
    $.ajax({
        type: "POST",
        url: "CSRApprovalProcess.aspx/Loadtest",
        
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: "true",
        cache: "false",
        success: function (msg) {
            alert("ok");
        },
        Error: function (x, e) {
            // On Error
        }
    });
}

function assignvalues() {

    var L1 = '', L2 = '', L3 = '', L4 = '', L5 = '', L6 = '', EmpID = '', stdate = '', enddate = ''

    if ($('#dG1').val() == -1 || $('#dG1').val() == undefined) L1 = 0; else L1 = $('#dG1').val();
    if ($('#dG2').val() == -1 || $('#dG2').val() == undefined) L2 = 0; else L2 = $('#dG2').val();
    if ($('#dG3').val() == -1 || $('#dG3').val() == undefined) L3 = 0; else L3 = $('#dG3').val();
    if ($('#dG4').val() == -1 || $('#dG4').val() == undefined) L4 = 0; else L4 = $('#dG4').val();
    if ($('#dG5').val() == -1 || $('#dG5').val() == undefined) L5 = 0; else L5 = $('#dG5').val();
    if ($('#dG6').val() == -1 || $('#dG5').val() == undefined) L6 = 0; else L6 = $('#dG6').val();
    if ($('#ddl6').val() == -1 || $('#ddl6').val() == undefined) EmpID = 0; else EmpID = $('#ddl6').val();

    stdate = $('#stdate').val()
    enddate = $('#enddate').val()


    $('#h1').val(L1);
    $('#h2').val(L2);
    $('#h3').val(L3);
    $('#h4').val(L4);
    $('#h5').val(L5);
    $('#h6').val(L6);
    $('#h7').val(EmpID);
    $('#h8').val(stdate);
    $('#h9').val(enddate);


}


// Obout Grid Events
function oGrid_Edit(sender) {
    ViewAprovalProcess(sender.toString())

}



function ViewAprovalProcess(ID) {

    window.open('CSRApprovalProcessDetail.aspx?ID='+ID);

    //var data = "{'ID': '" + ID + "'}"

    //$.ajax({
    //    type: "POST",
    //    url: "CSRApprovalRequisition.asmx/ViewAprovalProcess",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    data: data,
    //    success: OnSuccessViewAprovalProcess,
    //    error: onError,
    //    beforeSend: startingAjax,
    //    complete: ajaxCompleted,
    //    async: false,
    //    cache: false
    //});
}

function OnSuccessViewAprovalProcess(data, status) {

    var tabledata = "";

    $('#FTMRegionsModal').find('.summaryBody').empty();
    $('#FTMRegionsModal').find('.summaryBody').append('<table class="table table-striped table-bordered" id="RegionsRecord">' +
            '<thead>' +
                '<tr>' +
                    '<th style="width: 50px;">S.No:</th>' +
                      '<th style="width: 300px;">Employee Name:</th>' +
                        '<th style="width: 300px;">Doctor Name:</th>' +
                    '<th style="width: 150px;">GM</th>' +
                    '<th style="width: 150px;">GM Status</th>' +
                     '<th style="width: 200px;">BUH</th>' +
                      '<th style="width: 150px;">BUH Status</th>' +
                    '<th style="width: 200px;">National</th>' +
                     '<th style="width: 150px;">National Status</th>' +
                    '<th style="width: 200px;">Region</th>' +
                    '<th style="width: 150px;">Region Status</th>' +
                    '<th style="width: 200px;">Zone</th>' +
                     '<th style="width: 150px;">Zone Status</th>' +
                   
                '</tr>' +
            '</thead>' +
            '<tbody id="RegionsList">');

    if (data.d != '') {
        var jsonObj = jsonParse(data.d);

        for (var i = 0; i < jsonObj.length; i++) {

            tabledata += "<tr>" +
                    "<td style='vertical-align: middle;'>" + (i + 1) + "</td>" +
                     "<td style='vertical-align: middle;'>" + jsonObj[i].EmployeeName + "</td>" +
                      "<td style='vertical-align: middle;'>" + jsonObj[i].DoctorName + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].Level1Id + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].Level1IdStatus + "</td>" +
                      "<td style='vertical-align: middle;'>" + jsonObj[i].Level2Id + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].Level2IdStatus + "</td>" +
                      "<td style='vertical-align: middle;'>" + jsonObj[i].Level3Id + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].Level3IdStatus + "</td>" +
                      "<td style='vertical-align: middle;'>" + jsonObj[i].Level4Id + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].Level4IdStatus + "</td>" +
                      "<td style='vertical-align: middle;'>" + jsonObj[i].Level5Id + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].Level5IdStatus + "</td>" +
                "</tr>";
        }

        $('#RegionsList').append(tabledata);
        $('#FTMRegionsModal').find('.summaryBody').append('</tbody></table>');
    }

  
        $('#RegionsRecord').DataTable();
   

    $('#FTMRegionsModal').modal('show');
}



function UH3() {


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
function UH4() {
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
function UH5() {
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
function UH6() {
    levelValue = $('#ddl4').val();
    myData = "{'employeeId':'" + levelValue + "' }";


    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/datascreen.asmx/GetEmployee",
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
function onSuccessUH4(data, status) {

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


}
function onSuccessUH5(data, status) {

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

    //document.getElementById('ddl6').innerHTML = "";

    //if (data.d != "") {

    //    jsonObj = jsonParse(data.d);
    //    value = '-1';
    //    name = 'Select ' + $('#Label10').text();
    //    $("#ddl6").append("<option value='" + value + "'>" + name + "</option>");

    //    $.each(jsonObj, function (i, tweet) {
    //        $("#ddl6").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
    //    });
    //}

}

function G3a() {//start

    debugger
    setvalue();

    if (CurrentUserRole == 'admin') {

        $('#h2').val($('#dG1').val());
        level1 = $('#dG1').val();
        level2 = 0;
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    } if (CurrentUserRole == 'marketingteam') {

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

        $('#h2').val($('#dG1').val());
        level1 = $('#dG1').val();
        level2 = 0;
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl2') {

        $('#h2').val($('#dG1').val());
        level1 = $('#dG1').val();
        level2 = 0;
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl3') {

        $('#h2').val(level3Id);
        $('#h3').val($('#dG1').val());

        level1 = level3Id;
        level2 = $('#dG1').val();
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl4') {

        $('#h2').val(level3Id);
        $('#h3').val(level4Id);
        $('#h4').val($('#dG1').val());


        level1 = level3Id;
        level2 = level4Id;
        level3 = $('#dG1').val();
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";



    }
    if (CurrentUserRole == 'rl5') {

        $('#h2').val(level3Id);
        $('#h3').val(level4Id);
        $('#h4').val(level5Id);
        $('#h5').val($('#dG1').val());

        level1 = level3Id;
        level2 = level4Id;
        level3 = level5Id;
        level4 = $('#dG1').val();
        level5 = 0;
        level6 = 0;

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
    setvalue();
    if (CurrentUserRole == 'admin') {
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
    if (CurrentUserRole == 'rl3') {

        $('#h2').val(level3Id);
        $('#h3').val($('#dG1').val());
        $('#h4').val($('#dG2').val());

        level1 = level3Id;
        level2 = $('#dG1').val();
        level3 = $('#dG2').val();
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl4') {

        $('#h2').val(level3Id);
        $('#h3').val(level4Id);
        $('#h4').val($('#dG1').val());
        $('#h5').val($('#dG2').val());

        level1 = level3Id;
        level2 = level4Id;
        level3 = $('#dG1').val();
        level4 = $('#dG2').val();
        level5 = 0;
        level6 = 0;

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
    setvalue();
    if (CurrentUserRole == 'admin') {
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
    if (CurrentUserRole == 'rl3') {

        $('#h2').val(level3Id);
        $('#h3').val($('#dG1').val());
        $('#h4').val($('#dG2').val());
        $('#h5').val($('#dG3').val());


        level1 = level3Id;
        level2 = $('#dG1').val();
        level3 = $('#dG2').val();
        level4 = $('#dG3').val();
        level5 = 0;
        level6 = 0;

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

    setvalue();
    if (CurrentUserRole == 'admin') {
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
    setvalue();
    if (CurrentUserRole == 'admin') {
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
    setvalue();
    if (CurrentUserRole == 'admin') {
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

function onSuccessG3a(data, status) {
    //console.log(data.d);
    //console.log(data.d[0].Item1);
    debugger
    $('#ddl1').val(data.d[0].Item1)

    if (CurrentUserRole == 'admin') {
        UH3();

    }
    if (CurrentUserRole == 'rl1') {
        UH3();

    }
    if (CurrentUserRole == 'rl2') {
        UH3();

    }
    if (CurrentUserRole == 'rl5') {
        $('#h6').val(data.d[0].Item1)

    }

    if (CurrentUserRole == 'marketingteam') {
        UH3();

    }
    if (CurrentUserRole == 'rl4') {
        UH3();
    }
    if (CurrentUserRole == 'rl3') {
        UH3();

    }

}
function onSuccessG3b(data, status) {
    $('#ddl2').val(data.d[0].Item1)

    if (CurrentUserRole == 'rl4') {
        $('#h6').val(data.d[0].Item1)

    }

    if (CurrentUserRole == 'rl1') {

        UH4();
    }

    if (CurrentUserRole == 'rl2') {

        UH4();
    }
    if (CurrentUserRole == 'admin') {

        UH4();
    }
    if (CurrentUserRole == 'marketingteam') {

        UH4();
    }
    if (CurrentUserRole == 'rl3') {

        UH4();
    }
}
function onSuccessG3c(data, status) {

    debugger
    $('#ddl3').val(data.d[0].Item1)

    if (CurrentUserRole == 'rl3') {
        $('#h6').val(data.d[0].Item1)

    }

    if (CurrentUserRole == 'admin') {
        UH5();

    }
    if (CurrentUserRole == 'rl1') {
        UH5();

    }
    if (CurrentUserRole == 'admin') {
        UH5();

    }
    if (CurrentUserRole == 'marketingteam') {
        UH5();

    }
}
function onSuccessG3d(data, status) {
    $('#ddl4').val(data.d[0].Item1)
    if (CurrentUserRole == 'admin') {
        UH6();

    }
    if (CurrentUserRole == 'rl1') {
        UH6();

    }
    if (CurrentUserRole == 'rl2') {
        UH6();

    }
    if (CurrentUserRole == 'marketingteam') {
        UH6();

    }
    if (CurrentUserRole == 'rl3') {
        $('#h6').val(data.d[0].Item1)

    }


}
function onSuccessG3e(data, status) {
    $('#ddl5').val(data.d[0].Item1)

    if (CurrentUserRole == 'rl3') {
        $('#h6').val(data.d[0].Item1)

    }

    if (CurrentUserRole == 'admin') {
        UH7();

    }
    if (CurrentUserRole == 'rl1') {
        UH7();

    }
    if (CurrentUserRole == 'rl2') {
        UH7();

    }
    if (CurrentUserRole == 'marketingteam') {
        UH7();

    }
}
function onSuccessG3f(data, status) {
    $('#ddl6').val(data.d[0].Item1)
    $('#h6').val(data.d[0].Item1);

    UH8();


}

function pageLoad() {

    IsValidUser();
    $('#ddl1').change(OnChangeddl1);
    $('#ddl2').change(OnChangeddl2);
    $('#ddl3').change(OnChangeddl3);
    $('#ddl4').change(OnChangeddl4);

    $('#dG1').change(OnChangeddG1);
    $('#dG2').change(OnChangeddG2);
    $('#dG3').change(OnChangeddG3);
    $('#dG4').change(OnChangeddG4);


    $('#ddlABrick').change(OnChangeAbrick);
    $('#ddlEBrick').change(OnChangeEbrick);

    $('#Th11').hide();
    $('#Th22').hide();
    $('#Th1').hide();
    $('#Th2').hide();
    $('#Th3').hide();
    $('#Th4').hide();
    $('#Th2').removeClass("showing");
    $('#Th2').removeClass("hide");
    $('#Th2').addClass("hide");


    HideHierarchy();
    GetCurrentUser();

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
}

function GetHierarchySelection() {

    myData = "{'systemUserId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "MrDoctors.asmx/GetHierarchySelection",
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

//******************************************************************************************//

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

        if (glbVarLevelName == "Level3") {

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
                $('#Label4').append(HierarchyLevel6 + " " + "MIO");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl3') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel6 + " " + "MIO ");


                $('#Label5').append(HierarchyLevel4 + " " + "Level ");
                $('#Label6').append(HierarchyLevel5 + " " + "Level ");
                $('#Label7').append(HierarchyLevel6 + " " + "Level ");



            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel6 + " " + "MIO ");

                $('#Label5').append(HierarchyLevel5 + " " + "Level ");
                $('#Label6').append(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "MIO ");
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

function FillAllBricks() {

    $.ajax({
        type: "POST",
        url: "MrDoctors.asmx/FillAllBricks",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessFillAllBricks,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}
function onSuccessFillAllBricks(data, status) {

    document.getElementById('ddlABrick').innerHTML = "";

    if (data.d != "") {
        value = '-1';
        name = 'Select ALL Brick';

        $("#ddlABrick").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddlABrick").append("<option value='" + tweet.LevelId + "'>" + tweet.LevelName + "</option>");
        });

    }
}

function FillMRBricks() {


    if (CurrentUserRole == 'admin') {
        levelValue = $('#ddl4').val();
    }
    if (CurrentUserRole == 'rl3') {

        levelValue = $('#ddl3').val();

    }
    if (CurrentUserRole == 'rl4') {

        levelValue = $('#ddl2').val();


    }
    if (CurrentUserRole == 'rl5') {

        levelValue = $('#ddl1').val();
    }

    myData = "{'employeeid':'" + levelValue + "' }";

    $.ajax({
        type: "POST",
        url: "MrDoctors.asmx/FillMRBricks",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessMRBricks,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}
function onSuccessMRBricks(data, status) {

    if (data.d != "") {
        value = '-1';
        name = 'Select MR Brick';

        document.getElementById('ddlEBrick').innerHTML = "";

        $("#ddlEBrick").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddlEBrick").append("<option value='" + tweet.LevelId + "'>" + tweet.LevelName + "</option>");
        });



        GetMRDoctors();

    }
}

function FillMRDr() {

    if (CurrentUserRole == 'admin') {
        levelValue = $('#ddl4').val();
    }
    if (CurrentUserRole == 'rl3') {

        levelValue = $('#ddl3').val();

    }
    if (CurrentUserRole == 'rl4') {

        levelValue = $('#ddl2').val();


    }
    if (CurrentUserRole == 'rl5') {

        levelValue = $('#ddl1').val();
    }


    myData = "{'employeeid':'" + levelValue + "' }";

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/FillMrDR",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessMRDr,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}
function onSuccessMRDr(data, status) {

    if (data.d != "") {
        value = '-1';
        name = 'Select MR Doctors';

        document.getElementById('ddlDR').innerHTML = "";

        $("#ddlDR").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddlDR").append("<option value='" + tweet.DoctorId + "'>" + tweet.DoctorName + "</option>");
        });

    }
}

function FillProductSku() {

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/FillProduct",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessFillProduct,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}
function onSuccessFillProduct(data, status) {

    if (data.d != "") {
        value = '-1';
        name = 'Select ALL Product';

        $("#ddlProduct").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddlProduct").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });

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


    FillAllBricks();
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

        if (CurrentUserRole == 'admin') { }
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
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    remo();
    levelValue = $('#ddl1').val();
    myData = "{'employeeId':'" + levelValue + "' }";


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

        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
    }



    $('#dialog').jqmHide();

}
function OnChangeddl2() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    remo();
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

        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
    }

    $('#dialog').jqmHide();
}
function OnChangeddl3() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    remo();
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
        document.getElementById('dG4').innerHTML = "";
    }

    $('#dialog').jqmHide();
}
function OnChangeddl4() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    remo();
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

        $('#dG4').val(-1)

    }


    $('#dialog').jqmHide();
}
function OnChangeddl5() { }
function onSuccessFillddl1(data, status) {

    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";

    document.getElementById('dG2').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";

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

    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";

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
    document.getElementById('dG4').innerHTML = "";
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

}
function onSuccessFillddl5(data, status) { }

function dg1() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

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


    }
    else {
        $('#ddl1').val(-1)
        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";

        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";

        document.getElementById('ddlDR').innerHTML = "";

    }




    $('#dialog').jqmHide();
}
function dg2() {
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


    }
    else {
        $('#ddl2').val(-1)
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddlDR').innerHTML = "";

    }


    $('#dialog').jqmHide();


}
function dg3() {
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


    }
    else {
        $('#ddl3').val(-1)

        document.getElementById('dG4').innerHTML = "";

        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddlDR').innerHTML = "";

    }

    $('#dialog').jqmHide();
}
function dg4() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    FillMRBricks();

    $('#h6').val(levelValue);

    $('#dialog').jqmHide();
}


function OnChangeddG1() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    remo();
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
        $('#ddl1').val(-1)
        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";

        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";

        document.getElementById('ddlDR').innerHTML = "";

    }


    $('#dialog').jqmHide();
}
function OnChangeddG2() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    remo();

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
        $('#ddl2').val(-1)
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddlDR').innerHTML = "";

    }


    $('#dialog').jqmHide();


}
function OnChangeddG3() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    remo();
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
        $('#ddl3').val(-1)

        document.getElementById('dG4').innerHTML = "";

        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddlDR').innerHTML = "";

    }

    $('#dialog').jqmHide();
}
function OnChangeddG4() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    remo();
    G3d();



    $('#dialog').jqmHide();
}
function onSuccessG1(data, status) {
    document.getElementById('dG2').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label6').text(); ;


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


function UH3() {
    // document.getElementById('ddlDR').innerHTML = "";

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
    // document.getElementById('ddlDR').innerHTML = "";

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
    //document.getElementById('ddlDR').innerHTML = "";

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

}
function onSuccessUH3(data, status) {

    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";

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

function G3a() {

    setvalue();

    if (CurrentUserRole == 'admin') {

        $('#h2').val($('#dG1').val());
        level3 = $('#dG1').val();
        level4 = 0;
        level5 = 0;
        level6 = 0;
        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl3') {

        $('#h2').val(level3Id);
        $('#h3').val($('#dG1').val());

        level3 = level3Id;
        level4 = $('#dG1').val();
        level5 = 0;
        level6 = 0;
        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl4') {

        $('#h2').val(level3Id);
        $('#h3').val(level4Id);
        $('#h4').val($('#dG1').val());


        level3 = level3Id;
        level4 = level4Id;
        level5 = $('#dG1').val();
        level6 = 0;
        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";



    }
    if (CurrentUserRole == 'rl5') {

        $('#h2').val(level3Id);
        $('#h3').val(level4Id);
        $('#h4').val(level5Id);
        $('#h5').val($('#dG1').val());

        level3 = level3Id;
        level4 = level4Id;
        level5 = level5Id;
        level6 = $('#dG1').val();
        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
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

        level3 = $('#dG1').val();
        level4 = $('#dG2').val();
        level5 = 0;
        level6 = 0;
        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl3') {

        $('#h2').val(level3Id);
        $('#h3').val($('#dG1').val());
        $('#h4').val($('#dG2').val());

        level3 = level3Id;
        level4 = $('#dG1').val();
        level5 = $('#dG2').val();
        level6 = 0;
        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl4') {

        $('#h2').val(level3Id);
        $('#h3').val(level4Id);
        $('#h4').val($('#dG1').val());
        $('#h5').val($('#dG2').val());

        level3 = level3Id;
        level4 = level4Id;
        level5 = $('#dG1').val();
        level6 = $('#dG2').val();
        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";



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


        level3 = $('#dG1').val();
        level4 = $('#dG2').val();
        level5 = $('#dG3').val();
        level6 = 0;
        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl3') {

        $('#h2').val(level3Id);
        $('#h3').val($('#dG1').val());
        $('#h4').val($('#dG2').val());
        $('#h5').val($('#dG3').val());


        level3 = level3Id;
        level4 = $('#dG1').val();
        level5 = $('#dG2').val();
        level6 = $('#dG3').val();

        myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";
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
    level3 = $('#dG1').val();
    level4 = $('#dG2').val();
    level5 = $('#dG3').val();
    level6 = $('#dG4').val();

    $('#h2').val($('#dG1').val());
    $('#h3').val($('#dG2').val());
    $('#h4').val($('#dG3').val());
    $('#h5').val($('#dG4').val());


    myData = "{'l1':'" + level3 + "','l2':'" + level4 + "','l3':'" + level5 + "','l4':'" + level6 + "'}";

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
function onSuccessG3a(data, status) {
    $('#ddl1').val(data.d[0].Item1)

    if (CurrentUserRole == 'rl5') {
        $('#h6').val(data.d[0].Item1)
        FillMRDr();
    }
    if (CurrentUserRole == 'admin') {
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
        FillMRDr();
    }

    if (CurrentUserRole == 'admin') {

        UH4();
    }
    if (CurrentUserRole == 'rl3') {

        UH4();
    }
}
function onSuccessG3c(data, status) {
    $('#ddl3').val(data.d[0].Item1)

    if (CurrentUserRole == 'rl3') {
        $('#h6').val(data.d[0].Item1)
        FillMRDr();
    }

    if (CurrentUserRole == 'admin') {
        UH5();

    }
}
function onSuccessG3d(data, status) {
    $('#ddl4').val(data.d[0].Item1)
    $('#h6').val(data.d[0].Item1);

    UH6();
    FillMRBricks();

}

function onSuccessFillddl11(data, status) {
    setvalue();
    if (CurrentUserRole == 'admin') {

        $('#dG1').val(data.d[0].LevelId3)
        $('#h2').val(data.d[0].LevelId3)
        dg1();
    }
    if (CurrentUserRole == 'rl3') {
        $('#dG1').val(data.d[0].LevelId4)
        $('#h2').val(data.d[0].LevelId4)
        $('#h3').val(data.d[0].LevelId3)
        dg1();

    }
    if (CurrentUserRole == 'rl4') {
        $('#dG1').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)
        dg1();

    }
    if (CurrentUserRole == 'rl5') {
        $('#dG1').val(data.d[0].LevelId6)
        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)
        $('#h5').val(data.d[0].LevelId6)

        newemployee = $('#ddl1').val();
        $('#h6').val(newemployee);

        FillMRDr();
    }
}
function onSuccessFillddl12(data, status) {
    setvalue();
    if (CurrentUserRole == 'admin') {
        $('#dG1').val(data.d[0].LevelId3)
        $('#dG2').val(data.d[0].LevelId4)

        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)

        dg2();
    }
    if (CurrentUserRole == 'rl3') {
        $('#dG2').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)
        // $('#h5').val(data.d[0].LevelId6)
        dg2();
    }
    if (CurrentUserRole == 'rl4') {
        $('#dG2').val(data.d[0].LevelId6)
        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)
        $('#h5').val(data.d[0].LevelId6)

        newemployee = $('#ddl2').val();
        $('#h6').val(newemployee);

        FillMRDr();

    }

    //OnChangeddG2();
}
function onSuccessFillddl13(data, status) {
    setvalue();
    if (CurrentUserRole == 'admin') {
        $('#dG1').val(data.d[0].LevelId3)
        $('#dG2').val(data.d[0].LevelId4)
        $('#dG3').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)
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

        FillMRDr();


    }


    //OnChangeddG3();
}
function onSuccessFillddl14(data, status) {
    setvalue();
    $('#dG1').val(data.d[0].LevelId3)
    $('#dG2').val(data.d[0].LevelId4)
    $('#dG3').val(data.d[0].LevelId5)
    $('#dG4').val(data.d[0].LevelId6)

    $('#h2').val(data.d[0].LevelId3)
    $('#h3').val(data.d[0].LevelId4)
    $('#h4').val(data.d[0].LevelId5)
    $('#h5').val(data.d[0].LevelId6)

    dg4();
    //OnChangeddG4();


}


//******************************************************************************************//

function GetMRDoctors() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    $('#MRDoctors').show();
    $('#BrickDoctors').hide();
    $('#BrickDoctorscheck').hide();

    myData = '';
    mrdrid = $('#ddl4').val();

    myData = "{'employeeid':'" + mrdrid + "' }";

    $.ajax({
        type: "POST",
        url: "MrDoctors.asmx/listMRDoctors",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessMRDoctors,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

    $('#dialog').jqmHide();

}
function onSuccessMRDoctors(data, status) {

    $('#MRDoctors #datatables_wrapper').remove();

    $('#MRDoctors').prepend($('<table id="datatables" class="display"><thead><tr><th>Code</th><th>Doctor Name</th><th>Class</th><th>Frequency</th><th>Brick</th><th>Address</th><th>Contact No</th></tr></thead><tbody>'));
    $.each(data.d, function (i, option) {
        $('#datatables').append($('<tr><td>' + option.Item1 + '</td><td>' + option.Item2 + '</td><td>' + option.Item3 + '</td><td>' + option.Item4 + '</td><td>' + option.Item5 + '</td><td>' + option.Item6 + '</td><td>' + option.Item7 + '</td></tr>'));
    });

    // $('#MRDoctors').append($('</tbody></table>'));


    $('#MRDoctors').append($('</tbody>'));
    $('#datatables').append($('<tfoot><tr><th>Code</th><th>Doctor Name</th><th>Class</th><th>Frequency</th><th>Brick</th><th>Address</th><th>Contact No</th></tr></tfoot>'));
    $('#MRDoctors').append($('</table>'));

    $('#datatables').dataTable({
        "sPaginationType": "full_numbers",
        "aLengthMenu": [[25, 50, 100, 200, -1], [25, 50, 100, 200, "All"]],
        "iDisplayLength": 25,
        "bJQueryUI": true,
        "bAutoWidth": false,
        "aoColumns": [
            { sWidth: '25px' },
            { sWidth: '215px' },
            { sWidth: '25px' },
            { sWidth: '50px' },
            { sWidth: '150px' },
            { sWidth: '100px' },
            { sWidth: '25px' }
          ]
    });

    // $("#datatables").dataTable().columnFilter();

    $('#datatables').dataTable()
		  .columnFilter({
		      aoColumns:
              [{ type: "text" },
               { type: "text" },
               { type: "select", values: ['A', 'B', 'C', 'P'] },
			   { type: "text" },
               { type: "text" },
			   { type: "text" },
               { type: "text" }
				]
		  });

		  $('#datatables').change(function(){
            $('html,body').animate({scrollTop:400}, 1000);
          });

    $('#Th11').show();
    $('#Th22').hide();
    $('#Th1').show();
    $('#Th2').hide();
    $('#Th3').show();
    $('#Th2').removeClass("showing");
    $('#Th2').removeClass("hide");
    $('#Th2').addClass("hide");
    $('#MRDoctors').show();
    $('#BrickDoctors').hide();

}
function btnedit() {

    $('#Th11').show();
    $('#Th22').show();
    $('#Th1').show();
    $('#Th2').show();
    $('#Th3').show();
    $('#Th4').show();
    $('#Th2').removeClass("showing");
    $('#Th2').removeClass("hide");
    $('#Th2').addClass("showing");
    $('#ddlABrick').val('-1');


    $('#MRDoctors').hide();
    $('#BrickDoctors').show();
    $('#BrickDoctorscheck').show();
}

function OnChangeAbrick() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    myData = '';
    level3name = $('#dG1 option:selected').text();
    level4name = $('#dG2 option:selected').text();
    drbrickID = $('#ddlABrick').val();
    Empid = $('#ddl4').val();

    myData = "{'level3name':'" + level3name + "','level4name':'" + level4name + "','Drbrickid':'" + drbrickID + "','empID':'" + Empid + "'}";

    $.ajax({
        type: "POST",
        url: "MrDoctors.asmx/GetDrBrick",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessOnChangeAbrick,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });


}
function onSuccessOnChangeAbrick(data, status) {
    $('#BrickDoctorscheck #datatablesB_wrapper').remove();
    $('#BrickDoctorscheck').prepend($('<table id="datatablesB" class="display"><thead><tr><th></th><th class="coldisp">MR CODE</th><th>MR CODE</th><th>Doctor Name</th><th>Class</th><th>Address</th></tr></thead><tbody>'));

    $.each(data.d, function (ii, optioni) {
        item1Value = optioni.Item1;
        item6Value = optioni.Item6;
        item2value = optioni.Item2;
        item2textbox = '<input class="Htxt" type="text" value=' + item2value + '>';
        item2valueold = '<input class="Htxtold" type="text" value=' + item2value + '>';

        if (item6Value == 0) {
            hcheckbox = '<input class="Hck" type="checkbox" value=' + item1Value + '>';
        } else {
            hcheckbox = '  <input class="Hck" type="checkbox" checked="checked" value=' + item1Value + '>';
        }

        $('#datatablesB').append($('<tr><td>' + hcheckbox + '</td><td class="coldisp">' + item2valueold + '</td><td>' + item2textbox + '</td><td>' + optioni.Item3 + '</td><td>' + optioni.Item4 + '</td><td>' + optioni.Item5 + '</td></tr>'));

    });

    $('#BrickDoctorscheck').append($('</tbody>'));
    $('#datatablesB').append($('<tfoot><tr><th></th><th></th><th class="coldisp"></th><th>Doctor Name</th><th>Class</th><th>Address</th></tr></tfoot>'));
    $('#BrickDoctorscheck').append($('</table>'));

    $('#datatablesB').dataTable({
        "sPaginationType": "full_numbers",
        "aaSorting": [[2, 'asc']],
        "aLengthMenu": [[-1], ["All"]],
        "aoColumnDefs": [{ 'bSortable': false, 'aTargets': [0, 1]}],
        "iDisplayLength": -1,
        "bJQueryUI": true
    });

    // $('#datatablesB').dataTable().columnFilter();

    $('#datatablesB').dataTable()
		  .columnFilter({
		      aoColumns:
              [null,
               null,
               null,
               { type: "text" },
               { type: "select", values: ['A', 'B', 'C', 'P'] },
               { type: "text" }
				]
		  });

    $('#datatablesB').change(function () {
        $('html,body').animate({ scrollTop: 400 }, 1000);
    });

    //**************************************//


    $('#BrickDoctors #datatablesC_wrapper').remove();
    $('#BrickDoctors').prepend($('<table id="datatablesC" class="display"><thead><tr><th>MR CODE</th><th>Doctor Name</th><th>Class</th><th>Address</th></tr></thead><tbody>'));
    $.each(data.d, function (i, option) {
        $('#datatablesC').append($('<tr><td>' + option.Item2 + '</td><td>' + option.Item3 + '</td><td>' + option.Item4 + '</td><td>' + option.Item5 + '</td></tr>'));
    });
    $('#BrickDoctors').append($('</tbody></table>'));
    $('#datatablesC').dataTable({
        "sPaginationType": "full_numbers",
        "aaSorting": [[1, 'asc']],
        //"aLengthMenu": [[25, 50, 100, 200, -1], [25, 50, 100, 200, "All"]],
        "aLengthMenu": [[-1], ["All"]],
        "aoColumnDefs": [{ 'bSortable': false, 'aTargets': [0]}],
        "iDisplayLength": -1,
        "bJQueryUI": true

    });

    $('#dialog').jqmHide();
}

function OnChangeEbrick() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    drbrickEID = $('#ddlEBrick').val();
    $('#ddlABrick').val(drbrickEID);
    if ($('#Th2').hasClass('showing')) {
        OnChangeAbrick();
    }

}

function btnsave() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    myData = "";

    $.ajax({
        type: "POST",
        url: "MrDoctors.asmx/savedrcode",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: '',
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });


    $('#datatablesB_wrapper tbody tr').each(function () {
        var checked = $(this).find('.Hck').is(":checked");
        //$('input[type="checkbox"]').is(":checked");

        var G_drid = $(this).find('.Hck').val(); // DR_Id
        var G_drcode = $(this).find('.Htxt').val(); // DR_Code
        var G_drcodeold = $(this).find('.Htxtold').val(); // DR_Code
        var G_empid = $('#ddl4').val();


        myData = "{'Drcode':'" + G_drcode + "','Drid':'" + G_drid + "','empID':'" + G_empid + "','Checked':'" + checked + "','drcodeold':'" + G_drcodeold
        + "'}";

        $.ajax({
            type: "POST",
            url: "MrDoctors.asmx/saveMRDR",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessbtnsave,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    });

    OnChangeAbrick();


}
function onSuccessbtnsave(data, status) {
    $('#Mesbox p').remove();
    sdd = data.d.toString();
    $('#h12').val(sdd.toString());

    $('#Mesbox').append('<p>' + sdd + '</p>');

    
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

function setvalue() {

    $('#h2').val(-1);
    $('#h3').val(-1);
    $('#h4').val(-1);
    $('#h5').val(-1);
    $('#h6').val(-1);
}

function remo() {
    $('#h12').val('');
    $('#Th2').hide();
    $('#Th3').hide();
    $('#Th4').hide();
    $('#Th22').hide();
    $('#Mesbox p').remove();
}
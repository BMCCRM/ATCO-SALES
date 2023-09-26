// Global Variables
var EmployeeId = 0, DoctorId = 0, LevelId1 = 0, LevelId2 = 0, LevelId3 = 0, LevelId4 = 0, LevelId5 = 0, LevelId6 = 0, levelValue = 0, doctorLevel = 0, tempLevelId = 0,
    level1Value = 0, level2Value = 0, level3Value = 0, level4Value = 0, level5Value = 0, level6Value = 0, brickId = 0;
var CurrentUserLoginId = "", CurrentUserRole = "", glbVarLevelName = "", glbQualificationId = "", glbSpecialityId = "", glbClassId = "", glbProductId = "", MiddleName = "",
    Designation = "", Address1 = "", Address2 = "", MobileNumber2 = "", myData = "", value = "", name = "", levelName = "", modeValue = "", msg = "", mode = "";
var jsonObj = null;
var HierarchyLevel1 = null, HierarchyLevel2 = null, HierarchyLevel3 = null, HierarchyLevel4 = null, HierarchyLevel5 = null, HierarchyLevel6 = null;

// Page Load Event
function pageLoad() {

    $('#rowExistingQualification').hide();
    $('#rowExistingSpeciality').hide();
    $('#rowExistingProduct').hide();
    ClearFields();
    RetrieveAppConfig();
    /*
   

    // Clear Fields
    DefaultField();

    // Hide DropDownList
    HideHierarchy();

    // Retrieve Levels from AppConfig
    RetrieveAppConfig();

    // Fill DropDownLists    
    GetQualiification();
    GetSpecialiity();
    GetClass();
    GetProduct();*/

    $('#divConfirmation').jqm({ modal: true });
    $('#Divmessage').jqm({ modal: true });

    $('#divDoctorLocation').jqm({ modal: true });
 GetCurrentUser();
    // OnChange DropDownList
    $('#ddl1').change(OnChangeddl1);
    $('#ddl2').change(OnChangedddl2);
    $('#ddl3').change(OnChangedddl3);
    $('#ddl4').change(OnChangedddl4);
    $('#ddl5').change(OnChangedddl5);

    // Button Event
    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#btnOk').click(btnOkClicked);

    $('#divConfirmation').jqm({ modal: true });
    $('#Divmessage').jqm({ modal: true });

    $('#uploadify_button').uploadify({
        'swf': '../Scripts/Uploadify/uploadify.swf',
        'uploader': '../Handler/DoctorMasterList.ashx?Type=U',
        'width': '140',
        'height': '25',
        //'wmode': 'transparent',
        'onUploadSuccess': function (file, data, response) {
            //alert(response);
            $('#dialog').jqm({ modal: true });
            $('#dialog').jqm();
            $('#dialog').jqmShow();

            $.ajax({
                //url: "../Handler/DoctorMasterList.ashx?Type=" + 'PF' + '&FileName=' + file.name,
                url: "../Handler/DoctorMasterList.ashx?Type=" + 'PF' + '&FileName=' + data,
                contentType: "application/json; charset=utf-8",
                success: OnCompleteDownload,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                error: onError
            });

            $('#dialog').jqmHide();
        }
    });
    $(".uploadify-button-text").text("UPLOAD");
    $('#exportExcel').click(exportDoctorExcel);

    GetQualiification();

}


function DoctorLocationDetails(DoctorID) {

    // BEFORE SEND RESET POPOP VALS
    if (CurrentUserRole == 'admin') {
        $('#divNoLocationFound').show();

        $.ajax({
            url: "DoctorsService.asmx/GetDoctorsLocationDetails",
            data: JSON.stringify({ DoctorID: DoctorID }),
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data, status) {


                try {
                    if (data.d != "") {

                        var doctorDetails = (JSON.parse(data.d))[0];
                    } else {
                        alert('Sorry, No Location Details Found For Requested Doctor.');
                        return;
                    }

                } catch (e) {
                    $('#divNoLocationFound').show();
                    $('#divLocationDetails').hide();
                    return;
                }


                $('#divNoLocationFound').hide();
                $('#divLocationDetails').show();

                $('#lblDoctorName').attr("data-doctorID", doctorDetails.DoctorId);

                $('#lblDoctorName').text(doctorDetails.DoctorName);
 
                var morningMapLink = "https://www.google.com/maps?q=loc:" + doctorDetails.Latitude + "," + doctorDetails.Longitude + "&z=15";
                $('#mapAdressMorning').attr('href', morningMapLink);
                $('#divDoctorLocation').jqmShow();

            },
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError
        });

        return;
    }
    else {
        alert("You Don't Have Rights for this page.")
        $('#box').hide();
    }
}


function exportDoctorExcel() {

    window.open("../Handler/DoctorMasterList.ashx?Type=D");
};

function OnCompleteDownload(data, status) {
    var returndata = data;
    $('#dialog').jqmHide();
    alert(returndata);
}


function resetLocation(shift) {


    var doctorID = $('#lblDoctorName').attr("data-doctorID");
    var data = { DoctorID: doctorID, Shift: shift };
    if (confirm("Do You Really Want To Reset Selected Doctor's Location?")) {
        $.ajax({
            url: "DoctorsService.asmx/ResetDoctorLocationByID",
            data: JSON.stringify(data),
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data, status) {
                $('#divDoctorLocation').jqmHide();
                alert('Location Has Been Reset Successfully.');
            },
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError
        });

    }



}
// Hierarchical Components
function ShowHierarchy() {

    $('#col1').show();
    $('#col2').show();
    $('#col3').show();
    $('#col4').show();
    $('#col5').show();
    $('#col6').show();
}
function HideHierarchy() {

    $('#col1').hide();
    $('#col2').hide();
    $('#col3').hide();
    $('#col4').hide();
    $('#col5').hide();
    $('#col6').hide();
    $('#rowExistingQualification').hide();
    $('#rowExistingSpeciality').hide();
    $('#rowExistingProduct').hide();
}

// DropDownLists
function RetrieveAppConfig() {

    $.ajax({
        type: "POST",
        url: "AppConfiguration.asmx/GetHierarchyLevels",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetLevels,
        error: onError,
        cache: false
    });
}
function onSuccessGetLevels(data, status) {

    if (data.d != "") {
        debugger
        jsonObj = jsonParse(data.d);
        glbVarLevelName = jsonObj[0].SettingName;

        if (glbVarLevelName == "Level3") {

            HierarchyLevel3 = jsonObj[0].SettingValue;
            HierarchyLevel4 = jsonObj[1].SettingValue;
            HierarchyLevel5 = jsonObj[2].SettingValue;
            HierarchyLevel6 = jsonObj[3].SettingValue;
        }

        EnableHierarchyViaLevel();
    }
}
function EnableHierarchyViaLevel() {

    if (glbVarLevelName == "Level1") {

        ShowHierarchy();
        FillDropDownList();
    }
    if (glbVarLevelName == "Level2") {

        $('#col1').show();
        $('#col2').show();
        $('#col3').show();
        $('#col4').show();
        $('#col5').show();

        FillDropDownList();
    }
    if (glbVarLevelName == "Level3") {

        $('#col1').show();
        $('#col2').show();

        FillDropDownList();
    }
    if (glbVarLevelName == "Level4") {

        $('#col1').show();
        $('#col2').show();
        $('#col3').show();

        FillDropDownList();
    }
    if (glbVarLevelName == "Level5") {

        $('#col1').show();
        $('#col2').show();

        FillDropDownList();
    }
    if (glbVarLevelName == "Level6") {

        $('#col1').show();

        FillDropDownList();
    }
}
function FillDropDownList() {

    myData = "{'levelName':'" + glbVarLevelName + "'}";

    $.ajax({
        type: "POST",
        url: "DivisionalHierarchy.asmx/FillDropDownList",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: onSuccessFillDropDownList,
        error: onError,
        cache: false
    });
}
function onSuccessFillDropDownList(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        value = '-1';
        name = 'Select ' + HierarchyLevel3;
        $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl1").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        });

        DefaultDropDownListValue();
    }
}
function DefaultDropDownListValue() {

    if (glbVarLevelName == "Level1") {

        $("#ddl2").val("-1");
        $("#ddl3").val("-1");
        $("#ddl4").val("-1");
        $("#ddl5").val("-1");
        $("#ddl6").val("-1");
    }
    if (glbVarLevelName == "Level2") {

        $("#ddl2").val("-1");
        $("#ddl3").val("-1");
        $("#ddl4").val("-1");
        $("#ddl5").val("-1");
    }
    if (glbVarLevelName == "Level3") {

        $("#ddl2").val("-1");
        $("#ddl3").val("-1");
        $("#ddl4").val("-1");
    }
    if (glbVarLevelName == "Level4") {

        $("#ddl2").val("-1");
        $("#ddl3").val("-1");
    }
    if (glbVarLevelName == "Level5") {

        $("#ddl2").val("-1");
    }
    if (glbVarLevelName == "Level6") {

        $("#ddl1").val("-1");
    }
}

// OnChange DropDownList
function OnChangeddl1() {

    levelValue = $('#ddl1').val();
    myData = "";

    if (levelValue != -1) {

        if (glbVarLevelName == "Level1") {

            myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbVarLevelName + "'}";

            $.ajax({
                type: "POST",
                url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
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
        if (glbVarLevelName == "Level2") {

            myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbVarLevelName + "'}";

            $.ajax({
                type: "POST",
                url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
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
        if (glbVarLevelName == "Level3") {

            myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbVarLevelName + "'}";

            $.ajax({
                type: "POST",
                url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
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
        if (glbVarLevelName == "Level4") {

            myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbVarLevelName + "'}";

            $.ajax({
                type: "POST",
                url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
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
        if (glbVarLevelName == "Level5") {

            myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbVarLevelName + "'}";

            $.ajax({
                type: "POST",
                url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
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
    }
}
function onSuccessFillddl2(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        value = '-1';
        name = 'Select ' + HierarchyLevel4;
        $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl2").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        });
    }
}
function OnChangedddl2() {

    myData = "";
    levelName = "";

    if (glbVarLevelName == "Level1") {

        levelName = "Level2";
        myData = "{'parentLevelId':'" + $('#ddl2').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
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
    if (glbVarLevelName == "Level2") {

        levelName = "Level3";
        myData = "{'parentLevelId':'" + $('#ddl2').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
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
    if (glbVarLevelName == "Level3") {

        levelName = "Level4";
        myData = "{'parentLevelId':'" + $('#ddl2').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
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
    if (glbVarLevelName == "Level4") {

        levelName = "Level5";
        myData = "{'parentLevelId':'" + $('#ddl2').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
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
}
function onSuccessFillddl3(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        value = '-1';
        name = 'Select ' + HierarchyLevel5;
        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl3").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        });
    }
}
function OnChangedddl3() {

    myData = "";
    levelName = "";

    if (glbVarLevelName == "Level1") {

        levelName = "Level3";
        myData = "{'parentLevelId':'" + $('#ddl3').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
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
    if (glbVarLevelName == "Level2") {

        levelName = "Level4";
        myData = "{'parentLevelId':'" + $('#ddl3').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
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
    if (glbVarLevelName == "Level3") {

        levelName = "Level5";
        myData = "{'parentLevelId':'" + $('#ddl3').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
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
}
function onSuccessFillddl4(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        value = '-1';
        name = 'Select ' + HierarchyLevel6;
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        });
    }
}
function OnChangedddl4() {

    myData = "";
    levelName = "";

    if (glbVarLevelName == "Level1") {

        levelName = "Level4";
        myData = "{'parentLevelId':'" + $('#ddl4').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
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
    if (glbVarLevelName == "Level2") {

        levelName = "Level5";
        myData = "{'parentLevelId':'" + $('#ddl4').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
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
}
function onSuccessFillddl5(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        value = '-1';
        name = 'Select...';
        $("#ddl5").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl5").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        });
    }
}
function OnChangedddl5() {

    myData = "";
    levelName = "";

    if (glbVarLevelName == "Level1") {

        levelName = "Level5";
        myData = "{'parentLevelId':'" + $('#ddl5').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl6,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
}
function onSuccessFillddl6(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        document.getElementById('ddl6').innerHTML = "";

        value = '-1';
        name = 'Select...';
        $("#ddl6").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl6").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        });
    }
}

// OnPage Load Multiple Selection DropdownList
function GetQualiification() {

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetQualification",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddlQualification,
        error: onError,
        cache: false
    });
}
function FillddlQualification(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, tweet) {
            $("#ddlQualifications").append("<option value='" + jsonObj[i].QulificationId + "'>" + jsonObj[i].QualificationName + "</option>");
        });
    }

    GetSpecialiity();
}
function GetSpecialiity() {

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetSpeciality",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddlSpeciality,
        error: onError,
        cache: false
    });
}
function FillddlSpeciality(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, tweet) {
            $("#ddlSpecialities").append("<option value='" + jsonObj[i].SpecialityId + "'>" + jsonObj[i].SpecialiityName + "</option>");
        });
    }

    GetClass();
}
function GetClass() {

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetClass",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddlClass,
        error: onError,
        cache: false
    });
}
function FillddlClass(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, tweet) {
            $("#ddlClass").append("<option value='" + jsonObj[i].ClassId + "'>" + jsonObj[i].ClassName + "</option>");
        });
    }
    GetBricks();
}
function GetBricks() {

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GeBricks",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddlBricks,
        error: onError,
        cache: false
    });
}
function FillddlBricks(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        $("#ddlBrick").append("<option value='-1'>Select Brick</option>");
        $.each(jsonObj, function (i, tweet) {
            $("#ddlBrick").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        });
    }

   // GetProduct();
}
function GetProduct() {

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetProduct",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddlProduct,
        error: onError,
        cache: false
    });
}
function FillddlProduct(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, tweet) {
            $("#ddlProduct").append("<option value='" + jsonObj[i].ProductId + "'>" + jsonObj[i].ProductName + "</option>");
        });
    }
}

// Membership Authorization
function GetCurrentUser() {

    $.ajax({
        type: "POST",
        url: "CommonService.asmx/GetCurrentUser",
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
        cache: false
    });
}
function onSuccessGetCurrentUserRole(data, status) {

    if (data.d != "") {

        CurrentUserRole = data.d;
        modeValue = $('#hdnMode').val();

        if (modeValue == 'EditMode') {

            LoadForEditData();
        }
        else if (modeValue == 'DeleteMode') {

            LoadForDeleteData();
        }
    }
}

// LoadForEdit function bind onClick event from GridView1_RowDataBound method
function oGrid_Edit(sender) {
    $('#hdnMode').val("EditMode");
    glbVarDoctorId = sender.DoctorId;
    GetCurrentUser();
}
function LoadForEditData() {

    if (CurrentUserRole == 'admin') {

        $('#rowExistingQualification').show();
        $('#rowExistingSpeciality').hide();
        $('#rowExistingProduct').show();
        LoadingEditData();
    }
    else {

        msg = 'Access Denied!';

        $.fn.jQueryMsg({
            msg: msg,
            msgClass: 'error',
            fx: 'slide',
            speed: 200
        });
    }
}
function LoadingEditData() {

    myData = "{'doctorId':'" + glbVarDoctorId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetDoctor",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetDoctor,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetDoctor(data, status) {

    if (data.d != "") {

        $('#hdnMode').val("EditMode");
        ClearFields();
        jsonObj = jsonParse(data.d);

        if (jsonObj != null || jsonObj != "") {

            $('#txtFirstName').val(jsonObj[0].FirstName);

            if (jsonObj[0].LastName == "-") {

                $('#txtLastName').val("");
            }
            else {

                $('#txtLastName').val(jsonObj[0].LastName);
            }

            if (jsonObj[0].MiddleName == "-") {

                $('#txtMiddleName').val("");
            }
            else {

                $('#txtMiddleName').val(jsonObj[0].MiddleName);
            }

            $("#ddlGender").val(jsonObj[0].Gender);
            $('#ddlDesignation').val(jsonObj[0].DesignationId);
            $('#chkKol').attr("checked", jsonObj[0].KOL);
            $('#cboCountries').val(jsonObj[0].Country);
            $('#txtCity').val(jsonObj[0].City);
            $('#txtMobileNumber').val(jsonObj[0].MobileNumber1);
            $('#txtOfficeNumber').val(jsonObj[0].MobileNumber2);
            $('#chkActive').attr("checked", jsonObj[0].IsActive);
            $('#txtCurrentAddress').val(jsonObj[0].Address1);
            $('#txtPermenantAddress').val(jsonObj[0].Address2);
        
            $('#ddlDesignation').attr('disabled', 'disabled');
        }
    }

    GetQualificationById();
}
function GetQualificationById() {

    myData = "{'doctorId':'" + glbVarDoctorId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetQualificationById",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSucessGetQualificationById,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSucessGetQualificationById(data, status) {

    if (data.d != "") {

        $('#hdnMode').val("EditMode");
        jsonObj = jsonParse(data.d);

        if (jsonObj != null || jsonObj != "") {

            $('#txtExistingQualifications').removeAttr("readonly");
            $('#txtExistingQualifications').val("");
            var qualificationName = "";

            $.each(jsonObj, function (i, tweet) {

                if (jsonObj[0].DoctorId != -1) {

                    qualificationName = qualificationName + jsonObj[i].QualificationName + ' | ';
                }
            });

            $('#txtExistingQualifications').val(qualificationName);
            $('#txtExistingQualifications').attr("readonly", true);
       
            $('#ddlQualifications').attr('disabled', 'disabled');
        }

    }

    GetSpeacialityById();
}
function GetSpeacialityById() {

    myData = "{'doctorId':'" + glbVarDoctorId + "'}";

    $.ajax({
        type: "POST",
        //url: "DoctorsService.asmx/GetSpeacialityById",
        url: "DoctorsService.asmx/GetSpeacialityByIdNew",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetSpeacialityById,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetSpeacialityById(data, status) {

    if (data.d != "") {

        $('#hdnMode').val("EditMode");
        jsonObj = jsonParse(data.d);

        if (jsonObj != null || jsonObj != "") {

          //  $('#txtExistingSpecialities').removeAttr("readonly");
         //   $('#txtExistingSpecialities').val("");
          //  var specialityName = "";

            //$.each(jsonObj, function (i, tweet) {

            //    if (jsonObj[0].DoctorId != -1) {

            //        specialityName = specialityName + jsonObj[i].SpecialityName + ' | ';
            //    }
            //});
           
            $('#ddlSpecialities').val(jsonObj[0].SpecialityId);
            


            //$('#txtExistingSpecialities').val(specialityName);
           $('#txtExistingSpecialities').attr("readonly", true);

        }
    }

    GetClassById();
}
function GetClassById() {

    myData = "{'doctorId':'" + glbVarDoctorId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetClassById",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetClassById,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetClassById(data, status) {

    if (data.d != "") {

        $('#hdnMode').val("EditMode");
        jsonObj = jsonParse(data.d);

        if (jsonObj != null || jsonObj != "") {

            $('#ddlClass').val(jsonObj[0].ClassId);
        }
    }

    $('#ddlClass').attr('disabled', 'disabled');
    GetDoctorBrick();
    //GetProductById();
}
function GetProductById() {

    myData = "{'doctorId':'" + glbVarDoctorId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetProductById",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetProductById,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetProductById(data, status) {

    if (data.d != "") {

        $('#hdnMode').val("EditMode");
        jsonObj = jsonParse(data.d);

        if (jsonObj != null || jsonObj != "") {

            $('#txtExistingProducts').removeAttr("readonly");
            $('#txtExistingProducts').val("");
            var productName = "";

            $.each(jsonObj, function (i, tweet) {

                if (jsonObj[0].DoctorId != -1) {

                    productName = productName + jsonObj[i].ProductName + ' | ';
                }
            });

            $('#txtExistingProducts').val(productName);
            $('#txtExistingProducts').attr("readonly", true);
        }
    }

    GetDoctorBrick();
   // GetDoctorHierarchyLevel();
}
function GetDoctorHierarchyLevel() {

    myData = "{'doctorId':'" + glbVarDoctorId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetDoctorHierarchyLevel",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetDoctorHierarchyLevel,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetDoctorHierarchyLevel(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (glbVarLevelName == "Level1") {

        }
        if (glbVarLevelName == "Level2") {

        }
        if (glbVarLevelName == "Level3") {

            LevelId3 = jsonObj[0].Level3LevelId;
            LevelId4 = jsonObj[0].Level4LevelId;

            $('#ddl1').val(LevelId3);

            myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbVarLevelName + "'}";

            $.ajax({
                type: "POST",
                url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessShowFillddl2,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        if (glbVarLevelName == "Level4") {

        }
        if (glbVarLevelName == "Level5") {

        }
        if (glbVarLevelName == "Level6") {

        }
    }
}
function onSuccessShowFillddl2(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != null || jsonObj != "") {

            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            value = '-1';
            name = 'Select ' + HierarchyLevel4;
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });

            $('#ddl2').val(LevelId4);
        }
    }

    GetDoctorBrick();
}
function GetDoctorBrick() {

    myData = "{'doctorId':'" + glbVarDoctorId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetDoctorBrick",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetDoctorBrick,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetDoctorBrick(data, status) {

    if (data.d != "") {

        $('#hdnMode').val("EditMode");
        jsonObj = jsonParse(data.d);

        if (jsonObj != null || jsonObj != "") {

            $('#ddlBrick').val(jsonObj[0].LevelId);
        }
    }
}

// LoadForDelete function bind onClick event from GridView1_RowDataBound method
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    glbVarDoctorId = sender.DoctorId;
    GetCurrentUser();
}
function LoadForDeleteData() {

    if (CurrentUserRole == 'admin') {

        $('#divConfirmation').jqmShow();
    }
    else {

        msg = 'Access Denied!';

        $.fn.jQueryMsg({
            msg: msg,
            msgClass: 'error',
            fx: 'slide',
            speed: 200
        });
    }
}

//   Button Click Events 
function btnSaveClicked() {

    var isValidated = $("#form1").validate({
        rules: {
            txtFirstName: {
                required: true,
                alpha: true
            },
            txtMiddleName: {
                alpha: true
            },
            txtLastName: {
                required: true,
                alpha: true
            },
            txtCity: {
                required: true,
                alpha: true
            },
            txtMobileNumber: {
                required: true
            }
        }
    });

    if (!$("#form1").valid()) {

        return false;
    }

    mode = $('#hdnMode').val();
    DefaultData();

    if (mode === "") {

        mode = "AddMode";
    }

    if (mode === "AddMode") {

        SaveData();
    }
    else if (mode === "EditMode") {

        UpdateData();
    }
    else {

        return false;
    }

    return false;
}
function btnCancelClicked() {

    $('#hdnMode').val("AddMode");
    ClearFields();
    $('#rowExistingQualification').hide();
    $('#rowExistingSpeciality').hide();
    $('#rowExistingProduct').hide();
    ajaxCompleted();
    $("#btnRefresh").trigger('click');
    return false;
}
function btnYesClicked() {

    myData = "{'doctorId':'" + glbVarDoctorId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/DeleteDoctor",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        complete: ajaxCompleted,
        beforeSend: startingAjax,
        cache: false
    });

    return false;
}
function btnNoClicked() {

    $('#divConfirmation').jqmHide();
    $('#hdnMode').val("AddMode");
    ClearFields();
    $('#rowExistingQualification').hide();
    $('#rowExistingSpeciality').hide();
    $('#rowExistingProduct').hide();
    ajaxCompleted();
    return false;
}
function btnOkClicked() {

    $('#Divmessage').jqmHide();
    $('#hdnMode').val("AddMode");
    $("#btnRefresh").trigger('click');
    ClearFields();
    ajaxCompleted();
    return false;
}

// Functions
function DefaultData() {

    MiddleName = $('#txtMiddleName').val();
    MiddleName = $.trim(MiddleName);
    Address1 = $('#txtCurrentAddress').val();
    Address1 = $.trim(Address1);
    Address2 = $('#txtPermenantAddress').val();
    Address2 = $.trim(Address2);
    MobileNumber2 = $('#txtOfficeNumber').val();
    MobileNumber2 = $.trim(MobileNumber2);

    if (MiddleName == "") {

        MiddleName = "-";
    }

    if (Address1 == "") {

        Address1 = "-";
    }

    if (Address2 == "") {

        Address2 = "-";
    }

    if (MobileNumber2 == "") {

        MobileNumber2 = "-";
    }
}
function SaveData() {

    level1Value = $('#ddl1').val();
    level2Value = $('#ddl2').val();
    level3Value = $('#ddl3').val();
    level4Value = $('#ddl4').val();
    level5Value = $('#ddl5').val();
    level6Value = $('#ddl6').val();
    brickId = $('#ddlBrick').val();
    Designation = $('#ddlDesignation').val();

    if (level1Value == null) {

        level1Value = -1;
    }

    if (level2Value == null) {

        level2Value = -1;
    }

    if (level3Value == null) {

        level3Value = -1;
    }

    if (level4Value == null) {

        level4Value = -1;
    }

    if (level5Value == null) {

        level5Value = -1;
    }

    if (level6Value == null) {

        level6Value = -1;
    }


    //umer work, doctor not working properly. error occured

    //glbQualificationId = $('#ddlQualifications').val();
    //glbQualificationId = $('#ddlQualifications').val();
    //glbQualificationId = $('#ddlQualifications').val();
    //glbQualificationId = $('#ddlQualifications').val();
    //glbQualificationId = $('#ddlQualifications').val();
    //glbQualificationId = $('#ddlQualifications').val();
    //glbQualificationId = $('#ddlQualifications').val();
    //glbQualificationId = $('#ddlQualifications').val();

    glbQualificationId = $('#ddlQualifications').val();
    glbSpecialityId = $('#ddlSpecialities').val();
    glbClassId = $('#ddlClass').val();
    //glbProductId = $('#ddlProduct').val();
    glbProductId = -1;
    myData = "";
    msg = "";
    debugger
    if (glbVarLevelName == "Level1") {
        
        //if (level1Value != -1) {
        //    if (level2Value != -1) {
                if (brickId != -1) {
                    if (glbClassId != -1) {

                        myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName
                            + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation + "','kol':'" + "false"
                            + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val()
                            + "','officeNumber':'" + MobileNumber2 + "','currentAddress':'" + Address1 + "','permenantAddress':'" + Address2
                            + "','isActive':'" + $('#chkActive').attr("checked") + "','qualificationId':'" + glbQualificationId + "','specialityId':'" + glbSpecialityId
                            + "','classId':'" + glbClassId + "','productId':'" + glbProductId +
                        //','level1Id':'" + 0 + "','level2Id':'" + 0 + "','level3Id':'" + level1Value
                            //+ "','level4Id':'" + level2Value + "','level5Id':'" + 0 + "','level6Id':'" + 0
                             "','levelName':'" + glbVarLevelName
                            + "','brickId':'" + brickId + "'}";
                    }
                    else {

                        alert('Class must be selected!');
                        return false;
                    }
                }
                else {

                    alert('Brick must be selected!');
                    return false;
                }
            //}
        //    else {

        //        alert('Region must be selected!');
        //        return false;
        //    }
        //}
        //else {

        //    alert('Hierarchy must be selected!');
        //    return false;
        //}
    }

    if (myData != "") {
        debugger
        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/InsertDoctor",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccess,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
}
function UpdateData() {

    level1Value = $('#ddl1').val();
    level2Value = $('#ddl2').val();
    level3Value = $('#ddl3').val();
    level4Value = $('#ddl4').val();
    level5Value = $('#ddl5').val();
    level6Value = $('#ddl6').val();
    brickId = $('#ddlBrick').val();

    var sadas = $('#ddlBrick').val();

    Designation = $('#ddlDesignation').val();

    if (level1Value == null) {

        level1Value = -1;
    }

    if (level2Value == null) {

        level2Value = -1;
    }

    if (level3Value == null) {

        level3Value = -1;
    }

    if (level4Value == null) {

        level4Value = -1;
    }

    if (level5Value == null) {

        level5Value = -1;
    }

    if (level6Value == null) {

        level6Value = -1;
    }

    glbQualificationId = $('#ddlQualifications').val();
    glbSpecialityId = $('#ddlSpecialities').val();
    glbClassId = $('#ddlClass').val();
    //  glbProductId = $('#ddlProduct').val();
    glbProductId = -1;
    myData = "";
    msg = "";

    if (glbVarLevelName == "Level1") {

        //if (level1Value != -1) {
        //if (level2Value != -1) {
        // COMMENT BY RAHIM
        //if (brickId != -1) {
        // COMMENT BY RAHIM
        if (glbClassId != -1) {

            if (glbQualificationId != null && glbSpecialityId != null && glbProductId != null) {

                myData = "{'doctorId':'" + glbVarDoctorId + "','firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                        + "','middleName':'" + MiddleName + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation
                        + "','kol':'false','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val()
                        + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','officeNumber':'" + MobileNumber2
                        + "','currentAddress':'" + $('#txtCurrentAddress').val() + "','permenantAddress':'" + Address2
                        + "','isActive':'" + $('#chkActive').attr("checked") + "','qualificationId':'" + glbQualificationId + "','specialityId':'" + glbSpecialityId
                        + "','classId':'" + glbClassId + "','productId':'" + glbProductId + "','level1Id':'" + 0 + "','level2Id':'" + 0 + "','level3Id':'" + level1Value
                        + "','level4Id':'" + level2Value + "','level5Id':'" + 0 + "','level6Id':'" + 0 + "','levelName':'" + glbVarLevelName
                        + "','type':'" + 1 + "','brickId':'" + brickId + "'}";
            }
            else if (glbQualificationId == null && glbSpecialityId == null && glbProductId == null) {

                myData = "{'doctorId':'" + glbVarDoctorId + "','firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                        + "','middleName':'" + MiddleName + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation
                        + "','kol':'false','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val()
                        + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','officeNumber':'" + MobileNumber2
                        + "','currentAddress':'" + $('#txtCurrentAddress').val() + "','permenantAddress':'" + Address2
                        + "','isActive':'" + $('#chkActive').attr("checked") + "','qualificationId':'" + 0 + "','specialityId':'" + 0
                        + "','classId':'" + glbClassId + "','productId':'" + 0 + "','level1Id':'" + 0 + "','level2Id':'" + 0 + "','level3Id':'" + level1Value
                        + "','level4Id':'" + level2Value + "','level5Id':'" + 0 + "','level6Id':'" + 0 + "','levelName':'" + glbVarLevelName
                        + "','type':'" + 1 + "','brickId':'" + brickId + "'}";
            }
            else if (glbQualificationId != null && glbSpecialityId == null && glbProductId == null) {

                myData = "{'doctorId':'" + glbVarDoctorId + "','firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                        + "','middleName':'" + MiddleName + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation
                        + "','kol':'" + $('#chkKol').attr("checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val()
                        + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','officeNumber':'" + MobileNumber2
                        + "','currentAddress':'" + $('#txtCurrentAddress').val() + "','permenantAddress':'" + Address2
                        + "','isActive':'" + $('#chkActive').attr("checked") + "','qualificationId':'" + glbQualificationId + "','specialityId':'" + 0
                        + "','classId':'" + glbClassId + "','productId':'" + 0 + "','level1Id':'" + 0 + "','level2Id':'" + 0 + "','level3Id':'" + level1Value
                        + "','level4Id':'" + level2Value + "','level5Id':'" + 0 + "','level6Id':'" + 0 + "','levelName':'" + glbVarLevelName
                        + "','type':'" + 1 + "','brickId':'" + brickId + "'}";
            }
            else if (glbQualificationId == null && glbSpecialityId == null && glbProductId != null) {

                myData = "{'doctorId':'" + glbVarDoctorId + "','firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                        + "','middleName':'" + MiddleName + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation
                        + "','kol':'false','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val()
                        + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','officeNumber':'" + MobileNumber2
                        + "','currentAddress':'" + $('#txtCurrentAddress').val() + "','permenantAddress':'" + Address2
                        + "','isActive':'" + $('#chkActive').attr("checked") + "','qualificationId':'" + 0 + "','specialityId':'" + 0
                        + "','classId':'" + glbClassId + "','productId':'" + glbProductId + "','level1Id':'" + 0 + "','level2Id':'" + 0 + "','level3Id':'" + level1Value
                        + "','level4Id':'" + level2Value + "','level5Id':'" + 0 + "','level6Id':'" + 0 + "','levelName':'" + glbVarLevelName
                        + "','type':'" + 1 + "','brickId':'" + brickId + "'}";
            }
            else if (glbQualificationId != null && glbSpecialityId == null && glbProductId != null) {

                myData = "{'doctorId':'" + glbVarDoctorId + "','firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                        + "','middleName':'" + MiddleName + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation
                        + "','kol':'false','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val()
                        + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','officeNumber':'" + MobileNumber2
                        + "','currentAddress':'" + $('#txtCurrentAddress').val() + "','permenantAddress':'" + Address2
                        + "','isActive':'" + $('#chkActive').attr("checked") + "','qualificationId':'" + glbQualificationId + "','specialityId':'" + 0
                        + "','classId':'" + glbClassId + "','productId':'" + glbProductId + "','level1Id':'" + 0 + "','level2Id':'" + 0 + "','level3Id':'" + level1Value
                        + "','level4Id':'" + level2Value + "','level5Id':'" + 0 + "','level6Id':'" + 0 + "','levelName':'" + glbVarLevelName
                        + "','type':'" + 1 + "','brickId':'" + brickId + "'}";
            }
            else if (glbQualificationId == null && glbSpecialityId != null && glbProductId == null) {

                myData = "{'doctorId':'" + glbVarDoctorId + "','firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                        + "','middleName':'" + MiddleName + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation
                        + "','kol':'false','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val()
                        + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','officeNumber':'" + MobileNumber2
                        + "','currentAddress':'" + $('#txtCurrentAddress').val() + "','permenantAddress':'" + Address2
                        + "','isActive':'" + $('#chkActive').attr("checked") + "','qualificationId':'" + 0 + "','specialityId':'" + glbSpecialityId
                        + "','classId':'" + glbClassId + "','productId':'" + 0 + "','level1Id':'" + 0 + "','level2Id':'" + 0 + "','level3Id':'" + level1Value
                        + "','level4Id':'" + level2Value + "','level5Id':'" + 0 + "','level6Id':'" + 0 + "','levelName':'" + glbVarLevelName
                        + "','type':'" + 1 + "','brickId':'" + brickId + "'}";
            }
            else if (glbQualificationId != null && glbSpecialityId != null && glbProductId == null) {

                myData = "{'doctorId':'" + glbVarDoctorId + "','firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                        + "','middleName':'" + MiddleName + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation
                        + "','kol':'false','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val()
                        + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','officeNumber':'" + MobileNumber2
                        + "','currentAddress':'" + $('#txtCurrentAddress').val() + "','permenantAddress':'" + Address2
                        + "','isActive':'" + $('#chkActive').attr("checked") + "','qualificationId':'" + glbQualificationId + "','specialityId':'" + glbSpecialityId
                        + "','classId':'" + glbClassId + "','productId':'" + 0 + "','level1Id':'" + 0 + "','level2Id':'" + 0 + "','level3Id':'" + level1Value
                        + "','level4Id':'" + level2Value + "','level5Id':'" + 0 + "','level6Id':'" + 0 + "','levelName':'" + glbVarLevelName
                        + "','type':'" + 1 + "','brickId':'" + brickId + "'}";
            }
            else if (glbQualificationId == null && glbSpecialityId != null && glbProductId != null) {

                myData = "{'doctorId':'" + glbVarDoctorId + "','firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                        + "','middleName':'" + MiddleName + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation
                        + "','kol':'false','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val()
                        + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','officeNumber':'" + MobileNumber2
                        + "','currentAddress':'" + $('#txtCurrentAddress').val() + "','permenantAddress':'" + Address2
                        + "','isActive':'" + $('#chkActive').attr("checked") + "','qualificationId':'" + 0 + "','specialityId':'" + glbSpecialityId
                        + "','classId':'" + glbClassId + "','productId':'" + glbProductId + "','level1Id':'" + 0 + "','level2Id':'" + 0 + "','level3Id':'" + level1Value
                        + "','level4Id':'" + level2Value + "','level5Id':'" + 0 + "','level6Id':'" + 0 + "','levelName':'" + glbVarLevelName
                        + "','type':'" + 1 + "','brickId':'" + brickId + "'}";
            }
        }
        else {

            alert('Class must be selected!');
            return false;
        }
    }
    // COMMENT BY RAHIM
    //else {

    //    alert('Brick must be selected!');
    //    return false;
    //} 
    //COMMENT BY RAHIM
    //}
    //else {

    //    alert('Region must be selected!');
    //    return false;
    //}
    //}
    //else {

    //    alert('Hierarchy must be selected!');
    //    return false;
    //}
}

if (myData != "") {

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/UpdateDoctor",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function onSuccess(data, status) {

    var msg = '';

    if (data.d == "OK") {

        var mode = $('#hdnMode').val();

        if (mode === "AddMode") {

            msg = 'Data inserted succesfully!';
        }
        else if (mode === "EditMode") {

            msg = 'Data updated succesfully!';
        }
        else if (mode === "DeleteMode") {

            msg = 'Data deleted succesfully!';
            $('#divConfirmation').jqmHide();
        }

        ClearFields();
        $('#hdnMode').val("");

        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
    }
    else if (data.d == "Not able to delete this record due to linkup.") {

        $('#divConfirmation').jqmHide();
        msg = 'Not able to delete this record due to linkup.';
        
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
    }
}
function onError(request, status, error) {

    $('#divConfirmation').hide();
    msg = 'Error is occured';

    $('#hlabmsg').append(msg);
    $('#Divmessage').jqmShow();
}
function startingAjax() {

    $('#imgLoading').show();
}
function ajaxCompleted() {

    $('#imgLoading').hide();
}
function DefaultField() {

    document.getElementById('ddl1').innerHTML = "";
    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";
    $('#txtExistingQualifications').val("");
    $('#txtExistingSpecialities').val("");
    $('#txtExistingProducts').val("");
    $('#txtDoctorCode').val("");
    $('#ddlBrick').val("-1");
    $('#txtFirstName').val("");
    $('#txtLastName').val("");
    $('#txtMiddleName').val("");
    $('#ddlGender').val("0");
    $('#ddlDesignation').val("-1");
    $('#chkKol').attr("checked", true);
    $('#cboCountries').val("PK");
    $('#txtCity').val("");
    $('#txtMobileNumber').val("");
    $('#txtOfficeNumber').val("");
    $('#txtCurrentAddress').val("");
    $('#txtPermenantAddress').val("");
    $('#chkActive').attr("checked", true);
}
function ClearFields() {

    $('#ddl1').val("-1");
    $('#ddl2').val("-1");
    $('#ddl3').val("-1");
    $('#ddl4').val("-1");
    $('#ddl5').val("-1");
    $('#ddl6').val("-1");
    $('#txtExistingQualifications').val("");
    $('#txtExistingSpecialities').val("");
    $('#txtExistingProducts').val("");
    $('#txtDoctorCode').val("");
    $('#ddlBrick').val("-1");
    $('#txtFirstName').val("");
    $('#txtLastName').val("");
    $('#txtMiddleName').val("");
    $('#ddlGender').val("0");
    $('#ddlDesignation').val("-1");
    $('#chkKol').attr("checked", true);
    $('#cboCountries').val("PK");
    $('#txtCity').val("");
    $('#txtMobileNumber').val("");
    $('#txtOfficeNumber').val("");
    $('#txtCurrentAddress').val("");
    $('#txtPermenantAddress').val("");
    $('#chkActive').attr("checked", true);
}
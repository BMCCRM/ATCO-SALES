// Private Members
var EmployeeId = 0, SystemUserId = 0, DesignationId = 0, RoleTypeId = 0, Manager3Id = 0, Manager4Id = 0, Manager5Id = 0, levelValue = 0, level1Id = 0, level2Id = 0,
    level3Id = 0, level4Id = 0, level5Id = 0, level6Id = 0, level1Value = 0, level2Value = 0, level3Value = 0, level4Value = 0, level5Value = 0, level6Value = 0,
    employee1Id = 0, employee2Id = 0, employee3Id = 0, employee4Id = 0, employee5Id = 0, employee6Id = 0, employeeType = 0, issample = 0, depor = 0, EmployeeCode = 0;
roleId = 0; gdbid = 0;
var CurrentUserLoginId = "", CurrentUserRole = "", EditableDataLoginId = "", EditableDataRole = "", glbVarLevelName = "",
    CurrentLevelId = 0, myData = "", jsonObj = "", modeValue = "", value = "", name = "", msg = "", MiddleName = "", Email = "",
    ContactNumber1 = "", ContactNumber2 = "", Address1 = "", Address2 = "", Remarks = "", mode = "";
var HierarchyLevel1 = null, HierarchyLevel2 = null, HierarchyLevel3 = null, HierarchyLevel4 = null, HierarchyLevel5 = null, HierarchyLevel6 = null;
var designation = '';
var designation2 = '';
var Flag = 0;
var FlagForExist = 0;
// Private Functions

// Fill Employee Designation Defualt
function FillDesignation() {

    myData = "{'level':'0'}";

}
function onSuccessFillDesignation(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        document.getElementById('ddlDesignation').innerHTML = "";

        value = '-1';
        name = 'Select Designation';
        $("#ddlDesignation").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddlDesignation").append("<option value='" + jsonObj[i].DesignationId + "'>" + jsonObj[i].DesignationName + "</option>");
        });
    }

}


// Hierarchy Authentication
function IsAuthenticate() {

    $('#hdnMode').val("AuthorizeMode");
    GetCurrentUser();
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

    GetEditableDataLoginId();
}
function GetEditableDataLoginId() {

    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/GetEmployee",
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

    GetEditableDataRole();
}
function GetEditableDataRole() {

    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/GetEditableDataRole",
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

        if (glbVarLevelName == "Level1") {

            HierarchyLevel1 = jsonObj[0].SettingValue;
            HierarchyLevel2 = jsonObj[1].SettingValue;
            HierarchyLevel3 = jsonObj[2].SettingValue;
            HierarchyLevel4 = jsonObj[3].SettingValue;
            HierarchyLevel5 = jsonObj[4].SettingValue;
            HierarchyLevel6 = jsonObj[5].SettingValue;
        }
        if (glbVarLevelName == "Level2") {

            HierarchyLevel2 = jsonObj[0].SettingValue;
            HierarchyLevel3 = jsonObj[1].SettingValue;
            HierarchyLevel4 = jsonObj[2].SettingValue;
            HierarchyLevel5 = jsonObj[3].SettingValue;
            HierarchyLevel6 = jsonObj[4].SettingValue;
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
}
function EnableHierarchyViaLevel() {
    if (glbVarLevelName == "Level1") {

        if (CurrentUserRole == 'admin') {

            $('#lblGeographicalHierarchy').show();
            $('#col1').show(); $('#col1').children().eq(0).text(HierarchyLevel1); $('#col11').children().eq(0).text(HierarchyLevel1 + " Manager");
            $('#col2').show(); $('#col2').children().eq(0).text(HierarchyLevel2); $('#col22').children().eq(0).text(HierarchyLevel2 + " Manager");
            $('#col3').show(); $('#col3').children().eq(0).text(HierarchyLevel3); $('#col33').children().eq(0).text(HierarchyLevel3 + " Manager");
            $('#col4').show(); $('#col4').children().eq(0).text(HierarchyLevel4); $('#col44').children().eq(0).text(HierarchyLevel4 + " Manager");
            $('#col5').show(); $('#col5').children().eq(0).text(HierarchyLevel5); $('#col55').children().eq(0).text(HierarchyLevel5 + " Manager");
            $('#col6').show(); $('#col6').children().eq(0).text(HierarchyLevel6); $('#col66').children().eq(0).text(HierarchyLevel6 + " Manager");
            FillDropDownList();
        }
    }
    if (glbVarLevelName == "Level2") {

        if (CurrentUserRole == 'admin') {

            $('#lblGeographicalHierarchy').show();
            $('#col1').show(); $('#col1').children().eq(0).text(HierarchyLevel2); $('#col11').children().eq(0).text(HierarchyLevel2 + " Manager");
            $('#col2').show(); $('#col2').children().eq(0).text(HierarchyLevel3); $('#col22').children().eq(0).text(HierarchyLevel3 + " Manager");
            $('#col3').show(); $('#col3').children().eq(0).text(HierarchyLevel4); $('#col33').children().eq(0).text(HierarchyLevel4 + " Manager");
            $('#col4').show(); $('#col3').children().eq(0).text(HierarchyLevel4); $('#col44').children().eq(0).text(HierarchyLevel5 + " Manager");
            $('#col5').show(); $('#col5').children().eq(0).text(HierarchyLevel6); $('#col55').children().eq(0).text(HierarchyLevel6 + " Manager");
            FillDropDownList();
        }
    }
    if (glbVarLevelName == "Level3") {

        if (CurrentUserRole == 'admin') {

            $('#lblGeographicalHierarchy').show();
            $('#col1').show(); $('#col1').children().eq(0).text(HierarchyLevel3); $('#col11').children().eq(0).text(HierarchyLevel3 + " Manager");
            $('#col2').show(); $('#col2').children().eq(0).text(HierarchyLevel4); $('#col22').children().eq(0).text(HierarchyLevel4 + " Manager");
            $('#col3').show(); $('#col3').children().eq(0).text(HierarchyLevel5); $('#col33').children().eq(0).text(HierarchyLevel5 + " Manager");
            $('#col4').show(); $('#col4').children().eq(0).text(HierarchyLevel6); $('#col44').children().eq(0).text(HierarchyLevel6 + " Manager");
            FillDropDownList();
        }
    }
}
function FillDropDownList() {
    debugger
    myData = "{'levelName':'" + glbVarLevelName + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/FilterDropDownList",
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
            name = 'Select ' + HierarchyLevel1;
            $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl1").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
        }
        if (glbVarLevelName == "Level2") {

            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";

            value = '-1';
            name = 'Select ' + HierarchyLevel2;
            $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl1").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
        }
        if (glbVarLevelName == "Level3") {

            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";

            value = '-1';
            name = 'Select ' + HierarchyLevel3;
            $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl1").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
        }

        FillSystemRole();
    }
}
function FillSystemRole() {

    debugger
    $.ajax({
        type: "POST",
        url: "CommonService.asmx/GetSystemRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessFillSystemRole,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessFillSystemRole(data, status) {
    debugger
    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        document.getElementById('ddlRole').innerHTML = "";

        value = '-1';
        name = 'Sales Force Team';
        $("#ddlRole").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddlRole").append("<option value='" + jsonObj[i].RoleId + "'>" + jsonObj[i].RoleName + "</option>");
        });
    }
    GetCities();
}

// Hierarchy Enable / Disable
function ShowHierarchy() {

    $('#lblGeographicalHierarchy').show();
    $('#col1').show();
    $('#col2').show();
    $('#col3').show();
    $('#col4').show();
    $('#col5').show();
    $('#col6').show();
}
function HideHierarchy() {

    $('#lblGeographicalHierarchy').hide();
    $('#col1').hide();
    $('#col2').hide();
    $('#col2').hide();
    $('#col3').hide();
    $('#col4').hide();
    $('#col5').hide();
    $('#col6').hide();
    $('#lblUserHierarchy').hide();
    $('#col11').hide();
    $('#col22').hide();
    $('#col33').hide();
    $('#col44').hide();
    $('#col55').hide();
    $('#col66').hide();
    $('#colType').hide();
    $('#Coldepot').hide();
    $('#Coldepot1').hide();
}

// Modes
function CheckAuthorize() {

    RetrieveAppConfig();
}

//Today
function LoadForEditData() {

    msg = "";

    if (RoleTypeId != 1 && RoleTypeId != 2 && RoleTypeId != 3 && RoleTypeId != 4 && RoleTypeId != 5 && RoleTypeId != 6) {

        HideHierarchy();



    }

    $('#hdnMode').val("EditMode");
    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/GetEmployee",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetEmployees,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

// Save Record(s)
function DefaultData() {

    MiddleName = $('#txtMiddleName').val();
    MiddleName = $.trim(MiddleName);

    ContactNumber1 = $('#txtContactNumber1').val();
    ContactNumber1 = $.trim(ContactNumber1);

    ContactNumber2 = $('#txtContactNumber2').val();
    ContactNumber2 = $.trim(ContactNumber2);

    Address1 = $('#txtPermenantAddress').val();
    Address1 = $.trim(Address1);

    Address2 = $('#txtCurrentAddress').val();
    Address2 = $.trim(Address2);

    Email = $('#txtEmail').val();
    Email = $.trim(Email);

    Remarks = $('#txtRemarks').val();
    Remarks = $.trim(Remarks);


    EmployeeCode = $('#txtEmpCode').val();
    EmployeeCode = $.trim(EmployeeCode);


    if ($('#txtGDBID').val() != "") {
        gdbid = $('#txtGDBID').val();
        gdbid = $.trim(gdbid);
    }

    if (MiddleName == "") {

        MiddleName = "-";
    }

    if (ContactNumber1 == "") {

        ContactNumber1 = "-";
    }

    if (ContactNumber2 == "") {

        ContactNumber2 = "-";
    }

    if (Address1 == "") {

        Address1 = "-";
    }

    if (Address2 == "") {

        Address2 = "-";
    }

    if (Email == "") {

        Email = "-";
    }

    if (Remarks == "") {

        Remarks = "-";
    }
}
function SaveData() {
    FlagForExist = 0;
    //alert("save data");
    debugger
    level1Value = $('#ddl1').val();
    level2Value = $('#ddl2').val();
    level3Value = $('#ddl3').val();
    level4Value = $('#ddl4').val();
    level5Value = $('#ddl5').val();
    level6Value = $('#ddl6').val();
    employee1Id = $('#ddl11').val();
    employee2Id = $('#ddl22').val();
    employee3Id = $('#ddl33').val();
    employee4Id = $('#ddl44').val();
    employee5Id = $('#ddl55').val();
    employee6Id = $('#ddl66').val();
    employeeType = 0;
    roleId = $('#ddlRole').val();
    depor = $('#dlDepot').val();

    var password = $('#txtPass').val().replace(/ +/g, '');
    if (level6Value != -1 || level6Value != null) {
        employeeType = $('#ddlType').val();
    }
    myData = "";

    if (glbVarLevelName == "Level3" || glbVarLevelName == "Level2" || glbVarLevelName == "Level1") {
        if (level1Value == -1) {

            if (roleId == -1) {

                msg = 'Must Select Either Geographical Hierarchy OR Role!';
                $('#hlabmsg').text(msg);
                $('#Divmessage').jqmShow();
                FlagForExist = 1;


                return false;
            }
            else {
                myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                            + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val() + "','appointmentDate':'" + $('#txtAppointmentDate').val()
                            + "','gender':'" + $('#ddlGender').val() + "','designation':'" + $('#ddlDesignation').val() + "','employeeType':'" + 0
                            + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val()
                            + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1
                            + "','contactNumber2':'" + ContactNumber2 + "','email':'" + Email + "','currentAddress':'" + Address2
                            + "','permenantAddress':'" + Address1 + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + 0 + "','level3':'" + level1Value
                            + "','level4':'" + 0 + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + 0 + "','levelName': '" + glbVarLevelName
                            + "','type':'" + 0 + "','roleId':'" + roleId + "','depot':'" + "" + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid
                            + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                            + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                            + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','password':'" + password + "'}";
            }
        }
        else if (level1Value != -1 && level2Value == -1 && employee1Id == -1) {
            if (glbVarLevelName == "Level1") {
                myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                 + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val() + "','appointmentDate':'" + $('#txtAppointmentDate').val()
                 + "','gender':'" + $('#ddlGender').val() + "','designation':'" + $('#ddlDesignation').val() + "','employeeType':'" + 0
                 + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
                 + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
                 + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
                 + "','remarks':'" + Remarks + "','level1':'" + level1Value + "','level2':'" + 0 + "','level3':'" + 0 + "','level4':'" + 0
                 + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + 0 + "','levelName': '" + glbVarLevelName + "','type':'Level1','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid
                             + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                             + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                             + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','password':'" + password + "'}";
            }
            if (glbVarLevelName == "Level2") {
                myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val() + "','appointmentDate':'" + $('#txtAppointmentDate').val()
                + "','gender':'" + $('#ddlGender').val() + "','designation':'" + $('#ddlDesignation').val() + "','employeeType':'" + 0
                + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
                + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
                + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
                + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + level1Value + "','level3':'" + 0 + "','level4':'" + 0
                + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + 0 + "','levelName': '" + glbVarLevelName + "','type':'Level2','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid
                            + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                            + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                            + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','password':'" + password + "'}";

            }
            if (glbVarLevelName == "Level3") {
                myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
               + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val() + "','appointmentDate':'" + $('#txtAppointmentDate').val()
               + "','gender':'" + $('#ddlGender').val() + "','designation':'" + $('#ddlDesignation').val() + "','employeeType':'" + 0
               + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
               + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
               + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
               + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + 0 + "','level3':'" + level1Value + "','level4':'" + 0
               + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + 0 + "','levelName': '" + glbVarLevelName + "','type':'Level3','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid
                           + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                           + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                           + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','password':'" + password + "'}";

            }

        }
        else if (level1Value != -1 && level2Value == -1 && employee1Id != -1) {
            if (glbVarLevelName == "Level1")
                msg = 'GM must be selected!';
            if (glbVarLevelName == "Level2")
                msg = 'National must be selected!';
            if (glbVarLevelName == "Level3")
                msg = 'Region must be selected!';
            $('#hlabmsg').text(msg);
            $('#Divmessage').jqmShow();
            FlagForExist = 1;

            return false;
        }
        else if (level1Value != -1 && level2Value != -1 && level3Value == -1 && employee1Id != -1 && employee2Id == -1) {


            if (glbVarLevelName == "Level1") {

                myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
               + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val() + "','appointmentDate':'" + $('#txtAppointmentDate').val()
               + "','gender':'" + $('#ddlGender').val() + "','designation':'" + $('#ddlDesignation').val() + "','employeeType':'" + 0
               + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
               + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
               + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
               + "','remarks':'" + Remarks + "','level1':'" + level1Value + "','level2':'" + level2Value + "','level3':'" + 0
               + "','level4':'" + 0 + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + employee1Id + "','levelName': '" + glbVarLevelName
               + "','type':'Level2','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid
                           + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                           + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                           + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','password':'" + password + "'}";



            }
            if (glbVarLevelName == "Level2") {

                myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
             + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val() + "','appointmentDate':'" + $('#txtAppointmentDate').val()
             + "','gender':'" + $('#ddlGender').val() + "','designation':'" + $('#ddlDesignation').val() + "','employeeType':'" + 0
             + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
             + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
             + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
             + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + level1Value + "','level3':'" + level2Value
             + "','level4':'" + 0 + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + employee2Id + "','levelName': '" + glbVarLevelName
             + "','type':'Level3','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid
                         + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                         + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                         + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','password':'" + password + "'}";





            }
            if (glbVarLevelName == "Level3") {
                myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
        + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val() + "','appointmentDate':'" + $('#txtAppointmentDate').val()
        + "','gender':'" + $('#ddlGender').val() + "','designation':'" + $('#ddlDesignation').val() + "','employeeType':'" + 0
        + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
        + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
        + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
        + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + 0 + "','level3':'" + level1Value
        + "','level4':'" + level4Value + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + employee3Id + "','levelName': '" + glbVarLevelName
        + "','type':'Level4','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid
                    + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                    + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                    + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','password':'" + password + "'}";

            }



        }
        else if (level1Value != -1 && level2Value != -1 && level3Value == -1 && employee1Id != -1 && employee2Id != -1) {
            if (glbVarLevelName == "Level1")
                msg = 'National must be selected!';
            if (glbVarLevelName == "Level2")
                msg = 'Region must be selected!';
            if (glbVarLevelName == "Level3")
                msg = 'Zone must be selected!';
            $('#hlabmsg').text(msg);
            $('#Divmessage').jqmShow();
            FlagForExist = 1;
            return false;


        }
        else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value == -1 && employee1Id != -1 && employee2Id != -1 && employee3Id == -1) {

            if (glbVarLevelName == "Level1") {
                myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                        + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val() + "','appointmentDate':'" + $('#txtAppointmentDate').val()
                        + "','gender':'" + $('#ddlGender').val() + "','designation':'" + $('#ddlDesignation').val() + "','employeeType':'" + 0
                        + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
                        + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
                        + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
                        + "','remarks':'" + Remarks + "','level1':'" + level1Value + "','level2':'" + level2Value + "','level3':'" + level3Value
                        + "','level4':'" + 0 + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + employee2Id + "','levelName': '" + glbVarLevelName
                        + "','type':'Level3','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid
                                    + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                                    + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                                    + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','password':'" + password + "'}";



            }
            if (glbVarLevelName == "Level2") {


                myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                       + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val() + "','appointmentDate':'" + $('#txtAppointmentDate').val()
                       + "','gender':'" + $('#ddlGender').val() + "','designation':'" + $('#ddlDesignation').val() + "','employeeType':'" + 0
                       + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
                       + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
                       + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
                       + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + level1Value + "','level3':'" + level3Value
                       + "','level4':'" + level4Value + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + employee1Id + "','levelName': '" + glbVarLevelName
                       + "','type':'Level4','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid
                                   + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                                   + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                                   + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','password':'" + password + "'}";


            }
            if (glbVarLevelName == "Level3") {

                myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                      + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val() + "','appointmentDate':'" + $('#txtAppointmentDate').val()
                      + "','gender':'" + $('#ddlGender').val() + "','designation':'" + $('#ddlDesignation').val() + "','employeeType':'" + 0
                      + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
                      + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
                      + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
                      + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + 0 + "','level3':'" + level1Value
                      + "','level4':'" + level4Value + "','level5':'" + level3Value + "','level6':'" + 0 + "','managerId':'" + employee4Id + "','levelName': '" + glbVarLevelName
                      + "','type':'Level5','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid
                                  + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                                  + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                                  + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','password':'" + password + "'}";



            }


        }
        else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value == -1 && level5Value != -1 && employee1Id != -1 && employee2Id != -1 && employee3Id != -1) {

            if (glbVarLevelName == "Level1")
                msg = 'Region must be selected!';
            if (glbVarLevelName == "Level2")
                msg = 'Zone must be selected!';
            if (glbVarLevelName == "Level3")
                msg = 'Territory must be selected!';
            $('#hlabmsg').text(msg);
            $('#Divmessage').jqmShow();
            FlagForExist = 1;

            return false;
        }

        else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value != -1 && level5Value == -1 && employee1Id != -1 && employee2Id != -1 && employee3Id != -1) {


            if (glbVarLevelName == "Level3") {
                if (employeeType == -1) {
                    msg = 'Employee Type Must Be Selected!';
                    $('#hlabmsg').text(msg);
                    $('#Divmessage').jqmShow();
                    FlagForExist = 1;
                    return false;
                }
            }
            if (glbVarLevelName == "Level1") {
                myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                   + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val() + "','appointmentDate':'" + $('#txtAppointmentDate').val()
                   + "','gender':'" + $('#ddlGender').val() + "','designation':'" + $('#ddlDesignation').val() + "','employeeType':'" + 0
                   + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
                   + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
                   + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
                   + "','remarks':'" + Remarks + "','level1':'" + level1Value + "','level2':'" + level2Value + "','level3':'" + level3Value
                   + "','level4':'" + level4Value + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + employee3Id + "','levelName': '" + glbVarLevelName
                   + "','type':'Level4','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid
                               + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                               + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                               + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','password':'" + password + "'}";



            }
            if (glbVarLevelName == "Level2") {
                myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                  + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val() + "','appointmentDate':'" + $('#txtAppointmentDate').val()
                  + "','gender':'" + $('#ddlGender').val() + "','designation':'" + $('#ddlDesignation').val() + "','employeeType':'" + 0
                  + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
                  + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
                  + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
                  + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + level1Value + "','level3':'" + level2Value
                  + "','level4':'" + level4Value + "','level5':'" + level4Value + "','level6':'" + 0 + "','managerId':'" + employee4Id + "','levelName': '" + glbVarLevelName
                  + "','type':'Level5','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid
                              + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                              + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                              + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','password':'" + password + "'}";


            }
            if (glbVarLevelName == "Level3" && employeeType != -1) {
                myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                 + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val() + "','appointmentDate':'" + $('#txtAppointmentDate').val()
                 + "','gender':'" + $('#ddlGender').val() + "','designation':'" + $('#ddlDesignation').val() + "','employeeType':'" + 0
                 + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
                 + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
                 + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
                 + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + 0 + "','level3':'" + level1Value
                 + "','level4':'" + level4Value + "','level5':'" + level3Value + "','level6':'" + level4Value + "','managerId':'" + employee5Id + "','levelName': '" + glbVarLevelName
                 + "','type':'Level6','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid
                             + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                             + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                             + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','password':'" + password + "'}";




            }
        }
        else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value != -1 && level5Value != -1 && level6Value == -1 && employee1Id != -1 && employee2Id != -1 && employee3Id != -1 && employee4Id != -1) {


            if (glbVarLevelName == "Level2") {
                if (employeeType == -1) {
                    msg = 'Employee Type Must Be Selected!';
                    $('#hlabmsg').text(msg);
                    $('#Divmessage').jqmShow();
                    FlagForExist = 1;
                    return false;
                }
            }


            if (glbVarLevelName == "Level1") {
                myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
               + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val() + "','appointmentDate':'" + $('#txtAppointmentDate').val()
               + "','gender':'" + $('#ddlGender').val() + "','designation':'" + $('#ddlDesignation').val() + "','employeeType':'" + 0
               + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
               + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
               + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
               + "','remarks':'" + Remarks + "','level1':'" + level1Value + "','level2':'" + level2Value + "','level3':'" + level3Value
               + "','level4':'" + level4Value + "','level5':'" + level5Value + "','level6':'" + 0 + "','managerId':'" + employee4Id + "','levelName': '" + glbVarLevelName
               + "','type':'Level5','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid
                           + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                           + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                           + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','password':'" + password + "'}";



            }
            if (glbVarLevelName == "Level2" && employeeType != -1) {

                myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
            + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val() + "','appointmentDate':'" + $('#txtAppointmentDate').val()
            + "','gender':'" + $('#ddlGender').val() + "','designation':'" + $('#ddlDesignation').val() + "','employeeType':'" + 0
            + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
            + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
            + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
            + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + level1Value + "','level3':'" + level2Value
            + "','level4':'" + level4Value + "','level5':'" + level4Value + "','level6':'" + level5Value + "','managerId':'" + employee5Id + "','levelName': '" + glbVarLevelName
            + "','type':'Level6','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid
                        + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                        + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                        + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','password':'" + password + "'}";



            }
        }
        else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value != -1 && level5Value != -1 && level6Value != -1 && employee1Id != -1 && employee2Id != -1 && employee3Id != -1 && employee4Id != -1 && employee5Id != -1) {


            if (glbVarLevelName == "Level1") {
                if (employeeType == -1) {
                    msg = 'Employee Type Must Be Selected!';
                    $('#hlabmsg').text(msg);
                    $('#Divmessage').jqmShow();
                    FlagForExist = 1;
                    return false;
                }
            }

            if (glbVarLevelName == "Level1" && employeeType != -1) {

                myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
          + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val() + "','appointmentDate':'" + $('#txtAppointmentDate').val()
          + "','gender':'" + $('#ddlGender').val() + "','designation':'" + $('#ddlDesignation').val() + "','employeeType':'" + employeeType
          + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
          + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
          + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
          + "','remarks':'" + Remarks + "','level1':'" + level1Value + "','level2':'" + level2Value + "','level3':'" + level3Value
          + "','level4':'" + level4Value + "','level5':'" + level5Value + "','level6':'" + level6Value + "','managerId':'" + employee5Id + "','levelName': '" + glbVarLevelName
          + "','type':'Level6','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid
                      + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                      + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                      + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + $('#ddlTeam').val() + "','password':'" + password + "'}";



            }
        }
    }

    if (myData != "") {

        $.ajax({
            type: "POST",
            url: "MEmployeesService.asmx/InsertEmployee",
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
    debugger
    //alert("update");
    FlagForExist = 0;
    debugger
    level1Value = $('#ddl1').val();
    level2Value = $('#ddl2').val();
    level3Value = $('#ddl3').val();
    level4Value = $('#ddl4').val();
    level5Value = $('#ddl5').val();
    level6Value = $('#ddl6').val();
    employee1Id = $('#ddl11').val();
    employee2Id = $('#ddl22').val();
    employee3Id = $('#ddl33').val();
    employee4Id = $('#ddl44').val();
    employee5Id = $('#ddl55').val();
    employee6Id = $('#ddl66').val();
    employeeType = 0
    roleId = $('#ddlRole').val();


    var Password = $('#txtPass').val().replace(/ +/g, '');

    if (Password == '') {
        Password = "0";
    }



    if ($('#ddlRole').val() != -1) {
        glbVarLevelName = 'Level0';
    }


    var gender = $('#ddlGender').val();
    var country = $('#cboCountries').val();
    depor = $('#dlDepot').val();
    var pree_d = $('#days').val();



    if (level6Value != -1 || level6Value != null) {
        employeeType = $('#ddlType').val();
    }
    myData = "";



    if (glbVarLevelName == "Level3" || glbVarLevelName == "Level2" || glbVarLevelName == "Level1" || glbVarLevelName == "Level0") {

        if (glbVarLevelName == "Level0") {
            myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
                       + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
                       + "','appointmentDate':'" + 0 + "','resignationDate':'" + 0 + "','gender':'" + gender + "','designation':'" + 0 + "','employeeType':'" + 0
                       + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
                       + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
                       + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
                       + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + 0 + "','level3':'" + 0 + "','level4':'" + 0 + "','level5':'" + 0
                       + "','level6':'" + 0 + "','managerId':'" + 0 + "','levelName': '" + glbVarLevelName + "','selectHierarchy': '" + 1 + "','type': '" + 0
                       + "','roleId':'" + roleId + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
                               + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                               + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                               + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','Password':'" + Password + "'}";
        }

        if (level1Value == -1) {

            if (roleId == -1) {
                FlagForExist = 1;
                msg = 'Must Select Either Geographical Hierarchy OR Role!';
                $('#hlabmsg').text(msg);
                $('#Divmessage').jqmShow();


                return false;
            }
            else if (roleId == 8) {
                myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
                   + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
                   + "','appointmentDate':'" + 0 + "','resignationDate':'" + 0 + "','gender':'" + gender + "','designation':'" + 0 + "','employeeType':'" + 0
                   + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
                   + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
                   + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
                   + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + 0 + "','level3':'" + 0 + "','level4':'" + 0 + "','level5':'" + 0
                   + "','level6':'" + 0 + "','managerId':'" + 0 + "','levelName': '" + glbVarLevelName + "','selectHierarchy': '" + 0 + "','type': '" + 0
                   + "','roleId':'" + roleId + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
                           + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                           + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                           + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + $('#ddlTeam').val() + "','Password':'" + Password + "'}";


            }
            else {
                myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
                   + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
                   + "','appointmentDate':'" + 0 + "','resignationDate':'" + 0 + "','gender':'" + gender + "','designation':'" + 0 + "','employeeType':'" + 0
                   + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val()
                   + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1 + "','contactNumber2':'" + ContactNumber2
                   + "','email':'" + Email + "','currentAddress':'" + Address2 + "','permenantAddress':'" + Address1
                   + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + 0 + "','level3':'" + 0 + "','level4':'" + 0 + "','level5':'" + 0
                   + "','level6':'" + 0 + "','managerId':'" + 0 + "','levelName': '" + glbVarLevelName + "','selectHierarchy': '" + 0 + "','type': '" + 0
                   + "','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
                           + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                           + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                           + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','Password':'" + Password + "'}";


            }
        }
        else if (level1Value != -1 && level2Value == -1 && employee1Id == -1) {

            if (glbVarLevelName == "Level1") {


                myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
                   + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
                   + "','appointmentDate':'" + $('#txtAppointmentDate').val() + "','resignationDate':'" + $('#txtResignationDate').val() + "','gender':'" + gender + "','designation':'" + $('#ddlDesignation').val()
                   + "','employeeType':'" + 0 + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val()
                   + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1
                   + "','contactNumber2':'" + ContactNumber2 + "','email':'" + Email + "','currentAddress':'" + Address2
                   + "','permenantAddress':'" + Address1 + "','remarks':'" + Remarks + "','level1':'" + level1Value + "','level2':'" + 0 + "','level3':'" + 0
                   + "','level4':'" + 0 + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + 0 + "','levelName': '" + glbVarLevelName
                   + "','selectHierarchy': '" + 1 + "','type': '" + 'Level1' + "','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
                           + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                           + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                           + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','Password':'" + Password + "'}";




            }
            if (glbVarLevelName == "Level2") {

                myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
              + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
              + "','appointmentDate':'" + $('#txtAppointmentDate').val() + "','resignationDate':'" + $('#txtResignationDate').val() + "','gender':'" + gender + "','designation':'" + $('#ddlDesignation').val()
              + "','employeeType':'" + 0 + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val()
              + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1
              + "','contactNumber2':'" + ContactNumber2 + "','email':'" + Email + "','currentAddress':'" + Address2
              + "','permenantAddress':'" + Address1 + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + level1Value + "','level3':'" + 0
              + "','level4':'" + 0 + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + 0 + "','levelName': '" + glbVarLevelName
              + "','selectHierarchy': '" + 1 + "','type': '" + 'Level2' + "','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
                      + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                      + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                      + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','Password':'" + Password + "'}";



            }
            if (glbVarLevelName == "Level3") {

                myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
      + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
      + "','appointmentDate':'" + $('#txtAppointmentDate').val() + "','resignationDate':'" + $('#txtResignationDate').val() + "','gender':'" + gender + "','designation':'" + $('#ddlDesignation').val()
      + "','employeeType':'" + 0 + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val()
      + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1
      + "','contactNumber2':'" + ContactNumber2 + "','email':'" + Email + "','currentAddress':'" + Address2
      + "','permenantAddress':'" + Address1 + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + 0 + "','level3':'" + level1Value
      + "','level4':'" + 0 + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + 0 + "','levelName': '" + glbVarLevelName
      + "','selectHierarchy': '" + 1 + "','type': '" + 'Level3' + "','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
              + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
              + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
              + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','Password':'" + Password + "'}";
            }

        }
        else if (level1Value != -1 && level2Value == -1 && employee1Id != -1) {
            if (glbVarLevelName == "Level1")
                msg = 'GM must be selected!';
            if (glbVarLevelName == "Level2")
                msg = 'National must be selected!';
            if (glbVarLevelName == "Level3")
                msg = 'Region must be selected!';
            $('#hlabmsg').text(msg);
            $('#Divmessage').jqmShow();
            FlagForExist = 1;


            return false;
        }


        else if (level1Value != -1 && level2Value != -1 && level3Value == -1 && employee1Id != -1 && employee2Id == -1) {
            // alert("Buh LEvel");

            if (glbVarLevelName == "Level1") {

                myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
                  + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
                  + "','appointmentDate':'" + $('#txtAppointmentDate').val() + "','resignationDate':'" + $('#txtResignationDate').val() + "','gender':'" + gender + "','designation':'" + $('#ddlDesignation').val()
                  + "','employeeType':'" + 0 + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val()
                  + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1
                  + "','contactNumber2':'" + ContactNumber2 + "','email':'" + Email + "','currentAddress':'" + Address2
                  + "','permenantAddress':'" + Address1 + "','remarks':'" + Remarks + "','level1':'" + level1Value + "','level2':'" + level2Value + "','level3':'" + 0
                  + "','level4':'" + 0 + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + employee1Id + "','levelName': '" + glbVarLevelName
                  + "','selectHierarchy': '" + 1 + "','type': '" + 'Level2' + "','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
                          + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                          + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                          + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','Password':'" + Password + "'}";



            }
            if (glbVarLevelName == "Level2") {
                myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
                + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
                + "','appointmentDate':'" + $('#txtAppointmentDate').val() + "','resignationDate':'" + $('#txtResignationDate').val() + "','gender':'" + gender + "','designation':'" + $('#ddlDesignation').val()
                + "','employeeType':'" + 0 + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val()
                + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1
                + "','contactNumber2':'" + ContactNumber2 + "','email':'" + Email + "','currentAddress':'" + Address2
                + "','permenantAddress':'" + Address1 + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + level1Value + "','level3':'" + level2Value
                + "','level4':'" + 0 + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + employee1Id + "','levelName': '" + glbVarLevelName
                + "','selectHierarchy': '" + 1 + "','type': '" + 'Level3' + "','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
                        + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                        + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                        + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','Password':'" + Password + "'}";


            }
            if (glbVarLevelName == "Level3") {

                myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
             + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
             + "','appointmentDate':'" + $('#txtAppointmentDate').val() + "','resignationDate':'" + $('#txtResignationDate').val() + "','gender':'" + gender + "','designation':'" + $('#ddlDesignation').val()
             + "','employeeType':'" + 0 + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val()
             + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1
             + "','contactNumber2':'" + ContactNumber2 + "','email':'" + Email + "','currentAddress':'" + Address2
             + "','permenantAddress':'" + Address1 + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + 0 + "','level3':'" + level1Value
             + "','level4':'" + level2Value + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + employee1Id + "','levelName': '" + glbVarLevelName
             + "','selectHierarchy': '" + 1 + "','type': '" + 'Level4' + "','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
                     + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                     + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                     + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','Password':'" + Password + "'}";

            }
        }
        else if (level1Value != -1 && level2Value != -1 && level3Value == -1 && employee1Id != -1 && employee2Id != -1) {
            if (glbVarLevelName == "Level1")
                msg = 'National must be selected!';
            if (glbVarLevelName == "Level2")
                msg = 'Region must be selected!';
            if (glbVarLevelName == "Level3")
                msg = 'Zone must be selected!';
            $('#hlabmsg').text(msg);
            $('#Divmessage').jqmShow();
            FlagForExist = 1;
            return false;


        }
        else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value == -1 && employee1Id != -1 && employee2Id != -1 && employee3Id == -1) {

            if (glbVarLevelName == "Level1") {
                myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
                   + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
                   + "','appointmentDate':'" + $('#txtAppointmentDate').val() + "','resignationDate':'" + $('#txtResignationDate').val() + "','gender':'" + gender + "','designation':'" + $('#ddlDesignation').val()
                   + "','employeeType':'" + 0 + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val()
                   + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1
                   + "','contactNumber2':'" + ContactNumber2 + "','email':'" + Email + "','currentAddress':'" + Address2
                   + "','permenantAddress':'" + Address1 + "','remarks':'" + Remarks + "','level1':'" + level1Value + "','level2':'" + level2Value + "','level3':'" + level3Value
                   + "','level4':'" + 0 + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + employee2Id + "','levelName': '" + glbVarLevelName
                   + "','selectHierarchy': '" + 1 + "','type': '" + 'Level3' + "','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
                           + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                           + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                           + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','Password':'" + Password + "'}";


            }
            if (glbVarLevelName == "Level2") {

                myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
              + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
              + "','appointmentDate':'" + $('#txtAppointmentDate').val() + "','resignationDate':'" + $('#txtResignationDate').val() + "','gender':'" + gender + "','designation':'" + $('#ddlDesignation').val()
              + "','employeeType':'" + 0 + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val()
              + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1
              + "','contactNumber2':'" + ContactNumber2 + "','email':'" + Email + "','currentAddress':'" + Address2
              + "','permenantAddress':'" + Address1 + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + level1Value + "','level3':'" + level2Value
              + "','level4':'" + level3Value + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + employee2Id + "','levelName': '" + glbVarLevelName
              + "','selectHierarchy': '" + 1 + "','type': '" + 'Level4' + "','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
                      + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                      + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                      + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','Password':'" + Password + "'}";

            }
            if (glbVarLevelName == "Level3") {

                myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
             + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
             + "','appointmentDate':'" + $('#txtAppointmentDate').val() + "','resignationDate':'" + $('#txtResignationDate').val() + "','gender':'" + gender + "','designation':'" + $('#ddlDesignation').val()
             + "','employeeType':'" + 0 + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val()
             + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1
             + "','contactNumber2':'" + ContactNumber2 + "','email':'" + Email + "','currentAddress':'" + Address2
             + "','permenantAddress':'" + Address1 + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + 0 + "','level3':'" + level1Value
             + "','level4':'" + level2Value + "','level5':'" + level3Value + "','level6':'" + 0 + "','managerId':'" + employee2Id + "','levelName': '" + glbVarLevelName
             + "','selectHierarchy': '" + 1 + "','type': '" + 'Level5' + "','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
                     + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                     + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                     + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','Password':'" + Password + "'}";


            }


        }
        else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value == -1 && employee1Id != -1 && employee2Id != -1 && employee3Id != -1) {

            if (glbVarLevelName == "Level1")
                msg = 'Region must be selected!';
            if (glbVarLevelName == "Level2")
                msg = 'Zone must be selected!';
            if (glbVarLevelName == "Level3")
                msg = 'Territory must be selected!';
            $('#hlabmsg').text(msg);
            $('#Divmessage').jqmShow();
            FlagForExist = 1;

            return false;
        }
        else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value != -1 && level5Value == -1 && employee1Id != -1 && employee2Id != -1 && employee3Id != -1) {


            if (glbVarLevelName == "Level3") {
                if (employeeType == -1) {
                    msg = 'Employee Type Must Be Selected!';
                    $('#hlabmsg').text(msg);
                    $('#Divmessage').jqmShow();
                    FlagForExist = 1;
                    return false;
                }
            }

            if (glbVarLevelName == "Level1") {
                myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
                   + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
                   + "','appointmentDate':'" + $('#txtAppointmentDate').val() + "','resignationDate':'" + $('#txtResignationDate').val() + "','gender':'" + gender + "','designation':'" + $('#ddlDesignation').val()
                   + "','employeeType':'" + 0 + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val()
                   + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1
                   + "','contactNumber2':'" + ContactNumber2 + "','email':'" + Email + "','currentAddress':'" + Address2
                   + "','permenantAddress':'" + Address1 + "','remarks':'" + Remarks + "','level1':'" + level1Value + "','level2':'" + level2Value + "','level3':'" + level3Value
                   + "','level4':'" + level4Value + "','level5':'" + 0 + "','level6':'" + 0 + "','managerId':'" + employee3Id + "','levelName': '" + glbVarLevelName
                   + "','selectHierarchy': '" + 1 + "','type': '" + 'Level4' + "','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
                           + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                           + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                           + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','Password':'" + Password + "'}";


            }
            if (glbVarLevelName == "Level2") {

                myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
                   + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
                   + "','appointmentDate':'" + $('#txtAppointmentDate').val() + "','resignationDate':'" + $('#txtResignationDate').val() + "','gender':'" + gender + "','designation':'" + $('#ddlDesignation').val()
                   + "','employeeType':'" + 0 + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val()
                   + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1
                   + "','contactNumber2':'" + ContactNumber2 + "','email':'" + Email + "','currentAddress':'" + Address2
                   + "','permenantAddress':'" + Address1 + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + level1Value + "','level3':'" + level2Value
                   + "','level4':'" + level3Value + "','level5':'" + level4Value + "','level6':'" + 0 + "','managerId':'" + employee3Id + "','levelName': '" + glbVarLevelName
                   + "','selectHierarchy': '" + 1 + "','type': '" + 'Level5' + "','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
                           + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                           + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                           + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','Password':'" + Password + "'}";

            }
            if (glbVarLevelName == "Level3" && employeeType != -1) {

                myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
                + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
                + "','appointmentDate':'" + $('#txtAppointmentDate').val() + "','resignationDate':'" + $('#txtResignationDate').val() + "','gender':'" + gender + "','designation':'" + $('#ddlDesignation').val()
                + "','employeeType':'" + 0 + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val()
                + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1
                + "','contactNumber2':'" + ContactNumber2 + "','email':'" + Email + "','currentAddress':'" + Address2
                + "','permenantAddress':'" + Address1 + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + 0 + "','level3':'" + level1Value
                + "','level4':'" + level2Value + "','level5':'" + level3Value + "','level6':'" + level4Value + "','managerId':'" + employee3Id + "','levelName': '" + glbVarLevelName
                + "','selectHierarchy': '" + 1 + "','type': '" + 'Level6' + "','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
                        + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                        + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                        + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','Password':'" + Password + "'}";


            }
        }

        else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value != -1 && level5Value != -1 && level6Value == -1 && employee1Id != -1 && employee2Id != -1 && employee3Id != -1 && employee4Id != -1) {


            if (glbVarLevelName == "Level2") {
                if (employeeType == -1) {
                    msg = 'Employee Type Must Be Selected!';
                    $('#hlabmsg').text(msg);
                    $('#Divmessage').jqmShow();
                    FlagForExist = 1;
                    return false;
                }
            }
            if (glbVarLevelName == "Level1") {

                myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
                    + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
                    + "','appointmentDate':'" + $('#txtAppointmentDate').val() + "','resignationDate':'" + $('#txtResignationDate').val() + "','gender':'" + gender + "','designation':'" + $('#ddlDesignation').val()
                    + "','employeeType':'" + 0 + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val()
                    + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1
                    + "','contactNumber2':'" + ContactNumber2 + "','email':'" + Email + "','currentAddress':'" + Address2
                    + "','permenantAddress':'" + Address1 + "','remarks':'" + Remarks + "','level1':'" + level1Value + "','level2':'" + level2Value + "','level3':'" + level3Value
                    + "','level4':'" + level4Value + "','level5':'" + level5Value + "','level6':'" + 0 + "','managerId':'" + employee4Id + "','levelName': '" + glbVarLevelName
                    + "','selectHierarchy': '" + 1 + "','type': '" + 'Level5' + "','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
                            + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                            + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                            + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','Password':'" + Password + "'}";



            }
            if (glbVarLevelName == "Level2" && employeeType != -1) {


                myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
                    + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
                    + "','appointmentDate':'" + $('#txtAppointmentDate').val() + "','resignationDate':'" + $('#txtResignationDate').val() + "','gender':'" + gender + "','designation':'" + $('#ddlDesignation').val()
                    + "','employeeType':'" + 0 + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val()
                    + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1
                    + "','contactNumber2':'" + ContactNumber2 + "','email':'" + Email + "','currentAddress':'" + Address2
                    + "','permenantAddress':'" + Address1 + "','remarks':'" + Remarks + "','level1':'" + 0 + "','level2':'" + level1Value + "','level3':'" + level2Value
                    + "','level4':'" + level3Value + "','level5':'" + level4Value + "','level6':'" + level5Value + "','managerId':'" + employee4Id + "','levelName': '" + glbVarLevelName
                    + "','selectHierarchy': '" + 1 + "','type': '" + 'Level6' + "','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
                            + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                            + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                            + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + 0 + "','Password':'" + Password + "'}";

            }
        }
        else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value != -1 && employee1Id != -1 && employee2Id != -1 && employee3Id != -1) {


            if (glbVarLevelName == "Level1") {
                if (employeeType == -1 || employeeType == 0) {
                    msg = 'Employee Type Must Be Selected!';
                    $('#hlabmsg').text(msg);
                    $('#Divmessage').jqmShow();
                    FlagForExist = 1;
                    return false;
                }
            }
            if (glbVarLevelName == "Level1" && employeeType != -1) {

                myData = "{'employeeId':'" + EmployeeId + "','firstName':'" + $('#txtFirstName').val()
                  + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName + "','loginId':'" + $('#txtLoginId').val()
                  + "','appointmentDate':'" + $('#txtAppointmentDate').val() + "','resignationDate':'" + $('#txtResignationDate').val() + "','gender':'" + gender + "','designation':'" + $('#ddlDesignation').val()
                  + "','employeeType':'" + employeeType + "','isActive':'" + $('#chkActive').is(":checked") + "','country':'" + $('#cboCountries').val()
                  + "','city':'" + $('#ddlCity').val() + "','RelatedCityIDs':'" + $('select#ddlRelatedCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','contactNumber1':'" + ContactNumber1
                  + "','contactNumber2':'" + ContactNumber2 + "','email':'" + Email + "','currentAddress':'" + Address2
                  + "','permenantAddress':'" + Address1 + "','remarks':'" + Remarks + "','level1':'" + level1Value + "','level2':'" + level2Value + "','level3':'" + level3Value
                  + "','level4':'" + level4Value + "','level5':'" + level5Value + "','level6':'" + level6Value + "','managerId':'" + employee5Id + "','levelName': '" + glbVarLevelName
                  + "','selectHierarchy': '" + 1 + "','type': '" + 'Level6' + "','roleId':'" + 0 + "','depot':'" + depor + "','isSample':'" + $('#IsSample').is(":checked") + "','GDBID':'" + gdbid + "','predays':'" + pree_d
                          + "','IsBikeAllowance':'" + $('#chkBikeAllowance').is(":checked")
                          + "','IsCarAllowance':'" + $('#chkCarAllowance').is(":checked")
                          + "','IsIBA':'" + $('#chkIBA').is(":checked") + "','employeeCode':'" + EmployeeCode + "','TeamID':'" + $('#ddlTeam').val() + "','Password':'" + Password + "'}";

            }

        }
        debugger
        if (myData != "") {

            $.ajax({
                type: "POST",
                url: "MEmployeesService.asmx/UpdateEmployee",
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


}


//GDBID
function GetEmployeeGDBID() {

    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/GetEmployeeDGID",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetEmployeeGDBID,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        aysnc: true
    });

}
function onSuccessGetEmployeeGDBID(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        $('#txtGDBID').val(jsonObj[0].GDDBID);
    }
    get_pree_days();

}


//Depot
function GetEmployeeDepot() {

    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/GetEmployeeDepot",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetEmployeeDepotID,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        aysnc: true
    });

}
function onSuccessGetEmployeeDepotID(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        $('#dlDepot').val(jsonObj[0].DepotID);
        $('#IsSample').attr("checked", jsonObj[0].Sampleoff);
    }
    GetCityByEmpId();
}

// Edit Record(s)
function onSuccessGetEmployees(data, status) {
    debugger


    if (data.d != "") {


        ClearFields();
        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML =
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        document.getElementById('ddl11').innerHTML = "";
        document.getElementById('ddl22').innerHTML = "";
        document.getElementById('ddl33').innerHTML = "";
        document.getElementById('ddl44').innerHTML = "";
        document.getElementById('ddl55').innerHTML = "";
        $("#rowLogin").show();
        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {
            debugger;
            // For Json Date convert into Standard Date
            console.log("Hey this is final data", jsonObj[0]);
            var dateAppointment = jsonObj[0].AppointmentDate;
            var standardAppointmentDate = new Date(parseInt(dateAppointment.substr(6)));
            var getMonth = standardAppointmentDate.getUTCMonth();
            var getDay = standardAppointmentDate.getUTCDate();
            var getYear = standardAppointmentDate.getUTCFullYear();
            var appointmentDate = getMonth + '/' + getDay + '/' + getYear;

            var resignationDate = "";
            try {
                var dateResignation = jsonObj[0].ResignDate;
                if (dateResignation != "") {
                    var standardResignationDate = new Date(dateResignation);
                    var getMonthresignation = standardResignationDate.getMonth() + 1;
                    var getDayresignation = standardResignationDate.getDate();
                    var getYearresignation = standardResignationDate.getFullYear();
                    resignationDate = getMonthresignation + '/' + getDayresignation + '/' + getYearresignation;
                }
            }
            catch (Ex) {
                resignationDate = "";
            }

            $('#txtResignationDate').val(resignationDate);
            $('#rowResignationDate').show();

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











            if (EditableDataRole == 'admin' || EditableDataRole == 'headoffice') {

                $("#rowDesignation").hide();
            }
            else {

                $("#rowDesignation").show();
            }


            if (EditableDataRole == 'rl6') {
                $('#ddlTeam').removeAttr('style');
                $('#ddlTeam').removeAttr('Multiple');
                $('#Teamhide').show();
            }
            else if (EditableDataRole == 'headoffice') {

                $('#Teamhide').show();
                $('#ddlTeam').attr('Multiple', true);
                $('#ddlTeam').css('height', '100');
            }
            else {
                $('#ddlTeam').removeAttr('Multiple');
                $('#ddlTeam').removeAttr('style');
                $('#Teamhide').hide();
            }
            // Commented By Ahmer because loginid is email for all
            //if (EditableDataRole == 'rl6') {

            //    $("#rowLogin").hide();

            //}
            //else {

            //    $("#rowLogin").show();
            //}

            $("#rowLogin").show();

            //$('#ddlDesignation').val(jsonObj[0].DesignationId);
            designation = jsonObj[0].DesignationId;
            designation2 = jsonObj[0].DesignationId;
            $('#txtLoginId').val(jsonObj[0].LoginId);
            $('#txtMobileNumber').val(jsonObj[0].MobileNumber);
            $('#txtAppointmentDate').val(dateAppointment);
            //$('#rowAppointmentDate').hide();
            $('#ddlGender').val(jsonObj[0].Gender);
            $('#txtEmpCode').val(jsonObj[0].EmployeeCode);
            $('#ddlDesignation').val(designation2);
            $('#chkActive').attr("checked", jsonObj[0].IsActive == "True" ? true : false);

        }
    }
    if (EditableDataRole == 'headoffice') {
        GetHeadofficeEmployeeGroupWithTeamID();
    }
    else {
        GetEmployeeGroupWithTeamID();
    }
    //GetOtherDetail();
    GetEmployeeGDBID();

    //GetEmployeeDepot();
    GetCityByEmpId();


    Flag == 1;
}
function GetHeadofficeEmployeeGroupWithTeamID() {

    myData = "{'EmployeeID':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/GetHeadofficeGroupWithTeamID",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetHeadofficeGroupWithTeamID,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

}
function onSuccessGetHeadofficeGroupWithTeamID(data, status) {


    if (data.d != "") {
        var TeamID = [];
        jsonObj = jsonParse(data.d);
        // $('#dlGroup').val(jsonObj[0].GroupID)
        //OnChangedTeamddl();
        $.each(jsonObj, function (i, tweet) {
            TeamID.push(jsonObj[i].TeamID);

            $('#ddlTeam').val(TeamID)
        });
    }



}

function GetEmployeeGroupWithTeamID() {

    myData = "{'EmployeeID':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/GetGroupWithTeamID",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetGroupWithTeamID,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

}
function onSuccessGetGroupWithTeamID(data, status) {


    if (data.d != "") {
        var TeamID = '';
        jsonObj = jsonParse(data.d);
        // $('#dlGroup').val(jsonObj[0].GroupID)
        TeamID = jsonObj[0].TeamID;
        //OnChangedTeamddl();
        $('#ddlTeam').val(TeamID)

    }

}

function GetEmployeeType() {

    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/GetEmployeeType",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetEmployeeType,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetEmployeeType(data, status) {

    if (EditableDataRole == 'rl5') {
        $('#Coldepot1').hide();
        $('#Coldepot').show();
    }
    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (EditableDataRole == 'rl6') {

            $('#colType').show();

            $('#Coldepot').hide();
            $('#Coldepot1').show();





            var employeeType = jsonObj[0].TypeId;

            if (employeeType > 0) {
                $('#ddlType').val(employeeType);
            }
            else {
                $('#ddlType').val(-1);
            }
        }
    }
    else {
        $('#ddlType').val(-1);
    }

    if (EditableDataRole != 'rl6') {
        $('#colType').hide();
    }
    else {
        $('#colType').show();
    }

    GetEmployeesAddress();
}
function GetEmployeesAddress() {

    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/GetEmployeeAddress",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetEmployeesAddress,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetEmployeesAddress(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $('#txtCurrentAddress').val(jsonObj[0].Address);
        //$('#txtCurrentAddress').val(jsonObj[0].Address1);
        $('#cboCountries').val(jsonObj[0].Country);
        //$('#ddlCity').val(jsonObj[0].City);

        if (jsonObj[0].ContactNumber1 == "-") {

            $('#txtContactNumber1').val("");
        }
        else {

            $('#txtContactNumber1').val(jsonObj[0].ContactNumber1);
        }

        if (jsonObj[0].ContactNumber2 == "-") {

            $('#txtContactNumber2').val("");
        }
        else {

            $('#txtContactNumber2').val(jsonObj[0].ContactNumber2);
        }
    }

    GetEmployeesInRole();
}
function GetEmployeesInRole() {

    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/GetEmploeesInRole",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetEmployeesInRole,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetEmployeesInRole(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        RoleTypeId = jsonObj[0].RoleId;



        if (RoleTypeId != 1 && RoleTypeId != 2 && RoleTypeId != 3 && RoleTypeId != 4 && RoleTypeId != 5 && RoleTypeId != 6) {
            $('#ddlRole').val(jsonObj[0].RoleId);
        }

    }

    GetEmployeesMembership();
}
function GetEmployeesMembership() {

    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/GetEmployeeMembership",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetEmployeesMembership,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetEmployeesMembership(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        SystemUserId = jsonObj[0].SystemUserID;
        $('#txtEmail').val(jsonObj[0].Email);
        $('#txtRemarks').val(jsonObj[0].Comment);
    }

    GetOtherDetail();

}

function GetHierarchySelection() {
    debugger
    myData = "{'systemUserId':'" + SystemUserId + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/GetHierarchySelection",
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
    debugger
    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            if (glbVarLevelName == "Level1") {

                ShowHierarchy();

                level1Id = jsonObj[0].LevelId1;
                level2Id = jsonObj[0].LevelId2;
                level3Id = jsonObj[0].LevelId3;
                level4Id = jsonObj[0].LevelId4;
                level5Id = jsonObj[0].LevelId5;
                level6Id = jsonObj[0].LevelId6;
            }
            if (glbVarLevelName == "Level2") {
                alert("selction hello");
                $('#lblGeographicalHierarchy').show();
                $('#col1').show();
                $('#col2').show();
                $('#col3').show();
                $('#col4').show();
                $('#col5').show();

                level2Id = jsonObj[0].LevelId2;
                level3Id = jsonObj[0].LevelId3;
                level4Id = jsonObj[0].LevelId4;
                level5Id = jsonObj[0].LevelId5;
                level6Id = jsonObj[0].LevelId6;
            }
            if (glbVarLevelName == "Level3") {

                $('#lblGeographicalHierarchy').show();
                $('#col1').show();
                $('#col2').show();
                $('#col3').show();
                $('#col4').show();

                level3Id = jsonObj[0].LevelId3;
                level4Id = jsonObj[0].LevelId4;
                level5Id = jsonObj[0].LevelId5;
                level6Id = jsonObj[0].LevelId6;
            }
        }
    }

    onSuccessShowHierarchyLevel1();
    FilterDesignation();
}
function onSuccessShowHierarchyLevel1() {

    if (glbVarLevelName == "Level1") {

        if (level1Id != -1) {

            $('#ddl1').val(level1Id);
            levelValue = $('#ddl1').val();
            myData = "{'parentLevelId':'" + levelValue + "','levelName':'" + glbVarLevelName + "'}";

            if (myData != "") {

                $.ajax({
                    type: "POST",
                    url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessShowHierarchyLevel2,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
        }
    }
    if (glbVarLevelName == "Level2") {

        if (level2Id != -1) {

            $('#ddl1').val(level2Id);
            levelValue = $('#ddl1').val();
            myData = "{'parentLevelId':'" + levelValue + "','levelName':'" + glbVarLevelName + "'}";

            if (myData != "") {

                $.ajax({
                    type: "POST",
                    url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessShowHierarchyLevel2,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
        }
    } if (glbVarLevelName == "Level3") {

        if (level3Id != -1) {

            $('#ddl1').val(level3Id);
            levelValue = $('#ddl1').val();
            myData = "{'parentLevelId':'" + levelValue + "','levelName':'" + glbVarLevelName + "'}";

            if (myData != "") {

                $.ajax({
                    type: "POST",
                    url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessShowHierarchyLevel2,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
        }
    }
}
function onSuccessShowHierarchyLevel2(data, status) {

    $('#hdnMode').val("EditMode");

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";


            value = '-1';
            if (glbVarLevelName == "Level1") {
                name = 'Select ' + HierarchyLevel2;
            }
            if (glbVarLevelName == "Level2") {
                name = 'Select ' + HierarchyLevel3;
            }
            if (glbVarLevelName == "Level3") {
                name = 'Select ' + HierarchyLevel4;
            }
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });

            if (glbVarLevelName == "Level1") {
                if (level2Id != -1) {

                    $('#ddl2').val(level2Id);
                    levelValue = $('#ddl2').val();
                    myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level2'}";

                    if (myData != "") {

                        $.ajax({
                            type: "POST",
                            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                            data: myData,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: onSuccessShowHierarchyLevel3,
                            error: onError,
                            beforeSend: startingAjax,
                            complete: ajaxCompleted,
                            cache: false
                        });
                    }
                }
                else {
                    GetManager();
                }
            }
            if (glbVarLevelName == "Level2") {
                if (level3Id != -1) {

                    $('#ddl2').val(level3Id);
                    levelValue = $('#ddl2').val();
                    myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level3'}";

                    if (myData != "") {

                        $.ajax({
                            type: "POST",
                            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                            data: myData,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: onSuccessShowHierarchyLevel3,
                            error: onError,
                            beforeSend: startingAjax,
                            complete: ajaxCompleted,
                            cache: false
                        });
                    }
                }
                else {
                    GetManager();
                }
            }
            if (glbVarLevelName == "Level3") {
                if (level4Id != -1) {

                    $('#ddl2').val(level4Id);
                    levelValue = $('#ddl2').val();
                    myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level4'}";

                    if (myData != "") {

                        $.ajax({
                            type: "POST",
                            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                            data: myData,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: onSuccessShowHierarchyLevel3,
                            error: onError,
                            beforeSend: startingAjax,
                            complete: ajaxCompleted,
                            cache: false
                        });
                    }
                }
                else {
                    GetManager();
                }
            }
        }
    }
}
function onSuccessShowHierarchyLevel3(data, status) {

    $('#hdnMode').val("EditMode");

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            value = '-1';
            if (glbVarLevelName == "Level1") {
                name = 'Select ' + HierarchyLevel3;
            }
            if (glbVarLevelName == "Level2") {
                name = 'Select ' + HierarchyLevel4;
            }
            if (glbVarLevelName == "Level3") {
                name = 'Select ' + HierarchyLevel5;
            }
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });

            if (glbVarLevelName == "Level1") {
                if (level3Id != -1) {

                    $('#ddl3').val(level3Id);
                    levelValue = $('#ddl3').val();
                    myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level3'}";

                    if (myData != "") {

                        $.ajax({
                            type: "POST",
                            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                            data: myData,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: onSuccessShowHierarchyLevel4,
                            error: onError,
                            beforeSend: startingAjax,
                            complete: ajaxCompleted,
                            cache: false
                        });
                    }
                }
                else {
                    GetManager();
                }
            }
            if (glbVarLevelName == "Level2") {
                if (level4Id != -1) {

                    $('#ddl3').val(level4Id);
                    levelValue = $('#ddl3').val();
                    myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level4'}";

                    if (myData != "") {

                        $.ajax({
                            type: "POST",
                            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                            data: myData,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: onSuccessShowHierarchyLevel4,
                            error: onError,
                            beforeSend: startingAjax,
                            complete: ajaxCompleted,
                            cache: false
                        });
                    }
                }
                else {
                    GetManager();
                }
            }
            if (glbVarLevelName == "Level3") {
                if (level5Id != -1) {

                    $('#ddl3').val(level5Id);
                    levelValue = $('#ddl3').val();
                    myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level5'}";

                    if (myData != "") {

                        $.ajax({
                            type: "POST",
                            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                            data: myData,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: onSuccessShowHierarchyLevel4,
                            error: onError,
                            beforeSend: startingAjax,
                            complete: ajaxCompleted,
                            cache: false
                        });
                    }
                }
                else {
                    GetManager();
                }
            }


        }
    }
}
function onSuccessShowHierarchyLevel4(data, status) {

    $('#hdnMode').val("EditMode");

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            value = '-1';
            if (glbVarLevelName == "Level1") {
                name = 'Select ' + HierarchyLevel4;
            }
            if (glbVarLevelName == "Level2") {
                name = 'Select ' + HierarchyLevel5;
            }
            if (glbVarLevelName == "Level3") {
                name = 'Select ' + HierarchyLevel6;
            }
            $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl4").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
            if (glbVarLevelName == "Level1") {
                if (level4Id != -1) {

                    $('#ddl4').val(level4Id);
                    levelValue = $('#ddl4').val();
                    myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level4'}";

                    if (myData != "") {

                        $.ajax({
                            type: "POST",
                            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                            data: myData,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: onSuccessShowHierarchyLevel5,
                            error: onError,
                            beforeSend: startingAjax,
                            complete: ajaxCompleted,
                            cache: false
                        });
                    }
                }
                else {
                    GetManager();
                }
            }

            if (glbVarLevelName == "Level2") {
                if (level5Id != -1) {

                    $('#ddl4').val(level5Id);
                    levelValue = $('#ddl4').val();
                    myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level5'}";

                    if (myData != "") {

                        $.ajax({
                            type: "POST",
                            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                            data: myData,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: onSuccessShowHierarchyLevel5,
                            error: onError,
                            beforeSend: startingAjax,
                            complete: ajaxCompleted,
                            cache: false
                        });
                    }
                }
                else {
                    GetManager();
                }
            }
            if (glbVarLevelName == "Level3") {
                if (level6Id != -1) {
                    $('#ddl4').val(level6Id);
                    levelValue = $('#ddl4').val();
                }
                GetManager();
            }
        }
    }

    GetManager();
    FilterDesignation();  //
    //$('#ddlDesignation').val(designation);
}
function onSuccessShowHierarchyLevel5(data, status) {

    $('#hdnMode').val("EditMode");

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            value = '-1';
            if (glbVarLevelName == "Level1") {
                name = 'Select ' + HierarchyLevel5;
            }
            if (glbVarLevelName == "Level2") {
                name = 'Select ' + HierarchyLevel6;
            }

            $("#ddl5").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl5").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });

            if (glbVarLevelName == "Level1") {
                if (level5Id != -1) {

                    $('#ddl5').val(level5Id);
                    levelValue = $('#ddl5').val();
                    myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level5'}";

                    if (myData != "") {

                        $.ajax({
                            type: "POST",
                            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                            data: myData,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: onSuccessShowHierarchyLevel6,
                            error: onError,
                            beforeSend: startingAjax,
                            complete: ajaxCompleted,
                            cache: false
                        });
                    }
                }
                else {
                    GetManager();
                }
            }

            if (glbVarLevelName == "Level2") {
                if (level6Id != -1) {

                    $('#ddl5').val(level6Id);
                    levelValue = $('#ddl5').val();
                }
                GetManager();
            }

        }
    }

}
function onSuccessShowHierarchyLevel6(data, status) {

    $('#hdnMode').val("EditMode");

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            document.getElementById('ddl6').innerHTML = "";

            value = '-1';
            if (glbVarLevelName == "Level1") {
                name = 'Select ' + HierarchyLevel6;
            }

            $("#ddl6").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl6").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });

            if (glbVarLevelName == "Level1") {
                if (level6Id != -1) {

                    $('#ddl6').val(level6Id);
                    levelValue = $('#ddl6').val();
                }
                GetManager();
            }
        }
    }

}

function GetManager() {

    if (glbVarLevelName == "Level1") {
        $('#lblUserHierarchy').show();
        $('#col11').show();
        $('#col22').show();
        $('#col33').show();
        $('#col44').show();
        $('#col55').show();
    }
    if (glbVarLevelName == "Level2") {
        $('#lblUserHierarchy').show();
        $('#col11').show();
        $('#col22').show();
        $('#col33').show();
        $('#col44').show();
    }
    if (glbVarLevelName == "Level3") {
        $('#lblUserHierarchy').show();
        $('#col11').show();
        $('#col22').show();
        $('#col33').show();
    }


    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/GetManagerAllLevels",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetManager,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

    // Getissample();
}
function onSuccessGetManager(data, status) {


    debugger
    $('#hdnMode').val("EditMode");

    if (data.d == "") {
        $("#ddl11").empty();
        $("#ddl11").append("<option value='-1'>Select Employee</option>");
    }


    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            if (EditableDataRole == "rl6") {

                Manager5Id = 0;
                Manager4Id = 0;
                Manager3Id = 0;
                Manager2Id = 0;
                Manager1Id = 0;
                try {
                    Manager5Id = jsonObj[0].EmployeeId;
                    Manager4Id = jsonObj[1].EmployeeId;
                    Manager3Id = jsonObj[2].EmployeeId;
                    Manager2Id = jsonObj[3].EmployeeId;
                    Manager1Id = jsonObj[4].EmployeeId;
                }
                catch (error) {

                }




                if (glbVarLevelName == "Level1") {
                    levelValue = $('#ddl5').val();
                }
                if (glbVarLevelName == "Level2") {
                    levelValue = $('#ddl4').val();
                }
                if (glbVarLevelName == "Level3") {
                    levelValue = $('#ddl3').val();
                }

                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'4'}";

                $.ajax({
                    type: "POST",
                    url: "MEmployeesService.asmx/FillDropDownList",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: onSuccessShowManager4,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            else if (EditableDataRole == "rl5") {

                Manager5Id = 0;
                Manager4Id = 0;
                Manager3Id = 0;
                Manager2Id = 0;
                Manager1Id = 0;
                try {
                    Manager4Id = jsonObj[0].EmployeeId;
                    Manager3Id = jsonObj[1].EmployeeId;
                    Manager2Id = jsonObj[2].EmployeeId;
                    Manager1Id = jsonObj[3].EmployeeId;
                }
                catch (error) {

                }

                if (glbVarLevelName == "Level1") {
                    levelValue = $('#ddl4').val();
                }
                if (glbVarLevelName == "Level2") {
                    levelValue = $('#ddl3').val();
                }
                if (glbVarLevelName == "Level3") {
                    levelValue = $('#ddl2').val();
                }


                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'3'}";

                $.ajax({
                    type: "POST",
                    url: "MEmployeesService.asmx/FillDropDownList",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: onSuccessShowManager3,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            else if (EditableDataRole == "rl4") {



                if (glbVarLevelName == "Level1") {
                    levelValue = $('#ddl3').val();

                    Manager5Id = 0;
                    Manager4Id = 0;
                    Manager3Id = 0;
                    Manager2Id = 0;
                    Manager1Id = 0;
                    try {
                        Manager3Id = jsonObj[0].EmployeeId;
                        Manager2Id = jsonObj[1].EmployeeId;
                        Manager1Id = jsonObj[2].EmployeeId;
                    }
                    catch (error) {

                    }

                }
                if (glbVarLevelName == "Level2") {
                    levelValue = $('#ddl2').val();

                    Manager5Id = 0;
                    Manager4Id = 0;
                    Manager3Id = 0;
                    Manager2Id = 0;
                    Manager1Id = 0;
                    try {
                        Manager3Id = jsonObj[0].EmployeeId;
                        Manager2Id = jsonObj[1].EmployeeId;
                    }
                    catch (error) {

                    }


                }
                if (glbVarLevelName == "Level3") {
                    levelValue = $('#ddl1').val();

                    Manager5Id = 0;
                    Manager4Id = 0;
                    Manager3Id = 0;
                    Manager2Id = 0;
                    Manager1Id = 0;
                    try {
                        Manager3Id = jsonObj[0].EmployeeId;
                    }
                    catch (error) {

                    }
                }

                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'2'}";

                $.ajax({
                    type: "POST",
                    url: "MEmployeesService.asmx/FillDropDownList",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: onSuccessShowManager2,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            else if (EditableDataRole == "rl3") {


                if (glbVarLevelName == "Level1") {
                    levelValue = $('#ddl2').val();

                    Manager5Id = 0;
                    Manager4Id = 0;
                    Manager3Id = 0;
                    Manager2Id = 0;
                    Manager1Id = 0;
                    try {
                        Manager2Id = jsonObj[0].EmployeeId;
                        Manager1Id = jsonObj[1].EmployeeId;
                    }
                    catch (error) {

                    }

                }
                if (glbVarLevelName == "Level2") {
                    levelValue = $('#ddl1').val();

                    Manager5Id = 0;
                    Manager4Id = 0;
                    Manager3Id = 0;
                    Manager2Id = 0;
                    Manager1Id = 0;
                    try {
                        Manager2Id = jsonObj[0].EmployeeId;
                    }
                    catch (error) {

                    }
                }

                if (glbVarLevelName == "Level1" || glbVarLevelName == "Level2") {
                    myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'1'}";

                    $.ajax({
                        type: "POST",
                        url: "MEmployeesService.asmx/FillDropDownList",
                        contentType: "application/json; charset=utf-8",
                        data: myData,
                        dataType: "json",
                        success: onSuccessShowManager1,
                        error: onError,
                        beforeSend: startingAjax,
                        complete: ajaxCompleted,
                        cache: false
                    });
                }

            }
            else if (EditableDataRole == "rl2") {

                Manager5Id = 0;
                Manager4Id = 0;
                Manager3Id = 0;
                Manager2Id = 0;
                Manager1Id = 0;
                try {
                    Manager1Id = jsonObj[0].EmployeeId;
                }
                catch (error) {

                }

                if (glbVarLevelName == "Level1") {
                    levelValue = $('#ddl1').val();
                    myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'0'}";

                    $.ajax({
                        type: "POST",
                        url: "MEmployeesService.asmx/FillDropDownList",
                        contentType: "application/json; charset=utf-8",
                        data: myData,
                        dataType: "json",
                        success: onSuccessShowManager0,
                        error: onError,
                        beforeSend: startingAjax,
                        complete: ajaxCompleted,
                        cache: false
                    });
                }


            }
            else {
                Manager1Id = 0;
                Manager2Id = 0;
                Manager3Id = 0;
                Manager4Id = 0;
                Manager5Id = 0;
            }
        }
    }
}
function onSuccessShowManager4(data, status) {

    $('#hdnMode').val("EditMode");

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            if (EditableDataRole == "rl6") {
                if (glbVarLevelName == "Level1") {
                    document.getElementById('ddl55').innerHTML = "";
                    //$('#col55').show();
                    value = '-1';
                    name = 'Select Employee';
                    $("#ddl55").append("<option value='" + value + "'>" + name + "</option>");

                    $.each(jsonObj, function (i, tweet) {
                        $("#ddl55").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                    });

                    $("#ddl55").val(Manager5Id);
                    levelValue = $('#ddl4').val();
                }
                if (glbVarLevelName == "Level2") {
                    document.getElementById('ddl44').innerHTML = "";
                    //$('#col44').show();
                    value = '-1';
                    name = 'Select Employee';
                    $("#ddl44").append("<option value='" + value + "'>" + name + "</option>");

                    $.each(jsonObj, function (i, tweet) {
                        $("#ddl44").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                    });

                    $("#ddl44").val(Manager5Id);
                    levelValue = $('#ddl3').val();
                }
                if (glbVarLevelName == "Level3") {
                    document.getElementById('ddl33').innerHTML = "";
                    //$('#col33').show();
                    value = '-1';
                    name = 'Select Employee';
                    $("#ddl33").append("<option value='" + value + "'>" + name + "</option>");

                    $.each(jsonObj, function (i, tweet) {
                        $("#ddl33").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                    });

                    $("#ddl33").val(Manager5Id);
                    levelValue = $('#ddl2').val();
                }


                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'3'}";

                $.ajax({
                    type: "POST",
                    url: "MEmployeesService.asmx/FillDropDownList",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: onSuccessShowManager3,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
        }
    }
}
function onSuccessShowManager3(data, status) {

    $('#hdnMode').val("EditMode");

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            if (EditableDataRole == "rl6" || EditableDataRole == "rl5") {
                if (glbVarLevelName == "Level1") {
                    document.getElementById('ddl44').innerHTML = "";
                    //$('#col44').show();
                    value = '-1';
                    name = 'Select Employee';
                    $("#ddl44").append("<option value='" + value + "'>" + name + "</option>");

                    $.each(jsonObj, function (i, tweet) {
                        $("#ddl44").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                    });

                    $("#ddl44").val(Manager4Id);
                    levelValue = $('#ddl3').val();
                }
                if (glbVarLevelName == "Level2") {
                    document.getElementById('ddl33').innerHTML = "";
                    //$('#col33').show();
                    value = '-1';
                    name = 'Select Employee';
                    $("#ddl33").append("<option value='" + value + "'>" + name + "</option>");

                    $.each(jsonObj, function (i, tweet) {
                        $("#ddl33").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                    });

                    $("#ddl33").val(Manager4Id);
                    levelValue = $('#ddl2').val();
                }
                if (glbVarLevelName == "Level3") {
                    document.getElementById('ddl22').innerHTML = "";
                    //$('#col22').show();
                    value = '-1';
                    name = 'Select Employee';
                    $("#ddl22").append("<option value='" + value + "'>" + name + "</option>");

                    $.each(jsonObj, function (i, tweet) {
                        $("#ddl22").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                    });

                    $("#ddl22").val(Manager4Id);
                    levelValue = $('#ddl1').val();
                }


                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'2'}";

                $.ajax({
                    type: "POST",
                    url: "MEmployeesService.asmx/FillDropDownList",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: onSuccessShowManager2,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
        }
    }
}
function onSuccessShowManager2(data, status) {

    $('#hdnMode').val("EditMode");

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            if (glbVarLevelName == "Level1") {
                document.getElementById('ddl33').innerHTML = "";

                value = '-1';
                name = 'Select Employee';
                $("#ddl33").append("<option value='" + value + "'>" + name + "</option>");

                $.each(jsonObj, function (i, tweet) {
                    $("#ddl33").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                });

                $("#ddl33").val(Manager3Id);
                levelValue = $('#ddl2').val();
                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'1'}";

                $.ajax({
                    type: "POST",
                    url: "MEmployeesService.asmx/FillDropDownList",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: onSuccessShowManager1,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            if (glbVarLevelName == "Level2") {
                document.getElementById('ddl22').innerHTML = "";
                value = '-1';
                name = 'Select Employee';
                $("#ddl22").append("<option value='" + value + "'>" + name + "</option>");

                $.each(jsonObj, function (i, tweet) {
                    $("#ddl22").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                });

                $("#ddl22").val(Manager3Id);
                levelValue = $('#ddl1').val();
                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'1'}";

                $.ajax({
                    type: "POST",
                    url: "MEmployeesService.asmx/FillDropDownList",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: onSuccessShowManager1,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            if (glbVarLevelName == "Level3") {
                document.getElementById('ddl11').innerHTML = "";
                value = '-1';
                name = 'Select Employee';
                $("#ddl11").append("<option value='" + value + "'>" + name + "</option>");

                $.each(jsonObj, function (i, tweet) {
                    $("#ddl11").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                });

                $("#ddl11").val(Manager3Id);
            }


        }
    }
}
function onSuccessShowManager1(data, status) {

    $('#hdnMode').val("EditMode");

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            if (glbVarLevelName == "Level1") {
                document.getElementById('ddl22').innerHTML = "";

                value = '-1';
                name = 'Select Employee';
                $("#ddl22").append("<option value='" + value + "'>" + name + "</option>");

                $.each(jsonObj, function (i, tweet) {
                    $("#ddl22").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                });

                $("#ddl22").val(Manager2Id);
                levelValue = $('#ddl1').val();
                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'0'}";

                $.ajax({
                    type: "POST",
                    url: "MEmployeesService.asmx/FillDropDownList",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: onSuccessShowManager0,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            if (glbVarLevelName == "Level2") {
                document.getElementById('ddl11').innerHTML = "";

                value = '-1';
                name = 'Select Employee';
                $("#ddl11").append("<option value='" + value + "'>" + name + "</option>");

                $.each(jsonObj, function (i, tweet) {
                    $("#ddl11").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                });

                $("#ddl11").val(Manager2Id);

            }

            //alert(glbVarLevelName);
            //alert("manager1" + Manager2Id);
            //if (Manager1Id == 0 || Manager1Id == "0") {
            //    $("#ddl33").empty();
            //    $("#ddl33").append("<option value='-1'>Select Employee</option>");
            //}

        }
    }
}
function onSuccessShowManager0(data, status) {

    $('#hdnMode').val("EditMode");

    debugger
    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            document.getElementById('ddl11').innerHTML = "";
            //$('#col11').show();

            value = '-1';
            name = 'Select Employee';
            $("#ddl11").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl11").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });


            $("#ddl11").val(Manager1Id);


            var ddl1Val = $('#ddl11').val();
            var ddl2Val = $('#ddl22').val();
            var ddl3Val = $('#ddl33').val();
            var ddl4Val = $('#ddl44').val();
            var ddl5Val = $('#ddl55').val();


            if (ddl5Val == null && ddl4Val == null && ddl3Val == null && ddl2Val != null && ddl1Val != null) {
                $("#ddl33").empty();
                $("#ddl33").append("<option value='-1'>Select Employee</option>");

            }
            else if (ddl5Val == null && ddl4Val == null && ddl3Val == null && ddl2Val == null && ddl1Val != '-1') {
                $("#ddl22").empty();
                $("#ddl22").append("<option value='-1'>Select Employee</option>");

            }

            //debugger
            //if (ddl5Val == null && ddl4Val == null && ddl3Val == null && ddl2Val == null && ddl1Val == null) {
            //    $("#ddl11").empty();
            //    $("#ddl11").append("<option value='-1'>Select Employee</option>");

            //} else if (ddl5Val == null && ddl4Val == null && ddl3Val == null && ddl2Val == null && ddl1Val != '-1') {
            //    $("#ddl22").empty();
            //    $("#ddl22").append("<option value='-1'>Select Employee</option>");
            //}
            //else if (ddl5Val == null && ddl4Val == null && ddl3Val == null && ddl2Val != '-1' && ddl1Val != '-1') {
            //    $("#ddl33").empty();
            //    $("#ddl33").append("<option value='-1'>Select Employee</option>");
            //}
            //else if (ddl5Val == null && ddl4Val == null && ddl3Val != '-1' && ddl2Val != '-1' && ddl1Val != '-1') {
            //    $("#ddl44").empty();
            //    $("#ddl44").append("<option value='-1'>Select Employee</option>");
            //} else if (ddl5Val == null && ddl4Val != '-1' && ddl3Val != '-1' && ddl2Val != '-1' && ddl1Val != '-1') {
            //    $("#ddl55").empty();
            //    $("#ddl55").append("<option value='-1'>Select Employee</option>");
            //} else if (ddl1Val == '-1' && ddl2Val != '-1' && ddl3Val != '-1' && ddl4Val == null && ddl5Val == null) {
            //    $("#ddl44").empty();
            //    $("#ddl44").append("<option value='-1'>Select Employee</option>");
            //}



            //else if (ddl2Val == null) {
            //    $("#ddl22").empty();
            //    $("#ddl22").append("<option value='-1'>Select Employee</option>");
            //    return false;
            //}
            //else if (ddl3Val == null) {
            //    $("#ddl33").empty();
            //    $("#ddl33").append("<option value='-1'>Select Employee</option>");
            //    return false;
            //}
            //else if (ddl4Val == null) {
            //    $("#ddl44").empty();
            //    $("#ddl44").append("<option value='-1'>Select Employee</option>");
            //    return false;
            //}
            //else if (ddl5Val == null) {
            //    $("#ddl55").empty();
            //    $("#ddl55").append("<option value='-1'>Select Employee</option>");
            //    return false;
            //}







        }
    }
}
function onSuccessShowManager(data, status) {

    $('#hdnMode').val("EditMode");

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            if (EditableDataRole == "rl6") {

                Manager3Id = jsonObj[0].EmployeeId;
                $("#ddl11").val(Manager3Id);
            }
        }
    }
}



function GetOtherDetail() {

    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/GetEmployeeOtherDetail",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetEmployeesOtherDetail,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        async: false
    });
}
function onSuccessGetEmployeesOtherDetail(data, status) {



    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            $('#chkIBA').attr("checked", (jsonObj[0].IBA == 'True' ? true : false));
            $('#chkCarAllowance').attr("checked", (jsonObj[0].CarAllowance == 'True' ? true : false));
            $('#chkBikeAllowance').attr("checked", (jsonObj[0].BikeAllowance == 'True' ? true : false));

            $('#txtEmpCode').val(jsonObj[0].EmployeeCode);
        }
    }
    //Getissample();

    if (RoleTypeId == 1 || RoleTypeId == 2 || RoleTypeId == 3 || RoleTypeId == 4 || RoleTypeId == 5 || RoleTypeId == 6) {
        GetHierarchySelection();
    }
    else {
        HideHierarchy();
    }

}

function Getissample() {

    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/GetEmployeeissample",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetEmployeeissample,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetEmployeeissample(data, status) {

    $('#hdnMode').val("EditMode");

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            if (EditableDataRole == "rl6") {
                $('#IsSample').attr("checked", jsonObj[0].IsSample);
            }
        }
    }
}

// Success + Error + Clear
function onSuccess(data, status) {
    debugger;
    FlagForExist = 0;
    debugger
    if (data.d == "OK") {

        mode = $('#hdnMode').val();
        msg = '';

        if (mode === "AddMode") {

            msg = 'Data inserted succesfully!';

        }
        else if (mode === "EditMode") {

            msg = 'Data updated succesfully!';
        }
        else if (mode === "ResetDeviceMode") {
            $('#divConfirmation').jqmHide();
            msg = 'Device has been reset successfully.';

        }
        else if (mode === "DeleteMode") {
            $('#divConfirmation').jqmHide();
            msg = 'Data deleted succesfully!';

        }
        debugger;
        ClearFields();
        debugger;

        GetCities();
        debugger;

        $('#hdnMode').val("");
        $('#hlabmsg').text(msg);
        alert(msg);
        window.location.reload();

        // $('#Divmessage').jqmShow();
        //return true;
    }
    else if (data.d == "Duplicate LoginId!") {
        FlagForExist = 1;
        msg = 'LoginId already exist! Try different';

        $('#hlabmsg').text(msg);
        $('#Divmessage').jqmShow();
        return false;
    }
    else if (data.d == "Duplicate Mobile Number!") {
        FlagForExist = 1;
        msg = 'Mobile Number already exist! Try different';

        $('#hlabmsg').text(msg);
        $('#Divmessage').jqmShow();
        return false;
    }
    else if (data.d == "Duplicate Email Address!") {
        FlagForExist = 1;
        msg = 'Email Address already exist! Try different';

        $('#hlabmsg').text(msg);
        $('#Divmessage').jqmShow();
        return false;
    }
    else if (data.d == "Duplicate Employee Code!") {
        FlagForExist = 1;
        msg = 'Employee Code already exist! Try different';

        $('#hlabmsg').text(msg);
        $('#Divmessage').jqmShow();
        return false;
    }
    else if (data.d == "Not able to delete this record due to linkup.") {
        FlagForExist = 1;
        $('#divConfirmation').jqmHide();
        msg = 'Not able to delete this record due to linkup.';
        $('#hlabmsg').text(msg);
        $('#Divmessage').jqmShow();
        return false;
    } else if (data.d == "Already Active Employee on Same TerritoryOK") {
        $('#divConfirmation').jqmHide();
        msg = 'Already Active Employee on Same Territory';

        ClearFields();
        GetCities();
        $('#hdnMode').val("");

        $('#hlabmsg').text(msg);
        $('#Divmessage').jqmShow();
    }
    else {
        FlagForExist = 1;
        $('#divConfirmation').jqmHide();
        msg = 'Unable to delete record b/c employee is the manager of' + data.d;
        $('#hlabmsg').text(msg);
        $('#Divmessage').jqmShow();
        return false;

    }


}
function onError(request, status, error) {

    if ($('#hdnMode').val() != "EditMode") {
        msg = 'Error is occured';
        $('#hlabmsg').text(msg);
        $('#Divmessage').jqmShow();
        return false;
    }

}
function startingAjax() {

    $('#imgLoading').show();
}
function ajaxCompleted() {

    $('#imgLoading').hide();


}
function ClearFields() {

    $('#ddl1').val("-1");
    $('#ddl2').val("-1");
    $('#ddl3').val("-1");
    $('#ddl4').val("-1");
    $('#ddl5').val("-1");
    $('#ddl6').val("-1");
    $('#ddlRole').val("-1");
    $('#dlDepot').val("-1");
    $('#txtCode').val("");
    $('#txtFirstName').val("");
    $('#txtLastName').val("");
    $('#txtMiddleName').val("");
    $('#txtLoginId').val("");
    $('#txtAppointmentDate').val("");
    $('#ddlGender').val("0");
    $('#colType').val("0");
    $('#chkActive').attr("checked", true);
    $('#txtMobileNumber').val("");
    $('#ddlCity').val(0);
    $('#cboCountries').val("PK");
    $('#txtMobileNumber').val("");
    $('#txtContactNumber1').val("");
    $('#txtEmail').val("");
    $('#txtPermenantAddress').val("");
    $('#txtCurrentAddress').val("");
    $('#txtContactNumber2').val("");
    $('#txtRemarks').val("");
    $('#txtGDBID').val("");
    $('#txtEmpCode').val("");
    $('#txtPass').val("");

}


// Page Load Event
function pageLoad() {

    // $('#imgLoading').hide();
    // Hierarchy Authentication
    IsAuthenticate();

    // Fill Designation
    FillDesignation();

    // Hierarchy Selection
    $('#ddl1').change(OnChangeddl1);
    $('#ddl2').change(OnChangeddl2);
    $('#ddl3').change(OnChangeddl3);
    $('#ddl4').change(OnChangeddl4);
    $('#ddl5').change(OnChangeddl5);
    $('#ddl6').change(OnChangeddl6);

    // Manager Selection
    $('#ddl11').change(OnChangeddl111);
    $('#ddl22').change(OnChangeddl222);
    $('#ddl33').change(OnChangeddl333);
    $('#ddl44').change(OnChangeddl444);
    $('#ddl55').change(OnChangeddl555);

    // Role Selection
    $('#ddlRole').change(OnChangeddlRole);

    // Button Events
    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#btnOk').click(btnOkClicked);

    $('#divConfirmation').jqm({ modal: true });
    $('#Divmessage').jqm({ modal: true });
    $('#rowResignationDate').hide();

    $('#Teamhide').hide();
    $('#ddlRelatedCity').select2({
        dropdownParent: $('#RelatedCity')
    });
}

// DropDownList OnChange Events
function OnChangeddl1() {

    levelValue = $('#ddl1').val();
    myData = "";
    $('#rowLogin').show(); $('#Coldepot').hide(); $('#Coldepot1').hide();
    if (levelValue != -1) {

        $('#rowRole').hide();

        if (glbVarLevelName == "Level1" || glbVarLevelName == "Level2" || glbVarLevelName == "Level3") {

            myData = "{'parentLevelId':'" + levelValue + "','levelName':'" + glbVarLevelName + "'}";
        }

        if (myData != "") {

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
    else {

        $('#rowRole').show(); $('#rowDesignation').show(); $('#colType').hide(); $('#lblUserHierarchy').hide();
        document.getElementById('ddl11').innerHTML = ""; document.getElementById('ddl22').innerHTML = ""; document.getElementById('ddl33').innerHTML = ""; document.getElementById('ddl44').innerHTML = ""; document.getElementById('ddl55').innerHTML = "";
        $('#col11').hide(); $('#col22').hide(); $('#col33').hide(); $('#col44').hide(); $('#col55').hide();
        document.getElementById('ddl2').innerHTML = ""; document.getElementById('ddl3').innerHTML = ""; document.getElementById('ddl4').innerHTML = ""; document.getElementById('ddl5').innerHTML = ""; document.getElementById('ddl6').innerHTML = "";
        FilterDesignation();
    }
}
function onSuccessFillddl2(data, status) {

    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";




    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (glbVarLevelName == "Level1" || glbVarLevelName == "Level2" || glbVarLevelName == "Level3") {

            value = '-1';
            if (glbVarLevelName == "Level1") {
                name = 'Select ' + HierarchyLevel2;
            }
            if (glbVarLevelName == "Level2") {
                name = 'Select ' + HierarchyLevel3;
            }
            if (glbVarLevelName == "Level3") {
                name = 'Select ' + HierarchyLevel4;
            }
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });

            myData = "";
            levelValue = $('#ddl1').val();
            if (glbVarLevelName == "Level1") {
                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'0'}";
            }
            if (glbVarLevelName == "Level2") {
                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'1'}";
            }
            if (glbVarLevelName == "Level3") {
                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'2'}";
            }

            if (myData != "") {
                $.ajax({
                    type: "POST",
                    url: "MEmployeesService.asmx/FillDropDownList",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: onSuccessFillddl11,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }

        }
        FilterDesignation();
    }
}
function onSuccessFillddl11(data, status) {

    document.getElementById('ddl11').innerHTML = "";
    document.getElementById('ddl22').innerHTML = "";
    document.getElementById('ddl33').innerHTML = "";
    document.getElementById('ddl44').innerHTML = "";
    document.getElementById('ddl55').innerHTML = "";
    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $('#lblUserHierarchy').show();
        $('#col11').show();

        value = '-1';
        name = 'Select Employee';
        $("#ddl11").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl11").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
    else {
        $('#lblUserHierarchy').show();
        $('#col11').show();

        value = '-1';
        name = 'Select Employee';
        $("#ddl11").append("<option value='" + value + "'>" + name + "</option>");
    }

    FilterDesignation();

}
function OnChangeddl2() {

    myData = "";
    levelValue = $('#ddl2').val(); $('#Coldepot').hide(); $('#Coldepot1').hide();
    $('#rowLogin').show();
    if (levelValue != -1) {

        if (glbVarLevelName == "Level1") {

            myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level2'}";
        }
        if (glbVarLevelName == "Level2") {

            myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level3'}";
        }
        if (glbVarLevelName == "Level3") {

            myData = "{'parentLevelId':'" + levelValue + "','levelName':'Level4'}";
        }

        if (myData != "") {

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
    else {

        $('#ddl11').val("-1");
        document.getElementById('ddl22').innerHTML = ""; document.getElementById('ddl33').innerHTML = ""; document.getElementById('ddl44').innerHTML = ""; document.getElementById('ddl55').innerHTML = "";
        document.getElementById('ddl3').innerHTML = ""; document.getElementById('ddl4').innerHTML = ""; document.getElementById('ddl5').innerHTML = ""; document.getElementById('ddl6').innerHTML = "";
        $('#colType').hide(); $('#col22').hide(); $('#col33').hide(); $('#col44').hide(); $('#col55').hide();
        FilterDesignation();
    }
}
function onSuccessFillddl3(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";


    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (glbVarLevelName == "Level1" || glbVarLevelName == "Level2" || glbVarLevelName == "Level3") {

            value = '-1';
            if (glbVarLevelName == "Level1") {
                name = 'Select ' + HierarchyLevel3;
            }
            if (glbVarLevelName == "Level2") {
                name = 'Select ' + HierarchyLevel4;
            }
            if (glbVarLevelName == "Level3") {
                name = 'Select ' + HierarchyLevel5;
            }
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });

            myData = "";
            levelValue = $('#ddl2').val();
            if (glbVarLevelName == "Level1") {
                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'1'}";
            }
            if (glbVarLevelName == "Level2") {
                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'2'}";
            }
            if (glbVarLevelName == "Level3") {
                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'3'}";
            }

            if (myData != "") {
                $.ajax({
                    type: "POST",
                    url: "MEmployeesService.asmx/FillDropDownList",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: onSuccessFillddl22,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }



        }
    }
}
function onSuccessFillddl22(data, status) {

    document.getElementById('ddl22').innerHTML = "";
    document.getElementById('ddl33').innerHTML = "";
    document.getElementById('ddl44').innerHTML = "";
    document.getElementById('ddl55').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        $('#col22').show();

        value = '-1';
        name = 'Select Employee';
        $("#ddl22").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl22").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
    else {
        $('#col22').show();

        value = '-1';
        name = 'Select Employee';
        $("#ddl22").append("<option value='" + value + "'>" + name + "</option>");
    }


    FilterDesignation();

}
function OnChangeddl3() {
    myData = "";
    levelValue = $('#ddl3').val(); $('#Coldepot').hide(); $('#Coldepot1').hide();
    $('#rowLogin').show();
    if (levelValue != -1) {

        if (glbVarLevelName == "Level1") {

            myData = "{'parentLevelId':'" + $('#ddl3').val() + "','levelName':'Level3'}"; $('#Coldepot').show();
        }
        if (glbVarLevelName == "Level2") {

            myData = "{'parentLevelId':'" + $('#ddl3').val() + "','levelName':'Level4'}"; $('#Coldepot').show();
        }
        if (glbVarLevelName == "Level3") {

            myData = "{'parentLevelId':'" + $('#ddl3').val() + "','levelName':'Level5'}"; $('#Coldepot').show();
        }

        if (myData != "") {

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
    else {


        $('#ddl22').val("-1");
        $('#Coldepot').hide(); $('#Coldepot1').hide();
        document.getElementById('ddl33').innerHTML = ""; document.getElementById('ddl44').innerHTML = ""; document.getElementById('ddl55').innerHTML = "";
        document.getElementById('ddl4').innerHTML = ""; document.getElementById('ddl5').innerHTML = ""; document.getElementById('ddl6').innerHTML = "";
        $('#colType').hide(); $('#col33').hide(); $('#col44').hide(); $('#col55').hide();
        FilterDesignation();
    }
}
function onSuccessFillddl4(data, status) {

    document.getElementById('ddl4').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (glbVarLevelName == "Level1" || glbVarLevelName == "Level2" || glbVarLevelName == "Level3") {

            $('#col4').show();

            value = '-1';
            if (glbVarLevelName == "Level1") {
                name = 'Select ' + HierarchyLevel4;
            }
            if (glbVarLevelName == "Level2") {
                name = 'Select ' + HierarchyLevel5;
            }
            if (glbVarLevelName == "Level3") {
                name = 'Select ' + HierarchyLevel6;
            }
            $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl4").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });

            myData = "";
            levelValue = $('#ddl3').val();
            if (glbVarLevelName == "Level1") {
                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'2'}";
            }
            if (glbVarLevelName == "Level2") {
                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'3'}";
            }
            if (glbVarLevelName == "Level3") {
                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'4'}";
            }

            if (myData != "") {
                $.ajax({
                    type: "POST",
                    url: "MEmployeesService.asmx/FillDropDownList",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: onSuccessFillddl33,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            //}
        }
    }
}
function onSuccessFillddl33(data, status) {
    document.getElementById('ddl33').innerHTML = "";
    document.getElementById('ddl44').innerHTML = "";
    document.getElementById('ddl55').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        $('#col33').show();

        value = '-1';
        name = 'Select Employee';
        $("#ddl33").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl33").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

    }
    else {
        $('#col33').show();

        value = '-1';
        name = 'Select Employee';
        $("#ddl33").append("<option value='" + value + "'>" + name + "</option>");
    }
    FilterDesignation();
}
function OnChangeddl4() {
    myData = "";
    levelValue = $('#ddl4').val(); $('#Coldepot').hide(); $('#Coldepot1').hide();
    $('#rowLogin').show();


    if (levelValue != -1) {

        if (glbVarLevelName == "Level1") {

            myData = "{'parentLevelId':'" + $('#ddl4').val() + "','levelName':'Level4'}"; $('#Coldepot').show();
        }
        if (glbVarLevelName == "Level2") {

            myData = "{'parentLevelId':'" + $('#ddl4').val() + "','levelName':'Level5'}"; $('#Coldepot').show();
        }
        if (glbVarLevelName == "Level3") {

            myData = "{'parentLevelId':'" + $('#ddl4').val() + "','levelName':'Level6'}"; $('#Coldepot').show();
        }

        if (myData != "") {

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
    else {
        $('#ddl33').val("-1");
        $('#Coldepot').hide(); $('#Coldepot1').hide();
        document.getElementById('ddl44').innerHTML = ""; document.getElementById('ddl55').innerHTML = ""; document.getElementById('ddl66').innerHTML = "";
        document.getElementById('ddl5').innerHTML = ""; document.getElementById('ddl6').innerHTML = "";
        $('#colType').hide(); $('#col44').hide(); $('#col55').hide(); $('#col66').hide();
        FilterDesignation();
    }
}
function onSuccessFillddl5(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (CurrentUserRole == 'rl2') {

            $('#col5').hide();
            $('#col6').hide();
        }
        else {

            $('#col5').show();
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            value = '-1';
            if (glbVarLevelName == "Level1") {
                name = 'Select ' + HierarchyLevel5;
            }
            if (glbVarLevelName == "Level2") {
                name = 'Select ' + HierarchyLevel6;
            }
            $("#ddl5").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {

                $("#ddl5").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });

            myData = "";
            levelValue = $('#ddl4').val();
            if (glbVarLevelName == "Level1") {
                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'3'}";
            }
            if (glbVarLevelName == "Level2") {
                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'4'}";
            }

            if (myData != "") {
                $.ajax({
                    type: "POST",
                    url: "MEmployeesService.asmx/FillDropDownList",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: onSuccessFillddl44,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            else {
                FilterDesignation();
            }
        }
    }
}
function onSuccessFillddl44(data, status) {

    document.getElementById('ddl44').innerHTML = "";
    document.getElementById('ddl55').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        $('#col44').show();

        value = '-1';
        name = 'Select Employee';
        $("#ddl44").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl44").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

    }
    else {
        $('#col44').show();

        value = '-1';
        name = 'Select Employee';
        $("#ddl44").append("<option value='" + value + "'>" + name + "</option>");
    }
    FilterDesignation();
}
function OnChangeddl5() {

    myData = "";
    levelValue = $('#ddl5').val(); $('#Coldepot').hide(); $('#Coldepot1').hide();
    $('#rowLogin').show();


    if (levelValue != -1) {

        if (glbVarLevelName == "Level1") {

            myData = "{'parentLevelId':'" + $('#ddl5').val() + "','levelName':'Level5'}"; $('#Coldepot').show();
        }

        if (myData != "") {

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
    else {
        $('#ddl44').val("-1");
        $('#Coldepot').hide(); $('#Coldepot1').hide();
        document.getElementById('ddl55').innerHTML = ""; document.getElementById('ddl66').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
        $('#colType').hide(); $('#col55').hide(); $('#col66').hide();
        FilterDesignation();
    }
}
function onSuccessFillddl6(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (CurrentUserRole == 'rl2') {

            $('#col5').hide();
            $('#col6').hide();
        }
        else {

            $('#col6').show();
            document.getElementById('ddl6').innerHTML = "";

            value = '-1';
            if (glbVarLevelName == "Level1") {
                name = 'Select ' + HierarchyLevel6;
            }
            $("#ddl6").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {

                $("#ddl6").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });

            myData = "";
            levelValue = $('#ddl5').val();
            if (glbVarLevelName == "Level1") {
                myData = "{'levelName':'" + glbVarLevelName + "','userRole':'" + CurrentUserRole + "','ddlId':'" + levelValue + "','type':'4'}";
            }

            if (myData != "") {
                $.ajax({
                    type: "POST",
                    url: "MEmployeesService.asmx/FillDropDownList",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: onSuccessFillddl55,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            else {
                FilterDesignation();
            }
        }
    }
}
function onSuccessFillddl55(data, status) {

    document.getElementById('ddl55').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        $('#col55').show();

        value = '-1';
        name = 'Select Employee';
        $("#ddl55").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl55").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

    }
    else {
        $('#col55').show();

        value = '-1';
        name = 'Select Employee';
        $("#ddl55").append("<option value='" + value + "'>" + name + "</option>");
    }
    FilterDesignation();
}
function OnChangeddl6() {
    if ($('#ddl6').val() == "-1") {
        $('#colType').hide();
        $('#Teamhide').hide();

    } else {
        $('#colType').show();
        FilterDesignation();
        $('#Teamhide').show();
    }

}
function OnChangeddl111() {

    levelValue = $('#ddl11').val();
    level1Value = $('#ddl1').val();
    level2Value = $('#ddl2').val();
    myData = "";

    if (glbVarLevelName == "Level1" && level2Value <= 0) {
        alert('GM must be selected!');
        $('#ddl11').val("-1");
        return false;
    }
    if (glbVarLevelName == "Level2" && level2Value <= 0) {
        alert('National must be selected!');
        $('#ddl11').val("-1");
        return false;
    }
    if (glbVarLevelName == "Level3" && level2Value <= 0) {
        alert('Region must be selected!');
        $('#ddl11').val("-1");
        return false;
    }
    //else {

    if (levelValue != -1) {
        //myData = "{'employeeId':'" + levelValue + "'}";

        myData = "{'type':'" + 1 + "','GM':'" + level1Value + "','BUH':'" + level2Value + "', 'national':'" + 0 + "','regional':'" + 0 + "','zonal':'" + 0
              + "','territorial':'" + 0 + "','employeeId':'" + levelValue + "'}";

        if (myData != "") {

            $.ajax({
                type: "POST",

                url: "MEmployeesService.asmx/GetEmployeeViaManager1",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl222,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
    }
    else {
        document.getElementById('ddl22').innerHTML = "";
        document.getElementById('ddl33').innerHTML = "";
        document.getElementById('ddl44').innerHTML = "";
        document.getElementById('ddl55').innerHTML = "";
    }
    //}
}
function onSuccessFillddl222(data, status) {

    document.getElementById('ddl22').innerHTML = "";
    document.getElementById('ddl33').innerHTML = "";
    document.getElementById('ddl44').innerHTML = "";
    document.getElementById('ddl55').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select Employee';
        $("#ddl22").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl22").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

    }
    else {
        value = '-1';
        name = 'Select Employee';
        $("#ddl22").append("<option value='" + value + "'>" + name + "</option>");
    }

}
function OnChangeddl222() {

    levelValue = $('#ddl22').val();
    level1Value = $('#ddl1').val();
    level2Value = $('#ddl2').val();
    level3Value = $('#ddl3').val();
    myData = "";

    if (glbVarLevelName == "Level1" && level3Value <= 0) {
        alert('National must be selected!');
        $('#ddl22').val("-1");
        return false;
    }
    if (glbVarLevelName == "Level2" && level3Value <= 0) {
        alert('Region must be selected!');
        $('#ddl22').val("-1");
        return false;
    }
    if (glbVarLevelName == "Level3" && level3Value <= 0) {
        alert('Zone must be selected!');
        $('#ddl22').val("-1");
        return false;
    }

    if (levelValue != -1) {
        myData = "{'type':'" + 2 + "','GM':'" + level1Value + "','BUH':'" + level2Value + "', 'national':'" + level3Value + "','regional':'" + 0 + "','zonal':'" + 0
              + "','territorial':'" + 0 + "','employeeId':'" + levelValue + "'}";

        if (myData != "") {

            $.ajax({
                type: "POST",
                url: "MEmployeesService.asmx/GetEmployeeViaManager1",
                //url: "MEmployeesService.asmx/GetEmployeeViaManager",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl333,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
    }
    else {

        document.getElementById('ddl33').innerHTML = "";
        document.getElementById('ddl44').innerHTML = "";
        document.getElementById('ddl55').innerHTML = "";

    }
    //}
}
function onSuccessFillddl333(data, status) {

    document.getElementById('ddl33').innerHTML = "";
    document.getElementById('ddl44').innerHTML = "";
    document.getElementById('ddl55').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select Employee';
        $("#ddl33").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl33").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
    else {

        value = '-1';
        name = 'Select Employee';
        $("#ddl33").append("<option value='" + value + "'>" + name + "</option>");
    }
}
function OnChangeddl333() {

    levelValue = $('#ddl33').val();
    level1Value = $('#ddl1').val();
    level2Value = $('#ddl2').val();
    level3Value = $('#ddl3').val();
    level4Value = $('#ddl4').val();


    myData = "";

    if (glbVarLevelName == "Level1" && level4Value <= 0) {
        alert('Region must be selected!');
        $('#ddl33').val("-1");
        return false;
    }
    if (glbVarLevelName == "Level2" && level4Value <= 0) {
        alert('Zone must be selected!');
        $('#ddl33').val("-1");
        return false;
    }
    if (glbVarLevelName == "Level3" && level4Value <= 0) {
        alert('Territory must be selected!');
        $('#ddl33').val("-1");
        return false;
    }

    if (glbVarLevelName == "Level1" || glbVarLevelName == "Level2") {
        if (levelValue != -1) {
            //myData = "{'employeeId':'" + levelValue + "'}";

            myData = "{'type':'" + 3 + "','GM':'" + level1Value + "','BUH':'" + level2Value + "', 'national':'" + level3Value + "','regional':'" + level4Value + "','zonal':'" + 0
                + "','territorial':'" + 0 + "','employeeId':'" + levelValue + "'}";

            if (myData != "") {

                $.ajax({
                    type: "POST",
                    url: "MEmployeesService.asmx/GetEmployeeViaManager1",
                    //url: "MEmployeesService.asmx/GetEmployeeViaManager",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl444,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
        }
        else {
            document.getElementById('ddl44').innerHTML = "";
            document.getElementById('ddl55').innerHTML = "";
        }
    }
}
function onSuccessFillddl444(data, status) {

    document.getElementById('ddl44').innerHTML = "";
    document.getElementById('ddl55').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select Employee';
        $("#ddl44").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl44").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
    else {

        value = '-1';
        name = 'Select Employee';
        $("#ddl44").append("<option value='" + value + "'>" + name + "</option>");
    }
}
function OnChangeddl444() {

    levelValue = $('#ddl44').val();
    level1Value = $('#ddl1').val();
    level2Value = $('#ddl2').val();
    level3Value = $('#ddl3').val();
    level4Value = $('#ddl4').val();
    level5Value = $('#ddl5').val();
    myData = "";



    if (glbVarLevelName == "Level1" && level5Value <= 0) {
        alert('Zone must be selected!');
        $('#ddl44').val("-1");
        return false;
    }
    if (glbVarLevelName == "Level2" && level5Value <= 0) {
        alert('Territory must be selected!');
        $('#ddl44').val("-1");
        return false;
    }


    if (glbVarLevelName == "Level1") {
        if (levelValue != -1) {
            //myData = "{'employeeId':'" + levelValue + "'}";
            myData = "{'type':'" + 4 + "','GM':'" + level1Value + "','BUH':'" + level2Value + "', 'national':'" + level3Value + "','regional':'" + level4Value + "','zonal':'" + level5Value
                      + "','territorial':'" + 0 + "','employeeId':'" + levelValue + "'}";
            if (myData != "") {

                $.ajax({
                    type: "POST",
                    url: "MEmployeesService.asmx/GetEmployeeViaManager1",
                    //url: "MEmployeesService.asmx/GetEmployeeViaManager",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl555,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
        }
        else {
            document.getElementById('ddl55').innerHTML = "";
        }
    }
}
function onSuccessFillddl555(data, status) {

    document.getElementById('ddl55').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select Employee';
        $("#ddl55").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl55").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
    else {

        value = '-1';
        name = 'Select Employee';
        $("#ddl55").append("<option value='" + value + "'>" + name + "</option>");
    }
}
function OnChangeddl555() {

    levelValue = $('#ddl55').val();
    level1Value = $('#ddl1').val();
    level2Value = $('#ddl2').val();
    level3Value = $('#ddl3').val();
    level4Value = $('#ddl4').val();
    level5Value = $('#ddl5').val();
    level6Value = $('#ddl6').val();
    myData = "";

    if (glbVarLevelName == "Level1" && level6Value <= 0) {
        alert('Territory must be selected!');
        $('#ddl55').val("-1");
        return false;
    }

}
function OnChangeddlRole() {

    var roleId = $('#ddlRole').val();

    if (roleId == -1) {

        $('#rowDesignation').show();

        if (glbVarLevelName == "Level3") {

            $('#lblGeographicalHierarchy').show();
            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col4').show();
        }
        else if (glbVarLevelName == "Level1") {
            ShowHierarchy();
            $('#lblUserHierarchy').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();
            $('#col44').show();
            $('#col55').show();
            $('#colType').show();
        }
        $('#ddlTeam').removeAttr('Multiple');
        $('#ddlTeam').removeAttr('style');
    }
    else if (roleId == 8) {

        HideHierarchy();
        $('#rowDesignation').hide();
        $('#Teamhide').show()
        $('#ddlTeam').attr('Multiple', true);
        $('#ddlTeam').css('height', '100');
    }
    else {

        HideHierarchy();
        $('#rowDesignation').hide();
        $('#ddlTeam').removeAttr('Multiple');
        $('#ddlTeam').removeAttr('style');
    }
}

function FilterDesignation() {
    //alert("filter designation");
    debugger
    if (designation != '') {

        level1Value = level1Id;
        level2Value = level2Id;
        level3Value = level3Id;
        level4Value = level4Id;
        level5Value = level5Id;
        level6Value = level6Id;
        myData = "";

        if (level1Value == -1) {

            FillDesignation();
        }
        else {

            if (level1Value != -1 && level2Value == -1) {

                myData = "{'level':'1'}";
            }
            else if (level1Value != -1 && level2Value != -1 && level3Value == -1) {

                myData = "{'level':'2'}";
            }
            else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value == -1) {

                myData = "{'level':'3'}";
            }
            else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value != -1 && level5Value == -1) {

                myData = "{'level':'4'}";
            }
            else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value != -1 && level5Value != -1 && level6Value == -1) {

                myData = "{'level':'5'}";
            }
            else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value != -1 && level5Value != -1 && level6Value != -1) {

                myData = "{'level':'6'}";
            }

        }

        if (myData != "") {

            $.ajax({
                type: "POST",
                url: "MEmployeesService.asmx/GetDefualtDesignation",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFilterDesignation,
                error: onError,
                cache: false
            });
        }


    } else {


        level1Value = $('#ddl1').val();
        level2Value = $('#ddl2').val();
        level3Value = $('#ddl3').val();
        level4Value = $('#ddl4').val();
        level5Value = $('#ddl5').val();
        level6Value = $('#ddl6').val();
        myData = "";

        if (level1Value == -1) {

            FillDesignation();
        }
        else {

            if (level1Value != -1 && level2Value == -1) {

                myData = "{'level':'1'}";
            }
            else if (level1Value != -1 && level2Value != -1 && level3Value == -1) {

                myData = "{'level':'2'}";
            }
            else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value == -1) {

                myData = "{'level':'3'}";
            }
            else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value != -1 && level5Value == -1) {

                myData = "{'level':'4'}";
            }
            else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value != -1 && level5Value != -1 && level6Value == -1) {

                myData = "{'level':'5'}";
            }
            else if (level1Value != -1 && level2Value != -1 && level3Value != -1 && level4Value != -1 && level5Value != -1 && level6Value != -1) {

                myData = "{'level':'6'}";
            }
        }

        if (myData != "") {

            $.ajax({
                type: "POST",
                url: "MEmployeesService.asmx/GetDefualtDesignation",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFilterDesignation,
                error: onError,
                cache: false
            });
        }
    }
}
function onSuccessFilterDesignation(data, status) {
    //debugger
    //alert(designation + 'test designation id');
    document.getElementById('ddlDesignation').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        //alert(data.d);
        value = '-1';
        name = 'Select Designation';
        $("#ddlDesignation").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddlDesignation").append("<option value='" + jsonObj[i].DesignationId + "'>" + jsonObj[i].DesignationName + "</option>");
        });

        //if (designation != '') {
        //    $("#ddlDesignation").val(designation);
        //    designation = '';
        //    alert("designation1" + designation1);
        //}
        if (modeValue = 'EditMode') {
            $("#ddlDesignation").val(designation2);
            //alert("designation2" + designation2);
        }
    }
}
// Button Events
function btnSaveClicked() {
    debugger
    var isValidated = "";
    var pass = 1;
    $('#txtAppointmentDate').attr('name', 'txtAppointmentDate');
    $('#txtMobileNumber').attr('name', 'txtMobileNumber');
    isValidated = $('#form1').validate({
        ignore: ":hidden",
        rules: {
            txtFirstName: {
                required: true,
                alpha: true
            }
            , txtLastName: {
                required: true,
                alpha: true

                //}
                //,
                //txtAppointmentDate: {
                //    required: true,
                //    date: true
                //},
                //txtPass: {
                //    required: true,

                //}
                //, txtMiddleName: {
                ,
                alpha: true
            }
            , txtMobileNumber: {
                required: true
            }
            , txtEmail: {
                email: true
            }
            , days: {

                number: true
            }
            , txtLoginId: {
                required: true,
                alphanumeric: true
            }
            , txtEmpCode: {
                required: true,
                alphanumeric: true
            }
        }
    });

    if (!$('#form1').valid()) {
        return false;
    }

    levelValue = $('#ddl4').val();
    levelValue1 = $('#ddl1').val();
    levelValue2 = $('#ddl2').val();
    levelValue3 = $('#ddl3').val();
    levelValue4 = $('#ddl4').val();
    levelValue5 = $('#ddl5').val();
    levelValue6 = $('#ddl6').val();




    if (levelValue6 != -1 && levelValue6 != null) {
        if ($('#ddlType').val() == -1 || $('#ddlType').val() == null) {
            alert('Select Employee Type to proceed');
            return false;
        }

        if ($('#ddlTeam').val() == -1 || $('#ddlTeam').val() == null) {
            alert('Select Team Name to proceed');
            return false;
        }
    }

    if ($("#ddlCity").val() == "0") {
        alert('Select City to proceed');
        return false;
    }

    if (pass > 0) {

        mode = $('#hdnMode').val();

        if (mode === "AuthorizeMode") {

            mode = "AddMode"; $('#hdnMode').val("AddMode")
        }
        else if (mode === "") {

            mode = "AddMode";
        }

        DefaultData();

        if (mode === "AddMode") {

            SaveData();
        }
        else if (mode === "EditMode") {

            UpdateData();
        }
        else {

            return false;
        }
    }

    return false;
}
function btnCancelClicked() {

    $('#hdnMode').val("AddMode");
    ClearFields();
    ajaxCompleted();
    $("#btnRefresh").trigger('click');
    return false;
}
function btnYesClicked() {

    mode = $('#hdnMode').val();
    if (mode === "DeleteMode") {
        myData = "{'employeeId':'" + EmployeeId + "'}";

        $.ajax({
            type: "POST",
            url: "MEmployeesService.asmx/DeleteEmployee",
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
    else {

        myData = "{'employeeId':'" + EmployeeId + "'}";

        $.ajax({
            type: "POST",
            url: "MEmployeesService.asmx/ResetEmployeeDevice",
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
function btnNoClicked() {

    $('#divConfirmation').jqmHide();
    $('#hdnMode').val("AddMode");
    ClearFields();
    ajaxCompleted();
    return false;
}
function btnOkClicked() {

    $('#Divmessage').jqmHide();

    if (FlagForExist == 0) {
        $("#btnRefresh").trigger('click');
        ClearFields();
        ajaxCompleted();
        $('#hdnMode').val("AddMode");
    }
    return false;
}

// Obout Grid Events
function oGrid_Edit(sender) {
    if (Flag == 0) {
        $('#hdnMode').val("EditMode");
        $('#txtPass').val("");
        EmployeeId = sender.toString();
        GetCurrentUserLoginID();
    }
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    EmployeeId = sender.EmployeeId;
    $('#divConfirmation').jqmShow();

    //For IMEI RESET DONE BY SHAHRUKH 3-11-2020
    $('#fordelete').show();
    $('#forresetdeevice').hide();
}

//For IMEI RESET DONE BY SHAHRUKH 3-11-2020
function oGrid_ResetDevice(sender) {
    debugger;
    $('#hdnMode').val("ResetDeviceMode");
    //EmployeeId = sender.EmployeeId;
    EmployeeId = sender;
    $('#fordelete').hide();
    $('#forresetdeevice').show();
    $('#divConfirmation').jqmShow();
}

function get_pree_days() {

    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/GetEmployee_pree_days",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetEmployees_pree_days,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        async: true
    });

}

function onSuccessGetEmployees_pree_days(data, status) {

    if (data.d != "") {

        $('#days').val(data.d);

    }
    GetEmployeeType();

}





function GetCities() {

    debugger
    $.ajax({
        type: "Post",
        url: "MEmployeesService.asmx/FilldropdownCity",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessFillCities,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        async: true

    })
}

function OnSuccessFillCities(response, status) {
    debugger

    var jsonObjNew = $.parseJSON(response.d);

    value = '0';
    name = 'Select City';
    $("#ddlCity").empty();
    $("#ddlRelatedCity").empty();
    $("#ddlCity").append("<option value='" + value + "'>" + name + "</option>");
    $.each(jsonObjNew, function (i, tweet) {
        $("#ddlCity").append("<option value='" + jsonObjNew[i].ID + "'>" + jsonObjNew[i].City + "</option>");
        $("#ddlRelatedCity").append("<option value='" + jsonObjNew[i].ID + "'>" + jsonObjNew[i].City + "</option>");
    });

}

function GetCityByEmpId() {
    myData = "{'EmployeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "MEmployeesService.asmx/GetCityDetailsByEmpId",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCityByEmpId,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        async: true
    });
}

function onSuccessGetCityByEmpId(response) {
    var arrayOfRelatedCities = [];
    if (response.d != '') {
        var jsonObjNew = $.parseJSON(response.d);

        $("#ddlCity").val(jsonObjNew[0].baseCity);

        // $("#ddlCity option:contains(" + jsonObjNew[0].baseCity + ")").attr('selected', 'selected');

        $.each(jsonObjNew[0].RelCities.split(","), function (i, tweet) {

            if (!isNaN(parseInt(tweet))) {

                arrayOfRelatedCities.push(parseInt(tweet));
            }
        });


        $('#ddlRelatedCity').val(arrayOfRelatedCities).trigger("change");

        $('#chkCarAllowance').attr("checked", (jsonObjNew[0].CarAllowance == "1") ? true : false);
        $('#chkBikeAllowance').attr("checked", (jsonObjNew[0].BikeAllowance == "1") ? true : false);
        $('#chkIBA').attr("checked", (jsonObjNew[0].IBA == "1") ? true : false);
        //  $("#ddlCity").val(jsonObjNew[0].baseCity);

        //$("#ddlCity option:contains(" + jsonObjNew[0].baseCity + ")").attr('selected', 'selected');

    }


    //$.each(jsonObjNew, function (i, tweet) {
    //    arrayOfRelatedCities = [];
    //    if (jsonObjNew[i].IsBaseCity=="1") {
    //        $("#ddlCity").val(jsonObjNew[i].CityId);
    //        $('select#ddlCity').select2().val(null).trigger("change").val(jsonObjNew[i].CityId).trigger("change");
    //    }
    //    else
    //    {
    //        arrayOfRelatedCities.push(jsonObjNew[i].CityId);
    //    }
    //    
    //});

}



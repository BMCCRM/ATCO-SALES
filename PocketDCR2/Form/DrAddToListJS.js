// Global Variables
var EmployeeId = 0, DoctorId = 0, LevelId1 = 0, LevelId2 = 0, LevelId3 = 0, LevelId4 = 0, LevelId5 = 0, LevelId6 = 0, levelValue = 0, doctorLevel = 0, tempLevelId = 0,
    level1Value = 0, level2Value = 0, level3Value = 0, level4Value = 0, level5Value = 0, level6Value = 0, brickId = 0;
var CurrentUserLoginId = "", CurrentUserRole = "", glbVarLevelName = "", glbQualificationId = "", glbSpecialityId = "", glbClassId = "", glbProductId = "", MiddleName = "",
    Designation = "", Address1 = "", Address2 = "-", MobileNumber2 = "", CNICNum = "", LicenseNum = "", myData = "", value = "", name = "", levelName = "", modeValue = "", msg = "", mode = "";
var jsonObj = null;
var HierarchyLevel1 = null, HierarchyLevel2 = null, HierarchyLevel3 = null, HierarchyLevel4 = null, HierarchyLevel5 = null, HierarchyLevel6 = null;
var ids = [];
var docIds = [];
var MonthDate = [];
var docIdsRemove = [];
var empIds = [];
var checkedboxes;
var checkedboxesUpdate;
var checkedboxesRemove;
var addDocID = [];
var UpdateAndRemoveDocID = [];
var UpdateReqStatus = [];
var addCheckedBoxes;
var reqCheckedBoxes;
var isApproved = 0;
var SelectBrickID = 0;
var SelectBrickName = 0;
var SelectDistributorID = 0;
var SelectDistributorName = 0;
var SelectClassName = 0;
var Selectfrequency = 0;
var SelectClassId = 0;
var removeDocID = [];
var removeCheckedBoxes;
var RequestStatus = '';
var brickIDddl = 0;
var current_month = '';
var current_year = '';
var mio = '';
var zsm = '';
var l1 = '';
var l2 = '';
var l3 = '';
var l4 = '';
var l5 = '';
var l6 = '';
var l7 = '';
var Role = '';

// Page Load Event
function pageLoad() {


    $("#DrAddToListTabs").tabs(); 

    GetAllClass();
    GetAllDistributors();
    GetMultiSelectDistributors();
    GetMultiSelectClass();


    //Comment by Meraj assign by Mr Rahim
    //$('#btnDetailsUpdate').hide();
    //$('#DistributorUpdate').hide();
    
    //Comment by Meraj assign by Mr Rahim
    if (CurrentUserRole == "rl6") {
        $('#showlistybtn').show();
        $('#ApproveAll').hide();
        $('#btnApproveAllAddTolist').hide();
        $('#btnRejectAllAddTolist').hide();
        $('#btnmylist').show();
        $('#btnApproveUpdateAll').hide();
        $('#ApproveUpdateAll').hide();
        $('#btnRemovell').hide();
    } else {
        $('#showlistybtn').hide();
        $('#btnmylist').hide();
    }
    $("#dialog1").hide();
    $('#btnApproveYes').click(btnApproveClicked);
    $('#btnRequestYes').click(btnRequestClicked);
    $('#btnRequestNo').click(btnRequestNOClicked);
    $('#btnRemoveYes').click(btnRemoveClicked);
    $('#btnRemoveNo').click(btnRemoveNoClicked);

    $('#btnAdminRemoveYes').click(btnAdminRemoveClicked);
    $('#btnAdminRemoveNo').click(btnAdminRemoveNoClicked);

    $('#btnApproveNo').click(btnApproveNoClicked);
    $('#btnApprovedOk').click(btnApprovedOkClicked);
    $('#btnUpdateApprovedOk').click(btnUpdateApprovedOkClicked);
    $('#btnApprovedOk1').click(btnRemoveOkClicked);
    $('#btnRequestOk').click(btnRRequestOkClicked);
    $old('#divApproveConfirmation').jqm({ modal: true });
    $old('#divRemoveConfirmation').jqm({ modal: true });
    $old('#divAdminRemoveConfirmation').jqm({ modal: true });
    $old('#divRequestApproveConfirmation').jqm({ modal: true });
    $old('#ApproveOkDivmessage').jqm({ modal: true });
    $old('#RemoveOkDivmessage').jqm({ modal: true });    
    $old('#ApproveUpdateOkDivmessage').jqm({ modal: true });
    $old('#divRemoveAllConfirmation').jqm({ modal: true });
    $('#btnmylist').click(btnmylistClicked);
    $('#CityNameMulti').val('');
    $('#btnAddListYes').click(btnAddListClicked);
    $('#btnAddListNo').click(btnAddListNoClicked);
    $('#btnAddListOk').click(btnAddListOkClicked);
    $old('#divAddtoListConfirmation').jqm({ modal: true });
    $old('#AddListOkDivmessage').jqm({ modal: true });
    $old('#RequestOkDivmessage').jqm({ modal: true });
    $('#btnDetailsSubmit').click(btnDetailsSubmitClicked);
    $('#btnDetailsUpdate').click(btnDetailsUpdateClicked);
    $('#btnDetailsCancel').click(btnDetailsCancelClicked);
    $('#btnDetailsCancel1').click(btnDetailsCancel1Clicked);
    $old('#divClassIdAndFrequency').jqm({ modal: true });
    $old('#divClassIdAndFrequencyUpdate').jqm({ modal: true });
    
    $old('#divApproveAllConfirmation').jqm({ modal: true });
    $old('#divApproveUpdateAllConfirmation').jqm({ modal: true });

    $old('#multipleClassandFrequency').jqm({ modal: true });
    $('.close').click(resetAddToList);
    $('#addToListbtn').click(addMutipleDocsList);
    $('.btnDetailsSubmit').click(multiplebtnDetailsSubmitClicked);
    $('#btnDetailsMultiUpdate').click(multiplebtnDetailsUpdateClicked);
    $('.btnDetailsCancel').click(multiplebtnDetailsCancelClicked);
    $('#btnDetailsMultiCancel1').click(multiplebtnUpdateDetailsCancelClicked);
    $('#DistributorUpdate').change(OnChangeddlForBrick);
    $('#DistributorMultiUpdate').change(OnChangeddMultiSelectForBrick);
    $('#singleBrickUpdate').change(GetAllBricks);
    $('#BrickMultiUpdate').change(GetMultiBricksClass);
    $('.close').click(resetAddToListRemove);
    $('#UpdateListbtn').click(addMutipleDocsListUpdate);
    $old('#multipleClassandFrequencyUpdate').jqm({ modal: true });
    $('#removeListbtn').click(removeMutipleDocsList);

    $('#btnApproveAllAddTolist').click(AddtoListApproveAll);
    $('#btnRejectAllAddTolist').click(ApproveAllForReject);

    $('#btnApproveUpdateAll').click(UpdateDoctorDistributorApproveAll);
    $('#btnRejectUpdateAll').click(UpdateDoctorDistributorForReject);

    $('#btnApproveRemoveAll').click(DoctorRemoveApproveAll);
    $('#btnRejectRemoveAll').click(DoctorRemoveForReject);

    var cdt = new Date();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var current_mint = cdt.getMinutes();
    var current_hrs = cdt.getHours();
    var current_date = cdt.getDate();
    current_date2 = current_date;

    current_month = cdt.getMonth();
    current_month = current_month + 1;
    var month_name = monthNames[current_month];
    current_year = cdt.getFullYear();

    $('#stdate').val(current_month + '/' + current_date2 + '/' + current_year);

    //hierarchy Setup

    IsValidUser();

    $('#ddl1').change(OnChangeddl1);
    $('#ddl2').change(OnChangeddl2);
    $('#ddl3').change(OnChangeddl3);
    $('#ddl4').change(OnChangeddl4);
    $('#ddl5').change(OnChangeddl5);
    $('#ddl6').change(OnChangeddl6);
    $('#ddlTeam').change(ONteamChnageGethierarchy);


    $('#dG1').change(OnChangeddG1);
    $('#dG2').change(OnChangeddG2);
    $('#dG3').change(OnChangeddG3);
    $('#dG4').change(OnChangeddG4);
    $('#dG5').change(OnChangeddG5);
    $('#dG6').change(OnChangeddG6);
    $('#dG7').change(ONteamChnageGetlevel);

    HideHierarchy();
    GetCurrentUser();

    $('#dG1').select2({
        dropdownParent: $('#g1')
    });
    $('#dG2').select2({
        dropdownParent: $('#g2')
    });
    $('#dG3').select2({
        dropdownParent: $('#g3')
    });
    $('#dG4').select2({
        dropdownParent: $('#g4')
    });
    $('#dG5').select2({
        dropdownParent: $('#g5')
    });
    $('#dG6').select2({
        dropdownParent: $('#g6')
    });
    $('#dG7').select2({
        dropdownParent: $('#g7')
    });

    $('#ddlTeam').select2({
        dropdownParent: $('#col77')
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
    $("#stdate").change(function () {
        Fillmydocs(EmployeeId);
    });
}

function OnChangeddlForBrick() {
    var DistributorUpdate = $('#DistributorUpdate').val();
    myData = "{'DistributorId':'" + DistributorUpdate + "'}";
    if (DistributorUpdate != -1) {

        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/GetAllBricks",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: FillddlAllBricks,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false,
            async: false
        });
    }
}

function GetAllBricks() {
    var singleBrickUpdate = $('#singleBrickUpdate').val();
    myData = "{'singleBrick':'" + singleBrickUpdate + "'}";
    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetBricks",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddOneBricks,
        error: onError,
        cache: false
    });
}

function FillddOneBricks(data, status) {

    if (SelectBrickID != '') {
       $("#singleBrickUpdate").append("<option value='" + SelectBrickID + "' selected='selected'>" + SelectBrickName + "</option>");
    }
    else {

        var city = $("#CityID").val('');
        var CityName = $('#CityName').val('');
        if (data.d != "") {

            jsonObj = jsonParse(data.d);

            $(city).val(jsonObj[0].CityID)
            $(CityName).val(jsonObj[0].CityName)
        }
    }
}

function FillddlAllBricks(data, status) {
    var Value = "Select Brick";
    var A = document.getElementById('singleBrickUpdate').innerHTML = null;
    var B = A;
    $("#singleBrickUpdate").append("<option value='" + -1 + "' selected='selected'>" + Value + "</option>");
    //$("#singleBrickUpdate").val = null;
    if (SelectBrickID != '') {
        $("#singleBrickUpdate").append("<option value='" + SelectBrickID + "' selected='selected'>" + SelectBrickName + "</option>");
    }
    else {
        if (data.d != "") {

            jsonObj = jsonParse(data.d);

            $.each(jsonObj, function (i, tweet) {
                $("#singleBrickUpdate").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].BrickName + "</option>");
            });
        }
    }
    if (brickIDddl != '' || brickIDddl != 0 || brickIDddl != null) {
        $("#singleBrickUpdate").val(brickIDddl);
    }
}

function GetAllDistributors() {

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetAllDistributors",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddlAllDistributors,
        error: onError,
        cache: false
    });
}

function FillddlAllDistributors(data, status) {
    var SelectDistributor = 'Select Distributor';
    if (SelectDistributorID != '') {
        $("#DistributorUpdate").val(SelectDistributorID);
    }
    else {
        if (data.d != "") {

            jsonObj = jsonParse(data.d);

            $.each(jsonObj, function (i, tweet) {
                $("#DistributorUpdate").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].DistributorName + "</option>");
            });
        }
    }
}

function GetMultiSelectDistributors() {

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetAllDistributors",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddlMultiSelectDistributors,
        error: onError,
        cache: false
    });
}

function FillddlMultiSelectDistributors(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, tweet) {
            $("#DistributorMultiUpdate").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].DistributorName + "</option>");
        });
    }
}

function OnChangeddMultiSelectForBrick() {
    var DistributorUpdate = $('#DistributorMultiUpdate').val();
    myData = "{'DistributorId':'" + DistributorUpdate + "'}";
    if (DistributorUpdate != -1) {

        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/GetAllBricks",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: FillddlMultiAllBricks,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
}

function FillddlMultiAllBricks(data, status) {
    var Value = "Select Brick";
    var A = document.getElementById('BrickMultiUpdate').innerHTML = null;
    var B = A;
    $("#BrickMultiUpdate").append("<option value='" + -1 + "' selected='selected'>" + Value + "</option>");

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, tweet) {
            $("#BrickMultiUpdate").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].BrickName + "</option>");
        });
    }
}

function GetMultiBricksClass() {
    var singleBrickUpdate = $('#BrickMultiUpdate').val();
    myData = "{'singleBrick':'" + singleBrickUpdate + "'}";
    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetBricks",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddOneBricksClass,
        error: onError,
        cache: false
    });
}

function FillddOneBricksClass(data, status) {

    var city = $("#CityIDMulti").val('');
    var cityName = $("#CityNameMulti").val('');
    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $(city).val(jsonObj[0].CityID)
        $(cityName).val(jsonObj[0].CityName)
    }
}

function GetMultiSelectClass() {

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetAllClasses",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddlMultiSelectClass,
        error: onError,
        cache: false
    });
}

function FillddlMultiSelectClass(data, status) {
    var Value = "Select ClassName";
    var A = document.getElementById('MultiClassUpdate').innerHTML = null;

    $("#MultiClassUpdate").append("<option value='" + -1 + "'selected='selected'>" + Value + "</option>");
    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, tweet) {
            $("#MultiClassUpdate").append("<option value='" + jsonObj[i].ClassId + "'>" + jsonObj[i].ClassName + "</option>");
        });
    }
}

function startingAjax() {

    $('#UpdateProgress1').show();
}

function ajaxCompleted() {

    $('#UpdateProgress1').hide();
}

function GetAllClass() {

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetAllClasses",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddlAllClass,
        error: onError,
        cache: false
    });
}

function FillddlAllClass(data, status) {
    //var Value = "Select ClassName";
    //var A = document.getElementById('singleClassUpdate').innerHTML = null;
    //var A = document.getElementById('multipleClass').innerHTML = null;
    //var A = document.getElementById('singleClassUpdate').innerHTML = null;
    //$("#singleClassUpdate").append("<option value='" + -1 + "' selected='selected'>" + Value + "</option>");
    //$("#multipleClass").append("<option value='" + -1 + "'selected='selected'>" + Value + "</option>");
    //$("#singleClassUpdate").append("<option value='" + -1 + "'selected='selected'>" + Value + "</option>");
    if (SelectClassId != '') {
        $("#singleClass").append("<option value='" + SelectClassId + "' selected='selected'>" + SelectClassName + "</option>");
        $("#multipleClass").append("<option value='" + SelectClassId + "'selected='selected'>" + SelectClassName + "</option>");
        $("#singleClassUpdate").append("<option value='" + SelectClassId + "'selected='selected'>" + SelectClassName + "</option>");
        // $("#multipleClass").append("<option value='" + SelectClassId + "' selected='selected'>" + SelectClassName + "</option>");
        //$("#singleClassUpdate").append("<option value='" + SelectClassId + "' selected='selected'>" + SelectClassName + "</option>");
    }
    else {
        if (data.d != "") {

            jsonObj = jsonParse(data.d);

            $.each(jsonObj, function (i, tweet) {
                $("#singleClass").append("<option value='" + jsonObj[i].ClassId + "'>" + jsonObj[i].ClassName + "</option>");
                $("#multipleClass").append("<option value='" + jsonObj[i].ClassId + "'>" + jsonObj[i].ClassName + "</option>");
                $("#singleClassUpdate").append("<option value='" + jsonObj[i].ClassId + "'>" + jsonObj[i].ClassName + "</option>");
            });
        }
    }
}

function GetEmployeesLevel6() {
    //var TeamID = $("#ddlT").val();

    $.ajax({
        type: "POST",
        url: "../Reports/NewDashboard.asmx/FillEmployeesLevel6",
        contentType: "application/json; charset=utf-8",
        data: "{'TeamID':'" + -1 + "'}",
        success: onSuccessGetEmployeesLevel6,
        error: onError,
        cache: false,
        asyn: false
    });
}

function onSuccessGetEmployeesLevel6(data, status) {
    document.getElementById('ddl3p').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select Employee...';
        $("#ddl3p").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl3p").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
}

function OnChangeddlp6() {
    var empid = $("#ddl3p").val();
    FillGrid(empid);
    FillGridRequest(empid);
    FillGridRemove(empid);
}

function SelectAllApproveCheckBoxes() {

    if ($('input[name="ApproveAll"]').is(':checked')) {
        $('.approveCheckBox').prop('checked', true);
    } else {
        $('.approveCheckBox').prop('checked', false);
    }
}

function SelectAllUpdateApproveCheckBoxes() {

    if ($('input[name="ApproveUpdateAll"]').is(':checked')) {
        $('.approveUpdateCheckBox').prop('checked', true);
    } else {
        $('.approveUpdateCheckBox').prop('checked', false);
    }
}

function SelectAllRemoveApproveCheckBoxes() {

    if ($('input[name="RemoveAll"]').is(':checked')) {
        $('.approveRemoveCheckBox').prop('checked', true);
    } else {
        $('.approveRemoveCheckBox').prop('checked', false);
    }
}

function SelectAllApproveMultiCheckBoxes() {

    if ($('input[name="MultiAll"]').is(':checked')) {
        $('.MultiapproveCheckBox').prop('checked', true);
    } else {
        $('.MultiapproveCheckBox').prop('checked', false);
    }
}

function SelectAllRemoveMultiCheckBoxes() {

    if ($('input[name="MultiAll"]').is(':checked')) {
        $('.MultiRemoveCheckBox').prop('checked', true);
    } else {
        $('.MultiRemoveCheckBox').prop('checked', false);
    }
}

function locationCompare(plat, plng, padd) {
    $("#dialog1").dialog({
        modal: true,
        width: 800
    });
    $("#padd").text(padd);

    initMap(plat, plng, padd);


}

function initMap(plat, plng, padd) {
    plat = plat == "" ? "0" : plat;
    plng = plng == "" ? "0" : plng;
    
    var myLatLng = { lat: parseFloat(plat), lng: parseFloat(plng) };    

    if (plat == "0" && plng == "0") {
        myLatLng = { lat: parseFloat("30.3753"), lng: parseFloat("69.3451") };
    }
    var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Previous location</h1>' +
            '<div id="bodyContent">' +
            '<p><strong style="font-weight: bold;">Address : </strong>' + padd + ' </p>'
    '</div>' +
    '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });


    var map = new google.maps.Map($("#dvMap")[0], {
        zoom: 8,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });


    if (plat != "0" && plng != "0") {
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Previous location'
        });
    }
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
}

function GetSelectHierarchy() {

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
        l7 = $('#dG7').val()

        mio = $('#ddl6').val();
        zsm = $('#ddl5').val();
    }
    if (CurrentUserRole == 'marketingteam') {
        mio = $('#ddl6').val();
        zsm = $('#ddl5').val();
    }
    else if (CurrentUserRole == 'rl1') {
        l7 = $('#dG3').val()

        mio = $('#ddl5').val();
        zsm = $('#ddl4').val();
    }
    else if (CurrentUserRole == 'rl2') {
        l7 = $('#dG2').val()

        mio = $('#ddl4').val();
        zsm = $('#ddlTeam').val();
    }
    else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        l7 = $('#dG1').val()

        mio = $('#ddlTeam').val();
        zsm = $('#ddl3').val();
    }
    else if (CurrentUserRole == 'rl4') {
        l7 = $('#dG1').val();

        mio = $('#ddlTeam').val();
        zsm = $('#ddl2').val();
    }
    else if (CurrentUserRole == 'rl5') {
        l7 = 0;

        mio = $('#ddl1').val();
        zsm = EmployeeId;
    }
    else if (CurrentUserRole == 'rl6') {
        l7 = 0;

        mio = EmployeeId;
        zsm = '0';
    }

    l1 = $('#h2').val();
    l2 = $('#h3').val();
    l3 = $('#h4').val();
    l4 = $('#h5').val();
    l5 = $('#h12').val();
    l6 = $('#h13').val();

    if (CurrentUserRole == 'headoffice') {
        l1 = 0;
        l2 = 0;
        l3 = 0;
    }

    if (l1 == '-1') {
        l1 = 0;
    }
    if (l2 == '-1') {
        l2 = 0;
    }
    if (l3 == '-1') {
        l3 = 0;
    }
    if (l4 == '-1') {
        l4 = 0;
    }
    if (l5 == '-1') {
        l5 = 0;
    }
    else if (zsm == '-1' || zsm == null) {
        l5 = 0;
    }

    if (l6 == '-1') {
        l6 = 0;
        l8 = 0;
    }
    else if (mio == '-1' || mio == null) {
        l6 = 0;
        l8 = 0;
    }
    else {
        l8 = mio;
    }

    l9 = $('#h7').val();

    l11 = $('#h9').val();
    l12 = $('#h10').val();

    if (l9 == '-1') { l9 = 0 }
    if (l9 == '') { l9 = 0 }
    if (l9 == 'null') { l9 = 0 }
    if (l7 == '-1') { l7 = 0 }
    if (l7 == '') { l7 = 0 }
    if (l7 == null) { l7 = 0 }
    if (l11 == '-1') { l11 = 0 }
    if (l11 == '') { l11 = 0 }
    if (l11 == 'null') { l11 = 0 }
    if (l12 == '-1') { l12 = 0 }
    if (l12 == '') { l12 = 0 }
    if (l12 == 'null') { l12 = 0 }

    l10 = 0;

    Role = CurrentUserRole;
}

//#region Doctor AddToList Start


//------------------------------------------------------------------- List Doc Gird -----------------------------------------------------------//

function btnmylistClicked() {

   // debugger

    Fillmydocs(EmployeeId);
}

function Fillmydocs(empid) {

 //   debugger


    GetSelectHierarchy();
    $('.loding_box_outer').show();
    var mydata = "{'Level1Id':'" + l1 + "','Level2Id':'" + l2 + "','Level3Id':'" + l3 + "','Level4Id':'" + l4 + "','Level5Id':'" + l5 +
                "','Level6Id':'" + l6 + "','TeamID':'" + (l7 == null ? 0 : l7) + "','Role':'" + Role + "','date':'" +$('#stdate').val() + "'}";
    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetAllDCRDoctor",
        data: mydata,
        contentType: "application/json; charset=utf-8",
        success: OnsuccessFillmydocs,
        error: onError,
        async: true,
        cache: false
    });
}

function OnsuccessFillmydocs(data) {


    //debugger 

    flagForDoctorExist = 0;
    var table = "";
    if (data != "") {
        $('#myinlistdivgrid').empty();
        $('#myinlistdivgrid').append("<div class='btn' style='float:right;' id='downdoctlist'></div>" +
        "<table id='grid-unlistdocs1' class='table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'>" +
        "<thead  style='background: darkgray;'>" +
        "<tr id='grid-header'>" +
        "<th data-column-id='SelectAll'>Select <input style='vertical-align: middle;margin-top: 14px;margin-left: -19px;position: absolute;' type='checkbox' name='MultiAll' onClick=\"SelectAllRemoveMultiCheckBoxes(),showRemoveListButton();\"></th> " +
        "<th>Code</th> " +
        "<th>Doctor Name</th> " +
        "<th>Qualification</th> " +
        "<th>Designation</th> " +
        "<th>Speciality</th> " +
        "<th>Class</th> " +
        "<th>Frequency</th> " +
            "<th>Address</th> " +
            "<th>Dr Address2</th>" +
            "<th>Dr Address3</th>" +
            "<th>Dr Address4</th>" +
            "<th>Dr Address5</th>" +
        "<th>City</th> " +
        "<th>DOC Brick</th> " +
        "<th>Brick Code</th> " +
        "<th>IMS Brick Name</th> " +
        "<th>Distributor</th> " +
        "<th>Date</th> " +
        "<th>Edit</th> " +
        "<th>Remove</th> " +
        "<th>Remarks</th> " +
        "</tr>" +
        "</thead>" +
        "<tbody id='valuesgrid'>");
        var msg = "";
        if (data.d == undefined) {
            msg = $.parseJSON(data);
        }
        else {
            if (data.d != "")
                msg = $.parseJSON(data.d);
            else
                msg = 0;
        }
        var val = '';
        if (msg.length > 0) {
            for (var i = 0; i < msg.length ; i++) {
                var ButtonStatus = '';
                var Select = '';
                var RemoveDoctor = '';
                ButtonStatus = "<a id='val" + i + "' onClick=\"oGrid_AddToListUpdate('" + msg[i].DoctorId + "','" + i + "','" + msg[i].BrickId + "','" + msg[i].DistributorId + "','" + msg[i].Distributor + "','" + msg[i].Brick + "','" + msg[i].ReqStatus + "','" + msg[i].CityID + "','" + msg[i].frequency + "','" + msg[i].ClassId + "','" + msg[i].ClassName + "','" + msg[i].City + "'),GetAllDistributors(),OnChangeddlForBrick(),GetAllBricks();\" href='javascript:void(0)' style='color:blue'>Edit</a>";
                Select = msg[i].ReqStatus == "InList" ? "<input type='checkbox' name='RemoveCheckBox' class='MultiRemoveCheckBox' style = 'vertical-align: middle; width:50px;' data-reqid='" + msg[i].ReqStatus + "' value='" + msg[i].DoctorId + "' onClick=\"showRemoveListButton();\"  />" : msg[i].ReqStatus;
                RemoveDoctor = msg[i].ReqStatus == "InList" ? "<a onClick=\"oGrid_RemoveToList('" + msg[i].DoctorId + "');\" href='Javascript:void(0);'>Remove-To-List</a>" : msg[i].ReqStatus;
                val = "<tr>" +
                "<td>" + (Select) + "</td>" +
                "<td>" + msg[i].DoctorCode + "</td>" +
                "<td>" + msg[i].DoctorName + "</td>" +
                "<td>" + msg[i].Qualification + "</td>" +
                "<td>" + msg[i].Designation + "</td>" +
                "<td>" + msg[i].Speciality + "</td>" +
                "<td>" + msg[i].ClassName + "</td>" +
                "<td>" + msg[i].frequency + "</td>" +
                    "<td>" + msg[i].Address1 + "</td>" +
                    //----------------------------------- Addresss ---------------------------------------------

                    "<td>" + msg[i].Address2 + "</td>" +
                    "<td>" + msg[i].Address3 + "</td>" +
                    "<td>" + msg[i].Address4 + "</td>" +
                    "<td>" + msg[i].Address5 + "</td>" +
                   //----------------------------------- End ---------------------------------------------------------
                "<td>" + msg[i].City + "</td>" +
                "<td>" + msg[i].Brick + "</td>" +
                "<td>" + msg[i].IMSBrickCode + "</td>" +
                "<td>" + msg[i].IMSBrickName + "</td>" +
                "<td>" + msg[i].Distributor + "</td>" +
                "<td>" + msg[i].MonthofDoctorList + "</td>" +
                "<td>" + (ButtonStatus) + "</td>" +
                "<td>" + (RemoveDoctor) + "</td>" +
                "<td>" + msg[i].ReqStatus + "</td>";
                $('#valuesgrid').append(val);
            }
            $('#grid-unlistdocs1').DataTable({
                "autoWidth": true,
                deferRender: true,
                "bProcessing": true,
                "bDeferRender": true,
                columnDefs: [{ orderable: false, "targets": 0 }],
                "order": [[0, "desc"]]
                //columnDefs: [{ "width": "150px", orderable: false, "targets": 0 }, { "width": "250px", orderable: false, "targets": 7 }]
            });
        }
    }
}

function FillSpecialities() {

    var mydata = "{'EmployeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetSpecialityByEmpId",
        data: mydata,
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d != '' && response.d != '[]') {
                var msg = $.parseJSON(response.d);
                $('#ddlSpeciality').empty();
                $('#ddlSpeciality').append('<option value="-1" selected="selected">Select...</option>');
                for (var i = 0; i < msg.length ; i++) {
                    //$('#ddlSpeciality').append('<option value="' + msg[i].Speciality + '">' + msg[i].Speciality + '</option>');
                    if (i < 1) {
                        $('#ddlSpeciality').append('<option value="' + msg[i].Speciality + '">' + msg[i].Speciality + '</option>');
                    } else {
                        $('#ddlSpeciality').append('<option value="' + msg[i].Speciality + '">' + msg[i].Speciality + '</option>');
                    }
                }
            }
        },
        error: onError,
        async: false,
        cache: false
    });
}

function FillRelatedCity() {

    var mydata = "{'EmployeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        //url: "DoctorsService.asmx/GetCityByEmpId",
        url: "DoctorsService.asmx/FilldropdownCity",
        data: mydata,
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d != '' && response.d != '[]') {
                var msg = $.parseJSON(response.d);
                $('#ddlRelatedCity').empty();

                for (var i = 0; i < msg.length ; i++) {

                    $('#ddlRelatedCity').append('<option value="' + msg[i].ID + '">' + msg[i].City + '</option>');

                }
            }
        },
        error: onError,
        async: false,
        cache: false
    });
}

function FillUnlistdocs(empid, speciality, city) {
    var date = $('#stdate').val();
    var arr = date.split('/');
    if (arr[0] < current_month || arr[2] < current_year) {
        alert('Please select Current Month or Next Month');
        $('#inlistdivgrid').empty();
        $old('#dialog').jqmHide();

    }
    else {
        var mydata = "{'empid':'" + empid + "','speciality':'" + speciality + "','city':'" + city + "'}";

        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/GetUnListedDocs",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: OnsuccessfillgridUnlistDocs,
            error: onError,
            async: true,
            cache: false
        });
    }
}

function OnsuccessfillgridUnlistDocs(data) {

    if (data.d != "" && data.d != "[]") {
        $('#inlistdivgrid').empty();
        $('#inlistdivgrid').append("<table id='grid-unlistdocs' class='dataTables_info dataTables_filter' style='border: 1px solid #616262;'><thead  style='line-height: 0;' >" +
                                   "<tr class='ob_gC'> " +
                                   "<th data-column-id='SelectAll' style='width: 155px;'>Select <input style='vertical-align: middle;margin-top: -6px;' type='checkbox' name='MultiAll'  onClick=\"SelectAllApproveMultiCheckBoxes(),showAddToListButton();\"></th> " +
                                   "<th data-column-id='Designation'> Title </th> " +
                                   "<th data-column-id='DoctorCode' style='width: 84px;'>Code</th> " +
                                   "<th data-column-id='DoctorName'>Doctor Name</th> " +
                                   "<th data-column-id='ClassName'>Class</th> " +
                                   "<th data-column-id='City'>City</th> " +
                                   "<th data-column-id='Addres1' style='width: 180px;'>Address</th> " +
                                   "<th data-column-id='Qualification'>Qualification</th> " +
                                   "<th data-column-id='Speciality'> Speciality</th> " +
                                   "<th style='width: 85px;'>Action</th></tr></thead>" +
                                "<tbody id='unlistrecord' style='line-height: 1; text-align: left;'>");

        var msg = $.parseJSON(data.d);
        var data = [];
        if (msg.length > 0) {
            for (var i = 0; i < msg.length ; i++) {

                data.push([
                    //msg[i].DocCode,
                    msg[i].ReqStatus == "Pending" ? "Pending" : "Select <input type='checkbox' name='addCheckBox' class='MultiapproveCheckBox' style = 'vertical-align: middle;margin-top: 0px;' value='" + msg[i].DoctorId + "' onClick=\"showAddToListButton();\"  />",
                    msg[i].Designation, msg[i].DoctorCode, msg[i].DoctorName, msg[i].ClassName,
                    //((msg[i].DoctorBrick.includes("@br")) ? (msg[i].DoctorBrick.split("@br").join('<br/><br/>')) : msg[i].DoctorBrick),
                    msg[i].City, msg[i].Address1,
                    msg[i].Qualification,
                    msg[i].Speciality,
                    (msg[i].ReqStatus == "Pending" ? "Pending" : "<a onClick=\"oGrid_AddToList('" + msg[i].DoctorId + "');\" href='javascript:void(0)' >Add-To-List</a>")
                ]);
            }

            $('#grid-unlistdocs').DataTable({
                "autoWidth": true,
                data: data,
                deferRender: true,
                "bProcessing": true,
                "bDeferRender": true,
                columnDefs: [{ orderable: false, "targets": 0 }]
            });
        }
    }
}

function FillGrid(empid) {
    //debugger
    GetSelectHierarchy();
    var mydata = "{'Level1Id':'" + l1 + "','Level2Id':'" + l2 + "','Level3Id':'" + l3 +
        "','Level4Id':'" + l4 + "','Level5Id':'" + l5 + "','Level6Id':'" + l6 +
        "','TeamID':'" + (l7 == null ? 0 : l7) + "','Role':'" + Role + "'}";
    if (CurrentUserRole == 'rl6') {
        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/GetDataOfAddToListProcess",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: Onsuccessfillgrid,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: true,
            cache: false
        });

    }
    else
    {
      //  debugger

        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/GetAllDataWithoutNewRequest",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: Onsuccessfillgrid,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: true,
            cache: false
        });
    }

    if (CurrentUserRole == 'rl6') {
        FillSpecialities();
        FillRelatedCity();
        FillUnlistdocs(EmployeeId, $('#ddlSpeciality').val(), $('#ddlRelatedCity option:selected').text());
    }
}

function Onsuccessfillgrid(response) {
   // debugger
    fildata(response.d);
}

function fildata(data) {
   // debugger
    var apro;
    var status;

    $("#griddiv").empty();
    $("#griddiv").append("<table id='grid-basic' class='dataTables_info dataTables_filter column-options' style='border: 1px solid #616262;'></table>");
    $("#grid-basic").empty();
    $("#grid-basic").append("<thead style='line-height: 0;'>" +
                        "<tr class='ob_gC'>" +
                            "<th>Status</th>" +
                            "<th>Team</th>" +
                            "<th>Region</th>" +
                            "<th>District</th>" +
                            "<th>Territory</th>" +
                            "<th>Employee Name</th>" +
                            "<th>Dr Code</th>" +
                            "<th>Dr Name</th>" +
                            "<th>Designation</th>" +
                            "<th>Speciality</th>" +
                            "<th>Qualification</th>" +
                            "<th>Dr Class</th>" +
                            "<th>Visist Frequency</th>" +
                            "<th>Dr City</th>" +
        "<th>Dr Address</th>" +
        //---------------------- Adresss ---------------------------------------------
        "<th>Dr Address2</th>" +
        "<th>Dr Address3</th>" +
        "<th>Dr Address4</th>" +
        "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------
                            "<th>Distributor Name</th>" +
                            "<th>Dist Brick ID</th>" +
                            "<th>Dist Brick Name</th>" +
                            "<th>Create Date</th>" +
                            "<th>Location</th>" +
                        "</tr>" +
                      "</thead>" +
                      "<tbody id='values' style='line-height: 1; text-align: left;'>");

    if (data != "") {

        var msg = "";
        if (data.d == undefined) {
            msg = $.parseJSON(data);
        }
        else {
            if (data.d != "")
                msg = $.parseJSON(data.d);
            else
                msg = 0;
        }

        if (CurrentUserRole == 'rl6') {
            $('#showlistybtn').show();
            $('#btnmylist').show();
            $('#btnApproveAllAddTolist').hide();
            $('#btnRejectAllAddTolist').hide();
            $("#griddiv").empty();
            $("#griddiv").append("<table id='grid-basic' class='table table-striped table-bordered table-hover column-options' style='width:100%;'></table>");
            $("#grid-basic").empty();
            $("#grid-basic").append("<thead>" +
                        "<tr style='background-color: #217ebd;color: white;'>" +
                            "<th>Status</th>" +
                            "<th>Team</th>" +
                            "<th>Region</th>" +
                            "<th>District</th>" +
                            "<th>Territory</th>" +
                            "<th>Employee Name</th>" +
                            "<th>Dr Code</th>" +
                            "<th>Dr Name</th>" +
                            "<th>Designation</th>" +
                            "<th>Speciality</th>" +
                            "<th>Qualification</th>" +
                            "<th>Dr Class</th>" +
                            "<th>Visist Frequency</th>" +
                            "<th>Dr City</th>" +
                "<th>Dr Address</th>" +
                //---------------------- Adresss ---------------------------------------------
                "<th>Dr Address2</th>" +
                "<th>Dr Address3</th>" +
                "<th>Dr Address4</th>" +
                "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------
                            "<th>Distributor Name</th>" +
                            "<th>Dist Brick ID</th>" +
                            "<th>Dist Brick Name</th>" +
                            "<th>Create Date</th>" +
                            "<th>Location</th>" +
                            "<th data-column-id='Approve'>Approve</th> " +
                            "<th data-column-id='Reject'>Reject</th> " +
                        "</tr>" +
                        "</thead>" +
                        "<tbody id='values'>");
            var val = '';
            for (var i = 0; i < msg.length ; i++) {
                if (msg[i].VerifiedByDSM == 'Pending' && msg[i].VerifiedBySM == 'Pending' && msg[i].VerifiedByBUH == 'Pending') {
                    status = "Pending By DSM";
                }
                else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Pending' && msg[i].VerifiedByBUH == 'Pending') {
                    status = "Pending By SM";
                }
                else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Pending') {
                    status = "Pending By BUH/GM";
                }
                else if (msg[i].VerifiedByDSM == 'Rejected' && msg[i].VerifiedBySM == 'Pending' && msg[i].VerifiedByBUH == 'Pending') {
                    status = "Rejected By DSM";
                }
                else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Rejected') {
                    status = "Rejected By SM";
                }
                else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Rejected') {
                    status = "Rejected By BUH/GM";
                }
                else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Verified') {
                    status = "Verified By BUH/GM";
                }
                if (msg[i].VerifiedByAdmin == 'Rejected') {
                    status = "Rejected By Admin";
                }
                else if (msg[i].VerifiedByAdmin == 'Verified') {
                    status = "Verified By Admin";
                }
                val = "<tr>" +
                    "<td>" + status + "</td>" +
                    "<td>" + msg[i].TeamName + "</td>" +
                    "<td>" + msg[i].Region + "</td>" +
                    "<td>" + msg[i].District + "</td>" +
                    "<td>" + msg[i].Territory + "</td>" +
                    "<td>" + msg[i].EmployeeName + "</td>" +
                    "<td>" + msg[i].DoctorCode + "</td>" +
                    "<td>" + msg[i].DoctorName + "</td>" +
                    "<td>" + msg[i].Designation + "</td>" +
                    "<td>" + msg[i].Speciality + "</td>" +
                    "<td>" + msg[i].Qualification + "</td>" +
                    "<td>" + msg[i].ClassName + "</td>" +
                    "<td>" + msg[i].Frequency + "</td>" +
                    "<td>" + msg[i].City + "</td>" +
                    "<td>" + msg[i].Address1 + "</td>" +
                    //----------------------------------- Addresss ---------------------------------------------

                    "<td>" + msg[i].Address2 + "</td>" +
                    "<td>" + msg[i].Address3 + "</td>" +
                    "<td>" + msg[i].Address4 + "</td>" +
                    "<td>" + msg[i].Address5 + "</td>" +
                   //----------------------------------- End ---------------------------------------------------------
                    "<td>" + msg[i].DistributorName + "</td>" +
                    "<td>" + msg[i].BrickCode + "</td>" +
                    "<td>" + msg[i].BrickName + "</td>" +
                    "<td>" + msg[i].CreateDate + "</td>" +
                    "<td>" + " <a href='#' class='buttonlink'  onclick='locationCompare(\"" + msg[i].pLatitude + "\",\""
                    + msg[i].pLongitude + "\",\"" + msg[i].Address + "\");return false'>location</a> " + "</td>" +
                    "<td></td><td></td>";
                $('#values').append(val);
            }
            $("#grid-basic").DataTable({
                responsive: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                }]
            });
        }
        else if (CurrentUserRole == 'rl5') {
            $('#btnApproveAllAddTolist').show();
            $('#btnRejectAllAddTolist').show();
            $("#griddiv").empty();
            $("#griddiv").append("<table id='grid-basic' class='table table-striped table-bordered table-hover column-options' style='width:100%;'></table>");
            $("#grid-basic").empty();
            $("#grid-basic").append("<thead>" +
                            "<tr style='background-color: #217ebd;color: white;'>" +
                            "<th>Status</th>" +
                            "<th>Team</th>" +
                            "<th>Region</th>" +
                            "<th>District</th>" +
                            "<th>Territory</th>" +
                            "<th>Employee Name</th>" +
                            "<th>Dr Code</th>" +
                            "<th>Dr Name</th>" +
                            "<th>Designation</th>" +
                            "<th>Speciality</th>" +
                            "<th>Qualification</th>" +
                            "<th>Dr Class</th>" +
                            "<th>Visist Frequency</th>" +
                            "<th>Dr City</th>" +
                "<th>Dr Address</th>" +
                //---------------------- Adresss ---------------------------------------------
                "<th>Dr Address2</th>" +
                "<th>Dr Address3</th>" +
                "<th>Dr Address4</th>" +
                "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------
                            "<th>Distributor Name</th>" +
                            "<th>Dist Brick ID</th>" +
                            "<th>Dist Brick Name</th>" +
                            "<th>Create Date</th>" +
                            "<th>Location</th>" +
                            "<th data-column-id='Approve'>Approve<div style='margin-left: 15px;margin-top: 2px;'><input id='CheckBoxCheck' type='checkbox' name='ApproveAllForAddToListApprove' onClick=\"SelectAllApproveCheckBoxesAddToListApprove();\"></div></th> " +
                            "<th data-column-id='Reject'>Reject<div style='margin-left: 15px;margin-top: 2px;'><input type='checkbox' name='ApproveAllForAddTolistReject' onClick=\"SelectAllApproveCheckBoxesForAddToListReject();\"></div></th> " +
                            "</tr>" +
                            "</thead>" +
                            "<tbody id='values'>");
            var val = '';
            for (var i = 0; i < msg.length ; i++) {
                if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Pending') {
                    apro = "<td></td><td></td>";
                    status = "Pending By SM";
                }
                else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Pending') {
                    apro = "<td></td><td></td>";
                    status = "Pending By BUH/GM";
                }
                else {
                    apro = "<td><a onClick=\"oGrid_AddTolistApprove('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Verify</a><input type='checkbox' name='checkboxes' onclick='setRejectFalse(event);' aria-hidden='true' class='approveCheckBoxForAddToListApprove' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-EmployeeId='" + msg[i].EmployeeId + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>" +
                           "<td><a onClick=\"oGrid_AddTolistRejected('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Reject</a><input type='checkbox' name='checkboxes' onclick='setApproveFalse(event);'  aria-hidden='true'  class='approveCheckBoxForAddToListReject' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-EmployeeId='" + msg[i].EmployeeId + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>"
                    status = "Pending By DSM";
                }
                if (msg[i].VerifiedByAdmin == 'Rejected') {
                    status = "Rejected By Admin";
                    apro = "<td></td><td></td>";
                }
                else if (msg[i].VerifiedByAdmin == 'Verified') {
                    status = "Verified By Admin";
                    apro = "<td></td><td></td>";
                }
                val = "<tr>" +
                    "<td>" + status + "</td>" +
                    "<td>" + msg[i].TeamName + "</td>" +
                    "<td>" + msg[i].Region + "</td>" +
                    "<td>" + msg[i].District + "</td>" +
                    "<td>" + msg[i].Territory + "</td>" +
                    "<td>" + msg[i].EmployeeName + "</td>" +
                    "<td>" + msg[i].DoctorCode + "</td>" +
                    "<td>" + msg[i].DoctorName + "</td>" +
                    "<td>" + msg[i].Designation + "</td>" +
                    "<td>" + msg[i].Speciality + "</td>" +
                    "<td>" + msg[i].Qualification + "</td>" +
                    "<td>" + msg[i].ClassName + "</td>" +
                    "<td>" + msg[i].Frequency + "</td>" +
                    "<td>" + msg[i].City + "</td>" +
                    "<td>" + msg[i].Address1 + "</td>" +
                    //----------------------------------- Addresss ---------------------------------------------

                    "<td>" + msg[i].Address2 + "</td>" +
                    "<td>" + msg[i].Address3 + "</td>" +
                    "<td>" + msg[i].Address4 + "</td>" +
                    "<td>" + msg[i].Address5 + "</td>" +
                   //----------------------------------- End ---------------------------------------------------------
                    "<td>" + msg[i].DistributorName + "</td>" +
                    "<td>" + msg[i].BrickCode + "</td>" +
                    "<td>" + msg[i].BrickName + "</td>" +
                    "<td>" + msg[i].CreateDate + "</td>" +
                    "<td>" + " <a href='#' class='buttonlink '  onclick='locationCompare(\"" + msg[i].pLatitude + "\",\""
                    + msg[i].pLongitude + "\",\"" + msg[i].Address + "\");return false'>location</a> " + "</td>" + apro
                +"</tr></tbody>";
                $('#values').append(val);
            }
            $("#grid-basic").DataTable({
                responsive: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                }]
            });
        }
        else if (CurrentUserRole == 'rl4') {
          
            $('#btnApproveAllAddTolist').show();
            $('#btnRejectAllAddTolist').show();
            $("#griddiv").empty();
            $("#griddiv").append("<table id='grid-basic' class='table table-striped table-bordered table-hover column-options' style='width:100%;'></table>");
            $("#grid-basic").empty();
            $("#grid-basic").append("<thead>" +
                                "<tr style='background-color: #217ebd;color: white;'>" +
                                "<th>Status</th>" +
                                "<th>Team</th>" +
                                "<th>Region</th>" +
                                "<th>District</th>" +
                                "<th>Territory</th>" +
                                "<th>Employee Name</th>" +
                                "<th>Dr Code</th>" +
                                "<th>Dr Name</th>" +
                                "<th>Designation</th>" +
                                "<th>Speciality</th>" +
                                "<th>Qualification</th>" +
                                "<th>Dr Class</th>" +
                                "<th>Visist Frequency</th>" +
                                "<th>Dr City</th>" +
                "<th>Dr Address</th>" +
                //---------------------- Adresss ---------------------------------------------
                "<th>Dr Address2</th>" +
                "<th>Dr Address3</th>" +
                "<th>Dr Address4</th>" +
                "<th>Dr Address5</th>" +
             //---------------------- End ---------------------------------------------
                                "<th>Distributor Name</th>" +
                                "<th>Dist Brick ID</th>" +
                                "<th>Dist Brick Name</th>" +
                                "<th>Create Date</th>" +
                                "<th>Location</th>" +
                                "<th data-column-id='Approve'>Approve<div style='margin-left: 15px;margin-top: 2px;'><input id='CheckBoxCheck' type='checkbox' name='ApproveAllForAddToListApprove' onClick=\"SelectAllApproveCheckBoxesAddToListApprove();\"></div></th> " +
                                "<th data-column-id='Reject'>Reject<div style='margin-left: 15px;margin-top: 2px;'><input type='checkbox' name='ApproveAllForAddTolistReject' onClick=\"SelectAllApproveCheckBoxesForAddToListReject();\"></div></th> " +
                            "</tr>" +
                            "</thead>" +
                            "<tbody id='values'>");
            var val = '';
            for (var i = 0; i < msg.length ; i++) {
                if ((msg[i].BUH_ApprovedStatus == 0 || msg[i].BUH_ApprovedStatus == '') && msg[i].SM_ApprovedStatus == '1') {
                    apro = "<td></td><td></td>";
                    status = "Pending by BUH/GM";
                }
                else if (msg[i].BUH_ApprovedStatus == 2 && msg[i].SM_ApprovedStatus == '1') {
                    apro = "<td></td><td></td>";
                    status = "Rejected by BUH";
                }
                else if (msg[i].BUH_ApprovedStatus == 1 && msg[i].SM_ApprovedStatus == '1') {
                    apro = "<td></td><td></td>";
                    status = "Approved by BUH";
                }
                else if (msg[i].SM_ApprovedStatus == 2 && (msg[i].BUH_ApprovedStatus == '' || msg[i].BUH_ApprovedStatus == '0')) {
                    apro = "<td></td><td></td>";
                    status = "Rejected by SM";
                }
                else if (msg[i].SM_ApprovedStatus == 1) {
                    apro = "<td></td><td></td>";
                    status = "Approved by SM";
                }
                else {
                    apro = "<td><a onClick=\"oGrid_AddTolistApprove('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Verify</a><input type='checkbox' name='checkboxes' onclick='setRejectFalse(event);' aria-hidden='true' class='approveCheckBoxForAddToListApprove' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-EmployeeId='" + msg[i].EmployeeId + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>" +
                           "<td><a onClick=\"oGrid_AddTolistRejected('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Reject</a><input type='checkbox' name='checkboxes' onclick='setApproveFalse(event);' aria-hidden='true' class='approveCheckBoxForAddToListReject' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-EmployeeId='" + msg[i].EmployeeId + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>"
                    status = "Pending by SM";
                }
                if (msg[i].VerifiedByAdmin == 'Rejected') {
                    apro = "<td></td><td></td>";
                    status = "Rejected By Admin";
                }
                else if (msg[i].VerifiedByAdmin == 'Verified') {
                    apro = "<td></td><td></td>";
                    status = "Verified By Admin";
                }
                val = "<tr>" +
                    "<td>" + status + "</td>" +
                    "<td>" + msg[i].TeamName + "</td>" +
                    "<td>" + msg[i].Region + "</td>" +
                    "<td>" + msg[i].District + "</td>" +
                    "<td>" + msg[i].Territory + "</td>" +
                    "<td>" + msg[i].EmployeeName + "</td>" +
                    "<td>" + msg[i].DoctorCode + "</td>" +
                    "<td>" + msg[i].DoctorName + "</td>" +
                    "<td>" + msg[i].Designation + "</td>" +
                    "<td>" + msg[i].Speciality + "</td>" +
                    "<td>" + msg[i].Qualification + "</td>" +
                    "<td>" + msg[i].ClassName + "</td>" +
                    "<td>" + msg[i].Frequency + "</td>" +
                    "<td>" + msg[i].City + "</td>" +
                    "<td>" + msg[i].Address1 + "</td>" +
                    //----------------------------------- Addresss ---------------------------------------------

                    "<td>" + msg[i].Address2 + "</td>" +
                    "<td>" + msg[i].Address3 + "</td>" +
                    "<td>" + msg[i].Address4 + "</td>" +
                    "<td>" + msg[i].Address5 + "</td>" +
                   //----------------------------------- End ---------------------------------------------------------
                    "<td>" + msg[i].DistributorName + "</td>" +
                    "<td>" + msg[i].BrickCode + "</td>" +
                    "<td>" + msg[i].BrickName + "</td>" +
                    "<td>" + msg[i].CreateDate + "</td>" +
                    "<td>" + " <a href='#' class='buttonlink '  onclick='locationCompare(\"" + msg[i].pLatitude + "\",\""
                    + msg[i].pLongitude + "\",\"" + msg[i].Address + "\");return false'>location</a> " + "</td>" + apro;
                $('#values').append(val);
            }
            $("#grid-basic").DataTable({
                responsive: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                }]
            });
        }
        else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'rl2') {
            $('#btnApproveAllAddTolist').show();
            $('#btnRejectAllAddTolist').show();
            $("#griddiv").empty();
            $("#griddiv").append("<table id='grid-basic' class='table table-striped table-bordered table-hover column-options' style='width:100%;'></table>");
            $("#grid-basic").empty();
            $("#grid-basic").append("<thead>" +
                            "<tr style='background-color: #217ebd;color: white;'>" +
                            "<th>Status</th>" +
                            "<th>Team</th>" +
                            "<th>Region</th>" +
                            "<th>District</th>" +
                            "<th>Territory</th>" +
                            "<th>Employee Name</th>" +
                            "<th>Dr Code</th>" +
                            "<th>Dr Name</th>" +
                            "<th>Designation</th>" +
                            "<th>Speciality</th>" +
                            "<th>Qualification</th>" +
                            "<th>Dr Class</th>" +
                            "<th>Visist Frequency</th>" +
                            "<th>Dr City</th>" +
                "<th>Dr Address</th>" +
                //---------------------- Adresss ---------------------------------------------
                "<th>Dr Address2</th>" +
                "<th>Dr Address3</th>" +
                "<th>Dr Address4</th>" +
                "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------
                            "<th>Distributor Name</th>" +
                            "<th>Dist Brick ID</th>" +
                            "<th>Dist Brick Name</th>" +
                            "<th>Create Date</th>" +
                            "<th>Location</th>" +
                            "<th data-column-id='Approve'>Approve<div style='margin-left: 15px;margin-top: 2px;'><input id='CheckBoxCheck' type='checkbox' name='ApproveAllForAddToListApprove' onClick=\"SelectAllApproveCheckBoxesAddToListApprove();\"></div></th> " +
                            "<th data-column-id='Reject'>Reject<div style='margin-left: 15px;margin-top: 2px;'><input type='checkbox' name='ApproveAllForAddTolistReject' onClick=\"SelectAllApproveCheckBoxesForAddToListReject();\"></div></th> " +
                            "</tr>" +
                            "</thead>" +
                            "<tbody id='values'>");
            var val = '';
            for (var i = 0; i < msg.length ; i++) {
                if (msg[i].VerifiedByAdmin == 'Rejected') {
                    apro = "<td></td><td></td>";
                    status = "Rejected By Admin";
                }
                else if (msg[i].VerifiedByAdmin == 'Verified') {
                    apro = "<td></td><td></td>";
                    status = "Verified By Admin";
                }
                else {
                    apro = "<td><a onClick=\"oGrid_AddTolistApprove('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Verify</a><input type='checkbox' name='checkboxes' onclick='setRejectFalse(event);' aria-hidden='true' class='approveCheckBoxForAddToListApprove' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-EmployeeId='" + msg[i].EmployeeId + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>" +
                            "<td><a onClick=\"oGrid_AddTolistRejected('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Reject</a><input type='checkbox' name='checkboxes' onclick='setApproveFalse(event);' aria-hidden='true' class='approveCheckBoxForAddToListReject' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-EmployeeId='" + msg[i].EmployeeId + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>";
                    status = "Pending by BUH/GM";
                }
                val = "<tr>" +
                    "<td>" + status + "</td>" +
                    "<td>" + msg[i].TeamName + "</td>" +
                    "<td>" + msg[i].Region + "</td>" +
                    "<td>" + msg[i].District + "</td>" +
                    "<td>" + msg[i].Territory + "</td>" +
                    "<td>" + msg[i].EmployeeName + "</td>" +
                    "<td>" + msg[i].DoctorCode + "</td>" +
                    "<td>" + msg[i].DoctorName + "</td>" +
                    "<td>" + msg[i].Designation + "</td>" +
                    "<td>" + msg[i].Speciality + "</td>" +
                    "<td>" + msg[i].Qualification + "</td>" +
                    "<td>" + msg[i].ClassName + "</td>" +
                    "<td>" + msg[i].Frequency + "</td>" +
                    "<td>" + msg[i].City + "</td>" +
                    "<td>" + msg[i].Address1 + "</td>" +
                    //----------------------------------- Addresss ---------------------------------------------

                    "<td>" + msg[i].Address2 + "</td>" +
                    "<td>" + msg[i].Address3 + "</td>" +
                    "<td>" + msg[i].Address4 + "</td>" +
                    "<td>" + msg[i].Address5 + "</td>" +
                   //----------------------------------- End ---------------------------------------------------------
                    "<td>" + msg[i].DistributorName + "</td>" +
                    "<td>" + msg[i].BrickCode + "</td>" +
                    "<td>" + msg[i].BrickName + "</td>" +
                    "<td>" + msg[i].CreateDate + "</td>" +
                    "<td>" + " <a href='#' class='buttonlink '  onclick='locationCompare(\"" + msg[i].pLatitude + "\",\""
                    + msg[i].pLongitude + "\",\"" + msg[i].Address + "\");return false'>location</a> " + "</td>" + apro;
                $('#values').append(val);
            }
            $("#grid-basic").DataTable({
                responsive: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                }]
            });
        }
        else if (CurrentUserRole == 'Admin' || CurrentUserRole == 'admin') {
            $('#btnApproveAllAddTolist').show();
            $('#btnRejectAllAddTolist').show();
            $("#griddiv").empty();
            $("#griddiv").append("<table id='grid-basic' class='table table-striped table-bordered table-hover column-options' style='width:100%;'></table>");
            $("#grid-basic").empty();
            $("#grid-basic").append("<thead>" +
                           "<tr style='background-color: #217ebd;color: white;'>" +
                            "<th>Status</th>" +
                            "<th>Team</th>" +
                            "<th>Region</th>" +
                            "<th>District</th>" +
                            "<th>Territory</th>" +
                            "<th>Employee Name</th>" +
                            "<th>Dr Code</th>" +
                            "<th>Dr Name</th>" +
                            "<th>Designation</th>" +
                            "<th>Speciality</th>" +
                            "<th>Qualification</th>" +
                            "<th>Dr Class</th>" +
                            "<th>Visist Frequency</th>" +
                            "<th>Dr City</th>" +
                "<th>Dr Address</th>" +
                //---------------------- Adresss ---------------------------------------------
                "<th>Dr Address2</th>" +
                "<th>Dr Address3</th>" +
                "<th>Dr Address4</th>" +
                "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------

                            "<th>Distributor Name</th>" +
                            "<th>Dist Brick ID</th>" +
                            "<th>Dist Brick Name</th>" +
                            "<th>Create Date</th>" +
                            "<th>Location</th>" +
                            "<th data-column-id='Approve'>Approve<div style='margin-left: 15px;margin-top: 2px;'><input id='CheckBoxCheck' type='checkbox' name='ApproveAllForAddToListApprove' onClick=\"SelectAllApproveCheckBoxesAddToListApprove();\"></div></th> " +
                            "<th data-column-id='Reject'>Reject<div style='margin-left: 15px;margin-top: 2px;'><input type='checkbox' name='ApproveAllForAddTolistReject' onClick=\"SelectAllApproveCheckBoxesForAddToListReject();\"></div></th> " +
                            "</tr>" +
                            "</thead>" +
                            "<tbody id='values'>");
            var val = '';
            for (var i = 0; i < msg.length ; i++) {
                if (msg[i].VerifiedByDSM == 'Pending' && msg[i].VerifiedBySM == 'Pending' && msg[i].VerifiedByBUH == 'Pending') {
                    status = "Pending By DSM";
                }
                else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Pending' && msg[i].VerifiedByBUH == 'Pending') {
                    status = "Pending By SM";
                }
                else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Pending') {
                    status = "Pending By BUH/GM";
                }
                else if (msg[i].VerifiedByDSM == 'Rejected') {
                    status = "Rejected By DSM";
                }
                else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Rejected') {
                    status = "Rejected By SM";
                }
                else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Rejected') {
                    status = "Rejected By BUH/GM";
                }
                else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Verified') {
                    status = "Verified By BUH/GM";
                }
                else if (msg[i].VerifiedByDSM == 'Pending' && msg[i].VerifiedBySM == 'Pending' && msg[i].VerifiedByBUH == 'Pending' && msg[i].VerifiedByAdmin == 'Rejected') {
                    status = "Rejected By Admin";
                }
                val = "<tr>" +
                    "<td>" + status + "</td>" +
                    "<td>" + msg[i].TeamName + "</td>" +
                    "<td>" + msg[i].Region + "</td>" +
                    "<td>" + msg[i].District + "</td>" +
                    "<td>" + msg[i].Territory + "</td>" +
                    "<td>" + msg[i].EmployeeName + "</td>" +
                    "<td>" + msg[i].DoctorCode + "</td>" +
                    "<td>" + msg[i].DoctorName + "</td>" +
                    "<td>" + msg[i].Designation + "</td>" +
                    "<td>" + msg[i].Speciality + "</td>" +
                    "<td>" + msg[i].Qualification + "</td>" +
                    "<td>" + msg[i].ClassName + "</td>" +
                    "<td>" + msg[i].Frequency + "</td>" +
                    "<td>" + msg[i].City + "</td>" +
                    "<td>" + msg[i].Address1 + "</td>" +
                    //----------------------------------- Addresss ---------------------------------------------

                    "<td>" + msg[i].Address2 + "</td>" +
                    "<td>" + msg[i].Address3 + "</td>" +
                    "<td>" + msg[i].Address4 + "</td>" +
                    "<td>" + msg[i].Address5 + "</td>" +
                   //----------------------------------- End ---------------------------------------------------------
                    "<td>" + msg[i].DistributorName + "</td>" +
                    "<td>" + msg[i].BrickCode + "</td>" +
                    "<td>" + msg[i].BrickName + "</td>" +
                    "<td>" + msg[i].CreateDate + "</td>" +
                    "<td>" + " <a href='#' class='buttonlink '  onclick='locationCompare(\"" + msg[i].pLatitude + "\",\""
                    + msg[i].pLongitude + "\",\"" + msg[i].Address + "\");return false'>location</a> " + "</td>" +
                    "<td><a onClick=\"oGrid_AddTolistApprove('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Verify</a><input type='checkbox' name='checkboxes' onclick='setRejectFalse(event);' aria-hidden='true' class='approveCheckBoxForAddToListApprove' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-EmployeeId='" + msg[i].EmployeeId + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>" +
                    "<td><a onClick=\"oGrid_AddTolistRejected('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Reject</a><input type='checkbox' name='checkboxes' onclick='setApproveFalse(event);' aria-hidden='true' class='approveCheckBoxForAddToListReject' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-EmployeeId='" + msg[i].EmployeeId + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>";
                $('#values').append(val);
            }
            $("#grid-basic").DataTable({
                responsive: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                }]
            });
        }
        else {
            $("#griddiv").empty();
            $("#griddiv").append("<table id='grid-basic' class='table table-striped table-bordered table-hover column-options' style='width:100%;'></table>");
            $("#grid-basic").empty();
            $("#grid-basic").append("<thead>" +
                            "<tr style='background-color: #217ebd;color: white;'>" +
                            "<th>Status</th>" +
                            "<th>Team</th>" +
                            "<th>Region</th>" +
                            "<th>District</th>" +
                            "<th>Territory</th>" +
                            "<th>Employee Name</th>" +
                            "<th>Dr Code</th>" +
                            "<th>Dr Name</th>" +
                            "<th>Designation</th>" +
                            "<th>Speciality</th>" +
                            "<th>Qualification</th>" +
                            "<th>Dr Class</th>" +
                            "<th>Visist Frequency</th>" +
                            "<th>Dr City</th>" +
                "<th>Dr Address</th>" +
                //---------------------- Adresss ---------------------------------------------
                "<th>Dr Address2</th>" +
                "<th>Dr Address3</th>" +
                "<th>Dr Address4</th>" +
                "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------
                            "<th>Distributor Name</th>" +
                            "<th>Dist Brick ID</th>" +
                            "<th>Dist Brick Name</th>" +
                            "<th>Create Date</th>" +
                            "<th>Location</th>" +
                            "<th>Status</th> " +
                            "</tr>" +
                            "</thead>" +
                            "<tbody id='values'>");
            $("#grid-basic").DataTable({
                responsive: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                }]
            });
        }
    }
    else {
        $("#griddiv").empty();
        $("#griddiv").append("<table id='grid-basic' class='table table-striped table-bordered table-hover column-options' style='width:100%;'></table>");
        $("#grid-basic").empty();
        $("#grid-basic").append("<thead>" +
                            "<tr style='background-color: #217ebd;color: white;'>" +
                            "<th>Status</th>" +
                            "<th>Team</th>" +
                            "<th>Region</th>" +
                            "<th>District</th>" +
                            "<th>Territory</th>" +
                            "<th>Employee Name</th>" +
                            "<th>Dr Code</th>" +
                            "<th>Dr Name</th>" +
                            "<th>Designation</th>" +
                            "<th>Speciality</th>" +
                            "<th>Qualification</th>" +
                            "<th>Dr Class</th>" +
                            "<th>Visist Frequency</th>" +
                            "<th>Dr City</th>" +
            "<th>Dr Address</th>" +
            //---------------------- Adresss ---------------------------------------------
            "<th>Dr Address2</th>" +
            "<th>Dr Address3</th>" +
            "<th>Dr Address4</th>" +
            "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------
                            "<th>Distributor Name</th>" +
                            "<th>Dist Brick ID</th>" +
                            "<th>Dist Brick Name</th>" +
                            "<th>Create Date</th>" +
                            "<th>Location</th>" +
                            "<th>Status</th> " +
                            //"<th data-column-id='Approve' class='no-sort'>Approve<div style='margin-left: 15px;margin-top: 2px;'><input id='CheckBoxCheck' type='checkbox' name='ApproveAllForAddToListApprove' onClick=\"SelectAllApproveCheckBoxesAddToListApprove();\"></div></th> " +
                            //"<th data-column-id='Reject' class='no-sort'>Reject<div style='margin-left: 15px;margin-top: 2px;'><input type='checkbox' name='ApproveAllForAddTolistReject' onClick=\"SelectAllApproveCheckBoxesForAddToListReject();\"></div></th> " +
                        "</tr>" +
                        "</thead>" +
                        "<tbody id='values'>");
        $("#grid-basic").DataTable({
            responsive: true,
            "columnDefs": [{
                "targets": 'no-sort',
                "orderable": false,
            }]
        });
    }
}

function SelectAllApproveCheckBoxesAddToListApprove() {

    if ($('input[name="ApproveAllForAddToListApprove"]').is(':checked')) {
        $('.approveCheckBoxForAddToListApprove').prop('checked', true);
        $('.approveCheckBoxForAddToListReject').prop('checked', false);
        $('input[name="ApproveAllForAddTolistReject"]').prop('checked', false);
    } else {
        $('.approveCheckBoxForAddToListApprove').prop('checked', false);
    }
}

function SelectAllApproveCheckBoxesForAddToListReject() {

    if ($('input[name="ApproveAllForAddTolistReject"]').is(':checked')) {
        $('.approveCheckBoxForAddToListReject').prop('checked', true);
        $('.approveCheckBoxForAddToListApprove').prop('checked', false);
        $('input[name="ApproveAllForAddToListApprove"]').prop('checked', false);
    } else {
        $('.approveCheckBoxForAddToListReject').prop('checked', false);
    }
}

function setRejectFalse(e) {

    if (e.target.checked) {
        e.target.parentElement.nextSibling.lastChild.checked = false;
    }
}

function setApproveFalse(e) {

    if (e.target.checked) {
        e.target.parentElement.previousSibling.lastChild.checked = false;
    }
}

function AddtoListApproveAll() {

    var checkedboxes = [], ids = [], MonthDate = [];
    checkedboxes = document.querySelectorAll('.approveCheckBoxForAddToListApprove:checked');

    if (checkedboxes.length > 0) {
        for (var i = 0; i < checkedboxes.length; i++) {

            ids.push(checkedboxes[i].value);
            docIds.push(checkedboxes[i].attributes['data-docId'].value);
        }
    }
    else {
        swal(
            'alert!',
            'You must select atleast one option!',
            'warning'
        )
        return false;
    }

    swal({
        title: "Approve All",
        text: "Are you sure you want to approve all the selected requests?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, All Approve it!",
        cancelButtonText: "No, Cancel !",
        closeOnConfirm: false,
        closeOnCancel: false
    },
function (isConfirm) {
    if (isConfirm) {

        var mydata = "{'id':'" + ids.toString() + "','docid':'" + docIds.toString() + "','empid':'" + EmployeeId + "','date':'" + MonthDate + "',Status:'1','CurrentUserRole':'" + CurrentUserRole + "'}";

        $('#hdnMode').val("R");
        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/ApproveThis",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                sweetAlert('success', 'All Requests has been approved!', 'success');
                FillGrid(1);
            },
            beforeSend: ajaxstar,
            complete: ajaxcom,
            error: onError,
            async: false,
            cache: false
        });

        //  swal("Deleted!", "Your imaginary file has been deleted.", "success");
    } else {
        swal("Cancelled", "Request has been cancelled:)", "error");
    }
});
}

function ApproveAllForReject() {
    var checkedboxes = [], ids = [], MonthDate = [];
    checkedboxes = document.querySelectorAll('.approveCheckBoxForAddToListReject:checked');

    if (checkedboxes.length > 0) {
        for (var i = 0; i < checkedboxes.length; i++) {

            ids.push(checkedboxes[i].value);
            docIds.push(checkedboxes[i].attributes['data-docId'].value);
        }
    }
    else {
        swal(
            'alert!',
            'You must select atleast one option!',
            'warning'
        )
        return false;
    }

    swal({
        title: "Reject All",
        text: "Are you sure you want to Reject all the selected requests?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, All Reject it!",
        cancelButtonText: "No, Cancel !",
        closeOnConfirm: false,
        closeOnCancel: false
    },
function (isConfirm) {
    if (isConfirm) {

        var mydata = "{'id':'" + ids.toString() + "','docid':'" + docIds.toString() + "','empid':'" + EmployeeId + "','date':'" + MonthDate + "',Status:'2','CurrentUserRole':'" + CurrentUserRole + "'}";

        $('#hdnMode').val("R");
        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/AddTolistReject",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                sweetAlert('success', 'All selected requests have been Rejected!', 'success');
                FillGrid(1);
            },
            beforeSend: ajaxstar,
            complete: ajaxcom,
            error: onError,
            async: false,
            cache: false
        });

        //  swal("Deleted!", "Your imaginary file has been deleted.", "success");
    } else {
        swal("Cancelled", "Request has been cancelled:)", "error");
    }
});
}

function oGrid_AddTolistApprove(ids) {
    // $old('#divApproveConfirmation').jqmShow();

    // $('#divApproveConfirmation').find('#btnApproveYes').attr({ '_id': id, '_docid': docid });
    $('#divApprovalConfirmation').modal('hide');
    swal({
        title: "Are you sure?",
        text: "Are you sure you want to approve the selected request?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Approve it!",
        cancelButtonText: "No, cancel Please!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
function (isConfirm) {
    if (isConfirm) {        

        var mydata = "{'id':'" + ids.toString() + "','docid':'" + "0" + "','empid':'" + EmployeeId + "','date':'" + MonthDate + "',Status:'1','CurrentUserRole':'" + CurrentUserRole + "'}";

        $('#hdnMode').val("R");
        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/ApproveThis",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                sweetAlert('success', 'All Requests has been approved!', 'success');
                FillGrid(1);
            },
            beforeSend: ajaxstar,
            complete: ajaxcom,
            error: onError,
            async: false,
            cache: false
        });

        //  swal("Deleted!", "Your imaginary file has been deleted.", "success");
    } else {
        swal("Cancelled", "Request has been cancelled:)", "error");
    }
});
}

function oGrid_AddTolistRejected(ids) {
    swal({
        title: "Reject",
        text: "Are you sure you want to Reject the selected request?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Reject it!",
        cancelButtonText: "No, cancel Please!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
    function (isConfirm) {
        if (isConfirm) {            
            var mydata = "{'id':'" + ids.toString() + "','docid':'" + "0" + "','empid':'" + EmployeeId + "','date':'" + MonthDate + "',Status:'2','CurrentUserRole':'" + CurrentUserRole + "'}";

            $('#hdnMode').val("R");
            $.ajax({
                type: "POST",
                url: "DoctorsService.asmx/AddTolistReject",
                data: mydata,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    sweetAlert('success', 'All selected requests have been Rejected!', 'success');
                    FillGrid(1);
                },
                beforeSend: ajaxstar,
                complete: ajaxcom,
                error: onError,
                async: false,
                cache: false
            });
        } else {
            swal("Cancelled", "Request has been cancelled:)", "error");
        }
    });
}

//#endregion 

//------------------------------------------------------------- request List Employee against----------------------------------------------------------------

//#region My Requested Doctor Distributor List END

function FillGridRequest(empid) {

    GetSelectHierarchy()
    var mydata = "{'Level1Id':'" + l1 + "','Level2Id':'" + l2 + "','Level3Id':'" + l3 +
       "','Level4Id':'" + l4 + "','Level5Id':'" + l5 + "','Level6Id':'" + l6 +
       "','TeamID':'"
       + (l7 == null ? 0 : l7) + "','Role':'" + Role + "'}";
    if (CurrentUserRole == 'rl6') {
        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/GetDataOfAddToListProcessDistributors",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: OnsuccessfillgridRequest,
            beforeSend: ajaxstar,
            complete: ajaxcom,
            error: onError,
            async: true,
            cache: false
        });

    }
    else {
        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/GetDataOfAddToListProcessDistributorsWithoutNewRequest",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: OnsuccessfillgridRequest,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: true,
            cache: false
        });
    }
    if (CurrentUserRole == 'rl6') {
        //FillCities();
        //FillUnlistdocs(EmployeeId, $('#ddlcity').val());
        FillSpecialities();
        FillRelatedCity();
        FillUnlistdocs(EmployeeId, $('#ddlSpeciality').val(), $('#ddlRelatedCity option:selected').text());
    }
}

function OnsuccessfillgridRequest(response) {
    //debugger
    fildataRequest(response.d);
}

function fildataRequest(data) {
    var apro;
    var status;
    $('#btnApproveUpdateAll').hide();
    $('#btnRejectUpdateAll').hide();
    $("#griddiv1").empty();
    $("#griddiv1").append("<table id='grid-basic1' class='table table-striped table-bordered table-hover column-options' style='width:100%;'></table>");
    $("#grid-basic1").empty();
    $("#grid-basic1").append("<thead>" +
                        "<tr style='background-color: #217ebd;color: white;'>" +
                            "<th>Status</th>" +
                            "<th>Team</th>" +
                            "<th>Region</th>" +
                            "<th>District</th>" +
                            "<th>Territory</th>" +
                            "<th>Employee Name</th>" +
                            "<th>Dr Code</th>" +
                            "<th>Dr Name</th>" +
                            "<th>Designation</th>" +
                            "<th>Speciality</th>" +
                            "<th>Qualification</th>" +
                            "<th>Dr Class</th>" +
                            "<th>Visist Frequency</th>" +
                            "<th>Dr City</th>" +
                             "<th>Dr Address</th>" +

        //---------------------- Adresss ---------------------------------------------
        "<th>Dr Address2</th>" +
        "<th>Dr Address3</th>" +
        "<th>Dr Address4</th>" +
        "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------




                            "<th>Distributor Name</th>" +
                            "<th>Dist Brick ID</th>" +
                            "<th>Dist Brick Name</th>" +
                            "<th>Create Date</th>" +
                            "<th>Location</th>" +
                            "<th data-column-id='Approve' class='no-sort'>Approve</th> " +
                            "<th data-column-id='Reject' class='no-sort'>Reject</th> " +
                        "</tr>" +
                        "</thead>" +
                        "<tbody id='values'>");

    if (data != "") {

        var msg = "";
        if (data.d == undefined) {
            msg = $.parseJSON(data);
        }
        else {
            if (data.d != "")
                msg = $.parseJSON(data.d);
            else
                msg = 0;
        }

        if (CurrentUserRole == 'rl6') {
            $('#btnApproveUpdateAll').hide();
            $('#btnRejectUpdateAll').hide();
            $("#griddiv1").empty();
            $("#griddiv1").append("<table id='grid-basic1' class='table table-striped table-bordered table-hover column-options' style='width:100%;'></table>");
            $("#grid-basic1").empty();
            $("#grid-basic1").append("<thead>" +
                            "<tr style='background-color: #217ebd;color: white;'>" +
                            "<th>Status</th>" +
                            "<th>Team</th>" +
                            "<th>Region</th>" +
                            "<th>District</th>" +
                            "<th>Territory</th>" +
                            "<th>Employee Name</th>" +
                            "<th>Dr Code</th>" +
                            "<th>Dr Name</th>" +
                            "<th>Designation</th>" +
                            "<th>Speciality</th>" +
                            "<th>Qualification</th>" +
                            "<th>Dr Class</th>" +
                            "<th>Visist Frequency</th>" +
                            "<th>Dr City</th>" +
                "<th>Dr Address</th>" +
                //---------------------- Adresss ---------------------------------------------
                "<th>Dr Address2</th>" +
                "<th>Dr Address3</th>" +
                "<th>Dr Address4</th>" +
                "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------



                            "<th>Distributor Name</th>" +
                            "<th>Dist Brick ID</th>" +
                            "<th>Dist Brick Name</th>" +
                            "<th>Create Date</th>" +
                            "<th>Location</th>" +
                            "<th data-column-id='Approve' class='no-sort'>Approve</th> " +
                            "<th data-column-id='Reject' class='no-sort'>Reject</th> " +
                            "</tr>" +
                            "</thead>" +
                            "<tbody id='Updatevalues'>");
            var val = '';
            if (msg.length > 0) {
                for (var i = 0; i < msg.length ; i++) {
                    if (msg[i].VerifiedByDSM == 'Pending' && msg[i].VerifiedBySM == 'Pending' && msg[i].VerifiedByBUH == 'Pending') {
                        apro = "<td></td><td></td>";
                        status = "Pending By DSM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Pending' && msg[i].VerifiedByBUH == 'Pending') {
                        apro = "<td></td><td></td>";
                        status = "Pending By SM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Pending') {
                        apro = "<td></td><td>/GM</td>";
                        status = "Pending By BUH/GM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Rejected') {
                        apro = "<td></td><td></td>";
                        status = "Rejected By DSM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Rejected') {
                        apro = "<td></td><td></td>";
                        status = "Rejected By SM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Rejected') {
                        apro = "<td></td><td></td>";
                        status = "Rejected By BUH/GM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Verified') {
                        apro = "<td></td><td></td>";
                        status = "Verified By BUH/GM";
                    }
                    if (msg[i].VerifiedByAdmin == 'Rejected') {
                        apro = "<td></td><td></td>";
                        status = "Rejected By Admin";
                    }
                    else if (msg[i].VerifiedByAdmin == 'Verified') {
                        apro = "<td></td><td></td>";
                        status = "Verified By Admin";
                    }
                    val = "<tr>" +
                    "<td>" + status + "</td>" +
                    "<td>" + msg[i].TeamName + "</td>" +
                    "<td>" + msg[i].Region + "</td>" +
                    "<td>" + msg[i].District + "</td>" +
                    "<td>" + msg[i].Territory + "</td>" +
                    "<td>" + msg[i].EmployeeName + "</td>" +
                    "<td>" + msg[i].DoctorCode + "</td>" +
                    "<td>" + msg[i].DoctorName + "</td>" +
                    "<td>" + msg[i].Designation + "</td>" +
                    "<td>" + msg[i].Speciality + "</td>" +
                    "<td>" + msg[i].Qualification + "</td>" +
                    "<td>" + msg[i].ClassName + "</td>" +
                    "<td>" + msg[i].Frequency + "</td>" +
                    "<td>" + msg[i].City + "</td>" +
                        "<td>" + msg[i].Address1 + "</td>" +

                   //----------------------------------- Addresss ---------------------------------------------

                        "<td>" + msg[i].Address2 + "</td>" +
                        "<td>" + msg[i].Addres3s + "</td>" +
                        "<td>" + msg[i].Address4 + "</td>" +
                        "<td>" + msg[i].Address5 + "</td>" +
                   //----------------------------------- End ---------------------------------------------------------




                    "<td>" + msg[i].DistributorName + "</td>" +
                    "<td>" + msg[i].BrickCode + "</td>" +
                    "<td>" + msg[i].BrickName + "</td>" +
                    "<td>" + msg[i].RequestDate + "</td>" +
                    "<td>" + " <a href='#' class='buttonlink' onclick='locationCompare(\"" + msg[i].pLatitude + "\",\""
                    + msg[i].pLongitude + "\",\"" + msg[i].Address + "\");return false'>location</a> " + "</td>" + apro +
                    "</tr></tbody>";
                    $('#Updatevalues').append(val);
                }
            }
            $("#grid-basic1").DataTable({
                responsive: true,
                "columnDefs": [{
                    //"targets": 'no-sort',
                    //"orderable": false,
                    //}]
                "visible": false, "targets": 2
                }],
                "order": [[2, 'asc']],
                "displayLength": 50,
                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
            });
        }
        else if (CurrentUserRole == 'rl5') {

         

            $('#btnApproveUpdateAll').show();
            $('#btnRejectUpdateAll').show();
            $("#griddiv1").empty();
            $("#griddiv1").append("<table id='grid-basic1' class='table table-striped table-bordered table-hover column-options' style='width:100%;'></table>");
            $("#grid-basic1").empty();
            $("#grid-basic1").append("<thead>" +
                            "<tr style='background-color: #217ebd;color: white;'>" +
                            "<th>Status</th>" +
                            "<th>Team</th>" +
                            "<th>Region</th>" +
                            "<th>District</th>" +
                            "<th>Territory</th>" +
                            "<th>Employee Name</th>" +
                            "<th>Dr Code</th>" +
                            "<th>Dr Name</th>" +
                            "<th>Designation</th>" +
                            "<th>Speciality</th>" +
                            "<th>Qualification</th>" +
                            "<th>Dr Class</th>" +
                            "<th>Visist Frequency</th>" +
                            "<th>Dr City</th>" +
                "<th>Dr Address</th>" +
                //---------------------- Adresss ---------------------------------------------
                "<th>Dr Address2</th>" +
                "<th>Dr Address3</th>" +
                "<th>Dr Address4</th>" +
                "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------

                            "<th>Distributor Name</th>" +
                            "<th>Dist Brick ID</th>" +
                            "<th>Dist Brick Name</th>" +
                            "<th>Create Date</th>" +
                            "<th>Location</th>" +
                            "<th data-column-id='Approve'>Approve<div style='margin-left: 15px;margin-top: 2px;'><input id='CheckBoxCheck' type='checkbox' name='ApproveAllForUpdateDoctorDistributorApprove' onClick=\"SelectAllApproveCheckBoxesUpdateDoctorDistributorApprove();\"></div></th> " +
                            "<th data-column-id='Reject'>Reject<div style='margin-left: 15px;margin-top: 2px;'><input type='checkbox' name='ApproveAllForUpdateDoctorDistributorReject' onClick=\"SelectAllApproveCheckBoxesForUpdateDoctorDistributorReject();\"></div></th> " +
                            "</tr>" +
                            "</thead>" +
                            "<tbody id='Updatevalues'>");
            var val = '';
            for (var i = 0; i < msg.length ; i++) {
                if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Pending') {
                    apro = "<td></td>" + "<td></td>";
                    status = "Pending By SM";
                }
                else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Pending') {
                    apro = "<td></td>" + "<td></td>"
                    status = "Pending By BUH/GM";
                }
                else {
                    apro = "<td><a onClick=\"oGrid_UpdateDoctorDistributorApprove('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Verify</a><input type='checkbox' name='checkboxes' onclick='setUpdateDoctorDistributorRejectFalse(event);' class='approveCheckBoxForUpdateDoctorDistributorApprove' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-date='" + msg[i].RequestDate + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>" +
                    "<td><a onClick=\"oGrid_UpdateDoctorDistributorRejected('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Reject</a><input type='checkbox' name='checkboxes' onclick='setUpdateDoctorDistributorApproveFalse(event);' class='approveCheckBoxForUpdateDoctorDistributorReject' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-date='" + msg[i].RequestDate + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>";
                    status = "Pending By DSM";
                }
                if (msg[i].VerifiedByAdmin == 'Rejected') {
                    apro = "<td></td><td></td>";
                    status = "Rejected By Admin";
                }
                else if (msg[i].VerifiedByAdmin == 'Verified') {
                    apro = "<td></td><td></td>";
                    status = "Verified By Admin";
                }
                val = "<tr>" +
                    "<td>" + status + "</td>" +
                    "<td>" + msg[i].TeamName + "</td>" +
                    "<td>" + msg[i].Region + "</td>" +
                    "<td>" + msg[i].District + "</td>" +
                    "<td>" + msg[i].Territory + "</td>" +
                    "<td>" + msg[i].EmployeeName + "</td>" +
                    "<td>" + msg[i].DoctorCode + "</td>" +
                    "<td>" + msg[i].DoctorName + "</td>" +
                    "<td>" + msg[i].Designation + "</td>" +
                    "<td>" + msg[i].Speciality + "</td>" +
                    "<td>" + msg[i].Qualification + "</td>" +
                    "<td>" + msg[i].ClassName + "</td>" +
                    "<td>" + msg[i].Frequency + "</td>" +
                    "<td>" + msg[i].City + "</td>" +
                    "<td>" + msg[i].Address1 + "</td>" +
                    //---------------------- Adresss ---------------------------------------------
                    "<td>" + msg[i].Address2 + "</td>" +
                    "<td>" + msg[i].Address3 + "</td>" +
                    "<td>" + msg[i].Address4 + "</td>" +
                    "<td>" + msg[i].Address5 + "</td>" +
                    //---------------------- End ---------------------------------------------

                    "<td>" + msg[i].DistributorName + "</td>" +
                    "<td>" + msg[i].BrickCode + "</td>" +
                    "<td>" + msg[i].BrickName + "</td>" +
                    "<td>" + msg[i].RequestDate + "</td>" +
                    "<td>" + " <a href='#' class='buttonlink '  onclick='locationCompare(\"" + msg[i].pLatitude + "\",\""
                    + msg[i].pLongitude + "\",\"" + msg[i].Address + "\");return false'>location</a> " + "</td>" + apro +
                "</tr></tbody>";
                $('#Updatevalues').append(val);
            }
            $("#grid-basic1").DataTable({
                responsive: true,
                "columnDefs": [{
                    //"targets": 'no-sort',
                    //"orderable": false,
                    //}]
                "visible": false, "targets": 2
                }],
                "order": [[2, 'asc']],
                "displayLength": 50,
                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
            });
        }
        else if (CurrentUserRole == 'rl4') {

           
            $('#btnApproveUpdateAll').show();
            $('#btnRejectUpdateAll').show();
            $("#griddiv1").empty();
            $("#griddiv1").append("<table id='grid-basic1' class='table table-striped table-bordered table-hover column-options' style='width:100%;'></table>");
            $("#grid-basic1").empty();
            $("#grid-basic1").append("<thead>" +
                            "<tr style='background-color: #217ebd;color: white;'>" +
                            "<th>Status</th>" +
                            "<th>Team</th>" +
                            "<th>Region</th>" +
                            "<th>District</th>" +
                            "<th>Territory</th>" +
                            "<th>Employee Name</th>" +
                            "<th>Dr Code</th>" +
                            "<th>Dr Name</th>" +
                            "<th>Designation</th>" +
                            "<th>Speciality</th>" +
                            "<th>Qualification</th>" +
                            "<th>Dr Class</th>" +
                            "<th>Visist Frequency</th>" +
                            "<th>Dr City</th>" +
                "<th>Dr Address</th>" +
                //---------------------- Adresss ---------------------------------------------
                "<th>Dr Address2</th>" +
                "<th>Dr Address3</th>" +
                "<th>Dr Address4</th>" +
                "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------

                            "<th>Distributor Name</th>" +
                            "<th>Dist Brick ID</th>" +
                            "<th>Dist Brick Name</th>" +
                            "<th>Create Date</th>" +
                            "<th>Location</th>" +
                            "<th data-column-id='Approve'>Approve<div style='margin-left: 15px;margin-top: 2px;'><input id='CheckBoxCheck' type='checkbox' name='ApproveAllForUpdateDoctorDistributorApprove' onClick=\"SelectAllApproveCheckBoxesUpdateDoctorDistributorApprove();\"></div></th> " +
                            "<th data-column-id='Reject'>Reject<div style='margin-left: 15px;margin-top: 2px;'><input type='checkbox' name='ApproveAllForUpdateDoctorDistributorReject' onClick=\"SelectAllApproveCheckBoxesForUpdateDoctorDistributorReject();\"></div></th> " +
                            "</tr>" +
                            "</thead>" +
                            "<tbody id='Updatevalues'>");
            var val = '';
            for (var i = 0; i < msg.length ; i++) {
                if ((msg[i].BUH_ApprovedStatus == 0 || msg[i].BUH_ApprovedStatus == '') && msg[i].SM_ApprovedStatus == '1') {
                    apro = "<td></td><td></td>";
                    status = "Pending by BUH/GM";
                }
                else if (msg[i].BUH_ApprovedStatus == 2 && msg[i].SM_ApprovedStatus == '1') {
                    apro = "<td></td><td></td>";
                    status = "Rejected by BUH";
                }
                else if (msg[i].BUH_ApprovedStatus == 1 && msg[i].SM_ApprovedStatus == '1') {
                    apro = "<td></td><td></td>";
                    status = "Approved by BUH";
                }
                else if (msg[i].SM_ApprovedStatus == 2 && (msg[i].BUH_ApprovedStatus == '' || msg[i].BUH_ApprovedStatus == '0')) {
                    apro = "<td></td><td></td>";
                    status = "Rejected by SM";
                }
                else if (msg[i].SM_ApprovedStatus == 1) {
                    apro = "<td></td><td></td>";
                    status = "Approved by SM";
                }
                else {
                    apro = "<td><a onClick=\"oGrid_UpdateDoctorDistributorApprove('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Verify</a><input type='checkbox' name='checkboxes' onclick='setUpdateDoctorDistributorRejectFalse(event);' class='approveCheckBoxForUpdateDoctorDistributorApprove' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-date='" + msg[i].RequestDate + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>" +
                    "<td><a onClick=\"oGrid_UpdateDoctorDistributorRejected('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Reject</a><input type='checkbox' name='checkboxes' onclick='setUpdateDoctorDistributorApproveFalse(event);' class='approveCheckBoxForUpdateDoctorDistributorReject' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-date='" + msg[i].RequestDate + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>";
                    status = "Pending by SM";
                }
                if (msg[i].VerifiedByAdmin == 'Rejected') {
                    apro = "<td></td><td></td>";
                    status = "Rejected By Admin";
                }
                else if (msg[i].VerifiedByAdmin == 'Verified') {
                    apro = "<td></td><td></td>";
                    status = "Verified By Admin";
                }
                val = "<tr>" +
                    "<td>" + status + "</td>" +
                    "<td>" + msg[i].TeamName + "</td>" +
                    "<td>" + msg[i].Region + "</td>" +
                    "<td>" + msg[i].District + "</td>" +
                    "<td>" + msg[i].Territory + "</td>" +
                    "<td>" + msg[i].EmployeeName + "</td>" +
                    "<td>" + msg[i].DoctorCode + "</td>" +
                    "<td>" + msg[i].DoctorName + "</td>" +
                    "<td>" + msg[i].Designation + "</td>" +
                    "<td>" + msg[i].Speciality + "</td>" +
                    "<td>" + msg[i].Qualification + "</td>" +
                    "<td>" + msg[i].ClassName + "</td>" +
                    "<td>" + msg[i].Frequency + "</td>" +
                    "<td>" + msg[i].City + "</td>" +
                    "<td>" + msg[i].Address1 + "</td>" +
                    //---------------------- Adresss ---------------------------------------------
                    "<td>" + msg[i].Address2 + "</td>" +
                    "<td>" + msg[i].Address3 + "</td>" +
                    "<td>" + msg[i].Address4 + "</td>" +
                    "<td>" + msg[i].Address5 + "</td>" +
                  //---------------------- End ---------------------------------------------

                    "<td>" + msg[i].DistributorName + "</td>" +
                    "<td>" + msg[i].BrickCode + "</td>" +
                    "<td>" + msg[i].BrickName + "</td>" +
                    "<td>" + msg[i].RequestDate + "</td>" +
                    "<td>" + " <a href='#' class='buttonlink '  onclick='locationCompare(\"" + msg[i].pLatitude + "\",\""
                    + msg[i].pLongitude + "\",\"" + msg[i].Address + "\");return false'>location</a> " + "</td>" + apro +
                "</tr></tbody>";
                $('#Updatevalues').append(val);
            }
            $("#grid-basic1").DataTable({
                responsive: true,
                "columnDefs": [{
                    //"targets": 'no-sort',
                    //"orderable": false,
                    //}]
                "visible": false, "targets": 2
                }],
                "order": [[2, 'asc']],
                "displayLength": 50,
                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
            });
        }
        else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'rl2') {
            $('#btnApproveUpdateAll').show();
            $('#btnRejectUpdateAll').show();
            $("#griddiv1").empty();
            $("#griddiv1").append("<table id='grid-basic1' class='table table-striped table-bordered table-hover column-options' style='width:100%;'></table>");
            $("#grid-basic1").empty();
            $("#grid-basic1").append("<thead>" +
                            "<tr style='background-color: #217ebd;color: white;'>" +
                            "<th>Status</th>" +
                            "<th>Team</th>" +
                            "<th>Region</th>" +
                            "<th>District</th>" +
                            "<th>Territory</th>" +
                            "<th>Employee Name</th>" +
                            "<th>Dr Code</th>" +
                            "<th>Dr Name</th>" +
                            "<th>Designation</th>" +
                            "<th>Speciality</th>" +
                            "<th>Qualification</th>" +
                            "<th>Dr Class</th>" +
                            "<th>Visist Frequency</th>" +
                            "<th>Dr City</th>" +
                "<th>Dr Address</th>" +
                //---------------------- Adresss ---------------------------------------------
                "<th>Dr Address2</th>" +
                "<th>Dr Address3</th>" +
                "<th>Dr Address4</th>" +
                "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------

                            "<th>Distributor Name</th>" +
                            "<th>Dist Brick ID</th>" +
                            "<th>Dist Brick Name</th>" +
                            "<th>Create Date</th>" +
                            "<th>Location</th>" +
                            "<th data-column-id='Approve'>Approve<div style='margin-left: 15px;margin-top: 2px;'><input id='CheckBoxCheck' type='checkbox' name='ApproveAllForUpdateDoctorDistributorApprove' onClick=\"SelectAllApproveCheckBoxesUpdateDoctorDistributorApprove();\"></div></th> " +
                            "<th data-column-id='Reject'>Reject<div style='margin-left: 15px;margin-top: 2px;'><input type='checkbox' name='ApproveAllForUpdateDoctorDistributorReject' onClick=\"SelectAllApproveCheckBoxesForUpdateDoctorDistributorReject();\"></div></th> " +
                            "</tr>" +
                            "</thead>" +
                            "<tbody id='Updatevalues'>");
            var val = '';
            for (var i = 0; i < msg.length ; i++) {
                if (msg[i].VerifiedByAdmin == 'Rejected') {
                    apro = "<td></td><td></td>";
                    status = "Rejected By Admin";
                }
                else if (msg[i].VerifiedByAdmin == 'Verified') {
                    apro = "<td></td><td></td>";
                    status = "Verified By Admin";
                }
                else {
                    apro = "<td><a onClick=\"oGrid_UpdateDoctorDistributorApprove('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Verify</a><input type='checkbox' name='checkboxes' onclick='setUpdateDoctorDistributorRejectFalse(event);' class='approveCheckBoxForUpdateDoctorDistributorApprove' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-date='" + msg[i].RequestDate + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>" +
                    "<td><a onClick=\"oGrid_UpdateDoctorDistributorRejected('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Reject</a><input type='checkbox' name='checkboxes' onclick='setUpdateDoctorDistributorApproveFalse(event);' class='approveCheckBoxForUpdateDoctorDistributorReject' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-date='" + msg[i].RequestDate + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>";
                    status = "Pending by BUH/GM";
                }
                val = "<tr>" +
                    "<td>" + status + "</td>" +
                    "<td>" + msg[i].TeamName + "</td>" +
                    "<td>" + msg[i].Region + "</td>" +
                    "<td>" + msg[i].District + "</td>" +
                    "<td>" + msg[i].Territory + "</td>" +
                    "<td>" + msg[i].EmployeeName + "</td>" +
                    "<td>" + msg[i].DoctorCode + "</td>" +
                    "<td>" + msg[i].DoctorName + "</td>" +
                    "<td>" + msg[i].Designation + "</td>" +
                    "<td>" + msg[i].Speciality + "</td>" +
                    "<td>" + msg[i].Qualification + "</td>" +
                    "<td>" + msg[i].ClassName + "</td>" +
                    "<td>" + msg[i].Frequency + "</td>" +
                    "<td>" + msg[i].City + "</td>" +
                    "<td>" + msg[i].Address1 + "</td>" +
                    //---------------------- Adresss ---------------------------------------------
                    "<td>" + msg[i].Address2 + "</td>" +
                    "<td>" + msg[i].Address3 + "</td>" +
                    "<td>" + msg[i].Address4 + "</td>" +
                    "<td>" + msg[i].Address5 + "</td>" +
          //---------------------- End ---------------------------------------------

                    "<td>" + msg[i].DistributorName + "</td>" +
                    "<td>" + msg[i].BrickCode + "</td>" +
                    "<td>" + msg[i].BrickName + "</td>" +
                    "<td>" + msg[i].RequestDate + "</td>" +
                    "<td>" + "<a href='#' class='buttonlink '  onclick='locationCompare(\"" + msg[i].pLatitude + "\",\""
                    + msg[i].pLongitude + "\",\"" + msg[i].Address + "\");return false'>location</a> " + "</td>" + apro +
                "</tr></tbody>";
                $('#Updatevalues').append(val);
            }
            $("#grid-basic1").DataTable({
                responsive: true,
                "columnDefs": [{
                //    "targets": 'no-sort',
                //    "orderable": false,
                //   "alengthMenu": [[25, 50, 100, 200, -1],
                //     [25, 50, 100, 200, "All"]
                //   ],
                //   iDisplayLength: -1
                    //}]
                "visible": false, "targets": 2
                }],
                "order": [[2, 'asc']],
                "displayLength": 50,
                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]

            });
        }
        else if (CurrentUserRole == 'Admin' || CurrentUserRole == 'admin') {
            $('#btnApproveUpdateAll').show();
            $('#btnRejectUpdateAll').show();
            $("#griddiv1").empty();
            $("#griddiv1").append("<table id='grid-basic1' class='table table-striped table-bordered table-hover column-options' style='width:100%;'></table>");
            $("#grid-basic1").empty();
            $("#grid-basic1").append("<thead>" +
                        "<tr style='background-color: #217ebd;color: white;'>" +
                            "<th>Status</th>" +
                            "<th>Team</th>" +
                            "<th>Region</th>" +
                            "<th>District</th>" +
                            "<th>Territory</th>" +
                            "<th>Employee Name</th>" +
                            "<th>Dr Code</th>" +
                            "<th>Dr Name</th>" +
                            "<th>Designation</th>" +
                            "<th>Speciality</th>" +
                            "<th>Qualification</th>" +
                            "<th>Dr Class</th>" +
                            "<th>Visist Frequency</th>" +
                            "<th>Dr City</th>" +
                "<th>Dr Address</th>" +
                //---------------------- Adresss ---------------------------------------------
                "<th>Dr Address2</th>" +
                "<th>Dr Address3</th>" +
                "<th>Dr Address4</th>" +
                "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------

                            "<th>Distributor Name</th>" +
                            "<th>Dist Brick ID</th>" +
                            "<th>Dist Brick Name</th>" +
                            "<th>Create Date</th>" +
                            "<th>Location</th>" +
                            "<th data-column-id='Approve'>Approve<div style='margin-left: 15px;margin-top: 2px;'><input id='CheckBoxCheck' type='checkbox' name='ApproveAllForUpdateDoctorDistributorApprove' onClick=\"SelectAllApproveCheckBoxesUpdateDoctorDistributorApprove();\"></div></th> " +
                            "<th data-column-id='Reject'>Reject<div style='margin-left: 15px;margin-top: 2px;'><input type='checkbox' name='ApproveAllForUpdateDoctorDistributorReject' onClick=\"SelectAllApproveCheckBoxesForUpdateDoctorDistributorReject();\"></div></th> " +
                            "</tr>" +
                            "</thead>" +
                            "<tbody id='Updatevalues'>");
            var val = '';
            for (var i = 0; i < msg.length ; i++) {
                if (msg[i].VerifiedByDSM == 'Pending' && msg[i].VerifiedBySM == 'Pending' && msg[i].VerifiedByBUH == 'Pending') {
                    status = "Pending By DSM";
                }
                else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Pending' && msg[i].VerifiedByBUH == 'Pending') {
                    status = "Pending By SM";
                }
                else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Pending') {
                    status = "Pending By BUH/GM";
                }
                else if (msg[i].VerifiedByDSM == 'Rejected') {
                    status = "Rejected By DSM";
                }
                else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Rejected') {
                    status = "Rejected By SM";
                }
                else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Rejected') {
                    status = "Rejected By BUH/GM";
                }
                else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Verified') {
                    status = "Verified By BUH/GM";
                }
                val = "<tr>" +
                    "<td>" + status + "</td>" +
                    "<td>" + msg[i].TeamName + "</td>" +
                    "<td>" + msg[i].Region + "</td>" +
                    "<td>" + msg[i].District + "</td>" +
                    "<td>" + msg[i].Territory + "</td>" +
                    "<td>" + msg[i].EmployeeName + "</td>" +
                    "<td>" + msg[i].DoctorCode + "</td>" +
                    "<td>" + msg[i].DoctorName + "</td>" +
                    "<td>" + msg[i].Designation + "</td>" +
                    "<td>" + msg[i].Speciality + "</td>" +
                    "<td>" + msg[i].Qualification + "</td>" +
                    "<td>" + msg[i].ClassName + "</td>" +
                    "<td>" + msg[i].Frequency + "</td>" +
                    "<td>" + msg[i].City + "</td>" +
                    "<td>" + msg[i].Address1 + "</td>" +
                    //---------------------- Adresss ---------------------------------------------
                    "<td>" + msg[i].Address2 + "</td>" +
                    "<td>" + msg[i].Address3 + "</td>" +
                    "<td>" + msg[i].Address4 + "</td>" +
                    "<td>" + msg[i].Address5 + "</td>" +
          //---------------------- End ---------------------------------------------
                    "<td>" + msg[i].DistributorName + "</td>" +
                    "<td>" + msg[i].BrickCode + "</td>" +
                    "<td>" + msg[i].BrickName + "</td>" +
                    "<td>" + msg[i].RequestDate + "</td>" +
                    "<td>" + " <a href='#' class='buttonlink '  onclick='locationCompare(\"" + msg[i].pLatitude + "\",\""
                    + msg[i].pLongitude + "\",\"" + msg[i].Address + "\");return false'>location</a> " + "</td>" +
                    "<td><a onClick=\"oGrid_UpdateDoctorDistributorApprove('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Verify</a><input type='checkbox' name='checkboxes' onclick='setUpdateDoctorDistributorRejectFalse(event);' class='approveCheckBoxForUpdateDoctorDistributorApprove' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-date='" + msg[i].RequestDate + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>" +
                    "<td><a onClick=\"oGrid_UpdateDoctorDistributorRejected('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Reject</a><input type='checkbox' name='checkboxes' onclick='setUpdateDoctorDistributorApproveFalse(event);' class='approveCheckBoxForUpdateDoctorDistributorReject' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-date='" + msg[i].RequestDate + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>";
                $('#Updatevalues').append(val);
            }
            $("#grid-basic1").DataTable({
                responsive: true,
                "columnDefs": [{
                    //"targets": 'no-sort',
                    //"orderable": false,
                "visible": false, "targets": 2 }],
                "order": [[2, 'asc']],
                "displayLength": 50,
                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
     
            });
        }
    }
    else {
        $("#griddiv1").empty();
        $("#griddiv1").append("<table id='grid-basic1' class='table table-striped table-bordered table-hover column-options' style='width:100%;'></table>");
        $("#grid-basic1").empty();
        $("#grid-basic1").append("<thead>" +
                            "<tr style='background-color: #217ebd;color: white;'>" +
                            "<th>Status</th>" +
                            "<th>Team</th>" +
                            "<th>Region</th>" +
                            "<th>District</th>" +
                            "<th>Territory</th>" +
                            "<th>Employee Name</th>" +
                            "<th>Dr Code</th>" +
                            "<th>Dr Name</th>" +
                            "<th>Designation</th>" +
                            "<th>Speciality</th>" +
                            "<th>Qualification</th>" +
                            "<th>Dr Class</th>" +
                            "<th>Visist Frequency</th>" +
                            "<th>Dr City</th>" +
            "<th>Dr Address</th>" +
            //---------------------- Adresss ---------------------------------------------
            "<th>Dr Address2</th>" +
            "<th>Dr Address3</th>" +
            "<th>Dr Address4</th>" +
            "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------
                            "<th>Distributor Name</th>" +
                            "<th>Dist Brick ID</th>" +
                            "<th>Dist Brick Name</th>" +
                            "<th>Create Date</th>" +
                            "<th>Location</th>" +
                            "<th data-column-id='Approve' class='no-sort'>Approve</th> " +
                            "<th data-column-id='Reject' class='no-sort'>Reject</th> " +
                            "</tr>" +
                            "</thead>" +
                            "<tbody id='Updatevalues'>");
        $("#grid-basic1").DataTable({
            responsive: true,
            "columnDefs": [{
            //    "targets": 'no-sort',
            //    "orderable": false,
                //}]
            "visible": false, "targets": 2
            }],
            "order": [[2, 'asc']],
            "displayLength": 50,
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
        });
    }
}

function SelectAllApproveCheckBoxesUpdateDoctorDistributorApprove() {


    if ($('input[name="ApproveAllForUpdateDoctorDistributorApprove"]').is(':checked')) {
        $('.approveCheckBoxForUpdateDoctorDistributorApprove').prop('checked', true);
        $('.approveCheckBoxForUpdateDoctorDistributorReject').prop('checked', false);
        $('input[name="ApproveAllForUpdateDoctorDistributorReject"]').prop('checked', false);
    } else {
        $('.approveCheckBoxForUpdateDoctorDistributorApprove').prop('checked', false);
    }
}

function SelectAllApproveCheckBoxesForUpdateDoctorDistributorReject() {

    if ($('input[name="ApproveAllForUpdateDoctorDistributorReject"]').is(':checked')) {
        $('.approveCheckBoxForUpdateDoctorDistributorReject').prop('checked', true);
        $('.approveCheckBoxForUpdateDoctorDistributorApprove').prop('checked', false);
        $('input[name="ApproveAllForUpdateDoctorDistributorApprove"]').prop('checked', false);
    } else {
        $('.approveCheckBoxForUpdateDoctorDistributorReject').prop('checked', false);
    }
}

function setUpdateDoctorDistributorRejectFalse(e) {

    if (e.target.checked) {
        e.target.parentElement.nextSibling.lastChild.checked = false;
    }
}

function setUpdateDoctorDistributorApproveFalse(e) {

    if (e.target.checked) {
        e.target.parentElement.previousSibling.lastChild.checked = false;
    }
}

function UpdateDoctorDistributorApproveAll() {
    var checkedboxes = [], ids = [], MonthDate = [];
    checkedboxes = document.querySelectorAll('.approveCheckBoxForUpdateDoctorDistributorApprove:checked');

    if (checkedboxes.length > 0) {
        for (var i = 0; i < checkedboxes.length; i++) {

            ids.push(checkedboxes[i].value);
            docIds.push(checkedboxes[i].attributes['data-docId'].value);
            MonthDate.push(checkedboxes[i].attributes['data-date'].value);
        }
    }
    else {
        swal(
            'alert!',
            'You must select atleast one option!',
            'warning'
        )
        return false;
    }

    swal({
        title: "Approve All",
        text: "Are you sure you want to approve all the selected requests?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, All Approve it!",
        cancelButtonText: "No, Cancel !",
        closeOnConfirm: false,
        closeOnCancel: false
    },
function (isConfirm) {
    if (isConfirm) {

        var mydata = "{'id':'" + ids.toString() + "','docid':'" + docIds.toString() + "','empid':'" + EmployeeId + "','date':'" + MonthDate + "',Status:'1','CurrentUserRole':'" + CurrentUserRole + "'}";

        $('#hdnMode').val("R");
        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/UpdateDoctorDistributorApproveThis",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                sweetAlert('success', 'All Requests has been approved!', 'success');
                FillGridRequest(1);
            },
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: false,
            cache: false
        });

        //  swal("Deleted!", "Your imaginary file has been deleted.", "success");
    } else {
        swal("Cancelled", "Request has been cancelled:)", "error");
    }
});
}

function UpdateDoctorDistributorForReject() {
    var checkedboxes = [], ids = [], MonthDate = [];
    checkedboxes = document.querySelectorAll('.approveCheckBoxForUpdateDoctorDistributorReject:checked');

    if (checkedboxes.length > 0) {
        for (var i = 0; i < checkedboxes.length; i++) {

            ids.push(checkedboxes[i].value);
            docIds.push(checkedboxes[i].attributes['data-docId'].value);
            MonthDate.push(checkedboxes[i].attributes['data-date'].value);
        }
    }
    else {
        swal(
            'alert!',
            'You must select atleast one option!',
            'warning'
        )
        return false;
    }

    swal({
        title: "Reject All",
        text: "Are you sure you want to Reject all the selected requests?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, All Reject it!",
        cancelButtonText: "No, Cancel !",
        closeOnConfirm: false,
        closeOnCancel: false
    },
function (isConfirm) {
    if (isConfirm) {

        var mydata = "{'id':'" + ids.toString() + "','docid':'" + docIds.toString() + "','empid':'" + EmployeeId + "','date':'" + MonthDate + "',Status:'2','CurrentUserRole':'" + CurrentUserRole + "'}";

        $('#hdnMode').val("R");
        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/UpdateDoctorDistributorRejectThis",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                sweetAlert('success', 'All selected requests have been Rejected!', 'success');
                FillGridRequest(1);
            },
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: false,
            cache: false
        });

        //  swal("Deleted!", "Your imaginary file has been deleted.", "success");
    } else {
        swal("Cancelled", "Request has been cancelled:)", "error");
    }
});
}

function oGrid_UpdateDoctorDistributorApprove(ids) {
    // $old('#divApproveConfirmation').jqmShow();

    //  $('#divApproveConfirmation').find('#btnApproveYes').attr({ '_id': id, '_docid': docid });
    swal({
        title: "Are you sure?",
        text: "Are you sure you want to approve the selected request?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Approve it!",
        cancelButtonText: "No, cancel Please!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
function (isConfirm) {
    if (isConfirm) {

        var mydata = "{'id':'" + ids.toString() + "','docid':'" + "0" + "','empid':'" + EmployeeId + "','date':'" + MonthDate + "',Status:'1','CurrentUserRole':'" + CurrentUserRole + "'}";

        $('#hdnMode').val("R");
        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/UpdateDoctorDistributorApproveThis",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                sweetAlert('success', 'All Requests has been approved!', 'success');
                FillGridRequest(1);
            },
            beforeSend: ajaxstar,
            complete: ajaxcom,
            error: onError,
            async: false,
            cache: false
        });
        
        //  swal("Deleted!", "Your imaginary file has been deleted.", "success");
    } else {
        swal("Cancelled", "Request has been cancelled:)", "error");
    }
});
}

function oGrid_UpdateDoctorDistributorRejected(ids) {
    swal({
        title: "Reject",
        text: "Are you sure you want to Reject the selected request?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Reject it!",
        cancelButtonText: "No, cancel Please!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
    function (isConfirm) {
        if (isConfirm) {
            var mydata = "{'id':'" + ids.toString() + "','docid':'" + "0" + "','empid':'" + EmployeeId + "','date':'" + MonthDate + "',Status:'2','CurrentUserRole':'" + CurrentUserRole + "'}";

            $('#hdnMode').val("R");
            $.ajax({
                type: "POST",
                url: "DoctorsService.asmx/UpdateDoctorDistributorRejectThis",
                data: mydata,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    sweetAlert('success', 'All selected requests have been Rejected!', 'success');
                    FillGridRequest(1);
                },
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                error: onError,
                async: false,
                cache: false
            });
        } else {
            swal("Cancelled", "Request has been cancelled:)", "error");
        }
    });
}

//#endregion 

//#region Doctor Remove Requested

function FillGridRemove(empid) {

    GetSelectHierarchy()
    var mydata = "{'Level1Id':'" + l1 + "','Level2Id':'" + l2 + "','Level3Id':'" + l3 +
       "','Level4Id':'" + l4 + "','Level5Id':'" + l5 + "','Level6Id':'" + l6 +
       "','TeamID':'" + (l7 == null ? 0 : l7) + "','Role':'" + Role + "'}";
    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetAllDataOfRemovalRequest",
        data: mydata,
        contentType: "application/json; charset=utf-8",
        success: OnsuccessfillgridRemove,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: onError,
        async: true,
        cache: false
    });
}

function OnsuccessfillgridRemove(response) {

    fildataRemove(response.d);
}

function fildataRemove(data) {
    var apro;
    var status;
    $('#btnApproveRemoveAll').hide();
    $('#btnRejectRemoveAll').hide();
    $("#griddivRemove").empty();
    $("#griddivRemove").append("<table id='grid-basicRemove' class='table table-striped table-bordered table-hover column-options' style='width:100%;' style='width:100%;'></table>");
    $("#grid-basicRemove").empty();
    $("#grid-basicRemove").append("<thead>" +
                        "<tr style='background-color: #217ebd;color: white;'>" +
                        "<th>Status</th>" +
                        "<th>Team</th>" +
                        "<th>Region</th>" +
                        "<th>District</th>" +
                        "<th>Territory</th>" +
                        "<th>Employee Name</th>" +
                        "<th>Dr Code</th>" +
                        "<th>Dr Name</th>" +
                        "<th>Designation</th>" +
                        "<th>Speciality</th>" +
                        "<th>Qualification</th>" +
                        "<th>Dr Class</th>" +
                        "<th>Visist Frequency</th>" +
                        "<th>Dr City</th>" +
        "<th>Dr Address</th>" +

        //---------------------- Adresss ---------------------------------------------
        "<th>Dr Address2</th>" +
        "<th>Dr Address3</th>" +
        "<th>Dr Address4</th>" +
        "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------

                        "<th>Distributor Name</th>" +
                        "<th>Dist Brick ID</th>" +
                        "<th>Dist Brick Name</th>" +
                        "<th>Create Date</th>" +
                        "<th>Location</th>" +
                        "</tr>" +
                        "</thead>" +
                        "<tbody id='valuesRemove'>");
    if (data != "" && data != "[]") {

        var msg = "";
        if (data.d == undefined) {
            msg = $.parseJSON(data);
        }
        else {
            if (data.d != "")
                msg = $.parseJSON(data.d);
            else
                msg = 0;
        }

        if (CurrentUserRole == 'rl6') {
            $('#btnApproveRemoveAll').hide();
            $('#btnRejectRemoveAll').hide();
            $("#griddivRemove").empty();
            $("#griddivRemove").append("<table id='grid-basicRemove' class='table table-striped table-bordered table-hover column-options' style='width:100%;' style='width:100%;'></table>");
            $("#grid-basicRemove").empty();
            $("#grid-basicRemove").append("<thead>" +
                            "<tr style='background-color: #217ebd;color: white;'>" +
                            "<th>Status</th>" +
                            "<th>Team</th>" +
                            "<th>Region</th>" +
                            "<th>District</th>" +
                            "<th>Territory</th>" +
                            "<th>Employee Name</th>" +
                            "<th>Dr Code</th>" +
                            "<th>Dr Name</th>" +
                            "<th>Designation</th>" +
                            "<th>Speciality</th>" +
                            "<th>Qualification</th>" +
                            "<th>Dr Class</th>" +
                            "<th>Visist Frequency</th>" +
                            "<th>Dr City</th>" +
                "<th>Dr Address</th>" +
                //---------------------- Adresss ---------------------------------------------
                "<th>Dr Address2</th>" +
                "<th>Dr Address3</th>" +
                "<th>Dr Address4</th>" +
                "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------
                            "<th>Distributor Name</th>" +
                            "<th>Dist Brick ID</th>" +
                            "<th>Dist Brick Name</th>" +
                            "<th>Create Date</th>" +
                            "<th>Location</th>" +
                            "<th data-column-id='Approve'>Approve</th> " +
                            "<th data-column-id='Reject'>Reject</th> " +
                            "</tr>" +
                            "</thead>" +
                            "<tbody id='valuesRemove'>");
            var val = '';
            if (msg.length > 0) {
                for (var i = 0; i < msg.length ; i++) {
                    if (msg[i].VerifiedByDSM == 'Pending' && msg[i].VerifiedBySM == 'Pending' && msg[i].VerifiedByBUH == 'Pending') {
                        apro = "<td></td><td></td>";
                        status = "Pending By DSM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Pending' && msg[i].VerifiedByBUH == 'Pending') {
                        apro = "<td></td><td></td>";
                        status = "Pending By SM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Pending') {
                        apro = "<td></td><td></td>";
                        status = "Pending By BUH/GM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Rejected') {
                        apro = "<td></td><td></td>";
                        status = "Rejected By DSM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Rejected') {
                        apro = "<td></td><td></td>";
                        status = "Rejected By SM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Rejected') {
                        apro = "<td></td><td></td>";
                        status = "Rejected By BUH/GM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Verified') {
                        apro = "<td></td><td></td>";
                        status = "Verified By BUH/GM";
                    }
                    if (msg[i].VerifiedByAdmin == 'Rejected') {
                        apro = "<td></td><td></td>";
                        status = "Rejected By Admin";
                    }
                    else if (msg[i].VerifiedByAdmin == 'Verified') {
                        apro = "<td></td><td></td>";
                        status = "Verified By Admin";
                    }
                    val = "<tr>" +
                    "<td>" + status + "</td>" +
                    "<td>" + msg[i].TeamName + "</td>" +
                    "<td>" + msg[i].Region + "</td>" +
                    "<td>" + msg[i].District + "</td>" +
                    "<td>" + msg[i].Territory + "</td>" +
                    "<td>" + msg[i].EmployeeName + "</td>" +
                    "<td>" + msg[i].DoctorCode + "</td>" +
                    "<td>" + msg[i].DoctorName + "</td>" +
                    "<td>" + msg[i].Designation + "</td>" +
                    "<td>" + msg[i].Speciality + "</td>" +
                    "<td>" + msg[i].Qualification + "</td>" +
                    "<td>" + msg[i].ClassName + "</td>" +
                    "<td>" + msg[i].Frequency + "</td>" +
                    "<td>" + msg[i].City + "</td>" +
                        "<td>" + msg[i].Address1 + "</td>" +
                        //----------------------------------- Addresss ---------------------------------------------

                        "<td>" + msg[i].Address2 + "</td>" +
                        "<td>" + msg[i].Address3 + "</td>" +
                        "<td>" + msg[i].Address4 + "</td>" +
                        "<td>" + msg[i].Address5 + "</td>" +
                   //----------------------------------- End ---------------------------------------------------------
                    "<td>" + msg[i].DistributorName + "</td>" +
                    "<td>" + msg[i].BrickCode + "</td>" +
                    "<td>" + msg[i].BrickName + "</td>" +
                    "<td>" + msg[i].RequestDate + "</td>" +
                    "<td>" + " <a href='#' class='buttonlink '  onclick='locationCompare(\"" + msg[i].pLatitude + "\",\""
                    + msg[i].pLongitude + "\",\"" + msg[i].Address + "\");return false'>location</a> " + "</td>" + apro + "</tr></tbody>";
                    $('#valuesRemove').append(val);
                }
            }
            $("#grid-basicRemove").DataTable({
                responsive: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                }]
            });
        }
        else if (CurrentUserRole == 'rl5') {
            $('#btnApproveRemoveAll').show();
            $('#btnRejectRemoveAll').show();
            $("#griddivRemove").empty();
            $("#griddivRemove").append("<table id='grid-basicRemove' class='table table-striped table-bordered table-hover column-options' style='width:100%;' style='width:100%;'></table>");
            $("#grid-basicRemove").empty();
            $("#grid-basicRemove").append("<thead>" +
                                        "<tr style='background-color: #217ebd;color: white;'>" +
                                        "<th>Status</th>" +
                                        "<th>Team</th>" +
                                        "<th>Region</th>" +
                                        "<th>District</th>" +
                                        "<th>Territory</th>" +
                                        "<th>Employee Name</th>" +
                                        "<th>Dr Code</th>" +
                                        "<th>Dr Name</th>" +
                                        "<th>Designation</th>" +
                                        "<th>Speciality</th>" +
                                        "<th>Qualification</th>" +
                                        "<th>Dr Class</th>" +
                                        "<th>Visist Frequency</th>" +
                                        "<th>Dr City</th>" +
                "<th>Dr Address</th>" +
                //---------------------- Adresss ---------------------------------------------
                "<th>Dr Address2</th>" +
                "<th>Dr Address3</th>" +
                "<th>Dr Address4</th>" +
                "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------
                                        "<th>Distributor Name</th>" +
                                        "<th>Dist Brick ID</th>" +
                                        "<th>Dist Brick Name</th>" +
                                        "<th>Create Date</th>" +
                                        "<th>Location</th>" +
                                        "<th data-column-id='Approve'>Approve<div style='margin-left: 15px;margin-top: 2px;'><input id='CheckBoxCheck' type='checkbox' name='ApproveAllForDoctorRemoveApprove' onClick=\"SelectAllApproveCheckBoxesDoctorRemoveApprove();\"></div></th> " +
                                        "<th data-column-id='Reject'>Reject<div style='margin-left: 15px;margin-top: 2px;'><input type='checkbox' name='ApproveAllForDoctorRemoveReject' onClick=\"SelectAllApproveCheckBoxesForDoctorRemoveReject();\"></div></th> " +
                                        "</tr>" +
                                        "</thead>" +
                                        "<tbody id='valuesRemove'>");
            var val = '';
            if (msg.length > 0) {
                for (var i = 0; i < msg.length ; i++) {
                    if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Pending') {
                        apro = "<td></td><td></td>";
                        status = "Pending By SM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Pending') {
                        apro = "<td></td><td></td>";
                        status = "Pending By BUH/GM";
                    }
                    else {
                        apro = "<td><a onClick=\"oGrid_DoctorRemoveApprove('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Verify</a><input type='checkbox' name='checkboxes' onclick='setDoctorRemoveRejectFalse(event);' class='approveCheckBoxForDoctorRemoveApprove' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-date='" + msg[i].RequestDate + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>" +
                        "<td><a onClick=\"oGrid_DoctorRemoveRejected('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Reject</a><input type='checkbox' name='checkboxes' onclick='setDoctorRemoveApproveFalse(event);' class='approveCheckBoxForDoctorRemoveReject' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-date='" + msg[i].RequestDate + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>";
                        status = "Pending By DSM";
                    }
                    if (msg[i].VerifiedByAdmin == 'Rejected') {
                        apro = "<td></td><td></td>";
                        status = "Rejected By Admin";
                    }
                    else if (msg[i].VerifiedByAdmin == 'Verified') {
                        apro = "<td></td><td></td>";
                        status = "Verified By Admin";
                    }
                    val = "<tr>" +
                    "<td>" + status + "</td>" +
                    "<td>" + msg[i].TeamName + "</td>" +
                    "<td>" + msg[i].Region + "</td>" +
                    "<td>" + msg[i].District + "</td>" +
                    "<td>" + msg[i].Territory + "</td>" +
                    "<td>" + msg[i].EmployeeName + "</td>" +
                    "<td>" + msg[i].DoctorCode + "</td>" +
                    "<td>" + msg[i].DoctorName + "</td>" +
                    "<td>" + msg[i].Designation + "</td>" +
                    "<td>" + msg[i].Speciality + "</td>" +
                    "<td>" + msg[i].Qualification + "</td>" +
                    "<td>" + msg[i].ClassName + "</td>" +
                    "<td>" + msg[i].Frequency + "</td>" +
                    "<td>" + msg[i].City + "</td>" +
                        "<td>" + msg[i].Address1 + "</td>" +
                        //----------------------------------- Addresss ---------------------------------------------

                        "<td>" + msg[i].Address2 + "</td>" +
                        "<td>" + msg[i].Address3 + "</td>" +
                        "<td>" + msg[i].Address4 + "</td>" +
                        "<td>" + msg[i].Address5 + "</td>" +
                   //----------------------------------- End ---------------------------------------------------------
                    "<td>" + msg[i].DistributorName + "</td>" +
                    "<td>" + msg[i].BrickCode + "</td>" +
                    "<td>" + msg[i].BrickName + "</td>" +
                    "<td>" + msg[i].RequestDate + "</td>" +
                    "<td>" + " <a href='#' class='buttonlink '  onclick='locationCompare(\"" + msg[i].pLatitude + "\",\""
                    + msg[i].pLongitude + "\",\"" + msg[i].Address + "\");return false'>location</a> " + "</td>" + apro + "</tr></tbody>";
                    $('#valuesRemove').append(val);
                }
            }
            $("#grid-basicRemove").DataTable({
                responsive: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                }]
            });
        }
        else if (CurrentUserRole == 'rl4') {
            $('#btnApproveRemoveAll').show();
            $('#btnRejectRemoveAll').show();
            $("#griddivRemove").empty();
            $("#griddivRemove").append("<table id='grid-basicRemove' class='table table-striped table-bordered table-hover column-options' style='width:100%;' style='width:100%;'></table>");
            $("#grid-basicRemove").empty();
            $("#grid-basicRemove").append("<thead>" +
                            "<tr style='background-color: #217ebd;color: white;'>" +
                            "<th>Status</th>" +
                            "<th>Team</th>" +
                            "<th>Region</th>" +
                            "<th>District</th>" +
                            "<th>Territory</th>" +
                            "<th>Employee Name</th>" +
                            "<th>Dr Code</th>" +
                            "<th>Dr Name</th>" +
                            "<th>Designation</th>" +
                            "<th>Speciality</th>" +
                            "<th>Qualification</th>" +
                            "<th>Dr Class</th>" +
                            "<th>Visist Frequency</th>" +
                            "<th>Dr City</th>" +
                "<th>Dr Address</th>" +
                //---------------------- Adresss ---------------------------------------------
                "<th>Dr Address2</th>" +
                "<th>Dr Address3</th>" +
                "<th>Dr Address4</th>" +
                "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------
                            "<th>Distributor Name</th>" +
                            "<th>Dist Brick ID</th>" +
                            "<th>Dist Brick Name</th>" +
                            "<th>Create Date</th>" +
                            "<th>Location</th>" +
                            "<th data-column-id='Approve'>Approve<div style='margin-left: 15px;margin-top: 2px;'><input id='CheckBoxCheck' type='checkbox' name='ApproveAllForDoctorRemoveApprove' onClick=\"SelectAllApproveCheckBoxesDoctorRemoveApprove();\"></div></th> " +
                            "<th data-column-id='Reject'>Reject<div style='margin-left: 15px;margin-top: 2px;'><input type='checkbox' name='ApproveAllForDoctorRemoveReject' onClick=\"SelectAllApproveCheckBoxesForDoctorRemoveReject();\"></div></th> " +
                            "</tr>" +
                            "</thead>" +
                            "<tbody id='valuesRemove'>");
            var val = '';
            if (msg.length > 0) {
                for (var i = 0; i < msg.length ; i++) {
                    if ((msg[i].BUH_ApprovedStatus == 0 || msg[i].BUH_ApprovedStatus == '') && msg[i].SM_ApprovedStatus == '1') {
                        apro = "<td></td><td></td>";
                        status = "Pending by BUH/GM";
                    }
                    else if (msg[i].BUH_ApprovedStatus == 2 && msg[i].SM_ApprovedStatus == '1') {
                        apro = "<td></td><td></td>";
                        status = "Rejected by BUH";
                    }
                    else if (msg[i].BUH_ApprovedStatus == 1 && msg[i].SM_ApprovedStatus == '1') {
                        apro = "<td></td><td></td>";
                        status = "Approved by BUH";
                    }
                    else if (msg[i].SM_ApprovedStatus == 2 && (msg[i].BUH_ApprovedStatus == '' || msg[i].BUH_ApprovedStatus == '0')) {
                        apro = "<td></td><td></td>";
                        status = "Rejected by SM";
                    }
                    else if (msg[i].SM_ApprovedStatus == 1) {
                        apro = "<td></td><td></td>";
                        status = "Approved by SM";
                    }
                    else {
                        apro = "<td><a onClick=\"oGrid_DoctorRemoveApprove('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Verify</a><input type='checkbox' name='checkboxes' onclick='setDoctorRemoveRejectFalse(event);' class='approveCheckBoxForDoctorRemoveApprove' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-date='" + msg[i].RequestDate + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>" +
                        "<td><a onClick=\"oGrid_DoctorRemoveRejected('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Reject</a><input type='checkbox' name='checkboxes' onclick='setDoctorRemoveApproveFalse(event);' class='approveCheckBoxForDoctorRemoveReject' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-date='" + msg[i].RequestDate + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>";
                        status = "Pending by SM";
                    }
                    if (msg[i].VerifiedByAdmin == 'Rejected') {
                        apro = "<td></td><td></td>";
                        status = "Rejected By Admin";
                    }
                    else if (msg[i].VerifiedByAdmin == 'Verified') {
                        apro = "<td></td><td></td>";
                        status = "Verified By Admin";
                    }
                    val = "<tr>" +
                    "<td>" + status + "</td>" +
                    "<td>" + msg[i].TeamName + "</td>" +
                    "<td>" + msg[i].Region + "</td>" +
                    "<td>" + msg[i].District + "</td>" +
                    "<td>" + msg[i].Territory + "</td>" +
                    "<td>" + msg[i].EmployeeName + "</td>" +
                    "<td>" + msg[i].DoctorCode + "</td>" +
                    "<td>" + msg[i].DoctorName + "</td>" +
                    "<td>" + msg[i].Designation + "</td>" +
                    "<td>" + msg[i].Speciality + "</td>" +
                    "<td>" + msg[i].Qualification + "</td>" +
                    "<td>" + msg[i].ClassName + "</td>" +
                    "<td>" + msg[i].Frequency + "</td>" +
                    "<td>" + msg[i].City + "</td>" +
                        "<td>" + msg[i].Address1 + "</td>" +
                        //----------------------------------- Addresss ---------------------------------------------

                        "<td>" + msg[i].Address2 + "</td>" +
                        "<td>" + msg[i].Address3 + "</td>" +
                        "<td>" + msg[i].Address4 + "</td>" +
                        "<td>" + msg[i].Address5 + "</td>" +
                   //----------------------------------- End ---------------------------------------------------------
                    "<td>" + msg[i].DistributorName + "</td>" +
                    "<td>" + msg[i].BrickCode + "</td>" +
                    "<td>" + msg[i].BrickName + "</td>" +
                    "<td>" + msg[i].RequestDate + "</td>" +
                    "<td>" + " <a href='#' class='buttonlink '  onclick='locationCompare(\"" + msg[i].pLatitude + "\",\""
                    + msg[i].pLongitude + "\",\"" + msg[i].Address + "\");return false'>location</a> " + "</td>" + apro + "</tr></tbody>";
                    $('#valuesRemove').append(val);
                }
            }
            $("#grid-basicRemove").DataTable({
                responsive: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                }]
            });
        }
        else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'rl2') {
            $('#btnApproveRemoveAll').show();
            $('#btnRejectRemoveAll').show();
            $("#griddivRemove").empty();
            $("#griddivRemove").append("<table id='grid-basicRemove' class='table table-striped table-bordered table-hover column-options' style='width:100%;' style='width:100%;'></table>");
            $("#grid-basicRemove").empty();
            $("#grid-basicRemove").append("<thead>" +
                                "<tr style='background-color: #217ebd;color: white;'>" +
                                "<th>Status</th>" +
                                "<th>Team</th>" +
                                "<th>Region</th>" +
                                "<th>District</th>" +
                                "<th>Territory</th>" +
                                "<th>Employee Name</th>" +
                                "<th>Dr Code</th>" +
                                "<th>Dr Name</th>" +
                                "<th>Designation</th>" +
                                "<th>Speciality</th>" +
                                "<th>Qualification</th>" +
                                "<th>Dr Class</th>" +
                                "<th>Visist Frequency</th>" +
                                "<th>Dr City</th>" +
                "<th>Dr Address</th>" +
                //---------------------- Adresss ---------------------------------------------
                "<th>Dr Address2</th>" +
                "<th>Dr Address3</th>" +
                "<th>Dr Address4</th>" +
                "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------
                                "<th>Distributor Name</th>" +
                                "<th>Dist Brick ID</th>" +
                                "<th>Dist Brick Name</th>" +
                                "<th>Create Date</th>" +
                                "<th>Location</th>" +
                                "<th data-column-id='Approve'>Approve<div style='margin-left: 15px;margin-top: 2px;'><input id='CheckBoxCheck' type='checkbox' name='ApproveAllForDoctorRemoveApprove' onClick=\"SelectAllApproveCheckBoxesDoctorRemoveApprove();\"></div></th> " +
                                "<th data-column-id='Reject'>Reject<div style='margin-left: 15px;margin-top: 2px;'><input type='checkbox' name='ApproveAllForDoctorRemoveReject' onClick=\"SelectAllApproveCheckBoxesForDoctorRemoveReject();\"></div></th> " +
                                "</tr>" +
                                "</thead>" +
                                "<tbody id='valuesRemove'>");
            var val = '';
            if (msg.length > 0) {
                for (var i = 0; i < msg.length ; i++) {
                    if (msg[i].VerifiedByAdmin == 'Rejected') {
                        apro = "<td></td><td></td>";
                        status = "Rejected By Admin";
                    }
                    else if (msg[i].VerifiedByAdmin == 'Verified') {
                        apro = "<td></td><td></td>";
                        status = "Verified By Admin";
                    }
                    else {
                        apro = "<td><a onClick=\"oGrid_DoctorRemoveApprove('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Verify</a><input type='checkbox' name='checkboxes' onclick='setDoctorRemoveRejectFalse(event);' class='approveCheckBoxForDoctorRemoveApprove' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-date='" + msg[i].RequestDate + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>" +
                        "<td><a onClick=\"oGrid_DoctorRemoveRejected('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Reject</a><input type='checkbox' name='checkboxes' onclick='setDoctorRemoveApproveFalse(event);' class='approveCheckBoxForDoctorRemoveReject' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-date='" + msg[i].RequestDate + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>";
                        status = "Pending by BUH/GM";
                    }
                    val = "<tr>" +
                    "<td>" + status + "</td>" +
                    "<td>" + msg[i].TeamName + "</td>" +
                    "<td>" + msg[i].Region + "</td>" +
                    "<td>" + msg[i].District + "</td>" +
                    "<td>" + msg[i].Territory + "</td>" +
                    "<td>" + msg[i].EmployeeName + "</td>" +
                    "<td>" + msg[i].DoctorCode + "</td>" +
                    "<td>" + msg[i].DoctorName + "</td>" +
                    "<td>" + msg[i].Designation + "</td>" +
                    "<td>" + msg[i].Speciality + "</td>" +
                    "<td>" + msg[i].Qualification + "</td>" +
                    "<td>" + msg[i].ClassName + "</td>" +
                    "<td>" + msg[i].Frequency + "</td>" +
                    "<td>" + msg[i].City + "</td>" +
                        "<td>" + msg[i].Address + "</td>" +
                        //----------------------------------- Addresss ---------------------------------------------

                        "<td>" + msg[i].Address2 + "</td>" +
                        "<td>" + msg[i].Address3 + "</td>" +
                        "<td>" + msg[i].Address4 + "</td>" +
                        "<td>" + msg[i].Address5 + "</td>" +
                   //----------------------------------- End ---------------------------------------------------------
                    "<td>" + msg[i].DistributorName + "</td>" +
                    "<td>" + msg[i].BrickCode + "</td>" +
                    "<td>" + msg[i].BrickName + "</td>" +
                    "<td>" + msg[i].RequestDate + "</td>" +
                    "<td>" + " <a href='#' class='buttonlink '  onclick='locationCompare(\"" + msg[i].pLatitude + "\",\""
                    + msg[i].pLongitude + "\",\"" + msg[i].Address + "\");return false'>location</a> " + "</td>" +
                    apro + "</tr></tbody>";
                    $('#valuesRemove').append(val);
                }
            }
            $("#grid-basicRemove").DataTable({
                responsive: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                }]
            });
        }
        else if (CurrentUserRole == 'Admin' || CurrentUserRole == 'admin') {
            $('#btnApproveRemoveAll').show();
            $('#btnRejectRemoveAll').show();
            $("#griddivRemove").empty();
            $("#griddivRemove").append("<table id='grid-basicRemove' class='table table-striped table-bordered table-hover column-options' style='width:100%;' style='width:100%;'></table>");
            $("#grid-basicRemove").empty();
            $("#grid-basicRemove").append("<thead>" +
                                "<tr style='background-color: #217ebd;color: white;'>" +
                                "<th>Status</th>" +
                                "<th>Team</th>" +
                                "<th>Region</th>" +
                                "<th>District</th>" +
                                "<th>Territory</th>" +
                                "<th>Employee Name</th>" +
                                "<th>Dr Code</th>" +
                                "<th>Dr Name</th>" +
                                "<th>Designation</th>" +
                                "<th>Speciality</th>" +
                                "<th>Qualification</th>" +
                                "<th>Dr Class</th>" +
                                "<th>Visist Frequency</th>" +
                                "<th>Dr City</th>" +
                "<th>Dr Address</th>" +
                //---------------------- Adresss ---------------------------------------------
                "<th>Dr Address2</th>" +
                "<th>Dr Address3</th>" +
                "<th>Dr Address4</th>" +
                "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------
                                "<th>Distributor Name</th>" +
                                "<th>Dist Brick ID</th>" +
                                "<th>Dist Brick Name</th>" +
                                "<th>Create Date</th>" +
                                "<th>Location</th>" +
                                "<th data-column-id='Approve'>Approve<div style='margin-left: 15px;margin-top: 2px;'><input id='CheckBoxCheck' type='checkbox' name='ApproveAllForDoctorRemoveApprove' onClick=\"SelectAllApproveCheckBoxesDoctorRemoveApprove();\"></div></th> " +
                                "<th data-column-id='Reject'>Reject<div style='margin-left: 15px;margin-top: 2px;'><input type='checkbox' name='ApproveAllForDoctorRemoveReject' onClick=\"SelectAllApproveCheckBoxesForDoctorRemoveReject();\"></div></th> " +
                                "</tr>" +
                                "</thead>" +
                                "<tbody id='valuesRemove'>");
            var val = '';
            if (msg.length > 0) {
                for (var i = 0; i < msg.length ; i++) {
                    if (msg[i].VerifiedByDSM == 'Pending' && msg[i].VerifiedBySM == 'Pending' && msg[i].VerifiedByBUH == 'Pending') {
                        status = "Pending By DSM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Pending' && msg[i].VerifiedByBUH == 'Pending') {
                        status = "Pending By SM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Pending') {
                        status = "Pending By BUH/GM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Rejected') {
                        status = "Rejected By DSM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Rejected') {
                        status = "Rejected By SM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Rejected') {
                        status = "Rejected By BUH/GM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Verified' && msg[i].VerifiedBySM == 'Verified' && msg[i].VerifiedByBUH == 'Verified') {
                        status = "Verified By BUH/GM";
                    }
                    else if (msg[i].VerifiedByDSM == 'Pending' && msg[i].VerifiedBySM == 'Pending' && msg[i].VerifiedByBUH == 'Pending' && msg[i].VerifiedByAdmin == 'Rejected') {
                        status = "Rejected By Admin";
                    }
                    val = "<tr>" +
                    "<td>" + status + "</td>" +
                    "<td>" + msg[i].TeamName + "</td>" +
                    "<td>" + msg[i].Region + "</td>" +
                    "<td>" + msg[i].District + "</td>" +
                    "<td>" + msg[i].Territory + "</td>" +
                    "<td>" + msg[i].EmployeeName + "</td>" +
                    "<td>" + msg[i].DoctorCode + "</td>" +
                    "<td>" + msg[i].DoctorName + "</td>" +
                    "<td>" + msg[i].Designation + "</td>" +
                    "<td>" + msg[i].Speciality + "</td>" +
                    "<td>" + msg[i].Qualification + "</td>" +
                    "<td>" + msg[i].ClassName + "</td>" +
                    "<td>" + msg[i].Frequency + "</td>" +
                    "<td>" + msg[i].City + "</td>" +
                        "<td>" + msg[i].Address + "</td>" +
                        //----------------------------------- Addresss ---------------------------------------------

                        "<td>" + msg[i].Address2 + "</td>" +
                        "<td>" + msg[i].Address3 + "</td>" +
                        "<td>" + msg[i].Address4 + "</td>" +
                        "<td>" + msg[i].Address5 + "</td>" +
                   //----------------------------------- End ---------------------------------------------------------
                    "<td>" + msg[i].DistributorName + "</td>" +
                    "<td>" + msg[i].BrickCode + "</td>" +
                    "<td>" + msg[i].BrickName + "</td>" +
                    "<td>" + msg[i].RequestDate + "</td>" +
                    "<td>" + " <a href='#' class='buttonlink '  onclick='locationCompare(\"" + msg[i].pLatitude + "\",\""
                    + msg[i].pLongitude + "\",\"" + msg[i].Address + "\");return false'>location</a> " + "</td>" +
                    "<td><a onClick=\"oGrid_DoctorRemoveApprove('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Verify</a><input type='checkbox' name='checkboxes' onclick='setDoctorRemoveRejectFalse(event);' class='approveCheckBoxForDoctorRemoveApprove' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-date='" + msg[i].RequestDate + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>" +
                    "<td><a onClick=\"oGrid_DoctorRemoveRejected('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;' >Reject</a><input type='checkbox' name='checkboxes' onclick='setDoctorRemoveApproveFalse(event);' class='approveCheckBoxForDoctorRemoveReject' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-date='" + msg[i].RequestDate + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].ID + "'></td>" +
                    "</tr></tbody>";
                    $('#valuesRemove').append(val);
                }
            }
            $("#grid-basicRemove").DataTable({
                responsive: true,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                }]
            });
        }
    }
    else {
        $('#btnApproveRemoveAll').hide();
        $('#btnRejectRemoveAll').hide();
        $("#griddivRemove").empty();
        $("#griddivRemove").append("<table id='grid-basicRemove' class='table table-striped table-bordered table-hover column-options' style='width:100%;'></table>");
        $("#grid-basicRemove").empty();
        $("#grid-basicRemove").append("<thead>" +
                            "<tr style='background-color: #217ebd;color: white;'>" +
                            "<th>Status</th>" +
                            "<th>Team</th>" +
                            "<th>Region</th>" +
                            "<th>District</th>" +
                            "<th>Territory</th>" +
                            "<th>Employee Name</th>" +
                            "<th>Dr Code</th>" +
                            "<th>Dr Name</th>" +
                            "<th>Designation</th>" +
                            "<th>Speciality</th>" +
                            "<th>Qualification</th>" +
                            "<th>Dr Class</th>" +
                            "<th>Visist Frequency</th>" +
                            "<th>Dr City</th>" +
            "<th>Dr Address</th>" +
            //---------------------- Adresss ---------------------------------------------
            "<th>Dr Address2</th>" +
            "<th>Dr Address3</th>" +
            "<th>Dr Address4</th>" +
            "<th>Dr Address5</th>" +
          //---------------------- End ---------------------------------------------
                            "<th>Distributor Name</th>" +
                            "<th>Dist Brick ID</th>" +
                            "<th>Dist Brick Name</th>" +
                            "<th>Create Date</th>" +
                            "<th>Location</th>" +
                            "<th>Status</th> " +
                            "<th data-column-id='Approve'>Approve</th> " +
                            "<th data-column-id='Reject'>Reject</th> " +
                            "</tr>" +
                            "</thead>" +
                            "<tbody id='valuesRemove'>");
        $("#grid-basicRemove").DataTable({
            responsive: true,
            "columnDefs": [{
                "targets": 'no-sort',
                "orderable": false,
            }]
        });

    }

}

function SelectAllApproveCheckBoxesDoctorRemoveApprove() {

    if ($('input[name="ApproveAllForDoctorRemoveApprove"]').is(':checked')) {
        $('.approveCheckBoxForDoctorRemoveApprove').prop('checked', true);
        $('.approveCheckBoxForDoctorRemoveReject').prop('checked', false);
        $('input[name="ApproveAllForDoctorRemoveReject"]').prop('checked', false);
    } else {
        $('.approveCheckBoxForDoctorRemoveApprove').prop('checked', false);
    }
}

function SelectAllApproveCheckBoxesForDoctorRemoveReject() {

    if ($('input[name="ApproveAllForDoctorRemoveReject"]').is(':checked')) {
        $('.approveCheckBoxForDoctorRemoveReject').prop('checked', true);
        $('.approveCheckBoxForDoctorRemoveApprove').prop('checked', false);
        $('input[name="ApproveAllForDoctorRemoveApprove"]').prop('checked', false);
    } else {
        $('.approveCheckBoxForDoctorRemoveReject').prop('checked', false);
    }
}

function setDoctorRemoveRejectFalse(e) {

    if (e.target.checked) {
        e.target.parentElement.nextSibling.lastChild.checked = false;
    }
}

function setDoctorRemoveApproveFalse(e) {

    if (e.target.checked) {
        e.target.parentElement.previousSibling.lastChild.checked = false;
    }
}

function DoctorRemoveApproveAll() {
    var checkedboxes = [], ids = [], MonthDate = [];
    checkedboxes = document.querySelectorAll('.approveCheckBoxForDoctorRemoveApprove:checked');

    if (checkedboxes.length > 0) {
        for (var i = 0; i < checkedboxes.length; i++) {

            ids.push(checkedboxes[i].value);
            docIds.push(checkedboxes[i].attributes['data-docId'].value);
            MonthDate.push(checkedboxes[i].attributes['data-date'].value);
        }
    }
    else {
        swal(
            'alert!',
            'You must select atleast one option!',
            'warning'
        )
        return false;
    }

    swal({
        title: "Approve All",
        text: "Are you sure you want to Remove all the selected requests?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, All Approve it!",
        cancelButtonText: "No, Cancel !",
        closeOnConfirm: false,
        closeOnCancel: false
    },
function (isConfirm) {
    if (isConfirm) {

        var mydata = "{'id':'" + ids.toString() + "','docid':'" + docIds.toString() + "','empid':'" + EmployeeId + "','date':'" + MonthDate + "',Status:'1','CurrentUserRole':'" + CurrentUserRole + "'}";

        $('#hdnMode').val("R");
        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/DoctorRemoveApproveThis",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                sweetAlert('success', 'All Requests has been approved!', 'success');
                FillGridRemove(1);
            },
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: false,
            cache: false
        });

        //  swal("Deleted!", "Your imaginary file has been deleted.", "success");
    } else {
        swal("Cancelled", "Request has been cancelled:)", "error");
    }
});
}

function DoctorRemoveForReject() {
    var checkedboxes = [], ids = [], MonthDate = [];
    checkedboxes = document.querySelectorAll('.approveCheckBoxForDoctorRemoveReject:checked');

    if (checkedboxes.length > 0) {
        for (var i = 0; i < checkedboxes.length; i++) {

            ids.push(checkedboxes[i].value);
            docIds.push(checkedboxes[i].attributes['data-docId'].value);
            MonthDate.push(checkedboxes[i].attributes['data-date'].value);
        }
    }
    else {
        swal(
            'alert!',
            'You must select atleast one option!',
            'warning'
        )
        return false;
    }

    swal({
        title: "Reject All",
        text: "Are you sure you want to Reject all the selected requests?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, All Reject it!",
        cancelButtonText: "No, Cancel !",
        closeOnConfirm: false,
        closeOnCancel: false
    },
function (isConfirm) {
    if (isConfirm) {

        var mydata = "{'id':'" + ids.toString() + "','docid':'" + docIds.toString() + "','empid':'" + EmployeeId + "','date':'" + MonthDate + "',Status:'2','CurrentUserRole':'" + CurrentUserRole + "'}";

        $('#hdnMode').val("R");
        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/DoctorRemoveRejectThis",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                sweetAlert('success', 'All selected requests have been Rejected!', 'success');
                FillGridRemove(1);
            },
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: false,
            cache: false
        });

        //  swal("Deleted!", "Your imaginary file has been deleted.", "success");
    } else {
        swal("Cancelled", "Request has been cancelled:)", "error");
    }
});
}

function oGrid_DoctorRemoveApprove(ids) {
    // $old('#divApproveConfirmation').jqmShow();

    //  $('#divApproveConfirmation').find('#btnApproveYes').attr({ '_id': id, '_docid': docid });
    swal({
        title: "Are you sure?",
        text: "Are you sure you want to Remove the selected request?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Approve it!",
        cancelButtonText: "No, cancel Please!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
function (isConfirm) {
    if (isConfirm) {

        var mydata = "{'id':'" + ids.toString() + "','docid':'" + "0" + "','empid':'" + EmployeeId + "','date':'" + MonthDate + "',Status:'1','CurrentUserRole':'" + CurrentUserRole + "'}";

        $('#hdnMode').val("R");
        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/DoctorRemoveApproveThis",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                sweetAlert('success', 'All Requests has been approved!', 'success');
                FillGridRemove(1);
            },
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: false,
            cache: false
        });

        //  swal("Deleted!", "Your imaginary file has been deleted.", "success");
    } else {
        swal("Cancelled", "Request has been cancelled:)", "error");
    }
});
}

function oGrid_DoctorRemoveRejected(ids) {
    swal({
        title: "Reject",
        text: "Are you sure you want to Reject the selected request?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Reject it!",
        cancelButtonText: "No, cancel Please!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
    function (isConfirm) {
        if (isConfirm) {
            var mydata = "{'id':'" + ids.toString() + "','docid':'" + "0" + "','empid':'" + EmployeeId + "','date':'" + MonthDate + "',Status:'2','CurrentUserRole':'" + CurrentUserRole + "'}";

            $('#hdnMode').val("R");
            $.ajax({
                type: "POST",
                url: "DoctorsService.asmx/DoctorRemoveRejectThis",
                data: mydata,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    sweetAlert('success', 'All selected requests have been Rejected!', 'success');
                    FillGridRemove(1);
                },
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                error: onError,
                async: false,
                cache: false
            });
        } else {
            swal("Cancelled", "Request has been cancelled:)", "error");
        }
    });
}

//#endregion 

function btnApproveClicked() {

    var pkid = $(this).attr('_id');
    var docid = $(this).attr('_docid');
    var date = $(this).attr('_date');
    var mydata = "{'id':'" + pkid + "','docid':'" + docid + "','empid':'" + EmployeeId + "','date':'" + date + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/ApproveThis",
        data: mydata,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            FillGrid(1);
            FillGridRequest(1);
            FillGridRemove(1);
            $old('#divApproveConfirmation').jqmHide();
            $old('#ApproveOkDivmessage').jqmShow();
            $('#ApproveOkDivmessage').find('#hlabmsg').text("Request has been approved!");
        },
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: onError,
        async: false,
        cache: false
    });

}

function btnRequestNOClicked() {
    $old('#divRequestApproveConfirmation').jqmHide();
}

function btnRequestClicked() {

    var pkid = $(this).attr('_id');
    var docid = $(this).attr('_docid');
    var date = $(this).attr('_date');
    var mydata = "{'id':'" + pkid + "','docid':'" + docid + "','empid':'" + EmployeeId + "','date':'" + date + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorAddtoListBrickAndDistributors.asmx/ApproveThis",
        data: mydata,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            FillGrid(1);
            FillGridRequest(1);
            FillGridRemove(1);
            $old('#divRequestApproveConfirmation').jqmHide();
            $old('#RequestOkDivmessage').jqmShow();
            $('#RequestOkDivmessage').find('#hlabmsg2').text("Request has been approved!");
        },
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: onError,
        async: false,
        cache: false
    });

}

function btnApprovedOkClicked() {
    $old('#ApproveOkDivmessage').jqmHide();
}

function btnUpdateApprovedOkClicked() {
    $old('#ApproveUpdateOkDivmessage').jqmHide();
}

function btnRemoveOkClicked() {
    $old('#RemoveOkDivmessage').jqmHide();
}

function btnRRequestOkClicked() {
    $old('#RequestOkDivmessage').jqmHide();
}

function btnApproveNoClicked() {
    $old('#divApproveConfirmation').jqmHide();
}

function btnRemoveNoClicked() {
    $old('#divRemoveConfirmation').jqmHide();
}

function btnAdminRemoveNoClicked() {
    $old('#divAdminRemoveConfirmation').jqmHide();
}

function oGrid_AddToList(docid) {
    debugger
    $("#frequency").numeric(false, function () { alert("Integers only"); this.value = ""; this.focus(); });

    $old('#divClassIdAndFrequency').jqmShow();


    //$old('#divAddtoListConfirmation').jqmShow();
    $('#divClassIdAndFrequency').find('#btnDetailsSubmit').attr('_docid', docid);

}

//-------------------------------------- On Edit Click -----------------------------------------------------------------------//


function oGrid_AddToListUpdate(docid, i, BrickID, Distributor, DistributorName, BrickName, ReqStatus, CityID, frequency, ClassId, ClassName, CityName) {
//debugger
    $("#frequencyUpdate").numeric(false, function () { alert("Integers only"); this.value = ""; this.focus(); });

    if (ReqStatus == "Plan and Call Exist" || ReqStatus == "Call Exist" || ReqStatus == "Plan Exist") {
        document.getElementById("frequencyUpdate").disabled = false;
        document.getElementById("singleClassUpdate").disabled = false;
    }
    else {
        document.getElementById("frequencyUpdate").disabled = false;
        document.getElementById("singleClassUpdate").disabled = false;
    }

    RequestStatus = ReqStatus;

    if (BrickID != '') {
        //$('#singleBrickUpdate').disabled = true;
    document.getElementById("singleBrickUpdate").disabled = false;
    SelectBrickID = BrickID;
    SelectBrickName = BrickName;
    $('#CityID').val(CityID);
    $('#CityName').val(CityName);
        //$('#singleBrickUpdate').val(BrickID);
    }
    else {
        document.getElementById("singleBrickUpdate").disabled = false;
        //var Value = "Select Brick";
        //var A = document.getElementById('singleBrickUpdate').innerHTML = null;
        //var B = A;
        //$("#singleBrickUpdate").append("<option value='" + -1 + "' selected='selected'>" + Value + "</option>");
        SelectBrickID = '';
        SelectBrickName = '';
        $('#CityID').val('');
        $('#CityName').val('');
    }

    if (Distributor != '') {
        //$('#DistributorUpdate').disabled = true;
    document.getElementById("DistributorUpdate").disabled = false;
    SelectDistributorID = Distributor;
    SelectDistributorName = DistributorName;
    }
    else {
        document.getElementById("DistributorUpdate").disabled = false;
        SelectDistributorID = '';
        SelectDistributorName = '';
    }
    //brickIDddl = BrickID;

    if (ClassId != '' && ClassName != '') {
        SelectClassId = ClassId;
        SelectClassName = ClassName;
        $("#singleClass").val(SelectClassId);
        $("#multipleClass").val(SelectClassId);
        $("#singleClassUpdate").val(SelectClassId);
        $('#frequencyUpdate').val(frequency);
    }
    else {
        SelectClassId = '';
        SelectClassName = '';
        $('#frequencyUpdate').val('');
    }

    if (frequency != '') {
        Selectfrequency = frequency;
    }
    else {
        Selectfrequency = '';
    }

    $old('#divClassIdAndFrequencyUpdate').jqmShow();

    //$old('#divAddtoListConfirmation').jqmShow();
    $('#divClassIdAndFrequencyUpdate').find('#btnDetailsUpdate').attr('_docid', docid);
}




function btnDetailsSubmitClicked() {
    debugger
    var thisbtn = $(this);
    var docid = $(this).attr('_docid');
    var classID = $('#singleClass').val();
    var frequency = $('#frequency').val();


    if (classID != -1 && frequency != "") {

        if (frequency > 5 || frequency < 1) {
            $(this).parents('.divTable').find('.requireError').show().html('<center>Select Frequency between 1 to 5</center>');
            //alert('Select Frequency between 1 to 5');
            return false;
        }

        var mydata = "{'docid':'" + docid + "','empid':'" + EmployeeId + "','classId':'" + classID + "','frequency':'" + frequency + "'}";

        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/AddTolist",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                $(thisbtn).parents('.divTable').find('.requireError').hide();
                $(thisbtn).attr('_docid', '');
                $(thisbtn).parents('.divTable').find('#singleClass').val('-1');
                $(thisbtn).parents('.divTable').find('#frequency').val('');
                $old('#divClassIdAndFrequency').jqmHide();

                if (data.d == "Already Exist!") {
                    $old('#divAddtoListConfirmation').jqmHide();
                    $old('#AddListOkDivmessage').jqmShow();
                    $('#AddListOkDivmessage').find('#hlabmsg').text("Dr. already exists");
                }
                else {
                    $old('#divAddtoListConfirmation').jqmHide();
                    $old('#AddListOkDivmessage').jqmShow();
                    $('#AddListOkDivmessage').find('#hlabmsg').text("Your request has been sent for approval!");
                    Fillmydocs(EmployeeId);
                    $('#inlistdivgrid').empty();
                }
                FillGrid(EmployeeId);
                FillGridRequest(EmployeeId);
                FillGridRemove(EmployeeId);
                //FillUnlistdocs(EmployeeId, $('#ddlcity').val());
                FillUnlistdocs(EmployeeId, $('#ddlSpeciality').val(), $('#ddlRelatedCity option:selected').text());
            },
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: false,
            cache: false
        });
    }
    else {
        $(this).parents('.divTable').find('.requireError').show();
    }

}


//----------------------------------------------------------- Submittt Btn --------------------------------------------------------------//


function btnDetailsUpdateClicked() {
    debugger
    var thisbtn = $(this);
    var docid = $(this).attr('_docid');
    var classID = $('#singleClassUpdate').val();
    var singleBrick = $('#singleBrickUpdate').val();
    var Distributer = $('#DistributorUpdate').val();
    var frequency = $('#frequencyUpdate').val();
    var CityID = $('#CityID').val();
    var Date = $('#stdate').val();
    //------------------------------------- For Address ------------------------------------
    var Address = $('#Address2').val();
    //---------------------------------------- End -----------------------------------------
   if (classID != -1 && frequency != "" && classID != "") {

        if (frequency > 5 || frequency < 1) {
            $(this).parents('.divTableUpdate').find('.requireErrorUpdate').show().html('<center>Select Frequency between 1 to 5</center>');
            //alert('Select Frequency between 1 to 5');
            return false;
        }

       var mydata = "{'multipleDocIDs':'" + docid + "','multieReqStatus':'" + RequestStatus + "','empid':'" + EmployeeId + "','Date':'" + Date + "','classId':'" + classID + "','BricK':'" + singleBrick + "','City': '" + CityID + "','Distributor':'" + Distributer + "','frequency':'" + frequency + "','Address':'" + Address + "'}";

        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/MultipleUpdateTolist",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                $(thisbtn).parents('.divTableUpdate').find('.requireErrorUpdate').hide();
                $(thisbtn).attr('_docid', '');
                $(thisbtn).parents('.divTableUpdate').find('#singleClassUpdate').val('-1');
                $(thisbtn).parents('.divTableUpdate').find('#singleBrickUpdate').val('-1');
                $(thisbtn).parents('.divTableUpdate').find('#DistributorUpdate').val('-1');
                $(thisbtn).parents('.divTableUpdate').find('#frequencyUpdate').val('');
                $(thisbtn).parents('.divTableUpdate').find('#CityID').val('');
                $old('#divClassIdAndFrequencyUpdate').jqmHide();

                if (data.d == "Already Exist!") {
                    $old('#divAddtoListConfirmation').jqmHide();
                    $old('#AddListOkDivmessage').jqmShow();
                    $('#AddListOkDivmessage').find('#hlabmsg').text("Dr. already exists");
                }
                else {
                    $old('#divAddtoListConfirmation').jqmHide();
                    $old('#AddListOkDivmessage').jqmShow();
                    $('#AddListOkDivmessage').find('#hlabmsg').text("Your request has been sent for approval!");
                    Fillmydocs(EmployeeId);
                    $('#inlistdivgrid').empty();
                }
                FillGrid(EmployeeId);
                FillGridRequest(EmployeeId);
                FillGridRemove(EmployeeId);
                //FillUnlistdocs(EmployeeId, $('#ddlcity').val());
                FillUnlistdocs(EmployeeId, $('#ddlSpeciality').val(), $('#ddlRelatedCity option:selected').text());
                $(thisbtn).parents('.divTableUpdate').find('#Address2').val('');
            },
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: false,
            cache: false
          
        });
    }
    else {
        $(this).parents('.divTableUpdate').find('.requireErrorUpdate').show();
    }

}

function btnDetailsUpdateRequestClicked() {
    var thisbtn = $(this);
    var docid = $(this).attr('_docid');
    var classID = $('#singleClassUpdate').val();
    var singleBrick = $('#singleBrickUpdate').val();
    var Distributer = $('#DistributorUpdate').val();
    var frequency = $('#frequencyUpdate').val();

    if (classID != -1 && singleBrick != -1 && Distributer != -1 && frequency != "") {

        if (frequency > 5 || frequency < 1) {
            $(this).parents('.divTableUpdate').find('.requireErrorUpdate').show().html('<center>Select Frequency between 1 to 5</center>');
            //alert('Select Frequency between 1 to 5');
            return false;
        }

        var mydata = "{'docid':'" + docid + "','empid':'" + EmployeeId + "','classId':'" + classID + "','singleBrick':'" + singleBrick + "','Distributer':'" + Distributer + "','frequency':'" + frequency + "'}";

        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/AddTolistUpdate",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                $(thisbtn).parents('.divTableUpdate').find('.requireErrorUpdate').hide();
                $(thisbtn).attr('_docid', '');
                $(thisbtn).parents('.divTableUpdate').find('#singleClassUpdate').val('-1');
                $(thisbtn).parents('.divTableUpdate').find('#singleBrickUpdate').val('-1');
                $(thisbtn).parents('.divTableUpdate').find('#DistributorUpdate').val('-1');
                $(thisbtn).parents('.divTableUpdate').find('#frequencyUpdate').val('');
                $old('#divClassIdAndFrequencyUpdate').jqmHide();

                //if (data.d == "Already Exist!") {
                //    $old('#divAddtoListConfirmation').jqmHide();
                //    $old('#AddListOkDivmessage').jqmShow();
                //    $('#AddListOkDivmessage').find('#hlabmsg').text("Dr. already exists");
                //}
                //else {
                //    $old('#divAddtoListConfirmation').jqmHide();
                //    $old('#AddListOkDivmessage').jqmShow();
                //    $('#AddListOkDivmessage').find('#hlabmsg').text("Your request has been sent for approval!");
                //}
                FillGrid(EmployeeId);
                FillGridRequest(EmployeeId);
                FillGridRemove(EmployeeId);
                //FillUnlistdocs(EmployeeId, $('#ddlcity').val());
                FillUnlistdocs(EmployeeId, $('#ddlSpeciality').val(), $('#ddlRelatedCity option:selected').text());
            },
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: false,
            cache: false
        });
    }
    else {
        $(this).parents('.divTableUpdate').find('.requireErrorUpdate').show();
    }

}

function btnAddListClicked() {

    //var docid = $(this).attr('_docid');

    //var mydata = "{'docid':'" + docid + "','empid':'" + EmployeeId + "'}";

    //$.ajax({
    //    type: "POST",
    //    url: "DoctorsService.asmx/AddTolist",
    //    data: mydata,
    //    contentType: "application/json; charset=utf-8",
    //    success: function (data) {

    //        if (data.d == "Already Exist!") {
    //            $old('#divAddtoListConfirmation').jqmHide();
    //            $old('#AddListOkDivmessage').jqmShow();
    //            $('#AddListOkDivmessage').find('#hlabmsg').text("Dr. already exists");
    //        }
    //        else {
    //            $old('#divAddtoListConfirmation').jqmHide();
    //            $old('#AddListOkDivmessage').jqmShow();
    //            $('#AddListOkDivmessage').find('#hlabmsg').text("Dr attached and In Process for Approval...!");
    //        }
    //        FillGrid(EmployeeId);
    //        FillUnlistdocs(EmployeeId, $('#ddlcity').val());
    //    },
    //    beforeSend: startingAjax,
    //    complete: ajaxCompleted,
    //    error: onError,
    //    async: false,
    //    cache: false
    //});

}

function btnAddListOkClicked() {
    $old('#AddListOkDivmessage').jqmHide();
}

function btnAddListNoClicked() {
    $old('#AddListOkDivmessage').jqmHide();
}

function btnDetailsCancelClicked() {
    $(this).parents('.divTable').find('.requireError').hide();
    $(this).attr('_docid', '');
    $(this).parents('.divTable').find('#singleClass').val('-1');
    $(this).parents('.divTable').find('#frequency').val('');
    $old('#divClassIdAndFrequency').jqmHide();
}

function btnDetailsCancel1Clicked() {
    $(this).parents('.divTableUpdate').find('.requireErrorUpdate').hide();
    $(this).attr('_docid', '');
    $(this).parents('.divTableUpdate').find('#singleClassUpdate').val('-1');
    $(this).parents('.divTableUpdate').find('#singleBrickUpdate').val('-1');
    $(this).parents('.divTableUpdate').find('#DistributorUpdate').val('-1');
    $(this).parents('.divTableUpdate').find('#frequencyUpdate').val('');
    $old('#divClassIdAndFrequencyUpdate').jqmHide();
}

function specialityselectchange() {
    FillUnlistdocs(EmployeeId, $('#ddlSpeciality').val(), $('#ddlRelatedCity option:selected').text());
}

function cityselectchange() {
    FillUnlistdocs(EmployeeId, $('#ddlSpeciality').val(), $('#ddlRelatedCity option:selected').text());
}

function showAddToListButton() {

    if ($('input[name="addCheckBox"]').is(':checked')) {
        $('#addToListbtn').css('display', 'block');
    } else {
        $('#addToListbtn').css('display', 'none');
    }

}

function resetAddToList() {
    $('input[name="addCheckBox"]').prop('checked', false);
    $('#addToListbtn').css('display', 'none');
    addDocID = [];
}

//function FillUnlistdocs(empid, city) {

function addMutipleDocsList() {

    addCheckedBoxes = document.querySelectorAll('input[name=addCheckBox]:checked');

    if (addCheckedBoxes.length > 0) {
        for (var i = 0; i < addCheckedBoxes.length; i++) {

            addDocID.push(addCheckedBoxes[i].value);

        }
        addMultipleToList();
    }
    else {
        $("<div><p style='text-align: center;margin: 35px;font-size: 15px;'>Please select atleast one option.</p></div>").dialog({
            modal: true,
            resizable: false,
            title: 'Info',
            buttons: {
                'Ok': function () {
                    $(this).dialog('close');
                }
            }
        });
    }
}

function addMultipleToList() {

    $(".frequency").numeric(false, function () { alert("Integers only"); this.value = ""; this.focus(); });

    $old('#multipleClassandFrequency').jqmShow();


    //$old('#divAddtoListConfirmation').jqmShow();
    //$('#multipleClassandFrequency').find('.btnDetailsSubmit').attr('_docid', docid);s

}

function multiplebtnDetailsSubmitClicked() {
    var thisbtn = $(this);
    var classID = $('#multipleClass').val();
    var frequency = $('.frequency').val();

    if (classID != -1 && frequency != "") {
        //var mydata = "{'docid':'" + docid + "','empid':'" + EmployeeId + "','classId':'" + classID + "','frequency':'" + frequency + "'}";

        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/MultipleAddTolist",
            data: JSON.stringify({
                multipleDocIDs: addDocID.toString(),
                empid: EmployeeId,
                classId: classID,
                frequency: frequency
            }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                $(thisbtn).parents('.divTable').find('.requireError').hide();
                resetAddToList();
                $(thisbtn).parents('.divTable').find('#multipleClass').val('-1');
                $(thisbtn).parents('.divTable').find('.frequency').val('');
                $old('#multipleClassandFrequency').jqmHide();

                if (data.d == "Already Exist!") {
                    $old('#divAddtoListConfirmation').jqmHide();
                    $old('#AddListOkDivmessage').jqmShow();
                    $('#AddListOkDivmessage').find('#hlabmsg').text("Dr. already exists");
                }
                else {
                    $old('#divAddtoListConfirmation').jqmHide();
                    $old('#AddListOkDivmessage').jqmShow();
                    $('#AddListOkDivmessage').find('#hlabmsg').text("Your request has been sent for approval!");

                    Fillmydocs(EmployeeId);
                    $('#inlistdivgrid').empty();
                }
                FillGrid(EmployeeId);
                FillGridRequest(EmployeeId);
                FillGridRemove(EmployeeId);
                //FillUnlistdocs(EmployeeId, $('#ddlcity').val());
                FillUnlistdocs(EmployeeId, $('#ddlSpeciality').val(), $('#ddlRelatedCity option:selected').text());
            },
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: false,
            cache: false
        });
    }
    else {
        $(this).parents('.divTable').find('.requireError').show();
    }

}

function multiplebtnDetailsCancelClicked() {
    addDocID = [];
    $(this).parents('.divTable').find('.requireError').hide();
    $(this).parents('.divTable').find('#multipleClass').val('-1');
    $(this).parents('.divTable').find('.frequency').val('');
    $old('#multipleClassandFrequency').jqmHide();
}

function oGrid_Rejected(DoctorId, userrole) {
    //var DoctorId = $(sender).closest('tr').children().first().children().children().text();
    var text = prompt("Fill Comments", "");

    if (text != null) {

        var myData = "{'docid':'" + DoctorId + "','userrole':'" + userrole + "','comment':'" + text + "','status':'2'}";

        if (myData != "") {
            $('#hdnMode').val("R");
            $.ajax({
                type: "POST",
                url: "DoctorsService.asmx/VerifyDoctor",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccess,
                error: onError,
                cache: false
            });
        }
    }

}

function oGrid_Verify(DoctorId, userrole, empid) {
    //var DoctorId = $(sender).closest('tr').children().first().children().children().text();
    var text = prompt("Fill Comments (not mandatory to fill)", "");



    if (text != null) {
        if (userrole == 'admin') {
            var myData = "{'docid':'" + DoctorId + "','userrole':'" + userrole + "','comment':'" + text + "','status':'1','classname':'" + $('#tdclassname').text() + "','empid':'" + empid + "'}";
        }
        else {
            var myData = "{'docid':'" + DoctorId + "','userrole':'" + userrole + "','comment':'" + text + "','status':'1','classname':'','empid':" + empid + "}";
        }
        if (myData != "") {
            $('#hdnMode').val("V");
            $.ajax({
                type: "POST",
                url: "DoctorsService.asmx/VerifyDoctor",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    alert('Verified Successfully!');
                    FillGrid(empid);
                    FillGridRequest(empid);
                    FillGridRemove(empid);
                },
                error: onError,
                cache: false
            });
        }
    }

}

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
}


function downloaddoctorlist() {
    var monthlist = $("input[name*='stdate']").val();
    var zoneId = EmployeeId;

    if (zoneId != '-1') {
        CallHandler(monthlist, 'Dlist', zoneId);

    }
    else {
        alert('Zone Must be Selected');
    }
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
            $(".ddlClass").append("<option value='" + jsonObj[i].ClassId + "'>" + jsonObj[i].ClassName + "</option>");
        });
    }
}
function GetProduct() {

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetProduct",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddlProduct,
        error: onError,
        cache: false,
        async: false
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

function oGrid_Verifyinsert() {
    var text = prompt("Fill Comments", "");

    if (text != null) {

    }
}

function SelectAllApproveCheckBoxesRemove() {

    if ($('input[name="RemoveAll"]').is(':checked')) {
        $('.RemoveCheckBox').prop('checked', true);
    } else {
        $('.RemoveCheckBox').prop('checked', false);
    }
}

function btnAdminRemoveClicked() {
    var docid = $(this).attr('_docid');
    var id = $(this).attr('_id');
    var date = $(this).attr('_date');
    var mydata = "{'id':'" + id + "','docid':'" + docid + "','empid':'" + EmployeeId + "','date':'" + date + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/RemoveThis",
        data: mydata,
        contentType: "application/json; charset=utf-8",
        success: function (data) {            
            FillGrid(1);
            FillGridRequest(1);
            FillGridRemove(1);
            if (data.d == "OK") {
                $old('#divAdminRemoveConfirmation').jqmHide();
                $old('#RemoveOkDivmessage').jqmShow();
                $('#RemoveOkDivmessage').find('#hlabmsg1').text("All Removal Requests has been approved");
            }

            //$old('#divAdminRemoveConfirmation').jqmHide();
            //$old('#RemoveOkDivmessage').jqmShow();
            //$('#RemoveOkDivmessage').find('#hlabmsg1').text("All Removal Requests has been approved");
        },

        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: onError,
        async: false,
        cache: false
    });
}

function oGrid_RemoveThis(id, docid) {
    $old('#divRemoveConfirmation').jqmShow();
    $('#divRemoveConfirmation').find('#btnRemoveYes').attr({ '_id': id, '_docid': docid });
}

function oGrid_RemoveAdminThis(id, docid,date) {
    $old('#divAdminRemoveConfirmation').jqmShow();
    $('#divAdminRemoveConfirmation').find('#btnAdminRemoveYes').attr({ '_id': id, '_docid': docid, '_date': date });
}

function oGrid_AddToListRemove(docid) {

    $old('#divAddtoListConfirmation').jqmShow();

    $('#divAddtoListConfirmation').find('#btnApproveAllYes').attr('_docid', docid);
}

function removeMutipleDocsList() {

    removeDocID = [];
    reqCheckedBoxes = [];
    removeCheckedBoxes = document.querySelectorAll('input[name=RemoveCheckBox]:checked');

    if (removeCheckedBoxes.length > 0) {
        for (var i = 0; i < removeCheckedBoxes.length; i++) {

            removeDocID.push(removeCheckedBoxes[i].value);
            UpdateReqStatus.push(removeCheckedBoxes[i].attributes['data-reqid'].value);
        }
        removeMultipleToList();
    }
    else {
        $("<div><p style='text-align: center;margin: 35px;font-size: 15px;'>Please select atleast one option.</p></div>").dialog({
            modal: true,
            resizable: false,
            title: 'Info',
            buttons: {
                'Ok': function () {
                    $(this).dialog('close');
                }
            }
        });
    }
}

function removeMultipleToList() {
    //var myData = "{'Docid':'" + DoctorId + "','EmployeeId':'" + EmployeeId + "'}";

    if (removeDocID.length != 0 && EmployeeId != 0) {
        $('#hdnMode').val("R");
        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/removeMultipleDocs",
            data: JSON.stringify({
                Docids: removeDocID.toString(),
                EmployeeId: EmployeeId.toString(),
                multieReqStatus: UpdateReqStatus.toString(),
                date: $('#stdate').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //success: onSuccess,
            success: function (data) {

                if (data.d == "Call(s) exist in this month.") {
                    $old('#divAddtoListConfirmation').jqmHide();
                    $old('#AddListOkDivmessage').jqmShow();
                    $('#AddListOkDivmessage').find('#hlabmsg').text("Call(s) exist in this month.");
                    resetAddToListRemove();
                }
                else {
                    $old('#divAddtoListConfirmation').jqmHide();
                    $old('#AddListOkDivmessage').jqmShow();
                    $('#AddListOkDivmessage').find('#hlabmsg').text("Your request has been sent for approval!");

                    resetAddToListRemove();
                    Fillmydocs(EmployeeId);



                }
                FillGrid(EmployeeId);
                FillGridRequest(EmployeeId);
                FillGridRemove(EmployeeId);
            },
            error: onError,
            cache: false
        });
    }
}

function showRemoveListButton() {
    if ($('input[name="RemoveCheckBox"]').is(':checked')) {
        $('#UpdateListbtn').css('display', 'block');
    } else {
        $('#UpdateListbtn').css('display', 'none');
    }
    if ($('input[name="RemoveCheckBox"]').is(':checked')) {
        $('#removeListbtn').css('display', 'block');
    } else {
        $('#removeListbtn').css('display', 'none');
    }
}

function oGrid_RemoveToList(DoctorId) {
    $old('#divRemoveConfirmation').jqmShow();
    $('#divRemoveConfirmation').find('#btnRemoveYes').attr({ '_docid': DoctorId });
}

function btnRemoveClicked() {
    var docid = $(this).attr('_docid');

    var myData = "{'Docid':'" + docid + "','EmployeeId':'" + EmployeeId + "','date':'" + $("#stdate").val() + "'}";

    if (myData != "") {
        $('#hdnMode').val("R");
        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/RemoveDocRequest",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //success: onSuccess,   
            success: function (data) {

                if (data.d == "Call(s) exist in this month.") {
                    $old('#divRemoveConfirmation').jqmHide();
                    $old('#AddListOkDivmessage').jqmShow();
                    $('#AddListOkDivmessage').find('#hlabmsg').text("Call(s) exist in this month.");
                }
                else if (data.d == "AlreadyEixst") {
                    $old('#divRemoveConfirmation').jqmHide();
                    $old('#AddListOkDivmessage').jqmShow();
                    $('#AddListOkDivmessage').find('#hlabmsg').text("Already Eixst");
                }
                else {
                    $old('#divRemoveConfirmation').jqmHide();
                    $old('#AddListOkDivmessage').jqmShow();
                    $('#AddListOkDivmessage').find('#hlabmsg').text("Your request has been sent for approval!");
                    Fillmydocs(EmployeeId);
                }
                FillGrid(EmployeeId);
                FillUnlistdocs(EmployeeId);
            },
            error: onError,
            cache: false
        });
    }



    //var mydata = "{Docid':'" + docid + "','EmployeeId':'" + EmployeeId + "'}";
    //if (myData != "") {

    //    $.ajax({
    //        type: "POST",
    //        url: "DoctorsService.asmx/RemoveDocRequest",
    //        data: mydata,
    //        contentType: "application/json; charset=utf-8",
    //        success: function (data) {
    //            FillGrid(1);
    //            FillGridRequest(1);
    //            FillGridRemove(1);
    //            $old('#divRemoveConfirmation').jqmHide();
    //            $old('#ApproveOkDivmessage').jqmShow();
    //            $('#ApproveOkDivmessage').find('#hlabmsg').text("Removal Requests has been approved");
    //        },
    //        beforeSend: startingAjax,
    //        complete: ajaxCompleted,
    //        error: onError,
    //        async: false,
    //        cache: false
    //    });
    //}
    //$.ajax({
    //    type: "POST",
    //    url: "DoctorsService.asmx/RemoveThis",
    //    data: mydata,
    //    contentType: "application/json; charset=utf-8",
    //    success: function (data) {
    //        if (data.d == "Call(s) exist in this month.") {
    //            $old('#divRemoveConfirmation').jqmHide();
    //            $old('#ApproveOkDivmessage').jqmShow();
    //            $('#ApproveOkDivmessage').find('#hlabmsg').text("Call(s) exist in this month.");
    //        }
    //        else {
    //            $old('#divRemoveConfirmation').jqmHide();
    //            $old('#ApproveOkDivmessage').jqmShow();
    //            $('#ApproveOkDivmessage').find('#hlabmsg').text("Your request has been sent for approval!");
    //        }
    //        FillGrid(1);
    //        FillGridRequest(1);
    //        FillGridRemove(1);
    //    },
    //    beforeSend: startingAjax,
    //    complete: ajaxCompleted,
    //    error: onError,
    //    async: false,
    //    cache: false
    //});


}

function oGrid_RejectedRemove(DoctorId, userrole) {

    var text = prompt("Fill Comments", "");

    if (text != null) {

        var myData = "{'docid':'" + DoctorId + "','userrole':'" + userrole + "','comment':'" + text + "','status':'2'}";

        if (myData != "") {
            $('#hdnMode').val("R");
            $.ajax({
                type: "POST",
                url: "DoctorsService.asmx/VerifyDoctor",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccess,
                error: onError,
                cache: false
            });
        }
    }

}

function resetAddToListRemove() {
    $('input[name="RemoveCheckBox"]').prop('checked', false);
    $('#UpdateListbtn').css('display', 'none');
    $('#removeListbtn').css('display', 'none');

    removeDocID = [];
}

function addMutipleDocsListUpdate() {
    UpdateAndRemoveDocID = [];
    UpdateReqStatus = [];

    addCheckedBoxes = document.querySelectorAll('input[name=RemoveCheckBox]:checked');

    if (addCheckedBoxes.length > 0) {
        for (var i = 0; i < addCheckedBoxes.length; i++) {
            UpdateReqStatus.push(addCheckedBoxes[i].attributes['data-reqid'].value);
            UpdateAndRemoveDocID.push(addCheckedBoxes[i].value);
            //UpdateReqStatus.push(addCheckedBoxes[i].value);
        }
        addMultipleToListUpdate();
    }
    else {
        $("<div><p style='text-align: center;margin: 35px;font-size: 15px;'>Please select atleast one option.</p></div>").dialog({
            modal: true,
            resizable: false,
            title: 'Info',
            buttons: {
                'Ok': function () {
                    $(this).dialog('close');
                }
            }
        });
    }


}

function addMultipleToListUpdate() {

    $(".frequencyMultiUpdate").numeric(false, function () { alert("Integers only"); this.value = ""; this.focus(); });

    $old('#multipleClassandFrequencyUpdate').jqmShow();


    //$old('#divAddtoListConfirmation').jqmShow();
    //$('#multipleClassandFrequency').find('.btnDetailsSubmit').attr('_docid', docid);s

}

function multiplebtnDetailsUpdateClicked() {
    var thisbtn = $(this);
    var classID = $('#MultiClassUpdate').val();
    var Distributor = $('#DistributorMultiUpdate').val();
    var BricK = $('#BrickMultiUpdate').val();
    var City = $('#CityIDMulti').val();
    var frequency = $('#frequencyMultiUpdate').val();

    if (classID != -1 && frequency != "" && Distributor != -1 && BricK != -1 && City != "") {
        //var mydata = "{'docid':'" + docid + "','empid':'" + EmployeeId + "','classId':'" + classID + "','frequency':'" + frequency + "'}";

        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/MultipleUpdateTolist",
            data: JSON.stringify({
                multipleDocIDs: UpdateAndRemoveDocID.toString(),
                multieReqStatus: UpdateReqStatus.toString(),
                empid: EmployeeId,
                classId: classID,
                frequency: frequency,
                City: City,
                Distributor: Distributor,
                BricK: BricK,
                Date: $('#stdate').val()
            }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                $(thisbtn).parents('.divTableMultiUpdate').find('.requireErrorMultiUpdate').hide();
                resetAddToList();
                $(thisbtn).parents('.divTableMultiUpdate').find('#MultiClassUpdate').val('-1');
                $(thisbtn).parents('.divTableMultiUpdate').find('#DistributorMultiUpdate').val('-1');
                $(thisbtn).parents('.divTableMultiUpdate').find('#BrickMultiUpdate').val('-1');
                $(thisbtn).parents('.divTableMultiUpdate').find('#CityIDMulti').val('');
                $(thisbtn).parents('.divTableMultiUpdate').find('#CityNameMulti').val('');
                $(thisbtn).parents('.divTableMultiUpdate').find('#frequencyMultiUpdate').val('');
                $old('#multipleClassandFrequencyUpdate').jqmHide();

                if (data.d == "Already Exist!") {
                    $old('#divAddtoListConfirmation').jqmHide();
                    $old('#AddListOkDivmessage').jqmShow();
                    $('#AddListOkDivmessage').find('#hlabmsg').text("Dr. already exists");
                }
                else {
                    $old('#divAddtoListConfirmation').jqmHide();
                    $old('#AddListOkDivmessage').jqmShow();
                    $('#AddListOkDivmessage').find('#hlabmsg').text("Your request has been sent for approval!");
                   
                }
                FillGrid(EmployeeId);
                FillGridRequest(EmployeeId);
                FillGridRequest(EmployeeId);
                //FillUnlistdocs(EmployeeId, $('#ddlcity').val());
                FillUnlistdocs(EmployeeId, $('#ddlSpeciality').val(), $('#ddlRelatedCity option:selected').text());
            },
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: false,
            cache: false
        });
    }
    else {
        $(this).parents('.divTableMultiUpdate').find('.requireErrorMultiUpdate').show();
    }

}

function multiplebtnUpdateDetailsCancelClicked() {
    UpdateAndRemoveDocID = [];
    UpdateReqStatus = [];
    $(this).parents('.divTableMultiUpdate').find('.requireErrorMultiUpdate').hide();
    $(this).parents('.divTableMultiUpdate').find('#MultiClassUpdate').val('-1');
    $(this).parents('.divTableMultiUpdate').find('#DistributorMultiUpdate').val('-1');
    $(this).parents('.divTableMultiUpdate').find('#BrickMultiUpdate').val('-1');
    $(this).parents('.divTableMultiUpdate').find('#CityIDMulti').val('');
    $(this).parents('.divTableMultiUpdate').find('#CityNameMulti').val('');
    $(this).parents('.divTableMultiUpdate').find('#frequencyMultiUpdate').val('');
    $old('#multipleClassandFrequencyUpdate').jqmHide();
}

function LoadData() {
    debugger
    FillGrid(1);
    FillGridRequest(1);
    FillGridRemove(1);
}

///// Hierarchy Setup

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
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,        
    });

}
function onSuccessGetCurrentUserRole(data, status) {
    if (data.d != "") {

        CurrentUserRole = data.d;

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
            $('#ddlTeam').attr('disabled', 'disabled')
        }

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'headoffice') {
            $('#ddlTeam').attr('disabled', 'disabled')
        }

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
            cache: false,
            async: false,
        });

    }
    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        EmployeeIdForTeam = EmployeeId;
        FillTeamsbyBUH();
    }
    else if (CurrentUserRole == 'rl4') {
        EmployeeIdForTeam = EmployeeId;
        FillTeamsbyBUH();
    }
    FillGrid(EmployeeId);
    FillGridRequest(EmployeeId);
    FillGridRemove(EmployeeId);
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

        jsonObj = JSON.parse(data.d);
        EditableDataLoginId = jsonObj[0].LoginId;
    }

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

        jsonObj = JSON.parse(data.d);

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
        url: "../form/CommonService.asmx/GetHierarchyLevels",
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

        jsonObj = JSON.parse(data.d);
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

}
function EnableHierarchyViaLevel() {

    if (glbVarLevelName == "Level1") {

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
            $('#btnShowResult').show();
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
            $('#btnShowResult').show();
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
            $('#btnShowResult').show();
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
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();


        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#btnShowResult').show();
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
            $('#btnShowResult').show();
            $('#gs3').hide();
            $('#cols33').hide();
            $('#col1').show();
            $('#col2').show();
            $('#col11').show();
            $('#col22').show();
            $('#g1').show();
            $('#g2').show();
            $('#btnShowResult').show();
        }
        if (CurrentUserRole == 'rl5') {
            $('#btnShowResult').show();
            $('#col1').show();
            $('#col11').show();

            $('#g1').show();

            $('#uploadify_button2').show();
            $('#exportExcel2').show();
            $('#btnShowResult').show();
        }
        if (CurrentUserRole == 'rl6') {

            $('.Th12').hide();
            $('#col77').hide();
            //$('.Th112').hide();
        }

        GetHierarchySelection();
        FillDropDownList();

    }
    if (glbVarLevelName == "Level3") {

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
            $('#btnShowResult').show();
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
            $('#btnShowResult').show();
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
            $('#btnShowResult').show();
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
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#btnShowResult').show();
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
            $('#gs3').hide();
            $('#cols33').hide();
            $('#col1').show();
            $('#col2').show();
            $('#col11').show();
            $('#col22').show();

            $('#g1').show();
            $('#g2').show();
            $('#btnShowResult').show();

        }
        if (CurrentUserRole == 'rl5') {

            $('#col1').show();
            $('#col11').show();

            $('#g1').show();
            $('#uploadify_button2').show();
            $('#exportExcel2').show();
            $('#btnShowResult').show();
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
        cache: false
    });

}
function onSuccessGetHierarchySelection(data, status) {

    if (data.d != "") {

        jsonObj = JSON.parse(data.d);

        if (jsonObj != "") {
            level3Id = jsonObj[0].LevelId3;
            level4Id = jsonObj[0].LevelId4;
            level5Id = jsonObj[0].LevelId5;
            level6Id = jsonObj[0].LevelId6;
        }
    }

}

function FillTeamsbyBUH() {

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
        myData = "{'LevelId':'" + $('#dG3').val() + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/FillTeamsbyBUH",
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
        myData = "{'LevelId':'" + $('#dG2').val() + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/FillTeamsbyBUH",
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
        myData = "{'LevelId':'" + $('#dG1').val() + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/FillTeamsbyBUH",
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
            url: "../Reports/NewReports.asmx/FillTeamsForLevel3withEmployeeId",
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

    if (CurrentUserRole == 'rl1') {
        if (data.d != "") {
            var jsonObj = JSON.parse(data.d);
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#dG3").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            });

        } else {
            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");
        }
    } else if (CurrentUserRole == 'rl2') {
        if (data.d != "") {
            var jsonObj = JSON.parse(data.d);
            document.getElementById('dG7').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

            $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#dG2").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            });

        } else {
            $("#dG2").append("<option value='" + value + "'>" + name + "</option>");
        }
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'rl4' || CurrentUserRole == 'headoffice') {
        if (data.d != "") {
            var jsonObj = JSON.parse(data.d);
            document.getElementById('dG1').innerHTML = "";

            $("#dG1").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#dG1").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            });

        } else {
            $("#dG1").append("<option value='" + value + "'>" + name + "</option>");
        }
    } else {
        if (data.d != "") {
            var jsonObj = JSON.parse(data.d);
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            //$("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            //$.each(jsonObj, function (i, tweet) {
            //    $("#ddlTeam").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            //});


            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#dG7").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            });

        } else {
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");
            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");
        }
    }
}

function FillDropDownListtop() {
    myData = "{'levelName':'Level1' }";

    $.ajax({
        type: "POST",
        // url: "../Reports/datascreen.asmx/FilterDropDownList",
        url: "../Reports/NewReports.asmx/fillGH",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: function (data, status) {
            $('#ddl111').empty();
            $("#ddl111").append("<option value='-1'>Select BUH Manager</option>");
            if (data.d != "") {
                $.each(data.d, function (i, tweet) {
                    $("#ddl111").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
                });
            }

        },
        error: onError,
        cache: false
    });
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

        jsonObj = JSON.parse(data.d);

        if (glbVarLevelName == "Level1") {

            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            value = '-1';

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
                name = 'Select ' + HierarchyLevel1;
                $('#Label1').append(HierarchyLevel1 + " " + "");
                $('#Label2').append(HierarchyLevel2 + " " + "");
                $('#Label3').append(HierarchyLevel3 + " " + "");
                $('#Label4').append(HierarchyLevel4 + " " + "");
                $('#Label9').append(HierarchyLevel5 + " " + "");
                $('#Label10').append(HierarchyLevel6 + " " + "-TMs");

                $('#Label5').append(HierarchyLevel1 + " " + "");
                $('#Label6').append(HierarchyLevel2 + " " + " ");
                $('#Label7').append(HierarchyLevel3 + " " + "Level ");
                $('#Label8').append(HierarchyLevel4 + " " + "Level ");
                $('#Label11').append(HierarchyLevel5 + " " + "Level ");
                $('#Label12').append(HierarchyLevel6 + " " + "Level ");
                $('#Label13').append("Team");
            }
            if (CurrentUserRole == 'rl1') {
                name = 'Select ' + HierarchyLevel2;
                $('#Label1').append(HierarchyLevel2 + " " + "");
                $('#Label2').append(HierarchyLevel3 + " " + "");
                $('#Label3').append(HierarchyLevel4 + " " + "");
                $('#Label4').append(HierarchyLevel5 + " " + "");
                $('#Label9').append(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').append(HierarchyLevel2 + " " + "Level ");
                $('#Label6').append(HierarchyLevel3 + " " + "Level ");
                $('#Label7').append(HierarchyLevel4 + " " + "Level ");
                $('#Label8').append(HierarchyLevel5 + " " + "Level ");
                $('#Label11').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl2') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "");
                $('#Label2').append(HierarchyLevel4 + " " + "");
                $('#Label3').append(HierarchyLevel5 + " " + "");
                $('#Label4').append(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'headoffice') {
                name = 'Select ' + HierarchyLevel4;
                $('#Label1').append("Teams");
                $('#Label2').append(HierarchyLevel4 + " " + "");
                $('#Label3').append(HierarchyLevel5 + " " + "");
                $('#Label7').append(HierarchyLevel6 + " " + "-TMs");
            }
            if (CurrentUserRole == 'rl3') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append(HierarchyLevel4 + " " + "");
                $('#Label2').append(HierarchyLevel5 + " " + "");
                $('#Label3').append(HierarchyLevel6 + " " + "-TMs ");


                $('#Label5').append(HierarchyLevel4 + " " + "Level ");
                $('#Label6').append(HierarchyLevel5 + " " + "Level ");
                $('#Label7').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append(HierarchyLevel5 + " " + "");
                $('#Label2').append(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').append(HierarchyLevel5 + " " + "Level ");
                $('#Label6').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl5') {

                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "-TMs ");
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

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "");
                $('#Label2').append(HierarchyLevel4 + " " + "");
                $('#Label3').append(HierarchyLevel5 + " " + "");
                $('#Label4').append(HierarchyLevel6 + " " + "-TMs");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'marketingteam') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "");
                $('#Label2').append(HierarchyLevel4 + " " + "");
                $('#Label3').append(HierarchyLevel5 + " " + "");
                $('#Label4').append(HierarchyLevel6 + " " + "-TMs");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append(HierarchyLevel4 + " " + "");
                $('#Label2').append(HierarchyLevel5 + " " + "");
                $('#Label3').append(HierarchyLevel6 + " " + "-TMs ");


                $('#Label5').append(HierarchyLevel4 + " " + "Level ");
                $('#Label6').append(HierarchyLevel5 + " " + "Level ");
                $('#Label7').append(HierarchyLevel6 + " " + "Level ");



            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append(HierarchyLevel5 + " " + "");
                $('#Label2').append(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').append(HierarchyLevel5 + " " + "Level ");
                $('#Label6').append(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "-TMs");
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

    document.getElementById('dG2').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";
    document.getElementById('dG7').innerHTML = "";


    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'rl4' || CurrentUserRole == 'headoffice') {

    } else {
        document.getElementById('dG1').innerHTML = "";
        value = '-1';
        name = 'Select ' + $('#Label5').text();

        $("#dG1").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#dG1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });

    }



    // umer work
    if (CurrentUserRole == 'ftm') {
        SetGMHierarchyForFTM();
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

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
            $('#ddlTeam').attr('disabled', 'disabled')
        }

        if (CurrentUserRole == 'rl1') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(0);
            $('#h4').val(0);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
            $('#ddl3').attr('disabled', 'disabled');
        }
        if (CurrentUserRole == 'rl2') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(0);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
            $('#ddl2').attr('disabled', 'disabled');
        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(data.d[0].LevelId3);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
            $('#ddl1').attr('disabled', 'disabled');
        }
        if (CurrentUserRole == 'rl4') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(data.d[0].LevelId3);
            $('#h5').val(data.d[0].LevelId4);
            $('#h12').val(0);
            $('#h13').val(0);
            $('#ddl1').attr('disabled', 'disabled');
        }
        if (CurrentUserRole == 'rl5') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(data.d[0].LevelId3);
            $('#h5').val(data.d[0].LevelId4);
            $('#h12').val(data.d[0].LevelId5);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl6') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(data.d[0].LevelId3);
            $('#h5').val(data.d[0].LevelId4);
            $('#h12').val(data.d[0].LevelId5);
            $('#h13').val(data.d[0].LevelId6);
        }

    }

}


function ONteamChnageGethierarchy() {

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
        $('#dG7').val($('#ddlTeam').val());
        OnChangeddl3withteamId();
    }
    else if (CurrentUserRole == 'rl1') {
        levelValue = $('#ddlTeam').val();
        var teamid = $('#dG3').val();
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
        else {
            $('#dG7').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole != 'rl3' && CurrentUserRole != 'rl1' && CurrentUserRole != 'rl2' || CurrentUserRole != 'headoffice') {
                document.getElementById('ddlTeam').innerHTML = "";
            }

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        $old('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {
        levelValue = $('#ddlTeam').val();
        var teamid = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel5",
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
            $('#dG7').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        $old('#dialog').jqmHide();
        //OnChangeddl2withteamId();
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddlTeam').val();
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
            $('#dG7').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        $old('#dialog').jqmHide();
        //OnChangeddl3withteamId();
    }
    else if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddlTeam').val();
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
            $('#dG7').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
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


            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        $old('#dialog').jqmHide();
    }
}

function ONteamChnageGetlevel() {

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
        $('#ddlTeam').val($('#dG7').val());
        OnChangeddl3withteamId();
    }
    else if (CurrentUserRole == 'rl1') {
        levelValue = $('#dG7').val();
        teamId = $('#dG3').val();
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
            $('#ddlTeam').val(-1)

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }

        $old('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {
        levelValue = $('#dG7').val();
        teamId = $('#dG2').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";
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
            $('#ddlTeam').val(-1)

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }

        $old('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#dG7').val();
        teamId = $('#dG2').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";
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
            $('#ddlTeam').val(-1)

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }

        $old('#dialog').jqmHide();
        //OnChangeddl3withteamId();
    }
    else if (CurrentUserRole == 'rl4') {
        levelValue = $('#dG7').val();
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
            $('#ddlTeam').val(-1)

            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }

        $old('#dialog').jqmHide();
        //OnChangeddl4withteamId();
    }
}
function OnChangeddl1() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {


        var teamid = $('#ddl1').val();
        myData = "{'employeeId':'" + EmployeeIdForTeam + "' ,'teamId':'" + teamid + "'}";

        if ($('#ddlreport').val() == 7) {
            $('#Th8').show();
        }

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

            $('#dG1').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'headoffice') {
                $('#h4').val(0);
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


            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }



        $old('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {


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

            $('#dG1').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
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

            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }



        $old('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl4') {
        if ($('#ddl1').val() == "-1") {
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }
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

            $('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

        }

        $old('#dialog').jqmHide();
    } else {

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

            $('#dG1').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
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
            if (CurrentUserRole != 'rl4') {
                document.getElementById('ddlTeam').innerHTML = "";
            }


            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }



        $old('#dialog').jqmHide();
    }



}
function OnChangeddl2() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }
    if (CurrentUserRole == 'rl2') {
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        levelValue = $('#ddl1').val();
        var teamid = $('#ddl2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel3",
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

            $('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

        }

        $old('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        var teamid = $('#dG1').val();
        levelValue = $('#ddl2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";

        if ($('#ddlreport').val() == 7) {
            $('#Th8').show();
        }

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel4",
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

            $('#dG2').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
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


            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $old('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddl2').val();
        teamId = $('#dG1').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamId + "'}";
        if ($('#ddlreport').val() == 7) {
            $('#Th8').show();
        }

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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

            $('#dG2').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
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
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }
        $old('#dialog').jqmHide();
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
            $('#dG2').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
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


            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $old('#dialog').jqmHide();
    }


}
function OnChangeddl2withteamId() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl1') {

        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

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
        else {

            $('#dG7').val(-1)

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

        }

        $old('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {


        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        levelValue = $('#ddlTeam').val();
        var teamid = $('#ddl2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel5",
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
            $('#dG7').val(-1);

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole != 'rl3' && CurrentUserRole != 'rl1' && CurrentUserRole != 'rl2') {
                document.getElementById('ddlTeam').innerHTML = "";
            }

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        $old('#dialog').jqmHide();

        //levelValue = $('#ddl1').val();
        //var teamid = $('#ddlTeam').val();
        //myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        //if (levelValue != -1) {

        //    $.ajax({
        //        type: "POST",
        //        url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel3",
        //        data: myData,
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        success: onSuccessFillddl1withteamId,
        //        error: onError,
        //        beforeSend: startingAjax,
        //        complete: ajaxCompleted,
        //        cache: false
        //    });

        //}
        //else {

        //    $('#dG4').val(-1)

        //    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
        //        $('#h5').val(0);
        //        $('#h12').val(0);
        //        $('#h13').val(0);
        //    }
        //    if (CurrentUserRole == 'rl1') {
        //        $('#h12').val(0);
        //        $('#h13').val(0);
        //    }
        //    if (CurrentUserRole == 'rl2') {
        //        $('#h13').val(0);
        //    }
        //    document.getElementById('ddl5').innerHTML = "";
        //    document.getElementById('ddl6').innerHTML = "";
        //    document.getElementById('dG5').innerHTML = "";
        //    document.getElementById('dG6').innerHTML = "";

        //}

        //$old('#dialog').jqmHide();
    }
    else {
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
            $('#dG2').val(-1);

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
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


            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        $old('#dialog').jqmHide();


    }



}
function OnChangeddl3() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl1') {



        levelValue = $('#ddl2').val();
        var teamid = $('#ddl3').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
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
            $('#dG3').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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

            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $old('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {

        levelValue = $('#ddl3').val();
        var teamid = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";



        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
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
            $('#dG3').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $old('#dialog').jqmHide();

    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddl3').val();
        teamId = $('#dG1').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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
            $('#dG3').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                $('#h12').val(0);
                $('#h13').val(0);
            }
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $old('#dialog').jqmHide();
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
            $('#dG3').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole != 'rl3' && CurrentUserRole != 'rl2') {
                document.getElementById('ddlTeam').innerHTML = "";
            }
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $old('#dialog').jqmHide();
    }


}
function OnChangeddl3withteamId() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

        if ($('#ddlTeam').val() == "-1") {
            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('dG1').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        if ($('#ddlTeam').val() != null && $('#ddl1').val() != null) {
            document.getElementById('ddl2').innerHTML = "";

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
                    success: onSuccessFillddl3withteamId,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });

            }
            else {

                $('#dG4').val(-1)

                if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
                document.getElementById('dG5').innerHTML = "";
                document.getElementById('dG6').innerHTML = "";

            }

            $old('#dialog').jqmHide();
        } else {
            var teamid = $('#ddlTeam').val();
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

                $('#dG1').val(-1)

                if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
                document.getElementById('dG1').innerHTML = "";
                document.getElementById('dG2').innerHTML = "";
                document.getElementById('dG3').innerHTML = "";
                document.getElementById('dG4').innerHTML = "";
                document.getElementById('dG5').innerHTML = "";
                document.getElementById('dG6').innerHTML = "";

            }

            $old('#dialog').jqmHide();
        }


    }

    else {
        levelValue = $('#ddl3').val();
        var teamid = $('#dG7').val();
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

            $('#dG4').val(-1)

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

        }

        $old('#dialog').jqmHide();
    }



}
function OnChangeddl4() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }


    if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2') {
        levelValue = $('#ddl4').val();
        teamId = $('#dG3').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "'}";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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

            $('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

        }

        $old('#dialog').jqmHide();
    } else {
        levelValue = $('#ddl4').val();
        var teamid = $('#dG7').val();
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

            $('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

        }

        $old('#dialog').jqmHide();
    }
}
function OnChangeddl4withteamId() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl4') {

        if ($('#ddlTeam').val() == "-1") {
            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('dG1').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }
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

            $('#dG4').val(-1)

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

        }

        $old('#dialog').jqmHide();


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

            $('#dG4').val(-1)

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

        }

        $old('#dialog').jqmHide();
    }



}
function OnChangeddl5() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    levelValue = $('#ddl5').val();
    teamId = $('#dG7').val();
    myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/GetEmployee",
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
        $('#dG5').val(-1).select2()

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl1') {
            $('#h13').val(0);
        }

        document.getElementById('ddl6').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";
    }

    $old('#dialog').jqmHide();

}
function OnChangeddl6() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();


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

        $('#dG6').val(-1).select2()
        $('#h13').val(0);
    }
    $old('#dialog').jqmHide();
}

function onSuccessFillddl1(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = JSON.parse(data.d);

        if (CurrentUserRole == 'rl2') {
            //document.getElementById('dG2').innerHTML = "";
            //value = '-1';

            //name = 'Select ' + $('#Label2').text();
            //$("#dG2").append("<option value='" + value + "'>" + name + "</option>");

            //$.each(jsonObj, function (i, tweet) {
            //    $("#dG2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            //});
        } else if (CurrentUserRole == 'rl4') {
            document.getElementById('ddlTeam').innerHTML = "";
            value = '-1';

            name = 'Select ' + $('#Label14').text();
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        } else {
            document.getElementById('ddl2').innerHTML = "";
            value = '-1';

            name = 'Select ' + $('#Label2').text();
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }
        if (CurrentUserRole != 'rl2') {
            levelValue = $('#ddl2').val();

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
                $('#dG1').val(-1);
            }
        }
    }
    if (CurrentUserRole != 'rl4') {
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
    if (levelValue == -1) {
        $('#dG1').val(-1);
    }

}
function onSuccessFillddl1withteamId(data, status) {


    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = JSON.parse(data.d);

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
                $('#dG1').val(-1);
            }
        } else if (CurrentUserRole == 'rl2') {
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            value = '-1';

            name = 'Select ' + $('#Label3').text();
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
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
                $('#dG1').val(-1);
            }

        }
        else {
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
                $('#dG1').val(-1);
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

    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";


    if (true) {

    }

    if ($("#ddl2").val() == "-1") { } else {
        //value = '-1';
        //name = 'Select ' + $('#Label3').text();
        //$("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});

        if (data.d != "") {

            jsonObj = JSON.parse(data.d);

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
                $('#dG2').val(-1)
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
        $('#dG2').val(-1);
    }

}
function onSuccessFillddl2(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

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
                $('#dG2').val(-1)
            }
        } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            document.getElementById('ddlTeam').innerHTML = "";
            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label14').text();
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });


            levelValue = $('#ddl3').val();

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
        } else if (CurrentUserRole == 'rl4') {
            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label3').text();
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });


            levelValue = $('#ddlTeam').val();

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
        } else if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
            jsonObj = JSON.parse(data.d);
            document.getElementById('ddl3').innerHTML = "";
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
                $('#dG2').val(-1)
            }
        } else {
            jsonObj = JSON.parse(data.d);

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
                $('#dG2').val(-1)
            }
        }

    }

    if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddlTeam').val();
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

    if (levelValue == -1) {
        $('#ddl2').val(-1);
        $('#dG2').val(-1);
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

        jsonObj = JSON.parse(data.d);
        value = '-1';

        //name = 'Select ' + $('#Label4').text();
        //$("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});


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
            $('#dG3').val(-1)
        }
    }

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddlTeam').val();
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

    if (levelValue == -1) {
        $('#ddl3').val(-1);
        $('#dG3').val(-1);
    }
}
function onSuccessFillddl3withteamId(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    //if ($("#ddl3").val() == "-1") {

    //} else {
    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddlTeam').innerHTML = "";
        document.getElementById('ddl2').innerHTML = "";

        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG7').innerHTML = "";

        //if ($("#ddl2").val() == "-1" || $("#ddl2").val() == " " || $("#ddl2").val() == null) {
        if (data.d != "") {
            document.getElementById('ddl2').innerHTML = "";
            jsonObj = JSON.parse(data.d);
            value = '-1';

            name = 'Select ' + $('#Label2').text();
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });

            myData = "{'employeeid':'" + EmployeeIdForTeam + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/getemployeeHR",
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




        //} else {
        //    if (data.d != "") {
        //        document.getElementById('ddl3').innerHTML = "";
        //        jsonObj = JSON.parse(data.d);
        //        value = '-1';

        //        name = 'Select ' + $('#Label2').text();
        //        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        //        $.each(jsonObj, function (i, tweet) {
        //            $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //        });


        //        levelValue = $('#ddl2').val();
        //        if (levelValue != -1) {

        //            myData = "{'employeeid':'" + levelValue + "' }";
        //            $.ajax({
        //                type: "POST",
        //                url: "../Reports/newReports.asmx/getemployeeHR",
        //                data: myData,
        //                contentType: "application/json; charset=utf-8",
        //                dataType: "json",
        //                success: onSuccessFillddl13withteamId,
        //                error: onError,
        //                beforeSend: startingAjax,
        //                complete: ajaxCompleted,
        //                cache: false
        //            });
        //        }
        //    }
        //}


    } else if (CurrentUserRole == 'rl1') {
        if (data.d != "") {
            document.getElementById('ddlTeam').innerHTML = "";
            jsonObj = JSON.parse(data.d);
            value = '-1';

            name = 'Select ' + $('#Label14').text();
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
                $('#dG3').val(-1)
            }
        }
    } else if (CurrentUserRole == 'rl2') {
        if (data.d != "") {
            document.getElementById('ddlTeam').innerHTML = "";
            jsonObj = JSON.parse(data.d);
            value = '-1';

            name = 'Select ' + $('#Label14').text();
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
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
                $('#dG3').val(-1)
            }
        }
    }
    else {
        if (data.d != "") {

            jsonObj = JSON.parse(data.d);
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
                $('#dG3').val(-1)
            }
        }
    }
    //}
}
function onSuccessFillddl4(data, status) {

    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";


    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddlTeam').innerHTML = "";

        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG7').innerHTML = "";
        if (data.d != "") {

            document.getElementById('ddl3').innerHTML = "";
            jsonObj = JSON.parse(data.d);
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

    } else {
        if (data.d != "") {

            jsonObj = JSON.parse(data.d);

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
                $('#dG4').val(-1)
            }

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
        $('#dG4').val(-1);
    }
}
function onSuccessFillddl4withteamId(data, status) {

    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (CurrentUserRole == 'rl4') {
        if (data.d != "") {
            document.getElementById('ddl2').innerHTML = "";
            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label2').text();
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });



            myData = "{'employeeid':'" + EmployeeIdForTeam + "' }";
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
    } else if (CurrentUserRole == 'rl1') {

        jsonObj = JSON.parse(data.d);
        document.getElementById('ddl4').innerHTML = "";
        value = '-1';
        name = 'Select ' + $('#Label8').text();
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

        levelValue = $('#ddlTeam').val();

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
    } else if (CurrentUserRole == 'rl2') {
        document.getElementById('ddl4').innerHTML = "";
        jsonObj = JSON.parse(data.d);

        value = '-1';
        name = 'Select ' + $('#Label4').text();
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

        levelValue = $('#ddlTeam').val();

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

            jsonObj = JSON.parse(data.d);

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
                $('#dG4').val(-1)
            }

        }
    }


    //if (CurrentUserRole == 'rl2') {
    //    levelValue = $('#ddl4').val();
    //}
    //if (CurrentUserRole == 'rl4') {
    //    levelValue = $('#ddl5').val();
    //}

    //if (CurrentUserRole == 'rl2' || CurrentUserRole == 'rl4') {

    //    if (levelValue != -1) {

    //        myData = "{'employeeid':'" + levelValue + "' }";
    //        $.ajax({
    //            type: "POST",
    //            url: "../Reports/newReports.asmx/getemployeeHR",
    //            data: myData,
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: onSuccessFillddl14,
    //            error: onError,
    //            beforeSend: startingAjax,
    //            complete: ajaxCompleted,
    //            cache: false
    //        });
    //    }
    //}

    //if (levelValue == -1) {
    //    $('#ddl4').val(-1);
    //    $('#dG4').val(-1);
    //}
}
function onSuccessFillddl5(data, status) {

    document.getElementById('ddl6').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = JSON.parse(data.d);
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
            $('#dG5').val(-1)
        }
    }

    if (CurrentUserRole == 'rl1') {
        levelValue = $('#ddl5').val();
    }
    else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddl3').val();
    }

    if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
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
        $('#dG5').val(-1);
    }
}
function onSuccessFillddl6(data, status) { }

function onSuccessFillddl11(data, status) {
    setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1).select2()

            $('#h2').val(data.d[0].LevelId1)

            dg1();

        }
        if (CurrentUserRole == 'rl1') {

            $('#dG1').val(data.d[0].LevelId2).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            dg1();

        }
        if (CurrentUserRole == 'rl2') {

            $('#dG1').val(data.d[0].LevelId3).select2()

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
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $('#dG1').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg1();

        }
        if (CurrentUserRole == 'rl4') {

            $('#dG2').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            $('#h12').val(data.d[0].LevelId5)

            dg1();

        }
        if (CurrentUserRole == 'rl5') {

            $('#dG1').val(data.d[0].LevelId6).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

        }
        //if (CurrentUserRole == 'rl1') {
        //    FillTeamsbyBUH();
        //}

    }
    else {
        $('#dG1').val(-1);
    }
}
function onSuccessFillddl11withteamId(data, status) {
    setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)

            // dg1();

        }
        if (CurrentUserRole == 'rl1') {

            $('#dG1').val(data.d[0].LevelId2)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            dg1WithTeam();

        }
        if (CurrentUserRole == 'rl2') {

            //$('#dG1').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            dg1WithTeam();

        }
        if (CurrentUserRole == 'marketingteam') {

            $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)

            dg1();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

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

            $('#dG1').val(data.d[0].LevelId6).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

        }


    }
    else {
        $('#dG1').val(-1);
    }
}
function onSuccessFillddl12(data, status) {

    setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG2').val(data.d[0].LevelId2).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            dg2();

        }
        if (CurrentUserRole == 'marketingteam') {
            $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            dg2();

        }
        if (CurrentUserRole == 'rl1') {

            $('#dG2').val(data.d[0].LevelId3).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            dg2();

        }
        if (CurrentUserRole == 'rl2') {

            $('#dG2').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg2();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $('#dG3').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            dg2();

        }
        if (CurrentUserRole == 'rl4') {
            $('#dG7').val(data.d[0].LevelId6).select2()
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
        $('#dG2').val(-1);
    }
}
function onSuccessFillddl12withteamId(data, status) {

    setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG2').val(data.d[0].LevelId2).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            //dg2();

        }
        if (CurrentUserRole == 'marketingteam') {
            $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            //dg2();

        }
        if (CurrentUserRole == 'rl1') {

            $('#dG2').val(data.d[0].LevelId3).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            dg2WithTeam();
        }
        if (CurrentUserRole == 'rl2') {

            $('#dG2').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg2WithTeam();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $('#dG2').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg2();

        }
        if (CurrentUserRole == 'rl4') {
            $('#dG2').val(data.d[0].LevelId6).select2()
            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            newemployee = $('#ddl2').val();
            $('#h6').val(newemployee);

        }
    }
    else {
        $('#dG2').val(-1);
    }
}
function onSuccessFillddl13(data, status) {

    setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1).select2()
            $('#dG2').val(data.d[0].LevelId2).select2()
            $('#dG3').val(data.d[0].LevelId3).select2()

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

            $('#dG3').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg3();

        }
        if (CurrentUserRole == 'rl2') {

            $('#dG3').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            dg3();

        }
        if (CurrentUserRole == 'rl3') {

            $('#dG7').val(data.d[0].LevelId6).select2()

            $('#h2').val(data.d[0].LevelId3)
            $('#h3').val(data.d[0].LevelId4)
            $('#h4').val(data.d[0].LevelId5)
            $('#h5').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
        if (CurrentUserRole == 'headoffice') {

            $('#dG7').val(data.d[0].LevelId6).select2()

            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
        if (CurrentUserRole != 'rl3' && CurrentUserRole != 'headoffice') {
            FillTeamsbyBUH();
        }

    }
    else {
        $('#dG3').val(-1);
    }
}
function onSuccessFillddl13withteamId(data, status) {

    setvalue();


    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1)
            $('#dG2').val(data.d[0].LevelId2)
            $('#dG3').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            dg3WithTeam();

        }
        if (CurrentUserRole == 'marketingteam') {
            $('#dG1').val(data.d[0].LevelId1)
            $('#dG2').val(data.d[0].LevelId2)
            $('#dG3').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)


        }
        if (CurrentUserRole == 'rl1') {

            //$('#dG3').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg3WithTeam();

        }
        if (CurrentUserRole == 'rl2') {

            $('#dG3').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            dg3WithTeam();

        }
        if (CurrentUserRole == 'rl3') {

            $('#dG2').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            dg3WithTeam();
            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
        if (CurrentUserRole == 'headoffice') {

            $('#dG2').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            dg3WithTeam();
            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
    }
    else {
        $('#dG4').val(-1);
    }
}
function onSuccessFillddl14(data, status) {

    setvalue();

    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

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

            $('#dG4').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            dg4();

        }
        if (CurrentUserRole == 'rl2') {

            $('#dG4').val(data.d[0].LevelId6).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

            dg4();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $('#dG3').val(data.d[0].LevelId6).select2()
            $('#h2').val(data.d[0].LevelId3)
            $('#h3').val(data.d[0].LevelId4)
            $('#h4').val(data.d[0].LevelId5)
            $('#h5').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
    }
    else {
        $('#dG4').val(-1);
    }
}
function onSuccessFillddl14withteamId(data, status) {

    setvalue();

    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1).select2()
            $('#dG2').val(data.d[0].LevelId2).select2()
            $('#dG3').val(data.d[0].LevelId3).select2()
            $('#dG4').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            dg4WithTeam();
            // dg4();
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

            $('#dG7').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            dg4WithTeam();

        }
        if (CurrentUserRole == 'rl2') {

            $('#dG7').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

            dg4WithTeam();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $('#dG3').val(data.d[0].LevelId6).select2()
            $('#h2').val(data.d[0].LevelId3)
            $('#h3').val(data.d[0].LevelId4)
            $('#h4').val(data.d[0].LevelId5)
            $('#h5').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
        if (CurrentUserRole == 'rl4') {

            $('#dG2').val(data.d[0].LevelId5).select2()

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
        $('#dG4').val(-1);
    }
}
function onSuccessFillddl15(data, status) {

    setvalue();

    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1).select2()
            $('#dG2').val(data.d[0].LevelId2).select2()
            $('#dG3').val(data.d[0].LevelId3).select2()
            $('#dG4').val(data.d[0].LevelId4).select2()
            $('#dG5').val(data.d[0].LevelId5).select2()

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

            $('#dG5').val(data.d[0].LevelId6).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

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
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $('#dG3').val(data.d[0].LevelId6)

            $('#h2').val(data.d[0].LevelId3)
            $('#h3').val(data.d[0].LevelId4)
            $('#h4').val(data.d[0].LevelId5)
            $('#h5').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);
        }
    }
    else {
        $('#dG5').val(-1);
    }
}
function onSuccessFillddl16(data, status) {

    setvalue();
    if (data.d != '') {
        $('#dG1').val(data.d[0].LevelId1).select2()
        $('#dG2').val(data.d[0].LevelId2).select2()
        $('#dG3').val(data.d[0].LevelId3).select2()
        $('#dG4').val(data.d[0].LevelId4).select2()
        $('#dG5').val(data.d[0].LevelId5).select2()
        $('#dG6').val(data.d[0].LevelId6).select2()

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)
        $('#h12').val(data.d[0].LevelId5)
        $('#h13').val(data.d[0].LevelId6)

        dg6();
        //OnChangeddG4();
    }
    else {
        $('#dG6').val(-1);
    }
}

function dg1() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();
    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2') {
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
            $('#ddl2').val(-1)
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
        }

    } else {
        levelValue = $('#dG2').val();
        teamId = $('#dG1').val();
        myData = "{'level1Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L1WithTeam",
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
            $('#ddl2').val(-1)
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
        }
    }

    $old('#dialog').jqmHide();

}
function dg1WithTeam() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();


    //levelValue = $('#dG1').val();
    //myData = "{'level1Id':'" + levelValue + "' }";
    if (CurrentUserRole == 'rl2') {
        levelValue = $('#dG1').val();
        teamId = $('#dG2').val();
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
    } else {
        levelValue = $('#dG1').val();
        teamId = $('#ddl2').val();
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
    }
    $old('#dialog').jqmHide();

}
function dg2() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();
    if (CurrentUserRole == 'rl2') {
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
    } else if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'rl1') {
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
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#dG3').val();
        teamId = $('#dG1').val();
        myData = "{'level2Id':'" + levelValue + "','teamId':'" + teamId + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L2WithTeam",
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
    } else {
        levelValue = $('#dG3').val();
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
    }


    $old('#dialog').jqmHide();

}
function dg2WithTeam() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();


    if (CurrentUserRole == 'rl2') {
        levelValue = $('#dG1').val();
        teamId = $('#ddlTeam').val();
        myData = "{'level1Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        //levelValue = $('#dG2').val();
        //myData = "{'level2Id':'" + levelValue + "' }";
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

        $old('#dialog').jqmHide();
    } else {
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

        $old('#dialog').jqmHide();
    }


}
function dg3() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    levelValue = $('#dG3').val();
    teamId = $('#dG2').val();
    myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";

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

    $old('#dialog').jqmHide();

}
function dg3WithTeam() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

        if ($('#ddl2').val() == "-1" || $('#ddl2').val() == " " || $('#ddl2').val() == null) {

            teamId = $('#dG1').val();
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

            $old('#dialog').jqmHide();

        } else {

            levelValue = $('#dG2').val();
            teamId = $('#dG1').val();
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
                $('#ddl2').val(-1)
                document.getElementById('dG4').innerHTML = "";
                document.getElementById('dG5').innerHTML = "";
                document.getElementById('dG6').innerHTML = "";
                document.getElementById('ddl4').innerHTML = "";
                document.getElementById('ddl5').innerHTML = "";
                document.getElementById('ddl6').innerHTML = "";
            }

            $old('#dialog').jqmHide();


        }


    } else if (CurrentUserRole == 'rl1') {

        levelValue = $('#dG2').val();
        teamId = $('#dG3').val();
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

        $old('#dialog').jqmHide();
    }
    else if (CurrentUserRole == 'rl2') {

        levelValue = $('#dG3').val();
        teamId = $('#dG2').val();
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

        $old('#dialog').jqmHide();
    }
    else {

        levelValue = $('#dG3').val();
        teamId = $('#dG7').val();
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

        $old('#dialog').jqmHide();
    }


}
function dg4() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    levelValue = $('#dG4').val();
    teamId = $('#dG3').val();
    myData = "{'level4Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

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

    }
    else {
        $('#ddl4').val(-1)
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
    }

    $old('#dialog').jqmHide();

}
function dg4WithTeam() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    if (CurrentUserRole == 'rl4') {

        teamId = $('#dG1').val();
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

        $old('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl1') {
        levelValue = $('#dG7').val();
        teamId = $('#dG3').val();
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
            $('#ddlTeam').val(-1)
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }

        $old('#dialog').jqmHide();
    }
    else if (CurrentUserRole == 'rl2') {
        levelValue = $('#dG7').val();
        teamId = $('#dG2').val();
        myData = "{'level4Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

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

        $old('#dialog').jqmHide();
    }

    else {
        levelValue = $('#dG4').val();
        teamId = $('#dG7').val();
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

        $old('#dialog').jqmHide();
    }





}
function dg5() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();



    levelValue = $('#dG5').val();
    teamId = $('#dG7').val();
    myData = "{'level5Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L5WithTeam",
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

    $old('#dialog').jqmHide();



}
function dg6() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    //FillMRDr();
    $('#h6').val(levelValue);

    $old('#dialog').jqmHide();

}

function OnChangeddG1() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

        if ($('#dG1').val() == "-1") {
            $('#h5').val(0);
            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        //if ($('#dG1').val() != null && $('#ddl2').val() != null) {

        //    levelValue = $('#ddl2').val();
        //    var teamid = $('#dG1').val();
        //    myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        //    if (levelValue != -1) {

        //        $.ajax({
        //            type: "POST",
        //            url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel4",
        //            data: myData,
        //            contentType: "application/json; charset=utf-8",
        //            dataType: "json",
        //            success: onSuccessFillddl3withteamId,
        //            error: onError,
        //            beforeSend: startingAjax,
        //            complete: ajaxCompleted,
        //            cache: false
        //        });

        //    }
        //    else {

        //        $('#dG2').val(-1).select2()

        //        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
        //            $('#h5').val(0);
        //            $('#h12').val(0);
        //            $('#h13').val(0);
        //        }
        //        if (CurrentUserRole == 'rl1') {
        //            $('#h12').val(0);
        //            $('#h13').val(0);
        //        }
        //        if (CurrentUserRole == 'rl2') {
        //            $('#h13').val(0);
        //        }
        //        document.getElementById('ddl5').innerHTML = "";
        //        document.getElementById('ddl6').innerHTML = "";
        //        document.getElementById('dG5').innerHTML = "";
        //        document.getElementById('dG6').innerHTML = "";

        //    }

        //    $old('#dialog').jqmHide();
        //} else {
        var teamid = $('#dG1').val();
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

            $('#dG1').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

        }

        $old('#dialog').jqmHide();
        //}
    } else if (CurrentUserRole == 'rl2') {
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

            $('#ddl1').val(-1).select2()

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

        $old('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl4') {
        var teamid = $('#dG1').val();
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

            $('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

        }

        $old('#dialog').jqmHide();
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

            $('#ddl1').val(-1).select2()


            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $old('#dialog').jqmHide();
    }


}
function OnChangeddG2() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }


    if (CurrentUserRole == 'rl2') {

        levelValue = $('#ddl1').val();
        var teamid = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel3",
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

            $('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $old('#dialog').jqmHide();

    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#dG2').val();
        teamId = $('#dG1').val();
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
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
            $('#ddl2').val(-1).select2()

            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $old('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl4') {
        levelValue = $('#dG2').val();
        teamId = $('#dG1').val();
        myData = "{'level1Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L1WithTeam",
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

            $('#ddl2').val(-1).select2()

            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $old('#dialog').jqmHide();
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
            $('#ddl2').val(-1).select2()
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

        $old('#dialog').jqmHide();
    }



}
function OnChangeddG3() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl1') {
        levelValue = $('#ddl2').val();
        var teamid = $('#dG3').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
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

            $('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

        }

        $old('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {

        levelValue = $('#dG3').val();
        teamId = $('#dG2').val();
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
                complete: ajaxCompleted,
                cache: false
            });

            G3b();

        }
        else {
            $('#ddl3').val(-1).select2()

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $old('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#dG3').val();
        teamId = $('#dG1').val();
        myData = "{'level2Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L2WithTeam",
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

            $('#h12').val(0);
            $('#h13').val(0);
            $('#ddl3').val(-1).select2()

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $old('#dialog').jqmHide();
    } else {
        levelValue = $('#dG3').val();
        teamId = $('#dG2').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";
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
            $('#ddl3').val(-1).select2()
            OnChangeddl3();

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }

        $old('#dialog').jqmHide();
    }


}
function OnChangeddG4() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
        levelValue = $('#dG4').val();
        teamId = $('#dG7').val();
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
            $('#ddl4').val(-1).select2()
            OnChangeddl4();

            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }
    } else if (CurrentUserRole == 'rl1') {
        levelValue = $('#dG4').val();
        teamId = $('#dG3').val();
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
            $('#ddl4').val(-1).select2()
            OnChangeddl4();

            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }
    }
    else if (CurrentUserRole == 'headoffice') {
        levelValue = $('#dG4').val();
        teamId = $('#dG1').val();
        myData = "{'level2Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";
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
            $('#ddl4').val(-1).select2()

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $old('#dialog').jqmHide();
    } else {
        levelValue = $('#dG4').val();
        teamId = $('#dG2').val();
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
            $('#ddl4').val(-1).select2()
            OnChangeddl4();

            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }
    }
    $old('#dialog').jqmHide();

}
function OnChangeddG5() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    levelValue = $('#dG5').val();
    teamId = $('#dG7').val();
    myData = "{'level5Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";
    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L5WithTeam",
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
        $('#ddl5').val(-1).select2()
        OnChangeddl5();

        document.getElementById('dG6').innerHTML = "";

        document.getElementById('ddl6').innerHTML = "";

    }

    $old('#dialog').jqmHide();

}
function OnChangeddG6() {

    $old('#dialog').jqm({ modal: true });
    $old('#dialog').jqm();
    $old('#dialog').jqmShow();

    G3f();
    //FillMRDr();
    $old('#dialog').jqmHide();

}

function onSuccessG1(data, status) {

    if (data.d != '') {
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        if (CurrentUserRole == 'rl2') {
            FillTeamsbyBUH();
        } else if (CurrentUserRole == 'rl4') {
            document.getElementById('dG7').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label7').text();;


            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitgm = nameslpit.split("_");
                $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitgm[1] + "</option>");
            });
        } else {
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label6').text();;


            $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitgm = nameslpit.split("_");
                $("#dG2").append("<option value='" + tweet.Item1 + "'>" + splitgm[1] + "</option>");
            });
        }


        //if (CurrentUserRole == 'rl1') {
        //    FillTeamsbyBUH();
        //}
    }

}
function onSuccessG1WithTeam(data, status) {

    if (data.d != '') {

        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";
        document.getElementById('dG7').innerHTML = "";



        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            document.getElementById('dG3').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label7').text();;


            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitgm = nameslpit.split("_");
                $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitgm[1] + "</option>");
            });
        } else if (CurrentUserRole == 'rl2') {
            document.getElementById('dG3').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label7').text();;


            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitgm = nameslpit.split("_");
                $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitgm[1] + "</option>");
            });
        } else {
            value = '-1';
            name = 'Select ' + $('#Label6').text();;


            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitgm = nameslpit.split("_");
                $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitgm[1] + "</option>");
            });
        }




    }

}
function onSuccessG2(data, status) {

    if (data.d != '') {
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        if (CurrentUserRole == 'rl1') {
            FillTeamsbyBUH();
        } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            document.getElementById('dG7').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label13').text();

            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitbuh = nameslpit.split("_");
                $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitbuh[1] + "</option>");
            });
        } else if (CurrentUserRole == 'rl4') {
            document.getElementById('dG3').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label7').text();

            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitbuh = nameslpit.split("_");
                $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitbuh[1] + "</option>");
            });
        } else {
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
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
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label8').text();

            $("#dG4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitbuh = nameslpit.split("_");
                $("#dG4").append("<option value='" + tweet.Item1 + "'>" + splitbuh[1] + "</option>");
            });
        } else if (CurrentUserRole == 'rl2') {
            document.getElementById('dG7').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label13').text();

            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitbuh = nameslpit.split("_");
                $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitbuh[1] + "</option>");
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


        if (CurrentUserRole != 'rl2') {
            FillTeamsbyBUH();
        } else if (CurrentUserRole == 'rl2') {
            value = '-1';
            name = 'Select ' + $('#Label8').text();

            $("#dG4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitnsm = nameslpit.split("_");
                $("#dG4").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
            });
        }

        //if (CurrentUserRole == 'ftm') {
        //    SetRegionHierarchyForFTM();
        //}
    }

}
function onSuccessG3WithTeam(data, status) {

    if (data.d != '') {




        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            if ($("#ddl2").val() != null && $("#dG2").val() == null) {
                value = '-1';
                name = 'Select ' + $('#Label6').text();

                $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

                $.each(data.d, function (i, tweet) {
                    var nameslpit = tweet.Item2;
                    var splitnsm = nameslpit.split("_");
                    $("#dG2").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
                });

            } else if ($("#ddl2").val() != null) {
                value = '-1';
                name = 'Select ' + $('#Label7').text();

                $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

                $.each(data.d, function (i, tweet) {
                    var nameslpit = tweet.Item2;
                    var splitnsm = nameslpit.split("_");
                    $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
                });
            }







        } else if (CurrentUserRole == 'rl1') {
            document.getElementById('dG7').innerHTML = "";
            //if ($("#dG7").val() != null) {
            //    value = '-1';
            //    name = 'Select ' + $('#Label8').text();

            //    $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            //    $.each(data.d, function (i, tweet) {
            //        var nameslpit = tweet.Item2;
            //        var splitnsm = nameslpit.split("_");
            //        $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
            //    });
            //    if (CurrentUserRole == 'ftm') {
            //        SetRegionHierarchyForFTM();
            //    }
            //} else {
            value = '-1';
            name = 'Select ' + $('#Label13').text();

            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitnsm = nameslpit.split("_");
                $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
            });
            //}


        }
        else if (CurrentUserRole == 'rl2') {

            document.getElementById('dG7').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label13').text();

            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitnsm = nameslpit.split("_");
                $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
            });



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
            name = 'Select ' + $('#Label6').text();

            $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitrsm = nameslpit.split("_");
                $("#dG2").append("<option value='" + tweet.Item1 + "'>" + splitrsm[1] + "</option>");
            });
        }
    } else if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2') {
        if (data.d != '') {
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";


            value = '-1';
            name = 'Select ' + $('#Label8').text();

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

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddl2').val();
        teamId = $('#dG1').val();
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
    } else if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddl2').val();
        teamId = $('#dG1').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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

        levelValue = $('#ddl2').val();
        teamId = $('#dG3').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel3",
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
    } else if (CurrentUserRole == 'rl2') {

        levelValue = $('#ddl3').val();
        teamId = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
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
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddl3').val();
        teamId = $('#dG1').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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

        levelValue = $('#ddlTeam').val();
        teamId = $('#dG3').val();
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
    } else if (CurrentUserRole == 'rl2') {
        levelValue = $('#ddlTeam').val();
        teamId = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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
        levelValue = $('#dG3').val();
        teamId = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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


    if (CurrentUserRole == 'rl1') {

        levelValue = $('#ddl4').val();
        var teamid = $('#dG3').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        //levelValue = $('#ddl4').val();
        //myData = "{'employeeId':'" + levelValue + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel5",
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

    } else if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
        levelValue = $('#ddl4').val();
        var teamid = $('#dG7').val();
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
        var teamid = $('#dG2').val();
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
    teamId = $('#dG7').val();
    myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/GetEmployee",
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

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";


    if (CurrentUserRole == 'rl1') {
        if (data.d != "") {

            jsonObj = JSON.parse(data.d);
            document.getElementById('ddl2').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label2').text();

            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }

    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        if (data.d != "") {

            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label3').text();

            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }
    } else if (CurrentUserRole == 'rl4') {
        if (data.d != "") {
            document.getElementById('ddlTeam').innerHTML = "";
            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label2').text();

            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }
    } else {
        document.getElementById('ddl2').innerHTML = "";
        if ($("#ddlTeam").val() == "-1") {

        } else {


            if (data.d != "") {

                jsonObj = JSON.parse(data.d);

                value = '-1';
                name = 'Select ' + $('#Label2').text();

                $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

                $.each(jsonObj, function (i, tweet) {
                    $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                });
            }
        }
    }


}
function onSuccessUH4(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (CurrentUserRole == 'rl1') {
        FillTeamsbyBUH();
    } else if (CurrentUserRole == 'rl2' || CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        if (data.d != "") {
            document.getElementById('ddlTeam').innerHTML = "";
            jsonObj = JSON.parse(data.d);
            value = '-1';
            name = 'Select ' + $('#Label14').text();
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }
    } else {
        if (data.d != "") {
            document.getElementById('ddl3').innerHTML = "";
            jsonObj = JSON.parse(data.d);
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
        if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2') {


            jsonObj = JSON.parse(data.d);
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

        jsonObj = JSON.parse(data.d);
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

        jsonObj = JSON.parse(data.d);
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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

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

        $('#h5').val($('#dG2').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'headoffice') {

        $('#h5').val($('#dG2').val());

        level1 = 0
        level2 = 0
        level3 = 0
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl4') {

        $('#h12').val($('#dG2').val());

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

    //setvalue();
    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

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

        $('#h5').val($('#dG3').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl3') {

        $('#h12').val($('#dG3').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'headoffice') {

        $('#h12').val($('#dG3').val());

        level1 = 0
        level2 = 0
        level3 = 0
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl4') {

        $('#h13').val($('#dG7').val());

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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

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

        $('#h5').val($('#dG7').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl2') {

        $('#h12').val($('#dG7').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl3') {

        $('#h13').val($('#dG7').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = $('#h13').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'headoffice') {


        $('#h13').val($('#dG7').val());

        level1 = 0
        level2 = 0
        level3 = 0
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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

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
    if (CurrentUserRole == 'headoffice') {

        $('#h13').val($('#dG4').val());

        level1 = 0
        level2 = 0
        level3 = 0
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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

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

    setvalue();

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

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
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#ddl2').val(data.d[0].Item1).select2()
        } else if (CurrentUserRole == 'rl4') {
            $('#ddl2').val(data.d[0].Item1).select2()
        } else {
            $('#ddl1').val(data.d[0].Item1).select2()
        }

    }
    else {
        $('#ddl1').val(-1)
    }
    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm' || CurrentUserRole == 'marketingteam' ||
           CurrentUserRole == 'rl1' || CurrentUserRole == 'rl3' ||
           CurrentUserRole == 'rl4' || CurrentUserRole == 'rl5' || CurrentUserRole == 'headoffice') {
        UH3();
    }

}
function onSuccessG3b(data, status) {

    if (data != '') {
        if (CurrentUserRole == 'rl4') {
            $('#ddlTeam').val(data.d[0].Item1).select2()
        } else if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'rl1') {
            $('#ddl2').val(data.d[0].Item1).select2()
        } else {
            $('#ddl3').val(data.d[0].Item1).select2()
        }
        if (CurrentUserRole == 'rl4') {
            $('#h6').val(data.d[0].Item1)
        }
    }
    else {
        $('#ddl2').val(-1)
    }
    if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2' || CurrentUserRole == 'rl3' ||
           CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm' || CurrentUserRole == 'marketingteam' || CurrentUserRole == 'headoffice') {
        UH4();
    }

}
function onSuccessG3c(data, status) {

    if (data != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
            $('#ddl3').val(data.d[0].Item1).select2()
        } else {
            $('#ddlTeam').val(data.d[0].Item1).select2()
        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#h6').val(data.d[0].Item1)

        }

    }
    else {
        //$('#ddl3').val(-1)
    }


    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm' || CurrentUserRole == 'rl1' ||
        CurrentUserRole == 'rl2' || CurrentUserRole == 'marketingteam') {
        UH5();
    }

}
function onSuccessG3d(data, status) {

    if (data != '') {

        $('#ddl4').val(data.d[0].Item1).select2()

        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#h6').val(data.d[0].Item1)
        }

    }
    else {
        $('#ddl4').val(-1)
    }

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm' || CurrentUserRole == 'rl1' ||
           CurrentUserRole == 'rl2' || CurrentUserRole == 'marketingteam') {
        UH6();
    }

}
function onSuccessG3e(data, status) {

    if (data != '') {
        $('#ddl5').val(data.d[0].Item1).select2()

        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#h6').val(data.d[0].Item1)
        }
    }
    else {
        $('#ddl5').val(-1)
    }

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm' || CurrentUserRole == 'rl1' ||
        CurrentUserRole == 'rl2' || CurrentUserRole == 'marketingteam') {
        UH7();
    }
}
function onSuccessG3f(data, status) {

    if (data != '') {

        $('#ddl6').val(data.d[0].Item1).select2()
        $('#h6').val(data.d[0].Item1);


    }
    else {
        $('#ddl6').val(-1)
    }
    UH8();

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

        jsonObj = JSON.parse(data.d);

        if (glbVarLevelName == "Level1") {
            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            value = '-1';
            //farazlabel
            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                name = 'Select ' + HierarchyLevel1;
                $('#Label1').append(HierarchyLevel1 + " " + "");
                $('#Label2').append(HierarchyLevel2 + " " + "");
                $('#Label3').append(HierarchyLevel3 + " " + "");
                $('#Label4').append(HierarchyLevel4 + " " + "");
                $('#Label9').append(HierarchyLevel5 + " " + "");
                $('#Label10').append(HierarchyLevel6 + " " + "-TMs");
                $('#Label14').append("Team");

                $('#Label5').append(HierarchyLevel1 + " " + "Level ");
                $('#Label6').append(HierarchyLevel2 + " " + "Level ");
                $('#Label7').append(HierarchyLevel3 + " " + "Level ");
                $('#Label8').append(HierarchyLevel4 + " " + "Level ");
                $('#Label11').append(HierarchyLevel5 + " " + "Level ");
                $('#Label12').append(HierarchyLevel6 + " " + "Level ");
                $('#Label13').append("Team");
            }
            if (CurrentUserRole == 'rl1') {
                name = 'Select ' + HierarchyLevel2;
                $('#Label1').append(HierarchyLevel2 + " " + "");
                $('#Label2').append(HierarchyLevel3 + " " + "");
                $('#Label3').append("Team");
                $('#Label14').append(HierarchyLevel4 + " " + "");
                $('#Label4').append(HierarchyLevel5 + " " + "");
                $('#Label9').append(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').append(HierarchyLevel2 + " " + "Level ");
                $('#Label6').append(HierarchyLevel3 + " " + "Level ");
                $('#Label7').append("Team");
                $('#Label13').append(HierarchyLevel4 + " " + "Level ");
                $('#Label8').append(HierarchyLevel5 + " " + "Level ");
                $('#Label11').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl2') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "");
                $('#Label2').append("Team");
                $('#Label3').append(HierarchyLevel4 + " " + "");
                $('#Label14').append(HierarchyLevel5 + " " + "");
                $('#Label4').append(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append("Team");
                $('#Label7').append(HierarchyLevel4 + " " + "Level ");
                $('#Label13').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append("Team");
                $('#Label2').append(HierarchyLevel4 + " " + "");
                $('#Label3').append(HierarchyLevel5 + " " + "-TMs ");
                $('#Label14').append(HierarchyLevel6 + " " + "-TMs ");


                $('#Label5').append("Team");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label13').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append("Team");
                $('#Label2').append(HierarchyLevel5 + " " + "-TMs ");
                $('#Label14').append(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').append("Team");
                $('#Label6').append(HierarchyLevel5 + " " + "Level ");
                $('#Label13').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "-TMs ");
                $('#Label5').append(HierarchyLevel6 + " " + "Level ");
                $('#col77').hide();
                $('.Th12').hide();
            }

            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'rl4' || CurrentUserRole == 'headoffice') {

            } else {

                name = 'Select ' + $('#Label1').text();
                $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

                $.each(jsonObj, function (i, tweet) {
                    $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                });
            }


        }
        else if (glbVarLevelName == "Level3") {

            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";

            value = '-1';

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "");
                $('#Label2').append(HierarchyLevel4 + " " + "");
                $('#Label3').append(HierarchyLevel5 + " " + "");
                $('#Label4').append(HierarchyLevel6 + " " + "-TMs");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'marketingteam') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "");
                $('#Label2').append(HierarchyLevel4 + " " + "");
                $('#Label3').append(HierarchyLevel5 + " " + "");
                $('#Label4').append(HierarchyLevel6 + " " + "-TMs");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append(HierarchyLevel4 + " " + "");
                $('#Label2').append(HierarchyLevel5 + " " + "");
                $('#Label3').append(HierarchyLevel6 + " " + "-TMs ");


                $('#Label5').append(HierarchyLevel4 + " " + "Level ");
                $('#Label6').append(HierarchyLevel5 + " " + "Level ");
                $('#Label7').append(HierarchyLevel6 + " " + "Level ");



            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append(HierarchyLevel5 + " " + "");
                $('#Label2').append(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').append(HierarchyLevel5 + " " + "Level ");
                $('#Label6').append(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "-TMs");
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

    $('#btnShowResult').hide();
    $('#uploadify_button2').hide();
    $('#exportExcel2').hide();
}

function onError(request, status, error) {

    msg = 'Error occoured';

    $old.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });

}

function onErrorDt() {

    $old('#dialog').jqmHide();
    msg = 'Date Error';
    $old.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });

    $old('#dialog').jqmHide();

}
function startingAjax() {
     // $('#imgLoading').show();
        //$old('#dialog').jqm({ modal: true });
        //$old('#dialog').jqm();
    //$old('#dialog').jqmShow();

       

}
function ajaxCompleted() {

   //$old('#dialog').hide();
   // $('.loading').fadeOut('slow');
   // $('.loading_bgrd').fadeOut('slow');
   //$('#imgLoading').hide();
}

function ajaxstar() {
    $('#content').parent().find('.loding_box_outer').show().fadeIn();
    $('#content').parent().find('.divLodingGrid').show().fadeIn();
}

function ajaxcom() {
    $('#content').parent().find('.loding_box_outer').css("display","none");
    $('#content').parent().find('.divLodingGrid').css("display", "none");
}

function setvalue() {

    $('#h2').val(-1);
    $('#h3').val(-1);
    $('#h4').val(-1);
    $('#h5').val(-1);
    $('#h6').val(-1);

}

function SetGMHierarchyForFTM() {

    $.ajax({
        type: "POST",
        url: "../Form/QuizTestService.asmx/SetHierarchyForFTM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessSetGMHierarchyForFTM,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });

}
function onSuccessSetGMHierarchyForFTM(data, status) {

    if (data.d != '') {
        // set GMids ids only

        var jsonObj = JSON.parse(data.d);
        $.each(jsonObj[1], function (i, tweet) {
            GMids.push(tweet.EmployeeId)
        });

        // get unique GMids id from array
        GMids = GMids.filter(function (itm, i, GMids) {
            return i == GMids.indexOf(itm);
        });

        // show and hide GMids dropdown options
        $("#ddl1").children('option').hide();
        $("#ddl1").children("option[value='-1']").show()
        $.each(GMids, function (i, tweet) {
            $("#ddl1").children("option[value='" + tweet + "']").show()
        });


        // set GMids team ids only
        $.each(jsonObj[1], function (i, tweet) {
            GMteams.push(tweet.Level1LevelId)
        });

        // get unique GMteams id from array
        GMteams = GMteams.filter(function (itm, i, GMteams) {
            return i == GMteams.indexOf(itm);
        });


        // show and hide national team dropdown options
        $("#dG1").children('option').hide();
        $("#dG1").children("option[value='-1']").show()
        $.each(GMteams, function (i, tweet) {
            $("#dG1").children("option[value='" + tweet + "']").show()
        });

        // set BUHids ids only
        $.each(jsonObj[2], function (i, tweet) {
            BUHids.push(tweet.EmployeeId)
        });

        // get unique BUHids id from array
        BUHids = BUHids.filter(function (itm, i, BUHids) {
            return i == BUHids.indexOf(itm);
        });

        // show and hide national dropdown options
        $("#ddl2").children('option').hide();
        $("#ddl2").children("option[value='-1']").show()
        $.each(BUHids, function (i, tweet) {
            $("#ddl2").children("option[value='" + tweet + "']").show()
        });


        // set BUHteams team ids only
        $.each(jsonObj[2], function (i, tweet) {
            BUHteams.push(tweet.Level2LevelId)
        });

        // get unique BUHteams id from array
        BUHteams = BUHteams.filter(function (itm, i, BUHteams) {
            return i == BUHteams.indexOf(itm);
        });


        // show and hide BUHteams team dropdown options
        $("#dG2").children('option').hide();
        $("#dG2").children("option[value='-1']").show()
        $.each(BUHteams, function (i, tweet) {
            $("#dG2").children("option[value='" + tweet + "']").show()
        });


        // set national ids only
        $.each(jsonObj[3], function (i, tweet) {
            nationalids.push(tweet.EmployeeId)
        });

        // get unique national id from array
        nationalids = nationalids.filter(function (itm, i, nationalids) {
            return i == nationalids.indexOf(itm);
        });

        // show and hide national dropdown options
        $("#ddl3").children('option').hide();
        $("#ddl3").children("option[value='-1']").show()
        $.each(nationalids, function (i, tweet) {
            $("#ddl3").children("option[value='" + tweet + "']").show()
        });


        // set national team ids only
        $.each(jsonObj[3], function (i, tweet) {
            nationalteams.push(tweet.Level3LevelId)
        });

        // get unique national id from array
        nationalteams = nationalteams.filter(function (itm, i, nationalteams) {
            return i == nationalteams.indexOf(itm);
        });


        // show and hide national team dropdown options
        $("#dG3").children('option').hide();
        $("#dG3").children("option[value='-1']").show()
        $.each(nationalteams, function (i, tweet) {
            $("#dG3").children("option[value='" + tweet + "']").show()
        });


        // set region ids only        
        $.each(jsonObj[4], function (i, tweet) {
            regionids.push(tweet.EmployeeId)
        });

        // get unique region id from array
        regionids = regionids.filter(function (itm, i, regionids) {
            return i == regionids.indexOf(itm);
        });

        // set region team ids only
        $.each(jsonObj[4], function (i, tweet) {
            regionteams.push(tweet.Level4LevelId)
        });

        // get unique region id from array
        regionteams = regionteams.filter(function (itm, i, regionteams) {
            return i == regionteams.indexOf(itm);
        });

    }

}

function SetBUHHierarchyForFTM() {
    // show and hide region dropdown options
    $("#ddl2").children('option').hide();
    $("#ddl2").children("option[value='-1']").show()
    $.each(BUHids, function (i, tweet) {
        $("#ddl2").children("option[value='" + tweet + "']").show()
    });

    // show and hide region team dropdown options
    $("#dG2").children('option').hide();
    $("#dG2").children("option[value='-1']").show()
    $.each(BUHteams, function (i, tweet) {
        $("#dG2").children("option[value='" + tweet + "']").show()
    });

}
function SetNationalHierarchyForFTM() {
    // show and hide region dropdown options
    $("#ddl3").children('option').hide();
    $("#ddl3").children("option[value='-1']").show()
    $.each(nationalids, function (i, tweet) {
        $("#ddl3").children("option[value='" + tweet + "']").show()
    });

    // show and hide region team dropdown options
    $("#dG3").children('option').hide();
    $("#dG3").children("option[value='-1']").show()
    $.each(nationalteams, function (i, tweet) {
        $("#dG3").children("option[value='" + tweet + "']").show()
    });

}
function SetRegionHierarchyForFTM() {

    // show and hide region dropdown options
    $("#ddl4").children('option').hide();
    $("#ddl4").children("option[value='-1']").show()
    $.each(regionids, function (i, tweet) {
        $("#ddl4").children("option[value='" + tweet + "']").show()
    });

    // show and hide region team dropdown options
    $("#dG4").children('option').hide();
    $("#dG4").children("option[value='-1']").show()
    $.each(regionteams, function (i, tweet) {
        $("#dG4").children("option[value='" + tweet + "']").show()
    });

}
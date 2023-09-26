// Global Variables
var ID = 0;
var myData = "", mode = "", msg = "", jsonObj = "";

// Event
function pageLoad() {

    ClearFields();

    FillRegion();
    FillDistributorType();
    GetDataInGrid();
    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);

    $('#btnOk').click(btnOkClicked);

    $('#btnSave').hide();
    //Disaple txt
    $("#ddl1").attr("disabled", "disabled");
    $("#ddl3").attr("disabled", "disabled");
    $("#txtCode").attr("disabled", "disabled");
    $("#DistType").attr("disabled", "disabled");
    $("#ddl2").attr("disabled", "disabled");
    $("#ddl4").attr("disabled", "disabled");
    $("#txtName").attr("disabled", "disabled");
    $("#txtAllowDays").attr("disabled", "disabled");



    //  $('#divConfirmation').jqm({ modal: true });
    //  $('#Divmessage').jqm({ modal: true });
    $("#ddl1").change(function () {
        $('#ddl2').val('-1');
        $('#ddl3').val('-1');
        $('#ddl4').val('-1');
        FillSubRegion($('#ddl1').val());
    });
    $("#ddl2").change(function () {
        FillDistrict($('#ddl2').val());
    });
    $("#ddl3").change(function () {
        FillCity($('#ddl3').val());
    });
}

function GetDataInGrid() {
    try {

        $.ajax({
            type: "POST",
            url: "../BWSD/SalesDistributorService.asmx/GetAllSalesDistributor",
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
        alert(e);
        // Console.log(e.description);
    }
}
function onSuccessGridFill(response, data, status) {

    if (response.d != 'No') {
        var jsonObj = $.parseJSON(response.d);
        var tablestring = "<table id='datatables' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'><thead>" +// class='column-options' 
                      "<tr style='background-color: #217ebd;color: white;'>" +// RegionID,	RegionName,	SubRegionID	,SubRegionName,	DistrictID,	DistrictName,	CityID,	City,	DistributorID,	DistributorName,	IsActive

                       "<th > Region  </th>" +
                       "<th > Sub Region</th>" +
                       "<th > District </th>" +
                       "<th > City NDD Code</th>" +
                       "<th > City  </th>" +
                       "<th > Distributor Code </th>" +
                       "<th > Distributor </th>" +
                       "<th > Holiday </th>" +
                       "<th > Status </th>" +
                       "<th > Type </th>" +
                       "<th > Action </th>" +
                  //     "<th > Approved </th>" +
             "</tr></thead>" +
            "<tbody id='values'>";

        $("#divdistrib").empty();
        $("#divdistrib").append(tablestring);
        var apro = '';

        for (var i = 0; i < jsonObj.length ; i++) {

            //  apro = jsonObj[i].Status == 'True' ? "<a href='#' class='buttonlinkgreen not-active' onclick='btnApproved(\"" + jsonObj[i].ID + "\",\"" + jsonObj[i].DoctorID + "\",\"" + jsonObj[i].nLatitude + "\",\"" + jsonObj[i].nLongitude + "\",\"" + jsonObj[i].nAddress + "\");return false'>Approved</a> " : "<a href='#' class='buttonlink' onclick='btnApproved(\"" + jsonObj[i].ID + "\",\"" + jsonObj[i].DoctorID + "\",\"" + jsonObj[i].nLatitude + "\",\"" + jsonObj[i].nLongitude + "\",\"" + jsonObj[i].nAddress + "\");return false'>Approved</a> ";
            $('#values').append($('<tr>' +
              "<td >" + jsonObj[i].RegionName + "</td>" +
              "<td >" + jsonObj[i].SubRegionName + "</td>" +
              "<td >" + jsonObj[i].DistrictName + "</td>" +
              "<td >" + jsonObj[i].City_NDD_Code + "</td>" +
              "<td >" + jsonObj[i].City + "</td>" +
               "<td >" + jsonObj[i].DistributorCode + "</td>" +
              "<td >" + jsonObj[i].DistributorName + "</td>" +
              "<td >" + jsonObj[i].Holiday + "</td>" +
              "<td >" + jsonObj[i].IsActive + "</td>" +
              "<td >" + jsonObj[i].DistTypeName + "</td>" +
              //"<td  >" + " <a href='#'  onclick='oGrid_Edit(\"" + jsonObj[i].DistributorID + "\");return false'>Edit</a> " + "<a href='#'  onclick='oGrid_Delete(\"" + jsonObj[i].DistributorID + "\");return false'>Remove</a>" + "</td>" +
              "<td  >" + " <a href='#'  onclick='oGrid_Edit(\"" + jsonObj[i].DistributorID + "\");return false'>Edit</a> " + "</td>" +
              //  "<td  >" + apro + "</td>" +
           "</tr>"));
        }

        $("#divdistrib").append('</tbody></table>');
        $('#datatables').DataTable();
    }
    else {
        var tablestring = "<table id='datatables' class='column-options' ><thead>" +
                    "<tr >" +
                     "<th > Region  </th>" +
                       "<th > Sub Region</th>" +
                       "<th > District </th>" +
                       "<th > City  </th>" +
                          "<th > Distributor code </th>" +
                       "<th > Distributor </th>" +
                       "<th > Status </th>" +
                       "<th > Action </th>" +
           "</tr></thead>" +
          "<tbody id='values'>";

        $("#divdistrib").empty();
        $("#divdistrib").append(tablestring);

        $("<div title='Alert'>Not Found.</div>").dialog();
        //alert('Data Not Found');
    }

}


function btnSaveClicked() {

    //var isValidated = $('#form1').validate({
    //    rules: {
    //        txtName: {
    //            required: true,
    //            // alpha : true
    //        }
    //    }
    //});

    //if (!$('#form1').valid()) {
    //    return false;
    //}

    mode = $('#hdnMode').val();

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
    ajaxCompleted();
    $("#btnRefresh").trigger('click');
    return false;
}

function btnYesClicked() {

    myData = "{'ID':'" + ID + "'}";

    $.ajax({
        type: "POST",
        url: "../BWSD/SalesDistributorService.asmx/DeleteSalesDistributor",
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
function btnNoClicked() {

    $('#divConfirmation').jqmHide();
    $('#hdnMode').val("AddMode");
    ClearFields();
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
function SaveData() {
    var city = $('#ddl4').val();
    var txtCode = $('#txtCode').val();
    var txtName = $('#txtName').val();
    var txtDistType = $('#DistType').val();
    //Other Details of Distributor New Work Meraj 
    var Address = $('#txtAddress').val();
    var PhoneNo = $('#txtPhoneNo').val();
    var EmailAddress1 = $('#txtEmailAddress1').val();
    var EmailAddress2 = $('#txtEmailAddress2').val();
    var OwnerName = $('#txtOwnerName').val();
    var OwnerMobile = $('#txtOwnerMobile').val();
    var ContactPersonName = $('#txtContactPersonName').val();
    var ContactPersonMobile = $('#txtContactPersonMobile').val();
    var TotalNoofStaff = $('#txtTotalNoofStaff').val();
    var DistSoftname = $('#txtDistSoftname').val();
    var ProgrammerName = $('#txtProgrammerName').val();
    var DistClient = $('#txtDistClient').val();
    var ContactPersonDesg = $('#txtContactPersonDesg').val();
    var DrugSalesLicenseNo = $('#txtDrugSalesLicenseNo').val();
    var Holiday = $('#txtHoliday').val();

    if (city == '-1') {
        $("#colcity").addClass("has-error");

        return false;
    }
    else {
        $("#colcity").removeClass("has-error");
    }
    if (txtCode == '') {
        $("#colcode").addClass("has-error");
        return false;
    }
    else {
        $("#colcode").removeClass("has-error");
    }

    if (txtName == '') {
        $("#colname").addClass("has-error");
        return false;
    }
    else {
        $("#colname").removeClass("has-error");
    }

    myData = "{'CityID':'" + $('#ddl4').val() + "', 'DistributorCode':'" + $('#txtCode').val() + "', 'DistributorName':'" + $('#txtName').val() + "','isActive':'" + ($('#chkActive').attr("checked") == 'checked' ? 'true' : 'false') + "', 'DistributorType':'" + $('#DistType').val() +
        "', 'Address':'" + $('#txtAddress').val() + "', 'PhoneNo':'" + $('#txtPhoneNo').val() +
        "', 'EmailAddress1':'" + $('#txtEmailAddress1').val() + "', 'EmailAddress2':'" + $('#txtEmailAddress2').val() +
        "', 'OwnerName':'" + $('#txtOwnerName').val() + "', 'OwnerMobile':'" + $('#txtOwnerMobile').val() +
        "', 'ContactPersonName':'" + $('#txtContactPersonName').val() + "', 'ContactPersonMobile':'" + $('#txtContactPersonMobile').val() +
        "', 'TotalNoofStaff':'" + $('#txtTotalNoofStaff').val() + "', 'DistSoftname':'" + $('#txtDistSoftname').val() +
        "', 'ProgrammerName':'" + $('#txtProgrammerName').val() + "', 'ContactPersonDesg':'" + $('#txtContactPersonDesg').val() +
        "', 'DistClient':'" + $('#txtDistClient').val() + "', 'DrugSalesLicenseNo':'" + $('#txtDrugSalesLicenseNo').val() + "', 'Holiday':'" + $('#txtHoliday').val() + "'}";
    try {
        $.ajax({
            type: "POST",
            url: "../BWSD/SalesDistributorService.asmx/InsertSalesDistributor",
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
    catch (e) {
        alert(e);
        // Console.log(e.description);
    }
}
function oGrid_Edit(sender) {

    $('#hdnMode').val("EditMode");
    ID = sender.toString();

    myData = "{'ID':'" + ID + "'}";

    $.ajax({
        type: "POST",
        url: "../BWSD/SalesDistributorService.asmx/GetSalesDistributor",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetSalesDistributor,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender) {
    $('#hdnMode').val("DeleteMode");
    ID = sender;
    myData = "{'ID':'" + ID + "'}";

    $("<div><p> Are you sure to delete this record(s)?</p></div>").dialog({
        resizable: false,
        modal: true,
        title: "Confirmation",
        height: 150,
        width: 310,
        buttons: {
            "Yes": function () {


                $.ajax({
                    type: "POST",
                    url: "../BWSD/SalesDistributorService.asmx/DeleteSalesDistributor",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccess,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
                $(this).dialog('close');
                // callback(true);
            },
            "No": function () {
                $(this).dialog('close');
                //callback(false);
            }
        }
    });

    //  $('#divConfirmation').jqmShow();
}
function UpdateData() {
    debugger
    if ($('#ddl4').val() == '-1') {
        alert('select City');
        return false;
    }
    //myData = "{'ID':'" + ID + "','CityID':'" + $('#ddl4').val() + "', 'DistributorCode':'" + $('#txtCode').val() + "','DistributorName':'" + $('#txtName').val() + "','isActive':'" + ($('#chkActive').attr("checked") == 'checked' ? 'true' : 'false') + "', 'DistributorType':'" + $('#DistType').val() +
    // "', 'Address':'" + $('#txtAddress').val() + "', 'PhoneNo':'" + $('#txtPhoneNo').val() +
    //    "', 'EmailAddress1':'" + $('#txtEmailAddress1').val() + "', 'EmailAddress2':'" + $('#txtEmailAddress2').val() +
    //    "', 'OwnerName':'" + $('#txtOwnerName').val() + "', 'OwnerMobile':'" + $('#txtOwnerMobile').val() +
    //    "', 'ContactPersonName':'" + $('#txtContactPersonName').val() + "', 'ContactPersonMobile':'" + $('#txtContactPersonMobile').val() +
    //    "', 'TotalNoofStaff':'" + $('#txtTotalNoofStaff').val() + "', 'DistSoftname':'" + $('#txtDistSoftname').val() +
    //    "', 'ProgrammerName':'" + $('#txtProgrammerName').val() + "', 'ContactPersonDesg':'" + $('#txtContactPersonDesg').val() +
    //    "', 'DistClient':'" + $('#txtDistClient').val() + "', 'DrugSalesLicenseNo':'" + $('#txtDrugSalesLicenseNo').val() + "', 'Holiday':'" + $('#txtHoliday').val() + "'}";

    //$.ajax({
    //    type: "POST",
    //    url: "../BWSD/SalesDistributorService.asmx/UpdateSalesDistributor",
    //    data: myData,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: onSuccess,
    //    error: onError,
    //    beforeSend: startingAjax,
    //    complete: ajaxCompleted,
    //    cache: false

    myData = "{'ID':'" + ID + "','CityID':'" + $('#ddl4').val() + "', 'DistributorCode':'" + $('#txtCode').val() + "','DistributorName':'" + $('#txtName').val() + "','AllowsDays':'" + $('#txtAllowDays').val() + "'}";

    $.ajax({
        type: "POST",
        url: "../BWSD/SalesDistributorService.asmx/UpdateSalesDistributorAllow",
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

function ajaxCompleted() {
    $('#dialog').hide();
}
function onSuccessGetSalesDistributor(data, status) {

    if (data.d != "") {

        ClearFields();
        var jsonObj = jsonParse(data.d);
        //	DistrictID,	DistrictName,	CityID,
        $('#ddl1').val(jsonObj[0].RegionID);
        FillSubRegion(jsonObj[0].RegionID);
        $('#ddl2').val(jsonObj[0].SubRegionID);
        FillDistrict(jsonObj[0].SubRegionID);
        $('#ddl3').val(jsonObj[0].DistrictID);
        FillCity(jsonObj[0].DistrictID);
        $('#ddl4').val(jsonObj[0].CityID);

        var distType = jsonObj[0].DistType;
        if (distType == '') {
            $('#DistType').val('-1');
        }
        else {
            $('#DistType').val(jsonObj[0].DistType);
        }

        $('#txtCode').val(jsonObj[0].DistributorCode);
        $('#txtName').val(jsonObj[0].DistributorName);
        $('#chkActive').attr("checked", jsonObj[0].isactive);

        //Other Details
        $('#txtAddress').val(jsonObj[0].Address1);
        $('#txtPhoneNo').val(jsonObj[0].PhoneNo);
        $('#txtEmailAddress1').val(jsonObj[0].Email1);
        $('#txtEmailAddress2').val(jsonObj[0].Email2);
        $('#txtOwnerName').val(jsonObj[0].Owner_Name);
        $('#txtOwnerMobile').val(jsonObj[0].Owner_mobile);
        $('#txtContactPersonName').val(jsonObj[0].Contact_PersonName);
        $('#txtContactPersonMobile').val(jsonObj[0].Contact_PersonMobile);
        $('#txtTotalNoofStaff').val(jsonObj[0].TotalNoOfStaff);
        $('#txtDistSoftname').val(jsonObj[0].Distributor_Software_Name);
        $('#txtProgrammerName').val(jsonObj[0].Programmer_Name);
        $('#txtDistClient').val(jsonObj[0].Distributor_Clients);
        $('#txtContactPersonDesg').val(jsonObj[0].Contact_PersonDesignation);
        $('#txtDrugSalesLicenseNo').val(jsonObj[0].Drug_Sales_Lisense_No);
        $('#txtHoliday').val(jsonObj[0].Holiday);

        //IsAllows
        $('#txtAllowDays').val(jsonObj[0].IsAllowDaya);

        //Disaple txt
        $("#ddl1").attr("disabled", "disabled");
        $("#ddl3").attr("disabled", "disabled");
        $("#txtCode").attr("disabled", "disabled");
        $("#DistType").attr("disabled", "disabled");
        $("#ddl2").attr("disabled", "disabled");
        $("#ddl4").attr("disabled", "disabled");
        $("#txtName").attr("disabled", "disabled");

        $("#txtAllowDays").prop('disabled', false);

        $('#btnSave').show();


    }
}

function onSuccess(data, status) {

    if (data.d == "OK") {
        var mode = $('#hdnMode').val();

        if (mode === "AddMode") {
            toastr.info('Data inserted succesfully!', 'Alert', {
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
        else if (mode === "EditMode") {
            toastr.info('Data updated succesfully!', 'Alert', {
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
        else if (mode === "DeleteMode") {
            toastr.info('Data deleted succesfully! ', 'Alert', {
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

        ClearFields();
        GetDataInGrid();
        $('#hdnMode').val("");


    }
    else if (data.d == "Duplicate Name!") {


        toastr.info('Distributor already exist! Try different ', 'Alert', {
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
        return false;
    }
        //new
    else if (data.d == "error") {

        var mode = $('#hdnMode').val();

        if (mode === "AddMode") {

            toastr.info('Error Occurs in Insert', 'Alert', {
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
            return false;
        }
        else if (mode === "EditMode") {

            toastr.info('Error Occurs in Update', 'Alert', {
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
            return false;
        }
    }

}
function onError(request, status, error) {


    toastr.info(error, 'Alert', {
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
function startingAjax() {

    $('#dialog').show();
}
function ClearFields() {
    $('#ddl1').val('-1');
    $('#ddl2').val('-1');
    $('#ddl3').val('-1');
    $('#ddl4').val('-1');
    $('#DistType').val('-1');
    $('#txtCode').val("");
    $('#txtName').val("");
    $('#chkActive').attr("checked", true);
    //Other Details
    $('#txtAddress').val("");
    $('#txtPhoneNo').val("");
    $('#txtEmailAddress1').val("");
    $('#txtEmailAddress2').val("");
    $('#txtOwnerName').val("");
    $('#txtOwnerMobile').val("");
    $('#txtContactPersonName').val("");
    $('#txtContactPersonMobile').val("");
    $('#txtTotalNoofStaff').val("");
    $('#txtDistSoftname').val("");
    $('#txtProgrammerName').val("");
    $('#txtDistClient').val("");
    $('#txtContactPersonDesg').val("");
    $('#txtDrugSalesLicenseNo').val("");

}

function FillRegion() {
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesDistributorService.asmx/GetAllRegion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {

            $('#ddl1').empty();
            $("#ddl1").append("<option value='-1'>Select Region</option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $("#ddl1").append("<option value='" + option.RegionID + "'>" + option.RegionName + "</option>");
                });
            }

        },

        error: onError,
        cache: false

    });
}

function FillDistributorType() {
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesDistributorService.asmx/GetAllDistType",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {

            $('#DistType').empty();
            $("#DistType").append("<option value='-1'>Select Type</option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $("#DistType").append("<option value='" + option.Id + "'>" + option.DistTypeName + "</option>");
                });
            }

        },

        error: onError,
        cache: false

    });
}

function FillSubRegion(id) {
    myData = "{'ID':'" + id + "'}";
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesDistributorService.asmx/GetAllSubRegion",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {

            $('#ddl2').empty();
            $("#ddl2").append("<option value='-1'>Select Sub Region</option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $("#ddl2").append("<option value='" + option.SubRegionID + "'>" + option.SubRegionName + "</option>");
                });
            }

        },

        error: onError,
        cache: false

    });
}

function FillDistrict(id) {
    myData = "{'ID':'" + id + "'}";
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesDistributorService.asmx/GetAllDistrict",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {

            $('#ddl3').empty();
            $("#ddl3").append("<option value='-1'>Select District </option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {//DistrictID,d.DistrictName
                    $("#ddl3").append("<option value='" + option.DistrictID + "'>" + option.DistrictName + "</option>");
                });
            }

        },

        error: onError,
        cache: false

    });
}

function FillCity(id) {
    myData = "{'ID':'" + id + "'}";
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesDistributorService.asmx/GetAllCity",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {

            $('#ddl4').empty();
            $("#ddl4").append("<option value='-1'>Select City </option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $("#ddl4").append("<option value='" + option.CityID + "'>" + option.City + "</option>");
                });
            }

        },

        error: onError,
        cache: false

    });
}

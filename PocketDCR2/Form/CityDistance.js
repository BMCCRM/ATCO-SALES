// Global Variables
var CityDistanceId = 0;
var mode = "", myData = "", jsonObj = "", msg = "";

// Events
function pageLoad() {

    $('#ddlFromCity').select2({
        dropdownParent: $('#colSpeciality')
    });
    $('#ddlToCity').select2({
        dropdownParent: $('#colCity')
    });
    $('#ddldist').select2({
        dropdownParent: $('#distdiv')
    });

    ClearFields();

    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#btnOk').click(btnOkClicked);

    $2('#divConfirmation').jqm({ modal: true });
    $2('#Divmessage').jqm({ modal: true });

    GetCurrentUser();
    GetCities();
    GetDistributor();
    GridData();
}
//Meraj fill Grid
function GridData() {
    $('#gridCitydistance').parent().find('.loding_box_outer').show().fadeIn();
    $.ajax({
        type: "POST",
        url: "CityDistance.asmx/FillGrid",
        contentType: "application/json; charset=utf-8",
        success: onSuccessGrid,
        error: onError,
        cache: false
    });
}

function onSuccessGrid(data) {
    $('#gridCitydistance').empty();
    $('#gridCitydistance').append("<table id='grid-Citydistance' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
    $("#grid-Citydistance").empty();
    $("#grid-Citydistance").append("<thead>" +
    "<tr style='background-color: #217ebd;color: white;'>" +
    "<th>Distributor</th>" +
    "<th>From City</th> " +
    "<th>To City</th> " +
    "<th>Distance(Km)</th> " +
    "<th>Status</th> " +
    "<th>EDIT</th> " +
    "<th>DELETE</th> " +
    "</tr>" +
    "</thead>" +
    "<tbody id='values'>");
    if (data != "") {
        if (data.d != "No") {
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
            $('#gridCitydistance').empty();
            $('#gridCitydistance').append("<table id='grid-Citydistance' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
            $("#grid-Citydistance").empty();
            $("#grid-Citydistance").append("<thead>" +
            "<tr style='background-color: #217ebd;color: white;'>" +
            "<th>Distributor</th>" +
            "<th>From City</th> " +
            "<th>To City</th> " +
            "<th>Distance(Km)</th> " +
            "<th>Status</th> " +
            "<th>EDIT</th> " +
            "<th>DELETE</th> " +
            "</tr>" +
            "</thead>" +
            "<tbody id='values'>");
            var val = '';
            for (var i = 0; i < msg.length ; i++) {
                val = "<tr>" +
                "<td>" + msg[i].DistributorName + "</td>" +
                "<td>" + msg[i].FromCity + "</td>" +
                "<td>" + msg[i].ToCity + "</td>" +
                "<td>" + msg[i].DistanceKm + "</td>" +
                "<td>" + msg[i].statuss + "</td>";

                //"<td></td>" +
                if (msg[i].ID != '0' && msg[i].ID != '') {
                    val += "<td>" + "<input type='button' value='Edit' onClick=\"onEdit('" + msg[i].ID + "');\"/>" + "</td>";
                    val += "<td>" + "<input type='button' value='Delete' onClick=\"onDelete('" + msg[i].ID + "');\"/>" + "</td>";
                }
                else {
                    val += "<td>" + "<input type='button' value='Edit_NewTag' onClick=\"onEdit_NewTag('" + msg[i].fromCityId + "','" + msg[i].toCityId + "','" + msg[i].Remarks + "');\"/>" + "</td>";
                    val += "<td></td>";
                }
                $('#values').append(val);
            }
            $('#grid-Citydistance').DataTable({
                "scrollX": false,
                deferRender: true,
                "bProcessing": true,
                "bDeferRender": true,
                responsive: true,
                columnDefs: [{ orderable: false, "targets": -1 }],
                dom: 'flBrtip',
                buttons: [{
                    extend: 'excel',
                    text: 'Download',
                    className: 'btnnor',
                    sheetName: 'Location Approval',
                    title: '',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                }]
            });
        }
    }
    $('#gridCitydistance').parent().find('.loding_box_outer').show().fadeOut();
}

//Meraj Drop for get the values of a Distributor list from Database SQL 
function GetDistributor() {
    $.ajax({
        type: "POST",
        url: "CityDistance.asmx/getAllDistributor",
        contentType: "application/json; charset=utf-8",
        success: onSuccessGetDist,
        error: onError,
        cache: false
    });
}
//On Success Distributor Drop down
function onSuccessGetDist(data, status) {
    document.getElementById('ddldist').innerHTML = "";
    if (data.d != "") {
        jsonObj = $.parseJSON(data.d);

        value = '-1';
        name = 'Select Distributor';
        $("#ddldist").append("<option value='" + value + "'>" + name + "</option>");
        $.each(jsonObj, function (i, tweet) {
            $("#ddldist").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].DistributorName + "</option>");
        });
    }
}

//Drop down get Cities
function GetCities() {
    $.ajax({
        type: "POST",
        url: "../Form/Cities.asmx/getAllCities",
        contentType: "application/json; charset=utf-8",
        success: onSuccessGetCities,
        error: onError,
        cache: false
    });
}
//On Sucess Cities Drop down
function onSuccessGetCities(data, status) {
    document.getElementById('ddlFromCity').innerHTML = "";
    document.getElementById('ddlToCity').innerHTML = "";
    if (data.d != "") {

        jsonObj = $.parseJSON(data.d);

        value = '-1';
        name = 'Select City';
        $("#ddlFromCity").append("<option value='" + value + "'>" + name + "</option>");
        $("#ddlToCity").append("<option value='" + value + "'>" + name + "</option>");
        $.each(jsonObj, function (i, tweet) {
            $("#ddlFromCity").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].City + "</option>");
            $("#ddlToCity").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].City + "</option>");
        });
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
        cache: false,
        async: false
    });
}

function onSuccessGetCurrentUser(data, status) {
    if (data.d != "") {
        EmployeeId = data.d;
    }
}

//Save Buttons the field
function btnSaveClicked() {

    var isValidated = $('#form1').validate({
        rules: {
            txtDistanceKm: {
                required: true
            }
        }
    });

    if (!$('#form1').valid()) {
        return false;
    }

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
    myData = "{'CityDistanceID':'" + CityDistanceId + "'}";

    $.ajax({
        type: "POST",
        url: "CityDistance.asmx/DeleteCityDistance",
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
    $2('#divConfirmation').jqmHide();
    $('#hdnMode').val("AddMode");
    ClearFields();
    ajaxCompleted();
    return false;
}

function btnOkClicked() {
    $2('#Divmessage').jqmHide();
    $('#hdnMode').val("AddMode");
    $("#btnRefresh").trigger('click');
    ClearFields();
    ajaxCompleted();
    return false;
}

// Functions
function SaveData() {
    //meraj
    //if ($('#ddldist').val() == -1) {
    //    window.alert('Please Select Distributor!');
    //    return false;
    //}
    if ($('#ddlFromCity').val() == -1) {
        window.alert('Please Select From City!');
        return false;
    }
    if ($('#ddlToCity').val() == -1) {
        window.alert('Please Select To City!');
        return false;
    }
    //meraj
    if ($('#txtDistanceKm').val() == '') {
        window.alert('Please Enter Distance!');
        return false;
    }
    if ($('#ddlstatus').val() == -1) {
        window.alert('Please Select the Status!');
        return false;
    }

    myData = "{'FromCityId':'" + $('#ddlFromCity').val() + "','ToCityId':'" + $('#ddlToCity').val() + "','distanceKm':'" + $('#txtDistanceKm').val() + "','distributor':'" + $('#ddldist').val() + "','status':'" + $('#ddlstatus').val() + "'}";

    $.ajax({
        type: "POST",
        url: "CityDistance.asmx/InsertCityDistance",
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

//Meraj Edit Button on click Function
function onEdit(sender, FromCityId, ToCityId, DistbutorID, status) {
    ClearFields();

    $('#remarks').val('');
    $('#hdnMode').val("EditMode");

    CityDistanceId = sender;

    if (CityDistanceId != "0") {
        myData = "{'CityDistanceID':'" + CityDistanceId + "'}";

        $.ajax({
            type: "POST",
            url: "CityDistance.asmx/GetCityDistance",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessGetCityDistance,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        $('#ddlFromCity').val(FromCityId);
        $('#ddlToCity').val(ToCityId);
        $('#txtDistanceKm').val(0);
        $('#ddldist').val(DistbutorID);
        $('#ddlstatus').val(status);


    }
}
//grid succes edit
function onSuccessGetCityDistance(data, status) {

    if (data.d != "") {

        jsonObj = $.parseJSON(data.d);

        $('#ddlFromCity').val(jsonObj[0].fromCityId).select2();
        $('#ddlToCity').val(jsonObj[0].toCityId).select2();
        $('#txtDistanceKm').val(jsonObj[0].distanceKm);
        $('#ddldist').val(jsonObj[0].DistID).select2();
        $('#ddlstatus').val(jsonObj[0].Remarks).select2();

        //$('#chkActive').attr("checked", jsonObj[0].IsActive);
    }
}

function onEdit_NewTag(FromCityId, ToCityId, Remarks, DistbutorID) {
    ClearFields();

    $('#hdnMode').val("AddMode");

    if (FromCityId != "0" && ToCityId != "0") {
        myData = "{'FromCityId':'" + FromCityId + "','ToCityId':'" + ToCityId + "'}";

        $.ajax({
            type: "POST",
            url: "CityDistance.asmx/GetCityDistance_NewTag",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessGetCityDistance_NewTag,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        $('#ddlFromCity').val(FromCityId);
        $('#ddlToCity').val(ToCityId);
        $('#txtDistanceKm').val(0);
        $('#ddldist').val(DistbutorID);
    }
}
//grid succes edit
function onSuccessGetCityDistance_NewTag(data, status) {

    if (data.d != "") {

        jsonObj = $.parseJSON(data.d);

        $('#ddlFromCity').val(jsonObj[0].fromCityId).select2();
        $('#ddlToCity').val(jsonObj[0].toCityId).select2();
        $('#txtDistanceKm').val(jsonObj[0].distanceKm);
        $('#ddldist').val(jsonObj[0].DistID).select2();

        //$('#chkActive').attr("checked", jsonObj[0].IsActive);
    }
}


// grid delete val
function onDelete(sender) {

    $('#hdnMode').val("DeleteMode");
    CityDistanceId = sender;
    $2('#divConfirmation').jqmShow();
}

// grid Update
function UpdateData() {
    //Meraj 
    //if ($('#ddldist').val() == -1) {
    //    window.alert('Please Select Distributor!');
    //    return false;
    //}
    if ($('#ddlFromCity').val() == -1) {
        window.alert('Please Select From City!');
        return false;
    }
    if ($('#ddlToCity').val() == -1) {
        window.alert('Please Select To City!');
        return false;
    }

    myData = "{'CityDistanceID':'" + CityDistanceId + "','FromCityId':'" + $('#ddlFromCity').val() + "','ToCityId':'" + $('#ddlToCity').val() + "','distanceKm':'" + $('#txtDistanceKm').val() + "','distributor':'" + $('#ddldist').val() + "','status':'" + $('#ddlstatus').val() + "'}";

    $.ajax({
        type: "POST",
        url: "CityDistance.asmx/UpdateCityDistance",
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

    $2('#imgLoading').hide();
}

function onSuccess(data, status) {
    $2('#hlabmsg').empty();
    if (data.d == "OK") {

        mode = $2('#hdnMode').val();
        msg = '';

        if (mode === "") {

            mode = "AddMode";
        }
        if (mode === "AddMode") {
            msg = 'Data inserted succesfully!';
        }
        else if (mode === "EditMode") {
            msg = 'Data updated succesfully!';
        }
        else if (mode === "DeleteMode") {
            $2('#divConfirmation').jqmHide();
            msg = 'Data deleted succesfully!';

        }

        $2('#hdnMode').val("");
        $2('#hlabmsg').append(msg);
        $2('#Divmessage').jqmShow();
        ClearFields();
        GridData();
    }
    else if (data.d == "Duplicate Name!") {
        msg = 'Already exist! Try different';
        $2('#hlabmsg').append(msg);
        $2('#Divmessage').jqmShow();
        return false;
    }
    else if (data.d == "Not able to delete this record due to linkup.") {
        $2('#divConfirmation').jqmHide();
        msg = 'Not able to delete this record due to linkup.';
        $2('#hlabmsg').append(msg);
        $2('#Divmessage').jqmShow();

    }
}

function onError(request, status, error) {

    msg = 'Error occoured';

    $2.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });

    $2('#imgLoading').hide();
}

function startingAjax() {

    $2('#imgLoading').show();
}

function ClearFields() {
    $('#hdnMode').val("AddMode");
    $('#ddlFromCity').val('-1').trigger('change');
    $('#ddlToCity').val('-1').trigger('change');
    $('#txtDistanceKm').val('').trigger('change');
    $('#ddldist').val('-1').trigger('change');
    $('#ddlstatus').val('-1').trigger('change');

}
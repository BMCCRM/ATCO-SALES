// Global Variables
var LevelId = 0, BrickID = 0, DistributorID = 0;
var myData = "", mode = "", msg = "", jsonObj = "";

// Event
function pageLoad() {

    ClearFields();

    GetDataInGrid();

    FillRegion();

    FillBrickTypes();
    // generateCode();


    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#btnOk').click(btnOkClicked);



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
    $("#ddl4").change(function () {
        FillDistributor($('#ddl4').val());
    });
    // $('#divConfirmation').jqm({ modal: true });
    //  $('#Divmessage').jqm({ modal: true });

}
function generateCode() {
    $('#txtCode').val('');
    $.ajax({
        type: "POST",
        url: "SalesBrickService.asmx/GetBrickCode",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, data, status) {

            if (response.d != 'No') {
                var jsonObj = $.parseJSON(response.d);
                $('#txtCode').val(jsonObj[0].brickcode);
            }
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        async: false
    });
}
function GetDataInGrid() {
    try {

        $.ajax({
            type: "POST",
            url: "../BWSD/SalesBrickService.asmx/GetAllBrick",
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

    }
}
function onSuccessGridFill(response, data, status) {

    if (response.d != 'No') {
        var jsonObj = $.parseJSON(response.d);// ID,BrickCode,	BrickName,
        var tablestring = "<table id='datatables' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +// class='column-options' 
            "<tr style='background-color: #217ebd;color: white;' >" +
            "<th > Region  </th>" +
            "<th > Sub Region</th>" +
            "<th > District </th>" +
            "<th > City NDD Code  </th>" +
            "<th > City  </th>" +
            "<th > Distributor Code  </th>" +
            "<th > Distributor Name</th>" +
            "<th > Brick Code  </th>" +
            "<th > Brick Name</th>" +
            "<th > Brick Type</th>" +
            "<th > Action </th>" +
            "</tr></thead>" +
            "<tbody id='values'>";

        $("#Salebrick").empty();
        $("#Salebrick").append(tablestring);


        for (var i = 0; i < jsonObj.length; i++) {
            $('#values').append($('<tr>' +
                "<td >" + jsonObj[i].RegionName + "</td>" +
                "<td >" + jsonObj[i].SubRegionName + "</td>" +
                "<td >" + jsonObj[i].DistrictName + "</td>" +
                "<td >" + jsonObj[i].City_NDD_Code + "</td>" +
                "<td >" + jsonObj[i].City + "</td>" +
                "<td >" + jsonObj[i].DistributorCode + "</td>" +
                "<td >" + jsonObj[i].DistributorName + "</td>" +
                "<td >" + jsonObj[i].BrickCode + "</td>" +
                "<td >" + jsonObj[i].BrickName + "</td>" +
                "<td >" + jsonObj[i].BrickTypeName + "</td>" +

                "<td  >" + " <a href='#'  onclick='oGrid_Edit(\"" + jsonObj[i].brickID + "\",\"" + jsonObj[i].DistributorID + "\");return false'>Edit</a> " + "<a href='#'  onclick='oGrid_Delete(\"" + jsonObj[i].brickID + "\",\"" + jsonObj[i].DistributorID + "\");return false'>Remove</a>" + "</td>" +

                "</tr>"));
        }

        $("#Salebrick").append('</tbody></table>');
        $('#datatables').DataTable();
    }
    else {
        var tablestring = "<table id='datatables' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +
            "<tr >" +
            "<th > BrickCode  </th>" +
            "<th > Brick Name </th>" +
            "<th > Action </th>" +
            "</tr></thead>" +
            "<tbody id='values'>";

        $("#Salebrick").empty();
        $("#Salebrick").append(tablestring);

        //  $("<div title='Alert'>Not Found.</div>").dialog();

        AlertMsg('Not Found.');

    }

}
function btnSaveClicked() {
    var isValidated = $('#form1').validate({
        rules: {
            txtName: {
                required: true,
                // alpha : true
            },
            txtCode: {
                required: true
            },
            txtDCode: {
                required: true
            },
            txtDName: {
                required: true
            },
            txtCity: {
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
    //$("#btnRefresh").trigger('click');
    return false;
}
function btnYesClicked() {

    myData = "{'brickID':'" + brickID + "'}";

    $.ajax({
        type: "POST",
        url: "SalesBrickService.asmx/DeleteBrick",
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
    //$("#btnRefresh").trigger('click');
    ClearFields();
    ajaxCompleted();
    return false;
}



function SaveData() {

    if ($('#ddl4').val() == '-1') {
        alert('select City');
        return false;
    }
    myData = "{'CityID':'" + $('#ddl4').val() + "','DistributorID':'" + $('#ddl5').val() + "','txtCode':'" + $('#txtCode').val() + "','txtName':'" + $('#txtName').val() + "','isActive':'" + ($('#chkActive').attr("checked") == 'checked' ? 'true' : 'false') + "','BrickTypeId':'" + $('#ddl6').val() + "'}";

    $.ajax({
        type: "POST",
        url: "SalesBrickService.asmx/InsertBrick",
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


function oGrid_Edit(sender, distribid) {

    $('#hdnMode').val("EditMode");
    BrickID = 0;
    DistributorID = 0;
    BrickID = sender.toString();
    DistributorID = distribid.toString();
    myData = "{'brickID':'" + BrickID + "'}";

    $.ajax({
        type: "POST",
        url: "SalesBrickService.asmx/GetBrick",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetBrick,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender, distid) {
    $('#hdnMode').val("DeleteMode");
    brickID = sender;

    myData = "{'brickID':'" + brickID + "','DistributorID':'" + distid + "'}";

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
                    url: "../BWSD/SalesBrickService.asmx/DeleteBrick",
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
}
function UpdateData() {

    if ($('#ddl4').val() == '-1') {
        alert('select City');
        return false;
    }

    if ($('#ddl5').val() == '-1') {
        alert('select Distributor');
        return false;
    }

    myData = "{ 'SwapDistributorID':'" + DistributorID + "' ,'DistributorID':'" + $('#ddl5').val() + "','brickID':'" + BrickID + "','txtCode':'" + $('#txtCode').val() + "','txtName':'" + $('#txtName').val() + "','isActive':'" + ($('#chkActive').attr("checked") == 'checked' ? 'true' : 'false') + "','BrickTypeId':'" + $('#ddl6').val() + "'}";

    $.ajax({
        type: "POST",
        url: "SalesBrickService.asmx/UpdateBrick",
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
function onSuccessGetBrick(data, status) {

    if (data.d != "") {

        ClearFields();
        var jsonObj = jsonParse(data.d);

        $('#ddl1').val(jsonObj[0].RegionID);
        FillSubRegion(jsonObj[0].RegionID);
        $('#ddl2').val(jsonObj[0].SubRegionID);
        FillDistrict(jsonObj[0].SubRegionID);
        $('#ddl3').val(jsonObj[0].DistrictID);
        FillCity(jsonObj[0].DistrictID);
        $('#ddl4').val(jsonObj[0].CityID);
        FillDistributor(jsonObj[0].CityID);
        $('#ddl5').val(jsonObj[0].DistributorID);
        $('#ddl6').val(jsonObj[0].BrickTypeId)
        $('#txtCode').val(jsonObj[0].BrickCode);
        $('#txtName').val(jsonObj[0].BrickName);
    }
}
function onSuccess(data, status) {
    debugger;
    if (data.d == "OK" || data.d == "Success") {
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

        $('#hdnMode').val("");

        ClearFields();
        GetDataInGrid();



    }
    else if (data.d == "Duplicate Name!") {

        toastr.info('>Brick Code already exist! Try different! ', 'Alert', {
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
    $('#ddl5').val('-1');
    $('#ddl6').val('-1');
    $('#txtCode').val("");
    $('#txtName').val("");

}

function AlertMsg(text) {


    toastr.info(text, 'Alert', {
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



function FillBrickTypes() {
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesDistributorService.asmx/GetBrickTypes",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {
            if (data.d != "") {
                $('#ddl6').empty();
                $("#ddl6").append("<option value='-1'>Select Type</option>");
                if (response.d != 'No') {
                    var msg = $.parseJSON(response.d);
                    $.each(msg, function (i, option) {
                        $("#ddl6").append("<option value='" + option.TypeId + "'>" + option.TypeName + "</option>");
                    });
                }
            }
            else {
                $("#ddl6").empty();
                $("#ddl6").append("<option value='-1'>No Type Found!</option>");
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

function FillDistributor(ID) {
    myData = "{'CityID':'" + ID + "'}";
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesBrickRelation.asmx/GetSalesDistributor",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (response, data, status) {

            $('#ddl5').empty();
            $("#ddl5").append("<option value='-1'>Select Distributor</option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {// [DistributorCode][DistributorName]
                    $("#ddl5").append("<option value='" + option.ID + "'>" + option.DistributorCode + " - " + option.DistributorName + "</option>");
                });
            }

        },

        error: onError,
        cache: false

    });
}

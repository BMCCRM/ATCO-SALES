// Global Variables
var ProductSkuId = 0, PackSize = 0, Strength = 0, Form = 0;
var myData = "", mode = "", msg = "", jsonObj = "";

// Page Load Event
function pageLoad() {

    ClearFields();

    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#btnOk').click(btnOkClicked);

    $('#divConfirmation').jqm({ modal: true });
    $('#Divmessage').jqm({ modal: true });

    FillTeam();
}

//   Button Click Events 
function btnSaveClicked() {

    var isValidated = $('#form1').validate({
        rules: {
            txtCode: {
                required: true,
                digits: true
            },
            txtName: {
                required: true
            },
            txtDistributorPrice: {
                required: true,
                number: true
            },
            txtTradePrice: {
                required: true,
                number: true
            },
            txtRetailPrice: {
                required: true,
                number: true
            }
        }
    });

    if (!$('#form1').valid()) {
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
    ajaxCompleted();
    $("#btnRefresh").trigger('click');
    return false;
}
function btnYesClicked() {

    myData = "{'skuId':'" + ProductSkuId + "'}";

    $.ajax({
        type: "POST",
        url: "ProductSkuService.asmx/DeleteProductSku",
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
function OnChangedGetProductwithTeam() {

    $('#cboProduct').val("-1");
    TeamID = $('#cboTeam').val();
    myData = "{'TeamID':'" + TeamID + "'}";
    $.ajax({
        type: "POST",
        url: "ProductSkuService.asmx/GetProductSku",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: onSuccessGetProductwithTeam,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });


    $('#dialog').jqmHide();
}

function onSuccessGetProductwithTeam(data, status) {
    document.getElementById('cboProduct').innerHTML = "";
    if (data.d != "") {


        $("#cboProduct").append("<option value='-1'>Select Brand</option>");
        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, tweet) {
            $("#cboProduct").append("<option value='" + jsonObj[i].ProductId + "'>" + jsonObj[i].ProductName + "</option>");
        });
    }
    else {
        $("#cboProduct").append("<option value='-1'>Select Brand</option>");
    }
}
// Functions

function SaveData() {

    myData = "{'productId':'" + $('#cboProduct').val() + "','packsizeId':'" + PackSize + "','strengthId':'" + Strength
        + "','formId':'" + Form + "','skuCode':'" + $('#txtCode').val() + "','skuName':'" + $('#txtName').val()
        + "','isActive':'" + $('#chkActive').attr("checked") + "','distributorPrice':'" + $('#txtDistributorPrice').val()
        + "','tradePrice':'" + $('#txtTradePrice').val() + "','retailPrice':'" + $('#txtRetailPrice').val() + "'}";

    $.ajax({
        type: "POST",
        url: "ProductSkuService.asmx/InsertProductSku",
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
function oGrid_Edit(sender) {

    $('#hdnMode').val("EditMode");
    ProductSkuId = sender.SkuId;
    myData = "{'skuId':'" + ProductSkuId + "'}";

    $.ajax({
        type: "POST",
        url: "ProductSkuService.asmx/GetProductSku",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetProduct,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    ProductSkuId = sender.SkuId;
    $('#divConfirmation').jqmShow();
}
function UpdateData() {

    myData = "{'skuId':'" + ProductSkuId + "','productId':'" + $('#cboProduct').val() + "','packsizeId':'" + PackSize
        + "','strengthId':'" + Strength + "','formId':'" + Form + "','skuCode':'" + $('#txtCode').val()
        + "','skuName':'" + $('#txtName').val() + "','isActive':'" + $('#chkActive').attr("checked") + "','distributorPrice':'" + $('#txtDistributorPrice').val()
        + "','tradePrice':'" + $('#txtTradePrice').val() + "','retailPrice':'" + $('#txtRetailPrice').val() + "'}";

    $.ajax({
        type: "POST",
        url: "ProductSkuService.asmx/UpdateProductSku",
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

    $('#imgLoading').hide();
}
function onSuccessGetProduct(data, status) {

    if (data.d != "") {

        ClearFields();

        jsonObj = jsonParse(data.d);
       

        if (jsonObj[0].PackSizeid == null) {

            $('#cboPacketSize').val("-1");
        }
        else {
            $('#cboPacketSize').val(jsonObj[0].PackSizeid);
        }

        if (jsonObj[0].StrengthId == null) {

            $('#cboStrength').val("-1");
        }
        else {
            $('#cboStrength').val(jsonObj[0].StrengthId);
        }

        if (jsonObj[0].FormId == null) {

            $('#cboForm').val("-1");
        }
        else {
            $('#cboForm').val(jsonObj[0].FormId);
        }

        $('#cboTeam').val(jsonObj[0].TeamID);
        FillProductOnTeamChange(jsonObj[0].TeamID);
        $('#cboProduct').val(jsonObj[0].ProductId);
        $('#txtCode').val(jsonObj[0].SkuCode);
        $('#txtName').val(jsonObj[0].SkuName);
        $('#chkActive').attr("checked", jsonObj[0].IsActive == "True" ? true : 0);
        $('#txtDistributorPrice').val(jsonObj[0].DistributorPrice);
        $('#txtTradePrice').val(jsonObj[0].TradePrice);
        $('#txtRetailPrice').val(jsonObj[0].RetailPrice);
        $('#cboForm').val(jsonObj[0].FormId);
        $('#cboStrength').val(jsonObj[0].StrengthId);
        $('#cboPacketSize').val(jsonObj[0].PackSizeid);
        
        
    }
    else {
        msg = 'Due to team relation disable product sku cannot be edited';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
    }
}
function onSuccess(data, status) {

    if (data.d == "OK") {

        var mode = $('#hdnMode').val();
        var msg = '';

        if (mode === "AddMode") {
            msg = 'Data inserted succesfully!';
        }
        else if (mode === "EditMode") {
            msg = 'Data updated succesfully!';
        }
        else if (mode === "DeleteMode") {
            $('#divConfirmation').jqmHide();
            msg = 'Data deleted succesfully!';
           
        }

        ClearFields();
        $('#hdnMode').val("");
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

       
    }
    else if (data.d == "Duplicate Code!") {
        msg = 'Code already exist! Try different';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
        return false;
    }
    else if (data.d == "Duplicate Name!") {
        msg = 'SKU Name already exist! Try different';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
      
        return false;
    }
    else if (data.d == "Not able to delete this record due to linkup.") {


        $('#divConfirmation').jqmHide();
        msg = 'Not able to delete this record due to linkup.';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

       
    }
}
function onError(request, status, error) {
    $('#divConfirmation').jqmHide();
    msg = 'Error occoured';
    $('#hlabmsg').append(msg);
    $('#Divmessage').jqmShow();
    
}
function startingAjax() {
    $('#imgLoading').show();
}
function DefaultData() {

    PackSize = $('#cboPacketSize').val();
    Strength = $('#cboStrength').val();
    Form = $('#cboForm').val();

    if (PackSize == -1) {

        PackSize = 0;
    }

    if (Strength == -1) {

        Strength = 0;
    }

    if (Form == -1) {

        Form = 0;
    }
}
function ClearFields() {

    $('#cboProduct').val("-1");
    $('#cboPacketSize').val("-1");
    $('#cboStrength').val("-1");
    $('#cboForm').val("-1");
    $('#txtCode').val("");
    $('#txtName').val("");
    $('#chkActive').attr("checked", true);
    $('#txtDistributorPrice').val("");
    $('#txtTradePrice').val("");
    $('#txtRetailPrice').val("");
}
function FillProductOnTeamChange(TeamID) {
    myData = "{'TeamID':'" + TeamID + "'}";

    $.ajax({
        type: "POST",
        url: "ProductSkuService.asmx/GetProductByTeam",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != "") {
                $("#cboProduct").empty();
                $("#cboProduct").append("<option value='-1'>Select Brand...</option>");

                var jsonObj = JSON.parse(data.d);
                $.each(jsonObj, function (i, tweet) {
                    $("#cboProduct").append("<option value='" + jsonObj[i].ProductId + "'>" + jsonObj[i].ProductName + "</option>");
                });
            }
            else {
                $("#cboProduct").empty();
                $("#cboProduct").append("<option value='-1'>Select Brand...</option>");
            }
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        async: false
    });

}
function FillTeam() {
    $.ajax({
        type: "POST",
        url: "ProductSkuService.asmx/GetTeam",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != "") {
                $("#cboTeam").empty();
                $("#cboTeam").append("<option value='-1'>Select Team...</option>");

                var jsonObj = JSON.parse(data.d);
                $.each(jsonObj, function (i, tweet) {
                    $("#cboTeam").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].TeamName + "</option>");
                });
            }
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        async: false
    });


}
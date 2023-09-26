// Global Variables
var ItemMasterId = 0;
var GlobalFlag = 0;
var myData = "", mode = "", msg = "", jsonObj = "";

// Page Load Event
function pageLoad() {

    ClearFields();
    $('#hdnMode').val("");
    mode = $('#hdnMode').val();


    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#btnOk').click(btnOkClicked);

    $('#divConfirmation').jqm({ modal: true });
    $('#Divmessage').jqm({ modal: true });
}

//   Button Click Events 
function btnSaveClicked() {

    var isValidated = $('#form1').validate({
        rules: {
            txtCode: {
                required: true,
                digits:true
            },
            txtItemName: {
                required: true
            },       
            txtItemCost: {
                required: true,
                number: true
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

    myData = "{'ID':'" + ItemMasterId + "'}";

    $.ajax({
        type: "POST",
        url: "ItemMasterService.asmx/DeleteItemMaster",
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
    //$('#hdnMode').val("AddMode");
    if (GlobalFlag == 0) {
        $("#btnRefresh").trigger('click');
        ClearFields();
    }
    else
    {
        msg = "";
    }
    ajaxCompleted();
    return false;
}

// Functions

function SaveData() {
    
    $('#hdnMode').val("AddMode")
    mode = $('#hdnMode').val();

    myData = "{'ItemCode':'" + $('#txtCode').val() + "','ItemName':'" + $('#txtItemName').val() + "','ItemDescription':'" + $('#txtItemDescription').val()
      + "','ItemCost':'" + $('#txtItemCost').val() + "','isActive':'" + $('#chkActive').attr("checked") + "'}";
   

    $.ajax({
        type: "POST",
        url: "ItemMasterService.asmx/InsertItemMaster",
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
    ItemMasterId = sender.pk_id;
    myData = "{'ItemMasterId':'" + ItemMasterId + "'}";

    $.ajax({
        type: "POST",
        url: "ItemMasterService.asmx/GetItem",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetItem,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    mode = $('#hdnMode').val();
    ItemMasterId = sender.pk_id;
    $('#divConfirmation').jqmShow();

}
function UpdateData() {

    $('#hdnMode').val("EditMode")
    mode = $('#hdnMode').val();

    myData = "{'ID':'" + ItemMasterId + "','ItemCode':'" + $('#txtCode').val() + "','ItemName':'" + $('#txtItemName').val() + "','ItemDescription':'" + $('#txtItemDescription').val()
        + "','ItemCost':'" + $('#txtItemCost').val() + "','isActive':'" + $('#chkActive').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "ItemMasterService.asmx/UpdateItemMaster",
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
function onSuccessGetItem(data, status) {

    if (data.d != "") {

        ClearFields();

        jsonObj = jsonParse(data.d);

        $('#txtCode').val(jsonObj[0].ItemCode);
        $('#txtItemName').val(jsonObj[0].ItemName);
        $('#txtItemDescription').val(jsonObj[0].ItemDescription);
        $('#txtItemCost').val(jsonObj[0].ItemCost);
        $('#chkActive').attr("checked", jsonObj[0].isActive);
      
    }
}
function onSuccess(data, status) {
    
                    

                     if ($('#hdnMode').val() == "DeleteMode") {
                        jsonObj = jsonParse(data.d);
                        if (jsonObj[0].msg == 'ItemTeamRelation') {
                            GlobalFlag = 1;
                            $('#divConfirmation').jqmHide();
                            msg = 'Not able to delete this record due to linkup with Team.';
                            $('#hlabmsg').text(msg);
                            $('#Divmessage').jqmShow();


                        }
                        else if (jsonObj[0].msg == 'ItemCSRRelation') {
                            GlobalFlag = 1;
                            $('#divConfirmation').jqmHide();
                            msg = 'Not able to delete this record due to linkup with CSR.';
                            $('#hlabmsg').text(msg);
                            $('#Divmessage').jqmShow();


                        }
                        
                        else if (jsonObj[0].msg == 'OK') {
                            $('#divConfirmation').jqmHide();
                            msg = 'Data deleted succesfully!';
                            GlobalFlag = 0;
                            ClearFields();
                            $('#hdnMode').val("");
                            $('#hlabmsg').text(msg);
                            $('#Divmessage').jqmShow();
                        }
                    }
                    else {
                        if (data.d == "OK") {

                            var mode = $('#hdnMode').val();
                            var msg = '';

                            if (mode === "AddMode") {
                                msg = 'Data inserted succesfully!';
                            }
                            else if (mode === "EditMode") {
                                msg = 'Data updated succesfully!';
                            }
                            GlobalFlag = 0;
                            ClearFields();
                            $('#hdnMode').val("");
                            $('#hlabmsg').text(msg);
                            $('#Divmessage').jqmShow();


                        }
                        else if (data.d == "Duplicate value in ItemCode and ItemName!") {
                            msg = 'ItemCode or ItemName already exist! Try different';
                            $('#hlabmsg').text(msg);
                            $('#Divmessage').jqmShow();
                            GlobalFlag = 1;
                            return false;
                        }
                        
                        else if (data.d == "Duplicate Code!") {
                            msg = 'ItemCode already exist! Try different';
                            $('#hlabmsg').text(msg);
                            $('#Divmessage').jqmShow();
                            GlobalFlag = 1;
                            return false;
                        }

                        else if (data.d == "Duplicate Item Name!") {
                            msg = 'ItemName already exist! Try different';
                            $('#hlabmsg').text(msg);
                            $('#Divmessage').jqmShow();
                            GlobalFlag = 1;
                            return false;
                        }
         
                        else if (data.d == "Not able to delete this record due to linkup.") {


                            $('#divConfirmation').jqmHide();
                            msg = 'Not able to delete this record due to linkup.';
                            $('#hlabmsg').text(msg);
                            $('#Divmessage').jqmShow();
                            GlobalFlag = 1;

                        }
                    }
}
function onError(request, status, error) {
    $('#divConfirmation').jqmHide();
    msg = 'Error occoured';
    $('#hlabmsg').text(msg);
    $('#Divmessage').jqmShow();
    
}
function startingAjax() {
    $('#imgLoading').show();
}
function ClearFields() {

    //$('#hdnMode').val("AddMode");
    $('#txtCode').val("");
    $('#txtItemName').val("");
    $('#txtItemDescription').val("");
    $('#txtItemCost').val("");
    $('#chkActive').attr("checked", true);
  
}
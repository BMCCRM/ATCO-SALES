
var DepotId = 0;

function pageLoad() {

    //    ClearFields();
    //    $('#btnSave').click(btnSaveClicked);
    // $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
   $('#btnOk').click(btnOkClicked);

    $('#divConfirmation').jqm({ modal: true });
    $('#Divmessage').jqm({ modal: true });
}


function oGrid_Edit(sender) {
    $('#hdnMode').val("EditMode");
    DepotId = sender.toString();
    $('#hdnRec').val(DepotId.toString());

    myData = "{'DepotId':'" + DepotId + "'}";

    $.ajax({
        type: "POST",
        url: "D_depotServer.asmx/GetDepot",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetDepot,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}



function oGrid_Delete(sender) {
    $('#hdnMode').val("DeleteMode");
    DepotId = sender.toString();
    $('#divConfirmation').jqmShow();
}
function btnYesClicked() {
    myData = "{'DepotId':'" + DepotId + "'}";
    $.ajax({
        type: "POST",
        url: "D_depotServer.asmx/DeleteDepot",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        });
}
function btnNoClicked() {

    $('#divConfirmation').jqmHide();
    //    $('#hdnMode').val("AddMode");
    ajaxCompleted();
    return false;
}
function btnOkClicked() {

    $('#Divmessage').jqmHide();
    location.reload();
    $('#hdnMode').val("AddMode");
    $("#btnRefresh").trigger('click');
    ClearFields();
    ajaxCompleted();
   
    return false;
}




function onSuccessGetDepot(data, status) {

    if (data.d != "") {

        //ClearFields();
        var jsonObj = jsonParse(data.d);

        $('#txtName').val(jsonObj[0].Depotname);
        $('#txtMname').val(jsonObj[0].Managername);
        $('#txtemail').val(jsonObj[0].Email);
        $('#txtMobile').val(jsonObj[0].Mobileno);
        $('#txtPhone').val(jsonObj[0].Phoneno);
        $('#txtFaxNo').val(jsonObj[0].Faxeno);
        $('#txtAddress').val(jsonObj[0].Address);
        $('#txtDesctiption').val(jsonObj[0].Description);
        $('#txtlogin').val(jsonObj[0].loginid);
        $('#CheckBox1').attr("checked", jsonObj[0].IsActive);

    }
}
function onSuccess(data, status) {

  var msg = '';
  $('#divConfirmation').jqmHide();
    if (data.d == "OK") {

        var mode = $('#hdnMode').val();
      

        if (mode === "AddMode") {
            msg = 'Data inserted succesfully!';
        }
        else if (mode === "EditMode") {
            msg = 'Data updated succesfully!';
        }
        else if (mode === "DeleteMode") {
            $('#divConfirmation').jqmHide();
            msg = 'Data deleted succesfully!';
            
            $('#hlabmsg').append(msg);
            $('#Divmessage').jqmShow();
            
        }
      
        ClearFields();
        $('#hdnMode').val("");
      
    }
    $('#hdnMode').val("");
    location.reload();
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
    $('#imgLoading').show();
}
function ajaxCompleted() {

    $('#imgLoading').hide();
}
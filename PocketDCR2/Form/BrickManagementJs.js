// Global Variables
var LevelId = 0;
var myData = "", mode = "", msg = "", jsonObj = "";

// Event
function pageLoad() {

    ClearFields();

    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    
    $('#btnOk').click(btnOkClicked);

    $('#divConfirmation').jqm({ modal: true });
    $('#Divmessage').jqm({ modal: true });


}
function btnSaveClicked()
 {

    var isValidated = $('#form1').validate({
        rules: {
            txtName: {
                required: true,
               // alpha : true
            },
            txtDescription: {
                required: true
            }
        }
    });

    if (!$('#form1').valid()) 
    {
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
function btnCancelClicked() 
{

    $('#hdnMode').val("AddMode");
    ClearFields();
    ajaxCompleted();
    $("#btnRefresh").trigger('click');
    return false;
}
function btnYesClicked() {

    myData = "{'levelId':'" + LevelId + "'}";

    $.ajax({
        type: "POST",
        url: "BrickManagementService.asmx/DeleteBrick",
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

    myData = "{'name':'" + $('#txtName').val()
        + "','description':'" + $('#txtDescription').val() + "','isActive':'" + $('#chkActive').attr("checked") 
        + "'}";

    $.ajax({
        type: "POST",
        url: "BrickManagementService.asmx/InsertBrick",
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
    LevelId = sender.toString();

    myData = "{'levelId':'" + LevelId + "'}";

    $.ajax({
        type: "POST",
        url: "BrickManagementService.asmx/GetBrick",
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
function oGrid_Delete(sender) {
    $('#hdnMode').val("DeleteMode");
    LevelId = sender.LevelId;
    $('#divConfirmation').jqmShow();
}
function UpdateData() {

    myData = "{'levelId':'" + LevelId + "','name':'" + $('#txtName').val()
        + "','description':'" + $('#txtDescription').val() + "','isActive':'" + $('#chkActive').attr("checked")
        + "'}";

    $.ajax({
        type: "POST",
        url: "BrickManagementService.asmx/UpdateBrick",
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
function onSuccessGetBrick(data, status) {

    if (data.d != "") {

        ClearFields();
        var jsonObj = jsonParse(data.d);
        $('#txtName').val(jsonObj[0].LevelName);
        $('#txtDescription').val(jsonObj[0].LevelDescription);
        $('#chkActive').attr("checked", jsonObj[0].IsActive);
    }
}
function onSuccess(data, status) {

  var msg = '';
    if (data.d == "OK")
    {
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
           
        }

        ClearFields();
        $('#hdnMode').val("");
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

    }
    else if (data.d == "Duplicate Name!") {
        msg = 'Brick already exist! Try different';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
        return false;
    }
    else if (data.d == "Not able to delete this level due to linkup.") 
    {
        $('#divConfirmation').jqmHide();
        msg = 'Doctor is present on this brick, so unable to delete this brick';
        
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
    }
}
function onError(request, status, error) {
    $('#divConfirmation').hide();
    msg = 'Error occoured';

      $('#hlabmsg').append(msg);
      $('#Divmessage').jqmShow();
   
}
function startingAjax() {
    $('#imgLoading').show();
}
function ClearFields() {

    $('#txtName').val("");
    $('#txtDescription').val("");
    $('#chkActive').attr("checked", true);
}

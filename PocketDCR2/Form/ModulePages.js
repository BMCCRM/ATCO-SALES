// Global Variables
var ID = 0;
var mode = "", myData = "", jsonObj = "", msg = "";

// Events
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
function btnSaveClicked() {

    var isValidated = $('#form1').validate({
        rules: {
            txtPageNumber: {
                required: true
                //,
                //alpha: true
            },
            txtPrefix: {
                required: true
                //,
                //alpha: true
            },
            txtPagePath: {
                required: true
                //,
                //alpha: true
            }
            //,
            //ctl00$ContentPlaceHolder1$ddlTeam: {
            //    required: true
            //}
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

    myData = "{'ID':'" + ID + "'}";

    $.ajax({
        type: "POST",
        url: "ModulePages.asmx/DeletePageConfiguration",
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

    myData = "{'ModuleMassId':'" + $('#ddModuleMass').val()
        + "','PageNumber':'" + $('#txtPageNumber').val()
        + "','PagePath':'" + $('#txtPagePath').val()
        + "','Prefix':'" + $('#txtPrefix').val()
        + "','Flag':'" + $('#chkActive').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "ModulePages.asmx/InsertPageConfiguration",
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
    ID = sender.ID;
    ClearFields();
    myData = "{'ID':'" + ID+"'}";

    $.ajax({
        type: "POST",
        url: "ModulePages.asmx/GetPageConfiguration",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetPageConfiguration,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

    return false;
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    ID = sender.ID;
    $('#divConfirmation').jqmShow();
}
function UpdateData() {

  
    myData = "{'ID':'" + ID
      + "','ModuleMassId':'" + $('#ddModuleMass').val()
      + "','PageNumber':'" + $('#txtPageNumber').val()
      + "','PagePath':'" + $('#txtPagePath').val()
      + "','Prefix':'" + $('#txtPrefix').val()
      + "','Flag':'" + $('#chkActive').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "ModulePages.asmx/UpdatePageConfiguration",
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
function onSuccessGetPageConfiguration(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        $('#ddModuleMass').val(jsonObj[0].Fk_ModuleID);
        $('#txtPageNumber').val(jsonObj[0].PageName);
        $('#txtPagePath').val(jsonObj[0].PagePath);
        $('#txtPrefix').val(jsonObj[0].Prefix);
        $('#chkActive').attr("checked",jsonObj[0].IsActive);
    }
}
function onSuccess(data, status) {

    if (data.d == "1") {

        mode = $('#hdnMode').val();
        msg = '';

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
    //else if (data.d == "Duplicate Name!") {
    //    msg = 'Brand already exist! Try different';
    //    $('#hlabmsg').append(msg);
    //    $('#Divmessage').jqmShow();
    //    return false;
    //}
    //else if (data.d == "Not able to delete this record due to linkup.") {
    //    $('#divConfirmation').jqmHide();
    //    msg = 'Not able to delete this record due to linkup.';
    //    $('#hlabmsg').append(msg);
    //    $('#Divmessage').jqmShow();

    //}
    else
    {
        msg = 'Data not inserted succesfully!';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
        
        return false;
    }
}
function onError(request, status, error) {

    msg = 'Error occoured';

    $.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });

    $('#imgLoading').hide();
}
function startingAjax() {

    $('#imgLoading').show();
}
function ClearFields() {

    $('#ddModuleMass').val("");
    $('#txtPageNumber').val("");
    $('#txtPagePath').val("");
    $('#txtPrefix').val("");
    $('#chkActive').attr("checked", true);
 
}
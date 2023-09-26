// Global Variables
var Role_ID = 0;
var GlobalFlag = 0;
var mode = "", myData = "", jsonObj = "", msg = "";

// Events
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
function btnSaveClicked() {

    var isValidated = $('#form1').validate({
        rules: {
            cboRole:{
                required: true
            },
            txtStartLimit: {
                required: true,
                number: true
            },
            txtEndLimit: {
                required: true,
                number: true
            }
        }
    });

    if (!$('#form1').valid()) {
        return false;
    }

    if ($('#cboRole').val() == -1)
    {
        $('#hlabmsg').text('Please Select System Role');
        $('#Divmessage').jqmShow();
        GlobalFlag = 1;
        return false;
    }
    
    var EndLimit = parseInt($('#txtEndLimit').val());
    var StartLimit = parseInt($('#txtStartLimit').val());
    if (EndLimit > StartLimit) {
        GlobalFlag = 0;
        
    } else {
        $('#hlabmsg').text('Start Limit Must be less than End Limit');
        $('#Divmessage').jqmShow();
        GlobalFlag = 1;
        return false;
    }

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
    mode=""
    ClearFields();
    ajaxCompleted();
    $("#btnRefresh").trigger('click');
    return false;
}
function btnYesClicked() {

    myData = "{'ID':'" + Role_ID + "'}";

    $.ajax({
        type: "POST",
        url: "RoleWiseLimitService.asmx/DeleteRoleWiseLimit",
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
    else {
        msg = "";
    }
    if (mode != "EditMode") {
        mode = "";
    }
    ajaxCompleted();
    return false;
}

// Functions
function SaveData() {

    $('#hdnMode').val("AddMode");
    myData = "{'fk_role':'" + $('#cboRole').val()
        + "','StartLimit':'" + $('#txtStartLimit').val()
         + "','EndLimit':'" + $('#txtEndLimit').val()
        + "','isActive':'" + $('#chkActive').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "RoleWiseLimitService.asmx/InsertRoleWiseLimit",
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

    mode = "EditMode";
    $('#hdnMode').val(mode);
    Role_ID = sender.pk_id;
    ClearFields();
    myData = "{'ID':'" + Role_ID + "'}";

    $.ajax({
        type: "POST",
        url: "RoleWiseLimitService.asmx/GetRoleWiseLimit",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetRoleWiseLimit,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    Role_ID = sender.pk_id;
    $('#divConfirmation').jqmShow();
}
function UpdateData() {

    myData = "{'ID':'" + Role_ID
       + "','fk_role':'" + $('#cboRole').val()
       + "','StartLimit':'" + $('#txtStartLimit').val()
        + "','EndLimit':'" + $('#txtEndLimit').val()
       + "','isActive':'" + $('#chkActive').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "RoleWiseLimitService.asmx/UpdateRoleWiseLimit",
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
function onSuccessGetRoleWiseLimit(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        $('#cboRole').val(jsonObj[0].fk_role);
        $('#txtStartLimit').val(jsonObj[0].LimitStart);
        $('#txtEndLimit').val(jsonObj[0].LimitEnd);
        $('#chkActive').attr("checked", jsonObj[0].isActive);
    }
}
function onSuccess(data, status) {


    if ($('#hdnMode').val() == "DeleteMode") {
        jsonObj = jsonParse(data.d);
        
        if (jsonObj[0].msg == 'OK') {
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

            if (mode == "AddMode") {
                msg = 'Data inserted succesfully!';
            }
            else if (mode == "EditMode") {
                msg = 'Data updated succesfully!';
            }
            GlobalFlag = 0;
            ClearFields();
           
            $('#hdnMode').val("");
            $('#hlabmsg').text(msg);
            $('#Divmessage').jqmShow();
            mode = "";


        }
        else if (data.d == "Duplicate Role Name!") {
            msg = 'Role Name already exist! Try different';
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
    mode = "";
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

    $('#cboRole').val("-1");
    $('#txtStartLimit').val("");
    $('#txtEndLimit').val("");
    $('#chkActive').attr("checked", true);

    //$('#hdnMode').val("");
    //mode = $('#hdnMode').val();
}
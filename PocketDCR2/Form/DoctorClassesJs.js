// Global Variables
var ClassId = 0;
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
function btnSaveClicked() {

    var isValidated = $('#form1').validate({
        rules: {            
            txtName: {
                required: true
            },
            txtFrequency: {
                required: true,
                digits: true
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

    myData = "{'classId':'" + ClassId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorClasses.asmx/DeleteClass",
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

    myData = "{'className':'" + $('#txtName').val() + "','classFrequency':'" + $('#txtFrequency').val() + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorClasses.asmx/InsertClass",
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
    ClassId = sender.toString();
    myData = "{'classId':'" + ClassId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorClasses.asmx/GetDoctorClass",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetClass,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    ClassId = sender.ClassId;
    $('#divConfirmation').jqmShow();
}
function UpdateData() {

    myData = "{'classId':'" + ClassId + "','className':'" + $('#txtName').val() + "','classFrequency':'" + $('#txtFrequency').val() + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorClasses.asmx/UpdateClass",
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
function onSuccessGetClass(data, status) {

    if (data.d != "") {

        ClearFields();
        
        var jsonObj = jsonParse(data.d);        

        $('#txtName').val(jsonObj[0].ClassName);
        $('#txtFrequency').val(jsonObj[0].ClassFrequency);
    }
}
function onSuccess(data, status) {

    var msg = '';
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
        }

        ClearFields();
        $('#hdnMode').val("");

        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

//        $.fn.jQueryMsg({
//            msg: msg,
//            msgClass: 'alert',
//            fx: 'slide',
//            speed: 500
//        });


      //  $("#btnRefresh").trigger('click');
    }
    else if (data.d == "Duplicate Name!") {

        alert('Class already exist! Try different');
        return false;

        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

    }
    else if (data.d == "Not able to delete this record due to linkup.") {

        $.fn.jQueryMsg({
            msg: data.d,
            msgClass: 'alert',
            fx: 'slide',
            speed: 500
        });

        $('#divConfirmation').jqmHide();
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
}
function startingAjax() {
    $('#imgLoading').show();
}
function ClearFields() {

    $('#txtName').val("");
    $('#txtFrequency').val("");
}
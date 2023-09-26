// Global Variables
var QualificationId = 0;
var myData = "", msg = "", mode = "", jsonObj = "";

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
                required: true,
               // alpha: true
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

    myData = "{'qualififcationId':'" + QualificationId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorQualification.asmx/DeleteQualification",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

    return false;
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

    myData = "{'qualificationName':'" + $('#txtName').val() + "','isActive':'" + $('#chkActive').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorQualification.asmx/InsertQualification",
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
    QualificationId = sender.toString();
    myData = "{'qualificationId':'" + QualificationId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorQualification.asmx/GetQualification",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetQualification,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    QualificationId = sender.QulificationId;
    $('#divConfirmation').jqmShow();
}
function UpdateData() {

    myData = "{'qualificationId':'" + QualificationId + "','qualificationName':'" + $('#txtName').val() + "','isActive':'" + $('#chkActive').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorQualification.asmx/UpdateQualification",
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
function onSuccessGetQualification(data, status) {

    if (data.d != "") {

        ClearFields();

        var jsonObj = jsonParse(data.d);
        
        $('#txtName').val(jsonObj[0].QualificationName);
        $('#chkActive').attr("checked", jsonObj[0].IsActive);
    }
}
function onSuccess(data, status) {

    msg = '';
    if (data.d == "OK") {

        mode = $('#hdnMode').val();
      

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
        msg = 'Qualification already exist! Try different';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
        return false;
    }
    else if (data.d == "Not able to delete this record due to linkup.") {

        $('#divConfirmation').jqmHide();
        msg = 'Doctor is present on this Qualification, so unable to delete this Qualification.';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
    }
}
function onError(request, status, error) {

    msg = 'Error occoured';
    $('#hlabmsg').append(msg);
    $('#Divmessage').jqmShow();
 
}
function startingAjax() {
    $('#imgLoading').show();
}
function ClearFields() {

    $('#txtName').val("");
    $('#chkActive').attr("checked", true);
}
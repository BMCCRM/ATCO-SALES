// Global Variables
var SettingId = 0;

// Page Load Event
function pageLoad() {
  
    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
}

//   Button Click Events 
function btnSaveClicked() {

    var isValidated = $('#form1').validate({
        rules: {
            txtValue: {
                required: true               
            }
        }
    });

    if (!$('#form1').valid()) {
        return false;
    }

    var mode = $('#hdnMode').val();

    if (mode === "EditMode") {
        UpdateData();
    }
    else {
        return false;
    }

    ClearFields();
    return false;
}
function btnCancelClicked() {

    ClearFields();
    return false;
}

// Functions
function LoadForEdit(settingId) {

    $('#hdnMode').val("EditMode");
    SettingId = settingId;

    var myData = "{'settingId':'" + SettingId + "'}";
    $.ajax({
        type: "POST",
        url: "AppConfiguration.asmx/GetHierarchyLevel",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetHierarchy,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function UpdateData() {

    var myData = "{'settingId':'" + SettingId + "','settingValue':'" + $('#txtValue').val() + "','isActive':'" + $('#chkActive').attr("checked") + "'}";
    $.ajax({
        type: "POST",
        url: "AppConfiguration.asmx/UpdateHierarchyLevel",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        beforeSend: startingAjax,
        cache: false
    });

    ClearFields();
}
function startingAjax() {

    $('#imgLoading').show();
}
function ajaxCompleted() {

    $('#imgLoading').hide();
}
function onSuccessGetHierarchy(data, status) {

    if (data.d != "") {

        ClearFields();
        var jsonObj = jsonParse(data.d);

        $('#txtValue').val(jsonObj[0].SettingValue);
        $('#chkActive').attr("checked", jsonObj[0].isActive);
    }
}
function onSuccess(data, status) {

    var mode = $('#hdnMode').val();
    var msg = '';

    if (mode === "EditMode") {
        msg = 'Data updated succesfully!';
    }

    ClearFields();

    $.fn.jQueryMsg({
        msg: msg,
        msgClass: 'alert',
        fx: 'slide',
        speed: 500
    });

    $("#btnRefresh").trigger('click');
}
function onError(request, status, error) {

    var msg = 'Error occoured';

    $.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });
    $('#imgLoading').hide();
}
function ClearFields() {

    $('#txtValue').val("");
    $('#chkActive').attr("checked", true);
}

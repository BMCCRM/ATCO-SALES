// Global Variables
var ProductId = 0;
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

    //FillTeam();
}
function btnSaveClicked() {

    var isValidated = $('#form1').validate({
        rules: {
            txtName: {
                required: true,
                alpha: true
            }
            //ctl00$ContentPlaceHolder1$ddlTeam: {
            //    required: true
            //}
        }
    });
    //if ($('#ddlTeam').val() == "-1") {
    //    alert('Please Select Team');
    //    //return false;
    //}
    //else {
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
    //}
}
function btnCancelClicked() {

    $('#hdnMode').val("AddMode");
    ClearFields();
    ajaxCompleted();
    $("#btnRefresh").trigger('click');
    return false;
}
function btnYesClicked() {

    myData = "{'productId':'" + ProductId + "'}";

    $.ajax({
        type: "POST",
        url: "Products.asmx/DeleteProduct",
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

    myData = "{'productName':'" + $('#txtName').val()
        //+ "','teamId':'" + $('#ddlTeam').val()
        + "','isActive':'" + $('#chkActive').attr("checked") + "'}";

    $.ajax({
        type: "POST",
        url: "Products.asmx/InsertProduct",
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
    ProductId = sender.ProductId;
    //var TeamID = sender.TeamID;
    ClearFields();
    //myData = "{'productId':'" + ProductId + "','TeamId':'" + TeamID + "'}";
    myData = "{'productId':'" + ProductId + "'}";


    $.ajax({
        type: "POST",
        url: "Products.asmx/GetProduct",
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
    ProductId = sender.ProductId;
    $('#divConfirmation').jqmShow();
}
function UpdateData() {

    myData = "{'productId':'" + ProductId
        + "','productName':'" + $('#txtName').val()
         //+ "','teamId':'" + $('#ddlTeam').val()
        + "','isActive':'" + $('#chkActive').attr("checked")
        //+ "','isActiveTeam':'" + $('#chkTeamProActive').attr("checked")
            + "'}";

    $.ajax({
        type: "POST",
        url: "Products.asmx/UpdateProduct",
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

        jsonObj = jsonParse(data.d);
        $('#txtName').val(jsonObj[0].ProductName);
        //$(jsonObj).each(function (i, key) {
        //    $("#ddlTeam option[value=" + key.Level3ID + "]").attr('selected', true);
        //});
        $('#chkActive').attr("checked", jsonObj[0].IsActive == "True" ? true : 0);
        //$('#chkTeamProActive').attr("checked", jsonObj[0].IsActiveTeam == "True" ? true : 0);
    }
}
function onSuccess(data, status) {
    //var IsTeamActive = $('#chkTeamProActive').attr("checked");
    var IsProductActive = $('#chkActive').attr("checked");
    if (data.d == "OK") {

        mode = $('#hdnMode').val();
        msg = '';

        if (mode === "AddMode") {
            msg = 'Data inserted succesfully!';
        }
        else if (mode === "EditMode") {
            //msg = (IsProductActive == false && IsTeamActive == true) ? "Team cannot be enabled while product is disabled" : 'Data updated succesfully!';
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
        msg = 'Brand already exist! Try different Name.';
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

    $('#txtName').val("");
    //$('#ddlTeam').val("");
    $('#chkActive').attr("checked", true);
}
function OnChangeddG1() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    $.ajax({
        type: "POST",
        url: "Products.asmx/GetTeamDatawithGroupId",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: onSuccessG1,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

    $('#dialog').jqmHide();
}

function onSuccessG1(data, status) {
    var jsonData = JSON.parse(data.d);
    if (data.d != '') {
        $.each(jsonData, function (i, tweet) {
            $("#dG1").append("<option value='" + tweet.ID + "'>" + tweet.TeamName + "</option>");
        });
    }

}
//function FillTeam() {
//    $('#dialog').jqm({ modal: true });
//    $('#dialog').jqm();
//    $('#dialog').jqmShow();


//    $.ajax({
//        type: "POST",
//        url: "Products.asmx/GetTeam",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        async: false,
//        success: onSuccessFillTeam,
//        error: onError,
//        beforeSend: startingAjax,
//        complete: ajaxCompleted,
//        cache: false

//    });

//    $('#dialog').jqmHide();
//}

//function onSuccessFillTeam(data, status) {
//    var jsonData = JSON.parse(data.d);
//    if (data.d != '') {
//        $.each(jsonData, function (i, tweet) {
//            $("#ddlTeam").append("<option value='" + tweet.ID + "'>" + tweet.TeamName + "</option>");
//        });
//    }

//}
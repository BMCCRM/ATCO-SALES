
//pAGE LOAD
function pageLoad() {

    var cdt = new Date();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var current_mint = cdt.getMinutes();
    var current_hrs = cdt.getHours();
    var current_date = cdt.getDate();
    var current_date2 = current_date - 1;


    var current_month = cdt.getMonth();
    var current_month = current_month + 1;
    var month_name = monthNames[current_month];
    var current_year = cdt.getFullYear();
    $('#stdate').val(current_month + '/' + current_date2 + '/' + current_year);
    $('#enddate').val(current_month + '/' + current_date + '/' + current_year);



    GetMIO();
    GetDataInGrid();
    $('#stdate').change(OnChangedtxtDate);
    $('#enddate').change(OnChangedtxtDate);

    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#btnOk').click(btnOkClicked);

    $('#divConfirmation').jqm({ modal: true });
    $('#Divmessage').jqm({ modal: true });

    if ($('.deleteSortingRemove').hasClass('sorting')) {
        $('.editSortingRemove').removeClass('sorting');
        $('.deleteSortingRemove').removeClass('sorting');
    }

}
function onCalendarShown() {

    var cal = $find("calendar1");
    cal._switchMode("months", true);

    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.addHandler(row.cells[j].firstChild, "click", call);
            }
        }
    }
}
function onCalendarHidden() {
    var cal = $find("calendar1");

    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.removeHandler(row.cells[j].firstChild, "click", call);
            }
        }
    }
}
function OnChangedtxtDate() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    GetDataInGrid();

    $('#dialog').jqmHide();

}
//cALENDER eND HERE
// Generating and populating MIO's Table
function GetMIO() {
    $.ajax({
        type: "POST",
        url: "FMOFeedBack.asmx/GetMIO",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data, status) {
            $("#ddlMIO").empty();
            $("#ddlMIO").append("<option value='-1'>Select SPOs</option>");
            if (data.d == "No") {

            }
            else {
                var msg = JSON.parse(data.d);
                $.each(msg, function (i, option) {
                    $("#ddlMIO").append("<option value='" + option.EmployeeId + "'>" + option.EmployeeName + "</option>");
                });
            }

        },

        error: onError,
        cache: false

    });

}
// Save Data Table
function SaveData() {

    //var docdate = $('#stdate').val();
    var MIOId = $('#ddlMIO').val();
    var Comment = $('#txtmainComments').val();
    //var appointmentDate = $('#txtAppointmentDate').val()

    if (stdate == -1) {
        alert("Select Date..!");
        return false;
    }
    if (MIOId == -1) {
        alert("Please Select SPOs..!");
        return false;
    }

    var emailReg = /[`~<>;':"/[\]|{}()=_+-]/;
    if (emailReg.test(Comment)) {
        alert('Only ?@.,!/ Special Characters allowed');
        return false;
    }

    if (Comment == "") {
        alert("Please Enter Comment..!");
        return false;
    }


    $('#hdnMode').val("AddMode");
    //var stdate = $('#stdate').val();
    //var enddate = $('#enddate').val();
    var MIOId = $('#ddlMIO').val();
    var Comment = $('#txtmainComments').val();
    myData = '{"MIOId":"' + MIOId + '","Comment":"' + Comment + '"}';
    $.ajax({
        type: "POST",
        url: "FMOFeedBack.asmx/InsertMIOComments",
        //data: JSON.stringify({ mappingData: myData }),
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        async: false
    });
}
function ClearFields() {

    $('#ddlMIO').val("");
    $('#txtmainComments').val("");

}
function ajaxCompleted() {

    $('#imgLoading').hide();
}
function startingAjax() {

    $('#imgLoading').show();
}
function onSuccess(data, status) {

    if (data.d == "OK") {

        mode = $('#hdnMode').val();
        msg = '';

        if (mode === "AddMode") {
            msg = 'Data inserted successfully!';
            GetDataInGrid();

        }
        else if (mode === "EditMode") {
            msg = 'Data updated successfully!';
            GetDataInGrid();
            $('#btnSave').val('Submit');

        }
        else if (mode === "DeleteMode") {
            msg = 'Data deleted successfully!';
            $('#divConfirmation').jqmHide();
            GetDataInGrid();
        }
        ClearFields();
        $('#hdnMode').val("");
        $('#hlabmsg').text(msg);
        $('#Divmessage').jqmShow();
    }
    else if (data.d == "Not able to delete this record due to linkup.") {
        $('#divConfirmation').jqmHide();
        msg = 'Not able to delete this record due to linkup.';
        $('#hlabmsg').text(msg);
        $('#Divmessage').jqmShow();
    }
}
function btnSaveClicked() {

    var isValidated = $('#form1').validate({
        rules: {
            txtName: {
                required: true,
                alpha: true
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
//Delete work here....
function btnYesClicked() {
    //deleteid is a variable name
    myData = "{'DeleteId':'" + id + "'}";

    $.ajax({
        type: "POST",
        url: "FMOFeedBack.asmx/DeleteMioComment",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //success: function (data, status) {
        //    $('#ComFeedback').empty();
        //    if (data.d == "OK") {
        //        alert("Deleted successfully");
        //        GetDataInGrid();
        //    }
        //},
        success: onSuccess,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    id = sender;
    $('#divConfirmation').jqmShow();
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
//Edit Grid
function oGrid_Edit(sender) {
    $('#btnSave').val('Update');
    $('#hdnMode').val("EditMode");
    ClearFields();
    id = sender;

    myData = "{'MIOeditId':'" + id + "'}";

    $.ajax({
        type: "POST",
        url: "FMOFeedBack.asmx/EditComent",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetComment,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetComment(data, status) {
    if (data.d != "") {

        ClearFields();

        jsonObj = jsonParse(data.d);
        $('#ddlMIO').val(jsonObj[0].MioId);
        $('#txtmainComments').val(jsonObj[0].Comment);

    }
}
//Update FeedBack Comments
function UpdateData() {

    $('#hdnMode').val("EditMode");
    var MIOId = $('#ddlMIO').val();
    var Comment = $('#txtmainComments').val();
    var emailReg = /[`~<>;':"/[\]|{}()=_+-]/;
    if (emailReg.test(Comment)) {
        alert('Only ?@.,!/ Special Characters allowed');
        return false;
    }

    myData = "{'Id':'" + id + "','MIOId':'" + MIOId + "','Comment':'" + Comment + "'}";

    $.ajax({
        type: "POST",
        url: "FMOFeedBack.asmx/UpdateFeedbackComment",
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
//Get Data Of FeedBack IN Grid
function GetDataInGrid() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    $('#ComFeedback').show();
    $('#BrickDoctors').hide();
    $('#BrickDoctorscheck').hide();

    var stdate = $('#stdate').val();
    var enddate = $('#enddate').val();

    myData = "{'stdate':'" + stdate + "','enddate':'" + enddate + "'}";

    $.ajax({
        type: "POST",
        url: "FMOFeedBack.asmx/GetDataInGrid",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessGridFill,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

    $('#dialog').jqmHide();

}
function onSuccessGridFill(data, status) {
    $('#ComFeedback').empty();
    $('#ComFeedback').prepend($('<table id="datatables" class="display " style="width: 670px;"><thead><tr><th Class="ob_gC_Fc textAlignLeft" style="width:110px">Created Date</th><th Class="ob_gC_Fc textAlignLeft" style="width:150px">Employee Name</th><th Class="ob_gC_Fc textAlignLeft">Comment</th><th Class="ob_gC_Fc editSortingRemove">Edit</th><th Class="ob_gC_Fc deleteSortingRemove">Delete</th></tr></thead><tbody>'));
    jsonObj = jsonParse(data.d);
    $.each(jsonObj, function (i, option) {
        $('#datatables').append($("<tr><td class='ob_text textAlignLeft'>" + option.Date + "</td><td class='ob_text textAlignLeft textAlignLeft'>" + option.EmployeeName + "</td><td class='ob_text textAlignLeft'>" + option.Comment + "</td>"
             + '<td style="width:80px"><a href="#" class="fmoEditBtn" onclick="oGrid_Edit(' + option.id + ');return false" style="display: block;text-align: center;">Edit</a>' + "</td><td class='ob_text' style='width:80px'>"
            + '<a href="#" onclick="oGrid_Delete(' + option.id + ');return false">Delete</a>' + '</td></tr>'));
    });


    $('#ComFeedback').append($('</tbody></table>'));

    $('#datatables').dataTable({
        "sPaginationType": "full_numbers"
    });
}
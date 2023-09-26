var validation;
var validationInsertSurveyFormRules;
var validationInsertSurveyFormMessages;

var formId;


$(document).ready(function () {

    $2('#divConfirmation').jqm({ modal: true });
    $2('#Divmessage').jqm({ modal: true });

    $('#btnDeleteYes').click(DeleteConfirm);
    $('#btnDeleteNo').click(DeleteCancel);
    $('#btnOk').click(OKClick)


    $("#startDate").datepicker({ dateFormat: 'mm/dd/yy' }).datepicker("setDate", new Date());
    $("#endDate").datepicker({ dateFormat: 'mm/dd/yy' }).datepicker("setDate", new Date());

    FillMainFormGrid();
    GetFormTypes();

    $('#btnSaveForm').click(InsertRateForm);
    $('#btnUpdateForm').click(UpdateRateForm);
    $('#btnClearForm').click(ClearMasterFormFields);


    validation = $('#form1').validate({
        errorElement: "div",
        errorClass: "help-block help-block-error",
        focusInvalid: !1, ignore: "",
        highlight: function (e) { $(e).closest(".form-group").addClass("has-error") },
        unhighlight: function (e) { $(e).closest(".form-group").removeClass("has-error") },
        success: function (e) { e.closest(".form-group").removeClass("has-error") },
    });

    validationInsertSurveyFormRules = {
        frmType: { required: true },
        frmName: { required: true },
     
        startDate: {
            required: true,
            date: true
        },
        endDate: {
            required: true,
            date: true
        }
    };

    validationInsertSurveyFormMessages = {
        frmType: {
            required: 'Please select form type'
        },
        startDate: {
            required: 'Please pick start date'
        },
        endDate: {
            required: 'Please pick end date'
        }
    };

});


function GetFormTypes() {
    $.ajax({
        type: "POST",
        url: "Rate.asmx/GetFormTypes",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetFormTypes,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function onSuccessGetFormTypes(data, status) {
    debugger
    if (data.d != '') {
        var jsonObj = jsonParse(data.d);
        $("#frmType").empty();
        $("#frmType").append("<option value=''>Select Form Type</option>");
        if (jsonObj.length > 0) {
            $.each(jsonObj, function (i, option) {
                $("#frmType").append("<option value='" + option.ID + "'>" + option.FormType + "</option>");
            });
        }
    }
}


function FillMainFormGrid() {
    debugger
    $.ajax({
        type: "POST",
        url: "Rate.asmx/GetAllRatingForm",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"formId":"' + "0" + '"}',
        success: onSuccessGridFillMainFormGrid,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function onSuccessGridFillMainFormGrid(data, status) {
    //$('#FormsRecord').DataTable().destroy();
    var tabledata;

    $('#MasterFormList').empty();
    $('#MasterFormList').append('<table class="table table-striped table-bordered" id="FormsRecord">' +
            '<thead>' +
                '<tr>' +
                    '<th style="width: 80px;">S.No:</th>' +
                    '<th style="width: 200px;">Rating Form Type</th>' +
                    '<th style="width: 200px;">Rating Form Name</th>' +
                    '<th style="width: 250px;">Rating Form Description</th>' +
                     '<th style="width: 250px;">Created By</th>' +
                    //'<th style="width: 140px;">Start Date</th>' +
                    //'<th style="width: 140px;">End Date</th>' +
                    '<th style="width: 110px;"></th>' +
                '</tr>' +
            '</thead>' +
            '<tbody id="MasterFormListGrid">');

    if (data.d != '') {
        var jsonObj = jsonParse(data.d);

        for (var i = 0; i < jsonObj.length; i++) {

            tabledata += "<tr>" +
                    "<td style='vertical-align: middle;'>" + (i + 1) + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].RatingFormType + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].RatingFormName + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].RatingFormDescription + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].EmployeeName + "</td>" +
                    //"<td style='vertical-align: middle;'>" + jsonObj[i].StartDate + "</td>" +
                    //"<td style='vertical-align: middle;'>" + jsonObj[i].EndDate + "</td>" +
                    "<td style='vertical-align: middle;'>" +
                        "<button type='button' onclick='GetRateForm(" + jsonObj[i].ID + ");' class='btn btn-xs btn-primary' data-toggle='tooltip' title='Edit'><i class='fa fa-edit'></i></button>&nbsp;" +
                        "<button type='button' onclick='On_Delete_Form(" + jsonObj[i].ID + ")' class='btn btn-xs btn-danger' data-toggle='tooltip' title='Delete'><i class='fa fa-times'></i></button>&nbsp;" +
                        "<button type='button' onclick='On_View_Questions(" + jsonObj[i].ID + ", \"" + jsonObj[i].RatingFormName + "\")' class='btn btn-xs btn-info' data-toggle='tooltip' title='Add/View Questions'><i class='fa fa-plus'></i></button>" +
                    "</td>" +
                "</tr>";
        }
        //tabledata += "</tbody></table>";

        $('#MasterFormListGrid').append(tabledata);
        $('#MasterFormList').append('</tbody></table>');
    }
    if (!$.fn.DataTable.isDataTable('#FormsRecord')) {
        $('#FormsRecord').DataTable({
            "columnDefs": [
                    { "orderable": false, "targets": -1 }
            ]
        });
    }
    else {
        $('#FormsRecord').DataTable({
            "columnDefs": [
                    { "orderable": false, "targets": -1 }
            ]
        });
    }
}


function GetRateForm(id) {
    debugger
    $.ajax({
        type: "POST",
        url: "Rate.asmx/GetAllRatingForm",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"formId":"' + id + '"}',
        success: onSuccessEditRateForm,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function onSuccessEditRateForm(data, status) {
    debugger
    if (data.d != '') {
        $('#frmType').attr('disabled', 'disabled');
        var jsonObj = jsonParse(data.d);
        if (jsonObj.length > 0) {

            formId = jsonObj[0].ID;

            $('#frmType').val(jsonObj[0].RatingFormTypeId);
            $('#frmName').val(jsonObj[0].RatingFormName);
            $('#frmDescription').val(jsonObj[0].RatingFormDescription);
          
           
            //$('#startDate').val(jsonObj[0].StartDate);
            //$('#endDate').val(jsonObj[0].EndDate);

            $('#btnUpdateForm').show();
            $('#btnSaveForm').hide();

            $('html,body').animate({
                scrollTop: $("#MasterFormFields").offset().top
            }, 'slow');
        }
    }

}


function InsertRateForm() {

    debugger
    validation.resetForm();
    validation.settings.rules = validationInsertSurveyFormRules;
    validation.settings.messages = validationInsertSurveyFormMessages;

    if (!$('#form1').valid()) {
        return false;
    }

    var regex = new RegExp("^[ ]+$");
    var frmName = document.getElementById("frmName").value;
    frmName = $.trim(frmName)
    var frmDescription = document.getElementById("frmDescription").value;

    if (regex.exec(frmName) == null && frmName =='') {
        $('#Divmessage').find('.jqmTitle').html('Alert!');
        $('#Divmessage').find('#hlabmsg').html('<b>Please remove space from \"Form Name\" text fields.</b>');
        $2('#Divmessage').jqmShow();
        return false;
    }
    else {
        var formtype = $('#frmType').val();
        var formname = $('#frmName').val();
        var formdesc = $('#frmDescription').val();
      

            $.ajax({
                type: "POST",
                url: "Rate.asmx/InsertRatingForm",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: '{"formType":"' + formtype + '","formName":"' + formname + '","formDesc":"' + formdesc + '"}',
                success: onSuccessInsertRateForm,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                async: false,
                cache: false
            });
        //}
    }    
}

function onSuccessInsertRateForm(data, status) {

    if (data.d != "") {
        var jsonObj = jsonParse(data.d);
        $("#form1").validate().resetForm();
        if (jsonObj.length > 0) {
            $('#frmType').val("");
            $('#frmName').val("");
            $('#frmDescription').val("");
            $('#startDate').val("");
            $('#endDate').val("");
            $("#startDate").datepicker({ dateFormat: 'mm/dd/yy' }).datepicker("setDate", new Date());
            $("#endDate").datepicker({ dateFormat: 'mm/dd/yy' }).datepicker("setDate", new Date());

            $('#Divmessage').find('#hlabmsg').text('Form saved successfully!')
            $2('#Divmessage').jqmShow();

            $('html,body').animate({
                scrollTop: $("#MasterFormList").offset().top
            }, 'slow');
        }
    }
    FillMainFormGrid();
}


function UpdateRateForm() {

    debugger
    validation.resetForm();
    validation.settings.rules = validationInsertSurveyFormRules;
    validation.settings.messages = validationInsertSurveyFormMessages;

    if (!$('#form1').valid()) {
        return false;
    }

    var formtype = $('#frmType').val();
    var formname = $('#frmName').val();
    var formdesc = $('#frmDescription').val();
   
        $.ajax({
            type: "POST",
            url: "Rate.asmx/UpdateRateForm",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"id":"' + formId + '","formType":"' + formtype + '","formName":"' + formname + '","formDesc":"' + formdesc + '"}',
            success: onSuccessUpdateRateForm,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });

}

function onSuccessUpdateRateForm(data, status) {
    if (data != "") {

        $('#Divmessage').find('#hlabmsg').text('Form updated successfully!');
        $2('#Divmessage').jqmShow();


        $("#form1").validate().resetForm();

        formId = 0;

        $('#btnUpdateForm').hide();
        $('#btnSaveForm').show();

        $('#frmType').removeAttr('disabled');
        $('#frmName').val("");
        $('#frmDescription').val("");
      
    }

    FillMainFormGrid();
    $('html,body').animate({
        scrollTop: $("#MasterFormList").offset().top
    }, 'slow');
}


function On_Delete_Form(id) {
    formId = id;

    $2('#divConfirmation').jqmShow();
}


function DeleteConfirm() {
    if (formId == 0) {
        $('#Divmessage').find('#hlabmsg').text('Please select for to delete')
        $2('#divConfirmation').jqmHide();
        $2('#Divmessage').jqmShow();
    }
    else {
        $.ajax({
            type: "POST",
            url: "Rate.asmx/DeleteRateForm",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"formId":"' + formId + '"}',
            success: onSuccessDeleteRateForm,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });
    }
}

function DeleteCancel() {
    formId = 0;
    $2('#divConfirmation').jqmHide();
}

function onSuccessDeleteRateForm(data, status) {
    debugger
    if (data.d == "Deleted") {
        $('#Divmessage').find('#hlabmsg').text('Form deleted successfully!')
        $2('#divConfirmation').jqmHide();
        $2('#Divmessage').jqmShow();
    }
    else if (data.d == "No delete") {
        $2('#divConfirmation').jqmHide();
        $('#Divmessage').find('#hlabmsg').text('Form could not Deleted due to LinkUp.')
        $2('#Divmessage').jqmShow();
    }
    ClearMasterFormFields();
    FillMainFormGrid();
}

function OKClick() {
    $2('#Divmessage').jqmHide();
}


function On_View_Questions(Id, Name) {
    debugger
    $.cookie('FormId', Id, { path: '/' });
    $.cookie('FormName', Name, { path: '/' });
    window.open('./RateFormQuestions.aspx', '_blank');
};

function ClearMasterFormFields() {

    formId = 0;

    $("#form1").validate().resetForm();

    $('#btnUpdateForm').hide();
    $('#btnSaveForm').show();

	$('#frmType').val("");
    $('#frmType').removeAttr('disabled');
    $('#frmName').val("");
    $('#frmDescription').val("");
    //$('#startDate').val("");
    //$('#endDate').val("");
    //$("#startDate").datepicker({ dateFormat: 'mm/dd/yy' }).datepicker("setDate", new Date());
    //$("#endDate").datepicker({ dateFormat: 'mm/dd/yy' }).datepicker("setDate", new Date());


    $('html,body').animate({
        scrollTop: $("#MasterFormFields").offset().top
    }, 'slow');
}

function onError(request, status, error) {
    $('#Divmessage').find('#hlabmsg').empty();
    $('#Divmessage').find('#hlabmsg').text('Error is occured.');
    $2('#Divmessage').jqmShow();
}
function startingAjax() {
    $('#UpdateProgress1').show();
}
function ajaxCompleted() {
    $('#UpdateProgress1').hide();
}
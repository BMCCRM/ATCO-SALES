var maxAnswerFields = 8;
var num = 1;
var mode;
var formId;
var questionId;
var ddanstype;
var NewFlagForAutoSaveAnswer=0;

var regex = new RegExp("^[0-9a-zA-Z\.\?\b ]+$");

var validation;
var validationMasterFormAddQuestionRules;
var validationMasterFormAddQuestionMessages;

$(document).ready(function () {

    $2('#divConfirmation').jqm({ modal: true });
    $2('#Divmessage').jqm({ modal: true });

    $('#btnDeleteYes').click(DeleteConfirm);
    $('#btnDeleteNo').click(DeleteCancel);
    $('#btnOk').click(OKClick)


    if ($.cookie('FormId') != undefined && $.cookie('FormName') != undefined) {
        formId = $.cookie('FormId');
        var formName = $.cookie('FormName');

        $('.FormName').text(formName);
        //$('#ddlForm').val(formId);
        //onChangeForm();
        //$.cookie('FormId', "-1", { path: '/' });
    }
    else {
        window.open('./SurveyForm2.aspx', '_self');
        $('.FormName').text('No Form was selected. Redirecting to master page');
    }

    mode = "Add";

    FillQuestionsGrid();

    $('#btnAddAnotherAnswer').hide();
    $('#btnSaveAnswer').hide();

    $('#btnAddQuestion').click(AddQuestion);
    $('#btnSaveQuestion').click(SaveQuestion);
    $('#btnAddAnotherAnswer').click(AddAnotherAnswer);
    $('#btnSaveAnswer').click(SaveAnswer);
    $('#btnRemoveAnswer').click(RemoveAnswer);

    $('#btnUpdateAnswer').click(UpdateQuestionAnswer);

    $('#btnResetFields').click(resetAllFields);

    validation = $('#form1').validate({
        errorElement: "div",
        errorClass: "help-block help-block-error",
        focusInvalid: !1, ignore: "",
        highlight: function (e) { $(e).closest(".form-group").addClass("has-error") },
        unhighlight: function (e) { $(e).closest(".form-group").removeClass("has-error") },
        success: function (e) { e.closest(".form-group").removeClass("has-error") },
    });


    validationMasterFormAddQuestionRules = {
        frmQ: { required: true },
        //frmToolTip: { required: true },
        ddAsnwerType: { required: true }
    };

    validationMasterFormAddQuestionMessages = {
        ddAsnwerType: {
            required: 'Please select answer type'
        }
    };

});


function FillQuestionsGrid() {

    $.ajax({
        type: "POST",
        url: "Rate.asmx/GetRateFormAllQuestions",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"formId":"' + formId + '"}',
        success: onSuccessFillFormQuestionsGrid,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function onSuccessFillFormQuestionsGrid(data, status) {

    var tabledata;

    $('#FormQuestionsList').empty();
    $('#FormQuestionsList').append('<table class="table table-striped table-bordered" id="FormsQuestionsRecord">' +
    '<thead>' +
        '<tr>' +
            '<th style="width: 80px;">Q.No:</th>' +
            '<th>Question</th>' +
            '<th style="width: 180px;">Question Type</th>' +
            '<th style="width: 180px;">Tool Tips</th>' +
            '<th style="width: 130px;">Created Date</th>' +
            '<th style="width: 110px;"></th>' +
        '</tr>' +
    '</thead>' +
    '<tbody id="FormQuestionsListGrid">');

    
    if (data.d != '') {
        var jsonObj = jsonParse(data.d);

        for (var i = 0; i < jsonObj.length; i++) {
            var type = (jsonObj[i].QType == "txt" ? '<input type="text" placeholder=" Text Box" disabled="disabled" />' : jsonObj[i].QType == "rb" ? '<input type="radio" disabled="disabled" /> Radio Button' : jsonObj[i].QType == "cb" ? '<input type="checkbox" disabled="disabled" /> Checkbox' : "");
            tabledata += "<tr>" +
                    "<td style='vertical-align: middle;'>" + (i + 1) + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].Question + "</td>" +
                    "<td style='vertical-align: middle;'>" + type + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].Tooltip + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].CreateDate + "</td>" +
                    "<td style='vertical-align: middle;'>" +
                        "<button type='button' onclick='On_Edit_Question(" + jsonObj[i].ID + ");' class='btn btn-xs btn-primary' data-toggle='tooltip' title='Edit'><i class='fa fa-pencil'></i></button>&nbsp;" +
                        "<button type='button' onclick='On_Delete_Question(" + jsonObj[i].ID + ")' class='btn btn-xs btn-danger' data-toggle='tooltip' title='Delete'><i class='fa fa-times'></i></button>&nbsp;" +
                    "</td>" +
                "</tr>";
        }

        $('#FormQuestionsListGrid').append(tabledata);
        $('#FormQuestionsList').append('</tbody></table>');
    }

    if (!$.fn.DataTable.isDataTable('#FormsQuestionsRecord')) {
        $('#FormsQuestionsRecord').DataTable({
            "columnDefs": [
                        { "orderable": false, "targets": -1 }
            ]
        });
    }
    else {
        $('#FormsQuestionsRecord').DataTable({
            "columnDefs": [
                        { "orderable": false, "targets": -1 }
            ]
        });
    }
}


function AddQuestion() {
    $('#MasterFormQuestions').show();
    $('#btnAddQuestion').hide();
}

function SaveQuestion() {
    validation.resetForm();
    validation.settings.rules = validationMasterFormAddQuestionRules;
    validation.settings.messages = validationMasterFormAddQuestionMessages;

    if (!$('#form1').valid()) {
        return false;
    }

    var frmQ = document.getElementById("frmQ").value;
    var regex1 = new RegExp("^[ ]+$");
    frmQ = $.trim(frmQ)



    if (regex1.exec(frmQ) == null && frmQ == '') {
        $('#Divmessage').find('.jqmTitle').html('Alert!');
        $('#Divmessage').find('#hlabmsg').html('<b>Please remove space from \"Question\" text fields.</b>');
        $2('#Divmessage').jqmShow();
        return false;
    }
    else
    {
        if ($('#ddAsnwerType').val() == 'txt') {

            var frmQuestion = $('#frmQ').val();
            var AsnwerType = $('#ddAsnwerType').val();
            var ToolTip = $('#frmToolTip').val();

            if (formId == undefined || formId == 0) {
                window.open('./Rate.aspx', '_self');
            }
            else {

                $.ajax({
                    type: "POST",
                    url: "Rate.asmx/InsertFormQuestion",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: '{"formId":"' + formId + '","frmQuestion":"' + frmQuestion + '","AsnwerType":"' + AsnwerType + '","Tooltip":"' + ToolTip + '"}',
                    success: onSuccessAddQuestionTypeText,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    async: false,
                    cache: false
                });
            }
        }
        else {


            var frmQuestion = $('#frmQ').val();
            var AsnwerType = $('#ddAsnwerType').val();
            var ToolTip = $('#frmToolTip').val();

            if (formId == undefined || formId == 0) {
                window.open('./Rate.aspx', '_self');
            }
            else {

                $.ajax({
                    type: "POST",
                    url: "Rate.asmx/InsertFormQuestion",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: '{"formId":"' + formId + '","frmQuestion":"' + frmQuestion + '","AsnwerType":"' + AsnwerType + '","Tooltip":"' + ToolTip + '"}',
                    success: onSuccessAddQuestion,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    async: false,
                    cache: false
                });
            }
        }
    }
}

function onSuccessAddQuestion(data, status) {

    var type = $('#ddAsnwerType').val();

    if (data.d != '') {
        var jsonObj = jsonParse(data.d);
        if (jsonObj.length > 0) {
            mode = 'AddQ';
            questionId = jsonObj[0].ID;

            $('#btnSaveQuestion').hide();
            //$('#btnUpdateQuestion').show();
            //$('#btnResetFields').show();
            //$('#btnAddAnotherAnswer').show();
            $('#btnSaveAnswer').show();

            $('#MasterFormQuestionAnswer').empty();
            $('#MasterFormQuestionAnswer').show();

            for (var i = 0; i < 5;i++)
            {
                $('#MasterFormQuestionAnswer').append('<div class="row">' +
                    '<div class="col-md-3">' +
                        '<div class="form-group">' +
                            '<label for="frmQA' + (i + 1) + '">Answer ' + (i + 1) + ':</label>' +
                            '<input type="text" class="form-control answerTextboxes" id="frmQA' + (i + 1) + '" name="frmQA' + (i + 1) + '" placeholder="Answer ' + (i + 1) + '" required="required" value="' + (i + 1) + '" disabled="disabled" />' +
                        '</div>' +
                    '</div>' +
                     '<div class="col-md-3">' +
                        '<div class="form-group">' +
                            '<label for="frmQAToolTip' + (i + 1) + '">Tool Tip ' + (i + 1) + ':</label>' +
                            '<input type="text" class="form-control ToolTipTextboxes" id="frmQAToolTip' + (i + 1) + '" name="frmQAToolTip' + (i + 1) + '" placeholder="Tool Tip ' + (i + 1) + '" maxlength="500"/>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-md-3">' +
                        '<div class="form-group" style="padding-top: 30px;">' +
                            (type == 'rb' ? '<label><input type="radio" id="isEditable' + (i + 1) + '" name="isEditable"  value="' + (i + 1) + '" />&nbsp;Is Editable</label>' : '') +
                        '</div>' +
                    '</div>' +
                '</div>');
            }
            $('html,body').animate({
                scrollTop: $("#MasterFormQuestionAnswer").offset().top
            }, 'slow');
            var QID = questionId
            NewFlagForAutoSaveAnswer=1
            SaveAnswer();
            On_Edit_Question(QID);
        }
    }
  
    FillQuestionsGrid();
  
}

function SaveAnswer() {

    if (!$('#form1').valid()) {
        return false;
    }

    var answers = [];
    var tooltips = [];

    var flag;
    $(".answerTextboxes").each(function () {
        debugger
        if (regex.exec($(this).val()) == null) {
            $('#Divmessage').find('.jqmTitle').html('Alert!');
            $('#Divmessage').find('#hlabmsg').html('<b>Only Letters, digits and Spaces are allowed! <br />Please remove any special character from text fields.</b>');
            $2('#Divmessage').jqmShow();

            answers = [];

            flag = false;
            return false;
        }
        else {
            answers.push($(this).val());
            flag = true;
        }
    });

    $(".ToolTipTextboxes").each(function () {
        debugger
        if (regex.exec($(this).val()) == null) {
            tooltips.push('');
            flag = true;
        }
        else {
            tooltips.push($(this).val());
            flag = true;
        }
    });

    if (flag == true) {
        var fieldNum;
        if ($("input[name='isEditable']").is(':checked')) {
            fieldNum = $('input[type=radio][name=isEditable]:checked').attr('value');
        }
        else {
            fieldNum = 0;
        }


        $.ajax({
            type: "POST",
            url: "Rate.asmx/InsertFormQuestionAnswers",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"formId":"' + formId + '","questionId":"' + questionId + '","answer":"' + answers + '","answerNum":"' + fieldNum + '","tooltips":"' + tooltips + '"}',
            success: onSuccessSaveAnswer,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });
    }
}

function onSuccessSaveAnswer() {
    clearAllFieldsAfterAnswerAdded();
    if (NewFlagForAutoSaveAnswer != 1) {
        $('#Divmessage').find('#hlabmsg').text('Answer added successfully!')
        $2('#Divmessage').jqmShow();
        questionId = 0;
        mode = "Add";
    }
}

function AddAnotherAnswer() {

    if (!$('#form1').valid()) {
        return false;
    }

    var flag;
    $(".answerTextboxes").each(function () {
        debugger
        if (regex.exec($(this).val()) == null) {
            $('#Divmessage').find('.jqmTitle').html('Alert!');
            $('#Divmessage').find('#hlabmsg').html('<b>Only Letters, digits and Spaces are allowed! <br />Please remove any special character from text fields.</b>');
            $2('#Divmessage').jqmShow();

            answers = [];

            flag = false;
        }
        else {
            flag = true;
        }
    });

    if (flag==null)
        flag = true;

    if (flag == true) {
        var type = $('#ddAsnwerType').val();

        $('#btnRemoveAnswer').show();
        num = num + 1;
        if (num <= maxAnswerFields) {
            $('#MasterFormQuestionAnswer').append('<div class="row">' +
                    '<div class="col-md-3">' +
                    '<input type="hidden" class="AnswerIDs" id="0" value="0">' +
                        '<div class="form-group">' +
                            '<label for="frmQA' + num + '">Answer ' + num + ':</label>' +
                            '<input type="text" class="form-control answerTextboxes" id="frmQA' + num + '" name="frmQA' + num + '" placeholder="Answer ' + num + '" required="required" />' +
                        '</div>' +
                    '</div>' +
                     '<div class="col-md-3">' +
                        '<div class="form-group">' +
                            '<label for="frmQAToolTip' + num + '">Tool Tip ' + num + ':</label>' +
                            '<input type="text" class="form-control ToolTipTextboxes" id="frmQAToolTip' + num + '" name="frmQAToolTip' + num + '" placeholder="Tool Tip ' + num + '" required="required" maxlength="500"/>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-md-3">' +
                        '<div class="form-group" style="padding-top: 30px;">' +
                            (type == 'rb' ? '<label><input type="radio" id="isEditable' + num + '" name="isEditable"  value="' + num + '" />&nbsp;Is Editable</label>' : '') +
                        '</div>' +
                    '</div>' +
                '</div>');
        }
        else {
            $('#Divmessage').find('#hlabmsg').text('Cannot add more than 8 answers to 1 question.')
            $2('#Divmessage').jqmShow();
        }
    }
    
}

function RemoveAnswer() {


    var AnswerIDs = [];

    $(".AnswerIDs").each(function () {
        if (regex.exec($(this).val()) == null) {

            AnswerIDs = [];

            answerFlag = false;
            return false;
        }
        else {
            AnswerIDs.push($(this).val());
            answerFlag = true;
        }
    });

    var flag = 0;
    if (AnswerIDs.length != 0)
    {
        flag = Math.min.apply(null, AnswerIDs)
    }

    $('#frmQA' + num).parents('.row').remove();
    num = (num - 1);
    if (num == 0) {
        $('#btnRemoveAnswer').hide();
    }
    else {
        $('#btnRemoveAnswer').show();
    }
   


    if (flag != 0) {
        $.ajax({
            type: "POST",
            url: "Rate.asmx/DeleteFormAnswer",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"frmid":"' + formId + '","questionId":"' + questionId + '"}',
            success: onSuccessDeleteAnswer,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });
    }
}

function On_Delete_Question(id) {

    questionId = id;

    $2('#divConfirmation').jqmShow();



}

function DeleteConfirm() {
    if (questionId == 0) {
        $('#Divmessage').find('#hlabmsg').text('Please select question.')
        $2('#divConfirmation').jqmHide();
        $2('#Divmessage').jqmShow();
    }
    else {
        $.ajax({
            type: "POST",
            url: "Rate.asmx/DeleteFormQuestion",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"questionId":"' + questionId + '"}',
            success: onSuccessDeleteQuestion,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });
    }
}

function DeleteCancel() {
    questionId = 0;
    $2('#divConfirmation').jqmHide();
}

function onSuccessDeleteAnswer(data, status) {

    if (data.d == '') {
        $('#Divmessage').find('#hlabmsg').text('Answer not deleted.')
        $2('#Divmessage').jqmShow();
    }
    else {
        $2('#divConfirmation').jqmHide();
        $('#Divmessage').find('#hlabmsg').text('Answer deleted successfully!')
        $2('#Divmessage').jqmShow();
        questionId = 0;
        FillQuestionsGrid();
    }

    resetAllFields();
}
function onSuccessDeleteQuestion(data, status) {

    if (data.d == '') {
        $('#Divmessage').find('#hlabmsg').text('Question not deleted.')
        $2('#Divmessage').jqmShow();
    }
    else {
        $2('#divConfirmation').jqmHide();
        $('#Divmessage').find('#hlabmsg').text('Question deleted successfully!')
        $2('#Divmessage').jqmShow();
        questionId = 0;
        FillQuestionsGrid();
    }

    resetAllFields();
}

function OKClick() {
    $2('#Divmessage').jqmHide();
}

function On_Edit_Question(id) {
    mode = "Update";


    if (mode == "Update")
    {

    }
    $.ajax({
        type: "POST",
        url: "Rate.asmx/GetFormQuestion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"questionId":"' + id + '"}',
        success: onSuccessGetQuestion,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function onSuccessGetQuestion(data, status) {

    if (data.d != '') {
        
        var jsonObj = jsonParse(data.d);

        num = jsonObj.length;

        $('#MasterFormQuestions').show();
        $('#btnAddQuestion').hide();

        $('#btnSaveQuestion').hide();
        $('#btnUpdateQuestion').show();
     
        questionId = jsonObj[0].QID;
        $('#frmQ').val(jsonObj[0].Question);
        $('#ddAsnwerType').val(jsonObj[0].QuestionType);
        $('#frmToolTip').val(jsonObj[0].QTooltip);

        ddanstype = $('#ddAsnwerType').val();

        $('#MasterFormQuestionAnswer').empty();

        if (jsonObj[0].QuestionType == "txt") {
            $('#MasterFormQuestionAnswer').hide();
            $('#btnAddAnotherAnswer').hide();
            $('#btnRemoveAnswer').hide();
            $('#btnSaveAnswer').hide();
        }
        else {
            if (num == 0) {
                $('#btnRemoveAnswer').hide();
            }
            else {
                //$('#btnRemoveAnswer').show();
                $('#btnRemoveAnswer').hide();
            }

            $('#btnUpdateQuestion').hide();
            //$('#btnAddAnotherAnswer').show();
            $('#btnAddAnotherAnswer').hide();
            $('#btnSaveAnswer').hide();
            
            $('#btnUpdateAnswer').show();
            $('#MasterFormQuestionAnswer').show();

            for (var i = 0; i < jsonObj.length; i++) {

                debugger
                var AnswerID = jsonObj[i].AID;
                $('#MasterFormQuestionAnswer').append('<div class="row">' +
                        '<div class="col-md-3">' +
                            '<input type="hidden" class="AnswerIDs" id="' + AnswerID + '" value="' + AnswerID + '">' +
                            '<div class="form-group">' +
                                '<label for="frmQA' + (i + 1) + '">Answer ' + (i + 1) + ':</label>' +
                                '<input type="text" value="' + jsonObj[i].Answer + '" class="form-control answerTextboxes" id="frmQA' + (i + 1) + '" name="frmQA' + (i + 1) + '" placeholder="Answer ' + (i + 1) + '" required="required" disabled="disabled" />' +
                            '</div>' +
                        '</div>' +
                         '<div class="col-md-3">' +
                            '<div class="form-group">' +
                                '<label for="frmQAToolTip' + (i + 1) + '">Tool Tip ' + (i + 1) + ':</label>' +
                                '<input type="text" value="' + jsonObj[i].ATooltip + '" class="form-control ToolTipTextboxes" id="frmQAToolTip' + (i + 1) + '" name="frmQAToolTip' + (i + 1) + '" placeholder="Tool Tip ' + (i + 1) + '" maxlength="500"/>' +
                            '</div>' +
                        '</div>' +

                        '<div class="col-md-3">' +
                            '<div class="form-group" style="padding-top: 30px;">' +
                            (ddanstype == 'rb' ? '<label><input type="radio" id="isEditable' + AnswerID + '" name="isEditable" value="' + AnswerID + '" ' + (jsonObj[i].isEditable == "True" ? "checked='checked'" : "") + '  />&nbsp;Is Editable</label>' : '') +
                              
                            '</div>' +
                        '</div>' +
                    '</div>');
            }

        }

        $('html,body').animate({
            scrollTop: $("#MasterFormQuestionAnswer").offset().top
        }, 'slow');

    }
}


function UpdateQuestionAnswer() {

    if (!$('#form1').valid()) {
        return false;
    }

    var questionFlag;
    var answerFlag;

    var frmQ = document.getElementById("frmQ").value;

    if (regex.exec(frmQ) == null) {
        $('#Divmessage').find('.jqmTitle').html('Alert!');
        $('#Divmessage').find('#hlabmsg').html('<b>Only Letters, digits and Spaces are allowed! <br />Please remove any special character from text fields.</b>');
        $2('#Divmessage').jqmShow();
        questionFlag = false;
        return false;
    }
    else
    {
        questionFlag = true;
    }

    var answers = [];
    var ToolTips = [];
    var AnswerIDs = [];
    $(".answerTextboxes").each(function () {
        if (regex.exec($(this).val()) == null) {
            $('#Divmessage').find('.jqmTitle').html('Alert!');
            $('#Divmessage').find('#hlabmsg').html('<b>Only Letters, digits and Spaces are allowed! <br />Please remove any special character from text fields.</b>');
            $2('#Divmessage').jqmShow();

            answers = [];

            answerFlag = false;
            return false;
        }
        else {
            answers.push($(this).val());
            answerFlag = true;
        }
    });

    $(".ToolTipTextboxes").each(function () {
        if (regex.exec($(this).val()) == null) {
            ToolTips.push('');
            flag = true;
        }
        else {

            ToolTips.push($(this).val());
            answerFlag = true;
        }
    });

    $(".AnswerIDs").each(function () {
        if (regex.exec($(this).val()) == null) {
            AnswerIDs.push('0');
            answerFlag = false;
        }
        else {
            AnswerIDs.push($(this).val());
            answerFlag = true;
        }
    });

    
    if (questionFlag == true && answerFlag == true) {
        var frmQuestion = $('#frmQ').val();
        var asnwerType = $('#ddAsnwerType').val();
        var frmQToolTip = $('#frmToolTip').val();
        

        var fieldNum;
        if ($('input[type=radio][name=isEditable]:checked').attr('value')!=undefined) {
            fieldNum = $('input[type=radio][name=isEditable]:checked').attr('value');
        }
        else {
            fieldNum = 0;
        }
      
       
        $.ajax({
            type: "POST",
            url: "Rate.asmx/UpdateInsertFormQuestionAnswers",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"FormID":"' + formId + '","frmQ":"' + frmQ + '","QuestionID":"' + questionId + '","ID":"' + AnswerIDs + '","answerType":"' + asnwerType + '","answer":"' + answers + '","answerNum":"' + fieldNum + '","ToolTips":"' + ToolTips + '","QToolTip":"' + frmQToolTip + '"}',
            success: onSuccessUpdateQuestionAnswer,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });
    }

}

function onSuccessUpdateQuestionAnswer() {
    FillQuestionsGrid();
    clearAllFieldsAfterAnswerAdded();
    $('#Divmessage').find('#hlabmsg').text('Answer updated successfully!')
    $2('#Divmessage').jqmShow();
    questionId = 0;
    mode = "Add";
}

function resetAllFields() {
    clearAllFieldsAfterAnswerAdded();
}

function clearQuestionFields() {
    $("#form1").validate().resetForm();
    $('#frmQ').val('');
    $('#ddAsnwerType').val('');
    $('#frmToolTip').val('');
    $('#btnSaveQuestion').show();
    $('#btnUpdateQuestion').hide();
    $('#btnUpdateAnswer').hide();
}

function clearAllFieldsAfterAnswerAdded() {
    $("#form1").validate().resetForm();
    num = 1;
    questionId = 0;
    mode = "Add";
    $('#MasterFormQuestionAnswer').empty();
    $('#btnUpdateAnswer').hide();
    $('#btnAddAnotherAnswer').hide();
    $('#btnSaveAnswer').hide();
    $('#btnRemoveAnswer').hide();
    //$('#btnResetFields').hide();
    clearQuestionFields();
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
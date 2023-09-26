var maxAnswerFields = 8;
var num = 1;
var mode;
var formId;
var questionId;
var ddanstype;

var quizTime;
var quizScore

var qScore = 0;
var qTime = 0;

var TimeIn;
var OneTimeScore;
var DefaultEachQuestionScore = 0;

var regex = new RegExp("^[0-9a-zA-Z\.\,\'\-\+\=\*\:\_\/\?\b ]+$");

var validation;
var validationMasterFormAddQuestionRules;
var validationMasterFormAddQuestionMessages;


$(document).ready(function () {

    $2('#divConfirmation').jqm({ modal: true });
    $2('#Divmessage').jqm({ modal: true });

    $('#btnDeleteYes').click(DeleteConfirm);
    $('#btnDeleteNo').click(DeleteCancel);
    $('#btnOk').click(OKClick)
    

    if ($.cookie('QuizId') != undefined && $.cookie('QuizName') != undefined) {

        formId = $.cookie('QuizId');
        var quizName = $.cookie('QuizName');

        quizTime = $.cookie('QuizTime');
        quizScore = $.cookie('QuizScore');

        TimeIn = $.cookie('TimeIn');
        $('.TimeIn').text(TimeIn);

        OneTimeScore = $.cookie('OneTimeScore');
        DefaultEachQuestionScore = $.cookie('DefaultEachQuestionScore');

        if (OneTimeScore == 'DefaultScore') {
            $('#QuestionScoreDiv').hide();
            $('#frmScore').val(DefaultEachQuestionScore);

            $('.scoreType').text(OneTimeScore);
            $('.DefaultScoreOfQuestion').text('| Default Score For Each Question: ' + DefaultEachQuestionScore);
            $('.DefaultScoreOfQuestion').show();
        }
        else {
            $('#QuestionScoreDiv').show();
            $('#frmScore').attr('required', 'required')

            $('.scoreType').text(OneTimeScore);
        }

        $('.quizName').text(quizName);
        
        if(quizTime !='NaN')
            $('.quizTime').text(secondsTimeSpanToHMS(quizTime));
        //$('.quizTime').text(quizTime / 60);

        $('.quizScore').text(quizScore);

        $('.DefaultEachQuestionScore').text(DefaultEachQuestionScore);
    }
    else {
        window.open('./QuizTest.aspx', '_self');
        $('.quizName').text('No Form was selected. Redirecting to master page');
    }
    
    $('#btnExportQuestionExcel').click(ExportQuestionExcel);

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

    $('#ddAsnwerType').change(onChangeAnswerType);

    //$('#btnUpdateQuestion').click(UpdateQuestion);

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
        ddAsnwerType: { required: true },
        frmTime: { required: true, number: true }
        //frmScore: { required: true, number: true }
    };

    validationMasterFormAddQuestionMessages = {
        ddAsnwerType: {
            required: 'Please select answer type'
        }
    };

    $('#btnUploadQuestionExcel').uploadify({
        'swf': '../Scripts/Uploadify/uploadify.swf',
        'uploader': '../Handler/QuizTest.ashx?Type=U',
        'width': '140',
        'height': '25',
        //'wmode': 'transparent',
        'onUploadSuccess': function (file, data, response) {
            
            $.ajax({
                //url: "../Handler/DoctorMasterList.ashx?Type=" + 'PF' + '&FileName=' + file.name,
                url: "../Handler/QuizTest.ashx?Type=" + 'PF' + '&FileName=' + data + '&FormId=' + formId + '&TimeIn=' + TimeIn + '&IsOneTimeScore=' + OneTimeScore + '&DefaultScore=' + DefaultEachQuestionScore,
                contentType: "application/json; charset=utf-8",
                success: OnCompleteDownload,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                error: onError
            });

        }
    });

    $(".uploadify-button-text").text("Upload Excel");

});

function ExportQuestionExcel() {
    window.open("../Handler/QuizTest.ashx?Type=D&Id=" + formId);
};

function OnCompleteDownload(data, status) {
    FillQuestionsGrid();
    var returndata = data;
    alert(returndata);
}

function FillQuestionsGrid() {

    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/GetAllQuizTestQuestions",
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
            '<th>Time</th>' +
            '<th>Score</th>' +
            '<th style="width: 180px;">Question Type</th>' +
            '<th style="width: 120px;">Answer(s) Available</th>' +
            '<th style="width: 130px;">Created Date</th>' +
            '<th style="width: 110px;"></th>' +
        '</tr>' +
    '</thead>' +
    '<tbody id="FormQuestionsListGrid">');


    if (data.d != '') {
        var jsonObj = jsonParse(data.d);
        debugger
        quizTime = parseInt(jsonObj[1][0].FormTime);
        quizScore = parseInt(jsonObj[1][0].FormScore);

        $.cookie('QuizTime', quizTime, { path: '/' });
        $.cookie('QuizScore', quizScore, { path: '/' });

        $('.quizTime').text(secondsTimeSpanToHMS(quizTime));
        $('.quizScore').text(quizScore);

        for (var i = 0; i < jsonObj[0].length; i++) {
            var type = (jsonObj[0][i].QType == "rb" ? '<input type="radio" disabled="disabled"  style="vertical-align: sub;" /> Radio Button' : jsonObj[0][i].QType == "cb" ? '<input type="checkbox" disabled="disabled"  style="vertical-align: sub;" /> Checkbox' : jsonObj[0][i].QType == "blank" ? '<input type="text" disabled="disabled" placeholder="Blanks" />' : "");
            var validAnswer = (jsonObj[0][i].Answer == "NoAnswer" ? '<i class="fa fa-times text-danger" data-toggle="tooltip" title="This question will not be aasigned because no answer is provided"></i>' : '<i class="fa fa-check text-success"></i>');
            tabledata += "<tr>" +
                    "<td style='vertical-align: middle;'>" + (i + 1) + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[0][i].Question + "</td>" +
                    "<td class='questionTime' style='vertical-align: middle;'>" + (TimeIn == 'Minutes' ? jsonObj[0][i].Time / 60 + ' mins' : jsonObj[0][i].Time + ' secs') + "</td>" +
                    "<td class='questionPoints' style='vertical-align: middle;'>" + jsonObj[0][i].Points + "</td>" +
                    "<td style='vertical-align: middle;'>" + type + "</td>" +
                    "<td style='vertical-align: middle;' class='text-center'>" + validAnswer + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[0][i].CreateDate + "</td>" +
                    "<td style='vertical-align: middle;'>" +
                        "<button type='button' onclick='On_Edit_Question(" + jsonObj[0][i].ID + ",this);' class='btn btn-xs btn-primary' data-toggle='tooltip' title='Edit'><i class='fa fa-pencil'></i></button>&nbsp;" +
                        "<button type='button' onclick='On_Delete_Question(" + jsonObj[0][i].ID + ",this)' class='btn btn-xs btn-danger' data-toggle='tooltip' title='Delete'><i class='fa fa-times'></i></button>&nbsp;" +
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

    if (regex.exec(frmQ) == null) {
        $('#Divmessage').find('.jqmTitle').html('Alert!');
        $('#Divmessage').find('#hlabmsg').html('<b>Only Letters, digits and Spaces are allowed! <br />Please remove any special character from text fields.</b>');
        $2('#Divmessage').jqmShow();
        return false;
    }
    else {

        var frmQuestion = $('#frmQ').val();
        var AsnwerType = $('#ddAsnwerType').val();

        //if (AsnwerType == 'txt') {


        //    if (formId == undefined || formId == 0) {
        //        window.open('./QuizTest.aspx', '_self');
        //    }
        //    else {

        //        var Time = $('#frmTime').val();
        //        var Score = $('#frmScore').val();

        //        $.ajax({
        //            type: "POST",
        //            url: "QuizTestService.asmx/InsertQuizTestFormQuestion",
        //            contentType: "application/json; charset=utf-8",
        //            dataType: "json",
        //            data: '{"formId":"' + formId + '","frmQuestion":"' + frmQuestion + '","AsnwerType":"' + AsnwerType + '","Time":"' + Time + '","Score":"' + Score + '"}',
        //            success: onSuccessAddQuestionTypeText,
        //            error: onError,
        //            beforeSend: startingAjax,
        //            complete: ajaxCompleted,
        //            async: false,
        //            cache: false
        //        });
        //    }
        //}
        //else {

        if (formId == undefined || formId == 0) {
            window.open('./QuizTest.aspx', '_self');
        }
        else {

            var Time = $('#frmTime').val();
            var Score = $('#frmScore').val();
            //var Score = DefaultEachQuestionScore;

            $.ajax({
                type: "POST",
                url: "QuizTestService.asmx/InsertQuizTestFormQuestion",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: '{"formId":"' + formId + '","frmQuestion":"' + frmQuestion + '","AsnwerType":"' + AsnwerType + '","Time":"' + Time + '","TimeIn":"' + TimeIn + '","Score":"' + Score + '"}',
                success: onSuccessAddQuestion,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                async: false,
                cache: false
            });
        }
        //}
    }
}

//function onSuccessAddQuestionTypeText(data, status) {
//    debugger
//    if (data.d != '') {
//        var jsonObj = jsonParse(data.d);

//        if (jsonObj.length > 0) {

//            quizTime = parseInt(quizTime) + parseInt(jsonObj[0].Time);
//            quizScore = parseInt(quizScore) + parseInt(jsonObj[0].Points);


//            $.cookie('QuizTime', quizTime, { path: '/' });
//            $.cookie('QuizScore', quizScore, { path: '/' });

//            $('.quizTime').text(quizTime / 60);
//            $('.quizScore').text(quizScore);

//            var txtasnwer = null;
//            questionId = jsonObj[0].ID;

//            $.ajax({
//                type: "POST",
//                url: "QuizTestService.asmx/InsertQuizTestQuestionTxtAnswers",
//                contentType: "application/json; charset=utf-8",
//                dataType: "json",
//                data: '{"formId":"' + formId + '","questionId":"' + questionId + '","answer":"' + txtasnwer + '","answer":"' + txtasnwer + '","answer":"' + txtasnwer + '"}',
//                success: function (data) {
//                    FillQuestionsGrid();
//                    clearQuestionFields();
//                    $('#Divmessage').find('#hlabmsg').text('Question added successfully!')
//                    $2('#Divmessage').jqmShow();
//                    questionId = 0;
//                },
//                error: onError,
//                beforeSend: startingAjax,
//                complete: ajaxCompleted,
//                async: false,
//                cache: false
//            });
//        }
//    }
//}

function onSuccessAddQuestion(data, status) {

    var type = $('#ddAsnwerType').val();

    if (data.d != '') {
        var jsonObj = jsonParse(data.d);
        if (jsonObj.length > 0) {
            mode = 'AddQ';
            questionId = jsonObj[0].ID;

            quizTime = parseInt(quizTime) + parseInt(jsonObj[0].Time);
            quizScore = parseInt(quizScore) + parseInt(jsonObj[0].Points);

            $.cookie('QuizTime', quizTime, { path: '/' });
            $.cookie('QuizScore', quizScore, { path: '/' });

            $('.quizTime').text(secondsTimeSpanToHMS(quizTime));
            $('.quizScore').text(quizScore);

            $('#btnSaveQuestion').hide();
            //$('#btnUpdateQuestion').show();

            $('#btnAddAnotherAnswer').show();
            $('#btnSaveAnswer').show();

            $('#MasterFormQuestionAnswer').empty();
            $('#MasterFormQuestionAnswer').show();
            $('#MasterFormQuestionAnswer').append('<div class="row">' +
                    '<div class="col-md-6">' +
                        '<div class="form-group">' +
                            '<label for="frmQA' + num + '">Answer ' + num + ':</label>' +
                            '<input type="text" class="form-control answerTextboxes" id="frmQA' + num + '" name="frmQA' + num + '" placeholder="Answer ' + num + '" required="required" />' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-md-3">' +
                        '<div class="form-group" style="padding-top: 30px;">' +
                            (type == 'cb' ? '<label><input type="checkbox" class="isCorrectOption" id="IsCorrect' + num + '" name="isCorrect"  value="' + num + '" />&nbsp;Is Correct</label>' : '<label><input type="radio" class="isCorrectOption" id="IsCorrect' + num + '" name="isCorrect"  value="' + num + '" />&nbsp;Is Correct</label>') +
                        '</div>' +
                    '</div>' +
                '</div>');

            $('html,body').animate({
                scrollTop: $("#MasterFormQuestionAnswer").offset().top
            }, 'slow');
        }
    }
    FillQuestionsGrid();
}

function SaveAnswer() {

    if (!$('#form1').valid()) {
        return false;
    }

    var answers = [];
    var correctans = [];

    var flag;

    if ($('.isCorrectOption:checked').length > 0) {
        $(".answerTextboxes").each(function () {

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

        $(".isCorrectOption").each(function () {

            correctans.push($(this).is(':checked'));
        });

        if (flag == true) {

            $.ajax({
                type: "POST",
                url: "QuizTestService.asmx/InsertQuizTestQuestionAnswers",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: '{"formId":"' + formId + '","questionId":"' + questionId + '","answer":"' + answers + '","correctans":"' + correctans + '","answerNum":"' + num + '"}',
                success: onSuccessSaveAnswer,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                async: false,
                cache: false
            });
        }
    }
    else {
        $('#Divmessage').find('#hlabmsg').text('Please mark correct answer');
        $2('#Divmessage').jqmShow();
    }
}

function onSuccessSaveAnswer() {
    FillQuestionsGrid();
    clearAllFieldsAfterAnswerAdded();
    $('#Divmessage').find('#hlabmsg').text('Answer added successfully!')
    $2('#Divmessage').jqmShow();
    questionId = 0;
    mode = "Add";
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

    if (flag == true) {
        var type = $('#ddAsnwerType').val();

        $('#btnRemoveAnswer').show();
        num = num + 1;
        if (num <= maxAnswerFields) {
            $('#MasterFormQuestionAnswer').append('<div class="row">' +
                    '<div class="col-md-6">' +
                        '<div class="form-group">' +
                            '<label for="frmQA' + num + '">Answer ' + num + ':</label>' +
                            '<input type="text" class="form-control answerTextboxes" id="frmQA' + num + '" name="frmQA' + num + '" placeholder="Answer ' + num + '" required="required" />' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-md-3">' +
                        '<div class="form-group" style="padding-top: 30px;">' +
                            (type == 'cb' ? '<label><input type="checkbox" class="isCorrectOption" id="isCorrect' + num + '" name="isCorrect"  value="' + num + '" />&nbsp;Is Correct</label>' : '<label><input type="radio" class="isCorrectOption" id="isCorrect' + num + '" name="isCorrect"  value="' + num + '" />&nbsp;Is Correct</label>') +
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

    $('#frmQA' + num).parents('.row').remove();
    num = (num - 1);
    if (num == 1) {
        $('#btnRemoveAnswer').hide();
    }
    else {
        $('#btnRemoveAnswer').show();
    }
}


//function UpdateQuestion() {

//    var frmQ = document.getElementById("frmQ").value;

//    if (regex.exec(frmQ) == null) {
//        $('#Divmessage').find('.jqmTitle').html('Alert!');
//        $('#Divmessage').find('#hlabmsg').html('<b>Only Letters, digits and Spaces are allowed! <br />Please remove any special character from text fields.</b>');
//        $2('#Divmessage').jqmShow();
//        return false;
//    }
//    else {

//        var frmQuestion = $('#frmQ').val();
//        var AsnwerType = $('#ddAsnwerType').val();

//        var Time = $('#frmTime').val();
//        var Score = $('#frmScore').val();
//        //var Score = DefaultEachQuestionScore;

//        if (formId == undefined || formId == 0) {
//            window.open('./QuizTest.aspx', '_self');
//        }
//        else {

//            //if (AsnwerType == "txt") {
//            //    $.ajax({
//            //        type: "POST",
//            //        url: "QuizTestService.asmx/UpdateandDeleteQuizTestQuestion",
//            //        contentType: "application/json; charset=utf-8",
//            //        dataType: "json",
//            //        data: '{"questionId":"' + questionId + '","frmQuestion":"' + frmQuestion + '","AsnwerType":"' + AsnwerType + '","Time":"' + Time + '","Score":"' + Score + '"}',
//            //        success: onSuccessUpdateQuestion,
//            //        error: onError,
//            //        beforeSend: startingAjax,
//            //        complete: ajaxCompleted,
//            //        async: false,
//            //        cache: false
//            //    });
//            //}
//            //else {
//            $.ajax({
//                type: "POST",
//                url: "QuizTestService.asmx/UpdateQuizTestQuestion",
//                contentType: "application/json; charset=utf-8",
//                dataType: "json",
//                data: '{"questionId":"' + questionId + '","frmQuestion":"' + frmQuestion + '","AsnwerType":"' + AsnwerType + '","Time":"' + Time + '","TimeIn":"' + TimeIn + '","Score":"' + Score + '"}',
//                success: onSuccessUpdateQuestion,
//                error: onError,
//                beforeSend: startingAjax,
//                complete: ajaxCompleted,
//                async: false,
//                cache: false
//            });
//            //}
//        }
//    }
//}

//function onSuccessUpdateQuestion() {
//    FillQuestionsGrid();

//    var Type = $('#ddAsnwerType').val();

//    //if (Type == 'txt') {
//    //    $('#Divmessage').find('#hlabmsg').text('Question updated successfully!')
//    //    $2('#Divmessage').jqmShow();
//    //    mode = "Add";
//    //    num = 1;
//    //    $('#MasterFormQuestionAnswer').empty();
//    //    resetAllFields();
//    //}
//    //else {
//    mode = "Add";
//    num = 1;
//    $('#btnRemoveAnswer').hide();
//    $('#btnSaveQuestion').hide();
//    //$('#btnUpdateQuestion').show();
//    $('#btnAddAnotherAnswer').show();
//    $('#btnSaveAnswer').show();

//    $('#MasterFormQuestionAnswer').empty();
//    $('#MasterFormQuestionAnswer').show();
//    $('#MasterFormQuestionAnswer').append('<div class="row">' +
//            '<div class="col-md-6">' +
//                '<div class="form-group">' +
//                    '<label for="frmQA' + num + '">Answer ' + num + ':</label>' +
//                    '<input type="text" class="form-control answerTextboxes" id="frmQA' + num + '" name="frmQA' + num + '" placeholder="Answer ' + num + '" required="required" />' +
//                '</div>' +
//            '</div>' +
//            '<div class="col-md-3">' +
//                '<div class="form-group" style="padding-top: 30px;">' +
//                    (type == 'cb' ? '<label><input type="checkbox" class="isCorrectOption" id="isCorrect' + num + '" name="isCorrect"  value="' + num + '" />&nbsp;Is Correct</label>' : '<label><input type="radio" class="isCorrectOption" id="isCorrect' + num + '" name="isCorrect"  value="' + num + '" />&nbsp;Is Correct</label>') +
//                '</div>' +
//            '</div>' +
//        '</div>');

//    $('html,body').animate({
//        scrollTop: $("#MasterFormQuestionAnswer").offset().top
//    }, 'slow');
//    //}

//}


function On_Delete_Question(id, thisBtn) {

    qScore = $(thisBtn).parents('tr').find('.questionPoints').text();
    qTime = $(thisBtn).parents('tr').find('.questionTime').text() * 60;
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
            url: "QuizTestService.asmx/DeleteQuizTestQuestion",
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

function onSuccessDeleteQuestion(data, status) {

    if (data.d != '') {
        $('#Divmessage').find('#hlabmsg').text('Question not deleted.')
        $2('#Divmessage').jqmShow();
    }
    else {

        quizTime = parseInt(quizTime) - parseInt(qTime);
        quizScore = parseInt(quizScore) - parseInt(qScore);

        $('.quizTime').text(secondsTimeSpanToHMS(quizTime));
        $('.quizScore').text(quizScore);

        $.cookie('QuizTime', quizTime, { path: '/' });
        $.cookie('QuizScore', quizScore, { path: '/' });

        $2('#divConfirmation').jqmHide();
        $('#Divmessage').find('#hlabmsg').text('Question deleted successfully!')
        $2('#Divmessage').jqmShow();
        questionId = 0;
        qScore = 0;
        qTime = 0;
        FillQuestionsGrid();
    }

    resetAllFields();
}


function OKClick() {
    $2('#Divmessage').jqmHide();
}


function On_Edit_Question(id, thisBtn) {
    mode = "Update";

    qScore = $(thisBtn).parents('tr').find('.questionPoints').text();
    qTime = $(thisBtn).parents('tr').find('.questionTime').text();

    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/GetQuestionById",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"questionId":"' + id + '"}',
        success: onSuccessGetQuestionById,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function onSuccessGetQuestionById(data, status) {

    if (data.d != '') {

        var jsonObj = jsonParse(data.d);

        num = jsonObj.length;

        $('#MasterFormQuestions').show();
        $('#btnAddQuestion').hide();

        $('#btnSaveQuestion').hide();
        //$('#btnUpdateQuestion').show();

        questionId = jsonObj[0].QID;
        $('#frmQ').val(jsonObj[0].Question);
        $('#ddAsnwerType').val(jsonObj[0].QuestionType);

        if (TimeIn == 'Minutes') {
            $('#frmTime').val(jsonObj[0].Time / 60);
        }
        else
        {
            $('#frmTime').val(jsonObj[0].Time);
        }
        

        $('#frmScore').val(jsonObj[0].Score);

        ddanstype = $('#ddAsnwerType').val();

        $('#MasterFormQuestionAnswer').empty();

        //if (jsonObj[0].QuestionType == "txt") {
        //    $('#MasterFormQuestionAnswer').hide();
        //    $('#btnAddAnotherAnswer').hide();
        //    $('#btnRemoveAnswer').hide();
        //    $('#btnSaveAnswer').hide();
        //}
        //else {
        if (num == 1) {
            $('#btnRemoveAnswer').hide();
        }
        else {
            $('#btnRemoveAnswer').show();
        }

        //$('#btnUpdateQuestion').hide();
        $('#btnAddAnotherAnswer').show();
        $('#btnUpdateAnswer').show();
        $('#MasterFormQuestionAnswer').show();

        for (var i = 0; i < jsonObj.length; i++) {

            $('#MasterFormQuestionAnswer').append('<div class="row">' +
                    '<div class="col-md-6">' +
                        '<div class="form-group">' +
                            '<label for="frmQA' + (i + 1) + '">Answer ' + (i + 1) + ':</label>' +
                            '<input type="text" value="' + jsonObj[i].Answer + '" class="form-control answerTextboxes" id="frmQA' + (i + 1) + '" name="frmQA' + (i + 1) + '" placeholder="Answer ' + (i + 1) + '" required="required" />' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-md-3">' +
                        '<div class="form-group" style="padding-top: 30px;">' +
                        (ddanstype == 'cb' ? '<label><input type="checkbox" class="isCorrectOption" id="isCorrect' + (i + 1) + '" name="isCorrect" value="' + (i + 1) + '" ' + (jsonObj[i].isCorrect == "True" ? "checked='checked'" : "") + '  />&nbsp;Is Correct</label>' : '<label><input type="radio" class="isCorrectOption" id="isCorrect' + (i + 1) + '" name="isCorrect" value="' + (i + 1) + '" ' + (jsonObj[i].isCorrect == "True" ? "checked='checked'" : "") + '  />&nbsp;Is Correct</label>') +
                        '</div>' +
                    '</div>' +
                '</div>');

        }
        //}

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
    else {
        questionFlag = true;
    }

    if ($('.isCorrectOption:checked').length > 0) {
        var answers = [];
        var correctans = [];

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

        $(".isCorrectOption").each(function () {
            correctans.push($(this).is(':checked'));
        });

        if (questionFlag == true && answerFlag == true) {

            var frmQuestion = $('#frmQ').val();
            var asnwerType = $('#ddAsnwerType').val();
            var frmTime = $('#frmTime').val();
            var frmScore = $('#frmScore').val();
            //var frmScore = DefaultEachQuestionScore;


            debugger
            $.ajax({
                type: "POST",
                url: "QuizTestService.asmx/UpdateQuizTestQuestionAnswers",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: '{"formId":"' + formId + '","questionId":"' + questionId + '","frmQuestion":"' + frmQuestion + '","answerType":"' + asnwerType + '","Time":"' + frmTime + '","TimeIn":"' + TimeIn + '","Score":"' + frmScore + '","answer":"' + answers + '","correctans":"' + correctans + '","answerNum":"' + num + '"}',
                success: onSuccessUpdateQuestionAnswer,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                async: false,
                cache: false
            });
        }
    }
    else {
        $('#Divmessage').find('#hlabmsg').text('Please mark correct answer');
        $2('#Divmessage').jqmShow();
    }
}

function onSuccessUpdateQuestionAnswer(data, status) {
    debugger
    var jsonObj = jsonParse(data.d);
    if (jsonObj.length > 0) {


        quizTime = parseInt(quizTime) - parseInt(qTime * 60);
        quizScore = parseInt(quizScore) - parseInt(qScore);

        quizTime = parseInt(quizTime) + parseInt(jsonObj[0].Time);
        quizScore = parseInt(quizScore) + parseInt(jsonObj[0].Points);

        $.cookie('QuizTime', quizTime, { path: '/' });
        $.cookie('QuizScore', quizScore, { path: '/' });

        $('.quizTime').text(secondsTimeSpanToHMS(quizTime));
        $('.quizScore').text(quizScore);

    }
    FillQuestionsGrid();
    clearAllFieldsAfterAnswerAdded();
    $('#Divmessage').find('#hlabmsg').text('Answer updated successfully!')
    $2('#Divmessage').jqmShow();
    questionId = 0;
    mode = "Add";
}

function onChangeAnswerType() {
    ddanstype = $('#ddAsnwerType').val();

    if (mode == 'Add') {
        //if (ddanstype == 'txt') {
        //    num = 1;
        //    $('#MasterFormQuestionAnswer').empty();
        //    $('#btnAddAnotherAnswer').hide();
        //    $('#btnSaveAnswer').hide();
        //    $('#btnRemoveAnswer').hide();
        //}
        //else {
        num = 1;
        $('#btnSaveQuestion').show();
        $('#MasterFormQuestionAnswer').empty();
        //$('#btnUpdateQuestion').hide();
        $('#btnAddAnotherAnswer').hide();
        $('#btnSaveAnswer').hide();
        $('#btnRemoveAnswer').hide();
        //}
    }


    if (mode == 'AddQ') {
        //if (ddanstype == 'txt') {
        //    num = 1;
        //    $('#btnSaveQuestion').hide();
        //    $('#btnUpdateQuestion').show();

        //    $('#MasterFormQuestionAnswer').empty();
        //    $('#btnAddAnotherAnswer').hide();
        //    $('#btnSaveAnswer').hide();
        //    $('#btnRemoveAnswer').hide();
        //}
        //else {
        num = 1;
        $('#btnSaveQuestion').hide();
        //$('#btnUpdateQuestion').show();

        $('#btnAddAnotherAnswer').show();
        $('#btnSaveAnswer').show();

        $('#MasterFormQuestionAnswer').empty();
        $('#MasterFormQuestionAnswer').show();
        $('#MasterFormQuestionAnswer').append('<div class="row">' +
                '<div class="col-md-6">' +
                    '<div class="form-group">' +
                        '<label for="frmQA' + num + '">Answer ' + num + ':</label>' +
                        '<input type="text" class="form-control answerTextboxes" id="frmQA' + num + '" name="frmQA' + num + '" placeholder="Answer ' + num + '" required="required" />' +
                    '</div>' +
                '</div>' +
                '<div class="col-md-3">' +
                    '<div class="form-group" style="padding-top: 30px;">' +
                    (ddanstype == 'cb' ? '<label><input type="checkbox" class="isCorrectOption" id="isCorrect' + num + '" name="isCorrect"  value="' + num + '" />&nbsp;Is Correct</label>' : '<label><input type="radio" class="isCorrectOption" id="isCorrect' + num + '" name="isCorrect"  value="' + num + '" />&nbsp;Is Correct</label>') +
                    '</div>' +
                '</div>' +
            '</div>');

        $('html,body').animate({
            scrollTop: $("#MasterFormQuestionAnswer").offset().top
        }, 'slow');
        //}
    }


    if (mode == 'Update') {
        //if (ddanstype == 'txt') {

        //    $('#MasterFormQuestionAnswer').hide();
        //    $('#btnUpdateQuestion').show();
        //    $('#btnAddAnotherAnswer').hide();
        //    $('#btnSaveAnswer').hide();
        //    $('#btnRemoveAnswer').hide();
        //    $('#btnUpdateAnswer').hide();
        //}
        //else {
        num = 1;
        $('#btnUpdateAnswer').show();
        //$('#btnUpdateQuestion').hide();
        $('#btnAddAnotherAnswer').show();
        $('#btnSaveAnswer').hide();

        $('#MasterFormQuestionAnswer').empty();
        $('#MasterFormQuestionAnswer').show();
        $('#MasterFormQuestionAnswer').append('<div class="row">' +
                '<div class="col-md-6">' +
                    '<div class="form-group">' +
                        '<label for="frmQA' + num + '">Answer ' + num + ':</label>' +
                        '<input type="text" class="form-control answerTextboxes" id="frmQA' + num + '" name="frmQA' + num + '" placeholder="Answer ' + num + '" required="required" />' +
                    '</div>' +
                '</div>' +
                '<div class="col-md-3">' +
                    '<div class="form-group" style="padding-top: 30px;">' +
                    (ddanstype == 'cb' ? '<label><input type="checkbox" class="isCorrectOption" id="isCorrect' + num + '" name="isCorrect"  value="' + num + '" />&nbsp;Is Correct</label>' : '<label><input type="radio" class="isCorrectOption" id="isCorrect' + num + '" name="isCorrect"  value="' + num + '" />&nbsp;Is Correct</label>') +
                    '</div>' +
                '</div>' +
            '</div>');

        $('html,body').animate({
            scrollTop: $("#MasterFormQuestionAnswer").offset().top
        }, 'slow');


        if (num == 1) {
            $('#btnRemoveAnswer').hide();
        }
        else {
            $('#btnRemoveAnswer').show();
        }
        //}
    }
    //$('#btnResetFields').hide();
}


function resetAllFields() {
    clearAllFieldsAfterAnswerAdded();
}

function clearQuestionFields() {
    $("#form1").validate().resetForm();
    $('#frmQ').val('');
    $('#ddAsnwerType').val('');

    //$('#frmScore').val('');

    if (OneTimeScore != 'DefaultScore') {        
        $('#frmScore').val('');
    }

    $('#frmTime').val('');
    $('#btnSaveQuestion').show();
    //$('#btnUpdateQuestion').hide();
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


function secondsTimeSpanToHMS(s) {
    
    var h = Math.floor(s / 3600); //Get whole hours
    s -= h * 3600;
    var m = Math.floor(s / 60); //Get remaining minutes
    s -= m * 60;
    return h + " hrs : " + (m < 10 ? '0' + m : m) + " mins : " + (s < 10 ? '0' + s : s) + " secs"; //zero padding on minutes and seconds
}
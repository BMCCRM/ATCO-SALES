var validation;
var validationInsertQuizFormRules;
var validationInsertQuizFormMessages;
var num = 1;
var formId;


$(document).ready(function () {

    $2('#divConfirmation').jqm({ modal: true });
    $2('#Divmessage').jqm({ modal: true });
    $2('#divGradingModal').jqm({ modal: true });

    $('#btnDeleteYes').click(DeleteConfirm);
    $('#btnDeleteNo').click(DeleteCancel);
    $('#btnOk').click(OKClick)

    var date = new Date();
    $("#startDate").datepicker({ dateFormat: 'mm/dd/yy' }).datepicker("setDate", new Date());
    $("#endDate").datepicker({ dateFormat: 'mm/dd/yy' }).datepicker("setDate", date.getDate() + 6); // add 6 days to current date from 0

    FillMainFormGrid();

    $('#btnSaveQuiz').click(InsertQuizTestForm);
    $('#btnUpdateQuiz').click(UpdateQuizTestForm);
    $('#btnClearQuiz').click(ClearMasterFormFields);


    $('#btnSaveGrading').click(SaveGrading);
    $('#btnUpdateGrading').click(UpdateGrading);
    $('#btnCancelGrading').click(CancelGrading);

    validation = $('#form1').validate({
        errorElement: "div",
        errorClass: "help-block help-block-error",
        focusInvalid: !1, ignore: "",
        highlight: function (e) { $(e).closest(".form-group").addClass("has-error") },
        unhighlight: function (e) { $(e).closest(".form-group").removeClass("has-error") },
        success: function (e) { e.closest(".form-group").removeClass("has-error") },
    });

    validationInsertQuizFormRules = {
        frmName: { required: true },
        //frmTime: { required: true, number: true },
        //frmQScore: { required: true, number: true },
        TimeInDD: { required: true },
        frmQTime: { required: true },
        OneTimeScoreDD: { required: true },
        startDate: {
            required: true,
            date: true
        },
        endDate: {
            required: true,
            date: true
        }
    };

    validationInsertQuizFormMessages = {
        //frmTime: {
        //    required: 'Please provide quiz time'
        //},
        //frmScore: {
        //    required: 'Please provide total score'
        //},
        startDate: {
            required: 'Please pick start date'
        },
        endDate: {
            required: 'Please pick end date'
        }
    };

});

function OnChangeOneTimeScoreDD() {

    var DDScoreVal = $('#OneTimeScoreDD').val();

    if (DDScoreVal == 'SetDefaultScore') {
        $('#QuestionScoreDiv').show();
    }
    else {
        $('#QuestionScoreDiv').hide();
    }

}

function FillMainFormGrid() {

    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/GetAllQuizTestForms",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGridFillMainFormGrid,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function onSuccessGridFillMainFormGrid(data, status) {
    var tabledata = "";

    $('#QuizFormList').empty();
    $('#QuizFormList').append('<table class="table table-striped table-bordered" id="FormsRecord">' +
            '<thead>' +
                '<tr>' +
                    '<th style="width: 50px;">S.No:</th>' +
                    '<th style="width: 200px;">Name</th>' +
                    '<th style="width: 250px;">Description</th>' +
                    '<th style="width: 110px;">Time</th>' +
                    '<th style="width: 80px;">Time In</th>' +
                    '<th style="width: 60px;">Score</th>' +
                    '<th style="width: 130px;">Score Type</th>' +
                    '<th style="width: 100px;">Start Date</th>' +
                    '<th style="width: 100px;">End Date</th>' +
                    '<th style="width: 160px;"></th>' +
                '</tr>' +
            '</thead>' +
            '<tbody id="MasterFormListGrid">');

    if (data.d != '') {
        var jsonObj = jsonParse(data.d);

        for (var i = 0; i < jsonObj.length; i++) {

            tabledata += "<tr>" +
                    "<td style='vertical-align: middle;'>" + (i + 1) + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].FormName + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].FormDescription + "</td>" +
                    "<td style='vertical-align: middle;'>" + secondsTimeSpanToHMS(jsonObj[i].FormTime) + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].TimeIn + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].FormScore + "</td>" +
                    "<td style='vertical-align: middle;'>" + (jsonObj[i].IsOneTimeScore == 'True' ? 'Global Score' : 'Individual Score') + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].StartDate + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].EndDate + "</td>" +
                    "<td style='vertical-align: middle;'>" +
                        "<button type='button' onclick='QuizGrading(" + jsonObj[i].ID + ");' class='btn btn-xs btn-success' data-toggle='tooltip' title='Grading'><i class='fa fa-star'></i></button>&nbsp;" +
                        "<button type='button' onclick='EditQuizForm(" + jsonObj[i].ID + ");' class='btn btn-xs btn-primary' data-toggle='tooltip' title='Edit'><i class='fa fa-pencil'></i></button>&nbsp;" +
                        "<button type='button' onclick='OnClickDelete(" + jsonObj[i].ID + ")' class='btn btn-xs btn-danger' data-toggle='tooltip' title='Delete'><i class='fa fa-times'></i></button>&nbsp;" +
                        "<button type='button' onclick='On_View_Questions(" + jsonObj[i].ID + ", " + jsonObj[i].FormTime + ", \"" + jsonObj[i].TimeIn + "\", \"" + jsonObj[i].IsOneTimeScore + "\", " + jsonObj[i].DefaultScore + ", " + jsonObj[i].FormScore + ", \"" + jsonObj[i].FormName + "\")' class='btn btn-xs btn-info' data-toggle='tooltip' title='Add/View Questions'><i class='fa fa-plus'></i></button>" +
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



function InsertQuizTestForm() {

    validation.resetForm();
    validation.settings.rules = validationInsertQuizFormRules;
    validation.settings.messages = validationInsertQuizFormMessages;

    if (!$('#form1').valid()) {
        return false;
    }

    var regex = new RegExp("^[0-9a-zA-Z\.\?\b ]+$");
    var frmName = document.getElementById("frmName").value;
    var frmDescription = document.getElementById("frmDescription").value;

    if (regex.exec(frmName) == null) {
        $('#Divmessage').find('.jqmTitle').html('Alert!');
        $('#Divmessage').find('#hlabmsg').html('<b>Only Letters, digits and Spaces are allowed! <br />Please remove any special character from text fields.</b>');
        $2('#Divmessage').jqmShow();
        return false;
    }
    else {
        var formname = $('#frmName').val();
        var formdesc = $('#frmDescription').val();
        //var formTime = $('#frmTime').val();
        var formQScore;
        var OneTimeScoreDD;

        var DDScoreVal = $('#OneTimeScoreDD').val();

        if (DDScoreVal == 'SetDefaultScore') {
            OneTimeScoreDD = 'SetDefaultScore';
            formQScore = $('#frmQScore').val();
        }
        else {
            OneTimeScoreDD = 'IndividualScore';
            formQScore = "0";
        }

        var TimeIn = $('#TimeInDD').val();
        var startdate = $('#startDate').val();
        var enddate = $('#endDate').val();

        if ((new Date(startdate).getTime() >= new Date(enddate).getTime())) {
            $('#Divmessage').find('#hlabmsg').text('Start date should be greater than End date.')
            $2('#Divmessage').jqmShow();
        }
        else {

            var obj = {};
            obj["formName"] = formname;
            obj["formDesc"] = formdesc;
            //obj["frmTime"] = formTime;
            obj["TimeIn"] = TimeIn;
            obj["OneTimeScoreDD"] = OneTimeScoreDD;
            obj["frmQScore"] = formQScore;
            obj["startDate"] = startdate;
            obj["endDate"] = enddate;

            $.ajax({
                type: "POST",
                url: "QuizTestService.asmx/InsertQuizTestForm",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(obj),
                success: onSuccessInsertQuizTestForm,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                async: false,
                cache: false
            });
        }
    }
}

function onSuccessInsertQuizTestForm(data, status) {

    if (data.d != "") {
        var jsonObj = jsonParse(data.d);
        $("#form1").validate().resetForm();
        if (jsonObj.length > 0) {

            $('#Divmessage').find('#hlabmsg').text('Form saved successfully!')
            $2('#Divmessage').jqmShow();

            ClearMasterFormFields();
        }
    }
    FillMainFormGrid();
}



function EditQuizForm(id) {

    formId = id;

    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/GetQuizTestFormById",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"formId":"' + formId + '"}',
        success: onSuccessEditQuizForm,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function onSuccessEditQuizForm(data, status) {
    if (data.d != '') {
        var jsonObj = jsonParse(data.d);
        if (jsonObj.length > 0) {
            debugger

            $('#frmName').val(jsonObj[0].FormName);
            $('#frmDescription').val(jsonObj[0].FormDescription);
            //$('#frmTime').val(jsonObj[0].FormTime);
            //$('#frmQScore').val(jsonObj[0].FormScore);

            $('#TimeInDD').val(jsonObj[0].TimeIn);

            if (jsonObj[0].IsOneTimeScore == "True") {
                $('#OneTimeScoreDD').val('SetDefaultScore');
                OnChangeOneTimeScoreDD();
                $('#frmQScore').val(jsonObj[0].DefaultScore);
                $('#QuestionScoreDiv').show();
            }
            else {
                $('#OneTimeScoreDD').val('IndividualScore');
                $('#frmQScore').val('0');
                $('#QuestionScoreDiv').hide();
            }

            $('#startDate').val(jsonObj[0].StartDate);
            $('#endDate').val(jsonObj[0].EndDate);

            $('#btnUpdateQuiz').show();
            $('#btnSaveQuiz').hide();

            $('html,body').animate({
                scrollTop: $("#MasterFormFields").offset().top
            }, 'slow');
        }
    }
    else {
        $('#Divmessage').find('#hlabmsg').empty();
        $('#Divmessage').find('#hlabmsg').text('Error is occurred.');
        $2('#Divmessage').jqmShow();
    }
}



function UpdateQuizTestForm() {
    validation.resetForm();
    validation.settings.rules = validationInsertQuizFormRules;
    validation.settings.messages = validationInsertQuizFormMessages;

    if (!$('#form1').valid()) {
        return false;
    }

    var regex = new RegExp("^[0-9a-zA-Z\.\?\b ]+$");
    var frmName = document.getElementById("frmName").value;
    var frmDescription = document.getElementById("frmDescription").value;

    if (regex.exec(frmName) == null) {
        $('#Divmessage').find('.jqmTitle').html('Alert!');
        $('#Divmessage').find('#hlabmsg').html('<b>Only Letters, digits and Spaces are allowed! <br />Please remove any special character from text fields.</b>');
        $2('#Divmessage').jqmShow();
        return false;
    }
    else {
        var formname = $('#frmName').val();
        var formdesc = $('#frmDescription').val();
        //var formTime = $('#frmTime').val();
        //var formScore = $('#frmScore').val();

        var TimeIn = $('#TimeInDD').val();

        var formQScore;
        var OneTimeScoreDD;

        var DDScoreVal = $('#OneTimeScoreDD').val();

        if (DDScoreVal == 'SetDefaultScore') {
            OneTimeScoreDD = 'SetDefaultScore';
            formQScore = $('#frmQScore').val();
        }
        else {
            OneTimeScoreDD = 'IndividualScore';
            formQScore = "0";
        }

        var startdate = $('#startDate').val();
        var enddate = $('#endDate').val();

        if ((new Date(startdate).getTime() >= new Date(enddate).getTime())) {
            $('#Divmessage').find('#hlabmsg').text('Start date should be greater than End date.')
            $2('#Divmessage').jqmShow();
        }
        else {

            var obj = {};
            obj["formId"] = formId;
            obj["formName"] = formname;
            obj["formDesc"] = formdesc;
            //obj["frmTime"] = formTime;
            obj["TimeIn"] = TimeIn;
            obj["OneTimeScoreDD"] = OneTimeScoreDD;
            obj["frmQScore"] = formQScore;
            obj["startDate"] = startdate;
            obj["endDate"] = enddate;

            $.ajax({
                type: "POST",
                url: "QuizTestService.asmx/UpdateQuizTestForm",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(obj),
                success: onSuccessUpdateQuizTestForm,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                async: false,
                cache: false
            });
        }
    }
}

function onSuccessUpdateQuizTestForm(data, status) {
    if (data.d != "") {
        $('#Divmessage').find('#hlabmsg').text('Form updated successfully!')
        $2('#Divmessage').jqmShow();

        ClearMasterFormFields();
    }
    else {
        $('#Divmessage').find('#hlabmsg').text('Error is occurred')
        $2('#Divmessage').jqmShow();
    }
    FillMainFormGrid();
}



function OnClickDelete(id) {

    formId = id;

    $2('#divConfirmation').jqmShow();
}

function DeleteQuizForm() {

    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/DeleteQuizTestForm",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"formId":"' + formId + '"}',
        success: onSuccessDeleteQuizForm,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function onSuccessDeleteQuizForm(data, status) {
    $2('#divConfirmation').jqmHide();
    if (data.d == "Deleted") {
        $('#Divmessage').find('#hlabmsg').text('Form deleted!')
        $2('#Divmessage').jqmShow();
    }
    else {
        $('#Divmessage').find('#hlabmsg').text('Form not deleted or it is already filled by some employee')
        $2('#Divmessage').jqmShow();
    }
    FillMainFormGrid();
    ClearMasterFormFields();
}



function QuizGrading(id) {
    formId = id;
    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/GetQuizTestGrading",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"quizId":"' + id + '"}',
        success: onSuccessQuizGrading,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function onSuccessQuizGrading(data, status) {

    if (data.d == "No Data") {
        // if no grading defined then show empty modal
        $2('#divGradingModal').jqmShow();
    }
    else {
        // for edit
        var jsonObj = jsonParse(data.d);

        $('#divGradingModal').find('#DivGrading').empty();

        num = jsonObj.length;

        for (var i = 0; i < jsonObj.length; i++) {

            formId = jsonObj[i].fk_QuizTestId;

            $('#divGradingModal').find('#DivGrading').append('<div class="row text-center gradeField' + (i + 1) + '">' +
                        '<br /><div class="col-md-5" style="margin-left: 13px;">' +
                            '<input type="text" required="required" class="form-control validateField gradeValue" placeholder="Grade" name="Grade" value="' + jsonObj[i].Grade + '" required="required" />' +
                        '</div>' +
                        '<div class="col-md-6">' +
                            '<input type="number" required="required" class="form-control validateField scoreValue" placeholder="Min Score" name="Score" value="' + jsonObj[i].Score + '" required="required" />' +
                        '</div>' +
                    '</div>');
        }

        if (jsonObj.length > 1) {
            $('.btnRemoveGradeField').show();
        }
        else {
            $('.btnRemoveGradeField').hide();
        }

        $('#btnSaveGrading').hide();
        $('#btnUpdateGrading').show();

        $2('#divGradingModal').jqmShow();
    }
}



function SaveGrading() {

    //if (!$('#form1').valid()) {
    //    return false;
    //}

    var grades = [];
    var scores = [];

    $(".gradeValue").each(function () {
        if ($(this).val() != "")
            grades.push($(this).val());
    });

    $(".scoreValue").each(function () {
        if ($(this).val() != "")
            scores.push($(this).val());
    });

    if (grades.length == scores.length) {

        $.ajax({
            type: "POST",
            url: "QuizTestService.asmx/InsertQuizTestGrading",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"formId":"' + formId + '","grades":"' + grades + '","scores":"' + scores + '"}',
            success: onSuccessInsertQuizTestGrading,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });
    }
    else {
        $('#Divmessage').find('#hlabmsg').empty();
        $('#Divmessage').find('#hlabmsg').text('Please check your grades and scores fields. You must have left something out.');
        $2('#Divmessage').jqmShow();
        return false;
    }
}

function onSuccessInsertQuizTestGrading(data, status) {

    if (data != "") {
        $('#Divmessage').find('#hlabmsg').empty();
        $('#Divmessage').find('#hlabmsg').text('Data inserted !');
        $2('#Divmessage').jqmShow();
    }
    else {
        $('#Divmessage').find('#hlabmsg').empty();
        $('#Divmessage').find('#hlabmsg').text('Data not inserted. Try again!.');
        $2('#Divmessage').jqmShow();
    }
    CancelGrading();
    ClearMasterFormFields();
}


function UpdateGrading() {

    debugger

    //$.validator.addClassRules("validateField");
    //$.validator.addClassRules("validateField");

    //if (!$('#form1').valid()) {
    //    return false;
    //}

    var grades = [];
    var scores = [];

    $(".gradeValue").each(function () {

        if ($(this).val() != "")
            grades.push($(this).val());
    });

    $(".scoreValue").each(function () {

        if ($(this).val() != "")
            scores.push($(this).val());
    });

    if (grades.length == scores.length) {

        $.ajax({
            type: "POST",
            url: "QuizTestService.asmx/UpdateQuizTestGrading",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"formId":"' + formId + '","grades":"' + grades + '","scores":"' + scores + '"}',
            success: onSuccessUpdateQuizTestGrading,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });
    }
    else {
        $('#Divmessage').find('#hlabmsg').empty();
        $('#Divmessage').find('#hlabmsg').text('Please check your grades and scores fields. You must have left something out.');
        $2('#Divmessage').jqmShow();
        return false;
    }
}

function onSuccessUpdateQuizTestGrading(data, status) {

    if (data != "") {
        $('#Divmessage').find('#hlabmsg').empty();
        $('#Divmessage').find('#hlabmsg').text('Data updated !');
        $2('#Divmessage').jqmShow();
    }
    else {
        $('#Divmessage').find('#hlabmsg').empty();
        $('#Divmessage').find('#hlabmsg').text('Data not updated. Try again!.');
        $2('#Divmessage').jqmShow();
    }

    CancelGrading();
    ClearMasterFormFields();
}


function CancelGrading() {
    formId = 0;
    $2('#divGradingModal').jqmHide();
    for (var i = num; i > 1; i--) {
        $('.gradeField' + i).remove();
    }
    $('.validateField').val('');
    num = 1;
    $('.btnRemoveGradeField').hide();
}


function On_View_Questions(Id, Time, TimeIn, OneTimeScore, DefaultQScore, Score, Name) {

    $.cookie('QuizId', Id, { path: '/' });
    $.cookie('QuizName', Name, { path: '/' });
    $.cookie('QuizTime', Time, { path: '/' });
    $.cookie('QuizScore', Score, { path: '/' });

    $.cookie('TimeIn', TimeIn, { path: '/' });

    if (OneTimeScore == 'True') {
        $.cookie('OneTimeScore', 'DefaultScore', { path: '/' });
        $.cookie('DefaultEachQuestionScore', DefaultQScore, { path: '/' });
    }
    else {
        $.cookie('OneTimeScore', 'IndividualScore', { path: '/' });
        $.cookie('DefaultEachQuestionScore', '0', { path: '/' });
    }

    window.open('./QuizTestQuestions.aspx', '_blank');
};


function AppendDivGrading() {

    debugger

    //$('.validateField').each(function () {
    //    $(this).rules('add', {
    //        required: true,
    //        messages: {
    //            required: "Answer is required",
    //        }
    //    });
    //});

    //$.validator.addClassRules("validateField", {
    //    required: true,
    //});

    //if (!$('#form1').valid()) {
    //    return false;
    //}

    $('#DivGrading').append('<div class="row text-center gradeField' + (num + 1) + '">' +
                                '<br /><div class="col-md-5" style="margin-left: 13px;">' +
                                    '<input type="text" class="form-control validateField gradeValue" placeholder="Grade" name="Grade" required="required" />' +
                                '</div>' +
                                '<div class="col-md-6">' +
                                    '<input type="number" class="form-control validateField scoreValue" placeholder="Min Score" name="Score" required="required" />' +
                                '</div>' +
                            '</div>');
    num = num + 1;

    $('.btnRemoveGradeField').show();

}

function RemoveDivGrading() {

    $('.gradeField' + num).remove();
    num = num - 1;
    if (num == 1) {
        $('.btnRemoveGradeField').hide();
    }
}

function DeleteConfirm() {
    // delete quiz
    DeleteQuizForm();
}

function DeleteCancel() {
    formId = 0;

    $2('#divConfirmation').jqmHide();
}

function ClearMasterFormFields() {

    formId = 0;
    num = 1;
    $("#form1").validate().resetForm();

    $('#btnUpdateQuiz').hide();
    $('#btnSaveQuiz').show();

    $('#frmName').val("");
    $('#frmDescription').val("");
    $('#frmName').val("");
    //$('#frmTime').val("");
    //$('#frmScore').val("");

    $('#TimeInDD').val("");
    $('#OneTimeScoreDD').val("");
    $('#QuestionScoreDiv').hide();
    $('#frmQScore').val("");

    $('#endDate').val("");

    var date = new Date();

    $("#startDate").datepicker({ dateFormat: 'mm/dd/yy' }).datepicker("setDate", new Date());
    $("#endDate").datepicker({ dateFormat: 'mm/dd/yy' }).datepicker("setDate", date.getDate() + 6);

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

function OKClick() {
    $2('#Divmessage').jqmHide();
}


function secondsTimeSpanToHMS(s) {
    var h = Math.floor(s / 3600); //Get whole hours
    s -= h * 3600;
    var m = Math.floor(s / 60); //Get remaining minutes
    s -= m * 60;
    return h + " hrs : " + (m < 10 ? '0' + m : m) + " mins : " + (s < 10 ? '0' + s : s) + " secs"; //zero padding on minutes and seconds
}
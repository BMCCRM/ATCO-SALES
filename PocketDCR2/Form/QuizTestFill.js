var formId;
var formName;
var assignedFormId;

var tabledata;
var timer;

var EmployeeId;
var CurrentUserLoginId;

var TotalQuestions = 0;
var currentQuestionTime = 0;
var currentQuestionId = 0;
var currentQuestionType = '';
var currentQuestionNumber = 0;

var isLastQuestion = false;
var quizSubmittedId = 0;

var istodayattemptday = '';

var remainder;

var countDown = 0;

var regex = new RegExp("^[0-9a-zA-Z\.\?\b ]+$");

var validation;

$(document).ready(function () {

    $2('#divConfirmation').jqm({ modal: true });
    $2('#Divmessage').jqm({ modal: true });

    GetCurrentUser();
    FillAssignedFormOfEmpGrid();

    //$('#btnSaveYes').click(SaveFormData);
    //$('#btnSaveNo').click(CancelFormData);
    $('#btnOk').click(OKClick);


    //$('.btnCancelQuizFill').click(CancelQuizFill);

    validation = $('#form1').validate({
        errorElement: "span",
        errorPlacement: function (error, element) {
            var ques_id = element.attr('questionId');
            $(element).parents().find('[questionId="' + ques_id + '"]').append('&nbsp;&nbsp;&nbsp;').append(error)
            error.css("margin", "15px");
        }
    });

});


function GetCurrentUser() {

    $.ajax({
        type: "POST",
        url: "../form/CommonService.asmx/GetCurrentUser",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUser,
        error: onError,
        async: false,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetCurrentUser(data, status) {

    if (data.d != "") {

        EmployeeId = data.d;
    }

    GetCurrentUserLoginID();

}
function GetCurrentUserLoginID() {

    $.ajax({
        type: "POST",
        url: "../form/CommonService.asmx/GetCurrentUserLoginID",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUserLoginID,
        error: onError,
        async: false,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetCurrentUserLoginID(data, status) {

    if (data.d != "") {

        CurrentUserLoginId = data.d;
    }
}



function FillAssignedFormOfEmpGrid() {
    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/FillAssignedFormOfEmpGrid",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"empId":"' + EmployeeId + '"}',
        success: onSuccessFillAssignedFormOfEmpGrid,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}
function onSuccessFillAssignedFormOfEmpGrid(data, status) {
    var tabledata = "";
    $('#AssignedFormOfEmpList').empty();
    $('#AssignedFormOfEmpList').append('<table class="table table-striped table-bordered" id="AssignedFormsOfEmpRecord">' +
            '<thead>' +
                '<tr>' +
                    '<th style="width: 50px;">S.No:</th>' +
                    '<th style="width: 240px;">Form Name</th>' +
                    '<th style="width: 120px;">Assigned Date</th>' +
                    '<th style="width: 80px;">Start Date</th>' +
                    '<th style="width: 80px;">End Date</th>' +
                    '<th style="width: 80px;">Attempt Date</th>' +
                    '<th style="width: 120px;">Status</th>' +
                    '<th style="width: 150px;"></th>' +
                '</tr>' +
            '</thead>' +
            '<tbody id="AssignedFormOfEmpGrid">');
    if (data.d != '') {
        var jsonObj = jsonParse(data.d);

        for (var i = 0; i < jsonObj.length; i++) {
            
            var btn = '';
            if (jsonObj[i].FormStatus == "Not Submitted - Expired") {
                btn = "<button type='button' class='btn btn-md btn-danger disabled' data-toggle='tooltip' title='Expired'>&nbsp;Take Quiz&nbsp;</button>&nbsp;";
            }
            else if(jsonObj[i].FormStatus == "Not Submitted") {
                btn = "<button type='button' onclick='GetQuizFormDetails(" + jsonObj[i].AssignedFormId + "," + jsonObj[i].fk_QuizTestId + ',"' + jsonObj[i].FormName + "\")' class='btn btn-md btn-danger' data-toggle='tooltip' title='Take Quiz'>&nbsp;Take Quiz&nbsp;</button>&nbsp;";
            }
            else if(jsonObj[i].FormStatus == "Started") {
                btn = "<button type='button' onclick='GetQuizFormDetails(" + jsonObj[i].AssignedFormId + "," + jsonObj[i].fk_QuizTestId + ',"' + jsonObj[i].FormName + "\")' class='btn btn-md btn-danger' data-toggle='tooltip' title='Take Quiz'>&nbsp;Resume Quiz&nbsp;</button>&nbsp;";
            }
            else if(jsonObj[i].FormStatus == "Submitted") {
                btn = "<button type='button' class='btn btn-md btn-danger disabled' data-toggle='tooltip' title='Already Submitted'>&nbsp;Submitted&nbsp;</button>&nbsp;<button type='button' class='btn btn-sm btn-primary' onclick='ShowSummary(" + jsonObj[i].QuizSubmittedId + ", " + jsonObj[i].QuizTestFormId + ", " + jsonObj[i].Score + ")'><i class='fa fa-eye'></i></button>";
            }

            tabledata += "<tr>" +
                    "<td style='vertical-align: middle;'>" + (i + 1) + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].FormName + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].AssignedDate + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].StartDate + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].EndDate + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].FinalAttemptDate + "</td>" +
                    "<td style='vertical-align: middle;'>" + (jsonObj[i].FormStatus == 'Started' ? 'Started but not finished' : jsonObj[i].FormStatus) + "</td>" +
                    "<td style='vertical-align: middle;'>" +
                        //(jsonObj[i].FormStatus == "Not Submitted - Expired" ? "<button type='button' class='btn btn-md btn-primary disabled' data-toggle='tooltip' title='Expired'>&nbsp;Take Quiz&nbsp;</button>&nbsp;" : jsonObj[i].FormStatus == "Not Submitted" ? "<button type='button' onclick='RenderForm(" + jsonObj[i].fk_QuizTestId + ',"' + jsonObj[i].FormName + "\")' class='btn btn-md btn-primary' data-toggle='tooltip' title='Take Quiz'>&nbsp;Take Quiz&nbsp;</button>&nbsp;" : "<button type='button' class='btn btn-md btn-success disabled' data-toggle='tooltip' title='Already Submitted'>&nbsp;Submitted&nbsp;</button>&nbsp;") +
                        //(jsonObj[i].FormStatus == "Not Submitted - Expired" ? "<button type='button' class='btn btn-md btn-danger disabled' data-toggle='tooltip' title='Expired'>&nbsp;Take Quiz&nbsp;</button>&nbsp;" : jsonObj[i].FormStatus == "Not Submitted" || jsonObj[i].FormStatus == "Started" ? "<button type='button' onclick='GetQuizFormDetails(" + jsonObj[i].AssignedFormId + "," + jsonObj[i].fk_QuizTestId + ',"' + jsonObj[i].FormName + "\")' class='btn btn-md btn-danger' data-toggle='tooltip' title='Take Quiz'>&nbsp;Take Quiz&nbsp;</button>&nbsp;" : "<button type='button' class='btn btn-md btn-danger disabled' data-toggle='tooltip' title='Already Submitted'>&nbsp;Submitted&nbsp;</button>&nbsp;<button type='button' class='btn btn-sm btn-primary' onclick='ShowSummary(" + jsonObj[i].QuizSubmittedId + ", " + jsonObj[i].QuizTestFormId + ", " + jsonObj[i].Score + ")'><i class='fa fa-eye'></i></button>") +
                        btn +
                    "</td>" +
                "</tr>";
        }

        $('#AssignedFormOfEmpGrid').append(tabledata);
        $('#AssignedFormOfEmpList').append('</tbody></table>');
    }
    else {
        $('#QuizTestFormQAList').find('.quizHeader').hide();
        $('#QuizTestFormQAList').find('.quizBody').hide();
        $('#QuizTestFormQAList').find('.quizFooter').hide();
        $('#QuizTestFormQAList').show();
        $('#QuizTestFormQAList').append('<div class="row"><div class="col-md-12"><h2>No form Assigned</h2></div></div><br />');
    }


    if (!$.fn.DataTable.isDataTable('#AssignedFormsOfEmpRecord')) {
        $('#AssignedFormsOfEmpRecord').DataTable({
            "columnDefs": [
                    { "orderable": false, "targets": -1 }
            ]
        });
    }
    else {
        $('#AssignedFormsOfEmpRecord').DataTable({
            "columnDefs": [
                    { "orderable": false, "targets": -1 }
            ]
        });
    }
}



function GetQuizFormDetails(id, frmID, fNames) {
    if (frmID == "") {
        //$("#QuizTestFormDetail").empty();
        $("#QuizTestFormDetail").hide();
    }
    else {
        formId = frmID;
        formName = fNames;
        assignedFormId = id;
        $.ajax({
            type: "POST",
            url: "QuizTestService.asmx/GetQuizFormDetails",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"formId":"' + frmID + '", "assignedFormId":"' + assignedFormId + '"}',
            success: onSuccessGetQuizFormDetails,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });
    }
}
function onSuccessGetQuizFormDetails(data, status) {

    if (data.d != '') {
        debugger
        if (data.d == 'Attempted')
        {
            $('#Divmessage').find('#hlabmsg').html('You have already attempted e-Quiz once. <br />Please come back tomorrow.')
            $2('#Divmessage').jqmShow();
        }
        else
        {
            var jsonObj = jsonParse(data.d);

            $('#QuizTestFormQAList').hide();

            tabledata = '';

            if (jsonObj[2][0].FinalAttemptDate == null || jsonObj[2][0].FinalAttemptDate == '') {
                $('#QuizTestFormDetail').find('.FinalAttemptDateDiv').hide();
                $('#QuizTestFormDetail').find('.FinalAttemptDateText').text('-');
            }
            else {
                if (jsonObj[2][0].IsAttemptDatePassed == 'Yes') {
                    $('#QuizTestFormDetail').find('.FinalAttemptDateDiv').show();
                    $('#QuizTestFormDetail').find('.FinalAttemptDateText').html('<b>Final attempt date for this e-Quiz has passed.</b>');
                }
                else if (jsonObj[2][0].IsTodayFinalAttemptDay == 'Yes') {
                    $('#QuizTestFormDetail').find('.FinalAttemptDateDiv').show();
                    $('#QuizTestFormDetail').find('.FinalAttemptDateText').html('<b>Today is final attempt day. You can only submit this e-Quiz only once.</b>');
                }
                else {
                    $('#QuizTestFormDetail').find('.FinalAttemptDateDiv').show();
                    $('#QuizTestFormDetail').find('.FinalAttemptDateText').html('<b>Final attempt date for this e-Quiz is: ' + jsonObj[2][0].FinalAttemptDate + '</b>');
                }
            }

            $(".FinalAttemptDateText ").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);


            $('#QuizTestFormDetail').find('.QuizTestName').text(jsonObj[0][0].FormName);
            $('#QuizTestFormDetail').find('.QuizTestTotalQuestions').text(jsonObj[1][0].TotalQuestions);
            //$('#QuizTestFormDetail').find('.QuizTestTotalAssignedQuestions').text(jsonObj[2][0].NumberOfQuestions);

            //var hours = Math.floor(parseInt(jsonObj[2][0].TotalQuestionsTime) / 60);
            //var minutes = parseInt(jsonObj[2][0].TotalQuestionsTime) % 60;
            //$('#QuizTestFormDetail').find('.QuizTestTotalTime').text(hours + " hour " + minutes + " ");

            $('#QuizTestFormDetail').find('.QuizTestTotalTime').text(secondsTimeSpanToHMS(jsonObj[2][0].TotalQuestionsTime));


            //$('#QuizTestFormDetail').find('.QuizTestScore').text(jsonObj[0][0].FormScore);
            $('#QuizTestFormDetail').find('.QuizTestScore').text(jsonObj[2][0].TotalQuestionsPoints);



            $('#QuizTestFormDetail').find('.btnStartQuizTest').attr("onclick", "GetQuizTestQuestion(" + formId + ",'" + formName + "\', " + assignedFormId + ")");

            $('#QuizTestFormDetail').find('#QuizGrading').empty();
            $('#QuizTestFormDetail').find('#QuizGrading').append('<table class="table table-striped table-bordered" id="QuizGradingGrid">' +
                                '<thead>' +
                                    '<tr>' +
                                        '<td>Grade</td>' +
                                        '<td>Score</td>' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody id="QuizGradingGridTBody">');

            for (var i = 0; i < jsonObj[0].length; i++) {
                tabledata += "<tr>" +
                                "<td style='vertical-align: middle;'>" + jsonObj[0][i].Grade + "</td>" +
                                "<td style='vertical-align: middle;'>" + jsonObj[0][i].Score + "</td>" +
                            "</tr>";
            }
            $('#QuizTestFormDetail').find('#QuizGradingGridTBody').append(tabledata);
            $('#QuizTestFormDetail').find('#QuizGradingGrid').append('</tbody></table>');
            $('#QuizTestFormDetail').fadeIn();

            $('html,body').animate({
                scrollTop: $("#QuizTestFormDetail").offset().top
            }, 'slow');


        }
    }
}



function CancelQuizFill() {

    $('html,body').animate({
        scrollTop: $("#FormFields").offset().top
    }, 'slow');

    resetAllFields();
}



function GetQuizTestQuestion(frmID, fNames, assignedID) {
    formName = "";
    if (frmID == "") {
        $("#QuizTestFormQAList").empty();
        $("#QuizTestFormQAList").hide();
    }
    else {
        formId = frmID;
        formName = fNames;
        $.ajax({
            type: "POST",
            url: "QuizTestService.asmx/GetQuizTestQuestion",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"formId":"' + frmID + '", "assignedID":"' + assignedFormId + '"}',
            success: onSuccessGetQuizTestQuestion,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });
    }
}
function onSuccessGetQuizTestQuestion(data, status) {
    $('.loadingNextQuestionText').text('');
    
    if (data.d != '') {

        if (data.d == 'NoSession') {
            location.reload();
        }

        if (data.d == 'AlreadyFinished') {
            $2('#divConfirmation').jqmHide();
            $('#Divmessage').find('#hlabmsg').html('Quiz has already finished.!')
            $2('#Divmessage').jqmShow();
            setTimeout(function () {
                location.reload();
            }, 3000);
            
        }
        else {
            var qId;
            var answer;

            var jsonObj = jsonParse(data.d);
            debugger
            if (jsonObj.length > 0) {
                $('#AssignedFormOfEmpList').empty();
                $('#QuizTestFormDetail').hide();
                $('#QuizTestFormQAList').show();

                //hide menu
                $('#navHolder').hide();

                $('#QuizTestFormQAList').find('.QuizTestName').text(formName);
                $('#QuizTestFormQAList').find('.quizBody').empty();


                $.each(jsonObj[3], function (i, ques) {

                    // reset timer to 0 for each question start
                    countDown = 0;

                    TotalQuestions = jsonObj[1][0].TotalQuestions;
                    currentQuestionTime = 1;
                    currentQuestionId = ques.QuestionId;
                    currentQuestionType = ques.QType;
                    currentQuestionNumber = jsonObj[2][0].QNo;

                    
                    quizSubmittedId = jsonObj[5][0].QuizSubmittedId;


                    if (jsonObj[0][0].IsLastQuestion == "Yes") {
                        isLastQuestion = true;
                    }
                    else {
                        isLastQuestion = false;
                    }

                    $('#QuizTestFormQAList').find('.btnSubmitQuizTestForm').hide();
                    $('#QuizTestFormQAList').find('.btnSubmitAnswer').show();
                    $('#QuizTestFormQAList').find('.btnNextQuestion').hide();

                    $('#QuizTestFormQAList').find('.QuestionNumber').text(currentQuestionNumber + "/" + TotalQuestions);
                    //$('#QuizTestFormQAList').find('#DivQuestionTime').text(parseInt(ques.Time) / 60 + " minutes");
                    $('#QuizTestFormQAList').find('#DivQuestionTime').text(parseInt(ques.Time));


                    $('#QuizTestFormQAList').find('.quizBody').append("<div class='row'style='padding: 10px; border-bottom: 1px solid rgba(128, 128, 128, 0.18);margin-bottom: 10px;'>" +
                                                "<div class='col-md-12'>" +
                                                    "<h4 questionId='" + ques.QuestionId + "'><b>" + ques.Question + " &nbsp; (" + ques.Points + " points)</b></h4>" +
                                                    "<div id='answer_" + ques.QuestionId + "' style='margin-left:50px;'></div>" +
                                                "</div>" +
                                            "</div>");

                    if (ques.QType == 'rb' || ques.QType == 'blank') {
                        $.each(jsonObj[4], function (i, ans) {
                            if (ques.QuestionId == ans.QId) {
                                $("#answer_" + ans.QId).append('<input type="radio" id="' + ans.AnswerId + '"  isfilled="rb_answer" class="rb_answer validationClass" name="qId_' + ans.QId + '" style="vertical-align: middle;margin-top: -2px; cursor: pointer; width:18px; height: 18px;" questionId="' + ques.QId + '" answerId="' + ans.AnswerId + '" value="' + ans.Answer + '"  /><label class="labelAnswer_' + ans.AnswerId + '" style="font-weight: 400; cursor:pointer;" for="' + ans.AnswerId + '">&nbsp;&nbsp;' + ans.Answer + '</label>');
                                $("#answer_" + ans.QId).append('<br />');
                            }
                        });
                    }
                    if (ques.QType == 'cb') {
                        $.each(jsonObj[4], function (i, ans) {
                            if (ques.QuestionId == ans.QId) {
                                $("#answer_" + ans.QId).append('<input type="checkbox" id="' + ans.AnswerId + '" isfilled="cb_answer" class="cb_answer validationClass" name="qId_' + ans.QId + '" style="vertical-align: middle;margin-top: -2px; cursor: pointer; width:18px; height: 18px;" questionId="' + ans.QId + '" answerId="' + ans.AnswerId + '" value="' + ans.Answer + '"  /><label class="labelAnswer_' + ans.AnswerId + '" style="font-weight: 400; cursor:pointer;" for="' + ans.AnswerId + '">&nbsp;&nbsp;' + ans.Answer + '</label>');
                                $("#answer_" + ans.QId).append('<br />');
                            }
                        });
                    }
                    
                    RunTimer(ques.Time);

                });
            }
        }
    }
}



// question timer
function RunTimer(timeInSeconds) {
    countDown = timeInSeconds;
    timer = setInterval(function () {

        $('#QuizTestFormQAList').find('#DivQuestionTime').text('');
        var DivQuestionTime = document.getElementById('DivQuestionTime');
        if (countDown === 0) {
            clearInterval(timer);
            if (isLastQuestion == false) {
                $('#QuizTestFormQAList').find('#DivQuestionTime').text('');
                SaveAndShowRightWrongAnswer();
                //setTimeout(function () {
                //    GetNextQuestion();
                //}, 3000);
            }
            else {
                //$('.btnSubmitQuizTestForm').trigger('click');
                $('#QuizTestFormQAList').find('#DivQuestionTime').text('');
                SaveAndShowRightWrongAnswer();
                //if (isLastQuestion == false) {
                //    setTimeout(function () {
                //        GetNextQuestion();
                //    }, 3000);
                //}
                //setTimeout(function () {
                //    $('.btnSubmitQuizTestForm').trigger('click');
                //}, 3000);
            }
        }

        remainder = countDown % 5;

        if (remainder == 0) {
            $.ajax({
                type: "POST",
                url: "QuizTestService.asmx/StoreDetails",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: '{"currentQuestionTime":"' + currentQuestionTime + '","quizSubmittedId":"' + quizSubmittedId + '","currentQuestionId":"' + currentQuestionId + '"}',
                //success: onSuccessGetQuizTestQuestion,
                //error: onError,
                //beforeSend: startingAjax,
                //complete: ajaxCompleted,
                async: false,
                cache: false
            });
        }

        countDown--;

        if (countDown == 0) {
            $('#QuizTestFormQAList').find('#DivQuestionTime').text('');
        }

        currentQuestionTime = currentQuestionTime + 1;

        if (countDown >= 0) {
            //var hour = Math.floor(countDown / 3600);
            var min = Math.floor(countDown % 3600 / 60);
            var sec = Math.floor(countDown % 3600 % 60);

            //b1.innerHTML = (hour = hour < 10 ? "0" + hour : hour) + " : " + (min = min < 10 ? "0" + min : min) + " : " + (sec = sec < 10 ? "0" + sec : sec);
            DivQuestionTime.innerHTML = (min = min < 10 ? "0" + min : min) + " : " + (sec = sec < 10 ? "0" + sec : sec);
        }

    }, 1000);
}


// save question and show right wrong questions
function SaveAndShowRightWrongAnswer() {

    var answers = [];
    countDown = 0;
    if (currentQuestionType == 'rb' || currentQuestionType == 'blank') {
        //save radio button answers
        var rb_que = [];
        var rb_ans = [];
        var radio_btn_answers = document.querySelectorAll('input[isfilled=rb_answer]:checked');
        if (radio_btn_answers.length > 0) {
            for (var i = 0; i < radio_btn_answers.length; i++) {
                rb_que.push(radio_btn_answers[i].attributes["questionId"].value);
                rb_ans.push(radio_btn_answers[i].attributes["answerid"].value);
                answers.push(radio_btn_answers[i].attributes["answerid"].value);
            }
        }
    }


    if (currentQuestionType == 'cb') {
        //save check box answers
        var cb_que = [];
        var cb_ans = [];
        var check_box_answers = document.querySelectorAll('input[isfilled=cb_answer]:checked');
        if (check_box_answers.length > 0) {
            for (var i = 0; i < check_box_answers.length; i++) {
                cb_que.push(check_box_answers[i].attributes["questionId"].value);
                cb_ans.push(check_box_answers[i].attributes["answerid"].value);
                answers.push(check_box_answers[i].attributes["answerid"].value);
            }
        }
    }


    //if (flag == true || flag == undefined) {
    clearInterval(timer);
    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/SaveAndGetNextQuizTestQuestion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"formId":"' + formId + '","assignedFormId":"' + assignedFormId + '","questionId":"' + currentQuestionId + '","questionType":"' + currentQuestionType + '","answer":"' + answers + '","timeTaken":"' + currentQuestionTime + '","currentQuestionNumber":"' + currentQuestionNumber + '"}',
        //success: onSuccessGetQuizTestQuestion,
        success: function (data) {


            $('#QuizTestFormQAList').find('#DivQuestionTime').text('');

            if (isLastQuestion == true) {
                $('#QuizTestFormQAList').find('.btnSubmitAnswer').hide();

                //$('#QuizTestFormQAList').find('.quizHeader').find('.col-md-6').empty();
                //$('#QuizTestFormQAList').find('.quizBody').empty();
                //$('#QuizTestFormQAList').find('.quizBody').append("<div class='row'><div class='col-md-12'>" +
                //                                    "<center><img src='https://www.tutorialspoint.com/images/time_over.png' class='img-responsive' /></center>" +
                //                                "</div></div>");

                $('#QuizTestFormQAList').find('.btnSubmitQuizTestForm').show();
            }
            else {
                $('#QuizTestFormQAList').find('.btnSubmitQuizTestForm').hide();
                $('#QuizTestFormQAList').find('.btnSubmitAnswer').hide();
                $('#QuizTestFormQAList').find('.btnNextQuestion').show();
            }

            if (data != '') {
                // show right wrong answers
                var jsonObj = jsonParse(data.d);
                if (jsonObj[0].length > 0) {
                    $.each(jsonObj[0], function (i, response) {

                        var iconClass = '';
                        $('.quizBody').find('#answer_' + response.QuestionId).find('[answerId="' + response.AnswerId + '"]').attr('disabled', 'disabled');
                        if (response.IsCorrect == 'False') {
                            iconClass = 'fa fa-2x fa-times text-danger';
                        }
                        else if (response.IsCorrect == 'True') {
                            iconClass = 'fa fa-2x fa-check text-success';
                        }
                        $('.quizBody').find('#answer_' + response.QuestionId).find('.labelAnswer_' + response.AnswerId).append("<span style='margin-left: 20px;'><i class='" + iconClass + "'></i></span>")
                    });
                }

                // shows hort summary after showing right wrong answers
                if (jsonObj[1].length > 0) {
                    quizSubmittedId = jsonObj[1][0].QuizSubmittedId
                    $('#QuizTestFormQAList').find('.totalScore').text(jsonObj[1][0].Score);
                    $('#QuizTestFormQAList').find('.totalTime').text(jsonObj[1][0].TimeTaken);
                }
                else {
                    quizSubmittedId = jsonObj[1][0].QuizSubmittedId;
                    $('#QuizTestFormQAList').find('.totalScore').text("0 score");
                    $('#QuizTestFormQAList').find('.totalTime').text("0 minutes");
                }
            }

            if (isLastQuestion == false) {
                $('.loadingNextQuestionText').text('Loading next question ...');
            }

            //debugger
            if (isLastQuestion == false) {
                setTimeout(function () {
                    GetNextQuestion();
                    //$('.btnNextQuestion').trigger('click');
                }, 3000);
            } 

        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
    //}
}


function GetNextQuestion() {

    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/GetNextQuestion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"formId":"' + formId + '","assignedFormId":"' + assignedFormId + '","currentQuestionNumber":"' + currentQuestionNumber + '"}',
        success: onSuccessGetQuizTestQuestion,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}



// save form and show summary
function SaveQuizTestAndShowSummary() {

    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/SaveQuizTestAndShowSummary",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"formId":"' + formId + '","quizSubmittedId":"' + quizSubmittedId + '","assignedFormId":"' + assignedFormId + '"}',
        success: onSuccessSaveQuizTestAndShowSummary,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
    //}
}

function onSuccessSaveQuizTestAndShowSummary(data, status) {

    if (data.d != '') {

        var jsonObj = jsonParse(data.d);

        if (jsonObj.length > 0) {

            $('#QuizTestFormDetail').hide();
            $('#QuizTestFormQAList').hide();

            if (jsonObj[1].length > 0) {
                if (jsonObj[1][0].YourGrade != "") {
                    $('#QuizTestSummary').find('.S_Grade').empty();
                    $('#QuizTestSummary').find('.S_Grade').append('<i class="fa fa-5x fa-check-circle text-success"></i><br /><span>Congratulations, You Passed!</span><br /><span>Grade: ' + jsonObj[1][0].YourGrade + '</span></h2>');
                }
                else {
                    $('#QuizTestSummary').find('.S_Grade').empty();
                    $('#QuizTestSummary').find('.S_Grade').append('<i class="fa fa-5x fa-times-circle text-danger"></i><br /><span>You Failed!</span>');
                }
            }
            else {
                $('#QuizTestSummary').find('.S_Grade').empty();
                $('#QuizTestSummary').find('.S_Grade').append('<i class="fa fa-5x fa-times-circle text-danger"></i><br /><span>You Failed!</span>');
            }

            $('#QuizTestSummary').find('.S_QuizTestName').text(jsonObj[0][0].FormName);
            //$('#QuizTestSummary').find('.S_Percentage').text(parseInt(jsonObj[0][0].TotalScore) / parseInt(jsonObj[0][0].FormScore) * 100);
            $('#QuizTestSummary').find('.S_Percentage').text(parseInt(jsonObj[1][0].Percentage));


            $('#QuizTestSummary').find('.S_SubmittedBy').text(jsonObj[0][0].EmployeeName);
            $('#QuizTestSummary').find('.S_QuizDate').text(jsonObj[0][0].CreateDate);
            $('#QuizTestSummary').find('.S_TotalScore').text(jsonObj[0][0].FormScore);
            $('#QuizTestSummary').find('.S_YourScore').text(jsonObj[0][0].TotalScore);
            $('#QuizTestSummary').find('.S_TimeTaken').text(jsonObj[0][0].TimeTaken);
            $('#QuizTestSummary').find('.S_UnansweredQuestions').text(jsonObj[0][0].UnansweredAnswers);
            $('#QuizTestSummary').find('.S_RightAnswers').text(jsonObj[0][0].RightAnswers);
            $('#QuizTestSummary').find('.S_WrongAnswers').text(jsonObj[0][0].WrongAnswers);

            $('#QuizTestSummary').show();

            ResetQuizTest();
        }

    }
}


function ShowSummary(id, formId, formScore) {
    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/ShowQuizTestSummary",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"quizSubmittedId":"' + id + '","formId":"' + formId + '","formScore":"' + formScore + '"}',
        success: onSuccessShowSummary,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function onSuccessShowSummary(data, status) {

    if (data.d != '') {

        var jsonObj = jsonParse(data.d);

        if (jsonObj.length > 0) {

            $('#QuizTestSummaryModal').find('.summaryBody').empty();
            tabledata = "";
            
            if (jsonObj[1].length > 0) {
                if (jsonObj[1][0].YourGrade != "") {
                    $('#QuizTestSummaryModal').find('.summaryBody').append('<h2>Grade: ' + jsonObj[1][0].YourGrade + '</h2>');
                }
                else {
                    //$('#QuizTestSummaryModal').find('.summaryBody').append('<h2>Grade: D &nbsp; &nbsp; <span class="label label-danger">Fail</span></h2><br />');
                    $('#QuizTestSummaryModal').find('.summaryBody').append('<h2><span class="label label-danger">Fail</span></h2><br />');
                }
            }
            else {
                $('#QuizTestSummaryModal').find('.summaryBody').append('<h2>Failed</h2>');
            }

            $('#QuizTestSummaryModal').find('.summaryBody').append('<table class="table table-striped table-bordered" id="QuizTestSummaryTable">' +

                '<tbody id="QuizTestSummaryGrid">');

            tabledata += "<tr>" +
                            "<td><label>Submitted by:</label> " + jsonObj[0][0].EmployeeName + "</td>" +
                            "<td><label>Quiz Date:</label> " + jsonObj[0][0].CreateDate + "</td>" +
                         "</tr>";

            tabledata += "<tr>" +
                            "<td><label>Form:</label> " + jsonObj[0][0].FormName + "</td>" +
                            "<td><label>Time Taken:</label> " + jsonObj[0][0].TimeTaken + "</td>" +
                         "</tr>";
            
            tabledata += "<tr>" +
                            "<td><label>Quiz Score:</label> " + jsonObj[1][0].TotalPoints + "</td>" +
                            "<td><label>Your Score:</label> " + jsonObj[1][0].Score + "</td>" +
                         "</tr>";
            tabledata += "<tr>" +
                            //"<td><label>Percentage:</label> " + parseInt(jsonObj[0][0].TotalScore) / parseInt(jsonObj[0][0].FormScore) * 100 + "%</td>" +
                            "<td><label>Percentage:</label> " + parseInt(jsonObj[1][0].Percentage) + "%</td>" +
                            "<td><label>Unanswered Questions:</label> " + jsonObj[0][0].UnansweredAnswers + "</td>" +
                         "</tr>";
            tabledata += "<tr>" +
                            "<td><label>Right Answers:</label> " + jsonObj[0][0].RightAnswers + "</td>" +
                            "<td><label>Wrong Answers:</label> " + jsonObj[0][0].WrongAnswers + "</td>" +
                         "</tr>";

            $('#QuizTestSummaryGrid').append(tabledata);
            $('#QuizTestSummaryTable').append('</tbody></table>');

            $('#QuizTestSummaryModal').modal('show');


        }
    }
}




function QuizTestDone() {

    $('#QuizTestFormDetail').hide();
    $('#QuizTestFormQAList').hide();
    $('#QuizTestSummary').hide();
    $('#QuizTestSummary').hide();
    ResetQuizTest();

    location.reload();

}


function ResetQuizTest() {
    formId = 0;
    formName = 0;
    assignedFormId = 0;

    TotalQuestions = 0;
    currentQuestionTime = 1;
    currentQuestionId = 0;
    currentQuestionType = '';
    currentQuestionNumber = 0;
    clearInterval(timer);
    countDown = 0;
}



function CancelFormData() {
    $('#doctorsList').hide();
    $2('#divConfirmation').find('#savemsg').html('');
    $2('#divConfirmation').jqmHide();

    $("#form1").rules("remove");
    validation.destroy();

    $('html,body').animate({
        scrollTop: $("#FormFields").offset().top
    }, 'slow');
}

function OKClick() {
    $2('#Divmessage').jqmHide();
}


function resetAllFields() {

    $('html,body').animate({
        scrollTop: $("#FormFields").offset().top
    }, 'slow');

    $("#form1").validate().resetForm();
    formId = 0;
    formName = '';
    assignedFormId = 0;

    $("#QuizTestFormDetail").fadeOut();

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
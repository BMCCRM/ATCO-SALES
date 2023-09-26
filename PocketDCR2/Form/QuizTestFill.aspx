<%@ Page Title="Take Quiz" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="QuizTestFill.aspx.cs" Inherits="PocketDCR2.Form.QuizTestFill" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <link rel="icon" href="../assets/img/ici_favicon.png" type="image/gif" sizes="16x16" />
    <%--<link rel="stylesheet" href="assets_new/bootstrap.min.css" />--%>
    <%--<link rel="stylesheet" href="assets_new/font-awesome.min.css" />--%>


    <link href="assets_new/bootstrap.min.css" rel="stylesheet" />
    <link href="assets_new/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="assets_new/dataTables.fontAwesome.css" rel="stylesheet" />

    <%--<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" />--%>
    <link href="assets_new/font-awesome/css/fontawesome-all.min.css" rel="stylesheet" />

    <link rel="stylesheet" href="assets_new/jquery-ui.css" />


    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />

    <style type="text/css">
        table {
            table-layout: fixed;
            word-wrap: break-word;
        }

            table th, table td {
                overflow: hidden;
            }

        .error {
            font-size: 15px;
            color: rgba(225, 35, 35, 0.85);
        }

        thead {
            background: #b73a3c;
            color: #fff;
        }

        .btnPrimary {
            font-size: 18px;
            line-height: 1.3333333;
            color: #fff;
            padding: 10px 16px;
            border-radius: 6px;
            background-color: #b73a3c;
            margin: 10px 5px 10px 5px;
            /*font-size: 90%;
            text-shadow: none;
            text-decoration: none;
            text-shadow: -1px -1px 1px #72aebd;
            text-transform: uppercase;
            color: #fff;
            padding: 6px 10px 6px 10px;
            border-radius: 5px;
            background-color: #2484C6;
            border-top: 1px solid #2484C6;
            border-right: 1px solid #2484C6;
            border-bottom: 1px solid #2484C6;
            border-left: 1px solid #2484C6;
            box-shadow: 2px 1px 2px #2484C6;
            margin: 10px 5px 10px 5px;*/
        }

            .btnPrimary:hover, .btnPrimary:active, .btnPrimary:visited {
                color: #fff;
                position: relative;
                top: 1px;
                left: 1px;
                background-color: #ca4749;
                border-top: 1px solid #ca4749;
                border-right: 1px solid #ca4749;
                border-bottom: 1px solid #ca4749;
                border-left: 1px solid #ca4749;
                box-shadow: -1px -1px 2px #3399df;
            }

        .btnReset {
            font-size: 90%;
            text-shadow: none;
            text-decoration: none;
            text-transform: uppercase;
            color: #fff;
            padding: 6px 10px 6px 10px;
            border-radius: 5px;
            background: #707070;
            border-top: 1px solid #707070;
            border-bottom: 1px solid #707070;
            border-left: 1px solid #707070;
            border-right: 1px solid #707070;
            text-shadow: -1px -1px 1px #707070;
            box-shadow: 2px 1px 2px #707070;
            margin: 10px 5px 10px 5px;
        }

            .btnReset:hover, .btnReset:active, .btnReset:visited {
                color: #fff;
                position: relative;
                top: 1px;
                left: 1px;
                background: #707070;
                border-top: 1px solid #707070;
                border-bottom: 1px solid #707070;
                border-left: 1px solid #707070;
                border-right: 1px solid #707070;
                text-shadow: -1px -1px 1px #707070;
                box-shadow: 2px 1px 2px #707070;
            }

        .btnSave {
            font-size: 90%;
            text-shadow: none;
            text-decoration: none;
            text-transform: uppercase;
            color: #fff;
            padding: 6px 10px 6px 10px;
            border-radius: 5px;
            background: rgba(51, 139, 22, 0.81);
            border-top: 1px solid #338b16;
            border-bottom: 1px solid #338b16;
            border-left: 1px solid #338b16;
            border-right: 1px solid #338b16;
            text-shadow: -1px -1px 1px #338b16;
            box-shadow: 2px 1px 2px #338b16;
            margin: 10px 5px 10px 5px;
        }

            .btnSave:hover, .btnSave:active, .btnSave:visited {
                color: #fff;
                position: relative;
                top: 1px;
                left: 1px;
                background: rgba(51, 139, 22, 0.87);
                border-top: 1px solid #338b16;
                border-bottom: 1px solid #338b16;
                border-left: 1px solid #338b16;
                border-right: 1px solid #338b16;
                text-shadow: -1px -1px 1px #338b16;
                box-shadow: 2px 1px 2px #338b16;
            }


        .btnRemove {
            font-size: 90%;
            text-shadow: none;
            text-decoration: none;
            text-transform: uppercase;
            color: #fff;
            padding: 6px 10px 6px 10px;
            border-radius: 5px;
            background: rgba(176, 17, 17, 0.84);
            border-top: 1px solid #b01111;
            border-bottom: 1px solid #b01111;
            border-left: 1px solid #b01111;
            border-right: 1px solid #b01111;
            text-shadow: -1px -1px 1px #b01111;
            box-shadow: 2px 1px 2px #b01111;
            margin: 10px 5px 10px 5px;
        }

            .btnRemove:hover, .btnRemove:active, .btnRemove:visited {
                color: #fff;
                position: relative;
                top: 1px;
                left: 1px;
                background: rgba(176, 17, 17, 0.84);
                border-top: 1px solid #b01111;
                border-bottom: 1px solid #b01111;
                border-left: 1px solid #b01111;
                border-right: 1px solid #b01111;
                text-shadow: -1px -1px 1px #b01111;
                box-shadow: 2px 1px 2px #b01111;
            }

        select[disabled] {
            background-color: #ebebe4;
            cursor: not-allowed;
            width: 95%;
            color: #808080;
            padding: 3px;
        }

        .jqmTitle {
            background-color: #b73a3c;
            color: #FFFFFF;
            font-size: 14px;
            font-weight: bold;
            padding: 5px 0;
            text-align: center;
        }

        .jqmConfirmation {
            background-color: #EEEEEE;
            border: 10px solid #b73a3c;
            color: #333333;
            display: none;
            left: 60%;
            margin-left: -300px;
            padding: 12px;
            position: fixed;
            top: 40%;
            /*width: 275px;*/
            width: 330px;
        }

        .divColumn {
            width: 75px;
            float: left;
        }
    </style>

</asp:Content>



<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="loadingdiv">
        <div id="UpdateProgress1" style="display: none;">
            <div class="loadingdivOuter" id="loadingdivOuter">
                <div class="loadingdivinner">
                    <div class="loadingdivmiddle">
                        <div class="loadingdivimg">
                            <img id="imgLoading" src="../Images/please_wait.gif" alt="Loading..." />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>


    <div id="divConfirmation" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="divRow">
                    <span id="savemsg"></span>
                </div>
                <div class="divRow">
                    <div class="divColumn" style="margin-left: 70px;">
                        <div>
                            <input id="btnSaveYes" name="btnSaveYes" type="button" value="Yes" />
                        </div>
                    </div>
                    <div class="divColumn">
                        <div>
                            <input id="btnSaveNo" name="btnSaveNo" type="button" value="No" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="Divmessage" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="jqmmsg">
                    <label id="hlabmsg" name="hlabmsg">
                    </label>
                    <br />
                    <br />
                    <input id="btnOk" name="btnOk" type="button" value="OK" />
                </div>
            </div>
        </div>
    </div>

    <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />

    <br />


    <!-- Summary Modal -->
    <div id="QuizTestSummaryModal" class="modal fade" role="dialog" style="display: none;">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header" style="background: #b73a3c; color: #fff;">
                    <h4 class="modal-title">Result</h4>
                </div>
                <div class="modal-body ">
                    <div class="summaryBody"></div>

                    <div class="row">
                        <div class="col-md-offset-3 col-md-2">
                            <button type="button" class="btn btn-block btn-primary" onclick="PrintModalResult();"><i class="fa fa-print"></i>&nbsp;&nbsp;Print</button>
                        </div>
                        <div class="col-md-2">
                            <button type="button" class="btn btn-block btn-danger" onclick="ExportToPDF();"><i class="fa fa-file-pdf"></i>&nbsp;&nbsp;PDF</button>
                        </div>
                        <%--<div class="col-md-2">
                            <button type="button" class="btn btn-block btn-success" onclick="ExportToEXCEL();"><i class="fa fa-file-excel"></i>&nbsp;&nbsp;Excel</button>
                        </div>--%>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>




    <div class="container" id="FormFields">
        <div class="row">
            <div class="col-md-12 text-center" style="padding: 20px;">
                <div>
                    <img style="vertical-align: middle; width: 12%;" src="e_quiz_icon.png" alt="E-Quiz" />
                    <span style="font-size: 3.2em;">e-Quiz</span>
                </div>
            </div>
        </div>
        <div class="row">
            <div id="AssignedFormOfEmpList">
            </div>
        </div>
        <br />
        <br />
        <div id="QuizTestFormDetail" style="display: none; margin-bottom: 20px; box-shadow: 0px 2px 5px 1px #888888; border: 1px solid rgba(128, 128, 128, 0.35); border-radius: 10px; padding: 20px;">
            <div class="row FinalAttemptDateDiv" style="display:none;">
                <div class="col-md-12">
                    <h4 class="text-center FinalAttemptDateText text-danger">
                        <%--<b>Final attempt date for this e-Quiz is: &nbsp; <span class="FinalAttemptDateText text-danger"></span></b>--%>
                    </h4>
                </div>
            </div>
            <div class="row">
                <div class="col-md-5">
                    <h1 class="QuizTestName"></h1>
                    <br />
                    <h4>Total questions: <span class="QuizTestTotalQuestions"></span></h4>
                    <%--<h4>Total questions assgined: <span class="QuizTestTotalAssignedQuestions"></span></h4>--%>
                    <h4>Total quiz time: <span class="QuizTestTotalTime"></span></h4>
                    <h4>Total quiz score: <span class="QuizTestScore"></span></h4>
                </div>
                <div class="col-md-2">
                    <h2></h2>
                    <button type="button" class="btn btn-lg btn-danger btnStartQuizTest" style="margin-top: 40%; width: 100%; font-size: 26px;">Start Quiz </button>
                    <h4 class="btnCancelQuizFill text-center" onclick="CancelQuizFill();" style="text-align: center;">
                        <a href="javascript:;" class="label label-primary">Cancel</a>
                    </h4>
                </div>
                <div class=" col-md-offset-2 col-md-3">
                    <h3>Quiz Grading</h3>
                    <div id="QuizGrading">
                    </div>
                </div>
            </div>
        </div>

        <div id="QuizTestFormQAList" style="display: none; margin-bottom: 20px; box-shadow: 0px 2px 5px 1px #888888; border: 1px solid rgba(128, 128, 128, 0.35); border-radius: 10px; padding: 20px;">
            <div class="row quizHeader">
                <div class="col-md-12">
                    <h1 class="QuizTestName text-center"></h1>
                    <div class="col-md-6">
                        <h3>Question No. <span class="QuestionNumber"></span></h3>
                    </div>
                    <%--<div class="col-md-3" >
                        <h3>Points<span class="QuizPoints"></span></h3>
                    </div>  --%>
                    <div class=" col-md-offset-2 col-md-3 text-right">
                        <h3><span id="DivQuestionTime"></span></h3>
                    </div>
                </div>
            </div>
            <div class="row quizBody" style="padding: 20px;">
            </div>
            <div class="row quizFooter">
                <div class="row">
                    <div class="col-md-12">
                        <center>
                            <%--save answer and show right wrong answer--%>
                            <button type="button" class="btn btn-success btnSubmitAnswer" onclick="SaveAndShowRightWrongAnswer()">Submit Answer</button>

                            <%--get next question after showing right or wrong answer--%>
                            <%--<button type="button" class="btn btn-danger btnNextQuestion" onclick="GetNextQuestion()" style="display: none;">Next Question</button>--%>
                            <h3 class="loadingNextQuestionText"></h3>

                            <%--finish test--%>
                            <button type="button" class="btn btn-danger btnSubmitQuizTestForm" onclick="SaveQuizTestAndShowSummary()" style="display: none;">
                                <h4>Test Finished. Click here to view result</h4>
                            </button>
                        </center>
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-md-offset-2 col-md-8" style="border: 1px solid #000; background: #ebebeb;">
                        <div class="col-md-offset-1 col-md-5">
                            <h4>Total score: <span class="totalScore">0 score </span>
                            </h4>
                        </div>
                        <div class="col-md-6">
                            <h4>Total time: <span class="totalTime">0 minutes </span>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <%--Summary--%>

        <div id="QuizTestSummary" style="display: none; margin-bottom: 20px; box-shadow: 0px 2px 5px 1px #888888; border: 1px solid rgba(128, 128, 128, 0.35); border-radius: 10px; padding: 20px;">

            <div class="row">
                <div class="col-md-offset-3 col-md-2">
                    <button type="button" class="btn btn-block btn-primary" onclick="PrintResult();"><i class="fa fa-print"></i>&nbsp;&nbsp;Print</button>
                </div>
                <div class="col-md-2">
                    <button type="button" class="btn btn-block btn-danger" onclick="ExportPDF();"><i class="fa fa-file-pdf"></i>&nbsp;&nbsp;PDF</button>
                </div>
                <%--<div class="col-md-2">
                    <button type="button" class="btn btn-block btn-success" onclick="ExportEXCEL();"><i class="fa fa-file-excel"></i>&nbsp;&nbsp;Excel</button>
                </div>--%>
            </div>
            <div id="QuizTestSummaryResult">
                <div class="row">
                    <div class="col-md-12">
                        <center>
                            <h1 class="S_QuizTestName"></h1>
                            <img src="https://www.tutorialspoint.com/images/report_card.png" alt="Score Card" />
                            <h2>You scored <span class="S_Percentage"></span>%</h2>
                        </center>
                    </div>
                    <div class="col-md-12 text-center">
                        <h3 class="S_Grade">
                            <i class="fa fa-5x fa-check-circle text-success"></i>
                            <span class="S_Grade"></span>
                        </h3>
                    </div>
                    <div class="col-md-offset-2 col-md-8">
                        <div class="table">
                            <table class="table table-bordered table-responsive table-hover">
                                <thead>
                                    <tr>
                                        <th>Submitted by</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span class="S_SubmittedBy">Umer Waqar Ahmed</span>
                                        </td>
                                        <td>
                                            <span class="S_QuizDate">Feb 20, 2018</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-md-offset-2 col-md-8">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Total score</th>
                                    <th>Your score</th>
                                    <th>Time taken</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span class="S_TotalScore">100</span></td>
                                    <td><span class="S_YourScore">80</span></td>
                                    <td><span class="S_TimeTaken">1minute 12seconds</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-offset-2 col-md-8">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Right answers</th>
                                    <th>Wrong answers</th>
                                    <th>Unanswered Questions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span class="S_RightAnswers">8</span></td>
                                    <td><span class="S_WrongAnswers">2</span></td>
                                    <td><span class="S_UnansweredQuestions">0</span></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div class="col-md-12 text-center">
                        <button class="btn btn-lg btn-danger" type="button" onclick="QuizTestDone();">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <script type="text/javascript" src="assets_new/jquery-1.12.4.js"></script>
    <script type="text/javascript" src="../Scripts/json-minified.js"></script>
    <script type="text/javascript" src="assets_new/bootstrap.min.js"></script>
    <script type="text/javascript" src="assets_new/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="assets_new/dataTables.bootstrap.min.js"></script>
    <script type="text/javascript" src="assets_new/dataTables.responsive.min.js"></script>
    <script type="text/javascript" src="assets_new/responsive.bootstrap.min.js"></script>
    <script type="text/javascript" src="assets_new/jquery.validate.min.js"></script>
    <script type="text/javascript" src="assets_new/additional-methods.min.js"></script>
    <script type="text/javascript" src="assets_new/jquery.cookie.min.js"></script>
    <script type="text/javascript" src="assets_new/jquery-ui.js"></script>

    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>

    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>

    <script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js" type="text/javascript"></script>

    <script type="text/javascript">
        var $2 = jQuery.noConflict();
    </script>

    <script src="QuizTestFill.js" type="text/javascript"></script>

    <script type="text/javascript">
        //function PrintResult() {
        //    $("#QuizTestSummary").printThis();
        //}

        function PrintResult() {
            var contents = $("#QuizTestSummaryResult").html();
            var frame1 = $('<iframe />');
            frame1[0].name = "frame1";
            frame1.css({ "position": "absolute", "top": "-1000000px" });
            $("body").append(frame1);
            var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
            frameDoc.document.open();
            //Create a new HTML document.
            frameDoc.document.write('<html><head><title>Quiz Result</title>');
            frameDoc.document.write('</head><body>');
            //Append the external CSS file.
            frameDoc.document.write('<link href="assets_new/bootstrap.min.css" rel="stylesheet" type="text/css" />');
            frameDoc.document.write('<link href="dataTables.bootstrap.min.css" rel="stylesheet" type="text/css" />');
            frameDoc.document.write('<link href="assets_new/font-awesome/css/fontawesome-all.min.css" rel="stylesheet" type="text/css" />');
            frameDoc.document.write('<link href="assets_new/style.css" rel="stylesheet" type="text/css" />');
            //Append the DIV contents.
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                frame1.remove();
            }, 500);
        }

        function ExportPDF() {
            debugger
            //var doc1 = new jsPDF({
            //    orientation: 'landscape'
            //});

            //doc1.fromHTML($('#QuizTestSummaryResult').html());
            //doc1.save('QuizResult.pdf');

            var doc = new jsPDF('p', 'pt', 'a4', true);
            doc.fromHTML($('#QuizTestSummaryResult').html(), 15, 15, {
                'width': 1200,
                orientation: 'landscape'
            }, function (dispose) {
                doc.save('QuizResult.pdf');
            });
        }

        //function ExportEXCEL() {
        //    let file = new Blob([$('#QuizTestSummaryResult').html()], { type: "application/vnd.ms-excel" });
        //    let url = URL.createObjectURL(file);
        //    let a = $("<a />", {
        //        href: url,
        //        download: "QuizResult.xls"
        //    }).appendTo("body").get(0).click();
        //}

        //function PrintModalResult() {
        //    $("#QuizTestSummaryModal").printThis();
        //}
        function PrintModalResult() {
            var contents = $(".summaryBody").html();
            var frame1 = $('<iframe />');
            frame1[0].name = "frame1";
            frame1.css({ "position": "absolute", "top": "-1000000px" });
            $("body").append(frame1);
            var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
            frameDoc.document.open();
            //Create a new HTML document.
            frameDoc.document.write('<html><head><title>Quiz Result</title>');
            frameDoc.document.write('</head><body>');
            //Append the external CSS file.
            frameDoc.document.write('<link href="assets_new/bootstrap.min.css" rel="stylesheet" type="text/css" />');
            frameDoc.document.write('<link href="dataTables.bootstrap.min.css" rel="stylesheet" type="text/css" />');
            frameDoc.document.write('<link href="assets_new/font-awesome/css/fontawesome-all.min.css" rel="stylesheet" type="text/css" />');
            frameDoc.document.write('<link href="assets_new/style.css" rel="stylesheet" type="text/css" />');
            //Append the DIV contents.
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                frame1.remove();
            }, 500);
        }

        function ExportToPDF() {
            debugger
            //var doc = new jsPDF({
            //    orientation: 'landscape'
            //});

            //doc.fromHTML($('.summaryBody').html());
            //doc.save('QuizResult.pdf');

            var doc = new jsPDF('p', 'pt', 'a4', true);
            doc.fromHTML($('.summaryBody').html(), 15, 15, {
                'width': 1000,
                orientation: 'landscape'
            }, function (dispose) {
                doc.save('QuizResult.pdf');
            });
        }

        //function ExportToEXCEL() {
        //    let file = new Blob([$('.summaryBody').html()], { type: "application/vnd.ms-excel" });
        //    let url = URL.createObjectURL(file);
        //    let a = $("<a />", {
        //        href: url,
        //        download: "QuizResult.xls"
        //    }).appendTo("body").get(0).click();
        //}
    </script>

</asp:Content>

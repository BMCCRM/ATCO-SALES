<%@ Page Title="Quiz Test Questions/Answers" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="QuizTestQuestions.aspx.cs" Inherits="PocketDCR2.Form.QuizTestQuestions" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="icon" href="../assets/img/ici_favicon.png" type="image/gif" sizes="16x16" />
    <link rel="stylesheet" href="assets_new/bootstrap.min.css" />
    <%--<link rel="stylesheet" href="assets_new/font-awesome.min.css" />--%>


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

    <link href="assets_new/bootstrap.min.css" rel="stylesheet" />
    <link href="assets_new/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="assets_new/dataTables.fontAwesome.css" rel="stylesheet" />

    <link rel="stylesheet" href="assets_new/jquery-ui.css" />

    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />


    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />


    <style type="text/css">
        #container {
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 20px;
        }

        thead {
            background: #b73a3c;
            color: #fff;
        }

        .btnPrimary {
            font-size: 90%;
            text-shadow: none;
            text-decoration: none;
            text-shadow: -1px -1px 1px #72aebd;
            text-transform: uppercase;
            color: #fff;
            padding: 6px 10px 6px 10px;
            border-radius: 5px;
            background-color: #b73a3c;
            border-top: 1px solid #b73a3c;
            border-right: 1px solid #b73a3c;
            border-bottom: 1px solid #b73a3c;
            border-left: 1px solid #b73a3c;
            box-shadow: 2px 1px 2px #b73a3c;
            margin: 10px 5px 10px 5px;
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
                box-shadow: -1px -1px 2px #ccc;
            }

        .btnUpdate {
            font-size: 90%;
            text-shadow: none;
            text-decoration: none;
            text-shadow: -1px -1px 1px #72aebd;
            text-transform: uppercase;
            color: #fff;
            padding: 6px 10px 6px 10px;
            border-radius: 5px;
            background-color: #ca393b;
            border-top: 1px solid #ca393b;
            border-right: 1px solid #ca393b;
            border-bottom: 1px solid #ca393b;
            border-left: 1px solid #ca393b;
            box-shadow: 2px 1px 2px #ca393b;
            margin: 10px 5px 10px 5px;
        }

            .btnUpdate:hover, .btnUpdate:active, .btnUpdate:visited {
                color: #fff;
                position: relative;
                top: 1px;
                left: 1px;
                background-color: #bb3335;
                border-top: 1px solid #bb3335;
                border-right: 1px solid #bb3335;
                border-bottom: 1px solid #bb3335;
                border-left: 1px solid #bb3335;
                box-shadow: -1px -1px 2px #bb3335;
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

        #btnUploadQuestionExcel {
            border-radius: 5px;
            cursor: pointer;
        }


            #btnUploadQuestionExcel object {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 25px;
            }
            .uploadify-button{
            border-radius: 5px;
            cursor: pointer;
        }

            .uploadify {
                margin-top: 10px;
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
                    Would you like to delete this record?
                </div>
                <div class="divRow">
                    <div class="divColumn" style="margin-left: 70px;">
                        <div>
                            <input id="btnDeleteYes" name="btnDeleteYes" type="button" value="Yes" />
                        </div>
                    </div>
                    <div class="divColumn">
                        <div>
                            <input id="btnDeleteNo" name="btnDeleteNo" type="button" value="No" />
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


    <div class="page_heading">
        <center>
            <h1 class="quizName" style="float: none; text-align: center;"></h1>
            <br />
            <h4>Time: <span class="quizTime"></span> | Score: <span class="quizScore"></span></h4>
            <br />
            <h5>Score type: <span class="scoreType"></span> <span class="DefaultScoreOfQuestion"></span></h5>
            <br />
            <button type="button" id="btnAddQuestion" class="btn btnPrimary">Add Question</button>
            <button type="button" id="btnExportQuestionExcel" class="btn btn-primary" style="position: relative;">Download Format</button>
            <br />
            <button type="button" id="btnUploadQuestionExcel" class="btn btn-success" style="position: relative; margin-top: 10px;">Upload excel</button>
        </center>
    </div>
    <div class="container">
        <div id="MasterFormQuestions" style="display: none;">
            <div class="row">
                <div class="col-md-8">
                    <div class="form-group">
                        <label for="frmQ">Question : <span class="red">*</span></label>
                        <input type="text" class="form-control" id="frmQ" name="frmQ" placeholder="Question" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="ddAsnwerType">Answer Type: <span class="red">*</span></label>
                        <select class="form-control" name="ddAsnwerType" id="ddAsnwerType">
                            <option value="">Select answer type</option>
                            <option value="rb">Single Selection (Radio Button)</option>
                            <option value="cb">Multiple Selection (Checkbox)</option>
                            <option value="blank">Fill in the Blank</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="frmTime">Time In <span class="TimeIn"></span> : <span class="red">*</span></label>
                        <input type="number" class="form-control" id="frmTime" name="frmTime" placeholder="Form Time In Minutes. e.g. 2 for 2 minutes" />
                    </div>
                </div>
                <div class="col-md-3" id="QuestionScoreDiv" style="display:none;">
                    <div class="form-group">
                        <label for="frmScore">Score : <span class="red">*</span></label>
                        <input type="number" class="form-control" id="frmScore" name="frmScore" placeholder="Question Score" />
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label for=""></label>
                        <br />
                        <%--<button type="button" class="btn btnPrimary" id="btnUpdateQuestion" style="display: none;">Update</button>--%>
                        <button type="button" class="btn btnPrimary" id="btnSaveQuestion">Add Answer</button>
                        <button type="button" class="btn btnReset" id="btnResetFields" onclick="clearAllFieldsAfterAnswerAdded()">Reset</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="MasterFormQuestionAnswer" style="display: none;">
        </div>

        <div class="row">
            <div class="col-md-5">
                <div class="form-group">
                    <label></label>
                    <br />
                    <button type="button" class="btn btnPrimary" id="btnAddAnotherAnswer" style="display: none;">Add Another Answer</button>
                    <button type="button" class="btn btnRemove" id="btnRemoveAnswer" style="display: none;">Remove Answer</button>
                    <button type="button" class="btn btnSave" id="btnSaveAnswer" style="display: none;">Save Answer</button>
                    <button type="button" class="btn btnSave" id="btnUpdateAnswer" style="display: none;">Update</button>
                </div>
            </div>
        </div>

        <br />

        <div class="row" id="FormQuestionsList">
        </div>
    </div>

    <script type="text/javascript" src="assets_new/jquery-1.12.4.js"></script>

    <script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.js"></script>

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
    <script type="text/javascript">
        var $2 = jQuery.noConflict();
    </script>

    <script type="text/javascript" src="QuizTestQuestions.js"></script>

</asp:Content>

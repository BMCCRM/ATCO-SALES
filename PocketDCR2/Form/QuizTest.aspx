<%@ Page Title="Quiz Test" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="QuizTest.aspx.cs" Inherits="PocketDCR2.Form.QuizTest" %>


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
                    Are you sure to delete this record(s)?
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

    <div id="divGradingModal" class="jqmConfirmation" style="width: 400px; left: 55%; top: 25%;">
        <div class="jqmTitle">
            Quiz Grading
        </div>
        <br />
        <div id="DivGrading">
            <div class="row text-center gradeField1">
                <div class="col-md-5" style="margin-left: 13px;">
                    <input type="text" class="form-control validateGrade gradeValue" placeholder="Grade" />
                </div>
                <div class="col-md-6">
                    <input type="number" class="form-control validateGrade scoreValue" placeholder="Min Score" />
                </div>
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col-md-6" style="margin-left: 15px;">
                <button type="button" class="btn btn-sm btn-success btnAppendGradeField" onclick="AppendDivGrading()" data-toggle="tooltip" title="Add More Field"><i class="fa fa-plus"></i></button>
                <button type="button" class="btn btn-sm btn-danger btnRemoveGradeField" onclick="RemoveDivGrading()" data-toggle="tooltip" title="Remove Field" style="display: none;"><i class="fa fa-minus"></i></button>
            </div>
            <div class="col-md-5 text-right">
                <button type="button" id="btnSaveGrading" name="btnSaveGrading" value="Save">Save</button>
                <button type="button" id="btnUpdateGrading" name="btnUpdateGrading" value="Update" style="display: none;">Update</button>
                <button type="button" id="btnCancelGrading" name="btnCancelGrading" value="Cancel">Cancel</button>
            </div>
        </div>
        <%--<div class="divEdit">
            <div class="divTable">
                <div class="divRow">
                    
                </div>
                <div class="divRow">
                    <div class="divColumn" style="margin-left: 70px;">
                        <div>
                            <input id="btnEditGrading" name="btnEditGrading" type="button" value="Edit" />
                        </div>
                    </div>
                    <div class="divColumn" style="margin-left: 70px;">
                        <div>
                            <input id="btnSaveGrading" name="btnSaveGrading" type="button" value="Save" />
                            <input id="btnUpdateGrading" name="btnUpdateGrading" type="button" value="Update" />
                        </div>
                    </div>
                    <div class="divColumn">
                        <div>
                            <input id="btnCancelGrading" name="btnCancelGrading" type="button" value="Cancel" />
                        </div>
                    </div>
                </div>
            </div>
        </div>--%>
    </div>



    <div class="container" id="MasterFormFields">
        <div class="page_heading row">
            <h1>Create Quiz</h1>
        </div>
        <div class="row">
            <div class="col-md-8">
                <div class="form-group">
                    <label for="frmName">Form Name: <span class="red">*</span></label>
                    <input type="text" class="form-control" id="frmName" name="frmName" placeholder="Form Name" />
                </div>
            </div>
        </div>
        <div class="row">    
            <div class="col-md-3" id="TimeInDiv">
                <div class="form-group">
                    <label for="frmQScore">Time In <span class="red">*</span></label>
                    <select class="form-control" id="TimeInDD" name="TimeInDD">
                        <option value="">Select</option>
                        <option value="Seconds">Seconds</option>
                        <option value="Minutes">Minutes</option>
                    </select>
                </div>
            </div>  
            <%--<div class="col-md-4" id="QuestionTimeInDiv">
                <div class="form-group">
                    <label for="frmQScore">Question's Time: (Specify time for each question) <span class="red">*</span></label>
                    <input type="text" class="form-control" id="frmQTime" name="frmQTime" value="0" placeholder="Global time for each question" />
                </div>
            </div> --%>     
            <div class="col-md-3" id="OneTimeScoreDiv">
                <div class="form-group">
                    <label for="frmQScore">Score Type <span class="red">*</span></label>
                    <select class="form-control" id="OneTimeScoreDD" name="OneTimeScoreDD" onchange="OnChangeOneTimeScoreDD();">
                        <option value="">Select</option>
                        <option value="SetDefaultScore">Set Default Question Score</option>
                        <option value="IndividualScore">Individual Score For Each Question</option>
                    </select>
                </div>
            </div>
            <div class="col-md-4" id="QuestionScoreDiv" style="display:none;">
                <div class="form-group">
                    <label for="frmQScore">Question's Score: (Specify score for each question) <span class="red">*</span></label>
                    <input type="text" class="form-control" id="frmQScore" name="frmQScore" value="0" placeholder="Global score for each question" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <label for="frmDescription">Description:</label>
                <textarea class="form-control" id="frmDescription" name="frmDescription" placeholder="Form Description" cols="5" rows="4"></textarea>
            </div>
        </div>
        <%--<br />
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="frmTime">
                        Total Time: <span class="red">*</span>
                        <span class="fa fa-question-circle" data-toggle="tooltip" data-html="true" title="Set a time limit for this Quiz. Example: 2 hrs = 120 " style="cursor: help;"></span>
                    </label>
                    <input type="number" class="form-control" id="frmTime" name="frmTime" placeholder="Total time in minutes. e.g. 30" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="frmScore">Total Score: <span class="red">*</span></label>
                    <input type="number" class="form-control" id="frmScore" name="frmScore" placeholder="Total Score. e.g. 100" />
                </div>
            </div>
        </div>--%>
        <br />
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="startDate">Start Date: <span class="red">*</span></label>
                    <input type="text" class="form-control" id="startDate" name="startDate" placeholder="Start Date" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="endDate">End Date: <span class="red">*</span></label>
                    <input type="text" class="form-control" id="endDate" name="endDate" placeholder="End Date" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <button type="button" class="btn btnPrimary" id="btnSaveQuiz"><i class="fa fa-check"></i>&nbsp;&nbsp;Submit</button>
                <button type="button" class="btn btnUpdate" id="btnUpdateQuiz" style="display: none;"><i class="fa fa-check"></i>&nbsp;&nbsp;Update</button>
                <button type="button" class="btn btn-default" id="btnClearQuiz"><i class="fa fa-times"></i>&nbsp;&nbsp;Reset</button>
            </div>
        </div>

        <br />

        <div class="container">
            <div class="page_heading">
                <h1>Quiz Forms</h1>
            </div>

            <div class="row" id="QuizFormList">
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
    <script type="text/javascript">
        var $2 = jQuery.noConflict();
    </script>


    <script type="text/javascript" src="QuizTest.js"></script>

</asp:Content>

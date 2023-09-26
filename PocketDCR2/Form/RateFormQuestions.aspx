<%@ Page Title="Rate Form Questions / Answers" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="RateFormQuestions.aspx.cs" Inherits="PocketDCR2.Form.RateFormQuestions" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="icon" href="../assets/img/ici_favicon.png" type="image/gif" sizes="16x16" />
    <link rel="stylesheet" href="assets_new/bootstrap.min.css" />
    <%--<link rel="stylesheet" href="assets_new/font-awesome.min.css" />--%>
    
    <link href="assets_new/bootstrap.min.css" rel="stylesheet" />
    <link href="assets_new/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="assets_new/dataTables.fontAwesome.css" rel="stylesheet" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

    <link rel="stylesheet" href="assets_new/jquery-ui.css" />

    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />

    <style type="text/css">
        thead {
            background: #2484c6;
            color: #fff;
        }
        #btnUpdateAnswer{
            background-color: #b73a3c;     
            border-top: 1px solid #b73a3c;
            border-bottom: 1px solid #b73a3c;
            border-left: 1px solid #b73a3c;
            border-right: 1px solid #b73a3c;
            text-shadow: -1px -1px 1px #b73a3c;
            box-shadow: 2px 1px 2px #b73a3c;
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
            border-top: 1px solid #2484C6;
            border-right: 1px solid #2484C6;
            border-bottom: 1px solid #2484C6;
            border-left: 1px solid #2484C6;
            box-shadow: 2px 1px 2px #2484C6;
            margin: 10px 5px 10px 5px;
        }

        .btnPrimary:hover, .btnPrimary:active, .btnPrimary:visited {
            color: #fff;
            position: relative;
            top: 1px;
            left: 1px;
            background-color: #03429a;
            border-top: 1px solid #03429a;
            border-right: 1px solid #03429a;
            border-bottom: 1px solid #03429a;
            border-left: 1px solid #03429a;
            box-shadow: -1px -1px 2px #03429a;
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
            width:330px;
        }

        .divColumn {
            width: 75px;
            float: left;
        }

        .table>caption+thead>tr:first-child>td, .table>caption+thead>tr:first-child>th, .table>colgroup+thead>tr:first-child>td, .table>colgroup+thead>tr:first-child>th, .table>thead:first-child>tr:first-child>td, .table>thead:first-child>tr:first-child>th
        {
            background-color: #b73a3c;
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

    <div class="page_heading">
        <h1 class="FormName" style="float: none; text-align: center;"></h1>
        <br />
        <center>
            <button type="button" id="btnAddQuestion" class="btn btnPrimary">Add Question</button></center>
    </div>
    <div class="container">
        <div id="MasterFormQuestions" style="display: none;">
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="frmQ">Question : <span class="red">*</span></label>
                        <input type="text" class="form-control" id="frmQ" name="frmQ" placeholder="Question" maxlength="500"/>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="frmToolTip">Tool Tip : 
                            <%--<span class="red">*</span>--%>

                        </label>
                        <input type="text" class="form-control" id="frmToolTip" name="frmToolTip" placeholder="Tool Tip" maxlength="500"/>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label for="ddAsnwerType">Question Type: <span class="red">*</span></label>
                        <select class="form-control" name="ddAsnwerType" id="ddAsnwerType">
                            <option value="">Select answer type</option>
                            <option value="rb">Single Selection</option>
                          <%--  <option value="cb">Multiple Selection</option>
                            <option value="txt">Text</option>--%>
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label for=""></label>
                        <br />
                        <button type="button" class="btn btnPrimary" id="btnUpdateQuestion" style="display: none;">Update</button>
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


    <script src="RateFormQuestions.js" type="text/javascript"></script>


</asp:Content>

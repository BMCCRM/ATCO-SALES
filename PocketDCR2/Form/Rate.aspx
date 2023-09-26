<%@ Page Title="Rating Form" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="Rate.aspx.cs" Inherits="PocketDCR2.Form.Rate" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="icon" href="../assets/img/ici_favicon.png" type="image/gif" sizes="16x16" />
    <link rel="stylesheet" href="assets_new/bootstrap.min.css" />
    <link rel="stylesheet" href="assets_new/font-awesome.min.css" />


  
     <link href="assets_new/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="assets_new/dataTables.fontAwesome.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

<%--    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" />--%>
    <link href="assets_new/font-awesome/css/fontawesome-all.min.css" rel="stylesheet" />

    <link rel="stylesheet" href="assets_new/jquery-ui.css" />

    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />

    <style type="text/css">
        thead {
            background: #2484c6;
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
                background-color: #03429a;
                border-top: 1px solid #03429a;
                border-right: 1px solid #03429a;
                border-bottom: 1px solid #03429a;
                border-left: 1px solid #03429a;
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
            background-color: #b73a3c;
            border-top: 1px solid #b73a3c;
            border-right: 1px solid #b73a3c;
            border-bottom: 1px solid #b73a3c;
            border-left: 1px solid #b73a3c;
            box-shadow: 2px 1px 2px #b73a3c;
            margin: 10px 5px 10px 5px;
        }

            .btnUpdate:hover, .btnUpdate:active, .btnUpdate:visited {
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
        .table>caption+thead>tr:first-child>td, .table>caption+thead>tr:first-child>th, .table>colgroup+thead>tr:first-child>td, .table>colgroup+thead>tr:first-child>th, .table>thead:first-child>tr:first-child>td, .table>thead:first-child>tr:first-child>th
        {
               background-color: #b73a3c;
        }
        .row {
             margin-right: -7px;
             margin-left: -7px;
        }

        .page_h {
            padding: 15px 0px 15px 5px;
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

   
    <div class="container" id="MasterFormFields">
         <div class="page_heading">
        <h1>Add New Rating Form</h1>
    </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="frmType">Form Type: <span class="red">*</span></label>
                    <select id="frmType" name="frmType" class="form-control">
                    </select>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="frmName">Form Name: <span class="red">*</span></label>
                    <input type="text" class="form-control" id="frmName" name="frmName" placeholder="Form Name" maxlength="100"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <label for="frmDescription">Description:</label>
                <textarea class="form-control" id="frmDescription" name="frmDescription" placeholder="Form Description" cols="5" rows="2"></textarea>
            </div>
        </div>
        <br />
       <%-- <div class="row">
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
        </div>--%>
        <div class="row">
            <div class="col-md-4">
                <button type="button" class="btn btnPrimary" id="btnSaveForm"><i class="fa fa-check"></i>&nbsp;&nbsp;Submit</button>
                <button type="button" class="btn btnUpdate" id="btnUpdateForm" style="display: none;"><i class="fa fa-check"></i>&nbsp;&nbsp;Update</button>
                <button type="button" class="btn btn-default" id="btnClearForm"><i class="fa fa-times"></i>&nbsp;&nbsp;Reset</button>
            </div>
        </div>

        <br />

        <div class="container">
            <div class="page_heading page_h">
                <h1>Rating Forms List</h1>
            </div>

            <div class="row" id="MasterFormList">
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


    <script type="text/javascript" src="Rate.js"></script>

</asp:Content>

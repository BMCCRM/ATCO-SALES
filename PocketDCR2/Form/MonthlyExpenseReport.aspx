<%@ Page Title="Monthly Expense" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="MonthlyExpenseReport.aspx.cs" Inherits="PocketDCR2.Form.MonthlyExpenseReport" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />
    <script type="text/javascript" src="../assets/js/jquerycookie.js"></script>
    <script src="MonthlyExpenseReport.js" type="text/javascript"></script>
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../assets/global/css/components-rounded.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/css/width-full.css" rel="stylesheet" />
    <script type="text/javascript" src="../assets/js/jquery3.1.0.js"></script>
    <script type="text/javascript">
        var $i = jQuery.noConflict();
    </script>
    <link href="../assets/Select2/select2.min.css" rel="stylesheet" type="text/css" />
    <script src="../assets/Select2/select2.full.js" type="text/javascript"></script>
    <script type="text/javascript">
        var $q = jQuery.noConflict();
    </script>
    <script type="text/JavaScript">

        curvyCorners.addEvent(window, 'load', initCorners);

        function initCorners() {
            var settings = {
                tl: { radius: 10 },
                tr: { radius: 10 },
                bl: { radius: 10 },
                br: { radius: 10 },
                antiAlias: true
            }
            curvyCorners(settings, "#box");
        }

        $(document).ready(function () {
            var height = $('#box').innerHeight();
            var height2 = height - 20 + "px"
            var width = $('#box').innerWidth();
            $('.outerBox').css('width', width)
            $('#box').css('height', height2)
            $('.outerBox').css('margin-bottom', '30px');
        });

    </script>
    <style type="text/css">
        .reportcl {
            width: 100%;
            height: 1500px;
        }

        .reportcl2 {
            width: 100%;
            height: 0px;
        }

        .grid-basic_length {
            display: none;
            width: 0 !important;
        }

        .ajax__combobox_itemlist {
            position: absolute;
            top: 160px !important;
            top: 168px\9 !important;
            left: 47px !important;
        }

        td.ajax__combobox_textboxcontainer {
            padding-bottom: 2px\9 !important;
        }

        .ajax__combobox_inputcontainer {
            top: -7px\9 !important;
        }

        .ob_gC {
            background-image: url("../Styles/GridCss/header.gif");
            color: #242500;
            cursor: pointer;
            font-family: "Calibri",Verdana;
            font-size: 14px;
            font-weight: bold;
            height: 33px;
            text-align: left;
            /*border-bottom: 0px solid;
padding: 1px 1px;*/
            /*border-collapse: separate;*/
        }

        .odd {
            background-color: #f6f5f0 !important;
        }

        .even {
            background-color: #efede2 !important;
        }

        table.dataTable.no-footer {
            border: 0 solid #616262 !important;
        }

        .ob_gMCont {
            border-bottom: 1px solid #e3e2de;
            border-top: 1px solid #e3e2de;
            overflow: hidden;
            position: relative;
        }

        #grid-basi td {
            background-color: #e3e2de;
            font-size: 1px;
            position: absolute;
            top: 0;
            width: 1px;
            z-index: 10;
        }

        #grid-lastdoc td {
            background-color: #e3e2de;
            font-size: 1px;
            position: absolute;
            top: 0;
            width: 1px;
            z-index: 10;
        }

        table.dataTable thead th, table.dataTable thead td {
            padding: 10px 5px !important;
        }
        /*table.dataTable tbody tr .even{background-color: #63432a}*/

        .headerr .wrap {
            width: 200px;
            margin: 0 auto;
            margin-top: 10px;
            text-align: center;
            position: relative;
        }

            .headerr .wrap .img_1, .header .wrap .img_2 {
                border: 1px solid #0f0;
                position: absolute;
                height: 20px;
                width: 20px;
                top: 25px;
            }

            .headerr .wrap .img_1 {
                left: 0;
            }

            .headerr .wrap .img_2 {
                right: 0;
            }

        .styled-select {
            background: url(http://i62.tinypic.com/15xvbd5.png) no-repeat 96% 0;
            overflow: hidden;
            width: 240px;
        }

            .styled-select select {
                background: transparent;
                border: none;
                font-size: 14px;
                padding: 5px; /* If you add too much padding here, the options won't show in IE */
                width: 268px;
            }

        .semi-square {
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
        }

        .blue {
            background-color: whitesmoke;
        }

            .blue select {
                color: black;
            }

        .wrap {
            width: 80%;
            margin: 0 auto;
            margin-top: 15px;
        }

        .parent {
            margin-bottom: 15px;
            padding: 10px;
            color: #0A416B;
            clear: both;
            width: 100%;
        }

        .left {
            float: left;
            width: 12%;
            padding: 5px;
            height: 360px;
        }

        .center {
            float: left;
            width: 65%;
            padding: 5px;
            height: 350px;
        }

        .right {
            float: right;
            padding: 5px;
        }

        textarea {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        .btnsaless {
            border: 1px solid black;
            display: inline-block;
            border-radius: 3px;
            padding: 8px 20px 8px 20px;
            font-size: 15px;
            cursor: pointer;
            color: black;
            text-decoration: none;
            background-color: white;
        }

            .btnsaless:hover {
                background-color: black;
                color: white;
            }

        textarea#styleid {
            color: #666;
            font-size: 14px;
            -moz-border-radius: 8px;
            -webkit-border-radius: 8px;
            margin: 5px 0px 10px 0px;
            padding: 10px;
            height: 75px;
            width: 250px;
            border: #999 1px solid;
            font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
            transition: all 0.25s ease-in-out;
            -webkit-transition: all 0.25s ease-in-out;
            -moz-transition: all 0.25s ease-in-out;
            box-shadow: 0 0 5px rgba(81, 203, 238, 0);
            -webkit-box-shadow: 0 0 5px rgba(81, 203, 238, 0);
            -moz-box-shadow: 0 0 5px rgba(81, 203, 238, 0);
        }

            textarea#styleid:focus {
                color: #000;
                outline: none;
                border: wheat 1px solid;
                font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
                box-shadow: 0 0 5px rgba(81, 203, 238, 1);
                -webkit-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
                -moz-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
            }

        .button-secondary {
            font-size: 15px;
            color: white;
            border-radius: 4px;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
            background: #03429a;
            padding: 6px 20px 6px 20px;
        }

        .overlay {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.7);
            transition: opacity 500ms;
            visibility: hidden;
            opacity: 0;
        }

            .overlay:target {
                visibility: visible;
                opacity: 1;
            }

        .popup {
            margin: 70px auto;
            padding: 20px;
            background: #fff;
            border-radius: 5px;
            width: 80%;
            position: relative;
            transition: all 5s ease-in-out;
        }

            .popup h2 {
                margin-top: 0;
                color: #333;
                font-family: Tahoma, Arial, sans-serif;
            }

            .popup .close {
                position: absolute;
                top: 20px;
                right: 30px;
                transition: all 200ms;
                font-size: 30px;
                font-weight: bold;
                text-decoration: none;
                color: #333;
            }

                .popup .close:hover {
                    color: #06D85F;
                }

            .popup .content {
                max-height: 30%;
                overflow: auto;
            }

        @media screen and (max-width: 700px) {
            .box {
                width: 70%;
            }

            .popup {
                width: 70%;
            }
        }

        .justify-content-center .autowidht {
            width: 14.285% !important;
        }

        .justify-content-start .autowidht {
            width: 14.285% !important;
        }

        .justify-content-center .autowidht span.select2 {
            width: 100% !important;
        }

        .justify-content-start .autowidht span.select2 {
            width: 100% !important;
        }

        .CheckBoxes1 {
            padding-left: 25px;
        }

        #ApproveId {
            font-size: 15px;
            color: #0b6ce4;
        }
    </style>
    <style type="text/css">
        .loading {
            background: #000 url('../Images/loading_bar.gif') no-repeat 20px 18px;
            width: 254px;
            height: 50px;
            position: fixed;
            top: 43%;
            left: 50%;
            margin: -7px 0 0 -107px;
            z-index: 222;
            display: block;
        }

        #uploadify {
            background: #FFFFFF;
            border-radius: 5px;
        }

            #uploadify:hover {
                background: #FFFFFF;
            }

            #uploadify object {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 25px;
            }

        .customdown {
            background-color: #505050;
            background-image: -moz-linear-gradient(center bottom, #505050 0%, #707070 100%);
            background-position: center top;
            background-repeat: no-repeat;
            border: 2px solid #808080;
            border-radius: 30px;
            color: #fff;
            font: bold 12px Arial,Helvetica,sans-serif;
            /*height: 50px;*/
            text-align: center;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
            width: 143px;
            padding: 4px 0;
            color: #fff;
            font: bold 12px Arial,Helvetica,sans-serif;
            text-align: center;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
        }

        #create_button {
            background: #6197b8;
            background-image: -webkit-linear-gradient(top, #6197b8, #389ede);
            background-image: -moz-linear-gradient(top, #6197b8, #389ede);
            background-image: -ms-linear-gradient(top, #6197b8, #389ede);
            background-image: -o-linear-gradient(top, #6197b8, #389ede);
            background-image: linear-gradient(to bottom, #6197b8, #389ede);
            -webkit-border-radius: 15;
            -moz-border-radius: 15;
            border-radius: 15px;
            -webkit-box-shadow: 3px 5px 5px #241624;
            -moz-box-shadow: 3px 5px 5px #241624;
            box-shadow: 3px 5px 5px #241624;
            font-family: Arial;
            color: #ffffff;
            padding: 3px 6px 3px 6px;
            text-decoration: none;
            margin-bottom: 10px;
        }

            #create_button:hover {
                background: #3cb0fd;
                text-decoration: none;
            }

        .portlet.light {
            margin: 10px;
        }

        input#btnDownloadExcel {
    margin-left: 32px;
    margin-top: 5px;
}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <div class="pop_box-outer jqmWindow" id="dialog" style="border: 0; background-color: transparent !important">
            <div class="loading">
            </div>
            <div class="clear">
            </div>
        </div>
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
            </Triggers>
            <ContentTemplate>
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/1330776545_product-sales-report.png" />
                        List of Monthly Expense Report</h1>
                    <input id="btnDownloadExcel" type="button" onclick="funDownloadExcel();" value="Daily allowance">

                    <asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static" OnClick="btnRefresh_Click"
                        Style="display: none;" />
                    <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
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
                                <div class="divColumn">
                                    <div>
                                        <input id="btnYes" name="btnYes" type="button" value="Yes" />
                                    </div>
                                </div>
                                <div class="divColumn">
                                    <div>
                                        <input id="btnNo" name="btnNo" type="button" value="No" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="Divmessage" class="jqmConfirmation" style="z-index: 3001">
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

                <div id="DivForApproval" class="jqmConfirmation">
                    <div class="jqmTitle">
                        More Details
                    </div>
                    <div class="divEdit">
                        <div class="divTable">
                            <span class="requireError" style="color: #d52525; display: none;">
                                <br />
                                <center>Please fill all the details</center>
                            </span>
                            <div class="divRow">
                                Status:
                                <select id="ddlStatus" name="ddlStatus" class="styledselect_form_1" style="width: 142px; margin-left: 30px;">
                                    <option value="" selected="selected">Select Status</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                            <div class="divRow" style="display: none;">
                                Amount:
                                <input id="Amount" name="Amount" type="text" placeholder="Amount" style="width: 140px;" />
                            </div>
                            <div class="divRow">
                                Comments:
                                <input id="Comments" name="Comments" type="text" placeholder="Comments" style="width: 140px;" />
                            </div>
                            <div class="divRow">
                                <div class="divColumn" style="margin-left: 27px;">
                                    <div>
                                        <input id="btnDetailsSubmit" name="btnDetailsSubmit" type="button" value="Submit" style="margin-left: 60px;" />
                                    </div>
                                </div>
                                <div class="divColumn" style="width: 55px;">
                                    <div>
                                        <input id="btnDetailsCancel" name="btnDetailsCancel" type="button" value="Cancel" style="margin-left: 25px;" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="DivForApproval1" class="jqmConfirmation">
                    <div class="jqmTitle">
                        More Details
                    </div>
                    <div class="divEdit">
                        <div class="divTable">
                            <span class="requireError" style="color: #d52525; display: none;">
                                <br />
                                <center>Please fill all the details</center>
                            </span>
                            <div class="divRow">
                                Status:
                                <select id="ddlStatus1" name="ddlStatus" class="styledselect_form_1" style="width: 142px; margin-left: 30px;">
                                    <option value="" selected="selected">Select Status</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Discussion">Discussion</option>
                                </select>
                            </div>
                            <div class="divRow" style="display: none;">
                                Amount:
                                <input id="Amount1" name="Amount" type="text" placeholder="Amount" style="width: 140px;" />
                            </div>
                            <div class="divRow">
                                Comments:
                                <input id="Comments1" name="Comments" type="text" placeholder="Comments" style="width: 140px;" />
                            </div>
                            <div class="divRow">
                                <div class="divColumn" style="margin-left: 27px;">
                                    <div>
                                        <input id="btnDetailsSubmit1" name="btnDetailsSubmit1" type="button" value="Submit" style="margin-left: 60px;" />
                                    </div>
                                </div>
                                <div class="divColumn" style="width: 55px;">
                                    <div>
                                        <input id="btnDetailsCancel1" name="btnDetailsCancel" type="button" value="Cancel" style="margin-left: 25px;" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="DivForCursor" class="jqmConfirmation">
                    <div class="jqmTitle">
                        Confirmation Window
                    </div>
                    <div class="divEdit">
                        <div class="divTable">
                            <div class="divRow">
                                Are you sure to Refresh  record(s)?
                            </div>
                            <div class="divRow">
                                <div class="divColumn">
                                    <div>
                                        <input id="btnYesForcursor" name="btnYes" type="button" value="Yes" />
                                    </div>
                                </div>
                                <div class="divColumn">
                                    <div>
                                        <input id="btnNoForCursor" name="btnNo" type="button" value="No" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label>
                </div>

                <div class="page-content" style="padding: 80px 0px 0px 0px;">
                    <div class="portlet light bordered">
                        <div id="hirarchy" class="form-body">
                            <div class="d-flex justify-content-start">
                                <table border="0" cellpadding="10" cellspacing="0" id="id-fo" style="font-weight: bold">
                                    <tr>
                                        <th valign="top" id="dateForReport">Select Month
                                            <asp:TextBox ID="txtDate" runat="server" ClientIDMode="Static" AutoPostBack="false" CssClass="inp-form" Height="100%" />
                                            <asp:TextBoxWatermarkExtender ID="wTextDate" runat="server" ClientIDMode="Static" TargetControlID="txtDate" WatermarkText="Enter Month-Year" />
                                            <asp:CalendarExtender ID="cTextDate" runat="server" ClientIDMode="Static" OnClientHidden="onCalendarHidden" OnClientShown="onCalendarShown" BehaviorID="calendar1" Enabled="True" Format="MMMM-yyyy" TargetControlID="txtDate"></asp:CalendarExtender>
                                        </th>
                                        <th valign="top">
                                            <div id="create">
                                                <div id="create_button" class="customdown">
                                                    <span class="uploadify-button-text" style="height: 50px;">Generate Expense</span>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                    <%--   <tr>
                                        <th valign="top">
                                            <select id="ddlDataType" name="ddlDataType" class="styledselect_form_1">
                                                <option value="1">Self</option>
                                                <option value="2">All</option>
                                            </select>
                                        </th>
                                    </tr>--%>
                                </table>
                            </div>

                            <div class="d-flex justify-content-start">
                                <div class="p-1 autowidht">
                                    <div id="g1" class="form-group">
                                        <label id="Label5" class="control-label lableblock"></label>
                                        <select id="dG1" class="form-control">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="p-1 autowidht">
                                    <div id="g2" class="form-group">
                                        <label id="Label6" class="control-label lableblock"></label>
                                        <select id="dG2" class="form-control">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="p-1 autowidht" id="gs3">
                                    <div id="g3" class="form-group">
                                        <label id="Label7" class="control-label lableblock"></label>
                                        <select id="dG3" class="form-control">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="p-1 autowidht">
                                    <div id="g7" class="form-group Th12">
                                        <label id="Label13" class="control-label lableblock"></label>
                                        <select id="dG7" class="form-control">
                                            <option value="-1">Select Team</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="p-1 autowidht">
                                    <div id="g4" class="form-group">
                                        <label id="Label8" class="control-label lableblock"></label>
                                        <select id="dG4" class="form-control">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="p-1 autowidht">
                                    <div id="g5" class="form-group">
                                        <label id="Label11" class="control-label lableblock"></label>
                                        <select id="dG5" class="form-control">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="p-1 autowidht">
                                    <div id="g6" class="form-group">
                                        <label id="Label12" class="control-label lableblock"></label>
                                        <select id="dG6" class="form-control">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex justify-content-start">
                                <div class="p-1 autowidht">
                                    <div id="col11" class="form-group">
                                        <label id="Label1" class="control-label lableblock"></label>
                                        <select id="ddl1" class="form-control w-100">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="p-1 autowidht">
                                    <div id="col22" class="form-group">
                                        <label id="Label2" class="control-label lableblock"></label>
                                        <select id="ddl2" class="form-control w-100">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="p-1 autowidht" id="cols33">
                                    <div id="col33" class="form-group">
                                        <label id="Label3" class="control-label lableblock"></label>
                                        <select id="ddl3" class="form-control w-100">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="p-1 autowidht">
                                    <div id="col77" class="Th12 form-group">
                                        <label id="Label14" class="control-label lableblock Th112"></label>
                                        <select id="ddlTeam" class="Th112 form-control w-100">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="p-1 autowidht">
                                    <div id="col44" class="form-group">
                                        <label id="Label4" class="control-label lableblock"></label>
                                        <select id="ddl4" class="form-control w-100">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="p-1 autowidht">
                                    <div id="col55" class="form-group">
                                        <label id="Label9" class="control-label lableblock"></label>
                                        <select id="ddl5" class="form-control w-100">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="p-1 autowidht">
                                    <div id="col66" class="form-group">
                                        <label id="Label10" class="control-label lableblock"></label>
                                        <select id="ddl6" class="form-control w-100">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex justify-content-start">
                                <table border="0" cellpadding="10" cellspacing="0" id="Table1">
                                    <tr>
                                        <th valign="top" id="Th55">Starting Date
                                        </th>
                                        <th valign="top" id="Th66">Ending Date
                                        </th>
                                        <th valign="top" id="ThStatus">Emp Status
                                        </th>
                                    </tr>
                                    <tr>
                                        <th valign="top" id="Th5">
                                            <asp:TextBox ID="stdate" ClientIDMode="Static" runat="server"></asp:TextBox>
                                            <asp:CalendarExtender ID="CalendarExtender1" TargetControlID="stdate" runat="server">
                                            </asp:CalendarExtender>
                                        </th>
                                        <th valign="top" id="Th6">
                                            <asp:TextBox ID="enddate" ClientIDMode="Static" runat="server"></asp:TextBox>
                                            <asp:CalendarExtender ID="CalendarExtender2" TargetControlID="enddate" runat="server">
                                            </asp:CalendarExtender>
                                        </th>
                                        <th valign="top" id="ThStatuss">
                                            <select id="EmpStatus" name="EmpStatus" class="styledselect_form_1">
                                                <option value="-1">Select</option>
                                                <option value="1">Active</option>
                                                <option value="0">Deactive</option>
                                            </select>
                                        </th>
                                        <th>
                                            <input id="BtnSearch" type="button" value="Search" class="btn btn-success" />
                                        </th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <%--Check All Workine Start--%>
                <div class="row" id="ApprvAllDiv">
                    <div class="col-md-2">
                        <div class="CheckBoxes1">
                            <h4 class="text-muted">Select All</h4>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="checkedAll" id="checkAll" />
                        </div>
                    </div>
                    <div class="col-md-2">
                        <a href="#" onclick="ApproveOrRejectAll()" id="ApproveId">Submit All</a>
                    </div>
                </div>

                <%--Check All Workine End--%>


                <%--<table border="0" width="100%" cellpadding="0" cellspacing="0" id="content-table">
                        <tr>
                            <th rowspan="3" class="sized">
                                <img src="../images/form/side_shadowleft.jpg" width="20" height="200" alt="" />
                            </th>

                            <th class="topleft"></th>

                            <td id="tbl-border-top">&nbsp;
                            </td>

                            <th class="topright"></th>

                            <th rowspan="3" class="sized">
                                <img src="../Images/Form/side_shadowright.jpg" width="20" height="200" alt="" />
                            </th>
                        </tr>

                        <tr>
                            <td id="tbl-border-left"></td>

                            <td>
                                <!--  start content-table-inner -->
                                <div id="content-table-inner">
                                    <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                        <tr valign="top">
                                            <td valign="top">
                                                <!-- start id-form -->
                                                <table border="0" cellpadding="10" cellspacing="0" id="id-fo" style="font-weight: bold">
                                                    <tr>
                                                        <th valign="top" id="dateForReport">Select Month
                                                        <asp:TextBox ID="txtDate" runat="server" ClientIDMode="Static" AutoPostBack="false"
                                                            CssClass="inp-form" Height="100%" />
                                                            <asp:TextBoxWatermarkExtender ID="wTextDate" runat="server" ClientIDMode="Static"
                                                                TargetControlID="txtDate" WatermarkText="Enter Month-Year" />
                                                            <asp:CalendarExtender ID="cTextDate" runat="server" ClientIDMode="Static" OnClientHidden="onCalendarHidden"
                                                                OnClientShown="onCalendarShown" BehaviorID="calendar1" Enabled="True" Format="MMMM-yyyy"
                                                                TargetControlID="txtDate">
                                                            </asp:CalendarExtender>
                                                        </th>
                                                        <th valign="top">
                                                            <div id="create">
                                                                <div id="create_button" class="customdown">
                                                                    <span class="uploadify-button-text" style="height: 50px;">Generate Expense</span>
                                                                </div>
                                                            </div>
                                                        </th>
                                                    </tr>

                                                    <tr>
                                                        <th valign="top">
                                                            <select id="ddlDataType" name="ddlDataType" class="styledselect_form_1">
                                                                <option value="1">Self</option>
                                                                <option value="2">All</option>
                                                            </select>
                                                        </th>
                                                    </tr>

                                                </table>

                                                <table border="0" cellpadding="10" cellspacing="0" id="fdform">
                                                    <tr>
                                                        <th>
                                                            <asp:Label ID="Label5" name="Label5" ClientIDMode="Static" runat="server"></asp:Label>
                                                        </th>
                                                        <th>
                                                            <asp:Label ID="Label6" name="Label6" ClientIDMode="Static" runat="server"></asp:Label>
                                                        </th>
                                                        <th>
                                                            <asp:Label ID="Label7" name="Label7" ClientIDMode="Static" runat="server"></asp:Label>
                                                        </th>
                                                        <th class="Th112">
                                                            <asp:Label ID="Label13" name="Label13" ClientIDMode="Static" runat="server"></asp:Label>
                                                        </th>
                                                        <th>
                                                            <asp:Label ID="Label8" name="Label8" ClientIDMode="Static" runat="server"></asp:Label>
                                                        </th>
                                                        <th>
                                                            <asp:Label ID="Label11" name="Label11" ClientIDMode="Static" runat="server"></asp:Label>
                                                        </th>
                                                        <th>
                                                            <asp:Label ID="Label12" name="Label12" ClientIDMode="Static" runat="server"></asp:Label>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th valign="top" id="g1">
                                                            <select id="dG1" name="dG1" class="styledselect_form_1">
                                                                <option value="-1">Select...</option>
                                                            </select>
                                                        </th>
                                                        <th valign="top" id="g2">
                                                            <select id="dG2" name="dG2" class="styledselect_form_1">
                                                                <option value="-1">Select...</option>
                                                            </select>
                                                        </th>
                                                        <th valign="top" id="g3">
                                                            <select id="dG3" name="dG3" class="styledselect_form_1">
                                                                <option value="-1">Select...</option>
                                                            </select>
                                                        </th>
                                                        <th valign="top" class="Th12" id="g7">
                                                            <select id="dG7" name="dG7" class="styledselect_form_1">
                                                                <option value="-1">Select Team</option>
                                                            </select>
                                                        </th>
                                                        <th valign="top" id="g4">
                                                            <select id="dG4" name="dG4" class="styledselect_form_1">
                                                                <option value="-1">Select...</option>
                                                            </select>
                                                        </th>
                                                        <th valign="top" id="g5">
                                                            <select id="dG5" name="dG5" class="styledselect_form_1">
                                                                <option value="-1">Select...</option>
                                                            </select>
                                                        </th>
                                                        <th valign="top" id="g6">
                                                            <select id="dG6" name="dG6" class="styledselect_form_1">
                                                                <option value="-1">Select...</option>
                                                            </select>
                                                        </th>
                                                    </tr>
                                                </table>

                                                <table border="0" cellpadding="10" cellspacing="0" id="id-fo1" style="font-weight: bold">
                                                    <tr>
                                                        <th valign="top" id="col1">
                                                            <div class="divcol">
                                                                <asp:Label ID="Label1" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                            </div>
                                                        </th>
                                                        <th valign="top" id="col2">
                                                            <div class="divcol">
                                                                <asp:Label ID="Label2" name="Label2" ClientIDMode="Static" runat="server"></asp:Label>
                                                            </div>
                                                        </th>

                                                        <th valign="top" id="col3">
                                                            <div class="divcol">
                                                                <asp:Label ID="Label3" name="Label3" ClientIDMode="Static" runat="server"></asp:Label>
                                                            </div>
                                                        </th>
                                                        <th>
                                                            <div class="divcol Th112">
                                                                <asp:Label ID="Label14" name="Label14" ClientIDMode="Static" runat="server"></asp:Label>
                                                            </div>
                                                        </th>
                                                        <th valign="top" id="col4">
                                                            <div class="divcol">
                                                                <asp:Label ID="Label4" name="Label4" ClientIDMode="Static" runat="server"></asp:Label>
                                                            </div>
                                                        </th>
                                                        <th valign="top" id="col5">
                                                            <div class="divcol">
                                                                <asp:Label ID="Label9" name="Label9" ClientIDMode="Static" runat="server"></asp:Label>
                                                            </div>
                                                        </th>
                                                        <th valign="top" id="col6">
                                                            <div class="divcol">
                                                                <asp:Label ID="Label10" name="Label10" ClientIDMode="Static" runat="server"></asp:Label>
                                                            </div>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th valign="top" id="col11">
                                                            <select id="ddl1" name="ddl1" class="styledselect_form_1" style="width: 200px">
                                                                <option value="-1">Select...</option>
                                                            </select>
                                                        </th>
                                                        <th valign="top" id="col22">
                                                            <select id="ddl2" name="ddl2" class="styledselect_form_1" style="width: 200px">
                                                                <option value="-1">Select...</option>
                                                            </select>
                                                        </th>
                                                        <th valign="top" id="col33">
                                                            <select id="ddl3" name="ddl3" class="styledselect_form_1" style="width: 200px">
                                                                <option value="-1">Select...</option>
                                                            </select>
                                                        </th>
                                                        <th valign="top" class="Th12" id="col77">
                                                            <select id="ddlTeam" class="styledselect_form_1" style="width: 200px">
                                                                <option value="-1">Select...</option>
                                                            </select>
                                                        </th>

                                                        <th valign="top" id="col44">
                                                            <select id="ddl4" name="ddl4" class="styledselect_form_1" style="width: 200px">
                                                                <option value="-1">Select...</option>
                                                            </select>
                                                        </th>
                                                        <th valign="top" id="col55">
                                                            <select id="ddl5" name="ddl5" class="styledselect_form_1" style="width: 200px">
                                                                <option value="-1">Select...</option>
                                                            </select>
                                                        </th>
                                                        <th valign="top" id="col66">
                                                            <select id="ddl6" name="ddl6" class="styledselect_form_1" style="width: 200px">
                                                                <option value="-1">Select...</option>
                                                            </select>
                                                        </th>
                                                    </tr>
                                                </table>

                                                <!-- end id-form  -->
                                                <table border="0" cellpadding="10" cellspacing="0" id="Table1">
                                                    <tr>
                                                        <th valign="top" id="Th55">Starting Date
                                                        </th>
                                                        <th valign="top" id="Th66">Ending Date
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th valign="top" id="Th5">
                                                            <asp:TextBox ID="stdate" ClientIDMode="Static" runat="server"></asp:TextBox>
                                                            <asp:CalendarExtender ID="CalendarExtender1" TargetControlID="stdate" runat="server">
                                                            </asp:CalendarExtender>
                                                        </th>
                                                        <th valign="top" id="Th6">
                                                            <asp:TextBox ID="enddate" ClientIDMode="Static" runat="server"></asp:TextBox>
                                                            <asp:CalendarExtender ID="CalendarExtender2" TargetControlID="enddate" runat="server">
                                                            </asp:CalendarExtender>
                                                        </th>
                                                        <th>
                                                            <input id="BtnSearch" type="button" value="Search" class="btn btn-success" />
                                                        </th>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src="../images/form/blank.gif" width="695" height="1" alt="blank" />
                                            </td>
                                            <td></td>
                                        </tr>
                                    </table>

                                    <input id="BtnApprovalAll" type="button" value="Change Status" class="btn btn-success" onclick="ApproveOrRejectAll()" />
                                    <div class="clear">
                                    </div>
                                </div>
                                <!--  end content-table-inner  -->
                            </td>

                            <td id="tbl-border-right"></td>
                        </tr>

                        <tr>
                            <th class="sized bottomleft"></th>
                            <td id="tbl-border-bottom">&nbsp;
                            </td>
                            <th class="sized bottomright"></th>
                        </tr>
                    </table>--%>
                <div class="portlet light bordered">
                    <div class="form-body">
                        <div id="gridTable">
                        </div>
                    </div>
                </div>

                <input id="h1" type="hidden" runat="server" clientidmode="Static" value="-1" />
                <!--Level1 -->
                <input id="h2" type="hidden" runat="server" clientidmode="Static" value="-1" />
                <!--Level2 -->
                <input id="h3" type="hidden" runat="server" clientidmode="Static" value="-1" />
                <!--Level3 -->
                <input id="h4" type="hidden" runat="server" clientidmode="Static" value="-1" />
                <!--Level4 -->
                <input id="h5" type="hidden" runat="server" clientidmode="Static" value="-1" />
                <!--employee ID -->
                <input id="h6" type="hidden" runat="server" clientidmode="Static" value="-1" />
                <!--DR id -->
                <input id="h7" type="hidden" runat="server" clientidmode="Static" value="-1" />
                <!--PROduct ID -->
                <input id="h8" type="hidden" runat="server" clientidmode="Static" value="-1" />
                <!-- VT -->
                <input id="h9" type="hidden" runat="server" clientidmode="Static" value="-1" />
                <!--JV -->
                <input id="h10" type="hidden" runat="server" clientidmode="Static" value="-1" />
                <!--DR class -->
                <input id="h11" type="hidden" runat="server" clientidmode="Static" value="-1" />
                <!--Level5 -->
                <input id="h12" type="hidden" runat="server" clientidmode="Static" value="-1" />
                <!--Level6 -->
                <input id="h13" type="hidden" runat="server" clientidmode="Static" value="-1" />

                <script src="../assets/js/jquery.dataTables.min.js" type="text/javascript"></script>
                <link href="../assets/css/jquery.dataTables.min.css" rel="stylesheet" />
                <div class="iFrameContainer">
                    <iframe id="Reportifram" height="100%" width="100%" frameborder="0"></iframe>
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</asp:Content>

<%@ Page Title="Monthly Doctors" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true"
    CodeBehind="MonthlyDoctorManagement.aspx.cs" Inherits="PocketDCR2.Form.MonthlyDoctorManagement" %>


<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/demo_table_jui.css" rel="stylesheet" type="text/css" />
    <link href="../themes/smoothness/jquery-ui-1.8.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.dataTables.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
    <%--<script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.min.js"></script>--%>
<%--    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />--%>
    <script src="MonthlyDoctorManagement.js"></script>
    <style type="text/css">
        .btnnor {
            font-size: 90%;
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
            margin: 10px 5px 10px 5px;
        }

        .ani:hover {
            position: relative;
            top: 1px;
            left: 1px;
            background-color: #00CCFF;
            border-top: 1px solid #9aebff;
            border-right: 1px solid #08acd5;
            border-bottom: 1px solid #07a1c8;
            border-left: 1px solid #92def1;
            box-shadow: -1px -1px 2px #ccc;
        }

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

        th {
            text-align: left;
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="pop_box-outer jqmWindow" id="dialog">
        <div class="loading" id="jqmloader">
        </div>
        <div class="clear">
        </div>
    </div>

    <asp:HiddenField ID="currentUserID" runat="server" ClientIDMode="Static" />

    <div id="content" style="padding-top: 50px">
        <div id="divGrid1" class="popup_box">

            <table style="width: 50%; float: left; border-radius: 5px; border-color: lightgray !important; border: double; border-width: 1px">

                <tr>
                    <td>
                        <div>
                            <table id="fdform1">
                                <tr>
                                    <td>

                                        <table>
                                            <tr>
                                                <th>Select Month Date: </th>
                                                <th>Select Zone: </th>

                                            </tr>
                                            <tr>
                                                <th>
                                                    <asp:TextBox ID="txtDate" name="txtDate" runat="server" ClientIDMode="Static" AutoPostBack="false"
                                                        CssClass="inp-form" />
                                                    <asp:TextBoxWatermarkExtender ID="wTextDate" runat="server" ClientIDMode="Static"
                                                        TargetControlID="txtDate" WatermarkText="Enter Year - Month" />
                                                    <asp:CalendarExtender ID="cTextDate" runat="server" ClientIDMode="Static" OnClientHidden="onCalendarHidden"
                                                        OnClientShown="onCalendarShown" BehaviorID="calendar1" Enabled="True" Format="MMMM-yyyy"
                                                        TargetControlID="txtDate">
                                                    </asp:CalendarExtender>
                                                </th>

                                                <th>
                                                    <select id="dG3" name="dG3" class="styledselect_form_1">
                                                    </select>
                                                </th>
                                            </tr>
                                        </table>

                                    </td>
                                </tr>

                            </table>

                            <table id="Table1">

                                <tr>
                                    <th id="ThDownload">

                                         <input type="button" class="btnnor ani" onclick="downloadDoctorSheet()" value="Create Sheet Now!" />

                                        <%--<input id="btnDownloadExcel" type="button" class="btnnor ani" onclick="funDownloadExcel();" value="Download Excel of Doctors" />--%>
                                    </th>
                                    <th id="ThUpload">

                                        <input type="button" value="Upload Sheet" class="btnnor ani" onclick="$('#sheetUploader').click()" />
                                        <input type="file" style="display: none" id="sheetUploader"
                                             accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />

                                        <%--<div id="uploadify" style="position: relative;">
                                            <div id="uploadify_button">
                                            </div>
                                        </div>--%>
                                    </th>
                                </tr>
                            </table>

                        </div>
                        <!--  end content-table-inner  -->
                    </td>
                </tr>

            </table>


            <%--<table id="create-table" style="width: 25%; float: right; border-radius: 5px; border-color: lightgray !important; border: double; border-width: 1px; text-align: center">
                <tbody>

                    <tr>
                        <th>Create Blank Sheet For Monthly Doctors
                        </th>
                    </tr>

                    <tr>
                        <th>
                            <input type="button" class="btnnor ani" onclick="downloadDoctorSheet()" value="Create Blank Sheet Now!" />

                        </th>

                    </tr>
                </tbody>
            </table>--%>


        </div>
    </div>
</asp:Content>

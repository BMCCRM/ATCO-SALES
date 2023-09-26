<%@ Page Title="Doctor Upload" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true"
    CodeBehind="NewMRDoctorsExcel.aspx.cs" Inherits="PocketDCR2.Reports.NewMRDoctorsExcel" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/demo_table_jui.css" rel="stylesheet" type="text/css" />
    <link href="../themes/smoothness/jquery-ui-1.8.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.7.2.min.js"></script>
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.dataTables.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
    <script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />
    <script src="NewMRDoctorsExcel.js" type="text/javascript"></script>
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

        .loading
        {
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
        
        .reportcl
        {
            width: 100%;
            height: 1500px;
        }
        .reportcl2
        {
            width: 100%;
            height: 0px;
        }
        
        #uploadify
        {
            background: #FFFFFF;
            border-radius: 5px;
        }
        #uploadify:hover
        {
            background: #FFFFFF;
        }
        #uploadify object
        {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 25px;
        }
    </style>
    <!--[if gt IE 6]>
	 <style type="text/css">
        #content{min-height:320px;margin:0;}
        #dsada{padding:10px 5px;}
        #fdform, #Table1{min-height:100px;}
     
      
    </style>
    <![endif]-->
    <%-- <script type="text/javascript">
        $(function () {
            $('#file_upload').uploadify({
                'swf': '../Scripts/Uploadify/uploadify.swf',
                'uploader': '../Handler/GetExcel.ashx'
                // Put your options here
            });
        });
    </script>--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="pop_box-outer jqmWindow" id="dialog">
        <div class="loading">
        </div>
        <div class="clear">
        </div>
    </div>
    <div id="content" style="margin-top: -14px;">
        <div style="width: 200px; float: right;">
            <div class="clear">
            </div>
        </div>
        <div class="clear">
        </div>
        <div id="divGrid1" class="popup_box">
            <table border="0" width="100%" cellpadding="0" cellspacing="0" id="content-table"
                style="margin-top: 15px;">
                <tr>
                    <th rowspan="3" class="sized">
                        <img src="../images/form/side_shadowleft.jpg" width="20" height="200" alt="" />
                    </th>
                    <th class="topleft">
                    </th>
                    <td id="tbl-border-top">
                        &nbsp;
                    </td>
                    <th class="topright">
                    </th>
                    <th rowspan="3" class="sized">
                        <img src="../Images/Form/side_shadowright.jpg" width="20" height="200" alt="" />
                    </th>
                </tr>
                <tr>
                    <td id="tbl-border-left">
                    </td>
                    <td>
                        <!--  start content-table-inner -->
                        <!-- ddl Report ID  -->
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
                        <div>
                            <select id="ddlreport" name="ddlreport" class="styledselect_form_1" style="display: none;">
                                <option value="-1">Select Report</option>
                                <option value="1">Daily Calls Report</option>
                                <option value="2">Described Products</option>
                                <option value="3">Detailed Products Frequency</option>
                                <option value="4">Detailed Products Frequency By Division</option>
                                <option value="5">Incoming SMS Summary</option>
                                <option value="6">JV By Class</option>
                                <option value="7">KPI By Class</option>
                                <option value="8">Message Count</option>
                                <option value="9">Monthly Visit Analysis</option>
                                <option value="10">MR SMS Accuracy</option>
                                <option value="11">MR Doctors</option>
                                <option value="12">MRs List</option>
                                <option value="13">Sample Issued To Doctor</option>
                                <option value="14">SMS Status</option>
                                <option value="15">Visit By Time</option>
                                <option value="16">Detailed JV Report</option>
                                <option value="17">JV By Region</option>
                                <option value="18">Planning Report</option>
                                <option value="19">Monthly Visit Analysis With Planning</option>
                                <option value="20">KPI by Class With Planning</option>
                                <option value="21">Planning Report For JV</option>
                                <option value="22">Planning Report For BMD</option>
                                <%--<option value="16">Sample Management Report</option>--%>
                            </select>
                            <%-- <input id="btnGreports" type="button" value="button" onclick="btnGreports()" />--%>
                            <button id="dsada" onclick="btnGreports();return false" style="display: none;">
                                Generate Report
                            </button>
                        </div>
                        <div id="content-table-inner">
                            <table border="0" width="100%" cellpadding="0" cellspacing="0" id="fdform1">
                                <tr valign="top">
                                    <td valign="top">
                                        <!-- start id-form -->
                                        <table border="0" cellpadding="10" cellspacing="0" id="id-fo" style="font-weight: bold">
                                           <%-- <tr>
                                                <th valign="top" id="col1">
                                                    <div class="divcol">
                                                        <asp:Label ID="Label1" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                    </div>
                                                </th>
                                                <th valign="top" id="col2">
                                                    <div class="divcol">
                                                        <asp:Label ID="Label2" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                    </div>
                                                </th>
                                                <th valign="top" id="col3">
                                                    <div class="divcol">
                                                        <asp:Label ID="Label3" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                    </div>
                                                </th>
                                                <th valign="top" id="col4">
                                                    <div class="divcol">
                                                        <asp:Label ID="Label4" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                    </div>
                                                </th>
                                                <th valign="top" id="col5">
                                                    <div class="divcol">
                                                    </div>
                                                </th>
                                                <th valign="top" id="col6">
                                                    <div class="divcol">
                                                    </div>
                                                </th>
                                            </tr>--%>
                                            <tr>
                                            <th valign="top" id="col11">
                                           <asp:TextBox ID="txtDate" name="txtDate" runat="server" ClientIDMode="Static" AutoPostBack="false" ReadOnly
                                                    CssClass="inp-form" />
                                                <asp:TextBoxWatermarkExtender ID="wTextDate" runat="server" ClientIDMode="Static"
                                                    TargetControlID="txtDate" WatermarkText="Enter Year - Month" />
                                                <asp:CalendarExtender ID="cTextDate" runat="server" ClientIDMode="Static" OnClientHidden="onCalendarHidden"
                                                    OnClientShown="onCalendarShown" BehaviorID="calendar1" Enabled="True" Format="MMMM-yyyy"
                                                    TargetControlID="txtDate">
                                                </asp:CalendarExtender>
                                                </th>
                                            <%--    <th valign="top" id="col11">
                                                    <select id="ddl1" name="ddl1" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                <th valign="top" id="col22">
                                                    <select id="ddl2" name="ddl2" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                <th valign="top" id="col33">
                                                    <select id="ddl3" name="ddl3" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                <th valign="top" id="col44">
                                                    <select id="ddl4" name="ddl4" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                
                                                <th valign="top" id="col66">
                                                    <select id="ddl6" name="ddl6" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>--%>
                                               
                                                  <th valign="top" id="col22">
                                                       <asp:Label ID="Label3" name="Label1" ClientIDMode="Static" runat="server">Select Zone</asp:Label>
                                        <select id="dG3" name="dG3" class="styledselect_form_1">
     
                                        </select>
                                    </th>
                                            </tr>
                                        </table>
                                        <!-- end id-form  -->
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="../images/form/blank.gif" width="695" height="1" alt="blank" />
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                            </table>
                            <table border="0" cellpadding="10" cellspacing="0" id="fdform">
                                <tr>
                                    <th>
                                        <asp:Label ID="Label5" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label6" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label7" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label8" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                </tr>
                            <%--    <tr>
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
                                    <th valign="top" id="g4">
                                        <select id="dG4" name="dG4" class="styledselect_form_1">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                </tr>--%>
                            </table>
                            <table border="0" cellpadding="10" cellspacing="0" id="Table1">
                                <tr>
                                    <th valign="top" id="Th11" style="display: none;">
                                        Doctor
                                    </th>
                                    <th valign="top" id="Th22" style="display: none;">
                                        SKU
                                    </th>
                                    <th valign="top" id="Th33" style="display: none;">
                                        Visit Time
                                    </th>
                                    <th valign="top" id="Th44" style="display: none;">
                                        Joint Visit
                                    </th>
                                    <th valign="top" id="Th55" style="display: none;">
                                        Starting Date
                                    </th>
                                    <th valign="top" id="Th66" style="display: none;">
                                        Ending Date
                                    </th>
                                </tr>
                                <tr>
                                    <th valign="top" id="Th1" style="display: none;">
                                        <select id="ddlDR" name="ddlDR" class="styledselect_form_1">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="Th2" style="display: none;">
                                        <select id="ddlProduct" name="d2" class="styledselect_form_1">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="Th3" style="display: none;">
                                        <select id="VT" name="VT" class="styledselect_form_1">
                                            <option value="-1">All</option>
                                            <option value="1">M</option>
                                            <option value="2">E</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="Th4" style="display: none;">
                                        <select id="Jv" name="b2" class="styledselect_form_1">
                                            <option value="-1">All</option>
                                            <option value="1">Joint </option>
                                            <option value="2">Un-Joint </option>
                                        </select>
                                    </th>
                                    <th valign="top" id="Th5" style="display: none;">
                                        <input id="stdate" type="text" class="inp-form" runat="server" clientidmode="Static"
                                            readonly="readonly" />
                                    </th>
                                    <th valign="top" id="Th6" style="display: none;">
                                        <input id="enddate" type="text" class="inp-form" runat="server" clientidmode="Static"
                                            readonly="readonly" />
                                    </th>
                                    <th valign="top" id="ThDownload">
                                        <input class="btnnor ani" id="btnDownloadExcel" type="button" onclick="funDownloadExcel();" value="Download Excel of Doctors" />
                                    </th>
                                    <th valign="top" id="ThUpload">
                                           <input type="button" value="Upload Sheet" class="btnnor ani" onclick="$('#sheetUploader').click()" />
                                        <input type="file" style="display: none" id="sheetUploader"
                                             accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                        <%--<button id="ButtonUploadExcel">
                                            Upload Excel for Doctors
                                        </button>--%>
                                         <%--<div id="uploadify" style="position: relative;">
                                            <div id="uploadify_button" type="button">
                                            </div>
                                        </div>--%>
                                    </th>
                                </tr>
                            </table>
                            <div class="clear">
                            </div>
                        </div>
                        <!--  end content-table-inner  -->
                    </td>
                    <td id="tbl-border-right">
                    </td>
                </tr>
                <tr>
                    <th class="sized bottomleft">
                    </th>
                    <td id="tbl-border-bottom">
                        &nbsp;
                    </td>
                    <th class="sized bottomright">
                    </th>
                </tr>
            </table>
        </div>
    </div>
</asp:Content>

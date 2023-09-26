<%@ Page Title="DATA SCREEN" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="newDataScreen.aspx.cs" Inherits="PocketDCR2.Reports.newDataScreen" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../Styles/demo_table_jui.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/jquery.ui.base.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/jquery.ui.theme.css" rel="stylesheet" type="text/css" />

    <%--<link href="../Styles/normalize.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/datepicker_new.css" rel="stylesheet" type="text/css" />
--%>

    <link href="../Styles/demo_table_jui.css" rel="stylesheet" type="text/css" />
    <%-- <link href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css" />--%>
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <%-- <script type="text/javascript" src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>--%>
    <script type="text/javascript" src="../Scripts/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.ui.datepicker.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.ui.widget.js"></script>
    <script src="../Scripts/jquery.dataTables.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="datascreen.js" type="text/javascript"></script>
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
    <style type="text/css">
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
    </style>
    <!--[if gt IE 6]>
	 <style type="text/css">
        #content{min-height:360px;margin:0;}
        #dsada{padding:10px 5px;}
        #fdform, #Table1{min-height:100px;}
    </style>
<![endif]-->
    <!--[if IE 8]>
 <style type="text/css">
        #content{min-height:360px;margin:0;}
        #dsada{padding:10px 5px;}
        #fdform, #Table1{min-height:100px;}
    </style>
<![endif]-->
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
                        <div id="content-table-inner">
                            <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                <tr valign="top">
                                    <td valign="top">
                                        <!-- start id-form -->
                                        <table border="0" cellpadding="10" cellspacing="0" id="id-fo" style="font-weight: bold">
                                            <tr>
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
                                            </tr>
                                            <tr>
                                                <th valign="top" id="col11">
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
                                                <th valign="top" id="col55">
                                                    <select id="ddl5" name="ddl5" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                <th valign="top" id="col66">
                                                    <select id="ddl6" name="ddl6" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>
                                                    Filter By Year - Month :
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <%--<input type="text" id="txtDate" class="inp-form" />--%>
                                                    <asp:TextBox ID="txtDate" ClientIDMode="Static" runat="server"></asp:TextBox>
                                                    <asp:CalendarExtender ID="CalendarExtender1" TargetControlID="txtDate" runat="server">
                                                    </asp:CalendarExtender>
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
    <h1>
        Success Messages
    </h1>
    <div id="SuccessSMS">
    </div>
    <h1>
        Error Messages
    </h1>
    <div id="checking">
    </div>
</asp:Content>

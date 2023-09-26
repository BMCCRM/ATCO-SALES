<%@ Page Title="Hierarchy Setup" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="DivisionalHierarchy.aspx.cs" Inherits="PocketDCR2.Form.DivisionalHierarchy" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
     <style type="text/css">
        .overlay {
            position: fixed;
            display: none;
            width: 100%;
            height: 100%;
            top: 131px;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255,255,255, 0.9);
            z-index: 2;
        }

        .centered {
            width: 77px;
            text-align: center;
            /*font-family: arial;*/
            font-size: 14px;
            font-weight: 600;
            color: #4fa8e2;
        }
        .loading {
            background: #000 url('../Images/loading_bar.gif') no-repeat 20px 18px;
            width: 254px;
            height: 80px;
            position: absolute;
            top: 43%;
            left: 50%;
            margin: -7px 0 0 -125px;
            z-index: 222;
            display: block;
        }

        .loding_box_outer {
            width: 100%;
            height: 100%;
            position: relative;
            left: 0px;
            top: 0px;
            z-index: 111;
            background: #e1e1e1;
            opacity: 0.6;
            display: none;
        }
        .Please{

            color: white;
            margin-left:90px;
            margin-top:50px;
        }


   
    </style>
    <script src="DivisionalHierarchyJs.js" type="text/javascript"></script>
</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional">
            <Triggers>
            </Triggers>
            <ContentTemplate>
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/Hierarchy.png" />
                        Hierarchy Setup</h1>
                    <asp:HiddenField ID="hdnHierarchyLevel" runat="server" Value="Select" ClientIDMode="Static" />
                    <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
                </div>
                <table border="0" width="100%" cellpadding="0" cellspacing="0" id="content-table">
                    <tr>
                        <th rowspan="3" class="sized">
                            <img src="../images/form/side_shadowleft.jpg" width="20" height="100" alt="" />
                        </th>
                        <th class="topleft"></th>
                        <td id="tbl-border-top">&nbsp;
                        </td>
                        <th class="topright"></th>
                        <th rowspan="3" class="sized">
                            <img src="../Images/Form/side_shadowright.jpg" width="20" height="100" alt="" />
                        </th>
                    </tr>
                    <tr>
                        <td id="tbl-border-left"></td>
                        <td>
                            <!--  start content-table-inner -->
                            <div id="content-table-inner">
                                <table border="0" width="50%" cellpadding="0" cellspacing="0">
                                    <tr valign="top">
                                        <td>
                                            <!-- start id-form -->
                                            <table border="0" cellpadding="0" cellspacing="0" id="id-form">
                                                <tr>
                                                    <th valign="middle">Filter By Hierarchy : &nbsp;
                                                    </th>
                                                    <td>
                                                        <select id="ddlHierarchyLevel" name="ddlHierarchyLevel" class="styledselect_form_1">
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>&nbsp;&nbsp;
                                                        <asp:Label ID="lbl1" runat="server" ClientIDMode="Static" Text="Director : "
                                                            Font-Bold="true" />
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        <select id="ddl1" name="ddl1" class="styledselect_form_1">
                                                            <option value="-1">Select...</option>
                                                        </select>
                                                    </td>
                                                    <td>&nbsp;&nbsp;
                                                        <asp:Label ID="Label2" runat="server" ClientIDMode="Static" Text="GM Level: "
                                                            Font-Bold="true" />
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        <select id="ddl2" name="ddl2" class="styledselect_form_1">
                                                            <option value="-1">Select...</option>
                                                        </select>
                                                    </td>
                                                    <td>&nbsp;&nbsp;
                                                        <asp:Label ID="Label3" runat="server" ClientIDMode="Static" Text="BUH Level : "
                                                            Font-Bold="true" />
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        <select id="ddl3" name="ddl3" class="styledselect_form_1">
                                                            <option value="-1">Select...</option>
                                                        </select>
                                                    </td>
                                                    <td>&nbsp;&nbsp;
                                                        <asp:Label ID="lbl4" runat="server" ClientIDMode="Static" Text="SM Level : "
                                                            Font-Bold="true" />
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        <select id="ddl4" name="ddl4" class="styledselect_form_1">
                                                            <option value="-1">Select...</option>
                                                        </select>
                                                    </td>
                                                    <td>&nbsp;&nbsp;
                                                        <asp:Label ID="lbl5" runat="server" ClientIDMode="Static" Text="DSM Level : " Font-Bold="true" />
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        <select id="ddl5" name="ddl5" class="styledselect_form_1">
                                                            <option value="-1">Select...</option>
                                                        </select>
                                                    </td>
                                                    <td>&nbsp;&nbsp;
                                                        <asp:Label ID="lbl6" runat="server" ClientIDMode="Static" Text="Territory Level : "
                                                            Font-Bold="true" />
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        <select id="ddl6" name="ddl6" class="styledselect_form_1">
                                                            <option value="-1">Select...</option>
                                                        </select>
                                                    </td>
                                                    <%--<td>
                                                        <select id="ddl5" name="ddl5" class="styledselect_form_1">
                                                            <option value="-1">Select...</option>
                                                        </select>
                                                    </td>--%>
                                                </tr>
                                            </table>
                                            <!-- end id-form  -->
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <div id="divTable" style="float: left; width: 98%; padding-top: 10px;">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src="../images/form/blank.gif" width="695" height="1" alt="blank" />
                                        </td>
                                        <td></td>
                                    </tr>
                                </table>
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
                </table>
                <div class="loding_box_outer">
                    <div class="loading" id="loading">
                        
                            <p class="Please">Please Wait </p>
                     
                    </div>
                    <div class="clear">
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
                                <div class="divColumn">
                                    <div>
                                        &nbsp;&nbsp;&nbsp;
                                    </div>
                                    <div>
                                        &nbsp;&nbsp;&nbsp;
                                    </div>
                                </div>
                                <div class="divColumn">
                                    <div>
                                    </div>
                                    <div>
                                        <input id="btnYes" type="button" value="Yes" />
                                    </div>
                                </div>
                                <div class="divColumn">
                                    <div>
                                    </div>
                                    <div>
                                        <input id="btnNo" type="button" value="No" />
                                    </div>
                                </div>
                                <div class="divColumn">
                                    <div>
                                        &nbsp;&nbsp;&nbsp;
                                    </div>
                                    <div>
                                        &nbsp;&nbsp;&nbsp;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="divGrid" class="popup_box">
                    <%--class="jqmWindow popup_box"--%>
                    <table border="0" width="100%" cellpadding="0" cellspacing="0" id="content-table">
                        <tr>
                            <th rowspan="3" class="sized">
                                <img src="../images/form/side_shadowleft.jpg" width="20" height="250" alt="" />
                            </th>
                            <th class="topleft"></th>
                            <td id="tbl-border-top">&nbsp;
                            </td>
                            <th class="topright"></th>
                            <th rowspan="3" class="sized">
                                <img src="../Images/Form/side_shadowright.jpg" width="20" height="250" alt="" />
                            </th>
                        </tr>
                        <tr>
                            <td id="tbl-border-left"></td>
                            <td>
                                <!--  start content-table-inner -->
                                <div id="content-table-inner">
                                    <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                        <tr valign="top">
                                            <td>
                                                <!-- start id-form -->
                                                <table border="0" cellpadding="0" cellspacing="0" id="id-form">
                                                    <tr>
                                                        <th valign="top">Select Hierarchy For Shifting :
                                                        </th>
                                                        <td>
                                                            <select id="ddlShiftHierarchy" name="ddl6" class="styledselect_form_1">
                                                            </select>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <th valign="top">Level Name :
                                                        </th>
                                                        <td>
                                                            <input id="txtLevelName" name="txtLevelName" type="text" maxlength="100" class="inp-form" />
                                                            <span class="red">* </span>
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <th valign="top">Level Description :
                                                        </th>
                                                        <td>
                                                            <input id="txtLevelDescription" name="txtLevelDescription" type="text" maxlength="200"
                                                                class="inp-form" />
                                                            <span class="red">* </span>
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <th valign="top">Status :
                                                        </th>
                                                        <td>
                                                            <input id="chkActive" name="chkActive" type="checkbox" value="Active" checked="checked" />
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <th>&nbsp;
                                                        </th>
                                                        <td valign="top">
                                                            <input id="btnSave" name="btnSave" type="button" class="form-submit" />
                                                            <input id="btnCancel" name="btnCancel" type="button" class="form-reset" />
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                </table>
                                                <!-- end id-form  -->
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src="../images/form/blank.gif" width="695" height="1" alt="blank" />
                                            </td>
                                            <td></td>
                                        </tr>
                                    </table>
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
                    </table>
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</asp:Content>



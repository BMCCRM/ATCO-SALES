<%@ Page Title="Page Configuration" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true"
    CodeBehind="ModulePages.aspx.cs" Inherits="PocketDCR2.Form.PageConfiguration" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="obout_Grid_NET" Namespace="Obout.Grid" TagPrefix="obout" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="ModulePages.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
            </Triggers>
            <ContentTemplate>
                <div class="page_heading">
                    <h1>
                        <%--<img alt="" src="../Images/Icon/Product.png" />--%>
                       Page Configuration</h1>
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
                                        <input id="btnYes" name="btnYes" type="button" value="Yes" /></div>
                                </div>
                                <div class="divColumn">
                                    <div>
                                        <input id="btnNo" name="btnNo" type="button" value="No" /></div>
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
                                <br /><br />
                                <input id="btnOk" name="btnOk" type="button" value="OK" /></div>
                        </div>
                    </div>
                </div>

                <div>
                    <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label>
                </div>
                <div class="wrapper-inner">
                    <div style="float: left;">
                        <div class="ghierarchy2">
                            <div class="inner-head">
                                <h2>
                                    <span class="spacer">&nbsp;</span>View All</h2>
                            </div>
                            <div class="inner-left">
                                <obout:Grid ID="Grid1" runat="server" Serialize="false" AutoGenerateColumns="false"
                                    DataSourceID="SqlDataSource1" AllowFiltering="true" AllowSorting="true" AllowPaging="true"
                                    AllowAddingRecords="false" FolderStyle="../Styles/GridCss" AllowPageSizeSelection="false">
                                    <Columns>
                                        <obout:Column Width="100" DataField="ID" HeaderText="ID" SortExpression="ID"
                                            Visible="false" />
                                        <obout:Column Width="200" DataField="ModuleName" HeaderText="Module Name" SortExpression="ModuleName" />
                                        <obout:Column Width="200" DataField="PageName" HeaderText="Page Name" SortExpression="PageName"/>
                                        <obout:Column Width="300" DataField="PagePath" HeaderText="Page Path" SortExpression="PagePath"/>
                                        <obout:Column Width="200" DataField="Prefix" HeaderText="Prefix" SortExpression="Prefix"/>
                                        <obout:Column Width="100" DataField="IsActive" HeaderText="Status" SortExpression="IsActive"/>
                                        <obout:Column Width="80" AllowEdit="true" />
                                        <obout:Column Width="80" AllowDelete="true" />
                                    </Columns>
                                    <ClientSideEvents OnBeforeClientEdit="oGrid_Edit" OnBeforeClientDelete="oGrid_Delete" />
                                    <GroupingSettings AllowChanges="false" />
                                </obout:Grid>
                                <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                    SelectCommand="SELECT MP.ID, MM.ModuleName, MP.PageName ,MP.PagePath,MP.Prefix,CASE WHEN MP.Flag = 1 THEN 'Active' ELSE 'Deactive' END AS IsActive FROM tbl_ModulePages  MP inner join tbl_ModulesMaster MM on MP.Fk_ModuleID=MM.ID">
                                </asp:SqlDataSource>
                            </div>
                        </div>
                        <div class="clear">
                        </div>
                    </div>
                    <div class="wrapper-inner-right">
                        <div class="designation">
                            <div class="inner-head">
                                <h2>
                                    <span class="spacer">&nbsp;</span>Add New Configuration</h2>
                            </div>
                            <div class="designation-inner">
                                <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                    <tr valign="top">
                                        <td>
                                            <!-- start id-form -->
                                            <table border="0" cellpadding="0" cellspacing="0" id="id-form">

                                                

                                              

                                                <tr>
                                                    <th valign="top">
                                                        Module Mass :
                                                    </th>
                                                    <td><asp:DropDownList ID="ddModuleMass" name="ddModuleMass" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1" DataSourceID="dsModuleMass" DataTextField="ModuleName" DataValueField="ModuleMassId"></asp:DropDownList>
                                                        <asp:SqlDataSource runat="server" ID="dsModuleMass" ConnectionString='<%$ ConnectionStrings:PocketDCRConnectionString %>' 
                                                            SelectCommand="Select -1 ModuleMassId,'Select A Module Mass' ModuleName UNION ALL select ID ModuleMassId,ModuleName ModuleName from tbl_ModulesMaster where Flag=1" ></asp:SqlDataSource>
                                                      
                                                      <%--  <span class="red">* </span>--%>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                  <tr>
                                                    <th valign="top">
                                                        Page Name :
                                                    </th>
                                                    <td>
                                                        <input id="txtPageNumber" name="txtPageNumber" maxlength="50" class="inp-form" />
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                        Prefix :
                                                    </th>
                                                    <td>
                                                        <input id="txtPrefix" name="txtPrefix" maxlength="50" class="inp-form" />
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                        Page Path :
                                                    </th>
                                                    <td>
                                                        <input id="txtPagePath" name="txtPagePath" maxlength="225" class="inp-form" />
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                        Status :
                                                    </th>
                                                    <td align="left">
                                                        <input id="chkActive" name="chkActive" type="checkbox" checked="checked" />
                                                    </td>
                                                    <td>
                                                    </td>
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
                                <div class="designation-bg-right">
                                </div>
                                <div class="designation-bg-left">
                                </div>
                                <div class="inner-bottom">
                                    <input id="btnCancel" name="btnCancel" type="button" class="form-reset" />
                                    &nbsp; &nbsp;
                                    <input id="btnSave" name="btnSave" type="button" class="form-submit" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clear">
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</asp:Content>

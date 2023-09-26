<%@ Page Title="Employee Designations" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="EmployeeDesignation.aspx.cs" Inherits="PocketDCR2.Form.EmployeeDesignation" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="obout_Grid_NET" Namespace="Obout.Grid" TagPrefix="obout" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="EmployeeDesignationJs.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional">
            <Triggers>
                <asp:AsyncPostBackTrigger ControlID="ddlHierarchy" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddlFilterHierarchy" EventName="SelectedIndexChanged" />
            </Triggers>
            <ContentTemplate>
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/1330776545_product-sales-report.png" />
                        Employee Designations</h1>
                </div>
                <div>
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
                                <br />
                                <br />
                                <input id="btnOk" name="btnOk" type="button" value="OK" /></div>
                        </div>
                    </div>
                </div>
                <div>
                    <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label>
                </div>
                <div style="padding-left: 20px; float: left;">
                </div>
                <div class="divgrid">
                </div>
                <div class="wrapper-inner">
                    <div class="wrapper-inner-left">
                        <div class="ghierarchy2">
                            <div class="inner-head">
                                <h2>
                                    <span class="spacer">&nbsp;</span>View All</h2>
                            </div>
                            <div class="inner-left">
                                <table>
                                    <tr>
                                        <th valign="middle">
                                            Filter By :
                                        </th>
                                        <td style="padding-left: 80px;">
                                            <asp:DropDownList ID="ddlFilterHierarchy" runat="server" ClientIDMode="Static" AppendDataBoundItems="true"
                                                CssClass="styledselect_form_1" DataValueField="SettingName" DataTextField="SettingValue"
                                                AutoPostBack="true" DataSourceID="SqlDataSource2" OnSelectedIndexChanged="ddlFilterHierarchy_SelectedIndexChanged">
                                                <asp:ListItem Value="-1" Selected="True">Show ALL</asp:ListItem>
                                            </asp:DropDownList>
                                        </td>
                                    </tr>
                                </table>
                                <obout:Grid ID="Grid1" runat="server" Serialize="true" AutoGenerateColumns="false"
                                    AllowSorting="true" AllowPaging="true" AllowAddingRecords="false" FolderStyle="../Styles/GridCss"
                                    OnRowDataBound="Grid1_RowDataBound" AllowPageSizeSelection="false">
                                    <Columns>
                                        <obout:Column Width="100" DataField="DesignationId" HeaderText="DesignationId" SortExpression="DesignationId"
                                            Visible="false" />
                                        <obout:Column Width="150" DataField="DesignationName" HeaderText="Designation" SortExpression="DesignationName" />
                                        <obout:Column Width="100" DataField="DesignationDescription" HeaderText="Description"
                                            SortExpression="DesignationDescription" />
                                        <obout:Column ID="colEdit" runat="server" Width="75">
                                            <TemplateSettings TemplateId="EditedTemplate" />
                                        </obout:Column>
                                        <obout:Column Width="100" AllowDelete="true" />
                                    </Columns>
                                    <ClientSideEvents OnBeforeClientEdit="oGrid_Edit" OnBeforeClientDelete="oGrid_Delete" />
                                    <GroupingSettings AllowChanges="false" />
                                    <Templates>
                                        <obout:GridTemplate ID="EditedTemplate" runat="server" ControlID="" ControlPropertyName="">
                                            <Template>
                                                <asp:LinkButton ID="LinkButton1" runat="server" class="ob_gAL"> Edit</asp:LinkButton>
                                            </Template>
                                        </obout:GridTemplate>
                                    </Templates>
                                </obout:Grid>
                            </div>
                        </div>
                        <div class="clear">
                        </div>
                    </div>
                    <div class="wrapper-inner-right">
                        <div class="designation">
                            <div class="inner-head">
                                <h2>
                                    <span class="spacer">&nbsp;</span>Add New Designation</h2>
                            </div>
                            <div class="designation-inner">
                                <table border="0" cellpadding="0" cellspacing="0" id="id-form">
                                    <tr>
                                        <th valign="top">
                                            Hierarchy :
                                        </th>
                                        <td>
                                            <asp:DropDownList ID="ddlHierarchy" runat="server" ClientIDMode="Static" AppendDataBoundItems="true"
                                                CssClass="styledselect_form_1" DataValueField="SettingName" DataTextField="SettingValue"
                                                DataSourceID="SqlDataSource2">
                                                <asp:ListItem Value="-1" Selected="True">Select Hierarchy</asp:ListItem>
                                            </asp:DropDownList>
                                            <asp:SqlDataSource ID="SqlDataSource2" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                                SelectCommand="SELECT [SettingId], [SettingName], [SettingValue] FROM AppConfiguration WHERE settingType = 'Hierarchy' AND isActive = 1 ORDER BY [SettingId]">
                                            </asp:SqlDataSource>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th valign="top">
                                            Designation :
                                        </th>
                                        <td>
                                            <input id="txtName" name="txtName" maxlength="100" class="inp-form" />
                                            <span class="red">* </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th valign="top">
                                            Description :
                                        </th>
                                        <td>
                                            <input id="txtDescription" name="txtDescription" maxlength="200" class="inp-form" />
                                            <span class="red">* </span>
                                        </td>
                                    </tr>
                                </table>
                                <div class="designation-bg-right">
                                </div>
                                <div class="designation-bg-left">
                                </div>
                                <div class="inner-bottom">
                                    <input id="btnCancel" name="btnCancel" type="button" class="form-reset" />
                                    &nbsp;&nbsp;
                                    <input id="btnSave" name="btnSave" type="button" class="form-submit" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</asp:Content>

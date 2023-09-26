<%@ Page Title="Application Setup" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="AppConfiguration.aspx.cs" Inherits="PocketDCR2.Form.AppConfiguration1" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="AppConfigurationJs.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
            </Triggers>
            <ContentTemplate>
                <asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static" OnClick="btnRefresh_Click"
                    Style="display: none;" />
                <asp:HiddenField ID="ShowErrorAlert" runat="server" ClientIDMode="Static" />
                <asp:HiddenField ID="HideErrorAlert" runat="server" ClientIDMode="Static" />
                <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/data-window.png" />
                        Application Setup</h1>
                </div>
                <div class="wrapper-inner">
                    <div class="wrapper-inner-left">
                        <div class="ghierarchy">
                            <div class="inner-head">
                                View All
                            </div>
                            <div class="inner-left">
                                <asp:GridView ID="GridView1" runat="server" AllowPaging="True" AllowSorting="True"
                                    AutoGenerateColumns="False" CellPadding="2" CellSpacing="2" DataKeyNames="SettingId"
                                    DataSourceID="SqlDataSource1" GridLines="None" OnRowCreated="GridView1_RowCreated"
                                    OnRowDataBound="GridView1_RowDataBound" CssClass="mGrid">
                                    <AlternatingRowStyle CssClass="mGridatt" />
                                    <Columns>
                                        <asp:BoundField DataField="SettingId" HeaderText="SettingId" InsertVisible="False"
                                            ReadOnly="True" SortExpression="SettingId" />
                                        <asp:BoundField DataField="SettingName" HeaderText="Setting Name" SortExpression="SettingName" />
                                        <asp:BoundField DataField="SettingValue" HeaderText="Geographical Hierarchy" SortExpression="Geographical Hierarchy" />
                                        <asp:CheckBoxField DataField="isActive" HeaderText="Active" SortExpression="isActive">
                                            <ItemStyle HorizontalAlign="Center" VerticalAlign="Middle" />
                                        </asp:CheckBoxField>
                                        <asp:TemplateField>
                                            <ItemTemplate>
                                                <asp:LinkButton ID="lnkEdit" runat="server" CausesValidation="false" CommandName="GridEdit"
                                                    ClientIDMode="Static">Edit</asp:LinkButton>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                    </Columns>
                                    <HeaderStyle Font-Bold="True" />
                                    <PagerStyle BackColor="#616262" ForeColor="#fff" HorizontalAlign="Center" />
                                    <SortedAscendingCellStyle BackColor="#FAFAE7" />
                                    <SortedAscendingHeaderStyle BackColor="#DAC09E" />
                                    <SortedDescendingCellStyle BackColor="#E1DB9C" />
                                    <SortedDescendingHeaderStyle BackColor="#C2A47B" />
                                </asp:GridView>
                                <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                    SelectCommand="SELECT [SettingId], [SettingName], [SettingValue], [isActive] FROM [AppConfiguration] ORDER BY [SettingName]">
                                </asp:SqlDataSource>
                            </div>
                        </div>
                        <div class="clear">
                        </div>
                    </div>
                    <div class="designation">
                        <div class="inner-head">
                            <h2>
                                Update Application Setup</h2>
                        </div>
                        <div class="designation-inner">
                            <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                <tr valign="top">
                                    <td>
                                        <!-- start id-form -->
                                        <table border="0" cellpadding="0" cellspacing="0" id="id-form">
                                            <tr>
                                                <td colspan="2">
                                                    <asp:ModalPopupExtender ID="mpError" runat="server" CancelControlID="HideErrorAlert"
                                                        ClientIDMode="Static" TargetControlID="ShowErrorAlert" BackgroundCssClass="popupBackground"
                                                        PopupControlID="pnlShowErrorAlert" />
                                                    <asp:Panel ID="pnlShowErrorAlert" runat="server" Style="display: none;" ClientIDMode="Static">
                                                        <div class="title">
                                                            Error Window
                                                        </div>
                                                        <div class="popupWindow">
                                                            <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label><br />
                                                            <br />
                                                            <asp:Button ID="btnClose" runat="server" Text="Close" CausesValidation="false" OnClick="btnClose_Click"
                                                                ClientIDMode="Static" />
                                                        </div>
                                                    </asp:Panel>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th valign="top">
                                                    Hierarchy Name :
                                                </th>
                                                <td>
                                                    <input id="txtValue" name="txtValue" maxlength="250" class="inp-form" />
                                                    <span class="red">* </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th valign="top">
                                                    Active :
                                                </th>
                                                <td>
                                                    <input id="chkActive" name="chkActive" type="checkbox" checked="checked" />
                                                </td>
                                            </tr>
                                        </table>
                                        <!-- end id-form  -->
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
                                <input id="btnSave" name="btnSave" type="button" class="form-submit" />
                                <input id="btnCancel" name="btnCancel" type="button" class="form-reset" />
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

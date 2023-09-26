<%@ Page Title="Product Samples" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="PromoItems.aspx.cs" Inherits="PocketDCR2.Form.PromoItems" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="PromoItemsJs.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
            </Triggers>
            <ContentTemplate>
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/Product Form.png" />
                        Product Samples
                    </h1>
                    <asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static" OnClick="btnRefresh_Click"
                        Style="display: none;" />
                    <asp:HiddenField ID="ShowErrorAlert" runat="server" ClientIDMode="Static" />
                    <asp:HiddenField ID="HideErrorAlert" runat="server" ClientIDMode="Static" />
                    <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
                </div>
                <div class="divgrid">
                    <asp:GridView ID="GridView1" runat="server" AllowPaging="True" AllowSorting="True"
                        AutoGenerateColumns="False" CellPadding="2" DataKeyNames="PromoId" DataSourceID="SqlDataSource1"
                        GridLines="None" OnRowCreated="GridView1_RowCreated" OnRowDataBound="GridView1_RowDataBound"
                        CssClass="mGrid">
                        <AlternatingRowStyle CssClass="mGridatt" />
                        <Columns>
                            <asp:BoundField DataField="PromoId" HeaderText="PromoId" InsertVisible="False" ReadOnly="True"
                                SortExpression="PromoId" />
                            <asp:BoundField DataField="PromoCode" HeaderText="Code" SortExpression="PromoCode" />
                            <asp:BoundField DataField="PromoName" HeaderText="Sample" SortExpression="PromoName" />
                            <asp:BoundField DataField="CreationDate" HeaderText="Creation Date" SortExpression="CreationDate" />
                            <asp:BoundField DataField="LastUpdate" HeaderText="Last Update" SortExpression="LastUpdate" />
                            <asp:CheckBoxField DataField="IsActive" HeaderText="IsActive" SortExpression="IsActive" />
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
                        SelectCommand="SELECT [PromoId], [PromoCode], [PromoName], [CreationDate], [LastUpdate], [IsActive] FROM [PromoItems] ORDER BY [PromoCode]">
                    </asp:SqlDataSource>
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
                                        <input id="btnYes" name="btnYes" type="button" value="Yes" />
                                        <input id="btnNo" name="btnNo" type="button" value="No" /></div>
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
                            <th class="topleft">
                            </th>
                            <td id="tbl-border-top">
                                &nbsp;
                            </td>
                            <th class="topright">
                            </th>
                            <th rowspan="3" class="sized">
                                <img src="../Images/Form/side_shadowright.jpg" width="20" height="250" alt="" />
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
                                            <td>
                                                <!-- start id-form -->
                                                <table border="0" cellpadding="0" cellspacing="0" id="id-form">
                                                    <tr>
                                                        <td colspan="3">
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
                                                                    <asp:Button ID="btnClose" runat="server" Text="Close" CausesValidation="false" ClientIDMode="Static" />
                                                                </div>
                                                            </asp:Panel>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th valign="top">
                                                            Code :
                                                        </th>
                                                        <td>
                                                            <input id="txtCode" name="txtCode" maxlength="20" class="inp-form-error" />
                                                        </td>
                                                        <td>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th valign="top">
                                                            Name :
                                                        </th>
                                                        <td>
                                                            <input id="txtName" name="txtName" maxlength="100" class="inp-form-error" />
                                                        </td>
                                                        <td>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th valign="top">
                                                            Active :
                                                        </th>
                                                        <td>
                                                            <input id="chkActive" name="chkActive" type="checkbox" checked="checked" />
                                                        </td>
                                                        <td>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            &nbsp;
                                                        </th>
                                                        <td valign="top">
                                                            <input id="btnSave" name="btnSave" type="button" class="form-submit" />
                                                            <input id="btnCancel" name="btnCancel" type="button" class="form-reset" />
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
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</asp:Content>

<%@ Page Title="SKU" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true"
    CodeBehind="ProductSku.aspx.cs" Inherits="PocketDCR2.Form.ProductSku" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="obout_Grid_NET" Namespace="Obout.Grid" TagPrefix="obout" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="ProductSkuJs.js" type="text/javascript"></script>
     <style type="text/css">
        .divgrid
        {
            width: 800px;
            overflow: scroll;
        } 
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
                <%--<asp:AsyncPostBackTrigger ControlID="cboTeam" />--%>
            </Triggers>
            <ContentTemplate>
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/Product.png" />
                        SKU</h1>
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
                <div>
                    <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label>
                </div>
                <div class="divgrid" style="width:99% !important;overflow: scroll">
                    <obout:Grid ID="Grid1" runat="server" Serialize="false" AutoGenerateColumns="false"
                        DataSourceID="SqlDataSource1" AllowFiltering="true" AllowSorting="true" AllowPaging="true"
                        AllowAddingRecords="false" FolderStyle="../Styles/GridCss" AllowPageSizeSelection="false">
                        <Columns>
                            <obout:Column Width="100" DataField="SkuId" HeaderText="SkuId" SortExpression="SkuId"
                                Visible="false" />
                            <obout:Column Width="100" DataField="SKU_Code" HeaderText="SKU Code" SortExpression="SKU_Code" />
                            <obout:Column Width="250" DataField="SKU" HeaderText="SKU" SortExpression="SKU" />
                            <obout:Column Width="150" DataField="Product" HeaderText="Brand" SortExpression="Product" />
                            <obout:Column Width="100" DataField="Form" HeaderText="Form" SortExpression="Form" />
                            <obout:Column Width="100" DataField="Strength" HeaderText="Strength" SortExpression="Strength" />
                            <obout:Column Width="120" DataField="Package_Size" HeaderText="Package Size" SortExpression="Package_Size" />
                            <obout:Column Width="100" DataField="Status" HeaderText="Status" SortExpression="Status" />
                            <obout:Column Width="100" AllowEdit="true" />
                            <obout:Column Width="100" AllowDelete="true" />
                        </Columns>
                        <ClientSideEvents OnBeforeClientEdit="oGrid_Edit" OnBeforeClientDelete="oGrid_Delete" />
                        <GroupingSettings AllowChanges="false" />
                    </obout:Grid>
                    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                        SelectCommand="sp_ProductSKUViewSelect" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
                </div>
                <div class="outerBox">
                    <div class="box-shadow-left">
                        <img alt="" src="../Images/Form/side_shadowleft.jpg">
                    </div>
                    <div class="box-shadow-right">
                        <img alt="" src="../Images/Form/side_shadowright.jpg">
                    </div>
                    <div align="center" id="box">
                        <div class="innerBox">
                            <div id="Div1" class="wrapper-inner">
                                <div class="wrapper-inner-left">
                                    <div class="ghierarchy">
                                        <div class="inner-head">
                                            <h2>Add New SKU</h2>
                                        </div>
                                        <div class="inner-left">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" id="id-form">
                                                <tbody>
                                                    <tr valign="top">
                                                        <td>
                                                            <!-- start id-form -->
                                                            <table border="0" cellspacing="0" cellpadding="0" id="Table1">
                                                                <tbody>
                                                                    <%--                                                                    <tr>
                                                                        <th valign="top">
                                                                            Team:
                                                                            <asp:DropDownList ID="cboTeam" runat="server" DataSourceID="sdsTeam" AppendDataBoundItems="true" AutoPostBack="true"
                                                                                DataTextField="TeamName" ClientIDMode="Static" DataValueField="TeamId"
                                                                                CssClass="styledselect_form_1">
                                                                                <asp:ListItem Value="-1" Selected="True">Select Team</asp:ListItem>
                                                                            </asp:DropDownList>
                                                                            <asp:SqlDataSource ID="sdsTeam" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                                                                SelectCommand="SELECT PK_TSID TeamId, TeamMastertName TeamName FROM [tbl_TeamMaster] WHERE [IsActive] = 1 ORDER BY [TeamMastertName]">
                                                                            </asp:SqlDataSource>
                                                                        </th>
                                                                    </tr>    --%>
                                                                    <tr>
                                                                        <th valign="top">Team Name:
                                                                             <select id="cboTeam" name="dG2" class="styledselect_form_1" onchange="FillProductOnTeamChange($(this).val())">
                                                                                 <option value="-1">Select Team...</option>
                                                                                 <span class="red" style="height: 501px;">* </span>
                                                                        </th>
                                                                    </tr>
                                                                    <%--                                                                    <tr>
                                                                        <th valign="top">
                                                                            Brand:
                                                                            <asp:DropDownList ID="cboProduct" runat="server" DataSourceID="sdsProduct" AppendDataBoundItems="false"
                                                                                DataTextField="ProductName" ClientIDMode="Static" DataValueField="ProductId"
                                                                                CssClass="styledselect_form_1" OnSelectedIndexChanged="cboProduct_SelectedIndexChanged">
                                                                                <asp:ListItem Value="-1" Selected="True">Select Brand</asp:ListItem>
                                                                            </asp:DropDownList>
                                                                            <asp:SqlDataSource ID="sdsProduct" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                                                                SelectCommand="SELECT Products.ProductId, Products.ProductName FROM Products INNER JOIN tbl_TeamwithProductrelation AS twpr ON twpr.FK_Productid = Products.ProductId WHERE (Products.IsActive = 1) AND (twpr.FK_TSID = @TeamID)">
                                                                                <SelectParameters>
                                                                                    <asp:ControlParameter ControlID="cboTeam" PropertyName="SelectedValue" DefaultValue="0" Name="TeamID"></asp:ControlParameter>
                                                                                </SelectParameters>
                                                                            </asp:SqlDataSource>
                                                                        </th>
                                                                    </tr>--%>
                                                                    <tr>
                                                                        <th valign="top">Brand:
                                                                            <select id="cboProduct" name="cboProduct" class="styledselect_form_1">
                                                                                <option value="-1">Select Brand...</option>
                                                                                <span class="red" style="height: 501px;">* </span>
                                                                        </th>

                                                                    </tr>

                                                                    <tr>
                                                                        <th valign="top">Package Size:
                                                                            <asp:DropDownList ID="cboPacketSize" runat="server" DataSourceID="sdsPacketSize"
                                                                                AppendDataBoundItems="true" ClientIDMode="Static" DataTextField="SizeName" DataValueField="PackSizeid"
                                                                                CssClass="styledselect_form_1">
                                                                                <asp:ListItem Value="-1" Selected="True">Package Size</asp:ListItem>
                                                                            </asp:DropDownList>
                                                                            <asp:SqlDataSource ID="sdsPacketSize" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                                                                SelectCommand="SELECT [PackSizeid], [SizeName] FROM [PackSize] WHERE [IsActive] = 1 ORDER BY [SizeName]"></asp:SqlDataSource>
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th valign="top">SKU Code:
                                                                            <input id="txtCode" name="txtCode" type="text" maxlength="20" class="inp-form" />
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th valign="top">Trade Price:
                                                                            <input id="txtTradePrice" name="txtTradePrice" type="text" maxlength="23" class="inp-form" />
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th valign="top">Status:<br />
                                                                            <input id="chkActive" name="chkActive" type="checkbox" />
                                                                        </th>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <!-- end id-form  -->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="inner-right">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" id="id-form">
                                                <tbody>
                                                    <tr valign="top">
                                                        <td>
                                                            <!-- start id-form -->
                                                            <table border="0" cellspacing="0" cellpadding="0" id="Table2">
                                                                <tbody>
                                                                    <tr>
                                                                        <th valign="top">Form:
                                                                            <asp:DropDownList ID="cboForm" runat="server" DataSourceID="sdsForm" AppendDataBoundItems="true"
                                                                                DataTextField="FormName" ClientIDMode="Static" DataValueField="FormId" CssClass="styledselect_form_1">
                                                                                <asp:ListItem Value="-1" Selected="True">Select Form</asp:ListItem>
                                                                            </asp:DropDownList>
                                                                            <asp:SqlDataSource ID="sdsForm" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                                                                SelectCommand="SELECT [FormId], [FormCode], [FormName] FROM [Forms] ORDER BY [FormName]"></asp:SqlDataSource>
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th valign="top">Strenght:
                                                                            <asp:DropDownList ID="cboStrength" runat="server" DataSourceID="sdsStrength" AppendDataBoundItems="true"
                                                                                DataTextField="StrengthName" ClientIDMode="Static" DataValueField="StrengthId"
                                                                                CssClass="styledselect_form_1">
                                                                                <asp:ListItem Value="-1" Selected="True">Select Strength</asp:ListItem>
                                                                            </asp:DropDownList>
                                                                            <asp:SqlDataSource ID="sdsStrength" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                                                                SelectCommand="SELECT [StrengthId], [StrengthCode], [StrengthName] FROM [Strength] WHERE [IsActive] = 1 ORDER BY [StrengthName]"></asp:SqlDataSource>
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th valign="top">SKU Name:
                                                                            <input id="txtName" name="txtName" type="text" maxlength="100" class="inp-form" />
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th valign="top">Distributer Price:
                                                                            <input id="txtDistributorPrice" name="txtDistributorPrice" type="text" maxlength="23"
                                                                                class="inp-form" />
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th valign="top">Retail Price:
                                                                            <input id="txtRetailPrice" name="txtRetailPrice" type="text" maxlength="23" class="inp-form" />
                                                                        </th>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <!-- end id-form  -->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="clear"></div>
                                    <div class="inner-bottom">
                                        <input id="btnCancel" name="btnCancel" type="button" class="form-reset" />
                                        <input id="btnSave" name="btnSave" type="button" class="form-submit" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</asp:Content>

<%@ Page Title="SKU Relation" Language="C#" AutoEventWireup="true" CodeBehind="TeamSKU.aspx.cs" Inherits="PocketDCR2.Form.TeamSKU" MasterPageFile="~/MasterPages/Home.Master" %>


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

    <script src="TeamSKU.js" type="text/javascript"></script>
    <style type="text/css">
        .divgrid {
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
                <div class="divgrid" style="width: 99% !important; overflow: scroll">
                    <obout:Grid ID="Grid1" runat="server" Serialize="false" AutoGenerateColumns="false"
                        DataSourceID="SqlDataSource1" AllowFiltering="true" AllowSorting="true" AllowPaging="true"
                        AllowAddingRecords="false" FolderStyle="../Styles/GridCss" AllowPageSizeSelection="false">
                        <Columns>
                            <obout:Column Width="100" DataField="SkuId" HeaderText="SkuId" SortExpression="SkuId"
                                Visible="false" />
                            <obout:Column Width="100" DataField="SKU_Code" HeaderText="SKU Code" SortExpression="SKU_Code" />
                            <obout:Column Width="200" DataField="SKU" HeaderText="SKU" SortExpression="SKU" />
                            <obout:Column Width="150" DataField="Sku_Type" HeaderText="SKU Type" SortExpression="Sku_Type" />
                            <obout:Column Width="150" DataField="Product" HeaderText="Brand" SortExpression="Product" />
                            <obout:Column Width="200" DataField="Team" HeaderText="Team(s)" SortExpression="Team" />
                            <obout:Column Width="100" DataField="Form" HeaderText="Form" SortExpression="Form" />
                            <obout:Column Width="100" DataField="Strength" HeaderText="Strength" SortExpression="Strength" />
                            <obout:Column Width="120" DataField="Package_Size" HeaderText="Package Size" SortExpression="Package_Size" />
                            <obout:Column Width="100" DataField="IncentiveAmount" HeaderText="Incentive Amount" SortExpression="IncentiveAmount" />
                            <obout:Column Width="100" DataField="IncentiveFrom" HeaderText="Incentive From" SortExpression="IncentiveFrom" />
                            <obout:Column Width="100" DataField="IncentiveTo" HeaderText="Incentive To" SortExpression="IncentiveTo" />
                            <obout:Column Width="100" DataField="Status" HeaderText="Status" SortExpression="Status" />
                            <obout:Column Width="70" AllowEdit="true" />
                            <obout:Column ID="colEdit" runat="server" Width="120">
                                <TemplateSettings TemplateId="EditedTemplate" />
                            </obout:Column>
                            <obout:Column Width="80" AllowDelete="true" />


                        </Columns>


                        <%--       <Templates>
                            <obout:GridTemplate runat="server" ID="editTemplate">
                                <Template>
                             <asp:Button ID="btnInsert" runat="server" Text="Insert"  OnClientClick="btnInsert_Click" />
                                            <input type="button" value="Insert" id="btnInsert"/>
                             </Template>
                            </obout:GridTemplate>
                        </Templates> --%>


                        <ClientSideEvents OnBeforeClientEdit="oGrid_Edit" OnBeforeClientDelete="oGrid_Delete" />
                        <Templates>
                            <obout:GridTemplate ID="EditedTemplate" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
<%--                                   <input type="button" id="LinkButton1" class="ob_gAL" value="New Policy" onclick="btnInsert_Click(this);" />--%>

                                    <a href="javascript:void(0);" id="LinkButton1" class="ob_gAL" onclick="btnInsert_Click(this);">New Policy</a>

                                </Template>
                            </obout:GridTemplate>
                        </Templates>



                        <GroupingSettings AllowChanges="false" />
                    </obout:Grid>
                    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                        SelectCommand="sp_ProductSKUViewSelect_New_Child" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
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

                                                                    <tr>
                                                                        <th valign="top">Brand:
                                                                                <asp:DropDownList ID="cboProduct" name="cboProduct" runat="server" DataSourceID="sdsProduct"
                                                                                    AppendDataBoundItems="true" ClientIDMode="Static" DataTextField="ProductName" DataValueField="ProductID"
                                                                                    CssClass="styledselect_form_1">
                                                                                    <asp:ListItem Value="-1" Selected="True">Select Brand...</asp:ListItem>
                                                                                </asp:DropDownList>
                                                                            <span class="red" style="height: 501px;">* </span>

                                                                            <asp:SqlDataSource ID="sdsProduct" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                                                                SelectCommand="SELECT [ProductID], [ProductName] FROM [Products] WHERE [IsActive] = 1 ORDER BY [ProductName]"></asp:SqlDataSource>
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
                                                                            <span class="red" style="height: 501px;">* </span>
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th valign="top">Institution Price:
                                                                            <input id="txtInstPrice" name="txtInstPrice" type="text" maxlength="23" class="inp-form" />
                                                                            <span class="red" style="height: 501px;">* </span>
                                                                        </th>
                                                                    </tr>

                                                                    <tr>
                                                                        <th valign="top">Team :
                                                                            <select id="ddlTeam" name="ddlTeam" class="styledselect_form_1" multiple="multiple">
                                                                                <span class="red" style="height: 501px;">* </span>
                                                                            </select>
                                                                            <span class="red">* </span>
                                                                        </th>

                                                                    </tr>


                                                                    <tr>
                                                                        <th valign="top">Incentive Amount :
                                                                         <input id="txtIncentive" name="txtIncentive" type="text" maxlength="23" class="inp-form" />
                                                                            <span class="red" style="height: 501px;">* </span>
                                                                        </th>

                                                                    </tr>

                                                                  



                                                                    <tr>
                                                                        <th valign="top">Status:
                                                                            <input id="chkActive" name="chkActive" type="checkbox" />
                                                                        </th>

                                                                    </tr>
                                                                    <br />
                                                                      <tr>
                                                                       <th valign="top">Incentive Date:
                                                                            <input id="chkDate" name="chkDate" type="checkbox"  onchange="showhideincentivedate()" />
                                                                        </th>
                                                                      </tr>
                                                               
                                                                      <tr class="incentive">
                                                                        <th valign="top">Incentive Period :</th>
                                                                    </tr>
                                                                    <tr class="incentive">
                                                                        <th valign="top">From: 

                                                                         <input id="IncentiveFrom" name="IncentiveFrom" type="date" maxlength="23" class="inp-form" />
                                                                            <span class="red" style="height: 501px;">* </span>

                                                                        </th>
                                                                    </tr>
                                                                    <tr class="incentive">
                                                                        <th valign="top">To: 

                                                                         <input id="IncentiveTo" name="IncentiveTo" type="date" maxlength="23" class="inp-form" />
                                                                            <span class="red" style="height: 501px;">* </span>
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
                                                                        <th valign="top">Strength:
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
                                                                            <span class="red" style="height: 501px;">* </span>
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th valign="top">Retail Price:
                                                                            <input id="txtRetailPrice" name="txtRetailPrice" type="text" maxlength="23" class="inp-form" />
                                                                            <span class="red" style="height: 501px;">* </span>
                                                                        </th>
                                                                    </tr>

                                                                    <tr>
                                                                        <th valign="top">SKU Type :
                                                                            <select id="ddltype" name="ddltype" class="styledselect_form_1">
                                                                            </select>
                                                                            <span class="red" style="height: 501px;">* </span>
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

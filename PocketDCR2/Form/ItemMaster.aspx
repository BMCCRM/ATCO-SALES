<%@ Page Title="Item Master" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true"
    CodeBehind="ItemMaster.aspx.cs" Inherits="PocketDCR2.Form.ItemMaster" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="obout_Grid_NET" Namespace="Obout.Grid" TagPrefix="obout" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
   <script type="text/javascript" src="../Scripts/json-minified.js"></script>
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="ItemMaster.js" type="text/javascript"></script>
      <style type="text/css"> 
          .error{
              color:red;
          }
          #txtItemDescription{
              resize: none;
          }
          </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
            </Triggers>
            <ContentTemplate>
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/Product.png" />
                        Items</h1>
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
                <div class="divgrid">
                    <obout:Grid ID="Grid1" runat="server" Serialize="false" AutoGenerateColumns="false"
                        DataSourceID="SqlDataSource1" AllowFiltering="true" AllowSorting="true" AllowPaging="true"
                        AllowAddingRecords="false" FolderStyle="../Styles/GridCss" AllowPageSizeSelection="false">
                        <Columns>
                            <obout:Column Width="100" DataField="pk_id" HeaderText="pk_id" SortExpression="pk_id"
                                Visible="false" />
                            <obout:Column Width="100" DataField="ItemCode" HeaderText="Item Code" SortExpression="ItemCode" />
                            <obout:Column Width="250" DataField="ItemName" HeaderText="Item Name" SortExpression="ItemName" />
                         <%--   <obout:Column Width="250" DataField="ItemDescription" HeaderText="Item Description" SortExpression="ItemDescription" />--%>
                          
                            <obout:Column Width="120" DataField="ItemCost" HeaderText="Item Cost" SortExpression="ItemCost" />
                            <obout:Column Width="100" DataField="isActive" HeaderText="Status" SortExpression="isActive" />
                            <obout:Column Width="120" AllowEdit="true" />
                            <obout:Column Width="100" AllowDelete="true" />
                        </Columns>
                        <ClientSideEvents OnBeforeClientEdit="oGrid_Edit" OnBeforeClientDelete="oGrid_Delete" />
                        <GroupingSettings AllowChanges="false" />
                    </obout:Grid>
                    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                        SelectCommand="sp_ItemMasterViewSelect" SelectCommandType="StoredProcedure">
                    </asp:SqlDataSource>
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
                                            <h2>
                                              Add New Item</h2>
                                               </div>
                                        <div style="margin: 26px;">
                                             <table width="100%" border="0" cellspacing="0" cellpadding="0" id="id-form">
                                                <tbody>
                                                    <tr >
                                                        <td>
                                                            <!-- start id-form -->
                                                            <table border="0" cellspacing="0" cellpadding="0" id="Table1">
                                                                <tbody>
                                                               
                                                                    <tr>
                                                                        <th >
                                                                            Item Code:
                                                                          
                                                                        </th>
                                                                        <th>
                                                                              <input id="txtCode" name="txtCode" type="text" maxlength="26" class="inp-form" />
                                                                             <span class="red">* </span>
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th >
                                                                            Item Name:
                                                                           
                                                                        </th>
                                                                        <th>
                                                                            <input id="txtItemName" name="txtItemName" type="text" maxlength="150" class="inp-form" style="width: 250px;">
                                                                             <span class="red">* </span>
                                                                        </th>
                                                                    </tr>
                                                                      <tr>
                                                                        <th >
                                                                            Item Description:
                                                                            
                                                                        </th>
                                                                          <th>
                                                                             <textarea id="txtItemDescription" name="txtItemDescription" type="text" maxlength="300" class="inp-form" style="width: 300px; margin: 0px 0px 5px; height: 73px;"> </textarea>
                                                                          </th>
                                                                    </tr>
                                                                     <tr>
                                                                        <th >
                                                                            Item Cost:
                                                                            
                                                                        </th>
                                                                          <th>
                                                                              <input id="txtItemCost" name="txtItemCost" type="text" maxlength="200" class="inp-form"/>
                                                                               <span class="red">* </span>
                                                                          </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th >
                                                                            Status:<br />
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
                                     
                                      <%--  <div class="inner-left">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" id="id-form">
                                                <tbody>
                                                    <tr valign="top">
                                                        <td>
                                                            <!-- start id-form -->
                                                            <table border="0" cellspacing="0" cellpadding="0" id="Table1">
                                                                <tbody>
                                                               
                                                                    <tr>
                                                                        <th valign="top">
                                                                            SKU Code:
                                                                            <input id="txtCode" name="txtCode" type="text" maxlength="26" class="inp-form" />
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th valign="top">
                                                                            Trade Price:
                                                                            <input id="txtTradePrice" name="txtTradePrice" type="text" maxlength="23" class="inp-form" />
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th valign="top">
                                                                            Status:<br />
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
                                        </div>--%>
                                  <%--      <div class="inner-right">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" id="id-form">
                                                <tbody>
                                                    <tr valign="top">
                                                        <td>
                                                            <!-- start id-form -->
                                                            <table border="0" cellspacing="0" cellpadding="0" id="Table2">
                                                                <tbody>
                                                                    <tr>
                                                                        <th valign="top">
                                                                            Form:
                                                                            <asp:DropDownList ID="cboForm" runat="server" DataSourceID="sdsForm" AppendDataBoundItems="true"
                                                                                DataTextField="FormName" ClientIDMode="Static" DataValueField="FormId" CssClass="styledselect_form_1">
                                                                                <asp:ListItem Value="-1" Selected="True">Select Form</asp:ListItem>
                                                                            </asp:DropDownList>
                                                                            <asp:SqlDataSource ID="sdsForm" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                                                                SelectCommand="SELECT [FormId], [FormCode], [FormName] FROM [Forms] ORDER BY [FormName]">
                                                                            </asp:SqlDataSource>
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th valign="top">
                                                                            Strenght:
                                                                            <asp:DropDownList ID="cboStrength" runat="server" DataSourceID="sdsStrength" AppendDataBoundItems="true"
                                                                                DataTextField="StrengthName" ClientIDMode="Static" DataValueField="StrengthId"
                                                                                CssClass="styledselect_form_1">
                                                                                <asp:ListItem Value="-1" Selected="True">Select Strength</asp:ListItem>
                                                                            </asp:DropDownList>
                                                                            <asp:SqlDataSource ID="sdsStrength" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                                                                SelectCommand="SELECT [StrengthId], [StrengthCode], [StrengthName] FROM [Strength] WHERE [IsActive] = 1 ORDER BY [StrengthName]">
                                                                            </asp:SqlDataSource>
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th valign="top">
                                                                            SKU Name:
                                                                            <input id="txtName" name="txtName" type="text" maxlength="100" class="inp-form" />
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th valign="top">
                                                                            Distributer Price:
                                                                            <input id="txtDistributorPrice" name="txtDistributorPrice" type="text" maxlength="23"
                                                                                class="inp-form" />
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th valign="top">
                                                                            Retail Price:
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
                                        </div>--%>
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

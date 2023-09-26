﻿<%@ Page Title="Group" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true"
    CodeBehind="Group.aspx.cs" Inherits="PocketDCR2.Form.Group" %>

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
    <script src="GroupJs.js" type="text/javascript"></script>
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
                        Group</h1>
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
                                        <obout:Column Width="100" DataField="pk_GID" HeaderText="GroupId" SortExpression="pk_GID"
                                            Visible="false" />
                                                   <obout:Column Width="150" DataField="GroupName" HeaderText="Group" SortExpression="GroupName" />
                                        <obout:Column Width="150" DataField="GroupDescription" HeaderText="Description" SortExpression="GroupDescription" />
                          
                                        <obout:Column Width="150" DataField="IsActive" HeaderText="Status" SortExpression="IsActive" />
                                        <obout:Column Width="100" AllowEdit="true" />
                                        <obout:Column Width="100" AllowDelete="true" />
                                    </Columns>
                                    <ClientSideEvents OnBeforeClientEdit="oGrid_Edit" OnBeforeClientDelete="oGrid_Delete" />
                                    <GroupingSettings AllowChanges="false" />
                                </obout:Grid>
                                    <%--SelectCommand="SELECT [ProductId], [ProductName], CASE WHEN [IsActive] = 1 THEN 'Active' ELSE 'Deactive' END AS IsActive FROM [Products] ORDER BY [ProductName]">--%>
                                <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                        SelectCommand="select pk_GID,GroupName,GroupDescription,CASE WHEN IsActive = 1 THEN 'Active' ELSE 'Deactive' END AS IsActive  
from tbl_GroupMaster
order by GroupName asc ">
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
                                    <span class="spacer">&nbsp;</span>Add New Group</h2>
                            </div>
                            <div class="designation-inner">
                                <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                    <tr valign="top">
                                        <td>
                                            <!-- start id-form -->
                                            <table border="0" cellpadding="0" cellspacing="0" id="id-form">
                                             
                                                                  <tr>
                                                 <tr>
                                                    <th valign="middle">
                                                        Group Name : &nbsp;
                                                    </th>
                                                    <td>
                                                        <%--<select id="dG1" name="dG1" class="styledselect_form_1">
                                            <option value="-1">Select Team...</option>
                                                      </select>--%>
                                                        <input id="txtName" name="txtName" maxlength="100" class="inp-form" />
                                                        <span class="red">* </span>
                                                    </td>
                                                </tr>                                                
                                                <tr>
                                                    <th valign="top">
                                                        Description :
                                                    </th>
                                                    <td>
                                                        <input id="txtDescription" name="txtDescription" maxlength="100" class="inp-form" />
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                        Status :
                                                    </th>
                                                    <td align="left">
                                                        <input id="chkActive" name="chkActive" type="checkbox" checked="checked"/>
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

<%@ Page Title="Team" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true"
    CodeBehind="Team.aspx.cs" Inherits="PocketDCR2.Form.Team" %>

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
    <script src="TeamJs.js" type="text/javascript"></script>
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
                        Team</h1>
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
                                        <obout:Column Width="100" DataField="PK_TSID" HeaderText="ProductId" SortExpression="PK_TSID"
                                            Visible="false" />
                                        <obout:Column Width="150" DataField="TeamMastertName" HeaderText="Name" SortExpression="TeamMastertName" />
                                        <obout:Column Width="150" DataField="TeamMasterDescription" HeaderText="Description" SortExpression="TeamMasterDescription" />
                                         <obout:Column Width="150" DataField="Groupname" HeaderText="Group" SortExpression="Groupname" />
                                        <obout:Column Width="150" DataField="IsActive" HeaderText="Status" SortExpression="IsActive" />
                                        <obout:Column Width="100" AllowEdit="true" />
                                        <obout:Column Width="100" AllowDelete="true" />
                                    </Columns>
                                    <ClientSideEvents OnBeforeClientEdit="oGrid_Edit" OnBeforeClientDelete="oGrid_Delete" />
                                    <GroupingSettings AllowChanges="false" />
                                </obout:Grid>
                                    <%--SelectCommand="SELECT [ProductId], [ProductName], CASE WHEN [IsActive] = 1 THEN 'Active' ELSE 'Deactive' END AS IsActive FROM [Products] ORDER BY [ProductName]">--%>
                                <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                        SelectCommand="select PK_TSID,grp.GroupName Groupname,TeamMastertName,TeamMasterDescription,CASE WHEN team.IsActive = 1 THEN 'Active' ELSE 'Deactive' END AS IsActive 
from tbl_teammaster team
inner join tbl_GroupMaster grp
on team.Fk_GID=grp.pk_GID 
 order by TeamMastertName asc">
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
                                    <span class="spacer">&nbsp;</span>Add New Team</h2>
                            </div>
                            <div class="designation-inner">
                                <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                    <tr valign="top">
                                        <td>
                                            <!-- start id-form -->
                                            <table border="0" cellpadding="0" cellspacing="0" id="id-form">
                                                   <tr>
                                                                    <th valign="middle" id="Grouphide">
                                                                        Group Name :
                                                                    </th>
                                                                            <td> <asp:DropDownList ID="ddlgroup" runat="server" ClientIDMode="Static" AppendDataBoundItems="true"
                                                                                    DataValueField="ID" DataTextField="GroupName" DataSourceID="sdsgroup" class="styledselect_form_1" Height="20%"   >
                                                                                    <asp:ListItem Value="-1" Selected="True">Select Group</asp:ListItem>
                                                                                </asp:DropDownList>
                                                                                <asp:SqlDataSource ID="sdsgroup" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                                                                    SelectCommand="Select  PK_GID As ID ,GroupName GroupName from tbl_GroupMaster  where IsActive = 1 order by GroupName">
                                                                                </asp:SqlDataSource>
                                                                                <span class="red" style="height: 501px;">* </span>
                                                                    </td>
                                                                </tr>
                                                                  <tr>
                                                 <tr>
                                                    <th valign="middle">
                                                        Team Name : &nbsp;
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

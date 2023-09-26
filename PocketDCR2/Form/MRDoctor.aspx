<%@ Page Title="FMO Doctors Setup" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="MRDoctor.aspx.cs" Inherits="PocketDCR2.Form.MRDoctor" %>

<%@ Register Assembly="obout_Grid_NET" Namespace="Obout.Grid" TagPrefix="obout" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript">
        function exportToExcel() {
            grid1.exportToExcel('test', false, false, true, true)
        }

        function showLoadingMessage() {
            document.getElementById('loadingContainer').style.display = '';
        }

        function hideLoadingMessage() {
            window.setTimeout(finishHideLoadingMessage, 250);
        }

        function finishHideLoadingMessage() {
            document.getElementById('loadingContainer').style.display = 'none';
        }
    </script>
    <style type="text/css">
        td.ajax__combobox_textboxcontainer
        {
            padding-bottom: 2px\9 !important;
        }
        .ajax__combobox_inputcontainer
        {
            top: -7px\9 !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <div class="page_heading">
            <h1>
                <img alt="" src="../Images/Icon/1330777250_doctor.png" />
                FMO Doctors Setup</h1>
            <asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static" OnClick="btnRefresh_Click"
                Style="display: none;" />
        </div>
        <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional">
            <Triggers>
                <asp:AsyncPostBackTrigger ControlID="ddlLevel1" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddlLevel2" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddlLevel3" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddlLevel4" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddlLevel5" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddlLevel6" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddl3" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddl4" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="btnSave" EventName="Click" />
                <asp:AsyncPostBackTrigger ControlID="btnAdd" EventName="Click" />
                <asp:AsyncPostBackTrigger ControlID="btnall" EventName="Click" />
            </Triggers>
            <ContentTemplate>
                <asp:Panel ID="pnlHierarchy" runat="server" ClientIDMode="Static">
                    <div id="divGrid" class="popup_box">
                        <table border="0" width="100%" cellpadding="0" cellspacing="0" id="content-table">
                            <tr>
                                <th rowspan="3" class="sized">
                                    <img src="../images/form/side_shadowleft.jpg" width="20" height="100" alt="" />
                                </th>
                                <th class="topleft">
                                </th>
                                <td id="tbl-border-top">
                                    &nbsp;
                                </td>
                                <th class="topright">
                                </th>
                                <th rowspan="3" class="sized">
                                    <img src="../Images/Form/side_shadowright.jpg" width="20" height="100" alt="" />
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
                                                    <asp:Panel ID="pnlShow" runat="server">
                                                        <b>
                                                            <asp:Label ID="lblUhl" runat="server" Text="USER HIERARCHY" /></b>
                                                        <table border="0" cellpadding="10" cellspacing="0" id="dsd">
                                                            <tr>
                                                                <td>
                                                                    <div class="divcol">
                                                                        <asp:Label ID="lblLevel1" runat="server" Text="[Level1 Name]" />
                                                                    </div>
                                                                    <asp:DropDownList ID="ddlLevel1" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                                                        AutoPostBack="true" DataValueField="EmployeeId" DataTextField="EmployeeName"
                                                                        OnSelectedIndexChanged="ddlLevel1_SelectedIndexChanged" />
                                                                </td>
                                                                <td>
                                                                    <div class="divcol">
                                                                        <asp:Label ID="lblLevel2" runat="server" Text="[Level2 Name]" />
                                                                    </div>
                                                                    <asp:DropDownList ID="ddlLevel2" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                                                        AutoPostBack="true" DataValueField="EmployeeId" DataTextField="EmployeeName"
                                                                        OnSelectedIndexChanged="ddlLevel2_SelectedIndexChanged" />
                                                                </td>
                                                                <td>
                                                                    <div class="divcol">
                                                                        <asp:Label ID="lblLevel3" runat="server" Text="[Level3 Name]" />
                                                                    </div>
                                                                    <asp:DropDownList ID="ddlLevel3" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                                                        AutoPostBack="true" DataValueField="EmployeeId" DataTextField="EmployeeName"
                                                                        OnSelectedIndexChanged="ddlLevel3_SelectedIndexChanged" />
                                                                </td>
                                                                <td>
                                                                    <div class="divcol">
                                                                        <asp:Label ID="lblLevel4" runat="server" Text="[Level4 Name]" />
                                                                    </div>
                                                                    <asp:DropDownList ID="ddlLevel4" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                                                        AutoPostBack="true" DataValueField="EmployeeId" DataTextField="EmployeeName"
                                                                        OnSelectedIndexChanged="ddlLevel4_SelectedIndexChanged" />
                                                                </td>
                                                                <td>
                                                                    <div class="divcol">
                                                                        <asp:Label ID="lblLevel5" runat="server" Text="[Level5 Name]" />
                                                                    </div>
                                                                    <asp:DropDownList ID="ddlLevel5" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                                                        AutoPostBack="true" DataValueField="EmployeeId" DataTextField="EmployeeName"
                                                                        OnSelectedIndexChanged="ddlLevel5_SelectedIndexChanged" />
                                                                </td>
                                                                <td>
                                                                    <div class="divcol">
                                                                        <asp:Label ID="lblLevel6" runat="server" Text="[Level6 Name]" />
                                                                    </div>
                                                                    <asp:DropDownList ID="ddlLevel6" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                                                        AutoPostBack="true" DataValueField="EmployeeId" DataTextField="EmployeeName"
                                                                        OnSelectedIndexChanged="ddlLevel6_SelectedIndexChanged" />
                                                                </td>
                                                                <td style="padding-top: 23px;">
                                                                    <asp:Button ID="btnAdd" CssClass="btnAdd" runat="server" OnClick="btnAdd_Click" Text="Add / Edit" />
                                                                    <asp:Button ID="btnexport" runat="server" Text="Export" CssClass="form-export" OnClick="btnexport_Click"
                                                                        Style="display: none;" />
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <div class="clear">
                                                        </div>
                                                        <b>
                                                            <asp:Label ID="lblGhl" runat="server" Text="GEOGRAPHICAL HIERARCHY" /></b>
                                                        <table border="0" cellpadding="10" cellspacing="0" id="fdform">
                                                            <tr>
                                                                <td>
                                                                    <div class="divcol">
                                                                        <asp:Label ID="lblLevelG3" runat="server" />
                                                                    </div>
                                                                    <asp:DropDownList ID="ddl3" runat="server" AutoPostBack="true" CssClass="styledselect_form_1"
                                                                        DataTextField="LevelName" DataValueField="LevelId" OnSelectedIndexChanged="ddl3_SelectedIndexChanged">
                                                                    </asp:DropDownList>
                                                                </td>
                                                                <td>
                                                                    <div class="divcol">
                                                                        <asp:Label ID="lblLevelG4" runat="server" />
                                                                    </div>
                                                                    <asp:DropDownList ID="ddl4" runat="server" AutoPostBack="true" CssClass="styledselect_form_1"
                                                                        DataTextField="LevelName" DataValueField="LevelId" OnSelectedIndexChanged="ddl4_SelectedIndexChanged">
                                                                    </asp:DropDownList>
                                                                </td>
                                                                <td>
                                                                    <div class="divcol">
                                                                        <asp:Label ID="labbrick1" runat="server" Text="Existing Brick" />
                                                                    </div>
                                                                    <asp:ComboBox ID="ddlBrick1" runat="server" AutoCompleteMode="Suggest" DataTextField="LevelName"
                                                                        DataValueField="LevelId" CssClass="SelBox_form_1" AutoPostBack="true" AppendDataBoundItems="true"
                                                                        OnSelectedIndexChanged="ddlBrick1_SelectedIndexChanged">
                                                                    </asp:ComboBox>
                                                                </td>
                                                                <td>
                                                                    <div class="divcol">
                                                                        <asp:Label ID="labbrick" runat="server" Text="All Brick" />
                                                                    </div>
                                                                    <%--<asp:DropDownList ID="ddlBrick" runat="server" DataTextField="Brick" DataValueField="LevelId"
                                                                        DataSourceID="sdsBrick" AppendDataBoundItems="true" CssClass="SelBox_form_1"
                                                                        AutoPostBack="True" OnSelectedIndexChanged="ddlBrick_SelectedIndexChanged">
                                                                        <asp:ListItem Value="-1" Selected="True">Select Brick</asp:ListItem>
                                                                    </asp:DropDownList>--%>
                                                                    <asp:ComboBox ID="ddlBrick" runat="server" AutoCompleteMode="Suggest" AppendDataBoundItems="true"
                                                                        DataTextField="Brick" DataValueField="LevelId" DataSourceID="sdsBrick" AutoPostBack="true"
                                                                        OnSelectedIndexChanged="ddlBrick_SelectedIndexChanged1">
                                                                        <asp:ListItem Value="-1" Selected="True">Select Brick</asp:ListItem>
                                                                    </asp:ComboBox>
                                                                    <asp:SqlDataSource ID="sdsBrick" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                                                        SelectCommand="SELECT [LevelId], [LevelCode] + ' - ' + [LevelName] AS Brick FROM	HierarchyLevel6 WHERE LevelId NOT IN (SELECT ChildLevelId FROM RelationLevel5) ORDER BY LevelName">
                                                                    </asp:SqlDataSource>
                                                                </td>
                                                                <td style="padding-top: 23px;">
                                                                    <asp:Button ID="btnSave" runat="server" OnClick="btnSave_Click" Text="Save" CssClass="form-submit" />
                                                                    <asp:Button ID="btnall" runat="server" Text="See ALL" CssClass="form-seeAll" OnClick="btnall_Click" />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="4" style="font-size: 16px; text-align: center; vertical-align: middle;
                                                                    margin-top: 15px;">
                                                                    <asp:Label ID="lblError" runat="server" ClientIDMode="Static" Height="35px" Width="100%" />
                                                                    <asp:HyperLink ID="hldownload" runat="server" NavigateUrl=""></asp:HyperLink>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <div class="clear">
                                                        </div>
                                                    </asp:Panel>
                                                    <!-- END id-form -->
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
                </asp:Panel>
                <div class="divgrid">
                    <b style="color: Black; font-size: medium;">
                        <asp:Label ID="Label3" runat="server" Text="Current Doctors List"></asp:Label></b>
                    <obout:Grid ID="Grid1" runat="server" AllowColumnResizing="false" AllowFiltering="true"
                        AllowGrouping="false" AllowPaging="false" AllowSorting="true" AutoGenerateColumns="false"
                        AllowAddingRecords="false" PageSize="0" PageSizeOptions="0" Width="50%" FolderExports="../resources"
                        FolderStyle="../Styles/GridCss" AllowPageSizeSelection="false">
                        <Columns>
                            <obout:Column Width="70" DataField="EmployeeId" HeaderText="EmployeeId" SortExpression="EmployeeId"
                                Visible="false" />
                            <obout:Column Width="70" DataField="DoctorId" HeaderText="DoctorId" SortExpression="DoctorId"
                                Visible="false" />
                            <obout:Column Width="100" DataField="DoctorCode" HeaderText="Code" SortExpression="DoctorCode" />
                            <obout:Column Width="250" DataField="DoctorName" HeaderText="Name" SortExpression="DoctorName"
                                Wrap="true" />
                            <obout:Column Width="100" DataField="ClassId" HeaderText="ClassId" SortExpression="ClassId"
                                Visible="false" />
                            <obout:Column Width="100" DataField="ClassCode" HeaderText="ClassCode" SortExpression="ClassCode"
                                Visible="false" />
                            <obout:Column Width="70" DataField="ClassName" HeaderText="Class" SortExpression="ClassName" />
                            <obout:Column Width="100" DataField="ClassFrequency" HeaderText="Frequency" SortExpression="ClassFrequency" />
                            <obout:Column Width="70" DataField="LevelId" HeaderText="LevelId" SortExpression="LevelId"
                                Visible="false" />
                            <obout:Column Width="200" DataField="DoctorBrickWithCode" HeaderText="Brick" SortExpression="DoctorBrickWithCode"
                                Wrap="true" />
                            <obout:Column Width="250" DataField="Address1" HeaderText="Address" SortExpression="Address1"
                                Wrap="true" />
                            <obout:Column Width="100" DataField="Country" HeaderText="Country" SortExpression="Country"
                                Visible="false" />
                            <obout:Column Width="100" DataField="City" HeaderText="City" SortExpression="City"
                                Visible="false" />
                            <obout:Column Width="150" DataField="MobileNumber1" HeaderText="Contact No" SortExpression="MobileNumber1" />
                            <obout:Column Width="100" DataField="TiemStamp" HeaderText="TiemStamp" SortExpression="TiemStamp"
                                Visible="false" />
                        </Columns>
                        <ExportingSettings ExportAllPages="True" ExportDetails="True" FileName="MIO Doctors List"
                            KeepColumnSettings="True" />
                    </obout:Grid>
                </div>
                <div class="divgrid">
                    <div style="float: left">
                        <b style="color: Black; font-size: medium;">
                            <asp:Label ID="Label1" runat="server" Text="Master Doctors List"></asp:Label></b>
                        <obout:Grid ID="gvMRDoctor" runat="server" AllowColumnResizing="True" AllowFiltering="True"
                            FolderStyle="../Styles/GridCss" AllowGrouping="false" AllowPaging="false" AutoGenerateColumns="false"
                            OnRowDataBound="gvMRDoctor_OnRowDataBound" PageSize="0" AllowAddingRecords="false"
                            AllowPageSizeSelection="false" Width="50%" PageSizeOptions="0">
                            <Columns>
                                <obout:Column DataField="" HeaderText="" Width="50">
                                    <TemplateSettings TemplateId="tpCheckBox" />
                                </obout:Column>
                                <obout:Column Width="70" DataField="DoctorId" HeaderText="DoctorId" SortExpression="DoctorId"
                                    Visible="false" />
                                <obout:Column DataField="" HeaderText="MR Code" Width="100" AllowEdit="true">
                                    <TemplateSettings TemplateId="tpCode" />
                                </obout:Column>
                                <obout:Column Width="150" DataField="DoctorName" HeaderText="Name" SortExpression="DoctorName"
                                    Wrap="true" />
                                <obout:Column DataField="ClassId" HeaderText="ClassId" SortExpression="ClassId" Visible="false" />
                                <obout:Column Width="75" DataField="ClassCode" HeaderText="ClassCode" SortExpression="ClassCode"
                                    Visible="false" />
                                <obout:Column Width="70" DataField="ClassName" HeaderText="Class" SortExpression="ClassName" />
                                <obout:Column Width="100" DataField="ClassFrequency" HeaderText="ClassFrequency"
                                    SortExpression="ClassFrequency" Visible="false" />
                                <obout:Column Width="70" DataField="LevelId" HeaderText="LevelId" SortExpression="LevelId"
                                    Visible="false" />
                                <obout:Column Width="150" DataField="DoctorBrick" HeaderText="Brick" SortExpression="DoctorBrick"
                                    Visible="false" />
                                <obout:Column DataField="Level3" HeaderText="" Width="100" SortExpression="Level3"
                                    Visible="false">
                                    <TemplateSettings HeaderTemplateId="tpLevel3Header" />
                                </obout:Column>
                                <obout:Column DataField="Level4" HeaderText="" Width="100" SortExpression="Level4"
                                    Visible="false">
                                    <TemplateSettings HeaderTemplateId="tpLevel4Header" />
                                </obout:Column>
                                <obout:Column Width="100" DataField="Address1" HeaderText="Address" SortExpression="Address1"
                                    Wrap="true" />
                                <obout:Column Width="100" DataField="Country" HeaderText="Country" SortExpression="Country"
                                    Visible="false" />
                                <obout:Column Width="100" DataField="City" HeaderText="City" SortExpression="City"
                                    Visible="false" />
                                <obout:Column Width="100" DataField="MobileNumber1" HeaderText="ContactNo" SortExpression="MobileNumber1"
                                    Visible="false" />
                                <obout:Column Width="100" DataField="TiemStamp" HeaderText="TiemStamp" SortExpression="TiemStamp"
                                    Visible="false" />
                            </Columns>
                            <Templates>
                                <obout:GridTemplate ID="tpCheckBox" runat="server">
                                    <Template>
                                        <asp:CheckBox ID="chkSelect" runat="server" />
                                    </Template>
                                </obout:GridTemplate>
                                <obout:GridTemplate ID="tpCode" runat="server">
                                    <Template>
                                        <asp:TextBox ID="txtMrCode" runat="server" />
                                    </Template>
                                </obout:GridTemplate>
                                <obout:GridTemplate ID="tpLevel3Header" runat="server">
                                    <Template>
                                        <asp:Label ID="lblLevel3Header" runat="server" Text="National" />
                                    </Template>
                                </obout:GridTemplate>
                                <obout:GridTemplate ID="tpLevel4Header" runat="server">
                                    <Template>
                                        <asp:Label ID="lblLevel4Header" runat="server" Text="Region" />
                                    </Template>
                                </obout:GridTemplate>
                            </Templates>
                        </obout:Grid>
                    </div>
                    <div style="float: left; padding-left: 15px;">
                        <b style="color: Black; font-size: medium;">
                            <asp:Label ID="Label2" runat="server" Text="Existing Doctor List in Selected Brick"></asp:Label></b>
                        <obout:Grid ID="gvShowMRDoctor" runat="server" AllowColumnResizing="false" AllowFiltering="true"
                            FolderStyle="../Styles/GridCss" AllowGrouping="false" AllowPaging="false" AllowSorting="true"
                            AutoGenerateColumns="false" AllowAddingRecords="false" PageSize="0" Width="50%"
                            AllowPageSizeSelection="false" PageSizeOptions="0" OnRowDataBound="gvShowMRDoctor_RowDataBound">
                            <Columns>
                                <obout:Column Width="70" DataField="EmployeeId" HeaderText="EmployeeId" SortExpression="EmployeeId"
                                    Visible="false" />
                                <obout:Column Width="70" DataField="DoctorId" HeaderText="DoctorId" SortExpression="DoctorId"
                                    Visible="false" />
                                <obout:Column DataField="" HeaderText="MR Code" Width="100" AllowEdit="true">
                                    <TemplateSettings TemplateId="GridTemplate2" />
                                </obout:Column>
                                <obout:Column Width="150" DataField="DoctorName" HeaderText="Name" SortExpression="DoctorName"
                                    Wrap="true" />
                                <obout:Column Width="100" DataField="ClassId" HeaderText="ClassId" SortExpression="ClassId"
                                    Visible="false" />
                                <obout:Column Width="100" DataField="ClassCode" HeaderText="ClassCode" SortExpression="ClassCode"
                                    Visible="false" />
                                <obout:Column Width="70" DataField="ClassName" HeaderText="Class" SortExpression="ClassName" />
                                <obout:Column Width="100" DataField="ClassFrequency" HeaderText="ClassFrequency"
                                    SortExpression="ClassFrequency" Visible="false" />
                                <obout:Column Width="70" DataField="LevelId" HeaderText="LevelId" SortExpression="LevelId"
                                    Visible="false" />
                                <obout:Column Width="225" DataField="DoctorBrick" HeaderText="Brick" SortExpression="DoctorBrick"
                                    Wrap="true" Visible="False" />
                                <obout:Column Width="100" DataField="Address1" HeaderText="Address" SortExpression="Address1"
                                    Wrap="true" />
                                <obout:Column Width="100" DataField="Country" HeaderText="Country" SortExpression="Country"
                                    Visible="false" />
                                <obout:Column Width="100" DataField="City" HeaderText="City" SortExpression="City"
                                    Visible="false" />
                                <obout:Column Width="100" DataField="MobileNumber1" HeaderText="ContactNo" SortExpression="MobileNumber1"
                                    Wrap="true" Visible="False" />
                                <obout:Column Width="100" DataField="TiemStamp" HeaderText="TiemStamp" SortExpression="TiemStamp"
                                    Visible="false" />
                            </Columns>
                            <Templates>
                                <obout:GridTemplate ID="GridTemplate2" runat="server">
                                    <Template>
                                        <asp:Label ID="labMrcode" runat="server" />
                                    </Template>
                                </obout:GridTemplate>
                            </Templates>
                        </obout:Grid>
                    </div>
                </div>
                <div class="clear">
                </div>
                <table border="0" cellpadding="0" cellspacing="0" id="id-form1">
                    <tr>
                        <td align="right" valign="top">
                        </td>
                    </tr>
                </table>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</asp:Content>

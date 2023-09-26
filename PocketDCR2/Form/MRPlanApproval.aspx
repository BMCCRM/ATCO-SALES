<%@ Page Title="FMO Call Planning Approval" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="MRPlanApproval.aspx.cs" Inherits="PocketDCR2.Form.MRPlanApproval" %>

<%@ Register Assembly="ASPnetPagerV2_8" Namespace="ASPnetControls" TagPrefix="cc1" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        .ob_gFEC
        {
            left: 0 !important;
        }
        .ob_gFALC
        {
            float: left !important;
            padding-left: 10px;
        }
        .ob_gFP
        {
            float: left !important;
            padding-left: 10px;
        }
        .colred
        {
            background-color: Red !important;
            color: White;
            border-bottom: solid 1px #fff;
            font-weight: bold;
            padding-left: 15px;
        }
        
        .colgreen
        {
            background-color: Green;
            color: White;
            border-bottom: solid 1px #fff;
            font-weight: bold;
            padding-left: 15px;
        }
        .ob_gC div.ob_gCc2, .ob_gCW div.ob_gCc2, .ob_gC div.ob_gCc2C, .ob_gCW div.ob_gCc2C, .ob_gC div.ob_gCc2R, .ob_gCW div.ob_gCc2R
        {
            padding: 0px !important;
        }
        .ob_gH div.ob_gCc2, .ob_gH div.ob_gCc2C, .ob_gH div.ob_gCc2R
        {
            margin-right: 0px !important;
        }
        .ob_gHContWG .ob_gH .ob_gC, .ob_gHContWG .ob_gH .ob_gCW
        {
            height: 50px !important;
            text-align: center !important;
        }
        .ob_gC div.ob_gCc2, .ob_gCW div.ob_gCc2, .ob_gC div.ob_gCc2C, .ob_gCW div.ob_gCc2C, .ob_gC div.ob_gCc2R, .ob_gCW div.ob_gCc2R
        {
            white-space: normal !important;
        }
        .ob_gHContWG
        {
            margin: 0px !important;
        }
        .ob_gHContWG .ob_gH .ob_gC, .ob_gHContWG .ob_gH .ob_gCW
        {
            background-image: url("../images/head.png") !important;
        }
        .dayname
        {
            float: left;
            top: -50px;
        }
        
        .ob_gBody .ob_gC, .ob_gBody .ob_gCW
        {
            text-align: center !important;
        }
        
        #ContentPlaceHolder1_Grid1
        {
            padding-top: 35px;
        }
        .header
        {
            font-weight: bold;
            position: absolute;
            background: white;
            margin-top: -1px;
            margin-bottom: 2px;
            z-index: 10000;
        }
        .header th
        {
            padding-top: 10px;
            padding-bottom: 10px;
            background: #dedede !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional">
            <Triggers>
                <asp:AsyncPostBackTrigger ControlID="btnreject" EventName="Click" />
                <asp:AsyncPostBackTrigger ControlID="btnApprove" EventName="Click" />
                <asp:AsyncPostBackTrigger ControlID="btnShowPlan" EventName="Click" />
                <asp:AsyncPostBackTrigger ControlID="ddlYear" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddlMonth" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddlLevel1" EventName="SelectedIndexChanged" />
            </Triggers>
            <ContentTemplate>
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/1330777250_doctor.png" />
                        FMO Call Planning Approval</h1>
                    <asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static" OnClick="btnRefresh_Click"
                        Style="display: none;" />
                </div>
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
                            <td valign="top">
                                <!--  start content-table-inner -->
                                <div id="content-table-inner">
                                    <!-- Hr start  not workinng but Level1 ddl just below to that table-->
                                    <table border="0" cellpadding="0" cellspacing="0" style="display: none">
                                        <tr>
                                            <td>
                                                <asp:Label ID="lblLevel1" runat="server" Text="[Level1 Name]" />
                                            </td>
                                            <td>
                                                <asp:Label ID="lblLevel2" runat="server" Text="[Level2 Name]" />
                                            </td>
                                            <td>
                                                <asp:Label ID="lblLevel3" runat="server" Text="[Level3 Name]" />
                                            </td>
                                            <td>
                                                <asp:Label ID="lblLevel4" runat="server" Text="[Level4 Name]" />
                                            </td>
                                            <td>
                                                <asp:Label ID="lblLevel5" runat="server" Text="[Level5 Name]" />
                                            </td>
                                            <td>
                                                <asp:Label ID="lblLevel6" runat="server" Text="[Level6 Name]" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <%--<asp:DropDownList ID="ddlLevel1" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                                    AutoPostBack="true" DataValueField="EmployeeId" DataTextField="EmployeeName"
                                                    OnSelectedIndexChanged="ddlLevel1_SelectedIndexChanged" />--%>
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlLevel2" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                                    AutoPostBack="true" DataValueField="EmployeeId" DataTextField="EmployeeName"
                                                    OnSelectedIndexChanged="ddlLevel2_SelectedIndexChanged" />
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlLevel3" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                                    AutoPostBack="true" DataValueField="EmployeeId" DataTextField="EmployeeName"
                                                    OnSelectedIndexChanged="ddlLevel3_SelectedIndexChanged" />
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlLevel4" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                                    AutoPostBack="true" DataValueField="EmployeeId" DataTextField="EmployeeName"
                                                    OnSelectedIndexChanged="ddlLevel4_SelectedIndexChanged" />
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlLevel5" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                                    AutoPostBack="true" DataValueField="EmployeeId" DataTextField="EmployeeName"
                                                    OnSelectedIndexChanged="ddlLevel5_SelectedIndexChanged" />
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlLevel6" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                                    AutoPostBack="true" DataValueField="EmployeeId" DataTextField="EmployeeName"
                                                    OnSelectedIndexChanged="ddlLevel6_SelectedIndexChanged" />
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- HR END  -->
                                    <table border="0" cellpadding="0" cellspacing="0" id="id-form" style="float: left">
                                        <tr>
                                            <td>
                                                Select FMO
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlLevel1" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                                    AutoPostBack="true" DataValueField="EmployeeId" DataTextField="EmployeeName"
                                                    OnSelectedIndexChanged="ddlLevel1_SelectedIndexChanged" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Select Year&nbsp;&nbsp;&nbsp;
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlYear" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                                    OnSelectedIndexChanged="ddlYear_SelectedIndexChanged">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Select Month&nbsp;&nbsp;&nbsp;
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlMonth" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                                    AutoPostBack="true" OnSelectedIndexChanged="ddlMonth_SelectedIndexChanged">
                                                    <asp:ListItem Value="-1" Selected="True">Select Month</asp:ListItem>
                                                    <asp:ListItem Value="1">01 - January</asp:ListItem>
                                                    <asp:ListItem Value="2">02 - February</asp:ListItem>
                                                    <asp:ListItem Value="3">03 - March</asp:ListItem>
                                                    <asp:ListItem Value="4">04 - April</asp:ListItem>
                                                    <asp:ListItem Value="5">05 - May</asp:ListItem>
                                                    <asp:ListItem Value="6">06 - June</asp:ListItem>
                                                    <asp:ListItem Value="7">07 - July</asp:ListItem>
                                                    <asp:ListItem Value="8">08 - August</asp:ListItem>
                                                    <asp:ListItem Value="9">09 - September</asp:ListItem>
                                                    <asp:ListItem Value="10">10 - October</asp:ListItem>
                                                    <asp:ListItem Value="11">11 - November</asp:ListItem>
                                                    <asp:ListItem Value="12">12 - December </asp:ListItem>
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:Label ID="lblReason" runat="server" ClientIDMode="Static" Text="Comments" />
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtReason" runat="server" ClientIDMode="Static" TextMode="MultiLine"
                                                    CssClass="form-textarea" />
                                                <asp:HiddenField ID="hfdate" runat="server" />
                                                <asp:HiddenField ID="hfmioId" runat="server" />
                                                <asp:HiddenField ID="hfmonth" runat="server" />
                                                <asp:HiddenField ID="hfyear" runat="server" />
                                                <asp:HiddenField ID="noday" runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td valign="top">
                                                <asp:Label ID="labstatus" runat="server" Text="Plan Status"></asp:Label>&nbsp;&nbsp;&nbsp;
                                            </td>
                                            <td valign="top" align="left">
                                                <asp:Panel ID="pared" runat="server" Width="100" Height="24" BackColor="Red" Visible="True"
                                                    ToolTip="Plan Reject" ForeColor="White" Style="padding: 5px;">
                                                    Rejected Plan
                                                </asp:Panel>
                                                <asp:Panel ID="payellow" runat="server" Width="100" Height="24" BackColor="Yellow"
                                                    Visible="False" ToolTip="Plan pending" ForeColor="Black" Style="padding: 5px;">
                                                    Pending Plan
                                                </asp:Panel>
                                                <asp:Panel ID="pangreen" runat="server" Width="100" Height="24" BackColor="Green"
                                                    Visible="False" ToolTip="Plan Approved" ForeColor="White" Style="padding: 5px;">
                                                    Approved Plan
                                                </asp:Panel>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            </td>
                                            <td valign="top" style="width: 350px">
                                                <asp:Button ID="btnShowPlan" runat="server" Text="Show Plan" OnClick="btnShowPlan_Click"
                                                    CssClass="form-showplan" Style="float: left;" />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <asp:Button ID="btnApprove" runat="server" Text="Approve" CssClass="form-approve"
                                                    OnClick="btnApprove_Click" Style="float: left; margin-right: 5px;" />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <asp:Button ID="btnReject" runat="server" Text="Reject" CssClass="form-reject" Style="float: left;
                                                    margin-right: 5px;" OnClick="btnReject_Click" />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <asp:Button ID="btncancel" runat="server" Text="Reset" CssClass="form-reset" OnClick="btncancel_Click"
                                                    Style="margin-top: -12px;" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <div id="errorDiv">
                                                    <asp:Label ID="lblError" runat="server" ClientIDMode="Static" />
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    <table style="float: right; margin-top: -11px;">
                                        <tr>
                                            <td valign="top">
                                                <div style="padding: 0px 0px 5px 0px; font-size: 14px; font-weight: bold; text-decoration: underline;">
                                                    Pending Plan List</div>
                                                <asp:GridView ID="GridView1" runat="server" CssClass="mGrid" DataKeyNames="EmployeeId,TiemStamp2"
                                                    AutoGenerateColumns="False" AllowPaging="True" GridLines="None" OnRowCommand="GridView1_RowCommand">
                                                    <AlternatingRowStyle CssClass="mGridatt" />
                                                    <Columns>
                                                        <asp:BoundField DataField="EmployeeName" HeaderText="FMO Name" ItemStyle-Width="250">
                                                            <ItemStyle Width="250px" />
                                                        </asp:BoundField>
                                                        <asp:BoundField DataField="TiemStamp" HeaderText="Planing Date" ItemStyle-Width="100">
                                                            <ItemStyle Width="100px" />
                                                        </asp:BoundField>
                                                        <asp:TemplateField>
                                                            <ItemTemplate>
                                                                <asp:LinkButton ID="lnkEdit" runat="server" CausesValidation="false" ClientIDMode="Static"
                                                                    CommandArgument="<%# Container.DataItemIndex %>">View</asp:LinkButton>
                                                            </ItemTemplate>
                                                        </asp:TemplateField>
                                                    </Columns>
                                                </asp:GridView>
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
                <div class="divgrid">
                    <%--<obout:Grid ID="Grid1" runat="server" AllowAddingRecords="False" AllowFiltering="True"
                        AllowPageSizeSelection="False" AllowPaging="False" AutoGenerateColumns="False"
                        FolderStyle="../Styles/GridCss" Width="250" OnRowDataBound="Grid1_RowDataBound"
                        ViewStateMode="Enabled" PageSize="0" AllowSorting="false" OnDataBound="Grid1_DataBound">
                        <Columns>
                            <obout:Column DataField="PlanningId" SortExpression="PlanningId" Visible="false" />
                            <obout:Column DataField="EmployeeId" HeaderText="EmployeeId" SortExpression="EmployeeId"
                                Visible="false" />
                            <obout:Column DataField="DoctorId" HeaderText="DoctorId" SortExpression="DoctorId"
                                Visible="false" />
                            <obout:Column DataField="DoctorName" HeaderText="Doctor Name" SortExpression="DoctorName"
                                Width="175px" Wrap="true" />
                            <obout:Column DataField="ClassId" HeaderText="ClassId" SortExpression="ClassId" Visible="false" />
                            <obout:Column DataField="ClassName" HeaderText="Class" SortExpression="DR Class"
                                Width="50" />
                            <obout:Column DataField="LevelId" HeaderText="LevelId" SortExpression="LevelId" Visible="false" />
                            <obout:Column DataField="DoctorBrick" HeaderText="Brick" SortExpression="DoctorBrick"
                                Width="75" Wrap="true" />
                            <obout:Column DataField="TargetCall" HeaderText="Target" SortExpression="TargetCall"
                                Width="55" />
                            <obout:Column DataField="ActualCall" HeaderText="Actual" SortExpression="ActualCall"
                                Width="55" />
                            <obout:Column DataField="PendingCall" HeaderText="Pending" SortExpression="PendingCall"
                                Width="55" />
                            <obout:Column DataField="Total" HeaderText="Total" SortExpression="Total" Width="80" />
                            <obout:Column DataField="TiemStamp" SortExpression="TiemStamp" Visible="false" />
                            <obout:Column ID="Column3" runat="server" DataField="one" Width="50" HeaderText="1">
                                <TemplateSettings TemplateId="gt1" />
                            </obout:Column>
                            <obout:Column ID="Column2" HeaderText="2" runat="server" Width="50" DataField="two">
                                <TemplateSettings TemplateId="gt2" />
                            </obout:Column>
                            <obout:Column ID="Column1" HeaderText="3" runat="server" Width="50" DataField="three">
                                <TemplateSettings TemplateId="gt3" />
                            </obout:Column>
                            <obout:Column ID="Column4" HeaderText="4" runat="server" Width="50" DataField="four">
                                <TemplateSettings TemplateId="gt4" />
                            </obout:Column>
                            <obout:Column ID="Column5" HeaderText="5" runat="server" Width="50" DataField="five">
                                <TemplateSettings TemplateId="gt5" />
                            </obout:Column>
                            <obout:Column ID="Column6" HeaderText="6" runat="server" Width="50" DataField="six">
                                <TemplateSettings TemplateId="gt6" />
                            </obout:Column>
                            <obout:Column ID="Column7" HeaderText="7" runat="server" Width="50" DataField="seven">
                                <TemplateSettings TemplateId="gt7" />
                            </obout:Column>
                            <obout:Column ID="Column8" HeaderText="8" runat="server" Width="50" DataField="eight">
                                <TemplateSettings TemplateId="gt8" />
                            </obout:Column>
                            <obout:Column ID="Column9" HeaderText="9" runat="server" Width="50" DataField="nine">
                                <TemplateSettings TemplateId="gt9" />
                            </obout:Column>
                            <obout:Column ID="Column10" HeaderText="10" runat="server" Width="50" DataField="ten">
                                <TemplateSettings TemplateId="gt10" />
                            </obout:Column>
                            <obout:Column ID="Column11" HeaderText="11" runat="server" Width="50" DataField="Eleven">
                                <TemplateSettings TemplateId="gt11" />
                            </obout:Column>
                            <obout:Column ID="Column12" HeaderText="12" runat="server" Width="50" DataField="Twelve">
                                <TemplateSettings TemplateId="gt12" />
                            </obout:Column>
                            <obout:Column ID="Column13" HeaderText="13" runat="server" Width="50" DataField="Thirteen">
                                <TemplateSettings TemplateId="gt13" />
                            </obout:Column>
                            <obout:Column ID="Column14" HeaderText="14" runat="server" Width="50" DataField="Fourtheen">
                                <TemplateSettings TemplateId="gt14" />
                            </obout:Column>
                            <obout:Column ID="Column15" HeaderText="15" runat="server" Width="50" DataField="Fiftheen">
                                <TemplateSettings TemplateId="gt15" />
                            </obout:Column>
                            <obout:Column ID="Column16" HeaderText="16" runat="server" Width="50" DataField="Sixtheen">
                                <TemplateSettings TemplateId="gt16" />
                            </obout:Column>
                            <obout:Column ID="Column17" HeaderText="17" runat="server" Width="50" DataField="Seventeen">
                                <TemplateSettings TemplateId="gt17" />
                            </obout:Column>
                            <obout:Column ID="Column18" HeaderText="18" runat="server" Width="50" DataField="Eighteen">
                                <TemplateSettings TemplateId="gt18" />
                            </obout:Column>
                            <obout:Column ID="Column19" HeaderText="19" runat="server" Width="50" DataField="Nineteen">
                                <TemplateSettings TemplateId="gt19" />
                            </obout:Column>
                            <obout:Column ID="Column20" HeaderText="20" runat="server" Width="50" DataField="Twenty">
                                <TemplateSettings TemplateId="gt20" />
                            </obout:Column>
                            <obout:Column ID="Column21" HeaderText="21" runat="server" Width="50" DataField="TwentyOne">
                                <TemplateSettings TemplateId="gt21" />
                            </obout:Column>
                            <obout:Column ID="Column22" HeaderText="22" runat="server" Width="50" DataField="TwentyTwo">
                                <TemplateSettings TemplateId="gt22" />
                            </obout:Column>
                            <obout:Column ID="Column23" HeaderText="23" runat="server" Width="50" DataField="TwentyThree">
                                <TemplateSettings TemplateId="gt23" />
                            </obout:Column>
                            <obout:Column ID="Column24" HeaderText="24" runat="server" Width="50" DataField="TwentyFour">
                                <TemplateSettings TemplateId="gt24" />
                            </obout:Column>
                            <obout:Column ID="Column25" HeaderText="25" runat="server" Width="50" DataField="TwentyFive">
                                <TemplateSettings TemplateId="gt25" />
                            </obout:Column>
                            <obout:Column ID="Column26" HeaderText="26" runat="server" Width="50" DataField="TwentySix">
                                <TemplateSettings TemplateId="gt26" />
                            </obout:Column>
                            <obout:Column ID="Column27" HeaderText="27" runat="server" Width="50" DataField="TwentySeven">
                                <TemplateSettings TemplateId="gt27" />
                            </obout:Column>
                            <obout:Column ID="Column28" HeaderText="28" runat="server" Width="50" DataField="TwentyEight">
                                <TemplateSettings TemplateId="gt28" />
                            </obout:Column>
                            <obout:Column ID="Column29" HeaderText="29" runat="server" Width="50" DataField="TwentyNine">
                                <TemplateSettings TemplateId="gt29" />
                            </obout:Column>
                            <obout:Column ID="Column30" HeaderText="30" runat="server" Width="50" DataField="Thirty">
                                <TemplateSettings TemplateId="gt30" />
                            </obout:Column>
                            <obout:Column ID="Column31" HeaderText="31" runat="server" Width="75" DataField="ThirtyOne">
                                <TemplateSettings TemplateId="gt31" />
                            </obout:Column>
                        </Columns>
                        <Templates>
                            <obout:GridTemplate ID="gt1" runat="server">
                                <Template>
                                    <asp:CheckBox runat="server" ID="chk1" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt2" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk2" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt3" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk3" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt4" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk4" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt5" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk5" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt6" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk6" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt7" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk7" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt8" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk8" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt9" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk9" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt10" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk10" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt11" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk11" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt12" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk12" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt13" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk13" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt14" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk14" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt15" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk15" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt16" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk16" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt17" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk17" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt18" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk18" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt19" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk19" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt20" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk20" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt21" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk21" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt22" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk22" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt23" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk23" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt24" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk24" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt25" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk25" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt26" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk26" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt27" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk27" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt28" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk28" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt29" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk29" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt30" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk30" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                            <obout:GridTemplate ID="gt31" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:CheckBox ID="chk31" runat="server" Checked="<%# Convert.ToBoolean(Container.Value) %>"
                                        ToolTip="<%# Container.Value %>" />
                                </Template>
                            </obout:GridTemplate>
                        </Templates>
                    </obout:Grid>--%>
                    <asp:Panel ID="pnlgrid" Height="450px" ScrollBars="Vertical" Width="98%" runat="server">
                        <asp:GridView ID="Grid1" AutoGenerateColumns="False" runat="server" OnDataBound="Grid1_DataBound"
                            OnRowDataBound="Grid1_RowDataBound1" RowStyle-VerticalAlign="Bottom">
                            <Columns>
                                <asp:TemplateField SortExpression="PlanningId" Visible="False">
                                    <ItemTemplate>
                                        <asp:Label ID="LabPlanningid" runat="server" Text='<%# Bind("PlanningId") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="EmployeeId" SortExpression="EmployeeId" Visible="False">
                                    <ItemTemplate>
                                        <asp:Label ID="Label2" runat="server" Text='<%# Bind("EmployeeId") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="DoctorId" SortExpression="DoctorId" Visible="False">
                                    <ItemTemplate>
                                        <asp:Label ID="labDoctorId" runat="server" Text='<%# Bind("DoctorId") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Doctor Name" SortExpression="DoctorName">
                                    <ItemTemplate>
                                        <asp:Label ID="Label10" runat="server" Text='<%# Bind("DoctorName") %>'></asp:Label>
                                    </ItemTemplate>
                                    <HeaderStyle Width="157px" />
                                    <ItemStyle Width="157px" Wrap="True" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="ClassId" Visible="False">
                                    <ItemTemplate>
                                        <asp:Label ID="Label4" runat="server" Text='<%# Bind("ClassId") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Class" SortExpression="DR Class">
                                    <ItemTemplate>
                                        <asp:Label ID="Label9" runat="server" Text='<%# Bind("ClassName") %>'></asp:Label>
                                    </ItemTemplate>
                                    <HeaderStyle Width="66px" />
                                    <ItemStyle Width="66px" Wrap="True" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="LevelId" SortExpression="LevelId" Visible="False">
                                    <ItemTemplate>
                                        <asp:Label ID="Label5" runat="server" Text='<%# Bind("LevelId") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Brick" SortExpression="DoctorBrick">
                                    <ItemTemplate>
                                        <asp:Label ID="Label6" runat="server" Text='<%# Bind("DoctorBrick") %>'></asp:Label>
                                    </ItemTemplate>
                                    <HeaderStyle Width="75px" />
                                    <ItemStyle Width="75px" Wrap="True" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Target" HeaderStyle-Width="49" SortExpression="TargetCall">
                                    <HeaderStyle Width="20px" />
                                    <ItemStyle Width="20px" />
                                    <ItemTemplate>
                                        <asp:Label ID="lblTargetcall" runat="server" Text='<%# Bind("TargetCall") %>'></asp:Label>
                                    </ItemTemplate>
                                    <HeaderStyle Width="49px" />
                                    <ItemStyle Width="49px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Actual" SortExpression="ActualCall">
                                    <ItemTemplate>
                                        <asp:Label ID="labActualcall" runat="server" Text='<%# Bind("ActualCall") %>'></asp:Label>
                                    </ItemTemplate>
                                    <HeaderStyle Width="49px" />
                                    <ItemStyle Width="49px" Wrap="True" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Pending" HeaderStyle-Width="49" SortExpression="Pending">
                                    <ItemTemplate>
                                        <asp:Label ID="lblpending" runat="server" Text='<%# Bind("PendingCall") %>' Width="49"></asp:Label>
                                    </ItemTemplate>
                                    <HeaderStyle Width="49px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Total" HeaderStyle-Width="90" SortExpression="Total">
                                    <ItemTemplate>
                                        <asp:Label ID="lblTotal" runat="server" Text='<%# Bind("Total") %>'></asp:Label>
                                    </ItemTemplate>
                                    <HeaderStyle Width="90px" />
                                    <ItemStyle Width="75px" />
                                </asp:TemplateField>
                                <asp:TemplateField SortExpression="TiemStamp" Visible="False">
                                    <ItemTemplate>
                                        <asp:Label ID="Label8" runat="server" Text='<%# Bind("TiemStamp") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="1">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk1" runat="server" Checked='<%# Bind("one") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="2">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk2" runat="server" Checked='<%# Bind("two") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="3">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk3" runat="server" Checked='<%# Bind("three") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="4">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk4" runat="server" Checked='<%# Bind("four") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="5">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk5" runat="server" Checked='<%# Bind("five") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="6">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk6" runat="server" Checked='<%# Bind("six") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="7">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk7" runat="server" Checked='<%# Bind("seven") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="8">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk8" runat="server" Checked='<%# Bind("eight") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="9">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk9" runat="server" Checked='<%# Bind("nine") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="10">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk10" runat="server" Checked='<%# Bind("ten") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="11">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk11" runat="server" Checked='<%# Bind("eleven") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="12">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk12" runat="server" Checked='<%# Bind("twelve") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="13">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk13" runat="server" Checked='<%# Bind("thirteen") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="14">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk14" runat="server" Checked='<%# Bind("Fourtheen") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="15">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk15" runat="server" Checked='<%# Bind("Fiftheen") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="16">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk16" runat="server" Checked='<%# Bind("Sixtheen") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="17">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk17" runat="server" Checked='<%# Bind("Seventeen") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="18">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk18" runat="server" Checked='<%# Bind("Eighteen") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="19">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk19" runat="server" Checked='<%# Bind("Nineteen") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="20">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk20" runat="server" Checked='<%# Bind("Twenty") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="21">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk21" runat="server" Checked='<%# Bind("TwentyOne") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="22">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk22" runat="server" Checked='<%# Bind("TwentyTwo") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="23">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk23" runat="server" Checked='<%# Bind("TwentyThree") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="24">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk24" runat="server" Checked='<%# Bind("TwentyFour") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="25">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk25" runat="server" Checked='<%# Bind("TwentyFive") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="26">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk26" runat="server" Checked='<%# Bind("TwentySix") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="27">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk27" runat="server" Checked='<%# Bind("TwentySeven") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="28">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk29" runat="server" Checked='<%# Bind("TwentyEight") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="29">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk28" runat="server" Checked='<%# Bind("TwentyNine") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="30">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk30" runat="server" Checked='<%# Bind("Thirty") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Width="20" HeaderText="31">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="chk31" runat="server" Checked='<%# Bind("ThirtyOne") %>' />
                                    </ItemTemplate>
                                    <ItemStyle Width="20px" />
                                </asp:TemplateField>
                            </Columns>
                            <HeaderStyle CssClass="header" Height="34px" />
                            <RowStyle VerticalAlign="Bottom" />
                        </asp:GridView>
                    </asp:Panel>
                    <cc1:PagerV2_8 ID="PagerV2_1" Visible="false" runat="server" OnCommand="PagerV2_1_Command" />
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</asp:Content>

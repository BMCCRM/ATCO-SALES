<%@ Page Title="SMS Monitoring" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="DataScreen.aspx.cs" Inherits="PocketDCR2.Reports.DataScreen" %>

<%@ Register Assembly="ASPnetPagerV2_8" Namespace="ASPnetControls" TagPrefix="cc1" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register TagPrefix="obout" Namespace="Obout.Grid" Assembly="obout_Grid_NET" %>
<%@ Register TagPrefix="obout" Namespace="Obout.Interface" Assembly="obout_Interface" %>
<%@ Register TagPrefix="obout" Namespace="OboutInc.Calendar2" Assembly="obout_Calendar2_Net" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        .ob_gC div.ob_gCc2, .ob_gCW div.ob_gCc2, .ob_gC div.ob_gCc2C, .ob_gCW div.ob_gCc2C, .ob_gC div.ob_gCc2R, .ob_gCW div.ob_gCc2R
        {
            padding: 0 0 0 5px !important;
        }
        
        .ob_gH .ob_gC div.ob_gCc2, .ob_gH .ob_gCW div.ob_gCc2
        {
            font-size: 13px !important;
        }
        #ContentPlaceHolder1_gvSuccessDCR_ob_gvSuccessDCRFooterContainer
        {
            display: none;
        }
        #ContentPlaceHolder1_gvError_ob_gvErrorFooterContainer
        {
            display: none;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional">
        <Triggers>
            <asp:AsyncPostBackTrigger ControlID="btnFilter" EventName="Click" />
            <asp:AsyncPostBackTrigger ControlID="btnRefresh" EventName="Click" />
            <asp:AsyncPostBackTrigger ControlID="ddlLevel1" EventName="SelectedIndexChanged" />
            <asp:AsyncPostBackTrigger ControlID="ddlLevel2" EventName="SelectedIndexChanged" />
            <asp:AsyncPostBackTrigger ControlID="ddlLevel3" EventName="SelectedIndexChanged" />
            <asp:AsyncPostBackTrigger ControlID="ddlLevel4" EventName="SelectedIndexChanged" />
            <asp:AsyncPostBackTrigger ControlID="ddlLevel5" EventName="SelectedIndexChanged" />
            <asp:AsyncPostBackTrigger ControlID="ddlLevel6" EventName="SelectedIndexChanged" />
            <asp:AsyncPostBackTrigger ControlID="pagererror" EventName="Command" />
            <asp:AsyncPostBackTrigger ControlID="pagersuccess" EventName="Command" />
        </Triggers>
        <ContentTemplate>
            <div style="float: left; width: 100%;">
                <div style="float: left; width: 85%; background-color: #E44C16; height: 0px; padding-top: 3px;
                    margin-top: 3px;">
                </div>
                <div style="float: left; width: 85%; font-size: 12px; background-color: #634329;
                    padding-top: 3px; color: #fff;">
                    <marquee height="20" scrollamount="2" onmouseover="this.stop();" onmouseout="this.start();"
                        scrolldelay="10">
                            <asp:Label ID="lblMessage" runat="server" ClientIDMode="Static"></asp:Label>
                        </marquee>
                    <div class="clear">
                    </div>
                </div>
                <div style="float: right; width: 14%; background-color: #FED300; height: 13px; margin-top: -13px;">
                </div>
                <div style="float: right; width: 14%; font-size: 12px; background-color: #634329;
                    height: 20px; padding-top: 3px; color: #fff; text-align: center;">
                </div>
            </div>
            <div style="padding: 5px 5px 5px 90%; display: none;">
                <asp:Button ID="btnRefresh" runat="server" Text="Refresh" ClientIDMode="Static" OnClick="btnRefresh_Click"
                    Width="100px" Height="30px" />
            </div>
            <div class="popup_head" style="width: 96%; display: none;">
                <h1>
                    Filter By
                </h1>
            </div>
            <div class="popup_row" style="width: 96%;">
                <asp:Label ID="lblError" runat="server" ClientIDMode="Static" CssClass="failureNotification" />
            </div>
            <div class="clear">
            </div>
            <div id="content-table-inner">
                <table border="0" width="100%" cellpadding="0" cellspacing="0">
                    <tr valign="top">
                        <td valign="top">
                            <!-- start id-form -->
                            <table border="0" cellpadding="10" cellspacing="0" id="id-fo" style="font-weight: bold">
                                <tr>
                                    <td>
                                        <asp:Label ID="lblLevel1" runat="server" ClientIDMode="Static" Text="[Level1 Name]" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblLevel2" runat="server" ClientIDMode="Static" Text="[Level2 Name]" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblLevel3" runat="server" ClientIDMode="Static" Text="[Level3 Name]" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblLevel4" runat="server" ClientIDMode="Static" Text="[Level4 Name]" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblLevel5" runat="server" ClientIDMode="Static" Text="[Level5 Name]" />
                                    </td>
                                    <td>
                                        <asp:Label ID="lblLevel6" runat="server" ClientIDMode="Static" Text="[Level6 Name]" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:DropDownList ID="ddlLevel1" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                            AutoPostBack="true" DataValueField="EmployeeId" DataTextField="EmployeeName"
                                            OnSelectedIndexChanged="ddlLevel1_SelectedIndexChanged" />
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
                            <div class="popup_row" style="width: 96%;">
                                <div class="column" style="width: 300px;">
                                    <h1>
                                        Starting Date
                                    </h1>
                                    <asp:TextBox ID="txtStartingDate" runat="server" ClientIDMode="Static" CssClass="inp-form" />
                                    <obout:Calendar ID="cStartingDate" runat="server" DatePickerImagePath="../Images/DatePicker/icon2.gif"
                                        DatePickerImageTooltip="Select Starting Date" DatePickerMode="true" TextBoxId="txtStartingDate" />
                                </div>
                                <div class="column" style="width: 300px;">
                                    <h1>
                                        Ending Date
                                    </h1>
                                    <asp:TextBox ID="txtEndingDate" runat="server" ClientIDMode="Static" CssClass="inp-form" />
                                    <obout:Calendar ID="cEndingDate" runat="server" TextBoxId="txtEndingDate" DatePickerImagePath="../Images/DatePicker/icon2.gif"
                                        DatePickerImageTooltip="Select Ending Date" DatePickerMode="true" />
                                </div>
                                <div class="column">
                                    <h1>
                                        &nbsp;&nbsp;&nbsp;
                                    </h1>
                                    <asp:Button ID="btnFilter" runat="server" ClientIDMode="Static" OnClick="btnFilter_Click"
                                        Text="Show SMS" />
                                </div>
                            </div>
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
            <asp:Panel ID="pnlSuccessDCR" runat="server" ScrollBars="Horizontal">
                <div id="divSuccessDCR" class="popup_row" style="width: 100%;">
                    <div class="popup_head" style="width: 100%;">
                        <h1>
                            Success Messages
                        </h1>
                    </div>
                    <obout:Grid ID="gvSuccessDCR" runat="server" Serialize="false" AutoGenerateColumns="false"
                        AllowSorting="false" AllowAddingRecords="false" AllowFiltering="true" AllowPaging="false"
                        PageSize="0" FolderStyle="../Styles/GridCss" Width="100%">
                        <Columns>
                            <obout:Column Width="125" DataField="EmployeeName" HeaderText="MR Name" SortExpression="EmployeeName"
                                Wrap="True" />
                            <%--<obout:Column Width="100" DataField="Level1Name" HeaderText="National" SortExpression="Level1Name" />
                                <obout:Column Width="100" DataField="Level2Name" HeaderText="Region" SortExpression="Level2Name" />--%>
                            <obout:Column Width="92" DataField="MobileNumber" HeaderText="Mobile No" SortExpression="MobileNumber" />
                            <obout:Column Width="75" DataField="VisitDateTime" HeaderText="Date" SortExpression="VisitDate" />
                            <obout:Column Width="100" DataField="DoctorName" HeaderText="Doc_Name" ItemStyle-HorizontalAlign="Left"
                                SortExpression="DoctorName" Wrap="true" />
                            <obout:Column DataField="P1" HeaderText="P1" Width="125" SortExpression="P1" Wrap="true" />
                            <obout:Column DataField="P2" HeaderText="P2" Width="125" SortExpression="P2" Wrap="true" />
                            <obout:Column DataField="P3" HeaderText="P3" Width="125" SortExpression="P3" Wrap="true" />
                            <obout:Column DataField="P4" HeaderText="P4" Width="125" SortExpression="P4" Wrap="true" />
                            <obout:Column DataField="S1" HeaderText="S1" Width="55" SortExpression="S1" Wrap="true" />
                            <obout:Column DataField="SQ1" HeaderText="Q1" Width="36" SortExpression="Q1" />
                            <obout:Column DataField="S2" HeaderText="S2" Width="55" SortExpression="S2" Wrap="true" />
                            <obout:Column DataField="SQ2" HeaderText="Q2" Width="36" SortExpression="Q2" />
                            <obout:Column DataField="S3" HeaderText="S3" Width="55" SortExpression="S3" Wrap="true" />
                            <obout:Column DataField="SQ3" HeaderText="Q3" Width="36" SortExpression="Q3" />
                            <obout:Column DataField="R1" HeaderText="R1" Width="36" SortExpression="R1" Wrap="true" />
                            <obout:Column DataField="R2" HeaderText="R2" Width="36" SortExpression="R2" Wrap="true" />
                            <obout:Column DataField="R3" HeaderText="R3" Width="36" SortExpression="R3" Wrap="true" />
                            <obout:Column DataField="G1" HeaderText="G1" Width="55" SortExpression="G1" Wrap="true" />
                            <%-- <obout:Column DataField="QG1" HeaderText="QG1" Width="36" SortExpression="QG1" />
                            <obout:Column DataField="G2" HeaderText="G2" Width="55" SortExpression="G2" Wrap="true" />
                            <obout:Column DataField="QG2" HeaderText="QG2" Width="36" SortExpression="QG2" />
                            <obout:Column DataField="JV1" HeaderText="ZSM" Width="100" SortExpression="JV1" />
                            <obout:Column DataField="JV2" HeaderText="RSM" Width="100" SortExpression="JV2" />
                            <obout:Column DataField="JV3" HeaderText="NSM" Width="100" SortExpression="JV3" />
                            <obout:Column DataField="JV4" HeaderText="HO" Width="100" SortExpression="JV4" />
                            --%>
                            <obout:Column DataField="VisitShift" HeaderText="VT" Width="38" SortExpression="VT" />
                            <%--<obout:Column DataField="FeedBack"  Width="90" HeaderText="Visit FeedBack" SortExpression="FeedBack" />--%>
                        </Columns>
                        <GroupingSettings AllowChanges="false" />
                    </obout:Grid>
                    <cc1:PagerV2_8 ID="pagersuccess" runat="server" NormalModePageCount="10" PageSize="25"
                        Width="100%" MaxSmartShortCutCount="0" SmartShortCutRatio="2" SmartShortCutThreshold="15"
                        CssClass="PagerInfoCell" OnCommand="pagersuccess_Command" />
                </div>
            </asp:Panel>
            <div class="clear">
                <br />
                <br />
            </div>
            <asp:Panel ID="Panel1" runat="server" ScrollBars="Horizontal">
                <div class="popup_row" style="width: 100%;">
                    <div class="popup_head" style="width: 100%;">
                        <h1>
                            Error Messages
                        </h1>
                    </div>
                    <obout:Grid ID="gvError" runat="server" Serialize="false" AutoGenerateColumns="false"
                        AllowAddingRecords="false" AllowFiltering="true" AllowSorting="true" AllowPaging="false"
                        PageSize="0" FolderStyle="../Styles/GridCss" Width="100%">
                        <Columns>
                            <obout:Column Width="130" DataField="MobileNumber" HeaderText="Mobile Number" SortExpression="MobileNumber" />
                            <obout:Column Width="550" DataField="MessageText" HeaderText="Message" SortExpression="MessageText"
                                Wrap="True" />
                            <obout:Column Width="350" DataField="MessageType" HeaderText="Message Type" SortExpression="MessageType"
                                Wrap="True" />
                            <obout:Column Width="250" DataField="ErrorText" HeaderText="Error" SortExpression="ErrorText"
                                Wrap="True" />
                            <obout:Column Width="250" DataField="CreatedDate" HeaderText="Created Date" SortExpression="CreatedDate"
                                Wrap="True" />
                        </Columns>
                        <GroupingSettings AllowChanges="false" />
                    </obout:Grid>
                    <cc1:PagerV2_8 ID="pagererror" runat="server" NormalModePageCount="10" PageSize="25"
                        Width="100%" MaxSmartShortCutCount="0" SmartShortCutRatio="2" SmartShortCutThreshold="15"
                        CssClass="PagerInfoCell" OnCommand="pagererror_Command" />
                    <asp:SqlDataSource ID="SqlDataSource1" runat="server"></asp:SqlDataSource>
                </div>
            </asp:Panel>
            <div class="clear">
                <br />
                <br />
            </div>
        </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>

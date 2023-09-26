<%@ Page Title="SMS Response" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="SMSResponse.aspx.cs" Inherits="PocketDCR2.Reports.SMSResponse" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="obout_Grid_NET" Namespace="Obout.Grid" TagPrefix="obout" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <Triggers>
        </Triggers>
        <ContentTemplate>
            <div class="page_heading">
                <h1>
                    <img alt="" src="../Images/Icon/1330776545_product-sales-report.png" />
                    SMS Response</h1>
            </div>
            <div class="popup_row" style="width: 96%;">
                <asp:Label ID="lblError" runat="server" ClientIDMode="Static" CssClass="failureNotification" />
            </div>
            <div id="content-table-inner" style="display:none";>
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
                            <table border="0" cellpadding="10" cellspacing="0" id="id-" style="font-weight: bold">
                                <tr>
                                    <td>
                                        Filter By Year - Month :
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:TextBox ID="txtDate" runat="server" ClientIDMode="Static" OnTextChanged="txtDate_TextChanged"
                                            AutoPostBack="true" CssClass="inp-form" />
                                        <asp:TextBoxWatermarkExtender ID="wTextDate" runat="server" ClientIDMode="Static"
                                            TargetControlID="txtDate" WatermarkText="Enter Year - Month" />
                                        <asp:CalendarExtender ID="cTextDate" runat="server" ClientIDMode="Static" OnClientHidden="onCalendarHidden"
                                            OnClientShown="onCalendarShown" BehaviorID="calendar1" Enabled="True" Format="MMMM-yyyy"
                                            TargetControlID="txtDate">
                                        </asp:CalendarExtender>
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
            <div style="float: left;">
                <obout:Grid ID="Grid1" runat="server" Serialize="false" AutoGenerateColumns="false"
                    AllowFiltering="true" AllowSorting="true" AllowPaging="true" AllowAddingRecords="false"
                    FolderStyle="../Styles/GridCss">
                    <Columns>
                        <obout:Column Width="125" DataField="SenderName" HeaderText="Sender Name" SortExpression="SenderName" />
                        <obout:Column Width="107" DataField="SenderNo" HeaderText="Sender No" SortExpression="SenderNo" />
                        <obout:Column Width="126" DataField="DestinationName" HeaderText="Destination Name"
                            SortExpression="DestinationName" />
                        <obout:Column Width="107" DataField="DesitnationNo" HeaderText="Receiver" SortExpression="DesitnationNo" />
                        <obout:Column Width="540" DataField="SmsText" HeaderText="Message" SortExpression="SmsText" />
                        <obout:Column Width="125" DataField="SmsStatus" HeaderText="SMS Response" SortExpression="SmsStatus" />
                        <obout:Column Width="170" DataField="SendingDate" HeaderText="Sending Date" SortExpression="SendingDate" />
                    </Columns>
                    <GroupingSettings AllowChanges="false" />
                </obout:Grid>
            </div>
        </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>

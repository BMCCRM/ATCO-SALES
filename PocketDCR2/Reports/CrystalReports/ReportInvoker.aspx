<%@ Page Title="CRM Reports" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="ReportInvoker.aspx.cs" Inherits="PocketDCR2.Reports.CrystalReports.ReportInvoker" %>

<%@ Register Assembly="CrystalDecisions.Web, Version=13.0.2000.0, Culture=neutral, PublicKeyToken=692fbea5521e1304"
    Namespace="CrystalDecisions.Web" TagPrefix="CR" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register TagPrefix="obout" Namespace="Obout.Interface" Assembly="obout_Interface" %>
<%@ Register TagPrefix="obout" Namespace="OboutInc.Calendar2" Assembly="obout_Calendar2_Net" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional">
            <Triggers>
                <asp:AsyncPostBackTrigger ControlID="ddlReports" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddl1" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddl2" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddl3" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddl4" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddl11" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddl22" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddl33" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddl44" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="btnGenerate" EventName="Click" />
            </Triggers>
            <ContentTemplate>
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../../Images/Icon/1330776545_product-sales-report.png" />
                        CRM Reports</h1>
                </div>
                <div class="clear">
                </div>
                <table border="0" cellpadding="10" cellspacing="0">
                    <tr valign="top">
                        <td valign="middle">
                            <b>Report Type : &nbsp;</b>
                            <br />
                            <br />
                            <asp:DropDownList ID="ddlReports" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                AppendDataBoundItems="true" OnSelectedIndexChanged="ddlReports_SelectedIndexChanged"
                                AutoPostBack="true">
                                <asp:ListItem Value="-1" Selected="True">Select Report</asp:ListItem>
                                <asp:ListItem Value="1">Daily Calls Report</asp:ListItem>
                                <asp:ListItem Value="2">Described Products</asp:ListItem>
                                <asp:ListItem Value="3">Detailed Products Frequency</asp:ListItem>
                                <asp:ListItem Value="18">Detailed Products Frequency By Division</asp:ListItem>
                                <asp:ListItem Value="4">Incoming SMS Summary</asp:ListItem>
                                <asp:ListItem Value="5">JV By Class</asp:ListItem>
                                <asp:ListItem Value="6">KPI By Class</asp:ListItem>
                                <asp:ListItem Value="7">Message Count</asp:ListItem>
                                <asp:ListItem Value="8">Monthly Visit Analysis</asp:ListItem>
                                <asp:ListItem Value="9">MR SMS Accuracy</asp:ListItem>
                                <asp:ListItem Value="10">MR Doctors</asp:ListItem>
                                <asp:ListItem Value="11">MRs List</asp:ListItem>
                                <asp:ListItem Value="12">Sample Issued To Doctor</asp:ListItem>
                                <asp:ListItem Value="13">SMS Status</asp:ListItem>
                                <asp:ListItem Value="14">Visit By Time</asp:ListItem>
                                <asp:ListItem Value="15">Detailed JV Report</asp:ListItem>
                                <asp:ListItem Value="16" Enabled="false">Sample Management Report</asp:ListItem>
                                <asp:ListItem Value="17">JV By Region</asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td valign="middle">
                            <asp:TextBox ID="txtShowReport" runat="server" Visible="false"></asp:TextBox>
                            <asp:Button ID="btnGenerate" runat="server" ClientIDMode="Static" OnClick="btnGenerate_Click"
                                Text="Generate Report" CssClass="form-Greport" />
                            <asp:Button ID="BtnEmail" CssClass="send_via_email" runat="server" Visible="false"
                                Text="Send As Email" OnClick="BtnEmail_Click" />
                            <br />
                        </td>
                    </tr>
                </table>
                <table id="tblGHL" runat="server" border="0" cellpadding="10" cellspacing="0">
                    <tr valign="top">
                        <td valign="middle" colspan="3">
                            <b>GEOGRAPHICAL HIERARCHY</b>
                        </td>
                    </tr>
                    <tr>
                        <td id="col1" runat="server">
                            <b>
                                <asp:Label ID="lblLevel1" runat="server" ClientIDMode="Static" Text="[Level1 Name]" /></b>
                            <br />
                            <asp:DropDownList ID="ddl1" runat="server" ClientIDMode="Static" DataTextField="LevelName"
                                DataValueField="LevelId" CssClass="styledselect_form_1" OnSelectedIndexChanged="ddl1_SelectedIndexChanged"
                                AutoPostBack="true">
                            </asp:DropDownList>
                        </td>
                        <td id="col2" runat="server">
                            <b>
                                <asp:Label ID="lblLevel2" runat="server" ClientIDMode="Static" Text="[Level2 Name]" /></b>
                            <br />
                            <asp:DropDownList ID="ddl2" runat="server" ClientIDMode="Static" DataTextField="LevelName"
                                DataValueField="LevelId" CssClass="styledselect_form_1" OnSelectedIndexChanged="ddl2_SelectedIndexChanged"
                                AutoPostBack="true">
                            </asp:DropDownList>
                        </td>
                        <td id="col3" runat="server">
                            <b>
                                <asp:Label ID="lblLevel3" runat="server" ClientIDMode="Static" Text="[Level3 Name]" /></b>
                            <br />
                            <asp:DropDownList ID="ddl3" runat="server" ClientIDMode="Static" DataTextField="LevelName"
                                DataValueField="LevelId" CssClass="styledselect_form_1" OnSelectedIndexChanged="ddl3_SelectedIndexChanged"
                                AutoPostBack="true">
                            </asp:DropDownList>
                        </td>
                        <td id="col4" runat="server">
                            <b>
                                <asp:Label ID="lblLevel4" runat="server" ClientIDMode="Static" Text="[Level4 Name]" /></b>
                            <br />
                            <asp:DropDownList ID="ddl4" runat="server" ClientIDMode="Static" DataTextField="LevelName"
                                DataValueField="LevelId" CssClass="styledselect_form_1" OnSelectedIndexChanged="ddl4_SelectedIndexChanged"
                                AutoPostBack="true">
                            </asp:DropDownList>
                        </td>
                    </tr>
                </table>
                <table id="tblUHL" runat="server" border="0" cellpadding="10" cellspacing="0">
                    <tr valign="top">
                        <td valign="middle">
                            <b>USER HIERARCHY</b>
                        </td>
                    </tr>
                    <tr>
                        <td id="col11" runat="server">
                            <b>
                                <asp:Label ID="lblLevel11" runat="server" ClientIDMode="Static" Text="[Level1 Manager Name]" /></b><br />
                            <asp:DropDownList ID="ddl11" runat="server" ClientIDMode="Static" DataTextField="EmployeeName"
                                DataValueField="EmployeeId" CssClass="styledselect_form_1" OnSelectedIndexChanged="ddl11_SelectedIndexChanged"
                                AutoPostBack="true">
                            </asp:DropDownList>
                        </td>
                        <td id="col22" runat="server">
                            <b>
                                <asp:Label ID="lblLevel22" runat="server" ClientIDMode="Static" Text="[Level2 Manager Name]" /></b><br />
                            <asp:DropDownList ID="ddl22" runat="server" ClientIDMode="Static" DataTextField="EmployeeName"
                                DataValueField="EmployeeId" CssClass="styledselect_form_1" OnSelectedIndexChanged="ddl22_SelectedIndexChanged"
                                AutoPostBack="true">
                            </asp:DropDownList>
                        </td>
                        <td id="col33" runat="server">
                            <b>
                                <asp:Label ID="lblLevel33" runat="server" ClientIDMode="Static" Text="[Level2 Manager Name]" />
                            </b>
                            <br />
                            <asp:DropDownList ID="ddl33" runat="server" ClientIDMode="Static" DataTextField="EmployeeName"
                                DataValueField="EmployeeId" CssClass="styledselect_form_1" OnSelectedIndexChanged="ddl33_SelectedIndexChanged"
                                AutoPostBack="true">
                            </asp:DropDownList>
                        </td>
                        <td id="col44" runat="server">
                            <b>
                                <asp:Label ID="lblLevel44" runat="server" ClientIDMode="Static" Text="[Level2 Manager Name]" /></b><br />
                            <asp:DropDownList ID="ddl44" runat="server" ClientIDMode="Static" DataTextField="EmployeeName"
                                DataValueField="EmployeeId" CssClass="styledselect_form_1" OnSelectedIndexChanged="ddl44_SelectedIndexChanged"
                                AutoPostBack="true">
                            </asp:DropDownList>
                        </td>
                    </tr>
                </table>
                <table id="tblFilter" runat="server" border="0" cellpadding="10" cellspacing="0">
                    <tr valign="top">
                        <td valign="middle">
                            <b>Filter By</b>
                        </td>
                    </tr>
                    <tr>
                        <td id="tdDoctor" runat="server">
                            <b>Doctor : </b>
                            <br />
                            <asp:DropDownList ID="ddlDoctor" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                DataTextField="DoctorName" DataValueField="DoctorId">
                            </asp:DropDownList>
                        </td>
                        <td id="tdJointVisit" runat="server">
                            <b>Joint Visit : </b>
                            <br />
                            <asp:DropDownList ID="ddlJointVisit" runat="server" AppendDataBoundItems="true" ClientIDMode="Static"
                                CssClass="styledselect_form_1">
                                <asp:ListItem Selected="True" Value="0">All</asp:ListItem>
                                <asp:ListItem Value="1">Joint</asp:ListItem>
                                <asp:ListItem Value="2">Un-Joint</asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td id="tdProduct" runat="server">
                            <b>SKU : </b>&nbsp;
                            <asp:DropDownList ID="ddlProduct" runat="server" ClientIDMode="Static" CssClass="styledselect_form_1"
                                DataTextField="SkuName" DataValueField="SkuId">
                            </asp:DropDownList>
                        </td>
                        <td id="tdVisitShift" runat="server">
                            <b>Visit Time : </b>
                            <br />
                            <asp:DropDownList ID="ddlVisitShift" runat="server" AppendDataBoundItems="true" ClientIDMode="Static"
                                CssClass="styledselect_form_1">
                                <asp:ListItem Selected="True" Value="0">ALL</asp:ListItem>
                                <asp:ListItem Value="1">M</asp:ListItem>
                                <asp:ListItem Value="2">E</asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td id="tdClass" runat="server">
                            <b>Class : </b>
                            <br />
                            <asp:DropDownList ID="ddlClass" runat="server" AppendDataBoundItems="True" ClientIDMode="Static"
                                CssClass="styledselect_form_1" DataSourceID="sdsClass" DataTextField="ClassName"
                                DataValueField="ClassId">
                                <asp:ListItem Selected="True" Value="-1">Select Class</asp:ListItem>
                            </asp:DropDownList>
                            <asp:SqlDataSource ID="sdsClass" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                SelectCommand="SELECT [ClassId], [ClassName] FROM [DoctorClasses] ORDER BY [ClassName]">
                            </asp:SqlDataSource>
                        </td>
                        <td id="tdstartdate" runat="server">
                            <b>Starting Date : </b>&nbsp;<br />
                            <asp:TextBox ID="txtStartingDate" runat="server" ClientIDMode="Static" CssClass="inp-form" />
                            <obout:Calendar ID="cStartingDate" runat="server" DatePickerImagePath="../../Images/DatePicker/icon2.gif"
                                DatePickerImageTooltip="Select Starting Date" DatePickerMode="true" />
                        </td>
                        <td id="tdendingdate" runat="server">
                            <b>Ending Date : </b>&nbsp;<br />
                            <asp:TextBox ID="txtEndingDate" runat="server" ClientIDMode="Static" CssClass="inp-form" />
                            <obout:Calendar ID="cEndingDate" runat="server" BeginDateCalendarId="cStartingDate"
                                DatePickerImagePath="../../Images/DatePicker/icon2.gif" DatePickerImageTooltip="Select Ending Date"
                                DatePickerMode="true" />
                        </td>
                    </tr>
                </table>
                <div>
                    <asp:Label ID="lblError" runat="server" ClientIDMode="Static" Font-Bold="true" />
                    <br />
                    <br />
                    <asp:HiddenField ID="ShowErrorAlert" runat="server" ClientIDMode="Static" />
                    <asp:HiddenField ID="HideErrorAlert" runat="server" ClientIDMode="Static" />
                    <asp:ModalPopupExtender ID="mpError" runat="server" CancelControlID="HideErrorAlert"
                        ClientIDMode="Static" TargetControlID="ShowErrorAlert" BackgroundCssClass=""
                        PopupControlID="pnlShowErrorAlert" />
                    <asp:Panel ID="pnlShowErrorAlert" runat="server" Style="display: none;" ClientIDMode="Static">
                        <div class="back-bgr">
                            <div class="email-pop">
                                <div class="email-title">
                                    Email Report
                                </div>
                                <div class="popupWindow">
                                    <br />
                                    To:
                                    <br />
                                    <asp:TextBox ID="txtTo" CssClass="inp-form" runat="server"></asp:TextBox>
                                    <br />
                                    Your email password :
                                    <br />
                                    <asp:TextBox ID="txtPass" runat="server" CssClass="inp-form" TextMode="Password"></asp:TextBox>
                                    <br />
                                    <asp:Button ID="ButtonExport" runat="server" Text="Send Email" CssClass="ButtonExport"
                                        OnClick="ButtonExport_Click" />
                                    <asp:Button ID="btnClose" runat="server" Text="Close" CausesValidation="false" CssClass="btnClose"
                                        OnClick="btnClose_Click" ClientIDMode="Static" />
                                </div>
                            </div>
                        </div>
                    </asp:Panel>
                </div>
                <div class="clear">
                </div>
                <div>
                    <%--<CR:CrystalReportViewer ID="CrystalReportViewer1" runat="server" AutoDataBind="true"
                        ToolPanelView="None" EnableDatabaseLogonPrompt="False" 
                        EnableParameterPrompt="False" Width="450px" HasCrystalLogo="False" 
                        PrintMode="ActiveX" />--%>
                    <CR:CrystalReportViewer ID="CrystalReportViewer1" runat="server" EnableDatabaseLogonPrompt="False"
                        EnableParameterPrompt="False" Width="450px" ToolPanelView="None"></CR:CrystalReportViewer>
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</asp:Content>

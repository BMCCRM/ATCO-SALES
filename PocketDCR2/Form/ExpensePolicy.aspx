<%@ Page Title="Expense Policy" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="ExpensePolicy.aspx.cs" Inherits="PocketDCR2.Form.ExpensePolicy" %>
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
    <script src="ExpensePolicy.js" type="text/javascript"></script>
    
<style type="text/css">
        .ajax__calendar_body {
    height: 160px !important;
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
                    <h1 style="padding-top: 10px;" >
                        <img alt="" src="../Images/Icon/Product.png" style="vertical-align:middle;" />
                        Expense Policy</h1>
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
                                    <span class="spacer">&nbsp;</span>List of Expense Policies</h2>
                            </div>
                            <div class="inner-left">
                                <obout:Grid ID="Grid1" runat="server" Serialize="false" AutoGenerateColumns="false"
                                    DataSourceID="SqlDataSource1" AllowFiltering="true" AllowSorting="true" AllowPaging="true"
                                    AllowAddingRecords="false" FolderStyle="../Styles/GridCss" AllowPageSizeSelection="false" OnRowDataBound="Grid1_RowDataBound">
                                    <Columns>
                                        <obout:Column Width="100" DataField="ID" HeaderText="ID" SortExpression="ID"
                                            Visible="false" />
                                        <obout:Column Width="150" DataField="EmployeeDesignationId" HeaderText="EmployeeDesignationId" SortExpression="EmployeeDesignationId"  Visible="false"/>
                                        <obout:Column Width="150" DataField="DesignationName" HeaderText="Designation" SortExpression="DesignationName" />
                                        <obout:Column Width="120" DataField="DailyAllowance" HeaderText="DailyAllowance" />
                                        <obout:Column Width="170" DataField="BikeAllowance" HeaderText="Additional City Allownce" />
                                        <obout:Column Width="170" DataField="OutStationAllowance_OutBack" HeaderText="OutStationAllowance(OutBack)" />
                                        <obout:Column Width="170" DataField="OutStationAllowance_NightStay" HeaderText="OutStationAllowance(NightStay)" />
                                        <obout:Column Width="120" DataField="MobileAllowance" HeaderText="MobileAllowance" />
                                         <obout:Column Width="120" DataField="MonthOfExpensePolicyStart" HeaderText="Expense Start Date" />
                                         <obout:Column Width="120" DataField="MonthOfExpensePolicyEnd" HeaderText="Expense End Date" />
                                        <obout:Column ID="colEdit" runat="server" Width="75">
                                <TemplateSettings TemplateId="EditedTemplate" />
                            </obout:Column>
                                        <obout:Column Width="100" AllowDelete="true" />
                                    </Columns>
                                    <ClientSideEvents OnBeforeClientEdit="oGrid_Edit" OnBeforeClientDelete="oGrid_Delete" />
                                    <GroupingSettings AllowChanges="false" />
                                    <Templates>
                            <obout:GridTemplate ID="EditedTemplate" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:LinkButton ID="LinkButton1" runat="server" class="ob_gAL">Edit</asp:LinkButton>
                                </Template>
                            </obout:GridTemplate>
                        </Templates>
                                </obout:Grid>
                                <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                    SelectCommand="SELECT Ep.ID, Ep.EmployeeDesignationId, EmployeeDesignations.DesignationName, Ep.DailyAllowance, Ep.BikeAllowance, Ep.DailyAddAllowance_BigCity, Ep.MonthlyAllowance_BigCity, Ep.OutStationAllowance_OutBack, Ep.OutStationAllowance_NightStay, Ep.DailyInstitutionBaseAllowance, Ep.MobileAllowance, Ep.InstitutionBaseAllowance, Ep.MonthlyAllowance, Ep.MonthlyAllowance_SameBaseTown, Ep.MonthlyAllowance_DifferentBaseTown, CONVERT (varchar, Ep.MonthOfExpensePolicyStart, 105) AS MonthOfExpensePolicyStart, CONVERT (varchar, Ep.MonthOfExpensePolicyEnd, 105) AS MonthOfExpensePolicyEnd FROM tbl_expensepolicy AS Ep INNER JOIN EmployeeDesignations ON Ep.EmployeeDesignationId = EmployeeDesignations.DesignationId">
                                </asp:SqlDataSource>
                            </div>
                        </div>
                        <div class="clear">
                        </div>
                    </div>
                    <div class="wrapper-inner-right" style="margin-left:0px !important">
                        <div class="designation">
                            <div class="inner-head">
                                <h2>
                                    <span class="spacer">&nbsp;</span>Add New Expense Policy</h2>
                            </div>
                            <div class="designation-inner">
                                <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                    <tr valign="top">
                                        <td>
                                            <!-- start id-form -->
                                            <table border="0" cellpadding="0" cellspacing="0" id="id-form">
                                                <%--<tr>
                                                    <th valign="top">
                                                        Level
                                                    </th>
                                                    <td>
                                                        <select id="ddlLevel" name="ddlLevel" class="styledselect_form_1">
                                                    <option value="-1">Select...</option>
                                                </select>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>--%>
                                                <tr>
                                                    <th valign="top">
                                                        Designation
                                                    </th>
                                                    <td>
                                                        <select id="ddlDesignation" name="ddlDesignation" class="styledselect_form_1">
                                                    <option value="-1">Select Designation</option>
                                                </select>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                         Start Month
                                                    </th>
                                                    <td>
                                                        <asp:TextBox ID="StxtDate" runat="server" ClientIDMode="Static" AutoPostBack="false"
                                                    CssClass="inp-form" />
                                                <asp:TextBoxWatermarkExtender ID="wTextDate" runat="server" ClientIDMode="Static"
                                                    TargetControlID="StxtDate" WatermarkText="Enter Month-Year" />
                                                <asp:CalendarExtender ID="ScTextDate" runat="server" ClientIDMode="Static" OnClientHidden="onCalendarHidden1"
                                                    OnClientShown="onCalendarShown1" BehaviorID="calendar1" Enabled="True" Format="MMMM-yyyy"
                                                    TargetControlID="StxtDate">
                                                </asp:CalendarExtender>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                         End Month
                                                    </th>
                                                    <td>
                                                        <asp:TextBox ID="EtxtDate" runat="server" ClientIDMode="Static" AutoPostBack="false"
                                                    CssClass="inp-form" />
                                                <asp:TextBoxWatermarkExtender ID="TextBoxWatermarkExtender1" runat="server" ClientIDMode="Static"
                                                    TargetControlID="EtxtDate" WatermarkText="Enter Month-Year" />
                                                <asp:CalendarExtender ID="EcTextDate" runat="server" ClientIDMode="Static" OnClientHidden="onCalendarHidden2"
                                                    OnClientShown="onCalendarShown2" BehaviorID="calendar2" Enabled="True" Format="MMMM-yyyy"
                                                    TargetControlID="EtxtDate">
                                                </asp:CalendarExtender>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th valign="top">
                                                        Daily Allowance
                                                    </th>
                                                    <td>
                                                        <input type="text" id="txtDailyAllowance" name="txtDailyAllowance"
                                                           onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 " maxlength="100" class="inp-form">
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                      Big City Daily Allowance : <%--Bike Allowance--%>
                                                    </th>
                                                    <td>
                                                        <input type="text" id="txtBikeAllowance" name="txtBikeAllowance"
                                                           onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 " maxlength="100" class="inp-form">
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                    Vehicle Maintenance
<%--    CNG Allowance--%>
                                                    </th>
                                                    <td>
                                                        <input type="text" id="txtCngAllowance" name="txtCngAllowance"
                                                           onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 " maxlength="100" class="inp-form">
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                       <%--Additional City Allownce :--%>
                                                        Hill Area Allowance :
                                                    </th>
                                                    <td>
                                                        <input type="text" id="txtDailyAddAllowance_BigCity" name="txtDailyAddAllowance_BigCity"
                                                           onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 " maxlength="100" class="inp-form">
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                        Monthly Allowance (Big City)
                                                    </th>
                                                    <td>
                                                        <input type="text" id="txtMonthlyAllowance_BigCity" name="txtMonthlyAllowance_BigCity"
                                                           onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 " maxlength="100" class="inp-form">
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                        Mileage Per Km
                                                    </th>
                                                    <td>
                                                        <input type="text" id="MilagePerKM" name="MilagePerKM"
                                                           onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 " maxlength="100" class="inp-form">
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                        Out Station Allowance (Out Back)
                                                    </th>
                                                    <td>
                                                        <input type="text" id="txtOutStationAllowance_OutBack" name="txtOutStationAllowance_OutBack"
                                                           onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 " maxlength="100" class="inp-form">
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                        Out Station Allowance (Night Stay)
                                                    </th>
                                                    <td>
                                                        <input type="text" id="txtOutStationAllowance_NightStay" name="txtOutStationAllowance_NightStay"
                                                           onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 " maxlength="100" class="inp-form">
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                      <%-- Special Allownce--%>
  <%--Daily Institution Allowance--%>
                                                        Institution Based Allowance:
                                                    </th>
                                                    <td>
                                                        <input type="text" id="txtDailyInstitutionAllowance" name="txtDailyInstitutionAllowance"
                                                           onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 " maxlength="100" class="inp-form">
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                        Mobile Allowance
                                                    </th>
                                                    <td>
                                                        <input type="text" id="txtMobileAllowance" name="txtMobileAllowance"
                                                           onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 " maxlength="100" class="inp-form">
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr style="display:none">
                                                    <th valign="top">
                                           
         Institution Base Allowance
                                                    </th>
                                                    <td>
                                                        <input type="text" id="txtInstitutionBaseAllowance" name="txtInstitutionBaseAllowance"
                                                           onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 " maxlength="100" class="inp-form">
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                        Medical + Misc Allowance
                                                    </th>
                                                    <td>
                                                        <input type="text" id="txtMonthlyAllowance" name="txtMonthlyAllowance"
                                                           onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 " maxlength="100" class="inp-form">
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                        Monthly Allowance (Same Town)
                                                    </th>
                                                    <td>
                                                        <input type="text" id="txtMonthlyAllowance_samebasetown" name="txtMonthlyAllowance_samebasetown"
                                                           onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 " maxlength="100" class="inp-form">
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                        Fuel Allowance
                                                    </th>
                                                    <td>
                                                        <input type="text" id="txtMonthlyAllowance_differentbasetown" name="txtMonthlyAllowance_differentbasetown"
                                                           onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 " maxlength="100" class="inp-form">
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                        Monthly Non Touring Allowance 
                                                    </th>
                                                    <td>
                                                        <input type="text" id="txtMonthlyNonTouringAllowance" name="txtMonthlyNonTouringAllowance"
                                                           onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 " maxlength="100" class="inp-form">
                                                        <span class="red">* </span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th valign="top">
                                                        
                                                    </th>
                                                    <td align="left">
                                                        <input id="btnCancel" name="btnCancel" type="button" class="form-reset" style="display:inline !important" />
                                                        &nbsp; &nbsp; &nbsp; &nbsp;
                                                        <input id="btnSave" name="btnSave" type="button" class="form-submit" style="display:inline !important" />
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


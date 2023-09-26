<%@ Page Title="FMO Calls Planning" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="MRPlan.aspx.cs" Inherits="PocketDCR2.Form.MRPlan" %>
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
        .dayname
        {
            float: left;
            top: -50px;
        }
        .ob_gHContWG .ob_gH .ob_gC, .ob_gHContWG .ob_gH .ob_gCW
        {
            background-image: url("../images/head.png") !important;
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
        }
        .header th
        {
            padding-top: 10px;
            padding-bottom: 10px;
            background: #dedede !important;
        }
    </style>
    <script language="javascript" type="text/javascript">

        function onCalendarShown() {

            var cal = $find("calendar1");
            cal._switchMode("months", true);

            if (cal._monthsBody) {
                for (var i = 0; i < cal._monthsBody.rows.length; i++) {
                    var row = cal._monthsBody.rows[i];
                    for (var j = 0; j < row.cells.length; j++) {
                        Sys.UI.DomEvent.addHandler(row.cells[j].firstChild, "click", call);
                    }
                }
            }
        }

        function onCalendarHidden() {
            var cal = $find("calendar1");

            if (cal._monthsBody) {
                for (var i = 0; i < cal._monthsBody.rows.length; i++) {
                    var row = cal._monthsBody.rows[i];
                    for (var j = 0; j < row.cells.length; j++) {
                        Sys.UI.DomEvent.removeHandler(row.cells[j].firstChild, "click", call);
                    }
                }
            }

        }

        function call(eventElement) {
            var target = eventElement.target;
            switch (target.mode) {
                case "month":
                    var cal = $find("calendar1");
                    cal._visibleDate = target.date;
                    cal.set_selectedDate(target.date);
                    cal._switchMonth(target.date);
                    cal._blur.post(true);
                    cal.raiseDateSelectionChanged();
                    break;
            }
        }

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional">
            <Triggers>
                <asp:AsyncPostBackTrigger ControlID="btnSave" EventName="Click" />
                <asp:AsyncPostBackTrigger ControlID="btnSubmit" EventName="Click" />
                <asp:AsyncPostBackTrigger ControlID="btnFilterPlan" EventName="Click" />
                <asp:AsyncPostBackTrigger ControlID="PagerV2_1" EventName="Command" />
            </Triggers>
            <ContentTemplate>
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/planning.png" />
                        FMO Calls Planning</h1>
                    <asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static" OnClick="btnRefresh_Click"
                        Style="display: none;" />
                    <input id="hdnMode" type="hidden" />
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
                                    <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                        <tr valign="top">
                                            <td valign="top">
                                                <!-- start id-form -->
                                                <table border="0" cellpadding="0" cellspacing="0" id="id-form" style="float: left">
                                                    <tr>
                                                        <td>
                                                            Filter By Year - Month :
                                                        </td>
                                                        <td>
                                                            Doctor Brick :
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
                                                        <td>
                                                            <asp:DropDownList ID="ddlBrick" runat="server" ClientIDMode="Static" DataTextField="LevelName"
                                                                DataValueField="LevelId" AppendDataBoundItems="true" CssClass="styledselect_form_1">
                                                                <asp:ListItem Value="-1" Selected="True">Select Brick</asp:ListItem>
                                                                <asp:ListItem Value="0">Show ALL</asp:ListItem>
                                                            </asp:DropDownList>
                                                        </td>
                                                        <td width="360px">
                                                            <asp:Button ID="btnFilterPlan" runat="server" ClientIDMode="Static" CssClass="form-showplan"
                                                                OnClick="btnFilterPlan_Click"  />
                                                            <span style="float: right; display: block; width: 180px; margin-left: 10px;">
                                                                <asp:Button ID="btnSubmit" runat="server" CssClass="formSubapp" OnClick="btnSubmit_Click" /></span>
                                                            <span style="float: right; display: block; width: 80px;">
                                                                <asp:Button ID="btnSave" runat="server" class="form-save" OnClick="btnSave_Click" /></span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td valign="top">
                                                            <asp:Label ID="labstatus" runat="server" Text="Plan Status" Visible="False"></asp:Label>
                                                            &nbsp;&nbsp; &nbsp;
                                                        </td>
                                                        <td valign="top" align="left">
                                                            <asp:Panel ID="pared" runat="server" Width="100" Height="24" BackColor="Red" Visible="True"
                                                                ToolTip="Plan Reject" ForeColor="White" Style="padding: 5px;">
                                                                Rejected Plan
                                                            </asp:Panel>
                                                            <asp:Panel ID="payellow" runat="server" Width="100" Height="24" BackColor="Yellow"
                                                                Visible="False" ToolTip="Plan pending" ForeColor="White" Style="padding: 5px;">
                                                                Pending Plan
                                                            </asp:Panel>
                                                            <asp:Panel ID="pangreen" runat="server" Width="100" Height="24" BackColor="Green"
                                                                Visible="False" ToolTip="Plan Approved" ForeColor="White" Style="padding: 5px;">
                                                                Approved Plan
                                                            </asp:Panel>
                                                        </td>
                                                        <td>
                                                        </td>
                                                        <td>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="4">
                                                            <div id="errorDiv">
                                                                <asp:Label ID="lblError" runat="server" ClientIDMode="Static" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <table border="0" cellpadding="0" cellspacing="0" id="Table1">
                                                </table>
                                                <table style="float: right; margin-top: -11px;">
                                                    <tr>
                                                        <td valign="top">
                                                            <asp:Label ID="lblReason" runat="server" ClientIDMode="Static" Text="Commente" Visible="False" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <asp:TextBox ID="txtReason" runat="server" ClientIDMode="Static" TextMode="MultiLine"
                                                                CssClass="form-textarea" ReadOnly="True" Enabled="False" Visible="False" />
                                                            <asp:Panel ID="pnlReason" runat="server">
                                                            </asp:Panel>
                                                        </td>
                                                    </tr>
                                                </table>
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
                    <div class="outer">
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
                    </div>
                    <cc1:PagerV2_8 ID="PagerV2_1" MaxSmartShortCutCount="3" PageSize="500" SmartShortCutRatio="2"
                        SmartShortCutThreshold="5" Visible="false" runat="server" OnCommand="PagerV2_1_Command" />
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
    <script type="text/javascript">
        function removeOption() {
            $(document).pageLoad(function () {
                var head = $('.header').html();
                $('.header').remove();
                $('#ContentPlaceHolder1_Grid1').append('<thead><tr class="header">' + head + '</tr></thead>');

            });
        };
    </script>
</asp:Content>

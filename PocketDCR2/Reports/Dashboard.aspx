<%@ Page Title="Dashboard" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="PocketDCR2.Reports.Dashboard" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="netchartdir" Namespace="ChartDirector" TagPrefix="chart" %>
<%@ Register TagPrefix="obout" Namespace="Obout.Grid" Assembly="obout_Grid_NET" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        #ContentPlaceHolder1_tblCalls
        {
            width: 100%;
        }
        #ContentPlaceHolder1_tblCalls td a
        {
            color: #EC8026;
        }
        .style1
        {
            color: #E44C16;
        }
        .style2
        {
            width: 3px;
        }
        .roundedPanel
        {
            width: 300px;
            background-color: #F5EBD7;
            color: white;
            font-weight: bold;
        }
        .style3
        {
            color: #FFFFFF;
            font-size: 13px;
            font-weight: bold;
        }
        .accordionHeader
        {
            border: 1px solid #2F4F4F;
            color: white;
            background-color: #634329;
            font-family: News Gothic MT Bold;
            font-size: 10px;
            font-weight: bold;
            padding: 5px;
            margin-top: 5px;
        }
        .accordionContent
        {
            background-color: #F5EBD7;
            border: 1px dashed #2F4F4F;
            border-top: none;
            padding: 5px;
            padding-top: 10px;
        }
        .style4
        {
            font-size: x-large;
        }
        .style6
        {
            font-size: small;
            font-weight: bold;
            color: White;
        }
        .style7
        {
            width: 70px;
            line-height: 30px;
        }
        .style8
        {
            width: 70px;
            font-weight: bold;
            line-height: 35px;
        }
        .style9
        {
            width: 70px;
            color: #FFFFFF;
            font-weight: bold;
            line-height: 30px;
        }
        .style12
        {
            color: #FFFFFF;
            font-weight: bold;
            width: 224px;
        }
        .content_outer
        {
            background-image: none;
        }
        #content
        {
            width: 100%;
        }
        .ob_gHContWG .ob_gH .ob_gC, .ob_gHContWG .ob_gH .ob_gCW, .ob_gNRM .ob_gCc1, .ob_gFCont, .ob_gR, .ob_gNRM, .ob_gBCont .ob_gCS, .ob_gBCont .ob_gCS_F
        {
            background: none !important;
        }
        
        .ob_gHR
        {
            background: #A28F7F !important;
            color: #fff !important;
        }
        .ob_gHContWG .ob_gH .ob_gC, .ob_gHContWG .ob_gH .ob_gCW
        {
            color: #fff !important;
        }
        
        #counter
        {
            font-weight: bold;
            font-family: courier new;
            font-size: 12pt;
            color: White;
        }
    </style>
    <script type="text/javascript">

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

        function OpenPopup(day, parameter1, Level3, Level4, Level5, Level6, employeeid) {
            //alert('Popup ' + parameter1 + ' for day :' + day);
            var ddlReport = document.getElementById("<%=txtDate.ClientID%>");
            //alert(ddlReport.value);

            if (parameter1 == "M") {
                //window.open("./Report_Calls.aspx?Day=" + day, "Calls", "status = 0, height = 850, width = 700, resizable = 1");
                window.showModalDialog("./Report_Calls.aspx?Day=" + day + "&Month=" + ddlReport.value + "&Level3=" + Level3 + "&Level4=" + Level4 + "&Level5=" + Level5 + "&Level6=" + Level6 + "&employeeid=" + employeeid, "Calls", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
            }
            else if (parameter1 == "C") {
                //window.open("./Report_MIO.aspx?Day=" + day, "Calls", "status = 0, height = 850, width = 700, resizable = 1");
                window.showModalDialog("./Report_MIO.aspx?Day=" + day + "&Month=" + ddlReport.value + "&Level3=" + Level3 + "&Level4=" + Level4 + "&Level5=" + Level5 + "&Level6=" + Level6 + "&employeeid=" + employeeid, "Calls", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
            }

            return false;
        }

        function ShowMRDetails() {
            //alert('test');
            var ddlReport = document.getElementById("<%=txtDate.ClientID%>");
            window.showModalDialog("./MRDaywiseCallDetails.aspx?Month=" + ddlReport.value + "&Rndm=" + Math.floor(Math.random() * 101), "Calls", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
            return false;
        }

        function ShowSMSCorrectnessReport(day, datasettype, value, Zone, MR, Level3id, Level4id, Level5id, Level6id, employeeid) {
            //alert('test');
            var ddlReport = document.getElementById("<%=txtDate.ClientID%>");
            window.showModalDialog("./SMSCorrectnessReport.aspx?Day=" + day + "&DataSetType=" + datasettype + "&Value=" + value + "&Zone=" + Zone + "&MR=" + MR + "&Month=" + ddlReport.value + "&Level3=" + Level3id + "&Level4=" + Level4id + "&Level5=" + Level5id + "&Level6=" + Level6id + "&employeeid=" + employeeid, "SMS Correctness Report", "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
            //window.open("./SMSCorrectnessReport.aspx?Day=" + day + "DataSetType=" + datasettype + "Value=" + value);
            //return false;
        }



    </script>
    <script type="text/javascript">
        var settimmer = 0;
        $(function () {
            window.setInterval(function () {
                var timeCounter = $("b[id=show-time]").html();
                var updateTime = eval(timeCounter) - eval(1);
                $("b[id=show-time]").html(updateTime);

                if (updateTime == 0) {
                    window.location.reload();
                }
            }, 1000);

        });
      
    </script>
    <%-- <script type="text/javascript">
        $(document).ready(function () {
            $("#btnClose").live("click", function () {
                location.reload();
            })
        })
      
    </script>--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content" style="margin-top: -14px;">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional">
            <Triggers>
                <asp:AsyncPostBackTrigger ControlID="ddlLevel1" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddlLevel2" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddlLevel3" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddlLevel3" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddlLevel4" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddlLevel5" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="ddlLevel6" EventName="SelectedIndexChanged" />
                <asp:AsyncPostBackTrigger ControlID="txtDate" EventName="TextChanged" />
                <asp:AsyncPostBackTrigger ControlID="agvMorning" EventName="RowCommand" />
            </Triggers>
            <ContentTemplate>
                <div style="float: left; width: 100%;">
                    <asp:HiddenField ID="ShowErrorAlert" runat="server" ClientIDMode="Static" />
                    <asp:HiddenField ID="HideErrorAlert" runat="server" ClientIDMode="Static" />
                    <asp:ModalPopupExtender ID="mpError" runat="server" CancelControlID="btnClose" ClientIDMode="Static"
                        TargetControlID="ShowErrorAlert" PopupControlID="pnlShowErrorAlert">
                    </asp:ModalPopupExtender>
                    <asp:Panel ID="pnlShowErrorAlert" runat="server" Style="display: none;" ClientIDMode="Static">
                        <div class="back-bgr">
                            <div class="dash-pop">
                                <div class="dash-title">
                                    Confirmation Window
                                </div>
                                <div class="jqmmsg">
                                    <asp:Label ID="labqqq" runat="server" Text="Label" Visible="false"></asp:Label>
                                    <br />
                                    <div style="border: solid 1px #D8D0C9;">
                                        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="false" CssClass="morning_view"
                                            BorderWidth="0px">
                                            <Columns>
                                                <asp:BoundField DataField="JV1" HeaderText="JV1" />
                                                <asp:BoundField DataField="JV2" HeaderText="JV2" />
                                                <asp:BoundField DataField="JV3" HeaderText="JV3" />
                                                <asp:BoundField DataField="JV4" HeaderText="JV4" />
                                            </Columns>
                                        </asp:GridView>
                                    </div>
                                    <input id="btnClose" type="button" value="OK" />
                                </div>
                            </div>
                        </div>
                    </asp:Panel>
                    <div style="float: left; width: 85%; background-color: #E44C16; height: 7px; padding-top: 3px;
                        margin-bottom: 3px; margin-top: 3px;">
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
                    <div style="float: right; width: 14%; background-color: #FED300; height: 10px; margin-bottom: 3px;
                        margin-top: -13px;">
                    </div>
                    <div style="float: right; width: 14%; font-size: 12px; background-color: #634329;
                        height: 20px; padding-top: 3px; color: #fff; text-align: center;">
                        <div id="my-timer">
                            Next refresh in <b id="show-time">300</b> seconds
                        </div>
                    </div>
                </div>
                <asp:Label ID="lblError" runat="server" ClientIDMode="Static" />
                <div style="width: 200px; float: right;">
                    <div class="clear">
                    </div>
                </div>
                <asp:Panel ID="pHeader" runat="server" CssClass="cpHeader" Visible="False">
                    <div style="padding-left: 25px; font-size: 14px; font-weight: bold; width: 100%;
                        cursor: pointer; background: #3E4E76; float: left; color: #fff; line-height: 30px;
                        margin-bottom: 10px;">
                        <asp:Label ID="lblText" runat="server" />
                    </div>
                    <div class="clear">
                    </div>
                </asp:Panel>
                <asp:Panel ID="pBody" runat="server" CssClass="cpBody">
                    <div id="divGrid" class="popup_box">
                        <table border="0" width="100%" cellpadding="0" cellspacing="0" id="content-table"
                            style="margin-top: 15px;">
                            <tr>
                                <th rowspan="3" class="sized">
                                    <img src="../images/form/side_shadowleft.jpg" width="20" height="200" alt="" />
                                </th>
                                <th class="topleft">
                                </th>
                                <td id="tbl-border-top">
                                    &nbsp;
                                </td>
                                <th class="topright">
                                </th>
                                <th rowspan="3" class="sized">
                                    <img src="../Images/Form/side_shadowright.jpg" width="20" height="200" alt="" />
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
                <table id="tblMain1" runat="server" border="0" width="100%" cellpadding="10" cellspacing="10">
                    <tr>
                        <td>
                            <table border="0" width="100%" cellpadding="10" cellspacing="10">
                                <tr>
                                    <td>
                                        <chart:WebChartViewer ID="wcvActuallCall" runat="server" />
                                    </td>
                                    <td>
                                        <chart:WebChartViewer ID="wcvPlannedVsActual" runat="server" />
                                    </td>
                                    <td>
                                        <chart:WebChartViewer ID="wcvVisitFrequency" runat="server" />
                                    </td>
                                </tr>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0" class="mGrid" style="display: none;
                                width: 100%;">
                                <tr>
                                    <th colspan="2">
                                        Summary
                                        <asp:GridView ID="GVSum" runat="server" AutoGenerateColumns="False" GridLines="None"
                                            CssClass="mGrid" CellPadding="2" Width="100%">
                                            <AlternatingRowStyle CssClass="mGridatt" />
                                            <Columns>
                                                <asp:TemplateField ShowHeader="False">
                                                    <ItemTemplate>
                                                        <asp:Label ID="lblTop5MR" runat="server" Text='<%# DataBinder.Eval (Container.DataItem, "Heading") %>' />
                                                    </ItemTemplate>
                                                    <ItemStyle Width="200px" />
                                                </asp:TemplateField>
                                                <asp:TemplateField ItemStyle-HorizontalAlign="Center" ItemStyle-Width="100" ShowHeader="False">
                                                    <ItemTemplate>
                                                        <asp:Label ID="lblTop5AvgCalls" runat="server" Text='<%# DataBinder.Eval (Container.DataItem, "Value") %>' />
                                                    </ItemTemplate>
                                                    <ItemStyle HorizontalAlign="Center" Width="100px" />
                                                </asp:TemplateField>
                                            </Columns>
                                            <HeaderStyle Font-Bold="True" />
                                            <PagerStyle BackColor="#616262" ForeColor="#fff" HorizontalAlign="Center" />
                                            <SortedAscendingCellStyle BackColor="#FAFAE7" />
                                            <SortedAscendingHeaderStyle BackColor="#DAC09E" />
                                            <SortedDescendingCellStyle BackColor="#E1DB9C" />
                                            <SortedDescendingHeaderStyle BackColor="#C2A47B" />
                                        </asp:GridView>
                                    </th>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="margin-top: -20px;">
                                <tr>
                                    <td>
                                        <chart:WebChartViewer ID="wcvDailyCallTrends" runat="server" />
                                    </td>
                                    <td valign="middle" align="center" width="250">
                                        <table style="text-align: center; font-family: 'News Gothic MT'; display: none; font-size: 10px;"
                                            width="300px">
                                            <tr>
                                                <td bgcolor="#A28F7F" valign="middle" class="style4" rowspan="4" style="text-align: center">
                                                </td>
                                                <td bgcolor="#A28F7F" class="style3" colspan="12" style="text-align: center">
                                                    JOINT VISITS
                                                </td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" colspan="4" style="text-align: center">
                                                    CLASS A
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" colspan="4" style="text-align: center">
                                                    CLASS B
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" colspan="4" style="text-align: center">
                                                    CLASS C
                                                </td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" colspan="2" style="text-align: center">
                                                    MOR
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" colspan="2" style="text-align: center">
                                                    EVE
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" colspan="2" style="text-align: center">
                                                    MOR
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" colspan="2" style="text-align: center">
                                                    EVE
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" colspan="2" style="text-align: center">
                                                    MOR
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" colspan="2" style="text-align: center">
                                                    EVE
                                                </td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" style="text-align: center">
                                                    MTD
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" style="text-align: center">
                                                    TD
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" style="text-align: center">
                                                    MTD
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" style="text-align: center">
                                                    TD
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" style="text-align: center">
                                                    MTD
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" style="text-align: center">
                                                    TD
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" style="text-align: center">
                                                    MTD
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" style="text-align: center">
                                                    TD
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" style="text-align: center">
                                                    MTD
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" style="text-align: center">
                                                    TD
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" style="text-align: center">
                                                    MTD
                                                </td>
                                                <td bgcolor="#A28F7F" style="font-family: News Gothic MT; font-size: 10px; font-weight: bold;
                                                    color: #FFFFFF;" style="text-align: center">
                                                    TD
                                                </td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#A28F7F" class="style5" style="font-size: 11px">
                                                    <asp:Label ID="lblRegion1" runat="server" Font-Bold="True" ForeColor="White" Font-Size="11pt"></asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblAMorMtdReg1" runat="server" Text="0"></asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblAMorTdReg1" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblAEveMtdReg1" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblAEveTdReg1" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblBMorMtdReg1" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblBMorTdReg1" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblBEveMtdReg1" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblBEveTdReg1" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblCMorMtdReg1" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblCMorTdReg1" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblCEveMtdReg1" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblCEveTdReg1" runat="server">0</asp:Label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#A28F7F" class="style5" style="font-size: 11px">
                                                    <asp:Label ID="lblRegion2" runat="server" Font-Bold="True" ForeColor="White" Font-Size="11pt"></asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblAMorMtdReg2" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblAMorTdReg2" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblAEveMtdReg2" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblAEveTdReg2" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblBMorMtdReg2" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblBMorTdReg2" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblBEveMtdReg2" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblBEveTdReg2" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblCMorMtdReg2" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblCMorTdReg2" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblCEveMtdReg2" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblCEveTdReg2" runat="server">0</asp:Label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#A28F7F" class="style5" style="font-size: 11px">
                                                    <asp:Label ID="lblRegion3" runat="server" Font-Bold="True" ForeColor="White" Font-Size="11pt"></asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblAMorMtdReg3" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblAMorTdReg3" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblAEveMtdReg3" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblAEveTdReg3" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblBMorMtdReg3" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblBMorTdReg3" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblBEveMtdReg3" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblBEveTdReg3" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblCMorMtdReg3" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblCMorTdReg3" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblCEveMtdReg3" runat="server">0</asp:Label>
                                                </td>
                                                <td style="font-family: 'News Gothic MT'; text-align: center; font-size: 10px; color: #000000">
                                                    <asp:Label ID="lblCEveTdReg3" runat="server">0</asp:Label>
                                                </td>
                                            </tr>
                                        </table>
                                        <chart:WebChartViewer ID="wcvAvgCall" runat="server" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table border="0">
                                <tr>
                                    <td>
                                        <b class="innerHead">Morning Joint Visits</b> <span>
                                            <div style="border: solid 1px #D8D0C9;">
                                                <asp:GridView ID="agvMorning" runat="server" AutoGenerateColumns="False" OnRowCommand="agvMorning_RowCommand"
                                                    CssClass="morning_view" BorderWidth="0px">
                                                    <Columns>
                                                        <asp:TemplateField HeaderText="SalesCallId" SortExpression="SalesCallId" Visible="False">
                                                            <ItemTemplate>
                                                                <asp:Label ID="labscid" runat="server" Text='<%# Bind("SalesCallId") %>'></asp:Label>
                                                            </ItemTemplate>
                                                        </asp:TemplateField>
                                                        <asp:TemplateField HeaderText="FMO" SortExpression="MIO">
                                                            <ItemTemplate>
                                                                <asp:LinkButton ID="LinkButton1" runat="server" Text='<%# Bind("MIO") %>' CommandName="popup"
                                                                    CommandArgument="<%# Container.DataItemIndex %>"> </asp:LinkButton>
                                                            </ItemTemplate>
                                                        </asp:TemplateField>
                                                        <asp:TemplateField HeaderText="Class" SortExpression="Class">
                                                            <ItemTemplate>
                                                                <asp:Label ID="labclass" runat="server" Text='<%# Bind("Class") %>'></asp:Label>
                                                            </ItemTemplate>
                                                        </asp:TemplateField>
                                                        <asp:TemplateField HeaderText="Visit Time" SortExpression="VisitTime">
                                                            <ItemTemplate>
                                                                <asp:Label ID="labvt" runat="server" Text='<%# Bind("VisitTime") %>'></asp:Label>
                                                            </ItemTemplate>
                                                        </asp:TemplateField>
                                                        <asp:TemplateField HeaderText="MTD" SortExpression="MTD">
                                                            <ItemTemplate>
                                                                <asp:Label ID="labmtd" runat="server" Text='<%# Bind("MTD") %>'></asp:Label>
                                                            </ItemTemplate>
                                                        </asp:TemplateField>
                                                        <asp:TemplateField HeaderText="TD" SortExpression="TD">
                                                            <ItemTemplate>
                                                                <asp:Label ID="labtd" runat="server" Text='<%# Bind("TD") %>'></asp:Label>
                                                            </ItemTemplate>
                                                        </asp:TemplateField>
                                                    </Columns>
                                                </asp:GridView>
                                                <%--<obout:Grid ID="gvMorning" runat="server" Serialize="false" AutoGenerateColumns="false"
                                                AllowFiltering="false" AllowSorting="true" AllowPageSizeSelection="false" AllowPaging="false"
                                                AllowAddingRecords="false" FolderStyle="../Styles/GridCss" ShowFooter="False">
                                                <Columns>
                                                    <obout:Column Width="125" DataField="SalesCallId" Visible="false" />
                                                    <obout:Column Width="125" DataField="MIO" HeaderText="MIO" SortExpression="MIO" />
                                                    <obout:Column Width="80" DataField="Class" HeaderText="Class" SortExpression="Class" />
                                                    <obout:Column Width="125" DataField="VisitTime" HeaderText="Visit Time" SortExpression="VisitTime" />
                                                    <obout:Column Width="70" DataField="MTD" HeaderText="MTD" SortExpression="MTD" />
                                                    <obout:Column Width="70" DataField="TD" HeaderText="TD" SortExpression="TD" />
                                                </Columns>
                                                <MasterDetailSettings LoadingMode="OnLoad" />
                                                <DetailGrids>
                                                    <obout:DetailGrid runat="server" ID="gvMorningChild" AutoGenerateColumns="false"
                                                        AllowAddingRecords="false" ShowFooter="true" AllowPageSizeSelection="false" AllowPaging="false"
                                                        FolderStyle="../Styles/GridCss" ForeignKeys="SalesCallId">
                                                        <Columns>
                                                            <obout:Column DataField="SalesCallId" HeaderText="SalesCallId" Visible="false">
                                                            </obout:Column>
                                                            <obout:Column DataField="CallVisitorId" HeaderText="CallVisitorId" Visible="false">
                                                            </obout:Column>
                                                            <obout:Column DataField="JV1" HeaderText="JV1" Width="100" Wrap="true">
                                                            </obout:Column>
                                                            <obout:Column DataField="JV2" HeaderText="JV2" Width="100" Wrap="true">
                                                            </obout:Column>
                                                            <obout:Column DataField="JV3" HeaderText="JV3" Width="100" Wrap="true">
                                                            </obout:Column>
                                                            <obout:Column DataField="JV4" HeaderText="JV4" Width="100" Wrap="true">
                                                            </obout:Column>
                                                        </Columns>
                                                        <MasterDetailSettings LoadingMode="OnLoad" />
                                                    </obout:DetailGrid>
                                                </DetailGrids>
                                            </obout:Grid>--%>
                                            </div>
                                        </span>
                                    </td>
                                    <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </td>
                                    <td>
                                        <b class="innerHead">Evening Joint Visits</b> <span>
                                            <div style="border: solid 1px #D8D0C9;">
                                                <asp:GridView ID="agvEvening" runat="server" AutoGenerateColumns="False" OnRowCommand="agvEvening_RowCommand"
                                                    CssClass="morning_view" BorderWidth="0px">
                                                    <Columns>
                                                        <asp:TemplateField HeaderText="SalesCallId" SortExpression="SalesCallId" Visible="False">
                                                            <ItemTemplate>
                                                                <asp:Label ID="labscid" runat="server" Text='<%# Bind("SalesCallId") %>'></asp:Label>
                                                            </ItemTemplate>
                                                        </asp:TemplateField>
                                                        <asp:TemplateField HeaderText="FMO" SortExpression="MIO">
                                                            <ItemTemplate>
                                                                <asp:LinkButton ID="LinkButton1" runat="server" Text='<%# Bind("MIO") %>' CommandName="popup"
                                                                    CommandArgument="<%# Container.DataItemIndex %>"> </asp:LinkButton>
                                                            </ItemTemplate>
                                                        </asp:TemplateField>
                                                        <asp:TemplateField HeaderText="Class" SortExpression="Class">
                                                            <ItemTemplate>
                                                                <asp:Label ID="labclass" runat="server" Text='<%# Bind("Class") %>'></asp:Label>
                                                            </ItemTemplate>
                                                        </asp:TemplateField>
                                                        <asp:TemplateField HeaderText="Visit Time" SortExpression="VisitTime">
                                                            <ItemTemplate>
                                                                <asp:Label ID="labvt" runat="server" Text='<%# Bind("VisitTime") %>'></asp:Label>
                                                            </ItemTemplate>
                                                        </asp:TemplateField>
                                                        <asp:TemplateField HeaderText="MTD" SortExpression="MTD">
                                                            <ItemTemplate>
                                                                <asp:Label ID="labmtd" runat="server" Text='<%# Bind("MTD") %>'></asp:Label>
                                                            </ItemTemplate>
                                                        </asp:TemplateField>
                                                        <asp:TemplateField HeaderText="TD" SortExpression="TD">
                                                            <ItemTemplate>
                                                                <asp:Label ID="labtd" runat="server" Text='<%# Bind("TD") %>'></asp:Label>
                                                            </ItemTemplate>
                                                        </asp:TemplateField>
                                                    </Columns>
                                                </asp:GridView>
                                                <%--<obout:Grid ID="gvEvening" runat="server" Serialize="false" AutoGenerateColumns="false"
                                                AllowFiltering="false" AllowSorting="true" AllowPaging="false" AllowPageSizeSelection="false"
                                                AllowAddingRecords="false" FolderStyle="../Styles/GridCss" ShowFooter="False">
                                                <Columns>
                                                    <obout:Column Width="125" DataField="SalesCallId" Visible="false" />
                                                    <obout:Column Width="125" DataField="MIO" HeaderText="MIO" SortExpression="MIO" />
                                                    <obout:Column Width="80" DataField="Class" HeaderText="Class" SortExpression="Class" />
                                                    <obout:Column Width="125" DataField="VisitTime" HeaderText="Visit Time" SortExpression="VisitTime" />
                                                    <obout:Column Width="70" DataField="MTD" HeaderText="MTD" SortExpression="MTD" />
                                                    <obout:Column Width="70" DataField="TD" HeaderText="TD" SortExpression="TD" />
                                                </Columns>
                                                <MasterDetailSettings LoadingMode="OnLoad" />
                                                <DetailGrids>
                                                    <obout:DetailGrid runat="server" ID="gvchildforevening" AutoGenerateColumns="false"
                                                        AllowAddingRecords="false" ShowFooter="true" AllowPageSizeSelection="false" AllowPaging="false"
                                                        FolderStyle="../Styles/GridCss" ForeignKeys="SalesCallId">
                                                        <Columns>
                                                            <obout:Column DataField="SalesCallId" HeaderText="SalesCallId" Visible="false">
                                                            </obout:Column>
                                                            <obout:Column DataField="CallVisitorId" HeaderText="CallVisitorId" Visible="false">
                                                            </obout:Column>
                                                            <obout:Column DataField="JV1" HeaderText="JV1" Width="100" Wrap="true">
                                                            </obout:Column>
                                                            <obout:Column DataField="JV2" HeaderText="JV2" Width="100" Wrap="true">
                                                            </obout:Column>
                                                            <obout:Column DataField="JV3" HeaderText="JV3" Width="100" Wrap="true">
                                                            </obout:Column>
                                                            <obout:Column DataField="JV4" HeaderText="JV4" Width="100" Wrap="true">
                                                            </obout:Column>
                                                        </Columns>
                                                        <MasterDetailSettings LoadingMode="OnLoad" />
                                                    </obout:DetailGrid>
                                                </DetailGrids>
                                            </obout:Grid>--%>
                                            </div>
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="margin-top: -20px;">
                                <tr>
                                    <td>
                                        <table id="tblCalls" enableviewstate="true" runat="server" border="0" style="background-color: #D8D0C9;
                                            border-bottom-width: medium; border-color: #D8D0C9">
                                            <tr>
                                                <td style="font-family: News Gothic MT; color: White" class="style8" bgcolor="#A28F7F">
                                                    <%--border-style: dashed;--%>
                                                    Day
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-family: News Gothic MT;" class="style7" bgcolor="#A28F7F">
                                                    <%--border-style: dashed"--%>
                                                    <span class="style6">Calls</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-family: News Gothic MT;" class="style9" bgcolor="#A28F7F">
                                                    <%--border-style: dashed"--%>
                                                    <asp:LinkButton ID="lbtnMRDetails" runat="server" Text="FMOs" ForeColor="White" OnClientClick="return ShowMRDetails();"></asp:LinkButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-family: News Gothic MT;" class="style9" bgcolor="#A28F7F">
                                                    <%--border-style: dashed"--%>Avg Calls
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr runat="server" id="top5mr">
                        <td>
                            <table border="0" width="100%" cellpadding="0" cellspacing="0" id="TOP_5_MEDICAL"
                                style="margin-top: -20px; border: 1px solid #c1c1c1;">
                                <tr bgcolor="#A28F7F" style="color: #FFFFFF; font-weight: bold;">
                                    <td>
                                        TOP 5 MEDICAL REPS
                                    </td>
                                    <td>
                                        BOTTOM 5 MEDICAL REPS
                                    </td>
                                </tr>
                                <tr id="gridtopbotm" runat="server">
                                    <td style="margin-right: 10px; padding: 5px;">
                                        <asp:GridView ID="gvTop5MR" runat="server" AutoGenerateColumns="False" GridLines="None"
                                            CssClass="mGrid1" CellPadding="2" EmptyDataText="No MR found!" Width="100%">
                                            <Columns>
                                                <asp:TemplateField HeaderText="MR">
                                                    <ItemTemplate>
                                                        <asp:Label ID="lblTop5MR" runat="server" Text='<%# DataBinder.Eval (Container.DataItem, "MR") %>' />
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Average Calls" ItemStyle-HorizontalAlign="Center">
                                                    <ItemTemplate>
                                                        <asp:Label ID="lblTop5AvgCalls" runat="server" Text='<%# DataBinder.Eval (Container.DataItem, "Avg") %>' />
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                            </Columns>
                                            <HeaderStyle Font-Bold="True" />
                                            <PagerStyle BackColor="#616262" ForeColor="#fff" HorizontalAlign="Center" />
                                            <SortedAscendingCellStyle BackColor="#FAFAE7" />
                                            <SortedAscendingHeaderStyle BackColor="#DAC09E" />
                                            <SortedDescendingCellStyle BackColor="#E1DB9C" />
                                            <SortedDescendingHeaderStyle BackColor="#C2A47B" />
                                        </asp:GridView>
                                    </td>
                                    <td style="padding: 5px;">
                                        <asp:GridView ID="gvBottom5MR" runat="server" AutoGenerateColumns="False" GridLines="None"
                                            CssClass="mGrid1" CellPadding="2" EmptyDataText="No MR found!" Width="100%">
                                            <Columns>
                                                <asp:TemplateField HeaderText="MR">
                                                    <ItemTemplate>
                                                        <asp:Label ID="lblBottom5MR" runat="server" Text='<%# DataBinder.Eval (Container.DataItem, "MR") %>' />
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Average Calls" ItemStyle-HorizontalAlign="Center">
                                                    <ItemTemplate>
                                                        <asp:Label ID="lblBottom5AvgCalls" runat="server" Text='<%# DataBinder.Eval (Container.DataItem, "Avg") %>' />
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                            </Columns>
                                            <HeaderStyle Font-Bold="True" />
                                            <PagerStyle BackColor="#616262" ForeColor="#ffffff" HorizontalAlign="Center" />
                                            <SortedAscendingCellStyle BackColor="#FAFAE7" />
                                            <SortedAscendingHeaderStyle BackColor="#DAC09E" />
                                            <SortedDescendingCellStyle BackColor="#E1DB9C" />
                                            <SortedDescendingHeaderStyle BackColor="#C2A47B" />
                                        </asp:GridView>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table border="0" width="100%" cellpadding="10" cellspacing="10">
                                <tr>
                                    <td align="center">
                                        <chart:WebChartViewer ID="wcvSMSCorrectness" runat="server" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table border="0" width="100%" cellpadding="10" cellspacing="10">
                                <tr>
                                    <td>
                                        <%-- Product Summary--%>
                                        <table class="mGrid" style="display: none">
                                            <tr>
                                                <td class="style2" width="112">
                                                    &nbsp;
                                                </td>
                                                <td align="center" bgcolor="#A28F7F" class="style4" colspan="2" style="text-align: center;
                                                    font-size: 11px;">
                                                    DETAILED&nbsp;
                                                </td>
                                                <td align="center" bgcolor="#A28F7F" class="style4" colspan="2" style="text-align: center;
                                                    font-size: 11px;">
                                                    SAMPLES
                                                </td>
                                                <td align="center" class="style2" colspan="0">
                                                    &nbsp;
                                                </td>
                                                <td class="style2" colspan="0">
                                                    &nbsp;
                                                </td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#A28F7F" class="style6" width="112">
                                                    PRODUCTS
                                                </td>
                                                <td align="center" bgcolor="#A28F7F" class="style6" style="text-align: center">
                                                    MTD
                                                </td>
                                                <td align="center" bgcolor="#A28F7F" class="style6" style="text-align: center">
                                                    TODAY
                                                </td>
                                                <td align="center" bgcolor="#A28F7F" class="style6" style="text-align: center;">
                                                    MTD
                                                </td>
                                                <td align="center" bgcolor="#A28F7F" class="style6" style="text-align: center;">
                                                    TODAY
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="112" style="border-bottom-style: dotted; border-bottom-width: 1px; border-bottom-color: #D8D0C9;
                                                    text-align: center;">
                                                    <asp:Label ID="lblP1" runat="server" ClientIDMode="Static" />
                                                    <%--<img alt="" src="Images/CaC.png" style="width: 112px; height: 28px" />--%>
                                                </td>
                                                <td align="center" style="text-align: center; border-bottom-style: dotted; border-bottom-width: 1px;
                                                    border-bottom-color: #D8D0C9;" valign="middle">
                                                    <asp:Label ID="lblCacMTDCalls" runat="server" Font-Names="News Gothic MT" CssClass="style5"
                                                        ForeColor="Black"></asp:Label>
                                                </td>
                                                <td align="center" style="text-align: center; border-bottom-style: dotted; border-bottom-width: 1px;
                                                    border-bottom-color: #D8D0C9;">
                                                    <asp:Label ID="lblCacTodayCalls" runat="server" Font-Names="News Gothic MT" CssClass="style5"
                                                        ForeColor="Black"></asp:Label>
                                                </td>
                                                <td align="center" style="text-align: center; border-bottom-style: dotted; border-bottom-width: 1px;
                                                    border-bottom-color: #D8D0C9;">
                                                    <asp:Label ID="lblCacMTDSamples" runat="server" Font-Names="News Gothic MT" CssClass="style5"
                                                        ForeColor="Black"></asp:Label>
                                                </td>
                                                <td align="center" style="text-align: center; border-bottom-style: dotted; border-bottom-width: 1px;
                                                    border-bottom-color: #D8D0C9;">
                                                    <asp:Label ID="lblCacTodaySamples" runat="server" Font-Names="News Gothic MT" CssClass="style5"
                                                        ForeColor="Black"></asp:Label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="112" style="border-bottom-style: dotted; border-bottom-width: 1px; border-bottom-color: #D8D0C9;
                                                    text-align: center;">
                                                    <asp:Label ID="lblP2" runat="server" ClientIDMode="Static" />
                                                    <%--<img alt="" src="Images/benefiber.jpg" style="width: 112px; height: 48px" />--%>
                                                </td>
                                                <td align="center" style="text-align: center; border-bottom-style: dotted; border-bottom-width: 1px;
                                                    border-bottom-color: #D8D0C9;">
                                                    <asp:Label ID="lblBFMTDCalls" runat="server" Font-Names="News Gothic MT" CssClass="style5"
                                                        ForeColor="Black"></asp:Label>
                                                </td>
                                                <td align="center" style="text-align: center; border-bottom-style: dotted; border-bottom-width: 1px;
                                                    border-bottom-color: #D8D0C9;">
                                                    <asp:Label ID="lblBFTodayCalls" runat="server" Font-Names="News Gothic MT" CssClass="style5"
                                                        ForeColor="Black"></asp:Label>
                                                </td>
                                                <td align="center" style="text-align: center; border-bottom-style: dotted; border-bottom-width: 1px;
                                                    border-bottom-color: #D8D0C9;">
                                                    <asp:Label ID="lblBFMTDSamples" runat="server" Font-Names="News Gothic MT" CssClass="style5"
                                                        ForeColor="Black"></asp:Label>
                                                </td>
                                                <td align="center" style="text-align: center; border-bottom-style: dotted; border-bottom-width: 1px;
                                                    border-bottom-color: #D8D0C9;">
                                                    <asp:Label ID="lblBFTodaySamples" runat="server" Font-Names="News Gothic MT" CssClass="style5"
                                                        ForeColor="Black"></asp:Label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="112" style="border-bottom-style: dotted; border-bottom-width: 1px; border-bottom-color: #D8D0C9;
                                                    text-align: center;">
                                                    <asp:Label ID="lblP3" runat="server" ClientIDMode="Static" />
                                                    <%--<img alt="" src="Images/tday.png" style="width: 112px; height: 32px" />--%>
                                                </td>
                                                <td align="center" style="text-align: center; border-bottom-style: dotted; border-bottom-width: 1px;
                                                    border-bottom-color: #D8D0C9;">
                                                    <asp:Label ID="lblTdMTDCalls" runat="server" CssClass="style5" ForeColor="Black"></asp:Label>
                                                </td>
                                                <td align="center" style="text-align: center; border-bottom-style: dotted; border-bottom-width: 1px;
                                                    border-bottom-color: #D8D0C9;">
                                                    <asp:Label ID="lblTdTodayCalls" runat="server" CssClass="style5" ForeColor="Black"></asp:Label>
                                                </td>
                                                <td align="center" style="text-align: center; border-bottom-style: dotted; border-bottom-width: 1px;
                                                    border-bottom-color: #D8D0C9;">
                                                    <asp:Label ID="lblTdMTDSamples" runat="server" CssClass="style5" ForeColor="Black"></asp:Label>
                                                </td>
                                                <td align="center" style="text-align: center; border-bottom-style: dotted; border-bottom-width: 1px;
                                                    border-bottom-color: #D8D0C9;">
                                                    <asp:Label ID="lblTdTodaySamples" runat="server" CssClass="style5" ForeColor="Black"></asp:Label>
                                                </td>
                                            </tr>
                                            <tr style="border-bottom-style: dotted; border-bottom-width: thin; border-bottom-color: #A28F7F">
                                                <td width="112" style="border-bottom-style: dotted; border-bottom-width: 1px; border-bottom-color: #D8D0C9;
                                                    text-align: center;">
                                                    <asp:Label ID="lblP4" runat="server" ClientIDMode="Static" />
                                                    <%--<img alt="" src="Images/voltral.png" style="width: 112px; height: 33px" />--%>
                                                </td>
                                                <td align="center" style="border-bottom-style: dotted; border-bottom-width: 1px;
                                                    border-bottom-color: #D8D0C9; text-align: center;">
                                                    <asp:Label ID="lblVtMTDCalls" runat="server" CssClass="style5" ForeColor="Black"></asp:Label>
                                                </td>
                                                <td align="center" style="border-bottom-style: dotted; border-bottom-width: 1px;
                                                    border-bottom-color: #D8D0C9; text-align: center;">
                                                    <asp:Label ID="lblVtTodayCalls" runat="server" CssClass="style5" ForeColor="Black"></asp:Label>
                                                </td>
                                                <td align="center" style="border-bottom-style: dotted; border-bottom-width: 1px;
                                                    border-bottom-color: #D8D0C9; text-align: center;">
                                                    <asp:Label ID="lblVtMTDSamples" runat="server" CssClass="style5" ForeColor="Black"></asp:Label>
                                                </td>
                                                <td align="center" style="border-bottom-style: dotted; border-bottom-width: 1px;
                                                    border-bottom-color: #D8D0C9; text-align: center;">
                                                    <asp:Label ID="lblVtTodaySamples" runat="server" CssClass="style5" ForeColor="Black"></asp:Label>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</asp:Content>

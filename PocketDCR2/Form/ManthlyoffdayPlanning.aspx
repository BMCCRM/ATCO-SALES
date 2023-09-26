<%@ Page Title="Calender Setup" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="ManthlyoffdayPlanning.aspx.cs" Inherits="PocketDCR2.Form.ManthlyoffdayPlanning" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
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
        <div class="page_heading">
            <h1>
                <img alt="" src="../Images/Icon/planning.png" />
                Calender Setup
                <asp:Label ID="Label3" runat="server" Text="Selected Month" Visible="False"></asp:Label>
            </h1>
        </div>
        <div>
            <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                <ContentTemplate>
                    <div id="divGrid" class="popup_box">
                        <table border="0" width="100%" cellpadding="0" cellspacing="0" id="content-table">
                            <tr>
                                <th rowspan="3" class="sized">
                                    <img src="../images/form/side_shadowleft.jpg" width="20" height="250" alt="" />
                                </th>
                                <th class="topleft">
                                </th>
                                <td id="tbl-border-top">
                                    &nbsp;
                                </td>
                                <th class="topright">
                                </th>
                                <th rowspan="3" class="sized">
                                    <img src="../Images/Form/side_shadowright.jpg" width="20" height="250" alt="" />
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
                                                    <table border="0" cellpadding="0" cellspacing="0" id="id-form">
                                                        <tr valign="top">
                                                            <th valign="top" style="font: 12px;">
                                                                <asp:Label ID="Label1" runat="server" Text="Select Month :"></asp:Label>
                                                            </th>
                                                            <td>
                                                                <asp:TextBox ID="TextBox1" runat="server" CssClass="inp-form" AutoPostBack="True"
                                                                    OnTextChanged="TextBox1_TextChanged"></asp:TextBox>
                                                                <asp:CalendarExtender ID="TextBox1_CalendarExtender" runat="server" OnClientHidden="onCalendarHidden"
                                                                    OnClientShown="onCalendarShown" BehaviorID="calendar1" Enabled="True" Format="MMMM-yyyy"
                                                                    TargetControlID="TextBox1">
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
                    <div class="divgrid">
                        <div style="position: fixed; top: 210px; right: 100px; z-index: 9999;">
                            <asp:Calendar ID="Calendar1" runat="server" Width="350px" Height="190px" OnSelectionChanged="Calendar1_SelectionChanged"
                                BackColor="White" BorderColor="White" BorderWidth="1px" Font-Names="Verdana"
                                Font-Size="9pt" ForeColor="Black" NextPrevFormat="FullMonth">
                                <DayHeaderStyle Font-Bold="True" Font-Size="8pt" />
                                <NextPrevStyle Font-Bold="True" Font-Size="8pt" ForeColor="#333333" VerticalAlign="Bottom" />
                                <OtherMonthDayStyle ForeColor="#999999" />
                                <SelectedDayStyle BackColor="#333399" ForeColor="White" />
                                <TitleStyle BackColor="White" BorderColor="Black" BorderWidth="4px" Font-Bold="True"
                                    Font-Size="12pt" ForeColor="#333399" />
                                <TodayDayStyle BackColor="#CCCCCC" />
                            </asp:Calendar>
                        </div>
                        <asp:GridView ID="gvPlan" runat="server" AutoGenerateColumns="False" BorderWidth="1px"
                            CellPadding="2" CellSpacing="2" CssClass="mGrid" GridLines="None" OnRowDataBound="gvPlan_RowDataBound">
                            <Columns>
                                <asp:TemplateField>
                                    <ItemTemplate>
                                        <asp:CheckBox ID="ckCheck" runat="server" />
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Day">
                                    <ItemTemplate>
                                        <asp:Label ID="labday" runat="server" Text='<%# DataBinder.Eval (Container.DataItem, "Day") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Reason">
                                    <ItemTemplate>
                                        <asp:TextBox ID="txtReason" runat="server" CssClass="inp-form" Text='<%# DataBinder.Eval (Container.DataItem, "Reason") %>'></asp:TextBox>
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
                        <br />
                        <br />
                        <div style="font-size: 12px">
                            <asp:Button ID="btnSave" runat="server" Text="Save" OnClick="btnSave_Click" CssClass="form-save" />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <div id="errorDiv">
                                <asp:Label ID="lblError" runat="server" ClientIDMode="Static" />
                            </div>
                        </div>
                    </div>
                </ContentTemplate>
            </asp:UpdatePanel>
        </div>
    </div>
</asp:Content>

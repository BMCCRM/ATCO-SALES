<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MRDaywiseCallDetails.aspx.cs"
    Inherits="PocketDCR2.Reports.MRDaywiseCallDetails" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <asp:UpdateProgress runat="server" AssociatedUpdatePanelID="UpdatePanel1" id="PageUpdateProgress">
            <ProgressTemplate>
                &nbsp;&nbsp; Loading...
            </ProgressTemplate>
        </asp:UpdateProgress>
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <ContentTemplate>
                <asp:DropDownList ID="ddlZone" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlZone_SelectedIndexChanged1">
                </asp:DropDownList>
                <table id="tblMain" runat="server">
                    <tr>
                        <td style="text-align: center">
                            <asp:GridView ID="gvMRDetails" runat="server" BackColor="#DEBA84" BorderColor="#DEBA84"
                                RowStyle-HorizontalAlign="Center" BorderStyle="None" BorderWidth="1px" CellPadding="3"
                                CellSpacing="2" OnRowDataBound="gvMRDetails_RowDataBound" OnDataBound="gvMRDetails_DataBound"
                                HorizontalAlign="Center" OnRowCreated="gvMRDetails_RowCreated">
                                <RowStyle BackColor="#FFF7E7" ForeColor="#8C4510" HorizontalAlign="Center" />
                                <EmptyDataRowStyle HorizontalAlign="Center" />
                                <FooterStyle BackColor="#F7DFB5" ForeColor="#8C4510" HorizontalAlign="Center" />
                                <PagerStyle ForeColor="#8C4510" HorizontalAlign="Center" />
                                <SelectedRowStyle BackColor="#738A9C" Font-Bold="True" ForeColor="White" HorizontalAlign="Center" />
                                <HeaderStyle BackColor="#A55129" Font-Bold="True" ForeColor="White" HorizontalAlign="Center" />
                            </asp:GridView>
                        </td>
                    </tr>
                </table>
            </ContentTemplate>
            <Triggers>
                <asp:AsyncPostBackTrigger ControlID="ddlZone" 
                    EventName="SelectedIndexChanged" />
            </Triggers>
        </asp:UpdatePanel>
    </div>
    </form>
</body>
</html>

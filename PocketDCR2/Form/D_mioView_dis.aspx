<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true"
    CodeBehind="D_mioView_dis.aspx.cs" Inherits="PocketDCR2.Form.D_mioView_dis" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .heHide
        {
            display: none;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <div class="page_heading">
            <h1>
                Sample Distribution
                <asp:Button ID="btnview" runat="server" Text="Distributed List " OnClick="btnview_Click" />
            </h1>
        </div>
        <div class="divgrid">
            <div style="font-size: 16px; font-weight: bold; color: red;">
                <asp:Label ID="laberror" runat="server" Text=""></asp:Label>
            </div>
            <div style="float: left;" class="divgrid">
                <asp:Panel ID="Panel2" runat="server">
                    <table border="0" cellpadding="0" cellspacing="0" id="id-form">
                        <tr>
                            <th>
                                FMO LIST
                                <asp:DropDownList ID="ddlLevel1" runat="server" DataTextField="EmployeeName" DataValueField="EmployeeId"
                                    CssClass="styledselect_form_1" AppendDataBoundItems="True" AutoPostBack="True"
                                    OnSelectedIndexChanged="ddlLevel1_SelectedIndexChanged">
                                    <asp:ListItem Text="Select Employee" Value="-1"></asp:ListItem>
                                </asp:DropDownList>
                            </th>
                            <th>
                                SKU LIST
                                <asp:DropDownList ID="DDskuLisk" runat="server" DataTextField="Skuname" DataValueField="ProductId"
                                    CssClass="styledselect_form_1" AutoPostBack="True" AppendDataBoundItems="True">
                                    <asp:ListItem Text="Select SKU" Value="-1"></asp:ListItem>
                                </asp:DropDownList>
                            </th>
                            <th>
                                ADDRESS LIST
                                <asp:DropDownList ID="DDMioAddress" runat="server" CssClass="styledselect_form_1"
                                    AppendDataBoundItems="True" AutoPostBack="True" DataTextField="Address1">
                                    <asp:ListItem Text="Select Distribution Address" Value="-1"></asp:ListItem>
                                </asp:DropDownList>
                            </th>
                        </tr>
                    </table>
                    <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" OnRowCommand="GridView1_RowCommand"
                        CssClass="mGrid_n" OnRowDataBound="GridView1_RowDataBound" EmptyDataText="No plan found">
                        <AlternatingRowStyle BackColor="#EFEDE2" BorderColor="#E3E2DE" BorderStyle="Solid"
                            BorderWidth="1px" VerticalAlign="Middle" />
                        <Columns>
                            <asp:TemplateField HeaderText="RecNo">
                                <ItemTemplate>
                                    <asp:Label ID="labrecno" runat="server" Text='<%# Eval("RecNo") %>'></asp:Label>
                                </ItemTemplate>
                                <HeaderStyle CssClass="heHide" />
                                <ItemStyle CssClass="heHide" />
                                <EditItemTemplate>
                                    <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
                                </EditItemTemplate>
                            </asp:TemplateField>
                            <asp:BoundField HeaderText="FMO Name" DataField="EmployeeName" Visible="False" />
                            <asp:TemplateField HeaderText="SKU ID">
                                <ItemTemplate>
                                    <asp:Label ID="labSkuid" runat="server" Text='<%# Eval("SKUID") %>'></asp:Label>
                                </ItemTemplate>
                                <HeaderStyle CssClass="heHide" />
                                <ItemStyle CssClass="heHide" />
                                <EditItemTemplate>
                                    <asp:TextBox ID="TextBox2" runat="server"></asp:TextBox>
                                </EditItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="SKU Name">
                                <ItemTemplate>
                                    <asp:Label ID="labskuname" runat="server" Text='<%# Eval("SKUname") %>'></asp:Label>
                                </ItemTemplate>
                                <EditItemTemplate>
                                    <asp:TextBox ID="TextBox3" runat="server"></asp:TextBox>
                                </EditItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Monthly Plan" ItemStyle-HorizontalAlign="Center">
                                <ItemTemplate>
                                    <asp:Label ID="labissue" runat="server" Text='<%# Eval("IssueQty") %>'></asp:Label>
                                </ItemTemplate>
                                <EditItemTemplate>
                                    <asp:TextBox ID="TextBox4" runat="server"></asp:TextBox>
                                </EditItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Monthly Balance" ItemStyle-HorizontalAlign="Center">
                                <ItemTemplate>
                                    <asp:Label ID="labMissue" runat="server" Text='<%# Eval("IssueBQty") %>'></asp:Label>
                                </ItemTemplate>
                                <EditItemTemplate>
                                    <asp:TextBox ID="TextBox4" runat="server"></asp:TextBox>
                                </EditItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Stock.Qty">
                                <ItemTemplate>
                                    <asp:Label ID="labDqty" runat="server" Text='<%# Eval("DisQty") %>'></asp:Label>
                                </ItemTemplate>
                                <EditItemTemplate>
                                    <asp:TextBox ID="TextBox5" runat="server"></asp:TextBox>
                                </EditItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Dis.Date" Visible="False">
                                <ItemTemplate>
                                    <asp:Label ID="labDdate" runat="server" Text='<%# Eval("DisDate") %>'></asp:Label>
                                </ItemTemplate>
                                <EditItemTemplate>
                                    <asp:TextBox ID="TextBox5" runat="server"></asp:TextBox>
                                </EditItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Dis.Date">
                                <ItemTemplate>
                                    <asp:TextBox ID="txtdate" runat="server" CssClass="inp-form" Text='<%# Eval("Recdate") %>'></asp:TextBox>
                                    <asp:CalendarExtender ID="accdateEditTxtBoxCalendarExtender" runat="server" TargetControlID="txtdate"
                                        Format="M/dd/yyyy" PopupButtonID="txtdate" />
                                </ItemTemplate>
                                <EditItemTemplate>
                                    <asp:TextBox ID="TextBox5" runat="server"></asp:TextBox>
                                </EditItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Dis.Qty">
                                <ItemTemplate>
                                    <asp:TextBox ID="txtQty" runat="server" CssClass="inp-form" Text='<%# Eval("RecQty") %>'></asp:TextBox>
                                </ItemTemplate>
                                <EditItemTemplate>
                                    <asp:TextBox ID="TextBox5" runat="server"></asp:TextBox>
                                </EditItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Quarter Balance" ItemStyle-HorizontalAlign="Center">
                                <ItemTemplate>
                                    <asp:Label ID="labBqty" runat="server" Text='<%# Eval("BalQty") %>'></asp:Label>
                                </ItemTemplate>
                                <EditItemTemplate>
                                    <asp:TextBox ID="TextBox6" runat="server"></asp:TextBox>
                                </EditItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Save">
                                <ItemTemplate>
                                    <asp:LinkButton ID="LinkButton1" runat="server" CommandName="Save" CommandArgument="<%# Container.DataItemIndex %>">Save</asp:LinkButton>
                                </ItemTemplate>
                                <EditItemTemplate>
                                    <asp:TextBox ID="TextBox7" runat="server"></asp:TextBox>
                                </EditItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Delete" Visible="False">
                                <ItemTemplate>
                                    <asp:LinkButton ID="LinkButton2" runat="server" CommandName="Delete" CommandArgument="<%# Container.DataItemIndex %>">Delete</asp:LinkButton>
                                </ItemTemplate>
                                <EditItemTemplate>
                                    <asp:TextBox ID="TextBox8" runat="server"></asp:TextBox>
                                </EditItemTemplate>
                            </asp:TemplateField>
                        </Columns>
                    </asp:GridView>
                </asp:Panel>
            </div>
            <br />
            <asp:Panel ID="Panel1" runat="server" Visible="False">
                <%--<h1 style="padding: 5px; font-size: 12px; color: #3E3D3D;">
                    Distributed List
                </h1>--%>
                Quarter :
                <asp:DropDownList ID="ddlQuarter" runat="server" CssClass="styledselect_form_1" AutoPostBack="True"
                    OnSelectedIndexChanged="ddlQuarter_SelectedIndexChanged">
                    <asp:ListItem Text="First Quarter" Value="1"> </asp:ListItem>
                    <asp:ListItem Text="Second  Quarter" Value="2"> </asp:ListItem>
                    <asp:ListItem Text="Third Quarter" Value="3"> </asp:ListItem>
                    <asp:ListItem Text="Fourth Quarter" Value="4"> </asp:ListItem>
                </asp:DropDownList>
                FMO LIST
                <asp:DropDownList ID="ddmio" runat="server" DataTextField="EmployeeName" DataValueField="EmployeeId"
                    CssClass="styledselect_form_1" AppendDataBoundItems="True" AutoPostBack="True"
                    OnSelectedIndexChanged="ddmio_SelectedIndexChanged">
                    <asp:ListItem Text="Select Employee" Value="-1"></asp:ListItem>
                </asp:DropDownList>
                <asp:GridView ID="GridView2" runat="server" AutoGenerateColumns="false" CssClass="mGrid_n">
                    <AlternatingRowStyle BackColor="#EFEDE2" BorderColor="#E3E2DE" BorderStyle="Solid"
                        BorderWidth="1px" VerticalAlign="Middle" />
                    <Columns>
                        <asp:BoundField HeaderText="SKU Name" DataField="SkuName" />
                        <asp:BoundField HeaderText="Issuance Qty" DataField="issueQty" />
                        <asp:BoundField HeaderText="Issuance Date" DataField="DisDate" DataFormatString="{0:d}" />
                        <asp:BoundField HeaderText="Received Qty" DataField="Mio_Qty" />
                        <asp:BoundField HeaderText="Received Date" DataField="Rec_date" DataFormatString="{0:d}" />
                    </Columns>
                </asp:GridView>
            </asp:Panel>
            <br />
            <br />
        </div>
    </div>
</asp:Content>

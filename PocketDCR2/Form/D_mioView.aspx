<%@ Page Title="Sample Management" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="D_mioView.aspx.cs" Inherits="PocketDCR2.Form.D_mioView" %>

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
                Pending Sample List
                <asp:Button ID="btnview" runat="server" Text="Recived Sample List " OnClick="btnview_Click" />
            </h1>
        </div>
        <div class="divgrid">
            <div style="font-size: 16px; font-weight: bold; color: red;">
                <asp:Label ID="laberror" runat="server" Text=""></asp:Label>
            </div>
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
                    <asp:TemplateField HeaderText="Dis.Qty">
                        <ItemTemplate>
                            <asp:Label ID="labDqty" runat="server" Text='<%# Eval("DisQty") %>'></asp:Label>
                        </ItemTemplate>
                        <EditItemTemplate>
                            <asp:TextBox ID="TextBox5" runat="server"></asp:TextBox>
                        </EditItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Dis.Date">
                        <ItemTemplate>
                            <asp:Label ID="labDdate" runat="server" Text='<%# Eval("DisDate") %>'></asp:Label>
                        </ItemTemplate>
                        <EditItemTemplate>
                            <asp:TextBox ID="TextBox5" runat="server"></asp:TextBox>
                        </EditItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Rec.Date">
                        <ItemTemplate>
                            <asp:TextBox ID="txtdate" runat="server" CssClass="inp-form" Text='<%# Eval("Recdate") %>'></asp:TextBox>
                            <asp:CalendarExtender ID="accdateEditTxtBoxCalendarExtender" runat="server" TargetControlID="txtdate"
                                Format="M/dd/yyyy" PopupButtonID="txtdate" />
                        </ItemTemplate>
                        <EditItemTemplate>
                            <asp:TextBox ID="TextBox5" runat="server"></asp:TextBox>
                        </EditItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Rec.Qty">
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
            <br />
            <asp:Panel ID="Panel1" runat="server" Visible="False">
                <h1 style="padding: 5px; font-size: 12px; color: #3E3D3D;">
                    Recived Sample List
                </h1>
                Quarter :
                <asp:DropDownList ID="ddlQuarter" runat="server" CssClass="styledselect_form_1" AutoPostBack="True"
                    OnSelectedIndexChanged="ddlQuarter_SelectedIndexChanged">
                    <asp:ListItem Text="First Quarter" Value="1"> </asp:ListItem>
                    <asp:ListItem Text="Second  Quarter" Value="2"> </asp:ListItem>
                    <asp:ListItem Text="Third Quarter" Value="3"> </asp:ListItem>
                    <asp:ListItem Text="Fourth Quarter" Value="4"> </asp:ListItem>
                </asp:DropDownList>
                <asp:GridView ID="GridView2" runat="server" AutoGenerateColumns="false" CssClass="mGrid_n">
                    <AlternatingRowStyle BackColor="#EFEDE2" BorderColor="#E3E2DE" BorderStyle="Solid"
                        BorderWidth="1px" VerticalAlign="Middle" />
                    <Columns>
                        <asp:BoundField HeaderText="SKU Name" DataField="SKU_Name" />
                        <asp:BoundField HeaderText="Issuance Qty" DataField="Issuance_Qty" />
                        <asp:BoundField HeaderText="Issuance Date" DataField="Issuance_Date" />
                        <asp:BoundField HeaderText="Received Qty" DataField="Recqty" />
                        <asp:BoundField HeaderText="Received Date" DataField="Received_date" />
                    </Columns>
                </asp:GridView>
            </asp:Panel>
            <br />
            <br />
        </div>
    </div>
</asp:Content>

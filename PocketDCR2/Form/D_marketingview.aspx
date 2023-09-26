<%@ Page Title="Marketing Plan" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="D_marketingview.aspx.cs" Inherits="PocketDCR2.Form.D_marketingview" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <style>
        .disnon
        {
            display: none;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <div class="page_heading">
            <h1>
                Marketing Plan :&nbsp;&nbsp;&nbsp;
                <asp:Label ID="Labq" runat="server" Text=""></asp:Label></h1>
        </div>
        <div class="divgrid">
            Quarter :
            <asp:DropDownList ID="ddlQuarter" runat="server" CssClass="styledselect_form_1" AutoPostBack="True"
                OnSelectedIndexChanged="ddlQuarter_SelectedIndexChanged">
                <asp:ListItem Text="First Quarter" Selected="True" Value="1">
                </asp:ListItem>
                <asp:ListItem Text="Second  Quarter" Value="2">
                </asp:ListItem>
                <asp:ListItem Text="Third Quarter" Value="3">
                </asp:ListItem>
                <asp:ListItem Text="Fourth Quarter" Value="4">
                </asp:ListItem>
            </asp:DropDownList>
            <asp:TextBox ID="txtDate1" runat="server" CssClass="inp-form" ReadOnly="True" Visible="False">
            </asp:TextBox>
            <asp:TextBox ID="txtDate2" runat="server" CssClass="inp-form" ReadOnly="True" Visible="False">
            </asp:TextBox>
            <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" OnRowDataBound="GridView1_RowDataBound"
                OnRowCommand="GridView1_RowCommand" DataKeyNames="ProductId" CssClass="mGrid_n">
                <alternatingrowstyle backcolor="#EFEDE2" bordercolor="#E3E2DE" borderstyle="Solid"
                    borderwidth="1px" verticalalign="Middle" />
                <columns>
                    <asp:TemplateField HeaderText="Rec NO">
                        <ItemTemplate>
                            <asp:Label ID="labrec" runat="server" Text=""></asp:Label>
                        </ItemTemplate>
                        <HeaderStyle CssClass="disnon" />
                        <ItemStyle CssClass="disnon" />
                    </asp:TemplateField>
                    <asp:BoundField HeaderText="" DataField="ProductId" ItemStyle-Width="0px">
                        <HeaderStyle CssClass="disnon" />
                        <ItemStyle CssClass="disnon"></ItemStyle>
                    </asp:BoundField>
                    <asp:BoundField HeaderText="SKU Name" DataField="SkuName" />
                    <asp:TemplateField HeaderText="Per FMO QTY">
                        <ItemTemplate>
                            <asp:TextBox ID="txtqty" runat="server" AutoPostBack="false" CssClass="inp-form"></asp:TextBox>
                        </ItemTemplate>
                        <EditItemTemplate>
                            <asp:TextBox ID="txtqtyedit" runat="server"></asp:TextBox>
                        </EditItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="">
                        <ItemTemplate>
                            <asp:LinkButton ID="LinkButton1" runat="server" CommandName="Save" CommandArgument="<%# Container.DataItemIndex %>">Save</asp:LinkButton>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="" Visible="False">
                        <ItemTemplate>
                            <asp:LinkButton ID="LinkButton2" runat="server" CommandName="Delete" CommandArgument="<%# Container.DataItemIndex %>">Delete</asp:LinkButton>
                        </ItemTemplate>
                    </asp:TemplateField>
                </columns>
            </asp:GridView>
        </div>
        <asp:Label ID="labmsg" runat="server" Text=""></asp:Label>
    </div>
</asp:Content>

<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true"
    CodeBehind="D_distributionview.aspx.cs" Inherits="PocketDCR2.Form.D_distributionview" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <asp:Label ID="labmarteamrec" runat="server" Text="Label" Visible="False"></asp:Label>
        <div class="page_heading">
            <h1>
                <img alt="" src="../Images/Icon/1330777250_doctor.png" />
                Distribution View
                <asp:Button ID="btnview" runat="server" OnClick="btnview_Click" Text="FMO Distribution Details" />
                <asp:Label ID="loginID" runat="server" Text="Label" Visible="False"></asp:Label>
            </h1>
        </div>
        <div style="float: left;" class="divgrid">
            <asp:Panel ID="Panel2" runat="server">
                <table border="0" cellpadding="0" cellspacing="0" id="id-form">
                    <tr>
                        <th>
                            FLM LIST
                            <asp:DropDownList ID="DDMiolist" runat="server" DataTextField="EmployeeName" DataValueField="EmployeeId"
                                CssClass="styledselect_form_1" AppendDataBoundItems="True" AutoPostBack="True"
                                OnSelectedIndexChanged="DDMiolist_SelectedIndexChanged">
                                <asp:ListItem Text="Select Employee" Value="-1"></asp:ListItem>
                            </asp:DropDownList>
                        </th>
                        <th>
                            SKU LIST
                            <asp:DropDownList ID="DDskuLisk" runat="server" DataTextField="Skuname" DataValueField="ProductId"
                                CssClass="styledselect_form_1" AutoPostBack="True" AppendDataBoundItems="True"
                                OnSelectedIndexChanged="DDskuLisk_SelectedIndexChanged">
                                <asp:ListItem Text="Select SKU" Value="-1"></asp:ListItem>
                            </asp:DropDownList>
                        </th>
                        <th>
                            ADDRESS LIST
                            <asp:DropDownList ID="DDMioAddress" runat="server" CssClass="styledselect_form_1"
                                AppendDataBoundItems="True" AutoPostBack="True" DataTextField="Address1" OnSelectedIndexChanged="DDMioAddress_SelectedIndexChanged">
                                <asp:ListItem Text="Select Distribution Address" Value="-1"></asp:ListItem>
                            </asp:DropDownList>
                        </th>
                    </tr>
                </table>
                <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" OnRowDataBound="GridView1_RowDataBound"
                    OnRowCommand="GridView1_RowCommand" CssClass="mGrid_n" OnPageIndexChanging="GridView1_PageIndexChanging"
                    EmptyDataText="No plan found">
                    <AlternatingRowStyle BackColor="#EFEDE2" BorderColor="#E3E2DE" BorderStyle="Solid"
                        BorderWidth="1px" VerticalAlign="Middle" />
                    <Columns>
                        <asp:TemplateField HeaderText="RecNo" Visible="False">
                            <ItemTemplate>
                                <asp:Label ID="labrecno" runat="server" Text='<%# Eval("RecNo") %>'></asp:Label>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="FMOID" Visible="False">
                            <ItemTemplate>
                                <asp:Label ID="labmioid" runat="server" Text='<%# Eval("EmployeeId") %>'></asp:Label>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField HeaderText="FMO Name" DataField="EmployeeName" />
                        <asp:TemplateField HeaderText="SKU ID" Visible="False">
                            <ItemTemplate>
                                <asp:Label ID="labSkuid" runat="server" Text='<%# Eval("SKUID") %>'></asp:Label>
                            </ItemTemplate>
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
                                <asp:TextBox ID="txtqty" runat="server" Text='<%# Eval("DisQty") %>' CssClass="inp-form"></asp:TextBox>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:TextBox ID="TextBox5" runat="server"></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Dis.Date">
                            <ItemTemplate>
                                <asp:TextBox ID="txtdate" runat="server" Text='<%# Eval("DisDate") %>' CssClass="inp-form"></asp:TextBox>
                                <asp:CalendarExtender ID="accdateEditTxtBoxCalendarExtender" runat="server" TargetControlID="txtdate"
                                    Format="M/dd/yyyy" PopupButtonID="txtdate" />
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:TextBox ID="TextBox5" runat="server"></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Quarter Balance">
                            <ItemTemplate>
                                <asp:Label ID="labBqty" runat="server" Text='<%# Eval("BalQty") %>'></asp:Label>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:TextBox ID="TextBox6" runat="server"></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField HeaderText="Address" DataField="Address" ItemStyle-Width="250" ItemStyle-Wrap="True">
                            <ItemStyle Wrap="True" Width="250px"></ItemStyle>
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="FMORec" Visible="False">
                            <ItemTemplate>
                                <asp:Label ID="MIORec" runat="server" Text='<%# Eval("MIORec") %>'></asp:Label>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:TextBox ID="TextBox6" runat="server"></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField>
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
        <div class="divgrid">
            <asp:Panel ID="Panel1" runat="server" Visible="False">
                <h1 style="padding: 5px; font-size: 12px; color: #3E3D3D;">
                    FLM Distribution Details</h1>
                <table border="0" cellpadding="0" cellspacing="0" id="id-form">
                    <tr>
                        <th>
                            Quarter
                            <asp:DropDownList ID="ddlQuarter" runat="server" CssClass="styledselect_form_1" AutoPostBack="True"
                                OnSelectedIndexChanged="ddlQuarter_SelectedIndexChanged">
                                <asp:ListItem Text="First Quarter" Value="1"> </asp:ListItem>
                                <asp:ListItem Text="Second  Quarter" Value="2"> </asp:ListItem>
                                <asp:ListItem Text="Third Quarter" Value="3"> </asp:ListItem>
                                <asp:ListItem Text="Fourth Quarter" Value="4"> </asp:ListItem>
                            </asp:DropDownList>
                        </th>
                        <th>
                            FLM LIST
                            <asp:DropDownList ID="ddemp" runat="server" DataTextField="EmployeeName" DataValueField="EmployeeId"
                                CssClass="styledselect_form_1" AppendDataBoundItems="True" AutoPostBack="True"
                                OnSelectedIndexChanged="ddemp_SelectedIndexChanged">
                            </asp:DropDownList>
                        </th>
                    </tr>
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
                </table>
            </asp:Panel>
        </div>
    </div>
</asp:Content>

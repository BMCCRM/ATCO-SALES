<%@ Page Title="Products with Speciality" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="ProductsWithSpeciality.aspx.cs" Inherits="PocketDCR2.Schedular.ProductsWithSpeciality" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <script src="jquery/curvycorners.src.js" type="text/javascript"></script>
    <div id="content">
        <div class="page_heading">
            <h1>
                <img alt="" src="../Images/Icon/Product Form.png" />
                Products With Specialty</h1>
        </div>
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <ContentTemplate>
               
                <div class="clear">
                </div>
                <div class="persoanl-data" style="width: 900px;">
                    <div class="inner-head">
                    </div>
                    <div class="inner-left">
                        <ul class="form_list">
                            <li>
                                <asp:Label ID="Label1" runat="server" Text="Specialty Name"></asp:Label>
                                <br />
                                <asp:DropDownList ID="ddlSpecialityName" runat="server" class="styledselect_form_1">
                                </asp:DropDownList>
                                <asp:Label ID="lblerrorSpecialityName" runat="server" ForeColor="Red" Visible="false"
                                    Text=""></asp:Label>
                            </li>
                            <li>
                                <table>
                                    <tr>
                                        <td>
                                            Product 1
                                        </td>
                                        <td>
                                            Product 2
                                        </td>
                                        <td>
                                            Product 3
                                        </td>
                                        <td>
                                            Product 4
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <asp:DropDownList ID="ddlProduct1" runat="server" class="styledselect_form_1">
                                            </asp:DropDownList>
                                        </td>
                                        <td>
                                            <asp:DropDownList ID="ddlProduct2" runat="server" class="styledselect_form_1">
                                            </asp:DropDownList>
                                        </td>
                                        <td>
                                            <asp:DropDownList ID="ddlProduct3" runat="server" class="styledselect_form_1">
                                            </asp:DropDownList>
                                        </td>
                                        <td>
                                            <asp:DropDownList ID="ddlProduct4" runat="server" class="styledselect_form_1">
                                            </asp:DropDownList>
                                        </td>
                                    </tr>
                                </table>
                            </li>
                            <li>
                                <table>
                                    <tr>
                                        <td>
                                            Reminder 1
                                        </td>
                                        <td>
                                            Reminder 2
                                        </td>
                                        <td>
                                            Reminder 3
                                        </td>
                                        <td>
                                            Reminder 4
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <asp:DropDownList ID="ddlReminder1" runat="server" class="styledselect_form_1">
                                            </asp:DropDownList>
                                        </td>
                                        <td>
                                            <asp:DropDownList ID="ddlReminder2" runat="server" class="styledselect_form_1">
                                            </asp:DropDownList>
                                        </td>
                                        <td>
                                            <asp:DropDownList ID="ddlReminder3" runat="server" class="styledselect_form_1">
                                            </asp:DropDownList>
                                        </td>
                                        <td>
                                            <asp:DropDownList ID="ddlReminder4" runat="server" class="styledselect_form_1">
                                            </asp:DropDownList>
                                        </td>
                                    </tr>
                                </table>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="clear">
                </div>
                 <ul class="holidays_menu" style="margin-top: 20px">
                    <li>
                        <asp:Button ID="btnSubmit" runat="server" Text="Add" CssClass="btn add_new" OnClick="btnSubmit_Click" />
                    </li>
                    <li>
                        <asp:Button ID="btnReset" runat="server" Text="Reset" CssClass="btn reset" CausesValidation="False"
                            OnClick="btnReset_Click" />
                    </li>
                </ul>  <div class="clear">
                </div>
                <div class="divgrid">
                    <asp:GridView ID="gvSpeciality" runat="server" AutoGenerateColumns="False" Width="900px"
                        OnRowCommand="gvSpeciality_RowCommand" OnRowDeleting="gvSpeciality_RowDeleting"
                        OnRowEditing="gvSpeciality_RowEditing" CssClass="mGrid_n">
                        <Columns>
                            <asp:BoundField DataField="SpecilityCode" HeaderText="Specialty Code" />
                            <asp:BoundField DataField="SpecialiityName" HeaderText="Specialty Name" />
                            <asp:TemplateField ShowHeader="False">
                                <ItemTemplate>
                                    <asp:LinkButton ID="LinkButton1" runat="server" CausesValidation="false" CommandName="d"
                                        Text="Delete" CommandArgument='<%# Bind("fk_CPS_SPE_SpecialityID") %>'></asp:LinkButton>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField ShowHeader="False">
                                <ItemTemplate>
                                    <asp:LinkButton ID="LinkButton2" runat="server" CausesValidation="false" CommandName="e"
                                        Text="Edit" CommandArgument='<%# Bind("fk_CPS_SPE_SpecialityID") %>'></asp:LinkButton>
                                </ItemTemplate>
                            </asp:TemplateField>
                        </Columns>
                    </asp:GridView>
                </div>
                <div>
                    <table>
                        <tr>
                            <td>
                            </td>
                            <td>
                            </td>
                        </tr>
                    </table>
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</asp:Content>

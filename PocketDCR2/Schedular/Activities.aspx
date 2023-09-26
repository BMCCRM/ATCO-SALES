<%@ Page Title="Call Planner Activities" MasterPageFile="~/MasterPages/Home.master"
    Language="C#" AutoEventWireup="true" CodeBehind="Activities.aspx.cs" Inherits="PocketDCR2.Schedular.ActivitiesForm" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <link href="Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <script src="jquery/curvycorners.src.js" type="text/javascript"></script>
    <div id="content">
        <div class="page_heading">
            <h1>
                <img alt="" src="../Images/Icon/Product Form.png" />
                Activities</h1>
        </div>
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <ContentTemplate>
                <div class="clear">
                </div>
                <div class="persoanl-data">
                    <div class="inner-head">
                    </div>
                    <div class="inner-left">
                        <ul class="form_list">
                            <li>
                                <asp:Label ID="lblName" runat="server" Text="Activity Name"></asp:Label>
                                <br />
                                <asp:TextBox ID="txtName" runat="server" CssClass="inp-form-medium"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="rfvName" runat="server" ErrorMessage="RequiredFieldValidator"
                                    ControlToValidate="txtName">*</asp:RequiredFieldValidator>
                            </li>
                            <li>
                                <asp:Label ID="lblBcolor" runat="server" Text="Background Color"></asp:Label>
                                <br />
                                <asp:TextBox ID="txtBcolor" runat="server" CssClass="inp-form-medium"></asp:TextBox>
                                <asp:ColorPickerExtender ID="txtBcolor_ColorPickerExtender" runat="server" Enabled="True"
                                    TargetControlID="txtBcolor">
                                </asp:ColorPickerExtender>
                                &nbsp; &nbsp;
                                <asp:RequiredFieldValidator ID="rfvBcolor" runat="server" ErrorMessage="RequiredFieldValidator"
                                    ControlToValidate="txtBcolor">*</asp:RequiredFieldValidator>
                            </li>
                            <li>
                                <asp:Label ID="lblFcolor" runat="server" Text="Fore Color"></asp:Label>
                                <br />
                                <asp:TextBox ID="txtFcolor" runat="server" CssClass="inp-form-medium"></asp:TextBox>
                                <asp:ColorPickerExtender ID="txtFcolor_ColorPickerExtender" runat="server" Enabled="True"
                                    TargetControlID="txtFcolor">
                                </asp:ColorPickerExtender>
                                &nbsp;
                                <asp:RequiredFieldValidator ID="rfvFcolor" runat="server" ErrorMessage="RequiredFieldValidator"
                                    ControlToValidate="txtFcolor">*</asp:RequiredFieldValidator>
                            </li>
                            <li style="display: none;">
                                <asp:Label ID="lblDescription" runat="server" Text="Description"></asp:Label>
                                <br />
                                <asp:TextBox ID="txtDescription" runat="server" CssClass="styledtextarea_2"></asp:TextBox>
                            </li>
                            <li>
                                <asp:Label ID="lblNoOfProducts" runat="server" Text="Number of Products"></asp:Label>
                                <br />
                                <asp:TextBox ID="txtNoOfProducts" runat="server" CssClass="inp-form-medium"></asp:TextBox>
                                &nbsp;
                                <asp:RangeValidator ID="RangeValidator1" runat="server" ErrorMessage="Numbers Allowed Only"
                                    ControlToValidate="txtNoOfProducts" Display="Dynamic" EnableViewState="False"
                                    MaximumValue="5000" MinimumValue="0" Type="Integer"></asp:RangeValidator>
                            </li>
                            <li>
                                <asp:Label ID="lblNoOfReminders" runat="server" Text="Number of Reminders"></asp:Label>
                                <br />
                                <asp:TextBox ID="txtNoOfReminders" runat="server" CssClass="inp-form-medium"></asp:TextBox>
                                &nbsp;
                                <asp:RangeValidator ID="RangeValidator2" runat="server" ErrorMessage="Numbers Allowed Only"
                                    ControlToValidate="txtNoOfReminders" Display="Dynamic" EnableViewState="False"
                                    MaximumValue="5000" MinimumValue="0" Type="Integer"></asp:RangeValidator>
                            </li>
                            <li>
                                <asp:Label ID="lblNoOfSamples" runat="server" Text="Number of Samples"></asp:Label>
                                <br />
                                <asp:TextBox ID="txtNoOfSamples" runat="server" CssClass="inp-form-medium"></asp:TextBox>
                                &nbsp;
                                <asp:RangeValidator ID="RangeValidator3" runat="server" ErrorMessage="Numbers Allowed Only"
                                    ControlToValidate="txtNoOfSamples" Display="Dynamic" EnableViewState="False"
                                    MaximumValue="5000" MinimumValue="0" Type="Integer"></asp:RangeValidator>
                            </li>
                            <li>
                                <asp:Label ID="lblNoOfGifts" runat="server" Text="Number of Gifts"></asp:Label>
                                <br />
                                <asp:TextBox ID="txtNoOfGifts" runat="server" CssClass="inp-form-medium"></asp:TextBox>
                                &nbsp;
                                <asp:RangeValidator ID="RangeValidator4" runat="server" ErrorMessage="Numbers Allowed Only"
                                    ControlToValidate="txtNoOfGifts" Display="Dynamic" EnableViewState="False"
                                    MaximumValue="5000" MinimumValue="0" Type="Integer"></asp:RangeValidator>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="clear">
                </div>
                <ul class="holidays_menu" style="margin-top: 20px">
                    <li>
                        <asp:Button ID="btnSubmit" runat="server" Text="Add" OnClick="btnSubmit_Click" CssClass="btn add_new" />
                    </li>
                    <li>
                        <asp:Button ID="btnReset" runat="server" Text="Reset" CssClass="btn reset" OnClick="btnReset_Click"
                            CausesValidation="False" />
                    </li>
                </ul>
                <div class="clear">
                </div>
                <div class="divgrid">
                    <asp:GridView ID="gvActivities" runat="server" AutoGenerateColumns="False" OnRowCommand="gvActivities_RowCommand"
                        OnRowDeleting="gvActivities_RowDeleting" OnRowEditing="gvActivities_RowEditing"
                        CssClass="mGrid_n">
                        <Columns>
                            <asp:BoundField DataField="CPA_Name" HeaderText="Activity" />
                            <asp:BoundField DataField="CPA_BackgroundColor" HeaderText="Back Color" />
                            <asp:BoundField DataField="CPA_ForeColor" HeaderText="Fore Color" />
                            <asp:BoundField DataField="CPA_Description" HeaderText="Description" />
                            <asp:BoundField DataField="CPA_NoOfProducts" HeaderText="No. of Products" />
                            <asp:BoundField DataField="CPA_NoOfReminders" HeaderText="No. of Reminders" />
                            <asp:BoundField DataField="CPA_NoOfReminders" HeaderText="No. of Reminders" />
                            <asp:BoundField DataField="CPA_NoOfSample" HeaderText="No. of Samples" />
                            <asp:BoundField DataField="CPA_NoOfGift" HeaderText="No. of Gifts" />
                            <asp:TemplateField Visible="false">
                                <ItemTemplate>
                                    <asp:Label ID="lblID" runat="server" Text='<%# Bind("pk_CPA_CallPlannerActivityID") %>'></asp:Label>
                                    <asp:LinkButton ID="LinkButton3" runat="server" CausesValidation="false" CommandName="Delete"
                                        Text="delete" CommandArgument='<%# Bind("pk_CPA_CallPlannerActivityID") %>'></asp:LinkButton>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField ShowHeader="False">
                                <ItemTemplate>
                                    <asp:LinkButton ID="LinkButton1" runat="server" CausesValidation="false" CommandName="d"
                                        Text="Delete" CommandArgument='<%# Bind("pk_CPA_CallPlannerActivityID") %>'></asp:LinkButton>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField ShowHeader="False">
                                <ItemTemplate>
                                    <asp:LinkButton ID="LinkButton2" runat="server" CausesValidation="false" CommandName="e"
                                        Text="Edit" CommandArgument='<%# Bind("pk_CPA_CallPlannerActivityID") %>'></asp:LinkButton>
                                </ItemTemplate>
                            </asp:TemplateField>
                        </Columns>
                    </asp:GridView>
                </div>
                <div>
                    <table>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</asp:Content>

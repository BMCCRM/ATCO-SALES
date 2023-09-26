<%@ Page Title="Call Planner Holidays" MasterPageFile="~/MasterPages/Home.master" Language="C#" 
AutoEventWireup="true" CodeBehind="Holidays.aspx.cs" Inherits="PocketDCR2.Schedular.HolidaysForm" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <link href="Styles/LayOut.css" rel="stylesheet" type="text/css" />    
    <script src="jquery/curvycorners.src.js" type="text/javascript"></script>
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
    <ContentTemplate>
    <ul class="holidays_menu">
        <li>
            <asp:Button ID="btnSubmit" runat="server" Text="Add" onclick="btnSubmit_Click"  CssClass="btn add_new" />
                         
        </li>
        <li>
            <asp:Button ID="btnReset" runat="server" Text="Reset" CssClass="btn reset" 
                         CausesValidation="False" onclick="btnReset_Click"/>
        </li>
    </ul>
    <div class="clear"></div>
    <div class="persoanl-data">
        <div class="inner-head"></div>
        <div class="inner-left">
            <ul class="form_list">
                <li>
                        <asp:Label ID="lblFrom" runat="server" Text="From Date"></asp:Label>
                        <br />
                        <asp:TextBox ID="txtFrom" runat="server" CssClass="inp-form-medium"></asp:TextBox>
                        <asp:ImageButton runat="Server" ID="ibFrom" ImageUrl="~/Images/Icon1.jpg" CausesValidation="false"/>
                        &nbsp; 
                        <asp:CalendarExtender ID="ceFrom" runat="server" TargetControlID="txtFrom" PopupButtonID="ibFrom">
                        </asp:CalendarExtender>                  
                        &nbsp;
                        <asp:RequiredFieldValidator ID="rfvTo" runat="server" ErrorMessage="RequiredFieldValidator" 
                        ControlToValidate="txtFrom">*</asp:RequiredFieldValidator>
                </li>
                <li>
                        <asp:Label ID="lblTo" runat="server" Text="To Date"></asp:Label>
                        <br />
                        <asp:TextBox ID="txtTo" runat="server" CssClass="inp-form-medium"></asp:TextBox>
                    <asp:ImageButton runat="Server" ID="ibTo" ImageUrl="~/Images/Icon1.jpg" CausesValidation="false" />
                     <asp:CalendarExtender ID="ceTo" runat="server" TargetControlID="txtTo" PopupButtonID="ibTo">
                    </asp:CalendarExtender>
                    &nbsp;

                    <asp:RequiredFieldValidator ID="rfvFrom" runat="server" ErrorMessage="RequiredFieldValidator" 
                        ControlToValidate="txtTo">*</asp:RequiredFieldValidator>

                    &nbsp;<asp:CompareValidator ID="CompareValidator1" runat="server" 
                        ControlToCompare="txtTo" ControlToValidate="txtFrom" Display="Dynamic" 
                        ErrorMessage="From date must be less than To date" Operator="LessThanEqual" 
                        Type="Date"></asp:CompareValidator>                
                </li>
                <li>
                    <asp:Label ID="lblDescription" runat="server" Text="Description" ></asp:Label>
                    <br />
                    <asp:TextBox ID="txtDescription" runat="server" CssClass="styledtextarea_2" ></asp:TextBox>
                    <asp:RequiredFieldValidator ID="rfvDescription" runat="server" ErrorMessage="RequiredFieldValidator" 
                        ControlToValidate="txtDescription">*</asp:RequiredFieldValidator>
                </li>
            <//ul>
        </div>
    </div>   
    <div class="clear"></div>
    <div class="mGrid_n">
        <asp:GridView ID="gvHolidays" runat="server" AutoGenerateColumns="False" 
            onrowcommand="gvHolidays_RowCommand" 
            onrowdeleting="gvHolidays_RowDeleting" 
            onrowediting="gvHolidays_RowEditing">
            <Columns>
                <asp:BoundField DataField="CPH_DateFrom" HeaderText="From Date" />
                <asp:BoundField DataField="CPH_DateTo" HeaderText="To Date" />
                <asp:BoundField DataField="CPH_Description" HeaderText="Description" />
                <asp:TemplateField Visible="false">
                    <ItemTemplate>
                        <asp:Label ID="lblID" runat="server" Text='<%# Bind("pk_CPH_CallPlannerHolidayID") %>'></asp:Label>
                        <asp:LinkButton ID="LinkButton3" runat="server" CausesValidation="false" 
                            CommandName="Delete" Text="delete" 
                            CommandArgument='<%# Bind("pk_CPH_CallPlannerHolidayID") %>'></asp:LinkButton>
                    
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField ShowHeader="False">
                    <ItemTemplate>
                        <asp:LinkButton ID="LinkButton1" runat="server" CausesValidation="false" 
                            CommandName="d" Text="Delete" CommandArgument='<%# Bind("pk_CPH_CallPlannerHolidayID") %>'></asp:LinkButton>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField ShowHeader="False">
                    <ItemTemplate>
                        <asp:LinkButton ID="LinkButton2" runat="server" CausesValidation="false" 
                             CommandName="e" Text="Edit" CommandArgument='<%# Bind("pk_CPH_CallPlannerHolidayID") %>'></asp:LinkButton>
                    </ItemTemplate>
                </asp:TemplateField>
            </Columns>
        </asp:GridView>
    </div>
    </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>
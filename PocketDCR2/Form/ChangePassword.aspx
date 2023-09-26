<%@ Page Title="Change Password" Language="C#" MasterPageFile="~/MasterPages/Login.Master"
    AutoEventWireup="true" CodeBehind="ChangePassword.aspx.cs" Inherits="PocketDCR2.Form.ChangePassword" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        #loginbox {
            background: url(../Images/Login/loginbox_bg.png) no-repeat;
            font-size: 12px;
            height: 279px;
            line-height: 12px;
            padding-top: 55px;
            position: relative;
            width: 508px;
        }
        #login-inner td {
            padding: 0 0 6px 0;
             float: none; 
            width: 220px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:ToolkitScriptManager ID="ToolkitScriptManager1" runat="server" />
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <div id="loginbox">
                <div class="page_heading_login">
                    <h1>
                        <img alt="" src="../Images/Icon/Hierarchy.png" />
                        Change Password
                    </h1>
                </div>
                <div id="login-inner">
                    <asp:ChangePassword ID="ChangePassword2" runat="server" CancelDestinationPageUrl="Login.aspx"
                        ContinueDestinationPageUrl="Login.aspx" Width="100%">
                        <ChangePasswordTemplate>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <th>
                                        Current Password :
                                    </th>
                                    <td>
                                        <asp:TextBox ID="CurrentPassword" runat="server" TextMode="Password" class="login-inp"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="CurrentPasswordRequired" runat="server" ControlToValidate="CurrentPassword"
                                            ErrorMessage="Password is required." CssClass="failureNotification" ToolTip="Password is required."
                                            ValidationGroup="ResetPasswordValidation" Text="*" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        New Password :
                                    </th>
                                    <td>
                                        <asp:TextBox ID="NewPassword" runat="server" TextMode="Password" class="login-inp"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="NewPasswordRequired" runat="server" ControlToValidate="NewPassword"
                                            ErrorMessage="New password is required." CssClass="failureNotification" ToolTip="New password is required."
                                            ValidationGroup="ResetPasswordValidation">*</asp:RequiredFieldValidator>
                                        <asp:RegularExpressionValidator Display = "Dynamic" ControlToValidate = "NewPassword" ID="RegularExpressionValidator2" 
                                            ValidationExpression = "^[\s\S]{6,}$" runat="server" ErrorMessage="Password Should Have Minimum 6 Characters." ValidationGroup="ResetPasswordValidation"></asp:RegularExpressionValidator>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Confirm New Password :
                                    </th>
                                    <td>
                                        <asp:TextBox ID="ConfirmNewPassword" runat="server" TextMode="Password" class="login-inp"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="ConfirmNewPasswordRequired" runat="server" ControlToValidate="ConfirmNewPassword"
                                            ErrorMessage="Confirm New Password is required." ToolTip="Confirm New Password is required."
                                            CssClass="failureNotification" ValidationGroup="ResetPasswordValidation">*</asp:RequiredFieldValidator>
                                        <asp:CompareValidator ID="NewPasswordCompare" runat="server" ControlToCompare="NewPassword"
                                            CssClass="failureNotification" ControlToValidate="ConfirmNewPassword" Display="None"
                                            ErrorMessage="The Confirm New Password must match the New Password entry." ValidationGroup="ResetPasswordValidation">*</asp:CompareValidator>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                    </th>
                                    <td>
                                        <asp:Button ID="ChangePasswordPushButton" runat="server" OnClick="ChangePasswordPushButton_Click"
                                            ValidationGroup="ResetPasswordValidation" CssClass="Change_button" Style="border: none;"
                                            ClientIDMode="Static" />
                                        <asp:Button ID="CancelPushButton" runat="server" CausesValidation="False" CommandName="Cancel"
                                            ValidationGroup="ResetPasswordValidation" CssClass="Cancel_button" Style="border: none;"
                                            ClientIDMode="Static" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                    </th>
                                    <td>
                                        <asp:Literal ID="FailureText" runat="server" EnableViewState="true" ClientIDMode="Static"></asp:Literal>
                                        <asp:ValidationSummary ID="ResetPasswordValidationSummary" runat="server" CssClass="failureNotification"
                                            ValidationGroup="ResetPasswordValidation" />
                                    </td>
                                </tr>
                            </table>
                            <div class="clear">
                            </div>
                            
                        </ChangePasswordTemplate>
                        <SuccessTemplate>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <th>
                                        Your password has been changed! :
                                    </th>
                                    <td>
                                        <asp:Button ID="ContinuePushButton" runat="server" CausesValidation="False" CommandName="Continue"
                                            CssClass="button" Style="border: none;" />
                                    </td>
                                </tr>
                            </table>
                        </SuccessTemplate>
                        
                    </asp:ChangePassword>
                </div>
            </div>
            <asp:HiddenField ID="ShowErrorAlert" runat="server" ClientIDMode="Static" />
            <asp:HiddenField ID="HideErrorAlert" runat="server" ClientIDMode="Static" />
            <asp:ModalPopupExtender ID="mpError" runat="server" CancelControlID="HideErrorAlert"
                ClientIDMode="Static" TargetControlID="ShowErrorAlert" BackgroundCssClass="popupBackground"
                PopupControlID="pnlShowErrorAlert" />
            <asp:Panel ID="pnlShowErrorAlert" runat="server" Style="display: none;" ClientIDMode="Static">
                <div class="title">
                    Error Window
                </div>
                <div class="popupWindow">
                    <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label><br />
                    <br />
                    <asp:Button ID="btnClose" runat="server" Text="Close" CausesValidation="false" OnClick="btnClose_Click"
                        ClientIDMode="Static" />
                </div>
            </asp:Panel>
        </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>

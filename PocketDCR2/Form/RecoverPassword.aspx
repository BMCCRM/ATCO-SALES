<%@ Page Title="Recover Password" Language="C#" MasterPageFile="~/MasterPages/Login.Master"
    AutoEventWireup="true" CodeBehind="RecoverPassword.aspx.cs" Inherits="PocketDCR2.Form.RecoverPassword" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        #loginbox {
            background: url(../Images/Login/loginbox_bg.png) no-repeat;
            font-size: 12px;
            height: 270px;
            line-height: 12px;
            padding-top: 60px;
            position: relative;
            width: 508px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:ToolkitScriptManager ID="ToolkitScriptManager1" runat="server" />
    <asp:UpdatePanel ID="UpdatePanel2" runat="server">
        <ContentTemplate>
            <div id="loginbox">
                <div class="page_heading_login">
                    <h1>
                        <img alt="" src="../Images/Icon/Hierarchy.png" />
                        Password Recover
                    </h1>
                </div>
                <div id="login-inner">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <th>
                                User Name :
                            </th>
                            <td>
                                <asp:TextBox ID="UserName" runat="server" CssClass="login-inp" ClientIDMode="Static" />
                                <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName"
                                    CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="User Name is required."
                                    ValidationGroup="LoginUserValidation" Text="*" ClientIDMode="Static" />
                            </td>
                        </tr>
                        <%--<tr>
                            <th>
                                Email Address :
                            </th>
                            <td>
                                <asp:TextBox ID="Email" runat="server" CssClass="login-inp" ClientIDMode="Static" />
                                <asp:RequiredFieldValidator ID="EmailRequired" runat="server" ControlToValidate="Email"
                                    CssClass="failureNotification" ErrorMessage="Email Id is required." ToolTip="Email Id is required."
                                    ValidationGroup="LoginUserValidation" Text="*" ClientIDMode="Static" />
                                <asp:RegularExpressionValidator ID="EmailRequiredExpression" runat="server" ControlToValidate="Email"
                                    CssClass="failureNotification" ErrorMessage="Email format invalid." ToolTip="Email format invalid."
                                    ValidationGroup="LoginUserValidation" ValidationExpression="^[a-zA-Z0-9._-]+@[a-z]+.[a-z]{1,250}$"
                                    Text="*" ClientIDMode="Static" />
                            </td>
                        </tr>--%>
                        <tr>
                            <th>
                            </th>
                            <td>
                                <asp:LinkButton ID="lnkPasswordRequest" runat="server" CausesValidation="False" PostBackUrl="~/Form/Login.aspx"
                                    Text="Click Here for Login" ClientIDMode="Static" />
                                <asp:UpdateProgress ID="UpdateProgress1" runat="server">
                                    <ProgressTemplate>
                                        <img id="imgLoading" src="../Images/loading.gif" style="width: 24px; height: 24px"
                                            runat="server" clientidmode="Static" alt="Loading" />
                                    </ProgressTemplate>
                                </asp:UpdateProgress>
                            </td>
                        </tr>
                        <tr>
                            <th>
                            </th>
                            <td>
                                <asp:Label ID="FailureText" runat="server" ClientIDMode="Static" CssClass="failureNotification" />
                                <asp:ValidationSummary ID="ValidationSummary1" runat="server" ClientIDMode="Static"
                                    CssClass="failureNotification" ValidationGroup="LoginUserValidation" />
                            </td>
                        </tr>
                        <tr>
                            <th>
                            </th>
                            <td>
                                <asp:Button ID="ContinueButton" runat="server" CommandName="Go" ValidationGroup="LoginUserValidation"
                                    ClientIDMode="Static" OnClick="ContinueButton_Click" CssClass="button" />
                            </td>
                        </tr>
                    </table>
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
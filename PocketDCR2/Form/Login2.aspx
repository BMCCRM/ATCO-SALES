<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Login.Master" AutoEventWireup="true" CodeBehind="Login2.aspx.cs" Inherits="PocketDCR2.Form.Login2" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var userDevice;

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                userDevice = "mobile";
            } else {
                userDevice = "system";
            }

            $.ajax({
                type: "POST",
                url: "Login.asmx/UserDevice",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: "{'source':'" + userDevice + "' }",
                success: function (data) {

                },
                cache: false,
                async: false
            });

        });
    </script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <asp:ToolkitScriptManager ID="ToolkitScriptManager1" runat="server" />
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <div class="login_error">
                <asp:Label ID="laberror" runat="server" Text=""></asp:Label>
            </div>
            <div class="login-box">
                <div class="login-head">
                </div>
                <asp:Login ID="Login1" runat="server" OnLoggedIn="Login1_LoggedIn" FailureText="Invalid user id or password."
                    OnLoggingIn="Login1_LoggingIn" ClientIDMode="Static">
                    <LayoutTemplate>
                        <div style="float: left; width: 222px;">
                            <div id="logo-login1">
                                <div id="weldiv">
                                    WELCOME TO</div>
                                <h1 style="margin-left: 3px;">
                                    <a href="#" style="font-size: 42px;">Pharma<span>CRM</span></a></h1>
                                <h2 align="left" style="font-size: 12px; color: #000; margin-top: -5px; padding-left: 13px;
                                    margin-bottom: 5px;">
                                    <%-- Manage.Monitor.Monetize.--%></h2>
                                <div style="float: right; font-size: 12px; margin-right: 5px; margin-top: -8px; text-decoration: underline;">
                                    ver:1.0
                                </div>
                                <asp:Image ID="img1" runat="server" />
                                <img src="../Images/product-large-logo.jpg" />
                                <%--  <asp:Literal ID="Literal1" runat="server"></asp:Literal>--%>
                            </div>
                        </div>
                        <ul class="login">
                            <li>
                                <label for="name">
                                    Username
                                    <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName"
                                        CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="User Name is required."
                                        ValidationGroup="LoginUserValidation" Text="*" ClientIDMode="Static" />
                                </label>
                                <div class="login-input">
                                    <asp:TextBox ID="UserName" runat="server" CssClass="input" ClientIDMode="Static" />
                                    <span>
                                        <img src="../images/user-icon.png" alt="" /></span>
                                </div>
                            </li>
                            <li>
                                <label for="name">
                                    Password
                                    <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password"
                                        CssClass="failureNotification" ErrorMessage="Password is required." ToolTip="Password is required."
                                        ValidationGroup="LoginUserValidation" Text="*" ClientIDMode="Static" />
                                </label>
                                <div class="login-input">
                                    <asp:TextBox ID="Password" runat="server" TextMode="Password" CssClass="input" ClientIDMode="Static" />
                                    <span>
                                        <img src="../images/pass-icon.png" alt="" />
                                    </span>
                                </div>
                            </li>
                            <li>
                                <asp:CheckBox ID="RememberMe" runat="server" ClientIDMode="Static" Text="Remember me" />
                                <%--<asp:Label ID="RememberMeLabel" runat="server" AssociatedControlID="RememberMe" ClientIDMode="Static"
                                    Text=" Remember me" />--%>
                            </li>
                            <li>
                                <asp:Button ID="LoginButton" runat="server" ClientIDMode="Static" CommandName="Login"
                                    ValidationGroup="LoginUserValidation" CssClass="signin-btn" Style="border: none;" />
                            </li>
                        </ul>
                    </LayoutTemplate>
                </asp:Login>
                <div class="login-bottom">
                    <div style="float: left; width: 222px;">
                    </div>
                    <div style="float: right; width: 222px;">
                        <a href="http://www.bmcsouthasia.com/contactUs.html" target="_blank">Contact Us</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <asp:LinkButton ID="lnkPasswordRequest" runat="server" CausesValidation="False" PostBackUrl="~/Form/RecoverPassword.aspx"
                            Text="Forgot your password" ClientIDMode="Static" />
                        <div class="login-divider">
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear">
            </div>
        </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>

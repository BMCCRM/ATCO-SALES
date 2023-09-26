<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MenuControl.ascx.cs"
    Inherits="PocketDCR2.UserControls.MenuControl" %>
<div class="menu">
    <div class="menu_left">
        <asp:Menu ID="NavigationMenu" CssClass="NavigationMenu" StaticDisplayLevels="2" DynamicHorizontalOffset="1"
            StaticSubMenuIndent="1px" MaximumDynamicDisplayLevels="4" Orientation="Horizontal"
            DataSourceID="SiteMapDataSource1" DynamicPopOutImageUrl="~/Images/right-arrow.gif"
            StaticPopOutImageUrl="~/Images/drop-arrow.gif" runat="server" RenderingMode="Table">
            <StaticMenuItemStyle ItemSpacing="10" CssClass="staticMenuItemStyle" />
            <StaticHoverStyle CssClass="staticHoverStyle" />
            <StaticSelectedStyle CssClass="staticMenuItemSelectedStyle" />
            <DynamicMenuItemStyle CssClass="dynamicMenuItemStyle" />
            <DynamicHoverStyle CssClass="menuItemMouseOver" />
            <DynamicMenuStyle CssClass="menuItem" />
            <DynamicSelectedStyle CssClass="menuItemSelected" />
        </asp:Menu>
        <asp:SiteMapDataSource ID="SiteMapDataSource1" runat="server" />
        <div class="clear">
        </div>
    </div>
    <div class="menu_right">
        <ul>
            <li><a href="../Form/ChangePassword.aspx"><span class="welcome_user">Welcome &nbsp; [&nbsp;
                <asp:Label ID="logName" runat="server" Text="Label"></asp:Label>&nbsp;]</span>
                <asp:LoginView ID="LoginView1" runat="server" onunload="LoginView1_Unload">
                    <LoggedInTemplate>
                        <asp:LoginName ID="LoginName1" runat="server" Visible="false" />
                        <asp:LoginStatus ID="LoginStatus1" runat="server" LogoutAction="RedirectToLoginPage" />
                    </LoggedInTemplate>
                </asp:LoginView>
            </a></li>
            <%--<li>
            <a href="">
                </a> </li>
            <li><a href="../Form/ChangePassword.aspx">My Account</a> </li>--%>
        </ul>
        <div class="clear">
            
        </div>
    </div>
    <div class="clear">
    </div>
</div>

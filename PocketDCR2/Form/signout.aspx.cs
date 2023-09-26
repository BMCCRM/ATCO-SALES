using System;

namespace PocketDCR2.Form
{
    public partial class signout : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Session["CurrentUserRole"] = null;
            Session["SystemUser"] = null;
            Session["CurrentUserId"] = null;
            Session["CurrentUserLoginID"] = null;
            Response.Redirect("Login.aspx");
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using PocketDCR2.Classes;
using System.Configuration;


namespace PocketDCR2.MasterPages
{
    public partial class Home : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // This Line Will Create "HISTORY" --Arsal
            GenericUtilityClass.CreateBrowseLog(Page.Title, Page.AppRelativeVirtualPath, Session["CurrentUserId"], Session["SessionDatabaseLoginID"]);

            //MenuContainer.Text = Session["MenuLitral"].ToString();
            if (!IsPostBack)
            {
                if (Session["CurrentUserId"] == null)
                    Response.Redirect("../Form/Login.aspx");



                else
                {
                    var allowedEmpNSMID = ConfigurationManager.AppSettings["AllowedNSMEmpIDsForCustomerDetailPage"].ToString().Split(',');
                    var ExpenseAdmin = ConfigurationManager.AppSettings["ExpenseAdmin"].ToString().Split(',');
                    var AdminCoordinator = ConfigurationManager.AppSettings["AdminCoordinator"].ToString().Split(',');
                    if (allowedEmpNSMID.Contains(Session["CurrentUserId"].ToString()))
                    {
                        HideCustomerMenu.Value = "1";
                    }
                    else if (ExpenseAdmin.Contains(Session["CurrentUserId"].ToString()))
                    {
                        HideCustomerMenu.Value = "2";
                    }
                    else if (AdminCoordinator.Contains(Session["CurrentUserId"].ToString()))
                    {
                        HideCustomerMenu.Value = "3";
                    }


                    // Prevents BackButton To Access Dashboard After Logout Situation
                    Response.ClearHeaders();
                    Response.AddHeader("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
                    Response.AddHeader("Pragma", "no-cache");
                }
            }
        }
    }
}
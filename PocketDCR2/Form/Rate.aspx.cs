using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PocketDCR2.Form
{
    public partial class Rate : System.Web.UI.Page
    {
        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsValidUser())
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());

                if (!IsPostBack)
                {
                    string roleType = Context.Session["CurrentUserRole"].ToString();

                    if (roleType != "admin")
                    {
                        Response.Redirect("../Reports/Dashboard.aspx");
                    }
                }
            }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }

        private bool IsValidUser()
        {
            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];
                return _currentUser != null;
            }
            catch (Exception exception)
            {
                //lblError.Text = "While checking user, it shows " + exception.Message;
            }

            return false;
        }
    }
}
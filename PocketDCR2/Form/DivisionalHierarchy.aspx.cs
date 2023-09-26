using System;
using System.Web.UI;
using PocketDCR.CustomMembershipProvider;
using DatabaseLayer.SQL;

namespace PocketDCR2.Form
{
    public partial class DivisionalHierarchy : Page
    {
        #region Private Members

        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;

        #endregion

        #region Private Functions

        private bool IsValidUser()
        {
            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];
                return _currentUser != null;
            }
            catch (Exception exception)
            {
                lblError.Text = "While checking user, it shows " + exception.Message;
            }

            return false;
        }

        #endregion

        #region Events

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

                    hdnMode.Value = "AddMode";
                }
            }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }

        #endregion
    }
}
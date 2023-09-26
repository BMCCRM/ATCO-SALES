using System;
using System.Web.UI;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;

namespace PocketDCR2.Form
{
    public partial class Instruct : Page
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
                        if (roleType != "headoffice")
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

        protected void btnRefresh_Click(object sender, EventArgs e)
        {
            
        }

        #endregion               
    }
}
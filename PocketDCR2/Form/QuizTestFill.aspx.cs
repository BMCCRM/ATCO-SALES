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
    public partial class QuizTestFill : System.Web.UI.Page
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
                    //string roleType = Context.Session["CurrentUserRole"].ToString();

                    //if (roleType != "admin")
                    //    if (roleType != "headoffice")
                    //    {
                    //        Response.Redirect("Login.aspx");
                    //    }

                    //hdnMode.Value = "AddMode";
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
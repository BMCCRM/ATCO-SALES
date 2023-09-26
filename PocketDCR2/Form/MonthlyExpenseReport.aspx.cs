using DatabaseLayer.SQL;
using Obout.Grid;
using PocketDCR.CustomMembershipProvider;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace PocketDCR2.Form
{
    public partial class MonthlyExpenseReport : System.Web.UI.Page
    {
        #region Private Members

        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;
        int _level1 = 0, _level2 = 0, _level3 = 0, _level4 = 0, _level5 = 0, _level6 = 0;
        private string _role = "";
        //private List<v_EmployeeDetail> withoutHierarchy;
        //private List<v_EmployeeDetailWithHierarchy_6Level> withHierarchy;

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
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using System.Security;
using PocketDCR.CustomMembershipProvider;
using DatabaseLayer.SQL;
using PocketDCR2.Classes;
using System.Collections.Specialized;

namespace PocketDCR2.UserControls
{
    public partial class MenuControl : System.Web.UI.UserControl
    {
        #region Private Members

        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;
        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["CurrentUserId"] != null)
            {
                if (!IsPostBack)
                {
                    DAL dl = new DAL();
                    NameValueCollection nv = new NameValueCollection();
                    nv.Clear();
                    nv.Add("EmployeeId-long", Session["CurrentUserId"].ToString());
                    DataSet ds = dl.GetData("sp_EmployeesSelect", nv);
                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            logName.Text = ds.Tables[0].Rows[0]["FirstName"].ToString().Trim() + " " + ds.Tables[0].Rows[0]["MiddleName"].ToString().Trim()
                            + " " + ds.Tables[0].Rows[0]["LastName"].ToString().Trim();
                        }
                    }
                }
            }
            else
            {
                Response.Redirect("../Form/Login.aspx");
            }
        }

        protected void LoginView1_Unload(object sender, EventArgs e)
        {

        }
    }
}
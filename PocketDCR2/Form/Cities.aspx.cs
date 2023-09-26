using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using System;
using Obout.Grid;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PocketDCR2.Form
{
    public partial class Cities : System.Web.UI.Page
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
            /*if (IsValidUser())
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
            }*/
        }

        protected void btnRefresh_Click(object sender, EventArgs e)
        {

        }
        protected void Grid1_RowDataBound(object sender, GridRowEventArgs e)
        {
            GridDataControlFieldCell cell1 = e.Row.Cells[2] as GridDataControlFieldCell;
            LinkButton lb = cell1.FindControl("LinkButton1") as LinkButton;

            int id = int.Parse(e.Row.Cells[0].Text);
            //string teamids = e.Row.Cells[1].Text.ToString();
            lb.Attributes.Add("onClick", "oGrid_Edit('" + id + "');return false;");
        }
        #endregion  
    }
}
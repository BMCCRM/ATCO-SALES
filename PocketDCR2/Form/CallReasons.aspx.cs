using System;
using Obout.Grid;
using PocketDCR.CustomMembershipProvider;

namespace PocketDCR2.Form
{
    public partial class CallReasons : System.Web.UI.Page
    {
        #region Private Members

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

        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsValidUser())
            {

                if (IsPostBack) return;
                var roleType = Context.Session["CurrentUserRole"].ToString();

                if (roleType != "admin")
                {
                    Response.Redirect("../Reports/Dashboard.aspx");
                }

                hdnMode.Value = "AddMode";
            }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }

        protected void Grid1_RowDataBound(object sender, GridRowEventArgs e)
        {
            //var cell1 = e.Row.Cells[3] as GridDataControlFieldCell;
            //if (cell1 != null)
            //{
            //    var lb = cell1.FindControl("LinkButton1") as LinkButton;

            //    var id = int.Parse(e.Row.Cells[0].Text);
            //    if (lb != null) lb.Attributes.Add("onClick", "oGrid_Edit('" + id + "');return false;");
            //}
        }

        protected void btnRefresh_Click(object sender, EventArgs e)
        {

        }
    }
}
using System;
using System.Web.UI.WebControls;
using PocketDCR.CustomMembershipProvider;
using DatabaseLayer.SQL;
using Obout.Grid;

namespace PocketDCR2.Form
{
    public partial class SalesBrick : System.Web.UI.Page
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
                Response.Redirect("../Form/Login.aspx");
            }
        }

        //protected void btnRefresh_Click(object sender, EventArgs e)
        //{

        //}

        protected void Grid1_RowDataBound(object sender, Obout.Grid.GridRowEventArgs e)
        {
            GridDataControlFieldCell cell1 = e.Row.Cells[5] as GridDataControlFieldCell;
            LinkButton lb = cell1.FindControl("LinkButton1") as LinkButton;

            int id = int.Parse(e.Row.Cells[0].Text);
            lb.Attributes.Add("onClick", "oGrid_Edit('" + id + "');return false;");

        }

        #endregion
    }
}
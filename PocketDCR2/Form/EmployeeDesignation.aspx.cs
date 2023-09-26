using System;
using System.Linq;
using System.Web.UI.WebControls;
using PocketDCR.CustomMembershipProvider;
using DatabaseLayer.SQL;
using Obout.Grid;

namespace PocketDCR2.Form
{
    public partial class EmployeeDesignation : System.Web.UI.Page
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

        private void LoadGrid()
        {
            try
            {
                if (ddlFilterHierarchy.SelectedValue != "-1")
                {
                    Grid1.DataSource =
                        _dataContext.sp_EmployeeDesignationsSelect(null, null, Convert.ToString(ddlFilterHierarchy.SelectedValue)).ToList();
                }
                else
                {
                    Grid1.DataSource = _dataContext.sp_EmployeeDesignationsSelectDefualt().ToList();
                }

                Grid1.DataBind();
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from LoadGrid is " + exception.Message;
            }
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
                    LoadGrid();
                }
            }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }

        protected void Grid1_RowDataBound(object sender, Obout.Grid.GridRowEventArgs e)
        {
            GridDataControlFieldCell cell1 = e.Row.Cells[3] as GridDataControlFieldCell;
            LinkButton lb = cell1.FindControl("LinkButton1") as LinkButton;

            int id = int.Parse(e.Row.Cells[0].Text);
            lb.Attributes.Add("onClick", "oGrid_Edit('" + id + "');return false;");
        }

        protected void ddlFilterHierarchy_SelectedIndexChanged(object sender, EventArgs e)
        {
            this.LoadGrid();
        }

        protected void btnRefresh_Click(object sender, EventArgs e)
        {
            ddlHierarchy.SelectedValue = "-1";
            //ddlFilterHierarchy.SelectedValue = "-1";
            LoadGrid();
        }

        #endregion
        
    }
}
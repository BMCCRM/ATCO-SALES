using System;
using System.Web.UI.WebControls;
using PocketDCR.CustomMembershipProvider;
using DatabaseLayer.SQL;

namespace PocketDCR2.Form
{
    public partial class AppConfiguration1 : System.Web.UI.Page
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
                mpError.Show();
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
                }
            }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }

        protected void btnRefresh_Click(object sender, EventArgs e) 
        {
            GridView1.DataBind();
        }

        protected void GridView1_RowCreated(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.Header)
            {
                e.Row.Cells[0].Visible = false;
                e.Row.Cells[1].Visible = false;
            }
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                e.Row.Cells[0].Visible = false;
                e.Row.Cells[1].Visible = false;
            }
        }

        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                LinkButton lnkedit = e.Row.FindControl("lnkEdit") as LinkButton;
                lnkedit.CommandArgument = e.Row.RowIndex.ToString();

                int id = int.Parse(e.Row.Cells[0].Text);
                lnkedit.Attributes.Add("onClick", "LoadForEdit('" + id + "');return false;");
            }
        }

        protected void btnClose_Click(object sender, EventArgs e)
        {
            mpError.Hide();
        }

        #endregion       
    }
}
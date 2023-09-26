using System;
using System.Linq;
using System.Web.UI.WebControls;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;

namespace PocketDCR2.Form
{
    public partial class PromoItems : System.Web.UI.Page
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

        private bool IsAdmin() 
        {
            bool isAdmin = false;

            try
            {
                if (ValidateAdmin() == "OK")
                {
                    isAdmin = true;
                }
                else 
                {
                    isAdmin = false;
                }                
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from IsAdmin is " + exception.Message;
            }

            return isAdmin;
        }

        private string ValidateAdmin() 
        {
            string returnString = "";

            try
            {
                var dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                var getHierarchy =
                    dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                if (getHierarchy.Count != 0)
                {
                    var hierarchy = Convert.ToString(getHierarchy[0].SettingName);
                    var userRole = Context.Session["CurrentUserRole"].ToString();

                    if (hierarchy == "Level1")
                    {
                        if (userRole == "admin" || userRole == "rl1")
                        {
                            returnString = "OK";
                        }                        
                    }
                    else if (hierarchy == "Level2")
                    {
                        if (userRole == "admin" || userRole == "rl2")
                        {
                            returnString = "OK";
                        }
                    }
                    else if (hierarchy == "Level3")
                    {
                        if (userRole == "admin" || userRole == "rl3")
                        {
                            returnString = "OK";
                        }
                    }
                    else if (hierarchy == "Level4")
                    {
                        if (userRole == "admin" || userRole == "rl4")
                        {
                            returnString = "OK";
                        }
                    }
                    else if (hierarchy == "Level5")
                    {
                        if (userRole == "admin" || userRole == "rl5")
                        {
                            returnString = "OK";
                        }
                    }
                    else if (hierarchy == "Level6")
                    {
                        if (userRole == "admin" || userRole == "rl6")
                        {
                            returnString = "OK";
                        }
                    }    
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
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
            GridView1.DataBind();
        }

        protected void GridView1_RowCreated(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.Header)
            {
                e.Row.Cells[0].Visible = false;
            }
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                e.Row.Cells[0].Visible = false;
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

        #endregion
    }
}
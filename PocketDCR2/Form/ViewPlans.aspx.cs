using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using PocketDCR.CustomMembershipProvider;
using DatabaseLayer.SQL;
using PocketDCR2.Classes;
using System.Collections.Specialized;
using System.Drawing;

namespace PocketDCR2.Form
{
    public partial class ViewPlans : System.Web.UI.Page
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
            catch (Exception)
            {
               // lblError.Text = "While checking user, it shows " + exception.Message;
            }

            return false;
        }

        #endregion
        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsValidUser())
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                controlLoginID.Value = _currentUser.ToString();
                if (!IsPostBack)
                {
                    string roleType = Context.Session["CurrentUserRole"].ToString();
                    stdate.Text = DateTime.Now.ToString("MM/dd/yyyy");
                    if (roleType == "RL6")
                    {
                        Response.Redirect("../Form/SchdulerDayView.aspx");
                    }
                    dsPlans.SelectParameters["month"].DefaultValue = DateTime.Now.ToShortDateString();

                }
            }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }

    

        protected void refreshGrid(object sender,  EventArgs e)
        {
            this.plansGrid.DataBind();
        }

        protected void Action_Click(object sender, EventArgs e)
        {

            DAL dataLayer = new DAL();
            NameValueCollection nvc = new NameValueCollection();

            nvc.Clear();
            int planID = 0;
            string status = "";
            if (((Button)sender).CommandName == "RejectIt")
            {
                planID = Int16.Parse(((Button)sender).CommandArgument);
                nvc.Add("@iseditable-BIT", "1");
                status = "Rejected";
            }
            else if (((Button)sender).CommandName == "ApproveIt")
            {
                planID = Int16.Parse(((Button)sender).CommandArgument);
                nvc.Add("@iseditable-BIT", "0");
                status = "Approved";
            }

          
            nvc.Add("@planMonthID-INT", planID.ToString());   
            nvc.Add("@planStatus-VARCHAR", status);
            nvc.Add("@empauthid-INT", (Session["CurrentUserId"]).ToString());


    //"@EmployeeId-BIGINT", employeeId
    //@planMonthID int,
    //@iseditable bit,
    //@planStatus nvarchar(50),
    //@empauthid int


            if (dataLayer.UpdateData("sp_QuickUpdatePlan", nvc))
            {
                System.Console.Write("YES");
                this.plansGrid.DataBind();
            }
            else System.Console.Write("NO");
            


        }

        protected void plansGrid_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            Color green = ColorTranslator.FromHtml("#57b257");
            Color red = ColorTranslator.FromHtml("#b92c28");
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                // CHECK CONDITION.
                if (e.Row.Cells[3].Text == "Draft" || e.Row.Cells[3].Text == "Rejected")
                {
                    // CHANGE BACKGROUND COLOR OF THTE CELL.
                    e.Row.Cells[3].BackColor = red;
                }
                else if (e.Row.Cells[3].Text == "Submitted" || e.Row.Cells[3].Text == "Resubmitted")
                {
                    e.Row.Cells[3].BackColor = System.Drawing.Color.Yellow;
                }
                else 
                {
                    e.Row.Cells[3].BackColor = green;
                }
            }
        }

       


    }
}
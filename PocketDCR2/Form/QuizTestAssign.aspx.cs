using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using Obout.Grid;
using System.Collections.Specialized;
using PocketDCR2.Classes;

namespace PocketDCR2.Form
{
    public partial class QuizTestAssign : System.Web.UI.Page
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
            }
        }


        protected void Grid1_RowDataBound(object sender, GridRowEventArgs e)
        {
            //GridDataControlFieldCell cell1 = e.Row.Cells[12] as GridDataControlFieldCell;
            //LinkButton lb = cell1.FindControl("LinkButton1") as LinkButton;


            //lb.Attributes.Add("onClick", "oGrid_Edit('" + id + "');return false;");
            GridDataControlFieldCell cell0 = e.Row.Cells[11] as GridDataControlFieldCell;
            GridDataControlFieldCell cell1 = e.Row.Cells[11] as GridDataControlFieldCell;
            GridDataControlFieldCell cell2 = e.Row.Cells[6] as GridDataControlFieldCell;
            GridDataControlFieldCell cell3 = e.Row.Cells[6] as GridDataControlFieldCell;

            LinkButton lb0 = cell0.FindControl("LinkButtonDelete") as LinkButton;
            LinkButton lb1 = cell1.FindControl("LinkButtonCalender") as LinkButton;
            LinkButton lb2 = cell2.FindControl("LinkButtonFormStatus") as LinkButton;
            Label lb3 = cell3.FindControl("LabelFormStatus") as Label;

            int ID = int.Parse(e.Row.Cells[12].Text);
            string FormStatus = e.Row.Cells[4].Text;
            string QuizSubmittedId = e.Row.Cells[5].Text;
            string QuizTestFormId = e.Row.Cells[7].Text;
            string Score = e.Row.Cells[8].Text;
            string FinalAttemptDate1 = e.Row.Cells[10].Text;




            if (FormStatus == "Submitted")
            {
                lb2.Attributes.Add("onClick", "ShowSummary('" + QuizSubmittedId + "','" + QuizTestFormId + "','" + Score + "');return false;");
                //lb2.Text = "Edit";
                //ShowSummary(" + jsonObj[i].QuizSubmittedId + ", " + jsonObj[i].QuizTestFormId + ", " + jsonObj[i].Score + ")'>View Result</button>" : jsonObj[i].FormStatus
                lb2.Visible = true;
                lb3.Visible = false;

            }
            else
            {
                lb3.Text = FormStatus;
                lb2.Visible = false;
                lb3.Visible = true;
            }


            if (FormStatus == "Not Submitted")
            {
                lb1.Attributes.Add("onClick", "FinalAttemptDateModal('" + ID + "','" + FinalAttemptDate1 + "');return false;");
                //lb2.Text = "Edit";
                //ShowSummary(" + jsonObj[i].QuizSubmittedId + ", " + jsonObj[i].QuizTestFormId + ", " + jsonObj[i].Score + ")'>View Result</button>" : jsonObj[i].FormStatus
                lb1.Visible = true;


            }
            else
            {
                lb1.Visible = false;
            }



            lb0.Attributes.Add("onClick", "On_Delete_AssignForm('" + ID + "');return false;");



            //int id = int.Parse(e.Row.Cells[1].Text);
            //int hrLevel3LevelId = int.Parse(e.Row.Cells[5].Text);
            //int hrLevel4LevelId = int.Parse(e.Row.Cells[6].Text);
            //int hrLevel5LevelId = int.Parse(e.Row.Cells[7].Text);
            //int hrLevel6LevelId = int.Parse(e.Row.Cells[8].Text);
            //string DeActiveEmployeeCode = e.Row.Cells[0].Text;
            //string DeActiveEmployeeName = e.Row.Cells[2].Text;

            //if (id != 0)
            //{
            //    lb.Attributes.Add("onClick", "oGrid_Edit('" + id + "','0');return false;");
            //    lb.Text = "Edit";

            //    //lb2.Attributes.Add("onClick", "oGrid_DeActiveEmployee('" + id + "');return false;");
            //    lb2.Attributes.Add("onClick", "oGrid_DeActiveEmployee('" + id + "', '" + DeActiveEmployeeCode + "' , '" + DeActiveEmployeeName + "');return false;");
            //}
            //else
            //{
            //    lb.Attributes.Add("onClick", "addNewRecordOnHierarchy('" + hrLevel3LevelId + "', '" + hrLevel4LevelId + "', '" + hrLevel5LevelId + "', '" + hrLevel6LevelId + "' , '" + DeActiveEmployeeCode + "' , '" + DeActiveEmployeeName + "');return false;");
            //    lb.Text = "Add New";
            //    //lb2.Attributes.Add("onclick", "this.disabled=true;");
            //    lb2.Text = "";
            //}
        }

        protected void btnRefresh_Click(object sender, EventArgs e)
        {

        }
        #endregion     
    }
}
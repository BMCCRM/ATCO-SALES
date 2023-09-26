using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI.WebControls;
using Obout.Grid;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using System.Data;
using System.Collections.Specialized;
using PocketDCR2.Classes;
using System.Web.Services;
using System.Web.Script.Serialization;
using System.Web.Script.Services;

namespace PocketDCR2.Form
{
    public partial class CSRApprovalProcess : System.Web.UI.Page
    {
        #region Private Members

        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;
        int _level1 = 0, _level2 = 0, _level3 = 0, _level4 = 0, _level5 = 0, _level6 = 0;
        private string _role = "";
        private List<v_EmployeeDetail> withoutHierarchy;
        private List<v_EmployeeDetailWithHierarchy> withHierarchy;
        NameValueCollection nv = new NameValueCollection();
        DAL dl = new DAL();

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

        private void CollectData(long employeeId, string role)
        {
            try
            {
                List<EmployeeMembership> getSystemUserId =
                    _dataContext.sp_EmployeeMembershipSelectByEmployee(employeeId).ToList();

                _role = role;

                if (getSystemUserId.Count != 0)
                {
                    List<EmplyeeHierarchy> getLevels =
                        _dataContext.sp_EmplyeeHierarchySelect(Convert.ToInt64(getSystemUserId[0].SystemUserID)).ToList();

                    if (getLevels.Count != 0)
                    {
                        if (role == "rl1")
                        {
                            _level1 = Convert.ToInt32(getLevels[0].LevelId1);
                        }
                        else if (role == "rl2")
                        {
                            _level1 = Convert.ToInt32(getLevels[0].LevelId1);
                            _level2 = Convert.ToInt32(getLevels[0].LevelId2);
                        }
                        else if (role == "rl3")
                        {
                            _level1 = Convert.ToInt32(getLevels[0].LevelId1);
                            _level2 = Convert.ToInt32(getLevels[0].LevelId2);
                            _level3 = Convert.ToInt32(getLevels[0].LevelId3);
                        }
                        else if (role == "rl4")
                        {
                            _level1 = Convert.ToInt32(getLevels[0].LevelId1);
                            _level2 = Convert.ToInt32(getLevels[0].LevelId2);
                            _level3 = Convert.ToInt32(getLevels[0].LevelId3);
                            _level4 = Convert.ToInt32(getLevels[0].LevelId4);
                        }
                        else if (role == "rl5")
                        {
                            _level1 = Convert.ToInt32(getLevels[0].LevelId1);
                            _level2 = Convert.ToInt32(getLevels[0].LevelId2);
                            _level3 = Convert.ToInt32(getLevels[0].LevelId3);
                            _level4 = Convert.ToInt32(getLevels[0].LevelId4);
                            _level5 = Convert.ToInt32(getLevels[0].LevelId5);
                        }
                        else if (role == "rl6")
                        {
                            _level1 = Convert.ToInt32(getLevels[0].LevelId1);
                            _level2 = Convert.ToInt32(getLevels[0].LevelId2);
                            _level3 = Convert.ToInt32(getLevels[0].LevelId3);
                            _level4 = Convert.ToInt32(getLevels[0].LevelId4);
                            _level5 = Convert.ToInt32(getLevels[0].LevelId5);
                            _level6 = Convert.ToInt32(getLevels[0].LevelId6);
                        }
                    }
                }
            }
            catch (Exception exception)
            {
                lblError.Text = exception.Message;
            }
        }

        private void LoadData(string Level1Id, string Level2Id, string Level3Id, string Level4Id, string Level5Id, string Level6Id, string EmployeeId, string StartingDate,string EndingDate)
        {
            try
            {
                #region Initialization

                var dtemployee = new DataTable();

                dtemployee.Columns.Add(new DataColumn("Status", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("Status1", Type.GetType("System.String")));
              
                dtemployee.Columns.Add(new DataColumn("EmployeeName", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("DoctorId", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("DoctorCode", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("DoctorName", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("Designation", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("DoctorSpeciality", Type.GetType("System.String")));
             
                dtemployee.Columns.Add(new DataColumn("RequiredOn", Type.GetType("System.String")));

                dtemployee.Columns.Add(new DataColumn("Level1IdStatus", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("Level1IdComments", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("Level2IdStatus", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("Level2IdComments", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("Level3IdStatus", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("Level3IdComments", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("Level4IdStatus", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("Level4IdComments", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("Level5IdStatus", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("Level5IdComments", Type.GetType("System.String")));

                dtemployee.Columns.Add(new DataColumn("csrmaindataid", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("BTNVisible", Type.GetType("System.String")));
           

            

                #endregion

              

                    //long employeeId = Convert.ToInt64(_currentUser.EmployeeId);

                    //if (getLevelName[0].SettingName == "Level3")
                    //{
                    #region Getting Data From Two Views

                        string Role = Session["CurrentUserRole"].ToString();
                        string Emp = Session["CurrentUserId"].ToString();

                        dtemployee.Clear();
                        nv.Clear();
                        nv.Add("@Level1Id-nvarchar(max)", Level1Id.ToString());
                        nv.Add("@Level2Id-nvarchar(max)", Level2Id.ToString());
                        nv.Add("@Level3Id-nvarchar(max)", Level3Id.ToString());
                        nv.Add("@Level4Id-nvarchar(max)", Level4Id.ToString());
                        nv.Add("@Level5Id-nvarchar(max)", Level5Id.ToString());
                        nv.Add("@Level6Id-nvarchar(max)", Level6Id.ToString());
                        nv.Add("@EmployeeId-nvarchar(max)", EmployeeId.ToString());
                        nv.Add("@StartingDate-nvarchar(max)", StartingDate.ToString());
                        nv.Add("@EndingDate-nvarchar(max)", EndingDate.ToString());
                        nv.Add("@EmpLogin-nvarchar(max)", Emp.ToString());
                        nv.Add("@Role-nvarchar(max)", Role.ToString());

                        var data = dl.GetData("sp_fillCSRData", nv);
                        dtemployee = data.Tables[0];
                  
                    #endregion
                 
                        #region Placing Data Into Grid
                        yay.DataSource = dtemployee;
                        yay.DataBind();
                       

                    #endregion
                    //}
                
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is " + exception.Message;
            }
        }

        [WebMethod(EnableSession = true)]
        public static void Loadtest(string Level1Id, string Level2Id, string Level3Id, string Level4Id, string Level5Id, string Level6Id, string EmployeeId, string StartingDate,string EndingDate)
        {
            try
            {
                CSRApprovalProcess CSR = new CSRApprovalProcess();

              
                CSR.LoadData(Level1Id, Level2Id, Level3Id, Level4Id, Level5Id, Level6Id, EmployeeId, StartingDate, EndingDate);

            }
            catch (Exception exception)
            {
                //lblError.Text = "Exception is " + exception.Message;
            }
        }

        #endregion

        #region Events

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (IsValidUser())
                {
                    _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                    CollectData(Convert.ToInt64(Session["CurrentUserId"]), Convert.ToString(Session["CurrentUserRole"]));
                    DateTime now = DateTime.Now;
                    var startDate = new DateTime(now.Year, now.Month, 1);
                    var endDate = startDate.AddMonths(1).AddDays(-1);
                    LoadData("0","0", "0", "0", "0", "0", "0", startDate.ToString(), endDate.ToString());
                    //Session["GridData"]=yay;
                    //var GridInstance = (Obout.Grid.Grid)Session["GridData"];
                    //yay.DataSource = Loadtest(;
                    //GridInstance.DataBind();
                    if (!IsPostBack)
                    {
                        // hdnMode.Value = "AddMode";
                    }
                }
                else
                {
                    Response.Redirect("Login.aspx");
                }
            }
        }

        protected void btnRefresh_Click(object sender, EventArgs e)
        {

        }

        protected void Grid1_RowDataBound(object sender, GridRowEventArgs e)
        {
            GridDataControlFieldCell cell1 = e.Row.Cells[0] as GridDataControlFieldCell;
            GridDataControlFieldCell cell2 = e.Row.Cells[1] as GridDataControlFieldCell;
          
            
            LinkButton lb = cell1.FindControl("LinkButton1") as LinkButton;
            LinkButton lb2 = cell2.FindControl("LinkButtonApproved") as LinkButton;




            int id = int.Parse((e.Row.Cells[2].Text).Substring(4));

            //lb.Attributes.Add("onClick", "oGrid_Edit('" + id + "');return false;");
            //lb.Text = "View";

            lb.Attributes.Add("onClick", "oGrid_Edit('" + id + "');return false;");
            lb.Text = "View";


            int btnFlag = int.Parse(e.Row.Cells[20].Text);
            if (btnFlag == 1)
            {
                lb2.Attributes.Add("onClick", "oGrid_Approved('" + id + "');return false;");
                lb2.Text = "Approved";
                lb2.Enabled = true;
                lb2.Visible = true;
            }
            else
            {

                lb2.Text = "";
                lb2.Enabled = false;
                lb2.Visible = false;
            }
            
        }

        #endregion

        public string EnableApprovedButton(string EmployeeId,string Role)
        {
            string returnString="";

            nv.Add("@EmployeeId-nvarchar-max", Role); 
            nv.Add("@Role-nvarchar-max", Role);
                DataSet ds = dl.GetData("sp_GetEnableApprovedButton", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                }
                return returnString;
        }
        protected void btnSearch_Click(object sender, EventArgs e)
        {

            LoadData(h1.Value, h2.Value, h3.Value, h4.Value, h5.Value, h6.Value, h7.Value, h8.Value, h9.Value);
            //var GridInstance = (Obout.Grid.Grid)Session["GridData"];
            //yay.DataSource = dtemployee;
            //GridInstance.DataBind();


        }
    }
}
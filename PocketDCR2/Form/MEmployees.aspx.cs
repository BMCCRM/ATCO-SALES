using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI.WebControls;
using Obout.Grid;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using System.Data;

namespace PocketDCR2.Form
{
    public partial class MEmployees : System.Web.UI.Page
    {
        #region Private Members

        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;
        int _level1 = 0, _level2 = 0, _level3 = 0, _level4 = 0, _level5 = 0, _level6 = 0;
        private string _role = "";
        private List<v_EmployeeDetail> withoutHierarchy;
        private List<v_EmployeeDetailWithHierarchy> withHierarchy;

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

        private void LoadData()
        {
            try
            {
                #region Initialization

                var dtemployee = new DataTable();               

                dtemployee.Columns.Add(new DataColumn("EmployeeId", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("Name", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("LoginId", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("Designation", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("EmployeeCode", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("GM", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("BUH", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("National", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("Region", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("Zone", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("Territory", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("Status", Type.GetType("System.String")));
                dtemployee.Columns.Add(new DataColumn("DeviceStatus", Type.GetType("System.String")));
                
                #endregion

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                if (getLevelName.Count != 0)
                {
                    long employeeId = Convert.ToInt64(_currentUser.EmployeeId);

                    //if (getLevelName[0].SettingName == "Level3")
                    //{
                        #region Getting Data From Two Views

                        if (_role == "admin" || _role == "headoffice")
                        {
                            withoutHierarchy = _dataContext.sp_EmployeeDetailSelect0().ToList();
                            withHierarchy = _dataContext.sp_EmployeeDetailSelect().ToList();
                        }

                        #endregion

                        #region Placing Data Into Grid

                        dtemployee.Clear();

                        foreach (var withOutH in withoutHierarchy)
                        {
                            dtemployee.Rows.Add(withOutH.EmployeeId.ToString(), withOutH.EmployeeName, withOutH.LoginId, withOutH.Designation,
                                "-", "-", "-", "-", "-", "-", "-", Convert.ToString(withOutH.IsActive),'0');
                        }

                        foreach (var withH in withHierarchy)
                        {
                            dtemployee.Rows.Add(withH.EmployeeId.ToString(), withH.EmployeeName, withH.LoginId, withH.Designation,
                               withH.EmployeeCode, withH.GM, withH.BUH, withH.National, withH.Region, withH.Zone, withH.Territory, Convert.ToString(withH.Status),'1');
                        }

                        Grid1.DataSource = dtemployee;
                        Grid1.DataBind();

                        #endregion                        
                    //}
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is " + exception.Message;
            }
        }

        #endregion

        #region Events

        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsValidUser())
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                CollectData(Convert.ToInt64(Session["CurrentUserId"]), Convert.ToString(Session["CurrentUserRole"]));
                LoadData();

                if (!IsPostBack)
                {
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

        }    

        protected void Grid1_RowDataBound(object sender, GridRowEventArgs e)
        {
            GridDataControlFieldCell cell1 = e.Row.Cells[13] as GridDataControlFieldCell;
            LinkButton lb = cell1.FindControl("LinkButton1") as LinkButton;

            GridDataControlFieldCell cell2 = e.Row.Cells[15] as GridDataControlFieldCell;
            LinkButton lb2 = cell2.FindControl("LinkButton2") as LinkButton;

            int id = int.Parse(e.Row.Cells[0].Text);
          
            lb.Attributes.Add("onClick", "oGrid_Edit('" + id + "');return false;");
            int devicestatus = int.Parse(e.Row.Cells[12].Text);
            if (devicestatus == 0)
            {
                lb2.Enabled = false;
                lb2.Text = "";
            }
            else
            {
                lb2.Attributes.Add("onClick", "oGrid_ResetDevice('" + id + "');return false;");
            }
        }

        #endregion

    }
}
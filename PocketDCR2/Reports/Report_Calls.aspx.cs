using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using System.Collections.Specialized;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;

namespace PocketDCR2.Reports
{
    public partial class Report_Calls : System.Web.UI.Page
    {
        #region Private Members

        private int _currentLevelId = 0, _level1Id = 0, _level2Id = 0, _level3Id = 0, _level4Id = 0, _level5Id = 0, _level6Id = 0;
        private NameValueCollection _nvCollection = new NameValueCollection();
        private static string _currentRole = "", _hierarchyName = "";
        private List<DatabaseLayer.SQL.AppConfiguration> _getHierarchy;
        private int _dataFound = 0;
        private long _employeeId = 0;
        private DateTime _currentDate = DateTime.Today;
        private DatabaseDataContext _dataContext = new DatabaseDataContext();
        private SystemUser _currentUser;
        #endregion

        #region Public Member
       
        //       DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
       
        List<SystemRole> _getRoleId;
        List<v_EmployeeWithRole> _getEmployeeWithLevel;
        List<EmploeesInRole> _insertEmployeeInRole;
        //List<v_EmployeeWithRole> _getHierarchyLevel3;
        List<v_EmployeeWithRole> _getHierarchyLevel3;
        List<HierarchyLevel4> _getHierarchyLevel4;
        List<HierarchyLevel5> _getHierarchyLevel5;
        List<HierarchyLevel6> _getHierarchyLevel6;


        //      private SystemUser _currentUser;
        //      string _hierarchyName, _currentRole;
        //       private List<DatabaseLayer.SQL.AppConfiguration> _getHierarchy;
        //      private int _level1Id = 0, _level2Id = 0, _level3Id = 0, _level4Id = 0, _level5Id = 0, _level6Id = 0, _currentLevelId = 0;
        //     private long _employeeId = 0;
        #endregion
        NameValueCollection nv = new NameValueCollection();

        #region Database Layer

        private System.Data.DataSet GetData(String SpName, NameValueCollection NV)
        {
            var connection = new SqlConnection();
            string dbTyper = "";

            try
            {
                connection.ConnectionString = Classes.Constants.GetConnectionString();
                var dataSet = new System.Data.DataSet();
                connection.Open();

                var command = new SqlCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = connection;
                command.CommandText = SpName;

                if (NV != null)
                {
                    //New code implemented for retrieving data
                    for (int i = 0; i < NV.Count; i++)
                    {
                        string[] arraySplit = NV.Keys[i].Split('-');

                        if (arraySplit.Length > 2)
                        {
                            dbTyper = "SqlDbType." + arraySplit[1].ToString() + "," + arraySplit[2].ToString();

                            if (NV[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = DBNull.Value;
                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
                            }
                        }
                        else
                        {
                            dbTyper = "SqlDbType." + arraySplit[1].ToString();

                            if (NV[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = DBNull.Value;
                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
                            }
                        }
                    }
                }

                var dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = command;
                dataAdapter.Fill(dataSet);

                return dataSet;
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
                return null;
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }
        }

        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {


            if (!IsPostBack)
            {
                
               // GetCurrentLevelId(0);
                

                DateTime dtReportDate = DateTime.Now;
                string date = Convert.ToDateTime(Request.QueryString["Month"]).Month + "/" + Request.QueryString["Day"] + "/" + Convert.ToDateTime(Request.QueryString["Month"]).Year.ToString();
                string level1id = "", level2id = "", level3id = "", level4id = "", level5id = "", level6id = "", Employeeid = "", Flag = "";
                string roleType = Convert.ToString(Session["CurrentUserRole"]);



             
                //if (roleType == "rl6")
                //{
                //    level1id = _level1Id.ToString();
                //    level2id = _level2Id.ToString();
                //    level3id = _level3Id.ToString();
                //    level4id = _level4Id.ToString();
                //    level5id = _level5Id.ToString();
                //    level6id = _level6Id.ToString();
                //    Employeeid = _employeeId.ToString();
                //    Flag = Request.QueryString["flag"].ToString();
                //}
                //else if (roleType == "admin")
                //{
                //    level1id = Request.QueryString["level1"].ToString();
                //    level2id = Request.QueryString["level2"].ToString();
                //    level3id = Request.QueryString["level3"].ToString();
                //    level4id = Request.QueryString["level4"].ToString();
                //    level5id = Request.QueryString["level5"].ToString();
                //    level6id = Request.QueryString["level6"].ToString();
                //    Employeeid = "0";
                //    Flag = Request.QueryString["flag"].ToString();
                //}
                //else
                //{
                    level1id = Request.QueryString["Level1"].ToString();
                    level2id = Request.QueryString["Level2"].ToString();
                    level3id = Request.QueryString["Level3"].ToString();
                    level4id = Request.QueryString["Level4"].ToString();
                    level5id = Request.QueryString["Level5"].ToString();
                    level6id = Request.QueryString["Level6"].ToString();
                    Employeeid = "0";
                    Flag = Request.QueryString["flag"].ToString();
               // }

                #region Commented
                //string constr = Classes.Constants.GetConnectionString();
                //DataTable dt = new DataTable();
                //using (SqlConnection con = new SqlConnection(constr))
                //{
                //    SqlCommand cmd = new SqlCommand();
                //    cmd.CommandText = "select Zone,visitdate,mr_name,sum(calls) calls from vw_MR_Call_count where datediff(day,visitdate,convert(datetime,'@date'))=0 group by Zone,visitdate,mr_name".Replace("@date", date);
                //    //cmd.CommandType = CommandType.StoredProcedure;
                //    cmd.Connection = con;
                //    SqlDataAdapter da = new SqlDataAdapter(cmd);
                //    da.Fill(dt);
                //}
                #endregion

                nv.Clear();
                nv.Add("@Level1ID-INT", level1id);
                nv.Add("@Level2ID-INT", level2id);
                nv.Add("@Level3ID-INT", level3id);
                nv.Add("@Level4ID-INT", level4id);
                nv.Add("@Level5ID-INT", level5id);
                nv.Add("@Level6ID-INT", level6id);
                nv.Add("@employeeid-INT", Employeeid);
                nv.Add("@date-date", date);
                nv.Add("@flag-date", Flag);


                DataSet ds = GetData("sp_mr_call_count", nv);


                ReportViewer1.ProcessingMode = Microsoft.Reporting.WebForms.ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath("./Reports_Dashboard/NewCallReport.rdlc");
                ReportViewer1.LocalReport.DataSources.Clear();
                List<Microsoft.Reporting.WebForms.ReportParameter> param1 = new List<Microsoft.Reporting.WebForms.ReportParameter>();
                param1.Add(new Microsoft.Reporting.WebForms.ReportParameter("Path", Request.Url.AbsoluteUri.Replace(Request.Url.AbsolutePath, "") + @"/Images/green.png"));
                param1.Add(new Microsoft.Reporting.WebForms.ReportParameter("Path2", Request.Url.AbsoluteUri.Replace(Request.Url.AbsolutePath, "") + @"/Images/red.png"));
                ReportViewer1.LocalReport.SetParameters(param1);
                ReportViewer1.LocalReport.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("DS_MR_CallCount", ds.Tables[0]));
                ReportViewer1.DocumentMapCollapsed = true;

            }
        }

        public string GetCurrentLevelId(long type)
        {
            string returnString = "";
            try
            {
                if (type == 0)
                {
                    _currentUser = (SystemUser)Session["SystemUser"];
                }

                _getHierarchy = _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                if (_getHierarchy.Count != 0)
                {
                    _hierarchyName = _getHierarchy[0].SettingName;

                    var currentRole = Convert.ToString(Session["CurrentUserRole"]);
                    _currentRole = currentRole;

                    #region Check ID Present ?

                    long employeeId = 0;

                    if (type != 0)
                    {
                        employeeId = type;
                    }
                    else
                    {
                        employeeId = Convert.ToInt64(_currentUser.EmployeeId);
                    }

                    _employeeId = employeeId;

                    #endregion

                    var getCurrentMembershipId =
                        _dataContext.sp_EmployeeMembershipSelectByEmployee(employeeId).ToList();

                    if (getCurrentMembershipId.Count != 0)
                    {
                        var getCurrentLevelId =
                            _dataContext.sp_EmployeeHierarchySelectByMembership(Convert.ToInt64(getCurrentMembershipId[0].SystemUserID)).ToList();

                        if (getCurrentLevelId.Count != 0)
                        {
                            _level1Id = Convert.ToInt32(getCurrentLevelId[0].LevelId1); _level2Id = Convert.ToInt32(getCurrentLevelId[0].LevelId2);
                            _level3Id = Convert.ToInt32(getCurrentLevelId[0].LevelId3); _level4Id = Convert.ToInt32(getCurrentLevelId[0].LevelId4);
                            _level5Id = Convert.ToInt32(getCurrentLevelId[0].LevelId5); _level6Id = Convert.ToInt32(getCurrentLevelId[0].LevelId6);

                            returnString = _level1Id + ":" + _level2Id + ":" + _level3Id + ":" + _level4Id + ":" + _level5Id + ":" + _level6Id;

                            #region Set Currennt Level Id

                            if (_hierarchyName == "Level1")
                            {
                                if (currentRole == "rl1")
                                {
                                    _currentLevelId = _level1Id;
                                }
                                else if (currentRole == "rl2")
                                {
                                    _currentLevelId = _level2Id;
                                }
                                else if (currentRole == "rl3")
                                {
                                    _currentLevelId = _level3Id;
                                }
                                else if (currentRole == "rl4")
                                {
                                    _currentLevelId = _level4Id;
                                }
                                else if (currentRole == "rl5")
                                {
                                    _currentLevelId = _level5Id;
                                }
                                else if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }
                            else if (_hierarchyName == "Level2")
                            {
                                if (currentRole == "rl2")
                                {
                                    _currentLevelId = _level2Id;
                                }
                                else if (currentRole == "rl3")
                                {
                                    _currentLevelId = _level3Id;
                                }
                                else if (currentRole == "rl4")
                                {
                                    _currentLevelId = _level4Id;
                                }
                                else if (currentRole == "rl5")
                                {
                                    _currentLevelId = _level5Id;
                                }
                                else if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }
                            else if (_hierarchyName == "Level3")
                            {
                                if (currentRole == "rl3")
                                {
                                    _currentLevelId = _level3Id;
                                }
                                else if (currentRole == "rl4")
                                {
                                    _currentLevelId = _level4Id;
                                }
                                else if (currentRole == "rl5")
                                {
                                    _currentLevelId = _level5Id;
                                }
                                else if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }
                            else if (_hierarchyName == "Level4")
                            {
                                if (currentRole == "rl4")
                                {
                                    _currentLevelId = _level4Id;
                                }
                                else if (currentRole == "rl5")
                                {
                                    _currentLevelId = _level5Id;
                                }
                                else if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }
                            else if (_hierarchyName == "Level5")
                            {
                                if (currentRole == "rl5")
                                {
                                    _currentLevelId = _level5Id;
                                }
                                else if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }
                            else if (_hierarchyName == "Level6")
                            {
                                if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }

                            #endregion
                        }
                    }
                }
            }
            catch (Exception exception)
            {

            }

            return returnString.ToString();
        }
    }
}
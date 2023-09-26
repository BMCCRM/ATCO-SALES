using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;
using System.Data.Common;
using System.Data.SqlClient;
using PocketDCR.CustomMembershipProvider;
using System.Data;
using System.Collections.Specialized;
using DatabaseLayer;
using System.Configuration;


namespace PocketDCR2.Reports
{
    /// <summary>
    /// Summary description for datascreen
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    [ScriptService]
    public class datascreen : System.Web.Services.WebService
    {
        #region Public Member
        DAL dll = new DAL();
        NameValueCollection nv = new NameValueCollection();
        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        List<SystemRole> _getRoleId;
        List<v_EmployeeWithRole> _getEmployeeWithLevel;
        List<EmploeesInRole> _insertEmployeeInRole;
        List<v_EmployeeWithRole> _getHierarchyLevel1;
        List<v_EmployeeWithRole> _getHierarchyLevel2;
        List<v_EmployeeWithRole> _getHierarchyLevel3;
        List<HierarchyLevel4> _getHierarchyLevel4;
        List<HierarchyLevel5> _getHierarchyLevel5;
        List<HierarchyLevel6> _getHierarchyLevel6;


        private SystemUser _currentUser;
        string _hierarchyName, _currentRole;
        private List<DatabaseLayer.SQL.AppConfiguration> _getHierarchy;
        private int _level1Id = 0, _level2Id = 0, _level3Id = 0, _level4Id = 0, _level5Id = 0, _level6Id = 0, _currentLevelId = 0;
        private long _employeeId = 0;
        #endregion


        private void role()
        {
            var roleId = _dataContext.sp_EmploeesInRolesSelect(null, Convert.ToInt64(_currentUser.EmployeeId)).ToList();
            if (roleId.Count != 0)
            {
                var getRoleId = roleId[0].RoleId;

                var getRole = _dataContext.sp_SystemRolesSelect(getRoleId).ToList();

                if (getRole.Count != 0)
                {
                    _currentRole = getRole[0].LoweredRoleName;
                }
            }

        }
        
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<GridSuccess> SuccessDCRData(int level3Id, int level4Id, int level5Id, int level6Id, int EmployeeId, string StartingDate, string EndingDate)
        {
            string returnString = "";

            List<DatabaseLayer.SQL.AppConfiguration> getLevelName = _dataContext.sp_AppConfigurationSelectHierarchy().ToList();
            _hierarchyName = Convert.ToString(getLevelName[0].SettingName);
            _currentRole = Convert.ToString(Session["CurrentUserRole"].ToString());
            List<GridSuccess> t5 = new List<GridSuccess>();

            #region SET Hierarchy Level

            if (_currentRole == "admin" || _currentRole == "admincoordinator" || _currentRole == "headoffice")
            {
                if (_hierarchyName == "Level3")
                {
                    #region admin

                    #region L1
                    if (level3Id == -1)
                    {
                        _employeeId = 0;
                    }
                    else
                    {
                        if (level3Id != -1)
                        {
                            _employeeId = 0;
                            GetCurrentLevelId(Convert.ToInt32(level3Id));
                        }
                        else { GetCurrentLevelId(0); _employeeId = 0; }
                    }

                    #endregion

                    #region L2
                    if (level4Id == -1)
                    {
                        _employeeId = 0;
                    }
                    else
                    {
                        if (level4Id != -1)
                        {
                            _employeeId = 0;
                            GetCurrentLevelId(Convert.ToInt32(level4Id));
                        }
                        else { GetCurrentLevelId(0); _employeeId = 0; }
                    }

                    #endregion

                    #region L3
                    if (level5Id == -1)
                    {
                        _employeeId = 0;
                    }
                    else
                    {
                        if (level5Id != -1)
                        {
                            _employeeId = 0;
                            GetCurrentLevelId(Convert.ToInt32(level5Id));
                        }
                        else { GetCurrentLevelId(0); _employeeId = 0; }
                    }

                    #endregion

                    #region L4
                    if (level6Id == -1)
                    {
                        _employeeId = 0;
                    }
                    else
                    {
                        if (level6Id != -1)
                        {
                            _employeeId = 0;
                            GetCurrentLevelId(Convert.ToInt32(level6Id));
                        }
                        else { GetCurrentLevelId(0); _employeeId = 0; }
                    }

                    #endregion

                    #endregion
                }
            }

            #region rl1 rl2
            else if (_currentRole == "rl1")
            {

                if (_hierarchyName == "Level3")
                {

                }

            }
            else if (_currentRole == "rl2")
            {
                if (_hierarchyName == "Level3")
                {

                }
            }
            #endregion

            else if (_currentRole == "rl3")
            {
                #region NSM
                if (_hierarchyName == "Level3")
                {
                    #region L4

                    if (level3Id == -1)
                    {
                        _employeeId = 0;
                    }
                    else if (level3Id != -1)
                    {
                        GetCurrentLevelId(Convert.ToInt32(level3Id));
                    }
                    else { GetCurrentLevelId(0); }
                    #endregion

                    #region L5
                    if (level4Id == -1)
                    {
                        _employeeId = 0;
                    }
                    else if (level4Id != -1)
                    {
                        GetCurrentLevelId(Convert.ToInt32(level4Id));
                        _employeeId = Convert.ToInt32(level4Id);
                    }
                    // else { GetCurrentLevelId(0); }
                    #endregion

                    #region L6
                    if (level5Id == -1)
                    {
                        _employeeId = 0;
                    }
                    else if (level5Id != -1)
                    {
                        _employeeId = 0;
                        GetCurrentLevelId(Convert.ToInt32(level5Id));
                    }
                    //else { GetCurrentLevelId(0); _employeeId = 0; }


                    #endregion
                }
                #endregion
            }
            else if (_currentRole == "rl4")
            {
                #region RSM

                if (_hierarchyName == "Level3")
                {


                    if (level3Id == -1)
                    {
                        _employeeId = 0;
                    }

                    if (level3Id != -1)
                    {
                        _employeeId = 0;
                        GetCurrentLevelId(Convert.ToInt32(level3Id));
                    }
                    else { GetCurrentLevelId(0); _employeeId = 0; }


                    if (level4Id == -1)
                    {
                        _employeeId = 0;
                    }
                    if (level4Id != -1)
                    {
                        GetCurrentLevelId(Convert.ToInt32(level4Id));
                        _employeeId = Convert.ToInt32(level4Id);
                    }
                    //else if (level3Id != -1) 
                    //{ 
                    //    GetCurrentLevelId(0); 
                    //}

                }
                #endregion
            }
            else if (_currentRole == "rl5")
            {
                #region ZSM


                if (_hierarchyName == "Level3")
                {
                    if (level3Id == -1)
                    {
                        _employeeId = 0;
                    }
                    if (level3Id != -1)
                    {
                        GetCurrentLevelId(Convert.ToInt32(level3Id));
                        _employeeId = Convert.ToInt32(level3Id);
                    }
                    else { GetCurrentLevelId(0); _employeeId = 0; }

                }
                #endregion
            }
            else if (_currentRole == "rl6")
            {
                #region MR
                if (_hierarchyName == "Level3")
                {
                    GetCurrentLevelId(0);
                }
                #endregion
            }

            #endregion
            try
            {

                #region GET DataScreen

                #region
                //NameValueCollection _nvCollection = new NameValueCollection();
                //_nvCollection.Add("@Level3Id-int", Convert.ToString(_level3Id));
                //_nvCollection.Add("@Level4Id-int", Convert.ToString(_level4Id));
                //_nvCollection.Add("@Level5Id-int", Convert.ToString(_level5Id));
                //_nvCollection.Add("@Level6Id-int", Convert.ToString(_level6Id));
                //_nvCollection.Add("@EmployeeId-int", Convert.ToString(EmployeeId));
                //_nvCollection.Add("@StartingDate-datetime", StartingDate.ToString());
                //_nvCollection.Add("@EndingDate-datetime", EndingDate.ToString());
                //_nvCollection.Add("@DoctorId-int", Convert.ToString(0));
                //_nvCollection.Add("@DoctorClass-int", Convert.ToString(0));
                //_nvCollection.Add("@VisitShift-int", Convert.ToString(0));
                //ds = dll.GetData("PreSalesCalls_DataScreen_New", _nvCollection);
                #endregion

                #region create query

                string query = "Select '' AS Level1Name , '' AS Level2Name,VST.division AS division,Vst.Region AS Region, Vst.zone AS zone, " +
                 "vst.Territory AS Territory,VST.EmployeeCode + Vst.EmployeeName AS EmployeeName,VST.MobileNumber AS MobileNumber," +
                 "VST.DoctorName DoctorName, VST.DocBrick AS Brick, VST.CreationDateTime AS RecieveDate, VST.VisitDateTime AS VisitDate," +
                 "VST.P1,VST.P2,VST.P3,VST.P4,VST.S1,VST.SQ1,VST.S2,VST.SQ2,VST.S3,VST.SQ3,VST.G1,VST.G2,VST.R1,VST.R2,VST.R3, " +
                 "(SELECT vjv.JV1 from v_jointvst vjv where vjv.SalesCallId = VST.SalesCallId) AS JV1," +
                 "(SELECT vjv.JV2 from v_jointvst vjv where vjv.SalesCallId = VST.SalesCallId) AS JV2," +
                 "(SELECT vjv.JV3 from v_jointvst vjv where vjv.SalesCallId = VST.SalesCallId) AS JV3," +
                 "(SELECT vjv.JV4 from v_jointvst vjv where vjv.SalesCallId = VST.SalesCallId) AS JV4" +
                 " from v_datascreen VST  WHERE " +
                 " VST.VisitDateTime BETWEEN '" + StartingDate.ToString() + "' and '" + EndingDate.ToString() + "'" +
                 " AND VST.Level3LevelId = CASE WHEN " + _level3Id + " <> 0 AND " + _level3Id + " IS NOT NULL THEN " + _level3Id + " ELSE VST.Level3LevelId END" +
                 " AND VST.Level4LevelId = CASE WHEN " + _level4Id + " <> 0 AND " + _level4Id + " IS NOT NULL THEN " + _level4Id + " ELSE VST.Level4LevelId END" +
                 " AND VST.Level5LevelId = CASE WHEN " + _level5Id + " <> 0 AND " + _level5Id + " IS NOT NULL THEN " + _level5Id + " ELSE VST.Level5LevelId END" +
                 " AND VST.Level6LevelId = CASE WHEN " + _level6Id + " <> 0 AND " + _level6Id + " IS NOT NULL THEN " + _level6Id + " ELSE VST.Level6LevelId END" +
                 " AND VST.EmployeeId = CASE WHEN " + EmployeeId + " <> 0 AND " + EmployeeId + " IS NOT NULL THEN " + EmployeeId + " ELSE VST.EmployeeId END" +
                 " AND VST.DoctorId = CASE WHEN " + 0 + " <> 0 AND " + 0 + " IS NOT NULL THEN " + 0 + " ELSE VST.DoctorId END" +
                 " AND VST.VisitShift2 = CASE WHEN " + 0 + " <> 0 AND " + 0 + " IS NOT NULL THEN " + 0 + " ELSE VST.VisitShift2 END" +
                 " ORDER BY VST.EmployeeId,Vst.SalesCallId";

                #endregion

                var connection = new SqlConnection();
                SqlDataAdapter adapter = new SqlDataAdapter();
                DataSet ds = new DataSet();
                connection.ConnectionString = Constants.GetConnectionString();
                try
                {
                    connection.Open();
                    adapter.SelectCommand = new SqlCommand(query, connection);
                    adapter.Fill(ds);
                    connection.Close();

                    //ds.Tables[0].Rows.Count

                    for (int i = 0; i <= ds.Tables[0].Rows.Count; i++)
                    {
                        t5.Add(
                            new GridSuccess(
                                ds.Tables[0].Rows[i]["division"].ToString(), ds.Tables[0].Rows[i]["Region"].ToString(),
                                ds.Tables[0].Rows[i]["zone"].ToString(), ds.Tables[0].Rows[i]["Territory"].ToString(),
                                ds.Tables[0].Rows[i]["EmployeeName"].ToString(), ds.Tables[0].Rows[i]["MobileNumber"].ToString(),
                                ds.Tables[0].Rows[i]["DoctorName"].ToString(), ds.Tables[0].Rows[i]["Brick"].ToString(),
                                ds.Tables[0].Rows[i]["RecieveDate"].ToString(), ds.Tables[0].Rows[i]["VisitDate"].ToString(),
                                ds.Tables[0].Rows[i]["P1"].ToString(), ds.Tables[0].Rows[i]["P2"].ToString(),
                                ds.Tables[0].Rows[i]["P3"].ToString(), ds.Tables[0].Rows[i]["P4"].ToString(),
                                
                                ds.Tables[0].Rows[i]["S1"].ToString(),
                                ds.Tables[0].Rows[i]["SQ1"].ToString(),
                                ds.Tables[0].Rows[i]["S2"].ToString(),
                                ds.Tables[0].Rows[i]["SQ2"].ToString(),
                                ds.Tables[0].Rows[i]["S3"].ToString(), 
                                ds.Tables[0].Rows[i]["SQ3"].ToString(),

                                ds.Tables[0].Rows[i]["G1"].ToString(), ds.Tables[0].Rows[i]["G2"].ToString(),

                                ds.Tables[0].Rows[i]["R1"].ToString(), ds.Tables[0].Rows[i]["R2"].ToString(),
                                ds.Tables[0].Rows[i]["R3"].ToString(), ds.Tables[0].Rows[i]["JV1"].ToString(),
                                ds.Tables[0].Rows[i]["JV2"].ToString(), ds.Tables[0].Rows[i]["JV3"].ToString(),
                                ds.Tables[0].Rows[i]["JV4"].ToString()
                                ));
                    }



                }
                catch (Exception ex)
                { }


                #endregion

                //  returnString = _jss.Serialize(DataScreen);

            }
            catch (Exception exception)
            {
                // returnString = exception.Message;
            }
            return t5;
        }


        [Serializable]
        public class GridSuccess
        {
            public GridSuccess(string _division, string _Region
                , string _zone, string _Territory
                , string _EmployeeName, string _MobileNumber, string _DoctorName, string _Brick, string _RecieveDate, string _VisitDate,
                string _P1, string _P2, string _P3, string _P4, string _S1, string _SQ1, string _S2, string _SQ2, string _S3, string _SQ3,
                string _G1, string _G2, string _R1, string _R2, string _R3, string _JV1, string _JV2, string _JV3, string _JV4
                )
            {
                division = _division;
                Region = _Region;
                zone = _zone;
                Territory = _Territory;
                EmployeeName = _EmployeeName;
                MobileNumber = _MobileNumber;
                DoctorName = _DoctorName;
                Brick = _Brick;
                RecieveDate = _RecieveDate;
                VisitDate = _VisitDate;
                P1 = _P1;
                P2 = _P2;
                P3 = _P3;
                P4 = _P4;
                S1 = _S1;
                S2 = _S2;
                S3 = _S3;
                SQ1 = _SQ1;
                SQ2 = _SQ2;
                SQ3 = _SQ3;
                G1 = _G1;
                G2 = _G2;
                R1 = _R1;
                R2 = _R2;
                R3 = _R3;
                JV1 = _JV1;
                JV2 = _JV2;
                JV3 = _JV3;
                JV4 = _JV4;
            }


            public string division { get; set; }
            public string Region { get; set; }
            public string zone { get; set; }
            public string Territory { get; set; }
            public string EmployeeName { get; set; }
            public string MobileNumber { get; set; }
            public string DoctorName { get; set; }
            public string Brick { get; set; }
            public string RecieveDate { get; set; }
            public string VisitDate { get; set; }
            public string P1 { get; set; }
            public string P2 { get; set; }
            public string P3 { get; set; }
            public string P4 { get; set; }

            public string S1 { get; set; }
            public string S2 { get; set; }
            public string S3 { get; set; }

            public string SQ1 { get; set; }
            public string SQ2 { get; set; }
            public string SQ3 { get; set; }

            public string G1 { get; set; }
            public string G2 { get; set; }

            public string R1 { get; set; }
            public string R2 { get; set; }
            public string R3 { get; set; }

            public string JV1 { get; set; }
            public string JV2 { get; set; }
            public string JV3 { get; set; }
            public string JV4 { get; set; }
        }


        [WebMethod(EnableSession = true)]
        public List<GridError> ErrorData(int level3Id, int level4Id, int level5Id, int level6Id, int EmployeeId, DateTime StartingDate, DateTime EndingDate)
        {
            List<GridError> t5 = new List<GridError>();
            //   string returnString = "";
            try
            {
                List<DatabaseLayer.SQL.AppConfiguration> getLevelName = _dataContext.sp_AppConfigurationSelectHierarchy().ToList();
                _hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                _currentRole = Convert.ToString(Session["CurrentUserRole"].ToString());

                #region SET Hierarchy Level

                if (_currentRole == "admin" || _currentRole == "admincoordinator" || _currentRole == "headoffice")
                {
                    if (_hierarchyName == "Level3")
                    {
                        #region admin

                        #region L1
                        if (level3Id == -1)
                        {
                            _employeeId = 0;
                        }
                        else
                        {
                            if (level3Id != -1)
                            {
                                _employeeId = 0;
                                GetCurrentLevelId(Convert.ToInt32(level3Id));
                            }
                            else { GetCurrentLevelId(0); _employeeId = 0; }
                        }

                        #endregion

                        #region L2
                        if (level4Id == -1)
                        {
                            _employeeId = 0;
                        }
                        else
                        {
                            if (level4Id != -1)
                            {
                                _employeeId = 0;
                                GetCurrentLevelId(Convert.ToInt32(level4Id));
                            }
                            else { GetCurrentLevelId(0); _employeeId = 0; }
                        }

                        #endregion

                        #region L3
                        if (level5Id == -1)
                        {
                            _employeeId = 0;
                        }
                        else
                        {
                            if (level5Id != -1)
                            {
                                _employeeId = 0;
                                GetCurrentLevelId(Convert.ToInt32(level5Id));
                            }
                            else { GetCurrentLevelId(0); _employeeId = 0; }
                        }

                        #endregion

                        #region L4
                        if (level6Id == -1)
                        {
                            _employeeId = 0;
                        }
                        else
                        {
                            if (level6Id != -1)
                            {
                                _employeeId = 0;
                                GetCurrentLevelId(Convert.ToInt32(level6Id));
                            }
                            else { GetCurrentLevelId(0); _employeeId = 0; }
                        }

                        #endregion

                        #endregion
                    }
                }

                #region rl1 rl2
                else if (_currentRole == "rl1")
                {

                    if (_hierarchyName == "Level3")
                    {

                    }

                }
                else if (_currentRole == "rl2")
                {
                    if (_hierarchyName == "Level3")
                    {

                    }
                }
                #endregion

                else if (_currentRole == "rl3")
                {
                    #region NSM
                    if (_hierarchyName == "Level3")
                    {
                        #region L4

                        if (level3Id == -1)
                        {
                            _employeeId = 0;
                        }
                        else if (level3Id != -1)
                        {
                            GetCurrentLevelId(Convert.ToInt32(level3Id));
                        }
                        else { GetCurrentLevelId(0); }
                        #endregion

                        #region L5
                        if (level4Id == -1)
                        {
                            _employeeId = 0;
                        }
                        else if (level4Id != -1)
                        {
                            GetCurrentLevelId(Convert.ToInt32(level4Id));
                            _employeeId = Convert.ToInt32(level4Id);
                        }
                        // else { GetCurrentLevelId(0); }
                        #endregion

                        #region L6
                        if (level5Id == -1)
                        {
                            _employeeId = 0;
                        }
                        else if (level5Id != -1)
                        {
                            _employeeId = 0;
                            GetCurrentLevelId(Convert.ToInt32(level5Id));
                        }
                        //else { GetCurrentLevelId(0); _employeeId = 0; }


                        #endregion
                    }
                    #endregion
                }
                else if (_currentRole == "rl4")
                {
                    #region RSM

                    if (_hierarchyName == "Level3")
                    {


                        if (level3Id == -1)
                        {
                            _employeeId = 0;
                        }

                        if (level3Id != -1)
                        {
                            _employeeId = 0;
                            GetCurrentLevelId(Convert.ToInt32(level3Id));
                        }
                        else { GetCurrentLevelId(0); _employeeId = 0; }


                        if (level4Id == -1)
                        {
                            _employeeId = 0;
                        }
                        if (level4Id != -1)
                        {
                            GetCurrentLevelId(Convert.ToInt32(level4Id));
                            _employeeId = Convert.ToInt32(level4Id);
                        }
                        //else if (level3Id != -1) 
                        //{ 
                        //    GetCurrentLevelId(0); 
                        //}

                    }
                    #endregion
                }
                else if (_currentRole == "rl5")
                {
                    #region ZSM


                    if (_hierarchyName == "Level3")
                    {
                        if (level3Id == -1)
                        {
                            _employeeId = 0;
                        }
                        if (level3Id != -1)
                        {
                            GetCurrentLevelId(Convert.ToInt32(level3Id));
                            _employeeId = Convert.ToInt32(level3Id);
                        }
                        else { GetCurrentLevelId(0); _employeeId = 0; }

                    }
                    #endregion
                }
                else if (_currentRole == "rl6")
                {
                    #region MR
                    if (_hierarchyName == "Level3")
                    {
                        GetCurrentLevelId(0);
                    }
                    #endregion
                }

                #endregion

                DataSet ds = new DataSet();
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("Level3Id-int", _level3Id.ToString());
                _nvCollection.Add("Level4Id-int", _level4Id.ToString());
                _nvCollection.Add("Level5Id-int", _level5Id.ToString());
                _nvCollection.Add("Level6Id-int", _level6Id.ToString());
                _nvCollection.Add("EmployeeId-int", _employeeId.ToString());
                _nvCollection.Add("StartingDate-date", Convert.ToDateTime(StartingDate).ToString());
                _nvCollection.Add("EndingDate-date", Convert.ToDateTime(EndingDate).ToString());
                ds = dll.GetData("smsresponseErrorSMS_new", _nvCollection);

                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    t5.Add(new GridError(ds.Tables[0].Rows[i]["MobileNumber"].ToString(), ds.Tables[0].Rows[i]["MessageText"].ToString(),
                        ds.Tables[0].Rows[i]["MessageType"].ToString(), ds.Tables[0].Rows[i]["Remarks"].ToString(), Convert.ToDateTime(ds.Tables[0].Rows[i]["InsertedDate"]).ToString("yyyy-MM-dd HH:mm:ss")));
                }
            }
            catch (Exception exception)
            {
                //  returnString = exception.Message;
            }

            return t5;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
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

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmployee(long employeeId)
        {
            string returnString = "";

            try
            {
                List<v_EmployeeDetail> getEmployee =
                    _dataContext.sp_EmployeesSelectByManagerNew(employeeId).Select(
                    p =>
                        new v_EmployeeDetail()
                        {
                            EmployeeId = p.EmployeeId,
                            EmployeeName = p.EmployeeName

                        }).ToList();

                if (getEmployee.Count > 0)
                {
                    returnString = _jss.Serialize(getEmployee);
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEditableDataRole(long employeeId)
        {
            string returnString = "";

            try
            {
                List<EmploeesInRole> getRoleId =
                    _dataContext.sp_EmploeesInRolesSelect(null, employeeId).ToList();

                if (getRoleId.Count != 0)
                {
                    List<SystemRole> getRole =
                        _dataContext.sp_SystemRolesSelect(Convert.ToInt32(getRoleId[0].RoleId)).Select(
                        p =>
                            new SystemRole()
                            {
                                LoweredRoleName = p.LoweredRoleName
                            }).ToList();

                    if (getRole.Count > 0)
                    {
                        returnString = _jss.Serialize(getRole);
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FilterDropDownList(string levelName)
        {
            string returnString = "";
            int _userId = 0;
            int expenseAdminID = Convert.ToInt32(ConfigurationManager.AppSettings["ExpenseAdmin"]);

            try
            {
                GetCurrentLevelId(0);
                if (levelName == "Level1")
                {
                    #region Level1

                    #region WebSite of Admin / HeadOffice

                    _currentRole = Session["CurrentUserRole"].ToString();
                    _userId = Convert.ToInt32(Session["CurrentUserId"]);

                    if (_currentRole == "admin" || _currentRole == "admincoordinator" || (_currentRole == "headoffice" && _userId == expenseAdminID) || _currentRole.ToLower() == "ftm")
                    {
                        _getHierarchyLevel1 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, 0, 0, 0, 0, 0, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel1);
                    }

                    if (_currentRole == "headoffice" && _userId != expenseAdminID)
                    {
                        nv.Clear();
                        nv.Add("@EmployeeID-int", _userId.ToString());
                        var data = dll.GetData("sp_EmployeesSelectByHead", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }

                    if (_currentRole == "rl1")
                    {
                        _getHierarchyLevel1 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, _level1Id, 0, 0, 0, 0, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel1);
                    }

                    if (_currentRole == "rl2")
                    {
                        _getHierarchyLevel2 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, _level1Id, _level2Id, 0, 0, 0, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel2);
                    }

                    if (_currentRole == "rl3")
                    {
                        _getHierarchyLevel3 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, _level1Id, _level2Id, _level3Id, 0, 0, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel3);
                    }


                    if (_currentRole == "rl4")
                    {
                        _getHierarchyLevel3 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, _level1Id, _level2Id, _level3Id, _level4Id, 0, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel3);
                    }

                    if (_currentRole == "rl5")
                    {
                        _getHierarchyLevel3 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, _level1Id, _level2Id, _level3Id, _level4Id, _level5Id, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel3);
                    }



                    #endregion



                    #endregion
                }
                if (levelName == "Level3")
                {
                    #region Level3

                    #region WebSite of Admin / HeadOffice

                    _currentRole = Session["CurrentUserRole"].ToString();


                    if (_currentRole == "admin" || _currentRole == "admincoordinator" || _currentRole == "headoffice")
                    {
                        _getHierarchyLevel3 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, 0, 0, 0, 0, 0, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel3);
                    }


                    if (_currentRole == "rl3")
                    {
                        _getHierarchyLevel3 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, 0, 0, _level3Id, 0, 0, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel3);
                    }


                    if (_currentRole == "rl4")
                    {
                        _getHierarchyLevel3 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, 0, 0, _level3Id, _level4Id, 0, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel3);
                    }

                    if (_currentRole == "rl5")
                    {
                        _getHierarchyLevel3 = _dataContext.sp_EmployeesSelectByLevel(levelName, _currentRole, 0, 0, _level3Id, _level4Id, _level5Id, 0).Select(
                            p => new v_EmployeeWithRole()
                            {
                                EmployeeId = p.EmployeeId,
                                EmployeeName = p.EmployeeName
                            }).ToList();
                        returnString = _jss.Serialize(_getHierarchyLevel3);
                    }



                    #endregion



                    #endregion
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [Serializable]
        public class GridError
        {
            public GridError(string MobileNumber, string MessageText, string MessageType, string Remarks, string CreatedDate)
            {
                mobilenumber = MobileNumber;
                messagetext = MessageText;
                messagetype = MessageType;
                remarks = Remarks;
                createddate = CreatedDate;

            }
            public string mobilenumber { get; set; }
            public string messagetext { get; set; }
            public string messagetype { get; set; }
            public string remarks { get; set; }
            public string createddate { get; set; }

        }





    }
}

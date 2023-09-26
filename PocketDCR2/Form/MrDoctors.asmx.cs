using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using DatabaseLayer.SQL;
using PocketDCR2.Classes;
using PocketDCR.CustomMembershipProvider;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for MrDoctors
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [ScriptService]
    public class MrDoctors : System.Web.Services.WebService
    {
        readonly DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        readonly JavaScriptSerializer _jss = new JavaScriptSerializer();
        List<HierarchyLevel6> _getHierarchyLevel6;
        List<v_MRDoctor> _MRDoctors;
        List<v_MrDrBrick> _MRBrick;
        List<ProductSku> _ProductSKU;

        private int _level1Id = 0, _level2Id = 0, _level3Id = 0, _level4Id = 0, _level5Id = 0, _level6Id = 0, _currentLevelId = 0;
        private SystemUser _currentUser;
        string _hierarchyName, _currentRole;
        private List<DatabaseLayer.SQL.AppConfiguration> _getHierarchy;
        private long _employeeId = 0;
        List<v_EmployeeWithRole> Emphr;
        List<v_MRDoctor> MRdoctor;
        public static string drcode = "";

        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<HierarchyLevel6> FillAllBricks()
        {
            // List returnString = "";
            try
            {

                _getHierarchyLevel6 = _dataContext.Get_ALLBrick().Select(
                    P => new HierarchyLevel6()
                    {
                        LevelId = P.LevelId,
                        LevelName = P.LevelName
                    }).ToList();

                //   return returnString = _getHierarchyLevel6.ToList();
                //_jss.Serialize(_getHierarchyLevel6);
            }
            catch (Exception exception)
            {
                //  returnString = exception.Message;
            }

            return _getHierarchyLevel6;

        }

        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<v_MrDrBrick> FillMRBricks(int employeeid)
        {
            drcode = "";
            // List returnString = "";
            try
            {

                _MRBrick = _dataContext.sp_MrDrBrickSelect(Convert.ToInt64(employeeid))
                   .Select(
                   P => new v_MrDrBrick()
                   {
                       LevelId = P.LevelId,
                       LevelName = P.LevelName

                   }).ToList();
            }
            catch (Exception exception)
            {
                //  returnString = exception.Message;
            }

            return _MRBrick;

        }

        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<v_MRDoctor> FillMrDR(int employeeid)
        {

            // List returnString = "";
            try
            {
                _MRDoctors = _dataContext.sp_DoctorsOfSpoSelectByEmployee(Convert.ToInt64(employeeid), null, null, null)
                    .Select(
                    P => new v_MRDoctor()
                    {
                        DoctorId = P.DoctorId,
                        DoctorName = P.DoctorName

                    }).ToList();
            }
            catch (Exception exception)
            {
                //  returnString = exception.Message;
            }

            return _MRDoctors;

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> FillProduct()
        {
            // List returnString = "";
            var PRoductList = new List<Tuple<int, string>>();
            try
            {
                var fsdf = _dataContext.sp_SamplesSelectByMR1().ToList();

                foreach (var item in fsdf)
                {
                    var tuple = Tuple.Create(item.SkuId, item.SkuName);
                    PRoductList.Add(tuple);
                }

            }
            catch (Exception exception)
            {
                //  returnString = exception.Message;
            }

            return PRoductList;

        }

        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<long, string>> Fillemp(string l1, string l2, string l3, string l4)
        {
            // List returnString = "";
            var EmployeeList = new List<Tuple<long, string>>();
            try
            {
                if (l1.Equals("null")) { l1 = "0"; }
                else { if (l1 == "-1") { l1 = "0"; } }

                if (l2.Equals("null")) { l2 = "0"; }
                else { if (l2 == "-1") { l2 = "0"; } }

                if (l3.Equals("null")) { l3 = "0"; }
                else { if (l3 == "-1") { l3 = "0"; } }

                if (l4.Equals("null")) { l4 = "0"; }
                else { if (l4 == "-1") { l4 = "0"; } }

                var fsdf = _dataContext.GetEmployeewithHierarchy(Convert.ToInt32(l1), Convert.ToInt32(l2), Convert.ToInt32(l3), Convert.ToInt32(l4)).ToList();

                foreach (var item in fsdf)
                {
                    var tuple = Tuple.Create(item.EmployeeId, item.FirstName);
                    EmployeeList.Add(tuple);
                }

            }
            catch (Exception exception)
            {
                //  returnString = exception.Message;
            }

            return EmployeeList;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> fillGH()
        {
            string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            _currentUser = (SystemUser)Session["SystemUser"];

            var list = new List<Tuple<int, string>>();

            GetCurrentLevelId(_currentUser.EmployeeId);

            if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
            {
                List<HierarchyLevel3> ada = _dataContext.sp_HierarchyLevels3Select(null, null).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl3")
            {
                List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3(_level3Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl4")
            {
                List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4(_level4Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl5")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5(_level5Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }

            return list;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> fillGH_L3(int level3Id)
        {

            string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            _currentUser = (SystemUser)Session["SystemUser"];
            GetCurrentLevelId(_currentUser.EmployeeId);
            var list = new List<Tuple<int, string>>();

            if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
            {
                List<HierarchyLevel4> ada = _dataContext.sp_Levels4SelectByLevel3(level3Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl3")
            {
                List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4(level3Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl4")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5(level3Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl5")
            {

            }
            return list;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> fillGH_L4(int level4Id)
        {
            string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            _currentUser = (SystemUser)Session["SystemUser"];
            GetCurrentLevelId(_currentUser.EmployeeId);
            var list = new List<Tuple<int, string>>();

            if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
            {
                List<HierarchyLevel5> ada = _dataContext.sp_Levels5SelectByLevel4(level4Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl3")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5(level4Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl4")
            {

            }
            else if (_currentUserRole == "rl5")
            {

            }



            return list;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<int, string>> fillGH_L5(int level5Id)
        {
            string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
            _currentUser = (SystemUser)Session["SystemUser"];
            GetCurrentLevelId(_currentUser.EmployeeId);
            var list = new List<Tuple<int, string>>();

            if (_currentUserRole == "admin" || _currentUserRole == "headoffice")
            {
                List<HierarchyLevel6> ada = _dataContext.sp_Levels6SelectByLevel5(level5Id).ToList();
                foreach (var item in ada)
                {
                    var tuple = Tuple.Create(item.LevelId, item.LevelName);
                    list.Add(tuple);
                }
            }
            else if (_currentUserRole == "rl3")
            {

            }
            else if (_currentUserRole == "rl4")
            {

            }
            else if (_currentUserRole == "rl5")
            {

            }

            return list;
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

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<v_EmployeeWithRole> getemployeeHR(int employeeid)
        {
            Emphr = _dataContext.EmployeeWith_Hierarchy(employeeid).ToList();

            return Emphr;

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetHierarchySelection(long systemUserId)
        {
            string returnString = "";

            try
            {
                var getEmployeeHierarchy =
                    _dataContext.sp_EmplyeeHierarchySelect(systemUserId).Select(
                    p =>
                       new EmplyeeHierarchy()
                       {
                           LevelId1 = p.LevelId1,
                           LevelId2 = p.LevelId2,
                           LevelId3 = p.LevelId3,
                           LevelId4 = p.LevelId4,
                           LevelId5 = p.LevelId5,
                           LevelId6 = p.LevelId6
                       }).ToList();

                if (getEmployeeHierarchy.Count > 0)
                {
                    returnString = _jss.Serialize(getEmployeeHierarchy);
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
        public List<Tuple<string, string, string, string, string, string, string>> listMRDoctors(string employeeid)
        {
            var list = new List<Tuple<string, string, string, string, string, string, string>>();
            MRdoctor = _dataContext.sp_DoctorsOfSpoSelectByEmployee(Convert.ToInt64(employeeid), null, null, null).ToList();

            foreach (var item in MRdoctor)
            {
                var tuple = Tuple.Create(item.DoctorCode, item.DoctorName, item.ClassName, item.ClassFrequency.ToString(), item.DoctorBrick, item.Address1, item.MobileNumber1);
                list.Add(tuple);
            }
            return list;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Tuple<string, string, string, string, string, string>> GetDrBrick(string level3name, string level4name, string Drbrickid, string empID)
        {
            var list = new List<Tuple<string, string, string, string, string, string>>();

            List<v_DrHierarchyLevel3Four> MRdoctor;
            MRdoctor = _dataContext.sp_MRDoctorLevel3FourSelect(level3name, level4name, Convert.ToInt32(Drbrickid)).ToList();

            foreach (var item in MRdoctor)
            {
                var isMRDr = _dataContext.sp_DoctorsOfSpoSelect(item.DoctorId, Convert.ToInt64(empID)).ToList();
                string drcode = "";
                string drcheck = "0";

                if (isMRDr.Count != 0)
                {
                    drcode = isMRDr[0].DoctorCode.ToString();
                    drcheck = "1";
                }

                var tuple = Tuple.Create(Convert.ToString(item.DoctorId), drcode, item.DoctorName, item.ClassName, item.Address1, drcheck);
                list.Add(tuple);


            }
            return list;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string saveMRDR(string Drcode, string Drid, string empID, string Checked, string drcodeold)
        {

            var chkSelect = Convert.ToBoolean(Checked);

            List<DatabaseLayer.SQL.DoctorsOfSpo> _getMRDr;
            List<DatabaseLayer.SQL.DoctorsOfSpo> _updateMRDr;
            List<DatabaseLayer.SQL.DoctorsOfSpo> _insertMRDr;

            _getMRDr = _dataContext.sp_DoctorsOfSpoSelect(Convert.ToInt64(Drid), Convert.ToInt64(empID)).ToList();
            var validateDoctor = _dataContext.sp_MRDoctorSelectByCode(Convert.ToInt64(empID), Drcode).ToList();


            if (chkSelect == true && Drcode != "")
            {
                if (Drcode != drcodeold)
                {
                    #region
                    if (_getMRDr.Count > 0)
                    {
                        if (validateDoctor.Count == 0)
                        {
                            _updateMRDr = _dataContext.sp_DoctorsOfSpoUpdate(Convert.ToInt64(Drid), Convert.ToInt64(empID), Drcode).ToList();
                        }
                        else
                        {
                            drcode = drcode + "," + Drcode;
                        }
                    }
                    else
                    {
                        if (validateDoctor.Count == 0)
                        {
                            _insertMRDr = _dataContext.sp_DoctorsOfSpoInsert(Convert.ToInt64(Drid), Convert.ToInt64(empID), Drcode).ToList();
                        }
                        else
                        {
                            drcode = drcode + "," + Drcode;
                        }
                    }
                    #endregion
                }
            }
            else if (!chkSelect && Drcode != "")
            {
                _getMRDr = _dataContext.sp_DoctorsOfSpoSelect(Convert.ToInt64(Drid), Convert.ToInt64(empID)).ToList();

                #region If Doctor Present Delete It

                if (_getMRDr.Count > 0)
                {
                    #region Delete Doctor

                    _dataContext.sp_DoctorsOfSpoDelete(Convert.ToInt64(Drid));

                    #endregion
                }

                #endregion

            }

            var msg = "";
            if (drcode.Trim() == "")
            {
                msg = "MR-Doctor List Updated Successfully!";
            }
            else
            {
                msg = "MR-Doctor List Updated Successfully!...Duplicate Doctors Code Not Saved..." + drcode.ToString();

            }
            return msg;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string savedrcode()
        {
            drcode = "";
            return "qqq";
        }

    }
}

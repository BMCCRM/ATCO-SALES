using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using DatabaseLayer.SQL;
using System.Data.Common;
using System.Data;
using PocketDCR2.Classes;
using System.Data.SqlClient;
using System.Collections.Specialized;
using System.Configuration;


namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for EmployeeManagement2CoService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [ScriptService]
    public class AdminCordinatorService : System.Web.Services.WebService
    {

        #region Public Member

        readonly DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        readonly JavaScriptSerializer _jss = new JavaScriptSerializer();
        List<SystemRole> _getRoleId;
        List<v_EmployeeWithRole> _getEmployeeWithLevel;
        List<EmploeesInRole> _insertEmployeeInRole;
        List<HierarchyLevel3> _getHierarchyLevel3;
        List<HierarchyLevel4> _getHierarchyLevel4;
        List<HierarchyLevel5> _getHierarchyLevel5;
        List<HierarchyLevel6> _getHierarchyLevel6;
        NameValueCollection nv = new NameValueCollection();
        DAL dl = new DAL();

        #endregion

        #region Public Function


        [WebMethod]
        public string FilldropdownCity()
        {
            string returnstring = string.Empty;
            try
            {
                nv.Clear();
                var data = dl.GetData("sp_getcitiesforddl", nv);
                returnstring = data.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FilterDropDownList(string levelName)
        {
            string returnString = "";

            try
            {
                if (levelName == "Level3")
                {
                    #region Level3

                    _getHierarchyLevel3 = _dataContext.sp_HierarchyLevels3Select(null, null).Select(
                        p =>
                            new HierarchyLevel3()
                            {
                                LevelId = p.LevelId,
                                LevelName = p.LevelName
                            }).ToList();
                    returnString = _jss.Serialize(_getHierarchyLevel3);

                    #endregion
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
        public string ShowCurrentLevel(int parentLevelId, string levelName)
        {
            string returnString = "";

            try
            {
                if (levelName == "Level3")
                {
                    #region Level3

                    if (parentLevelId == 0)
                    {
                        _getHierarchyLevel3 = _dataContext.sp_HierarchyLevel3Select(null, null).Select(
                            p =>
                                new HierarchyLevel3()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    IsActive = p.IsActive,
                                    LevelDescription = p.LevelDescription
                                }).ToList();

                        if (_getHierarchyLevel3.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel3);
                        }
                    }
                    else
                    {
                        _getHierarchyLevel4 = _dataContext.sp_Levels4SelectByLevel3(parentLevelId).Select(
                             p =>
                                new HierarchyLevel4()
                                {
                                    LevelId = p.LevelId,
                                    LevelName = p.LevelName,
                                    LevelCode = p.LevelCode,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        if (_getHierarchyLevel4.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel4);
                        }
                    }

                    #endregion
                }
                else if (levelName == "Level4")
                {
                    #region Level4

                    if (parentLevelId == 0)
                    {
                        _getHierarchyLevel4 = _dataContext.sp_HierarchyLevel4Select(null, null).Select(
                            p =>
                                new HierarchyLevel4()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        if (_getHierarchyLevel4.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel4);
                        }
                    }
                    else
                    {
                        _getHierarchyLevel5 = _dataContext.sp_Levels5SelectByLevel4(parentLevelId).Select(
                            p =>
                              new DatabaseLayer.SQL.HierarchyLevel5()
                              {
                                  LevelId = p.LevelId,
                                  LevelName = p.LevelName,
                                  LevelCode = p.LevelCode,
                                  LevelDescription = p.LevelDescription,
                                  IsActive = p.IsActive
                              }).ToList();

                        if (_getHierarchyLevel5.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel5);
                        }
                    }

                    #endregion
                }
                else if (levelName == "Level5")
                {
                    #region Level5

                    if (parentLevelId == 0)
                    {
                        _getHierarchyLevel5 = _dataContext.sp_HierarchyLevel5Select(null, null).Select(
                            p =>
                                new HierarchyLevel5()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        if (_getHierarchyLevel5.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel5);
                        }
                    }
                    else
                    {
                        _getHierarchyLevel6 = _dataContext.sp_Levels6SelectByLevel5(parentLevelId).Select(
                            p =>
                               new HierarchyLevel6()
                               {
                                   LevelId = p.LevelId,
                                   LevelName = p.LevelName,
                                   LevelCode = p.LevelCode,
                                   LevelDescription = p.LevelDescription,
                                   IsActive = p.IsActive
                               }).ToList();

                        if (_getHierarchyLevel6.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel6);
                        }
                    }

                    #endregion
                }
                else if (levelName == "Level6")
                {
                    #region Level6

                    if (parentLevelId == 0)
                    {
                        _getHierarchyLevel6 = _dataContext.sp_HierarchyLevel6Select(null, null).Select(
                            p =>
                                new HierarchyLevel6()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        if (_getHierarchyLevel6.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel6);
                        }
                    }

                    #endregion
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
        public string GetDefualtDesignation(int level)
        {
            string returnString = "";
            string levelName = "";

            try
            {
                List<DatabaseLayer.SQL.EmployeeDesignation> getDesignation;

                if (level > 0)
                {
                    levelName = "Level" + level;

                    getDesignation = _dataContext.sp_EmployeeDesignationsSelect(null, null, levelName).Select(
                        p =>
                            new DatabaseLayer.SQL.EmployeeDesignation()
                            {
                                DesignationId = p.DesignationId,
                                DesignationName = p.DesignationName
                            }).ToList();
                }
                else
                {
                    getDesignation = _dataContext.sp_EmployeeDesignationsSelect(null, null, null).Select(
                        p =>
                            new DatabaseLayer.SQL.EmployeeDesignation()
                            {
                                DesignationId = p.DesignationId,
                                DesignationName = p.DesignationName
                            }).ToList();
                }
                returnString = _jss.Serialize(getDesignation);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string FillDropDownList(string levelName, string userRole, int ddlId, int type)
        {
            #region Initialize

            string returnString = "";
            int level3Id = 0, level4Id = 0, level5Id = 0;

            #endregion

            try
            {
                if (levelName == "Level1")
                {

                }
                else if (levelName == "Level2")
                {

                }
                else if (levelName == "Level3")
                {
                    #region Map Employees Filter With Role

                    if (userRole == "admin" || userRole == "headoffice" || userRole == "admincoordinator")
                    {
                        #region Admin / Head Office

                        if (type == 2)
                        {
                            _getEmployeeWithLevel = _dataContext.sp_FilterEmployeeSelectByManager(levelName, userRole, 0, 0, ddlId, 0, 0, 0, type).Select(
                                p =>
                                    new v_EmployeeWithRole()
                                    {
                                        EmployeeId = p.EmployeeId,
                                        EmployeeName = p.EmployeeName
                                    }).ToList();
                            returnString = _jss.Serialize(_getEmployeeWithLevel);
                        }
                        else if (type == 3)
                        {
                            _getEmployeeWithLevel = _dataContext.sp_FilterEmployeeSelectByManager(levelName, userRole, 0, 0, 0, ddlId, 0, 0, type).Select(
                                p =>
                                    new v_EmployeeWithRole()
                                    {
                                        EmployeeId = p.EmployeeId,
                                        EmployeeName = p.EmployeeName
                                    }).ToList();
                            returnString = _jss.Serialize(_getEmployeeWithLevel);
                        }
                        else if (type == 4)
                        {
                            _getEmployeeWithLevel = _dataContext.sp_FilterEmployeeSelectByManager(levelName, userRole, 0, 0, 0, 0, ddlId, 0, type).Select(
                                p =>
                                    new v_EmployeeWithRole()
                                    {
                                        EmployeeId = p.EmployeeId,
                                        EmployeeName = p.EmployeeName
                                    }).ToList();
                            returnString = _jss.Serialize(_getEmployeeWithLevel);
                        }
                        else if (type == 5)
                        {
                            _getEmployeeWithLevel = _dataContext.sp_FilterEmployeeSelectByManager(levelName, userRole, 0, 0, 0, 0, 0, ddlId, type).Select(
                                p =>
                                    new v_EmployeeWithRole()
                                    {
                                        EmployeeId = p.EmployeeId,
                                        EmployeeName = p.EmployeeName
                                    }).ToList();
                            returnString = _jss.Serialize(_getEmployeeWithLevel);
                        }

                        #endregion
                    }
                    else if (userRole == "rl3")
                    {
                        #region RL3

                        if (type == 4)
                        {
                            _getEmployeeWithLevel = _dataContext.sp_FilterEmployeeSelectByManager(levelName, userRole, 0, 0, level3Id, level4Id, 0, 0, type).Select(
                                p =>
                                    new v_EmployeeWithRole()
                                    {
                                        EmployeeId = p.EmployeeId,
                                        EmployeeName = p.EmployeeName
                                    }).ToList();
                            returnString = _jss.Serialize(_getEmployeeWithLevel);
                        }
                        else if (type == 5)
                        {
                            _getEmployeeWithLevel = _dataContext.sp_FilterEmployeeSelectByManager(levelName, userRole, 0, 0, level3Id, level4Id, level5Id, 0, type).Select(
                                p =>
                                    new v_EmployeeWithRole()
                                    {
                                        EmployeeId = p.EmployeeId,
                                        EmployeeName = p.EmployeeName
                                    }).ToList();
                            returnString = _jss.Serialize(_getEmployeeWithLevel);
                        }

                        #endregion
                    }
                    else if (userRole == "rl4")
                    {
                        #region RL4

                        if (type == 5)
                        {
                            _getEmployeeWithLevel = _dataContext.sp_FilterEmployeeSelectByManager(levelName, userRole, 0, 0, level3Id, level4Id, level5Id, 0, type).Select(
                                p =>
                                    new v_EmployeeWithRole()
                                    {
                                        EmployeeId = p.EmployeeId,
                                        EmployeeName = p.EmployeeName
                                    }).ToList();
                            returnString = _jss.Serialize(_getEmployeeWithLevel);
                        }

                        #endregion
                    }

                    #endregion
                }
                else if (levelName == "Level4")
                {

                }
                else if (levelName == "Level5")
                {

                }
                else if (levelName == "Level6")
                {

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
        public string InsertEmployee(string firstName, string lastName, string middleName, string loginId, string appointmentDate, int gender,
            int designation, int employeeType, bool isActive, string country, string city, string RelatedCityIDs, string mobileNumber, string contactNumber1, string contactNumber2,
            string email, string currentAddress, string permenantAddress, string remarks, int level1, int level2, int level3, int level4, int level5, int level6,
            long managerId, string levelName, string type, int roleId, int? depot, bool isSample, string GDBID, string IsBikeAllowance, string IsCarAllowance, string IsIBA, string employeeCode)
        {
            var cityName = "";
            string returnString = "";
            DbTransaction insertTransaction = null;
            int? gdbidid = null;

            try
            {
                _dataContext.Connection.Open();
                insertTransaction = _dataContext.Connection.BeginTransaction();
                _dataContext.Transaction = insertTransaction;

                #region Initialize

                int rolesId = 0;
                long employeeId = 0, systemUserId = 0;

                #endregion

                #region Validate LoginId + Mobile Number + Email

                if (email == "-")
                {
                    email = mobileNumber + "@pocketdcr.com";
                }

                //if (level6 > 0)
                //{
                //    loginId = mobileNumber;
                //}

                var isValidateLoginId = _dataContext.sp_EmployeeSelectByCredential(loginId, null).ToList();
                var isValidateMobileNumber = _dataContext.sp_EmployeeSelectByCredential(null, mobileNumber).ToList();
                var isValidateEmail = _dataContext.sp_EmployeeMembershipSelectByEmail(email.ToLower()).ToList();
                var isValidateEmpCode = _dataContext.sp_EmployeesSelectByCode(employeeCode).ToList();
                #endregion

                if (depot == -1)
                {
                    depot = null;
                }

                if (isValidateLoginId.Count != 0)
                {
                    returnString = "Duplicate LoginId!";
                }
                else if (isValidateMobileNumber.Count != 0)
                {
                    returnString = "Duplicate Mobile Number!";
                }
                else if (isValidateEmail.Count != 0)
                {
                    returnString = "Duplicate Email Address!";
                }
                else if (isValidateEmpCode.Count != 0 && Convert.ToInt64(isValidateEmpCode[0].EmployeeId) != employeeId)
                {
                    returnString = "Duplicate Employee Code!";
                }
                else
                {
                    NameValueCollection _nv = new NameValueCollection();
                    DAL _dl = new DAL();
                    nv.Clear();
                    nv.Add("@CityID-int", city.ToString());
                    var data = dl.GetData("sp_getcities", nv);
                    if (data != null)
                    {
                        if (data.Tables[0].Rows.Count != 0)
                        {
                            cityName = data.Tables[0].Rows[0][1].ToString();
                        }
                    }

                    #region Get Role

                    switch (type)
                    {
                        case "Level1":
                            levelName = "Level1";
                            break;
                        case "Level2":
                            levelName = "Level2";
                            break;
                        case "Level3":
                            levelName = "Level3";
                            break;
                        case "Level4":
                            levelName = "Level4";
                            break;
                        case "Level5":
                            levelName = "Level5";
                            break;
                        case "Level6":
                            levelName = "Level6";
                            break;
                    }

                    if (type == "Level1" || type == "Level2" || type == "Level3" || type == "Level4" || type == "Level5" || type == "Level6")
                    {
                        _getRoleId = _dataContext.sp_SystemRolesSelectByName(levelName).ToList();

                        if (_getRoleId.Count != 0)
                        {
                            rolesId = Convert.ToInt32(_getRoleId[0].RoleId);
                        }
                    }

                    #endregion

                    #region Insert Employee BioData

                    //if (level4 <= 0)
                    //{
                    //    loginId = mobileNumber;
                    //}

                    #region Get Designation Id In Case of Admin / HeadOffice

                    if (roleId > 0)
                    {
                        var getLoweredRoleName = _dataContext.sp_SystemRolesSelect(roleId).ToList();

                        if (getLoweredRoleName.Count > 0)
                        {
                            var getDesignationId =
                                _dataContext.sp_EmployeeDesignationsSelectByType(null, null,
                                    Convert.ToString(getLoweredRoleName[0].LoweredRoleName)).ToList();

                            if (getDesignationId.Count > 0)
                            {
                                designation = Convert.ToInt32(getDesignationId[0].DesignationId);
                            }
                            else
                            {
                                designation = -1;
                            }
                        }
                        else
                        {
                            designation = -1;
                        }
                    }

                    #endregion


                    firstName = firstName.Trim();
                    middleName = middleName.Trim();
                    lastName = lastName.Trim();

                    var insertEmployee = _dataContext.sp_EmployeesInsert(designation, firstName, lastName, middleName, loginId, mobileNumber,
                        Convert.ToDateTime(appointmentDate), DateTime.Now, DateTime.Now, gender, isActive, managerId, isSample, depot, employeeCode).ToList();

                    if (insertEmployee.Count != 0)
                    {
                        employeeId = Convert.ToInt64(insertEmployee[0].EmployeeId);
                        #region Employee Type

                        if (employeeType != 0)
                        {
                            var insertEmployeeInType =
                                _dataContext.sp_EmployeesInTypeInsert(employeeType, employeeId).ToList();
                        }

                        #endregion
                    }

                    #endregion

                    #region Employee Address

                    var insertAddress = _dataContext.sp_EmployeesAddressesInsert(employeeId, permenantAddress, currentAddress, cityName, country, contactNumber1,
                        contactNumber2).ToList();

                    #endregion




                    #region Employee Role

                    if (type == "Level1" || type == "Level2" || type == "Level3" || type == "Level4" || type == "Level5" || type == "Level6")
                    {
                        _insertEmployeeInRole = _dataContext.sp_EmploeesInRolesInsert(rolesId, employeeId).ToList();
                    }
                    else
                    {
                        _insertEmployeeInRole = _dataContext.sp_EmploeesInRolesInsert(roleId, employeeId).ToList();
                    }

                    #endregion

                    #region Employee GDBID

                    if (GDBID == "null")
                    {
                        gdbidid = null;
                    }
                    else
                    {
                        gdbidid = Convert.ToInt32(GDBID);
                    }
                    var insertGDBID = _dataContext.sp_EmployeesGBIDInsert(employeeId, gdbidid);

                    #endregion

                    #region Employee Depot
                    if (depot != null)
                    {
                        var insertDepot = _dataContext.sp_EmployeeDepot_Insert(employeeId, depot, isSample);
                    }
                    #endregion

                    #region Employee Membership

                    var insertEmployeeMembership = _dataContext.sp_EmployeeMembershipInsert(employeeId, "RD5w77QW5brpOX9NifSWIjX0nsY=", 1, "NA", "NA", email, email.ToLower(), "NA", "NA", true, false,
                        DateTime.Now, DateTime.Now, DateTime.Now, DateTime.Now, 0, DateTime.Now, 0, DateTime.Now, remarks).ToList();

                    if (insertEmployeeMembership.Count != 0)
                    {
                        systemUserId = Convert.ToInt64(insertEmployeeMembership[0].SystemUserID);
                    }

                    #endregion

                    #region Employee Hierarchy

                    if (type == "Level1" || type == "Level2" || type == "Level3" || type == "Level4" || type == "Level5" || type == "Level6")
                    {
                        var insertEmployeeHierarchy =
                            _dataContext.sp_EmplyeeHierarchyInsert(DateTime.Now, DateTime.Now, level6, level5, level4, level3, level2, level1, systemUserId).ToList();
                    }

                    #endregion

                    returnString = "OK";
                }

                insertTransaction.Commit();


                if (insertTransaction.Connection == null && employeeId != 0)
                {

                    #region Expense City Relation
                    NameValueCollection _nv = new NameValueCollection();
                    DAL _dl = new DAL();

                    _nv.Clear();
                    _nv.Add("@EmployeeId-int", employeeId.ToString().Trim());
                    _nv.Add("@LoginId-varchar(50)", loginId.ToString().Trim());
                    _nv.Add("@CityId-varchar(10)", city);
                    _nv.Add("@CityName-varchar(50)", "");
                    var data = dl.GetData("sp_InsertEmployeeCity", _nv);

                    _nv.Clear();
                    _nv.Add("@EmployeeId-int", employeeId.ToString().Trim());
                    _nv.Add("@LoginId-varchar(50)", loginId.ToString().Trim());
                    _nv.Add("@CityId-varchar(10)", "0");
                    _nv.Add("@System-varchar(50)", "0");
                    data = dl.GetData("sp_InsertEmployeeRelatedCity", _nv);

                    var arrayRelatedCityIDs = RelatedCityIDs.Split(',');
                    for (int i = 0; i < arrayRelatedCityIDs.Length; i++)
                    {
                        if (arrayRelatedCityIDs[i] != "" && arrayRelatedCityIDs[i] != "null")
                        {
                            if (arrayRelatedCityIDs[i] != null)
                            {
                                _nv.Clear();
                                _nv.Add("@EmployeeId-int", employeeId.ToString().Trim());
                                _nv.Add("@LoginId-varchar(50)", loginId.ToString().Trim());
                                _nv.Add("@CityId-varchar(10)", arrayRelatedCityIDs[i]);
                                _nv.Add("@System-varchar(50)", "0");
                                data = dl.GetData("sp_InsertEmployeeRelatedCity", _nv);
                            }
                        }
                    }

                    #endregion

                    #region Expense Travel Expense Type

                    _nv = new NameValueCollection();
                    _dl = new DAL();

                    _nv.Clear();
                    _nv.Add("@EmployeeId-int", employeeId.ToString().Trim());
                    // _nv.Add("@EmployeeCode-varchar(50)", EmpCode.ToString().Trim());
                    _nv.Add("@IsBikeAllowance-bit", Convert.ToBoolean(IsBikeAllowance) ? "1" : "0");
                    _nv.Add("@IsCarAllowance-bit", Convert.ToBoolean(IsCarAllowance) ? "1" : "0");
                    _nv.Add("@IsIBA-bit", Convert.ToBoolean(IsIBA) ? "1" : "0");
                    data = dl.GetData("sp_InsertEmployeeTravelExpenseType", _nv);

                    #endregion

                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
                if (insertTransaction != null) insertTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }

            return returnString;
        }


        #region Old EMployee insert
        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string InsertEmployee(string firstName, string lastName, string middleName, string loginId, string appointmentDate, int gender,
        //    int designation, int employeeType, bool isActive, string country, string city, string RelatedCityIDs, string mobileNumber, string contactNumber1, string contactNumber2,
        //    string email, string currentAddress, string permenantAddress, string remarks, int level1, int level2, int level3, int level4, int level5, int level6,
        //    long managerId, string levelName, string type, int roleId, int? depot, bool isSample, string GDBID, string IsBikeAllowance, string IsCarAllowance, string IsIBA, string employeeCode)
        //{
        //    var cityName = "";
        //    string returnString = "";
        //    DbTransaction insertTransaction = null;
        //    int? gdbidid = null;

        //    try
        //    {
        //        _dataContext.Connection.Open();
        //        insertTransaction = _dataContext.Connection.BeginTransaction();
        //        _dataContext.Transaction = insertTransaction;

        //        #region Initialize

        //        int rolesId = 0;
        //        long employeeId = 0, systemUserId = 0;

        //        #endregion

        //        #region Validate LoginId + Mobile Number + Email

        //        if (email == "-")
        //        {
        //            email = mobileNumber + "@pocketdcr.com";
        //        }

        //        //if (level6 > 0)
        //        //{
        //        //    loginId = mobileNumber;
        //        //}

        //        var isValidateLoginId = _dataContext.sp_EmployeeSelectByCredential(loginId, null).ToList();
        //        var isValidateMobileNumber = _dataContext.sp_EmployeeSelectByCredential(null, mobileNumber).ToList();
        //        var isValidateEmail = _dataContext.sp_EmployeeMembershipSelectByEmail(email.ToLower()).ToList();
        //        var isValidateEmpCode = _dataContext.sp_EmployeesSelectByCode(employeeCode).ToList();

        //        #endregion

        //        if (depot == -1)
        //        {
        //            depot = null;
        //        }

        //        if (isValidateLoginId.Count != 0)
        //        {
        //            returnString = "Duplicate LoginId!";
        //        }
        //        else if (isValidateMobileNumber.Count != 0)
        //        {
        //            returnString = "Duplicate Mobile Number!";
        //        }
        //        else if (isValidateEmail.Count != 0)
        //        {
        //            returnString = "Duplicate Email Address!";
        //        }

        //        else if (isValidateEmpCode.Count != 0)
        //        {
        //            returnString = "Duplicate Employee Code!";
        //        }
        //        else
        //        {
        //            NameValueCollection _nv = new NameValueCollection();
        //            DAL _dl = new DAL();
        //            nv.Clear();
        //            nv.Add("@CityID-int", city.ToString());
        //            var data = dl.GetData("sp_getcities", nv);
        //            if (data != null)
        //            {
        //                if (data.Tables[0].Rows.Count != 0)
        //                {
        //                    cityName = data.Tables[0].Rows[0][1].ToString();
        //                }
        //            }

        //            #region Get Role

        //            switch (type)
        //            {
        //                case "Level1":
        //                    levelName = "Level1";
        //                    break;
        //                case "Level2":
        //                    levelName = "Level2";
        //                    break;
        //                case "Level3":
        //                    levelName = "Level3";
        //                    break;
        //                case "Level4":
        //                    levelName = "Level4";
        //                    break;
        //                case "Level5":
        //                    levelName = "Level5";
        //                    break;
        //                case "Level6":
        //                    levelName = "Level6";
        //                    break;
        //            }

        //            if (type == "Level1" || type == "Level2" || type == "Level3" || type == "Level4" || type == "Level5" || type == "Level6")
        //            {
        //                _getRoleId = _dataContext.sp_SystemRolesSelectByName(levelName).ToList();

        //                if (_getRoleId.Count != 0)
        //                {
        //                    rolesId = Convert.ToInt32(_getRoleId[0].RoleId);
        //                }
        //            }

        //            #endregion

        //            #region Insert Employee BioData

        //            if (level4 <= 0)
        //            {
        //                loginId = mobileNumber;
        //            }

        //            #region Get Designation Id In Case of Admin / HeadOffice

        //            if (roleId > 0)
        //            {
        //                var getLoweredRoleName = _dataContext.sp_SystemRolesSelect(roleId).ToList();

        //                if (getLoweredRoleName.Count > 0)
        //                {
        //                    var getDesignationId =
        //                        _dataContext.sp_EmployeeDesignationsSelectByType(null, null,
        //                            Convert.ToString(getLoweredRoleName[0].LoweredRoleName)).ToList();

        //                    if (getDesignationId.Count > 0)
        //                    {
        //                        designation = Convert.ToInt32(getDesignationId[0].DesignationId);
        //                    }
        //                    else
        //                    {
        //                        designation = -1;
        //                    }
        //                }
        //                else
        //                {
        //                    designation = -1;
        //                }
        //            }

        //            #endregion

        //            var insertEmployee = _dataContext.sp_EmployeesInsert(designation, firstName, lastName, middleName, loginId, mobileNumber,
        //                Convert.ToDateTime(appointmentDate), DateTime.Now, DateTime.Now, gender, isActive, managerId, isSample, depot, employeeCode).ToList();

        //            if (insertEmployee.Count != 0)
        //            {
        //                employeeId = Convert.ToInt64(insertEmployee[0].EmployeeId);
        //                #region Employee Type

        //                if (employeeType != 0)
        //                {
        //                    var insertEmployeeInType =
        //                        _dataContext.sp_EmployeesInTypeInsert(employeeType, employeeId).ToList();
        //                }

        //                #endregion
        //            }

        //            #endregion

        //            #region Employee Address

        //            var insertAddress = _dataContext.sp_EmployeesAddressesInsert(employeeId, permenantAddress, currentAddress, cityName, country, contactNumber1,
        //                contactNumber2).ToList();

        //            #endregion




        //            #region Employee Role

        //            if (type == "Level1" || type == "Level2" || type == "Level3" || type == "Level4" || type == "Level5" || type == "Level6")
        //            {
        //                _insertEmployeeInRole = _dataContext.sp_EmploeesInRolesInsert(rolesId, employeeId).ToList();
        //            }
        //            else
        //            {
        //                _insertEmployeeInRole = _dataContext.sp_EmploeesInRolesInsert(roleId, employeeId).ToList();
        //            }

        //            #endregion

        //            #region Employee GDBID

        //            if (GDBID == "null")
        //            {
        //                gdbidid = null;
        //            }
        //            else
        //            {
        //                gdbidid = Convert.ToInt32(GDBID);
        //            }
        //            var insertGDBID = _dataContext.sp_EmployeesGBIDInsert(employeeId, gdbidid);

        //            #endregion

        //            #region Employee Depot
        //            if (depot != null)
        //            {
        //                var insertDepot = _dataContext.sp_EmployeeDepot_Insert(employeeId, depot, isSample);
        //            }
        //            #endregion

        //            #region Employee Membership

        //            var insertEmployeeMembership = _dataContext.sp_EmployeeMembershipInsert(employeeId, "NA", 1, "NA", "NA", email, email.ToLower(), "NA", "NA", true, false,
        //                DateTime.Now, DateTime.Now, DateTime.Now, DateTime.Now, 0, DateTime.Now, 0, DateTime.Now, remarks).ToList();

        //            if (insertEmployeeMembership.Count != 0)
        //            {
        //                systemUserId = Convert.ToInt64(insertEmployeeMembership[0].SystemUserID);
        //            }

        //            #endregion

        //            #region Employee Hierarchy

        //            if (type == "Level1" || type == "Level2" || type == "Level3" || type == "Level4" || type == "Level5" || type == "Level6")
        //            {
        //                var insertEmployeeHierarchy =
        //                    _dataContext.sp_EmplyeeHierarchyInsert(DateTime.Now, DateTime.Now, level6, level5, level4, level3, level2, level1, systemUserId).ToList();
        //            }

        //            #endregion

        //            #region Check For Date To Mark Employee As Resigned If Provided


        //            var employeeresign = _dataContext.sp_EmployeeResignedInsertUpdate(employeeId, Convert.ToDateTime(appointmentDate), isActive).ToList();

        //            #endregion

        //            returnString = "OK";
        //        }

        //        insertTransaction.Commit();


        //        if (insertTransaction.Connection == null && employeeId != 0)
        //        {

        //            #region Expense City Relation
        //            NameValueCollection _nv = new NameValueCollection();
        //            DAL _dl = new DAL();

        //            _nv.Clear();
        //            _nv.Add("@EmployeeId-int", employeeId.ToString().Trim());
        //            _nv.Add("@LoginId-varchar(50)", loginId.ToString().Trim());
        //            _nv.Add("@CityId-varchar(10)", city);
        //            _nv.Add("@CityName-varchar(50)", "");
        //            var data = dl.GetData("sp_InsertEmployeeCity", _nv);

        //            _nv.Clear();
        //            _nv.Add("@EmployeeId-int", employeeId.ToString().Trim());
        //            _nv.Add("@LoginId-varchar(50)", loginId.ToString().Trim());
        //            _nv.Add("@CityId-varchar(10)", "0");
        //            _nv.Add("@System-varchar(50)", "0");
        //            data = dl.GetData("sp_InsertEmployeeRelatedCity", _nv);

        //            var arrayRelatedCityIDs = RelatedCityIDs.Split(',');
        //            for (int i = 0; i < arrayRelatedCityIDs.Length; i++)
        //            {
        //                if (arrayRelatedCityIDs[i] != "" && arrayRelatedCityIDs[i] != "null")
        //                {
        //                    if (arrayRelatedCityIDs[i] != null)
        //                    {
        //                        _nv.Clear();
        //                        _nv.Add("@EmployeeId-int", employeeId.ToString().Trim());
        //                        _nv.Add("@LoginId-varchar(50)", loginId.ToString().Trim());
        //                        _nv.Add("@CityId-varchar(10)", arrayRelatedCityIDs[i]);
        //                        _nv.Add("@System-varchar(50)", "0");
        //                        data = dl.GetData("sp_InsertEmployeeRelatedCity", _nv);
        //                    }
        //                }
        //            }

        //            #endregion

        //            #region Expense Travel Expense Type

        //            _nv = new NameValueCollection();
        //            _dl = new DAL();

        //            _nv.Clear();
        //            _nv.Add("@EmployeeId-int", employeeId.ToString().Trim());
        //            // _nv.Add("@EmployeeCode-varchar(50)", EmpCode.ToString().Trim());
        //            _nv.Add("@IsBikeAllowance-bit", Convert.ToBoolean(IsBikeAllowance) ? "1" : "0");
        //            _nv.Add("@IsCarAllowance-bit", Convert.ToBoolean(IsCarAllowance) ? "1" : "0");
        //            _nv.Add("@IsIBA-bit", Convert.ToBoolean(IsIBA) ? "1" : "0");
        //            data = dl.GetData("sp_InsertEmployeeTravelExpenseType", _nv);

        //            #endregion

        //        }

        //    }
        //    catch (Exception exception)
        //    {
        //        returnString = exception.Message;
        //        if (insertTransaction != null) insertTransaction.Rollback();
        //    }
        //    finally
        //    {
        //        if (_dataContext.Connection.State == ConnectionState.Open)
        //        {
        //            _dataContext.Connection.Close();
        //        }
        //    }

        //    return returnString;
        //}

        #endregion

       


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmployeeOtherDetail(long employeeId)
        {
            string returnString = "";

            try
            {

                nv.Clear();
                nv.Add("@Emp_ID-bigint", employeeId.ToString());
                DataSet ds = dl.GetData("Sp_GetEmployeeOtherDetail", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
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
        public string GetEmployee(long employeeId)
        {
            string returnString = "";

            try
            {
                //Comment because Resignation Field

                //List<Employee> getEmployee =
                //    _dataContext.sp_EmployeesSelect(employeeId).Select(
                //    p =>
                //        new Employee()
                //        {
                //            DesignationId = p.DesignationId,
                //            FirstName = p.FirstName,
                //            LastName = p.LastName,
                //            MiddleName = p.MiddleName,
                //            LoginId = p.LoginId,
                //            MobileNumber = p.MobileNumber,
                //            AppointmentDate = p.AppointmentDate,
                //            CreationDate = p.CreationDate,
                //            LastUpdateDate = p.LastUpdateDate,
                //            Gender = p.Gender,
                //            IsActive = p.IsActive
                //        }).ToList();

                //if (getEmployee.Count > 0)
                //{
                //    returnString = _jss.Serialize(getEmployee);
                //}

                nv.Clear();
                nv.Add("@EmployeeId-bigint", employeeId.ToString());

                DataSet ds = dl.GetData("sp_EmployeesSelect", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
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
        public string GetEmployeeDGID(long employeeId)
        {
            string returnString = "";

            try
            {
                var getGDBIDId =
                    _dataContext.sp_EmployeeGDBID(employeeId).Select(
                    p =>
                        new EmployeeGDBID()
                        {
                            GDDBID = p.GDDBID,
                            EmployeeID = p.EmployeeID
                        }).ToList();

                if (getGDBIDId.Count > 0)
                {
                    returnString = _jss.Serialize(getGDBIDId);
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
        public string GetEmployeeissample(long employeeId)
        {
            string returnString = "";

            try
            {
                var getGDBIDId =
                    _dataContext.sp_EmployeesSelect_isSample(employeeId).Select(
                    p =>
                        new v_Employee_IsSample()
                        {
                            IsSample = p.IsSample,
                            EmployeeId = p.EmployeeId
                        }).ToList();

                if (getGDBIDId.Count > 0)
                {
                    returnString = _jss.Serialize(getGDBIDId);
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
        public string GetEmployeeDepot(long employeeId)
        {
            string returnString = "";

            try
            {
                var getDepotId =
                    _dataContext.sp_EmployeeDepot_select(employeeId).Select(
                    p =>
                        new EmployeeDepot()
                        {
                            DepotID = p.DepotID,
                            EmployeeID = p.EmployeeID,
                            Sampleoff = p.Sampleoff
                        }).ToList();

                if (getDepotId.Count > 0)
                {
                    returnString = _jss.Serialize(getDepotId);
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
        public string GetEmployeeType(long employeeId)
        {
            string returnString = "";

            try
            {
                var getTypeId =
                    _dataContext.sp_EmployeesInTypeSelect(null, employeeId).Select(
                    p =>
                        new EmployeesInType()
                        {
                            TypeId = p.TypeId,
                            EmployeeId = p.EmployeeId
                        }).ToList();

                if (getTypeId.Count > 0)
                {
                    returnString = _jss.Serialize(getTypeId);
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
        public string GetEmployeeViaManager1(int type, int national, int regional, int zonal, int territorial, long employeeId)
        {
            string returnString = "";

            try
            {
                if (type == 3)
                {
                    var getEmployeeSelectByType3 =
                    _dataContext.sp_EmployeeSelectByManager3(national, regional, employeeId).Select(
                    p =>
                        new v_EmployeeType4()
                        {
                            EmployeeId = p.EmployeeId,
                            EmployeeName = p.EmployeeName
                        }).ToList();

                    if (getEmployeeSelectByType3.Count > 0)
                    {
                        returnString = _jss.Serialize(getEmployeeSelectByType3);
                    }
                }
                else if (type == 4)
                {
                    var getEmployeeSelectByType4 =
                    _dataContext.sp_EmployeeSelectByManager4(national, regional, zonal, employeeId).Select(
                    p =>
                        new v_EmployeeType5()
                        {
                            EmployeeId = p.EmployeeId,
                            EmployeeName = p.EmployeeName
                        }).ToList();

                    if (getEmployeeSelectByType4.Count > 0)
                    {
                        returnString = _jss.Serialize(getEmployeeSelectByType4);
                    }
                }
                else if (type == 5)
                {
                    var getEmployeeSelectByType5 =
                    _dataContext.sp_EmployeeSelectByManager5(national, regional, zonal, territorial, employeeId).Select(
                    p =>
                        new v_EmployeeType6()
                        {
                            EmployeeId = p.EmployeeId,
                            EmployeeName = p.EmployeeName
                        }).ToList();

                    if (getEmployeeSelectByType5.Count > 0)
                    {
                        returnString = _jss.Serialize(getEmployeeSelectByType5);
                    }
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
        public string GetEmployeeViaManager(long employeeId)
        {
            string returnString = "";

            try
            {
                var getEmployee =
                    _dataContext.sp_EmployeesSelectByManager(employeeId).Select(
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
        public string GetDesignation(int designationId)
        {
            string returnString = "";

            try
            {
                var getEmployeeDesignation =
                    _dataContext.sp_EmployeeDesignationsSelect(designationId, null, null).Select(
                    p =>
                        new DatabaseLayer.SQL.EmployeeDesignation()
                        {
                            DesignationId = p.DesignationId,
                            DesignationName = p.DesignationName
                        }).ToList();

                if (getEmployeeDesignation.Count > 0)
                {
                    returnString = _jss.Serialize(getEmployeeDesignation);
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

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmployeeAddress(long employeeId)
        {
            string returnString = "";

            try
            {
                List<EmployeesAddress> getEmployeeAddress =
                    _dataContext.sp_EmployeesAddressesSelectByEmployee(employeeId).Select(
                    p =>
                       new EmployeesAddress()
                       {
                           Address = p.Address,
                           Address1 = p.Address1,
                           City = p.City,
                           Country = p.Country,
                           ContactNumber1 = p.ContactNumber1,
                           ContactNumber2 = p.ContactNumber2
                       }).ToList();

                if (getEmployeeAddress.Count > 0)
                {
                    returnString = _jss.Serialize(getEmployeeAddress);
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
        public string GetEmployeeMembership(long employeeId)
        {
            string returnString = "";

            try
            {
                List<EmployeeMembership> getEmployeeMembership =
                    _dataContext.sp_EmployeeMembershipSelectByEmployee(employeeId).Select(
                    p =>
                       new EmployeeMembership()
                       {
                           SystemUserID = p.SystemUserID,
                           Email = p.Email,
                           Comment = p.Comment
                       }).ToList();

                if (getEmployeeMembership.Count > 0)
                {
                    returnString = _jss.Serialize(getEmployeeMembership);
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
        public string GetManager(long employeeId)
        {
            string returnString = "";

            try
            {
                var getManagerId = _dataContext.sp_EmployeesSelect(employeeId).ToList();

                if (getManagerId.Count != 0)
                {
                    employeeId = Convert.ToInt64(getManagerId[0].ManagerId);
                    var getManagerDetail = _dataContext.sp_EmployeesSelect(employeeId).Select(
                        p => new Employee()
                        {
                            EmployeeId = p.EmployeeId,
                            FirstName = p.FirstName,
                            MiddleName = p.MiddleName,
                            LastName = p.LastName,
                            ManagerId = p.ManagerId
                        }).ToList();

                    if (getManagerDetail.Count > 0)
                    {
                        returnString = _jss.Serialize(getManagerDetail);
                    }
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
        public string GetManagerAllLevels(long employeeId)
        {
            string returnString = "";
            List<Employee> ManagerDetails = new List<Employee>();

            try
            {
                var EmployeeDetailsByEmployeeID = _dataContext.sp_EmployeesSelect(employeeId).ToList();

                if (EmployeeDetailsByEmployeeID.Count != 0)
                {
                    var ManagerId1 = Convert.ToInt64(EmployeeDetailsByEmployeeID[0].ManagerId);
                    var getManager1Detail = _dataContext.sp_EmployeesSelect(ManagerId1).Select(
                        p => new Employee()
                        {
                            EmployeeId = p.EmployeeId,
                            FirstName = p.FirstName,
                            MiddleName = p.MiddleName,
                            LastName = p.LastName,
                            ManagerId = p.ManagerId
                        }).ToList();
                    if (getManager1Detail.Count > 0)
                    {
                        ManagerDetails.AddRange(getManager1Detail);
                        var ManagerId2 = Convert.ToInt64(getManager1Detail[0].ManagerId);
                        var getManager2Detail = _dataContext.sp_EmployeesSelect(ManagerId2).Select(
                        p => new Employee()
                        {
                            EmployeeId = p.EmployeeId,
                            FirstName = p.FirstName,
                            MiddleName = p.MiddleName,
                            LastName = p.LastName,
                            ManagerId = p.ManagerId
                        }).ToList();
                        if (getManager2Detail.Count > 0)
                        {
                            ManagerDetails.AddRange(getManager2Detail);
                            var ManagerId3 = Convert.ToInt64(getManager2Detail[0].ManagerId);
                            var getManager3Detail = _dataContext.sp_EmployeesSelect(ManagerId3).Select(
                            p => new Employee()
                            {
                                EmployeeId = p.EmployeeId,
                                FirstName = p.FirstName,
                                MiddleName = p.MiddleName,
                                LastName = p.LastName,
                                ManagerId = p.ManagerId
                            }).ToList();
                            if (getManager3Detail.Count > 0)
                            {
                                ManagerDetails.AddRange(getManager3Detail);
                                var ManagerId4 = Convert.ToInt64(getManager3Detail[0].ManagerId);
                                var getManager4Detail = _dataContext.sp_EmployeesSelect(ManagerId4).Select(
                                p => new Employee()
                                {
                                    EmployeeId = p.EmployeeId,
                                    FirstName = p.FirstName,
                                    MiddleName = p.MiddleName,
                                    LastName = p.LastName,
                                    ManagerId = p.ManagerId
                                }).ToList();
                                if (getManager4Detail.Count > 0)
                                {
                                    ManagerDetails.AddRange(getManager4Detail);
                                    var ManagerId5 = Convert.ToInt64(getManager4Detail[0].ManagerId);
                                    var getManager5Detail = _dataContext.sp_EmployeesSelect(ManagerId5).Select(
                                    p => new Employee()
                                    {
                                        EmployeeId = p.EmployeeId,
                                        FirstName = p.FirstName,
                                        MiddleName = p.MiddleName,
                                        LastName = p.LastName,
                                        ManagerId = p.ManagerId
                                    }).ToList();
                                    if (getManager5Detail.Count > 0)
                                    {
                                        ManagerDetails.AddRange(getManager5Detail);
                                    }
                                }
                            }
                        }
                    }

                    if (ManagerDetails.Count > 0)
                    {
                        returnString = _jss.Serialize(ManagerDetails);
                    }
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
        public string GetHierarchy(long employeeId)
        {
            string returnString = "";

            try
            {
                //#region Get Employee Manager Id

                //NameValueCollection nv = new NameValueCollection();
                //nv.Clear();
                //_dataSet.Clear();
                //nv.Add("@EmployeeId-bigint", Convert.ToString(employeeId));
                //_dataSet = GetData("sp_EmployeesSelect", nv);

                //if (_dataSet != null)
                //{
                //    if (_dataSet.Tables[0].Rows.Count != 0)
                //    {
                //        var isNull = _dataSet.Tables[0].Rows[0]["ManagerId"].ToString();

                //        if (isNull == "")
                //        {
                //            isNull = "0";
                //        }

                //        employeeId = Convert.ToInt64(isNull);
                //    }
                //}

                //#endregion

                //#region Get Manager Name

                //if (employeeId != 0)
                //{
                //    var getManager = _dataContext.sp_EmployeesSelect(employeeId).ToList();

                //    if (getManager.Count != 0)
                //    {
                //        var managerName = getManager[0].FirstName + " " + getManager[0].MiddleName + " "
                //            + getManager[0].LastName;
                //        returnString = managerName;
                //    }
                //}
                //else
                //{
                //    returnString = "0";
                //}

                //#endregion
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmploeesInRole(int employeeId)
        {
            string returnString = "";

            try
            {
                List<EmploeesInRole> getEmploeesInRole =
                    _dataContext.sp_EmploeesInRolesSelect(null, employeeId).Select(
                    p =>
                       new EmploeesInRole()
                       {
                           RoleId = p.RoleId
                       }).ToList();

                if (getEmploeesInRole.Count > 0)
                {
                    returnString = _jss.Serialize(getEmploeesInRole);
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

        [WebMethod]
        public static bool IsDate(string value)
        {
            DateTime dateTime;
            return DateTime.TryParse(value.ToString(), out dateTime);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateEmployee(long employeeId, string firstName, string lastName, string middleName, string loginId, string appointmentDate, string resignationDate, int gender,
            int designation, int employeeType, bool isActive, string country, string city, string RelatedCityIDs, string mobileNumber, string contactNumber1, string contactNumber2,
            string email, string currentAddress, string permenantAddress, string remarks, int level1, int level2, int level3, int level4, int level5, int level6,
            long managerId, string levelName, int selectHierarchy, string type, int roleId, int? depot, bool isSample, string GDBID, string predays, string IsBikeAllowance, string IsCarAllowance, string IsIBA, string employeeCode)
        {
            var cityName = "";
            string returnString = "";
            insert(employeeId.ToString(), predays);
            DbTransaction updateTransaction = null; string gdbidid = null;
            var emaildomain = ConfigurationManager.AppSettings["emaildomain"].ToString();

            try
            {
                _dataContext.Connection.Open();
                updateTransaction = _dataContext.Connection.BeginTransaction();
                _dataContext.Transaction = updateTransaction;

                //if (depot == -1)
                //{
                //    depot = null;
                //}
                 
                

                #region Validate LoginId + Mobile Number + Email

                if (email == "-")
                {
                    email = employeeCode + emaildomain;
                }

                //if (level6 > 0)
                //{
                 loginId = employeeCode;
                //}

                var isValidateLoginId = _dataContext.sp_EmployeeSelectByCredential(loginId, null).ToList();
                var isValidateMobileNumber = _dataContext.sp_EmployeeSelectByCredential(null, mobileNumber).ToList();
                var isValidateEmail = _dataContext.sp_EmployeeMembershipSelectByEmail(email.ToLower()).ToList();
                var isValidateEmpCode = _dataContext.sp_EmployeesSelectByCode(employeeCode).ToList();
                #endregion

                if (isValidateLoginId.Count != 0 && Convert.ToInt64(isValidateLoginId[0].EmployeeId) != employeeId)
                {
                    returnString = "Duplicate LoginId!";
                }
                else if (isValidateMobileNumber.Count != 0 && Convert.ToInt64(isValidateMobileNumber[0].EmployeeId) != employeeId)
                {
                    returnString = "Duplicate Mobile Number!";
                }
                else if (isValidateEmail.Count != 0 && Convert.ToInt64(isValidateEmail[0].EmployeeId) != employeeId)
                {
                    returnString = "Duplicate Email Address!";
                }
                else if (isValidateEmpCode.Count != 0 && Convert.ToInt64(isValidateEmpCode[0].EmployeeId) != employeeId)
                {
                    returnString = "Duplicate Employee Code!";
                }
                else
                {
                    var rolesId = 0;
                    long systemUserId = 0;

                    NameValueCollection _nv = new NameValueCollection();
                    DAL _dl = new DAL();
                    nv.Clear();
                    nv.Add("@CityID-int", city.ToString());
                    var data = dl.GetData("sp_getcities", nv);
                    if (data != null)
                    {
                        if (data.Tables[0].Rows.Count != 0)
                        {
                            cityName = data.Tables[0].Rows[0][1].ToString();
                        }
                    }

                    #region Update Employee Address

                    var updateAddress =
                        _dataContext.sp_EmployeesAddressesUpdate(employeeId, currentAddress, permenantAddress, cityName, country, contactNumber1, contactNumber2).ToList();

                    #endregion

                    #region EmployeeGBDID

                    //if (GDBID == "null")
                    //{
                    //    gdbidid = null;
                    //}
                    //else
                    //{
                    //    gdbidid = GDBID.ToString();
                    //}

                    //var updateGDBID = _dataContext.sp_EmployeeGDBIDUpdate(employeeId, gdbidid);

                    #endregion

                    #region Employee Depot
                    //if (depot != null)
                    //{
                    //    var UpdateDepot = _dataContext.sp_EmployeeDepot_Update(employeeId, depot, isSample);
                    //}

                    #endregion

                    #region Update Employee Membership

                    var updateMembership
                        = isActive ? _dataContext.sp_EmployeeMembershipUpdate(employeeId, email, email.ToLower(), false,
                            remarks).ToList() : _dataContext.sp_EmployeeMembershipUpdate(employeeId, email, email.ToLower(), true, remarks).ToList();

                    if (updateMembership.Count != 0)
                    {
                        systemUserId = Convert.ToInt64(updateMembership[0].SystemUserID);
                    }

                    #endregion

                    #region Update On Selective Option

                    if (selectHierarchy != 0)
                    {
                        #region Set Level

                        switch (type)
                        {
                            case "Level1":
                                levelName = "Level1";
                                break;
                            case "Level2":
                                levelName = "Level2";
                                break;
                            case "Level3":
                                levelName = "Level3";
                                break;
                            case "Level4":
                                levelName = "Level4";
                                break;
                            case "Level5":
                                levelName = "Level5";
                                break;
                            case "Level6":
                                levelName = "Level6";
                                break;
                        }

                        #endregion

                        #region Update Employee BioData

                        #region Check Date Format

                        bool isCorrectDate = IsDate(appointmentDate);

                        if (!isCorrectDate)
                        {
                            var getAppointmentDate = _dataContext.sp_EmployeesSelect(employeeId).ToList();
                            appointmentDate = Convert.ToDateTime(getAppointmentDate[0].AppointmentDate).ToString();

                            isCorrectDate = IsDate(appointmentDate);

                            if (!isCorrectDate)
                            {
                                appointmentDate = DateTime.Now.ToString();
                            }
                        }

                        #endregion

                        List<DatabaseLayer.SQL.Employee> updateEmployee;
                        firstName = firstName.Trim();
                        middleName = middleName.Trim();
                        lastName = lastName.Trim();
                        try
                        {
                            updateEmployee = _dataContext.sp_EmployeesUpdate(employeeId, designation, firstName, lastName, middleName, loginId, mobileNumber,
                                Convert.ToDateTime(appointmentDate), DateTime.Now, gender, isActive, managerId, isSample, depot, employeeCode).ToList();
                        }
                        catch (Exception exception)
                        {
                            if (exception.Message == "SqlDateTime overflow. Must be between 1/1/1753 12:00:00 AM and 12/31/9999 11:59:59 PM.")
                            {
                                updateEmployee = _dataContext.sp_EmployeesUpdate(employeeId, designation, firstName, lastName, middleName, loginId, mobileNumber,
                                    DateTime.Now, DateTime.Now, gender, isActive, managerId, isSample, depot, employeeCode).ToList();
                            }
                        }

                        #endregion

                        #region Employee Type

                        //if (employeeType > 0)
                        //{
                        //    var updateType =
                        //        _dataContext.sp_EmployeesInTypeUpdate(employeeType, employeeId).ToList();
                        //}
                        //else
                        //{
                        //    _dataContext.sp_EmployeesInTypeDelete(null, employeeId);
                        //}

                        #endregion

                        #region Get Role Id

                        //var getRole = _dataContext.sp_SystemRolesSelectByName(levelName).ToList();

                        //if (getRole.Count != 0)
                        //{
                        //    rolesId = Convert.ToInt32(getRole[0].RoleId);
                        //}

                        #endregion

                        #region Update Employee Role

                      //  var updateRole = _dataContext.sp_EmploeesInRolesUpdate(rolesId, employeeId).ToList();

                        #endregion

                        #region Update Employee Hierarchy

                        //var updateHierarchy = _dataContext.sp_EmplyeeHierarchyUpdate(DateTime.Now, DateTime.Now, level6, level5, level4, level3, level2, level1,
                        //    systemUserId).ToList();

                        #endregion
                    }
                    else
                    {
                        if (roleId != 0)
                        {
                            #region Update Employee BioData

                            #region Check Date Format

                            bool isCorrectDate = IsDate(appointmentDate);

                            if (!isCorrectDate)
                            {
                                var getAppointmentDate = _dataContext.sp_EmployeesSelect(employeeId).ToList();
                                appointmentDate = Convert.ToDateTime(getAppointmentDate[0].AppointmentDate).ToString();

                                isCorrectDate = IsDate(appointmentDate);

                                if (!isCorrectDate)
                                {
                                    appointmentDate = DateTime.Now.ToString();
                                }
                            }

                            #endregion

                            List<DatabaseLayer.SQL.Employee> updateEmployee;

                            try
                            {
                                #region Get Designation Id In Case of Admin / HeadOffice

                                if (roleId > 0)
                                {
                                    var getLoweredRoleName = _dataContext.sp_SystemRolesSelect(roleId).ToList();

                                    if (getLoweredRoleName.Count > 0)
                                    {
                                        var getDesignationId =
                                            _dataContext.sp_EmployeeDesignationsSelectByType(null, null,
                                                Convert.ToString(getLoweredRoleName[0].LoweredRoleName)).ToList();

                                        if (getDesignationId.Count > 0)
                                        {
                                            designation = Convert.ToInt32(getDesignationId[0].DesignationId);
                                        }
                                        else
                                        {
                                            designation = -1;
                                        }
                                    }
                                    else
                                    {
                                        designation = -1;
                                    }
                                }

                                #endregion

                                updateEmployee = _dataContext.sp_EmployeesUpdate(employeeId, designation, firstName, lastName, middleName, loginId, mobileNumber,
                                    Convert.ToDateTime(appointmentDate), DateTime.Now, gender, isActive, managerId, isSample, depot, employeeCode).ToList();
                            }
                            catch (Exception exception)
                            {
                                if (exception.Message == "SqlDateTime overflow. Must be between 1/1/1753 12:00:00 AM and 12/31/9999 11:59:59 PM.")
                                {
                                    updateEmployee = _dataContext.sp_EmployeesUpdate(employeeId, designation, firstName, lastName, middleName, loginId, mobileNumber,
                                        DateTime.Now, DateTime.Now, gender, isActive, managerId, isSample, depot, employeeCode).ToList();
                                }
                            }

                            #endregion

                            #region Update Employee Role

                          //  var updateRole = _dataContext.sp_EmploeesInRolesUpdate(roleId, employeeId).ToList();

                            #endregion
                        }
                        else
                        {
                            #region Update Employee BioData

                            var updateEmployeeOnly = _dataContext.sp_EmployeesUpdateOnly(employeeId, firstName, lastName, middleName, loginId, mobileNumber,
                                DateTime.Now, gender, isActive).ToList();

                            #endregion
                        }
                    }

                    #endregion

                    #region Check For Date To Mark Employee As Resigned If Provided

                    if (isActive == false)
                    {
                        //DateTime? resignDate = null;
                        //if (IsDate(resignationDate))
                        //{
                        //    resignDate = Convert.ToDateTime(resignationDate);
                        //}
                        DateTime result;
                        string resignationFinalDate = "";
                        if (!DateTime.TryParse(resignationDate, out result))
                        {
                            result = DateTime.Now;
                        }

                        var employeeresign = _dataContext.sp_EmployeeResignedInsertUpdate(employeeId, Convert.ToDateTime(result.ToString()), isActive).ToList();
                    }
                    else
                    {
                        var employeeresign = _dataContext.sp_EmployeeResignedInsertUpdate(employeeId, null, isActive).ToList();
                    }

                    #endregion

                    #region Check If MR is moving upper hierarchy Then Delete MR Level things

                    //if (level6 <= 0)
                    //{
                    //    _dataContext.sp_MInventoryDelete(employeeId, null, null);
                    //    _dataContext.sp_PlanApprovalDelete(employeeId, null, null);
                    //    _dataContext.sp_MRPlanningDeleteByEmployee(employeeId);
                    //    _dataContext.sp_DoctorsOfSpoDeleteByEmployee(employeeId);
                    //}

                    #endregion

                    returnString = "OK";
                }

                updateTransaction.Commit();

                if (updateTransaction.Connection == null)
                {
                    #region Expense City Relation

                    NameValueCollection _nv = new NameValueCollection();
                    DAL _dl = new DAL();

                    _nv.Clear();
                    _nv.Add("@EmployeeId-int", employeeId.ToString().Trim());
                    _nv.Add("@CityId-varchar(10)", city);
                    var data = dl.GetData("sp_UpdateEmployeeCity", _nv);

                    _nv.Clear();
                    _nv.Add("@EmployeeId-int", employeeId.ToString().Trim());
                    _nv.Add("@LoginId-varchar(50)", loginId.ToString().Trim());
                    _nv.Add("@CityId-varchar(10)", "0");
                    _nv.Add("@System-varchar(50)", "0");
                    data = dl.GetData("sp_InsertEmployeeRelatedCity", _nv);



                    var arrayRelatedCityIDs = RelatedCityIDs.Split(',');

                    for (int i = 0; i < arrayRelatedCityIDs.Length; i++)
                    {
                        if (arrayRelatedCityIDs[i] != "" && arrayRelatedCityIDs[i] != "null")
                        {
                            if (arrayRelatedCityIDs[i] != null)
                            {
                                _nv.Clear();
                                _nv.Add("@EmployeeId-int", employeeId.ToString().Trim());
                                _nv.Add("@LoginId-varchar(50)", loginId.ToString().Trim());
                                _nv.Add("@CityId-varchar(10)", arrayRelatedCityIDs[i]);
                                _nv.Add("@System-varchar(50)", "0");
                                data = dl.GetData("sp_InsertEmployeeRelatedCity", _nv);
                            }
                        }
                    }

                    #endregion

                    #region Expense Travel Expense Type

                    _nv = new NameValueCollection();
                    _dl = new DAL();

                    _nv.Clear();
                    _nv.Add("@EmployeeId-int", employeeId.ToString().Trim());
                    _nv.Add("@IsBikeAllowance-bit", Convert.ToBoolean(IsBikeAllowance) ? "1" : "0");
                    _nv.Add("@IsCarAllowance-bit", Convert.ToBoolean(IsCarAllowance) ? "1" : "0");
                    _nv.Add("@IsIBA-bit", Convert.ToBoolean(IsIBA) ? "1" : "0");
                    data = dl.GetData("sp_UpdateEmployeeTravelExpenseType", _nv);

                    #endregion
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
                if (updateTransaction != null) updateTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }

            return returnString;
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ResignationDateAcceptedOfEmployeeById(string employeeId, string ResigDate)
        {

            string returnString="";
            try
            {
                          
                  nv.Clear();
                nv.Add("@employeeId-int", employeeId);
                nv.Add("@employeeResigDate-DateTime", ResigDate);
                var data = dl.GetData("ResignationDateAcceptedOfEmployeeById", nv);

                if (data != null)
                {
                    returnString = "successUpdate"; 
                }

            }
            catch (Exception ex)
            {
                returnString = "errorInUpdate";
            }
            return returnString;
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteEmployee(long employeeId)
        {
            string returnString = "";
            DbTransaction deleteTransaction = null;

            try
            {
                _dataContext.Connection.Open();
                deleteTransaction = _dataContext.Connection.BeginTransaction();
                _dataContext.Transaction = deleteTransaction;

                var isLinkToManager = _dataContext.sp_EmployeesSelectByManager(employeeId).ToList();

                if (isLinkToManager.Count > 0)
                {
                    returnString = isLinkToManager[0].EmployeeName;
                }
                else
                {
                    var getSystemUserId = _dataContext.sp_EmployeeMembershipSelectByEmployee(employeeId).ToList();
                    long systemUserId = Convert.ToInt64(getSystemUserId[0].SystemUserID);

                    _dataContext.sp_EmplyeeHierarchyDelete(systemUserId);
                    _dataContext.sp_EmployeeMembershipDeleteByEmployee(employeeId);
                    _dataContext.sp_EmployeesAddressesDeleteByEmployee(employeeId);
                    _dataContext.sp_EmploeesInRolesDelete(null, employeeId);
                    _dataContext.sp_EmployeesInTypeDelete(null, employeeId);
                    _dataContext.sp_PreSalesCallsDeleteByEmployee(employeeId);
                    _dataContext.sp_MRPlanningDeleteByEmployee(employeeId);
                    _dataContext.sp_DoctorsOfSpoDeleteByEmployee(employeeId);
                    _dataContext.sp_CalVisitorsDeleteByEmployee(employeeId);
                    _dataContext.sp_PlanApprovalDelete(employeeId, null, null);
                    _dataContext.sp_EmployeesDelete(employeeId);

                    returnString = "OK";
                    deleteTransaction.Commit();
                }
            }
            catch (SqlException exception)
            {
                if (exception.Number == 547)
                {
                    returnString = "Not able to delete this record due to linkup.";
                }
                else
                {
                    returnString = exception.Message;
                }

                deleteTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }

            return returnString;
        }

        public void insert(string e_id, string p_d)
        {

            nv.Clear();
            nv.Add("EmployeeId-bigint", e_id.ToString());
            nv.Add("pree_days-int", p_d.ToString());
            bool result = dl.InserData("sp_EmployeesUpdatepree_days", nv);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmployee_pree_days(long employeeId)
        {
            string returnString = "";

            try
            {

                nv.Clear();
                nv.Add("@EmployeeId-bigint", employeeId.ToString());

                DataSet ds = dl.GetData("sp_SelectEmployeePree_days", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].Rows[0]["pree_days"].ToString();

                    }
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
        public string GetCityDetailsByEmpId(string EmployeeId)
        {

            string returnString = "";

            try
            {

                nv.Clear();
                nv.Add("@EmployeeId-int", EmployeeId.ToString());

                var ds = dl.GetData("sp_GetEmployeeCityDetailByEmpID", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
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
        public string GetEmployeeIDWithLevels(string Level1,string Level2,string Level3, string Level4, string Level5, string Level6)
        {

            string returnString = "";

            try
            {

                nv.Clear();
                nv.Add("@Level1-int", Level1.ToString());
                nv.Add("@Level2-int", Level2.ToString());
                nv.Add("@Level3-int", Level3.ToString());
                nv.Add("@Level4-int", Level4.ToString());
                nv.Add("@Level5-int", Level5.ToString());
                nv.Add("@Level6-int", Level6.ToString());

                var ds = dl.GetData("sp_getEmployeeIDWithLevels", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
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
    }
}

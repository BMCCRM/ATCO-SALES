using DatabaseLayer.SQL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.Services;
using PocketDCR2.Classes;
using PocketDCR.CustomMembershipProvider;
using System.Data;
using System.Collections.Specialized;
using System.Configuration;
using System.Net;
using System.IO;
using System.Device;
using System.Device.Location;
using System.Text;

namespace PocketDCR2.WebService
{
    /// <summary>
    /// Summary description for app_login
    /// </summary>
    [WebService(Namespace = "http://www.pharmacrm.com.pk/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    //To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class app_login : System.Web.Services.WebService
    {
        private readonly DatabaseDataContext _dataContext =
          new DatabaseDataContext(Constants.GetConnectionString());
        DAL _dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        private SystemUser _currentUser;

        [WebMethod]
        public string AllowLogin(string userName, string Password)
        {
            return Membership.ValidateUser(userName, Password) ? "Allowed" : "NotAllowed";
        }

        [WebMethod]
        public string AllowLoginForPlan(string userName, string Password)
        {
            //_dataContext = new DatabaseDataContext(Constants.GetConnectionString());
            string retrnString = "";
            string str = Membership.ValidateUser(userName, Password) ? "Allowed" : "NotAllowed";
            if (str == "Allowed")
            {
                _currentUser = (SystemUser)Membership.GetUser(userName, true);
                if (_currentUser != null)
                {
                    if (_currentUser.IsApproved)
                    {
                        var roleId = _dataContext.sp_EmploeesInRolesSelect(null, Convert.ToInt64(_currentUser.EmployeeId)).ToList();
                        if (roleId.Count != 0)
                        {
                            var getRoleId = roleId[0].RoleId;
                            var getRole = _dataContext.sp_SystemRolesSelect(getRoleId).ToList();
                            if (getRole.Count != 0)
                            {
                                if (getRole[0].LoweredRoleName.ToString() == "rl6" || getRole[0].LoweredRoleName.ToString() == "rl5" || getRole[0].LoweredRoleName.ToString() == "rl4")
                                {
                                    DataSet ds = _dl.GetData("sp_getHeirarchyByEmployeeID", new System.Collections.Specialized.NameValueCollection { { "@SystemUserID-bigint", _currentUser.EmployeeId.ToString() } });
                                    string getHeirarchy = "";
                                    string getName = "";
                                    string getTeam = "";
                                    string getDesignation = "";
                                    string getloginId = "";
                                    if (ds != null && ds.Tables[0].Rows.Count != 0)
                                    {
                                        getHeirarchy = ds.Tables[0].Rows[0][0].ToString();
                                        getName = ds.Tables[0].Rows[0][1].ToString();
                                        getTeam = ds.Tables[0].Rows[0][2].ToString();
                                        getDesignation = ds.Tables[0].Rows[0][3].ToString();
                                        getloginId = ds.Tables[0].Rows[0][4].ToString();
                                    }
                                    retrnString = _currentUser.EmployeeId.ToString() + "~" + getRole[0].LoweredRoleName.ToString() + "~" + getHeirarchy + "~" + getName + "~" + getTeam + "~" + getDesignation + "~" + getloginId;
                                }

                                else
                                {
                                    retrnString = "onlyrole4and5and6allowed";
                                }
                            }
                        }
                    }
                    else
                    {
                        retrnString = "notactive";
                    }

                }
            }
            else
            {
                retrnString = str;
            }
            return retrnString;
        }

        [WebMethod]
        public string AllowLoginForPlanWithExtraDetails(string userName, string Password, string AppVersion, string location, string MacAddress, string CreateDateTime, string ModelNumber)
        {
            //_dataContext = new DatabaseDataContext(Constants.GetConnectionString());
            string retrnString = "";
            DateTime now = DateTime.Now;
            string str = Membership.ValidateUser(userName, Password) ? "Allowed" : "NotAllowed";

            bool allowexecution = false;
            try
            {
                string allowedApplicationVersions = Constants.GetAllowedApplicationVersions();
                if (allowedApplicationVersions.ToLower() == "all")
                {
                    allowexecution = true;
                }
                else
                {
                    string[] allowedapps = allowedApplicationVersions.Split(',');
                    for (int i = 0; i < allowedapps.Length; i++)
                    {
                        if (allowedapps[i] == AppVersion)
                        {
                            allowexecution = true;
                            break;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            if (!allowexecution)
            {
                retrnString = "Application version not allowed to excute the calls";
                return retrnString;
            }
            else
            {
                if (str == "Allowed")
                {
                    _currentUser = (SystemUser)Membership.GetUser(userName, true);
                    if (_currentUser != null)
                    {
                        if (_currentUser.IsApproved)
                        {
                            var roleId = _dataContext.sp_EmploeesInRolesSelect(null, Convert.ToInt64(_currentUser.EmployeeId)).ToList();
                            if (roleId.Count != 0)
                            {
                                var getRoleId = roleId[0].RoleId;
                                var getRole = _dataContext.sp_SystemRolesSelect(getRoleId).ToList();
                                if (getRole.Count != 0)
                                {
                                    if (getRole[0].LoweredRoleName.ToString() == "rl6")
                                    {
                                        DataSet ds = _dl.GetData("sp_getHeirarchyByEmployeeID", new System.Collections.Specialized.NameValueCollection { { "@SystemUserID-bigint", _currentUser.EmployeeId.ToString() } });
                                        string getHeirarchy = "";
                                        string getName = "";
                                        string getTeam = "";
                                        if (ds != null && ds.Tables[0].Rows.Count != 0)
                                        {
                                            getHeirarchy = ds.Tables[0].Rows[0][0].ToString();
                                            getName = ds.Tables[0].Rows[0][1].ToString();
                                            getTeam = ds.Tables[0].Rows[0][2].ToString();
                                        }
                                        try
                                        {
                                            nv.Clear();
                                            nv.Add("@UserId-varchar(250)", userName.ToString());
                                            nv.Add("@EmpId-int", _currentUser.EmployeeId.ToString());
                                            nv.Add("@AppVersion-varchar(250)", AppVersion.ToString());
                                            nv.Add("@location-varchar(250)", location.ToString());
                                            nv.Add("@MacAddress-varchar(250)", MacAddress.ToString());
                                            nv.Add("@CreateDateTime-datetime", CreateDateTime);
                                            nv.Add("@ModelNumber-text", ModelNumber);
                                            var appds = _dl.InserData("sp_InsertAppLoginAcces", nv);
                                        }
                                        catch (Exception)
                                        {

                                            throw;
                                        }


                                        retrnString = _currentUser.EmployeeId.ToString() + "~" + getRole[0].LoweredRoleName.ToString() + "~" + getHeirarchy + "~" + getName + "~" + DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss") + "~" + getTeam;

                                    }
                                    else
                                    {
                                        retrnString = "onlyrole6allowed";
                                    }
                                }
                            }
                        }
                        else
                        {
                            retrnString = "notactive";
                        }

                    }
                }
                else
                {
                    retrnString = str;
                }
                return retrnString;
            }
        }


        [WebMethod]
        public string AllowLoginForPlanWithExtraDetails_ForIMEI(string userName, 
            string Password, string AppVersion, string location, string MacAddress, string IMEIAddress,
            string CreateDateTime, string ModelNumber)
        {
            //_dataContext = new DatabaseDataContext(Constants.GetConnectionString());
            string retrnString = "";
            DateTime now = DateTime.Now;
            string str = Membership.ValidateUser(userName, Password) ? "Allowed" : "NotAllowed";

            bool allowexecution = false;
            try
            {
                string allowedApplicationVersions = Constants.GetAllowedApplicationVersions();
                if (allowedApplicationVersions.ToLower() == "all")
                {
                    allowexecution = true;
                }
                else
                {
                    string[] allowedapps = allowedApplicationVersions.Split(',');
                    for (int i = 0; i < allowedapps.Length; i++)
                    {
                        if (allowedapps[i] == AppVersion)
                        {
                            allowexecution = true;
                            break;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            if (!allowexecution)
            {
                retrnString = "Application version not allowed to excute the calls";
                return retrnString;
            }
            else
            {
                if (str == "Allowed")
                {
                    _currentUser = (SystemUser)Membership.GetUser(userName, true);
                    if (_currentUser != null)
                    {
                        if (_currentUser.IsApproved)
                        {
                            var roleId = _dataContext.sp_EmploeesInRolesSelect(null, Convert.ToInt64(_currentUser.EmployeeId)).ToList();
                            if (roleId.Count != 0)
                            {
                                var getRoleId = roleId[0].RoleId;
                                var getRole = _dataContext.sp_SystemRolesSelect(getRoleId).ToList();
                                if (getRole.Count != 0)
                                {
                                    if (getRole[0].LoweredRoleName.ToString() == "rl6")
                                    {
                                        DataSet ds = _dl.GetData("sp_getHeirarchyByEmployeeID", new System.Collections.Specialized.NameValueCollection { { "@SystemUserID-bigint", _currentUser.EmployeeId.ToString() } });
                                        string getHeirarchy = "";
                                        string getName = "";
                                        string getTeam = "";
                                        if (ds != null && ds.Tables[0].Rows.Count != 0)
                                        {
                                            getHeirarchy = ds.Tables[0].Rows[0][0].ToString();
                                            getName = ds.Tables[0].Rows[0][1].ToString();
                                            getTeam = ds.Tables[0].Rows[0][2].ToString();
                                        }
                                        try
                                        {
                                            nv.Clear();
                                            nv.Add("@UserId-varchar(250)", userName.ToString());
                                            nv.Add("@EmpId-int", _currentUser.EmployeeId.ToString());
                                            nv.Add("@AppVersion-varchar(250)", AppVersion.ToString());
                                            nv.Add("@location-varchar(250)", location.ToString());
                                            nv.Add("@MacAddress-varchar(250)", MacAddress.ToString());
                                            nv.Add("@CreateDateTime-datetime", CreateDateTime);
                                            nv.Add("@IMEIAddress-varchar(250)", IMEIAddress);
                                            nv.Add("@DeviceDetails-text", ModelNumber);
                                            var appds = _dl.GetData("sp_InsertAppLoginAcces_IMEI", nv);
                                            if (appds != null)
                                            {
                                                if (appds.Tables[0].Rows.Count != 0)
                                                {
                                                    if (appds.Tables[0].Rows[0][0].ToString() != "OK")
                                                    {
                                                        retrnString = appds.Tables[0].Rows[0][0].ToString();
                                                        return retrnString;
                                                    }
                                                }
                                            }
                                        }
                                        catch (Exception)
                                        {

                                            throw;
                                        }


                                        retrnString = _currentUser.EmployeeId.ToString() + "~" + getRole[0].LoweredRoleName.ToString() + "~" + getHeirarchy + "~" + getName + "~" + DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss") + "~" + getTeam;

                                    }
                                    else
                                    {
                                        retrnString = "onlyrole6allowed";
                                    }
                                }
                            }
                        }
                        else
                        {
                            retrnString = "notactive";
                        }

                    }
                }
                else
                {
                    retrnString = str;
                }
                return retrnString;
            }
        }

        [WebMethod]
        public string AllowLoginForPlanWithExtraDetails_ForIMEIWork(string userName,
            string Password, string AppVersion, string location, string MacAddress, string IMEIAddress,
            string CreateDateTime, string ModelNumber)
        {
            //_dataContext = new DatabaseDataContext(Constants.GetConnectionString());
            string retrnString = "";
            string EmployeeId = "";
            string IMEINo = "";
            string str = "";
            bool isFirstTime = false;
            DateTime now = DateTime.Now;            

            #region Application Version Check

            bool allowexecution = false;
            try
            {
                string allowedApplicationVersions = Constants.GetAllowedApplicationVersions();
                if (allowedApplicationVersions.ToLower() == "all")
                {
                    allowexecution = true;
                }
                else
                {
                    string[] allowedapps = allowedApplicationVersions.Split(',');
                    for (int i = 0; i < allowedapps.Length; i++)
                    {
                        if (allowedapps[i] == AppVersion)
                        {
                            allowexecution = true;
                            break;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            if (!allowexecution)
            {
                retrnString = "Application version not allowed to excute the calls";
                return retrnString;
            }

            #endregion

            _currentUser = (SystemUser)Membership.GetUser(userName, true);
            EmployeeId = _currentUser == null ? "0" : _currentUser.EmployeeId.ToString();
            //Get Employee IMEI
            DataSet dsIMEI = _dl.GetData("SP_GetEmpIMEI", new System.Collections.Specialized.NameValueCollection { { "@EmployeeId-bigint", EmployeeId } });

            if (dsIMEI.Tables[0] != null)
            {
                if (dsIMEI.Tables[0].Rows.Count > 0)
                {
                    //Both IMEI are signle no loop required
                    if (!(IMEIAddress.Contains(',')) && !(dsIMEI.Tables[0].Rows[0]["IMEI"].ToString().Contains(',')))
                    {
                        str = Membership.ValidateUser(userName, Password) ? "Allowed" : "NotAllowed";

                        str = str == "Allowed" ? (dsIMEI.Tables[0] != null && dsIMEI.Tables[0].Rows.Count > 0) &&
                                        (dsIMEI.Tables[0].Rows[0]["IMEI"].ToString() == "" || dsIMEI.Tables[0].Rows[0]["IMEI"].ToString() == IMEIAddress)
                                        ? "Allowed" : "DeviceAlreadyRegistered"
                                     : "NotAllowed";
                    }
                    //IMEI is multiple and database contains single IMEI
                    else if (IMEIAddress.Contains(',') && !(dsIMEI.Tables[0].Rows[0]["IMEI"].ToString().Contains(',')))
                    {
                        for (int MobileIMEI = 0; MobileIMEI < IMEIAddress.Split(',').Length; MobileIMEI++)
                        {
                            str = Membership.ValidateUser(userName, Password) ? "Allowed" : "NotAllowed";

                            str = str == "Allowed" ? (dsIMEI.Tables[0] != null && dsIMEI.Tables[0].Rows.Count > 0) &&
                                            (dsIMEI.Tables[0].Rows[0]["IMEI"].ToString() == "" || dsIMEI.Tables[0].Rows[0]["IMEI"].ToString() == IMEIAddress.Split(',')[MobileIMEI])
                                            ? "Allowed" : "DeviceAlreadyRegistered"
                                         : "NotAllowed";
                            if (str == "Allowed")
                                break;
                        }
                    }
                    //IMEI is single and database contains multiple IMEI
                    else if (!(IMEIAddress.Contains(',')) && dsIMEI.Tables[0].Rows[0]["IMEI"].ToString().Contains(','))
                    {
                        for (int DBIMEI = 0; DBIMEI < dsIMEI.Tables[0].Rows[0]["IMEI"].ToString().Split(',').Length; DBIMEI++)
                        {
                            str = Membership.ValidateUser(userName, Password) ? "Allowed" : "NotAllowed";

                            str = str == "Allowed" ? (dsIMEI.Tables[0] != null && dsIMEI.Tables[0].Rows.Count > 0) &&
                                            (dsIMEI.Tables[0].Rows[0]["IMEI"].ToString().Split(',')[DBIMEI] == "" || dsIMEI.Tables[0].Rows[0]["IMEI"].ToString().Split(',')[DBIMEI] == IMEIAddress)
                                            ? "Allowed" : "DeviceAlreadyRegistered"
                                         : "NotAllowed";
                            if (str == "Allowed")
                                break;

                        }
                    }
                    //Both contains multiple IMEI so need nested loop
                    else if (IMEIAddress.Contains(',') && dsIMEI.Tables[0].Rows[0]["IMEI"].ToString().Contains(','))
                    {
                        for (int MobileIMEI = 0; MobileIMEI < IMEIAddress.Split(',').Length; MobileIMEI++)
                        {
                            for (int DBIMEI = 0; DBIMEI < dsIMEI.Tables[0].Rows[0]["IMEI"].ToString().Split(',').Length; DBIMEI++)
                            {
                                str = Membership.ValidateUser(userName, Password) ? "Allowed" : "NotAllowed";

                                str = str == "Allowed" ? (dsIMEI.Tables[0] != null && dsIMEI.Tables[0].Rows.Count > 0) &&
                                                (dsIMEI.Tables[0].Rows[0]["IMEI"].ToString().Split(',')[DBIMEI] == "" || dsIMEI.Tables[0].Rows[0]["IMEI"].ToString().Split(',')[DBIMEI] == IMEIAddress.Split(',')[MobileIMEI])
                                                ? "Allowed" : "DeviceAlreadyRegistered"
                                             : "NotAllowed";
                                if (str == "Allowed")
                                    break;
                            }
                            if (str == "Allowed")
                                break;

                        }
                    }
                }
                else
                {
                    str = Membership.ValidateUser(userName, Password) ? "Allowed" : "NotAllowed";
                    isFirstTime = true;
                }
            }
            else
            {
                str = "NotAllowed";
            }

            if (str == "Allowed")
            {
                _currentUser = (SystemUser)Membership.GetUser(userName, true);
                if (_currentUser != null)
                {
                    if (_currentUser.IsApproved)
                    {
                        var roleId = _dataContext.sp_EmploeesInRolesSelect(null, Convert.ToInt64(_currentUser.EmployeeId)).ToList();
                        if (roleId.Count != 0)
                        {
                            var getRoleId = roleId[0].RoleId;
                            var getRole = _dataContext.sp_SystemRolesSelect(getRoleId).ToList();
                            if (getRole.Count != 0)
                            {
                                if (getRole[0].LoweredRoleName.ToString() == "rl6" || getRole[0].LoweredRoleName.ToString() == "rl5" || getRole[0].LoweredRoleName.ToString() == "rl4")
                                {
                                    DataSet ds = _dl.GetData("sp_getHeirarchyByEmployeeID", new System.Collections.Specialized.NameValueCollection { { "@SystemUserID-bigint", _currentUser.EmployeeId.ToString() } });
                                    string getHeirarchy = "";
                                    string getName = "";
                                    string getTeam = "";
                                    string getDesignation = "";
                                    string getloginId = "";
                                    if (ds != null && ds.Tables[0].Rows.Count != 0)
                                    {
                                        getHeirarchy = ds.Tables[0].Rows[0][0].ToString();
                                        getName = ds.Tables[0].Rows[0][1].ToString();
                                        getTeam = ds.Tables[0].Rows[0][2].ToString();
                                        getDesignation = ds.Tables[0].Rows[0][3].ToString();
                                        getloginId = ds.Tables[0].Rows[0][4].ToString();

                                    }
                                    try
                                    {
                                        //if (isFirstTime)
                                        //{
                                        //    //registering imei on first time login and locking
                                        //    _dl.GetData("SP_InsertEmpIMEI",
                                        //        new System.Collections.Specialized.NameValueCollection { 
                                        //    { "@EmployeeId-bigint", EmployeeId },
                                        //    { "@IMEI-varchar(50)", IMEI.ToString() }, 
                                        //    { "@CreatedBy-bigint", "0" }
                                        //    });
                                        //}

                                        nv.Clear();
                                        nv.Add("@UserId-varchar(250)", userName.ToString());
                                        nv.Add("@EmpId-int", _currentUser.EmployeeId.ToString());
                                        nv.Add("@AppVersion-varchar(250)", AppVersion.ToString());
                                        nv.Add("@location-varchar(250)", location.ToString());
                                        nv.Add("@MacAddress-varchar(250)", MacAddress.ToString());
                                        nv.Add("@CreateDateTime-datetime", CreateDateTime);
                                        nv.Add("@IMEIAddress-varchar(250)", IMEIAddress);
                                        nv.Add("@DeviceDetails-text", ModelNumber);
                                        var appds = _dl.GetData("sp_InsertAppLoginAcces_IMEI", nv);
                                        if (appds != null)
                                        {
                                            if (appds.Tables[0].Rows.Count != 0)
                                            {
                                                if (appds.Tables[0].Rows[0][0].ToString() != "OK")
                                                {
                                                    retrnString = appds.Tables[0].Rows[0][0].ToString();
                                                    return retrnString;
                                                }
                                            }
                                        }
                                    }
                                    catch (Exception)
                                    {

                                        throw;
                                    }
                                    retrnString = _currentUser.EmployeeId.ToString() + "~" + getRole[0].LoweredRoleName.ToString() + "~" + getHeirarchy + "~" + getName + "~" + DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss") + "~" + getTeam + "~" + getDesignation + "~" + getloginId;
                                }
                                else
                                {
                                    retrnString = "onlyrole6and5and4allowed";
                                }
                            }
                        }
                    }
                    else
                    {
                        retrnString = "notactive";
                    }
                }
            }
            else
            {
                retrnString = str;
            }
            return retrnString;
        }


        [WebMethod]
        public string AllowLoginWithExtraDetailsForManager(string userName, string Password, string AppVersion, string location, string MacAddress, string CreateDateTime, string ModelNumber)
        {
            //_dataContext = new DatabaseDataContext(Constants.GetConnectionString());
            string retrnString = "";
            DateTime now = DateTime.Now;
            string str = Membership.ValidateUser(userName, Password) ? "Allowed" : "NotAllowed";
            if (str == "Allowed")
            {
                _currentUser = (SystemUser)Membership.GetUser(userName, true);
                if (_currentUser != null)
                {
                    if (_currentUser.IsApproved)
                    {
                        var roleId = _dataContext.sp_EmploeesInRolesSelect(null, Convert.ToInt64(_currentUser.EmployeeId)).ToList();
                        if (roleId.Count != 0)
                        {
                            var getRoleId = roleId[0].RoleId;
                            var getRole = _dataContext.sp_SystemRolesSelect(getRoleId).ToList();
                            if (getRole.Count != 0)
                            {
                                if (getRole[0].LoweredRoleName.ToString() == "rl5" || getRole[0].LoweredRoleName.ToString() == "rl4"
                                    //|| getRole[0].LoweredRoleName.ToString() == "rl3"
                                    || getRole[0].LoweredRoleName.ToString() == "ftm")
                                {
                                    DataSet ds = _dl.GetData("sp_getHeirarchyByEmployeeID", new System.Collections.Specialized.NameValueCollection { { "@SystemUserID-bigint", _currentUser.EmployeeId.ToString() } });
                                    string getHeirarchy = "";
                                    string getName = "";
                                    if (ds != null && ds.Tables[0].Rows.Count != 0)
                                    {
                                        getHeirarchy = ds.Tables[0].Rows[0][0].ToString();
                                        getName = ds.Tables[0].Rows[0][1].ToString();
                                    }
                                    try
                                    {
                                        nv.Clear();
                                        nv.Add("@UserId-varchar(250)", userName.ToString());
                                        nv.Add("@EmpId-int", _currentUser.EmployeeId.ToString());
                                        nv.Add("@AppVersion-varchar(250)", AppVersion.ToString());
                                        nv.Add("@location-varchar(250)", location.ToString());
                                        nv.Add("@MacAddress-varchar(250)", MacAddress.ToString());
                                        nv.Add("@CreateDateTime-datetime", CreateDateTime);
                                        nv.Add("@ModelNumber-text", ModelNumber);
                                        var appds = _dl.InserData("sp_InsertAppLoginAcces", nv);
                                    }
                                    catch (Exception)
                                    {

                                        throw;
                                    }


                                    retrnString = _currentUser.EmployeeId.ToString() + "~" + getRole[0].LoweredRoleName.ToString() + "~" + getHeirarchy + "~" + getName + "~" + DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss");

                                }
                                else
                                {
                                    //retrnString = "onlyrole5role4role3allowed";
                                    retrnString = "onlyrole5role4ftmallowed";
                                }
                            }
                        }
                    }
                    else
                    {
                        retrnString = "notactive";
                    }

                }
            }
            else
            {
                retrnString = str;
            }
            return retrnString;
        }

        [WebMethod]
        public string AllowLoginForFLM(string userName, string Password)
        {
            //_dataContext = new DatabaseDataContext(Constants.GetConnectionString());
            string retrnString = "";
            string str = Membership.ValidateUser(userName, Password) ? "Allowed" : "NotAllowed";
            if (str == "Allowed")
            {
                _currentUser = (SystemUser)Membership.GetUser(userName, true);
                if (_currentUser != null)
                {
                    if (_currentUser.IsApproved)
                    {
                        var roleId = _dataContext.sp_EmploeesInRolesSelect(null, Convert.ToInt64(_currentUser.EmployeeId)).ToList();
                        if (roleId.Count != 0)
                        {
                            var getRoleId = roleId[0].RoleId;
                            var getRole = _dataContext.sp_SystemRolesSelect(getRoleId).ToList();
                            if (getRole.Count != 0)
                            {
                                if (getRole[0].LoweredRoleName.ToString() == "rl5")
                                {
                                    DataSet ds = _dl.GetData("sp_getHeirarchyByEmployeeID", new System.Collections.Specialized.NameValueCollection { { "@SystemUserID-bigint", _currentUser.EmployeeId.ToString() } });
                                    string getHeirarchy = "";
                                    string getName = "";
                                    if (ds != null && ds.Tables[0].Rows.Count != 0)
                                    {
                                        getHeirarchy = ds.Tables[0].Rows[0][0].ToString();
                                        getName = ds.Tables[0].Rows[0][1].ToString();
                                    }
                                    retrnString = _currentUser.EmployeeId.ToString() + "~" + getRole[0].LoweredRoleName.ToString() + "~" + getHeirarchy + "~" + getName;
                                }
                                else
                                {
                                    retrnString = "onlyrole5allowed";
                                }
                            }
                        }
                    }
                    else
                    {
                        retrnString = "notactive";
                    }

                }
            }
            else
            {
                retrnString = str;
            }
            return retrnString;
        }

        [WebMethod]
        public string AllowLoginForDashboard(string userName, string Password)
        {
            //_dataContext = new DatabaseDataContext(Constants.GetConnectionString());
            string retrnString = "";
            string str = Membership.ValidateUser(userName, Password) ? "Allowed" : "NotAllowed";
            if (str == "Allowed")
            {
                _currentUser = (SystemUser)Membership.GetUser(userName, true);
                if (_currentUser != null)
                {
                    if (_currentUser.IsApproved)
                    {
                        var roleId = _dataContext.sp_EmploeesInRolesSelect(null, Convert.ToInt64(_currentUser.EmployeeId)).ToList();
                        if (roleId.Count != 0)
                        {
                            var getRoleId = roleId[0].RoleId;
                            var getRole = _dataContext.sp_SystemRolesSelect(getRoleId).ToList();
                            if (getRole.Count != 0)
                            {
                                //if (getRole[0].LoweredRoleName.ToString() == "rl5")
                                //{
                                DataSet ds = _dl.GetData("sp_getHeirarchyByEmployeeID", new System.Collections.Specialized.NameValueCollection { { "@SystemUserID-bigint", _currentUser.EmployeeId.ToString() } });
                                string getHeirarchy = "";
                                string getName = "";
                                if (ds != null && ds.Tables[0].Rows.Count != 0)
                                {
                                    getHeirarchy = ds.Tables[0].Rows[0][0].ToString();
                                    getName = ds.Tables[0].Rows[0][1].ToString();
                                }
                                retrnString = _currentUser.EmployeeId.ToString() + "~" + getRole[0].LoweredRoleName.ToString() + "~" + getHeirarchy + "~" + getName;
                                //}
                                //else
                                //{
                                //    retrnString = "onlyrole5allowed";
                                //}
                            }
                        }
                    }
                    else
                    {
                        retrnString = "notactive";
                    }

                }
            }
            else
            {
                retrnString = str;
            }
            return retrnString;
        }

        [WebMethod]
        public string SaveCallForMobile(string isPlanned, string date, string startTime, string docDetail, string endTime,
            string activity, string reason, string product1, string product2, string product3, string product4,
            string sample1, string sampleQty1, string sample2, string sampleQty2, string sample3, string sampleQty3,
            string jvflm, string jvslm, string gift, string giftQty, string callNotes, string employeeId, string coaching, string lati, string longi)
        {
            string returnString;
            string level3 = null, level4 = null, level5 = null, level6 = null;
            var doctorId = "";
            string classId = "", specialityId = "", qulificationId = "";
            int month = 0;
            int year = 0;
            NameValueCollection _nvCollection = new NameValueCollection();

            try
            {
                date = date + " " + startTime;
                DateTime result;
                if (!DateTime.TryParse(date, out result))
                {
                    returnString = "DateTime Format Is invalid";
                    return returnString;
                }

                month = result.Month;
                year = result.Year;

                #region preedays work

                string dt_temp = "";
                string pree_day = "0";
                int aloowsDays = 24;

                dt_temp = Convert.ToString(result).ToString();

                _nvCollection.Clear();
                _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());

                DataSet ds_p = _dl.GetData("sp_SelectEmployeePree_days_withEmpID", _nvCollection);
                if (ds_p != null)
                {
                    if (ds_p.Tables[0].Rows.Count > 0)
                    {
                        pree_day = ds_p.Tables[0].Rows[0]["pree_days"].ToString();

                        if (pree_day == "")
                        {
                            pree_day = "0";
                        }
                        else if (ds_p.Tables[0].Rows[0]["pree_days"] == null)
                        {
                            pree_day = "0";
                        }

                    }
                }

                if (Convert.ToDateTime(Convert.ToDateTime(dt_temp).ToString("MM/dd/yyyy")) <= Convert.ToDateTime(System.DateTime.Now.ToString("MM/dd/yyyy")))
                {
                    if (DATEDIFFForHours("Hours", Convert.ToDateTime(dt_temp), Convert.ToDateTime(System.DateTime.Now)) > 36)
                    {
                        if (DATEDIFFForHours("Hours", Convert.ToDateTime(dt_temp), Convert.ToDateTime(System.DateTime.Now)) > ((Convert.ToInt32(pree_day) * aloowsDays) + 36))
                        {
                            returnString = "PreeDays";
                            return returnString;
                        }
                    }
                }
                else
                {
                    returnString = "Not Allowed";
                    return returnString;
                }

                #endregion

                #region Employee Information
                var dsEmployeeMemberShipInfo = _dl.GetData("sp_EmployeeMembershipSelectByEmployee",
                    new NameValueCollection { { "@EmployeeId-BIGINT", employeeId } });
                if (dsEmployeeMemberShipInfo != null)
                {
                    var dsEmployeeHierarchy = _dl.GetData("sp_EmplyeeHierarchySelect",
                        new NameValueCollection { { "@SystemUserID-BIGINT", dsEmployeeMemberShipInfo.Tables[0].Rows[0]["SystemUserID"].ToString() } });
                    if (dsEmployeeHierarchy != null)
                    {
                        level3 = dsEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"].ToString();
                        level4 = dsEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"].ToString();
                        level5 = dsEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"].ToString();
                        level6 = dsEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"].ToString();
                    }
                }
                else
                {
                    returnString = "Employee Not Found";
                    return returnString;
                }
                #endregion

                #region Get Doctor Details
                var doctorCode = docDetail.Split('-')[0];
                //var dsGetMrDoctorDetails = _dl.GetData("sp_MRDoctorSelectByCode", new NameValueCollection { { "@EmployeeId-bigint", employeeId }, { "@Code-nvarchar-20", doctorCode } });+
                var dsGetMrDoctorDetails = _dl.GetData("sp_MRDoctorSelectByCode_new", new NameValueCollection { { "@EmployeeId-bigint", employeeId }, { "@Code-nvarchar-20", doctorCode }, { "@month-int", month.ToString() }, { "@year-int", year.ToString() } });
                if (dsGetMrDoctorDetails != null)
                {
                    if (dsGetMrDoctorDetails.Tables[0].Rows.Count > 0)
                    {
                        doctorId = dsGetMrDoctorDetails.Tables[0].Rows[0]["DoctorId"].ToString();

                        #region Get Class Of Doctor

                        var doctorClassDetail = _dl.GetData("sp_ClassOfDoctorSelect",
                            new NameValueCollection { { "@DoctorId-bigint", doctorId } });
                        if (doctorClassDetail != null)
                            if (doctorClassDetail.Tables[0].Rows.Count > 0)
                            {
                                classId = doctorClassDetail.Tables[0].Rows[0]["ClassId"].ToString();
                            }
                            else
                            {
                                returnString = "Class Of Doctor Not Found";
                                return returnString;
                            }

                        #endregion

                        #region Get Speciality Of Doctor

                        var doctorSpecialityDetail = _dl.GetData("sp_DoctorSpecialitySelectByDoctor",
                            new NameValueCollection { { "@DoctorId-BIGINT", doctorId } });
                        if (doctorSpecialityDetail != null)
                            if (doctorSpecialityDetail.Tables[0].Rows.Count > 0)
                            {
                                specialityId = doctorSpecialityDetail.Tables[0].Rows[0]["SpecialityId"].ToString();
                            }
                            else
                            {
                                returnString = "Speciality Of Doctor Not Found";
                                return returnString;
                            }

                        #endregion

                        #region Get Qualification Of Doctor

                        var doctorQualificationDetail = _dl.GetData("sp_QualificationsOfDoctorsSelectByDoctor",
                            new NameValueCollection { { "@DoctorId-BIGINT", doctorId } });
                        if (doctorQualificationDetail != null)
                            if (doctorQualificationDetail.Tables[0].Rows.Count > 0)
                            {
                                qulificationId = doctorQualificationDetail.Tables[0].Rows[0]["QulificationId"].ToString();
                            }
                            else
                            {
                                returnString = "Qualification Of Doctor Not Found";
                                return returnString;
                            }

                        #endregion
                    }
                }
                else
                {
                    returnString = "Doctor Not Found in Doctor List Of MIO";
                    return returnString;
                }

                #endregion

                #region Get Visit Shift

                var hour = Convert.ToInt32(result.ToString("HH"));

                string vt;
                if (hour >= 0 && hour < 12)
                {
                    vt = "1";
                }
                else if (hour < 17)
                {
                    vt = "1";
                }
                else
                {
                    vt = "2";
                }



                #endregion

                #region PreSalesCallInsert



                long salesCallsId;

                DataSet set = _dl.GetData("sp_check_call_execute", new NameValueCollection { { "@Level3LevelId-int,", level3 }, { "@Level4LevelId-int,", level4 }, { "@Level5LevelId-int,", level5 }, { "@Level6LevelId-int,", level6 }, { "@ClassId-int,", classId }, { "@SpecialityId-int", specialityId }, { "@QualificationId-int,", qulificationId }, { "@DoctorId-bigint", doctorId }, { "@EmployeeId-bigint", employeeId }, { "@IsPlanned-VARCHAR-50", isPlanned == "No" ? "NULL" : isPlanned }, { "@visitdate-datetime", result.ToString() }, });
                if (set.Tables[0].Rows.Count > 0)
                {
                    returnString = "Already Executed";
                    return returnString;
                }
                else
                {

                    if (isPlanned == "No")
                    {

                        DataSet set2 = _dl.GetData("sp_check_CallExecuteForUnplanned", new NameValueCollection { { "@DoctorId-bigint", doctorId }, { "@EmployeeId-bigint", employeeId }, { "@visitdate-datetime", result.ToString() }, });
                        if (set2.Tables[0].Rows.Count > 0)
                        {
                            returnString = "Planned";
                            return returnString;
                        }
                        else
                        {

                            var dsPreSalesCalls = _dl.GetData("sp_PreSalesCallsInsert2", new NameValueCollection { { "@VisitDateTime-datetime", result.ToString() }, { "@Level1LevelId-int,", "NULL" }, { "@Level2LevelId-int,", "NULL" }, { "@Level3LevelId-int,", level3 }, { "@Level4LevelId-int,", level4 }, { "@Level5LevelId-int,", level5 }, { "@Level6LevelId-int,", level6 }, { "@ClassId-int,", classId }, { "@SpecialityId-int", specialityId }, { "@QulificationId-int,", qulificationId }, { "@CreationDateTime-datetime", DateTime.Now.ToString() }, { "@CallTypeId-int", "1" }, { "@VisitShift-int,", vt }, { "@DoctorId-bigint", doctorId }, { "@EmployeeId-bigint", employeeId }, { "@InboundId-bigint", "NULL" }, { "@DocCode-INT", doctorCode }, { "@IsPlanned-VARCHAR-50", isPlanned == "No" ? "NULL" : isPlanned }, { "@ActivityID-INT", "1" }, { "@ReasonID-INT", reason } });
                            if (dsPreSalesCalls != null)
                            {
                                if (dsPreSalesCalls.Tables[0].Rows.Count > 0)
                                {
                                    salesCallsId = Convert.ToInt64(dsPreSalesCalls.Tables[0].Rows[0]["SalesCallId"].ToString());
                                }
                                else
                                {
                                    returnString = "Error In Saving In PreSalesCalls";
                                    return returnString;
                                }
                            }
                            else
                            {
                                returnString = "Error In Saving In PreSalesCalls";
                                return returnString;
                            }
                        }
                    }
                    else
                    {
                        var dsPreSalesCalls = _dl.GetData("sp_PreSalesCallsInsert2", new NameValueCollection { { "@VisitDateTime-datetime", result.ToString() }, { "@Level1LevelId-int,", "NULL" }, { "@Level2LevelId-int,", "NULL" }, { "@Level3LevelId-int,", level3 }, { "@Level4LevelId-int,", level4 }, { "@Level5LevelId-int,", level5 }, { "@Level6LevelId-int,", level6 }, { "@ClassId-int,", classId }, { "@SpecialityId-int", specialityId }, { "@QulificationId-int,", qulificationId }, { "@CreationDateTime-datetime", DateTime.Now.ToString() }, { "@CallTypeId-int", "1" }, { "@VisitShift-int,", vt }, { "@DoctorId-bigint", doctorId }, { "@EmployeeId-bigint", employeeId }, { "@InboundId-bigint", "NULL" }, { "@DocCode-INT", doctorCode }, { "@IsPlanned-VARCHAR-50", isPlanned == "No" ? "NULL" : isPlanned }, { "@ActivityID-INT", "1" }, { "@ReasonID-INT", reason } });
                        if (dsPreSalesCalls != null)
                        {
                            if (dsPreSalesCalls.Tables[0].Rows.Count > 0)
                            {
                                salesCallsId = Convert.ToInt64(dsPreSalesCalls.Tables[0].Rows[0]["SalesCallId"].ToString());
                            }
                            else
                            {
                                returnString = "Error In Saving In PreSalesCalls";
                                return returnString;
                            }
                        }
                        else
                        {
                            returnString = "Error In Saving In PreSalesCalls";
                            return returnString;
                        }
                    }
                }
                #endregion


                #region CallDoctors


                // ReSharper disable once UnusedVariable
                if (_dataContext != null)
                {
                    var insertCallDoctors = _dataContext.sp_CallDoctorsInsert(salesCallsId, Convert.ToInt64(doctorId)).ToList();
                }

                #endregion

                #region CallVisitors

                if (!Convert.ToBoolean(coaching))
                {
                    // ReSharper disable once UnusedVariable
                    var dsIsCoaching = _dl.InserData("sp_InsertCallCoaching",
                        new NameValueCollection
                    {
                        {"@SalesCallId-INT", salesCallsId.ToString()},
                        {"@IsCoaching-VARCHAR-50", "0"}
                    });
                }
                else
                {
                    // ReSharper disable once UnusedVariable
                    var dsIsCoaching = _dl.InserData("sp_InsertCallCoaching",
                        new NameValueCollection
                    {
                        {"@SalesCallId-INT", salesCallsId.ToString()},
                        {"@IsCoaching-VARCHAR-50", "1"}
                    });
                }

                long jvflma = 0;
                long jvslma = 0;
                if (Convert.ToBoolean(jvflm))
                {
                    var dsFlm = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", employeeId } });
                    if (dsFlm != null)
                    {
                        if (dsFlm.Tables[0].Rows.Count > 0)
                        {
                            jvflma = Convert.ToInt64(dsFlm.Tables[0].Rows[0]["ManagerId"].ToString());
                        }
                    }
                }
                if (Convert.ToBoolean(jvslm))
                {
                    var dsFlm = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", employeeId } });
                    if (dsFlm != null)
                    {
                        if (dsFlm.Tables[0].Rows.Count > 0)
                        {
                            jvflma = Convert.ToInt64(dsFlm.Tables[0].Rows[0]["ManagerId"].ToString());
                            var dsSlm = _dl.GetData("sp_EmployeesSelect", new NameValueCollection { { "@EmployeeId-BIGINT", Convert.ToString(jvflma) } });
                            if (dsSlm != null)
                            {
                                if (dsSlm.Tables[0].Rows.Count > 0)
                                {
                                    // jvslma = Convert.ToInt64(dsFlm.Tables[0].Rows[0]["ManagerId"].ToString());
                                    jvslma = Convert.ToInt64(dsSlm.Tables[0].Rows[0]["ManagerId"].ToString());
                                }
                            }
                        }
                    }
                }

                // ReSharper disable once UnusedVariable
                if (_dataContext != null)
                {
                    /*if (jvflma == 0 && jvslma == 0)
                    {
                        var insertCallVisitor = _dataContext.sp_CalVisitorsInsertNew(salesCallsId, Convert.ToInt64(employeeId), null, null, null, null).ToList();
                    }
                    else
                    {
                        var insertCallVisitor = _dataContext.sp_CalVisitorsInsertNew(salesCallsId, Convert.ToInt64(employeeId), jvflma, jvslma, 0, 0).ToList();
                    }*/
                    if (jvflma == 0 && jvslma == 0)
                    {
                        var insertCallVisitor = _dataContext.sp_CalVisitorsInsertNew_withjv8(salesCallsId, Convert.ToInt64(employeeId), null, null, null, null, null, null, null, null).ToList();
                    }
                    else
                    {
                        var insertCallVisitor = _dataContext.sp_CalVisitorsInsertNew_withjv8(salesCallsId, Convert.ToInt64(employeeId), jvflma, jvslma, 0, 0, 0, 0, 0, 0).ToList();
                    }

                }

                #endregion

                #region VisitFeedBack

                if (_dataContext != null)
                {
                    // ReSharper disable once UnusedVariable
                    var insertFeedBack = _dataContext.sp_VisitFeedBackInsert(salesCallsId, callNotes).ToList();
                }

                #endregion

                #region CallProducts

                // ReSharper disable once NotAccessedVariable
                List<CallProduct> insertCallProduct;

                if (product1 != "-1")
                {
                    if (_dataContext != null)
                        // ReSharper disable once RedundantAssignment
                        insertCallProduct =
                            _dataContext.sp_CallProductsInsert(Convert.ToInt32(product1), salesCallsId, 0, Convert.ToInt32(product1), 1).ToList();
                }


                if (product2 != "-1")
                {
                    if (_dataContext != null)
                        // ReSharper disable once RedundantAssignment
                        insertCallProduct =
                            _dataContext.sp_CallProductsInsert(Convert.ToInt32(product2), salesCallsId, 0, Convert.ToInt32(product1), 2).ToList();
                }

                if (product3 != "-1")
                {
                    if (_dataContext != null)
                        // ReSharper disable once RedundantAssignment
                        insertCallProduct =
                            _dataContext.sp_CallProductsInsert(Convert.ToInt32(product3), salesCallsId, 0, Convert.ToInt32(product3), 3).ToList();
                }

                if (product4 != "-1")
                {
                    if (_dataContext != null)
                        // ReSharper disable once RedundantAssignment
                        insertCallProduct =
                            _dataContext.sp_CallProductsInsert(Convert.ToInt32(product4), salesCallsId, 0, Convert.ToInt32(product4), 4).ToList();
                }


                #endregion

                #region CallProductSamples

                // ReSharper disable once NotAccessedVariable
                //List<CallProductSample> insertCallProductSample;

                //if (sample1 != "-1" && sampleQty1 != "")
                //{
                //    // ReSharper disable once RedundantAssignment
                //    if (_dataContext != null)
                //        insertCallProductSample =
                //            _dataContext.sp_CallProductSamplesInsert(salesCallsId, Convert.ToInt32(sample1), Convert.ToInt32(sample1), Convert.ToInt32(sampleQty1), 1).ToList();
                //}


                //if (sample2 != "-1" && sampleQty2 != "")
                //{
                //    // ReSharper disable once RedundantAssignment
                //    if (_dataContext != null)
                //        insertCallProductSample =
                //            _dataContext.sp_CallProductSamplesInsert(salesCallsId, Convert.ToInt32(sample2), Convert.ToInt32(sample2), Convert.ToInt32(sampleQty2), 2).ToList();
                //}

                //if (sample3 != "-1" && sampleQty3 != "")
                //{
                //    // ReSharper disable once RedundantAssignment
                //    insertCallProductSample =
                //        _dataContext.sp_CallProductSamplesInsert(salesCallsId, Convert.ToInt32(sample3), Convert.ToInt32(sample3), Convert.ToInt32(sampleQty3), 3).ToList();
                //}

                #endregion

                #region CallGifts

                // ReSharper disable once NotAccessedVariable
                List<CallGift> insertCallGift;

                if (gift != "-1")
                {
                    // ReSharper disable once RedundantAssignment
                    insertCallGift = giftQty != "" ? _dataContext.sp_CallGiftsInsert(salesCallsId, Convert.ToInt32(gift), Convert.ToInt32(giftQty), 1).ToList() : _dataContext.sp_CallGiftsInsert(salesCallsId, Convert.ToInt32(gift), 0, 1).ToList();
                }


                #endregion


                #region Location
                if (longi != null)
                {
                    _nvCollection.Clear();
                    _nvCollection.Add("@salescallid-int", salesCallsId.ToString());
                    _nvCollection.Add("@long-varchar(100)", longi.ToString());
                    _nvCollection.Add("@lat-varchar(100)", lati.ToString());

                    var ch = _dl.GetData("sp_Insert_Location", _nvCollection);
                }

                #endregion

                returnString = "CallSaved";
            }
            catch (Exception exception)
            {
                returnString = "Message: " + exception.Message + " - StackTrace: " + exception.StackTrace;
            }

            return returnString;
        }

        private int DATEDIFF(string interval, DateTime visitdatetime, DateTime createdDatetime)
        {
            int daysdiff = 0;

            TimeSpan span = createdDatetime.Subtract(visitdatetime);
            daysdiff = span.Days;
            return daysdiff;

        }

        private double DATEDIFFForHours(string interval, DateTime visitdatetime, DateTime createdDatetime)
        {
            double daysdiff = 0;

            TimeSpan span = createdDatetime.Subtract(visitdatetime);
            daysdiff = span.TotalHours;
            return daysdiff;

        }

    }
}

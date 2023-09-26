using System;
using System.Linq;
using System.Web.Security;
using System.Web.UI.WebControls;
using PocketDCR.CustomMembershipProvider;
using DatabaseLayer.SQL;
using PocketDCR2.Classes;

namespace PocketDCR2.Form
{
    public partial class Login2 : System.Web.UI.Page
    {
        #region Private Members

        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;



        private bool IsValidUser()
        {
            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];
                return _currentUser != null;
            }
            catch (Exception exception)
            {
                laberror.Text = "While checking user, it shows " + exception.Message;
            }

            return false;
        }
        #endregion
        protected void Page_Load(object sender, EventArgs e)
        {
            _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        }

        protected void LoginButton_Click(object sender, EventArgs e)
        {

        }

        protected void Login1_LoggedIn(object sender, EventArgs e)
        {
            try
            {

                string UserID = "", EmployeeID = "", Role = "", GDDBID = "";

                //p.EmployeeCode
                //


                _currentUser = (SystemUser)Membership.GetUser(Login1.UserName, true);

                #region Passing Values To Sessions

                Session["SystemUser"] = _currentUser;

                if (_currentUser != null)
                {
                    Session["CurrentUserId"] = _currentUser.EmployeeId;

                    UserID = _currentUser.EmployeeId.ToString();
                    var empcode = _dataContext.sp_EmployeesSelect(Convert.ToInt64(_currentUser.EmployeeId)).ToList();

                    if (empcode.Count != 0)
                    {
                        if (empcode[0].EmployeeCode != null)
                        {
                            EmployeeID = empcode[0].EmployeeCode.ToString();
                        }
                    }

                    var getGDBID = _dataContext.sp_EmployeeGDBID(Convert.ToInt64(_currentUser.EmployeeId)).ToList();

                    if (getGDBID.Count != 0)
                    {
                        GDDBID = getGDBID[0].GDDBID.ToString();
                    }

                    var getLoginId = _dataContext.sp_EmployeesSelect(Convert.ToInt64(_currentUser.EmployeeId)).ToList();

                    if (getLoginId.Count != 0)
                    {
                        Session["CurrentUserLoginID"] = getLoginId[0].LoginId;
                    }

                    var roleId = _dataContext.sp_EmploeesInRolesSelect(null, Convert.ToInt64(_currentUser.EmployeeId)).ToList();

                    if (roleId.Count != 0)
                    {
                        var getRoleId = roleId[0].RoleId;

                        var getRole = _dataContext.sp_SystemRolesSelect(getRoleId).ToList();

                        if (getRole.Count != 0)
                        {
                            Session["CurrentUserRole"] = getRole[0].LoweredRoleName;


                            #region New Role Name for URL
                            switch (getRole[0].LoweredRoleName.ToString())
                            {
                                case "rl1":
                                    Role = "";
                                    break;
                                case "rl2":
                                    Role = "";
                                    break;
                                case "rl3":
                                    Role = "NSM";
                                    break;
                                case "rl4":
                                    Role = "RSM";
                                    break;
                                case "rl5":
                                    Role = "ZSM";
                                    break;
                                case "rl6":
                                    Role = "MIO";
                                    break;
                                case "admin":
                                    Role = "admin";
                                    break;
                                case "headoffice":
                                    Role = "HO";
                                    break;
                            #endregion

                            }


                        }
                    }
                }

                #endregion

                var getHierarchyLevel = _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                if (getHierarchyLevel.Count != 0)
                {
                    string hierarchyLevel = Convert.ToString(getHierarchyLevel[0].SettingName);
                    string roleType = Convert.ToString(Session["CurrentUserRole"]);

                    if (hierarchyLevel == "Level3")
                    {
                        if (roleType != "rl1" || roleType != "rl2")
                        {
                            #region Check If user login first time then redirect it to change password page else to default page

                            var getEmployeeId = _dataContext.sp_EmployeeSelectByCredential(Login1.UserName, null).ToList();

                            if (getEmployeeId.Count > 0)
                            {
                                long employeeId = Convert.ToInt64(getEmployeeId[0].EmployeeId);
                                var getMembershipDetail = _dataContext.sp_EmployeeMembershipUpdateFirstTime(employeeId, 3).ToList();

                                if (getMembershipDetail.Count > 0)
                                {
                                    var mobilePin = Convert.ToString(getMembershipDetail[0].MobilePIN);

                                    if (mobilePin == "FirstTime")
                                    {
                                        var updateMembershipDetail = _dataContext.sp_EmployeeMembershipUpdateFirstTime(employeeId, 2).ToList();
                                        Response.Redirect("ChangePassword.aspx");
                                    }

                                    else
                                    {
                                        // Response.Redirect("MRPlan.aspx");
                                        switch (roleType)
                                        {
                                            case "depotteam":
                                                Response.Redirect("../Form/D_distributionview.aspx");
                                                break;
                                            case "rl6":
                                                Response.Redirect("../Form/SchdulerDayView.aspx");
                                                break;
                                            default:
                                                {
                                                    string dasUrl = "http://mycrm.com.pk/CrmDashboard/default.aspx?UserID=" + Server.UrlEncode(UserID) + "&EmployeeID=" + Server.UrlEncode(EmployeeID) + "&Role=" + Server.UrlEncode(Role) + "&GDDBID=" + Server.UrlEncode(GDDBID);
                                                    Session["newurl"] = dasUrl.Trim();
                                                    Response.Redirect("../Reports/MobileDashboard.aspx");
                                                }
                                                break;
                                        }
                                    }
                                }
                                else
                                {
                                    laberror.Text = "Error";
                                }
                            }

                            #endregion
                        }

                    }
                }
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        protected void Login1_LoggingIn(object sender, LoginCancelEventArgs e)
        {
            _currentUser = (SystemUser)Membership.GetUser(Login1.UserName, true);

            var isvalidUser = (from p in _dataContext.Employees
                               where p.LoginId == Login1.UserName
                               where p.IsActive == true
                               select p).FirstOrDefault();
            if (isvalidUser != null)
            {
                if (!Membership.ValidateUser(Login1.UserName, Login1.Password))
                {
                    laberror.Text = "The username or password you entered is incorrect.";
                }
            }
            else
            {
                laberror.Text = "The username is not active. Contact Administrator for more information.";
            }
        }

        protected void Login_Authenticate(object sender, AuthenticateEventArgs e)
        {

        }
    }
   
}
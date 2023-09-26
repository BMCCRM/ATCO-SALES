using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace PocketDCR2.Form
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]

    public class LeaveApproval1 : System.Web.Services.WebService
    {

        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        List<v_EmployeeWithRole> Emphr;
        readonly DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        private static SystemUser _currentUser;

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetLeaveApproval(string Level1Id, string Level2Id, string Level3Id, string Level4Id, string Level5Id, string Level6Id, string TeamID, string Role, string monthofrequest, string Status)
        {
            string result = string.Empty;
            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];
                DateTime dat = DateTime.Parse(monthofrequest, System.Globalization.CultureInfo.InvariantCulture);

                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-int", Level1Id.ToString());
                _nvCollection.Add("@Level2Id-int", Level2Id.ToString());
                _nvCollection.Add("@Level3Id-int", Level3Id.ToString());
                _nvCollection.Add("@Level4Id-int", Level4Id.ToString());
                _nvCollection.Add("@Level5Id-int", Level5Id.ToString());
                _nvCollection.Add("@Level6Id-int", Level6Id.ToString());
                _nvCollection.Add("@monthofrequest-varchar(250)", dat.ToString());
                _nvCollection.Add("@CurrentUserEmployeeId-INT", _currentUser.EmployeeId.ToString());
                _nvCollection.Add("@TeamID-INT", TeamID.ToString());
                _nvCollection.Add("@Userrole-varchar(50)", Role.ToString());
                _nvCollection.Add("@Status-varchar(30)", Status.ToString());
                var data = dl.GetData("sp_GetDetailLeaveApproval", _nvCollection);
                if (data.Tables[0].Rows.Count > 0)
                {
                    return data.Tables[0].ToJsonString();
                }
                else
                {
                    result = "No";
                }

            }
            catch (NullReferenceException ex)
            {
                result = ex.Message;
            }

            return result;

        }

        [WebMethod(EnableSession = true)]
        public string IsValidUser()
        {
            try
            {
                if (Session["SystemUser"] != null)
                {
                    _currentUser = (SystemUser)Session["SystemUser"];
                    return "true";
                }

            }
            catch (Exception exception)
            {

            }
            return "false";
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
        public List<v_EmployeeWithRole> getemployeeHR(int employeeid)
        {
            Emphr = _dataContext.EmployeeWith_Hierarchy(employeeid).ToList();

            return Emphr;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string allPostApproval(string in_ids,string Status)
        {
            string retrunstr = string.Empty;
            DataSet result = new DataSet();
            try
            {
                string role = Context.Session["CurrentUserRole"].ToString();
                string EmployeeID = Session["CurrentUserId"].ToString();
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@SystemUserID-BIGINT", EmployeeID.ToString());
                DataSet getEmployeeHierarchy = dl.GetData("sp_EmployeeHierarchySelect", _nvCollection);
                
                nv.Clear();
                nv.Add("@ID-int", in_ids);
                nv.Add("@CurrentUserRole-varchar(50)", role);
                nv.Add("@ApprovedByEmp-int", EmployeeID.ToString());
                nv.Add("@ApprovedStatus-int", Status.ToString());
                result = dl.GetData("sp_UpdateLeaveApproval", nv);
            }
            catch (NullReferenceException ex)
            {
                retrunstr = ex.Message;
            }

            return retrunstr = result.Tables[0].ToJsonString();

        }

    }
}

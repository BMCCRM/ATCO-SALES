using DatabaseLayer.SQL;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace PocketDCR2.Reports
{
    /// <summary>
    /// Summary description for SpotCheck
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SpotCheck : System.Web.Services.WebService
    {

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        NameValueCollection _nv = new NameValueCollection();
        DAL dal = new DAL();


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDataInGridSpotCheck(string mio,string rType)
        {
            string result = string.Empty;
            
            //var ManagerId = Session["CurrentUserId"].ToString();
            //var Date = Convert.ToDateTime(docdate);
            try
            {
                _nv.Clear();
                _nv.Add("@empid-int", mio);
                _nv.Add("@rType-nvarchar(250)", rType);
                var data = dal.GetData("sp_SpotCheckDetails", _nv);
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
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertFeedback(string cDate, string Medid, string Medrep, string rType, string lastdoc, string nextdoc, string location, string ddljv)
        {
            string result = string.Empty;
            //var ManagerId = Session["CurrentUserId"].ToString();
            //var Date = Convert.ToDateTime(docdate);
           

            try
            {
                _nv.Clear();
                var CreateDate = DateTime.Now.ToString();
                DateTime MyDateTime = DateTime.ParseExact(cDate, "yyyy-MM-dd", null);

                //_nv.Add("@Date-datetime", MyDateTime.ToString());
                _nv.Add("@EmployeeID-int", Medid.ToString());
                _nv.Add("@RollType-nvarchar(250)", rType.ToString());
                _nv.Add("@CheckDate-datetime", MyDateTime.ToString());
                _nv.Add("@RepresentativeName-nvarchar(20)", Medrep.ToString());
                _nv.Add("@LastDrVisitID-int", lastdoc.ToString());
                _nv.Add("@NextDrVisitID-int", nextdoc.ToString());
                _nv.Add("@LocationPerPlan-varchar(10)", location.ToString());
                _nv.Add("@JointVisit-varchar(10)", ddljv.ToString());
                _nv.Add("@CreateDateTime-datetime", CreateDate.ToString());
        

                var insertProduct = dal.InserData("sp_SpotCheckInsert", _nv);
                if (insertProduct)
                {
                    result = "OK";
                }
                else
                {
                    result = "No";
                }

            }
            catch (Exception e)
            {
                result = e.Message;

            }
            return result;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Edit(int ID)
        {
            var result = "";
            try
            {
                _nv.Clear();
                _nv.Add("@ID-INT", ID.ToString());
                var ds = dal.GetData("sp_SpotCheckEditID", _nv);
                if (ds != null)
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        result = ds.Tables[0].ToJsonString();
                    }
            }
            catch (Exception exception)
            {
                result = exception.Message;
            }

            return result;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Update(string cDate, string Medrep, string lastdoc, string nextdoc, string location, string ddljv, int id)
        {
            string result = string.Empty;
            var ManagerId = "1";
            try
            {

                #region Update
                try
                {
                    _nv.Clear();
                    var UpdateDate = DateTime.Now.ToString();
                    DateTime MyDateTime = DateTime.ParseExact(cDate, "yyyy-MM-dd", null);

                    _nv.Add("@ID-datetime", id.ToString());
                    _nv.Add("@EmployeeID-int", ManagerId);
                    _nv.Add("@CheckDate-datetime", MyDateTime.ToString());
                    _nv.Add("@RepresentativeName-nvarchar(20)", Medrep.ToString());
                    _nv.Add("@LastDrVisitID-int", lastdoc.ToString());
                    _nv.Add("@NextDrVisitID-int", nextdoc.ToString());
                    _nv.Add("@LocationPerPlan-varchar(10)", location.ToString());
                    _nv.Add("@JointVisit-varchar(10)", ddljv.ToString());
                    _nv.Add("@UpdateDateTime-datetime", UpdateDate.ToString());

              
                    var insertProduct = dal.InserData("sp_SpotCheckUpdate", _nv);
                    if (insertProduct)
                    {
                        result = "OK";
                    }
                    else
                    {
                        result = "No";
                    }
                }

                catch (Exception e)
                {
                    result = e.Message;

                }

                #endregion
            }
            catch (Exception e)
            {
                result = e.Message;
            }

            return result;
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Delete(int id)
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                _nv.Add("@id-int", id.ToString());
                var ds = dal.GetData("sp_SpotCheckDelete", _nv);

                returnString = "OK";
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
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmpBricks(string empid)
        { 
            string returnString = "";

            try
            {
                _nv.Clear();
                _nv.Add("@empid-int", empid.ToString());
                var ds = dal.GetData("sp_getempBricks", _nv);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    return ds.Tables[0].ToJsonString();
                }
                else
                {
                    returnString = "No";
                }
            }
            catch (Exception ex)
            {
                returnString = ex.Message;
            }
            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmployeeLocations(string Empid)
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                _nv.Add("@empid-int", Empid.ToString());
                var ds = dal.GetData("sp_GetempDocLocations", _nv);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    return ds.Tables[0].ToJsonString();
                }
                else
                {
                    returnString = "No";
                }
            }
            catch (Exception ex)
            {
                returnString = ex.Message;
            }
            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetZsmLocations(string Empid)
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                _nv.Add("@empid-int", Empid.ToString());
                var ds = dal.GetData("sp_GetzsmLocations", _nv);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    return ds.Tables[0].ToJsonString();
                }
                else
                {
                    returnString = "No";
                }
            }
            catch (Exception ex)
            {
                returnString = ex.Message;
            }
            return returnString;
        }

    }
}

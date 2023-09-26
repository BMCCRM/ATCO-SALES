using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for SalesDistributorService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SalesDistributorService : System.Web.Services.WebService
    {

        #region Public Member

        JavaScriptSerializer _jss = new JavaScriptSerializer();
        NameValueCollection _nv = new NameValueCollection();
        DAL dal = new DAL();

        #endregion

        #region Public Methods
        //GetAllDistributorDetails
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllSalesDistributor()
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                var data = dal.GetData("GetAllDistributorDetails", null);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllDistType()
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                var data = dal.GetData("sp_GetDistType", null);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertSalesDistributor(string CityID, string DistributorCode, string DistributorName, bool isActive, string DistributorType,
            string Address, string PhoneNo, string EmailAddress1, string EmailAddress2, string OwnerName, string OwnerMobile, string ContactPersonName,
            string ContactPersonMobile, string TotalNoofStaff, string DistSoftname, string ProgrammerName, string ContactPersonDesg,
            string DistClient, string DrugSalesLicenseNo, string Holiday)
        {
            string returnString = "";

            try
            {

                #region Validate Name
                _nv.Clear();
                _nv.Add("@Distributor-int", DistributorCode.ToString());
                var data = dal.GetData("sp_SalesDistributorCheck", _nv);

                #endregion

                if (data.Tables[0].Rows.Count != 0)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    _nv.Clear();
                    _nv.Add("@CityID-int", CityID.ToString());
                    _nv.Add("@Distributor-int", DistributorCode.ToString());
                    _nv.Add("@DistributorName-varchar(max)", DistributorName.ToString());
                    _nv.Add("@IsActive-bit", isActive.ToString());
                    _nv.Add("@DistributorType-int", DistributorType.ToString());
                    //Other Details
                    _nv.Add("@Address-nvarchar(max)", Address.ToString());
                    _nv.Add("@PhoneNo-nvarchar(max)", PhoneNo.ToString());
                    _nv.Add("@EmailAddress1-nvarchar(max)", EmailAddress1.ToString());
                    _nv.Add("@EmailAddress2-nvarchar(max)", EmailAddress2.ToString());
                    _nv.Add("@OwnerName-nvarchar(max)", OwnerName.ToString());
                    _nv.Add("@OwnerMobile-nvarchar(max)", OwnerMobile.ToString());
                    _nv.Add("@ContactPersonName-nvarchar(max)", ContactPersonName.ToString());
                    _nv.Add("@ContactPersonMobile-nvarchar(max)", ContactPersonMobile.ToString());
                    _nv.Add("@TotalNoofStaff-nvarchar(max)", TotalNoofStaff.ToString());
                    _nv.Add("@DistSoftname-nvarchar(max)", DistSoftname.ToString());
                    _nv.Add("@ProgrammerName-nvarchar(max)", ProgrammerName.ToString());
                    _nv.Add("@ContactPersonDesg-nvarchar(max)", ContactPersonDesg.ToString());
                    _nv.Add("@DistClient-nvarchar(max)", DistClient.ToString());
                    _nv.Add("@DrugSalesLicenseNo-nvarchar(max)", DrugSalesLicenseNo.ToString());
                    _nv.Add("@Holiday-nvarchar(max)", Holiday.ToString());
                    //dal.InserData("sp_SalesDistributorInsert", _nv);
                    var result = dal.GetData("sp_SalesDistributorInsert", _nv);
                    var data1 = result.Tables[0].Rows[0][0].ToString();
                    if (data1 == "1")
                    {
                        returnString = "error";
                    }
                    else
                    {
                        returnString = "OK";
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
        public string GetSalesDistributor(int ID)
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                _nv.Add("@ID-int", ID.ToString());
                var data = dal.GetData("sp_SalesDistributorSelect", _nv);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateSalesDistributor(int ID, string CityID, string DistributorCode, string DistributorName, bool isActive, string DistributorType,
                   string Address, string PhoneNo, string EmailAddress1, string EmailAddress2, string OwnerName, string OwnerMobile, string ContactPersonName,
            string ContactPersonMobile, string TotalNoofStaff, string DistSoftname, string ProgrammerName, string ContactPersonDesg,
            string DistClient, string DrugSalesLicenseNo, string Holiday)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                _nv.Clear();
                _nv.Add("@Distributor-int", DistributorCode.ToString());
                var data = dal.GetData("sp_SalesDistributorCheck", _nv);

                #endregion

                if (data.Tables[0].Rows.Count != 0)
                {
                    if (data.Tables[0].Rows[0][0].ToString() != ID.ToString())
                    {
                        return "Duplicate Name!";
                    }

                }

                _nv.Clear();
                _nv.Add("@ID-int", ID.ToString());
                _nv.Add("@CityID-int", CityID.ToString());
                _nv.Add("@Distributor-int", DistributorCode.ToString());
                _nv.Add("@DistributorName-varchar(max)", DistributorName.ToString());
                _nv.Add("@IsActive-bit", isActive.ToString());
                _nv.Add("@DistributorType-int", DistributorType.ToString());
                //Other Details
                _nv.Add("@Address-nvarchar(max)", Address.ToString());
                _nv.Add("@PhoneNo-nvarchar(max)", PhoneNo.ToString());
                _nv.Add("@EmailAddress1-nvarchar(max)", EmailAddress1.ToString());
                _nv.Add("@EmailAddress2-nvarchar(max)", EmailAddress2.ToString());
                _nv.Add("@OwnerName-nvarchar(max)", OwnerName.ToString());
                _nv.Add("@OwnerMobile-nvarchar(max)", OwnerMobile.ToString());
                _nv.Add("@ContactPersonName-nvarchar(max)", ContactPersonName.ToString());
                _nv.Add("@ContactPersonMobile-nvarchar(max)", ContactPersonMobile.ToString());
                _nv.Add("@TotalNoofStaff-nvarchar(max)", TotalNoofStaff.ToString());
                _nv.Add("@DistSoftname-nvarchar(max)", DistSoftname.ToString());
                _nv.Add("@ProgrammerName-nvarchar(max)", ProgrammerName.ToString());
                _nv.Add("@ContactPersonDesg-nvarchar(max)", ContactPersonDesg.ToString());
                _nv.Add("@DistClient-nvarchar(max)", DistClient.ToString());
                _nv.Add("@DrugSalesLicenseNo-nvarchar(max)", DrugSalesLicenseNo.ToString());
                _nv.Add("@Holiday-nvarchar(max)", Holiday.ToString());
                var result = dal.GetData("sp_SalesDistributorUpdate", _nv);
                var data1 = result.Tables[0].Rows[0][0].ToString();
                if (data1 == "1")
                {
                    returnString = "error";
                }
                else
                {
                    returnString = "OK";
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
        public string UpdateSalesDistributorAllow(int ID, string CityID, string DistributorCode, string DistributorName, string AllowsDays)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                _nv.Clear();
                _nv.Add("@Distributor-int", DistributorCode.ToString());
                var data = dal.GetData("sp_SalesDistributorCheck", _nv);

                #endregion

                if (data.Tables[0].Rows.Count != 0)
                {
                    if (data.Tables[0].Rows[0][0].ToString() != ID.ToString())
                    {
                        return "Duplicate Name!";
                    }

                }

                _nv.Clear();
                _nv.Add("@ID-int", ID.ToString());
                _nv.Add("@CityID-int", CityID.ToString());
                _nv.Add("@Distributor-int", DistributorCode.ToString());
                _nv.Add("@DistributorName-varchar(max)", DistributorName.ToString());
                _nv.Add("@IsAllowDays-int", AllowsDays.ToString());
                var result = dal.GetData("sp_SalesDistributorAllow", _nv);
                var data1 = result.Tables[0].Rows[0][0].ToString();
                if (data1 == "1")
                {
                    returnString = "error";
                }
                else
                {
                    returnString = "OK";
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
        public string GetAllSalesDistributorByDate(string date)
        {
            string returnString = "";
            int year = 0, month = 0;

            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nv.Clear();
                _nv.Add("@Month-int", Convert.ToString(month));
                _nv.Add("@Year-int", Convert.ToString(year));
                var data = dal.GetData("sp_GetAllDistributorDetailsByDate", _nv);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteSalesDistributor(int ID)
        {

            string returnString = "";
            try
            {
                _nv.Clear();
                _nv.Add("@ID-int", ID.ToString());
                var data = dal.InserData("sp_SalesDistributorDelete", _nv);
                returnString = "OK";
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }


            return returnString;

        }

        //getcity getdistrict  getsubregion getregion
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllRegion()
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                var data = dal.GetData("getregion", null);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }




        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetBrickTypes()
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                var data = dal.GetData("sp_GetBrickTypes", null);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }











        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllSubRegion(int ID)
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                _nv.Add("@id-int", ID.ToString());
                var data = dal.GetData("getsubregion", _nv);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllDistrict(int ID)
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                _nv.Add("@id-int", ID.ToString());
                var data = dal.GetData("getdistrict", _nv);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllCity(int ID)
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                _nv.Add("@id-int", ID.ToString());
                var data = dal.GetData("getcity", _nv);
                returnString = data.Tables[0].ToJsonString();
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

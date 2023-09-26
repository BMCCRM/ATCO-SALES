using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for DoctorBrickAndCityAlignment1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class DoctorBrickAndCityAlignment1 : System.Web.Services.WebService
    {
        NameValueCollection _nv = new NameValueCollection();
        DAL _dl = new DAL();

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllDoctor_BrickAndCitySwitch(string DistributorID)            //string CityID, string BrickID, string SpecialityID, string DesignationID)
        {
            string returnString = "";
            try
            {
                _nv.Clear();
                //_nv.Add("@CityID-int", CityID.ToString());
                _nv.Add("@DistributorID-int", DistributorID.ToString());
                //_nv.Add("@BrickID-int", BrickID.ToString());
                DataSet ds = _dl.GetData("Sp_GetAllDoctor_BrickAndCitySwitch", _nv);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
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
        public string GetAllDoctor_BrickAndCitySwitchIn_ProcessData()//string CityID, string DistributorID, string BrickID, string SpecialityID, string DesignationID
        {
            string returnString = "";
            try
            {
                _nv.Clear();
                //_nv.Add("@CityID-int", CityID.ToString());
                //_nv.Add("@DistributorID-int", DistributorID.ToString());
                //_nv.Add("@BrickID-int", BrickID.ToString());
                DataSet ds = _dl.GetData("Sp_GetAllDoctor_BrickAndCitySwitchIn_ProcessData", _nv);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
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
        public string InsertDoctorBrickAndCity(string DoctorID, string CityID, string DistributorID, string BrickID, string SpecialityID, string DesignationID, string QualificationID, string Address)
        {
            string returnString = "";
            try
            {
                _nv.Clear();
                _nv.Add("@DoctorID-int", DoctorID.ToString());
                _nv.Add("@CityID-int", CityID.ToString());
                _nv.Add("@BrickID-int", BrickID.ToString());
                _nv.Add("@DistributorID-int", DistributorID.ToString());
                _nv.Add("@SpecialityID-int", SpecialityID.ToString());
                _nv.Add("@DesignationID-int", DesignationID.ToString());
                _nv.Add("@QualificationID-int", QualificationID.ToString());
                _nv.Add("@Address-Nvarchar(250)", Address.ToString());
                DataSet ds = _dl.GetData("Sp_InsertDoctorBrickAndCity", _nv);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
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
        public string UpdateDoctorBrickAndCityInProcessData(string PK_ID, string DoctorID, string CityID, string BrickID, string DistributorID, string SpecialityID, string DesignationID, string QualificationID, string Address)
        {
            string returnString = "";
            try
            {
                _nv.Clear();
                _nv.Add("@PK_ID-int", PK_ID.ToString());
                _nv.Add("@DoctorID-int", DoctorID.ToString());
                _nv.Add("@CityID-int", CityID.ToString());
                _nv.Add("@DistributorID-int", DistributorID.ToString());
                _nv.Add("@BrickID-int", BrickID.ToString());
                _nv.Add("@SpecialityID-int", SpecialityID.ToString());
                _nv.Add("@DesignationID-int", DesignationID.ToString());
                _nv.Add("@QualificationID-int", QualificationID.ToString());
                _nv.Add("@Address-Nvarchar(250)", Address.ToString());
                DataSet ds = _dl.GetData("Sp_UpdateDoctorBrickAndCity", _nv);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
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
        public string DeleteDoctorBrickAndCityInProcessData(string PK_ID)
        {
            string returnString = "";
            try
            {
                _nv.Clear();
                _nv.Add("@PK_ID-int", PK_ID.ToString());
                DataSet ds = _dl.GetData("Sp_DeleteDoctorBrickAndCity", _nv);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
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
        public string GetAllCity()
        {
            string returnString = "";
            try
            {
                _nv.Clear();
                DataSet ds = _dl.GetData("SP_GetAllMasterCity", _nv);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        //[WebMethod(EnableSession = true)]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string GetSalesDistributor(String ID)
        //{
        //    string returnString = "";
        //    try
        //    {

        //        _nv.Clear();
        //        _nv.Add("@ID-int", ID.ToString());
        //        DataSet ds = _dl.GetData("sp_GetDistributorbyIds", _nv);

        //        if (ds.Tables[0].Rows.Count > 0)
        //        {
        //            returnString = ds.Tables[0].ToJsonString();
        //        }
        //    }
        //    catch (Exception exception)
        //    {
        //        returnString = exception.Message;
        //    }
        //    return returnString;
        //}

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetSalesDistributor()
        {
            string returnString = "";
            try
            {

                _nv.Clear();
                DataSet ds = _dl.GetData("GetAllDistributor", _nv);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
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
        public string GetSalesBricksUpdate()
        {
            string returnString = "";
            try
            {
                _nv.Clear();
                DataSet ds = _dl.GetData("sp_getallBrick_New", _nv);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
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
        public string GetSalesBricks(String ID)
        {
            string returnString = "";
            try
            {
                _nv.Clear();
                _nv.Add("@empID-int", ID.ToString());
                DataSet ds = _dl.GetData("sp_GetAllDistSalesBricksbyIds", _nv);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
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
        public string GetBricksCity(string singleBrick)
        {
            string returnString = "";
            try
            {
                _nv.Clear();
                _nv.Add("@ID-varchar(250)", singleBrick.ToString());

                DataSet ds = _dl.GetData("sp_SelectOneBricks_ForBricksAndDistributor", _nv);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
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
        public string GetSpeciality()
        {
            string returnString = "";
            try
            {
                _nv.Clear();
                _nv.Add("@SpecialityId-int", "");
                _nv.Add("@SpecialityName-nvarchar(100)", "");
                DataSet ds = _dl.GetData("sp_SpecialitySelect", _nv);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
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
        public string GetDesignation()
        {
            string returnString = "";
            try
            {
                _nv.Clear();
                _nv.Add("@DesignationId-int", "");
                _nv.Add("@DesignationName-nvarchar(100)", "");
                DataSet ds = _dl.GetData("sp_DoctorsDesignationSelect", _nv);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
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
        public string GetQualification()
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                _nv.Add("@QulificationId-int", "");
                DataSet ds = _dl.GetData("sp_DoctorQulificationSelectActive", _nv);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }
    }
}

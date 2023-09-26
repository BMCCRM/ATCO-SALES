using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for LocationSetup1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class LocationSetup1 : System.Web.Services.WebService
    {


        #region Public Member

        JavaScriptSerializer _jss = new JavaScriptSerializer();
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        #endregion

        #region web Method
        [WebMethod]
        public string InsertLocaltionHierarchy(string regionLevelName, string regionLevelDescription)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@RegionName-nvarchar(50)", regionLevelName.ToString());
                var data = dl.GetData("sp_HierarchyLevelSelectRegionWithRegionName", nv);

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count == 0)
                    {
                        nv.Clear();
                        nv.Add("@regionLevelName-nvarchar(50)", regionLevelName.ToString());
                        nv.Add("@regionLevelDescription-nvarchar(MAX)", regionLevelDescription.ToString());
                        var dataInsert = dl.InserData("sp_insertLocaltionHierarchy", nv);
                        returnString = "Ok";
                    }
                    else
                    {
                        returnString = "alreadyExist";
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
        public string InsertSubRegionLocaltionHierarchy(string subRegionLevelName, string subRegionLevelDescription, int regionId)
        {
            string returnString = "";
            try
            {
                nv.Clear();
                nv.Add("@SubRegionName-nvarchar(50)", subRegionLevelName.ToString());
                var data = dl.GetData("sp_HierarchyLevelSelectSubRegionWithSubRegionName", nv);

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count == 0)
                    {
                        nv.Clear();
                        nv.Add("@subRegionLevelName-nvarchar(50)", subRegionLevelName.ToString());
                        nv.Add("@subRegionLevelDescription-nvarchar(MAX)", subRegionLevelDescription.ToString());
                        nv.Add("@regionId-int", regionId.ToString());
                        var dataInsert = dl.InserData("sp_insertSubRegionLocaltionHierarchy", nv);
                        returnString = "Ok";
                    }
                    else
                    {
                        returnString = "alreadyExist";
                    }
                }
            }
            catch (Exception exception)
            {
                return returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string InsertDistrictLocaltionHierarchy(string DistrictLevelName, string DistrictLevelDescription, string subRegionId, string Mso, string areaManager, string salesManager, string RTL)
        {

            string returnString = "";
            try
            {
                nv.Clear();
                nv.Add("@DistrictName-nvarchar(50)", DistrictLevelName.ToString());
                var data = dl.GetData("sp_HierarchyLevelSelectDistrictWithDistrictName", nv);

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count == 0)
                    {
                        nv.Clear();
                        nv.Add("@DistrictLevelName-nvarchar(50)", DistrictLevelName.ToString());
                        nv.Add("@DistrictLevelDescription-nvarchar(MAX)", DistrictLevelDescription.ToString());
                        nv.Add("@subRegionId-int", subRegionId.ToString());
                        nv.Add("@Mso-varchar(50)", Mso.ToString());
                        nv.Add("@areaManager-varchar(50)", areaManager.ToString());
                        nv.Add("@salesManager-varchar(50)", salesManager.ToString());
                        nv.Add("@RTL-varchar(50)", RTL.ToString());
                        var dataInsert = dl.InserData("sp_insertDistrictLocaltionHierarchy", nv);
                        returnString = "Ok";
                    }
                    else
                    {
                        returnString = "alreadyExist";
                    }
                }
            }
            catch (Exception exception)
            {
                return returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string InsertCityLocaltionHierarchy(string City, string city_NDD_Code, string isBigCityDialyAllowance, string DistrictID)
        {

            string returnString = "";
            try
            {
                nv.Clear();
                nv.Add("@CityName-nvarchar(50)", City.ToString());
                var data = dl.GetData("sp_HierarchyLevelSelectCityWithCityName", nv);
                if (data.Tables[0].Rows.Count == 0)
                {
                    nv.Clear();
                    nv.Add("@City-nvarchar(250)", City.ToString());
                    nv.Add("@City_NDD_Code-nvarchar(50)", city_NDD_Code.ToString());
                    nv.Add("@isBigCityDialyAllowance-bit", isBigCityDialyAllowance.ToString());
                    nv.Add("@DistrictID-int", DistrictID.ToString());
                    var dataInsert = dl.InserData("sp_insertCityLocaltionHierarchy", nv);
                    returnString = "Ok";
                }
                else
                {
                    returnString = "alreadyExist";
                }

            }
            catch (Exception exception)
            {
                return returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string FillDropDownList(string levelName)
        {
            string returnString = "";

            try
            {
                if (levelName.ToString() == "level1")
                {
                    nv.Clear();
                    nv.Add("@Id-int", "0");
                    nv.Add("@RegionName-nvarchar(50)", "");
                    var data = dl.GetData("sp_HierarchyLevelSelectRegion", nv);
                    returnString = data.Tables[0].ToJsonString();
                }



            }
            catch (Exception exception)
            {
                return returnString = exception.Message;
            }
            return returnString;
        }

        [WebMethod]
        public string GetHierarchyLevel(int levelId, string levelName)
        {
            string returnString = "";

            try
            {
                if (levelName == "Level1")
                {
                    #region Level1

                    nv.Clear();
                    nv.Add("@Id-int", "0");
                    nv.Add("@RegionName-nvarchar(50)", "");
                    var data = dl.GetData("sp_HierarchyLevelSelectRegion", nv);
                    returnString = data.Tables[0].ToJsonString();

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
        public string ShowCurrentLevel(int parentLevelId, string levelName)
        {
            string returnString = "";
            try
            {

                if (levelName == "level1")
                {
                    if (parentLevelId == 0)
                    {

                        nv.Clear();
                        nv.Add("@Id-int", "0");
                        nv.Add("@RegionName-nvarchar(50)", "");
                        var data = dl.GetData("sp_HierarchyLevelSelectRegion", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                    else
                    {
                        nv.Clear();
                        nv.Add("@RegionId-int", parentLevelId.ToString());
                        var data = dl.GetData("sp_HierarchyLevelSelectRegion", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                }
                else if (levelName == "level2")
                {
                    if (parentLevelId == 0)
                    {

                        nv.Clear();
                        nv.Add("@RegionId-int", "0");
                        var data = dl.GetData("sp_HierarchyLevelSelectSubRegion", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                    else
                    {
                        nv.Clear();
                        nv.Add("@RegionId-int", parentLevelId.ToString());
                        var data = dl.GetData("sp_HierarchyLevelSelectSubRegion", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                }

                else if (levelName == "level3")
                {
                    if (parentLevelId == 0)
                    {

                        nv.Clear();
                        nv.Add("@RegionId-int", "0");
                        var data = dl.GetData("sp_HierarchyLevelSelectSubRegion", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                    else
                    {
                        nv.Clear();
                        nv.Add("@RegionId-int", parentLevelId.ToString());
                        var data = dl.GetData("sp_HierarchyLevelSelectSubRegion", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                }
                else if (levelName == "level4")
                {
                    if (parentLevelId == 0)
                    {

                        nv.Clear();
                        nv.Add("@subRegionID-int", "0");
                        var data = dl.GetData("sp_HierarchyLevelSelectDistrict", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                    else
                    {
                        nv.Clear();
                        nv.Add("@RegionId-int", parentLevelId.ToString());
                        var data = dl.GetData("sp_HierarchyLevelSelectSubRegion", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                }
                else if (levelName == "level5")
                {
                    if (parentLevelId == 0)
                    {

                        nv.Clear();
                        nv.Add("@subRegionID-int", "0");
                        var data = dl.GetData("sp_HierarchyLevelSelectDistrict", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                    else
                    {
                        nv.Clear();
                        nv.Add("@subRegionID-int", parentLevelId.ToString());
                        var data = dl.GetData("sp_HierarchyLevelSelectDistrict", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                }
                else if (levelName == "level6")
                {
                    if (parentLevelId == 0)
                    {

                        nv.Clear();
                        nv.Add("@subRegionID-int", "0");
                        var data = dl.GetData("sp_HierarchyLevelSelectDistrict", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                    else
                    {
                        nv.Clear();
                        nv.Add("@subRegionID-int", parentLevelId.ToString());
                        var data = dl.GetData("sp_HierarchyLevelSelectDistrict", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                }
                else if (levelName == "level7")
                {
                    if (parentLevelId == 0)
                    {

                        nv.Clear();
                        nv.Add("@DistrictID-int", "0");
                        var data = dl.GetData("sp_HierarchyLevelSelectCities", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                    else
                    {
                        nv.Clear();
                        nv.Add("@DistrictID-int", parentLevelId.ToString());
                        var data = dl.GetData("sp_HierarchyLevelSelectCities", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {
                return returnString = exception.Message;
            }
            return returnString;




        }

        [WebMethod]
        public string getDataForEditRegion(int parentLevelId, string levelName)
        {
            string returnString = "";

            try
            {

                if (levelName == "level1")
                {
                    if (parentLevelId == 0)
                    {
                        nv.Clear();
                        nv.Add("@Id-int", "0");
                        nv.Add("@RegionName-nvarchar(50)", "");
                        var data = dl.GetData("sp_HierarchyLevelSelectRegion", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                    else
                    {
                        nv.Clear();
                        nv.Add("@Id-int", parentLevelId.ToString());
                        nv.Add("@RegionName-nvarchar(50)", "");
                        var data = dl.GetData("sp_HierarchyLevelSelectRegion", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                }
                else if (levelName == "level2")
                {
                    if (parentLevelId == 0)
                    {

                        nv.Clear();
                        nv.Add("@subRegionID-int", "0");
                        var data = dl.GetData("sp_HierarchyLevelSelectEditSubRegion", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                    else
                    {
                        nv.Clear();
                        nv.Add("@subRegionID-int", parentLevelId.ToString());
                        var data = dl.GetData("sp_HierarchyLevelSelectEditSubRegion", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                }
                else if (levelName == "level3")
                {
                    if (parentLevelId == 0)
                    {

                        nv.Clear();
                        nv.Add("@DistrictID-int", "0");
                        var data = dl.GetData("sp_HierarchyLevelSelectEditDistrict", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                    else
                    {
                        nv.Clear();
                        nv.Add("@DistrictID-int", parentLevelId.ToString());
                        var data = dl.GetData("sp_HierarchyLevelSelectEditDistrict", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                }
                else if (levelName == "level4")
                {
                    if (parentLevelId == 0)
                    {

                        nv.Clear();
                        nv.Add("@CityId-int", "0");
                        var data = dl.GetData("sp_HierarchyLevelSelectEditCity", nv);
                        returnString = data.Tables[0].ToJsonString();
                    }
                    else
                    {
                        nv.Clear();
                        nv.Add("@CityId-int", parentLevelId.ToString());
                        var data = dl.GetData("sp_HierarchyLevelSelectEditCity", nv);
                        returnString = data.Tables[0].ToJsonString();
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
        public string UpdateRegionLocaltionHierarchy(string regionLevelName, string regionLevelDescription, int IdToBeUpdate)
        {

            string returnString = "";

            try
            {

                nv.Clear();
                nv.Add("@RegionName-nvarchar(50)", regionLevelName.ToString());
                var data = dl.GetData("sp_HierarchyLevelSelectRegionWithRegionName", nv);


                if (data != null)
                {
                    if (data.Tables[0].Rows.Count == 0)
                    {
                        nv.Clear();
                        nv.Add("@IdToBeUpdate-int", IdToBeUpdate.ToString());
                        nv.Add("@regionLevelName-nvarchar(50)", regionLevelName.ToString());
                        nv.Add("@regionLevelDescription-nvarchar(MAX)", regionLevelDescription.ToString());
                        var dataInsert = dl.UpdateData("sp_HierarchyLevelUpdateRegion", nv);
                        returnString = "OkDataUpdated";
                    }
                    else
                    {
                        if (IdToBeUpdate.ToString() == data.Tables[0].Rows[0][0].ToString())
                        {
                            nv.Clear();
                            nv.Add("@IdToBeUpdate-int", IdToBeUpdate.ToString());
                            nv.Add("@regionLevelName-nvarchar(50)", regionLevelName.ToString());
                            nv.Add("@regionLevelDescription-nvarchar(MAX)", regionLevelDescription.ToString());
                            var dataInsert = dl.UpdateData("sp_HierarchyLevelUpdateRegion", nv);
                            returnString = "OkDataUpdated";
                        }
                        else
                        {
                            returnString = "alreadyExist";
                        }

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
        public string UpdateSubRegionLocaltionHierarchy(string subRegionLevelName, string subRegionLevelDescription, int IdToBeUpdate)
        {

            string returnString = "";

            try
            {

                nv.Clear();
                nv.Add("@SubRegionName-nvarchar(50)", subRegionLevelName.ToString());
                var data = dl.GetData("sp_HierarchyLevelSelectSubRegionWithSubRegionName", nv);

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count == 0)
                    {
                        nv.Clear();
                        nv.Add("@IdToBeUpdate-int", IdToBeUpdate.ToString());
                        nv.Add("@subRegionLevelName-nvarchar(50)", subRegionLevelName.ToString());
                        nv.Add("@subregionLevelDescription-nvarchar(MAX)", subRegionLevelDescription.ToString());
                        var dataInsert = dl.UpdateData("sp_HierarchyLevelUpdateSubRegion", nv);
                        returnString = "OkDataUpdated";
                    }
                    else
                    {
                        if (IdToBeUpdate.ToString() == data.Tables[0].Rows[0][0].ToString())
                        {
                            nv.Clear();
                            nv.Add("@IdToBeUpdate-int", IdToBeUpdate.ToString());
                            nv.Add("@subRegionLevelName-nvarchar(50)", subRegionLevelName.ToString());
                            nv.Add("@subregionLevelDescription-nvarchar(MAX)", subRegionLevelDescription.ToString());
                            var dataInsert = dl.UpdateData("sp_HierarchyLevelUpdateSubRegion", nv);
                            returnString = "OkDataUpdated";
                        }
                        else
                        {
                            returnString = "alreadyExist";
                        }
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
        public string UpdateDistrictLocaltionHierarchy(string districtLevelName, string districtLevelDescription, int IdToBeUpdate, string Mso, string areaManager, string salesManager, string RTL)
        {
            string returnString = "";

            try
            {

                nv.Clear();
                nv.Add("@DistrictName-nvarchar(50)", districtLevelName.ToString());
                var data = dl.GetData("sp_HierarchyLevelSelectDistrictWithDistrictName", nv);

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count == 0)
                    {

                        nv.Clear();
                        nv.Add("@IdToBeUpdate-int", IdToBeUpdate.ToString());
                        nv.Add("@districtLevelName-nvarchar(50)", districtLevelName.ToString());
                        nv.Add("@districtLevelDescription-nvarchar(MAX)", districtLevelDescription.ToString());
                        nv.Add("@Mso-nvarchar(50)", Mso.ToString());
                        nv.Add("@areaManager-nvarchar(50)", areaManager.ToString());
                        nv.Add("@salesManager-nvarchar(50)", salesManager.ToString());
                        nv.Add("@RTL-nvarchar(50)", RTL.ToString());
                        var dataInsert = dl.UpdateData("sp_HierarchyLevelUpdateDistrict", nv);
                        returnString = "OkDataUpdated";
                    }
                    else
                    {
                        if (IdToBeUpdate.ToString() == data.Tables[0].Rows[0][0].ToString())
                        {
                            nv.Clear();
                            nv.Add("@IdToBeUpdate-int", IdToBeUpdate.ToString());
                            nv.Add("@districtLevelName-nvarchar(50)", districtLevelName.ToString());
                            nv.Add("@districtLevelDescription-nvarchar(MAX)", districtLevelDescription.ToString());
                            nv.Add("@Mso-nvarchar(50)", Mso.ToString());
                            nv.Add("@areaManager-nvarchar(50)", areaManager.ToString());
                            nv.Add("@salesManager-nvarchar(50)", salesManager.ToString());
                            nv.Add("@RTL-nvarchar(50)", RTL.ToString());
                            var dataInsert = dl.UpdateData("sp_HierarchyLevelUpdateDistrict", nv);
                            returnString = "OkDataUpdated";
                        }
                        else
                        {
                            returnString = "alreadyExist";
                        }
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
        public string UpdateCityLocaltionHierarchy(string cityLevelName, int IdToBeUpdate, string City_NDD_Code, int isBigCityDialyAllowance)
        {
            string returnString = "";

            try
            {


                nv.Clear();
                nv.Add("@CityName-nvarchar(50)", cityLevelName.ToString());
                var data = dl.GetData("sp_HierarchyLevelSelectCityWithCityName", nv);
                if (data.Tables[0].Rows.Count == 0)
                {
                    nv.Clear();
                    nv.Add("@IdToBeUpdate-int", IdToBeUpdate.ToString());
                    nv.Add("@cityLevelName-nvarchar(50)", cityLevelName.ToString());
                    nv.Add("@City_NDD_Code-nvarchar(50)", City_NDD_Code.ToString());
                    nv.Add("@isBigCityDialyAllowance-bit", isBigCityDialyAllowance.ToString());
                    var dataInsert = dl.UpdateData("sp_HierarchyLevelUpdateCity", nv);
                    returnString = "OkDataUpdated";

                }
                else
                {
                    if (IdToBeUpdate.ToString() == data.Tables[0].Rows[0][0].ToString())
                    {
                        nv.Clear();
                        nv.Add("@IdToBeUpdate-int", IdToBeUpdate.ToString());
                        nv.Add("@cityLevelName-nvarchar(50)", cityLevelName.ToString());
                        nv.Add("@City_NDD_Code-nvarchar(50)", City_NDD_Code.ToString());
                        nv.Add("@isBigCityDialyAllowance-bit", isBigCityDialyAllowance.ToString());
                        var dataInsert = dl.UpdateData("sp_HierarchyLevelUpdateCity", nv);
                        returnString = "OkDataUpdated";
                    }
                    else
                    {
                        returnString = "alreadyExist";
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
        public string DeleteHierarchyLevel(int parentLevelId, string levelName)
        {
            string returnString = "";
            try
            {
                if (parentLevelId != 0)
                {
                    if (levelName == "level1")
                    {
                        nv.Clear();
                        nv.Add("@Id-int", parentLevelId.ToString());
                        //nv.Add("@regionLevelDescription-nvarchar(MAX)", regionLevelDescription.ToString());
                        var data = dl.GetData("sp_HierarchyLevelDeleteRegion", nv);

                        returnString = "OK";
                    }
                    else if (levelName == "level2")
                    {
                        nv.Clear();
                        nv.Add("@Id-int", parentLevelId.ToString());
                        //nv.Add("@regionLevelDescription-nvarchar(MAX)", regionLevelDescription.ToString());
                        var data = dl.GetData("sp_HierarchyLevelDeleteSubRegion", nv);

                        returnString = "OK";
                    }
                    else if (levelName == "level3")
                    {
                        nv.Clear();
                        nv.Add("@Id-int", parentLevelId.ToString());
                        //nv.Add("@regionLevelDescription-nvarchar(MAX)", regionLevelDescription.ToString());
                        var data = dl.GetData("sp_HierarchyLevelDistrictRegion", nv);

                        returnString = "OK";
                    }
                    else if (levelName == "level4")
                    {
                        nv.Clear();
                        nv.Add("@Id-int", parentLevelId.ToString());
                        //nv.Add("@regionLevelDescription-nvarchar(MAX)", regionLevelDescription.ToString());
                        var data = dl.GetData("sp_HierarchyLevelCitiesRegion", nv);

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

        #endregion


    }
}

using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using PocketDCR2.Classes;

namespace PocketDCR2.Reports
{
    [WebService(Namespace = "http://bmcdigitalsolutions.com/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class Overview1 : System.Web.Services.WebService
    {
        private NameValueCollection _nvCollection = new NameValueCollection();
        DAL _dal = new DAL();



        [WebMethod(EnableSession = true), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DashboardChartGroupSales(RequestObjectWrapper requestObject)
        {

            try
            {

                DataSet ds = _dal.GetData("sp_SalesDashboardGroupSales", getParameterCollection(requestObject));

                return String.Format("[{0},{1}]", ds.Tables[0].ToJsonString(), ds.Tables[1].ToJsonString());
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "";
        }


        [WebMethod(EnableSession = true), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DashboardChartCardData(RequestObjectWrapper requestObject)
        {

            try
            {

                DataSet ds = _dal.GetData("sp_SalesDashboardCardData", getParameterCollection(requestObject));

                return String.Format("[{0},{1},{2}]", ds.Tables[0].ToJsonString(), ds.Tables[1].ToJsonString(), ds.Tables[2].ToJsonString());
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "";
        }

        #region Units Dashboard
        [WebMethod(EnableSession = true), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DashboardChartCardDataUnits(RequestObjectWrapper requestObject)
        {

            try
            {

                DataSet ds = _dal.GetData("sp_SalesDashboardCardData_Units", getParameterCollection(requestObject));

                return String.Format("[{0},{1},{2}]", ds.Tables[0].ToJsonString(), ds.Tables[1].ToJsonString(), ds.Tables[2].ToJsonString());
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "";
        }

        [WebMethod(EnableSession = true), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DashboardChartSalesRunRateUnits(RequestObjectWrapper requestObject)
        {

            try
            {

                DataSet ds = _dal.GetData("sp_SalesDashboardMTDSalesRunRate_Units", getParameterCollection(requestObject));

                return String.Format("[{0},{1}]", ds.Tables[0].ToJsonString(), ds.Tables[1].ToJsonString());
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "";
        }
        [WebMethod(EnableSession = true), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DashboardChartGroupSalesUnits(RequestObjectWrapper requestObject)
        {

            try
            {

                DataSet ds = _dal.GetData("sp_SalesDashboardGroupSales_Units", getParameterCollection(requestObject));

                return String.Format("[{0},{1}]", ds.Tables[0].ToJsonString(), ds.Tables[1].ToJsonString());
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "";
        }
        [WebMethod(EnableSession = true), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DashboardChartDistrictSalesByTeamAndProductUnits(RequestObjectWrapper requestObject)
        {

            try
            {

                DataSet ds = _dal.GetData("sp_SalesDashboardDistrictSalesByTeamAndProduct_Units", getParameterCollection(requestObject));

                return String.Format("[{0},{1}]", ds.Tables[0].ToJsonString(), ds.Tables[1].ToJsonString());
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "";
        }
        #endregion Units Dashboard


        [WebMethod(EnableSession = true), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DashboardChartProductRangeValue(RequestObjectWrapper requestObject)
        {

            try
            {


                DataSet ds = _dal.GetData("sp_SalesDashboardProductRangeValue", getParameterCollection(requestObject));

                return String.Format("[{0},{1}]", ds.Tables[0].ToJsonString(), ds.Tables[1].ToJsonString());
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "";
        }




        [WebMethod(EnableSession = true), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DashboardChartProductRangeUnit(RequestObjectWrapper requestObject)
        {

            try
            {

                DataSet ds = _dal.GetData("sp_SalesDashboardProductRangeUnit", getParameterCollection(requestObject));

                return String.Format("[{0},{1}]", ds.Tables[0].ToJsonString(), ds.Tables[1].ToJsonString());
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "";
        }



        [WebMethod(EnableSession = true), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DashboardChartProductSKUValue(RequestObjectWrapper requestObject)
        {

            try
            {


                DataSet ds = _dal.GetData("sp_SalesDashboardProductSKUValue", getParameterCollection(requestObject));

                return String.Format("[{0},{1}]", ds.Tables[0].ToJsonString(), ds.Tables[1].ToJsonString());
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "";
        }


        [WebMethod(EnableSession = true), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DashboardChartProductSKUUnit(RequestObjectWrapper requestObject)
        {

            try
            {


                DataSet ds = _dal.GetData("sp_SalesDashboardProductSKUUnit", getParameterCollection(requestObject));

                return String.Format("[{0},{1}]", ds.Tables[0].ToJsonString(), ds.Tables[1].ToJsonString());
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "";
        }



        [WebMethod(EnableSession = true), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DashboardChartSalesRunRate(RequestObjectWrapper requestObject)
        {

            try
            {

                DataSet ds = _dal.GetData("sp_SalesDashboardMTDSalesRunRate", getParameterCollection(requestObject));

                return String.Format("[{0},{1}]", ds.Tables[0].ToJsonString(), ds.Tables[1].ToJsonString());
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "";
        }


        [WebMethod(EnableSession = true), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DashboardChartDashboardChartSummary(RequestObjectWrapper requestObject)
        {

            try
            {

                DataSet ds = _dal.GetData("sp_SalesDashboardChartSummary", getParameterCollection(requestObject));

                return String.Format("[{0},{1}]", ds.Tables[0].ToJsonString(), ds.Tables[1].ToJsonString());
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "";
        }



        [WebMethod(EnableSession = true), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DashboardChartDistrictSalesByTeamAndProduct(RequestObjectWrapper requestObject)
        {

            try
            {

                DataSet ds = _dal.GetData("sp_SalesDashboardDistrictSalesByTeamAndProduct", getParameterCollection(requestObject));

                return String.Format("[{0},{1}]", ds.Tables[0].ToJsonString(), ds.Tables[1].ToJsonString());
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "";
        }



        [WebMethod(EnableSession = true), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DashboardChartDistrictTopSales(RequestObjectWrapper requestObject)
        {
            try
            {
                DataSet ds = _dal.GetData("sp_SalesDashboardDistrictTopSales", getParameterCollection(requestObject));

                return String.Format("[{0},{1}]", ds.Tables[0].ToJsonString(), ds.Tables[1].ToJsonString());
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "";
        }


        [WebMethod(EnableSession = true), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DashboardChartDistrictBottomSales(RequestObjectWrapper requestObject)
        {
            try
            {
                DataSet ds = _dal.GetData("sp_SalesDashboardDistrictBottomSales", getParameterCollection(requestObject));

                return String.Format("[{0},{1}]", ds.Tables[0].ToJsonString(), ds.Tables[1].ToJsonString());
            }
            catch (Exception ex)
            {
                Constants.ErrorLog("Exception Raising From | " + ex.Message + " | Stack Trace | " + ex.StackTrace + ";");
            }
            return "";
        }



        [WebMethod(), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllCity(String ID)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@id-int", ID.ToString());
                var data = _dal.GetData("getcitybyIds", _nvCollection);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod(), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetSalesDistributor(String ID)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@ID-int", ID.ToString());
                var data = _dal.GetData("sp_GetDistributorbyIds", _nvCollection);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod(), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetSalesBricks(String ID)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@empID-int", ID.ToString()); // @EMPID Is Wrong Alliaseed By Someone. But Using This Procedure Now. --Arsal
                var data = _dal.GetData("sp_GetAllDistSalesBricksbyIds", _nvCollection);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod(), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetPharmaciesByBrickIDs(String ID)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@BrickID-var", ID.ToString());
                var data = _dal.GetData("sp_GetAllBrickPharmacybyIds", _nvCollection);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }



        [WebMethod(), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetProducts(String EmployeeID)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                //_nvCollection.Add("@empID-int", EmployeeID.ToString()); // @EMPID Is Wrong Alliaseed By Someone. But Using This Procedure Now. --Arsal
                var data = _dal.GetData("Call_GetProducts_Brands", null);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod(), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmployees(String CityID, String DistributorID, String BrickID, String EmployeeID)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();

                _nvCollection.Add("@CityID-int", CityID.ToString());
                _nvCollection.Add("@DistributorID-int", DistributorID.ToString());
                _nvCollection.Add("@BrickID-int", BrickID.ToString());
                _nvCollection.Add("@EmployeeID-int", EmployeeID.ToString());

                var data = _dal.GetData("sp_getEmployeesByLocation", _nvCollection);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }




        [WebMethod(), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllTeams(String EmployeeID)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                //_nvCollection.Add("@EmployeeID-int", EmployeeID.ToString());

                var data = _dal.GetData("sp_GetTeams", _nvCollection);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }



        [WebMethod(), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllProductsByTeamID(String TeamID)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@TeamID-int", TeamID.ToString());

                var data = _dal.GetData("sp_GetAllProductsByTeams", _nvCollection);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }




        [WebMethod(), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllSkusByProductIDs(String ProductID)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@ProductID-int", ProductID);

                var data = _dal.GetData("sp_GetAllSkusByProduct", _nvCollection);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }




        [WebMethod(), ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetLevelByID(String LevelType, String LevelID)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@ID-int", LevelID);

                string SpName = "";

                switch (LevelType)
                {
                    case "Level1":

                        _nvCollection.Clear();
                        SpName = "sp_GetSalesDashboardLevel1";
                        break;

                    case "Level2":
                        SpName = "sp_GetSalesDashboardLevel2";
                        break;

                    case "Level3":
                        SpName = "sp_GetSalesDashboardLevel3";
                        break;

                    case "Level4":
                        SpName = "sp_GetSalesDashboardLevel4";
                        break;

                    case "Level5":
                        SpName = "sp_GetSalesDashboardLevel5";
                        break;

                    case "Level6":
                        SpName = "sp_GetSalesDashboardLevel6";
                        break;


                    default:

                        break;
                }





                var data = _dal.GetData(SpName, _nvCollection);
                returnString = data.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }



        public NameValueCollection getParameterCollection(RequestObjectWrapper requestObject)
        {

            _nvCollection.Clear();

            _nvCollection.Add("@LabelRange1-var", requestObject.GlobalDateRange.Range1.Label);
            _nvCollection.Add("@LabelRange2-var", requestObject.GlobalDateRange.Range2.Label);

            _nvCollection.Add("@Range1StartDate-var", requestObject.GlobalDateRange.Range1.StartDate);
            _nvCollection.Add("@Range1EndDate-var", requestObject.GlobalDateRange.Range1.EndDate);
            _nvCollection.Add("@Range2StartDate-var", requestObject.GlobalDateRange.Range2.StartDate);
            _nvCollection.Add("@Range2EndDate-var", requestObject.GlobalDateRange.Range2.EndDate);

            _nvCollection.Add("@HierarchyLevel1-var", requestObject.HierarchyLevel1.ToString());
            _nvCollection.Add("@HierarchyLevel2-var", requestObject.HierarchyLevel2.ToString());
            _nvCollection.Add("@HierarchyLevel3-var", requestObject.HierarchyLevel3.ToString());
            _nvCollection.Add("@HierarchyLevel4-var", requestObject.HierarchyLevel4.ToString());
            _nvCollection.Add("@HierarchyLevel5-var", requestObject.HierarchyLevel5.ToString());
            _nvCollection.Add("@HierarchyLevel6-var", requestObject.HierarchyLevel6.ToString());

            _nvCollection.Add("@CityID-var", requestObject.CityID.ToString());
            _nvCollection.Add("@DistributorID-var", requestObject.DistributorID);
            _nvCollection.Add("@BrickID-var", requestObject.BrickID);
            _nvCollection.Add("@ProductSKUID-var", requestObject.ProductSKUID);

            _nvCollection.Add("@TeamID-var", requestObject.TeamID);
            _nvCollection.Add("@ProductID-var", requestObject.ProductID);
            _nvCollection.Add("@PharmacyID-var", requestObject.PharmacyID);

            return _nvCollection;
        }

    }
}



public struct RequestObjectWrapper
{
    public DateRange GlobalDateRange { get; set; }


    public String HierarchyLevel1 { get; set; }
    public String HierarchyLevel2 { get; set; }
    public String HierarchyLevel3 { get; set; }
    public String HierarchyLevel4 { get; set; }
    public String HierarchyLevel5 { get; set; }
    public String HierarchyLevel6 { get; set; }



    public String TeamID { get; set; }
    public String ProductID { get; set; }
    public String ProductSKUID { get; set; }


    public String CityID { get; set; }
    public String DistributorID { get; set; }
    public String BrickID { get; set; }
    public String PharmacyID { get; set; }


    public struct DateRange
    {
        public struct Range
        {
            public string Label { get; set; }
            public string StartDate { get; set; }
            public string EndDate { get; set; }
        }

        public Range Range1 { get; set; }
        public Range Range2 { get; set; }
    }
}



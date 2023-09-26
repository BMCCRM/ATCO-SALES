using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using Newtonsoft.Json;
using System.Data;
using PocketDCR.CustomMembershipProvider;

namespace PocketDCR2.BWSD
{
    /// <summary>
    /// Summary description for SalesTerritorybrick
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SalesTerritorybrick_New : System.Web.Services.WebService
    {
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        NameValueCollection _nv = new NameValueCollection();
        DAL dal = new DAL();
        DataSet dsData;
        private SystemUser _currentUser;


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetBrickAllocation_NonApproval(string Level1Id, string Level2Id, string Level3Id, string Level4Id, string Level5Id, string Level6Id, string TeamID, string DistributorID, string Role)
        {
            string result = "";
            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];

                _nv.Clear();
                _nv.Add("@CurrentUserEmployeeId-INT", (_currentUser.EmployeeId).ToString());
                _nv.Add("@Level1Id-int", (Level1Id.ToString() == "-1" ? "0" : Level1Id.ToString()));
                _nv.Add("@Level2Id-int", (Level2Id.ToString() == "-1" ? "0" : Level2Id.ToString()));
                _nv.Add("@Level3Id-int", (Level3Id.ToString() == "-1" ? "0" : Level3Id.ToString()));
                _nv.Add("@Level4Id-int", (Level4Id.ToString() == "-1" ? "0" : Level4Id.ToString()));
                _nv.Add("@Level5Id-int", (Level5Id.ToString() == "-1" ? "0" : Level5Id.ToString()));
                _nv.Add("@Level6Id-int", (Level6Id.ToString() == "-1" ? "0" : Level6Id.ToString()));
                _nv.Add("@TeamID-int", (TeamID.ToString() == "-1" ? "0" : TeamID.ToString()));
                _nv.Add("@DistributorID-int", DistributorID.ToString());
                _nv.Add("@Userrole-Varchar(MAX)", Role.ToString());
                var data = dal.GetData("SP_GetBrickAllocation_NonApproval", _nv);

                if (data.Tables[0].Rows.Count > 0)
                    return data.Tables[0].ToJsonString();
                //return JsonConvert.SerializeObject(data.Tables[0]);

                else
                    result = "No";
            }
            catch (Exception ex)
            {

                result = ex.Message;
            }

            return result;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string BrickAllocation_Approvel(string PK_id, string userrole, string empid, string Comment)
        {
            string result = "";
            try
            {
                _nv.Clear();
                _nv.Add("@PK_id-varchar(MAX)", PK_id.ToString());
                _nv.Add("@userrole-varchar(MAX)", userrole.ToString());
                _nv.Add("@empid-varchar(MAX)", empid.ToString());
                _nv.Add("@Comment-varchar(MAX)", Comment.ToString());
                //_nv.Add("@DistributorID-int", DistributorID.ToString());
                var data = dal.GetData("SP_BrickAllocation_Approval", _nv);

                if (data.Tables[0].Rows.Count > 0)
                    return data.Tables[0].ToJsonString();
                //return JsonConvert.SerializeObject(data.Tables[0]);

                else
                    result = "No";
            }
            catch (Exception ex)
            {

                result = ex.Message;
            }

            return result;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string BrickAllocation_Reject(string PK_id, string userrole, string empid, string Comment)
        {
            string result = "";
            try
            {
                _nv.Clear();
                _nv.Add("@PK_id-varchar(MAX)", PK_id.ToString());
                _nv.Add("@userrole-varchar(MAX)", userrole.ToString());
                _nv.Add("@empid-varchar(MAX)", empid.ToString());
                _nv.Add("@Comment-varchar(MAX)", Comment.ToString());
                //_nv.Add("@DistributorID-int", DistributorID.ToString());
                var data = dal.GetData("SP_BrickAllocation_Reject", _nv);

                if (data.Tables[0].Rows.Count > 0)
                    return data.Tables[0].ToJsonString();
                //return JsonConvert.SerializeObject(data.Tables[0]);

                else
                    result = "No";
            }
            catch (Exception ex)
            {

                result = ex.Message;
            }

            return result;
        }


        //sp_GetTeritorybrickDetail
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string listGetTerritoryBrickDetail(string Level1Id, string Level2Id, string Level3Id, string Level4Id, string Level5Id, string Level6Id, string DistributorID, string percentag)
        {
            string result = "";
            try
            {
                _nv.Clear();
                _nv.Add("@Level1Id-int", (Level1Id.ToString() == "-1" ? "0" : Level1Id.ToString()));
                _nv.Add("@Level2Id-int", (Level2Id.ToString() == "-1" ? "0" : Level2Id.ToString()));
                _nv.Add("@Level3Id-int", (Level3Id.ToString() == "-1" ? "0" : Level3Id.ToString()));
                _nv.Add("@Level4Id-int", (Level4Id.ToString() == "-1" ? "0" : Level4Id.ToString()));
                _nv.Add("@Level5Id-int", (Level5Id.ToString() == "-1" ? "0" : Level5Id.ToString()));
                _nv.Add("@Level6Id-int", (Level6Id.ToString() == "-1" ? "0" : Level6Id.ToString()));
                _nv.Add("@DistributorID-int", DistributorID.ToString());
                _nv.Add("@percentag-int", percentag.ToString());
                var data = dal.GetData("sp_Getterritorybrickrelation", _nv);

                if (data.Tables[0].Rows.Count > 0)
                    return data.Tables[0].ToJsonString();
                //return JsonConvert.SerializeObject(data.Tables[0]);

                else
                    result = "No";
            }
            catch (Exception ex)
            {

                result = ex.Message;
            }

            return result;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string listGetEmpSalesBricks(string empID)
        {
            string result = "";
            //var Date = Convert.ToDateTime(docdate);
            //var Spoid = spoid.Split('-')[0].ToString();

            try
            {
                _nv.Clear();
                _nv.Add("@empID-int", empID.ToString());
                var data = dal.GetData("sp_GetAllDistSalesBricks", _nv);

                if (data.Tables[0].Rows.Count > 0)
                    return data.Tables[0].ToJsonString();

                else
                    result = "No";
            }
            catch (Exception ex)
            {

                result = ex.Message;
            }

            return result;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertRelationalSalesBrick(string SalesDistributorID, string SalesBrick, string SalesBricksID, string BUHID, string GMID, string DivisionID, string RegionID, string ZoneID, string TerritoryID, string salepercent)
        {

            string result = string.Empty;
            var SalesBricksIDSplit = SalesBricksID.Split(',');
            for (int i = 0; i < SalesBricksIDSplit.Length; i++)
            {
                try
                {
                    _nv.Clear();
                    _nv.Add("@DistbrickId-int", SalesBricksIDSplit[i].ToString());
                    _nv.Add("@BUHID-int", BUHID.ToString());
                    _nv.Add("@GMID-int", GMID.ToString());
                    _nv.Add("@DivisionID-int", DivisionID.ToString());
                    _nv.Add("@RegionID-int", RegionID.ToString());
                    _nv.Add("@ZoneID-int", ZoneID.ToString());
                    _nv.Add("@TeritoryID-int", (TerritoryID.ToString() == "0" ? null : TerritoryID.ToString()));
                    var data = dal.GetData("sp_Get_teritoy_Bricks", _nv);
                    if (data.Tables[0].Rows.Count > 0)
                    {
                        return "Exist";
                    }
                    else
                    {
                        //sp_checkSalePercentage
                        //_nv.Clear();
                        // _nv.Add("@DistbrickId-int", SalesBricksIDSplit[i].ToString());
                        var percentage = dal.GetData("sp_checkSalePercentage", new NameValueCollection { { "@BrickID-int", SalesBrick.Split(',')[i].ToString() } });
                        if (percentage.Tables[0].Rows.Count > 0)
                        {
                            int val = Convert.ToInt32(percentage.Tables[0].Rows[0][1].ToString()) + Convert.ToInt32(salepercent.ToString());
                            if (val <= 100)
                            {
                                _nv.Clear();
                                _nv.Add("@DistbrickId-int", SalesBricksIDSplit[i].ToString());
                                _nv.Add("@BUHID-int", BUHID.ToString());
                                _nv.Add("@GMID-int", GMID.ToString());
                                _nv.Add("@DivisionID-int", DivisionID.ToString());
                                _nv.Add("@RegionID-int", RegionID.ToString());
                                _nv.Add("@ZoneID-int", ZoneID.ToString());
                                _nv.Add("@TeritoryID-int", (TerritoryID.ToString() == "0" ? null : TerritoryID.ToString()));
                                _nv.Add("@SalePercent-int", (salepercent.ToString() == "0" ? null : salepercent.ToString()));
                                var data1 = dal.InserData("sp_Insert_teritory_relation", _nv);
                                if (data1 != true)
                                {
                                    return "Exist";
                                }

                            }
                            else
                            {
                                return "Nobalanace," + percentage.Tables[0].Rows[0][0].ToString();
                            }
                        }
                        else
                        {
                            _nv.Clear();
                            _nv.Add("@DistbrickId-int", SalesBricksIDSplit[i].ToString());
                            _nv.Add("@BUHID-int", BUHID.ToString());
                            _nv.Add("@GMID-int", GMID.ToString());
                            _nv.Add("@DivisionID-int", DivisionID.ToString());
                            _nv.Add("@RegionID-int", RegionID.ToString());
                            _nv.Add("@ZoneID-int", ZoneID.ToString());
                            _nv.Add("@TeritoryID-int", (TerritoryID.ToString() == "0" ? null : TerritoryID.ToString()));
                            _nv.Add("@SalePercent-int", (salepercent.ToString() == "0" ? null : salepercent.ToString()));
                            var data1 = dal.InserData("sp_Insert_teritory_relation", _nv);
                            if (data1 != true)
                            {
                                return "Exist";
                            }
                        }
                    }

                }
                catch (NullReferenceException ex)
                {
                    result = ex.Message;
                }
            }
            result = "OK";

            return result;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string RemoveRelationalSalesBrick(string SalesDistributorID, string SalesBricksID, string TerritoryID, string salepercent)
        {

            string result = string.Empty;
            var SalesBricksIDSplit = SalesBricksID.Split(',');
            for (int i = 0; i < SalesBricksIDSplit.Length; i++)
            {
                try
                {

                    _nv.Clear();
                    _nv.Add("@distid-int", SalesDistributorID.ToString());
                    _nv.Add("@brickId-int", SalesBricksIDSplit[i].ToString());

                    _nv.Add("@teritoryId-int", TerritoryID.ToString());
                    _nv.Add("@salepercet-int", salepercent.ToString());
                    var data1 = dal.InserData("sp_Uodate_teritory_relation", _nv);
                    if (data1 != true)
                    {
                        return "Exist";
                    }


                }
                catch (NullReferenceException ex)
                {
                    result = ex.Message;
                }
            }
            result = "OK";

            return result;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string listGeTeritorytSalesBricks(string distributorCode, string TerritoryID)
        {
            string result = "";
            //var Date = Convert.ToDateTime(docdate);
            //var Spoid = spoid.Split('-')[0].ToString();

            try
            {
                _nv.Clear();
                _nv.Add("@distributorCode-INT", distributorCode.ToString());
                _nv.Add("@TerritoryID-INT", TerritoryID.ToString());
                var data = dal.GetData("sp_GetdistribteritorySalesBricks", _nv);

                if (data.Tables[0].Rows.Count > 0)
                {
                    return data.Tables[0].ToJsonString();
                }
                else
                {

                    result = "No";
                }

            }
            catch (Exception ex)
            {

                result = ex.Message;
            }

            return result;
        }
    }
}

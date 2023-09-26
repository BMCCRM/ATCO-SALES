using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using PocketDCR2.Classes;
using System.Configuration;

namespace PocketDCR2.Reports
{
    /// <summary>
    /// Summary description for NewSalesdashboard
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class NewSalesdashboard : System.Web.Services.WebService
    {
        #region Database Layer

        private System.Data.DataSet GetData(String SpName, NameValueCollection NV)
        {
            var connection = new SqlConnection();
            string dbTyper = "";

            try
            {
                connection.ConnectionString = Classes.Constants.GetConnectionString();
                var dataSet = new System.Data.DataSet();
                connection.Open();

                var command = new SqlCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = connection;
                command.CommandText = SpName;
                command.CommandTimeout = 20000;

                if (NV != null)
                {
                    //New code implemented for retrieving data
                    for (int i = 0; i < NV.Count; i++)
                    {
                        string[] arraySplit = NV.Keys[i].Split('-');

                        if (arraySplit.Length > 2)
                        {
                            //Run the code with datatype length.
                            dbTyper = "SqlDbType." + arraySplit[1].ToString() + "," + arraySplit[2].ToString();
                            command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
                        }
                        else
                        {
                            //Run the code for int values
                            dbTyper = "SqlDbType." + arraySplit[1].ToString();
                            command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
                        }
                    }
                }

                var dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = command;
                dataAdapter.Fill(dataSet);

                return dataSet;

                dataSet.Clear();
                dataSet.Dispose();
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
                return null;
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }
        }
        private System.Data.DataSet dsSum = new System.Data.DataSet();
        DataTable dtSum = new DataTable();
        #endregion

        #region Variables
        private NameValueCollection nv = new NameValueCollection();

        #endregion

        [WebMethod]
        public string GetProducts()
        {
            string result = string.Empty;
            try
            {
                nv.Clear();
                var data = GetData("Call_GetProducts_Brands", null);

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count > 0)
                    {
                        result = data.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception ex)
            {
                result = string.Format("Message : {0} /n StackTrace : {1}", ex.Message, ex.StackTrace);
            }
            return result;
        }


        [WebMethod]
        public string GetProductsSku(string ProdId)
        {
            string result = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@ProdId-int", ProdId);
                var data = GetData("Call_GetProductsSku_Brands", nv);

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count > 0)
                    {
                        result = data.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception ex)
            {
                result = string.Format("Message : {0} /n StackTrace : {1}", ex.Message, ex.StackTrace);
            }
            return result;
        }


        [WebMethod]
        public string GetDoctorsBricks(string DistID)
        {
            string result = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@DistID-int", DistID);
                //nv.Add("@month-int", month);
                //nv.Add("@year-int", year);

                var data = GetData("sp_getBricksByDistributor", nv);

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count > 0)
                    {
                        result = data.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception ex)
            {
                result = string.Format("Message : {0} /n StackTrace : {1}", ex.Message, ex.StackTrace);
            }
            return result;
        }




        [WebMethod]
        public string GetEmployeeDistributor(string empid)
        {
            string result = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@empid-int", empid);
                //nv.Add("@month-int", month);
                //nv.Add("@year-int", year);

                var data = GetData("sp_GetDistributorsOfEmployeeID", nv);

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count > 0)
                    {
                        result = data.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception ex)
            {
                result = string.Format("Message : {0} /n StackTrace : {1}", ex.Message, ex.StackTrace);
            }
            return result;
        }



        //[WebMethod]
        //public string GetClient(string DistributorID, string BrickID)
        //{
        //    string result = string.Empty;
        //    try
        //    {
        //        nv.Clear();
        //        nv.Add("@DistributorID-int", DistributorID.ToString());
        //        nv.Add("@BrickID-int", BrickID.ToString());

        //        var data = GetData("SpgetClient", nv);

        //        if (data != null)
        //        {
        //            if (data.Tables[0].Rows.Count > 0)
        //            {
        //                result = data.Tables[0].ToJsonString();
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        result = string.Format("Message : {0} /n StackTrace : {1}", ex.Message, ex.StackTrace);
        //    }
        //    return result;
        //}

        [WebMethod]
        public string GetClient(string DistributorID, string BrickID)
        {
            var result = string.Empty;
            try
            {
                nv.Clear(); //@TerritoryID

                // Convert the DistributorIDs array to a comma-separated string
                var distributorIDString = (DistributorID == null || DistributorID.Length == 0) ? "0" : string.Join(",", DistributorID);
                var brickIDString = (BrickID == null || BrickID.Length == 0) ? "0" : string.Join(",", BrickID);

                string connectionString = ConfigurationManager.ConnectionStrings["PocketDCRConnectionString"].ConnectionString;

                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    using (var command = new SqlCommand("SpgetClient", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@DistributorID", distributorIDString);
                        command.Parameters.AddWithValue("@BrickID", brickIDString);

                        var data = new DataSet();
                        using (var adapter = new SqlDataAdapter(command))
                        {
                            adapter.Fill(data);
                        }

                        if (data != null && data.Tables.Count > 0 && data.Tables[0].Rows.Count > 0)
                        {
                            result = data.Tables[0].ToJsonString();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return result;
        }



        [WebMethod]
        public string GetTeamsData(string month, string year, string bricksIDs, string empid)
        {
            string result = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@empid-int", empid);
                nv.Add("@month-int", month);
                nv.Add("@year-int", year);
                if (bricksIDs != "" || bricksIDs != "-1")
                    nv.Add("@bricksIDs-VARCHAR", bricksIDs);

                var data = GetData("sp_getTeamsData", nv);

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count > 0)
                    {
                        result = data.Tables[0].ToJsonString();
                    }

                }
            }
            catch (Exception ex)
            {
                result = string.Format("Message : {0} /n StackTrace : {1}", ex.Message, ex.StackTrace);
            }
            return result;
        }
        [WebMethod]
        public string GetTeamsDataByID(string TeamIds, string year, string bricksIDs, string month)
        {
            var result = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@teamsid-varchar(max)", TeamIds);
                nv.Add("@month-int", month);
                nv.Add("@year-int", year);

                if (bricksIDs != "" || bricksIDs != "-1")
                    nv.Add("@bricksIDs-VARCHAR", bricksIDs);

                var data = GetData("sp_getTeamsDataByID", nv);

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count > 0)
                    {
                        result = data.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }

            return result;
        }
        [WebMethod]
        public string GetTeamsProductDataByID(string TeamIds, string bricksIDs, string year, string month)
        {
            var result = string.Empty;

            try
            {
                nv.Clear();
                nv.Add("@teamsid-varchar(max)", TeamIds);
                nv.Add("@month-int", month);
                nv.Add("@year-int", year);

                if (bricksIDs != "" || bricksIDs != "-1")
                    nv.Add("@bricksIDs-VARCHAR", bricksIDs);

                var data = GetData("sp_teamproductsales", nv);

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count > 0)
                    {
                        result = data.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return result;
        }
        [WebMethod]
        public string GetTop5BricksData(string month, string year, string empid)
        {
            string resultstring = string.Empty;
            string result = string.Empty;
            string result2 = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@empid-int", empid);
                nv.Add("@month-int", month);
                nv.Add("@year-int", year);

                var data = GetData("sp_Top5brickDataByempid", nv);
                string brickids = string.Empty;
                if (data != null)
                {
                    if (data.Tables[0].Rows.Count > 0)
                    {

                        result = data.Tables[0].ToJsonString();

                        foreach (DataRow dr in data.Tables[0].Rows)
                        {
                            foreach (DataColumn dc in data.Tables[0].Columns)
                            {
                                if (dc.ColumnName.ToString() == "BrickId")
                                {
                                    brickids += dr[dc.ColumnName].ToString() + ",";
                                }
                            }
                        }
                    }
                }
                nv.Clear();
                nv.Add("@year-int", year);
                nv.Add("@month-int", month);
                nv.Add("@brickids-varchar(max)", brickids.TrimEnd(','));

                var datai = GetData("sp_Top10productofaBrick", nv);
                if (datai != null)
                {
                    if (datai.Tables[0].Rows.Count > 0)
                    {
                        result2 = datai.Tables[0].ToJsonString();
                    }
                }
                resultstring = result + "|" + result2;
            }
            catch (Exception ex)
            {
                result = string.Format("Message : {0} /n StackTrace : {1}", ex.Message, ex.StackTrace);
            }
            return resultstring;
        }
        [WebMethod]
        public string GetBottom5BricksData(string month, string year, string empid)
        {
            string resultstring = string.Empty;
            string result = string.Empty;
            string result2 = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@empid-int", empid);
                nv.Add("@month-int", month);
                nv.Add("@year-int", year);

                var data = GetData("sp_Bottom5brickDataByempid", nv);
                string brickids = string.Empty;
                if (data != null)
                {
                    if (data.Tables[0].Rows.Count > 0)
                    {

                        result = data.Tables[0].ToJsonString();

                        foreach (DataRow dr in data.Tables[0].Rows)
                        {
                            foreach (DataColumn dc in data.Tables[0].Columns)
                            {
                                if (dc.ColumnName.ToString() == "BrickId")
                                {
                                    brickids += dr[dc.ColumnName].ToString() + ",";
                                }
                            }
                        }
                    }
                }
                nv.Clear();
                nv.Add("@year-int", year);
                nv.Add("@month-int", month);
                nv.Add("@brickids-varchar(max)", brickids.TrimEnd(','));

                var datai = GetData("sp_Bottom10productofaBrick", nv);
                if (datai != null)
                {
                    if (datai.Tables[0].Rows.Count > 0)
                    {
                        result2 = datai.Tables[0].ToJsonString();
                    }
                }
                resultstring = result + "|" + result2;
            }
            catch (Exception ex)
            {
                result = string.Format("Message : {0} /n StackTrace : {1}", ex.Message, ex.StackTrace);
            }
            return resultstring;
        }

        //sp_TerritoryDistributor
        [WebMethod]
        public string GetTerritoryDistributor(string DivisionID, string RegionID, string ZoneID, string TerritoryID)
        {
            var result = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@DivisionID-int", DivisionID);
                nv.Add("@RegionID-int", RegionID);
                nv.Add("@ZoneID-int", ZoneID);
                nv.Add("@TerritoryID-int", TerritoryID);
                var data = GetData("sp_TerritoryDistributor", nv);

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count > 0)
                    {
                        result = data.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return result;
        }


        [WebMethod]
        public string GetTerritoryDoctors(string DivisionID, string RegionID, string ZoneID, string TerritoryID)
        {
            var result = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@DivisionID-int", DivisionID);
                nv.Add("@RegionID-int", RegionID);
                nv.Add("@ZoneID-int", ZoneID);
                nv.Add("@TerritoryID-int", TerritoryID);
                var data = GetData("sp_getalldoctorsforsales", nv);

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count > 0)
                    {
                        result = data.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return result;
        }

        [WebMethod]
        public string GetDistributorbrick(string DistributorIDs)
        {
            var result = string.Empty;
            try
            {
                nv.Clear(); //@TerritoryID

                // Convert the DistributorIDs array to a comma-separated string
                var distributorIDString = (DistributorIDs == null || DistributorIDs.Length == 0) ? "0" : string.Join(",", DistributorIDs);

                string connectionString = ConfigurationManager.ConnectionStrings["PocketDCRConnectionString"].ConnectionString;

                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    using (var command = new SqlCommand("sp_Distributorbrick", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                      //  command.Parameters.AddWithValue("@TerritoryID", (TerritoryID == null ? "0" : TerritoryID));
                        command.Parameters.AddWithValue("@DistributorID", distributorIDString);

                        var data = new DataSet();
                        using (var adapter = new SqlDataAdapter(command))
                        {
                            adapter.Fill(data);
                        }

                        if (data != null && data.Tables.Count > 0 && data.Tables[0].Rows.Count > 0)
                        {
                            result = data.Tables[0].ToJsonString();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return result;
        }




        //[WebMethod]
        //public string GetDistributorbrick(string TerritoryID, string[] DistributorIDs)
        //{
        //    var result = string.Empty;
        //    try
        //    {
        //        nv.Clear(); //@TerritoryID
        //        var hold = (TerritoryID == null ? 0 : Convert.ToInt32(TerritoryID));
        //        nv.Add("@TerritoryID-INT", hold.ToString());


        //        // Convert the DistributorIDs array to a comma-separated string
        //        var distributorIDString = (DistributorIDs == null || DistributorIDs.Length == 0) ? "0" : string.Join(",", DistributorIDs);

        //        string connectionString = ConfigurationManager.ConnectionStrings["PocketDCRConnectionString"].ConnectionString;

        //        using (var connection = new SqlConnection(connectionString))
        //        {
        //            connection.Open();

        //            using (var command = new SqlCommand("sp_Distributorbrick", connection))
        //            {
        //                command.CommandType = CommandType.StoredProcedure;
        //                command.Parameters.AddWithValue("@TerritoryID-INT", TerritoryID);
        //                command.Parameters.AddWithValue("@DistributorID-VARCHAR(MAX)", distributorIDString);

        //                var data = new DataSet();
        //                using (var adapter = new SqlDataAdapter(command))
        //                {
        //                    adapter.Fill(data);
        //                }

        //                if (data != null && data.Tables.Count > 0 && data.Tables[0].Rows.Count > 0)
        //                {
        //                    result = data.Tables[0].ToJsonString();
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        result = ex.Message;
        //    }
        //    return result;
        //}



        [WebMethod]
        public string GetBricksDataByID(string month, string year, string TeamIDs, string bricksid)
        {
            var result = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@brickids-varchar(max)", bricksid);
                nv.Add("@month-int", month);
                nv.Add("@year-int", year);


                if (TeamIDs != "" || TeamIDs != "-1")
                    nv.Add("@TeamIDs-VARCHAR", TeamIDs);

                var data = GetData("sp_GetBrickdataByIDs", nv);

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count > 0)
                    {
                        result = data.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return result;
        }

        [WebMethod]
        public string GetBricksByDistributors(string distributorCode)
        {
            var result = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@distributorCode-INT", distributorCode);

                var data = GetData("sp_GetAllSalesBricksbyDistributor", nv);

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count > 0)
                    {
                        result = data.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return result;
        }

        [WebMethod]
        public string GetAllDistributorBrickWise(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var customercoverage = new System.Data.DataSet();
                nv.Clear();
                customercoverage.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());

                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                customercoverage = GetData("sp_AllDistributorBrickSale", nv);


                #endregion

                if (customercoverage != null)
                {
                    if (customercoverage.Tables[0].Rows.Count > 0)
                    {
                        result = customercoverage.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }

        [WebMethod]
        public string BUHBrickWise(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var customercoverage = new System.Data.DataSet();
                nv.Clear();
                customercoverage.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());

                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                customercoverage = GetData("sp_BUHWiseBrickSale", nv);


                #endregion

                if (customercoverage != null)
                {
                    if (customercoverage.Tables[0].Rows.Count > 0)
                    {
                        result = customercoverage.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }


        [WebMethod]
        public string GMBrickWise(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var customercoverage = new System.Data.DataSet();
                nv.Clear();
                customercoverage.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());

                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                customercoverage = GetData("sp_GMWiseBrickSale", nv);


                #endregion

                if (customercoverage != null)
                {
                    if (customercoverage.Tables[0].Rows.Count > 0)
                    {
                        result = customercoverage.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }

        [WebMethod]
        public string NationalBrickWise(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var customercoverage = new System.Data.DataSet();
                nv.Clear();
                customercoverage.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());

                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                customercoverage = GetData("sp_NationalWiseBrickSale", nv);


                #endregion

                if (customercoverage != null)
                {
                    if (customercoverage.Tables[0].Rows.Count > 0)
                    {
                        result = customercoverage.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }

        //sp_NationalDistributorBrickSale
        [WebMethod]
        public string NationalDistributorkWise(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var customercoverage = new System.Data.DataSet();
                nv.Clear();
                customercoverage.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());

                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                customercoverage = GetData("sp_NationalDistributorBrickSale", nv);


                #endregion

                if (customercoverage != null)
                {
                    if (customercoverage.Tables[0].Rows.Count > 0)
                    {
                        result = customercoverage.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }

        [WebMethod]
        public string BUHDistributorkWise(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var customercoverage = new System.Data.DataSet();
                nv.Clear();
                customercoverage.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());

                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                customercoverage = GetData("sp_BUHDistributorBrickSale", nv);


                #endregion

                if (customercoverage != null)
                {
                    if (customercoverage.Tables[0].Rows.Count > 0)
                    {
                        result = customercoverage.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }

        [WebMethod]
        public string GMDistributorkWise(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var customercoverage = new System.Data.DataSet();
                nv.Clear();
                customercoverage.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());

                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                customercoverage = GetData("sp_GMDistributorBrickSale", nv);


                #endregion

                if (customercoverage != null)
                {
                    if (customercoverage.Tables[0].Rows.Count > 0)
                    {
                        result = customercoverage.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }

        [WebMethod]
        public string RegionBrickWise(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var customercoverage = new System.Data.DataSet();
                nv.Clear();
                customercoverage.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());
                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                customercoverage = GetData("sp_RegionWiseBrickSale", nv);


                #endregion

                if (customercoverage != null)
                {
                    if (customercoverage.Tables[0].Rows.Count > 0)
                    {
                        result = customercoverage.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }

        [WebMethod]
        public string RegionDistributorkWise(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var customercoverage = new System.Data.DataSet();
                nv.Clear();
                customercoverage.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());
                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                customercoverage = GetData("sp_RegionDistributorBrickSale", nv);


                #endregion

                if (customercoverage != null)
                {
                    if (customercoverage.Tables[0].Rows.Count > 0)
                    {
                        result = customercoverage.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }

        //sp_ZoneWiseBrickSale
        [WebMethod]
        public string ZoneBrickWise(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var customercoverage = new System.Data.DataSet();
                nv.Clear();
                customercoverage.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());
                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                customercoverage = GetData("sp_ZoneWiseBrickSale", nv);


                #endregion

                if (customercoverage != null)
                {
                    if (customercoverage.Tables[0].Rows.Count > 0)
                    {
                        result = customercoverage.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }


        //sp_DistributorWiseSale
        [WebMethod]
        public string DistributorWiseSale(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var distributor = new System.Data.DataSet();
                nv.Clear();
                distributor.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());
                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                distributor = GetData("sp_DistributorWiseSale", nv);


                #endregion

                if (distributor != null)
                {
                    if (distributor.Tables[0].Rows.Count > 0)
                    {
                        result = distributor.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }

        [WebMethod]
        public string DistributorbrickWiseSale(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var distributor = new System.Data.DataSet();
                nv.Clear();
                distributor.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());
                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                distributor = GetData("sp_DistributorWiseBrickSale", nv);


                #endregion

                if (distributor != null)
                {
                    if (distributor.Tables[0].Rows.Count > 0)
                    {
                        result = distributor.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }

        //[sp_ProductWiseBrickSale]
        [WebMethod]
        public string ProductbrickWiseSale(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var distributor = new System.Data.DataSet();
                nv.Clear();
                distributor.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());
                nv.Add("@DistributorID-int", DistributorID.ToString());
                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                distributor = GetData("sp_ProductWiseBrickSale", nv);


                #endregion

                if (distributor != null)
                {
                    if (distributor.Tables[0].Rows.Count > 0)
                    {
                        result = distributor.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }

        [WebMethod]
        public string ProductWiseSale(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var distributor = new System.Data.DataSet();
                nv.Clear();
                distributor.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());
                nv.Add("@DistributorID-int", DistributorID.ToString());
                nv.Add("@BrickID-int", BrickID.ToString());
                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                distributor = GetData("sp_ProductWiseSale", nv);


                #endregion

                if (distributor != null)
                {
                    if (distributor.Tables[0].Rows.Count > 0)
                    {
                        result = distributor.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }

        //[sp_Saleallcount]
        [WebMethod]
        public string AllSaleCount(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, int EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var distributor = new System.Data.DataSet();
                nv.Clear();
                distributor.Clear();
                int year = 0, month = 0, endmonth = 0;

                int employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt32(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString() == "null" ? "-1" : Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());
                nv.Add("@DistributorID-int", DistributorID.ToString());
                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                distributor = GetData("sp_Saleallcount", nv);


                #endregion

                if (distributor != null)
                {
                    if (distributor.Tables[0].Rows.Count > 0)
                    {
                        result = distributor.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }


        //sp_AllBrickProductSale
        [WebMethod]
        public string AllProductWiseSale(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var distributor = new System.Data.DataSet();
                nv.Clear();
                distributor.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());
                nv.Add("@DistributorID-int", DistributorID.ToString());
                nv.Add("@BrickID-int", BrickID.ToString());
                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                distributor = GetData("sp_AllBrickProductSale", nv);


                #endregion

                if (distributor != null)
                {
                    if (distributor.Tables[0].Rows.Count > 0)
                    {
                        result = distributor.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }

        //[sp_ClientWiseBrickSale]
        [WebMethod]
        public string ClientbrickWiseSale(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var distributor = new System.Data.DataSet();
                nv.Clear();
                distributor.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());

                nv.Add("@DistributorID-int", DistributorID.ToString());
                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                distributor = GetData("sp_ClientWiseBrickSale", nv);


                #endregion

                if (distributor != null)
                {
                    if (distributor.Tables[0].Rows.Count > 0)
                    {
                        result = distributor.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }

        //[sp_Top10brickWiseSale]
        [WebMethod]
        public string toptenbrickWiseSale(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string EmployeeId, string ProductId, string SkuId)
        {
            string result = string.Empty;
            try
            {
                #region Initialize

                var distributor = new System.Data.DataSet();
                nv.Clear();
                distributor.Clear();
                int year = 0, month = 0, endmonth = 0;

                double employeeId = 0;

                if (Level6 != "0")
                {
                    employeeId = Convert.ToInt64(EmployeeId);
                }
                else
                {
                    employeeId = 0;
                }

                #endregion

                #region Set Year + Month

                if (date != "")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                }
                else
                {
                    year = DateTime.Now.Year;
                    month = DateTime.Now.Month;
                }



                #endregion

                #region Filter By Role

                nv.Add("@Level1id-int", Level1.ToString());
                nv.Add("@Level2id-int", Level2.ToString());
                nv.Add("@Level3id-int", Level3.ToString());
                nv.Add("@Level4id-int", Level4.ToString());
                nv.Add("@Level5id-int", Level5.ToString());
                nv.Add("@Level6id-int", Level6.ToString());
                nv.Add("@ProductId-int", ProductId.ToString());
                nv.Add("@SkuId-int", SkuId.ToString());

                nv.Add("@DistributorID-int", DistributorID.ToString());
                nv.Add("@EmployeeId-int", employeeId.ToString());
                nv.Add("@Month-int", Convert.ToString(month));
                nv.Add("@Year-int", Convert.ToString(year));

                distributor = GetData("sp_Top10brickWiseSale", nv);


                #endregion

                if (distributor != null)
                {
                    if (distributor.Tables[0].Rows.Count > 0)
                    {
                        result = distributor.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {

            }
            return result;
        }
    }
}
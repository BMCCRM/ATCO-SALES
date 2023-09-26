using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace PocketDCR2.BWSD
{
    /// <summary>
    /// Summary description for SaleReport1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SaleReport1 : System.Web.Services.WebService
    {
        #region Database Layer

        public System.Data.DataSet GetData(String SpName, NameValueCollection NV)
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
                            dbTyper = "SqlDbType." + arraySplit[1].ToString() + "," + arraySplit[2].ToString();

                            if (NV[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = DBNull.Value;
                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
                            }
                        }
                        else
                        {
                            dbTyper = "SqlDbType." + arraySplit[1].ToString();

                            if (NV[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = DBNull.Value;
                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
                            }
                        }
                    }
                }

                var dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = command;
                dataAdapter.Fill(dataSet);

                return dataSet;
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
                Constants.ErrorLog("Exception Raising From DAL In NewReport.aspx | " + exception.Message + " | Stack Trace : |" + exception.StackTrace + "|| Procedure Name :" + SpName);

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

        #endregion

        private NameValueCollection _nvCollection = new NameValueCollection();

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetNationalWiseBrickSale(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string EmployeeId)
        {

            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nvCollection.Clear();

                _nvCollection.Add("@Level1id-int", Level1.ToString());
                _nvCollection.Add("@Level2id-int", Level2.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());//$('#ddlPro').val() == "-1" ? "0" : $('#ddlPro').val()
                _nvCollection.Add("@DistributorID-int", (DistributorID.ToString() == "-1" ? "0" : DistributorID.ToString()));
                _nvCollection.Add("@BrickID-int", (BrickID.ToString() == "-1" ? "0" : BrickID.ToString()));
                _nvCollection.Add("@EmployeeId-int", EmployeeId.ToString());
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@Year-int", Convert.ToString(year));


                // DataSet ds = GetData("sp_NationalWiseBrickSaleReport", _nvCollection);
                DataSet ds = GetData("sp_NationalWiseBrickSaleProductReport_New", _nvCollection);

                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetSPOWiseSalesReport(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string EmployeeId)//string DistributorID, string BrickID,
        {

            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nvCollection.Clear();

                _nvCollection.Add("@Level1id-int", Level1.ToString());
                _nvCollection.Add("@Level2id-int", Level2.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());
                _nvCollection.Add("@EmpID-int", EmployeeId.ToString());
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                DataSet ds = GetData("sp_GetSPOWiseSaleReport", _nvCollection);

                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetTMDoctorsSalesReport(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string EmployeeId, string DoctorCode)
        {

            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nvCollection.Clear();
                _nvCollection.Add("@Level1Id-VARCHAR(MAX)", Level1.ToString());
                _nvCollection.Add("@Level2Id-VARCHAR(MAX)", Level2.ToString());
                _nvCollection.Add("@Level3Id-VARCHAR(MAX)", Level3.ToString());
                _nvCollection.Add("@Level4Id-VARCHAR(MAX)", Level4.ToString());
                _nvCollection.Add("@Level5Id-VARCHAR(MAX)", Level5.ToString());
                _nvCollection.Add("@Level6Id-VARCHAR(MAX)", Level6.ToString());
                _nvCollection.Add("@EmpID-int", EmployeeId.ToString());
                _nvCollection.Add("@DocID-int", DoctorCode.ToString());
                _nvCollection.Add("@date-date", year + "-" + month + "-01");

                DataSet ds = GetData("SP_CustomerMappedWithDoctorsSalesReport", _nvCollection);

                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }



        //----------------------------------------------------- coment By faraz ----------------------------------------------------------------------------//


        //[WebMethod(EnableSession = true)]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string GetCustomerWiseSale(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string ClientID, string EmployeeId)
        //{

        //    string returnstring = "";
        //    int year = 0, month = 0;
        //    try
        //    {
        //        year = Convert.ToDateTime(date).Year;
        //        month = Convert.ToDateTime(date).Month;

        //        _nvCollection.Clear();

        //        _nvCollection.Add("@Level1id-int", Level1.ToString());
        //        _nvCollection.Add("@Level2id-int", Level2.ToString());
        //        _nvCollection.Add("@Level3id-int", Level3.ToString());
        //        _nvCollection.Add("@Level4id-int", Level4.ToString());
        //        _nvCollection.Add("@Level5id-int", Level5.ToString());
        //        _nvCollection.Add("@Level6id-int", Level6.ToString());//$('#ddlPro').val() == "-1" ? "0" : $('#ddlPro').val()
        //        _nvCollection.Add("@DistributorID-int", (DistributorID.ToString() == "-1" ? "0" : DistributorID.ToString()));
        //        _nvCollection.Add("@BrickID-int", (BrickID.ToString() == "-1" ? "0" : BrickID.ToString()));
        //        _nvCollection.Add("@EmployeeId-int", EmployeeId.ToString());
        //        _nvCollection.Add("@ClientId-int", (ClientID.ToString() == "-1" ? "0" : ClientID.ToString()));
        //        _nvCollection.Add("@Month-int", Convert.ToString(month));
        //        _nvCollection.Add("@Year-int", Convert.ToString(year));


        //        // DataSet ds = GetData("sp_NationalWiseBrickSaleReport", _nvCollection);
        //        DataSet ds = GetData("sp_CustomerProductSaleReport_New", _nvCollection);

        //        returnstring = ds.Tables[0].ToJsonString();
        //    }
        //    catch (Exception ex)
        //    {
        //        returnstring = ex.ToString();
        //    }
        //    return returnstring;

        //}




        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCityWiseSale(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string EmployeeId)
        {

            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nvCollection.Clear();


                _nvCollection.Add("@DistId-int", (DistributorID.ToString() == "-1" ? "0" : DistributorID.ToString()));
                _nvCollection.Add("@Date-date", year + "-" + month + "-" + "01");

                DataSet ds = GetData("sp_GetCityWiseSale", _nvCollection);

                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetTopSKUSale(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string EmployeeId)
        {

            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nvCollection.Clear();


                _nvCollection.Add("@DistId-int", (DistributorID.ToString() == "-1" ? "0" : DistributorID.ToString()));
                _nvCollection.Add("@Date-date", year + "-" + month + "-" + "01");

                DataSet ds = GetData("sp_GetTopSKUSale", _nvCollection);

                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetRangeSaleUnit(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string EmployeeId)
        {

            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nvCollection.Clear();


                _nvCollection.Add("@DistId-int", (DistributorID.ToString() == "-1" ? "0" : DistributorID.ToString()));
                _nvCollection.Add("@Date-date", year + "-" + month + "-" + "01");

                DataSet ds = GetData("sp_GetRangeWiseSaleUnit", _nvCollection);

                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }




        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetRangeSaleValue(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string EmployeeId)
        {

            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nvCollection.Clear();


                _nvCollection.Add("@DistId-int", (DistributorID.ToString() == "-1" ? "0" : DistributorID.ToString()));
                _nvCollection.Add("@Date-date", year + "-" + month + "-" + "01");

                DataSet ds = GetData("sp_GetRangeWiseSaleValue", _nvCollection);

                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetProductSaleUnit(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string ClientID, string EmployeeId)
        {

            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nvCollection.Clear();

                _nvCollection.Add("@Level1id-int", Level1.ToString());
                _nvCollection.Add("@Level2id-int", Level2.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());
                _nvCollection.Add("@EmployeeId-int", EmployeeId.ToString());
                _nvCollection.Add("@DistId-int", (DistributorID.ToString() == "-1" ? "0" : DistributorID.ToString()));
                _nvCollection.Add("@BrickID-int", (BrickID.ToString() == "-1" ? "0" : BrickID.ToString()));
                _nvCollection.Add("@ClientId-int", (ClientID.ToString() == "-1" ? "0" : ClientID.ToString()));
                _nvCollection.Add("@date-date", year + "-" + month + "-01");



                DataSet ds = GetData("sp_GetSKUWiseSaleUnit_New", _nvCollection);

                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }




        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetProductSaleValue(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string ClientID, string EmployeeId)
        {

            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nvCollection.Clear();


                _nvCollection.Add("@Level1id-int", Level1.ToString());
                _nvCollection.Add("@Level2id-int", Level2.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());
                _nvCollection.Add("@EmployeeId-int", EmployeeId.ToString());
                _nvCollection.Add("@DistId-int", (DistributorID.ToString() == "-1" ? "0" : DistributorID.ToString()));
                _nvCollection.Add("@BrickID-int", (BrickID.ToString() == "-1" ? "0" : BrickID.ToString()));
                _nvCollection.Add("@ClientId-int", (ClientID.ToString() == "-1" ? "0" : ClientID.ToString()));
                _nvCollection.Add("@date-date", year + "-" + month + "-01");


                DataSet ds = GetData("sp_GetSKUWiseSaleValue_New", _nvCollection);

                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetMTDCurrentLastMonthSale(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string EmployeeId)
        {

            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nvCollection.Clear();


                _nvCollection.Add("@DistId-int", (DistributorID.ToString() == "-1" ? "0" : DistributorID.ToString()));
                _nvCollection.Add("@Date-date", year + "-" + month + "-" + "01");

                DataSet ds = GetData("sp_GetCurrentLastMonthSaleReport", _nvCollection);

                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCurrentMonthSaleValue(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string EmployeeId)
        {

            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nvCollection.Clear();


                _nvCollection.Add("@DistId-int", (DistributorID.ToString() == "-1" ? "0" : DistributorID.ToString()));
                _nvCollection.Add("@Date-date", year + "-" + month + "-" + "01");

                DataSet ds = GetData("sp_GetCurrentMonthSaleReport", _nvCollection);

                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDailySale(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string ClientID, string EmployeeId)
        {

            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nvCollection.Clear();

                _nvCollection.Add("@Level1id-int", Level1.ToString());
                _nvCollection.Add("@Level2id-int", Level2.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());
                _nvCollection.Add("@EmployeeId-int", EmployeeId.ToString());
                _nvCollection.Add("@DistId-int", (DistributorID.ToString() == "-1" ? "0" : DistributorID.ToString()));
                _nvCollection.Add("@BrickID-int", (BrickID.ToString() == "-1" ? "0" : BrickID.ToString()));
                _nvCollection.Add("@ClientId-int", (ClientID.ToString() == "-1" ? "0" : ClientID.ToString()));
                _nvCollection.Add("@date-date", year + "-" + month + "-01");

                //sp_GetDailySaleReport
                DataSet ds = GetData("sp_GetDailySaleReport_New", _nvCollection);

                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }



        //------------------------------------------------ Get All Product Data ----------------------------------------------------------------------

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetSummaryProductSale(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string ClientID, string EmployeeId)
        {

            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nvCollection.Clear();

                _nvCollection.Add("@Level1id-int", Level1.ToString());
                _nvCollection.Add("@Level2id-int", Level2.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());//$('#ddlPro').val() == "-1" ? "0" : $('#ddlPro').val()
                _nvCollection.Add("@DistributorID-int", (DistributorID.ToString() == "-1" ? "0" : DistributorID.ToString()));
                _nvCollection.Add("@BrickID-int", (BrickID.ToString() == "-1" ? "0" : BrickID.ToString()));
                _nvCollection.Add("@ClientId-int", (ClientID.ToString() == "-1" ? "0" : ClientID.ToString()));
                _nvCollection.Add("@EmployeeId-int", EmployeeId.ToString());
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@Year-int", Convert.ToString(year));


                // DataSet ds = GetData("sp_NationalWiseBrickSaleReport", _nvCollection);
                DataSet ds = GetData("sp_ProductSaleSummaryReport_New", _nvCollection);

                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }






        //[WebMethod(EnableSession = true)]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string GetCustomerWiseDailySale(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string ClientID, string EmployeeId)
        //{

        //    string returnstring = "";
        //    int year = 0, month = 0;
        //    try
        //    {
        //        year = Convert.ToDateTime(date).Year;
        //        month = Convert.ToDateTime(date).Month;

        //        _nvCollection.Clear();

        //        _nvCollection.Add("@Level1id-int", Level1.ToString());
        //        _nvCollection.Add("@Level2id-int", Level2.ToString());
        //        _nvCollection.Add("@Level3id-int", Level3.ToString());
        //        _nvCollection.Add("@Level4id-int", Level4.ToString());
        //        _nvCollection.Add("@Level5id-int", Level5.ToString());
        //        _nvCollection.Add("@Level6id-int", Level6.ToString());
        //        _nvCollection.Add("@EmployeeId-int", EmployeeId.ToString());
        //        _nvCollection.Add("@DistId-int", (DistributorID.ToString() == "-1" ? "0" : DistributorID.ToString()));
        //        _nvCollection.Add("@BrickID-int", (BrickID.ToString() == "-1" ? "0" : BrickID.ToString()));
        //        _nvCollection.Add("@ClientId-int", (ClientID.ToString() == "-1" ? "0" : ClientID.ToString()));
        //        _nvCollection.Add("@date-date", year + "-" + month + "-01");

        //        //sp_GetDailySaleReport
        //        DataSet ds = GetData("sp_GetCustomerWiseDailySaleReport_New", _nvCollection);

        //        returnstring = ds.Tables[0].ToJsonString();
        //    }
        //    catch (Exception ex)
        //    {
        //        returnstring = ex.ToString();
        //    }
        //    return returnstring;

        //}



        //[sp_ClientWiseBrickSaleReport]

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetClientWiseBrickSale(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string ClientID, string EmployeeId)
        {

            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nvCollection.Clear();

                _nvCollection.Add("@Level1id-int", Level1.ToString());
                _nvCollection.Add("@Level2id-int", Level2.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());
                _nvCollection.Add("@DistributorID-int", DistributorID.ToString());
                _nvCollection.Add("@BrickID-int", BrickID.ToString());//@ClientID
                _nvCollection.Add("@ClientID-int", ClientID.ToString());
                _nvCollection.Add("@EmployeeId-int", EmployeeId.ToString());
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@Year-int", Convert.ToString(year));


                DataSet ds = GetData("sp_ClientWiseBrickSaleReport", _nvCollection);
                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetIncentiveSaleReport(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string EmployeeId)
        {

            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nvCollection.Clear();

                _nvCollection.Add("@Level1id-int", Level1.ToString());
                _nvCollection.Add("@Level2id-int", Level2.ToString());
                _nvCollection.Add("@Level3id-int", Level3.ToString());
                _nvCollection.Add("@Level4id-int", Level4.ToString());
                _nvCollection.Add("@Level5id-int", Level5.ToString());
                _nvCollection.Add("@Level6id-int", Level6.ToString());//$('#ddlPro').val() == "-1" ? "0" : $('#ddlPro').val()
                _nvCollection.Add("@DistributorID-int", (DistributorID.ToString() == "-1" ? "0" : DistributorID.ToString()));
                _nvCollection.Add("@BrickID-int", (BrickID.ToString() == "-1" ? "0" : BrickID.ToString()));
                _nvCollection.Add("@EmployeeId-int", EmployeeId.ToString());
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@Year-int", Convert.ToString(year));


                DataSet ds = GetData("sp_IncentiveSaleReport", _nvCollection);
                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetTeamWiseStockReport(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string EmployeeId)
        {

            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nvCollection.Clear();

                //_nvCollection.Add("@Level1id-int", Level1.ToString());
                //_nvCollection.Add("@Level2id-int", Level2.ToString());
                //_nvCollection.Add("@Level3id-int", Level3.ToString());
                //_nvCollection.Add("@Level4id-int", Level4.ToString());
                //_nvCollection.Add("@Level5id-int", Level5.ToString());
                //_nvCollection.Add("@Level6id-int", Level6.ToString());
                _nvCollection.Add("@DistributorID-int", DistributorID.ToString());
                //_nvCollection.Add("@BrickID-int", BrickID.ToString());//@ClientID
                //_nvCollection.Add("@ClientID-int", "0".ToString());
                //_nvCollection.Add("@EmployeeId-int", EmployeeId.ToString());
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                _nvCollection.Add("@Year-int", Convert.ToString(year));


                DataSet ds = GetData("sp_TeamWiseStockReport", _nvCollection);
                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetBrickToProductSalesReport(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string EmployeeId, string TeamID)
        {

            string returnstring = "";

            try
            {

                _nvCollection.Clear();

                _nvCollection.Add("@Level1-var", Level1);
                _nvCollection.Add("@Level2-var", Level2);
                _nvCollection.Add("@Level3-var", Level3);
                _nvCollection.Add("@Level4-var", Level4);
                _nvCollection.Add("@Level5-var", Level5);
                _nvCollection.Add("@Level6-var", Level6);
                _nvCollection.Add("@Date-var", DateTime.Parse("1-" + date).Date.ToShortDateString());
                _nvCollection.Add("@TeamID-var", TeamID);

                DataSet ds = GetData("sp_BrickToProductSalesReport", _nvCollection);
                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }

            return returnstring;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetProductsSalesPerPharmacy(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string EmployeeId, string TeamID)
        {

            string returnstring = "";

            try
            {

                _nvCollection.Clear();

                _nvCollection.Add("@Level1-var", Level1);
                _nvCollection.Add("@Level2-var", Level2);
                _nvCollection.Add("@Level3-var", Level3);
                _nvCollection.Add("@Level4-var", Level4);
                _nvCollection.Add("@Level5-var", Level5);
                _nvCollection.Add("@Level6-var", Level6);
                _nvCollection.Add("@Date-var", DateTime.Parse("1-" + date).Date.ToShortDateString());
                _nvCollection.Add("@TeamID-var", TeamID);

                DataSet ds = GetData("sp_GetProductsSalesPerPharmacy", _nvCollection);
                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }

            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DistributorProfileReport()
        {

            string returnstring = "";

            try
            {

                _nvCollection.Clear();
                //_nvCollection.Add("@Level1-var", Level1);
                //_nvCollection.Add("@Level2-var", Level2);
                //_nvCollection.Add("@Level3-var", Level3);
                //_nvCollection.Add("@Level4-var", Level4);
                //_nvCollection.Add("@Level5-var", Level5);
                //_nvCollection.Add("@Level6-var", Level6);
                //_nvCollection.Add("@Date-var", DateTime.Parse("1-" + date).Date.ToShortDateString());
                //_nvCollection.Add("@TeamID-var", TeamID);
                DataSet ds = GetData("sp_DistributerProfiling", _nvCollection);
                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }

            return returnstring;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetLocalVsUpcountryReport(string date, string Level1, string Level2, string Level3, string Level4, string Level5, string Level6, string DistributorID, string BrickID, string EmployeeId, string TeamID)
        {

            string returnstring = "";

            try
            {

                _nvCollection.Clear();

                _nvCollection.Add("@Level1-var", Level1);
                _nvCollection.Add("@Level2-var", Level2);
                _nvCollection.Add("@Level3-var", Level3);
                _nvCollection.Add("@Level4-var", Level4);
                _nvCollection.Add("@Level5-var", Level5);
                _nvCollection.Add("@Level6-var", Level6);
                _nvCollection.Add("@Date-var", DateTime.Parse("1-" + date).Date.ToShortDateString());
                _nvCollection.Add("@TeamID-var", TeamID);

                DataSet ds = GetData("sp_GetLocalVsUpcountryReport", _nvCollection);
                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }

            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCustomersUnits(string date, string DistId, string BrickId, string ClientId, string TeamID)
        {
            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;

                _nvCollection.Clear();

                _nvCollection.Add("@DistId-int", (DistId.ToString() == "-1" ? "0" : DistId.ToString()));
                _nvCollection.Add("@BrickId-int", (BrickId.ToString() == "-1" ? "0" : BrickId.ToString()));
                _nvCollection.Add("@ClientId-int", (ClientId.ToString() == "-1" ? "0" : ClientId.ToString()));
                _nvCollection.Add("@TeamId-int", (TeamID.ToString() == "-1" ? "0" : TeamID.ToString()));
                //_nvCollection.Add("@date-int", Convert.ToString(month));
                _nvCollection.Add("@date-int", Convert.ToString(year));
                DataSet ds = GetData("sp_NewCustomerWiseSalesReport", _nvCollection);
                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }




        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllBricksAllocated(string empid,string DistId,string level)
        {
            string returnstring = "";
            try
            {
                _nvCollection.Clear();


                if (level == "6")
                {
                    _nvCollection.Add("@distributorId-int", (DistId.ToString() == "-1" ? null : DistId.ToString()));
                    _nvCollection.Add("@level4Id-int", (null));
                    _nvCollection.Add("@level5Id-int", (null));
                    _nvCollection.Add("@level6Id-int", (empid));
                   
                   

                }
               else if (level == "5")
                {
                    _nvCollection.Add("@distributorId-int", (DistId.ToString() == "-1" ? null : DistId.ToString()));
                    _nvCollection.Add("@level4Id-int", (null));
                    _nvCollection.Add("@level5Id-int", (empid));
                    _nvCollection.Add("@level6Id-int", (null));

                }
                else
                {

                    _nvCollection.Add("@distributorId-int", (DistId.ToString() == "-1" ? null : DistId.ToString()));
                    _nvCollection.Add("@level4Id-int", (empid));
                    _nvCollection.Add("@level5Id-int", (null));
                    _nvCollection.Add("@level6Id-int", (null));


                }

                DataSet ds = GetData("sp_GetBrickAllocatedData", _nvCollection);
                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }










        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetUploaded(string date)
        {
            string returnstring = "";
            int year = 0, month = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;
                _nvCollection.Clear();
                _nvCollection.Add("@Year-int", Convert.ToString(year));
                _nvCollection.Add("@Month-int", Convert.ToString(month));
                DataSet ds = GetData("sp_DistributorFileUploadUpdates", _nvCollection);
                returnstring = ds.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }

    }
}

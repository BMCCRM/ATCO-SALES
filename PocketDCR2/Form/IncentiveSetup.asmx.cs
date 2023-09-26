using System;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;
using System.Data.SqlClient;
using System.Collections.Specialized;
using System.Collections.Generic;
using System.Data;
namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for IncentiveSetup1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class IncentiveSetup1 : System.Web.Services.WebService
    {

        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        NameValueCollection nv = new NameValueCollection();
        DAL dl = new DAL();

        #endregion



        #region Pubic Functions



        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertNonConfirmData(List<string> GroupAchievement, List<string> ZeroAchievement, string status, string year)
        {
            string returnString = "";

            try
            {
                int iterator = 7;
                DateTime today = DateTime.Today;
                int currentMonth = today.Month;
                int currentYear = today.Year;
                int oldYear = today.Year;


                string validation = string.Empty;
                string id = string.Empty;
                for (int i = 0; i < 12; i++)
                {
                    if (iterator > 12)
                    {
                        iterator = 1;
                        oldYear = Convert.ToInt32(year);
                        year = (Convert.ToInt32(year) + 1).ToString();

                    }


                    nv.Clear();
                    nv.Add("@Month-int", iterator.ToString());
                    nv.Add("@Year-int", year);
                    nv.Add("@Status-int", status);
                    DataSet dss = dl.GetData("sp_ValidateUporIN", nv);

                    if (dss.Tables[0].Rows.Count > 0)
                    {

                        validation = dss.Tables[0].Rows[0]["message"].ToString();
                        id = dss.Tables[0].Rows[0]["id"].ToString();

                    }



                    if (validation == "Insert")
                    {
                        if (iterator >= currentMonth)
                        {
                            nv.Clear();

                            nv.Add("Month-int", iterator.ToString());
                            nv.Add("Year-int", year);
                            nv.Add("Group-int", GroupAchievement[i].ToString());
                            nv.Add("ZeroAchievement-int", ZeroAchievement[i].ToString());
                            nv.Add("Status-int", status);
                            DataSet ds = dl.GetData("InsertIncentivePolicyForNC", nv);

                            if (ds.Tables[0].Rows.Count > 0)
                            {

                                returnString = ds.Tables[0].Rows[0][0].ToString();

                            }

                        }
                        else
                        {

                            if (Convert.ToInt32(year) > oldYear)
                            {
                                nv.Clear();

                                nv.Add("@Month-int", iterator.ToString());
                                nv.Add("@Year-int", year);
                                nv.Add("@Group-int", GroupAchievement[i].ToString());
                                nv.Add("@ZeroAchievement-int", ZeroAchievement[i].ToString());
                                nv.Add("@Status-int", status);
                                DataSet ds = dl.GetData("InsertIncentivePolicyForNC", nv);

                                if (ds.Tables[0].Rows.Count > 0)
                                {

                                    returnString = ds.Tables[0].Rows[0][0].ToString();

                                }
                            }


                        }
                    }
                    else
                    {
                        if (iterator >= currentMonth)
                        {
                            nv.Clear();

                            nv.Add("Month-int", iterator.ToString());
                            nv.Add("Year-int", year);
                            nv.Add("Group-int", GroupAchievement[i].ToString());
                            nv.Add("ZeroAchievement-int", ZeroAchievement[i].ToString());
                            nv.Add("@id-int", id);

                            DataSet ds = dl.GetData("updateIncentivepolicyFORNC", nv);

                            if (ds.Tables[0].Rows.Count > 0)
                            {

                                returnString = ds.Tables[0].Rows[0][0].ToString();

                            }

                        }
                        else
                        {

                            if (Convert.ToInt32(year) > oldYear)
                            {
                                nv.Clear();

                                nv.Add("@Month-int", iterator.ToString());
                                nv.Add("@Year-int", year);
                                nv.Add("@Group-int", GroupAchievement[i].ToString());
                                nv.Add("@ZeroAchievement-int", ZeroAchievement[i].ToString());
                                nv.Add("@id-int", id);

                                DataSet ds = dl.GetData("updateIncentivepolicyFORNC", nv);

                                if (ds.Tables[0].Rows.Count > 0)
                                {

                                    returnString = ds.Tables[0].Rows[0][0].ToString();

                                }


                            }


                        }
                    }


                    iterator++;

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
        public string InsertConfirmData(List<string> GroupAchievement, List<string> ZeroAchievement, List<string> HalfAchievement, List<string> FullAchievement, string status, string year)
        {
            string returnString = "";

            try
            {
                int iterator = 7;
                DateTime today = DateTime.Today;
                int currentMonth = today.Month;
                int currentYear = today.Year;

                int oldYear = today.Year;
                string validation = string.Empty;
                string id = string.Empty;
                for (int i = 0; i < 12; i++)
                {
                    if (iterator > 12)
                    {
                        iterator = 1;
                        oldYear = Convert.ToInt32(year);
                        year = (Convert.ToInt32(year) + 1).ToString();

                    }


                    nv.Clear();
                    nv.Add("@Month-int", iterator.ToString());
                    nv.Add("@Year-int", year);
                    nv.Add("@Status-int", status);
                    DataSet dss = dl.GetData("sp_ValidateUporIN", nv);
                    if (dss.Tables.Count > 0)
                    {
                        if (dss.Tables[0].Rows.Count > 0)
                        {

                            validation = dss.Tables[0].Rows[0]["message"].ToString();
                            id = dss.Tables[0].Rows[0]["id"].ToString();

                        }


                    }





                    if (validation == "Insert")
                    {

                        if (iterator >= currentMonth)
                        {

                            nv.Clear();
                            nv.Add("@Month-int", iterator.ToString());
                            nv.Add("@Year-int", year);
                            nv.Add("@Group-int", GroupAchievement[i].ToString());
                            nv.Add("@ZeroAchievement-int", ZeroAchievement[i].ToString());
                            nv.Add("@FullAchievement-int", FullAchievement[i].ToString());
                            nv.Add("@HalfAchievement-int", HalfAchievement[i].ToString());
                            nv.Add("@Status-int", status);
                            DataSet ds = dl.GetData("InsertIncentivePolicyForC", nv);

                            if (ds.Tables[0].Rows.Count > 0)
                            {

                                returnString = ds.Tables[0].Rows[0][0].ToString();

                            }




                        }
                        else
                        {

                            if (Convert.ToInt32(year) > oldYear)
                            {
                                nv.Clear();

                                nv.Add("@Month-int", iterator.ToString());
                                nv.Add("@Year-int", year);
                                nv.Add("@Group-int", GroupAchievement[i].ToString());
                                nv.Add("@ZeroAchievement-int", ZeroAchievement[i].ToString());
                                nv.Add("@FullAchievement-int", FullAchievement[i].ToString());
                                nv.Add("@HalfAchievement-int", HalfAchievement[i].ToString());
                                nv.Add("@Status-int", status);
                                DataSet ds = dl.GetData("InsertIncentivePolicyForC", nv);

                                if (ds.Tables[0].Rows.Count > 0)
                                {

                                    returnString = ds.Tables[0].Rows[0][0].ToString();

                                }
                            }


                        }

                    }
                    else
                    {
                        if (iterator >= currentMonth)
                        {
                            nv.Clear();

                            nv.Add("@Month-int", iterator.ToString());
                            nv.Add("@Year-int", year);
                            nv.Add("@Group-int", GroupAchievement[i].ToString());
                            nv.Add("@ZeroAchievement-int", ZeroAchievement[i].ToString());
                            nv.Add("@FullAchievement-int", FullAchievement[i].ToString());
                            nv.Add("@HalfAchievement-int", HalfAchievement[i].ToString());
                            nv.Add("@id-int", id);
                            DataSet ds = dl.GetData("updateIncentivepolicyFORC", nv);

                            if (ds.Tables[0].Rows.Count > 0)
                            {

                                returnString = ds.Tables[0].Rows[0][0].ToString();

                            }

                        }
                        else
                        {

                            if (Convert.ToInt32(year) > oldYear)
                            {
                                nv.Clear();

                                nv.Add("@Month-int", iterator.ToString());
                                nv.Add("@Year-int", year);
                                nv.Add("@Group-int", GroupAchievement[i].ToString());
                                nv.Add("@ZeroAchievement-int", ZeroAchievement[i].ToString());
                                nv.Add("@FullAchievement-int", FullAchievement[i].ToString());
                                nv.Add("@HalfAchievement-int", HalfAchievement[i].ToString());
                                nv.Add("@id-int", id);
                                DataSet ds = dl.GetData("updateIncentivepolicyFORC", nv);

                                if (ds.Tables[0].Rows.Count > 0)
                                {

                                    returnString = ds.Tables[0].Rows[0][0].ToString();

                                }
                            }


                        }


                    }








                    iterator++;

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
        public string GetPolicies(string year, string status)
        {
            string resultstring = string.Empty;

            string incyear = (Convert.ToInt32(year) + 1).ToString();

            try
            {
                nv.Clear();
                nv.Add("@incyear-int", incyear);
                nv.Add("@year-int", year);
                nv.Add("@status-int", status);
                DataSet ds = dl.GetData("getincentivepolicies", nv);

                if (ds.Tables.Count > 0)
                {

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        List<Dictionary<string, object>> dataList = new List<Dictionary<string, object>>();

                        foreach (DataRow row in ds.Tables[0].Rows)
                        {
                            Dictionary<string, object> dataItem = new Dictionary<string, object>();
                            foreach (DataColumn col in ds.Tables[0].Columns)
                            {
                                dataItem.Add(col.ColumnName, row[col]);
                            }
                            dataList.Add(dataItem);
                        }


                        JavaScriptSerializer serializer = new JavaScriptSerializer();

                        resultstring = serializer.Serialize(dataList);
                    }
                }


            }
            catch (Exception ex)
            {

                resultstring = ex.Message;


            }




            return resultstring;

        }








        #endregion


    }
}

using System;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;
using System.Data.SqlClient;
using System.Collections.Specialized;
using System.Data;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for ProductSkuService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ItemMasterService : System.Web.Services.WebService
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

        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        private NameValueCollection _nvCollection = new NameValueCollection();
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        #endregion

        #region Public Functions

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertItemMaster(string ItemCode, string ItemName, string ItemDescription, string ItemCost, bool isActive)
        {
            string returnString = "";
            try
            {
                #region Validate Code

                _nvCollection.Clear();

                _nvCollection.Add("@ItemMasterId-nvarchar(max)", "");
                _nvCollection.Add("@ItemCode-nvarchar(max)", ItemCode);
                _nvCollection.Add("@ItemName-nvarchar(max)", "");


                DataSet ds = GetData("sp_ItemMasterSelect", _nvCollection);

                _nvCollection.Clear();

                _nvCollection.Add("@ItemMasterId-nvarchar(max)", "");
                _nvCollection.Add("@ItemCode-nvarchar(max)", "");
                _nvCollection.Add("@ItemName-nvarchar(max)", ItemName);


                DataSet ds1 = GetData("sp_ItemMasterSelect", _nvCollection);
                

                #endregion

                if (ds.Tables[0].Rows.Count != 0)
                {
                    returnString = "Duplicate Code!";
                }
                else if (ds1.Tables[0].Rows.Count != 0)
                {
                    returnString = "Duplicate Item Name!";
                }
                else
                {
                    _nvCollection.Clear();

                    string EmployeeID = Session["CurrentUserId"].ToString();

                    _nvCollection.Add("@ItemCode-nvarchar(max)", ItemCode);
                    _nvCollection.Add("@ItemName-nvarchar(max)", ItemName);
                    _nvCollection.Add("@ItemDescription-nvarchar(max)", ItemDescription);
                    _nvCollection.Add("@ItemCost-nvarchar(max)", ItemCost);
                    _nvCollection.Add("@isActive-nvarchar(max)", isActive.ToString());
                    _nvCollection.Add("@EmployeeID-nvarchar(max)", EmployeeID);
 


                    DataSet ds3 = GetData("sp_ItemMasterInsert", _nvCollection);
                    if (ds3.Tables[0].Rows.Count != 0)
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
        public string GetItem(string ItemMasterId) 
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();

                _nvCollection.Add("@ItemMasterId-nvarchar(max)", ItemMasterId);
                _nvCollection.Add("@ItemCode-nvarchar(max)","");
                _nvCollection.Add("@ItemName-nvarchar(max)", "");


                DataSet ds = GetData("sp_ItemMasterSelect", _nvCollection);
               returnString = ds.Tables[0].ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateItemMaster(string ID,string ItemCode, string ItemName, string ItemDescription, string ItemCost, bool isActive)
        {
            string returnString = "";

            try
            {
                #region Validate Code

                _nvCollection.Clear();

                _nvCollection.Add("@ItemMasterId-nvarchar(max)", ID);
                _nvCollection.Add("@ItemCode-nvarchar(max)", ItemCode);
                _nvCollection.Add("@ItemName-nvarchar(max)", ItemName);


                DataSet ds = GetData("sp_ItemMasterSelect", _nvCollection);


                #endregion

                if (ds.Tables[1].Rows.Count != 0)
                {
                    if (ds.Tables[1].Rows[0][0].ToString() == "1")
                    {
                        returnString = "Duplicate value in ItemCode and ItemName!";
                    }
                }
                if (returnString=="")
                {
                    _nvCollection.Clear();

                    _nvCollection.Add("@ID-nvarchar(max)", ID);
                    _nvCollection.Add("@ItemCode-nvarchar(max)", ItemCode);
                    _nvCollection.Add("@ItemName-nvarchar(max)", ItemName);
                    _nvCollection.Add("@ItemDescription-nvarchar(max)", ItemDescription);
                    _nvCollection.Add("@ItemCost-nvarchar(max)", ItemCost);
                    _nvCollection.Add("@isActive-nvarchar(max)", isActive.ToString());
                 
                    DataSet ds3 = GetData("sp_ItemMasterUpdate", _nvCollection);
                    if (ds3.Tables[0].Rows.Count != 0)
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
        public string DeleteItemMaster(string ID) 
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@ID-nvarchar(max)", ID);
             
                DataSet ds = GetData("sp_ItemMasterDelete", _nvCollection);
                if (ds.Tables[0].Rows.Count != 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }

            }
            catch (SqlException exception)
            {
                //if (exception.Number == 547)
                //{
                //    returnString = "Not able to delete this record due to linkup.";
                //}
                //else
                //{
                    returnString = exception.Message;
                //}
            }

            return returnString;
        }

        #endregion
    }
}

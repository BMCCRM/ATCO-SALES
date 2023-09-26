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
    /// Summary description for Products1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class InstructService : System.Web.Services.WebService
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

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertInstruct(string InstructName, string InstructDescription, string isActive)
        {
            string returnString = "";
            try
            {
                #region Validate Code

                _nvCollection.Clear();
                _nvCollection.Add("@ID-nvarchar(max)", "");
                _nvCollection.Add("@InstructName-nvarchar(max)", InstructName);

                DataSet ds = GetData("sp_InstructSelect", _nvCollection);


                #endregion

                if (ds.Tables[0].Rows.Count != 0)
                {
                    returnString = "Duplicate Instruct Name!";
                }
                else
                {
                    _nvCollection.Clear();


                    _nvCollection.Add("@InstructName-nvarchar(max)", InstructName);
                    _nvCollection.Add("@InstructDescription-nvarchar(max)", InstructDescription);
                    _nvCollection.Add("@isActive-nvarchar(max)", isActive);


                    DataSet ds1 = GetData("sp_InstructInsert", _nvCollection);
                    if (ds1.Tables[0].Rows.Count != 0)
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
        public string GetInstruct(string ID)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();

                _nvCollection.Add("@ID-nvarchar(max)", ID);
                _nvCollection.Add("@InstructName-nvarchar(max)", "");
              
                DataSet ds = GetData("sp_InstructSelect", _nvCollection);
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
        public string UpdateInstruct(string ID, string InstructName, string InstructDescription, string isActive)
        {
            string returnString = "";

            try
            {
                #region Validate Code

                _nvCollection.Clear();

                _nvCollection.Add("@ID-nvarchar(max)", ID);
                _nvCollection.Add("@InstructName-nvarchar(max)", InstructName);

                DataSet ds = GetData("sp_InstructSelect", _nvCollection);

               

                #endregion

                if (ds.Tables[1].Rows.Count != 0)
                {
                    if (ds.Tables[1].Rows[0][0].ToString() == "1")
                    {
                        returnString = "Duplicate Instruct Name!";
                    }
                }
                if (returnString=="")
                
                {
                    _nvCollection.Clear();

                    _nvCollection.Add("@ID-nvarchar(max)", ID);
                    _nvCollection.Add("@InstructName-nvarchar(max)", InstructName);
                    _nvCollection.Add("@InstructDescription-nvarchar(max)", InstructDescription);
                    _nvCollection.Add("@isActive-nvarchar(max)", isActive.ToString());

                    DataSet ds3 = GetData("sp_InstructUpdate", _nvCollection);
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
        public string DeleteInstruct(string ID)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@ID-nvarchar(max)", ID);

                DataSet ds = GetData("sp_InstructDelete", _nvCollection);
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
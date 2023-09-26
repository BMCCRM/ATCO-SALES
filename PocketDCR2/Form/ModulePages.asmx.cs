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

    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]

    public class ModulePages : System.Web.Services.WebService
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

        #region Object Intializtion
        private NameValueCollection _nvCollection = new NameValueCollection();
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        #endregion

        #region Public Functions


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertPageConfiguration(int ModuleMassId, string PageNumber, string PagePath, string Prefix, bool Flag)
        {
            string returnstring = "";
            try
            {
                _nvCollection.Clear();

                _nvCollection.Add("@PageName-nvarchar(50)", PageNumber);
                _nvCollection.Add("@Prefix-nvarchar(50)", Prefix);
                _nvCollection.Add("@PagePath-nvarchar(225)", PagePath);
                _nvCollection.Add("@Flag-bit", Flag.ToString());
                _nvCollection.Add("@Fk_ModuleID-int", ModuleMassId < 1 ? "NULL" : ModuleMassId.ToString());

                DataSet ds = GetData("sp_PageConfigurationInsert", _nvCollection);
                returnstring = ds.Tables[0].Rows[0]["checking"].ToString();
            }
            catch (Exception ex)
            {
                returnstring = ex.ToString();
            }
            return returnstring;

        }

        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string InsertProduct(int ModuleMassId,string Prefix,string PagePath,string Prefix, bool Flag)
        //{
    
        //    string returnString = "";

        //    try
        //    {
        //        //#region Validate Name

        //        //var isValidateName = _dataContext.sp_ProductsSelect(null, productName.Trim()).ToList();

        //        //#endregion

        //        //if (isValidateName.Count != 0)
        //        //{
        //        //    returnString = "Duplicate Name!";
        //        //}
        //        //else
        //        //{
        //        //var insertProduct = _dataContext.sp_PageConfigurationInsert(productName.Trim(), teamId, isActive).ToList();
        //        //    returnString = "OK";
        //        //}
        //    }
        //    catch (Exception exception)
        //    {
        //        returnString = exception.Message;
        //    }

        //    return returnString;
        //}



        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetPageConfiguration(int ID)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@ID-int", @ID.ToString());
                DataSet ds = GetData("sp_GetPageConfiguration", _nvCollection);
                DataTable dt = ds.Tables[0];
                returnString = dt.ToJsonString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdatePageConfiguration(int ID, int ModuleMassId, string PageNumber, string PagePath, string Prefix, bool Flag)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@ID-int", ID.ToString());
                _nvCollection.Add("@PageName-nvarchar(50)", PageNumber);
                _nvCollection.Add("@Prefix-nvarchar(50)", Prefix);
                _nvCollection.Add("@PagePath-nvarchar(225)", PagePath);
                _nvCollection.Add("@Flag-bit", Flag.ToString());
                _nvCollection.Add("@Fk_ModuleID-int", ModuleMassId.ToString());

                DataSet ds = GetData("sp_PageConfigurationUpdate", _nvCollection);
                returnString = ds.Tables[0].Rows[0]["checking"].ToString();
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeletePageConfiguration(int ID)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@ID-int", ID.ToString());
             
                DataSet ds = GetData("sp_PageConfigurationDelete", _nvCollection);
                returnString = ds.Tables[0].Rows[0]["checking"].ToString();
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
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Data;
using System.Collections.Specialized;
using System.Data.SqlClient;

namespace MyCRMServices.Class
{
    public class DAL
    {

        private readonly string ConnectionString = ConfigurationManager.ConnectionStrings["conString"].ConnectionString;

        #region Public Functions

        public DataSet GetData(String SpName, SqlCommand command, Boolean withTable)
        {
            var connection = new SqlConnection();


            try
            {
                connection.ConnectionString = ConnectionString.ToString();
                var dataSet = new System.Data.DataSet();
                connection.Open();


                command.CommandType = CommandType.StoredProcedure;
                command.Connection = connection;
                command.CommandText = SpName;
                command.CommandTimeout = 20000;


                var dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = command;
                dataAdapter.Fill(dataSet);

                return dataSet;
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
                ErrorLog("SPName : " + SpName + " Error: " + exception.Message);
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

        public DataSet GetData(String spName, NameValueCollection nv)
        {
            #region Initialization


            var connection = new SqlConnection();
            string dbTyper = "";

            #endregion

            try
            {
                #region Open Connection

                connection.ConnectionString = ConnectionString.ToString();
                var dataSet = new DataSet();
                connection.Open();




                #endregion

                #region Get Store Procedure and Start Processing

                var command = new SqlCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = connection;
                command.CommandText = spName;
                command.CommandTimeout = 20000;


                if (nv != null)
                {
                    #region Retreiving Data

                    for (int i = 0; i < nv.Count; i++)
                    {
                        string[] arraysplit = nv.Keys[i].Split('-');

                        if (arraysplit.Length > 2)
                        {
                            #region Code For Data Type Length

                            dbTyper = "SqlDbType." + arraysplit[1].ToString() + "," + arraysplit[2].ToString();

                            // command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = nv[i].ToString();



                            if (nv[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = DBNull.Value;

                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = nv[i].ToString();

                            }


                            #endregion
                        }
                        else
                        {
                            #region Code For Int Values
                            dbTyper = "SqlDbType." + arraysplit[1].ToString();
                            // command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = nv[i].ToString();

                            if (nv[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = DBNull.Value;

                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraysplit[0].ToString(), dbTyper).Value = nv[i].ToString();

                            }


                            #endregion
                        }
                    }

                    #endregion
                }

                #endregion

                #region Return DataSet

                var dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = command;
                dataAdapter.Fill(dataSet);

                return dataSet;

                #endregion
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
                ErrorLog("SPName : " + spName + " Error: " + exception.Message);
                return null;
            }
            finally
            {
                #region Close Connection

                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }

                #endregion
            }
        }

        public bool InserData(String SpName, NameValueCollection NV)
        {
            bool Result = true;
            string dbTyper = "";
            //SqlConnection con = new SqlConnection(ConnectionStringValue);
            var connection = new SqlConnection();

            #region Open Connection

            connection.ConnectionString = ConnectionString.ToString();
            var dataSet = new DataSet();
            connection.Open();

            #endregion

            try
            {

                SqlCommand com = new SqlCommand();
                com.CommandType = CommandType.StoredProcedure;
                com.Connection = connection;
                com.CommandTimeout = 20000;
                com.CommandText = SpName;
                for (int i = 0; i < NV.Count; i++)
                {
                    string[] arr = NV.Keys[i].Split('-');
                    if (arr.Length > 2)
                    {

                        //Run the code with datatype length.
                        dbTyper = "SqlDbType." + arr[1].ToString() + "," + arr[2].ToString();

                        if (NV[i].ToString() == "NULL")
                        {
                            com.Parameters.Add(arr[0].ToString(), dbTyper).Value = DBNull.Value;
                        }
                        else
                        {
                            com.Parameters.Add(arr[0].ToString(), dbTyper).Value = NV[i].ToString();
                        }
                    }
                    else
                    {
                        //Run the code for int values
                        dbTyper = "SqlDbType." + arr[1].ToString();

                        if (NV[i].ToString() == "NULL")
                        {
                            com.Parameters.Add(arr[0].ToString(), dbTyper).Value = DBNull.Value;

                        }
                        else
                        {
                            com.Parameters.Add(arr[0].ToString(), dbTyper).Value = NV[i].ToString();
                        }
                    }
                }
                int j = com.ExecuteNonQuery();
                if (j != 0)
                {
                    Result = true;
                }
            }
            catch (Exception ex)
            {
                ErrorLog("SPName : " + SpName + " Error: " + ex.Message);
                Result = false;
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }

            return Result;


        }

        public bool UpdateData(String SpName, NameValueCollection NV)
        {
            bool Result = true;
            string dbTyper = ""; var connection = new SqlConnection();

            #region Open Connection

            connection.ConnectionString = ConnectionString.ToString();
            var dataSet = new DataSet();
            connection.Open();

            #endregion


            try
            {

                SqlCommand com = new SqlCommand();
                com.CommandType = CommandType.StoredProcedure;
                com.Connection = connection;
                com.CommandText = SpName;
                for (int i = 0; i < NV.Count; i++)
                {
                    string[] arr = NV.Keys[i].Split('-');
                    if (arr.Length > 2)
                    {

                        //Run the code with datatype length.
                        dbTyper = "SqlDbType." + arr[1].ToString() + "," + arr[2].ToString();

                        if (NV[i].ToString() == "NULL")
                        {
                            com.Parameters.Add(arr[0].ToString(), dbTyper).Value = DBNull.Value;
                        }
                        else
                        {
                            com.Parameters.Add(arr[0].ToString(), dbTyper).Value = NV[i].ToString();
                        }
                    }
                    else
                    {
                        //Run the code for int values
                        dbTyper = "SqlDbType." + arr[1].ToString();

                        if (NV[i].ToString() == "NULL")
                        {
                            com.Parameters.Add(arr[0].ToString(), dbTyper).Value = DBNull.Value;

                        }
                        else
                        {
                            com.Parameters.Add(arr[0].ToString(), dbTyper).Value = NV[i].ToString();
                        }
                    }
                }
                int j = com.ExecuteNonQuery();
                if (j != 0)
                {
                    Result = true;
                }
            }
            catch (Exception ex)
            {
                Result = false;
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }

            return Result;
        }


        private static void ErrorLog(string error)
        {
            try
            {
                if (!Directory.Exists(ConfigurationManager.AppSettings["MobileService-Logs"].ToString()))
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings["MobileService-Logs"].ToString());
                }

                File.AppendAllText(ConfigurationManager.AppSettings[@"MobileService-Logs\"].ToString() + "DalLog_" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
                    DateTime.Now + " : " + error + Environment.NewLine);
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }


        #endregion
    }
}
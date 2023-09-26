using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Collections.Specialized;
using System.Data.SqlClient;
using System.IO;
using System.Configuration;

namespace SalesDataProcessor.Classes
{
    class DAL
    {
        #region Public Functions

        public DataSet GetData(String spName, NameValueCollection nv)
        {
            #region Initialization

            var connection = new SqlConnection();
            string dbTyper = "";

            #endregion

            try
            {
                #region Open Connection

                connection.ConnectionString = Constants.GetConnectionString();
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


        // OverLoaded Method --Arsal
        public System.Data.DataSet GetData(String SpName, SqlCommand command, Boolean withTable)
        {
            var connection = new SqlConnection();


            try
            {
                connection.ConnectionString = Classes.Constants.GetConnectionString();
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
                Constants.ErrorLog("Error While Dumping Monthly Doctors Sheet Records ::: Error: " + exception.Message);
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


    }


    public class Constants
    {

        private static string _connectionString = ConfigurationManager.AppSettings["ConnectionString"];
        //"";//System.Configuration.ConnectionStrings["PocketDCRConnectionString"].ConnectionString;
        public static string GetConnectionString()
        {
            return _connectionString;
        }

        #region Logger
        public static void ErrorLog(string error)
        {
            try
            {
                if (!Directory.Exists(@"C:\CCLCRM\Logs"))
                {
                    Directory.CreateDirectory(@"C:\CCLCRM\Logs");
                }

                File.AppendAllText(@"C:\CCLCRM\Logs\" + "ReportLog_" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
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

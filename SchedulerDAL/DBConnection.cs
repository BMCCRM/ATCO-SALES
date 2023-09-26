using System;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;
using System.Configuration;
using System.Web;

namespace SchedulerDAL
{
    class DBConnection
    {
        private static SqlConnection sqlConn;
        private static DBConnection instance = new DBConnection();
        public DBConnection()
        {

        }
        #region SingleTon
        public static DBConnection Instance
        {
            get { return instance; }
        }
        #endregion
        public SqlConnection GetConnection()
        {
            string ConnectionString = ConfigurationManager.ConnectionStrings["PocketDCRConnectionString"].ToString();
            sqlConn = new SqlConnection(ConnectionString); //Represents an open connection to a SQL Server database. This class cannot be inherited. 
            return sqlConn;
        }
        public static void OpenCon()
        {
            sqlConn.Open();

        }
        public static void CloseCon()
        {
            sqlConn.Close();
        }
    }
}

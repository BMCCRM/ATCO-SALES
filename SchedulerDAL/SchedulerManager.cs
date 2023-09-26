using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Reflection;
using System.Text;
using System.Collections;
using Logger.LogWriter;
namespace SchedulerDAL
{
    public class SchedulerManager
    {
        #region DAL for MIO's

        #region Get Methods
        public static void loadmonthlyevents(int employeeid)
        {
            MonthlyMIOCollection.Instance.Clear();
            DataTable lsDT = SchedulerManager.GetMIOMonthlyEvents(employeeid);
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                monthlyEvents e = new monthlyEvents(int.Parse(lsDT.Rows[i]["pk_CPM_CallPlannerMonthLevelID"].ToString()), int.Parse(lsDT.Rows[i]["fk_CPM_EMP_EmployeeID"].ToString()), DateTime.Parse(lsDT.Rows[i]["CPM_PlanMonth"].ToString()), bool.Parse(lsDT.Rows[i]["CPM_IsEditable"].ToString()), lsDT.Rows[i]["CPM_PlanStatus"].ToString());
                MonthlyMIOCollection.Instance.AddEvent(e);
            }

        }

        public static DataTable CheckLogin(string loginID) // Varifies a particular user's LoginID
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_CheckLogin";
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@LoginId", loginID);
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                 Log.Logging("SchedulerManager.CheckLogin", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getActivitiesbyid(int id) // gets a particular Activity from CallPlannerActivities Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetCallPlannerActivitiesbyID";
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@id", id);
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getActivitiesbyid", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getHolidaysbyid(int id) // gets a particular Activity from CallPlannerActivities Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetCallPlannerHolidaysbyID";
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@id", id);
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getHolidaysbyid", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }


        public static DataTable getActivities() // gets all the Activiies available from CallPlannerActivities Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetCallPlannerActivities";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getActivities", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getHolidays() // gets all the Activiies available from CallPlannerActivities Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetCallPlannerHolidays";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getHolidays", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }


        public static DataTable GetMIOMonthlyEvents(int employeeID)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetMIOMonthlyEvents";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.GetMIOMonthlyEvents", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        public static DataTable GetMIOMonthlyEventsByPlanMonth(int employeeID, DateTime initial)
        {//
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);

                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetMIOMonthlyEventsByPlanMonth";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.GetMIOMonthlyEvents", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        
        public static int CheckPlannerMonth(DateTime current, int employeeid) // Checks to see if a particular record is present w.r.t a month for an employee 
        {
            int id = 0;
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetCallPlannerMonthandEmp";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
                if (lsDT.Rows.Count > 0)
                {
                    for (int i = 0; i < lsDT.Rows.Count; i++)
                    {
                        if (current.Month == DateTime.Parse(lsDT.Rows[i]["CPM_PlanMonth"].ToString()).Month && current.Year == DateTime.Parse(lsDT.Rows[i]["CPM_PlanMonth"].ToString()).Year && employeeid == int.Parse(lsDT.Rows[i]["fk_CPM_EMP_EmployeeID"].ToString()))
                        {
                            id = int.Parse(lsDT.Rows[i]["pk_CPM_CallPlannerMonthLevelID"].ToString());
                        }
                    }
                }
            }
            
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }

        public static int CheckPlannerMonthZSM(DateTime current, int employeeid) // Checks to see if a particular record is present w.r.t a month for an employee 
        {
            int id = 0;
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetCallPlannerMonthandEmpZSM";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
                if (lsDT.Rows.Count > 0)
                {
                    for (int i = 0; i < lsDT.Rows.Count; i++)
                    {
                        if (current.Month == DateTime.Parse(lsDT.Rows[i]["CPM_PlanMonth"].ToString()).Month && current.Year == DateTime.Parse(lsDT.Rows[i]["CPM_PlanMonth"].ToString()).Year && employeeid == int.Parse(lsDT.Rows[i]["fk_CPM_EMP_EmployeeID_ZSM"].ToString()))
                        {
                            id = int.Parse(lsDT.Rows[i]["pk_CPM_CallPlannerMonthLevelID"].ToString());
                        }
                    }
                }
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }

        public static int CheckPlannerMonthRSM(DateTime current, int employeeid)
        {
            int id = 0;
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetCallPlannerMonthandEmpRSM";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
                if (lsDT.Rows.Count > 0)
                {
                    for (int i = 0; i < lsDT.Rows.Count; i++)
                    {
                        if (current.Month == DateTime.Parse(lsDT.Rows[i]["CPM_PlanMonth"].ToString()).Month && current.Year == DateTime.Parse(lsDT.Rows[i]["CPM_PlanMonth"].ToString()).Year && employeeid == int.Parse(lsDT.Rows[i]["fk_CPM_EMP_EmployeeID_RSM"].ToString()))
                        {
                            id = int.Parse(lsDT.Rows[i]["pk_CPM_CallPlannerMonthLevelID"].ToString());
                        }
                    }
                }
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.CheckPlannerMonthRSM", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }

        public static int CheckPlannerMonth(DateTime current, int employeeid, string status) // Checks to see if a particular record is present w.r.t a month for an employee 
        {
            int id = 0;
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetCallPlannerMonthandEmp";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
                if (lsDT.Rows.Count > 0)
                {
                    for (int i = 0; i < lsDT.Rows.Count; i++)
                    {
                        if (current.Month == DateTime.Parse(lsDT.Rows[i]["CPM_PlanMonth"].ToString()).Month && current.Year == DateTime.Parse(lsDT.Rows[i]["CPM_PlanMonth"].ToString()).Year && employeeid == int.Parse(lsDT.Rows[i]["fk_CPM_EMP_EmployeeID"].ToString()) && lsDT.Rows[i]["CPM_PlanStatus"].ToString() == Utility.STATUS_SUBMITTED)
                        {
                            id = int.Parse(lsDT.Rows[i]["pk_CPM_CallPlannerMonthLevelID"].ToString());
                        }
                    }
                }
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }

        public static DataTable getDoctors(int employeeID) // gets all the doctors associated with a particular Employee from DoctorsOfSpo Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetDoctorsByEmployee";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getDoctors", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getDoctorsWithDate(int employeeID,DateTime dat) // gets all the doctors associated with a particular Employee from DoctorsOfSpo Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetDoctorsByEmployeeWithDate";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@Datetime", dat);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getDoctors", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getDoctorsbyBrick(int employeeID, int brickID) // gets all the doctors associated with a particular Employee from DoctorsOfSpo Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetDoctorsByBrick";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@BrickId", brickID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getDoctorsbyBrick", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getDoctorsbyBrickWithdate(int employeeID, int brickID,DateTime initial) // gets all the doctors associated with a particular Employee from DoctorsOfSpo Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetDoctorsByBrickWithdate";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@BrickId", brickID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@dat", initial);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getDoctorsbyBrick", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getDoctorsbyClass(int employeeID, int ClassID) // gets all the doctors associated with a particular Employee from DoctorsOfSpo Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetDoctorsByClass";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@ClassId", ClassID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getDoctorsbyClass", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getDoctorsbyClassWithDate(int employeeID, int ClassID,DateTime initial) // gets all the doctors associated with a particular Employee from DoctorsOfSpo Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetDoctorsByClassWithDate";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@ClassId", ClassID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@dat", initial);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getDoctorsbyClass", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getProducts() // gets all the doctors associated with a particular Employee from DoctorsOfSpo Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetProducts_Brands";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getProducts", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;

        }
        public static DataTable getGifts() //SANDGWORK
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetGifts";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getGifts", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getAllClasses() 
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetAllClasses";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getAllClasses", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;

        }

        public static DataTable getMRDoctorWithClassFreq(int EmployeeID, int DoctorID)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetClassIDAndFrequencyLikeDCR";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", EmployeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@DoctorID", DoctorID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getMRDoctorWithClassFreq", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable GetSubEmployees(int employeeID) // gets all the doctors associated with a particular Employee from DoctorsOfSpo Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetSubEmployees";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.GetSubEmployees", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;

        }
        public static DataTable GetEmployee(int employeeID) // gets all the doctors associated with a particular Employee from DoctorsOfSpo Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetEmployee";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.GetSubEmployees", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;

        }
        public static DataTable GetBMDCoordinators()
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetBMDCoordinators";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.GetBMDCoordinators", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;

        }

        public static int getClassesByDoctor(long DoctorID) 
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            int classid = -1;
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetClassesByDoctor";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@DoctorID", DoctorID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
                if (lsDT.Rows.Count > 0)
                    classid = int.Parse(lsDT.Rows[0]["Class"].ToString());                
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getClassesByDoctor", SE.Message + SE.StackTrace);
            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return classid;
        }
        public static int getBricksByDoctor(long DoctorID)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            int brickid = -1;
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetBricksByDoctor";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@DoctorID", DoctorID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
                if (lsDT.Rows.Count > 0)
                    brickid = int.Parse(lsDT.Rows[0]["Brickid"].ToString());
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getClassesByDoctor", SE.Message + SE.StackTrace);
            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return brickid;
        }
        public static string getClassNameByDoctor(long DoctorID)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            string classname = "";
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetClassesByDoctor";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@DoctorID", DoctorID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
                if (lsDT.Rows.Count > 0)
                    classname = lsDT.Rows[0]["Classid"].ToString();
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getClassNameByDoctor", SE.Message + SE.StackTrace);
            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return classname;
        }
        public static string getBricksNameByDoctor(long DoctorID)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            string brickname = "";
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetBricksByDoctor";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@DoctorID", DoctorID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
                if (lsDT.Rows.Count > 0)
                    brickname = lsDT.Rows[0]["Brick"].ToString();
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getBricksNameByDoctor", SE.Message + SE.StackTrace);
            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return brickname;
        }

        public static DataTable getClasses(int employeeID) // gets all the doctors associated with a particular Employee from DoctorsOfSpo Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetClassesByEmployee";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@employeeID", employeeID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getClasses", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getClasseswithdate(int employeeID, DateTime initial) // gets all the doctors associated with a particular Employee from DoctorsOfSpo Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetClassesByEmployeeWithDate";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@employeeID", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@dat", initial);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getClasses", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getBricks(int employeeID) // gets all the doctors associated with a particular Employee from DoctorsOfSpo Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetBricksByEmployee";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@employeeID", employeeID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getBricks", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getBrickswithdate(int employeeID, DateTime initial) // gets all the doctors associated with a particular Employee from DoctorsOfSpo Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetBricksByEmployeeWithDate";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@employeeID", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@dat", initial);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getBricks", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }


        public static DataTable getEvents(int employeeID, DateTime initial) // gets all the activities from CallPlannerActivities Table for a particular employee
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);

                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetActivities";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getEvents", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getEventsZSMNew(int employeeID, DateTime initial) // gets all the activities from CallPlannerActivities Table for a particular employee
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);

                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetZSMActivities_DayView";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanDate", initial);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getEvents", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getProductsAgainstCallPlannerMIOLevelID(long CallPlannerMIOLevelID) // gets all the activities from CallPlannerActivities Table for a particular employee
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetProductsAgainstCallPlannerMIOLevelID";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@CallPlannerMIOLevelID", CallPlannerMIOLevelID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getProductsAgainstCallPlannerMIOLevelID", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        public static DataTable getRemindersAgainstCallPlannerMIOLevelID(long CallPlannerMIOLevelID) 
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetRemindersAgainstCallPlannerMIOLevelID";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@CallPlannerMIOLevelID", CallPlannerMIOLevelID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getRemindersAgainstCallPlannerMIOLevelID", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        public static DataTable getSamplesQuantityAgainstCallPlannerMIOLevelID(long CallPlannerMIOLevelID)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetSamplesQuantityAgainstCallPlannerMIOLevelID";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@CallPlannerMIOLevelID", CallPlannerMIOLevelID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getSamplesQuantityAgainstCallPlannerMIOLevelID", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        public static DataTable getGiftsAgainstCallPlannerMIOLevelID(long CallPlannerMIOLevelID)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetGiftsAgainstCallPlannerMIOLevelID";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@CallPlannerMIOLevelID", CallPlannerMIOLevelID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getRemindersAgainstCallPlannerMIOLevelID", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getEventsSummary(int employeeID, DateTime initial) // gets all the activities from CallPlannerActivities Table for a particular employee
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, initial.Day, 23, 59, 59);

                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetActivitiesSummary";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getEvents", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        public static DataTable getEventsSummaryByDoctorID(int employeeID, DateTime initial, long doctorID) // gets all the activities from CallPlannerActivities Table for a particular employee
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);

                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetActivitiesSummaryByDoctorID";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@DoctorID", doctorID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getEventsSummaryByDoctorID", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        public static DataTable getEventsSummary(int employeeID, int actid) // gets all the activities from CallPlannerActivities Table for a particular employee
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetActivitiesSummarybyactid";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@actid", actid);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getEvents", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }


        #endregion


        #region Update Methods
        public static void setEditableMonth(DateTime current, int employeeid, string status, bool iseditable, string comments, int authEmpID) // Disables Edit for MIO after approval of its record
        {
            int monthid = 0;
            monthid = CheckPlannerMonth(current, employeeid);
            if (monthid != 0)
            {
                int id = 0;
                SqlConnection conn;
                conn = DBConnection.Instance.GetConnection();
                string lsSQLCommand = "";
                SqlCommand com = new SqlCommand(lsSQLCommand, conn);
                DataTable lsDT = new DataTable();
                try
                {
                    conn.Open();
                    lsSQLCommand = "Call_DisallowEditForMIO";
                    com.CommandType = CommandType.StoredProcedure;
                    com.CommandText = lsSQLCommand;
                    com.Parameters.AddWithValue("@monthid", monthid);
                    //com.Parameters.AddWithValue("@iseditable", false);
                    com.Parameters.AddWithValue("@iseditable", iseditable);
                    com.Parameters.AddWithValue("@planStatus", status);
                    com.Parameters.AddWithValue("@comments", comments);
                    com.Parameters.AddWithValue("@authorityEmployeeID", authEmpID);
                    com.ExecuteNonQuery();
                }

                catch (SqlException SE)
                {
                    Log.Logging("SchedulerManager.setEditableMonth", SE.Message + SE.StackTrace);
                }

                finally
                {
                    if (conn.State == ConnectionState.Open)
                        conn.Close();
                }
                
            }
           
            
        }
        public static void setEditableMonthWithoutComments(DateTime current, int employeeid, string status, bool iseditable, int authEmpID) // Disables Edit for MIO after approval of its record
        {
            int monthid = 0;
            monthid = CheckPlannerMonth(current, employeeid);
            if (monthid != 0)
            {
                int id = 0;
                SqlConnection conn;
                conn = DBConnection.Instance.GetConnection();
                string lsSQLCommand = "";
                SqlCommand com = new SqlCommand(lsSQLCommand, conn);
                DataTable lsDT = new DataTable();
                try
                {
                    conn.Open();
                    lsSQLCommand = "Call_DisallowEditForMIOWithoutComments";
                    com.CommandType = CommandType.StoredProcedure;
                    com.CommandText = lsSQLCommand;
                    com.Parameters.AddWithValue("@monthid", monthid);
                    //com.Parameters.AddWithValue("@iseditable", false);
                    com.Parameters.AddWithValue("@iseditable", iseditable);
                    com.Parameters.AddWithValue("@planStatus", status);
                    com.Parameters.AddWithValue("@authorityEmployeeID", authEmpID);
                    com.ExecuteNonQuery();
                }

                catch (SqlException SE)
                {
                    Log.Logging("SchedulerManager.setEditableMonthWithoutComments", SE.Message + SE.StackTrace);
                }

                finally
                {
                    if (conn.State == ConnectionState.Open)
                        conn.Close();
                }

            }


        }   
        //public static void updateEvents(int id, string title, string start, string end, string color)
        //{
        //    DateTime dt1 = DateTime.Parse(start);
        //    SqlConnection conn = DBConnection.Instance.GetConnection();
        //    SqlCommand com = new SqlCommand();
        //    com.CommandType = CommandType.Text;
        //    com.CommandText = "update TestScheduler set EventName = '" + title + "', StartDate = '" + start + "', EndDate = '" + end + "', Color = '" + color + "' where EventID = " + id; ;
        //    com.Connection = conn;
        //    try
        //    {
        //        conn.Open();
        //        com.ExecuteNonQuery();
        //    }

        //    catch (SqlException SE)
        //    {
        //        Log.Logging("SchedulerManager.updateEvents", SE.Message + SE.StackTrace);
        //    }

        //    finally
        //    {
        //        if (conn.State == ConnectionState.Open)
        //            conn.Close();
        //    }

        //}

        public static int updateCallPlannerActivity(int id, string name, string Description, DateTime update, string bcolor, string fcolor, int NoOfProducts, int NoOfReminders,int NoOfSamples,int NoOfGifts) // updates CallPlannerActivities table 
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_UpdateCallPlannerActivity";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@id", id);
            com.Parameters.AddWithValue("@CPA_Name", name);
            com.Parameters.AddWithValue("@CPA_Description", Description);
            com.Parameters.AddWithValue("@CPA_BackgroundColor", bcolor);
            com.Parameters.AddWithValue("@CPA_ForeColor", fcolor);
            com.Parameters.AddWithValue("@CPA_UpdateDateTime", update);
            com.Parameters.AddWithValue("@CPA_NoOfProducts", NoOfProducts);
            com.Parameters.AddWithValue("@CPA_NoOfReminders", NoOfReminders);
            com.Parameters.AddWithValue("@CPA_NoOfSamples", NoOfSamples);
            com.Parameters.AddWithValue("@CPA_NoOfGifts", NoOfGifts);
            int i = 1;
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }

            catch (SqlException SE)
            {
                i = 0;
                Log.Logging("SchedulerManager.updateCallPlannerActivity", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return i;
        }

        public static int updateCallPlannerHolidays(int id, DateTime from, DateTime to, string Description) // updates CallPlannerHolidays table 
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_UpdateCallPlannerHolidays";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@id", id);
            com.Parameters.AddWithValue("@CPH_Description", Description);
            com.Parameters.AddWithValue("@CPH_DateFrom", from);
            com.Parameters.AddWithValue("@CPH_DateTo", to);
           
            int i = 1;
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }

            catch (SqlException SE)
            {
                i = 0;
                Log.Logging("SchedulerManager.updateCallPlannerHolidays", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return i;
        }

        public static void UpdateCallPlannerMonth(DateTime from, DateTime to, string Description, int empID, int doctorid, int activityid) // updates CallPlannerMIOLevel table and also deletes BMD activity record to reinsert it  
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_UpdateCallPlannerMIO";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@callPlannerMonthID", empID);
            com.Parameters.AddWithValue("@Description", Description);
            com.Parameters.AddWithValue("@planDateTimeFrom", from);
            com.Parameters.AddWithValue("@planDateTimeTo", to);
            com.Parameters.AddWithValue("@ActivityID", activityid);
            com.Parameters.AddWithValue("@DoctorID", doctorid);
            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.UpdateCallPlannerMonth", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
        }

        public static void UpdateCallplannerMioRSM(DateTime from, DateTime to, int palnnerid, int ZSMID, int activityid)
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_UpdateCallPlannerRSM";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@callplannerid", palnnerid);
            com.Parameters.AddWithValue("@planDateTimeFrom", from);
            com.Parameters.AddWithValue("@planDateTimeTo", to);
            com.Parameters.AddWithValue("@ActivityID", activityid);
            com.Parameters.AddWithValue("@zsmID", ZSMID);
            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.UpdateCallplannerMioRSM", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
        }
        public static DataTable getInformedJVs(int mioid) // gets all the Activiies available from CallPlannerActivities Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetInformedJVs";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@mioid", mioid);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getInformedJVs", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        public static DataTable getJVs(int mioLevelID, int employeeID) // gets all the Activiies available from CallPlannerActivities Table
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetJVsByMIOLevelAndEmployeeID";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@mioid", mioLevelID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@employeeID", employeeID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getJVs", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        #endregion


        #region Add/Insert Methods
        //public static int addEvents(string title, string start, string end, string color)
        //{
        //    DateTime dt1 = DateTime.Parse(start);
        //    SqlConnection conn = DBConnection.Instance.GetConnection();
        //    SqlCommand com = new SqlCommand();
        //    com.CommandType = CommandType.Text;
        //    int id = 0;
        //    com.CommandText = "insert into TestScheduler (EventName,StartDate,EndDate,Color) Values ('" + title + "','" + start + "','" + end + "','" + color + "') SELECT SCOPE_IDENTITY() ";
        //    com.Connection = conn;
        //    try
        //    {
        //        conn.Open();
        //        id = Convert.ToInt32(com.ExecuteScalar());
        //    }

        //    catch (SqlException SE)
        //    {
        //        Log.Logging("SchedulerManager.addEvents", SE.Message + SE.StackTrace);
        //    }

        //    finally
        //    {
        //        if (conn.State == ConnectionState.Open)
        //            conn.Close();
        //    }
        //    return id;
        //}Call_InsertCallPlannerProducts

        public static int InsertCallPlannerMIO(int PlannerMonthID, DateTime start, DateTime end, bool isEdit, int activityID, int doctorID, string description, string PlanStatus, string PlanStatusReason, int EmpAuthorityID) //inserts a record into CallPlannerMIOLevel Table
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_InsertCallPlannerMIO";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@callPlannerMonthID", PlannerMonthID);
            com.Parameters.AddWithValue("@planDateTimeFrom", start);
            com.Parameters.AddWithValue("@planDateTimeTo", end);
            com.Parameters.AddWithValue("@IsEditable", isEdit);
            com.Parameters.AddWithValue("@ActivityID", activityID);
            com.Parameters.AddWithValue("@DoctorID", doctorID);
            com.Parameters.AddWithValue("@Description", description);
            com.Parameters.AddWithValue("@PlanStatus", PlanStatus);
            com.Parameters.AddWithValue("@PlanStatusReason", PlanStatusReason);
            com.Parameters.AddWithValue("@EmpAuthID", EmpAuthorityID);
            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                id = Convert.ToInt32(com.ExecuteScalar());
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.InsertCallPlannerMIO", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }


        public static int CopyPlan(int Checkid, int employeeid, DateTime CopyFromDate, DateTime CopyForDate) //Copy Plan for Day
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "SP_CallPlan_CopyForDay";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Checkid", Checkid.ToString());
            com.Parameters.AddWithValue("@employeeid", employeeid.ToString());
            com.Parameters.AddWithValue("@CopyFromDate", CopyFromDate.ToString());
            com.Parameters.AddWithValue("@CopyForDate", CopyForDate.ToString());

            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                id = Convert.ToInt32(com.ExecuteScalar());
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.CopyPlanForDay", SE.Message + SE.StackTrace);
            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }


        public static int InsertCallPlannerMIOZSM(int PlannerMonthID, DateTime start, DateTime end, bool isEdit, int activityID, int MIOID, string description, string PlanStatus, string PlanStatusReason) //inserts a record into CallPlannerMIOLevel Table
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_InsertCallPlannerMIOZSM";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@callPlannerMonthID", PlannerMonthID);
            com.Parameters.AddWithValue("@planDateTimeFrom", start);
            com.Parameters.AddWithValue("@planDateTimeTo", end);
            com.Parameters.AddWithValue("@IsEditable", isEdit);
            com.Parameters.AddWithValue("@ActivityID", activityID);
            com.Parameters.AddWithValue("@MIOID", MIOID);
            com.Parameters.AddWithValue("@Description", description);
            com.Parameters.AddWithValue("@PlanStatus", PlanStatus);
            com.Parameters.AddWithValue("@PlanStatusReason", PlanStatusReason);
            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                id = Convert.ToInt32(com.ExecuteScalar());
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.InsertCallPlannerMIOZSM", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }

        public static int InsertCallPlannerMIORSM(int PlannerMonthID, DateTime start, DateTime end, bool isEdit, int activityID, int MIOID, string description, string PlanStatus, string PlanStatusReason) //inserts a record into CallPlannerRSMLevel Table
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_InsertCallPlannerMIORSM";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@callPlannerMonthID", PlannerMonthID);
            com.Parameters.AddWithValue("@planDateTimeFrom", start);
            com.Parameters.AddWithValue("@planDateTimeTo", end);
            com.Parameters.AddWithValue("@IsEditable", isEdit);
            com.Parameters.AddWithValue("@ActivityID", activityID);
            com.Parameters.AddWithValue("@MIOID", MIOID);
            com.Parameters.AddWithValue("@Description", description);
            com.Parameters.AddWithValue("@PlanStatus", PlanStatus);
            com.Parameters.AddWithValue("@PlanStatusReason", PlanStatusReason);
            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                id = Convert.ToInt32(com.ExecuteScalar());
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.InsertCallPlannerMIORSM", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }

        public static int insertCallPlannerMonthZSM(DateTime PlannerMonth, bool isEdit, int empID, string PlanStatus, string PlanStatusReason, int EmpAuthorityID)  //inserts a record into CallPlannerMonthLevel Table
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();

            PlannerMonth = new DateTime(PlannerMonth.Year, PlannerMonth.Month, 1, 0, 0, 0);

            com.CommandText = "Call_InsertCallPlannerMonth_ZSM";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@EmployeeId", empID);
            com.Parameters.AddWithValue("@PlanMonth", PlannerMonth);
            com.Parameters.AddWithValue("@IsEditable", isEdit);
            com.Parameters.AddWithValue("@PlanStatus", PlanStatus);
            com.Parameters.AddWithValue("@PlanStatusReason", PlanStatusReason);
            com.Parameters.AddWithValue("@EmpAuthID", EmpAuthorityID);
            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                id = Convert.ToInt32(com.ExecuteScalar());
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.insertCallPlannerMonthZSM", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }

        public static int insertCallPlannerMonthRSM(DateTime PlannerMonth, bool isEdit, int empID, string PlanStatus, string PlanStatusReason, int EmpAuthorityID)  //inserts a record into CallPlannerMonthLevel Table
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_InsertCallPlannerMonth_RSM";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@EmployeeId",empID);
            com.Parameters.AddWithValue("@IsEditable", isEdit);
            com.Parameters.AddWithValue("@PlanStatus", PlanStatus);
            com.Parameters.AddWithValue("@PlanStatusReason", PlanStatusReason);
            com.Parameters.AddWithValue("@EmpAuthID", EmpAuthorityID);
            com.Parameters.AddWithValue("@PlanMonth", PlannerMonth);
            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                id = Convert.ToInt32(com.ExecuteScalar());
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.insertCallPlannerMonthRSM", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }

        
        public static int InsertCallPlannerProduct(int CallPlannerMIOLevelID, int productid, int orderby) //inserts a record into CallPlannerMIOLevel Table
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_InsertCallPlannerProducts";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPP_CPI_CallPlannerMIOLevelID", CallPlannerMIOLevelID);
            com.Parameters.AddWithValue("@fk_CPP_PRO_ProductID", productid);
            com.Parameters.AddWithValue("@orderby", orderby);
            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                id = Convert.ToInt32(com.ExecuteScalar());
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.InsertCallPlannerProduct", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }

        public static int InsertCallPlannerReminder(int mioid, int reminderid, int orderby) //inserts a record into CallPlannerMIOLevel Table
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_InsertCallPlannerReminders";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPP_CPI_CallPlannerMIOLevelID", mioid);
            com.Parameters.AddWithValue("@fk_CPP_PRO_ProductID", reminderid);
            com.Parameters.AddWithValue("@orderby", orderby);
            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                id = Convert.ToInt32(com.ExecuteScalar());
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.InsertCallPlannerReminder", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }

        public static int InsertCallPlannerSamples(int CallPlannerMIOLevelID, int sampleid,int quantity, int orderby) //inserts a record into CallPlannerMIOLevel Table
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_InsertCallPlannerSamples";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPP_CPI_CallPlannerMIOLevelID", CallPlannerMIOLevelID);
            com.Parameters.AddWithValue("@fk_CPP_PRO_ProductID", sampleid);
            com.Parameters.AddWithValue("@QTY", quantity);
            com.Parameters.AddWithValue("@orderby", orderby);
            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                id = Convert.ToInt32(com.ExecuteScalar());
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.InsertCallPlannerSample", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }

        public static int InsertCallPlannerGifts(int CallPlannerMIOLevelID, int giftid,int orderby) //inserts a record into CallPlannerMIOLevel Table
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_InsertCallPlannerGifts";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPP_CPI_CallPlannerMIOLevelID", CallPlannerMIOLevelID);
            com.Parameters.AddWithValue("@fk_CPP_GFT_GiftID", giftid);
            com.Parameters.AddWithValue("@orderby", orderby);
            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                id = Convert.ToInt32(com.ExecuteScalar());
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.InsertCallPlannerGift", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }

        public static int insertCallPlannerMonth(DateTime PlannerMonth, string Description, bool isEdit, int empID, string PlanStatus, string PlanStatusReason, int EmpAuthorityID)  //inserts a record into CallPlannerMonthLevel Table
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();

            PlannerMonth = new DateTime(PlannerMonth.Year, PlannerMonth.Month, 1, 0, 0, 0);

            com.CommandText = "Call_InsertCallPlannerMonth";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@EmployeeId", empID);
            com.Parameters.AddWithValue("@Description", Description);
            com.Parameters.AddWithValue("@PlanMonth", PlannerMonth);
            com.Parameters.AddWithValue("@IsEditable", isEdit);
            com.Parameters.AddWithValue("@PlanStatus", PlanStatus);
            com.Parameters.AddWithValue("@PlanStatusReason", PlanStatusReason);
            com.Parameters.AddWithValue("@EmpAuthID", EmpAuthorityID);
            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                id = Convert.ToInt32(com.ExecuteScalar());
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.insertCallPlannerMonth", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }
         
        public static int insertCallPlannerActivity(string name, string Description, DateTime create, DateTime update, string bcolor, string fcolor, int NoOfProducts, int NoOfReminders,int NoOfSamples,int NoOfGifts) //inserts a record into CallPlannerActivities Table 
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_InsertCallPlannerActivity";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@CPA_Name", name);
            com.Parameters.AddWithValue("@CPA_Description", Description);
            com.Parameters.AddWithValue("@CPA_BackgroundColor", bcolor);
            com.Parameters.AddWithValue("@CPA_ForeColor", fcolor);
            com.Parameters.AddWithValue("@CPA_CreateDateTime", create);
            com.Parameters.AddWithValue("@CPA_UpdateDateTime", update);
            com.Parameters.AddWithValue("@CPA_NoOfProducts", NoOfProducts);
            com.Parameters.AddWithValue("@CPA_NoOfReminders", NoOfReminders);
            com.Parameters.AddWithValue("@CPA_NoOfSamples", NoOfSamples);
            com.Parameters.AddWithValue("@CPA_NoOfGifts", NoOfGifts);
            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                id = Convert.ToInt32(com.ExecuteScalar());
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.insertCallPlannerActivity", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }

        public static int insertCallPlannerHolidays(DateTime from, DateTime to, string Description) //inserts a record into Holidays Table 
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_InsertCallPlannerHolidays";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@CPH_Description", Description);
            com.Parameters.AddWithValue("@CPH_DateFrom", from);
            com.Parameters.AddWithValue("@CPH_DateTo", to);
            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                id = Convert.ToInt32(com.ExecuteScalar());
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.insertCallPlannerHolidays", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }
        #endregion


        #region Delete Methods
        public static int deleteCallPlannerProducts(int CallPlannerMIOLevelID) // Deletes an Activity by it Activity ID from CallPlannerActivities Table
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_DeleteCallPlannerProducts";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPP_CPI_CallPlannerMIOLevelID", CallPlannerMIOLevelID);
            int r = 1;
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }

            catch (SqlException SE)
            {
                r = 0;
                Log.Logging("SchedulerManager.deleteCallPlannerActivity", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return r;
        }
        public static int deleteCallPlannerReminders(int CallPlannerMIOLevelID) // Deletes an Activity by it Activity ID from CallPlannerActivities Table
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_DeleteCallPlannerReminders";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPP_CPI_CallPlannerMIOLevelID", CallPlannerMIOLevelID);
            int r = 1;
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }

            catch (SqlException SE)
            {
                r = 0;
                Log.Logging("SchedulerManager.deleteCallPlannerReminders", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return r;
        }
        public static int deleteCallPlannerSamples(int CallPlannerMIOLevelID) // Deletes an Activity by it Activity ID from CallPlannerActivities Table
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_DeleteCallPlannerSamples";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPP_CPI_CallPlannerMIOLevelID", CallPlannerMIOLevelID);
            int r = 1;
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }

            catch (SqlException SE)
            {
                r = 0;
                Log.Logging("SchedulerManager.deleteCallPlannerSamples", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return r;
        }
        public static int deleteCallPlannerGifts(int CallPlannerMIOLevelID) // Deletes an Activity by it Activity ID from CallPlannerActivities Table
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_DeleteCallPlannerGifts";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPP_CPI_CallPlannerMIOLevelID", CallPlannerMIOLevelID);
            int r = 1;
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }

            catch (SqlException SE)
            {
                r = 0;
                Log.Logging("SchedulerManager.deleteCallPlannerGifts", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return r;
        }

        public static int deleteBMDCoordinator(int CallPlannerMIOLevelID) 
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_DeleteBMDCoordinator";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPB_CPI_CallPlannerMIOLevelID", CallPlannerMIOLevelID);
            int r = 1;
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }

            catch (SqlException SE)
            {
                r = 0;
                Log.Logging("SchedulerManager.deleteBMDCoordinator", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return r;
        }

        public static void deleteEvent(int id)  // Deletes an MIO Record/Event by its MIO ID from CallPlannerMIOLevel /Table
        {

            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandType = CommandType.StoredProcedure;
            com.CommandText = "Call_DeleteActivity";
            com.Parameters.AddWithValue("@Id", id);
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.deleteEvent", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
        }

        public static int deleteCallPlannerActivity(int id) // Deletes an Activity by it Activity ID from CallPlannerActivities Table
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_DeleteCallPlannerActivity";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@pk_CPA_CallPlannerActivityID", id);
            int r = 1;
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }

            catch (SqlException SE)
            {
                r = 0;
                Log.Logging("SchedulerManager.deleteCallPlannerActivity", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return r;
        }

        public static int deleteCallPlannerHoliday(int id) // Deletes an Holiday by it Holiday ID from CallPlannerHolidays Table
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_DeleteCallPlannerHoliday";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@pk_CPH_CallPlannerHolidayID", id);
            int r = 1;
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }

            catch (SqlException SE)
            {
                r = 0;
                Log.Logging("SchedulerManager.deleteCallPlannerHoliday", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return r;
        }
        #endregion
        
        #endregion

        #region DAL for ZSM's

        #region Get Methods

        public static DataTable getMonthlyStatusforEmployee(int employeeID, DateTime initial) // gets the status for a particular employee in a particular month
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);

                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetMonthlystatusforEmployee";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getMonthlyStatusforEmployee", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getMonthlyStatusforEmployeeZSM(int employeeID, DateTime initial) // gets the status for a particular employee in a particular month
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);

                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetMonthlystatusforEmployeeZSM";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getMonthlyStatusforEmployeeZSM", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getEventsSummarybystatus(int employeeID, DateTime initial) // gets all the activities from CallPlannerActivities Table for a particular employee
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);

                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetActivitiesSummarybyStatus";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getEvents", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        public static DataTable getEventsSummarybystatus(int employeeID, int actid, DateTime initial) // gets all the activities from CallPlannerActivities Table for a particular employee
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);


                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetActivitiesSummarybyActivityidandStatus";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@ActivityId", actid);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getEvents", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        public static DataTable getEventsZSM(int employeeID, DateTime initial) // gets all the activities from CallPlannerActivities Table for a particular employee
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);

                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetActivitiesZSM";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getEventsZSM", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }


        public static DataTable getEventsbyActivityId(int employeeID, int actid, DateTime initial) // (modified)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);

                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetActivitiesbyActivityid";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@ActivityId", actid);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getEventsbyActivityId", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        public static DataTable getEvents(int employeeID, string status)  // (modified)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetActivitiesbyStatus";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@status", status);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getEvents", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        

        public static DataTable getZSMActivities(int employeeID, DateTime initial)  // (MODIFIED)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetZSMActivities";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getZSMActivities", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getRSMActivities(int employeeID, DateTime initial)  // (MODIFIED)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetRSMActivities";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getRSMActivities", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getZSMActivitiesbyActivityId(int employeeID, int actid, DateTime initial)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);

                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetZSMActivitiesbyActivityid";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@ActivityId", actid);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getZSMActivitiesbyActivityId", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getZSMActivitiesbyActivityIdZSM(int employeeID, int actid, DateTime initial)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);

                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetZSMActivitiesbyActivityidZSM";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@ActivityId", actid);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getZSMActivitiesbyActivityIdZSM", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getZSMEvents(int employeeID) // (MODIFIED)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetZSMEvents";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                //lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@Roleid", roleid);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getZSMEvents", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static int CheckPlannerMonthforZSM(DateTime current, int employeeid)
        {
            int id = 0;
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetZSMMonthandEmp";
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@employeeId", employeeid);
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
                if (lsDT.Rows.Count > 0)
                {
                    for (int i = 0; i < lsDT.Rows.Count; i++)
                    {
                        if (current.Month == DateTime.Parse(lsDT.Rows[i]["planmonth"].ToString()).Month && current.Year == DateTime.Parse(lsDT.Rows[i]["planmonth"].ToString()).Year && employeeid == int.Parse(lsDT.Rows[i]["zsmempid"].ToString()))
                        {
                            id = int.Parse(lsDT.Rows[i]["monthid"].ToString());
                        }
                    }
                }
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.CheckPlannerMonthforZSM", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }

        public static int zsm_planning_time_check(DateTime current, string emp)
        {
            int id = 0;
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "sp_zsm_planning_time_check";
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@startTime", current);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@Emp_IDZSM", emp);
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
                if (lsDT.Rows.Count > 0)
                {
                    for (int i = 0; i < lsDT.Rows.Count; i++)
                    {
                        id = int.Parse(lsDT.Rows[i]["pk_CPI_CallPlannerZSMLevelID"].ToString());

                    }
                }
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.zsm_planning_time_check", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }

        public static int rsm_planning_time_check_update(DateTime current, string emp,int eventid)
        {
            int id = 0;
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "sp_rsm_planning_time_check_update";
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@startTime", current);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@Emp_IDZSM", emp);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@eventid", eventid);
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
                if (lsDT.Rows.Count > 0)
                {
                    for (int i = 0; i < lsDT.Rows.Count; i++)
                    {
                        id = int.Parse(lsDT.Rows[i]["pk_CPI_CallPlannerRSMLevelID"].ToString());

                    }
                }
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.rsm_planning_time_check_update", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }
        public static int rsm_planning_time_check(DateTime current, string emp)
        {
            int id = 0;
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "sp_rsm_planning_time_check";
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@startTime", current);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@Emp_IDZSM", emp);
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
                if (lsDT.Rows.Count > 0)
                {
                    for (int i = 0; i < lsDT.Rows.Count; i++)
                    {
                        id = int.Parse(lsDT.Rows[i]["pk_CPI_CallPlannerRSMLevelID"].ToString());

                    }
                }
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.rsm_planning_time_check", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }
        #endregion


        #region Delete Methods
        public static void deleteEventbyzsmid(int id)
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandType = CommandType.StoredProcedure;
            com.CommandText = "Call_DeleteZSMActivitybyid";
            com.Parameters.AddWithValue("@Id", id);
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.deleteEventbyzsmid", SE.Message + SE.StackTrace);
            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
        }

        public static void deleteEventbyrsmid(int id)
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandType = CommandType.StoredProcedure;
            com.CommandText = "Call_DeleteRSMActivitybyid";
            com.Parameters.AddWithValue("@Id", id);
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.deleteEventbyrsmid", SE.Message + SE.StackTrace);
            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
        }

        public static void deleteZSMPlanbyMIO(int mioid, int empID) // MODIFIED
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_deleteZSMPlanbyMIO";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPZ_CPI_CallPlannerMIOLevelID", mioid);
            com.Parameters.AddWithValue("@fk_CPZ_EMP_ZSMEmployeeID", empID);
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.deleteZSMPlanbyMIO", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
        }
        #endregion


        #region Update Methods
        public static void updateZSMPlan(int mioid, int empID, string description, bool informed)
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_updateZSMPlan";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPZ_CPI_CallPlannerMIOLevelID", mioid);
            com.Parameters.AddWithValue("@fk_CPZ_EMP_ZSMEmployeeID", empID);
            com.Parameters.AddWithValue("@CPZ_Description", description);
            com.Parameters.AddWithValue("@CPZ_Informed", informed);
            // com.Parameters.AddWithValue("@roleid", roleid);
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.updateZSMPlan", SE.Message + SE.StackTrace);
            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
        }

        public static void ChangeMIOPlanStatus(int mioid, int monthid, string statusreason, int empauthid)
        {
            int id = 0;
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                lsSQLCommand = "Call_ChangeMIOPlanStatus";
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = lsSQLCommand;
                com.Parameters.AddWithValue("@mioid", mioid);
                com.Parameters.AddWithValue("@monthid", monthid);
                com.Parameters.AddWithValue("@iseditable", true);
                com.Parameters.AddWithValue("@planStatus", Utility.STATUS_REJECTED);
                com.Parameters.AddWithValue("@planReason", statusreason);
                com.Parameters.AddWithValue("@empauthid", empauthid);
                com.ExecuteNonQuery();
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.ChangeMIOPlanStatus", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
        }

        public static void setEditableMonthforZSM(DateTime current, int employeeid, string status, bool iseditable, int authEmpID)
        {
            int monthid = 0;
            monthid = CheckPlannerMonthforZSM(current, employeeid);
            if (monthid != 0)
            {
                int id = 0;
                SqlConnection conn;
                conn = DBConnection.Instance.GetConnection();
                string lsSQLCommand = "";
                SqlCommand com = new SqlCommand(lsSQLCommand, conn);
                DataTable lsDT = new DataTable();
                try
                {
                    conn.Open();
                    lsSQLCommand = "Call_DisallowEditForZSM";
                    com.CommandType = CommandType.StoredProcedure;
                    com.CommandText = lsSQLCommand;
                    com.Parameters.AddWithValue("@monthid", monthid);
                    //com.Parameters.AddWithValue("@iseditable", false);
                    com.Parameters.AddWithValue("@iseditable", iseditable);
                    com.Parameters.AddWithValue("@planStatus", status);
                    com.Parameters.AddWithValue("@authorityEmployeeID", authEmpID);
                    com.ExecuteNonQuery();
                }

                catch (SqlException SE)
                {
                    Log.Logging("SchedulerManager.setEditableMonthforZSM", SE.Message + SE.StackTrace);
                }

                finally
                {
                    if (conn.State == ConnectionState.Open)
                        conn.Close();
                }

            }
        }
        #endregion


        #region Add/Insert Methods
        public static int insertZSMPlan(int mioid, int monthid, bool isEdit, int empID, string PlanStatus, string PlanStatusReason, int EmpAuthorityID, string description, bool informed, int roleid)
        { // MODIFIED
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_InsertZSMPlan";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPZ_CPI_CallPlannerMIOLevelID", mioid);
            com.Parameters.AddWithValue("@fk_CPZ_CPM_CallPlannerMonthLeveID", monthid);
            com.Parameters.AddWithValue("@fk_CPZ_EMP_ZSMEmployeeID", empID);
            com.Parameters.AddWithValue("@roleid", roleid);
            com.Parameters.AddWithValue("@CPZ_IsEditable", isEdit);
            com.Parameters.AddWithValue("@CPZ_Description", description);
            com.Parameters.AddWithValue("@CPZ_PlanStatus", PlanStatus);
            com.Parameters.AddWithValue("@CPZ_PlanStatusReason", PlanStatusReason);
            com.Parameters.AddWithValue("@fk_CPZ_EMP_AuthorityEmployeeID", EmpAuthorityID);
            com.Parameters.AddWithValue("@CPZ_Informed", informed);

            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                id = Convert.ToInt32(com.ExecuteScalar());
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.insertZSMPlan", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }
        #endregion

        #endregion

        #region DAL for RSM's

        #region Get Methods

        public static DataTable getZSMActivitiesbystatus(int employeeID, DateTime initial)  // (MODIFIED)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);

                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                //lsSQLCommand = "Call_GetZSMActivitiesbystatus";
                lsSQLCommand = "Call_GetZSMActivities_MonthView";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);

                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getZSMActivitiesbystatus", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        //getRSMActivitiesbystatus
        public static DataTable getRSMActivitiesbystatus(int employeeID, DateTime initial)  // (MODIFIED)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);

                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                //lsSQLCommand = "Call_GetZSMActivitiesbystatus";
                lsSQLCommand = "Call_GetRSMActivities_MonthView";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);

                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getZSMActivitiesbystatus", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getZSMActivitiesbyactitvityidandStatus(int employeeID, int actid, DateTime initial)  // (MODIFIED)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);

                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetZSMActivitiesbyActivityidandStatus";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@ActivityId", actid);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getZSMActivitiesbyActivityId", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getZSMActivitiesbyactitvityidandStatusZSM(int employeeID, int actid, DateTime initial)  // (MODIFIED)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                DateTime planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                DateTime planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);

                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetZSMActivitiesbyActivityidandStatus_ZSM";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@ActivityId", actid);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthFrom", planMonthFrom);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@PlanMonthTo", planMonthTo);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getZSMActivitiesbyactitvityidandStatusZSM", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getRSMEvents(int employeeID) // gets all events for a particular RSM 
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetRSMEvents";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getRSMEvents", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getRSMActivities(int employeeID)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetRSMActivities";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getRSMActivities", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable getRSMActivitiesbyActivityId(int employeeID, int actid)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetRSMActivitiesbyActivityid";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@ActivityId", actid);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getRSMActivitiesbyActivityId", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        #endregion


        #region Update Methods

        public static void setEditableMonthforzsm(DateTime current, int employeeid, string status, bool iseditable, string comments, int authEmpID) // Disables Edit for MIO after approval of its record
        {
            int monthid = 0;
            monthid = CheckPlannerMonth(current, employeeid);
            if (monthid != 0)
            {
                int id = 0;
                SqlConnection conn;
                conn = DBConnection.Instance.GetConnection();
                string lsSQLCommand = "";
                SqlCommand com = new SqlCommand(lsSQLCommand, conn);
                DataTable lsDT = new DataTable();
                try
                {
                    conn.Open();
                    lsSQLCommand = "Call_DisallowEditForZSM";
                    com.CommandType = CommandType.StoredProcedure;
                    com.CommandText = lsSQLCommand;
                    com.Parameters.AddWithValue("@monthid", monthid);
                    com.Parameters.AddWithValue("@iseditable", iseditable);
                    com.Parameters.AddWithValue("@planStatus", status);
                    com.Parameters.AddWithValue("@comments", comments);
                    com.Parameters.AddWithValue("@authorityEmployeeID", authEmpID);
                    com.ExecuteNonQuery();
                }

                catch (SqlException SE)
                {
                    Log.Logging("SchedulerManager.setEditableMonthforzsm", SE.Message + SE.StackTrace);
                }

                finally
                {
                    if (conn.State == ConnectionState.Open)
                        conn.Close();
                }

            }
        }
        public static void setEditableMonthforzsmWithoutComments(DateTime current, int employeeid, string status, bool iseditable, int authEmpID) // Disables Edit for MIO after approval of its record
        {
            int monthid = 0;
            monthid = CheckPlannerMonth(current, employeeid);
            if (monthid != 0)
            {
                int id = 0;
                SqlConnection conn;
                conn = DBConnection.Instance.GetConnection();
                string lsSQLCommand = "";
                SqlCommand com = new SqlCommand(lsSQLCommand, conn);
                DataTable lsDT = new DataTable();
                try
                {
                    conn.Open();
                    lsSQLCommand = "Call_DisallowEditForZSMWithoutComments";
                    com.CommandType = CommandType.StoredProcedure;
                    com.CommandText = lsSQLCommand;
                    com.Parameters.AddWithValue("@monthid", monthid);
                    com.Parameters.AddWithValue("@iseditable", iseditable);
                    com.Parameters.AddWithValue("@planStatus", status);
                    com.Parameters.AddWithValue("@authorityEmployeeID", authEmpID);
                    com.ExecuteNonQuery();
                }

                catch (SqlException SE)
                {
                    Log.Logging("SchedulerManager.setEditableMonthforzsmWithoutComments", SE.Message + SE.StackTrace);
                }

                finally
                {
                    if (conn.State == ConnectionState.Open)
                        conn.Close();
                }

            }
        }

        public static void ChangeZSMPlanStatus(int mioid, int monthid, string statusreason, int empauthid, int zsmid)
        {
            int id = 0;
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                lsSQLCommand = "Call_ChangeZSMPlanStatus";
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = lsSQLCommand;
                com.Parameters.AddWithValue("@mioid", mioid);
                com.Parameters.AddWithValue("@monthid", monthid);
                com.Parameters.AddWithValue("@iseditable", true);
                com.Parameters.AddWithValue("@planStatus", Utility.STATUS_RESUBMITTED);
                com.Parameters.AddWithValue("@planReason", statusreason);
                com.Parameters.AddWithValue("@empauthid", empauthid);
                com.Parameters.AddWithValue("@empid", zsmid);
                com.ExecuteNonQuery();
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.ChangeZSMPlanStatus", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
        }

        public static void updateRSMPlan(int mioid, int empID, string description, bool informed)
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_updateRSMPlan";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@CallPlannerMIOLevelID", mioid);
            com.Parameters.AddWithValue("@RSMEmployeeID", empID);
            com.Parameters.AddWithValue("@Description", description);
            com.Parameters.AddWithValue("@Informed", informed);
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.updateRSMPlan", SE.Message + SE.StackTrace);
            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
        }

        public static void updateZSMPlanforRSM(int mioid, int empID, string description, bool informed)
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_updateZSMPlanforRSM";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPZ_CPI_CallPlannerMIOLevelID", mioid);
            com.Parameters.AddWithValue("@fk_CPZ_EMP_ZSMEmployeeID", empID);
            com.Parameters.AddWithValue("@CPZ_Description", description);
            com.Parameters.AddWithValue("@CPZ_Informed", informed);
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.updateZSMPlan", SE.Message + SE.StackTrace);
            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
        }
        #endregion


        #region Delete Methods
        public static void deleteRSMPlanbyMIO(int mioid, int empID)
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_deleteRSMPlanbyMIO";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPR_CPI_CallPlannerMIOLevelID", mioid);
            com.Parameters.AddWithValue("@fk_CPR_EMP_RSMEmployeeID", empID);
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.deleteRSMPlanbyMIO", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
        }

        //public static void deleteEventbyrsmid(int id)
        //{
        //    SqlConnection conn = DBConnection.Instance.GetConnection();
        //    SqlCommand com = new SqlCommand();
        //    com.CommandType = CommandType.StoredProcedure;
        //    com.CommandText = "Call_DeleteRSMActivitybyid";
        //    com.Parameters.AddWithValue("@Id", id);
        //    com.Connection = conn;
        //    try
        //    {
        //        conn.Open();
        //        com.ExecuteNonQuery();
        //    }

        //    catch (SqlException SE)
        //    {
        //        Log.Logging("SchedulerManager.deleteEventbyrsmid", SE.Message + SE.StackTrace);
        //    }
        //    finally
        //    {
        //        if (conn.State == ConnectionState.Open)
        //            conn.Close();
        //    }
        //}
        #endregion


        #region Insert Methods
        public static int insertRSMPlan(int mioid, int monthid, int empID, string description, bool informed)
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_InsertRSMPlan";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPZ_CPI_CallPlannerMIOLevelID", mioid);
            com.Parameters.AddWithValue("@fk_CPZ_CPM_CallPlannerMonthLeveID", monthid);
            com.Parameters.AddWithValue("@fk_CPZ_EMP_ZSMEmployeeID", empID);
            com.Parameters.AddWithValue("@CPZ_Description", description);
            com.Parameters.AddWithValue("@CPZ_Informed", informed);
            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                id = Convert.ToInt32(com.ExecuteScalar());
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.insertRSMPlan", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }
        #endregion

        #endregion

        #region BMD Coordinator

        public static int insertCallPlannerBMDCoordinator(int mioid, int bmdid, DateTime create, DateTime update, int empauthid) // inserts a BMD record for MIO if the BMD coordinator is selected
        { // MODIFIED
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_InsertCallPlannerBMDCoordinator";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPB_CPI_CallPlannerMIOLevelID", mioid);
            com.Parameters.AddWithValue("@fk_CPB_EMP_BMDCoordinatorEmployeeID", bmdid);
            com.Parameters.AddWithValue("@fk_CPB_EMP_AuthorityEmployeeID", empauthid);
            com.Parameters.AddWithValue("@CPB_CreateDateTime", create);
            com.Parameters.AddWithValue("@CPB_UpdateDateTime", update);
            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                id = Convert.ToInt32(com.ExecuteScalar());
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.insertCallPlannerBMDCoordinator", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }

        public static DataTable GetBDMbyMIO(int empid) //(MODIFIED)   Gets a BMD coordinator for a particular MIO 
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetBDMbyMIO";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", empid);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.GetBDMbyMIO", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        
        #endregion

        public static DataTable GetHolidayDates() //(MODIFIED)   Gets a BMD coordinator for a particular MIO 
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetHolidayDates";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.GetHolidayDates", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static string GetProductsAgainstCallPlannerMIOLevelID(long CallPlannerMIOLevelID)
        {
            StringBuilder sb = new StringBuilder();
            DataTable lsDT = getProductsAgainstCallPlannerMIOLevelID(CallPlannerMIOLevelID);
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                if (i != 0)
                    sb.Append("*");

                sb.Append(lsDT.Rows[i]["fk_CPP_PRO_ProductID"]);
            }

            return sb.ToString();
        }
        public static string GetProductsNameAgainstCallPlannerMIOLevelID(long CallPlannerMIOLevelID)
        {
            StringBuilder sb = new StringBuilder();
            DataTable lsDT = getProductsAgainstCallPlannerMIOLevelID(CallPlannerMIOLevelID);
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                if (i != 0)
                    sb.Append("*");

                sb.Append(ProductCollection.Instance[Convert.ToInt32(lsDT.Rows[i]["fk_CPP_PRO_ProductID"].ToString())].ProductName);
            }

            return sb.ToString();
        }
       
        public static string GetRemindersAgainstCallPlannerMIOLevelID(long CallPlannerMIOLevelID)
        {
            StringBuilder sb = new StringBuilder();
            DataTable lsDT = getRemindersAgainstCallPlannerMIOLevelID(CallPlannerMIOLevelID);
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                if (i != 0)
                    sb.Append("*");

                sb.Append(lsDT.Rows[i]["fk_CPP_PRO_ProductID"]);
            }

            return sb.ToString();
        }
        public static string GetRemindersNameAgainstCallPlannerMIOLevelID(long CallPlannerMIOLevelID)
        {
            StringBuilder sb = new StringBuilder();
            DataTable lsDT = getRemindersAgainstCallPlannerMIOLevelID(CallPlannerMIOLevelID);
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                if (i != 0)
                    sb.Append("*");

                sb.Append(ProductCollection.Instance[Convert.ToInt32(lsDT.Rows[i]["fk_CPP_PRO_ProductID"].ToString())].ProductName);
            }

            return sb.ToString();
        }
        
        public static string GetSamplesAndQuantityAgainstCallPlannerMIOLevelID(long CallPlannerMIOLevelID)
        {
            StringBuilder sb = new StringBuilder();
            DataTable lsDT = getSamplesQuantityAgainstCallPlannerMIOLevelID(CallPlannerMIOLevelID);
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                if (i != 0)
                    sb.Append("*");

                sb.Append(lsDT.Rows[i]["fk_CPP_PRO_ProductID"] + "|" + lsDT.Rows[i]["Quantity"]);
            }

            return sb.ToString();
        }
        public static string GetSamplesNameAndQuantityAgainstCallPlannerMIOLevelID(long CallPlannerMIOLevelID)
        {
            StringBuilder sb = new StringBuilder();
            DataTable lsDT = getSamplesQuantityAgainstCallPlannerMIOLevelID(CallPlannerMIOLevelID);
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                if (i != 0)
                    sb.Append("*");

                sb.Append(ProductCollection.Instance[Convert.ToInt32(lsDT.Rows[i]["fk_CPP_PRO_ProductID"].ToString())].ProductName + "|" + lsDT.Rows[i]["Quantity"]);
            }

            return sb.ToString();
        }
        
        public static string GetGiftsAgainstCallPlannerMIOLevelID(long CallPlannerMIOLevelID)
        {
            StringBuilder sb = new StringBuilder();
            DataTable lsDT = getGiftsAgainstCallPlannerMIOLevelID(CallPlannerMIOLevelID);
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                if (i != 0)
                    sb.Append("*");

                sb.Append(lsDT.Rows[i]["fk_CPP_GFT_GiftID"]);
            }

            return sb.ToString();
        }
        public static string GetGiftsNameAgainstCallPlannerMIOLevelID(long CallPlannerMIOLevelID)
        {
            StringBuilder sb = new StringBuilder();
            DataTable lsDT = getGiftsAgainstCallPlannerMIOLevelID(CallPlannerMIOLevelID);
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                if (i != 0)
                    sb.Append("*");

                sb.Append(GiftsCollection.Instance[Convert.ToInt32(lsDT.Rows[i]["fk_CPP_GFT_GiftID"])].GiftName);
            }

            return sb.ToString();
        }


        public static bool ProcessGetInformedJVs(int id)
        {
            DataTable lsDT = getInformedJVs(id);
            if (lsDT.Rows.Count > 0)
                return true;

            return false;
        }
        public static string GetPuriedString(string str)
        {
            return str.Replace(";", " ").Replace(",", " ").Replace("$", " ").Replace("^", " ").Replace("#", " ").Replace("@", " ").Replace("*", " ").Replace("%", " ");
        }
        public static bool CheckProductOrReminderConatinsSelect(string[] ProductOrReminder)
        {
            for (int i = 0; i < ProductOrReminder.Length - 1; i++)
            {
                if (ProductOrReminder[i] == "-1")
                    return true;
            }
            return false;
        }
        public static bool CheckProductOrReminderComboSame(string[] ProductOrReminder,bool isOptional)
        {            

            for (int i = 0; i < ProductOrReminder.Length - 1; i++)
            {
                for (int j = 0; j < ProductOrReminder.Length - 1; j++)
                {
                    if (i != j)
                    {
                        if (isOptional)
                        {
                            if (ProductOrReminder[i] != "-1" && ProductOrReminder[j] != "-1") //This is if product and reminders optional
                                if (ProductOrReminder[i] == ProductOrReminder[j])
                                    return true;
                        }
                        else
                        {
                            if (ProductOrReminder[i] == ProductOrReminder[j])
                                return true;
                        }                        
                    }
                }
            }

            return false;
        }
        public static bool CheckSampleQuantityComboSame(string[] productOrReminder, bool isOptional)
        {

            for (int i = 0; i < productOrReminder.Length - 1; i++)
            {
                for (int j = 0; j < productOrReminder.Length - 1; j++)
                {
                    if (i != j)
                    {
                        if (isOptional)
                        {
                            if (productOrReminder[i].Split('|')[0] != "-1" && productOrReminder[j].Split('|')[0] != "-1") //This is if product and reminders optional
                                if (productOrReminder[i].Split('|')[0] == productOrReminder[j].Split('|')[0])
                                    return true;
                        }
                        else
                        {
                            if (productOrReminder[i].Split('|')[0] == productOrReminder[j].Split('|')[0])
                                return true;
                        }
                    }
                }
            }

            return false;
        }
        public static DataTable getSpecialities()
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetSpecialities";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getSpecialities", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        public static DataTable getDistinctProductsWithSpecialities()
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetDistinctProductsWithSpecialities";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getDistinctProductsWithSpecialities", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        public static int DeleteProductsWithSpecialitiesBySpecialityID(int id)
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_DeleteProductsWithSpecialitiesBySpecialityID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPS_SPE_SpecialityID", id);
            int r = 1;
            com.Connection = conn;
            try
            {
                conn.Open();
                com.ExecuteNonQuery();
            }

            catch (SqlException SE)
            {
                r = 0;
                Log.Logging("SchedulerManager.deleteCallPlannerActivity", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return r;
        }
        public static DataTable getProductsWithSpecialitiesBySpecialityID(int ID)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetProductsWithSpecialitiesBySpecialityID";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@fk_CPS_SPE_SpecialityID", ID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getProductsWithSpecialitiesBySpecialityID", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        public static int InsertProductsWithSpeciality(int specialityID, int productID, string type) 
        {
            SqlConnection conn = DBConnection.Instance.GetConnection();
            SqlCommand com = new SqlCommand();
            com.CommandText = "Call_InsertProductsWithSpeciality";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@fk_CPS_SPE_SpecialityID", specialityID);
            com.Parameters.AddWithValue("@fk_CPS_PRO_ProductID", productID);
            com.Parameters.AddWithValue("@CPS_TYPE", type);
            int id = 0;
            com.Connection = conn;
            try
            {
                conn.Open();
                id = Convert.ToInt32(com.ExecuteScalar());
            }

            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.InsertProductsWithSpeciality", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return id;
        }
        public static int getSpecialityByDoctor(long DoctorID)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            int specialityID = -1;
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "Call_GetSpecialityByDoctor";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@DoctorID", DoctorID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
                if (lsDT.Rows.Count > 0)
                    specialityID = int.Parse(lsDT.Rows[0]["SpecialityId"].ToString());
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getClassesByDoctor", SE.Message + SE.StackTrace);
            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return specialityID;
        }


        public static DataTable CheckPlanStatus(int employeeID)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "sp_CheckPlannedDoctorsStatus";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getProductsWithSpecialitiesBySpecialityID", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }

        public static DataTable CheckPlanStatus(int employeeID, DateTime initial)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "sp_CheckPlannedDoctorsStatus";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@Month", initial.Month);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@Year", initial.Year);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getProductsWithSpecialitiesBySpecialityID", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
        public static DataTable CheckPlanStatusFrequency(int employeeID, DateTime initial)
        {
            SqlConnection conn;
            conn = DBConnection.Instance.GetConnection();
            string lsSQLCommand = "";
            SqlCommand com = new SqlCommand(lsSQLCommand, conn);
            DataTable lsDT = new DataTable();
            try
            {
                conn.Open();
                SqlDataAdapter lsSQLAdaptor = new SqlDataAdapter(lsSQLCommand, conn);
                lsSQLCommand = "sp_CheckPlannedDoctorsFrequency";
                lsSQLAdaptor.SelectCommand.CommandType = CommandType.StoredProcedure;
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@Month", initial.Month);
                lsSQLAdaptor.SelectCommand.Parameters.AddWithValue("@Year", initial.Year);
                lsSQLAdaptor.SelectCommand.CommandText = lsSQLCommand;
                lsSQLAdaptor.Fill(lsDT);
            }
            catch (SqlException SE)
            {
                Log.Logging("SchedulerManager.getProductsWithSpecialitiesBySpecialityID", SE.Message + SE.StackTrace);
            }

            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
            return lsDT;
        }
    }
}

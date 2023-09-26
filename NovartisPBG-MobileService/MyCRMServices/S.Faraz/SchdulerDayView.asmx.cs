using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using MyCRMServices.Class;
using System.IO;
using System.Configuration;
using System.Net;
using System.Text;
using System.Web.Script.Services;
using System.Text.RegularExpressions;
using System.Device.Location;
using System.Web.Script.Serialization;

namespace MyCRMServices
{
    /// <summary>
    /// Summary description for SchdulerDayView
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]

    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    //[WebServiceBinding(ConformsTo = WsiProfiles.None)]  
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SchdulerDayView : System.Web.Services.WebService
    {
        /*
        Webservice create Ojects DAL(Data Access layer), NameValueCollection and Entities
        */
        readonly DAL _dl = new DAL();
        private NameValueCollection _nv = new NameValueCollection();
        readonly Entities _dbcontext = new Entities();


        /*
         Webservice method for insert setAttendance of sp_AttInsert
        */


        [WebMethod]
        public DataTable AttendanceReportForHRAPI(string dt1, string emptype, string Date)
        {
            //  var returnString = "";
            DataTable dt = new DataTable();
            var dsDist = _dl.GetData("sp_AttendanceReportforHRForApi",
                 new NameValueCollection {
                    { "@Level1Id-int",  0.ToString()},
                    { "@Level2Id-int",  0.ToString()},
                    { "@Level3Id-int",  0.ToString()},
                    { "@Level4Id-int",  0.ToString()},
                    { "@Level5Id-int",  0.ToString()},
                    { "@Level6Id-int",  0.ToString()},
                    { "@TeamId-int",    0.ToString()},
                    { "@EmployeeId-int",0.ToString()},
                    { "@EmpStatus-int",dt1.ToString()},/*1*/
                    { "@EmpType-varchar(max)",emptype},/*SPO*/
                    { "@StartingDate-date",Date.ToString() }  });/*8 / 14 / 2023*/
            if (dsDist != null)
            {
             
                dt = dsDist.Tables[0];
            }

           
            return dt;
        }


        //[WebMethod]
        //public string AttendanceReportForHRAPI(string dt1, string emptype, string Date)
        //{
        //    var returnString = "";

        //    var dsDist = _dl.GetData("sp_AttendanceReportforHRForApi",
        //         new NameValueCollection {
        //            { "@Level1Id-int",  0.ToString()},
        //            { "@Level2Id-int",  0.ToString()},
        //            { "@Level3Id-int",  0.ToString()},
        //            { "@Level4Id-int",  0.ToString()},
        //            { "@Level5Id-int",  0.ToString()},
        //            { "@Level6Id-int",  0.ToString()},
        //            { "@TeamId-int",    0.ToString()},
        //            { "@EmployeeId-int",0.ToString()},
        //            { "@EmpStatus-int",dt1.ToString()},/*1*/
        //            { "@EmpType-varchar(max)",emptype},/*SPO*/
        //            { "@StartingDate-date",Date.ToString() }  });/*8 / 14 / 2023*/
        //    if (dsDist != null)
        //    {
        //        returnString = dsDist.Tables[0].ToJsonString();
        //    }

        //    else
        //    {
        //        returnString = "[]";
        //    }

        //    return returnString;
        //}

        [WebMethod]
        public string ExpensesReportNotification(string empid, string Start, string end)
        {
            var returnString = "";


            var dsDist = _dl.GetData("sp_ExpensesReportNotification", new NameValueCollection {
                { "@EmployeeId-INT", empid },
                { "@Start-date", Start },
                { "@END-date", end }
            });
            if (dsDist.Tables.Count > 0)
            {



                returnString = dsDist.Tables[0].ToJsonString();
            }

            else
            {
                returnString = "[]";
            }

            return returnString;
        }







        [WebMethod]
        public string FrequencyNotification(string Start, string end, string empid)
        {
            string Frequency = "Class/Frequency Approval";
            var returnResult = string.Empty;
            DataSet dt = new DataSet();
            try
            {


                _nv.Clear();
                _nv.Add("@Start-date", Start.ToString());
                _nv.Add("@END-date", end.ToString());
                _nv.Add("@ManagerId-int", empid.ToString());
                _nv.Add("@Typeof-varchar(100)", Frequency.ToString());
                var ds = _dl.GetData("FrequencyandBrickNotification", _nv);

                if (ds.Tables.Count > 0)
                {
                    returnResult = ds.Tables[0].ToJsonString();
                }

                else
                {
                    returnResult = "[]";
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;




        }



        [WebMethod]
        public string BrickNotification(string empid, string Start, string end)
        {
            string Brick = "Brick";
            var returnResult = string.Empty;
            try
            {


                _nv.Clear();
                _nv.Add("@Start-date", Start.ToString());
                _nv.Add("@END-date", end.ToString());
                _nv.Add("@ManagerId-int", empid.ToString());
                _nv.Add("@Typeof-varchar(100)", Brick.ToString());
                var dsemp = _dl.GetData("FrequencyandBrickNotification", _nv);

                if (dsemp.Tables.Count > 0)
                {
                    returnResult = dsemp.Tables[0].ToJsonString();

                }
                else
                {
                    returnResult = "[]";
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;




        }


        [WebMethod]
        public string DoctorRemovable(string empid, string Start, string end)
        {
            string Brick = "Doctor Removable";
            var returnResult = string.Empty;
            try
            {


                _nv.Clear();
                _nv.Add("@Start-date", Start.ToString());
                _nv.Add("@END-date", end.ToString());
                _nv.Add("@ManagerId-int", empid.ToString());
                _nv.Add("@Typeof-varchar(100)", Brick.ToString());
                DataSet dsemp = _dl.GetData("FrequencyandBrickNotification", _nv);


                if (dsemp.Tables.Count > 0)
                {
                    returnResult = dsemp.Tables[0].ToJsonString();

                }
                else
                {
                    returnResult = "[]";
                }




            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;





        }

        [WebMethod]
        public string AdditionDoctorRequest(string empid, string Start, string end)
        {
            string AdditionDoctorRequest = "Addition Doctor Request";
            var returnResult = string.Empty;
            try
            {


                _nv.Clear();
                _nv.Add("@Start-date", Start.ToString());
                _nv.Add("@END-date", end.ToString());
                _nv.Add("@ManagerId-int", empid.ToString());
                _nv.Add("@Typeof-varchar(100)", AdditionDoctorRequest.ToString());
                DataSet dsemp = _dl.GetData("FrequencyandBrickNotification", _nv);


                if (dsemp.Tables.Count > 0)
                {
                    returnResult = dsemp.Tables[0].ToJsonString();

                }
                else
                {
                    returnResult = "[]";
                }




            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;





        }



        [WebMethod]
        public string LeaveRequest(string empid, string Start, string end)
        {
            string LeaveRequest = "Leave Request";
            var returnResult = string.Empty;
            try
            {


                _nv.Clear();
                _nv.Add("@Start-date", Start.ToString());
                _nv.Add("@END-date", end.ToString());
                _nv.Add("@ManagerId-int", empid.ToString());
                _nv.Add("@Typeof-varchar(100)", LeaveRequest.ToString());
                DataSet dsemp = _dl.GetData("FrequencyandBrickNotification", _nv);


                if (dsemp.Tables.Count > 0)
                {
                    returnResult = dsemp.Tables[0].ToJsonString();

                }
                else
                {
                    returnResult = "[]";
                }




            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;

        }






        [WebMethod]
        public string PlansNotification(string empid, string Start, string end)
        {
            var returnString = "";

            var dsDist = _dl.GetData("PlansNotification", new NameValueCollection {
                { "@EmployeeId-int", empid },
                { "@Start-date", Start },
                { "@END-date", end } });
            if (dsDist != null)
            {
                returnString = dsDist.Tables[0].ToJsonString();
            }

            else
            {
                returnString = "[]";
            }

            return returnString;
        }










        [WebMethod]
        public string AttendanceReportForHRAPIDaily(string StartingDate)
        {
            var returnString = "";


            var AttendanceReportForHRAPI = _dl.GetData("sp_AttendanceReportForHRAPIDaily", new NameValueCollection { { "@StartingDate-date", StartingDate } });
            if (AttendanceReportForHRAPI != null)
            {
                returnString = AttendanceReportForHRAPI.Tables[0].ToJsonString();
            }

            return returnString;
        }

        [WebMethod]
        public string AttendanceReportForHRAPIMonthly(string StartingDate)
        {
            var returnString = "";


            var AttendanceReportForHRAPI = _dl.GetData("sp_AttendanceReportForHRAPIMonthly", new NameValueCollection { { "@StartingDate-date", StartingDate } });
            if (AttendanceReportForHRAPI != null)
            {
                returnString = AttendanceReportForHRAPI.Tables[0].ToJsonString();
            }

            return returnString;
        }















        [WebMethod]
        public string GetAttendancetype(string role)
        {
            var returnString = "";
            if (role == "MIO")
            {
                var dsDayViewReslt = _dl.GetData("sp_GetAttendancetype", null);
                if (dsDayViewReslt != null)
                {
                    returnString = dsDayViewReslt.Tables[0].ToJsonString();
                }
            }
            if (role == "ZSM")
            {
                var dsDayViewReslt = _dl.GetData("sp_GetAttendancetypeZSM", null);
                if (dsDayViewReslt != null)
                {
                    returnString = dsDayViewReslt.Tables[0].ToJsonString();
                }
            }
            if (role == "RSM")
            {
                var dsDayViewReslt = _dl.GetData("sp_GetAttendancetypeRSM", null);
                if (dsDayViewReslt != null)
                {
                    returnString = dsDayViewReslt.Tables[0].ToJsonString();
                }
            }
         

            return returnString;
        }

        [WebMethod]
        public string GetDistributorAllData(string empid)
        {
            var returnString = "";

            var dsDist = _dl.GetData("sp_GetAllDistributors", new NameValueCollection { { "@EmployeeId-INT", empid } });
            if (dsDist != null)
            {
                returnString = dsDist.Tables[0].ToJsonString();
            }

            else
            {
                returnString = "[]";
            }

            return returnString;

        }

        [WebMethod]
        public string GetBrickData(string distid)
        {
            var returnString = "";

            var dsDist = _dl.GetData("sp_GetBricksDataById", new NameValueCollection { { "@DistID-INT", distid } });
            if (dsDist != null)
            {
                returnString = dsDist.Tables[0].ToJsonString();
            }

            else
            {
                returnString = "[]";
            }

            return returnString;
        }


        //---------------------------------------------- Create By Faraz to get pharmcy by brick Id ------------------------------------------------- 

        [WebMethod]
        public string GetpharmcyData(string bricks)
        {
            var returnString = "";

            var dsDist = _dl.GetData("sp_Getpharmcy_bybrickid", new NameValueCollection { { "@bricks-INT", bricks } });
            if (dsDist != null)
            {
                returnString = dsDist.Tables[0].ToJsonString();
            }

            else
            {
                returnString = "[]";
            }

            return returnString;
        }

        //------------------------------------------ For Incentive and estimate amount -----------------------------------------------------------

        [WebMethod]
        public string GetINC_ESTData(string Type)
        {
            var returnString = "";

            var dsDist = _dl.GetData("sp_GetIncentive_type", new NameValueCollection { { "@Type-varchar(5)", Type.ToString() } });
            if (dsDist != null)
            {
                returnString = dsDist.Tables[0].ToJsonString();
            }

            else
            {
                returnString = "[]";
            }

            return returnString;
        }


        //---------------------------------------------- Insert --------------------------------------------------------------------------------------



        [WebMethod]
        public string InsertSalesBrickBydoctor(int Employee_Id, string Product_id, int Brick_id, string Pharmcy_id, string Doctor_id, string Distribiutor_Id, string Insentive, string Estimate_amount, DateTime StartDate, DateTime EndDate, string Comments)  //inserts a record into sp_InsertSalesBrickBydoctor Table
        {
            // int id = 0;

            string result = "not saved";

            try
            {
                /*@EmployeeId int,
             @PlanMonth datetime,
             @Description nvarchar(4000),
             @IsEditable bit,
             @PlanStatus nvarchar(5),
             @PlanStatusReason nvarchar(4000),
             @EmpAuthID int*/

                var data = _dl.GetData("sp_InsertSalesBrickBydoctor",
                 new NameValueCollection {
                    { "@Employee_Id-int",Employee_Id.ToString() },
                    { "@Product_id-varchar(max)", Product_id.ToString() } ,
                    { "@Brick_id-int",Brick_id.ToString() },
                    { "@Pharmcy_id-nvarchar(max)",Pharmcy_id.ToString() },
                    { "@Doctor_id-nvarchar(100)",Doctor_id.ToString() },
                    { "@Distribiutor_Id-nvarchar(20)",Distribiutor_Id.ToString() },
                    { "@Insentive-nvarchar(max)",Insentive.ToString() },
                    { "@Estimate_amount-nvarchar(max)",Estimate_amount.ToString() },
                    { "@StartDate-Datetime",StartDate.ToString() },
                    { "@EndDate-Datetime",EndDate.ToString() },
                    { "@Comments-nvarchar(max)",Comments.ToString() }
                     //{ "@Level1LevelId-varchar(50)", Level1LevelId.ToString() } ,
                     //{ "@Level2LevelId-varchar(50)", Level2LevelId.ToString() } ,
                     //{ "@Level3LevelId-varchar(50)", Level3LevelId.ToString() } ,
                     //{ "@Level4LevelId-varchar(50)", Level4LevelId.ToString() } ,
                     //{ "@Level5LevelId-varchar(50)", Level5LevelId.ToString() } ,
                     //{ "@Level6LevelId-varchar(50)", Level6LevelId.ToString() } ,

                 });

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count != 0)
                    {
                        // id = ("DataSuccessfullyInserted" + (Convert.ToInt32(data.Tables[0].Rows[0][0])));
                        //id = Convert.ToInt32(data.Tables[0].Rows[0][0]);
                        result = "OK";
                    }
                }
                //else {

                //    if (data.Tables[0].Rows.Count != 0)
                //    {
                //        id = Convert.ToInt32(data.Tables[0].Rows[0][0]);
                //    }
                //}

            }

            catch (Exception SE)
            {
                //Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
            }
            return result;
        }








        //[WebMethod]
        //public int InsertSalesBrickBydoctor(int Employee_Id, string Product_id, int Brick_id, string Pharmcy_id, string Doctor_id, string Distribiutor_Id, string Insentive,
        //                                    string Estimate_amount, DateTime StartDate, DateTime EndDate, string Comments)  //inserts a record into sp_InsertSalesBrickBydoctor Table
        //{
        //    int id = 0;
        //    try
        //    {
        //        /*@EmployeeId int,
        //     @PlanMonth datetime,
        //     @Description nvarchar(4000),
        //     @IsEditable bit,
        //     @PlanStatus nvarchar(5),
        //     @PlanStatusReason nvarchar(4000),
        //     @EmpAuthID int*/

        //        var data = _dl.GetData("sp_InsertSalesBrickBydoctor",
        //         new NameValueCollection {
        //            { "@Employee_Id-int",Employee_Id.ToString() },
        //            { "@Product_id-varchar(50)", Product_id.ToString() } ,
        //            { "@Brick_id-int",Brick_id.ToString() },
        //            { "@Pharmcy_id-nvarchar(max)",Pharmcy_id.ToString() },
        //            { "@Doctor_id-nvarchar(100)",Doctor_id.ToString() },
        //            { "@Distribiutor_Id-nvarchar(20)",Distribiutor_Id.ToString() },
        //            { "@Insentive-nvarchar(max)",Insentive.ToString() },
        //            { "@Estimate_amount-nvarchar(max)",Estimate_amount.ToString() },
        //            { "@StartDate-Datetime",StartDate.ToString() },
        //            { "@EndDate-Datetime",EndDate.ToString() },
        //            { "@Comments-nvarchar(max)",Comments.ToString() }
        //             //{ "@Level1LevelId-varchar(50)", Level1LevelId.ToString() } ,
        //             //{ "@Level2LevelId-varchar(50)", Level2LevelId.ToString() } ,
        //             //{ "@Level3LevelId-varchar(50)", Level3LevelId.ToString() } ,
        //             //{ "@Level4LevelId-varchar(50)", Level4LevelId.ToString() } ,
        //             //{ "@Level5LevelId-varchar(50)", Level5LevelId.ToString() } ,
        //             //{ "@Level6LevelId-varchar(50)", Level6LevelId.ToString() } ,

        //         });

        //        if (data != null)
        //        {
        //            if (data.Tables[0].Rows.Count != 0)
        //            {
        //                // id = ("DataSuccessfullyInserted" + (Convert.ToInt32(data.Tables[0].Rows[0][0])));
        //                id = Convert.ToInt32(data.Tables[0].Rows[0][0]);
        //            }
        //        }
        //        //else {

        //        //    if (data.Tables[0].Rows.Count != 0)
        //        //    {
        //        //        id = Convert.ToInt32(data.Tables[0].Rows[0][0]);
        //        //    }
        //        //}

        //    }

        //    catch (Exception SE)
        //    {
        //        //Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
        //    }
        //    return id;
        //}




        //-------------------------------------------------- End ----------------------------------------------------------------------------------------

        [WebMethod]
        public string GetDistributorAllSales(string empid)
        {
            var returnString = "";

            var dsDist = _dl.GetData("sp_GetDistDoctorsSales", new NameValueCollection { { "@EmployeeId-INT", empid } });
            if (dsDist != null)
            {
                returnString = dsDist.Tables[0].ToJsonString();
            }
            return returnString;
        }




        [WebMethod]
        public string GetBricksAllSales(string DistID)
        {
            var returnString = "";

            var dsDist = _dl.GetData("sp_GetBricksSales", new NameValueCollection { { "@DistID-INT", DistID } });
            if (dsDist != null)
            {
                returnString = dsDist.Tables[0].ToJsonString();
            }
            return returnString;
        }

        [WebMethod]
        public string GetCustomersSales(string BrickId)
        {
            var returnString = "";

            var dsDist = _dl.GetData("sp_GetCustomersSales", new NameValueCollection { { "@BrickId-INT", BrickId } });
            if (dsDist != null)
            {
                returnString = dsDist.Tables[0].ToJsonString();
            }
            return returnString;
        }



        [WebMethod]
        public string GetPharmacybyEmployeeID(string EmployeeID)
        {
            var returnString = "";

            var dsDist = _dl.GetData("sp_GetPharmacybyEmployeeID", new NameValueCollection { { "@EmployeeID-INT", EmployeeID } });
            if (dsDist != null)
            {
                returnString = dsDist.Tables[0].ToJsonString();
            }
            return returnString;
        }


        //EmployeeDoctorBrickRelation Insert API
        [WebMethod]
        public string EmployeeDoctorBrickRelation(string EmployeeID, string DistributorID, string BrickID, string CustomerID)
        {
            var returnString = "";
            var data = "";

            string[] ja = CustomerID.Split(',');

            _nv.Clear();
            _nv.Add("@EmployeeID-varchar(max)", EmployeeID.ToString());
            _nv.Add("@DistributorID-varchar(max)", DistributorID.ToString());
            _nv.Add("@BrickID-varchar(max)", BrickID.ToString());
            var ds = _dl.GetData("sp_InsertEmployeeDistBrickRelation", _nv);

            string PKID = ds.Tables[0].Rows[0]["PK_ID"].ToString();

            for (int i = 0; i < ja.Length; i++)
            {
                string CustID = ja[i].ToString();

                _nv.Clear();
                _nv.Add("@FK_ID-int", PKID);
                _nv.Add("@EmployeeID-int", EmployeeID);
                _nv.Add("@CustomerID-int", CustID);
                // _nv.Add("@DoctorID-int", DoctorID);
                var dsdata = _dl.GetData("sp_InsertEmployeeCustDocRelation", _nv);
            }

            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                //returnString = ds.Tables[0].ToJsonString(); //"DataSuccessfullyInserted";
                returnString = ds.Tables[0].ToJsonString();
            }
            else
            {

                returnString = "Something Went Wrong!";
            }

            return returnString;
        }



        [WebMethod]
        public string InsertEmployeeBrickRelation(string EmployeeID, string DistributorID, string BrickIds)
        {
            var returnString = "";
            string[] ja = BrickIds.Split(',');
            _nv.Clear();
            _nv.Add("@EmployeeID-varchar(max)", EmployeeID.ToString());
            _nv.Add("@DistributorID-varchar(max)", DistributorID.ToString());
            var ds = _dl.GetData("sp_InsertEmployeeDistRelation", _nv);

            string PKID = ds.Tables[0].Rows[0]["PK_ID"].ToString();
            var Percentage = 100;
            for (int i = 0; i < ja.Length; i++)
            {
                string Brickid = ja[i].ToString();
                _nv.Clear();
                _nv.Add("@FK_ID-int", PKID);
                _nv.Add("@EmployeeID-int", EmployeeID);
                _nv.Add("@BrickID-varchar(max)", Brickid.ToString());
                _nv.Add("@Percentage-int",Percentage.ToString());
                var dsdata = _dl.GetData("sp_InsertEmployeeBrickRelation", _nv);

                if (dsdata.Tables[0].Rows[0]["Message"].ToString() == "Brick Already Assign")
                {

                    returnString = "Brick Already Assign with The id BrickId " + Brickid;
                    break;
                }
                else
                {
                    returnString = "DataSuccessfullyInserted";
                }
            } 
            return returnString;
        }
        [WebMethod]
        public string CustomerDoctorRelationWithEmployee(string EmployeeID, string CustomerID, string DoctorID)
        {
            var returnString = "";
            var data = "";

            string[] ja = CustomerID.Split(',');

            for (int i = 0; i < ja.Length; i++)
            {
                string CustID = ja[i].ToString();

                _nv.Clear();
                _nv.Add("@EmployeeID-int", EmployeeID);
                _nv.Add("@CustomerID-int", CustID);
                _nv.Add("@DoctorID-int", DoctorID);
                // _nv.Add("@DoctorID-int", DoctorID);
                var ds = _dl.GetData("sp_CustomerDoctorRelationWithEmployee", _nv);

                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    //returnString = ds.Tables[0].ToJsonString(); //"DataSuccessfullyInserted";
                    returnString = ds.Tables[0].ToJsonString();
                }
                else
                {
                    returnString = "Something Went Wrong!";
                }
            }

            return returnString;
        }


        [WebMethod]
        public string GetAttendancetypes()
        {
            var returnString = "";

            var dsDayViewReslt = _dl.GetData("sp_GetAttendancetypes", null);
            if (dsDayViewReslt != null)
            {
                returnString = dsDayViewReslt.Tables[0].ToJsonString();
            }
            return returnString;
        }

        //Rehman (2021-04-26)
        public string GetSPODetails(string employeeId)
        {
            var returnString = "";
            try
            {
                var dsDayViewReslt = _dl.GetData("sp_GetSPODetails", new NameValueCollection { { "@ManagerId-INT", employeeId } });
                if (dsDayViewReslt != null)
                {
                    returnString = dsDayViewReslt.Tables[0].ToJsonString();
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return returnString;
        }

        public string GetZSMDetails(string employeeId)
        {
            var returnString = "";
            try
            {
                var dsDayViewReslt = _dl.GetData("sp_GetZSMDetails", new NameValueCollection { { "@ManagerId-INT", employeeId } });
                if (dsDayViewReslt != null)
                {
                    returnString = dsDayViewReslt.Tables[0].ToJsonString();
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return returnString;
        }
        //



        [WebMethod]
        public string setAttendance(string ID, string Othertype, string Datetime, string lat, string lng, string description, string empid)
        {
            string data = "";
            DateTime result;
            if (!DateTime.TryParse(Datetime, out result))
            {
                return "DateTime Format Is invalid";
            }

            if (Convert.ToDateTime(Datetime).ToShortDateString().ToString() == DateTime.Now.ToShortDateString().ToString())
            {
                #region Attendance Check


                _nv = new NameValueCollection();
                _nv.Clear();
                _nv.Add("@ID-bigint", ID);
                DataSet ds = _dl.GetData("sp_CheckForLocationNeed", _nv);

                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    if (ds.Tables[0].Rows[0][0].ToString() == "True")
                    {

                        _nv = new NameValueCollection();
                        _nv.Clear();
                        _nv.Add("@Empid-bigint", empid);
                        _nv.Add("@AttType-bigint", ID);
                        _nv.Add("@OtherType-varchar(255)", Othertype.ToString());
                        _nv.Add("@Description-varchar(255)", description);
                        _nv.Add("@MDateTime-datetime", result.ToString());
                        _nv.Add("@Latitude-varchar(100)", lat);
                        _nv.Add("@Longitude-varchar(100)", lng);

                        DataSet dschkatt = _dl.GetData("sp_checkCallExecute_New", _nv);
                        if (dschkatt != null)
                        {
                            if (dschkatt.Tables[0].Rows.Count > 0)
                            {
                                if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyleavemMarked")
                                {
                                    data = "AlreadyLeaveMarked";
                                    return data;
                                }
                                if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadysposalesmeetingmarked")
                                {
                                    data = "AlreadysalesMeetingMarked";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyuseforspotraining")
                                {
                                    data = "AlreadyUseForSpoTraining";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyOutBackmarked")
                                {
                                    data = "AlreadyUseForOutBack";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyNightStaymarked")
                                {
                                    data = "AlreadyUseForNightStay";
                                    return data;
                                }

                                else
                                {
                                    data = "Successfully";

                                }

                            }
                        }


                    }

                    else
                    {
                        data = "Not Active";

                    }

                }
                else
                {
                    data = "Error";
                }

                #endregion
            }
            else
            {
                data = "DateNotMatch";
            }


            //}
            return data;

        }


        ////Shahrukh 3/2/2020
        //[WebMethod(MessageName = "OldMethod")]
        //public string setAttendance_NewStructure(string ID, string ExpenseTypeID, string Employeeid, string StartDateTime, string EndDateTime,
        //    string lat, string lng, string description, string Flag, string Visitshift)
        //{
        //    string data = "";
        //    double GetCallDitanceForMobile = 0;
        //    string Previouslat = "";
        //    string Previouslng = "";





        //    DateTime result;
        //    if (!DateTime.TryParse(StartDateTime, out result))
        //    {
        //        return "Start DateTime Format Is invalid";
        //    }

        //    if (Convert.ToDateTime(StartDateTime).ToShortDateString().ToString() == DateTime.Now.ToShortDateString().ToString())
        //    {
        //        #region Attendance Check


        //        _nv = new NameValueCollection();
        //        _nv.Clear();
        //        _nv.Add("@ID-bigint", ID);
        //        _nv.Add("@Employeeid-bigint", Employeeid);
        //        DataSet ds = _dl.GetData("sp_CheckForLocationNeedAndEmployeeLocation", _nv);

        //        if (ds != null && ds.Tables[0].Rows.Count > 0)
        //        {
        //            if (ds.Tables[0].Rows[0][0].ToString() == "True")
        //            {
        //                GetCallDitanceForMobile = new GeoCoordinate(Convert.ToDouble(ds.Tables[0].Rows[0][1].ToString()),
        //                    Convert.ToDouble(ds.Tables[0].Rows[0][2].ToString()))
        //                                        .GetDistanceTo(new GeoCoordinate(Convert.ToDouble(lat),
        //                                            Convert.ToDouble(lng)));
        //                GetCallDitanceForMobile = GetCallDitanceForMobile / 1000;
        //                Previouslat = ds.Tables[0].Rows[0][1].ToString();
        //                Previouslng = ds.Tables[0].Rows[0][2].ToString();
        //                _nv = new NameValueCollection();
        //                _nv.Clear();
        //                _nv.Add("@AttTypeID-bigint", ID);
        //                _nv.Add("@FK_ExpenseActivityID-bigint", ExpenseTypeID);
        //                _nv.Add("@EmployeeId-varchar(255)", Employeeid.ToString());
        //                _nv.Add("@Description-varchar(255)", description);
        //                _nv.Add("@StartDateTime-datetime", result.ToString());
        //                _nv.Add("@EndDateTime-datetime", EndDateTime);
        //                _nv.Add("@CurrentLatitude-varchar(100)", lat);
        //                _nv.Add("@CurrentLongitude-varchar(100)", lng);
        //                _nv.Add("@PreviousBaseCityLatitude-varchar(100)", Previouslat);
        //                _nv.Add("@PreviousBaseCityLongitude-varchar(100)", Previouslng);
        //                _nv.Add("@distance-varchar(100)", GetCallDitanceForMobile.ToString());
        //                _nv.Add("@Flag-varchar(100)", Flag);
        //                _nv.Add("@Visitshift-varchar(100)", Visitshift);
        //                DataSet dschkatt = _dl.GetData("Sp_IndividualActivityExecution", _nv);
        //                if (dschkatt != null)
        //                {
        //                    if (dschkatt.Tables[0].Rows.Count > 0)
        //                    {
        //                        if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyleavemMarked")
        //                        {
        //                            data = "AlreadyLeaveMarked";
        //                            return data;
        //                        }
        //                        if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadysposalesmeetingmarked")
        //                        {
        //                            data = "AlreadysalesMeetingMarked";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyuseforspotraining")
        //                        {
        //                            data = "AlreadyUseForSpoTraining";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyOutBackmarked")
        //                        {
        //                            data = "AlreadyUseForOutBack";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyNightStaymarked")
        //                        {
        //                            data = "AlreadyUseForNightStay";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMorningcontactpointmarked")
        //                        {
        //                            data = "AlreadyUseForMorningContactPoint";
        //                            return data;

        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyEveningcontactpointmarked")
        //                        {
        //                            data = "AlreadyUseForEveningContactPoint";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMonthlyMarked")
        //                        {
        //                            data = "AlreadyUseForMonthlyMeeting";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyWeeklyMarked")
        //                        {
        //                            data = "AlreadyUseForWeeklyMeeting";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySPMMarked")
        //                        {
        //                            data = "Successfully<" + dschkatt.Tables[0].Rows[0][1].ToString() + '~' + dschkatt.Tables[0].Rows[0][2].ToString() + '~' + dschkatt.Tables[0].Rows[0][3].ToString() + '~' + dschkatt.Tables[0].Rows[0][4].ToString() + '~' + dschkatt.Tables[0].Rows[0][5].ToString() + '~' + dschkatt.Tables[0].Rows[0][6].ToString() + '~' + dschkatt.Tables[0].Rows[0][7].ToString() + '~' + dschkatt.Tables[0].Rows[0][8].ToString();
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyEveningleavemMarked")
        //                        {
        //                            data = "AlreadyUseForEveningleave";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMorningleavemMarked")
        //                        {
        //                            data = "AlreadyUseForMorningleave";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySPMStarted")
        //                        {
        //                            data = "AlreadySPMStarted";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "ContactPointMarked")
        //                        {
        //                            data = "Successfully";
        //                        }
        //                        else
        //                        {
        //                            data = "Successfully" + "," + dschkatt.Tables[0].Rows[0][1].ToString();

        //                        }

        //                    }
        //                }


        //            }

        //            else
        //            {
        //                data = "Not Active";

        //            }

        //        }
        //        else
        //        {
        //            data = "Error";
        //        }

        //        #endregion
        //    }
        //    //IF SPM MARK
        //    else if (ID == "11")
        //    {
        //        #region Attendance Check


        //        _nv = new NameValueCollection();
        //        _nv.Clear();
        //        _nv.Add("@ID-bigint", ID);
        //        _nv.Add("@Employeeid-bigint", Employeeid);
        //        DataSet ds = _dl.GetData("sp_CheckForLocationNeedAndEmployeeLocation", _nv);

        //        if (ds != null && ds.Tables[0].Rows.Count > 0)
        //        {
        //            if (ds.Tables[0].Rows[0][0].ToString() == "True")
        //            {
        //                GetCallDitanceForMobile = new GeoCoordinate(Convert.ToDouble(ds.Tables[0].Rows[0][1].ToString()),
        //                    Convert.ToDouble(ds.Tables[0].Rows[0][2].ToString()))
        //                                        .GetDistanceTo(new GeoCoordinate(Convert.ToDouble(lat),
        //                                            Convert.ToDouble(lng)));
        //                GetCallDitanceForMobile = GetCallDitanceForMobile / 1000;
        //                Previouslat = ds.Tables[0].Rows[0][1].ToString();
        //                Previouslng = ds.Tables[0].Rows[0][2].ToString();
        //                _nv = new NameValueCollection();
        //                _nv.Clear();
        //                _nv.Add("@AttTypeID-bigint", ID);
        //                _nv.Add("@FK_ExpenseActivityID-bigint", ExpenseTypeID);
        //                _nv.Add("@EmployeeId-varchar(255)", Employeeid.ToString());
        //                _nv.Add("@Description-varchar(255)", description);
        //                _nv.Add("@StartDateTime-datetime", result.ToString());
        //                _nv.Add("@EndDateTime-datetime", EndDateTime);
        //                _nv.Add("@CurrentLatitude-varchar(100)", lat);
        //                _nv.Add("@CurrentLongitude-varchar(100)", lng);
        //                _nv.Add("@PreviousBaseCityLatitude-varchar(100)", Previouslat);
        //                _nv.Add("@PreviousBaseCityLongitude-varchar(100)", Previouslng);
        //                _nv.Add("@distance-varchar(100)", GetCallDitanceForMobile.ToString());
        //                _nv.Add("@Flag-varchar(100)", Flag);
        //                _nv.Add("@Visitshift-varchar(100)", Visitshift);
        //                DataSet dschkatt = _dl.GetData("Sp_IndividualActivityExecution", _nv);
        //                if (dschkatt != null)
        //                {
        //                    if (dschkatt.Tables[0].Rows.Count > 0)
        //                    {
        //                        if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyleavemMarked")
        //                        {
        //                            data = "AlreadyLeaveMarked";
        //                            return data;
        //                        }
        //                        if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadysposalesmeetingmarked")
        //                        {
        //                            data = "AlreadysalesMeetingMarked";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyuseforspotraining")
        //                        {
        //                            data = "AlreadyUseForSpoTraining";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyOutBackmarked")
        //                        {
        //                            data = "AlreadyUseForOutBack";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyNightStaymarked")
        //                        {
        //                            data = "AlreadyUseForNightStay";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMorningcontactpointmarked")
        //                        {
        //                            data = "AlreadyUseForMorningContactPoint";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMonthlyMarked")
        //                        {
        //                            data = "AlreadyUseForMonthlyMeeting";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyWeeklyMarked")
        //                        {
        //                            data = "AlreadyUseForWeeklyMeeting";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySPMMarked")
        //                        {
        //                            data = "Successfully<" + dschkatt.Tables[0].Rows[0][1].ToString() + '~' + dschkatt.Tables[0].Rows[0][2].ToString() + '~' + dschkatt.Tables[0].Rows[0][3].ToString() + '~' + dschkatt.Tables[0].Rows[0][4].ToString() + '~' + dschkatt.Tables[0].Rows[0][5].ToString() + '~' + dschkatt.Tables[0].Rows[0][6].ToString() + '~' + dschkatt.Tables[0].Rows[0][7].ToString() + '~' + dschkatt.Tables[0].Rows[0][8].ToString();
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "ExpenseActivityShouldBeSelected")
        //                        {
        //                            data = "ExpenseActivityShouldBeSelected";
        //                            return data;
        //                        }
        //                        else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySPMStarted")
        //                        {
        //                            data = "AlreadySPMStarted";
        //                            return data;
        //                        }
        //                        else
        //                        {
        //                            data = "Successfully" + "," + dschkatt.Tables[0].Rows[0][1].ToString();

        //                        }

        //                    }
        //                }


        //            }

        //            else
        //            {
        //                data = "Not Active";

        //            }

        //        }
        //        else
        //        {
        //            data = "Error";
        //        }

        //        #endregion
        //    }
        //    else
        //    {
        //        data = "DateNotMatch";
        //    }


        //    //}
        //    return data;

        //}

        [WebMethod]
        public string setAttendance_NewStructure(string ID, string ExpenseTypeID, string Employeeid, string StartDateTime, string EndDateTime,
            string lat, string lng, string description, string Flag, string Visitshift, string IMEIAddress)
        
        {
            string data = "";
            double GetCallDitanceForMobile = 0;
            string Previouslat = "";
            string Previouslng = "";


            #region Unique Device ID and Session Restriction
            bool allowexecution = false;
            try
            {
                //string executionrestrictionflag = Constants.GetExecutionRestrictionFlag();
                //if (executionrestrictionflag.ToLower() == "false")
                //{
                //    allowexecution = true;
                //}
                //else
                //{
                var dsData = _dl.GetData("sp_CheckEmployeeDeviceAndSessionStatus_IMEI", new NameValueCollection { 
                            { "@EmployeeId-BIGINT", Employeeid } ,
                               { "@IMEIAddress-VARCHAR", IMEIAddress } ,
                            { "@MacAddress-VARCHAR", "-" } ,
                            { "@Type-VARCHAR", "SetAttendance" }
                        });
                if (dsData != null)
                {
                    if (dsData.Tables[0].Rows.Count > 0)
                    {
                        if (dsData.Tables[0].Rows[0][0].ToString() == "OK")
                        {
                            allowexecution = true;
                        }
                        else
                        {
                            data = dsData.Tables[0].Rows[0][0].ToString();
                        }
                    }
                }
                //}
            }
            catch (Exception ex)
            {
                throw ex;
            }

            if (!allowexecution)
            {

                return data = (data == "") ? "ServerError" : data;

            }



            #endregion

            DateTime result;
            if (!DateTime.TryParse(StartDateTime, out result))
            {
                return "Start DateTime Format Is invalid";
            }

            if (Convert.ToDateTime(StartDateTime).ToShortDateString().ToString() == DateTime.Now.ToShortDateString().ToString() || Convert.ToDateTime(StartDateTime).ToShortDateString().ToString() != DateTime.Now.ToShortDateString().ToString())
            {
                #region Attendance Check


                _nv = new NameValueCollection();
                _nv.Clear();
                _nv.Add("@ID-bigint", ID);
                _nv.Add("@Employeeid-bigint", Employeeid);
                DataSet ds = _dl.GetData("sp_CheckForLocationNeedAndEmployeeLocation", _nv);

                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    if (ds.Tables[0].Rows[0][0].ToString() == "True")
                    {
                        GetCallDitanceForMobile = new GeoCoordinate(Convert.ToDouble(ds.Tables[0].Rows[0][1].ToString()),
                            Convert.ToDouble(ds.Tables[0].Rows[0][2].ToString()))
                                                .GetDistanceTo(new GeoCoordinate(Convert.ToDouble(lat),
                                                    Convert.ToDouble(lng)));
                        GetCallDitanceForMobile = GetCallDitanceForMobile / 1000;
                        Previouslat = ds.Tables[0].Rows[0][1].ToString();
                        Previouslng = ds.Tables[0].Rows[0][2].ToString();
                        _nv = new NameValueCollection();
                        _nv.Clear();
                        _nv.Add("@AttTypeID-bigint", ID);
                        _nv.Add("@FK_ExpenseActivityID-bigint", ExpenseTypeID);
                        _nv.Add("@EmployeeId-varchar(255)", Employeeid.ToString());
                        _nv.Add("@Description-varchar(255)", description);
                        _nv.Add("@StartDateTime-datetime", result.ToString());
                        _nv.Add("@EndDateTime-datetime", EndDateTime);
                        _nv.Add("@CurrentLatitude-varchar(100)", lat);
                        _nv.Add("@CurrentLongitude-varchar(100)", lng);
                        _nv.Add("@PreviousBaseCityLatitude-varchar(100)", Previouslat);
                        _nv.Add("@PreviousBaseCityLongitude-varchar(100)", Previouslng);
                        _nv.Add("@distance-varchar(100)", GetCallDitanceForMobile.ToString());
                        _nv.Add("@Flag-varchar(100)", Flag);
                        _nv.Add("@Visitshift-varchar(100)", Visitshift);
                        DataSet dschkatt = _dl.GetData("Sp_IndividualActivityExecution", _nv);
                        if (dschkatt != null)
                        {
                            if (dschkatt.Tables[0].Rows.Count > 0)
                            {
                                if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyleavemMarked")
                                {
                                    data = "AlreadyLeaveMarked";
                                    return data;
                                }
                                if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadysposalesmeetingmarked")
                                {
                                    data = "AlreadysalesMeetingMarked";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyuseforspotraining")
                                {
                                    data = "AlreadyUseForSpoTraining";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyOutBackmarked")
                                {
                                    data = "AlreadyUseForOutBack";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyNightStaymarked")
                                {
                                    data = "AlreadyUseForNightStay";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMorningcontactpointmarked")
                                {
                                    data = "AlreadyUseForMorningContactPoint";
                                    return data;

                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyEveningcontactpointmarked")
                                {
                                    data = "AlreadyUseForEveningContactPoint";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMonthlyMarked")
                                {
                                    data = "AlreadyUseForMonthlyMeeting";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyWeeklyMarked")
                                {
                                    data = "AlreadyUseForWeeklyMeeting";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySPMMarked")
                                {
                                    data = "Successfully<" + dschkatt.Tables[0].Rows[0][1].ToString() + '~' + dschkatt.Tables[0].Rows[0][2].ToString() + '~' + dschkatt.Tables[0].Rows[0][3].ToString() + '~' + dschkatt.Tables[0].Rows[0][4].ToString() + '~' + dschkatt.Tables[0].Rows[0][5].ToString() + '~' + dschkatt.Tables[0].Rows[0][6].ToString() + '~' + dschkatt.Tables[0].Rows[0][7].ToString() + '~' + dschkatt.Tables[0].Rows[0][8].ToString();
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyEveningleavemMarked")
                                {
                                    data = "AlreadyUseForEveningleave";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMorningleavemMarked")
                                {
                                    data = "AlreadyUseForMorningleave";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyCasualleavemMarked")
                                {
                                    data = "AlreadyUseForCasualleave";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySickleavemMarked") 
                                {
                                    data = "AlreadyUseForSickleave";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyEarnedleavemMarked") 
                                {
                                    data = "AlreadyUseForEarnedleave";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySPMStarted")
                                {
                                    data = "AlreadySPMStarted";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadycallexecuted")
                                {
                                    data = "AlreadyCallExecuted";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "DateNotMatch")
                                {
                                    data = "DateNotMatch";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "ContactPointMarked")
                                {
                                    data = "Successfully";
                                }
                                else
                                {
                                    data = "Successfully" + "," + dschkatt.Tables[0].Rows[0][1].ToString();



                                    NameValueCollection nv = new NameValueCollection();
                                    nv.Clear();
                                    nv.Add("@SPO-int", Employeeid);
                                    nv.Add("@MessageTitle-varchar(500)", "Leave Request");

                                    var dss = _dl.GetData("InsertNotification", nv);


                                }

                            }
                        }


                    }

                    else
                    {
                        data = "Not Active";

                    }

                }
                else
                {
                    data = "Error";
                }

                #endregion
            }
            //IF SPM MARK
            else if (ID == "11")
            {
                #region Attendance Check


                _nv = new NameValueCollection();
                _nv.Clear();
                _nv.Add("@ID-bigint", ID);
                _nv.Add("@Employeeid-bigint", Employeeid);
                DataSet ds = _dl.GetData("sp_CheckForLocationNeedAndEmployeeLocation", _nv);

                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    if (ds.Tables[0].Rows[0][0].ToString() == "True")
                    {
                        GetCallDitanceForMobile = new GeoCoordinate(Convert.ToDouble(ds.Tables[0].Rows[0][1].ToString()),
                            Convert.ToDouble(ds.Tables[0].Rows[0][2].ToString()))
                                                .GetDistanceTo(new GeoCoordinate(Convert.ToDouble(lat),
                                                    Convert.ToDouble(lng)));
                        GetCallDitanceForMobile = GetCallDitanceForMobile / 1000;
                        Previouslat = ds.Tables[0].Rows[0][1].ToString();
                        Previouslng = ds.Tables[0].Rows[0][2].ToString();
                        _nv = new NameValueCollection();
                        _nv.Clear();
                        _nv.Add("@AttTypeID-bigint", ID);
                        _nv.Add("@FK_ExpenseActivityID-bigint", ExpenseTypeID);
                        _nv.Add("@EmployeeId-varchar(255)", Employeeid.ToString());
                        _nv.Add("@Description-varchar(255)", description);
                        _nv.Add("@StartDateTime-datetime", result.ToString());
                        _nv.Add("@EndDateTime-datetime", EndDateTime);
                        _nv.Add("@CurrentLatitude-varchar(100)", lat);
                        _nv.Add("@CurrentLongitude-varchar(100)", lng);
                        _nv.Add("@PreviousBaseCityLatitude-varchar(100)", Previouslat);
                        _nv.Add("@PreviousBaseCityLongitude-varchar(100)", Previouslng);
                        _nv.Add("@distance-varchar(100)", GetCallDitanceForMobile.ToString());
                        _nv.Add("@Flag-varchar(100)", Flag);
                        _nv.Add("@Visitshift-varchar(100)", Visitshift);
                        DataSet dschkatt = _dl.GetData("Sp_IndividualActivityExecution", _nv);
                        if (dschkatt != null)
                        {
                            if (dschkatt.Tables[0].Rows.Count > 0)
                            {
                                if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyleavemMarked")
                                {
                                    data = "AlreadyLeaveMarked";
                                    return data;
                                }
                                if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadysposalesmeetingmarked")
                                {
                                    data = "AlreadysalesMeetingMarked";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyuseforspotraining")
                                {
                                    data = "AlreadyUseForSpoTraining";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyOutBackmarked")
                                {
                                    data = "AlreadyUseForOutBack";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyNightStaymarked")
                                {
                                    data = "AlreadyUseForNightStay";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMorningcontactpointmarked")
                                {
                                    data = "AlreadyUseForMorningContactPoint";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMonthlyMarked")
                                {
                                    data = "AlreadyUseForMonthlyMeeting";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyWeeklyMarked")
                                {
                                    data = "AlreadyUseForWeeklyMeeting";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySPMMarked")
                                {
                                    data = "Successfully<" + dschkatt.Tables[0].Rows[0][1].ToString() + '~' + dschkatt.Tables[0].Rows[0][2].ToString() + '~' + dschkatt.Tables[0].Rows[0][3].ToString() + '~' + dschkatt.Tables[0].Rows[0][4].ToString() + '~' + dschkatt.Tables[0].Rows[0][5].ToString() + '~' + dschkatt.Tables[0].Rows[0][6].ToString() + '~' + dschkatt.Tables[0].Rows[0][7].ToString() + '~' + dschkatt.Tables[0].Rows[0][8].ToString();
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "ExpenseActivityShouldBeSelected")
                                {
                                    data = "ExpenseActivityShouldBeSelected";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySPMStarted")
                                {
                                    data = "AlreadySPMStarted";
                                    return data;
                                }
                                else
                                {
                                    data = "Successfully" + "," + dschkatt.Tables[0].Rows[0][1].ToString();

                                }

                            }
                        }


                    }

                    else
                    {
                        data = "Not Active";

                    }

                }
                else
                {
                    data = "Error";
                }

                #endregion
            }
            else
            {
                data = "DateNotMatch";
            }


            //}
            return data;

        }

        [WebMethod]
        public string setAttendance_NewStructureZSM(string ID, string ExpenseTypeID, string Employeeid, string StartDateTime, string EndDateTime,
            string lat, string lng, string description, string Flag, string Visitshift, string IMEIAddress)
        {
            string data = "";
            double GetCallDitanceForMobile = 0;
            string Previouslat = "";
            string Previouslng = "";


            #region Unique Device ID and Session Restriction
            bool allowexecution = false;
            try
            {
                //string executionrestrictionflag = Constants.GetExecutionRestrictionFlag();
                //if (executionrestrictionflag.ToLower() == "false")
                //{
                //    allowexecution = true;
                //}
                //else
                //{
                var dsData = _dl.GetData("sp_CheckEmployeeDeviceAndSessionStatus_IMEI", new NameValueCollection { 
                            { "@EmployeeId-BIGINT", Employeeid } ,
                               { "@IMEIAddress-VARCHAR", IMEIAddress } ,
                            { "@MacAddress-VARCHAR", "-" } ,
                            { "@Type-VARCHAR", "SetAttendance" }
                        });
                if (dsData != null)
                {
                    if (dsData.Tables[0].Rows.Count > 0)
                    {
                        if (dsData.Tables[0].Rows[0][0].ToString() == "OK")
                        {
                            allowexecution = true;
                        }
                        else
                        {
                            data = dsData.Tables[0].Rows[0][0].ToString();
                        }
                    }
                }
                //}
            }
            catch (Exception ex)
            {
                throw ex;
            }

            if (!allowexecution)
            {

                return data = (data == "") ? "ServerError" : data;

            }



            #endregion

            DateTime result;
            if (!DateTime.TryParse(StartDateTime, out result))
            {
                return "Start DateTime Format Is invalid";
            }

            if (Convert.ToDateTime(StartDateTime).ToShortDateString().ToString() == DateTime.Now.ToShortDateString().ToString() || Convert.ToDateTime(StartDateTime).ToShortDateString().ToString() != DateTime.Now.ToShortDateString().ToString())
            {
                #region Attendance Check


                _nv = new NameValueCollection();
                _nv.Clear();
                _nv.Add("@ID-bigint", ID);
                _nv.Add("@Employeeid-bigint", Employeeid);
                DataSet ds = _dl.GetData("sp_CheckForLocationNeedAndEmployeeLocation", _nv);

                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    if (ds.Tables[0].Rows[0][0].ToString() == "True")
                    {
                        GetCallDitanceForMobile = new GeoCoordinate(Convert.ToDouble(ds.Tables[0].Rows[0][1].ToString()),
                            Convert.ToDouble(ds.Tables[0].Rows[0][2].ToString()))
                                                .GetDistanceTo(new GeoCoordinate(Convert.ToDouble(lat),
                                                    Convert.ToDouble(lng)));
                        GetCallDitanceForMobile = GetCallDitanceForMobile / 1000;
                        Previouslat = ds.Tables[0].Rows[0][1].ToString();
                        Previouslng = ds.Tables[0].Rows[0][2].ToString();
                        _nv = new NameValueCollection();
                        _nv.Clear();
                        _nv.Add("@AttTypeID-bigint", ID);
                        _nv.Add("@FK_ExpenseActivityID-bigint", ExpenseTypeID);
                        _nv.Add("@EmployeeId-varchar(255)", Employeeid.ToString());
                        _nv.Add("@Description-varchar(255)", description);
                        _nv.Add("@StartDateTime-datetime", result.ToString());
                        _nv.Add("@EndDateTime-datetime", EndDateTime);
                        _nv.Add("@CurrentLatitude-varchar(100)", lat);
                        _nv.Add("@CurrentLongitude-varchar(100)", lng);
                        _nv.Add("@PreviousBaseCityLatitude-varchar(100)", Previouslat);
                        _nv.Add("@PreviousBaseCityLongitude-varchar(100)", Previouslng);
                        _nv.Add("@distance-varchar(100)", GetCallDitanceForMobile.ToString());
                        _nv.Add("@Flag-varchar(100)", Flag);
                        _nv.Add("@Visitshift-varchar(100)", Visitshift);
                        DataSet dschkatt = _dl.GetData("Sp_IndividualActivityExecutionZSM", _nv);
                        if (dschkatt != null)
                        {
                            if (dschkatt.Tables[0].Rows.Count > 0)
                            {
                                if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyleavemMarked")
                                {
                                    data = "AlreadyLeaveMarked";
                                    return data;
                                }
                                if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadysposalesmeetingmarked")
                                {
                                    data = "AlreadysalesMeetingMarked";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyuseforspotraining")
                                {
                                    data = "AlreadyUseForSpoTraining";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyOutBackmarked")
                                {
                                    data = "AlreadyUseForOutBack";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyNightStaymarked")
                                {
                                    data = "AlreadyUseForNightStay";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMorningcontactpointmarked")
                                {
                                    data = "AlreadyUseForMorningContactPoint";
                                    return data;

                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyEveningcontactpointmarked")
                                {
                                    data = "AlreadyUseForEveningContactPoint";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMonthlyMarked")
                                {
                                    data = "AlreadyUseForMonthlyMeeting";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyWeeklyMarked")
                                {
                                    data = "AlreadyUseForWeeklyMeeting";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySPMMarked")
                                {
                                    data = "Successfully<" + dschkatt.Tables[0].Rows[0][1].ToString() + '~' + dschkatt.Tables[0].Rows[0][2].ToString() + '~' + dschkatt.Tables[0].Rows[0][3].ToString() + '~' + dschkatt.Tables[0].Rows[0][4].ToString() + '~' + dschkatt.Tables[0].Rows[0][5].ToString() + '~' + dschkatt.Tables[0].Rows[0][6].ToString() + '~' + dschkatt.Tables[0].Rows[0][7].ToString() + '~' + dschkatt.Tables[0].Rows[0][8].ToString();
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyEveningleavemMarked")
                                {
                                    data = "AlreadyUseForEveningleave";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMorningleavemMarked")
                                {
                                    data = "AlreadyUseForMorningleave";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyCasualleavemMarked") 
                                {
                                    data = "AlreadyUseForCasualleave";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySickleavemMarked") 
                                {
                                    data = "AlreadyUseForSickleave";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyEarnedleavemMarked") 
                                {
                                    data = "AlreadyUseForEarnedleave";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySPMStarted")
                                {
                                    data = "AlreadySPMStarted";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadycallexecuted")
                                {
                                    data = "AlreadyCallExecuted";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "DateNotMatch")
                                {
                                    data = "DateNotMatch";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "ContactPointMarked")
                                {
                                    data = "Successfully";
                                }
                                else
                                {
                                    data = "Successfully" + "," + dschkatt.Tables[0].Rows[0][1].ToString();

                                }

                            }
                        }


                    }

                    else
                    {
                        data = "Not Active";

                    }

                }
                else
                {
                    data = "Error";
                }

                #endregion
            }
            //IF SPM MARK
            //else 
            else if (ID == "11")
            {
                #region Attendance Check


                _nv = new NameValueCollection();
                _nv.Clear();
                _nv.Add("@ID-bigint", ID);
                _nv.Add("@Employeeid-bigint", Employeeid);
                DataSet ds = _dl.GetData("sp_CheckForLocationNeedAndEmployeeLocation", _nv);

                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    if (ds.Tables[0].Rows[0][0].ToString() == "True")
                    {
                        GetCallDitanceForMobile = new GeoCoordinate(Convert.ToDouble(ds.Tables[0].Rows[0][1].ToString()),
                            Convert.ToDouble(ds.Tables[0].Rows[0][2].ToString()))
                                                .GetDistanceTo(new GeoCoordinate(Convert.ToDouble(lat),
                                                    Convert.ToDouble(lng)));
                        GetCallDitanceForMobile = GetCallDitanceForMobile / 1000;
                        Previouslat = ds.Tables[0].Rows[0][1].ToString();
                        Previouslng = ds.Tables[0].Rows[0][2].ToString();
                        _nv = new NameValueCollection();
                        _nv.Clear();
                        _nv.Add("@AttTypeID-bigint", ID);
                        _nv.Add("@FK_ExpenseActivityID-bigint", ExpenseTypeID);
                        _nv.Add("@EmployeeId-varchar(255)", Employeeid.ToString());
                        _nv.Add("@Description-varchar(255)", description);
                        _nv.Add("@StartDateTime-datetime", result.ToString());
                        _nv.Add("@EndDateTime-datetime", EndDateTime);
                        _nv.Add("@CurrentLatitude-varchar(100)", lat);
                        _nv.Add("@CurrentLongitude-varchar(100)", lng);
                        _nv.Add("@PreviousBaseCityLatitude-varchar(100)", Previouslat);
                        _nv.Add("@PreviousBaseCityLongitude-varchar(100)", Previouslng);
                        _nv.Add("@distance-varchar(100)", GetCallDitanceForMobile.ToString());
                        _nv.Add("@Flag-varchar(100)", Flag);
                        _nv.Add("@Visitshift-varchar(100)", Visitshift);
                        DataSet dschkatt = _dl.GetData("Sp_IndividualActivityExecutionZSM", _nv);
                        if (dschkatt != null)
                        {
                            if (dschkatt.Tables[0].Rows.Count > 0)
                            {
                                if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyleavemMarked")
                                {
                                    data = "AlreadyLeaveMarked";
                                    return data;
                                }
                                if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadysposalesmeetingmarked")
                                {
                                    data = "AlreadysalesMeetingMarked";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyuseforspotraining")
                                {
                                    data = "AlreadyUseForSpoTraining";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyOutBackmarked")
                                {
                                    data = "AlreadyUseForOutBack";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyNightStaymarked")
                                {
                                    data = "AlreadyUseForNightStay";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMorningcontactpointmarked")
                                {
                                    data = "AlreadyUseForMorningContactPoint";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMonthlyMarked")
                                {
                                    data = "AlreadyUseForMonthlyMeeting";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyWeeklyMarked")
                                {
                                    data = "AlreadyUseForWeeklyMeeting";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySPMMarked")
                                {
                                    data = "Successfully<" + dschkatt.Tables[0].Rows[0][1].ToString() + '~' + dschkatt.Tables[0].Rows[0][2].ToString() + '~' + dschkatt.Tables[0].Rows[0][3].ToString() + '~' + dschkatt.Tables[0].Rows[0][4].ToString() + '~' + dschkatt.Tables[0].Rows[0][5].ToString() + '~' + dschkatt.Tables[0].Rows[0][6].ToString() + '~' + dschkatt.Tables[0].Rows[0][7].ToString() + '~' + dschkatt.Tables[0].Rows[0][8].ToString();
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "ExpenseActivityShouldBeSelected")
                                {
                                    data = "ExpenseActivityShouldBeSelected";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySPMStarted")
                                {
                                    data = "AlreadySPMStarted";
                                    return data;
                                }
                                else
                                {
                                    data = "Successfully" + "," + dschkatt.Tables[0].Rows[0][1].ToString();

                                }

                            }
                        }


                    }

                    else
                    {
                        data = "Not Active";

                    }

                }
                else
                {
                    data = "Error";
                }

                #endregion
            }
            else
            {
                data = "DateNotMatch";
            }


            //}
            return data;

        }


        [WebMethod]
        public string setAttendance_NewStructureRSM(string ID, string ExpenseTypeID, string Employeeid, string StartDateTime, string EndDateTime,
            string lat, string lng, string description, string Flag, string Visitshift, string IMEIAddress)
        {
            string data = "";
            double GetCallDitanceForMobile = 0;
            string Previouslat = "";
            string Previouslng = "";


            #region Unique Device ID and Session Restriction
            bool allowexecution = false;
            try
            {
                //string executionrestrictionflag = Constants.GetExecutionRestrictionFlag();
                //if (executionrestrictionflag.ToLower() == "false")
                //{
                //    allowexecution = true;
                //}
                //else
                //{
                var dsData = _dl.GetData("sp_CheckEmployeeDeviceAndSessionStatus_IMEI", new NameValueCollection { 
                            { "@EmployeeId-BIGINT", Employeeid } ,
                               { "@IMEIAddress-VARCHAR", IMEIAddress } ,
                            { "@MacAddress-VARCHAR", "-" } ,
                            { "@Type-VARCHAR", "SetAttendance" }
                        });
                if (dsData != null)
                {
                    if (dsData.Tables[0].Rows.Count > 0)
                    {
                        if (dsData.Tables[0].Rows[0][0].ToString() == "OK")
                        {
                            allowexecution = true;
                        }
                        else
                        {
                            data = dsData.Tables[0].Rows[0][0].ToString();
                        }
                    }
                }
                //}
            }
            catch (Exception ex)
            {
                throw ex;
            }

            if (!allowexecution)
            {

                return data = (data == "") ? "ServerError" : data;

            }



            #endregion

            DateTime result;
            if (!DateTime.TryParse(StartDateTime, out result))
            {
                return "Start DateTime Format Is invalid";
            }

            if (Convert.ToDateTime(StartDateTime).ToShortDateString().ToString() == DateTime.Now.ToShortDateString().ToString() || Convert.ToDateTime(StartDateTime).ToShortDateString().ToString() != DateTime.Now.ToShortDateString().ToString())
            {
                #region Attendance Check


                _nv = new NameValueCollection();
                _nv.Clear();
                _nv.Add("@ID-bigint", ID);
                _nv.Add("@Employeeid-bigint", Employeeid);
                DataSet ds = _dl.GetData("sp_CheckForLocationNeedAndEmployeeLocation", _nv);

                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    if (ds.Tables[0].Rows[0][0].ToString() == "True")
                    {
                        GetCallDitanceForMobile = new GeoCoordinate(Convert.ToDouble(ds.Tables[0].Rows[0][1].ToString()),
                            Convert.ToDouble(ds.Tables[0].Rows[0][2].ToString()))
                                                .GetDistanceTo(new GeoCoordinate(Convert.ToDouble(lat),
                                                    Convert.ToDouble(lng)));
                        GetCallDitanceForMobile = GetCallDitanceForMobile / 1000;
                        Previouslat = ds.Tables[0].Rows[0][1].ToString();
                        Previouslng = ds.Tables[0].Rows[0][2].ToString();
                        _nv = new NameValueCollection();
                        _nv.Clear();
                        _nv.Add("@AttTypeID-bigint", ID);
                        _nv.Add("@FK_ExpenseActivityID-bigint", ExpenseTypeID);
                        _nv.Add("@EmployeeId-varchar(255)", Employeeid.ToString());
                        _nv.Add("@Description-varchar(255)", description);
                        _nv.Add("@StartDateTime-datetime", result.ToString());
                        _nv.Add("@EndDateTime-datetime", EndDateTime);
                        _nv.Add("@CurrentLatitude-varchar(100)", lat);
                        _nv.Add("@CurrentLongitude-varchar(100)", lng);
                        _nv.Add("@PreviousBaseCityLatitude-varchar(100)", Previouslat);
                        _nv.Add("@PreviousBaseCityLongitude-varchar(100)", Previouslng);
                        _nv.Add("@distance-varchar(100)", GetCallDitanceForMobile.ToString());
                        _nv.Add("@Flag-varchar(100)", Flag);
                        _nv.Add("@Visitshift-varchar(100)", Visitshift);
                        DataSet dschkatt = _dl.GetData("Sp_IndividualActivityExecutionRSM", _nv);
                        if (dschkatt != null)
                        {
                            if (dschkatt.Tables[0].Rows.Count > 0)
                            {
                                if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyleavemMarked")
                                {
                                    data = "AlreadyLeaveMarked";
                                    return data;
                                }
                                if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadysposalesmeetingmarked")
                                {
                                    data = "AlreadysalesMeetingMarked";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyuseforspotraining")
                                {
                                    data = "AlreadyUseForSpoTraining";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyOutBackmarked")
                                {
                                    data = "AlreadyUseForOutBack";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyNightStaymarked")
                                {
                                    data = "AlreadyUseForNightStay";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMorningcontactpointmarked")
                                {
                                    data = "AlreadyUseForMorningContactPoint";
                                    return data;

                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyEveningcontactpointmarked")
                                {
                                    data = "AlreadyUseForEveningContactPoint";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMonthlyMarked")
                                {
                                    data = "AlreadyUseForMonthlyMeeting";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyWeeklyMarked")
                                {
                                    data = "AlreadyUseForWeeklyMeeting";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySPMMarked")
                                {
                                    data = "Successfully<" + dschkatt.Tables[0].Rows[0][1].ToString() + '~' + dschkatt.Tables[0].Rows[0][2].ToString() + '~' + dschkatt.Tables[0].Rows[0][3].ToString() + '~' + dschkatt.Tables[0].Rows[0][4].ToString() + '~' + dschkatt.Tables[0].Rows[0][5].ToString() + '~' + dschkatt.Tables[0].Rows[0][6].ToString() + '~' + dschkatt.Tables[0].Rows[0][7].ToString() + '~' + dschkatt.Tables[0].Rows[0][8].ToString();
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyEveningleavemMarked")
                                {
                                    data = "AlreadyUseForEveningleave";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMorningleavemMarked")
                                {
                                    data = "AlreadyUseForMorningleave";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyCasualleavemMarked") 
                                {
                                    data = "AlreadyUseForCasualleave";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySickleavemMarked") 
                                {
                                    data = "AlreadyUseForSickleave";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyEarnedleavemMarked")
                                {
                                    data = "AlreadyUseForEarnedleave";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySPMStarted")
                                {
                                    data = "AlreadySPMStarted";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadycallexecuted")
                                {
                                    data = "AlreadyCallExecuted";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "DateNotMatch")
                                {
                                    data = "DateNotMatch";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "ContactPointMarked")
                                {
                                    data = "Successfully";
                                }
                                else
                                {
                                    data = "Successfully" + "," + dschkatt.Tables[0].Rows[0][1].ToString();

                                }

                            }
                        }


                    }

                    else
                    {
                        data = "Not Active";

                    }

                }
                else
                {
                    data = "Error";
                }

                #endregion
            }
            //IF SPM MARK
            //else 
             else if (ID == "11")
            {
                #region Attendance Check


                _nv = new NameValueCollection();
                _nv.Clear();
                _nv.Add("@ID-bigint", ID);
                _nv.Add("@Employeeid-bigint", Employeeid);
                DataSet ds = _dl.GetData("sp_CheckForLocationNeedAndEmployeeLocation", _nv);

                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    if (ds.Tables[0].Rows[0][0].ToString() == "True")
                    {
                        GetCallDitanceForMobile = new GeoCoordinate(Convert.ToDouble(ds.Tables[0].Rows[0][1].ToString()),
                            Convert.ToDouble(ds.Tables[0].Rows[0][2].ToString()))
                                                .GetDistanceTo(new GeoCoordinate(Convert.ToDouble(lat),
                                                    Convert.ToDouble(lng)));
                        GetCallDitanceForMobile = GetCallDitanceForMobile / 1000;
                        Previouslat = ds.Tables[0].Rows[0][1].ToString();
                        Previouslng = ds.Tables[0].Rows[0][2].ToString();
                        _nv = new NameValueCollection();
                        _nv.Clear();
                        _nv.Add("@AttTypeID-bigint", ID);
                        _nv.Add("@FK_ExpenseActivityID-bigint", ExpenseTypeID);
                        _nv.Add("@EmployeeId-varchar(255)", Employeeid.ToString());
                        _nv.Add("@Description-varchar(255)", description);
                        _nv.Add("@StartDateTime-datetime", result.ToString());
                        _nv.Add("@EndDateTime-datetime", EndDateTime);
                        _nv.Add("@CurrentLatitude-varchar(100)", lat);
                        _nv.Add("@CurrentLongitude-varchar(100)", lng);
                        _nv.Add("@PreviousBaseCityLatitude-varchar(100)", Previouslat);
                        _nv.Add("@PreviousBaseCityLongitude-varchar(100)", Previouslng);
                        _nv.Add("@distance-varchar(100)", GetCallDitanceForMobile.ToString());
                        _nv.Add("@Flag-varchar(100)", Flag);
                        _nv.Add("@Visitshift-varchar(100)", Visitshift);
                        DataSet dschkatt = _dl.GetData("Sp_IndividualActivityExecutionRSM", _nv);
                        if (dschkatt != null)
                        {
                            if (dschkatt.Tables[0].Rows.Count > 0)
                            {
                                if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyleavemMarked")
                                {
                                    data = "AlreadyLeaveMarked";
                                    return data;
                                }
                                if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadysposalesmeetingmarked")
                                {
                                    data = "AlreadysalesMeetingMarked";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyuseforspotraining")
                                {
                                    data = "AlreadyUseForSpoTraining";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyOutBackmarked")
                                {
                                    data = "AlreadyUseForOutBack";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyNightStaymarked")
                                {
                                    data = "AlreadyUseForNightStay";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMorningcontactpointmarked")
                                {
                                    data = "AlreadyUseForMorningContactPoint";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyMonthlyMarked")
                                {
                                    data = "AlreadyUseForMonthlyMeeting";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadyWeeklyMarked")
                                {
                                    data = "AlreadyUseForWeeklyMeeting";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySPMMarked")
                                {
                                    data = "Successfully<" + dschkatt.Tables[0].Rows[0][1].ToString() + '~' + dschkatt.Tables[0].Rows[0][2].ToString() + '~' + dschkatt.Tables[0].Rows[0][3].ToString() + '~' + dschkatt.Tables[0].Rows[0][4].ToString() + '~' + dschkatt.Tables[0].Rows[0][5].ToString() + '~' + dschkatt.Tables[0].Rows[0][6].ToString() + '~' + dschkatt.Tables[0].Rows[0][7].ToString() + '~' + dschkatt.Tables[0].Rows[0][8].ToString();
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "ExpenseActivityShouldBeSelected")
                                {
                                    data = "ExpenseActivityShouldBeSelected";
                                    return data;
                                }
                                else if (dschkatt.Tables[0].Rows[0][0].ToString() == "alreadySPMStarted")
                                {
                                    data = "AlreadySPMStarted";
                                    return data;
                                }
                                else
                                {
                                    data = "Successfully" + "," + dschkatt.Tables[0].Rows[0][1].ToString();

                                }

                            }
                        }


                    }

                    else
                    {
                        data = "Not Active";

                    }

                }
                else
                {
                    data = "Error";
                }

                #endregion
            }
            else
            {
                data = "DateNotMatch";
            }


            //}
            return data;

        }


        [WebMethod]
        public string getExpenseActivity()
        {
            var returnResult = string.Empty;
            string outputString = "";
            try
            {
                _nv.Clear();
                var dsExpenseActivity = _dl.GetData("sp_GetExpenseActivity", _nv);


                if (dsExpenseActivity != null)
                {

                    string inputString = dsExpenseActivity.Tables[0].ToJsonString();
                    Regex re = new Regex("%");
                    outputString = re.Replace(inputString, " ");


                    returnResult = outputString;

                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;

        }
        //Shahrukh 7/17/2020 -- Data For Previous Day Expense Mark
        [WebMethod]
        public string getPredayCalls(string empid, string date)
        {
            var returnString = "[]";
            var dat = Convert.ToDateTime(date);
            try
            {
                var PreDayCall = _dl.GetData("sp_GetPreDayCalls",
                    new NameValueCollection { { "@EmployeeId-INT", empid }, 
                { "@Date-DATETIME", dat.ToString() }
               });
                if (PreDayCall == null) return returnString;
                returnString = PreDayCall.Tables[0].ToJsonString();

            }
            catch (Exception exception)
            {

            }
            return returnString;
        }
        /*
         Webservice method for Get data IsPlanExecuted of selectPresalesCallswithPlanId
         * 
        */
        [WebMethod]
        public string IsPlanExecuted(string planId, string doctorId, string employeeId, string date)
        {
            var returnString = "";
            try
            {
                var dsisPlanCheck = _dl.GetData("selectPresalesCallswithPlanId", new NameValueCollection { { "@PlanId-INT", planId }, { "@DoctorID-INT", doctorId }, { "@EmployeeID-INT", employeeId }, { "@Day-INT", Convert.ToString(Convert.ToDateTime(date).Day) }, { "@Month-INT", Convert.ToString(Convert.ToDateTime(date).Month) }, { "@Year-INT", Convert.ToString(Convert.ToDateTime(date).Year) } });
                if (dsisPlanCheck == null) return returnString;
                returnString = dsisPlanCheck.Tables[0].Rows.Count > 0 ? "ExecutedPlan" : "unExecutedPlan";
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return returnString;
        }

        /*
         * Webservice method for Get data GetSchedulerDayView of Call_GetSchedulerDayView
         * Stored Procedure Call_GetSchedulerDayView parameter Employee ID & Date Time
         */
        [WebMethod]
        public string GetSchedulerDayView(string employeeId, string dateTime)
        {
            var returnString = "";
            try
            {
                var dat = Convert.ToDateTime(dateTime);
                var dsDayViewReslt = _dl.GetData("Call_GetSchedulerDayView", new NameValueCollection { { "@EmployeeId-INT", employeeId }, { "@PlanDateTime-DATETIME", dat.ToString() } });
                if (dsDayViewReslt != null)
                {
                    returnString = dsDayViewReslt.Tables[0].ToJsonString();
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return returnString;
        }

        [WebMethod]
        public string GetSchedulerDayViewZSM(string employeeId, string dateTime)
        {
            var returnString = "";
            try
            {
                var dat = Convert.ToDateTime(dateTime);
                var dsDayViewReslt = _dl.GetData("Call_GetSchedulerDayViewDSM", new NameValueCollection { { "@EmployeeId-INT", employeeId }, { "@PlanDateTime-DATETIME", dat.ToString() } });
                if (dsDayViewReslt != null)
                {
                    returnString = dsDayViewReslt.Tables[0].ToJsonString();
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return returnString;
        }

        [WebMethod]
        public string GetSchedulerDayViewRSM(string employeeId, string dateTime)
        {
            var returnString = "";
            try
            {
                var dat = Convert.ToDateTime(dateTime);
                var dsDayViewReslt = _dl.GetData("Call_GetSchedulerDayViewSM", new NameValueCollection { { "@EmployeeId-INT", employeeId }, { "@PlanDateTime-DATETIME", dat.ToString() } });
                if (dsDayViewReslt != null)
                {
                    returnString = dsDayViewReslt.Tables[0].ToJsonString();
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return returnString;
        }


        /*
         * Webservice method for Get data GetPlanStatus 
         * Stored Procedure Call_GetMonthlystatusforEmployee parameter Employee ID & Date Time
         */
        [WebMethod]
        public string GetPlanStatus(string employeeId, string dateTime)
        {
            var returnString = "";
            try
            {
                var initial = Convert.ToDateTime(dateTime);
                var planMonthFrom = new DateTime(initial.Year, initial.Month, 1, 0, 0, 0);
                var planMonthTo = new DateTime(initial.Year, initial.Month, 1, 23, 59, 59);
                var dsDayViewReslt = _dl.GetData("Call_GetMonthlystatusforEmployee", new NameValueCollection { { "@EmployeeId-INT", employeeId }, { "@PlanMonthFrom-DATETIME", planMonthFrom.ToString() }, { "@PlanMonthTo-DATETIME", planMonthTo.ToString() } });
                if (dsDayViewReslt != null)
                {
                    returnString = dsDayViewReslt.Tables[0].ToJsonString();
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return returnString;
        }


        /*
       * Webservice method for Get data GetActivity() 
       * Stored Procedure Call_GetCallPlannerActivities no parameter
       */
        [WebMethod]
        public string GetActivity()
        {
            var returnResult = string.Empty;
            try
            {
                var dsActivity = _dl.GetData("Call_GetCallPlannerActivities", null);
                if (dsActivity != null)
                {
                    returnResult = dsActivity.Tables[0].ToJsonString();
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;
        }


        /*
     * Webservice method for Get data LoadunPlannedDoctors 
     * Stored Procedure Mioplaning_FilterD_docAcc parameter Employee ID
     */
        [WebMethod]
        public string LoadunPlannedDoctors(int pEmployeeId)
        {
            string brick = string.Empty;
            // ReSharper disable SpecifyACultureInStringConversionExplicitly
            try
            {
                var nv = new NameValueCollection { { "@EmployeeId-bigint", Convert.ToInt64(pEmployeeId).ToString() } };
                // ReSharper restore SpecifyACultureInStringConversionExplicitly
                //DataSet dsBrick = GetData("Mioplaning_FilterD", nv);
                DataSet dsBrick = _dl.GetData("Mioplaning_FilterD_docAcc", nv);
                brick = dsBrick.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {

                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return brick;
        }




        /*
         *  Get All Products by Team 
        * Webservice method for Get data GetAllProducts() 
        * Stored Procedure sp_getProductsByTeam parameter level3id
      */

        [WebMethod]
        public string GetAllProducts(string empid, string type)
        {

            var returnResult = string.Empty;
            try
            {

                var level6id = 0;
                _nv.Clear();
                _nv.Add("@empid-int", empid.ToString());
                var dsemp = _dl.GetData("sp_getEmployeeDetailById", _nv);
                if (dsemp != null)
                {
                    level6id = Convert.ToInt32(dsemp.Tables[0].Rows[0]["Level6LevelId"].ToString());
                }
                _nv.Clear();
                _nv.Add("@level6id-int", level6id.ToString());
                var dsprod = _dl.GetData((type == "CSR") ? "sp_getProductsByTeamForCsr" : "sp_getProductsByTeam", _nv);
                if (dsprod != null)
                {
                    returnResult = dsprod.Tables[0].ToJsonString();

                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;




        }



        /*
         *  Get All CSR Items by Team 
        * Webservice method for Get data GetAllCSRItems() 
        * Stored Procedure sp_getCSRItemsByTeam parameter level3id
      */

        [WebMethod]
        public string GetAllCSRItems(string empid)
        {

            var returnResult = string.Empty;
            try
            {

                var level3id = 0;
                _nv.Clear();
                _nv.Add("@empid-int", empid.ToString());
                var dsemp = _dl.GetData("sp_getEmployeeDetailById", _nv);
                if (dsemp != null)
                {
                    level3id = Convert.ToInt32(dsemp.Tables[0].Rows[0]["Level3LevelId"].ToString());
                }
                _nv.Clear();
                _nv.Add("@level3id-int", level3id.ToString());
                var dsdata = _dl.GetData("sp_getCSRItemsByTeam", _nv);
                if (dsdata != null)
                {
                    returnResult = dsdata.Tables[0].ToJsonString();

                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;




        }


        /*
         *  Get All InstructForExecution by Team 
        * Webservice method for Get data GetAllInstructForExecution() 
        * Stored Procedure sp_getinstructforexecution
      */

        [WebMethod]
        public string GetAllInstructForExecution()
        {

            var returnResult = string.Empty;
            try
            {
                _nv.Clear();
                var dsdata = _dl.GetData("sp_getinstructforexecution", _nv);
                if (dsdata != null)
                {
                    returnResult = dsdata.Tables[0].ToJsonString();
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;




        }


        /*
         *  Get All GetAllSalesBrickAndPharmacies by Team 
        * Webservice method for Get data GetAllSalesBrickAndPharmacies() 
        * Stored Procedure sp_getProductsByTeam parameter Employee ID
      */

        [WebMethod]
        public string GetAllSalesBrickAndPharmacies(string empid)
        {

            var returnResult = string.Empty;
            try
            {
                _nv.Clear();
                _nv.Add("@employeeid-int", empid.ToString());
                var dsdata = _dl.GetData("sp_getSalesBrickAndPharmacies", _nv);
                if (dsdata != null)
                {
                    returnResult = dsdata.Tables[0].ToJsonString();
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;




        }




        /*
       *  Get All Samples by Team 
      * Webservice method for Get data GetAllSamples() 
      * Stored Procedure sp_getProductsSampleByTeam parameter Employee ID
    */
        [WebMethod]
        public string GetAllSamples(string empid)
        {

            var returnResult = string.Empty;
            try
            {

                var level3id = 0;
                _nv.Clear();
                _nv.Add("@empid-int", empid.ToString());
                var dsemp = _dl.GetData("sp_getEmployeeDetailById", _nv);
                if (dsemp != null)
                {
                    level3id = Convert.ToInt32(dsemp.Tables[0].Rows[0]["Level3LevelId"].ToString());
                }
                _nv.Clear();
                _nv.Add("@level3id-int", level3id.ToString());
                var dssamp = _dl.GetData("sp_getProductsSampleByTeam", _nv);
                if (dssamp != null)
                {
                    returnResult = dssamp.Tables[0].ToJsonString();

                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;




        }


        /*
     * Webservice method for Get data GetAllProductByEmployeeAndDoctorID() 
     * Stored Procedure sp_productWithDocID parameter Employee ID
     */
        [WebMethod]
        public string GetAllProductByEmployeeAndDoctorID(string empid)
        {
            var returnResult = string.Empty;
            try
            {
                _nv.Clear();
                _nv.Add("@EmpID-int", empid.ToString());
                var dsprod = _dl.GetData("sp_productWithDocID", _nv);
                if (dsprod != null)
                {
                    returnResult = dsprod.Tables[0].ToJsonString();
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;
        }

        //E detailing pdf details
        [WebMethod]
        public string GetAllPdfDetailsByEmployeeID(string date, string empid)
        {
            var returnResult = string.Empty;
            //try
            //{
            //    DateTime dat = DateTime.Parse(date, System.Globalization.CultureInfo.InvariantCulture);
            //    _nv.Clear();
            //    _nv.Add("@EmpID-int", empid.ToString());
            //    _nv.Add("@Datetime-datetime", dat.ToString());
            //    var dsprod = _dl.GetData("sp_getPDFDetailsByEmpId", _nv);
            //    if (dsprod != null)
            //    {
            //        returnResult = dsprod.Tables[0].ToJsonString();
            //    }
            //}
            //catch (Exception ex)
            //{
            //    returnResult = ex.Message;
            //}

            return returnResult;
        }



        //E detailing Video details
        [WebMethod]
        public string GetAllVideoDetails(string date)
        {
            var returnResult = string.Empty;
            //try
            //{
            //    DateTime dat = DateTime.Parse(date, System.Globalization.CultureInfo.InvariantCulture);
            //    _nv.Clear();
            //    // _nv.Add("@EmpID-int", empid.ToString());
            //    _nv.Add("@Datetime-datetime", dat.ToString());
            //    var dsVideo = _dl.GetData("sp_getvideoDetails", _nv);
            //    if (dsVideo != null)
            //    {
            //        returnResult = dsVideo.Tables[0].ToJsonString();
            //    }
            //}
            //catch (Exception ex)
            //{
            //    returnResult = ex.Message;
            //}

            return returnResult;
        }

        [WebMethod]
        public string GetDCRReports(string empid, string dt1, string dt2, string lastRecordID, string recordsCount)
        {
            string DCRReports = "";
            try
            {
                _nv.Clear();
                _nv.Add("@EmployeeId-int", empid.ToString());
                _nv.Add("@StartDate-date", dt1.ToString());
                _nv.Add("@EndDate-date", dt2.ToString());
                _nv.Add("@lastRecordID-INT", lastRecordID.ToString());
                _nv.Add("@recordsCount-INT", recordsCount.ToString());
                DataSet dcrData = _dl.GetData("sp_GetDashboardDCR", _nv);
                DCRReports = dcrData.Tables[0].ToJsonString();

            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return DCRReports;
        }

        [WebMethod]
        public string GetCPReports(string pEmployeeId, string datetime, string datetime2)
        {
            string DCRReports = "";
            try
            {
                _nv.Clear();
                _nv.Add("@EmployeeId-int", pEmployeeId.ToString());
                _nv.Add("@Datetime-datetime", datetime.ToString());
                _nv.Add("@Datetime2-datetime", datetime2.ToString());
                DataSet dcrData = _dl.GetData("sp_GetDashboardCP", _nv);
                DCRReports = dcrData.Tables[0].ToJsonString();

            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return DCRReports;
        }

        [WebMethod]
        public string GetChartCounts(string pEmployeeId, string datetime)
        {
            string DCRReports = "";
            try
            {
                _nv.Clear();
                _nv.Add("@EmployeeId-int", pEmployeeId.ToString());
                _nv.Add("@Datetime-datetime", datetime.ToString());
                DataSet dcrData = _dl.GetData("sp_GetDashboardCharts", _nv);
                DCRReports = dcrData.Tables[0].ToJsonString();

            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return DCRReports;
        }


        [WebMethod]
        public string GetChartCountsFORYEAR(string pEmployeeId, string mode)
        {
            string DCRReports = "";

            DateTime date = DateTime.Now;

            List<Dictionary<string, object>> dataList = new List<Dictionary<string, object>>();

            for (int i = 0; i < 12; i++)
            {

                try
                {
                    _nv.Clear();
                    _nv.Add("@EmployeeId-int", pEmployeeId.ToString());
                    _nv.Add("@Datetime-datetime", date.ToString());
                    _nv.Add("@mode-varchar(max)", mode.ToString());
                    DataSet dcrData = _dl.GetData("sp_GetDashboardChartsFORYEAR", _nv);
                    if (dcrData.Tables[0].Rows.Count > 0)
                    {
                        // Convert DataTable to a dictionary and add it to the list
                        foreach (DataRow row in dcrData.Tables[0].Rows)
                        {
                            Dictionary<string, object> dataItem = new Dictionary<string, object>();
                            foreach (DataColumn col in dcrData.Tables[0].Columns)
                            {
                                dataItem.Add(col.ColumnName, row[col].ToString());
                            }
                            dataList.Add(dataItem);
                        }
                    }

                    date = date.AddMonths(-1);




                }
                catch (Exception ex)
                {
                    ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
                }

            }


            JavaScriptSerializer serializer = new JavaScriptSerializer();

            DCRReports = serializer.Serialize(dataList);
            return DCRReports;
        }



        /*
    * Webservice method for Get data GetAllProductByEmployeeAndDoctorID() 
    * Stored Procedure sp_productWithDocID parameter Employee ID
    */
        [WebMethod]
        public string GetAllProductSkuByEmployeeAndDoctorID(string empid)
        {
            string returnstring = "";
            try
            {
                _nv.Clear();
                _nv.Add("@EmpID-int", empid.ToString());
                var dssku = _dl.GetData("sp_productskuWithDocID", _nv);
                if (dssku != null)
                {
                    returnstring = dssku.Tables[0].ToJsonString();
                }

            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return returnstring;
        }


        /*
         * Webservice method for Get data GetAllDoctors() 
         * Stored Procedure Call_GetDoctorsByEmployeeWithDate_withDocAddress parameter Employee ID & Datetime
         */
        [WebMethod]
        public string GetAllDoctors(string pEmployeeId, string datetime, string type)
        {
            string Doctors = "";
            try
            {
                _nv.Clear();
                _nv.Add("@EmployeeId-int", pEmployeeId.ToString());
                _nv.Add("@Datetime-datetime", datetime.ToString());
                DataSet dsDoctors = _dl.GetData((type == "CSR") ? "Call_GetDoctorsByEmployeeWithDate_withDocAddressForCsr" : "Call_GetDoctorsByEmployeeWithDate_withDocAddress", _nv);
                Doctors = dsDoctors.Tables[0].ToJsonString();

                //var employeeDetail = (from emp in _dbcontext.Employees
                //                      where emp.MobileNumber == mobile
                //                      select emp.EmployeeId);
                //var employeeid = employeeDetail.FirstOrDefault();

                //var mrdocs = (from docsofspo in _dbcontext.DoctorsOfSpoes
                //              join docts in _dbcontext.Doctors on docsofspo.DoctorId equals docts.DoctorId
                //              where docsofspo.EmployeeId == employeeid
                //              select docsofspo.DoctorCode + "~" + docts.FirstName + "~" + docts.Address1).ToList();
                //DataTable dt = mrdocs.ToDataTable();
                //return dt.ToJsonString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return Doctors;
        }

        [WebMethod]
        public string GetAllDoctorsZSM(string pEmployeeId, string datetime)
        {
            string Doctors = "";
            try
            {
                _nv.Clear();
                _nv.Add("@EmployeeId-int", pEmployeeId.ToString());
                _nv.Add("@Datetime-datetime", datetime.ToString());
                DataSet dsDoctors = _dl.GetData("Call_GetDoctorsByEmployeeWithDate_withDocAddressZSM", _nv);
                Doctors = dsDoctors.Tables[0].ToJsonString();

                //var employeeDetail = (from emp in _dbcontext.Employees
                //                      where emp.MobileNumber == mobile
                //                      select emp.EmployeeId);
                //var employeeid = employeeDetail.FirstOrDefault();

                //var mrdocs = (from docsofspo in _dbcontext.DoctorsOfSpoes
                //              join docts in _dbcontext.Doctors on docsofspo.DoctorId equals docts.DoctorId
                //              where docsofspo.EmployeeId == employeeid
                //              select docsofspo.DoctorCode + "~" + docts.FirstName + "~" + docts.Address1).ToList();
                //DataTable dt = mrdocs.ToDataTable();
                //return dt.ToJsonString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return Doctors;
        }

        [WebMethod]
        public string GetAllDoctorsRSM(string pEmployeeId, string datetime)
        {
            string Doctors = "";
            try
            {
                _nv.Clear();
                _nv.Add("@EmployeeId-int", pEmployeeId.ToString());
                _nv.Add("@Datetime-datetime", datetime.ToString());
                DataSet dsDoctors = _dl.GetData("Call_GetDoctorsByEmployeeWithDate_withDocAddressRSM", _nv);
                Doctors = dsDoctors.Tables[0].ToJsonString();

                //var employeeDetail = (from emp in _dbcontext.Employees
                //                      where emp.MobileNumber == mobile
                //                      select emp.EmployeeId);
                //var employeeid = employeeDetail.FirstOrDefault();

                //var mrdocs = (from docsofspo in _dbcontext.DoctorsOfSpoes
                //              join docts in _dbcontext.Doctors on docsofspo.DoctorId equals docts.DoctorId
                //              where docsofspo.EmployeeId == employeeid
                //              select docsofspo.DoctorCode + "~" + docts.FirstName + "~" + docts.Address1).ToList();
                //DataTable dt = mrdocs.ToDataTable();
                //return dt.ToJsonString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return Doctors;
        }

        // Multiple Doctor Address - Shahrukh (12-30-2019) 
        [WebMethod]
        public string GetAllDoctorswithMultipleAddress(string pEmployeeId, string datetime, string type)
        {
            string Doctors = "";
            try
            {
                _nv.Clear();
                _nv.Add("@EmployeeId-int", pEmployeeId.ToString());
                _nv.Add("@Datetime-datetime", datetime.ToString());
                DataSet dsDoctors = _dl.GetData("sp_getDocotrsMultipleAddresswithLatlong_ForMultipleAddress", _nv);
                Doctors = dsDoctors.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return Doctors;
        }
        [WebMethod]
        public string GetAllDistributor(string pEmployeeId, string datetime)
        {
            string Doctors = "";
            try
            {
                _nv.Clear();
                _nv.Add("@EmployeeId-int", pEmployeeId.ToString());
                _nv.Add("@Datetime-datetime", datetime.ToString());
                DataSet dsDoctors = _dl.GetData("GetAllDistributor_ByBricksAndDistributor", _nv);
                Doctors = dsDoctors.Tables[0].ToJsonString();

            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return Doctors;
        }

        [WebMethod]
        public string GetAllBricksByDistributor(string Employeeid, string date)
        {
            string BricksDataJson = "";
            try
            {
                int month = Convert.ToDateTime(date).Month;
                int year = Convert.ToDateTime(date).Year;
                _nv.Clear();

                _nv.Add("@EmployeeId-int", Employeeid.ToString());
                DataSet dsBricksData = _dl.GetData("sp_GetAllBricksByDistributor_ByBricksAndDistributor", _nv);
                BricksDataJson = dsBricksData.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return BricksDataJson;
        }
        [WebMethod]
        public string GetAllDoctorswithdate(string pEmployeeId, string datetime, string type)
        {
            string Doctors = "";
            try
            {
                _nv.Clear();
                _nv.Add("@EmployeeId-int", pEmployeeId.ToString());
                _nv.Add("@Datetime-datetime", datetime.ToString());
                DataSet dsDoctors = _dl.GetData("Call_GetDoctorsByEmployeeWithDateFilter_New", _nv);
                Doctors = dsDoctors.Tables[0].ToJsonString();

            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return Doctors;
        }

        /*
         * Webservice method for Get data GetAllGifts() use Linq query
         * convert datatable and return json format method
            */
        [WebMethod]
        public string GetAllGifts()
        {
            string data = "";
            DataTable dt;
            try
            {
                var allProducts = (from p in _dbcontext.GiftItems
                                   where p.IsActive
                                   select p).ToList();
                var all = allProducts.Select(product => product.GiftId + "-" + product.GiftName).ToList();
                dt = all.ToDataTable();
                data = dt.ToJsonString();
            }
            catch (Exception ex)
            {

                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return data;
        }

        /*
        * Webservice method for Get data predays() 
        * Stored Procedure getpredaysbynum parameter mobile no
        */
        [WebMethod]
        public string predays(string mobile)
        {
            string data = string.Empty;
            string SampleLimitOfDoctorMonthly = "3";
            string AutoActivityStart = "1";
            string MorningTime = "0,0";
            string EveningTime = "0,0";
            string GeoFencingForExecution = "";
            string Docrange = "";
            string ContactRange = "";
            string GeoFencing = "";
            string MockCheck = "0";

            try
            {
                GeoFencing = ConfigurationManager.AppSettings["GeoFencing"].ToString();
                ContactRange = ConfigurationManager.AppSettings["ContactRange"].ToString();
                Docrange = ConfigurationManager.AppSettings["DoctorRange"].ToString();
                SampleLimitOfDoctorMonthly = ConfigurationManager.AppSettings["SampleLimitOfDoctorMonthly"];
                AutoActivityStart = ConfigurationManager.AppSettings["AutoActivityStart"];
                MorningTime = ConfigurationManager.AppSettings["MorningContactPointRange"];
                EveningTime = ConfigurationManager.AppSettings["EveningContactPointRange"];
                GeoFencingForExecution = ConfigurationManager.AppSettings["GeoFencingForExecution"].ToString();
                MockCheck = ConfigurationManager.AppSettings["MockCheck"].ToString();
            }
            catch (Exception ex)
            {

            }

            try
            {
                _nv.Clear();
                _nv.Add("@Mobile-varchar(25)", mobile);
                DataSet ds = _dl.GetData("getpredaysbynum", _nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        ds.Tables[0].Columns.Add(new DataColumn("SampleLimitOfDoctorMonthly", typeof(string)));
                        DataRow dr = ds.Tables[0].NewRow();
                        ds.Tables[0].Rows[0]["SampleLimitOfDoctorMonthly"] = SampleLimitOfDoctorMonthly;

                        ds.Tables[0].Columns.Add(new DataColumn("AutoActivityStart", typeof(string)));
                        ds.Tables[0].AcceptChanges();
                        ds.Tables[0].Rows[0]["AutoActivityStart"] = AutoActivityStart;

                        ds.Tables[0].Columns.Add(new DataColumn("MorningTime", typeof(string)));
                        ds.Tables[0].AcceptChanges();
                        ds.Tables[0].Rows[0]["MorningTime"] = MorningTime;

                        ds.Tables[0].Columns.Add(new DataColumn("EveningTime", typeof(string)));
                        ds.Tables[0].AcceptChanges();
                        ds.Tables[0].Rows[0]["EveningTime"] = EveningTime;

                        ds.Tables[0].Columns.Add(new DataColumn("DoctorRadius", typeof(string)));
                        ds.Tables[0].AcceptChanges();
                        ds.Tables[0].Rows[0]["DoctorRadius"] = Docrange;

                        ds.Tables[0].Columns.Add(new DataColumn("ContactRadius", typeof(string)));
                        ds.Tables[0].AcceptChanges();
                        ds.Tables[0].Rows[0]["ContactRadius"] = ContactRange;

                        ds.Tables[0].Columns.Add("GeoFencing", typeof(string));
                        ds.Tables[0].AcceptChanges();
                        ds.Tables[0].Rows[0]["GeoFencing"] = GeoFencing;

                        ds.Tables[0].Columns.Add(new DataColumn("GeoFencingForCallExecution", typeof(string)));
                        ds.Tables[0].AcceptChanges();
                        ds.Tables[0].Rows[0]["GeoFencingForCallExecution"] = GeoFencingForExecution;

                        ds.Tables[0].Columns.Add("MockCheck", typeof(string));
                        ds.Tables[0].AcceptChanges();
                        ds.Tables[0].Rows[0]["MockCheck"] = MockCheck;

                        data = ds.Tables[0].ToJsonString();
                    }
                    else
                        data = "null";
                }
                else
                {
                    data = "null";
                }
                /*if (ds.Tables[0].Rows.Count != 0)
                {
                    for (int i = 0; i < ds.Tables[0].Columns.Count; i++)
                    {
                        retrn += ds.Tables[0].Rows[0][i].ToString() + "~";
                    }
                }
                else
                {
                    retrn = "Invalid";
                }*/
            }
            catch (Exception ex)
            {

                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return data;
        }

        [WebMethod]
        public string GetExpenseDetail(string empID, string dateTime)
        {
            string Expenses = string.Empty;
            try
            {
                _nv.Clear();
                _nv.Add("@Employeeid-int", empID.ToString());
                _nv.Add("@Date-int", dateTime);
                DataSet Expense = _dl.GetData("sp_GetOutbackAndNightStayDetail", _nv);
                Expenses = Expense.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return Expenses;
        }

        /*
       * Webservice method for Get data getPharmacy() 
       * Stored Procedure sp_get_pharmacy parameter employee ID and Datetime
       */
        [WebMethod]
        public string getPharmacy(string empID, string dateTime)
        {
            string Pharmacy = string.Empty;
            try
            {
                _nv.Clear();
                _nv.Add("@empid-int", empID.ToString());
                _nv.Add("@month-int", Convert.ToDateTime(dateTime).Month.ToString());
                _nv.Add("@year-int", Convert.ToDateTime(dateTime).Year.ToString());
                DataSet dsPharmacy = _dl.GetData("sp_get_pharmacy", _nv);
                Pharmacy = dsPharmacy.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return Pharmacy;
        }

        /*
          * Webservice method for Get data getLastVisits() 
          * Stored Procedure sp_last_visit_doctor parameter employee ID ,DoctorID and Datetime
          * return Last visits doctor
          */
        [WebMethod]
        public string getLastVisits(string empID, string DocID, string dateTime)
        {
            string LastVisit = string.Empty;
            try
            {
                _nv.Clear();
                _nv.Add("@EmpID-int", empID.ToString());
                _nv.Add("@DocID-int", DocID.ToString());
                _nv.Add("@Month-int", Convert.ToDateTime(dateTime).Month.ToString());
                _nv.Add("@Year-int", Convert.ToDateTime(dateTime).Year.ToString());
                DataSet dsLastVisit = _dl.GetData("sp_last_visit_doctor", _nv);
                LastVisit = dsLastVisit.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return LastVisit;
        }

        /*
         * Webservice method for Get data getPharmacyByDocID() 
         * Stored Procedure sp_get_pharmacyByDoctorID parameter employee ID ,DoctorID and Datetime
         * return Last visits doctor
         */
        [WebMethod]
        public string getPharmacyByDocID(string pEmployeeId, string docID, string dateTime)
        {
            string Pharmacy = string.Empty;
            try
            {
                _nv.Clear();
                _nv.Add("@empid-int", pEmployeeId.ToString());
                _nv.Add("@month-int", Convert.ToDateTime(dateTime).Month.ToString());
                _nv.Add("@year-int", Convert.ToDateTime(dateTime).Year.ToString());
                _nv.Add("@doctorID-int", docID.ToString());
                DataSet dsPharmacy = _dl.GetData("sp_get_pharmacyByDoctorID", _nv);
                Pharmacy = dsPharmacy.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return Pharmacy;
        }

        /*
         * Webservice method for Get data getCompititorProduct() 
         * Stored Procedure sp_Get_Compititor_Products
         * 
         */

        [WebMethod]
        public string getCompititorProduct()
        {
            string Comp_Product = string.Empty;
            try
            {
                DataSet dsComp_Prod = _dl.GetData("sp_Get_Compititor_Products", null);
                Comp_Product = dsComp_Prod.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return Comp_Product;
        }


        /*
         * Webservice method for Get data getCompititorProductByProductID() 
         * Stored Procedure sp_Get_Compititor_ProductsByProduct parameter product ID
         * 
         */
        [WebMethod]
        public string getCompititorProductByProductID(string productID)
        {
            string Comp_Product = string.Empty;
            try
            {
                _nv.Clear();
                _nv.Add("@productID-int", productID.ToString());
                DataSet dsComp_Prod = _dl.GetData("sp_Get_Compititor_ProductsByProduct", _nv);
                Comp_Product = dsComp_Prod.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return Comp_Product;
        }


        /*
         * Webservice method for insert data PharmacyExecution() 
         * Stored Procedure insert sp_pharmacyinsert_New 
         * 
         */
        [WebMethod]
        public string PharmacyExecution(string EmployeeID, string DoctorID, string PharmacyID, string PharmacyPotencial, string productsData, string VisitDate, string IsPlained, string system, string lati, string longi)
        {
            var returnResult = string.Empty;
            try
            {
                //var productsData1 = "44|0";
                string ProductID = string.Empty, MarkitShare = string.Empty, C_ProductID = string.Empty,
                 C_MarkitShare = string.Empty, C2_ProductID = string.Empty, C2_MarkitShare = string.Empty, C3_ProductID = string.Empty, C3_MarkitShare = string.Empty, C4_ProductID = string.Empty,
                 C4_MarkitShare = string.Empty, C5_ProductID = string.Empty, C5_MarkitShare = string.Empty, C6_ProductID = string.Empty, C6_MarkitShare = string.Empty;

                if (productsData != "" || productsData != null)
                {
                    var datap = productsData.Split('&');

                    if (datap.Length > 0)
                    {
                        for (var i = 0; i < datap.Length; i++)
                        {
                            var dataC = datap[i].Split('!');
                            if (dataC.Length > 0)
                            {
                                for (var j = 0; j < dataC.Length; j++)
                                {
                                    //string ProductType = string.Empty;

                                    if (j == 0)
                                    {
                                        var datai0 = dataC[j].Split('|');
                                        if (datai0.Length > 0)
                                        {
                                            string ProductType = string.Empty;
                                            ProductID = datai0[0].ToString();
                                            MarkitShare = datai0[1].ToString();

                                            #region Insert Values PharmacyExecution

                                            try
                                            {
                                                _nv.Clear();
                                                _nv.Add("@EmployeeID-bigint", EmployeeID.ToString());
                                                _nv.Add("@DoctorID-bigint", DoctorID.ToString());
                                                _nv.Add("@PharmacyID-bigint", PharmacyID.ToString());
                                                _nv.Add("@ProductID-bigint", ProductID);
                                                _nv.Add("@MarkitShare-Varchar(100)", MarkitShare);
                                                _nv.Add("@ProductType-bigint", ProductType);
                                                //_nv.Add("@C1_ProductID-int", C1_ProductID);
                                                //_nv.Add("@C1_MarkitShare-Varchar(100)", C1_MarkitShare);
                                                //_nv.Add("@C2_ProductID-int", C2_ProductID);
                                                //_nv.Add("@C2_MarkitShare-Varchar(100)", C2_MarkitShare);
                                                //_nv.Add("@C3_ProductID-int", C3_ProductID);
                                                //_nv.Add("@C3_MarkitShare-Varchar(100)", C3_MarkitShare);
                                                //_nv.Add("@C4_ProductID-int", C4_ProductID);
                                                //_nv.Add("@C4_MarkitShare-Varchar(100)", C4_MarkitShare);
                                                //_nv.Add("@C5_ProductID-int", C5_ProductID);
                                                //_nv.Add("@C5_MarkitShare-Varchar(100)", C5_MarkitShare);
                                                //_nv.Add("@C6_ProductID-int", C6_ProductID);
                                                //_nv.Add("@C6_MarkitShare-Varchar(100)", C6_MarkitShare);
                                                _nv.Add("@PharmacyPotencial-Varchar(100)", PharmacyPotencial);
                                                _nv.Add("@VisitDate-DateTime", VisitDate.ToString());
                                                _nv.Add("@IsPlained-int", IsPlained.ToString());
                                                _nv.Add("@System-Varchar(100)", productsData);
                                                _nv.Add("@Lati-Varchar(100)", lati.ToString());
                                                _nv.Add("@Longi-Varchar(100)", longi.ToString());
                                                var dsComp_Prod = _dl.InserData("sp_pharmacyinsert_New", _nv);

                                                if (dsComp_Prod)
                                                {
                                                    returnResult = "OK";
                                                }
                                                else
                                                {

                                                    returnResult = "Not inserted";
                                                }
                                            }
                                            catch (Exception ex)
                                            {
                                                returnResult = "Error Exception. Dtat: " + productsData;
                                            }

                                            #endregion
                                        }
                                    }
                                    else
                                    {
                                        var datai0 = dataC[j].Split('|');
                                        if (datai0.Length > 0)
                                        {
                                            string ProductType = dataC[0].Split('|')[0].ToString();

                                            ProductID = datai0[0].ToString();
                                            MarkitShare = datai0[1].ToString();

                                            #region Insert Values PharmacyExecution

                                            try
                                            {
                                                _nv.Clear();
                                                _nv.Add("@EmployeeID-bigint", EmployeeID.ToString());
                                                _nv.Add("@DoctorID-bigint", DoctorID.ToString());
                                                _nv.Add("@PharmacyID-bigint", PharmacyID.ToString());
                                                _nv.Add("@ProductID-bigint", ProductID);
                                                _nv.Add("@MarkitShare-Varchar(100)", MarkitShare);
                                                _nv.Add("@ProductType-bigint", ProductType);
                                                //_nv.Add("@C1_ProductID-int", C1_ProductID);
                                                //_nv.Add("@C1_MarkitShare-Varchar(100)", C1_MarkitShare);
                                                //_nv.Add("@C2_ProductID-int", C2_ProductID);
                                                //_nv.Add("@C2_MarkitShare-Varchar(100)", C2_MarkitShare);
                                                //_nv.Add("@C3_ProductID-int", C3_ProductID);
                                                //_nv.Add("@C3_MarkitShare-Varchar(100)", C3_MarkitShare);
                                                //_nv.Add("@C4_ProductID-int", C4_ProductID);
                                                //_nv.Add("@C4_MarkitShare-Varchar(100)", C4_MarkitShare);
                                                //_nv.Add("@C5_ProductID-int", C5_ProductID);
                                                //_nv.Add("@C5_MarkitShare-Varchar(100)", C5_MarkitShare);
                                                //_nv.Add("@C6_ProductID-int", C6_ProductID);
                                                //_nv.Add("@C6_MarkitShare-Varchar(100)", C6_MarkitShare);
                                                _nv.Add("@PharmacyPotencial-Varchar(100)", PharmacyPotencial);
                                                _nv.Add("@VisitDate-DateTime", VisitDate.ToString());
                                                _nv.Add("@IsPlained-int", IsPlained.ToString());
                                                _nv.Add("@System-Varchar(100)", productsData);
                                                _nv.Add("@Lati-Varchar(100)", lati.ToString());
                                                _nv.Add("@Longi-Varchar(100)", longi.ToString());

                                                var dsComp_Prod = _dl.InserData("sp_pharmacyinsert_New", _nv);
                                                if (dsComp_Prod)
                                                {
                                                    returnResult = "OK";
                                                }
                                                else
                                                {

                                                    returnResult = "Not inserted Competitor";
                                                }
                                            }
                                            catch (Exception ex)
                                            {
                                                returnResult = "Error Exception";
                                            }

                                            #endregion
                                        }
                                    }

                                    #region Product ID And Share Qty
                                    //var datai=null;
                                    //switch (j)
                                    //{
                                    //    case 0:
                                    //       var datai0 = dataC[j].Split('~');
                                    //        if (datai0.Length > 0)
                                    //        {
                                    //            ProductID = datai0[0].ToString();
                                    //            MarkitShare = datai0[1].ToString();
                                    //        }
                                    //        break;

                                    //    case 1:
                                    //        var datai1 = dataC[j].Split('~');
                                    //        if (datai1.Length > 0)
                                    //        {
                                    //            C1_ProductID = datai1[0].ToString();
                                    //            C1_MarkitShare = datai1[1].ToString();
                                    //        }
                                    //        break;

                                    //    case 2:
                                    //        var datai2 = dataC[j].Split('~');
                                    //        if (datai2.Length > 0)
                                    //        {
                                    //            C2_ProductID = datai2[0].ToString();
                                    //            C2_MarkitShare = datai2[1].ToString();
                                    //        }
                                    //        break;

                                    //    case 3:
                                    //        var datai3 = dataC[j].Split('~');
                                    //        if (datai3.Length > 0)
                                    //        {
                                    //            C3_ProductID = datai3[0].ToString();
                                    //            C3_MarkitShare = datai3[1].ToString();
                                    //        }
                                    //        break;

                                    //    case 4:
                                    //        var datai4 = dataC[j].Split('~');
                                    //        if (datai4.Length > 0)
                                    //        {
                                    //            C4_ProductID = datai4[0].ToString();
                                    //            C4_MarkitShare = datai4[1].ToString();
                                    //        }
                                    //        break;

                                    //    case 5:
                                    //        var datai5 = dataC[j].Split('~');
                                    //        if (datai5.Length > 0)
                                    //        {
                                    //            C5_ProductID = datai5[0].ToString();
                                    //            C5_MarkitShare = datai5[1].ToString();
                                    //        }
                                    //        break;

                                    //    case 6:
                                    //        var datai6 = dataC[j].Split('~');
                                    //        if (datai6.Length > 0)
                                    //        {
                                    //            C6_ProductID = datai6[0].ToString();
                                    //            C6_MarkitShare = datai6[1].ToString();
                                    //        }
                                    //        break;

                                    //}
                                    //if (j == 0)
                                    //{
                                    //    var datai = dataC[j].Split('~');
                                    //    if (datai.Length > 0)
                                    //    {
                                    //        ProductID = datai[0].ToString();
                                    //        MarkitShare = datai[1].ToString();
                                    //    }                                    
                                    //}
                                    //if (j == 1)
                                    //{
                                    //    var datai = dataC[j].Split('~');
                                    //    if (datai.Length > 0)
                                    //    {
                                    //        C1_ProductID = datai[0].ToString();
                                    //        C1_MarkitShare = datai[1].ToString();
                                    //    }
                                    //}
                                    //if (j == 2)
                                    //{
                                    //    var datai = dataC[j].Split('~');
                                    //    if (datai.Length > 0)
                                    //    {
                                    //        C2_ProductID = datai[0].ToString();
                                    //        C2_MarkitShare = datai[1].ToString();
                                    //    }
                                    //}
                                    //if (j == 3)
                                    //{
                                    //    var datai = dataC[j].Split('~');
                                    //    if (datai.Length > 0)
                                    //    {
                                    //        C3_ProductID = datai[0].ToString();
                                    //        C3_MarkitShare = datai[1].ToString();
                                    //    }
                                    //}
                                    //if (j == 4)
                                    //{
                                    //    var datai = dataC[j].Split('~');
                                    //    if (datai.Length > 0)
                                    //    {
                                    //        C4_ProductID = datai[0].ToString();
                                    //        C4_MarkitShare = datai[1].ToString();
                                    //    }
                                    //}
                                    //if (j == 5)
                                    //{
                                    //    var datai = dataC[j].Split('~');
                                    //    if (datai.Length > 0)
                                    //    {
                                    //        C5_ProductID = datai[0].ToString();
                                    //        C5_MarkitShare = datai[1].ToString();
                                    //    }
                                    //}
                                    //if (j == 6)
                                    //{
                                    //    var datai = dataC[j].Split('~');
                                    //    if (datai.Length > 0)
                                    //    {
                                    //        C6_ProductID = datai[0].ToString();
                                    //        C6_MarkitShare = datai[1].ToString();
                                    //    }
                                    //}

                                    #endregion

                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {

                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;
        }


        /*
         * Webservice method for Get data GetSalesTodayvsDailyTarget() 
         * Stored Procedure sp_Get_SalesTodayvsDailyTarget 
         * return 3 tables data use android dropdown
         */
        [WebMethod]
        public string GetSalesTodayvsDailyTarget()
        {
            string Comp_Product = string.Empty;
            try
            {
                DataSet dsComp_Prod = _dl.GetData("sp_Get_SalesTodayvsDailyTarget", null);
                Comp_Product = dsComp_Prod.Tables[0].ToJsonString();

            }
            catch (Exception ex)
            {

                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return Comp_Product;
        }


        /*
        * Webservice method for Insert data SalesDailyReportingExecutionInsert() 
        * Stored Procedure sp_SalesDailyReportingInsert 
        * 
        */
        [WebMethod]
        public string SalesDailyReportingExecutionInsert(string EmployeeID, string SalesAchievedYestedayID, string SalesForcastTodayID, string JointVisit, string VisitDate, string system, string lati, string longi)
        {


            string Pharmacy = string.Empty;
            try
            {
                _nv.Clear();
                _nv.Add("@latitude-varchar(50)", lati.ToString());
                _nv.Add("@longitude-varchar(50)", longi.ToString());
                _nv.Add("@Visitdatetime-datetime", VisitDate.ToString());
                _nv.Add("@JointVisit-bit", JointVisit.ToString());
                _nv.Add("@System-varchar(50)", system.ToString());
                _nv.Add("@EmployeeID-int", EmployeeID.ToString());
                _nv.Add("@SalesAchievedYestedayID-int", SalesAchievedYestedayID.ToString());
                _nv.Add("@SalesForcastTodayID-int", SalesForcastTodayID.ToString());
                bool SaleDaily = _dl.InserData("sp_SalesDailyReportingInsert", _nv);
                // Pharmacy = dsSaleDaily.Tables[0].ToJsonString();
                if (SaleDaily)
                {
                    Pharmacy = "OK";
                }
                else
                {

                    Pharmacy = "Not inserted Sales Daily Reporting";
                }
            }
            catch (Exception ex)
            {

                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return Pharmacy;
        }


        [WebMethod]
        public string getDoctorWithGiftQty(string mobile)
        {
            _nv = new NameValueCollection();
            _nv.Clear();
            _nv.Add("@loginId-varchar(25)", mobile);
            //  dl = new DAL();
            DataSet ds = _dl.GetData("getAllDoctorWithGiftQty", _nv);
            string data = "";
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                data = ds.Tables[0].ToJsonString();
            }
            else
            {
                data = "null";
            }
            /*if (ds.Tables[0].Rows.Count != 0)
            {

                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    for (int j = 0; j < ds.Tables[0].Columns.Count; j++)
                    {
                        data += ds.Tables[0].Rows[i][j].ToString() + "~";
                    }
                    data += "\n";
                }
                return data;
            }
            else
            {
                return data;
            }*/
            return data;
        }


        [WebMethod]
        public string getSampleQty(string empid, string date)
        {
            _nv = new NameValueCollection();
            _nv.Clear();
            _nv.Add("@mobile-varchar(20)", empid);
            _nv.Add("@date-varchar(25)", date);
            //dl = new DAL();
            DataSet ds = _dl.GetData("chksampleqty", _nv);
            string data = "";
            /*if (ds != null)
                if (ds.Tables[0].Rows.Count != 0)
                {

                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        for (int j = 0; j < ds.Tables[0].Columns.Count; j++)
                        {
                            data += ds.Tables[0].Rows[i][j].ToString() + "~";
                        }
                        data += "\n";
                    }
                    return data;
                }
                else
                {
                    return data;
                }
            return data;*/
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                data = ds.Tables[0].ToJsonString();
            }
            else
            {
                data = "null";
            }
            return data;
        }


        [WebMethod]
        public string getDoctorWithSampleQty(string mobile)
        {
            _nv = new NameValueCollection();
            _nv.Clear();
            _nv.Add("@loginId-varchar(25)", mobile);
            //dl = new DAL();
            DataSet ds = _dl.GetData("getAllDoctorWithSampleQty", _nv);
            string data = "";
            /*if (ds != null)
                if (ds.Tables[0].Rows.Count != 0)
                {

                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        for (int j = 0; j < ds.Tables[0].Columns.Count; j++)
                        {
                            data += ds.Tables[0].Rows[i][j].ToString() + "~";
                        }
                        data += "\n";
                    }
                    return data;
                }
                else
                {
                    return data;
                }
            return data;*/
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                data = ds.Tables[0].ToJsonString();
            }
            else
            {
                data = "null";
            }
            return data;
        }


        [WebMethod]
        public string PostResetLocation(string empId, string docId, string date, string Lat, string Lng, string Note)
        {
            string returnstring = "";
            string address = "";
            try
            {
                string apiKey = ConfigurationManager.AppSettings["MapsAPIKey"].ToString();
                DateTime dat = DateTime.Parse(date, System.Globalization.CultureInfo.InvariantCulture);
                try
                {
                    string url = string.Format("https://eu1.locationiq.com/v1/reverse.php?key={0}&lat={1}&lon={2}&format=xml", apiKey, Lat.ToString(), Lng.ToString());
                    //       string url = "http://maps.googleapis.com/maps/api/geocode/xml?latlng=" + Lat.ToString() + "," + Lng.ToString() + "&sensor=false";
                    WebRequest request = WebRequest.Create(url);
                    using (WebResponse response = (HttpWebResponse)request.GetResponse())
                    {
                        using (StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.UTF8))
                        {
                            DataSet dsResult = new DataSet();
                            dsResult.ReadXml(reader);//format in xml
                            DataTable dtCoordinates = new DataTable();
                            dtCoordinates.Columns.AddRange(new DataColumn[1] { new DataColumn("AreaAddress", typeof(string)) });

                            if (dsResult.Tables.Count > 1)
                            {
                                var data = dsResult.Tables[1];
                                var add1 = data.Rows[0]["result_text"].ToString();
                                //var add2 = data.Rows[2]["formatted_address"].ToString();
                                //string split = add1.Split(',')[0];
                                address = add1;
                            }


                        }
                    }
                }
                catch { }

                _nv = new NameValueCollection();
                _nv.Clear();
                _nv.Add("@empId-varchar(20)", empId);
                _nv.Add("@docId-varchar(25)", docId);
                _nv.Add("@date-varchar(20)", date);
                _nv.Add("@Lat-varchar(25)", Lat);
                _nv.Add("@Lng-varchar(20)", Lng);
                _nv.Add("@address-varchar(250)", address);
                _nv.Add("@Note-varchar(250)", Note);

                DataSet dsreset = _dl.GetData("sp_insertRestLocation", _nv);

                if (dsreset.Tables[0].Rows.Count > 0)
                {
                    if (dsreset.Tables[0].Rows[0]["Messag"].ToString() == "Already")
                    {
                        returnstring = "Already";
                    }
                    else if (dsreset.Tables[0].Rows[0]["Messag"].ToString() == "Successfully")
                    {
                        returnstring = "Successfully";
                    }

                }
                else
                {
                    returnstring = "error";
                }

            }
            catch (Exception ex)
            {

            }

            return returnstring;
        }

        [WebMethod]
        public string PostResetLocationWithMultipleAddress(string empId, string docId, string date, string Lat, string Lng, string Note, string visitShift)
        {
            string returnstring = "";
            string address = "";
            try
            {
                DateTime dat = DateTime.Parse(date, System.Globalization.CultureInfo.InvariantCulture);
                string apiKey = ConfigurationManager.AppSettings["MapsAPIKey"].ToString();

                try
                {
                    string url = string.Format("https://eu1.locationiq.com/v1/reverse.php?key={0}&lat={1}&lon={2}&format=xml", apiKey, Lat.ToString(), Lng.ToString());
                    //       string url = "http://maps.googleapis.com/maps/api/geocode/xml?latlng=" + Lat.ToString() + "," + Lng.ToString() + "&sensor=false";
                    WebRequest request = WebRequest.Create(url);
                    using (WebResponse response = (HttpWebResponse)request.GetResponse())
                    {
                        using (StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.UTF8))
                        {
                            DataSet dsResult = new DataSet();
                            dsResult.ReadXml(reader);//format in xml
                            DataTable dtCoordinates = new DataTable();
                            dtCoordinates.Columns.AddRange(new DataColumn[1] { new DataColumn("AreaAddress", typeof(string)) });

                            if (dsResult.Tables.Count > 1)
                            {
                                var data = dsResult.Tables[1];
                                var add1 = data.Rows[0]["result_text"].ToString();
                                //var add2 = data.Rows[2]["formatted_address"].ToString();
                                //string split = add1.Split(',')[0];
                                address = add1;
                            }


                        }
                    }
                }
                catch { }

                _nv = new NameValueCollection();
                _nv.Clear();
                _nv.Add("@empId-varchar(20)", empId);
                _nv.Add("@docId-varchar(25)", docId);
                _nv.Add("@date-varchar(20)", date);
                _nv.Add("@Lat-varchar(25)", Lat);
                _nv.Add("@Lng-varchar(20)", Lng);
                _nv.Add("@address-varchar(250)", address);
                _nv.Add("@Note-varchar(250)", Note);
                _nv.Add("@vstshift-varchar(50)", visitShift);
                DataSet dsreset = _dl.GetData("sp_insertRestLocation_ForMultipleAddress", _nv);

                if (dsreset.Tables[0].Rows.Count > 0)
                {
                    if (dsreset.Tables[0].Rows[0]["Messag"].ToString() == "Already")
                    {
                        returnstring = "Already";
                    }
                    else if (dsreset.Tables[0].Rows[0]["Messag"].ToString() == "Successfully")
                    {
                        returnstring = "Successfully";
                    }

                }
                else
                {
                    returnstring = "error";
                }

            }
            catch (Exception ex)
            {

            }

            return returnstring;
        }

        [WebMethod]
        public string GetAllClasses()
        {

            var returnResult = string.Empty;
            try
            {

                _nv.Clear();
                var dsclass = _dl.GetData("sp_SelectAllClasses", _nv);
                if (dsclass != null)
                {
                    returnResult = dsclass.Tables[0].ToJsonString();

                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;




        }

        [WebMethod]
        public string GetAllSpeciality()
        {

            var returnResult = string.Empty;
            var outputString = "";
            try
            {

                _nv.Clear();
                var dsspec = _dl.GetData("Call_GetSpecialities", _nv);
                if (dsspec != null)
                {
                    string inputString = dsspec.Tables[0].ToJsonString();
                    string[] replaceables = new[] { @"\", "|", "!", "#", "$", "%", "&", "/", "=", "?", "»", "«", "@", "£", "§", "€", "^", "'", "<", ">", "`" };
                    string rxString = string.Join("|", replaceables.Select(s => Regex.Escape(s)));
                    outputString = Regex.Replace(inputString, rxString, "-");
                    returnResult = outputString;
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;




        }

        [WebMethod]
        public string GetAllDrDesignation()
        {

            var returnResult = string.Empty;
            string outputString = "";
            try
            {

                _nv.Clear();
                var dsdesig = _dl.GetData("sp_SelectAllDrDesignation", _nv);
                if (dsdesig != null)
                {
                    string inputString = dsdesig.Tables[0].ToJsonString();
                    string[] replaceables = new[] { @"\", "|", "!", "#", "$", "%", "&", "/", "=", "?", "»", "«", "@", "£", "§", "€", "^", "'", "<", ">", "`" };
                    string rxString = string.Join("|", replaceables.Select(s => Regex.Escape(s)));
                    outputString = Regex.Replace(inputString, rxString, "-");

                    returnResult = outputString;
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;
        }

        [WebMethod]
        public string GetAllDrQualification()
        {
            var returnResult = string.Empty;
            var outputString = "";
            try
            {
                _nv.Clear();
                var dsqual = _dl.GetData("sp_SelectAllDrQualification", _nv);
                if (dsqual != null)
                {
                    string inputString = dsqual.Tables[0].ToJsonString();
                    string[] replaceables = new[] { @"\", "|", "!", "#", "$", "%", "&", "/", "=", "?", "»", "«", "@", "£", "§", "€", "^", "'", "<", ">", "`" };
                    string rxString = string.Join("|", replaceables.Select(s => Regex.Escape(s)));
                    outputString = Regex.Replace(inputString, rxString, "-");
                    returnResult = outputString;
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;
        }

        [WebMethod]
        public string InsertNewDoctor(string DoctorName, string Gender, string Address1, string Address2, string City, string Country, string MobileNumber1, string MobileNumber2, string DesignationId, string SpecialityId, string QualificationId, string ClassId, string frequency, string EmployeeId, string Latitude, string Longitude)
        {
            string returnstring = "";
            string geoaddress = "";

            try
            {
                string apiKey = ConfigurationManager.AppSettings["MapsAPIKey"].ToString();
                //string url = "http://maps.googleapis.com/maps/api/geocode/xml?latlng=" + Latitude.ToString() + "," + Longitude.ToString() + "&sensor=false";
                string url = string.Format("https://eu1.locationiq.com/v1/reverse.php?key={0}&lat={1}&lon={2}&format=xml", apiKey, Latitude.ToString(), Longitude.ToString());
                WebRequest request = WebRequest.Create(url);
                using (WebResponse response = (HttpWebResponse)request.GetResponse())
                {
                    using (StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.UTF8))
                    {
                        DataSet dsResult = new DataSet();
                        dsResult.ReadXml(reader);//format in xml
                        DataTable dtCoordinates = new DataTable();
                        dtCoordinates.Columns.AddRange(new DataColumn[1] { new DataColumn("AreaAddress", typeof(string)) });

                        if (dsResult.Tables.Count > 1)
                        {
                            var data = dsResult.Tables[1];
                            var add1 = data.Rows[0]["result_text"].ToString();
                            //var add2 = data.Rows[2]["formatted_address"].ToString();
                            //string split = add1.Split(',')[0];
                            //geoaddress = split + " " + add2;
                            geoaddress = add1;
                        }

                    }
                }

                _nv = new NameValueCollection();
                _nv.Clear();
                _nv.Add("@DoctorName-nvarchar(255)", DoctorName);
                _nv.Add("@Gender-bit", Gender);
                _nv.Add("@Address1-nvarchar(255)", Address1);
                _nv.Add("@Address2-nvarchar(255)", Address2);
                _nv.Add("@City-nvarchar(255)", City);
                _nv.Add("@Country-nvarchar(255)", Country);
                _nv.Add("@MobileNumber1-varchar(255)", MobileNumber1);
                _nv.Add("@MobileNumber2-varchar(255)", MobileNumber2);
                _nv.Add("@DesignationId-int", DesignationId);
                _nv.Add("@SpecialityId-int", SpecialityId);
                _nv.Add("@QualificationId-int", QualificationId);
                _nv.Add("@ClassId-int", ClassId);
                _nv.Add("@EmployeeId-int", EmployeeId);
                _nv.Add("@Latitude-varchar(50)", Latitude);
                _nv.Add("@Longitude-varchar(50)", Longitude);
                _nv.Add("@GeoAddress-varchar(255)", geoaddress);
                _nv.Add("@frequency-varchar(255)", frequency);
                DataSet dsreset = _dl.GetData("sp_InsertNewDocRequest", _nv);

                if (dsreset.Tables[0].Rows.Count > 0)
                {
                    string result = dsreset.Tables[0].Rows[0].ToString();

                    if (result != "Exist")
                    {
                        returnstring = "OK";
                    }
                    else
                    {
                        returnstring = "Exist";
                    }
                }
            }
            catch (Exception ex)
            {
                ErrorLog("New Doctor Request: " + ex.Message);
            }
            return returnstring;
        }

        [WebMethod]
        public string InsertNewDoctorBricksAndDistributor(string DoctorName, string Gender, string Address1, string Address2, string City, string Country, string MobileNumber1, string MobileNumber2, string DesignationId, string SpecialityId, string QualificationId, string ClassId, string frequency, string EmployeeId, string Latitude, string Longitude, string brickid, string brickcityid, string distributorid)
        {
            string returnstring = "0";
            string geoaddress = "";

            try
            {
                string apiKey = ConfigurationManager.AppSettings["MapsAPIKey"].ToString();
                //string url = "http://maps.googleapis.com/maps/api/geocode/xml?latlng=" + Latitude.ToString() + "," + Longitude.ToString() + "&sensor=false";
                string url = string.Format("https://eu1.locationiq.com/v1/reverse.php?key={0}&lat={1}&lon={2}&format=xml", apiKey, Latitude.ToString(), Longitude.ToString());
                WebRequest request = WebRequest.Create(url);
                using (WebResponse response = (HttpWebResponse)request.GetResponse())
                {
                    using (StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.UTF8))
                    {
                        DataSet dsResult = new DataSet();
                        dsResult.ReadXml(reader);//format in xml
                        DataTable dtCoordinates = new DataTable();
                        dtCoordinates.Columns.AddRange(new DataColumn[1] { new DataColumn("AreaAddress", typeof(string)) });

                        if (dsResult.Tables.Count > 1)
                        {
                            var data = dsResult.Tables[1];
                            var add1 = data.Rows[0]["result_text"].ToString();
                            //var add2 = data.Rows[2]["formatted_address"].ToString();
                            //string split = add1.Split(',')[0];
                            //geoaddress = split + " " + add2;
                            geoaddress = add1;
                        }
                    }
                }

                _nv = new NameValueCollection();
                _nv.Clear();
                _nv.Add("@DoctorName-nvarchar(255)", DoctorName);
                _nv.Add("@Gender-bit", Gender);
                _nv.Add("@Address1-nvarchar(255)", Address1);
                _nv.Add("@Address2-nvarchar(255)", Address2);
                _nv.Add("@City-nvarchar(255)", City);
                _nv.Add("@Country-nvarchar(255)", Country);
                _nv.Add("@MobileNumber1-varchar(255)", MobileNumber1);
                _nv.Add("@MobileNumber2-varchar(255)", MobileNumber2);
                _nv.Add("@DesignationId-int", DesignationId);
                _nv.Add("@SpecialityId-int", SpecialityId);
                _nv.Add("@QualificationId-int", QualificationId);
                _nv.Add("@ClassId-int", ClassId);
                _nv.Add("@EmployeeId-int", EmployeeId);
                _nv.Add("@Latitude-varchar(50)", Latitude);
                _nv.Add("@Longitude-varchar(50)", Longitude);
                _nv.Add("@GeoAddress-varchar(255)", geoaddress);
                _nv.Add("@frequency-varchar(255)", frequency);
                _nv.Add("@BricksID-varchar(255)", brickid);
                _nv.Add("@distributorid-varchar(255)", distributorid);
                _nv.Add("@BricksCityID-varchar(255)", brickcityid);
                DataSet dsreset = _dl.GetData("sp_InsertNewDocRequest_ByBricksAndDistributor", _nv);

                if (dsreset.Tables[0].Rows.Count > 0)
                {
                    string result = dsreset.Tables[0].Rows[0].ToString();

                    if (result != "Exist")
                    {
                        returnstring = "OK";
                    }
                    else
                    {
                        returnstring = "Exist";
                    }
                }
            }
            catch (Exception ex)
            {
                ErrorLog("New Doctor Request: " + ex.Message);

            }
            return returnstring;
        }

        [WebMethod]
        public string UpdateDoctorBricksAndDistributor(string DoctorID, string EmployeeId, string frequency, string classid, string brickid, string brickcityid, string distributorid)
        {
            string returnstring = "";
            try
            {
                _nv = new NameValueCollection();
                _nv.Clear();
                _nv.Add("@DoctorId-int", DoctorID);
                _nv.Add("@ClassId-int", classid);
                _nv.Add("@EmployeeId-int", EmployeeId);
                _nv.Add("@frequency-varchar(255)", frequency);
                _nv.Add("@BricksID-varchar(255)", brickid);
                _nv.Add("@distributorid-varchar(255)", distributorid);
                _nv.Add("@BricksCityID-varchar(255)", brickcityid);
                _nv.Add("@Flag-varchar(255)", "UpdateFromApp");
                DataSet dsreset = _dl.GetData("sp_UpdateDoctorBricksAndDistributor_ByBricksAndDistributor", _nv);

                if (dsreset.Tables[0].Rows.Count > 0)
                {
                    string result = dsreset.Tables[0].Rows[0][0].ToString();

                    if (result != "Exists")
                    {
                        returnstring = "OK";
                    }
                    else
                    {
                        returnstring = "Exist";
                    }
                }
            }
            catch (Exception ex)
            {
                ErrorLog("New Doctor Request: " + ex.Message);

            }
            return returnstring;
        }

        [WebMethod]
        public string GetMedRepsByManagerID(string ManagerId)
        {
            string EmployeeDataJson = "";
            try
            {
                _nv.Clear();
                _nv.Add("@ManagerId-bigint", ManagerId.ToString());
                DataSet dsEmployeeData = _dl.GetData("sp_GetMedRepsByManagerID", _nv);
                EmployeeDataJson = dsEmployeeData.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return EmployeeDataJson;
        }

        [WebMethod]
        public string GetAllBricks(string ManagerId, string date)
        {
            string BricksDataJson = "";
            try
            {
                int month = Convert.ToDateTime(date).Month;
                int year = Convert.ToDateTime(date).Year;
                _nv.Clear();
                _nv.Add("@ManagerId-bigint", ManagerId.ToString());
                _nv.Add("@Month-int", month.ToString());
                _nv.Add("@Year-int", year.ToString());
                DataSet dsBricksData = _dl.GetData("sp_GetAllBricks", _nv);
                BricksDataJson = dsBricksData.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return BricksDataJson;
        }

        [WebMethod]
        public string GetAllTowns(string ManagerId, string date)
        {
            string TownsDataJson = "[]";
            try
            {
                int month = Convert.ToDateTime(date).Month;
                int year = Convert.ToDateTime(date).Year;
                _nv.Clear();
                _nv.Add("@ManagerId-bigint", ManagerId.ToString());
                _nv.Add("@Month-int", month.ToString());
                _nv.Add("@Year-int", year.ToString());
                //DataSet dsTownsData = _dl.GetData("sp_GetAllTowns", _nv);
                DataSet dsTownsData = null;
                if (dsTownsData != null)
                {
                    TownsDataJson = dsTownsData.Tables[0].ToJsonString();
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return TownsDataJson;
        }

        [WebMethod]
        public string GetAllShiftSession(string ManagerId)
        {
            string ShiftSessionDataJson = "[]";
            try
            {
                ShiftSessionDataJson = ConfigurationManager.AppSettings[@"ShiftSession"].ToString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return ShiftSessionDataJson;
        }

        [WebMethod]
        public string GetAllNumberOfCalls(string ManagerId)
        {
            string NumberOfCallsDataJson = "[]";
            try
            {
                NumberOfCallsDataJson = ConfigurationManager.AppSettings[@"NumberOfCalls"].ToString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return NumberOfCallsDataJson;
        }

        [WebMethod]
        public string GetAllTypeOfWorking(string ManagerId)
        {
            string TypeOfWorkingDataJson = "[]";
            try
            {
                TypeOfWorkingDataJson = ConfigurationManager.AppSettings[@"TypeOfWorking"].ToString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return TypeOfWorkingDataJson;
        }

        [WebMethod]
        public string GetAllScaleDefinition(string ManagerId)
        {
            string ScaleDefinitionDataJson = "[]";
            try
            {
                ScaleDefinitionDataJson = ConfigurationManager.AppSettings[@"ScaleDefinition"].ToString();
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }
            return ScaleDefinitionDataJson;
        }


        //ConfigurationManager.AppSettings[@"MobileService-Logs\"].ToString() ShiftSession NumberOfCalls TypeOfWorking

        /*
   * Webservice method for Get data GetCallReason() 
   * Stored Procedure Call_GetCallReasons no parameter
   */
        [WebMethod]
        public string GetCallReason()
        {
            var returnResult = string.Empty;
            try
            {
                var dsReason = _dl.GetData("Call_GetCallReasons", null);
                if (dsReason != null)
                {
                    returnResult = dsReason.Tables[0].ToJsonString();
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;
        }

        [WebMethod]
        public string GetCity()
        {
            var returnResult = string.Empty;
            try
            {
                var dscities = _dl.GetData("Call_GetCities", null);
                if (dscities != null)
                {
                    returnResult = dscities.Tables[0].ToJsonString();
                }
            }
            catch (Exception ex)
            {
                ErrorLog("Error Message: " + ex.Message.ToString() + "\n\r Stack: " + ex.StackTrace.ToString());
            }

            return returnResult;
        }

        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllRatingData(string date, string empid)
        {
            string returnString = "";

            try
            {
                _nv.Clear();
                _nv.Add("@empid-int", empid);
                _nv.Add("@Date-datetime", date);
                DataSet ds = _dl.GetData("sp_GetAllFormQuestionAnswerRatingData", _nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "";
                    }
                }
                else
                {
                    returnString = "";
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            //return System.Text.RegularExpressions.Regex.Unescape(returnString);
            return returnString;
        }


        [WebMethod]
        public string GetCallExecutionActivities(string role)
        {
            var returnString = "";

            if (role == "MIO")
            {
                var dsDayViewReslt = _dl.GetData("sp_GetCallExecutionActivities", null);
                if (dsDayViewReslt != null)
                {
                    returnString = dsDayViewReslt.Tables[0].ToJsonString();
                }
            }
            if (role == "ZSM")
            {
                var dsDayViewReslt = _dl.GetData("sp_GetCallExecutionActivitiesZSM", null);
                if (dsDayViewReslt != null)
                {
                    returnString = dsDayViewReslt.Tables[0].ToJsonString();
                }
            }
            if (role == "RSM")
            {
                var dsDayViewReslt = _dl.GetData("sp_GetCallExecutionActivitiesRSM", null);
                if (dsDayViewReslt != null)
                {
                    returnString = dsDayViewReslt.Tables[0].ToJsonString();
                }
            }
            return returnString;
        }


        #region Logger
        public static void ErrorLog(string error)
        {
            try
            {
                if (!Directory.Exists(ConfigurationManager.AppSettings["MobileService-Logs"].ToString()))
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings["MobileService-Logs"].ToString());
                }

                File.AppendAllText(ConfigurationManager.AppSettings[@"MobileService-Logs\"].ToString() + "ReportLog_" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
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

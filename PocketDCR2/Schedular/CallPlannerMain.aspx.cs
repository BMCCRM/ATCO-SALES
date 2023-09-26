using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SchedulerDAL;
using System.Data;
using System.Data.SqlClient;
// Should be open when run into production with pocketDCR2
using DatabaseLayer.SQL;
using PocketDCR2.Classes;


namespace PocketDCR2.Schedular
{
    public partial class CallPlannerMain : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["CurrentUserId"] != null)
            {

                int employeeID = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
                int roleID = 0;

                DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
                var roleId = _dataContext.sp_EmploeesInRolesSelect(null, employeeID).ToList();
                if (roleId.Count != 0)
                {
                    roleID = roleId[0].RoleId;
                    Session["Roleid"] = roleID.ToString();
                    string ip = Server.HtmlEncode(Request.UserHostAddress);
                    Constants.GetClientIP("CallPlanner", roleId.ToString(), ip, employeeID.ToString());
                }
                //should be removed below role related code when run into production with PocketDCR2
                //roleID = int.Parse(Session["Roleid"].ToString());


                
                //Activities
                DataTable dtActivities = SchedulerDAL.SchedulerManager.getActivities();
                if (dtActivities.Rows.Count > 0)
                {
                    ActivitiesCollection.Instance.Clear();
                    for (int i = 0; i < dtActivities.Rows.Count; i++)
                    {
                        Activities act = new Activities(int.Parse(dtActivities.Rows[i]["pk_CPA_CallPlannerActivityID"].ToString()), dtActivities.Rows[i]["CPA_Name"].ToString(), dtActivities.Rows[i]["CPA_Description"].ToString(), dtActivities.Rows[i]["CPA_BackgroundColor"].ToString(), dtActivities.Rows[i]["CPA_ForeColor"].ToString(), int.Parse(dtActivities.Rows[i]["CPA_NoOfProducts"].ToString()), int.Parse(dtActivities.Rows[i]["CPA_NoOfReminders"].ToString()), int.Parse(dtActivities.Rows[i]["CPA_NoOfSample"].ToString()), int.Parse(dtActivities.Rows[i]["CPA_NoOfGift"].ToString()));
                        ActivitiesCollection.Instance.AddActivity(act);
                    }
                }

                //Holidays
                DataTable dtholidays = SchedulerDAL.SchedulerManager.GetHolidayDates();
                if (dtholidays.Rows.Count > 0)
                {
                    HolidaysCollection.Instance.Clear();
                    for (int i = 0; i < dtholidays.Rows.Count; i++)
                    {
                        Holidays hol = new Holidays(int.Parse(dtholidays.Rows[i]["SN"].ToString()), DateTime.Parse(dtholidays.Rows[i]["Dates"].ToString()));
                        HolidaysCollection.Instance.AddHoliday(hol);
                    }
                }
                //Products 
                DataTable dtProducts = SchedulerDAL.SchedulerManager.getProducts();
                if (dtProducts.Rows.Count > 0)
                {
                    ProductCollection.Instance.Clear();
                    for (int i = 0; i < dtProducts.Rows.Count; i++)
                    {
                        var prd = new SchedulerDAL.Product(int.Parse(dtProducts.Rows[i]["ID"].ToString()), dtProducts.Rows[i]["Name"].ToString());
                        ProductCollection.Instance.AddProduct(prd);
                    }
                }

                //Gifts SANDGWORK
                DataTable dtGifts = SchedulerManager.getGifts();
                if (dtGifts.Rows.Count > 0)
                {
                    GiftsCollection.Instance.Clear();
                    for (int i = 0; i < dtGifts.Rows.Count; i++)
                    {
                        var prd = new Gift(int.Parse(dtGifts.Rows[i]["ID"].ToString()), dtGifts.Rows[i]["Name"].ToString());
                        GiftsCollection.Instance.AddGift(prd);
                    }

                }



                //Doctor Class
                DataTable dtDoctorClass = SchedulerManager.getAllClasses();
                if (dtDoctorClass.Rows.Count > 0)
                {
                    DoctorClassesCollection.Instance.Clear();
                    for (int i = 0; i < dtDoctorClass.Rows.Count; i++)
                    {
                        SchedulerDAL.DoctorClass doctorClass = new SchedulerDAL.DoctorClass(int.Parse(dtDoctorClass.Rows[i]["ClassId"].ToString()), dtDoctorClass.Rows[i]["ClassName"].ToString(), int.Parse(dtDoctorClass.Rows[i]["ClassFrequency"].ToString()));
                        DoctorClassesCollection.Instance.AddDoctorClass(doctorClass);
                    }

                }

                //string s = HttpContext.Current.Session["ZSMid"].ToString();
                switch (roleID.ToString().ToLower())
                {
                    case "6":
                        HttpContext.Current.Session["MIOid"] = employeeID;
                        Response.Redirect("~/Schedular/MIO.aspx");
                        break;
                    case "5":
                        HttpContext.Current.Session["ZSMid"] = employeeID;
                        Response.Redirect("~/Schedular/ZSM.aspx");
                        break;
                    case "4":
                        HttpContext.Current.Session["RSMid"] = employeeID;
                        Response.Redirect("~/Schedular/RSM.aspx");
                        break;
                    case "3":
                        HttpContext.Current.Session["NSMid"] = employeeID;
                        Response.Redirect("~/Schedular/NSM.aspx");
                        break;
                }
            }
            else
            {
                Response.Redirect("~/Form/Login.aspx");
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using SchedulerDAL;
using System.Text;

namespace PocketDCR2.Schedular
{
    public partial class MIO : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (HttpContext.Current.Session["CurrentUserId"] == null)
                {
                    Response.Redirect("CallPlannerMain.aspx");
                }
                //DataTable dt = SchedulerDAL.SchedulerManager.getActivities();
                //if (dt.Rows.Count > 0)
                //{
                //    ActivitiesCollection.Clear();
                //    for (int i = 0; i < dt.Rows.Count; i++)
                //    {
                //        Activities act = new Activities(int.Parse(dt.Rows[i]["pk_CPA_CallPlannerActivityID"].ToString()), dt.Rows[i]["CPA_Name"].ToString(), dt.Rows[i]["CPA_Description"].ToString(), dt.Rows[i]["CPA_BackgroundColor"].ToString(), dt.Rows[i]["CPA_ForeColor"].ToString(), int.Parse(dt.Rows[i]["CPA_NoOfProducts"].ToString()));
                //        ActivitiesCollection.Instance.AddActivity(act);
                //        loadevents(Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]));
                //        SchedulerManager.loadmonthlyevents(Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]));
                //    }
                //}

                if (ActivitiesCollection.Instance.ActivitiesList.Count > 0)
                {
                    SchedulerManager.loadmonthlyevents(Convert.ToInt32(HttpContext.Current.Session["CurrentUserId"]));
                }
            }
        }

        //public void loadevents(int employeeid)
        //{
        //    EventCollection.Clear();
        //    DataTable lsDT = SchedulerManager.getEvents(employeeid);
        //    for (int i = 0; i < lsDT.Rows.Count; i++)
        //    {
        //        Events e = new Events(int.Parse(lsDT.Rows[i]["plannerID"].ToString()), lsDT.Rows[i]["ActName"].ToString(), DateTime.Parse(lsDT.Rows[i]["startdate"].ToString()), DateTime.Parse(lsDT.Rows[i]["enddate"].ToString()));
        //        EventCollection.Instance.AddEvent(e);
        //    }
        //}
    }
}
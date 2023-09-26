using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SchedulerDAL;
using System.Data;
using System.Data.SqlClient;

namespace PocketDCR2.Schedular
{
    public partial class ZSM : System.Web.UI.Page
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
                //        //loadevents(Utility.employeeID);
                //        //SchedulerManager.loadmonthlyevents(Utility.employeeID);
                //    }
                //}
                loadZSMevents(int.Parse(HttpContext.Current.Session["ZSMid"].ToString()));
            }
        }
        public void loadZSMevents(int employeeid)
        {
            ZSMEventsCollection.Instance.Clear();
            DataTable lsDT = SchedulerManager.getZSMEvents(int.Parse(HttpContext.Current.Session["ZSMid"].ToString()));
            for (int i = 0; i < lsDT.Rows.Count; i++)
            {
                ZSMEvents e = new ZSMEvents(int.Parse(lsDT.Rows[i]["zsmid"].ToString()), int.Parse(lsDT.Rows[i]["empid"].ToString()), int.Parse(lsDT.Rows[i]["monthid"].ToString()), int.Parse(lsDT.Rows[i]["mioid"].ToString()), bool.Parse(lsDT.Rows[i]["iseditable"].ToString()), lsDT.Rows[i]["status"].ToString(), lsDT.Rows[i]["statusreason"].ToString(), lsDT.Rows[i]["description"].ToString(), bool.Parse(lsDT.Rows[i]["informed"].ToString()), DateTime.Parse(lsDT.Rows[i]["startdate"].ToString()), DateTime.Parse(lsDT.Rows[i]["enddate"].ToString()));
                ZSMEventsCollection.Instance.AddEvent(e);
            }

        }
    }
}
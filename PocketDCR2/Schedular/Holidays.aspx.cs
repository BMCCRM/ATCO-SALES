using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using SchedulerDAL;

namespace PocketDCR2.Schedular
{
    public partial class HolidaysForm : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (!IsPostBack)
            {
                BindGrid(false);
            }
        }

        protected void BindGrid(bool updateHolidayCollection)
        {
            DataTable dtholidays = SchedulerManager.getHolidays();
            gvHolidays.DataSource = dtholidays;
            gvHolidays.DataBind();

            if (updateHolidayCollection)
            {
                if (dtholidays.Rows.Count > 0)
                {
                    HolidaysCollection.Instance.Clear();
                    for (int i = 0; i < dtholidays.Rows.Count; i++)
                    {
                        Holidays hol = new Holidays(int.Parse(dtholidays.Rows[i]["SN"].ToString()), DateTime.Parse(dtholidays.Rows[i]["Dates"].ToString()));
                        HolidaysCollection.Instance.AddHoliday(hol);
                    }
                }
            }
        }

        protected void btnReset_Click(object sender, EventArgs e)
        {
            ClearFields();
        }
        protected void ClearFields()
        {
            txtFrom.Text = "";
            txtTo.Text = "";
            txtDescription.Text = "";
            btnSubmit.Text = "Add";
        }
        protected void gvHolidays_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            if (e.CommandName == "d")
            {

                int id = int.Parse(e.CommandArgument.ToString());
                int r = SchedulerManager.deleteCallPlannerHoliday(id);
                if (r != 0)
                {
                    BindGrid(true);
                }
            }

            if (e.CommandName == "e")
            {

                int id = int.Parse(e.CommandArgument.ToString());
                DataTable dt = SchedulerManager.getHolidaysbyid(id);
                if (dt.Rows.Count > 0)
                {
                    txtFrom.Text = dt.Rows[0]["CPH_DateFrom"].ToString();
                    txtTo.Text = dt.Rows[0]["CPH_DateTo"].ToString();
                    txtDescription.Text = dt.Rows[0]["CPH_Description"].ToString();
                    Session["holidayid"] = dt.Rows[0]["pk_CPH_CallPlannerHolidayID"].ToString();
                    btnSubmit.Text = "Update";
                }
            }
        }
        protected void gvHolidays_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            BindGrid(true);
        }

        protected void gvHolidays_RowEditing(object sender, GridViewEditEventArgs e)
        {

        }
        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            DateTime unidate = DateTime.Now.ToUniversalTime().AddHours(5);
            DateTime datefrom = DateTime.Parse(txtFrom.Text + " 00:00:00 AM");
            DateTime dateto = DateTime.Parse(txtTo.Text + " 00:00:00 AM");
            if (btnSubmit.Text == "Add")
            {
                int id = SchedulerManager.insertCallPlannerHolidays(datefrom, dateto, txtDescription.Text);
                if (id > 0)
                {
                    ClearFields();
                    BindGrid(true);
                }
            }

            else if (btnSubmit.Text == "Update")
            {
                int id = SchedulerManager.updateCallPlannerHolidays(int.Parse(Session["holidayid"].ToString()), datefrom, dateto, txtDescription.Text);
                if (id > 0)
                {
                    ClearFields();
                    BindGrid(true);
                }
            }
        }
    }
}
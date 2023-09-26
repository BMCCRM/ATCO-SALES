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
    public partial class ActivitiesForm : System.Web.UI.Page
    {
        string _currentUserroll = "";
          
        protected void Page_Load(object sender, EventArgs e)
        {
            
            if (!IsPostBack)
            {
                BindGrid(false);
            }
        }

        protected void BindGrid(bool updateActivitesCollection)
        {
            DataTable dtActivities = SchedulerManager.getActivities();
            gvActivities.DataSource = dtActivities;
            gvActivities.DataBind();

            if (updateActivitesCollection)
            {
                if (dtActivities.Rows.Count > 0)
                {
                    ActivitiesCollection.Instance.Clear();
                    for (int i = 0; i < dtActivities.Rows.Count; i++)
                    {
                        Activities act = new Activities(int.Parse(dtActivities.Rows[i]["pk_CPA_CallPlannerActivityID"].ToString()), dtActivities.Rows[i]["CPA_Name"].ToString(), dtActivities.Rows[i]["CPA_Description"].ToString(), dtActivities.Rows[i]["CPA_BackgroundColor"].ToString(), dtActivities.Rows[i]["CPA_ForeColor"].ToString(), int.Parse(dtActivities.Rows[i]["CPA_NoOfProducts"].ToString()), int.Parse(dtActivities.Rows[i]["CPA_NoOfReminders"].ToString()), int.Parse(dtActivities.Rows[i]["CPA_NoOfSample"].ToString()), int.Parse(dtActivities.Rows[i]["CPA_NoOfGift"].ToString()));
                        ActivitiesCollection.Instance.AddActivity(act);
                    }
                }
            }


        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {

            if (_currentUserroll == "headoffice" || _currentUserroll == "marketingteam" || _currentUserroll == "")
            {
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('You Have Not Allowed')", true);
            }
            else
            {
                DateTime unidate = DateTime.Now.ToUniversalTime().AddHours(5);
                string bcolor = txtBcolor.Text.Replace("#", "");
                string fcolor = txtFcolor.Text.Replace("#", "");
                // if (!IsDigitsOnly(bcolor))
                {
                    bcolor = "#" + bcolor;
                }
                // if (!IsDigitsOnly(fcolor))
                {
                    fcolor = "#" + fcolor;
                }
                if (btnSubmit.Text == "Add")
                {
                    int id = SchedulerManager.insertCallPlannerActivity(txtName.Text, txtDescription.Text, unidate,
                                                                        unidate, bcolor, fcolor,
                                                                        int.Parse(txtNoOfProducts.Text),
                                                                        int.Parse(txtNoOfReminders.Text),
                                                                        int.Parse(txtNoOfSamples.Text),
                                                                        int.Parse(txtNoOfGifts.Text));
                    if (id > 0)
                    {
                        ClearFields();
                        BindGrid(true);
                    }
                }

                else if (btnSubmit.Text == "Update")
                {
                    int id = SchedulerManager.updateCallPlannerActivity(int.Parse(Session["activityid"].ToString()),
                                                                        txtName.Text, txtDescription.Text, unidate,
                                                                        bcolor, fcolor, int.Parse(txtNoOfProducts.Text),
                                                                        int.Parse(txtNoOfReminders.Text),
                                                                        int.Parse(txtNoOfSamples.Text),
                                                                        int.Parse(txtNoOfGifts.Text));
                    if (id > 0)
                    {
                        ClearFields();
                        BindGrid(true);
                    }
                }

            }
        }

        bool IsDigitsOnly(string str)
        {
            foreach (char c in str)
            {
                if (c >= '0' && c <= '9')
                    return false;
            }

            return true;
        }


        protected void ClearFields()
        {
            txtFcolor.Text = "";
            txtBcolor.Text = "";
            txtDescription.Text = "";
            txtName.Text = "";
            txtNoOfProducts.Text = "";
            txtNoOfReminders.Text = "";
            txtNoOfSamples.Text = "";
            txtNoOfGifts.Text = "";
            btnSubmit.Text = "Add";
        }
        protected void gvActivities_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            if (_currentUserroll == "headoffice" || _currentUserroll == "marketingteam" || _currentUserroll == "")
            {
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('You Have Not Allowed')", true);
            }
            else
            {

            if (e.CommandName == "d")
            {

                int id = int.Parse(e.CommandArgument.ToString());
                int r = SchedulerManager.deleteCallPlannerActivity(id);
                if (r != 0)
                {
                    BindGrid(true);
                }
            }

            if (e.CommandName == "e")
            {

                int id = int.Parse(e.CommandArgument.ToString());
                DataTable dt = SchedulerManager.getActivitiesbyid(id);
                if (dt.Rows.Count > 0)
                {
                    txtName.Text = dt.Rows[0]["CPA_Name"].ToString();
                    txtFcolor.Text = dt.Rows[0]["CPA_ForeColor"].ToString();
                    txtBcolor.Text = dt.Rows[0]["CPA_BackgroundColor"].ToString();
                    txtDescription.Text = dt.Rows[0]["CPA_Description"].ToString();
                    txtNoOfProducts.Text = dt.Rows[0]["CPA_NoOfProducts"].ToString();
                    txtNoOfReminders.Text = dt.Rows[0]["CPA_NoOfReminders"].ToString();
                    txtNoOfSamples.Text = dt.Rows[0]["CPA_NoOfSample"].ToString();
                    txtNoOfGifts.Text = dt.Rows[0]["CPA_NoOfGift"].ToString();
                    Session["activityid"] = dt.Rows[0]["pk_CPA_CallPlannerActivityID"].ToString();
                    btnSubmit.Text = "Update";
                }
            }
        }
    }
        protected void gvActivities_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            BindGrid(true);
        }
        protected void btnReset_Click(object sender, EventArgs e)
        {
            ClearFields();
        }
        protected void gvActivities_RowEditing(object sender, GridViewEditEventArgs e)
        {

        }
    }
}
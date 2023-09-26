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
    public partial class ProductsWithSpeciality : System.Web.UI.Page
    {
        string _currentUserroll = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                bindProductsAndReminders();
                bindSpeciality();
                bindGrid();
            }
        }
        private void bindGrid()
        {
            gvSpeciality.DataSource = SchedulerManager.getDistinctProductsWithSpecialities();
            gvSpeciality.DataBind();
        }
        private void bindProductsAndReminders()
        {
            ddlProduct1.Items.Clear();
            ddlProduct2.Items.Clear();
            ddlProduct3.Items.Clear();
            ddlProduct4.Items.Clear();

            ddlReminder1.Items.Clear();
            ddlReminder2.Items.Clear();
            ddlReminder3.Items.Clear();
            ddlReminder4.Items.Clear();

            ListItem li = null;
            DataTable products = SchedulerManager.getProducts();
            foreach (DataRow dr in products.Rows)
            {
                li = new ListItem(dr["Name"].ToString(), dr["ID"].ToString());

                ddlProduct1.Items.Add(li);
                ddlProduct2.Items.Add(li);
                ddlProduct3.Items.Add(li);
                ddlProduct4.Items.Add(li);

                ddlReminder1.Items.Add(li);
                ddlReminder2.Items.Add(li);
                ddlReminder3.Items.Add(li);
                ddlReminder4.Items.Add(li);
            }

            li = new ListItem("Select", "-1");
            ddlProduct1.Items.Insert(0, li);
            ddlProduct2.Items.Insert(0, li);
            ddlProduct3.Items.Insert(0, li);
            ddlProduct4.Items.Insert(0, li);

            ddlReminder1.Items.Insert(0, li);
            ddlReminder2.Items.Insert(0, li);
            ddlReminder3.Items.Insert(0, li);
            ddlReminder4.Items.Insert(0, li);
        }
        private void bindSpeciality()
        {
            ddlSpecialityName.Items.Clear();

            ddlSpecialityName.DataSource = SchedulerManager.getSpecialities();
            ddlSpecialityName.DataTextField = "SpecialiityName";
            ddlSpecialityName.DataValueField = "SpecialityId";
            ddlSpecialityName.DataBind();

            ListItem li = new ListItem("Select", "-1");
            ddlSpecialityName.Items.Insert(0, li);
        }

        protected void gvSpeciality_RowCommand(object sender, GridViewCommandEventArgs e)
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
                int r = SchedulerManager.DeleteProductsWithSpecialitiesBySpecialityID(id);
                if (r != 0)
                {
                    bindGrid();
                    ClearFields();
                }
            }

            if (e.CommandName == "e")
            {
                ClearFields();
                int id = int.Parse(e.CommandArgument.ToString());
                DataTable dt = SchedulerManager.getProductsWithSpecialitiesBySpecialityID(id);
                if (dt.Rows.Count > 0)
                {
                    ddlSpecialityName.SelectedValue = id.ToString();
                    Session["specialityID"] = id.ToString();

                    int productCount = 1;
                    int reminderCount = 1;
                    foreach (DataRow dr in dt.Rows)
                    {
                        if (dr["CPS_TYPE"].ToString() == "P")
                        {
                            if (productCount == 1)
                                ddlProduct1.SelectedValue = dr["fk_CPS_PRO_ProductID"].ToString();
                            else if (productCount == 2)
                                ddlProduct2.SelectedValue = dr["fk_CPS_PRO_ProductID"].ToString();
                            else if (productCount == 3)
                                ddlProduct3.SelectedValue = dr["fk_CPS_PRO_ProductID"].ToString();
                            else if (productCount == 4)
                                ddlProduct4.SelectedValue = dr["fk_CPS_PRO_ProductID"].ToString();

                            productCount++;

                        }
                        else if (dr["CPS_TYPE"].ToString() == "R")
                        {
                            if (reminderCount == 1)
                                ddlReminder1.SelectedValue = dr["fk_CPS_PRO_ProductID"].ToString();
                            else if (reminderCount == 2)
                                ddlReminder2.SelectedValue = dr["fk_CPS_PRO_ProductID"].ToString();
                            else if (reminderCount == 3)
                                ddlReminder3.SelectedValue = dr["fk_CPS_PRO_ProductID"].ToString();
                            else if (reminderCount == 4)
                                ddlReminder4.SelectedValue = dr["fk_CPS_PRO_ProductID"].ToString();

                            reminderCount++;
                        }
                    }

                    btnSubmit.Text = "Update";
                }
            }
        }
    }

        protected void gvSpeciality_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            bindGrid();
        }

        protected void gvSpeciality_RowEditing(object sender, GridViewEditEventArgs e)
        {

        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            if (_currentUserroll == "headoffice" || _currentUserroll == "marketingteam" || _currentUserroll == "")
            {
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('You Have Not Allowed')", true);
            }
            else
            {

            if (btnSubmit.Text == "Add")
            {
                if (ddlSpecialityName.SelectedValue != "-1")
                {
                    DataTable dt =
                        SchedulerManager.getProductsWithSpecialitiesBySpecialityID(
                            Convert.ToInt32(ddlSpecialityName.SelectedValue));
                    if (dt.Rows.Count > 0)
                    {
                        lblerrorSpecialityName.Text = "Speciality is already associated with products";
                        lblerrorSpecialityName.Visible = true;
                    }
                    else
                    {
                        if (ddlProduct1.SelectedValue != "-1")
                            SchedulerManager.InsertProductsWithSpeciality(
                                Convert.ToInt32(ddlSpecialityName.SelectedValue),
                                Convert.ToInt32(ddlProduct1.SelectedValue), "P");

                        if (ddlProduct2.SelectedValue != "-1")
                            SchedulerManager.InsertProductsWithSpeciality(
                                Convert.ToInt32(ddlSpecialityName.SelectedValue),
                                Convert.ToInt32(ddlProduct2.SelectedValue), "P");

                        if (ddlProduct3.SelectedValue != "-1")
                            SchedulerManager.InsertProductsWithSpeciality(
                                Convert.ToInt32(ddlSpecialityName.SelectedValue),
                                Convert.ToInt32(ddlProduct3.SelectedValue), "P");

                        if (ddlProduct4.SelectedValue != "-1")
                            SchedulerManager.InsertProductsWithSpeciality(
                                Convert.ToInt32(ddlSpecialityName.SelectedValue),
                                Convert.ToInt32(ddlProduct4.SelectedValue), "P");

                        if (ddlReminder1.SelectedValue != "-1")
                            SchedulerManager.InsertProductsWithSpeciality(
                                Convert.ToInt32(ddlSpecialityName.SelectedValue),
                                Convert.ToInt32(ddlReminder1.SelectedValue), "R");

                        if (ddlReminder2.SelectedValue != "-1")
                            SchedulerManager.InsertProductsWithSpeciality(
                                Convert.ToInt32(ddlSpecialityName.SelectedValue),
                                Convert.ToInt32(ddlReminder2.SelectedValue), "R");

                        if (ddlReminder3.SelectedValue != "-1")
                            SchedulerManager.InsertProductsWithSpeciality(
                                Convert.ToInt32(ddlSpecialityName.SelectedValue),
                                Convert.ToInt32(ddlReminder3.SelectedValue), "R");

                        if (ddlReminder4.SelectedValue != "-1")
                            SchedulerManager.InsertProductsWithSpeciality(
                                Convert.ToInt32(ddlSpecialityName.SelectedValue),
                                Convert.ToInt32(ddlReminder4.SelectedValue), "R");

                        ClearFields();
                        bindGrid();
                    }
                }
                else
                {
                    lblerrorSpecialityName.Text = "Please select speciality";
                    lblerrorSpecialityName.Visible = true;
                }
            }

            else if (btnSubmit.Text == "Update")
            {
                int SpecialityID = Convert.ToInt32(Session["specialityID"].ToString());
                int r = SchedulerManager.DeleteProductsWithSpecialitiesBySpecialityID(SpecialityID);
                if (r != 0)
                {
                    if (ddlProduct1.SelectedValue != "-1")
                        SchedulerManager.InsertProductsWithSpeciality(Convert.ToInt32(ddlSpecialityName.SelectedValue),
                                                                      Convert.ToInt32(ddlProduct1.SelectedValue), "P");

                    if (ddlProduct2.SelectedValue != "-1")
                        SchedulerManager.InsertProductsWithSpeciality(Convert.ToInt32(ddlSpecialityName.SelectedValue),
                                                                      Convert.ToInt32(ddlProduct2.SelectedValue), "P");

                    if (ddlProduct3.SelectedValue != "-1")
                        SchedulerManager.InsertProductsWithSpeciality(Convert.ToInt32(ddlSpecialityName.SelectedValue),
                                                                      Convert.ToInt32(ddlProduct3.SelectedValue), "P");

                    if (ddlProduct4.SelectedValue != "-1")
                        SchedulerManager.InsertProductsWithSpeciality(Convert.ToInt32(ddlSpecialityName.SelectedValue),
                                                                      Convert.ToInt32(ddlProduct4.SelectedValue), "P");

                    if (ddlReminder1.SelectedValue != "-1")
                        SchedulerManager.InsertProductsWithSpeciality(Convert.ToInt32(ddlSpecialityName.SelectedValue),
                                                                      Convert.ToInt32(ddlReminder1.SelectedValue), "R");

                    if (ddlReminder2.SelectedValue != "-1")
                        SchedulerManager.InsertProductsWithSpeciality(Convert.ToInt32(ddlSpecialityName.SelectedValue),
                                                                      Convert.ToInt32(ddlReminder2.SelectedValue), "R");

                    if (ddlReminder3.SelectedValue != "-1")
                        SchedulerManager.InsertProductsWithSpeciality(Convert.ToInt32(ddlSpecialityName.SelectedValue),
                                                                      Convert.ToInt32(ddlReminder3.SelectedValue), "R");

                    if (ddlReminder4.SelectedValue != "-1")
                        SchedulerManager.InsertProductsWithSpeciality(Convert.ToInt32(ddlSpecialityName.SelectedValue),
                                                                      Convert.ToInt32(ddlReminder4.SelectedValue), "R");

                    ClearFields();
                    bindGrid();
                }
            }
        }
    }
        protected void ClearFields()
        {
            ddlSpecialityName.SelectedValue = "-1";
            
            ddlProduct1.SelectedValue = "-1";
            ddlProduct2.SelectedValue = "-1";
            ddlProduct3.SelectedValue = "-1";
            ddlProduct4.SelectedValue = "-1";

            ddlReminder1.SelectedValue = "-1";
            ddlReminder2.SelectedValue = "-1";
            ddlReminder3.SelectedValue = "-1";
            ddlReminder4.SelectedValue = "-1";
                        
            btnSubmit.Text = "Add";
            lblerrorSpecialityName.Visible = false;
        }

        protected void btnReset_Click(object sender, EventArgs e)
        {
            ClearFields();
        }
    }
}
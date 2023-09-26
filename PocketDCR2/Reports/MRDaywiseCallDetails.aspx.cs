using System;
using System.Data;
using System.Collections;
using System.Data.SqlClient;
using ChartDirector;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace PocketDCR2.Reports
{
    public partial class MRDaywiseCallDetails : System.Web.UI.Page
    {
        private string Month = DateTime.Today.Month.ToString();
        
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                GelAllZones();
                GetDaywiseCalls();
            }
        }
        
        public void RefreshData(string month)
        {
            this.Month = month;
            Session["SelectedMonth"] = Month;
            GetDaywiseCalls();
        }

        private void GetDaywiseCalls()
        {
            string constr = Classes.Constants.GetConnectionString();
            DataTable dt = new DataTable();
            DataTable dtMRs = new DataTable();
            using (SqlConnection con = new SqlConnection(constr))
            {
                string sqlText = @"select	m.EmployeeId AS id,r.LevelId AS regionid,r.LevelName as Zone,dbo.IsDash(m.FirstName) + ' ' 
		                           + dbo.IsDash(m.MiddleName) + ' ' + dbo.IsDash(m.LastName) as Region,datepart(day,v.VisitDateTime) day,count(distinct v.DoctorId) visits
                                   from PreSalesCalls v
                                   inner join Employees m on v.EmployeeId = m.EmployeeId
                                   inner join HierarchyLevel5 r on v.Level5LevelId = r.LevelId
                                   where datepart(month,v.VisitDateTime) = @Month
                                   and datepart(year,v.VisitDateTime) = datepart(year,getdate())
                                   group by m.EmployeeId,r.LevelId,r.LevelName,dbo.IsDash(m.FirstName) + ' ' 
		                           + dbo.IsDash(m.MiddleName) + ' ' + dbo.IsDash(m.LastName), datepart(day,v.VisitDateTime)
                                   order by 3
                                   ".Replace("@Month", Month);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = sqlText;
                cmd.Connection = con;
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
                cmd.CommandText = @"Select EmployeeId id,upper(Zone) as region,upper(EmployeeName) as name FROM 
                                    [v_EmployeeDetailWithHierarchy] order by upper(Zone),upper(EmployeeName)";
                da.Fill(dtMRs);
            }
            //dtIncorrectSMS.PrimaryKey = new DataColumn[] { dtIncorrectSMS.Columns[0] };
            dt.PrimaryKey = new DataColumn[] { dt.Columns["id"], dt.Columns["day"] };
            dtMRs.PrimaryKey = new DataColumn[] { dtMRs.Columns["id"] };
            gvMRDetails.DataSource = dt;

            //gvMRDetails.DataBind();



            DataTable dtCallDetails = new DataTable();
            dtCallDetails.Columns.Add(new DataColumn("REGION"));
            dtCallDetails.Columns.Add(new DataColumn("MIO"));


            int days = DateTime.DaysInMonth(DateTime.Today.Year, Convert.ToInt16(this.Month));
            for (int i = 0; i < days; i++)
            {
                //DataColumn col = new DataColumn();
                dtCallDetails.Columns.Add(new DataColumn((i + 1).ToString()));
            }

            string[] filter = { "", "" };
            string region = "";

            foreach (DataRow dr in dtMRs.Rows)
            {
                DataRow drNewRow = dtCallDetails.NewRow();
                filter.SetValue(dr["id"].ToString(), 0);
                //drNewRow["MIO"] = dr["name"].ToString().ToUpper();

                string name = dr["name"].ToString().ToUpper();

                drNewRow["MIO"] = (name.Contains("(")) ? name.Remove(name.IndexOf("("), name.Length - name.IndexOf("(")).Trim() : name;

                if (region != dr["Region"].ToString())
                {
                    region = dr["Region"].ToString();
                    //drNewRow["Region"] = region;
                    drNewRow["Region"] = (region.Contains("(")) ? region.Remove(region.IndexOf("("), region.Length - region.IndexOf("(")).Trim() : region;
                }

                for (int i = 1; i <= days; i++)
                {
                    filter.SetValue(i.ToString(), 1);
                    DataRow drFiltered = dt.Rows.Find(filter);

                    if (drFiltered != null)
                    {
                        drNewRow[(i).ToString()] = drFiltered["visits"].ToString();
                    }
                    else
                    {
                        drNewRow[(i).ToString()] = "0";
                    }

                }
                dtCallDetails.Rows.Add(drNewRow);
            }
            gvMRDetails.CellSpacing = 1;

            dtCallDetails.Columns.Add(new DataColumn("Total Calls"));
            dtCallDetails.Columns.Add(new DataColumn("Days Worked"));
            dtCallDetails.Columns.Add(new DataColumn("Call Avg"));

            foreach (DataRow dr in dtCallDetails.Rows)
            {
                int days_worked = 0;
                int calls = 0;
                decimal call_avg = 0;
                foreach (DataColumn dc in dtCallDetails.Columns)
                {
                    try
                    {
                        Int32.Parse(dc.ColumnName);
                        calls += Convert.ToInt32(dr[dc.ColumnName]);

                        if (Convert.ToInt32(dr[dc.ColumnName]) != 0)
                            days_worked++;

                    }
                    catch { }
                }
                dr["Total Calls"] = calls.ToString();
                dr["Days Worked"] = days_worked.ToString();

                try
                {
                    call_avg = Math.Round((Convert.ToDecimal(calls) / Convert.ToDecimal(days_worked)), 0); ;
                    dr["Call Avg"] = call_avg.ToString();
                }
                catch
                {
                    dr["Call Avg"] = "0";
                }

            }

            gvMRDetails.DataSource = dtCallDetails;
            gvMRDetails.DataBind();

        }

        protected void gvMRDetails_DataBound(object sender, EventArgs e)
        {
            try
            {
                for (int i = 0; i < gvMRDetails.Columns.Count; i++)
                {
                    gvMRDetails.Columns[i].ItemStyle.Width = 20;
                }
            }
            catch { }
        }

        protected void gvMRDetails_RowDataBound(object sender, System.Web.UI.WebControls.GridViewRowEventArgs e)
        {
            try
            {
                if (e.Row.RowType == System.Web.UI.WebControls.DataControlRowType.DataRow)
                {
                    for (int i = 0; i < e.Row.Cells.Count; i++)
                    {
                        if (i == 0)
                            continue;
                        e.Row.Cells[i].Style.Add("align", "center");
                        if (e.Row.Cells[i].Text == "0")
                        {
                            e.Row.Cells[i].BackColor = System.Drawing.Color.DimGray;
                            e.Row.Cells[i].ForeColor = System.Drawing.Color.White;
                            e.Row.Cells[i].HorizontalAlign = HorizontalAlign.Center;

                        }
                        else
                        {
                            e.Row.Cells[i].BorderStyle = BorderStyle.Solid;
                            e.Row.Cells[i].BorderWidth = 1;
                            e.Row.Cells[i].HorizontalAlign = HorizontalAlign.Center;
                        }
                        if (i == e.Row.Cells.Count - 1)
                        {

                            try
                            {
                                int avg = Convert.ToInt16(e.Row.Cells[i].Text);
                                if (avg < 13)
                                {
                                    e.Row.Cells[i].BackColor = System.Drawing.Color.Red;
                                    e.Row.Cells[i].ForeColor = System.Drawing.Color.White;
                                    e.Row.Cells[i].Font.Bold = true;
                                }
                                else
                                {
                                    e.Row.Cells[i].BackColor = System.Drawing.Color.LightGreen;
                                    e.Row.Cells[i].ForeColor = System.Drawing.Color.White;
                                    e.Row.Cells[i].Font.Bold = true;
                                }

                            }
                            catch { }
                        }
                    }
                }

            }
            catch { }
        }

        private void GelAllZones()
        {
            string constr = Classes.Constants.GetConnectionString();
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(constr))
            {
                string sqlText = "SELECT [LevelId],[LevelName] FROM [HierarchyLevel5] Where IsActive = 1 AND [LevelName] not like '%SANDOZ%'";
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = sqlText;
                cmd.Connection = con;
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }

            ddlZone.DataTextField = "LevelName";
            ddlZone.DataValueField = "LevelId";
            ddlZone.DataSource = dt;
            ddlZone.DataBind();
            ddlZone.Items.Insert(0, new System.Web.UI.WebControls.ListItem("-- ALL --", "0"));
        }

        protected void gvMRDetails_RowCreated(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == System.Web.UI.WebControls.DataControlRowType.DataRow)
                foreach (TableCell cell in e.Row.Cells)
                {
                    cell.HorizontalAlign = HorizontalAlign.Center;
                }
        }

        protected void ddlZone_SelectedIndexChanged1(object sender, EventArgs e)
        {
            try
            {
                //Month = Session["SelectedMonth"].ToString();
                Month = DateTime.Today.Month.ToString();
                string constr = Classes.Constants.GetConnectionString();
                DataTable dt = new DataTable();
                DataTable dtMRs = new DataTable();
                using (SqlConnection con = new SqlConnection(constr))
                {
                    string sqlText = @"select m.EmployeeId AS id,r.LevelId AS regionid,r.LevelName as Zone,dbo.IsDash(m.FirstName) + ' ' 
		                           + dbo.IsDash(m.MiddleName) + ' ' + dbo.IsDash(m.LastName) as Region,datepart(day,v.VisitDateTime) day,count(distinct v.DoctorId) visits
                                   from PreSalesCalls v
                                   inner join Employees m on v.EmployeeId = m.EmployeeId
                                   inner join HierarchyLevel5 r on v.Level5LevelId = r.LevelId
                                   where datepart(month,v.VisitDateTime) = @Month
                                   and datepart(year,v.VisitDateTime) = datepart(year,getdate())
                                   group by m.EmployeeId,r.LevelId,r.LevelName,dbo.IsDash(m.FirstName) + ' ' 
		                           + dbo.IsDash(m.MiddleName) + ' ' + dbo.IsDash(m.LastName), datepart(day,v.VisitDateTime)
                                   order by 3
                                    ".Replace("@Month", Month);
                    SqlCommand cmd = new SqlCommand();
                    cmd.CommandText = sqlText;
                    cmd.Connection = con;
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);
                    sqlText = @"Select EmployeeId id,upper(Zone) as region,upper(EmployeeName) as name FROM  
                                [v_EmployeeDetailWithHierarchy] WHERE ";
                    if (ddlZone.SelectedValue != "0")
                        sqlText += "Zone = '" + ddlZone.SelectedItem.Text;
                    sqlText += "' order by upper(Zone),upper(EmployeeName)";
                    cmd.CommandText = sqlText;

                    da.Fill(dtMRs);
                }
                //dtIncorrectSMS.PrimaryKey = new DataColumn[] { dtIncorrectSMS.Columns[0] };
                dt.PrimaryKey = new DataColumn[] { dt.Columns["id"], dt.Columns["day"] };
                dtMRs.PrimaryKey = new DataColumn[] { dtMRs.Columns["id"] };
                gvMRDetails.DataSource = dt;
                //gvMRDetails.DataBind();

                DataView dv = null;
                if (ddlZone.SelectedValue != "0")
                    dv = new DataView(dt, "RegionID = " + ddlZone.SelectedValue, "Region", DataViewRowState.CurrentRows);

                DataTable dtCallDetails = new DataTable();
                dtCallDetails.Columns.Add(new DataColumn("Region"));
                dtCallDetails.Columns.Add(new DataColumn("MIO"));

                int days = DateTime.DaysInMonth(DateTime.Today.Year, Convert.ToInt16(this.Month));
                for (int i = 0; i < days; i++)
                {
                    //DataColumn col = new DataColumn();
                    dtCallDetails.Columns.Add(new DataColumn((i + 1).ToString()));
                }

                string[] filter = { "", "" };
                string region = "";

                foreach (DataRow dr in dtMRs.Rows)
                {


                    DataRow drNewRow = dtCallDetails.NewRow();
                    filter.SetValue(dr["id"].ToString(), 0);
                    string name = dr["name"].ToString().ToUpper();

                    drNewRow["MIO"] = (name.Contains("(")) ? name.Remove(name.IndexOf("("), name.Length - name.IndexOf("(")).Trim() : name;

                    if (region != dr["Region"].ToString())
                    {
                        region = dr["Region"].ToString();
                        //drNewRow["Region"] = region;
                        drNewRow["Region"] = (region.Contains("(")) ? region.Remove(region.IndexOf("("), region.Length - region.IndexOf("(")).Trim() : region;
                    }

                    for (int i = 1; i <= days; i++)
                    {
                        filter.SetValue(i.ToString(), 1);
                        DataRow drFiltered = dt.Rows.Find(filter);

                        if (drFiltered != null)
                        {
                            drNewRow[(i).ToString()] = drFiltered["visits"].ToString();
                        }
                        else
                        {
                            drNewRow[(i).ToString()] = "0";
                        }

                    }
                    dtCallDetails.Rows.Add(drNewRow);
                }
                gvMRDetails.CellSpacing = 1;

                dtCallDetails.Columns.Add(new DataColumn("Total Calls"));
                dtCallDetails.Columns.Add(new DataColumn("Days Worked"));
                dtCallDetails.Columns.Add(new DataColumn("Call Avg"));


                foreach (DataRow dr in dtCallDetails.Rows)
                {
                    int days_worked = 0;
                    int calls = 0;
                    decimal call_avg = 0;

                    foreach (DataColumn dc in dtCallDetails.Columns)
                    {
                        try
                        {
                            Int32.Parse(dc.ColumnName);
                            calls += Convert.ToInt32(dr[dc.ColumnName]);

                            if (Convert.ToInt32(dr[dc.ColumnName]) != 0)
                                days_worked++;

                        }
                        catch { }
                    }

                    dr["Total Calls"] = calls.ToString();
                    dr["Days Worked"] = days_worked.ToString();

                    try
                    {
                        call_avg = Math.Round((Convert.ToDecimal(calls) / Convert.ToDecimal(days_worked)), 0); ;
                        dr["Call Avg"] = call_avg.ToString();
                    }
                    catch
                    {
                        dr["Call Avg"] = "0";
                    }
                }

                gvMRDetails.DataSource = dtCallDetails;
                gvMRDetails.DataBind();
            }
            catch (Exception ex) 
            {
                string msg = ex.Message;
            }
        }
    }
}
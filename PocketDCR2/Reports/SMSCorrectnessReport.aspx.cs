using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

namespace PocketDCR2.Reports
{
    public partial class SMSCorrectnessReport : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            GetData();
        }

        private void GetData()
        {
            string day = Request.QueryString["Day"];
            string DataSetType = Request.QueryString["DataSetType"];
            string Value = Request.QueryString["Value"];
            string zone = Request.QueryString["Zone"];
            string MR = Convert.ToString(Request.QueryString["MR"]);
            string Month = Convert.ToDateTime(Request.QueryString["Month"]).Month.ToString();

            string level3id = "", level4id = "", level5id = "", level6id = "", Employeeid = "";
            string roleType = Convert.ToString(Session["CurrentUserRole"]);
            if (roleType == "rl6")
            {
                level3id = Request.QueryString["Level3"].ToString();
                level4id = Request.QueryString["Level4"].ToString();
                level5id = Request.QueryString["Level5"].ToString();
                level6id = Request.QueryString["Level6"].ToString();
                Employeeid = Request.QueryString["employeeid"].ToString();
            }
            else
            {
                level3id = Request.QueryString["Level3"].ToString();
                level4id = Request.QueryString["Level4"].ToString();
                level5id = Request.QueryString["Level5"].ToString();
                level6id = Request.QueryString["Level6"].ToString();
                Employeeid = "0";
            }

            //Response.Write("You have selected Day: " + day + " Dataset: " + DataSetType + " Value:" + Value + " Zone :" + zone + " MR: " + MR);
            string sql = "";

            if (DataSetType == "Correct SMS")
            {
                #region OldWork
                //                sql = @"select upper(m.name) MR,VisitDate,r.SMSRcvAt as SMSDateTime,SMS_Text
                //                                from reportlog r 
                //                                inner join vw_CH_MRs m on r.MobileNo = m.MobileNumber
                //                                inner join Regions rg on m.regionID = rg.ID
                //                                where m.istestuser is null and m.isactive =1 
                //                                and datepart(day,r.SMSRcvAt) = @Day
                //                                and datepart(month,r.SMSRcvAt) = @Month
                //                                and datepart(year,r.SMSRcvAt) = datepart(year,getdate())
                //                                order by 1".Replace("@MRID", MR).Replace("@Day", day).Replace("@Month", Month);
                #endregion
                lbltype.Text = "Correct SMS";
                sql = @"SELECT      UPPER(dbo.IsDash(e.FirstName)) + ' ' + UPPER(dbo.IsDash(e.MiddleName)) + ' ' + 
                                    UPPER(dbo.IsDash(e.LastName)) AS MR, hl5.LevelName AS Zone, sib.CreatedDate AS VisitDate, 
                                    sib.InsertedDate AS SMSDateTime, sib.MessageText AS SMS_Text
                                    FROM  EmployeeMembership em
                                    INNER JOIN  Employees e ON em.EmployeeId = e.EmployeeId
                                    INNER JOIN  EmplyeeHierarchy eh ON em.SystemUserID = eh.SystemUserID
                                    INNER JOIN  HierarchyLevel5 hl5 ON eh.LevelId5 = hl5.LevelId
                                    CROSS JOIN  SMSInbound sib
                                    WHERE e.MobileNumber = sib.MobileNumber 
			                        AND sib.MessageType LIKE 'SUCC%'
			                        AND datepart(day,sib.CreatedDate) = @Day
			                        AND datepart(month,sib.CreatedDate) = @Month
                                    AND datepart(year,sib.CreatedDate) = datepart(year,getdate())
                                    AND eh.LevelId3 = CASE WHEN @Level3ID IS NOT NULL AND @Level3ID <> 0 THEN @Level3ID ELSE eh.LevelId3 END
                                    AND eh.LevelId4 = CASE WHEN @Level4ID IS NOT NULL AND @Level4ID <> 0 THEN @Level4ID ELSE eh.LevelId4 END
                                    AND eh.LevelId5 = CASE WHEN @Level5ID IS NOT NULL AND @Level5ID <> 0 THEN @Level5ID ELSE eh.LevelId5 END
                                    AND eh.LevelId6 = CASE WHEN @Level6ID IS NOT NULL AND @Level6ID <> 0 THEN @Level6ID ELSE eh.LevelId6 END
                                    AND e.EmployeeId = CASE WHEN @Employeeid IS NOT NULL AND @Employeeid <> 0 THEN @Employeeid ELSE e.EmployeeId END 
                                    ORDER BY hl5.LevelName, e.FirstName".Replace("@Day", day).Replace("@Month", Month).Replace("@Level3ID", level3id).Replace("@Level4ID", level4id).Replace("@Level5ID", level5id).Replace("@Level6ID", level6id).Replace("@Employeeid", Employeeid);

            }
            else if (DataSetType == "Incorrect SMS")
            {
                #region OLD Work

                //                //                sql = @"select upper(m.name) as MR, Inserted_On as SMSDateTime,Error_SMS, SMS_Text as [System Response]
                ////                                from push_sms p
                ////                                inner join vw_CH_MRs m on p.Mobile_Number = m.MobileNumber
                ////                                inner join Regions rg on m.regionID = rg.ID
                ////                                where m.istestuser is null and m.isactive =1 
                ////                                and datepart(day,p.Inserted_On) = @Day
                ////                                and datepart(month,p.Inserted_On) = @Month
                ////                                and datepart(year,p.Inserted_On) = datepart(year,getdate())
                //                //                                order by 1".Replace("@Day", day).Replace("@Month", Month);

                //                .Replace("@MRID", MR != "" ? MR : "e.EmployeeId");
                #endregion
                lbltype.Text = "Incorrect SMS";
                sql = @"    SELECT UPPER(dbo.IsDash(e.FirstName)) + ' ' + UPPER(dbo.IsDash(e.MiddleName)) + ' ' + 
                            UPPER(dbo.IsDash(e.LastName)) AS MR, hl5.LevelName AS Zone, sib.CreatedDate AS VisitDate, 
                            sib.InsertedDate AS SMSDateTime, sib.MessageText AS SMS_Text
                            FROM EmployeeMembership em
                            INNER JOIN  Employees e ON em.EmployeeId = e.EmployeeId
                            INNER JOIN  EmplyeeHierarchy eh ON em.SystemUserID = eh.SystemUserID
                            INNER JOIN  HierarchyLevel5 hl5 ON eh.LevelId5 = hl5.LevelId
                            CROSS JOIN  SMSInbound sib
                            WHERE e.MobileNumber = sib.MobileNumber 
                            AND sib.MessageType LIKE 'ER%'
                            AND datepart(day,sib.CreatedDate) = @Day
                            AND datepart(month,sib.CreatedDate) = @Month
                            AND datepart(year,sib.CreatedDate) = datepart(year,getdate())
                            AND eh.LevelId3 = CASE WHEN @Level3ID IS NOT NULL AND @Level3ID <> 0 THEN @Level3ID ELSE eh.LevelId3 END
                            AND eh.LevelId4 = CASE WHEN @Level4ID IS NOT NULL AND @Level4ID <> 0 THEN @Level4ID ELSE eh.LevelId4 END
                            AND eh.LevelId5 = CASE WHEN @Level5ID IS NOT NULL AND @Level5ID <> 0 THEN @Level5ID ELSE eh.LevelId5 END
                            AND eh.LevelId6 = CASE WHEN @Level6ID IS NOT NULL AND @Level6ID <> 0 THEN @Level6ID ELSE eh.LevelId6 END
                            AND e.EmployeeId = CASE WHEN @Employeeid IS NOT NULL AND @Employeeid <> 0 THEN @Employeeid ELSE e.EmployeeId END  
                            ORDER BY hl5.LevelName, e.FirstName".Replace("@Day", day).Replace("@Month", Month).Replace("@Level3ID", level3id).Replace("@Level4ID", level4id).Replace("@Level5ID", level5id).Replace("@Level6ID", level6id).Replace("@Employeeid", Employeeid); ;

            }

            string constr = Classes.Constants.GetConnectionString();
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(constr))
            {
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = sql;
                cmd.Connection = con;
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            gvCalls.DataSource = dt;
            gvCalls.DataBind();
        }

        private void GelAllZones()
        {
            string constr = Classes.Constants.GetConnectionString();
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(constr))
            {
                string sqlText = "select ID,Name as Region from regions where r.name not like ('%SANDOZ%')";
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = sqlText;
                cmd.Connection = con;
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }

            ddlZone.DataTextField = "Region";
            ddlZone.DataValueField = "ID";
            ddlZone.DataSource = dt;
            ddlZone.DataBind();
            ddlZone.Items.Insert(0, new System.Web.UI.WebControls.ListItem("-- ALL --", "0"));
        }



    }
}
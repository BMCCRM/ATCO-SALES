using DatabaseLayer.SQL;
using Obout.Grid;
using PocketDCR.CustomMembershipProvider;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PocketDCR2.Form
{
    public partial class PDFUploaderNew : System.Web.UI.Page
    {
        #region Private Members

        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;

        NameValueCollection nv = new NameValueCollection();
        DAL dl = new DAL();

        #endregion
        string constr = ConfigurationManager.ConnectionStrings["PocketDCRConnectionString"].ConnectionString;
        protected void Page_Load(object sender, EventArgs e)
        {

            if (IsValidUser())
            {
                if (!IsPostBack)
                {
                   // hdnMode.Value = "AddMode";
                    //loadData();
                    //using (SqlConnection con = new SqlConnection(constr))
                    //{
                    //    using (SqlCommand cmd = new SqlCommand())
                    //    {
                    //        cmd.CommandType = CommandType.StoredProcedure;
                    //        cmd.Parameters.AddWithValue("@LevelId", DBNull.Value);
                    //        cmd.Parameters.AddWithValue("@LevelName", DBNull.Value);
                    //        cmd.CommandText = "sp_HierarchyLevels3Select";
                    //        cmd.Connection = con;
                    //        con.Open();
                    //        ddlTeam.DataSource = cmd.ExecuteReader();
                    //        ddlTeam.DataTextField = "LevelName";
                    //        ddlTeam.DataValueField = "LevelId";
                    //        ddlTeam.DataBind();
                    //        con.Close();
                    //    }
                    //}
                    //ddlTeam.Items.Insert(0, new ListItem("--Select Team--", "-1"));

                }
                //else
                //{
                //    loadData();
                //}
            }
            else
            {
                Response.Redirect("Login.aspx");
            }

        }


        //protected void Button1_Click(object sender, EventArgs e)
        //{

        //    if (ddlTeam.SelectedValue.ToString() == "-1")
        //    {
        //        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "Alert", "alert('Please select Team!')", true);
        //        return;
        //    }
        //    if (FileName.Text == null || FileName.Text == "")
        //    {
        //        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "Alert", "alert('Please enter filename!')", true);
        //        return;
        //    }
        //    if (hdnMode.Value == "AddMode")
        //    {


        //        if (Uploadfile.HasFile)
        //        {
        //            int ProductId = Int32.Parse((productID.Value.ToString()).ToString());
        //            string fileName = Path.GetFileName(Uploadfile.PostedFile.FileName);
        //            string extension = Path.GetExtension(Uploadfile.PostedFile.FileName);
        //            string filepath = Uploadfile.PostedFile.FileName.Split('.')[1];
        //            string filepathwithname = Uploadfile.PostedFile.FileName.Split('.')[0];

        //            string DateforPath = DateTime.Parse(txtStartDate.Text).Date.Day + "_" + DateTime.Parse(txtStartDate.Text).Date.Month + "_" + DateTime.Parse(txtStartDate.Text).Date.Year;

        //            if (fileName != "")
        //            {
        //                if (!filepath.Contains("pdf"))
        //                {
        //                    ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "Alert", "alert('Invalid file selected, Only Pdf file Allowed!')", true);
        //                    return;
        //                }
        //                //fileName = DateTime.Now.ToString("dd-MMM-yyyy hh@mm")+".pdf";
        //                fileName = ProductId + "_" + filepathwithname + "_" + DateforPath + ".pdf";
        //                Uploadfile.PostedFile.SaveAs(Server.MapPath("~/Uploads/E-Detailing/") + fileName);
        //                PdfReader pdfReader = new PdfReader(Server.MapPath("~/Uploads/E-Detailing/") + fileName);
        //                int numberOfPages = pdfReader.NumberOfPages;

        //                using (SqlConnection con = new SqlConnection(constr))
        //                {
        //                    using (SqlCommand cmd = new SqlCommand())
        //                    {
        //                        cmd.CommandType = CommandType.StoredProcedure;
        //                        cmd.Parameters.AddWithValue("@Level3Id", Convert.ToInt32(ddlTeam.SelectedValue.ToString()));
        //                        cmd.Parameters.AddWithValue("@FilePath", "/Uploads/E-Detailing/" + fileName);
        //                        cmd.Parameters.AddWithValue("@FileName", FileName.Text.ToString());
        //                        cmd.Parameters.AddWithValue("@Description", FileDescription.Text.ToString());
        //                        cmd.Parameters.AddWithValue("@NumOfPages", Convert.ToInt32(numberOfPages));
        //                        cmd.Parameters.AddWithValue("@Status", (status.Checked) ? true : false);
        //                        cmd.Parameters.AddWithValue("@ProductId", Convert.ToInt32(productID.Value.ToString() == "" ? "-1" : productID.Value.ToString()));
        //                        cmd.Parameters.AddWithValue("@startDate", DateTime.Parse(txtStartDate.Text));
        //                        cmd.Parameters.AddWithValue("@endDate", DateTime.Parse(txtEndDate.Text));

        //                        cmd.CommandText = "sp_InsertPdfDetails";
        //                        cmd.Connection = con;
        //                        con.Open();
        //                        DataSet ds = new DataSet();
        //                        SqlDataAdapter sda = new SqlDataAdapter(cmd);
        //                        sda.Fill(ds);
        //                        con.Close();
        //                        if (ds.Tables[0].Rows.Count > 0)
        //                        {
        //                            loadData();
        //                            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "script", "resetall();", true);
        //                            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "Success", "alert('File uploaded successfuly.')", true);
        //                        }
        //                        else
        //                        {
        //                            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "Alert", "alert('File uploading failed!')", true);
        //                        }
        //                    }
        //                }
        //            }

        //        }
        //        else
        //        {
        //            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "Alert", "alert('Please select file!')", true);

        //        }
        //    }
        //    else
        //    {
        //        try
        //        {
        //            nv.Clear();
        //            nv.Add("@id-int", pdfid.Value.ToString());
        //            nv.Add("@Level3Id-int", ddlTeam.SelectedValue.ToString());
        //            nv.Add("@FileName-varchar(100)", FileName.Text.ToString());
        //            nv.Add("@Description-varchar(250)", FileDescription.Text.ToString());
        //            nv.Add("@Status-bit", (status.Checked) ? "true" : "false");
        //            nv.Add("@productID-int", productID.Value.ToString());
        //            nv.Add("@startDate-date", txtStartDate.Text.ToString());
        //            nv.Add("@endDate-date", txtEndDate.Text.ToString());
        //            var data = dl.UpdateData("sp_UpdatePdfDetails", nv);
        //            if (data)
        //            {
        //                loadData();
        //                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "script", "resetall();", true);
        //                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "Success", "alert('Data updated successfuly.')", true);
        //            }
        //            else
        //            {
        //                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "Alert", "alert('Update data failed!')", true);
        //            }


        //        }
        //        catch (Exception exception)
        //        {
        //            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "Alert", exception.Message, true);
        //        }

        //    }
        //    Response.Redirect("PDFUploader.aspx");
        //}

        protected void DownloadFile(object sender, EventArgs e)
        {
            string filePath = (sender as LinkButton).CommandArgument;
            Response.ContentType = ContentType;
            Response.AppendHeader("Content-Disposition", "attachment; filename=" + Path.GetFileName(filePath));
            Response.WriteFile(filePath);
            Response.End();
        }


        protected void Grid1_RowDataBound(object sender, GridRowEventArgs e)
        {
            //GridDataControlFieldCell cell2 = e.Row.Cells[8] as GridDataControlFieldCell;
            //LinkButton lb2 = cell2.FindControl("MakeRel") as LinkButton;
            //lb2.Attributes.Add("onClick", "oGrid_makeRel('" + id + "','" + teamid + "');return false;");


            GridDataControlFieldCell cell1 = e.Row.Cells[11] as GridDataControlFieldCell;

            LinkButton lb1 = cell1.FindControl("LinkButton1") as LinkButton;

            LinkButton lb2 = cell1.FindControl("LinkButton2") as LinkButton;
            int id = int.Parse(e.Row.Cells[0].Text);
            int teamid = int.Parse(e.Row.Cells[1].Text);
            string editParameters = String.Format("oGrid_Edit('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}'); return false;",
                id, teamid, e.Row.Cells[2].Text.ToString(), e.Row.Cells[5].Text.ToString(),
                e.Row.Cells[7].Text.ToString(), e.Row.Cells[8].Text.ToString(), e.Row.Cells[9].Text.ToString(), e.Row.Cells[10].Text.ToString());

            lb1.Attributes.Add("onClick", editParameters);
            lb2.Attributes.Add("onClick", "oGrid_Delete('" + id + "');return false;");

        }


        private bool IsValidUser()
        {
            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];
                return _currentUser != null;
            }
            catch (Exception exception)
            {
               // lblError.Text = "While checking user, it shows " + exception.Message;
            }

            return false;
        }

        //void loadData()
        //{
        //    using (SqlConnection con = new SqlConnection(constr))
        //    {
        //        using (SqlCommand cmd = new SqlCommand())
        //        {
        //            cmd.CommandType = CommandType.Text;
        //            cmd.CommandText = "select ID,pdf.Level3Id as TeamId,products.ProductName as Product, pdf.FileName,hrl.LevelName as Team,pdf.Description,pdf.NumOfPages,pdf.Status, Products.ProductId, pdf.startDate, pdf.endDate from tbl_PDFDetailMaster pdf left outer join Products on pdf.ProductId = Products.ProductId inner join HierarchyLevel3 hrl on pdf.Level3Id = hrl.LevelId order by ID DESC";
        //            cmd.Connection = con;
        //            con.Open();
        //            DataSet ds = new DataSet();
        //            SqlDataAdapter sda = new SqlDataAdapter(cmd);
        //            sda.Fill(ds);
        //            con.Close();
        //            if (ds.Tables[0].Rows.Count > 0)
        //            {
        //                Grid1.DataSource = ds.Tables[0];
        //                Grid1.DataBind();
        //            }
        //        }
        //    }
        //}
    }
}
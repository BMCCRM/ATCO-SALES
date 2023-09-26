using System;
using System.Web.UI.WebControls;
using System.Data;
using PocketDCR2.Classes;
using System.Collections.Specialized;


namespace PocketDCR2.Form
{
    public partial class D_marketingview : System.Web.UI.Page
    {
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                int CurrentMonth = System.DateTime.Today.Month;
                string firstdate = DateTime.Today.ToShortDateString();
                string secdate = DateTime.Today.ToShortDateString();

                if (CurrentMonth >= 1 && CurrentMonth <= 3)
                {
                    firstdate = Convert.ToDateTime("01/01/" + System.DateTime.Today.Year).ToShortDateString();
                    secdate = Convert.ToDateTime("03/31/" + System.DateTime.Today.Year).ToShortDateString();
                    Labq.Text = "First Quarter"; ddlQuarter.SelectedIndex = 0;
                }
                else if (CurrentMonth >= 4 && CurrentMonth <= 6)
                {
                    firstdate = Convert.ToDateTime("04/01/" + System.DateTime.Today.Year).ToShortDateString();
                    secdate = Convert.ToDateTime("06/30/" + System.DateTime.Today.Year).ToShortDateString();
                    Labq.Text = "Second  Quarter"; ddlQuarter.SelectedIndex = 1;
                }
                else if (CurrentMonth >= 7 && CurrentMonth <= 9)
                {
                    firstdate = Convert.ToDateTime("07/01/" + System.DateTime.Today.Year).ToShortDateString();
                    secdate = Convert.ToDateTime("09/30/" + System.DateTime.Today.Year).ToShortDateString();
                    Labq.Text = "Third Quarter"; ddlQuarter.SelectedIndex = 2;

                }
                else if (CurrentMonth >= 10 && CurrentMonth <= 11)
                {
                    firstdate = Convert.ToDateTime("10/01/" + System.DateTime.Today.Year).ToShortDateString();
                    secdate = Convert.ToDateTime("12/31/" + System.DateTime.Today.Year).ToShortDateString();
                    Labq.Text = "Fourth Quarter"; ddlQuarter.SelectedIndex = 3;
                }


                txtDate1.Text = firstdate.ToString();
                txtDate2.Text = secdate.ToString();
                getdata();
            }
        }

        private void getdata()
        {
            DataSet ds = dl.GetData("sp_ProductsSelect_all", null);

            GridView1.DataSource = ds;
            GridView1.DataBind();
        }

        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                int skuid = Convert.ToInt32(e.Row.Cells[1].Text);
                string date1 = txtDate1.Text;
                string date2 = txtDate2.Text;
                nv.Clear();
                nv.Add("Skuid-int", skuid.ToString());
                nv.Add("FromDate-date", date1.ToString());
                nv.Add("ToDate-date", date2.ToString());

                DataSet ds = dl.GetData("sp_M_Team_EnterySelect", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        TextBox txtqty = e.Row.Cells[3].FindControl("txtqty") as TextBox;
                        Label labrec = e.Row.Cells[0].FindControl("labrec") as Label;
                        txtqty.Text = ds.Tables[0].Rows[0]["Qty"].ToString();
                        labrec.Text = ds.Tables[0].Rows[0]["Recno"].ToString();
                    }
                }
            }
        }

        protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            #region Save/Update

            if (e.CommandName == "Save")
            {
                int inRowIndex = Convert.ToInt32(e.CommandArgument);
                if (GridView1.PageIndex != 0)
                {
                    if (inRowIndex >= GridView1.PageSize)
                    {
                        inRowIndex = inRowIndex - (GridView1.PageSize * GridView1.PageIndex);
                    }
                }

                Label lab = GridView1.Rows[inRowIndex].Cells[1].FindControl("labrec") as Label;
                string RecNo = lab.Text;

                string SKUId = GridView1.Rows[inRowIndex].Cells[1].Text;
                TextBox txtqty = GridView1.Rows[inRowIndex].Cells[2].FindControl("txtqty") as TextBox;
                string qty1 = txtqty.Text;

                DateTime date1 = Convert.ToDateTime(txtDate1.Text);
                DateTime date2 = Convert.ToDateTime(txtDate2.Text);

                nv.Clear();
                nv.Add("Skuid-int", SKUId.ToString());
                nv.Add("FromDate-date", date1.ToString());
                nv.Add("ToDate-date", date2.ToString());
                nv.Add("qty-int", qty1.ToString());
                bool result;
                if (RecNo == "")
                {
                    result = dl.InserData("sp_M_Team_EnterySave", nv);
                }
                else
                {
                    nv.Add("Recno-int", RecNo.ToString());
                    result = dl.InserData("sp_M_Team_EnteryUpdate", nv);
                }
                if (result)
                {
                    getdata();
                    labmsg.Text = "Data save successfully.";
                }
            }
            #endregion

            if (e.CommandName == "Delete")
            {
                int inRowIndex = Convert.ToInt32(e.CommandArgument);
                if (GridView1.PageIndex != 0)
                {
                    if (inRowIndex >= GridView1.PageSize)
                    {
                        inRowIndex = inRowIndex - (GridView1.PageSize * GridView1.PageIndex);
                    }
                }
                //GridView1.Rows[inRowIndex].Cells[0].Text;
                Label lab = GridView1.Rows[inRowIndex].Cells[1].FindControl("labrec") as Label;
                string RecNo = lab.Text;

                if (RecNo != "")
                {
                    nv.Clear();
                    nv.Add("RecNo-int", RecNo.ToString());
                    bool result = dl.InserData("sp_M_Team_EnteryDelete", nv);
                    if (result)
                    {
                        getdata();
                        labmsg.Text = "Recored delete successfully";
                    }
                }

            }
        }

        protected void ddlQuarter_SelectedIndexChanged(object sender, EventArgs e)
        {
            string firstdate = DateTime.Today.ToShortDateString();
            string secdate = DateTime.Today.ToShortDateString();

            if (ddlQuarter.SelectedIndex == 0)
            {
                firstdate = Convert.ToDateTime("01/01/" + System.DateTime.Today.Year).ToShortDateString();
                secdate = Convert.ToDateTime("03/31/" + System.DateTime.Today.Year).ToShortDateString();
                Labq.Text = "First Quarter";
            }
            else if (ddlQuarter.SelectedIndex == 1)
            {
                firstdate = Convert.ToDateTime("04/01/" + System.DateTime.Today.Year).ToShortDateString();
                secdate = Convert.ToDateTime("06/30/" + System.DateTime.Today.Year).ToShortDateString();
                Labq.Text = "Second  Quarter";
            }
            else if (ddlQuarter.SelectedIndex == 2)
            {
                firstdate = Convert.ToDateTime("07/01/" + System.DateTime.Today.Year).ToShortDateString();
                secdate = Convert.ToDateTime("09/30/" + System.DateTime.Today.Year).ToShortDateString();
                Labq.Text = "Third Quarter";
            }
            else if (ddlQuarter.SelectedIndex == 3)
            {
                firstdate = Convert.ToDateTime("10/01/" + System.DateTime.Today.Year).ToShortDateString();
                secdate = Convert.ToDateTime("12/31/" + System.DateTime.Today.Year).ToShortDateString();
                Labq.Text = "Fourth Quarter"; ddlQuarter.SelectedIndex = 3;
            }
            txtDate1.Text = firstdate.ToString();
            txtDate2.Text = secdate.ToString();
            getdata();
        }


    }
}
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for marketingplanforgift1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class marketingplanforgift : System.Web.Services.WebService
    {

        string sku = "";
        bool result1;

        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetGift(string level3, string level4, string level5, string level6, string txtDate1, string txtDate2)
        {
            string result = string.Empty;
            // var ManagerId = Session["CurrentUserId"].ToString();
            try
            {
                nv.Clear();
                nv.Add("Level3ID-INT", level3.ToString());
                nv.Add("Level4ID-INT", level4.ToString());
                nv.Add("Level5ID-INT", level5.ToString());
                nv.Add("Level6ID-INT", level6.ToString());
                nv.Add("FromDate-date", txtDate1);
                //nv.Add("ToDate-date", txtDate2);//{ "level3-int", level3 }, { "level4-int", level4 }, { "level5-int", level5 }, { "level6-int", level6 }
                var data = dl.GetData("sp_GiftSelect_all", nv);
                if (data.Tables[0].Rows.Count > 0)
                {
                    return data.Tables[0].ToJsonString();
                }
                else
                {
                    result = "No";
                }

            }
            catch (NullReferenceException ex)
            {
                result = ex.Message;
            }

            return result;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GiftQtyInsert(string giftid, string qty1, string txtDate1, string txtDate2, string level3, string level4, string level5, string level6)
        {
            bool resul;

            string itemid;
            string result = string.Empty;
            // var ManagerId = Session["CurrentUserId"].ToString();
            try
            {
                DateTime date1 = Convert.ToDateTime(txtDate1);
                //    DateTime date2 = Convert.ToDateTime(txtDate2);

                #region save another

                string rectype = "G";
                string balance = "0";
                string opning = "0";
                DateTime dt = Convert.ToDateTime(txtDate1);
                DateTime df = dt.AddMonths(-1);
                //string dte = System.DateTime.Now.ToShortDateString();
                string def = Convert.ToString(df.ToShortDateString());
                string det = Convert.ToString(dt.ToShortDateString());
                int udatem = Convert.ToDateTime(date1).Month;
                int udatey = Convert.ToDateTime(date1).Year;
                NameValueCollection nv1 = new NameValueCollection();

                DataSet dsR = dl.GetData("sp_mioid", new NameValueCollection() { { "level3-int", level3 }, { "level4-int", level4 }, { "level5-int", level5 }, { "level6-int", level6 } });
                DataTable table = dsR.Tables[0];
                string tr = table.Rows.Count.ToString();
                if (dsR != null)
                {
                    if (dsR.Tables[0].Rows.Count > 0)
                    {
                        int i = 0;
                        foreach (DataRow row in table.Rows)
                        {
                            foreach (var item in row.ItemArray)
                            {
                                int mioid = Convert.ToInt32(item);
                                string moid = Convert.ToString(mioid).ToString();

                                NameValueCollection nv2 = new NameValueCollection();
                                nv2.Clear();
                                nv2.Add("mioid-int", moid.ToString());
                                nv2.Add("sample_id-int", giftid.ToString());
                                nv2.Add("rectype-nvarchar(100)", rectype.ToString());
                                nv2.Add("@dtf-date", det.ToString());
                                // nv2.Add("@dtt-date", det.ToString());
                                DataSet dsR2 = dl.GetData("sp_blance_check", nv2);
                                DataTable table2 = dsR2.Tables[0];

                                string tr2 = table.Rows.Count.ToString();
                                if (dsR2.Tables[0].Rows.Count != 0)
                                {

                                    // return result = "NOT";
                                    string recordo = table2.Rows[0]["opening"].ToString();
                                    string recordb = table2.Rows[0]["balance"].ToString();
                                    string recordi = table2.Rows[0]["IssueQty"].ToString();
                                    int c = Convert.ToInt32(recordi) + Convert.ToInt32(recordo) - Convert.ToInt32(recordb);

                                    nv1.Clear();
                                    nv1.Add("MIOID-int", moid.ToString());
                                    nv1.Add("SampleId-int", giftid.ToString());
                                    nv1.Add("IssueQty-int", qty1.ToString());
                                    nv1.Add("month-nvarchar-(100)", Convert.ToString(udatem).ToString());
                                    nv1.Add("year-nvarchar-(100)", Convert.ToString(udatey).ToString());
                                    nv1.Add("opening-nvarchar(100)", c.ToString());
                                    nv1.Add("balance-nvarchar(100)", balance.ToString());
                                    nv1.Add("RecType-nvarchar(100)", rectype.ToString());


                                }
                                else
                                {
                                    nv1.Clear();
                                    nv1.Add("MIOID-int", moid.ToString());
                                    nv1.Add("SampleId-int", giftid.ToString());
                                    nv1.Add("IssueQty-int", qty1.ToString());
                                    nv1.Add("month-nvarchar-(100)", Convert.ToString(udatem).ToString());
                                    nv1.Add("year-nvarchar-(100)", Convert.ToString(udatey).ToString());
                                    nv1.Add("opening-nvarchar(100)", opning.ToString());
                                    nv1.Add("balance-nvarchar(100)", balance.ToString());
                                    nv1.Add("RecType-nvarchar(100)", rectype.ToString());
                                }

                                i++;

                                if (table2.Rows.Count > 0)
                                {
                                    // return result = "NOT";
                                    result1 = dl.InserData("sp_bln_item_update", nv1);
                                }
                                else
                                {
                                    result1 = dl.InserData("sp_bln_item_insert", nv1);

                                }
                                nv1.Clear();

                            }
                        }
                    }
                }
                #endregion
      
                if (result1)
                {
                  
                    result = "OK";
                }
          

            }
            catch (NullReferenceException ex)
            {
                result = ex.Message;
            }

            return result;

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetRecNo(string skuid, string txtDate1, string txtDate2)
        {
            string result = string.Empty;
            try
            {

                nv.Clear();
                nv.Add("Skuid-int", skuid.ToString());
                nv.Add("FromDate-date", txtDate1.ToString());
                nv.Add("ToDate-date", txtDate2.ToString());

                DataSet ds = dl.GetData("sp_M_Team_EnterySelect", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        //TextBox txtqty = e.Row.Cells[3].FindControl("txtqty") as TextBox;
                        //Label labrec = e.Row.Cells[0].FindControl("labrec") as Label;
                        //txtqty.Text = ds.Tables[0].Rows[0]["Qty"].ToString();
                        //labrec.Text = ds.Tables[0].Rows[0]["Recno"].ToString();
                        result = ds.Tables[0].Rows[0]["Recno"].ToString();
                    }
                    else
                    {
                        result = "No";
                    }
                }

            }
            catch (NullReferenceException ex)
            {
                result = ex.Message;
            }

            return result;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Setbalance(string level3, string txtDate1, string txtDate2)
        {
            string result = string.Empty;
            try
            {
                result = set_blnc(level3, txtDate1, txtDate2);
            }
            catch (NullReferenceException ex)
            {
                result = ex.Message;
            }

            return result;
        }


        public string set_blnc(string level3, string txtDate1, string txtDate2)
        {
            string returnresult = "";

            DateTime b_date1 = Convert.ToDateTime(txtDate1);
            DateTime b_date2 = Convert.ToDateTime(txtDate2);

            #region save another

            string rectype = "G";
            string balance = "0";
            string opning = "0";
            DateTime dt = Convert.ToDateTime(txtDate1);
            DateTime df = dt.AddMonths(-1);
            //string dte = System.DateTime.Now.ToShortDateString();
            string def = Convert.ToString(df.ToShortDateString());
            string det = Convert.ToString(dt.ToShortDateString());
            int udatem = Convert.ToDateTime(b_date1).Month;
            int udatey = Convert.ToDateTime(b_date1).Year;
            NameValueCollection nv3 = new NameValueCollection();
            NameValueCollection nv4 = new NameValueCollection();

            DataSet dsR = dl.GetData("sp_mioid", new NameValueCollection() { { "level3-int", level3 }, { "level4-int", "0" }, { "level5-int", "0" }, { "level6-int", "0" } });
            DataTable table = dsR.Tables[0];
            string tr = table.Rows.Count.ToString();

            if (dsR != null)
            {
                if (dsR.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in table.Rows)
                    {
                        foreach (var item in row.ItemArray)
                        {
                            int mioid = Convert.ToInt32(item);
                            string moid = Convert.ToString(mioid).ToString();

                            DataSet sku_dsR = dl.GetData("sp_sku_id", null);
                            DataTable sku_table = sku_dsR.Tables[0];
                            string sku_tr = sku_table.Rows.Count.ToString();
                            if (sku_dsR != null)
                            {
                                if (sku_dsR.Tables[0].Rows.Count > 0)
                                {
                                    foreach (DataRow sku_row in sku_table.Rows)
                                    {
                                        foreach (var sku_item in sku_row.ItemArray)
                                        {
                                            int sku_id = Convert.ToInt32(sku_item);
                                            sku = Convert.ToString(sku_id).ToString();
                                            nv3.Clear();
                                            nv3.Add("mioid-int", moid.ToString());
                                            nv3.Add("sample_id-int", sku.ToString());
                                            nv3.Add("rectype-nvarchar(100)", rectype.ToString());
                                            nv3.Add("@dtf-date", def.ToString());
                                            // nv3.Add("@dtt-date", det.ToString());
                                            DataSet dsR2 = dl.GetData("sp_blance_check", nv3);
                                            DataTable table2 = dsR2.Tables[0];
                                            string tr2 = table.Rows.Count.ToString();
                                            if (dsR2.Tables[0].Rows.Count != 0)
                                            {
                                                string recordo = table2.Rows[0]["opening"].ToString();
                                                string recordb = table2.Rows[0]["balance"].ToString();
                                                string recordi = table2.Rows[0]["IssueQty"].ToString();
                                                int c = Convert.ToInt32(recordi) + Convert.ToInt32(recordo) - Convert.ToInt32(recordb);

                                                nv4.Clear();
                                                nv4.Add("MIOID-int", moid.ToString());
                                                nv4.Add("SampleId-int", sku.ToString());
                                                nv4.Add("month-nvarchar-(100)", Convert.ToString(udatem).ToString());
                                                nv4.Add("year-nvarchar-(100)", Convert.ToString(udatey).ToString());
                                                nv4.Add("opening-nvarchar(100)", c.ToString());
                                                nv4.Add("RecType-nvarchar(100)", rectype.ToString());


                                                result1 = dl.InserData("sp_bln_item_set_bln", nv4);
                                                //if (result1 == true)
                                                //{
                                                //    //done
                                                //    ret
                                                //}
                                                nv4.Clear();
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (result1 == true)
            {
                returnresult = "OK";
            }
            #endregion

            //foreach (DataRow item in table.Rows)
            //{
            //    //string asassa = item["MR_Name"].ToString();
            //    DataTable sku_dsR = dl.GetData("sku_id", null).Tables[0];
            //    foreach (DataRow dr in sku_dsR.Rows)
            //    {
            //        string asd = dr["skuname"].ToString();

            //    }

            //}

            return returnresult;
        }
    }



}

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
    /// Summary description for marketingplansample
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class marketingplansample : System.Web.Services.WebService
    {
        string sku = "";
        bool result1;

        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetProduct(string level3, string level4, string level5, string level6, string txtDate1, string txtDate2)
        {
            string result = string.Empty;
            try
            {
                var month = Convert.ToDateTime(txtDate1).Month.ToString();
                var year = Convert.ToDateTime(txtDate1).Year.ToString();
                if (level3 != "0" && level4 == "0" && level5 == "0" && level6 == "0")
                {
                    var nationalgrid =NationalGrid(month,year,level3);
                    if (nationalgrid != "No")
                    {
                        result = nationalgrid;
                    }
                    else
                    {
                        result = "No";
                    }
                }
                else if (level4 != "0" && level5 == "0" && level6 == "0")
                {
                    var regionalgrid = RegionalGrid(month, year, level4);
                    if (regionalgrid != "No")
                    {
                        result = regionalgrid;
                    }
                    else
                    {
                        result = "No";
                    }
                }
                else if (level5 != "0" && level6 == "0")
                {
                    var zonalgrid = ZonalGrid(month, year, level5);
                    if (zonalgrid != "No")
                    {
                        result = zonalgrid;
                    }
                    else
                    {
                        result = "No";
                    }
                }
                else if (level3 == "0")
                {
                    result = "No";
                }
                else
                {

                    nv.Clear();
                    //nv.Add("Level3ID-INT", level3.ToString());
                    //nv.Add("Level4ID-INT", level4.ToString());
                    //nv.Add("Level5ID-INT", level5.ToString());
                    nv.Add("@level6-INT", level6.ToString());
                    nv.Add("@month-int", month);
                    nv.Add("@year-int", year);
                    var data = dl.GetData("sp_GetSampleGridDetail", nv);
                    if (data.Tables[0].Rows.Count > 0)
                    {
                        return data.Tables[0].ToJsonString();
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
        public string ProductQtyInsert(string ProductID, string QTY, string txtDate1, string txtDate2, string level6,string level5,string level4,string level3) 
        {
            string result = string.Empty;
            try
            {

                var month = Convert.ToDateTime(txtDate1).Month.ToString();
                var year = Convert.ToDateTime(txtDate1).Year.ToString();

                if (level4 != "0" && level5 == "0" && level6 == "0")
                {
                    var regionalinsertdata = RegionalInsert(txtDate1, level4, ProductID, QTY);
                    if (regionalinsertdata != "No")
                    {
                        result = regionalinsertdata;
                    }
                    else
                    {
                        result = "No";
                    }
                }
                else if (level5 != "0" && level6 == "0")
                {
                    var zonalgrid = ZonalInsert(txtDate1, level5,ProductID,QTY);
                    if (zonalgrid != "No")
                    {
                        result = zonalgrid;
                    }
                    else
                    {
                        result = "No";
                    }
                }
                else
                {
                    var validateit = validatedata(level6, month, year, ProductID, "Level6");
                    nv.Clear();
                    nv.Add("productid-INT", ProductID.ToString());
                    nv.Add("qty-INT", QTY.ToString());
                    nv.Add("Level6ID-INT", level6.ToString());
                    nv.Add("@txtDate-varchar(30)", txtDate1);

                    var data = dl.GetData("sp_insertsampledata", nv);
                    if (data.Tables[0].Rows.Count > 0)
                    {
                        var validateid = data.Tables[0].Rows[0]["identityvalue"].ToString();
                        if (validateid.ToUpper() != "NULL")
                        {
                            result = data.Tables[0].ToJsonString();
                        }
                        else
                        {
                            result = "Error";
                        }
                    }
                    else
                    {
                        result = "No";
                    }
                }
            }
            catch (Exception ex)
            {
                result = "EError";
            }
            return result;
        }
        private string NationalGrid(string month, string year , string level3) 
        {
            string result = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@level3-INT", level3.ToString());
                nv.Add("@month-int", month);
                nv.Add("@year-int", year);
                var data = dl.GetData("sp_GetSampleGridDetailNational", nv);
                if (data.Tables[0].Rows.Count > 0)
                {
                    return data.Tables[0].ToJsonString();
                }
                else
                {
                    result = "No";
                }
            }
            catch (Exception)
            {
                result = "No";
            }
            return result;
        }
        private string RegionalGrid(string month, string year , string level4)
        {
            string result = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@level4-INT", level4.ToString());
                nv.Add("@month-int", month);
                nv.Add("@year-int", year);
                var data = dl.GetData("sp_GetSampleGridDetailRegional", nv);
                if (data.Tables[0].Rows.Count > 0)
                {
                    return data.Tables[0].ToJsonString();
                }
                else
                {
                    result = "No";
                }
            }
            catch (Exception)
            {

                throw;
            }
            return result;
        }
        private string ZonalGrid(string month, string year, string level5)
        {
            string result = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("@level5-INT", level5.ToString());
                nv.Add("@month-int", month);
                nv.Add("@year-int", year);
                var data = dl.GetData("sp_GetSampleGridDetailZonal", nv);
                if (data.Tables[0].Rows.Count > 0)
                {
                    return data.Tables[0].ToJsonString();
                }
                else
                {
                    result = "No";
                }
            }
            catch (Exception)
            {

                throw;
            }
            return result;
        }
        private string validatedata(string level6id ,string month,string year, string proid, string levelname) 
        {
            var result = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("productid-INT", proid.ToString());
                nv.Add("@month-INT", month.ToString());
                nv.Add("@year-INT", year.ToString());
                nv.Add("@levelid-int", level6id.ToString());
                nv.Add("@levelname-varchar(10)", levelname.ToString());
                var data = dl.GetData("sp_validatesample", nv);
                //if (data.Tables[0].Rows.Count > 0)
                //{
                //    result = data.Tables[0].ToJsonString();
                //}
                //else
                //{
                //    result = "NO";
                //}
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }
        private string RegionalInsert(string datee, string level4,string productid,string qty) 
        {
            var month = Convert.ToDateTime(datee).Month.ToString();
            var year = Convert.ToDateTime(datee).Year.ToString();
            var validateit = validatedata(level4, month, year, productid,"level4");
            string result = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("productid-INT", productid.ToString());
                nv.Add("qty-INT", qty.ToString());
                nv.Add("Level4ID-INT", level4.ToString());
                nv.Add("@txtDate-varchar(30)", datee);
                var data = dl.GetData("sp_insertsampledataRegional", nv);
                if (data.Tables[0].Rows.Count > 0)
                {
                    var validateid = data.Tables[0].Rows[0]["identityvalue"].ToString();
                    if (validateid.ToUpper() != "NULL")
                    {
                        result = data.Tables[0].ToJsonString();
                    }
                    else
                    {
                        result = "Error";
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }
        private string ZonalInsert(string datee, string level5, string productid, string qty)
        {
            var month = Convert.ToDateTime(datee).Month.ToString();
            var year = Convert.ToDateTime(datee).Year.ToString();
            var validateit = validatedata(level5, month, year, productid, "level5");
            string result = string.Empty;
            try
            {
                nv.Clear();
                nv.Add("productid-INT", productid.ToString());
                nv.Add("qty-INT", qty.ToString());
                nv.Add("Level5ID-INT", level5.ToString());
                nv.Add("@txtDate-varchar(30)", datee);
                var data = dl.GetData("sp_insertsampledataZonal", nv);
                if (data.Tables[0].Rows.Count > 0)
                {
                    var validateid = data.Tables[0].Rows[0]["identityvalue"].ToString();
                    if (validateid.ToUpper() != "NULL")
                    {
                        result = data.Tables[0].ToJsonString();
                    }
                    else
                    {
                        result = "Error";
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

    }
}

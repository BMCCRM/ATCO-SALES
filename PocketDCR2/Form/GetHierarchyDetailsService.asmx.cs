using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;
using System.Collections.Specialized;
using System.Text;
using System.Web.Script.Serialization;
using System.Collections;
using PocketDCR2.Classes;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using System.Web.Security;
using PocketDCR2.Classes;



namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for GetHierarchyDetailsService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class GetHierarchyDetailsService : System.Web.Services.WebService
    {

        #region Private Members
        private static string _connectionString = Constants.GetConnectionString();
        SqlConnection _connection;
        string dbTyper = "";
        DataSet ds;
        SqlCommand command;
        NameValueCollection _nvCollection = new NameValueCollection();

        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;
        #endregion


        [WebMethod(EnableSession = true)]
        public string getHierarchyDetails()
        {
            String result = "";
            try
            {

                var userid = Session["CurrentUserId"];
                string userrole = (string)Session["CurrentUserRole"];
                string Role = "";
                switch (userrole)
                {
                    case "rl3":
                        Role = "NSM";
                        break;
                    case "rl4":
                        Role = "RSM";
                        break;
                    case "rl5":
                        Role = "ZSM";
                        break;
                    case "rl6":
                        Role = "MIO";
                        break;
                    case "admin":
                        Role = "admin";
                        break;
                    case "headoffice":
                        Role = "HO";
                        break;
                }
                JavaScriptSerializer jss = new JavaScriptSerializer();
                _nvCollection.Clear();
                _nvCollection.Add("@check-varchar", Role);
                _nvCollection.Add("@empid-int", userid.ToString());
                DataSet ds = GetData("sp_getHirechylevelDetails", _nvCollection);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    result = ToJsonString(ds.Tables[0]);
                }
            }
            catch (SqlException ex)
            {
                ex.Message.ToString();
            }
            return result;
        }

        public string ToJsonString(DataTable dt)
        {
            var serializer = new JavaScriptSerializer();
            var rows = new List<Dictionary<string, string>>();
            foreach (DataRow dr in dt.Rows)
            {
                var row = dt.Columns.Cast<DataColumn>().ToDictionary(col => col.ColumnName, col => dr[col].ToString());
                rows.Add(row);
            }

            var builder = new StringBuilder();
            serializer.Serialize(rows, builder);
            return builder.ToString();
        }


        [WebMethod(EnableSession = true)]
        public string FillGridMioInfo(string Level4, string Level5, string Level6, string check)
        {
            string returnstring = "";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            _nvCollection.Clear();
            string spname = "";
            try
            {
                if (check == "RSM")
                {
                    spname = "sp_selectempwithhierarFlm";
                }
                else
                {
                    spname = "sp_selectempwithhierar";
                }
                Level4 = (Level4 == "0") ? "1" : Level4;
                _nvCollection.Add("@level4id-int", Level4);
                _nvCollection.Add("@level5id-int", Level5);
                _nvCollection.Add("@level6id-int", Level6);
                DataSet ds = GetData(spname, _nvCollection);
                var empid = 0;
                var empdetail = new DataSet();
                if (ds.Tables[0].Rows.Count > 0 || ds != null)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        if (check == "RSM")
                        {
                            empid = Convert.ToInt32(dr["flmid"].ToString());
                            returnstring += Mfillflmdetails(empid.ToString(), "FLM") + "|";
                        }
                        else
                        {
                            empid = Convert.ToInt32(dr["id"].ToString());
                            _nvCollection.Clear();
                            _nvCollection.Add("@empid-int", empid.ToString());
                            empdetail = GetData("GetEmployeeData", _nvCollection);
                            if (ds.Tables[0].Rows.Count > 0 || ds != null)
                            {
                                returnstring += ToJsonString(empdetail.Tables[0]) + "|";
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string Mfillflmdetails(string idd, string type)
        {
            string returnstring = string.Empty;
            try
            {
                var flmdetails = new DataTable();
                var flmid = new DataTable();
                var empdetail = new DataSet();
                _nvCollection.Clear();
                _nvCollection.Add("@flmid-int", idd);
                flmdetails = GetData("sp_flmempid", _nvCollection).Tables[0];
                ArrayList lst = new ArrayList();
                ArrayList flmname = new ArrayList();
                ArrayList flmmob = new ArrayList();
                ArrayList flmemail = new ArrayList();
                foreach (DataRow drr in flmdetails.Rows)
                {
                    lst.Add(drr[3]);
                    flmname.Add(drr[1]);
                    flmmob.Add(drr[4]);
                    flmemail.Add(drr[5]);
                }
                var empid = "";
                for (int i = 0; i < lst.Count; i++)
                {
                    empid = lst[i].ToString();
                    _nvCollection.Clear();
                    _nvCollection.Add("@empid-int", empid);
                    _nvCollection.Add("@Type-varchar(50)", "Flm");
                    _nvCollection.Add("@flmid-int", idd);
                    empdetail = GetData("GetEmployeeDataForFLM", _nvCollection);
                    if (empdetail.Tables[0].Rows.Count != 0)
                    {
                        empdetail.Tables[0].Columns.Add("FlmName", typeof(string));
                        empdetail.Tables[0].Rows[0]["FlmName"] = flmname[i].ToString();
                        empdetail.Tables[0].Columns.Add("Flmobile", typeof(string));
                        empdetail.Tables[0].Rows[0]["Flmobile"] = flmmob[i].ToString();
                        empdetail.Tables[0].Columns.Add("Flmemail", typeof(string));
                        empdetail.Tables[0].Rows[0]["Flmemail"] = flmemail[i].ToString();
                        empdetail.Tables[0].Columns.Add("Type", typeof(string));
                        empdetail.Tables[0].Rows[0]["Type"] = type;
                        returnstring += ToJsonString(empdetail.Tables[0]);
                    }
                    else
                    {
                        DataRow newrow = empdetail.Tables[0].NewRow();
                        empdetail.Tables[0].Columns.Add("FlmName", typeof(string));
                        newrow["FlmName"] = flmname[i].ToString();
                        //empdetail.Tables[0].Rows[0]["FlmName"] = newrow["FlmName"];
                        empdetail.Tables[0].Columns.Add("Flmobile", typeof(string));
                        newrow["Flmobile"] = flmmob[i].ToString();
                        empdetail.Tables[0].Columns.Add("Flmemail", typeof(string));
                        newrow["Flmemail"] = flmemail[i].ToString();
                        empdetail.Tables[0].Columns.Add("Type", typeof(string));
                        newrow["Type"] = type;
                        //empdetail.Tables[0].Rows[0]["Flmobile"] = flmmob[i].ToString();
                        newrow["TimeForCall"] = "00:00";
                        newrow["name"] = "--";
                        newrow["lastdocvisit"] = "--";
                        newrow["nextdoc"] = "--";
                        newrow["noofdocvisited"] = "0";
                        newrow["mobno"] = "--";
                        newrow["Latitude"] = "";
                        newrow["Longitude"] = "";
                        empdetail.Tables[0].Rows.Add(newrow);
                        returnstring += ToJsonString(empdetail.Tables[0]);
                    }
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string Mfillrsmdetails(string idd)
        {
            string returnstring = string.Empty;
            try
            {
                var flmdetails = new DataTable();
                var flmid = new DataTable();
                var empdetail = new DataSet();
                _nvCollection.Clear();
                _nvCollection.Add("@rsmid-int", idd);
                flmdetails = GetData("sp_rsmempid", _nvCollection).Tables[0];
                ArrayList lst = new ArrayList();
                ArrayList flmname = new ArrayList();
                ArrayList flmmob = new ArrayList();
                ArrayList flmemail = new ArrayList();
                ArrayList region = new ArrayList();
                foreach (DataRow drr in flmdetails.Rows)
                {
                    lst.Add(drr[3]);
                    flmname.Add(drr[1]);
                    flmmob.Add(drr[4]);
                    flmemail.Add(drr[5]);
                    region.Add(drr[6]);
                }
                var empid = "";
                for (int i = 0; i < lst.Count; i++)
                {
                    empid = lst[i].ToString();
                    _nvCollection.Clear();
                    _nvCollection.Add("@empid-int", empid);
                    empdetail = GetData("GetEmployeeData", _nvCollection);
                    if (empdetail.Tables[0].Rows.Count != 0)
                    {
                        empdetail.Tables[0].Columns.Add("RsmName", typeof(string));
                        empdetail.Tables[0].Rows[0]["RsmName"] = flmname[i].ToString();
                        empdetail.Tables[0].Columns.Add("Rsmobile", typeof(string));
                        empdetail.Tables[0].Rows[0]["Rsmobile"] = flmmob[i].ToString();
                        empdetail.Tables[0].Columns.Add("Rsmemail", typeof(string));
                        empdetail.Tables[0].Rows[0]["Rsmemail"] = flmemail[i].ToString();
                        empdetail.Tables[0].Rows[0]["RSMRegion"] = region[i].ToString();
                        returnstring += ToJsonString(empdetail.Tables[0]);
                    }
                    else
                    {
                        DataRow newrow = empdetail.Tables[0].NewRow();
                        empdetail.Tables[0].Columns.Add("RsmName", typeof(string));
                        newrow["RsmName"] = flmname[i].ToString();
                        //empdetail.Tables[0].Rows[0]["FlmName"] = newrow["FlmName"];
                        empdetail.Tables[0].Columns.Add("Rsmobile", typeof(string));
                        newrow["Rsmobile"] = flmmob[i].ToString();
                        empdetail.Tables[0].Columns.Add("Rsmemail", typeof(string));
                        newrow["Rsmemail"] = flmemail[i].ToString();
                        empdetail.Tables[0].Columns.Add("RSMRegion", typeof(string));
                        newrow["RSMRegion"] = region[i].ToString();
                        //empdetail.Tables[0].Rows[0]["Flmobile"] = flmmob[i].ToString();
                        newrow["TimeForCall"] = "00:00";
                        newrow["name"] = "--";
                        newrow["lastdocvisit"] = "--";
                        newrow["nextdoc"] = "--";
                        newrow["noofdocvisited"] = "0";
                        newrow["mobno"] = "--";
                        newrow["Latitude"] = "";
                        newrow["Longitude"] = "";
                        empdetail.Tables[0].Rows.Add(newrow);
                        returnstring += ToJsonString(empdetail.Tables[0]);
                    }
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            return returnstring;
        }

        private DataSet GetData(String SpName, NameValueCollection NV)
        {
            var connection = new SqlConnection();
            string dbTyper = "";

            try
            {
                connection.ConnectionString = _connectionString;
                var dataSet = new DataSet();
                connection.Open();

                var command = new SqlCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = connection;
                command.CommandText = SpName;
                command.CommandTimeout = 20000;

                if (NV != null)
                {
                    //New code implemented for retrieving data
                    for (int i = 0; i < NV.Count; i++)
                    {
                        string[] arraySplit = NV.Keys[i].Split('-');

                        if (arraySplit.Length > 2)
                        {
                            dbTyper = "SqlDbType." + arraySplit[1].ToString() + "," + arraySplit[2].ToString();

                            if (NV[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = DBNull.Value;
                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
                            }
                        }
                        else
                        {
                            dbTyper = "SqlDbType." + arraySplit[1].ToString();

                            if (NV[i].ToString() == "NULL")
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = DBNull.Value;
                            }
                            else
                            {
                                command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
                            }
                        }
                    }
                }

                var dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = command;
                dataAdapter.Fill(dataSet);

                return dataSet;
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
                //Constants.ErrorLog("Exception Raising From DAL In NewReport.aspx | " + exception.Message + " | Stack Trace : |" + exception.StackTrace + "|| Procedure Name :" + SpName);

                return null;
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }
        }

        [WebMethod]
        public string totalviisit(string Level4, string Level5, string Level6)
        {
            string returnstring = string.Empty;
            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@Level3-int", "1");
                _nvCollection.Add("@Level4-int", Level4);
                _nvCollection.Add("@Level5-int", Level5);
                _nvCollection.Add("@Level6-int", Level6);
                var flmid = GetData("sp_totalvisitsbyflm", _nvCollection).Tables[0];
                if (flmid != null)
                {
                    returnstring = flmid.ToJsonString();
                }
                else
                {
                    returnstring = "No";
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string FillGridMioLatlong(string Level4, string Level5, string Level6)
        {
            string returnstring = "";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            _nvCollection.Clear();
            try
            {
                Level4 = (Level4 == "0") ? "1" : Level4;
                _nvCollection.Add("@level4id-int", Level4);
                _nvCollection.Add("@level5id-int", Level5);
                _nvCollection.Add("@level6id-int", Level6);
                DataSet ds = GetData("sp_selectempwithhierar", _nvCollection);
                var empid = 0;
                var empdetail = new DataSet();
                if (ds.Tables[0].Rows.Count > 0 || ds != null)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        empid = Convert.ToInt32(dr["id"].ToString());
                        _nvCollection.Clear();
                        _nvCollection.Add("@empid-int", empid.ToString());
                        empdetail = GetData("GetEmployeelatlongnew", _nvCollection);
                        if (ds.Tables[0].Rows.Count > 0 || ds != null)
                        {
                            returnstring += empdetail.Tables[0].ToJsonString() + "|";
                        }
                    }
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string GetContactPoint(string Level4, string Level5, string Level6)
        {
            string returnstring = string.Empty;
            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@Level3id-int", "1");
                _nvCollection.Add("@Level4id-int", Level4);
                _nvCollection.Add("@Level5id-int", Level5);
                _nvCollection.Add("@Level6id-int", Level6);
                var flmid = GetData("sp_GetContactPoints", _nvCollection).Tables[0];
                if (flmid != null)
                {
                    returnstring = flmid.ToJsonString();
                }
                else
                {
                    returnstring = "No";
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return returnstring;
        }

        [WebMethod(EnableSession = true)]
        public string GetContactPointDetails(string Level4, string Level5, string Level6)
        {
            string returnstring = string.Empty;
            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@Level3id-int", "1");
                _nvCollection.Add("@Level4id-int", Level4);
                _nvCollection.Add("@Level5id-int", Level5);
                _nvCollection.Add("@Level6id-int", Level6);
                var flmid = GetData("sp_GetContactPointDetails", _nvCollection).Tables[0];
                if (flmid != null)
                {
                    returnstring = flmid.ToJsonString();
                }
                else
                {
                    returnstring = "No";
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return returnstring;
        }

         [WebMethod(EnableSession = true)]
        public string FillGridMioInfoLastvist(string Level4, string Level5, string Level6, string check)
        {
            string returnstring = "";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            _nvCollection.Clear();
            string spname = "";
            try
            {
                if (check == "RSM")
                {
                    spname = "sp_selectempwithhierarFlm";
                }
                else
                {
                    spname = "sp_selectempwithhierar";
                }
                Level4 = (Level4 == "0") ? "1" : Level4;
                _nvCollection.Add("@level4id-int", Level4);
                _nvCollection.Add("@level5id-int", Level5);
                _nvCollection.Add("@level6id-int", Level6);
                DataSet ds = GetData(spname, _nvCollection);
                var empid = 0;
                var empdetail = new DataSet();
                if (ds.Tables[0].Rows.Count > 0 || ds != null)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        if (check == "RSM")
                        {
                            empid = Convert.ToInt32(dr["flmid"].ToString());
                            returnstring += Mfillflmdetailslastvisit(empid.ToString(),"FLM") + "|";
                        }
                        else
                        {
                            empid = Convert.ToInt32(dr["id"].ToString());
                            _nvCollection.Clear();
                            _nvCollection.Add("@empid-int", empid.ToString());
                            empdetail = GetData("GetEmployeeDataLastVisit", _nvCollection);
                            if (ds.Tables[0].Rows.Count > 0 || ds != null)
                            {
                                returnstring += ToJsonString(empdetail.Tables[0]) + "|";
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return returnstring;
        }
        [WebMethod(EnableSession = true)]
         public string Mfillflmdetailslastvisit(string empid, string type)
        {
            //////////////////////////////////////////////////////////////////////////////////////////////////////////
            string returnstring = string.Empty;
            
                var flmdetails = new DataTable();
                var flmid = new DataTable();
                var empdetail = new DataSet();
               _nvCollection.Clear();
               _nvCollection.Add("@flmid-int", empid);

                // Returns FLM Name With ID As DataTable
                flmdetails = GetData("sp_flmempid", _nvCollection).Tables[0];
                
                ArrayList lst = new ArrayList();
                ArrayList flmname = new ArrayList();
                ArrayList flmmob = new ArrayList();
                ArrayList flmemail = new ArrayList();
                foreach (DataRow drr in flmdetails.Rows)
                {
                    lst.Add(drr[3]);
                    flmname.Add(drr[1]);
                    flmmob.Add(drr[4]);
                    flmemail.Add(drr[5]);
                }
                var empidd = "";
                for (int i = 0; i < lst.Count; i++)
                {
                    empidd = lst[i].ToString();
                    _nvCollection.Clear();
                    _nvCollection.Add("@empid-int", empidd);
                    _nvCollection.Add("@flmid-int", empid);
                    empdetail = GetData("GetEmpLastFLMVisitwithCoaching_New", _nvCollection);
                    if (empdetail.Tables[0].Rows.Count != 0)
                    {
                        empdetail.Tables[0].Columns.Add("FlmName", typeof(string));
                       
                        //empdetail.Tables[0].Columns.Add("Flmobile", typeof(string));
                        //empdetail.Tables[0].Rows[0]["Flmobile"] = flmmob[i].ToString();
                        //empdetail.Tables[0].Columns.Add("Flmemail", typeof(string));
                        //empdetail.Tables[0].Rows[0]["Flmemail"] = flmemail[i].ToString();
                        empdetail.Tables[0].Columns.Add("Type", typeof(string));
                        for (int j = 0; j < empdetail.Tables[0].Rows.Count; j++)
                        {
                            empdetail.Tables[0].Rows[j]["FlmName"] = flmname[i].ToString();
                            empdetail.Tables[0].Rows[j]["Type"] = type;
                        }
                    
                        returnstring = ToJsonString(empdetail.Tables[0]);
                    }
                    else
                    {
                        //DataRow newrow = empdetail.Tables[0].NewRow();
                        //empdetail.Tables[0].Columns.Add("FlmName", typeof(string));
                        //newrow["FlmName"] = flmname[i].ToString();
                        ////empdetail.Tables[0].Rows[0]["FlmName"] = newrow["FlmName"];
                        //empdetail.Tables[0].Columns.Add("Flmobile", typeof(string));
                        //newrow["Flmobile"] = flmmob[i].ToString();
                        //empdetail.Tables[0].Columns.Add("Flmemail", typeof(string));
                        //newrow["Flmemail"] = flmemail[i].ToString();
                        //empdetail.Tables[0].Columns.Add("Type", typeof(string));
                        //newrow["Type"] = type;
                        ////empdetail.Tables[0].Rows[0]["Flmobile"] = flmmob[i].ToString();
                        //newrow["TimeForCall"] = "00:00";
                        //newrow["name"] = "--";
                        //newrow["lastdocvisit"] = "--";
                        //newrow["nextdoc"] = "--";
                        ////newrow["noofdocvisited"] = "0";
                        ////newrow["mobno"] = "--";
                        ////newrow["Latitude"] = "";
                        ////newrow["Longitude"] = "";
                        //empdetail.Tables[0].Rows.Add(newrow);
                        returnstring += ToJsonString(empdetail.Tables[0]);
                    }
                }
           
            return returnstring;
        }

         [WebMethod(EnableSession = true)]
        public string MfillMIOdetailslastvisit(string empid, string type)
        {
            string returnstring = string.Empty;
            try
            
            { var empdetail = new DataSet();

                    _nvCollection.Clear();
                    _nvCollection.Add("@empid-int", empid);
                    empdetail = GetData("GetEmployeeDataLastVisit", _nvCollection);
                    if (empdetail.Tables[0].Rows.Count != 0)
                    {

                        returnstring = ToJsonString(empdetail.Tables[0]);
                    }
                    else 
                    {
                        returnstring = "[]";
                    }
                  
                
            }
            catch (Exception ex)
            {

                throw;
            }
            return returnstring;
        }
    }
}

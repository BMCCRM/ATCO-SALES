using System;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Security;
using System.Web.Services;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using PocketDCR2.Classes;

namespace PocketDCR2.Handler
{
    /// <summary>
    /// Summary description for WebService1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService1 : System.Web.Services.WebService
    {
        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;
        readonly DAL dl = new DAL();

        [WebMethod]
        public string login(string userid,string pass)
        {
            _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
            _currentUser = (SystemUser)Membership.GetUser(userid, true);
            
            var isvalidUser = (from p in _dataContext.Employees
                               where p.LoginId == userid
                               where p.IsActive == true
                               select p).FirstOrDefault();
            if (isvalidUser != null)
            {
                if (!Membership.ValidateUser(userid, pass))
                {
                    return "Not Allowed";
                }
                else
                {
                    var roleId = _dataContext.sp_EmploeesInRolesSelect(null, Convert.ToInt64(_currentUser.EmployeeId)).ToList();
                    
                    string role=roleId[0].SystemRole.RoleName.ToString();
                   
                   
                    if(role=="RL6")
                    {
                        string name = roleId[0].Employee.FirstName.ToString() + " " + roleId[0].Employee.LastName.ToString();
                        return name;
                    }
                    else
                    {
                        return "Only MIO Allowed";
                    }
                }
            }
            else
            {
                    return "The username is not active.";
            }
            
        }
        [WebMethod]
        public string dayview(string date,string phno)
        {
            _currentUser = (SystemUser)Membership.GetUser(phno, true);
            int EmployeeID = Convert.ToInt32(_currentUser.EmployeeId);
            var returnString = "";
            var dat = Convert.ToDateTime(date);
            var dsDayViewReslt = dl.GetData("Call_GetSchedulerDayView", new NameValueCollection { { "@EmployeeId-INT", EmployeeID.ToString() }, { "@PlanDateTime-DATETIME", dat.ToString() } });
            if (dsDayViewReslt != null)
            {
                returnString = dsDayViewReslt.Tables[0].ToJsonString();
            }
            return returnString;
            //string[] data = date.Split('/');
            //SqlConnection con = new SqlConnection(Constants.GetConnectionString());
            //con.Open();
            //SqlCommand cmd = new SqlCommand("SELECT * FROM v_MIO_Planing WHERE " + data[0] + " = 1 AND EmployeeId = (select EmployeeId FROM [Employees] where LoginId=\'" + phno + "\') AND MONTH(TiemStamp) = " + data[1] + " AND YEAR(TiemStamp) = " + data[2] + "", con);
            //SqlDataReader sdr = cmd.ExecuteReader();
            //string dat="";
            //while(sdr.Read())
            //{
            //    for (int j = 0; j < sdr.FieldCount; j++)
            //    {
            //        if (sdr.FieldCount-j!=1)
            //        {
            //            object val = sdr[j];
            //            dat += val.ToString() + "~";
            //        }
            //        else
            //        {
            //            object val = sdr[j];
            //            dat += val.ToString();
            //        }
                    
            //    }
            //    dat += "\n";
            //}
            //con.Close();
            //return dat;

        }

        [WebMethod]
        public string prod()
        {



            
            
            SqlConnection con = new SqlConnection(Constants.GetConnectionString());
            SqlCommand cmd = new SqlCommand();


            cmd = new SqlCommand("sp_ProductSkuSelect0", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@SkuId", SqlDbType.Int).Value = DBNull.Value;
            cmd.Parameters.Add("@SKUCode", SqlDbType.NVarChar).Value = DBNull.Value;
            cmd.Parameters.Add("@SkuName", SqlDbType.NVarChar).Value = DBNull.Value;
            con.Open();
            SqlDataReader sdr;
            string dat = "";
            sdr = cmd.ExecuteReader();
            while (sdr.Read())
            {
                for (int j = 0; j < sdr.FieldCount; j++)
                {
                    if (sdr.FieldCount - j != 1)
                    {
                        object val = sdr[j];
                        dat += val.ToString() + "~";
                    }
                    else
                    {
                        object val = sdr[j];
                        dat += val.ToString();
                    }

                }
                dat += "\n";
            }
            con.Close();
            return dat;
        }
        [WebMethod]
        public string gift()
        {
            SqlConnection con = new SqlConnection(Constants.GetConnectionString());
            SqlCommand cmd = new SqlCommand();


            cmd = new SqlCommand("sp_GiftItemsSelect", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@GiftId", SqlDbType.Int).Value = DBNull.Value;
            cmd.Parameters.Add("@GiftCode", SqlDbType.NVarChar).Value = DBNull.Value;
            cmd.Parameters.Add("@GiftName", SqlDbType.NVarChar).Value = DBNull.Value;
            con.Open();
            SqlDataReader sdr;
            string dat = "";
            sdr = cmd.ExecuteReader();
            while (sdr.Read())
            {
                for (int j = 0; j < sdr.FieldCount; j++)
                {
                    if (sdr.FieldCount - j != 1)
                    {
                        object val = sdr[j];
                        dat += val.ToString() + "~";
                    }
                    else
                    {
                        object val = sdr[j];
                        dat += val.ToString();
                    }

                }
                dat += "\n";
            }
            con.Close();
            return dat;
        }

        [WebMethod]
        public string Reason()
        {
            SqlConnection con = new SqlConnection(Constants.GetConnectionString());
            SqlCommand cmd = new SqlCommand();


            cmd = new SqlCommand("ReasonsofCalls_GetAllReason", con);
            cmd.CommandType = CommandType.StoredProcedure;

            con.Open();
            SqlDataReader sdr;
            string dat = "";
            sdr = cmd.ExecuteReader();
            while (sdr.Read())
            {
                for (int j = 0; j < sdr.FieldCount; j++)
                {
                    if (sdr.FieldCount - j != 1)
                    {
                        object val = sdr[j];
                        dat += val.ToString() + "~";
                    }
                    else
                    {
                        object val = sdr[j];
                        dat += val.ToString();
                    }

                }
                dat += "\n";
            }
            con.Close();
            return dat;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Web;

namespace PocketDCR2.Classes
{
    public class GenericUtilityClass // Use This Class For Generic Public Methods --Arsal
    {
        public string createMenu(long EmployeeID)
        {

            DAL dl = new DAL();
            NameValueCollection nv = new NameValueCollection();


            try
            {
                nv.Clear();

                nv.Add("@EmpID-int", EmployeeID.ToString());
                DataTable MenuData = dl.GetData("sp_GetAllMenuItemByEmployeeID", nv).Tables[0];
                StringBuilder str = new StringBuilder();

                DataView view = new DataView(MenuData);
                DataTable distinctValues = view.ToTable(true, "ModuleName");

                var listKeys = distinctValues.AsEnumerable().Select(r => r.Field<string>("ModuleName")).ToArray();

                var menuGroup = new Dictionary<string, dynamic>();

                foreach (var moduleName in listKeys)
                {
                    if (moduleName != "")
                    {
                        DataRow[] rows = MenuData.Select("ModuleName='" + moduleName + "' AND ModuleName <> ''");
                        Dictionary<string, List<string>> menuEntityContainer = new Dictionary<string, List<string>>();

                        foreach (var row in rows)
                        {
                            string menuName = row["MenuName"].ToString();
                            string pageName = row["PageName"].ToString();
                            string pagePath = row["PagePath"].ToString();


                            if (menuEntityContainer.ContainsKey(menuName))
                            {
                                var menuList = menuEntityContainer[menuName];
                                menuList.Add(String.Format(@"{0}|{1}", pagePath, pageName));
                                menuEntityContainer[menuName] = menuList;
                            }
                            else
                            {
                                List<string> menuList = new List<string>();
                                menuList.Add(String.Format(@"{0}|{1}", pagePath, pageName));
                                menuEntityContainer[menuName] = menuList;

                            }

                        }

                        menuGroup.Add(moduleName, menuEntityContainer);
                    }
                }

                str.Append("<ul>"); // Main UL Container --Arsal

                foreach (var keyy in menuGroup)
                {

                    var menuEntityContainer = menuGroup[keyy.Key];
                    
                    str.Append("<li  class='active has-sub'>");
                    str.Append("<a href='Javascript:void(0)'>" + keyy.Key + "</a>");
                    str.Append("<ul>");
                    
                    foreach (var item in menuEntityContainer) // Finally Creating Menu --Arsal
                    {

                        if (item.Key == "")
                        {
                            foreach (var menu in item.Value)
                            {
                                string pagePath = menu.Split('|')[0];
                                string pageName = menu.Split('|')[1];

                                str.Append(String.Format(@"<li><a href=""{0}"">{1}</a></li>", pagePath, pageName));
                            }
                        }
                        else
                        {

                            str.Append(String.Format(@"<li class='active has-sub'><a href='Javascript:void(0)'>{0}</a>", item.Key));
                            str.Append("<ul>");
                            foreach (var menu in item.Value)
                            {
                                string pagePath = menu.Split('|')[0];
                                string pageName = menu.Split('|')[1];

                                str.Append(String.Format(@"<li><a href=""{0}"">{1}</a></li>", pagePath, pageName));
                            }

                            str.Append("</ul></li>");
                        }
                    }

                    str.Append("</ul>");

                }

                str.Append("</ul>");

                return str.ToString();

            }
            catch (Exception ex)
            {

                Constants.ErrorLog(ex.StackTrace);
                return "Some Error, Please Contact Administrator To Check Error Log";
            }

        }


        public static string GetIPAddress(HttpRequest Request)
        {
            try
            {
                if (Request.Headers["CF-CONNECTING-IP"] != null) return Request.Headers["CF-CONNECTING-IP"].ToString();

                if (Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null)
                {
                    string ipAddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

                    if (!string.IsNullOrEmpty(ipAddress))
                    {
                        string[] addresses = ipAddress.Split(',');
                        if (addresses.Length != 0)
                        {
                            return addresses[0];
                        }
                    }
                }
                return Request.UserHostAddress;
            }
            catch (Exception ex)
            {

                Constants.ErrorLog(ex.StackTrace);
                return "NULL";
            }



        }


        public static string CreateLoginLog(long EmployeeID, string IPAddress)
        {
            try
            {
                var nv = new NameValueCollection();
                nv.Add("@EmployeeID-int", EmployeeID.ToString());
                nv.Add("@IPAddress-int", IPAddress);

                return  (new DAL()).GetData("sp_LoginHit", nv).Tables[0].Rows[0][0].ToString();

            }
            catch (Exception ex)
            {

                Constants.ErrorLog(ex.StackTrace);
                return "";
            }
           
        }

        public static void CreateActionLog(OperationMethod action, OperationOn operationOn, String methodName, Object actionBy)
        {
            try
            {
                if (actionBy == null || actionBy.ToString() == "")
                    actionBy = "NULL";


                var nv = new NameValueCollection();
                nv.Add("@ActivityType-var", action.ToString());
                nv.Add("@ActivityOn-var", operationOn.ToString());
                nv.Add("@MethodUsed-var", methodName);
                nv.Add("@ActivityBy-var", actionBy.ToString());

                (new DAL()).GetData("sp_CreateActionLog", nv);

                // Usage Example Below: --Arsal
                // GenericUtilityClass.CreateActionLog(OperationMethod.DELETE, OperationOn.Doctor, GenericUtilityClass.GetCurrentMethod(), Session["EmployeeID"]);

            }
            catch (Exception ex)
            {


                Constants.ErrorLog(ex.StackTrace);
            }

        }



        public static void CreateBrowseLog(String PageName, String PageURL, Object actionBy, Object sessionDatabaseLoginID)
        {

            try
            {

                if (actionBy == null || actionBy.ToString() == "")
                    actionBy = "NULL";

                if (sessionDatabaseLoginID == null || sessionDatabaseLoginID.ToString() == "")
                    sessionDatabaseLoginID = "NULL";

                var nv = new NameValueCollection();
                nv.Add("@PageName-var", PageName);
                nv.Add("@PageURL-var", PageURL);
                nv.Add("@sessionDatabaseLoginID-var", sessionDatabaseLoginID.ToString());
                nv.Add("@ActivityBy-var", actionBy.ToString());

                (new DAL()).GetData("sp_CreateBrowseLog", nv);
            }
            catch (Exception ex)
            {

                Constants.ErrorLog(ex.StackTrace);
            }


        }



        [MethodImpl(MethodImplOptions.NoInlining)]
        public static string GetCurrentMethod()
        {
            // Use This Method For Getting Current MethodName --Arsal
            var st = new StackTrace();
            var sf = st.GetFrame(1);

            return sf.GetMethod().Name;
        }




    }
}


public enum OperationMethod
{
    // Use: For Defining Operation Types For Log -- ARSAL //
    CREATE,
    READ,
    UPDATE,
    DELETE,
    MIXED

};


public enum OperationOn
{
    // Use: For Defining Action Operating On For Log -- ARSAL //

    Employee,
    EmployeeDesignation,

    Doctor,
    DoctorDesignation,
    DoctorClass,
    DoctorSpeciality,

    Product,
    ProductBrand,
    ProductForm,
    ProductPackageSize,
    ProductStrenght,
    ProductSKU

};


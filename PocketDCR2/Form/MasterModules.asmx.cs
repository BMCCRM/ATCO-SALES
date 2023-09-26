using System;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;
using System.Data.SqlClient;
using System.Collections.Specialized;
using System.Data;
namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for MasterModules1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class MasterModules1 : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();

        #endregion

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertModule(string ModuleName, string isActive)
        {
            string returnString = "";

            try
            {
                nv.Clear();
                nv.Add("@ModuleName-nvarchar(100)", ModuleName);
                nv.Add("@IsActive-bit", isActive);
                DataSet ds = dl.GetData("sp_InsertMasterModules", nv);
                if (ds != null)
                {
                    returnString = "OK";
                }
                else
                {
                    returnString = "Error";
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

          [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteModules(string ID)
        {
            string returnString = "";

            try
            {

                nv.Clear();
                nv.Add("@ID-Int", ID.ToString());
                DataSet ds = dl.GetData("Sp_DeleteMasterModules", nv);
                if (ds.Tables[0].Rows[0]["Column1"].ToString() == "Already Exists")
                {
                    returnString = "Already Exists";
                }
                else if (ds.Tables[0].Rows[0]["Column1"].ToString() == "Deleted")
                {
                    returnString = "Deleted";
                }
                else
                {
                    returnString = "Error";
                }
                

                //nv.Clear();
                //nv.Add("@ID-Int", ID.ToString());
                //DataSet ds = dl.GetData("Sp_DeleteModule", nv);
                //if (ds != null)
                //{
                //    if (ds.Tables[0].Rows.Count == 0)
                //    {
                //        returnString = "OK";
                //    }
                //    else
                //    {
                //        returnString = "Error";
                //    }
                //}
                
            }
            catch (SqlException exception)
            {
            
               returnString = exception.Message;
               
            }

            return returnString;
        }



          [WebMethod]
          [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
          public string GetModules(string ID)
          {
              string returnString = "";

              try
              {

                  nv.Clear();
                  nv.Add("@ModuleID - int", ID.ToString());
                  DataSet ds = dl.GetData("Sp_GetMasterModules", nv);
                  if (ds != null)
                  {
                      if (ds.Tables[0].Rows.Count > 0)
                      {
                          returnString = ds.Tables[0].ToJsonString();
                      }
                  }
                  else
                  {
                      returnString = "Error";
                  }
               
              }
              catch (Exception exception)
              {
                  returnString = exception.Message;
              }

              return returnString;
          }

          [WebMethod]
          [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
          public string UpdateModule(string ID, string ModuleName, string isActive)
          {
              string returnString = "";

              try
              {

                  nv.Clear();
                  nv.Add("@ModuleID - int", ID.ToString());
                  nv.Add("@ModuleName - nvarchar(100)", ModuleName.ToString());
                  nv.Add("@IsActive-bit", isActive);
                  DataSet ds = dl.GetData("Sp_UpdateMasterModules", nv);
                  if (ds != null)
                  {
                      if (ds.Tables[0].Rows.Count > 0)
                      {
                          returnString = "OK";
                      }
                      else
                      {
                          returnString = "Error";
                      }
                  }
                  
              }
              catch (Exception exception)
              {
                  returnString = exception.Message;
              }

              return returnString;
          }


    }
}

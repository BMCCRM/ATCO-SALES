using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Collections.Specialized;
using PocketDCR2.Classes;

namespace PocketDCR2.SalesMod
{
    /// <summary>
    /// Summary description for FileGridList
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class FileGridList : System.Web.Services.WebService
    {
        DAL _dl = new Classes.DAL();
        NameValueCollection _nvCollection = new NameValueCollection();


        [WebMethod(EnableSession = true)]
        public string GetDistName()
        {
            //data
            string returnString = "";

            try
            {
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                string LogiinID = Context.Session["CurrentUserLoginID"].ToString();


                _nvCollection.Add("@LoginID-varchar(200)", LogiinID.ToString());
                DataSet ds = _dl.GetData("sp_GetDistNameBYLoginID", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }





            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod(EnableSession = true)]
        public string GetFilesErrorFree(string date, string distbutorId)
        {
            string returnString = "";
            int year = 0, month = 0, day = 0;

            try
            {
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;
                day = Convert.ToDateTime(date).Day;


                string LogiinID = Context.Session["CurrentUserLoginID"].ToString();
                if (_currentUserRole == "distributoradmin")
                {
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(year));
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    _nvCollection.Add("@LoginID-varchar(200)", LogiinID.ToString());
                    DataSet ds = _dl.GetData("spGetFileGridShow_Dist", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                }
                else
                {
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(year));
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    DataSet ds = _dl.GetData("spGetFileGridShow_errorfree", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                }



            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod(EnableSession = true)]
        public string GetFilesGridList(string date, string distbutorId)
        {
            string returnString = "";
            int year = 0, month = 0, day = 0;

            try
            {
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                year = Convert.ToDateTime(date).Year;

                month = Convert.ToDateTime(date).Month;
                day = Convert.ToDateTime(date).Day;


                string LogiinID = Context.Session["CurrentUserLoginID"].ToString();
                if (_currentUserRole == "distributoradmin")
                {
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    _nvCollection.Add("@LoginID-varchar(200)", LogiinID.ToString());
                    DataSet ds = _dl.GetData("spGetFileGridShow_Dist", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                }
                else
                {
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    DataSet ds = _dl.GetData("spGetFileGridShow", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                }



            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string GetByIdInvoice(int id)
        {
            string returnString = "";


            try
            {


                _nvCollection.Add("@id-int", id.ToString());

                DataSet ds = _dl.GetData("spGetByIdInvoice", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod]
        public string updateInvoiceData(int id, int distributorcode, string productsid, string product, int customerid, string batchno, string townid, string ct)
        {
            string returnString = "";


            try
            {

                _nvCollection.Add("@PK_InvoiceID-int", id.ToString());
                _nvCollection.Add("@DistributeID-int", distributorcode.ToString());
                _nvCollection.Add("@productsid-string", productsid);
                _nvCollection.Add("@product-string", product);
                _nvCollection.Add("@CUSTID-int", customerid.ToString());
                _nvCollection.Add("@BATCHNO-string", batchno);
                _nvCollection.Add("@TOWNID-string", townid);
                _nvCollection.Add("@CT-string", ct);
                DataSet ds = _dl.GetData("spUpdateInvoiceData", _nvCollection);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var abc = ds.Tables[0].Rows[0][0].ToString();
                    if (abc == "OK")
                    {
                        returnString = "OK";
                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }

                }
                else
                {
                    returnString = "Error Occurs";
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod]
        public string GetByIdCustomer(int id)
        {
            string returnString = "";


            try
            {


                _nvCollection.Add("@id-int", id.ToString());

                DataSet ds = _dl.GetData("spGetByIdCustomer", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string ErrorStatusCustBrick(int id)
        {
            string returnString = "";


            try
            {


                _nvCollection.Add("@id-int", id.ToString());

                DataSet ds = _dl.GetData("spGetErrorStatusbrickCust", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string updateCustomerData(int id, int distributorcode, string customername, int cuscustomerid, string town, string custownid, string cusct)
        {
            string returnString = "";


            try
            {

                _nvCollection.Add("@PK_CustID-int", id.ToString());
                _nvCollection.Add("@DSTBID-int", distributorcode.ToString());
                _nvCollection.Add("@CUSTID-int", cuscustomerid.ToString());
                _nvCollection.Add("@CUSTNAME-string", customername);
                _nvCollection.Add("@TOWN-string", town);
                _nvCollection.Add("@TOWNID-string", custownid);
                _nvCollection.Add("@CT-string", cusct);
                DataSet ds = _dl.GetData("spUpdateCustomerData", _nvCollection);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var abc = ds.Tables[0].Rows[0][0].ToString();
                    if (abc == "OK")
                    {
                        returnString = "OK";
                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }

                }
                else
                {
                    returnString = "Error Occurs";
                }


            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string updateCustomerDataMaster(int id, int distributorcode, string customername, int cuscustomerid, string town, string custownid, string cusct)
        {
            string returnString = "";


            try
            {

                _nvCollection.Add("@PK_CustID-int", id.ToString());
                _nvCollection.Add("@DSTBID-int", distributorcode.ToString());
                _nvCollection.Add("@CUSTID-int", cuscustomerid.ToString());
                _nvCollection.Add("@CUSTNAME-string", customername);
                _nvCollection.Add("@TOWN-string", town);
                _nvCollection.Add("@TOWNID-string", custownid);
                _nvCollection.Add("@CT-string", cusct);
                DataSet ds = _dl.GetData("spUpdateCustomerDataMaster", _nvCollection);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var abc = ds.Tables[0].Rows[0][0].ToString();
                    if (abc == "OK")
                    {
                        returnString = "OK";
                    }
                    else if (abc == "SameCode")
                    {
                        returnString = "SameCode";
                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }

                }
                else
                {
                    returnString = "Error Occurs";
                }


            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string updateBricksData(int id, int distributorcode, string customername, int cuscustomerid, string town, string custownid, string cusct)
        {
            string returnString = "";


            try
            {

                _nvCollection.Add("@PK_CustID-int", id.ToString());
                _nvCollection.Add("@DSTBID-int", distributorcode.ToString());
                _nvCollection.Add("@CUSTID-int", cuscustomerid.ToString());
                _nvCollection.Add("@CUSTNAME-string", customername);
                _nvCollection.Add("@TOWN-string", town);
                _nvCollection.Add("@TOWNID-string", custownid);
                _nvCollection.Add("@CT-string", cusct);
                DataSet ds = _dl.GetData("spUpdateBrickData", _nvCollection);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var abc = ds.Tables[0].Rows[0][0].ToString();
                    if (abc == "OK")
                    {
                        returnString = "OK";
                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }

                }
                else
                {
                    returnString = "Error Occurs";
                }


            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string updateBricksMaster(int id, int distributorcode, string customername, int cuscustomerid, string town, string custownid, string cusct)
        {
            string returnString = "";


            try
            {

                _nvCollection.Add("@PK_CustID-int", id.ToString());
                _nvCollection.Add("@DSTBID-int", distributorcode.ToString());
                _nvCollection.Add("@CUSTID-int", cuscustomerid.ToString());
                _nvCollection.Add("@CUSTNAME-string", customername);
                _nvCollection.Add("@TOWN-string", town);
                _nvCollection.Add("@TOWNID-string", custownid);
                _nvCollection.Add("@CT-string", cusct);
                DataSet ds = _dl.GetData("spUpdateBrickDataMaster", _nvCollection);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var abc = ds.Tables[0].Rows[0][0].ToString();
                    if (abc == "OK")
                    {
                        returnString = "OK";
                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }

                }
                else
                {
                    returnString = "Error Occurs";
                }


            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string AddBricksDataMaster(int id, int distributorcode, string customername, int cuscustomerid, string town, string custownid, string cusct)
        {
            string returnString = "";


            try
            {
                _nvCollection.Add("@PK_CustID-int", id.ToString());
                _nvCollection.Add("@DSTBID-int", distributorcode.ToString());
                _nvCollection.Add("@CUSTID-int", cuscustomerid.ToString());
                _nvCollection.Add("@CUSTNAME-string", customername);
                _nvCollection.Add("@TOWN-string", town);
                _nvCollection.Add("@TOWNID-string", custownid);
                _nvCollection.Add("@CT-string", cusct);
                DataSet ds = _dl.GetData("spAddBrickDataMaster", _nvCollection);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var abc = ds.Tables[0].Rows[0][0].ToString();
                    if (abc == "OK")
                    {
                        returnString = "OK";
                    }
                    else if (abc == "SameCode")
                    {
                        returnString = "SameCode";
                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }

                }
                else
                {
                    returnString = "Error Occurs";
                }


            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string AddCustomerDataMaster(int id, int distributorcode, string customername, int cuscustomerid, string town, string custownid, string cusct)
        {
            string returnString = "";


            try
            {

                _nvCollection.Add("@PK_CustID-int", id.ToString());
                _nvCollection.Add("@DSTBID-int", distributorcode.ToString());
                _nvCollection.Add("@CUSTID-int", cuscustomerid.ToString());
                _nvCollection.Add("@CUSTNAME-string", customername);
                _nvCollection.Add("@TOWN-string", town);
                _nvCollection.Add("@TOWNID-string", custownid);
                _nvCollection.Add("@CT-string", cusct);
                DataSet ds = _dl.GetData("spAddCustomerDataMaster", _nvCollection);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var abc = ds.Tables[0].Rows[0][0].ToString();
                    if (abc == "OK")
                    {
                        returnString = "OK";
                    }
                    else if (abc == "already")
                    {
                        returnString = "already";
                    }
                    else
                    {
                        returnString = "error";
                    }

                }
                else
                {
                    returnString = "Error Occurs";
                }


            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        //Stock Api Here

        [WebMethod]
        public string GetByIdStock(int id)
        {
            string returnString = "";


            try
            {


                _nvCollection.Add("@id-int", id.ToString());

                DataSet ds = _dl.GetData("spGetByIdStock", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }



        [WebMethod]
        public string updateStockData(int id, string stkdistributorcode, string stkproduct, string stkproductid, string stkbatchno)
        {
            string returnString = "";


            try
            {

                _nvCollection.Add("@Pk_StockID-int", id.ToString());
                _nvCollection.Add("@DSTBID-string", stkdistributorcode);
                _nvCollection.Add("@Product-string", stkproduct);
                _nvCollection.Add("@ProductId-string", stkproductid);
                _nvCollection.Add("@BATCHNO-string", stkbatchno);
                //_nvCollection.Add("@TOWNID-string", custownid);
                //_nvCollection.Add("@CT-string", cusct);
                DataSet ds = _dl.GetData("spUpdateStockData", _nvCollection);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var abc = ds.Tables[0].Rows[0][0].ToString();
                    if (abc == "OK")
                    {
                        returnString = "OK";
                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }

                }
                else
                {
                    returnString = "Error Occurs";
                }


                //if (ds.Tables[0].Rows.Count > 0) 
                //{
                //    returnString = ds.Tables[0].ToJsonString();
                //}


            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }



        [WebMethod]
        public string RevalidateInvoiceData(int id)
        {
            string returnString = "";


            try
            {


                _nvCollection.Add("@fkFileId-int", id.ToString());

                DataSet ds = _dl.GetData("spInvoiceRevalidate", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    var abc = ds.Tables[0].Rows[0][0].ToString();
                    if (abc == "Validate Successfully")
                    {
                        returnString = "OK";
                    }
                    else
                    {
                        returnString = "Data Not Found";
                    }





                }
                else
                {
                    returnString = "Error Occurs";
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod]
        public string RevalidateCustomerData(int id)
        {
            string returnString = "";


            try
            {

                _nvCollection.Add("@fkFileId-int", id.ToString());

                DataSet ds = _dl.GetData("spCustomerRevalidate", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    var abc = ds.Tables[0].Rows[0][0].ToString();
                    if (abc == "Validate Successfully")
                    {
                        returnString = "OK";
                    }
                    else
                    {
                        returnString = "Data Not Found";
                    }

                }
                else
                {
                    returnString = "Error Occurs";
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod]
        public string RevalidateStockData(int id)
        {
            string returnString = "";

            try
            {
                _nvCollection.Add("@fkFileId-int", id.ToString());

                DataSet ds = _dl.GetData("spStockRevalidate", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    var abc = ds.Tables[0].Rows[0][0].ToString();
                    if (abc == "Validate Successfully")
                    {
                        returnString = "OK";
                    }
                    else
                    {
                        returnString = "Data Not Found";
                    }
                }
                else
                {
                    returnString = "Error Occurs";
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }



        [WebMethod]
        public string SendInvoiceData(int id)
        {
            string returnString = "";


            try
            {


                _nvCollection.Add("@fkFileId-int", id.ToString());

                DataSet ds = _dl.GetData("spSendActualData", _nvCollection);

                //if (ds.Tables[0].Rows.Count > 0)
                //{
                //    returnString = ds.Tables[0].ToJsonString();
                //}
                returnString = "Ok";
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }



        [WebMethod]
        public string SendCustomerData(int id)
        {
            string returnString = "";


            try
            {


                _nvCollection.Add("@fkFileId-int", id.ToString());

                DataSet ds = _dl.GetData("spSendActualCustomerData", _nvCollection);

                //if (ds.Tables[0].Rows.Count > 0)
                //{
                //    returnString = ds.Tables[0].ToJsonString();
                //}
                returnString = "Ok";
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod]
        public string SendStockData(int id)
        {
            string returnString = "";


            try
            {


                _nvCollection.Add("@fkFileId-int", id.ToString());

                DataSet ds = _dl.GetData("spSendActualStockData", _nvCollection);

                //if (ds.Tables[0].Rows.Count > 0)
                //{
                //    returnString = ds.Tables[0].ToJsonString();
                //}
                returnString = "Ok";
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod]
        public string GetTownList(int id)
        {
            string returnString = "";


            try
            {


                _nvCollection.Add("@distId-int", id.ToString());

                DataSet ds = _dl.GetData("spGetTownList", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
                // returnString = "Ok";
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod]
        public string GetClientList(int id)
        {
            string returnString = "";


            try
            {


                _nvCollection.Add("@distId-int", id.ToString());

                DataSet ds = _dl.GetData("spGetClientList", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
                // returnString = "Ok";
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod]
        public string GetProductList(int id)
        {
            string returnString = "";


            try
            {


                _nvCollection.Add("@distId-int", id.ToString());

                DataSet ds = _dl.GetData("spGetProductList", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
                // returnString = "Ok";
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod]
        public string SendDbDataInInvoice(int id)
        {
            string returnString = "";


            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@FK_FileId-int", id.ToString());
                DataSet ds1 = _dl.GetData("sp_CheckInvoceprocess", _nvCollection);
                if (ds1.Tables[0].Rows.Count > 0)
                {
                    var abc = ds1.Tables[0].Rows[0][0].ToString();
                    if (abc == "1")
                    {
                        returnString = "Already inserted";
                    }
                    else
                    {
                        _nvCollection.Clear();
                        _nvCollection.Add("@FK_FileId-int", id.ToString());
                        DataSet ds = _dl.GetData("sp_SendDataInInvoice", _nvCollection);
                        var test1 = ds.Tables[0].Rows[0][0].ToString();
                        if (test1 == "OK")
                        {
                            returnString = "OK";
                        }
                        else
                        {
                            returnString = "Error In inserted";
                        }

                    }
                }
                else
                {
                    returnString = "Error In inserted";
                }

                //if (ds.Tables[0].Rows.Count > 0)
                //{
                //    returnString = ds.Tables[0].ToJsonString();
                //}
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string GetCustomerListValidation(int id, int DistributeId)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@FkFileId-int", id.ToString());
                _nvCollection.Add("@DistId-int", DistributeId.ToString());
                DataSet ds = _dl.GetData("getCustomerListValidation", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string GetStockListValidation(int id, int DistributeId)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@FkFileId-int", id.ToString());
                _nvCollection.Add("@DistId-int", DistributeId.ToString());
                DataSet ds = _dl.GetData("getStockListValidation", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        // [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetInvoiceListValidation(int id, int DistributeId)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@FkFileId-int", id.ToString());
                _nvCollection.Add("@DistId-int", DistributeId.ToString());
                DataSet ds = _dl.GetData("getInvoiceListValidation", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]
        public string GetOverAllDataList(string distbutorId, string date)
        {
            string returnString = "";
            string returnString1 = "";
            string returnString2 = "";
            int year = 0, month = 0, day = 0;
            string results = "";
            string distId = "NULL";
            int result1 = 0;

            try
            {
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);


                if (date != "NULL" && distbutorId != "NULL")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                    day = Convert.ToDateTime(date).Day;
                    distId = distbutorId;
                }

                if (_currentUserRole == "distributoradmin")
                {
                    string _CurrentUserLoginId = Convert.ToString(Session["CurrentUserLoginId"]);
                    distId = _CurrentUserLoginId;

                    _nvCollection.Clear();
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@DistId-int", distId.ToString());
                    DataSet ds = _dl.GetData("spGetFileGrid1", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString1 = ds.Tables[0].ToJsonString();
                        returnString2 = ds.Tables[1].ToJsonString();

                        result1 = returnString1.Length - 1;

                        returnString1 = returnString1.Substring(0, result1);
                        results = ",";
                        returnString2 = returnString2.Substring(1, returnString2.Length - 1);

                        returnString = returnString1 + results + returnString2;
                    }
                }
                else
                {
                    _nvCollection.Clear();
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@DistId-int", distId.ToString());
                    DataSet ds = _dl.GetData("spGetFileGrid1", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString1 = ds.Tables[0].ToJsonString();
                        returnString2 = ds.Tables[1].ToJsonString();

                        result1 = returnString1.Length - 1;

                        returnString1 = returnString1.Substring(0, result1);
                        results = ",";
                        returnString2 = returnString2.Substring(1, returnString2.Length - 1);

                        returnString = returnString1 + results + returnString2;
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]
        public string GetOverAllDataListByDate(string date, string distbutorId)
        {
            string returnString = "";
            string returnString1 = "";
            string returnString2 = "";
            string results = "";
            int result1 = 0;
            int year = 0, month = 0, day = 0;
            try
            {
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;
                day = Convert.ToDateTime(date).Day;


                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                if (_currentUserRole == "distributoradmin")
                {
                    string _CurrentUserLoginId = Convert.ToString(Session["CurrentUserLoginId"]);
                    distbutorId = _CurrentUserLoginId;
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    DataSet ds = _dl.GetData("spGetFileGrid1D", _nvCollection);
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        //returnString = ds.Tables[0].ToJsonString();

                        returnString1 = ds.Tables[0].ToJsonString();
                        returnString2 = ds.Tables[1].ToJsonString();

                        result1 = returnString1.Length - 1;

                        returnString1 = returnString1.Substring(0, result1);
                        results = ",";
                        returnString2 = returnString2.Substring(1, returnString2.Length - 1);

                        returnString = returnString1 + results + returnString2;
                    }
                }
                else
                {
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    DataSet ds = _dl.GetData("spGetFileGrid1D", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        //returnString = ds.Tables[0].ToJsonString();

                        returnString1 = ds.Tables[0].ToJsonString();
                        returnString2 = ds.Tables[1].ToJsonString();

                        result1 = returnString1.Length - 1;

                        returnString1 = returnString1.Substring(0, result1);
                        results = ",";
                        returnString2 = returnString2.Substring(1, returnString2.Length - 1);

                        returnString = returnString1 + results + returnString2;
                    }

                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]
        public string GetErrorFreeFileList(string distbutorId, string date)
        {
            string returnString = "";
            string returnString1 = "";
            string returnString2 = "";
            int year = 0, month = 0, day = 0;
            string results = "";
            string distId = "NULL";
            int result1 = 0;

            try
            {
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                if (date != "NULL" && distbutorId != "NULL")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                    day = Convert.ToDateTime(date).Day;
                    distId = distbutorId;
                }
                if (_currentUserRole == "distributoradmin")
                {
                    string _CurrentUserLoginId = Convert.ToString(Session["CurrentUserLoginId"]);
                    distbutorId = _CurrentUserLoginId;
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    DataSet ds = _dl.GetData("spGetFileGrid2", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString1 = ds.Tables[0].ToJsonString();
                        returnString2 = ds.Tables[1].ToJsonString();

                        result1 = returnString1.Length - 1;

                        returnString1 = returnString1.Substring(0, result1);
                        results = ",";
                        returnString2 = returnString2.Substring(1, returnString2.Length - 1);

                        returnString = returnString1 + results + returnString2;
                    }
                }
                else
                {
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@DistId-int", distId.ToString());
                    DataSet ds = _dl.GetData("spGetFileGrid2", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString1 = ds.Tables[0].ToJsonString();
                        returnString2 = ds.Tables[1].ToJsonString();

                        result1 = returnString1.Length - 1;

                        returnString1 = returnString1.Substring(0, result1);
                        results = ",";
                        returnString2 = returnString2.Substring(1, returnString2.Length - 1);

                        returnString = returnString1 + results + returnString2;
                    }
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]
        public string GetErrorFreeListByDate(string date, string distbutorId)
        {
            string returnString = "";
            string returnString1 = "";
            string returnString2 = "";
            string results = "";
            int result1 = 0;
            int year = 0, month = 0, day = 0;
            try
            {

                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;
                day = Convert.ToDateTime(date).Day;


                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                if (_currentUserRole == "distributoradmin")
                {
                    string _CurrentUserLoginId = Convert.ToString(Session["CurrentUserLoginId"]);
                    distbutorId = _CurrentUserLoginId;

                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    DataSet ds = _dl.GetData("spGetFileGrid2D", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        //returnString = ds.Tables[0].ToJsonString();

                        returnString1 = ds.Tables[0].ToJsonString();
                        returnString2 = ds.Tables[1].ToJsonString();

                        result1 = returnString1.Length - 1;

                        returnString1 = returnString1.Substring(0, result1);
                        results = ",";
                        returnString2 = returnString2.Substring(1, returnString2.Length - 1);

                        returnString = returnString1 + results + returnString2;
                    }
                }
                else
                {
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    DataSet ds = _dl.GetData("spGetFileGrid2D", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        //returnString = ds.Tables[0].ToJsonString();

                        returnString1 = ds.Tables[0].ToJsonString();
                        returnString2 = ds.Tables[1].ToJsonString();

                        result1 = returnString1.Length - 1;

                        returnString1 = returnString1.Substring(0, result1);
                        results = ",";
                        returnString2 = returnString2.Substring(1, returnString2.Length - 1);

                        returnString = returnString1 + results + returnString2;
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]
        public string GetUploadDoneFileList(string distbutorId, string date)
        {
            string returnString = "";
            string returnString1 = "";
            string returnString2 = "";
            int year = 0, month = 0, day = 0;
            string results = "";
            string distId = "NULL";
            int result1 = 0;

            try
            {
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                if (date != "NULL" && distbutorId != "NULL")
                {
                    year = Convert.ToDateTime(date).Year;
                    month = Convert.ToDateTime(date).Month;
                    day = Convert.ToDateTime(date).Day;
                    distId = distbutorId;
                }
                if (_currentUserRole == "distributoradmin")
                {
                    string _CurrentUserLoginId = Convert.ToString(Session["CurrentUserLoginId"]);
                    distbutorId = _CurrentUserLoginId;

                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    DataSet ds = _dl.GetData("spGetFileGrid3", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString1 = ds.Tables[0].ToJsonString();
                        returnString2 = ds.Tables[1].ToJsonString();

                        result1 = returnString1.Length - 1;

                        returnString1 = returnString1.Substring(0, result1);
                        results = ",";
                        returnString2 = returnString2.Substring(1, returnString2.Length - 1);

                        returnString = returnString1 + results + returnString2;
                    }
                }
                else
                {
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@DistId-int", distId.ToString());
                    DataSet ds = _dl.GetData("spGetFileGrid3", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString1 = ds.Tables[0].ToJsonString();
                        returnString2 = ds.Tables[1].ToJsonString();

                        result1 = returnString1.Length - 1;

                        returnString1 = returnString1.Substring(0, result1);
                        results = ",";
                        returnString2 = returnString2.Substring(1, returnString2.Length - 1);

                        returnString = returnString1 + results + returnString2;
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]
        public string GetUploadDoneFilesByDate(string date, string distbutorId)
        {
            string returnString = "";
            string returnString1 = "";
            string returnString2 = "";
            string results = "";
            int result1 = 0;
            int year = 0, month = 0, day = 0;
            try
            {


                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;
                day = Convert.ToDateTime(date).Day;

                if (_currentUserRole == "distributoradmin")
                {
                    string _CurrentUserLoginId = Convert.ToString(Session["CurrentUserLoginId"]);
                    distbutorId = _CurrentUserLoginId;

                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    DataSet ds = _dl.GetData("spGetFileGrid3D", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        //returnString = ds.Tables[0].ToJsonString();

                        returnString1 = ds.Tables[0].ToJsonString();
                        returnString2 = ds.Tables[1].ToJsonString();

                        result1 = returnString1.Length - 1;

                        returnString1 = returnString1.Substring(0, result1);
                        results = ",";
                        returnString2 = returnString2.Substring(1, returnString2.Length - 1);

                        returnString = returnString1 + results + returnString2;
                    }
                }
                else
                {
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    DataSet ds = _dl.GetData("spGetFileGrid3D", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        //returnString = ds.Tables[0].ToJsonString();

                        returnString1 = ds.Tables[0].ToJsonString();
                        returnString2 = ds.Tables[1].ToJsonString();

                        result1 = returnString1.Length - 1;

                        returnString1 = returnString1.Substring(0, result1);
                        results = ",";
                        returnString2 = returnString2.Substring(1, returnString2.Length - 1);

                        returnString = returnString1 + results + returnString2;
                    }

                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }
        //Cust with out Date
        [WebMethod(EnableSession = true)]
        public string GetErrorAnalysisGridListCurrentDateCust(string distbutorId)//string date,
        {
            string returnString = "";
            // int year = 0, month = 0, day = 0;

            try
            {
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                if (_currentUserRole == "distributoradmin")
                {
                    string _CurrentUserLoginId = Convert.ToString(Session["CurrentUserLoginId"]);
                    distbutorId = _CurrentUserLoginId;

                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    DataSet  ds = _dl.GetData("spGetFileError1CurrentDateCust", _nvCollection);

                  

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                }

                else
                {
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());

                    DataSet ds = _dl.GetData("spGetFileError1CurrentDateCust", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        //Cust With Date
        [WebMethod(EnableSession = true)]
        public string GetErrorAnalysisGridListCust(string date, string distbutorId, bool onday)
        {
            string returnString = "";
            int year = 0, month = 0, day = 0;

            try
            {
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;
                day = Convert.ToDateTime(date).Day;

                if (_currentUserRole == "distributoradmin")
                {
                    string _CurrentUserLoginId = Convert.ToString(Session["CurrentUserLoginId"]);
                    distbutorId = _CurrentUserLoginId;

                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    DataSet ds = new DataSet();

                    if (!onday)
                    {
                        ds = _dl.GetData("spGetFileError1Cust", _nvCollection);

                    }
                    else
                    {
                        ds = _dl.GetData("spGetFileError1CustDaywise", _nvCollection);

                    }

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }

                }
                else
                {
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    DataSet ds = new DataSet();

                    if (!onday)
                    {
                        ds = _dl.GetData("spGetFileError1Cust", _nvCollection);

                    }
                    else
                    {
                        ds = _dl.GetData("spGetFileError1CustDaywise", _nvCollection);

                    }

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]
        public string GetErrorAnalysisGridListCurrentDate(string distbutorId)//string date,
        {
            string returnString = "";
            // int year = 0, month = 0, day = 0;

            try
            {
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                if (_currentUserRole == "distributoradmin")
                {
                    string _CurrentUserLoginId = Convert.ToString(Session["CurrentUserLoginId"]);
                    distbutorId = _CurrentUserLoginId;
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    DataSet ds = _dl.GetData("spGetFileError1CurrentDate", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }

                }
                else
                {

                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    DataSet ds = _dl.GetData("spGetFileError1CurrentDate", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]
        public string GetErrorAnalysisGridList(string date, string distbutorId,bool today)
        {
            string returnString = "";
            int year = 0, month = 0, day = 0;

            string istoday = string.Empty;
            if (today)
            {
                istoday = "1";

            }
            else
            {

                istoday = "0";
            }

            try
            {
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);
                year = Convert.ToDateTime(date).Year;
                month = Convert.ToDateTime(date).Month;
                day = Convert.ToDateTime(date).Day;
                if (_currentUserRole == "distributoradmin")
                {
                    string _CurrentUserLoginId = Convert.ToString(Session["CurrentUserLoginId"]);
                    distbutorId = _CurrentUserLoginId;

                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@today-bit", istoday);
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());

                    DataSet ds = _dl.GetData("spGetFileError1", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                }
                else
                {
                    _nvCollection.Add("@Month-int", Convert.ToString(month));
                    _nvCollection.Add("@Year-int", Convert.ToString(year));
                    _nvCollection.Add("@Day-int", Convert.ToString(day));
                    _nvCollection.Add("@DistId-int", distbutorId.ToString());
                    _nvCollection.Add("@today-bit", istoday);


                    DataSet ds = _dl.GetData("spGetFileError1", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string GetRawData(int id)
        {
            string returnString = "";

            try
            {
                _nvCollection.Add("@FK_FileId-int", id.ToString());

                DataSet ds = _dl.GetData("spGetFileError3", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
                // returnString = "Ok";
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]
        public string GetErrorAnalysisGridListdetail(string DistributeCode, string Year, string Month, string id, string Type) //string Date
        {
            string returnString = "";
            int year = 0, month = 0, day = 0;

            try
            {
                string _currentUserRole = Convert.ToString(Session["CurrentUserRole"]);

                //year = Convert.ToDateTime(Date).Year;
                //month = Convert.ToDateTime(Date).Month;
                //day = Convert.ToDateTime(Date).Day;

                //string LogiinID = Context.Session["CurrentUserLoginID"].ToString();

                _nvCollection.Add("@Month-int", Month.ToString());//Convert.ToString(month)
                _nvCollection.Add("@Year-int", Year.ToString()); //Convert.ToString(year)
                _nvCollection.Add("@Day-int", "1");//Convert.ToString(day)
                _nvCollection.Add("@DistributorCode-varchar(250)", DistributeCode.ToString());
                _nvCollection.Add("@FK_FileId-int", id.ToString());

                DataSet ds = Type == "INV" ? _dl.GetData("spGetFileError2", _nvCollection) : _dl.GetData("spGetFileError2Cust", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]
        public string ActionErrorDetails(string comment, string id, string Year, string Month, string Suspect) //string INVDate,
        {
            string returnString = "";
            DataSet ds;
            try
            {
                _nvCollection.Add("@comment-nvarchar(max)", comment.ToString());
                _nvCollection.Add("@id-int", id.ToString());
                _nvCollection.Add("@Year-int", Year.ToString());
                _nvCollection.Add("@Month-int", Month.ToString());

                if (Suspect == "CustIDSuspect" || Suspect == "CustomerIDSuspect")
                {
                    if (comment.Contains("Change of Name of an  already mapped Customer with the old Id"))
                    {
                        ds = _dl.GetData("SP_ErrorActionCustDetailsNew", _nvCollection); //SP_ErrorActionViewDetails
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            returnString = ds.Tables[0].ToJsonString();
                        }
                        else
                        {
                            returnString = "Something went wrong.";
                            // returnString = ds.Tables[0].ToJsonString();
                        }
                    }
                    else
                    {
                        ds = _dl.GetData("SP_ErrorActionCustDetails1", _nvCollection); //SP_ErrorActionViewDetails

                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            returnString = ds.Tables[0].ToJsonString();
                        }
                        else
                        {
                            returnString = "Something went wrong.";
                            // returnString = ds.Tables[0].ToJsonString();
                        }
                    }

                }
                else if (Suspect == "BRICKIDSuspect" || Suspect == "TOWNIDSuspect")
                {
                    if (comment.Contains("Change of Name of an  already mapped brick with the old Id"))
                    {
                        ds = _dl.GetData("SP_ErrorActionBrickDetails1New", _nvCollection);

                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            returnString = ds.Tables[0].ToJsonString();
                        }
                        else
                        {
                            returnString = "Something went wrong.";
                        }

                    }
                    else
                    {

                        ds = _dl.GetData("SP_ErrorActionBrickDetails1", _nvCollection);

                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            returnString = ds.Tables[0].ToJsonString();
                        }
                        else
                        {
                            returnString = "Something went wrong.";
                        }
                    }
                }
                else if (Suspect == "PRODUCTIdSuspect")
                {

                    ds = _dl.GetData("SP_ErrorActionProductDetails2", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                    else
                    {
                        returnString = "Something went wrong.";
                    }
                }
                else
                {
                    returnString = "Error Occurs";
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]
        public string FinalInsertAll(string id)
        {
            string returnString = "";
            try
            {
                _nvCollection.Add("@FK_FileId-int", id.ToString());
                DataSet ds = _dl.GetData("sp_CheckAllErrorFree", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod(EnableSession = true)]
        public string UpdateUploadbrick(string id, string comment, string pkid, string Month, string Year) //int distributorcode, string town, , string cusct
        {
            string returnString = "";
            try
            {
                string[] CUSTPK = id.Split(',');
                //string[] co = comment.Split(',');
                //string[] pkids = pkid.Split(',');
                //string[] mm = Month.Split(',');
                //string[] yy = Year.Split(',');
                for (int i = 0; i < CUSTPK.Length; i++)
                {
                    _nvCollection.Clear();
                    string PK = CUSTPK[i];
                    //string PK1 = co[i];
                    //string PK2 = pkids[i];
                    //string PK3 = mm[i];
                    //string PK4 = yy[i];
                    _nvCollection.Add("@PK_CustID-int", PK.ToString());
                    _nvCollection.Add("@comment-nvarchar(max)", comment.ToString());
                    _nvCollection.Add("@id-int", pkid.ToString());
                    _nvCollection.Add("@Month-int", Month.ToString());
                    _nvCollection.Add("@Year-int(50)", Year.ToString());
                    DataSet ds = _dl.GetData("SP_updateuploaddata", _nvCollection);
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        var abc = ds.Tables[0].Rows[0][0].ToString();
                        if (abc == "OK")
                        {
                            returnString = "OK";
                        }
                        else
                        {
                            returnString = "Error Occur";
                        }

                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }



        [WebMethod(EnableSession = true)]
        public string getUploadedPro(string id, string comment, string pkid, string Month, string Year) //int distributorcode, string town, , string cusct
        {
            string returnString = "";
            try
            {
                string[] CUSTPK = id.Split(',');
                //string[] co = comment.Split(',');
                //string[] pkids = pkid.Split(',');
                //string[] mm = Month.Split(',');
                //string[] yy = Year.Split(',');
                for (int i = 0; i < CUSTPK.Length; i++)
                {
                    _nvCollection.Clear();
                    string PK = CUSTPK[i];
                    //string PK1 = co[i];
                    //string PK2 = pkids[i];
                    //string PK3 = mm[i];
                    //string PK4 = yy[i];
                    _nvCollection.Add("@PK_CustID-int", PK.ToString());
                    _nvCollection.Add("@comment-nvarchar(max)", comment.ToString());
                    _nvCollection.Add("@id-int", pkid.ToString());
                    _nvCollection.Add("@Month-int", Month.ToString());
                    _nvCollection.Add("@Year-int(50)", Year.ToString());
                    DataSet ds = _dl.GetData("SP_UpdateUploadedProd", _nvCollection);
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        var abc = ds.Tables[0].Rows[0][0].ToString();
                        if (abc == "OK")
                        {
                            returnString = "OK";
                        }
                        else
                        {
                            returnString = "Error Occur";
                        }

                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }

        [WebMethod(EnableSession = true)]
        public string getUploadedCustomer(string id, string comment, string pkid, string Month, string Year) //int distributorcode, string town, , string cusct
        {
            string returnString = "";
            try
            {
                string[] CUSTPK = id.Split(',');
                //string[] co = comment.Split(',');
                //string[] pkids = pkid.Split(',');
                //string[] mm = Month.Split(',');
                //string[] yy = Year.Split(',');
                for (int i = 0; i < CUSTPK.Length; i++)
                {
                    _nvCollection.Clear();
                    string PK = CUSTPK[i];

                    _nvCollection.Add("@PK_CustID-nvarchar(max)", PK.ToString());
                    _nvCollection.Add("@comment-nvarchar(max)", comment.ToString());
                    _nvCollection.Add("@id-int", pkid.ToString());
                    _nvCollection.Add("@Month-int", Month.ToString());
                    _nvCollection.Add("@Year-int(50)", Year.ToString());
                    DataSet ds = _dl.GetData("SP_UpdateUploadedCustomer", _nvCollection);
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        var abc = ds.Tables[0].Rows[0][0].ToString();
                        if (abc == "OK")
                        {
                            returnString = "OK";
                        }
                        else
                        {
                            returnString = "Error Occur";
                        }

                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }


        [WebMethod(EnableSession = true)]
        public string OpennewCustomer(string id, string comment, string pkid, string Month, string Year) //int distributorcode, string town, , string cusct
        {
            string returnString = "";
            try
            {
                string[] CUSTPK = id.Split(',');
                for (int i = 0; i < CUSTPK.Length; i++)
                {
                    _nvCollection.Clear();
                    string PK = CUSTPK[i];
                    _nvCollection.Add("@PK_CustID-nvarchar(max)", PK.ToString());
                    _nvCollection.Add("@comment-nvarchar(max)", comment.ToString());
                    _nvCollection.Add("@id-int", pkid.ToString());
                    _nvCollection.Add("@Month-int", Month.ToString());
                    _nvCollection.Add("@Year-int(50)", Year.ToString());
                    DataSet ds = _dl.GetData("SP_OpennewCustomers", _nvCollection);
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        var abc = ds.Tables[0].Rows[0][0].ToString();
                        if (abc == "OK")
                        {
                            returnString = "OK";
                        }
                        else
                        {
                            returnString = "Error Occur";
                        }
                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }


        [WebMethod(EnableSession = true)]
        public string getmasterCustomer(string id, string comment, string pkid, string Month, string Year) //int distributorcode, string town, , string cusct
        {
            string returnString = "";
            try
            {
                string[] CUSTPK = id.Split(',');
                //string[] co = comment.Split(',');
                //string[] pkids = pkid.Split(',');
                //string[] mm = Month.Split(',');
                //string[] yy = Year.Split(',');
                for (int i = 0; i < CUSTPK.Length; i++)
                {
                    _nvCollection.Clear();
                    string PK = CUSTPK[i];

                    _nvCollection.Add("@PK_CustID-nvarchar(max)", PK.ToString());
                    _nvCollection.Add("@comment-nvarchar(max)", comment.ToString());
                    _nvCollection.Add("@id-int", pkid.ToString());
                    _nvCollection.Add("@Month-int", Month.ToString());
                    _nvCollection.Add("@Year-int(50)", Year.ToString());
                    DataSet ds = _dl.GetData("SP_UpdateMasterCustomer", _nvCollection);
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        var abc = ds.Tables[0].Rows[0][0].ToString();
                        if (abc == "OK")
                        {
                            returnString = "OK";
                        }
                        else
                        {
                            returnString = "Error Occur";
                        }

                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }



        [WebMethod(EnableSession = true)]
        public string Updatemasterbrick(string id, string comment, string pkid, string Month, string Year) //int distributorcode, string town, , string cusct
        {
            string returnString = "";
            try
            {
                string[] CUSTPK = id.Split(',');
                //string[] co = comment.Split(',');
                //string[] pkids = pkid.Split(',');
                //string[] mm = Month.Split(',');
                //string[] yy = Year.Split(',');
                for (int i = 0; i < CUSTPK.Length; i++)
                {
                    _nvCollection.Clear();
                    string PK = CUSTPK[i];
                    //string PK1 = co[i];
                    //string PK2 = pkids[i];
                    //string PK3 = mm[i];
                    //string PK4 = yy[i];
                    _nvCollection.Add("@PK_CustID-int", PK.ToString());
                    _nvCollection.Add("@comment-nvarchar(max)", comment.ToString());
                    _nvCollection.Add("@id-int", pkid.ToString());
                    _nvCollection.Add("@Month-int", Month.ToString());
                    _nvCollection.Add("@Year-int(50)", Year.ToString());
                    DataSet ds = _dl.GetData("SP_updatemasterdata", _nvCollection);
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        var abc = ds.Tables[0].Rows[0][0].ToString();
                        if (abc == "OK")
                        {
                            returnString = "OK";
                        }
                        else
                        {
                            returnString = "Error Occur";
                        }

                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }

        [WebMethod(EnableSession = true)]
        public string ErrorCountDetailsAction(string distributorcode, string comment, string id, string Suspect, string Year, string Month) //string INVDate
        {
            string returnString = "";
            DataSet ds;
            try
            {
                _nvCollection.Add("@distributorcode-varchar(200)", distributorcode.ToString());
                _nvCollection.Add("@comment-nvarchar(max)", comment.ToString());
                _nvCollection.Add("@id-int", id.ToString());
                _nvCollection.Add("@Month-int", Month.ToString());
                _nvCollection.Add("@Year-int", Year.ToString());

                if (Suspect == "CustIDSuspect")
                {
                    if (comment == "Customer is not Mapped with this Brick")
                    {
                        ds = _dl.GetData("sp_ErrorActionsCust1", _nvCollection);

                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            var abc = ds.Tables[0].Rows[0][0].ToString();
                            if (abc == "OK1")
                            {
                                returnString = "OK1";
                            }
                            else if (abc == "Customer Not Exists in Cust File")
                            {
                                returnString = "Customer Not Exists in Cust File";
                            }
                            else if (abc == "Customer Exist")
                            {
                                returnString = "Customer Exist";
                            }
                            else
                            {
                                returnString = "Error Occurs";
                            }
                        }
                    }
                    else if (comment == ",Customers exists in Invoice File but not in Customer File" || comment == " ,Customers exists in Invoice File but not in Customer File")
                    {

                        ds = _dl.GetData("sp_ErrorActionsCust", _nvCollection);

                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            var abc = ds.Tables[0].Rows[0][0].ToString();
                            if (abc == "OK")
                            {
                                returnString = "OK";
                            }
                            else if (abc == "Customer Not Exists in Cust File")
                            {
                                returnString = "Customer Not Exists in Cust File";
                            }
                            else if (abc == "Customer Exist")
                            {
                                returnString = "Customer Exist";
                            }
                            else
                            {
                                returnString = "Error Occurs";
                            }
                        }

                    }
                    else if (comment == ",Customer Id Not exists in a System" || comment == ",Customer Id Not exists in a System" || comment == "Customer Id Not exists in a System" || comment == " ,Customer Id Not exists in a System")
                    {
                        ds = _dl.GetData("sp_OpenNewCustomer", _nvCollection);
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            var abc = ds.Tables[0].Rows[0][0].ToString();
                            if (abc == "OK")
                            {
                                returnString = "OK";
                            }
                            else if (abc == "OPEN BRICK FIRST")
                            {
                                returnString = "Please Open The Brick First";
                            }
                            else
                            {
                                returnString = "Error Occurs";
                            }
                        }
                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }
                }
                else if (Suspect == "BRICKIDSuspect")
                {
                    if (comment == "BrickCode is not map with this distributor")
                    {

                        ds = _dl.GetData("sp_ErrorActionsBrick1", _nvCollection);

                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            var abc = ds.Tables[0].Rows[0][0].ToString();
                            if (abc == "OK2")
                            {
                                returnString = "OK2";
                            }
                            else if (abc == "Brick Not Exists in Cust File")
                            {
                                returnString = "Brick Not Exists in Cust File";
                            }
                            else if (abc == "Brick Exist")
                            {
                                returnString = "Brick Exist";
                            }
                            else
                            {
                                returnString = "Error Occurs";
                            }
                        }

                    }
                    else
                    if (comment == " ,Sale In Multiple Brick With Same ID" || comment == ",Sale In Multiple Brick With Same ID")
                    {

                        ds = _dl.GetData("sp_ErrorActionsBrick", _nvCollection);

                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            var abc = ds.Tables[0].Rows[0][0].ToString();
                            if (abc == "OK")
                            {
                                returnString = "OK";
                            }
                            else if (abc == "Brick Not Exists in Cust File")
                            {
                                returnString = "Brick Not Exists in Cust File";
                            }
                            else if (abc == "Brick Exist")
                            {
                                returnString = "Brick Exist";
                            }
                            else
                            {
                                returnString = "Error Occurs";
                            }
                        }
                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }
                }
                else
                {
                    returnString = "Error Occurs";
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string updateCustomerData_NEW(string id, string customername, string cuscustomerid, string custownid) //int distributorcode, string town, , string cusct
        {
            string returnString = "";


            try
            {
                string[] CUSTPK = id.Split(',');
                string[] CustomerName = customername.Split(',');
                string[] CustomerID = cuscustomerid.Split(',');
                string[] TownID = custownid.Split(',');


                for (int i = 0; i < CUSTPK.Length; i++)
                {
                    string PK = CUSTPK[i];
                    string CustID = CustomerID[i];
                    string CustName = CustomerName[i];
                    string Brick = TownID[i];

                    _nvCollection.Add("@PK_CustID-int", PK.ToString());
                    _nvCollection.Add("@CUSTID-nvarchar(max)", CustID.ToString());
                    _nvCollection.Add("@CUSTNAME-nvarchar(max)", CustName.ToString());
                    _nvCollection.Add("@TOWNID-varchar(50)", Brick.ToString());
                    DataSet ds = _dl.GetData("spUpdateCustomerData_New", _nvCollection);

                    //_nvCollection.Add("@PK_CustID-int", CUSTPK[i].ToString());
                    //_nvCollection.Add("@CUSTID-nvarchar(max)", CustomerID[i].ToString());
                    //_nvCollection.Add("@CUSTNAME-nvarchar(max)", CustomerName[i].ToString());
                    //_nvCollection.Add("@TOWNID-varchar(50)", TownID[i].ToString());
                    //DataSet ds = _dl.GetData("spUpdateCustomerData_New", _nvCollection);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        var abc = ds.Tables[0].Rows[0][0].ToString();
                        if (abc == "OK")
                        {
                            returnString = "OK";
                        }
                        else
                        {
                            returnString = "Error Occurs";
                        }

                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }

                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string updateCustomerDataMaster_New(string id, string distributorcode, string customername, string cuscustomerid, string custownid)//, string cusct string town,
        {
            string returnString = "";

            try
            {
                string[] CustomerPK = id.Split(',');
                string[] DistCode = distributorcode.Split(',');
                string[] CustomerName = customername.Split(',');
                string[] CustomerID = cuscustomerid.Split(',');
                string[] TownID = custownid.Split(',');

                for (int i = 0; i < CustomerPK.Length; i++)
                {
                    string PKID = CustomerPK[i];
                    string DistributorCode = DistCode[i];
                    string CUSTNAME = CustomerName[i];
                    string CUSTID = CustomerID[i];
                    string BrickID = TownID[i];

                    _nvCollection.Add("@PK_CustID-int", PKID.ToString());
                    _nvCollection.Add("@DSTBID-int", DistributorCode.ToString());
                    _nvCollection.Add("@CUSTID-int", CUSTID.ToString());
                    _nvCollection.Add("@CUSTNAME-string", CUSTNAME);
                    //_nvCollection.Add("@TOWN-string", town);
                    _nvCollection.Add("@TOWNID-string", BrickID);
                    // _nvCollection.Add("@CT-string", cusct);
                    DataSet ds = _dl.GetData("spUpdateCustomerDataMaster_New", _nvCollection);
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        var abc = ds.Tables[0].Rows[0][0].ToString();
                        if (abc == "OK")
                        {
                            returnString = "OK";
                        }
                        else if (abc == "SameCode")
                        {
                            returnString = "SameCode";
                        }
                        else
                        {
                            returnString = "Error Occurs";
                        }

                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }



                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string updateBricksData_NEW(string id, string town, string custownid) //int distributorcode, string customername, int cuscustomerid, string cusct
        {
            string returnString = "";


            try
            {

                string[] CUSTPKID = id.Split(',');
                string[] BrickName = town.Split(',');
                string[] BrickID = custownid.Split(',');

                for (int i = 0; i < CUSTPKID.Length; i++)
                {
                    string PKID = CUSTPKID[i];
                    string TownID = BrickID[i];
                    string TownName = BrickName[i];

                    _nvCollection.Add("@PK_CustID-int", PKID.ToString());
                    // _nvCollection.Add("@DSTBID-int", distributorcode.ToString());
                    // _nvCollection.Add("@CUSTID-int", cuscustomerid.ToString());
                    //_nvCollection.Add("@CUSTNAME-string", customername);
                    _nvCollection.Add("@TOWN-string", TownName);
                    _nvCollection.Add("@TOWNID-string", TownID);
                    //_nvCollection.Add("@CT-string", cusct);
                    DataSet ds = _dl.GetData("spUpdateBrickData_NEW", _nvCollection);
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        var abc = ds.Tables[0].Rows[0][0].ToString();
                        if (abc == "OK")
                        {
                            returnString = "OK";
                        }
                        else
                        {
                            returnString = "Error Occurs";
                        }

                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string updateBricksMaster_NEW(string id, string distributorcode, string town, string custownid) //string customername, int cuscustomerid, , string cusct
        {
            string returnString = "";

            try
            {
                _nvCollection.Add("@PK_CustID-int", id.ToString());
                _nvCollection.Add("@DSTBID-int", distributorcode.ToString());
                // _nvCollection.Add("@CUSTID-int", cuscustomerid.ToString());
                // _nvCollection.Add("@CUSTNAME-string", customername);
                _nvCollection.Add("@TOWN-string", town);
                _nvCollection.Add("@TOWNID-string", custownid);
                //_nvCollection.Add("@CT-string", cusct);
                DataSet ds = _dl.GetData("spUpdateBrickDataMaster_NEW", _nvCollection);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var abc = ds.Tables[0].Rows[0][0].ToString();
                    if (abc == "OK")
                    {
                        returnString = "OK";
                    }
                    else
                    {
                        returnString = "Error Occurs";
                    }
                }
                else
                {
                    returnString = "Error Occurs";
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

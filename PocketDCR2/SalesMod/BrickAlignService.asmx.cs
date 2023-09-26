using DatabaseLayer.SQL;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace PocketDCR2.BWSD
{
    /// <summary>
    /// Summary description for BrickAlignService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class BrickAlignService : System.Web.Services.WebService
    {

        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        NameValueCollection _nvCollection = new NameValueCollection();
        DAL _dl = new Classes.DAL();

        #endregion

        #region Public Functions

        [WebMethod]

        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertFileColumn(string filename, int DistId, string Column, int StartIndex, int EndIndex, int Length)
        {
            string returnString = "";

            try
            {
                #region Validate Name


                _nvCollection.Clear();
                _nvCollection.Add("@Column-varchar(50)", Column.ToString());
                _nvCollection.Add("@DistId-varchar(50)", DistId.ToString());
                _nvCollection.Add("@filename-varchar(50)", filename.ToString());
                DataSet ds = _dl.GetData("sp_FileColumnSelect", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = "Duplicate Name!";
                }

                else
                {
                    _nvCollection.Clear();
                    _nvCollection.Add("@Column-VARCHAR(100)", Column.ToString());
                    _nvCollection.Add("@DistId-INT", DistId.ToString());
                    _nvCollection.Add("@filename-VARCHAR(100)", filename.ToString());
                    _nvCollection.Add("@StartIndex-INT", StartIndex.ToString());
                    _nvCollection.Add("@EndIndex-INT", EndIndex.ToString());
                    _nvCollection.Add("@Length-INT", Length.ToString());
                    DataSet dsFileColumn = _dl.GetData("sp_FileColumnInsert", _nvCollection);

                    returnString = "OK";
                }
                #endregion


            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetFileColumn(int FileStructID)
        {
            string returnString = "";

            try
            {

                _nvCollection.Clear();
                _nvCollection.Add("@FileStructID-INT", FileStructID.ToString());
                DataSet ds = _dl.GetData("sp_FileColumnSelectByID", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }

                //var getBricks = _dataContext.sp_BricksSelect(FileStructID, null).Select(
                //    p =>
                //        new DatabaseLayer.SQL.Brick()
                //        {
                //            BrickId = p.BrickId,
                //            BrickName = p.BrickName,
                //            IsActive = p.IsActive,
                //            Level3ID = p.Level3ID
                //        }).ToList();
                //returnString = _jss.Serialize(getBricks);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }



        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDistributorByCity(int CityId)
        {
            string returnString = "";

            try
            {

                _nvCollection.Clear();
                _nvCollection.Add("@CityId-int", CityId.ToString());
                DataSet ds = _dl.GetData("sp_GetDistributorByCity", _nvCollection);

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
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllDistributor()
        {
            string returnString = "";

            try
            {

                _nvCollection.Clear();
                //  _nvCollection.Add("@CityId-int", CityId.ToString());
                DataSet ds = _dl.GetData("sp_getalldistributor", _nvCollection);

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
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllBrick()
        {
            string returnString = "";

            try
            {

                _nvCollection.Clear();

                DataSet ds = _dl.GetData("sp_getallBrick", _nvCollection);

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
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllBrickByDist(string DistId)
        {
            string returnString = "";

            try
            {
                _nvCollection.Clear();
                _nvCollection.Add("@DistId-int", DistId.ToString());
                DataSet ds = _dl.GetData("sp_GetSalesBrickByDistributor", _nvCollection);

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
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]

        /// ddlFileName    ddlDistributor     txtColumn   txtStartIndex  txtEndIndex  txtLength
        public string UpdateFileColumn(int structId, int DistId, string FileName, string ColumnName, int StartIndex, int EndIndex, int Length)
        {
            string returnString = "";

            try
            {
                //#region Validate Name

                //var isValidateName = _dataContext.sp_BricksSelect(null, FileName.Trim()).ToList();

                #region Validate Name


                _nvCollection.Clear();
                _nvCollection.Add("@Column-varchar(50)", ColumnName.ToString());
                _nvCollection.Add("@DistId-varchar(50)", DistId.ToString());
                _nvCollection.Add("@filename-varchar(50)", FileName.ToString());
                DataSet dsFileColumn = _dl.GetData("sp_FileColumnSelect", _nvCollection);
                #endregion


                if (dsFileColumn.Tables[0].Rows.Count > 0 && Convert.ToInt32(dsFileColumn.Tables[0].Rows[0]["SalesDataFilesStructID"].ToString()) != structId)
                {
                    returnString = "Duplicate Name!";
                }

                else
                {
                    _nvCollection.Clear();
                    _nvCollection.Add("@FilesStructID-INT", structId.ToString());
                    _nvCollection.Add("@Column-VARCHAR(100)", ColumnName.ToString());
                    _nvCollection.Add("@DistId-INT", DistId.ToString());
                    _nvCollection.Add("@filename-VARCHAR(100)", FileName.ToString());
                    _nvCollection.Add("@StartIndex-INT", StartIndex.ToString());
                    _nvCollection.Add("@EndIndex-INT", EndIndex.ToString());
                    _nvCollection.Add("@Length-INT", Length.ToString());
                    DataSet dsFileColumnUpdate = _dl.GetData("sp_FileColumnUpdate", _nvCollection);

                    // var updateBrick = _dataContext.sp_BricksUpdate(BrickId, BrickName.Trim(), teamId, isActive).ToList();
                    returnString = "OK";
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
        public string DeleteFileColumn(int FileStructID)
        {
            string returnString = "";

            try
            {

                _nvCollection.Clear();
                _nvCollection.Add("@FileStructID-int", FileStructID.ToString());
                DataSet ds = _dl.GetData("sp_DeleteFileStructById", _nvCollection);
                //_dataContext.sp_BricksDelete(FileStructID);
                returnString = "OK";
            }
            catch (SqlException exception)
            {
                if (exception.Number == 547)
                {
                    returnString = "Not able to delete this record due to linkup.";
                }
                else
                {
                    returnString = exception.Message;
                }
            }

            return returnString;
        }



        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDistributorBrickData(string empid, string mdate, string distid, string isMap)
        {
            string returnString = "";

            try
            {
                string MonthName = "";
                DateTime MonthDate = new DateTime();
                if (mdate != "")
                {
                    MonthName = mdate.Split('-', ' ')[0];
                    string year = mdate.Split('-', ' ')[1];
                    int i = DateTime.ParseExact(MonthName, "MMMM", CultureInfo.CurrentCulture).Month;
                    string completedate = i + "/" + "1" + "/" + year + " " + DateTime.Now.TimeOfDay;
                    MonthDate = Convert.ToDateTime(completedate);
                }
                else
                {
                    MonthDate = DateTime.Now;
                }



                _nvCollection.Clear();
                _nvCollection.Add("@MDate-date", MonthDate.ToString());
                _nvCollection.Add("@DistID-int", distid.ToString());
                _nvCollection.Add("@isMap-int", isMap.ToString());

                DataSet ds = _dl.GetData("sp_GetDistBrickMapping", _nvCollection);


                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
            }
            catch (SqlException exception)
            {

                returnString = exception.Message;

            }

            return returnString;
        }





        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateAlignBrick(string DistId, string Brickcode, string systemBrickid,string pkid)
        {
            string returnString = "";

            try
            {

                _nvCollection.Clear();
                _nvCollection.Add("@MDate-date", "");
                _nvCollection.Add("@DistID-int", DistId.ToString());
                _nvCollection.Add("@BrickCode-int", Brickcode.ToString());
                _nvCollection.Add("@SysBrickId-int", systemBrickid.ToString());
                _nvCollection.Add("@pkid-int", pkid.ToString());
                DataSet ds = _dl.GetData("sp_UpdateDistBrickMapping", _nvCollection);

                returnString = "OK";
            }
            catch (SqlException exception)
            {

                returnString = exception.Message;

            }

            return returnString;
        }


        [WebMethod]

        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string AddNewBrick( int DistId, string Brick)
        {
            string returnString = "";

            try
            {
                #region Validate Name


                _nvCollection.Clear();
              
                _nvCollection.Add("@DistId-int", DistId.ToString());
                _nvCollection.Add("@Brick-varchar(max)", Brick.ToString());

                DataSet ds = _dl.GetData("sp_InsertBrickQuick", _nvCollection);

             
                #endregion


            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        #endregion
    }
}

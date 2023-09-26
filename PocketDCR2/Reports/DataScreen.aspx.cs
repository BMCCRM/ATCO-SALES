using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Obout.Grid;
using System.Data.SqlClient;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using System.Data.Common;
using System.Data;
using System.Collections.Specialized;
using PocketDCR2.Classes;


namespace PocketDCR2.Reports
{
    public partial class DataScreen : System.Web.UI.Page
    {
        #region Private Members
        DAL dl = new DAL();

        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;
        List<SMSInbound> _getMobileNumbers;
        List<PreSalesCall> _getPreSaleCalls;
        List<v_PreSalescall_row> _getPreSaleCalls_count;
        private DateTime _startingDate, _endingDate;
        private DataTable _smsSuccessDataTable = new DataTable();
        private DataTable _smsErrorDataTable = new DataTable();
        private int _level1Id = 0, _level2Id = 0, _level3Id = 0, _level4Id = 0, _level5Id = 0, _level6Id = 0, _currentLevelId = 0;
        private string _currentUserRole = "", _glbVarLevelName = "", _hierarchyLevel3 = null, _hierarchyLevel4 = null, _hierarchyLevel5 = null, _hierarchyLevel6 = null;


        private NameValueCollection _nvCollection = new NameValueCollection();
        private string _currentRole = "", _hierarchyName = "";
        private List<DatabaseLayer.SQL.AppConfiguration> _getHierarchy;
        private int _dataFound = 0;
        private long _employeeId = 0;
        private DateTime _currentDate = DateTime.Today;

        #endregion

        #region Private Functions

        private bool IsValidUser()
        {
            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];
                return _currentUser != null;
            }
            catch (Exception exception)
            {
                lblError.Text = "While checking user, it shows " + exception.Message;
            }

            return false;
        }

        private void LoadSuccessDCRData(int pagesize, int currentpage)
        {
            try
            {
                _smsSuccessDataTable.Clear();
                _smsSuccessDataTable.Columns.Clear();

                GetCurrentLevelId(_employeeId);
                
                #region Initialization

                string employeeName = "", level1Name = "", level2Name = "", mobileNumber = "", doctorName = "", DT = "", P1 = "", P2 = "", visitFeedBack = "",
                    P3 = "", P4 = "", S1 = "", Q1 = "", S2 = "", Q2 = "", S3 = "", Q3 = "", G1 = "", QG1 = "", G2 = "", QG2 = "", R1 = "", R2 = "", R3 = "",
                    JV1 = "", JV2 = "", JV3 = "", JV4 = "", VT = "", hierarchyName = "";

                List<HierarchyLevel1> getLevel1Name;
                List<HierarchyLevel2> getLevel2Name;
                List<HierarchyLevel3> getLevel3Name;
                List<HierarchyLevel4> getLevel4Name;
                List<HierarchyLevel5> getLevel5Name;
                List<HierarchyLevel6> getLevel6Name;

                #endregion

                #region Initialization of Custom DataTable columns

                _smsSuccessDataTable.Columns.Add(new DataColumn("EmployeeName", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("Level1Name", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("Level2Name", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("MobileNumber", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("VisitDate", Type.GetType("System.DateTime")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("DoctorName", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("P1", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("P2", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("P3", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("P4", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("S1", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("Q1", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("S2", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("Q2", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("S3", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("Q3", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("G1", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("QG1", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("G2", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("QG2", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("R1", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("R2", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("R3", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("JV1", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("JV2", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("JV3", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("JV4", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("VT", Type.GetType("System.String")));
                _smsSuccessDataTable.Columns.Add(new DataColumn("FeedBack", Type.GetType("System.String")));

                #endregion

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                if (getLevelName.Count != 0)
                {
                    hierarchyName = Convert.ToString(getLevelName[0].SettingName);
                    _currentUserRole = Convert.ToString(Session["CurrentUserRole2"]);

                    if (_currentRole == "admin" || _currentRole == "headoffice")
                    {
                        #region admin
                        if (_hierarchyName == "Level3")
                        {
                            #region L1
                            if (ddlLevel1.SelectedValue == "-1" || ddlLevel1.SelectedValue == "")
                            {
                                _employeeId = 0;
                            }
                            else
                            {
                                if (ddlLevel1.SelectedValue != "-1")
                                {
                                    _employeeId = 0;
                                    GetCurrentLevelId(Convert.ToInt32(ddlLevel1.SelectedValue));
                                }
                                else { GetCurrentLevelId(0); _employeeId = 0; }
                            }

                            #endregion

                            #region L2
                            if (ddlLevel2.SelectedValue == "-1" || ddlLevel2.SelectedValue == "")
                            {
                                _employeeId = 0;
                            }
                            else
                            {
                                if (ddlLevel2.SelectedValue != "-1")
                                {
                                    GetCurrentLevelId(Convert.ToInt32(ddlLevel2.SelectedValue));
                                }
                                else { GetCurrentLevelId(0); }


                            }
                            #endregion

                            #region L3
                            if (ddlLevel3.SelectedValue == "-1" || ddlLevel3.SelectedValue == "")
                            {
                                _employeeId = 0;
                            }
                            else
                            {
                                if (ddlLevel3.SelectedValue != "-1")
                                {
                                    _employeeId = 0;
                                    GetCurrentLevelId(Convert.ToInt32(ddlLevel3.SelectedValue));
                                }
                                else { GetCurrentLevelId(0); _employeeId = 0; }
                            }
                            #endregion

                            #region L4
                            if (ddlLevel4.SelectedValue == "-1" || ddlLevel4.SelectedValue == "")
                            {
                                _employeeId = 0;
                            }
                            else
                            {
                                if (ddlLevel4.SelectedValue != "-1")
                                {
                                    GetCurrentLevelId(Convert.ToInt32(ddlLevel4.SelectedValue));
                                }
                                else { 
                                    GetCurrentLevelId(0); 
                                }

                                _employeeId = Convert.ToInt32(ddlLevel4.SelectedValue);
                            }

                            #endregion

                        }
                        #endregion
                    }

                    #region rl1 rl2
                    else if (_currentRole == "rl1")
                    {

                        if (_hierarchyName == "Level3")
                        {

                        }

                    }
                    else if (_currentRole == "rl2")
                    {
                        if (_hierarchyName == "Level3")
                        {

                        }
                    }
                    #endregion

                    else if (_currentRole == "rl3")
                    {
                        #region NSM
                        if (_hierarchyName == "Level3")
                        {
                            if (ddlLevel1.SelectedValue == "-1" || ddlLevel1.SelectedValue == "")
                            {
                                _employeeId = 0;
                            }
                            else
                            {
                                if (ddlLevel1.SelectedValue != "-1")
                                {
                                    _employeeId = 0;
                                    GetCurrentLevelId(Convert.ToInt32(ddlLevel1.SelectedValue));
                                }
                                else { GetCurrentLevelId(0); _employeeId = 0; }
                            }



                            if (ddlLevel2.SelectedValue == "-1" || ddlLevel2.SelectedValue == "")
                            {
                                _employeeId = 0;
                            }
                            else
                            {
                                if (ddlLevel2.SelectedValue != "-1")
                                {
                                    GetCurrentLevelId(Convert.ToInt32(ddlLevel2.SelectedValue));
                                }
                                else { GetCurrentLevelId(0); }


                            }



                            if (ddlLevel3.SelectedValue == "-1" || ddlLevel3.SelectedValue == "")
                            {
                                _employeeId = 0;
                            }
                            else
                            {
                                if (ddlLevel3.SelectedValue != "-1")
                                {
                                    GetCurrentLevelId(Convert.ToInt32(ddlLevel3.SelectedValue));
                                }
                                else { GetCurrentLevelId(0); }

                                _employeeId = Convert.ToInt32(ddlLevel3.SelectedValue);
                            }
                        }
                        #endregion
                    }
                    else if (_currentRole == "rl4")
                    {
                        #region RSM
                        if (_hierarchyName == "Level3")
                        {
                            if (ddlLevel1.SelectedValue == "-1" || ddlLevel1.SelectedValue == "")
                            {
                                _employeeId = 0;
                            }
                            else
                            {
                                if (ddlLevel1.SelectedValue != "-1")
                                {
                                    _employeeId = 0;
                                    GetCurrentLevelId(Convert.ToInt32(ddlLevel1.SelectedValue));
                                }
                                else { GetCurrentLevelId(0); _employeeId = 0; }
                            }


                            if (ddlLevel2.SelectedValue == "-1" || ddlLevel2.SelectedValue == "")
                            {
                                _employeeId = 0;
                            }
                            else
                            {
                                if (ddlLevel2.SelectedValue != "-1")
                                {
                                    GetCurrentLevelId(Convert.ToInt32(ddlLevel2.SelectedValue));
                                }
                                else { GetCurrentLevelId(0); }

                                _employeeId = Convert.ToInt32(ddlLevel2.SelectedValue);
                            }
                        }
                        #endregion
                    }
                    else if (_currentRole == "rl5")
                    {
                        #region ZSM


                        if (_hierarchyName == "Level3")
                        {
                            if (ddlLevel1.SelectedValue == "-1" || ddlLevel1.SelectedValue == "")
                            {
                                _employeeId = 0;
                            }
                            else
                            {
                                if (ddlLevel1.SelectedValue != "-1")
                                {
                                    GetCurrentLevelId(Convert.ToInt32(ddlLevel1.SelectedValue));
                                }
                                else { GetCurrentLevelId(0); }

                                _employeeId = Convert.ToInt32(ddlLevel1.SelectedValue);
                            }


                        }
                        #endregion
                    }
                    else if (_currentRole == "rl6")
                    {
                        #region MR
                        if (_hierarchyName == "Level3")
                        {



                        }
                        #endregion
                    }


                }


                #endregion

                #region Filter Record on the basis of Active Level

                #region Select Record on the basis of Days Select

                _nvCollection.Clear();
                _nvCollection.Add("Level3Id-int", _level3Id.ToString());
                _nvCollection.Add("Level4Id-int", _level4Id.ToString());
                _nvCollection.Add("Level5Id-int", _level5Id.ToString());
                _nvCollection.Add("Level6Id-int", _level6Id.ToString());
                
                _nvCollection.Add("EmployeeId-int", _employeeId.ToString());
                _nvCollection.Add("StartingDate-date", Convert.ToDateTime(txtStartingDate.Text).ToString());
                _nvCollection.Add("EndingDate-date", Convert.ToDateTime(txtEndingDate.Text).ToString());
                _nvCollection.Add("PageSize-int", pagesize.ToString());
                _nvCollection.Add("CurrentPage-int", currentpage.ToString());

                DataSet ds = new DataSet();
                ds = dl.GetData("PreSalesCalls_DataScreen_New", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    gvSuccessDCR.DataSource = ds;
                    gvSuccessDCR.DataBind();
                }
                #endregion

                //if (ds.Tables[0].Rows.Count > 0)
                //{
                //    List<DatabaseLayer.SQL.ProductSku> getProductSKU;
                //    List<DatabaseLayer.SQL.ProductSku> getProductSKURem;
                //    pagersuccess.ItemCount = Convert.ToInt32(ds.Tables[1].Rows[0][0].ToString());


                //    #region LOOP
                //    foreach (DataRow preSaleCallItem in ds.Tables[0].Rows)
                //    {

                //        #region Get MR Name + First Two Levels Name + MobileNumber

                //        var getEmployeesBioData =
                //            _dataContext.sp_EmplyeeHierarchySelectByMR(Convert.ToInt32(preSaleCallItem["Level6LevelId"]), Convert.ToInt64(preSaleCallItem["EmployeeId"])).ToList();

                //        if (getEmployeesBioData.Count != 0)
                //        {
                //            employeeName = getEmployeesBioData[0].FirstName.ToString().Trim() + " " + getEmployeesBioData[0].MiddleName.ToString().Trim() + " " + getEmployeesBioData[0].LastName.ToString().Trim();
                //            mobileNumber = getEmployeesBioData[0].MobileNumber;

                //            if (hierarchyName == "Level1")
                //            {
                //                getLevel1Name = _dataContext.sp_HierarchyLevel1Select(Convert.ToInt32(getEmployeesBioData[0].LevelId1)).ToList();
                //                getLevel2Name = _dataContext.sp_HierarchyLevel2Select(Convert.ToInt32(getEmployeesBioData[0].LevelId2)).ToList();

                //                if (getLevel1Name.Count != 0 && getLevel2Name.Count != 0)
                //                {
                //                    level1Name = getLevel1Name[0].LevelName;
                //                    level2Name = getLevel2Name[0].LevelName;
                //                }
                //            }
                //            else if (hierarchyName == "Level2")
                //            {
                //                getLevel2Name = _dataContext.sp_HierarchyLevel2Select(Convert.ToInt32(getEmployeesBioData[0].LevelId2)).ToList();
                //                getLevel3Name = _dataContext.sp_HierarchyLevel3Select(Convert.ToInt32(getEmployeesBioData[0].LevelId3), null).ToList();

                //                if (getLevel2Name.Count != 0 && getLevel3Name.Count != 0)
                //                {
                //                    level1Name = getLevel2Name[0].LevelName;
                //                    level2Name = getLevel3Name[0].LevelName;
                //                }
                //            }
                //            else if (hierarchyName == "Level3")
                //            {
                //                getLevel3Name = _dataContext.sp_HierarchyLevel3Select(Convert.ToInt32(getEmployeesBioData[0].LevelId3), null).ToList();
                //                getLevel4Name = _dataContext.sp_HierarchyLevel4Select(Convert.ToInt32(getEmployeesBioData[0].LevelId4), null).ToList();

                //                if (getLevel3Name.Count != 0 && getLevel4Name.Count != 0)
                //                {
                //                    level1Name = getLevel3Name[0].LevelName;
                //                    level2Name = getLevel4Name[0].LevelName;
                //                }
                //            }
                //            else if (hierarchyName == "Level4")
                //            {
                //                getLevel4Name = _dataContext.sp_HierarchyLevel4Select(Convert.ToInt32(getEmployeesBioData[0].LevelId4), null).ToList();
                //                getLevel5Name = _dataContext.sp_HierarchyLevel5Select(Convert.ToInt32(getEmployeesBioData[0].LevelId5), null).ToList();

                //                if (getLevel4Name.Count != 0 && getLevel5Name.Count != 0)
                //                {
                //                    level1Name = getLevel4Name[0].LevelName;
                //                    level2Name = getLevel5Name[0].LevelName;
                //                }
                //            }
                //            else if (hierarchyName == "Level5")
                //            {
                //                getLevel5Name = _dataContext.sp_HierarchyLevel5Select(Convert.ToInt32(getEmployeesBioData[0].LevelId5), null).ToList();
                //                getLevel6Name = _dataContext.sp_HierarchyLevel6Select(Convert.ToInt32(getEmployeesBioData[0].LevelId6), null).ToList();

                //                if (getLevel5Name.Count != 0 && getLevel6Name.Count != 0)
                //                {
                //                    level1Name = getLevel5Name[0].LevelName;
                //                    level2Name = getLevel6Name[0].LevelName;
                //                }
                //            }
                //        }

                //        #endregion

                //        #region Get Doctor Code + Name

                //        var getDoctorBioData =
                //                _dataContext.sp_DoctorsSelect(Convert.ToInt64(preSaleCallItem["DoctorId"]), null, null, null).ToList();

                //        if (getDoctorBioData.Count != 0)
                //        {
                //            doctorName = getDoctorBioData[0].FirstName + " " + getDoctorBioData[0].MiddleName + " " + getDoctorBioData[0].LastName;
                //        }

                //        #endregion

                //        #region Get P1, P2, P3, P4 + R1, R2, R3

                //        var getCallProducts = _dataContext.sp_CallProductsSelect(Convert.ToInt64(preSaleCallItem["SalesCallId"])).ToList();

                //        if (getCallProducts.Count != 0)
                //        {
                //            foreach (var callProductItem in getCallProducts)
                //            {
                //                if (callProductItem.OrderBy == 1)
                //                {
                //                    #region P1 + R1

                //                    getProductSKU = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.SkuId), null, null).ToList();

                //                    getProductSKURem = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.DetailReminder), null, null).ToList();

                //                    if (getProductSKU.Count != 0)
                //                    {
                //                        P1 = Convert.ToString(getProductSKU[0].SkuName);
                //                        if (getProductSKURem.Count != 0)
                //                        {
                //                            R1 = (callProductItem.DetailReminder == 0) ? " " : Convert.ToString(getProductSKURem[0].SkuName);
                //                            //R1 = (callProductItem.DetailReminder == 0) ? " " : Convert.ToString(callProductItem.DetailReminder);
                //                        }
                //                    }
                //                    #endregion
                //                }
                //                else if (callProductItem.OrderBy == 2)
                //                {
                //                    #region P2 + R2

                //                    getProductSKU = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.SkuId), null, null).ToList();
                //                    getProductSKURem = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.DetailReminder), null, null).ToList();

                //                    if (getProductSKU.Count != 0)
                //                    {
                //                        P2 = Convert.ToString(getProductSKU[0].SkuName);
                //                        if (getProductSKURem.Count != 0)
                //                        {
                //                            R2 = (callProductItem.DetailReminder == 0) ? " " : Convert.ToString(getProductSKURem[0].SkuName);
                //                            //R2 = (callProductItem.DetailReminder == 0) ? " " : Convert.ToString(callProductItem.DetailReminder);
                //                        }
                //                    }

                //                    #endregion
                //                }
                //                else if (callProductItem.OrderBy == 3)
                //                {
                //                    #region P3 + R3

                //                    getProductSKU = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.SkuId), null, null).ToList();
                //                    getProductSKURem = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.DetailReminder), null, null).ToList();
                //                    if (getProductSKU.Count != 0)
                //                    {
                //                        P3 = Convert.ToString(getProductSKU[0].SkuName);
                //                        if (getProductSKURem.Count != 0)
                //                        {
                //                            R3 = (callProductItem.DetailReminder == 0) ? " " : Convert.ToString(getProductSKURem[0].SkuName);
                //                            //R3 = (callProductItem.DetailReminder == 0) ? " " : Convert.ToString(callProductItem.DetailReminder);
                //                        }
                //                    }
                //                    #endregion
                //                }
                //                else if (callProductItem.OrderBy == 4)
                //                {
                //                    #region P4

                //                    getProductSKU = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductItem.SkuId), null, null).ToList();
                //                    if (getProductSKU.Count != 0)
                //                    {
                //                        P4 = Convert.ToString(getProductSKU[0].SkuName);
                //                    }

                //                    #endregion
                //                }
                //            }
                //        }

                //        #endregion

                //        #region Get S1, S2, S3 + Q1, Q2, Q3

                //        var getCallProductSamples =
                //            _dataContext.sp_CallProductSamplesSelect(Convert.ToInt64(preSaleCallItem["SalesCallId"])).ToList();

                //        if (getCallProductSamples.Count != 0)
                //        {
                //            foreach (var callProductSampleItem in getCallProductSamples)
                //            {
                //                if (callProductSampleItem.OrderBy == 1)
                //                {
                //                    #region S1 + Q1

                //                    getProductSKU = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductSampleItem.ProductSkuId), null, null).ToList();

                //                    if (getProductSKU.Count != 0)
                //                    {
                //                        S1 = Convert.ToString(getProductSKU[0].SkuName);
                //                        Q1 = Convert.ToString(callProductSampleItem.SampleQuantity);
                //                    }

                //                    #endregion
                //                }
                //                else if (callProductSampleItem.OrderBy == 2)
                //                {
                //                    #region S2 + Q2

                //                    getProductSKU = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductSampleItem.ProductSkuId), null, null).ToList();

                //                    if (getProductSKU.Count != 0)
                //                    {
                //                        S2 = Convert.ToString(getProductSKU[0].SkuName);
                //                        Q2 = Convert.ToString(callProductSampleItem.SampleQuantity);
                //                    }

                //                    #endregion
                //                }
                //                else if (callProductSampleItem.OrderBy == 3)
                //                {
                //                    #region S3 + Q3

                //                    getProductSKU = _dataContext.sp_ProductSkuSelect(Convert.ToInt32(callProductSampleItem.ProductSkuId), null, null).ToList();

                //                    if (getProductSKU.Count != 0)
                //                    {
                //                        S3 = Convert.ToString(getProductSKU[0].SkuName);
                //                        Q3 = Convert.ToString(callProductSampleItem.SampleQuantity);
                //                    }

                //                    #endregion
                //                }
                //            }
                //        }

                //        #endregion

                //        #region Get G1, G2 + QG1, QG2

                //        List<DatabaseLayer.SQL.GiftItem> getGiftItems;

                //        var getCallGift =
                //            _dataContext.sp_CallGiftsSelect(Convert.ToInt64(preSaleCallItem["SalesCallId"])).ToList();

                //        if (getCallGift.Count != 0)
                //        {
                //            foreach (var callGiftItems in getCallGift)
                //            {
                //                if (callGiftItems.OrderBy == 1)
                //                {
                //                    #region G1 + Q1

                //                    getGiftItems = _dataContext.sp_GiftItemsSelect(Convert.ToInt64(callGiftItems.GiftId), null, null).ToList();

                //                    if (getGiftItems.Count != 0)
                //                    {
                //                        G1 = Convert.ToString(getGiftItems[0].GiftName);
                //                        QG1 = (callGiftItems.Quanitity == 0) ? " " : Convert.ToString(callGiftItems.Quanitity);
                //                    }

                //                    #endregion
                //                }
                //                else if (callGiftItems.OrderBy == 2)
                //                {
                //                    #region G2 + Q2

                //                    getGiftItems = _dataContext.sp_GiftItemsSelect(Convert.ToInt64(callGiftItems.GiftId), null, null).ToList();

                //                    if (getGiftItems.Count != 0)
                //                    {
                //                        G2 = Convert.ToString(getGiftItems[0].GiftName);
                //                        QG2 = (callGiftItems.Quanitity == 0) ? " " : Convert.ToString(callGiftItems.Quanitity);
                //                    }

                //                    #endregion
                //                }
                //            }
                //        }

                //        #endregion

                //        #region Get JV

                //        List<Employee> getVisitor1;
                //        List<Employee> getVisitor2;
                //        List<Employee> getVisitor3;
                //        List<Employee> getVisitor4;
                //        var getCallVisitor =
                //            _dataContext.sp_Cal4VisitorsSelect(Convert.ToInt64(preSaleCallItem["SalesCallId"])).ToList();

                //        if (getCallVisitor.Count != 0)
                //        {
                //            getVisitor1 = _dataContext.sp_EmployeesSelect(Convert.ToInt64(getCallVisitor[0].JV1)).ToList();
                //            if (getVisitor1.Count != 0)
                //            {
                //                JV1 = Convert.ToString(getVisitor1[0].FirstName.ToString().Trim() + " " + getVisitor1[0].MiddleName.ToString().Trim() + " " + getVisitor1[0].LastName.ToString().Trim());
                //            }
                //            else { JV1 = "-"; }

                //            getVisitor2 = _dataContext.sp_EmployeesSelect(Convert.ToInt64(getCallVisitor[0].JV2)).ToList();
                //            if (getVisitor2.Count != 0)
                //            {
                //                JV2 = Convert.ToString(getVisitor2[0].FirstName + " " + getVisitor2[0].MiddleName + " " + getVisitor2[0].LastName);
                //            }
                //            else { JV2 = "-"; }

                //            getVisitor3 = _dataContext.sp_EmployeesSelect(Convert.ToInt64(getCallVisitor[0].JV3)).ToList();
                //            if (getVisitor3.Count != 0)
                //            {
                //                JV3 = Convert.ToString(getVisitor3[0].FirstName + " " + getVisitor3[0].MiddleName + " " + getVisitor3[0].LastName);
                //            }
                //            else { JV3 = "-"; }

                //            getVisitor4 = _dataContext.sp_EmployeesSelect(Convert.ToInt64(getCallVisitor[0].JV4)).ToList();
                //            if (getVisitor4.Count != 0)
                //            {
                //                JV4 = Convert.ToString(getVisitor4[0].FirstName.ToString().Trim() + " " + getVisitor4[0].MiddleName.ToString().Trim() + " " + getVisitor4[0].LastName.ToString().Trim());
                //            }
                //            else { JV4 = "-"; }
                //        }
                //        else
                //        {
                //            //  JV = "-";
                //        }

                //        #endregion

                //        #region Get DT + VT

                //        DT = Convert.ToDateTime(preSaleCallItem["VisitDateTime"]).ToString("MM/dd/yyyy");
                //        VT = Convert.ToString(preSaleCallItem["VisitShift"]);

                //        if (VT != "1")
                //        {
                //            VT = VT.Replace(Convert.ToString(preSaleCallItem["VisitShift"]), "E");
                //        }
                //        else
                //        {
                //            VT = VT.Replace(Convert.ToString(preSaleCallItem["VisitShift"]), "M");
                //        }

                //        #endregion

                //        #region Get Visit FeedBack

                //        var getVisitFeedback =
                //            _dataContext.sp_VisitFeedBackSelect(Convert.ToInt64(preSaleCallItem["SalesCallId"])).ToList();

                //        if (getVisitFeedback.Count != 0)
                //        {
                //            visitFeedBack = Convert.ToString(getVisitFeedback[0].FeedBack);
                //        }

                //        #endregion

                //        #region Insert Row to DataTable

                //        _smsSuccessDataTable.Rows.Add(employeeName, level1Name, level2Name, mobileNumber, DT, doctorName, P1, P2, P3, P4, S1, Q1, S2, Q2, S3, Q3,
                //                G1, QG1, G2, QG2, R1, R2, R3, JV1, JV2, JV3, JV4, VT, visitFeedBack);

                //        #endregion
                //    }

                //    #endregion

                //    #region Load Success Messages Grid

                //    gvSuccessDCR.DataSource = _smsSuccessDataTable;
                //    gvSuccessDCR.DataBind();

                //    #endregion
                //}
                #endregion


            }
            catch (Exception exception)
            {
                lblError.Text = "Success SMS: Exception is " + exception.Message;
            }
        }

        private void LoadErrorData(int pagesize, int currentpage)
        {
            try
            {
                #region Initialization

                _smsErrorDataTable.Clear();
                _smsErrorDataTable.Columns.Clear();

                string employeeName = "", level1Name = "", level2Name = "", hierarchyName = "";
                List<Employee> getEmployeeBioData;
                List<EmployeeMembership> getSystemUser;
                List<EmplyeeHierarchy> getLevel;
                List<HierarchyLevel1> getLevel1Name;
                List<HierarchyLevel2> getLevel2Name;
                List<HierarchyLevel3> getLevel3Name;
                List<HierarchyLevel4> getLevel4Name;
                List<HierarchyLevel5> getLevel5Name;
                List<HierarchyLevel6> getLevel6Name;
                _smsErrorDataTable.Columns.Clear();
                DataRow smsErrorDataRow = null;
                smsErrorDataRow = _smsErrorDataTable.NewRow();

                #endregion

                #region Initialization of Custom DataTable columns

                _smsErrorDataTable.Columns.Add(new DataColumn("EmployeeName", Type.GetType("System.String")));
                _smsErrorDataTable.Columns.Add(new DataColumn("Level1Name", Type.GetType("System.String")));
                _smsErrorDataTable.Columns.Add(new DataColumn("Level2Name", Type.GetType("System.String")));
                _smsErrorDataTable.Columns.Add(new DataColumn("MobileNumber", Type.GetType("System.String")));
                _smsErrorDataTable.Columns.Add(new DataColumn("MessageText", Type.GetType("System.String")));
                _smsErrorDataTable.Columns.Add(new DataColumn("MessageType", Type.GetType("System.String")));
                _smsErrorDataTable.Columns.Add(new DataColumn("ErrorText", Type.GetType("System.String")));
                _smsErrorDataTable.Columns.Add(new DataColumn("CreatedDate", Type.GetType("System.DateTime")));

                #endregion

                #region Get Active Hierarchy Level

                List<DatabaseLayer.SQL.AppConfiguration> getLevelName = _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                #endregion

                #region Filter Records on the basis of Active Level

                if (getLevelName.Count != 0)
                {
                    hierarchyName = Convert.ToString(getLevelName[0].SettingName);

                    #region Select Record on the basis of Days Select
                    DataSet ds = new DataSet();
                    _nvCollection.Clear();
                    _nvCollection.Add("Level3Id-int", _level3Id.ToString());
                    _nvCollection.Add("Level4Id-int", _level4Id.ToString());
                    _nvCollection.Add("Level5Id-int", _level5Id.ToString());
                    _nvCollection.Add("Level6Id-int", _level6Id.ToString());
                    _nvCollection.Add("EmployeeId-int", _employeeId.ToString());
                    _nvCollection.Add("StartingDate-date", Convert.ToDateTime(txtStartingDate.Text).ToString());
                    _nvCollection.Add("EndingDate-date", Convert.ToDateTime(txtEndingDate.Text).ToString());
                    _nvCollection.Add("PageSize-int", pagesize.ToString());
                    _nvCollection.Add("CurrentPage-int", currentpage.ToString());
                    ds = dl.GetData("smsresponseErrorSMS", _nvCollection);
                    #endregion

                    if (ds.Tables[0].Rows.Count != 0)
                    {
                        pagererror.ItemCount = Convert.ToInt32(ds.Tables[1].Rows[0][0].ToString());

                        foreach (DataRow mobileNumbers in ds.Tables[0].Rows)
                        {
                            #region Get MR Name + First Two Levels Name + MobileNumber

                            getEmployeeBioData =
                                _dataContext.sp_EmployeeSelectByCredential(null, mobileNumbers["MobileNumber"].ToString()).ToList();

                            if (getEmployeeBioData.Count != 0)
                            {
                                employeeName = getEmployeeBioData[0].FirstName + " " + getEmployeeBioData[0].MiddleName + " " + getEmployeeBioData[0].LastName;
                                getSystemUser = _dataContext.sp_EmployeeMembershipSelectByEmployee(Convert.ToInt64(getEmployeeBioData[0].EmployeeId)).ToList();

                                if (getSystemUser.Count != 0)
                                {
                                    getLevel = _dataContext.sp_EmplyeeHierarchySelect(Convert.ToInt64(getSystemUser[0].SystemUserID)).ToList();

                                    if (getLevel.Count != 0)
                                    {
                                        if (hierarchyName == "Level1")
                                        {
                                            getLevel1Name = _dataContext.sp_HierarchyLevel1Select(Convert.ToInt32(getLevel[0].LevelId1),null).ToList();
                                            getLevel2Name = _dataContext.sp_HierarchyLevel2Select(Convert.ToInt32(getLevel[0].LevelId2),null).ToList();

                                            if (getLevel1Name.Count != 0 && getLevel2Name.Count != 0)
                                            {
                                                level1Name = getLevel1Name[0].LevelName;
                                                level2Name = getLevel2Name[0].LevelName;
                                            }
                                        }
                                        else if (hierarchyName == "Level2")
                                        {
                                            getLevel2Name = _dataContext.sp_HierarchyLevel2Select(Convert.ToInt32(getLevel[0].LevelId2),null).ToList();
                                            getLevel3Name = _dataContext.sp_HierarchyLevel3Select(Convert.ToInt32(getLevel[0].LevelId3), null).ToList();

                                            if (getLevel2Name.Count != 0 && getLevel3Name.Count != 0)
                                            {
                                                level1Name = getLevel2Name[0].LevelName;
                                                level2Name = getLevel3Name[0].LevelName;
                                            }
                                        }
                                        else if (hierarchyName == "Level3")
                                        {
                                            getLevel3Name = _dataContext.sp_HierarchyLevel3Select(Convert.ToInt32(getLevel[0].LevelId3), null).ToList();
                                            getLevel4Name = _dataContext.sp_HierarchyLevel4Select(Convert.ToInt32(getLevel[0].LevelId4), null).ToList();

                                            if (getLevel3Name.Count != 0 && getLevel4Name.Count != 0)
                                            {
                                                level1Name = getLevel3Name[0].LevelName;
                                                level2Name = getLevel4Name[0].LevelName;
                                            }
                                        }
                                        else if (hierarchyName == "Level4")
                                        {
                                            getLevel4Name = _dataContext.sp_HierarchyLevel4Select(Convert.ToInt32(getLevel[0].LevelId4), null).ToList();
                                            getLevel5Name = _dataContext.sp_HierarchyLevel5Select(Convert.ToInt32(getLevel[0].LevelId5), null).ToList();

                                            if (getLevel4Name.Count != 0 && getLevel5Name.Count != 0)
                                            {
                                                level1Name = getLevel4Name[0].LevelName;
                                                level2Name = getLevel5Name[0].LevelName;
                                            }
                                        }
                                        else if (hierarchyName == "Level5")
                                        {
                                            getLevel5Name = _dataContext.sp_HierarchyLevel5Select(Convert.ToInt32(getLevel[0].LevelId5), null).ToList();
                                            getLevel6Name = _dataContext.sp_HierarchyLevel6Select(Convert.ToInt32(getLevel[0].LevelId6), null).ToList();

                                            if (getLevel5Name.Count != 0 && getLevel6Name.Count != 0)
                                            {
                                                level1Name = getLevel5Name[0].LevelName;
                                                level2Name = getLevel6Name[0].LevelName;
                                            }
                                        }
                                    }
                                }
                            }

                            #endregion

                            #region Insert Row to DataTable

                            if (getEmployeeBioData.Count <= 0)
                            {
                                _smsErrorDataTable.Rows.Add("", "", "", mobileNumbers["MobileNumber"].ToString(), mobileNumbers["MessageText"].ToString(), mobileNumbers["MessageType"].ToString(),
                                    mobileNumbers["Remarks"].ToString(), mobileNumbers["CreatedDate"].ToString());
                            }
                            else
                            {
                                _smsErrorDataTable.Rows.Add(employeeName, level1Name, level2Name, mobileNumbers["MobileNumber"].ToString(), mobileNumbers["MessageText"].ToString(), mobileNumbers["MessageType"].ToString(),
                                        mobileNumbers["Remarks"].ToString(), mobileNumbers["CreatedDate"].ToString());
                            }

                            #endregion
                        }

                        #region Load Error Messages

                        gvError.DataSource = _smsErrorDataTable;
                        gvError.DataBind();

                        #endregion
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Error Messages  : Exception is " + exception.Message;
            }
        }

        private void ClearField()
        {
            lblError.Text = "";
        }

        private void GetCurrentLevelId(long type)
        {
            try
            {
                _getHierarchy =
                    _dataContext.sp_AppConfigurationSelectHierarchy().ToList();

                if (_getHierarchy.Count != 0)
                {
                    _hierarchyName = _getHierarchy[0].SettingName;
                    var currentRole = Convert.ToString(Session["CurrentUserRole"]);
                    _currentRole = currentRole;

                    #region Check ID Present ?

                    long employeeId = 0;

                    if (type != 0)
                    {
                        employeeId = type;
                    }
                    else
                    {
                        employeeId = Convert.ToInt64(_currentUser.EmployeeId);
                    }

                    _employeeId = employeeId;

                    #endregion

                    var getCurrentMembershipId =
                        _dataContext.sp_EmployeeMembershipSelectByEmployee(employeeId).ToList();

                    if (getCurrentMembershipId.Count != 0)
                    {
                        var getCurrentLevelId =
                            _dataContext.sp_EmployeeHierarchySelectByMembership(Convert.ToInt64(getCurrentMembershipId[0].SystemUserID)).ToList();

                        if (getCurrentLevelId.Count != 0)
                        {
                            _level1Id = Convert.ToInt32(getCurrentLevelId[0].LevelId1); _level2Id = Convert.ToInt32(getCurrentLevelId[0].LevelId2);
                            _level3Id = Convert.ToInt32(getCurrentLevelId[0].LevelId3); _level4Id = Convert.ToInt32(getCurrentLevelId[0].LevelId4);
                            _level5Id = Convert.ToInt32(getCurrentLevelId[0].LevelId5); _level6Id = Convert.ToInt32(getCurrentLevelId[0].LevelId6);

                            #region Set Currennt Level Id

                            if (_hierarchyName == "Level1")
                            {
                                if (currentRole == "rl1")
                                {
                                    _currentLevelId = _level1Id;
                                }
                                else if (currentRole == "rl2")
                                {
                                    _currentLevelId = _level2Id;
                                }
                                else if (currentRole == "rl3")
                                {
                                    _currentLevelId = _level3Id;
                                }
                                else if (currentRole == "rl4")
                                {
                                    _currentLevelId = _level4Id;
                                }
                                else if (currentRole == "rl5")
                                {
                                    _currentLevelId = _level5Id;
                                }
                                else if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }
                            else if (_hierarchyName == "Level2")
                            {
                                if (currentRole == "rl2")
                                {
                                    _currentLevelId = _level2Id;
                                }
                                else if (currentRole == "rl3")
                                {
                                    _currentLevelId = _level3Id;
                                }
                                else if (currentRole == "rl4")
                                {
                                    _currentLevelId = _level4Id;
                                }
                                else if (currentRole == "rl5")
                                {
                                    _currentLevelId = _level5Id;
                                }
                                else if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }
                            else if (_hierarchyName == "Level3")
                            {
                                if (currentRole == "rl3")
                                {
                                    _currentLevelId = _level3Id;
                                }
                                else if (currentRole == "rl4")
                                {
                                    _currentLevelId = _level4Id;
                                }
                                else if (currentRole == "rl5")
                                {
                                    _currentLevelId = _level5Id;
                                }
                                else if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }
                            else if (_hierarchyName == "Level4")
                            {
                                if (currentRole == "rl4")
                                {
                                    _currentLevelId = _level4Id;
                                }
                                else if (currentRole == "rl5")
                                {
                                    _currentLevelId = _level5Id;
                                }
                                else if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }
                            else if (_hierarchyName == "Level5")
                            {
                                if (currentRole == "rl5")
                                {
                                    _currentLevelId = _level5Id;
                                }
                                else if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }
                            else if (_hierarchyName == "Level6")
                            {
                                if (currentRole == "rl6")
                                {
                                    _currentLevelId = _level6Id;
                                }
                            }

                            #endregion
                        }

                    }
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from GetCurrentLevelId is " + exception.Message;
            }
        }

        private void LoadDropDownHeader()
        {
            try
            {
                if (_getHierarchy.Count != 0)
                {
                    int counter = 0;

                    foreach (var level in _getHierarchy)
                    {
                        #region Hierarchy Level Customization

                        if (_hierarchyName == "Level1")
                        {

                        }
                        else if (_hierarchyName == "Level2")
                        {

                        }
                        else if (_hierarchyName == "Level3")
                        {
                            #region Level3 Success Customization

                            if (_currentRole == "admin" || _currentRole == "headoffice")
                            {
                                if (counter == 0)
                                {
                                    lblLevel1.Text = level.SettingValue;
                                    counter++;
                                }
                                else if (counter == 1)
                                {
                                    lblLevel2.Text = level.SettingValue;
                                    counter++;
                                }
                                else if (counter == 2)
                                {
                                    lblLevel3.Text = level.SettingValue;
                                    counter++;
                                }
                                else if (counter == 3)
                                {
                                    lblLevel4.Text = level.SettingValue;
                                    counter++;

                                    if (counter == 4)
                                    {
                                        lblLevel5.Visible = false;
                                        ddlLevel5.Visible = false;
                                        lblLevel6.Visible = false;
                                        ddlLevel6.Visible = false;
                                        counter++;
                                    }
                                }
                            }
                            else if (_currentRole == "rl3")
                            {
                                if (counter == 0)
                                {
                                    counter++;
                                }
                                else if (counter == 1)
                                {
                                    lblLevel1.Text = level.SettingValue;
                                    counter++;
                                }
                                else if (counter == 2)
                                {
                                    lblLevel2.Text = level.SettingValue;
                                    counter++;
                                }
                                else if (counter == 3)
                                {
                                    lblLevel3.Text = level.SettingValue;
                                    counter++;

                                    if (counter == 4)
                                    {
                                        lblLevel4.Visible = false;
                                        ddlLevel4.Visible = false;
                                        lblLevel5.Visible = false;
                                        ddlLevel5.Visible = false;
                                        lblLevel6.Visible = false;
                                        ddlLevel6.Visible = false;
                                        counter++;
                                    }
                                }
                            }
                            else if (_currentRole == "rl4")
                            {
                                if (counter == 0)
                                {
                                    counter++;
                                }
                                else if (counter == 1)
                                {
                                    counter++;
                                }
                                else if (counter == 2)
                                {
                                    lblLevel1.Text = level.SettingValue;
                                    counter++;
                                }
                                else if (counter == 3)
                                {
                                    lblLevel2.Text = level.SettingValue;
                                    counter++;

                                    if (counter == 4)
                                    {
                                        lblLevel3.Visible = false;
                                        ddlLevel3.Visible = false;
                                        lblLevel4.Visible = false;
                                        ddlLevel4.Visible = false;
                                        lblLevel5.Visible = false;
                                        ddlLevel5.Visible = false;
                                        lblLevel6.Visible = false;
                                        ddlLevel6.Visible = false;
                                        counter++;
                                    }
                                }
                            }
                            else if (_currentRole == "rl5")
                            {
                                if (counter == 0)
                                {
                                    counter++;
                                }
                                else if (counter == 1)
                                {
                                    counter++;
                                }
                                else if (counter == 2)
                                {
                                    counter++;
                                }
                                else if (counter == 3)
                                {
                                    lblLevel1.Text = level.SettingValue;
                                    counter++;

                                    if (counter == 4)
                                    {
                                        lblLevel2.Visible = false;
                                        ddlLevel2.Visible = false;
                                        lblLevel3.Visible = false;
                                        ddlLevel3.Visible = false;
                                        lblLevel4.Visible = false;
                                        ddlLevel4.Visible = false;
                                        lblLevel5.Visible = false;
                                        ddlLevel5.Visible = false;
                                        lblLevel6.Visible = false;
                                        ddlLevel6.Visible = false;
                                        counter++;
                                    }
                                }
                            }
                            else if (_currentRole == "rl6")
                            {
                                HideDropDownList();
                            }

                            #endregion
                        }
                        else if (_hierarchyName == "Level4")
                        {

                        }
                        else if (_hierarchyName == "Level5")
                        {

                        }
                        else if (_hierarchyName == "Level6")
                        {

                        }

                        #endregion
                    }
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from LoadDropDownHeader is " + exception.Message;
            }
        }

        private void HideDropDownList()
        {
            lblLevel1.Visible = false;
            ddlLevel1.Visible = false;
            lblLevel2.Visible = false;
            ddlLevel2.Visible = false;
            lblLevel3.Visible = false;
            ddlLevel3.Visible = false;
            lblLevel4.Visible = false;
            ddlLevel4.Visible = false;
            lblLevel5.Visible = false;
            ddlLevel5.Visible = false;
            lblLevel6.Visible = false;
            ddlLevel6.Visible = false;
        }

        private void LoadDefaultDropDownByHierarchy()
        {
            try
            {
                #region Hierarchy Levels

                if (_hierarchyName == "Level1")
                {

                }
                else if (_hierarchyName == "Level2")
                {
                }
                else if (_hierarchyName == "Level3")
                {
                    #region WebSite of Admin / HeadOffice

                    if (_currentRole == "admin" || _currentRole == "headoffice")
                    {
                        ddlLevel1.DataSource =
                            _dataContext.sp_EmployeesSelectByLevel(_hierarchyName, _currentRole, 0, 0, 0, 0, 0, 0).ToList();
                        ddlLevel1.DataBind();
                    }

                    #endregion

                    #region Employee of Role3

                    if (_currentRole == "rl3")
                    {
                        ddlLevel1.DataSource =
                            _dataContext.sp_EmployeesSelectByLevel(_hierarchyName, _currentRole, 0, 0, _level3Id, 0, 0, 0).ToList();
                        ddlLevel1.DataBind();
                    }

                    #endregion

                    #region Employee of Role4

                    if (_currentRole == "rl4")
                    {
                        ddlLevel1.DataSource =
                            _dataContext.sp_EmployeesSelectByLevel(_hierarchyName, _currentRole, 0, 0, _level3Id, _level4Id, 0, 0).ToList();
                        ddlLevel1.DataBind();
                    }

                    #endregion

                    #region Employee of Role5

                    if (_currentRole == "rl5")
                    {
                        ddlLevel1.DataSource =
                            _dataContext.sp_EmployeesSelectByLevel(_hierarchyName, _currentRole, 0, 0, _level3Id, _level4Id, _level5Id, 0).ToList();
                        ddlLevel1.DataBind();
                    }

                    #endregion
                }
                else if (_hierarchyName == "Level4")
                {
                }
                else if (_hierarchyName == "Level5")
                {
                }
                else if (_hierarchyName == "Level6")
                {
                }

                #endregion

                #region Placing Default Value in DropDownlist

                ddlLevel1.Items.Insert(0, new ListItem("Select Employee", "-1"));

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from LoadEmployee Method is " + exception.Message;
            }
        }
        #endregion

        #region Events

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (IsValidUser())
                {
                    _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());

                    ClearField();

                    if (!IsPostBack)
                    {

                        _currentDate = DateTime.Today;
                        txtStartingDate.Text = _currentDate.ToShortDateString();
                        txtEndingDate.Text = _currentDate.ToShortDateString();

                        GetCurrentLevelId(0);
                        LoadDropDownHeader();
                        LoadDefaultDropDownByHierarchy();
                        string roleType = Convert.ToString(Session["CurrentUserRole"]);
                        LoadSuccessDCRData(25, 1);
                        LoadErrorData(25, 1);
                    }
                }
                else
                {
                    Response.Redirect("../Form/Login.aspx");
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Page Load is " + exception.Message;
            }
        }

        protected void btnFilter_Click(object sender, EventArgs e)
        {
            if (txtStartingDate.Text != "")
            {
                if (txtEndingDate.Text != "")
                {
                    lblError.Text = "";

                    _startingDate = Convert.ToDateTime(txtStartingDate.Text);
                    _endingDate = Convert.ToDateTime(txtEndingDate.Text);

                    pagererror.CurrentIndex = 1;
                    pagersuccess.CurrentIndex = 1;


                    LoadSuccessDCRData(25, 1);
                    LoadErrorData(25, 1);

                }
                else
                {
                    lblError.Text = " Please select Ending Date";
                }
            }
            else
            {
                lblError.Text = "";

                _startingDate = DateTime.Now;
                _endingDate = DateTime.Now;

                LoadSuccessDCRData(25, 1);
                LoadErrorData(25, 1);
            }
        }

        protected void btnRefresh_Click(object sender, EventArgs e)
        {
            lblError.Text = "";

            _startingDate = DateTime.Now;
            _endingDate = DateTime.Now;

            LoadSuccessDCRData(25, 1);
            LoadErrorData(25, 1);
        }

        protected void txtDate_TextChanged(object sender, EventArgs e)
        {
            #region Get Hierarchical Level

            if (ddlLevel1.SelectedValue == "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                            (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
            {
                _employeeId = Convert.ToInt64(_currentUser.EmployeeId);
            }
            else if (ddlLevel1.SelectedValue != "-1" && (ddlLevel2.SelectedValue == "" || ddlLevel2.SelectedValue == "-1") &&
                (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
            {
                _employeeId = Convert.ToInt64(ddlLevel1.SelectedValue);
            }
            else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" &&
                (ddlLevel3.SelectedValue == "" || ddlLevel3.SelectedValue == "-1") && (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
            {
                _employeeId = Convert.ToInt64(ddlLevel2.SelectedValue);
            }
            else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" &&
                (ddlLevel4.SelectedValue == "" || ddlLevel4.SelectedValue == "-1"))
            {
                _employeeId = Convert.ToInt64(ddlLevel3.SelectedValue);
            }
            else if (ddlLevel1.SelectedValue != "-1" && ddlLevel2.SelectedValue != "-1" && ddlLevel3.SelectedValue != "-1" && ddlLevel4.SelectedValue != "-1")
            {
                _employeeId = Convert.ToInt64(ddlLevel4.SelectedValue);
            }

            GetCurrentLevelId(_employeeId);

            #endregion

            #region Load Charts


            #endregion
        }

        protected void ddlLevel1_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                if (ddlLevel1.SelectedValue != "-1")
                {
                    #region Get Employee Id

                    _employeeId = Convert.ToInt64(ddlLevel1.SelectedValue);

                    #endregion

                    #region Get Hierarchical Level

                    GetCurrentLevelId(_employeeId);

                    #endregion

                    #region Set Employees

                    ddlLevel2.Items.Clear();
                    ddlLevel2.DataSource = _dataContext.sp_EmployeesSelectByManager(_employeeId).ToList();
                    ddlLevel2.DataBind();

                    #endregion

                    #region Placing Default Value in DropDownlist

                    ddlLevel2.Items.Insert(0, new ListItem("Select Employee", "-1"));

                    #endregion

                    #region Load Charts

                    lblError.Text = "";
                    //LoadCharts();

                    #endregion
                }
                else
                {
                    #region Load Charts

                    //LoadCharts();

                    #endregion

                    lblError.Text = "";
                    ddlLevel2.Items.Clear();
                    ddlLevel3.Items.Clear();
                    ddlLevel4.Items.Clear();
                    ddlLevel5.Items.Clear();
                    ddlLevel6.Items.Clear();
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Level1_SelectedIndexChanged Event is " + exception.Message;
            }
        }

        protected void ddlLevel2_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                if (ddlLevel2.SelectedValue != "-1")
                {
                    #region Get Employee Id

                    _employeeId = Convert.ToInt64(ddlLevel2.SelectedValue);

                    #endregion

                    #region Get Hierarchical Level

                    GetCurrentLevelId(_employeeId);

                    #endregion

                    #region Set Employees

                    ddlLevel3.Items.Clear();
                    ddlLevel3.DataSource = _dataContext.sp_EmployeesSelectByManager(_employeeId).ToList();
                    ddlLevel3.DataBind();

                    #endregion

                    #region Placing Default Value in DropDownlist

                    ddlLevel3.Items.Insert(0, new ListItem("Select Employee", "-1"));

                    #endregion

                    #region Load Charts

                    lblError.Text = "";
                    //LoadCharts();

                    #endregion
                }
                else
                {
                    #region Load Charts

                    //LoadCharts();

                    #endregion

                    lblError.Text = "";
                    ddlLevel3.Items.Clear();
                    ddlLevel4.Items.Clear();
                    ddlLevel5.Items.Clear();
                    ddlLevel6.Items.Clear();
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Level2_SelectedIndexChanged Event is " + exception.Message;
            }
        }

        protected void ddlLevel3_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                if (ddlLevel3.SelectedValue != "-1")
                {
                    #region Get Employee Id

                    _employeeId = Convert.ToInt64(ddlLevel3.SelectedValue);

                    #endregion

                    #region Get Hierarchical Level

                    GetCurrentLevelId(_employeeId);

                    #endregion

                    #region Set Employees

                    ddlLevel4.Items.Clear();
                    ddlLevel4.DataSource = _dataContext.sp_EmployeesSelectByManager(_employeeId).ToList();
                    ddlLevel4.DataBind();

                    #endregion

                    #region Placing Default Value in DropDownlist

                    ddlLevel4.Items.Insert(0, new ListItem("Select Employee", "-1"));

                    #endregion

                    #region Load Charts

                    lblError.Text = "";
                    //LoadCharts();

                    #endregion
                }
                else
                {
                    #region Load Charts

                    //LoadCharts();

                    #endregion

                    lblError.Text = "";
                    ddlLevel4.Items.Clear();
                    ddlLevel5.Items.Clear();
                    ddlLevel6.Items.Clear();
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Level3_SelectedIndexChanged Event is " + exception.Message;
            }
        }

        protected void ddlLevel4_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                if (ddlLevel4.SelectedValue != "-1")
                {
                    #region Get Employee Id

                    _employeeId = Convert.ToInt64(ddlLevel4.SelectedValue);

                    #endregion

                    #region Get Hierarchical Level

                    GetCurrentLevelId(_employeeId);

                    #endregion

                    #region Set Employees

                    ddlLevel5.Items.Clear();
                    ddlLevel5.DataSource = _dataContext.sp_EmployeesSelectByManager(_employeeId).ToList();
                    ddlLevel5.DataBind();

                    #endregion

                    #region Placing Default Value in DropDownlist

                    ddlLevel5.Items.Insert(0, new ListItem("Select Employee", "-1"));

                    #endregion

                    #region Load Charts

                    lblError.Text = "";
                    //LoadCharts();

                    #endregion
                }
                else
                {
                    #region Load Charts

                    //LoadCharts();

                    #endregion

                    lblError.Text = "";
                    ddlLevel5.Items.Clear();
                    ddlLevel6.Items.Clear();
                }
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Level4_SelectedIndexChanged Event is " + exception.Message;
            }
        }

        protected void ddlLevel5_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                #region Get Employee Id

                _employeeId = Convert.ToInt64(ddlLevel5.SelectedValue);

                #endregion

                #region Get Hierarchical Level

                GetCurrentLevelId(_employeeId);

                #endregion

                #region Set Employees

                ddlLevel6.Items.Clear();
                ddlLevel6.DataSource = _dataContext.sp_EmployeesSelectByManager(_employeeId).ToList();
                ddlLevel6.DataBind();

                #endregion

                #region Placing Default Value in DropDownlist

                ddlLevel6.Items.Insert(0, new ListItem("Select Employee", "-1"));

                #endregion

                #region Load Charts

                //LoadCharts();

                #endregion
            }
            catch (Exception exception)
            {
                lblError.Text = "Exception is raised from Level5_SelectedIndexChanged Event is " + exception.Message;
            }
        }

        protected void ddlLevel6_SelectedIndexChanged(object sender, EventArgs e)
        {
            #region Get Employee Id

            _employeeId = Convert.ToInt64(ddlLevel6.SelectedValue);

            #endregion

            #region Get Hierarchical Level

            GetCurrentLevelId(_employeeId);

            #endregion

            #region Load Charts

            //LoadCharts();

            #endregion
        }

        #endregion

        protected void pagersuccess_Command(object sender, CommandEventArgs e)
        {
            int currnetPageIndx = Convert.ToInt32(e.CommandArgument);
            pagersuccess.CurrentIndex = currnetPageIndx;
            LoadSuccessDCRData(25, currnetPageIndx); LoadErrorData(25, pagererror.CurrentIndex);
        }

        protected void pagererror_Command(object sender, CommandEventArgs e)
        {
            int currnetPageIndx = Convert.ToInt32(e.CommandArgument);
            pagererror.CurrentIndex = currnetPageIndx;


            LoadErrorData(25, currnetPageIndx);
            LoadSuccessDCRData(25, pagersuccess.CurrentIndex);


        }
    }
}
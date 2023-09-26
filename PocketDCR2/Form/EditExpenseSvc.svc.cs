using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Text;
using System.Web.Script.Serialization;

namespace PocketDCR2.Form
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    [ServiceBehavior(UseSynchronizationContext = false,
    ConcurrencyMode = ConcurrencyMode.Multiple,
    InstanceContextMode = InstanceContextMode.PerCall),
    AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class EditExpenseSvc : IEditExpenseSvc
    {
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        public string SaveExpenseReportOverAll(Stream stream)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string postedStream = new StreamReader(stream).ReadToEnd();
            SaveExpenseReportData SaveExpenseReportOverAllData = js.Deserialize<SaveExpenseReportData>(postedStream);
            //List<PocketDCR2.Form.EditExpense.DailyExpenseRow> DailyData = js.Deserialize<List<PocketDCR2.Form.EditExpense.DailyExpenseRow>>(SaveExpenseReportOverAllData.ExpenseDataJson);
            string returnstring = string.Empty;
            for (int i = 0; i < SaveExpenseReportOverAllData.ExpenseDataJson.Length; i++)
            {
                DailyExpenseRow DailyObject = SaveExpenseReportOverAllData.ExpenseDataJson[i];
                if (DailyObject.EEDailyId=="0")
                {
                    try
                    {
                        nv.Clear();
                        nv.Add("@EEMonthlyId-int", DailyObject.EEMonthlyId.ToString());
                        nv.Add("@EEDay-int", DailyObject.EEDay.ToString());
                        nv.Add("@VisitPurpose-varchar(100)", DailyObject.VisitPurpose.ToString());
                        nv.Add("@TourDayClosing-varchar(100)", DailyObject.TourDayClosing.ToString());
                        nv.Add("@NightStay-varchar(100)", DailyObject.NightStay.ToString());
                        nv.Add("@OutBack-varchar(100)", DailyObject.OutBack.ToString());
                        nv.Add("@DailyAllowance-varchar(100)", DailyObject.DailyAllowance.ToString());
                        nv.Add("@CNGExpense-varchar(100)", DailyObject.CNGAllowance.ToString());
                        nv.Add("@InstitutionAllowance-varchar(100)", DailyObject.InstitutionAllowance.ToString());
                        var data = dl.GetData("sp_InsertDailyExpense", nv);
                        //returnstring = data.Tables[0].ToJsonString();
                        if (data!=null)
                        {
                            if (data.Tables[0].Rows.Count!=0)
                            {
                                DailyObject.EEDailyId = data.Tables[0].Rows[0][0].ToString();
                            }
                        }
                        
                    }
                    catch (Exception ex)
                    {
                        returnstring = ex.Message;
                    }
                }
                else
                {
                    try
                    {
                        nv.Clear();
                        nv.Add("@EEMonthlyId-int", DailyObject.EEMonthlyId.ToString());
                        nv.Add("@EEDialyId-int", DailyObject.EEDailyId.ToString());
                        nv.Add("@VisitPurpose-varchar(100)", DailyObject.VisitPurpose.ToString());
                        nv.Add("@TourDayClosing-varchar(100)", DailyObject.TourDayClosing.ToString());
                        nv.Add("@NightStay-varchar(100)", DailyObject.NightStay.ToString());
                        nv.Add("@OutBack-varchar(100)", DailyObject.OutBack.ToString());
                        nv.Add("@DailyAllowance-varchar(100)", DailyObject.DailyAllowance.ToString());
                        nv.Add("@CNGExpense-varchar(100)", DailyObject.CNGAllowance.ToString());
                        nv.Add("@InstitutionAllowance-varchar(100)", DailyObject.InstitutionAllowance.ToString());
                        var data = dl.GetData("sp_UpdateDailyExpense", nv);
                        //returnstring = data.Tables[0].ToJsonString();

                    }
                    catch (Exception ex)
                    {
                        returnstring = ex.Message;
                    }
                }
                DailyDetialExpenseRow[] array = DailyObject.DailyDataJson;
                for (int j = 0; j < array.Length; j++)
                {
                    if (DailyObject.VisitPurpose == "5" || DailyObject.VisitPurpose == "14" || DailyObject.VisitPurpose == "16")
                    {
                        nv.Clear();
                        nv.Add("@EmployeeExpenseDailyId-int", DailyObject.EEDailyId.ToString());
                        var data = dl.GetData("sp_deleteCityDistancesByDailyId", nv);
                    }
                    else
                    {
                        if (array[j].EEDailyDetailId == "0")
                        {
                            try
                            {
                                nv.Clear();
                                nv.Add("@EEMonthlyId-int", DailyObject.EEMonthlyId.ToString());
                                nv.Add("@VisitPurpose-varchar", DailyObject.VisitPurpose);
                                nv.Add("@TourDayClosing-varchar", DailyObject.TourDayClosing);
                                nv.Add("@NightStay-varchar(100)", DailyObject.NightStay.ToString());
                                nv.Add("@OutBack-varchar(100)", DailyObject.OutBack.ToString());
                                nv.Add("@DailyAllowance-varchar(100)", DailyObject.DailyAllowance.ToString());
                                nv.Add("@CNGExpense-varchar(100)", DailyObject.CNGAllowance.ToString());
                                nv.Add("@InstitutionAllowance-varchar(100)", DailyObject.InstitutionAllowance.ToString());
                                nv.Add("@EEDailyId-int", DailyObject.EEDailyId.ToString());
                                nv.Add("@EEDay-int", DailyObject.EEDay.ToString());
                                nv.Add("@fromCity-varchar", array[j].fromCity);
                                nv.Add("@toCity-varchar", array[j].toCity);
                                nv.Add("@milageKM-varchar", array[j].milageKM);
                                nv.Add("@Fare-varchar", ((array[j].TravelType == "True") ? "0" : "1"));
                                var data = dl.GetData("sp_saveCityDistance", nv);
                                //returnstring = data.Tables[0].ToJsonString();

                            }
                            catch (Exception ex)
                            {
                                returnstring = ex.Message;
                            }
                        }
                        else
                        {
                            try
                            {
                                nv.Clear();
                                nv.Add("@EmployeeExpenseDailyDetailId-int", array[j].EEDailyDetailId.ToString());
                                nv.Add("@EmployeeExpenseDailyId-int", DailyObject.EEDailyId.ToString());
                                nv.Add("@FromCity-varchar", array[j].fromCity);
                                nv.Add("@ToCity-varchar", array[j].toCity);
                                nv.Add("@MilageKm-varchar", array[j].milageKM);
                                nv.Add("@Fare-varchar", ((array[j].TravelType == "True") ? "0" : "1"));
                                var data = dl.GetData("sp_UpdateDailyExpenseDetail", nv);
                                //returnstring = data.Tables[0].ToJsonString();

                            }
                            catch (Exception ex)
                            {
                                returnstring = ex.Message;
                            }
                        }
                    }
                }
            }
            try
            {
                nv.Clear();
                nv.Add("@monthlyId-INT", SaveExpenseReportOverAllData.MonthlyId.ToString());
                nv.Add("@miscExpense-varchar(100)", SaveExpenseReportOverAllData.MiscExpense.ToString());
                nv.Add("@Note-varchar(100)", SaveExpenseReportOverAllData.ExpenseNote.ToString());
                nv.Add("@CellPhoneBillAmountCorrection-varchar(100)", SaveExpenseReportOverAllData.CellPhoneBillAmountCorrection.ToString());
                nv.Add("@BikeDeduction-varchar(100)", SaveExpenseReportOverAllData.BikeDeduction.ToString());
                var data = dl.GetData("sp_SaveExpenseReport", nv);
                //returnstring = data.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }

        [DataContract]
        public class SaveExpenseReportData
        {
            [DataMember(Name = "MonthlyId")]
            public string MonthlyId { get; set; }

            [DataMember(Name = "MiscExpense")]
            public string MiscExpense { get; set; }

            [DataMember(Name = "ExpenseNote")]
            public string ExpenseNote { get; set; }

            [DataMember(Name = "CellPhoneBillAmountCorrection")]
            public string CellPhoneBillAmountCorrection { get; set; }

            [DataMember(Name = "BikeDeduction")]
            public string BikeDeduction { get; set; }


            [DataMember(Name = "ExpenseDataJson")]
            public DailyExpenseRow[] ExpenseDataJson { get; set; }
        }
        [DataContract]
        public class DailyExpenseRow
        {
            [DataMember(Name = "EEMonthlyId")]
            public string EEMonthlyId { get; set; }

            [DataMember(Name = "EEDailyId")]
            public string EEDailyId { get; set; }

            [DataMember(Name = "EEDay")]
            public string EEDay { get; set; }

            [DataMember(Name = "VisitPurpose")]
            public string VisitPurpose { get; set; }

            [DataMember(Name = "TourDayClosing")]
            public string TourDayClosing { get; set; }

            [DataMember(Name = "DailyAllowance")]
            public string DailyAllowance { get; set; }

            [DataMember(Name = "NightStay")]
            public string NightStay { get; set; }

            [DataMember(Name = "OutBack")]
            public string OutBack { get; set; }

            [DataMember(Name = "CNGAllowance")]
            public string CNGAllowance { get; set; }

            [DataMember(Name = "InstitutionAllowance")]
            public string InstitutionAllowance { get; set; }

            [DataMember(Name = "DailyDataJson")]
            public DailyDetialExpenseRow[] DailyDataJson { get; set; }
        }

        [DataContract]
        public class DailyDetialExpenseRow
        {

            [DataMember(Name = "EEDailyDetailId")]
            public string EEDailyDetailId { get; set; }

            [DataMember(Name = "EEDailyId")]
            public string EEDailyId { get; set; }

            [DataMember(Name = "fromCity")]
            public string fromCity { get; set; }

            [DataMember(Name = "toCity")]
            public string toCity { get; set; }

            [DataMember(Name = "milageKM")]
            public string milageKM { get; set; }

            [DataMember(Name = "TravelType")]
            public string TravelType { get; set; }
        }
    }

}

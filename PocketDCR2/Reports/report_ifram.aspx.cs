using System;
using System.Data;
using CrystalDecisions.CrystalReports.Engine;
using PocketDCR2.Reports.CrystalReports.DailyCallReport;
using PocketDCR2.Reports.CrystalReports.DescribedProducts;
using PocketDCR2.Reports.CrystalReports.DetailedProductFrequency;
using PocketDCR2.Reports.CrystalReports.DetailedWorkPlan;
using PocketDCR2.Reports.CrystalReports.ForecastedKPIByClass;
using PocketDCR2.Reports.CrystalReports.IncommingSmsSummary;
using PocketDCR2.Reports.CrystalReports.JVByClass;
using PocketDCR2.Reports.CrystalReports.JVByRegion;
using PocketDCR2.Reports.CrystalReports.JVReport;
using PocketDCR2.Reports.CrystalReports.KPIByClass;
using PocketDCR2.Reports.CrystalReports.KPIByClassPlanning;
using PocketDCR2.Reports.CrystalReports.MRDoctors;
using PocketDCR2.Reports.CrystalReports.MRSMSAccuracy;
using PocketDCR2.Reports.CrystalReports.MRs;
using PocketDCR2.Reports.CrystalReports.MVADraftPlan;
using PocketDCR2.Reports.CrystalReports.MVAPlan;
using PocketDCR2.Reports.CrystalReports.MessageCount;
using PocketDCR2.Reports.CrystalReports.MonthlyVisitAnalysis;
using PocketDCR2.Reports.CrystalReports.PlanningRPT1;
using PocketDCR2.Reports.CrystalReports.PlanningRPTBMD;
using PocketDCR2.Reports.CrystalReports.PlanningRPTJV;
using PocketDCR2.Reports.CrystalReports.SampleIssuedToDoc;
using PocketDCR2.Reports.CrystalReports.SmsStatus;
using PocketDCR2.Reports.CrystalReports.VisitByTime;
using PocketDCR2.Reports.CrystalReports.SpecialityWiseProduct;
using PocketDCR2.Reports.CrystalReports.MRBestRatingReport;
using PocketDCR2.Reports.CrystalReports.MRBestRatingReportDetail;
using PocketDCR2.Reports.CrystalReports.MonthlyExpense;
using PocketDCR2.Reports.CrystalReports.NoContactPoint;
using PocketDCR2.Reports.CrystalReports.UpcountryVsLocalWorking;
using PocketDCR2.Reports.CrystalReports.MRsAll;
using PocketDCR2.Reports.CrystalReports.DistributerProfiling;
using PocketDCR2.Reports.CrystalReports.AttendanceReportforHR;
using PocketDCR2.Reports.CrystalReports.MonthlyMeetingReport;
using PocketDCR2.Reports.CrystalReports.InsertiveReport;

using System.IO;
using CrystalDecisions.Shared;
using PocketDCR2.Reports.CrystalReports.AssignDocCount;
using System.Configuration;


namespace PocketDCR2.Reports
{
    public partial class report_ifram : System.Web.UI.Page
    {
        #region Object Intialization

        CrystalReports.DailyCallReport.CrystalReport41 dcr1 = new CrystalReports.DailyCallReport.CrystalReport41();
        CrystalReports.DescribedProducts.DescribedProducts dcr2 = new CrystalReports.DescribedProducts.DescribedProducts();
        CrystalReports.DetailedProductFrequency.DetailedProductFreq dpf = new CrystalReports.DetailedProductFrequency.DetailedProductFreq();
        CrystalReports.DetailedProductFrequency.DetailedProductFreq dpf2 = new CrystalReports.DetailedProductFrequency.DetailedProductFreq();
        CrystalReports.IncommingSmsSummary.IncomingSMSSummary incom = new CrystalReports.IncommingSmsSummary.IncomingSMSSummary();
        CrystalReports.JVByClass.JVbyClass dcr3 = new CrystalReports.JVByClass.JVbyClass();
        CrystalReports.KPIByClass.KPIbyClass Kpi = new CrystalReports.KPIByClass.KPIbyClass();
        CrystalReports.MessageCount.MessageCount mescount = new CrystalReports.MessageCount.MessageCount();
        CrystalReports.MonthlyVisitAnalysis.VisitsByMonth reportDocument = new CrystalReports.MonthlyVisitAnalysis.VisitsByMonth();
        CrystalReports.MRSMSAccuracy.rptDivisionDateWiseAccuracyReport mRSMSa = new CrystalReports.MRSMSAccuracy.rptDivisionDateWiseAccuracyReport();
        CrystalReports.MRDoctors.MrDoctorsNew mrdrlist = new CrystalReports.MRDoctors.MrDoctorsNew();
        CrystalReports.MRs.MRs Mrlist = new CrystalReports.MRs.MRs();
        CrystalReports.SampleIssuedToDoc.SampleToDoctor samDR = new CrystalReports.SampleIssuedToDoc.SampleToDoctor();
        CrystalReports.SmsStatus.SMSStatus smsst = new CrystalReports.SmsStatus.SMSStatus();
        CrystalReports.VisitByTime.VisitsByTime vbt = new CrystalReports.VisitByTime.VisitsByTime();
        CrystalReports.JVReport.JVReport JVr = new CrystalReports.JVReport.JVReport();
        CrystalReports.JVByRegion.JVByRegion JVr1 = new CrystalReports.JVByRegion.JVByRegion();
        CrystalReports.PlanningRPT1.PlanningRPT1 prpt1 = new CrystalReports.PlanningRPT1.PlanningRPT1();
        CrystalReports.MVAPlan.MVAPlan mvaplan = new CrystalReports.MVAPlan.MVAPlan();
        CrystalReports.KPIByClassPlanning.KPIByClassWithPLan kpiclas = new CrystalReports.KPIByClassPlanning.KPIByClassWithPLan();
        CrystalReports.PlanningRPTJV.PlanningReportJV prptjv = new CrystalReports.PlanningRPTJV.PlanningReportJV();
        CrystalReports.PlanningRPTBMD.PlanningReportBMD prptBMD = new CrystalReports.PlanningRPTBMD.PlanningReportBMD();
        CrystalReports.DetailedWorkPlan.DetailedWorkPlan detailedWorkPlanrpt1 = new CrystalReports.DetailedWorkPlan.DetailedWorkPlan();
        CrystalReports.ForecastedKPIByClass.ForecastedKPIByClass forkpi = new CrystalReports.ForecastedKPIByClass.ForecastedKPIByClass();
        CrystalReports.MVADraftPlan.MVADraftPlan mvaDraftPlan = new MVADraftPlan();
        CrystalReports.CoachingWithFLM.rptCoachingCallsWithFLM rptCoachingFLM = new CrystalReports.CoachingWithFLM.rptCoachingCallsWithFLM();
        CrystalReports.CoachingForFLM.rptCoachingCallsForFLM CoachingForFLM = new CrystalReports.CoachingForFLM.rptCoachingCallsForFLM();
        CrystalReports.CRmUserList.CRMUserList CRMList = new CrystalReports.CRmUserList.CRMUserList();
        CrystalReports.LoginSummary.LoginSummary reportLoginSummary = new CrystalReports.LoginSummary.LoginSummary();
        CrystalReports.LoginDetail.LoginDetailReport LoginDetailReport = new CrystalReports.LoginDetail.LoginDetailReport();
        CrystalReports.LoginDetailWithdate.rptLoginDetailWithDateTime LoginDetailWithDateTimerpt = new CrystalReports.LoginDetailWithdate.rptLoginDetailWithDateTime();
        //CrystalReports.CustomerList.CustomerList rptTargetCustomers = new CrystalReports.CustomerList.CustomerList();
        //CrystalReports.commercialreport.CommercialReports commercial = new CrystalReports.commercialreport.CommercialReports();
        CrystalReports.SpecialityWiseProduct.SpecialityWiseReport specialwise = new CrystalReports.SpecialityWiseProduct.SpecialityWiseReport();
        CrystalReports.Salefeedbackmio.salefeedbackmio salfedmio = new CrystalReports.Salefeedbackmio.salefeedbackmio();
        CrystalReports.SalefeedbackFlm.salefeedbackflm salfedflm = new CrystalReports.SalefeedbackFlm.salefeedbackflm();
        CrystalReports.CallStatusReport.CallStatusReport csr = new CrystalReports.CallStatusReport.CallStatusReport();
        CrystalReports.CallStatusReportMTD.CallStatusReportMTD csrmtd = new CrystalReports.CallStatusReportMTD.CallStatusReportMTD();
        CrystalReports.FieldWorkReport.FieldWorkReport fwr = new CrystalReports.FieldWorkReport.FieldWorkReport();
        CrystalReports.FieldWorkReportMTD.FieldWorkReportMTD fwrmtd = new CrystalReports.FieldWorkReportMTD.FieldWorkReportMTD();
        CrystalReports.SampleInventory.SampleInventory saminv = new CrystalReports.SampleInventory.SampleInventory();
        CrystalReports.EmployeeSummaryReport.SummaryReport summaryReport = new CrystalReports.EmployeeSummaryReport.SummaryReport();
        CrystalReports.MioFeedback.MioFeedbackReport mio = new CrystalReports.MioFeedback.MioFeedbackReport();
        CrystalReports.EDetailingReport.EDetailingReport EDetailingrpt = new CrystalReports.EDetailingReport.EDetailingReport();
        CrystalReports.GetArea.GetDocArea getarea = new CrystalReports.GetArea.GetDocArea();
        CrystalReports.DoctorTagging.DoctorTaging doctag = new CrystalReports.DoctorTagging.DoctorTaging();
        CrystalReports.SOCallReason.SaleOfficerCallReason SOcallReason_rpt = new CrystalReports.SOCallReason.SaleOfficerCallReason();
        CrystalReports.DayViewSPORpt.DayViewSPO DayViewRpt = new CrystalReports.DayViewSPORpt.DayViewSPO();
        CrystalReports.PlanStatus.PlanStatus PlanStatusRpt = new CrystalReports.PlanStatus.PlanStatus();
        CrystalReports.QuizTestReport.QuizTestReport QuizTestRpt = new CrystalReports.QuizTestReport.QuizTestReport();
        CrystalReports.QuizTestReport.NotSubmittedQuizTestReport NotSubmittedQuizTestRpt = new CrystalReports.QuizTestReport.NotSubmittedQuizTestReport();
        CrystalReports.QuizTestReport.TotalAttemptsQuizTest TotalAttemptsQuizTestRpt = new CrystalReports.QuizTestReport.TotalAttemptsQuizTest();
        CrystalReports.QuizTestReport.QuizTestRatioReport QuizTestRatioRpt = new CrystalReports.QuizTestReport.QuizTestRatioReport();
        CrystalReports.ZeroCallReport.ZeroCallReport ZeroCallRpt = new CrystalReports.ZeroCallReport.ZeroCallReport();
        CrystalReports.ActivityLeaveReport.ActivityLeaveRpt AttendenceLaeve_Rpt = new CrystalReports.ActivityLeaveReport.ActivityLeaveRpt();
        CrystalReports.CallExecutionDetailsReport.CallExecutionDetailsReport CedReport = new CrystalReports.CallExecutionDetailsReport.CallExecutionDetailsReport();
        CrystalReports.MioCallReason.MioCallReason miocallreason = new CrystalReports.MioCallReason.MioCallReason();
        CrystalReports.MRBestRatingReport.MRBestRating MRBestRating = new CrystalReports.MRBestRatingReport.MRBestRating();
        CrystalReports.CustomerNotVisitedBYSPO.CustomerNotVisited CustomerNotVisited = new CrystalReports.CustomerNotVisitedBYSPO.CustomerNotVisited();
        CrystalReports.CallExecutionMonthlyData.CallExecutionDayByDayDetail CallExeDataDayByDay = new CrystalReports.CallExecutionMonthlyData.CallExecutionDayByDayDetail();
        CrystalReports.ProductWiseCall.ProductWiseCallDetail ProductWiseCallData = new CrystalReports.ProductWiseCall.ProductWiseCallDetail();
        CrystalReports.MRBestRatingReportDetail.MRBestRatingReportDetail MRBestRatingReportDetail = new CrystalReports.MRBestRatingReportDetail.MRBestRatingReportDetail();
        CrystalReports.AssignDocCount.AssignDocCount adc1 = new CrystalReports.AssignDocCount.AssignDocCount();
        CrystalReports.SfePerformanceReport.SfeReport Crmusage1 = new CrystalReports.SfePerformanceReport.SfeReport();
        CrystalReports.TotalSpoPlanReport.TotalSpoPlansReport spos = new CrystalReports.TotalSpoPlanReport.TotalSpoPlansReport();
        CrystalReports.MonthlyVisitWithPlaningNew.MonthlyVsitWithPlaning MonthlyVsitWithPlaning = new CrystalReports.MonthlyVisitWithPlaningNew.MonthlyVsitWithPlaning();
        CrystalReports.UnvisitedDoctorReport.UnVisitedDoctor unVisitedDoctor = new CrystalReports.UnvisitedDoctorReport.UnVisitedDoctor();
        CrystalReports.FakeGPSUserDetail.FakeGPSUserDetail FakeGps = new CrystalReports.FakeGPSUserDetail.FakeGPSUserDetail();
        CrystalReports.MonthlyExpense.MonthlyExpense MonthlyExpense = new CrystalReports.MonthlyExpense.MonthlyExpense();
        CrystalReports.ContactPoint.CPrpt CPrpt = new CrystalReports.ContactPoint.CPrpt();
        CrystalReports.MonthlyVisitAnalysis_SPO.VisitAnalysisBySPO MonthlyVisitAnalysisBySPO = new CrystalReports.MonthlyVisitAnalysis_SPO.VisitAnalysisBySPO();
        CrystalReports.ExpenseTeamSummary.ExpenseTeamSummary expenseTeamSummary = new CrystalReports.ExpenseTeamSummary.ExpenseTeamSummary();
        CrystalReports.Expensesummaryofdeduction.Expensesummaryofdeduction expensesummaryofdeduction = new CrystalReports.Expensesummaryofdeduction.Expensesummaryofdeduction();
        CrystalReports.MasterExpense.MasterExpenseRpt MasterExpRpt = new CrystalReports.MasterExpense.MasterExpenseRpt();
        CrystalReports.SummerySellingReport.SummerySelling SummerySellingRpt = new CrystalReports.SummerySellingReport.SummerySelling();
        CrystalReports.SummeryMarketingReport.SummeryMarketing SummeryMarketingRpt = new CrystalReports.SummeryMarketingReport.SummeryMarketing();
        //CrystalReports.TerritoryCoverageReport.TerritoryCoverageReport TerritoryCoverageRpt = new CrystalReports.TerritoryCoverageReport.TerritoryCoverageReport();
        CrystalReports.TerritoryCoverageReportNew.TerritoryCoverageReportNew TerritoryCoverageRpt = new CrystalReports.TerritoryCoverageReportNew.TerritoryCoverageReportNew();
        CrystalReports.ExpenseTellyReport.ExpenseTellyReport expenseTellyReport = new CrystalReports.ExpenseTellyReport.ExpenseTellyReport();
        CrystalReports.NoContactPoint.NoContactPoint noContactPointReport = new CrystalReports.NoContactPoint.NoContactPoint();
        CrystalReports.AsmJointVisitReport.ASMJointReport asmj = new CrystalReports.AsmJointVisitReport.ASMJointReport();
        CrystalReports.UpcountryVsLocalWorking.UpcountryVsLocalWorking UVLW = new CrystalReports.UpcountryVsLocalWorking.UpcountryVsLocalWorking();
        CrystalReports.MRsAll.MRsAll MrListAllLevel = new CrystalReports.MRsAll.MRsAll();
        CrystalReports.DistributerProfiling.DistributerProfiling DistributerProfilingRpt = new CrystalReports.DistributerProfiling.DistributerProfiling();
        CrystalReports.AttendanceReportforHR.AttendanceReportforHR AttendanceReportForHR = new CrystalReports.AttendanceReportforHR.AttendanceReportforHR();
        CrystalReports.MonthlyMeetingReport.AdminMonthlyReport MonthlyMeetingReport = new CrystalReports.MonthlyMeetingReport.AdminMonthlyReport();
        CrystalReports.InsertiveReport.IncentiveReportNew InsertiveReport = new CrystalReports.InsertiveReport.IncentiveReportNew();


        #endregion

        #region Events
        protected void Page_Init(object sender, EventArgs e)
        {
            HyperLink1.Visible = false;
            int Reporttyp = Convert.ToInt32(Request.QueryString["reporttype"].ToString());
            switch (Reporttyp)
            {
                case 1:
                    try
                    {
                        if (Session["DailyCallReport"] != null && Session["DailyCallReport"] != "")
                        {
                            //dcr1 = (CrystalReports.DailyCallReport.CrystalReport41)Session["DailyCallReport"];
                            dcr1.Close();
                            dcr1.Dispose();
                            //DataView dv = (DataView)Session["DailyCallReport"];
                            //dcr1 = new CrystalReport41();
                            //dcr1.SetDataSource(dv);
                            dcr1 = new CrystalReports.DailyCallReport.CrystalReport41();
                            dcr1.SetDataSource((DataTable)Session["DailyCallReport"]);
                            CrystalReportViewer1.ReportSource = dcr1;

                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("DailyCallReport : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 2:
                    try
                    {

                        if (Session["DescribedProducts"] != null && Session["DescribedProducts"] != "")
                        {
                            //dcr2 = (CrystalReports.DescribedProducts.DescribedProducts)Session["DescribedProducts"];
                            dcr2.Close();
                            dcr2.Dispose();
                            DataView dv = (DataView)Session["DescribedProducts"];
                            dcr2 = new DescribedProducts();
                            dcr2.SetDataSource(dv);
                            CrystalReportViewer1.ReportSource = dcr2;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("DescribedProducts : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 3:
                    try
                    {

                        if (Session["DetailedProductsfrq"] != null && Session["DetailedProductsfrq"] != "")
                        {
                            dpf.Close();
                            dpf.Dispose();
                            DataView dv = (DataView)Session["DetailedProductsfrq"];
                            dpf = new DetailedProductFreq();
                            dpf.SetDataSource(dv);
                            CrystalReportViewer1.ReportSource = dpf;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("DetailedProductsfrq : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 4:
                    try
                    {
                        if (Session["DetailedProductsfrqD"] != null && Session["DetailedProductsfrqD"] != "")
                        {
                            dpf2.Close();
                            dpf2.Dispose();
                            dpf2 = new DetailedProductFreq();
                            dpf2.SetDataSource((DataView)Session["DetailedProductsfrqD"]);
                            CrystalReportViewer1.ReportSource = dpf2;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("DetailedProductsfrqD : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 5:
                    try
                    {
                        if (Session["incomingSummary"] != null && Session["incomingSummary"] != "")
                        {
                            incom.Close();
                            incom.Dispose();
                            incom = new IncomingSMSSummary();
                            incom.SetDataSource((DataView)Session["incomingSummary"]);
                            CrystalReportViewer1.ReportSource = incom;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("incomingSummary : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 6:
                    try
                    {
                        if (Session["JVByClass"] != null && Session["JVByClass"] != "")
                        {
                            dcr3.Close();
                            dcr3.Dispose();
                            dcr3 = new JVbyClass();
                            dcr3.SetDataSource((DataView)Session["JVByClass"]);
                            CrystalReportViewer1.ReportSource = dcr3;

                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("JVByClass : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 7:
                    try
                    {
                        if (Session["KPIByClass"] != null && Session["KPIByClass"] != "")
                        {
                            //Kpi = (CrystalReports.KPIByClass.KPIbyClass)Session["KPIByClass"];
                            Kpi.Close();
                            Kpi.Dispose();
                            Kpi = new KPIbyClass();
                            DataTable dt = (DataTable)Session["KPIByClass"];
                            Kpi.SetDataSource(dt);
                            CrystalReportViewer1.ReportSource = Kpi;
                            //Kpi.Close();
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("KPIByClass : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 8:
                    try
                    {
                        if (Session["MessageCount"] != null && Session["MessageCount"] != "")
                        {
                            mescount.Close();
                            mescount.Dispose();
                            mescount = new MessageCount();
                            mescount.SetDataSource((DataTable)Session["MessageCount"]);
                            CrystalReportViewer1.ReportSource = mescount;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("MessageCount : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 9:
                    try
                    {
                        if (Session["MonthlyVisitAnalysis"] != null && Session["MonthlyVisitAnalysis"] != "")
                        {
                            reportDocument.Close();
                            reportDocument.Dispose();
                            reportDocument = new VisitsByMonth();

                            DateTime dt1 = Convert.ToDateTime(Session["MVADate1"].ToString());
                            DateTime dt2 = Convert.ToDateTime(Session["MVADate2"].ToString());

                            var Month1name = reportDocument.ReportDefinition.ReportObjects["Text17"] as TextObject;
                            if (Month1name != null)
                            {
                                Month1name.Text = Convert.ToDateTime(dt1).ToString("MMMM-yyyy");
                            }
                            var Month2name = reportDocument.ReportDefinition.ReportObjects["Text18"] as TextObject;
                            if (Month2name != null)
                            {
                                Month2name.Text = Convert.ToDateTime(dt2).ToString("MMMM-yyyy");
                            }

                            var Month3name = reportDocument.ReportDefinition.ReportObjects["Text11"] as TextObject;
                            if (Month3name != null)
                            {
                                Month3name.Text = Convert.ToDateTime(dt1).ToString("MMMM");
                            }

                            if (Convert.ToDateTime(dt1).Month != Convert.ToDateTime(dt2).Month)
                            {
                                var Month4name = reportDocument.ReportDefinition.ReportObjects["Text16"] as TextObject;
                                if (Month4name != null)
                                {
                                    Month4name.Text = Convert.ToDateTime(dt2).ToString("MMMM");
                                }
                            }
                            reportDocument.SetDataSource((DataTable)Session["MonthlyVisitAnalysis"]);
                            CrystalReportViewer1.ReportSource = reportDocument;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("MonthlyVisitAnalysis : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 10:
                    try
                    {
                        if (Session["MRSMSAccuracy"] != null && Session["MRSMSAccuracy"] != "")
                        {
                            mRSMSa.Close();
                            mRSMSa.Dispose();
                            mRSMSa = new rptDivisionDateWiseAccuracyReport();
                            mRSMSa.SetDataSource((DataTable)Session["MRSMSAccuracy"]);
                            CrystalReportViewer1.ReportSource = mRSMSa;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("MRSMSAccuracy : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 11:
                    try
                    {
                        if (Session["MRDoctor"] != null && Session["MRDoctor"] != "")
                        {
                            mrdrlist.Close();
                            mrdrlist.Dispose();
                            mrdrlist = new MrDoctorsNew();
                            mrdrlist.SetDataSource((DataTable)Session["MRDoctor"]);
                            CrystalReportViewer1.ReportSource = mrdrlist;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("MRDoctor : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;

                case 12:
                    try
                    {
                        if (Session["MRList"] != null && Session["MRList"] != "")
                        {
                            Mrlist.Close();
                            Mrlist.Dispose();
                            DataTable dt = (DataTable)Session["MRList"];
                            Mrlist = new MRs();
                            Mrlist.SetDataSource(dt);
                            CrystalReportViewer1.ReportSource = Mrlist;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("MRList : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 13:
                    try
                    {
                        if (Session["SampleIssuedToDoc"] != null && Session["SampleIssuedToDoc"] != "")
                        {
                            samDR.Close();
                            samDR.Dispose();
                            DataView dv = (DataView)Session["SampleIssuedToDoc"];
                            samDR = new SampleToDoctor();
                            samDR.SetDataSource(dv);
                            CrystalReportViewer1.ReportSource = samDR;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("SampleIssuedToDoc : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 14:
                    try
                    {
                        if (Session["SmsStatus"] != null && Session["SmsStatus"] != "")
                        {
                            smsst.Close();
                            smsst.Dispose();
                            smsst = new SMSStatus();
                            smsst.SetDataSource((DataTable)Session["SmsStatus"]);
                            CrystalReportViewer1.ReportSource = smsst;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("SmsStatus : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 15:
                    try
                    {
                        if (Session["VisitByTime"] != null && Session["VisitByTime"] != "")
                        {
                            vbt.Close();
                            vbt.Dispose();
                            vbt = new VisitsByTime();
                            vbt.SetDataSource((DataTable)Session["VisitByTime"]);
                            CrystalReportViewer1.ReportSource = vbt;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("VisitByTime : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 16:
                    try
                    {
                        if (Session["JVReport"] != null && Session["JVReport"] != "")
                        {
                            JVr.Close();
                            JVr.Dispose();
                            JVr = new JVReport();
                            JVr.SetDataSource((DataTable)Session["JVReport"]);
                            CrystalReportViewer1.ReportSource = JVr;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("JVReport : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 17:
                    try
                    {

                        if (Session["JVByRegion"] != null && Session["JVByRegion"] != "")
                        {
                            JVr1.Close();
                            JVr1.Dispose();
                            JVr1 = new JVByRegion();
                            JVr1.SetDataSource((DataTable)Session["JVByRegion"]);
                            CrystalReportViewer1.ReportSource = JVr1;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("JVByRegion : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 18:
                    try
                    {

                        if (Session["PlanningRPT1"] != null && Session["PlanningRPT1"] != "")
                        {
                            prpt1.Close();
                            prpt1.Dispose();
                            prpt1 = new PlanningRPT1();
                            prpt1.SetDataSource((DataTable)Session["PlanningRPT1"]);
                            CrystalReportViewer1.ReportSource = prpt1;

                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("PlanningRPT1 : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 19:
                    try
                    {
                        if (Session["MVAPlan"] != null && Session["MVAPlan"] != "")
                        {
                            mvaplan.Close();
                            mvaplan.Dispose();
                            mvaplan = new MVAPlan();
                            mvaplan.SetDataSource((DataTable)Session["MVAPlan"]);
                            CrystalReportViewer1.ReportSource = mvaplan;
                            //mvaplan.ExportToDisk(ExportFormatType.ExcelRecord, @"C:\Test\test.xls");
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("MVAPlan : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 20:
                    try
                    {
                        if (Session["KPIByClassPlanning"] != null && Session["KPIByClassPlanning"] != "")
                        {
                            kpiclas.Close();
                            kpiclas.Dispose();
                            kpiclas = new KPIByClassWithPLan();
                            kpiclas.SetDataSource((DataTable)Session["KPIByClassPlanning"]);
                            CrystalReportViewer1.ReportSource = kpiclas;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("KPIByClassPlanning : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 21:
                    try
                    {
                        if (Session["PlanningRPTJV"] != null && Session["PlanningRPTJV"] != "")
                        {
                            prptjv.Close();
                            prptjv.Dispose();
                            prptjv = new PlanningReportJV();
                            prptjv.SetDataSource((DataTable)Session["PlanningRPTJV"]);
                            CrystalReportViewer1.ReportSource = prptjv;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("PlanningRPTJV : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 22:
                    try
                    {
                        if (Session["PlanningRPTBMD"] != null && Session["PlanningRPTBMD"] != "")
                        {
                            prptBMD.Close();
                            prptBMD.Dispose();
                            prptBMD = new PlanningReportBMD();
                            prptBMD.SetDataSource((DataTable)Session["PlanningRPTBMD"]);
                            CrystalReportViewer1.ReportSource = prptBMD;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("PlanningRPTBMD : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 23:
                    try
                    {
                        if (Session["DetailedWorkPlanReport"] != null && Session["DetailedWorkPlanReport"] != "")
                        {
                            detailedWorkPlanrpt1.Close();
                            detailedWorkPlanrpt1.Dispose();
                            detailedWorkPlanrpt1 = new DetailedWorkPlan();
                            detailedWorkPlanrpt1.DataDefinition.FormulaFields["CallTodayA"].Text = Session["CallTodayA"].ToString();
                            detailedWorkPlanrpt1.DataDefinition.FormulaFields["CallTodayB"].Text = Session["CallTodayB"].ToString();
                            detailedWorkPlanrpt1.DataDefinition.FormulaFields["CallTodayC"].Text = Session["CallTodayC"].ToString();
                            detailedWorkPlanrpt1.DataDefinition.FormulaFields["CallTodateA"].Text = Session["CallTodateA"].ToString();
                            detailedWorkPlanrpt1.DataDefinition.FormulaFields["CallTodateB"].Text = Session["CallTodateB"].ToString();
                            detailedWorkPlanrpt1.DataDefinition.FormulaFields["CallTodateC"].Text = Session["CallTodateC"].ToString();
                            detailedWorkPlanrpt1.DataDefinition.FormulaFields["Noofdays"].Text = Session["Noofdays"].ToString();
                            detailedWorkPlanrpt1.SetDataSource((DataView)Session["DetailedWorkPlanReport"]);
                            CrystalReportViewer1.ReportSource = detailedWorkPlanrpt1;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("DetailedWorkPlanReport : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 24:
                    try
                    {
                        if (Session["ForeCastdKPIByClass"] != null && Session["ForeCastdKPIByClass"] != "")
                        {
                            forkpi.Close();
                            forkpi.Dispose();
                            forkpi = new ForecastedKPIByClass();
                            forkpi.SetDataSource((DataTable)Session["ForeCastdKPIByClass"]);
                            CrystalReportViewer1.ReportSource = forkpi;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("ForeCastdKPIByClass : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 25:
                    try
                    {
                        if (Session["MVADraftPlan"] != null && Session["MVADraftPlan"] != "")
                        {
                            mvaDraftPlan.Close();
                            mvaDraftPlan.Dispose();
                            mvaDraftPlan = new MVADraftPlan();
                            mvaDraftPlan.SetDataSource((DataTable)Session["MVADraftPlan"]);
                            CrystalReportViewer1.ReportSource = mvaDraftPlan;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("MVADraftPlan : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 26:
                    try
                    {
                        if (Session["CoachingCallsFLM"] != null && Session["CoachingCallsFLM"] != "")
                        {
                            rptCoachingFLM.Close();
                            rptCoachingFLM.Dispose();
                            rptCoachingFLM = new CrystalReports.CoachingWithFLM.rptCoachingCallsWithFLM();
                            rptCoachingFLM.SetDataSource((DataTable)Session["CoachingCallsFLM"]);
                            CrystalReportViewer1.ReportSource = rptCoachingFLM;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("CoachingCallsFLM : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 27:
                    try
                    {
                        if (Session["CoachingCallsForFLM"] != null && Session["CoachingCallsForFLM"] != "")
                        {
                            CoachingForFLM.Close();
                            CoachingForFLM.Dispose();
                            CoachingForFLM = new CrystalReports.CoachingForFLM.rptCoachingCallsForFLM();
                            CoachingForFLM.SetDataSource((DataTable)Session["CoachingCallsForFLM"]);
                            CrystalReportViewer1.ReportSource = CoachingForFLM;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("CoachingCallsForFLM : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 28:
                    try
                    {
                        if (Session["CRMUserList"] != null && Session["CRMUserList"] != "")
                        {
                            CRMList.Close();
                            CRMList.Dispose();
                            CRMList = new CrystalReports.CRmUserList.CRMUserList();
                            CRMList.SetDataSource((DataTable)Session["CRMUserList"]);
                            CrystalReportViewer1.ReportSource = CRMList;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("CRMUserList : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 29:
                    try
                    {
                        if (Session["LoginSummaryReport"] != null && Session["LoginSummaryReport"] != "")
                        {
                            reportLoginSummary.Close();
                            reportLoginSummary.Dispose();
                            reportLoginSummary = new CrystalReports.LoginSummary.LoginSummary();
                            reportLoginSummary.SetDataSource((DataTable)Session["LoginSummaryReport"]);
                            CrystalReportViewer1.ReportSource = reportLoginSummary;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("LoginSummaryReport : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 30:
                    try
                    {
                        if (Session["LoginDetailsData"] != null && Session["LoginDetailsData"] != "")
                        {
                            LoginDetailReport.Close();
                            LoginDetailReport.Dispose();
                            LoginDetailReport = new CrystalReports.LoginDetail.LoginDetailReport();
                            LoginDetailReport.SetDataSource((DataTable)Session["LoginDetailsData"]);
                            CrystalReportViewer1.ReportSource = LoginDetailReport;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("LoginDetailsData : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 31:
                    try
                    {
                        if (Session["LoginDetailswithDateTime"] != null && Session["LoginDetailswithDateTime"] != "")
                        {
                            LoginDetailWithDateTimerpt.Close();
                            LoginDetailWithDateTimerpt.Dispose();
                            LoginDetailWithDateTimerpt = new CrystalReports.LoginDetailWithdate.rptLoginDetailWithDateTime();
                            LoginDetailWithDateTimerpt.SetDataSource((DataTable)Session["LoginDetailswithDateTime"]);
                            CrystalReportViewer1.ReportSource = LoginDetailWithDateTimerpt;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("LoginDetailswithDateTime : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 32:
                    try
                    {
                        if (Session["TargetCustomerList"] != null && Session["TargetCustomerList"] != "")
                        {
                            //rptTargetCustomers.Close();
                            //rptTargetCustomers.Dispose();
                            //rptTargetCustomers = new CrystalReports.CustomerList.CustomerList();
                            //rptTargetCustomers.SetDataSource((DataTable)Session["TargetCustomerList"]);
                            //CrystalReportViewer1.ReportSource = rptTargetCustomers;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Login Details with DateTime : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 34:
                    try
                    {
                        if (Session["CommercialList"] != null && Session["CommercialList"] != "")
                        {
                            //commercial.Close();
                            //commercial.Dispose();
                            //commercial = new CrystalReports.commercialreport.CommercialReports();
                            //commercial.SetDataSource((DataTable)Session["CommercialList"]);
                            //CrystalReportViewer1.ReportSource = commercial;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("CommercialList : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 35:
                    try
                    {
                        if (Session["ListofcustomerXL"] != null && Session["ListofcustomerXL"] != "")
                        {
                            HyperLink1.Visible = true;
                            var fielpath = Session["ListofcustomerXL"];
                            HyperLink1.NavigateUrl = "../Excels/" + fielpath.ToString();
                            HyperLink1.Text = "Download Excel " + fielpath.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("ListofcustomerXL : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 36:
                    try
                    {
                        if (Session["CommercialxlFilename"] != null && Session["CommercialxlFilename"] != "")
                        {
                            HyperLink1.Visible = true;
                            var fielpath = Session["CommercialxlFilename"];
                            HyperLink1.NavigateUrl = "../Excels/" + fielpath.ToString();
                            HyperLink1.Text = "Download Excel " + fielpath.ToString();

                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("CommercialxlFilename : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 37:
                    try
                    {//SpecialtyWiseProduct
                        if (Session["SpecialtyWiseProduct"] != null && Session["SpecialtyWiseProduct"] != "")
                        {
                            specialwise.Close();
                            specialwise.Dispose();
                            specialwise = new CrystalReports.SpecialityWiseProduct.SpecialityWiseReport();
                            specialwise.SetDataSource((DataTable)Session["SpecialtyWiseProduct"]);
                            CrystalReportViewer1.ReportSource = specialwise;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("SpecialtyWiseProduct : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;

                case 38:
                    try
                    {//Salefedbackmio
                        if (Session["Salefedbackmio"] != null && Session["Salefedbackmio"] != "")
                        {
                            salfedmio.Close();
                            salfedmio.Dispose();
                            salfedmio = new CrystalReports.Salefeedbackmio.salefeedbackmio();
                            salfedmio.SetDataSource((DataTable)Session["Salefedbackmio"]);
                            CrystalReportViewer1.ReportSource = salfedmio;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Sale Feedback MIO : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;

                case 39:
                    try
                    {//Salefedbackflm
                        if (Session["Salefedbackflm"] != null && Session["Salefedbackflm"] != "")
                        {
                            salfedflm.Close();
                            salfedflm.Dispose();
                            salfedflm = new CrystalReports.SalefeedbackFlm.salefeedbackflm();
                            salfedflm.SetDataSource((DataTable)Session["Salefedbackflm"]);
                            CrystalReportViewer1.ReportSource = salfedflm;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Sale Feedback FLM : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 40:
                    try
                    {
                        if (Session["CallStatusReport"] != null && Session["CallStatusReport"] != "")
                        {
                            csr.Close();
                            csr.Dispose();
                            csr = new CrystalReports.CallStatusReport.CallStatusReport();
                            csr.SetDataSource((DataTable)Session["CallStatusReport"]);
                            CrystalReportViewer1.ReportSource = csr;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Call Status Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 41:
                    try
                    {
                        if (Session["CallStatusReportMTD"] != null && Session["CallStatusReportMTD"] != "")
                        {
                            csrmtd.Close();
                            csrmtd.Dispose();
                            csrmtd = new CrystalReports.CallStatusReportMTD.CallStatusReportMTD();
                            csrmtd.SetDataSource((DataTable)Session["CallStatusReportMTD"]);
                            CrystalReportViewer1.ReportSource = csrmtd;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Call Status Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;


                case 42:
                    try
                    {
                        if (Session["FieldWorkReport"] != null && Session["FieldWorkReport"] != "")
                        {
                            fwr.Close();
                            fwr.Dispose();
                            fwr = new CrystalReports.FieldWorkReport.FieldWorkReport();
                            fwr.SetDataSource((DataTable)Session["FieldWorkReport"]);
                            CrystalReportViewer1.ReportSource = fwr;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Call Status Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 43:
                    try
                    {
                        if (Session["FieldWorkReportMTD"] != null && Session["FieldWorkReportMTD"] != "")
                        {
                            fwrmtd.Close();
                            fwrmtd.Dispose();
                            fwrmtd = new CrystalReports.FieldWorkReportMTD.FieldWorkReportMTD();
                            fwrmtd.SetDataSource((DataTable)Session["FieldWorkReportMTD"]);
                            CrystalReportViewer1.ReportSource = fwrmtd;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Call Status Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 44:
                    try
                    {
                        if (Session["total_and_balance"] != null && Session["total_and_balance"] != "")
                        {
                            saminv.Close();
                            saminv.Dispose();
                            saminv = new CrystalReports.SampleInventory.SampleInventory();
                            saminv.SetDataSource((DataTable)Session["total_and_balance"]);
                            CrystalReportViewer1.ReportSource = saminv;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Sample Inventory : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 45:
                    try
                    {
                        if (Session["EmployeeSummaryReport"] != null && Session["EmployeeSummaryReport"] != "")
                        {
                            summaryReport.Close();
                            summaryReport.Dispose();
                            summaryReport = new CrystalReports.EmployeeSummaryReport.SummaryReport();
                            summaryReport.SetDataSource((DataTable)Session["EmployeeSummaryReport"]);
                            CrystalReportViewer1.ReportSource = summaryReport;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Call Status Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 46:
                    try
                    {
                        if (Session["MioFeedbackReport"] != null && Session["MioFeedbackReport"] != "")
                        {
                            mio.Close();
                            mio.Dispose();
                            mio = new CrystalReports.MioFeedback.MioFeedbackReport();
                            mio.SetDataSource((DataTable)Session["MioFeedbackReport"]);
                            CrystalReportViewer1.ReportSource = mio;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("MioFeedbackReport : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 47:
                    try
                    {
                        if (Session["EDetailingReport"] != null && Session["EDetailingReport"] != "")
                        {
                            EDetailingrpt.Close();
                            EDetailingrpt.Dispose();
                            EDetailingrpt = new CrystalReports.EDetailingReport.EDetailingReport();
                            EDetailingrpt.SetDataSource((DataTable)Session["EDetailingReport"]);
                            CrystalReportViewer1.ReportSource = EDetailingrpt;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Call Status Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 48:
                    try
                    {
                        if (Session["TMDoctorLocation"] != null && Session["TMDoctorLocation"] != "")
                        {
                            getarea.Close();
                            getarea.Dispose();
                            getarea = new CrystalReports.GetArea.GetDocArea();
                            getarea.SetDataSource((DataTable)Session["TMDoctorLocation"]);
                            CrystalReportViewer1.ReportSource = getarea;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("SPODoctorArea : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 49:
                    try
                    {
                        if (Session["DoctorTagging"] != null && Session["DoctorTagging"] != "")
                        {
                            doctag.Close();
                            doctag.Dispose();
                            doctag = new CrystalReports.DoctorTagging.DoctorTaging();
                            doctag.SetDataSource((DataTable)Session["DoctorTagging"]);
                            CrystalReportViewer1.ReportSource = doctag;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Doctor Tagging Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 50:
                    try
                    {
                        if (Session["SOCallReason"] != null && Session["SOCallReason"] != "")
                        {
                            SOcallReason_rpt.Close();
                            SOcallReason_rpt.Dispose();
                            SOcallReason_rpt = new CrystalReports.SOCallReason.SaleOfficerCallReason();
                            SOcallReason_rpt.SetDataSource((DataTable)Session["SOCallReason"]);
                            CrystalReportViewer1.ReportSource = SOcallReason_rpt;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("SO Call Reason Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;

                case 51:
                    try
                    {
                        if (Session["DayViewSPO"] != null && Session["DayViewSPO"] != "")
                        {
                            DayViewRpt.Close();
                            DayViewRpt.Dispose();
                            DayViewRpt = new CrystalReports.DayViewSPORpt.DayViewSPO();
                            DayViewRpt.SetDataSource((DataTable)Session["DayViewSPO"]);
                            CrystalReportViewer1.ReportSource = DayViewRpt;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Day View SPO Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;

                case 52:
                    try
                    {
                        if (Session["PlanStatus"] != null && Session["PlanStatus"] != "")
                        {
                            PlanStatusRpt.Close();
                            PlanStatusRpt.Dispose();
                            PlanStatusRpt = new CrystalReports.PlanStatus.PlanStatus();
                            PlanStatusRpt.SetDataSource((DataTable)Session["PlanStatus"]);
                            CrystalReportViewer1.ReportSource = PlanStatusRpt;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Plan Status Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 53:
                    try
                    {
                        if (Session["RptName"].ToString() == "NotSubmittedReport")
                        {
                            if (Session["QuizTestNotSubmittedReport"] != null && Session["QuizTestNotSubmittedReport"] != "")
                            {
                                NotSubmittedQuizTestRpt.Close();
                                NotSubmittedQuizTestRpt.Dispose();
                                NotSubmittedQuizTestRpt = new CrystalReports.QuizTestReport.NotSubmittedQuizTestReport();
                                NotSubmittedQuizTestRpt.SetDataSource((DataTable)Session["QuizTestNotSubmittedReport"]);
                                CrystalReportViewer1.ReportSource = NotSubmittedQuizTestRpt;
                            }
                        }
                        else
                        {
                            if (Session["QuizTestReport"] != null && Session["QuizTestReport"] != "")
                            {
                                QuizTestRpt.Close();
                                QuizTestRpt.Dispose();
                                QuizTestRpt = new CrystalReports.QuizTestReport.QuizTestReport();
                                QuizTestRpt.SetDataSource((DataTable)Session["QuizTestReport"]);
                                CrystalReportViewer1.ReportSource = QuizTestRpt;
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Quiz Test Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 54:
                    try
                    {
                        if (Session["QuizTestAttemptsReport"] != null && Session["QuizTestAttemptsReport"] != "")
                        {
                            TotalAttemptsQuizTestRpt.Close();
                            TotalAttemptsQuizTestRpt.Dispose();
                            TotalAttemptsQuizTestRpt = new CrystalReports.QuizTestReport.TotalAttemptsQuizTest();
                            TotalAttemptsQuizTestRpt.SetDataSource((DataTable)Session["QuizTestAttemptsReport"]);
                            CrystalReportViewer1.ReportSource = TotalAttemptsQuizTestRpt;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Quiz Test Attempts Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 55:
                    try
                    {
                        if (Session["QuizTestRatioReport"] != null && Session["QuizTestRatioReport"] != "")
                        {
                            QuizTestRatioRpt.Close();
                            QuizTestRatioRpt.Dispose();
                            QuizTestRatioRpt = new CrystalReports.QuizTestReport.QuizTestRatioReport();
                            QuizTestRatioRpt.SetDataSource((DataTable)Session["QuizTestRatioReport"]);
                            CrystalReportViewer1.ReportSource = QuizTestRatioRpt;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Quiz Test Ratio Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 56:
                    try
                    {
                        if (Session["ZeroCallReport"] != null && Session["ZeroCallReport"] != "")
                        {
                            ZeroCallRpt.Close();
                            ZeroCallRpt.Dispose();
                            ZeroCallRpt = new CrystalReports.ZeroCallReport.ZeroCallReport();
                            ZeroCallRpt.SetDataSource((DataTable)Session["ZeroCallReport"]);
                            CrystalReportViewer1.ReportSource = ZeroCallRpt;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Zero Call Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 57:
                    try
                    {
                        if (Session["ActivityAttendenceStatusReport"] != null && Session["ActivityAttendenceStatusReport"] != "")
                        {
                            AttendenceLaeve_Rpt.Close();
                            AttendenceLaeve_Rpt.Dispose();
                            AttendenceLaeve_Rpt = new CrystalReports.ActivityLeaveReport.ActivityLeaveRpt();
                            AttendenceLaeve_Rpt.SetDataSource((DataTable)Session["ActivityAttendenceStatusReport"]);
                            CrystalReportViewer1.ReportSource = AttendenceLaeve_Rpt;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("ActivityAttendenceStatusReport: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 58:
                    try
                    {

                        if (Session["CallExecutionDetailsReport"] != null)
                        {

                            CedReport.Close();
                            CedReport.Dispose();
                            CedReport = new CrystalReports.CallExecutionDetailsReport.CallExecutionDetailsReport();
                            CedReport.SetDataSource((DataTable)Session["CallExecutionDetailsReport"]);
                            CrystalReportViewer1.ReportSource = CedReport;
                        }

                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Call Execution Details Report : " + ex.Message.ToString() + "Stack :" + ex.StackTrace.ToString());
                    }
                    break;
                case 59:
                    try
                    {
                        if (Session["MioCallReason"] != null && Session["MioCallReason"] != "")
                        {
                            miocallreason.Close();
                            miocallreason.Dispose();
                            miocallreason = new CrystalReports.MioCallReason.MioCallReason();
                            miocallreason.SetDataSource((DataTable)Session["MioCallReason"]);
                            CrystalReportViewer1.ReportSource = miocallreason;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("MioCallReason : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 60:
                    try
                    {
                        if (Session["MRBestRatingReport"] != null && Session["MRBestRatingReport"] != "")
                        {
                            MRBestRating.Close();
                            MRBestRating.Dispose();
                            MRBestRating = new CrystalReports.MRBestRatingReport.MRBestRating();
                            MRBestRating.SetDataSource((DataTable)Session["MRBestRatingReport"]);
                            CrystalReportViewer1.ReportSource = MRBestRating;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("MR Best Rating Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 61:
                    try
                    {
                        if (Session["CustomerNotVisitedBySPO"] != null && Session["CustomerNotVisitedBySPO"] != "")
                        {

                            CustomerNotVisited.Close();
                            CustomerNotVisited.Dispose();
                            CustomerNotVisited = new CrystalReports.CustomerNotVisitedBYSPO.CustomerNotVisited();
                            CustomerNotVisited.SetDataSource((DataTable)Session["CustomerNotVisitedBySPO"]);
                            CrystalReportViewer1.ReportSource = CustomerNotVisited;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Customer Not Visited By SPO : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;

                case 62:
                    try
                    {
                        if (Session["CallExecutionDataDAYByDAYDetail"] != null && Session["CallExecutionDataDAYByDAYDetail"] != "")
                        {

                            CallExeDataDayByDay.Close();
                            CallExeDataDayByDay.Dispose();
                            CallExeDataDayByDay = new CrystalReports.CallExecutionMonthlyData.CallExecutionDayByDayDetail();
                            CallExeDataDayByDay.SetDataSource((DataTable)Session["CallExecutionDataDAYByDAYDetail"]);
                            CrystalReportViewer1.ReportSource = CallExeDataDayByDay;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("CallExecution Data DAY By DAY Detail : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 63:
                    try
                    {
                        if (Session["ProductWiseCallsDetails"] != null && Session["ProductWiseCallsDetails"] != "")
                        {

                            ProductWiseCallData.Close();
                            ProductWiseCallData.Dispose();
                            ProductWiseCallData = new CrystalReports.ProductWiseCall.ProductWiseCallDetail();
                            ProductWiseCallData.SetDataSource((DataTable)Session["ProductWiseCallsDetails"]);
                            CrystalReportViewer1.ReportSource = ProductWiseCallData;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Product Wise Call Data: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;

                case 64:
                    try
                    {
                        if (Session["MRBestRatingReportDeatail"] != null && Session["MRBestRatingReportDeatail"] != "")
                        {

                            MRBestRatingReportDetail.Close();
                            MRBestRatingReportDetail.Dispose();
                            MRBestRatingReportDetail = new CrystalReports.MRBestRatingReportDetail.MRBestRatingReportDetail();
                            MRBestRatingReportDetail.SetDataSource((DataTable)Session["MRBestRatingReportDeatail"]);
                            CrystalReportViewer1.ReportSource = MRBestRatingReportDetail;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("MRBest Rating Report Detail Data: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 65:
                    try
                    {

                        if (Session["AssignDocCount"] != null && Session["AssignDocCount"] != "")
                        {
                            //dcr2 = (CrystalReports.DescribedProducts.DescribedProducts)Session["DescribedProducts"];
                            adc1.Close();
                            adc1.Dispose();
                            adc1 = new AssignDocCount();
                            adc1.SetDataSource((DataTable)Session["AssignDocCount"]);
                            CrystalReportViewer1.ReportSource = adc1;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("DescribedProducts : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 66:
                    try
                    {
                        if (Session["sferpt"] != null && Session["sferpt"] != "")
                        {



                            Crmusage1.Close();
                            Crmusage1.Dispose();
                            Crmusage1 = new CrystalReports.SfePerformanceReport.SfeReport();
                            Crmusage1.SetDataSource((DataTable)Session["sferpt"]);
                            CrystalReportViewer1.ReportSource = Crmusage1;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("DetailedProductsfrqD : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 67:
                    try
                    {
                        if (Session["totalsposresult"] != null && Session["totalsposresult"] != "")
                        {

                            spos.Close();
                            spos.Dispose();
                            spos = new CrystalReports.TotalSpoPlanReport.TotalSpoPlansReport();
                            spos.SetDataSource((DataTable)Session["totalsposresult"]);
                            CrystalReportViewer1.ReportSource = spos;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("MRBest Rating Report Detail Data: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;

                case 68:
                    try
                    {
                        if (Session["MonthlyVisitAnalysisWithPlanningNew"] != null && Session["MonthlyVisitAnalysisWithPlanningNew"] != "")
                        {
                            MonthlyVsitWithPlaning.Close();
                            MonthlyVsitWithPlaning.Dispose();
                            MonthlyVsitWithPlaning = new CrystalReports.MonthlyVisitWithPlaningNew.MonthlyVsitWithPlaning();
                            MonthlyVsitWithPlaning.SetDataSource((DataTable)Session["MonthlyVisitAnalysisWithPlanningNew"]);
                            CrystalReportViewer1.ReportSource = MonthlyVsitWithPlaning;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Monthly Vsit With Planing Report: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 69:
                    try
                    {
                        if (Session["UnVisitedDoctor"] != null)
                        {
                            unVisitedDoctor.Close();
                            unVisitedDoctor.Dispose();
                            unVisitedDoctor = new CrystalReports.UnvisitedDoctorReport.UnVisitedDoctor();
                            unVisitedDoctor.SetDataSource((DataTable)Session["UnVisitedDoctor"]);
                            CrystalReportViewer1.ReportSource = unVisitedDoctor;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("UnVisited Doctor Report: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;

                case 70:
                    try
                    {
                        if (Session["FakeGPSCallReport"] != null)
                        {
                            FakeGps.Close();
                            FakeGps.Dispose();
                            FakeGps = new CrystalReports.FakeGPSUserDetail.FakeGPSUserDetail();
                            FakeGps.SetDataSource((DataTable)Session["FakeGPSCallReport"]);
                            CrystalReportViewer1.ReportSource = FakeGps;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Fake GPS Calls Report: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;



                case 71:
                    try
                    {
                        if (Session["MonthlyExpense"] != null)
                        {
                            MonthlyExpense.Close();
                            MonthlyExpense.Dispose();
                            MonthlyExpense = new CrystalReports.MonthlyExpense.MonthlyExpense();
                            MonthlyExpense.SetDataSource((DataTable)Session["MonthlyExpense"]);
                            CrystalReportViewer1.ReportSource = MonthlyExpense;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Fake GPS Calls Report: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 72:
                    try
                    {
                        if (Session["ContactPointReport"] != null)
                        {
                            CPrpt.Close();
                            CPrpt.Dispose();
                            CPrpt = new CrystalReports.ContactPoint.CPrpt();
                            CPrpt.SetDataSource((DataTable)Session["ContactPointReport"]);
                            CrystalReportViewer1.ReportSource = CPrpt;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Contact Point Report: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 73:
                    try
                    {
                        if (Session["MonthlyVisitAnalysisSPO"] != null)
                        {
                            MonthlyVisitAnalysisBySPO.Close();
                            MonthlyVisitAnalysisBySPO.Dispose();
                            MonthlyVisitAnalysisBySPO = new CrystalReports.MonthlyVisitAnalysis_SPO.VisitAnalysisBySPO();
                            MonthlyVisitAnalysisBySPO.SetDataSource((DataTable)Session["MonthlyVisitAnalysisSPO"]);
                            CrystalReportViewer1.ReportSource = MonthlyVisitAnalysisBySPO;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Fake GPS Calls Report: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 74:
                    try
                    {
                        if (Session["ExpenseTeamSummary"] != null)
                        {
                            expenseTeamSummary.Close();
                            expenseTeamSummary.Dispose();
                            expenseTeamSummary = new CrystalReports.ExpenseTeamSummary.ExpenseTeamSummary();
                            expenseTeamSummary.SetDataSource((DataTable)Session["ExpenseTeamSummary"]);
                            CrystalReportViewer1.ReportSource = expenseTeamSummary;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Expense Team Summary Report: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 75:
                    try
                    {
                        if (Session["Expensesummaryofdeduction"] != null)
                        {
                            expensesummaryofdeduction.Close();
                            expensesummaryofdeduction.Dispose();
                            expensesummaryofdeduction = new CrystalReports.Expensesummaryofdeduction.Expensesummaryofdeduction();
                            expensesummaryofdeduction.SetDataSource((DataTable)Session["Expensesummaryofdeduction"]);
                            CrystalReportViewer1.ReportSource = expensesummaryofdeduction;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Expense Team Summary of Deduction Report: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;

                case 76:
                    try
                    {
                        if (Session["MasterExpenseReport"] != null)
                        {
                            MasterExpRpt.Close();
                            MasterExpRpt.Dispose();
                            MasterExpRpt = new CrystalReports.MasterExpense.MasterExpenseRpt();
                            MasterExpRpt.SetDataSource((DataTable)Session["MasterExpenseReport"]);
                            CrystalReportViewer1.ReportSource = MasterExpRpt;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Master Expense Report: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;

                case 77:
                    try
                    {
                        if (Session["SummerySellingReport"] != null)
                        {
                            SummerySellingRpt.Close();
                            SummerySellingRpt.Dispose();
                            SummerySellingRpt = new CrystalReports.SummerySellingReport.SummerySelling();
                            SummerySellingRpt.SetDataSource((DataTable)Session["SummerySellingReport"]);
                            CrystalReportViewer1.ReportSource = SummerySellingRpt;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Summery SellingRpt Report: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;

                case 78:
                    try
                    {
                        if (Session["SummeryMarketingReport"] != null)
                        {
                            SummeryMarketingRpt.Close();
                            SummeryMarketingRpt.Dispose();
                            SummeryMarketingRpt = new CrystalReports.SummeryMarketingReport.SummeryMarketing();
                            SummeryMarketingRpt.SetDataSource((DataTable)Session["SummeryMarketingReport"]);
                            CrystalReportViewer1.ReportSource = SummeryMarketingRpt;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Summery Marketing Report: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 79:
                    try
                    {
                        if (Session["TerritoryCoverageReport"] != null)
                        {
                            TerritoryCoverageRpt.Close();
                            TerritoryCoverageRpt.Dispose();
                            TerritoryCoverageRpt = new CrystalReports.TerritoryCoverageReportNew.TerritoryCoverageReportNew();
                            TerritoryCoverageRpt.SetDataSource((DataTable)Session["TerritoryCoverageReport"]);
                            CrystalReportViewer1.ReportSource = TerritoryCoverageRpt;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Territory Coverage Report: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 80:
                    try
                    {
                        if (Session["expenseTellyReport"] != null)
                        {
                            expenseTellyReport.Close();
                            expenseTellyReport.Dispose();
                            expenseTellyReport = new CrystalReports.ExpenseTellyReport.ExpenseTellyReport();
                            expenseTellyReport.SetDataSource((DataTable)Session["expenseTellyReport"]);
                            CrystalReportViewer1.ReportSource = expenseTellyReport;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Expense Telly Report: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 81:
                    try
                    {
                        if (Session["NoContactPointReport"] != null)
                        {
                            noContactPointReport.Close();
                            noContactPointReport.Dispose();
                            noContactPointReport = new CrystalReports.NoContactPoint.NoContactPoint();
                            noContactPointReport.SetDataSource((DataTable)Session["NoContactPointReport"]);
                            CrystalReportViewer1.ReportSource = noContactPointReport;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("No Contact Point Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 82:
                    try
                    {
                        if (Session["DailyCallReport"] != null && Session["DailyCallReport"] != "")
                        {
                            //dcr1 = (CrystalReports.DailyCallReport.CrystalReport41)Session["DailyCallReport"];
                            dcr1.Close();
                            dcr1.Dispose();
                            //DataView dv = (DataView)Session["DailyCallReport"];
                            //dcr1 = new CrystalReport41();
                            //dcr1.SetDataSource(dv);
                            dcr1 = new CrystalReports.DailyCallReport.CrystalReport41();
                            dcr1.SetDataSource((DataTable)Session["DailyCallReport"]);
                            CrystalReportViewer1.ReportSource = dcr1;

                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("DailyCallReport : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 83:
                    try
                    {
                        if (Session["ASMDoctorCallReportWithNewParameters"] != null && Session["ASMDoctorCallReportWithNewParameters"] != "")
                        {
                            asmj.Close();
                            asmj.Dispose();
                            asmj = new CrystalReports.AsmJointVisitReport.ASMJointReport();
                            asmj.SetDataSource((DataTable)Session["ASMDoctorCallReportWithNewParameters"]);
                            CrystalReportViewer1.ReportSource = asmj;

                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("ASM Joint Visit Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 88:
                    try
                    {
                        if (Session["Upcountry_Vs_LocalWorking"] != null && Session["Upcountry_Vs_LocalWorking"] != "")
                        {
                            UVLW.Close();
                            UVLW.Dispose();
                            UVLW = new CrystalReports.UpcountryVsLocalWorking.UpcountryVsLocalWorking();
                            UVLW.SetDataSource((DataTable)Session["Upcountry_Vs_LocalWorking"]);
                            CrystalReportViewer1.ReportSource = UVLW;

                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("ASM Joint Visit Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 89:
                    try
                    {
                        if (Session["MrListAllLevel"] != null && Session["MrListAllLevel"] != "")
                        {
                            MrListAllLevel.Close();
                            MrListAllLevel.Dispose();
                            DataTable dt = (DataTable)Session["MrListAllLevel"];
                            MrListAllLevel = new MRsAll();
                            MrListAllLevel.SetDataSource(dt);
                            CrystalReportViewer1.ReportSource = MrListAllLevel;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("MrListAllLevel : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                  
                    break;
                case 90:
                    try
                    {
                        if (Session["CallExecutionDataDAYByDAYDetail"] != null && Session["CallExecutionDataDAYByDAYDetail"] != "")
                        {
                            HyperLink1.Visible = true;
                            var fielpath = Session["CallExecutionDataDAYByDAYDetail"];
                            HyperLink1.NavigateUrl = "../Excels/" + fielpath.ToString();
                            HyperLink1.Text = "Download Excel " + fielpath.ToString();

                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("CallExecutionDataDAYByDAYDetail : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;

                case 91:
                    try
                    {
                        if (Session["WorkPlanBySPOInExcel"] != null && Session["WorkPlanBySPOInExcel"] != "")
                        {

                            HyperLink1.Visible = true;
                            var fielpath = Session["WorkPlanBySPOInExcel"];
                            HyperLink1.NavigateUrl = "../Excels/SPO_Report/" + fielpath.ToString();
                            HyperLink1.Text = "Download Excel " + fielpath.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("WorkPlanBySPOInExcel : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 92:
                    try
                    {
                        if (Session["WorkPlanByDSMInExcel"] != null && Session["WorkPlanByDSMInExcel"] != "")
                        {

                            HyperLink1.Visible = true;
                            var fielpath = Session["WorkPlanByDSMInExcel"];
                            HyperLink1.NavigateUrl = "../Excels/DSM_Report/" + fielpath.ToString();
                            HyperLink1.Text = "Download Excel " + fielpath.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("WorkPlanByDSMInExcel : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 93:
                    try
                    {
                        if (Session["WorkPlanBySMInExcel"] != null && Session["WorkPlanBySMInExcel"] != "")
                        {

                            HyperLink1.Visible = true;
                            var fielpath = Session["WorkPlanBySMInExcel"];
                            HyperLink1.NavigateUrl = "../Excels/SM_Report/" + fielpath.ToString();
                            HyperLink1.Text = "Download Excel " + fielpath.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("WorkPlanBySMInExcel : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;
                case 94:
                    try
                    {
                        if (Session["DistributerProfiling"] != null)
                        {
                            DistributerProfilingRpt.Close();
                            DistributerProfilingRpt.Dispose();
                            DistributerProfilingRpt = new CrystalReports.DistributerProfiling.DistributerProfiling();
                            DistributerProfilingRpt.SetDataSource((DataTable)Session["DistributerProfiling"]);
                            CrystalReportViewer1.ReportSource = DistributerProfilingRpt;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Distributer Profiling Report: " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;

                case 95:
                    try
                    {
                        if (Session["AttendanceReportForHR"] != null)
                        {
                            AttendanceReportForHR.Close();
                            AttendanceReportForHR.Dispose();
                            AttendanceReportForHR = new CrystalReports.AttendanceReportforHR.AttendanceReportforHR();
                            AttendanceReportForHR.SetDataSource((DataTable)Session["AttendanceReportForHR"]);
                            CrystalReportViewer1.ReportSource = AttendanceReportForHR;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Attendance Report For HR : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;



                case 96:
                    try
                    {
                        if (Session["MonthlyMeetingReport"] != null)
                        {
                            MonthlyMeetingReport.Close();
                            MonthlyMeetingReport.Dispose();
                            MonthlyMeetingReport = new CrystalReports.MonthlyMeetingReport.AdminMonthlyReport();
                            MonthlyMeetingReport.SetDataSource((DataTable)Session["MonthlyMeetingReport"]);
                            CrystalReportViewer1.ReportSource = MonthlyMeetingReport;
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Attendance Report For HR : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;


                  case 97:
                    try
                    {
                        if (Session["InsertiveReport"] != null)
                        {
                            //InsertiveReport.Close();
                            //InsertiveReport.Dispose();
                            //InsertiveReport = new CrystalReports.InsertiveReport.InsertiveReport();
                            //InsertiveReport.SetDataSource((DataTable)Session["InsertiveReport"]);
                            //CrystalReportViewer1.ReportSource = InsertiveReport;


                            //CrystalReports.InsertiveReport.IncentiveReport  rpt = new CrystalReports.InsertiveReport.IncentiveReport();
                            //rpt.SetDataSource((DataTable)Session["InsertiveReport"]);
                            //CrystalReportViewer1.ReportSource = rpt;

                            InsertiveReport.Close();
                            InsertiveReport.Dispose();
                            InsertiveReport = new CrystalReports.InsertiveReport.IncentiveReportNew();
                            InsertiveReport.SetDataSource((DataTable)Session["InsertiveReport"]);
                            CrystalReportViewer1.ReportSource = InsertiveReport;


                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLog("Insertive Report : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
                    }
                    break;

           }
            
        }

        protected void Page_Unload(object sender, EventArgs e)
        {
            try
            {

                CrystalReportViewer1.ReportSource = null;
            }
            catch (Exception ex)
            {
                ErrorLog("Page_Unload : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
            }
        }

        protected void CrystalReportViewer1_Unload(object sender, EventArgs e)
        {
            try
            {
                noContactPointReport.Close();
                noContactPointReport.Dispose();
                expenseTellyReport.Clone();
                expenseTellyReport.Dispose();
                TerritoryCoverageRpt.Close();
                TerritoryCoverageRpt.Dispose();
                expensesummaryofdeduction.Close();
                expensesummaryofdeduction.Dispose();
                expenseTeamSummary.Close();
                expenseTeamSummary.Dispose();
                CPrpt.Close();
                CPrpt.Dispose();
                Crmusage1.Close();
                Crmusage1.Dispose();
                miocallreason.Close();
                miocallreason.Dispose();
                CedReport.Close();
                CedReport.Dispose();
                AttendenceLaeve_Rpt.Close();
                AttendenceLaeve_Rpt.Dispose();
                dcr3.Close();
                dcr3.Dispose();
                dcr1.Close();
                dcr1.Dispose();
                dcr2.Close();
                dcr2.Dispose();
                dpf.Close();
                UVLW.Close();
                UVLW.Dispose();
                dpf.Dispose();
                dpf2.Close();
                dpf2.Dispose();
                incom.Close();
                incom.Dispose();
                dcr3.Close();
                dcr3.Dispose();
                Kpi.Close();
                Kpi.Dispose();
                mescount.Close();
                mescount.Dispose();
                reportDocument.Close();
                reportDocument.Dispose();
                mRSMSa.Close();
                mRSMSa.Dispose();
                mrdrlist.Close();
                mrdrlist.Dispose();
                Mrlist.Close();
                Mrlist.Dispose();
                MrListAllLevel.Close();
                MrListAllLevel.Dispose();
                samDR.Close();
                samDR.Dispose();
                smsst.Close();
                smsst.Dispose();
                vbt.Close();
                vbt.Dispose();
                JVr.Close();
                JVr.Dispose();
                JVr1.Close();
                JVr1.Dispose();
                prpt1.Close();
                prpt1.Dispose();
                mvaplan.Close();
                mvaplan.Dispose();
                kpiclas.Close();
                kpiclas.Dispose();
                prptjv.Close();
                prptjv.Dispose();
                prptBMD.Close();
                prptBMD.Dispose();
                detailedWorkPlanrpt1.Close();
                detailedWorkPlanrpt1.Dispose();
                forkpi.Close();
                forkpi.Dispose();
                mvaDraftPlan.Close();
                mvaDraftPlan.Dispose();
                rptCoachingFLM.Close();
                rptCoachingFLM.Dispose();
                CoachingForFLM.Close();
                CoachingForFLM.Dispose();
                CRMList.Close();
                CRMList.Dispose();
                //rptTargetCustomers.Close();
                //rptTargetCustomers.Dispose();
                //commercial.Close();
                //commercial.Dispose();
                specialwise.Close();
                specialwise.Dispose();
                salfedmio.Close();
                salfedmio.Dispose();
                salfedflm.Close();
                salfedflm.Dispose();
                summaryReport.Close();
                summaryReport.Dispose();
                mio.Close();
                mio.Dispose();
                SOcallReason_rpt.Close();
                SOcallReason_rpt.Dispose();
                DayViewRpt.Close();
                DayViewRpt.Dispose();
                PlanStatusRpt.Close();
                PlanStatusRpt.Dispose();


                QuizTestRpt.Close();
                QuizTestRpt.Dispose();
                NotSubmittedQuizTestRpt.Close();
                NotSubmittedQuizTestRpt.Dispose();
                TotalAttemptsQuizTestRpt.Close();
                TotalAttemptsQuizTestRpt.Dispose();
                QuizTestRatioRpt.Close();
                QuizTestRatioRpt.Dispose();
                ZeroCallRpt.Dispose();
                MRBestRating.Close();
                MRBestRating.Dispose();
                adc1.Close();
                adc1.Dispose();
                spos.Close();
                spos.Dispose();
                MonthlyVsitWithPlaning.Close();
                MonthlyVsitWithPlaning.Dispose();
                unVisitedDoctor.Close();
                unVisitedDoctor.Dispose();
                FakeGps.Close();
                FakeGps.Dispose();
                MasterExpRpt.Close();
                MasterExpRpt.Dispose();

                SummeryMarketingRpt.Close();
                SummeryMarketingRpt.Dispose();
                SummerySellingRpt.Close();
                SummerySellingRpt.Dispose();
                asmj.Close();
                asmj.Dispose();


            }
            catch (Exception ex)
            {
                ErrorLog("CrystalReportViewer1_Unload : " + ex.Message.ToString() + "Stack : " + ex.StackTrace.ToString());
            }
        }

        private void ErrorLog(string error)
        {
            try
            {
                if (!Directory.Exists(ConfigurationManager.AppSettings[@"Logs"].ToString()))
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings[@"Logs"].ToString());
                }

                File.AppendAllText(ConfigurationManager.AppSettings[@"Logs\"].ToString() + "PBG_ReportsLog_" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
                    DateTime.Now + " : " + error + Environment.NewLine);
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        #endregion
    }
}
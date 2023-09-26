using MyCRMServices.Class;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Web.Hosting;
using System.Web.Script.Serialization;

namespace MyCRMServices
{
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "MobileService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select MobileService.svc or MobileService.svc.cs at the Solution Explorer and start debugging.
    public class MobileService : IMobileService
    {

        readonly DAL _dl = new DAL();
        private NameValueCollection _nv = new NameValueCollection();

        JavaScriptSerializer serializer = new JavaScriptSerializer();

        public void DoWork()
        {
        }

        public System.ServiceModel.Channels.Message DownloadFileForMIO(string empid, string mobile, string date)
        {
            //SchdulerDayView.asmx/GetAllDoctors
            //SchdulerDayView.asmx/GetAllProducts
            //SchdulerDayView.asmx/GetAllGifts
            //SchdulerDayView.asmx/predays
            //SchdulerDayView.asmx/GetSalesTodayvsDailyTarget
            //getDoctorWithSampleQty
            //getDoctorWithGiftQty
            //getSampleQty
            var returnResult = string.Empty;
            //string downloadFilePath="";
            try
            {
                returnResult += "<Data>";

                returnResult += "<GetAllDoctors>";
                returnResult += new SchdulerDayView().GetAllDoctors(empid, date, "Execution");
                returnResult += "</GetAllDoctors>";

                //returnResult += "<GetAllDoctorswithMultipleAddress>";
                //returnResult += new SchdulerDayView().GetAllDoctorswithMultipleAddress(empid, date, "Execution");
                //returnResult += "</GetAllDoctorswithMultipleAddress>";

                //12-30-2019 By Shahrukh
                returnResult += "<GetAllDistributor>";
                returnResult += new SchdulerDayView().GetAllDistributor(empid, date);
                returnResult += "</GetAllDistributor>";
                //12-30-2019 By Shahrukh
                returnResult += "<GetAllBricks>";
                returnResult += new SchdulerDayView().GetAllBricksByDistributor(empid, date);
                returnResult += "</GetAllBricks>";

                //returnResult += "<GetAllDoctorswithdate>";
                //returnResult += new SchdulerDayView().GetAllDoctorswithdate(empid, date, "Execution");
                //returnResult += "</GetAllDoctorswithdate>";

                returnResult += "<GetAllProducts>";
                returnResult += new SchdulerDayView().GetAllProducts(empid, "Execution");
                returnResult += "</GetAllProducts>";

                returnResult += "<GetAllSamples>";
                returnResult += new SchdulerDayView().GetAllSamples(empid);
                returnResult += "</GetAllSamples>";


                returnResult += "<GetAllGifts>";
                returnResult += new SchdulerDayView().GetAllGifts();
                returnResult += "</GetAllGifts>";

                returnResult += "<predays>";
                returnResult += new SchdulerDayView().predays(mobile);
                returnResult += "</predays>";

                returnResult += "<GetSalesTodayvsDailyTarget>";
                returnResult += new SchdulerDayView().GetSalesTodayvsDailyTarget();
                returnResult += "</GetSalesTodayvsDailyTarget>";

                returnResult += "<getDoctorWithSampleQty>";
                returnResult += new SchdulerDayView().getDoctorWithSampleQty(mobile);
                returnResult += "</getDoctorWithSampleQty>";

                returnResult += "<getDoctorWithGiftQty>";
                returnResult += new SchdulerDayView().getDoctorWithGiftQty(mobile);
                returnResult += "</getDoctorWithGiftQty>";

                returnResult += "<getSampleQty>";
                returnResult += new SchdulerDayView().getSampleQty(empid, date);
                returnResult += "</getSampleQty>";

                returnResult += "<getPDFDetails>";
                returnResult += new SchdulerDayView().GetAllPdfDetailsByEmployeeID(date, empid);
                returnResult += "</getPDFDetails>";

                returnResult += "<getVideoDetails>";
                returnResult += new SchdulerDayView().GetAllVideoDetails(date);
                returnResult += "</getVideoDetails>";

                returnResult += "<getClasses>";
                returnResult += new SchdulerDayView().GetAllClasses();
                returnResult += "</getClasses>";

                returnResult += "<getSpeciality>";
                ////returnResult += "[]";
                returnResult += new SchdulerDayView().GetAllSpeciality();
                returnResult += "</getSpeciality>";

                returnResult += "<getDesignation>";
                returnResult += new SchdulerDayView().GetAllDrDesignation();
                returnResult += "</getDesignation>";

                returnResult += "<getQualification>";
                //returnResult += "[]";
                returnResult += new SchdulerDayView().GetAllDrQualification();
                returnResult += "</getQualification>";

                returnResult += "<GetAllSurveyData>";
                returnResult += new SurveyService().GetAllData(date, empid);
                returnResult += "</GetAllSurveyData>";

                returnResult += "<GetAllSurveyForm>";
                returnResult += new SurveyService().GetAllSurveyForm(date, empid);
                returnResult += "</GetAllSurveyForm>";

                returnResult += "<GetAllQuizData>";
                returnResult += new SurveyService().GetAllQuizData(date, empid);
                returnResult += "</GetAllQuizData>";

                returnResult += "<GetAllQuizForm>";
                returnResult += new SurveyService().GetAllQuizForm(date, empid);
                returnResult += "</GetAllQuizForm>";

                returnResult += "<GetAttendancetype>";
                returnResult += new SchdulerDayView().GetAttendancetype("MIO");
                returnResult += "</GetAttendancetype>";

                // returnResult += "<GetAttendancetype>";
                // returnResult += new SchdulerDayView().GetAttendancetypes();
                // returnResult += "</GetAttendancetype>";

                returnResult += "<GetDistibutorSales>";
                returnResult += new SchdulerDayView().GetDistributorAllSales(empid);
                returnResult += "</GetDistibutorSales>";

                returnResult += "<GetCallExecutionActivities>";
                returnResult += new SchdulerDayView().GetCallExecutionActivities("MIO");
                returnResult += "</GetCallExecutionActivities>";

                returnResult += "<getExpenseActivity>";
                returnResult += new SchdulerDayView().getExpenseActivity();
                returnResult += "</getExpenseActivity>";

                returnResult += "<GetCallReason>";
                returnResult += new SchdulerDayView().GetCallReason();
                returnResult += "</GetCallReason>";

                returnResult += "<GetExpenseDetail>";
                returnResult += new SchdulerDayView().GetExpenseDetail(empid, date);
                returnResult += "</GetExpenseDetail>";

                returnResult += "<GetCity>";
                //returnResult += "[]";
                returnResult += new SchdulerDayView().GetCity();
                returnResult += "</GetCity>";


                returnResult += "</Data>";
                //downloadFilePath = "Down" + Guid.NewGuid();//Path.Combine(HostingEnvironment.MapPath("~/Files/Downloads"), "abc.txt");
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
                //WebOperationContext.Current.CreateTextResponse(returnResult,"application/json; charset=utf-8",Encoding.UTF8);
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
            //return File.OpenRead(downloadFilePath); 
        }

        public System.ServiceModel.Channels.Message DownloadFileForZSM(string empid, string mobile, string date)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<GetSPODetails>";
                returnResult += new SchdulerDayView().GetSPODetails(empid);
                returnResult += "</GetSPODetails>";

                returnResult += "<GetAllDoctorsZSM>";
                returnResult += new SchdulerDayView().GetAllDoctorsZSM(empid, date);
                returnResult += "</GetAllDoctorsZSM>";

                returnResult += "<GetAllDistributor>";
                returnResult += new SchdulerDayView().GetAllDistributor(empid, date);
                returnResult += "</GetAllDistributor>";

                returnResult += "<GetAllBricks>";
                returnResult += new SchdulerDayView().GetAllBricksByDistributor(empid, date);
                returnResult += "</GetAllBricks>";

                returnResult += "<GetAllProducts>";
                returnResult += new SchdulerDayView().GetAllProducts(empid, "Execution");
                returnResult += "</GetAllProducts>";

                returnResult += "<GetAllSamples>";
                returnResult += new SchdulerDayView().GetAllSamples(empid);
                returnResult += "</GetAllSamples>";

                returnResult += "<GetAllGifts>";
                returnResult += new SchdulerDayView().GetAllGifts();
                returnResult += "</GetAllGifts>";

                returnResult += "<predays>";
                returnResult += new SchdulerDayView().predays(mobile);
                returnResult += "</predays>";

                returnResult += "<getDoctorWithSampleQty>";
                returnResult += new SchdulerDayView().getDoctorWithSampleQty(mobile);
                returnResult += "</getDoctorWithSampleQty>";

                returnResult += "<getDoctorWithGiftQty>";
                returnResult += new SchdulerDayView().getDoctorWithGiftQty(mobile);
                returnResult += "</getDoctorWithGiftQty>";

                returnResult += "<getSampleQty>";
                returnResult += new SchdulerDayView().getSampleQty(empid, date);
                returnResult += "</getSampleQty>";

                returnResult += "<getPDFDetails>";
                returnResult += new SchdulerDayView().GetAllPdfDetailsByEmployeeID(date, empid);
                returnResult += "</getPDFDetails>";

                returnResult += "<getVideoDetails>";
                returnResult += new SchdulerDayView().GetAllVideoDetails(date);
                returnResult += "</getVideoDetails>";

                returnResult += "<getClasses>";
                returnResult += new SchdulerDayView().GetAllClasses();
                returnResult += "</getClasses>";

                returnResult += "<getSpeciality>";
                returnResult += new SchdulerDayView().GetAllSpeciality();
                returnResult += "</getSpeciality>";

                returnResult += "<getDesignation>";
                returnResult += new SchdulerDayView().GetAllDrDesignation();
                returnResult += "</getDesignation>";

                returnResult += "<getQualification>";
                returnResult += new SchdulerDayView().GetAllDrQualification();
                returnResult += "</getQualification>";

                returnResult += "<GetAttendancetype>";
                returnResult += new SchdulerDayView().GetAttendancetype("ZSM");
                returnResult += "</GetAttendancetype>";

                returnResult += "<GetCallExecutionActivities>";
                returnResult += new SchdulerDayView().GetCallExecutionActivities("ZSM");
                returnResult += "</GetCallExecutionActivities>";

                returnResult += "<GetCallReason>";
                returnResult += new SchdulerDayView().GetCallReason();
                returnResult += "</GetCallReason>";

                returnResult += "<GetCity>";
                returnResult += new SchdulerDayView().GetCity();
                returnResult += "</GetCity>";

                returnResult += "</Data>";
                //downloadFilePath = "Down" + Guid.NewGuid();//Path.Combine(HostingEnvironment.MapPath("~/Files/Downloads"), "abc.txt");
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
                //WebOperationContext.Current.CreateTextResponse(returnResult,"application/json; charset=utf-8",Encoding.UTF8);
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }

        public System.ServiceModel.Channels.Message DownloadFileForRSM(string empid, string mobile, string date)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<GetZSMDetails>";
                returnResult += new SchdulerDayView().GetZSMDetails(empid);
                returnResult += "</GetZSMDetails>";

                returnResult += "<GetSPODetails>";
                returnResult += new SchdulerDayView().GetSPODetails(empid);
                returnResult += "</GetSPODetails>";

                returnResult += "<GetAllDoctorsRSM>";
                returnResult += new SchdulerDayView().GetAllDoctorsRSM(empid, date);
                returnResult += "</GetAllDoctorsRSM>";

                returnResult += "<GetAllDistributor>";
                returnResult += new SchdulerDayView().GetAllDistributor(empid, date);
                returnResult += "</GetAllDistributor>";

                returnResult += "<GetAllBricks>";
                returnResult += new SchdulerDayView().GetAllBricksByDistributor(empid, date);
                returnResult += "</GetAllBricks>";

                returnResult += "<GetAllProducts>";
                returnResult += new SchdulerDayView().GetAllProducts(empid, "Execution");
                returnResult += "</GetAllProducts>";

                returnResult += "<GetAllSamples>";
                returnResult += new SchdulerDayView().GetAllSamples(empid);
                returnResult += "</GetAllSamples>";

                returnResult += "<GetAllGifts>";
                returnResult += new SchdulerDayView().GetAllGifts();
                returnResult += "</GetAllGifts>";

                returnResult += "<predays>";
                returnResult += new SchdulerDayView().predays(mobile);
                returnResult += "</predays>";

                returnResult += "<getDoctorWithSampleQty>";
                returnResult += new SchdulerDayView().getDoctorWithSampleQty(mobile);
                returnResult += "</getDoctorWithSampleQty>";

                returnResult += "<getDoctorWithGiftQty>";
                returnResult += new SchdulerDayView().getDoctorWithGiftQty(mobile);
                returnResult += "</getDoctorWithGiftQty>";

                returnResult += "<getSampleQty>";
                returnResult += new SchdulerDayView().getSampleQty(mobile, date);
                returnResult += "</getSampleQty>";

                returnResult += "<getPDFDetails>";
                returnResult += new SchdulerDayView().GetAllPdfDetailsByEmployeeID(date, empid);
                returnResult += "</getPDFDetails>";

                returnResult += "<getVideoDetails>";
                returnResult += new SchdulerDayView().GetAllVideoDetails(date);
                returnResult += "</getVideoDetails>";

                returnResult += "<getClasses>";
                returnResult += new SchdulerDayView().GetAllClasses();
                returnResult += "</getClasses>";

                returnResult += "<getSpeciality>";
                returnResult += new SchdulerDayView().GetAllSpeciality();
                returnResult += "</getSpeciality>";

                returnResult += "<getDesignation>";
                returnResult += new SchdulerDayView().GetAllDrDesignation();
                returnResult += "</getDesignation>";

                returnResult += "<getQualification>";
                returnResult += new SchdulerDayView().GetAllDrQualification();
                returnResult += "</getQualification>";

                returnResult += "<GetAttendancetype>";
                returnResult += new SchdulerDayView().GetAttendancetype("RSM");
                returnResult += "</GetAttendancetype>";

                returnResult += "<GetCallExecutionActivities>";
                returnResult += new SchdulerDayView().GetCallExecutionActivities("RSM");
                returnResult += "</GetCallExecutionActivities>";

                returnResult += "<GetCallReason>";
                returnResult += new SchdulerDayView().GetCallReason();
                returnResult += "</GetCallReason>";

                returnResult += "<GetCity>";
                returnResult += new SchdulerDayView().GetCity();
                returnResult += "</GetCity>";

                returnResult += "</Data>";
                //downloadFilePath = "Down" + Guid.NewGuid();//Path.Combine(HostingEnvironment.MapPath("~/Files/Downloads"), "abc.txt");
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
                //WebOperationContext.Current.CreateTextResponse(returnResult,"application/json; charset=utf-8",Encoding.UTF8);
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }

        public System.ServiceModel.Channels.Message DownloadFileForFLM(string empid, string date)
        {
            //FLMPostCallReporting.asmx/GetMedRepAndDoctorByFLMID
            //FLMPostCallReporting.asmx/GetFLMPostCall
            //FLMPostCallReporting.asmx/GetSalesTodayvsDailyTarget
            var returnResult = string.Empty;
            //string downloadFilePath="";
            try
            {
                returnResult += "<Data>";

                //returnResult += "<GetMedRepAndDoctorByFLMID>";
                //returnResult += new FLMPostCallReporting().GetMedRepAndDoctorByFLMID(empid, date);
                //returnResult += "</GetMedRepAndDoctorByFLMID>";

                //returnResult += "<GetFLMPostCall>";
                //returnResult += new FLMPostCallReporting().GetFLMPostCall();
                //returnResult += "</GetFLMPostCall>";

                //returnResult += "<GetSalesTodayvsDailyTarget>";
                //returnResult += new FLMPostCallReporting().GetSalesTodayvsDailyTarget();
                //returnResult += "</GetSalesTodayvsDailyTarget>";

                returnResult += "<GetMedRepsByManagerID>";
                returnResult += new SchdulerDayView().GetMedRepsByManagerID(empid);
                returnResult += "</GetMedRepsByManagerID>";

                returnResult += "<GetAllShiftSession>";
                returnResult += new SchdulerDayView().GetAllShiftSession(empid);
                returnResult += "</GetAllShiftSession>";

                returnResult += "<GetAllNumberOfCalls>";
                returnResult += new SchdulerDayView().GetAllNumberOfCalls(empid);
                returnResult += "</GetAllNumberOfCalls>";

                returnResult += "<GetAllTypeOfWorking>";
                returnResult += new SchdulerDayView().GetAllTypeOfWorking(empid);
                returnResult += "</GetAllTypeOfWorking>";

                returnResult += "<GetAllScaleDefinition>";
                returnResult += new SchdulerDayView().GetAllScaleDefinition(empid);
                returnResult += "</GetAllScaleDefinition>";

                returnResult += "<GetAllTowns>";
                returnResult += new SchdulerDayView().GetAllTowns(empid, date);
                returnResult += "</GetAllTowns>";

                returnResult += "<GetAllBricks>";
                returnResult += new SchdulerDayView().GetAllBricks(empid, date);
                returnResult += "</GetAllBricks>";


                returnResult += "<GetAllRatingData>";
                returnResult += new SchdulerDayView().GetAllRatingData(date, empid);
                returnResult += "</GetAllRatingData>";

                returnResult += "</Data>";
                //downloadFilePath = "Down" + Guid.NewGuid();//Path.Combine(HostingEnvironment.MapPath("~/Files/Downloads"), "abc.txt");
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
                //WebOperationContext.Current.CreateTextResponse(returnResult,"application/json; charset=utf-8",Encoding.UTF8);
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
            //return File.OpenRead(downloadFilePath); 
        }

        public System.ServiceModel.Channels.Message DownloadFileForCSR(string empid, string date)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<GetAllDoctors>";
                returnResult += new SchdulerDayView().GetAllDoctors(empid, date, "CSR");
                returnResult += "</GetAllDoctors>";

                returnResult += "<GetAllProducts>";
                returnResult += new SchdulerDayView().GetAllProducts(empid, "CSR");
                returnResult += "</GetAllProducts>";

                returnResult += "<GetAllCSRItems>";
                returnResult += new SchdulerDayView().GetAllCSRItems(empid);
                returnResult += "</GetAllCSRItems>";

                returnResult += "<GetAllInstructForExecution>";
                returnResult += new SchdulerDayView().GetAllInstructForExecution();
                returnResult += "</GetAllInstructForExecution>";

                returnResult += "<GetAllSalesBrickAndPharmacies>";
                returnResult += new SchdulerDayView().GetAllSalesBrickAndPharmacies(empid);
                returnResult += "</GetAllSalesBrickAndPharmacies>";

                returnResult += "</Data>";
                //downloadFilePath = "Down" + Guid.NewGuid();//Path.Combine(HostingEnvironment.MapPath("~/Files/Downloads"), "abc.txt");
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
                //WebOperationContext.Current.CreateTextResponse(returnResult,"application/json; charset=utf-8",Encoding.UTF8);
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
            //return File.OpenRead(downloadFilePath); 
        }

        public System.ServiceModel.Channels.Message LoadDashboardCP(string empid, string date,string date2)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<CPReport>";
                returnResult += new SchdulerDayView().GetCPReports(empid, date,date2);
                returnResult += "</CPReport>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }

        public System.ServiceModel.Channels.Message GetDetailVisitRecords(string empid, string dt1, string dt2, string lastRecordID, string recordsCount)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<DcrReport>";
                returnResult += new SchdulerDayView().GetDCRReports(empid, dt1, dt2, lastRecordID, recordsCount);
                returnResult += "</DcrReport>";



                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }


        public System.ServiceModel.Channels.Message LoadExtimatedWorkingDaysdaysInField(string empid, string datefrom,string dateto)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<AllCountCharts>";
                returnResult += new SchdulerDayView().GetChartCounts(empid, datefrom, dateto);
                returnResult += "</AllCountCharts>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }


        public System.ServiceModel.Channels.Message LoadEstimatedWorkingDaysOfYear(string empid)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<AllCountCharts>";
                returnResult += new SchdulerDayView().GetChartCountsForYear(empid);
                returnResult += "</AllCountCharts>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }




        public System.ServiceModel.Channels.Message GetDistributorData(string empid)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<AllDistributorData>";
                returnResult += new SchdulerDayView().GetDistributorAllData(empid);
                returnResult += "</AllDistributorData>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }


        public System.ServiceModel.Channels.Message GetBricksData(string distid)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<AllBrickData>";
                returnResult += new SchdulerDayView().GetBrickData(distid);
                returnResult += "</AllBrickData>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }

        //---------------------------------------------- Create By Faraz to get pharmcy by brick Id ------------------------------------------------- 

        public System.ServiceModel.Channels.Message GetpharmcyData(string bricks)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<AllPharmcyData>";
                returnResult += new SchdulerDayView().GetpharmcyData(bricks);
                returnResult += "</AllPharmcyData>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }

        //------------------------------------------ inc n esti --------------------------------------------------------------------------------------
        public System.ServiceModel.Channels.Message GetINC_ESTData(string Type)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<AllIncentiveEstimateData>";
                returnResult += new SchdulerDayView().GetINC_ESTData(Type);
                returnResult += "</AllIncentiveEstimateData>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }


        //---------------------------------------------- Insert --------------------------------------------------------------------------------------

        public string InsertSalesBrickBydoctor(int Employee_Id, string Product_id, int Brick_id, string Pharmcy_id, string Doctor_id, string Distribiutor_Id, string Insentive,
                                           string Estimate_amount, DateTime StartDate, DateTime EndDate, string Comments)  //inserts a record into sp_InsertSalesBrickBydoctor Table
        {
            // int id = 0;

            string result = "not saved";

            try
            {
                /*@EmployeeId int,
             @PlanMonth datetime,
             @Description nvarchar(4000),
             @IsEditable bit,
             @PlanStatus nvarchar(5),
             @PlanStatusReason nvarchar(4000),
             @EmpAuthID int*/

                var data = _dl.GetData("sp_InsertSalesBrickBydoctor",
                 new NameValueCollection {
                    { "@Employee_Id-int",Employee_Id.ToString() },
                    { "@Product_id-varchar(50)", Product_id.ToString() } ,
                    { "@Brick_id-int",Brick_id.ToString() },
                    { "@Pharmcy_id-nvarchar(max)",Pharmcy_id.ToString() },
                    { "@Doctor_id-nvarchar(100)",Doctor_id.ToString() },
                    { "@Distribiutor_Id-nvarchar(20)",Distribiutor_Id.ToString() },
                    { "@Insentive-nvarchar(max)",Insentive.ToString() },
                    { "@Estimate_amount-nvarchar(max)",Estimate_amount.ToString() },
                    { "@StartDate-Datetime",StartDate.ToString() },
                    { "@EndDate-Datetime",EndDate.ToString() },
                    { "@Comments-nvarchar(max)",Comments.ToString() }
                     //{ "@Level1LevelId-varchar(50)", Level1LevelId.ToString() } ,
                     //{ "@Level2LevelId-varchar(50)", Level2LevelId.ToString() } ,
                     //{ "@Level3LevelId-varchar(50)", Level3LevelId.ToString() } ,
                     //{ "@Level4LevelId-varchar(50)", Level4LevelId.ToString() } ,
                     //{ "@Level5LevelId-varchar(50)", Level5LevelId.ToString() } ,
                     //{ "@Level6LevelId-varchar(50)", Level6LevelId.ToString() } ,

                 });

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count != 0)
                    {
                        // id = ("DataSuccessfullyInserted" + (Convert.ToInt32(data.Tables[0].Rows[0][0])));
                        //id = Convert.ToInt32(data.Tables[0].Rows[0][0]);
                        result = "OK";
                    }
                }
                //else {

                //    if (data.Tables[0].Rows.Count != 0)
                //    {
                //        id = Convert.ToInt32(data.Tables[0].Rows[0][0]);
                //    }
                //}

            }

            catch (Exception SE)
            {
                //Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
            }
            return result;
        }


        //public int InsertSalesBrickBydoctor(int Employee_Id, string Product_id, int Brick_id , string Pharmcy_id, string Doctor_id, string Distribiutor_Id, string Insentive ,
        //                                    string Estimate_amount, DateTime StartDate,DateTime EndDate , string Comments)  //inserts a record into sp_InsertSalesBrickBydoctor Table
        //{
        //    int id = 0;
        //    try
        //    {
        //        /*@EmployeeId int,
        //     @PlanMonth datetime,
        //     @Description nvarchar(4000),
        //     @IsEditable bit,
        //     @PlanStatus nvarchar(5),
        //     @PlanStatusReason nvarchar(4000),
        //     @EmpAuthID int*/

        //           var data = _dl.GetData("sp_InsertSalesBrickBydoctor",
        //            new NameValueCollection {
        //            { "@Employee_Id-int",Employee_Id.ToString() },
        //            { "@Product_id-varchar(50)", Product_id.ToString() } ,
        //            { "@Brick_id-int",Brick_id.ToString() },
        //            { "@Pharmcy_id-nvarchar(max)",Pharmcy_id.ToString() },
        //            { "@Doctor_id-nvarchar(100)",Doctor_id.ToString() },
        //            { "@Distribiutor_Id-nvarchar(20)",Distribiutor_Id.ToString() },
        //            { "@Insentive-nvarchar(max)",Insentive.ToString() },
        //            { "@Estimate_amount-nvarchar(max)",Estimate_amount.ToString() },
        //            { "@StartDate-Datetime",StartDate.ToString() },
        //            { "@EndDate-Datetime",EndDate.ToString() },
        //            { "@Comments-nvarchar(max)",Comments.ToString() }
        //            //{ "@Level1LevelId-varchar(50)", Level1LevelId.ToString() } ,
        //            //{ "@Level2LevelId-varchar(50)", Level2LevelId.ToString() } ,
        //            //{ "@Level3LevelId-varchar(50)", Level3LevelId.ToString() } ,
        //            //{ "@Level4LevelId-varchar(50)", Level4LevelId.ToString() } ,
        //            //{ "@Level5LevelId-varchar(50)", Level5LevelId.ToString() } ,
        //            //{ "@Level6LevelId-varchar(50)", Level6LevelId.ToString() } ,

        //            });

        //        if (data != null)
        //        {
        //            if (data.Tables[0].Rows.Count != 0)
        //            {
        //                id = Convert.ToInt32(data.Tables[0].Rows[0][0]);
        //            }
        //        }
        //    }

        //    catch (Exception SE)
        //    {
        //        //Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
        //    }
        //    return id;
        //}



        //----------------------------------------------- End -----------------------------------------------------------------------------------------

        public string getCurrentDate(string empid)
        {
            var returnResult = string.Empty;
            DateTime currentDate = DateTime.Now;
            returnResult += getPlanStatus(empid, currentDate.ToString("MM-dd-yyyy"));
            //return currentDate.ToString("yyyy-MM-dd");
            return returnResult;
        }

        public ResponseObject getDoctorSalesByProductSkuandMonth(string employeeid, string doctorid, string doctorcode, string productid, string skuid, string date)
        {
            ResponseObject response = new ResponseObject();
            string returnString = "";
            int SoldUnits = 0;
            try
            {
                DateTime result;
                if (!DateTime.TryParseExact(date, "dd-MM-yyyy",
                    System.Globalization.CultureInfo.InvariantCulture,
                    System.Globalization.DateTimeStyles.None, out result))
                {
                    returnString = "Date Format Is invalid";
                    goto Error;
                }

                int empid;
                if (!int.TryParse(employeeid, out empid))
                {
                    returnString = "Invalid EmployeeId";
                    goto Error;
                }

                int docid;
                if (!int.TryParse(doctorid, out docid))
                {
                    returnString = "Invalid DoctorId";
                    goto Error;
                }

                int prodid;
                if (!int.TryParse(productid, out prodid))
                {
                    returnString = "Invalid ProductId";
                    goto Error;
                }

                int sid;
                if (!int.TryParse(skuid, out sid))
                {
                    returnString = "Invalid SkuId";
                    goto Error;
                }

                DataSet dsdata = getDoctorSales(empid, docid, doctorcode, prodid, sid, result);
                if (dsdata != null)
                {
                    if (dsdata.Tables[0].Rows.Count != 0)
                    {
                        SoldUnits = Convert.ToInt32(dsdata.Tables[0].Rows[0][0].ToString());
                        goto DoneInsertion;
                    }
                    SoldUnits = 0;
                    goto DoneInsertion;
                }
                else
                {
                    returnString = "Error";
                    goto Error;
                }
            }
            catch (Exception ex)
            {
                returnString = "Error";
                goto Error;
            }


        Error:
        DoneInsertion:
            {
                ResponseObject responseObject = new ResponseObject();
                responseObject.ResponseFlag = (returnString == "") ? true : false;
                responseObject.ResponseMessage = returnString;
                responseObject.SoldUnits = SoldUnits.ToString();
                response = responseObject;
            }
            return response;
        }

        public System.ServiceModel.Channels.Message getPlanOverallData(string empid, string date)
        {
            var returnResult = string.Empty;
            try
            {

                returnResult += "<Data>";

                returnResult += "<PlanStatus>";
                returnResult += getPlanStatus(empid, date);
                returnResult += "</PlanStatus>";

                returnResult += "<PlanActivities>";
                returnResult += getPlanActivities(empid, date);
                returnResult += "</PlanActivities>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
                //WebOperationContext.Current.CreateTextResponse(returnResult,"application/json; charset=utf-8",Encoding.UTF8);
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }

        public System.ServiceModel.Channels.Message getPlanMonthData(string empid, string date)
        {
            var returnResult = string.Empty;
            try
            {

                returnResult += "<Data>";

                returnResult += "<PlanStatus>";
                returnResult += getPlanStatus(empid, date);
                returnResult += "</PlanStatus>";

                returnResult += "<PlanActivities>";
                returnResult += "[]";
                returnResult += "</PlanActivities>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
                //WebOperationContext.Current.CreateTextResponse(returnResult,"application/json; charset=utf-8",Encoding.UTF8);
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }

        public string getPlanStatus(string empid, string date)
        {
            var returnString = "[]";
            var dat = Convert.ToDateTime(date);
            DateTime planMonthFrom = new DateTime(dat.Year, dat.Month, 1, 0, 0, 0);
            DateTime planMonthTo = new DateTime(dat.Year, dat.Month, 1, 23, 59, 59);
            var PlanStatus = _dl.GetData("Call_GetMIOMonthlyEventsByPlanMonth",
                new NameValueCollection { { "@EmployeeId-INT", empid }, 
                { "@PlanMonthFrom-DATETIME", planMonthFrom.ToString() }, 
                { "@PlanMonthTo-DATETIME", planMonthTo.ToString() }});
            if (PlanStatus != null)
            {
                if (PlanStatus.Tables[0].Rows.Count == 0)
                {
                    /*@EmployeeId int,
	                @PlanMonth datetime,
	                @Description nvarchar(4000),
	                @IsEditable bit,
	                @PlanStatus nvarchar(5),
	                @PlanStatusReason nvarchar(4000),
	                @EmpAuthID int*/
                    var PlanID = _dl.InserData("Call_InsertCallPlannerMonth",
                        new NameValueCollection { { "@EmployeeId-INT", empid }, 
                        { "@PlanMonth-DATETIME", planMonthFrom.ToString() }, 
                        { "@Description-nvarchar(4000)", "" },
                        { "@IsEditable-bit", true.ToString() },
                        { "@PlanStatus-nvarchar(5)", "Draft" },
                        { "@PlanStatusReason-nvarchar(4000)", "" },
                        { "@EmpAuthID-INT", "0" }});
                    if (PlanID)
                    {
                        PlanStatus = _dl.GetData("Call_GetMIOMonthlyEventsByPlanMonth",
                            new NameValueCollection { { "@EmployeeId-INT", empid }, 
                            { "@PlanMonthFrom-DATETIME", planMonthFrom.ToString() }, 
                            { "@PlanMonthTo-DATETIME", planMonthTo.ToString() }});
                        PlanStatus.Tables[0].Columns.Add("currentDate");
                        PlanStatus.Tables[0].Rows[0]["currentDate"] = dat.ToString("yyyy-MM-dd");
                        returnString = PlanStatus.Tables[0].ToJsonString();
                    }
                }
                else
                {
                    PlanStatus.Tables[0].Columns.Add("currentDate");
                    PlanStatus.Tables[0].Rows[0]["currentDate"] = dat.ToString("yyyy-MM-dd");
                    returnString = PlanStatus.Tables[0].ToJsonString();
                }
            }
            return returnString;
        }

        public string getPlanActivities(string empid, string date)
        {
            var returnString = "[]";
            var dat = Convert.ToDateTime(date);
            DateTime planMonthFrom = new DateTime(dat.Year, dat.Month, 1, 0, 0, 0);
            DateTime planMonthTo = new DateTime(dat.Year, dat.Month, 1, 23, 59, 59);
            var PlanActivities = _dl.GetData("Call_GetActivitiesforPlanner",
                new NameValueCollection { { "@EmployeeId-INT", empid }, 
                { "@PlanMonthFrom-DATETIME", planMonthFrom.ToString() }, 
                { "@PlanMonthTo-DATETIME", planMonthTo.ToString() }});
            if (PlanActivities == null) return returnString;
            returnString = PlanActivities.Tables[0].ToJsonString();
            return returnString;
        }

        public DataSet getDoctorSales(int employeeid, int doctorid, string doctorcode, int productid, int skuid, DateTime date)
        {
            var salesData = _dl.GetData("sp_getSoldUnitsByDoctorandMonth",
                new NameValueCollection { { "@EmployeeId-INT", employeeid.ToString() } ,
                                          { "@DoctorId-INT", doctorid.ToString() } ,
                                          { "@DoctorCode-varchar(25)", doctorcode } ,
                                          { "@ProductId-INT", productid.ToString() } ,
                                          { "@SkuId-INT", skuid.ToString() } ,
                                          { "@Datetime-DATETIME", date.ToString() }
                                        });
            return salesData;
        }

        public System.ServiceModel.Channels.Message getPlanData(string empid, string date)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<DoctorClasses>";
                returnResult += getClasses(empid, date);
                returnResult += "</DoctorClasses>";

                returnResult += "<DoctorBricks>";
                returnResult += getBricks(empid, date, "mio");
                returnResult += "</DoctorBricks>";

                returnResult += "<DoctorsData>";
                returnResult += getDoctors(empid, date, "mio");
                returnResult += "</DoctorsData>";

                //for Customer type in offline planner application
                returnResult += "<CustomerTypes>";
                returnResult += getCustomerTypes();
                returnResult += "</CustomerTypes>";

                returnResult += "<GetCallPlannerActivity>";
                returnResult += new SchdulerDayView().GetActivity();
                returnResult += "</GetCallPlannerActivity>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
                //WebOperationContext.Current.CreateTextResponse(returnResult,"application/json; charset=utf-8",Encoding.UTF8);
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }

        public string getClasses(string empid, string date)
        {
            var returnString = "[]";
            var dat = Convert.ToDateTime(date);
            DateTime planMonth = new DateTime(dat.Year, dat.Month, 1, 0, 0, 0);
            var classes = _dl.GetData("Call_GetClassesByEmployeeWithDate",
                new NameValueCollection { { "@employeeID-INT", empid },
                { "@dat-DATETIME", planMonth.ToString() }});
            if (classes == null) return returnString;
            returnString = classes.Tables[0].ToJsonString();
            return returnString;
        }

        public string getBricks(string empid, string date, string type)
        {
            string procedure = "";
            if (type == "mio")
            {
                procedure = "Call_GetBricksByEmployeeWithDate";
            }
            else if (type == "flm")
            {
                procedure = "Call_GetBricksByZSMWithDate";
            }
            else
            {
                procedure = "Call_GetBricksByRSMWithDate";
            }
            var returnString = "[]";
            var dat = Convert.ToDateTime(date);
            DateTime planMonth = new DateTime(dat.Year, dat.Month, 1, 0, 0, 0);
            var bricks = _dl.GetData(procedure,
                new NameValueCollection { { "@employeeID-INT", empid } ,
                { "@dat-DATETIME", planMonth.ToString() }});
            if (bricks == null) return returnString;
            returnString = bricks.Tables[0].ToJsonString();
            return returnString;
        }

        //public string getDoctors(string empid, string date)
        //{
        //    var returnString = "[]";
        //    var dat = Convert.ToDateTime(date);
        //    DateTime planMonth = new DateTime(dat.Year, dat.Month, 1, 0, 0, 0);
        //    var doctors = _dl.GetData("Call_GetDoctorsDataByEmployeeWithDate",
        //        new NameValueCollection { { "@EmployeeId-INT", empid } ,
        //        { "@Datetime-DATETIME", planMonth.ToString() }});
        //    if (doctors == null) return returnString;
        //    returnString = doctors.Tables[0].ToJsonString();
        //    return returnString;
        //}

        public string getDoctors(string empid, string date, string type)
        {
            string procedure = "";
            if (type == "mio")
            {
                procedure = "Call_GetDoctorsDataByEmployeeWithDate";
            }
            else if (type == "zsm")
            {
                procedure = "Call_GetDoctorsDataByZSMWithDate";
            }
            else if (type == "mioapi")
            {
                procedure = "Call_GetDoctorsDataByZSMWithDatePlannerapi";
            }
            else
            {
                procedure = "Call_GetDoctorsDataBySMWithDate";
            }
            var returnString = "[]";
            var dat = Convert.ToDateTime(date);
            DateTime planMonth = new DateTime(dat.Year, dat.Month, 1, 0, 0, 0);
            var doctors = _dl.GetData(procedure,
                new NameValueCollection { { "@EmployeeId-INT", empid } ,
                { "@Datetime-DATETIME", type == "mioapi" ? dat.ToString() : planMonth.ToString() }});
            if (doctors == null) return returnString;
            returnString = doctors.Tables[0].ToJsonString();
            return returnString;
        }

        public string getCustomerTypes()
        {
            var returnString = "[]";
            NameValueCollection nv = new NameValueCollection();
            nv.Clear();
            var doctors = _dl.GetData("sp_GetCustomerTypes", nv);
            if (doctors == null) return returnString;
            returnString = doctors.Tables[0].ToJsonString();
            return returnString;
        }

        public string UploadPlan(string fileName, Stream stream)
        {
            string CreateFilePath = Path.Combine(HostingEnvironment.MapPath("~/Uploads/Files"));
            try
            {
                if (!Directory.Exists(CreateFilePath))
                {
                    Directory.CreateDirectory(CreateFilePath);
                }
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
            string FilePath = Path.Combine(CreateFilePath, fileName);
            //CreateFilePath + " " + fileName;
            int length = 0;
            using (FileStream writer = new FileStream(FilePath, FileMode.Create))
            {
                int readCount;
                var buffer = new byte[8192];
                while ((readCount = stream.Read(buffer, 0, buffer.Length)) != 0)
                {
                    writer.Write(buffer, 0, readCount);
                    length += readCount;
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            var emailStatus = "";
            DateTime current = DateTime.Now;
            int employeeid = 0;
            string jsondata = System.IO.File.ReadAllText(FilePath);
            var PlanMonthData = js.Deserialize<List<CallPlannerMonthLevel>>(jsondata);
            for (int i = 0; i < PlanMonthData.Count; i++)
            {
                current = Convert.ToDateTime(PlanMonthData[i].CPM_PlanMonth);
                employeeid = Convert.ToInt32(PlanMonthData[i].fk_CPM_EMP_EmployeeID);
                int id = 0;
                id = CheckPlannerMonth(current, employeeid);
                if (id == 0)
                {
                    id = insertCallPlannerMonth(current, "", true, employeeid, "Draft", "", 0);
                }
                if (id != 0)
                {
                    if (PlanMonthData[i].CPM_PlanStatus == "Draft")
                    {
                        setEditableMonthWithoutComments(id, "Draft", true, employeeid);
                        emailStatus = "Draft";
                    }
                    else if (PlanMonthData[i].CPM_PlanStatus == "Rejected")
                    {
                        setEditableMonthWithoutComments(id, "Rejected", true, employeeid);
                        emailStatus = "Rejected";
                    }
                    else if (PlanMonthData[i].CPM_PlanStatus == "Submitted")
                    {
                        setEditableMonthWithoutComments(id, "Submitted", false, employeeid);
                        emailStatus = "Submitted";
                    }
                    else if (PlanMonthData[i].CPM_PlanStatus == "ReSubmitted")
                    {
                        setEditableMonthWithoutComments(id, "Resubmitted", false, employeeid);
                        emailStatus = "ReSubmitted";
                    }
                    //if (PlanMonthData[i].CPM_PlanStatus == "Draft")
                    //{
                    //    setEditableMonthWithoutComments(id, "Submitted", false, employeeid);
                    //    emailStatus = "Submitted";
                    //}
                    //else if (PlanMonthData[i].CPM_PlanStatus == "Rejected")
                    //{
                    //    setEditableMonthWithoutComments(id, "Resubmitted", false, employeeid);
                    //    emailStatus = "ReSubmitted";
                    //}

                    var PlanData = PlanMonthData[i].Data;
                    if (PlanData != null)
                    {
                        if (PlanData.Count != 0)
                        {
                            //delete all plans
                            var data = getEvents(employeeid.ToString(), current);
                            if (data != null)
                            {
                                if (data.Tables[0].Rows.Count != 0)
                                {
                                    for (int j = 0; j < data.Tables[0].Rows.Count; j++)
                                    {
                                        deleteEvent(data.Tables[0].Rows[j][0].ToString());
                                    }
                                }
                            }
                        }
                        for (int j = 0; j < PlanData.Count; j++)
                        {

                            InsertCallPlannerMIO(id, Convert.ToDateTime(PlanData[j].CPI_PlanDateTimeFrom), Convert.ToDateTime(PlanData[j].CPI_PlanDateTimeTo), ((emailStatus == "Draft" || emailStatus == "Rejected") ? true : false), Convert.ToInt32(PlanData[j].fk_CPI_CPA_CallPlannerActivityID), Convert.ToInt32(PlanData[j].fk_CPI_DOC_DoctorID), Convert.ToInt32(PlanData[j].fk_GroupId), PlanData[j].CPI_Description,
                                //PlanData[j].CPI_PlanStatus.ToString(),
                                emailStatus,
                                PlanData[j].CPI_PlanStatusReason.ToString(), Convert.ToInt32(PlanData[j].fk_CPI_EMP_AuthorityEmployeeID), Convert.ToInt32(PlanData[j].CallType));
                        }
                    }

                    var nv1 = new NameValueCollection();
                    nv1.Add("@EmplyeeID-int", employeeid.ToString());
                    // ReSharper disable UnusedVariable
                    var getDetail = _dl.GetData("sp_MIO_ZSM_DetailForEmail", nv1);
                    var table = getDetail.Tables[0];

                    if (table.Rows.Count > 0)
                    {
                        #region Sending Mail

                        /*var msg = new MailMessage { From = new MailAddress(ConfigurationManager.AppSettings["AutoEmailID"], "Plan For Approval-" + table.Rows[0][1] + "") };

                        if (table.Rows[0][8].ToString() != "NULL")
                        {
                            string addresmail = table.Rows[0][8].ToString().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "").Trim();
                            msg.To.Add(addresmail);
                        }

                        msg.Subject = "Planing Status For-ICI-SFE CRM- " + DateTime.Now.ToString("dd-MMMM-yyyy");
                        msg.IsBodyHtml = true;

                        string strBody = "To: FLM <br/> Med-Rep Teritorry: " + table.Rows[0][1] +
                            @"<br/>" + "Med-Rep Name: " + table.Rows[0][3] +
                            @"<br/>" + "Med-Rep Mobile Number: " + table.Rows[0][5] +
                            @"<br/>Med-Rep Plan Status: " + emailStatus + " For Month: " + Convert.ToDateTime(current).ToLongDateString() +

                                  @"<br/><br/>Generated on: " + DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss") + @"


                                   This is a system generated email. Please do not reply. Contact the IT department if you need any assistance.";
                        msg.Body = strBody;

                        //var mailAttach = new Attachment(@"C:\PocketDCR\Excel\VisitsStatsWRTFreq-OTC-" + System.DateTime.Now.ToString("dd-MMMM-yyyy") + ".xlsx");
                        //msg.Attachments.Add(mailAttach);

                        var client = new SmtpClient(ConfigurationManager.AppSettings["AutoEmailSMTP"])
                        {
                            UseDefaultCredentials = false,
                            Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["AutoEmailID"], ConfigurationManager.AppSettings["AutoEmailIDpass"]),
                            Host = ConfigurationManager.AppSettings["AutoEmailSMTP"]
                        };

                        client.Send(msg);*/

                        #endregion
                    }

                }

            }
            return getPlanStatus(employeeid.ToString(), current.ToString("MM-dd-yyyy"));
        }

        public int CheckPlannerMonth(DateTime current, int employeeid) // Checks to see if a particular record is present w.r.t a month for an employee 
        {
            int id = 0;
            try
            {
                var data = _dl.GetData("Call_GetCallPlannerMonthandEmp", null);
                if (data != null)
                {
                    var lsDT = data.Tables[0];
                    if (lsDT.Rows.Count > 0)
                    {
                        for (int i = 0; i < lsDT.Rows.Count; i++)
                        {
                            if (current.Month == DateTime.Parse(lsDT.Rows[i]["CPM_PlanMonth"].ToString()).Month && current.Year == DateTime.Parse(lsDT.Rows[i]["CPM_PlanMonth"].ToString()).Year && employeeid == int.Parse(lsDT.Rows[i]["fk_CPM_EMP_EmployeeID"].ToString()))
                            {
                                id = int.Parse(lsDT.Rows[i]["pk_CPM_CallPlannerMonthLevelID"].ToString());
                            }
                        }
                    }
                }
            }

            catch (Exception SE)
            {
                //Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
            }
            return id;
        }

        public int insertCallPlannerMonth(DateTime PlannerMonth, string Description, bool isEdit, int empID, string PlanStatus, string PlanStatusReason, int EmpAuthorityID)  //inserts a record into CallPlannerMonthLevel Table
        {
            int id = 0;
            try
            {
                /*@EmployeeId int,
	            @PlanMonth datetime,
	            @Description nvarchar(4000),
	            @IsEditable bit,
	            @PlanStatus nvarchar(5),
	            @PlanStatusReason nvarchar(4000),
	            @EmpAuthID int*/
                var data = _dl.GetData("Call_InsertCallPlannerMonth",
                    new NameValueCollection { 
                    { "@EmployeeId-int",empID.ToString() },
                    { "@PlanMonth-DATETIME", PlannerMonth.ToString() } ,
                    { "@Description-nvarchar(4000)",Description },
                    { "@IsEditable-bit",(isEdit)?"1":"0" },
                    { "@PlanStatus-nvarchar(100)",PlanStatus },
                    { "@PlanStatusReason-nvarchar(4000)",PlanStatusReason },
                    { "@EmpAuthID-int",EmpAuthorityID.ToString() }});
                if (data != null)
                {
                    if (data.Tables[0].Rows.Count != 0)
                    {
                        id = Convert.ToInt32(data.Tables[0].Rows[0][0]);
                    }
                }
            }

            catch (Exception SE)
            {
                //Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
            }
            return id;
        }

        public bool setEditableMonthWithoutComments(int monthid, string status, bool iseditable, int authEmpID) // Disables Edit for MIO after approval of its record
        {
            bool flag = false;
            try
            {
                /*@monthid int,
	                @iseditable bit,
	                @planStatus nvarchar(50),
	                @authorityEmployeeID INT*/
                flag = _dl.UpdateData("Call_DisallowEditForMIOWithoutComments",
                    new NameValueCollection { 
                    { "@monthid-int",monthid.ToString() },
                    { "@iseditable-bit",(iseditable)?"1":"0" },
                    { "@planStatus-nvarchar(50)",status },
                    { "@authorityEmployeeID-INT",authEmpID.ToString() }});
            }

            catch (Exception SE)
            {
                //Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
            }
            return flag;
        }

        public bool setEditableMonthWithoutComments_ZSM(int monthid, string status, bool iseditable, int authEmpID) // Disables Edit for MIO after approval of its record
        {
            bool flag = false;
            try
            {
                /*@monthid int,
	                @iseditable bit,
	                @planStatus nvarchar(50),
	                @authorityEmployeeID INT*/
                flag = _dl.UpdateData("Call_DisallowEditForZSMWithoutComments_New",
                    new NameValueCollection { 
                    { "@monthid-int",monthid.ToString() },
                    { "@iseditable-bit",(iseditable)?"1":"0" },
                    { "@planStatus-nvarchar(50)",status },
                    { "@authorityEmployeeID-INT",authEmpID.ToString() }});
            }

            catch (Exception SE)
            {
                //Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
            }
            return flag;
        }

        public bool setEditableMonthWithoutComments_RSM(int monthid, string status, bool iseditable, int authEmpID) // Disables Edit for MIO after approval of its record
        {
            bool flag = false;
            try
            {
                /*@monthid int,
	                @iseditable bit,
	                @planStatus nvarchar(50),
	                @authorityEmployeeID INT*/
                flag = _dl.UpdateData("Call_DisallowEditForRSMWithoutComments",
                    new NameValueCollection { 
                    { "@monthid-int",monthid.ToString() },
                    { "@iseditable-bit",(iseditable)?"1":"0" },
                    { "@planStatus-nvarchar(50)",status },
                    { "@authorityEmployeeID-INT",authEmpID.ToString() }});
            }

            catch (Exception SE)
            {
                //Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
            }
            return flag;
        }

        public int InsertCallPlannerMIO(int PlannerMonthID, DateTime start, DateTime end, bool isEdit, int activityID, int doctorID, int GroupID, string description, string PlanStatus, string PlanStatusReason, int EmpAuthorityID, int CallType) //inserts a record into CallPlannerMIOLevel Table
        {
            int id = 0;
            try
            {
                /*@callPlannerMonthID int,
	                @planDateTimeFrom datetime,
	                @planDateTimeTo datetime,
	                @IsEditable bit,
	                @ActivityID int,
	                @DoctorID int,
	                @Description nvarchar(4000),
	                @PlanStatus nvarchar(5),
	                @PlanStatusReason nvarchar(4000),
	                @EmpAuthID int*/
                var data = _dl.GetData("Call_InsertCallPlannerMIO",
                    new NameValueCollection { 
                    { "@callPlannerMonthID-int",PlannerMonthID.ToString() },
                    { "@planDateTimeFrom-datetime", start.ToString() } ,
                    { "@planDateTimeTo-datetime",end.ToString() },
                    { "@IsEditable-bit",(isEdit)?"1":"0" },
                    { "@ActivityID-int",activityID.ToString() },
                    { "@DoctorID-int",doctorID.ToString() },
                    { "@Description-nvarchar(4000)",description },
                    { "@PlanStatus-nvarchar(20)",PlanStatus },
                    { "@PlanStatusReason-nvarchar(4000)",PlanStatusReason },
                    { "@EmpAuthID-int",EmpAuthorityID.ToString() }});

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count != 0)
                    {
                        id = Convert.ToInt32(data.Tables[0].Rows[0][0]);
                    }
                }
            }

            catch (Exception SE)
            {
                //Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
            }
            return id;
        }

        public DataSet getEvents(string empid, DateTime date)
        {
            //var returnString = "[]";
            DateTime planMonthFrom = new DateTime(date.Year, date.Month, 1, 0, 0, 0);
            DateTime planMonthTo = new DateTime(date.Year, date.Month, 1, 23, 59, 59);
            var PlanActivities = _dl.GetData("Call_GetActivitiesforPlanner",
                new NameValueCollection { { "@EmployeeId-INT", empid }, 
                { "@PlanMonthFrom-DATETIME", planMonthFrom.ToString() }, 
                { "@PlanMonthTo-DATETIME", planMonthTo.ToString() }});
            //if (PlanActivities == null) return returnString;
            //returnString = PlanActivities.Tables[0].ToJsonString();
            return PlanActivities;
        }

        public bool deleteEvent(string id)  // Deletes an MIO Record/Event by its MIO ID from CallPlannerMIOLevel /Table
        {
            var flag = _dl.InserData("Call_DeleteActivity",
                new NameValueCollection { { "@Id-int", id } });
            //if (PlanActivities == null) return returnString;
            //returnString = PlanActivities.Tables[0].ToJsonString();
            return flag;
        }

        public class ResponseObject
        {
            public bool ResponseFlag { get; set; }
            public string ResponseMessage { get; set; }
            public string SoldUnits { get; set; }
        }

        [DataContract]
        public class CallPlannerMioLevel
        {
            /*dataNode1.put("id", plansData.get(j).get(0));
                        dataNode1.put("pk_CPI_CallPlannerMIOLevelID", plansData.get(j).get(1));
                        dataNode1.put("fk_CPI_CPM_CallPlannerMonthLevelID", plansData.get(j).get(2));
                        dataNode1.put("CPI_PlanDateTimeFrom", plansData.get(j).get(3));
                        dataNode1.put("CPI_PlanDateTimeTo", plansData.get(j).get(4));
                        dataNode1.put("CPI_IsEditable", plansData.get(j).get(5));
                        dataNode1.put("fk_CPI_CPA_CallPlannerActivityID", plansData.get(j).get(6));
                        dataNode1.put("fk_CPI_DOC_DoctorID", plansData.get(j).get(7));
                        dataNode1.put("CPI_Description", plansData.get(j).get(8));
                        dataNode1.put("CPI_PlanStatus", plansData.get(j).get(9));
                        dataNode1.put("CPI_PlanStatusReason", plansData.get(j).get(10));
                        dataNode1.put("fk_CPI_EMP_AuthorityEmployeeID", plansData.get(j).get(11));
                        dataNode1.put("CPI_CreateDateTime", plansData.get(j).get(12));
                        dataNode1.put("CPI_UpdateDateTime", plansData.get(j).get(13));*/

            [DataMember(Name = "id")]
            public int id { get; set; }

            [DataMember(Name = "pk_CPI_CallPlannerMIOLevelID")]
            public string pk_CPI_CallPlannerMIOLevelID { get; set; }

            [DataMember(Name = "fk_CPI_CPM_CallPlannerMonthLevelID")]
            public string fk_CPI_CPM_CallPlannerMonthLevelID { get; set; }

            [DataMember(Name = "CPI_PlanDateTimeFrom")]
            public string CPI_PlanDateTimeFrom { get; set; }

            [DataMember(Name = "CPI_PlanDateTimeTo")]
            public string CPI_PlanDateTimeTo { get; set; }

            [DataMember(Name = "CPI_IsEditable")]
            public string CPI_IsEditable { get; set; }

            [DataMember(Name = "fk_CPI_CPA_CallPlannerActivityID")]
            public string fk_CPI_CPA_CallPlannerActivityID { get; set; }

            [DataMember(Name = "fk_CPI_DOC_DoctorID")]
            public string fk_CPI_DOC_DoctorID { get; set; }

            [DataMember(Name = "CPI_Description")]
            public string CPI_Description { get; set; }

            [DataMember(Name = "CPI_PlanStatus")]
            public string CPI_PlanStatus { get; set; }

            [DataMember(Name = "CPI_PlanStatusReason")]
            public string CPI_PlanStatusReason { get; set; }

            [DataMember(Name = "fk_CPI_EMP_AuthorityEmployeeID")]
            public string fk_CPI_EMP_AuthorityEmployeeID { get; set; }

            [DataMember(Name = "CPI_CreateDateTime")]
            public string CPI_CreateDateTime { get; set; }

            [DataMember(Name = "CPI_UpdateDateTime")]

            public string CPI_UpdateDateTime { get; set; }

            [DataMember(Name = "fk_GroupId")]
            public int fk_GroupId { get; set; }


            [DataMember(Name = "CallType")]
            public int CallType { get; set; }
        }

        [DataContract]
        public class CallPlannerMonthLevel
        {
            /*dataNode.put("pk_CPM_CallPlannerMonthLevelID", data.get(i).get(1));
                    dataNode.put("CPM_PlanMonth", data.get(i).get(2));
                    dataNode.put("CPM_Description", data.get(i).get(3));
                    dataNode.put("CPM_IsEditable", data.get(i).get(4));
                    dataNode.put("fk_CPM_EMP_EmployeeID", data.get(i).get(5));
                    dataNode.put("CPM_PlanStatus", data.get(i).get(6));
                    dataNode.put("CPM_PlanStatusReason", data.get(i).get(7));
                    dataNode.put("fk_CPM_EMP_AuthorityEmployeeID", data.get(i).get(8));
                    dataNode.put("CPM_CreateDateTime", data.get(i).get(9));
                    dataNode.put("CPM_UpdateDateTime", data.get(i).get(10));*/
            [DataMember(Name = "id")]
            public int id { get; set; }

            [DataMember(Name = "pk_CPM_CallPlannerMonthLevelID")]
            public string pk_CPM_CallPlannerMonthLevelID { get; set; }

            [DataMember(Name = "CPM_PlanMonth")]
            public string CPM_PlanMonth { get; set; }

            [DataMember(Name = "CPM_Description")]
            public string CPM_Description { get; set; }

            [DataMember(Name = "CPM_IsEditable")]
            public string CPM_IsEditable { get; set; }

            [DataMember(Name = "fk_CPM_EMP_EmployeeID")]
            public string fk_CPM_EMP_EmployeeID { get; set; }

            [DataMember(Name = "CPM_PlanStatus")]
            public string CPM_PlanStatus { get; set; }

            [DataMember(Name = "CPM_PlanStatusReason")]
            public string CPM_PlanStatusReason { get; set; }

            [DataMember(Name = "fk_CPM_EMP_AuthorityEmployeeID")]
            public string fk_CPM_EMP_AuthorityEmployeeID { get; set; }

            [DataMember(Name = "CPM_CreateDateTime")]
            public string CPM_CreateDateTime { get; set; }

            [DataMember(Name = "CPM_UpdateDateTime")]
            public string CPM_UpdateDateTime { get; set; }

            [DataMember(Name = "Data")]
            public IList<CallPlannerMioLevel> Data { get; set; }


        }
        public System.ServiceModel.Channels.Message getPlanOverallDataZSM(string empid, string date)
        {
            var returnResult = string.Empty;
            try
            {

                returnResult += "<Data>";

                returnResult += "<PlanStatus>";
                returnResult += getPlanStatusZSM(empid, date);
                returnResult += "</PlanStatus>";

                returnResult += "<PlanActivities>";
                returnResult += getPlanActivitiesZSM(empid, date);
                returnResult += "</PlanActivities>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
                //WebOperationContext.Current.CreateTextResponse(returnResult,"application/json; charset=utf-8",Encoding.UTF8);
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }

        public string getPlanActivitiesZSM(string empid, string date)
        {
            var returnString = "[]";
            var dat = Convert.ToDateTime(date);
            DateTime planMonthFrom = new DateTime(dat.Year, dat.Month, 1, 0, 0, 0);
            DateTime planMonthTo = new DateTime(dat.Year, dat.Month, 1, 23, 59, 59);
            var PlanActivities = _dl.GetData("Call_GetActivitiesforPlannerManagerZSM",
                new NameValueCollection { { "@EmployeeId-INT", empid }, 
                { "@PlanMonthFrom-DATETIME", planMonthFrom.ToString() }, 
                { "@PlanMonthTo-DATETIME", planMonthTo.ToString() }});
            if (PlanActivities == null) return returnString;
            returnString = PlanActivities.Tables[0].ToJsonString();
            return returnString;
        }
        ///Abdul Rehman (2021-04-21)
        public int insertCallPlannerMonth_ZSM(DateTime PlannerMonth, string Description, bool isEdit, int empID, string PlanStatus, string PlanStatusReason, int EmpAuthorityID)  //inserts a record into CallPlannerMonthLevel Table
        {
            int id = 0;
            try
            {
                /*@EmployeeId int,
	            @PlanMonth datetime,
	            @Description nvarchar(4000),
	            @IsEditable bit,
	            @PlanStatus nvarchar(5),
	            @PlanStatusReason nvarchar(4000),
	            @EmpAuthID int*/
                var data = _dl.GetData("Call_InsertCallPlannerMonth_ZSM",
                    new NameValueCollection { 
                    { "@EmployeeId-int",empID.ToString() },
                    { "@PlanMonth-DATETIME", PlannerMonth.ToString() } ,
                    //{ "@Description-nvarchar(4000)",Description },
                    { "@IsEditable-bit",(isEdit)?"1":"0" },
                    { "@PlanStatus-nvarchar(100)",PlanStatus },
                    { "@PlanStatusReason-nvarchar(4000)",PlanStatusReason },
                    { "@EmpAuthID-int",EmpAuthorityID.ToString() }});
                if (data != null)
                {
                    if (data.Tables[0].Rows.Count != 0)
                    {
                        id = Convert.ToInt32(data.Tables[0].Rows[0][0]);
                    }
                }
            }

            catch (Exception SE)
            {
                //Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
            }
            return id;
        }

        public int InsertCallPlannerMIO_ZSM(int PlannerMonthID, DateTime start, DateTime end, bool isEdit, int activityID, int doctorID, string description, string PlanStatus, string PlanStatusReason, int MioId, int CallmioID) //inserts a record into CallPlannerMIOLevel Table
        {
            int id = 0;
            try
            {
                /*@callPlannerMonthID int,  
                @planDateTimeFrom datetime,  
                @planDateTimeTo datetime,  
                @IsEditable bit,  
                @ActivityID int,  
                @MIOID int,  
                @DocID int,  
                @CallmioID int,  
                @Description nvarchar(4000),  
                @PlanStatus nvarchar(10),  
                @PlanStatusReason nvarchar(4000)  */

                var data = _dl.GetData("Call_InsertCallPlannerMIOZSM_New", new NameValueCollection { 
                    { "@callPlannerMonthID-int",PlannerMonthID.ToString() },
                    { "@planDateTimeFrom-datetime", start.ToString() } ,
                    { "@planDateTimeTo-datetime",end.ToString() },
                    { "@IsEditable-bit",(isEdit)?"1":"0" },
                    { "@ActivityID-int",activityID.ToString() },
                    { "@MIOID-int",MioId.ToString() },
                    { "@DocID-int",doctorID.ToString() },
                    { "@CallmioID-int",CallmioID.ToString() },
                    { "@Description-nvarchar(4000)",description },
                    { "@PlanStatus-nvarchar(10)",PlanStatus },
                    { "@PlanStatusReason-nvarchar(4000)",PlanStatusReason }
                });

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count != 0)
                    {
                        id = Convert.ToInt32(data.Tables[0].Rows[0][0]);
                    }
                }
            }

            catch (Exception SE)
            {
                //Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
            }
            return id;
        }

        public string UploadPlanZSM(string fileName, Stream stream)
        {
            string CreateFilePath = Path.Combine(HostingEnvironment.MapPath("~/Uploads/Files"));
            try
            {
                if (!Directory.Exists(CreateFilePath))
                {
                    Directory.CreateDirectory(CreateFilePath);
                }
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
            string FilePath = Path.Combine(CreateFilePath, fileName);
            //CreateFilePath + " " + fileName;
            int length = 0;
            using (FileStream writer = new FileStream(FilePath, FileMode.Create))
            {
                int readCount;
                var buffer = new byte[8192];
                while ((readCount = stream.Read(buffer, 0, buffer.Length)) != 0)
                {
                    writer.Write(buffer, 0, readCount);
                    length += readCount;
                }
            }
            //string FilePath = Path.Combine(HostingEnvironment.MapPath("~/JsonUploads/ZSMPlannerFiles"), fileName);
            //int length = 0;
            //using (FileStream writer = new FileStream(FilePath, FileMode.Create))
            //{
            //    int readCount;
            //    var buffer = new byte[8192];
            //    while ((readCount = stream.Read(buffer, 0, buffer.Length)) != 0)
            //    {
            //        writer.Write(buffer, 0, readCount);
            //        length += readCount;
            //    }
            //}
            JavaScriptSerializer js = new JavaScriptSerializer();
            var emailStatus = "";
            DateTime current = DateTime.Now;
            int employeeid = 0;
            string jsondata = System.IO.File.ReadAllText(FilePath);
            var PlanMonthData = js.Deserialize<List<CallPlannerMonthLevel_ZSM>>(jsondata);
            for (int i = 0; i < PlanMonthData.Count; i++)
            {
                current = Convert.ToDateTime(PlanMonthData[i].CPM_PlanMonth);
                employeeid = Convert.ToInt32(PlanMonthData[i].fk_CPM_EMP_EmployeeID_ZSM);
                int id = 0;
                id = CheckPlannerMonth_ZSM(current, employeeid);
                if (id == 0)
                {
                    id = insertCallPlannerMonth_ZSM(current, "", true, employeeid, "Draft", "", 0);
                }
                if (id != 0)
                {
                    if (PlanMonthData[i].CPM_PlanStatus == "Draft")
                    {
                        setEditableMonthWithoutComments_ZSM(id, "Draft", true, employeeid);
                        emailStatus = "Draft";
                    }
                    else if (PlanMonthData[i].CPM_PlanStatus == "Rejected")
                    {
                        setEditableMonthWithoutComments_ZSM(id, "Rejected", true, employeeid);
                        emailStatus = "Rejected";
                    }
                    else if (PlanMonthData[i].CPM_PlanStatus == "Submitted")
                    {
                        setEditableMonthWithoutComments_ZSM(id, "Submitted", false, employeeid);
                        emailStatus = "Submitted";
                    }
                    else if (PlanMonthData[i].CPM_PlanStatus == "ReSubmitted")
                    {
                        setEditableMonthWithoutComments_ZSM(id, "Resubmitted", false, employeeid);
                        emailStatus = "ReSubmitted";
                    }
                    var PlanData = PlanMonthData[i].Data;
                    if (PlanData != null)
                    {
                        if (PlanData.Count != 0)
                        {
                            //delete all plans
                            var data = getEventsZSM(employeeid.ToString(), current);
                            if (data != null)
                            {
                                if (data.Tables[0].Rows.Count != 0)
                                {
                                    for (int j = 0; j < data.Tables[0].Rows.Count; j++)
                                    {
                                        deleteEventZSM(data.Tables[0].Rows[j][0].ToString());
                                    }
                                }
                            }
                        }
                        for (int j = 0; j < PlanData.Count; j++)
                        {

                            InsertCallPlannerMIO_ZSM(id,
                                Convert.ToDateTime(PlanData[j].CPI_PlanDateTimeFrom),
                                Convert.ToDateTime(PlanData[j].CPI_PlanDateTimeTo),
                                true,
                                Convert.ToInt32(PlanData[j].fk_CPI_CPA_CallPlannerActivityID),
                                Convert.ToInt32(PlanData[j].fk_CPI_MIO_DoctorId),
                                PlanData[j].CPI_Description,
                                PlanData[j].CPI_PlanStatus.ToString(),
                                PlanData[j].CPI_PlanStatusReason.ToString(),
                                Convert.ToInt32(PlanData[j].fk_CPI_MIO_EmployeeID),
                                Convert.ToInt32(PlanData[j].fk_CallPlannerMIOID));
                        }
                    }

                }

            }
            return getPlanStatusZSM(employeeid.ToString(), current.ToString("MM-dd-yyyy"));
        }

        public int CheckPlannerMonth_ZSM(DateTime current, int employeeid) // Checks to see if a particular record is present w.r.t a month for an employee 
        {
            int id = 0;
            try
            {
                var data = _dl.GetData("Call_GetCallPlannerMonthandEmpZSM", null);
                if (data != null)
                {
                    var lsDT = data.Tables[0];
                    if (lsDT.Rows.Count > 0)
                    {
                        for (int i = 0; i < lsDT.Rows.Count; i++)
                        {
                            if (current.Month == DateTime.Parse(lsDT.Rows[i]["CPM_PlanMonth"].ToString()).Month && current.Year == DateTime.Parse(lsDT.Rows[i]["CPM_PlanMonth"].ToString()).Year && employeeid == int.Parse(lsDT.Rows[i]["fk_CPM_EMP_EmployeeID_ZSM"].ToString()))
                            {
                                id = int.Parse(lsDT.Rows[i]["pk_CPM_CallPlannerMonthLevelID"].ToString());
                            }
                        }
                    }
                }
            }

            catch (Exception SE)
            {
                //Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
            }
            return id;
        }

        public DataSet getEventsZSM(string empid, DateTime date)
        {
            //var returnString = "[]";
            DateTime planMonthFrom = new DateTime(date.Year, date.Month, 1, 0, 0, 0);
            DateTime planMonthTo = new DateTime(date.Year, date.Month, 1, 23, 59, 59);
            var PlanActivities = _dl.GetData("Call_GetActivitiesforPlannerManagerZSM",
                new NameValueCollection { { "@EmployeeId-INT", empid }, 
                { "@PlanMonthFrom-DATETIME", planMonthFrom.ToString() }, 
                { "@PlanMonthTo-DATETIME", planMonthTo.ToString() }});
            //if (PlanActivities == null) return returnString;
            //returnString = PlanActivities.Tables[0].ToJsonString();
            return PlanActivities;
        }

        public bool deleteEventZSM(string id)  // Deletes an ZSM/FLM Record/Event by its MIO ID from CallPlannerMIOLevel /Table
        {
            var flag = _dl.InserData("Call_DeleteActivityManagerZSM",
                new NameValueCollection { { "@Id-int", id } });
            //if (PlanActivities == null) return returnString;
            //returnString = PlanActivities.Tables[0].ToJsonString();
            return flag;
        }

        public System.ServiceModel.Channels.Message getPlanDataZSM(string empid, string date)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<DoctorBricks>";
                returnResult += getBricks(empid, date, "zsm");
                returnResult += "</DoctorBricks>";


                returnResult += "<GetSPODetails>";
                returnResult += new SchdulerDayView().GetSPODetails(empid);
                returnResult += "</GetSPODetails>";

                returnResult += "<DoctorClasses>";
                returnResult += getClasses(empid, date);
                returnResult += "</DoctorClasses>";

                returnResult += "<DoctorsData>";
                returnResult += getDoctors(empid, date, "zsm");
                returnResult += "</DoctorsData>";

                returnResult += "<GetCallPlannerActivity>";
                returnResult += new SchdulerDayView().GetActivity();
                returnResult += "</GetCallPlannerActivity>";


                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
                //WebOperationContext.Current.CreateTextResponse(returnResult,"application/json; charset=utf-8",Encoding.UTF8);
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }

        public System.ServiceModel.Channels.Message getPlanOverallDataWithDoctorName(string empid, string date)
        {
            var returnResult = string.Empty;
            try
            {

                returnResult += "<Data>";

                returnResult += "<PlanStatus>";
                returnResult += getPlanStatus(empid, date);
                returnResult += "</PlanStatus>";

                returnResult += "<PlanActivitiesWithDoctorName>";
                returnResult += getPlanActivitiesWithDoctorName(empid, date);
                returnResult += "</PlanActivitiesWithDoctorName>";

                returnResult += "<DoctorsData>";
                returnResult += getDoctors(empid, date, "mioapi");
                returnResult += "</DoctorsData>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
                //WebOperationContext.Current.CreateTextResponse(returnResult,"application/json; charset=utf-8",Encoding.UTF8);
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }

        public string getPlanActivitiesWithDoctorName(string empid, string date)
        {
            var returnString = "[]";
            var dat = Convert.ToDateTime(date);
            DateTime planMonthFrom = new DateTime(dat.Year, dat.Month, 1, 0, 0, 0);
            DateTime planMonthTo = new DateTime(dat.Year, dat.Month, 1, 23, 59, 59);
            var PlanActivities = _dl.GetData("Call_GetActivitiesforPlannerWithDoctorName",
                new NameValueCollection { { "@EmployeeId-INT", empid }, 
                { "@PlanMonthFrom-DATETIME", dat.ToString() }, 
                { "@PlanMonthTo-DATETIME", dat.ToString() }});
            if (PlanActivities == null) return returnString;
            returnString = PlanActivities.Tables[0].ToJsonString();
            return returnString;
        }

        public string getCurrentDateZSM(string empid)
        {
            var returnResult = string.Empty;
            DateTime currentDate = DateTime.Now;
            returnResult += getPlanStatusZSM(empid, currentDate.ToString("MM-dd-yyyy"));
            //return currentDate.ToString("yyyy-MM-dd");
            return returnResult;
        }

        public string getPlanStatusZSM(string empid, string date)
        {
            var returnString = "[]";
            var dat = Convert.ToDateTime(date);
            DateTime planMonthFrom = new DateTime(dat.Year, dat.Month, 1, 0, 0, 0);
            DateTime planMonthTo = new DateTime(dat.Year, dat.Month, 1, 23, 59, 59);
            var PlanStatus = _dl.GetData("Call_GetMIOMonthlyEventsByPlanMonth_ZSM",
                new NameValueCollection { { "@EmployeeId-INT", empid }, 
                { "@PlanMonthFrom-DATETIME", planMonthFrom.ToString() }, 
                { "@PlanMonthTo-DATETIME", planMonthTo.ToString() }});
            if (PlanStatus != null)
            {
                if (PlanStatus.Tables[0].Rows.Count == 0)
                {
                    /*@EmployeeId int,
	                @PlanMonth datetime,
	                @Description nvarchar(4000),
	                @IsEditable bit,
	                @PlanStatus nvarchar(5),
	                @PlanStatusReason nvarchar(4000),
	                @EmpAuthID int*/
                    var PlanID = _dl.InserData("Call_InsertCallPlannerMonth_ZSM",
                        new NameValueCollection { { "@EmployeeId-INT", empid }, 
                        { "@PlanMonth-DATETIME", planMonthFrom.ToString() }, 
                        //{ "@Description-nvarchar(4000)", "" },
                        { "@IsEditable-bit", true.ToString() },
                        { "@PlanStatus-nvarchar(5)", "Draft" },
                        { "@PlanStatusReason-nvarchar(4000)", "" },
                        { "@EmpAuthID-INT", "0" }});
                    if (PlanID)
                    {
                        PlanStatus = _dl.GetData("Call_GetMIOMonthlyEventsByPlanMonth_ZSM",
                            new NameValueCollection { { "@EmployeeId-INT", empid }, 
                            { "@PlanMonthFrom-DATETIME", planMonthFrom.ToString() }, 
                            { "@PlanMonthTo-DATETIME", planMonthTo.ToString() }});
                        PlanStatus.Tables[0].Columns.Add("currentDate");
                        PlanStatus.Tables[0].Rows[0]["currentDate"] = dat.ToString("yyyy-MM-dd");
                        returnString = PlanStatus.Tables[0].ToJsonString();
                    }
                }
                else
                {
                    PlanStatus.Tables[0].Columns.Add("currentDate");
                    PlanStatus.Tables[0].Rows[0]["currentDate"] = dat.ToString("yyyy-MM-dd");
                    returnString = PlanStatus.Tables[0].ToJsonString();
                }
            }
            return returnString;
        }


        public string InsertEmployeeBrickRelation(string EmployeeID, string DistributorID, string BrickIds)
        {
            var returnString = "";
            string[] ja = BrickIds.Split(',');
            _nv.Clear();
            _nv.Add("@EmployeeID-varchar(max)", EmployeeID.ToString());
            _nv.Add("@DistributorID-varchar(max)", DistributorID.ToString());
            var ds = _dl.GetData("sp_InsertEmployeeDistBrickRelation", _nv);

            string PKID = ds.Tables[0].Rows[0]["PK_ID"].ToString();

            for (int i = 0; i < ja.Length; i++)
            {
                string CustID = ja[i].ToString();
                _nv.Clear();
                _nv.Add("@FK_ID-int", PKID);
                _nv.Add("@EmployeeID-int", EmployeeID);
                _nv.Add("@BrickID-varchar(max)", CustID.ToString());
                var dsdata = _dl.GetData("sp_InsertEmployeeCustDocRelation", _nv);

                if (dsdata.Tables[0].Rows[0]["Message"].ToString() == "Brick Already Assign 100")
                {

                    break;
                    returnString = "Brick Already Assign 100 out of 100 with this id" + CustID;
                }
                else if (dsdata.Tables[0].Rows[0]["Message"].ToString() == "Brick Already Assign")
                {

                    break;
                    returnString = "Brick Already Assign with this id" + CustID;
                }
                else
                {
                    returnString = "DataSuccessfullyInserted";
                }
            }


            //if (ds != null && ds.Tables[0].Rows.Count > 0)
            //{
            //     returnString = ds.Tables[0].ToJsonString();
            //}
            //else
            //{

            //    returnString = "Something Went Wrong!";
            //}

            return returnString;
        }



        [DataContract]
        public class CallPlannerMioLevel_ZSM
        {

            //pk_CPI_CallPlannerZSMLevelID	bigint	no	8	19   	0    	no	(n/a)	(n/a)	NULL
            //fk_CPI_CPM_CallPlannerMonthLevelID	bigint	no	8	19   	0    	no	(n/a)	(n/a)	NULL
            //CPI_PlanDateTimeFrom	datetime	no	8	     	     	no	(n/a)	(n/a)	NULL
            //CPI_PlanDateTimeTo	datetime	no	8	     	     	no	(n/a)	(n/a)	NULL
            //CPI_IsEditable	bit	no	1	     	     	no	(n/a)	(n/a)	NULL
            //fk_CPI_CPA_CallPlannerActivityID	bigint	no	8	19   	0    	no	(n/a)	(n/a)	NULL
            //fk_CPI_MIO_EmployeeID	bigint	no	8	19   	0    	no	(n/a)	(n/a)	NULL
            //CPI_Description	nvarchar	no	8000	     	     	yes	(n/a)	(n/a)	SQL_Latin1_General_CP1_CI_AS
            //CPI_PlanStatus	nvarchar	no	100	     	     	no	(n/a)	(n/a)	SQL_Latin1_General_CP1_CI_AS
            //CPI_PlanStatusReason	nvarchar	no	8000	     	     	yes	(n/a)	(n/a)	SQL_Latin1_General_CP1_CI_AS
            //CPI_CreateDateTime	datetime	no	8	     	     	no	(n/a)	(n/a)	NULL
            //CPI_UpdateDateTime	datetime	no	8	     	     	no	(n/a)	(n/a)	NULL
            //fk_CPI_MIO_DoctorId	bigint	no	8	19   	0    	yes	(n/a)	(n/a)	NULL
            //fk_CallPlannerMIOID	bigint	no	8	19   	0    	yes	(n/a)	(n/a)	NULL

            [DataMember(Name = "id")]
            public int id { get; set; }

            [DataMember(Name = "pk_CPI_CallPlannerZSMLevelID")]
            public string pk_CPI_CallPlannerZSMLevelID { get; set; }

            [DataMember(Name = "fk_CPI_CPM_CallPlannerMonthLevelID")]
            public string fk_CPI_CPM_CallPlannerMonthLevelID { get; set; }

            [DataMember(Name = "CPI_PlanDateTimeFrom")]
            public string CPI_PlanDateTimeFrom { get; set; }

            [DataMember(Name = "CPI_PlanDateTimeTo")]
            public string CPI_PlanDateTimeTo { get; set; }

            [DataMember(Name = "CPI_IsEditable")]
            public string CPI_IsEditable { get; set; }

            [DataMember(Name = "fk_CPI_CPA_CallPlannerActivityID")]
            public string fk_CPI_CPA_CallPlannerActivityID { get; set; }

            [DataMember(Name = "fk_CPI_MIO_EmployeeID")]
            public string fk_CPI_MIO_EmployeeID { get; set; }

            [DataMember(Name = "CPI_Description")]
            public string CPI_Description { get; set; }

            [DataMember(Name = "CPI_PlanStatus")]
            public string CPI_PlanStatus { get; set; }

            [DataMember(Name = "CPI_PlanStatusReason")]
            public string CPI_PlanStatusReason { get; set; }

            [DataMember(Name = "CPI_CreateDateTime")]
            public string CPI_CreateDateTime { get; set; }

            [DataMember(Name = "CPI_UpdateDateTime")]
            public string CPI_UpdateDateTime { get; set; }

            [DataMember(Name = "fk_CPI_MIO_DoctorId")]
            public string fk_CPI_MIO_DoctorId { get; set; }

            [DataMember(Name = "fk_CallPlannerMIOID")]
            public int fk_CallPlannerMIOID { get; set; }
        }

        [DataContract]
        public class CallPlannerMonthLevel_ZSM
        {

            //pk_CPM_CallPlannerMonthLevelID	bigint	no	8	19   	0    	no	(n/a)	(n/a)	NULL
            //CPM_PlanMonth	datetime	no	8	     	     	no	(n/a)	(n/a)	NULL
            //CPM_IsEditable	bit	no	1	     	     	no	(n/a)	(n/a)	NULL
            //fk_CPM_EMP_EmployeeID_ZSM	bigint	no	8	19   	0    	no	(n/a)	(n/a)	NULL
            //CPM_PlanStatus	nvarchar	no	100	     	     	no	(n/a)	(n/a)	SQL_Latin1_General_CP1_CI_AS
            //CPM_PlanStatusReason	nvarchar	no	8000	     	     	yes	(n/a)	(n/a)	SQL_Latin1_General_CP1_CI_AS
            //fk_CPM_EMP_AuthorityEmployeeID	bigint	no	8	19   	0    	yes	(n/a)	(n/a)	NULL
            //CPM_CreateDateTime	datetime	no	8	     	     	no	(n/a)	(n/a)	NULL
            //CPM_UpdateDateTime	datetime	no	8	     	     	no	(n/a)	(n/a)	NULL
            //Data

            [DataMember(Name = "id")]
            public int id { get; set; }

            [DataMember(Name = "pk_CPM_CallPlannerMonthLevelID")]
            public string pk_CPM_CallPlannerMonthLevelID { get; set; }

            [DataMember(Name = "CPM_PlanMonth")]
            public string CPM_PlanMonth { get; set; }

            [DataMember(Name = "CPM_IsEditable")]
            public string CPM_IsEditable { get; set; }

            [DataMember(Name = "fk_CPM_EMP_EmployeeID_ZSM")]
            public string fk_CPM_EMP_EmployeeID_ZSM { get; set; }

            [DataMember(Name = "CPM_PlanStatus")]
            public string CPM_PlanStatus { get; set; }

            [DataMember(Name = "CPM_Description")]
            public string CPM_Description { get; set; }

            [DataMember(Name = "CPM_PlanStatusReason")]
            public string CPM_PlanStatusReason { get; set; }

            [DataMember(Name = "fk_CPM_EMP_AuthorityEmployeeID")]
            public string fk_CPM_EMP_AuthorityEmployeeID { get; set; }

            [DataMember(Name = "CPM_CreateDateTime")]
            public string CPM_CreateDateTime { get; set; }

            [DataMember(Name = "CPM_UpdateDateTime")]
            public string CPM_UpdateDateTime { get; set; }

            [DataMember(Name = "Data")]
            public IList<CallPlannerMioLevel_ZSM> Data { get; set; }


        }

        ///Abdul Rehman Sudaius (23/04/2021)
        public string UploadPlanRSM(string fileName, Stream stream)
        {

            string CreateFilePath = Path.Combine(HostingEnvironment.MapPath("~/Uploads/Files"));
            try
            {
                if (!Directory.Exists(CreateFilePath))
                {
                    Directory.CreateDirectory(CreateFilePath);
                }
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
            string FilePath = Path.Combine(CreateFilePath, fileName);
            //CreateFilePath + " " + fileName;
            int length = 0;
            using (FileStream writer = new FileStream(FilePath, FileMode.Create))
            {
                int readCount;
                var buffer = new byte[8192];
                while ((readCount = stream.Read(buffer, 0, buffer.Length)) != 0)
                {
                    writer.Write(buffer, 0, readCount);
                    length += readCount;
                }
            }

            //string FilePath = Path.Combine(HostingEnvironment.MapPath("~/JsonUploads/RSMPlannerFiles"), fileName);
            //int length = 0;
            //using (FileStream writer = new FileStream(FilePath, FileMode.Create))
            //{
            //    int readCount;
            //    var buffer = new byte[8192];
            //    while ((readCount = stream.Read(buffer, 0, buffer.Length)) != 0)
            //    {
            //        writer.Write(buffer, 0, readCount);
            //        length += readCount;
            //    }
            //}


            JavaScriptSerializer js = new JavaScriptSerializer();
            var emailStatus = "";
            DateTime current = DateTime.Now;
            int employeeid = 0;
            string jsondata = System.IO.File.ReadAllText(FilePath);
            var PlanMonthData = js.Deserialize<List<CallPlannerMonthLevel_RSM>>(jsondata);
            for (int i = 0; i < PlanMonthData.Count; i++)
            {
                current = Convert.ToDateTime(PlanMonthData[i].CPM_PlanMonth);
                employeeid = Convert.ToInt32(PlanMonthData[i].fk_CPM_EMP_EmployeeID_RSM);
                int id = 0;
                id = CheckPlannerMonth_RSM(current, employeeid);
                if (id == 0)
                {
                    id = insertCallPlannerMonth_RSM(current, "", true, employeeid, "Draft", "", 0);
                }
                if (id != 0)
                {
                    if (PlanMonthData[i].CPM_PlanStatus == "Draft")
                    {
                        setEditableMonthWithoutComments_RSM(id, "Draft", true, employeeid);
                        emailStatus = "Draft";
                    }
                    else if (PlanMonthData[i].CPM_PlanStatus == "Rejected")
                    {
                        setEditableMonthWithoutComments_RSM(id, "Rejected", true, employeeid);
                        emailStatus = "Rejected";
                    }
                    else if (PlanMonthData[i].CPM_PlanStatus == "Submitted")
                    {
                        setEditableMonthWithoutComments_RSM(id, "Submitted", false, employeeid);
                        emailStatus = "Submitted";
                    }
                    else if (PlanMonthData[i].CPM_PlanStatus == "ReSubmitted")
                    {
                        setEditableMonthWithoutComments_RSM(id, "Resubmitted", false, employeeid);
                        emailStatus = "ReSubmitted";
                    }

                    var PlanData = PlanMonthData[i].Data;
                    if (PlanData != null)
                    {
                        if (PlanData.Count != 0)
                        {
                            //delete all plans
                            var data = getEventsRSM(employeeid.ToString(), current);
                            if (data != null)
                            {
                                if (data.Tables[0].Rows.Count != 0)
                                {
                                    for (int j = 0; j < data.Tables[0].Rows.Count; j++)
                                    {
                                        deleteEventRSM(data.Tables[0].Rows[j][0].ToString());
                                    }
                                }
                            }
                        }
                        for (int j = 0; j < PlanData.Count; j++)
                        {

                            InsertCallPlannerMIO_RSM(id,
                                Convert.ToDateTime(PlanData[j].CPI_PlanDateTimeFrom),
                                Convert.ToDateTime(PlanData[j].CPI_PlanDateTimeTo),
                                true,
                                Convert.ToInt32(PlanData[j].fk_CPI_CPA_CallPlannerActivityID),
                                Convert.ToInt32(PlanData[j].fk_CPI_MIO_DoctorId),
                                PlanData[j].CPI_Description,
                                PlanData[j].CPI_PlanStatus.ToString(),
                                PlanData[j].CPI_PlanStatusReason.ToString(),
                                Convert.ToInt32(PlanData[j].fk_CPI_MIO_EmployeeID),
                                Convert.ToInt32(PlanData[j].fk_CPI_ZSM_EmployeeID),
                                Convert.ToInt32(PlanData[j].fk_CallPlannerMIOID));
                        }
                    }

                }

            }
            return getPlanStatusRSM(employeeid.ToString(), current.ToString("MM-dd-yyyy"));
        }

        public int insertCallPlannerMonth_RSM(DateTime PlannerMonth, string Description, bool isEdit, int empID, string PlanStatus, string PlanStatusReason, int EmpAuthorityID)  //inserts a record into CallPlannerMonthLevel Table
        {
            int id = 0;
            try
            {
                /*@EmployeeId int,
	            @PlanMonth datetime,
	            @Description nvarchar(4000),
	            @IsEditable bit,
	            @PlanStatus nvarchar(5),
	            @PlanStatusReason nvarchar(4000),
	            @EmpAuthID int*/
                var data = _dl.GetData("Call_InsertCallPlannerMonth_RSM",
                    new NameValueCollection { 
                    { "@EmployeeId-int",empID.ToString() },
                    { "@PlanMonth-DATETIME", PlannerMonth.ToString() } ,
                    //{ "@Description-nvarchar(4000)",Description },
                    { "@IsEditable-bit",(isEdit)?"1":"0" },
                    { "@PlanStatus-nvarchar(100)",PlanStatus },
                    { "@PlanStatusReason-nvarchar(4000)",PlanStatusReason },
                    { "@EmpAuthID-int",EmpAuthorityID.ToString() }});
                if (data != null)
                {
                    if (data.Tables[0].Rows.Count != 0)
                    {
                        id = Convert.ToInt32(data.Tables[0].Rows[0][0]);
                    }
                }
            }

            catch (Exception SE)
            {
                //Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
            }
            return id;
        }

        [DataContract]
        public class CallPlannerMonthLevel_RSM
        {

            //pk_CPM_CallPlannerMonthLevelID	bigint	no	8	19   	0    	no	(n/a)	(n/a)	NULL
            //CPM_PlanMonth	datetime	no	8	     	     	no	(n/a)	(n/a)	NULL
            //CPM_IsEditable	bit	no	1	     	     	no	(n/a)	(n/a)	NULL
            //fk_CPM_EMP_EmployeeID_ZSM	bigint	no	8	19   	0    	no	(n/a)	(n/a)	NULL
            //CPM_PlanStatus	nvarchar	no	100	     	     	no	(n/a)	(n/a)	SQL_Latin1_General_CP1_CI_AS
            //CPM_PlanStatusReason	nvarchar	no	8000	     	     	yes	(n/a)	(n/a)	SQL_Latin1_General_CP1_CI_AS
            //fk_CPM_EMP_AuthorityEmployeeID	bigint	no	8	19   	0    	yes	(n/a)	(n/a)	NULL
            //CPM_CreateDateTime	datetime	no	8	     	     	no	(n/a)	(n/a)	NULL
            //CPM_UpdateDateTime	datetime	no	8	     	     	no	(n/a)	(n/a)	NULL
            //Data

            [DataMember(Name = "id")]
            public int id { get; set; }

            [DataMember(Name = "pk_CPM_CallPlannerMonthLevelID")]
            public string pk_CPM_CallPlannerMonthLevelID { get; set; }

            [DataMember(Name = "CPM_PlanMonth")]
            public string CPM_PlanMonth { get; set; }

            [DataMember(Name = "CPM_IsEditable")]
            public string CPM_IsEditable { get; set; }

            [DataMember(Name = "fk_CPM_EMP_EmployeeID_RSM")]
            public string fk_CPM_EMP_EmployeeID_RSM { get; set; }

            [DataMember(Name = "CPM_PlanStatus")]
            public string CPM_PlanStatus { get; set; }

            [DataMember(Name = "CPM_PlanStatusReason")]
            public string CPM_PlanStatusReason { get; set; }

            [DataMember(Name = "fk_CPM_EMP_AuthorityEmployeeID")]
            public string fk_CPM_EMP_AuthorityEmployeeID { get; set; }

            [DataMember(Name = "CPM_CreateDateTime")]
            public string CPM_CreateDateTime { get; set; }

            [DataMember(Name = "CPM_UpdateDateTime")]
            public string CPM_UpdateDateTime { get; set; }

            [DataMember(Name = "Data")]
            public IList<CallPlannerMioLevel_RSM> Data { get; set; }


        }

        [DataContract]
        public class CallPlannerMioLevel_RSM
        {

            //pk_CPI_CallPlannerZSMLevelID	bigint	no	8	19   	0    	no	(n/a)	(n/a)	NULL
            //fk_CPI_CPM_CallPlannerMonthLevelID	bigint	no	8	19   	0    	no	(n/a)	(n/a)	NULL
            //CPI_PlanDateTimeFrom	datetime	no	8	     	     	no	(n/a)	(n/a)	NULL
            //CPI_PlanDateTimeTo	datetime	no	8	     	     	no	(n/a)	(n/a)	NULL
            //CPI_IsEditable	bit	no	1	     	     	no	(n/a)	(n/a)	NULL
            //fk_CPI_CPA_CallPlannerActivityID	bigint	no	8	19   	0    	no	(n/a)	(n/a)	NULL
            //fk_CPI_MIO_EmployeeID	bigint	no	8	19   	0    	no	(n/a)	(n/a)	NULL
            //CPI_Description	nvarchar	no	8000	     	     	yes	(n/a)	(n/a)	SQL_Latin1_General_CP1_CI_AS
            //CPI_PlanStatus	nvarchar	no	100	     	     	no	(n/a)	(n/a)	SQL_Latin1_General_CP1_CI_AS
            //CPI_PlanStatusReason	nvarchar	no	8000	     	     	yes	(n/a)	(n/a)	SQL_Latin1_General_CP1_CI_AS
            //CPI_CreateDateTime	datetime	no	8	     	     	no	(n/a)	(n/a)	NULL
            //CPI_UpdateDateTime	datetime	no	8	     	     	no	(n/a)	(n/a)	NULL
            //fk_CPI_MIO_DoctorId	bigint	no	8	19   	0    	yes	(n/a)	(n/a)	NULL
            //fk_CallPlannerMIOID	bigint	no	8	19   	0    	yes	(n/a)	(n/a)	NULL

            [DataMember(Name = "id")]
            public int id { get; set; }

            [DataMember(Name = "pk_CPI_CallPlannerRSMLevelID")]
            public string pk_CPI_CallPlannerRSMLevelID { get; set; }

            [DataMember(Name = "fk_CPI_CPM_CallPlannerMonthLevelID")]
            public string fk_CPI_CPM_CallPlannerMonthLevelID { get; set; }

            [DataMember(Name = "CPI_PlanDateTimeFrom")]
            public string CPI_PlanDateTimeFrom { get; set; }

            [DataMember(Name = "CPI_PlanDateTimeTo")]
            public string CPI_PlanDateTimeTo { get; set; }

            [DataMember(Name = "CPI_IsEditable")]
            public string CPI_IsEditable { get; set; }

            [DataMember(Name = "fk_CPI_CPA_CallPlannerActivityID")]
            public string fk_CPI_CPA_CallPlannerActivityID { get; set; }

            [DataMember(Name = "fk_CPI_MIO_EmployeeID")]
            public string fk_CPI_MIO_EmployeeID { get; set; }

            [DataMember(Name = "fk_CPI_ZSM_EmployeeID")]
            public string fk_CPI_ZSM_EmployeeID { get; set; }

            [DataMember(Name = "CPI_Description")]
            public string CPI_Description { get; set; }

            [DataMember(Name = "CPI_PlanStatus")]
            public string CPI_PlanStatus { get; set; }

            [DataMember(Name = "CPI_PlanStatusReason")]
            public string CPI_PlanStatusReason { get; set; }

            [DataMember(Name = "CPI_CreateDateTime")]
            public string CPI_CreateDateTime { get; set; }

            [DataMember(Name = "CPI_UpdateDateTime")]
            public string CPI_UpdateDateTime { get; set; }
            [DataMember(Name = "fk_CPI_MIO_DoctorId")]
            public string fk_CPI_MIO_DoctorId { get; set; }

            [DataMember(Name = "fk_CallPlannerMIOID")]
            public int fk_CallPlannerMIOID { get; set; }
        }

        public string getCurrentDateRSM(string empid)
        {
            var returnResult = string.Empty;
            DateTime currentDate = DateTime.Now;
            returnResult += getPlanStatusRSM(empid, currentDate.ToString("MM-dd-yyyy"));
            //return currentDate.ToString("yyyy-MM-dd");
            return returnResult;
        }

        public string getPlanStatusRSM(string empid, string date)
        {
            var returnString = "[]";
            var dat = Convert.ToDateTime(date);
            DateTime planMonthFrom = new DateTime(dat.Year, dat.Month, 1, 0, 0, 0);
            DateTime planMonthTo = new DateTime(dat.Year, dat.Month, 1, 23, 59, 59);
            var PlanStatus = _dl.GetData("Call_GetRSMMonthlyEventsByPlanMonth",
                new NameValueCollection { { "@EmployeeId-INT", empid }, 
                { "@PlanMonthFrom-DATETIME", planMonthFrom.ToString() }, 
                { "@PlanMonthTo-DATETIME", planMonthTo.ToString() }});
            if (PlanStatus != null)
            {
                if (PlanStatus.Tables[0].Rows.Count == 0)
                {
                    /*@EmployeeId int,
	                @PlanMonth datetime,
	                @Description nvarchar(4000),
	                @IsEditable bit,
	                @PlanStatus nvarchar(5),
	                @PlanStatusReason nvarchar(4000),
	                @EmpAuthID int*/
                    var PlanID = _dl.InserData("Call_InsertCallPlannerMonth_RSM",
                        new NameValueCollection { { "@EmployeeId-INT", empid }, 
                        { "@PlanMonth-DATETIME", planMonthFrom.ToString() }, 
                        //{ "@Description-nvarchar(4000)", "" },
                        { "@IsEditable-bit", true.ToString() },
                        { "@PlanStatus-nvarchar(5)", "Draft" },
                        { "@PlanStatusReason-nvarchar(4000)", "" },
                        { "@EmpAuthID-INT", "0" }});
                    if (PlanID)
                    {
                        PlanStatus = _dl.GetData("Call_GetRSMMonthlyEventsByPlanMonth",
                            new NameValueCollection { { "@EmployeeId-INT", empid }, 
                            { "@PlanMonthFrom-DATETIME", planMonthFrom.ToString() }, 
                            { "@PlanMonthTo-DATETIME", planMonthTo.ToString() }});
                        PlanStatus.Tables[0].Columns.Add("currentDate");
                        PlanStatus.Tables[0].Rows[0]["currentDate"] = dat.ToString("yyyy-MM-dd");
                        returnString = PlanStatus.Tables[0].ToJsonString();
                    }
                }
                else
                {
                    PlanStatus.Tables[0].Columns.Add("currentDate");
                    PlanStatus.Tables[0].Rows[0]["currentDate"] = dat.ToString("yyyy-MM-dd");
                    returnString = PlanStatus.Tables[0].ToJsonString();
                }
            }
            return returnString;
        }

        public System.ServiceModel.Channels.Message getPlanOverallDataRSM(string empid, string date)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<PlanStatus>";
                returnResult += getPlanStatusRSM(empid, date);
                returnResult += "</PlanStatus>";

                returnResult += "<PlanActivities>";
                returnResult += getPlanActivitiesRSM(empid, date);
                returnResult += "</PlanActivities>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
                //WebOperationContext.Current.CreateTextResponse(returnResult,"application/json; charset=utf-8",Encoding.UTF8);
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }
            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }

        public string getPlanActivitiesRSM(string empid, string date)
        {
            var returnString = "[]";
            var dat = Convert.ToDateTime(date);
            DateTime planMonthFrom = new DateTime(dat.Year, dat.Month, 1, 0, 0, 0);
            DateTime planMonthTo = new DateTime(dat.Year, dat.Month, 1, 23, 59, 59);
            var PlanActivities = _dl.GetData("Call_GetActivitiesforPlannerManagerRSM",
                new NameValueCollection { { "@EmployeeId-INT", empid }, 
                { "@PlanMonthFrom-DATETIME", planMonthFrom.ToString() }, 
                { "@PlanMonthTo-DATETIME", planMonthTo.ToString() }});
            if (PlanActivities == null) return returnString;
            returnString = PlanActivities.Tables[0].ToJsonString();
            return returnString;
        }

        public System.ServiceModel.Channels.Message getPlanDataRSM(string empid, string date)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<DoctorBricks>";
                returnResult += getBricks(empid, date, "");
                returnResult += "</DoctorBricks>";

                returnResult += "<DoctorClasses>";
                returnResult += getClasses(empid, date);
                returnResult += "</DoctorClasses>";

                returnResult += "<GetZSMDetails>";
                returnResult += new SchdulerDayView().GetZSMDetails(empid);
                returnResult += "</GetZSMDetails>";

                returnResult += "<GetSPODetails>";
                returnResult += new SchdulerDayView().GetSPODetails(empid);
                returnResult += "</GetSPODetails>";

                returnResult += "<GetCallPlannerActivity>";
                returnResult += new SchdulerDayView().GetActivity();
                returnResult += "</GetCallPlannerActivity>";

                returnResult += "<DoctorsData>";
                returnResult += getDoctors(empid, date, "");
                returnResult += "</DoctorsData>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
                //WebOperationContext.Current.CreateTextResponse(returnResult,"application/json; charset=utf-8",Encoding.UTF8);
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }

        public int CheckPlannerMonth_RSM(DateTime current, int employeeid) // Checks to see if a particular record is present w.r.t a month for an employee 
        {
            int id = 0;
            try
            {
                var data = _dl.GetData("Call_GetCallPlannerMonthandEmpRSM", null);
                if (data != null)
                {
                    var lsDT = data.Tables[0];
                    if (lsDT.Rows.Count > 0)
                    {
                        for (int i = 0; i < lsDT.Rows.Count; i++)
                        {
                            if (current.Month == DateTime.Parse(lsDT.Rows[i]["CPM_PlanMonth"].ToString()).Month && current.Year == DateTime.Parse(lsDT.Rows[i]["CPM_PlanMonth"].ToString()).Year && employeeid == int.Parse(lsDT.Rows[i]["fk_CPM_EMP_EmployeeID_RSM"].ToString()))
                            {
                                id = int.Parse(lsDT.Rows[i]["pk_CPM_CallPlannerMonthLevelID"].ToString());
                            }
                        }
                    }
                }
            }
            catch (Exception SE)
            {
                //Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
            }
            return id;
        }

        public DataSet getEventsRSM(string empid, DateTime date)
        {
            //var returnString = "[]";
            DateTime planMonthFrom = new DateTime(date.Year, date.Month, 1, 0, 0, 0);
            DateTime planMonthTo = new DateTime(date.Year, date.Month, 1, 23, 59, 59);
            var PlanActivities = _dl.GetData("Call_GetActivitiesforPlannerManagerRSM",
                new NameValueCollection { { "@EmployeeId-INT", empid }, 
                { "@PlanMonthFrom-DATETIME", planMonthFrom.ToString() }, 
                { "@PlanMonthTo-DATETIME", planMonthTo.ToString() }});
            //if (PlanActivities == null) return returnString;
            //returnString = PlanActivities.Tables[0].ToJsonString();
            return PlanActivities;
        }

        public bool deleteEventRSM(string id)  // Deletes an RSM Record/Event by its MIO ID from CallPlannerMIOLevel /Table
        {
            var flag = _dl.InserData("Call_DeleteActivityManagerRSM",
                new NameValueCollection { { "@Id-int", id } });
            //if (PlanActivities == null) return returnString;
            //returnString = PlanActivities.Tables[0].ToJsonString();
            return flag;
        }

        public int InsertCallPlannerMIO_RSM(int PlannerMonthID, DateTime start, DateTime end, bool isEdit, int activityID, int doctorID, string description, string PlanStatus, string PlanStatusReason, int MioId, int ZsmID,int CallmioID) //inserts a record into CallPlannerMIOLevel Table
        {
            int id = 0;
            try
            {
                /*@callPlannerMonthID int,  
                @planDateTimeFrom datetime,  
                @planDateTimeTo datetime,  
                @IsEditable bit,  
                @ActivityID int,  
                @MIOID int,  
                @DocID int,  
                @CallmioID int,  
                @Description nvarchar(4000),  
                @PlanStatus nvarchar(10),  
                @PlanStatusReason nvarchar(4000)  */

                var data = _dl.GetData("Call_InsertCallPlannerMIORSM_New", new NameValueCollection { 
                    { "@callPlannerMonthID-int",PlannerMonthID.ToString() },
                    { "@planDateTimeFrom-datetime", start.ToString() } ,
                    { "@planDateTimeTo-datetime",end.ToString() },
                    { "@IsEditable-bit",(isEdit)?"1":"0" },
                    { "@ActivityID-int",activityID.ToString() },
                    { "@MIOID-int",MioId.ToString() },
                    { "@ZSMID-int",ZsmID.ToString() },
                    { "@DocID-int",doctorID.ToString() },
                    { "@CallmioID-int",CallmioID.ToString() },
                    { "@Description-nvarchar(4000)",description },
                    { "@PlanStatus-nvarchar(10)",PlanStatus },
                    { "@PlanStatusReason-nvarchar(4000)",PlanStatusReason }
                });

                if (data != null)
                {
                    if (data.Tables[0].Rows.Count != 0)
                    {
                        id = Convert.ToInt32(data.Tables[0].Rows[0][0]);
                    }
                }
            }
            catch (Exception SE)
            {
                //Log.Logging("SchedulerManager.CheckPlannerMonth", SE.Message + SE.StackTrace);
            }
            return id;
        }

        #region Logger
        public static void ErrorLog(string error)
        {
            try
            {
                if (!Directory.Exists(ConfigurationManager.AppSettings["MobileService-Logs"].ToString()))
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings["MobileService-Logs"].ToString());
                }

                File.AppendAllText(ConfigurationManager.AppSettings[@"MobileService-Logs\"].ToString() + "ReportLog_" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
                    DateTime.Now + " : " + error + Environment.NewLine);
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }
        #endregion


        //---------------------------------------- syed Faraz Code ----------------------------------------------------------------------//

        public System.ServiceModel.Channels.Message Notification(string Start, string end, string empid)
        {



            Convert.ToDateTime(Start);
            string Startdate = Convert.ToDateTime(Start).ToString("yyyy-MM-dd");
            Convert.ToDateTime(end);
            string enddate = Convert.ToDateTime(end).ToString("yyyy-MM-dd");

            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<ExpensesReportNotification>";
                returnResult += new SchdulerDayView().ExpensesReportNotification(empid, Startdate, enddate);
                returnResult += "</ExpensesReportNotification>";

                returnResult += "<FrequencyNotification>";

                returnResult += new SchdulerDayView().FrequencyNotification(Startdate, enddate, empid);
                returnResult += "</FrequencyNotification>";

                returnResult += "<PlansNotification>";

                returnResult += new SchdulerDayView().PlansNotification(empid, Startdate, enddate);
                returnResult += "</PlansNotification>";

                returnResult += "<BrickNotification>";

                returnResult += new SchdulerDayView().BrickNotification(empid, Startdate, enddate);
                returnResult += "</BrickNotification>";

                returnResult += "<DoctorRemovable>";

                returnResult += new SchdulerDayView().DoctorRemovable(empid, Startdate, enddate);
                returnResult += "</DoctorRemovable>";

                returnResult += "<AdditionDoctorRequest>";

                returnResult += new SchdulerDayView().AdditionDoctorRequest(empid, Startdate, enddate);
                returnResult += "</AdditionDoctorRequest>";

                returnResult += "<LeaveRequest>";

                returnResult += new SchdulerDayView().LeaveRequest(empid, Startdate, enddate);
                returnResult += "</LeaveRequest>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);

        }

        public System.ServiceModel.Channels.Message NotificationNew(string empid)
        {





            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<ExpensesReportNotification>";
                returnResult += new SchdulerDayView().ExpensesReportNotification(empid);
                returnResult += "</ExpensesReportNotification>";

                returnResult += "<FrequencyNotification>";

                returnResult += new SchdulerDayView().FrequencyNotification(empid);
                returnResult += "</FrequencyNotification>";

                returnResult += "<PlansNotification>";

                returnResult += new SchdulerDayView().PlansNotification(empid);
                returnResult += "</PlansNotification>";

                returnResult += "<BrickNotification>";

                returnResult += new SchdulerDayView().BrickNotification(empid);
                returnResult += "</BrickNotification>";

                returnResult += "<DoctorRemovable>";

                returnResult += new SchdulerDayView().DoctorRemovable(empid);
                returnResult += "</DoctorRemovable>";

                returnResult += "<AdditionDoctorRequest>";

                returnResult += new SchdulerDayView().AdditionDoctorRequest(empid);
                returnResult += "</AdditionDoctorRequest>";

                returnResult += "<LeaveRequest>";

                returnResult += new SchdulerDayView().LeaveRequest(empid);
                returnResult += "</LeaveRequest>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);





        }




        public System.ServiceModel.Channels.Message AttendanceReportForHRAPIDaily(string StartingDate)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<AttendanceReportForHRAPI>";
                returnResult += new SchdulerDayView().AttendanceReportForHRAPIDaily(StartingDate);
                returnResult += "</AttendanceReportForHRAPI>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }


        public System.ServiceModel.Channels.Message AttendanceReportForHRAPIMonthly(string StartingDate)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += "<Data>";

                returnResult += "<AttendanceReportForHRAPI>";
                returnResult += new SchdulerDayView().AttendanceReportForHRAPIMonthly(StartingDate);
                returnResult += "</AttendanceReportForHRAPI>";

                returnResult += "</Data>";
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }



        public System.ServiceModel.Channels.Message getPredayCalls(string empid, string date)
        {
            var returnResult = string.Empty;
            try
            {
                returnResult += new SchdulerDayView().getPredayCalls(empid, date);
                String headerInfo = "attachment; filename=" + "JsonData.txt";
                WebOperationContext.Current.OutgoingResponse.Headers["Content-Disposition"] = headerInfo;
                WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
            }
            catch (Exception ex)
            {
                returnResult = ex.Message;
            }

            return WebOperationContext.Current.CreateTextResponse(returnResult, "application/json; charset=utf-8", Encoding.UTF8);
        }



        //---------------------------------------------------------- End -----------------------------------------------------------------------//



    }
}

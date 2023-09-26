
var valofcity = 1;
var date = new Date();
var MonthlyExpenseId;
var MonthOfExpense;
var EmployeeId;
var GetSelectedCityId;
var milageval;
var dailyAllval;
//var institutionAllowance;
var bigCityval;
var nightStayval;
var outBackval;
var totalfare;
var lengthoftable = 0;
var IsEditable = true;
var Misc = 0;
var NonTourAllowanceApplicable = true;

var isCarAllowanceAllowed = '';
var isBikeAllowanceAllowed = '';
var isIBA = '';
var isBigCity = '';
var CNGAllowance = 0;
var nontouringAllowance = 0;

var AMStatus = '';
var AMIsEditable = '';
var SMStatus = '';
var SMIsEditable = '';
var RTLStatus = '';
var RTLIsEditable = '';
var SFEStatus = '';
var SFEIsEditable = '';
var BaseCityID;
var cities = {};
var cityDistances = {};
var PurposeOfVisit = {};
var ReimbursmentStatus = 0;
// JSON Holder For dailyFillActivities
var expenseDetailNew;

$(document).ready(function () {

    MonthlyExpenseId = $i.cookie('expenseid');
    MonthOfExpense = $i.cookie('expensemonth');
    EmployeeId = $i.cookie('employeeId');
    // window.alert($.urlParam('MonthOfExpense'))
    //date = parseDate($.urlParam('MonthOfExpense'))
    //date = parseDate(MonthOfExpense);
    //window.alert(date)
    //<option value="-1">-- Select --</option><option value="1">Doctor Visit</option><option value="2">Monthly Meeting</option><option value="3">Meeting With HO/DR/RTL</option><option value="4">Training</option><option value="5">Leave</option><option value="6">Camp</option><option value="7">Seminar / Conference</option><option value="8">Team Meeting</option><option value="9">Meeting With RTL</option><option value="12">Off Day Traveling</option><option value="13">Head Office Visit</option><option value="14">Official Holiday</option><option value="16">Meeting (Company Paid)</option>

    //on Request change of farhan
    //PurposeOfVisit[-1] = "-- Select --";
    PurposeOfVisit[-1] = "-";
    PurposeOfVisit[1] = "Doctor Visit";
    PurposeOfVisit[2] = "Monthly Meeting";
    PurposeOfVisit[3] = "Meeting With HO/DR/RTL";
    PurposeOfVisit[4] = "Training";
    PurposeOfVisit[5] = "Leave";
    PurposeOfVisit[6] = "Camp";
    PurposeOfVisit[7] = "Seminar / Conference";
    PurposeOfVisit[8] = "Team Meeting";
    PurposeOfVisit[9] = "Meeting With RTL";
    PurposeOfVisit[12] = "Off Day Traveling";
    PurposeOfVisit[13] = "Head Office Visit";
    PurposeOfVisit[14] = "Official Holiday";
    PurposeOfVisit[16] = "Meeting (Company Paid)";

    fillEmpDetails(MonthOfExpense);
    FillCityArray();
    FillDistances();
    fillGrid();
    getApprovalDetails(MonthOfExpense);
    $('#submit_button').click(function () {

        var r = confirm("Are you sure you want to submit the expense report for approval?");
        if (r == true) {
            var ReportStatus = "";
            if ($('#labelStatus')[0].innerHTML == "Draft") {
                ReportStatus = "Submitted";
            }
            else if ($('#labelStatus')[0].innerHTML == "Rejected") {
                ReportStatus = "ReSubmitted";
            }
            else if ($('#labelStatus')[0].innerHTML == "Canceled") {
                ReportStatus = "ReSubmitted";
            }

            $.ajax({
                type: "POST",
                url: "EditExpense.asmx/SetExpenseReportStatus",
                data: "{'EmployeeId':" + EmployeeId + ",'EmployeeExpenseMonthlyId':'" + MonthlyExpenseId + "','IsEditable':" + 0 + ",'ReportStatus':'" + ReportStatus + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    window.location.reload(true);
                },
                error: onError,
                cache: false,
                async: false,
                beforeSend: startingAjax,
                complete: ajaxCompleted
            });
        }
        /*url = 'handler.ashx?method=sendforapproval&date=' + $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss") + '&status=' + $('#spanMyStatus').html();
        cnt.GetResponse(url, function (e) {
            if (e.Success) {
                window.location.reload(true);
            } else {
            }
        });*/

    });
    $('#saveExpenseReport').click(function () {
        SaveExpenseReport();
    });
    $('#Level5ApprovalSubmit').click(function () {
        var r = confirm("Are you sure you want to submit ?");
        if (r == true) {
            $.ajax({
                type: "POST",
                url: "EditExpense.asmx/SetExpenseApproval",
                data: "{'EmployeeId':" + EmployeeId + ",'EmployeeExpenseMonthlyId':'" + MonthlyExpenseId + "','LevelName':'AM','ApprovalStatus':'" + $('#Level5ApprovalAction').val() + "','ApprovalAmount':'" + $('#Level5ApprovalAmount').val() + "','ApprovalComment':'" + $('#Level5ApprovalRemarks').val() + "','AMApprovalStatus':'" + AMStatus + "','SMApprovalStatus':'" + SMStatus + "','RTLApprovalStatus':'" + RTLStatus + "','SFEApprovalStatus':'" + SFEStatus + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    window.location.reload(true);
                },
                error: onError,
                cache: false,
                async: false,
                beforeSend: startingAjax,
                complete: ajaxCompleted
            });
        }
    });
    $('#Level4ApprovalSubmit').click(function () {
        var r = confirm("Are you sure you want to submit ?");
        if (r == true) {
            $.ajax({
                type: "POST",
                url: "EditExpense.asmx/SetExpenseApproval",
                data: "{'EmployeeId':" + EmployeeId + ",'EmployeeExpenseMonthlyId':'" + MonthlyExpenseId + "','LevelName':'SM','ApprovalStatus':'" + $('#Level4ApprovalAction').val() + "','ApprovalAmount':'" + $('#Level4ApprovalAmount').val() + "','ApprovalComment':'" + $('#Level4ApprovalRemarks').val() + "','AMApprovalStatus':'" + AMStatus + "','SMApprovalStatus':'" + SMStatus + "','RTLApprovalStatus':'" + RTLStatus + "','SFEApprovalStatus':'" + SFEStatus + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    window.location.reload(true);
                },
                error: onError,
                cache: false,
                async: false,
                beforeSend: startingAjax,
                complete: ajaxCompleted
            });
        }
    });
    $('#Level3ApprovalSubmit').click(function () {
        var r = confirm("Are you sure you want to submit ?");
        if (r == true) {
            $.ajax({
                type: "POST",
                url: "EditExpense.asmx/SetExpenseApproval",
                data: "{'EmployeeId':" + EmployeeId + ",'EmployeeExpenseMonthlyId':'" + MonthlyExpenseId + "','LevelName':'RTL','ApprovalStatus':'" + $('#Level3ApprovalAction').val() + "','ApprovalAmount':'" + $('#Level3ApprovalAmount').val() + "','ApprovalComment':'" + $('#Level3ApprovalRemarks').val() + "','AMApprovalStatus':'" + AMStatus + "','SMApprovalStatus':'" + SMStatus + "','RTLApprovalStatus':'" + RTLStatus + "','SFEApprovalStatus':'" + SFEStatus + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    window.location.reload(true);
                },
                error: onError,
                cache: false,
                async: false,
                beforeSend: startingAjax,
                complete: ajaxCompleted
            });
        }
    });
    $('#Level2ApprovalSubmit').click(function () {
        var r = confirm("Are you sure you want to submit ?");
        if (r == true) {
            $.ajax({
                type: "POST",
                url: "EditExpense.asmx/SetExpenseApproval",
                data: "{'EmployeeId':" + EmployeeId + ",'EmployeeExpenseMonthlyId':'" + MonthlyExpenseId + "','LevelName':'SFE','ApprovalStatus':'" + $('#Level2ApprovalAction').val() + "','ApprovalAmount':'" + $('#Level2ApprovalAmount').val() + "','ApprovalComment':'" + $('#Level2ApprovalRemarks').val() + "','AMApprovalStatus':'" + AMStatus + "','SMApprovalStatus':'" + SMStatus + "','RTLApprovalStatus':'" + RTLStatus + "','SFEApprovalStatus':'" + SFEStatus + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    window.location.reload(true);
                },
                error: onError,
                cache: false,
                async: false,
                beforeSend: startingAjax,
                complete: ajaxCompleted
            });
        }
    });

});

//function grandTotal() {
//    var grandtotal = 0
//    for (var i = 0; i < lengthoftable; i++) {
//        //if (getDay((i + 1), MonthOfExpense.split('-')[1], MonthOfExpense.split('-')[2]) != 'Sunday') {
//        var totalid = '#txttotal' + (i + 1)
//        grandtotal = grandtotal + parseFloat($(totalid).text());
//        //}
//    }
//    //grandtotal = grandtotal + (parseFloat(($('#CellPhoneBillAmount').val() == '') ? 0 : $('#CellPhoneBillAmount').val()) - parseFloat(($('#CellPhoneBillAmountCorrection').val() == '') ? 0 : $('#CellPhoneBillAmountCorrection').val()));
//    grandtotal = grandtotal + (parseFloat(($('#CellPhoneBillAmount').text() == '') ? 0 : $('#CellPhoneBillAmount').text()));
//    grandtotal = grandtotal + parseFloat(($('#MonthlyExpenseTownBased').text() == '') ? 0 : $('#MonthlyExpenseTownBased').text());
//    // grandtotal = grandtotal + parseFloat(($('#MonthlyAllownace_BigCity').val() == '') ? 0 : $('#MonthlyAllownace_BigCity').val());
//    grandtotal = grandtotal + (parseFloat(($('#BikeExpense').text() == '') ? 0 : $('#BikeExpense').text())); //- parseFloat(($('#BikeDeduction').val() == '') ? 0 : $('#BikeDeduction').val()));
//    grandtotal = grandtotal + parseFloat(($('#MiscExpense').text() == '') ? 0 : $('#MiscExpense').text());
//    //   grandtotal = grandtotal + ( parseFloat(($('#CngAllowance').val() == '') ? 0 : $('#CngAllowance').val()));
//    //grandtotal = grandtotal + parseFloat(($('#CngAllowance').val() == '') ? 0 : $('#CngAllowance').val());
//    if (NonTourAllowanceApplicable)
//        grandtotal = grandtotal + parseFloat(($('#MonthlyNonTouringAllowance').text() == '') ? 0 : $('#MonthlyNonTouringAllowance').text());

//    $('#GrandTotal').text(grandtotal.toFixed(2));
//}
//function grandTotal() {
//    var grandtotal = 0
//    for (var i = 0; i < lengthoftable; i++) {
//        if (getDay((i + 1), MonthOfExpense.split('-')[1], MonthOfExpense.split('-')[2]) != "Sunday") {
//            var totalid = '#txttotal' + (i + 1)
//            grandtotal = grandtotal + parseFloat($(totalid).text());
//        }
//    }
//    //grandtotal = grandtotal + (parseFloat(($('#CellPhoneBillAmount').val() == '') ? 0 : $('#CellPhoneBillAmount').val()) - parseFloat(($('#CellPhoneBillAmountCorrection').val() == '') ? 0 : $('#CellPhoneBillAmountCorrection').val()));
//    grandtotal = grandtotal + (parseFloat(($('#CellPhoneBillAmount').text() == '') ? 0 : $('#CellPhoneBillAmount').text()) + parseFloat(($('#CellPhoneBillAmountCorrection').text() == '') ? 0 : $('#CellPhoneBillAmountCorrection').text()));
//    grandtotal = grandtotal + parseFloat(($('#MonthlyExpenseTownBased').text() == '') ? 0 : $('#MonthlyExpenseTownBased').text());
//    grandtotal = grandtotal + (parseFloat(($('#BikeExpense').text() == '') ? 0 : $('#BikeExpense').text()) - parseFloat(($('#BikeDeduction').text() == '') ? 0 : $('#BikeDeduction').text()));
//    grandtotal = grandtotal + parseFloat(($('#MiscExpense').text() == '') ? 0 : $('#MiscExpense').text());
//    grandtotal = grandtotal + parseFloat(($('#MonthlyAllowance_BigCity').text() == '') ? 0 : $('#MonthlyAllowance_BigCity').text());
//    grandtotal = grandtotal + (parseInt(($('#CngChargedDays').text() == '') ? 0 : $('#CngChargedDays').text()) * parseFloat(($('#CngAllowance').text() == '') ? 0 : $('#CngAllowance').text()));
//    if (NonTourAllowanceApplicable)
//        grandtotal = grandtotal + parseFloat(($('#MonthlyNonTouringAllowance').text() == '') ? 0 : $('#MonthlyNonTouringAllowance').text());

//    $('#GrandTotal').text(grandtotal);
//}


function grandTotal()
{
    var grandtotal = 0
    for (var i = 0; i < lengthoftable; i++) {
        //if (getDay((i + 1), MonthOfExpense.split('-')[1], MonthOfExpense.split('-')[2]) != 'Sunday') {
        var totalid = '#txttotal' + (i + 1)
        grandtotal = grandtotal + parseFloat($.trim($(totalid).text()) == '' ? 0 : $(totalid).text());

        //}
    }
    //grandtotal = grandtotal + (parseFloat(($('#CellPhoneBillAmount').val() == '') ? 0 : $('#CellPhoneBillAmount').val()) - parseFloat(($('#CellPhoneBillAmountCorrection').val() == '') ? 0 : $('#CellPhoneBillAmountCorrection').val()));
    grandtotal = grandtotal + (parseFloat(($('#CellPhoneBillAmount').text() == '') ? 0 : $('#CellPhoneBillAmount').text()));
    grandtotal = grandtotal + parseFloat(($('#MonthlyExpenseTownBased').text() == '') ? 0 : $('#MonthlyExpenseTownBased').text());
    // grandtotal = grandtotal + parseFloat(($('#MonthlyAllownace_BigCity').val() == '') ? 0 : $('#MonthlyAllownace_BigCity').val());
    // grandtotal = grandtotal + (parseFloat(($('#BikeExpense').text() == '') ? 0 : $('#BikeExpense').text())); //- parseFloat(($('#BikeDeduction').val() == '') ? 0 : $('#BikeDeduction').val()));
    grandtotal = grandtotal + parseFloat(($('#MiscExpense').text() == '') ? 0 : $('#MiscExpense').text());
    grandtotal = grandtotal + (parseFloat(($('#CngAllowance').text() == '') ? 0 : $('#CngAllowance').text()));
    grandtotal = grandtotal + (parseFloat(($('#fuelAllowance').text() == '') ? 0 : $('#fuelAllowance').text()));
    //grandtotal = grandtotal + parseFloat(($('#CngAllowance').val() == '') ? 0 : $('#CngAllowance').val());
    if (NonTourAllowanceApplicable)
        grandtotal = grandtotal + parseFloat(($('#MonthlyNonTouringAllowance').text() == '') ? 0 : $('#MonthlyNonTouringAllowance').text());

    if (ReimbursmentStatus == "Approved") {
        $('#Reimbursment').css('border-color', '#27d127de');
        var reimburse = parseFloat($('#Reimbursment').text());
        grandtotal = grandtotal + reimburse

    }
    else {
        $('#Reimbursment').css('border-color', 'red');
    }

    $('#GrandTotal').text(grandtotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}

//function maketotal(row) {

//    var fareid = '#txtfare' + row;
//    var DAid = '#txtda' + row;
//    //var institutionAll = '#txtiba' + row
//    var nightstayid = '#txtnightstay' + row;
//    var outbackid = '#txtoutback' + row;
//    var bigcityid = '#txtbigcity' + row;
//    var totalid = '#txttotal' + row;
//    var chckboxid = '#chkcng' + row

//    //var totalval = parseInt($(fareid).val()) + parseInt($(DAid).val()) + parseInt($(nightstayid).val()) + parseInt($(outbackid).val()) + parseInt($(bigcityid).val()) + (($i(chckboxid).prop('checked')) ? parseInt(CNGAllowance) : 0);
//    //var totalval = parseFloat($(fareid).val()) + parseFloat($(DAid).val()) + parseFloat($(nightstayid).val()) + parseFloat($(outbackid).val()) + parseFloat($(bigcityid).val()) + parseFloat($(institutionAll).val()) + (($i(chckboxid).prop('checked')) ? parseInt(CNGAllowance) : 0);
//    var totalval = parseFloat($(fareid).text()) + parseFloat($(DAid).text()) + parseFloat($(nightstayid).text()) + parseFloat($(outbackid).text()) + parseFloat($(bigcityid).text()) + parseFloat(0);//$(institutionAll).text());
//    $(totalid).text(totalval);
//}
function maketotal(row) {
    var fareid = '#txtfare' + row;
    var DAid = '#txtda' + row;
    var institutionAll = '#txtiba' + row
    var nightstayid = '#txtnightstay' + row;
    var outbackid = '#txtoutback' + row;
    var bigcityid = '#txtbigcity' + row;
    var totalid = '#txttotal' + row;
    var SubTotalid = '#txtSubTotal' + row;
    var chckboxid = '#chkcng' + row;
    var txtDSMDeduct = '#txtDSMDeduct' + row;
    var txtSMDeduct = '#txtSMDeduct' + row;
    var txtBUHDeduct = '#txtBUHDeduct' + row;
    var reimb = '#txtreim' + row;


    //var totalval = parseInt($(fareid).val()) + parseInt($(DAid).val()) + parseInt($(nightstayid).val()) + parseInt($(outbackid).val()) + parseInt($(bigcityid).val()) + (($i(chckboxid).prop('checked')) ? parseInt(CNGAllowance) : 0);
    //var totalval = parseFloat($(fareid).val()) + parseFloat($(DAid).val()) + parseFloat($(nightstayid).val()) + parseFloat($(outbackid).val()) + parseFloat($(bigcityid).val()) + parseFloat($(institutionAll).val()) + (($i(chckboxid).prop('checked')) ? parseInt(CNGAllowance) : 0);
    //var totalval = parseFloat($(fareid).text() == '' ? 0 : $(fareid).text()) + parseFloat($(DAid).text() == '' ? 0 : $(DAid).text()) + parseFloat($(nightstayid).text() == '' ? 0 : $(nightstayid).text()) + parseFloat($(outbackid).text() == '' ? 0 : $(outbackid).text()); 
    var totalval = parseFloat($(fareid).text()) + parseFloat($(DAid).text()) + parseFloat($(nightstayid).text()) + parseFloat($(outbackid).text()) + parseFloat($(reimb).text());
     //var totalval = parseFloat($(fareid).val()) + parseFloat($(DAid).val()) + parseFloat($(nightstayid).val()) + parseFloat($(outbackid).val()) + parseFloat($(reimb).val());
    $(SubTotalid).text(totalval);
    if (totalval > $(txtBUHDeduct).text() && totalval > $(txtSMDeduct).text() && totalval > $(txtDSMDeduct).text()) {
        totalval = totalval - ($(txtBUHDeduct).text() == '' ? 0 : parseFloat($(txtBUHDeduct).text())) - ($(txtSMDeduct).text() == '' ? 0 : parseFloat($(txtSMDeduct).text())) - ($(txtDSMDeduct).text() == '' ? 0 : parseFloat($(txtDSMDeduct).text()));
        $('#saveupdateRow' + row).show();
    }
    else {
        var totalval = totalval;
        $('#saveupdateRow' + row).hide();

    }


    $(totalid).text(totalval);
    rowTotal();
    grandTotal();
    // DisabledField();



}

function rowTotal() {
    var milageFinalId = '#txtmileagefinal';
    var fareFinalId = '#txtfarefinal';
    var daFinalId = '#txtdafinal';
    var reimRowTotal = '#txtReimTotal';  //reim
    var ibaFinalId = '#txtibafinal';
    var nightStayFinalId = '#txtnightstayfinal';
    var outBackFinalId = '#txtoutbackfinal';
    // var bigCityFinalId = '#txtbigcityfinal';
    var subtotalFinalId = '#txtSTfinal'
    var totalFinalId = '#txttotalfinal';
    var miscFinalId = '#txtMiscfinal';

    var totalDSMDeductFinal = '#txtDSMDeductFinal'
    var totalSMDeductFinal = '#txtSMDeductFinal'
    var totalBUHDeductFinal = '#txtBUHDeductFinal'
    var milagetotal = 0; 
    var faretotal = 0;
    var datotal = 0;
    var reimTal = 0;            //reim
    var ibatotal = 0;
    var nightStaytotal = 0;
    var outBacktotal = 0;
    var bigCitytotal = 0;
    var DSMDeducttotal = 0;
    var SMDeducttotal = 0;
    var BUHDeducttotal = 0;
    var subTotal = 0;
    var misctotal = 0;
    var total = 0;
    var TotalNightStay = 0;
    var TotalOutBack = 0;
    for (var i = 0; i < lengthoftable; i++) {
        //  if (getDay((i + 1), MonthOfExpense.split('-')[1], MonthOfExpense.split('-')[2]) != 'Sunday') {
        var milageid = '#txtmileage' + (i + 1);
        var fareid = '#txtfare' + (i + 1);
        var daid = '#txtda' + (i + 1);
        var retot = '#txtreim' + (i + 1);   //reim
        var ibaid = '#txtiba' + (i + 1);
        var nightStayid = '#txtnightstay' + (i + 1);
        var outBackid = '#txtoutback' + (i + 1);
        var DSMDeductid = '#txtDSMDeduct' + (i + 1);
        var SMDeductid = '#txtSMDeduct' + (i + 1);
        var BUHDeductid = '#txtBUHDeduct' + (i + 1);
        var subtotalid = '#txtSubTotal' + (i + 1);
        //  var bigCityid = '#txtbigcity' + (i + 1);
        var totalid = '#txttotal' + (i + 1);
        var misctotalid = '#Misc' + (i + 1);
        milagetotal = milagetotal + parseInt($.trim($(milageid).text())== '' ? 0 :$(milageid).text());
        faretotal = faretotal + parseFloat($.trim($(fareid).text())== '' ? 0 :$(fareid).text());
        datotal = datotal + parseInt($.trim($(daid).text()) == '' ? 0 : $(daid).text());
        reimTal = reimTal + parseInt($(retot).text());
        ibatotal = ibatotal + parseInt($.trim($(ibaid).text())== '' ? 0 :$(ibaid).text());
        nightStaytotal = nightStaytotal + parseInt($.trim($(nightStayid).text())== '' ? 0 :$(nightStayid).text());
        outBacktotal = outBacktotal + parseInt($.trim($(outBackid).text()) == '' ? 0 : $(outBackid).text());
        DSMDeducttotal = DSMDeducttotal + parseFloat($.trim($(DSMDeductid).text()) == '' ? 0 : $(DSMDeductid).text());
        SMDeducttotal = SMDeducttotal + parseFloat($.trim($(SMDeductid).text()) == '' ? 0 : $(SMDeductid).text());
        BUHDeducttotal = BUHDeducttotal + parseFloat($.trim($(BUHDeductid).text()) == '' ? 0 : $(BUHDeductid).text());
        subTotal = subTotal + parseFloat($(subtotalid).text()== '' ? 0 :$(subtotalid).text())
        // bigCitytotal = bigCitytotal + parseInt($(bigCityid).val());
        total = total + parseFloat($(totalid).text()== '' ? 0 :$(totalid).text());
        misctotal = misctotal + parseFloat($(misctotalid).text() == '' ? 0 : $(misctotalid).text());
        // -- Total NighStay/Outback --
        if ($(nightStayid).text() != 0) {
            TotalNightStay = TotalNightStay + 1;
        }
        if ($(outBackid).text() != 0) {
            TotalOutBack = TotalOutBack + 1;
        }
        // -- Total NighStay/Outback --
        // }
    }

    // -- Total NighStay/Outback --
    $('#Totalnightstayfinal').text("Total NightStay: " + TotalNightStay);
    $('#Totaloutbackfinal').text("Total Outback: " + TotalOutBack);
    // -- Total NighStay/Outback --
    $(milageFinalId).text(milagetotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $(fareFinalId).text((faretotal).toFixed(2));
    $(daFinalId).text(datotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $(reimRowTotal).text(reimTal);
    //$(reimRowTotal).text(reimTal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    //$(reimRowTotal).val((reimTal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    //$(reimRowTotal).val(reimTal);
    $(ibaFinalId).text(ibatotal);
    $(nightStayFinalId).text(nightStaytotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $(outBackFinalId).text(outBacktotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    // $(bigCityFinalId).val(bigCitytotal);
    $(totalBUHDeductFinal).text(BUHDeducttotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $(totalDSMDeductFinal).text(DSMDeducttotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $(totalSMDeductFinal).text(SMDeducttotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    //$(subtotalFinalId).text(subTotal);
    $(subtotalFinalId).text(subTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
   // $(totalFinalId).text(total);
    $(totalFinalId).text(total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $(miscFinalId).text(misctotal.toFixed(2));


    if (misctotal.toFixed(2) == 0) {
        $('#MonthlyExpenseTownBased').text(Misc);
    }
    else if (misctotal.toFixed(2) >= 500) {
        $('#MonthlyExpenseTownBased').text(500);
    }
    else {
        $('#MonthlyExpenseTownBased').text(misctotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }

}
//function rowTotal() {
//    var milageFinalId = '#txtmileagefinal';
//    var fareFinalId = '#txtfarefinal';
//    var daFinalId = '#txtdafinal';
//    //var ibaFinalId = '#txtibafinal';
//    var nightStayFinalId = '#txtnightstayfinal';
//    var outBackFinalId = '#txtoutbackfinal';
//    var bigCityFinalId = '#txtbigcityfinal';
//    var totalFinalId = '#txttotalfinal';
//    var totalCallsId = '#txttotalCalls';

//    var milagetotal = 0;
//    var faretotal = 0;
//    var datotal = 0;
//    //var ibatotal = 0;
//    var nightStaytotal = 0;
//    var outBacktotal = 0;
//    var bigCitytotal = 0;
//    var total = 0;
//    var totalCalls = 0;
//    for (var i = 0; i < lengthoftable; i++) {
//        if (getDay((i + 1), MonthOfExpense.split('-')[1], MonthOfExpense.split('-')[2]) != "Sunday") {
//            var milageid = '#txtmileage' + (i + 1);
//            var fareid = '#txtfare' + (i + 1);
//            var daid = '#txtda' + (i + 1);
//            //var ibaid = '#txtiba' + (i + 1);
//            var nightStayid = '#txtnightstay' + (i + 1);
//            var outBackid = '#txtoutback' + (i + 1);
//            var bigCityid = '#txtbigcity' + (i + 1);
//            var totalid = '#txttotal' + (i + 1);
//            var callid = '#txtcallcount' + (i + 1);
//            milagetotal = milagetotal + parseInt($(milageid).text());
//            faretotal = faretotal + parseFloat($(fareid).text());
//            datotal = datotal + parseInt($(daid).text());
//            //ibatotal = ibatotal + parseInt($(ibaid).text());
//            nightStaytotal = nightStaytotal + parseInt($(nightStayid).text());
//            outBacktotal = outBacktotal + parseInt($(outBackid).text());
//            bigCitytotal = bigCitytotal + parseInt($(bigCityid).text());
//            total = total + parseFloat($(totalid).text());
//            totalCalls = totalCalls + parseInt($(callid).text());
//        }
//    }
//    $(milageFinalId).text(milagetotal);
//    $(fareFinalId).text(faretotal);
//    $(daFinalId).text(datotal);
//    //$(ibaFinalId).text(ibatotal);
//    $(nightStayFinalId).text(nightStaytotal);
//    $(outBackFinalId).text(outBacktotal);
//    $(bigCityFinalId).text(bigCitytotal);
//    $(totalFinalId).text(total);
//    $(totalCallsId).text(totalCalls);
//}

function getallexpensepolicy(dailyid, row, totalMilage) {
    var milage = '#txtmileage' + row;
    var txtid = '#txtfare' + row;
    var dailyAll = '#txtda' + row
    //var institutionAll = '#txtiba' + row
    $(txtid).text('0');
    var farevalue = parseFloat(totalMilage) * parseFloat((milageval == '') ? 0 : milageval)
    $(txtid).text(farevalue.toFixed(1));
    $(milage).text(totalMilage);
    /*$.ajax({
        type: "POST",
        url: "EditExpense.asmx/FillEmpExpensePolicy",
        data: '{"EmployeeId":' + EmployeeId + ',"dailyid":' + dailyid + ',"date":"' + MonthOfExpense + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d != null && response.d != '') {
                var jsonObj = $.parseJSON(response.d);
                //milageval = '';
                dailyAllval = '';
                bigCityval = '';
                nightStayval = '';
                outBackval = '';
                totalfare = '';
                $.each(jsonObj, function (i, tweet) {
                    //milageval = jsonObj[i].MilagePerKm;
                    dailyAllval = jsonObj[i].DailyAllowance;
                    institutionAllowance = jsonObj[i].DailyInstitutionBaseAllowance;
                    bigCityval = jsonObj[i].DailyAddAllowance_BigCity;
                    nightStayval = jsonObj[i].OutStationAllowance_NightStay;
                    outBackval = jsonObj[i].OutStationAllowance_OutBack;
                    totalfare = jsonObj[i].TotalMilageKm;
                });
                $(txtid).val('0');
                var fareval = parseInt(totalfare) * parseFloat((milageval == '') ? 0 : milageval)
                $(txtid).val(fareval);
                $(milage).val(totalfare);

                //$(dailyAll).val(dailyAllval);
                //$(institutionAll).val(institutionAllowance);


            } else {
                $(txtid).val('0');
                $(milage).val('0');
            }
        },
        error: onError,
        cache: false,
        async: false,
        beforeSend: startingAjax,
        complete: ajaxCompleted
    });*/
}

function fillGrid() {
    $.ajax({
        type: "POST",
        url: "EditExpense.asmx/FillExpenseGrid",
        data: "{'EmployeeId':" + EmployeeId + ",'EmployeeExpenseMonthlyId':'" + MonthlyExpenseId + "','ExpenseMonth':'" + MonthOfExpense + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessFillGrid,
        error: onError,
        cache: false,
        async: false,
        beforeSend: startingAjax,
        complete: ajaxCompleted
    });
}

var OnSuccessFillGrid = function (response) {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    jsonObj = $.parseJSON(response.d);
    var expensebody = '';
    lengthoftable = jsonObj.length;
    for (var i = 0; i < jsonObj.length ; i++) {
        //if (getDay((i + 1), MonthOfExpense.split('-')[1], MonthOfExpense.split('-')[2]) != "Sunday") {
        expensebody += '<tr>'

                                    + '<td id="td' + (i + 1) + '" style="display: none;">' + jsonObj[i].ID1 + '</td> '

                                    //+ '<td>' + (i + 1) + '</td> '
                                    + '<td>' + (i + 1) + " - " + getDay((i + 1), MonthOfExpense.split('-')[1], MonthOfExpense.split('-')[2]) + '</td> '
                                    //+ '<td>' + getDay(i, '01-Dec-2016'.split('-')[1], '01-Dec-2016'.split('-')[2]) + '</td> '
                                    //+ '<td> <select id="txtvisitbox' + (i + 1) + '" class="txtboxx" onChange="visitboxchange(\'#txtvisitbox' + (i + 1) + '\',\'' + (i + 1) + '\',true)"><option value="-1">-- Select --</option><option value="1">Doctor Visit</option><option value="2">Monthly Meeting</option><option value="3">Meeting With HO/DR/RTL</option><option value="4">Training</option><option value="5">Leave</option><option value="6">Camp</option><option value="7">Seminar / Conference</option><option value="8">Team Meeting</option><option value="9">Meeting With RTL</option><option value="12">Off Day Traveling</option><option value="13">Head Office Visit</option><option value="14">Official Holiday</option><option value="16">Meeting (Company Paid)</option>  </select> </td> '
                                    //+ '<td id="txtvisitbox' + (i + 1) + '"> </td>'
                                    + '<td></td>'
                                    + '<td id="txtmileage' + (i + 1) + '"> </td> '
                                    + '<td id="txtfare' + (i + 1) + '">  </td> '
                                    //+ '<td id="txtiba' + (i + 1) + '">  </td> '
                                    //+ '<td> <select id="txtreasonbox' + (i + 1) + '" class="txtboxx" onChange="reasonboxchange(\'#txtreasonbox' + (i + 1) + '\',\'' + (i + 1) + '\',true)"><option value="-1">-- Select --</option><option value="1">Night Stay (Company Paid)</option><option value="2">Night Stay</option><option value="3">Outback</option> </select> </td> '
                                    + '<td id="txtnightstay' + (i + 1) + '">  </td> '
                                    + '<td id="txtoutback' + (i + 1) + '">  </td> '
                                    + '<td id="txtda' + (i + 1) + '">  </td> '
                                    + '<td id="txtreim' + (i + 1) + '">  </td> '
                                //    + '<td id="txtbigcity' + (i + 1) + '">  </td> '
                                       + '<td id="txtSubTotal' + (i + 1) + '">  </td> '
                                          + '<td id="txtDSMDeduct' + (i + 1) + '" > </td> '
                               + '<td id="txtSMDeduct' + (i + 1) + '" > </td> '
                               + '<td id="txtBUHDeduct' + (i + 1) + '" > </td> '

                                    + '<td id="txttotal' + (i + 1) + '">  </td> '
                                          + '<td id="Misc' + (i + 1) + '">  </td> '
                                             + '<tr>' + '<td colspan="1" id="txttownvisited' + (i + 1) + '" style="padding-left:40px !important;text-align: start;">' + '</td>' + '<td colspan="14" style="text-align: left;" id="txitmilage' + (i + 1) + '" > </td> ' + '</tr>'
                                        //+ '<td id="txitmilage' + (i + 1) + '" > </td> '
                                     //+ '<tr>' + '<td colspan="15" disabled id="txitmilage' + (i + 1) + '" style="padding-left:40px !important;text-align: start;">' + '</td>' + '</tr>'
                                          + '<tr>' + '<td colspan="15" style="text-align: start; padding-left:40px !important;">' + ' Number Of Calls :' + jsonObj[i].NoOfVisit + ' &nbsp&nbsp&nbsp&nbsp&nbsp  Number Of InRange Calls : ' + jsonObj[i].NoOfInRange + ' &nbsp&nbsp&nbsp&nbsp&nbsp  Number of OutRange Calls : ' + jsonObj[i].NoOfOutRange + ' &nbsp&nbsp&nbsp&nbsp&nbsp Number of Meeting : ' + jsonObj[i].NoOfMeetingVisit + '</td>' + '</tr>'
                                          
                                    //+ '<td id="txtcallcount' + (i + 1) + '">' + jsonObj[i].NoOfVisit + '</td>'
                                   // + '<td style="display: none"> <a class="txtboxx" id="saveupdateRow' + (i + 1) + '" onClick="saveupdateRow(' + (i + 1) + ')" style="display: block;text-align: center;">' + ((jsonObj[i].ID1 == "") ? "Save" : "Update") + '</a> </td> '
                                   // + '<td style="display: none"> <img id ="img' + (i + 1) + '" alt="Click to Expand" src="../Images/plus.png" width="25px" height="25px"/></td> '
                                    //+ '</tr><tr><td colspan="11"><table class="table table-hover table-expandable table-striped"><tbody id ="addcity' + (i + 1) + '"></tbody><tfoot><tr><td><a style="display: block; text-align: center;" class="txtboxx" onClick="addcity(' + (i + 1) + ',\'Save\',\'\')">Add City</a></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot></table><a style="display: block; text-align: center;" class="txtboxx" onClick="addcity(' + (i + 1) + ',\'Save\',\'\')">Add City</a></td></tr>';
                                 
                                 + '</tr>'
        
        //+ '<tr><td colspan="14">';
        //+ '<div style="display: none; text-align: right;width: 100%;">number of calls : ' + jsonobj[i].NoOfVisit + '</div>'
        //+ '</td></tr>';


        //for (var i = 1; i <= daysInMonth(date.getMonth() + 1, date.getFullYear()) ; i++) {
        //alert(jsonObj[i].ID1);
        /*if (isCarAllowanceAllowed == "0") {
            expensebody += '<tr>'
                                    + '<td id="td' + (i + 1) + '" style="display: none;">' + jsonObj[i].ID1 + '</td> '
                                    + '<td>' + (i + 1) + '</td> '
                                    + '<td>' + getDay((i + 1), MonthOfExpense.split('-')[1], MonthOfExpense.split('-')[2]) + '</td> '
                                    //+ '<td>' + getDay(i, '01-Dec-2016'.split('-')[1], '01-Dec-2016'.split('-')[2]) + '</td> '
                                    + '<td> <select id="txtvisitbox' + (i + 1) + '" class="txtboxx" onChange="visitboxchange(\'#txtvisitbox' + (i + 1) + '\',\'' + (i + 1) + '\')"><option value="-1">-- Select --</option><option value="1">Doctor Visit</option></select> </td> '
                                    //<option value="2">Monthly Meeting</option><option value="3">Meeting With HO/DR/RTL</option><option value="4">Training</option><option value="5">Full Day Leave</option><option value="6">Camp</option><option value="7">Seminar / Conference</option><option value="8">Team Meeting</option><option value="9">Meeting With RTL</option><option value="10">Half Day Leave</option><option value="11">Annual Leave</option><option value="12">Off Day Traveling</option><option value="13">Head Office Visit</option><option value="14">Official Holiday</option><option value="15">Holiday</option><option value="16">Meeting (Company Paid)</option> <option value="1">Doctor Visited</option> 
                                    + '<td> <input type="text"  disabled id="txtmileage' + (i + 1) + '" class="col-md-12 margin" value="0"/></td> '
                                    + '<td> <input type="text"  disabled id="txtfare' + (i + 1) + '"class="col-md-12 margin" value="0" /> </td> '
                                    + '<td> <input type="text"  disabled id="txtda' + (i + 1) + '" class="col-md-12 margin" value="0"/> </td> '
                                    + '<td> <input type="text"  disabled id="txtiba' + (i + 1) + '" class="col-md-12 margin" value="0"/> </td> '
                                    + '<td> <select id="txtreasonbox' + (i + 1) + '" class="txtboxx" onChange="reasonboxchange(\'#txtreasonbox' + (i + 1) + '\',\'' + (i + 1) + '\')"><option value="-1">-- Select --</option><option value="1">Night Stay (Company Paid)</option><option value="2">Night Stay</option><option value="3">Outback</option> </select> </td> '
                                    + '<td> <input type="text"  disabled id="txtnightstay' + (i + 1) + '" class="col-md-12 margin" value="0" /> </td> '
                                    + '<td> <input type="text"  disabled id="txtoutback' + (i + 1) + '" class="col-md-12 margin" value="0" /> </td> '
                                    + '<td> <input type="text"  disabled id="txtbigcity' + (i + 1) + '" class="col-md-12 margin" value="0" /> </td> '
                                    + '<td> <input type="text"  disabled id="txttotal' + (i + 1) + '" class="col-md-12 margin" value="0" /> </td> '
                                    + '<td> <a class="txtboxx" id="saveupdateRow' + (i + 1) + '" onClick="saveupdateRow(' + (i + 1) + ')" style="display: block;text-align: center;">' + ((jsonObj[i].ID1 == "") ? "Save" : "Update") + '</a> </td> '
                                    + '<td> <img id ="img' + (i + 1) + '" alt="Click to Expand" src="../Images/plus.png" width="25px" height="25px"/></td> '
                                    //+ '</tr><tr><td colspan="11"><table class="table table-hover table-expandable table-striped"><tbody id ="addcity' + (i + 1) + '"></tbody><tfoot><tr><td><a style="display: block; text-align: center;" class="txtboxx" onClick="addcity(' + (i + 1) + ',\'Save\',\'\')">Add City</a></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot></table><a style="display: block; text-align: center;" class="txtboxx" onClick="addcity(' + (i + 1) + ',\'Save\',\'\')">Add City</a></td></tr>';
                                    + '</tr><tr><td colspan="14"><table style="margin-bottom:0px;" class="table table-hover table-expandable table-striped"><tbody id ="addcity' + (i + 1) + '"></tbody></table>'
                                    + '<a style="display: inline-block; text-align: center;width: 50%;cursor: pointer;" class="txtboxx" onClick="addcity(' + (i + 1) + ',\'Save\',\'\')">Add City</a>'
                                    + '<div style="display: inline-block; text-align: center;width: 50%;">Number Of Calls : ' + jsonObj[i].NoOfVisit + '</div>'
                                    + '</td></tr>';
            $('#editexpensedata').empty();
            $('#editexpensedata').append('<table class="table table-hover table-expandable table-striped"><thead> <tr>'
            + '<th style="display: none;"></th>'
            + '<th>Date</th>'
            + '<th>Day</th>'
            + ' <th>Purpose Of Visit/Town Visited</th>'
            + ' <th>Mileage Km </th>'
            + ' <th>Fare </th>'
            + ' <th>*DA</th>'
            + ' <th>Institution Based Allowance</th>'
            + '<th>Tour Day Closing</th>'
            + '<th>Night Stay</th>'
            + ' <th>Out Back </th>'
            + '<th>**ADDA (Big City)</th>'
            + '<th>Total</th><th>Action</th></tr></thead><tbody id="expensemonthly">' + expensebody + '</tbody></table>');
        } else {

            expensebody += '<tr>'
                                    + '<td id="td' + (i + 1) + '" style="display: none;">' + jsonObj[i].ID1 + '</td> '
                                    + '<td>' + (i + 1) + '</td> '
                                    + '<td>' + getDay((i + 1), MonthOfExpense.split('-')[1], MonthOfExpense.split('-')[2]) + '</td> '
                                    //+ '<td>' + getDay(i, '01-Dec-2016'.split('-')[1], '01-Dec-2016'.split('-')[2]) + '</td> '
                                    + '<td> <select id="txtvisitbox' + (i + 1) + '" class="txtboxx" onChange="visitboxchange(\'#txtvisitbox' + (i + 1) + '\',\'' + (i + 1) + '\')"><option value="-1">-- Select --</option><option value="1">Doctor Visit</option></select> </td> '
                                    //<option value="2">Monthly Meeting</option><option value="3">Meeting With HO/DR/RTL</option><option value="4">Training</option><option value="5">Full Day Leave</option><option value="6">Camp</option><option value="7">Seminar / Conference</option><option value="8">Team Meeting</option><option value="9">Meeting With RTL</option><option value="10">Half Day Leave</option><option value="11">Annual Leave</option><option value="12">Off Day Traveling</option><option value="13">Head Office Visit</option><option value="14">Official Holiday</option><option value="15">Holiday</option><option value="16">Meeting (Company Paid)</option> <option value="1">Doctor Visited</option> 
                                    + '<td> <input type="text"  disabled id="txtmileage' + (i + 1) + '" class="col-md-12 margin" value="0"/></td> '
                                    + '<td> <input type="text"  disabled id="txtfare' + (i + 1) + '"class="col-md-12 margin" value="0" /> </td> '
                                    + '<td> <input type="text"  disabled id="txtda' + (i + 1) + '" class="col-md-12 margin" value="0"/> </td> '
                                    + '<td> <input type="text"  disabled id="txtiba' + (i + 1) + '" class="col-md-12 margin" value="0"/> </td> '
                                    + '<td> <select id="txtreasonbox' + (i + 1) + '" class="txtboxx" onChange="reasonboxchange(\'#txtreasonbox' + (i + 1) + '\',\'' + (i + 1) + '\')"><option value="-1">-- Select --</option><option value="1">Night Stay (Company Paid)</option><option value="2">Night Stay</option><option value="3">Outback</option> </select> </td> '
                                    + '<td> <input type="text"  disabled id="txtnightstay' + (i + 1) + '" class="col-md-12 margin" value="0" /> </td> '
                                    + '<td> <input type="text"  disabled id="txtoutback' + (i + 1) + '" class="col-md-12 margin" value="0" /> </td> '
                                    + '<td> <input type="text"  disabled id="txtbigcity' + (i + 1) + '" class="col-md-12 margin" value="0" /> </td> '
                                    + '<td> <input type="checkbox" id="chkcng' + (i + 1) + '" class="smallboxx" onchange="maketotal(\'' + (i + 1) + '\')"></td> '
                                    + '<td> <input type="text"  disabled id="txttotal' + (i + 1) + '" class="col-md-12 margin" value="0" /> </td> '
                                    + '<td> <a class="txtboxx" id="saveupdateRow' + (i + 1) + '" onClick="saveupdateRow(' + (i + 1) + ')" style="display: block;text-align: center;">' + ((jsonObj[i].ID1 == "") ? "Save" : "Update") + '</a> </td> '
                                    + '<td> <img id ="img' + (i + 1) + '" alt="Click to Expand" src="../Images/plus.png" width="25px" height="25px"/></td> '
                                    //+ '</tr><tr><td colspan="11"><table class="table table-hover table-expandable table-striped"><tbody id ="addcity' + (i + 1) + '"></tbody><tfoot><tr><td><a style="display: block; text-align: center;" class="txtboxx" onClick="addcity(' + (i + 1) + ',\'Save\',\'\')">Add City</a></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot></table><a style="display: block; text-align: center;" class="txtboxx" onClick="addcity(' + (i + 1) + ',\'Save\',\'\')">Add City</a></td></tr>';
                                    + '</tr><tr><td colspan="14"><table style="margin-bottom:0px;" class="table table-hover table-expandable table-striped"><tbody id ="addcity' + (i + 1) + '"></tbody></table>'
                                    + '<a style="display: inline-block; text-align: center;width: 50%;cursor: pointer;" class="txtboxx" onClick="addcity(' + (i + 1) + ',\'Save\',\'\')">Add City</a>'
                                    + '<div style="display: inline-block; text-align: center;width: 50%;">Number Of Calls : ' + jsonObj[i].NoOfVisit + '</div>'
                                    + '</td></tr>'; $('#editexpensedata').empty();
            $('#editexpensedata').append('<table class="table table-hover table-expandable table-striped"><thead> <tr>'
            + '<th style="display: none;"></th>'
            + '<th>Date</th>'
            + '<th>Day</th>'
            + ' <th>Purpose Of Visit/Town Visited</th>'
            + ' <th>Mileage Km </th>'
            + ' <th>Fare </th>'
            + ' <th>*DA</th>'
            + ' <th>Institution Based Allowance</th>'
            + '<th>Tour Day Closing</th>'
            + '<th>Night Stay</th>'
            + ' <th>Out Back </th>'
            + '<th>**ADDA (Big City)</th>'
            + '<th>CNG</th>'
            + '<th>Total</th><th>Action</th</tr></thead><tbody id="expensemonthly">' + expensebody + '</tbody></table>');
        }*/
        //   }
    }


    //for total of all the columns
    //begin
    expensebody += '<tr>'
                                    + '<td style="display: none;"></td> '
                                    //+ '<td></td> '
                                    + '<td></td> '
                                    + '<td>Total</td> '
                                    + '<td id="txtmileagefinal"></td> '
                                    + '<td id="txtfarefinal"></td> '
                                    //+ '<td id="txtibafinal"></td> '
                                    //+ '<td></td> '
                                    + '<td ><label type="text"  disabled id="txtnightstayfinal" class="col-md-12 margin" value="0" >night</label> <label type="text"  disabled id="Totalnightstayfinal" class="col-md-12 margin" value="0" >night</label>          </td> '
                                    + '<td >  <label type="text"  disabled id="txtoutbackfinal" class="col-md-12 margin" value="0" >night</label> <label type="text"  disabled id="Totaloutbackfinal" class="col-md-12 margin" value="0" >outback</label>          </td> '
                                    + '<td id="txtdafinal"></td> '
                                    + '<td id="txtReimTotal"></td> '
                                    + '<td id="txtSTfinal"> </td> '
                                   // + '<td id="txtbigcityfinal"></td> '
                                        + '<td  id="txtDSMDeductFinal"> </td> '
                                   + '<td id="txtSMDeductFinal"> </td> '
                                     + '<td id="txtBUHDeductFinal"> </td> '
                                    + '<td id="txttotalfinal"></td> '
                                     + '<td id="txtMiscfinal"></td> '
                                    //+ '<td id="txttotalCalls"></td> '
                                    + '</tr>';
    //end

    $('#editexpensedata').empty();
    $('#editexpensedata').append('<table  id="hidetable"><tr><th colspan="6"><h2 style="font-size: 18px; font-weight: 700;padding: 0 0 5px 0;margin-bottom: 10px;">Employee Details</h2></th></tr>'
        +'<tr><th>Login ID</th>'
        +'<th>Employee Name</th>'
        + '<th>DOJ</th>'
        + '<th>Employee Code</th>'
        + '<th>Designation</th>'
        + '<th>Manager</th></tr>'
        + '<tr><td  id="emplogin"></td><td  id="emplname"></td><td  id="dojdate"></td><td  id="emplcode"></td><td  id="empdesi"></td><td  id="empmagr"></td></tr>'
        + '<tr><th colspan="6"><h2 style="font-size: 18px; font-weight: 700;padding: 0 0 5px 0;margin-bottom: 10px;">Working Days</h2></th></tr>'
         + '<tr><th>Total</th>'
        + '<th>Out Back</th>'
          + ' <th>Sub Total</th>'
        //+ '<th>ADDA</th>'
        + '<th>Local</th>'
        + '<th>Night Stay</th>'
        + '<th>Outstation</th>  '
        + '<th>Sunday/Special</th></tr>'
        + '<tr><td  id="totalwork"></td><td  id="outback"></td><td  id="adda"></td><td  id="localday"></td><td  id="nightstay"></td><td  id="outsat"></td><td  id="satsund"></td></tr>'
        + '</table>'
        + '<h2 style="text-align: start;">Expenses Details</h2>'
        + '<table id="excel" class="table table-hover table table-striped">'
        + '<thead> <tr>'

    + '<th style="display:none;"></th>'

    //+ '<th>Date</th>'
    + '<th>Day</th>'
    //+ ' <th>Purpose Of Visit</th>'
    + ' <th></th>'
    + ' <th>Mileage Km </th>'
    + ' <th>Fare </th>'
    //+ ' <th>IBA</th>'
    //+ '<th>Tour Day Closing</th>'
    + '<th>Night Stay</th>'
    + ' <th>Out Back </th>'
    + ' <th>*DA</th>'
    + '<th>Reimbursement</th>' //Reim colum
    + ' <th>Sub Total</th>'
    + '<th>DSM Deduction</th>'
    + '<th>SM Deduction</th>'
    + '<th>BUH Deduction</th>'

    //+ '<th>**ADDA</th>'
    + '<th>Grand Total</th>'
    + '<th>Misc. Allowance</th>'
    //+ '<th>Number Of Calls</th>'

    + '</tr></thead><tbody id="expensemonthly">' + expensebody + '</tbody></table><table id="hidetable2" border="1"><tr><th>CNG Charged Days </th>'
    + '<th>CNG Allowance </th>'
      + '<th>Bike Expense </th>'
    + '<th>Bike Deduction  </th>'
      + '<th>Non Touring Allowance  </th>'
    + '<th>Mobile Bill  </th>'
    + '<th>Medical + Misc Allowance  </th>'
    + '<th>Monthly Allowance for Big City  </th>'
    + '<th>Mobile Bill Correction  </th>'
    + '<th>Adj. Expense    </th>'
    + '<th>Expense Note  </th>'
    + '<th>Grand Total  </th>'
    + '</tr><tr>'
    + '<td id="cngcharg"></td>'
    + '<td id="cngallow"></td>'
    + '<td id="bikeexp"></td>'
    + '<td id="bikededuc"></td>'
    + '<td id="nontouring"></td>'
    + '<td id="mobill"></td>'
    + '<td id="miscexp"></td>'
    + '<td id="monthlyallow"></td>'
    + '<td id="mobillcorr"></td>'
    + '<td id="adjexp"></td>'
    + '<td id="expnote"></td>'
    + '<td id="gratotal"></td>'
    + '</tr></table><table  id="hidetable3" border="1">'
    + '<tr><th>Approval Level</th>'
    + '<th>Status</th>'
    + '<th>Remarks</th>'
    + '<th>Total Amount</th>'
    + '<th>Date</th></tr>'
    + '<tr><td>DSM</td><td id="le5a"></td><td id="le5rea"></td><td id="le5ama"></td><td id="le5daa"></td></tr><tr><td>BUH</td><td id="le5b"></td><td id="le5reb"></td><td id="le5amb"></td><td id="le5dab"></td></tr><tr><td>Expense Admin</td><td id="le5c"></td><td id="le5rec"></td><td id="le5amc"></td><td id="le5dac"></td></tr><tr>'
    + '</tr></table>');


    $('#emplogin').text($('#emploginID').text());
    $('#dojdate').text($('#dateofjoining').text());
    $('#emplname').text($('#empName').text());
    $('#emplcode').text($('#empCode').text());
    $('#empdesi').text($('#empdesignation').text());
    $('#empmagr').text($('#empmanager').text());

    $('#totalwork').text($('#totalworkingdays').text());
    $('#localday').text($('#localworkingdays').text());
    $('#satsund').text($('#satsunworkingdays').text());
    $('#nightstay').text($('#empnightstay').text());
    $('#outback').text($('#empoutback').text());
    $('#adda').text($('#empADDA').text());
    $('#outsat').text($('#outstandworkingdays').text());

    $("#hidetable").hide();
    $("#hidetable2").hide();
    $("#hidetable3").hide();

    $('#cngcharg').text($('#CngChargedDays').text());
    $('#cngallow').text($('#CngAllowance').text());
    $('#bikeexp').text($('#BikeExpense').text());
    $('#bikededuc').text($('#BikeDeduction').text());


    $('#mobill').text($('#CellPhoneBillAmount').text());
    $('#nontouring').text($('#MonthlyNonTouringAllowance').text());
    $('#mobill').text($('#CellPhoneBillAmount').text());
    $('#mobillcorr').text($('#CellPhoneBillAmountCorrection').text());
    $('#miscexp').text($('#MonthlyExpenseTownBased').text());
    $('#adjexp').text($('#MiscExpense').text());
    $('#monthlyallow').text($('#MonthlyAllowance_BigCity').text());
    $('#expnote').text($('#ExpenseNote').text());
    $('#adjexp').text($('#MiscExpense').text());


    //var newbody = '<tr>'
    //   + ' <td>1</td>'
    //   + ' <td>Sat</td>'
    //    + '<td><select class="txtbox">    <option value="-1">Doctor Visited</option></select></td>'
    //    + '<td><input type="text" class="smallbox" disabled id="txtmileage" /></td>'
    //      + '<td>  <input type="text" class="smallbox" disabled id="txtfare" /></td>'
    //      + '<td> <input type="text" class="smallbox" disabled id="txtda" /></td>'
    //      + '<td><select class="txtbox">    <option value="-1"></option> </select></td>'
    //      + '<td><input type="text" class="smallbox" disabled id="txtnightstay" /></td>'
    //      + '<td><input type="text" class="smallbox" disabled id="txtoutback" /></td>'
    //      + '<td><input type="text" class="smallbox" disabled id="txtbigcity" /></td>'
    //      + '<td><input type="text" class="smallbox" disabled id="txttotal" /></td>'
    //  + '</tr>'
    //  + '<tr>'
    //   + ' <td colspan="5"><h4>Insert City</h4></td>'
    //      + '<td><select class="txtbox"><option value="value">city</option></select> </td>'
    //        + '<td><select class="txtbox"><option value="value">city</option></select> </td>'
    //        + '<td><input type="text" class="smallbox" disabled id="txitamount"/></td>'
    //  + '</tr>';

    // console.log(jsonObj);
    for (var i = 0; i < jsonObj.length ; i++) {
        //  if (getDay((i + 1), MonthOfExpense.split('-')[1], MonthOfExpense.split('-')[2]) != "Sunday") {
        //alert(PurposeOfVisit[jsonObj[i].VisitPurpose]);
        //$('#txtvisitbox' + (i + 1)).text(PurposeOfVisit[((jsonObj[i].VisitPurpose == "") ? "-1" : jsonObj[i].VisitPurpose)]);
        //$('#txtreasonbox' + (i + 1)).val(((jsonObj[i].TourDayClosing == "") ? "-1" : jsonObj[i].TourDayClosing));
        //$('#txtda' + (i + 1)).text(((jsonObj[i].DailyAllowance == "") ? "0" : jsonObj[i].DailyAllowance));
        ////$('#txtda' + (i + 1)).val(((jsonObj[i].DailyAllowance == "") ? "0" : jsonObj[i].DailyAllowance));
        //$('#txtnightstay' + (i + 1)).text(((jsonObj[i].NightStay == "") ? "0" : jsonObj[i].NightStay));
        //$('#txtoutback' + (i + 1)).text(((jsonObj[i].OutBack == "") ? "0" : jsonObj[i].OutBack));
        $('#txtda' + (i + 1)).text(((jsonObj[i].DailyAllowance == "") ? "" : (parseInt(jsonObj[i].DailyAllowance) + ((jsonObj[i].ID1 == "") || (jsonObj[i].ID == null) ? 0 : dailyAllval))));
        $('#txtreim' + (i + 1)).text(jsonObj[i].ReimAmount); //Reim Amount in column
       //old
        //$('#txtda' + (i + 1)).text(((jsonObj[i].DailyAllowance == "") ? "" : (parseInt(jsonObj[i].DailyAllowance) + dailyAllval)));

        //$('#txtda' + (i + 1)).val(((jsonObj[i].DailyAllowance == "") ? "0" : jsonObj[i].DailyAllowance));
        $('#txtnightstay' + (i + 1)).text(((jsonObj[i].NightStay == "") ? "" : jsonObj[i].NightStay));
        $('#txtoutback' + (i + 1)).text(((jsonObj[i].OutBack == "") ? "" : jsonObj[i].OutBack));
        $('#Misc' + (i + 1)).text(((jsonObj[i].Amount == "") ? "0" : jsonObj[i].Amount));
        //Manager Deduction Column 12/12/2019
        $('#txtDSMDeduct' + (i + 1)).text(((jsonObj[i].DsmDeductAmount == "") ? "0" : jsonObj[i].DsmDeductAmount));
        $('#txtSMDeduct' + (i + 1)).text(((jsonObj[i].SMDeductAmount == "") ? "0" : jsonObj[i].SMDeductAmount));
        $('#txtBUHDeduct' + (i + 1)).text(((jsonObj[i].NsmDeductAmount == "") ? "0" : jsonObj[i].NsmDeductAmount));
     

        if (jsonObj[i].ID1 != '') {
            getallexpensepolicy(jsonObj[i].ID1, (i + 1), jsonObj[i].TotalMilageKm);
            filldailyActivities((i + 1), jsonObj[i].ID1, MonthlyExpenseId);
        }
        else {
            getallexpensepolicy(jsonObj[i].ID1, (i + 1), jsonObj[i].TotalMilageKm);
        }
        /*else {
            getallexpensepolicy('0', (i + 1));
        }*/
        /*if (jsonObj[i].CNGExpense != '' && jsonObj[i].CNGExpense != '0') {
            $i('#chkcng' + (i + 1)).prop("checked", true);
        }*/
        visitboxchange(((jsonObj[i].VisitPurpose == "") ? "-1" : jsonObj[i].VisitPurpose), (i + 1), false);
        reasonboxchange(((jsonObj[i].TourDayClosing == "") ? "-1" : jsonObj[i].TourDayClosing), (i + 1), false);
        // }
    }
    rowTotal();
    grandTotal();
    $('#gratotal').text($('#GrandTotal').text());
    $('#dialog').jqmHide();
    for (var i = 0; i < jsonObj.length ; i++) {
        if (getDay((i + 1), MonthOfExpense.split('-')[1], MonthOfExpense.split('-')[2]) != "Sunday") {
            if (jsonObj[i].VisitPurpose == "") {
                $('#txtda' + (i + 1)).text('-');
                $('#txtbigcity' + (i + 1)).text('-');
                //$('#txtiba' + (i + 1)).text('-');
                $('#txtfare' + (i + 1)).text('-');
                $('#txtmileage' + (i + 1)).text('-');
            }
            if (jsonObj[i].TourDayClosing == "") {
                $('#txtnightstay' + (i + 1)).text('-');
                $('#txtoutback' + (i + 1)).text('-');

            }
        }
    }
}

var visitboxchange = function (visitbox, row, flag) {
    
    var val = visitbox;
    var milage = '#txtmileage' + row;
    var txtid = '#txtfare' + row;
    var dailyAll = '#txtda' + row
    //var institutionAll = '#txtiba' + row
    var bigcity = '#txtbigcity' + row
    var reasonBox = '#txtreasonbox' + row;
    var dropdown = '#txtvisitbox' + row;
    var addCityTable = '#addcity' + row;
    /*if (flag) {
        var checkbox = '#checkbox' + row
        $i(checkbox).prop("checked", true);
    }*/

    if (val != '-1') {

        // If Value 5 (Leave) Selected
        if (val == '5' || val == '14') {

            // var aa = $(visitboxid).parent().next().prop("type");
            //alert($(visitboxid).parent().next().prop('type'));
            //if (confirm('Are you sure you select Leave?')) {

            //$(dailyAll).text();
            $(bigcity).text('0');
            //$(institutionAll).text('0');
            $(txtid).text('0');
            $(milage).text('0');

            // Empties The Added Cities.
            $(addCityTable).empty();

            $i(reasonBox).prop('disabled', true);
            $(reasonBox).val('-1');

            /*} else if (val == '16') {
                // TODO: Work For Meeting Paid Select
            } else {


                $(dropdown).val('-1');
            }*/

        }
        else if (val == '16') {
            $i(reasonBox).prop('disabled', false);
            $(addCityTable).empty();
            $(txtid).val('0');
            $(milage).val('0');
            //$(institutionAll).text('0');
            $(bigcity).text('0');
        }
        else {

            //$("#appendCity" + row).prop('disabled', false);
            //$(milage).val('0');
            //$(milage).val(milageval);
            //isIBA = jsonObj[i].isIBA;
            //isBigCity = jsonObj[i].isBigCity;


            $i(reasonBox).prop('disabled', false);
            //$(dailyAll).text();
            $(bigcity).text('0');
            //$(institutionAll).text('0');

            //$(dailyAll).text();

            if (isBigCity == "1")
                $(bigcity).text(bigCityval);
            //if (isIBA == "1")
            //    $(institutionAll).text(institutionAllowance);

        }
    }

    else {
        $(dailyAll).text('0');
        $(bigcity).text('0');
        //$(institutionAll).text('0');
        $(txtid).val('0');
        $(milage).val('0');

    }
    maketotal(row);
    rowTotal();
    grandTotal();
}

//var reasonboxchange = function (resonbox, row, flag) {
//    var val = resonbox;
//    var nightstay = '#txtnightstay' + row
//    var outback = '#txtoutback' + row
//    if (flag) {
//        var checkbox = '#checkbox' + row
//        $i(checkbox).prop("checked", true);
//    }

//    if (val != '-1') {
//        if (val == '1') {
//            $(outback).text('0');
//            $(nightstay).text('0');
//        }
//        else if (val == '2') {
//            $(outback).text('0');
//            $(nightstay).text('0');
//            $(nightstay).text(nightStayval);
//        } else if (val == '3') {
//            $(nightstay).text('0');
//            $(outback).text('0');
//            $(outback).text(outBackval);
//        }
//    }
//    else {
//        $(nightstay).text('0');
//        $(outback).text('0');
//    }
//    maketotal(row);
//    rowTotal();
//    grandTotal();
//}
var reasonboxchange = function (resonboxid, row, flag) {
    var val = $(resonboxid).val();
    var nightstay = '#txtnightstay' + row
    var outback = '#txtoutback' + row
    if (flag) {
        var checkbox = '#checkbox' + row
        $i(checkbox).prop("checked", true);
    }



    if (val != '-1') {
        if (val == '1') {
            $(outback).val('0');
            $(nightstay).val('0');
        }
        else if (val == '2') {
            $(outback).val('0');
            $(nightstay).val('0');
            $(nightstay).val(nightStayval);
            $(outback).val(outBackval);
        } else if (val == '3') {
            $(nightstay).val('0');
            $(outback).val('0');
            $(outback).val(outBackval);
        }
    }
    else {
        $(outback).val(outBackval);
        $(nightstay).val('0');
        $(outback).val('0');
    }
    maketotal(row);
    rowTotal();
    grandTotal();
}


var filldailyActivities = function (nodeValue, DailyId, MonthlyExpenseId) {

    //alert(dailyid);
    //if (expenseDetailNew == null || dailyid > 0) {
    if (DailyId > 0) {
        $.ajax({
            type: "POST",
            url: "EditExpense.asmx/FillDailyExpenseDetails",
            data: "{'EmployeeId':" + EmployeeId + ",'EmployeeExpenseMonthlyId':'" + MonthlyExpenseId + "','EmployeeExpenseDailyId':'" + DailyId + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var jsonObj1 = $.parseJSON(response.d);
                //if (dailyid == 0) {
                //expenseDetailNew = jsonObj;
                //}

                $("#txttownvisited" + nodeValue).empty();
                $.each(jsonObj1, function (i, tweet) {
                    var ISapiFlag = jsonObj[i].System;
                    debugger
                    //addcitys(nodeValue, "Update", jsonObj[i].ID, jsonObj[i].ActivityLinks, false, ISapiFlag);
                    var txitmilage = "#txitmilage" + nodeValue + 'o' + (i + 1);
                    $(txitmilage).val(jsonObj[i].MilageKm);
                    if (i == 0)
                    {
                        if (jsonObj1[i].FromCity != "-1" && jsonObj1[i].ToCity!="-1")
                            $("#txttownvisited" + nodeValue).append(cities[jsonObj1[i].FromCity] + " -> " + cities[jsonObj1[i].ToCity]);
                        $("#txitmilage" + nodeValue).append([jsonObj1[i].MilageKm] + "<br/>");
                            
                    }
                    else
                    {
                        if (jsonObj1[i].FromCity != "-1" && jsonObj1[i].ToCity != "-1")
                            $("#txttownvisited" + nodeValue).append("<br/>" + cities[jsonObj1[i].FromCity] + " -> " + cities[jsonObj1[i].ToCity]);
                        $("#txitmilage" + nodeValue).append( [jsonObj1[i].MilageKm] + "<br/>");
                    }

                    if (jsonObj1[i].FromCity != "-1" && jsonObj1[i].ToCity != "-1") {
                        if (!(jsonObj1[i].FromCity == BaseCityID && jsonObj1[i].ToCity == BaseCityID))
                            NonTourAllowanceApplicable = false;
                    }
                  
                    //$(element).append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].City + "</option>");
                    /*addcity(nodeValue, "Update", jsonObj[i].ID);
                    var fromcity = '#fromcity' + nodeValue + 'o' + (i + 1);
                    var tocity = "#tocity" + nodeValue + 'o' + (i + 1);
                    var txitmilage = "#txitmilage" + nodeValue + 'o' + (i + 1);
                    var chkSelf = "#self" + nodeValue + 'o' + (i + 1);
                    var chkCompany = "#company" + nodeValue + 'o' + (i + 1);
                    //alert("AJAX");
                    $(fromcity).val(jsonObj[i].FromCity);
                    $(tocity).val(jsonObj[i].ToCity);
                    $(txitmilage).val(jsonObj[i].MilageKm);
                    if (jsonObj[i].Fare == "0") {
                        $i(chkSelf).prop("checked", true);
                        $(chkCompany).removeAttr('checked');
                    }
                    else {
                        $i(chkCompany).prop("checked", true);
                        $(chkSelf).removeAttr('checked');
                    }*/
                });
            },
            error: onError,
            cache: false,
            async: false,
            beforeSend: startingAjax,
            complete: ajaxCompleted
        });
    }
    else {
        //alert("Developer Msg :: expenseDetailNew Row Is NULL");
    }
    //else if (expenseDetailNew != null) {
    //    $.each(expenseDetailNew, function (i, tweet) {
    //        //$(element).append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].City + "</option>");
    //        addcity(nodeValue, "Update", expenseDetailNew[i].ID);
    //        var fromcity = '#fromcity' + nodeValue + 'o' + (i + 1);
    //        var tocity = "#tocity" + nodeValue + 'o' + (i + 1);
    //        var txitmilage = "#txitmilage" + nodeValue + 'o' + (i + 1);
    //        var chkSelf = "#self" + nodeValue + 'o' + (i + 1);
    //        var chkCompany = "#company" + nodeValue + 'o' + (i + 1);
    //        $(fromcity).val(expenseDetailNew[i].FromCity);
    //        $(tocity).val(expenseDetailNew[i].ToCity);
    //        $(txitmilage).val(expenseDetailNew[i].MilageKm);
    //        //alert("LOCAL");
    //        if (expenseDetailNew[i].Fare == "0") {
    //            $i(chkSelf).prop("checked", true);
    //            $(chkCompany).removeAttr('checked');
    //        }
    //        else {
    //            $i(chkCompany).prop("checked", true);
    //            $(chkSelf).removeAttr('checked');
    //        }
    //    });
    //}


    //alert("fille");


}




/*var OnSuccessfilldailyActivities = function (response) {

    jsonObj = $.parseJSON(response.d);
    $.each(jsonObj, function (i, tweet) {
        $(fromid).append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].City + "</option>");
    });

}*/

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}


function addcitys(row, flag, ID, maplinks, bool, FlagAPI) {
debugger
    if (bool) {
        var checkbox = '#checkbox' + row
        $i(checkbox).prop("checked", true);
    }
    //if (IsEditable || flag == "Update") {

    var valofcity = $('#addcity' + row + " >tr").length + 1; //#addcity1 >tr
    var tdcityidValue = ID;
    var visitBox = '#txtvisitbox' + row;
    if ($(visitBox).val() == "5" || $(visitBox).val() == "14" || $(visitBox).val() == "16") {
        return;
    }

    $('#addcity' + row).append(
        "<tr id='trcity" + row + "o" + valofcity + "'>" +
        "<td id='tdcityid" + row + "o" + valofcity + "' style='display:none'>" + tdcityidValue + "</td>" +
        "<td></td>" +
        "<td> <select id='fromcity" + row + "o" + valofcity + "' onChange='onchangeDropDown(fromcity" + row + "o" + valofcity + ",tocity" + row + "o" + valofcity + ",txitmilage" + row + "o" + valofcity + ")' class='txtbox'>" +
        "<option value='-1'> </option></select></td>" +
        "<td> <select id='tocity" + row + "o" + valofcity + "' onChange='onchangeDropDown(fromcity" + row + "o" + valofcity + ",tocity" + row + "o" + valofcity + ",txitmilage" + row + "o" + valofcity + ")'  class='txtbox'><option value='-1'> </option> </select></td>" +
        "<td><input type='text' class='smallbox' disabled  id='txitmilage" + row + "o" + valofcity + "'/></td>" +

       // style='display:"+maplinks=='' ? "none" : "block"+";
      "<td><a id='maplink' " + row + "'  href='" + maplinks + "' style='display:" + (maplinks == '' ? "none" : "block") + ";text-align: center; cursor: pointer;' target='_blank'>" + "View" + "</a>" +
        //"<div>" +
        //"<input type='radio' name='Type" + row + "o" + valofcity + "' id='self" + row + "o" + valofcity + "' checked>" +
        //"<label for='self" + row + "o" + valofcity + "' data='" + row + "o" + valofcity + "'>Self</label>" +
        //"<input type='radio' name='Type" + row + "o" + valofcity + "' id='company" + row + "o" + valofcity + "'>" +
        //"<label for='company" + row + "o" + valofcity + "' data='" + row + "o" + valofcity + "'>Company</label>" +
        //"</div>" +
        "</td>" +
        //"<td><a  style='display: block; text-align: center;cursor: pointer;' class='txtboxx' id='saveupdate" + row + "o" + valofcity + "' onClick='savecitydistance(\"" + row + 'o' + valofcity + "\"," + row + ",\"" + flag + "\")'>" + flag + "</a></td>" +
        "<td><a  style='display: none; text-align: center;cursor: pointer;' class='txtboxx' id='saveupdate" + row + "o" + valofcity + "' onClick='savecitydistance(\"" + row + 'o' + valofcity + "\"," + row + ",\"" + flag + "\")'>" + flag + "</a></td>" +
        //"<td><a style='display: block; text-align: center;cursor: pointer;' class='txtboxx' onClick='removecity(\"" + row + 'o' + valofcity + "\"," + row + ")'>Delete</a></td>" +
        "<td class='hideforSPO' style='display: none;'> <img style='cursor:  pointer; display:none;'   alt='Click to Delete' src='../Images/close-button.png' width='25px' height='25px' onClick='removecity(\"" + row + 'o' + valofcity + "\"," + row + ")'/></td> " +

        "</tr>");
    //var fromcity = '#fromcity' + row + 'o' + valofcity;
    //var tocity = "#tocity" + row + 'o' + valofcity;
    //fillallddlcities(fromcity, tocity);
    $('label').click(function () {
        labelID = $(this).attr('for');
        if (labelID.indexOf("self") != -1) {
            labelID = $(this).attr('data');
            $i('#self' + labelID).prop("checked", true);
            $('#company' + labelID).removeAttr('checked');
            //alert("Company" + $('#company' + labelID).is(':checked') + "\n" +
            //"Self" + $('#self' + labelID).is(':checked'));
        }
        else if (labelID.indexOf("company") != -1) {
            labelID = $(this).attr('data');
            $i('#company' + labelID).prop("checked", true);
            $('#self' + labelID).removeAttr('checked');
            //alert("Company" + $('#company' + labelID).is(':checked') + "\n" +
            //"Self" + $('#self' + labelID).is(':checked'));
        }
    });

    if (FlagAPI == 'API' && $('#UserRole').val() == "admin") {
        $("#txitmilage" + row + "o" + valofcity + "").removeAttr('disabled');
        //$('#txitmilage' + row + "o" + valofcity + "").css('color', 'red');
        //$('#txitmilage' + row + "o" + valofcity + "").css('background', 'yellow');
        $('#txitmilage' + row + "o" + valofcity + "").addClass('borderClass');
        $("#txitmilage" + row + "o" + valofcity + "").attr('disabled', false);
        $i("#saveupdate" + row + "o" + valofcity + "").css("display", "block")
    }
    else if (FlagAPI == 'API' && $('#UserRole').val() != "admin") {
        $('#txitmilage' + row + "o" + valofcity + "").addClass('borderClass');
        $('#txitmilage' + row + "o" + valofcity + "").css('color', 'red');
    }
    //}

}
function txttownvisited5(row, flag, ID) {

    if (IsEditable || flag == "Update") {

        var valofcity = $('#addcity' + row + " >tr").length + 1; //#addcity1 >tr
        var tdcityidValue = ID;
        var visitBox = '#txtvisitbox' + row;
        if ($(visitBox).val() == "5" || $(visitBox).val() == "14" || $(visitBox).val() == "16") {
            return;
        }

        $('#addcity' + row).append(
            "<tr id='trcity" + row + "o" + valofcity + "'>" +
            "<td id='tdcityid" + row + "o" + valofcity + "' style='display:none'>" + tdcityidValue + "</td>" +
            "<td></td>" +
            "<td> <select id='fromcity" + row + "o" + valofcity + "' onChange='onchangeDropDown(fromcity" + row + "o" + valofcity + ",tocity" + row + "o" + valofcity + ",txitmilage" + row + "o" + valofcity + ")' class='txtbox'>" +
            "<option value='-1'> </option></select></td>" +
            "<td> <select id='tocity" + row + "o" + valofcity + "' onChange='onchangeDropDown(fromcity" + row + "o" + valofcity + ",tocity" + row + "o" + valofcity + ",txitmilage" + row + "o" + valofcity + ")'  class='txtbox'><option value='-1'> </option> </select></td>" +
            "<td><input type='text' class='smallbox' id='txitmilage" + row + "o" + valofcity + "'/></td>" +
            "<td>" +
            "<div>" +
            "<input type='radio' name='Type" + row + "o" + valofcity + "' id='self" + row + "o" + valofcity + "' checked>" +
            "<label for='self" + row + "o" + valofcity + "' data='" + row + "o" + valofcity + "'>Self</label>" +
            "<input type='radio' name='Type" + row + "o" + valofcity + "' id='company" + row + "o" + valofcity + "'>" +
            "<label for='company" + row + "o" + valofcity + "' data='" + row + "o" + valofcity + "'>Company</label>" +
            "</div>" +
            "</td>" +
            //"<td><a  style='display: block; text-align: center;cursor: pointer;' class='txtboxx' id='saveupdate" + row + "o" + valofcity + "' onClick='savecitydistance(\"" + row + 'o' + valofcity + "\"," + row + ",\"" + flag + "\")'>" + flag + "</a></td>" +
            "<td><a  style='display: none; text-align: center;cursor: pointer;' class='txtboxx' id='saveupdate" + row + "o" + valofcity + "' onClick='savecitydistance(\"" + row + 'o' + valofcity + "\"," + row + ",\"" + flag + "\")'>" + flag + "</a></td>" +
            //"<td><a style='display: block; text-align: center;cursor: pointer;' class='txtboxx' onClick='removecity(\"" + row + 'o' + valofcity + "\"," + row + ")'>Delete</a></td>" +
            "<td> <img style='cursor: pointer;' alt='Click to Delete' src='../Images/close-button.png' width='25px' height='25px' onClick='removecity(\"" + row + 'o' + valofcity + "\"," + row + ")'/></td> " +
            "</tr>");
        var fromcity = '#fromcity' + row + 'o' + valofcity;
        var tocity = "#tocity" + row + 'o' + valofcity;
        fillallddlcities(fromcity, tocity);
        $('label').click(function () {
            labelID = $(this).attr('for');
            if (labelID.indexOf("self") != -1) {
                labelID = $(this).attr('data');
                $i('#self' + labelID).prop("checked", true);
                $('#company' + labelID).removeAttr('checked');
                //alert("Company" + $('#company' + labelID).is(':checked') + "\n" +
                //"Self" + $('#self' + labelID).is(':checked'));
            }
            else if (labelID.indexOf("company") != -1) {
                labelID = $(this).attr('data');
                $i('#company' + labelID).prop("checked", true);
                $('#self' + labelID).removeAttr('checked');
                //alert("Company" + $('#company' + labelID).is(':checked') + "\n" +
                //"Self" + $('#self' + labelID).is(':checked'));
            }
        });
    }

}



function removecity(val, row) {

    if (IsEditable) {

        var tdval = '#tdcityid' + val
        var tdValue = "";
        if ($(tdval)[0].innerHTML != null && $(tdval)[0].innerHTML != '') {
            tdValue = $(tdval)[0].innerHTML;

            $.ajax({
                type: "POST",
                url: "EditExpense.asmx/DeleteCityDistance",
                contentType: "application/json; charset=utf-8",
                data: '{"EEDailyDetailId":' + $(tdval)[0].innerHTML + ',"EEDailyId":' + $('#td' + row)[0].innerHTML + '}',
                success: function (response) {

                    $('#trcity' + val).remove();
                    fillGrid();
                },
                error: onError,
                cache: false,
                async: false,
                beforeSend: startingAjax,
                complete: ajaxCompleted
            });
        }
        else {
            $('#trcity' + val).remove();
        }
    }
    else {

    }
}
function saveupdateRow(row) {
    if (IsEditable) {
        var visitperid = '#txtvisitbox' + row
        var reasonboxid = '#txtreasonbox' + row
        var daid = '#txtda' + row
        //var institutionAll = '#txtiba' + row
        var nightstayid = '#txtnightstay' + row
        var outbackid = '#txtoutback' + row
        var tdval = '#td' + row
        var flagValue = '#saveupdateRow' + row;
        var flag = $(flagValue)[0].innerHTML;
        var visitperidValue = $(visitperid).val();
        var chckboxid = '#chkcng' + row

        if (flag == 'Save') {
            if (visitperidValue != '-1') {
                //alert(flag);
                $.ajax({
                    type: "POST",
                    url: "EditExpense.asmx/InsertDailyExpense",
                    contentType: "application/json; charset=utf-8",
                    data: '{"EEMonthlyId":' + MonthlyExpenseId + ',"EEDay":' + row + ',"VisitPurpose":"' + $(visitperid).val() + '","TourDayClosing":"' + $(reasonboxid).val() +
                     '","DailyAllowance":"' + $(daid).val() + '","NightStay":"' + $(nightstayid).val() + '","OutBack":"' + $(outbackid).val() +
                     '","CNGAllowance":"' + ((parseInt(CNGAllowance) > 0) ? (($i(chckboxid).prop('checked')) ? CNGAllowance : "0") : "0") +
                     '","InstitutionAllowance":"0"}',//' + $(institutionAll).val() + '"}',
                    success: function (response) {
                        jsonObj = $.parseJSON(response.d);
                        $.each(jsonObj, function (i, tweet) {
                            var ID = jsonObj[i].ID
                            $(tdval)[0].innerHTML = ID;
                            $(flagValue)[0].innerHTML = 'Update';
                        });
                        fillEmpDetails(MonthOfExpense);
                    },
                    error: onError,
                    cache: false,
                    async: false,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted
                });
            }
        }
        else {
            if (visitperidValue != '-1') {
                //alert(flag);
                $.ajax({
                    type: "POST",
                    url: "EditExpense.asmx/UpdateDailyExpense",
                    contentType: "application/json; charset=utf-8",
                    data: '{"EEMonthlyId":' + MonthlyExpenseId + ',"EEDailyId":' + $(tdval)[0].innerHTML + ',"VisitPurpose":"' + $(visitperid).val() + '","TourDayClosing":"' + $(reasonboxid).val() + '","DailyAllowance":"' + $(daid).val() + '","NightStay":"' + $(nightstayid).val() + '","OutBack":"' + $(outbackid).val() + '","CNGAllowance":"' + ((parseInt(CNGAllowance) > 0) ? (($i(chckboxid).prop('checked')) ? CNGAllowance : "0") : "0") + '","InstitutionAllowance":"0"}',// + $(institutionAll).val() + '"}',
                    success: function (response) {
                        //jsonObj = $.parseJSON(response.d);
                        //$.each(jsonObj, function (i, tweet) {

                        //});
                        fillEmpDetails(MonthOfExpense);
                    },
                    error: onError,
                    cache: false,
                    async: false
                });
            }
        }
    }
    else {

    }
}
function savecitydistance(val, row, flag) {
    if (IsEditable) {
        var daid = '#txtda' + row
        //var institutionAll = '#txtiba' + row
        var nightstayid = '#txtnightstay' + row
        var outbackid = '#txtoutback' + row
        var chckboxid = '#chkcng' + row

        var fromvalue = $('#fromcity' + val).val();
        var tovalue = $('#tocity' + val).val();
        var textval = $('#txitmilage' + val).val();
        var visitperid = '#txtvisitbox' + row
        var reasonboxid = '#txtreasonbox' + row
        var tdval = '#td' + row
        var tdValue = '-1';
        var flagValue = '#saveupdateRow' + row;
        if (flag == 'Save') {
            if ($(tdval)[0].innerHTML != null && $(tdval)[0].innerHTML != '') {
                tdValue = $(tdval)[0].innerHTML;
            }
            if (fromvalue != '-1') {
                if (tovalue != '-1') {
                    $.ajax({
                        type: "POST",
                        url: "EditExpense.asmx/SaveCityDistance",
                        contentType: "application/json; charset=utf-8",
                        data: '{"EEMonthlyId":' + MonthlyExpenseId + ',"VisitPurpose":"' + $(visitperid).val() + '","TourDayClosing":"' + $(reasonboxid).val() + '","EEDailyId":' + tdValue + ',"EEDay":' + row + ',"fromCity":"' + fromvalue + '","toCity":"' + tovalue + '","milageKM":"' + textval + '","DailyAllowance":"' + $(daid).val() + '","NightStay":"' + $(nightstayid).val() + '","OutBack":"' + $(outbackid).val() + '","CNGAllowance":"' + ((parseInt(CNGAllowance) > 0) ? (($i(chckboxid).prop('checked')) ? CNGAllowance : "0") : "0") + '","InstitutionAllowance":"0'// + $(institutionAll).val()
                            + '","TravelType":"' + $('#self' + val).is(':checked') + '"}',
                        success: function (response) {
                            jsonObj = $.parseJSON(response.d);
                            $.each(jsonObj, function (i, tweet) {
                                var ID = jsonObj[i].ID
                                var ID1 = jsonObj[i].ID1
                                $(tdval)[0].innerHTML = ID;
                                $('#tdcityid' + val)[0].innerHTML = ID1;
                                $('#saveupdate' + val)[0].innerHTML = 'Update';
                                $(flagValue)[0].innerHTML = 'Update';
                                fillGrid();
                            });
                        },
                        error: onError,
                        cache: false,
                        async: false,
                        beforeSend: startingAjax,
                        complete: ajaxCompleted
                    });
                }
                else {
                }
            }
        }
        else {
            $.ajax({
                type: "POST",
                url: "EditExpense.asmx/UpdateCityDistance",
                contentType: "application/json; charset=utf-8",
                data: '{"EEDailyDetailId":' + $('#tdcityid' + val)[0].innerHTML + ',"EEDailyId":' + $(tdval)[0].innerHTML + ',"fromCity":"' + fromvalue + '","toCity":"' + tovalue + '","milageKM":"' + textval + '","TravelType":"' + $('#self' + val).is(':checked') + '"}',
                success: function (response) {
                    //jsonObj = $.parseJSON(response.d);
                    //$.each(jsonObj, function (i, tweet) {

                    //});
                    fillGrid();
                },
                error: onError,
                cache: false,
                async: false,
                beforeSend: startingAjax,
                complete: ajaxCompleted
            });
        }
    }
    else {

    }
}



function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function getDay(day, month, year) {
    var dateconv = parseDate(day + "-" + month + "-" + year)
    var d = new Date(dateconv);
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var n = weekday[dateconv.getDay()]
    return n
}

function parseDate(s) {
    var months = {
        jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
        jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };
    var p = s.split('-');
    return new Date(p[2], months[p[1].toLowerCase()], p[0]);
}
var onError = function () {
    alert("Something went wrong");
}
var fromid = '';
var toid = '';

var fillallddlcities = function (fromcityid, tocityid) {
    fromid = fromcityid;
    toid = tocityid;

    value = '-1';
    name = 'Select City';
    $(fromid).empty();
    $(toid).empty();
    $(fromid).append("<option value='" + value + "'>" + name + "</option>");
    $(toid).append("<option value='" + value + "'>" + name + "</option>");
    $.each(CityID, function (i, tweet) {
        $(fromid).append("<option value='" + CityID[i] + "'>" + CityName[i] + "</option>");
        $(toid).append("<option value='" + CityID[i] + "'>" + CityName[i] + "</option>");
    });

}



var onchangeDropDown = function (fromid, toid, boxid) {
    var fromvalue = $(fromid).val();
    var tovalue = $(toid).val();
    //if (fromvalue != '-1') {
    //if (tovalue != '-1') {
    //GetSelectedCityId = boxid
    if (fromvalue == tovalue) {

    }
    var identityKey = fromvalue + ',' + tovalue;
    if (cityDistances.hasOwnProperty(identityKey)) {
        $(boxid).val(cityDistances[identityKey]);
    }
    else {
        identityKey = tovalue + ',' + fromvalue;
        if (cityDistances.hasOwnProperty(identityKey)) {
            $(boxid).val(cityDistances[identityKey]);
        }
        else {
            $(boxid).val("");
        }
    }
    //for (var identity in cityDistances) {
    //$(GetSelectedCityId).val(hash[identity]);
    //alert(identity + '  ' + cityDistances[identity]);
    //}
    //$(GetSelectedCityId).val(jsonObj[i].distanceKm);
    //$.ajax({
    //    type: "POST",
    //    url: "EditExpense.asmx/FillDistance",
    //    contentType: "application/json; charset=utf-8",
    //    data: '{"from":' + fromvalue + ',"to":' + tovalue + '}',
    //    success: OnsuccessDropDown,
    //    error: onError,
    //    cache: false,
    //    async: false,
    //    beforeSend: startingAjax,
    //    complete: ajaxCompleted
    //});
    //}
    //else {
    //}
    //}
}

function FillDistances() {
    $.ajax({
        type: "POST",
        url: "EditExpense.asmx/FillDistance",
        contentType: "application/json; charset=utf-8",
        data: '{"EmployeeId":' + EmployeeId + '}',
        success: OnsuccessFillDistances,
        error: onError,
        cache: false,
        async: false,
        beforeSend: startingAjax,
        complete: ajaxCompleted
    });
}
var OnsuccessFillDistances = function (response) {
    //$(GetSelectedCityId).val('');
    cityDistances = {};
    jsonObj = $.parseJSON(response.d);
    $.each(jsonObj, function (i, tweet) {
        cityDistances[jsonObj[i].fromCityId + ',' + jsonObj[i].toCityId] = jsonObj[i].distanceKm;
        //$(GetSelectedCityId).val(jsonObj[i].distanceKm);
    });
}

var fillEmpDetails = function (date) {
    $.ajax({
        type: "POST",
        url: "EditExpense.asmx/FillEmpBasicDetails",
        contentType: "application/json; charset=utf-8",
        data: '{"EmployeeId":' + EmployeeId + ',"date":"' + date + '"}',
        success: OnsuccessFillEmpDetails,
        error: onError,
        cache: false,
        async: false,
        beforeSend: startingAjax,
        complete: ajaxCompleted
    });
}
var OnsuccessFillEmpDetails = function (response) {

    if (response.d != null && response != '') {

        $('#empName').empty();
        $('#expensemonth').empty();
        //$('#empcode').empty();
        //$('#empid').empty();
        $('#empteam').empty();
        $('#empdesignation').empty();
        $('#empcity').empty();
        $('#dateofjoining').empty();
        $('#empmanager').empty();
        $('#totalworkingdays').empty();
        $('#localworkingdays').empty();
        $('#satsunworkingdays').empty();
        $('#empoutback').empty();
        $('#empnightstay').empty();
        $('#outstandworkingdays').empty();
        //$('#empIBA').empty();
        $('#empADDA').empty();
        jsonObj = $.parseJSON(response.d);
        $.each(jsonObj, function (i, tweet) {
            $('#empName')[0].innerHTML = jsonObj[i].EmployeeName;
            $('#expensemonth')[0].innerHTML = MonthOfExpense.split("-")[1] + "-" + MonthOfExpense.split("-")[2];
            $('#empCode')[0].innerHTML = jsonObj[i].EmployeeCode;

            $('#emploginID')[0].innerHTML = jsonObj[i].LoginId;
            $('#empteam')[0].innerHTML = jsonObj[i].Team;
            $('#empdesignation')[0].innerHTML = jsonObj[i].Designation;
            //$('#empcity')[0].innerHTML = '<strong>City :</strong> ' + jsonObj[i].City;
            //$('#dateofjoining')[0].innerHTML = '<strong>DOJ :</strong> ' + jsonObj[i].DOJ;
            $('#empcity')[0].innerHTML = jsonObj[i].City;
            BaseCityID = jsonObj[i].CityId;
            $('#dateofjoining')[0].innerHTML = jsonObj[i].DOJ;
            $('#empmanager')[0].innerHTML = jsonObj[i].ManagerName;
            $('#totalworkingdays')[0].innerHTML = jsonObj[i].TotalWorkingDays;
            $('#localworkingdays')[0].innerHTML = jsonObj[i].LocalWorkingDays;
            $('#satsunworkingdays')[0].innerHTML = jsonObj[i].SundayWorkingDays;
            $('#empoutback')[0].innerHTML = jsonObj[i].OutBackWorkingDays;
            $('#empnightstay')[0].innerHTML = jsonObj[i].NightStayWorkingDays;
            $('#outstandworkingdays')[0].innerHTML = jsonObj[i].OutstationWorkingDays;
            //$('#empIBA')[0].innerHTML = jsonObj[i].IBADays;
            $('#empADDA')[0].innerHTML = jsonObj[i].ADDADays;
            isCarAllowanceAllowed = jsonObj[i].isCarAllowance;
            isBikeAllowanceAllowed = jsonObj[i].isBikeAllowance;
            isIBA = jsonObj[i].isIBA;
            isBigCity = jsonObj[i].isBigCity;

            //if (isCarAllowanceAllowed == "0")
            //    $('#CNGDataRow').hide();
            if (isBikeAllowanceAllowed == "0")
                $('#BikeDataRow').hide();


            Misc = jsonObj[i].MonthlyExpenseTownBased;
            milageval = jsonObj[i].MilageFarePerKm;
            dailyAllval = jsonObj[i].DailyAllowance;
            //institutionAllowance = jsonObj[i].DailyInstitutionBaseAllowance;
            bigCityval = jsonObj[i].DailyAddAllowance_BigCity;
            nightStayval = jsonObj[i].OutStationAllowance_NightStay;
            outBackval = jsonObj[i].OutStationAllowance_OutBack;

            nontouringAllowance = jsonObj[i].MonthlyNonTouringAllowance;
            $('#MonthlyNonTouringAllowance').text(nontouringAllowance);

            CNGAllowance = parseInt(jsonObj[i].CNGAllowance);
            $('#CngChargedDays').text(jsonObj[i].TotalCNGDays);

           var TotalCngDays = parseFloat((jsonObj[i].TotalCNGDays == "") ? 0 : jsonObj[i].TotalCNGDays);
            //  $('#CngAllowance').val(jsonObj[i].CNGAllowance);
           $('#CngAllowance').text(jsonObj[i].CNGAllowance);
            //$('#CngAllowance').text(CNGAllowance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));

          // $('#fuelAllowance').val(jsonObj[i].FuelAllowance);
            $('#fuelAllowance').text(jsonObj[i].FuelAllowance);

            ////Reimbursment
            $('#Reimbursment').text(jsonObj[i].ReimbursmentAmount);
            ReimbursmentStatus = jsonObj[i].ReimbursmentStatus
            
            //Reimbursment


            //// if bigcity isnt allow and aditional city allowacne then aditional city allowance plus daily allowance
            //if (isBikeAllowanceAllowed == "1" && isBigCity == "0") {
            //    dailyAllval = parseFloat(jsonObj[i].DailyAllowance) + parseFloat(jsonObj[i].BikeExpense);
            //}
            //    // if bigcity isnt allow and aditional city allowacne then aditional city allowance plus daily allowance
            //else if (isBigCity == "1" && isBikeAllowanceAllowed == "1") {
            //    dailyAllval = parseFloat(jsonObj[i].DailyAllowance)
            //        + parseFloat(jsonObj[i].BikeExpense);
            //}

            
            if (isBigCity == "1") {
                dailyAllval = parseFloat(jsonObj[i].BikeExpense);//parseFloat(jsonObj[i].DailyAllowance)+parseFloat(jsonObj[i].BikeExpense);
                    
            }

            else {
                dailyAllval = 0;//jsonObj[i].DailyAllowance;
            }

            if (isIBA == "1") {
                dailyAllval = dailyAllval + parseFloat(jsonObj[i].DailyInstitutionBaseAllowance);
            }
        
            if (jsonObj[i].MonthlyExpenseTownBased < jsonObj[i].OtherActivites) {
                $('#MonthlyExpenseTownBased').text((jsonObj[i].OtherActivites != "") ? jsonObj[i].OtherActivites : 0);
                if ($('#UserRole').val() == "admin") {
                    $('#MonthlyExpenseTownBased').css('color', 'red');
                    $('#MonthlyExpenseTownBased').addClass('borderClass');
                }

            }
            else {
                $('#MonthlyExpenseTownBased').text((jsonObj[i].MonthlyExpenseTownBased != "") ? jsonObj[i].MonthlyExpenseTownBased : 0);
                $('#MonthlyExpenseTownBased').css('color', 'Black');
                $('#MonthlyExpenseTownBased').css('background', 'white');
            }
            //needs to be change
            $('#CellPhoneBillAmount').text(jsonObj[i].MobileExpense);
            //$('#CellPhoneBillAmount').val('0');
            $('#BikeExpense').text(jsonObj[i].BikeExpense);

            $('#CellPhoneBillAmountCorrection').text(jsonObj[i].MobileExpenseCorrection);
            $('#BikeDeduction').text(jsonObj[i].BikeExpenseDeduction);

            $('#MiscExpense').text(jsonObj[i].MiscExpense);
            $('#MonthlyAllowance_BigCity').text(jsonObj[i].MonthlyAllowance_BigCity);
            $('#ExpenseNote').text(jsonObj[i].ExpenseNote);
            $('#labelStatus')[0].innerHTML = jsonObj[i].ReportStatus;
            if (jsonObj[i].ReportStatus == "Draft" || jsonObj[i].ReportStatus == "Rejected" || jsonObj[i].ReportStatus == "Canceled") {
                $('#labelStatus').addClass("red");
            }
            else if (jsonObj[i].ReportStatus == "Submitted" || jsonObj[i].ReportStatus == "ReSubmitted") {
                $('#labelStatus').addClass("yellow");
            }
            else {
                $('#labelStatus').addClass("green");
            }
            IsEditable = (jsonObj[i].IsEditable == "True");
            /*if (!IsEditable) {
                $('#submit_button').hide();
                $('#saveExpenseReport').hide();
                $i('#ExpenseNote').prop("disabled", "disabled");
            }
            $i('#BikeDeduction').prop("disabled", "disabled");
            $i('#CellPhoneBillAmountCorrection').prop("disabled", "disabled");
            $i('#MiscExpense').prop("disabled", "disabled");*/

        });


    }
}
var getApprovalDetails = function (date) {
    $('#ApprovalLevelHeaders').hide();
    $('#Level5Approval').hide();
    $('#Level5ApprovalAction').attr("disabled", true);
    $('#Level5ApprovalRemarks').attr("disabled", true);
    $('#Level5ApprovalAmount').attr("disabled", true);
    $('#Level5ApprovalDate').attr("disabled", true);
    $('#Level5ApprovalSubmit').hide();

    $('#Level4Approval').hide();
    $('#Level4ApprovalAction').attr("disabled", true);
    $('#Level4ApprovalRemarks').attr("disabled", true);
    $('#Level4ApprovalAmount').attr("disabled", true);
    $('#Level4ApprovalDate').attr("disabled", true);
    $('#Level4ApprovalSubmit').hide();

    $('#Level3Approval').hide();
    $('#Level3ApprovalAction').attr("disabled", true);
    $('#Level3ApprovalRemarks').attr("disabled", true);
    $('#Level3ApprovalAmount').attr("disabled", true);
    $('#Level3ApprovalDate').attr("disabled", true);
    $('#Level3ApprovalSubmit').hide();

    $('#Level2Approval').hide();
    $('#Level2ApprovalAction').attr("disabled", true);
    $('#Level2ApprovalRemarks').attr("disabled", true);
    $('#Level2ApprovalAmount').attr("disabled", true);
    $('#Level2ApprovalDate').attr("disabled", true);
    $('#Level2ApprovalSubmit').hide();

    $.ajax({
        type: "POST",
        url: "EditExpense.asmx/FillExpApprovalDetails",
        contentType: "application/json; charset=utf-8",
        data: '{"EmployeeId":' + EmployeeId + ',"date":"' + date + '"}',
        success: OnsuccessgetApprovalDetails,
        error: onError,
        cache: false,
        async: false,
        beforeSend: startingAjax,
        complete: ajaxCompleted
    });
}
var OnsuccessgetApprovalDetails = function (response) {
    if (response.d != null && response != '') {
        var jsonObj = $.parseJSON(response.d);
        $.each(jsonObj, function (i, tweet) {
            //$('#labelStatus')[0].innerHTML = jsonObj[i].ReportStatus;
            //@EmployeeId as EmployeeId, 
            //@SessionEmployeeId as SessionEmployeeId,
            $('#ApprovalLevelHeaders').show();
            if (jsonObj[i].AMApprovalStatus != "NotRequired") {
                $('#Level5Approval').show();
                $('#Level5ApprovalAction').text(jsonObj[i].AMApprovalStatus);
                $('#Level5ApprovalRemarks').text(jsonObj[i].AMApprovalComment);
                $('#Level5ApprovalAmount').text(jsonObj[i].AMApprovalAmount);
                $('#Level5ApprovalDate').text((jsonObj[i].AMApprovalDate == "") ? "-" : jsonObj[i].AMApprovalDate);

            }
            if (jsonObj[i].SMApprovalStatus != "NotRequired") {
                $('#Level4Approval').show();
                $('#Level4ApprovalAction').text(jsonObj[i].SMApprovalStatus);
                $('#Level4ApprovalRemarks').text(jsonObj[i].SMApprovalComment);
                $('#Level4ApprovalAmount').text(jsonObj[i].SMApprovalAmount);
                $('#Level4ApprovalDate').text((jsonObj[i].SMApprovalDate == "") ? "-" : jsonObj[i].SMApprovalDate);

            }
            if (jsonObj[i].RTLApprovalStatus != "NotRequired") {
                $('#Level3Approval').show();
                $('#Level3ApprovalAction').text(jsonObj[i].RTLApprovalStatus);
                $('#Level3ApprovalRemarks').text(jsonObj[i].RTLApprovalComment);
                $('#Level3ApprovalAmount').text(jsonObj[i].RTLApprovalAmount);
                $('#Level3ApprovalDate').text((jsonObj[i].RTLApprovalDate == "") ? "-" : jsonObj[i].RTLApprovalDate);

            }
            if (jsonObj[i].SFEApprovalStatus != "NotRequired") {
                $('#Level2Approval').show();
                $('#Level2ApprovalAction').text(jsonObj[i].SFEApprovalStatus);
                $('#Level2ApprovalRemarks').text(jsonObj[i].SFEApprovalComment);
                $('#Level2ApprovalAmount').text(jsonObj[i].SFEApprovalAmount);
                $('#Level2ApprovalDate').text((jsonObj[i].SFEApprovalDate == "") ? "-" : jsonObj[i].SFEApprovalDate);

            }

            $('#le5a').text($('#Level5ApprovalAction').text());
            $('#le5rea').text($('#Level5ApprovalRemarks').text());
            $('#le5ama').text($('#Level5ApprovalAmount').text());
            $('#le5daa').text($('#Level5ApprovalDate').text());
            $('#le5b').text($('#Level3ApprovalAction').text());
            $('#le5reb').text($('#Level3ApprovalRemarks').text());
            $('#le5amb').text($('#Level3ApprovalAmount').text());
            $('#le5dab').text($('#Level3ApprovalDate').text());
            $('#le5c').text($('#Level2ApprovalAction').text());
            $('#le5rec').text($('#Level2ApprovalRemarks').text());
            $('#le5amc').text($('#Level2ApprovalAmount').text());
            $('#le5dac').text($('#Level2ApprovalDate').text());

        });

    }
}
function SaveExpenseReport() {
    if (IsEditable) {

        var JsonArrayOfRows = [];
        $('input[type=checkbox]').each(function () {
            if (this.checked) {
                //alert(this.id+' '+this.checked);
                var row = this.id.replace("checkbox", "");

                var visitperid = '#txtvisitbox' + row
                var reasonboxid = '#txtreasonbox' + row
                var daid = '#txtda' + row
                //var institutionAll = '#txtiba' + row
                var nightstayid = '#txtnightstay' + row
                var outbackid = '#txtoutback' + row
                var tdval = '#td' + row
                var flagValue = '#saveupdateRow' + row;
                var flag = $(flagValue)[0].innerHTML;
                var visitperidValue = $(visitperid).val();
                var chckboxid = '#chkcng' + row

                var JsonArrayOfSubRows = [];
                for (var j = 0; j < $('#addcity' + row + " >tr").length; j++) {
                    var val = row + 'o' + (j + 1);
                    var fromvalue = $('#fromcity' + val).val();
                    var tovalue = $('#tocity' + val).val();
                    var textval = $('#txitmilage' + val).val();
                    var JsonObjectOfSubRow = {
                        EEDailyDetailId: (($('#tdcityid' + val)[0].innerHTML == '') ? 0 : $('#tdcityid' + val)[0].innerHTML),
                        //EEDailyId: $(tdval)[0].innerHTML,
                        EEDailyId: (($(tdval)[0].innerHTML == '') ? 0 : $(tdval)[0].innerHTML),
                        fromCity: fromvalue,
                        toCity: tovalue,
                        milageKM: textval,
                        TravelType: $('#self' + val).is(':checked')
                    };
                    //var JsonObjectOfSubRow = '{"EEDailyDetailId":' + $('#tdcityid' + val)[0].innerHTML + 
                    //                            ',"EEDailyId":' + $(tdval)[0].innerHTML + ',"fromCity":"' + fromvalue +
                    //                            '","toCity":"' + tovalue + '","milageKM":"' + textval + 
                    //                            '","TravelType":"' + $('#self' + val).is(':checked') + '"}';
                    //var JsonObjectOfSubRow = "{'EEDailyDetailId':" + $('#tdcityid' + val)[0].innerHTML +
                    //                                                ",'EEDailyId':" + $(tdval)[0].innerHTML + ",'fromCity':'" + fromvalue +
                    //                                                "','toCity':'" + tovalue + "','milageKM':'" + textval +
                    //                                                "','TravelType':'" + $('#self' + val).is(':checked') + "'}";
                    JsonArrayOfSubRows.push(JsonObjectOfSubRow);
                }

                var JsonObjectOfRow = {
                    EEMonthlyId: MonthlyExpenseId,
                    EEDailyId: (($(tdval)[0].innerHTML == '') ? 0 : $(tdval)[0].innerHTML),
                    EEDay: row,
                    VisitPurpose: $(visitperid).val(),
                    TourDayClosing: $(reasonboxid).val(),
                    DailyAllowance: $(daid).val(),
                    NightStay: $(nightstayid).val(),
                    OutBack: $(outbackid).val(),
                    CNGAllowance: ((parseInt(CNGAllowance) > 0) ? (($i(chckboxid).prop('checked')) ? CNGAllowance : "0") : "0"),
                    //InstitutionAllowance: $(institutionAll).val(),
                    DailyDataJson: JsonArrayOfSubRows
                };
                //var JsonObjectOfRow = '{"EEMonthlyId":' + MonthlyExpenseId + ',"EEDailyId":' + (($(tdval)[0].innerHTML == '') ? 0 : $(tdval)[0].innerHTML) + ',"EEDay":' + row +
                //                     ',"VisitPurpose":"' + $(visitperid).val() + '","TourDayClosing":"' + $(reasonboxid).val() +
                //                     '","DailyAllowance":"' + $(daid).val() + '","NightStay":"' + $(nightstayid).val() + '","OutBack":"' + $(outbackid).val() +
                //                     '","CNGAllowance":"' + ((parseInt(CNGAllowance) > 0) ? (($i(chckboxid).prop('checked')) ? CNGAllowance : "0") : "0") +
                //                     '","InstitutionAllowance":"' + $(institutionAll).val() + '","DailyDataJson":"' + JsonArrayOfSubRows + '"}';
                //var JsonObjectOfRow = "{'EEMonthlyId':" + MonthlyExpenseId + ",'EEDailyId':" + (($(tdval)[0].innerHTML == '') ? 0 : $(tdval)[0].innerHTML) + ",'EEDay':" + row +
                //                                     ",'VisitPurpose':'" + $(visitperid).val() + "','TourDayClosing':'" + $(reasonboxid).val() +
                //                                     "','DailyAllowance':'" + $(daid).val() + "','NightStay':'" + $(nightstayid).val() + "','OutBack':'" + $(outbackid).val() +
                //                                     "','CNGAllowance':'" + ((parseInt(CNGAllowance) > 0) ? (($i(chckboxid).prop('checked')) ? CNGAllowance : "0") : "0") +
                //                                     "','InstitutionAllowance':'" + $(institutionAll).val() + "','DailyDataJson':'" + JsonArrayOfSubRows + "'}";

                JsonArrayOfRows.push(JsonObjectOfRow);
            }
        });
        //alert('['+JsonArrayOfRows+']');
        var compdata = JSON.stringify({
            MonthlyId: MonthlyExpenseId,
            MiscExpense: $('#MiscExpense').val(),
            ExpenseNote: $('#ExpenseNote').val(),
            CellPhoneBillAmountCorrection: $('#CellPhoneBillAmountCorrection').val(),
            BikeDeduction: $('#BikeDeduction').val(),
            ExpenseDataJson: JsonArrayOfRows
        });
        $.ajax({
            type: "POST",
            url: "EditExpenseSvc.svc/SaveExpenseReportOverAll",
            contentType: "application/json; charset=utf-8",
            data: compdata,
            //data: JSON.stringify({ Data: compdata }),
            //data: "{'MonthlyId':" + MonthlyExpenseId + ",'MiscExpense':'" + $('#MiscExpense').val() + "','ExpenseNote':'" + $('#ExpenseNote').val() + "','CellPhoneBillAmountCorrection':'" + $('#CellPhoneBillAmountCorrection').val() + "','BikeDeduction':'" + $('#BikeDeduction').val() + "','ExpenseDataJson':" + JSON.stringify(JsonArrayOfRows) + "}",
            success: function () {
                window.location.reload(true);
            },
            error: onError,
            cache: false,
            async: false,
            beforeSend: startingAjax,
            complete: ajaxCompleted
        });
    }
}
function startingAjax() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    //$('#newloader').show();
    //$('#dialog').jqm({ modal: true });
    //$('#dialog').jqm();
    //$('#dialog').jqmShow();
}
function ajaxCompleted() {

    //$('#newloader').hide();
    $('#dialog').jqmHide();
}


function FillCityArray() {
    $.ajax({
        type: "POST",
        url: "EditExpense.asmx/GetCitiesByEmpId",
        contentType: "application/json; charset=utf-8",
        data: '{"EmployeeId":' + EmployeeId + '}',
        dataType: "json",
        success: OnSuccessFillCities,
        error: onError,
        cache: true,
        async: false,
        beforeSend: startingAjax,
        complete: ajaxCompleted
    });
}
var OnSuccessFillCities = function (response) {
    cities = {};
    var jsonObjNew = $.parseJSON(response.d);
    $.each(jsonObjNew, function (i, tweet) {
        //$(fromid).append("<option value='" + jsonObjNew[i].ID + "'>" + jsonObjNew[i].City + "</option>");
        cities[jsonObjNew[i].ID] = jsonObjNew[i].City;
    });
}

function exportTableToExcel(tableID, filename) {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}
function printdiv(printpage) {
    var headstr = "<html><head><title></title><style>" +

"@media print {" +

"@page {      " +
        "size: A4;" +
        "size: landscape;" +
        "margin: 0mm;" +
        "zoom: 0.9;" + /* Old IE only */
        "-moz-transform: scale(0.9);" +
        "-webkit-transform: scale(0.9);" +
        "transform: scale(0.9);" +
"}" +

    "html, body {" +
        "width: 100%;" +
    "}" +
            ".col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6," +
            ".col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {" +
                "float: left;   " +
            "}" +

            ".col-md-12 {" +
                "width: 100%;" +
            "}" +

            ".col-md-11 {" +
               " width: 91.66666666666666%;" +
    "}" +

            ".col-md-10 {" +
                "width: 83.33333333333334%;" +
            "}" +

            ".col-md-9 {" +
                "width: 75%;" +
            "}" +

            ".col-md-8 {" +
                "width: 66.66666666666666%;" +
    "}" +

            ".col-md-7 {" +
                "width: 58.333333333333336%;" +
            "}" +

            ".col-md-6 {" +
    "width: 50%;" +
            "}" +

            ".col-md-5 {" +
                "width: 41.66666666666667%;" +
            "}" +

            ".col-md-4 {" +
                "width: 33.33333333333333%;" +
            "}" +

            ".col-md-3 {" +
                "width: 25%;" +
            "}" +

            ".col-md-2 {" +
                "width: 16.666666666666664%;" +
            "}" +

            ".col-md-1 {" +
                "width: 8.333333333333332%;" +
            "}      }" +
        "#divprintExport{display:none;}" +
        "</style>" +
        //"<link rel='stylesheet' type='text/css' href='css/print.css' media='print'>" +
        //"<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css' media='print' />" +
        "</head><body>";
    var footstr = "</body>";
    var newstr = document.all.item(printpage).innerHTML;
    var oldstr = document.body.innerHTML;
    document.body.innerHTML = headstr + newstr + footstr;
    console.log(jsonObj);
    setTimeout(function () {

        console.log(jsonObj);
        window.print();
        //   window.open('data:application/vnd.ms-excel,' +encodeURIComponent($('#editexpensedata')).html());
        //let file = new Blob([$('#excel').html()], { type: "application/vnd.ms-excel" });
        //let url = URL.createObjectURL(file);
        //let a = $("<a />", {
        //    href: url,
        //  download: "filename.xls"
        //}).appendTo("th").get(0).click();
        //    e.preventDefault();
        document.body.innerHTML = oldstr;
    }, 1000);

    return false;
}

//Talha Work For PDF 
function exportTableTopdf() {
  
    var HTML_Width = $("#divforpdf").width();
    var HTML_Height = $("#divforpdf").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 4) + (top_left_margin * 4);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    $('#btnPDF').hide();
    $('.txtboxx').hide();
    $('#ShowReimbursement1').hide();
    $('#VIEW1').hide();
    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;


    html2canvas($("#divforpdf")[0], { allowTaint: true }).then(function (canvas) {
        canvas.getContext('2d');

        console.log(canvas.height + "  " + canvas.width);


        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);


        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
        }

        pdf.save("Expense_PDF-Document.pdf");
        $('#btnPDF').show();
        $('.txtboxx').show();
        $('#ShowReimbursement1').show();
        $('#VIEW1').show();
    });
};


function printdiv(printpage) {
    $('#btnPrint').hide();
    $('#btnPDF').hide();
    $('.table thead th').css("font-size", "9px");
    $('.table td, .table th').css("font-size", "9.5px");
    $('.table td, .table th').css("padding", "1px");

    $("#btnExcel").remove();
    $("#btnPrint").remove();

    //var img = document.createElement("img");
    //img.style.cssText = 'position:absolute;bottom:2px';

    //img.src = "../assets/img/logo-wilson1.png";
    //var src = document.getElementById("divprintExport");

    //src.appendChild(img);

    var headstr = "<html><head><title></title><style>" +
    "@media print {" +
    "body{" +
        "padding-top: 10px;" +
    "}" +


       ".table>tbody>tr>td.color1" +
    "{" +
       "background-color: yellow !important; " +
       " -webkit-print-color-adjust: exact !important;" +
    "}" +



    "@page {      " +
        "size: A4;" +
        "size: landscape;" +
        "margin: 0mm;" +
        "zoom: 0.9;" + /* Old IE only */
        "-moz-transform: scale(0.9);" +
        "-webkit-transform: scale(0.9);" +
        "transform: scale(0.9);" +
    "}" +

    "html, body {" +
        "width: 100%;" +
    "}" +
    ".col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6," +
    ".col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {" +
        "float: left;   " +
    "}" +

    ".col-md-12 {" +
        "width: 100%;" +
    "}" +

    ".col-md-11 {" +
        " width: 91.66666666666666%;" +
    "}" +

    ".col-md-10 {" +
        "width: 83.33333333333334%;" +
    "}" +

    ".col-md-9 {" +
        "width: 75%;" +
    "}" +

    ".col-md-8 {" +
        "width: 66.66666666666666%;" +
    "}" +

    ".col-md-7 {" +
        "width: 58.333333333333336%;" +
    "}" +

    ".col-md-6 {" +
        "width: 50%;" +
    "}" +

    ".col-md-5 {" +
        "width: 41.66666666666667%;" +
    "}" +

    ".col-md-4 {" +
        "width: 33.33333333333333%;" +
    "}" +

    ".col-md-3 {" +
        "width: 25%;" +
    "}" +

    ".col-md-2 {" +
        "width: 16.666666666666664%;" +
    "}" +

    ".col-md-1 {" +
        "width: 8.333333333333332%;" +
    "}      }" +
    ".fontsize11 {" +
        "font-size: 12px;" +
    "}" +
    ".fontsize10 {" +
        "font-size: 08px;" +
    "}" +
    ".divforprint {" +
        "margin: 10px !important;" +
    "}" +

    ".divflex {" +
        "flex: 0 0 75px;" +
    "}" +

    //"#divprintExport{display:none;}" +
    "</style>" +
    //"<link rel='stylesheet' type='text/css' href='css/print.css' media='print'>" +
    //"<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css' media='print' />" +
    "</head><body>";

    var footstr = "</body>";
    var newstr = document.all.item(printpage).innerHTML;
    var oldstr = document.body.innerHTML;

    document.body.innerHTML = headstr + newstr + footstr;
    setTimeout(function () {

        console.log(jsonObj);
        window.print();

        document.body.innerHTML = oldstr;

        location.reload();
    }, 1000);

    return false;
}
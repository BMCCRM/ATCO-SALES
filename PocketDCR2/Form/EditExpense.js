

var valofcity = 1;
var date = new Date();
var MonthlyExpenseId;
var MonthOfExpense;
var EmployeeId;
var GetSelectedCityId;
var milageval;
var dailyAllval;
var institutionAllowance;
var bigCityval;
var nightStayval;
var outBackval;
var totalfare;
var lengthoftable = 0;
var IsEditable = true;
var IsReady = true;
var ExpenseEmployeeRole = '';
var NonTourAllowanceApplicable = true;
var Misc = 0;
var isCarAllowanceAllowed = '';
var isBikeAllowanceAllowed = '';
var isIBA = '';
var isBigCity = '';
var CNGAllowance = 0;
var nontouringAllowance = 0;
var MgrId = 0;
var AMStatus = '';
var AMIsEditable = '';
var SMStatus = '';
var SMIsEditable = '';
var RTLStatus = '';
var RTLIsEditable = '';
var SFEStatus = '';
var SFEIsEditable = '';
var ReimbursmentStatus;
var dayofReiumst = 0;

var ReimAMStatus = '';
var ReimAMIsEditable = '';
var ReimSMStatus = '';
var ReimSMIsEditable = '';
var ReimRTLStatus = '';
var ReimRTLIsEditable = '';
var ReimSFEStatus = '';
var ReimSFEIsEditable = '';
var ImgFileName = '';
var BaseCityID;
var CityID = [];
var CityName = [];
var cityDistances = {};
var Filedata = [];

var DSMStatsus = '';
var SMStatsus = '';
var HEADStatsus = '';
var ExpenseAdminStatsus = '';
var SPOExpStatus = '';

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
    IsReady = false;
    fillEmpDetails(MonthOfExpense);
    FillCityArray();
    FillDistances();
    fillGrid();
    getApprovalDetails(MonthOfExpense);
    IsReady = true;
    $('#submit_button').click(function () {

        $CheckBoxLength = $("[type='checkbox']:checked.smallboxx").length;
        if ($CheckBoxLength > 0) {
            alert("Kindly Save Expense Report!");
            return false;
        }


        var r = confirm("Are you sure you want to submit the expense report for approval?");
        if (r == true) {
            var ReportStatus = "";
            if ($('#labelStatus')[0].innerHTML == "Draft") {
                ReportStatus = "Submitted";
            }
            else if ($('#labelStatus')[0].innerHTML == "Rejected") {
                ReportStatus = "ReSubmitted";
            }
            else if ($('#labelStatus')[0].innerHTML == "Rejected") {
                ReportStatus = "ReSubmitted";
            }

            $.ajax({
                type: "POST",
                url: "EditExpense.asmx/SetExpenseReportStatus",
                data: "{'EmployeeId':" + EmployeeId + ",'EmployeeExpenseMonthlyId':'" + MonthlyExpenseId + "','IsEditable':" + 0 + ",'ReportStatus':'" + ReportStatus + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    alert("Expense Report has been " + ReportStatus + " Successfully");
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
      
        debugger;
        var r = confirm("Are you sure you want to submit ?");
        if($('#Level5ApprovalAction option:selected').val() == '-1')
        {

            r=false;
            alert('Please Select DSM Status');
        }
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
        if ($('#Level4ApprovalAction option:selected').val() == '-1')
        {
            r = false;
            alert('Please Select SM Status');
        }

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
        if ($('#Level3ApprovalAction option:selected').text() == '-1') {
            r = false;
            alert('Please Select Head Status');
        }   
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
        debugger;
        var r = confirm("Are you sure you want to submit ?");
        if ($('#Level2ApprovalAction option:selected').text() == '-1') {
            r = false;
            alert('Please Select Expense Admin Status');
        }
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

    // Reimbursement 
    $('#Level5ReimbursApprovalSubmit').click(function () {
       
        var r = confirm("Are you sure you want to submit ?");
        if (r == true) {
            $.ajax({
                type: "POST",
                url: "MonthlyExpenseReport.asmx/SetExpenseReimbursmentApproval",
                data: "{'EmployeeId':" + EmployeeId + ",'EmployeeExpenseMonthlyId':'" + MonthlyExpenseId + "','LevelName':'rl5','ApprovalStatus':'" + $('#Level5ApprovalAction').val() + "','ApprovalAmount':'" + $('#Level5ApprovalAmount').val() + "','ApprovalComment':'" + $('#Level5ApprovalRemarks').val() + "','AMApprovalStatus':'" + AMStatus + "','SMApprovalStatus':'" + SMStatus + "','RTLApprovalStatus':'" + RTLStatus + "','SFEApprovalStatus':'" + SFEStatus + "','Row':'Single'}",
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
    $('#Level4ReimbursApprovalSubmit').click(function () {
        var r = confirm("Are you sure you want to submit ?");
        if (r == true) {
            $.ajax({
                type: "POST",
                url: "MonthlyExpenseReport.asmx/SetExpenseReimbursmentApproval",
                data: "{'EmployeeId':" + EmployeeId + ",'EmployeeExpenseMonthlyId':'" + MonthlyExpenseId + "','LevelName':'rl4','ApprovalStatus':'" + $('#Level4ApprovalAction').val() + "','ApprovalAmount':'" + $('#Level4ApprovalAmount').val() + "','ApprovalComment':'" + $('#Level4ApprovalRemarks').val() + "','AMApprovalStatus':'" + AMStatus + "','SMApprovalStatus':'" + SMStatus + "','RTLApprovalStatus':'" + RTLStatus + "','SFEApprovalStatus':'" + SFEStatus + "','Row':'Single'}",
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
    $('#Level3ReimbursApprovalSubmit').click(function () {
        var r = confirm("Are you sure you want to submit ?");
        if (r == true) {
            $.ajax({
                type: "POST",
                url: "MonthlyExpenseReport.asmx/SetExpenseReimbursmentApproval",
                data: "{'EmployeeId':" + EmployeeId + ",'EmployeeExpenseMonthlyId':'" + MonthlyExpenseId + "','LevelName':'rl3','ApprovalStatus':'" + $('#Level3ApprovalAction').val() + "','ApprovalAmount':'" + $('#Level3ApprovalAmount').val() + "','ApprovalComment':'" + $('#Level3ApprovalRemarks').val() + "','AMApprovalStatus':'" + AMStatus + "','SMApprovalStatus':'" + SMStatus + "','RTLApprovalStatus':'" + RTLStatus + "','SFEApprovalStatus':'" + SFEStatus + "','Row':'Single'}",
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
    $('#Level2ReimbursApprovalSubmit').click(function () {
        var r = confirm("Are you sure you want to submit ?");
        if (r == true) {
            $.ajax({
                type: "POST",
                url: "MonthlyExpenseReport.asmx/SetExpenseReimbursmentApproval",
                data: "{'EmployeeId':" + EmployeeId + ",'EmployeeExpenseMonthlyId':'" + MonthlyExpenseId + "','LevelName':'admin','ApprovalStatus':'" + $('#Level2ApprovalAction').val() + "','ApprovalAmount':'" + $('#Level2ApprovalAmount').val() + "','ApprovalComment':'" + $('#Level2ApprovalRemarks').val() + "','AMApprovalStatus':'" + AMStatus + "','SMApprovalStatus':'" + SMStatus + "','RTLApprovalStatus':'" + RTLStatus + "','SFEApprovalStatus':'" + SFEStatus + "','Row':'Single'}",
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


    DisabledField();
    //if ($('#UserRole').val() == "rl6") {
    //    //   $('#editexpensedata  input[type=text]').attr("disabled", true);
    //    $('#editexpensedata select').attr("disabled", true);
    //    $('#editexpensedata input[type=checkbox]').attr("disabled", true);
    //    $('#ExpenseNote').attr('disabled', true);
    //    $('.HideField').hide();
    //    $('#editexpensedata  select').attr('disabled', true);
    //    $('#saveExpenseReport').hide();
    //    $('.hideforSPO').hide();
    //    $('.hideaddcity').hide();
    //}


    //fixing of only number value allowed stopping an option for copy paste cut and drop
    $('#MiscExpense').bind("cut copy paste drop", function (e) {
        e.preventDefault();
    });
    HighlightTextBoxColor();


    // Add below Code for Expense Table header Alignment //
    const thElements = document.getElementsByTagName('th'),
             tdElements = document.getElementsByTagName('td');

    for (let i = 0; i < thElements.length; i++) {
        const widerElement = thElements[i].offsetWidth > tdElements[i].offsetWidth ? thElements[i] : tdElements[i],
              width = window.getComputedStyle(widerElement).width;

        thElements[i].style.width = tdElements[i].style.width = width;
    }

});
 



function DisabledField() {
    DSMStatsus = $('#Level5ApprovalAction').val();
    SMStatsus = $('#Level4ApprovalAction').val();
    HEADStatsus = $('#Level3ApprovalAction').val();
    ExpenseAdminStatsus = $('#Level2ApprovalAction').val();
    SPOExpStatus = $('#labelStatus').text();
    if (ExpenseEmployeeRole == "rl6") {
        //   $('#editexpensedata  input[type=text]').attr("disabled", true);
        $('#editexpensedata select').attr("disabled", true);

        $('#editexpensedata input[type=checkbox]').attr("disabled", true);
        $('#ExpenseNote').attr('disabled', true);
        $('.HideField').hide();
        $('#editexpensedata  select').attr('disabled', true);
        $('#saveExpenseReport').hide();
        $('.hideforSPO').hide();
        $('.hideaddcity').hide();
    }

    if ($('#UserRole').val() == "rl5")
    {
        if (DSMStatsus == 'Approved')
        {
            $('.DSMDEDUCT').attr('disabled', true);
        }
        else if (SPOExpStatus == 'Draft')
        {
            $('.DSMDEDUCT').attr('disabled', true);
        }
        else
        {
            $('.DSMDEDUCT').attr('disabled', false);
        }
        $('.dailybutton').hide();
        $('.hideforSPO').show();
    }
    if ($('#UserRole').val() == "rl4")
    {
        if (SMStatsus == 'Approved')
        {
            $('.SMDEDUCT').attr('disabled', true);
        }
        else if (DSMStatsus != 'Approved') {
            $('.SMDEDUCT').attr('disabled', true);
        }

        else
        {
            $('.SMDEDUCT').attr('disabled', false);
            $('#Level4ApprovalAction').attr('disabled', false);
        }
        $('.dailybutton').hide();
        $('.hideforSPO').show();
    }
    if ($('#UserRole').val() == "rl3")
    {
        if (HEADStatsus == 'Approved')
        {
            $('.BUHDEDUCT').attr('disabled', true);
        }
        else if (SMStatsus != 'Approved')
        {
            $('.BUHDEDUCT').attr('disabled', true);
        }
        else
        {
            $('.BUHDEDUCT').attr('disabled', false);
            $('#Level3ApprovalAction').attr('disabled', false);
        }
        
        $('.dailybutton').hide();
        $('.hideforSPO').show();
    }


}
$(function () {

    createSticky($("#header"));

});

function createSticky(sticky) {

    if (typeof sticky !== "undefined") {

        var pos = sticky.offset().top + 20,
				win = $i(window);

        win.on("scroll", function () {

            win.scrollTop() >= pos ? sticky.addClass("fixed") : sticky.removeClass("fixed");
            //  sticky.addClass("fixed");
        });
    }
}
function HighlightTextBoxColor() {
    if ($('#UserRole').val() === 'rl3') {
        if ($('#GrandTotal').val() != $('#Level5ApprovalAmount').val() && $('#Level5ApprovalAmount').val() != "") {


            $('#Level5ApprovalAmount').css('color', 'red');
            $('#Level5ApprovalAmount').css('background', 'yellow');

        }
        else {

        }
    }
    if ($('#UserRole').val() === 'admin') {
        if ($('#GrandTotal').val() != $('#Level3ApprovalAmount') && $('#Level3ApprovalAmount').val() != "") {

            $('#Level3ApprovalAmount').css('color', 'red');
            $('#Level3ApprovalAmount').css('background', 'yellow');
        }
        if ($('#GrandTotal').val() != $('#Level5ApprovalAmount') && $('#Level5ApprovalAmount').val() != "") {

            $('#Level5ApprovalAmount').css('color', 'red');
            $('#Level5ApprovalAmount').css('background', 'yellow');
        }
    }

}
function grandTotal() {

    var grandtotal = 0
    for (var i = 0; i < lengthoftable; i++) {
        //if (getDay((i + 1), MonthOfExpense.split('-')[1], MonthOfExpense.split('-')[2]) != 'Sunday') {
        var totalid = '#txttotal' + (i + 1)
        grandtotal = grandtotal + parseFloat($(totalid).val());
        //}
    }
    //grandtotal = grandtotal + (parseFloat(($('#CellPhoneBillAmount').val() == '') ? 0 : $('#CellPhoneBillAmount').val()) - parseFloat(($('#CellPhoneBillAmountCorrection').val() == '') ? 0 : $('#CellPhoneBillAmountCorrection').val()));
    grandtotal = grandtotal + (parseFloat(($('#CellPhoneBillAmount').val() == '') ? 0 : $('#CellPhoneBillAmount').val()));
    grandtotal = grandtotal + parseFloat(($('#MonthlyExpenseTownBased').val() == '') ? 0 : $('#MonthlyExpenseTownBased').val());
    // grandtotal = grandtotal + parseFloat(($('#MonthlyAllownace_BigCity').val() == '') ? 0 : $('#MonthlyAllownace_BigCity').val());
    grandtotal = grandtotal + (parseFloat(($('#BikeExpense').val() == '') ? 0 : $('#BikeExpense').val())); //- parseFloat(($('#BikeDeduction').val() == '') ? 0 : $('#BikeDeduction').val()));
    grandtotal = grandtotal + parseFloat(($('#MiscExpense').val() == '') ? 0 : $('#MiscExpense').val());
    grandtotal = grandtotal + (parseFloat(($('#CngAllowance').val() == '') ? 0 : $('#CngAllowance').val()));
    grandtotal = grandtotal + (parseFloat(($('#fuelAllowance').val() == '') ? 0 : $('#fuelAllowance').val()));

    //grandtotal = grandtotal + parseFloat(($('#CngAllowance').val() == '') ? 0 : $('#CngAllowance').val());
    if (NonTourAllowanceApplicable)
        grandtotal = grandtotal + parseFloat(($('#MonthlyNonTouringAllowance').val() == '') ? 0 : $('#MonthlyNonTouringAllowance').val());

    // Fix For Thousands Seperator --RANA;
    //.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //$('#GrandTotal').val()

    //if (ReimbursmentStatus == "Approved") {
    //    $('#Reimbursment').css('border-color', '#27d127de');
    //    var reimburse = parseFloat($('#Reimbursment').val());
    //    grandtotal = grandtotal + reimburse

    //}
    //else {
    //    $('#Reimbursment').css('border-color', 'red');
    //}


    $('#Reimbursment').css('border-color', '#27d127de');
    var reimburse = parseFloat($('#Reimbursment').val());
    //grandtotal = grandtotal + reimburse;


    $('#GrandTotal').val(grandtotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));

}
var ForminValue = 0;


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

        var dayofReiumst = '#hdnReimb_' + (i + 1);


        milagetotal = milagetotal + parseFloat($(milageid).val());
        faretotal = faretotal + parseFloat($(fareid).val());
        datotal = datotal + parseInt($(daid).val());
        reimTal = reimTal + parseInt($(retot).val());
        ibatotal = ibatotal + parseInt($(ibaid).val());
        nightStaytotal = nightStaytotal + parseInt($(nightStayid).val());
        outBacktotal = outBacktotal + parseInt($(outBackid).val());
        DSMDeducttotal = DSMDeducttotal + parseFloat($(DSMDeductid).val());
        SMDeducttotal = SMDeducttotal + parseFloat($(SMDeductid).val());
        BUHDeducttotal = BUHDeducttotal + parseFloat($(BUHDeductid).val());
        //    subTotal = parseFloat($(dayofReiumst).val()) + subTotal + parseFloat($(subtotalid).val());
        subTotal = subTotal + parseFloat($(subtotalid).val());

        // bigCitytotal = bigCitytotal + parseInt($(bigCityid).val());
        total = total + parseFloat($(totalid).val());
        misctotal = misctotal + parseFloat($(misctotalid).val());
        // -- Total NighStay/Outback --
        if ($(nightStayid).val() != 0) {
            TotalNightStay = TotalNightStay + 1;
        }
        if ($(outBackid).val() != 0) {
            TotalOutBack = TotalOutBack + 1;
        }
        // -- Total NighStay/Outback --
        // }



    }
    $(milageFinalId).val((milagetotal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $(fareFinalId).val((faretotal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $(daFinalId).val((datotal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $(reimRowTotal).val((reimTal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $(ibaFinalId).val(ibatotal);
    $(nightStayFinalId).val((nightStaytotal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $(outBackFinalId).val((outBacktotal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    // $(bigCityFinalId).val(bigCitytotal);
    $(totalDSMDeductFinal).val((DSMDeducttotal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $(totalSMDeductFinal).val((SMDeducttotal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $(totalBUHDeductFinal).val((BUHDeducttotal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));



    $(subtotalFinalId).val(subTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));



    $(totalFinalId).val(total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $('#Totalnightstayfinal').text("Total NightStay: " + TotalNightStay);
    $('#Totaloutbackfinal').text("Total Outback: " + TotalOutBack);
    //$(miscFinalId).val(misctotal.toFixed(2));
    $(miscFinalId).val((misctotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")));




    if (misctotal.toFixed(2) == 0) {
        $('#MonthlyExpenseTownBased').val(Misc);
    }
    else if (misctotal.toFixed(2) >= 500) {
        $('#MonthlyExpenseTownBased').val(500);
    }
    else {
        $('#MonthlyExpenseTownBased').val(misctotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }

}

function getallexpensepolicy(dailyid, row, totalMilage) {
    var milage = '#txtmileage' + row;
    var txtid = '#txtfare' + row;
    // var dailyAll = '#txtda' + row
    var institutionAll = '#txtiba' + row
    $(txtid).val('0');
    var farevalue = parseFloat(totalMilage) * parseFloat((milageval == '') ? 0 : milageval)
    $(txtid).val(farevalue.toFixed(2));
    $(milage).val(totalMilage);

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
        expensebody += '<tr>'
        + '<td id="td' + (i + 1) + '" style="display: none;">' + jsonObj[i].ID1 + '</td> '
        + '<td><input id="checkbox' + (i + 1) + '" type="checkbox" class="smallboxx"></td> '
        + '<td>' + (i + 1) + '</td> '
        + '<td>' + getDay((i + 1), MonthOfExpense.split('-')[1], MonthOfExpense.split('-')[2]) + '</td> '
        + '<td> <input type="text"  disabled id="txtmileage' + (i + 1) + '" class="col-md-12 margin" value="0"/></td> '
        + '<td> <input type="text"  disabled id="txtfare' + (i + 1) + '"class="col-md-12 margin" value="0" /> </td> '
        + '<td> <input type="text"  disabled id="txtnightstay' + (i + 1) + '" class="col-md-12 margin" value="0" /> </td> '
        + '<td> <input type="text"  disabled id="txtoutback' + (i + 1) + '" class="col-md-12 margin" value="0" /> </td> '
        + '<td> <input type="text"  disabled id="txtda' + (i + 1) + '" class="col-md-12 margin" value="0"/> </td> '
        + '<td> <input type="text"  disabled id="txtreim' + (i + 1) + '" class="col-md-12 margin" value="0"/> </td> ' //reim colum values
        + '<td> <input type="text"  disabled id="txtSubTotal' + (i + 1) + '" class="col-md-12 margin" value="0"/> <input id="hdnReimb_' + (i + 1) + '" type="hidden"  value="0"/> </td> '


        + '<td> <input type="text" title="' + ((jsonObj[i].DsmComments == "0") ? "" : jsonObj[i].DsmComments) + '"  onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46 || event.charCode == 0" onkeyup="maketotal(' + (i + 1) + ')"  disabled id="txtDSMDeduct' + (i + 1) + '" class="DSMDEDUCT col-md-12 margin" value="0" /> </td> '
        + '<td> <input type="text"  title="' + ((jsonObj[i].SMComments == "0") ? "" : jsonObj[i].SMComments) + '" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 " onkeyup="maketotal(' + (i + 1) + ')" disabled id="txtSMDeduct' + (i + 1) + '" class="SMDEDUCT col-md-12 margin" value="0" /> </td> '
        + '<td> <input type="text"  title="' + ((jsonObj[i].NsmComments == "0") ? "" : jsonObj[i].NsmComments) + '" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 " onkeyup="maketotal(' + (i + 1) + ')" disabled id="txtBUHDeduct' + (i + 1) + '" class="BUHDEDUCT col-md-12 margin" value="0" /> </td> '

        + '<td> <input type="text"  disabled id="txttotal' + (i + 1) + '" class="col-md-12 margin" value="0" /> </td> '
        + '<td> <input type="text"  disabled id="Misc' + (i + 1) + '" class="col-md-12 margin" value="0"/> </td> '
        //+ '<td></td>'
        + '<td  style="display:' + (($('#UserRole').val() == "rl6" || jsonObj[i].ID1 == "") ? "none" : "block") + '"> <a class="txtboxx" id="saveupdateRow' + (i + 1) + '" onClick="UpdateDeductionByManagerWithComments(' + (i + 1) + ')" style="display: block;text-align: center;">' + ((jsonObj[i].ID1 == "") ? "Save" : "Update") + '</a> </td> '

        + '<td style="display: block">' 
        //+ (($('#labelStatus').text() != 'Submitted' && $('#labelStatus').text() != 'ReSubmitted' && $('#labelStatus').text() != 'Approved') ? ((jsonObj[i].VisitPurpose != 7) ? "<a class='txtboxx dailybutton' id='SaveOtherActivities" + (i + 1) + "' onClick='SaveOtherActivities(\"" + moment(jsonObj[i].ExpenseDay).format('MM-DD-YYYY') + "\"," + jsonObj[i].ID1 + "," + (i + 1) + ")' style='display: block;text-align: center; cursor: pointer;'>" + ((jsonObj[i].ID1 != "") ? "Attached" : "Save") + "</a>" : "") : "")
        + (($('#labelStatus').text() != 'Submitted' && $('#labelStatus').text() != 'ReSubmitted' && $('#labelStatus').text() != 'Approved') ? ((jsonObj[i].VisitPurpose != 7) ? "<a class='txtboxx dailybutton' data-target='#twoModalsExample' id='ShowReimbursement" + (i + 1) + "' onClick='ShowReimbursement(\"" + moment(jsonObj[i].MonthDay).format('MM-DD-YYYY') + "\"," + jsonObj[i].ID1 + "," + (i + 1) + ")' style='display: block;text-align: center; cursor: pointer;'>" + ((jsonObj[i].ID1 != "") ? "Reimbursement" : "Save") + "</a>" : "") : "")
        + '<a class="txtboxx" id="VIEW' + (i + 1) + '"  onClick="attach(' + ((jsonObj[i].ID1 == "") ? 0 : jsonObj[i].ID1) + ');" style="display: block;text-align: center; cursor: pointer;">' + "View" + '</a>'
        //+ '<a class="txtboxx" id="Reimbursement' + (i + 1) + '" onClick="ShowReimbursement(' + ((jsonObj[i].ID1 == "") ? 0 : jsonObj[i].ID1) + ',' + (i + 1) + ');" style="display:' + ((ReimbursmentStatus != 'Draft' && ReimbursmentStatus != 'Rejected' && jsonObj[i].ReimBurseDay == "" && $('#UserRole').val() != "rl6") ? "none" : "block") + ';text-align: center; cursor: pointer;">Reimbursement</a> </td> '
        + '</td> '
        + '<td style="display: none"> <img id ="img' + (i + 1) + '" alt="Click to Expand" src="../Images/plus.png" width="25px" height="25px"/></td> '
        + '</tr><tr><td colspan="14">'
        + '<table style="margin-bottom:0px;"  class="table table-hover table-striped"><tbody id ="addcity' + (i + 1) + '"></tbody></table>'
        + '<a style="display: inline-block; text-align: center;width: 50%;cursor: pointer;" class="txtboxx hideaddcity" onClick="addcity(' + (i + 1) + ',\'Save\',\'\',true)">Add City</a>'
        + '<div style="display: inline-block; text-align: center;width: 60%;">Number Of Calls : ' + jsonObj[i].NoOfVisit + ' &nbsp&nbsp&nbsp&nbsp&nbsp Number Of InRange Calls : ' + jsonObj[i].NoOfInRange + ' &nbsp&nbsp&nbsp&nbsp&nbsp  Number of OutRange Calls : ' + jsonObj[i].NoOfOutRange + ' &nbsp&nbsp&nbsp&nbsp&nbsp Number of Meeting : ' + jsonObj[i].NoOfMeetingVisit + '</div>'
        + '</td></tr>';


    }

    expensebody += '<tr id="totrow">'
    + '<td style="display: none;"></td> '
    + '<td></td> '
    + '<td></td> '
    + '<td>Total</td> '
    + '<td> <input type="text"  disabled id="txtmileagefinal" class="col-md-12 margin" value="0"/></td> '
    + '<td> <input type="text"  disabled id="txtfarefinal"class="col-md-12 margin" value="0" /> </td> '
    + '<td> <input type="text"  disabled id="txtnightstayfinal" class="col-md-12 margin" value="0" /><label type="text"  disabled id="Totalnightstayfinal" class="col-md-12 margin" value="0" >night</label> </td> '
    + '<td> <input type="text"  disabled id="txtoutbackfinal" class="col-md-12 margin" value="0" />  <label type="text"  disabled id="Totaloutbackfinal" class="col-md-12 margin" value="0" >outback</label> </td> '
    + '<td> <input type="text"  disabled id="txtdafinal" class="col-md-12 margin" value="0"/> </td> '
    + '<td> <input type="text"  disabled id="txtReimTotal" class="col-md-12 margin" value="0"/> </td> ' //Reim column total
    + '<td> <input type="text"  disabled id="txtSTfinal" class="col-md-12 margin" value="0"/> </td> '
    + '<td> <input type="text"  disabled id="txtDSMDeductFinal" class="col-md-12 margin" value="0" /> </td> '
    + '<td> <input type="text"  disabled id="txtSMDeductFinal" class="col-md-12 margin" value="0" /> </td> '
    + '<td> <input type="text"  disabled id="txtBUHDeductFinal" class="col-md-12 margin" value="0" /> </td> '
    + '<td> <input type="text"  disabled id="txttotalfinal" class="col-md-12 margin" value="0" /> </td> '
    + '<td> <input type="text"  disabled id="txtMiscfinal" class="col-md-12 margin" value="0" /> </td> '
    + '</tr>';
    //end

    $('#editexpensedata').empty();

    $('#editexpensedata').append('<table class="table table-hover table-expandable table-striped">'
    + '<thead> <tr id="header">'

    + '<th style="display: none;"></th>'
    + '<th style="width: 0px;">Action</th>'
    + '<th>Date</th>'
    + '<th>Day</th>'
    + '<th>Mileage Km </th>'
    + '<th>Fare </th>'
    + '<th>Night Stay</th>'
    + '<th>Out Back </th>'
    + '<th>Daily Allowance</th>'
    + '<th>Reimbursement</th>' //Reim colum
    + '<th>Sub Total</th>'
    + '<th>DSM Deduction</th>'
    + '<th>SM Deduction</th>'
    + '<th>BUH Deduction</th>'
    + '<th>Grand Total</th>'
    + '<th>Misc. Allowance</th>'
    + '<th style="display:none">Action</th>'
    + '<th></th>'

    + '</tr></thead>'


    + '<tbody id="expensemonthly">' + expensebody + '</tbody></table>');



    for (var i = 0; i < jsonObj.length ; i++) {

        //****Comment By Rahim ****//
        //// if (getDay((i + 1), MonthOfExpense.split('-')[1], MonthOfExpense.split('-')[2]) != 'Sunday') {
        //$('#txtvisitbox' + (i + 1)).val(((jsonObj[i].VisitPurpose == "") ? "-1" : jsonObj[i].VisitPurpose));
        //$('#txtreasonbox' + (i + 1)).val(((jsonObj[i].TourDayClosing == "") ? "-1" : jsonObj[i].TourDayClosing));
        ////$('#txtda' + (i + 1)).val(((jsonObj[i].DailyAllowance == "") ? "0" : dailyAllval));        
        //// $('#txtiba' + (i + 1)).val(((jsonObj[i].DailyAllowance == "") ? "0" : jsonObj[i].DailyAllowance));
        //$('#txtnightstay' + (i + 1)).val(((jsonObj[i].NightStay == "") ? "0" : jsonObj[i].NightStay));
        //****Comment By Rahim ****//


        $('#txtvisitbox' + (i + 1)).val(((jsonObj[i].VisitPurpose == "") ? "-1" : jsonObj[i].VisitPurpose));
        $('#txtreasonbox' + (i + 1)).val(((jsonObj[i].TourDayClosing == "") ? "-1" : jsonObj[i].TourDayClosing));
        $('#txtda' + (i + 1)).val(((jsonObj[i].DailyAllowance == "") ? "0" : (parseInt(jsonObj[i].DailyAllowance) + ((jsonObj[i].ID1 == "") || (jsonObj[i].ID == null) ? 0 : dailyAllval))));
        $('#txtreim' + (i + 1)).val(jsonObj[i].ReimAmount); //Reim Amount in column
        $('#txtnightstay' + (i + 1)).val(jsonObj[i].NightStay);

        //hightlight nightstay textbox
        if (jsonObj[i].NightStay == "" || jsonObj[i].NightStay == "0") {
            $('#txtnightstay' + (i + 1)).removeClass("focused");
        }
        else {

            $('#txtnightstay' + (i + 1)).addClass("focused");
        }

        //****Comment By Rahim ****//
        //$('#txtoutback' + (i + 1)).val(((jsonObj[i].OutBack == "") ? "0" : jsonObj[i].OutBack));
        //$('#Misc' + (i + 1)).val(((jsonObj[i].Amount == "") ? "0" : jsonObj[i].Amount));
        ////Manager Deduction Column 12/12/2019
        //$('#txtDSMDeduct' + (i + 1)).val(((jsonObj[i].DsmDeductAmount == "") ? "0" : jsonObj[i].DsmDeductAmount));
        //$('#txtSMDeduct' + (i + 1)).val(((jsonObj[i].SMDeductAmount == "") ? "0" : jsonObj[i].SMDeductAmount));
        //$('#txtBUHDeduct' + (i + 1)).val(((jsonObj[i].NsmDeductAmount == "") ? "0" : jsonObj[i].NsmDeductAmount));
        //****Comment By Rahim ****//

        $('#txtoutback' + (i + 1)).val(jsonObj[i].OutBack);
        $('#Misc' + (i + 1)).val(jsonObj[i].Amount);
        //Manager Deduction Column 12/12/2019
        $('#txtDSMDeduct' + (i + 1)).val(jsonObj[i].DsmDeductAmount);
        $('#txtSMDeduct' + (i + 1)).val(jsonObj[i].SMDeductAmount);
        $('#txtBUHDeduct' + (i + 1)).val(jsonObj[i].NsmDeductAmount);
        //Reim Amounts day
        $('#hdnReimb_' + (i + 1)).val(jsonObj[i].ReimAmount);



        $i('#txtDSMDeduct' + (i + 1)).popover();
        $i('#txtSMDeduct' + (i + 1)).popover();
        $i('#txtBUHDeduct' + (i + 1)).popover();
        if (jsonObj[i].ID1 != '') {
            getallexpensepolicy(jsonObj[i].ID1, (i + 1), jsonObj[i].TotalMilageKm);
        }
        /*else {
        getallexpensepolicy('0', (i + 1));
        }*/
        /*if (jsonObj[i].CNGExpense != '' && jsonObj[i].CNGExpense != '0') {
        $i('#chkcng' + (i + 1)).prop("checked", true);
        }*/
        visitboxchange('#txtvisitbox' + (i + 1), (i + 1), false);
        reasonboxchange('#txtreasonbox' + (i + 1), (i + 1), false);
        //  }
        if (jsonObj[i].ID1 == '') {
            //jsonObj[i].ID1
            //$('#SaveOtherActivities' + (i + 1)).hide();
            $('#VIEW' + (i + 1)).hide();
            $('#ShowReimbursement' + (i + 1)).hide();
        }

        if (jsonObj[i].NoOfVisit=="0" ){

            $('#ShowReimbursement' + (i + 1)).hide();
        }
        if (jsonObj[i].NoOfMeetingVisit != 0 ){

            $('#ShowReimbursement' + (i + 1)).show();
        }
        //Day ReimAmount
        //    dayofReiumst = jsonObj[i].ReimAmount;


        //   console.log(dayofReiumst);


    }

    $('.txtboxx, .smallboxx').click(function (event) {
        event.stopPropagation();
    });
    $('.table-expandable').each(function () {
        var table = $(this);
        table.children('thead').children('tr').append('<th></th>');
        table.children('tbody').children('tr').filter(':odd').hide();
        table.children('tbody').children('tr').filter(':even').click(function () {
            try {
                var element = $(this);
                element.next('tr').toggle('slow');
                element.find(".table-expandable-arrow").toggleClass("up");
                var nodeValue = element[0].childNodes[4].innerHTML;
                if (nodeValue != "Total") {
                    var nodeID = $('#td' + nodeValue)[0].innerHTML;
                    if (element.find(".table-expandable-arrow")[0].className == "table-expandable-arrow up") {
                        $('#addcity' + nodeValue).empty();
                        //alert(nodeID);
                        if (nodeID != "" && nodeID != "0") {
                            // alert(nodeID);

                            filldailyActivities(nodeValue, nodeID, MonthlyExpenseId);
                        }
                        else {
                            addcity(nodeValue, "Save", '', false);
                            var fromcity = '#fromcity' + nodeValue + 'o1';
                            $(fromcity).val(BaseCityID);
                        }

                        $('#img' + nodeValue).attr('src', '../Images/collapse.png');
                        $('#img' + nodeValue).attr('alt', 'Click to Collapse');
                        //alert("show" + element[0].childNodes[2].innerText);
                        DisabledField();
                    }
                    else {
                        $('#img' + nodeValue).attr('src', '../Images/expand.png');
                        $('#img' + nodeValue).attr('alt', 'Click to Expand');
                        DisabledField();
                        //$('#addcity' + nodeValue).empty();
                        //alert("hide" + element[0].childNodes[2].innerText);
                    }
                }

            }
            catch (Exception) {
                //alert(Exception);
            }
        });
        table.children('tbody').children('tr').filter(':even').each(function () {
            var element = $(this);
            element.append('<div class="table-expandable-arrow" style="display:none"></div>');
        });
        table.children('tbody').children('tr').filter(':even').trigger('click');
    });
    rowTotal();
    grandTotal();
    DisabledField();
    // Forces Clicks For Daily Expense Data
    //Uncomment It!
    //$('.table-expandable').each(function () {
    //    var table = $(this);
    //    table.children('tbody').children('tr').filter(':even').trigger('click');
    //});
    $('.HideField').hide();
    if ($('#UserRole').val() == "rl6") {
        //   $('#editexpensedata  input[type=text]').attr("disabled", true);
        $('#editexpensedata select').attr("disabled", true);
        $('#editexpensedata input[type=checkbox]').attr("disabled", true);
        $('#ExpenseNote').attr('disabled', true);

        $('.HideField').hide();
        $('#editexpensedata  select').attr('disabled', true);
        $('#saveExpenseReport').hide();
        $('.hideforSPO').hide();
        $('.hideaddcity').hide();
    }

    $('#dialog').jqmHide();
}

var visitboxchange = function (visitboxid, row, flag) {

    var val = $(visitboxid).val();
    var milage = '#txtmileage' + row;
    var txtid = '#txtfare' + row;
    var dailyAll = '#txtda' + row
    var institutionAll = '#txtiba' + row
    var bigcity = '#txtbigcity' + row
    var reasonBox = '#txtreasonbox' + row;
    var dropdown = '#txtvisitbox' + row;
    var addCityTable = '#addcity' + row;
    var txtiba = "#txtiba" + row;

    if (flag) {
        var checkbox = '#checkbox' + row
        $i(checkbox).prop("checked", true);
    }

    if (val != '-1') {

        // If Value 5 (Leave) Selected
        if (val == '5' || val == '14') {

            // var aa = $(visitboxid).parent().next().prop("type");
            //alert($(visitboxid).parent().next().prop('type'));
            //if (confirm('Are you sure you select Leave?')) {

            //  $(dailyAll).val('0');
            $(bigcity).val('0');
            $(institutionAll).val('0');
            $(txtid).val('0');
            $(milage).val('0');


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
            if (CityID.length > 1) {
                $i(reasonBox).prop('disabled', false);
            }
            $(addCityTable).empty();
            $(txtid).val('0');
            $(milage).val('0');
        }
        else {

            //$("#appendCity" + row).prop('disabled', false);
            //$(milage).val('0');
            //$(milage).val(milageval);
            // isIBA = jsonObj[i].isIBA;
            //isBigCity = jsonObj[i].isBigCity;

            if (CityID.length > 1) {
                $i(reasonBox).prop('disabled', false);
            }
            //$(dailyAll).val('0');
            $(bigcity).val('0');
            $(institutionAll).val('0');

            //  $(dailyAll).val(dailyAllval);

            if (isBigCity == "1")
                // $(bigcity).val(bigCityval);
                if (isIBA == "1")
                    $(institutionAll).val(institutionAllowance);

        }
    }

    else {
        //$(milage).val('0');
        // $(dailyAll).val('0');
        $(bigcity).val('0');
        $(institutionAll).val('0');

    }
    maketotal(row);
    rowTotal();
    grandTotal();
}

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

                jsonObj = $.parseJSON(response.d);
                //if (dailyid == 0) {
                //expenseDetailNew = jsonObj;
                //}

                $.each(jsonObj, function (i, tweet) {
                    //$(element).append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].City + "</option>");
                    var ISapiFlag = jsonObj[i].System;

                    addcitys(nodeValue, "Update", jsonObj[i].ID, jsonObj[i].ActivityLinks, false, ISapiFlag);
                    var fromcity = '#fromcity' + nodeValue + 'o' + (i + 1);
                    var tocity = "#tocity" + nodeValue + 'o' + (i + 1);
                    var txitmilage = "#txitmilage" + nodeValue + 'o' + (i + 1);
                    var chkSelf = "#self" + nodeValue + 'o' + (i + 1);
                    var chkCompany = "#company" + nodeValue + 'o' + (i + 1);

                    //alert("AJAX");
                    $(fromcity).val(jsonObj[i].FromCity);
                    $(tocity).val(jsonObj[i].ToCity);
                    $(txitmilage).val(jsonObj[i].MilageKm);


                    if (jsonObj[i].FromCity != "-1" && jsonObj[i].ToCity != "-1") {
                        if (!(jsonObj[i].FromCity == BaseCityID && jsonObj[i].ToCity == BaseCityID))
                            NonTourAllowanceApplicable = false;
                    }

                    if (jsonObj[i].Fare == "0") {
                        $i(chkSelf).prop("checked", true);
                        $(chkCompany).removeAttr('checked');
                    }
                    else {
                        $i(chkCompany).prop("checked", true);
                        $(chkSelf).removeAttr('checked');
                    }
                });
                if (jsonObj.length == 0) {
                    addcity(nodeValue, "Save", '', false);
                    var fromcity = '#fromcity' + nodeValue + 'o' + (jsonObj.length + 1);
                    $(fromcity).val(BaseCityID);
                }
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
function addcity(row, flag, ID, bool) {
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
            "<td><input type='text' class='smallbox' disabled id='txitmilage" + row + "o" + valofcity + "'/></td>" +
            "<td>" +
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
            "<td class='hideforSPO'> <img style='cursor:  pointer;' alt='Click to Delete' src='../Images/close-button.png' width='25px' height='25px' onClick='removecity(\"" + row + 'o' + valofcity + "\"," + row + ")'/></td> " +
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
    //}


}
function removecity(val, row) {
    if (IsEditable) {

        var tdval = '#tdcityid' + val
        var tdValue = "";
        if ($(tdval)[0].innerHTML != null && $(tdval)[0].innerHTML != '') {

            var r = confirm("Are you sure you want to remove the visit?");
            if (r == true) {
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


        }
        else {
            $('#trcity' + val).remove();
        }
    }
    else {

    }
}
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
    var reimb = '#hdnReimb_' + row;

    //var totalval = parseInt($(fareid).val()) + parseInt($(DAid).val()) + parseInt($(nightstayid).val()) + parseInt($(outbackid).val()) + parseInt($(bigcityid).val()) + (($i(chckboxid).prop('checked')) ? parseInt(CNGAllowance) : 0);
    //var totalval = parseFloat($(fareid).val()) + parseFloat($(DAid).val()) + parseFloat($(nightstayid).val()) + parseFloat($(outbackid).val()) + parseFloat($(bigcityid).val()) + parseFloat($(institutionAll).val()) + (($i(chckboxid).prop('checked')) ? parseInt(CNGAllowance) : 0);
    var totalval = parseFloat($(fareid).val()) + parseFloat($(DAid).val()) + parseFloat($(nightstayid).val()) + parseFloat($(outbackid).val()) + parseFloat($(reimb).val());
    $(SubTotalid).val(totalval);
    if (totalval >= $(txtBUHDeduct).val() && totalval >= $(txtSMDeduct).val() && totalval >= $(txtDSMDeduct).val()) {
        totalval = totalval - ($(txtBUHDeduct).val() == '' ? 0 : parseFloat($(txtBUHDeduct).val())) - ($(txtSMDeduct).val() == '' ? 0 : parseFloat($(txtSMDeduct).val())) - ($(txtDSMDeduct).val() == '' ? 0 : parseFloat($(txtDSMDeduct).val()));
        $('#saveupdateRow' + row).show();
    }
    else {
        var totalval = totalval;
        $('#saveupdateRow' + row).hide();

    }


    $(totalid).val(totalval);
    rowTotal();
    grandTotal();
    DisabledField();



}

function modalhide1() {
    $('#divConfirmationfile1').jqmHide();
}

function UpdateDeductionByManagerWithComments(row) {
    debugger;
    $('#divConfirmationfile1').jqm({ modal: true });
    $('#divConfirmationfile1').jqmShow();
    $("#divConfirmationfile1").html("<div class='jqmTitle row' style='background-color:#292929ed; margin-left:0px; width: 100%; '>Comments  <div style='float:right; '><a class='txtboxx' onClick='modalhide1();' style='display: block;text-align: center; cursor: pointer;'>X</a>   </div>     "
                 + "  </div>                                                                                                                            "
                 + "  <div class='row' style='margin-left: 5px;'>                                                                                       "

                 + "     <div class='col-lg-12' style=' text-align:center'>                                                                   "

                 + " <div class='taxattach ' >                                                                                                          "

                 + "   </div>"
                 + "<div class='modal-body'>"

        + "<div class='form-group'>"

                          + " <label  class='col-sm-4 control-label' for='comment'>Add Comment</label>"
                           + "<div class='col-sm-6'>"
                                   + "<textarea type='text' class='form-control'"
    + "id='comment' name ='comment' placeholder='Optional'/>"
+ "</div></div>"

      + "<br><br><br>"
       + "<br><br>"

+ "<div class=' col-sm-10 input-group mb-3'>"

+ "<button class=' btn btn-info' type='Button' onClick=UpdateDeductionByManagers(" + row + ")  >Update</button>"

+ "   </div>"
   + "   </div>"

                 + "</div></div>");

}

function UpdateDeductionByManagers(row) {

    var txtDSMDeduct = '#txtDSMDeduct' + row
    var txtSMDeduct = '#txtSMDeduct' + row
    var txtBUHDeduct = '#txtBUHDeduct' + row

    var tdval = '#td' + row
    var flagValue = '#saveupdateRow' + row;
    var flag = $(flagValue)[0].innerHTML;
    var chckboxid = '#chkcng' + row

    //alert(flag);
    $.ajax({
        type: "POST",
        url: "EditExpense.asmx/DeductDailyExpenseByManager",
        contentType: "application/json; charset=utf-8",
        data: '{"EEMonthlyId":' + MonthlyExpenseId + ',"EEDay":' + row + ',"MgrRole":"' + $('#UserRole').val() + '","DsmEmployeeID":"' + MgrId +
         '","DsmComments":"' + $('#comment').val() + '","DsmDeductAmount":"' + $(txtDSMDeduct).val() + '","SMEmployeeID":"' + MgrId +
         '","SMComments":"' + $('#comment').val() +
             '","SMDeductAmount":"' + $(txtSMDeduct).val() +
                 '","NSMEmployeeID":"' + MgrId +
                     '","NSMComments":"' + $('#comment').val() +
         '","NSMDeductAmount":' + $(txtBUHDeduct).val() + '}',
        success: function (response) {
            jsonObj = $.parseJSON(response.d);
            $.each(jsonObj, function (i, tweet) {
                //var ID = jsonObj[i].ID
                //$(tdval)[0].innerHTML = ID;
                //$(flagValue)[0].innerHTML = 'Update';
                if (jsonObj == 'ExpenseDoesntExists') {
                    alert("In Selected Day " + row + " Expense Doesn't Exists");
                }
                else {
                    $('#divConfirmationfile1').jqm({ modal: false });
                    $('#divConfirmationfile1').jqmHide();
                    alert('Deduction has been Updated.');
                    //   fillGrid();
                    // fillEmpDetails(MonthOfExpense);
                }

            });

        },
        error: onError,
        cache: false,
        async: false
        //beforeSend: startingAjax,
        // complete: ajaxCompleted
    });




}
function saveupdateRow(row) {
    if (IsEditable) {
        var visitperid = '#txtvisitbox' + row
        var reasonboxid = '#txtreasonbox' + row
        var daid = '#txtda' + row
        var institutionAll = '#txtiba' + row
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
                     '","InstitutionAllowance":"0"}',
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
                    data: '{"EEMonthlyId":' + MonthlyExpenseId + ',"EEDailyId":' + $(tdval)[0].innerHTML + ',"VisitPurpose":"' + $(visitperid).val() + '","TourDayClosing":"' + $(reasonboxid).val() + '","DailyAllowance":"' + $(daid).val() + '","NightStay":"' + $(nightstayid).val() + '","OutBack":"' + $(outbackid).val() + '","CNGAllowance":"' + ((parseInt(CNGAllowance) > 0) ? (($i(chckboxid).prop('checked')) ? CNGAllowance : "0") : "0") + '","InstitutionAllowance":"0"}',
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
    // if (IsEditable) {
    var daid = '#txtda' + row
    var institutionAll = '#txtiba' + row
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
                    data: '{"EEMonthlyId":' + MonthlyExpenseId + ',"VisitPurpose":"' + $(visitperid).val() + '","TourDayClosing":"' + $(reasonboxid).val() + '","EEDailyId":' + tdValue + ',"EEDay":' + row + ',"fromCity":"' + fromvalue + '","toCity":"' + tovalue + '","milageKM":"' + textval + '","DailyAllowance":"' + $(daid).val() + '","NightStay":"' + $(nightstayid).val() + '","OutBack":"' + $(outbackid).val() + '","CNGAllowance":"' + ((parseInt(CNGAllowance) > 0) ? (($i(chckboxid).prop('checked')) ? CNGAllowance : "0") : "0") + '","InstitutionAllowance":"0","TravelType":"' + $('#self' + val).is(':checked') + '"}',
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
    //}
    //else {

    //}
}


//var Onsuccesssavecitydistance = function (response) {
//    jsonObj = $.parseJSON(response.d);
//    $.each(jsonObj, function (i, tweet) {
//        var test = jsonObj[i].ID
//    });
//}


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

    if (IsReady) {
        var checkbox = '#checkbox' + fromid.id.replace('fromcity', '').split('')[0];
        $i(checkbox).prop("checked", true);
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

//function modalhide1() {
//    $('#divConfirmationfile').jqmHide();
//}
function SaveOtherActivities(MonthDay, DailyID, row)
{
    GetActivities();
    $i('#divConfirmationfile').modal('show');
    $('#dialog1').hide();

    $("#modalData").html(
        "<div id='AttachmentTableDiv'></div>" +
        "<div class='row'>" +
            "<div class='row mt-2'>" +
                "<label class='col-sm-3 control-label' for='Activity'>Other Activity</label>" +
                "<div class='col-sm-5'>" +
                    "<select id='activity' name='activity' class='form-control'>" +
                        "<option value='-1'>Select...</option>" +
                    "</select>" +
                "</div>" +
            "</div>" +

            "<div class='row mt-2'>" +
                "<label class='col-sm-3 control-label' for='amount'>Add Amount</label>" +
                "<div class='col-sm-5'>" +
                    "<input type='text' class='form-control decimal-input ea-triggers-bound' id='amount' name='amount' placeholder='Add Amount' onkeypress='return isNumber(event)' />" +
                "</div>" +
            "</div>" +

            "<div class='row mt-2'>" +
                "<label class='col-sm-3 control-label' for='comment'>Add Comment</label>" +
                "<div class='col-sm-5'>" +
                    "<textarea type='text' class='form-control' id='comment' name='comment' placeholder='Add Comment here' />" +
                "</div>" +
            "</div>" +

            "<div class='row mt-2'>" +
                "<div class='col-sm-3'>" +
                    "<label class=' control-label' for='attachfile'>Attach Files</label>" +
                    "<Button type='button' id='btnAddImage' class='btn-AddFile' onClick=addFileInput(" + row + ")></button>" +
                "</div>" +
                "<div class='col-sm-9'>" +
                    "<div class='row' id='imgUpload' style='margin-left: -5px !important; margin-right: 0px; !important'>" +
                        "<div class='col-sm-2 custom-file-label mb-2 col-sm-2 control-label tolltax' style='border-radius: 3px; border: 1px solid; padding: 0px; margin: 5px;' id=" + row + "0>" +
                            "<div class='wrapper' style='display: block;'>" +
                                "<div class='box'>" +
                                    "<span style='float: right; position: absolute; margin: 5px 10px; font-weight: 600; cursor: pointer; z-index: 999; padding: 0px 80px;'>X</span>" +
                                    "<div class='js--image-preview'></div>" +
                                    "<div class='upload-options'>" +
                                        "<label>" +
                                            "<input type='file' class='image-upload' id='Filedata" + row + "1' accept='image/*' />" +
                                        "</label>" +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
                "<div class='col- custom-file-label mb-2 col-sm-2 control-label tolltax'>" +
                "</div>" +
            "</div>" +

            ///Old Attached
            "<div class='row mt-2' id='DivOldUpload' style='display: none;'>" +
                "<div class='col-sm-3'>" +
                    "<label class=' control-label' for='attachfile'>Old Attachments</label>" +
                "</div>" +
                "<div class='col-sm-9 '>" +
                    "<div class='row' id='OldUpload'>" +
                    "</div>" +
                "</div>" +
                "<div class='col- custom-file-label mb-2 col-sm-2 control-label tolltax'>" +
                "</div>" +
            "</div>" +
            ///End Old Attached
        "</div>"
    );
    $("#modal-Footer").html("<div class=' col-sm-10 input-group mb-3'>"
        + "<button class=' btn btn-info' type='Button' id='btnsave' onClick=saveupdateAttach(\"" + MonthDay + "\"," + DailyID + "," + row + ")>Save</button>"
        + "<button class=' btn btn-info' type='Button' style='display:None;' id='btnUpdate' >Update</button>");

    FillAttachmentGrid(MonthDay, DailyID, row);
    // initialize box-scope
    var boxes = document.querySelectorAll('.box');
    AttachmentTableDiv
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        initDropEffect(box);
        initImageUpload(box);
    }
}
//{
//    debugger
//    GetActivities();
//    $('#divConfirmationfile').jqm({ modal: true });
//    $('#divConfirmationfile').jqmShow();

//    $("#divConfirmationfile").html(
//     "<div id='AttachmentTableDiv'></div>" +

//        "<div class='jqmTitle row' style='background-color:#292929ed; margin-left:0px; width: 100%; '>Attach Files  <div style='float:right; '><a class='txtboxx' onClick='modalhide1();' style='display: block;text-align: center; cursor: pointer;'>X</a>   </div>     "
//                 + "  </div>                                                                                                                            "
//                 + "  <div class='row' style='margin-left: 5px;'>                                                                                       "

//                 + "     <div class='col-lg-12' style=' text-align:center'>                                                                   "

//                 + " <div class='taxattach ' >                                                                                                          "

//                 + "   </div>"
//                 + "<div class='modal-body'>"




//                                      + "<div class='form-group'>"
//                          + " <label  class='col-sm-4 control-label' for='Activity'>Other Activity</label>"
//                           + "<div class='col-sm-6'>"
//                    + " <select id='activity' name='activity' class='form-control'>"
//                               + " <option value='-1'>Select...</option>"
//                           + " </select>"
//                      + "</div></div>"
//                      + "<br><br>"


//                           + "<div class='form-group'>"
//                          + " <label  class='col-sm-4 control-label' for='amount'>Add Amount</label>"
//                           + "<div class='col-sm-6'>"
//                                   + "<input type='text' class='form-control'"
//    + "id='amount' name ='amount' placeholder='Add Amount'/>"
//+ "</div></div>"
//+ "<br><br>"
//        + "<div class='form-group'>"

//                          + " <label  class='col-sm-4 control-label' for='comment'>Add Comment</label>"
//                           + "<div class='col-sm-6'>"
//                                   + "<textarea type='text' class='form-control'"
//    + "id='comment' name ='comment' placeholder='Add Comment here'/>"
//+ "</div></div>"

//      + "<br><br><br>"

//        + "<div class='form-group'>"

//                          + " <label  class='col-sm-4 control-label' for='attachfile'>Attach Files</label>"

//  + '<div class="col-sm-6 custom-file-label mb-3" class="col-sm-5 control-label tolltax">  <input type="file" class=" col-sm-6 control-label txtboxx"  multiple="multiple"  id="tolltaxattach' + row + '" name="filename"></div>'
//  + "   </div>"
//  + "<br><br>"

//   + "<div class=' col-sm-10 input-group mb-3'>"

//+ "<button class=' btn btn-info' type='Button' onClick=saveupdateAttach(\"" + MonthDay + "\"," + DailyID + "," + row + ")  >Update</button>"

//   + "   </div>"

//                 + "</div></div>");

//    FillAttachmentGrid(MonthDay, DailyID, row);
//    // initialize box-scope
//    var boxes = document.querySelectorAll('.box');

//    for (let i = 0; i < boxes.length; i++) {
//        let box = boxes[i];
//        initDropEffect(box);
//        initImageUpload(box);
//    }


//}

function modalhide2() {
    $('#divReimbursement').jqmHide();
}


function ShowReimbursement(MonthDay, DailyId, row) {
    debugger
//    GetActivities_Reimbursement();
//    $('#divReimbursement').jqm({ modal: true });
//    $('#divReimbursement').jqmShow();

//    $("#divReimbursement").html("<div class='jqmTitle row' style='background-color:#292929ed; margin-left:0px; width: 100%; '>Reimbursement  <div style='float:right; '><a class='txtboxx' onClick='modalhide2();' style='display: block;text-align: center; cursor: pointer;'>X</a>   </div>"
//                 + "</div>"

//                 + "<div id='ReimburseTableDiv'></div>"

//                 + "<div id='ReimHide' class='row' style='margin-left: 5px;'>"

//                 + "<div class='col-lg-12' style=' text-align:center'>"

//                 + "<div class='modal-body'>"

//                                      + "<div class='form-group'>"
//                          + " <label  class='col-sm-4 control-label' for='activity_Reimbursement'>Reason</label>"
//                           + "<div class='col-sm-6'>"
//                    + " <select id='activity_Reimbursement' name='activity_Reimbursement' class='form-control'>"
//                               + " <option value='-1'>Select...</option>"
//                           + " </select>"
//                      + "</div></div>"
//                      + "<br><br>"


//                           + "<div class='form-group'>"
//                          + " <label  class='col-sm-4 control-label' for='amount_Reimbursement'>Add Amount</label>"
//                           + "<div class='col-sm-6'>"
//                                   + "<input type='text' class='form-control'"
//    + "id='amount_Reimbursement' name ='amount' placeholder='Add Amount'/>"
//+ "</div></div>"
//+ "<br><br>"
//        + "<div class='form-group'>"

//                          + " <label  class='col-sm-4 control-label' for='comment_Reimbursement'>Feedback</label>"
//                           + "<div class='col-sm-6'>"
//                                   + "<textarea type='text' class='form-control'"
//    + "id='comment_Reimbursement' name ='comment' placeholder='Add Comment here'/>"
//+ "</div></div>"

//      + "<br><br><br>"

//        + "<div class='form-group'>"

//                          + " <label  class='col-sm-4 control-label' for='attachfile'>Attach Files</label>"

//  + '<div class="col-sm-6 custom-file-label mb-3" class="col-sm-5 control-label tolltax">  <input type="file" class=" col-sm-6 control-label txtboxx"  multiple="multiple"  id="attach_Reimbursement" name="filename"></div>'
//  + "   </div>"
//  + "<br><br>"

//   + "<div class=' col-sm-10 input-group mb-3'>"

//+ "<button class=' btn btn-info' type='Button' onClick=AddDailyReimbursement(" + DailyId + "," + row + ")  >Add</button>"

//   + "   </div>"

//                 + "</div></div>");
//    //if (($('#labelStatus')[0].innerHTML != 'Draft' && $('#labelStatus')[0].innerHTML != 'Rejected') && (ReimbursmentStatus != 'Rejected' || ReimbursmentStatus != 'Draft'))
//    //{
//    //    $('#ReimHide').hide();
//    //}
    //    FillReimbursementGrid(row);
   
    debugger
    GetActivities_Reimbursement();
    $i('#divConfirmationfile').modal('show');
    $('#dialog1').hide();

    $("#modalData").html(
        "<div id='ReimburseTableDiv'></div>" +
        "<div class='row'>" +
            "<div class='row mt-2'>" +
                "<label class='col-sm-3 control-label' for='Activity'>Other Activity</label>" +
                "<div class='col-sm-5'>" +
                    "<select id='activity_Reimbursement' name='activity_Reimbursement' class='form-control'>" +
                        "<option value='-1'>Select...</option>" +
                    "</select>" +
                "</div>" +
            "</div>" +

            "<div class='row mt-2'>" +
                "<label class='col-sm-3 control-label' for='amount'>Add Amount</label>" +
                "<div class='col-sm-5'>" +
                    "<input type='text' class='form-control decimal-input ea-triggers-bound' id='amount' name='amount' placeholder='Add Amount' onkeypress='return isNumber(event)' />" +
                "</div>" +
            "</div>" +

            "<div class='row mt-2'>" +
                "<label class='col-sm-3 control-label' for='comment'>Add Comment</label>" +
                "<div class='col-sm-5'>" +
                    "<textarea type='text' class='form-control' id='comment' name='comment' placeholder='Add Comment here' />" +
                "</div>" +
            "</div>" +

            "<div class='row mt-2'>" +
                "<div class='col-sm-3'>" +
                    "<label class=' control-label' for='attachfile'>Attach Files</label>" +
                    "<Button type='button' id='btnAddImage' class='btn-AddFile' onClick=addFileInput(" + row + ")></button>" +
                "</div>" +
                "<div class='col-sm-9'>" +
                    "<div class='row' id='imgUpload' style='margin-left: -5px !important; margin-right: 0px; !important'>" +
                        "<div class='col-sm-2 custom-file-label mb-2 col-sm-2 control-label tolltax' style='border-radius: 3px; border: 1px solid; padding: 0px; margin: 5px;' id=" + row + "0>" +
                            "<div class='wrapper' style='display: block;'>" +
                                "<div class='box'>" +
                                    "<span style='float: right; position: absolute; margin: 5px 10px; font-weight: 600; cursor: pointer; z-index: 999; padding: 0px 80px;'>X</span>" +
                                    "<div class='js--image-preview'></div>" +
                                    "<div class='upload-options'>" +
                                        "<label>" +
                                            "<input type='file' class='image-upload' id='Filedata" + row + "1' accept='image/*' />" +
                                        "</label>" +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
                "<div class='col- custom-file-label mb-2 col-sm-2 control-label tolltax'>" +
                "</div>" +
            "</div>" +

            ///Old Attached
            "<div class='row mt-2' id='DivOldUpload' style='display: none;'>" +
                "<div class='col-sm-3'>" +
                    "<label class=' control-label' for='attachfile'>Old Attachments</label>" +
                "</div>" +
                "<div class='col-sm-9 '>" +
                    "<div class='row' id='OldUpload'>" +
                    "</div>" +
                "</div>" +
                "<div class='col- custom-file-label mb-2 col-sm-2 control-label tolltax'>" +
                "</div>" +
            "</div>" +
            ///End Old Attached
        "</div>"
    );
    $("#modal-Footer").html("<div class=' col-sm-10 input-group mb-3'>"
        + "<button class=' btn btn-info' type='Button' id='btnsave' onClick=AddDailyReimbursement(\"" + MonthDay + "\"," + DailyId + "," + row + ")>Save</button>"
        + "<button class=' btn btn-info' type='Button' style='display:None;' id='btnUpdate' >Update</button>");

    FillReimbresmentGrid(MonthDay, DailyId, row);
    // initialize box-scope
    var boxes = document.querySelectorAll('.box');
    ReimburseTableDiv
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        initDropEffect(box);
        initImageUpload(box);
    }

}

var FillReimbursementGrid = function (row) {
    $.ajax({
        type: "POST",
        url: "EditExpense.asmx/GetReimbursementDayWise",
        contentType: "application/json; charset=utf-8",
        data: '{"EmpID":' + EmployeeId + ',"MonthlyExpenseId":' + MonthlyExpenseId + ',"DayofExpense":"' + row + '"}',
        success: function (response) {

            var val = '';
            var table = '';
            $('#ReimburseTableDiv').empty();

            table = '<table id="ReimburseTable">'
                + '<thead>'
                + '<tr>'
                + '<th>Reason</th>'
                + '<th>Amount</th>'
                + '<th>Feed Back</th>'
                  + '<th>Attachement</th>'
                + '</tr></thead><tbody>';




            if (response.d != null && response.d != '') {
                jsonObj = $.parseJSON(response.d);

                for (var i = 0; i < jsonObj.length; i++) {
                    val += '<tr>'
                        + '<td>' + jsonObj[i].Reason + '</td>'
                        + '<td>' + jsonObj[i].Amount + '</td>'
                        + '<td>' + jsonObj[i].FeedBack + '</td>'
                         //+ '<td><a href="' + jsonObj[i].Attachment + '" target="_blank"  > LINK </a></td>'
                        + '<td> <a href="' + jsonObj[i].Attachment + '" download><img src="' + jsonObj[i].Attachment + '" alt="Image Not Sync" style="width:100px;height:100px;"></a></td>'
                        + '</tr>';
                }
            }

            $('#ReimburseTableDiv').append(table + val + '</tbody></table>')
            $i("#ReimburseTable").DataTable();


        },
        error: onError,
        cache: false,
        async: false
    });
    return;
}


function GetActivities() {
    $.ajax({
        type: "POST",
        url: "EditExpense.asmx/getAllActivities",
        contentType: "application/json; charset=utf-8",
        success: onSuccessGetActivities,
        error: onError,
        cache: false
    });
}


function onSuccessGetActivities(data, status) {
    document.getElementById('activity').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select Activities';

        $("#activity").append("<option value='" + value + "'>" + name + "</option>");
        $.each(jsonObj, function (i, tweet) {
            $("#activity").append("<option value='" + jsonObj[i].PK_ExpenseActivityId + "'>" + jsonObj[i].Activitytype + "</option>");

        });
    }
}

function GetActivities_Reimbursement() {
    $.ajax({
        type: "POST",
        url: "EditExpense.asmx/getAllActivities_Reimbursement",
        contentType: "application/json; charset=utf-8",
        success: onSuccessGetActivities_Reimbursement,
        error: onError,
        cache: false
    });
}


function onSuccessGetActivities_Reimbursement(data, status) {
    document.getElementById('activity_Reimbursement').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select Activities';

        $("#activity_Reimbursement").append("<option value='" + value + "'>" + name + "</option>");
        $.each(jsonObj, function (i, tweet) {
            $("#activity_Reimbursement").append("<option value='" + jsonObj[i].PK_ExpenseActivityId + "'>" + jsonObj[i].Activitytype + "</option>");

        });
        //$("#activity_Reimbursement").append("<option value='5'>KM</option>");
    }
}

function modalhide() {
    $('#divConfirmation').jqmHide();
}

var OnSuccessViewImage = function (response) {
    debugger;
    $('#divConfirmation').jqm({ modal: true });
    $('#divConfirmation').jqmShow();
    $("#divConfirmation").html("<div class='jqmTitle row' style='background-color:#292929ed; margin-left:0px; width: 100%; '>Attachements  <div style='float:right; '><a class='txtboxx' onClick='modalhide();' style='display: block;text-align: center; cursor: pointer;'>X</a>   </div>     "
                 + "  </div>                                                                                                                            "
                 + "  <div class='row' style='margin-left: 5px;'>                                                                                       "

                 + "     <div class='col-lg-12' style=' text-align:center'>                                                                   "
                 + "   <h3 ><u>Attachements</u></h3>                                                                                           "
                 + " <div class='taxattach ' >                                                                                                          "
                 + "          <p class='tax'>No Attachement Available</p>                                                                               "
                 + "   </div></div>                                                                                                                     "

                 + "      </div>                                                                                                                        "
                 + "  </div>");
    //$(".fareattach").html("");
    //$(".postageattach").html("");
    $(".taxattach").html("");
    jsonObj = $.parseJSON(response.d);
    if (jsonObj != "") {
        for (var i = 0; i < jsonObj.length ; i++) {

            $(".tax").html("");

            $('.taxattach').append('<div><a href="' + jsonObj[i].Attachment_name + '" download><img src="' + jsonObj[i].Attachment_name + '" alt="Image Not Sync" style="width:250px;height:250px;"></a><hr></div>');

            //  $('.taxattach').append('<div><a href="../Uploads/ExpenseIndiviualImages/" download><img src="../Uploads/ExpenseIndiviualImages/' + jsonObj[i].ImagePath + '" alt="Fare Attach" style="width:250px;height:250px;"></a><hr></div>');
            //  $('.taxattach').append('<div><a href="../Uploads/ExpenseIndiviualImages/"' + jsonObj[i].ImagePath + '  download><img src="E:/areeka/BMC.VikorCRMPlanning/Source/PharmaLive-App-WithPlan/PocketDCR2/Uploads/ExpenseIndiviualImages/"' + jsonObj[i].ImagePath + 'alt="Fare Attach" style="width:250px;height:250px;"></a><hr></div>');

            //$('.taxattach').append('<div><a ' + jsonObj[i].ImagePath + '"  download><img src="' + jsonObj[i].ImagePath + '" alt="Fare Attach" style="width:250px;height:250px;"></a><hr></div>');
            //  $('.taxattach').append('<div><a href="../Uploads/ExpenseIndiviualImages/download1.jpg" download><img src="../Uploads/ExpenseIndiviualImages/'+jsonObj[i].ImagePath+'" alt="Fare Attach" style="width:250px;height:250px;"></a><hr></div>');
        }


    }

}

function saveupdateAttach(MonthDay, DailyID, row) {
    debugger;
    var x = document.getElementById("imgUpload").querySelectorAll(".image-upload");
    formData = new FormData();
    for (var i = 0; i < x.length; i++) {
        var id = x[i].id;
        var tolltaxattach = '#' + id;
        var uploadedFiles3 = $(tolltaxattach)[0].files;
        var validattach = '';

        if (uploadedFiles3.length > 0) {
            //for (var i = 0; i < uploadedFiles3.length; i++) {
            toltxext = uploadedFiles3[0].name.split('.');
            if (toltxext[1] != 'jpeg' && toltxext[1] != 'jpg' && toltxext[1] != 'PNG' && toltxext[1] != 'png') {
                validattach = " Please Select Only Image in PNG or JPG Format";
            }
            else {
                ImgFileName += uploadedFiles3[0].name + '~';
                Filedata.push(uploadedFiles3[0])

                formData.append(DailyID + ':' + uploadedFiles3[0].name + ':' + $('#amount').val() + ':' + $('#comment').val() + ':' + $('#activity').val() + ':' + EmployeeId + ':' + MonthDay + ':' + "save", uploadedFiles3[0]);
            }
            //}

            ImgFileName = ImgFileName.substring(0, ImgFileName.length - 1);
            //ImgFile=ImgFile.substring(0, ImgFile.length - 1);

        }
        else {
            swal(
                   'alert!',
                    'Please Attach the Image',
                    'error'
                     );
            //alert("Please Attach the Image");
            return;
        }
    }

    if (validattach == " Please Select Only Image in PNG or JPG Format") {
        swal('alert!', validattach, 'error');
        //alert(validattach);
        return;
    }
    else if ($('#activity').val() == '-1') {
        swal('alert!', 'Please Select Other Activities', 'error');
        //alert('Please Select Other Activities');
        return;
    }
    else if ($('#amount').val() == '' || $('#amount').val() == null) {
        swal('alert!', 'Please Enter Other Amount', 'error');
        //alert("Please Enter Other Amount");
        return;
    }
    else if (Number($('#amount').val()) <= 0) {
        swal('alert!', 'Please Enter Greater than Zero Amount', 'error');
        //alert("Please Enter Greater than Zero Amount");
        return;
    }
    else if ($('#comment').val() == '' || $('#comment').val() == null) {
        swal('alert!', 'Please Enter Comment', 'error');
        //alert("Please Enter Comment");
        return;
    }

    $i.ajax({
        url: '../Handler/ExpenseHandler.ashx',
        method: 'post',
        contentType: false,
        processData: false,
        data: formData,
        success: function (data, response) {
            if (data != null) {
                swal('alert!', 'Daily Attachement has been Updated Successfully', 'success'),
                window.location.reload(true),
                function () {
                    window.location.reload(true);
                };
                //swal('alert!', 'Daily Attachement has been Updated Successfully', 'success');
                ////alert('Daily Attachement has been Updated Successfully');
                //fillEmpDetails(MonthOfExpense);
                //fillGrid();
            }
        },
        error: onError,
        cache: false,
        async: true,
        beforeSend: startingAjaxNew,
        complete: ajaxCompletedNew
    });


    // var flagValue = '#saveupdateRow' + row;
    // var flag = $(flagValue)[0].innerHTML;
    //var tolltaxattach = '#tolltaxattach' + row;

    //var uploadedFiles3 = $(tolltaxattach)[0].files;
    //var validattach = '';

    //formData = new FormData();
    //if (uploadedFiles3.length > 0) {

    //    for (var i = 0; i < uploadedFiles3.length; i++) {
    //        toltxext = uploadedFiles3[i].name.split('.');
    //        if (toltxext[1] != 'jpeg' && toltxext[1] != 'jpg' && toltxext[1] != 'PNG' && toltxext[1] != 'png') {
    //            validattach = " Please Select Only Image in PNG or JPG Format";
    //        }
    //        else {

    //            //   formData.append('TollTax' + ':' + uploadedFiles3[0].name + ':' + jsonObj.d + ':' + EmployeeId, uploadedFiles3[i]);
    //            formData.append(DailyID + ':' + uploadedFiles3[i].name + ':' + $('#amount').val() + ':' + $('#comment').val() + ':' + $('#activity').val() + ':' + EmployeeId + ':' + MonthDay, uploadedFiles3[i]);
    //        }
    //    }
    //}


    //if (validattach == '') {
    //    $i.ajax({
    //        url: '../Handler/ExpenseHandler.ashx',
    //        method: 'post',
    //        contentType: false,
    //        processData: false,

    //        data: formData,
    //        success: function (data, response) {

    //            if (data != null) {
    //                alert('Daily Attachement has been Updated Successfully');


    //            }
    //        },
    //        //  success: OnSuccessFileAttach,
    //        error: onError,
    //        cache: false,
    //        async: false,
    //        beforeSend: startingAjax,
    //        complete: ajaxCompleted


    //        //error: function (err) {
    //        //    alert(err.statusText);
    //        //},
    //        //cache: false,
    //        //async: false

    //    });
    //    //  alert('Daily Expense has been Successfully');

    //}
    //else {
    //    alert(validattach);
    //}


    //fillEmpDetails(MonthOfExpense);

}


function startingAjaxNew() {
    $('#dialog1').show();
}

function ajaxCompletedNew() {
    $('#dialog1').hide();
    $2('#divConfirmationfile').modal('hide');
}

function AddDailyReimbursement(MonthDay,DailyID, row) {
    //var st = $('#ReimburseTable').text();
    ////if (DailyID == 0) {
    ////    alert("Not able to attach the Reimbursement because call is not executed in this day");
    ////      return;
    ////}
    //if (st == "ReasonAmountFeed BackAttachementNo data available in table") {
    //    // var flagValue = '#saveupdateRow' + row;
    //    // var flag = $(flagValue)[0].innerHTML;
    //    var attachReimbursement = '#attach_Reimbursement';
    //    var uploadedFiles3 = $(attachReimbursement)[0].files;
    //    var validattach = '';

    //    formData = new FormData();
    //    if (uploadedFiles3.length > 0) {
    //        if (uploadedFiles3.length == 1) {
    //            for (var i = 0; i < uploadedFiles3.length; i++) {
    //                toltxext = uploadedFiles3[i].name.split('.');
    //                if (toltxext[1] != 'jpeg' && toltxext[1] != 'jpg' && toltxext[1] != 'PNG' && toltxext[1] != 'png') {
    //                    validattach = " Please Select Only Image in PNG or JPG Format";
    //                }
    //                else {

    //                    //   formData.append('TollTax' + ':' + uploadedFiles3[0].name + ':' + jsonObj.d + ':' + EmployeeId, uploadedFiles3[i]);
    //                    formData.append(DailyID + ':' + MonthlyExpenseId + ':' + row + ':' + uploadedFiles3[i].name + ':' + $('#amount_Reimbursement').val() + ':' + $('#comment_Reimbursement').val() + ':' + $('#activity_Reimbursement').val() + ':' + EmployeeId, uploadedFiles3[i]);
    //                }
    //            }
    //        }
    //        else {
    //            alert("Please Select Only One Image.");
    //            $('#attach_Reimbursement').val('');
    //            return;
    //        }
    //    }
    //    else {
    //        alert("Please Attach receipt/approval");
    //        return;
    //    }

    //    if (validattach == " Please Select Only Image in PNG or JPG Format") {
    //        alert(validattach);
    //        return;
    //    }
    //    else if ($('#activity_Reimbursement').val() == '-1') {
    //        alert('Please Select Activities');
    //        return;
    //    }
    //    else if ($('#amount_Reimbursement').val() == '' || $('#amount_Reimbursement').val() == null) {
    //        alert("Please Enter Amount");
    //        return;
    //    }
    //    else if (Number($('#amount_Reimbursement').val()) <= 0) {
    //        alert("Please Enter Greater than Zero Amount");
    //        return;
    //    }
    //    else if ($('#comment_Reimbursement').val() == '' || $('#comment_Reimbursement').val() == null) {
    //        alert("Please Enter Comment");
    //        return;
    //    }


    //    $i.ajax({
    //        url: '../Handler/ExpenseHandler.ashx?Type=Reimbursement',
    //        method: 'post',
    //        contentType: false,
    //        processData: false,

    //        data: formData,
    //        success: function (data, response) {
    //            if (data != null) {
    //                alert('Daily Reimbursement has been added Successfully');
    //                FillReimbursementGrid(row);
    //                clearReimField();
    //                fillEmpDetails(MonthOfExpense);
    //                fillGrid();
    //            }
    //        },
    //        //  success: OnSuccessFileAttach,
    //        error: onError,
    //        cache: false,
    //        async: false,
    //        beforeSend: startingAjax,
    //        complete: ajaxCompleted



    //        //error: function (err) {
    //        //    alert(err.statusText);
    //        //},
    //        //cache: false,
    //        //async: false

    //    });
    //    //  alert('Daily Expense has been Successfully');

    //    //fillEmpDetails(MonthOfExpense);
    //}

    //else {
    //    alert("Not allow! The Reimbursement is already Attached");
    //    clearReimField();
    //}

    debugger;
    var x = document.getElementById("imgUpload").querySelectorAll(".image-upload");
    formData = new FormData();
    for (var i = 0; i < x.length; i++) {
        var id = x[i].id;
        var tolltaxattach = '#' + id;
        var uploadedFiles3 = $(tolltaxattach)[0].files;
        var validattach = '';

        if (uploadedFiles3.length > 0) {
            //for (var i = 0; i < uploadedFiles3.length; i++) {
            toltxext = uploadedFiles3[0].name.split('.');
            if (toltxext[1] != 'jpeg' && toltxext[1] != 'jpg' && toltxext[1] != 'PNG' && toltxext[1] != 'png') {
                validattach = " Please Select Only Image in PNG or JPG Format";
            }
            else {
                ImgFileName += uploadedFiles3[0].name + '~';
                Filedata.push(uploadedFiles3[0])

                formData.append(DailyID + ':' + MonthlyExpenseId + ':' + uploadedFiles3[0].name + ':' + $('#amount').val() + ':' + $('#comment').val() + ':' + $('#activity_Reimbursement').val() + ':' + EmployeeId + ':' + MonthDay + ':' + "save", uploadedFiles3[0]);
            }
            //}

            ImgFileName = ImgFileName.substring(0, ImgFileName.length - 1);
            //ImgFile=ImgFile.substring(0, ImgFile.length - 1);

        }
        else {
            swal(
                   'alert!',
                    'Please Attach the Image',
                    'error'
                     );
            //alert("Please Attach the Image");
            return;
        }
    }

    if (validattach == " Please Select Only Image in PNG or JPG Format") {
        swal('alert!', validattach, 'error');
        //alert(validattach);
        return;
    }
    else if($('#activity_Reimbursement option:selected').val() == '-1')
    {
  
        swal('alert!', 'Please Select Other Activities', 'error');
        //alert('Please Select Other Activities');
        return;
    }
    else if ($('#amount').val() == '' || $('#amount').val() == null) {
        swal('alert!', 'Please Enter Other Amount', 'error');
        //alert("Please Enter Other Amount");
        return;
    }
    else if (Number($('#amount').val()) <= 0) {
        swal('alert!', 'Please Enter Greater than Zero Amount', 'error');
        //alert("Please Enter Greater than Zero Amount");
        return;
    }
    else if ($('#comment').val() == '' || $('#comment').val() == null) {
        swal('alert!', 'Please Enter Comment', 'error');
        //alert("Please Enter Comment");
        return;
    }

    $i.ajax({
        url: '../Handler/ExpenseHandler.ashx?Type=Reimbursement',
        method: 'post',
        contentType: false,
        processData: false,
        data: formData,
        success: function (data, response) {
            if (data != null && data == "Inserted") {
                swal('alert!', 'Daily Reimbursement has been added Successfully', 'success'),
                window.location.reload(true),
                function () {
                    window.location.reload(true);
                };
                //swal('alert!', 'Daily Attachement has been Updated Successfully', 'success');
                ////alert('Daily Attachement has been Updated Successfully');
                //fillEmpDetails(MonthOfExpense);
                //fillGrid();
            }
            else if (data == "AlreadyExist") {
                swal('Cancelled', 'Daily Reimbursement Already Exists', 'error');
                  
            }
        },
        error: onError,
        cache: false,
        async: true,
        beforeSend: startingAjaxNew,
        complete: ajaxCompletedNew
    });
}

function clearReimField() {
    $('#attach_Reimbursement').val('');
    $('#amount_Reimbursement').val('');
    $('#comment_Reimbursement').val('');
    $('#activity_Reimbursement').val('-1');
}




function attach(id) {
    //  if (id == 0) {
    //  id = dailyid;

    // }
    $.ajax({
        type: "POST",
        url: "EditExpense.asmx/ViewImage",
        data: "{'dailyid':'" + id + "','monthly':'" + MonthlyExpenseId + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessViewImage,
        error: onError,
        cache: false,
        async: false,
        beforeSend: startingAjax,
        complete: ajaxCompleted
    });


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
        //$('#empteam').empty();
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
        //$('#empADDA').empty();
        jsonObj = $.parseJSON(response.d);
        $.each(jsonObj, function (i, tweet) {
            $('#empName')[0].innerHTML = jsonObj[i].EmployeeName;
            $('#expensemonth')[0].innerHTML = MonthOfExpense.split("-")[1] + "-" + MonthOfExpense.split("-")[2];
            $('#empCode')[0].innerHTML = jsonObj[i].EmployeeCode;
            $('#emploginID')[0].innerHTML = jsonObj[i].LoginId;

            //$('#empteam')[0].innerHTML = jsonObj[i].Team;
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
            //$('#empADDA')[0].innerHTML = jsonObj[i].ADDADays;
            isCarAllowanceAllowed = jsonObj[i].isCarAllowance;
            isBikeAllowanceAllowed = jsonObj[i].isBikeAllowance;
            isIBA = jsonObj[i].isIBA;
            isBigCity = jsonObj[i].isBigCity;
            ExpenseEmployeeRole = jsonObj[i].EmployeeRole;
            bigCityval = jsonObj[i].DailyAddAllowance_BigCity;
            //if (isCarAllowanceAllowed == "0")
            //    $('#CNGDataRow').hide();
            //if (isBikeAllowanceAllowed == "0") {
                
                //$('#BikeDataRow').hide();
            //}

            milageval = jsonObj[i].MilageFarePerKm;
            //Reimbursment
            $('#Reimbursment').val(jsonObj[i].ReimbursmentAmount);
            ReimbursmentStatus = jsonObj[i].ReimbursmentStatus

            //Reimbursment


            // if bigcity isnt allow and aditional city allowacne then aditional city allowance plus daily allowance
            //if (isBikeAllowanceAllowed == "1" && isBigCity=="0")
            //    {
            //    dailyAllval = parseFloat(jsonObj[i].DailyAllowance) + parseFloat(jsonObj[i].BikeExpense) ;
            //}
            // if bigcity isnt allow and aditional city allowacne then aditional city allowance plus daily allowance
            if (isBigCity == "1") {
                dailyAllval = parseFloat(jsonObj[i].BikeExpense);
            }

            else {
                dailyAllval = 0;
            }

            if (isIBA == "1") {
                dailyAllval = dailyAllval + parseFloat(jsonObj[i].DailyInstitutionBaseAllowance);
            }

            if (isBikeAllowanceAllowed == "1") {
                dailyAllval = dailyAllval + parseFloat(bigCityval);
            }



            institutionAllowance = jsonObj[i].DailyInstitutionBaseAllowance;
            //bigCityval = jsonObj[i].DailyAddAllowance_BigCity;
            nightStayval = jsonObj[i].OutStationAllowance_NightStay;
            outBackval = jsonObj[i].OutStationAllowance_OutBack;

            nontouringAllowance = jsonObj[i].MonthlyNonTouringAllowance;
            $('#MonthlyNonTouringAllowance').val(nontouringAllowance);


            CNGAllowance = parseInt(jsonObj[i].CNGAllowance);
            $('#CngChargedDays').val(jsonObj[i].TotalCNGDays);



            var TotalCngDays = parseFloat((jsonObj[i].TotalCNGDays == "") ? 0 : jsonObj[i].TotalCNGDays);
            $('#CngAllowance').val(jsonObj[i].CNGAllowance);

            //Fuel Allowance
            $('#fuelAllowance').val(jsonObj[i].FuelAllowance);


            //$('#CngAllowance').val(CNGAllowance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            Misc = jsonObj[i].MonthlyExpenseTownBased;

            //needs to be change
            $('#CellPhoneBillAmount').val(jsonObj[i].MobileExpense);
            //$('#CellPhoneBillAmount').val('0');


            $('#CellPhoneBillAmountCorrection').val(jsonObj[i].MobileExpenseCorrection);
            $('#BikeDeduction').val(jsonObj[i].BikeExpenseDeduction);
            if (jsonObj[i].MonthlyExpenseTownBased < jsonObj[i].OtherActivites) {
                $('#MonthlyExpenseTownBased').val((jsonObj[i].OtherActivites != "") ? jsonObj[i].OtherActivites : 0);
                if ($('#UserRole').val() == "admin") {
                    $('#MonthlyExpenseTownBased').css('color', 'red');
                    $('#MonthlyExpenseTownBased').addClass('borderClass');
                }

            }
            else {
                $('#MonthlyExpenseTownBased').val((jsonObj[i].MonthlyExpenseTownBased != "") ? jsonObj[i].MonthlyExpenseTownBased : 0);
                $('#MonthlyExpenseTownBased').css('color', 'Black');
                $('#MonthlyExpenseTownBased').css('background', 'white');
            }
            $('#ExpenseNote').val(jsonObj[i].ExpenseNote);
            $('#labelStatus')[0].innerHTML = jsonObj[i].ReportStatus;
            if (jsonObj[i].ReportStatus == "Draft" || jsonObj[i].ReportStatus == "Rejected" || jsonObj[i].ReportStatus == "Rejected") {
                $('#labelStatus').addClass("red");
            }
            else if (jsonObj[i].ReportStatus == "Submitted" || jsonObj[i].ReportStatus == "ReSubmitted") {
                $('#labelStatus').addClass("yellow");

            }
            else {
                $('#labelStatus').addClass("green");
            }
            IsEditable = (jsonObj[i].IsEditable == "True");
            if (!IsEditable) {
                $('#submit_button').hide();
                $('#saveExpenseReport').hide();
                $i('#ExpenseNote').prop("disabled", "disabled");

            }
            $i('#BikeDeduction').prop("disabled", "disabled");
            $i('#CellPhoneBillAmountCorrection').prop("disabled", "disabled");
            $i('#MiscExpense').prop("disabled", true);

        });
    }
}
var getApprovalDetails = function (date) {

    debugger;

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


            /*var AMStatus = jsonObj[i].AMApprovalStatus;
            var AMIsEditable = (jsonObj[i].AMIsEditable == "True");
            var SMStatus = jsonObj[i].SMApprovalStatus;
            var SMIsEditable = (jsonObj[i].SMIsEditable == "True");
            var RTLStatus = jsonObj[i].RTLApprovalStatus;
            var RTLIsEditable = (jsonObj[i].RTLIsEditable == "True");
            var SFEStatus = jsonObj[i].SFEApprovalStatus;
            var SFEIsEditable = (jsonObj[i].SFEIsEditable == "True");*/

            AMStatus = jsonObj[i].AMApprovalStatus;
            AMIsEditable = (jsonObj[i].AMIsEditable == "True");
            SMStatus = jsonObj[i].SMApprovalStatus;
            SMIsEditable = (jsonObj[i].SMIsEditable == "True");
            RTLStatus = jsonObj[i].RTLApprovalStatus;
            RTLIsEditable = (jsonObj[i].RTLIsEditable == "True");
            SFEStatus = jsonObj[i].SFEApprovalStatus;
            SFEIsEditable = (jsonObj[i].SFEIsEditable == "True");
            MgrId = jsonObj[i].SessionEmployeeId

            // Reimbursment Approval 
            ReimAMStatus = jsonObj[i].ReimAMApprovalStatus;
            ReimAMIsEditable = (jsonObj[i].ReimAMIsEditable == "True");
            ReimSMStatus = jsonObj[i].ReimSMApprovalStatus;
            ReimSMIsEditable = (jsonObj[i].ReimSMIsEditable == "True");
            ReimRTLStatus = jsonObj[i].ReimRTLApprovalStatus;
            ReimRTLIsEditable = (jsonObj[i].ReimRTLIsEditable == "True");
            ReimSFEStatus = jsonObj[i].ReimSFEApprovalStatus;
            ReimSFEIsEditable = (jsonObj[i].ReimSFEIsEditable == "True");

            // Reimbursment Approval 


            //var IsEditable = (jsonObj[i].IsEditable == "True");
            //if (jsonObj[i].EmployeeId == jsonObj[i].SessionEmployeeId || IsEditable) {
            if (jsonObj[i].EmployeeId == jsonObj[i].SessionEmployeeId) {

                if (jsonObj[i].AMApprovalStatus != "NotRequired") {
                    $('#Level5Approval').show();
                    $('#Level5ApprovalAction').val(jsonObj[i].AMApprovalStatus);
                    $('#Level5ApprovalRemarks').val(jsonObj[i].AMApprovalComment);
                    $('#Level5ApprovalAmount').val(jsonObj[i].AMApprovalAmount);
                    $('#Level5ApprovalDate').text((jsonObj[i].AMApprovalDate == "") ? "-" : jsonObj[i].AMApprovalDate);


                }
                if (jsonObj[i].SMApprovalStatus != "NotRequired") {
                    $('#Level4Approval').show();
                    $('#Level4ApprovalAction').val(jsonObj[i].SMApprovalStatus);
                    $('#Level4ApprovalRemarks').val(jsonObj[i].SMApprovalComment);
                    $('#Level4ApprovalAmount').val(jsonObj[i].SMApprovalAmount);
                    $('#Level4ApprovalDate').text((jsonObj[i].SMApprovalDate == "") ? "-" : jsonObj[i].SMApprovalDate);
                }
                if (jsonObj[i].RTLApprovalStatus != "NotRequired") {
                    $('#Level3Approval').show();
                    $('#Level3ApprovalAction').val(jsonObj[i].RTLApprovalStatus);
                    $('#Level3ApprovalRemarks').val(jsonObj[i].RTLApprovalComment);
                    $('#Level3ApprovalAmount').val(jsonObj[i].RTLApprovalAmount);
                    $('#Level3ApprovalDate').text((jsonObj[i].RTLApprovalDate == "") ? "-" : jsonObj[i].RTLApprovalDate);
                }
                if (jsonObj[i].SFEApprovalStatus != "NotRequired") {
                    $('#Level2Approval').show();
                    $('#Level2ApprovalAction').val(jsonObj[i].SFEApprovalStatus);
                    $('#Level2ApprovalRemarks').val(jsonObj[i].SFEApprovalComment);
                    $('#Level2ApprovalAmount').val(jsonObj[i].SFEApprovalAmount);
                    $('#Level2ApprovalDate').text((jsonObj[i].SFEApprovalDate == "") ? "-" : jsonObj[i].SFEApprovalDate);
                }

                // Reimbursment Approval
                //if (jsonObj[i].ReimAMApprovalStatus != "Approved") {
                //    $('#Level5ReimbursApprovalSubmit').show();
                //}
                //if (jsonObj[i].ReimSMApprovalStatus != "NotRequired") {
                //    $('#Level4ReimbursApprovalSubmit').show();
                //}
                //if (jsonObj[i].ReimRTLApprovalStatus != "NotRequired") {
                //    $('#Level3ReimbursApprovalSubmit').show();

                //}
                //if (jsonObj[i].ReimSFEApprovalStatus != "NotRequired") {
                //    $('#Level2ReimbursApprovalSubmit').show();
                //}


                // Reimbursment Approval
            }
            else {
                // Reimbursment Approval
                if (jsonObj[i].ReimAMApprovalStatus != "") {

                    if (jsonObj[i].SessionEmployeeId == jsonObj[i].ReimAMEmployeeID) {
                        IsEditable = ReimAMIsEditable;
                        if (!(jsonObj[i].IsEditable == "True")) {
                            if (jsonObj[i].ReimAMApprovalStatus == "Pending" || jsonObj[i].ReimAMApprovalStatus == "Discussion" || (jsonObj[i].ReimAMApprovalStatus == "Rejected" && $('#labelStatus')[0].innerHTML == "ReSubmitted")) {

                                $('#Level5ReimbursApprovalSubmit').show();
                                $('#Level5ApprovalAction').attr("disabled", false);
                            }
                        }

                    }
                }
                if (jsonObj[i].ReimSMApprovalStatus != "") {
                    $('#Level4Approval').show();
                    $('#Level4ApprovalAction').val(jsonObj[i].ReimSMApprovalStatus);
                    if (jsonObj[i].SessionEmployeeId == jsonObj[i].ReimSMEmployeeID) {
                        IsEditable = ReimSMIsEditable;
                        if (!(jsonObj[i].IsEditable == "True")) {
                            if (jsonObj[i].ReimAMApprovalStatus == "Approved" || jsonObj[i].ReimAMApprovalStatus == "") {
                                if (jsonObj[i].ReimSMApprovalStatus == "Pending" || jsonObj[i].ReimSMApprovalStatus == "Discussion" || (jsonObj[i].ReimSMApprovalStatus == "Rejected" && $('#labelStatus')[0].innerHTML == "ReSubmitted")) {
                                    $('#Level4ReimbursApprovalSubmit').show();
                                    $('#Level4ApprovalAction').attr("disabled", false);
                                }
                            }
                        }

                    }
                }
                if (jsonObj[i].ReimRTLApprovalStatus != "") {
                    $('#Level3Approval').show();

                    if (jsonObj[i].SessionEmployeeId == jsonObj[i].ReimRTLEmployeeID) {
                        IsEditable = ReimRTLIsEditable;
                        if (!(jsonObj[i].IsEditable == "True")) {
                            if (jsonObj[i].ReimAMApprovalStatus == "Approved" || jsonObj[i].ReimAMApprovalStatus == "") {
                                if (jsonObj[i].ReimSMApprovalStatus == "Approved" || jsonObj[i].ReimSMApprovalStatus == "") {
                                    if (jsonObj[i].ReimRTLApprovalStatus == "Pending" || jsonObj[i].ReimRTLApprovalStatus == "Discussion" || (jsonObj[i].ReimRTLApprovalStatus == "Rejected" && $('#labelStatus')[0].innerHTML == "ReSubmitted")) {
                                        $('#Level3ReimbursApprovalSubmit').show();
                                        $('#Level3ApprovalAction').attr("disabled", false);
                                    }
                                }
                            }
                        }

                    }
                }
                if (jsonObj[i].ReimSFEApprovalStatus != "") {

                    if (jsonObj[i].SessionEmployeeId == jsonObj[i].ReimSFEEmployeeID) {
                        IsEditable = ReimSFEIsEditable;
                        if (!(jsonObj[i].IsEditable == "True")) {
                            if (jsonObj[i].ReimAMApprovalStatus == "Approved" || jsonObj[i].ReimAMApprovalStatus == "") {
                                if (jsonObj[i].ReimSMApprovalStatus == "Approved" || jsonObj[i].ReimSMApprovalStatus == "") {
                                    if (jsonObj[i].ReimRTLApprovalStatus == "Approved" || jsonObj[i].ReimRTLApprovalStatus == "") {
                                        if (jsonObj[i].ReimSFEApprovalStatus == "Pending" || jsonObj[i].ReimSFEApprovalStatus == "Discussion" || (jsonObj[i].ReimSFEApprovalStatus == "Rejected" && $('#labelStatus')[0].innerHTML == "ReSubmitted")) {
                                            $('#Level2ReimbursApprovalSubmit').show();
                                            $('#Level2ApprovalAction').attr("disabled", false);
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
                // Reimbursment Approval

                $('#submit_button').hide();
                $('#saveExpenseReport').hide();
                if (jsonObj[i].AMApprovalStatus != "NotRequired") {
                    $('#Level5Approval').show();
                    $('#Level5ApprovalAction').val(jsonObj[i].AMApprovalStatus);
                    $('#Level5ApprovalRemarks').val(jsonObj[i].AMApprovalComment);
                    $('#Level5ApprovalAmount').val(jsonObj[i].AMApprovalAmount);
                    $('#Level5ApprovalDate').text((jsonObj[i].AMApprovalDate == "") ? "-" : jsonObj[i].AMApprovalDate);
                    if (jsonObj[i].SessionEmployeeId == jsonObj[i].AMEmployeeID) {
                        IsEditable = AMIsEditable;
                        if (!(jsonObj[i].IsEditable == "True")) {
                            if (jsonObj[i].AMApprovalStatus == "Pending" || jsonObj[i].AMApprovalStatus == "Discussion" || (jsonObj[i].AMApprovalStatus == "Rejected" && $('#labelStatus')[0].innerHTML == "ReSubmitted")) {
                                $('#Level5ApprovalAction').attr("disabled", false);
                                $('#Level5ApprovalRemarks').attr("disabled", false);
                                $('#Level5ApprovalAmount').attr("disabled", false);
                                $('#Level5ApprovalDate').attr("disabled", false);
                                $('#Level5ApprovalDate').text();
                                $('#Level5ApprovalSubmit').show();
                            }
                        }
                        $('#MiscExpense').attr("disabled", true);
                        $('#ExpenseNote').attr("disabled", true);
                    }
                }
                if (jsonObj[i].SMApprovalStatus != "NotRequired") {
                    $('#Level4Approval').show();
                    $('#Level4ApprovalAction').val(jsonObj[i].SMApprovalStatus);
                    $('#Level4ApprovalRemarks').val(jsonObj[i].SMApprovalComment);
                    $('#Level4ApprovalAmount').val(jsonObj[i].SMApprovalAmount);
                    $('#Level4ApprovalDate').text((jsonObj[i].SMApprovalDate == "") ? "-" : jsonObj[i].SMApprovalDate);
                    if (jsonObj[i].SessionEmployeeId == jsonObj[i].SMEmployeeID) {
                        IsEditable = SMIsEditable;
                        if (!(jsonObj[i].IsEditable == "True")) {
                            if (jsonObj[i].AMApprovalStatus == "Approved" || jsonObj[i].AMApprovalStatus == "NotRequired") {
                                if (jsonObj[i].SMApprovalStatus == "Pending" || jsonObj[i].SMApprovalStatus == "Discussion" || (jsonObj[i].SMApprovalStatus == "Rejected" && $('#labelStatus')[0].innerHTML == "ReSubmitted")) {
                                    $('#Level4ApprovalAction').attr("disabled", false);
                                    $('#Level4ApprovalRemarks').attr("disabled", false);
                                    $('#Level4ApprovalAmount').attr("disabled", false);
                                    $('#Level4ApprovalDate').attr("disabled", false);
                                    $('#Level4ApprovalDate').text();
                                    $('#Level4ApprovalSubmit').show();
                                }
                            }
                        }
                        $('#MiscExpense').attr("disabled", true);
                        $('#ExpenseNote').attr("disabled", true);
                    }
                }
                if (jsonObj[i].RTLApprovalStatus != "NotRequired") {
                    $('#Level3Approval').show();
                    $('#Level3ApprovalAction').val(jsonObj[i].RTLApprovalStatus);
                    $('#Level3ApprovalRemarks').val(jsonObj[i].RTLApprovalComment);
                    $('#Level3ApprovalAmount').val(jsonObj[i].RTLApprovalAmount);
                    $('#Level3ApprovalDate').text((jsonObj[i].RTLApprovalDate == "") ? "-" : jsonObj[i].RTLApprovalDate);
                    if (jsonObj[i].SessionEmployeeId == jsonObj[i].RTLEmployeeID) {
                        IsEditable = RTLIsEditable;
                        if (!(jsonObj[i].IsEditable == "True")) {
                            if (jsonObj[i].AMApprovalStatus == "Approved" || jsonObj[i].AMApprovalStatus == "NotRequired") {
                                if (jsonObj[i].SMApprovalStatus == "Approved" || jsonObj[i].SMApprovalStatus == "NotRequired") {
                                    if (jsonObj[i].RTLApprovalStatus == "Pending" || jsonObj[i].RTLApprovalStatus == "Discussion" || (jsonObj[i].RTLApprovalStatus == "Rejected" && $('#labelStatus')[0].innerHTML == "ReSubmitted")) {
                                        $('#Level3ApprovalAction').attr("disabled", false);
                                        $('#Level3ApprovalRemarks').attr("disabled", false);
                                        $('#Level3ApprovalAmount').attr("disabled", false);
                                        $('#Level3ApprovalDate').attr("disabled", false);
                                        $('#Level3ApprovalDate').text();
                                        $('#Level3ApprovalSubmit').show();
                                    }
                                }
                            }
                        }
                        $('#MiscExpense').attr("disabled", true);
                        $('#ExpenseNote').attr("disabled", true);
                    }
                }
                if (jsonObj[i].SFEApprovalStatus != "NotRequired") {
                    $('#Level2Approval').show();
                    $('#Level2ApprovalAction').val(jsonObj[i].SFEApprovalStatus);
                    $('#Level2ApprovalRemarks').val(jsonObj[i].SFEApprovalComment);
                    $('#Level2ApprovalAmount').val(jsonObj[i].SFEApprovalAmount);
                    $('#Level2ApprovalDate').text((jsonObj[i].SFEApprovalDate == "") ? "-" : jsonObj[i].SFEApprovalDate);
                    if (jsonObj[i].SessionEmployeeId == jsonObj[i].SFEEmployeeID) {
                        IsEditable = SFEIsEditable;
                        if (!(jsonObj[i].IsEditable == "True")) {
                            if (jsonObj[i].AMApprovalStatus == "Approved" || jsonObj[i].AMApprovalStatus == "NotRequired") {
                                if (jsonObj[i].SMApprovalStatus == "Approved" || jsonObj[i].SMApprovalStatus == "NotRequired") {
                                    if (jsonObj[i].RTLApprovalStatus == "Approved" || jsonObj[i].RTLApprovalStatus == "NotRequired") {
                                        if (jsonObj[i].SFEApprovalStatus == "Pending" || jsonObj[i].SFEApprovalStatus == "Discussion" || (jsonObj[i].SFEApprovalStatus == "Rejected" && $('#labelStatus')[0].innerHTML == "ReSubmitted")) {
                                            $('#Level2ApprovalAction').attr("disabled", false);
                                            $('#Level2ApprovalRemarks').attr("disabled", false);
                                            $('#Level2ApprovalAmount').attr("disabled", false);
                                            $('#Level2ApprovalDate').attr("disabled", false);
                                            $('#Level2ApprovalDate').text();
                                            $('#Level2ApprovalSubmit').show();

                                            $('#saveExpenseReport').show();
                                            $('#BikeDeduction').attr("disabled", false);
                                            $('#CellPhoneBillAmountCorrection').attr("disabled", false);
                                            $('#MiscExpense').attr("disabled", false);
                                            //$('#ExpenseNote').attr("disabled", true);
                                        }
                                    }
                                }
                            }
                        }
                        //$('#MiscExpense').attr("disabled", false);
                        $('#ExpenseNote').attr("disabled", true);
                    }
                }
            }



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
                var institutionAll = '#txtiba' + row
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
                    InstitutionAllowance: 0,
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
                alert("Expense Report has been saved Successfully");
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
    CityID = [];
    CityName = [];
    var jsonObjNew = $.parseJSON(response.d);
    if (jsonObjNew != null) {
        $.each(jsonObjNew, function (i, tweet) {
            //$(fromid).append("<option value='" + jsonObjNew[i].ID + "'>" + jsonObjNew[i].City + "</option>");
            CityID.push(jsonObjNew[i].ID);
            CityName.push(jsonObjNew[i].City);
        });
    }

}

function FillAttachmentGrid(MonthDay, DailyID, row) {
    $.ajax({
        type: "POST",
        url: "EditExpense.asmx/GetAttachmentDayWise",
        contentType: "application/json; charset=utf-8",
        data: '{"EmployeeId":' + EmployeeId + ',"MonthDay":"' + MonthDay + '","DailyID":"' + DailyID + '"}',
        success: function (response) {
            var val = '';
            var table = '';
            $('#AttachmentTableDiv').empty();

            table = '<table id="AttachmentTable" class="table table-hover" style="width: 100% !important;">'
            + '<thead>'
            + '<tr>'
            + '<th>Reason</th>'
            + '<th>Comment</th>'
            + '<th>Amount</th>'
            //+ '<th>Attachement</th>'
            + '<th>Edit</th>'
            + '<th>Delete</th>'
            + '<th>View Image</th>'
            + '</tr></thead><tbody>';

            if (response.d != null && response.d != '') {
                jsonObj = $.parseJSON(response.d);
                for (var i = 0; i < jsonObj.length; i++) {

                    var btnEdit = "<button class=' btn btn-danger' type='Button' onClick=EditAttach(\"" + jsonObj[i].ID + "\",'" + row + "')>Edit</button>";
                    var btnDelete = "<button class=' btn btn-warning' type='Button' onClick=DeleteAttach(\"" + jsonObj[i].ID + "\",'" + row + "')>Delete</button>";
                    var btnView = '<a data-toggle="modal" href="#myModal2" class="btn btn-primary" onClick=attached(' + jsonObj[i].ID + ')>View</a>';
                    

                    val += '<tr>'
                    + '<td>' + jsonObj[i].Activitytype + '</td>'
                    + '<td>' + jsonObj[i].Comment + '</td>'
                    + '<td>' + jsonObj[i].Amount + '</td>'
                    //+ '<td><a href="' + jsonObj[i].Attachment_name + '" download><img src="' + jsonObj[i].Attachment_name + '" alt="' + jsonObj[i].Img + '" style="width:100px; height:100px; object-fit: contain;"></a></td>'
                    + '<td>' + btnEdit + '</td>'
                    + '<td>' + btnDelete + '</td>'
                    + '<td>' + btnView + '</td>'
                    + '</tr>';
                }
            }
           
            $('#AttachmentTableDiv').append(table + val + '</tbody></table>')
            $i("#AttachmentTable").DataTable();
        },
        error: onError,
        cache: false,
        async: false
    });
}

var pkID;
function EditAttach(ID, row) {
    $.ajax({
        type: "POST",
        url: "EditExpense.asmx/EditAttach",
        contentType: "application/json; charset=utf-8",
        data: '{"ID":' + ID + '}',
        success: function (response) {
            var data = response.d.split("~");
       
            //var data = response.d;
            if (data[0] != null && data[0] != '') {
                jsonObj = $.parseJSON(data[0]);
                $("#activity").val(jsonObj[0].fk_ActivityId);
                $("#amount").val(jsonObj[0].Amount);
                $("#comment").val(jsonObj[0].Comment);
                //

                $('#btnUpdate').show();
                $('#btnsave').hide();

                pkID = jsonObj[0].ID

                //$("#btnUpdate").click(updateData(jsonObj[0].ID));
                //document.getElementById
                //$()
                //document.getElementById('btnUpdate').setAttribute("onclick", updateData(jsonObj[0].ID));
                //$i("#tolltaxattach" + row + "").val(jsonObj[0].Attachment_name)
            }
            var data1 = "";
            $('#OldUpload').empty();
            if (data[1] != null && data[1] != '') {
                jsonObj = $.parseJSON(data[1]);
                for (var i = 0; i < jsonObj.length; i++) {
                    data1 += '<div class="col-sm-2 custom-file-label mb-2 col-sm-2 control-label tolltax" style="border-radius: 3px; border: 1px solid;padding: 8px;margin: 5px;" id=' + "File" + jsonObj[i].ID + '>' +
                         " <span style='float: right;margin: -6px 0px;cursor: pointer;font-weight: 600;' onClick='DeleteOldAttach(" + jsonObj[i].ID + ")'>X</span>" +
                        '<img src="' + jsonObj[i].Attachment_name + '"style="width: auto;height: auto;max-width: 90px;">' +
            "</div>";
                }
                $('#OldUpload').append(data1);
                $('#DivOldUpload').show();

            }
            $("#btnUpdate").click(function () {
                updateData(pkID);
            });
        },
        error: onError,
        cache: false,
        async: false
    });
}

function updateData(ID) {
  
    var x = document.getElementById("imgUpload").querySelectorAll(".image-upload");
    formData = new FormData();
    for (var i = 0; i < x.length; i++) {
        var id = x[i].id;
        var tolltaxattach = '#' + id;
        var uploadedFiles3 = $(tolltaxattach)[0].files;
        var validattach = '';

        if (uploadedFiles3.length > 0) {
            //for (var i = 0; i < uploadedFiles3.length; i++) {
            toltxext = uploadedFiles3[0].name.split('.');
            if (toltxext[1] != 'jpeg' && toltxext[1] != 'jpg' && toltxext[1] != 'PNG' && toltxext[1] != 'png') {
                validattach = " Please Select Only Image in PNG or JPG Format";
            }
            else {
                ImgFileName += uploadedFiles3[0].name + '~';
                Filedata.push(uploadedFiles3[0])

                formData.append(ID + ':' + uploadedFiles3[0].name + ':' + $('#amount').val() + ':' + $('#comment').val() + ':' + $('#activity').val() + ':' + "" + ':' + "" + ':' + "update", uploadedFiles3[0]);
            }
            //}

            ImgFileName = ImgFileName.substring(0, ImgFileName.length - 1);
            //ImgFile=ImgFile.substring(0, ImgFile.length - 1);

        }
        else {
            formData.append(ID + ':' + "" + ':' + $('#amount').val() + ':' + $('#comment').val() + ':' + $('#activity').val() + ':' + "" + ':' + "" + ':' + "update", "");
            //alert("Please Attach the Image");
            //return;
        }
    }

    if (validattach == " Please Select Only Image in PNG or JPG Format") {
        swal(
          'alert!',
           validattach,
           'success'
            );
        //alert(validattach);
        return;
    }
    else if ($('#activity').val() == '-1') {
        swal(
                 'alert!',
                  'Please Select Other Activities',
                  'success'
                   );
        //alert('Please Select Other Activities');
        return;
    }
    else if ($('#amount').val() == '' || $('#amount').val() == null) {
        swal('alert!', 'Please Enter Other Amount', 'error');
        //alert("Please Enter Other Amount");
        return;
    }
    else if (Number($('#amount').val()) <= 0) {
        swal('alert!', 'Please Enter Greater than Zero Amount', 'error');
        //alert("Please Enter Greater than Zero Amount");
        return;
    }
    else if ($('#comment').val() == '' || $('#comment').val() == null) {
        swal('alert!', 'Please Enter Comment', 'error');
        //alert("Please Enter Comment");
        return;
    }

    $i.ajax({
        url: '../Handler/ExpenseHandler.ashx?Type=UpdateAttach',
        method: 'post',
        contentType: false,
        processData: false,
        data: formData,
        success: function (data, response) {
            if (data != null) {
                swal('alert!', 'Daily Attachement has been Updated Successfully', 'success');
                //alert('Daily Attachement has been Updated Successfully');
                fillEmpDetails(MonthOfExpense);
                fillGrid();
                $('#btnsave').show();
                $('#btnUpdate').hide();
            }
        },
        error: onError,
        cache: false,
        async: true,
        beforeSend: startingAjaxNew,
        complete: ajaxCompletedNew
    });
}


function attached(ID) {
    $.ajax({
        type: "POST",
        url: "EditExpense.asmx/ViewImagess",
        data: "{'ID':'" + ID + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessViewImage,
        error: onError,
        cache: false,
        async: false,
        beforeSend: startingAjax,
        complete: ajaxCompleted
    });
}


//var OnSuccessViewImage2 = function (response) {
//    $2('#divConfirmation').modal('show');
//    $(".taxattach").html("");

//    jsonObj = $.parseJSON(response.d);
//    if (jsonObj != "") {
//        $(".taxattach").append('<div class="row" id="Rows"></div>');

//        for (var i = 0; i < jsonObj.length; i++) {
//            $(".tax").html("");
//            $('#Rows').append('<div class="col-sm-6">' +
//                '<a href="' + jsonObj[i].Attachment_name + '" download><img src="' + jsonObj[i].Attachment_name + '" alt="Image Not Sync" style="width:250px;height:250px;"></a>' +
//                '</div>');
//        }
//    }
//}
//var OnSuccessViewImage2 = function (response) {
//    debugger;
//    $i('#myModal2').modal('show');
//    $(".taxattach").html("");

//    jsonObj = $.parseJSON(response.d);
//    if (jsonObj != "") {
//        $(".taxattach").append('<div class="row" id="Rows"></div>');

//        for (var i = 0; i < jsonObj.length ; i++) {
//            $(".tax").html("");
//            $('#Rows').append('<div class="col-sm-6">' +
//                '<a href="' + jsonObj[i].Attachment_name + '" download><img src="' + jsonObj[i].Attachment_name + '" alt="Image Not Sync" style="width:250px;height:250px;"></a>' +
//                '</div>');
//        }
//    }
//}



var OnSuccessViewImage2 = function (response) {
    //$i('#myModal2').modal('show');
  
    $i('#divConfirmation').modal('show');
    $(".taxattach").html("");

    jsonObj = $.parseJSON(response.d);
    if (jsonObj != "") {
        $(".taxattach").append('<div class="row" id="Rows"></div>');

        for (var i = 0; i < jsonObj.length ; i++) {
            $(".tax").html("");
            $('#Rows').append('<div class="col-sm-6">' +
                '<a href="' + jsonObj[i].Attachment_name + '" download><img src="' + jsonObj[i].Attachment_name + '" alt="Image Not Sync" style="width:250px;height:250px;"></a>' +
                '</div>');
        }
    }
    
}





function DeleteOldAttach(ID) {
    swal({
        title: "Reject",
        text: "Are you sure you want to delete this image?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "No, cancel Please!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
function (isConfirm) {
    if (isConfirm) {
        $.ajax({
            type: "POST",
            url: "EditExpense.asmx/DeleteAttach",
            contentType: "application/json; charset=utf-8",
            data: '{"ID":' + ID + '}',
            success: function (response) {
                debugger;
                if (response.d == 'Success') {
                    var DivID = '#File' + ID;
                    $(DivID).remove();
                    swal('alert!', 'Image Deleted Successfully', 'success');
                }
            },

            error: onError,
            cache: false,
            async: false
        });
    } else {
        swal("Cancelled", "Request has been cancelled:)", "error");
    }
});
}





function DeleteAttach(ID) {
    swal({
        title: "Reject",
        text: "Are you sure you want to delete this image?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "No, cancel Please!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
function (isConfirm) {
    if (isConfirm) {
        $.ajax({
            type: "POST",
            url: "EditExpense.asmx/DeleteAttachExpense",
            contentType: "application/json; charset=utf-8",
            data: '{"ID":' + ID + '}',
            success: function (response) {
                debugger;
                if (response.d == 'Success') {
                    var DivID = '#File' + ID;
                    $(DivID).remove();
                    swal('alert!', 'Image Deleted Successfully', 'success');
                }
            },

            error: onError,
            cache: false,
            async: false
        });
    } else {
        swal("Cancelled", "Request has been cancelled:)", "error");
    }
});
}





function initImageUpload(box) {
    let uploadField = box.querySelector('.image-upload');

    uploadField.addEventListener('change', getFile);

    function getFile(e) {
        let file = e.currentTarget.files[0];
        checkType(file);
    }

    function previewImage(file) {
        let thumb = box.querySelector('.js--image-preview'),
            reader = new FileReader();

        reader.onload = function () {
            thumb.style.backgroundImage = 'url(' + reader.result + ')';
        }
        reader.readAsDataURL(file);
        thumb.className += ' js--no-default';
    }

    function checkType(file) {
        let imageType = /image.*/;
        if (!file.type.match(imageType)) {
            throw 'Datei ist kein Bild';
        } else if (!file) {
            throw 'Kein Bild gewählt';
        } else {
            previewImage(file);
        }
    }

}


/// drop-effect
function initDropEffect(box) {
    let area, drop, areaWidth, areaHeight, maxDistance, dropWidth, dropHeight, x, y;

    // get clickable area for drop effect
    area = box.querySelector('.js--image-preview');
    area.addEventListener('click', fireRipple);

    function fireRipple(e) {
        area = e.currentTarget
        // create drop
        if (!drop) {
            drop = document.createElement('span');
            drop.className = 'drop';
            this.appendChild(drop);
        }
        // reset animate class
        drop.className = 'drop';

        // calculate dimensions of area (longest side)
        areaWidth = getComputedStyle(this, null).getPropertyValue("width");
        areaHeight = getComputedStyle(this, null).getPropertyValue("height");
        maxDistance = Math.max(parseInt(areaWidth, 10), parseInt(areaHeight, 10));

        // set drop dimensions to fill area
        drop.style.width = maxDistance + 'px';
        drop.style.height = maxDistance + 'px';

        // calculate dimensions of drop
        dropWidth = getComputedStyle(this, null).getPropertyValue("width");
        dropHeight = getComputedStyle(this, null).getPropertyValue("height");

        // calculate relative coordinates of click
        // logic: click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center
        x = e.pageX - this.offsetLeft - (parseInt(dropWidth, 10) / 2);
        y = e.pageY - this.offsetTop - (parseInt(dropHeight, 10) / 2) - 30;

        // position drop and animate
        drop.style.top = y + 'px';
        drop.style.left = x + 'px';
        drop.className += ' animate';
        e.stopPropagation();

    }
}

function FillReimbresmentGrid(MonthDay, DailyId, row) {
    $.ajax({
        type: "POST",
        url: "EditExpense.asmx/GetReimbursementDayWise",
        contentType: "application/json; charset=utf-8",
        data: '{"EmployeeId":' + EmployeeId + ',"MonthDay":"' + MonthDay + '","MonthlyExpenseId":' + MonthlyExpenseId + '}',
        success: function (response) {
            var val = '';
            var table = '';
            $('#ReimburseTableDiv').empty();

            table = '<table id="ReimburseTable" class="table table-hover" style="width: 100% !important;">'
            + '<thead>'
            + '<tr>'
            + '<th>Reason</th>'
            + '<th>Comment</th>'
            + '<th>Amount</th>'
            //+ '<th>Attachement</th>'
            + '<th>Edit</th>'
            + '<th>Delete</th>'
            + '<th>View Image</th>'
            + '</tr></thead><tbody>';
            debugger;
            if (response.d != null && response.d != '') {
                jsonObj = $.parseJSON(response.d);
                for (var i = 0; i < jsonObj.length; i++) {

                    var btnEdit = "<button class=' btn btn-danger' type='Button' onClick=EditRembresment(\"" + jsonObj[i].ID + "\",'" + row + "')>Edit</button>";
                    var btnDelete = "<button class=' btn btn-warning' type='Button' onClick=DeleteReiembresment(\"" + jsonObj[i].ID + "\",'" + row + "')>Delete</button>";
                    var btnView = '<a data-toggle="modal" href="#myModal2" class="btn btn-primary" onClick=attached(' + jsonObj[i].ID + ')>View</a>';


                    val += '<tr>'
                    + '<td>' + jsonObj[i].Reason + '</td>'
                    + '<td>' + jsonObj[i].FeedBack + '</td>'
                    + '<td>' + jsonObj[i].Amount + '</td>'
                    //+ '<td><a href="' + jsonObj[i].Attachment_name + '" download><img src="' + jsonObj[i].Attachment_name + '" alt="' + jsonObj[i].Img + '" style="width:100px; height:100px; object-fit: contain;"></a></td>'
                    + '<td>' + btnEdit + '</td>'
                    + '<td>' + btnDelete + '</td>'
                    + '<td>' + btnView + '</td>'
                    + '</tr>';
                }
            }
            debugger
            $('#ReimburseTableDiv').append(table + val + '</tbody></table>')
            $i("#ReimburseTable").DataTable();
        },
        error: onError,
        cache: false,
        async: false
    });
}

var pkID;
function EditRembresment(ID, row) {
    $.ajax({
        type: "POST",
        url: "EditExpense.asmx/EditReiembres",
        contentType: "application/json; charset=utf-8",
        data: '{"ID":' + ID + '}',
        success: function (response) {
            var data = response.d.split("~");
            debugger
            //var data = response.d;
            if (data[0] != null && data[0] != '') {
                jsonObj = $.parseJSON(data[0]);
                $("#activity_Reimbursement").val(jsonObj[0].Reason);
                $("#amount").val(jsonObj[0].Amount);
                $("#comment").val(jsonObj[0].FeedBack);
                //

                $('#btnUpdate').show();
                $('#btnsave').hide();

                pkID = jsonObj[0].ID
                DateExp = jsonObj[0].DateofExpense
                //$("#btnUpdate").click(updateData(jsonObj[0].ID));
                //document.getElementById
                //$()
                //document.getElementById('btnUpdate').setAttribute("onclick", updateData(jsonObj[0].ID));
                //$i("#tolltaxattach" + row + "").val(jsonObj[0].Attachment_name)
            }
            var data1 = "";
            $('#OldUpload').empty();
            if (data[1] != null && data[1] != '') {
                jsonObj = $.parseJSON(data[1]);
                for (var i = 0; i < jsonObj.length; i++) {
                    data1 += '<div class="col-sm-2 custom-file-label mb-2 col-sm-2 control-label tolltax" style="border-radius: 3px; border: 1px solid;padding: 8px;margin: 5px;" id=' + "File" + jsonObj[i].ID + '>' +
                         " <span style='float: right;margin: -6px 0px;cursor: pointer;font-weight: 600;' onClick='DeleteOldAttach(" + jsonObj[i].ID + ")'>X</span>" +
                        '<img src="' + jsonObj[i].Attachment_name + '"style="width: auto;height: auto;max-width: 90px;">' +
            "</div>";
                }
                $('#OldUpload').append(data1);
                $('#DivOldUpload').show();

            }
            $("#btnUpdate").click(function () {
                updateDataReiembres(pkID,DateExp);
            });
        },
        error: onError,
        cache: false,
        async: false
    });
}

function updateDataReiembres(ID,DateExp) {
    debugger;
    var d = new Date(DateExp);
    date = d.format("yyyy-MM-dd");
    var x = document.getElementById("imgUpload").querySelectorAll(".image-upload");
    formData = new FormData();
    for (var i = 0; i < x.length; i++) {
        var id = x[i].id;
        var tolltaxattach = '#' + id;
        var uploadedFiles3 = $(tolltaxattach)[0].files;
        var validattach = '';

        if (uploadedFiles3.length > 0) {
            //for (var i = 0; i < uploadedFiles3.length; i++) {
            toltxext = uploadedFiles3[0].name.split('.');
            if (toltxext[1] != 'jpeg' && toltxext[1] != 'jpg' && toltxext[1] != 'PNG' && toltxext[1] != 'png') {
                validattach = " Please Select Only Image in PNG or JPG Format";
            }
            else {
                ImgFileName += uploadedFiles3[0].name + '~';
                Filedata.push(uploadedFiles3[0])

                formData.append(ID + ':' + uploadedFiles3[0].name + ':' + $('#amount').val() + ':' + $('#comment').val() + ':' + $('#activity_Reimbursement').val() + ':' + "" + ':' + "" + ':' + ':' + EmployeeId + ':' + date + ':' + "update", uploadedFiles3[0]);
            }
            //}

            ImgFileName = ImgFileName.substring(0, ImgFileName.length - 1);
            //ImgFile=ImgFile.substring(0, ImgFile.length - 1);

        }
        else {
            formData.append(ID + ':' + "" + ':' + $('#amount').val() + ':' + $('#comment').val() + ':' + $('#activity_Reimbursement').val() + ':' + "" + ':' + "" + ':' + ':' + EmployeeId + ':' + date + ':' + "update", "");
            //alert("Please Attach the Image");
            //return;
        }
    }

    if (validattach == " Please Select Only Image in PNG or JPG Format") {
        swal(
          'alert!',
           validattach,
           'success'
            );
        //alert(validattach);
        return;
    }
    else if ($('#activity_Reimbursement').val() == '-1') {
        swal(
                 'alert!',
                  'Please Select Other Activities',
                  'success'
                   );
        //alert('Please Select Other Activities');
        return;
    }
    else if ($('#amount').val() == '' || $('#amount').val() == null) {
        swal('alert!', 'Please Enter Other Amount', 'error');
        //alert("Please Enter Other Amount");
        return;
    }
    else if (Number($('#amount').val()) <= 0) {
        swal('alert!', 'Please Enter Greater than Zero Amount', 'error');
        //alert("Please Enter Greater than Zero Amount");
        return;
    }
    else if ($('#comment').val() == '' || $('#comment').val() == null) {
        swal('alert!', 'Please Enter Comment', 'error');
        //alert("Please Enter Comment");
        return;
    }

    $i.ajax({
        url: '../Handler/ExpenseHandler.ashx?Type=UpdateReiembresment',
        method: 'post',
        contentType: false,
        processData: false,
        data: formData,
        success: function (data, response) {
            if (data != null && data =="UPDATE") {
                swal('alert!', 'Daily Attachement has been Updated Successfully', 'success');
                //alert('Daily Attachement has been Updated Successfully');
                fillEmpDetails(MonthOfExpense);
                fillGrid();
                $('#btnsave').show();
                $('#btnUpdate').hide();
            }
            else if (data == "AlreadyExist") {
            swal('Cancelled', 'Daily Reimbursement Already Exists', 'error');

            }


        },
        error: onError,
        cache: false,
        async: true,
        beforeSend: startingAjaxNew,
        complete: ajaxCompletedNew
    });
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function isNumberMinus(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && event.charCode != 45) {
        return false;
    }
    return true;
}


function DeleteReiembresment(ID) {
    swal({
        title: "Reject",
        text: "Are you sure you want to delete this Expense?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "No, cancel Please!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
function (isConfirm) {
    if (isConfirm) {
        $.ajax({
            type: "POST",
            url: "EditExpense.asmx/DeleteReiembresExpense",
            contentType: "application/json; charset=utf-8",
            data: '{"ID":' + ID + '}',
            success: function (response) {
                debugger;
                if (response.d == 'Success') {
                    var DivID = '#File' + ID;
                    $(DivID).remove();
                    swal('alert!', 'Expense Deleted Successfully', 'success');
                }
            },

            error: onError,
            cache: false,
            async: false
        });
    } else {
        swal("Cancelled", "Request has been cancelled:)", "error");
    }
});
}


function exportTableTopdf() {
    debugger
    var HTML_Width = $("#divforpdf").width();
    var HTML_Height = $("#divforpdf").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 6) + (top_left_margin * 5);
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
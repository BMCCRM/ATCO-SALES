var CurrentUserRole;
var EmployeeId;
var _planid;

function pageLoad() {

    $("#dialog").hide();
    $('#dialogProgress').jqmHide();
    getLoggedMIO();
    var cdt = new Date();
    var currentDate = cdt.getDate();
    var currentMonth = cdt.getMonth();
    currentMonth = currentMonth + 1;
    var currentYear = cdt.getFullYear();

    $('#txtDaydate').val(currentMonth + '/' + currentDate + '/' + currentYear);

    $.ajax({
        type: "POST",
        url: "../form/CommonService.asmx/GetCurrentUserRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != "") {
                CurrentUserRole = data.d;
                getdayview_date(currentDate);
            }
        },
        cache: false
    });



    $("#A1").click(function () {

        var options = {};
        $("#pageone").hide("drop", options, 400, callback);
        $("#unPlannedDialog").show("slide", options, 1000, callback);

        UPClear_fields();
    });



    // Onselect Change Doctor Address // 
    $("#dlDoctorsofMR").change(function () {

        var docID = $('#dlDoctorsofMR').val();
        debugger
        $.ajax({
            type: "POST",
            url: "MioPlanning.asmx/GetDoctorAddress",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"doctorId":' + docID + '}',
            success: function (data) {
                debugger
                if (data.d != '') {
                    var das = jsonParse(data.d);
                    $.each(das, function (i, docAd) {
                        $("#txtupaddress").val(docAd.DoctorAddress);
                    });
                }
            },
            sync: false
        });

    });

    //$("#dlDoctorsofMR").change(function () {
    //var selected = $(this).find('select2');
    //$("#txtupterr").val(selected.data('docbrick'));
    //$("#txtupaddress").val(selected.data('docbrick'));
    //$("#txtUnAccountname").val(selected.data('docacc'));
    //$("#UAcctype").val(selected.data('doctype'));
    //$("#UAccSubtype").val(selected.data('docsubtype'));

    //});

    $("#txtSTime").change(function () {
        var selected = $(this).find('option:selected');
        var selectedid = selected.text();
        var startDate = new Date();
        startDate.setHours(selectedid.split(':')[0]);
        startDate.setMinutes(selectedid.split(':')[1]);
        startDate.setSeconds(selectedid.split(':')[2]);
        var endDate = new Date(startDate.getTime() + 30 * 60000);

        var endTime;
        if (endDate.getMinutes().toString().length <= 1) {
            endTime = endDate.getHours() + ":0" + endDate.getMinutes() + ":" + endDate.getSeconds() + "0";
        } else {
            endTime = endDate.getHours() + ":" + endDate.getMinutes() + ":" + endDate.getSeconds() + "0";
        }
        $("#txtEtime").val(endTime);
    });

    $("#txtupSTime").change(function () {
        var selected = $(this).find('option:selected');
        var selectedid = selected.text();
        var startDate = new Date();
        startDate.setHours(selectedid.split(':')[0]);
        startDate.setMinutes(selectedid.split(':')[1]);
        startDate.setSeconds(selectedid.split(':')[2]);
        var endDate = new Date(startDate.getTime() + 15 * 60000);

        var endTime;
        if (endDate.getMinutes().toString().length <= 1) {
            endTime = endDate.getHours() + ":0" + endDate.getMinutes() + ":" + endDate.getSeconds() + "0";
        } else {
            endTime = endDate.getHours() + ":" + endDate.getMinutes() + ":" + endDate.getSeconds() + "0";
        }
        $("#txtupEtime").val(endTime);
    });


    FillProductSku();
    FillProductskuByTeam();
    FillGifts();
    getDoctorsOfMIO();
    FillCallReasons();
    FillActivity();
    AllowOnlyNumeric("txtupsamq1");
    AllowOnlyNumeric("txtupsamq2");
    AllowOnlyNumeric("txtupsamq3");
    AllowOnlyNumeric("txtsamq1");
    AllowOnlyNumeric("txtsamq2");
    AllowOnlyNumeric("txtsamq3");
    AllowOnlyNumeric("txtupgifq1");
    AllowOnlyNumeric("txtgifq1");

}
function AllowOnlyNumeric(id) {
    $('#' + id).keydown(function (e) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which <= 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
    //$('#' + id).keydown(function (e) {
    //    -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) ||
    //    (/65|67|86|88/.test(e.keyCode) && (e.ctrlKey === true ||
    //    e.metaKey === true)) && (!0 === e.ctrlKey || !0 === e.metaKey) ||
    //    35 <= e.keyCode && 40 >= e.keyCode ||
    //    (e.shiftKey || 48 >= e.keyCode || 57 < e.keyCode) &&
    //    (96 > e.keyCode || 105 < e.keyCode) &&
    //    e.preventDefault()
    //});
}

function Pro_Change(id) {
    $('#' + id).next().prop('disabled', $('#' + id).val() == "-1" ? true : false);
    $('#' + id).next().val('');
}

function callback() {

}

function openwindow() {
    var options = {};
    $("#pageone").hide("drop", options, 400, callback);
    $("#dialog").show("slide", options, 1000, callback);
}

function closeWindow() {
    var options = {};
    $("#dialog").hide("drop", options, 400, callback);
    $("#unPlannedDialog").hide("drop", options, 400, callback);
    $("#pageone").show("slide", options, 1000, callback);
    Clear_fields();
    UPClear_fields();
}

function onchange_daytextbox() {
    var dat = $('#txtDaydate').val().split('/')[1];
    getdayview_date(parseInt(dat));
}

function getdayview_date(daynumber) {
    $("#drlist").html('');
    $("#totaldr").html('');

    var planStatus;

    var ddata = $('#txtDaydate').val();
    var myData = "";
    if (CurrentUserRole == "rl6") {
        myData = "{'dateTime':'" + ddata + "','employeeId':'" + EmployeeId + "'}";
    }

    $.ajax({
        type: "POST",
        url: "SchdulerDayView.asmx/GetPlanStatus",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.d != '') {
                var pSresult = jsonParse(data.d);
                planStatus = pSresult[0].CPM_PlanStatus;
            }
        },
        cache: false
    });

    if (planStatus == "Approved") {

        if (CurrentUserRole == "rl6") {
            myData = "{'dateTime':'" + ddata + "','employeeId':'" + EmployeeId + "'}";
        }

        $.ajax({
            type: "POST",
            url: "SchdulerDayView.asmx/GetSchedulerDayView",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.d != '') {
                    var result1 = jsonParse(data.d);
                    var ppp = 0;
                    var tim = "";
                    var tim2 = "";
                    var sa;
                    var date;
                    var cdt = new Date();
                    var currentDate = cdt.getDate();
                    var currentMonth = cdt.getMonth();
                    currentMonth = currentMonth + 1;
                    var currentYear = cdt.getFullYear();

                    date = currentMonth + '/' + currentDate + '/' + currentYear;

                    var exu = "";
                    var drtable = "<table width='100%' cellspacing='0' cellpadding='0' border='0' class='formcss2'><thead><th style='text-align: left;'>" +
                        "<div style='float: left; width: 85px;'>Start time</div>" +
                        "<div style='margin-right: 10px'>End time</div>" +
                    "</th><th>Activity</th><th>Doctor Name</th><th>Class</th><th>Speciality</th><th></th><th></th></thead><tbody>";

                    $.each(result1, function (i, option) {
                        var planid = option.plannerID;
                        var drname = option.DoctorName;
                        var drspeciality = option.Speciality;
                        var drclass = option.Class;
                        var strtTime = option.startdate.split(' ')[1] + ' ' + option.startdate.split(' ')[2];

                        var dates = new Date(date + " " + strtTime);
                        var HHs = dates.getHours();
                        var mins = dates.getMinutes();
                        if (mins < 10) {
                            mins = "0" + mins;
                        }
                        //alert(HH + ":" + mi);
                        strtTime = HHs + ":" + mins + ":00";;
                        var endTime = option.enddate.split(' ')[1] + ' ' + option.enddate.split(' ')[2];

                        var dateE = new Date(date + " " + endTime);
                        var HHe = dateE.getHours();
                        var mine = dateE.getMinutes();
                        if (mine < 10) {
                            mine = "0" + mine;
                        }
                        //alert(HH + ":" + mi);

                        endTime = HHe + ":" + mine + ":00";
                        var isExecuted = option.IsExecuted;
                        var docAddress = option.Address1;
                        var docBrick = option.DoctorBrick;
                        var docCode = option.DocCode;
                        var accntName = option.AccountName;
                        var accntType = option.AccountType;
                        var accntSubType = option.AccountSubType;
                        var activity = option.ActName;
                        var activityID = option.pk_CPA_CallPlannerActivityID;

                        sa = "<div class='addclock' onclick='FillForm(" + planid + ")'></div>";

                        tim = "<div style='float: left;width: 85px;' id='" + planid + "_stime'>" + strtTime + "</div>";
                        tim2 = "<div style='margin-right: 10px' id='" + planid + "_etime'>" + endTime + "</div>";

                        ppp = ppp + 1;
                        drtable += "<tr>";
                        drtable += "<td style='width: 75px!important'>" + tim + tim2 + "</td>";
                        drtable += "<td>" + activity + "</td>";
                        drtable += "<td>" + drname + "</td>";
                        drtable += "<td>" + drclass + "</td>";
                        drtable += "<td>" + drspeciality + "</td>";

                        if (CurrentUserRole == "rl5") {
                            drtable += "<td style='width: 25px'></td>";
                        } else {
                            if (isExecuted == "unExecutedPlan") {
                                if (activity == "Meeting") {

                                    exu = "<div  id='divplan" + planid + "'><span style='font-family:Arial'>Executed</span></div>";
                                }
                                else {
                                    exu = "<div  id='divplan" + planid + "' onclick='FillForm_dayview(" + planid + ")'><input id='btnSave' name='btnSave' type='button' class='btn btn-primary' value='Submit' /></div>";
                                }
                            } else {
                                exu = "<div  id='divplan" + planid + "'><span style='font-family:Arial'>Call Executed</span></div>";
                            }
                            drtable += "<td style='width: 25px'>" + exu + "</td>";
                        }
                        debugger
                        //docaddress, docterritory, docCode, accntName, accntType, accntSubType, docName
                        drtable += "<td style='width: 25px'><input type='hidden' id='hdn" + planid + "' value='" + docAddress + ";" + docBrick + ";" + docCode + ";" + accntName + ";" + accntType + ";" + accntSubType + ";" + drname + ";" + strtTime + ";" + endTime + ";" + activityID + "'></td>";
                        drtable += "</tr>";

                    });
                    drtable += "</table>";

                    $("#totaldr").text("Planned visit today: " + ppp);
                    $("#drlist").prepend($(drtable));
                }
            },
            cache: false

        });
    } else {
        $("#drlist").append("<span>Your plan have not been Approved By Your AM</span>");
    }

}

function UnplannedVisitPopup() {
    $('#divUninformed').jqm({ modal: true, toTop: true });
    $('#divUninformed').jqm();
    $('#divUninformed').jqmShow();
}

function FillForm_dayview(planid) {
    debugger
    _planid = planid;
    var hdnvalue = $("#hdn" + planid).val();
    $("#txtaddress").val(hdnvalue.split(';')[0]);
    $("#txtterr").val(hdnvalue.split(';')[1]);
    $("#txtdrcode").val(hdnvalue.split(';')[2] + " - " + hdnvalue.split(';')[6]);
    $("#txtdate").val($("#txtDaydate").val());

    //$("#txtaccountname").val(hdnvalue.split(';')[3]);
    //$("#txtacounttype").val(hdnvalue.split(';')[4]);
    //$("#txtacountsub").val(hdnvalue.split(';')[5]);
    $("#txtSTime").val(hdnvalue.split(';')[7]);
    $("#txtSTime").prop("disabled", true);
    $("#txtEtime").val(hdnvalue.split(';')[8]);
    $("#txtEtime").prop("disabled", true);
    $("#ddlActivities").val(hdnvalue.split(';')[9]);

    var options = {};
    $("#pageone").hide("drop", options, 400, callback);
    $("#dialog").show("slide", options, 1000, callback);



}

function FillProductSku() {

    var myData = "{'_EmployeeId':'" + EmployeeId + "' }";
    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/FillProduct",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessFillProduct,
        cache: false

    });

}

function onSuccessFillProduct(data) {

    if (data.d != "") {
        var value = '-1';
        var name = 'Select Product';

        $("#pro1").append("<option value='" + value + "'>" + name + "</option>");
        $("#pro2").append("<option value='" + value + "'>" + name + "</option>");
        $("#pro3").append("<option value='" + value + "'>" + name + "</option>");
        $("#pro4").append("<option value='" + value + "'>" + name + "</option>");

        $("#uppro1").append("<option value='" + value + "'>" + name + "</option>");
        $("#uppro2").append("<option value='" + value + "'>" + name + "</option>");
        $("#uppro3").append("<option value='" + value + "'>" + name + "</option>");
        $("#uppro4").append("<option value='" + value + "'>" + name + "</option>");



        //value = '-1';
        //name = 'Select Sample';

        //$("#sam1").append("<option value='" + value + "'>" + name + "</option>");
        //$("#sam2").append("<option value='" + value + "'>" + name + "</option>");
        //$("#sam3").append("<option value='" + value + "'>" + name + "</option>");
        //$("#sam4").append("<option value='" + value + "'>" + name + "</option>");

        //$("#upsam1").append("<option value='" + value + "'>" + name + "</option>");
        //$("#upsam2").append("<option value='" + value + "'>" + name + "</option>");
        //$("#upsam3").append("<option value='" + value + "'>" + name + "</option>");
        //$("#upsam4").append("<option value='" + value + "'>" + name + "</option>");



        $.each(data.d, function (i, tweet) {

            $("#pro1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#pro2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#pro3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#pro4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");

            $("#uppro1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#uppro2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#uppro3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#uppro4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");


            //$("#sam1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            //$("#sam2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            //$("#sam3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            //$("#sam4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");

            //$("#upsam1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            //$("#upsam2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            //$("#upsam3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            //$("#upsam4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");


        });

    }
}


// Add New Method FOr SKU Name Dropdown
function FillProductskuByTeam() {

    var myData = '';
    var myData = "{'pEmployeeId':'" + EmployeeId + "' }";
    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/FillProductskuByTeam",

        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessFillProductskuByTeam,
        cache: false

    });

}

function onSuccessFillProductskuByTeam(data) {

    if (data.d != '' && data.d != '[]') {
        var msg = $.parseJSON(data.d);

        value = '-1';
        name = 'Select Sample';

        $("#sam1").append("<option value='" + value + "'>" + name + "</option>");
        $("#sam2").append("<option value='" + value + "'>" + name + "</option>");
        $("#sam3").append("<option value='" + value + "'>" + name + "</option>");
        $("#sam4").append("<option value='" + value + "'>" + name + "</option>");

        $("#upsam1").append("<option value='" + value + "'>" + name + "</option>");
        $("#upsam2").append("<option value='" + value + "'>" + name + "</option>");
        $("#upsam3").append("<option value='" + value + "'>" + name + "</option>");
        $("#upsam4").append("<option value='" + value + "'>" + name + "</option>");



        for (var i = 0; i < msg.length ; i++) {

            $("#sam1").append("<option value='" + msg[i].SkuId + "'>" + msg[i].SkuName + "</option>");
            $("#sam2").append("<option value='" + msg[i].SkuId + "'>" + msg[i].SkuName + "</option>");
            $("#sam3").append("<option value='" + msg[i].SkuId + "'>" + msg[i].SkuName + "</option>");
            $("#sam4").append("<option value='" + msg[i].SkuId + "'>" + msg[i].SkuName + "</option>");

            $("#upsam1").append("<option value='" + msg[i].SkuId + "'>" + msg[i].SkuName + "</option>");
            $("#upsam2").append("<option value='" + msg[i].SkuId + "'>" + msg[i].SkuName + "</option>");
            $("#upsam3").append("<option value='" + msg[i].SkuId + "'>" + msg[i].SkuName + "</option>");
            $("#upsam4").append("<option value='" + msg[i].SkuId + "'>" + msg[i].SkuName + "</option>");

        }

    }
}

function FillGifts() {
    var myData = '';
    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/FillGifts",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessFillGifts,
        cache: false

    });
}

function onSuccessFillGifts(data) {
    if (data.d != "") {
        var value = '-1';
        var name = 'Select Gift';

        $("#gif1").append("<option value='" + value + "'>" + name + "</option>");
        $("#gifup1").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#gif1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#gifup1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }
}

function getDoctorsOfMIO() {
    var myData = "{'pEmployeeId':'" + EmployeeId + "' }";
    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/LoadunPlannedDoctors",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        success: function (data) {
            if (data.d != '') {
                var das = jsonParse(data.d);
                $.each(das, function (i, tweet) {
                    $("#dlDoctorsofMR").append("<option value='" + tweet.DoctorId + "' data-docbrick='" + tweet.DoctorBrick + "' data-doccode='" + tweet.DoctorCode + "'data-docAcc='" + tweet.AccountName + "'data-docType='" + tweet.AccountType + "'data-docSubType='" + tweet.AccountSubType + "'>" + tweet.DoctorCode + " - " + tweet.DoctorName + "</option>");
                });
            }
        },
        sync: false
    });


}

function getLoggedMIO() {
    $.ajax({
        type: "POST",
        url: "../form/CommonService.asmx/GetCurrentUser",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            EmployeeId = data.d;
        },
        cache: false,
        async: false
    });
}

var FillCallReasons = function () {

    $.ajax({
        type: 'POST',
        url: 'CallReasons.asmx/GetAllReasons',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        async: false,
        success: function (data) {
            if (data.d != '') {
                $("#ddlplanReason").append("<option value='" + -1 + "'>" + "Select Reason" + "</option>");
                $("#upddlplanReason").append("<option value='" + -1 + "'>" + "Select Reason" + "</option>");
                var jsonReslt = jsonParse(data.d);
                $.each(jsonReslt, function (i, reason) {
                    $("#ddlplanReason").append("<option value='" + reason.ReasonId + "'>" + reason.Reason + "</option>");
                    $("#upddlplanReason").append("<option value='" + reason.ReasonId + "'>" + reason.Reason + "</option>");
                });

            }
        }

    });


};

var PlannedSaveCall = function () {


    var leaveStatus = "";
    var date = $("#txtupdate").val();
    var startTime = $("#txtupSTime").val();



    $('#btnplannedDilogOK').hide();

    $('#dialogProgress').jqm({ modal: true, toTop: true });
    $('#dialogProgress').jqm();
    $('#dialogProgress').jqmShow();


    var date = $("#txtdate").val();
    var startTime = $("#txtSTime").val();
    var docDetail = $("#txtdrcode").val();
    var endTime = $("#txtEtime").val();
    var activity = $("#ddlActivities").val();
    var reason = $("#ddlplanReason").val();
    var product1 = $("#pro1").val();
    var product2 = $("#pro2").val();
    var product3 = $("#pro3").val();
    var product4 = $("#pro4").val();
    var p1Notes = $("#txtp1Notes").val();
    var p2Notes = $("#txtp2Notes").val();
    var p3Notes = $("#txtp3Notes").val();
    var p4Notes = $("#txtp4Notes").val();
    var sample1 = $("#sam1").val();
    var sampleQty1 = $("#txtsamq1").val();
    var sample2 = $("#sam2").val();
    var sampleQty2 = $("#txtsamq2").val();
    var sample3 = $("#sam3").val();
    var sampleQty3 = $("#txtsamq3").val();

    var jvflm = $("#chbFLM").is(":checked");
    var jvslm = $("#chbSLM").is(":checked");
    var jvftm = $("#chbFTM").is(":checked");
    var jvbuh = $("#chbBUH").is(":checked");
    var jvgm = $("#chbGM").is(":checked");
    var jvcoo = $("#chbCOO").is(":checked");
    var jvcd = $("#chbCD").is(":checked");
    var jvpm = $("#chbPM").is(":checked");
    var isCoaching = $("#chbCoaching").is(":checked");

    var gift = $("#gif1").val();
    var giftQty = $("#txtgifq1").val();

    var callNotes = $("#txtremarks").val();

    var diff = 0;
    var stt = new Date("November 13, 2013 " + $('#txtSTime').val());
    stt = stt.getTime();

    var endt = new Date("November 13, 2013 " + $('#txtEtime').val());
    endt = endt.getTime();
    if (stt >= endt) {
        onErrorDt();
        $('#dialogProgress').jqmHide();
        return false;
    }



    //Validation Work
    if (date != '') {
        //9/25/2014
        var date2 = new Date();
        var date1 = new Date(date + " " + startTime);
    } else {
        $('#dialogProgress').jqmHide();
        alert("Please provide the DT for the call");

        return false;
    }

    var myData = "";
    myData = "{'date':'" + date + "','employeeId':'" + EmployeeId + "'}";


    $.ajax({
        type: "POST",
        url: "SchdulerDayView.asmx/CheckLeaves",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.d != '') {
                leaveStatus = data.d;
            }
        },
        cache: false
    });

    if (leaveStatus == "Leave Not Marked") {

        if (docDetail == '') {
            $('#dialogProgress').jqmHide();
            alert("Please provide the Doctor Detail for the call");

            return false;
        }

        if (endTime == '' || endTime == null) {
            $('#dialogProgress').jqmHide();
            alert("Please provide the End time of the Call");

            return false;
        }

        if (activity == '-1') {
            $('#dialogProgress').jqmHide();
            alert("Please provide the Activity for the call");

            return false;
        }

        if (sample1 != '-1') {
            if (sampleQty1 == '') {
                $('#dialogProgress').jqmHide();
                alert("Please Provide the sample Quantity for sample 1");
                return false;
            }
        }

        if (sample2 != '-1') {
            if (sampleQty2 == '') {
                $('#dialogProgress').jqmHide();
                alert("Please Provide the sample Quantity for sample 2");
                return false;
            }
        }

        if (sample3 != '-1') {
            if (sampleQty3 == '') {
                $('#dialogProgress').jqmHide();
                alert("Please Provide the sample Quantity for sample 3");
                return false;
            }
        }

        if (gift != '-1') {
            if (giftQty == '') {
                $('#dialogProgress').jqmHide();
                alert("Please Provide the Give away Quantity for Give Away ");
                return false;
            }
        }
        //Validation Work
        var data = "{'isPlanned':'" + _planid + "','date':'" + date + "','startTime':'" + startTime + "','docDetail':'" + docDetail + "','endTime':'" + endTime + "','activity':'" + activity + "','reason':'" + reason + "','product1':'" + product1 + "','product2':'" + product2 + "','product3':'" + product3 + "','product4':'" + product4 + "','sample1':'" + sample1 + "','sampleQty1':'" + sampleQty1 + "','sample2':'" + sample2 + "','sampleQty2':'" + sampleQty2 + "','sample3':'" + sample3 + "','sampleQty3':'" + sampleQty3 + "','jvflm':'" + jvflm + "','jvslm':'" + jvslm + "','jvftm':'" + jvftm + "','jvbuh':'" + jvbuh + "','jvgm':'" + jvgm + "','jvcoo':'" + jvcoo + "','jvcd':'" + jvcd + "','jvpm':'" + jvpm + "','gift':'" + gift + "','giftQty':'" + giftQty + "','callNotes':'" + callNotes + "','employeeId':'" + EmployeeId + "','coaching':'" + isCoaching + "','p1Notes':'" + p1Notes + "','p2Notes':'" + p2Notes + "','p3Notes':'" + p3Notes + "','p4Notes':'" + p4Notes + "'}";
        $.ajax({
            type: 'POST',
            url: 'DayView.asmx/SaveCall',
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.d == "CallSaved") {

                    alert("Call Saved Sucessfully");
                    $('#divplan' + _planid).html('');
                    $('#divplan' + _planid).append('<span style="font-family:Arial">Call Executed</span>');
                    closeWindow();
                    Clear_fields();
                }
                else if (data.d == "Not Allowed") {
                    alert("Date invalid Selection");
                    $('#dialogProgress').jqmHide();
                }
                else if (data.d == "PreeDays") {
                    alert("Calls laters than 36 hours are not acceptable ");
                    $('#dialogProgress').jqmHide();
                }
                else if (data.d == "Already Executed") {
                    alert("Call with selected doctor already executed today");
                    $('#dialogProgress').jqmHide();
                    //closeWindow();
                    Clear_fields();
                }
                else if (data.d == "Call already executed in selected time range") {
                    alert("Call already executed in selected time range ");
                    $('#dialogProgress').jqmHide();
                } else {
                    alert("Error occured ");
                    console.log(data.d);                    
                    $('#dialogProgress').jqmHide();
                }
                $('#btnplannedDilogOK').show();
            },
            async: false
        });





        return true;
    }
    else {
        $('#dialogProgress').jqmHide();
        alert("Call not executed because leave is marked");
        return false;
    }
};

var unPlannedSaveCall = function () {

    var leaveStatus = "";
    var date = $("#txtupdate").val();
    var startTime = $("#txtupSTime").val();





    $('#dialogProgress').jqm({ modal: true, toTop: true });
    $('#dialogProgress').jqm();
    $('#dialogProgress').jqmShow();


    //Validation Work
    if (date != '') {
        //9/25/2014
        var date2 = new Date();
        var date1 = new Date(date + " " + startTime);
        var hours = Math.abs(date1 - date2) / 36e5;
        if (hours > 36) {
            $('#dialogProgress').jqmHide();
            alert("Calls laters than 36 hours are not acceptable ");
            return false;
        }
    } else {
        $('#dialogProgress').jqmHide();
        alert("Please provide the DT for the call");
        return false;
    }

    var myData = "";
    myData = "{'date':'" + date + "','employeeId':'" + EmployeeId + "'}";


    $.ajax({
        type: "POST",
        url: "SchdulerDayView.asmx/CheckLeaves",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.d != '') {
                leaveStatus = data.d;
            }
        },
        cache: false
    });

    if (leaveStatus == "Leave Not Marked") {

        var docDetail = $("#dlDoctorsofMR option:selected").data('doccode') + " - " + $("#dlDoctorsofMR  option:selected").text();

        var endTime = $("#txtupEtime").val();
        var docBrik = $("#txtupterr").val();
        var activity = $("#SelectActivityUP").val();
        var docAddress = $("#txtupaddress").val();
        var reason = $("#upddlplanReason").val();
        var product1 = $("#uppro1").val();
        var p1Notes = $("#txtupp1Notes").val();
        var product2 = $("#uppro2").val();
        var p2Notes = $("#txtupp2Notes").val();
        var product3 = $("#uppro3").val();
        var p3Notes = $("#txtupp3Notes").val();
        var product4 = $("#uppro4").val();
        var p4Notes = $("#txtupp4Notes").val();
        var sample1 = $("#upsam1").val();
        var sampleQty1 = $("#txtupsamq1").val();
        var sample2 = $("#upsam2").val();
        var sampleQty2 = $("#txtupsamq2").val();
        var sample3 = $("#upsam3").val();
        var sampleQty3 = $("#txtupsamq3").val();

        var jvflm = $("#chbupDSM").is(":checked");
        var jvslm = $("#chbupSM").is(":checked");
        var jvftm = $("#chbupFTM").is(":checked");
        var jvbuh = $("#chbupBUH").is(":checked");
        var jvgm = $("#chbupGM").is(":checked");
        var jvcoo = $("#chbupCOO").is(":checked");
        var jvcd = $("#chbupCD").is(":checked");
        var jvpm = $("#chbupPM").is(":checked");
        var isCoaching = $("#chbupCoaching").is(":checked");

        var gift = $("#gifup1").val();
        var giftQty = $("#txtupgifq1").val();

        var callNotes = $("#txtupremarks").val();

        if (docDetail == 'undefined - Select Doctor') {
            $('#dialogProgress').jqmHide();
            alert("Please provide the Doctor Detail for the call");
            return false;
        }

        if (startTime == '-1') {
            $('#dialogProgress').jqmHide();
            alert("Please provide the Start time of the Call");
            return false;
        }

        if (endTime == '-1') {
            $('#dialogProgress').jqmHide();
            alert("Please provide the End time of the Call");
            return false;
        }

        var diff = 0;
        var stt = new Date("November 13, 2013 " + $('#txtupSTime').val());
        stt = stt.getTime();

        var endt = new Date("November 13, 2013 " + $('#txtupEtime').val());
        endt = endt.getTime();
        if (stt >= endt) {
            onErrorDt();
            $('#dialogProgress').jqmHide();
            return false;
        }



        if (activity == '-1') {
            $('#dialogProgress').jqmHide();
            alert("Please provide the Activity of the Call");
            return false;
        }

        //if (product1 != '-1') {
        //    if (p1Notes == '') {
        //        $('#dialogProgress').jqmHide();
        //        alert("Please Provide the notes for product 1");
        //        return false;
        //    }
        //}

        //if (product2 != '-1') {
        //    if (p2Notes == '') {
        //        $('#dialogProgress').jqmHide();
        //        alert("Please Provide the notes for product 2");
        //        return false;
        //    }
        //}

        //if (product3 != '-1') {
        //    if (p3Notes == '') {
        //        $('#dialogProgress').jqmHide();
        //        alert("Please Provide the notes for product 3");
        //        return false;
        //    }
        //}

        //if (product4 != '-1') {
        //    if (p4Notes == '') {
        //        $('#dialogProgress').jqmHide();
        //        alert("Please Provide the notes for product 4");
        //        return false;
        //    }
        //}


        if (sample1 != '-1') {
            if (sampleQty1 == '') {
                $('#dialogProgress').jqmHide();
                alert("Please Provide the sample Quantity for sample 1");
                return false;
            }
        }

        if (sample2 != '-1') {
            if (sampleQty2 == '') {
                $('#dialogProgress').jqmHide();
                alert("Please Provide the sample Quantity for sample 2");
                return false;
            }
        }

        if (sample3 != '-1') {
            if (sampleQty3 == '') {
                $('#dialogProgress').jqmHide();
                alert("Please Provide the sample Quantity for sample 3");
                return false;
            }
        }

        if (gift != '-1') {
            if (giftQty == '') {
                $('#dialogProgress').jqmHide();
                alert("Please Provide the Give away Quantity for Give Away ");
                return false;
            }
        }
        //Validation Work
        var data = "{'isPlanned':'No','date':'" + date + "','startTime':'" + startTime + "','docDetail':'" + docDetail + "','endTime':'" + endTime + "','activity':'" + activity + "','reason':'" + reason + "','product1':'" + product1 + "','product2':'" + product2 + "','product3':'" + product3 + "','product4':'" + product4 + "','sample1':'" + sample1 + "','sampleQty1':'" + sampleQty1 + "','sample2':'" + sample2 + "','sampleQty2':'" + sampleQty2 + "','sample3':'" + sample3 + "','sampleQty3':'" + sampleQty3 + "','jvflm':'" + jvflm + "','jvslm':'" + jvslm + "','jvftm':'" + jvftm + "','jvbuh':'" + jvbuh + "','jvgm':'" + jvgm + "','jvcoo':'" + jvcoo + "','jvcd':'" + jvcd + "','jvpm':'" + jvpm + "','gift':'" + gift + "','giftQty':'" + giftQty + "','callNotes':'" + callNotes + "','employeeId':'" + EmployeeId + "','coaching':'" + isCoaching + "','p1Notes':'" + p1Notes + "','p2Notes':'" + p2Notes + "','p3Notes':'" + p3Notes + "','p4Notes':'" + p4Notes + "'}";
        $.ajax({

            type: 'POST',
            url: 'DayView.asmx/SaveCall',
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                debugger
                if (data.d == "CallSaved") {
                    alert("Call Saved Sucessfully");
                    closeWindow();
                    UPClear_fields();
                }
                else if (data.d == "Call already executed in selected time range") {
                    alert("Call already executed in selected time range");
                    $('#dialogProgress').jqmHide();
                    // closeWindow();
                    UPClear_fields();
                }
                else if (data.d == "Already Executed") {
                    alert("Call with selected doctor already executed today");
                    $('#dialogProgress').jqmHide();
                    //closeWindow();
                    UPClear_fields();
                }


                else if (data.d == "Planned") {
                    alert("Doctor Already Planned");
                    closeWindow(); 
                    UPClear_fields();
                }
                else if (data.d == "Not Allowed") {
                    alert("Date invalid Selection");
                    $('#dialogProgress').jqmHide();
                }
                else if (data.d == "PreeDays") {
                    alert("Calls laters than 36 hours are not acceptable ");
                    $('#dialogProgress').jqmHide();
                } else {
                    console.log(data.d);
                    $('#dialogProgress').jqmHide();
                }


            },
            async: false
        });


        return true;
    }
    else {
        $('#dialogProgress').jqmHide();
        alert("Call not executed because leave is marked");
        return false;
    }
};

var FillActivity = function () {

    var myData = '';
    $.ajax({
        type: "POST",
        url: "SchdulerDayView.asmx/GetActivity",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.d != "") {
                var jsonparsed = jsonParse(data.d);
                var value = '-1';
                var name = 'Select Activity';
                $("#ddlActivities").append("<option value='" + value + "'>" + name + "</option>");
                $("#SelectActivityUP").append("<option value='" + value + "'>" + name + "</option>");
                $.each(jsonparsed, function (i, tweet) {
                    $("#ddlActivities").append("<option value='" + tweet.pk_CPA_CallPlannerActivityID + "'>" + tweet.CPA_Name + "</option>");
                    $("#SelectActivityUP").append("<option value='" + tweet.pk_CPA_CallPlannerActivityID + "'>" + tweet.CPA_Name + "</option>");
                });
            }
        },
        cache: false

    });
};

function UPClear_fields() {
    $("#txtupSTime").val("-1");
    $("#txtupEtime").val("-1");
    $("#dlDoctorsofMR").val("-1");
    $("#txtupterr").val("");
    $("#SelectActivityUP").val("-1");
    $("#upddlplanReason").val("-1");
    $("#uppro1").val("-1");
    $("#txtupp1Notes").val("");
    $("#txtupp1Notes").attr("disabled", true);
    $("#uppro2").val("-1");
    $("#txtupp2Notes").val("");
    $("#txtupp2Notes").attr("disabled", true);
    $("#uppro3").val("-1");
    $("#txtupp3Notes").val("");
    $("#txtupp3Notes").attr("disabled", true);
    $("#uppro4").val("-1");
    $("#txtupp4Notes").val("");
    $("#txtupp4Notes").attr("disabled", true);
    $("#upsam1").val("-1");
    $("#txtupsamq1").val("");
    $("#txtupsamq1").attr("disabled", true);
    $("#upsam2").val("-1");
    $("#txtupsamq2").val("");
    $("#txtupsamq2").attr("disabled", true);
    $("#upsam3").val("-1");
    $("#txtupsamq3").val("");
    $("#txtupsamq3").attr("disabled", true);
    $("#gifup1").val("-1");
    $("#txtupgifq1").val("");
    $("#txtupgifq1").attr("disabled", true);
    $("#txtupremarks").val("");
    $("#txtUnAccountname").val("");
    $("#UAccSubtype").val("");
    $("#UAcctype").val("");
    $("#txtupaddress").val("");
    $("#chbupDSM").prop("checked", false);
    $("#chbupSM").prop("checked", false);
    $("#chbupFTM").prop("checked", false);
    $("#chbupBUH").prop("checked", false);
    $("#chbupGM").prop("checked", false);
    $("#chbupCOO").prop("checked", false);
    $("#chbupCD").prop("checked", false);
    $("#chbupPM").prop("checked", false);
    $("#chbupCoaching").prop("checked", false);
    $('#dialogProgress').jqmHide();

}

function Clear_fields() {
    $("#txtSTime").val("-1");
    $("#txtEtime").val("-1");
    $("#dlDoctorsofMR").val("-1");
    $("#txtupterr").val("");
    $("#SelectActivityUP").val("-1");
    $("#upddlplanReason").val("-1");
    $("#pro1").val("-1");
    $("#txtp1Notes").val("");
    $("#txtp1Notes").attr("disabled",true);
    $("#pro2").val("-1");
    $("#txtp2Notes").val("");
    $("#txtp2Notes").attr("disabled", true);
    $("#pro3").val("-1");
    $("#txtp3Notes").val("");
    $("#txtp3Notes").attr("disabled", true);
    $("#pro4").val("-1");
    $("#txtp4Notes").val("");
    $("#txtp4Notes").attr("disabled", true);
    $("#sam1").val("-1");
    $("#txtsamq1").val("");
    $("#txtsamq1").attr("disabled", true);
    $("#sam2").val("-1");
    $("#txtsamq2").val("");
    $("#txtsamq2").attr("disabled", true);
    $("#sam3").val("-1");
    $("#txtsamq3").val("");
    $("#txtsamq3").attr("disabled", true);
    $("#gif1").val("-1");
    $("#txtgifq1").val("");
    $("#txtgifq1").attr("disabled", true);
    $("#txtremarks").val("");
    $("#txtAccountname").val("");
    $("#AccSubtype").val("");
    $("#Acctype").val("");
    $("#txtaddress").val("");
    $("#chbFLM").prop("checked", false);
    $("#chbSLM").prop("checked", false);
    $("#chbFTM").prop("checked", false);
    $("#chbBUH").prop("checked", false);
    $("#chbGM").prop("checked", false);
    $("#chbCOO").prop("checked", false);
    $("#chbCD").prop("checked", false);
    $("#chbPM").prop("checked", false);
    $("#chbCoaching").prop("checked", false);
    $('#dialogProgress').jqmHide();

}


function onErrorDt() {
    $('#dialog').jqmHide();
    msg = 'Date Error';
    $.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });

    $('#dialog').jqmHide();
}

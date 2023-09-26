var CurrentUserRole;
var EmployeeId;
var _planid;
function pageLoad() {

    $("#dialog").hide();
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
    });



    $("#dlDoctorsofMR").change(function () {
        var selected = $(this).find('option:selected');
        $("#txtupterr").val(selected.data('docbrick'));
        $("#txtupaddress").val(selected.data('docbrick'));
        $("#txtUnAccountname").val(selected.data('docacc'));
        $("#UAcctype").val(selected.data('doctype'));
        $("#UAccSubtype").val(selected.data('docsubtype'));

    });

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
        var endDate = new Date(startDate.getTime() + 30 * 60000);

        var endTime;
        if (endDate.getMinutes().toString().length <= 1) {
            endTime = endDate.getHours() + ":0" + endDate.getMinutes() + ":" + endDate.getSeconds() + "0";
        } else {
            endTime = endDate.getHours() + ":" + endDate.getMinutes() + ":" + endDate.getSeconds() + "0";
        }
        $("#txtupEtime").val(endTime);
    });



    FillProductSku();
    FillGifts();
    getDoctorsOfMIO();
    FillCallReasons();


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
}

function onchange_daytextbox() {
    var dat = $('#txtDaydate').val().split('/')[1];
    getdayview_date(parseInt(dat));
}

function getdayview_date(daynumber) {
    $("#drlist").html('');
    $("#totaldr").html('');

    var drid = -1;
    var classid = -1;
    var brickid = -1;
    var speid = -1;

    var planStatus;


    //var cdt = new Date();
    //var currentMonth = cdt.getMonth();
    //currentMonth = currentMonth + 1;
    //var currentYear = cdt.getFullYear();

    //$('#txtDaydate').val(currentMonth + '/' + daynumber + '/' + currentYear);
    //var ddata = currentMonth + '/' + daynumber + '/' + currentYear;
    var ddata = $('#txtDaydate').val();
    var myData = "";
    if (CurrentUserRole == "rl6") {
        myData = "{'_date':'" + ddata + "','_EmployeeId':'" + EmployeeId + "'}";
    }
    else if (CurrentUserRole == "rl5") {

        myData = "{'_date':'" + ddata + "','_EmployeeId':'" + $('#selmio').val() + "'}";
    }


    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/PlanStatus",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.d != '') {
                var pSresult = jsonParse(data.d);
                planStatus = pSresult[0].PlanStatus;
            }
        },
        cache: false
    });

    if (planStatus == "Approve") {

        if (CurrentUserRole == "rl6") {
            myData = "{'_date':'" + ddata + "','_DoctorId':'" + drid + "','_ClassId':'" + classid + "','_BrickId':'" + brickid + "','_SpecialityId':'" + speid
                + "','_EmployeeId':'" + EmployeeId + "'}";
        } else if (CurrentUserRole == "rl5") {
            myData = "{'_date':'" + ddata + "','_DoctorId':'" + drid + "','_ClassId':'" + classid + "','_BrickId':'" + brickid + "','_SpecialityId':'" + speid
                + "','_EmployeeId':'" + $('#selmio').val() + "'}";
        }

        $.ajax({
            type: "POST",
            url: "MioPlanning.asmx/viewPlan",
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

                    var exu = "";
                    var drtable = "<table width='100%' cellspacing='0' cellpadding='0' border='0' class='formcss2'><thead><th style='text-align: left;'>Start time &nbsp;&nbsp;End time</th><th>Doctor Name</th><th>Class</th><th>Speciality</th><th></th><th></th></thead><tbody>";

                    $.each(result1, function (i, option) {
                        var planid = option.PlanningId;
                        var drname = option.DoctorName;
                        var drspeciality = option.SpecialiityName;
                        var drclass = option.ClassName;
                        var drId = option.DoctorId;
                        var checkedoption;
                        switch (daynumber) {
                            case 1:
                                checkedoption = option.a1;
                                break;
                            case 2:
                                checkedoption = option.a2;
                                break;
                            case 3:
                                checkedoption = option.a3;
                                break;
                            case 4:
                                checkedoption = option.a4;
                                break;
                            case 5:
                                checkedoption = option.a5;
                                break;
                            case 6:
                                checkedoption = option.a6;
                                break;
                            case 7:
                                checkedoption = option.a7;
                                break;
                            case 8:
                                checkedoption = option.a8;
                                break;
                            case 9:
                                checkedoption = option.a9;
                                break;
                            case 10:
                                checkedoption = option.a10;
                                break;
                            case 11:
                                checkedoption = option.a11;
                                break;
                            case 12:
                                checkedoption = option.a12;
                                break;
                            case 13:
                                checkedoption = option.a13;
                                break;
                            case 14:
                                checkedoption = option.a14;
                                break;
                            case 15:
                                checkedoption = option.a15;
                                break;
                            case 16:
                                checkedoption = option.a16;
                                break;
                            case 17:
                                checkedoption = option.a17;
                                break;
                            case 18:
                                checkedoption = option.a18;
                                break;
                            case 19:
                                checkedoption = option.a19;
                                break;
                            case 20:
                                checkedoption = option.a20;
                                break;
                            case 21:
                                checkedoption = option.a21;
                                break;
                            case 22:
                                checkedoption = option.a22;
                                break;
                            case 23:
                                checkedoption = option.a23;
                                break;
                            case 24:
                                checkedoption = option.a24;
                                break;
                            case 25:
                                checkedoption = option.a25;
                                break;
                            case 26:
                                checkedoption = option.a26;
                                break;
                            case 27:
                                checkedoption = option.a27;
                                break;
                            case 28:
                                checkedoption = option.a28;
                                break;
                            case 29:
                                checkedoption = option.a29;
                                break;
                            case 30:
                                checkedoption = option.a30;
                                break;
                            case 31:
                                checkedoption = option.a31;
                                break;
                        }

                        sa = "<div class='addclock' onclick='FillForm(" + planid + ")'></div>";


                        tim = "<select style='margin-right: 10px' id='" + planid + "_stime'>";
                        tim2 = "<select style='margin-right: 10px' id='" + planid + "_etime'>";
                        for (var j = 0; j < 24; j++) {
                            tim += "<option>" + j + ":00</option>";
                            tim += "<option>" + j + ":15</option>";
                            tim += "<option>" + j + ":30</option>";
                            tim += "<option>" + j + ":45</option>";

                            tim2 += "<option>" + j + ":00</option>";
                            tim2 += "<option>" + j + ":15</option>";
                            tim2 += "<option>" + j + ":30</option>";
                            tim2 += "<option>" + j + ":45</option>";
                        }
                        tim += "</select>";
                        tim2 += "</select>";


                        if (checkedoption == "True") {
                            ppp = ppp + 1;
                            drtable += "<tr>";
                            drtable += "<td style='width: 75px!important'>" + tim + tim2 + "</td>";
                            drtable += "<td>" + drname + "</td>";
                            drtable += "<td>" + drclass + "</td>";
                            drtable += "<td>" + drspeciality + "</td>";


                            if (CurrentUserRole == "rl5") {
                                drtable += "<td style='width: 25px'></td>";
                            } else {

                                if (planStatus == "Approve") {

                                    $.ajax({
                                        type: "POST",
                                        url: "DayView.asmx/IsPlanExecuted",
                                        data: "{'planId':'" + planid + "','doctorId':'" + drId + "','employeeId':'" + EmployeeId + "','date':'" + ddata + "'}",
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        success: function (dataaa) {
                                            if (dataaa.d == "unExecutedPlan") {
                                                exu = "<div  id='divplan" + planid + "' onclick='FillForm_dayview(" + planid + ")'><input id='btnSave' name='btnSave' type='button' class='btn btn-primary' value='Submit' /></div>";
                                            } else {
                                                exu = "<div  id='divplan" + planid + "'><span style='font-family:Arial'>Call Executed</span></div>";
                                            }
                                        },
                                        cache: false,
                                        async: false
                                    });


                                } else if (planStatus == "Draft") {


                                } else if (planStatus == "Pending") {

                                }

                                drtable += "<td style='width: 25px'>" + exu + "</td>";
                            }
                            drtable += "<td style='width: 25px'></td>";
                            drtable += "</tr>";
                        }
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
    var myData = "{'Pplanid':'" + planid + "' }";
    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/PlanInfo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        success: function (data) {
            if (data.d != '') {
                _planid = planid;
                var result = jsonParse(data.d);
                var ter = result[0].Territory;
                var drName = result[0].DoctorName;
                var drcode = result[0].DoctorCode;
                var draddr = result[0].Address1;
                var acc_name = result[0].AccountName;
                var acc_type = result[0].AccountType;
                var acc_subtype = result[0].AccountSubType;
                $("#txtaddress").val(draddr);
                $("#txtterr").val(ter);
                $("#txtdrcode").val(drcode + " - " + drName);
                $("#txtdate").val($("#txtDaydate").val());
                $("#txtaccountname").val(acc_name);
                $("#txtacounttype").val(acc_type);
                $("#txtacountsub").val(acc_subtype);
                var options = {};
                $("#pageone").hide("drop", options, 400, callback);
                $("#dialog").show("slide", options, 1000, callback);
            }
        },
        cache: false
    });


}

function FillProductSku() {
   // var myData = '';
  var  myData = "{'_EmployeeId':'" + EmployeeId + "'}";
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



        $.each(data.d, function (i, tweet) {

            $("#pro1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#pro2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#pro3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#pro4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");

            $("#uppro1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#uppro2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#uppro3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#uppro4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");


            $("#sam1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#sam2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#sam3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#sam4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");

            $("#upsam1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#upsam2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#upsam3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#upsam4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");


        });

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
                    $("#dlDoctorsofMR").append("<option value='" + tweet.DoctorId + "' data-docbrick='" + tweet.DoctorBrick + "' data-doccode='" + tweet.DoctorCode + "'data-docAcc='" + tweet.AccountName + "'data-docType='" + tweet.AccountType + "'data-docSubType='" + tweet.AccountSubType + "'>" + tweet.DoctorName + "</option>");
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
    var sample1 = $("#sam1").val();
    var sampleQty1 = $("#txtsamq1").val();
    var sample2 = $("#sam2").val();
    var sampleQty2 = $("#txtsamq2").val();
    var sample3 = $("#sam3").val();
    var sampleQty3 = $("#txtsamq3").val();

    var jvflm = $("#chbFLM").is(":checked");
    var jvslm = $("#chbSLM").is(":checked");
    var isCoaching = $("#chbCoaching").is(":checked");

    var gift = $("#gif1").val();
    var giftQty = $("#txtgifq1").val();

    var callNotes = $("#txtremarks").val();

    //Validation Work
    if (date != '') {
        //9/25/2014
        var date2 = new Date();
        var date1 = new Date(date + " " + startTime);
        var hours = Math.abs(date1 - date2) / 36e5;
        if (hours > 36) {
            alert("Calls laters than 36 hours are not acceptable ");
            return false;
        }
    } else {
        alert("Please provide the DT for the call");
        return false;
    }

    if (docDetail == '') {
        alert("Please provide the Doctor Detail for the call");
        return false;
    }

    if (endTime == '') {
        alert("Please provide the End time of the Call");
        return false;
    }

    if (sample1 != '-1') {
        if (sampleQty1 == '') {
            alert("Please Provide the sample Quantity for sample 1");
            return false;
        }
    }

    if (sample2 != '-1') {
        if (sampleQty2 == '') {
            alert("Please Provide the sample Quantity for sample 2");
            return false;
        }
    }

    if (sample3 != '-1') {
        if (sampleQty3 == '') {
            alert("Please Provide the sample Quantity for sample 3");
            return false;
        }
    }

    if (gift != '-1') {
        if (giftQty == '') {
            alert("Please Provide the Give away Quantity for Give Away ");
            return false;
        }
    }
    //Validation Work

    $.ajax({
        type: 'POST',
        url: 'DayView.asmx/SaveCall',
        data: "{'isPlanned':'" + _planid + "','date':'" + date + "','startTime':'" + startTime + "','docDetail':'" + docDetail + "','endTime':'" + endTime + "','activity':'" + activity + "','reason':'" + reason + "','product1':'" + product1 + "','product2':'" + product2 + "','product3':'" + product3 + "','product4':'" + product4 + "','sample1':'" + sample1 + "','sampleQty1':'" + sampleQty1 + "','sample2':'" + sample2 + "','sampleQty2':'" + sampleQty2 + "','sample3':'" + sample3 + "','sampleQty3':'" + sampleQty3 + "','jvflm':'" + jvflm + "','jvslm':'" + jvslm + "','gift':'" + gift + "','giftQty':'" + giftQty + "','callNotes':'" + callNotes + "','employeeId':'" + EmployeeId + "','coaching':'" + isCoaching + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (data) {
            if (data.d == "CallSaved") {
                alert("Call Saved Sucessfully");
                $('#divplan' + _planid).html('');
                $('#divplan' + _planid).append('<span style="font-family:Arial">Call Executed</span>');
                closeWindow();

            } else {
                console.log(data.d);
            }


        },
        async: false
    });





    return true;
};

var unPlannedSaveCall = function () {

    debugger
    var date = $("#txtupdate").val();
    var startTime = $("#txtupSTime").val();


    var docDetail = $("#dlDoctorsofMR").val(); //$("#dlDoctorsofMR option:selected").data('doccode') + " - " + $("#dlDoctorsofMR  option:selected").text();

    var endTime = $("#txtupEtime").val();
    var activity = $("#SelectActivityUP").val();
    var reason = $("#upddlplanReason").val();
    var product1 = $("#uppro1").val();
    var product2 = $("#uppro2").val();
    var product3 = $("#uppro3").val();
    var product4 = $("#uppro4").val();
    var sample1 = $("#upsam1").val();
    var sampleQty1 = $("#txtupsamq1").val();
    var sample2 = $("#upsam2").val();
    var sampleQty2 = $("#txtupsamq2").val();
    var sample3 = $("#upsam3").val();
    var sampleQty3 = $("#txtupsamq3").val();

    var jvflm = $("#chbupFLM").is(":checked");
    var jvslm = $("#chbupSLM").is(":checked");
    var isCoaching = $("#chbupCoaching").is(":checked");

    var gift = $("#gifup1").val();
    var giftQty = $("#txtupgifq1").val();

    var callNotes = $("#txtupremarks").val();

    //Validation Work
    if (date != '') {
        //9/25/2014
        var date2 = new Date();
        var date1 = new Date(date + " " + startTime);
        var hours = Math.abs(date1 - date2) / 36e5;
        if (hours > 36) {
            alert("Calls laters than 36 hours are not acceptable ");
            return false;
        }
    } else {
        alert("Please provide the DT for the call");
        return false;
    }

    if (docDetail == '-1') {
        alert("Please provide the Doctor Detail for the call");
        return false;
    }

    if (startTime == '-1') {
        alert("Please provide the start Time of the Call");
        return false;
    }

    if (endTime == '-1') {
        alert("Please provide the End time of the Call");
        return false;
    }

    if (activity == '-1') {
        alert("Please Activity for Call");
        return false;
    }

    if (sample1 != '-1') {
        if (sampleQty1 == '') {
            alert("Please Provide the sample Quantity for sample 1");
            return false;
        }
    }

    if (sample2 != '-1') {
        if (sampleQty2 == '') {
            alert("Please Provide the sample Quantity for sample 2");
            return false;
        }
    }

    if (sample3 != '-1') {
        if (sampleQty3 == '') {
            alert("Please Provide the sample Quantity for sample 3");
            return false;
        }
    }

    if (gift != '-1') {
        if (giftQty == '') {
            alert("Please Provide the Give away Quantity for Give Away ");
            return false;
        }
    }

    //Validation Work

    $.ajax({
        type: 'POST',
        url: 'DayView.asmx/SaveCall',
        data: "{'isPlanned':'No','date':'" + date + "','startTime':'" + startTime + "','docDetail':'" + docDetail + "','endTime':'" + endTime + "','activity':'" + activity + "','reason':'" + reason + "','product1':'" + product1 + "','product2':'" + product2 + "','product3':'" + product3 + "','product4':'" + product4 + "','sample1':'" + sample1 + "','sampleQty1':'" + sampleQty1 + "','sample2':'" + sample2 + "','sampleQty2':'" + sampleQty2 + "','sample3':'" + sample3 + "','sampleQty3':'" + sampleQty3 + "','jvflm':'" + jvflm + "','jvslm':'" + jvslm + "','gift':'" + gift + "','giftQty':'" + giftQty + "','callNotes':'" + callNotes + "','employeeId':'" + EmployeeId + "','coaching':'" + isCoaching + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (data) {
            if (data.d == "CallSaved") {
                alert("Call Saved Sucessfully");
                closeWindow();
            } else {
                console.log(data.d);
            }


        },
        async: false
    });





    return true;
};

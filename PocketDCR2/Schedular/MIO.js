var cnt = this; // Reference variable for top level 
var temp = [];
var currentEvent = []; // Represents the current Event selected
var dateofday = ''; // Represents the Current Date selected
var month = '';  // Represents the Current Month selected
var url = 'handler.ashx?method=getdata';
var isJVClick = '0';
$(document).ready(function () {

    //$("#Sample0").change(function () {
    //    var value = $("#Sample0").val();
    //    if (value != -1) {
    //        $('#tdSQTY').attr("style", "display:block");
    //        $('#Quantity0').attr("style", "display:inline");
    //    }
    //    else {
    //        $('#Quantity0').attr("style", "display:none");
    //    }
    //});

    //$("#Sample1").change(function () {
    //    var value = $("#Sample1").val();
    //    if (value != -1) {
    //        $('#tdSQTY').attr("style", "display:block");
    //        $('#Quantity1').attr("style", "display:inline");
    //    }
    //    else {
    //        $('#Quantity1').attr("style", "display:none");
    //    }
    //});

    //$("#Sample2").change(function () {
    //    var value = $("#Sample2").val();
    //    if (value != -1) {
    //        $('#tdSQTY').attr("style", "display:block");
    //        $('#Quantity2').attr("style", "display:inline");
    //    }
    //    else {
    //        $('#Quantity2').attr("style", "display:none");
    //    }
    //});

    //$("#Sample3").change(function () {
    //    var value = $("#Sample3").val();
    //    if (value != -1) {
    //        $('#tdSQTY').attr("style", "display:block");
    //        $('#Quantity3').attr("style", "display:inline");
    //    }
    //    else {
    //        $('#Quantity3').attr("style", "display:none");
    //    }
    //});


    $("#ddlTimeStart").change(function () {
        var selected = $(this).find('option:selected');
        var selectedid = selected.text();
        var startDate = new Date();
        startDate.setHours(selectedid.split(':')[0]);
        startDate.setMinutes(selectedid.split(':')[1]);
        startDate.setSeconds(selectedid.split(':')[2]);
        var endDate = new Date(startDate.getTime() + 15 * 60000);

        var endTime;
        var hour = 0;
        if (endDate.getHours().toString().length <= 1) {
            hour = "0" + endDate.getHours();
        } else {
            hour = endDate.getHours();
        }
        if (endDate.getMinutes().toString().length <= 1) {
            endTime = hour + ":0" + endDate.getMinutes() + ":" + endDate.getSeconds() + "0";
        } else {
            endTime = hour + ":" + endDate.getMinutes() + ":" + endDate.getSeconds() + "0";
        }


        $("#ddlTimeEnd").val(endTime);
    });


    //if close button is clicked
    $('.window .close').click(function (e) {
        //Cancel the link behavior
        e.preventDefault();
        $('#txtuser').val();
        $('#mask').hide();
        $('.window').hide();
    });

    //if mask is clicked
    $('#mask').click(function () {
        ClearAddFields();
        $(this).hide();
        $('.window').hide();
    });

    $(window).resize(function () {
        var box = $('#boxes .window');
        //Get the screen height and width
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();

        //Set height and width to mask to fill up the whole screen
        $('#mask').css({ 'width': maskWidth, 'height': maskHeight });

        //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();

        //Set the popup window to center
        //box.css('top', winH / 2 - box.height() / 2);
        box.css('top', 0.5);
        box.css('left', winW / 2 - box.width() / 2);
    });

    var url = 'handler.ashx?method=getcurrentemployee';
    GetResponse(url, function (e) {
        if (e.Success) {
            $('#EmployeeName').html(e.Response); //+ " (SPO/TM/STM Plan)"
        }
    });

    //var initial = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
    //url = 'handler.ashx?method=getdoctorswithclassnamewithdate&initial=' + initial;
    ////url = 'handler.ashx?method=getdoctorswithclassname';
    //GetResponse(url, function (e) {

    //    if (e.Success) {
    //        PopulateDoctorsMainCombo(e.Response.split(';'));
    //        //$('#ddlDoctors').val(calEvent.doctorID);
    //    }
    //});

    url = 'handler.ashx?method=fillbricks';
    GetResponse(url, function (e) {
        if (e.Success) {
            PopulateDoctorBrickMainCombo(e.Response.split(';'));
        }
    });
});


// Populates the Activities Combo box in edit Event popup
PopulateActivitiesCombo = function (Activities, callBack) {
    // popolutes the contract expiry dates dropdown
    var ddl = $("#" + "ddlActivities");
    ddl.children().remove();
    ddl.append($("<option value='-1' />").html("Select"));
    var N = Activities.length;
    for (var a = 0; a < N; a++) {
        var op = $("<option />").html(Activities[a].split(',')[1]).val(Activities[a].split(',')[0]).data("products", Activities[a].split(',')[2]).data("reminders", Activities[a].split(',')[3]).data("samples", Activities[a].split(',')[4]).data("gifts", Activities[a].split(',')[5]);
        ddl.append(op);
    }
    if (callBack != null)
        callBack();
}

// Populates the Doctors Combo box in edit Event popup
PopulateDoctorsCombo = function (Doctors, callBack) {
    var ddl = $("#" + "ddlDoctors");
    ddl.children().remove();
    ddl.append($("<option value='0' />").html("Select"));
    var N = Doctors.length;
    for (var a = 0; a < N; a++) {
        var op = $("<option />").html(Doctors[a].split(',')[1]).val(Doctors[a].split(',')[0]);
        ddl.append(op);
    }
    if (callBack != null)
        callBack();
}

// Populates the Doctors Combo box in edit Event popup
//PopulateDoctorsMainCombo = function(Doctors, callBack) {
//    var ddl = $("#" + "ddlDoctorMain");
//    ddl.children().remove();
//    ddl.append($("<option value='-1' />").html("Select"));
//    var N = Doctors.length;
//    for (var a = 0; a < N; a++) {
//        var op = $("<option />").html(Doctors[a].split(',')[1]).val(Doctors[a].split(',')[0]);
//        ddl.append(op);
//    }
//    if (callBack != null)
//        callBack();
//};

PopulateDoctorBrickMainCombo = function (doctorsBrick, callBack) {
    var ddl = $("#" + "ddlDoctorBrickMain");
    ddl.children().remove();
    ddl.append($("<option value='-1' />").html("Select"));
    var N = doctorsBrick.length;
    for (var a = 0; a < N; a++) {
        var op = $("<option />").html(doctorsBrick[a].split(',')[1]).val(doctorsBrick[a].split(',')[0]);
        ddl.append(op);
    }
    if (callBack != null)
        callBack();
};


// Populates the Classes Combo box in edit Event popup
PopulateClassesCombo = function (Classes, callBack) {
    // popolutes the contract expiry dates dropdown
    var ddl = $("#" + "ddlClasses");
    ddl.children().remove();
    ddl.append($("<option value='-1' />").html("Select"));
    var N = Classes.length;
    for (var a = 0; a < N; a++) {
        var op = $("<option />").html(Classes[a].split(',')[0]).val(Classes[a].split(',')[1]);
        ddl.append(op);
    }
    if (callBack != null)
        callBack();
}

PopulateBricksCombo = function (Bricks, callBack) {

    // popolutes the contract expiry dates dropdown
    var ddl = $("#" + "ddlBricks");
    ddl.children().remove();
    ddl.append($("<option value='-1' />").html("Select"));
    var N = Bricks.length;
    for (var a = 0; a < N; a++) {
        var op = $("<option />").html(Bricks[a].split(',')[1]).val(Bricks[a].split(',')[0]);
        ddl.append(op);
    }
    if (callBack != null)
        callBack();
}
// clears all the add/edit popup fields
function ClearAddFields() {
    $('#ddlActivities').val(-1);
    $('#ddlTimeStart').val(-1);
    $('#ddlTimeEnd').val(-1);
    $('#ddlDoctors').val(0);
    $("#txtDescription").val('');
    $("#btnAdd").val('Save event');
    $('#divBMD').attr("style", "display:none");
    $('#ddlBricks').val(-1);
    $('#ddlClasses').val(-1);
    $('#tdProducts').attr("style", "display:none");
    $('#tdReminders').attr("style", "display:none");
    $('#tdSamples').attr("style", "display:none");
    $('#tdSQTY').attr("style", "display:none");
    $('#tdGift').attr("style", "display:none");
    $('#chkMon').attr('checked', false);
    $('#chkTue').attr('checked', false);
    $('#chkWed').attr('checked', false);
    $('#chkThu').attr('checked', false);
    $('#chkFri').attr('checked', false);
    $('#chkSat').attr('checked', false);
    $('#ulRejectComments1').attr("style", "display:none");
    $("#ddlTimeStart").prop("disabled", false);
    $("#ddlTimeEnd").prop("disabled", false);
    $("#ddlDoctors").prop("disabled", false);
    clearDateSelectddls();
    clearProductAndRemindersddls();

}

function clearDateSelectddls() {

    for (a = 0; a < 8; a++) {

        $("#dateSelect" + a).val(-1);
        $("#dateSelect" + a).attr("style", "display:none");
    }
}
function clearProductAndRemindersddls() {

    for (a = 0; a < 4; a++) {

        $("#Products" + a).val(-1);
        $("#Reminders" + a).val(-1);
    }
}
// Validates all the fields in Edit Event popup
function ValidateFields() {
    var check = $('#ddlActivities option:selected').text();
    if ($('#ddlTimeStart').val() == -1) {
        alert("Please Select Start Date");
        return false;
    }
    else if ($('#ddlTimeEnd').val() == -1) {
        alert("Please Select End Date");
        return false;
    }
    else if ($('#ddlDoctors').val() == 0) {

        if (check == "Meeting" || check == "Leave" //|| check == "Marketing Activity"
            || check == "Public Holiday") {
            return true;
        }
        else {

            alert("Please Select a Doctor");
            return false;
        }
    }
    else if ($('#ddlActivities').val() == -1) {
        alert("Please Select an Activity");
        return false;
    }
    else return true;
}


// Populates the Start and End Times Combo boxes in edit Event popup
PopulateTimeCombos = function (Timespans, callBack, comboname) {
    // popolutes the contract expiry dates dropdown
    var ddl = $("#" + comboname);
    ddl.children().remove();
    ddl.append($("<option value='-1' />").html("Select"));
    var N = Timespans.length;
    for (var a = 0; a < N; a++) {
        var op = $("<option />").html(Timespans[a]);
        ddl.append(op);
    }
    if (callBack != null)
        callBack();
}
CreateProductsDropDown = function () {  //SANDGWORK
    // Used to create a new dropdown
    $('#tdProducts').attr("style", "display:none");
    $('#tdReminders').attr("style", "display:none");
    $('#tdSamples').attr("style", "display:none");
    $('#tdGift').attr("style", "display:none");
    $('#tdSQTY').attr("style", "display:none");

    var ddlProducts0 = $("#Products0");
    ddlProducts0.children().remove();
    ddlProducts0.append($("<option value='-1' />").html("Select"));

    var ddlProducts1 = $("#Products1");
    ddlProducts1.children().remove();
    ddlProducts1.append($("<option value='-1' />").html("Select"));

    var ddlProducts2 = $("#Products2");
    ddlProducts2.children().remove();
    ddlProducts2.append($("<option value='-1' />").html("Select"));

    var ddlProducts3 = $("#Products3");
    ddlProducts3.children().remove();
    ddlProducts3.append($("<option value='-1' />").html("Select"));

    var ddlReminders0 = $("#Reminders0");
    ddlReminders0.children().remove();
    ddlReminders0.append($("<option value='-1' />").html("Select"));

    var ddlReminders1 = $("#Reminders1");
    ddlReminders1.children().remove();
    ddlReminders1.append($("<option value='-1' />").html("Select"));

    var ddlReminders2 = $("#Reminders2");
    ddlReminders2.children().remove();
    ddlReminders2.append($("<option value='-1' />").html("Select"));

    var ddlReminders3 = $("#Reminders3");
    ddlReminders3.children().remove();
    ddlReminders3.append($("<option value='-1' />").html("Select"));

    var ddlSample0 = $("#Sample0");
    ddlSample0.children().remove();
    ddlSample0.append($("<option value='-1' />").html("Select"));

    var ddlSample1 = $("#Sample1");
    ddlSample1.children().remove();
    ddlSample1.append($("<option value='-1' />").html("Select"));

    var ddlSample2 = $("#Sample2");
    ddlSample2.children().remove();
    ddlSample2.append($("<option value='-1' />").html("Select"));

    var ddlSample3 = $("#Sample3");
    ddlSample3.children().remove();
    ddlSample3.append($("<option value='-1' />").html("Select"));

    $("#Quantity0").val('');
    $("#Quantity1").val('');
    $("#Quantity2").val('');
    $("#Quantity3").val('');


    var ddlGift0 = $("#Gift0");
    ddlGift0.children().remove();
    ddlGift0.append($("<option value='-1' />").html("Select"));

    var ddlGift1 = $("#Gift1");
    ddlGift1.children().remove();
    ddlGift1.append($("<option value='-1' />").html("Select"));


    url = 'handler.ashx?method=fillproducts'; //SANDGWORK
    cnt.GetResponse(url, function (e) {
        if (e.Success) {
            var Products = e.Response.split(';');
            var N = Products.length;
            for (var a = 0; a < N; a++) {
                var op0 = $("<option />").html(Products[a].split(',')[1]).val(Products[a].split(',')[0]);
                var op1 = $("<option />").html(Products[a].split(',')[1]).val(Products[a].split(',')[0]);
                var op2 = $("<option />").html(Products[a].split(',')[1]).val(Products[a].split(',')[0]);
                var op3 = $("<option />").html(Products[a].split(',')[1]).val(Products[a].split(',')[0]);
                ddlProducts0.append(op0);
                ddlProducts1.append(op1);
                ddlProducts2.append(op2);
                ddlProducts3.append(op3);

                var re0 = $("<option />").html(Products[a].split(',')[1]).val(Products[a].split(',')[0]);
                var re1 = $("<option />").html(Products[a].split(',')[1]).val(Products[a].split(',')[0]);
                var re2 = $("<option />").html(Products[a].split(',')[1]).val(Products[a].split(',')[0]);
                var re3 = $("<option />").html(Products[a].split(',')[1]).val(Products[a].split(',')[0]);

                ddlReminders0.append(re0);
                ddlReminders1.append(re1);
                ddlReminders2.append(re2);
                ddlReminders3.append(re3);

                var sm0 = $("<option />").html(Products[a].split(',')[1]).val(Products[a].split(',')[0]);
                var sm1 = $("<option />").html(Products[a].split(',')[1]).val(Products[a].split(',')[0]);
                var sm2 = $("<option />").html(Products[a].split(',')[1]).val(Products[a].split(',')[0]);
                var sm3 = $("<option />").html(Products[a].split(',')[1]).val(Products[a].split(',')[0]);

                ddlSample0.append(sm0);
                ddlSample1.append(sm1);
                ddlSample2.append(sm2);
                ddlSample3.append(sm3);
            }
        }
        else {
        }
    });

    url = 'handler.ashx?method=fillGifts'; //SANDGWORK
    cnt.GetResponse(url, function (e) {
        if (e.Success) {
            var Gifts = e.Response.split(';');
            var N = Gifts.length;
            for (var a = 0; a < N; a++) {
                var gft0 = $("<option />").html(Gifts[a].split(',')[1]).val(Gifts[a].split(',')[0]);
                var gft1 = $("<option />").html(Gifts[a].split(',')[1]).val(Gifts[a].split(',')[0]);
                ddlGift0.append(gft0);
                ddlGift1.append(gft1);
            }
        }
        else {
        }
    });


}
ShowProductsDropDown = function (ddlIndentifier, recordcount) { //SANDGWORK
    // Used to create a new dropdown
    $('#tdProducts').attr("style", "display:block");
    $('#tdReminders').attr("style", "display:block");
    $('#tdSamples').attr("style", "display:block");
    $('#tdGift').attr("style", "display:block");

    for (a = 0; a < 4; a++) {
        var ddl = $("#" + ddlIndentifier + a);
        ddl.attr("style", "display:none");
    }
    for (a = 0; a < recordcount; a++) {
        var ddl = $("#" + ddlIndentifier + a);
        ddl.attr("style", "display:inline");
    }
}

CreateDatesDropDown = function () {
    // Used to create a new dropdown

    var ddldateSelect0 = $("#dateSelect0");
    ddldateSelect0.children().remove();
    ddldateSelect0.append($("<option value='-1' />").html("Select"));

    var ddldateSelect1 = $("#dateSelect1");
    ddldateSelect1.children().remove();
    ddldateSelect1.append($("<option value='-1' />").html("Select"));

    var ddldateSelect2 = $("#dateSelect2");
    ddldateSelect2.children().remove();
    ddldateSelect2.append($("<option value='-1' />").html("Select"));

    var ddldateSelect3 = $("#dateSelect3");
    ddldateSelect3.children().remove();
    ddldateSelect3.append($("<option value='-1' />").html("Select"));

    var ddldateSelect4 = $("#dateSelect4");
    ddldateSelect4.children().remove();
    ddldateSelect4.append($("<option value='-1' />").html("Select"));

    var ddldateSelect5 = $("#dateSelect5");
    ddldateSelect5.children().remove();
    ddldateSelect5.append($("<option value='-1' />").html("Select"));

    var ddldateSelect6 = $("#dateSelect6");
    ddldateSelect6.children().remove();
    ddldateSelect6.append($("<option value='-1' />").html("Select"));

    var ddldateSelect7 = $("#dateSelect7");
    ddldateSelect7.children().remove();
    ddldateSelect7.append($("<option value='-1' />").html("Select"));

    url = 'handler.ashx?method=filldates&date=' + dateofday;
    cnt.GetResponse(url, function (e) {
        if (e.Success) {
            var datesInMonth = e.Response.split(';');
            for (var a = 0; a < datesInMonth.length; a++) {
                var onlyDate = datesInMonth[a].split('-')[0];
                var op0 = $("<option />").html(datesInMonth[a]).val(onlyDate);
                var op1 = $("<option />").html(datesInMonth[a]).val(onlyDate);
                var op2 = $("<option />").html(datesInMonth[a]).val(onlyDate);
                var op3 = $("<option />").html(datesInMonth[a]).val(onlyDate);
                var op4 = $("<option />").html(datesInMonth[a]).val(onlyDate);
                var op5 = $("<option />").html(datesInMonth[a]).val(onlyDate);
                var op6 = $("<option />").html(datesInMonth[a]).val(onlyDate);
                var op7 = $("<option />").html(datesInMonth[a]).val(onlyDate);
                ddldateSelect0.append(op0);
                ddldateSelect1.append(op1);
                ddldateSelect2.append(op2);
                ddldateSelect3.append(op3);
                ddldateSelect4.append(op4);
                ddldateSelect5.append(op5);
                ddldateSelect6.append(op6);
                ddldateSelect7.append(op7);
            }
        }
        else {
        }
    });
}
ShowDatesDropDown = function (ddlIndentifier, recordcount) {
    // Used to create a new dropdown

    for (a = 0; a < 8; a++) {
        var ddl = $("#" + ddlIndentifier + a);
        ddl.attr("style", "display:none");
    }
    for (a = 0; a < recordcount; a++) {
        var ddl = $("#" + ddlIndentifier + a);
        ddl.attr("style", "display:inline");
    }
}

$(document).ready(function () {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var eclick = true;

    // Creates the Calendar shown in Edit Event popup
    function createCalendar(date) {
        var daycalender = $('#dayCalender').fullCalendar({

            header: {
                left: '',
                center: 'title',
                right: ''
            },

            selectable: true,
            selectHelper: true,
            select: function (date, end, allDay) {
            },
            editable: true,
            height: 500,
            defaultView: 'agendaDay',
            allDaySlot: false,
            events: function (start, end, callback) {

                var initialdate = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                var mainDoctorID = $("#ddlDoctorMain option:selected").val();
                var url = 'handler.ashx?method=getevents&initial=' + initialdate;
                $('#preloader2').show();
                GetResponse(url, function (e) {

                    if (e.Success) {
                        debugger;
                        var commaSplit = e.Response.split('~');
                        rowCount = commaSplit.length; // total count of records returned
                        var i = 0;
                        var events = [];
                        if ((commaSplit[i].split(';')[25]) != undefined) {
                            leavedate = (commaSplit[i].split(';')[25])
                        } else {
                            leavedate = "";
                        }

                        while (rowCount > 0) {

                            events.push({
                                id: commaSplit[i].split(';')[4],
                                // title: commaSplit[i].split(';')[0],
                                title: commaSplit[i].split(';')[0] == "Leave"
                                    || commaSplit[i].split(';')[0] == "Calls"
                                    || commaSplit[i].split(';')[0] == "Camp"
                                    || commaSplit[i].split(';')[0] == "Mega Camp"
                                    || commaSplit[i].split(';')[0] == "Doctor Of The Month"
                                    || commaSplit[i].split(';')[0] == "Field Visit"
                                    || commaSplit[i].split(';')[0] == "Public Holiday"
                                    || commaSplit[i].split(';')[0] == "Marketing Activity"
                                    || commaSplit[i].split(';')[0] == "Meeting" ? (commaSplit[i].split(';')[0] + "\n Description: " + commaSplit[i].split(';')[8] + "\n Leave Marked on:" + leavedate) : "Leave",//commaSplit[i].split(';')[0],
                                start: $.fullCalendar.parseDate(commaSplit[i].split(';')[1], true),
                                end: commaSplit[i].split(';')[2],
                                color: commaSplit[i].split(';')[3],
                                textColor: commaSplit[i].split(';')[5],
                                editable: commaSplit[i].split(';')[6],
                                doctorID: commaSplit[i].split(';')[7],
                                description: commaSplit[i].split(';')[8],
                                status: commaSplit[i].split(';')[9],
                                statusReason: commaSplit[i].split(';')[10],
                                planmonth: commaSplit[i].split(';')[11],
                                activityID: commaSplit[i].split(';')[12],
                                monthID: commaSplit[i].split(';')[13],
                                mioauthID: commaSplit[i].split(';')[14],
                                doctorname: commaSplit[i].split(';')[15],
                                DocBrick: commaSplit[i].split(';')[19],
                                isJV: commaSplit[i].split(';')[18],
                                products: commaSplit[i].split(';')[20],
                                classid: commaSplit[i].split(';')[21],
                                brickid: commaSplit[i].split(';')[22],
                                reminders: commaSplit[i].split(';')[23],
                                samplesqty: commaSplit[i].split(';')[24],
                                gifts: commaSplit[i].split(';')[25],
                                divid: 'day',
                                allDay: false
                            });

                            i++;
                            rowCount--;

                        }
                        callback(events);

                        daycalender.fullCalendar('renderEvent', events, true); // make the event "stick"
                    }
                    else {
                    }
                    $('#preloader2').hide();
                });
            },
            timeFormat: 'HH:mm',
            eventClick: function (calEvent, jsEvent, view) {
                if (eclick) {
                    if (calEvent.editable == "True") {
                        $('#btnAdd').attr("style", "display:block");
                    }
                    else {
                        $('#btnAdd').attr("style", "display:none");
                    }
                    //if (calEvent.editable == "True") {
                    $('#ddlActivities').val(calEvent.activityID);

                  //  if ($('#ddlActivities').val() == 6 || $('#ddlActivities').val() == 7 || $('#ddlActivities').val() == 8 || $('#ddlActivities').val() == 12) {
                    if ( $('#ddlActivities').val() == 7 || $('#ddlActivities').val() == 8 || $('#ddlActivities').val() == 12) {

                        $("#ddlDoctors").val(0);
                        $('#ddlTimeStart').val(-1)
                        $('#ddlTimeEnd').val(-1);

                        if ($('#ddlActivities').val() == 7 || $('#ddlActivities').val() == 12) {
                            $('#ddlTimeStart').val("08:00:00")
                            $('#ddlTimeEnd').val("23:59:00");
                            $("#ddlTimeStart").prop("disabled", true);
                            $("#ddlTimeEnd").prop("disabled", true);
                            $("#ddlDoctors").prop("disabled", true);
                        }
                        else if ( $('#ddlActivities').val() == 8) {
                       // else if ($('#ddlActivities').val() == 6 || $('#ddlActivities').val() == 8) {
                            $("#ddlTimeStart").prop("disabled", false);
                            $("#ddlTimeEnd").prop("disabled", false);
                            $("#ddlDoctors").prop("disabled", true);
                        }
                        else {
                            $("#ddlTimeStart").prop("disabled", false);
                            $("#ddlTimeEnd").prop("disabled", false);
                            $("#ddlDoctors").prop("disabled", false);
                        }
                    }
                    else {
                        $("#ddlTimeStart").prop("disabled", false);
                        $("#ddlTimeEnd").prop("disabled", false);
                        $("#ddlDoctors").prop("disabled", false);
                        $('#ddlTimeStart').val(-1)
                        $('#ddlTimeEnd').val(-1);
                    }


                    ls = $.fullCalendar.formatDate(calEvent.start, "MM dd yyyy HH:mm:ss");
                    le = $.fullCalendar.formatDate(calEvent.end, "MM dd yyyy HH:mm:ss");

                    //var url = 'zsmhandler.ashx?method=fillbmd';
                    //GetResponse(url, function (e) {
                    //    if (e.Success) {
                    //        if (e.Response != '') {
                    //            bmds = e.Response.split(';');
                    //            var ddl = $("#" + "ddlBMD");
                    //            ddl.children().remove();
                    //            ddl.append($("<option value='-1' />").html("Select"));
                    //            var N = bmds.length;
                    //            for (var a = 0; a < N; a++) {
                    //                var op = $("<option />").html(bmds[a].split(',')[2] + ' - ' + bmds[a].split(',')[1]).val(bmds[a].split(',')[0]).data('bmdname', bmds[a].split(',')[1]);
                    //                ddl.append(op);
                    //            }
                    //        }
                    //    }
                    //});
                    //if (calEvent.title == 'BMD') {

                    //    var url = 'zsmhandler.ashx?method=getbmdformio&mioid=' + calEvent.id;
                    //    GetResponse(url, function (e) {
                    //        if (e.Success) {
                    //            if (e.Response != '') {
                    //                $("#ddlBMD").val(e.Response);
                    //            }
                    //        }
                    //    });
                    //    $('#divBMD').attr("style", "display:block");
                    //}
                    //else {
                    //    $('#divBMD').attr("style", "display:none");
                    //}
                    $('#ddlTimeStart').val(ls.substring(ls.length - 8, ls.length));
                    $('#ddlTimeEnd').val(le.substring(le.length - 8, le.length));
                    $('#ddlDoctors').val(calEvent.doctorID);
                    $('#ddlClasses').val(calEvent.classid);
                    $('#ddlBricks').val(calEvent.brickid);
                    $('#txtDescription').val(calEvent.description);
                    if (calEvent.status == 'Rejected') {
                        $('#ulRejectComments1').attr("style", "display:block");
                        $('#txtRejectComments1').val(calEvent.statusReason);
                    }
                    else {
                        $('#ulRejectComments1').attr("style", "display:none");
                        $('#txtRejectComments1').val('');
                    }


                    $('#btnAdd').val('Update Selected Event');
                    clearDateSelectddls();
                    cnt.currentEvent = calEvent;
                    //}
                }
            },

            eventMouseover: function (calEvent, jsEvent, view) {
                if (calEvent.editable == "True") {
                    var cp = $("#" + calEvent.id + calEvent.divid + "tcp");
                    cp.html('<div style="float:right; cursor:pointer; padding-right:5px; padding-left:5px;"> X </div>'); //Day View
                    cp.click(function () {
                        eclick = false;
                        var url = 'handler.ashx?method=delevent&id=' + calEvent.id;
                        GetResponse(url, function (e) {
                            if (e.Success) {
                                daycalender.fullCalendar('removeEvents', calEvent.id);
                                // calendar.fullCalendar('removeEvents', calEvent.id); // make the event "stick"
                                calendar.fullCalendar('refetchEvents');
                                alert('Event has been deleted successfully');
                            }
                            else {
                            }
                        });
                        return;
                    });
                }
            },
            eventMouseout: function (calEvent, jsEvent, view) {
                eclick = true;
                var cp = $("#" + calEvent.id + calEvent.divid + "tcp");
                cp.html('');
                cp.unbind('click');
            },
            dayClick: function (date, allDay, jsEvent, view) {

                if (allDay) {
                } else {
                }
            },
            disableResizing: true,
            disableDragging: true
        });
        daycalender.fullCalendar('gotoDate', date);
    }

    // If the Send For Approval button is clicked
    $('#btnApproval').click(function () {
        if ($('#spanMyStatus').html() == "Draft" || $('#spanMyStatus').html() == "Rejected") {
            var r = confirm("Are you sure you want to submit the plan for approval?");
            if (r == true) {
                url = 'handler.ashx?method=sendforapproval&date=' + $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss") + '&status=' + $('#spanMyStatus').html();
                cnt.GetResponse(url, function (e) {
                    if (e.Success || e.Response=="") {
                        window.location.reload(true);
                    } else {
                    }
                });
            }
        }
        else if ($('#spanMyStatus').html() == "Approved") {
            alert("Plan is already approved");
        }
        else if ($('#spanMyStatus').html() == '') {
            alert("No events found for approval");
        }
        else {
            alert("You have already sent for approval");
        }
    });


    $('#btnlogin').click(function () {
        cnt.currentEvent.title = $('#txtuser').val();
        cnt.currentEvent.start = $('#txtstartdate').val();
        cnt.currentEvent.end = $('#txtenddate').val();
        cnt.currentEvent.color = $('#txtcolor').val();

        calendar.fullCalendar('updateEvent',
                            {
                                event: cnt.currentEvent
                            }
        );
        url = 'handler.ashx?method=updateevent&id=' + cnt.currentEvent.id + '&title=' + cnt.currentEvent.title + '&start=' + cnt.currentEvent.start + '&end=' + cnt.currentEvent.end + '&color=' + cnt.currentEvent.color;
        cnt.GetResponse(url, function (e) {
            if (e.Success) {

            }
            else {
            }
        });
        calendar.fullCalendar('renderEvent', cnt.currentEvent, true);
        $('#mask').hide();
        $('.window').hide();

    });

    // Called when the selected index of activities gets changed
    $('#ddlActivities').change(function () {
      //  if ($('#ddlActivities').val() == 6 || $('#ddlActivities').val() == 7 || $('#ddlActivities').val() == 8 || $('#ddlActivities').val() == 12) {
        if ( $('#ddlActivities').val() == 7 || $('#ddlActivities').val() == 8 || $('#ddlActivities').val() == 12) {

            $("#ddlDoctors").val(0);
            $('#ddlTimeStart').val(-1)
            $('#ddlTimeEnd').val(-1);

            if ($('#ddlActivities').val() == 7 || $('#ddlActivities').val() == 12) {
                $('#ddlTimeStart').val("08:00:00")
                $('#ddlTimeEnd').val("23:59:00");
                $("#ddlTimeStart").prop("disabled", true);
                $("#ddlTimeEnd").prop("disabled", true);
                $("#ddlDoctors").prop("disabled", true);
            }
            //  else if ($('#ddlActivities').val() == 6 || $('#ddlActivities').val() == 8) {
            else if ( $('#ddlActivities').val() == 8) {
                $("#ddlTimeStart").prop("disabled", false);
                $("#ddlTimeEnd").prop("disabled", false);
                $("#ddlDoctors").prop("disabled", true);
            }
            else {
                $("#ddlTimeStart").prop("disabled", false);
                $("#ddlTimeEnd").prop("disabled", false);
                $("#ddlDoctors").prop("disabled", false);    
            }
        }
        else {
            $("#ddlTimeStart").prop("disabled", false);
            $("#ddlTimeEnd").prop("disabled", false);
            $("#ddlDoctors").prop("disabled", false);
            $('#ddlTimeStart').val(-1)
            $('#ddlTimeEnd').val(-1);
        }

            //var recordcount = $("#ddlActivities option:selected").data('products');
            //var remindercount = $("#ddlActivities option:selected").data('reminders');
            //var samplescount = $("#ddlActivities option:selected").data('samples');
            //var giftscount = $("#ddlActivities option:selected").data('gifts');
            //ShowProductsDropDown("Products", recordcount);
            //ShowProductsDropDown("Reminders", remindercount);
            //ShowProductsDropDown("Sample", samplescount);
            //ShowProductsDropDown("Gift", giftscount);

            //if ($("#ddlActivities option:selected").text() == 'BMD') {
            //    $('#divBMD').attr("style", "display:block");
            //}
            //else
            //    $('#divBMD').attr("style", "display:none");
        
    });

    // Called when the selected index of bricks gets changed
    $('#ddlBricks').change(function () {

        $('#ddlClasses').val(-1);
        ShowDatesDropDown("dateSelect", 0);
        var referenceOfDoctorTd = $("#ddlDoctors");

        var initial = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
        var brickid = $("#ddlBricks option:selected").val();
        var url = 'handler.ashx?method=getdoctorsbybrickwithdate&brickid=' + brickid + '&initial=' + initial;
        //var url = 'handler.ashx?method=getdoctorsbybrick&brickid=' + brickid;
        GetResponse(url, function (e) {

            if (e.Success) {
                PopulateDoctorsCombo(e.Response.split(';'));
                //  $('#ddlDoctors').val(calEvent.doctorID);
            }
        });
    });

    // Called when the selected index of class gets changed
    $('#ddlClasses').change(function () {

        $('#ddlBricks').val(-1);
        ShowDatesDropDown("dateSelect", 0);
        //alert($("#ddlActivities option:selected").data('products'));
        var referenceOfDoctorTd = $("#ddlDoctors");
        var classid = $("#ddlClasses option:selected").val();

        var initial = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
        var url = 'handler.ashx?method=getdoctorsbyclasswithdate&classid=' + classid + '&initial=' + initial;
        //var url = 'handler.ashx?method=getdoctorsbyclass&classid=' + classid;
        GetResponse(url, function (e) {

            if (e.Success) {
                PopulateDoctorsCombo(e.Response.split(';'));
                //  $('#ddlDoctors').val(calEvent.doctorID);
            }
        });
    });

    $('#ddlDoctors').change(function () {
        if ($('#ddlDoctors').val() == 0)
            $('#ddlActivities').val(0);
        else

            $('#ddlActivities').val(5);

        //var recordcount = $("#ddlActivities option:selected").data('products');
        //var remindercount = $("#ddlActivities option:selected").data('reminders');
        //var samplescount = $("#ddlActivities option:selected").data('samples');
        //var giftscount = $("#ddlActivities option:selected").data('gifts');
        //ShowProductsDropDown("Products", recordcount);
        //ShowProductsDropDown("Reminders", remindercount);
        //ShowProductsDropDown("Sample", samplescount);
        //ShowProductsDropDown("Gift", giftscount);



        var doctorID = $("#ddlDoctors option:selected").val();

        var url = 'handler.ashx?method=getfrequencybydoctor&doctorid=' + doctorID;
        GetResponse(url, function (e) {

            if (e.Success) {
                ShowDatesDropDown("dateSelect", e.Response);
            }
        });

        //url = 'handler.ashx?method=getproductsbydoctorspeciality&doctorid=' + doctorID;
        //GetResponse(url, function (e) {

        //    if (e.Success) {

        //        var hashSplit = e.Response.split('#');
        //        var semicolonSplit = hashSplit[0].split(';');

        //        for (j = 0; j < semicolonSplit.length; j++) {
        //            $("#Products" + j).val(semicolonSplit[j]);
        //        }

        //        semicolonSplit = hashSplit[1].split(';');
        //        for (j = 0; j < semicolonSplit.length; j++) {
        //            $("#Reminders" + j).val(semicolonSplit[j]);
        //        }
        //    }
        //});
    });

    $('#ddlDoctorMain').change(function () {
        calendar.fullCalendar('refetchEvents');
    });

    $('#ddlDoctorBrickMain').change(function () {
        if ($('#ddlDoctorBrickMain').val() == -1) {
            var initial = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
            url = 'handler.ashx?method=getdoctorsbybrickwithdate&initial=' + initial;
            //url = 'handler.ashx?method=getdoctors';
            GetResponse(url, function (e) {
                if (e.Success) {
                    PopulateDoctorsMainCombo(e.Response.split(';'));
                }
            });
        } else {
            var initial = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
            var brickid = $("#ddlDoctorBrickMain option:selected").val();
            var url = 'handler.ashx?method=getdoctorsbybrickwithdate&brickid=' + brickid + '&initial=' + initial;
            //var url = 'handler.ashx?method=getdoctorsbybrick&brickid=' + brickid;
            GetResponse(url, function (e) {

                if (e.Success) {
                    PopulateDoctorsMainCombo(e.Response.split(';'));

                    //  $('#ddlDoctors').val(calEvent.doctorID);
                }
            });
        }
    });


    $('#btncopyplan').click(function () {
        var CopyFromDate = $('#stdate').val();
        var url = 'handler.ashx?method=copyplan&CopyFromDate=' + CopyFromDate + '&CopyForDate=' + dateofday;
        GetResponse(url, function (e) {
            cnt.GetResponse(url, function (e) {
                if (e.Success) {
                    var initialdate = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                    var url = 'handler.ashx?method=getevents&initial=' + initialdate;
                    $('#preloader2').show();
                    GetResponse(url, function (e) {
                        if (e.Success) {
                            calendar.fullCalendar('refetchEvents');
                            $('#mask').hide();
                            $('.window').hide();
                        }
                        else {
                        }
                        $('#preloader2').hide();
                        alert("Selected Plan has been Copied!");
                    });
                }
            });
        });
    });
    // if the update/Add button of Edit Event Popup is pressed
    $('#btnAdd').click(function () {
        var recurringDays = '';
        var recurringDates = '';
        if ($('#chkMon').attr('checked')) {
            recurringDays += 'mon';
            recurringDays += ';';
        }
        if ($('#chkTue').attr('checked')) {
            recurringDays += 'tue';
            recurringDays += ';';
        }
        if ($('#chkWed').attr('checked')) {
            recurringDays += 'wed';
            recurringDays += ';';
        }
        if ($('#chkThu').attr('checked')) {
            recurringDays += 'thu';
            recurringDays += ';';
        }
        if ($('#chkFri').attr('checked')) {
            recurringDays += 'fri';
            recurringDays += ';';
        }
        if ($('#chkSat').attr('checked')) {
            recurringDays += 'sat';
            recurringDays += ';';
        }

        if (recurringDays.length > 1) {
            recurringDays.length -= 1;
        }
        for (a = 0; a < 8; a++) {

            recurringDates += $("#dateSelect" + a).val();
            recurringDates += ";"
        }

        var s = ValidateFields();
        if (s) {

            var activity = $('#ddlActivities').val();
            var starttime = $('#ddlTimeStart').val();
            var endtime = $('#ddlTimeEnd').val();
            var doctor = $('#ddlDoctors').val();
            //                    var doctorname = '-1';
            //                    if (doctor == 0) {
            //                        doctor = 1170;
            //                        doctorname = 'Meatting';
            //                    }
            //                    else {
            //                        doctorname = $("#ddlDoctors option:selected").text().split('-')[1];
            //                    }
            var doctorname = '-1';
            var check = $('#ddlActivities option:selected').text();
            //if (doctor == 0) {
            if (check == "Meeting") {
                doctor = 'Doc-8888';
                doctorname = 'Meeting';
            }
            else if (check == "Leave") {
                doctor = 'Doc-9999';
                doctorname = 'Leave';
            }
            //else if (check == "Marketing Activity") {
            //    doctor = 'Doc-7777';
            //    doctorname = 'Marketing Activity';
            //}
            else if (check == "Public Holiday") {
                doctor = 'Doc-66666';
                doctorname = 'Public Holiday';
            }
                //}
            else {
                doctorname = $("#ddlDoctors option:selected").text().split('-')[1];
            }

            var bmd = $('#ddlBMD').val();
            var Description = $("#txtDescription").val();
            var products = '';
            var reminders = '';
            var samples = '';
            var gifts = '';
            if ($('#btnAdd').val() == 'Save event') {
                // var referenceOfProductTd = $("#tdProducts");
                //var recordcount = $("#ddlActivities option:selected").data('products');
                ////referenceOfProductTd.html('');
                //for (a = 0; a < recordcount; a++) {

                //    products += $("#Products" + a).val();
                //    products += ";";

                //}

                //var recordcount = $("#ddlActivities option:selected").data('reminders');
                ////referenceOfProductTd.html('');
                //for (a = 0; a < recordcount; a++) {

                //    reminders += $("#Reminders" + a).val();
                //    reminders += ";";

                //}

                //var recordcountsample = $("#ddlActivities option:selected").data('samples');
                //for (a = 0; a < recordcountsample; a++) {

                //    samples += $("#Sample" + a).val() + "|" + $("#Quantity" + a).val();
                //    samples += ";";

                //}

                //var recordcountgift = $("#ddlActivities option:selected").data('gifts');
                //for (a = 0; a < recordcountgift; a++) {

                //    gifts += $("#Gift" + a).val();
                //    gifts += ";";

                //}


                url = 'handler.ashx?method=insertcallplannermonth&activity=' + activity + '&starttime=' + starttime + '&endtime=' + endtime + '&doctor=' + doctor + '&description=' + Description + '&date=' + dateofday + '&month=' + cnt.month + "&bmd=" + bmd + "&products=" + products + "&reminders=" + reminders + "&samples=" + samples + "&gifts=" + gifts + '&recurring=' + recurringDays + '&recurringDates=' + recurringDates;
                cnt.GetResponse(url, function (e) {
                    if (e.Success) {
                        var response = e.Response.split('^');
                        var alertResponse = '';
                        var successCount = 0;
                        for (i = 0; i < response.length; i++) {
                            var response2 = response[i].split(';');
                            if (response2[0] == 'outofrange') {
                                //alert("Time range already Exists");
                                alertResponse = alertResponse + response2[1] + ' (Time range already exists)\n';
                            }
                            else if (response2[0] == 'datediff') {
                                //alert("End date must be greater than Start Date");
                                alertResponse = "End date must be greater than Start Date";
                            }
                            else if (response2[0] == 'classfrequencyexceeded') {
                                //alert("You have already plan for this doctor class");
                                alertResponse = alertResponse + response2[1] + ' (You have already plan for this doctor class)\n';
                            }
                            //else if (response2[0] == 'productsame') {
                            //    //alert("Products should not be same");
                            //    alertResponse = alertResponse + response2[1] + ' (Products should not be same)\n';
                            //}
                            //else if (response2[0] == 'remindersame') {
                            //    //alert("Reminders should not be same");
                            //    alertResponse = alertResponse + response2[1] + ' (Reminders should not be same)\n';
                            //}
                            //else if (response2[0] == 'samplesame') {
                            //    //alert("Reminders should not be same");
                            //    alertResponse = alertResponse + response2[1] + ' (Sample should not be same)\n';
                            //}
                            //else if (response2[0] == 'giftsame') {
                            //    //alert("Reminders should not be same");
                            //    alertResponse = alertResponse + response2[1] + ' (Gift should not be same)\n';
                            //}
                            //else if (response2[0] == 'productcontainselect') {
                            //    //alert("One of the product is not selected");
                            //    alertResponse = alertResponse + response2[1] + ' (One of the product is not selected)\n';
                            //}
                            //else if (response2[0] == 'remindercontainselect') {
                            //    //alert("One of the reminder is not selected");
                            //    alertResponse = alertResponse + response2[1] + ' (One of the reminder is not selected)\n';
                            //}
                            else if (response2[0] == 'alreadyexistactivitywithsamedoctor') {
                                //alert("One of the reminder is not selected");
                                alertResponse = alertResponse + response2[1] + ' (Activity with doctor already exists)\n';
                            }
                            else {
                                ClearAddFields();
                                $('#btnAdd').val('Save event');
                                $("#txtDescription").val('');
                                var semisplit = response[i].split(';');
                                cnt.ClearAddFields();
                                var eday = [];
                                var emonth = [];
                                eday.id = semisplit[9];
                                eday.color = semisplit[6];
                                eday.textColor = semisplit[7];
                                eday.editable = semisplit[13];
                                eday.status = semisplit[10];
                                eday.statusReason = semisplit[11];
                                eday.planmonth = semisplit[14];
                                eday.monthID = semisplit[8];
                                eday.mioauthID = semisplit[12];
                                eday.divid = 'day';
                                //eday.calid = 'mio';
                                eday.allDay = false;
                                eday.activityID = semisplit[0];
                                eday.doctorID = semisplit[1];
                                eday.start = semisplit[2];
                                eday.end = semisplit[3];
                                eday.description = semisplit[4];
                                eday.title = semisplit[5];
                                eday.classid = semisplit[15];
                                eday.brickid = semisplit[16];
                                eday.products = semisplit[17];
                                eday.reminders = semisplit[18];
                                eday.samplesqty = semisplit[19];
                                eday.gifts = semisplit[20];
                                eday.doctorname = doctorname;
                                $('#dayCalender').fullCalendar('renderEvent', eday, true);
                                //   $('#dayCalender').fullCalendar('refetchEvents');
                                calendar.fullCalendar('refetchEvents');
                                //                                emonth.id = semisplit[9];
                                //                                emonth.color = semisplit[6];
                                //                                emonth.textColor = semisplit[7];
                                //                                emonth.editable = semisplit[13];
                                //                                emonth.status = semisplit[10];
                                //                                emonth.statusReason = semisplit[11];
                                //                                emonth.planmonth = semisplit[14];
                                //                                emonth.monthID = semisplit[8];
                                //                                emonth.mioauthID = semisplit[12];
                                //                                emonth.divid = 'main';
                                //                                emonth.allDay = false;
                                //                                emonth.activityID = semisplit[0];
                                //                                emonth.doctorID = semisplit[1];
                                //                                emonth.start = semisplit[2];
                                //                                emonth.end = semisplit[3];
                                //                                emonth.description = semisplit[4];
                                //                                emonth.title = semisplit[5];
                                //                                $('#calendar').fullCalendar('renderEvent', emonth, true);
                                //
                                // window.location.reload(true);
                                successCount++;
                            }
                        }
                        alertResponse = successCount.toString() + ' Event save sucessfully\n ' + alertResponse;
                        alert(alertResponse);
                    }
                    else {
                    }
                    $('#ddlBMD').val(-1);
                });
            }
            else if ($('#btnAdd').val() == 'Update Selected Event') {


                if (check == "Meeting") {
                    doctor = 'Doc-8888';
                    doctorname = 'Meeting';
                }
                else if (check == "Leave") {
                    doctor = 'Doc-9999';
                    doctorname = 'Leave';
                }
                //else if (check == "Marketing Activity") {
                //    doctor = 'Doc-7777';
                //    doctorname = 'Marketing Activity';
                //}
                else if (check == "Public Holiday") {
                    doctor = 'Doc-66666';
                    doctorname = 'Public Holiday';
                }
                    //}
                else {
                    doctorname = $("#ddlDoctors option:selected").text().split('-')[1];
                }
                //var recordcount = $("#ddlActivities option:selected").data('products');
                ////referenceOfProductTd.html('');
                //var products = '';
                //for (a = 0; a < recordcount; a++) {

                //    products += $("#Products" + a).val();
                //    products += ";";

                //}

                //var recordcount = $("#ddlActivities option:selected").data('reminders');
                ////referenceOfProductTd.html('');
                //for (a = 0; a < recordcount; a++) {

                //    reminders += $("#Reminders" + a).val();
                //    reminders += ";";

                //}

                //var recordcount = $("#ddlActivities option:selected").data('samples');
                ////referenceOfProductTd.html('');
                //for (a = 0; a < recordcount; a++) {
                //    samples += $("#Sample" + a).val() + "|" + $("#Quantity" + a).val();
                //    samples += ";";
                //}

                //var recordcount = $("#ddlActivities option:selected").data('gifts');
                ////referenceOfProductTd.html('');
                //for (a = 0; a < recordcount; a++) {
                //    gifts += $("#Gift" + a).val();
                //    gifts += ";";
                //}

                url = 'handler.ashx?method=updatecallplannermonth&activity=' + activity + '&starttime=' + starttime + '&endtime=' + endtime + '&doctor=' + doctor + '&description=' + Description + '&date=' + dateofday + '&id=' + cnt.currentEvent.id + "&bmd=" + bmd + "&products=" + products + "&reminders=" + reminders + "&samples=" + samples + "&gifts=" + gifts;

                cnt.GetResponse(url, function (e) {

                    if (e.Success) {
                        if (e.Response == 'outofrange') {
                            alert("Time range already Exists");
                        }
                        else if (e.Response == 'datediff') {
                            alert("End date must be greater than Start Date");
                        }
                        else if (e.Response == 'classfrequencyexceeded') {
                            alert("You have already plan for this doctor class");
                        }
                        //else if (e.Response == 'productsame') {
                        //    alert("Products should not be same");
                        //}
                        //else if (e.Response == 'remindersame') {
                        //    alert("Reminders should not be same");
                        //}
                        //else if (e.Response == 'samplesame') {
                        //    alert("Samples should not be same");
                        //}
                        //else if (e.Response == 'giftsame') {
                        //    alert("Gifts should not be same");
                        //}
                        //else if (e.Response == 'productcontainselect') {
                        //    alert("One of the product is not selected");
                        //}
                        //else if (e.Response == 'remindercontainselect') {
                        //    alert("One of the reminder is not selected");
                        //}
                        else {
                            var semisplit = e.Response.split(';');
                            ClearAddFields();
                            var eday = [];
                            var emonth = [];
                            eday.id = cnt.currentEvent.id;
                            eday.color = semisplit[6];
                            eday.textColor = semisplit[7];
                            eday.editable = cnt.currentEvent.editable;
                            eday.status = cnt.currentEvent.status;
                            eday.statusReason = cnt.currentEvent.statusReason;
                            eday.planmonth = cnt.currentEvent.planmonth;
                            eday.monthID = cnt.currentEvent.monthID;
                            eday.mioauthID = cnt.currentEvent.mioauthID;
                            eday.divid = cnt.currentEvent.divid;
                            eday.allDay = cnt.currentEvent.allDay;
                            eday.activityID = semisplit[0];
                            eday.doctorID = semisplit[1];
                            eday.start = semisplit[2];
                            eday.end = semisplit[3];
                            eday.description = semisplit[4];
                            eday.title = semisplit[5];
                            eday.classid = semisplit[8];
                            eday.brickid = semisplit[9];
                            eday.products = semisplit[10];
                            eday.reminders = semisplit[11];
                            eday.samplesqty = semisplit[12];
                            eday.gifts = semisplit[13];
                            eday.doctorname = doctorname;
                            //eday.calid = 'mio';
                            calendar.fullCalendar('refetchEvents');
                            //$('#dayCalender').fullCalendar('refetchEvents');
                            $('#dayCalender').fullCalendar('updateEvent', eday);
                            $('#dayCalender').fullCalendar('renderEvent', eday, true);

                            //                                emonth.id = cnt.currentEvent.id;
                            //                                emonth.color = semisplit[6];
                            //                                emonth.textColor = semisplit[7];
                            //                                emonth.editable = cnt.currentEvent.editable;
                            //                                emonth.status = cnt.currentEvent.status;
                            //                                emonth.statusReason = cnt.currentEvent.statusReason;
                            //                                emonth.planmonth = cnt.currentEvent.planmonth;
                            //                                emonth.monthID = cnt.currentEvent.monthID;
                            //                                emonth.mioauthID = cnt.currentEvent.mioauthID;
                            //                                emonth.divid = cnt.currentEvent.divid;
                            //                                emonth.allDay = cnt.currentEvent.allDay;
                            //                                emonth.activityID = semisplit[0];
                            //                                emonth.doctorID = semisplit[1];
                            //                                emonth.start = semisplit[2];
                            //                                emonth.end = semisplit[3];
                            //                                emonth.description = semisplit[4];
                            //                                emonth.title = semisplit[5];

                            //                                calendar.fullCalendar('updateEvent', emonth);
                            //                                calendar.fullCalendar('renderEvent', emonth, true); // make the event "stick
                            alert("Record has been updated");
                        }
                    }
                    else {
                    }
                    $('#ddlBMD').val(-1);
                });
                if (cnt.currentEvent.status == 'Resubmitted') {
                    $('#mask').hide();
                    $('.window').hide();
                }
            }
        }
    });


    $('#btnPlanStatus').click(function () {

        var initial = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
        url = 'handler.ashx?method=checkCurrentPlanStatus&initial=' + initial;

        var modal = new tingle.modal({
            footer: true,
            stickyFooter: false,
            closeMethods: ['overlay', 'button', 'escape'],
            closeLabel: "Close"

        });

        modal.setContent('<h1>Please Wait While Data Is Being Fetched...</h1>');

        modal.addFooterBtn('Close', 'button_grey button_halfWidth', function () {
            modal.close();
        });

        modal.open();
        cnt.GetResponse(url, function (e) {
            if (e.Success) {
                modal.open();
                modal.setContent(e.Response);
            }
            else {
                modal.open();
                modal.setContent("<h1>Server Returned Nothing</h1>");
            }
        });
    });


    // causes all feilds
    $('#btnReset').click(function () {
        ClearAddFields();
    });

    // Creation of main Calendar
    var calendar = $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        selectable: true,
        selectHelper: true,
        select: function (start, end, allDay) {

        },
        height: 950,
        editable: true,
        allDaySlot: false,

        events: function (start, end, callback) {
            // alert($('#calendar').fullCalendar('getView').name);
            $('#spanMyStatus').html('');
            $('#spanRejectComments').html('');
            $('#lblRejectComments').attr("style", "display:none");

            var initial = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
            url = 'handler.ashx?method=getdoctorswithclassnamewithdate&initial=' + initial;
            //url = 'handler.ashx?method=getdoctorswithclassname';
            GetResponse(url, function (e) {

                if (e.Success) {
                    PopulateDoctorsMainCombo(e.Response.split(';'));
                    //$('#ddlDoctors').val(calEvent.doctorID);
                }
            });

            PopulateDoctorsMainCombo = function (Doctors, callBack) {
                var ddl = $("#" + "ddlDoctorMain");
                ddl.children().remove();
                ddl.append($("<option value='-1' />").html("Select"));
                var N = Doctors.length;
                for (var a = 0; a < N; a++) {
                    var op = $("<option />").html(Doctors[a].split(',')[1]).val(Doctors[a].split(',')[0]);
                    ddl.append(op);
                }
                if (callBack != null)
                    callBack();
            };

            //url = 'handler.ashx?method=fillbrickswithdate&initial=' + initial;
            ////url = 'handler.ashx?method=fillbricks';
            //GetResponse(url, function(e) {
            //    if (e.Success) {
            //        PopulateDoctorBrickMainCombo(e.Response.split(';'));
            //    }
            //});

            //PopulateDoctorBrickMainCombo = function (doctorsBrick, callBack) {
            //    var ddl = $("#" + "ddlDoctorBrickMain");
            //    ddl.children().remove();
            //    ddl.append($("<option value='-1' />").html("Select"));
            //    var N = doctorsBrick.length;
            //    for (var a = 0; a < N; a++) {
            //        var op = $("<option />").html(doctorsBrick[a].split(',')[1]).val(doctorsBrick[a].split(',')[0]);
            //        ddl.append(op);
            //    }
            //    if (callBack != null)
            //        callBack();
            //};

            if ($('#calendar').fullCalendar('getView').name == 'month') {
                var initialdate = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                var mainDoctorID = $("#ddlDoctorMain option:selected").val();
                var url = 'handler.ashx?method=geteventssummary&initial=' + initialdate + '&doctor=' + mainDoctorID;
                $('#preloader').show();
                GetResponse(url, function (e) {
                    if (e.Success) {
                        var commaSplit = e.Response.split(',');
                        rowCount = commaSplit.length; // total count of records returned
                        var i = 0;
                        var events = [];

                        while (rowCount > 0) {

                            if (commaSplit[i].split(';')[6] != '') {
                                $('#spanMyStatus').html(commaSplit[i].split(';')[6]);
                                $('#labelMyStatus').attr("class", commaSplit[i].split(';')[7]);
                                $('#labelMyStatus').attr("style", "height:23;");
                            }
                            else {
                                $('#spanMyStatus').html('');
                                $('#labelMyStatus').attr("class", "none");
                                $('#labelMyStatus').attr("style", "height:23;");
                            }
                            if (commaSplit[i].split(';')[6] == 'Rejected') {
                                $('#spanRejectComments').html(commaSplit[i].split(';')[8]);
                                $('#lblRejectComments').attr("style", "display:block");
                            }
                            events.push({
                                id: commaSplit[i].split(';')[5],
                                title: commaSplit[i].split(';')[0],
                                start: $.fullCalendar.parseDate(commaSplit[i].split(';')[1], true),
                                end: $.fullCalendar.parseDate(commaSplit[i].split(';')[1], true),
                                color: commaSplit[i].split(';')[2],
                                textColor: commaSplit[i].split(';')[3],
                                count: commaSplit[i].split(';')[4],
                                //                                editable: commaSplit[i].split(';')[6],
                                //                                doctorID: commaSplit[i].split(';')[7],
                                //                                description: commaSplit[i].split(';')[8],
                                //                                status: commaSplit[i].split(';')[9],
                                //                                statusReason: commaSplit[i].split(';')[10],
                                //                                planmonth: commaSplit[i].split(';')[11],
                                //                                activityID: commaSplit[i].split(';')[12],
                                //                                monthID: commaSplit[i].split(';')[13],
                                //                                mioauthID: commaSplit[i].split(';')[14],
                                divid: 'main',
                                allDay: false
                            });
                            i++;
                            rowCount--;
                        }
                        callback(events);
                        calendar.fullCalendar('renderEvent', events, true);
                    }
                    else {
                    }
                    $('#preloader').hide();
                });
            }


            else if ($('#calendar').fullCalendar('getView').name == 'agendaDay') {

                var initialdate = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                var mainDoctorID = $("#ddlDoctorMain option:selected").val();
                var url = 'handler.ashx?method=getevents&initial=' + initialdate + '&doctor=' + mainDoctorID;
                $('#preloader').show();
                GetResponse(url, function (e) {
                    if (e.Success) {
                        var commaSplit = e.Response.split('~');
                        rowCount = commaSplit.length; // total count of records returned
                        var i = 0;
                        var events = [];
                        while (rowCount > 0) {
                            if (commaSplit[i].split(';')[16] != '') {
                                $('#spanMyStatus').html(commaSplit[i].split(';')[16]);
                                $('#labelMyStatus').attr("class", commaSplit[i].split(';')[17]);
                                $('#labelMyStatus').attr("style", "height:23;");
                            }
                            else {
                                $('#spanMyStatus').html('');
                                $('#labelMyStatus').attr("class", "none");
                                $('#labelMyStatus').attr("style", "height:23;");
                            }
                            if (commaSplit[i].split(';')[16] == 'Rejected') {
                                $('#spanRejectComments').html(commaSplit[i].split(';')[10]);
                                $('#lblRejectComments').attr("style", "display:block");
                            }
                            events.push({
                                id: commaSplit[i].split(';')[4],
                                title: commaSplit[i].split(';')[0],
                                start: $.fullCalendar.parseDate(commaSplit[i].split(';')[1], true),
                                end: $.fullCalendar.parseDate(commaSplit[i].split(';')[2], true),
                                color: commaSplit[i].split(';')[3],
                                textColor: commaSplit[i].split(';')[5],
                                editable: commaSplit[i].split(';')[6],
                                doctorID: commaSplit[i].split(';')[7],
                                description: commaSplit[i].split(';')[8],
                                status: commaSplit[i].split(';')[9],
                                statusReason: commaSplit[i].split(';')[10],
                                planmonth: commaSplit[i].split(';')[11],
                                activityID: commaSplit[i].split(';')[12],
                                monthID: commaSplit[i].split(';')[13],
                                mioauthID: commaSplit[i].split(';')[14],
                                doctorname: commaSplit[i].split(';')[15],
                                DocBrick: commaSplit[i].split(';')[19],
                                isJV: commaSplit[i].split(';')[18],
                                products: commaSplit[i].split(';')[19],
                                classid: commaSplit[i].split(';')[20],
                                brickid: commaSplit[i].split(';')[21],
                                reminders: commaSplit[i].split(';')[22],
                                samplesqty: commaSplit[i].split(';')[23],
                                gifts: commaSplit[i].split(';')[24],
                                divid: 'mainday',
                                calid: 'mio',
                                allDay: false
                            });
                            i++;
                            rowCount--;
                        }
                        callback(events);
                        calendar.fullCalendar('renderEvent', events, true);
                    }
                    else {
                    }
                    $('#preloader').hide();
                });

            }
            else {

                var initialdate = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                var mainDoctorID = $("#ddlDoctorMain option:selected").val();
                var url = 'handler.ashx?method=getevents&initial=' + initialdate + '&doctor=' + mainDoctorID;
                $('#preloader').show();
                GetResponse(url, function (e) {

                    if (e.Success) {
                        var commaSplit = e.Response.split('~');
                        rowCount = commaSplit.length; // total count of records returned
                        var i = 0;
                        var events = [];
                        while (rowCount > 0) {
                            if (commaSplit[i].split(';')[16] != '') {
                                $('#spanMyStatus').html(commaSplit[i].split(';')[16]);
                                $('#labelMyStatus').attr("class", commaSplit[i].split(';')[17]);
                                $('#labelMyStatus').attr("style", "height:23;");
                            }
                            else {
                                $('#spanMyStatus').html("");
                                $('#labelMyStatus').attr("class", "none");
                                $('#labelMyStatus').attr("style", "height:23;");
                            }
                            if (commaSplit[i].split(';')[16] == 'Rejected') {
                                $('#spanRejectComments').html(commaSplit[i].split(';')[10]);
                                $('#lblRejectComments').attr("style", "display:block");
                            }
                            events.push({
                                id: commaSplit[i].split(';')[4],
                                title: commaSplit[i].split(';')[0],
                                start: $.fullCalendar.parseDate(commaSplit[i].split(';')[1], true),
                                end: $.fullCalendar.parseDate(commaSplit[i].split(';')[2], true),
                                color: commaSplit[i].split(';')[3],
                                textColor: commaSplit[i].split(';')[5],
                                editable: commaSplit[i].split(';')[6],
                                doctorID: commaSplit[i].split(';')[7],
                                description: commaSplit[i].split(';')[8],
                                status: commaSplit[i].split(';')[9],
                                statusReason: commaSplit[i].split(';')[10],
                                planmonth: commaSplit[i].split(';')[11],
                                activityID: commaSplit[i].split(';')[12],
                                monthID: commaSplit[i].split(';')[13],
                                mioauthID: commaSplit[i].split(';')[14],
                                doctorname: commaSplit[i].split(';')[15],
                                DocBrick: commaSplit[i].split(';')[19],
                                isJV: commaSplit[i].split(';')[18],
                                products: commaSplit[i].split(';')[19],
                                classid: commaSplit[i].split(';')[20],
                                brickid: commaSplit[i].split(';')[21],
                                reminders: commaSplit[i].split(';')[22],
                                samplesqty: commaSplit[i].split(';')[23],
                                gifts: commaSplit[i].split(';')[24],
                                divid: 'mainweek',
                                allDay: false
                            });
                            i++;
                            rowCount--;
                        }

                        callback(events);
                        $('#calendar').fullCalendar('renderEvent', events, true);
                    }
                    else {
                    }
                    $('#preloader').hide();
                });

            }
        },
        cellDisplay: function (cell, date) {
            var day = $.fullCalendar.formatDate(date, "MM dd yyyy HH:mm:ss");
            //var url = 'handler.ashx?method=checkholidays&initial=' + day;
            //GetResponse(url, function (e) {
            //    if (e.Response == "present") {
            //        $(cell).css({ background: 'pink' });
            //    }

            //    else {
            //        $(cell).css({ background: 'white' });
            //    }
            //});
        },
        timeFormat: 'HH:mm',
        eventClick: function (calEvent, jsEvent, view) {
            $('#preloader2').show();
            if (eclick) {
                if (view.name == 'month') {
                    var cp = $("#" + calEvent.id + calEvent.divid + "tcp");
                    cp.css({ background: 'white' });
                    cp.css({ color: 'black' });
                    //cp.html('x');
                    //  cp.click(function () {
                    eclick = false;
                    var url = 'handler.ashx?method=geteventdetails&actname=' + calEvent.title + '&start=' + $.fullCalendar.formatDate(calEvent.start, "MM dd yyyy HH:mm:ss");
                    GetResponse(url, function (e) {
                        if (e.Success) {
                            commasplit = e.Response.split(',');

                            for (i = 0; i < commasplit.length; i++) {
                                //cp.css("display", "inline");
                                semisplit = commasplit[i].split(';');
                                cp.append(semisplit[1] + " - " + semisplit[2]);
                                cp.append("<br />");
                            }

                            //  calendar.fullCalendar('removeEvents', calEvent.id);
                        }
                        else {
                        }
                    });
                }
                else {

                    var url = 'handler.ashx?method=checkforedit&date=' + $.fullCalendar.formatDate(calEvent.start, "MM dd yyyy HH:mm:ss");
                    GetResponse(url, function (e) {
                        if (isJVClick == '0') {
                            if (e.Response.split(';')[0] == "True") {
                                $('#btnAdd').attr("style", "display:block");
                            }
                            else {
                                $('#btnAdd').attr("style", "display:none");
                            }
                            //if (e.Response.split(';')[0] == "True") {

                            //if (calEvent.editable == "True") {
                            dateofday = $.fullCalendar.formatDate(calEvent.start, "MM dd yyyy HH:mm:ss");
                            {
                                var id = $('a[name=modalAdd]').attr('href');

                                //Get the screen height and width
                                var maskHeight = $(document).height();
                                var maskWidth = $(window).width();

                                //Set heigth and width to mask to fill up the whole screen
                                $('#mask').css({ 'width': maskWidth, 'height': maskHeight });

                                //transition effect		
                                //$('#mask').fadeIn();
                                $('#mask').fadeTo("fast", 0.8);

                                //Get the window height and width
                                var winH = $(window).height();
                                var winW = $(window).width();

                                //Set the popup window to center
                                //$(id).css('top', winH / 12 - $(id).height() / 12);
                                $(id).css('top', 0.5);
                                $(id).css('left', winW / 2 - $(id).width() / 2);

                                CreateProductsDropDown();
                                CreateDatesDropDown();

                                var url = 'handler.ashx?method=getactivities';
                                GetResponse(url, function (e) {

                                    if (e.Success) {
                                        PopulateActivitiesCombo(e.Response.split(';'));
                                        $('#ddlActivities').val(calEvent.activityID);

                                       // if ($('#ddlActivities').val() == 6 || $('#ddlActivities').val() == 7 || $('#ddlActivities').val() == 8 || $('#ddlActivities').val() == 12) {
                                        if ( $('#ddlActivities').val() == 7 || $('#ddlActivities').val() == 8 || $('#ddlActivities').val() == 12) {

                                            $("#ddlDoctors").val(0);
                                            $('#ddlTimeStart').val(-1)
                                            $('#ddlTimeEnd').val(-1);

                                            if ($('#ddlActivities').val() == 7 || $('#ddlActivities').val() == 12) {
                                                $('#ddlTimeStart').val("08:00:00")
                                                $('#ddlTimeEnd').val("23:59:00");
                                                $("#ddlTimeStart").prop("disabled", true);
                                                $("#ddlTimeEnd").prop("disabled", true);
                                                $("#ddlDoctors").prop("disabled", true);
                                            }
                                            //    else if ($('#ddlActivities').val() == 6 || $('#ddlActivities').val() == 8) {
                                            else if ( $('#ddlActivities').val() == 8) {
                                                $("#ddlTimeStart").prop("disabled", false);
                                                $("#ddlTimeEnd").prop("disabled", false);
                                                $("#ddlDoctors").prop("disabled", true);
                                            }
                                            else {
                                                $("#ddlTimeStart").prop("disabled", false);
                                                $("#ddlTimeEnd").prop("disabled", false);
                                                $("#ddlDoctors").prop("disabled", false);
                                            }
                                        }
                                        else {
                                            $("#ddlTimeStart").prop("disabled", false);
                                            $("#ddlTimeEnd").prop("disabled", false);
                                            $("#ddlDoctors").prop("disabled", false);
                                            $('#ddlTimeStart').val(-1)
                                            $('#ddlTimeEnd').val(-1);
                                        }

                                    }
                                });

                                var initial = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                                var url = 'handler.ashx?method=getdoctorswithdate&initial=' + initial;
                                //var url = 'handler.ashx?method=getdoctors';
                                GetResponse(url, function (e) {

                                    if (e.Success) {
                                        PopulateDoctorsCombo(e.Response.split(';'));
                                        $('#ddlDoctors').val(calEvent.doctorID);
                                    }
                                });
                                var url = 'handler.ashx?method=gettime';
                                GetResponse(url, function (e) {
                                    if (e.Success) {
                                        PopulateTimeCombos(e.Response.split(';'), null, "ddlTimeStart");
                                        PopulateTimeCombos(e.Response.split(';'), null, "ddlTimeEnd");
                                        ls = $.fullCalendar.formatDate(calEvent.start, "MM dd yyyy HH:mm:ss");
                                        le = $.fullCalendar.formatDate(calEvent.end, "MM dd yyyy HH:mm:ss");
                                        $('#ddlTimeStart').val(ls.substring(ls.length - 8, ls.length));
                                        $('#ddlTimeEnd').val(le.substring(le.length - 8, le.length));
                                    }
                                });

                                var url = 'handler.ashx?method=fillclasses';
                                GetResponse(url, function (e) {

                                    if (e.Success) {
                                        PopulateClassesCombo(e.Response.split(';'));
                                        $('#ddlClasses').val(calEvent.classid);
                                    }
                                });
                                //saeed
                                var initial = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                                var url = 'handler.ashx?method=fillbrickswithdate&initial=' + initial;
                                //var url = 'handler.ashx?method=fillbricks';
                                GetResponse(url, function (e) {

                                    if (e.Success) {
                                        PopulateBricksCombo(e.Response.split(';'));
                                        $('#ddlBricks').val(calEvent.brickid);
                                    }
                                });

                                $(id).fadeIn();

                                //var url = 'zsmhandler.ashx?method=fillbmd';
                                //GetResponse(url, function (e) {
                                //    if (e.Success) {

                                //        if (e.Response != '') {


                                //            bmds = e.Response.split(';');
                                //            var ddl = $("#" + "ddlBMD");
                                //            ddl.children().remove();
                                //            ddl.append($("<option value='-1' />").html("Select"));
                                //            var N = bmds.length;
                                //            for (var a = 0; a < N; a++) {
                                //                var op = $("<option />").html(bmds[a].split(',')[2] + ' - ' + bmds[a].split(',')[1]).val(bmds[a].split(',')[0]).data('bmdname', bmds[a].split(',')[1]);
                                //                ddl.append(op);
                                //            }
                                //        }
                                //    }
                                //});
                                $('#dayCalender').html('');
                                createCalendar(calEvent.start);
                                $('#txtDescription').val(calEvent.description);

                                if (calEvent.status == 'Rejected') {
                                    $('#ulRejectComments1').attr("style", "display:block");
                                    $('#txtRejectComments1').val(calEvent.statusReason);
                                }
                                else {
                                    $('#ulRejectComments1').attr("style", "display:none");
                                    $('#txtRejectComments1').val('');
                                }

                                $('#btnAdd').val('Update Selected Event');
                                clearDateSelectddls();
                                cnt.currentEvent = calEvent;

                                if (calEvent.title == 'BMD') {

                                    var url = 'zsmhandler.ashx?method=getbmdformio&mioid=' + calEvent.id;
                                    GetResponse(url, function (e) {
                                        if (e.Success) {
                                            if (e.Response != '') {
                                                $("#ddlBMD").val(e.Response);
                                            }
                                        }
                                    });
                                    $('#divBMD').attr("style", "display:block");
                                }
                                else {
                                    $('#divBMD').attr("style", "display:none");
                                }
                            }
                            //}
                            //}
                        }
                        else {
                            isJVClick = '0';
                        }
                    });

                }
            }
            $('#preloader2').hide();
        },

        eventMouseover: function (calEvent, jsEvent, view) {
            if (view.name != 'month') {

                var url = 'handler.ashx?method=getinformedjvs&id=' + calEvent.id;
                GetResponse(url, function (e) {
                    if (e.Success) {
                        if (e.Response != '') {
                            cp1 = $("#" + calEvent.id + calEvent.divid + "informed");
                            cp1.html('<div style="float:right; cursor:pointer; padding-right:5px; padding-left:5px;"> JV </div>');
                            cp1.click(function () {
                                var id = $('a[name=modalJVs]').attr('href');
                                $("#DivJVs").html('');
                                //Get the screen height and width
                                var maskHeight = $(document).height();
                                var maskWidth = $(window).width();

                                //Set heigth and width to mask to fill up the whole screen
                                $('#mask').css({ 'width': maskWidth, 'height': maskHeight });

                                //transition effect		
                                //$('#mask').fadeIn();
                                $('#mask').fadeTo("fast", 0.8);

                                //Get the window height and width
                                var winH = $(window).height();
                                var winW = $(window).width();

                                //Set the popup window to center
                                //$(id).css('top', winH / 12 - $(id).height() / 12);
                                $(id).css('top', 0.5);
                                $(id).css('left', winW / 2 - $(id).width() / 2);

                                var semisplit = e.Response.split(';');
                                var divJVS = '<div class="persoanl-data"><div class="inner-head">Joint Visit Details</div><div class="inner-left"><ul class="form_list">';
                                for (a = 0; a < semisplit.length; a++) {
                                    var commasplit = semisplit[a].split(',');
                                    //$("#DivJVs").append('<table> <tr> <td> <span style="color:White;font-weight:bold">  Employee Role: </span></td><td><span style="color:White;" id="JVRole">' + commasplit[0] + '</span></td></tr><tr><td><span style="color:White;font-weight:bold"> Comments: </span></td><td><span style="color:White;" id="JVComments">' + commasplit[1] + '  </span></td></tr></table><br />');
                                    divJVS += '<li>Employee Role<br /><input type="text" readonly="true" value=' + commasplit[0] + '></input></li><li>Comments<br /><textarea readonly="readonly" class="styledtextarea_2">' + commasplit[1] + '</textarea></li>';

                                }
                                divJVS += '</ul></div></div>';
                                $("#DivJVs").append(divJVS);
                                $(id).fadeIn();
                                isJVClick = '1';
                            });
                        }
                    }
                    else {
                    }
                });
                if (calEvent.editable == "True") {
                    cp = $("#" + calEvent.id + calEvent.divid + "tcp");
                    cp.html('<div style="float:right; cursor:pointer; padding-right:5px; padding-left:5px;"> X </div>'); //week view
                    //alert(cp.html());
                    cp.click(function () {
                        eclick = false;
                        var url = 'handler.ashx?method=delevent&id=' + calEvent.id;
                        GetResponse(url, function (e) {
                            if (e.Success) {
                                calendar.fullCalendar('removeEvents', calEvent.id);
                                calendar.fullCalendar('refetchEvents');
                                alert('Event has been deleted successfully');
                            }
                            else {
                            }
                        });
                        // return;
                    });
                }
                //                        if (calEvent.status == 'Rejected') {
                //                            cp2 = $("#" + calEvent.id + calEvent.divid + "rejected");
                //                            cp2.html('<div style="float:right; cursor:pointer; padding-right:5px; padding-left:5px;"> REJ </div>');
                //                            cp2.click(function () {
                //                                var id = $('a[name=modalREJ]').attr('href');
                //                                $("#DivREJ").html('');
                //                                //Get the screen height and width
                //                                var maskHeight = $(document).height();
                //                                var maskWidth = $(window).width();

                //                                //Set heigth and width to mask to fill up the whole screen
                //                                $('#mask').css({ 'width': maskWidth, 'height': maskHeight });

                //                                //transition effect		
                //                                //$('#mask').fadeIn();
                //                                $('#mask').fadeTo("fast", 0.8);

                //                                //Get the window height and width
                //                                var winH = $(window).height();
                //                                var winW = $(window).width();

                //                                //Set the popup window to center
                //                                //$(id).css('top', winH / 12 - $(id).height() / 12);
                //                                $(id).css('top', 0.5);
                //                                $(id).css('left', winW / 2 - $(id).width() / 2);

                //                                var divREJ = '<div class="persoanl-data"><div class="inner-head">Reject Comments</div><div class="inner-left"><ul class="form_list"><li><textarea readonly="readonly" class="styledtextarea_2">' + calEvent.statusReason + '</textarea></li></ul></div></div>';
                //                                $("#DivREJ").append(divREJ);
                //                                $(id).fadeIn();
                //                            });
                //                        }
                //                        else {
                //                            alert('a');
                //                        }

            }
        },
        eventMouseout: function (calEvent, jsEvent, view) {
            eclick = true;

            cp = $("#" + calEvent.id + calEvent.divid + "tcp");
            cp.html('');
            cp.unbind('click');

            cp1 = $("#" + calEvent.id + calEvent.divid + "informed");
            if (calEvent.isJV == 'True') {
                cp1.html('<div style="float:right; cursor:pointer; padding-right:5px; padding-left:5px;"> JV </div>');
            }
            else {
                cp1.html('');
            }
            cp1.unbind('click');

            //                    cp2 = $("#" + calEvent.id + calEvent.divid + "rejected");
            //                    if (calEvent.status == 'Rejected') {
            //                        cp2.html('<div style="float:right; cursor:pointer; padding-right:5px; padding-left:5px;"> REJ </div>');
            //                    }
            //                    else {
            //                        cp2.html('');
            //                    }
            //                    cp2.unbind('click');
        },
        dayClick: function (date, allDay, jsEvent, view) {

            var day = $.fullCalendar.formatDate(date, "MM dd yyyy HH:mm:ss");
            var url = 'handler.ashx?method=checkholidays&initial=' + day;
            GetResponse(url, function (e) {
                if (e.Success) {
                    if (e.Response != "present") {
                        dateofday = $.fullCalendar.formatDate(date, "MM dd yyyy HH:mm:ss");
                        $('#divBMD').attr("style", "display:none");
                        var url = 'zsmhandler.ashx?method=fillbmd';
                        GetResponse(url, function (e) {
                            if (e.Success) {

                                if (e.Response != '') {


                                    bmds = e.Response.split(';');
                                    var ddl = $("#" + "ddlBMD");
                                    ddl.children().remove();
                                    ddl.append($("<option value='-1' />").html("Select"));
                                    var N = bmds.length;
                                    for (var a = 0; a < N; a++) {
                                        var op = $("<option />").html(bmds[a].split(',')[2] + ' - ' + bmds[a].split(',')[1]).val(bmds[a].split(',')[0]).data('bmdname', bmds[a].split(',')[1]);
                                        ddl.append(op);
                                    }
                                }
                            }
                        });

                        if (view.start.getMonth() == date.getMonth()) {
                            var url = 'handler.ashx?method=checkforedit&date=' + dateofday;
                            GetResponse(url, function (e) {
                                if (e.Response == '') {
                                    $('#btnAdd').attr("style", "display:block");
                                    var id = $('a[name=modalAdd]').attr('href');

                                    //Get the screen height and width
                                    var maskHeight = $(document).height();
                                    var maskWidth = $(window).width();

                                    //Set heigth and width to mask to fill up the whole screen
                                    $('#mask').css({ 'width': maskWidth, 'height': maskHeight });

                                    //transition effect		
                                    //$('#mask').fadeIn();
                                    $('#mask').fadeTo("fast", 0.8);

                                    //Get the window height and width
                                    var winH = $(window).height();
                                    var winW = $(window).width();

                                    //Set the popup window to center
                                    //$(id).css('top', winH / 12 - $(id).height() / 12);
                                    $(id).css('top', 0.5);
                                    $(id).css('left', winW / 2 - $(id).width() / 2);

                                    CreateProductsDropDown();
                                    CreateDatesDropDown();

                                    var url = 'handler.ashx?method=getactivities';
                                    GetResponse(url, function (e) {

                                        if (e.Success) {
                                            PopulateActivitiesCombo(e.Response.split(';'));
                                            var recordcount = $("#ddlActivities option:selected").data('products');
                                            var remindercount = $("#ddlActivities option:selected").data('reminders');
                                            var samplescount = $("#ddlActivities option:selected").data('samples');
                                            var giftscount = $("#ddlActivities option:selected").data('gifts');
                                            ShowProductsDropDown("Products", recordcount);
                                            ShowProductsDropDown("Reminders", remindercount);
                                            ShowProductsDropDown("Sample", samplescount);
                                            ShowProductsDropDown("Gift", giftscount);
                                        }
                                    });
                                    var initial = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                                    var url = 'handler.ashx?method=getdoctorswithdate&initial=' + initial;
                                    //var url = 'handler.ashx?method=getdoctors';
                                    GetResponse(url, function (e) {

                                        if (e.Success) {
                                            PopulateDoctorsCombo(e.Response.split(';'));
                                        }
                                    });

                                    var url = 'handler.ashx?method=gettime';
                                    GetResponse(url, function (e) {
                                        if (e.Success) {
                                            PopulateTimeCombos(e.Response.split(';'), null, "ddlTimeStart");
                                            PopulateTimeCombos(e.Response.split(';'), null, "ddlTimeEnd");
                                        }
                                    });

                                    var url = 'handler.ashx?method=fillclasses';
                                    GetResponse(url, function (e) {

                                        if (e.Success) {
                                            PopulateClassesCombo(e.Response.split(';'));
                                            //$('#ddlClasses').val(calEvent.doctorID);
                                        }
                                    });
                                    var initial = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                                    var url = 'handler.ashx?method=fillbrickswithdate&initial=' + initial;
                                    //var url = 'handler.ashx?method=fillbricks';
                                    GetResponse(url, function (e) {

                                        if (e.Success) {
                                            PopulateBricksCombo(e.Response.split(';'));
                                            //$('#ddlClasses').val(calEvent.doctorID);
                                        }
                                    });
                                    //transition effect
                                    $(id).fadeIn();
                                    $('#dayCalender').html('');
                                    createCalendar(date);
                                }
                                else if (e.Response.split(';')[1] != "Resubmitted") {
                                    if (e.Response.split(';')[0] == "True") {
                                        $('#btnAdd').attr("style", "display:block");
                                    }
                                    else {
                                        $('#btnAdd').attr("style", "display:none");
                                    }
                                    var id = $('a[name=modalAdd]').attr('href');

                                    //Get the screen height and width
                                    var maskHeight = $(document).height();
                                    var maskWidth = $(window).width();

                                    //Set heigth and width to mask to fill up the whole screen
                                    $('#mask').css({ 'width': maskWidth, 'height': maskHeight });

                                    //transition effect		
                                    //$('#mask').fadeIn();
                                    $('#mask').fadeTo("fast", 0.8);

                                    //Get the window height and width
                                    var winH = $(window).height();
                                    var winW = $(window).width();

                                    //Set the popup window to center
                                    //$(id).css('top', winH / 12 - $(id).height() / 12);
                                    $(id).css('top', 0.5);
                                    $(id).css('left', winW / 2 - $(id).width() / 2);

                                    CreateProductsDropDown();
                                    CreateDatesDropDown();

                                    var url = 'handler.ashx?method=getactivities';
                                    GetResponse(url, function (e) {

                                        if (e.Success) {
                                            PopulateActivitiesCombo(e.Response.split(';'));
                                            //var recordcount = $("#ddlActivities option:selected").data('products');
                                            //var remindercount = $("#ddlActivities option:selected").data('reminders');
                                            //var samplescount = $("#ddlActivities option:selected").data('samples');
                                            //var giftscount = $("#ddlActivities option:selected").data('gifts');
                                            //ShowProductsDropDown("Products", recordcount);
                                            //ShowProductsDropDown("Reminders", remindercount);
                                            //ShowProductsDropDown("Sample", samplescount);
                                            //ShowProductsDropDown("Gift", giftscount);
                                        }
                                    });
                                    var initial = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                                    var url = 'handler.ashx?method=getdoctorswithdate&initial=' + initial;
                                    //var url = 'handler.ashx?method=getdoctors';
                                    GetResponse(url, function (e) {

                                        if (e.Success) {
                                            PopulateDoctorsCombo(e.Response.split(';'));
                                        }
                                    });

                                    var url = 'handler.ashx?method=gettime';
                                    GetResponse(url, function (e) {

                                        if (e.Success) {
                                            PopulateTimeCombos(e.Response.split(';'), null, "ddlTimeStart");
                                            PopulateTimeCombos(e.Response.split(';'), null, "ddlTimeEnd");
                                        }
                                    });

                                    var url = 'handler.ashx?method=fillclasses';
                                    GetResponse(url, function (e) {

                                        if (e.Success) {
                                            PopulateClassesCombo(e.Response.split(';'));
                                            //$('#ddlClasses').val(calEvent.doctorID);
                                        }
                                    });
                                    var initial = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                                    var url = 'handler.ashx?method=fillbrickswithdate&initial=' + initial;
                                    //var url = 'handler.ashx?method=fillbricks';
                                    GetResponse(url, function (e) {

                                        if (e.Success) {
                                            PopulateBricksCombo(e.Response.split(';'));
                                            //$('#ddlClasses').val(calEvent.doctorID);
                                        }
                                    });
                                    //t
                                    var url = 'handler.ashx?method=gettime';
                                    GetResponse(url, function (e) {
                                        if (e.Success) {
                                            PopulateTimeCombos(e.Response.split(';'), null, "ddlTimeStart");
                                            PopulateTimeCombos(e.Response.split(';'), null, "ddlTimeEnd");
                                        }
                                    });
                                    //transition effect
                                    $(id).fadeIn();
                                    $('#dayCalender').html('');
                                    createCalendar(date);

                                    if (allDay) {
                                    } else {
                                    }
                                }
                            });
                        }
                    }
                }
                else {
                }
            });
        },
        disableResizing: true,
        disableDragging: true
    });

});

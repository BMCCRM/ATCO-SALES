function pageLoad() {
    GetCurrentUser();

}

function FillProductSku() {

    myData = '';
    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/FillProduct",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessFillProduct,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}
function onSuccessFillProduct(data, status) {

    if (data.d != "") {
        value = '-1';
        name = 'Select All Product';

        $("#pro1").append("<option value='" + value + "'>" + name + "</option>");
        $("#pro2").append("<option value='" + value + "'>" + name + "</option>");
        $("#pro3").append("<option value='" + value + "'>" + name + "</option>");
        $("#pro4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#pro1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#pro2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#pro3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#pro4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });

    }
}
function GetCurrentUser() {

    $.ajax({
        type: "POST",
        url: "../form/CommonService.asmx/GetCurrentUser",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUser,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetCurrentUser(data, status) {

    if (data.d != "") {

        EmployeeId = data.d;
    }

    GetCurrentUserLoginID();

}
function GetCurrentUserLoginID() {

    $.ajax({
        type: "POST",
        url: "../form/CommonService.asmx/GetCurrentUserLoginID",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUserLoginID,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetCurrentUserLoginID(data, status) {

    if (data.d != "") {

        CurrentUserLoginId = data.d;
    }

    GetCurrentUserRole();
}
function GetCurrentUserRole() {

    $.ajax({
        type: "POST",
        url: "../form/CommonService.asmx/GetCurrentUserRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUserRole,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetCurrentUserRole(data, status) {

    if (data.d != "") {
        CurrentUserRole = data.d;
        myData = "{'employeeid':'" + EmployeeId + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/getemployeeHR",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessdefaulyHR,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
}
function onSuccessdefaulyHR(data, status) {

    if (data.d != "") {
        document.getElementById('selmio').innerHTML = "";
        document.getElementById('selBrick').innerHTML = "";
        document.getElementById('selClass').innerHTML = "";
        document.getElementById('selSpecialty').innerHTML = "";
        document.getElementById('selDoctor').innerHTML = "";

        $("#selmio").append("<option value='-1'>Select FMO</option>");
        $("#selBrick").append("<option value='-1'>Select Brick</option>");
        $("#selClass").append("<option value='-1'>Select Class</option>");
        $("#selSpecialty").append("<option value='-1'>Select Specialty</option>");
        $("#selDoctor").append("<option value='-1'>Select Doctor</option>");


        $('#loadingdiv2').jqm({ modal: true });
        $('#loadingdiv2').jqm();
        $('#loadingdiv2').jqmShow();

        if (CurrentUserRole == 'rl5') {
            H2 = data.d[0].LevelId3
            H3 = data.d[0].LevelId4;
            H4 = data.d[0].LevelId5;
            H5 = -1;

            $("#btnsave").hide();
            $("#btnApproval").hide();
            $("#selmio").show();
            $('#loadingdiv2').jqmHide();
            $('#selmio').change(OnChangeddlMio);
            loadMio();

        }
        if (CurrentUserRole == 'rl6') {
            H2 = data.d[0].LevelId3;
            H3 = data.d[0].LevelId4;
            H4 = data.d[0].LevelId5;
            H5 = data.d[0].LevelId6;
            H6 = EmployeeId;
            $("#btnsave").show();
            $("#btnApproval").show();
            $("#selmio").hide();
            FillProductSku();
            loadbrick();
            loadClass();
            loadSpecialty();
            loadDoctors();
            showplan();
        }

    }


}





function loadMio() {


    myData = "{'_EmployeeId':'" + EmployeeId + "' }";

    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/MIOall",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        success: function (data) {
            //jsonParse(
            var result = data.d;
            $.each(result, function (i, option) {
                $('#selmio').append('<option Value="' + option.EmployeeId + '">' + option.EmployeeName + '</option>');
            });
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

}
function getNumberOfDaysInMonth(dateObject) {
    this.daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var month = dateObject.getMonth(); if (month == 1) {
        var leapYear = (new Date(dateObject.getYear(), 1, 29).getDate()) == 29; if (leapYear)
            return 29;
        else
            return 28;
    } else return this.daysPerMonth[month];
}
function getFirstDayOfMonth(dateObject) {
    var save = dateObject.getDate();
    dateObject.setDate(1);
    var result = dateObject.getDay();
    dateObject.setDate(save);
    return result;
}
function isToday(dayNumber) {
    var today = new Date();
    return (today.getDate() == dayNumber && today.getFullYear() == Gdate.getFullYear() && today.getMonth() == Gdate.getMonth());
}
function renderDay(topRow, bottomRow, data) {
    var cssClass = "";

    cssClass += (isToday(data.number)) ? "today" : "";
    cssClass += (data.events.length) ? " event" : "";

    topRow.append("<li><div style='width: 20px;' class=\"" + cssClass + "\">" + data.name + "</div></li>");

    bottomRow.append("<li><div style='width: 20px;' class=\"" + cssClass + "\">" + data.number + "</div></li>");

    nameEl = topRow.find("div:last"); numbEl = bottomRow.find("div:last");

    if (data.events.length == 0)
        return;

    var self = this; var enterClosure = function (e) { self.onMouseEnter(e); };

    var leaveClosure = function (e) { self.onMouseLeave(e); };
    nameEl.bind("mouseenter", data, enterClosure);
    numbEl.bind("mouseenter", data, enterClosure); nameEl.bind("mouseleave", data, leaveClosure);
    numbEl.bind("mouseleave", data, leaveClosure);
}

var Timeline = function (container, date) {
    this.daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    this.monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.dayNumbers = { "sunday": 0, "monday": 1, "tuesday": 2, "wednesday": 3, "thursday": 4, "friday": 5, "saturday": 6 };

    Gdate = date;

    this.initialize = function () {

        this.isIE6 = (jQuery.browser.msie && jQuery.browser.version == "6.0");
        this.container = $("#" + container);
        if (!this.container.length) { alert("can not locate container element \"" + container + "\"!"); return; }
        this.bubble = new Timeline.Bubble(this);
        this.date = (date) ? date : new Date();
        this.readEvents();
        this.placeHolders = this.setupPlaceHolders();
        this.container.addClass("timeline");
        this.render();
    },

    this.readEvents = function () {
        this.events = [];
        var eventList = this.container.find("ul");
        var eventItems = eventList.find("li");

        for (var i = 0; i < eventItems.length; i++) {
            var date = new Date(eventItems[i].getAttribute("title")); if (date == "Invalid Date")
                continue; this.events[i] = {
                    name: eventItems[i].className, date: date, day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), content: jQuery(eventItems[i]).text()
                };
        }

        var j, tmp, events = this.events; for (var i = 1; i < events.length; i++) {
            tmp = this.events[i]; for (j = i; j > 0 && events[j - 1].date > tmp.date; j--)
                events[j] = events[j - 1]; events[j] = tmp;
        }
        eventList.remove();
    }

    this.render = function () {
        $(".timeline_bottom").empty();
        $(".timeline_top").empty();
        $(".timeline_DataRow").empty();
        $('#dtime').empty();
        var monthRepresentation = this.getMonthRepresentation();
        var cssClass = "";
        if (this.isIE6)
            this.handleIE6Issues(); this.setupArrows();
    }
    this.handleIE6Issues = function () {
        var clone = this.placeHolders.top.clone(true);
        this.container.append(clone); clone.css({ left: "-1000px", top: "-1000px" });
        var width = clone.outerWidth(); clone.remove(); this.placeHolders.top.css({ width: width + "px" });
        this.placeHolders.bottom.css({ width: width + "px" });
    }
    this.renderDay = function (topRow, bottomRow, data) {
        var cssClass = "";
        cssClass += (this.isToday(data.number)) ? "today" : "";
        cssClass += (data.events.length) ? " event" : "";

        topRow.append("<li><div style='width: 20px;' class=\"" + cssClass + "\">" + data.name + "</div></li>");

        bottomRow.append("<li><div style='width: 20px;' class=\"" + cssClass + "\">" + data.number + "</div></li>");

        nameEl = topRow.find("div:last"); numbEl = bottomRow.find("div:last");

        if (data.events.length == 0)
            return;

        var self = this; var enterClosure = function (e) { self.onMouseEnter(e); };

        var leaveClosure = function (e) { self.onMouseLeave(e); };
        nameEl.bind("mouseenter", data, enterClosure);
        numbEl.bind("mouseenter", data, enterClosure); nameEl.bind("mouseleave", data, leaveClosure);
        numbEl.bind("mouseleave", data, leaveClosure);
    }

    this.setupArrows = function () {
        var dateString = this.monthsOfYear[this.date.getMonth()] + " " + this.date.getFullYear();
        var html = "";


        html += "<div class=\"timeline_lastyear\" title=\"Previous Year\"></div>"
        html += "<div class=\"timeline_lastmonth\" title=\"Previous Month\"></div>"
        html += "<div class=\"timeline_date\">" + dateString + "</div>"
        html += "<div class=\"timeline_nextmonth\" title=\"Next Month\"></div>"
        html += "<div class=\"timeline_nextyear\" title=\"Next Year\"></div>"

        //this.placeHolders.arrows.append(html);

        $('#dtime').append(html);
        var children = $('#dtime').children();

        // var children = this.placeHolders.arrows.children();
        var self = this;
        $(children[0]).bind("click", this, function () { self.previousYear() });
        $(children[1]).bind("click", this, function () { self.previousMonth() });
        $(children[3]).bind("click", this, function () { self.nextMonth() });
        $(children[4]).bind("click", this, function () { self.nextYear() });
    }
    this.getEventsForDay = function (dayNumber) {
        var result = [];
        for (var i = 0; i < this.events.length; i++) {
            var e = this.events[i];
            if (e.day == dayNumber && e.month == this.date.getMonth() && e.year == this.date.getFullYear())
                result.push(this.events[i]);
        }
        return result;
    }
    this.setupPlaceHolders = function () {

        var arrows = jQuery(document.createElement("div"));
        arrows.addClass("timeline_arrows");

        var top = jQuery(document.createElement("div"));
        top.addClass("timeline_top");

        var bottom = jQuery(document.createElement("div"));
        bottom.addClass("timeline_bottom");

        var dataR = jQuery(document.createElement("div"));
        dataR.addClass("timeline_DataRow");

        top.append("<ul></ul>");
        bottom.append("<ul></ul>");
        // dataR.append("<ul></ul>");

        this.container.append([arrows[0], top[0], bottom[0], dataR[0]]);
        return { arrows: arrows, top: top.find("ul:first"), bottom: bottom.find("ul:first"), dataRow: "" };
    }
    this.getMonthRepresentation = function () {
        var result = [];
        var numberOfDays = this.getNumberOfDaysInMonth(this.date);
        var firstDay = this.getFirstDayOfMonth(this.date);
        var finished = false;
        for (var i = 0; i < numberOfDays; i++) {
            result.push({
                name: this.weekDays[firstDay].substring(0, 1), number: (i + 1 < 10) ? "0" + (i + 1) : (i + 1), events: this.getEventsForDay(i + 1)
            });
            firstDay = (firstDay == 6) ? 0 : ++firstDay;
        }
        return result;
    }

    this.getMIODR = function () {
        var result = [];
        var result1 = "";
        var numberOfDays = this.getNumberOfDaysInMonth(this.date);

        var monthRepresentation = this.getMonthRepresentation();

        ddata = this.date.toDateString();

        mmoth = this.date.getMonth() + 1;
        myear = this.date.getFullYear(); ;
        savedata = true;

        myData = "{'_date':'" + ddata + "'}";

        $.ajax({
            type: "POST",
            url: "MioPlanning.asmx/viewPlan",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                result1 = jsonParse(data.d);
                ii = 0;
                $.each(result1, function (i, option) {
                    ii = ii + 1;
                    $(".timeline_DataRow").prepend($("<ul id='" + ii + "'>"));
                    var drid = option.DoctorId;
                    var drname = option.DoctorName;
                    var drclass = option.ClassName;
                    var specialty = option.SpecialiityName;
                    var brick = option.DoctorBrickWithCode;
                    var Target = "4";
                    var Actual = "3";
                    var Pending = "1";
                    var Total = "2";

                    $('#' + ii).append("<li><div style='width: 180px;height: 10px;padding: 10px;background-color:#ccc'>" + drname + "</div></li>");
                    $('#' + ii).append("<li><div style='width: 55px;height: 10px;padding: 10px;background-color:#ccc'>" + drclass + "</div></li>");
                    $('#' + ii).append("<li><div style='width: 55px;height: 10px;padding: 10px;background-color:#ccc'>" + specialty + "</div></li>");
                    $('#' + ii).append("<li><div style='width: 55px;height: 10px;padding: 10px;background-color:#ccc'>" + brick + "</div></li>");
                    $('#' + ii).append("<li><div style='width: 30px;height: 10px;padding: 10px;background-color:#ccc'>" + Target + "</div></li>");
                    $('#' + ii).append("<li><div style='width: 30px;height: 10px;padding: 10px;background-color:#ccc'>" + Actual + "</div></li>");
                    $('#' + ii).append("<li><div style='width: 30px;height: 10px;padding: 10px;background-color:#ccc'>" + Pending + "</div></li>");
                    $('#' + ii).append("<li><div style='width: 30px;height: 10px;padding: 10px;background-color:#ccc'>" + Total + "</div></li>");

                    for (var i = 0; i < monthRepresentation.length; i++) {
                        var liid = "li_" + ii + i;
                        var ckid = "ck_" + drid + "_" + (i + 1) + "_" + mmoth + "_" + myear;
                        var checklist = '<li id="' + liid + '"><div style="width: 20px;"><input id="' + ckid + '" type="checkbox"/></div>';

                        if (savedata) {
                            var boxid = i + 1;
                            checklist += "<div class='box' onclick='FillForm(" + drid + "," + boxid + "," + mmoth + "," + myear + ")'></div></li>";
                        }
                        //checklist += '<div class="box" onclick="FillForm(' + boxid + ');return false" >';
                        $('#' + ii).append(checklist);
                    }
                    $('#' + ii).append("</ul>");

                });
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });

        return result1;
    }


    this.getNumberOfDaysInMonth = function (dateObject) {
        var month = dateObject.getMonth(); if (month == 1) {
            var leapYear = (new Date(dateObject.getYear(), 1, 29).getDate()) == 29; if (leapYear)
                return 29
            else
                return 28;
        } else return this.daysPerMonth[month];
    },
    this.getFirstDayOfMonth = function (dateObject) {
        var save = dateObject.getDate();
        dateObject.setDate(1);
        var result = dateObject.getDay();
        dateObject.setDate(save); return result;
    },
    this.isToday = function (dayNumber) {
        var today = new Date();
        return (today.getDate() == dayNumber && today.getFullYear() == this.date.getFullYear() && today.getMonth() == this.date.getMonth());
    },

    this.onMouseEnter = function (event) {
        var left = $(event.target).offset().left;
        var width = $(event.target).outerWidth();
        this.bubble.setContent(event.data.events);
        this.bubble.show(left + (width / 2));
    }
    this.onMouseLeave = function (event) { this.bubble.hide(); }

    this.nextMonth = function () { this.date.setMonth(this.date.getMonth() + 1); this.render(); }
    this.nextYear = function () { this.date.setYear(this.date.getFullYear() + 1); this.render(); }
    this.previousMonth = function () { this.date.setMonth(this.date.getMonth() - 1); this.render(); }

    this.previousYear = function () { this.date.setYear(this.date.getFullYear() - 1); this.render(); }

    this.initialize();
}

Timeline.Bubble = function (timeline) {
    this.initialize = function () { var IE6Class = (timeline.isIE6) ? " bubbleIE6" : ""; var id = "bubble_" + new Date().getTime(); var html = ""; html += "<div id=\"" + id + "\" class=\"timeline_bubble\">"; html += "<div class=\"bubble_top" + IE6Class + "\"></div>"; html += "<div class=\"bubble_mid" + IE6Class + "\"></div>"; html += "<div class=\"bubble_bottom" + IE6Class + "\"></div></div>"; timeline.container.after(html); this.container = $("#" + id); this.container.bind("mouseenter", this, this.onMouseEnter); this.container.bind("mouseleave", this, this.onMouseLeave); }
    this.onMouseEnter = function (event) { event.data.stopHiding(); }
    this.onMouseLeave = function (event) { event.data.hide(); }
    this.stopHiding = function () { if (this.goingOffHandle && this.goingOffHandle != null) { clearTimeout(this.goingOffHandle); this.goingOffHandle = null; } }
    this.setContent = function (events) {
        this.stopHiding(); var html = ""; for (var i = 0; i < events.length; i++)
            html += "<div><div class=\"event_title\">" + events[i].name + "<p class=\"event_data\">" + events[i].content + "</p></div></div>"; var midSection = $(this.container.children()[1]); midSection.empty(); midSection.append(html); var titles = midSection.find(".event_title"); titles.each(function (inx, element) { $(element).bind("mouseenter", function (event) { $(element).children(":first").animate({ opacity: "toggle" }, 200); }); $(element).bind("mouseleave", function (event) { $(element).children(":first").animate({ opacity: "hide" }, 200); }); });
    }
    this.show = function (at) { this.container.animate({ opacity: "show" }, 250); this.container.animate({ left: at - (this.container.outerWidth() / 2) }, 300); }
    this.hide = function () { var self = this; this.goingOffHandle = setTimeout(function () { self.container.animate({ opacity: "hide" }, 250); }, 700); }
    this.initialize();
}

$(document).ready(function () {

    var timeline = new Timeline("timeline", new Date());



});

function loadbrick() {

    if (CurrentUserRole == "rl6") {
        myData = "{'pEmployeeId':'" + EmployeeId + "' }";
    } else {
        myData = "{'pEmployeeId':'" + $('#selmio').val() + "' }";
    }

    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/Loadbrick",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        success: function (data) {
            var result = jsonParse(data.d);
            $.each(result, function (i, option) {
                $('#selBrick').append('<option Value="' + option.levelid + '">' + option.DoctorBrick + '</option>');
            });
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

}
function loadClass() {
    if (CurrentUserRole == "rl6") {
        myData = "{'pEmployeeId':'" + EmployeeId + "' }";
    } else {
        myData = "{'pEmployeeId':'" + $('#selmio').val() + "' }";
    }
    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/LoadClass",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        success: function (data) {
            var result = jsonParse(data.d);
            $.each(result, function (i, option) {
                $('#selClass').append('<option Value="' + option.ClassId + '">' + option.ClassName + '</option>');
            });

        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function loadSpecialty() {
    if (CurrentUserRole == "rl6") {
        myData = "{'pEmployeeId':'" + EmployeeId + "' }";
    } else {
        myData = "{'pEmployeeId':'" + $('#selmio').val() + "' }";
    }
    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/LoadSpecialiity",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        success: function (data) {
            var result = jsonParse(data.d);
            $.each(result, function (i, option) {
                $('#selSpecialty').append('<option Value="' + option.SpecialityId + '">' + option.SpecialiityName + '</option>');
            });

        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function loadDoctors() {
    if (CurrentUserRole == "rl6") {
        myData = "{'pEmployeeId':'" + EmployeeId + "' }";
    }
    else if (CurrentUserRole == "rl5") {
        myData = "{'pEmployeeId':'" + $('#selmio').val() + "' }";
    }
    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/LoadDoctors",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        success: function (data) {
            var result = jsonParse(data.d);
            $.each(result, function (i, option) {
                $('#selDoctor').append('<option Value="' + option.DoctorId + '">' + option.DoctorName + '</option>');
            });

            $('#selBrick').change(OnChangeddlBrick);
            $('#selClass').change(OnChangeddlClass);
            $('#selSpecialty').change(OnChangeddlSpecialty);
            $('#selDoctor').change(OnChangeddlDoctor);
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });


}

function OnChangeddlBrick() {
    $('#loadingdiv2').jqm({ modal: true });
    $('#loadingdiv2').jqm();
    $('#loadingdiv2').jqmShow();
    _Brickid = $('#selBrick').val();

    if (_Brickid != "-1") {
        if (CurrentUserRole == "rl6") {
            myData = "{'Brickid':'" + _Brickid + "','pEmployeeId':'" + EmployeeId + "'}";
        } else {
            myData = "{'Brickid':'" + _Brickid + "','pEmployeeId':'" + $('#selmio').val() + "'}";
        }




        document.getElementById('selClass').innerHTML = "";
        document.getElementById('selSpecialty').innerHTML = "";
        document.getElementById('selDoctor').innerHTML = "";


        $("#selClass").append("<option value='-1'>Select Class</option>");
        $("#selSpecialty").append("<option value='-1'>Select Specialty</option>");
        $("#selDoctor").append("<option value='-1'>Select Doctor</option>");
        $.ajax({
            type: "POST",
            url: "MioPlanning.asmx/OnChangedbrick_class",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: myData,
            success: function (data) {
                var result = jsonParse(data.d);
                $.each(result, function (i, option) {
                    $('#selClass').append('<option Value="' + option.ClassId + '">' + option.ClassName + '</option>');
                });
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
        $.ajax({
            type: "POST",
            url: "MioPlanning.asmx/OnChangedbrick_specialiity",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: myData,
            success: function (data) {
                var result = jsonParse(data.d);
                $.each(result, function (i, option) {
                    $('#selSpecialty').append('<option Value="' + option.SpecialityId + '">' + option.SpecialiityName + '</option>');
                });
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
        $.ajax({
            type: "POST",
            url: "MioPlanning.asmx/OnChangedbrick_Doctor",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: myData,
            success: function (data) {
                var result = jsonParse(data.d);
                $.each(result, function (i, option) {
                    $('#selDoctor').append('<option Value="' + option.DoctorId + '">' + option.DoctorName + '</option>');
                });
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    } else {

        document.getElementById('selClass').innerHTML = "";
        document.getElementById('selSpecialty').innerHTML = "";
        document.getElementById('selDoctor').innerHTML = "";

        $("#selClass").append("<option value='-1'>Select Class</option>");
        $("#selSpecialty").append("<option value='-1'>Select Specialty</option>");
        $("#selDoctor").append("<option value='-1'>Select Doctor</option>");
        // loadbrick();
        loadClass();
        loadSpecialty();
        loadDoctors();
    }
    $('#loadingdiv2').jqmHide();
}
function OnChangeddlClass() {
    $('#loadingdiv2').jqm({ modal: true });
    $('#loadingdiv2').jqm();
    $('#loadingdiv2').jqmShow();

    _Brickid = $('#selBrick').val();
    _Classid = $('#selClass').val();

    if (_Classid != "-1") {

        document.getElementById('selSpecialty').innerHTML = "";
        document.getElementById('selDoctor').innerHTML = "";
        $("#selSpecialty").append("<option value='-1'>Select Specialty</option>");
        $("#selDoctor").append("<option value='-1'>Select Doctor</option>");

        if (CurrentUserRole == "rl6") {
            myData = "{'Brickid':'" + _Brickid
                + "','Classid':'" + _Classid
                + "','pEmployeeId':'" + EmployeeId
                + "'}";
        }
        else {
            myData = "{'Brickid':'" + _Brickid
                + "','Classid':'" + _Classid
                + "','pEmployeeId':'" + $('#selmio').val()
                + "'}";
        }
        $.ajax({
            type: "POST",
            url: "MioPlanning.asmx/OnChangedclass_Speciality",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: myData,
            success: function (data) {
                var result = jsonParse(data.d);
                $.each(result, function (i, option) {
                    $('#selSpecialty').append('<option Value="' + option.SpecialityId + '">' + option.SpecialiityName + '</option>');
                });
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
        $.ajax({
            type: "POST",
            url: "MioPlanning.asmx/OnChangedclass_Doctor",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: myData,
            success: function (data) {
                var result = jsonParse(data.d);
                $.each(result, function (i, option) {
                    $('#selDoctor').append('<option Value="' + option.DoctorId + '">' + option.DoctorName + '</option>');
                });
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });

    }
    else {
        if (_Brickid != "-1") {
            OnChangeddlBrick();
        }
        else {
            document.getElementById('selClass').innerHTML = "";
            document.getElementById('selSpecialty').innerHTML = "";
            document.getElementById('selDoctor').innerHTML = "";
            $("#selClass").append("<option value='-1'>Select Class</option>");
            $("#selSpecialty").append("<option value='-1'>Select Specialty</option>");
            $("#selDoctor").append("<option value='-1'>Select Doctor</option>");
            loadClass();
            loadSpecialty();
            loadDoctors();
        }

    }
    $('#loadingdiv2').jqmHide();
}
function OnChangeddlSpecialty() {
    $('#loadingdiv2').jqm({ modal: true });
    $('#loadingdiv2').jqm();
    $('#loadingdiv2').jqmShow();
    _Brickid = $('#selBrick').val();
    _Classid = $('#selClass').val();
    _Speid = $('#selSpecialty').val();
    if (_Speid != "-1") {

        document.getElementById('selDoctor').innerHTML = "";
        $("#selDoctor").append("<option value='-1'>Select Doctor</option>");

        if (CurrentUserRole == "rl6") {
            myData = "{'Brickid':'" + _Brickid
                + "','Classid':'" + _Classid
                + "','Specid':'" + _Speid
                + "','pEmployeeId':'" + EmployeeId
                + "'}";
        }
        else {
            myData = "{'Brickid':'" + _Brickid
                + "','Classid':'" + _Classid
                + "','Specid':'" + _Speid
                + "','pEmployeeId':'" + $('#selmio').val()
                + "'}";
        }



        $.ajax({
            type: "POST",
            url: "MioPlanning.asmx/OnChangedSpe_Doctor",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: myData,
            success: function (data) {
                var result = jsonParse(data.d);
                $.each(result, function (i, option) {
                    $('#selDoctor').append('<option Value="' + option.DoctorId + '">' + option.DoctorName + '</option>');
                });
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });

    }
    else {
        if (_Classid != "-1") {
            OnChangeddlClass();
        } else {

            if (_Brickid != "-1") {
                OnChangeddlBrick();
            } else {
                document.getElementById('selSpecialty').innerHTML = "";
                document.getElementById('selDoctor').innerHTML = "";
                $("#selSpecialty").append("<option value='-1'>Select Specialty</option>");
                $("#selDoctor").append("<option value='-1'>Select Doctor</option>");
                loadSpecialty();
                loadDoctors();
            }

        }
    }

    $('#loadingdiv2').jqmHide();
}
function OnChangeddlDoctor() {
    // _Drid = $('#selBrick').val();
    // myData = "{'Drid':'" + _Drid + "' }";


}

function OnChangeddlMio() {
    $('#loadingdiv2').jqm({ modal: true });
    $('#loadingdiv2').jqm();
    $('#loadingdiv2').jqmShow();
    var _MIOid = $('#selmio').val();

    loadbrick();
    loadClass();
    loadSpecialty();
    loadDoctors();
    $('#loadingdiv2').jqmHide();
}
function saveplan() {
    $('#loadingdiv2').jqm({ modal: true });
    $('#loadingdiv2').jqm();
    $('#loadingdiv2').jqmShow();

    NumDays = getNumberOfDaysInMonth(Gdate);
    var One = false; var Two = false; var Three = false; var Four = false; var Five = false; var Six = false; var Seven = false; var Eight = false; var Nine = false; var Ten = false;
    var Eleven = false; var Twelve = false; var Thirteen = false; var Fourteen = false; var Fiftheen = false; var Sixtheen = false; var Seventeen = false; var Eighteen = false; var Nineteen = false; var Twenty = false;
    var TwentyOne = false; var TwentyTwo = false; var TwentyThree = false; var TwentyFour = false; var TwentyFive = false; var TwentySix = false; var TwentySeven = false;
    var TwentyEight = false; var TwentyNine = false; var Thirty = false; var ThirtyOne = false;

    $('.timeline_DataRow ul li input[type="checkbox"]').each(function () {
        Cid = $(this).attr('id');
        var _Cchecked = $(this).attr('checked');
        _drid = Cid.split('_')[1].toString();
        _pday = parseInt(Cid.split('_')[2]);
        _pmonth = Cid.split('_')[3].toString();
        _pyear = Cid.split('_')[4].toString();
        _planid = Cid.split('_')[5].toString();

        ddata = Gdate.toDateString();

        switch (_pday) {
            case 1: One = _Cchecked;
                break;
            case 2: Two = _Cchecked;
                break;
            case 3: Three = _Cchecked;
                break;
            case 4: Four = _Cchecked;
                break;
            case 5: Five = _Cchecked;
                break;
            case 6: Six = _Cchecked;
                break;
            case 7: Seven = _Cchecked;
                break;
            case 8: Eight = _Cchecked;
                break;
            case 9: Nine = _Cchecked;
                break;
            case 10: Ten = _Cchecked;
                break;
            case 11: Eleven = _Cchecked;
                break;
            case 12: Twelve = _Cchecked;
                break;
            case 13: Thirteen = _Cchecked;
                break;
            case 14: Fourteen = _Cchecked;
                break;
            case 15: Fiftheen = _Cchecked;
                break;
            case 16: Sixtheen = _Cchecked;
                break;
            case 17: Seventeen = _Cchecked;
                break;
            case 18: Eighteen = _Cchecked;
                break;
            case 19: Nineteen = _Cchecked;
                break;
            case 20: Twenty = _Cchecked;
                break;
            case 21: TwentyOne = _Cchecked;
                break;
            case 22: TwentyTwo = _Cchecked;
                break;
            case 23: TwentyThree = _Cchecked;
                break;
            case 24: TwentyFour = _Cchecked;
                break;
            case 25: TwentyFive = _Cchecked;
                break;
            case 26: TwentySix = _Cchecked;
                break;
            case 27: TwentySeven = _Cchecked;
                break;
            case 28: TwentyEight = _Cchecked;
                break;
            case 29: TwentyNine = _Cchecked;
                break;
            case 30: Thirty = _Cchecked;
                break;
            case 31: ThirtyOne = _Cchecked;
                break;

        }
        if (NumDays == _pday) {
            myData = "{'pday':'" + _pday
        + "','pmonth':'" + _pmonth
        + "','pyear':'" + _pyear
        + "','drid':'" + _drid
        + "','_TargetCall':'" + 0
        + "','_ActualCall':'" + 0
        + "','_Total':'" + 0
        + "','Cchecked':'" + _Cchecked
        + "','planid':'" + _planid
        + "','_empid':'" + EmployeeId
        + "','_One':'" + One
        + "','_Two':'" + Two
        + "','_Three':'" + Three
        + "','_Four':'" + Four
        + "','_Five':'" + Five
        + "','_Six':'" + Six
        + "','_Seven':'" + Seven
        + "','_Eight':'" + Eight
        + "','_Nine':'" + Nine
        + "','_Ten':'" + Ten
        + "','_Eleven':'" + Eleven
        + "','_Twelve':'" + Twelve
        + "','_Thirteen':'" + Thirteen
        + "','_Fourteen':'" + Fourteen
        + "','_Fiftheen':'" + Fiftheen
        + "','_Sixtheen':'" + Sixtheen
        + "','_Seventeen':'" + Seventeen
        + "','_Eighteen':'" + Eighteen
        + "','_Nineteen':'" + Nineteen
        + "','_Twenty':'" + Twenty
        + "','_TwentyOne':'" + TwentyOne
        + "','_TwentyTwo':'" + TwentyTwo
        + "','_TwentyThree':'" + TwentyThree
        + "','_TwentyFour':'" + TwentyFour
        + "','_TwentyFive':'" + TwentyFive
        + "','_TwentySix':'" + TwentySix
        + "','_TwentySeven':'" + TwentySeven
        + "','_TwentyEight':'" + TwentyEight
        + "','_TwentyNine':'" + TwentyNine
        + "','_Thirty':'" + Thirty
        + "','_ThirtyOne':'" + ThirtyOne
        + "','_date':'" + ddata
        + "'}";

            $.ajax({
                type: "POST",
                url: "MioPlanning.asmx/Saveplan",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: function (data) {

                },
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false

            });

        }
    });

    $('#loadingdiv2').jqmHide();
}
function showplan() {
    $('#loadingdiv2').jqm({ modal: true });
    $('#loadingdiv2').jqm();
    $('#loadingdiv2').jqmShow();

    this.weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    this.monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.dayNumbers = { "sunday": 0, "monday": 1, "tuesday": 2, "wednesday": 3, "thursday": 4, "friday": 5, "saturday": 6 };

    $(".timeline_top").empty();
    $(".timeline_bottom").empty();
    $(".timeline_DataRow").empty();

    var topR = $(".timeline_top");
    var buttomR = $(".timeline_bottom");
    var dataR = $(".timeline_DataRow");

    topR.append("<ul></ul>");
    buttomR.append("<ul></ul>");

    var cssClass = "";

    var result = [];
    var numberOfDays = getNumberOfDaysInMonth(Gdate);
    var firstDay = getFirstDayOfMonth(Gdate);
    var finished = false;

    for (var i = 0; i < numberOfDays; i++) {
        result.push({
            name: this.weekDays[firstDay].substring(0, 1), number: (i + 1 < 10) ? "0" + (i + 1) : (i + 1), events: ""
        });
        firstDay = (firstDay == 6) ? 0 : ++firstDay;
    }
    var monthRepresentation = result;

    for (var i = 0; i < monthRepresentation.length; i++) {
        if (i == 0) {
            topR.append("<li><div style='width: 200px;background-color: #000000'> DR NAME </div></li>");
            buttomR.append("<li><div style='width: 200px;background-color: #000000'>&nbsp;&nbsp;</div></li>");
            topR.append("<li><div style='width: 75px;background-color: #000000'> DR Class </div></li>");
            buttomR.append("<li><div style='width: 75px;background-color: #000000'>&nbsp;&nbsp;</div></li>");

            topR.append("<li><div style='width: 75px;background-color: #000000'> Specialty </div></li>");
            buttomR.append("<li><div style='width: 75px;background-color: #000000'>&nbsp;&nbsp;</div></li>");

            topR.append("<li><div style='width: 75px;background-color: #000000'> Brick </div></li>");
            buttomR.append("<li><div style='width: 75px;background-color: #000000'>&nbsp;&nbsp;</div></li>");

            topR.append("<li><div style='width: 50px;background-color: #000000'> Target </div></li>");
            buttomR.append("<li><div style='width: 50px;background-color: #000000'>&nbsp;&nbsp;</div></li>");

            topR.append("<li><div style='width: 50px;background-color: #000000'> Actual </div></li>");
            buttomR.append("<li><div style='width: 50px;background-color: #000000'>&nbsp;&nbsp;</div></li>");

            topR.append("<li><div style='width: 50px;background-color: #000000'> Pending </div></li>");
            buttomR.append("<li><div style='width: 50px;background-color: #000000'>&nbsp;&nbsp;</div></li>");

            topR.append("<li><div style='width: 50px;background-color: #000000'> Total </div></li>");
            buttomR.append("<li><div style='width: 50px;background-color: #000000'>&nbsp;&nbsp;</div></li>");
        }

        renderDay(topR, buttomR, monthRepresentation[i]);
    }



    mioplan();

    //    if (this.isIE6)
    //        this.handleIE6Issues(); this.setupArrows();
}
function mioplan() {

    this.weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    this.monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.dayNumbers = { "sunday": 0, "monday": 1, "tuesday": 2, "wednesday": 3, "thursday": 4, "friday": 5, "saturday": 6 };

    var result1 = "";
    var numberOfDays = getNumberOfDaysInMonth(Gdate);
    var firstDay = getFirstDayOfMonth(Gdate);
    var finished = false;
    var numberOfDays = getNumberOfDaysInMonth(Gdate);
    //   var monthRepresentation = this.getMonthRepresentation();

    var result = [];
    for (var i = 0; i < numberOfDays; i++) {
        result.push({
            name: this.weekDays[firstDay].substring(0, 1), number: (i + 1 < 10) ? "0" + (i + 1) : (i + 1), events: ""
        });
        firstDay = (firstDay == 6) ? 0 : ++firstDay;
    }
    var monthRepresentation = result;
    ddata = Gdate.toDateString();
    mmoth = Gdate.getMonth() + 1;

    myear = Gdate.getFullYear(); ;
    savedata = false;
    _PlanStatus = "";
    GPlanStatus = "";

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
        success: function (data) {
            _PSresult = jsonParse(data.d);

            _ApproveId = _PSresult[0].ApproveId;
            _PlanStatus = _PSresult[0].PlanStatus;
            GPlanStatus = _PSresult[0].PlanStatus;
            _planReason = _PSresult[0].Reason;

            if (CurrentUserRole == "rl6") {
                if (_planReason != "") {
                    _planReason = "Plan Reject Reason : " + _planReason;
                }
                $('#PlanStatus').text("Plan status is " + _PlanStatus);
                if (_PlanStatus == "Approve") {
                    savedata = true;
                    $('#planReason').text('');
                    $('#btnsave').hide();
                    $('#btnApproval').hide('');
                    $('#PlanStatus').addClass('planStatus_green');
                }
                else if (_PlanStatus == "Draft") {
                    savedata = false;
                    $('#planReason').text(_planReason);
                    $('#btnsave').show();
                    $('#btnApproval').show('');
                    $('#PlanStatus').addClass('planStatus_yellow');

                }
                else if (_PlanStatus == "Pending") {
                    savedata = false;
                    $('#planReason').text('');
                    $('#btnsave').hide();
                    $('#btnApproval').hide('');
                    $('#PlanStatus').addClass('planStatus_red');
                }
            }

        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

    var Brickid = $('#selBrick').val();
    var Classid = $('#selClass').val();
    var Speid = $('#selSpecialty').val();
    var Drid = $('#selDoctor').val();

    if (CurrentUserRole == "rl6") {
        myData = "{'_date':'" + ddata + "','_DoctorId':'" + Drid + "','_ClassId':'" + Classid + "','_BrickId':'" + Brickid + "','_SpecialityId':'" + Speid
                + "','_EmployeeId':'" + EmployeeId + "'}";
        $.ajax({
            type: "POST",
            url: "MioPlanning.asmx/viewPlan",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                result1 = jsonParse(data.d);
                ii = 0;
                $.each(result1, function (i, option) {
                    ii = ii + 1;
                    $(".timeline_DataRow").prepend($("<ul id='" + ii + "'>"));
                    var planid = option.PlanningId;
                    var drid = option.DoctorId;
                    var drname = option.DoctorName;
                    var drclass = option.ClassName;
                    var specialty = option.SpecialiityName;
                    var brick = option.DoctorBrick;
                    var Target = option.TargetCall;
                    var Actual = option.ActualCall;
                    var Pending = option.PendingCall;
                    var Total = option.Total;

                    $('#' + ii).append("<li><div style='width: 180px;height: 10px;padding: 10px;background-color:#ccc'>" + drname + "</div></li>");
                    $('#' + ii).append("<li><div style='width: 55px;height: 10px;padding: 10px;background-color:#ccc'>" + drclass + "</div></li>");
                    $('#' + ii).append("<li><div style='width: 55px;height: 10px;padding: 10px;background-color:#ccc'>" + specialty + "</div></li>");
                    $('#' + ii).append("<li><div style='width: 55px;height: 10px;padding: 10px;background-color:#ccc'>" + brick + "</div></li>");
                    $('#' + ii).append("<li><div style='width: 30px;height: 10px;padding: 10px;background-color:#ccc'>" + Target + "</div></li>");
                    $('#' + ii).append("<li><div style='width: 30px;height: 10px;padding: 10px;background-color:#ccc'>" + Actual + "</div></li>");
                    $('#' + ii).append("<li><div style='width: 30px;height: 10px;padding: 10px;background-color:#ccc'>" + Pending + "</div></li>");
                    $('#' + ii).append("<li><div style='width: 30px;height: 10px;padding: 10px;background-color:#ccc'>" + Total + "</div></li>");


                    for (var i = 0; i < monthRepresentation.length; i++) {
                        var liid = "li_" + ii + i;
                        var ckid = "ck_" + drid + "_" + (i + 1) + "_" + mmoth + "_" + myear + "_" + planid;
                        _Cchecked = "";
                        checkedoption = "false";
                        Cday = i + 1;
                        switch (Cday) {
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

                        if (checkedoption == "True") {
                            checkedhtml = "checked = 'checked'";
                        } else {
                            checkedhtml = "";
                        }

                        var checklist = '<li id="' + liid + '"><div style="width: 20px;"><input id="' + ckid + '" type="checkbox"' + checkedhtml + '/></div>';

                        if (savedata) {
                            if (checkedoption == "True") {
                                var boxid = i + 1;
                                checklist += "<div class='box' onclick='FillForm(" + planid + ")'></div></li>";
                            }
                        }
                        //checklist += '<div class="box" onclick="FillForm(' + boxid + ');return false" >';
                        $('#' + ii).append(checklist);
                    }

                    $('#' + ii).append("</ul>");

                    $('#loadingdiv2').jqmHide();
                });
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });

    }
    else if (CurrentUserRole == "rl5") {
        if (GPlanStatus != "") {
            if (GPlanStatus == "Pending") {
                $('#btnsave').hide();
                $('#btnApproval').hide();

                myData = "{'_date':'" + ddata + "','_DoctorId':'" + Drid + "','_ClassId':'" + Classid + "','_BrickId':'" + Brickid + "','_SpecialityId':'" + Speid
                + "','_EmployeeId':'" + $('#selmio').val() + "'}";

                $.ajax({
                    type: "POST",
                    url: "MioPlanning.asmx/viewPlan",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        result1 = jsonParse(data.d);
                        ii = 0;
                        $.each(result1, function (i, option) {
                            ii = ii + 1;
                            $(".timeline_DataRow").prepend($("<ul id='" + ii + "'>"));
                            var planid = option.PlanningId;
                            var drid = option.DoctorId;
                            var drname = option.DoctorName;
                            var drclass = option.ClassName;
                            var specialty = option.SpecialiityName;
                            var brick = option.DoctorBrick;
                            var Target = option.TargetCall;
                            var Actual = option.ActualCall;
                            var Pending = option.PendingCall;
                            var Total = option.Total;

                            $('#' + ii).append("<li><div style='width: 180px;height: 10px;padding: 10px;background-color:#ccc'>" + drname + "</div></li>");
                            $('#' + ii).append("<li><div style='width: 55px;height: 10px;padding: 10px;background-color:#ccc'>" + drclass + "</div></li>");
                            $('#' + ii).append("<li><div style='width: 55px;height: 10px;padding: 10px;background-color:#ccc'>" + specialty + "</div></li>");
                            $('#' + ii).append("<li><div style='width: 55px;height: 10px;padding: 10px;background-color:#ccc'>" + brick + "</div></li>");
                            $('#' + ii).append("<li><div style='width: 30px;height: 10px;padding: 10px;background-color:#ccc'>" + Target + "</div></li>");
                            $('#' + ii).append("<li><div style='width: 30px;height: 10px;padding: 10px;background-color:#ccc'>" + Actual + "</div></li>");
                            $('#' + ii).append("<li><div style='width: 30px;height: 10px;padding: 10px;background-color:#ccc'>" + Pending + "</div></li>");
                            $('#' + ii).append("<li><div style='width: 30px;height: 10px;padding: 10px;background-color:#ccc'>" + Total + "</div></li>");


                            for (var i = 0; i < monthRepresentation.length; i++) {
                                var liid = "li_" + ii + i;
                                var ckid = "ck_" + drid + "_" + (i + 1) + "_" + mmoth + "_" + myear + "_" + planid;
                                _Cchecked = "";
                                checkedoption = "false";
                                Cday = i + 1;
                                switch (Cday) {
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

                                if (checkedoption == "True") {
                                    checkedhtml = "checked = 'checked'";
                                } else {
                                    checkedhtml = "";
                                }

                                var checklist = '<li id="' + liid + '"><div style="width: 20px;"><input id="' + ckid + '" type="checkbox"' + checkedhtml + '/></div>';

                                if (savedata) {
                                    if (checkedoption == "True") {
                                        var boxid = i + 1;
                                        checklist += "<div class='box' onclick='FillForm(" + planid + ")'></div></li>";
                                    }
                                }
                                //checklist += '<div class="box" onclick="FillForm(' + boxid + ');return false" >';
                                $('#' + ii).append(checklist);
                            }

                            $('#' + ii).append("</ul>");

                            $('#loadingdiv2').jqmHide();
                        });
                    },
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });


            } else {
                $('#btnsave').hide();
                $('#btnApproval').hide();
                $('.timeline_top').empty();
                $('.timeline_bottom').empty();
                $('#planReason').text('NO Plan Available');
                $('#loadingdiv2').jqmHide();
            }
        }
        else {
            $('#btnsave').hide();
            $('#btnApproval').hide();
            $('.timeline_top').empty();
            $('.timeline_bottom').empty();
            $('#planReason').text('NO Plan Available');
            $('#loadingdiv2').jqmHide();
        }

    }





}

function DisplayPlan() {


}
function mioPlanStatusupdate(PlanStatus, Reason) {
    myData = "{'_date':'" + Gdate.toDateString()
                + "','_EmployeeId':'" + EmployeeId
                + "','_Reason':'" + Reason
                + "','_PlanStatus':'" + PlanStatus
                + "'}";

    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/PlanStatus_update",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d == "Update") {
                $('#diamsg').jqm({ modal: true });
                $('#diamsg').jqm();
                $('#diamsg').jqmShow();
                showplan();
            }
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });



}
function FillForm(planid) {
    //, pday, pmonth, pyear
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    myData = "{'Pplanid':'" + planid + "' }";
    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/PlanInfo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        success: function (data) {
            var result = jsonParse(data.d);
            var empid = result[0].EmployeeId;
            var empname = result[0].EmployeeName;
            var div = result[0].Division;
            var reg = result[0].Region;
            var zon = result[0].Zone;
            var ter = result[0].Territory;
            var drName = result[0].DoctorName;
            var drcode = result[0].DoctorCode;
            var spname = result[0].SpecialiityName;
            var clsname = result[0].ClassName;
            var calfrq = result[0].ClassFrequency;
            var drbrick = result[0].DoctorBrick;
            var draddr = result[0].Address1;
            var plztime = result[0].TiemStamp;
            //$("#txtDR").val(drName);
            $("#txtaddress").val(draddr);
            $("#txtterr").val(ter);
            $("#txtdrcode").val(drcode);


        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

}
function ajaxCompleted(request, data) {

}
function onError(request, status, error) {
    console.log(error);
}
function startingAjax() {

}

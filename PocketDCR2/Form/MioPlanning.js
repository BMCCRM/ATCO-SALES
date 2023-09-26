function pageLoad() {



    $('#btnRecurrenc').hide();
    var cdt = new Date();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var current_date = cdt.getDate();
    var current_month = cdt.getMonth();
    current_month = current_month + 1;
    var current_year = cdt.getFullYear();

    $('#txtdate').val(current_month + '/' + current_date + '/' + current_year);

    var month_name = monthNames[current_month - 1];

    $('#txtSmonth').val(month_name + '-' + current_year);

    //    var nmonth_name = "";
    //    if (current_month == 12) {
    //        nmonth_name = monthNames[0];
    //        current_year = current_year + 1;
    //    } else {
    //        nmonth_name = monthNames[current_month];
    //    }

    $('#txtEmonth').val(month_name + '-' + current_year);
    //    $('#txtSTime').timepicker();
    //    $('#txtEtime').timepicker();
    //    $('#txtSTime').timepicker({ 'scrollDefaultNow': true });
    //    $('#txtEtime').timepicker({ 'scrollDefaultNow': true });
    GetCurrentUser();
    var kk = 'kkk';




}

function onCalendarShown() {
    // ReSharper disable UseOfImplicitGlobalInFunctionScope
    var cal = $find("calendar1");
    // ReSharper restore UseOfImplicitGlobalInFunctionScope
    cal._switchMode("months", true);
    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                // ReSharper disable UseOfImplicitGlobalInFunctionScope
                Sys.UI.DomEvent.addHandler(row.cells[j].firstChild, "click", call);
                // ReSharper restore UseOfImplicitGlobalInFunctionScope
            }
        }
    }
}
function onCalendarHidden() {
    // ReSharper disable UseOfImplicitGlobalInFunctionScope
    var cal = $find("calendar1");
    // ReSharper restore UseOfImplicitGlobalInFunctionScope

    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.removeHandler(row.cells[j].firstChild, "click", call);
            }
        }
    }

}
function call(eventElement) {
    var target = eventElement.target;
    switch (target.mode) {
        case "month":
            var cal = $find("calendar1");
            cal._visibleDate = target.date;
            cal.set_selectedDate(target.date);
            cal._switchMonth(target.date);
            cal._blur.post(true);
            cal.raiseDateSelectionChanged();
            break;
    }
}

function onCalendarShown2() {
    var cal = $find("calendar2");
    cal._switchMode("months", true);
    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.addHandler(row.cells[j].firstChild, "click", call2);
            }
        }
    }
}
function onCalendarHidden2() {
    var cal = $find("calendar2");

    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.removeHandler(row.cells[j].firstChild, "click", call2);
            }
        }
    }

}
function call2(eventElement) {
    var target = eventElement.target;
    switch (target.mode) {
        case "month":
            var cal = $find("calendar2");
            cal._visibleDate = target.date;
            cal.set_selectedDate(target.date);
            cal._switchMonth(target.date);
            cal._blur.post(true);
            cal.raiseDateSelectionChanged();
            break;
    }
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
        name = 'Select Product';

        $("#pro1").append("<option value='" + value + "'>" + name + "</option>");
        $("#pro2").append("<option value='" + value + "'>" + name + "</option>");
        $("#pro3").append("<option value='" + value + "'>" + name + "</option>");
        $("#pro4").append("<option value='" + value + "'>" + name + "</option>");

        $("#uipro1").append("<option value='" + value + "'>" + name + "</option>");
        $("#uipro2").append("<option value='" + value + "'>" + name + "</option>");
        $("#uipro3").append("<option value='" + value + "'>" + name + "</option>");
        $("#uipro4").append("<option value='" + value + "'>" + name + "</option>");


        value = '-1';
        name = 'Select Sample';

        $("#sam1").append("<option value='" + value + "'>" + name + "</option>");
        $("#sam2").append("<option value='" + value + "'>" + name + "</option>");
        $("#sam3").append("<option value='" + value + "'>" + name + "</option>");
        $("#sam4").append("<option value='" + value + "'>" + name + "</option>");

        $("#uisam1").append("<option value='" + value + "'>" + name + "</option>");
        $("#uisam2").append("<option value='" + value + "'>" + name + "</option>");
        $("#uisam3").append("<option value='" + value + "'>" + name + "</option>");
        $("#uisam4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {

            $("#pro1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#pro2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#pro3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#pro4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");

            $("#uipro1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#uipro2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#uipro3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#uipro4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");

            $("#sam1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#sam2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#sam3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#sam4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");

            $("#uisam1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#uisam2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#uisam3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#uisam4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });

    }
}

function FillGifts() {
    myData = '';
    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/FillGifts",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessFillGifts,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });
}
function onSuccessFillGifts(data, status) {
    if (data.d != "") {
        value = '-1';
        name = 'Select Gift';

        $("#gif1").append("<option value='" + value + "'>" + name + "</option>");
        $("#uigif1").append("<option value='" + value + "'>" + name + "</option>");
        $.each(data.d, function (i, tweet) {
            $("#gif1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
            $("#uigif1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
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



    document.getElementById('selNSM').innerHTML = "";
    document.getElementById('selRSM').innerHTML = "";
    document.getElementById('selZSM').innerHTML = "";
    document.getElementById('selmio').innerHTML = "";
    document.getElementById('selBrick').innerHTML = "";
    document.getElementById('selClass').innerHTML = "";
    document.getElementById('selSpecialty').innerHTML = "";
    document.getElementById('selDoctor').innerHTML = "";

    $("#selNSM").append("<option value='-1'>Select NSM</option>");
    $("#selRSM").append("<option value='-1'>Select SM</option>");
    $("#selZSM").append("<option value='-1'>Select AM</option>");
    $("#selmio").append("<option value='-1'>Select FMO</option>");
    $("#selBrick").append("<option value='-1'>Select Brick</option>");
    $("#selClass").append("<option value='-1'>Select Class</option>");
    $("#selSpecialty").append("<option value='-1'>Select Specialty</option>");
    $("#selDoctor").append("<option value='-1'>Select Doctor</option>");


    $('#loadingdiv2').jqm({ modal: true });
    $('#loadingdiv2').jqm();
    $('#loadingdiv2').jqmShow();

    if (CurrentUserRole == 'admin') {
        $("#btnzsm").hide();
        $("#btnsave").hide();
        $("#btnsubmit").hide();
        $("#btnApproval").hide();
        $("#selNSM").show();
        $("#selRSM").show();
        $("#selZSM").show();
        $("#selmio").show();
        $("#selNSM").change(OnChangeddlNSM);
        $("#selRSM").change(OnChangeddlRSM);
        $("#selZSM").change(OnChangeddlZSM);
        $('#selmio').change(OnChangeddlMio);
        loadNSM();
    }

    if (CurrentUserRole == 'rl3') {
        H2 = data.d[0].LevelId3;
        $("#btnzsm").hide();
        $("#btnsave").hide();
        $("#btnsubmit").hide();
        $("#btnApproval").hide();
        $("#selNSM").hide();
        $("#selRSM").show();
        $("#selZSM").show();
        $("#selmio").show();
        $("#selRSM").change(OnChangeddlRSM);
        $("#selZSM").change(OnChangeddlZSM);
        $('#selmio').change(OnChangeddlMio);
        loadRSM();
    }

    if (CurrentUserRole == 'rl4') {
        H2 = data.d[0].LevelId3;
        H3 = data.d[0].LevelId4;

        $("#btnzsm").hide();
        $("#btnsave").hide();
        $("#btnsubmit").hide();
        $("#btnApproval").hide();
        $("#selNSM").hide();
        $("#selRSM").hide();
        $("#selZSM").show();
        $("#selmio").show();
        $("#selZSM").change(OnChangeddlZSM);
        $('#selmio').change(OnChangeddlMio);
        loadZSM();
    }
    if (CurrentUserRole == 'rl5') {
        H2 = data.d[0].LevelId3;
        H3 = data.d[0].LevelId4;
        H4 = data.d[0].LevelId5;
        H5 = -1;
        $("#btnRecurrenc").hide();
        $("#btnzsm").hide();
        $("#btnsave").hide();
        $("#btnApproval").hide();
        $("#selNSM").hide();
        $("#selRSM").hide();
        $("#selZSM").hide();
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

        $("#btnRecurrenc").hide();
        $("#btnzsm").hide();
        $("#btnsave").show();
        $("#btnApproval").show();
        $("#selNSM").hide();
        $("#selRSM").hide();
        $("#selZSM").hide();
        $("#selmio").hide();
        showplan();
        FillProductSku();
        FillGifts();
        loadbrick();
        loadClass();
        loadSpecialty();
        loadDoctors();

        var k = 'kk';
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

function loadZSM() {

    myData = "{'employeeId':'" + EmployeeId + "' }";

    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/GetEmployee",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        success: function (data) {
            //jsonParse(
            var result = jsonParse(data.d);
            $.each(result, function (i, option) {
                $('#selZSM').append('<option Value="' + option.EmployeeId + '">' + option.EmployeeName + '</option>');
            });
            $('#loadingdiv2').jqmHide();
        },
        error: onError,
        async: false,
        cache: false
    });
}

function loadRSM() {

    myData = "{'employeeId':'" + EmployeeId + "' }";

    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/GetEmployee",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        success: function (data) {
            //jsonParse(
            var result = jsonParse(data.d);
            $.each(result, function (i, option) {
                $('#selRSM').append('<option Value="' + option.EmployeeId + '">' + option.EmployeeName + '</option>');
            });
            $('#loadingdiv2').jqmHide();
        },
        error: onError,
        async: false,
        cache: false
    });
}

function loadNSM() {

    myData = "{'employeeId':'" + EmployeeId + "' }";

    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/GetNSMS",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        success: function (data) {
            var result = jsonParse(data.d);
            $.each(result, function (i, option) {
                $('#selNSM').append('<option Value="' + option.EmployeeId + '">' + option.FirstName + ' ' + option.MiddleName + ' ' + option.LastName + '</option>');
            });
            $('#loadingdiv2').jqmHide();
        },
        error: onError,
        async: false,
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

function renderDay(topRow, middleRow, bottomRow, data) {
    var cssClass = "";
    var dayno = "0";
    cssClass += (isToday(data.number)) ? "today" : "";
    cssClass += (data.events.length) ? " event" : "";


    topRow.append("<li><div style='width: 20px;cursor: pointer' class=\"" + cssClass + "\">" + data.name + "</div></li>");
    //topRow.append("<li><div style='width: 20px;cursor: pointer' onclick='getdayview(" + data.number + ");return false' class=\"" + cssClass + "\">" + data.name + "</div></li>");
    middleRow.append("<li><div style='width: 20px;cursor: pointer' class=\"" + cssClass + "\">" + data.number + "</div></li>");

    bottomRow.append("<li><div id='" + data.number + "_brday" + "' style='width: 20px;cursor: pointer' class=\"" + cssClass + "\">" + dayno + "</div></li>");
    //bottomRow.append("<li><div id='" + data.number + "_brday" + "' style='width: 20px;cursor: pointer' onclick='getdayview(" + data.number + ");return false' class=\"" + cssClass + "\">" + dayno + "</div></li>");

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
    };
    this.render = function () {
        $(".timeline_bottom").empty();
        $(".timeline_top").empty();
        $(".timeline_middle").empty();
        $(".timeline_top").empty();
        $(".timeline_DataRow").empty();

        $('#dtime').empty();
        $('#PlanStatus').empty();
        $('#PlanStatus').removeClass('planStatus_green');
        $('#PlanStatus').removeClass('planStatus_red');
        $('#PlanStatus').removeClass('planStatus_yellow');

        var monthRepresentation = this.getMonthRepresentation();
        var cssClass = "";
        if (this.isIE6)
            this.handleIE6Issues(); this.setupArrows();
    };
    this.handleIE6Issues = function () {
        var clone = this.placeHolders.top.clone(true);
        this.container.append(clone); clone.css({ left: "-1000px", top: "-1000px" });
        var width = clone.outerWidth(); clone.remove(); this.placeHolders.top.css({ width: width + "px" });
        this.placeHolders.bottom.css({ width: width + "px" });
    };
    this.renderDay = function (topRow, middleRow, bottomRow, data) {
        var cssClass = "";
        cssClass += (this.isToday(data.number)) ? "today" : "";
        cssClass += (data.events.length) ? " event" : "";

        topRow.append("<li><div style='width: 20px;' class=\"" + cssClass + "\">" + data.name + "</div></li>");
        middleRow.append("<li><div style='width: 20px;' class=\"" + cssClass + "\">" + data.number + "</div></li>");
        bottomRow.append("<li><div style='width: 20px;' class=\"" + cssClass + "\">" + data.number + "</div></li>");

        nameEl = topRow.find("div:last"); numbEl = bottomRow.find("div:last");

        if (data.events.length == 0)
            return;

        var self = this; var enterClosure = function (e) { self.onMouseEnter(e); };

        var leaveClosure = function (e) { self.onMouseLeave(e); };
        nameEl.bind("mouseenter", data, enterClosure);
        numbEl.bind("mouseenter", data, enterClosure); nameEl.bind("mouseleave", data, leaveClosure);
        numbEl.bind("mouseleave", data, leaveClosure);
    };
    this.setupArrows = function () {
        var dateString = this.monthsOfYear[this.date.getMonth()] + " " + this.date.getFullYear();
        var html = "";


        html += "<div class=\"timeline_lastyear\" title=\"Previous Year\"></div>";
        html += "<div class=\"timeline_lastmonth\" title=\"Previous Month\"></div>";
        html += "<div class=\"timeline_date\">" + dateString + "</div>";
        html += "<div class=\"timeline_nextmonth\" title=\"Next Month\"></div>";
        html += "<div class=\"timeline_nextyear\" title=\"Next Year\"></div>"; //this.placeHolders.arrows.append(html);

        $('#dtime').append(html);
        var children = $('#dtime').children();

        // var children = this.placeHolders.arrows.children();
        var self = this;
        $(children[0]).bind("click", this, function () { self.previousYear(); });
        $(children[1]).bind("click", this, function () { self.previousMonth(); });
        $(children[3]).bind("click", this, function () { self.nextMonth(); });
        $(children[4]).bind("click", this, function () { self.nextYear(); });
    };
    this.getEventsForDay = function (dayNumber) {
        var result = [];
        for (var i = 0; i < this.events.length; i++) {
            var e = this.events[i];
            if (e.day == dayNumber && e.month == this.date.getMonth() && e.year == this.date.getFullYear())
                result.push(this.events[i]);
        }
        return result;
    };
    this.setupPlaceHolders = function () {

        var arrows = jQuery(document.createElement("div"));
        arrows.addClass("timeline_arrows");

        var top = jQuery(document.createElement("div"));
        top.addClass("timeline_top");

        var middle = jQuery(document.createElement("div"));
        middle.addClass("timeline_middle");

        var bottom = jQuery(document.createElement("div"));
        bottom.addClass("timeline_bottom");

        var dataR = jQuery(document.createElement("div"));
        dataR.addClass("timeline_DataRow");

        //top.append("<ul></ul>");
        //bottom.append("<ul></ul>");
        // dataR.append("<ul></ul>");

        this.container.append([arrows[0], top[0], middle[0], bottom[0], dataR[0]]);
        return { arrows: arrows, top: top.find("ul:first"), middle: middle.find("ul:first"), bottom: bottom.find("ul:first"), dataRow: "" };
    };
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
    };
    this.getMIODR = function () {
        var result = [];
        var result1 = "";
        var numberOfDays = this.getNumberOfDaysInMonth(this.date);

        var monthRepresentation = this.getMonthRepresentation();

        ddata = this.date.toDateString();

        mmoth = this.date.getMonth() + 1;
        myear = this.date.getFullYear();;
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
    };
    this.getNumberOfDaysInMonth = function (dateObject) {
        var month = dateObject.getMonth(); if (month == 1) {
            var leapYear = (new Date(dateObject.getYear(), 1, 29).getDate()) == 29; if (leapYear)
                return 29;
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
    };
    this.onMouseLeave = function (event) { this.bubble.hide(); };
    this.nextMonth = function () { this.date.setMonth(this.date.getMonth() + 1); this.render(); };
    this.nextYear = function () { this.date.setYear(this.date.getFullYear() + 1); this.render(); };
    this.previousMonth = function () { this.date.setMonth(this.date.getMonth() - 1); this.render(); };
    this.previousYear = function () { this.date.setYear(this.date.getFullYear() - 1); this.render(); };
    this.initialize();
};
Timeline.Bubble = function (timeline) {
    this.initialize = function () { var IE6Class = (timeline.isIE6) ? " bubbleIE6" : ""; var id = "bubble_" + new Date().getTime(); var html = ""; html += "<div id=\"" + id + "\" class=\"timeline_bubble\">"; html += "<div class=\"bubble_top" + IE6Class + "\"></div>"; html += "<div class=\"bubble_mid" + IE6Class + "\"></div>"; html += "<div class=\"bubble_bottom" + IE6Class + "\"></div></div>"; timeline.container.after(html); this.container = $("#" + id); this.container.bind("mouseenter", this, this.onMouseEnter); this.container.bind("mouseleave", this, this.onMouseLeave); };
    this.onMouseEnter = function (event) { event.data.stopHiding(); };
    this.onMouseLeave = function (event) { event.data.hide(); };
    this.stopHiding = function () { if (this.goingOffHandle && this.goingOffHandle != null) { clearTimeout(this.goingOffHandle); this.goingOffHandle = null; } };
    this.setContent = function (events) {
        this.stopHiding(); var html = ""; for (var i = 0; i < events.length; i++)
            html += "<div><div class=\"event_title\">" + events[i].name + "<p class=\"event_data\">" + events[i].content + "</p></div></div>"; var midSection = $(this.container.children()[1]); midSection.empty(); midSection.append(html); var titles = midSection.find(".event_title"); titles.each(function (inx, element) { $(element).bind("mouseenter", function (event) { $(element).children(":first").animate({ opacity: "toggle" }, 200); }); $(element).bind("mouseleave", function (event) { $(element).children(":first").animate({ opacity: "hide" }, 200); }); });
    };
    this.show = function (at) { this.container.animate({ opacity: "show" }, 250); this.container.animate({ left: at - (this.container.outerWidth() / 2) }, 300); };
    this.hide = function () { var self = this; this.goingOffHandle = setTimeout(function () { self.container.animate({ opacity: "hide" }, 250); }, 700); };
    this.initialize();
};
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

    var ddl = $("#" + "ddlUIDoctors");
    ddl.children().remove();
    ddl.append($("<option value='-1' />").html("Select Doctors"));


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
                var op = $("<option />").html(option.DoctorName).val(option.DoctorId).attr("data-doccode", option.DoctorCode).attr("data-docbrick", option.DoctorBrick);
                ddl.append(op);

            });

            $('#selBrick').change(OnChangeddlBrick);
            $('#selClass').change(OnChangeddlClass);
            $('#selSpecialty').change(OnChangeddlSpecialty);
            $('#selDoctor').change(OnChangeddlDoctor);
            //$('#ddlUIDoctors').change(OnChangeddlUIDoctor);
            $('#ddlUIDoctors').change(function () {
                //alert($(this).find(':selected').data('doccode'));
                $('#txtUIdrcode').val($(this).find(':selected').attr('data-doccode'));
                $('#txtUIterr').val($(this).find(':selected').attr('data-docbrick'));
                $('#txtUIaddress').val($(this).find(':selected').attr('data-docbrick'));
            });


        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });


}

function OnChangeddlUIDoctor() {
    var selected = $('ddlUIDoctors').find('option:selected');
    //var doccode = $('ddlUIDoctors').find(':selected').data('doccode');
    var doccode = selected.attr('data-doccode');
    alert(doccode);
    //$('#txtUIdrcode').val(selected.data('doccode'));
    //$('#txtUIterr').val(selected.data('docbrick'));
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

    $(".timeline_bottom").empty();
    $(".timeline_top").empty();
    $(".timeline_DataRow").empty();
    $("#btnzsm").hide();

    var _MIOid = $('#selmio').val();

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'rl3' || CurrentUserRole == 'rl4') {
        if (_MIOid != -1) {
            $("#btnsubmit").show();
        }
    }

    document.getElementById('selBrick').innerHTML = "";
    document.getElementById('selClass').innerHTML = "";
    document.getElementById('selSpecialty').innerHTML = "";
    document.getElementById('selDoctor').innerHTML = "";

    $("#selBrick").append("<option value='-1'>Select Brick</option>");
    $("#selClass").append("<option value='-1'>Select Class</option>");
    $("#selSpecialty").append("<option value='-1'>Select Specialty</option>");
    $("#selDoctor").append("<option value='-1'>Select Doctor</option>");


    if (_MIOid != -1) {
        loadbrick();
        loadClass();
        loadSpecialty();
        loadDoctors();
    } else {
        $("#btnsubmit").hide();
    }
    $('#loadingdiv2').jqmHide();
}

function OnChangeddlZSM() {

    var zsmid = $("#selZSM").val();

    if (zsmid != -1) {



        myData = "{'employeeId':'" + zsmid + "' }";

        $.ajax({
            type: "POST",
            url: "MioPlanning.asmx/GetEmployee",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: myData,
            success: function (data) {
                document.getElementById('selmio').innerHTML = "";
                $("#selmio").append("<option value='-1'>Select FMO</option>");
                var result = jsonParse(data.d);
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
}

function OnChangeddlRSM() {

    var rsmid = $("#selRSM").val();


    if (rsmid != -1) {
        myData = "{'employeeId':'" + rsmid + "' }";

        $.ajax({
            type: "POST",
            url: "MioPlanning.asmx/GetEmployee",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: myData,
            success: function (data) {
                var result = jsonParse(data.d);
                document.getElementById('selZSM').innerHTML = "";
                $("#selZSM").append("<option value='-1'>Select AM</option>");
                document.getElementById('selmio').innerHTML = "";
                $("#selmio").append("<option value='-1'>Select FMO</option>");
                $.each(result, function (i, option) {
                    $('#selZSM').append('<option Value="' + option.EmployeeId + '">' + option.EmployeeName + '</option>');
                });
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
}

function OnChangeddlNSM() {

    var nsmid = $("#selNSM").val();

    if (nsmid != -1) {

        myData = "{'employeeId':'" + nsmid + "' }";
        $.ajax({
            type: "POST",
            url: "MioPlanning.asmx/GetEmployee",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: myData,
            success: function (data) {
                document.getElementById('selRSM').innerHTML = "";
                $("#selRSM").append("<option value='-1'>Select SM</option>");
                document.getElementById('selZSM').innerHTML = "";
                $("#selZSM").append("<option value='-1'>Select AM</option>");
                document.getElementById('selmio').innerHTML = "";
                $("#selmio").append("<option value='-1'>Select FMO</option>");

                var result = jsonParse(data.d);
                $.each(result, function (i, option) {
                    $('#selRSM').append('<option Value="' + option.EmployeeId + '">' + option.EmployeeName + '</option>');
                });
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
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
            if (CurrentUserRole == "rl6") {
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
            }
            else if (CurrentUserRole == "rl5") {
                myData = "{'pday':'" + _pday
                        + "','pmonth':'" + _pmonth
                        + "','pyear':'" + _pyear
                        + "','drid':'" + _drid
                        + "','_TargetCall':'" + 0
                        + "','_ActualCall':'" + 0
                        + "','_Total':'" + 0
                        + "','Cchecked':'" + _Cchecked
                        + "','planid':'" + _planid
                        + "','_empid':'" + $('#selmio').val()
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

            }
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
                cache: false,
                async: false
            });

        }
    });

    $('#loadingdiv2').jqmHide();
}
function showplan() {

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'rl3' || CurrentUserRole == 'rl4') {
        if ($("#selmio").val() == -1) {
            alert('Please select a FMO');
            return false;
        }
    }

    $('#loadingdiv2').jqm({ modal: true });
    $('#loadingdiv2').jqm();
    $('#loadingdiv2').jqmShow();

    this.weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    this.monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.dayNumbers = { "sunday": 0, "monday": 1, "tuesday": 2, "wednesday": 3, "thursday": 4, "friday": 5, "saturday": 6 };

    $(".timeline_top").empty();
    $(".timeline_middle").empty();
    $(".timeline_bottom").empty();
    $(".timeline_DataRow").empty();

    var topR = $(".timeline_top");
    var middleR = $(".timeline_middle");
    var buttomR = $(".timeline_bottom");
    var dataR = $(".timeline_DataRow");

    topR.append("<ul>");
    middleR.append("<ul>");
    buttomR.append("<ul>");

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
            topR.append("<li><div style='width: 180px;background-color: #000000'> DR NAME </div></li>");
            middleR.append("<li><div style='width: 180px;background-color: #000000'>&nbsp;&nbsp;</div></li>");
            buttomR.append("<li><div style='width: 180px;background-color: #000000'>&nbsp;&nbsp;</div></li>");

            //topR.append("<li><div style='width: 50px;background-color: #000000'> DR Class </div></li>");
            //buttomR.append("<li><div style='width: 50px;background-color: #000000'>&nbsp;&nbsp;</div></li>");

            //topR.append("<li><div style='width: 75px;background-color: #000000'> Specialty </div></li>");
            //buttomR.append("<li><div style='width: 75px;background-color: #000000'>&nbsp;&nbsp;</div></li>");

            //topR.append("<li><div style='width: 175px;background-color: #000000'> Brick </div></li>");
            //buttomR.append("<li><div style='width: 175px;background-color: #000000'>&nbsp;&nbsp;</div></li>");

            topR.append("<li><div style='width: 50px;background-color: #000000'> Target </div></li>");
            middleR.append("<li><div style='width: 50px;background-color: #000000'>&nbsp;&nbsp;</div></li>");
            buttomR.append("<li><div style='width: 50px;background-color: #000000'>&nbsp;&nbsp;</div></li>");

            topR.append("<li><div style='width: 50px;background-color: #000000'> Actual </div></li>");
            middleR.append("<li><div style='width: 50px;background-color: #000000'>&nbsp;&nbsp;</div></li>");
            buttomR.append("<li><div style='width: 50px;background-color: #000000'>&nbsp;&nbsp;</div></li>");

            topR.append("<li><div style='width: 50px;background-color: #000000'> Pending </div></li>");
            middleR.append("<li><div style='width: 50px;background-color: #000000'>&nbsp;&nbsp;</div></li>");
            buttomR.append("<li><div style='width: 50px;background-color: #000000'>&nbsp;&nbsp;</div></li>");

            //topR.append("<li><div style='width: 50px;background-color: #000000'> Total </div></li>");
            //buttomR.append("<li><div style='width: 50px;background-color: #000000'>&nbsp;&nbsp;</div></li>");
        }

        renderDay(topR, middleR, buttomR, monthRepresentation[i]);
    }

    topR.append("</ul>");
    middleR.append("</ul>");
    buttomR.append("</ul>");

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

    myear = Gdate.getFullYear();;
    savedata = false;

    if (CurrentUserRole == "rl4" || CurrentUserRole == "rl3" || CurrentUserRole == "admin") {
        myData = "{'_date':'" + ddata + "','_EmployeeId':'" + $('#selmio').val() + "'}";
    }
    if (CurrentUserRole == "rl6") {
        myData = "{'_date':'" + ddata + "','_EmployeeId':'" + EmployeeId + "'}";
    }
    else if (CurrentUserRole == "rl5") {

        myData = "{'_date':'" + ddata + "','_EmployeeId':'" + $('#selmio').val() + "'}";
    }
    //    _PlanStatus = "";

    var GPlanStatus = "";
    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/PlanStatus",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != null) {
                $('#planReason').text('');
                _PSresult = jsonParse(data.d);
                _ApproveId = _PSresult[0].ApproveId;
                _PlanStatus = _PSresult[0].PlanStatus;
                _planReason = _PSresult[0].Reason;

                var Brickid = $('#selBrick').val();
                var Classid = $('#selClass').val();
                var Speid = $('#selSpecialty').val();
                var Drid = $('#selDoctor').val();

                if (CurrentUserRole == "rl6" || CurrentUserRole == "rl4" || CurrentUserRole == "rl3" || CurrentUserRole == "admin") {
                    if (_planReason != "") {
                        _planReason = "Plan Reject Reason : " + _planReason;
                    }
                    $('#PlanStatus').text("Plan status is " + _PlanStatus);
                    if (_PlanStatus == "Approve") {
                        if (CurrentUserRole == "rl6") {
                            savedata = true;
                            $('#planReason').text('');
                            $('#btnsave').hide();
                            $('#btnApproval').hide('');

                        }
                        $('#PlanStatus').removeClass('planStatus_green');
                        $('#PlanStatus').removeClass('planStatus_red');
                        $('#PlanStatus').removeClass('planStatus_yellow');

                        $('#PlanStatus').addClass('planStatus_green');
                    }
                    else if (_PlanStatus == "Draft") {
                        if (CurrentUserRole == "rl6") {
                            savedata = false;
                            $('#planReason').text(_planReason);
                            $('#btnsave').show();
                            $('#btnApproval').show('');

                        }
                        $('#PlanStatus').removeClass('planStatus_green');
                        $('#PlanStatus').removeClass('planStatus_red');
                        $('#PlanStatus').removeClass('planStatus_yellow');

                        $('#PlanStatus').addClass('planStatus_yellow');
                    }
                    else if (_PlanStatus == "Pending") {
                        if (CurrentUserRole == "rl6") {
                            savedata = false;
                            $('#planReason').text('');
                            $('#btnsave').hide();
                            $('#btnApproval').hide('');
                        }
                        $('#PlanStatus').removeClass('planStatus_green');
                        $('#PlanStatus').removeClass('planStatus_red');
                        $('#PlanStatus').removeClass('planStatus_yellow');
                        $('#PlanStatus').addClass('planStatus_red');
                    }
                    $("#btnRecurrenc").hide();

                    if (CurrentUserRole == "rl6") {
                        myData = "{'_date':'" + ddata + "','_DoctorId':'" + Drid + "','_ClassId':'" + Classid + "','_BrickId':'" + Brickid + "','_SpecialityId':'" + Speid
                            + "','_EmployeeId':'" + EmployeeId + "'}";
                    } else {
                        myData = "{'_date':'" + ddata + "','_DoctorId':'" + Drid + "','_ClassId':'" + Classid + "','_BrickId':'" + Brickid + "','_SpecialityId':'" + Speid
                        + "','_EmployeeId':'" + $('#selmio').val() + "'}";
                    }
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

                                var htmltooltip = "<b><p>DOCTOR INFORMATION  </p> Class: </b>" + drclass + "<p><b> Specialty: </b>" + specialty + "</p><p><b> Brick: </b>" + brick + "</p>";
                                $('#' + ii).append("<li style='width: 170px;padding: 0 5px 5px;background-color:#ccc' data-tooltip='" + htmltooltip + "'>" + drname + "</li>");
                                //$('#' + ii).append("<li style='width: 40px;padding: 0 5px 5px;background-color:#ccc'>" + drclass + "</li>");
                                //$('#' + ii).append("<li style='width: 65px;padding: 0 5px 5px;background-color:#ccc'>" + specialty + "</li>");
                                //$('#' + ii).append("<li style='width: 165px;padding: 0 5px 5px;background-color:#ccc'>" + brick + "</li>");
                                $('#' + ii).append("<li style='width: 40px;padding: 0 5px 5px;background-color:#ccc'>" + Target + "</li>");
                                $('#' + ii).append("<li style='width: 40px;padding: 0 5px 5px;background-color:#ccc'>" + Actual + "</li>");
                                $('#' + ii).append("<li style='width: 40px;padding: 0 5px 5px;background-color:#ccc'>" + Pending + "</li>");

                                //$('#' + ii).append("<li style='width: 40px;padding: 0 5px 5px;background-color:#ccc'>" + Total + "</li>");

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
                                        if (i < 10) {
                                            var callcountid = i + 1;
                                            callcountid = "0" + callcountid;
                                            var brdaydata = parseInt($('#' + callcountid + "_brday").text());

                                            $('#' + callcountid + "_brday").text(brdaydata + 1);
                                        } else {
                                            var callcountid = i + 1;

                                            var brdaydata = parseInt($('#' + callcountid + "_brday").text());

                                            $('#' + callcountid + "_brday").text(brdaydata + 1);
                                        }
                                    } else {
                                        checkedhtml = "";
                                    }
                                    var disabled = "";
                                    if (_PlanStatus == "Approve") {
                                        disabled = "disabled";
                                    }
                                    var checklist = '<li id="' + liid + '"><div style="width: 20px;"><input id="' + ckid + '" type="checkbox"' + checkedhtml + ' ' + disabled + '/></div>';
                                    if (savedata) {
                                        if (checkedoption == "True") {
                                            //checklist += "<div class='box' onclick='FillForm(" + planid + ")'><img src='../Images/plan_arrow.png' alt='execute'/> </div></li>";
                                        }
                                    }
                                    $('#' + ii).append(checklist);
                                }
                                $('#' + ii).append("</ul>");
                                $('#loadingdiv2').jqmHide();
                            });
                            $('[data-tooltip]').addClass('tooltip');
                            $('.tooltip').each(function () {
                                $(this).append('<span class="tooltip-content">' + $(this).attr('data-tooltip') + '</span>');
                            });

                            if ($.browser.msie && $.browser.version.substr(0, 1) < 7) {
                                $('.tooltip').mouseover(function () {
                                    $(this).children('.tooltip-content').css('visibility', 'visible');
                                }).mouseout(function () {
                                    $(this).children('.tooltip-content').css('visibility', 'hidden');
                                })
                            }
                        },
                        error: onError,
                        beforeSend: startingAjax,
                        complete: ajaxCompleted,
                        cache: false,
                        async: false
                    });

                }
                else if (CurrentUserRole == "rl5") {
                    if (_PlanStatus != "") {

                        if (_PlanStatus == "Approve") {
                            $('#PlanStatus').text("Plan status is " + _PlanStatus);
                            savedata = false;
                            $('#planReason').text('');
                            $('#PlanStatus').removeClass('planStatus_green');
                            $('#PlanStatus').removeClass('planStatus_red');
                            $('#PlanStatus').removeClass('planStatus_yellow');

                            $('#PlanStatus').addClass('planStatus_green');
                        }
                        else if (_PlanStatus == "Draft") {
                            $('#PlanStatus').text('');
                            $('#PlanStatus').removeClass('planStatus_green');
                            $('#PlanStatus').removeClass('planStatus_red');
                            $('#PlanStatus').removeClass('planStatus_yellow');
                        }
                        else if (_PlanStatus == "Pending") {
                            $('#PlanStatus').text("Plan status is " + _PlanStatus);
                            savedata = false;
                            $('#planReason').text('');
                            $('#PlanStatus').removeClass('planStatus_green');
                            $('#PlanStatus').removeClass('planStatus_red');
                            $('#PlanStatus').removeClass('planStatus_yellow');
                            $('#PlanStatus').addClass('planStatus_red');
                        }

                        if (_PlanStatus == "Pending" || _PlanStatus == "Approve") {
                            $("#btnzsm").show();
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
                                        var htmltooltip = "<b><p>DOCTOR INFORMATION  </p> Class: </b>" + drclass + "<p><b> Specialty: </b>" + specialty + "</p><p><b> Brick: </b>" + brick + "</p>";
                                        $('#' + ii).append("<li style='width: 170px;padding: 0 5px 5px;background-color:#ccc' data-tooltip='" + htmltooltip + "'>" + drname + "</li>");
                                        //$('#' + ii).append("<li style='width: 40px;padding: 0 5px 5px;background-color:#ccc'>" + drclass + "</li>");
                                        //$('#' + ii).append("<li style='width: 65px;padding: 0 5px 5px;background-color:#ccc'>" + specialty + "</li>");
                                        //$('#' + ii).append("<li style='width: 165px;padding: 0 5px 5px;background-color:#ccc'>" + brick + "</li>");
                                        $('#' + ii).append("<li style='width: 40px;padding: 0 5px 5px;background-color:#ccc'>" + Target + "</li>");
                                        $('#' + ii).append("<li style='width: 40px;padding: 0 5px 5px;background-color:#ccc'>" + Actual + "</li>");
                                        $('#' + ii).append("<li style='width: 40px;padding: 0 5px 5px;background-color:#ccc'>" + Pending + "</li>");

                                        //$('#' + ii).append("<li style='width: 40px;padding: 0 5px 5px;background-color:#ccc'>" + Total + "</li>");

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
                                                if (i < 10) {
                                                    var callcountid = i + 1;
                                                    callcountid = "0" + callcountid;
                                                    var brdaydata = parseInt($('#' + callcountid + "_brday").text());

                                                    $('#' + callcountid + "_brday").text(brdaydata + 1);
                                                } else {
                                                    var callcountid = i + 1;

                                                    var brdaydata = parseInt($('#' + callcountid + "_brday").text());

                                                    $('#' + callcountid + "_brday").text(brdaydata + 1);
                                                }
                                            }
                                            else {
                                                checkedhtml = "";
                                            }
                                            var disabled = "";
                                            if (_PlanStatus == "Approve") {
                                                disabled = "disabled";
                                            }
                                            var checklist = '<li id="' + liid + '"><div style="width: 20px;"><input id="' + ckid + '" type="checkbox"' + checkedhtml + ' ' + disabled + '/></div>';
                                            // if (savedata) {
                                            if (checkedoption == "True") {
                                                checklist += "<div id='" + planid + "' class='box' onclick='jointVisit(" + planid + "," + Cday + ")'><img src='../Images/plan_arrow.png' alt='execute'/></div></li>";

                                            }
                                            //}
                                            $('#' + ii).append(checklist);
                                        }
                                        $('#' + ii).append("</ul>");
                                        $('#loadingdiv2').jqmHide();
                                    });
                                    $('[data-tooltip]').addClass('tooltip');
                                    $('.tooltip').each(function () {
                                        $(this).append('<span class="tooltip-content">' + $(this).attr('data-tooltip') + '</span>');
                                    });

                                    if ($.browser.msie && $.browser.version.substr(0, 1) < 7) {
                                        $('.tooltip').mouseover(function () {
                                            $(this).children('.tooltip-content').css('visibility', 'visible');
                                        }).mouseout(function () {
                                            $(this).children('.tooltip-content').css('visibility', 'hidden');
                                        })
                                    }
                                },
                                error: onError,
                                beforeSend: startingAjax,
                                complete: ajaxCompleted,
                                cache: false,
                                async: false
                            });
                        }
                        else {
                            $("#btnzsm").hide();
                            $('#btnsave').hide();
                            $('#btnApproval').hide();
                            $('.timeline_top').empty();
                            $('.timeline_bottom').empty();
                            $('.timeline_middle').empty();
                            $('#planReason').text('NO Plan Available');
                            $('#loadingdiv2').jqmHide();
                        }
                    }
                    else {
                        $("#btnzsm").hide();
                        $('#btnsave').hide();
                        $('#btnApproval').hide();
                        $('.timeline_top').empty();
                        $('.timeline_bottom').empty();
                        $('.timeline_middle').empty();
                        $('#planReason').text('NO Plan Available');
                        $('#loadingdiv2').jqmHide();
                    }
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
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        async: false
    });

}

function saveExection() {

    var products = '';
    var samples = '';
    var gifts = '';
    var a;
    for (a = 1; a < 5; a++) {

        products += $("#pro" + a).val();
        products += ";";
    }

    for (a = 1; a < 5; a++) {

        samples += $("#sam" + a).val() + "|" + $("#txtsamq" + a).val();
        samples += ";";
    }

    for (a = 1; a < 2; a++) {

        gifts += $("#gif" + a).val() + "|" + $("#txtgifq" + a).val();
        gifts += ";";
    }

    var myData = "{'dt':'" + $('#txtdate').val() + "' ,'dc':'" + $('#txtdrcode').val() + "','employeeId':'" + EmployeeId + "','startTime':'" + $('#txtSTime').val() + "','endTime':'" + $('#txtEtime').val() + "','activityId':'" + $('#Select4').val() + "','products':'" + products + "','reminders':'','samples':'" + samples + "','gifts':'" + gifts + "'}";
    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/SaveExecution",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        success: function (data) {

        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function saveUPExecution() {

    var products = '';
    var samples = '';
    var gifts = '';
    var a;
    for (a = 1; a < 5; a++) {

        products += $("#uipro" + a).val();
        products += ";";
    }

    for (a = 1; a < 5; a++) {

        samples += $("#uisam" + a).val() + "|" + $("#txtUIsamq" + a).val();
        samples += ";";
    }

    for (a = 1; a < 2; a++) {

        gifts += $("#uigif" + a).val() + "|" + $("#txtUIgifq" + a).val();
        gifts += ";";
    }

    var myData = "{'dt':'" + $('#txtUIdate').val() + "' ,'dc':'" + $('#txtUIdrcode').val() + "','employeeId':'" + EmployeeId + "','startTime':'" + $('#ddUIStartTime').val() + "','endTime':'" + $('#ddUIEndTime').val() + "','activityId':'" + $('#ddlUIActivity').val() + "','products':'" + products + "','reminders':'','samples':'" + samples + "','gifts':'" + gifts + "'}";
    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/saveUPExecution",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        success: function (data) {

        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function callApproval() {
    $('#zsmdialog').jqm({ modal: true });
    $('#zsmdialog').jqm();
    $('#zsmdialog').jqmShow();

}
function approvalSave(PStatus) {
    var res = $('#txtreason').val();
    $('#zsmdialog').jqmHide();

    $('#loadingdiv2').jqm({ modal: true });
    $('#loadingdiv2').jqm();
    $('#loadingdiv2').jqmShow();

    saveplan();
    mioPlanStatusupdate(PStatus, res);
}

function mioPlanStatusupdate(PlanStatus, Reason) {
    if (CurrentUserRole == "rl6") {
        myData = "{'_date':'" + Gdate.toDateString()
                + "','_EmployeeId':'" + EmployeeId
                + "','_Reason':'" + Reason
                + "','_PlanStatus':'" + PlanStatus
                + "'}";
    }
    else if (CurrentUserRole == "rl5") {
        myData = "{'_date':'" + Gdate.toDateString()
                + "','_EmployeeId':'" + $('#selmio').val()
                + "','_Reason':'" + Reason
                + "','_PlanStatus':'" + PlanStatus
                + "'}";
    }

    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/PlanStatus_update",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d == "Update") {

                myData2 = "{'_date':'" + Gdate.toDateString()
                + "','_EmployeeId':'" + $('#selmio').val()
                + "','_Reason':'" + Reason
                + "','_PlanStatus':'" + PlanStatus
                 + "','_currentRole':'" + CurrentUserRole
                + "'}";
                emails(myData2);

                $('#diamsg').jqm({ modal: true });
                $('#diamsg').jqm();
                $('#diamsg').jqmShow();
                showplan();
            }
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        async: false
    });


}

function emails(myData) {

    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/Emails_forStatus",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d == "OK") {
                //                $('#diamsg').jqm({ modal: true });
                //                $('#diamsg').jqm();
                //                $('#diamsg').jqmShow();
                //                showplan();
            }
        },
        error: onError,
        //        beforeSend: startingAjax,
        //        complete: ajaxCompleted,
        cache: false,
        async: false
    });
}

function jqmmodelhide(jqmid) {
    $('#' + jqmid).jqmHide();
}
function getdayview(daynumber) {

    $('#dayview').jqm({ modal: true });
    $('#dayview').jqm();
    $('#dayview').jqmShow();
    getdayview_date(daynumber);
}

function getdayview_date(daynumber) {
    $("#drlist").empty();
    $("#totaldr").empty();

    var Drid = -1;
    var Classid = -1;
    var Brickid = -1;
    var Speid = -1;
    ddata = Gdate.toDateString();

    var cdt = new Date(ddata);
    var current_date = cdt.getDate();
    var current_month = cdt.getMonth();
    var current_month = current_month + 1;
    var current_year = cdt.getFullYear();

    $('#txtDaydate').val(current_month + '/' + daynumber + '/' + current_year);

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
            if (data.d != null) {
                var _PSresult = jsonParse(data.d);
                var _ApproveId = _PSresult[0].ApproveId;
                var _PlanStatus = _PSresult[0].PlanStatus;
                var _planReason = _PSresult[0].Reason;
            }
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        async: false
    });

    if (CurrentUserRole == "rl6") {
        myData = "{'_date':'" + ddata + "','_DoctorId':'" + Drid + "','_ClassId':'" + Classid + "','_BrickId':'" + Brickid + "','_SpecialityId':'" + Speid
                        + "','_EmployeeId':'" + EmployeeId + "'}";
    }
    else if (CurrentUserRole == "rl5") {
        myData = "{'_date':'" + ddata + "','_DoctorId':'" + Drid + "','_ClassId':'" + Classid + "','_BrickId':'" + Brickid + "','_SpecialityId':'" + Speid
                        + "','_EmployeeId':'" + $('#selmio').val() + "'}";

    }

    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/viewPlan",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            result1 = jsonParse(data.d);
            ppp = 0;
            var tim = ""; var tim2 = "";
            var sa = "";
            var exu = "";
            var drtable = "<table width='100%' cellspacing='0' cellpadding='0' border='0' class='formcss2'><thead><th style='text-align: left;'>Start time &nbsp;&nbsp;End time</th><th>Doctor Name</th><th></th><th></th></thead><tbody>";

            $.each(result1, function (i, option) {
                var planid = option.PlanningId;
                var drname = option.DoctorName;



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

                if (_PlanStatus == "Approve") {

                    exu = "<div class='box2' onclick='FillForm_dayview(" + planid + ")'><img alt='Icon' src='../Images/call_small.png' id='Image1' /></div>";

                }
                else if (_PlanStatus == "Draft") {


                }
                else if (_PlanStatus == "Pending") {

                }

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


                    if (CurrentUserRole == "rl5") {
                        drtable += "<td style='width: 25px'></td>";
                    } else {
                        drtable += "<td style='width: 25px'>" + exu + "</td>";
                    }
                    drtable += "<td style='width: 25px'></td>";
                    drtable += "</tr>";
                }
            });
            drtable += "</table>";

            $("#totaldr").text("Planned visit today: " + ppp);
            $("#drlist").prepend($(drtable));
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        async: false
    });

}
function onchange_daytextbox() {
    var dat = $('#txtDaydate ').val().split('/')[1];
    getdayview_date(parseInt(dat));

}
function FillForm_dayview(planid) {
    //$('#dayview').jqmHide();
    FillForm(planid);
}

function UnplannedVisitPopup() {
    $('#divUninformed').jqm({ modal: true, toTop: true });
    $('#divUninformed').jqm();
    $('#divUninformed').jqmShow();
}

function FillForm(planid) {
    //, pday, pmonth, pyear


    $('#dialog').jqm({ modal: true, toTop: true });
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
        cache: false,
        async: false
    });

}



function PlanRecurrence() {
    $('#diaRecurrenc').jqm({ modal: true });
    $('#diaRecurrenc').jqm();
    $('#diaRecurrenc').jqmShow();
}
function ExecuteRecurrence() {
    $('#diaRecurrenc').jqmHide();

    $('#loadingdiv2').jqm({ modal: true });
    $('#loadingdiv2').jqm();
    $('#loadingdiv2').jqmShow();

    var todate = $("#txtSmonth").val();
    var fromdate = $("#txtEmonth").val();

    myData = "{'_Fdate':'" + todate
                + "','_tdate':'" + fromdate
                + "','_Employeeid':'" + EmployeeId
                + "'}";

    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/PlanExecuteRecurrence",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        success: function (data) {

            $('#loadingdiv2').jqmHide();
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        async: false
    });

}

function ajaxCompleted(request, data) {

}
function onError(request, status, error) {
    alert(error);
}
function startingAjax() {

}

function jointVisit(planid, day) {

    $("input[name='UI'][value='" + 0 + "']").attr('checked', false);
    $("input[name='UI'][value='" + 1 + "']").attr('checked', false);
    $("input[name='UI'][value='" + 2 + "']").attr('checked', false);

    myData = "{'Pplanid':'" + planid + "' }";
    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/PlanInfo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        success: function (data) {
            if (data.d != '') {
                var result = jsonParse(data.d);
                var empid = result[0].EmployeeId;
                $("#hdnPlanInfo").val("plan:" + planid + "-employeeid:" + empid + "-doctorid:" + result[0].DoctorId + "-ZSMid:" + EmployeeId + "-Day:" + day + "-ddate:" + ddata);


                myData = "{'mioPlanningId':'" + planid + "','mioEmployeeId':'" + empid + "','zsmEmployeeId':'" + EmployeeId + "','doctorId':'" + result[0].DoctorId + "','day':'" + day + "','ddate':'" + ddata + "' }";
                $.ajax({
                    type: "POST",
                    url: "MioPlanning.asmx/GetJvDetail",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: myData,
                    success: function (dataa) {
                        if (dataa.d != '') {
                            var result = jsonParse(dataa.d);
                            var radioButtonValue;
                            if (result[0].IsInformed == "False") {
                                radioButtonValue = 0;
                            } else if (result[0].IsInformed == "True") {
                                radioButtonValue = 1;
                            } else {
                                radioButtonValue = 2;
                            }

                            $("input[name='UI'][value='" + radioButtonValue + "']").attr('checked', true);
                        }

                    },
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false,
                    sync: false
                });



            }
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        sync: false
    });

    $('#divjointVisit').jqm({ modal: true, toTop: true });
    $('#divjointVisit').jqm();
    $('#divjointVisit').jqmShow();
}

function saveJVofZSM() {


    var hdnVal = $("#hdnPlanInfo").val();
    var planid = hdnVal.split('-')[0].split(':')[1];
    var mioEmployeeid = hdnVal.split('-')[1].split(':')[1];
    var doctorid = hdnVal.split('-')[2].split(':')[1];
    var zsMid = hdnVal.split('-')[3].split(':')[1];
    var isInformed = $("input[name=UI]:checked").val();
    var isCoaching;
    if (isInformed == "0") {
        isInformed = 0;
        isCoaching = 0;
    } else if (isInformed == "1") {
        isInformed = 1;
        isCoaching = 0;
    } else {
        isInformed = 0;
        isCoaching = 1;
    }
    var day = hdnVal.split('-')[4].split(':')[1];
    var ddate = hdnVal.split('-')[5].split(':')[1];

    myData = "{'mioPlanningId':'" + planid + "','mioEmployeeId':'" + mioEmployeeid + "','zsmEmployeeId':'" + zsMid + "','isInformed':'" + isInformed + "','isCoaching':'" + isCoaching + "','doctorId':'" + doctorid + "','day':'" + day + "','ddate':'" + ddate + "' }";
    $.ajax({
        type: "POST",
        url: "MioPlanning.asmx/SaveJVfromZsm",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        success: function (data) {
            if (data.d != '') {
                var result = data.d;
                if (result == 'Record Saved') {
                    alert("Joint Visit Saved");
                    $('#divjointVisit').jqmHide();

                } else {
                    alert("Error In Saving Record");
                }
            }
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        sync: false
    });
}


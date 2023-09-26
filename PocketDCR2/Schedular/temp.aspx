<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="temp.aspx.cs" Inherits="PocketDCR2.Schedular.temp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    // Creates the Calendar for the selected MIO
        function CreateCalendarforMIO(employeeid, activityid) {
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var eclick = true;

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
                editable: true,
                allDaySlot: false,

                events: function (start, end, callback) {
                    $('#lblStatusCaption').html('Selected MIO Plan Status');
                    $('#spanStatus').html('');
                    $('#labelStatusColor').attr("class", "red1");
                    $('#txtmainComments').val('');

                    if ($('#calendar').fullCalendar('getView').name == 'month') {

                        var initialdate = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                        if (activityid == 0) {
                            var url = 'nsmhandler.ashx?method=geteventssummary&mioid=' + employeeid + '&initial=' + initialdate;
                        }
                        else {
                            var url = 'nsmhandler.ashx?method=geteventssummarybyactivityid&mioid=' + employeeid + '&actid=' + activityid + '&initial=' + initialdate;
                        }

                        GetResponse(url, function (e) {
                            if (e.Success) {
                                var commaSplit = e.Response.split(',');
                                rowCount = commaSplit.length; // total count of records returned
                                var i = 0;
                                var events = [];

                                while (rowCount > 0) {

                                    if (commaSplit[i].split(';')[6] != '') {
                                        $('#spanStatus').html(commaSplit[i].split(';')[6]);
                                        $('#labelStatusColor').attr("class", commaSplit[i].split(';')[7]);
                                        $('#labelStatusColor').attr("style", "height:23;");
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
                        });
                    }
                    else if ($('#calendar').fullCalendar('getView').name == 'agendaDay') {
                        var initialdate = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                        if (activityid == 0) {
                            url = 'nsmhandler.ashx?method=getevents&mioid=' + employeeid + '&initial=' + initialdate;
                        }
                        else {
                            url = 'nsmhandler.ashx?method=geteventsbyactivityid&mioid=' + employeeid + '&actid=' + activityid + '&initial=' + initialdate;
                        }
                        GetResponse(url, function (e) {
                            if (e.Success) {
                                var dollarsplit = e.Response.split('$');
                                var commaSplit = dollarsplit[0].split(',');
                                rowCount = commaSplit.length; // total count of records returned
                                var i = 0;
                                var events = [];
                                while (rowCount > 0) {
                                    if (commaSplit[i].split(';')[15] != '') {
                                        $('#spanStatus').html(commaSplit[i].split(';')[15]);
                                        $('#labelStatusColor').attr("class", commaSplit[i].split(';')[16]);
                                        $('#labelStatusColor').attr("style", "height:23;");
                                    }                                    
                                    events.push({
                                        id: commaSplit[i].split(';')[4],
                                        title: commaSplit[i].split(';')[0],
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
                                        divid: 'mainday',
                                        allDay: false
                                        // will be parsed
                                    });
                                    i++;
                                    rowCount--;
                                }
                                callback(events);
                                calendar.fullCalendar('renderEvent', events, true); // make the event "stick"
                            }
                            else {
                            }
                        });
                    }
                    else {
                        var initialdate = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                        if (activityid == 0) {
                            url = 'nsmhandler.ashx?method=getevents&mioid=' + employeeid + '&initial=' + initialdate;
                        }
                        else {
                            url = 'nsmhandler.ashx?method=geteventsbyactivityid&mioid=' + employeeid + '&actid=' + activityid + '&initial=' + initialdate;
                        }
                        GetResponse(url, function (e) {
                            if (e.Success) {
                                var dollarsplit = e.Response.split('$');
                                var commaSplit = dollarsplit[0].split(',');
                                rowCount = commaSplit.length; // total count of records returned
                                var i = 0;
                                var events = [];
                                while (rowCount > 0) {
                                    if (commaSplit[i].split(';')[15] != '') {
                                        $('#spanStatus').html(commaSplit[i].split(';')[15]);
                                        $('#labelStatusColor').attr("class", commaSplit[i].split(';')[16]);
                                        $('#labelStatusColor').attr("style", "height:23;");
                                    }                                    
                                    events.push({
                                        id: commaSplit[i].split(';')[4],
                                        title: commaSplit[i].split(';')[0],
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
                                        divid: 'mainweek',
                                        allDay: false
                                        // will be parsed
                                    });
                                    i++;
                                    rowCount--;
                                }
                                callback(events);
                                calendar.fullCalendar('renderEvent', events, true); // make the event "stick"
                            }
                            else {
                            }
                        });

                    }
                },
                timeFormat: 'HH:mm',
                eventClick: function (calEvent, jsEvent, view) {

                    if (eclick) {

                        if (view.name == 'month') {
                            var cp = $("#" + calEvent.id + calEvent.divid + "tcp");
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
                                        cp.append(semisplit[1] + "-" + semisplit[2]);
                                        cp.append("<br />");
                                    }

                                    //  calendar.fullCalendar('removeEvents', calEvent.id);
                                }
                                else {
                                }
                            });
                        }
                        else {
                            if (calEvent.status != 'Resubmitted') {
                                var id = $('a[name=modalZSM]').attr('href');
                                $("#stime").html($.fullCalendar.formatDate(calEvent.start, "MM dd yyyy HH:mm:ss"));
                                $("#etime").html($.fullCalendar.formatDate(calEvent.end, "MM dd yyyy HH:mm:ss"));
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
                                $(id).css('top', winH / 12 - $(id).height() / 12);
                                $(id).css('left', winW / 2 - $(id).width() / 2);
                                cnt.currentEvent = calEvent;
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
                                                var op = $("<option />").html(bmds[a].split(',')[2] + ' - ' + bmds[a].split(',')[1]).val(bmds[a].split(',')[0]);
                                                ddl.append(op);
                                            }
                                        }

                                        var url = 'zsmhandler.ashx?method=getbmdformio&mioid=' + calEvent.id;
                                        GetResponse(url, function (e) {
                                            if (e.Success) {
                                                if (e.Response != '') {
                                                    $("#ddlBMD").val(e.Response);
                                                }
                                            }
                                        });
                                    }
                                });
                                if (calEvent.title == 'BMD') {

                                    $('#divBMD').attr("style", "display:inline");
                                }
                                else {
                                    $('#divBMD').attr("style", "display:none");
                                }


                                $("#spanRejection").attr("style", "display:none;color:White");
                                $('#tableReject').attr("style", "display:none");
                                $("#btnAddRSM").attr("style", "display:none");
                                $('#btnAddZSM').attr("style", "display:none");
                                $('#btnAddRSMforMIO').attr("style", "display:inline");


                                //                        if (calEvent.status == "Resubmitted") {
                                //                            $("#txtRejectComments").val(calEvent.statusReason);
                                //                            $('#chkReject').attr('checked', 'checked');
                                //                        }
                                //else
                                {
                                    var url = 'nsmhandler.ashx?method=checknsm&mioid=' + calEvent.id + '&rejected=' + calEvent.status;
                                    GetResponse(url, function (e) {
                                        if (e.Success) {
                                            if (e.Response != '') {
                                                var semisplit = e.Response.split(';');
                                                $("#txtComments").val(semisplit[1]);
                                                if (semisplit[0] == "True") {
                                                    $('#rdInformed').attr('checked', 'checked');
                                                }
                                                else {
                                                    $('#rdUninformed').attr('checked', 'checked');
                                                }
                                            }
                                        }
                                    });
                                }
                                $(id).fadeIn();
                            }
                        }
                    }
                },

                eventMouseover: function (calEvent, jsEvent, view) {
                    // check to see if the plan is approved or rejected
                    if (calEvent.status != 'Rejected' && calEvent.status != 'Approved') {
                        //                        var cp = $("#" + calEvent.id + calEvent.divid + "tcp");
                        //                        cp.html('x');
                        //                        cp.click(function () {
                        //                            eclick = false;
                        //                            var url = 'zsmhandler.ashx?method=delevent&id=' + calEvent.id;
                        //                            GetResponse(url, function (e) {
                        //                                if (e.Success) {
                        //                                    calendar.fullCalendar('removeEvents', calEvent.id);
                        //                                }
                        //                                else {
                        //                                }
                        //                            });
                        //                            return;
                        //                        });

                    }
                    if (view.name != 'month') {

                        var editbox = $("#" + calEvent.id + calEvent.divid + "edit");
                        editbox.html('v');
                        editbox.click(function () {
                            eclick = false;
                            {
                                {
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
                                        $(id).css('top', winH / 12 - $(id).height() / 12);
                                        $(id).css('left', winW / 2 - $(id).width() / 2);

                                        var url = 'handler.ashx?method=getactivities';
                                        GetResponse(url, function (e) {

                                            if (e.Success) {
                                                PopulateActivitiesCombo(e.Response.split(';'), null, "ddlActivities", "True");
                                                $('#ddlActivities').val(calEvent.activityID);
                                            }
                                        });


                                        var url = 'zsmhandler.ashx?method=getdoctors&mioid=' + currentmioid;
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

                                        $(id).fadeIn();

                                        $('#dayCalender').html('');
                                        createCalendar(calEvent.start);
                                        $('#txtDescription').val(calEvent.description);
                                        $('#btnAdd').val('Update');
                                        cnt.currentEvent = calEvent;
                                    }
                                }
                            }
                        });
                    }
                },

                eventMouseout: function (calEvent, jsEvent, view) {
                    eclick = true;
                    var cp = $("#" + calEvent.id + calEvent.divid + "tcp");
                    var editbox = $("#" + calEvent.id + calEvent.divid + "edit");
                    cp.html('');
                    editbox.html('');
                    editbox.unbind('click');
                    cp.unbind('click');
                },
                cellDisplay: function (cell, date) {
                    var day = $.fullCalendar.formatDate(date, "MM dd yyyy HH:mm:ss");
                    var url = 'handler.ashx?method=checkholidays&initial=' + day;
                    GetResponse(url, function (e) {
                        if (e.Response == "present") {
                            $(cell).css({ background: 'pink' });
                        }

                        else {
                            $(cell).css({ background: 'white' });
                        }
                    });
                },

                dayClick: function (date, allDay, jsEvent, view) {


                    if (view.name == 'month') {
                        var day = $.fullCalendar.formatDate(date, "MM dd yyyy HH:mm:ss");
                        var url = 'handler.ashx?method=checkholidays&initial=' + day;
                        GetResponse(url, function (e) {
                            if (e.Response != "present") {
                                $(cell).css({ background: 'pink' });

                                $('#calendar').fullCalendar('changeView', 'agendaWeek');
                                $('#calendar').fullCalendar('gotoDate', date);
                                $('#calendar').fullCalendar('rerenderEvent');
                            }
                        });
                    }
                },
                disableResizing: true,
                disableDragging: true
            });


        }
    </div>
    </form>
</body>
</html>

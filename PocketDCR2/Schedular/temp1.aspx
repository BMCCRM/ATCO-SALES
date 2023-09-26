<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="temp1.aspx.cs" Inherits="PocketDCR2.Schedular.temp1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    function CreateCalendarforRSM(employeeid, actid) {
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var eclick = true;

            $('#btnReject').attr("style", "display:block");
            $('#btnApprove').attr("style", "display:block");
            $('#spantxtmainComments').attr('style', 'display:block');

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
                    
                    $('#lblStatusCaption').html('Selected RSM Plan Status');
                    $('#spanStatus').html('');
                    $('#labelStatusColor').attr("class", "red1");
                    $('#txtmainComments').val('');

                    var initialdate = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                    if (actid == 0) {
                        url = 'nsmhandler.ashx?method=getrsmevents&rsmid=' + employeeid + '&initial=' + initialdate;
                    }
                    else {
                        url = 'nsmhandler.ashx?method=getrsmeventsbyactivityid&rsmid=' + employeeid + '&actid=' + actid + '&initial=' + initialdate;
                    }
                    GetResponse(url, function (e) {
                        if (e.Success) {
                            var dollarSplit = e.Response.split('$');
                            var commaSplit = dollarSplit[0].split(',');
                            
                            rowCount = commaSplit.length; // total count of records returned
                            var i = 0;
                            var events = [];
                            while (rowCount > 0) {
                                if (commaSplit[i].split(';')[23] != '') {
                                    $('#spanStatus').html(commaSplit[i].split(';')[23]);
                                    $('#labelStatusColor').attr("class", commaSplit[i].split(';')[24]);
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
                                    rsmid: commaSplit[i].split(';')[15],
                                    rsmempid: commaSplit[i].split(';')[16],
                                    rsmdescription: commaSplit[i].split(';')[17],
                                    rsminformed: commaSplit[i].split(';')[18],
                                    rsmmonthid: commaSplit[i].split(';')[19],
                                    rsmplanstatus: commaSplit[i].split(';')[20],
                                    rsmreason: commaSplit[i].split(';')[21],
                                    rsmisedit: commaSplit[i].split(';')[22],
                                    divid: 'main',
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
                },
                timeFormat: 'HH:mm',
                eventClick: function (calEvent, jsEvent, view) {
                    if (eclick) {
                        if (calEvent.rsmplanstatus != 'Rejected') {
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

                            $("#spanRejection").attr("style", "display:none");
                            $('#tableReject').attr("style", "display:none");
                            $("#btnAddRSM").attr("style", "display:none");
                            $('#btnAddZSM').attr("style", "display:none");

                            $("#btnAddRSMforMIO").attr("style", "display:inline");

                            if (calEvent.zsmstatus == "Rejected") {
                                // $("#txtRejectComments").val(calEvent.zsmstatusreason);
                                // $('#chkReject').attr('checked', 'checked');
                                // checkreject = true;
                            }
                            else {
                                var url = 'nsmhandler.ashx?method=checknsm&mioid=' + calEvent.id + '&rejected=' + calEvent.rsmplanstatus;
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
                        else
                            alert("This activity has been rejected. Please Unreject to enter record");
                    }
                },

                eventMouseover: function (calEvent, jsEvent, view) {


                    var editbox = $("#" + calEvent.id + calEvent.divid + "edit");
                    editbox.html('e');
                    editbox.click(function () {
                        eclick = false;
                        {
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
                            cnt.currentEvent = calEvent;
                            if (calEvent.title == 'BMD') {

                                $('#divBMD').attr("style", "display:inline");
                            }
                            else {
                                $('#divBMD').attr("style", "display:none");
                            }
                            $("#spanRejection").attr("style", "display:inline;color:white");
                            $('#tableReject').attr("style", "display:inline");
                            $("#btnAddRSM").attr("style", "display:none");
                            $('#btnAddZSM').attr("style", "display:none");
                            $('#btnAddNSM').attr("style", "display:inline");

                            if (calEvent.rsmplanstatus == "Resubmitted") {
                                $("#txtRejectComments").val(calEvent.rsmreason);
                                $('#chkReject').attr('checked', 'checked');
                            }
                            else {
                                var url = 'rsmhandler.ashx?method=checkzsm&mioid=' + calEvent.id + '&rejected=' + calEvent.rsmplanstatus;
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
                    });

                    var cp = $("#" + calEvent.id + calEvent.divid + "tcp");
                    cp.html('x');
                    cp.click(function () {
                        eclick = false;
                        var url = 'rsmhandler.ashx?method=deleventbyrsmid&id=' + calEvent.rsmid;
                        GetResponse(url, function (e) {
                            if (e.Success) {
                                calendar.fullCalendar('removeEvents', calEvent.id);
                            }
                            else {
                            }
                        });
                        return;
                    });
                },

                eventMouseout: function (calEvent, jsEvent, view) {
                    eclick = true;
                    var cp = $("#" + calEvent.id + calEvent.divid + "tcp");
                    cp.html('');
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
                },
                disableResizing: true,
                disableDragging: true
            });
        }


        // If the Add/Edit button of RSM Event popup is Clicked
            $('#btnAddRSM').click(function () {                
                var informed = true;
                var rejected = checkreject;
                inform = document.getElementById('rdInformed');
                uninform = document.getElementById('rdUninformed');
                var rejectcomments = $("#txtRejectComments").val();
                var comments = $("#txtComments").val();
                var bmd = $('#ddlBMD').val();

                if (inform.checked) {
                    informed = true;
                }
                if (uninform.checked) {
                    informed = false;
                }                
                // inserting/editing ZSM event
                url = 'nsmhandler.ashx?method=insertrsmplan&mioid=' + cnt.currentEvent.id + '&monthid=' + cnt.currentEvent.monthID + '&rejected=' + rejected + '&rejectcomments=' + rejectcomments + '&comments=' + comments + '&date=' + dateofday + '&informed=' + informed + '&start=' + $.fullCalendar.formatDate(cnt.currentEvent.start, "MM dd yyyy HH:mm:ss") + '&end=' + $.fullCalendar.formatDate(cnt.currentEvent.end, "MM dd yyyy HH:mm:ss") + "&bmd=" + bmd + "&zsmmonthid=" + cnt.currentEvent.zsmmonthid;
                cnt.GetResponse(url, function (e) {

                    if (e.Success) { // if the current time slot of event is already booked by ZSM
                        if (e.Response == "notinrange") {
                            alert("Time Range already exists in your plan");
                        }
                        else if (e.Response == "updated") { // If Event is updated
                            cnt.currentEvent.zsmstatus = "Submitted";
                            cnt.currentEvent.zsmdescription = comments;
                            $('#calendar').fullCalendar('updateEvent', cnt.currentEvent);
                            alert("Record has been successfully updated");
                        }
                        else if (e.Response == "inserted") { // If the Event is inserted in ZSM plan
                            cnt.currentEvent.zsmstatus = "Submitted";
                            cnt.currentEvent.zsmdescription = comments;
                            $('#calendar').fullCalendar('updateEvent', cnt.currentEvent);
                            $('#calendar').fullCalendar('renderEvent', cnt.currentEvent, true);
                            ClearZSMFields();
                            alert("Record has been successfully inserted");
                        }
                        else if (e.Response == "rejected") { // if the ZSM rejects the current Event
                            $('#rdInformed').attr('checked', false);
                            $('#rdUninformed').attr('checked', false);
                            $("#txtComments").val('');
                            cnt.currentEvent.zsmstatus = "Resubmitted";
                            cnt.currentEvent.zsmstatusreason = rejectcomments;
                            if (Active == 'RSM') {
                                $('#calendar').fullCalendar('removeEvents', cnt.currentEvent.id);
                            }
                            $('#calendar').fullCalendar('renderEvent', cnt.currentEvent, true);
                            alert("Record has been Rejected");
                        }
                    }
                    else {
                    }
                    $('#ddlBMD').val(-1);
                });
            });


             // If the Add/Edit button of ZSM Event popup is Clicked
            $('#btnAddZSM').click(function () {
                alert('btnAddZSM');
                var informed = true;
                var rejected = checkreject;
                inform = document.getElementById('rdInformed');
                uninform = document.getElementById('rdUninformed');
                var rejectcomments = $("#txtRejectComments").val();
                var comments = $("#txtComments").val();
                var bmd = $('#ddlBMD').val();

                if (inform.checked) {
                    informed = true;
                }
                if (uninform.checked) {
                    informed = false;
                }
                // inserting/editing ZSM event
                url = 'rsmhandler.ashx?method=insertzsmplan&mioid=' + cnt.currentEvent.id + '&monthid=' + cnt.currentEvent.monthID + '&rejected=' + rejected + '&rejectcomments=' + rejectcomments + '&comments=' + comments + '&date=' + dateofday + '&informed=' + informed + '&start=' + $.fullCalendar.formatDate(cnt.currentEvent.start, "MM dd yyyy HH:mm:ss") + '&end=' + $.fullCalendar.formatDate(cnt.currentEvent.end, "MM dd yyyy HH:mm:ss") + "&bmd=" + bmd + "&zsmmonthid=" + cnt.currentEvent.zsmmonthid;
                cnt.GetResponse(url, function (e) {
                    if (e.Success) { // if the current time slot of event is already booked by ZSM
                        if (e.Response == "notinrange") {
                            alert("Time Range already exists in your plan");
                        }
                        else if (e.Response == "updated") { // If Event is updated
                            cnt.currentEvent.zsmstatus = "Submitted";
                            cnt.currentEvent.zsmdescription = comments;
                            $('#calendar').fullCalendar('updateEvent', cnt.currentEvent);
                            alert("Record has been successfully updated");
                        }
                        else if (e.Response == "inserted") { // If the Event is inserted in ZSM plan
                            cnt.currentEvent.zsmstatus = "Submitted";
                            cnt.currentEvent.zsmdescription = comments;
                            $('#calendar').fullCalendar('updateEvent', cnt.currentEvent);
                            $('#calendar').fullCalendar('renderEvent', cnt.currentEvent, true);
                            ClearZSMFields();
                            alert("Record has been successfully inserted");
                        }
                        else if (e.Response == "rejected") { // if the ZSM rejects the current Event
                            $('#rdInformed').attr('checked', false);
                            $('#rdUninformed').attr('checked', false);
                            $("#txtComments").val('');
                            cnt.currentEvent.zsmstatus = "Resubmitted";
                            cnt.currentEvent.zsmstatusReason = rejectcomments;
                            $('#calendar').fullCalendar('updateEvent', cnt.currentEvent);
                            $('#calendar').fullCalendar('renderEvent', cnt.currentEvent, true);
                            alert("Record has been Rejected");
                        }
                    }
                    else {
                    }
                    $('#ddlBMD').val(-1);
                });
            });

    </div>
    </form>
</body>
</html>

<%@ Page Title="NSM Scheduler" MasterPageFile="~/MasterPages/Home.master" Language="C#" AutoEventWireup="true" CodeBehind="NSM.aspx.cs" Inherits="PocketDCR2.Schedular.NSM" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <script src="jquery/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="jquery/jquery-ui-1.8.17.custom.min.js" type="text/javascript"></script>
    <script src="jquery/curvycorners.src.js" type="text/javascript"></script>
    <script src="fullcalendar/AJAXRequest.js" type="text/javascript"></script>
    <script src="fullcalendar/fullcalendar.js" type="text/javascript"></script>
    <link rel='stylesheet' type='text/css' href='fullcalendar/fullcalendar.css' />
    <link rel='stylesheet' type='text/css' href='fullcalendar/fullcalendar.print.css' media='print' />
    <link href="Styles/LayOut.css" rel="stylesheet" type="text/css" />

    <link rel="stylesheet" href="jquery/tingle.min.css" />
    <script type="text/javascript" src="jquery/tingle.min.js"></script>




    <script type='text/javascript'>
        var cnt = this; // Reference variable for top level 
        var temp = [];
        var currentEvent = []; // Represents the current Event selected
        var dateofday = ''; // Represents the Current Date selected
        var month = ''; // Represents the Current Month selected
        var currentmioid = ''; // Represents the Current MIO selected
        var currentzsmid = ''; // Represents the Current ZSM selected
        var currentrsmid = ''; // Represents the Current RSM selected
        var currentnsmid = ''; // Represents the Current NSM selected
        var checkreject = false; // Checks to see if the Event is rejected by ZSM
        var Active = ''; // check to see whether an MIO or a ZSM is selected

        // Generating and populating MIO's Table
        url = 'nsmhandler.ashx?method=getrsms';
        var mios;
        GetResponse(url, function (e) {
            if (e.Success) {
                tildesplit = e.Response.split("~");
                PopulateRSMorZSMorMIOCombo(tildesplit, null, "ddlRSM", "True");
            }
            else {
            }
        });

        // Generating and populating Activities Table
        url = 'zsmhandler.ashx?method=getactivities';
        var acts;
        GetResponse(url, function (e) {
            if (e.Success) {
                acts = e.Response.split(";");
                PopulateActivitiesCombo(acts, null, "ddlActivitiesMain", "True");
            }
            else {
            }
        });

        // Setting the Currently Logged in ZSM ID
        url = 'nsmhandler.ashx?method=getnsmid';
        var mios;
        GetResponse(url, function (e) {
            if (e.Success) {
                currentnsmid = e.Response;
            }
        });


        $(document).ready(function () {

            $('#labelStatusColor').attr("style", "height:23;");

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
                ClearZSMFields();
                $(this).hide();
                $('.window').hide();
            });

            // if My Plan of ZSM is clicked
            $('#divmyplan').click(function () {
                $("#btnPlanStatus").show();
                var actid = $("#ddlActivitiesMain option:selected").val();
                if (actid == -1) {
                    actid = 0;
                }

                $("#ddlRSM").val(-1);
                PopulateRSMorZSMorMIOCombo("", null, "ddlZSM", "True");
                PopulateRSMorZSMorMIOCombo("", null, "ddlMIO", "True");
                //PopulateRSMorZSMorMIOCombo("", null, "ddlRSM", "True");

                Active = 'NSM';
                $('#calendar').html('');
                CreateCalendarforNSM(currentnsmid, actid);
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
                box.css('top', winH / 2 - box.height() / 2);
                box.css('left', winW / 2 - box.width() / 2);
            });

            // Clears All the fields for Event Edit popup 
            function ClearAddFields() {
                $('#ddlActivities').val(-1);
                $('#ddlTimeStart').val(-1)
                $('#ddlTimeEnd').val(-1);
                $('#ddlDoctors').val(-1);
                $("#txtDescription").val('');
                //$("#btnAdd").val('Add');
            }

            // Clears All the fields for ZSM Event popup 
            function ClearZSMFields() {
                $('#chkReject').attr('checked', false);
                $('#rdInformed').attr('checked', false);
                $('#rdUninformed').attr('checked', false);
                $("#txtRejectComments").val('');
                $("#txtComments").val('');
            }

            // If the Send For Approval button is clicked
            //            $('#btnApproval').click(function () {
            //                url = 'zsmhandler.ashx?method=sendforapproval&date=' + $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss") + '&zsmid=' + currentrsmid;
            //                cnt.GetResponse(url, function (e) {
            //                    if (e.Success) {
            //                        window.location.reload(true);
            //                    }
            //                    else {
            //                    }
            //                });
            //            });

            $('#ddlActivitiesMain').change(function () {
                $('#calendar').html('');
                $("#btnPlanStatus").show();
                var actid = $("#ddlActivitiesMain option:selected").val();
                if (actid == -1) {
                    actid = 0;
                }
                if (Active == 'MIO') { // if the currently selected employee is MIO                    
                    CreateCalendarforMIO(currentmioid, actid);
                }
                else if (Active == 'ZSM') { // if the currently selected employee is ZSM (My Plan)                    
                    CreateCalendarforZSM(currentzsmid, actid);
                }
                else if (Active == 'RSM') { // if the currently selected employee isRSM (My Plan)                    
                    CreateCalendarforRSM(currentrsmid, actid);
                }
                else if (Active == 'NSM') { // if the currently selected employee is NSM (My Plan)                    
                    CreateCalendarforNSM(currentnsmid, actid);
                }
            });

            $('#ddlRSM').change(function () {
                debugger;
                var actid = $("#ddlActivitiesMain option:selected").val();
                if (actid == -1) {
                    actid = 0;
                }

                var rsmid = $("#ddlRSM option:selected").val();
                currentrsmid = rsmid;  // Setting the Current RSM selected

                url = 'nsmhandler.ashx?method=setrsmid&rsmid=' + currentrsmid;
                GetResponse(url, function (e) {
                    if (e.Success) {

                    }
                });

                Active = 'RSM';  // Setting the currently selected employed with type MIO
                $('#calendar').html('');  // flushing the Calendar                
                if (rsmid != -1) {
                    CreateCalendarforRSM(rsmid, actid);   // Creating the Calendar for selected MIO
                }

                url = 'nsmhandler.ashx?method=getzsms&rsmid=' + rsmid;
                GetResponse(url, function (e) {
                    if (e.Success) {
                        tildasplit = e.Response.split("~");
                        PopulateRSMorZSMorMIOCombo(tildasplit, null, "ddlZSM", "True");
                    }
                    else {
                    }
                });

            });

            $('#ddlZSM').change(function () {
              
                var actid = $("#ddlActivitiesMain option:selected").val();
                if (actid == -1) {
                    actid = 0;
                }

                var rsmid = $("#ddlRSM option:selected").val();
                var zsmid = $("#ddlZSM option:selected").val();

                currentzsmid = zsmid;  // Setting the Current MIO selected
                url = 'rsmhandler.ashx?method=setzsmid&zsmid=' + zsmid;
                GetResponse(url, function (e) {
                    if (e.Success) {

                    }
                });

                Active = 'ZSM';  // Setting the currently selected employed with type MIO
                $('#calendar').html('');  // flushing the Calendar                
                if (zsmid != -1) {
                    CreateCalendarforZSM(zsmid, actid);   // Creating the Calendar for selected MIO
                }
                else {
                    CreateCalendarforRSM(rsmid, actid);
                }

                url = 'nsmhandler.ashx?method=getmios&zsmid=' + zsmid;
                GetResponse(url, function (e) {
                    if (e.Success) {
                        semisplit = e.Response.split(";");
                        PopulateRSMorZSMorMIOCombo(semisplit, null, "ddlMIO", "True");
                    }
                    else {
                    }
                });

            });

            $('#ddlMIO').change(function () {

                var actid = $("#ddlActivitiesMain option:selected").val();
                if (actid == -1) {
                    actid = 0;
                }

                var zsmid = $("#ddlZSM option:selected").val();
                var mioid = $("#ddlMIO option:selected").val();

                url = 'rsmhandler.ashx?method=setzsmid&zsmid=' + zsmid;
                GetResponse(url, function (e) {
                    if (e.Success) {

                    }
                });

                currentmioid = mioid;  // Setting the Current MIO selected
                Active = 'MIO';  // Setting the currently selected employed with type MIO
                $('#calendar').html('');  // flushing the Calendar                
                if (mioid != -1) {
                    CreateCalendarforMIO(mioid, actid);   // Creating the Calendar for selected MIO
                }
                else {
                    CreateCalendarforZSM(zsmid, actid);
                }

            });

            // If the Approve button is clicked
            $('#btnApprove').click(function () {
                if ($('#spanStatus').html() == "Submitted" || $('#spanStatus').html() == "Resubmitted" || $('#spanStatus').html() == "Draft" || $('#spanStatus').html() == "Rejected") {
                    var r = confirm("Are you sure you want to approve the plan ?");
                    if (r == true) {
                        url = 'nsmhandler.ashx?method=approversmplan&date=' + $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss") + '&rsmid=' + currentrsmid;
                        cnt.GetResponse(url, function(e) {
                            if (e.Success) {
                                alert("Plan Approved");
                                window.location.reload(true);
                            } else {
                            }
                        });
                    }
                }
                else {
                    alert("You can not approve this plan");
                }
            });

            // If the Reject button is clicked
            $('#btnReject').click(function () {
                if (Active == 'MIO') { // if the currently selected employee is MIO                    
                    if ($('#spanStatus').html() == "Approved" || $('#spanStatus').html() == "Submitted" || $('#spanStatus').html() == "Resubmitted" || $('#spanStatus').html() == "Draft") {
                        var txtmaincomments = $('#txtmainComments').val();
                        if (txtmaincomments == '') {
                            alert("Please write comments for rejection");
                        }
                        else {
                            var a = confirm('Are you sure to reject the approved SPO/TM/STM plan');
                            if (a == true) {
                                url = 'zsmhandler.ashx?method=rejectrsmplan&date=' + $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss") + '&mioid=' + currentmioid + '&comments=' + txtmaincomments;
                                cnt.GetResponse(url, function (e) {
                                    if (e.Success) {
                                        alert("Plan Rejected");
                                        window.location.reload(true);
                                    }
                                });
                            }
                        }
                    }
                    else {
                        alert('SPO/TM/STM plan is not approved');
                    }
                }
                else if (Active == 'AM') {
                    if ($('#spanStatus').html() == "Approved" || $('#spanStatus').html() == "Submitted" || $('#spanStatus').html() == "Resubmitted" || $('#spanStatus').html() == "Draft") {
                        var txtmaincomments = $('#txtmainComments').val();
                        if (txtmaincomments == '') {
                            alert("Please write comments for rejection");
                        }
                        else {
                            var a = confirm('Are you sure to reject the approved AM plan');
                            if (a == true) {
                                url = 'rsmhandler.ashx?method=rejectzsmplan&date=' + $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss") + '&zsmid=' + currentzsmid + '&comments=' + txtmaincomments;
                                cnt.GetResponse(url, function (e) {
                                    if (e.Success) {
                                        alert("Plan Rejected");
                                        window.location.reload(true);
                                    }
                                });
                            }
                        }
                    }
                    else {
                        alert('AM plan is not approved');
                    }
                }
                else if (Active == 'RSM') { // if the currently selected employee isRSM (My Plan)                    
                    if ($('#spanStatus').html() == "Submitted" || $('#spanStatus').html() == "Resubmitted") {
                        var txtmaincomments = $('#txtmainComments').val();
                        if (txtmaincomments == '') {
                            alert("Please write comments for rejection");
                        }
                        else {
                            url = 'nsmhandler.ashx?method=rejectrsmplan&date=' + $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss") + '&rsmid=' + currentrsmid + '&comments=' + txtmaincomments;
                            cnt.GetResponse(url, function (e) {
                                if (e.Success) {
                                    window.location.reload(true);
                                }
                                else {
                                }

                            });
                        }
                    }
                    else if ($('#spanStatus').html() == "Rejected") {
                        alert("You already rejected this plan");
                    }
                    else if ($('#spanStatus').html() == "Approved") {
                        var txtmaincomments = $('#txtmainComments').val();
                        if (txtmaincomments == '') {
                            alert("Please write comments for rejection");
                        }
                        else {
                            var a = confirm('Are you sure to reject the approved AM plan');
                            if (a == true) {
                                url = 'nsmhandler.ashx?method=rejectrsmplan&date=' + $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss") + '&rsmid=' + currentrsmid + '&comments=' + txtmaincomments;
                                cnt.GetResponse(url, function (e) {
                                    if (e.Success) {
                                        window.location.reload(true);
                                    }
                                    else {
                                    }

                                });
                            }
                        }
                    }
                    else {
                        alert("You can not reject this plan");
                    }
                }

            });

            // if the Reset button is pressed (Clears all Edit Fields)
            $('#btnReset').click(function () {
                ClearAddFields();
            });


            $('#btnPlanStatus').click(function () {

                var empId;
                if (Active == "MIO") url = 'handler.ashx?method=checkCurrentPlanStatus&empId=' + currentmioid;
                else if (Active == "ZSM") url = 'handler.ashx?method=checkCurrentPlanStatus&empId=' + currentzsmid;
                else if (Active == "RSM") url = 'handler.ashx?method=checkCurrentPlanStatus&empId=' + currentrsmid;
                else url = 'handler.ashx?method=checkCurrentPlanStatus&empId=' +currentnsmid;
                var modal = new tingle.modal({
                    footer: true,
                    stickyFooter: false,
                    closeMethods: ['overlay', 'button', 'escape'],
                    closeLabel: "Close"

                });

                modal.setContent('<h1>Please Wait While Data Is Being Fetched...</h1>');

                modal.addFooterBtn('Close', 'tingle-btn tingle-btn--primary', function () {
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
                alert(cnt.currentEvent.zsmmonthid);
                // inserting/editing ZSM event
                url = 'nsmhandler.ashx?method=editrsmplan&mioid=' + cnt.currentEvent.id + '&monthid=' + cnt.currentEvent.monthID + '&rejected=' + rejected + '&rejectcomments=' + rejectcomments + '&comments=' + comments + '&date=' + dateofday + '&informed=' + informed + '&start=' + $.fullCalendar.formatDate(cnt.currentEvent.start, "MM dd yyyy HH:mm:ss") + '&end=' + $.fullCalendar.formatDate(cnt.currentEvent.end, "MM dd yyyy HH:mm:ss") + "&bmd=" + bmd + "&rsmmonthid=" + cnt.currentEvent.rsmmonthid;
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
                            cnt.currentEvent.zsmstatus = "Rejected";
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


            // If the Add/Edit button of RSM Event popup is Clicked from MIO
            $('#btnAddNSM').click(function () {
                var informed = true;
                //var rejected = checkreject;
                inform = document.getElementById('rdInformed');
                uninform = document.getElementById('rdUninformed');
                //var rejectcomments = $("#txtRejectComments").val();
                var comments = $("#txtComments").val();
                var bmd = $('#ddlBMD').val();

                if (inform.checked) {
                    informed = true;
                }
                if (uninform.checked) {
                    informed = false;
                }
                // inserting/editing ZSM event
                url = 'nsmhandler.ashx?method=insertnsmplanformio&mioid=' + cnt.currentEvent.id + '&monthid=' + cnt.currentEvent.monthID + '&comments=' + comments + '&date=' + dateofday + '&informed=' + informed + '&start=' + $.fullCalendar.formatDate(cnt.currentEvent.start, "MM dd yyyy HH:mm:ss") + '&end=' + $.fullCalendar.formatDate(cnt.currentEvent.end, "MM dd yyyy HH:mm:ss") + "&bmd=" + bmd;
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
                    }
                    else {
                    }
                    $('#ddlBMD').val(-1);
                });
            });
        });

        // Clears the fields
        function ClearAddFields() {
            $('#ddlActivities').val(-1);
            $('#ddlTimeStart').val(-1)
            $('#ddlTimeEnd').val(-1);
            $('#ddlDoctors').val(-1);
            $("#txtDescription").val('');
            $("#btnAdd").val('Add');
        }

        // Populates the Activities Combo box in edit Event popup
        PopulateActivitiesCombo = function (Activities, callBack, comboname, addselectoption) {
            var ddl = $("#" + comboname);
            ddl.children().remove();
            if (addselectoption == 'True') {
                ddl.append($("<option value='-1' />").html("Select"));
            }
            var N = Activities.length;
            for (var a = 0; a < N; a++) {
                if (Activities[a].length > 0) {
                    var op = $("<option />").html(Activities[a].split(',')[1]).val(Activities[a].split(',')[0]);
                    ddl.append(op);
                }
            }
            if (callBack != null)
                callBack();
        }

        // Populates the RSM / ZSM / MIO Combo box
        PopulateRSMorZSMorMIOCombo = function (list, callBack, comboname, addselectoption) {
            var ddl = $("#" + comboname);
            ddl.children().remove();
            if (addselectoption == 'True') {
                ddl.append($("<option value='-1' />").html("Select"));
            }
            var N = list.length;
            for (var a = 0; a < N; a++) {
                if (list[a].length > 0) {
                    var op = $("<option />").html(list[a].split(',')[2] + ' -' + list[a].split(',')[1]).val(list[a].split(',')[0]);
                    ddl.append(op);
                }                
            }
            if (callBack != null)
                callBack();
        }

        // Populates the Doctors Combo box in edit Event popup
        PopulateDoctorsCombo = function (Doctors, callBack) {
            var ddl = $("#" + "ddlDoctors");
            ddl.children().remove();
            ddl.append($("<option value='-1' />").html("Select"));
            var N = Doctors.length;
            for (var a = 0; a < N; a++) {
                var op = $("<option />").html(Doctors[a].split(',')[1]).val(Doctors[a].split(',')[0]);
                ddl.append(op);
            }
            if (callBack != null)
                callBack();
        }

        // Validates all the fields in Edit Event popup
        function ValidateFields() {
            if ($('#ddlTimeStart').val() == -1) {
                alert("Please Select Start Date");
                return false;
            }
            else if ($('#ddlTimeEnd').val() == -1) {
                alert("Please Select End Date");
                return false;
            }
            else if ($('#ddlDoctors').val() == -1) {
                alert("Please Select a Doctor");
                return false;
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

        // Creates the Calendar shown in Edit Event popup
        function createCalendar(date) {
            var eclick = true;
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
                    var url = 'nsmhandler.ashx?method=getevents&mioid=' + currentmioid + '&initial=' + initialdate;
                    GetResponse(url, function (e) {
                        if (e.Success) {
                            var commaSplit = e.Response.split(',');
                            rowCount = commaSplit.length; // total count of records returned
                            var i = 0;
                            var events = [];

                            while (rowCount > 0) {

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
                                    doctorname: commaSplit[i].split(';')[17],
                                    productsname: commaSplit[i].split(';')[18],
                                    remindersname: commaSplit[i].split(';')[19],
                                    classname: commaSplit[i].split(';')[20],
                                    brickname: commaSplit[i].split(';')[21],
                                    samplenameqty: commaSplit[i].split(';')[22],
                                    gifts: commaSplit[i].split(';')[23],
                                    divid: 'day',
                                    allDay: false
                                });

                                i++;
                                rowCount--;

                            }
                            callback(events);

                            daycalender.fullCalendar('renderEvent', events, true); // make the event "stick"
                        }
                    });
                },
                timeFormat: 'HH:mm',
                eventClick: function (calEvent, jsEvent, view) {
                    if (eclick) {

                        $('#lblDoctor').val(calEvent.doctorname);
                        $('#lblActivity').val(calEvent.title);
                        $('#lblDescription').val(calEvent.description);
                        $('#lblStartTime').val($.fullCalendar.formatDate(calEvent.start, "HH:mm"));
                        $('#lblEndTime').val($.fullCalendar.formatDate(calEvent.end, "HH:mm"));
                        $('#lblClass').val(calEvent.classname);
                        $('#lblBrick').val(calEvent.brickname);

                        //first empty the product and reminders textboxes
                        for (i = 0; i < 4; i++) {
                            $('#lblProduct' + i).val('');
                            $('#lblReminder' + i).val('');
                            $('#lblSample' + i).val('');
                            $('#lblQuantity' + i).val('');
                        }
                        $('#lblGift0').val('');
                        $('#lblGift1').val('');

                        astaricSplit = calEvent.productsname.split('*');
                        for (i = 0; i < astaricSplit.length; i++) {
                            $('#lblProduct' + i).val(astaricSplit[i]);
                        }
                        astaricSplit = calEvent.remindersname.split('*');
                        for (i = 0; i < astaricSplit.length; i++) {
                            $('#lblReminder' + i).val(astaricSplit[i]);
                        }
                        var sampleastricSplit = calEvent.samplenameqty.split('*');
                        for (j = 0; j < sampleastricSplit.length; j++) {
                            $("#lblSample" + j).val(sampleastricSplit[j].split('|')[0]);
                            $("#lblQuantity" + j).val(sampleastricSplit[j].split('|')[1]);
                        }

                        var giftastricSplit = calEvent.gifts.split('*');
                        for (j = 0; j < giftastricSplit.length; j++) {
                            $("#lblGift" + j).val(giftastricSplit[j]);
                        }
                        if (calEvent.status == 'Rejected') {
                            $('#ulRejectComments1').attr("style", "display:block");
                            $('#txtRejectComments1').val(calEvent.statusReason);
                        }
                        else {
                            $('#ulRejectComments1').attr("style", "display:none");
                            $('#txtRejectComments1').val('');
                        }
                        cnt.currentEvent = calEvent;
                    }
                },

                eventMouseover: function (calEvent, jsEvent, view) {
//                    var cp = $("#" + calEvent.id + calEvent.divid + "tcp");
//                    cp.html('x');
//                    cp.click(function () {
//                        eclick = false;
//                        var url = 'handler.ashx?method=delevent&id=' + calEvent.id;
//                        GetResponse(url, function (e) {
//                            if (e.Success) {
//                                daycalender.fullCalendar('removeEvents', calEvent.id);
//                                calendar.fullCalendar('removeEvents', calEvent.id); // make the event "stick"
//                            }
//                            else {
//                            }
//                        });
//                        return;
//                    });
                },
                eventMouseout: function (calEvent, jsEvent, view) {
//                    eclick = true;
//                    var cp = $("#" + calEvent.id + calEvent.divid + "tcp");
//                    cp.html('');
//                    cp.unbind('click');
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

        function CreateCalendarforMIO(employeeid, activityid) {
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var eclick = true;


            var url = 'handler.ashx?method=getcurrentemployee&empid=' + employeeid;
            GetResponse(url, function (e) {
                if (e.Success) {
                    $('#EmployeeName').html(e.Response); //+ " (SPO/TM/STM Plan)"
                }
            });

            $('#btnReject').attr("style", "display:block");
            $('#btnApprove').attr("style", "display:none");            
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
                height: 950,
                editable: true,
                allDaySlot: false,

                events: function (start, end, callback) {
                    $('#lblStatusCaption').html('Selected SPO/TM/STM Plan Status');
                    $('#spanStatus').html('');
                    $('#labelStatusColor').attr("class", "red1");

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
                                var dollarsplit = e.Response.split('$');
                                var commaSplit = dollarsplit[0].split(',');
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
                                        doctorname: commaSplit[i].split(';')[17],
                                        productsname: commaSplit[i].split(';')[18],
                                        remindersname: commaSplit[i].split(';')[19],
                                        classname: commaSplit[i].split(';')[20],
                                        brickname: commaSplit[i].split(';')[21],
                                        samplenameqty: commaSplit[i].split(';')[22],
                                        gifts: commaSplit[i].split(';')[23],
                                        nsmplanstatus: dollarsplit[1].split(';')[0],
                                        nsmisedit: dollarsplit[1].split(';')[2],
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
                                        doctorname: commaSplit[i].split(';')[17],
                                        productsname: commaSplit[i].split(';')[18],
                                        remindersname: commaSplit[i].split(';')[19],
                                        classname: commaSplit[i].split(';')[20],
                                        brickname: commaSplit[i].split(';')[21],
                                        samplenameqty: commaSplit[i].split(';')[22],
                                        gifts: commaSplit[i].split(';')[23],
                                        nsmplanstatus: dollarsplit[1].split(';')[0],
                                        nsmisedit: dollarsplit[1].split(';')[2],
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
                            //if (calEvent.status != 'Rejected') {
                            var id = $('a[name=modalZSM]').attr('href');
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
                            //                var op = $("<option />").html(bmds[a].split(',')[2] + ' - ' + bmds[a].split(',')[1]).val(bmds[a].split(',')[0]);
                            //                ddl.append(op);
                            //            }
                            //        }

                            //        var url = 'zsmhandler.ashx?method=getbmdformio&mioid=' + calEvent.id;
                            //        GetResponse(url, function (e) {
                            //            if (e.Success) {
                            //                if (e.Response != '') {
                            //                    $("#ddlBMD").val(e.Response);
                            //                }
                            //            }
                            //        });
                            //    }
                            //});
                            if (calEvent.title == 'BMD') {

                                $('#divBMD').attr("style", "display:inline");
                            }
                            else {
                                $('#divBMD').attr("style", "display:none");
                            }


                            $("#spanRejection").attr("style", "display:none;");
                            $('#tableReject').attr("style", "display:none");
                            $("#btnAddRSM").attr("style", "display:none");
                            if (calEvent.status == 'Rejected' || calEvent.nsmisedit == 'False') {
                                $('#btnAddNSM').attr("style", "display:none");
                            }
                            else {
                                $('#btnAddNSM').attr("style", "display:block");
                            }

                            //if (calEvent.status == "Rejected") {
                            //    $("#txtRejectComments").val(calEvent.statusReason);
                            //    $('#chkReject').attr('checked', 'checked');
                            //}
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

                            $('#lblDoctor1').val(calEvent.doctorname);
                            $('#lblActivity1').val(calEvent.title);
                            $('#lblDescription1').val(calEvent.description);
                            $('#lblStartTime1').val($.fullCalendar.formatDate(calEvent.start, "HH:mm"));
                            $('#lblEndTime1').val($.fullCalendar.formatDate(calEvent.end, "HH:mm"));
                            $('#lblClass1').val(calEvent.classname);
                            $('#lblBrick1').val(calEvent.brickname);

                            //first empty the product and reminders textboxes
                            for (i = 0; i < 4; i++) {
                                $('#lblProduct' + i + '1').val('');
                                $('#lblReminder' + i + '1').val('');
                                $('#lblSample' + i + '1').val('');
                                $('#lblQuantity' + i + '1').val('');
                            }

                            $('#lblGift01').val('');
                            $('#lblGift11').val('');
                            
                            astaricSplit = calEvent.productsname.split('*');
                            for (i = 0; i < astaricSplit.length; i++) {
                                $('#lblProduct' + i + '1').val(astaricSplit[i]);
                            }
                            astaricSplit = calEvent.remindersname.split('*');
                            for (i = 0; i < astaricSplit.length; i++) {
                                $('#lblReminder' + i + '1').val(astaricSplit[i]);
                            }
                            var sampleastricSplit = calEvent.samplenameqty.split('*');
                            for (j = 0; j < sampleastricSplit.length; j++) {
                                $("#lblSample" + j + '1').val(sampleastricSplit[j].split('|')[0]);
                                $("#lblQuantity" + j + '1').val(sampleastricSplit[j].split('|')[1]);
                            }

                            var giftastricSplit = calEvent.gifts.split('*');
                            for (j = 0; j < giftastricSplit.length; j++) {
                                $("#lblGift" + j + '1').val(giftastricSplit[j]);
                            }
                            $(id).fadeIn();
                            //}
                        }
                    }
                },

                eventMouseover: function (calEvent, jsEvent, view) {
                    if (view.name != 'month') {

                        var editbox = $("#" + calEvent.id + calEvent.divid + "edit");
                        editbox.html('<div style="float:right; cursor:pointer; padding-right:5px; padding-left:5px;"> V </div>');
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
                                        //$(id).css('top', winH / 12 - $(id).height() / 12);
                                        $(id).css('top', 0);
                                        $(id).css('left', winW / 2 - $(id).width() / 2);

                                        $('#lblDoctor').val(calEvent.doctorname);
                                        $('#lblActivity').val(calEvent.title);
                                        $('#lblDescription').val(calEvent.description);
                                        $('#lblStartTime').val($.fullCalendar.formatDate(calEvent.start, "HH:mm"));
                                        $('#lblEndTime').val($.fullCalendar.formatDate(calEvent.end, "HH:mm"));
                                        $('#lblClass').val(calEvent.classname);
                                        $('#lblBrick').val(calEvent.brickname);

                                        //first empty the product and reminders textboxes
                                        for (i = 0; i < 4; i++) {
                                            $('#lblProduct' + i).val('');
                                            $('#lblReminder' + i).val('');
                                            $('#lblSample' + i).val('');
                                            $('#lblQuantity' + i).val('');
                                        }
                                        $('#lblGift0').val('');
                                        $('#lblGift1').val('');

                                        astaricSplit = calEvent.productsname.split('*');
                                        for (i = 0; i < astaricSplit.length; i++) {
                                            $('#lblProduct' + i).val(astaricSplit[i]);
                                        }
                                        astaricSplit = calEvent.remindersname.split('*');
                                        for (i = 0; i < astaricSplit.length; i++) {
                                            $('#lblReminder' + i).val(astaricSplit[i]);
                                        }
                                        var sampleastricSplit = calEvent.samplenameqty.split('*');
                                        for (j = 0; j < sampleastricSplit.length; j++) {
                                            $("#lblSample" + j).val(sampleastricSplit[j].split('|')[0]);
                                            $("#lblQuantity" + j).val(sampleastricSplit[j].split('|')[1]);
                                        }

                                        var giftastricSplit = calEvent.gifts.split('*');
                                        for (j = 0; j < giftastricSplit.length; j++) {
                                            $("#lblGift" + j).val(giftastricSplit[j]);
                                        }

                                        if (calEvent.status == 'Rejected') {
                                            $('#ulRejectComments1').attr("style", "display:block");
                                            $('#txtRejectComments1').val(calEvent.statusReason);
                                        }
                                        else {
                                            $('#ulRejectComments1').attr("style", "display:none");
                                            $('#txtRejectComments1').val('');
                                        }

                                        $(id).fadeIn();

                                        $('#dayCalender').html('');
                                        createCalendar(calEvent.start);
                                        //$('#btnAdd').val('Update');
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
                dayClick: function (date, allDay, jsEvent, view) {

                    if (view.name == 'month') {
                        var day = $.fullCalendar.formatDate(date, "MM dd yyyy HH:mm:ss");
                        //var url = 'handler.ashx?method=checkholidays&initial=' + day;
                        //GetResponse(url, function (e) {
                        //    if (e.Response != "present") {
                        //        $('#calendar').fullCalendar('changeView', 'agendaWeek');
                        //        $('#calendar').fullCalendar('gotoDate', date);
                        //        $('#calendar').fullCalendar('rerenderEvent');
                        //    }
                        //});
                    }
                },
                disableResizing: true,
                disableDragging: true
            });


        }

        // Creates the Calendar for the selected ZSM
        function CreateCalendarforZSM(employeeid, actid) {
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var eclick = true;

            var url = 'handler.ashx?method=getcurrentemployee&empid=' + employeeid;
            GetResponse(url, function (e) {
                if (e.Success) {
                    $('#EmployeeName').html(e.Response); // + " (AM Plan)"
                }
            });

            $('#btnReject').attr("style", "display:block");
            $('#btnApprove').attr("style", "display:none");
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
                height: 950,
                editable: true,
                allDaySlot: false,

                events: function (start, end, callback) {
                    $('#lblStatusCaption').html('Selected AM Plan Status');
                    $('#spanStatus').html('');
                    $('#labelStatusColor').attr("class", "red1");
                    $('#txtmainComments').val('');
                    var initialdate = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                    if (actid == 0) {
                        url = 'nsmhandler.ashx?method=getzsmevents&zsmid=' + employeeid + '&initial=' + initialdate;
                    }
                    else {
                        url = 'nsmhandler.ashx?method=getzsmeventsbyactivityid&zsmid=' + employeeid + '&actid=' + actid + '&initial=' + initialdate;
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
                                    zsmid: commaSplit[i].split(';')[15],
                                    zsmempid: commaSplit[i].split(';')[16],
                                    zsmdescription: commaSplit[i].split(';')[17],
                                    zsminformed: commaSplit[i].split(';')[18],
                                    zsmmonthid: commaSplit[i].split(';')[19],
                                    zsmstatus: commaSplit[i].split(';')[20],
                                    zsmstatusreason: commaSplit[i].split(';')[21],
                                    zsmisedit: commaSplit[i].split(';')[22],
                                    doctorname: commaSplit[i].split(';')[25],
                                    productsname: commaSplit[i].split(';')[26],
                                    remindersname: commaSplit[i].split(';')[27],
                                    classname: commaSplit[i].split(';')[28],
                                    brickname: commaSplit[i].split(';')[29],
                                    samplenameqty: commaSplit[i].split(';')[30],
                                    gifts: commaSplit[i].split(';')[31],
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
                eventMouseover: function (calEvent, jsEvent, view) {
                    //if (eclick && calEvent.zsmisedit != 'False') {
                    if (eclick) {
                        var editbox = $("#" + calEvent.id + calEvent.divid + "edit");
                        editbox.html('<div style="float:right; cursor:pointer; padding-right:5px; padding-left:5px;"> V </div>');
                        editbox.click(function () {
                            eclick = false;
                            {

                                var id = $('a[name=modalZSM]').attr('href');

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
                                //                var op = $("<option />").html(bmds[a].split(',')[2] + ' - ' + bmds[a].split(',')[1]).val(bmds[a].split(',')[0]);
                                //                ddl.append(op);
                                //            }
                                //        }

                                //        var url = 'zsmhandler.ashx?method=getbmdformio&mioid=' + calEvent.id;
                                //        GetResponse(url, function (e) {
                                //            if (e.Success) {
                                //                if (e.Response != '') {
                                //                    $("#ddlBMD").val(e.Response);
                                //                }
                                //            }
                                //        });
                                //    }
                                //});
                                cnt.currentEvent = calEvent;
                                if (calEvent.title == 'BMD') {

                                    $('#divBMD').attr("style", "display:inline");
                                }
                                else {
                                    $('#divBMD').attr("style", "display:none");
                                }
                                $('#spanRejection').attr("style", "display:block;");
                                $('#tableReject').attr("style", "display:block;");
                                $("#btnAddRSM").attr("style", "display:none");
                                $("#btnAddNSM").attr("style", "display:none");
                                

                                //alert(calEvent.zsmstatus);
                                if (calEvent.zsmstatus == "Rejected") {
                                    x = document.getElementById('txtRejectComments');
                                    x.disabled = false;
                                    $("#txtRejectComments").val(calEvent.zsmstatusreason);
                                    $('#chkReject').attr('checked', 'checked');
                                    checkreject = true;
                                }
                                //  else
                                {
                                    var url = 'zsmhandler.ashx?method=checkzsm&mioid=' + calEvent.id + '&rejected=' + calEvent.status;
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
                                $('#lblDoctor1').val(calEvent.doctorname);
                                $('#lblActivity1').val(calEvent.title);
                                $('#lblDescription1').val(calEvent.description);
                                $('#lblStartTime1').val($.fullCalendar.formatDate(calEvent.start, "HH:mm"));
                                $('#lblEndTime1').val($.fullCalendar.formatDate(calEvent.end, "HH:mm"));
                                $('#lblClass1').val(calEvent.classname);
                                $('#lblBrick1').val(calEvent.brickname);

                                //first empty the product and reminders textboxes
                                for (i = 0; i < 4; i++) {
                                    $('#lblProduct' + i + '1').val('');
                                    $('#lblReminder' + i + '1').val('');
                                    $('#lblSample' + i + '1').val('');
                                    $('#lblQuantity' + i + '1').val('');
                                }
                                $('#lblGift01').val('');
                                $('#lblGift11').val('');
                                astaricSplit = calEvent.productsname.split('*');
                                for (i = 0; i < astaricSplit.length; i++) {
                                    $('#lblProduct' + i + '1').val(astaricSplit[i]);
                                }
                                astaricSplit = calEvent.remindersname.split('*');
                                for (i = 0; i < astaricSplit.length; i++) {
                                    $('#lblReminder' + i + '1').val(astaricSplit[i]);
                                }
                                var sampleastricSplit = calEvent.samplenameqty.split('*');
                                for (j = 0; j < sampleastricSplit.length; j++) {
                                    $("#lblSample" + j + '1').val(sampleastricSplit[j].split('|')[0]);
                                    $("#lblQuantity" + j + '1').val(sampleastricSplit[j].split('|')[1]);
                                }

                                var giftastricSplit = calEvent.gifts.split('*');
                                for (j = 0; j < giftastricSplit.length; j++) {
                                    $("#lblGift" + j + '1').val(giftastricSplit[j]);
                                }
                                $(id).fadeIn();
                            }
                        });                       
                    }
                },

                eventMouseout: function (calEvent, jsEvent, view) {
                    eclick = true;
                    var cp = $("#" + calEvent.id + calEvent.divid + "tcp");
                    var editbox = $("#" + calEvent.id + calEvent.divid + "edit");
                    editbox.html('');
                    editbox.unbind('click');
                    cp.html('');
                    cp.unbind('click');
                },
                eventClick: function (calEvent, jsEvent, view) {
                    if (eclick) {
                        //if (calEvent.zsmstatus != "Rejected") {
                            {
                                var id = $('a[name=modalZSM]').attr('href');

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
                                //                var op = $("<option />").html(bmds[a].split(',')[2] + ' - ' + bmds[a].split(',')[1]).val(bmds[a].split(',')[0]);
                                //                ddl.append(op);
                                //            }
                                //        }

                                //        var url = 'zsmhandler.ashx?method=getbmdformio&mioid=' + calEvent.id;
                                //        GetResponse(url, function (e) {
                                //            if (e.Success) {
                                //                if (e.Response != '') {
                                //                    $("#ddlBMD").val(e.Response);
                                //                }
                                //            }
                                //        });
                                //    }
                                //});
                                if (calEvent.title == 'BMD') {

                                    $('#divBMD').attr("style", "display:inline");
                                }
                                else {
                                    $('#divBMD').attr("style", "display:none");
                                }

                                $("#spanRejection").attr("style", "display:none;");
                                $('#tableReject').attr("style", "display:none");
                                $("#btnAddRSM").attr("style", "display:none");
                                $('#btnAddNSM').attr("style", "display:none");
                                
                                //                                if (calEvent.zsmstatus == "Resubmitted") {
                                //                                    $("#txtRejectComments").val(calEvent.zsmstatusreason);
                                //                                    $('#chkReject').attr('checked', 'checked');
                                //                                    checkreject = true;
                                //                                }
                                //else 
                                {
                                    var url = 'nsmhandler.ashx?method=checknsm&mioid=' + calEvent.id + '&rejected=' + calEvent.zsmstatus;
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
                        //}
                        //else
                        //    alert("This Activity has been rejected by you. Please unreject to add your plan");
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
                dayClick: function (date, allDay, jsEvent, view) {
                },
                disableResizing: true,
                disableDragging: true
            });
        }



        // Creates the Calendar for the selected RSM
        function CreateCalendarforRSM(employeeid, actid) {
            
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var eclick = true;

            var url = 'handler.ashx?method=getcurrentemployee&empid=' + employeeid;
            GetResponse(url, function (e) {
                if (e.Success) {
                    $('#EmployeeName').html(e.Response); //+ " (SM Plan)"
                }
            });

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
                height: 950,
                editable: true,
                allDaySlot: false,

                events: function (start, end, callback) {

                    $('#lblStatusCaption').html('Selected SM Plan Status');
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
                                    doctorname: commaSplit[i].split(';')[25],
                                    productsname: commaSplit[i].split(';')[26],
                                    remindersname: commaSplit[i].split(';')[27],
                                    classname: commaSplit[i].split(';')[28],
                                    brickname: commaSplit[i].split(';')[29],
                                    samplenameqty: commaSplit[i].split(';')[30],
                                    gifts: commaSplit[i].split(';')[31],
                                    nsmplanstatus: dollarSplit[1].split(';')[0],
                                    nsmisedit: dollarSplit[1].split(';')[2],
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
                        //if (calEvent.rsmplanstatus != 'Rejected') {
                        var id = $('a[name=modalZSM]').attr('href');
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
                        $(id).css('top', 0);
                        $(id).css('left', winW / 2 - $(id).width() / 2);
                        cnt.currentEvent = calEvent;
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
                        //                var op = $("<option />").html(bmds[a].split(',')[2] + ' - ' + bmds[a].split(',')[1]).val(bmds[a].split(',')[0]);
                        //                ddl.append(op);
                        //            }
                        //        }

                        //        var url = 'zsmhandler.ashx?method=getbmdformio&mioid=' + calEvent.id;
                        //        GetResponse(url, function (e) {
                        //            if (e.Success) {
                        //                if (e.Response != '') {
                        //                    $("#ddlBMD").val(e.Response);
                        //                }
                        //            }
                        //        });
                        //    }
                        //});
                        if (calEvent.title == 'BMD') {

                            $('#divBMD').attr("style", "display:inline");
                        }
                        else {
                            $('#divBMD').attr("style", "display:none");
                        }

                        $("#spanRejection").attr("style", "display:none");
                        $('#tableReject').attr("style", "display:none");
                        $("#btnAddRSM").attr("style", "display:none");
                        if (calEvent.rsmplanstatus == 'Rejected' || calEvent.nsmisedit == 'False') {
                            $("#btnAddNSM").attr("style", "display:none");
                        }
                        else {
                            $("#btnAddNSM").attr("style", "display:block");
                        }

                        if (calEvent.rsmplanstatus == "Rejected") {
                            // $("#txtRejectComments").val(calEvent.zsmstatusreason);
                            // $('#chkReject').attr('checked', 'checked');
                            // checkreject = true;
                        }
                        //else {
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
                        //}
                        $('#lblDoctor1').val(calEvent.doctorname);
                        $('#lblActivity1').val(calEvent.title);
                        $('#lblDescription1').val(calEvent.description);
                        $('#lblStartTime1').val($.fullCalendar.formatDate(calEvent.start, "HH:mm"));
                        $('#lblEndTime1').val($.fullCalendar.formatDate(calEvent.end, "HH:mm"));
                        $('#lblClass1').val(calEvent.classname);
                        $('#lblBrick1').val(calEvent.brickname);

                        //first empty the product and reminders textboxes
                        for (i = 0; i < 4; i++) {
                            $('#lblProduct' + i + '1').val('');
                            $('#lblReminder' + i + '1').val('');
                            $('#lblSample' + i + '1').val('');
                            $('#lblQuantity' + i + '1').val('');
                        }
                        $('#lblGift01').val('');
                        $('#lblGift11').val('');
                        
                        astaricSplit = calEvent.productsname.split('*');
                        for (i = 0; i < astaricSplit.length; i++) {
                            $('#lblProduct' + i + '1').val(astaricSplit[i]);
                        }
                        astaricSplit = calEvent.remindersname.split('*');
                        for (i = 0; i < astaricSplit.length; i++) {
                            $('#lblReminder' + i + '1').val(astaricSplit[i]);
                        }
                        var sampleastricSplit = calEvent.samplenameqty.split('*');
                        for (j = 0; j < sampleastricSplit.length; j++) {
                            $("#lblSample" + j + '1').val(sampleastricSplit[j].split('|')[0]);
                            $("#lblQuantity" + j + '1').val(sampleastricSplit[j].split('|')[1]);
                        }

                        var giftastricSplit = calEvent.gifts.split('*');
                        for (j = 0; j < giftastricSplit.length; j++) {
                            $("#lblGift" + j + '1').val(giftastricSplit[j]);
                        }
                        $(id).fadeIn();
                        //}
                        //else
                        //    alert("This activity has been rejected. Please Unreject to enter record");
                    }
                },

                eventMouseover: function (calEvent, jsEvent, view) {
                    var editbox = $("#" + calEvent.id + calEvent.divid + "edit");
                    editbox.html('<div style="float:right; cursor:pointer; padding-right:5px; padding-left:5px;"> E </div>');
                    editbox.click(function () {
                        eclick = false;
                        {
                            var id = $('a[name=modalZSM]').attr('href');

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
                            //                var op = $("<option />").html(bmds[a].split(',')[2] + ' - ' + bmds[a].split(',')[1]).val(bmds[a].split(',')[0]);
                            //                ddl.append(op);
                            //            }
                            //        }

                            //        var url = 'zsmhandler.ashx?method=getbmdformio&mioid=' + calEvent.id;
                            //        GetResponse(url, function (e) {
                            //            if (e.Success) {
                            //                if (e.Response != '') {
                            //                    $("#ddlBMD").val(e.Response);
                            //                }
                            //            }
                            //        });
                            //    }
                            //});
                            cnt.currentEvent = calEvent;
                            if (calEvent.title == 'BMD') {

                                $('#divBMD').attr("style", "display:inline");
                            }
                            else {
                                $('#divBMD').attr("style", "display:none");
                            }
                            
                            $("#spanRejection").attr("style", "display:block");
                            $('#tableReject').attr("style", "display:block");
                            $("#btnAddNSM").attr("style", "display:none");
                            if (calEvent.rsmplanstatus == 'Rejected') {
                                $("#btnAddRSM").attr("style", "display:none");
                            }
                            else {
                                $("#btnAddRSM").attr("style", "display:block");
                            }


                            if (calEvent.rsmplanstatus == "Rejected") {
                                $("#txtRejectComments").val(calEvent.rsmreason);
                                $('#chkReject').attr('checked', 'checked');
                            }
                            //else {
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
                            //}
                            $('#lblDoctor1').val(calEvent.doctorname);
                            $('#lblActivity1').val(calEvent.title);
                            $('#lblDescription1').val(calEvent.description);
                            $('#lblStartTime1').val($.fullCalendar.formatDate(calEvent.start, "HH:mm"));
                            $('#lblEndTime1').val($.fullCalendar.formatDate(calEvent.end, "HH:mm"));
                            $('#lblClass1').val(calEvent.classname);
                            $('#lblBrick1').val(calEvent.brickname);

                            //first empty the product and reminders textboxes
                            for (i = 0; i < 4; i++) {
                                $('#lblProduct' + i + '1').val('');
                                $('#lblReminder' + i + '1').val('');
                                $('#lblSample' + i + '1').val('');
                                $('#lblQuantity' + i + '1').val('');
                            }
                            $('#lblGift01').val('');
                            $('#lblGift11').val('');

                            astaricSplit = calEvent.productsname.split('*');
                            for (i = 0; i < astaricSplit.length; i++) {
                                $('#lblProduct' + i + '1').val(astaricSplit[i]);
                            }
                            astaricSplit = calEvent.remindersname.split('*');
                            for (i = 0; i < astaricSplit.length; i++) {
                                $('#lblReminder' + i + '1').val(astaricSplit[i]);
                            }
                            var sampleastricSplit = calEvent.samplenameqty.split('*');
                            for (j = 0; j < sampleastricSplit.length; j++) {
                                $("#lblSample" + j + '1').val(sampleastricSplit[j].split('|')[0]);
                                $("#lblQuantity" + j + '1').val(sampleastricSplit[j].split('|')[1]);
                            }

                            var giftastricSplit = calEvent.gifts.split('*');
                            for (j = 0; j < giftastricSplit.length; j++) {
                                $("#lblGift" + j + '1').val(giftastricSplit[j]);
                            }
                            $(id).fadeIn();
                        }
                    });

                    var cp = $("#" + calEvent.id + calEvent.divid + "tcp");
                    cp.html('<div style="float:right; cursor:pointer; padding-right:5px; padding-left:5px;"> X </div>');
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
                    var editbox = $("#" + calEvent.id + calEvent.divid + "edit");
                    editbox.html('');
                    editbox.unbind('click');
                    cp.html('');
                    cp.unbind('click');
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
                dayClick: function (date, allDay, jsEvent, view) {
                },
                disableResizing: true,
                disableDragging: true
            });
        }


        // Creates the Calendar for the selected RSM
        function CreateCalendarforNSM(employeeid, actid) {
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var eclick = true;

            var url = 'handler.ashx?method=getcurrentemployee&empid=' + employeeid;
            GetResponse(url, function (e) {
                if (e.Success) {
                    $('#EmployeeName').html(e.Response); //+ " (NSM Plan)"
                }
            });

            $('#btnReject').attr("style", "display:none");
            $('#btnApprove').attr("style", "display:none");
            $('#spantxtmainComments').attr('style', 'display:none');

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
                    $('#lblStatusCaption').html('My Plan Status');
                    $('#spanStatus').html('');
                    $('#labelStatusColor').attr("class", "red1");
                    $('#txtmainComments').val('');
                    var initialdate = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                    if (actid == 0) {
                        url = 'nsmhandler.ashx?method=getnsmevents&nsmid=' + employeeid + '&initial=' + initialdate;
                    }
                    else {
                        url = 'nsmhandler.ashx?method=getnsmeventsbyactivityid&nsmid=' + employeeid + '&actid=' + actid + '&initial=' + initialdate;
                    }
                    GetResponse(url, function (e) {
                        if (e.Success) {
                            var dollarSplit = e.Response.split('$');
                            var commaSplit = dollarSplit[0].split(',');
                            if (dollarSplit[1].split(';')[0] != '') {
                                $('#spanStatus').html(dollarSplit[1].split(';')[0]);
                                $('#labelStatusColor').attr("class", dollarSplit[1].split(';')[1]);
                                $('#labelStatusColor').attr("style", "height:23;");
                            }
                            rowCount = commaSplit.length; // total count of records returned
                            var i = 0;
                            var events = [];
                            if ($('#calendar').fullCalendar('getView').name == 'month') {
                                while (rowCount > 0) {
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
                                        nsmid: commaSplit[i].split(';')[15],
                                        nsmempid: commaSplit[i].split(';')[17],
                                        nsmdescription: commaSplit[i].split(';')[18],
                                        nsminformed: commaSplit[i].split(';')[19],
                                        nsmmonthid: commaSplit[i].split(';')[16],
                                        nsmstatus: commaSplit[i].split(';')[21],
                                        nsmstatusreason: commaSplit[i].split(';')[22],
                                        nsmisedit: commaSplit[i].split(';')[23],
                                        doctorname: commaSplit[i].split(';')[24],
                                        productsname: commaSplit[i].split(';')[25],
                                        remindersname: commaSplit[i].split(';')[26],
                                        classname: commaSplit[i].split(';')[27],
                                        brickname: commaSplit[i].split(';')[28],
                                        samplenameqty: commaSplit[i].split(';')[29],
                                        gifts: commaSplit[i].split(';')[30],
                                        divid: 'main',
                                        allDay: false
                                        // will be parsed
                                    });
                                    i++;
                                    rowCount--;
                                }

                            }
                            else if ($('#calendar').fullCalendar('getView').name == 'agendaDay') {
                                while (rowCount > 0) {
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
                                        nsmid: commaSplit[i].split(';')[15],
                                        nsmempid: commaSplit[i].split(';')[17],
                                        nsmdescription: commaSplit[i].split(';')[18],
                                        nsminformed: commaSplit[i].split(';')[19],
                                        nsmmonthid: commaSplit[i].split(';')[16],
                                        nsmstatus: commaSplit[i].split(';')[21],
                                        nsmstatusreason: commaSplit[i].split(';')[22],
                                        nsmisedit: commaSplit[i].split(';')[23],
                                        doctorname: commaSplit[i].split(';')[24],
                                        productsname: commaSplit[i].split(';')[25],
                                        remindersname: commaSplit[i].split(';')[26],
                                        classname: commaSplit[i].split(';')[27],
                                        brickname: commaSplit[i].split(';')[28],
                                        samplenameqty: commaSplit[i].split(';')[29],
                                        gifts: commaSplit[i].split(';')[30],
                                        divid: 'mainday',
                                        allDay: false
                                        // will be parsed
                                    });
                                    i++;
                                    rowCount--;
                                }

                            }
                            else {
                                while (rowCount > 0) {
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
                                        nsmid: commaSplit[i].split(';')[15],
                                        nsmempid: commaSplit[i].split(';')[17],
                                        nsmdescription: commaSplit[i].split(';')[18],
                                        nsminformed: commaSplit[i].split(';')[19],
                                        nsmmonthid: commaSplit[i].split(';')[16],
                                        nsmstatus: commaSplit[i].split(';')[21],
                                        nsmstatusreason: commaSplit[i].split(';')[22],
                                        nsmisedit: commaSplit[i].split(';')[23],
                                        doctorname: commaSplit[i].split(';')[24],
                                        productsname: commaSplit[i].split(';')[25],
                                        remindersname: commaSplit[i].split(';')[26],
                                        classname: commaSplit[i].split(';')[27],
                                        brickname: commaSplit[i].split(';')[28],
                                        samplenameqty: commaSplit[i].split(';')[29],
                                        gifts: commaSplit[i].split(';')[30],
                                        divid: 'mainweek',
                                        allDay: false
                                        // will be parsed
                                    });
                                    i++;
                                    rowCount--;
                                }

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
                        var id = $('a[name=modalZSM]').attr('href');

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
                        //                var op = $("<option />").html(bmds[a].split(',')[2] + ' - ' + bmds[a].split(',')[1]).val(bmds[a].split(',')[0]);
                        //                ddl.append(op);
                        //            }
                        //        }

                        //        var url = 'zsmhandler.ashx?method=getbmdformio&mioid=' + calEvent.id;
                        //        GetResponse(url, function (e) {
                        //            if (e.Success) {
                        //                if (e.Response != '') {
                        //                    $("#ddlBMD").val(e.Response);
                        //                }
                        //            }
                        //        });
                        //    }
                        //});
                        if (calEvent.title == 'BMD') {

                            $('#divBMD').attr("style", "display:inline");
                        }
                        else {
                            $('#divBMD').attr("style", "display:none");
                        }

                        $("#spanRejection").attr("style", "display:none;");
                        $('#tableReject').attr("style", "display:none");
                        $("#btnAddRSM").attr("style", "display:none");
                        if (calEvent.nsmisedit != 'False') {
                            $("#btnAddNSM").attr("style", "display:block");
                        }
                        else {
                            $("#btnAddNSM").attr("style", "display:none");
                        }
                        if (calEvent.zsmstatus == "Rejected") {
                            //                                                        $("#txtRejectComments").val(calEvent.zsmstatusreason);
                            //                                                        $('#chkReject').attr('checked', 'checked');
                            //                                                        checkreject = true;
                        }

                        //else
                        {
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
                        $('#lblDoctor1').val(calEvent.doctorname);
                        $('#lblActivity1').val(calEvent.title);
                        $('#lblDescription1').val(calEvent.description);
                        $('#lblStartTime1').val($.fullCalendar.formatDate(calEvent.start, "HH:mm"));
                        $('#lblEndTime1').val($.fullCalendar.formatDate(calEvent.end, "HH:mm"));
                        $('#lblClass1').val(calEvent.classname);
                        $('#lblBrick1').val(calEvent.brickname);

                        //first empty the product and reminders textboxes
                        for (i = 0; i < 4; i++) {
                            $('#lblProduct' + i + '1').val('');
                            $('#lblReminder' + i + '1').val('');
                            $('#lblSample' + i + '1').val('');
                            $('#lblQuantity' + i + '1').val('');
                        }
                        $('#lblGift01').val('');
                        $('#lblGift11').val('');


                        astaricSplit = calEvent.productsname.split('*');
                        for (i = 0; i < astaricSplit.length; i++) {
                            $('#lblProduct' + i + '1').val(astaricSplit[i]);
                        }
                        astaricSplit = calEvent.remindersname.split('*');
                        for (i = 0; i < astaricSplit.length; i++) {
                            $('#lblReminder' + i + '1').val(astaricSplit[i]);
                        }
                        var sampleastricSplit = calEvent.samplenameqty.split('*');
                        for (j = 0; j < sampleastricSplit.length; j++) {
                            $("#lblSample" + j + '1').val(sampleastricSplit[j].split('|')[0]);
                            $("#lblQuantity" + j + '1').val(sampleastricSplit[j].split('|')[1]);
                        }

                        var giftastricSplit = calEvent.gifts.split('*');
                        for (j = 0; j < giftastricSplit.length; j++) {
                            $("#lblGift" + j + '1').val(giftastricSplit[j]);
                        }

                        $(id).fadeIn();
                    }
                },
                eventMouseover: function (calEvent, jsEvent, view) {

                    var cp = $("#" + calEvent.id + calEvent.divid + "tcp");
                    cp.html('<div style="float:right; cursor:pointer; padding-right:5px; padding-left:5px;"> X </div>');
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
                dayClick: function (date, allDay, jsEvent, view) {
                },
                disableResizing: true,
                disableDragging: true
            });
        }
    </script>


    <style type="text/css">
        body {
            font-family: verdana;
            font-size: 15px;
        }

        a {
            color: #333;
            text-decoration: none;
        }

            a:hover {
                color: #ccc;
                text-decoration: none;
            }

        #mask {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 9000;
            background-color: #000;
            display: none;
        }

        #boxes .window {
            position: fixed;
            left: 0;
            top: 0;
            width: 440px;
            height: 200px;
            display: none;
            z-index: 9999;
            padding: 20px;
        }

        #boxes #dialog {
            width: 375px;
            height: 203px;
            padding: 10px;
            background-color: #ffffff;
        }

        #boxes #dialog1 {
            width: 375px;
            height: 203px;
        }

        #dialog1 .d-header {
            background: url(images/login-header.png) no-repeat 0 0 transparent;
            width: 375px;
            height: 150px;
        }

            #dialog1 .d-header input {
                position: relative;
                top: 60px;
                left: 100px;
                border: 3px solid #cccccc;
                height: 22px;
                width: 200px;
                font-size: 15px;
                padding: 5px;
                margin-top: 4px;
            }

        #dialog1 .d-blank {
            float: left;
            background: url(images/login-blank.png) no-repeat 0 0 transparent;
            width: 267px;
            height: 53px;
        }

        #dialog1 .d-login {
            float: left;
            width: 108px;
            height: 53px;
        }

        #boxes #dialog2 {
            background: url(images/notice.png) no-repeat 0 0 transparent;
            width: 326px;
            height: 229px;
            padding: 50px 0 20px 25px;
        }
</style>


    <style type='text/css'>
        body {
            margin-top: 40px;
            text-align: center;
            font-size: 14px;
            font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
        }

        #calendar {
            width: 900px;
            margin: 0 auto;
        }

        a {
            color: #333;
            text-decoration: none;
        }

            a:hover {
                color: #ccc;
                text-decoration: none;
            }

        #mask {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 9000;
            background-color: #000;
            display: none;
        }

        #boxes .window {
            position: fixed;
            left: 0px;
            top: 0px;
            width: 900px;
            height: 200px;
            display: none;
            z-index: 9999;
        }

        #boxes .windowleft {
            float: left;
            left: 0;
            top: 0;
            width: 400px;
            z-index: 9999;
            padding: 20px;
        }

        #boxes .windowright {
            float: left;
            left: 0;
            top: 0;
            width: 400px;
            z-index: 9999;
            padding: 20px;
        }


        #boxes #dialog {
            width: 375px;
            height: 203px;
            padding: 10px;
            background-color: #ffffff;
        }

        #boxes #dialog1 {
            width: 375px;
            height: 203px;
        }

        #dialog1 .d-header {
            background: url(images/login-header.png) no-repeat 0 0 transparent;
            width: 375px;
            height: 150px;
        }

            #dialog1 .d-header input {
                position: relative;
                top: 60px;
                left: 100px;
                border: 3px solid #cccccc;
                height: 22px;
                width: 200px;
                font-size: 15px;
                padding: 5px;
                margin-top: 4px;
            }

        #dialog1 .d-blank {
            float: left;
            background: url(images/login-blank.png) no-repeat 0 0 transparent;
            width: 267px;
            height: 53px;
        }

        #dialog1 .d-login {
            float: left;
            width: 108px;
            height: 53px;
        }

        #boxes #dialog2 {
            background: url(images/notice.png) no-repeat 0 0 transparent;
            width: 326px;
            height: 229px;
            padding: 50px 0 20px 25px;
        }
    </style>

    <div id="content">
        <div class="page_heading_no_icon">
            <%--<h1> Month view of NSM </h1>--%>
        </div>
        <div class="content_inner">
            <div class="status_area">
                <div class="row">
                    <label id="lblStatusCaption">Plan Status</label>
                    <label id="labelStatusColor" class="red1"><span id="spanStatus"></span></label>
                </div>
                <div class="clear"></div>
                <div class="row">
                    <label id="lblRejectComments">Reject Comments: </label>
                    <span id="spanRejectComments"></span>
                </div>
                <div class="clear"></div>
            </div>
            <div class="inner-left">
                <div class="bottom_area">
                    <div id='divmyplan' style="cursor: pointer;">
                        <input type="button" class="btn blank_large" value="Click to View My Plan" name="" id="" />
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="clear"></div>
                <div class="user_list">
                    <div style="border-left: solid 1px #D8D0C9;">
                        <table border="0" cellpadding="0" cellspacing="0" class="morning_view" width="100%" style="border-width: 0px; border-collapse: collapse;">
                            <tr>
                                <th>SM List
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <select id="ddlRSM" class="styledselect_form_1">
                                        <option></option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th><%--AM List--%>

                                    DSM/JDSM List
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <select id="ddlZSM" class="styledselect_form_1">
                                        <option></option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>SPO/TM/STM List
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <select id="ddlMIO" class="styledselect_form_1">
                                        <option></option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="clear"></div>
                <div class="user_list">
                    <div style="border-left: solid 1px #D8D0C9;">
                        <table border="0" cellpadding="0" cellspacing="0" class="morning_view" width="100%" style="border-width: 0px; border-collapse: collapse;">
                            <tr>
                                <th>Filter by Activity
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <select id="ddlActivitiesMain" class="styledselect_form_1">
                                        <option></option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="clear"></div>
            </div>
            <div class="inner-right">
                <div class="calender">
                    <div class="CalenderHeading"><span id="EmployeeName"></span></div>
                    <div id='calendar'></div>
                    <div class="clear"></div>
                    <div class="comment_area">
                        <span id="spantxtmainComments" style="display: none">
                            <label for="comment">Comments: </label>
                            <textarea id="txtmainComments" class="styledtextarea"></textarea>
                        </span>
                        <div class="clear"></div>
                        <%--<input id="btnApproval" type="button" class="btn send_approval" value="Send Approval" style="display:none"/>--%>
                        <input id="btnApprove" type="button" class="btn blank_large" value="Approve Selected SM Plan" style="display: none" />
                        <input id="btnReject" type="button" class="btn blank_large" value="Reject Selected Plan" style="display: none" />
                        <input id="btnPlanStatus" style="display: none" type="button" class="btn blank_large" value="Current Month Plan Status" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <a href="#dialog1" name="modal"></a>
    <%--<a href="#dialog2" name="modal">Sticky Note</a>--%>
    <a href="#DivAdd" name="modalAdd"></a>
    <a href="#DivZSM" name="modalZSM"></a>
    <div id="boxes">

        <div id="dialog" class="window">
            <a href="#" class="close">Close it</a>
        </div>

        <div id="DivZSM" class="window">
            <div class="windowleft">
                <div class="persoanl-data">
                    <div class="inner-head">Joint Visit</div>
                    <div class="inner-left">
                        <ul class="form_list">
                            <li id="divBMD" style="display: none">BMD Coordinator
                    <br />
                                <select id="ddlBMD">
                                    <option></option>
                                </select>
                            </li>
                            <li>Comments
                    <br />
                                <textarea id="txtComments" rows="4" cols="40" class="styledtextarea_2">
                    </textarea>
                            </li>
                            <li>
                                <input id="rdInformed" name="UI" type="radio" value="Informed" />
                                Informed
                    <input id="rdUninformed" name="UI" type="radio" value="Uninformed" />
                                Uninformed
                            </li>
                        </ul>
                        <ul class="form_list">
                            <li id="spanRejection">Reject this activity  
                    <input id="chkReject" type="checkbox" onclick="checkreject= this.checked; var x=document.getElementById('txtRejectComments');if(this.checked){x.disabled=false;} else {x.disabled = true;}" />
                            </li>
                            <li id="tableReject">Comments
                    <br />
                                <textarea id="txtRejectComments" rows="4" cols="40" disabled="true" class="styledtextarea_2">
                    </textarea>
                            </li>
                        </ul>
                    </div>
                    <div class="inner-bottom">
                        <input id="btnAddRSM" type="button" value="Update RSM Joint Visit" style="display: none" class="btn blank_large" />
                        <input id="btnAddNSM" type="button" value="Add/Update NSM Joint Visit " style="display: none" class="btn blank_large" />
                    </div>
                </div>
            </div>
            <div class="windowright">
                <div class="persoanl-data" id="div1">
                    <div class="inner-head">Event Details</div>
                    <div class="inner-left">
                        <ul class="form_list">
                            <li>
                                <div class="lfloat">
                                    Brick
                            <br />
                                    <input id="lblBrick1" readonly="readonly" type="text" class="inp-form-small" />
                                </div>
                                <div class="rfloat">
                                    Class
                            <br />
                                    <input id="lblClass1" readonly="readonly" type="text" class="inp-form-small" />
                                </div>
                            </li>
                            <li>Doctor
                        <br />
                                <input id="lblDoctor1" readonly="readonly" type="text" class="inp-form-medium" />
                            </li>
                            <li>
                                <div class="lfloat">
                                    Start Time
                            <br />
                                    <input id="lblStartTime1" readonly="readonly" type="text" class="inp-form-small" />
                                </div>
                                <div class="rfloat">
                                    End Time
                            <br />
                                    <input id="lblEndTime1" readonly="readonly" type="text" class="inp-form-small" />
                                </div>
                            </li>
                            <li>Activity
                        <br />
                                <input id="lblActivity1" readonly="readonly" type="text" class="inp-form-medium" />
                            </li>
                            <li>Products
                        <br />
                                <input id="lblProduct01" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblProduct11" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblProduct21" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblProduct31" readonly="readonly" type="text" class="inp-form-verysmall" />
                            </li>
                            <li>Reminders
                        <br />
                                <input id="lblReminder01" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblReminder11" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblReminder21" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblReminder31" readonly="readonly" type="text" class="inp-form-verysmall" />
                            </li>
                            <li>Samples
                        <br />
                                <input id="lblSample01" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblSample11" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblSample21" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblSample31" readonly="readonly" type="text" class="inp-form-verysmall" />
                            </li>
                            <li>Quantitys
                        <br />
                                <input id="lblQuantity01" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblQuantity11" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblQuantity21" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblQuantity31" readonly="readonly" type="text" class="inp-form-verysmall" />
                            </li>
                            <li>Gifts
                        <br />
                                <input id="lblGift01" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblGift11" readonly="readonly" type="text" class="inp-form-verysmall" />
                            </li>
                            <li>Description
                        <br />
                                <input id="lblDescription1" readonly="readonly" type="text" class="inp-form-medium" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- Start of Login Dialog -->
        <div id="DivAdd" class="window">
            <div class="windowleft">
                <div class="persoanl-data" id="divEventDetails">
                    <div class="inner-head">Event Details</div>
                    <div class="inner-left">
                        <ul class="form_list">
                            <li>
                                <div class="lfloat">
                                    Brick
                            <br />
                                    <input id="lblBrick" readonly="readonly" type="text" class="inp-form-small" />
                                </div>
                                <div class="rfloat">
                                    Class
                            <br />
                                    <input id="lblClass" readonly="readonly" type="text" class="inp-form-small" />
                                </div>
                            </li>
                            <li>Doctor
                        <br />
                                <input id="lblDoctor" readonly="readonly" type="text" class="inp-form-medium" />
                            </li>
                            <li>
                                <div class="lfloat">
                                    Start Time
                            <br />
                                    <input id="lblStartTime" readonly="readonly" type="text" class="inp-form-small" />
                                </div>
                                <div class="rfloat">
                                    End Time
                            <br />
                                    <input id="lblEndTime" readonly="readonly" type="text" class="inp-form-small" />
                                </div>
                            </li>
                            <li>Activity
                        <br />
                                <input id="lblActivity" readonly="readonly" type="text" class="inp-form-medium" />
                            </li>
                            <li>Products
                        <br />
                                <input id="lblProduct0" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblProduct1" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblProduct2" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblProduct3" readonly="readonly" type="text" class="inp-form-verysmall" />
                            </li>
                            <li>Reminders
                        <br />
                                <input id="lblReminder0" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblReminder1" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblReminder2" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblReminder3" readonly="readonly" type="text" class="inp-form-verysmall" />
                            </li>
                            <li>Samples
                        <br />
                                <input id="lblSample0" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblSample1" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblSample2" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblSample3" readonly="readonly" type="text" class="inp-form-verysmall" />
                            </li>
                            <li>Quantity
                        <br />
                                <input id="lblQuantity0" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblQuantity1" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblQuantity2" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblQuantity3" readonly="readonly" type="text" class="inp-form-verysmall" />
                            </li>
                            <li>Gifts
                        <br />
                                <input id="lblGift0" readonly="readonly" type="text" class="inp-form-verysmall" />
                                <input id="lblGift1" readonly="readonly" type="text" class="inp-form-verysmall" />
                            </li>
                            <li>Description
                        <br />
                                <input id="lblDescription" readonly="readonly" type="text" class="inp-form-medium" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="windowright">
                <ul id="ulRejectComments1" class="form_list" style="display: none">
                    <li>Reject Comments
                    <br />
                        <textarea id="txtRejectComments1" readonly="readonly" class="styledtextarea_1"></textarea>
                    </li>
                </ul>
                <div id="dayCalender" style="background-color: White">
                </div>
                <div class="d-blank">
                </div>
                <div>
                </div>
            </div>
        </div>
        <div id="dialog1" class="window">
            <div class="d-header">
                <input id="txtuser" type="text" value="username" /><br />
                <input id="txtstartdate" type="text" /><br />
                <input id="txtenddate" type="text" /><br />
                <input id="txtcolor" type="text" /><br />
                <input type="image" alt="Login" title="Login" id="btnlogin" src="images/login-button.png" />
            </div>
            <div class="d-blank"></div>
            <div></div>
        </div>
        <!-- End of Login Dialog -->



        <!-- Start of Sticky Note -->
        <div id="dialog2" class="window">
            So, with this <b>Simple Jquery Modal Window</b>, it can be in any shapes you want! Simple and Easy to modify : )
            <br />
            <br />
            <input type="button" value="Close it" class="close" />
        </div>
        <!-- End of Sticky Note -->



        <!-- Mask to cover the whole screen -->
        <div id="mask"></div>
    </div>
</asp:Content>


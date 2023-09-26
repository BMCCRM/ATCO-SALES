<%@ Page Title="ZSM Scheduler" MasterPageFile="~/MasterPages/Home.master" Language="C#"
    AutoEventWireup="true" CodeBehind="ZSM.aspx.cs" Inherits="PocketDCR2.Schedular.ZSM" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <script src="jquery/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="jquery/jquery-ui-1.8.17.custom.min.js" type="text/javascript"></script>
    <script src="jquery/curvycorners.src.js" type="text/javascript"></script>
    <script src="fullcalendar/AJAXRequest.js" type="text/javascript"></script>
    <script src="fullcalendar/fullcalendar.js" type="text/javascript"></script>

     <link rel="stylesheet" href="jquery/tingle.min.css">
    <script type="text/javascript" src="jquery/tingle.min.js"></script>


    <link rel='stylesheet' type='text/css' href='fullcalendar/fullcalendar.css' />
    <link rel='stylesheet' type='text/css' href='fullcalendar/fullcalendar.print.css' media='print' />
    <link href="Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <script type='text/javascript'>
        var cnt = this; // Reference variable for top level 
        var temp = [];
        var currentEvent = []; // Represents the current Event selected
        var dateofday = ''; // Represents the Current Date selected
        var month = ''; // Represents the Current Month selected
        var currentmioid = ''; // Represents the Current MIO selected
        var currentzsmid = ''; // Represents the Current ZSM selected
        var checkreject = false; // Checks to see if the Event is rejected by ZSM
        var Active = ''; // check to see whether an MIO or a ZSM is selected

        // Generating and populating MIO's Table
        url = 'zsmhandler.ashx?method=getmios';
        var mios;
        GetResponse(url, function (e) {
            if (e.Success) {
                mios = e.Response.split(";");
                PopulateMIOCombo(mios, null, "ddlMIO", "True");
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
        url = 'zsmhandler.ashx?method=getzsmid';
        var mios;
        GetResponse(url, function (e) {
            if (e.Success) {
                currentzsmid = e.Response;
            }
        });


        $(document).ready(function () {

            $("#Sample0").change(function () {
                var value = $("#Sample0").val();
                if (value != -1) {
                    $('#tdQuantitys').attr("style", "display:block");
                    $('#Quantity0').attr("style", "display:inline");
                }
                else {
                    $('#Quantity0').attr("style", "display:none");
                }
            });

            $("#Sample1").change(function () {
                var value = $("#Sample1").val();
                if (value != -1) {
                    $('#tdQuantitys').attr("style", "display:block");
                    $('#Quantity1').attr("style", "display:inline");
                }
                else {
                    $('#Quantity1').attr("style", "display:none");
                }
            });

            $("#Sample2").change(function () {
                var value = $("#Sample2").val();
                if (value != -1) {
                    $('#tdQuantitys').attr("style", "display:block");
                    $('#Quantity2').attr("style", "display:inline");
                }
                else {
                    $('#Quantity2').attr("style", "display:none");
                }
            });




            $("#Sample3").change(function () {
                var value = $("#Sample3").val();
                if (value != -1) {
                    $('#tdQuantitys').attr("style", "display:block");
                    $('#Quantity3').attr("style", "display:inline");
                }
                else {
                    $('#Quantity3').attr("style", "display:none");
                }
            });




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

                $('#ddlMIO').val(-1);

                Active = 'ZSM';
                $('#calendar').html('');
                $('#btnReject').attr("style", "display:none");
                $('#btnApprove').attr("style", "display:none");
                $('#btnApproval').attr('style', 'display:block');
                $('#spantxtmainComments').attr('style', 'display:none');
                CreateCalendarforZSM(currentzsmid, actid);

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

            $('#ddlActivitiesMain').change(function () {
                $('#calendar').html('');
                $("#btnPlanStatus").show();
                var actid = $("#ddlActivitiesMain option:selected").val();
                if (actid == -1) {
                    actid = 0;
                }

                if (Active == 'MIO') { // if the currently selected employee is MIO
                    if (currentmioid == '-1') {
                        $('#btnReject').attr("style", "display:none");
                        $('#btnApprove').attr("style", "display:none");
                        $('#btnApproval').attr('style', 'display:none');
                        $('#spantxtmainComments').attr('style', 'display:none');
                    }
                    else {
                        $('#btnReject').attr("style", "display:block");
                        $('#btnApprove').attr("style", "display:block");
                        $('#btnApproval').attr('style', 'display:none');
                        $('#spantxtmainComments').attr('style', 'display:block');
                        CreateCalendarforMIO(currentmioid, actid);
                    }
                }
                else if (Active == 'ZSM') { // if the currently selected employee is ZSM (My Plan)
                    $('#btnReject').attr("style", "display:none");
                    $('#btnApprove').attr("style", "display:none");
                    $('#btnApproval').attr('style', 'display:block');
                    $('#spantxtmainComments').attr('style', 'display:none');
                    CreateCalendarforZSM(currentzsmid, actid);
                }
            });

            $('#ddlMIO').change(function () {
                $('#calendar').html('');
                
                var actid = $("#ddlActivitiesMain option:selected").val();
                if (actid == -1) {
                    actid = 0;
                }

                var empid = $("#ddlMIO option:selected").val();
                currentmioid = empid;  // Setting the Current MIO selected
                Active = 'MIO';  // Setting the currently selected employed with type MIO
                $('#calendar').html('');  // flushing the Calendar
                if (empid == '-1') {
                    $('#btnReject').attr("style", "display:none");
                    $('#btnApprove').attr("style", "display:none");
                    $('#btnApproval').attr('style', 'display:none');
                    $('#spantxtmainComments').attr('style', 'display:none');
                    $('#btnPlanStatus').attr('style', 'display:none');
                }
                else {
                    $('#btnReject').attr("style", "display:block");
                    $('#btnApprove').attr("style", "display:block");
                    $('#btnApproval').attr('style', 'display:none');
                    $('#spantxtmainComments').attr('style', 'display:block');
                    $('#btnPlanStatus').attr('style', 'display:block');
                    CreateCalendarforMIO(empid, actid);   // Creating the Calendar for selected MIO
                }
            });

            // Clears All the fields for Event Edit popup 
            function ClearAddFields() {
                $('#ddlActivities').val(-1);
                $('#ddlTimeStart').val(-1);
                $('#ddlTimeEnd').val(-1);
                $('#ddlDoctors').val(-1);
                $("#txtDescription").val('');
                $("#btnAdd").val('Add Event');
            }

            // Clears All the fields for ZSM Event popup 
            function ClearZSMFields() {
                $('#chkReject').attr('checked', false);
                $('#rdInformed').attr('checked', false);
                $('#rdUninformed').attr('checked', false);
                $("#txtRejectComments").val('');
                $("#txtComments").val('');
            }
            $('#ddlMIOpopup').change(function () {

                if ($('#ddlMIOpopup').val() != 0)
                    $('#ddlActivitiesMainpopup').val(5);

            });
            $('#ddlActivitiesMainpopup').change(function () {

                if ($('#ddlActivitiesMainpopup').val() == 7)
                    $('#ddlMIOpopup').val(0);

            });

            // If the Send For Approval button is clicked
            $('#btnApproval').click(function () {
                if ($('#spanStatus').html() == "Draft" || $('#spanStatus').html() == "Rejected") {
                    var r = confirm("Are you sure want to send the plan for Approval?");
                    if (r == true) {
                        url = 'zsmhandler.ashx?method=sendforapproval&date=' + $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss") + '&zsmid=' + currentzsmid + '&status=' + $('#spanStatus').html();
                        cnt.GetResponse(url, function (e) {
                            if (e.Success) {
                                window.location.reload(true);
                            } else {
                            }
                        });
                    }
                }
                else if ($('#spanStatus').html() == "Approved") {
                    alert("Plan is already approved");
                }
                else if ($('#spanStatus').html() == '') {
                    alert("No events found for approval");
                }
                else {
                    alert("You have already sent for approval");
                }
            });



            // If the Approve button is clicked
            $('#btnApprove').click(function () {
                if ($('#spanStatus').html() == "Submitted" || $('#spanStatus').html() == "Resubmitted" || $('#spanStatus').html() == "Draft" || $('#spanStatus').html() == "Rejected") {
                    var txtmaincomments = $('#txtmainComments').val();
                    var r = confirm("Are you sure you want to Approve the plan?");
                    if (r == true) {
                        url = 'zsmhandler.ashx?method=approvemioplan&date=' + $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss") + '&mioid=' + currentmioid + '&comments=' + txtmaincomments;
                        cnt.GetResponse(url, function (e) {
                            if (e.Success || e.Response == '') {
                                
                                window.location.reload();
                                
                                //else {
                                //    alert(e.Response);
                                //}
                            } else {
                            }
                        });
                    }
                }
                else {
                    alert("You can not Approved this plan");
                }
            });

            // If the Reject button is clicked
            $('#btnReject').click(function () {
                debugger
                if ($('#spanStatus').html() == "Submitted" || $('#spanStatus').html() == "Resubmitted" || $('#spanStatus').html() == "Approved" || $('#spanStatus').html() == "Draft") {
                    var txtmaincomments = $('#txtmainComments').val();
                    if (txtmaincomments == '') {
                        alert("Please write comments for rejection");
                    }
                    else {
                        var r = confirm("Are you sure you want to reject the plan?");
                        if (r == true) {
                            url = 'zsmhandler.ashx?method=rejectmioplan&date=' + $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss") + '&mioid=' + currentmioid + '&comments=' + txtmaincomments;
                            cnt.GetResponse(url, function (e) {
                                if (e.Success) {
                                    window.location.reload();
                                } else {
                                }
                            });
                        }
                    }
                }
                else {
                    alert("You can not rejected this plan");
                }
            });

            //Checks Staus Of The Current Selected Emp And CUrrent Month
            $('#btnPlanStatus').click(function () {

                var empId;
                var initial = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                if (Active == "MIO") url = 'handler.ashx?method=checkCurrentPlanStatus&empId=' + currentmioid+'&initial=' + initial;
                else url = 'handler.ashx?method=checkCurrentPlanStatus&empId=' + currentzsmid + '&initial=' + initial;
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

            // if the Reset button is pressed (Clears all Edit Fields)
            $('#btnReset').click(function () {
                ClearAddFields();
            });

            // Called when the selected index of activities gets changed
            $('#ddlActivities').change(function () {


                var recordcount = $("#ddlActivities option:selected").data('products');
                var remindercount = $("#ddlActivities option:selected").data('reminders');
                var sampleqtycount = $("#ddlActivities option:selected").data('reminders');
                ShowProductsDropDown("Products", recordcount);
                ShowProductsDropDown("Reminders", remindercount);

                if ($("#ddlActivities option:selected").text() == 'BMD') {
                    $('#divBMD').attr("style", "display:block");
                }
                else
                    $('#divBMD').attr("style", "display:none");
            });

            // Called when the selected index of bricks gets changed
            $('#ddlBricks').change(function () {

                $('#ddlClasses').val(-1);
                var referenceOfDoctorTd = $("#ddlDoctors");
                var brickid = $("#ddlBricks option:selected").val();

                var url = 'zsmhandler.ashx?method=getdoctorsbybrick&brickid=' + brickid + '&mioid=' + currentmioid;
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
                //alert($("#ddlActivities option:selected").data('products'));
                var referenceOfDoctorTd = $("#ddlDoctors");
                var classid = $("#ddlClasses option:selected").val();

                var url = 'zsmhandler.ashx?method=getdoctorsbyclass&classid=' + classid + '&mioid=' + currentmioid;
                GetResponse(url, function (e) {

                    if (e.Success) {
                        PopulateDoctorsCombo(e.Response.split(';'));
                        //  $('#ddlDoctors').val(calEvent.doctorID);
                    }
                });
            });

            $('#ddlDoctors').change(function () {

                var doctorID = $("#ddlDoctors option:selected").val();
                var url = 'handler.ashx?method=getproductsbydoctorspeciality&doctorid=' + doctorID;
                GetResponse(url, function (e) {

                    if (e.Success) {

                        var hashSplit = e.Response.split('#');
                        var semicolonSplit = hashSplit[0].split(';');

                        for (j = 0; j < semicolonSplit.length; j++) {
                            $("#Products" + j).val(semicolonSplit[j]);
                        }

                        semicolonSplit = hashSplit[1].split(';');
                        for (j = 0; j < semicolonSplit.length; j++) {
                            $("#Reminders" + j).val(semicolonSplit[j]);
                        }
                    }
                });
            });

            // If the Add/Edit button of ZSM Event popup is Clicked
            $('#btnAddZSM').click(function () {

                var informed = true;
                var rejected = checkreject;
                inform = document.getElementById('rdInformed');
                uninform = document.getElementById('rdUninformed');
                var rejectcomments = $("#txtRejectComments").val();
                var comments = $("#txtComments").val();
                var bmd = $('#ddlBMD').val();
                var miostatus = $('#spanStatus').html();
                if (inform.checked) {
                    informed = true;
                }
                if (uninform.checked) {
                    informed = false;
                }
                // inserting/editing ZSM event
                url = 'zsmhandler.ashx?method=insertzsmplan&mioid=' + cnt.currentEvent.id + '&monthid=' + cnt.currentEvent.monthID + '&rejected=' + rejected + '&rejectcomments=' + rejectcomments + '&comments=' + comments + '&date=' + dateofday + '&informed=' + informed + '&start=' + $.fullCalendar.formatDate(cnt.currentEvent.start, "MM dd yyyy HH:mm:ss") + '&end=' + $.fullCalendar.formatDate(cnt.currentEvent.end, "MM dd yyyy HH:mm:ss") + "&bmd=" + bmd + "&mioempid=" + currentmioid;
                cnt.GetResponse(url, function (e) {

                    if (e.Success) { // if the current time slot of event is already booked by ZSM
                        if (e.Response == "notinrange") {
                            alert("Time Range already exists in your plan");
                        }
                        else if (e.Response == "updated") { // If Event is updated
                            cnt.currentEvent.status = miostatus;
                            cnt.currentEvent.description = comments;
                            $('#calendar').fullCalendar('updateEvent', cnt.currentEvent);
                            alert("Record has been successfully updated");
                        }
                        else if (e.Response == "inserted") { // If the Event is inserted in ZSM plan
                            cnt.currentEvent.status = miostatus;
                            cnt.currentEvent.description = comments;
                            $('#calendar').fullCalendar('updateEvent', cnt.currentEvent);
                            $('#calendar').fullCalendar('renderEvent', cnt.currentEvent, true);
                            ClearZSMFields();
                            alert("Record has been successfully inserted");
                        }
                        else if (e.Response == "rejected") { // if the ZSM rejects the current Event
                            $('#rdInformed').attr('checked', false);
                            $('#rdUninformed').attr('checked', false);
                            $("#txtComments").val('');
                            cnt.currentEvent.status = "Rejected";
                            cnt.currentEvent.statusReason = rejectcomments;
                            if (Active == 'ZSM') {
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

            // if the update button of Edit Event Popup is pressed
            $('#btnAdd').click(function () {
                var s = ValidateFields(); // Validates all the necessary fields 
                if (s) { // if all fields are validated
                    var activity = $('#ddlActivities').val();
                    var starttime = $('#ddlTimeStart').val();
                    var endtime = $('#ddlTimeEnd').val();
                    var doctor = $('#ddlDoctors').val();
                    var doctorname = $("#ddlDoctors option:selected").text().split('-')[1];
                    var bmd = $('#ddlBMD1').val();
                    var Description = $("#txtDescription").val();
                    var products = '';
                    var reminders = '';
                    var samples = '';
                    var gifts = '';
                    if ($('#btnAdd').val() == 'Update Selected Event') {
                        var recordcount = $("#ddlActivities option:selected").data('products');
                        //referenceOfProductTd.html('');
                        var products = '';
                        for (a = 0; a < recordcount; a++) {

                            products += $("#Products" + a).val();
                            products += ";";
                        }

                        var recordcount = $("#ddlActivities option:selected").data('reminders');
                        //referenceOfProductTd.html('');
                        for (a = 0; a < recordcount; a++) {

                            reminders += $("#Reminders" + a).val();
                            reminders += ";";
                        }

                        var recordcountsample = $("#ddlActivities option:selected").data('samples');
                        for (a = 0; a < recordcountsample; a++) {

                            samples += $("#Sample" + a).val() + "|" + $("#Quantity" + a).val();
                            samples += ";";

                        }

                        var recordcountgift = $("#ddlActivities option:selected").data('gifts');
                        for (a = 0; a < recordcountgift; a++) {

                            gifts += $("#Gift" + a).val();
                            gifts += ";";

                        }

                        url = 'zsmhandler.ashx?method=updatecallplannermonth&activity=' + activity + '&starttime=' + starttime + '&endtime=' + endtime + '&doctor=' + doctor + '&description=' + Description + '&date=' + dateofday + '&id=' + cnt.currentEvent.id + "&bmd=" + bmd + "&products=" + products + "&reminders=" + reminders + "&samples=" + samples + "&gifts=" + gifts;
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
                                else if (e.Response == 'productsame') {
                                    alert("Products should not be same");
                                }
                                else if (e.Response == 'remindersame') {
                                    alert("Reminders should not be same");
                                }
                                else if (e.Response == 'productcontainselect') {
                                    alert("One of the product is not selected");
                                }
                                else if (e.Response == 'remindercontainselect') {
                                    alert("One of the reminder is not selected");
                                }
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
                                    eday.doctorname = doctorname;

                                    $('#dayCalender').fullCalendar('updateEvent', eday);
                                    $('#dayCalender').fullCalendar('renderEvent', eday, true);

                                    //                                    emonth.id = cnt.currentEvent.id;
                                    //                                    emonth.color = semisplit[6];
                                    //                                    emonth.textColor = semisplit[7];
                                    //                                    emonth.editable = cnt.currentEvent.editable;
                                    //                                    emonth.status = cnt.currentEvent.status;
                                    //                                    emonth.statusReason = cnt.currentEvent.statusReason;
                                    //                                    emonth.planmonth = cnt.currentEvent.planmonth;
                                    //                                    emonth.monthID = cnt.currentEvent.monthID;
                                    //                                    emonth.mioauthID = cnt.currentEvent.mioauthID;
                                    //                                    emonth.divid = cnt.currentEvent.divid;
                                    //                                    emonth.allDay = cnt.currentEvent.allDay;
                                    //                                    emonth.activityID = semisplit[0];
                                    //                                    emonth.doctorID = semisplit[1];
                                    //                                    emonth.start = semisplit[2];
                                    //                                    emonth.end = semisplit[3];
                                    //                                    emonth.description = semisplit[4];
                                    //                                    emonth.title = semisplit[5];
                                    //                                    emonth.classid = semisplit[8];
                                    //                                    emonth.brickid = semisplit[9];
                                    //                                    emonth.products = semisplit[10];
                                    //                                    emonth.reminders = semisplit[11];

                                    //                                    $('#calendar').fullCalendar('updateEvent', emonth);
                                    //                                    $('#calendar').fullCalendar('renderEvent', emonth, true); // make the event "stick
                                    $('#mask').hide();
                                    $('.window').hide();
                                }
                            }
                            else {
                            }
                        });
                    }
                }
            });
        });

        // Clears the fields
        function ClearAddFields() {
            $('#ddlActivities').val(-1);
            $('#ddlTimeStart').val(-1);
            $('#ddlTimeEnd').val(-1);
            $('#ddlDoctors').val(-1);
            $("#txtDescription").val('');
            $("#btnAdd").val('Add Event');
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
                var op = $("<option />").html(Activities[a].split(',')[1]).val(Activities[a].split(',')[0]).data("products", Activities[a].split(',')[2]).data("reminders", Activities[a].split(',')[3]).data("samples", Activities[a].split(',')[4]).data("gifts", Activities[a].split(',')[5]);
                ddl.append(op);
            }
            if (callBack != null)
                callBack();
        };
        // Populates the MIO Combo box in main screen
        PopulateMIOCombo = function (miolist, callBack, comboname, addselectoption) {
            var ddl = $("#" + comboname);
            ddl.children().remove();
            if (addselectoption == 'True') {
                ddl.append($("<option value='-1' />").html("Select"));
            }
            var N = miolist.length;
            for (var a = 0; a < N; a++) {
                var op = $("<option />").html(miolist[a].split(',')[2] + ' - ' + miolist[a].split(',')[1]).val(miolist[a].split(',')[0]);
                ddl.append(op);
            }
            if (callBack != null)
                callBack();
        };
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
        };
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
        };
        // Validates all the fields in Edit Event popup
        function ValidateFieldsZSM() {
            if ($('#ddlTimeStartpopup').val() == -1) {
                alert("Please Select Start Date");
                return false;
            }
            else if ($('#ddlTimeEndpopup').val() == -1) {
                alert("Please Select End Date");
                return false;
            }
                //            else if ($('#ddlMIOpopup').val() == 0) {
                //                alert("Please Select a Doctor");
                //                return false;
                //            }
            else if ($('#ddlMIOpopup').val() == -1) {
                if ($('#ddlActivitiesMainpopup option:selected').text() == "Meeting" || $('#ddlActivitiesMainpopup option:selected').text() == "Leave" || $('#ddlActivitiesMainpopup option:selected').text() == "Marketing Activity") {
                    return true;
                }
                else {

                    alert("Please Select a Med-Rep");
                    return false;
                }
            }
            else if ($('#ddlActivitiesMainpopup').val() == -1) {
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
        };
        CreateProductsDropDown = function () {
            // Used to create a new dropdown
            $('#tdProducts').attr("style", "display:none");
            $('#tdReminders').attr("style", "display:none");
            $('#tdSamples').attr("style", "display:none");
            $('#tdGift').attr("style", "display:none");
            $('#tdQuantitys').attr("style", "display:none");

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

            $("#Quantity0").text('');
            $("#Quantity1").text('');
            $("#Quantity2").text('');
            $("#Quantity3").text('');


            var ddlGift0 = $("#Gift0");
            ddlGift0.children().remove();
            ddlGift0.append($("<option value='-1' />").html("Select"));

            var ddlGift1 = $("#Gift1");
            ddlGift1.children().remove();
            ddlGift1.append($("<option value='-1' />").html("Select"));


            url = 'handler.ashx?method=fillproducts';
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
                        console.log(a);

                        var sm0 = $("<option />").html(Products[a].split(',')[1]).val(Products[a].split(',')[0]);
                        var sm1 = $("<option />").html(Products[a].split(',')[1]).val(Products[a].split(',')[0]);
                        var sm2 = $("<option />").html(Products[a].split(',')[1]).val(Products[a].split(',')[0]);
                        var sm3 = $("<option />").html(Products[a].split(',')[1]).val(Products[a].split(',')[0]);

                        ddlSample0.append(sm0);
                        ddlSample1.append(sm1);
                        ddlSample2.append(sm2);
                        ddlSample3.append(sm3);

                    }
                    return true;
                }
                else {
                    return false;
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


        };
        ShowProductsDropDown = function (ddlIndentifier, recordcount) {
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
        };
        // Creates the Calendar shown in Edit Event popup
        function createCalendar(date, zsm) {
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
                    var initialdate = $.fullCalendar.formatDate(date, "MM dd yyyy HH:mm:ss");
                    var url;
                    if (zsm == "zsm") {
                        url = 'zsmhandler.ashx?method=geteventszsm&initial=' + initialdate;
                    }
                    else {
                        url = 'zsmhandler.ashx?method=getevents&initial=' + initialdate;
                    }

                    $('#preloader2').show();
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
                                    doctorID: commaSplit[i].split(';')[23],
                                    description: commaSplit[i].split(';')[8],
                                    status: commaSplit[i].split(';')[9],
                                    statusReason: commaSplit[i].split(';')[10],
                                    planmonth: commaSplit[i].split(';')[11],
                                    activityID: commaSplit[i].split(';')[12],
                                    monthID: commaSplit[i].split(';')[13],
                                    mioauthID: commaSplit[i].split(';')[14],
                                    isJV: commaSplit[i].split(';')[17],
                                    products: commaSplit[i].split(';')[18],
                                    classid: commaSplit[i].split(';')[19],
                                    brickid: commaSplit[i].split(';')[20],
                                    reminders: commaSplit[i].split(';')[21],
                                    doctorname: commaSplit[i].split(';')[22],
                                    sampleqty: commaSplit[i].split(';')[24],
                                    gift: commaSplit[i].split(';')[25],
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
                            $('#btnzsmplan').attr("style", "display:block");
                        }
                        else {
                            $('#btnzsmplan').attr("style", "display:none");
                        }
                        $('#ddlActivitiesMainpopup').val(calEvent.activityID);
                        $('#ddlMIOpopup').val(calEvent.doctorID);

                        //var recordcount = $("#ddlActivities option:selected").data('products');
                        //ShowProductsDropDown("Products", recordcount);
                        //var remindercount = $("#ddlActivities option:selected").data('reminders');
                        //ShowProductsDropDown("Reminders", remindercount);
                        //var sampleqtycount = $("#ddlActivities option:selected").data('samples');
                        //ShowProductsDropDown("Samples", sampleqtycount);
                        //var giftscount = $("#ddlActivities option:selected").data('gifts');
                        //ShowProductsDropDown("Gift", giftscount);

                        //astricSplit = calEvent.products.split('*');
                        //for (j = 0; j < astricSplit.length; j++) {
                        //    $("#Products" + j).val(astricSplit[j]);
                        //}
                        //astricSplit = calEvent.reminders.split('*');
                        //for (j = 0; j < astricSplit.length; j++) {
                        //    $("#Reminders" + j).val(astricSplit[j]);
                        //}

                        //var sampleastricSplit = calEvent.samplesqty.split('*');
                        //for (j = 0; j < sampleastricSplit.length; j++) {
                        //    $("#Samples" + j).val(sampleastricSplit[j].split('|')[0]);

                        //    $("#tdQuantitys").attr("style", "display:block");
                        //    $("#Quantity" + j).attr("style", "display:inline");
                        //    $("#Quantity" + j).val(sampleastricSplit[j].split('|')[1]);
                        //}

                        //var giftastricSplit = calEvent.gifts.split('*');
                        //for (j = 0; j < giftastricSplit.length; j++) {
                        //    $("#Gift" + j).val(giftastricSplit[j]);
                        //}

                        ls = $.fullCalendar.formatDate(calEvent.start, "MM dd yyyy HH:mm:ss");
                        le = $.fullCalendar.formatDate(calEvent.end, "MM dd yyyy HH:mm:ss");

                        var url = 'zsmhandler.ashx?method=fillbmd';
                        GetResponse(url, function (e) {
                            if (e.Success) {
                                if (e.Response != '') {
                                    bmds = e.Response.split(';');
                                    var ddl = $("#" + "ddlBMD1");
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
                        if (calEvent.title == 'BMD') {

                            var url = 'zsmhandler.ashx?method=getbmdformio&mioid=' + calEvent.id;
                            GetResponse(url, function (e) {
                                if (e.Success) {
                                    if (e.Response != '') {
                                        $("#ddlBMD1").val(e.Response);
                                    }
                                }
                            });
                            $('#divBMD1').attr("style", "display:block");
                        }
                        else {
                            $('#divBMD1').attr("style", "display:none");
                        }

                        $('#ddlTimeStartpopup').val(ls.substring(ls.length - 8, ls.length));
                        $('#ddlTimeEndpopup').val(le.substring(le.length - 8, le.length));
                        $('#ddlDoctors').val(calEvent.doctorID);
                        $('#ddlClasses').val(calEvent.classid);
                        $('#ddlBricks').val(calEvent.brickid);
                        $('#txtDescription').val(calEvent.description);

                        if (calEvent.status == 'Rejected' || calEvent.status == 'Resubmitted') {
                            $('#ulRejectComments1').attr("style", "display:block");
                            $('#txtRejectComments1').val(calEvent.statusReason);
                        }
                        else {
                            $('#ulRejectComments1').attr("style", "display:none");
                            $('#txtRejectComments1').val('');
                        }

                        $('#btnzsmplan').val('Update Selected Event');
                        cnt.currentEvent = calEvent;
                    }
                },

                eventMouseover: function (calEvent, jsEvent, view) {

                    var cp = $("#" + calEvent.id + calEvent.divid + "tcp");
                    cp.html('<div style="float:right; cursor:pointer; padding-right:5px; padding-left:5px;"> X </div>');
                    cp.click(function () {
                        eclick = false;
                        var url = 'handler.ashx?method=delevent&id=' + calEvent.id;
                        GetResponse(url, function (e) {
                            if (e.Success) {
                                daycalender.fullCalendar('removeEvents', calEvent.id);
                                calendar.fullCalendar('removeEvents', calEvent.id); // make the event "stick"
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

        // Creates the Calendar for the selected MIO
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
                    $('#lblStatusCaption').html('Selected SPO/TM/STM Plan Status');
                    $('#spanStatus').html('');
                    $('#labelStatusColor').attr("class", "red1");
                    $('#txtmainComments').val('');
                    if ($('#calendar').fullCalendar('getView').name == 'month') {
                        var initialdate = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                        if (activityid == 0) {
                            var url = 'zsmhandler.ashx?method=geteventssummary&mioid=' + employeeid + '&initial=' + initialdate;
                        }
                        else {
                            var url = 'zsmhandler.ashx?method=geteventssummarybyactivityid&mioid=' + employeeid + '&actid=' + activityid + '&initial=' + initialdate;
                        }
                        $('#preloader').show();
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
                                    $('#txtmainComments').val(commaSplit[i].split(';')[8]);
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
                            $('#preloader').hide();
                        });

                    }
                    else {
                        var initialdate = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                        if (activityid == 0) {
                            url = 'zsmhandler.ashx?method=getevents&mioid=' + employeeid + '&initial=' + initialdate;
                        }
                        else {
                            url = 'zsmhandler.ashx?method=geteventsbyactivityid&mioid=' + employeeid + '&actid=' + activityid + '&initial=' + initialdate;
                        }
                        $('#preloader').show();
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
                                    if (commaSplit[i].split(';')[15] == 'Rejected' || commaSplit[i].split(';')[15] == 'Resubmitted') {
                                        $('#txtmainComments').val(commaSplit[i].split(';')[10]);
                                    }

                                    if ($('#calendar').fullCalendar('getView').name == 'agendaDay') {
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
                                            isJV: commaSplit[i].split(';')[17],
                                            products: commaSplit[i].split(';')[18],
                                            classid: commaSplit[i].split(';')[19],
                                            brickid: commaSplit[i].split(';')[20],
                                            reminders: commaSplit[i].split(';')[21],
                                            doctorname: commaSplit[i].split(';')[22] + '  DocBrick  -' + commaSplit[i].split(';')[25],
                                            DocBrick: commaSplit[i].split(';')[25],
                                            sampleqty: commaSplit[i].split(';')[23],
                                            gifts: commaSplit[i].split(';')[24],
                                            zsmisedit: dollarsplit[1].split(';')[2],
                                            divid: 'mainday',
                                            allDay: false
                                            // will be parsed
                                        });
                                    }

                                    else {
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
                                            doctorname: commaSplit[i].split(';')[15],
                                            isJV: commaSplit[i].split(';')[17],
                                            products: commaSplit[i].split(';')[18],
                                            classid: commaSplit[i].split(';')[19],
                                            brickid: commaSplit[i].split(';')[20],
                                            reminders: commaSplit[i].split(';')[21],
                                            doctorname: commaSplit[i].split(';')[22] + '  DocBrick  -' + commaSplit[i].split(';')[25],
                                            DocBrick: commaSplit[i].split(';')[25],
                                            sampleqty: commaSplit[i].split(';')[23],
                                            gifts: commaSplit[i].split(';')[24],
                                            zsmisedit: dollarsplit[1].split(';')[2],
                                            divid: 'mainweek',
                                            allDay: false
                                            // will be parsed
                                        });
                                    }
                                    i++;
                                    rowCount--;
                                }
                                callback(events);
                                calendar.fullCalendar('renderEvent', events, true); // make the event "stick"
                            }
                            else {
                            }
                            $('#preloader').hide();
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

                            if (calEvent.zsmisedit == 'False') {
                                $('#btnAddZSM').attr("style", "display:none");
                            }
                            else {
                                $('#btnAddZSM').attr("style", "display:block");
                            }

                            $('#divEventDetails').attr("style", "display:none");

                            //var id = $('a[name=modalZSM]').attr('href');

                            //Get the screen height and width
                            var maskHeight = $(document).height();
                            var maskWidth = $(window).width();

                            //Set heigth and width to mask to fill up the whole screen
                            //$('#mask').css({ 'width': maskWidth, 'height': maskHeight });

                            //transition effect	

                            //Stopped To Show --Arsal
                            //$('#mask').fadeIn();
                            // $('#mask').fadeTo("fast", 0.8);

                            //Get the window height and width
                            var winH = $(window).height();
                            var winW = $(window).width();
                            // 
                            //Set the popup window to center

                            //$(id).css('top', winH / 12 - $(id).height() / 12);
                            //$(id).css('left', winW / 2 - $(id).width() / 2);
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


                            if (calEvent.status == "Rejected") {
                                $("#txtRejectComments").val(calEvent.statusReason);
                                $('#chkReject').attr('checked', 'checked');
                                checkreject = true;
                            }
                            //else {
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
                            //}
                            $(id).fadeIn();
                        }
                    }
                },

                eventMouseover: function (calEvent, jsEvent, view) {
                    // check to see if the plan is approved or rejected
                    if (view.name != 'month') {
                        //if (calEvent.status != 'Rejected' && calEvent.status != 'Approved') {
                        if (calEvent.status != 'Rejected' && calEvent.status != 'Approved') {
                            var cp = $("#" + calEvent.id + calEvent.divid + "tcp");
                            cp.html('<div style="float:right; cursor:pointer; padding-right:5px; padding-left:5px;"> X </div>');
                            cp.click(function () {
                                eclick = false;
                                var url = 'zsmhandler.ashx?method=delevent&id=' + calEvent.id;
                                GetResponse(url, function (e) {
                                    if (e.Success) {
                                        calendar.fullCalendar('removeEvents', calEvent.id);
                                    }
                                    else {
                                    }
                                });
                                return;
                            });
                        }

                        var editbox = $("#" + calEvent.id + calEvent.divid + "edit");
                        if (calEvent.status != 'Rejected' && calEvent.status != 'Approved') {
                            editbox.html('<div style="float:right; cursor:pointer; padding-right:5px; padding-left:5px;"> E </div>');
                            $('#btnAdd').attr("style", "display:block");
                        }
                        else {
                            editbox.html('<div style="float:right; cursor:pointer; padding-right:5px; padding-left:5px;"> V </div>');
                            $('#btnAdd').attr("style", "display:none");
                        }

                        editbox.click(function () {


                            $('#preloader2').show();
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
                                        $(id).css('top', 0.5);
                                        $(id).css('left', winW / 2 - $(id).width() / 2);

                                        // Used to create a new dropdown
                                        $('#tdProducts').attr("style", "display:none");
                                        $('#tdReminders').attr("style", "display:none");
                                        $('#tdSamples').attr("style", "display:none");
                                        $('#tdGifts').attr("style", "display:none");
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

                                        var ddlSample0 = $("#Samples0");
                                        ddlSample0.children().remove();
                                        ddlSample0.append($("<option value='-1' />").html("Select"));


                                        var ddlSample1 = $("#Samples1");
                                        ddlSample1.children().remove();
                                        ddlSample1.append($("<option value='-1' />").html("Select"));


                                        var ddlSample2 = $("#Samples2");
                                        ddlSample2.children().remove();
                                        ddlSample2.append($("<option value='-1' />").html("Select"));

                                        var ddlSample3 = $("#Samples3");
                                        ddlSample2.children().remove();
                                        ddlSample2.append($("<option value='-1' />").html("Select"));

                                        url = 'handler.ashx?method=fillproducts';
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
                                                var url = 'handler.ashx?method=getactivities';
                                                GetResponse(url, function (e) {

                                                    if (e.Success) {
                                                        try {
                                                            PopulateActivitiesCombo(e.Response.split(';'), null, "ddlActivities", "True");
                                                            $('#ddlActivities').val(calEvent.activityID);
                                                            var recordcount = $("#ddlActivities option:selected").data('products');
                                                            var remindercount = $("#ddlActivities option:selected").data('reminders');
                                                            var samplecount = $("#ddlActivities option:selected").data('samples');
                                                            var giftcount = $("#ddlActivities option:selected").data('gifts');
                                                            ShowProductsDropDown("Products", recordcount);
                                                            ShowProductsDropDown("Reminders", remindercount);
                                                            ShowProductsDropDown("Samples", samplecount);
                                                            ShowProductsDropDown("Quantity", samplecount);
                                                            ShowProductsDropDown("Gift", giftcount);

                                                            astricSplit = calEvent.products.split('*');
                                                            var k = 0;
                                                            for (j = 0; j < astricSplit.length; j++) {
                                                                $("#Products" + j).val(astricSplit[j]);
                                                                k++;
                                                            }
                                                            astricSplit = calEvent.reminders.split('*');
                                                            for (j = 0; j < astricSplit.length; j++) {
                                                                $("#Reminders" + j).val(astricSplit[j]);
                                                                k++;
                                                            }

                                                            var sampleastricSplit = calEvent.samplenameqty.split('*');
                                                            for (j = 0; j < sampleastricSplit.length; j++) {
                                                                $("#Sample" + j).val(sampleastricSplit[j].split('|')[0]);
                                                                $("#Quantity" + j).val(sampleastricSplit[j].split('|')[1]);
                                                            }

                                                            var giftastricSplit = calEvent.gifts.split('*');
                                                            for (j = 0; j < giftastricSplit.length; j++) {
                                                                $("#Gift" + j).val(giftastricSplit[j]);
                                                            }
                                                        }
                                                        catch (e) {
                                                        }
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

                                                var url = 'zsmhandler.ashx?method=fillclasses&mioid=' + currentmioid;
                                                GetResponse(url, function (e) {

                                                    if (e.Success) {
                                                        PopulateClassesCombo(e.Response.split(';'));
                                                        $('#ddlClasses').val(calEvent.classid);
                                                    }
                                                });

                                                var url = 'zsmhandler.ashx?method=fillbricks&mioid=' + currentmioid;
                                                GetResponse(url, function (e) {

                                                    if (e.Success) {
                                                        PopulateBricksCombo(e.Response.split(';'));
                                                        $('#ddlBricks').val(calEvent.brickid);
                                                    }
                                                });

                                                $(id).fadeIn();

                                                var url = 'zsmhandler.ashx?method=fillbmd';
                                                GetResponse(url, function (e) {
                                                    if (e.Success) {

                                                        if (e.Response != '') {
                                                            bmds = e.Response.split(';');
                                                            var ddl = $("#" + "ddlBMD1");
                                                            ddl.children().remove();
                                                            ddl.append($("<option value='-1' />").html("Select"));
                                                            var N = bmds.length;
                                                            for (var a = 0; a < N; a++) {
                                                                var op = $("<option />").html(bmds[a].split(',')[2] + ' - ' + bmds[a].split(',')[1]).val(bmds[a].split(',')[0]).data('bmdname', bmds[a].split(',')[1]);
                                                                ddl.append(op);
                                                            }

                                                            if (calEvent.title == 'BMD') {

                                                                var url = 'zsmhandler.ashx?method=getbmdformio&mioid=' + calEvent.id;
                                                                GetResponse(url, function (e) {
                                                                    if (e.Success) {
                                                                        if (e.Response != '') {
                                                                            $("#ddlBMD1").val(e.Response);
                                                                        }
                                                                    }
                                                                });
                                                                $('#divBMD1').attr("style", "display:block");
                                                            }
                                                            else {
                                                                $('#divBMD1').attr("style", "display:none");
                                                            }
                                                        }
                                                    }
                                                });
                                                $('#dayCalender').html('');
                                                createCalendar(calEvent.start);
                                                $('#txtDescription').val(calEvent.description);

                                                if (calEvent.status == 'Rejected' || calEvent.status == 'Resubmitted') {
                                                    $('#ulRejectComments1').attr("style", "display:block");
                                                    $('#txtRejectComments1').val(calEvent.statusReason);
                                                }
                                                else {
                                                    $('#ulRejectComments1').attr("style", "display:none");
                                                    $('#txtRejectComments1').val('');
                                                }

                                                $('#btnAdd').val('Update Selected Event');
                                                cnt.currentEvent = calEvent;

                                            }
                                        });
                                    }
                                }
                                $('#preloader2').hide();
                            }
                        });
                        //}
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
                    var day = $.fullCalendar.formatDate(date, "MM dd yyyy HH:mm:ss");
                    var url = 'handler.ashx?method=checkholidays&initial=' + day;
                    GetResponse(url, function (e) {
                        if (e.Success) {
                            if (e.Response != "present") {
                                if (view.name == 'month') {
                                    $('#calendar').fullCalendar('changeView', 'agendaWeek');
                                    $('#calendar').fullCalendar('gotoDate', date);
                                    $('#calendar').fullCalendar('rerenderEvent');
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
                    $('#EmployeeName').html(e.Response); //+ " (ZSM Plan)"
                }
            });

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
                    var initialdate = $.fullCalendar.formatDate($('#calendar').fullCalendar('getDate'), "MM dd yyyy HH:mm:ss");
                    if (actid == 0) {
                        url = 'zsmhandler.ashx?method=getzsmevents&zsmid=' + employeeid + '&initial=' + initialdate;
                    }
                    else {
                        url = 'zsmhandler.ashx?method=getzsmeventsbyactivityid&zsmid=' + employeeid + '&actid=' + actid + '&initial=' + initialdate;
                    }
                    $('#preloader').show();
                    GetResponse(url, function (e) {
                        if (e.Success) {
                            var dollarSplit = e.Response.split('$');
                            var commaSplit = dollarSplit[0].split(',');
                            rowCount = commaSplit.length; // total count of records returned
                            var i = 0;
                            var events = [];
                            if (dollarSplit[1].split(';')[0] != '') {
                                $('#spanStatus').html(dollarSplit[1].split(';')[0]);
                                $('#labelStatusColor').attr("class", dollarSplit[1].split(';')[1]);
                                $('#labelStatusColor').attr("style", "height:23;");
                            }
                            while (rowCount > 0) {
                                if ($('#calendar').fullCalendar('getView').name == 'month') {
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
                                        miostatus: commaSplit[i].split(';')[9],
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
                                        zsmreason: commaSplit[i].split(';')[21],
                                        zsmisedit: commaSplit[i].split(';')[22],
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
                                }
                                else if ($('#calendar').fullCalendar('getView').name == 'agendaDay') {
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
                                        miostatus: commaSplit[i].split(';')[9],
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
                                        zsmreason: commaSplit[i].split(';')[21],
                                        zsmisedit: commaSplit[i].split(';')[22],
                                        doctorname: commaSplit[i].split(';')[23],
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


                                }
                                else {
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
                                        miostatus: commaSplit[i].split(';')[9],
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
                                        zsmreason: commaSplit[i].split(';')[24],
                                        zsmisedit: commaSplit[i].split(';')[22],
                                        doctorname: commaSplit[i].split(';')[23],
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
                                }
                                i++;
                                rowCount--;
                            }
                            callback(events);
                            calendar.fullCalendar('renderEvent', events, true); // make the event "stick"
                        }
                        else {
                        }
                        $('#preloader').hide();
                    });
                },
                timeFormat: 'HH:mm',
                eventClick: function (calEvent, jsEvent, view) {

                    if (eclick) {



                        if (calEvent.zsmisedit == 'False') {
                            $('#btnAddZSM').attr("style", "display:none");
                        }
                        else {
                            $('#btnAddZSM').attr("style", "display:block");
                        }

                        $('#divEventDetails').attr("style", "display:block");

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

                        if (calEvent.zsmstatus == "Rejected") {
                            $('#ulRejectComments2').attr("style", "display:block");
                            $('#txtRejectComments2').val(calEvent.zsmreason);
                        }
                        else {
                            $('#ulRejectComments2').attr("style", "display:none");
                            $('#txtRejectComments2').val('');
                        }

                        if (calEvent.miostatus == "Rejected") {
                            $("#txtRejectComments").val(calEvent.statusReason);
                            $('#chkReject').attr('checked', 'checked');
                            checkreject = true;
                        }
                        else {
                            $("#txtRejectComments").val("");
                            $('#chkReject').attr('checked', false);
                            checkreject = false;
                        }

                        var url = 'zsmhandler.ashx?method=checkzsm&mioid=' + calEvent.id + '&rejected=' + calEvent.miostatus;
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

                        $(id).fadeIn();
                    }
                },

                eventMouseover: function (calEvent, jsEvent, view) {

                    if (calEvent.zsmisedit != 'False') {
                        var cp = $("#" + calEvent.id + calEvent.divid + "tcp");
                        cp.html('<div style="float:right; cursor:pointer; padding-right:5px; padding-left:5px;"> X </div>'); //Month View
                        cp.click(function () {
                            eclick = false;
                            var url = 'zsmhandler.ashx?method=deleventbyzsmid&id=' + calEvent.zsmid;
                            GetResponse(url, function (e) {
                                if (e.Success) {
                                    calendar.fullCalendar('removeEvents', calEvent.id);
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
                    //            alert('Sindhi Proved');
                    //var day = $.fullCalendar.formatDate(date, "MM dd yyyy HH:mm:ss");
                    day = $.fullCalendar.formatDate(date, "MM dd yyyy HH:mm:ss");
                    var url = 'handler.ashx?method=checkholidays&initial=' + day;
                    GetResponse(url, function (e) {
                        if (e.Success) {
                            if (e.Response != "present") {
                                if (view.name == 'month') {
                                    $('#calendar').fullCalendar('changeView', 'agendaWeek');
                                    $('#calendar').fullCalendar('gotoDate', date);
                                    $('#calendar').fullCalendar('rerenderEvent');
                                }
                            }
                        }
                        else {
                        }
                    });

                    day = $.fullCalendar.formatDate(date, "MM dd yyyy HH:mm:ss");
                    if (view.start.getMonth() == date.getMonth()) {
                        if ($('#spanStatus').html() == "Approved" || $('#spanStatus').html() == "Submitted" || $('#spanStatus').html() == "Resubmitted") {
                            $('#btnzsmplan').attr("style", "display:none")
                        }
                        else {
                            $('#btnzsmplan').attr("style", "display:block");
                        }
                        var id = $('a[name=modalAdd2]').attr('href');

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

                        //transition effect
                        $(id).fadeIn();
                        $('#dayCalender').html('');
                        createCalendar(date, "zsm");

                        url = 'zsmhandler.ashx?method=getmios';
                        var mios;
                        GetResponse(url, function (e) {
                            if (e.Success) {
                                mios = e.Response.split(";");
                                PopulateMIOCombo(mios, null, "ddlMIOpopup", "True");
                            }
                            else {
                            }
                        });
                        url = 'zsmhandler.ashx?method=getactivities';
                        var acts;
                        GetResponse(url, function (e) {
                            if (e.Success) {
                                acts = e.Response.split(";");
                                PopulateActivitiesCombo(acts, null, "ddlActivitiesMainpopup", "True");
                            }
                            else {
                            }
                        });
                        var url = 'handler.ashx?method=gettime';
                        GetResponse(url, function (e) {
                            if (e.Success) {
                                PopulateTimeCombos(e.Response.split(';'), null, "ddlTimeStartpopup");
                                PopulateTimeCombos(e.Response.split(';'), null, "ddlTimeEndpopup");
                                ls = $.fullCalendar.formatDate(calEvent.start, "MM dd yyyy HH:mm:ss");
                                le = $.fullCalendar.formatDate(calEvent.end, "MM dd yyyy HH:mm:ss");
                                $('#ddlTimeStartpopup').val(ls.substring(ls.length - 8, ls.length));
                                $('#ddlTimeEndpopup').val(le.substring(le.length - 8, le.length));
                            }
                        });
                        //start
                        // if the update/Add button of Edit Event Popup is pressed


                        //end
                        if (allDay) {
                        } else {
                        }
                    }
                },
                disableResizing: true,
                disableDragging: true
            });

            $('#btnzsmplan').click(function () {
                var sZSM = ValidateFieldsZSM();
                if (sZSM) {
                    //dateofday = $.fullCalendar.formatDate(calEvent.start, "MM dd yyyy HH:mm:ss");
                    //var day = $.fullCalendar.formatDate(calEvent.start, "MM dd yyyy HH:mm:ss");
                    var activity = $('#ddlActivitiesMainpopup').val();
                    var starttime = $('#ddlTimeStartpopup').val();
                    var endtime = $('#ddlTimeEndpopup').val();
                    var MIOid = $('#ddlMIOpopup').val();

                    if ($('#ddlActivitiesMainpopup option:selected').text() == "Meeting") {
                        MIOid = "Doc-2";
                    }
                    else if ($('#ddlActivitiesMainpopup option:selected').text() == "Leave") {
                        MIOid = "Doc-3";
                    }
                    else if ($('#ddlActivitiesMainpopup option:selected').text() == "Marketing Activity") {
                        MIOid = "Doc-4";
                    }


                    else {
                        MIOid = MIOid;
                    }
                    if ($('#btnzsmplan').val() == 'Add Event') {
                        url = 'ZSMhandler.ashx?method=insertcallplannermonth&activity=' + activity + '&starttime=' + starttime + '&endtime=' + endtime + '&mioid=' + MIOid + '&date=' + day + '&month=' + cnt.month;
                        cnt.GetResponse(url, function (e) {
                            if (e.Success) {
                                var response = e.Response.split('^');
                                var alertResponse = '';
                                var successCount = 0;

                                for (i = 0; i < response.length; i++) {
                                    var response2 = response[i].split(';');
                                    if (response2[0] == 'outofrange') {
                                        //alert("Time range already Exists");
                                        alertResponse = alertResponse + ' (Time range already exists)\n';
                                    }
                                    else if (response2[0] == 'datediff') {
                                        //alert("End date must be greater than Start Date");
                                        alertResponse = "End date must be greater than Start Date";
                                    }
                                    else if (response2[0] == 'classfrequencyexceeded') {
                                        //alert("You have already plan for this doctor class");
                                        alertResponse = alertResponse + response2[1] + ' (You have already plan for this doctor class)\n';
                                    }
                                    else {
                                        //ClearAddFields();
                                        $('#btnzsmplan').val('Add Event');
                                        var semisplit = response[i].split(';');
                                        //alert("kuty");
                                        //cnt.ClearAddFields();
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
                                        eday.doctorname = semisplit[15];
                                        $('#dayCalender').fullCalendar('renderEvent', eday, true);
                                        calendar.fullCalendar('refetchEvents');

                                        alertResponse = 'Events added sucessfully\n ' + alertResponse;
                                    }
                                }

                                alert(alertResponse);
                                alertResponse = "";

                            }

                            else {
                            }
                        });
                    }
                    else if ($('#btnzsmplan').val() == 'Update Selected Event') {

                        url = 'ZSMhandler.ashx?method=updatecallplannermonth&activity=' + activity + '&starttime=' + starttime + '&endtime=' + endtime + '&mioid=' + MIOid + '&date=' + day + '&month=' + cnt.month + '&id=' + cnt.currentEvent.id;

                        cnt.GetResponse(url, function (e) {
                            if (e.Success) {
                                var response = e.Response.split('^');
                                var alertResponse = '';
                                var successCount = 0;

                                for (i = 0; i < response.length; i++) {
                                    var response2 = response[i].split(';');
                                    if (response2[0] == 'outofrange') {
                                        //alert("Time range already Exists");
                                        alertResponse = alertResponse + ' (Time range already exists)\n';
                                    }
                                    else if (response2[0] == 'datediff') {
                                        //alert("End date must be greater than Start Date");
                                        alertResponse = "End date must be greater than Start Date";
                                    }
                                    else if (response2[0] == 'classfrequencyexceeded') {
                                        //alert("You have already plan for this doctor class");
                                        alertResponse = alertResponse + response2[1] + ' (You have already plan for this doctor class)\n';
                                    }
                                    else {
                                        //ClearAddFields();
                                        $('#btnzsmplan').val('Add Event');
                                        var semisplit = response[i].split(';');
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
                                        eday.doctorname = semisplit[15];
                                        $('#dayCalender').fullCalendar('renderEvent', eday, true);
                                        calendar.fullCalendar('refetchEvents');

                                        alertResponse = 'Events added sucessfully' + alertResponse;
                                    }
                                }

                                alert(alertResponse);
                                alertResponse = "";

                            }

                            else {
                            }
                        });
                        //cnt.GetResponse(url, function (e) {

                        //    if (e.Success) {
                        //        if (e.Response == 'outofrange') {
                        //            alert("Time range already Exists");
                        //        }
                        //        else if (e.Response == 'datediff') {
                        //            alert("End date must be greater than Start Date");
                        //        }
                        //        else if (e.Response == 'classfrequencyexceeded') {
                        //            alert("You have already plan for this doctor class");
                        //        }
                        //        else if (e.Response == 'productsame') {
                        //            alert("Products should not be same");
                        //        }
                        //        else if (e.Response == 'remindersame') {
                        //            alert("Reminders should not be same");
                        //        }
                        //        else if (e.Response == 'samplesame') {
                        //            alert("Samples should not be same");
                        //        }
                        //        else if (e.Response == 'giftsame') {
                        //            alert("Gifts should not be same");
                        //        }
                        //        else if (e.Response == 'productcontainselect') {
                        //            alert("One of the product is not selected");
                        //        }
                        //        else if (e.Response == 'remindercontainselect') {
                        //            alert("One of the reminder is not selected");
                        //        }
                        //        else {
                        //            var semisplit = e.Response.split(';');
                        //            ClearAddFields();
                        //            var eday = [];
                        //            var emonth = [];
                        //            eday.id = cnt.currentEvent.id;
                        //            eday.color = semisplit[6];
                        //            eday.textColor = semisplit[7];
                        //            eday.editable = cnt.currentEvent.editable;
                        //            eday.status = cnt.currentEvent.status;
                        //            eday.statusReason = cnt.currentEvent.statusReason;
                        //            eday.planmonth = cnt.currentEvent.planmonth;
                        //            eday.monthID = cnt.currentEvent.monthID;
                        //            eday.mioauthID = cnt.currentEvent.mioauthID;
                        //            eday.divid = cnt.currentEvent.divid;
                        //            eday.allDay = cnt.currentEvent.allDay;
                        //            eday.activityID = semisplit[0];
                        //            eday.doctorID = semisplit[1];
                        //            eday.start = semisplit[2];
                        //            eday.end = semisplit[3];
                        //            eday.description = semisplit[4];
                        //            eday.title = semisplit[5];
                        //            eday.classid = semisplit[8];
                        //            eday.brickid = semisplit[9];
                        //            eday.products = semisplit[10];
                        //            eday.reminders = semisplit[11];
                        //            eday.samplesqty = semisplit[12];
                        //            eday.gifts = semisplit[13];
                        //            eday.doctorname = doctorname;
                        //            //eday.calid = 'mio';
                        //            calendar.fullCalendar('refetchEvents');
                        //            //$('#dayCalender').fullCalendar('refetchEvents');
                        //            $('#dayCalender').fullCalendar('updateEvent', eday);
                        //            $('#dayCalender').fullCalendar('renderEvent', eday, true);
                        //            alert("Record has been updated");
                        //        }
                        //    }
                        //    else {
                        //    }
                        //    $('#ddlBMD').val(-1);
                        //});
                        if (cnt.currentEvent.status == 'Resubmitted') {
                            $('#mask').hide();
                            $('.window').hide();
                        }
                    }
                }
            });
        }
    </script>
    <style type="text/css">
        body
        {
            margin-top: 40px;
            text-align: left;
            font-size: 14px;
            font-family: "Lucida Grande" ,Helvetica,Arial,Verdana,sans-serif;
        }
        
        a
        {
            color: #333;
            text-decoration: none;
        }
        
        a:hover
        {
            color: #ccc;
            text-decoration: none;
        }
        
        #mask
        {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 9000;
            background-color: #000;
            display: none;
        }
        
        #boxes .window
        {
            position: fixed;
            left: 0;
            top: 0;
            width: 440px;
            height: 200px;
            display: none;
            z-index: 9999;
            padding: 20px;
        }
        
        #boxes #dialog
        {
            width: 375px;
            height: 203px;
            padding: 10px;
            background-color: #ffffff;
        }
        
        #boxes #dialog1
        {
            width: 375px;
            height: 203px;
        }
        
        #dialog1 .d-header
        {
            background: url(images/login-header.png) no-repeat 0 0 transparent;
            width: 375px;
            height: 150px;
        }
        
        #dialog1 .d-header input
        {
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
        
        #dialog1 .d-blank
        {
            float: left;
            background: url(images/login-blank.png) no-repeat 0 0 transparent;
            width: 267px;
            height: 53px;
        }
        
        #dialog1 .d-login
        {
            float: left;
            width: 108px;
            height: 53px;
        }
        
        #boxes #dialog2
        {
            background: url(images/notice.png) no-repeat 0 0 transparent;
            width: 326px;
            height: 229px;
            padding: 50px 0 20px 25px;
        }
               
        #calendar
        {
            width: 900px;
            margin: 0 auto;
        }
        
        a
        {
            color: #333;
            text-decoration: none;
        }
        
        a:hover
        {
            color: #ccc;
            text-decoration: none;
        }
        
        #mask
        {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 9000;
            background-color: #000;
            display: none;
        }
        
        #boxes .window
        {
            position: fixed;
            left: 0px;
            top: 0px;
            width: 900px;
            height: 200px;
            display: none;
            z-index: 9999;
        }
        
        #boxes .windowleft
        {
            float: left;
            left: 0;
            top: 0;
            width: 400px;
            z-index: 9999;
            padding: 20px;
        }
        
        #boxes .windowright
        {
            float: left;
            left: 0;
            top: 0;
            width: 400px;
            z-index: 9999;
            padding: 20px;
        }
        
        
        #boxes #dialog
        {
            width: 375px;
            height: 203px;
            padding: 10px;
            background-color: #ffffff;
        }
        
        #boxes #dialog1
        {
            width: 375px;
            height: 203px;
        }
        
        #dialog1 .d-header
        {
            background: url(images/login-header.png) no-repeat 0 0 transparent;
            width: 375px;
            height: 150px;
        }
        
        #dialog1 .d-header input
        {
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
        
        #dialog1 .d-blank
        {
            float: left;
            background: url(images/login-blank.png) no-repeat 0 0 transparent;
            width: 267px;
            height: 53px;
        }
        
        #dialog1 .d-login
        {
            float: left;
            width: 108px;
            height: 53px;
        }
        
        #boxes #dialog2
        {
            background: url(images/notice.png) no-repeat 0 0 transparent;
            width: 326px;
            height: 229px;
            padding: 50px 0 20px 25px;
        }
        
        #preloader
        {
            display: none;
        }
        
        #preloader2
        {
            display: none;
        }
    </style>
    <div id="content">
        <div id="preloader" class="loadingdivOuter">
            <img src="Images/loading2.gif" alt="Please Wait" title="Please Wait" />
            <br />
            Please wait
        </div>
        <div class="page_heading_no_icon">
            <%--<h1> Month view of ZSM </h1>--%>
        </div>
        <div class="content_inner">
            <div class="status_area">
                <div class="row">
                    <label id="lblStatusCaption">
                        Plan Status</label>
                    <label id="labelStatusColor" class="red1">
                        <span id="spanStatus"></span>
                    </label>
                </div>
                <div class="clear">
                </div>
                <div class="row" style="display: none">
                    <label id="lblRejectComments">
                        Reject Comments:
                    </label>
                    <span id="spanRejectComments"></span>
                </div>
                <div class="clear">
                </div>
            </div>
            <div class="inner-left">
                <div class="bottom_area">
                    <div id='divmyplan' style="cursor: pointer;">
                        <input type="button" class="btn blank_large" value="Click to View My Plan" name="" id="" />
                    </div>
                    <div class="clear">
                    </div>
                </div>
                <div class="clear">
                </div>
                <div class="user_list">
                    <div style="border-left: solid 1px #D8D0C9;">
                        <table border="0" cellpadding="0" cellspacing="0" class="morning_view" width="100%"
                            style="border-width: 0px; border-collapse: collapse;">
                            <tr>
                                <th>
                                    SPO/TM/STM List
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
                    <div class="clear">
                    </div>
                </div>
                <div class="clear">
                </div>
                <div class="user_list">
                    <div style="border-left: solid 1px #D8D0C9;">
                        <table border="0" cellpadding="0" cellspacing="0" class="morning_view" width="100%"
                            style="border-width: 0px; border-collapse: collapse;">
                            <tr>
                                <th>
                                    Filter by Activity
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
                    <div class="clear">
                    </div>
                </div>
                <div class="clear">
                </div>
            </div>
            <div class="inner-right">
                <div class="calender">
                    <div class="CalenderHeading">
                        <span id="EmployeeName"></span>
                    </div>
                    <div id='calendar'>
                    </div>
                    <div class="clear">
                    </div>
                    <div class="comment_area">
                        <span id="spantxtmainComments" style="display: none">
                            <label for="comment">
                                Comments:
                            </label>
                            <textarea rows="" cols="" id="txtmainComments" class="styledtextarea"></textarea>
                        </span>
                        <div class="clear">
                        </div>
                        <input id="btnApproval" type="button" class="btn blank_large" value="Send Approval to RSM"
                            style="display: none" />
                        <input id="btnApprove" type="button" class="btn blank_large" value="Approve Selected SPO/TM/STM Plan"
                            style="display: none" />
                        <input id="btnReject" type="button" class="btn blank_large" value="Reject Selected SPO/TM/STM Plan"
                            style="display: none" />
                        <input id="btnPlanStatus" type="button" class="btn blank_large" value="Current Month Plan Status" style="display: none" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <a href="#dialog1" name="modal"></a>
    <%--<a href="#dialog2" name="modal">Sticky Note</a>--%>
    <a href="#DivAdd" name="modalAdd"></a><a href="#DivZSM" name="modalZSM"></a><a href="#DivAdd2"
        name="modalAdd2"></a><a href="#DivZSM2" name="modalZSM2"></a>
    <div id="boxes">
        <div id="dialog" class="window">
            <a href="#" class="close">Close it</a>
        </div>
        <div id="DivZSM" class="window">
            <div class="windowleft">
                <div class="persoanl-data">
                    <div class="inner-head">
                        Joint Visit</div>
                    <div class="inner-left">
                        <ul class="form_list">
                            <li id="divBMD" style="display: none">BMD Coordinator
                                <br />
                                <select id="ddlBMD" class="styledselect_form_3">
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
                                Uninformed </li>
                        </ul>
                        <ul class="form_list">
                            <li>Reject this activity
                                <input id="chkReject" type="checkbox" 
                                onclick="checkreject = this.checked; var x = document.getElementById('txtRejectComments'); if (this.checked) { x.disabled = false; } else {
    x.disabled = true; x.value = '';
}" />
                            </li>
                            <li>Comments
                                <br />
                                <textarea id="txtRejectComments" rows="4" cols="40" disabled="disabled" class="styledtextarea_2">
                    </textarea>
                            </li>
                        </ul>
                    </div>
                    <div class="inner-bottom">
                        <input id="btnAddZSM" type="button" value="Add/Update" class="btn blank_large" />
                    </div>
                </div>
            </div>
            <div class="windowright">
                <div class="persoanl-data" id="divEventDetails">
                    <div class="inner-head">
                        Event Details</div>
                    <div class="inner-left">
                        <ul id="ulRejectComments2" class="form_list">
                            <li>Joint Visit has been rejected by RSM with following comments:
                                <br />
                                <textarea rows="" cols="" id="txtRejectComments2" readonly="readonly" class="styledtextarea_1"></textarea>
                            </li>
                        </ul>
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
                            <li>Quantitys
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
        </div>
        <!-- Start of Login Dialog -->
        <div id="DivAdd2" class="window">
            <div id="preloader2" class="loadingdivOuter1">
                <img src="Images/loading2.gif" alt="Please Wait" title="Please Wait" />
                <br />
                Please wait
            </div>
            <div class="windowleft">
                <div class="persoanl-data">
                    <div class="inner-head">
                    </div>
                    <div class="inner-left">
                        <ul class="form_list">
                            <li>
                                <div class="lfloat">
                                    Select SPO/TM/STM
                                    <br />
                                    <select id="ddlMIOpopup" class="styledselect_form_1">
                                        <option></option>
                                    </select>
                                </div>
                                <div class="rfloat">
                                    Select Activity
                                    <br />
                                    <select id="ddlActivitiesMainpopup" class="styledselect_form_1">
                                        <option></option>
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div class="lfloat">
                                    Select Start Time
                                    <br />
                                    <select id="ddlTimeStartpopup" class="styledselect_form_1">
                                        <option></option>
                                    </select>
                                </div>
                                <div class="rfloat">
                                    Select End Time
                                    <br />
                                    <select id="ddlTimeEndpopup" class="styledselect_form_1">
                                        <option></option>
                                    </select>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="inner-bottom">
                        <input id="btnzsmplan" class="btn add_update" type="button" value="Add Event" />
                    </div>
                </div>
            </div>
            <div class="windowright">
                <div id="dayCalender" style="background-color: White;">
                </div>
                <div class="d-blank">
                </div>
                <div>
                </div>
            </div>
        </div>
        <div id="DivAdd" class="window">
            <div id="preloader" class="loadingdivOuter1">
                <img src="Images/loading2.gif" alt="Please Wait" title="Please Wait" />
                <br />
                Please wait
            </div>
            <div class="windowleft">
                <div class="persoanl-data">
                    <div class="inner-head">
                    </div>
                    <div class="inner-left">
                        <ul class="form_list">
                            <li>
                                <div class="lfloat">
                                    Bricks
                                    <br />
                                    <select id="ddlBricks" class="styledselect_form_1">
                                        <option></option>
                                    </select>
                                </div>
                                <div class="rfloat">
                                    Classes
                                    <br />
                                    <select id="ddlClasses" class="styledselect_form_1">
                                        <option></option>
                                    </select>
                                </div>
                            </li>
                            <li>Doctors
                                <br />
                                <select id="ddlDoctors" class="styledselect_form_3">
                                    <option></option>
                                </select>
                            </li>
                            <li>
                                <div class="lfloat">
                                    Start Time
                                    <br />
                                    <select id="ddlTimeStart" class="styledselect_form_1">
                                        <option></option>
                                    </select>
                                </div>
                                <div class="rfloat">
                                    End Time
                                    <br />
                                    <select id="ddlTimeEnd" class="styledselect_form_1">
                                        <option></option>
                                    </select>
                                </div>
                            </li>
                            <li>Activity
                                <br />
                                <select id="ddlActivities" class="styledselect_form_3">
                                    <option></option>
                                </select>
                            </li>
                            <li>Products
                                <br />
                                <div id="tdProducts">
                                    <select id="Products0" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Products1" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Products2" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Products3" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                </div>
                            </li>
                            <li>Reminders
                                <br />
                                <div id="tdReminders">
                                    <select id="Reminders0" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Reminders1" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Reminders2" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Reminders3" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                </div>
                            </li>
                            <li>Samples
                                <br />
                                <div id="tdSamples">
                                    <select id="Samples0" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Samples1" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Samples2" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Samples3" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                </div>
                            </li>
                            <li>Quantitys
                                <br />
                                <div id="tdQuantitys">
                                    <select id="Quantity0" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Quantity1" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Quantity2" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Quantity3" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                </div>
                            </li>
                            <li>Gifts
                                <br />
                                <div id="tdGifts">
                                    <select id="Gift0" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Gift1" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                </div>
                            </li>
                            <li id="divBMD1" style="display: none;">BMD Coordinator
                                <br />
                                <select id="ddlBMD1" class="styledselect_form_3">
                                    <option></option>
                                </select>
                            </li>
                            <li>Description
                                <br />
                                <input id="txtDescription" type="text" class="inp-form-medium" />
                            </li>
                        </ul>
                    </div>
                    <div class="inner-bottom">
                        <input id="btnAdd" class="btn add_update" type="button" value="Add Event" />
                    </div>
                </div>
            </div>
            <div class="windowright">
                <ul id="ulRejectComments1" class="form_list">
                    <li>Reject Comments
                        <br />
                        <textarea id="txtRejectComments1" readonly="readonly" class="styledtextarea_1"></textarea>
                    </li>
                </ul>
                <div id="dayCalender" style="background-color: White;">
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
            <div class="d-blank">
            </div>
            <div>
            </div>
        </div>
        <!-- End of Login Dialog -->
        <!-- Start of Sticky Note -->
        <div id="dialog2" class="window">
            So, with this <b>Simple Jquery Modal Window</b>, it can be in any shapes you want!
            Simple and Easy to modify : )
            <br />
            <br />
            <input type="button" value="Close it" class="close" />
        </div>
        <!-- End of Sticky Note -->
        <!-- Mask to cover the whole screen -->
        <div id="mask">
        </div>
    </div>
</asp:Content>

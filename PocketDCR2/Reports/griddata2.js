

$(document).ready(function () {

    $('#content').parent().find('.pop_box-outer').show().fadeOut();
    $('#content').parent().find('.divLodingGrid').show().fadeOut();


    var cdt = new Date();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var current_mint = cdt.getMinutes();
    var current_hrs = cdt.getHours();
    var current_date = cdt.getDate();
    var current_date2 = current_date;


    var current_month = cdt.getMonth();
    var current_month = current_month + 1;
    var month_name = monthNames[current_month];
    var current_year = cdt.getFullYear();
    $('#stdate').val(current_month + '/' + current_date2 + '/' + current_year);
    $('#enddate').val(current_month + '/' + current_date + '/' + current_year);
    $('#stdateto').val(current_month + '/' + current_date2 + '/' + current_year);
    $('#stdatet').val(current_year + '/' + current_month + '/' + current_date2);



    document.getElementById("description").maxLength = "250";
    $('#description').val();

    $('#ddl1').change(OnChangeddl1);
    $('#ddl2').change(OnChangeddl2);
    $('#ddl3').change(OnChangeddl3);
    $('#ddl4').change(OnChangeddl4);
    $('#ddl5').change(OnChangeddl5);
    $('#ddl6').change(OnChangeddl6);

    $('#dG1').change(OnChangeddG1);
    $('#dG2').change(OnChangeddG2);
    $('#dG3').change(OnChangeddG3);
    $('#dG4').change(OnChangeddG4);
    $('#dG5').change(OnChangeddG5);
    $('#dG6').change(OnChangeddG6);

    HideHierarchy();
    GetCurrentUser();


});

function ValidateDate() {
    var cdt = new Date();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var current_mint = cdt.getMinutes();
    var current_hrs = cdt.getHours();
    var current_date = cdt.getDate();
    var current_date2 = current_date;


    var current_month = cdt.getMonth();
    var current_month = current_month + 1;
    var month_name = monthNames[current_month];
    var current_year = cdt.getFullYear();
    if ($('#Th3').is(':hidden')) {
        $('#stdateto').val() = $('#stdate').val();
    }
    if (Date.parse($('#stdateto').val()) < Date.parse($('#stdate').val())) {
        JSDialog.showMessageDialog(
	            "Please select Proper date range",
	            "none",
	            null,
	            350,
	            40,
	            "Alert",
	            "OK"
                   );
        $(".jsdialog_x ").text("X");

        $('#stdate').val(current_month + '/' + current_date2 + '/' + current_year);
        $('#stdateto').val(current_month + '/' + current_date2 + '/' + current_year);
    }

}
function CheckPlanOrCallExist() {
    $('#content').parent().find('.pop_box-outer').show().fadeIn();
    $('#content').parent().find('.divLodingGrid').show().fadeIn();

    var startingDate = $('')
    if (ddl7 == '1') {
        //Zsm with MIO for 1
        EmpType = "ZSM";
    }
    else if (ddl7 == '2') {
        //Zsm only for 0
        EmpType = "ZSM";
    }
    else if (ddl7 == '3') {
        //MIO only for 2
        EmpType = "2";
    }
    else {
        EmpType = "MIO";
    }
    //Make only for mio for now if want to make it functional again then comment this line
    EmpType = "MIO";

    myData = "{'EmployeeID':'" + $('#ddl6').val() + "','empType':'" + EmpType + "','startingDate':'" + $('#stdate').val() + "','endingDate':'" + $('#stdateto').val() + "'}";
    url = "LeaveService.asmx/CheckPlanOfEmployee";
    var checkCallExist = "";


    $.ajax({
        type: "POST",
        url: url,
        data: myData,
        contentType: "application/json",
        async: false,
        success: function (data) {
            var dbMsg = JSON.parse(data.d);
            if (data.d != "" && dbMsg[0].Message == "Plan Exists") {
                msg = 'Calls Exists';
                JSDialog.showConfirmDialog(
                    "Plan or Call exist in selected date, Do you want to mark leave?\n Note:This will delete plans for selected date",
                    checkCallExist = function (result) {
                        if (result == 'yes') {
                            myData = "{'EmployeeID':'" + $('#ddl6').val() + "','FromDate':'" + $('#stdate').val() + "','ToDate':'" + $('#stdateto').val() + "'}";
                            $.ajax({
                                type: "POST",
                                url: "LeaveService.asmx/DeletePlanAndCallsForLeave",
                                data: myData,
                                contentType: "application/json",
                                success: function (data) {
                                    var dbMsg = JSON.parse(data.d);
                                    if (data.d != "" && dbMsg[0].Message == "OK") {
                                        //alert("Plans deleted successfully");
                                        MarkLeave();
                                        return 1;
                                    }
                                    else {
                                        alert("Error deleting plans, therefore leave not marked");

                                        return -1;
                                    }
                                },
                                error: onError,
                                beforeSend: startingAjax,
                                complete: ajaxCompleted,
                                async: true,
                                cache: false
                            });

                        }

                    },
                    "warning",
	                "yes|no"
                );
                $(".jsdialog_x ").text("X");
                $('#content').parent().find('.pop_box-outer').show().fadeOut();
                $('#content').parent().find('.divLodingGrid').show().fadeOut();

                checkCallExist = -1;
                return false;
            }
            else if (data.d != "" && dbMsg[0].Message == "Call Exists") {
                msg = 'Calls Exists';
                JSDialog.showConfirmDialog(
                    "Call exist in selected date, therefore leave cannot be marked.",
                    "warning",
	                "yes|no"
                );
                $(".jsdialog_x ").text("X");
                $('#content').parent().find('.pop_box-outer').show().fadeOut();
                $('#content').parent().find('.divLodingGrid').show().fadeOut();
                checkCallExist = 0;
                return false;
            }
            else if (data.d != "" && dbMsg[0].Message == "Plan exists but cannot be deleted") {
                msg = 'Plan exists but cannot be deleted';
                JSDialog.showMessageDialog(
                    "Plan status is not draft nor rejected, therefore leave cannot be marked.",
                    "warning",
	                "ok"
                );
                $(".jsdialog_x ").text("X");
                checkCallExist = 0;
                return false;
            } else if (data.d != "" && dbMsg[0].Message == "Nothing Exists") {
                checkCallExist = 1;
                MarkLeave();
            }
            $('#content').parent().find('.pop_box-outer').show().fadeOut();
            $('#content').parent().find('.divLodingGrid').show().fadeOut();

        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

    return checkCallExist;


}
function onclick_btn() {




    if ($('#ddl8').val() == "-1") {
        JSDialog.showMessageDialog(
           "Please Select Leave Type",
           "none", null, 350, 40, "Alert", "OK");
        $(".jsdialog_x ").text("X");

        return false;
    }
    var MLevelid = (($('#dG5').val() == "-1" || $('#dG5').val() == undefined) ? "0" : $('#dG5').val());
    var TLevelId = (($('#dG6').val() == "-1" || $('#dG6').val() == undefined) ? "0" : $('#dG6').val());
    var description = $('#description').val();

    if ($('#ddl8').val() == "1") {
        if ($('#ddl1').val() == "-1") {
            if (description != "") {
                myData = "{'stDate':'" + $('#stdate').val() + "','endDate':'" + $('#stdateto').val() + "','leaveType':'" + $('#ddl8').val() + "','description':'" + description + "','MLevel':'" + MLevelid + "','TLevel':'" + TLevelId + "'}";
                url = "LeaveService.asmx/MarkLeaveOrPublicHoliday";

                $.ajax({
                    type: "POST",
                    url: url,
                    data: myData,
                    contentType: "application/json",
                    async: true,
                    success: function (data) {

                        //var dataArr = data.d.split(',');

                        //if (dataArr[0] != "") {
                        //    var jsonDataT = JSON.parse(dataArr[0]);
                        //    var jsonDataM = JSON.parse(dataArr[1]);

                        //    //alert(jsonData[0].TMMsg);
                        //    JSDialog.showMessageDialog('TM :' + jsonDataT[0].TMMsg + '\nASM :' + jsonDataM[0].ASMMsg, "none", null, 350, 40, "Alert", "OK");
                        //    $(".jsdialog_x ").text("X");
                        //}
                        if (data.d != "") {
                            var jsonDataT = JSON.parse(data.d);

                            //alert(jsonData[0].TMMsg);
                            JSDialog.showMessageDialog(jsonDataT[0].TMMsg, "none", null, 350, 40, "Alert", "OK");
                            $(".jsdialog_x ").text("X");

                            $('#description').val("");
                        }

                    },
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            } else {
                JSDialog.showMessageDialog(
           "Please fill Description",
           "none", null, 350, 40, "Alert", "OK");
                $(".jsdialog_x ").text("X");
            }
        } else {
            JSDialog.showMessageDialog(
                "Hierarchy should not be selected to marking public holiday",
                "none",
                null,
                350,
                40,
                "Alert",
                "OK"
            );
            $(".jsdialog_x ").text("X");
        }
    } else {
        if ($('#ddl1').val() != "-1" && $('#ddl2').val() != "-1" && $('#ddl3').val() != "-1" && $('#ddl4').val() != "-1" && $('#ddl5').val() != "-1") {
            if (description != "") {
                myData = "{'stDate':'" + $('#stdate').val() + "','endDate':'" + $('#stdateto').val() + "','leaveType':'" + $('#ddl8').val() + "','description':'" + description + "','MLevel':'" + MLevelid + "','TLevel':'" + TLevelId + "'}";
                url = "LeaveService.asmx/MarkLeaveOrPublicHoliday";

                $.ajax({
                    type: "POST",
                    url: url,
                    data: myData,
                    contentType: "application/json",
                    async: true,
                    success: function (data) {

                        if (data.d != "") {
                            var jsonData = JSON.parse(data.d);

                            JSDialog.showMessageDialog(jsonData[0].TMMsg, "none", null, 350, 40, "Alert", "OK");
                            $(".jsdialog_x ").text("X");

                            $('#description').val("");

                        }
                    },
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            } else {
                JSDialog.showMessageDialog(
           "Please fill Description",
           "none", null, 350, 40, "Alert", "OK");
                $(".jsdialog_x ").text("X");
            }
        } else {
            JSDialog.showMessageDialog(
                "ASM Manager should be selected to marking Leave",
                "none",
                null,
                350,
                40,
                "Alert",
                "OK"
            );
            $(".jsdialog_x ").text("X");
        }
    }
    ////Check if 6 level hierarchy is selected or not
    //if ($('#ddl6').val() != null && $('#ddl6').val() != "-1" && $('#ddl8').val() != "1") {
    //    var checkCallExist = 1;
    //    if ($('#description').val() == '') {
    //        $('#description').css('outline-color', 'red');
    //        $('#description').focus();
    //        return;
    //    }

    //    if ($('#dG6').val() != null && $('#dG6').val() != "") {
    //        checkCallExist = CheckPlanOrCallExist();
    //        if (checkCallExist == undefined || checkCallExist == 0) {
    //            //alert('Call Exists for selected date or plan status is not rejected or draft, therefore leave cannot be marked');
    //            $('#content').parent().find('.pop_box-outer').show().fadeOut();
    //            $('#content').parent().find('.divLodingGrid').show().fadeOut();

    //            return;
    //        }
    //    }
    //    else
    //        MarkLeave();
    //    //If Call or Plan exists in selected date then return 

    //    //alert("mark leave");
    //}
    //    //Check if hierarchy is selected or not 
    //else if ($('#ddl8').val() == "1" && ($('#ddl1').val() != null && $('#ddl1').val() != "-1")) {
    //    $('#content').parent().find('.pop_box-outer').show().fadeOut();
    //    $('#content').parent().find('.divLodingGrid').show().fadeOut();

    //    JSDialog.showMessageDialog(
    //        "Hierarchy should not be selected to marking public holiday",
    //        "none",
    //        null,
    //        350,
    //        40,
    //        "Alert",
    //        "OK"
    //    );
    //    $(".jsdialog_x ").text("X");
    //}
    //    //Check if hierarchy is not selected and marking public holiday then allow
    //else if ($('#ddl8').val() == "1" && ($('#ddl1').val() == null || $('#ddl1').val() == "-1")) {
    //    myData = "{'current':'" + $('#stdate').val() + "','drcode':'666'}";
    //    url = "LeaveService.asmx/MarkPublicHoliday";

    //    $.ajax({
    //        type: "POST",
    //        url: url,
    //        data: myData,
    //        contentType: "application/json",
    //        async: true,
    //        success: function (data) {
    //            if (data.d != "") {

    //                var jsonData = JSON.parse(data.d);

    //                var message = "";
    //                  if (jsonData[0].CallsExistCount != "0") {
    //                      message = jsonData[0].CallsExistCount + " Public holiday not marked because call exists \n";
    //                  }

    //                  message += jsonData[0].LeaveCount + " Public Holiday Marked out of " + (parseInt(jsonData[0].CallsExistCount) + parseInt(jsonData[0].LeaveCount));

    //                JSDialog.showMessageDialog(message, "none", null, 350, 40, "Alert", "OK");
    //                $(".jsdialog_x ").text("X");

    //            }
    //            else {
    //                JSDialog.showMessageDialog(
    //                    "Error occured while marking public holiday",
    //                    "none",
    //                    null,
    //                    350,
    //                    40,
    //                    "Alert",
    //                    "OK"
    //                );
    //                $(".jsdialog_x ").text("X");

    //            }
    //        },
    //        error: onError,
    //        beforeSend: startingAjax,
    //        complete: ajaxCompleted,
    //        cache: false
    //    });

    //}
    //else {
    //    JSDialog.showMessageDialog(
    //       "Leave can only be marked for mio only",
    //       "none", null, 350, 40, "Alert", "OK");
    //    $(".jsdialog_x ").text("X");

    //}

}



function onclick_btn1() {
    debugger;
    var stdatet = $("#txtDescription").val();

    var devent = $("#Sdatee").val();

    console.log($("#txtDescription").val());

    console.log($("#Sdatee").val());


    //var ddl1 = $("#ddl1").val();
    //var ddl2 = $("#ddl2").val();
    //var ddl3 = $("#ddl3").val();
    //var ddl4 = $("#ddl4").val();
    //var ddl5 = $("#ddl5").val();
    //var ddl6 = $("#ddl6").val();


    myData = "{'HolidayDate':'" + devent + "','Description':'" + stdatet + "','EmpID':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "LeaveService.asmx/Addholidaymark",
        data: myData,
        contentType: "application/json",
        async: false,
        success: onSuccessMeeting,
        error: onErroru,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

}

function onSuccessMeeting() {
    alert('Holiday Date Submited Successfully');
}



function MarkLeave() {

    $('#content').parent().find('.pop_box-outer').show().fadeIn();
    $('#content').parent().find('.divLodingGrid').show().fadeIn();

    var stdate = $('#stdate').val();
    var enddate = $('#stdateto').val();
    //var mioid = '3';
    var drid = '999';
    var desription = $('#description').val();

    var EmpType = '0', ddlMio = '', ddl1 = '', ddl2 = '', ddl3 = '', ddl4 = '', ddl5 = '', ddl6 = '', ddl7 = '', ddl8 = '';
    if ($('#dG1').val() != null) {
        ddl1 = $('#dG1').val();
    }

    if ($('#dG2').val() != null) {
        ddl2 = $('#dG2').val();
    }

    if ($('#dG3').val() != null) {
        ddl3 = $('#dG3').val();
    }

    if ($('#dG4').val() != null) {
        ddl4 = $('#dG4').val();
    }

    if ($('#dG5').val() != null) {
        ddl5 = $('#dG5').val();
    }

    if ($('#dG6').val() != null) {
        ddl6 = $('#dG6').val();
    }

    if ($('#ddl7').val() != null) {
        ddl7 = $('#ddl7').val();
    }
    if ($('#ddl8').val() != null) {
        ddl8 = $('#ddl8').val();
    }
    //Public holiday will be marked for all levels 
    if ($('#ddl8').val() == 1) {
        JSDialog.showMessageDialog(
           "Hirarchy should not be selected while public holiday is marked",
           "none",
           null,
           350,
           40,
           "Alert",
           "OK"
        );
        $(".jsdialog_x ").text("X");

        return;
    }

    if (ddl7 == '1') {
        //Zsm with MIO for 1
        EmpType = "0";
    }
    else if (ddl7 == '2') {
        //Zsm only for 0
        EmpType = "1";
    }
    else if (ddl7 == '3') {
        //MIO only for 2
        EmpType = "2";
    }
    else {
        EmpType = "0";
    }
    //Make only for mio for now if want to make it functional again then comment this line
    EmpType = "2";

    if (ddl6 == '') {
        ddl6 = '-1';
    }
    //else {
    //    checkCallExist = CheckPlanOrCallExist();
    //}
    //If Call or Plan exists in selected date then return 
    //if (checkCallExist==undefined || checkCallExist == 0) {
    //    return;
    //}
    if (ddl5 == '') {
        ddl5 = '-1';
    }
    if (ddl4 == '') {
        ddl4 = '-1';
    }
    if (ddl3 == '') {
        ddl3 = '-1';
    }
    if (ddl2 == '') {
        ddl2 = '-1';
    }
    if (ddl1 == '') {
        ddl1 = '-1';
    }
    var ConfirmBox = "True";
    if (ddl1 == '-1') {


        JSDialog.showConfirmDialog(
"Do you want to mark leave for all employees?",
function (result) {
    if (result == "yes") {
        if (ddl8 != '-1') {
            $('#dialog').jqm({ modal: true });
            $('#dialog').jqm();
            $('#dialog').jqmShow();

            myData = "{'level1':'" + ddl1 + "','level2':'" + ddl2 + "','level3':'" + ddl3 + "','level4':'" + ddl4 + "','level5':'" + ddl5 + "','level6':'" + ddl6 + "','current':'" + stdate + "','enddate':'" + enddate + "','drcode':'" + drid + "','desription':'" + desription + "','empType':'" + EmpType + "','Gazzed':'" + ddl8 + "'}";
            url = "LeaveService.asmx/InsertdataLeaveNSM";

            $.ajax({
                type: "POST",
                url: url,
                data: myData,
                contentType: "application/json",
                async: true,
                success: onSuccessInsertLeave,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            JSDialog.showMessageDialog(
               "Please Select Leave Type",
               "none",
               null,
               350,
               40,
               "Alert",
               "OK"
           );
            $(".jsdialog_x ").text("X");

        }
    }

},
	"warning",
	"yes|no"
);
        $(".jsdialog_x ").text("X");
    }
    else {
        if (ddl1 != '-1') {
            if (ddl8 != '-1') {
                //$('#dialog').jqm({ modal: true });
                //$('#dialog').jqm();
                //$('#dialog').jqmShow();

                myData = "{'level1':'" + ddl1 + "','level2':'" + ddl2 + "','level3':'" + ddl3 + "','level4':'" + ddl4 + "','level5':'" + ddl5 + "','level6':'" + ddl6 + "','current':'" + stdate + "','enddate':'" + enddate + "','drcode':'" + drid + "','desription':'" + desription + "','empType':'" + EmpType + "','Gazzed':'" + ddl8 + "'}";

                url = "LeaveService.asmx/InsertdataLeaveNSM";

                $.ajax({
                    type: "POST",
                    url: url,
                    data: myData,
                    contentType: "application/json",
                    async: true,
                    success: onSuccessInsertLeave,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            else {
                JSDialog.showMessageDialog(
	            "Please Select Leave Type",
	            "none",
	            null,
	            350,
	            40,
	            "Alert",
	            "OK"
            );
                $(".jsdialog_x ").text("X");
            }
        }
        else {
            JSDialog.showMessageDialog(
               "Please Select National Level",
               "none",
               null,
               350,
               40,
               "Alert",
               "OK"
           );
            $(".jsdialog_x ").text("X");

        }
    }
}
function onSuccessInsertLeave(data) {
    $('#description').css('outline-color', '#7A9CD3');

    var result = data.d;
    if (result.split(',')[0] == "Not-Available") {
        $('#dialog').jqmHide();
        $('#description').val("");
        //JSDialog.showMessageDialog(
        //    "Data Save Successfully\n Leave Marked:" + result.split(',')[1] + " \n Leave Not Marked:" + result.split(',')[2],
        //    "none",
        //    null,
        //    350,
        //    40,
        //    "Alert",
        //    "OK"
        //);
        JSDialog.showMessageDialog(
            "Data Save Successfully",
            "none",
            null,
            350,
            40,
            "Alert",
            "OK"
        );
        $(".jsdialog_x ").text("X");

        GetLeaveData();
    }
    else {
        JSDialog.showMessageDialog(
	        "Leave is already marked",
	        "none",
	        null,
	        350,
	        40,
	        "Alert",
	        "OK"
        );
        $(".jsdialog_x ").text("X");

        //$('#dialog').jqmHide();
        GetLeaveData();

    }
}

function onclick_btnSearch() {

    GetLeaveData();

}

function GetLeaveData() {
    //alert("testttt");

    $('#content').parent().find('.pop_box-outer').show().fadeIn();
    $('#content').parent().find('.divLodingGrid').show().fadeIn();

    startdate = $('#stdate').val();
    enddate = $('#stdateto').val();

    var leavetype = ($('#ddl8').val() == '-1' ? '0' : $('#ddl8').val());

    var EmpType = '0', ddlMio = '', ddl1 = '', ddl2 = '', ddl3 = '', ddl4 = '', ddl5 = '', ddl6 = '', ddl7 = '';
    if ($('#dG1').val() != null) {
        ddl1 = $('#dG1').val();
    }

    if ($('#dG2').val() != null) {
        ddl2 = $('#dG2').val();
    }

    if ($('#dG3').val() != null) {
        ddl3 = $('#dG3').val();
    }

    if ($('#dG4').val() != null) {
        ddl4 = $('#dG4').val();
    }

    if ($('#dG5').val() != null) {
        ddl5 = $('#dG5').val();
    }

    if ($('#dG6').val() != null) {
        ddl6 = $('#dG6').val();
    }

    if ($('#ddl7').val() != null) {
        ddl7 = $('#ddl7').val();
    }

    if (ddl7 == '1') {
        //Zsm with MIO for 1
        EmpType = "0";
    }
    else if (ddl7 == '2') {
        //Zsm only for 0
        EmpType = "1";
    }
    else if (ddl7 == '3') {
        //MIO only for 2
        EmpType = "2";
    }
    else {
        EmpType = "0";
    }


    //Make only for mio for now if want to make it functional again then comment this line
    EmpType = "2";

    if (ddl6 == '') {
        ddl6 = '-1';
    }
    if (ddl5 == '') {
        ddl5 = '-1';
    }
    if (ddl4 == '') {
        ddl4 = '-1';
    }
    if (ddl3 == '') {
        ddl3 = '-1';
    }
    if (ddl2 == '') {
        ddl2 = '-1';
    }
    if (ddl1 == '') {
        ddl1 = '-1';
    }

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    ddlMio = '0';
    myData = "{'level1':'" + ddl1 + "','level2':'" + ddl2 + "','level3':'" + ddl3 + "','level4':'" + ddl4 + "','level5':'" + ddl5 + "','level6':'" + ddl6 + "','current':'" + startdate + "','Enddate':'" + enddate + "','EmpType':'" + EmpType + "','leaveType':'" + leavetype + "'}";
    url = "LeaveService.asmx/getdataLeave";

    if (ddlMio != '') {

        $.ajax({
            type: "POST",
            url: url,
            data: myData,
            contentType: "application/json",
            async: true,
            success: onSuccessGetLeaves,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });

    }


}
function onSuccessGetLeaves(data, status) {

    $('#SuccessSMS .dataTables_wrapper').remove();

    $('#SuccessSMS').append($('<table id="datatables" class="display"><thead><tr><th>Division</th><th>Region</th><th>Zone</th><th>Territory</th><th>Employee Name</th><th>Description</th><th>Activity Name</th><th>Day Wise</th><th>Action</th></tr></thead><tbody>'));

    if (data.d != "") {
        var jSon = JSON.parse(data.d);
        $.each(jSon, function (i, option) {
            //var deleteData = "('"+option.ID+"')";
            //var deleteData = option.ID.split('-')[0] == "ZSM" ? "('" + option.ID + "','" + option.Zone + "')" : option.ID.split('-')[0] == "RSM" ? "('" + option.ID + "','" + option.RSM + "')" : "('" + option.ID + "','" + option.Territory + "')";

            var id = option.ID.split('-')[1];

            $('#datatables').append($('<tr><td>' + option.Division + '</td><td>'
        + option.Region + '</td><td>'
        + option.Zone + '</td><td>'
        + option.Territory + '</td><td>'
        + option.EmployeeName + '</td><td>'
        + option.CPI_Description + '</td><td>'
        + option.CPA_Name + '</td><td>'
        + option.LeaveDate.toString('dd-MMM-yyyy') + '</td><td>'
        //+ '<a href="#" onclick="deletedata'+deleteData+';return false">Delete</a>' + '</td></tr>'));
        //+ '<a href="#" onclick="CheckPlan' + deleteData + ';return false">Delete</a>' + '</td></tr>'
        + ((option.CPA_Name != 'Public Holiday') ? '<a href="#" onclick="DeleteLeave(' + id + ');return false">Delete</a>' : '') + '</td></tr>'


        ));
        });

        //    $('#dltbtn').show();
        //}
        //else {
        //    $('#dltbtn').hide();
        //}

        $('#SuccessSMS').append($('</tbody></table>'));

        $('#datatables').dataTable({
            "sPaginationType": "full_numbers",
            "bJQueryUI": true,
            "bScrollCollapse": true
        });

        $('#dialog').jqmHide();
        $('#content').parent().find('.pop_box-outer').show().fadeOut();
        $('#content').parent().find('.divLodingGrid').show().fadeOut();

    }
}


function DeleteLeave(id) {


    JSDialog.showConfirmDialog(
    "Do you want to delete leave for employee",
    function (result) {
        if (result == "yes") {

            $('#dialog').jqm({ modal: true });
            $('#dialog').jqm();
            $('#dialog').jqmShow();

            myData = "{'id':'" + id + "'}";
            $.ajax({
                type: "POST",
                url: "LeaveService.asmx/DeleteLeaveData",
                data: myData,
                contentType: "application/json",
                async: true,
                success: onSuccessDeleteLeave,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }

    },
        "warning",
        "yes|no"
    );
    $(".jsdialog_x ").text("X");

    //myData = "{'id':'" + id + "'}";
    //$.ajax({
    //    type: "POST",
    //    url: "LeaveService.asmx/getdataLeave",
    //    data: myData,
    //    contentType: "application/json",
    //    async: true,
    //    success: onSuccessGetLeaves,
    //    error: onError,
    //    beforeSend: startingAjax,
    //    complete: ajaxCompleted,
    //    cache: false
    //});
}

function onSuccessDeleteLeave(data) {
    if (data.d != "") {
        JSDialog.showMessageDialog(
                    "Leave Deleted",
                    "none",
                    null,
                    350,
                    40,
                    "Alert",
                    "OK"
                );
        $(".jsdialog_x ").text("X");
        $('#dialog').jqmHide();

    }
    GetLeaveData();
}

function onclick_deketeall() {




    var id = 0;
    deletedata(id, "");

}
function CheckPlan(id, zone) {
    var startdate = $('#stdate').val();
    var enddate = $('#stdateto').val();

    myData = "{'Date':'" + startdate + "','EmployeeType':'" + id.split('-')[0].toString() + "','EmployeeHierarchy':'" + zone + "'}";

    $.ajax({
        type: "POST",
        url: "LeaveService.asmx/CheckPlanStatus",
        data: myData,
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data.d != '' && JSON.parse(data.d)[0].msg != 'OK') {
                var jsonData = JSON.parse(data.d);
                if (jsonData[0].msg == "Error") {
                    JSDialog.showMessageDialog(
                    "Leave cannot be deleted because leave can only be deleted if plan status is draft or rejected",
                    "none",
                    null,
                    350,
                    40,
                    "Alert",
                    "OK"
                    );
                    $(".jsdialog_x ").text("X");
                    $('#content').parent().find('.pop_box-outer').show().fadeOut();
                    $('#content').parent().find('.divLodingGrid').show().fadeOut();

                    return;
                }
            }
            else {
                deletedata(id, zone);
            }
        },
        error: onErroru,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    }); var LeaveID = id.toString();


}
function deletedata(id, zone) {

    var startdate = $('#stdate').val();
    var enddate = $('#stdateto').val();

    myData = "{'Date':'" + startdate + "','EmployeeType':'" + (id == 0 ? 0 : id.split('-')[0].toString()) + "','EmployeeHierarchy':'" + zone + "'}";

    $.ajax({
        type: "POST",
        url: "LeaveService.asmx/CheckPlanStatus",
        data: myData,
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data.d != '') {
                var jsonData = JSON.parse(data.d);
                if (jsonData[0].msg == "Error") {
                    JSDialog.showMessageDialog(
                    "Leave cannot be deleted",
                    "none",
                    null,
                    350,
                    40,
                    "Alert",
                    "OK"
                    );
                    $(".jsdialog_x ").text("X");
                    $('#content').parent().find('.pop_box-outer').show().fadeOut();
                    $('#content').parent().find('.divLodingGrid').show().fadeOut();
                    return;
                }
            }
        },
        error: onErroru,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    }); var LeaveID = id.toString();


    var EmpType = '0', ddlMio = '', ddl1 = '', ddl2 = '', ddl3 = '', ddl4 = '', ddl5 = '', ddl6 = '', ddl7 = '';
    if ($('#dG1').val() != null) {
        ddl1 = $('#dG1').val();
    }

    if ($('#dG2').val() != null) {
        ddl2 = $('#dG2').val();
    }

    if ($('#dG3').val() != null) {
        ddl3 = $('#dG3').val();
    }

    if ($('#dG4').val() != null) {
        ddl4 = $('#dG4').val();
    }


    if ($('#dG5').val() != null) {
        ddl5 = $('#dG5').val();
    }


    if ($('#dG6').val() != null) {
        ddl6 = $('#dG6').val();
    }


    if ($('#ddl7').val() != null) {
        ddl7 = $('#ddl7').val();
    }

    if (ddl7 == '1') {
        //Zsm with MIO for 1
        EmpType = "0";
    }
    else if (ddl7 == '2') {
        //Zsm only for 0
        EmpType = "1";
    }
    else if (ddl7 == '3') {
        //MIO only for 2
        EmpType = "2";
    }
    else {
        EmpType = "0";
    }

    //Make only for mio for now if want to make it functional again then comment this line
    EmpType = "2";

    if (ddl6 == '') {
        ddl6 = '-1';
    }
    if (ddl5 == '') {
        ddl5 = '-1';
    }
    if (ddl4 == '') {
        ddl4 = '-1';
    }
    if (ddl3 == '') {
        ddl3 = '-1';
    }
    if (ddl2 == '') {
        ddl2 = '-1';
    }
    if (ddl1 == '') {
        ddl1 = '-1';
    }


    if (ddl1 == '-1') {

        JSDialog.showConfirmDialog(
"Do you want to delete all leaves for employees?",
function (result) {
    if (result == "yes") {

        $('#dialog').jqm({ modal: true });
        $('#dialog').jqm();
        $('#dialog').jqmShow();

        myData = "{'level1':'" + ddl1 + "','level2':'" + ddl2 + "','level3':'" + ddl3 + "','level4':'" + ddl4 + "','level5':'" + ddl5 + "','level6':'" + ddl6 + "','id':'" + id + "','startdate':'" + startdate + "','enddate':'" + enddate + "','empType':'" + EmpType + "'}";

        $.ajax({
            type: "POST",
            url: "LeaveService.asmx/DeleteLeave",
            data: myData,
            contentType: "application/json",
            async: false,
            success: onSuccessuDelete,
            error: onErroru,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });

    }

},
    "warning",
    "yes|no"
);
        $(".jsdialog_x ").text("X");



        //ConfirmBox = confirm("Do you want to mark leave for all employees? ");
    }
    else {
        if (ddl1 != '-1') {


            JSDialog.showConfirmDialog(
"Do you want to delete leaves?",
function (result) {
    if (result == "yes") {

        $('#dialog').jqm({ modal: true });
        $('#dialog').jqm();
        $('#dialog').jqmShow();

        myData = "{'level1':'" + ddl1 + "','level2':'" + ddl2 + "','level3':'" + ddl3 + "','level4':'" + ddl4 + "','level5':'" + ddl5 + "','level6':'" + ddl6 + "','id':'" + id + "','startdate':'" + startdate + "','enddate':'" + enddate + "','empType':'" + EmpType + "'}";

        $.ajax({
            type: "POST",
            url: "LeaveService.asmx/DeleteLeave",
            data: myData,
            contentType: "application/json",
            async: false,
            success: onSuccessuDelete,
            error: onErroru,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });

    }

},
    "warning",
    "yes|no"
);
            $(".jsdialog_x ").text("X");

        }
        else {
            JSDialog.showMessageDialog(
             "Please Select National Level",
             "none",
             null,
             350,
             40,
             "Alert",
             "OK"
         );
            $(".jsdialog_x ").text("X");

        }
    }






}
function onSuccessuDelete(data, status) {

    if (data.d == 'OK') {
        GetLeaveData();
        JSDialog.showMessageDialog(
    "Data Deleted Successfully",
    "none",
    null,
    350,
    40,
    "Alert",
    "OK"
);
        $(".jsdialog_x ").text("X");



    }

    else {
        $('#content').parent().find('.pop_box-outer').show().fadeOut();
        $('#content').parent().find('.divLodingGrid').show().fadeOut();

        JSDialog.showMessageDialog(
                 "ERROR",
                 "none",
                 null,
                 350,
                 40,
                 "Alert",
                 "OK"
             );
        $(".jsdialog_x ").text("X");

    }
}
function onErroru(request, status, error) {
    msg = 'Error occoured';
    $.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });
}

function ajaxCompleted() {

    // $('#dialog') ();
    //$('.loading').fadeOut('slow');
    //$('.loading_bgrd').fadeOut('slow');
    // $('#imgLoading').hide();
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
        url: "../Form/CommonService.asmx/GetCurrentUserLoginID",
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
        url: "../Form/CommonService.asmx/GetCurrentUserRole",
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
    }

    // GetEditableDataLoginId();

    RetrieveAppConfig();
}
// Enable / Disable DropDownLists Filter With Hierarchy
function RetrieveAppConfig() {

    $.ajax({
        type: "POST",
        url: "../Form/CommonService.asmx/GetHierarchyLevels",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetLevels,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetLevels(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        glbVarLevelName = jsonObj[0].SettingName;

        if (glbVarLevelName == "Level1") {

            HierarchyLevel1 = jsonObj[0].SettingValue;
            HierarchyLevel2 = jsonObj[1].SettingValue;
            HierarchyLevel3 = jsonObj[2].SettingValue;
            HierarchyLevel4 = jsonObj[3].SettingValue;
            HierarchyLevel5 = jsonObj[4].SettingValue;
            HierarchyLevel6 = jsonObj[5].SettingValue;
        }
        if (glbVarLevelName == "Level2") {

            HierarchyLevel1 = 0;
            HierarchyLevel2 = jsonObj[0].SettingValue;
            HierarchyLevel3 = jsonObj[1].SettingValue;
            HierarchyLevel4 = jsonObj[2].SettingValue;
            HierarchyLevel5 = jsonObj[3].SettingValue;
            HierarchyLevel6 = jsonObj[4].SettingValue;
        }
        if (glbVarLevelName == "Level3") {

            HierarchyLevel1 = 0;
            HierarchyLevel2 = 0;
            HierarchyLevel3 = jsonObj[0].SettingValue;
            HierarchyLevel4 = jsonObj[1].SettingValue;
            HierarchyLevel5 = jsonObj[2].SettingValue;
            HierarchyLevel6 = jsonObj[3].SettingValue;
        }

        HideHierarchy();
        EnableHierarchyViaLevel();
    }
}
function EnableHierarchyViaLevel() {
    if (glbVarLevelName == "Level1") {

        if (CurrentUserRole == 'admin') {

            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col4').show();
            $('#col5').show();
            $('#col6').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();
            $('#col44').show();
            $('#col55').show();
            $('#col66').show();

            $('#g1').show();
            $('#g2').show();
            $('#g3').show();
            $('#g4').show();
            $('#g5').show();
            $('#g6').show();

        }
        if (CurrentUserRole == 'rl1') {

            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col4').show();
            $('#col5').show();

            $('#col11').show();
            $('#col22').show();
            $('#col33').show();
            $('#col44').show();
            $('#col55').show();


            $('#g1').show();
            $('#g2').show();
            $('#g3').show();
            $('#g4').show();
            $('#g5').show();


        }
        if (CurrentUserRole == 'rl2') {

            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col4').show();

            $('#col11').show();
            $('#col22').show();
            $('#col33').show();
            $('#col44').show();


            $('#g1').show();
            $('#g2').show();
            $('#g3').show();
            $('#g4').show();


        }
        if (CurrentUserRole == 'rl3') {
            $('#col1').show();
            $('#col2').show();
            $('#col3').show();

            $('#col11').show();
            $('#col22').show();
            $('#col33').show();

            $('#g1').show();
            $('#g2').show();
            $('#g3').show();


        }
        if (CurrentUserRole == 'rl4') {
            $('#col1').show();
            $('#col2').show();
            $('#col11').show();
            $('#col22').show();

            $('#g1').show();
            $('#g2').show();



        }
        if (CurrentUserRole == 'rl5') {
            $('#col1').show();
            $('#col11').show();

            $('#g1').show();

        }
        GetHierarchySelection();
        FillDropDownList();
    } else if (glbVarLevelName == "Level3") {

        if (CurrentUserRole == 'admin') {

            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col4').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();
            $('#col44').show();

            $('#g1').show();
            $('#g2').show();
            $('#g3').show();
            $('#g4').show();


        }
        if (CurrentUserRole == 'rl3') {
            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();

            $('#g1').show();
            $('#g2').show();
            $('#g3').show();


        }
        if (CurrentUserRole == 'rl4') {
            $('#col1').show();
            $('#col2').show();
            $('#col11').show();
            $('#col22').show();

            $('#g1').show();
            $('#g2').show();



        }
        if (CurrentUserRole == 'rl5') {
            $('#col1').show();
            $('#col11').show();

            $('#g1').show();

        }
        GetHierarchySelection();
        FillDropDownList();
    }
}
function GetCurrentUser() {

    $.ajax({
        type: "POST",
        url: "../Form/CommonService.asmx/GetCurrentUser",
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
        url: "../Form/CommonService.asmx/GetCurrentUserLoginID",
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
        url: "../Form/CommonService.asmx/GetCurrentUserRole",
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
    }

    // GetEditableDataLoginId();

    RetrieveAppConfig();
}

function GetEditableDataLoginId() {

    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "datascreen.asmx/GetEmployee",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetEditableDataLoginId,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetEditableDataLoginId(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        EditableDataLoginId = jsonObj[0].LoginId;
    }

    // GetEditableDataRole();
}
function GetEditableDataRole() {

    myData = "{'employeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "datascreen.asmx/GetEditableDataRole",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetEditableDataRole,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetEditableDataRole(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        EditableDataRole = jsonObj[0].LoweredRoleName;
        modeValue = $('#hdnMode').val();

        if (modeValue == 'AuthorizeMode') {

            CheckAuthorize();
        }
        else if (modeValue == 'EditMode') {

            LoadForEditData();
        }
    }
}

// Enable / Disable DropDownLists Filter With Hierarchy
function RetrieveAppConfig() {

    $.ajax({
        type: "POST",
        url: "../Form/CommonService.asmx/GetHierarchyLevels",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetLevels,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetLevels(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        glbVarLevelName = jsonObj[0].SettingName;

        if (glbVarLevelName == "Level1") {

            HierarchyLevel1 = jsonObj[0].SettingValue;
            HierarchyLevel2 = jsonObj[1].SettingValue;
            HierarchyLevel3 = jsonObj[2].SettingValue;
            HierarchyLevel4 = jsonObj[3].SettingValue;
            HierarchyLevel5 = jsonObj[4].SettingValue;
            HierarchyLevel6 = jsonObj[5].SettingValue;
        }
        if (glbVarLevelName == "Level2") {

            HierarchyLevel1 = 0;
            HierarchyLevel2 = jsonObj[0].SettingValue;
            HierarchyLevel3 = jsonObj[1].SettingValue;
            HierarchyLevel4 = jsonObj[2].SettingValue;
            HierarchyLevel5 = jsonObj[3].SettingValue;
            HierarchyLevel6 = jsonObj[4].SettingValue;
        }
        if (glbVarLevelName == "Level3") {

            HierarchyLevel1 = 0;
            HierarchyLevel2 = 0;
            HierarchyLevel3 = jsonObj[0].SettingValue;
            HierarchyLevel4 = jsonObj[1].SettingValue;
            HierarchyLevel5 = jsonObj[2].SettingValue;
            HierarchyLevel6 = jsonObj[3].SettingValue;
        }

        HideHierarchy();
        EnableHierarchyViaLevel();
    }
}
function GetHierarchySelection() {

    myData = "{'systemUserId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/GetHierarchySelection",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetHierarchySelection,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetHierarchySelection(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            //            if (glbVarLevelName == "Level3") {

            level3Id = jsonObj[0].LevelId3;
            level4Id = jsonObj[0].LevelId4;
            level5Id = jsonObj[0].LevelId5;
            level6Id = jsonObj[0].LevelId6;
            //  }
        }
    }

}


function FillDropDownList() {

    myData = "{'levelName':'" + glbVarLevelName + "' }";
    alert(myData);
    $.ajax({
        type: "POST",
        url: "datascreen.asmx/FilterDropDownList",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: onSuccessFillDropDownList,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessFillDropDownList(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (glbVarLevelName == "Level3") {

            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";

            value = '-1';

            if (CurrentUserRole == 'admin') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel6 + " " + "MIO");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl3') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel6 + " " + "MIO ");


                $('#Label5').append(HierarchyLevel4 + " " + "Level ");
                $('#Label6').append(HierarchyLevel5 + " " + "Level ");
                $('#Label7').append(HierarchyLevel6 + " " + "Level ");



            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel6 + " " + "MIO ");

                $('#Label5').append(HierarchyLevel5 + " " + "Level ");
                $('#Label6').append(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "MIO ");
                $('#Label5').append(HierarchyLevel6 + " " + "Level ");
            }


            name = 'Select ' + $('#Label1').text();
            $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }




        FillGh();
    }
}



function GetHierarchySelection() {

    myData = "{'systemUserId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/GetHierarchySelection",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetHierarchySelection,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetHierarchySelection(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != "") {

            //            if (glbVarLevelName == "Level3") {

            level3Id = jsonObj[0].LevelId3;
            level4Id = jsonObj[0].LevelId4;
            level5Id = jsonObj[0].LevelId5;
            level6Id = jsonObj[0].LevelId6;
            //  }
        }
    }

}





// Hierarchy Enable / Disable
//function ShowHierarchy() {

//    $('#col1').show();
//    $('#col2').show();
//    $('#col3').show();
//    $('#col4').show();
//    $('#col5').show();
//    $('#col6').show();

//    $('#col11').show();
//    $('#col22').show();
//    $('#col33').show();
//    $('#col44').show();
//    $('#col55').show();
//    $('#col66').show();
//}
//function HideHierarchy() {

//    $('#col1').hide();
//    $('#col2').hide();
//    $('#col3').hide();
//    $('#col4').hide();
//    $('#col5').hide();
//    $('#col6').hide();

//    $('#col11').hide();
//    $('#col22').hide();
//    $('#col33').hide();
//    $('#col44').hide();
//    $('#col55').hide();
//    $('#col66').hide();

//}


function ShowHierarchy() {
    $('#col1').show();
    $('#col2').show();
    $('#col3').show();
    $('#col4').show();
    $('#col5').show();
    $('#col6').show();

    $('#col11').show();
    $('#col22').show();
    $('#col33').show();
    $('#col44').show();
    $('#col55').show();
    $('#col66').show();

    $('#g1').show();
    $('#g2').show();
    $('#g3').show();
    $('#g4').show();
    $('#g5').show();
    $('#g6').show();

}

function HideHierarchy() {

    $('#col1').hide();
    $('#col2').hide();
    $('#col3').hide();
    $('#col4').hide();
    $('#col5').hide();
    $('#col6').hide();

    $('#col11').hide();
    $('#col22').hide();
    $('#col33').hide();
    $('#col44').hide();
    $('#col55').hide();
    $('#col66').hide();

    $('#g1').hide();
    $('#g2').hide();
    $('#g3').hide();
    $('#g4').hide();
    $('#g5').hide();
    $('#g6').hide();



}




function OnChangeddl1() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#ddl1').val();


    myData = "{'employeeId':'" + levelValue + "' }";



    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();

    }
    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl1,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });

    }
    else {
        $('#dG1').val(-1);

        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";
    }



    $('#dialog').jqmHide();

}
function OnChangeddl2() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    levelValue = $('#ddl2').val();
    myData = "{'employeeId':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl2,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    } else {
        $('#dG2').val(-1);

        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";


        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";
    }

    $('#dialog').jqmHide();
}
function OnChangeddl3() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    levelValue = $('#ddl3').val();
    myData = "{'employeeId':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl3,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        $('#dG3').val(-1);

        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";
    }

    $('#dialog').jqmHide();
}
function OnChangeddl4() {
    ;
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();



    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    levelValue = $('#ddl4').val();
    myData = "{'employeeId':'" + levelValue + "' }";
    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl4,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {

        $('#dG4').val(-1)
        //document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
        //document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";
    }


    $('#dialog').jqmHide();
}
function OnChangeddl5() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    levelValue = $('#ddl5').val();
    myData = "{'employeeId':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl5,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        $('#dG5').val(-1);


        document.getElementById('ddl6').innerHTML = "";

        document.getElementById('dG6').innerHTML = "";

    }

    $('#dialog').jqmHide();
}
function OnChangeddl6() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    if ($('#ddlreport').val() == 7) {
        document.getElementById("Chkself").checked = false;
        $('#Th8').hide();
    }

    levelValue = $('#ddl6').val();
    if (levelValue != -1) {

        myData = "{'employeeid':'" + levelValue + "' }";
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/getemployeeHR",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl16,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {

        $('#dG6').val(-1)

    }

    $('#dialog').jqmHide();
}

function onSuccessFillddl1(data, status) {

    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG2').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';

        name = 'Select ' + $('#Label2').text();
        $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

        levelValue = $('#ddl1').val();

        if (levelValue != -1) {
            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "NewReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl11,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {

            $('#dG1').val(-1)

        }

    }

    //if (CurrentUserRole == 'rl4') {
    levelValue = $('#ddl1').val();
    if (levelValue != -1) {
        myData = "{'employeeid':'" + levelValue + "' }";
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/getemployeeHR",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl11,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    // }

}
function onSuccessFillddl2(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select ' + $('#Label3').text();
        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

        levelValue = $('#ddl2').val();
        //levelValue = -1;
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "NewReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl12,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {

            $('#dG2').val(-1)

        }

    }



    if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddl2').val();
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "NewReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl12,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }


    }

}
function onSuccessFillddl3(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        value = '-1';

        name = 'Select ' + $('#Label4').text();
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });


        levelValue = $('#ddl3').val();
        //levelValue = -1;
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "NewReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl13,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {

            $('#dG3').val(-1)

        }
    }

    if (CurrentUserRole == 'rl3') {
        levelValue = $('#ddl3').val();
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "NewReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl13,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
    }

}
function onSuccessFillddl4(data, status) {

    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select ' + $('#Label9').text();
        $("#ddl5").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl5").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

        levelValue = $('#ddl4').val();
        //levelValue = -1;
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "NewReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl14,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {

            $('#dG4').val(-1)

        }

    }



    if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddl5').val();
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "NewReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl14,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }


    }

}
function onSuccessFillddl5(data, status) {

    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        value = '-1';

        name = 'Select ' + $('#Label10').text();
        $("#ddl6").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl6").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });


        levelValue = $('#ddl5').val();
        //levelValue = -1;
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "NewReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl15,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {

            $('#dG5').val(-1)

        }
    }

    if (CurrentUserRole == 'rl3') {
        levelValue = $('#ddl3').val();
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "NewReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl15,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
    }

}
function onSuccessFillddl6(data, status) { }

function dg1() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#dG1').val();
    myData = "{'level1Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/fillGH_L1",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG1,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });


    }
    else {
        $('#ddl1').val(-1)
        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";



    }




    $('#dialog').jqmHide();
}
function dg2() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    levelValue = $('#dG2').val();
    myData = "{'level2Id':'" + levelValue + "' }";
    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/fillGH_L2",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG2,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });


    }
    else {
        $('#ddl2').val(-1)
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";



    }


    $('#dialog').jqmHide();


}
function dg3() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#dG3').val();
    myData = "{'level3Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/fillGH_L3",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG3,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });


    }
    else {
        $('#ddl3').val(-1)

        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";



    }

    $('#dialog').jqmHide();
}
function dg4() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#dG4').val();
    myData = "{'level4Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/fillGH_L4",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG4,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });


    }
    else {
        $('#ddl4').val(-1)

        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";



    }

    $('#dialog').jqmHide();
}
function dg5() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#dG5').val();
    myData = "{'level5Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/fillGH_L5",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG5,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });


    }
    else {
        $('#ddl5').val(-1)

        document.getElementById('dG6').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";


    }

    $('#dialog').jqmHide();
}
function dg6() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    // G3d();
    //$('#ddl4').val
    //FillMRDr();
    $('#h6').val(levelValue);

    $('#dialog').jqmHide();
}

function OnChangeddG1() {


    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }
    levelValue = $('#dG1').val();
    myData = "{'level1Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/fillGH_L1",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG1,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });

        G3a();
    }
    else {
        $('#ddl1').val(-1)
        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";



    }


    $('#dialog').jqmHide();
}
function OnChangeddG2() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    levelValue = $('#dG2').val();
    myData = "{'level2Id':'" + levelValue + "' }";
    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/fillGH_L2",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG2,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });

        G3b();
    }
    else {
        $('#ddl2').val(-1)
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";



    }


    $('#dialog').jqmHide();


}
function OnChangeddG3() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    levelValue = $('#dG3').val();
    myData = "{'level3Id':'" + levelValue + "' }";
    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/fillGH_L3",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG3,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });

        G3c();
    }
    else {
        $('#ddl3').val(-1)


        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";


        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";



    }

    $('#dialog').jqmHide();
}
function OnChangeddG4() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    levelValue = $('#dG4').val();
    myData = "{'level4Id':'" + levelValue + "' }";
    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/fillGH_L4",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG4,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });

        G3d();
    }
    else {
        $('#ddl4').val(-1)

        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";



    }

    $('#dialog').jqmHide();
}
function OnChangeddG5() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    levelValue = $('#dG5').val();
    myData = "{'level5Id':'" + levelValue + "' }";
    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "NewReports.asmx/fillGH_L5",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG5,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false

        });

        G3e();
    }
    else {
        $('#ddl5').val(-1)

        document.getElementById('dG6').innerHTML = "";


        document.getElementById('ddl6').innerHTML = "";



    }

    $('#dialog').jqmHide();
}
function OnChangeddG6() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        // Uncheck
        document.getElementById("Chkself").checked = false;
        $('#Th8').hide();
    }


    G3f();

    $('#dialog').jqmHide();
}


function onSuccessG1(data, status) {
    document.getElementById('dG2').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label6').text();;


    $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });


}
function onSuccessG2(data, status) {
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label7').text();

    $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG3").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });

}
function onSuccessG3(data, status) {
    console.log(data.d);
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label8').text();

    $("#dG4").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });

}
function onSuccessG4(data, status) {
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label11').text();

    $("#dG5").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG5").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });

}
function onSuccessG5(data, status) {
    document.getElementById('dG6').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label12').text();

    $("#dG6").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG6").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });

}
function onSuccessG6(data, status) { }

function UH3() {


    levelValue = $('#ddl1').val();
    myData = "{'employeeId':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessUH3,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });

    }

}
function UH4() {
    levelValue = $('#ddl2').val();
    myData = "{'employeeId':'" + levelValue + "' }";


    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessUH4,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
}
function UH5() {
    levelValue = $('#ddl3').val();
    myData = "{'employeeId':'" + levelValue + "' }";


    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessUH5,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }

}
function UH6() {
    levelValue = $('#ddl4').val();
    myData = "{'employeeId':'" + levelValue + "' }";


    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessUH6,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
}
function UH7() {
    levelValue = $('#ddl5').val();
    myData = "{'employeeId':'" + levelValue + "' }";


    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessUH7,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
}
function UH8() {
    levelValue = $('#ddl6').val();
    myData = "{'employeeId':'" + levelValue + "' }";


    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/datascreen.asmx/GetEmployee",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessUH8,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }

}

function onSuccessUH3(data, status) {

    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select ' + $('#Label2').text();

        $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }

}
function onSuccessUH4(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        value = '-1';
        name = 'Select ' + $('#Label3').text();
        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }


}
function onSuccessUH5(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        value = '-1';
        name = 'Select ' + $('#Label4').text();
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }


}
function onSuccessUH6(data, status) {

    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        value = '-1';
        name = 'Select ' + $('#Label9').text();
        $("#ddl5").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl5").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }


}
function onSuccessUH7(data, status) {

    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        value = '-1';
        name = 'Select ' + $('#Label10').text();
        $("#ddl6").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl6").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }

}
function onSuccessUH8(data, status) {

    //document.getElementById('ddl6').innerHTML = "";

    //if (data.d != "") {

    //    jsonObj = jsonParse(data.d);
    //    value = '-1';
    //    name = 'Select ' + $('#Label10').text();
    //    $("#ddl6").append("<option value='" + value + "'>" + name + "</option>");

    //    $.each(jsonObj, function (i, tweet) {
    //        $("#ddl6").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
    //    });
    //}

}

function G3a() {//start


    setvalue();

    if (CurrentUserRole == 'admin') {

        $('#h2').val($('#dG1').val());
        level1 = $('#dG1').val();
        level2 = 0;
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    } if (CurrentUserRole == 'marketingteam') {

        $('#h2').val($('#dG1').val());
        level1 = $('#dG1').val();
        level2 = 0;
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl1') {

        $('#h2').val($('#dG1').val());
        level1 = $('#dG1').val();
        level2 = 0;
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl2') {

        $('#h2').val($('#dG1').val());
        level1 = $('#dG1').val();
        level2 = 0;
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl3') {

        $('#h2').val(level3Id);
        $('#h3').val($('#dG1').val());

        level1 = level3Id;
        level2 = $('#dG1').val();
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl4') {

        $('#h2').val(level3Id);
        $('#h3').val(level4Id);
        $('#h4').val($('#dG1').val());


        level1 = level3Id;
        level2 = level4Id;
        level3 = $('#dG1').val();
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";



    }
    if (CurrentUserRole == 'rl5') {

        $('#h2').val(level3Id);
        $('#h3').val(level4Id);
        $('#h4').val(level5Id);
        $('#h5').val($('#dG1').val());

        level1 = level3Id;
        level2 = level4Id;
        level3 = level5Id;
        level4 = $('#dG1').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }


    $.ajax({
        type: "POST",
        url: "NewReports.asmx/Fillemp",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessG3a,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });


}
function G3b() {
    setvalue();
    if (CurrentUserRole == 'admin') {
        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());

        level1 = $('#dG1').val();
        level2 = $('#dG2').val();
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'marketingteam') {
        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());

        level1 = $('#dG1').val();
        level2 = $('#dG2').val();
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl3') {

        $('#h2').val(level3Id);
        $('#h3').val($('#dG1').val());
        $('#h4').val($('#dG2').val());

        level1 = level3Id;
        level2 = $('#dG1').val();
        level3 = $('#dG2').val();
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl4') {

        $('#h2').val(level3Id);
        $('#h3').val(level4Id);
        $('#h4').val($('#dG1').val());
        $('#h5').val($('#dG2').val());

        level1 = level3Id;
        level2 = level4Id;
        level3 = $('#dG1').val();
        level4 = $('#dG2').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/Fillemp",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessG3b,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}
function G3c() {
    setvalue();
    if (CurrentUserRole == 'admin') {
        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());
        $('#h4').val($('#dG3').val());


        level1 = $('#dG1').val();
        level2 = $('#dG2').val();
        level3 = $('#dG3').val();
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'marketingteam') {
        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());
        $('#h4').val($('#dG3').val());


        level1 = $('#dG1').val();
        level2 = $('#dG2').val();
        level3 = $('#dG3').val();
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl3') {

        $('#h2').val(level3Id);
        $('#h3').val($('#dG1').val());
        $('#h4').val($('#dG2').val());
        $('#h5').val($('#dG3').val());


        level1 = level3Id;
        level2 = $('#dG1').val();
        level3 = $('#dG2').val();
        level4 = $('#dG3').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/Fillemp",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessG3c,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });
}
function G3d() {

    setvalue();
    if (CurrentUserRole == 'admin') {
        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());
        $('#h4').val($('#dG3').val());
        $('#h5').val($('#dG4').val());

        level1 = $('#dG1').val();
        level2 = $('#dG2').val();
        level3 = $('#dG3').val();
        level4 = $('#dG4').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }


    $.ajax({
        type: "POST",
        url: "NewReports.asmx/Fillemp",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessG3d,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });
}
function G3e() {
    setvalue();
    if (CurrentUserRole == 'admin') {
        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());
        $('#h4').val($('#dG3').val());
        $('#h5').val($('#dG4').val());
        $('#h12').val($('#dG5').val());

        level1 = $('#dG1').val();
        level2 = $('#dG2').val();
        level3 = $('#dG3').val();
        level4 = $('#dG4').val();
        level5 = $('#dG5').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }


    $.ajax({
        type: "POST",
        url: "NewReports.asmx/Fillemp",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessG3e,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });
}
function G3f() {
    setvalue();
    if (CurrentUserRole == 'admin') {
        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());
        $('#h4').val($('#dG3').val());
        $('#h5').val($('#dG4').val());
        $('#h12').val($('#dG5').val());
        $('#h13').val($('#dG6').val());

        level1 = $('#dG1').val();
        level2 = $('#dG2').val();
        level3 = $('#dG3').val();
        level4 = $('#dG4').val();
        level5 = $('#dG5').val();
        level6 = $('#dG6').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }


    $.ajax({
        type: "POST",
        url: "NewReports.asmx/Fillemp",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessG3f,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}

function onSuccessG3a(data, status) {
    console.log(data.d);
    console.log(data.d[0].Item1);

    $('#ddl1').val(data.d[0].Item1)

    if (CurrentUserRole == 'admin') {
        UH3();

    }
    if (CurrentUserRole == 'rl1') {
        UH3();

    }
    if (CurrentUserRole == 'rl2') {
        UH3();

    }
    if (CurrentUserRole == 'rl5') {
        $('#h6').val(data.d[0].Item1)

    }

    if (CurrentUserRole == 'marketingteam') {
        UH3();

    }
    if (CurrentUserRole == 'rl4') {
        UH3();
    }
    if (CurrentUserRole == 'rl3') {
        UH3();

    }

}
function onSuccessG3b(data, status) {
    $('#ddl2').val(data.d[0].Item1)

    if (CurrentUserRole == 'rl4') {
        $('#h6').val(data.d[0].Item1)

    }

    if (CurrentUserRole == 'rl1') {

        UH4();
    }

    if (CurrentUserRole == 'rl2') {

        UH4();
    }
    if (CurrentUserRole == 'admin') {

        UH4();
    }
    if (CurrentUserRole == 'marketingteam') {

        UH4();
    }
    if (CurrentUserRole == 'rl3') {

        UH4();
    }
}
function onSuccessG3c(data, status) {


    $('#ddl3').val(data.d[0].Item1)

    if (CurrentUserRole == 'rl3') {
        $('#h6').val(data.d[0].Item1)

    }

    if (CurrentUserRole == 'admin') {
        UH5();

    }
    if (CurrentUserRole == 'rl1') {
        UH5();

    }
    if (CurrentUserRole == 'admin') {
        UH5();

    }
    if (CurrentUserRole == 'marketingteam') {
        UH5();

    }
}
function onSuccessG3d(data, status) {
    $('#ddl4').val(data.d[0].Item1)
    if (CurrentUserRole == 'admin') {
        UH6();

    }
    if (CurrentUserRole == 'rl1') {
        UH6();

    }
    if (CurrentUserRole == 'rl2') {
        UH6();

    }
    if (CurrentUserRole == 'marketingteam') {
        UH6();

    }
    if (CurrentUserRole == 'rl3') {
        $('#h6').val(data.d[0].Item1)

    }


}
function onSuccessG3e(data, status) {
    $('#ddl5').val(data.d[0].Item1)

    if (CurrentUserRole == 'rl3') {
        $('#h6').val(data.d[0].Item1)

    }

    if (CurrentUserRole == 'admin') {
        UH7();

    }
    if (CurrentUserRole == 'rl1') {
        UH7();

    }
    if (CurrentUserRole == 'rl2') {
        UH7();

    }
    if (CurrentUserRole == 'marketingteam') {
        UH7();

    }
}
function onSuccessG3f(data, status) {
    $('#ddl6').val(data.d[0].Item1)
    $('#h6').val(data.d[0].Item1);

    UH8();


}

function onSuccessFillddl11(data, status) {
    setvalue();
    if (CurrentUserRole == 'admin') {

        $('#dG1').val(data.d[0].LevelId1)
        $('#h2').val(data.d[0].LevelId1)
        dg1();
    }
    if (CurrentUserRole == 'rl1') {

        $('#dG1').val(data.d[0].LevelId2)
        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)

        dg1();
    }
    if (CurrentUserRole == 'rl2') {

        $('#dG1').val(data.d[0].LevelId3)
        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)

        dg1();
    }
    if (CurrentUserRole == 'marketingteam') {

        $('#dG1').val(data.d[0].LevelId1)
        $('#h2').val(data.d[0].LevelId1)

        dg1();
    }
    if (CurrentUserRole == 'rl3') {
        $('#dG1').val(data.d[0].LevelId4)
        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)

        dg1();

    }
    if (CurrentUserRole == 'rl4') {
        $('#dG1').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)

        $('#h12').val(data.d[0].LevelId5)

        dg1();

    }
    if (CurrentUserRole == 'rl5') {
        $('#dG1').val(data.d[0].LevelId6)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)

        $('#h12').val(data.d[0].LevelId5)
        $('#h13').val(data.d[0].LevelId6)

        newemployee = $('#ddl1').val();
        $('#h6').val(newemployee);


    }
}
function onSuccessFillddl12(data, status) {
    setvalue();
    if (CurrentUserRole == 'admin') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)

        dg2();
    }
    if (CurrentUserRole == 'marketingteam') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)

        dg2();
    }
    if (CurrentUserRole == 'rl1') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)

        dg2();
    }
    if (CurrentUserRole == 'rl2') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)

        dg2();
    }
    if (CurrentUserRole == 'rl3') {
        $('#dG2').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)




        dg2();
    }
    if (CurrentUserRole == 'rl4') {
        $('#dG2').val(data.d[0].LevelId6)
        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)

        newemployee = $('#ddl2').val();
        $('#h6').val(newemployee);



    }

    //OnChangeddG2();
}
function onSuccessFillddl13(data, status) {
    setvalue();
    if (CurrentUserRole == 'admin') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        dg3();
    }
    if (CurrentUserRole == 'marketingteam') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        dg3();
    }
    if (CurrentUserRole == 'rl1') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        dg3();
    }
    if (CurrentUserRole == 'rl2') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        dg3();
    }
    if (CurrentUserRole == 'rl3') {
        $('#dG3').val(data.d[0].LevelId6)
        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)
        $('#h5').val(data.d[0].LevelId6)

        newemployee = $('#ddl3').val();
        $('#h6').val(newemployee);




    }


    //OnChangeddG3();
}
function onSuccessFillddl14(data, status) {
    setvalue();
    if (CurrentUserRole == 'admin') {
        ;
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)
        $('#dG4').val(data.d[0].LevelId4)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)
        dg4();
    }
    if (CurrentUserRole == 'marketingteam') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)
        $('#dG4').val(data.d[0].LevelId4)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)
        dg4();
    }
    if (CurrentUserRole == 'rl1') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        dg4();
    }
    if (CurrentUserRole == 'rl2') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        dg4();
    }
    if (CurrentUserRole == 'rl3') {
        $('#dG3').val(data.d[0].LevelId6)
        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)
        $('#h5').val(data.d[0].LevelId6)

        newemployee = $('#ddl3').val();
        $('#h6').val(newemployee);




    }


    //OnChangeddG3();
}
function onSuccessFillddl15(data, status) {
    setvalue();
    if (CurrentUserRole == 'admin') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)
        $('#dG4').val(data.d[0].LevelId4)
        $('#dG5').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)
        $('#h12').val(data.d[0].LevelId5)
        dg5();
    }
    if (CurrentUserRole == 'marketingteam') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)
        $('#dG4').val(data.d[0].LevelId4)
        $('#dG5').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)
        $('#h12').val(data.d[0].LevelId5)
        dg5();
    }
    if (CurrentUserRole == 'rl1') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)
        $('#dG4').val(data.d[0].LevelId4)
        $('#dG5').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)
        $('#h12').val(data.d[0].LevelId5)
        dg5();
    }
    if (CurrentUserRole == 'rl2') {
        $('#dG1').val(data.d[0].LevelId1)
        $('#dG2').val(data.d[0].LevelId2)
        $('#dG3').val(data.d[0].LevelId3)
        $('#dG4').val(data.d[0].LevelId4)
        $('#dG5').val(data.d[0].LevelId5)

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)
        $('#h12').val(data.d[0].LevelId5)
        dg5();
    }
    if (CurrentUserRole == 'rl3') {
        $('#dG3').val(data.d[0].LevelId6)
        $('#h2').val(data.d[0].LevelId3)
        $('#h3').val(data.d[0].LevelId4)
        $('#h4').val(data.d[0].LevelId5)
        $('#h5').val(data.d[0].LevelId6)

        newemployee = $('#ddl3').val();
        $('#h6').val(newemployee);

        //FillMRDr();


    }


    //OnChangeddG3();
}
function onSuccessFillddl16(data, status) {
    setvalue();
    $('#dG1').val(data.d[0].LevelId1)
    $('#dG2').val(data.d[0].LevelId2)
    $('#dG3').val(data.d[0].LevelId3)
    $('#dG4').val(data.d[0].LevelId4)
    $('#dG5').val(data.d[0].LevelId5)
    $('#dG6').val(data.d[0].LevelId6)

    $('#h2').val(data.d[0].LevelId1)
    $('#h3').val(data.d[0].LevelId2)
    $('#h4').val(data.d[0].LevelId3)
    $('#h5').val(data.d[0].LevelId4)
    $('#h12').val(data.d[0].LevelId5)
    $('#h13').val(data.d[0].LevelId6)

    dg6();
    //OnChangeddG4();


}



function FillDropDownList() {

    myData = "{'levelName':'" + glbVarLevelName + "' }";

    $.ajax({
        type: "POST",
        url: "../Reports/datascreen.asmx/FilterDropDownList",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: onSuccessFillDropDownList,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessFillDropDownList(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);


        if (glbVarLevelName == "Level1") {

            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            value = '-1';
            //farazlabel
            if (CurrentUserRole == 'admin') {
                name = 'Select ' + HierarchyLevel1;
                $('#Label1').append(HierarchyLevel1 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel2 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label9').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label10').append(HierarchyLevel6 + " " + "");

                $('#Label5').append(HierarchyLevel1 + " " + "Level ");
                $('#Label6').append(HierarchyLevel2 + " " + "Level ");
                $('#Label7').append(HierarchyLevel3 + " " + "Level ");
                $('#Label8').append(HierarchyLevel4 + " " + "Level ");
                $('#Label11').append(HierarchyLevel5 + " " + "Level ");
                $('#Label12').append(HierarchyLevel6 + " " + "Level ");
            }
            if (CurrentUserRole == 'rl1') {
                name = 'Select ' + HierarchyLevel2;
                $('#Label1').append(HierarchyLevel2 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label9').append(HierarchyLevel6 + " " + "");

                $('#Label5').append(HierarchyLevel2 + " " + "Level ");
                $('#Label6').append(HierarchyLevel3 + " " + "Level ");
                $('#Label7').append(HierarchyLevel4 + " " + "Level ");
                $('#Label8').append(HierarchyLevel5 + " " + "Level ");
                $('#Label11').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl2') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel6 + " " + "");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl3') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel6 + " " + "");


                $('#Label5').append(HierarchyLevel4 + " " + "Level ");
                $('#Label6').append(HierarchyLevel5 + " " + "Level ");
                $('#Label7').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel6 + " " + "");

                $('#Label5').append(HierarchyLevel5 + " " + "Level ");
                $('#Label6').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "");
                $('#Label5').append(HierarchyLevel6 + " " + "Level ");
            }


            name = 'Select ' + $('#Label1').text();
            $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }
        else if (glbVarLevelName == "Level3") {

            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";

            value = '-1';

            if (CurrentUserRole == 'admin') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel6 + " " + "");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'marketingteam') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label4').append(HierarchyLevel6 + " " + "");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl3') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append(HierarchyLevel4 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label3').append(HierarchyLevel6 + " " + "");


                $('#Label5').append(HierarchyLevel4 + " " + "Level ");
                $('#Label6').append(HierarchyLevel5 + " " + "Level ");
                $('#Label7').append(HierarchyLevel6 + " " + "Level ");



            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append(HierarchyLevel5 + " " + "Manager ");
                $('#Label2').append(HierarchyLevel6 + " " + "");

                $('#Label5').append(HierarchyLevel5 + " " + "Level ");
                $('#Label6').append(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "");
                $('#Label5').append(HierarchyLevel6 + " " + "Level ");
            }


            name = 'Select ' + $('#Label1').text();
            $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }




        FillGh();
    }
}

function FillGh() {

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/fillGH",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessFillGH,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}
function onSuccessFillGH(data, status) {
    console.log(data.d);

    document.getElementById('dG1').innerHTML = "";
    document.getElementById('dG2').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    value = '-1';
    name = 'Select ' + $('#Label5').text();

    $("#dG1").append("<option value='" + value + "'>" + name + "</option>");

    $.each(data.d, function (i, tweet) {
        $("#dG1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
    });

}




function OnChangeddl8() {
    if ($('#ddl8').val() == '1') {
        $('#Th3,#Th22').hide();
    }
    else {
        $('#Th3,#Th22').hide();
    }
}



function setvalue() {

    $('#h2').val(-1);
    $('#h3').val(-1);
    $('#h4').val(-1);
    $('#h5').val(-1);
    $('#h6').val(-1);
}


function onError(request, status, error) {

    msg = 'Error occoured';

    $.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });
}
function startingAjax() {
    //  $('#imgLoading').show();
    //     
    //    
    //   
}
function ajaxCompleted() {
    // 
    //$('.loading').fadeOut('slow');
    //$('.loading_bgrd').fadeOut('slow');
    // $('#imgLoading').hide();
}


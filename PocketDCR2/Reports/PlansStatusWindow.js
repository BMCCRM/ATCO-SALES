var planCheckedBoxes = [];
var multipleIds = [];
var EmpID = [];

function pageLoad() {

    IsValidUser();
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


    //$('#btn').onclick(onclick_btn);
    //$('#content-table-inner').hide();

    //$('#btnGreports').onclick(onclick_btnGreports);

    // $("#stdate").datepicker();
    // $("#enddate").datepicker();

    var cdt = new Date();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var current_mint = cdt.getMinutes();
    var current_hrs = cdt.getHours();
    var current_date = cdt.getDate();
    var current_date2 = current_date - 1;


    var current_month = cdt.getMonth();
    var current_month = current_month + 1;
    var month_name = monthNames[current_month];
    var current_year = cdt.getFullYear();
    $('#stdate').val(current_date2 + '/' + current_month + '/' + current_year);
    $('#enddate').val(current_month + '/' + current_date + '/' + current_year);


    FillProductSku();
    HideHierarchy();
    GetCurrentUser();

    $('#multipleStatusApprove').jqm({ modal: true });
    $('#ApproveMultiplePlansBtn').click(showStatusJQM);
    $('.btnDetailsCancel').click(statusBtnCancelled);
    $('.btnDetailsSubmit').click(statusBtnSubmitted);


}

//$('#dG7').change(function () {
//    alert('Hello World');
//    //GetSuccessSMS();
//});

function onclick_btn() {
    GetSuccessSMS();
}

function showStatusJQM() {
    debugger
    planCheckedBoxes = document.querySelectorAll('input[name=selectPlan]:checked');

    if (planCheckedBoxes.length > 0) {
        for (var i = 0; i < planCheckedBoxes.length; i++) {

            multipleIds.push(planCheckedBoxes[i].value);

            //EmpID = planCheckedBoxes[i];

        }
        $('#multipleStatusApprove').jqmShow();

        //addMultipleToList();
    }
    else {
        alert("Please Select a Plan");
    }



}

function statusBtnCancelled() {
    $(this).parents('.divTable').find('.requireError').hide();
    $(this).parents('.divTable').find('#statusAction').val('-1'); 
    resetApprovalRequest();
}

function resetApprovalRequest() {
    $('#multipleStatusApprove').jqmHide();
    $('.selectPlan').attr('checked', false);
    $('.selectPlan').attr('checked', false);
    $('input[name="selectAllPlans"]').attr('checked', false)
    multipleIds = [];
}

function GetSuccessSMS() {
    //    $('#dialog').jqm({ modal: true });
    //    $('#dialog').jqm();
    //    $('#dialog').jqmShow();


    //if ($('#dG1').val() != null) {
    //    level3 = 1
    //} else {
    //    level3 = -1
    //}
    resetApprovalRequest();

    level1 = ($('#h2').val() == '-1') ? '0' : $('#h2').val();
    if ($('#h3').val() != null) {
        level2 = $('#h3').val();
        if (level2 == "-1") {
            level2 = 0
        }
    } else {
        level2 = 0
    }

    if ($('#h4').val() != null) {
        level3 = $('#h4').val();
        if (level3 == "-1") {
            level3 = 0
        }
    } else {
        level3 = 0
    }

    if ($('#h5').val() != null) {
        level4 = $('#h5').val();
        if (level4 == "-1") {
            level4 = 0
        }
    } else {
        level4 = 0
    }

    if ($('#h12').val() != null) {
        level5 = $('#h12').val();
        if (level5 == "-1") {
            level5 = 0
        }
    } else {
        level5 = 0
    }

    if ($('#h13').val() != null) {
        level7 = $('#h13').val();
        if (level7 == "-1") {
            level7 = 0
        }
    } else {
        level7 = 0
    }
    if ($('#st').val() != null) {
        sstatus = $('#st').val();
        if (sstatus == "") {
            sstatus = 0
        }
    } else {
        sstatus = 0
    }

    var Type1 = $('#dG7').val();

    employeeid = 0; startdate = $('#stdate').val().split('/')[1] + '/' + $('#stdate').val().split('/')[0] + '/' + $('#stdate').val().split('/')[2]; enddate = $('#stdate').val();

    myData = "{'level1Id':'" + level1 + "','level2Id':'" + level2 + "','level3Id':'" + level3 + "','level4Id':'" + level4 + "','level5Id':'" + level5 + "','level6Id':'" + level7
    + "','Status':'" + sstatus
    + "','dt1':'" + startdate
    + "','dt2':'" + enddate + "','Type1':'" + Type1 +  "'}";
    console.log("The Data", myData);

    

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm(); onclick_btn
    $('#dialog').jqmShow();
    $.ajax({
        type: "POST",
        url: "PlanStatusWindow.asmx/datagrid",
        data: myData,
        contentType: "application/json",
        async: true,
        success: onSuccessGetSuccessSMS,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });



}
function onSuccessGetSuccessSMS(data, status) {
   debugger;
     console.log( data.d);

       

    $('#dialog').jqmHide();
    $('#SuccessSMS .dataTables_wrapper').remove();
    $('#statusAction').empty();
    $('#statusAction').append((CurrentUserRole == 'rl4' || CurrentUserRole == 'rl3') ? '<option value="0">Select Status</option><option value="Approved">Approved</option><option value="Rejected">Rejected</option>' : '<option value="0">Select Status</option><option value="Approved">Approved</option><option value="Draft">Draft</option><option value="Submitted">Submitted</option><option value="Rejected">Rejected</option><option value="Resubmitted">Resubmitted</option>')

    if (data.d != "" && (CurrentUserRole == 'admin' || CurrentUserRole == 'rl4' || CurrentUserRole == 'rl3')) {

        $('#ApproveMultiplePlansBtn').css('visibility', 'visible');
    }

    if (CurrentUserRole == 'admin') {
        $('#SuccessSMS').prepend($('<table id="datatables" class="display"><thead><tr><th style="width: 99px">Select All <input style="vertical-align: middle;margin-top: 0px;" type="checkbox" name="selectAllPlans" onClick=\"SelectAllCheckBoxes();\"/> </th><th>Team</th><th>Region</th><th>District</th><th>Territory</th><th>Employee Name</th><th>Total Doctor</th><th>Planned Doctors</th><th>Designation</th><th>Plan Month</th><th>Plan Status</th><th>Plan Create Date Time</th><th>Plan Update Date Time</th><th>Action</th><th>Edit</th></tr></thead><tbody>'));

        debugger;
        console.log("This is data", data.d, data);
      


        $.each(data.d, function (i, option) {
            EmpID.push(option.EmployeeId);
            $('#datatables').append($('<tr><td>'
            + '<input style="vertical-align: middle;margin-top: 0px;" type="checkbox" name="selectPlan" class="selectPlan" value = ' + option.ID + ',' + option.EmployeeId + ' />' + '</td><td>'
            + option.Team + '</td><td>'
            + option.Region + '</td><td>'
            + option.Zone + '</td><td>'
            + option.Territory + '</td><td>'
            + option.EmployeeName + '</td><td>'
            + option.TotalDoctor + '</td><td>'
            + option.TotalPlans + '</td><td>'
            + option.Designation + '</td><td>'
            + option.Plan_Month + '</td><td>'   
            + option.CPM_PlanStatus + '</td><td>'
          //  + option.EmployeeId + '</td><td>'
            + (option.CPM_CreateDateTime.split('/')[1] + '/' + option.CPM_CreateDateTime.split('/')[0] + '/' + option.CPM_CreateDateTime.split('/')[2]) + '</td><td>'
            + (option.CPM_UpdateDateTime.split('/')[1] + '/' + option.CPM_UpdateDateTime.split('/')[0] + '/' + option.CPM_UpdateDateTime.split('/')[2]) + '</td><td>'
            + '<select id="st' + option.ID + '" name="st1" class="styledselect_form_1"><option value="0">Select...</option><option value="Approved">Approved</option><option value="Draft">Draft</option><option value="Submitted">Submitted</option><option value="Rejected">Rejected</option><option value="Resubmitted">Resubmitted</option></select>' + '</td><td>'
            + '<a href="#" onclick="return GetEditData(' + option.ID + ',' + option.EmployeeId + '); return false">Update</a>' + '</td></tr>'));
            //+ '<a href="#" onclick="return statusBtnSubmitted(' + option.ID + ',' + option.EmployeeId + '); return false">Approve All Plan</a>' + '</td></tr>';

        });


    } else if (CurrentUserRole == 'rl4' || CurrentUserRole == 'rl3') {
        $('#SuccessSMS').prepend($('<table id="datatables" class="display"><thead><tr><th style="width: 99px">Select All <input style="vertical-align: middle;margin-top: 0px;" type="checkbox" name="selectAllPlans" onClick=\"SelectAllCheckBoxes();\"/> </th><th>Team</th><th>Region</th><th>District</th><th>Territory</th><th>Employee Name</th><th>Total Doctor</th><th>Planned Doctors</th><th>Designation</th><th>Plan Month</th><th>Plan Status</th><th>Plan Create Date Time</th><th>Plan Update Date Time</th><th>Action</th><th>Edit</th></tr></thead><tbody>'));

        $.each(data.d, function (i, option) {
            $('#datatables').append($('<tr><td>'
                + ((option.CPM_PlanStatus == 'Submitted' || option.CPM_PlanStatus == 'Resubmitted') ? '<input style="vertical-align: middle;margin-top: 0px;" type="checkbox" name="selectPlan" class="selectPlan" value = ' + option.ID + ',' + option.EmployeeId + '/>' : '-') + '</td><td>'
            + '<input style="vertical-align: middle;margin-top: 0px;" type="checkbox" name="selectPlan" class="selectPlan" value = ' + option.ID + ',' + option.EmployeeId + ' />' + '</td><td>'
            + option.Team + '</td><td>'
            + option.Region + '</td><td>'
            + option.Zone + '</td><td>'
            + option.Territory + '</td><td>'
            + option.EmployeeName + '</td><td>'
            + option.TotalDoctor + '</td><td>'
            + option.TotalPlans + '</td><td>'
             + option.Designation + '</td><td>'
            + option.Plan_Month + '</td><td>'
            + option.CPM_PlanStatus + '</td><td>'
            + option.CPM_CreateDateTime + '</td><td>'
            + option.CPM_UpdateDateTime + '</td><td>'
            //+ (option.CPM_PlanStatus == 'Submitted' ? ((CurrentUserRole == 'rl4' || CurrentUserRole == 'rl3') ? '<select id="st' + option.ID + '" name="st1" class="styledselect_form_1"><option value="0">Select...</option><option value="Approved">Approved</option><option value="Rejected">Rejected</option></select>' + '</td><td>' : '<select id="st' + option.ID + '" name="st1" class="styledselect_form_1"><option value="0">Select...</option><option value="Approved">Approved</option><option value="Draft">Draft</option><option value="Submitted">Submitted</option><option value="Rejected">Rejected</option><option value="Resubmitted">Resubmitted</option></select>' + '</td><td>') : '<td>-</td>')
           + ((option.CPM_PlanStatus == 'Submitted' || option.CPM_PlanStatus == 'Resubmitted') ? '<select id="st' + option.ID + '" name="st1" class="styledselect_form_1"><option value="0">Select...</option><option value="Approved">Approved</option><option value="Rejected">Rejected</option></select>' : '-') + '</td><td>'
           + ((option.CPM_PlanStatus == 'Submitted' || option.CPM_PlanStatus == 'Resubmitted') ? '<a href="#" onclick="return GetEditData(' + option.ID + ',' + option.EmployeeId + '); return false">Update</a>' : '-') + '</td></tr>'));

        });
    } else {
        $('#SuccessSMS').prepend($('<table id="datatables" class="display"><thead><tr><th>Team</th><th>Region</th><th>District</th><th>Territory</th><th>Employee Name</th><th>Total Doctor</th><th>Planned Doctors</th><th>Designation</th><th>Plan Month</th><th>Plan Status</th><th>Plan Create Date Time</th><th>Plan Update Date Time</th></tr></thead><tbody>'));

        $.each(data.d, function (i, option) {
            $('#datatables').append($('<tr><td>'
            + option.Team + '</td><td>'
            + option.Region + '</td><td>'
            + option.Zone + '</td><td>'
            + option.Territory + '</td><td>'
            + option.EmployeeName + '</td><td>'
            + option.TotalDoctor + '</td><td>'
            + option.TotalPlans + '</td><td>'
             + option.Designation + '</td><td>'
            + option.Plan_Month + '</td><td>'
            + option.CPM_PlanStatus + '</td><td>'
            + option.CPM_CreateDateTime + '</td><td>'
            + option.CPM_UpdateDateTime + '</td>'
           + '</tr>'));
        });
    }


    $('#SuccessSMS').append($('</tbody></table>'));

    $('#datatables').dataTable({
        "sPaginationType": "full_numbers",
        "bJQueryUI": true,
        "bScrollCollapse": true
    });

    //GetErrorSMS();


}

function SelectAllCheckBoxes() {

    if ($('input[name="selectAllPlans"]').is(':checked')) {
        $('.selectPlan').attr('checked', true);

    } else {
        $('.selectPlan').attr('checked', false);

    }

}

function GetEditData(id,EmployeeId) {

    status1 = $('#st' + id + '').val();
    if (status1 == "0") {
        alert("Select Status");
    }
    else {


        myData = "{'id':'" + id + "','status1':'" + status1 + "','EmployeeId':'" + EmployeeId + "'}";

        $.ajax({
            type: "POST",
            url: "PlanStatusWindow.asmx/status_update",
            data: myData,
            contentType: "application/json",
            async: false,
            success: onSuccessupdate,
            error: onErroru,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });

    }
}
//https://itsjavascript.com/javascript-typeerror-string-split-is-not-a-function

function statusBtnSubmitted(id) {
    debugger
    status1 = $('#statusAction').val();
    if (status1 == "0") {
        alert("Select Status");
    }
    else {
        EmpID 
     
        for (var i = 0; i < id.view.multipleIds.length; i++) {
            multipleIds = id.view.multipleIds;
                
            //var nameArr = multipleIds.split(",");
            //console.log(nameArr[i]);
        }

        const myArray = multipleIds.toString().split(",");

        console.log(myArray)

        var MID = "";
        var EID = "";
        var count = 1;
        for (var i = 0; i < myArray.length; i++) {

            MID = MID+","+myArray[i];
            EID = EID + "," + myArray[count+i]
            i++;
        }


        var mioids = [];
        var empids = [];

        mioids = MID;
        empids = EID;
        
        


        //myData = "{'ids':'" + 100 + "','status1':'" + status1 + "','EmployeeId':'" + 100 + "'}";
        myData = "{'ids':'" + mioids + "','status1':'" + status1 + "','EmployeeId':'" + empids + "'}";
                $.ajax({
            type: "POST",
            url: "PlanStatusWindow.asmx/multiple_status_update",
            data: myData,
            contentType: "application/json",
            async: false,
            success: onSuccessupdate,
            error: onErroru,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });

    }
}


function onSuccessupdate() {
    GetSuccessSMS();
    //alert(id + " " + status1);
    alert('Plan Status Updated Successfully');

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


function GetErrorSMS() {
    alert("Error");
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

function DCR() {
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    //mydatetem();
    servicepath();
    var mio = '';
    var zsm = '';
    if (CurrentUserRole == 'admin') {
        mio = $('#ddl4').val();
        zsm = $('#ddl3').val();
    }
    else if (CurrentUserRole == 'rl3') {
        mio = $('#ddl3').val();
        zsm = $('#ddl2').val();
    }
    else if (CurrentUserRole == 'rl4') {
        mio = $('#ddl2').val();
        zsm = $('#ddl1').val();
    }
    else if (CurrentUserRole == 'rl5') {
        mio = $('#ddl1').val();
        zsm = EmployeeId;
    }
    else if (CurrentUserRole == 'rl6') {
        mio = EmployeeId;
        zsm = '0';
    }





    l1 = 0; l2 = 0;
    l3 = $('#h2').val();
    l4 = $('#h3').val();
    l5 = $('#h4').val();
    l6 = $('#h5').val();

    if (l3 == '-1') {
        l3 = 0;
    }
    if (l4 == '-1') {
        l4 = 0;
    }
    if (l5 == '-1') {
        l5 = 0;
    }
    else if (zsm == '-1' || zsm == null) {
        l5 = 0;
    }

    if (l6 == '-1') {
        l6 = 0;
        l8 = 0;
    }
    else if (mio == '-1' || mio == null) {
        l6 = 0;
        l8 = 0;
    }
    else {
        l8 = $('#h6').val();
    }



    $('#h8').val($('#ddlProduct').val());
    $('#h10').val($('#Jv').val());

    l9 = $('#h7').val();
    l7 = $('#h8').val();
    l11 = $('#h9').val();
    l12 = $('#h10').val();
    l13 = $('#stdate').val();
    l14 = $('#enddate').val();

    if (l9 == '-1') { l9 = 0 }
    if (l9 == '') { l9 = 0 }
    if (l9 == 'null') { l9 = 0 }
    if (l7 == '-1') { l7 = 0 }
    if (l7 == '') { l7 = 0 }
    if (l7 == 'null') { l7 = 0 }
    if (l11 == '-1') { l11 = 0 }
    if (l11 == '') { l11 = 0 }
    if (l11 == 'null') { l11 = 0 }
    if (l12 == '-1') { l12 = 0 }
    if (l12 == '') { l12 = 0 }
    if (l12 == 'null') { l12 = 0 }

    l10 = 0;
    var SDate = new Date(l13);
    var EDate = new Date(l14);

    diff = 0;

    if (SDate >= EDate) {
        diff = 0;
    }

    if (diff == 0) {

        myreportData = "{'level1Id':'" + l1
         + "','level2Id':'" + l2
         + "','level3Id':'" + l3
         + "','level4Id':'" + l4
         + "','level5Id':'" + l5
         + "','level6Id':'" + l6
         + "','skuid':'" + l7
         + "','empid':'" + l8
         + "','drid':'" + l9
         + "','clid':'" + l10
         + "','vsid':'" + l11
         + "','jv':'" + l12
         + "','dt1':'" + l13
         + "','dt2':'" + l14
         + "'}";

        $.ajax({
            type: "POST",
            url: urlservice,
            contentType: "application/json; charset=utf-8",
            data: myreportData,
            dataType: "json",
            success: onSuccessDCR,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        onErrorDt();
    }





}
function onSuccessDCR(data, status) {
    var repottyp = $('#h1').val();
    url = "report_ifram.aspx?reporttype=" + repottyp;
    var iframe = $('#Reportifram');
    $(iframe).attr('src', url);
    $(iframe).attr('class', "reportcl");

}

function IsValidUser() {

    $.ajax({
        type: "POST",
        url: "PlanStatusWindow.asmx/IsValidUser",
        contentType: "application/json; charset=utf-8",
        success: onSuccessValidUser,
        error: onError,
        cache: false
    });
}
function onSuccessValidUser(data, status) {

    var stat = data.d;
    if (stat) {
        //  GetCurrentUserLoginID(0);
    }
    else {
        window.location = "/Form/Login.aspx";
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
            url: "PlanStatusWindow.asmx/getemployeeHR",
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
        url: "../form/CommonService.asmx/GetHierarchyLevels",
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
        if (glbVarLevelName == "Level3") {

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

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

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
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

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
    if (glbVarLevelName == "Level3") {

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
        if (CurrentUserRole == 'headoffice') {

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


        } if (CurrentUserRole == 'marketingteam') {

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
            level3Id = jsonObj[0].LevelId3;
            level4Id = jsonObj[0].LevelId4;
            level5Id = jsonObj[0].LevelId5;
            level6Id = jsonObj[0].LevelId6;
        }
    }

}


function FillDropDownList() {

    myData = "{'levelName':'" + glbVarLevelName + "' }";

    $.ajax({
        type: "POST",
        url: "../Reports/PlanStatusWindow.asmx/FilterDropDownList",
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
            if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {
                name = 'Select ' + HierarchyLevel1;
                $('#Label1').append(HierarchyLevel1 + " " + "");
                $('#Label2').append(HierarchyLevel2 + " " + "");
                $('#Label3').append(HierarchyLevel3 + " " + "");
                $('#Label4').append(HierarchyLevel4 + " " + "");
                $('#Label9').append(HierarchyLevel5 + " " + "");
                $('#Label10').append(HierarchyLevel6 + " " + "-TMs");

                $('#Label5').append(HierarchyLevel1 + " " + "Level ");
                $('#Label6').append(HierarchyLevel2 + " " + "Level ");
                $('#Label7').append(HierarchyLevel3 + " " + "Level ");
                $('#Label8').append(HierarchyLevel4 + " " + "Level ");
                $('#Label11').append(HierarchyLevel5 + " " + "Level ");
                $('#Label12').append(HierarchyLevel6 + " " + "Level ");
            }
            if (CurrentUserRole == 'rl1') {
                name = 'Select ' + HierarchyLevel2;
                $('#Label1').append(HierarchyLevel2 + " " + "");
                $('#Label2').append(HierarchyLevel3 + " " + "");
                $('#Label3').append(HierarchyLevel4 + " " + "");
                $('#Label4').append(HierarchyLevel5 + " " + "");
                $('#Label9').append(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').append(HierarchyLevel2 + " " + "Level ");
                $('#Label6').append(HierarchyLevel3 + " " + "Level ");
                $('#Label7').append(HierarchyLevel4 + " " + "Level ");
                $('#Label8').append(HierarchyLevel5 + " " + "Level ");
                $('#Label11').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl2') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "");
                $('#Label2').append(HierarchyLevel4 + " " + "");
                $('#Label3').append(HierarchyLevel5 + " " + "");
                $('#Label4').append(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append(HierarchyLevel4 + " " + "");
                $('#Label2').append(HierarchyLevel5 + " " + "");
                $('#Label3').append(HierarchyLevel6 + " " + "-TMs ");


                $('#Label5').append(HierarchyLevel4 + " " + "Level ");
                $('#Label6').append(HierarchyLevel5 + " " + "Level ");
                $('#Label7').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append(HierarchyLevel5 + " " + "");
                $('#Label2').append(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').append(HierarchyLevel5 + " " + "Level ");
                $('#Label6').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "-TMs ");
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
                $('#Label1').append(HierarchyLevel3 + " " + "");
                $('#Label2').append(HierarchyLevel4 + " " + "");
                $('#Label3').append(HierarchyLevel5 + " " + "");
                $('#Label4').append(HierarchyLevel6 + " " + "-TMs");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'marketingteam') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "");
                $('#Label2').append(HierarchyLevel4 + " " + "");
                $('#Label3').append(HierarchyLevel5 + " " + "");
                $('#Label4').append(HierarchyLevel6 + " " + "-TMs");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl3') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append(HierarchyLevel4 + " " + "");
                $('#Label2').append(HierarchyLevel5 + " " + "");
                $('#Label3').append(HierarchyLevel6 + " " + "-TMs ");


                $('#Label5').append(HierarchyLevel4 + " " + "Level ");
                $('#Label6').append(HierarchyLevel5 + " " + "Level ");
                $('#Label7').append(HierarchyLevel6 + " " + "Level ");



            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append(HierarchyLevel5 + " " + "");
                $('#Label2').append(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').append(HierarchyLevel5 + " " + "Level ");
                $('#Label6').append(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "-TMs");
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


function FillAllBricks() {

    $.ajax({
        type: "POST",
        url: "PlanStatusWindow.asmx/FillAllBricks",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessFillAllBricks,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}
function onSuccessFillAllBricks(data, status) {

    if (data.d != "") {
        value = '-1';
        name = 'Select ALL Brick';

        $("#b2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#b2").append("<option value='" + tweet.LevelId + "'>" + tweet.LevelName + "</option>");
        });

    }
}

function FillMRBricks() {


    if (CurrentUserRole == 'admin') {
        levelValue = $('#ddl4').val();
    }
    if (CurrentUserRole == 'rl3') {

        levelValue = $('#ddl3').val();

    }
    if (CurrentUserRole == 'rl4') {

        levelValue = $('#ddl2').val();


    }
    if (CurrentUserRole == 'rl5') {

        levelValue = $('#ddl1').val();
    }

    myData = "{'employeeid':'" + levelValue + "' }";

    $.ajax({
        type: "POST",
        url: "PlanStatusWindow.asmx/FillMRBricks",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessMRBricks,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}
function onSuccessMRBricks(data, status) {

    if (data.d != "") {
        value = '-1';
        name = 'Select MR Brick';

        document.getElementById('b1').innerHTML = "";

        $("#b1").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#b1").append("<option value='" + tweet.LevelId + "'>" + tweet.LevelName + "</option>");
        });

    }
}

function FillMRDr() {

    if (CurrentUserRole == 'admin') {
        levelValue = $('#ddl4').val();
    }
    if (CurrentUserRole == 'rl3') {

        levelValue = $('#ddl3').val();

    }
    if (CurrentUserRole == 'rl4') {

        levelValue = $('#ddl2').val();


    }
    if (CurrentUserRole == 'rl5') {

        levelValue = $('#ddl1').val();
    }


    myData = "{'employeeid':'" + levelValue + "' }";

    $.ajax({
        type: "POST",
        url: "PlanStatusWindow.asmx/FillMrDR",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: onSuccessMRDr,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });

}
function onSuccessMRDr(data, status) {

    if (data.d != "") {
        value = '-1';
        name = 'Select MR Doctors';





    }
}

function FillProductSku() {

    myData = '';
    $.ajax({
        type: "POST",
        url: "PlanStatusWindow.asmx/FillProduct",
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

        $("#ddlProduct").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddlProduct").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });

    }
}

function FillGh() {

    $.ajax({
        type: "POST",
        url: "PlanStatusWindow.asmx/fillGH",
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



    // umer work
    if (CurrentUserRole == 'ftm') {
        SetGMHierarchyForFTM();
    }

}


function defaulyHR() {

    myData = "{'employeeid':'" + EmployeeId + "' }";

    $.ajax({
        type: "POST",
        url: "PlanStatusWindow.asmx/getemployeeHR",
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
function onSuccessdefaulyHR(data, status) {

    if (data.d != "") {

        if (CurrentUserRole == 'admin') {
        }

        if (CurrentUserRole == 'rl1') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(0);
            $('#h4').val(0);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl2') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(0);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl3') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(data.d[0].LevelId3);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl4') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(data.d[0].LevelId3);
            $('#h5').val(data.d[0].LevelId4);
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl5') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(data.d[0].LevelId3);
            $('#h5').val(data.d[0].LevelId4);
            $('#h12').val(data.d[0].LevelId5);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl6') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(data.d[0].LevelId3);
            $('#h5').val(data.d[0].LevelId4);
            $('#h12').val(data.d[0].LevelId5);
            $('#h13').val(data.d[0].LevelId6);
        }

    }
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

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {
            $('#h2').val(0);
            $('#h3').val(0);
            $('#h4').val(0);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl1') {
            $('#h3').val(0);
            $('#h4').val(0);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl2') {
            $('#h4').val(0);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl3') {
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'headoffice') {
            $('#h2').val(0);
            $('#h3').val(0);
            $('#h4').val(0);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl4') {
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl5') {
            $('#h13').val(0);
        }


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
    }
    else {
        $('#dG2').val(-1);

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {
            $('#h3').val(0);
            $('#h4').val(0);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl1') {
            $('#h4').val(0);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl2') {
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl4') {
            $('#h13').val(0);
        }

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

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {
            $('#h4').val(0);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl1') {
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl2') {
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#h13').val(0);
        }

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

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl1') {
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl2') {
            $('#h13').val(0);
        }
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
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

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {
            $('#h12').val(0);
            $('#h13').val(0);
        }
        if (CurrentUserRole == 'rl1') {
            $('#h13').val(0);
        }

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
        // document.getElementById("Chkself").checked = false;
        $('#Th8').hide();
    }

    levelValue = $('#ddl6').val();
    if (levelValue != -1) {

        myData = "{'employeeid':'" + levelValue + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/getemployeeHR",
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
        $('#h13').val(0);
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
                url: "../Reports/NewReports.asmx/getemployeeHR",
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
            $('#dG1').val(-1);
        }

    }

    levelValue = $('#ddl1').val();

    if (levelValue != -1) {
        myData = "{'employeeid':'" + levelValue + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/getemployeeHR",
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

    if (levelValue == -1) {
        $('#dG1').val(-1);
    }

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

        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/getemployeeHR",
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
                url: "../Reports/newReports.asmx/getemployeeHR",
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

    if (levelValue == -1) {
        $('#ddl2').val(-1);
        $('#dG2').val(-1);
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
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/getemployeeHR",
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

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddl3').val();
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/getemployeeHR",
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

    if (levelValue == -1) {
        $('#ddl3').val(-1);
        $('#dG3').val(-1);
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
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/getemployeeHR",
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

    if (CurrentUserRole == 'rl2') {
        levelValue = $('#ddl4').val();
    }
    if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddl5').val();
    }

    if (CurrentUserRole == 'rl2' || CurrentUserRole == 'rl4') {

        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/getemployeeHR",
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

    if (levelValue == -1) {
        $('#ddl4').val(-1);
        $('#dG4').val(-1);
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
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/getemployeeHR",
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

    if (CurrentUserRole == 'rl1') {
        levelValue = $('#ddl5').val();
    }
    else if (CurrentUserRole == 'rl3') {
        levelValue = $('#ddl3').val();
    }

    if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl3') {
        if (levelValue != -1) {

            myData = "{'employeeid':'" + levelValue + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/getemployeeHR",
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

    if (levelValue == -1) {
        $('#ddl5').val(-1);
        $('#dG5').val(-1);
    }
}
function onSuccessFillddl6(data, status) { }


function onSuccessFillddl11(data, status) {
    setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)

            $('#h3').val(0)
            $('#h4').val(0)
            $('#h5').val(0)
            $('#h12').val(0)
            $('#h13').val(0)

            dg1();

        }
        if (CurrentUserRole == 'rl1') {

            $('#dG1').val(data.d[0].LevelId2)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            $('#h4').val(0)
            $('#h5').val(0)
            $('#h12').val(0)
            $('#h13').val(0)

            dg1();

        }
        if (CurrentUserRole == 'rl2') {

            $('#dG1').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            $('#h5').val(0)
            $('#h12').val(0)
            $('#h13').val(0)

            dg1();

        }
        if (CurrentUserRole == 'marketingteam') {

            $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)

            dg1();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $('#dG1').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            $('#h12').val(0)
            $('#h13').val(0)

            dg1();

        }
        if (CurrentUserRole == 'rl4') {

            $('#dG1').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(0)

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

        }
    }
    else {
        $('#dG1').val(-1);
    }
}
function onSuccessFillddl12(data, status) {

    setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

            $('#dG2').val(data.d[0].LevelId2)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(0)
            $('#h5').val(0)
            $('#h12').val(0)
            $('#h13').val(0)

            dg2();

        }
        if (CurrentUserRole == 'marketingteam') {
            $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            dg2();

        }
        if (CurrentUserRole == 'rl1') {

            $('#dG2').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(0)
            $('#h12').val(0)
            $('#h13').val(0)

            dg2();

        }
        if (CurrentUserRole == 'rl2') {

            $('#dG2').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(0)
            $('#h13').val(0)

            dg2();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $('#dG2').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(0)

            dg2();

        }
        if (CurrentUserRole == 'rl4') {
            $('#dG2').val(data.d[0].LevelId6)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

            newemployee = $('#ddl2').val();
            $('#h6').val(newemployee);

        }
    }
    else {
        $('#dG2').val(-1);
    }
}
function onSuccessFillddl13(data, status) {

    setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1)
            $('#dG2').val(data.d[0].LevelId2)
            $('#dG3').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(0)
            $('#h12').val(0)
            $('#h13').val(0)

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

            $('#dG3').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(0)
            $('#h13').val(0)

            dg3();

        }
        if (CurrentUserRole == 'rl2') {

            $('#dG3').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(0)

            dg3();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $('#dG3').val(data.d[0].LevelId6)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
    }
    else {
        $('#dG3').val(-1);
    }
}
function onSuccessFillddl14(data, status) {

    setvalue();

    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1)
            $('#dG2').val(data.d[0].LevelId2)
            $('#dG3').val(data.d[0].LevelId3)
            $('#dG4').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(0)
            $('#h13').val(0)

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

            $('#dG4').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(0)

            dg4();

        }
        if (CurrentUserRole == 'rl2') {

            $('#dG4').val(data.d[0].LevelId6)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

            dg4();

        }
        if (CurrentUserRole == 'rl3') {

            $('#dG3').val(data.d[0].LevelId6)
            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
    }
    else {
        $('#dG4').val(-1);
    }
}
function onSuccessFillddl15(data, status) {

    setvalue();

    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

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
            $('#h13').val(0)

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

            $('#dG5').val(data.d[0].LevelId6)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

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
        }
    }
    else {
        $('#dG5').val(-1);
    }
}
function onSuccessFillddl16(data, status) {

    setvalue();
    if (data.d != '') {
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
    else {
        $('#dG6').val(-1);
    }
}

function dg1() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#dG1').val();
    myData = "{'level1Id':'" + levelValue + "' }";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L1",
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
            url: "../Reports/NewReports.asmx/fillGH_L2",
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
            url: "../Reports/NewReports.asmx/fillGH_L3",
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
            url: "../Reports/NewReports.asmx/fillGH_L4",
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
            url: "../Reports/NewReports.asmx/fillGH_L5",
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

    FillMRDr();
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
            url: "../Reports/NewReports.asmx/fillGH_L1",
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
        OnChangeddl1();

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
            url: "../Reports/NewReports.asmx/fillGH_L2",
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
        OnChangeddl2();

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
            url: "../Reports/NewReports.asmx/fillGH_L3",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessG3,
            error: onError,
            beforeSend: startingAjax,
            cache: false
        });

        G3c();
    }
    else {
        $('#ddl3').val(-1)
        OnChangeddl3();

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
            url: "../Reports/NewReports.asmx/fillGH_L4",
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
        OnChangeddl4();

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
            url: "../Reports/NewReports.asmx/fillGH_L5",
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
        OnChangeddl5();

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
        // document.getElementById("Chkself").checked = false;
        $('#Th8').hide();
    }

    G3f();
    FillMRDr();
    $('#dialog').jqmHide();

}

function onSuccessG1(data, status) {

    if (data.d != '') {
        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        value = '-1';
        name = 'Select ' + $('#Label6').text();;


        $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#dG2").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });

        if (CurrentUserRole == 'ftm') {
            SetBUHHierarchyForFTM();
        }
    }

}
function onSuccessG2(data, status) {

    if (data.d != '') {
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
        if (CurrentUserRole == 'ftm') {
            SetNationalHierarchyForFTM();
        }
    }

}
function onSuccessG3(data, status) {

    if (data.d != '') {
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        value = '-1';
        name = 'Select ' + $('#Label8').text();

        $("#dG4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#dG4").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
        if (CurrentUserRole == 'ftm') {
            SetRegionHierarchyForFTM();
        }
    }

}
function onSuccessG4(data, status) {

    if (data.d != '') {
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        value = '-1';
        name = 'Select ' + $('#Label11').text();

        $("#dG5").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#dG5").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }

}
function onSuccessG5(data, status) {

    if (data.d != '') {
        document.getElementById('dG6').innerHTML = "";

        value = '-1';
        name = 'Select ' + $('#Label12').text();

        $("#dG6").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#dG6").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }

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
}

function G3a() {

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

        $('#h2').val($('#dG1').val());
        $('#h3').val(0);
        $('#h4').val(0);
        $('#h5').val(0);
        $('#h12').val(0);
        $('#h13').val(0);

        level1 = $('#dG1').val();
        level2 = 0;
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'marketingteam') {

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

        $('#h3').val($('#dG1').val());
        $('#h4').val(0);
        $('#h5').val(0);
        $('#h12').val(0);
        $('#h13').val(0);

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = 0;
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl2') {

        $('#h4').val($('#dG1').val());
        $('#h5').val(0);
        $('#h12').val(0);
        $('#h13').val(0);

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

        $('#h5').val($('#dG1').val());
        $('#h12').val(0);
        $('#h13').val(0);

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl4') {

        $('#h12').val($('#dG1').val());
        $('#h13').val(0);

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl5') {

        $('#h13').val($('#dG1').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = $('#h13').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }

    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/Fillemp",
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

    //setvalue();
    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());
        $('#h4').val(0);
        $('#h5').val(0);
        $('#h12').val(0);
        $('#h13').val(0);

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
    if (CurrentUserRole == 'rl1') {

        $('#h4').val($('#dG2').val());
        $('#h5').val(0);
        $('#h12').val(0);
        $('#h13').val(0);

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl2') {

        $('#h5').val($('#dG2').val());
        $('#h12').val(0);
        $('#h13').val(0);

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

        $('#h12').val($('#dG2').val());
        $('#h13').val(0);

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl4') {

        $('#h13').val($('#dG2').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = $('#h13').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }

    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/Fillemp",
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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());
        $('#h4').val($('#dG3').val());
        $('#h5').val(0);
        $('#h12').val(0);
        $('#h13').val(0);

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
    if (CurrentUserRole == 'rl1') {

        $('#h5').val($('#dG3').val());
        $('#h12').val(0);
        $('#h13').val(0);

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl2') {

        $('#h12').val($('#dG3').val());
        $('#h13').val(0);

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

        $('#h13').val($('#dG3').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = $('#h13').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }

    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/Fillemp",
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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());
        $('#h4').val($('#dG3').val());
        $('#h5').val($('#dG4').val());
        $('#h12').val(0);
        $('#h13').val(0);

        level1 = $('#dG1').val();
        level2 = $('#dG2').val();
        level3 = $('#dG3').val();
        level4 = $('#dG4').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl1') {

        $('#h12').val($('#dG4').val());
        $('#h13').val(0);

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl2') {

        $('#h13').val($('#dG4').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = $('#h13').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }

    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/Fillemp",
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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

        $('#h2').val($('#dG1').val());
        $('#h3').val($('#dG2').val());
        $('#h4').val($('#dG3').val());
        $('#h5').val($('#dG4').val());
        $('#h12').val($('#dG5').val());
        $('#h13').val(0);

        level1 = $('#dG1').val();
        level2 = $('#dG2').val();
        level3 = $('#dG3').val();
        level4 = $('#dG4').val();
        level5 = $('#dG5').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl1') {

        $('#h13').val($('#dG5').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = $('#h13').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl2') {

        $('#h13').val($('#dG5').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = $('#h13').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }

    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/Fillemp",
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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm') {

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

    if (level6 != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/Fillemp",
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
    else {
        $('#ddl6').val(-1)
        OnChangeddl6();
    }
}

function onSuccessG3a(data, status) {

    if (data.d != '') {
        $('#ddl1').val(data.d[0].Item1)

    }
    else {
        $('#ddl1').val(-1)
    }
    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'marketingteam' ||
           CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2' || CurrentUserRole == 'rl3' ||
           CurrentUserRole == 'rl4' || CurrentUserRole == 'rl5' || CurrentUserRole == 'headoffice') {
        UH3();
    }

}
function onSuccessG3b(data, status) {

    if (data != '') {
        $('#ddl2').val(data.d[0].Item1)

        if (CurrentUserRole == 'rl4') {
            $('#h6').val(data.d[0].Item1)
        }
    }
    else {
        $('#ddl2').val(-1)
    }
    if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2' || CurrentUserRole == 'rl3' ||
           CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'marketingteam' || CurrentUserRole == 'headoffice') {
        UH4();
    }

}
function onSuccessG3c(data, status) {

    if (data != '') {
        $('#ddl3').val(data.d[0].Item1)

        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#h6').val(data.d[0].Item1)

        }
    }
    else {
        $('#ddl3').val(-1)
    }


    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'rl1' ||
        CurrentUserRole == 'rl2' || CurrentUserRole == 'marketingteam') {
        UH5();
    }

}
function onSuccessG3d(data, status) {

    if (data != '') {

        $('#ddl4').val(data.d[0].Item1)

        if (CurrentUserRole == 'rl3') {
            $('#h6').val(data.d[0].Item1)
        }

    }
    else {
        $('#ddl4').val(-1)
    }

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'rl1' ||
           CurrentUserRole == 'rl2' || CurrentUserRole == 'marketingteam') {
        UH6();
    }

}
function onSuccessG3e(data, status) {

    if (data != '') {
        $('#ddl5').val(data.d[0].Item1)

        if (CurrentUserRole == 'rl3') {
            $('#h6').val(data.d[0].Item1)
        }
    }
    else {
        $('#ddl5').val(-1)
    }

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'ftm' || CurrentUserRole == 'rl1' ||
        CurrentUserRole == 'rl2' || CurrentUserRole == 'marketingteam') {
        UH7();
    }
}
function onSuccessG3f(data, status) {

    if (data != '') {

        $('#ddl6').val(data.d[0].Item1)
        $('#h6').val(data.d[0].Item1);


    }
    else {
        $('#ddl6').val(-1)
    }
    UH8();

}


















// Hierarchy Enable / Disable
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

function onError(request, status, error) {

    msg = 'Error occoured';

    $.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });
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
function startingAjax() {
    //  $('#imgLoading').show();
    //    $('#dialog').jqm({ modal: true });
    //    $('#dialog').jqm();
    //    $('#dialog').jqmShow();
}
function ajaxCompleted() {

    // $('#dialog') ();
    //$('.loading').fadeOut('slow');
    //$('.loading_bgrd').fadeOut('slow');
    // $('#imgLoading').hide();
}

function setvalue() {

    $('#h2').val(-1);
    $('#h3').val(-1);
    $('#h4').val(-1);
    $('#h5').val(-1);
    $('#h6').val(-1);
}
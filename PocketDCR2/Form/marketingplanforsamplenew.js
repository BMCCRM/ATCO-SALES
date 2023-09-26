var id = [];
var docIds = [];
var lats = [];
var longs = [];
var adds = [];
var checkedboxes;
var EmployeeId = 0, DoctorId = 0, LevelId1 = 0, LevelId2 = 0, LevelId3 = 0, LevelId4 = 0, LevelId5 = 0, LevelId6 = 0, levelValue = 0, doctorLevel = 0, tempLevelId = 0,
    level1Value = 0, level2Value = 0, level3Value = 0, level4Value = 0, level5Value = 0, level6Value = 0, brickId = 0;
var CurrentUserLoginId = "", CurrentUserRole = "", glbVarLevelName = "", glbQualificationId = "", glbSpecialityId = "", glbClassId = "", glbProductId = "", MiddleName = "",
    Designation = "", Address1 = "", Address2 = "-", MobileNumber2 = "", CNICNum = "", LicenseNum = "", myData = "", value = "", name = "", levelName = "", modeValue = "", msg = "", mode = "";
var jsonObj = null;
var HierarchyLevel1 = null, HierarchyLevel2 = null, HierarchyLevel3 = null, HierarchyLevel4 = null, HierarchyLevel5 = null, HierarchyLevel6 = null;
var mio = '';
var zsm = '';
var l1 = '';
var l2 = '';
var l3 = '';
var l4 = '';
var l5 = '';
var l6 = '';
var l7 = '';
var Role = '';

function pageLoad() {

    $("#dialog1").hide();
    // $("#dialog-confirm").hide();
    var cdt = new Date();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var current_mint = cdt.getMinutes();
    var current_hrs = cdt.getHours();
    var current_date = cdt.getDate();

    var current_month = cdt.getMonth() + 1;
    var month_name = monthNames[current_month - 1];
    var current_year = cdt.getFullYear();

    $("#datemonth").datepicker({
        format: "MM yyyy",
        startView: "months",
        minViewMode: "months",
        autoclose: true
    });

    $("#datemonth").val(month_name + ' ' + current_year);

    IsValidUser();

    $('#ddl1').change(OnChangeddl1);
    $('#ddl2').change(OnChangeddl2);
    $('#ddl3').change(OnChangeddl3);
    $('#ddl4').change(OnChangeddl4);
    $('#ddl5').change(OnChangeddl5);
    $('#ddl6').change(OnChangeddl6);
    $('#ddlTeam').change(ONteamChnageGethierarchy);

    $('#dG1').change(OnChangeddG1);
    $('#dG2').change(OnChangeddG2);
    $('#dG3').change(OnChangeddG3);
    $('#dG4').change(OnChangeddG4);
    $('#dG5').change(OnChangeddG5);
    $('#dG6').change(OnChangeddG6);
    $('#dG7').change(ONteamChnageGetlevel);

    $('#btnSearch').click(btnSearch);

    HideHierarchy();
    GetCurrentUser();

    if (current_month == 1) {

        $('#date1').val("01/01/" + current_year);
        $('#date2').val("01/31/" + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 2) {
        $('#date1').val("02/01/" + current_year);
        $('#date2').val("02/29/" + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 3) {

        $('#date1').val("03/01/" + current_year);
        $('#date2').val("03/31/" + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 4) {
        $('#date1').val("04/01/" + current_year);
        $('#date2').val("04/30/" + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 5) {

        $('#date1').val("05/01/" + current_year);
        $('#date2').val("05/31/" + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 6) {
        $('#date1').val("06/01/" + current_year);
        $('#date2').val("06/30/" + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 7) {
        $('#date1').val("07/01/" + current_year);
        $('#date2').val("07/31/" + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    } else if (current_month == 8) {

        $('#date1').val("08/01/" + current_year);
        $('#date2').val("08/31/" + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 9) {
        $('#date1').val("09/01/" + current_year);
        $('#date2').val("09/30/" + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 10) {

        $('#date1').val("10/01/" + current_year);
        $('#date2').val("10/31/" + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 11) {
        $('#date1').val("11/01/" + current_year);
        $('#date2').val("11/30/" + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }
    else if (current_month == 12) {
        $('#date1').val("12/01/" + current_year);
        $('#date2').val("12/31/" + current_year);
        $('#txtDate').val(month_name + '-' + current_year);
    }


    $('#dG1').select2({
        dropdownParent: $('#g1')
    });
    $('#dG2').select2({
        dropdownParent: $('#g2')
    });
    $('#dG3').select2({
        dropdownParent: $('#g3')
    });
    $('#dG4').select2({
        dropdownParent: $('#g4')
    });
    $('#dG5').select2({
        dropdownParent: $('#g5')
    });
    $('#dG6').select2({
        dropdownParent: $('#g6')
    });
    $('#dG7').select2({
        dropdownParent: $('#g7')
    });

    $('#ddlTeam').select2({
        dropdownParent: $('#col77')
    });
    $('#ddl1').select2({
        dropdownParent: $('#col11')
    });
    $('#ddl2').select2({
        dropdownParent: $('#col22')
    });
    $('#ddl3').select2({
        dropdownParent: $('#col33')
    });
    $('#ddl4').select2({
        dropdownParent: $('#col44')
    });
    $('#ddl5').select2({
        dropdownParent: $('#col55')
    });
    $('#ddl6').select2({
        dropdownParent: $('#col66')
    });

    $("input:file").change(function () {
        uploadFile();
    });
}

function GetSelectHierarchy() {

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
        l7 = $('#dG7').val()

        mio = $('#ddl6').val();
        zsm = $('#ddl5').val();
    }
    if (CurrentUserRole == 'marketingteam') {
        mio = $('#ddl6').val();
        zsm = $('#ddl5').val();
    }
    else if (CurrentUserRole == 'rl1') {
        l7 = $('#dG3').val()

        mio = $('#ddl5').val();
        zsm = $('#ddl4').val();
    }
    else if (CurrentUserRole == 'rl2') {
        l7 = $('#dG2').val()

        mio = $('#ddl4').val();
        zsm = $('#ddlTeam').val();
    }
    else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        l7 = $('#dG1').val()

        mio = $('#ddlTeam').val();
        zsm = $('#ddl3').val();
    }
    else if (CurrentUserRole == 'rl4') {
        l7 = $('#dG1').val();

        mio = $('#ddlTeam').val();
        zsm = $('#ddl2').val();
    }
    else if (CurrentUserRole == 'rl5') {
        l7 = 0;

        mio = $('#ddl1').val();
        zsm = EmployeeId;
    }
    else if (CurrentUserRole == 'rl6') {
        l7 = 0;

        mio = EmployeeId;
        zsm = '0';
    }

    l1 = $('#h2').val();
    l2 = $('#h3').val();
    l3 = $('#h4').val();
    l4 = $('#h5').val();
    l5 = $('#h12').val();
    l6 = $('#h13').val();

    if (CurrentUserRole == 'headoffice') {
        l1 = 0;
        l2 = 0;
        l3 = 0;
    }

    if (l1 == '-1') {
        l1 = 0;
    }
    if (l2 == '-1') {
        l2 = 0;
    }
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
        l8 = mio;
    }

    l9 = $('#h7').val();

    l11 = $('#h9').val();
    l12 = $('#h10').val();

    if (l9 == '-1') { l9 = 0 }
    if (l9 == '') { l9 = 0 }
    if (l9 == 'null') { l9 = 0 }
    if (l7 == '-1') { l7 = 0 }
    if (l7 == '') { l7 = 0 }
    if (l7 == null) { l7 = 0 }
    if (l11 == '-1') { l11 = 0 }
    if (l11 == '') { l11 = 0 }
    if (l11 == 'null') { l11 = 0 }
    if (l12 == '-1') { l12 = 0 }
    if (l12 == '') { l12 = 0 }
    if (l12 == 'null') { l12 = 0 }

    l10 = 0;

    Role = CurrentUserRole;
}

function GetDataInGrid() {

    try {
        var date1 = $('#date1').val();
        var date2 = $('#date2').val();
        var level1 = $('#dG1').val();
        var level2 = $('#dG2').val();
        var level3 = $('#dG3').val();
        var level4 = $('#dG4').val();
        var level5 = $('#dG5').val();
        var level6 = $('#dG6').val();

        if (level1 == '-1' || level1 == null) {
            level1 = 0;
        }
        if (level2 == '-1' || level2 == null) {
            level2 = 0;
        }
        if (level3 == '-1' || level3 == null) {
            level3 = 0;
        }
        if (level4 == '-1' || level4 == null) {
            level4 = 0;
        }
        if (level5 == '-1' || level5 == null) {
            level5 = 0;
        }
        if (level6 == '-1' || level6 == null) {
            level6 = 0;
        }

        myData = "{'level1':'" + (($('#dG1').val() == "-1") ? "0" : level1) + "','level2':'" + (($('#dG2').val() == "-1") ? 0 : level2) + "','level3':'" + (($('#dG3').val() == "-1") ? 0 : level3) + "','level4':'" + (($('#dG4').val() == "-1") ? 0 : level4) + "','level5':'" + (($('#dG5').val() == "-1") ? 0 : level5) + "','level6':'" + (($('#dG6').val() == "-1") ? 0 : level6) + "','txtDate1':'" + date1 + "'}";
        $.ajax({
            type: "POST",
            url: "marketingplansamplenew.asmx/GetProduct",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            success: onSuccessGridFill,
            error: onError,
            beforeSend: function () {
                $('#content').parent().find('.divLodingGrid').show().fadeIn();
            },
            complete: function () {
                $('#content').parent().find('.divLodingGrid').show().fadeOut();
            },
            async: true,
            cache: false
        });
    }
    catch (e) {
        Console.log(e.description);
    }
    

}
function onSuccessGridFill(data, status) {
    debugger
    var AllProductIds = "";
    if (data.d != 'No') {
        jsonObj = jsonParse(data.d);
        var tablestring = "<table id='datatables' class='column-options' ><thead>" +
                      "<tr >"
        if (CurrentUserRole == "admin")
            tablestring += "<th ><br/><input type='checkbox' id='chkSelectAllSamples' onchange='SelectAll()'></th>"
        else
            tablestring += "<th > Select </th>"
        tablestring += "<th > Sample Product </th>" +
        "<th > Sample Issue </th>" +
        "<th  > Previous Balance </th>" +
        "<th > Total </th>" +
        "<th > Sample Distributed </th>" +
        "<th > Current Month Balance </th>" +
        "</tr>" +
        "</thead>" +
        "<tbody id='values'>";
        //if (CurrentUserRole == "admin") {
        //    tablestring += "<th > Enter Received Quantity <br/> <input type='text' id='AllProQty' name='AllProQty' > </th>" +
        //    "<th > Action <br/> <a href='#' class='buttonlink' onclick=oGrid_EditAll()>Save/Update</a> </th></tr>" +
        //    "</thead>" +
        //    "<tbody id='values'>";
        //}
        //if (CurrentUserRole == 'rl3') {
        //    tablestring += "</tr>" +
        //    "</thead>" +
        //    "<tbody id='values'>"
        //}
        //if (CurrentUserRole == 'rl4') {
        //    tablestring += "</tr>" +
        //    "</thead>" +
        //    "<tbody id='values'>"
        //}
        //if (CurrentUserRole == 'rl5') {
        //    tablestring += "</tr>" +
        //    "</thead>" +
        //    "<tbody id='values'>"
        //}
        //if (CurrentUserRole == 'rl6') {
        //    tablestring += "</tr>" +
        //    "</thead>" +
        //    "<tbody id='values'>"
        //}

        $("#gridproduct").empty();
        $("#gridproduct").append(tablestring);

        if (CurrentUserRole == "admin") {

            var odeven = '';

            for (var i = 0; i < jsonObj.length ; i++) {
                if (i % 2 == 0) {
                    odeven = "<tr class='odd'>";
                }
                else {
                    odeven = "<tr>";
                }

                $('#values').append($(odeven +
                "<td  ><input type='checkbox' id='chkSelectSamples_" + i + "' productID='" + jsonObj[i].ProductId + "'></td>" +
                "<td  >" + jsonObj[i].ProductName + "</td>" +
                "<td  >" + jsonObj[i].Qty + "</td>" +
                "<td >" + jsonObj[i].pre + "</td>" +
                "<td >" + jsonObj[i].Total + "</td>" +
                "<td  >" + jsonObj[i].Balance + "</td>" +
                "<td >" + jsonObj[i].balancet + "</td>" +
                //"<td  >" + "<input type='text' class='numberonly' id='ProQty" + jsonObj[i].ProductId + "' name='ProQty' >" + "</td>" +
                //"<td  >" + ' <a href="#" class="buttonlink" onclick="oGrid_Edit(' + jsonObj[i].ProductId + ');return false">Save/Update</a> ' + "</td>" +

                "</tr></tbody></table>"));
            }

            $.grep($('#datatables tbody tr input[type="checkbox"]:checked'), function (check) {
                console.log($(check).attr('productid'))
                return AllProductIds += $(check).attr('productid') + ',';
            });
            AllProductIds = AllProductIds.substring(0, AllProductIds.length - 1);
        }
        if (CurrentUserRole == 'rl1') {
            for (var i = 0; i < jsonObj.length ; i++) {
                var odeven = '';
                if (i % 2 == 0) {
                    odeven = "<tr class='odd'>";
                }
                else {
                    odeven = "<tr>";
                }
                $('#values').append($(odeven +
                "<td  >" + jsonObj[i].ProductName + "</td>" +
                "<td >" + jsonObj[i].Qty + "</td>" +
                "<td  >" + jsonObj[i].pre + "</td>" +
                "<td >" + jsonObj[i].Total + "</td>" +
                "<td  >" + jsonObj[i].Balance + "</td>" +
                "<td  >" + jsonObj[i].balancet + "</td>" +


                "</tr></tbody></table>"));
            }
        }
        if (CurrentUserRole == 'rl2') {
            for (var i = 0; i < jsonObj.length ; i++) {
                var odeven = '';
                if (i % 2 == 0) {
                    odeven = "<tr class='odd'>";
                }
                else {
                    odeven = "<tr>";
                }
                $('#values').append($(odeven +
                "<td  >" + jsonObj[i].ProductName + "</td>" +
                "<td >" + jsonObj[i].Qty + "</td>" +
                "<td  >" + jsonObj[i].pre + "</td>" +
                "<td >" + jsonObj[i].Total + "</td>" +
                "<td  >" + jsonObj[i].Balance + "</td>" +
                "<td  >" + jsonObj[i].balancet + "</td>" +


                "</tr></tbody></table>"));
            }
        }
        if (CurrentUserRole == 'rl3') {
            for (var i = 0; i < jsonObj.length ; i++) {
                var odeven = '';
                if (i % 2 == 0) {
                    odeven = "<tr class='odd'>";
                }
                else {
                    odeven = "<tr>";
                }
                $('#values').append($(odeven +
                "<td  >" + jsonObj[i].ProductName + "</td>" +
                "<td >" + jsonObj[i].Qty + "</td>" +
                "<td  >" + jsonObj[i].pre + "</td>" +
                "<td >" + jsonObj[i].Total + "</td>" +
                "<td  >" + jsonObj[i].Balance + "</td>" +
                "<td  >" + jsonObj[i].balancet + "</td>" +


                "</tr></tbody></table>"));
            }
        }
        if (CurrentUserRole == 'rl4') {
            for (var i = 0; i < jsonObj.length ; i++) {
                var odeven = '';
                if (i % 2 == 0) {
                    odeven = "<tr class='odd'>";
                }
                else {
                    odeven = "<tr>";
                }
                $('#values').append($(odeven +
                "<td  >" + jsonObj[i].ProductName + "</td>" +
                "<td >" + jsonObj[i].Qty + "</td>" +
                "<td  >" + jsonObj[i].pre + "</td>" +
                "<td >" + jsonObj[i].Total + "</td>" +
                "<td  >" + jsonObj[i].Balance + "</td>" +
                "<td  >" + jsonObj[i].balancet + "</td>" +
                "</tr></tbody></table>"));
            }
        }
        if (CurrentUserRole == 'rl5') {
            for (var i = 0; i < jsonObj.length ; i++) {
                var odeven = '';
                if (i % 2 == 0) {
                    odeven = "<tr class='odd'>";
                }
                else {
                    odeven = "<tr>";
                }
                $('#values').append($(odeven +
                "<td  >" + jsonObj[i].ProductName + "</td>" +
                "<td >" + jsonObj[i].Qty + "</td>" +
                "<td  >" + jsonObj[i].pre + "</td>" +
                "<td >" + jsonObj[i].Total + "</td>" +
                "<td  >" + jsonObj[i].Balance + "</td>" +
                "<td  >" + jsonObj[i].balancet + "</td>" +


                "</tr></tbody></table>"));
            }
        }
        if (CurrentUserRole == 'rl6') {
            for (var i = 0; i < jsonObj.length ; i++) {
                var odeven = '';
                if (i % 2 == 0) {
                    odeven = "<tr class='odd'>";
                }
                else {
                    odeven = "<tr>";
                }
                $('#values').append($(odeven +
                "<td  >" + jsonObj[i].ProductName + "</td>" +
                "<td >" + jsonObj[i].Qty + "</td>" +
                "<td  >" + jsonObj[i].pre + "</td>" +
                "<td >" + jsonObj[i].Total + "</td>" +
                "<td  >" + jsonObj[i].Balance + "</td>" +
                "<td  >" + jsonObj[i].balancet + "</td>" +


                "</tr></tbody></table>"));
            }
        }
    }
    else {
        var tablestring = "<table id='datatables' class='column-options' ><thead>" +
        "<tr >" +
        "<th > Sample Product </th>" +
        "<th > Sample Issue </th>" +
        "<th  > Previous Balance </th>" +
        "<th > Total </th>" +
        "<th > Sample Distributed </th>" +
        "<th > Current Month Balance </th>" +
        "</thead>" +
        "<tbody id='values'>";
        $("#gridproduct").empty();
        $("#gridproduct").append(tablestring);
        $old('#dialog').jqmHide();
        alert('Data Not Found');
    }

    $('.numberonly').keypress(function (e) {

        var charCode = (e.which) ? e.which : event.keyCode

        if (String.fromCharCode(charCode).match(/[^0-9]/g))

            return false;
    });
}

function SelectAllApproveCheckBoxes() {

    if ($('input[name="ApproveAll"]').is(':checked')) {
        $('.approveCheckBox').prop('checked', true);
    } else {
        $('.approveCheckBox').prop('checked', false);
    }

}

function SelectAllApproveCheckBoxesAddToListApprove() {

    if ($('input[name="ApproveAllForAddToListApprove"]').is(':checked')) {
        $('.approveCheckBoxForAddToListApprove').prop('checked', true);
        $('.approveCheckBoxForAddToListReject').prop('checked', false);
        $('input[name="ApproveAllForAddTolistReject"]').prop('checked', false);
    } else {
        $('.approveCheckBoxForAddToListApprove').prop('checked', false);
    }
}

function SelectAllApproveCheckBoxesForAddToListReject() {

    if ($('input[name="ApproveAllForAddTolistReject"]').is(':checked')) {
        $('.approveCheckBoxForAddToListReject').prop('checked', true);
        $('.approveCheckBoxForAddToListApprove').prop('checked', false);
        $('input[name="ApproveAllForAddToListApprove"]').prop('checked', false);
    } else {
        $('.approveCheckBoxForAddToListReject').prop('checked', false);
    }
}

function setRejectFalse(e) {

    if (e.target.checked) {
        e.target.parentElement.nextSibling.lastChild.checked = false;
    }
}

function setApproveFalse(e) {

    if (e.target.checked) {
        e.target.parentElement.previousSibling.lastChild.checked = false;
    }
}

function btnSearch() {
    //$('#dialog').jqm({ modal: true });
    //$('#dialog').jqm();
    //$('#dialog').jqmShow();

    var getdate = $('#txtDate').val();
    $('#Labq').text(getdate);

    var month = getdate.split('-')[0];
    var year = getdate.split('-')[1];

    if (month == "January") {
        $('#date1').val("01/01/" + year);
        $('#date2').val("01/31/" + year);
        GetDataInGrid();
    } else if (month == "February") {
        $('#date1').val("02/01/" + year);
        $('#date2').val("02/29/" + year);
        GetDataInGrid();
    } else if (month == "March") {
        $('#date1').val("03/01/" + year);
        $('#date2').val("03/31/" + year);
        GetDataInGrid();
    } else if (month == "April") {
        $('#date1').val("04/01/" + year);
        $('#date2').val("04/30/" + year);
        GetDataInGrid();
    } else if (month == "May") {
        $('#date1').val("05/01/" + year);
        $('#date2').val("05/31/" + year);
        GetDataInGrid();
    } else if (month == "June") {
        $('#date1').val("06/01/" + year);
        $('#date2').val("06/30/" + year);
        GetDataInGrid();
    } else if (month == "July") {
        $('#date1').val("07/01/" + year);
        $('#date2').val("07/31/" + year);
        GetDataInGrid();
    } else if (month == "August") {
        $('#date1').val("08/01/" + year);
        $('#date2').val("08/31/" + year);
        GetDataInGrid();
    } else if (month == "September") {
        $('#date1').val("09/01/" + year);
        $('#date2').val("09/30/" + year);
        GetDataInGrid();
    } else if (month == "October") {
        $('#date1').val("10/01/" + year);
        $('#date2').val("10/31/" + year);
        GetDataInGrid();
    } else if (month == "November") {
        $('#date1').val("11/01/" + year);
        $('#date2').val("11/30/" + year);
        GetDataInGrid();
    } else if (month == "December") {
        $('#date1').val("12/01/" + year);
        $('#date2').val("12/31/" + year);
        GetDataInGrid();
    }
    $('#content').parent().find('.loding_box_outer').show().fadeOut();
}

function onError(request, status, error) {

    $("<div title='Error'>" + error + "</div>").dialog();

    // alert(error);
}
function startingAjax() {
    //  $('#imgLoading').show();
    //$('#dialog').show();
    ////$('#dialog').jqm();
    $('#dialog').show();
}
function ajaxCompleted() {

    // $('#dialog') ();
    //$('.loading').fadeOut('slow');
    //$('.loading_bgrd').fadeOut('slow');
    $('#dialog').hide();
}


///// Hierarchy Setup

function IsValidUser() {

    $.ajax({
        type: "POST",
        url: "../Reports/NewDashboard.asmx/IsValidUser",
        contentType: "application/json; charset=utf-8",
        success: onSuccessValidUser,
        error: onError,
        cache: false
    });

}
function onSuccessValidUser(data, status) {

    var stat = data.d;
    if (stat) {

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

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
            $('#ddlTeam').attr('disabled', 'disabled')
        }

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'headoffice') {
            $('#ddlTeam').attr('disabled', 'disabled')
        }

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
            cache: false,
            async: false
        });

    }
    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        EmployeeIdForTeam = EmployeeId;
        FillTeamsbyBUH();
    }
    else if (CurrentUserRole == 'rl4') {
        EmployeeIdForTeam = EmployeeId;
        FillTeamsbyBUH();
    }
    GetDataInGrid('01 ' + $("#datemonth").val());
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

        jsonObj = JSON.parse(data.d);
        EditableDataLoginId = jsonObj[0].LoginId;
    }

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

        jsonObj = JSON.parse(data.d);

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

        jsonObj = JSON.parse(data.d);
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

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
            $('#btnShowResult').show();
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
            $('#btnShowResult').show();
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
            $('#btnShowResult').show();
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
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();


        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#btnShowResult').show();
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
            $('#btnShowResult').show();
            $('#gs3').hide();
            $('#cols33').hide();
            $('#col1').show();
            $('#col2').show();
            $('#col11').show();
            $('#col22').show();
            $('#g1').show();
            $('#g2').show();
            $('#btnShowResult').show();
        }
        if (CurrentUserRole == 'rl5') {
            $('#btnShowResult').show();
            $('#col1').show();
            $('#col11').show();

            $('#g1').show();

            $('#uploadify_button2').show();
            $('#exportExcel2').show();
            $('#btnShowResult').show();
        }
        if (CurrentUserRole == 'rl6') {

            $('.Th12').hide();
            $('#col77').hide();
         
        }

        GetHierarchySelection();
        FillDropDownList();

    }
    if (glbVarLevelName == "Level3") {

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
            $('#btnShowResult').show();
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
            $('#btnShowResult').show();
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
            $('#btnShowResult').show();
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
            $('#btnShowResult').show();
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
            $('#gs3').hide();
            $('#cols33').hide();
            $('#col1').show();
            $('#col2').show();
            $('#col11').show();
            $('#col22').show();

            $('#g1').show();
            $('#g2').show();
            $('#btnShowResult').show();

        }
        if (CurrentUserRole == 'rl5') {

            $('#col1').show();
            $('#col11').show();

            $('#g1').show();
            $('#uploadify_button2').show();
            $('#exportExcel2').show();
            $('#btnShowResult').show();
        }

        GetHierarchySelection();
        FillDropDownList();

    }
}

function GetHierarchySelection() {

    myData = "{'systemUserId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/GetHierarchySelection",
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

        jsonObj = JSON.parse(data.d);

        if (jsonObj != "") {
            level3Id = jsonObj[0].LevelId3;
            level4Id = jsonObj[0].LevelId4;
            level5Id = jsonObj[0].LevelId5;
            level6Id = jsonObj[0].LevelId6;
        }
    }

}

function FillTeamsbyBUH() {

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
        myData = "{'LevelId':'" + $('#dG3').val() + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/FillTeamsbyBUH",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessFillTeamsbyBUH,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    } else if (CurrentUserRole == 'rl1') {
        myData = "{'LevelId':'" + $('#dG2').val() + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/FillTeamsbyBUH",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessFillTeamsbyBUH,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    } else if (CurrentUserRole == 'rl2') {
        myData = "{'LevelId':'" + $('#dG1').val() + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/FillTeamsbyBUH",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessFillTeamsbyBUH,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'rl4' || CurrentUserRole == 'headoffice') {
        myData = "{'EmployeeId':'" + EmployeeIdForTeam + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/FillTeamsForLevel3withEmployeeId",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            async: false,
            success: onSuccessFillTeamsbyBUH,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }





}
function onSuccessFillTeamsbyBUH(data, status) {

    value = '-1';
    name = 'Select Teams';

    if (CurrentUserRole == 'rl1') {
        if (data.d != "") {
            var jsonObj = JSON.parse(data.d);
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#dG3").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            });

        } else {
            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");
        }
    } else if (CurrentUserRole == 'rl2') {
        if (data.d != "") {
            var jsonObj = JSON.parse(data.d);
            document.getElementById('dG7').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

            $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#dG2").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            });

        } else {
            $("#dG2").append("<option value='" + value + "'>" + name + "</option>");
        }
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'rl4' || CurrentUserRole == 'headoffice') {
        if (data.d != "") {
            var jsonObj = JSON.parse(data.d);
            document.getElementById('dG1').innerHTML = "";

            $("#dG1").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#dG1").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            });

        } else {
            $("#dG1").append("<option value='" + value + "'>" + name + "</option>");
        }
    } else {
        if (data.d != "") {
            var jsonObj = JSON.parse(data.d);
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#dG7").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            });

        } else {
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");
            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");
        }
    }
}

function FillDropDownListtop() {
    myData = "{'levelName':'Level1' }";

    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/fillGH",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        async: false,
        success: function (data, status) {
            $('#ddl111').empty();
            $("#ddl111").append("<option value='-1'>Select BUH Manager</option>");
            if (data.d != "") {
                $.each(data.d, function (i, tweet) {
                    $("#ddl111").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
                });
            }

        },
        error: onError,
        cache: false
    });
}

function FillDropDownList() {

    myData = "{'levelName':'" + glbVarLevelName + "' }";

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

        jsonObj = JSON.parse(data.d);

        if (glbVarLevelName == "Level1") {

            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            value = '-1';

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
                name = 'Select ' + HierarchyLevel1;
                $('#Label1').append(HierarchyLevel1 + " " + "");
                $('#Label2').append(HierarchyLevel2 + " " + "");
                $('#Label3').append(HierarchyLevel3 + " " + "");
                $('#Label4').append(HierarchyLevel4 + " " + "");
                $('#Label9').append(HierarchyLevel5 + " " + "");
                $('#Label10').append(HierarchyLevel6 + " " + "-TMs");

                $('#Label5').append(HierarchyLevel1 + " " + "");
                $('#Label6').append(HierarchyLevel2 + " " + " ");
                $('#Label7').append(HierarchyLevel3 + " " + "Level ");
                $('#Label8').append(HierarchyLevel4 + " " + "Level ");
                $('#Label11').append(HierarchyLevel5 + " " + "Level ");
                $('#Label12').append(HierarchyLevel6 + " " + "Level ");
                $('#Label13').append("Team");
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
            if (CurrentUserRole == 'headoffice') {
                name = 'Select ' + HierarchyLevel4;
                $('#Label1').append("Teams");
                $('#Label2').append(HierarchyLevel4 + " " + "");
                $('#Label3').append(HierarchyLevel5 + " " + "");
                $('#Label7').append(HierarchyLevel6 + " " + "-TMs");
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

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
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

function FillGh() {

    $.ajax({
        type: "POST",
        url: "../Reports/NewReports.asmx/fillGH",
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

    document.getElementById('dG2').innerHTML = "";
    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";
    document.getElementById('dG7').innerHTML = "";


    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'rl4' || CurrentUserRole == 'headoffice') {

    } else {
        document.getElementById('dG1').innerHTML = "";
        value = '-1';
        name = 'Select ' + $('#Label5').text();

        $("#dG1").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            $("#dG1").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });

    }



    // umer work
    if (CurrentUserRole == 'ftm') {
        SetGMHierarchyForFTM();
    }

}

function defaulyHR() {

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
function onSuccessdefaulyHR(data, status) {

    if (data.d != "") {

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
            $('#ddlTeam').attr('disabled', 'disabled')
        }

        if (CurrentUserRole == 'rl1') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(0);
            $('#h4').val(0);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
            $('#ddl3').attr('disabled', 'disabled');
        }
        if (CurrentUserRole == 'rl2') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(0);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
            $('#ddl2').attr('disabled', 'disabled');
        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(data.d[0].LevelId3);
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
            $('#ddl1').attr('disabled', 'disabled');
        }
        if (CurrentUserRole == 'rl4') {
            $('#h2').val(data.d[0].LevelId1);
            $('#h3').val(data.d[0].LevelId2);
            $('#h4').val(data.d[0].LevelId3);
            $('#h5').val(data.d[0].LevelId4);
            $('#h12').val(0);
            $('#h13').val(0);
            $('#ddl1').attr('disabled', 'disabled');
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


function ONteamChnageGethierarchy() {

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
        $('#dG7').val($('#ddlTeam').val());
        OnChangeddl3withteamId();
    }
    else if (CurrentUserRole == 'rl1') {
        levelValue = $('#ddlTeam').val();
        var teamid = $('#dG3').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $('#dG7').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole != 'rl3' && CurrentUserRole != 'rl1' && CurrentUserRole != 'rl2' || CurrentUserRole != 'headoffice') {
                document.getElementById('ddlTeam').innerHTML = "";
            }

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {
        levelValue = $('#ddlTeam').val();
        var teamid = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel5",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $('#dG7').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddlTeam').val();
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
            $('#dG7').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
    else if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddlTeam').val();
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
            $('#dG7').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl2') {
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
}

function ONteamChnageGetlevel() {

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
        $('#ddlTeam').val($('#dG7').val());
        OnChangeddl3withteamId();
    }
    else if (CurrentUserRole == 'rl1') {
        levelValue = $('#dG7').val();
        teamId = $('#dG3').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L3WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG2WithTeam,
                error: onError,
                beforeSend: startingAjax,
                cache: false
            });

            G3c();
        }
        else {
            $('#ddlTeam').val(-1)

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {
        levelValue = $('#dG7').val();
        teamId = $('#dG2').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";
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
            $('#ddlTeam').val(-1)

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#dG7').val();
        teamId = $('#dG2').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";
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
            $('#ddlTeam').val(-1)

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }

        $('#dialog').jqmHide();
    }
    else if (CurrentUserRole == 'rl4') {
        levelValue = $('#dG7').val();
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
            $('#ddlTeam').val(-1)

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
}
function OnChangeddl1() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {


        var teamid = $('#ddl1').val();
        myData = "{'employeeId':'" + EmployeeIdForTeam + "' ,'teamId':'" + teamid + "'}";

        if ($('#ddlreport').val() == 7) {
            $('#Th8').show();
        }

        if (teamid != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteam",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl3withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $('#dG1').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('ddlTeam').innerHTML = "";


            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }



        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {


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

            $('#dG1').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
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
            document.getElementById('ddlTeam').innerHTML = "";

            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }



        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl4') {
        if ($('#ddl1').val() == "-1") {
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }
        var teamid = $('#ddl1').val();
        myData = "{'employeeId':'" + EmployeeIdForTeam + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
    } else {

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

            $('#dG1').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
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
            if (CurrentUserRole != 'rl4') {
                document.getElementById('ddlTeam').innerHTML = "";
            }


            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }



        $('#dialog').jqmHide();
    }



}
function OnChangeddl2() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }
    if (CurrentUserRole == 'rl2') {
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        levelValue = $('#ddl1').val();
        var teamid = $('#ddl2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel3",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl1withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        var teamid = $('#dG1').val();
        levelValue = $('#ddl2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";

        if ($('#ddlreport').val() == 7) {
            $('#Th8').show();
        }

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel4",
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

            $('#dG2').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
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


            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddl2').val();
        teamId = $('#dG1').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamId + "'}";
        if ($('#ddlreport').val() == 7) {
            $('#Th8').show();
        }

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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

            $('#dG2').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
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
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }
        $('#dialog').jqmHide();
    } else {
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
            $('#dG2').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";


            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $('#dialog').jqmHide();
    }


}
function OnChangeddl2withteamId() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl1') {

        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        levelValue = $('#ddlTeam').val();
        var teamid = $('#ddl3').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $('#dG7').val(-1)

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
    } else if (CurrentUserRole == 'rl2') {


        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        levelValue = $('#ddlTeam').val();
        var teamid = $('#ddl2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel5",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $('#dG7').val(-1);

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole != 'rl3' && CurrentUserRole != 'rl1' && CurrentUserRole != 'rl2') {
                document.getElementById('ddlTeam').innerHTML = "";
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
    else {
        var teamid = $('#ddlTeam').val();
        levelValue = $('#ddl1').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";



        if (levelValue != -1 || teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel2",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl1withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $('#dG2').val(-1);

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl2') {
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



}
function OnChangeddl3() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl1') {



        levelValue = $('#ddl2').val();
        var teamid = $('#ddl3').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteam",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl3withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $('#dG3').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('ddlTeam').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {

        levelValue = $('#ddl3').val();
        var teamid = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";



        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl3withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else {
            $('#dG3').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $('#dialog').jqmHide();

    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddl3').val();
        teamId = $('#dG1').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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
            $('#dG3').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole == 'rl2') {
                $('#h13').val(0);
            }

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $('#dialog').jqmHide();
    } else {
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
            $('#dG3').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            if (CurrentUserRole != 'rl3' && CurrentUserRole != 'rl2') {
                document.getElementById('ddlTeam').innerHTML = "";
            }
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $('#dialog').jqmHide();
    }


}
function OnChangeddl3withteamId() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

        if ($('#ddlTeam').val() == "-1") {
            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('dG1').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        if ($('#ddlTeam').val() != null && $('#ddl1').val() != null) {
            document.getElementById('ddl2').innerHTML = "";

            levelValue = $('#ddl1').val();
            var teamid = $('#ddlTeam').val();
            myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
            if (levelValue != -1) {

                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl3withteamId,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });

            }
            else {

                $('#dG4').val(-1)

                if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
        } else {
            var teamid = $('#ddlTeam').val();
            myData = "{'employeeId':'" + EmployeeIdForTeam + "' ,'teamId':'" + teamid + "'}";
            if (teamid != -1) {

                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/GetEmployeewithteam",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl3withteamId,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });

            }
            else {

                $('#dG1').val(-1)

                if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
                document.getElementById('ddl1').innerHTML = "";
                document.getElementById('ddl2').innerHTML = "";
                document.getElementById('ddl3').innerHTML = "";
                document.getElementById('ddl5').innerHTML = "";
                document.getElementById('ddl6').innerHTML = "";
                document.getElementById('dG1').innerHTML = "";
                document.getElementById('dG2').innerHTML = "";
                document.getElementById('dG3').innerHTML = "";
                document.getElementById('dG4').innerHTML = "";
                document.getElementById('dG5').innerHTML = "";
                document.getElementById('dG6').innerHTML = "";

            }

            $('#dialog').jqmHide();
        }


    }

    else {
        levelValue = $('#ddl3').val();
        var teamid = $('#dG7').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteam",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl3withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $('#dG4').val(-1)

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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



}
function OnChangeddl4() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }


    if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2') {
        levelValue = $('#ddl4').val();
        teamId = $('#dG3').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "'}";
        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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

            $('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
    } else {
        levelValue = $('#ddl4').val();
        var teamid = $('#dG7').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
}
function OnChangeddl4withteamId() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl4') {

        if ($('#ddlTeam').val() == "-1") {
            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('dG1').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }
        var teamid = $('#ddlTeam').val();
        myData = "{'employeeId':'" + EmployeeIdForTeam + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $('#dG4').val(-1)

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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


    } else {
        levelValue = $('#ddl4').val();
        var teamid = $('#ddlTeam').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $('#dG4').val(-1)

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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



}
function OnChangeddl5() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    levelValue = $('#ddl5').val();
    teamId = $('#dG7').val();
    myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/GetEmployee",
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
        $('#dG5').val(-1).select2()

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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

        $('#dG6').val(-1).select2()
        $('#h13').val(0);
    }
    $('#dialog').jqmHide();
}

function onSuccessFillddl1(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = JSON.parse(data.d);

        if (CurrentUserRole == 'rl2') {
           
        } else if (CurrentUserRole == 'rl4') {
            document.getElementById('ddlTeam').innerHTML = "";
            value = '-1';

            name = 'Select ' + $('#Label14').text();
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        } else {
            document.getElementById('ddl2').innerHTML = "";
            value = '-1';

            name = 'Select ' + $('#Label2').text();
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }
        if (CurrentUserRole != 'rl2') {
            levelValue = $('#ddl2').val();

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
    }
    if (CurrentUserRole != 'rl4') {
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
    }
    if (levelValue == -1) {
        $('#dG1').val(-1);
    }

}
function onSuccessFillddl1withteamId(data, status) {


    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = JSON.parse(data.d);

        if (CurrentUserRole == 'rl1') {

            levelValue = $('#ddl1').val();

            if (levelValue != -1) {
                myData = "{'employeeid':'" + levelValue + "' }";
                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/getemployeeHR",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl12withteamId,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            else {
                $('#dG1').val(-1);
            }
        } else if (CurrentUserRole == 'rl2') {
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            value = '-1';

            name = 'Select ' + $('#Label3').text();
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
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
                    success: onSuccessFillddl11withteamId,
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
        else {
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
                    success: onSuccessFillddl11withteamId,
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


    }
}
function onSuccessFillddl2withteamId(data, status) {

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG3').innerHTML = "";
    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";


    if (true) {

    }

    if ($("#ddl2").val() == "-1") { } else {
        if (data.d != "") {

            jsonObj = JSON.parse(data.d);

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
                    success: onSuccessFillddl12withteamId,
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
                success: onSuccessFillddl12withteamId,
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
function onSuccessFillddl2(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {


        if (CurrentUserRole == 'rl1') {
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
        } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            document.getElementById('ddlTeam').innerHTML = "";
            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label14').text();
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });


            levelValue = $('#ddl3').val();

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
        } else if (CurrentUserRole == 'rl4') {
            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label3').text();
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });


            levelValue = $('#ddlTeam').val();

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
        } else if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
            jsonObj = JSON.parse(data.d);
            document.getElementById('ddl3').innerHTML = "";
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
        } else {
            jsonObj = JSON.parse(data.d);

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

    }

    if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddlTeam').val();
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

        jsonObj = JSON.parse(data.d);
        value = '-1';

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
        levelValue = $('#ddlTeam').val();
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
function onSuccessFillddl3withteamId(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG4').innerHTML = "";
    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddlTeam').innerHTML = "";
        document.getElementById('ddl2').innerHTML = "";

        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG7').innerHTML = "";

        if (data.d != "") {
            document.getElementById('ddl2').innerHTML = "";
            jsonObj = JSON.parse(data.d);
            value = '-1';

            name = 'Select ' + $('#Label2').text();
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });

            myData = "{'employeeid':'" + EmployeeIdForTeam + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl13withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
    } else if (CurrentUserRole == 'rl1') {
        if (data.d != "") {
            document.getElementById('ddlTeam').innerHTML = "";
            jsonObj = JSON.parse(data.d);
            value = '-1';

            name = 'Select ' + $('#Label14').text();
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });


            levelValue = $('#ddl2').val();
            if (levelValue != -1) {

                myData = "{'employeeid':'" + levelValue + "' }";
                $.ajax({
                    type: "POST",
                    url: "../Reports/newReports.asmx/getemployeeHR",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl13withteamId,
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
    } else if (CurrentUserRole == 'rl2') {
        if (data.d != "") {
            document.getElementById('ddlTeam').innerHTML = "";
            jsonObj = JSON.parse(data.d);
            value = '-1';

            name = 'Select ' + $('#Label14').text();
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
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
                    success: onSuccessFillddl13withteamId,
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
    }
    else {
        if (data.d != "") {

            jsonObj = JSON.parse(data.d);
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
                    success: onSuccessFillddl13withteamId,
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
    }
}
function onSuccessFillddl4(data, status) {

    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";


    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddlTeam').innerHTML = "";

        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG7').innerHTML = "";
        if (data.d != "") {

            document.getElementById('ddl3').innerHTML = "";
            jsonObj = JSON.parse(data.d);
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
                    url: "../Reports/newReports.asmx/getemployeeHR",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillddl13withteamId,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
        }

    } else {
        if (data.d != "") {

            jsonObj = JSON.parse(data.d);

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
function onSuccessFillddl4withteamId(data, status) {

    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    document.getElementById('dG5').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (CurrentUserRole == 'rl4') {
        if (data.d != "") {
            document.getElementById('ddl2').innerHTML = "";
            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label2').text();
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });



            myData = "{'employeeid':'" + EmployeeIdForTeam + "' }";
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/getemployeeHR",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl14withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
    } else if (CurrentUserRole == 'rl1') {

        jsonObj = JSON.parse(data.d);
        document.getElementById('ddl4').innerHTML = "";
        value = '-1';
        name = 'Select ' + $('#Label8').text();
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

        levelValue = $('#ddlTeam').val();

        myData = "{'employeeid':'" + levelValue + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/getemployeeHR",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl14withteamId,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    } else if (CurrentUserRole == 'rl2') {
        document.getElementById('ddl4').innerHTML = "";
        jsonObj = JSON.parse(data.d);

        value = '-1';
        name = 'Select ' + $('#Label4').text();
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });

        levelValue = $('#ddlTeam').val();

        myData = "{'employeeid':'" + levelValue + "' }";
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/getemployeeHR",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl14withteamId,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else {
        if (data.d != "") {

            jsonObj = JSON.parse(data.d);

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
                    success: onSuccessFillddl14withteamId,
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
    }
}
function onSuccessFillddl5(data, status) {

    document.getElementById('ddl6').innerHTML = "";
    document.getElementById('dG6').innerHTML = "";

    if (data.d != "") {

        jsonObj = JSON.parse(data.d);
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
    else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddl3').val();
    }

    if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
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
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1).select2()

            $('#h2').val(data.d[0].LevelId1)

            dg1();

        }
        if (CurrentUserRole == 'rl1') {

            $('#dG1').val(data.d[0].LevelId2).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            dg1();

        }
        if (CurrentUserRole == 'rl2') {

            $('#dG1').val(data.d[0].LevelId3).select2()

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
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $('#dG1').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg1();

        }
        if (CurrentUserRole == 'rl4') {

            $('#dG2').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            $('#h12').val(data.d[0].LevelId5)

            dg1();

        }
        if (CurrentUserRole == 'rl5') {

            $('#dG1').val(data.d[0].LevelId6).select2()
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
function onSuccessFillddl11withteamId(data, status) {
    setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)

        }
        if (CurrentUserRole == 'rl1') {

            $('#dG1').val(data.d[0].LevelId2)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            dg1WithTeam();

        }
        if (CurrentUserRole == 'rl2') {

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            dg1WithTeam();

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

            $('#dG1').val(data.d[0].LevelId6).select2()

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
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG2').val(data.d[0].LevelId2).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            dg2();

        }
        if (CurrentUserRole == 'marketingteam') {
            $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            dg2();

        }
        if (CurrentUserRole == 'rl1') {

            $('#dG2').val(data.d[0].LevelId3).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            dg2();

        }
        if (CurrentUserRole == 'rl2') {

            $('#dG2').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg2();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $('#dG3').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            dg2();

        }
        if (CurrentUserRole == 'rl4') {
            $('#dG7').val(data.d[0].LevelId6).select2()
            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            newemployee = $('#ddl2').val();
            $('#h6').val(newemployee);

        }
        if (CurrentUserRole == 'rl1') {
            FillTeamsbyBUH();
        }
    }
    else {
        $('#dG2').val(-1);
    }
}
function onSuccessFillddl12withteamId(data, status) {

    setvalue();
    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG2').val(data.d[0].LevelId2).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
        }
        if (CurrentUserRole == 'marketingteam') {
            $('#dG1').val(data.d[0].LevelId1)
            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
        }
        if (CurrentUserRole == 'rl1') {

            $('#dG2').val(data.d[0].LevelId3).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)

            dg2WithTeam();
        }
        if (CurrentUserRole == 'rl2') {

            $('#dG2').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg2WithTeam();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $('#dG2').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg2();

        }
        if (CurrentUserRole == 'rl4') {
            $('#dG2').val(data.d[0].LevelId6).select2()
            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

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
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1).select2()
            $('#dG2').val(data.d[0].LevelId2).select2()
            $('#dG3').val(data.d[0].LevelId3).select2()

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

            $('#dG3').val(data.d[0].LevelId4)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg3();

        }
        if (CurrentUserRole == 'rl2') {

            $('#dG3').val(data.d[0].LevelId5)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            dg3();

        }
        if (CurrentUserRole == 'rl3') {

            $('#dG7').val(data.d[0].LevelId6).select2()

            $('#h2').val(data.d[0].LevelId3)
            $('#h3').val(data.d[0].LevelId4)
            $('#h4').val(data.d[0].LevelId5)
            $('#h5').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
        if (CurrentUserRole == 'headoffice') {

            $('#dG7').val(data.d[0].LevelId6).select2()

            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
        if (CurrentUserRole != 'rl3' && CurrentUserRole != 'headoffice') {
            FillTeamsbyBUH();
        }

    }
    else {
        $('#dG3').val(-1);
    }
}
function onSuccessFillddl13withteamId(data, status) {

    setvalue();


    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1)
            $('#dG2').val(data.d[0].LevelId2)
            $('#dG3').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            dg3WithTeam();

        }
        if (CurrentUserRole == 'marketingteam') {
            $('#dG1').val(data.d[0].LevelId1)
            $('#dG2').val(data.d[0].LevelId2)
            $('#dG3').val(data.d[0].LevelId3)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)


        }
        if (CurrentUserRole == 'rl1') {

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)

            dg3WithTeam();

        }
        if (CurrentUserRole == 'rl2') {

            $('#dG3').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            dg3WithTeam();

        }
        if (CurrentUserRole == 'rl3') {

            $('#dG2').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            dg3WithTeam();
            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
        if (CurrentUserRole == 'headoffice') {

            $('#dG2').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            dg3WithTeam();
            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
    }
    else {
        $('#dG4').val(-1);
    }
}
function onSuccessFillddl14(data, status) {

    setvalue();

    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

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

            $('#dG4').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            dg4();

        }
        if (CurrentUserRole == 'rl2') {

            $('#dG4').val(data.d[0].LevelId6).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

            dg4();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $('#dG3').val(data.d[0].LevelId6).select2()
            $('#h2').val(data.d[0].LevelId3)
            $('#h3').val(data.d[0].LevelId4)
            $('#h4').val(data.d[0].LevelId5)
            $('#h5').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
    }
    else {
        $('#dG4').val(-1);
    }
}
function onSuccessFillddl14withteamId(data, status) {

    setvalue();

    if (data.d != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1).select2()
            $('#dG2').val(data.d[0].LevelId2).select2()
            $('#dG3').val(data.d[0].LevelId3).select2()
            $('#dG4').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            dg4WithTeam();  
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

            $('#dG7').val(data.d[0].LevelId4).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)

            dg4WithTeam();

        }
        if (CurrentUserRole == 'rl2') {

            $('#dG7').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            $('#h12').val(data.d[0].LevelId5)
            $('#h13').val(data.d[0].LevelId6)

            dg4WithTeam();

        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

            $('#dG3').val(data.d[0].LevelId6).select2()
            $('#h2').val(data.d[0].LevelId3)
            $('#h3').val(data.d[0].LevelId4)
            $('#h4').val(data.d[0].LevelId5)
            $('#h5').val(data.d[0].LevelId6)

            newemployee = $('#ddl3').val();
            $('#h6').val(newemployee);

        }
        if (CurrentUserRole == 'rl4') {

            $('#dG2').val(data.d[0].LevelId5).select2()

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)
            $('#h4').val(data.d[0].LevelId3)
            $('#h5').val(data.d[0].LevelId4)
            dg4WithTeam();
            newemployee = $('#ddl4').val();
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
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

            $('#dG1').val(data.d[0].LevelId1).select2()
            $('#dG2').val(data.d[0].LevelId2).select2()
            $('#dG3').val(data.d[0].LevelId3).select2()
            $('#dG4').val(data.d[0].LevelId4).select2()
            $('#dG5').val(data.d[0].LevelId5).select2()

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

            $('#dG5').val(data.d[0].LevelId6).select2()

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
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

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
        $('#dG1').val(data.d[0].LevelId1).select2()
        $('#dG2').val(data.d[0].LevelId2).select2()
        $('#dG3').val(data.d[0].LevelId3).select2()
        $('#dG4').val(data.d[0].LevelId4).select2()
        $('#dG5').val(data.d[0].LevelId5).select2()
        $('#dG6').val(data.d[0].LevelId6).select2()

        $('#h2').val(data.d[0].LevelId1)
        $('#h3').val(data.d[0].LevelId2)
        $('#h4').val(data.d[0].LevelId3)
        $('#h5').val(data.d[0].LevelId4)
        $('#h12').val(data.d[0].LevelId5)
        $('#h13').val(data.d[0].LevelId6)

        dg6();
    }
    else {
        $('#dG6').val(-1);
    }
}

function dg1() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2') {
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
            $('#ddl2').val(-1)
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
        }

    } else {
        levelValue = $('#dG2').val();
        teamId = $('#dG1').val();
        myData = "{'level1Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L1WithTeam",
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
            $('#ddl2').val(-1)
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
        }
    }

    $('#dialog').jqmHide();

}
function dg1WithTeam() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if (CurrentUserRole == 'rl2') {
        levelValue = $('#dG1').val();
        teamId = $('#dG2').val();
        myData = "{'level1Id':'" + levelValue + "','teamId':'" + teamId + "' }";


        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L1WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG1WithTeam,
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
    } else {
        levelValue = $('#dG1').val();
        teamId = $('#ddl2').val();
        myData = "{'level1Id':'" + levelValue + "','teamId':'" + teamId + "' }";


        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L1WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG1WithTeam,
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
    }
    $('#dialog').jqmHide();

}
function dg2() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    if (CurrentUserRole == 'rl2') {
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
    } else if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'rl1') {
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
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#dG3').val();
        teamId = $('#dG1').val();
        myData = "{'level2Id':'" + levelValue + "','teamId':'" + teamId + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L2WithTeam",
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
    } else {
        levelValue = $('#dG3').val();
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
    }


    $('#dialog').jqmHide();

}
function dg2WithTeam() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();


    if (CurrentUserRole == 'rl2') {
        levelValue = $('#dG1').val();
        teamId = $('#ddlTeam').val();
        myData = "{'level1Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L1WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG1WithTeam,
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
    } else {
        levelValue = $('#dG2').val();
        teamId = $('#ddlTeam').val();
        myData = "{'level2Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L2WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG2WithTeam,
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


}
function dg3() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#dG3').val();
    teamId = $('#dG2').val();
    myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";

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
function dg3WithTeam() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

        if ($('#ddl2').val() == "-1" || $('#ddl2').val() == " " || $('#ddl2').val() == null) {

            teamId = $('#dG1').val();
            myData = "{'level3Id':'" + EmployeeIdForTeam + "','teamId':'" + teamId + "' }";

            if (teamId != -1) {
                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/fillGH_L3WithTeam",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    async: false,
                    success: onSuccessG3WithTeam,
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

        } else {

            levelValue = $('#dG2').val();
            teamId = $('#dG1').val();
            myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";

            if (levelValue != -1) {
                $.ajax({
                    type: "POST",
                    url: "../Reports/NewReports.asmx/fillGH_L3WithTeam",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    async: false,
                    success: onSuccessG3WithTeam,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            else {
                $('#ddl2').val(-1)
                document.getElementById('dG4').innerHTML = "";
                document.getElementById('dG5').innerHTML = "";
                document.getElementById('dG6').innerHTML = "";
                document.getElementById('ddl4').innerHTML = "";
                document.getElementById('ddl5').innerHTML = "";
                document.getElementById('ddl6').innerHTML = "";
            }

            $('#dialog').jqmHide();


        }


    } else if (CurrentUserRole == 'rl1') {

        levelValue = $('#dG2').val();
        teamId = $('#dG3').val();
        myData = "{'level2Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L2WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG3WithTeam,
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
    else if (CurrentUserRole == 'rl2') {

        levelValue = $('#dG3').val();
        teamId = $('#dG2').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L3WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG3WithTeam,
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
    else {

        levelValue = $('#dG3').val();
        teamId = $('#dG7').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L3WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG3WithTeam,
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


}
function dg4() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#dG4').val();
    teamId = $('#dG3').val();
    myData = "{'level4Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L4WithTeam",
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
function dg4WithTeam() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if (CurrentUserRole == 'rl4') {

        teamId = $('#dG1').val();
        myData = "{'level4Id':'" + EmployeeIdForTeam + "','teamId':'" + teamId + "' }";

        if (teamId != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L4WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG4WithTeam,
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
    } else if (CurrentUserRole == 'rl1') {
        levelValue = $('#dG7').val();
        teamId = $('#dG3').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";


        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L3WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG4WithTeam,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false

            });

        }
        else {
            $('#ddlTeam').val(-1)
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
        }

        $('#dialog').jqmHide();
    }
    else if (CurrentUserRole == 'rl2') {
        levelValue = $('#dG7').val();
        teamId = $('#dG2').val();
        myData = "{'level4Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L4WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG4WithTeam,
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

    else {
        levelValue = $('#dG4').val();
        teamId = $('#dG7').val();
        myData = "{'level4Id':'" + levelValue + "','teamId':'" + teamId + "' }";


        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L4WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG4WithTeam,
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
}
function dg5() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    levelValue = $('#dG5').val();
    teamId = $('#dG7').val();
    myData = "{'level5Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L5WithTeam",
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

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {

        if ($('#dG1').val() == "-1") {
            $('#h5').val(0);
            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
        }

        var teamid = $('#dG1').val();
        myData = "{'employeeId':'" + EmployeeIdForTeam + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteam",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl3withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $('#dG1').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {
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

            $('#ddl1').val(-1).select2()

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
    } else if (CurrentUserRole == 'rl4') {
        var teamid = $('#dG1').val();
        myData = "{'employeeId':'" + EmployeeIdForTeam + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl4withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else {
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

            $('#ddl1').val(-1).select2()


            document.getElementById('dG2').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $('#dialog').jqmHide();
    }


}
function OnChangeddG2() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }


    if (CurrentUserRole == 'rl2') {

        levelValue = $('#ddl1').val();
        var teamid = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel3",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl1withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
        }

        $('#dialog').jqmHide();

    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#dG2').val();
        teamId = $('#dG1').val();
        myData = "{'level1Id':'" + levelValue + "','teamId':'" + teamId + "' }";


        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L1WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG1WithTeam,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

            G3a();

        }
        else {
            $('#h5').val(0);
            $('#h12').val(0);
            $('#h13').val(0);
            $('#ddl2').val(-1).select2()

            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl4') {
        levelValue = $('#dG2').val();
        teamId = $('#dG1').val();
        myData = "{'level1Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L1WithTeam",
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

            $('#ddl2').val(-1).select2()

            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else {
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
            $('#ddl2').val(-1).select2()
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
}
function OnChangeddG3() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'rl1') {
        levelValue = $('#ddl2').val();
        var teamid = $('#dG3').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        if (teamid != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteam",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl3withteamId,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

        }
        else {

            $('#dG4').val(-1).select2()

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
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
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl2') {

        levelValue = $('#dG3').val();
        teamId = $('#dG2').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L3WithTeam",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: onSuccessG2WithTeam,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });

            G3b();

        }
        else {
            $('#ddl3').val(-1).select2()

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#dG3').val();
        teamId = $('#dG1').val();
        myData = "{'level2Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L2WithTeam",
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

            $('#h12').val(0);
            $('#h13').val(0);
            $('#ddl3').val(-1).select2()

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else {
        levelValue = $('#dG3').val();
        teamId = $('#dG2').val();
        myData = "{'level3Id':'" + levelValue + "','teamId':'" + teamId + "' }";
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
            $('#ddl3').val(-1).select2()
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


}
function OnChangeddG4() {

    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();

    if ($('#ddlreport').val() == 7) {
        $('#Th8').show();
    }

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
        levelValue = $('#dG4').val();
        teamId = $('#dG7').val();
        myData = "{'level4Id':'" + levelValue + "','teamId':'" + teamId + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L4WithTeam",
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
            $('#ddl4').val(-1).select2()
            OnChangeddl4();

            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }
    } else if (CurrentUserRole == 'rl1') {
        levelValue = $('#dG4').val();
        teamId = $('#dG3').val();
        myData = "{'level4Id':'" + levelValue + "','teamId':'" + teamId + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L4WithTeam",
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
            $('#ddl4').val(-1).select2()
            OnChangeddl4();

            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }
    }
    else if (CurrentUserRole == 'headoffice') {
        levelValue = $('#dG4').val();
        teamId = $('#dG1').val();
        myData = "{'level2Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L4WithTeam",
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
            $('#ddl4').val(-1).select2()

            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";

            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";

        }

        $('#dialog').jqmHide();
    } else {
        levelValue = $('#dG4').val();
        teamId = $('#dG2').val();
        myData = "{'level4Id':'" + levelValue + "','teamId':'" + teamId + "' }";
        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/fillGH_L4WithTeam",
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
            $('#ddl4').val(-1).select2()
            OnChangeddl4();

            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

        }
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
    teamId = $('#dG7').val();
    myData = "{'level5Id':'" + levelValue + "' ,'teamId':'" + teamId + "'}";
    if (levelValue != -1) {
        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L5WithTeam",
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
        $('#ddl5').val(-1).select2()
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

    G3f();
    $('#dialog').jqmHide();

}

function onSuccessG1(data, status) {

    if (data.d != '') {
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        if (CurrentUserRole == 'rl2') {
            FillTeamsbyBUH();
        } else if (CurrentUserRole == 'rl4') {
            document.getElementById('dG7').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label7').text();;


            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitgm = nameslpit.split("_");
                $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitgm[1] + "</option>");
            });
        } else {
            document.getElementById('ddlTeam').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
            document.getElementById('dG2').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label6').text();;


            $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitgm = nameslpit.split("_");
                $("#dG2").append("<option value='" + tweet.Item1 + "'>" + splitgm[1] + "</option>");
            });
        }
    }
}
function onSuccessG1WithTeam(data, status) {

    if (data.d != '') {

        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";
        document.getElementById('dG7').innerHTML = "";

        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            document.getElementById('dG3').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label7').text();;


            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitgm = nameslpit.split("_");
                $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitgm[1] + "</option>");
            });
        } else if (CurrentUserRole == 'rl2') {
            document.getElementById('dG3').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label7').text();;


            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitgm = nameslpit.split("_");
                $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitgm[1] + "</option>");
            });
        } else {
            value = '-1';
            name = 'Select ' + $('#Label6').text();;


            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitgm = nameslpit.split("_");
                $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitgm[1] + "</option>");
            });
        }
    }
}
function onSuccessG2(data, status) {

    if (data.d != '') {
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";

        if (CurrentUserRole == 'rl1') {
            FillTeamsbyBUH();
        } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            document.getElementById('dG7').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label13').text();

            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitbuh = nameslpit.split("_");
                $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitbuh[1] + "</option>");
            });
        } else if (CurrentUserRole == 'rl4') {
            document.getElementById('dG3').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label7').text();

            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitbuh = nameslpit.split("_");
                $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitbuh[1] + "</option>");
            });
        } else {
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG7').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label7').text();

            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitbuh = nameslpit.split("_");
                $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitbuh[1] + "</option>");
            });
            if (CurrentUserRole == 'ftm') {
                SetNationalHierarchyForFTM();
            }
        }
    }
}
function onSuccessG2WithTeam(data, status) {

    if (data.d != '') {
        document.getElementById('dG6').innerHTML = "";

        if (CurrentUserRole == 'rl1') {
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label8').text();

            $("#dG4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitbuh = nameslpit.split("_");
                $("#dG4").append("<option value='" + tweet.Item1 + "'>" + splitbuh[1] + "</option>");
            });
        } else if (CurrentUserRole == 'rl2') {
            document.getElementById('dG7').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label13').text();

            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitbuh = nameslpit.split("_");
                $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitbuh[1] + "</option>");
            });
        } else {
            value = '-1';
            name = 'Select ' + $('#Label7').text();

            $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitbuh = nameslpit.split("_");
                $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitbuh[1] + "</option>");
            });
        }
    }
}
function onSuccessG3(data, status) {

    if (data.d != '') {
        document.getElementById('dG4').innerHTML = "";
        document.getElementById('dG5').innerHTML = "";
        document.getElementById('dG6').innerHTML = "";


        if (CurrentUserRole != 'rl2') {
            FillTeamsbyBUH();
        } else if (CurrentUserRole == 'rl2') {
            value = '-1';
            name = 'Select ' + $('#Label8').text();

            $("#dG4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitnsm = nameslpit.split("_");
                $("#dG4").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
            });
        }
    }
}
function onSuccessG3WithTeam(data, status) {

    if (data.d != '') {
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            document.getElementById('dG3').innerHTML = "";
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";

            if ($("#ddl2").val() != null && $("#dG2").val() == null) {
                value = '-1';
                name = 'Select ' + $('#Label6').text();

                $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

                $.each(data.d, function (i, tweet) {
                    var nameslpit = tweet.Item2;
                    var splitnsm = nameslpit.split("_");
                    $("#dG2").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
                });

            } else if ($("#ddl2").val() != null) {
                value = '-1';
                name = 'Select ' + $('#Label7').text();

                $("#dG3").append("<option value='" + value + "'>" + name + "</option>");

                $.each(data.d, function (i, tweet) {
                    var nameslpit = tweet.Item2;
                    var splitnsm = nameslpit.split("_");
                    $("#dG3").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
                });
            }
        } else if (CurrentUserRole == 'rl1') {
            document.getElementById('dG7').innerHTML = "";
           
            value = '-1';
            name = 'Select ' + $('#Label13').text();

            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitnsm = nameslpit.split("_");
                $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
            });
        }
        else if (CurrentUserRole == 'rl2') {

            document.getElementById('dG7').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label13').text();

            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitnsm = nameslpit.split("_");
                $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
            });
        }
        else {
            value = '-1';
            name = 'Select ' + $('#Label8').text();

            $("#dG4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitnsm = nameslpit.split("_");
                $("#dG4").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
            });
            if (CurrentUserRole == 'ftm') {
                SetRegionHierarchyForFTM();
            }
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
            var nameslpit = tweet.Item2;
            var splitrsm = nameslpit.split("_");
            $("#dG5").append("<option value='" + tweet.Item1 + "'>" + splitrsm[1] + "</option>");
        });
    }

}
function onSuccessG4WithTeam(data, status) {


    if (CurrentUserRole == 'rl4') {
        if (data.d != '') {
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";


            value = '-1';
            name = 'Select ' + $('#Label6').text();

            $("#dG2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitrsm = nameslpit.split("_");
                $("#dG2").append("<option value='" + tweet.Item1 + "'>" + splitrsm[1] + "</option>");
            });
        }
    } else if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2') {
        if (data.d != '') {
            document.getElementById('dG4').innerHTML = "";
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";


            value = '-1';
            name = 'Select ' + $('#Label8').text();

            $("#dG4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitrsm = nameslpit.split("_");
                $("#dG4").append("<option value='" + tweet.Item1 + "'>" + splitrsm[1] + "</option>");
            });
        }
    }
    else {
        if (data.d != '') {
            document.getElementById('dG5').innerHTML = "";
            document.getElementById('dG6').innerHTML = "";


            value = '-1';
            name = 'Select ' + $('#Label11').text();

            $("#dG5").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitrsm = nameslpit.split("_");
                $("#dG5").append("<option value='" + tweet.Item1 + "'>" + splitrsm[1] + "</option>");
            });
        }
    }


}
function onSuccessG5(data, status) {

    if (data.d != '') {
        document.getElementById('dG6').innerHTML = "";

        value = '-1';
        name = 'Select ' + $('#Label12').text();

        $("#dG6").append("<option value='" + value + "'>" + name + "</option>");

        $.each(data.d, function (i, tweet) {
            var nameslpit = tweet.Item2;
            var splitzsm = nameslpit.split("_");
            $("#dG6").append("<option value='" + tweet.Item1 + "'>" + splitzsm[1] + "</option>");
        });
    }

}
function onSuccessG6(data, status) { }

function UH3() {

    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddl2').val();
        teamId = $('#dG1').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
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
    } else if (CurrentUserRole == 'rl4') {
        levelValue = $('#ddl2').val();
        teamId = $('#dG1').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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
    } else {
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
}
function UH4() {

    if (CurrentUserRole == 'rl1') {

        levelValue = $('#ddl2').val();
        teamId = $('#dG3').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel3",
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
    } else if (CurrentUserRole == 'rl2') {

        levelValue = $('#ddl3').val();
        teamId = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
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
    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        levelValue = $('#ddl3').val();
        teamId = $('#dG1').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

        if (levelValue != -1) {
            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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
    } else {
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
}
function UH5() {

    if (CurrentUserRole == 'rl1') {

        levelValue = $('#ddlTeam').val();
        teamId = $('#dG3').val();
        myData = "{'employeeId':'" + levelValue + "','teamId':'" + teamId + "' }";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel4",
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
    } else if (CurrentUserRole == 'rl2') {
        levelValue = $('#ddlTeam').val();
        teamId = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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
    else {
        levelValue = $('#dG3').val();
        teamId = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/NewReports.asmx/GetEmployee",
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


}
function UH6() {
    if (CurrentUserRole == 'rl1') {

        levelValue = $('#ddl4').val();
        var teamid = $('#dG3').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel5",
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

    } else if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
        levelValue = $('#ddl4').val();
        var teamid = $('#dG7').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
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
    } else {
        levelValue = $('#ddl4').val();
        var teamid = $('#dG2').val();
        myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";

        if (levelValue != -1) {

            $.ajax({
                type: "POST",
                url: "../Reports/newReports.asmx/GetEmployeewithteamForHierarchyLevel4",
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


}
function UH7() {

    levelValue = $('#ddl5').val();
    teamId = $('#dG7').val();
    myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamId + "'}";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/GetEmployee",
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

    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";


    if (CurrentUserRole == 'rl1') {
        if (data.d != "") {

            jsonObj = JSON.parse(data.d);
            document.getElementById('ddl2').innerHTML = "";
            value = '-1';
            name = 'Select ' + $('#Label2').text();

            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }

    } else if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        if (data.d != "") {

            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label3').text();

            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }
    } else if (CurrentUserRole == 'rl4') {
        if (data.d != "") {
            document.getElementById('ddlTeam').innerHTML = "";
            jsonObj = JSON.parse(data.d);

            value = '-1';
            name = 'Select ' + $('#Label2').text();

            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }
    } else {
        document.getElementById('ddl2').innerHTML = "";
        if ($("#ddlTeam").val() == "-1") {

        } else {


            if (data.d != "") {

                jsonObj = JSON.parse(data.d);

                value = '-1';
                name = 'Select ' + $('#Label2').text();

                $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

                $.each(jsonObj, function (i, tweet) {
                    $("#ddl2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                });
            }
        }
    }


}
function onSuccessUH4(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (CurrentUserRole == 'rl1') {
        FillTeamsbyBUH();
    } else if (CurrentUserRole == 'rl2' || CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        if (data.d != "") {
            document.getElementById('ddlTeam').innerHTML = "";
            jsonObj = JSON.parse(data.d);
            value = '-1';
            name = 'Select ' + $('#Label14').text();
            $("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddlTeam").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }
    } else {
        if (data.d != "") {
            document.getElementById('ddl3').innerHTML = "";
            jsonObj = JSON.parse(data.d);
            value = '-1';
            name = 'Select ' + $('#Label3').text();
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });
        }
    }


}
function onSuccessUH5(data, status) {

    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";
    if (data.d != "") {
        if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2') {


            jsonObj = JSON.parse(data.d);
            value = '-1';
            name = 'Select ' + $('#Label4').text();
            $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            });



        }
        else {

        }
    }


}
function onSuccessUH6(data, status) {

    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = JSON.parse(data.d);
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

        jsonObj = JSON.parse(data.d);
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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

        $('#h2').val($('#dG1').val());

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

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl3') {

        $('#h5').val($('#dG2').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'headoffice') {

        $('#h5').val($('#dG2').val());

        level1 = 0
        level2 = 0
        level3 = 0
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl4') {

        $('#h12').val($('#dG2').val());

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
    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

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
    if (CurrentUserRole == 'rl1') {

        $('#h4').val($('#dG2').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = 0;
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl2') {

        $('#h5').val($('#dG3').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'rl3') {

        $('#h12').val($('#dG3').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'headoffice') {

        $('#h12').val($('#dG3').val());

        level1 = 0
        level2 = 0
        level3 = 0
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl4') {

        $('#h13').val($('#dG7').val());

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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

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
    if (CurrentUserRole == 'rl1') {

        $('#h5').val($('#dG7').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = 0;
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl2') {

        $('#h12').val($('#dG7').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = 0;

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";

    }
    if (CurrentUserRole == 'rl3') {

        $('#h13').val($('#dG7').val());

        level1 = $('#h2').val();
        level2 = $('#h3').val();
        level3 = $('#h4').val();
        level4 = $('#h5').val();
        level5 = $('#h12').val();
        level6 = $('#h13').val();

        myData = "{'l1':'" + level1 + "','l2':'" + level2 + "','l3':'" + level3 + "','l4':'" + level4 + "','l5':'" + level5 + "','l6':'" + level6 + "'}";
    }
    if (CurrentUserRole == 'headoffice') {


        $('#h13').val($('#dG7').val());

        level1 = 0
        level2 = 0
        level3 = 0
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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

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
    if (CurrentUserRole == 'rl1') {

        $('#h12').val($('#dG4').val());

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
    if (CurrentUserRole == 'headoffice') {

        $('#h13').val($('#dG4').val());

        level1 = 0
        level2 = 0
        level3 = 0
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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

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

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {

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
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#ddl2').val(data.d[0].Item1).select2()
        } else if (CurrentUserRole == 'rl4') {
            $('#ddl2').val(data.d[0].Item1).select2()
        } else {
            $('#ddl1').val(data.d[0].Item1).select2()
        }

    }
    else {
        $('#ddl1').val(-1)
    }
    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm' || CurrentUserRole == 'marketingteam' ||
           CurrentUserRole == 'rl1' || CurrentUserRole == 'rl3' ||
           CurrentUserRole == 'rl4' || CurrentUserRole == 'rl5' || CurrentUserRole == 'headoffice') {
        UH3();
    }

}
function onSuccessG3b(data, status) {

    if (data != '') {
        if (CurrentUserRole == 'rl4') {
            $('#ddlTeam').val(data.d[0].Item1).select2()
        } else if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'rl1') {
            $('#ddl2').val(data.d[0].Item1).select2()
        } else {
            $('#ddl3').val(data.d[0].Item1).select2()
        }
        if (CurrentUserRole == 'rl4') {
            $('#h6').val(data.d[0].Item1)
        }
    }
    else {
        $('#ddl2').val(-1)
    }
    if (CurrentUserRole == 'rl1' || CurrentUserRole == 'rl2' || CurrentUserRole == 'rl3' ||
           CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm' || CurrentUserRole == 'marketingteam' || CurrentUserRole == 'headoffice') {
        UH4();
    }

}
function onSuccessG3c(data, status) {

    if (data != '') {
        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
            $('#ddl3').val(data.d[0].Item1).select2()
        } else {
            $('#ddlTeam').val(data.d[0].Item1).select2()
        }
        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#h6').val(data.d[0].Item1)
        }
    }
    else {
    
    }

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm' || CurrentUserRole == 'rl1' ||
        CurrentUserRole == 'rl2' || CurrentUserRole == 'marketingteam') {
        UH5();
    }

}
function onSuccessG3d(data, status) {

    if (data != '') {

        $('#ddl4').val(data.d[0].Item1).select2()

        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#h6').val(data.d[0].Item1)
        }

    }
    else {
        $('#ddl4').val(-1)
    }

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm' || CurrentUserRole == 'rl1' ||
           CurrentUserRole == 'rl2' || CurrentUserRole == 'marketingteam') {
        UH6();
    }

}
function onSuccessG3e(data, status) {

    if (data != '') {
        $('#ddl5').val(data.d[0].Item1).select2()

        if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
            $('#h6').val(data.d[0].Item1)
        }
    }
    else {
        $('#ddl5').val(-1)
    }

    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm' || CurrentUserRole == 'rl1' ||
        CurrentUserRole == 'rl2' || CurrentUserRole == 'marketingteam') {
        UH7();
    }
}
function onSuccessG3f(data, status) {

    if (data != '') {
        $('#ddl6').val(data.d[0].Item1).select2()
        $('#h6').val(data.d[0].Item1);
    }
    else {
        $('#ddl6').val(-1)
    }
    UH8();
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

        jsonObj = JSON.parse(data.d);

        if (glbVarLevelName == "Level1") {
            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";
            document.getElementById('ddlTeam').innerHTML = "";
            value = '-1';
            
            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
                name = 'Select ' + HierarchyLevel1;
                $('#Label1').append(HierarchyLevel1 + " " + "");
                $('#Label2').append(HierarchyLevel2 + " " + "");
                $('#Label3').append(HierarchyLevel3 + " " + "");
                $('#Label4').append(HierarchyLevel4 + " " + "");
                $('#Label9').append(HierarchyLevel5 + " " + "");
                $('#Label10').append(HierarchyLevel6 + " " + "-TMs");
                $('#Label14').append("Team");

                $('#Label5').append(HierarchyLevel1 + " " + "Level ");
                $('#Label6').append(HierarchyLevel2 + " " + "Level ");
                $('#Label7').append(HierarchyLevel3 + " " + "Level ");
                $('#Label8').append(HierarchyLevel4 + " " + "Level ");
                $('#Label11').append(HierarchyLevel5 + " " + "Level ");
                $('#Label12').append(HierarchyLevel6 + " " + "Level ");
                $('#Label13').append("Team");
            }
            if (CurrentUserRole == 'rl1') {
                name = 'Select ' + HierarchyLevel2;
                $('#Label1').append(HierarchyLevel2 + " " + "");
                $('#Label2').append(HierarchyLevel3 + " " + "");
                $('#Label3').append("Team");
                $('#Label14').append(HierarchyLevel4 + " " + "");
                $('#Label4').append(HierarchyLevel5 + " " + "");
                $('#Label9').append(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').append(HierarchyLevel2 + " " + "Level ");
                $('#Label6').append(HierarchyLevel3 + " " + "Level ");
                $('#Label7').append("Team");
                $('#Label13').append(HierarchyLevel4 + " " + "Level ");
                $('#Label8').append(HierarchyLevel5 + " " + "Level ");
                $('#Label11').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl2') {
                name = 'Select ' + HierarchyLevel3;
                $('#Label1').append(HierarchyLevel3 + " " + "");
                $('#Label2').append("Team");
                $('#Label3').append(HierarchyLevel4 + " " + "");
                $('#Label14').append(HierarchyLevel5 + " " + "");
                $('#Label4').append(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').append(HierarchyLevel3 + " " + "Level ");
                $('#Label6').append("Team");
                $('#Label7').append(HierarchyLevel4 + " " + "Level ");
                $('#Label13').append(HierarchyLevel5 + " " + "Level ");
                $('#Label8').append(HierarchyLevel6 + " " + "Level ");


            }
            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
                name = 'Select ' + HierarchyLevel4;

                $('#Label1').append("Team");
                $('#Label2').append(HierarchyLevel4 + " " + "");
                $('#Label3').append(HierarchyLevel5 + " " + "-TMs ");
                $('#Label14').append(HierarchyLevel6 + " " + "-TMs ");


                $('#Label5').append("Team");
                $('#Label6').append(HierarchyLevel4 + " " + "Level ");
                $('#Label7').append(HierarchyLevel5 + " " + "Level ");
                $('#Label13').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl4') {
                name = 'Select ' + HierarchyLevel5;
                $('#Label1').append("Team");
                $('#Label2').append(HierarchyLevel5 + " " + "-TMs ");
                $('#Label14').append(HierarchyLevel6 + " " + "-TMs ");

                $('#Label5').append("Team");
                $('#Label6').append(HierarchyLevel5 + " " + "Level ");
                $('#Label13').append(HierarchyLevel6 + " " + "Level ");

            }
            if (CurrentUserRole == 'rl5') {
                name = 'Select ' + HierarchyLevel6;
                $('#Label1').append(HierarchyLevel6 + " " + "-TMs ");
                $('#Label5').append(HierarchyLevel6 + " " + "Level ");
                $('#col77').hide();
                $('.Th12').hide();
            }

            if (CurrentUserRole == 'rl3' || CurrentUserRole == 'rl4' || CurrentUserRole == 'headoffice') {

            } else {

                name = 'Select ' + $('#Label1').text();
                $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

                $.each(jsonObj, function (i, tweet) {
                    $("#ddl1").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
                });
            }

        }
        else if (glbVarLevelName == "Level3") {

            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";

            value = '-1';

            if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
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

    $('#btnShowResult').hide();
    $('#uploadify_button2').hide();
    $('#exportExcel2').hide();
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
function SetGMHierarchyForFTM() {

    $.ajax({
        type: "POST",
        url: "../Form/QuizTestService.asmx/SetHierarchyForFTM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessSetGMHierarchyForFTM,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });

}
function SelectAll() {
    debugger
    $('#datatables tbody tr').each(function (i, key) {
        $(key).find('#chkSelectSamples_' + i).attr('checked', $('#chkSelectAllSamples').attr('checked'));
    });
}
function onSuccessSetGMHierarchyForFTM(data, status) {

    if (data.d != '') {
        // set GMids ids only

        var jsonObj = JSON.parse(data.d);
        $.each(jsonObj[1], function (i, tweet) {
            GMids.push(tweet.EmployeeId)
        });

        // get unique GMids id from array
        GMids = GMids.filter(function (itm, i, GMids) {
            return i == GMids.indexOf(itm);
        });

        // show and hide GMids dropdown options
        $("#ddl1").children('option').hide();
        $("#ddl1").children("option[value='-1']").show()
        $.each(GMids, function (i, tweet) {
            $("#ddl1").children("option[value='" + tweet + "']").show()
        });


        // set GMids team ids only
        $.each(jsonObj[1], function (i, tweet) {
            GMteams.push(tweet.Level1LevelId)
        });

        // get unique GMteams id from array
        GMteams = GMteams.filter(function (itm, i, GMteams) {
            return i == GMteams.indexOf(itm);
        });


        // show and hide national team dropdown options
        $("#dG1").children('option').hide();
        $("#dG1").children("option[value='-1']").show()
        $.each(GMteams, function (i, tweet) {
            $("#dG1").children("option[value='" + tweet + "']").show()
        });

        // set BUHids ids only
        $.each(jsonObj[2], function (i, tweet) {
            BUHids.push(tweet.EmployeeId)
        });

        // get unique BUHids id from array
        BUHids = BUHids.filter(function (itm, i, BUHids) {
            return i == BUHids.indexOf(itm);
        });

        // show and hide national dropdown options
        $("#ddl2").children('option').hide();
        $("#ddl2").children("option[value='-1']").show()
        $.each(BUHids, function (i, tweet) {
            $("#ddl2").children("option[value='" + tweet + "']").show()
        });


        // set BUHteams team ids only
        $.each(jsonObj[2], function (i, tweet) {
            BUHteams.push(tweet.Level2LevelId)
        });

        // get unique BUHteams id from array
        BUHteams = BUHteams.filter(function (itm, i, BUHteams) {
            return i == BUHteams.indexOf(itm);
        });


        // show and hide BUHteams team dropdown options
        $("#dG2").children('option').hide();
        $("#dG2").children("option[value='-1']").show()
        $.each(BUHteams, function (i, tweet) {
            $("#dG2").children("option[value='" + tweet + "']").show()
        });


        // set national ids only
        $.each(jsonObj[3], function (i, tweet) {
            nationalids.push(tweet.EmployeeId)
        });

        // get unique national id from array
        nationalids = nationalids.filter(function (itm, i, nationalids) {
            return i == nationalids.indexOf(itm);
        });

        // show and hide national dropdown options
        $("#ddl3").children('option').hide();
        $("#ddl3").children("option[value='-1']").show()
        $.each(nationalids, function (i, tweet) {
            $("#ddl3").children("option[value='" + tweet + "']").show()
        });


        // set national team ids only
        $.each(jsonObj[3], function (i, tweet) {
            nationalteams.push(tweet.Level3LevelId)
        });

        // get unique national id from array
        nationalteams = nationalteams.filter(function (itm, i, nationalteams) {
            return i == nationalteams.indexOf(itm);
        });


        // show and hide national team dropdown options
        $("#dG3").children('option').hide();
        $("#dG3").children("option[value='-1']").show()
        $.each(nationalteams, function (i, tweet) {
            $("#dG3").children("option[value='" + tweet + "']").show()
        });


        // set region ids only        
        $.each(jsonObj[4], function (i, tweet) {
            regionids.push(tweet.EmployeeId)
        });

        // get unique region id from array
        regionids = regionids.filter(function (itm, i, regionids) {
            return i == regionids.indexOf(itm);
        });

        // set region team ids only
        $.each(jsonObj[4], function (i, tweet) {
            regionteams.push(tweet.Level4LevelId)
        });

        // get unique region id from array
        regionteams = regionteams.filter(function (itm, i, regionteams) {
            return i == regionteams.indexOf(itm);
        });

    }

}
function SetBUHHierarchyForFTM() {
    // show and hide region dropdown options
    $("#ddl2").children('option').hide();
    $("#ddl2").children("option[value='-1']").show()
    $.each(BUHids, function (i, tweet) {
        $("#ddl2").children("option[value='" + tweet + "']").show()
    });

    // show and hide region team dropdown options
    $("#dG2").children('option').hide();
    $("#dG2").children("option[value='-1']").show()
    $.each(BUHteams, function (i, tweet) {
        $("#dG2").children("option[value='" + tweet + "']").show()
    });

}
function SetNationalHierarchyForFTM() {
    // show and hide region dropdown options
    $("#ddl3").children('option').hide();
    $("#ddl3").children("option[value='-1']").show()
    $.each(nationalids, function (i, tweet) {
        $("#ddl3").children("option[value='" + tweet + "']").show()
    });

    // show and hide region team dropdown options
    $("#dG3").children('option').hide();
    $("#dG3").children("option[value='-1']").show()
    $.each(nationalteams, function (i, tweet) {
        $("#dG3").children("option[value='" + tweet + "']").show()
    });

}
function SetRegionHierarchyForFTM() {

    // show and hide region dropdown options
    $("#ddl4").children('option').hide();
    $("#ddl4").children("option[value='-1']").show()
    $.each(regionids, function (i, tweet) {
        $("#ddl4").children("option[value='" + tweet + "']").show()
    });

    // show and hide region team dropdown options
    $("#dG4").children('option').hide();
    $("#dG4").children("option[value='-1']").show()
    $.each(regionteams, function (i, tweet) {
        $("#dG4").children("option[value='" + tweet + "']").show()
    });

}
function onCalendarShown() {

    var cal = $find("calendar1");
    cal._switchMode("months", true);

    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.addHandler(row.cells[j].firstChild, "click", call);
            }
        }
    }
}
function onCalendarHidden() {
    var cal = $find("calendar1");

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
function oGrid_EditAll() {
    debugger
    $('#content').parent().find('.divLodingGrid').show().fadeIn();
    var AllProductIdsArray = "";
    $.grep($('#datatables tbody tr input[type="checkbox"]:checked'), function (check) {
        console.log($(check).attr('productid'))
        return AllProductIdsArray += $(check).attr('productid') + ',';
    });
    AllProductIdsArray = AllProductIdsArray.substring(0, AllProductIdsArray.length - 1);
    var AllProductIds = AllProductIdsArray;

    var AllProductIdsArray = AllProductIdsArray.split(',');
    var qty = document.getElementById('AllProQty').value;
    var countSuccessProducts = 0;

    var date1 = $('#date1').val();
    var date2 = $('#date2').val();
    var date1 = $('#date1').val();
    var date2 = $('#date2').val();
    var level1 = $('#dG1').val();
    var level2 = $('#dG2').val();
    var level3 = $('#dG3').val();
    var level4 = $('#dG4').val();
    var level5 = $('#dG5').val();
    var level6 = $('#dG6').val();

    if (level1 == '-1' || level1 == null) {
        level1 = 0;
    }
    if (level2 == '-1' || level2 == null) {
        level2 = 0;
    }
    if (level3 == '-1' || level3 == null) {
        level3 = 0;
    }
    if (level4 == '-1' || level4 == null) {
        level4 = 0;
    }
    if (level5 == '-1' || level5 == null) {
        level5 = 0;
    }
    if (level6 == '-1' || level6 == null) {
        level6 = 0;
    }
    if ((AllProductIds.split(',').length <= 1 && AllProductIds.split(',')[0] == "") || qty == "") {
        if (qty == "")
            alert('Please enter quantity');
        else
            alert('Please select product');
        $('#content').parent().find('.divLodingGrid').show().fadeOut();

        return;
    }
    //Please select positive numbers Only
    //You can only assign samples in numeric value
    if (!/^[0-9]+$/.test(qty)) {
        $('#dialog').jqmHide();

        //alert("Please only enter numeric Number only! (Allowed input:0-9)");
        alert("Please provide valid quantity");
        $('#content').parent().find('.divLodingGrid').show().fadeOut();
        return false;
    }
    
    myData = "{'skuid':'" + AllProductIds + "','qty1':'" + qty + "','txtDate1':'" + date1 + "','txtDate2':'" + date2 + "','level3':'" + level1 + "','level4':'" + level2 + "','level5':'" + level3 + "','level6':'" + level4 + "'}";
    $.ajax({
        type: "POST",
        url: "marketingplansamplenew.asmx/ProductQtyAllInsert",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success:
            function (data, status) {
                if (data.d == "OK") {
                    GetDataInGrid();
                    alert("All samples have been assigned successfully");
                }
            },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: true,
        cache: false
    });
    $('#content').parent().find('.loding_box_outer').show().fadeOut();
}
function oGrid_Edit(sender) {
    debugger;
    id = sender;
    var qty = document.getElementById('ProQty' + id).value;

    var date1 = $('#date1').val();
    var date2 = $('#date2').val();
    var level1 = $('#dG1').val();
    var level2 = $('#dG2').val();
    var level3 = $('#dG3').val();
    var level4 = $('#dG4').val();
    var level5 = $('#dG5').val();
    var level6 = $('#dG6').val();

    if (level1 == '-1' || level1 == null) {
        level1 = 0;
    }
    if (level2 == '-1' || level2 == null) {
        level2 = 0;
    }
    if (level3 == '-1' || level3 == null) {
        level3 = 0;
    }
    if (level4 == '-1' || level4 == null) {
        level4 = 0;
    }
    if (level5 == '-1' || level5 == null) {
        level5 = 0;
    }
    if (level6 == '-1' || level6 == null) {
        level6 = 0;
    }

    myData = "{'skuid':'" + id + "','qty1':'" + qty + "','txtDate1':'" + date1 + "','txtDate2':'" + date2 + "','level1':'" + level1 + "','level2':'" + level2 + "','level3':'" + level3 + "','level4':'" + level4 + "','level5':'" + level5 + "','level6':'" + level6 + "'}";

    $.ajax({
        type: "POST",
        url: "marketingplansamplenew.asmx/ProductQtyInsert",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessProductQtyInsert,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
    $('#content').parent().find('.loding_box_outer').show().fadeOut();
}
function onSuccessProductQtyInsert(data, status) {
    if (data.d == "OK") {
        GetDataInGrid();
        $('#dialog').jqmHide();
        alert("Samples have been assigned successfully");
    }
}

function downloadRefSheet() {
    debugger
    var date1 = '01-' + $('#txtDate').val();
    var level1 = $('#dG1').val();
    var level2 = $('#dG2').val();
    var level3 = $('#dG3').val();
    var level4 = $('#dG4').val();
    var level5 = $('#dG5').val();
    var level6 = $('#dG6').val();

    if (date1 == "01-Enter Year - Month" || date1 == null) {
        alert('Please Select Year');
        return false;
    }

    var requestObject = {};
    requestObject['EmployeeId'] = EmployeeId;
    requestObject['date'] = date1;
    requestObject['Type'] = 'D';
    requestObject['level1'] = (level1 == '-1' || level1 == null) ? 0 : level1;
    requestObject['level2'] = (level2 == '-1' || level2 == null) ? 0 : level2;
    requestObject['level3'] = (level3 == '-1' || level3 == null) ? 0 : level3;
    requestObject['level4'] = (level4 == '-1' || level4 == null) ? 0 : level4;
    requestObject['level5'] = (level5 == '-1' || level5 == null) ? 0 : level5;
    requestObject['level6'] = (level6 == '-1' || level6 == null) ? 0 : level6;
    requestObject['productSkuIDs'] = (
            $('#ddlProductsSKu').val() == '-1' ||
            $('#ddlProductsSKu').val() == null ||
            $('#ddlProductsSKu').val() == ""
        ) ? 0 : $('#ddlProductsSKu').val().join(",");

    var mapForm = document.createElement("form");
    mapForm.target = "Map";
    mapForm.method = "POST";
    mapForm.action = "../Handler/SamplesSheetUploader.ashx";

    var mapInput = document.createElement("input");
    mapInput.type = "hidden";
    mapInput.name = "requestObject";
    mapInput.value = JSON.stringify(requestObject);
    mapForm.appendChild(mapInput);

    document.body.appendChild(mapForm);

    map = window.open("", "Map", "status=0,title=Downloading File...,height=300,width=400,scrollbars=1");

    if (map) {
        mapForm.submit();
    } else {
        alert('You Must Allow Popups For Sheet To Download.');
    }
}

function uploadFile() {
    debugger
    var date = new Date();

    //// Get form
    var form = $('#fileForm')[0];

    // Create an FormData object 
    var data = new FormData(form);

    var formData = new FormData(); //var formData = new FormData($('form')[0]);

    ///get the file and append it to the FormData object
    formData.append('file', $('#sheetUploader')[0].files[0]);

    $.ajax({
        type: "POST",
        url: '../Handler/SamplesSheetUploader.ashx?date=' + ('-' + (date.getMonth() + 1) + '-' + (date.getFullYear())) + '&Type=U',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data, status) {
            $.ajax({
                url: "../Handler/SamplesSheetUploader.ashx?&Type=" + 'Read' + '&FileName=' + data,
                contentType: "text/plain; charset=utf-8",
                success: function (data, response) {

                    $('#dialog').jqmHide();

                    if (data == "ERROR") {
                        alert("Sheet Upload Has Some Corrupted Data, Please Do Not Modify Any Columns Generated By Server, Except The Quantity Which Should Have Whole Numbers Only.");
                    }
                    else if (data == "NOEMP") {
                        alert("Sorry, But We Can't process the request no employees found!s");
                    }
                    else {
                        alert('File Uploaded Successfully');
                    }
                },
                beforeSend: function (data, status) {
                    $('#jqmloader').html("<p style=\"color: white;padding-left: 20px;\">Please Wait, Uploading Sheet</p>");
                    $('#dialog').jqm({ modal: true });
                    $('#dialog').jqm();
                    $('#dialog').jqmShow();
                    startingAjax();
                },
                error: onError
            });
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

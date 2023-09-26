var table;
var GMids = [];
var BUHids = [];
var nationalids = [];
var regionids = [];
var EmployeeIdForTeam = "";
var GMteams = [];
var BUHteams = [];
var nationalteams = [];
var regionteams = [];
var ids = [];

$(document).ready(function () {
    $('#exportExcel2').click(exportDoctorExcel2);

    jQuery.browser = {};
    (function () {
        jQuery.browser.msie = false;
        jQuery.browser.version = 0;
        if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
            jQuery.browser.msie = true;
            jQuery.browser.version = RegExp.$1;
        }
    })();
    IsValidUser();
    //FillDropDownListtop();

    FillRegion();
    // FillDropDownList();

    //$('#ddl111').change(OnChangeddl11);
    //$('#ddl222').change(OnChangeddl22);
    //$('#ddl333').change(OnChangeddl33);
    //$('#ddl444').change(OnChangeddl44);
    //$('#ddl555').change(OnChangeddl55);

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

    HideHierarchy();
    GetCurrentUser();

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

    $('#ddl1Region').select2({
        dropdownParent: $('#col1Region')
    });
    $('#ddl2SubRegion').select2({
        dropdownParent: $('#col2SubRegion')
    });
    $('#ddl3District').select2({
        dropdownParent: $('#col3District')
    });
    $('#ddl4City').select2({
        dropdownParent: $('#col4City')
    });
    $('#ddlDistributors').select2({
        dropdownParent: $('#col5dist')
    });
    $('#ddlimit').select2({
        dropdownParent: $('#g77')
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
    $("#ddl1Region").change(function () {
        $("#ddl2SubRegion").val('-1').trigger("change");
        $("#ddl3District").val('-1').trigger("change");
        $("#ddl4City").val('-1').trigger("change");
        $("#ddlDistributors").val('-1').trigger("change");
        FillSubRegion($("#ddl1Region").val());
    });
    $("#ddl2SubRegion").change(function () {
        FillDistrict($("#ddl2SubRegion").val());
    });
    $("#ddl3District").change(function () {
        FillCity($("#ddl3District").val());
    });
    $("#ddl4City").change(function () {
        FillDistributor($("#ddl4City").val());
        listGetSalesBricks();

    });
    $("#ddlDistributors").change(function () {
        listGetEmpSalesBricks();
        listGetSalesBricks();
        // GetTerritoryBrickDetail();
    });

    $('#btnRight').click(function (e) {
        var selectedOpts = $('#listbox1 option:selected');
        //productarray.push($('#listbox1 option:selected').val());
        if (selectedOpts.length == 0) {

            e.preventDefault();
        }
        e.preventDefault();
    });

    $('#btnLeft').click(function (e) {

        var selectedOpts = $('#listbox2 option:selected');
        if (selectedOpts.length == 0) {
            e.preventDefault();
        }
        e.preventDefault();
    });

    $('#btnApproveAllForAddTolist').click(ApproveAllForAddToBrickAllocation);
    $('#btnRejectAllForAddTolist').click(ApproveAllForReject);
        $("input:file").change(function () {


        uploadFile();
            // GetDataInGrid();

         });
});

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

function SelectAllApproveCheckBoxes() {

    if ($('input[name="ApproveAllForRemoval"]').is(':checked')) {
        $('.approveCheckBoxForRemoval').prop('checked', true);
        $('.approveCheckBoxForReject').prop('checked', false);
        $('input[name="ApproveAllForReject"]').prop('checked', false);
    } else {
        $('.approveCheckBoxForRemoval').prop('checked', false);
    }
}

function SelectAllApproveCheckBoxesForRemoval() {

    if ($('input[name="ApproveAllForReject"]').is(':checked')) {
        $('.approveCheckBoxForReject').prop('checked', true);
        $('.approveCheckBoxForRemoval').prop('checked', false);
        $('input[name="ApproveAllForRemoval"]').prop('checked', false);
    } else {
        $('.approveCheckBoxForReject').prop('checked', false);
    }

}

function ApproveAllForAddToBrickAllocation() {
    var checkedboxes = [], ids = [];
    checkedboxes = document.querySelectorAll('.approveCheckBoxForRemoval:checked');

    if (checkedboxes.length > 0) {
        for (var i = 0; i < checkedboxes.length; i++) {

            ids.push(checkedboxes[i].value);

            //  $old('#divApproveAllConfirmation').jqmShow();
        }
    }
    else {
        // alert("You must select atleast one option!");
        swal(
            'alert!',
            'You must select atleast one option!',
            'warning'
        )
        return false;
    }

    swal({
        title: "Approve All",
        text: "Are you sure you want to approve all the selected requests?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, All Approve it!",
        cancelButtonText: "No, Cancel !",
        closeOnConfirm: false,
        closeOnCancel: false
    },
function (isConfirm) {
    if (isConfirm) {
        var text = prompt("Fill Comments", "");
        var mydata = "{'PK_id':'" + ids.toString() + "','userrole':'" + CurrentUserRole + "',empid:'" + EmployeeId + "','Comment':'" + text + "'}";

        $('#hdnMode').val("R");
        $.ajax({
            type: "POST",
            url: "../BWSD/SalesTerritorybrick_New.asmx/BrickAllocation_Approvel",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                sweetAlert('success', 'All Requests has been approved!', 'success');
                GetBrickAllocation_NonApproval();
            },
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: false,
            cache: false
        });

        //  swal("Deleted!", "Your imaginary file has been deleted.", "success");
    } else {
        swal("Cancelled", "Request has been cancelled:)", "error");
    }
});
}

function ApproveAllForReject() {
    var checkedboxes = [], rejIDs = [];
    checkedboxes = document.querySelectorAll('.approveCheckBoxForReject:checked');
    if (checkedboxes.length > 0) {
        for (var i = 0; i < checkedboxes.length; i++) {
            rejIDs.push(checkedboxes[i].value);

        }
    }
    else {

        swal(
            'Alert!',
            'You must select atleast one option!',
            'warning'
        )
        return false;
    }

    swal({
        title: "Reject All",
        text: "Are you sure you want to Reject all the selected requests?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, reject all",
        cancelButtonText: "No, cancel",
        closeOnConfirm: false,
        closeOnCancel: false
    },
function (isConfirm) {
    if (isConfirm) {

        var text = prompt("Fill Comments", "");
        var mydata = "{'PK_id':'" + rejIDs.toString() + "','userrole':'" + CurrentUserRole + "',empid:'" + EmployeeId + "','Comment':'" + text + "'}";

        $('#hdnMode').val("R");
        $.ajax({
            type: "POST",
            url: "../BWSD/SalesTerritorybrick_New.asmx/BrickAllocation_Reject",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var empid = $("#ddl3pForRemoval").val();
                GetBrickAllocation_NonApproval();

                sweetAlert('success', 'All selected requests have been Rejected!', 'success');
            },
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: false,
            cache: false
        });

    } else {
        swal("Cancelled", "Request has been cancelled:)", "error");
    }
});
}

function oGrid_ApproveThisForAddTolist(id, userrole, empid) {
    // $old('#divApproveConfirmation').jqmShow();

    //  $('#divApproveConfirmation').find('#btnApproveYes').attr({ '_id': id, '_docid': docid });
    swal({
        title: "Are you sure?",
        text: "Are you sure you want to approve the selected request?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Approve it!",
        cancelButtonText: "No, cancel Please!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
function (isConfirm) {
    if (isConfirm) {
        var text = prompt("Fill Comments", "");
        var mydata = "{'PK_id':'" + id.toString() + "','userrole':'" + userrole + "',empid:'" + EmployeeId + "','Comment':'" + text + "'}";
        //var  myData = "{'PK_id':'" + Id + "','userrole':'" + userrole + "','status':'1','empid':'" + empid + "'}";

        $.ajax({
            type: "POST",
            url: "../BWSD/SalesTerritorybrick_New.asmx/BrickAllocation_Approvel",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                GetBrickAllocation_NonApproval();
                swal(
                'success!',
                'Request has been approved!',
                'success'
            )
            },
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: false,
            cache: false
        });

        //  swal("Deleted!", "Your imaginary file has been deleted.", "success");
    } else {
        swal("Cancelled", "Request has been cancelled:)", "error");
    }
});
}

function oGrid_Rejected(dv_id) {
    swal({
        title: "Reject",
        text: "Are you sure you want to Reject the selected request?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Reject it!",
        cancelButtonText: "No, cancel Please!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
    function (isConfirm) {
        if (isConfirm) {
            var text = prompt("Fill Comments", "");
            var mydata = "{'PK_id':'" + dv_id.toString() + "','userrole':'" + CurrentUserRole + "',empid:'" + EmployeeId + "','Comment':'" + text + "'}";
            //var myData = "{'dv_id':'" + dv_id + "'}";

            if (mydata != "") {
                $('#hdnMode').val("R");
                $.ajax({
                    type: "POST",
                    url: "SalesTerritorybrick_New.asmx/BrickAllocation_Reject",
                    data: mydata,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        swal(
                        'success!',
                        'Request Rejected succesfully!',
                        'success'
                    )
                        GetBrickAllocation_NonApproval();
                    },
                    error: onError,
                    cache: false
                });
            }
        } else {
            swal("Cancelled", "Request has been cancelled:)", "error");
        }
    });
}

function GetBrickAllocation_NonApproval() {
    $('#containerteritory').parent().find('.dshload_back').show();
    $("#loader1").addClass("loader");
    var DistributorID = $('#ddlDistributors').val();
    var mio = '';
    var zsm = '';

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

    //if ($('#ddlTeam').val() == "-1") {
    //    l7 = $('#h8').val();
    //} else if ($('#ddlTeam').val() == null) {
    //    l7 = 0;
    //} else {
    //    l7 = $('#ddlTeam').val();
    //}

    l11 = $('#h9').val();
    l12 = $('#h10').val();
    empStatus = $('#EmpStatus').val();


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

    var Role = CurrentUserRole;
    var myData = "{'Level1Id':'" + (l1 == null ? 0 : l1) + "','Level2Id':'" + (l2 == null ? 0 : l2) +
                "','Level3Id':'" + (l3 == null ? 0 : l3) + "','Level4Id':'" + (l4 == null ? 0 : l4) +
                "','Level5Id':'" + (l5 == null ? 0 : l5) + "','Level6Id':'" + (l6 == null ? 0 : l6) +
                "','TeamID':'" + (l7 == null ? 0 : l7) +
                "','DistributorID':'" + (DistributorID == '-1' ? 0 : DistributorID) +
                "','Role':'" + Role + "'}";
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesTerritorybrick_New.asmx/GetBrickAllocation_NonApproval",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onsuccessGetBrickAllocation_NonApproval,
        //success: function (data) {
        //    if (data.d != "") {

        //        if (data.d != "No") {
        //            jsonObj = $.parseJSON(data.d);//Division	Region	Zone	Territory	DistributorCode	DistributorName	BrickCode	BrickName	SalePercentage
        //            var tablestring = "<table id='datatables' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'  > <thead>" +
        //                  "<tr style='background-color: #217ebd;color: white;'>" +
        //                  "<th > BUH </th>" +
        //                  "<th > GM  </th>" +
        //                  "<th > Division </th>" +
        //                  "<th > Region  </th>" +
        //                  "<th > Zone </th>" +
        //                  "<th > Territory </th>" +
        //                  "<th > Name </th>" +
        //                  "<th > Distributor  </th>" +
        //                  "<th > Brick </th>" +
        //                  "<th > Percentage </th></thead> <tbody>";
        //            for (var i = 0; i < jsonObj.length ; i++) {
        //                tablestring += "<tr>";
        //                tablestring += "<td  >" + jsonObj[i].BUH + "</td>";
        //                tablestring += "<td  >" + jsonObj[i].GM + " </td>";
        //                tablestring += "<td  >" + jsonObj[i].Division + "</td>";
        //                tablestring += "<td  >" + jsonObj[i].Region + " </td>";
        //                tablestring += "<td  >" + jsonObj[i].Zone + " </td>";
        //                tablestring += "<td  >" + jsonObj[i].Territory + "</td>";
        //                tablestring += "<td  >" + jsonObj[i].EmployeeName + "</td>";
        //                tablestring += "<td  >" + jsonObj[i].DistributorCode + "-" + jsonObj[i].DistributorName + " </td>";
        //                tablestring += "<td  >" + jsonObj[i].BrickCode + "-" + jsonObj[i].BrickName + " </td>";
        //                tablestring += "<td  >" + jsonObj[i].SalePercentage + " </td>";
        //                tablestring += "</tr>";
        //            }
        //            tablestring += "</tbody></table>";

        //            $("#teritorydetail").empty();
        //            $("#teritorydetail").append(tablestring);

        //            table = $('#datatables').DataTable({
        //                //  "ajax": '../ajax/data/arrays.txt'
        //            });
        //        }
        //        else {
        //            toastr.info('Not Found', 'Alert', {
        //                "closeButton": true,
        //                "debug": false,
        //                "positionClass": "toast-top-center",
        //                "onclick": null,
        //                "showDuration": "1000",
        //                "hideDuration": "1000",
        //                "timeOut": "3000",
        //                "extendedTimeOut": "1000",
        //                "showEasing": "swing",
        //                "hideEasing": "linear",
        //                "showMethod": "fadeIn",
        //                "hideMethod": "fadeOut"
        //            });

        //            var tablestring = "<table id='datatables' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'  > <thead>" +
        //                    "<tr style='background-color: #217ebd;color: white;'>" +
        //                    "<th > BUH </th>" +
        //                    "<th > GM  </th>" +
        //                    "<th > Division </th>" +
        //                    "<th > Region  </th>" +
        //                    "<th > Zone </th>" +
        //                    "<th > Territory </th>" +
        //                    "<th > Name </th>" +
        //                    "<th > Distributor  </th>" +
        //                    "<th > Brick </th>" +
        //                    "<th > Percentage </th></thead> <tbody>";

        //            tablestring += "</tbody></table>";

        //            $("#teritorydetail").empty();
        //            $("#teritorydetail").append(tablestring);

        //            table = $('#datatables').DataTable({
        //                //  "ajax": '../ajax/data/arrays.txt'
        //            });

        //        }
        //    }
        //    else {
        //        toastr.info('Not Found', 'Alert', {
        //            "closeButton": true,
        //            "debug": false,
        //            "positionClass": "toast-top-center",
        //            "onclick": null,
        //            "showDuration": "1000",
        //            "hideDuration": "1000",
        //            "timeOut": "3000",
        //            "extendedTimeOut": "1000",
        //            "showEasing": "swing",
        //            "hideEasing": "linear",
        //            "showMethod": "fadeIn",
        //            "hideMethod": "fadeOut"
        //        });
        //    }

        //},
        cache: false,
        aynsc: true
    });
}

function onsuccessGetBrickAllocation_NonApproval(data) {
    $("#griddivForDistributorSaleBrickdetail").empty();
    $("#griddivForDistributorSaleBrickdetail").append("<table id='grid-DistributorSaleBrickdetail' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
    $("#grid-DistributorSaleBrickdetail").empty();
    $("#grid-DistributorSaleBrickdetail").append("<thead>" +
                        "<tr style='background-color: #217ebd;color: white;'>" +
                        "<th data-column-id='Region'> Region </th> " +
                        "<th data-column-id='Zone'> Zone </th> " +
                        "<th data-column-id='Territory'> Territory </th> " +
                        "<th data-column-id='EmployeeName'> Employee </th> " +
                        "<th data-column-id='DistributorCode'> Distributor Code </th> " +
                        "<th data-column-id='DistributorName'> Distributor </th> " +
                        "<th data-column-id='BrickCode'> Brick Code </th> " +
                        "<th data-column-id='BrickName'> Brick </th> " +
                        "<th data-column-id='SalePercent'> Sale Percent </th> " +
                        "<th data-column-id='CreateDate'> CreateDate </th> " +
                        "</tr>" +
                      "</thead>" +
                      "<tbody id='valuesForDistributorSaleBrickdetail' >");

    if (data != "") {
        if (data.d != "No") {
            var msg = "";
            if (data.d == undefined) {
                msg = $.parseJSON(data);
            }
            else {
                if (data.d != "")
                    msg = $.parseJSON(data.d);
                else
                    msg = 0;
            }

            if (CurrentUserRole == 'rl4') {
                $("#griddivForDistributorSaleBrickdetail").empty();
                $("#griddivForDistributorSaleBrickdetail").append("<table id='grid-DistributorSaleBrickdetail' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
                $("#grid-DistributorSaleBrickdetail").empty();
                $("#grid-DistributorSaleBrickdetail").append("<thead>" +
                                    "<tr style='background-color: #217ebd;color: white;'>" +
                                    "<th data-column-id='Region'> Region </th> " +
                                    "<th data-column-id='Zone'> Zone </th> " +
                                    "<th data-column-id='Territory'> Territory </th> " +
                                    "<th data-column-id='EmployeeName'> Name </th> " +
                                    "<th data-column-id='DistributorCode'> Distributor Code </th> " +
                                    "<th data-column-id='DistributorName'> Distributor </th> " +
                                    "<th data-column-id='BrickCode'> Brick Code </th> " +
                                    "<th data-column-id='BrickName'> Brick </th> " +
                                    "<th data-column-id='SalePercent'> Sale Percent </th> " +
                                    "<th data-column-id='CreateDate'> Create Date </th> " +
                                    "<th data-column-id='Approve'>Approve <input id='CheckBoxCheck' style='vertical-align: middle;margin-top: 0px;' type='checkbox' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' name='ApproveAllForRemoval' onClick=\"SelectAllApproveCheckBoxes();\"></th> " +
                                    "<th data-column-id='Reject' >Reject <input style='vertical-align: middle;margin-top: 0px;' type='checkbox' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' name='ApproveAllForReject' onClick=\"SelectAllApproveCheckBoxesForRemoval();\"></th> " +
                                    "</tr>" +
                                  "</thead>" +
                                  "<tbody id='valuesForDistributorSaleBrickdetail' >");
                var val = '';
                for (var i = 0; i < msg.length ; i++) {

                    $('#btnApproveAllForAddTolist').show();
                    $('#btnRejectAllForAddTolist').show();
                    val = "<tr>" +
                            "<td>" + msg[i].Region + "</td>" +
                            "<td>" + msg[i].Zone + "</td>" +
                            "<td>" + msg[i].Territory + "</td>" +
                            "<td>" + msg[i].EmployeeName + "</td>" +
                            "<td>" + msg[i].DistributorCode + "</td>" +
                            "<td>" + msg[i].DistributorName + "</td>" +
                            "<td>" + msg[i].BrickCode + "</td>" +
                            "<td>" + msg[i].BrickName + "</td>" +
                            "<td>" + msg[i].SalePercent + "</td>" +
                            "<td>" + msg[i].CreateDate + "</td>";
                    if (msg[i].VerifiedBySM == 'Verified') {
                        val += "<td></td>" + "<td>Verified</td>" + "</tr></tbody>";
                    }
                    else if (msg[i].VerifiedBySM == 'Rejected') {
                        val += "<td></td>" + "<td>Rejected</td>" + "</tr></tbody>";
                    }

                        //else if (msg[i].VerifiedBySM == 'Pending') {
                        //    val += "<td></td>" + "<td>Pending by Admin</td>" + "</tr></tbody>";
                        //}
                    else {
                        val += "<td><a onClick=\"oGrid_ApproveThisForAddTolist('" + msg[i].ID + "','" + CurrentUserRole + "'," + msg[i].EmployeeId + ");\" href='javascript:;' style='vertical-align: text-top;' >Verify</a><input type='checkbox' name='checkboxes' onclick='setRejectFalse(event);' class='approveCheckBoxForRemoval' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-EmployeeId='" + msg[i].EmployeeId + "' value='" + msg[i].ID + "' ></td>" +
                            "<td><a onClick=\"oGrid_Rejected('" + msg[i].ID + "','" + CurrentUserRole + "'," + msg[i].EmployeeId + ");\" href='javascript:;' style='vertical-align: text-top;' >Reject</a><input type='checkbox' name='checkboxes' onclick='setApproveFalse(event);' class='approveCheckBoxForReject' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-EmployeeId='" + msg[i].EmployeeId + "' value='" + msg[i].ID + "' ></td>"
                        "</tr></tbody>";
                    }
                    $('#valuesForDistributorSaleBrickdetail').append(val);
                }
                $("#grid-DistributorSaleBrickdetail").DataTable({
                    responsive: true
                });
            }
            else if (CurrentUserRole == 'rl5') {

                $("#griddivForDistributorSaleBrickdetail").empty();
                $("#griddivForDistributorSaleBrickdetail").append("<table id='grid-DistributorSaleBrickdetail' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
                $("#grid-DistributorSaleBrickdetail").empty();
                $("#grid-DistributorSaleBrickdetail").append("<thead>" +
                                    "<tr style='background-color: #217ebd;color: white;'>" +
                                    "<th data-column-id='Region'> Region </th> " +
                                    "<th data-column-id='Zone'> Zone </th> " +
                                    "<th data-column-id='Territory'> Territory </th> " +
                                    "<th data-column-id='EmployeeName'> Name </th> " +
                                    "<th data-column-id='DistributorCode'> Distributor Code </th> " +
                                    "<th data-column-id='DistributorName'> Distributor </th> " +
                                    "<th data-column-id='BrickCode'> Brick Code </th> " +
                                    "<th data-column-id='BrickName'> Brick </th> " +
                                    "<th data-column-id='SalePercent'> Sale Percent </th> " +
                                    "<th data-column-id='CreateDate'> Create Date </th> " +
                                    "<th data-column-id='SM'> Status </th> " +
                                    //"<th data-column-id='Admin'> Admin Status </th> " +
                                    "</tr>" +
                                  "</thead>" +
                                  "<tbody id='valuesForDistributorSaleBrickdetail' >");
                var val = '';
                for (var i = 0; i < msg.length ; i++) {

                    $('#btnApproveAllForAddTolist').hide();
                    $('#btnRejectAllForAddTolist').hide();
                    val = "<tr>" +
                            "<td>" + msg[i].Region + "</td>" +
                            "<td>" + msg[i].Zone + "</td>" +
                            "<td>" + msg[i].Territory + "</td>" +
                            "<td>" + msg[i].EmployeeName + "</td>" +
                            "<td>" + msg[i].DistributorCode + "</td>" +
                            "<td>" + msg[i].DistributorName + "</td>" +
                            "<td>" + msg[i].BrickCode + "</td>" +
                            "<td>" + msg[i].BrickName + "</td>" +
                            "<td>" + msg[i].SalePercent + "</td>" +
                            "<td>" + msg[i].CreateDate + "</td>";

                    if ((msg[i].Admin_ApprovedStatus == 0 || msg[i].Admin_ApprovedStatus == '') && msg[i].SM_ApprovedStatus == '1') {
                        val += "<td>Pending by Admin</td>";
                    }
                    else if (msg[i].Admin_ApprovedStatus == 2 && msg[i].SM_ApprovedStatus == '1') {
                        val += "<td>Rejected by Admin</td>";
                    }
                    else if (msg[i].Admin_ApprovedStatus == 1 && msg[i].SM_ApprovedStatus == '1') {
                        val += "<td>Approved by Admin</td>";
                    }
                    else if (msg[i].SM_ApprovedStatus == 2 && (msg[i].Admin_ApprovedStatus == '' || msg[i].Admin_ApprovedStatus == '0')) {
                        val += "<td>Rejected by SM</td>";
                    }
                    else if (msg[i].SM_ApprovedStatus == 0 || msg[i].SM_ApprovedStatus == '') {
                        val += "<td>Pending by SM</td>";
                    }
                    val += + "</tr></tbody>";


                    //else {
                    //    val += "<td><a onClick=\"oGrid_ApproveThisForAddTolist('" + msg[i].ID + "','" + CurrentUserRole + "'," + msg[i].EmployeeId + ");\" href='javascript:;' style='vertical-align: text-top;' >Verify</a><input type='checkbox' name='checkboxes' onclick='setRejectFalse(event);' class='approveCheckBoxForRemoval' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-EmployeeId='" + msg[i].EmployeeId + "' value='" + msg[i].ID + "' ></td>" +
                    //        "<td><a onClick=\"oGrid_Rejected('" + msg[i].ID + "','" + CurrentUserRole + "'," + msg[i].EmployeeId + ");\" href='javascript:;' style='vertical-align: text-top;' >Reject</a><input type='checkbox' name='checkboxes' onclick='setApproveFalse(event);' class='approveCheckBoxForReject' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-EmployeeId='" + msg[i].EmployeeId + "' value='" + msg[i].ID + "' ></td>"
                    //    "</tr></tbody>";
                    //}
                    $('#valuesForDistributorSaleBrickdetail').append(val);
                }
                $("#grid-DistributorSaleBrickdetail").DataTable({
                    responsive: true
                });
            }

            else if (CurrentUserRole == 'Admin' || CurrentUserRole == 'admin') {

                $("#griddivForDistributorSaleBrickdetail").empty();
                $("#griddivForDistributorSaleBrickdetail").append("<table id='grid-DistributorSaleBrickdetail' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
                $("#grid-DistributorSaleBrickdetail").empty();
                $("#grid-DistributorSaleBrickdetail").append("<thead>" +
                                    "<tr style='background-color: #217ebd;color: white;'>" +
                                    "<th data-column-id='Region'> Region </th> " +
                                    "<th data-column-id='Zone'> Zone </th> " +
                                    "<th data-column-id='Territory'> Territory </th> " +
                                    "<th data-column-id='EmployeeName'> Name </th> " +
                                    "<th data-column-id='DistributorCode'> Distributor Code </th> " +
                                    "<th data-column-id='DistributorName'> Distributor </th> " +
                                    "<th data-column-id='BrickCode'> Brick Code </th> " +
                                    "<th data-column-id='BrickName'> Brick Name </th> " +
                                    "<th data-column-id='SalePercent'> Sale Percent </th> " +
                                    "<th data-column-id='CreateDate'> Create Date </th> " +
                                    "<th data-column-id='Approve'>Approve <input id='CheckBoxCheck' style='vertical-align: middle;margin-top: 0px;' type='checkbox' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' name='ApproveAllForRemoval' onClick=\"SelectAllApproveCheckBoxes();\"></th> " +
                                    "<th data-column-id='Reject' >Reject <input style='vertical-align: middle;margin-top: 0px;' type='checkbox' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' name='ApproveAllForReject' onClick=\"SelectAllApproveCheckBoxesForRemoval();\"></th> " +

                                    //"<th data-column-id='Approve' >Approve <input id='ChechBoxIDS' style='vertical-align: middle;margin-top: 0px;' type='checkbox' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' name='ApproveAll' onClick=\"SelectAllApproveCheckBoxesForAddTolist();\"></th> " +
                                    //"<th data-column-id='Reject' >Reject <input style='vertical-align: middle;margin-top: 0px;' type='checkbox' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' name='RejectAll' onClick=\"SelectAllRejectCheckBoxesForAddTolist();\"></th> " +
                                    "</tr>" +
                                  "</thead>" +
                                  "<tbody id='valuesForDistributorSaleBrickdetail'>");
                var val = '';
                if (msg.length > 0) {
                    $('#btnRejectAllForAddTolist').show();
                    $('#btnApproveAllForAddTolist').show();
                    for (var i = 0; i < msg.length ; i++) {
                        val = "<tr>" +
                            "<td>" + msg[i].Region + "</td>" +
                            "<td>" + msg[i].Zone + "</td>" +
                            "<td>" + msg[i].Territory + "</td>" +
                            "<td>" + msg[i].EmployeeName + "</td>" +
                            "<td>" + msg[i].DistributorCode + "</td>" +
                            "<td>" + msg[i].DistributorName + "</td>" +
                            "<td>" + msg[i].BrickCode + "</td>" +
                            "<td>" + msg[i].BrickName + "</td>" +
                            "<td>" + msg[i].SalePercent + "</td>" +
                            "<td>" + msg[i].CreateDate + "</td>";

                        if (msg[i].VerifiedByAdmin == 'Pending by Admin') {
                            $("#ChechBoxIDS").attr('disabled', !$("#ChechBoxIDS").attr('disabled'));
                            //  val += "<td><a onClick=\"oGrid_ApproveThisForAddTolist('" + msg[i].ID + "','" + CurrentUserRole + "');\" href='javascript:;' style='vertical-align: text-top;' >Approve</a><input type='checkbox' name='checkboxes' class='approveCheckBox' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-Territory='" + msg[i].Territory + "' value='" + msg[i].ID + "'></td>" +
                            //"<td><a onClick=\"oGrid_Rejected('" + msg[i].ID + "');\" href='javascript:;' style='vertical-align: text-top;'>Reject</a><input type='checkbox' name='rejectCheckboxes' class='rejectCheckBox' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' value='" + msg[i].ID + "'></td>" +
                            //"</tr></tbody>";
                            val += "<td><a onClick=\"oGrid_ApproveThisForAddTolist('" + msg[i].ID + "','" + CurrentUserRole + "'," + msg[i].EmployeeId + ");\" href='javascript:;' style='vertical-align: text-top;' >Verify</a><input type='checkbox' name='checkboxes' onclick='setRejectFalse(event);' class='approveCheckBoxForRemoval' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-EmployeeId='" + msg[i].EmployeeId + "' value='" + msg[i].ID + "' ></td>" +
                            "<td><a onClick=\"oGrid_Rejected('" + msg[i].ID + "','" + CurrentUserRole + "'," + msg[i].EmployeeId + ");\" href='javascript:;' style='vertical-align: text-top;' >Reject</a><input type='checkbox' name='checkboxes' onclick='setApproveFalse(event);' class='approveCheckBoxForReject' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-EmployeeId='" + msg[i].EmployeeId + "' value='" + msg[i].ID + "' ></td>"
                            "</tr></tbody>";

                        }
                            //else if (msg[i].VerifiedByAdmin == 'Pending by RSM') {
                            //    $("#ChechBoxIDS").attr('Enabled', !$("#ChechBoxIDS").attr('Enabled'));
                            //    val += "<td>--</td>" + "<td>" + msg[i].VerifiedByAdmin + "</td>" + "</tr></tbody>";
                            //}
                        else {
                            "<td><a onClick=\"oGrid_ApproveThisForAddTolist('" + msg[i].ID + "','" + CurrentUserRole + "');\" href='javascript:;' style='vertical-align: text-top;' >Approve</a><input type='checkbox' name='checkboxes' class='approveCheckBox' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-Territory='" + msg[i].Territory + "' value='" + msg[i].ID + "'></td>" +
                            "<td><a onClick=\"oGrid_RejectedForAddTolist('" + msg[i].ID + "');\" href='#' >Reject</a></td>" +

                            "</tr></tbody>";
                        }
                        $('#valuesForDistributorSaleBrickdetail').append(val);
                    }
                }

                $("#grid-basicForAddTolist").DataTable({
                    "columnDefs": [{
                        "targets": 12,
                        "orderable": false,
                        responsive: true,
                    }, { "targets": 11, "orderable": false }], 'order': [[12, 'desc']]
                    //columnDefs: [{ orderable: false, "targets": -1 }]
                });
            }
            else {
                $('#btnApproveAllForAddTolist').hide();
                $('#btnRejectAllForAddTolist').hide();
                $("#griddivForDistributorSaleBrickdetail").empty();
                $("#griddivForDistributorSaleBrickdetail").append("<table id='grid-DistributorSaleBrickdetail' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
                $("#grid-DistributorSaleBrickdetail").empty();
                $("#grid-DistributorSaleBrickdetail").append("<thead>" +
                                "<tr style='background-color: #217ebd;color: white;'>" +
                                    "<th data-column-id='Region'> Region </th> " +
                                    "<th data-column-id='Zone'> Zone </th> " +
                                    "<th data-column-id='Territory'> Territory </th> " +
                                    "<th data-column-id='EmployeeName'> Name </th> " +
                                    "<th data-column-id='DistributorCode'> Distributor Code </th> " +
                                    "<th data-column-id='DistributorName'> Distributor </th> " +
                                    "<th data-column-id='BrickCode'> Brick Code </th> " +
                                    "<th data-column-id='BrickName'> Name </th> " +
                                    "<th data-column-id='SalePercent'> Sale Percent </th> " +
                                    "<th data-column-id='CreateDate'> Create Date </th> " +
                                    "</tr>" +
                                  "</thead>" +
                                  "<tbody id='valuesForDistributorSaleBrickdetail'>");
                var val = '';
                for (var i = 0; i < msg.length ; i++) {
                    val = "<tr>" +
                       "<td>" + msg[i].Region + "</td>" +
                            "<td>" + msg[i].Zone + "</td>" +
                            "<td>" + msg[i].Territory + "</td>" +
                            "<td>" + msg[i].EmployeeName + "</td>" +
                            "<td>" + msg[i].DistributorCode + "</td>" +
                            "<td>" + msg[i].DistributorName + "</td>" +
                            "<td>" + msg[i].BrickCode + "</td>" +
                            "<td>" + msg[i].BrickName + "</td>" +
                            "<td>" + msg[i].SalePercent + "</td>" +
                            "<td>" + msg[i].CreateDate + "</td>";
                    $('#valuesForDistributorSaleBrickdetail').append(val);
                }
                $("#grid-DistributorSaleBrickdetail").DataTable({
                    responsive: true
                });
            }
        }
        else {
            $('#btnApproveAllForAddTolist').hide();
            $('#btnRejectAllForAddTolist').hide();
            $("#griddivForDistributorSaleBrickdetail").empty();
            $("#griddivForDistributorSaleBrickdetail").append("<table id='grid-DistributorSaleBrickdetail' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
            $("#grid-DistributorSaleBrickdetail").empty();
            $("#grid-DistributorSaleBrickdetail").append("<thead>" +
                               "<tr style='background-color: #217ebd;color: white;'>" +
                                "<th data-column-id='Region'> Region </th> " +
                                "<th data-column-id='Zone'> Zone </th> " +
                                "<th data-column-id='Territory'> Territory </th> " +
                                "<th data-column-id='EmployeeName'> Name </th> " +
                                "<th data-column-id='DistributorCode'> Distributor Code </th> " +
                                "<th data-column-id='DistributorName'> Distributor </th> " +
                                "<th data-column-id='BrickCode'> Brick Code </th> " +
                                "<th data-column-id='BrickName'> Brick </th> " +
                                "<th data-column-id='SalePercent'> Sale Percent </th> " +
                                "<th data-column-id='CreateDate'> Create Date </th> " +
                            "</tr>" +
                          "</thead>" +
                          "<tbody id='valuesForDistributorSaleBrickdetail' >");
            $("#grid-DistributorSaleBrickdetail").DataTable({
                responsive: true
            });
        }
        $('.loding_box_outer').hide();
    }
    else {
        toastr.info('Not Found', 'Alert', {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-center",
            "onclick": null,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        });
    }
    $('#containerteritory').parent().find('.dshload_back').hide();
}

function GetAlldata() {
    GetTerritoryBrickDetail();
}

function GetTerritoryBrickDetail() {
    $('#containerteritory1').parent().find('.dshload_back').show();
    $("#loader2").addClass("loader");
    var salesdistid = 0;//$('#ddlDistributors').val();

    var DistributorID = $('#ddlDistributors').val();
    var mio = '';
    var zsm = '';

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

    //if ($('#ddlTeam').val() == "-1") {
    //    l7 = $('#h8').val();
    //} else if ($('#ddlTeam').val() == null) {
    //    l7 = 0;
    //} else {
    //    l7 = $('#ddlTeam').val();
    //}

    l11 = $('#h9').val();
    l12 = $('#h10').val();
    empStatus = $('#EmpStatus').val();


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

    var Role = CurrentUserRole;
    var myData = "{'Level1Id':'" + (l1 == null ? 0 : l1) + "','Level2Id':'" + (l2 == null ? 0 : l2) +
                "','Level3Id':'" + (l3 == null ? 0 : l3) + "','Level4Id':'" + (l4 == null ? 0 : l4) +
                "','Level5Id':'" + (l5 == null ? 0 : l5) + "','Level6Id':'" + (l6 == null ? 0 : l6) +
                "','TeamID':'" + (l7 == null ? 0 : l7) +
                "','DistributorID':'" + (DistributorID == '-1' ? 0 : DistributorID) +
                "','Role':'" + Role + "'}";

    //var l1 = $('#ddl111').val();
    //var l2 = $('#ddl222').val();
    //var l3 = $('#ddl333').val();
    //var l4 = $('#ddl444').val();
    //var l5 = $('#ddl555').val();
    //var l6 = $('#ddl666').val();
    var percen = $('#ddlimit').val();

    var myData = "{'Level1Id':'" + (l1 == null ? 0 : l1) + "','Level2Id':'" + (l2 == null ? 0 : l2) + "','Level3Id':'" + (l3 == null ? 0 : l3) + "','Level4Id':'" + (l4 == null ? 0 : l4) + "','Level5Id':'" + (l5 == null ? 0 : l5) + "','Level6Id':'" + (l6 == null ? 0 : l6) + "','DistributorID':'" + (salesdistid == '-1' ? 0 : salesdistid) + "','percentag':'" + (percen == '-1' ? 0 : percen) + "'}";//percentag percen
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesTerritorybrick_New.asmx/listGetTerritoryBrickDetail",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != "") {

                if (data.d != "No") {



                    jsonObj = $.parseJSON(data.d);//Division	Region	Zone	Territory	DistributorCode	DistributorName	BrickCode	BrickName	SalePercentage
                    var tablestring = "<table id='datatables' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'  > <thead>" +
                          "<tr style='background-color: #217ebd;color: white;'>" +
                          "<th > BUH </th>" +
                          "<th > GM  </th>" +
                          "<th > Division </th>" +
                          "<th > Region  </th>" +
                          "<th > Zone </th>" +
                          "<th > Territory </th>" +
                          "<th > Name </th>" +
                          "<th > Distributor  </th>" +
                          "<th > Brick </th>" +
                          "<th > Percentage </th></thead> <tbody>";
                    for (var i = 0; i < jsonObj.length ; i++) {
                        tablestring += "<tr>";
                        tablestring += "<td  >" + jsonObj[i].BUH + "</td>";
                        tablestring += "<td  >" + jsonObj[i].GM + " </td>";
                        tablestring += "<td  >" + jsonObj[i].Division + "</td>";
                        tablestring += "<td  >" + jsonObj[i].Region + " </td>";
                        tablestring += "<td  >" + jsonObj[i].Zone + " </td>";
                        tablestring += "<td  >" + jsonObj[i].Territory + "</td>";
                        tablestring += "<td  >" + jsonObj[i].EmployeeName + "</td>";
                        tablestring += "<td  >" + jsonObj[i].DistributorCode + "-" + jsonObj[i].DistributorName + " </td>";
                        tablestring += "<td  >" + jsonObj[i].BrickCode + "-" + jsonObj[i].BrickName + " </td>";
                        tablestring += "<td  >" + jsonObj[i].SalePercentage + " </td>";
                        tablestring += "</tr>";
                    }
                    tablestring += "</tbody></table>";

                    $("#teritorydetail").empty();
                    $("#teritorydetail").append(tablestring);

                    table = $('#datatables').DataTable({
                        //  "ajax": '../ajax/data/arrays.txt'
                    });
                }
                else {
                    toastr.info('Not Found', 'Alert', {
                        "closeButton": true,
                        "debug": false,
                        "positionClass": "toast-top-center",
                        "onclick": null,
                        "showDuration": "1000",
                        "hideDuration": "1000",
                        "timeOut": "3000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    });

                    var tablestring = "<table id='datatables' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'  > <thead>" +
                            "<tr style='background-color: #217ebd;color: white;'>" +
                            "<th > BUH </th>" +
                            "<th > GM  </th>" +
                            "<th > Division </th>" +
                            "<th > Region  </th>" +
                            "<th > Zone </th>" +
                            "<th > Territory </th>" +
                            "<th > Name </th>" +
                            "<th > Distributor  </th>" +
                            "<th > Brick </th>" +
                            "<th > Percentage </th></thead> <tbody>";

                    tablestring += "</tbody></table>";

                    $("#teritorydetail").empty();
                    $("#teritorydetail").append(tablestring);

                    table = $('#datatables').DataTable({
                        //  "ajax": '../ajax/data/arrays.txt'
                    });

                }
            }
            else {
                toastr.info('Not Found', 'Alert', {
                    "closeButton": true,
                    "debug": false,
                    "positionClass": "toast-top-center",
                    "onclick": null,
                    "showDuration": "1000",
                    "hideDuration": "1000",
                    "timeOut": "3000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                });
            }
            $('#containerteritory1').parent().find('.dshload_back').hide();
        },
        cache: false,
        aynsc: true
    });
}

function FillRegion() {
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesDistributorService.asmx/GetAllRegion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {

            $("#ddl1Region").empty();
            $("#ddl1Region").append("<option value='-1'>Select Region</option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $("#ddl1Region").append("<option value='" + option.RegionID + "'>" + option.RegionName + "</option>");
                });
            }

        },

        error: onError,
        cache: false

    });
}

function FillSubRegion(id) {
    myData = "{'ID':'" + id + "'}";
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesDistributorService.asmx/GetAllSubRegion",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {

            $("#ddl3District").val('-1').trigger("change");
            $("#ddl4City").val('-1').trigger("change");
            $("#ddlDistributors").val('-1').trigger("change");
            $("#ddl2SubRegion").empty();
            $("#ddl2SubRegion").append("<option value='-1'>Select Sub Region</option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $("#ddl2SubRegion").append("<option value='" + option.SubRegionID + "'>" + option.SubRegionName + "</option>");
                });
            }

        },

        error: onError,
        cache: false

    });
}

function FillDistrict(id) {
    myData = "{'ID':'" + id + "'}";
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesDistributorService.asmx/GetAllDistrict",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {
            $("#ddl4City").val('-1').trigger("change");
            $("#ddlDistributors").val('-1').trigger("change");
            $("#ddl3District").empty();
            $("#ddl3District").append("<option value='-1'>Select District </option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {//DistrictID,d.DistrictName
                    $("#ddl3District").append("<option value='" + option.DistrictID + "'>" + option.DistrictName + "</option>");
                });
            }

        },

        error: onError,
        cache: false

    });
}

function FillCity(id) {
    myData = "{'ID':'" + id + "'}";
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesDistributorService.asmx/GetAllCity",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {
            $("#ddlDistributors").val('-1').trigger("change");
            $("#ddl4City").empty();
            $("#ddl4City").append("<option value='-1'>Select City </option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $("#ddl4City").append("<option value='" + option.CityID + "'>" + option.City + "</option>");
                });
            }

        },

        error: onError,
        cache: false

    });
}

function FillDistributor(ID) {
    myData = "{'CityID':'" + ID + "'}";
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesBrickRelation.asmx/GetSalesDistributor",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (response, data, status) {

            $('#ddlDistributors').empty();
            $("#ddlDistributors").append("<option value='-1'>Select Distributor</option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {// [DistributorCode][DistributorName]
                    $("#ddlDistributors").append("<option value='" + option.ID + "'>" + option.DistributorCode + " - " + option.DistributorName + "</option>");
                });
            }

        },

        error: onError,
        cache: false

    });
}

function OnChangedtxtDate() {
    $('#dialog_1').jqm({ modal: true });
    $('#dialog_1').jqm();
    $('#dialog_1').jqmShow();
    listGetDoctorsBrick();
    $('#listbox2').empty();
    $('#dialog_1').jqmHide();
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

function SaveData() {

    var SalesPercent = $('#inpSalesPercent').val();
    var salesbricksid = $('#listbox1').val();
    var salesdistid = $('#ddlDistributors').val();
    var spoid = $('#ddl66').val();
    var saleper = $('#inpSalesPercent').val();

    if (SalesPercent == "") {
        $("#col44per").addClass("has-error");
        // alert("Enter Sale Brick Percentage!");
        return false;
    }
    else {
        $("#col44per").removeClass("has-error");
    }


    if (salesdistid == '-1') {
        $("#col5dist").addClass("has-error");
        alert("Please Select Sales Distributor!");
        return false;
    }
    else {
        $("#col5dist").removeClass("has-error");
    }
    if (spoid == '-1') {
        $("#col66").addClass("has-error");
        alert("Please Select SPO!");
        return false;
    }
    else {
        $("#col66").removeClass("has-error");
    }

    if (salesbricksid == null) {
        $("#List1").addClass("has-error");
        alert("Please Select Sales Brick!");
        return false;
    }
    else {
        $("#List1").removeClass("has-error");
    }

    //  var brickid = $("#listbox1").data("brickid");
    var brickwithcoma = [];
    // if ($("#ddlMIOpopup").val() != "0") {
    $('#listbox1 :selected').each(function () {
        // miocallplanid.push($(this).data('callplanid'));
        brickwithcoma.push($(this).data('brickid'));
    });
    //  }

    //string DivisionID, string RegionID, string ZoneID, string TerritoryID,SalesBrick
    var myData = "{'SalesDistributorID':'" + salesdistid + "','SalesBrick':'" + brickwithcoma + "','SalesBricksID':'" + salesbricksid
                    + "','BUHID':'" + $('#ddl11').val()
                    + "','GMID':'" + $('#ddl22').val()
                    + "','DivisionID':'" + $('#ddl33').val()
                    + "','RegionID':'" + $('#ddl44').val()
                    + "','ZoneID':'" + $('#ddl55').val()
                    + "','TerritoryID':'" + spoid
                    + "','salepercent':'" + saleper + "'}";
    $.ajax({
        type: "POST",//string TerritoryID,string salepercent
        url: "../BWSD/SalesTerritorybrick_New.asmx/InsertRelationalSalesBrick",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (data, status) {
            debugger;
            $('#listbox2').empty();
            if (data.d == "Exist") {
                alert("Already Territory Assign...!");
                listGetSalesBricks();
            }
            else if (data.d == "OK") {
                alert("Attached Succesfully");
                listGetSalesBricks();

                GetTerritoryBrickDetail();
            }
            else if (data.d.split(',')[0] == "Nobalanace") {
                alert("Limit Exceed Brick Percentage : " + data.d.split(',')[1]);
                listGetSalesBricks();
                GetTerritoryBrickDetail();
            }

        },
        error: onError,
        cache: false

    });
}

function DeleteData() {


    var salesbricksid = $('#listbox2').val();
    var salesdistid = $('#ddlDistributors').val();
    var spoid = $('#ddl66').val();
    if (spoid == '-1') {
        alert("Please Select SPO!");
        return false;
    }

    if (salesdistid == '-1') {
        alert("Please Select Sales Distributor!");
        return false;
    }

    if (salesbricksid == null) {
        alert("Please Select Sales Brick!");
        return false;
    }

    //var myData = "{'SalesDistributorID':'" + salesdistid + "','SalesBricksID':'" + salesbricksid + "'}";
    var myData = "{'SalesDistributorID':'" + salesdistid + "','SalesBricksID':'" + salesbricksid + "','TerritoryID':'" + spoid + "','salepercent':'0'}";

    $.ajax({
        type: "POST",
        url: "../BWSD/SalesTerritorybrick_New.asmx/RemoveRelationalSalesBrick",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (data, status) {
            $('#listbox2').empty();

            alert("Remove Succesfully");
            listGetSalesBricks();
            GetTerritoryBrickDetail();

        },
        error: onError,
        cache: false

    });
}

function listGetEmpSalesBricks() {
    //  $('#ddlDistributors').empty();
    var empID = $("#ddlDistributors").val();
    myData = "{'empID':'" + empID + "'}";
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesTerritorybrick_New.asmx/listGetEmpSalesBricks",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (data, status) {
            $('#listbox1').empty();
            if (data.d == "No") {

            }
            else {
                var msg = JSON.parse(data.d);
                $("#listbox1").append("<option value='-1'>Select Brick</option>");
                $.each(msg, function (i, option) {//BrickCode
                    $("#listbox1").append("<option value='" + option.ID + "' data-brickid='" + option.brickID + "'>" + option.BrickCode + " - " + option.BrickName + "</option>");
                });
            }
        },
        error: onError,
        cache: false

    });
}

function listGetSalesBricks() {

    var distributorCode = $("#ddlDistributors").val();
    var spoid = $('#h13').val();
    myData = "{'distributorCode':'" + distributorCode + "','TerritoryID':'" + spoid + "'}";
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesTerritorybrick_New.asmx/listGeTeritorytSalesBricks",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (data, status) {
            $('#listbox2').empty();
            $("#listbox2").append("<option value='-1'>- Territory Sale Brick -</option>")

            if (data.d == "No") {

            }
            else {
                var msg = JSON.parse(data.d);
                $.each(msg, function (i, option) {
                    //sb.ID, sb.BrickName
                    $("#listbox2").append("<option value='" + option.ID + "'>" + option.BrickCode + " - " + option.BrickName + " - " + option.SalePercentage + "%" + "</option>");

                });
            }
        },
        error: onError,
        cache: false

    });
}

function FillSalesBricksData(cityid) {
    myData = "{'cityid':'" + cityid + "'}";
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesBrickRelation.asmx/GetSalesBricks",
        contentType: "application/json;",
        data: myData,
        dataType: "json",
        async: false,
        success: function (data, status) {
            $('#listbox2').empty();
            $('#listbox1').empty();
            var msg = JSON.parse(data.d);
            $.each(msg, function (i, option) {
                $('#listbox1').append('<option  value="' + option.ID + '">' + option.BrickName + '</option>');
            });
        },
        error: onError,
        cache: false

    });
}

function ClearFields() {

    $('#ddldocbrick').val("");
    $('#listbox2').val("");

}

function btnCancelClicked() {

    $('#hdnMode').val("AddMode");
    ClearFields();
    ajaxCompleted();
    $("#btnRefresh").trigger('click');
    return false;
}

function btnNoClicked() {

    $('#divConfirmation').jqmHide();
    $('#hdnMode').val("AddMode");
    ClearFields();
    ajaxCompleted();
    return false;
}

function btnOkClicked() {

    $('#Divmessage').jqmHide();
    $('#hdnMode').val("AddMode");
    $("#btnRefresh").trigger('click');
    ClearFields();
    ajaxCompleted();
    return false;
}

function ajaxCompleted() {

    $('#imgLoading').hide();
}

function onSuccess(data, status) {

    if (data.d == "OK") {

        mode = $('#hdnMode').val();
        msg = '';

        if (mode === "AddMode") {
            msg = 'Data inserted succesfully!';

        }


        ClearFields();

        $('#hdnMode').val("");
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();


    }
    else if (data.d == "Duplicate Name!") {
        msg = 'Product already exist! Try different';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
        return false;
    }
    else if (data.d == "Not able to delete this record due to linkup.") {
        $('#divConfirmation').jqmHide();
        msg = 'Not able to delete this record due to linkup.';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

    }
}

function onError(request, status, error) {

    msg = 'Error occoured';

    $.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });

    $('#imgLoading').hide();
}

function startingAjax() {

    $('#imgLoading').show();
}

function check(e, value) {
    //Check Character
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (value.indexOf(".") != -1) if (unicode == 46) return false;
    if (unicode != 8) if ((unicode < 48 || unicode > 57) && unicode != 46) return false;
}

function checkLength() {
    var fieldVal = document.getElementById('inpSalesPercent').value;
    //Suppose u want 3 number of character
    if (fieldVal <= 100) {
        return true;
    }
    else {
        var str = document.getElementById('inpSalesPercent').value;
        str = str.substring(0, str.length - 1);
        document.getElementById('inpSalesPercent').value = str;
    }
}

function uploadFile() {
    $('#dialog_1').hide();
    var formdata = new FormData();

    var files1 = $("#sheetUploader")[0].files[0];

    //formdata.append("Filedata", files1[0]);
    formdata.append('Filedata', files1);

    $.ajax({
        type: "POST",
        url: "../BWSD/GetExcelRTBD.ashx?Type=U",
        contentType: "application/json; charset=utf-8",
        data: formdata,
        processData: false,
        contentType: false,
        success: function (file, data, response) {
            $('#dialog_1').show();
            $.ajax({
                url: "../BWSD/GetExcelRTBD.ashx?Type=" + 'RTBD' + '&FileName=' + files1.name + '&PFileName=' + file,
                contentType: "application/json; charset=utf-8",
                success: OnCompleteDownload,
                error: onError
            });
        },
        error: onError,
        contentType: false,
        processData: false,
        async: false,
        cache: false
    });

}
//$(document).ready(function () {
//    $('#dialog_1').hide();
//    $('#dialog1').hide();

//    $('#uploadify_button2').uploadify({
//        'buttonText': 'Upload File',
//        'fileSizeLimit': '100MB',
//        'swf': '../Scripts/Uploadify/uploadify.swf',
//        'uploader': "../BWSD/GetExcelRTBD.ashx?Type=" + 'U',
//        'onUploadStart': function () {

//        },
//        'width': '140',
//        'height': '25',
//        //'wmode': 'transparent',
//        'onUploadSuccess': function (file, data, response) {


//            $('#dialog_1').show();
//            $.ajax({
//                url: "../BWSD/GetExcelRTBD.ashx?Type=" + 'RTBD' + '&FileName=' + file.name + '&PFileName=' + data,
//                contentType: "application/json; charset=utf-8",
//                success: OnCompleteDownload,
//                //beforeSend: startingAjax,
//                //complete: ajaxCompleted,
//                error: onError,
//            });
//        }
//    });



//    $('#exportExcel2').click(exportDoctorExcel2);
//});

function OnCompleteDownload(data, status) {

    $('#dialog_1').hide();

    if (data == 'Your File Has been Processed Successfully') {

        AlertMsg('Data Upload Successfull. An email will be sent to tou after data processing is completed.');
        //ProcessDATARTBD();
    }
    else {
        //  alert('Error Data Upload');
        AlertMsg('Error Data Upload');

    }

}

function ProcessDATARTBD() {
    $('#dialog1').show();
    $.ajax({
        type: "POST",
        url: "../BWSD/GetExcelRTBD.ashx?Type=RTBDProcess",
        contentType: "application/json; charset=utf-8",
        success: onSuccessProcessDATADSR,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: onError,

    });
}

function onSuccessProcessDATADSR(data, status) {
    $('#dialog1').hide();
    if (data == 'DSuccess') {
        //alert('Successful Data Process');
        AlertMsg('Successful Data Process');
    }
    else {
        //alert('Error Data Processing');
        AlertMsg('Error Data Processing')
    }
}

function exportDoctorExcel2() {
    window.open("../BWSD/GetExcelRTBD.ashx?Type=DD&EmployeeId=" + EmployeeId + "&Level6Id=" + $('#dG1').val() + "&DistributorID=" + $('#ddlDistributors').val());
};

function AlertMsg(text) {
    toastr.info(text, 'Alert', {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-center",
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    });
}

function onError(request, status, error) {

    // alert('Error is occured');
    AlertMsg('Error is occured')
    $('#dialog_1').hide();
    $('#dialog1').hide();


}

function startingAjax() {

    $('#dialog_1').show();

}

function ajaxCompleted() {
    $('#dialog_1').hide();
}

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
            cache: false
        });

    }
    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        EmployeeIdForTeam = EmployeeId;
        FillTeamsbyBUH();
    } else if (CurrentUserRole == 'rl4') {
        EmployeeIdForTeam = EmployeeId;
        FillTeamsbyBUH();
    }

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
            $('#btnsubmitbrickdata1').show();
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

        if (CurrentUserRole == 'headoffice') {
            $('#col1').show();
            $('#col2').show();
            $('#col3').show();
            $('#col11').show();
            $('#col22').show();
            $('#col33').show();


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
            $('#gs3').hide();
            $('#cols33').hide();
            $('#col1').show();
            $('#col2').show();
            $('#col11').show();
            $('#col22').show();
            $('#g1').show();
            $('#g2').show();
            $('#btnsubmitbrickdata1').show();
        }
        if (CurrentUserRole == 'rl5') {

            $('#col1').show();
            $('#col11').show();

            $('#g1').show();

            $('#uploadify_button2').show();
            $('#exportExcel2').show();
            $('#btnsubmitbrickdata1').show();
        }
        if (CurrentUserRole == 'rl6') {

            $('.Th12').hide();
            $('#col77').hide();
            //$('.Th112').hide();
        }

        GetHierarchySelection();
        FillDropDownList();

    }
    if (glbVarLevelName == "Level3") {

        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator') {
            $('#btnsubmitbrickdata1').show();
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
            $('#gs3').hide();
            $('#cols33').hide();
            $('#col1').show();
            $('#col2').show();
            $('#col11').show();
            $('#col22').show();

            $('#g1').show();
            $('#g2').show();
            $('#btnsubmitbrickdata1').show();

        }
        if (CurrentUserRole == 'rl5') {

            $('#col1').show();
            $('#col11').show();

            $('#g1').show();
            $('#uploadify_button2').show();
            $('#exportExcel2').show();
            $('#btnsubmitbrickdata1').show();
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

            //$("#ddlTeam").append("<option value='" + value + "'>" + name + "</option>");

            //$.each(jsonObj, function (i, tweet) {
            //    $("#ddlTeam").append("<option value='" + tweet.TeamID + "'>" + tweet.TeamName + "</option>");
            //});


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
        // url: "../Reports/datascreen.asmx/FilterDropDownList",
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
        //OnChangeddl2withteamId();
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
        //OnChangeddl3withteamId();
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
        //OnChangeddl3withteamId();
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
        //OnChangeddl4withteamId();
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

        //levelValue = $('#ddl1').val();
        //var teamid = $('#ddlTeam').val();
        //myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        //if (levelValue != -1) {

        //    $.ajax({
        //        type: "POST",
        //        url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel3",
        //        data: myData,
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        success: onSuccessFillddl1withteamId,
        //        error: onError,
        //        beforeSend: startingAjax,
        //        complete: ajaxCompleted,
        //        cache: false
        //    });

        //}
        //else {

        //    $('#dG4').val(-1)

        //    if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
        //        $('#h5').val(0);
        //        $('#h12').val(0);
        //        $('#h13').val(0);
        //    }
        //    if (CurrentUserRole == 'rl1') {
        //        $('#h12').val(0);
        //        $('#h13').val(0);
        //    }
        //    if (CurrentUserRole == 'rl2') {
        //        $('#h13').val(0);
        //    }
        //    document.getElementById('ddl5').innerHTML = "";
        //    document.getElementById('ddl6').innerHTML = "";
        //    document.getElementById('dG5').innerHTML = "";
        //    document.getElementById('dG6').innerHTML = "";

        //}

        //$('#dialog').jqmHide();
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
            //document.getElementById('dG2').innerHTML = "";
            //value = '-1';

            //name = 'Select ' + $('#Label2').text();
            //$("#dG2").append("<option value='" + value + "'>" + name + "</option>");

            //$.each(jsonObj, function (i, tweet) {
            //    $("#dG2").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            //});
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

    ////levelValue = $('#ddl1').val();

    ////if (levelValue != -1) {
    ////    myData = "{'employeeid':'" + levelValue + "' }";
    ////    $.ajax({
    ////        type: "POST",
    ////        url: "../Reports/NewReports.asmx/getemployeeHR",
    ////        data: myData,
    ////        contentType: "application/json; charset=utf-8",
    ////        dataType: "json",
    ////        success: onSuccessFillddl11withteamId,
    ////        error: onError,
    ////        beforeSend: startingAjax,
    ////        complete: ajaxCompleted,
    ////        cache: false
    ////    });
    ////}

    ////if (levelValue == -1) {
    ////    $('#dG1').val(-1);
    ////}

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
        //value = '-1';
        //name = 'Select ' + $('#Label3').text();
        //$("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});

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

        //name = 'Select ' + $('#Label4').text();
        //$("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl4").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});


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

    //if ($("#ddl3").val() == "-1") {

    //} else {
    if (CurrentUserRole == 'rl3' || CurrentUserRole == 'headoffice') {
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddlTeam').innerHTML = "";
        document.getElementById('ddl2').innerHTML = "";

        document.getElementById('dG2').innerHTML = "";
        document.getElementById('dG3').innerHTML = "";
        document.getElementById('dG7').innerHTML = "";

        //if ($("#ddl2").val() == "-1" || $("#ddl2").val() == " " || $("#ddl2").val() == null) {
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




        //} else {
        //    if (data.d != "") {
        //        document.getElementById('ddl3').innerHTML = "";
        //        jsonObj = JSON.parse(data.d);
        //        value = '-1';

        //        name = 'Select ' + $('#Label2').text();
        //        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        //        $.each(jsonObj, function (i, tweet) {
        //            $("#ddl3").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //        });


        //        levelValue = $('#ddl2').val();
        //        if (levelValue != -1) {

        //            myData = "{'employeeid':'" + levelValue + "' }";
        //            $.ajax({
        //                type: "POST",
        //                url: "../Reports/newReports.asmx/getemployeeHR",
        //                data: myData,
        //                contentType: "application/json; charset=utf-8",
        //                dataType: "json",
        //                success: onSuccessFillddl13withteamId,
        //                error: onError,
        //                beforeSend: startingAjax,
        //                complete: ajaxCompleted,
        //                cache: false
        //            });
        //        }
        //    }
        //}


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
    //}
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


    //if (CurrentUserRole == 'rl2') {
    //    levelValue = $('#ddl4').val();
    //}
    //if (CurrentUserRole == 'rl4') {
    //    levelValue = $('#ddl5').val();
    //}

    //if (CurrentUserRole == 'rl2' || CurrentUserRole == 'rl4') {

    //    if (levelValue != -1) {

    //        myData = "{'employeeid':'" + levelValue + "' }";
    //        $.ajax({
    //            type: "POST",
    //            url: "../Reports/newReports.asmx/getemployeeHR",
    //            data: myData,
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: onSuccessFillddl14,
    //            error: onError,
    //            beforeSend: startingAjax,
    //            complete: ajaxCompleted,
    //            cache: false
    //        });
    //    }
    //}

    //if (levelValue == -1) {
    //    $('#ddl4').val(-1);
    //    $('#dG4').val(-1);
    //}
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
        //if (CurrentUserRole == 'rl1') {
        //    FillTeamsbyBUH();
        //}

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

            // dg1();

        }
        if (CurrentUserRole == 'rl1') {

            $('#dG1').val(data.d[0].LevelId2)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            dg1WithTeam();

        }
        if (CurrentUserRole == 'rl2') {

            //$('#dG1').val(data.d[0].LevelId3)

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

            //dg2();

        }
        if (CurrentUserRole == 'marketingteam') {
            $('#dG1').val(data.d[0].LevelId1)

            $('#h2').val(data.d[0].LevelId1)
            $('#h3').val(data.d[0].LevelId2)

            //dg2();

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

            //$('#dG3').val(data.d[0].LevelId4)

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
            // dg4();
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


    //levelValue = $('#dG1').val();
    //myData = "{'level1Id':'" + levelValue + "' }";
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

        //levelValue = $('#dG2').val();
        //myData = "{'level2Id':'" + levelValue + "' }";
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

        //levelValue = $('#dG2').val();
        //myData = "{'level2Id':'" + levelValue + "' }";
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
        //levelValue = $('#dG4').val();
        //teamId = $('#ddlTeam').val();
        //myData = "{'level4Id':'" + levelValue + "','teamId':'" + teamId + "' }";


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

        //if ($('#dG1').val() != null && $('#ddl2').val() != null) {

        //    levelValue = $('#ddl2').val();
        //    var teamid = $('#dG1').val();
        //    myData = "{'employeeId':'" + levelValue + "' ,'teamId':'" + teamid + "'}";
        //    if (levelValue != -1) {

        //        $.ajax({
        //            type: "POST",
        //            url: "../Reports/NewReports.asmx/GetEmployeewithteamForHierarchyLevel4",
        //            data: myData,
        //            contentType: "application/json; charset=utf-8",
        //            dataType: "json",
        //            success: onSuccessFillddl3withteamId,
        //            error: onError,
        //            beforeSend: startingAjax,
        //            complete: ajaxCompleted,
        //            cache: false
        //        });

        //    }
        //    else {

        //        $('#dG2').val(-1).select2()

        //        if (CurrentUserRole == 'admin' || CurrentUserRole == 'admincoordinator' || CurrentUserRole == 'ftm') {
        //            $('#h5').val(0);
        //            $('#h12').val(0);
        //            $('#h13').val(0);
        //        }
        //        if (CurrentUserRole == 'rl1') {
        //            $('#h12').val(0);
        //            $('#h13').val(0);
        //        }
        //        if (CurrentUserRole == 'rl2') {
        //            $('#h13').val(0);
        //        }
        //        document.getElementById('ddl5').innerHTML = "";
        //        document.getElementById('ddl6').innerHTML = "";
        //        document.getElementById('dG5').innerHTML = "";
        //        document.getElementById('dG6').innerHTML = "";

        //    }

        //    $('#dialog').jqmHide();
        //} else {
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
        //}
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
    //FillMRDr();
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


        //if (CurrentUserRole == 'rl1') {
        //    FillTeamsbyBUH();
        //}
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
        //document.getElementById('dG3').innerHTML = "";
        //document.getElementById('dG4').innerHTML = "";
        //document.getElementById('dG5').innerHTML = "";
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

        //if (CurrentUserRole == 'ftm') {
        //    SetRegionHierarchyForFTM();
        //}
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
            //if ($("#dG7").val() != null) {
            //    value = '-1';
            //    name = 'Select ' + $('#Label8').text();

            //    $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            //    $.each(data.d, function (i, tweet) {
            //        var nameslpit = tweet.Item2;
            //        var splitnsm = nameslpit.split("_");
            //        $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
            //    });
            //    if (CurrentUserRole == 'ftm') {
            //        SetRegionHierarchyForFTM();
            //    }
            //} else {
            value = '-1';
            name = 'Select ' + $('#Label13').text();

            $("#dG7").append("<option value='" + value + "'>" + name + "</option>");

            $.each(data.d, function (i, tweet) {
                var nameslpit = tweet.Item2;
                var splitnsm = nameslpit.split("_");
                $("#dG7").append("<option value='" + tweet.Item1 + "'>" + splitnsm[1] + "</option>");
            });
            //}


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

        //levelValue = $('#ddl3').val();
        //myData = "{'employeeId':'" + levelValue + "' }";

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
        //levelValue = $('#ddl4').val();
        //myData = "{'employeeId':'" + levelValue + "' }";

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
        //levelValue = $('#ddl4').val();
        //myData = "{'employeeId':'" + levelValue + "' }";

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
        //levelValue = $('#ddl4').val();
        //myData = "{'employeeId':'" + levelValue + "' }";

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
        //$('#ddl3').val(-1)
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
            //farazlabel
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

    $('#btnsubmitbrickdata1').hide();
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
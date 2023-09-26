
var EmployeeId = 0;
var CurrentUserRole = "";
$(document).ready(function () {
    GetCurrentUser();
    FillDistributorFilter();
    //GetPharmacyBrickCorrectionData(EmployeeId);

    //if (CurrentUserRole == "rl6") {
    //    $('#showlistybtn').show();
    //    $('#ApproveAll').hide();
    //    $('#btnApproveAll').hide();
    //} else {
    //    $('#showlistybtn').hide();
    //}


    $('#ddlDistributor').change(OnChangeddlDist);

    //   $('#btnAddListNo').click(btnAddListNoClicked);
    // $('#btnAddListOk').click(btnAddListOkClicked);

    //$('#ddlAllDist').change(OnChangeddlDist);
    //$('#btnAlignBrick').click(btnAlignBrickClicked);
    //$('#btnAlignCancel').click(btnAlignCancelClicked);
    //$('#btnAddBrick').click(btnAddBrickClicked);

    //$("#btnclosedrmaster").click(function () {
    //    FillBrickGrid(EmployeeId);
    //});

    //$("#btnAddNewBrick").click(function () {
    //    $("#divNewBrick").modal('show');
    //});

    //$('.selectauto').select2();
    //$('.selectauto').select2({
    //    dropdownParent: $("#divBrickMapping"),
    //    width: '250px'

    //});
    $('#ddlDistributor').select2();
    $('#ddlBrick').select2();

    $("#btnGenerate").click(function () {
        GetPharmacyBrickCorrectionData(EmployeeId)
    });
   
})

function OnChangeIsApproved() {
    GetPharmacyBrickCorrectionData(EmployeeId);
}




function GetPharmacyBrickCorrectionData(EmployeeId) {
    debugger;
    //var month = $('#txtMonth').val();
    //var distid = $('#ddlDistributor').val();
    //var isMap = $('#chkActive').prop('checked') ? '1' : '0';

    //if (distid == '-1') {
    //    distid = 0;
    //}
    var distid = $('#ddlDistributor').val();
    var brickid = $('#ddlBrick').val();
    var isApproved = $('#chkActive').prop('checked') ? '1' : '0';

    if (distid == '-1') {
        distid = '0';
    }
    if (brickid == '' || brickid == '-1') {
        brickid = '0';
    }

    if (EmployeeId != '-1') {
        var mydata = "{'distid':'" + distid + "','brickid':'" + brickid + "','isApproved':'" + isApproved + "'}";

            $.ajax({
                type: "POST",
                url: "BrickCorrectionService.asmx/GetBrickData",
                contentType: "application/json; charset=utf-8",
                data: mydata,
                success:  function (data) {
                    if (data.d != "No") {
                        jsonObj = $.parseJSON(data.d);
                        var tablestring = "<table id='datatables' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'  > <thead>" +
                              "<tr style='background-color: #217ebd;color: white;'>" +
                              "<th style = ''><input type='checkbox' id='MainCheckBox' onclick='checkAll()' > </th>" +
                              "<th > Pharmacy </th>" +
                              "<th > Old Brick ID  </th>" +
                              "<th > Brick </th>" +
                     
                             

                               "<th > New Brick ID  </th>" +
                  
                              "<th > Excel Brick  </th>" +
                              "<th > Action  </th></thead> <tbody>";
                        //RegionID	RegionName	SubRegionID	SubRegionName	DistrictID	DistrictName	CityID	City	DistributorID	DistributorCode	DistributorName	brickID	BrickCode	BrickName	PharmacyID	PharmacyCode	PharmacyName	IsActive
                        for (var i = 0; i < jsonObj.length ; i++) {
                            tablestring += "<tr>";
                            if (jsonObj[i].IsApproved == "True") {
                                tablestring += "<td align='center'></td>";
                            }
                            else {
                                tablestring += "<td align='center' ><input name='Check' class='Check' type='checkbox'value = \""
                       + jsonObj[i].ID + "\" /></td>";
                            }
                            //value = '" + jsonObj[i].ID + "'
                            tablestring += "<td >" + jsonObj[i].PharmacyCode + "-" + jsonObj[i].PharmacyName + "</td>";
                            tablestring += "<td >" + jsonObj[i].OldBrickID + " </td>";

                            tablestring += "<td >" + jsonObj[i].BrickCode + "-" + jsonObj[i].BrickName + "</td>";
                            tablestring += "<td >" + jsonObj[i].NewBrickID + " </td>";
                            tablestring += "<td >" + jsonObj[i].ExcelBrickCode + "-" + jsonObj[i].ExcelBrickName + " </td>";
                            if (jsonObj[i].IsApproved == "True") {
                                // tablestring += "<td >" + " <a href='#'  onClick=\"updateClientBrick('" + jsonObj[i].ID + "');\">Move to Excel Brick</a> " + "</td>";
                                tablestring += "<td >" + " <a href='#' >Approved</a> " + "</td>";
                            }
                            else {
                                tablestring += "<td >" + " <a href='#'  onClick=\"updateClientBrick('" + jsonObj[i].ID + "');\">Move to Excel Brick</a> " + "</td>";
                            }
                            tablestring += "</tr>";
                        }
                        tablestring += "</tbody></table>";

                        $("#divBrickGrid").empty();
                        $("#divBrickGrid").append(tablestring);

                        $('#datatables').DataTable({
                            columnDefs: [ { orderable: false, targets: [0] } ]
                        });

                       
                        $('#ApproveAll').show();

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
                        $('#ApproveAll').hide();
                        $("#divBrickGrid").empty();
                    }

                },
            cache: false,
            aynsc: true
        });
        }

        if (CurrentUserRole == 'rl6') {

        }
    else {
        $("#griddiv").empty();
        $("#griddiv").append("<table id='grid-basic' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
        $("#grid-basic").append("<thead  style='background: darkgray;'>" +
                        "<tr >" +
                        "<th data-column-id='Delete' ></th>" +

                                "<th data-column-id='DistributorName' > Distributor Name </th> " +
                                    "<th data-column-id='BrickCode' >Brick Code</th> " +
                                    "<th data-column-id='BrickName' >Brick Name</th> " +
                                    "<th data-column-id='SysBrickCode'  >System Brick Code</th> " +
                                    "<th data-column-id='SystemBrick' >System Brick </th> " +

                            "</tr>" +
                          "</thead>" +
                      "<tbody id='values' >");
        $("#grid-basic").DataTable({
            columnDefs: [{ orderable: false, "targets": -1 }]
        });
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
        cache: false,
        async: false
    });
}
function onSuccessGetCurrentUser(data, status) {

    if (data.d != "") {

        EmployeeId = data.d;
    }
}

function onError(request, status, error) {

    toastr.info('Error', 'Alert', {
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
    //msg = 'Error occoured';

    //$.fn.jQueryMsg({
    //    msg: msg,
    //    msgClass: 'error',
    //    fx: 'slide',
    //    speed: 500
    //});

    //$('#imgLoading').hide();
}

function updateClientBrick(ID)
{
    debugger
    var mydata = "{'ID':'" + ID + "'}";
        $.ajax({
            type: "POST",
            url: "BrickCorrectionService.asmx/updateClientBrick",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //beforeSend: function () {
            //    $('#ddlAllBrick').find('option').remove().end().append('<option value="">Please Wait...</option>').val("");
            //},
            success: onSucessUpdateCLient,
            error: onError,
            cache: false
        });
   

};

function onSucessUpdateCLient(data, status) {
    if (data.d != null) {
        GetPharmacyBrickCorrectionData(EmployeeId);
     
    }
    else {

    }
}

function checkAll() {

    if ($('#MainCheckBox').is(':checked')) {
        $('.Check').prop('checked', true);
    } else {
        $('.Check').prop('checked', false);
    }
}


function ApproveAll() {
    var checkID = [];
    var checkedboxes = [], IDs = [], BrickCodes = [], PharmacyIDs = [];
    checkedboxes = document.querySelectorAll('.Check:checked');
    //$('.Check').each(function () {
    //    checkID.push($(this).val());
    //});
    if (checkedboxes.length > 0) {
        for (var i = 0; i < checkedboxes.length; i++) {
            IDs.push(checkedboxes[i].value);
        }
    }
    else {
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
            debugger;
            var mydata = "{'ids':'" + IDs.toString() + "'}";

            $.ajax({
                type: "POST",
                url: "BrickCorrectionService.asmx/updateBulkClientBrick",
                data: mydata,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    jsonObj = $.parseJSON(data.d);
                    if (jsonObj[0].Msg == "OK") {
                        sweetAlert('success','Customer Brick has been changed successfully','success');                   
                    }
                    else {
                        sweetAlert('error', 'Customer Brick has been not changed successfully', 'error');
                    }
                    GetPharmacyBrickCorrectionData(EmployeeId);
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


function OnChangeddlDist() {

    debugger;
    var DistID = $('#ddlDistributor').val();
    if (DistID != '') {
        $.ajax({
            type: "POST",
            url: "BrickCorrectionService.asmx/GetAllBrickByDist",
            data: '{"DistId":' + DistID + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('#ddlBrick').find('option').remove().end().append('<option value="">Please Wait...</option>').val("");
            },
            success: onSuccessFillddDist,
            error: function (error) {

            },
            cache: false
        });
    }
    else {
        $('#ddlBrick').val('');
    }

}

function onSuccessFillddDist(data, status) {
    if (data.d != null) {

        var jsonObj = $.parseJSON(data.d);

        $('#ddlBrick').find('option').remove().end().append('<option value="">--Select Brick--</option>').val("");
        $.each(jsonObj, function (i, tweet) {
            $('#ddlBrick').append('<option value="' + jsonObj[i].ID + '">' + jsonObj[i].BrickName + '</option>').val("");

        });
    }
    else if (data.d === "") {
        $('#ddlBrick').find('option').remove().end().append('<option value="">--No Brick Found--</option>').val("");
    }
}

function OnChangeDistributorBrick() {

    GetClientDetail();
}


function FillDistributorFilter() {

    var mydata = "{'EmployeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "BrickCorrectionService.asmx/GetAllDistributor",//sp_getalldistributor
        data: mydata,
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d != '' && response.d != '[]') {
                var msg = $.parseJSON(response.d);
                $('#ddlDistributor').empty();
                $('#ddlDistributor').append('<option value="-1" selected="selected">Select...</option>');
                for (var i = 0; i < msg.length ; i++) {
                    //$('#ddlSpeciality').append('<option value="' + msg[i].Speciality + '">' + msg[i].Speciality + '</option>');
                    if (i < 1) {
                        $('#ddlDistributor').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');
                    } else {
                        $('#ddlDistributor').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');
                    }
                }
            }
        },
        error: onError,
        async: false,
        cache: false
    });
}
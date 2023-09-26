// Global Variables
var EmployeeId = 0, tempLevelId = 0
var CurrentUserLoginId = "", CurrentUserRole = "", myData = "", value = "", name = "", levelName = "", modeValue = "", msg = "", mode = "";
var jsonObj = null;

var ids = [];
var docIds = [];
var checkedboxes;

// Page Load Event
function pageLoad() {


    GetCurrentUser();
    FillDistributor();
    FillBrick();

    //if (CurrentUserRole == "rl6") {
    //    $('#showlistybtn').show();
    //    $('#ApproveAll').hide();
    //    $('#btnApproveAll').hide();
    //} else {
    //    $('#showlistybtn').hide();
    //}




    //   $('#btnAddListNo').click(btnAddListNoClicked);
    // $('#btnAddListOk').click(btnAddListOkClicked);

    $('#ddlAllDist').change(OnChangeddlDist);
    $('#btnAlignBrick').click(btnAlignBrickClicked);
    $('#btnAlignCancel').click(btnAlignCancelClicked);
    $('#btnAddBrick').click(btnAddBrickClicked);
    

    $("#btnclosedrmaster").click(function () {
        FillBrickGrid(EmployeeId);
    });

    $("#btnAddNewBrick").click(function () {
        $("#divNewBrick").modal('show');
    });

   $('.selectauto').select2();
    $('.selectauto').select2({
        dropdownParent: $("#divBrickMapping"),
        width: '250px' 

    });

}

function startingAjax() {

    // $('#UpdateProgress1').show();
}

function ajaxCompleted() {

    // $('#UpdateProgress1').hide();
}
function OnChangeIsMap() {

    FillBrickGrid(EmployeeId);
}

function FillBrickGrid(empid) {

    var month = $('#txtMonth').val();
    var distid = $('#ddlDistributor').val();
    var isMap = $('#chkActive').prop('checked') ? '1' : '0';

    if (distid == '-1') {
        distid = 0;
    }

    if (empid != '-1') {
        var mydata = "{'empid':'" + empid + "','mdate':'" + month + "','distid':'" + distid + "','isMap':'" + isMap + "'}";
        if (CurrentUserRole == 'admin') {

            $.ajax({
                type: "POST",
                url: "BrickAlignService.asmx/GetDistributorBrickData",
                data: mydata,
                contentType: "application/json; charset=utf-8",
                success: Onsuccessfillgrid,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                error: onError,
                async: true,
                cache: false
            });
        }

        if (CurrentUserRole == 'rl6') {

        }
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

function Onsuccessfillgrid(response) {

    //fildata(response.d);

    if (response.d != '' ) {

        var jsonObj = $.parseJSON(response.d);// ID,BrickCode,	BrickName,
        var tablestring = "<table id='datatables' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +// class='column-options' 
                       "<tr style='background-color: #217ebd;color: white;' >" +
                               "<th data-column-id='Distributor Name' > Distributor Name </th> " +
                                    "<th data-column-id='Brick Code' >Brick Code</th> " +
                                    "<th data-column-id='Brick Name' >Brick Name</th> " +
                                    "<th data-column-id='System Brick Code'  >System Brick Code</th> " +
                                    "<th data-column-id='System Brick ' >System Brick </th> " +
                                   "<th data-column-id='Brick Map' > Brick Map </th> " +
             "</tr></thead>" +
            "<tbody id='values'>";

        $("#divBrickGrid").empty();
        $("#divBrickGrid").append(tablestring);

        debugger;
        for (var i = 0; i < jsonObj.length ; i++) {
            $('#values').append($('<tr>' +
                      "<td>" + jsonObj[i].DistributorName + "</td>" +
                      "<td>" + jsonObj[i].BrickCode + "</td>" +
                      "<td>" + jsonObj[i].BrickName + "</td>" +
                      "<td>" + jsonObj[i].SysBrickCode + "</td>" +
                      "<td>" + jsonObj[i].SystemBrick + "</td>" +

                       "<td><a onClick=\"MapBrick('" + jsonObj[i].SalesDistID + "','" + jsonObj[i].BrickCode + "','" + jsonObj[i].pk_BrickMapId + "');\" href='javascript:;' style='vertical-align: text-top;' >Map</a></td>" +

           "</tr>"));
        }

        $("#divBrickGrid").append('</tbody></table>');
        $('#datatables').DataTable();
    }
    else {
        var tablestring = "<table id='datatables' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +// class='column-options' 
                      "<tr style='background-color: #217ebd;color: white;' >" +
                              "<th data-column-id='Distributor Name' > Distributor Name </th> " +
                                   "<th data-column-id='Brick Code' >Brick Code</th> " +
                                   "<th data-column-id='Brick Name' >Brick Name</th> " +
                                   "<th data-column-id='System Brick Code'  >System Brick Code</th> " +
                                   "<th data-column-id='System Brick ' >System Brick </th> " +
                                  "<th data-column-id='Brick Map' > Brick Map </th> " +
            "</tr></thead>" +
           "<tbody id='values'>";

        $("#divBrickGrid").empty();
        $("#divBrickGrid").append(tablestring);
        $('#datatables').DataTable();
        //  $("<div title='Alert'>Not Found.</div>").dialog();
        AlertMsg('Data Not Found.');
    }
}

function fildata(data) {

    $("#griddiv").empty();
    $("#griddiv").append("<table id='grid-basic' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
    $("#grid-basic").empty();
    $("#grid-basic").append("<thead style='background: darkgray;'>" +
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

    if (data != "") {

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

        if (CurrentUserRole == 'Admin' || CurrentUserRole == 'admin') {

            $("#griddiv").empty();
            $("#griddiv").append("<table id='grid-basic' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
            $("#grid-basic").empty();
            $("#grid-basic").append("<thead style='background: darkgray;'>" +
                                "<tr >" +


                           //     DistributorName	BrickCode	BrickName	SysBrickCode	SystemBrick
                                  //  "<th data-column-id='DocCode' >Doctor Code</th>" +
                                    "<th data-column-id='Distributor Name' > Distributor Name </th> " +
                                    "<th data-column-id='Brick Code' >Brick Code</th> " +
                                    "<th data-column-id='Brick Name' >Brick Name</th> " +
                                    "<th data-column-id='System Brick Code'  >System Brick Code</th> " +
                                    "<th data-column-id='System Brick ' >System Brick </th> " +
                            
                                   "<th data-column-id='Brick Map' > Brick Map </th> " +
                                

                                "</tr>" +
                              "</thead>" +
                              "<tbody id='values' >");
            var val = '';
            if (msg.length > 0) {
      
                for (var i = 0; i < msg.length ; i++) {
                    val = "<tr>" +
                     
                     "<td>" + msg[i].DistributorName + "</td>" +
                      "<td>" + msg[i].BrickCode + "</td>" +
                      "<td>" + msg[i].BrickName + "</td>" +
                      "<td>" + msg[i].SysBrickCode + "</td>" +
                      "<td>" + msg[i].SystemBrick + "</td>" +
                  
                       "<td><a onClick=\"MapBrick('" + msg[i].SalesDistID + "','" + msg[i].BrickCode + "');\" href='javascript:;' style='vertical-align: text-top;' >Map</a></td>" +
                      "</tr></tbody>"
                    $('#values').append(val);
                }
            }

            $("#grid-basic").DataTable({
                columnDefs: [{ orderable: false, "targets": -1 }]
            });
        }
        else {
            $("#griddiv").empty();
            $("#griddiv").append("<table id='grid-basic' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
            $("#grid-basic").empty();
            $("#grid-basic").append("<thead style='background: darkgray;'>" +
                                "<tr>" +
                                   // "<th> <th data-column-id='DocCode' >Doctor Code</th>" +
                                   "<th data-column-id='Distributor Name' > Distributor Name </th> " +
                                    "<th data-column-id='Brick Code' >Brick Code</th> " +
                                    "<th data-column-id='Brick Name' >Brick Name</th> " +
                                    "<th data-column-id='System Brick Code'  >System Brick Code</th> " +
                                    "<th data-column-id='System Brick ' >System Brick </th> " +

                                "</tr>" +
                              "</thead>" +
                              "<tbody id='values'>");
            var val = '';
            for (var i = 0; i < msg.length ; i++) {
                val = "<tr>" +


                    //SalesDistID	DistributorName	BrickCode	BrickName	SysBrickCode	SystemBrick
                    "<td>" + msg[i].DistributorName + "</td>" +
                  "<td>" + msg[i].BrickCode + "</td>" +
                  "<td>" + msg[i].BrickName + "</td>" +
                  "<td>" + msg[i].SysBrickCode + "</td>" +
                  "<td>" + msg[i].SystemBrick + "</td>" +
                //  "<td>" + msg[i].SalesDistID + "</td>" +

                $('#values').append(val);
            }
            $("#grid-basic").DataTable({
                columnDefs: [{ orderable: false, "targets": -1 }]
            });
        }
    }
    else {

        $("#griddiv").empty();
        $("#griddiv").append("<table id='grid-basic' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
        $("#grid-basic").append("<thead style='background: darkgray;'>" +
                        "<tr >" +
                        "<th data-column-id='Delete' ></th>" +
                                   "<th data-column-id='Distributor Name' > Distributor Name </th> " +
                                    "<th data-column-id='Brick Code' >Brick Code</th> " +
                                    "<th data-column-id='Brick Name' >Brick Name</th> " +
                                    "<th data-column-id='System Brick Code'  >System Brick Code</th> " +
                                    "<th data-column-id='System Brick ' >System Brick </th> " +


                        "</tr>" +
                      "</thead>" +
                      "<tbody id='values' >");
        $("#grid-basic").DataTable({
            columnDefs: [{ orderable: false, "targets": -1 }]
        });
    }
}

function OnChangeddlp6() {

    FillBrickGrid(EmployeeId);
}



function OnChangeddlDist() {

    debugger;
    var DistID = $('#ddlAllDist').val();
    if (DistID != '') {
        $.ajax({
            type: "POST",
            url: "BrickAlignService.asmx/GetAllBrickByDist",
            data: '{"DistId":' + DistID + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('#ddlAllBrick').find('option').remove().end().append('<option value="">Please Wait...</option>').val("");
            },
            success: onSuccessFillddDist,
            error: function (error) {

            },
            cache: false
        });
    }
    else {
        $('#ddlAllBrick').val('');
    }

}




function onSuccessFillddDist(data, status) {
    if (data.d != null) {

        var jsonObj = jsonParse(data.d);

        $('#ddlAllBrick').find('option').remove().end().append('<option value="">--Select Brick--</option>').val("");
        $.each(jsonObj, function (i, tweet) {
            $('#ddlAllBrick').append('<option value="' + jsonObj[i].ID + '">' + jsonObj[i].BrickName + '</option>').val("-1");
            
        });
    }
    else if (data.d === "") {
        $('#ddlAllBrick').find('option').remove().end().append('<option value="">--No Brick Found--</option>').val("");
    }
}


function MapBrick(distId, BrickCode, pk_BrickMapId) {
    debugger;
    $('.selectauto').select2();
    $('.selectauto').select2({
        dropdownParent: $("#divBrickMapping"),
        width: '250px'

    });
    $("#divBrickMapping").modal('show');
    $("#divBrickMapping").css("z-index", 999999);
    $('#divBrickMapping').find('#btnAlignBrick').attr({ '_distid': distId, '_Brickcode': BrickCode, '_pk_BrickMapId': pk_BrickMapId });

  

};

function oGrid_AddToList(docid, va) {
    // debugger;
    $("#frequency").numeric(false, function () { alert("Integers only"); this.value = ""; this.focus(); });

 
    $("#divBrickMapping").modal('show');
    $("#divBrickMapping").css("z-index", 999999);
  
    $('#divBrickMapping').find('#btnAlignBrick').attr({ '_docid': docid, '_val': va });

}

function btnAlignBrickClicked() {
    debugger;

    var thisbtn = $(this);
    var distid = $(this).attr('_distid');
    var pcode = $(this).attr('_Brickcode');
    var pkid = $(this).attr('_pk_BrickMapId');

    var pid = $('#ddlAllBrick').val();

    if (pid != '-1') {


        var mydata = "{'DistId':'" + distid + "','Brickcode':'" + pcode + "','systemBrickid':'" + pid + "','pkid':'" + pkid + "'}";

        $.ajax({
            type: "POST",
            url: "BrickAlignService.asmx/UpdateAlignBrick",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                $(thisbtn).parents('.divTable').find('.requireError').hide();
                $(thisbtn).attr('_distid', '');
                $('#ddlAllBrick').val('-1')

                if (data.d == "Already Exist!") {
                    $("#divBrickMapping").modal('hide');
                    swal("warning", "already exists", "warning")

                }
                else {
                    $('#ddlAllBrick').select2('val', [null]);
                    
                    $("#divBrickMapping").modal('hide');
                    swal("success!", "Brick Mapped !", "success")
                    FillBrickGrid(EmployeeId);
                }

            },
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: false,
            cache: false
        });
    }
    else {

        alert('Select Brick!');
        return false;
        // swal("warning", "Select Brick", "warning")
    }


}



function btnAddBrickClicked() {
    debugger;

    var thisbtn = $(this);
   // var distid = $(this).attr('_distid');
 //   var pcode = $(this).attr('_Brickcode');

    var distid = $('#ddlDist').val();
    var pcode = $('#txtBrick').val();

    if (distid != '-1') {


        var mydata = "{'DistId':'" + distid + "','Brick':'" + pcode + "'}";

        $.ajax({
            type: "POST",
            url: "BrickAlignService.asmx/AddNewBrick",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {

              
                $('#ddlDist').val('-1')

                if (data.d == "Already Exist!") {
                    $("#divNewBrick").modal('hide');
                    swal("warning", "already exists", "warning")

                }
                else {
                
                    $("#divNewBrick").modal('hide');
                    swal("success!", "Brick Added !", "success")
                  
                }

            },
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,
            async: false,
            cache: false
        });
    }
    else {

        alert('Select Brick!');
        return false;
     
    }


}


function btnAlignCancelClicked() {
    $(this).parents('.divTable').find('.requireError').hide();
    $(this).attr('_docid', '');
    $(this).parents('.divTable').find('#ddlAllBrick').val('-1');
    $(this).parents('.divTable').find('#distBrick').val('');
    $("#divBrickMapping").modal('hide');
}



// OnPage Load Multiple Selection DropdownList


function FillDistributor() {

    var mydata = "{'EmployeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "BrickAlignService.asmx/GetAllDistributor",//sp_getalldistributor
        data: mydata,
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d != '' && response.d != '[]') {
                var msg = $.parseJSON(response.d);
                $('#ddlDistributor').empty();
                $('#ddlDistributor').append('<option value="-1" selected="selected">Select...</option>');
                for (var i = 0; i < msg.length ; i++) {
                  if (i < 1) {
                        $('#ddlDistributor').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');
                        $('#ddlAllDist').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');
                        $('#ddlDist').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');
                        
                        
                    } else {
                        $('#ddlDistributor').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');
                        $('#ddlAllDist').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');
                        $('#ddlDist').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');

                    }
                }
            }
        },
        error: onError,
        async: false,
        cache: false
    });
}
function FillBrick() {

    var mydata = "{'EmployeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "BrickAlignService.asmx/GetAllBrick",//sp_getalldistributor  ddlAllBrick
        data: mydata,
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d != '' && response.d != '[]') {
                var msg = $.parseJSON(response.d);
                $('#ddlAllBrick').empty();
                $('#ddlAllBrick').append('<option value="-1" selected="selected">Select...</option>');
                for (var i = 0; i < msg.length ; i++) {
                    //$('#ddlSpeciality').append('<option value="' + msg[i].Speciality + '">' + msg[i].Speciality + '</option>');
                    if (i < 1) {
                        $('#ddlAllBrick').append('<option value="' + msg[i].ID + '">' + msg[i].BrickName + '</option>');
                    } else {
                        $('#ddlAllBrick').append('<option value="' + msg[i].ID + '">' + msg[i].BrickName + '</option>');
                    }
                }
            }
        },
        error: onError,
        async: false,
        cache: false
    });
}

function GetBrick() {

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetBrick",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddlBrick,
        error: onError,
        cache: false,
        async: false
    });
}
function FillddlBrick(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, tweet) {
            $("#ddlBrick").append("<option value='" + jsonObj[i].BrickId + "'>" + jsonObj[i].BrickName + "</option>");
        });
    }
}

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


// Membership Authorization
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
        cache: false,
        async: false
    });
}
function onSuccessGetCurrentUserLoginID(data, status) {

    if (data.d != "") {

        CurrentUserLoginId = data.d;
    }

    GetCurrentUserRole(EmployeeId);
}
function GetCurrentUserRole(Empid) {

    $.ajax({
        type: "POST",
        url: "../Form/CommonService.asmx/GetCurrentUserRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUserRole,
        error: onError,
        cache: false,
        async: false
    });
}
function onSuccessGetCurrentUserRole(data, status) {

    if (data.d != "") {
        //jsonObj = jsonParse(data.d);
        CurrentUserRole = data.d;


        modeValue = $('#hdnMode').val();

        if (modeValue == 'EditMode') {

            LoadForEditData();
        }
        else if (modeValue == 'DeleteMode') {

            LoadForDeleteData();
        }
    }

    if (CurrentUserRole == 'rl6' || CurrentUserRole == 'admin') {
        //  $('#EmployeeDropDown').hide();
        FillBrickGrid(EmployeeId);
    }
    else {
        $('#EmployeeDropDown').show();

    }
}


// Functions
function onSuccess(data, status) {

    var msg = '';

    if (data.d == "OK") {

        var mode = $('#hdnMode').val();

        if (mode === "AddMode") {

            msg = 'Data inserted succesfully!';
        }
        else if (mode === "EditMode") {

            msg = 'Data updated succesfully!';
        }
        else if (mode === "DeleteMode") {

            msg = 'Data deleted succesfully!';
            // $('#divConfirmation').jqmHide();
        }
        else if (mode === "V") {

            msg = 'Doctor Verified succesfully!';
        }
        else if (mode === "R") {

            msg = 'Doctor Request Rejected succesfully!';
        }

        ClearFields();
        $('#hdnMode').val("");

        window.alert(msg);
        $('#btnOk').click();
        // $('#hlabmsg').append(msg);
        // $('#Divmessage').jqmShow();
    }
    else if (data.d == "Not able to delete this record due to linkup.") {

        // $('#divConfirmation').jqmHide();
        msg = 'Not able to delete this record due to linkup.';

        //$('#hlabmsg').append(msg);

        window.alert(msg);
        $('#btnOk').click();
        // $('#Divmessage').jqmShow();
    } else if (data.d == "Already Exist!") {
        msg = 'Already Exist in Your Doctor List!';
        ClearFields();
        $('#hdnMode').val("");


        window.alert(msg);
        $('#btnOk').click();
        //$('#hlabmsg').append(msg);
        //$('#Divmessage').jqmShow();
    }
    FillBrickGrid(EmployeeId);
}
function onError(request, status, error) {

    //$('#divConfirmation').hide();
    msg = 'Error is occured';


    window.alert(msg);
    $('#btnOk').click();
    //$('#hlabmsg').append(msg);
    //$('#Divmessage').jqmShow();
}
function startingAjax() {

    $('#imgLoading').show();
}
function ajaxCompleted() {

    $('#imgLoading').hide();
}
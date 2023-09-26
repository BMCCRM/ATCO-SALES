/// <reference path="ZipUploader.asmx" />
/// <reference path="ZipSalesUploader.asmx" />
/// <reference path="SalesUpload.aspx" />
$(document).ready(function () {
    $('#dialog').hide();
    $('#dialog1').hide();
    var filename = $('#file_upload').val();
    var filena = "";


});

// Page Load Event
function pageLoad() {


    GetCurrentUser();
    FillDistributor();
    FillBrick();

    FillProductDistributor();
    FillProduct();


    $('#btnAlignProduct').click(btnAlignProductClicked);
    $('#btnAlignCancel').click(btnAlignCancelClicked);

    $("#btnclosedrmaster").click(function () {
        FillProductGrid(EmployeeId);
    });

  
    $('#ddlAllDist').change(OnChangeddlDist);
    $('#btnAlignBrick').click(btnAlignBrickClicked);
    $('#btnbrickAlignCancel').click(btnBrickAlignCancelClicked);

    $("#btnclosedrmaster").click(function () {
       // FillBrickGrid(EmployeeId);
    });

    //$('.selectauto').select2();
    //$('.selectauto').select2({
    //    dropdownParent: $("#divBrickMapping"),
    //    width: '250px' 

    //});

 
}

function myFunction() {

    var data = new FormData();

    var files = $("#file_upload5").get(0).files;



    // Add the uploaded image content to the form data collection
    if (files.length > 0) {
        //  data.append("file_upload5", files[0]);

        var files5 = $("#file_upload5").get(0).files;
        var fileName = $("#file_upload5").get(0).files[0].name;



        data.append("UploadedFile", files5[0]);
        data.append("fileName", fileName);

        $('#dialog').show();

        var fileExt =  fileName.split('.')[fileName.split('.').length - 1];

        if (fileExt == "zip") {
            $.ajax({
                type: "POST",
                url: "../SalesMod/ZipSalesUploader.asmx/ProcessRequest",
                contentType: "application/octet-stream",
                //datatype: "json",
                //processData: false,
                data: data,

                
                success: function (result,stat,xhr) {
                  
                  
                    if (result) {
                        $('#dialog').hide();
                        // window.location.reload();
                        alert('Sales Data Sucessful Upload');
                        //  AttachPath = result;
                        // $("#txtdocupload").val('');
                        //$('#dialog1').show();
                    //    ProcessDATADSR();
                    }
                },
                error: function (result, stat, xhr) {

                   
                    if (xhr=='DistNotFound') {
                        $('#dialog').hide();
                        // window.location.reload();
                        alert('Distributor Not Found in System.');
                      
                    }
                },
                async: false,
                cache: false,
                contentType: false,
                processData: false,
            });
      
        }
        else {
            $('#dialog').hide();
            alert("Please Select Zip type allowed");
            window.location.reload();
        }
    }
    else {
        return false;
    }

}


function ExcelUpload() {

    var data = new FormData();

    var files = $("#excelfile_upload").get(0).files;


    if (files.length > 0) {
       

        var files5 = $("#excelfile_upload").get(0).files;
        var fileName = $("#excelfile_upload").get(0).files[0].name;

        data.append("UploadedFile", files5[0]);
        data.append("fileName", fileName);

        $('#dialog').show();

        var fileExt = fileName.split('.')[fileName.split('.').length - 1];

        if (fileExt == "zip") {
            $.ajax({
                type: "POST",
                url: "../SalesMod/ZipSalesUploader.asmx/ProcessRequest",
                contentType: "application/octet-stream",
                data: data,


                success: function (result, stat, xhr) {


                    if (result) {
                        $('#dialog').hide();
                     
                        alert('Sales Data Sucessful Upload');
                 
                    }
                },
                error: function (result, stat, xhr) {


                    if (xhr == 'DistNotFound') {
                        $('#dialog').hide();
                       
                        alert('Distributor Not Found in System.');

                    }
                },
                async: false,
                cache: false,
                contentType: false,
                processData: false,
            });

        }
        else {
            $('#dialog').hide();
            alert("Please Select Zip type allowed");
            window.location.reload();
        }
    }
    else {
        return false;
    }

}



function ExcelUploader() {

  
    //// Get form
  
        var form = $('#fileForm')[0];

        // Create an FormData object 
        var data = new FormData(form);
    

        var formData = new FormData(); 

           var files = $("#excelfile_upload").get(0).files;
           var fileName = $("#excelfile_upload").get(0).files[0].name;
           var selectedMonthYear = $("#txtMYDate").val();


       ///get the file and append it to the FormData object
        formData.append('UploadedFile', $('#excelfile_upload')[0].files[0]);
        formData.append("fileName", fileName);
        formData.append("mydate", selectedMonthYear);
     






    // Add the uploaded image content to the form data collection
          if (files.length > 0) {
             

              data.append("UploadedFile", files[0]);
              data.append("fileName", fileName);



              $('#dialog').show();

              var fileExt = fileName.split('.')[fileName.split('.').length - 1];

              if (fileExt == "zip") {

                  $.ajax({

                      type: "POST",
                      url: 'ZipSalesUploader.ashx?Type=U' + '&emp=' + EmployeeId,
                      data: formData,
                      processData: false,
                      contentType: false,
                      success: function (data, status) {
                          $('#dialog').hide();
                          $("#excelfile_upload").val("");
                          alert('DONE');
                          location.reload();
                      },
                      error: onError,
                      beforeSend: startingAjax,
                      complete: ajaxCompleted,
                      async: false,
                      cache: false
                  });
              }
              else {
                  $('#dialog').hide();
                  alert("Please Select Zip type allowed");
                  $("#excelfile_upload").val("");
                  
              }
          }
          else {
              return false;
          }



}

function ProcessDATADSR() {

    var txttMonth = $('#txtMDate').val();

    var mydata = "{'mdate':'" + txttMonth + "'}";
    $.ajax({
        type: "POST",
        url: "../SalesMod/ZipSalesUploader.asmx/DSRtxtDataProcess",
        data: mydata,
        contentType: "application/json; charset=utf-8",
        success: onSuccessProcessDATADSR,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: onError,

    });
}

function onSuccessProcessDATADSR(data, status) {

    $('#dialog1').hide();
    if (data.d == 'DSuccess') {
        alert('Successful Data Process');

    }
    else {
        $('#dialog').hide();
        alert('Error Data Processing');
       
    }
}

function gethit(filename) {
    $('#preloader').show();
    var imageExten = filename.split(".").pop();

    if (imageExten == "zip") {
        $.ajax({
            type: 'POST',
            url: '../SalesMod/ZipUpload.svc/UploadtxtFile?Path=' + filename,
            contentType: 'application/octet-stream',
            processData: false,

            success: function (data) {
                $('#preloader').hide();
                window.location.reload();
                //    window.alert('suces'+data);

            },
            error: function (data) {
                alert('Error in getting' + data);

            },
            async: true
        });
    }
    else {
        $('#preloader').hide();
        alert("Please Select Zip type allowed");
    }
}



function ProcessTruncateDSR() {
   
    var txttMonth = $('#txttMonth').val();

    var mydata = "{'mdate':'" + txttMonth + "'}";

    if (txttMonth != '') {
        $.ajax({
            type: "POST",
            url: "../SalesMod/ZipSalesUploader.asmx/DSRtxtTruncateProcess",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: onSuccessProcessTruncateDSR,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            error: onError,

        });
    }

    else {
        alert('Date Required');
    }
                
 
}

function onSuccessProcessTruncateDSR(data, status) {

    $('#dialog1').hide();
    if (data.d == 'DSuccess') {
        alert('Successful Data Truncate Process');

    }
    else if (data.d == 'Date Required') {
        $('#dialog').hide();
        alert('Date Required');

    }
    else {
        $('#dialog').hide();
        alert('Error Data Truncate Processing');

    }
}



function FillBrickGrid(empid) {

    var month = $('#txtMonth').val();
    var distid = $('#ddlDistributor').val();


    if (distid == '-1') {
        distid = 0;
    }

    if (empid != '-1') {
        var mydata = "{'empid':'" + empid + "','mdate':'" + month + "','distid':'" + distid + "'}";
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

    fildata(response.d);
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
                //   $('#btnApproveAll').show();
                for (var i = 0; i < msg.length ; i++) {
                    val = "<tr>" +
                        //SalesDistID	DistributorName	BrickCode	BrickName	SysBrickCode	SystemBrick
                     "<td>" + msg[i].DistributorName + "</td>" +
                      "<td>" + msg[i].BrickCode + "</td>" +
                      "<td>" + msg[i].BrickName + "</td>" +
                      "<td>" + msg[i].SysBrickCode + "</td>" +
                      "<td>" + msg[i].SystemBrick + "</td>" +

                       "<td><a onClick=\"MapBrick('" + msg[i].SalesDistID + "','" + msg[i].BrickCode + "');\" href='javascript:;' style='vertical-align: text-top;' >Map</a></td>" +
                       //<input type='checkbox' name='checkboxes' class='approveCheckBox' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-docid='" + msg[i].SalesDistID + "' value='" + msg[i].SalesDistID + "'>
                     //   "<td><a onClick=\"oGrid_Rejected('" + msg[i].SalesDistID + "');\" href='#' >Reject</a></td>" +
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

    //FillBrickGrid(EmployeeId);
}



function OnChangeddlDist() {

    var DistID = $('#ddlDist').val();
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
                alert(error);
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
        $('#ddlAllBrick').find('option').remove().end().append('<option value="">--Select Product--</option>').val("");
        $.each(jsonObj, function (i, tweet) {
            $('#ddlAllBrick').append('<option value="' + jsonObj[i].ProductId + '">' + jsonObj[i].ProductName + '</option>').val("-1");
            if (productid != -2) {
                $('#ddlAllBrick').val(productid);
            }
        });
    }
    else if (data.d === "") {
        $('#ddlAllBrick').find('option').remove().end().append('<option value="">--No Brick Found--</option>').val("");
    }
}


function MapBrick(distId, BrickCode) {

    $("#divBrickMapping").modal('show');
    $("#divBrickMapping").css("z-index", 999999);
    $('#divBrickMapping').find('#btnAlignBrick').attr({ '_distid': distId, '_Brickcode': BrickCode });

};

function oGrid_AddToList(docid, va) {
    // debugger;
    $("#frequency").numeric(false, function () { alert("Integers only"); this.value = ""; this.focus(); });

    //  $old('#divClassIdAndFrequency').jqmShow();
    //  $('#divClassIdAndFrequency').show();
    $("#divBrickMapping").modal('show');
    $("#divBrickMapping").css("z-index", 999999);
    //$old('#divAddtoListConfirmation').jqmShow();
    $('#divBrickMapping').find('#btnAlignBrick').attr({ '_docid': docid, '_val': va });

}

function btnAlignBrickClicked() {
    debugger;

    var thisbtn = $(this);
    var distid = $(this).attr('_distid');
    var pcode = $(this).attr('_Brickcode');

    var pid = $('#ddlAllBrick').val();

    if (pid != '-1') {


        var mydata = "{'DistId':'" + distid + "','Brickcode':'" + pcode + "','systemBrickid':'" + pid + "'}";

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
                    //FillBrickGrid(EmployeeId);
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


function btnBrickAlignCancelClicked() {
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

                    } else {
                        $('#ddlDistributor').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');
                        $('#ddlAllDist').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');
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
        //FillBrickGrid(EmployeeId);
    }
    else {
        $('#EmployeeDropDown').show();

    }
}



function FillProductGrid(empid) {

    var month = $('#txtMonth').val();
    var distid = $('#ddlDistributor').val();


    if (distid == '-1') {
        distid = 0;
    }

    if (empid != '-1') {
        var mydata = "{'empid':'" + empid + "','mdate':'" + month + "','distid':'" + distid + "'}";
        if (CurrentUserRole == 'admin') {

            $.ajax({
                type: "POST",
                url: "ProductAlignmentService.asmx/GetDistributorProductData",
                data: mydata,
                contentType: "application/json; charset=utf-8",
                success: Onsuccessfillproductgrid,
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
        $("#prodgriddiv").empty();
        $("#prodgriddiv").append("<table id='prodgrid-basic' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
        $("#prodgrid-basic").append("<thead  style='background: darkgray;'>" +
                        "<tr >" +
                        "<th data-column-id='Delete' ></th>" +

                                "<th data-column-id='DistributorName' > Distributor Name </th> " +
                                    "<th data-column-id='ProductCode' >Product Code</th> " +
                                    "<th data-column-id='ProductName' >Product Name</th> " +
                                    "<th data-column-id='SysProductCode'  >System Product Code</th> " +
                                    "<th data-column-id='SystemProduct' >System Product</th> " +

                            "</tr>" +
                          "</thead>" +
                      "<tbody id='values' >");
        $("#prdgrid-basic").DataTable({
            columnDefs: [{ orderable: false, "targets": -1 }]
        });
    }
}

function Onsuccessfillproductgrid(response) {

    filproductdata(response.d);
}

function filproductdata(data) {

    $("#prodgriddiv").empty();
    $("#prodgriddiv").append("<table id='prodgrid-basic' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
    $("#prodgrid-basic").empty();
    $("#prodgrid-basic").append("<thead style='background: darkgray;'>" +
                        "<tr >" +
                        "<th data-column-id='Delete' ></th>" +
                             "<th data-column-id='DistributorName' > Distributor Name </th> " +
                                    "<th data-column-id='ProductCode' >Product Code</th> " +
                                    "<th data-column-id='ProductName' >Product Name</th> " +
                                    "<th data-column-id='SysProductCode'  >System Product Code</th> " +
                                    "<th data-column-id='SystemProduct' >System Product</th> " +


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

            $("#prodgriddiv").empty();
            $("#prodgriddiv").append("<table id='prodgrid-basic' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
            $("#prodgrid-basic").empty();
            $("#prodgrid-basic").append("<thead style='background: darkgray;'>" +
                                "<tr >" +


                           //     DistributorName	ProductCode	ProductName	SysProductCode	SystemProduct
                                  //  "<th data-column-id='DocCode' >Doctor Code</th>" +
                                    "<th data-column-id='Distributor Name' > Distributor Name </th> " +
                                    "<th data-column-id='Product Code' >Product Code</th> " +
                                    "<th data-column-id='Product Name' >Product Name</th> " +
                                    "<th data-column-id='System Product Code'  >System Product Code</th> " +
                                    "<th data-column-id='System Product' >System Product</th> " +
                                   // "<th data-column-id='Addres1' >Address</th> " +
                                  //  "<th data-column-id='Qualification' >Qualification</th> " +
                                  //  "<th data-column-id='Speciality' > Speciality</th> " +
                                   "<th data-column-id='Product Map' > Product Map </th> " +
                                   //<input style='vertical-align: middle;margin-top: 0px;' type='checkbox' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' name='ApproveAll' onClick=\"SelectAllApproveCheckBoxes();\">
                                  // "<th data-column-id='Reject' >Reject</th>" +
                                 //"<th data-column-id='VerifiedByFlm' >Verified by AM</th>" +
                                  //"<th data-column-id='VerifiedByRSM' >Verified by SM</th>" +
                                  //"<th data-column-id='VerifiedByNSM' >Verified by RTL</th>" +
                                  //"<th data-column-id='AprovedByAdmin' >Aproved by Admin</th>" +
                                  //"<th data-column-id='Edit'></th>" +
                                  //"<th data-column-id='Delete'></th>" +

                                "</tr>" +
                              "</thead>" +
                              "<tbody id='values' >");
            var val = '';
            if (msg.length > 0) {
                //   $('#btnApproveAll').show();
                for (var i = 0; i < msg.length ; i++) {
                    val = "<tr>" +
                        //SalesDistID	DistributorName	ProductCode	ProductName	SysProductCode	SystemProduct
                     "<td>" + msg[i].DistributorName + "</td>" +
                      "<td>" + msg[i].ProductCode + "</td>" +
                      "<td>" + msg[i].ProductName + "</td>" +
                      "<td>" + msg[i].SysProductCode + "</td>" +
                      "<td>" + msg[i].SystemProduct + "</td>" +
                      //((msg[i].DoctorBrick.includes("@br")) ? ("<td>" + msg[i].DoctorBrick.split("@br").join('<br/><br/>') + "</td>") : "<td>" + msg[i].DoctorBrick + "</td>") +
                      //"<td>" + msg[i].SalesDistID + "</td>" +
                      //"<td>" + msg[i].SalesDistID + "</td>" +
                      // "<td>" + msg[i].SalesDistID + "</td>" +
                      // "<td>" + msg[i].SalesDistID + "</td>" +
                       "<td><a onClick=\"MapProduct('" + msg[i].SalesDistID + "','" + msg[i].ProductCode + "');\" href='javascript:;' style='vertical-align: text-top;' >Map</a></td>" +
                       //<input type='checkbox' name='checkboxes' class='approveCheckBox' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' data-docid='" + msg[i].SalesDistID + "' value='" + msg[i].SalesDistID + "'>
                     //   "<td><a onClick=\"oGrid_Rejected('" + msg[i].SalesDistID + "');\" href='#' >Reject</a></td>" +
                       "</tr></tbody>"
                    $('#values').append(val);
                }
            }

            $("#prodgrid-basic").DataTable({
                columnDefs: [{ orderable: false, "targets": -1 }]
            });
        }
        else {
            $("#prodgriddiv").empty();
            $("#prodgriddiv").append("<table id='prodgrid-basic' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
            $("#prodgrid-basic").empty();
            $("#prodgrid-basic").append("<thead style='background: darkgray;'>" +
                                "<tr>" +
                                   // "<th> <th data-column-id='DocCode' >Doctor Code</th>" +
                                   "<th data-column-id='Distributor Name' > Distributor Name </th> " +
                                    "<th data-column-id='Product Code' >Product Code</th> " +
                                    "<th data-column-id='Product Name' >Product Name</th> " +
                                    "<th data-column-id='System Product Code'  >System Product Code</th> " +
                                    "<th data-column-id='System Product' >System Product</th> " +

                                "</tr>" +
                              "</thead>" +
                              "<tbody id='values'>");
            var val = '';
            for (var i = 0; i < msg.length ; i++) {
                val = "<tr>" +


                    //SalesDistID	DistributorName	ProductCode	ProductName	SysProductCode	SystemProduct
                    "<td>" + msg[i].DistributorName + "</td>" +
                  "<td>" + msg[i].ProductCode + "</td>" +
                  "<td>" + msg[i].ProductName + "</td>" +
                  "<td>" + msg[i].SysProductCode + "</td>" +
                  "<td>" + msg[i].SystemProduct + "</td>" +
                //  "<td>" + msg[i].SalesDistID + "</td>" +

                $('#values').append(val);
            }
            $("#prodgrid-basic").DataTable({
                columnDefs: [{ orderable: false, "targets": -1 }]
            });
        }
    }
    else {

        $("#prodgriddiv").empty();
        $("#prodgriddiv").append("<table id='prodgrid-basic' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
        $("#prodgrid-basic").append("<thead style='background: darkgray;'>" +
                        "<tr >" +
                        "<th data-column-id='Delete' ></th>" +
                                   "<th data-column-id='Distributor Name' > Distributor Name </th> " +
                                    "<th data-column-id='Product Code' >Product Code</th> " +
                                    "<th data-column-id='Product Name' >Product Name</th> " +
                                    "<th data-column-id='System Product Code'  >System Product Code</th> " +
                                    "<th data-column-id='System Product' >System Product</th> " +


                        "</tr>" +
                      "</thead>" +
                      "<tbody id='values' >");
        $("#prodgrid-basic").DataTable({
            columnDefs: [{ orderable: false, "targets": -1 }]
        });
    }
}

function OnChangeddlforProduct() {

    FillProductGrid(EmployeeId);
}


function MapProduct(distId, ProductCode) {

    $("#divProductMapping").modal('show');
    $("#divProductMapping").css("z-index", 999999);
    $('#divProductMapping').find('#btnAlignProduct').attr({ '_distid': distId, '_productcode': ProductCode });

};

function oGrid_AddToList(docid, va) {
    // debugger;
    $("#frequency").numeric(false, function () { alert("Integers only"); this.value = ""; this.focus(); });

    //  $old('#divClassIdAndFrequency').jqmShow();
    //  $('#divClassIdAndFrequency').show();
    $("#divProductMapping").modal('show');
    $("#divProductMapping").css("z-index", 999999);
    //$old('#divAddtoListConfirmation').jqmShow();
    $('#divProductMapping').find('#btnAlignProduct').attr({ '_docid': docid, '_val': va });

}

function btnAlignProductClicked() {
    debugger;

    var thisbtn = $(this);
    var distid = $(this).attr('_distid');
    var pcode = $(this).attr('_productcode');

    var pid = $('#ddlAllProduct').val();

    if (pid != '-1') {


        var mydata = "{'DistId':'" + distid + "','productcode':'" + pcode + "','systemProductid':'" + pid + "'}";

        $.ajax({
            type: "POST",
            url: "ProductAlignmentService.asmx/UpdateAlignProduct",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                $(thisbtn).parents('.divTable').find('.requireError').hide();
                $(thisbtn).attr('_distid', '');
                $('#ddlAllProduct').val('-1')

                if (data.d == "Already Exist!") {
                    $("#divProductMapping").modal('hide');
                    swal("warning", "already exists", "warning")

                }
                else {
                    //  $('#ddlAllClass').val(-1);
                    //  $('#frequency').val('');
                    //   $('#val' + cellval).hide();
                    //   $('.replaceme' + cellval).html('Pending');
                    $("#divProductMapping").modal('hide');
                    swal("success!", "Product Mapped !", "success")
                    FillProductGrid(EmployeeId);
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

        alert('Select Product!');
        return false;
        // swal("warning", "Select Product", "warning")
    }


}


function btnAlignCancelClicked() {
    $(this).parents('.divTable').find('.requireError').hide();
    $(this).attr('_docid', '');
    $(this).parents('.divTable').find('#ddlAllProduct').val('-1');
    $(this).parents('.divTable').find('#distProduct').val('');
    $("#divProductMapping").modal('hide');
}



// OnPage Load Multiple Selection DropdownList


function FillProductDistributor() {

    var mydata = "{'EmployeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "ProductAlignmentService.asmx/GetAllDistributor",//sp_getalldistributor
        data: mydata,
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d != '' && response.d != '[]') {
                var msg = $.parseJSON(response.d);
                $('#ddlproductDistributor').empty();
                $('#ddlproductDistributor').append('<option value="-1" selected="selected">Select...</option>');
                for (var i = 0; i < msg.length ; i++) {
                    //$('#ddlSpeciality').append('<option value="' + msg[i].Speciality + '">' + msg[i].Speciality + '</option>');
                    if (i < 1) {
                        $('#ddlproductDistributor').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');
                    } else {
                        $('#ddlproductDistributor').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');
                    }
                }
            }
        },
        error: onError,
        async: false,
        cache: false
    });
}
function FillProduct() {

    var mydata = "{'EmployeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "ProductAlignmentService.asmx/GetAllProduct",//sp_getalldistributor  ddlAllProduct
        data: mydata,
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d != '' && response.d != '[]') {
                var msg = $.parseJSON(response.d);
                $('#ddlAllProduct').empty();
                $('#ddlAllProduct').append('<option value="-1" selected="selected">Select...</option>');
                for (var i = 0; i < msg.length ; i++) {
                    //$('#ddlSpeciality').append('<option value="' + msg[i].Speciality + '">' + msg[i].Speciality + '</option>');
                    if (i < 1) {
                        $('#ddlAllProduct').append('<option value="' + msg[i].ID + '">' + msg[i].ProductSku + '</option>');
                    } else {
                        $('#ddlAllProduct').append('<option value="' + msg[i].ID + '">' + msg[i].ProductSku + '</option>');
                    }
                }
            }
        },
        error: onError,
        async: false,
        cache: false
    });
}

function GetProduct() {

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetProduct",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddlProduct,
        error: onError,
        cache: false,
        async: false
    });
}
function FillddlProduct(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, tweet) {
            $("#ddlProduct").append("<option value='" + jsonObj[i].ProductId + "'>" + jsonObj[i].ProductName + "</option>");
        });
    }
}




function onError(request, status, error) {
    alert('Error is occured');
}
function startingAjax() {

}
function ajaxCompleted() {

}


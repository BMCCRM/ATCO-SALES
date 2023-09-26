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
    FillProduct();

    if (CurrentUserRole == "rl6") {
        $('#showlistybtn').show();
        $('#ApproveAll').hide();
        $('#btnApproveAll').hide();
    } else {
        $('#showlistybtn').hide();
    }

    $('#txtMonth').hide();

    $('#btnAlignProduct').click(btnAlignProductClicked);
    $('#btnRemoveAlign').click(btnRemoveAlignClicked);
    $('#btnAlignCancel').click(btnAlignCancelClicked);
    $('#btnDownloadExcel').click(btnDownloadClicked);
    // $('#btnCancel').click(btnCancelClicked);

    $("input:file").change(function () {

        debugger
        uploadFile();
        // GetDataInGrid();

    });
    $("#btnclosedrmaster").click(function () {
        FillProductGrid(EmployeeId);
    });


    $('.selectauto').select2();
    $('.selectauto').select2({
        dropdownParent: $("#divProductMapping"),
        width: '250px'

    });

  


}

function startingAjax() {

    // $('#UpdateProgress1').show();
}

function ajaxCompleted() {
    $('#containerteritory').parent().find('.dshload_back').hide();
    // $('#UpdateProgress1').hide();
}

//////////////////////Start Excel Work

function check() {
    alert("hellor0");
}

function DownloadExcel() {
    debugger
    var monthlist = $("input[name*='txtMonth']").val();
    var Distributor = $("#ddlDistributor").val();

    if (Distributor != '-1') {

        CallHandler(monthlist, Distributor);
        //"<a onClick=\"MapProduct('" + jsonObj[i].SalesDistID + "','" + jsonObj[i].ProductCode + "');\" href='javascript:;' style='vertical-align: text-top;' >Map</a>" 
    }
    else {
        divProductType(monthlist, Distributor);
    }
}

function CallHandler(monthlist, Distributor) {
    debugger
    var requestObject = {};

    requestObject['date'] = monthlist;
    // requestObject['Type'] = type;
    requestObject['Distributor'] = Distributor;
    //requestObject['CountryType'] = '';

    var mapForm = document.createElement("form");
    mapForm.target = "Map";
    mapForm.method = "POST";
    mapForm.action = "../Handler/GetExcelForProductAlignment.ashx";

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

function divProductType(monthlist, Distributor) {
    debugger
    //$("#divProductType").modal('show');
    //$("#divProductType").css("z-index", 999999);
    $('#ThDownload').find('#btnDownloadExcel').attr({ '_monthlist': monthlist, '_Distributor': Distributor });
};

function btnDownloadClicked() {
    debugger
    var thisbtn = $(this);
    var monthlist = $('#txtMonth').val();
    //var type = $(this).attr('_type');
    var Distributor = $('#ddlDistributor').val()  //$(this).attr('_Distributor');
    var isMap = $('#chkActive').prop('checked') ? '1' : '0';
    //var pid = $('#ddlProductType').val();

    //if (pid != '-1') {
    var requestObject = {};

    requestObject['date'] = monthlist;
    requestObject['Type'] = 'D';
    requestObject['Distributor'] = Distributor;
    requestObject['isMap'] = isMap;
    //    requestObject['CountryType'] = pid;

    var mapForm = document.createElement("form");
    mapForm.target = "Map";
    mapForm.method = "POST";
    mapForm.action = "../Handler/GetExcelForProductAlignment.ashx";

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

    //if (type = 'D') {
    //    window.open("../Handler/GetExcelForProductAlignment.ashx?date=" + monthlist + "&Type=" + type + "&Distributor=" + Distributor + "&CountryType=" + pid);
    //}
}
//else {
//    alert('Please Select Type');
//    return false;
//    // swal("warning", "Select Product", "warning")
//}


//function btnCancelClicked() {
//    $(this).parents('.divTable').find('.requireError').hide();
//    $(this).attr('_docid', '');
//  //  $(this).parents('.divTable').find('#ddlProductType').val('-1');
//    $("#divProductType").modal('hide');
//}

function uploadFile() {
    debugger
    var date = new Date();

    //// Get form
    var form = $('#fileForm')[0];

    // Create an FormData object 
    var data = new FormData(form);

    var formData = new FormData();

    formData.append('file', $('#sheetUploader')[0].files[0]);

    $.ajax({
        type: "POST",
        url: '../Handler/GetExcelForProductAlignment.ashx?date=' + ('-' + (date.getMonth() + 1) + '-' + (date.getFullYear())) + '&Type=U',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data, status) {


            $('#jqmloader').html("<p style=\"color: white;padding-left: 20px;\">Please Wait, Uploading Sheet</p>");
            $old('#dialog').jqm({ modal: true });
            $old('#dialog').jqm();
            $old('#dialog').jqmShow();


            $.ajax({
                url: "../Handler/GetExcelForProductAlignment.ashx?&Type=" + 'Read' + '&FileName=' + data,
                contentType: "text/plain; charset=utf-8",
                success: function (data, response) {

                    setTimeout(function () {
                        $('#dialog').jqmHide();


                    }, 1000);

                    setTimeout(function () {
                        if (data == "ERROR") {
                            alert("Sheet Upload Has Some Corrupted Data, Please Do Not Modify Any Columns Generated By Server");
                            window.location.reload();

                        }
                        else {
                            alert('File Uploaded Successfully');
                            window.location.reload();
                        }
                    }, 1500);
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
/////////////////////////////End Excel Work///////////////




function FillProductGrid(empid) {

    $('#containerteritory1').parent().find('.dshload_back').show();
    $("#loader2").addClass("loader");
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

    // filproductdata(response.d);

    if (response.d != '') {

        var jsonObj = $.parseJSON(response.d);// ID,BrickCode,	BrickName,
        var tablestring = "<table id='datatables' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +// class='column-options' 
                       "<tr style='background-color: #217ebd;color: white;' >" +
                             "<th data-column-id='Distributor Name' > Distributor Name </th> " +
                                    "<th data-column-id='Product Code' >Product Code</th> " +
                                    "<th data-column-id='Product Name' >Product Name</th> " +
                                    "<th data-column-id='System Product Code'  >System Product Code</th> " +
                                    "<th data-column-id='System Product' >System Product</th> " +
                                   "<th data-column-id='Product Map' > Product Map </th> " +
             "</tr></thead>" +
            "<tbody id='values'>";

        $("#divProductGrid").empty();
        $("#divProductGrid").append(tablestring);

       
        for (var i = 0; i < jsonObj.length ; i++) {
            $('#values').append($('<tr>' +
                   "<td>" + jsonObj[i].DistributorName + "</td>" +
                      "<td>" + jsonObj[i].ProductCode + "</td>" +
                      "<td>" + jsonObj[i].ProductName + "</td>" +
                      "<td>" + jsonObj[i].SysProductCode + "</td>" +
                      "<td>" + jsonObj[i].SystemProduct + "</td>" +

                       "<td><a onClick=\"MapProduct('" + jsonObj[i].SalesDistID + "','" + jsonObj[i].ProductCode + "','" + jsonObj[i].SysProductCode + "','" + jsonObj[i].pk_ProductMapId + "');\" href='javascript:;' style='vertical-align: text-top;' >Map</a></td>" +

           "</tr>"));
        }

        $("#divProductGrid").append('</tbody></table>');
        $('#datatables').DataTable();
        $('.dshload_back').hide();
       // $('#containerteritory').parent().find('.dshload_back').hide();
    }
    else {
        var tablestring = "<table id='datatables' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +// class='column-options' 
                        "<tr style='background-color: #217ebd;color: white;' >" +
                              "<th data-column-id='Distributor Name' > Distributor Name </th> " +
                                     "<th data-column-id='Product Code' >Product Code</th> " +
                                     "<th data-column-id='Product Name' >Product Name</th> " +
                                     "<th data-column-id='System Product Code'  >System Product Code</th> " +
                                     "<th data-column-id='System Product' >System Product</th> " +
                                    "<th data-column-id='Product Map' > Product Map </th> " +
              "</tr></thead>" +
             "<tbody id='values'>";

        $("#divProductGrid").empty();
        $("#divProductGrid").append(tablestring);
        $('#datatables').DataTable();

        AlertMsg('Data Not Found.');
        //  $("<div title='Alert'>Not Found.</div>").dialog();
        $('.dshload_back').hide();
    }
     
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

                for (var i = 0; i < msg.length ; i++) {
                    val = "<tr>" +

                     "<td>" + msg[i].DistributorName + "</td>" +
                      "<td>" + msg[i].ProductCode + "</td>" +
                      "<td>" + msg[i].ProductName + "</td>" +
                      "<td>" + msg[i].SysProductCode + "</td>" +
                      "<td>" + msg[i].SystemProduct + "</td>" +

                       "<td><a onClick=\"MapProduct('" + msg[i].SalesDistID + "','" + msg[i].ProductCode + "','" + jsonObj[i].SysProductCode + "');\" href='javascript:;' style='vertical-align: text-top;' >Map</a></td>" +
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

function OnChangeddlp6() {

    FillProductGrid(EmployeeId);
}

function OnChangeIsMap() {

    FillProductGrid(EmployeeId);
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


function MapProduct(distId, ProductCode, SysProductCode, pk_ProductMapId) {


    $("#divProductMapping").modal('show');
    $("#divProductMapping").css("z-index", 999999);
    $('#divProductMapping').find('#btnAlignProduct').attr({ '_distid': distId, '_productcode': ProductCode, '_pk_ProductMapId': pk_ProductMapId });
    $('#divProductMapping').find('#btnRemoveAlign').attr({ '_distid': distId, '_productcode': ProductCode, '_sysproductcode': SysProductCode, '_pk_ProductMapId': pk_ProductMapId });
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
    var PKID = $(this).attr('_pk_ProductMapId');

    var pid = $('#ddlAllProduct').val();

    if (pid != '-1') {


        var mydata = "{'DistId':'" + distid + "','productcode':'" + pcode + "','systemProductid':'" + pid + "','PKID':'" + PKID + "'}";

        $.ajax({
            type: "POST",
            url: "ProductAlignmentService.asmx/UpdateAlignProduct",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                $(thisbtn).parents('.divTable').find('.requireError').hide();
                $(thisbtn).attr('_distid', '');
                $('#ddlAllProduct').val('-1')

                if (data.d == "Err") {
                    $("#divProductMapping").modal('hide');
                    swal("Error", "Something Went Wrong!", "error")

                }
                else {
                    //  $('#ddlAllClass').val(-1);
                    //  $('#frequency').val('');
                    //   $('#val' + cellval).hide();
                    //   $('.replaceme' + cellval).html('Pending');
                    $("#divProductMapping").modal('hide');
                    swal("Success", "Product Successfully Mapped.", "success")
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



function btnRemoveAlignClicked() {
    debugger;

    var thisbtn = $(this);
    var distid = $(this).attr('_distid');
    var pcode = $(this).attr('_productcode');
    var syspcode = $(this).attr('_sysproductcode');
    var PKID = $(this).attr('_pk_ProductMapId');

    var sysprod = (syspcode == '' ? 0 : syspcode);

    if (sysprod != '0' || sysprod != "") {


        var mydata = "{'DistId':'" + distid + "','productcode':'" + pcode + "','systemProductcode':'" + sysprod + "','PKID':'" + PKID + "'}";

        $.ajax({
            type: "POST",
            url: "ProductAlignmentService.asmx/RemoveAlignProduct",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                $(thisbtn).parents('.divTable').find('.requireError').hide();
                $(thisbtn).attr('_distid', '');
                $('#ddlAllProduct').val('-1')

                if (data.d == "Err") {
                    $("#divProductMapping").modal('hide');
                    swal("Error", "Something Went Wrong!", "error")

                }
                else {
                    $("#divProductMapping").modal('hide');
                    swal("Success", "Mapping Successfully Removed.", "success")
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

        alert('Map Product First!');

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


function FillDistributor() {

    var mydata = "{'EmployeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "ProductAlignmentService.asmx/GetAllDistributor",//sp_getalldistributor
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
        FillProductGrid(EmployeeId);
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
    FillProductGrid(EmployeeId);
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
    $('#containerteritory').parent().find('.dshload_back').hide();
    $('#imgLoading').hide();
}
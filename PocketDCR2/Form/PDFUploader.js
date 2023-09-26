
var prodjson = null;
var productid = -2;

var regex = new RegExp("^[0-9a-zA-Z\b ]+$");

//var validation;
//var validationFormRules;
//var validationFormMessages;

function pageLoad() {

    $("#txtPickStartDate").datepicker();
    $("#txtPickEndDate").datepicker();

    GetPDFMasterFiles();
    GetTeams();

    var date = new Date();
    var currDate = date.getDate();
    var currMonth = date.getMonth() + 1;
    var nextMonth = date.getMonth() + 2;
    var currYear = date.getFullYear();
    $('#txtPickStartDate').val(currMonth + '/' + currDate + '/' + currYear);
    $('#txtPickEndDate').val(nextMonth + '/' + currDate + '/' + currYear);

    //$('#hdnMode').val("AddMode");
    //alert($('ddlTeam').val());
    $('#ddlTeam').change(OnChangeddlTeam);

    //$('#ddlProducts').change(function () {
    //    $('#productID').val($('#ddlProducts').val());
    //});

  ///  fillddlProducts();
    $('#ddlProducts').change(function () {
        $('#productID').val($('#ddlProducts').val());
    });


    $('#txtPickEndDate').keydown(preventkeysExceptback);
    $('#txtPickStartDate').keydown(preventkeysExceptback);

    $('#btnFileSave').click(UploadPDFFile);
    $('#btnFileCancel').click(CancelFormFields);

    //$('#FileDescription').keypress(function (e) {
    //    var regex = new RegExp("^[a-zA-Z0-9]+$");
    //    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    //    if (regex.test(str)) {
    //        return true;
    //    }

    //    e.preventDefault();
    //    return false;
    //});

}

function preventkeysExceptback(e) {

    if (e.keyCode !== 8) {
        e.preventDefault();
    }
    else {
        $(this).val('');

    }
}

function OnChangeddlTeam() {

    var TeamID = $('#ddlTeam').val();
    if (TeamID != '') {
        $.ajax({
            type: "POST",
            url: "PDFUploaderServices.asmx/getProductsAgainstTeam",
            data: '{"teamID":' + TeamID + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('#ddlProducts').find('option').remove().end().append('<option value="">Please Wait...</option>').val("");
            },
            success: onSuccessFillddTeam,
            error: function (error) {
                alert(error);
            },
            cache: false
        });
    }
    else {
        $('#ddlProducts').val('');
    }

}




function onSuccessFillddTeam(data, status) {
    if (data.d != null) {

        var jsonObj = jsonParse(data.d);
        $('#ddlProducts').find('option').remove().end().append('<option value="">--Select Product--</option>').val("");
        $.each(jsonObj, function (i, tweet) {
            $('#ddlProducts').append('<option value="' + jsonObj[i].ProductId + '">' + jsonObj[i].ProductName + '</option>').val("-1");
            if (productid != -2) {
                $('#ddlProducts').val(productid);
            }
        });
    }
    else if (data.d === "") {
        $('#ddlProducts').find('option').remove().end().append('<option value="">--No Products Found--</option>').val("");
    }
}



function fillddlProducts() {

  

            $.ajax({
                type: "POST",
                url: "PDFUploaderServices.asmx/getProducts",
                data: '{}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function() {
                    $('#ddlProducts').find('option').remove().end().append('<option value="-1">Please Wait...</option>').val("-1");
                },
                success: onSuccessFillddProduct,
                error: function (error) {
                    alert(error);
                },
                cache: false
            });
        
    }


function onSuccessFillddProduct(data, status) {
    if (data.d != null) {

        var jsonObj = jsonParse(data.d);
        $('#ddlProducts').find('option').remove().end().append('<option value="-1">--Select Product--</option>').val("-1");
        $.each(jsonObj, function (i, tweet) {
            $('#ddlProducts').append('<option value="' + jsonObj[i].ProductId + '">' + jsonObj[i].ProductName + '</option>').val("-1");
            if (productid != -2) {
                $('#ddlProducts').val(productid);
            }
        });
    }
    else if(data.d === ""){
        $('#ddlProducts').find('option').remove().end().append('<option value="-1">--No Products Found--</option>').val("-1");
    }
}





function oGrid_makeRel(id, teamid) {
    $('#pagerelationmain').show();
    getproductdetails(teamid);
    $.ajax({
        type: "POST",
        url: "PDFUploaderServices.asmx/GetPageDetails",
        data: '{"id":' + id + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d != "") {
                var jsonObj = jsonParse(response.d);
                $("#pagebody").empty();
                $.each(jsonObj, function (i, tweet) {
                    $("#pagebody").append("<tr><td style='display:none;' id='pgdetailid" + jsonObj[i].PageNum + "'>" + jsonObj[i].ID + "</td>"
                        + "<td style='width: 40px;'><div class='divcol' id='pageid'>" + jsonObj[i].PageNum + "</div></td>"
                        + "<td style='width: 200px;'><select id='product" + jsonObj[i].PageNum + "' class='styledselect_form_1' onChange='onProductChange(" + jsonObj[i].PageNum + ")'><option value='-1'>Select Product</option></select></td>"
                        + "<td style='width: 197px;'><select id='sku" + jsonObj[i].PageNum + "' class='styledselect_form_1'><option value='-1'>Select SKU</option></select></td>"
                        + "<td style='width: 50px;'><a onClick='onSaveClick(" + jsonObj[i].PageNum + ")'>" + ((jsonObj[i].ProductId != "") ? "Update" : "Save") + "</a></td>"
                    + "</tr>");
                    fillprodudt(jsonObj[i].PageNum);
                    var prodcontr = '#product' + jsonObj[i].PageNum;
                    var skucontr = '#sku' + jsonObj[i].PageNum;
                    if (jsonObj[i].ProductId != "") {
                        $(prodcontr).val(jsonObj[i].ProductId);
                        fillskudetails(jsonObj[i].PageNum, jsonObj[i].ProductId);
                    }
                    if (jsonObj[i].SKUId != "") {
                        $(skucontr).val(jsonObj[i].SKUId);
                    }
                });
            }
        },
        error: function (error) {
            alert(error)
        },
        cache: false
    });
}

function onProductChange(rowid) {
    var prodcontrol = "#product" + rowid;
    fillskudetails(rowid, $(prodcontrol).val());
}

function onSaveClick(pageno, prodid) {

    var pageid = "#pgdetailid" + pageno
    var prodcontrol = "#product" + pageno
    var skucontrol = "#sku" + pageno

    $.ajax({
        type: "POST",
        url: "PDFUploaderServices.asmx/InsertPageDetails",
        data: '{"id":"' + $(pageid).text() + '","prodid":"' + $(prodcontrol).val() + '","SKUid":"' + $(skucontrol).val() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d != "") {
                alert("Data Saved Successfully!")
                var jsonObj = jsonParse(response.d);
                $.each(jsonObj, function (i, tweet) {
                    oGrid_makeRel(jsonObj[i].ID, jsonObj[i].Level3Id);
                    return;
                });

            }
        },
        error: function (error) {
            alert(error)
        },
        cache: false,
        async: false
    });
}

function getproductdetails(teamid) {
    $.ajax({
        type: "POST",
        url: "PDFUploaderServices.asmx/GetProductDetails",
        data: '{"id":' + teamid + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d != "") {
                prodjson = jsonParse(response.d);
            }
        },
        error: function (error) {
            alert(error)
        },
        cache: false,
        async: false
    });
}

function fillprodudt(rowid) {

    var prodcontrol = "#product" + rowid
    if (prodjson != null) {
        $(prodcontrol).empty();
        $(prodcontrol).append("<option value='-1'>Select Product</option>");
        $.each(prodjson, function (i, tweet) {
            $(prodcontrol).append("<option value='" + prodjson[i].ProductId + "'>" + prodjson[i].ProductName + "</option>");
        });
    }
}

function fillskudetails(rowid, prodid) {
    var skucontrol = "#sku" + rowid
    $.ajax({
        type: "POST",
        url: "PDFUploaderServices.asmx/GetSKUDetails",
        data: '{"id":' + prodid + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d != "") {
                var jsonObj = jsonParse(response.d);
                $(skucontrol).empty();
                $(skucontrol).append("<option value='-1'>Select Product SKU</option>");
                $.each(jsonObj, function (i, tweet) {
                    $(skucontrol).append("<option value='" + jsonObj[i].SkuId + "'>" + jsonObj[i].SkuName + "</option>");
                });
            }
        },
        error: function (error) {
            alert(error)
        },
        cache: false,
        async: false
    });
}

function validate() {

    $('#productID').val($('#ddlProducts').val());

    var isValidated = $('#form1').validate({
        rules: {
            txtCode: {
                required: true,
                digits: true
            },
            txtName: {
                required: true
            },
            txtDistributorPrice: {
                required: true,
                digits: true
            },
            txtTradePrice: {
                required: true,
                digits: true
            },
            txtRetailPrice: {
                required: true,
                digits: true
            }
        }
    });


    if (isNaN(new Date($('#txtPickStartDate').val()))) {
        alert('Please Select Proper Start Date');
        return false;
    }
    if (isNaN(new Date($('#txtPickEndDate').val()))) {
        alert('Please Select Proper End Date');
        return false;
    }
    if ((new Date($('#txtPickEndDate').val())) <= (new Date($('#txtPickStartDate').val()))) {
        alert("End Date Must Be After Start Date");
        return false;
    }


    if ($('#Uploadfile').val() == "" && $('#hdnMode').val() != "EditMode") {
        alert('Please Select A File!');
        return false;
    }

    return true;
}

function resetall() {
    $('#hdnMode').val("AddMode");
    $('#pagerelationmain').hide();
    $('#ddlTeam').val("-1");
    $('#FileName').val("");
    $('#FileDescription').val("");
    $('#Uploadfile').val("");
    $('#status').attr("checked", false);
    $('#txtPickEndDate').val("");
    $('#txtPickStartDate').val("");

}

function startingAjax() {
    $('#UpdateProgress1').show();
}
function ajaxCompleted() {
    $('#UpdateProgress1').hide();
}



//EDIT DATA 

function oGrid_Edit(id, teamid, name, description, status, productId, startdate, enddate) {
    debugger
    ////alert(id + teamid + name + description + status);
    //alert(id);
    ////alert(startdate + enddate);
    //alert("Product ID"+ $('#productID').val());
    $('.fileUpload').hide();
    $('#productID').val(productId);
    $('#ddlProducts').attr('disabled', 'disabled');

    $('#hdnMode').val("EditMode");
    $('#pdfid').val(id);
    productid = productId;
    $('#ddlTeam').attr('disabled', 'disabled');
    //$('#ddlTeam').val(teamid).change();
    //document.getElementById("productID").value = $('#ddlProducts').val();

    $('#ddlProducts').val(productId).change();

    $('#FileName').val(name);
    $('#FileDescription').val(description);

    $('#txtPickStartDate').val(startdate);
    $('#txtPickEndDate').val(enddate);

    //var startDate = ((new Date(startdate)));
    //var endDate = ((new Date(enddate)));

    //if (isNaN(startDate)) {
    //    $('#txtPickStartDate').val("");
    //}
    //else {
    //    $('#txtPickStartDate').val((startDate.getMonth() + 1) + '/' + startDate.getDate() + '/' + startDate.getFullYear());
    //}

    //if (isNaN(endDate)) {
    //    $('#txtPickEndDate').val("");
    //}
    //else {
    //    $('#txtPickEndDate').val((endDate.getMonth() + 1) + '/' + endDate.getDate() + '/' + endDate.getFullYear());
    //}

    $('#status').attr("checked", ((status == "True") ? true : false));

}


//DELETE DATA

function oGrid_Delete(sender) {
    
    if (window.confirm("Would you like to delete this record?")) {
        $.ajax({
            type: "POST",
            url: "PDFUploaderServices.asmx/DeletePdf",
            data: '{"id":' + sender + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                debugger
                if (response.d == "ok") {
                    alert("Selected file has been deleted!")
                }
                else if (response.d == "fk error") {
                    alert("Call already executed against this file. Cannot delete this record!")
                }
                else {
                    alert("Error occured. Try again!")
                }

                //$('#ddlProducts').removeAttr('disabled');
                //$('#ddlTeam').removeAttr('disabled');
                debugger
                CancelFormFields();
                GetPDFMasterFiles();
            },
            error: function (error) {
                alert(error)
            },
            cache: false
        });
    }
}


function GetTeams() {
    $.ajax({
        type: "POST",
        url: "PDFUploaderServices.asmx/GetTeams",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetTeams,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function onSuccessGetTeams(data, status) {

    if (data.d != '') {
        var jsonObj = jsonParse(data.d);
        $("#ddlTeam").empty();
        $("#ddlTeam").append("<option value=''>Select Team</option>");
        if (jsonObj.length > 0) {
            $.each(jsonObj, function (i, option) {
                $("#ddlTeam").append("<option value='" + option.LevelId + "'>" + option.LevelName + "</option>");
            });
        }
    }
}

//GET ALL PDF FILES

function GetPDFMasterFiles() {
    $.ajax({
        type: "POST",
        url: "PDFUploaderServices.asmx/GetAllPDFMasterFiles",
        contentType: "application/json; charset=utf-8",
        success: OnSuccessGetPDFMasterFiles,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        //error: onError,
        async: true,
        cache: false
    });
}

function OnSuccessGetPDFMasterFiles(data) {

    if (data != "[]") {
        var jSonObj = jsonParse(data.d);

        $("#griddiv").empty();
        $("#griddiv").append("<div class='inner-head' style='width:100%;'><h2>PDF/Video Files List</h2></div><table id='grid-basic' class='dataTables_info dataTables_filter' style='table-layout:fixed;'></table>");
        $("#grid-basic").empty();
        $("#grid-basic").append("<thead>" +
                            "<tr class='ob_gC'>" +
                                "<th style='width: 50px;'>S.No  </th>" +
                                "<th style='width: 120px;' data-column-id='FileName'>File Name</th>" +
                                "<th style='width: 150px;' data-column-id='Product'>Product</th> " +
                                "<th style='width: 130px;' data-column-id='Type'>Type</th> " +
                                "<th style='width: 180px;' data-column-id='Description'>Description</th> " +
                                "<th style='width: 60px;' data-column-id='NumOfPages'>Pages</th> " +
                                "<th style='width: 90px;' data-column-id='startDate'>Start Date</th> " +
                                "<th style='width: 90px;' data-column-id='endDate'> End Date</th> " +
                                "<th style='width: 60px;' data-column-id='Status'>Status</th> " +
                                "<th style='width: 80px;' >Action</th> " +
                            "</tr>" +
                          "</thead>" +
                          "<tbody id='values' style='line-height: 2;'>");
        var val = '';
        if (jSonObj.length > 0) {
            for (var i = 0; i < jSonObj.length ; i++) {

                $('#values').append("<tr>" +
                    "<td>" + (i + 1) + "</td>" +
                    "<td>" + jSonObj[i].FileName + "</td>" +
                    "<td>" + jSonObj[i].Product + "</td>" +
                    "<td>" + jSonObj[i].Type + "</td>" +
                    "<td>" + jSonObj[i].Description + "</td>" +
                    "<td>" + jSonObj[i].NumOfPages + "</td>" +
                    "<td>" + jSonObj[i].startDate + "</td>" +
                    "<td>" + jSonObj[i].endDate + "</td>" +
                    "<td>" + (jSonObj[i].Status == "True" ? "Active" : "Inactive") + "</td>" +
                    "<td><a onClick=\"oGrid_Edit('" + jSonObj[i].ID + "','" + jSonObj[i].TeamId + "','" + jSonObj[i].FileName + "','" + jSonObj[i].Description + "','" + jSonObj[i].Status + "','" + jSonObj[i].ProductId + "','" + jSonObj[i].startDate + "','" + jSonObj[i].endDate + "');\" href='javascript:;'>Edit</a> | " +
                        "<a onClick=\"oGrid_Delete('" + jSonObj[i].ID + "');\" href='javascript:;'>Delete</a> " +
                    "</td>" +
                "</tr></tbody>");
            }
        }
    }
    $("#grid-basic").dataTable({
        "columnDefs": [{
            "targets": -1,
            "orderable": false
        }]
    });
}


//UPLOAD FILES

function UploadPDFFile() {


    var isValidated = $("#form1").validate({
        errorElement: "div",
        ignore: '.ignoreField',
        rules: {
            ddlTeam: { required: true },
            ddlProducts: { required: true },
            FileName: { required: true, minlength: 2, maxlength: 150 },
            FileDescription: { minlength: 2, maxlength: 200 },
            txtPickStartDate: { required: true },
            txtPickEndDate: { required: true }
        },
        messages: {
            ddlTeam: {
                required: 'Please select Team'
            },
            ddlProducts: {
                required: 'Please select Product'
            },
            FileName: {
                required: 'Please enter file name',
                minlength: 'Please enter at least 2 characters.',
                maxlength: 'Please enter no more than 150 characters.'
            },
            FileDescription: {
                minlength: 'Please enter at least 2 characters.',
                maxlength: 'Please enter no more than 200 characters.'
            },
            txtPickStartDate: {
                required: 'Please pick start date'
            },
            txtPickEndDate: {
                required: 'Please pick end date'
            }
        }
    });

    if (!$('#form1').valid()) {
        return false;
    }



    var fileName = document.getElementById("FileName").value;
    var fileDescription = document.getElementById("FileDescription").value;

    //if (regex.exec(fileName) == null || regex.exec(fileDescription) == null) {

    if (regex.exec(fileName) == null) {
        alert('Only Letters, digits and Spaces are allowed! Please remove any special character from text fields.');
        return false;
    }


    var txtTeamId = $('#ddlTeam').val();
    var txtProductId = $('#ddlProducts').val();
    var FileName = $('#FileName').val();
    var FileDescription = $('#FileDescription').val();
    var txtStatus = ($('#status').is(':checked') == true ? "1" : "0");
    var txtPickEndDate = $('#txtPickEndDate').val();
    var txtPickStartDate = $('#txtPickStartDate').val();


    var s_date = new Date(txtPickStartDate);
    var e_date = new Date(txtPickEndDate);

    var txtFileName = FileName.replace(/\//g, " ");
    var txtFileDescription = FileDescription.replace(/\//g, " ");

    var EndDate = txtPickEndDate.replace(/\//g, "-");
    var StartDate = txtPickStartDate.replace(/\//g, "-");

    //--------- UPDATE DATA --------
    //var asdf = $('#hdnMode').val();
    //alert(asdf);
    if ($('#hdnMode').val() == "EditMode") {

        var pkId = $('#pdfid').val();
        if (pkId != "" || pkId != 0) {
            if (s_date >= e_date) {
                alert("End date must be greater than start date");
            }
            else {
                var mydata = "{'Id':'" + pkId + "','TeamId':'" + txtTeamId + "','ProductId':'" + txtProductId + "','FileName':'" + txtFileName + "','FileDescription':'" + txtFileDescription + "','Status':'" + txtStatus + "','EndDate':'" + txtPickEndDate + "','StartDate':'" + txtPickStartDate + "'}";
                $.ajax({
                    type: "POST",
                    url: "PDFUploaderServices.asmx/UpdatePDFDetails",
                    contentType: "application/json; charset=utf-8",
                    data: mydata,
                    success: function (data, textStatus, xhr) {
                        GetPDFMasterFiles();
                        if (data.d == "Updated") {
                            alert("Record updated successfully");
                            $('#hdnMode').val("AddMode");
                            var date = new Date();
                            var currDate = date.getDate();
                            var currMonth = date.getMonth() + 1;
                            var nextMonth = date.getMonth() + 2;
                            var currYear = date.getFullYear();
                            $('#ddlTeam').val("");
                            $('#ddlProducts').val("");
                            $('#FileName').val(null);
                            $('#FileDescription').val(null);
                            $('#status').removeAttr('checked');
                            $('#txtPickStartDate').val(currMonth + '/' + currDate + '/' + currYear);
                            $('#txtPickEndDate').val(nextMonth + '/' + currDate + '/' + currYear);
                            $('input[type=file]').val(null);
                        }
                        else {
                            $('#hdnMode').val("AddMode");
                            //alert('Something went wrong. Please try again!');
                            return false;
                        }
                        CancelFormFields();
                    },
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false,
                    asyn: false,
                    processData: false,
                });
            }
        }
        else {
            alert("Invalid Operation");
        }
    }

        //--------- ADD DATA --------

    else {
        if ($("#Uploadfile").get(0).files.length == 0) {
            alert("Select file");
            return false;
        }
        else {
            if (s_date >= e_date) {
                alert("End Date must be after Start Date");
            }
            else {
                var file = $("#Uploadfile").get(0).files;
                debugger
                //alert(file[0].type);
                if (file[0].type == "application/pdf") {
                    if (file[0].size >= '31457280') {
                        alert("PDF file must be less than 30mb!");
                        return false;
                    }
                }
                if ((file[0].type == 'video/mp4') ||  (file[0].type == 'video/mpeg')) {
                    if (file[0].size >= '52428800') {
                        alert("Video file must be less than 50mb!");
                        return false;
                    }
                }



                if (file.length > 0) {
                    if ((file[0].type != 'application/pdf') && (file[0].type != 'video/mp4') ) {
                        alert("Not a valid file");
                    }
                    else {
                        var formdata = new FormData();

                        var files = $("#Uploadfile").get(0).files;
                        var fileName = $("#Uploadfile").get(0).files[0].name;

                        formdata.append("UploadedFile", files[0]);
                        formdata.append("fileName", fileName);
                        formdata.append("txtTeamId", txtTeamId);
                        formdata.append("txtProductId", txtProductId);
                        formdata.append("txtFileName", txtFileName);
                        formdata.append("txtFileDescription", txtFileDescription);
                        formdata.append("txtStatus", txtStatus);
                        formdata.append("EndDate", EndDate);
                        formdata.append("StartDate", StartDate);

                        $.ajax({
                            type: "POST",
                            url: "PDFUploaderServices.asmx/UploadFile",
                            contentType: "application/json; charset=utf-8",
                            datatype: "json",
                            data: formdata,
                            //url: "/Handler/PDFUploader.svc/UploadPDF/" + fileName + "/" + txtTeamId + "/" + txtProductId + "/" + txtFileName + "/" + txtFileDescription + "/" + txtStatus + "/" + EndDate + "/" + StartDate,
                            //contentType: 'application/octet-stream',
                            //data: $("#Uploadfile").get(0).files[0],
                            success: function (data, textStatus, xhr) {
                               
                                GetPDFMasterFiles();
                                if (data.documentElement.innerHTML == "Uploaded") {
                                    alert("File has been upload");
                                    var date = new Date();
                                    var currDate = date.getDate();
                                    var currMonth = date.getMonth() + 1;
                                    var nextMonth = date.getMonth() + 2;
                                    var currYear = date.getFullYear();
                                    $('#ddlTeam').val("");
                                    $('#ddlProducts').val("");
                                    $('#FileName').val(null);
                                    $('#FileDescription').val(null);
                                    $('#status').removeAttr('checked');
                                    $('#txtPickStartDate').val(currMonth + '/' + currDate + '/' + currYear);
                                    $('#txtPickEndDate').val(nextMonth + '/' + currDate + '/' + currYear);
                                    $('input[type=file]').val(null);
                                }
                                else if (data.documentElement.innerHTML == "Invalid file selected") {
                                    alert('Invalid file selected, Only Pdf, mp4, mpeg and 3gp  file Allowed!');
                                    return false;
                                }
                                else if (data.documentElement.innerHTML == "File already exists") {
                                    alert('File already saved. Please try again with different file or changing file name!');
                                    return false;
                                }
                                else if (data.documentElement.innerHTML == "File not uploaded") {
                                    alert('File not saved. Please try again!');
                                    return false;
                                }
                                else if (data.documentElement.innerHTML == "PDF Size too large") {
                                    alert('Size too large. File must be less than 30mb!');
                                    return false;
                                }
                                else if (data.documentElement.innerHTML == "Video Size too large") {
                                    alert('Size too large. File must be less than 50mb!');
                                    return false;
                                }
                                else if (data.documentElement.innerHTML == "File not saved") {
                                    alert('File not saved');
                                    return false;
                                }
                                else if (data.documentElement.innerHTML == "File not supported") {
                                    alert('File not supported. Only PDF files are allowed!');
                                    return false;
                                }
                                else if (data.documentElement.innerHTML == "Select file") {
                                    alert('No file selected. Please select file!');
                                    return false;
                                }
                                else if (data.documentElement.innerHTML == "Invalid input data") {
                                    alert('Submitted invalid input data!');
                                    return false;
                                }
                                CancelFormFields();
                                //else {
                                //    alert('Something went wrong. Please try again!');
                                //    return false;
                                //}
                            },
                            beforeSend: startingAjax,
                            complete: ajaxCompleted,
                            cache: false,
                            asyn: false,
                            contentType: false,
                            processData: false,
                        });
                    }
                }
            }
        }
    }
}


//CLEAR FIELDS

function CancelFormFields() {

    $("#form1").validate().resetForm();

    $('#hdnMode').val("AddMode");
    var date = new Date();
    var currDate = date.getDate();
    var currMonth = date.getMonth() + 1;
    var nextMonth = date.getMonth() + 2;
    var currYear = date.getFullYear();
    $('#ddlProducts').removeAttr('disabled');
    $('#ddlTeam').removeAttr('disabled');
    $('#ddlTeam').val("");
    $('#ddlProducts').val("");
    $('#FileName').val(null);
    $('#FileDescription').val(null);
    $('#status').removeAttr('checked');
    $('#txtPickStartDate').val(currMonth + '/' + currDate + '/' + currYear);
    $('#txtPickEndDate').val(nextMonth + '/' + currDate + '/' + currYear);
    $('input[type=file]').val(null);
    $('.fileUpload').show();
}


function onError(request, status, error) {
    $('#Divmessage').find('#hlabmsg').empty();
    $('#Divmessage').find('#hlabmsg').text('Error is occured.');
    $('#Divmessage').jqmShow();
}
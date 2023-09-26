

$(document).ready(function () {

    FillRegion();
   // FillDistributor();
  //  FillSalesBricksData();

   

    $("#ddl1").change(function () {
        $('#ddl2').val('-1');
        $('#ddl3').val('-1');
        $('#ddl4').val('-1');
        $("#ddlDistributors").val('-1');
        FillSubRegion($('#ddl1').val());
    });
    $("#ddl2").change(function () {
        FillDistrict($('#ddl2').val());
    });
    $("#ddl3").change(function () {
        FillCity($('#ddl3').val());
    });
    $("#ddl4").change(function () {
        FillDistributor($('#ddl4').val());
        FillSalesBricksData($('#ddl4').val());
    });
  
    $("#ddlDistributors").change(function () {
        listGetEmpSalesBricks();
    });

        $('#btnRight').click(function (e) {
            var selectedOpts = $('#listbox1 option:selected');
            //productarray.push($('#listbox1 option:selected').val());
            if (selectedOpts.length == 0) {

                //alert("Nothing to move.");
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

 })


function FillRegion() {
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesDistributorService.asmx/GetAllRegion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {

            $('#ddl1').empty();
            $("#ddl1").append("<option value='-1'>Select Region</option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $("#ddl1").append("<option value='" + option.RegionID + "'>" + option.RegionName + "</option>");
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

            $('#ddl2').empty();
            $("#ddl2").append("<option value='-1'>Select Sub Region</option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $("#ddl2").append("<option value='" + option.SubRegionID + "'>" + option.SubRegionName + "</option>");
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

            $('#ddl3').empty();
            $("#ddl3").append("<option value='-1'>Select District </option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {//DistrictID,d.DistrictName
                    $("#ddl3").append("<option value='" + option.DistrictID + "'>" + option.DistrictName + "</option>");
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

            $('#ddl4').empty();
            $("#ddl4").append("<option value='-1'>Select City </option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $("#ddl4").append("<option value='" + option.CityID + "'>" + option.City + "</option>");
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
    $('#dialog').jqm({ modal: true });
    $('#dialog').jqm();
    $('#dialog').jqmShow();
    listGetDoctorsBrick();
    $('#listbox2').empty();
    $('#dialog').jqmHide();
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

    //var empID = $('#ddlEmp').val();
    //var percentange = $('#inpSalesPercent').val();
    var salesbricksid = $('#listbox1').val();
    var salesdistid = $('#ddlDistributors').val();
    if (salesdistid == '-1') {
        alert("Please Select Sales Distributor!");
        return false;
    }

    if (salesbricksid == '-1') {
        alert("Please Select Sales Brick!");
        return false;
    }

    var myData = "{'SalesDistributorID':'" + salesdistid + "','SalesBricksID':'" + salesbricksid + "'}";
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesBrickRelation.asmx/InsertRelationalSalesBrick",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (data, status) {

            $('#listbox2').empty();
            if (data.d == "Exist") {
                alert("Already Exist...!");
                listGetEmpSalesBricks();
            }
            else if (data.d == "OK") {
                alert("Attached Succesfully");
                listGetEmpSalesBricks();
            }
            //$('#listbox2').empty();
            //if (data.d == "NO") {
            //    alert("Employee Profile Is Not Complete");
            //}
            //else {
            //    var msg = JSON.parse(data.d);
            //    $.each(msg, function (i, option) {
            //        $("#listbox2").append("<option value='" + option.BrickCode + "'>" + option.BrickName + "</option>");
            //    });

            //}
        },
        error: onError,
        cache: false

    });
}

function DeleteData() {

    

    var salesbricksid = $('#listbox2').val();
    var salesdistid = $('#ddlDistributors').val();
    if (salesdistid == '-1') {
        alert("Please Select Sales Distributor!");
        return false;
    }

    if (salesbricksid == '-1') {
        alert("Please Select Sales Brick!");
        return false;
    }

    var myData = "{'SalesDistributorID':'" + salesdistid + "','SalesBricksID':'" + salesbricksid + "'}";

    $.ajax({
        type: "POST",
        url: "SalesBrickRelation.asmx/DeleteRelationalSalesBrick",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (data, status) {
            $('#listbox2').empty();

            alert("Remove Succesfully");
            listGetEmpSalesBricks();
          

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
        url: "../BWSD/SalesBrickRelation.asmx/listGetEmpSalesBricks",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (data, status) {
            $('#listbox2').empty();
            if (data.d == "No") {

            }
            else {
                var msg = JSON.parse(data.d);
                $.each(msg, function (i, option) {
                    $("#listbox2").append("<option value='" + option.brickID + "'>" + option.BrickName + "</option>");
                });
            }
        },
        error: onError,
        cache: false

    });
}


function listGetSalesBricks() {

    var distributorCode = $("#ddlDistributors").val();
    //var docdate = $('#txtDate').val();
    //var id = brickid.split('-')[1];

    myData = "{'distributorCode':'" + distributorCode + "'}";
    $.ajax({
        type: "POST",
        url: "SalesBrickRelation.asmx/listGetSalesBricks",
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
                $.each(msg, function (i, option) {
                    //sb.ID, sb.BrickName
                    $("#listbox1").append("<option value='" + option.BrickCode + "'>" + option.BrickName + "</option>");

                });
            }
        },
        error: onError,
        cache: false

    });
}

//function listGetDoctorsBrick() {

//    var level6id = $('#ddlEmp').val();
//    myData = "{'Level6ID':'" + level6id + "'}";

//    $.ajax({
//        type: "POST",
//        url: "SalesBrickRelation.asmx/GetDoctorsBrick",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        data: myData,
//        async: false,
//        success: function (data, status) {
//            $('#ddldocbrick').empty();
//            $("#ddldocbrick").append("<option value='-1'>Select Doctors Bricks</option>");
//            if (data.d == "No") {
//            }
//            else {
//                var msg = JSON.parse(data.d);
//                $.each(msg, function (i, option) {
//                    $("#ddldocbrick").append("<option value='" + option.LevelId + "'>" + option.LevelName + "</option>");
//                });
//            }

//        },
//        error: onError,
//        cache: false

//    });

//}

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
            $("#listbox1").append("<option value='-1'>Select Brick</option>");
            $.each(msg, function (i, option) {
                $('#listbox1').append('<option  value="' + option.ID + '">' + option.BrickName + '</option>');
            });
        },
        error: onError,
        cache: false

    });
}

function FillTeams() {

    //var docdate = $('#txtDate').val();

    $.ajax({
        type: "POST",
        url: "SalesBrickRelation.asmx/GetTeams",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //data: myData,
        async: false,
        success: function (data, status) {
            $('#ddlteams').empty();
            $("#ddlteams").append("<option value='-1'>Select Team</option>");
            if (data.d == "No") {
            }
            else {
                var msg = JSON.parse(data.d);
                $.each(msg, function (i, option) {
                    $("#ddlteams").append("<option value='" + option.id + "'>" + option.TeamName + "</option>");
                });
            }

        },
        error: onError,
        cache: false

    });

}

function FillEmployees() {

    var teamid = $("#ddlteams").val();
    myData = "{'TeamID':'" + teamid + "'}";
    $.ajax({
        type: "POST",
        url: "SalesBrickRelation.asmx/GetEmployeeslevel6",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (data, status) {
            $('#ddlEmp').empty();
            $("#ddlEmp").append("<option value='-1'>Select Employee</option>");
            if (data.d == "No") {
            }
            else {
                var msg = JSON.parse(data.d);
                $.each(msg, function (i, option) {
                    $("#ddlEmp").append("<option value='" + option.Level6LevelId + "'>" + option.EmployeeName + "</option>");
                });
            }

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



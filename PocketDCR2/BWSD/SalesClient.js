
var EmployeeId = 0;
$(document).ready(function () {


    //GetClientDetail();
    GetCurrentUser();
    FillDistributorFilter();
    FillRegion();

    $('#ddlDistributor').change(OnChangeddlDist);
   
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
     //   listGetSalesBricks();
       
  
    });

    $("#ddlDistributors").change(function () {
        FillSalesBricksData();
      
    });


    $('#ddlDistributor').select2();
    $('#ddlBrickFilter').select2();
   
})

function GetClientData() {
    GetClientDetail();
}

function OnChangeddlDist() {

    debugger;
    var DistID = $('#ddlDistributor').val();
    if (DistID != '') {
        $.ajax({
            type: "POST",
            url: "SaleClient.asmx/GetAllBrickByDist",
            data: '{"DistId":' + DistID + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('#ddlBrickFilter').find('option').remove().end().append('<option value="">Please Wait...</option>').val("");
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

        var jsonObj = $.parseJSON(data.d);

        $('#ddlBrickFilter').find('option').remove().end().append('<option value="">--Select Brick--</option>').val("");
        $.each(jsonObj, function (i, tweet) {
            $('#ddlBrickFilter').append('<option value="' + jsonObj[i].ID + '">' + jsonObj[i].BrickName + '</option>').val("");

        });
    }
    else if (data.d === "") {
        $('#ddlBrickFilter').find('option').remove().end().append('<option value="">--No Brick Found--</option>').val("");
    }
}

function OnChangeDistributorBrick() {

    GetClientDetail();
}


function GetClientDetail() {
    var distid = $('#ddlDistributor').val();
    var brickid = $('#ddlBrickFilter').val();

    if (distid == '-1') {
        distid = 0;
    }
    if (brickid == '' || brickid == '-1') {
        brickid = 0;
    }
    var mydata = "{'distid':'" + distid + "','brickid':'" + brickid + "'}";
    //var myData = "{}";
    $.ajax({
        type: "POST",
        url: "../BWSD/SaleClient.asmx/listGetSalesClientBricks",
        data: mydata,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != "No") {
                jsonObj = $.parseJSON(data.d);
                var tablestring = "<table id='datatables' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'  > <thead>" +
                      "<tr style='background-color: #217ebd;color: white;'>" +
                  
                      "<th > Region </th>" +
                      "<th > Sub Region </th>" +
                      "<th > District  </th>" +
                      "<th > City  </th>" +
                     
                      "<th > Distributor  </th>" +

                       "<th > Brick  </th>" +
                  
                      "<th > Customer  </th>"+
                      "<th > Action  </th></thead> <tbody>";
                //RegionID	RegionName	SubRegionID	SubRegionName	DistrictID	DistrictName	CityID	City	DistributorID	DistributorCode	DistributorName	brickID	BrickCode	BrickName	PharmacyID	PharmacyCode	PharmacyName	IsActive
                for (var i = 0; i < jsonObj.length ; i++) {
                    tablestring += "<tr>";
                    tablestring += "<td >" + jsonObj[i].RegionName + "</td>";
                    tablestring += "<td >" + jsonObj[i].SubRegionName + "</td>";
                    tablestring += "<td >" + jsonObj[i].DistrictName + " </td>"; 
                    tablestring += "<td >" + jsonObj[i].City + "</td>";

                    tablestring += "<td >" + jsonObj[i].DistributorCode + "-" + jsonObj[i].DistributorName + "</td>";
                    tablestring += "<td >" + jsonObj[i].BrickCode + "-" + jsonObj[i].BrickName + " </td>";
                    tablestring += "<td >" + jsonObj[i].PharmacyCode + "-" + jsonObj[i].PharmacyName + "</td>";
           
                    tablestring += "<td >" + " <a href='#'  onclick='oGrid_Edit(\"" + jsonObj[i].PharmacyID + "\");return false'>Edit</a> " + "<a href='#'  onclick='oGrid_Delete(\"" + jsonObj[i].PharmacyID + "\");return false'>Remove</a>" + "</td>";
                    tablestring += "</tr>";
                }
                tablestring += "</tbody></table>";

                $("#grid").empty();
                $("#grid").append(tablestring);

                 $('#datatables').DataTable({
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
            }

        },
        cache: false,
        aynsc: true
    });
}

function oGrid_Edit(sender) {

    $('#btnSubmit').hide();
    $('#btnUpdate').show();
    ID = sender.toString();

    myData = "{'clientid':'" + ID + "'}";

    $.ajax({
        type: "POST",
        url: "../BWSD/SaleClient.asmx/GetClientbyId",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetSalesClient,
        error: onError,
        cache: false,
        async: false
    });
}


function oGrid_Delete(sender, distid) {
    $('#hdnMode').val("DeleteMode");
    clientID = sender;

    myData = "{'clientID':'" + clientID + "'}";

    $("<div><p> Are you sure to delete this record(s)?</p></div>").dialog({
        resizable: false,
        modal: true,
        title: "Confirmation",
        height: 150,
        width: 310,
        buttons: {
            "Yes": function () {


                $.ajax({
                    type: "POST",
                    url: "../BWSD/SaleClient.asmx/DeleteClient",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data, status) {
                       debugger;
                        if (data.d == "Success") {
                           
                            GetClientDetail();
                            Reset();
                            toastr.info('Succesfully Delete', 'Alert', {
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
                        else if (data.d == "Duplicate Name!") {
                
                            // alert("");
                            toastr.info('Duplicate Code', 'Alert', {
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
                            return false;
                        }
                    },
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
                $(this).dialog('close');
                // callback(true);
            },
            "No": function () {
                $(this).dialog('close');
                //callback(false);
            }
        }
    });
}


function onSuccessGetSalesClient(data, status) {
    if (data.d != "") {

        ClearFields();
        var jsonObj = $.parseJSON(data.d);

        $('#ddl1').val(jsonObj[0].RegionID);
        FillSubRegion(jsonObj[0].RegionID);
        $('#ddl2').val(jsonObj[0].SubRegionID);
        FillDistrict(jsonObj[0].SubRegionID);
        $('#ddl3').val(jsonObj[0].DistrictID);
        FillCity(jsonObj[0].DistrictID);
        $('#ddl4').val(jsonObj[0].CityID);
        FillDistributor(jsonObj[0].CityID);
        $('#ddlDistributors').val(jsonObj[0].DistributorID);

        FillSalesBricksData();
        $('#ddlbrick').val(jsonObj[0].brickID);
        
        $('#clientcode').val(jsonObj[0].PharmacyCode);
        $('#clientName').val(jsonObj[0].PharmacyName);
    }
}

function GetTerritoryBrickDetail() {

    var salesdistid = $('#ddlDistributors').val();
    var spoid = $('#ddl44').val();
 
    var myData = "{'Level6Id':'" + (spoid == '-1' ? 0 : spoid) + "','DistributorID':'" + (salesdistid == '-1' ? 0 : salesdistid) + "'}";
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesTerritorybrick.asmx/listGetTerritoryBrickDetail",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, data, status) {
          
               
             
                // emp.Level6LevelId,emp.Territory,dist.ID,dist.DistributorName,brick.ID,brick.BrickName,rel.SalePercentage
            $('#ddlbrick').empty();
            $("#ddlbrick").append("<option value='-1'>Select Brick </option>");
                if (response.d != 'No') {
                    var msg = $.parseJSON(response.d);
                    $.each(msg, function (i, option) {
                        $("#ddlbrick").append("<option value='" + option.ID + "'>" + option.BrickName + "</option>");
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
            }

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
                    $("#ddlDistributors").append("<option value='" + option.ID + "'>"  + option.DistributorName + "</option>");
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

    var brickid = $('#ddlbrick').val();
    var brickcode = $('#ddlbrick').find(':selected').data('brickcode');
    var clientcode = $('#clientcode').val();
    var clientName = $('#clientName').val();
  
   
    if (brickid == '-1') {
        $("#colbrick").addClass("has-error");
    //    alert("Please Select Sales Distributor!");
        return false;
    }
    else {
        $("#colbrick").removeClass("has-error");
    }
    if (clientcode == '') {
        $("#colcode").addClass("has-error");
       // alert("Please Select SPO!");
        return false;
    }
    else {
        $("#colcode").removeClass("has-error");
    }

    if (clientName == '') {
        $("#colname").addClass("has-error");
       // alert("Please Select Sales Brick!");
        return false;
    }
    else {
        $("#colname").removeClass("has-error");
    }

 
    
    
    var myData = "{'brick':'" + brickid + "','brickcode':'" + brickcode + "','clientcode':'" + clientcode + "','clientName':'" + clientName + "'}";
    $.ajax({
        type: "POST",//string TerritoryID,string salepercent
        url: "../BWSD/SaleClient.asmx/InsertClientSalesBrick",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (data, status) {
            debugger;
            if (data.d == "OK") {
                // alert("");
                // FillSalesBricksData();
                GetClientDetail();
                Reset();
                toastr.info('Succesfully', 'Alert', {
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
            else if (data.d == "Duplicate Name!") {
                
                // alert("");
                toastr.info('Duplicate Code', 'Alert', {
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
                return false;
            }

           
        },
        error: onError,
        cache: false
    });
}

function UpdateData() {

    var brickid = $('#ddlbrick').val();
    var brickcode = $('#ddlbrick').find(':selected').data('brickcode');
    var clientcode = $('#clientcode').val();
    var clientName = $('#clientName').val();


    if (brickid == '-1') {
        $("#colbrick").addClass("has-error");
        //    alert("Please Select Sales Distributor!");
        return false;
    }
    else {
        $("#colbrick").removeClass("has-error");
    }
    if (clientcode == '') {
        $("#colcode").addClass("has-error");
        // alert("Please Select SPO!");
        return false;
    }
    else {
        $("#colcode").removeClass("has-error");
    }

    if (clientName == '') {
        $("#colname").addClass("has-error");
        // alert("Please Select Sales Brick!");
        return false;
    }
    else {
        $("#colname").removeClass("has-error");
    }

    var myData = "{'clientId':'" + ID + "','brick':'" + brickid + "','brickcode':'" + brickcode + "','clientcode':'" + clientcode + "','clientName':'" + clientName + "'}";
    $.ajax({
        type: "POST",//string TerritoryID,string salepercent
        url: "../BWSD/SaleClient.asmx/UpdateClient",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (data, status) {
            debugger;
            if (data.d == "Success") {
                // alert("");
                // FillSalesBricksData();
                $('#btnUpdate').hide();
                $('#btnSubmit').show();


                GetClientDetail();
                Reset();
                toastr.info('Succesfully Update', 'Alert', {
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
            else if (data.d == "Duplicate Code!") {

                // alert("");
                toastr.info('Duplicate Name', 'Alert', {
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
                return false;
            }


        },
        error: onError,
        cache: false
    });
}

function DeleteData() {


    var salesbricksid = $('#listbox2').val();
    var salesdistid = $('#ddlDistributors').val();
    var spoid = $('#ddl44').val();
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
        url: "../BWSD/SalesTerritorybrick.asmx/RemoveRelationalSalesBrick",
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
        url: "../BWSD/SalesTerritorybrick.asmx/listGetEmpSalesBricks",
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
                $.each(msg, function (i, option) {
                    $("#listbox1").append("<option value='" + option.ID + "' data-brickid='" + option.brickID + "'>" + option.BrickName + "</option>");
                });
            }
        },
        error: onError,
        cache: false

    });
}


function FillSalesBricksData() {
    var empID = $("#ddlDistributors").val();
    myData = "{'empID':'" + empID + "'}";
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesBrickRelation.asmx/listGetEmpSalesBricks",
        contentType: "application/json;",
        data: myData,
        dataType: "json",
        async: false,
        success: function (response, data, status) {
            $('#ddlbrick').empty();
            $("#ddlbrick").append("<option value='-1'>Select City </option>");
            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {//dist.ID,brick.ID brickID , brick.BrickCode ,brick.BrickName
                    $("#ddlbrick").append("<option value='" + option.brickID + "' data-brickcode='" + option.BrickCode + "' >" + option.BrickCode + " - " + option.BrickName + "</option>");
                });
            }
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

function FillDropDownList() {

    myData = "{'levelName':'Level3' }";

    $.ajax({
        type: "POST",
       // url: "../Reports/datascreen.asmx/FilterDropDownList",
        url: "../Reports/NewReports.asmx/fillGH",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: onSuccessFillDropDownList,
        error: onError,
        //beforeSend: startingAjax,
        //complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessFillDropDownList(data, status) {
    $("#ddl11").empty();
    if (data.d != "") {

       // jsonObj = jsonParse(data.d);
        $("#ddl11").append("<option value='-1'>Select National</option>");
        $.each(data.d, function (i, tweet) {
            $("#ddl11").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
            //$.each(jsonObj, function (i, tweet) {
            //    //$("#ddl11").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
            //    $("#ddl11").append("<option value='" + jsonObj[i].Item1 + "'>" + jsonObj[i].Item2 + "</option>");
            //});
        

    }
}

function OnChangeddl1() {
    levelValue = $('#ddl11').val();
    myData = "{'level3Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
           // url: "../Reports/datascreen.asmx/GetEmployee",
            url: "../Reports/NewReports.asmx/fillGH_L3",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl1,
            error: onError,
            //beforeSend: startingAjax,
            //complete: ajaxCompleted,
            cache: false
        });


    } else {

        document.getElementById('ddl22').innerHTML = "";
        document.getElementById('ddl33').innerHTML = "";
        document.getElementById('ddl44').innerHTML = "";
    }

}
function onSuccessFillddl1(data, status) {

    document.getElementById('ddl22').innerHTML = "";
    document.getElementById('ddl33').innerHTML = "";
    document.getElementById('ddl44').innerHTML = "";

    if (data.d != "") {

      //  jsonObj = jsonParse(data.d);

        $("#ddl22").append("<option value='-1'>Select Region</option>");

        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl22").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});
        $.each(data.d, function (i, tweet) {
            $("#ddl22").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }
}

function OnChangeddl2() {
    levelValue = $('#ddl22').val();
    myData = "{'level4Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
           // url: "../Reports/datascreen.asmx/GetEmployee",
            url: "../Reports/NewReports.asmx/fillGH_L4",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl2,
            error: onError,
            //beforeSend: startingAjax,
            //complete: ajaxCompleted,
            cache: false
        });
    } else {

        document.getElementById('ddl33').innerHTML = "";
        document.getElementById('ddl44').innerHTML = "";
    }


}
function onSuccessFillddl2(data, status) {

    document.getElementById('ddl33').innerHTML = "";
    document.getElementById('ddl44').innerHTML = "";

    if (data.d != "") {

       // jsonObj = jsonParse(data.d);

        $("#ddl33").append("<option value='-1'>Select Zone</option>");

        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl33").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});
        $.each(data.d, function (i, tweet) {
            $("#ddl33").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }
  
}

function OnChangeddl3() {



    levelValue = $('#ddl33').val();
    myData = "{'level5Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            //  url: "../Reports/datascreen.asmx/GetEmployee",
            url: "../Reports/NewReports.asmx/fillGH_L5",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl3,
            error: onError,
            cache: false
        });
    }
    else {
        document.getElementById('ddl44').innerHTML = "";
    }


}
function onSuccessFillddl3(data, status) {
    document.getElementById('ddl44').innerHTML = "";

    if (data.d != "") {

       // jsonObj = jsonParse(data.d);


        $("#ddl44").append("<option value='-1'>Select SPO</option>");
        $.each(data.d, function (i, tweet) {
            $("#ddl44").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
        //$.each(jsonObj, function (i, tweet) {
        //    $("#ddl44").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        //});
    }
  
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

 //   $('#imgLoading').hide();
}
function onSuccess(data, status) {

    if (data.d == "OK" || data.d == "Success") {

        mode = $('#hdnMode').val();
        msg = '';
        if (mode === "AddMode") {
            $("<div title='Alert'>Data inserted succesfully! </div>").dialog();
        }
        else if (mode === "EditMode") {
            $("<div title='Alert'>Data Updated succesfully! </div>").dialog();
        }
        else if (mode === "DeleteMode") {
            $("<div title='Alert'>Data deleted succesfully! </div>").dialog();
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
function startingAjax() {

  //  $('#imgLoading').show();
}

function Reset() {
    $('#ddl1').val(-1);
    $('#ddl2').val(-1);
    $('#ddl3').val(-1);
    $('#ddl4').val(-1);
    $('#ddlDistributors').val(-1);
    $('#ddlbrick').val(-1);
    
    $('#clientcode').val('');
    $('#clientName').val('');
  
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

    //GetCurrentUserLoginID();
}


function FillDistributorFilter() {

    var mydata = "{'EmployeeId':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "SaleClient.asmx/GetAllDistributor",//sp_getalldistributor
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
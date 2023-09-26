var table;
$(document).ready(function () {

    FillDropDownListtop();

    FillRegion();
    FillDropDownList();
    GetTerritoryBrickDetail();

    $('#ddl111').change(OnChangeddl11);
    $('#ddl222').change(OnChangeddl22);
    $('#ddl333').change(OnChangeddl33);
    $('#ddl444').change(OnChangeddl44);
    $('#ddl555').change(OnChangeddl55);


    $('#ddl11').change(OnChangeddl1);
    $('#ddl22').change(OnChangeddl2);
    $('#ddl33').change(OnChangeddl3);
    $('#ddl44').change(OnChangeddl4);
    $('#ddl55').change(OnChangeddl5);
    $('#ddl66').change(listGetSalesBricks);




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


});

function GetAlldata() {
    GetTerritoryBrickDetail();
}

function GetTerritoryBrickDetail() {

    var salesdistid = 0;//$('#ddlDistributors').val();

    var l1 = $('#ddl111').val();
    var l2 = $('#ddl222').val();
    var l3 = $('#ddl333').val();
    var l4 = $('#ddl444').val();
    var l5 = $('#ddl555').val();
    var l6 = $('#ddl666').val();
    var percen = $('#ddlimit').val();

    var myData = "{'Level1Id':'" + (l1 == null ? 0 : l1) + "','Level2Id':'" + (l2 == null ? 0 : l2) + "','Level3Id':'" + (l3 == null ? 0 : l3) + "','Level4Id':'" + (l4 == null ? 0 : l4) + "','Level5Id':'" + (l5 == null ? 0 : l5) + "','Level6Id':'" + (l6 == null ? 0 : l6) + "','DistributorID':'" + (salesdistid == '-1' ? 0 : salesdistid) + "','percentag':'" + (percen == '-1' ? 0 : percen) + "'}";//percentag percen
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesTerritorybrick.asmx/listGetTerritoryBrickDetail",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != "")
            {
            
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
    var brickwithcoma = [] ;
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
        url: "../BWSD/SalesTerritorybrick.asmx/InsertRelationalSalesBrick",
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
    var spoid = $('#ddl66').val();
    myData = "{'distributorCode':'" + distributorCode + "','TerritoryID':'" + spoid + "'}";
    $.ajax({
        type: "POST",
        url: "../BWSD/SalesTerritorybrick.asmx/listGeTeritorytSalesBricks",
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
                    $("#listbox2").append("<option value='" + option.ID + "'>" + option.BrickCode + " - " + option.BrickName + " - " + option.SalePercentage + "%"+"</option>");

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

    myData = "{'levelName':'Level1' }";

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

        $("#ddl11").append("<option value='-1'>Select BUH Manager</option>");
        $.each(data.d, function (i, tweet) {
            $("#ddl11").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }
}


function OnChangeddl11() {
    levelValue = $('#ddl111').val();
    myData = "{'level1Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L1",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl111,
            error: onError,
            //beforeSend: startingAjax,
            //complete: ajaxCompleted,
            cache: false
        });


    } else {

        document.getElementById('ddl222').innerHTML = "";
        document.getElementById('ddl333').innerHTML = "";
        document.getElementById('ddl444').innerHTML = "";
    }

}
function onSuccessFillddl111(data, status) {

    document.getElementById('ddl222').innerHTML = "";
    document.getElementById('ddl333').innerHTML = "";
    document.getElementById('ddl444').innerHTML = "";
    document.getElementById('ddl555').innerHTML = "";
    document.getElementById('ddl666').innerHTML = "";

    if (data.d != "") {

        $("#ddl222").append("<option value='-1'>Select GM Manager</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddl222").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }
}

function OnChangeddl22() {

    levelValue = $('#ddl222').val();
    myData = "{'level2Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            // url: "../Reports/datascreen.asmx/GetEmployee",
            url: "../Reports/NewReports.asmx/fillGH_L2",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl22,
            error: onError,
            //beforeSend: startingAjax,
            //complete: ajaxCompleted,
            cache: false
        });
    } else {

        document.getElementById('ddl333').innerHTML = "";
        document.getElementById('ddl444').innerHTML = "";
        document.getElementById('ddl555').innerHTML = "";
        document.getElementById('ddl666').innerHTML = "";
    }


}
function onSuccessFillddl22(data, status) {
    document.getElementById('ddl333').innerHTML = "";
    document.getElementById('ddl444').innerHTML = "";
    document.getElementById('ddl555').innerHTML = "";
    document.getElementById('ddl666').innerHTML = "";

    if (data.d != "") {

        $("#ddl333").append("<option value='-1'>Select National Manager</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddl333").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }

}


function OnChangeddl33() {

    levelValue = $('#ddl333').val();
    myData = "{'level3Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            url: "../Reports/NewReports.asmx/fillGH_L3",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl33,
            error: onError,
            cache: false
        });
    }
    else {
        document.getElementById('ddl444').innerHTML = "";
        document.getElementById('ddl555').innerHTML = "";
        document.getElementById('ddl666').innerHTML = "";
    }


}
function onSuccessFillddl33(data, status) {

    document.getElementById('ddl444').innerHTML = "";
    document.getElementById('ddl555').innerHTML = "";
    document.getElementById('ddl666').innerHTML = "";

    if (data.d != "") {

        $("#ddl444").append("<option value='-1'>Select Region Manager</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddl444").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }

}


function OnChangeddl44() {

    levelValue = $('#ddl444').val();
    myData = "{'level4Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            //  url: "../Reports/datascreen.asmx/GetEmployee",
            url: "../Reports/NewReports.asmx/fillGH_L4",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl44,
            error: onError,
            cache: false
        });
    }
    else {
        document.getElementById('ddl555').innerHTML = "";
        document.getElementById('ddl666').innerHTML = "";
    }


}
function onSuccessFillddl44(data, status) {

    document.getElementById('ddl555').innerHTML = "";
    document.getElementById('ddl666').innerHTML = "";

    if (data.d != "") {

        $("#ddl555").append("<option value='-1'>Select Zonal Manager</option>");
        $.each(data.d, function (i, tweet) {
            $("#ddl555").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });

    }

}


function OnChangeddl55() {

    levelValue = $('#ddl555').val();
    myData = "{'level5Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            //  url: "../Reports/datascreen.asmx/GetEmployee",
            url: "../Reports/NewReports.asmx/fillGH_L5",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl55,
            error: onError,
            cache: false
        });
    }
    else {
        document.getElementById('ddl666').innerHTML = "";
    }


}
function onSuccessFillddl55(data, status) {

    document.getElementById('ddl666').innerHTML = "";

    if (data.d != "") {

        $("#ddl666").append("<option value='-1'>Select SPO</option>");
        $.each(data.d, function (i, tweet) {
            $("#ddl666").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });

    }

}


function OnChangeddl1() {
    levelValue = $('#ddl11').val();
    myData = "{'level1Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
           // url: "../Reports/datascreen.asmx/GetEmployee",
            url: "../Reports/NewReports.asmx/fillGH_L1",
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
    document.getElementById('ddl55').innerHTML = "";
    document.getElementById('ddl66').innerHTML = "";

    if (data.d != "") {

        $("#ddl22").append("<option value='-1'>Select GM Manager</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddl22").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }
}

function OnChangeddl2() {

    levelValue = $('#ddl22').val();
    myData = "{'level2Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
           // url: "../Reports/datascreen.asmx/GetEmployee",
            url: "../Reports/NewReports.asmx/fillGH_L2",
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
        document.getElementById('ddl55').innerHTML = "";
        document.getElementById('ddl66').innerHTML = "";
    }


}
function onSuccessFillddl2(data, status) {

    document.getElementById('ddl33').innerHTML = "";
    document.getElementById('ddl44').innerHTML = "";
    document.getElementById('ddl55').innerHTML = "";
    document.getElementById('ddl66').innerHTML = "";

    if (data.d != "") {

        $("#ddl33").append("<option value='-1'>Select National Manager</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddl33").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }
  
}

function OnChangeddl3() {

    levelValue = $('#ddl33').val();
    myData = "{'level3Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            //  url: "../Reports/datascreen.asmx/GetEmployee",
            url: "../Reports/NewReports.asmx/fillGH_L3",
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
    document.getElementById('ddl55').innerHTML = "";
    document.getElementById('ddl66').innerHTML = "";

    if (data.d != "") {

        $("#ddl44").append("<option value='-1'>Select Zonal Manager</option>");

        $.each(data.d, function (i, tweet) {
            $("#ddl44").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });
    }

}

function OnChangeddl4() {

    levelValue = $('#ddl44').val();
    myData = "{'level4Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            //  url: "../Reports/datascreen.asmx/GetEmployee",
            url: "../Reports/NewReports.asmx/fillGH_L4",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl4,
            error: onError,
            cache: false
        });
    }
    else {
        document.getElementById('ddl55').innerHTML = "";
    }


}
function onSuccessFillddl4(data, status) {

    document.getElementById('ddl55').innerHTML = "";
    document.getElementById('ddl66').innerHTML = "";

    if (data.d != "") {

        $("#ddl55").append("<option value='-1'>Select Zonal Manager</option>");
        $.each(data.d, function (i, tweet) {
            $("#ddl55").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });

    }

}

function OnChangeddl5() {

    levelValue = $('#ddl55').val();
    myData = "{'level5Id':'" + levelValue + "' }";

    if (levelValue != -1) {

        $.ajax({
            type: "POST",
            //  url: "../Reports/datascreen.asmx/GetEmployee",
            url: "../Reports/NewReports.asmx/fillGH_L5",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl5,
            error: onError,
            cache: false
        });
    }
    else {
        document.getElementById('ddl66').innerHTML = "";
    }


}
function onSuccessFillddl5(data, status) {

    document.getElementById('ddl66').innerHTML = "";

    if (data.d != "") {

        $("#ddl66").append("<option value='-1'>Select SPO</option>");
        $.each(data.d, function (i, tweet) {
            $("#ddl66").append("<option value='" + tweet.Item1 + "'>" + tweet.Item2 + "</option>");
        });

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



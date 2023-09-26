// Global Variables
var mode = "", myData = "", jsonObj = "", msg = "";

// Events
function pageLoad() {

    $('#ddlBrick').select2({
        dropdownParent: $('#BrickDiv')
    });
    $('#ddlCity').select2({
        dropdownParent: $('#CityDiv')
    });
    $('#ddldist').select2({
        dropdownParent: $('#distdiv')
    });


    ClearFields();

    $('#btnCancel').click(btnCancelClicked);

    $2('#divConfirmation').jqm({ modal: true });
    $2('#Divmessage').jqm({ modal: true });

    GetCurrentUser();
    GetCities();
    GetDistributor();
    AllBrick();
    GridData();
}
//Meraj fill Grid
function GridData() {
    debugger;
    $('#gridDocBrick').parent().find('.loding_box_outer').show().fadeIn();
    $.ajax({
        type: "POST",
        url: "DocBrickRel.asmx/FillGridData",
        contentType: "application/json; charset=utf-8",
        success: onSuccessGrid,
        error: onError,
        cache: false
    });
}

function onSuccessGrid(data) {
    $('#gridDocBrick').empty();
    $('#gridDocBrick').append("<table id='grid-DocBRickrel' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
    $("#grid-DocBRickrel").empty();
    $("#grid-DocBRickrel").append("<thead>" +
        "<tr style='background-color: #217ebd;color: white;'>" +
         "<th>Distributor Code</th>" +
        "<th>Distributor Name</th> " +
        "<th>Brick Code</th> " +
        "<th>Brick Name</th> " +
        "<th>Brick City</th> " +
        "<th>EDIT</th> " +

        "</tr>" +
        "</thead>" +
        "<tbody id='values'>");
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
            $('#gridDocBrick').empty();
            $('#gridDocBrick').append("<table id='grid-DocBRickrel' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
            $("#grid-DocBRickrel").empty();
            $("#grid-DocBRickrel").append("<thead>" +
                "<tr style='background-color: #217ebd;color: white;'>" +
                "<th>Distributor Code</th>" +
                "<th>Distributor Name</th> " +
                "<th>Brick Code</th> " +
                "<th>Brick Name</th> " +
                "<th>Brick City</th> " +
                "<th>EDIT</th> " +
                "</tr>" +
                "</thead>" +
                "<tbody id='values'>");
            var val = '';
            for (var i = 0; i < msg.length ; i++) {
                val = "<tr>" +
                "<td>" + msg[i].DistributorCode + "</td>" +
                "<td>" + msg[i].DistributorName + "</td>" +
                "<td>" + msg[i].BrickCode + "</td>" +
                "<td>" + msg[i].BrickName + "</td>" +
                "<td>" + msg[i].City + "</td>" +
                "<td>" + "<input type='button' value='Edit' onClick=\"onEdit('" + msg[i].ID + "');\"  />" + "</td>";
                $('#values').append(val);
            }
            $('#grid-DocBRickrel').DataTable({
                "scrollX": false,
                deferRender: true,
                "bProcessing": true,
                "bDeferRender": true,
                responsive: true,
                columnDefs: [{ orderable: false, "targets": -1 }],
                dom: 'flBrtip',
                buttons: [{
                    extend: 'excel',
                    text: 'Download',
                    className: 'btnnor',
                    sheetName: 'Location Approval',
                    title: '',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                }]
            });
        }
    }
    $('#gridDocBrick').parent().find('.loding_box_outer').show().fadeOut();
}

//Meraj Drop for get the values of a Distributor list from Database SQL 
function GetDistributor() {
    $.ajax({
        type: "POST",
        url: "CityDistance.asmx/getAllDistributor",
        contentType: "application/json; charset=utf-8",
        success: onSuccessGetDist,
        error: onError,
        cache: false
    });
}
//On Success Distributor Drop down
function onSuccessGetDist(data, status) {
    document.getElementById('ddldist').innerHTML = "";
    if (data.d != "") {
        jsonObj = $.parseJSON(data.d);

        value = '-1';
        name = 'Select Distributor';
        $("#ddldist").append("<option value='" + value + "'>" + name + "</option>");
        $.each(jsonObj, function (i, tweet) {
            $("#ddldist").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].DistributorName + "</option>");
        });
    }
}

//Meraj Drop for get the values of a Brick list from Database SQL 
function AllBrick() {
    $.ajax({
        type: "POST",
        url: "DocBrickRel.asmx/getAllBrick",
        contentType: "application/json; charset=utf-8",
        success: onSuccessGetBrick,
        error: onError,
        cache: false
    });
}
//On Success Brick Drop down
function onSuccessGetBrick(data, status) {
    document.getElementById('ddlBrick').innerHTML = "";
    if (data.d != "") {
        jsonObj = $.parseJSON(data.d);

        value = '-1';
        name = 'Select Brick';
        $("#ddlBrick").append("<option value='" + value + "'>" + name + "</option>");
        $.each(jsonObj, function (i, tweet) {
            $("#ddlBrick").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].BrickName + "</option>");
        });
    }
}


//Drop down get Cities
function GetCities() {
    $.ajax({
        type: "POST",
        url: "../Form/Cities.asmx/getAllCities",
        contentType: "application/json; charset=utf-8",
        success: onSuccessGetCities,
        error: onError,
        cache: false
    });
}
//On Sucess Cities Drop down
function onSuccessGetCities(data, status) {
    document.getElementById('ddlCity').innerHTML = "";
    if (data.d != "") {

        jsonObj = $.parseJSON(data.d);

        value = '-1';
        name = 'Select City';
        $("#ddlCity").append("<option value='" + value + "'>" + name + "</option>");
        $.each(jsonObj, function (i, tweet) {
            $("#ddlCity").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].City + "</option>");
        });
    }
}

function GetCurrentUser() {

    $.ajax({
        type: "POST",
        url: "CommonService.asmx/GetCurrentUser",
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

function btnCancelClicked() {

    $('#hdnMode').val("AddMode");
    ClearFields();
    ajaxCompleted();
    $("#btnRefresh").trigger('click');
    return false;
}


//Meraj Edit Button on click Function
function onEdit(ID) {
    ClearFields();
    $('#hdnMode').val("EditMode");
    myData = "{'BrickId':'" + ID + "'}";
    $.ajax({
        type: "POST",
        url: "DocBrickRel.asmx/EditGridData",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetBrickData,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function onSuccessGetBrickData(data, status) {

    if (data.d != "") {

        jsonObj = $.parseJSON(data.d);

        $('#ddldist').val(jsonObj[0].DistributorID).select2();
        $('#ddlBrick').val(jsonObj[0].ID).select2();
        $('#ddlCity').val(jsonObj[0].CityID).select2();

    }
}

//ON EDIT UPDATE CITY BRICK
function updateCity() {

    //Meraj 
    if ($('#ddldist').val() == -1) {
        window.alert('Please Select Row!');
        return false;
    }
    if ($('#ddlBrick').val() == -1) {
        window.alert('Please Select Row!');
        return false;
    }
    if ($('#ddlCity').val() == -1) {
        window.alert('Please Select Brick City!');
        return false;
    }

    var checkstr = confirm('are you sure you want to edit this?');
    if (checkstr == true) {
        $('#Loding').show().fadeIn();

        myData = "{'BrickID':'" + $('#ddlBrick').val() + "','City':'" + $('#ddlCity').val() + "'}";

        $.ajax({
            type: "POST",
            url: "DocBrickRel.asmx/UpdateBrick",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessBrick,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false,
            async: false
        });
    }
    else {
        return false;
    }
}

function onSuccessBrick() {
    alert("City Updated Successfully!");
    ClearFields();
    GridData();
    $('#Loding').show().fadeOut();
}


function ajaxCompleted() {

    $2('#imgLoading').hide();
}

function onError(request, status, error) {

    msg = 'Error occoured';

    $2.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });

    $2('#imgLoading').hide();
}
function startingAjax() {

    $2('#imgLoading').show();
}
function ClearFields() {
    $('#hdnMode').val("AddMode");
    $('#ddlBrick').val('-1').trigger('change');
    $('#ddlCity').val('').trigger('change');
    $('#ddldist').val('-1').trigger('change');

}
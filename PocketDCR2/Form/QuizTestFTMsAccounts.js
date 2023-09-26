
var globalftmid = 0;
//var validation;
//var validationInsertRegionRules;
//var validationInsertRegionMessages;


$(document).ready(function () {

    $2('#divConfirmation').jqm({ modal: true });
    $2('#Divmessage').jqm({ modal: true });

    GetAllNationals();
    //GetAllRegions();

    FillAllFTMsGrid();

    $('#btnOk').click(OKClick)

    
    //validation = $('#form1').validate({
    //    errorelement: "div",
    //    errorclass: "help-block help-block-error",
    //    focusinvalid: !1, ignore: "",
    //    highlight: function (e) { $(e).closest(".form-group").addclass("has-error") },
    //    unhighlight: function (e) { $(e).closest(".form-group").removeclass("has-error") },
    //    success: function (e) { e.closest(".form-group").removeclass("has-error") },
    //});

    //validationInsertRegionRules = {
    //    nationalDD: { required: true },        
    //};

    //validationInsertRegionMessages = {        
    //    nationalDD: {
    //        required: 'Please select national'
    //    }
    //};

});


function GetAllNationals() {

    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/GetAllNationals",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetAllNationals,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetAllNationals(data, status) {

    if (data.d != "") {

        var jsonObj = jsonParse(data.d);
        $("#nationalDD").append("<option value=''>Select National</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#nationalDD").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        });
    }
}


function GetAllRegions() {

    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/GetAllRegions",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetAllRegions,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetAllRegions(data, status) {

    if (data.d != "") {

        var jsonObj = jsonParse(data.d);

        $("#regionDD").empty();
        $("#regionDD").append("<option value=''>Select Region</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#regionDD").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        });
    }
}


function onChangeNationalDD() {

    var nationalid = $('#nationalDD').val();
    if (nationalid != '')
    {
        $.ajax({
            type: "POST",
            url: "QuizTestService.asmx/GetAllRegionsByNationalId",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"id":"' + nationalid + '"}',
            success: onSuccessGetAllRegionsByNationalId,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    else
    {
        $('#regionDD').empty();
        //$('#regionDD').attr('disabled', 'disabled')
    }
}
function onSuccessGetAllRegionsByNationalId(data, status) {

    if (data.d != '') {

        var jsonObj = jsonParse(data.d);

        //$('#regionDD').removeAttr('disabled');

        $("#regionDD").empty();
        //$("#regionDD").append("<option value=''>Select Region</option>");

        //$.each(jsonObj, function (i, tweet) {
        //    $("#regionDD").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        //});

        $.each(jsonObj, function (i, tweet) {
            $("#regionDD").append("<div class='col-md-4'><label style='cursor: pointer;'><input type='checkbox' name='regionCheckboxes' class='regionCheckboxes' style='vertical-align: top;' value='" + tweet.LevelId + "' />&nbsp;" + tweet.LevelName + "</label></div>");
        });
    }

}



function FillAllFTMsGrid() {
    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/FillFTMsGrid",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessFillAllFTMsGrid,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}
function onSuccessFillAllFTMsGrid(data, status) {
    var tabledata = "";

    $('#FTMsListGrid').empty();
    $('#FTMsListGrid').append('<table class="table table-striped table-bordered" id="FTMsRecord">' +
            '<thead>' +
                '<tr>' +
                    '<th style="width: 50px;">S.No:</th>' +
                    '<th style="width: 150px;">Login Id</th>' +
                    '<th style="width: 200px;">Employee Name</th>' +
                    '<th style="width: 150px;">Mobile Number</th>' +
                    '<th style="width: 150px;">Division</th>' +
                    '<th style="width: 150px;">Region</th>' +
                    '<th style="width: 150px;">Zone</th>' +
                    '<th style="width: 100px;">Territory</th>' +
                    '<th style="width: 110px;"></th>' +
                '</tr>' +
            '</thead>' +
            '<tbody id="FTMsList">');

    if (data.d != '') {
        var jsonObj = jsonParse(data.d);

        for (var i = 0; i < jsonObj.length; i++) {

            tabledata += "<tr>" +
                    "<td style='vertical-align: middle;'>" + (i + 1) + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].LoginId + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].EmployeeName + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].MobileNumber + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].Division + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].Region + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].Zone + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].Territory + "</td>" +
                    "<td style='vertical-align: middle;'>" +
                        "<button type='button' onclick='SetRegions(" + jsonObj[i].EmployeeId + ");' class='btn btn-xs btn-success' data-toggle='tooltip' title='Assign Region'><i class='fa fa-pencil'></i></button>&nbsp;" +
                        "<button type='button' onclick='ViewRegions(" + jsonObj[i].EmployeeId + ");' class='btn btn-xs btn-primary' data-toggle='tooltip' title='View'><i class='fa fa-eye'></i></button>&nbsp;" +
                    "</td>" +
                "</tr>";
        }
        //tabledata += "</tbody></table>";

        $('#FTMsList').append(tabledata);
        $('#FTMsListGrid').append('</tbody></table>');
    }
    if (!$.fn.DataTable.isDataTable('#FormsRecord')) {
        $('#FTMsRecord').DataTable({
            "columnDefs": [
                    { "orderable": false, "targets": -1 }
            ]
        });
    }
    else {
        $('#FTMsRecord').DataTable({
            "columnDefs": [
                    { "orderable": false, "targets": -1 }
            ]
        });
    }
}



function ViewRegions(id) {
    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/ViewRegions",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"ftmid":"' + id + '"}',
        success: onSuccessViewRegions,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}
function onSuccessViewRegions(data, status) {
    var tabledata = "";

    $('#FTMRegionsModal').find('.summaryBody').empty();
    $('#FTMRegionsModal').find('.summaryBody').append('<table class="table table-striped table-bordered" id="RegionsRecord">' +
            '<thead>' +
                '<tr>' +
                    '<th style="width: 50px;">S.No:</th>' +
                    '<th style="width: 150px;">National</th>' +
                    '<th style="width: 200px;">Region</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody id="RegionsList">');

    if (data.d != '') {
        var jsonObj = jsonParse(data.d);

        for (var i = 0; i < jsonObj.length; i++) {

            tabledata += "<tr>" +
                    "<td style='vertical-align: middle;'>" + (i + 1) + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].Level3 + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].Level4 + "</td>" +
                "</tr>";
        }

        $('#RegionsList').append(tabledata);
        $('#FTMRegionsModal').find('.summaryBody').append('</tbody></table>');
    }

    if (!$.fn.DataTable.isDataTable('#RegionsRecord')) {
        $('#RegionsRecord').DataTable();
    }
    else {
        $('#RegionsRecord').DataTable();
    }

    $('#FTMRegionsModal').modal('show');
}


function SetRegions(ftmid) {
    
    clearSetRegionModalFields();

    globalftmid = ftmid;

    refreshFTMRegionsGrid(globalftmid);

    //$('#regionDD').attr('disabled', 'disabled');

    $('#SetFTMRegionsModal').modal('show');
}

function SaveRegion() {
    
    //validation.resetForm();
    //validation.settings.rules = validationInsertRegionRules;
    //validation.settings.messages = validationInsertRegionMessages;

    //if (!$('#form1').valid()) {
    //    return false;
    //}
    //else
    //{
        var nationalid = $('#nationalDD').val();
        var regionIds = [];
        var checkedboxes = document.querySelectorAll('input[name=regionCheckboxes]:checked');
        if (checkedboxes.length > 0) {
            for (var i = 0; i < checkedboxes.length; i++) {
                regionIds.push(checkedboxes[i].value);
            }

            $.ajax({
                type: "POST",
                url: "QuizTestService.asmx/SaveRegion",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: '{"ftmid":"' + globalftmid + '","nationalid":"' + nationalid + '","regionId":"' + regionIds + '"}',
                success: onSuccessSaveRegion,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                async: false,
                cache: false
            });

        }
        else
        {
            $('#Divmessage').find('.jqmTitle').html('Alert!');
            $('#Divmessage').find('#hlabmsg').html('You must select atleast one region!');
            $2('#Divmessage').jqmShow();
        }
    //}    
}
function onSuccessSaveRegion(data, status) {

    if (data.d == 'Saved') {
        $('#Divmessage').find('.jqmTitle').html('Success!');
        $('#Divmessage').find('#hlabmsg').html('Data successfully inserted!');
        $2('#Divmessage').jqmShow();
    }
    else
    {
        $('#Divmessage').find('.jqmTitle').html('Alert!');
        $('#Divmessage').find('#hlabmsg').html('Data not saved!');
        $2('#Divmessage').jqmShow();
    }

    //$('#regionDD').attr('disabled', 'disabled');


    refreshFTMRegionsGrid(globalftmid);


    $('#nationalDD').val('');
    $('#regionDD').empty();

}


function refreshFTMRegionsGrid(id) {
    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/ViewRegions",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"ftmid":"' + id + '"}',
        success: onSuccessrefreshFTMRegionsGrid,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}
function onSuccessrefreshFTMRegionsGrid(data, status) {

    var tabledata = "";

    $('#SetFTMRegionsModal').find('#FillFTMRegions').empty();
    $('#SetFTMRegionsModal').find('#FillFTMRegions').append('<table class="table table-striped table-bordered" id="FTMRegionsRecord">' +
            '<thead>' +
                '<tr>' +
                    '<th style="width: 50px;">S.No:</th>' +
                    '<th style="width: 150px;">National</th>' +
                    '<th style="width: 200px;">Region</th>' +
                    '<th style="width: 60px;"></th>' +
                '</tr>' +
            '</thead>' +
            '<tbody id="FTMRegionsList">');

    if (data.d != '') {
        var jsonObj = jsonParse(data.d);

        for (var i = 0; i < jsonObj.length; i++) {

            tabledata += "<tr>" +
                    "<td style='vertical-align: middle;'>" + (i + 1) + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].Level3 + "</td>" +
                    "<td style='vertical-align: middle;'>" + jsonObj[i].Level4 + "</td>" +
                    "<td style='vertical-align: middle;'>" +
                        "<button type='button' onclick='DeleteRegion(" + jsonObj[i].ID + ");' class='btn btn-xs btn-danger' data-toggle='tooltip' title='Delete'><i class='fa fa-times'></i></button>&nbsp;" +
                    "</td>" +
                "</tr>";
        }

        $('#FTMRegionsList').append(tabledata);
        $('#SetFTMRegionsModal').find('#FillFTMRegions').append('</tbody></table>');
    }

    if (!$.fn.DataTable.isDataTable('#FTMRegionsRecord')) {
        $('#FTMRegionsRecord').DataTable();
    }
    else {
        $('#FTMRegionsRecord').DataTable();
    }

}


function DeleteRegion(id)
{
    $.ajax({
        type: "POST",
        url: "QuizTestService.asmx/DeleteRegion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"id":"' + id + '"}',
        success: onSuccessDeleteRegion,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}
function onSuccessDeleteRegion(data, status) {
    if (data.d == 'Deleted') {
        $('#Divmessage').find('.jqmTitle').html('Success!');
        $('#Divmessage').find('#hlabmsg').html('Data deleted successfully!');
        $2('#Divmessage').jqmShow();

        refreshFTMRegionsGrid(globalftmid);

    }
    else {
        $('#Divmessage').find('.jqmTitle').html('Alert!');
        $('#Divmessage').find('#hlabmsg').html('Data not deleted!');
        $2('#Divmessage').jqmShow();
    }
    
    $('#nationalDD').val('');
    $('#regionDD').empty();
}



function clearSetRegionModalFields() {

    globalftmid = 0;
    $('#nationalDD').val('');
    $('#regionDD').empty();
}


function onError(request, status, error) {
    $('#Divmessage').find('#hlabmsg').empty();
    $('#Divmessage').find('#hlabmsg').text('Error is occured.');
    $2('#Divmessage').jqmShow();
}

function startingAjax() {
    $('#UpdateProgress1').show();
}

function ajaxCompleted() {
    $('#UpdateProgress1').hide();
}

function OKClick() {
    $2('#Divmessage').jqmHide();
}
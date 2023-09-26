// Global Variables
var ClassId = 0;
var id = 0;
var myData = "", mode = "", msg = "", jsonObj = "", miodet = "";
var today = "";
var Datetoday = "";
var empidd = "";
var LevelId5 = "";
var LevelId4 = "";


//pAGE LOAD
var valid = "";
$(document).ready(function () {
    Datetoday = new Date();//.toJSON().slice(0, 10);
    var day = Datetoday.getDate();
    var month = Datetoday.getMonth() + 1;
    today = Datetoday.getFullYear() + "/" + month + "/" + day;

    $('#putdate').html(day + '-' + month + '-' + Datetoday.getFullYear());

    var a = $.cookie('next');
    var b = $.cookie('lastdoc');
    var D_cls = $.cookie('cls');
    var TimeForCall = $.cookie('TimeForCall');
    var c = $.cookie('flmname');
    empidd = c.split('-')[0];
    var d = $.cookie('flmmobile');
    var lat = $.cookie('lat');
    var lan = $.cookie('lan');
    var jv = $.cookie('jv');
    valid = $.cookie('type');
    miodet = c;
    var name = c.split('-');
    $('#imagediv').empty();
    $('#imagediv').append('<img src="../TeamImages/' + name[0] + '_image.jpg" style="" width="100%" height="100%; " />');
    $('#medrepname').text(c.split('-')[1]);
    $('#medrep').html(c);
    if (jv == 'Flm') {
        $('#desig').text('First Line Manager');
        $('#lastdoc').html(b);
    }
    else if (jv == 'medrep') {
        $('#desig').text('MedRep');
        $('#lastdoc').html(b);
    }
    else if (jv == '1') {
        $('#desig').text('First Line Manager');
        $('#lastdoc').html(b);
    }
    else {
        $('#lastdoc').html('--');
    }
    $('#nextdoc').html(a);
    $('#num').text(d);
    $('#btnsales').attr("href", "Salesfeedback.aspx");
    if (jv == "Flm") {
        $('#btndayview').hide();
        $('#btnBricks').hide();
       // $('#btngoogleroute').hide();
    }
    else if (jv == "1") {
        $('#btndayview').hide();
        $('#btnBricks').hide();
       // $('#btngoogleroute').hide();
    }
    initMap(lat, lan, b, D_cls, jv, TimeForCall);

    //fillgridSpotCheck();

    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#btnOk').click(btnOkClicked);

    $('#divConfirmation').jqm({ modal: true });
    $('#Divmessage').jqm({ modal: true });
});

function initMap(lat, lan, DocDetails, d_cls, jv, TimeForCall) {
    //24.868683, 67.0641357
    //lat = (lat == "") ? "24.8490202" : lat;
    //lan = (lan == "") ? "66.9784621" : lan;
    var locations = [
  { Latitude: lat, Longitude: lan }];
    var Doc_DetailArry = DocDetails.split('-');
    var doc_name = Doc_DetailArry[1];
    var data = locations[0]
    var myLatLng;
    var DocdetailHTML;


    if (jv == 'Flm') {
        DocdetailHTML = "<div>" + "<strong>Doctor Name: </strong>" + doc_name + "<br>" + "<strong>Class: </strong>" + d_cls + " <br> <strong>Coaching Call </strong> <br> <strong>Time For Calls: </strong>" + TimeForCall + "</div>";
        myLatLng = { lat: parseFloat(lat), lng: parseFloat(lan) };

        var map = new google.maps.Map($("#mapppp")[0], {
            zoom: 12,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var infoWindow = new google.maps.InfoWindow();
        var latlngbounds = new google.maps.LatLngBounds();

        // var myLatlng = new google.maps.LatLng(lat, lan);

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: data.title
        });
        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                infoWindow.setContent(DocdetailHTML);
                infoWindow.open(map, marker);
            });
        })(marker, data);
        latlngbounds.extend(marker.position);

        var bounds = new google.maps.LatLngBounds();
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);
    }
    else if (jv == 'medrep') {
        DocdetailHTML = "<div>" + "<strong>Doctor Name: </strong>" + doc_name + "<br>" + "<strong>Class: </strong>" + d_cls + " <br> <strong>Time For Calls: </strong>" + TimeForCall + " </div>";
        myLatLng = { lat: parseFloat(lat), lng: parseFloat(lan) };

        var map = new google.maps.Map($("#mapppp")[0], {
            zoom: 12,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var infoWindow = new google.maps.InfoWindow();
        var latlngbounds = new google.maps.LatLngBounds();

        // var myLatlng = new google.maps.LatLng(lat, lan);

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: data.title
        });
        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                infoWindow.setContent(DocdetailHTML);
                infoWindow.open(map, marker);
            });
        })(marker, data);
        latlngbounds.extend(marker.position);

        var bounds = new google.maps.LatLngBounds();
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);
    }
    else if (jv == '1') {
        DocdetailHTML = "<div>" + "<strong>Doctor Name: </strong>" + doc_name + "<br>" + "<strong>Class: </strong>" + d_cls + "  <br> <strong>Time For Calls: </strong>" + TimeForCall + "</div>";
        myLatLng = { lat: parseFloat(lat), lng: parseFloat(lan) };

        var map = new google.maps.Map($("#mapppp")[0], {
            zoom: 12,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var infoWindow = new google.maps.InfoWindow();
        var latlngbounds = new google.maps.LatLngBounds();

        // var myLatlng = new google.maps.LatLng(lat, lan);

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: data.title
        });
        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                infoWindow.setContent(DocdetailHTML);
                infoWindow.open(map, marker);
            });
        })(marker, data);
        latlngbounds.extend(marker.position);

        var bounds = new google.maps.LatLngBounds();
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);
    }
    else {
        myLatLng = { lat: parseFloat('30.3753'), lng: parseFloat('69.3451') };
        var map = new google.maps.Map($("#mapppp")[0], {
            zoom: 5,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var infoWindow = new google.maps.InfoWindow();
        var latlngbounds = new google.maps.LatLngBounds();
    }




    //var marker = new google.maps.Marker({
    //    position: myLatLng,
    //    map: map,
    //    title: data.title
    //    });
    //(function (marker, data) {
    //    google.maps.event.addListener(marker, "click", function (e) {
    //        infoWindow.setContent("<div>"+"<strong>Place Name:</strong>test<br><strong>Time:</strong>test<br><strong>Activity:</strong>test</div>");
    //        infoWindow.open(map, marker);
    //    });
    //})

}

//function fillgridSpotCheck() {
//    var a = miodet.split('-');
//    var mydata = "{'mio':'" + a[0] + "','rType': '" + valid + "'}";
//    $.ajax({
//        type: "POST",
//        url: "SpotCheck.asmx/GetDataInGridSpotCheck",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        data: mydata,
//        success: successSpotCheck,
//        error: onError,
//        beforeSend: startingAjax,
//        complete: ajaxCompleted,
//        cache: false
//    });

//}

//function successSpotCheck(data, status) {

//    if (valid != "Flm") {
//        $('#gridSpotcheck').empty();
//        $('#gridSpotcheck').prepend($('<table id="datatab"  class="rwd-table"><thead style="background-color:whitesmoke;">' +
//                                            '<tr"><th>Check Date</th><th>Last DR Visit</th>' +
//                                            '<th>Next DR Visit</th><th>Location</th><th>Joint Visit</th><th>Delete</th></tr></thead><tbody id="griddata"></tbody></table>'));
//        if (data.d != "No") {
//            jsonObj = jsonParse(data.d);

//            $.each(jsonObj, function (i, option) {
//                $('#griddata').append($("<tr style='text-align:center;'><td class='ob_ST'>" + option.ChkDate + "</td>"

//                     + " <td class='ob_ST'>" + option.LastDrVisitID + "</td>"
//                      + " <td class='ob_ST'>" + option.NextDrVisitID + "</td>"
//                       + " <td class='ob_ST'>" + option.LocationPerPlan + "</td>"
//                        + " <td class='ob_ST'>" + option.JointVisit + "</td>"

//                    + "<td class='ob_text'>"
//                    + '<a href="#" onclick="Grid_Delete(' + option.ID + ');return false">Delete</a>' + '</td></tr>'));
//            });
//        }

//        $('#datatab').dataTable({
//            "language": {
//                "emptyTable": "No data available in table"
//            }
//        });
//    }
//    else {
//        $('#gridSpotcheck').empty();
//        $('#gridSpotcheck').prepend($('<table id="datatab"  class="rwd-table"><thead style="background-color:whitesmoke;">' +
//                                            '<tr"><th>Check Date</th>' +
//                                            '<th>Location</th><th>Joint Visit</th><th>Delete</th></tr></thead><tbody id="griddata"></tbody></table>'));
//        if (data.d != "No") {
//            jsonObj = jsonParse(data.d);

//            $.each(jsonObj, function (i, option) {
//                $('#griddata').append($("<tr style='text-align:center;'><td class='ob_ST'>" + option.ChkDate + "</td>"
//                        + " <td class='ob_ST'>" + option.LocationPerPlan + "</td>"
//                        + " <td class='ob_ST'>" + option.JointVisit + "</td>"

//                    + "<td class='ob_text'>"
//                    + '<a href="#" onclick="Grid_Delete(' + option.ID + ');return false">Delete</a>' + '</td></tr>'));
//            });
//        }

//        $('#datatab').dataTable({
//            "language": {
//                "emptyTable": "No data available in table"
//            }
//        });
//    }
////}

function btnCancelClicked() {

    $('#hdnMode').val("AddMode");
    ClearFields();
    ajaxCompleted();
    $("#btnRefresh").trigger('click');
    return false;
}
function btnYesClicked() {

    myData = "{'id':'" + id + "'}";

    $.ajax({
        type: "POST",
        url: "SpotCheck.asmx/Delete",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
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

function SaveData() {
    if ($('#ddllocation').val() == '-1') {
        alert("Please select the fields")
        return false;
    }
    if ($('#ddljv').val() == '-1') {
        alert("Please select the fields")
        return false;
    }

    $('#hdnMode').val("AddMode");
    var chkdate = $('#putdate').html();
    var medrep = $('#medrep').html();
    medrep = medrep.split('-');
    var lastdoc = $('#lastdoc').html();
    lastdoc = lastdoc.split('-');
    var nextdoc = $('#nextdoc').html();
    nextdoc = nextdoc.split('-');
    var locationpp = $('#ddllocation').val();
    var ddljv = $('#ddljv').val();

    var myData = "{'cDate':'" + chkdate + "','Medid':'" + medrep[0] + "','Medrep':'" + medrep[1] + "','rType':'" + valid + "','lastdoc':'" + lastdoc[0] + "','nextdoc':'" + nextdoc[0] + "','location':'" + locationpp + "','ddljv':'" + ddljv + "'}"

    $.ajax({
        type: "POST",
        url: "SpotCheck.asmx/InsertFeedback",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

}

function btnSaveClicked() {

    //var isValidated = $('#form1').validate({
    //    rules: {
    //        txtStretchedTarget: {
    //            required: true,
    //            alpha: true
    //        }
    //    }
    //});

    //if (!$('#form1').valid()) {
    //    return false;
    //}

    mode = $('#hdnMode').val();

    if (mode === "") {

        mode = "AddMode";
    }

    if (mode === "AddMode") {
        SaveData();
    }

    else if (mode === "EditMode") {
        UpdateData();//Update
    }
    else {
        return false;
    }

    return false;
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

function UpdateData() {
    if ($('#ddllocation').val() == '-1') {
        alert("Please select the fields")
        return false;
    }
    if ($('#ddljv').val() == '-1') {
        alert("Please select the fields")
        return false;
    }

    var chkdate = $('#putdate').html();
    var medrep = $('#medrep').html();
    var lastdoc = $('#lastdoc').html();
    var nextdoc = $('#nextdoc').html();
    var locationpp = $('#ddllocation').val();
    var ddljv = $('#ddljv').val();

    var myData = "{'cDate':'" + chkdate + "','Medrep':'" + medrep + "','lastdoc':'" + lastdoc + "','nextdoc':'" + nextdoc + "','location':'" + locationpp + "','ddljv':'" + ddljv + "','id':'" + id + "'}"
    //string cDate, string Medrep, string lastdoc, string nextdoc, string location, string ddljv, int id
    $.ajax({
        type: "POST",
        url: "SpotCheck.asmx/Update",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccess(data, status) {

    if (data.d == "OK") {

        mode = $('#hdnMode').val();
        msg = '';

        if (mode === "AddMode") {
            msg = 'Data inserted succesfully!';
            fillgridSpotCheck();
        }
        else if (mode === "EditMode") {
            msg = 'Data updated succesfully!';
            fillgridSpotCheck();
        }
        else if (mode === "DeleteMode") {
            $('#divConfirmation').jqmHide();
            msg = 'Data deleted succesfully!';

        }

        ClearFields();

        $('#hdnMode').val("");
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();


    }
    else if (data.d == "Duplicate Name!") {
        msg = 'already exist! Try different';
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

function Grid_Edit(sender) {
    $('#hdnMode').val("EditMode");
    id = sender;

    var mydata = "{'ID':'" + id + "'}";

    $.ajax({
        type: "POST",
        url: "SpotCheck.asmx/Edit",
        contentType: "application/json; charset=utf-8",
        data: mydata,
        success: OnsuccessEdit,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function Grid_Delete(sender) {
    id = sender;
    myData = "{'id':'" + id + "'}";

    $.ajax({
        type: "POST",
        url: "SpotCheck.asmx/Delete",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            fillgridSpotCheck();
            ClearFields();
            alert('Data Deleted Successfully')
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function OnsuccessEdit(data) {
    var msg = $.parseJSON(data.d);

    $('#medrep').html(msg[0].RepresentativeName);
    $('#lastdoc').html(msg[0].LastDrVisitID);
    $('#nextdoc').html(msg[0].NextDrVisitID);
    $('#ddllocation').val(msg[0].LocationPerPlan);
    $('#ddljv').val(msg[0].JointVisit);
}

function startingAjax() {

    $('#imgLoading').show();
}
function ClearFields() {

    //   $('#txtStretchedTarget').val("");

}
function ajaxCompleted() {

    $('#imgLoading').hide();
}

function dayview() {
    var a = miodet.split('-');
    var myData = "{'employeeId':'" + a[0] + "','dateTime':'" + today + "'}";

    $.ajax({
        type: "POST",
        url: "../Form/SchdulerDayView.asmx/GetSchedulerDayView",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: onsuccessday,
        cache: false

    });
}

function onsuccessday(data) {
    $('#daydetail').empty();
    $('#popuptitle').text('Day View');
    $('#daydetail').prepend($('<table id="datatabb"  class="rwd-table"><thead style="background-color:whitesmoke;">' +
                                        '<tr"><th>Doctor Name</th><th> Start Time </th>' +
                                        '<th>End Time</th></tr></thead><tbody id="gridddata"></tbody></table>'));
    if (data.d != "No") {
        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, option) {
            $('#gridddata').append($("<tr style='text-align:center;'><td class='ob_ST'>" + option.DoctorName + "</td>"
                 + " <td class='ob_ST'>" + option.startdate + "</td>"
                   + " <td class='ob_ST'>" + option.enddate + "</td></tr>"));
        });
    }

    $('#datatabb').DataTable({
        "language": {
            "lengthMenu": "Display _MENU_ records per page"
        }

    });
    //$('datatabb').dataTable({ bFilter: false, bInfo: false });
}

function onSuccessgetMIOlast(data, status) {
    try{

        if (data.d != '') {

            var jSon = $.parseJSON(data.d);
            $('#daydetail').empty();
            $('#popuptitle').text('Daily Call Report');
            $('#daydetail').prepend($('<table id="datatabb"  class="rwd-table"><thead ><tr><th >Last Dr Visit Time</th><th >FLM Name</th><th >Associate Name</th><th >Last Dr Visited</th><th >Next Dr Visit</th><th >Plan Status</th><th >Area</th></tr> </thead><tbody id="gridddata"></tbody></table>'));

            //$('#miodetails').empty();
            //$('#miodetails').append('<div style="z-index:999" id="popup1"  class="overlay dataTables_wrapper no-footer"><div class="popup" > <h2>Daily Call Report</h2><a class="close" href="#">&times;</a><br />' +
            //    '<div class="content"  >'
            //    +
            //    '<table id="lastvisittb"  class="table" ><thead ><tr><th>Last Dr Visit Time</th><th>FLM Name</th><th>Associate Name</th><th>Last Dr Visited</th><th>Next Dr Visit</th><th>Plan Status</th></tr> </thead>'
            //    + '<tbody id="LastValues" ></tbody>');

            $.each(jSon, function (i, temp) {

                var nextdoc = temp.nextdoc.split('-');
                var mail = "";

                // fixed Condition ↓ 
                if (temp.Type == "FLM") {
                    //if (temp.Type == "1") {
                    var name = temp.FlmName.split('-');
                    var associat = temp.name.split('-');
                    $('#gridddata').append('<tr><td>' + temp.TimeForCall + '</td><td>' + name[1] + '</td><td>' + associat[1] + '</td><td>' + temp.lastdocvisit + '</td><td>' + temp.nextdoc + '</td><td>' + temp.PlanStatus + '</td><td>' + temp.LevelName + '</td></tr>');

                } else {
                    var name = temp.FlmName.split('-');
                    var associat = temp.name.split('-');
                    $('#gridddata').append('<tr><td>' + temp.TimeForCall + '</td><td>' + name[1] + '</td><td>' + associat[1] + '</td><td>' + temp.lastdocvisit + '</td><td>' + temp.nextdoc + '</td><td>' + temp.PlanStatus + '</td><td>' + temp.LevelName + '</td></tr>');
                }

            });

            $('#datatabb').DataTable({
                "language": {
                    "lengthMenu": "Display _MENU_ records per page"
                }

            });
            //var href = $('#asd').attr('href');
            //window.location.href = href;

        }

    }
    catch(Ex)
    {
        alert(Ex);
    }
    

    //$('#preloader').hide();
}

function dailycall() {

    //alert(valid);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (valid == 'medrep') {
        getMIODeatailshow();
        //alert(valid);
    } else {

        //alert(valid+'not med rep');
        $('#preloader').show();
        $.ajax({
            type: "POST",
            url: "../Form/GetHierarchyDetailsService.asmx/Mfillflmdetailslastvisit",
            data: "{'empid' : '" + empidd + "','type':'" + valid + "'}",
            contentType: "application/json",
            async: false,
            success: onSuccessgetMIOlast,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
}

function getMIODeatailshow(empid, type) {
    $('#preloader').show();
    $.ajax({
        type: "POST",
        url: "../Form/GetHierarchyDetailsService.asmx/MfillMIOdetailslastvisit",
        data: "{'empid' : '" + empidd + "','type':'" + valid + "'}",
        contentType: "application/json",
        async: false,
        success: onSuccessMIODeatailshow,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function onSuccessMIODeatailshow(data, status) {
    if (data.d != '') {
        var jSon = $.parseJSON(data.d);
        $('#daydetail').empty();
        $('#popuptitle').text('Daily Call Report');
        $('#daydetail').prepend($('<table id="datatabb"  class="rwd-table"><thead ><tr><th>Last Dr Visit Time</th><th>FLM Name</th><th>Associate Name</th><th>Last Dr Visited</th><th>Next Dr Visit</th><th>Plan Status</th></tr> </thead><tbody id="gridddata"></tbody></table>'));

        //$('#miodetails').append('<div style="z-index:999" id="popupp1"  class="overlay dataTables_wrapper no-footer"><div class="popup" > <h2>Daily Call Report</h2><a class="close" href="#">&times;</a><br />' +
        //    '<div class="content"  >'
        //    + '<table id="lastvisittb"  class="table" ><thead ><tr><th>Last Dr Visit Time</th><th>Associate Name</th><th>Last Dr Visited</th><th>Next Dr Visit</th><th>Plan Status</th></tr> </thead>'
        //    + '<tbody id="LastValues" >');
        $.each(jSon, function (i, temp) {
            var nextdoc = temp.nextdoc.split('-');
            var mail = "";
            if (temp.Type == "FLM") {
                var name = temp.FlmName.split('-');
                var associat = temp.name.split('-');
                $('#gridddata').append('<tr><td>' + temp.TimeForCall + '</td><td>' + name[1] + '</td><td>' + associat[1] + '</td><td>' + temp.lastdocvisit + '</td><td>' + temp.nextdoc + '</td><td>' + temp.PlanStatus + '</td></tr>');
            } else {
                var name = temp.name.split('-');
                $('#gridddata').append('<tr><td>' + temp.TimeForCall + '</td><td>' + name[1] + '</td><td>' + temp.lastdocvisit + '</td><td>' + temp.nextdoc + '</td><td>' + temp.PlanStatus + '</td></tr>');
            }
        });
        //    $('#miodetails').append('</tbody></table></div></div></div>');
        $('#datatabb').DataTable({
            "language": {
                "lengthMenu": "Display _MENU_ records per page"
            }

        });
        //var href = $('#asd').attr('href');
        //window.location.href = href;

    }
    //$('#preloader').hide();
}

var getbricksformedreps = function () {
    $.ajax({
        type: "POST",
        url: "SpotCheck.asmx/GetEmpBricks",
        data: "{'empid' : '" + empidd + "'}",
        contentType: "application/json",
        async: false,
        success: Onsuccessgetbricksformedreps,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

var Onsuccessgetbricksformedreps = function (response) {
    $('#daydetail').empty();
    $('#popuptitle').text('MedRep Bricks');
    $('#daydetail').prepend($('<table id="datatabb"  class="rwd-table"><thead style="background-color:whitesmoke;">' +
                                        '<tr"><th>Brick Names</th>' +
                                        '</tr></thead><tbody id="gridddata"></tbody></table>'));
    if (response.d != "No") {
        jsonObj = jsonParse(response.d);
        $.each(jsonObj, function (i, option) {
            $('#gridddata').append($("<tr style='text-align:center;'><td class='ob_ST'>" + option.LevelName + "</td>"
                 + " </tr>"));
        });
    }

    $('#datatabb').DataTable({
        "language": {
            "lengthMenu": "Display _MENU_ records per page"
        }

    });

}

var FillMapWithLocation = function () {
    if (valid == 'medrep') {
        $.ajax({
            type: "POST",
            url: "SpotCheck.asmx/GetEmployeeLocations",
            contentType: "application/json; charset=utf-8",
            data: "{'Empid':'" + empidd + "'}",
            success: initMapp,
            error: onError,
            cache: false
        });
    }
    else {
        $.ajax({
            type: "POST",
            url: "SpotCheck.asmx/GetZsmLocations",
            contentType: "application/json; charset=utf-8",
            data: "{'Empid':'" + empidd + "'}",
            success: initMapp,
            error: onError,
            cache: false
        });
    }
}

var initMapp = function (response) {
    $('#daydetail').empty();
    $('#popuptitle').text('Contact Points');
    $('#daydetail').prepend($('<div id="docmap" style="height: 600px; width: 100%;"></div>'));
    var DocdetailHTML;

    if (response.d == 'No') {
        var myLatLng = { lat: parseFloat('31.451185'), lng: parseFloat('72.540138') };
        var map = new google.maps.Map($("#docmap")[0], {
            zoom: 6,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    } else {

        var msg = jQuery.parseJSON(response.d);

        var myLatLng = { lat: parseFloat('31.451185'), lng: parseFloat('72.540138') };
        var map = new google.maps.Map($("#docmap")[0], {
            zoom: 6,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        
        var latlngbounds = new google.maps.LatLngBounds();
        //  var iconcolor = '';

        for (var i = 0; i < msg.length; i++) {
            var infoWindow = new google.maps.InfoWindow();
            DocdetailHTML =  "<div><strong>Doctor Name: </strong>" + msg[i].DocName + "<br>" + "<strong>Class: </strong>" + msg[i].ClassName + " <br> <strong>Time For Calls: </strong>" + msg[i].calltime + "</div>";
            iconcolor = (i == 0) ? '../assets/img/marker.png' : '../assets/img/redmarker.png';
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(msg[i].Latitude, msg[i].Longitude),
                map: map,
                icon: iconcolor,
                title: msg[i].DocName
            });
            (function (marker, content, infowindow) {
                google.maps.event.addListener(marker, "click", function (e) {
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                });
            })(marker, DocdetailHTML, infoWindow);
            latlngbounds.extend(marker.position);

            var bounds = new google.maps.LatLngBounds();
            map.setCenter(latlngbounds.getCenter());
            map.fitBounds(latlngbounds);
        }
    }

}


///////////////////////////////////////////////////////
/////////// New Methods For Coaching Calls //////////// (Arsal)
///////////////////////////////////////////////////////



function caochingcalls() {
    
    getHRole();
    
}



function onSuccessgetCoachingCalls(data, status) {

    if (data.d != "") {

        if (CurrentUserRole == 'admin') { }
        if (CurrentUserRole == 'rl3') {
            $('#h2').val(data.d[0].LevelId3);
            $('#h3').val(-1);
            $('#h4').val(-1);
            $('#h5').val(-1);
        }
        if (CurrentUserRole == 'rl4') {
            $('#h2').val(data.d[0].LevelId3);
            $('#h3').val(data.d[0].LevelId4);
            $('#h4').val(-1);
            $('#h5').val(-1);
        }
        if (CurrentUserRole == 'rl5') {
            $('#h2').val(data.d[0].LevelId3);
            $('#h3').val(data.d[0].LevelId4);
            $('#h4').val(data.d[0].LevelId5);
            $('#h5').val(-1);
        }
        if (CurrentUserRole == 'rl6') {
            $('#h2').val(data.d[0].LevelId3);
            $('#h3').val(data.d[0].LevelId4);
            $('#h4').val(data.d[0].LevelId5);
            $('#h5').val(data.d[0].LevelId6);
            $('#h6').val(EmployeeId);
        }

    }
}


function getHRole() {

    myData = "{'employeeid':'" + empidd + "' }";
   
    $.ajax({
        type: "POST",
        url: "NewReports.asmx/getemployeeHR",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessgetHR,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function onSuccessgetHR(data, status) {

    if(data.d != null){
        LevelId5 = data.d[0].LevelId5;
        LevelId4 = data.d[0].LevelId4;
        
    }

    
     $.each(data.d[0], function (a, value) {
        console.log(a + ": " +value);
     });

    getcoachingcallsRecord();
}

function getcoachingcallsRecord() {
    
    data = "{'level1Id':'0','level2Id':'0','level3Id':'0','level4Id':'" + LevelId4 + "','level5Id':'" + LevelId5 + "','level6Id':'0',"
      + "'skuid':'0','empid':'0','drid':'0','clid':'0','vsid':'0','jv':'0','dt1':'4/21/2017','dt2':'4/22/2017'}";
   

    $.ajax({
        type: "POST",
        url: "NewReports.asmx/CoachingCallsWithFLMasJSON",
        contentType: "application/json; charset=utf-8",
        data: data,
        dataType: "json",
        success: onSuccessGCCR,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

}

function onSuccessGCCR(data, status) {

    
    if (data.d != null) {
        

        var response = $.parseJSON(data.d);
        $('#daydetail').empty();
        $('#popuptitle').text('Coaching Call Report For ' + response[0].ManagerName + ':');
        $('#daydetail').prepend($('<table id="datatabb" class="rwd-table"><thead ><th >Employee Name</th><th >Total Coaching</th></tr> </thead><tbody id="gridddata"></tbody></table>'));

        //$('#miodetails').append('<div style="z-index:999" id="popupp1"  class="overlay dataTables_wrapper no-footer"><div class="popup" > <h2>Daily Call Report</h2><a class="close" href="#">&times;</a><br />' +
        //    '<div class="content"  >'
        //    + '<table id="lastvisittb"  class="table" ><thead ><tr><th>Last Dr Visit Time</th><th>Associate Name</th><th>Last Dr Visited</th><th>Next Dr Visit</th><th>Plan Status</th></tr> </thead>'
        //    + '<tbody id="LastValues" >');
        $.each(response, function (i, temp) {
            //alert(temp.Division);
            $('#gridddata').append('<tr align="center"><td>' + temp.EmployeeName + '</td><td>' + temp.TotalCoaching + '</td></tr>');
            
        });
        //    $('#miodetails').append('</tbody></table></div></div></div>');
        $('#datatabb').DataTable({
            "language": {
                "lengthMenu": "Display _MENU_ records per page"
            }

        });

    }
    
}
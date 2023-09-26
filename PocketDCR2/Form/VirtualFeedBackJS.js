var locations = [];

function pageLoad() {

    $('#status').hide();
    $('#preloader').hide();
    $('#empcounttitle').hide();
    $('#callscounttitle').hide();
    $('#contactpointtitle').hide();
    $('#CPCount').hide();
    $('#TAECount').hide();
    $('#TCCount').hide();
    getHierarchyDetails();
}

function getHierarchyDetails() {
    $.ajax({
        type: "POST",
        url: "GetHierarchyDetailsService.asmx/getHierarchyDetails",
        //data: null,
        contentType: "application/json",
        async: false,
        success: onSuccessgetNSM,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function onSuccessgetNSM(data, status) {
    if (data.d != '') {
        var jSon = JSON.parse(data.d);
        var N = 0;
        var R = 0;
        var Z = 0;

        var NSM = [];
        var RSM = [];
        var ZSM = [];

        var ZSMCOunt = 1;

        $.each(jSon, function (i, temp) {

            if (temp.Level3LevelId != '' && temp.Level4LevelId == '' && temp.Level5LevelId == '' && temp.Type == 'NSM') {
                NSM[N] = [temp.Level3LevelId, temp.Level4LevelId, temp.Level5LevelId, temp.EmployeeName, temp.EmployeeId];
                N++;
            } else if (temp.Level3LevelId != '' && temp.Level4LevelId != '' && temp.Level5LevelId == '' && temp.Type == 'RSM') {
                RSM[R] = [temp.Level3LevelId, temp.Level4LevelId, temp.Level5LevelId, temp.EmployeeName, temp.EmployeeId];
                R++;
            } else if (temp.Level3LevelId != '' && temp.Level4LevelId != '' && temp.Level5LevelId != '' && temp.Type == 'ZSM') {
                ZSM[Z] = [temp.Level3LevelId, temp.Level4LevelId, temp.Level5LevelId, temp.EmployeeName, temp.EmployeeId];
                Z++;
            }
        });
        if (NSM.length > 0) {
            for (var i = 0; i < NSM.length; i++) {
                $('#NSMName').append('<p>' + NSM[i][3] + '</p><a href="#"><i> Mobile Number</a>0312-3890389 <br /></i>');
                for (var j = 0; j < RSM.length; j++) {
                    if (RSM[j][0] == NSM[i][0]) {
                        ZSMCOunt = 0;
                        for (var k = 0; k < ZSM.length; k++) {
                            if (ZSM[k][1] == RSM[j][1]) {
                                ZSMCOunt++;
                            }
                        }
                        var vals = "'RSM'";
                        $('#mainlist').append('<li class="treeview"><a href="#" onclick="getRSMDetails(' + ((RSM[j][1] != "") ? RSM[j][1] : 0) + ',' + ((RSM[j][2] != "") ? RSM[j][2] : 0) + ',0,' + RSM[j][4] + ');"><i class="fa fa-files-o"></i><span>' + RSM[j][3] + '</span> <span class="label label-primary pull-right">' + ZSMCOunt + '</span></a><ul class="treeview-menu" id = "jidZSM' + j + '">');
                        for (var k = 0; k < ZSM.length; k++) {
                            if (ZSM[k][1] == RSM[j][1]) {
                                $('#jidZSM' + j).append('<li><a onclick="getFLMDetails(' + ZSM[k][1] + ',' + ZSM[k][2] + ',0,' + ZSM[k][4] + ',\'MIO\');" style="cursor: pointer;"><i class="fa fa-circle-o"></i>' + ZSM[k][3] + '</a></li>');
                            }
                        }
                        $('#jidRSM').append('</ul>');
                    }
                    $('#jidRSM').append('</li>');
                }
            }
            getRSMDetails(((RSM[0][1] != "") ? RSM[0][1] : 0), ((RSM[0][2] != "") ? RSM[0][2] : 0), 0, RSM[0][4]);
        } else if (RSM.length > 0) {
            for (var i = 0; i < RSM.length; i++) {
                $('#NSMName').append('<a href="#"  onclick="getRSMDetails(' + ((RSM[i][1] != "") ? RSM[i][1] : 0) + ',' + ((RSM[i][2] != "") ? RSM[i][2] : 0) + ',0,' + RSM[i][4] + ');"><p class="h5">' + RSM[i][3] + '</p></a><a href="#"><i> Mobile Number</a>0312-3890389 <br /></i></a>');
                for (var j = 0; j < ZSM.length; j++) {
                    if (ZSM[j][1] == RSM[i][1]) {
                        var vals = "'ZSM'";
                        $('#mainlist').append('<li class="treeview"><a href="#" onclick="getFLMDetails(' + ((ZSM[j][1] != "") ? ZSM[j][1] : 0) + ',' + ((ZSM[j][2] != "") ? ZSM[j][2] : 0) + ',0,' + ZSM[j][4] + ',\'MIO\');"><i class="fa fa-files-o"></i><span>' + ZSM[j][3] + '</span></a></li>');
                    }
                    $('#mainlist').append('</ul>');
                }
            }
            getRSMDetails(((RSM[0][1] != "") ? RSM[0][1] : 0), ((RSM[0][2] != "") ? RSM[0][2] : 0), 0, RSM[0][4]);
        } else if (ZSM.length > 0) {
            for (var i = 0; i < ZSM.length; i++) {
                $('#NSMName').append('<a href="#"  onclick="getFLMDetails(' + ((ZSM[i][1] != "") ? ZSM[i][1] : 0) + ',' + ((ZSM[i][2] != "") ? ZSM[i][2] : 0) + ',0,' + ZSM[i][4] + ');"><p class="h5">' + ZSM[i][3] + '</p></a><a href="#"><i> Mobile Number</a>0312-3890389 <br /></i></a>');
            }
            getFLMDetails(((ZSM[0][1] != "") ? ZSM[0][1] : 0), ((ZSM[0][2] != "") ? ZSM[0][2] : 0), 0, ZSM[0][4]);
        }

    }
}

function getRSMDetails(level4id, level5id, level6id, idd) {
    $('#status').show();
    $('#preloader').show();
    $.ajax({
        type: "POST",
        url: "GetHierarchyDetailsService.asmx/Mfillrsmdetails",
        data: "{'idd' : '" + idd + "'}",
        contentType: "application/json",
        async: false,
        success: onSuccessgetRSM,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
    getMIODetails((level4id != 0) ? level4id : 0, (level5id != 0) ? level5id : 0, (level6id != 0) ? level6id : 0, 'RSM');
    // getMIODetailslast((level4id != 0) ? level4id : 0, (level5id != 0) ? level5id : 0, (level6id != 0) ? level6id : 0, 'RSM');
    locations = [];
    fillmiodetailslatlong((level4id != 0) ? level4id : 0, (level5id != 0) ? level5id : 0, (level6id != 0) ? level6id : 0);
    initMap(30.3299824, 71.7093143);
    $('#status').hide();
    $('#preloader').hide();
    getContactPoint((level4id != 0) ? level4id : 0, (level5id != 0) ? level5id : 0, (level6id != 0) ? level6id : 0, 'Rsm');
    getCallsCount((level4id != 0) ? level4id : 0, (level5id != 0) ? level5id : 0, (level6id != 0) ? level6id : 0, 'Rsm');
}

function onSuccessgetRSM(data, status) {
    if (data.d != '') {
        var jSon = JSON.parse(data.d);
        $.each(jSon, function (i, temp) {

            $('#maindata').css('display', 'block');
            $('#flmname').empty();
            var rsmname = temp.RsmName.split('-');
            $('#flmname').append(rsmname[1]);
            $('#regionheading').empty();
            $('#regionheading').text(temp.RSMRegion);
            $('#flmphone').empty();

            $('#rsmimagediv').empty();
            $('#rsmimagediv').append('<img src="../TeamImages/' + rsmname[0] + '_image.jpg" style="width:59px;height:56px" class="img-circle">');
            $('#flmphone').append('<p>' + temp.Rsmobile + '      </p>');
            $('#flmemail').empty();
            $('#flmemail').append('<p>' + temp.Rsmemail + '           </p>');
            $('#flmtitle').empty();
            $('#flmtitle').append('<p>Regional Sales Manager</p>');
            $('#flmdetails').empty();
            $('#flmdetailsbtn').empty();
            $('#flmspotcheck').empty();

        });
    }
}

function getFLMDetails(level4id, level5id, level6id, idd, type) {
    $('#status').show();
    $('#preloader').show();
    $.ajax({
        type: "POST",
        url: "GetHierarchyDetailsService.asmx/Mfillflmdetails",
        data: "{'idd' : '" + idd + "','type':'" + type + "'}",
        contentType: "application/json",
        async: false,
        success: onSuccessgetFLM,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
    getMIODetails((level4id != 0) ? level4id : 0, (level5id != 0) ? level5id : 0, (level6id != 0) ? level6id : 0, 'FLM');
    // getMIODetailslast((level4id != 0) ? level4id : 0, (level5id != 0) ? level5id : 0, (level6id != 0) ? level6id : 0, 'FLM');

    locations = [];
    fillmiodetailslatlong((level4id != 0) ? level4id : 0, (level5id != 0) ? level5id : 0, (level6id != 0) ? level6id : 0);
    initMap(30.3299824, 71.7093143);
    $('#status').hide();
    $('#preloader').hide();
    getContactPoint((level4id != 0) ? level4id : 0, (level5id != 0) ? level5id : 0, (level6id != 0) ? level6id : 0, 'flm');
    getCallsCount((level4id != 0) ? level4id : 0, (level5id != 0) ? level5id : 0, (level6id != 0) ? level6id : 0, 'flm');
}

function onSuccessgetFLM(data, status) {
    if (data.d != '') {
        var jSon = JSON.parse(data.d);
        $.each(jSon, function (i, temp) {

            $('#maindata').css('display', 'block');
            $('#flmname').empty();
            var flmname = temp.FlmName.split('-');
            $('#flmname').append(flmname[1]);
            $('#flmphone').empty();
            $('#flmphone').append('<p>' + temp.Flmobile + '      </p>');
            $('#flmemail').empty();
            $('#flmemail').append('<p>' + temp.Flmemail + '           </p>');
            $('#flmtitle').empty();
            $('#flmtitle').append('<p>First Line Manager</p>');
            $('#flmdetailsbtn').empty();//href="#flmdetailsclick"
            var val = "'" + temp.nextdoc + "/" + temp.Latitude + "/" + temp.Longitude + "/" + temp.lastdocvisit + "/" + temp.ClassName + "/" + temp.TimeForCall + "/" + temp.FlmName + "/" + temp.Flmobile + "/Flm'";
            var name = temp.FlmName.split('-');
            $('#flmdetailsbtn').append('<a  href="#" onclick="getMIODetailslast(\'' + name[0] + '\',\'' + 'FLM' + '\');return false;" style="color:#fff;" >Details</a>');
            $('#flmspotcheck').empty();
            $('#flmspotcheck').append('<a href="#" style="color:#fff;" onclick="calldetailspage(' + val + ');">Spot Check</a>');
            $('#flmdetails').empty();
            $('#flmdetails').append('<a class="close" href="#">&times;</a><br /><div class="content"><table class="table"><thead><tr><th>Last Dr Visit Time</th><th>FLM Name</th><th>Last Dr Visited</th><th>Next Dr Visit</th><th>No of Dr Visited</th></tr> </thead><tbody><tr> <th>' + temp.TimeForCall + '</th><td>' + flmname[1] + '</td><td>' + temp.lastdocvisit + '</td><td>' + temp.nextdoc + '</td><td>' + temp.noofdocvisited + '</td></tr></tbody></table></div>');


        });
    }
}

function getMIODetails(level4id, level5id, level6id, check) {
    $.ajax({
        type: "POST",
        url: "GetHierarchyDetailsService.asmx/FillGridMioInfo",
        data: "{'Level4' : '" + level4id + "','Level5' : '" + level5id + "','Level6' : '" + level6id + "','check':'" + check + "'}",
        contentType: "application/json",
        async: false,
        success: onSuccessgetMIO,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function onSuccessgetMIO(data, status) {
    if (data.d != '') {
        $('#MIODetails').empty();
        var array = data.d.split('|');
        for (var j = 0; j < array.length; j++) {
            var jSon = $.parseJSON(array[j]);

            $.each(jSon, function (i, temp) {
                // $('#MIODetails').empty();

                var nextdoc = temp.nextdoc.split('-');
                var mail = "";

                if (temp.Type == "FLM") {
                    var name = temp.FlmName.split('-');
                    var associat = temp.name.split('-');
                    var ttype = temp.Type;
                    if (temp.Flmemail != "")
                    { mail = temp.Flmemail; }
                    else
                    { mail = "example@domain.com" }
                    var val = "'" + temp.nextdoc + "/" + temp.Latitude + "/" + temp.Longitude + "/" + temp.lastdocvisit + "/" + temp.ClassName + "/" + temp.TimeForCall + "/" + temp.FlmName + "/" + temp.Flmobile + "/" + temp.IsCoaching + "/Flm'";
                    $('#MIODetails').append('<div class="col-md-6"><div class="col-xs-6 col-md-12 well"> <div class=" row"><div class="col-md-1"> <img src="../TeamImages/' + name[0] + '_image.jpg" style="width:59px;height:56px" class="img-circle"></div> <div class="col-md-10 text-center h4 fflmcards">' + name[1] + '</div></div><div class="form-group"><div class="col-xs-2"></div> <label class="col-xs-2 control-label">Email:</label><div class="col-sm-8"> <p>' + mail + '</p></div> </div><div class="form-group"><div class="col-xs-2"></div><label class="col-xs-2 control-label">Phone:</label><div class="col-sm-8"> <p>' + temp.Flmobile + ' </p> </div></div><div class="form-group"><div class="col-xs-2"></div><label class="col-xs-2 control-label">Title:</label><div class="col-sm-8"><p>First Line Manager</p></div></div>' +
                        '<div class="form-group"><div class="col-sm-12"><div class="col-xs-6 col-md-3 text-right"></div><div class="col-xs-6 col-md-3 text-right"></div><div class="col-xs-6 col-md-3 text-right"><a href="#" onclick="calldetailspage(' + val + ');">Spot Check</a></div><div class="col-xs-6 col-md-3 text-right"> <a href="#miodetailsclick' + name[0] + '"  onclick="getMIODetailslast(\'' + name[0] + '\',\'' + 'FLM' + '\');return false;">Details</a></div></div></div></div>'
                        + '</div></div>');
                    // '<div id="miodetailsclick' + name[0] + '"  style="z-index:999" class="overlay"><div class="popup"  id="miodetails"><a class="close" href="#">&times;</a><br /><div class="content"><table class="table"><thead><tr><th>Last Dr Visit Time</th><th>FLM Name</th><th>Associate Name</th><th>Last Dr Visited</th><th>Next Dr Visit</th><th>No of Dr Visited</th></tr> </thead><tbody><tr> <th>' + temp.TimeForCall + '</th><td>' + name[1] + '</td><td>' + associat[1] + '</td><td>' + temp.lastdocvisit + '</td><td>' + temp.nextdoc + '</td><td>' + temp.noofdocvisited + '</td></tr></tbody></table></div></div></div>');
                    i++;
                } else {
                    var name = temp.name.split('-');
                    if (temp.Email != "")
                    { mail = temp.Email; }
                    else
                    { mail = "example@domain.com" }
                    var val = "'" + temp.nextdoc + "/" + temp.Latitude + "/" + temp.Longitude + "/" + temp.lastdocvisit + "/" + temp.ClassName + "/" + temp.TimeForCall + "/" + temp.name + "/" + temp.mobno + "/medrep'";
                    $('#MIODetails').append('<div class="col-md-6"><div class="col-xs-6 col-md-12 well"> <div class=" row"><div class="col-md-1"> <img src="../TeamImages/' + name[0] + '_image.jpg" style="width:59px;height:56px" class="img-circle"></div> <div class="col-md-10 text-center h4">' + name[1] + '</div></div><div class="form-group"><div class="col-xs-2"></div> <label class="col-xs-2 control-label">Email:</label><div class="col-sm-8"> <p>' + mail + '</p></div> </div><div class="form-group"><div class="col-xs-2"></div><label class="col-xs-2 control-label">Phone:</label><div class="col-sm-8"> <p>' + temp.mobno + ' </p> </div></div><div class="form-group"><div class="col-xs-2"></div><label class="col-xs-2 control-label">Title:</label><div class="col-sm-8"><p>MedRep</p></div></div>' +
                        '<div class="form-group"><div class="col-sm-12"><div class="col-xs-6 col-md-3 text-right"></div><div class="col-xs-6 col-md-3 text-right"></div><div class="col-xs-6 col-md-3 text-right"><a href="#" onclick="calldetailspage(' + val + ');">Spot Check</a></div><div class="col-xs-6 col-md-3 text-right"> <a href="#miodetailsclick' + name[0] + '"  onclick="getMIODeatailshow(\'' + name[0] + '\',\'' + 'medrep' + '\');return false;" >Details</a></div></div></div></div>'
                        + '</div></div>');
                    //'<div id="miodetailsclick' + name[0] + '"  style="z-index:999" class="overlay"><div class="popup"  id="miodetails"><a class="close" href="#">&times;</a><br /><div class="content"><table class="table"><thead><tr><th>Last Dr Visit Time</th><th>Employee Name</th><th>Last Dr Visited</th><th>Next Doc Visit</th><th>No of Dr Visited</th></tr> </thead><tbody><tr> <th>' + temp.TimeForCall + '</th><td>' + name[1] + '</td><td>' + temp.lastdocvisit + '</td><td>' + nextdoc[1] + '</td><td>' + temp.noofdocvisited + '</td></tr></tbody></table></div></div></div>');
                    i++;
                }
            });
        }
    }
}

function getMIODetailslast(empid, type) {
    $('#preloader').show();
    $.ajax({
        type: "POST",
        url: "GetHierarchyDetailsService.asmx/Mfillflmdetailslastvisit",
        data: "{'empid' : '" + empid + "','type':'" + type + "'}",
        contentType: "application/json",
        async: false,
        success: onSuccessgetMIOlast,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function onSuccessgetMIOlast(data, status) {
    if (data.d != '') {

        //var array = data.d.split('|');
        //for (var j = 0; j < array.length; j++) {
        var jSon = $.parseJSON(data.d);
        $('#miodetails').empty();
        $('#miodetails').append('<div style="z-index:999" id="popup1"  class="overlay dataTables_wrapper no-footer"><div class="popup" > <h2>Daily Call Report</h2><a class="close" href="#">&times;</a><br />' +
            '<div class="content"  >'
            +
            '<table id="lastvisittb"  class="table" ><thead ><tr><th>Last Dr Visit Time</th><th>FLM Name</th><th>Associate Name</th><th>Last Dr Visited</th><th>Next Dr Visit</th><th>Plan Status</th></tr> </thead>'
            + '<tbody id="LastValues" >');
        // $('#lastvisittb').show();style="width:850px; height:400px; overflow:auto;" 
        $.each(jSon, function (i, temp) {
            //// $('#MIODetails').empty();
            //alert('abc');

            var nextdoc = temp.nextdoc.split('-');
            var mail = "";

            if (temp.Type == "FLM") {
                var name = temp.FlmName.split('-');
                var associat = temp.name.split('-');
                //if (temp.Flmemail != "")
                //{ mail = temp.Flmemail; }
                //else
                //{ mail = "example@domain.com" }
                //  var val = "'" + temp.nextdoc + "/" + temp.Latitude + "/" + temp.Longitude + "/" + temp.lastdocvisit + "/" + temp.ClassName + "/" + temp.TimeForCall + "/" + temp.FlmName + "/" + temp.Flmobile + "/" + temp.IsCoaching + "/Flm'";
                $('#LastValues').append('<tr><td>' + temp.TimeForCall + '</td><td>' + name[1] + '</td><td>' + associat[1] + '</td><td>' + temp.lastdocvisit + '</td><td>' + temp.nextdoc + '</td><td>' + temp.PlanStatus + '</td></tr>');
                //  i++;
            } else {
                var name = temp.name.split('-');
                //if (temp.Email != "")
                //{ mail = temp.Email; }
                //else
                //{ mail = "example@domain.com" }
                // var val = "'" + temp.nextdoc + "/" + temp.Latitude + "/" + temp.Longitude + "/" + temp.lastdocvisit + "/" + temp.ClassName + "/" + temp.TimeForCall + "/" + temp.name + "/" + temp.mobno + "/medrep'";
                $('#LastValues').append('<tr><td>' + temp.TimeForCall + '</td><td>' + name[1] + '</td><td>' + associat[1] + '</td><td>' + temp.lastdocvisit + '</td><td>' + temp.nextdoc + '</td><td>' + temp.PlanStatus + '</td></tr>');
                // $('#miodetails').append('<div id="miodetailsclick' + name[0] + '"  style="z-index:999" class="overlay"><div class="popup"  id="miodetails"><a class="close" href="#">&times;</a><br /><div class="content"><table class="table"><thead><tr><th>Last Dr Visit Time</th><th>Employee Name</th><th>Last Dr Visited</th><th>Next Dr Visit</th><th>No of Dr Visited</th></tr> </thead><tbody><tr> <th>' + temp.TimeForCall + '</th><td>' + name[1] + '</td><td>' + temp.lastdocvisit + '</td><td>' + nextdoc[1] + '</td><td>' + temp.noofdocvisited + '</td></tr></tbody></table></div></div></div>');
                // i++;
            }

        });
        $('#miodetails').append('</tbody></table></div></div></div>');
        $('#lastvisittb').dataTable({
            "sDom": "<'dataTables_search'<'col-md-4'<'dt_actions'>l><'col-md-8'f>r>t<'dataTables_pager'<'col-md-4'i><'col-md-8'p>>",
            "sPaginationType": "full_numbers",
            "iDisplayLength": 5,
            "bSearchable": false,
            "aaSorting": [[0, "desc"]]
        });
        //  $("#asd").click
        var href = $('#asd').attr('href');
        window.location.href = href;

    }
    //} 
    $('#preloader').hide();
}

function getMIODeatailshow(empid, type) {
    $('#preloader').show();
    $.ajax({
        type: "POST",
        url: "GetHierarchyDetailsService.asmx/MfillMIOdetailslastvisit",
        data: "{'empid' : '" + empid + "','type':'" + type + "'}",
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
        $('#miodetails').empty();
        $('#miodetails').append('<div style="z-index:999" id="popup1"  class="overlay dataTables_wrapper no-footer"><div class="popup" > <h2>Daily Call Report</h2><a class="close" href="#">&times;</a><br />' +
            '<div class="content"  >'
            + '<table id="lastvisittb"  class="table" ><thead ><tr><th>Last Dr Visit Time</th><th>Associate Name</th><th>Last Dr Visited</th><th>Next Dr Visit</th><th>Plan Status</th></tr> </thead>'
            + '<tbody id="LastValues" >');
        $.each(jSon, function (i, temp) {
            var nextdoc = temp.nextdoc.split('-');
            var mail = "";
            if (temp.Type == "FLM") {
                var name = temp.FlmName.split('-');
                var associat = temp.name.split('-');
                $('#LastValues').append('<tr><td>' + temp.TimeForCall + '</td><td>' + name[1] + '</td><td>' + associat[1] + '</td><td>' + temp.lastdocvisit + '</td><td>' + temp.nextdoc + '</td><td>' + temp.PlanStatus + '</td></tr>');
            } else {
                var name = temp.name.split('-');
                $('#LastValues').append('<tr><td>' + temp.TimeForCall + '</td><td>' + name[1] + '</td><td>' + temp.lastdocvisit + '</td><td>' + temp.nextdoc + '</td><td>' + temp.PlanStatus + '</td></tr>');
            }
        });
        $('#miodetails').append('</tbody></table></div></div></div>');
        $('#lastvisittb').dataTable({
            "sDom": "<'dataTables_search'<'col-md-4'<'dt_actions'>l><'col-md-8'f>r>t<'dataTables_pager'<'col-md-4'i><'col-md-8'p>>",
            "sPaginationType": "full_numbers",
            "iDisplayLength": 5,
            "bSearchable": false,
            "aaSorting": [[0, "desc"]],
            "language": {
                "emptyTable": "No data available in table"
            }
        });
        //  $("#asd").click
        var href = $('#asd').attr('href');
        window.location.href = href;

    }
    $('#preloader').hide();
}
function getCallsCount(level4id, level5id, level6id, check) {
    if (check == 'RSM') {
        $('#maindata').hide();
        $('#MIODetails').empty();
    }
    $.ajax({
        type: "POST",
        url: "GetHierarchyDetailsService.asmx/totalviisit",
        data: "{'Level4' : '" + level4id + "','Level5' : '" + level5id + "','Level6' : '" + level6id + "'}",
        contentType: "application/json",
        async: false,
        success: onSuccessgetcallscount,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function onSuccessgetcallscount(data, status) {
    if (data.d != '') {
        var callcount = 0;
        var empcount = 0;
        var jSon = JSON.parse(data.d);
        $.each(jSon, function (i, temp) {
            callcount = temp.totalvisit;
            empcount = temp.totalempcount;
        });
        $('#empcounttitle').show();
        $('#TAECount').empty();
        $('#TAECount').show();
        $('#TAECount').append('<span class="count">' + empcount + '</span>');

        $('#callscounttitle').show();
        $('#TCCount').empty();
        $('#TCCount').show();
        $('#TCCount').append('<span class="count">' + callcount + '</span>');

        $('.count').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 5000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }
}

function getContactPoint(level4id, level5id, level6id, check) {
    if (check == 'RSM') {
        $('#maindata').hide();
        $('#MIODetails').empty();
    }
    $.ajax({
        type: "POST",
        url: "GetHierarchyDetailsService.asmx/GetContactPoint",
        data: "{'Level4' : '" + level4id + "','Level5' : '" + level5id + "','Level6' : '" + level6id + "'}",
        contentType: "application/json",
        async: false,
        success: onSuccessgetContactPoint,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
    getContactPointDetails(level4id, level5id, level6id);
}

function onSuccessgetContactPoint(data, status) {
    if (data.d != '') {


        var cpcount = 0;
        var jSon = JSON.parse(data.d);
        $.each(jSon, function (i, temp) {
            cpcount = temp.contactpoint;
        });

        $('#contactpointtitle').show();
        $('#CPCount').empty();
        $('#CPCount').show();
        $('#CPCount').append('<span class="count">' + cpcount + '</span>');


    }
}

function getContactPointDetails(level4id, level5id, level6id) {

    $.ajax({
        type: "POST",
        url: "GetHierarchyDetailsService.asmx/GetContactPointDetails",
        data: "{'Level4' : '" + level4id + "','Level5' : '" + level5id + "','Level6' : '" + level6id + "'}",
        contentType: "application/json",
        async: true,
        success: onSuccessgetContactPointDetails,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function onSuccessgetContactPointDetails(data, status) {
    if (data.d != '') {
        var jSon = JSON.parse(data.d);
        $('#CPdetails').empty();
        $('#CPdetails').append('<a class="close" href="#">&times;</a><br /><div class="content"><table class="table"><thead><tr><th>Territory</th><th>Employee Name</th><th>Mobile NUmber</th><th>Date</th></tr> </thead><tbody id="CPValues">');
        $.each(jSon, function (i, temp) {
            $('#CPValues').append('<tr> <th>' + temp.Territory + '</th><td>' + temp.EmployeeName + '</td><td>' + temp.MobileNumber + '</td><td>' + temp.Date + '</td></tr>');
        });
        $('#CPValues').append("</tbody></table></div>");
    }
}

function onError(request, status, error) {
}

function startingAjax() {
}

function ajaxCompleted() {
}

function calldetailspage(nextdoc) {

    nextdoc = nextdoc.split('/');
    var a = nextdoc[0];
    var lat = nextdoc[1];
    var lan = nextdoc[2];
    var last = nextdoc[3];
    var cls = nextdoc[4];
    var timeforcall = nextdoc[5];
    var flmn = nextdoc[6];
    var flmm = nextdoc[7];

    //var jv = nextdoc[8];
    //var type = nextdoc[9];
    var jv = (nextdoc.length == 10) ? nextdoc[9] : nextdoc[8];
    var type = nextdoc[8];

    $.cookie('next', a, { path: '/' });
    //   $.cookie('next', a);
    $.cookie('lastdoc', last, { path: '/' });
    $.cookie('cls', cls, { path: '/' });
    $.cookie('TimeForCall', timeforcall, { path: '/' });
    $.cookie('flmname', flmn, { path: '/' });
    $.cookie('flmmobile', flmm, { path: '/' });
    $.cookie('type', type, { path: '/' });
    $.cookie('lat', lat, { path: '/' });
    $.cookie('lan', lan, { path: '/' });
    $.cookie('jv', jv, { path: '/' });
    window.open('../Reports/CallDetail.aspx', '_blank');
}

function initMap(lat, long) {
    var myLatLng = { lat: parseFloat(lat), lng: parseFloat(long) };
    var map = new google.maps.Map($("#mapppp")[0], {
        zoom: 5,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    for (var i = 0; i < locations.length; i++) {
        var data = locations[i];
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            icon: '../assets/img/marker.png'//,
            //title: locations[i][0]
        });
        //Create and open InfoWindow.
        var infoWindow = new google.maps.InfoWindow();

        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                infoWindow.setContent("<div style = 'width:200px;min-height:40px'> <strong>MIO Name: </strong>" + data[0] + "</div>");
                infoWindow.open(map, marker);
            });
        })(marker, data);
    }
}

function fillmiodetailslatlong(Level4, Level5, Level6) {
    $('#loadsalesdata').parent().find('.loding_box_outer').show().fadeIn();

    myData = "{'Level4':'" + Level4 + "','Level5':'" + Level5 + "','Level6':'" + Level6 + "'}";
    $.ajax({
        type: "POST",
        url: "GetHierarchyDetailsService.asmx/FillGridMioLatlong",
        data: myData,
        contentType: "application/json",
        async: false,
        success: onSuccessMiolatlong,
        error: onError,
        complete: onComplete,
        cache: false
    });
}

function onSuccessMiolatlong(data, status) {

    var a = data.d.split('|');
    for (var i = 0; i < a.length; i++) {

        var msg = jQuery.parseJSON(a[i]);

        $.each(msg, function (i, option) {

            locations.push([option.name, parseFloat(option.Latitude), parseFloat(option.Longitude)]);
        });
    }
}

function onComplete() {

}
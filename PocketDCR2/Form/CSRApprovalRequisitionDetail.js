

function pageLoad() {

   
    CSRDetail();

    $('#btnApprovedYes').click(ApprovedYes);
    $('#btnApprovedNo').click(ApprovedNo);

    $('#btnRejectYes').click(RejectYes);
    $('#btnRejectNo').click(RejectNo);
   

}


function CSRDetail() {

    var url_string = window.location.href
    var url = new URL(url_string);
    var ID = url.searchParams.get("ID");

    var data = "{'ID': '" + ID + "'}"
    $.ajax({
        type: "POST",
        url: "CSRApprovalRequisition.asmx/CSRDetail",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: data,
        success: OnSuccessCSRDetail,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}

function OnSuccessCSRDetail(data, status) {

    if (data.d != '') {
        var mainJSON = jsonParse(data.d);
        var jsonObj = mainJSON[0];
        var jsonObj1 = mainJSON[1];
        
        $('#CallsCount').text(jsonObj[0].DoctorCallsCount);
        $('#EmployeeName').text(jsonObj[0].EmployeeName);
        $('#RequestedDate').text(jsonObj[0].RequestedDate);
        $('#CSRStatus').text(jsonObj[0].CSRStatus);
        $('#DoctorName').text(jsonObj[0].DoctorName);
        $('#Specialty').text(jsonObj[0].Speciality);
        $('#Qualification').text(jsonObj[0].Qualification);
        $('#CellNo').text(jsonObj[0].CellNo);
        
        var table = "";
        var table1 = "";
       
        var BusinessValue = 0;
        var IncrValue = 0;
        var LastIncrValue = 0;
        var SERatioSum = 0;
        var SERatio = 0;
        var INCR = 0;
        $('#ProductDetail').empty();
        table=' <thead>'+
            '<tr style="border-top: 3px solid #03429a;border-bottom: 3px solid #03429a;">' +

            '<th style="width: 70px;">S.No</th>'+
            '<th style="width: 300px;">Product</th>'+
            '<th style="width: 300px;">SKU</th>'+
            //'<th style="width: 170px;">Last Incr. Units</th>'+
            '<th style="width: 160px;">Incr. Units</th>'+
            '<th style="width: 160px;">Expec Units</th>'+
            
            '</tr>'+
            '</thead>';


        table += '<tbody>';
        for (var i = 0; i < jsonObj.length; i++) {
            table += '<tr>' +

                              '<td>'+(i+1)+'</td>' +
                              '<td>' + jsonObj[i].ProductName + '</td>' +
                              '<td>' + jsonObj[i].SkuName + '</td>' +
                              //'<td>' + jsonObj[i].LastIncrUnits + '</td>' +
                              '<td>' + jsonObj[i].IncrUnits + '</td>' +
                              '<td>' + jsonObj[i].ExpectedUnits + '</td>' +
                    '</tr>';
            BusinessValue = parseFloat(BusinessValue) + parseFloat(jsonObj[i].ExpectedUnits);
            IncrValue = parseFloat(IncrValue) + parseFloat(jsonObj[i].IncrUnits);
            LastIncrValue = parseFloat(LastIncrValue) + parseFloat(jsonObj[i].LastIncrUnits);
            if (jsonObj[i].IncrUnits == 0)
            {
                INCR = 0;
            }
            else {
                INCR = jsonObj[i].IncrUnits;
            }
            SERatioSum += (parseFloat(jsonObj[i].TradePrice) * parseFloat(INCR));
            
        }
        SERatio = (SERatioSum != 0) ? ((parseFloat(jsonObj[0].RequiredCost)) / SERatioSum)*100 : 0;
        SERatio = SERatio.toFixed(2);
             table += '<tr>' +

                                 '<td></td>' +
                                 '<td></td>' +
                                 '<td></td>' +

                                 //'<td style="border: 2px solid #03429a;"><b>last Incremental :</b>' + LastIncrValue + '</td>' +
                                 '<td style="border: 2px solid #03429a;"><b>Incremental :</b>' + IncrValue + '</td>' +
                                 '<td style="border: 2px solid #03429a;"><b>Business Val. :</b>' + BusinessValue + '</td>' +

                         
                    '</tr>';
            


             $('#SalesDetail').empty();
             table1 = ' <thead>' +
                 '<tr style="border-top: 3px solid #03429a;border-bottom: 3px solid #03429a;">' +

                 '<th style="width: 70px;">S.No</th>' +
                 '<th style="width: 300px;">Product</th>' +
                 '<th style="width: 300px;">Brick</th>' +
                 '<th style="width: 160px;">Pharmacy</th>' +
                 '<th style="width: 160px;">Percentage</th>' +

                 '</tr>' +
                 '</thead>';


             table1 += '<tbody>';
             for (var i = 0; i < jsonObj1.length; i++) {
                 table1 += '<tr>' +

                                   '<td>' + (i + 1) + '</td>' +
                                   '<td>' + jsonObj1[i].ProductName + '</td>' +
                                   '<td>' + jsonObj1[i].BrickName + '</td>' +
                                   '<td>' + jsonObj1[i].PharmacyName + '</td>' +
                                   '<td>' + jsonObj1[i].Percentage + '%</td>' +
                         '</tr>';
             }




             $('#ItemName').text(jsonObj[0].ItemName);
             $('#RequiredCost').text(jsonObj[0].RequiredCost);
             $('#RequiredOn').text(jsonObj[0].RequiredOn);
             $('#SERatio').text(SERatio+'%');
             $('#InstructName').text(jsonObj[0].InstructName);
             $('#ActDuration').text(jsonObj[0].ActDuration);

             $('#Level1').text(jsonObj[0].Level1);
             $('#Level2').text(jsonObj[0].Level2);
             $('#Level3').text(jsonObj[0].Level3);
             $('#Level4').text(jsonObj[0].Level4);
             $('#Level5').text(jsonObj[0].Level5);

             $('#Level1Comment').prop("disabled", true);
             $('#Level2Comment').prop("disabled", true);
             $('#Level3Comment').prop("disabled", true);
             $('#Level4Comment').prop("disabled", true);
             $('#Level5Comment').prop("disabled", true);

             $('#RejBtnLevel1').hide();
             $('#RejBtnLevel2').hide();
             $('#RejBtnLevel3').hide();
             $('#RejBtnLevel4').hide();
             $('#RejBtnLevel5').hide();

             $('#AppBtnLevel1').hide();
             $('#AppBtnLevel2').hide();
             $('#AppBtnLevel3').hide();
             $('#AppBtnLevel4').hide();
             $('#AppBtnLevel5').hide();

             $('#Level1Comment').val(jsonObj[0].Level1IdComments);
             $('#Level2Comment').val(jsonObj[0].Level2IdComments);
             $('#Level3Comment').val(jsonObj[0].Level3IdComments);
             $('#Level4Comment').val(jsonObj[0].Level4IdComments);
             $('#Level5Comment').val(jsonObj[0].Level5IdComments);


             if (jsonObj[0].RoleName == 'RL1')
             {

                 if (jsonObj[0].BTNVisible == '1') {

                     $('#Level1Comment').prop("disabled", false);
                     $('#RejBtnLevel1').show();
                     $('#AppBtnLevel1').show();
                 }
             }
             else if (jsonObj[0].RoleName == 'RL2') {
                 if (jsonObj[0].BTNVisible == '1') {
                     $('#Level2Comment').prop("disabled", false);
                     $('#RejBtnLevel2').show();
                     $('#AppBtnLevel2').show();
                 }
             }
            
             else if (jsonObj[0].RoleName == 'RL3') {
                 if (jsonObj[0].BTNVisible == '1') {
                     $('#Level3Comment').prop("disabled", false);
                     $('#RejBtnLevel3').show();
                     $('#AppBtnLevel3').show();
                 }
             }
             
             else if (jsonObj[0].RoleName == 'RL4') {
                 if (jsonObj[0].BTNVisible == '1') {
                     $('#Level4Comment').prop("disabled", false);
                     $('#RejBtnLevel4').show();
                     $('#AppBtnLevel4').show();
                 }
             }
             
             else if (jsonObj[0].RoleName == 'RL5') {
                 if (jsonObj[0].BTNVisible == '1') {
                     $('#Level5Comment').prop("disabled", false);
                     $('#RejBtnLevel5').show();
                     $('#AppBtnLevel5').show();
                 }
             }
 
             table += '</tbody>';
             table1 += '</tbody>';

    }

    $('#ProductDetail').append(table);
    $('#SalesDetail').append(table1);

}

function onError(request, status, error) {

    msg = 'Error occoured';

    $.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });
}

function onErrorDt() {
    $('#dialog').jqmHide();
    msg = 'Date Error';
    $.fn.jQueryMsg({
        msg: msg,
        msgClass: 'error',
        fx: 'slide',
        speed: 500
    });

    $('#dialog').jqmHide();
}
function startingAjax() {
    //  $('#imgLoading').show();
    //    $('#dialog').jqm({ modal: true });
    //    $('#dialog').jqm();
    //    $('#dialog').jqmShow();
}
function ajaxCompleted() {

    // $('#dialog') ();
    //$('.loading').fadeOut('slow');
    //$('.loading_bgrd').fadeOut('slow');
    // $('#imgLoading').hide();
}

function ApprovedCSR() {
  
    $('#divConfirmation').modal('show');
}
function ApprovedYes() {
   
    var url_string = window.location.href
    var url = new URL(url_string);
    var CSRID = url.searchParams.get("ID");
    var Comment = '';
    if ($('#Level1Comment').val() != '') {

        Comment = $('#Level1Comment').val();

    }
    else if ($('#Level2Comment').val() != '') {

        Comment = $('#Level2Comment').val();

    }

    else if ($('#Level3Comment').val() != '') {

        Comment = $('#Level3Comment').val();

    }

    else if ($('#Level4Comment').val() != '') {

        Comment = $('#Level4Comment').val();

    }

    else if ($('#Level5Comment').val() != '') {

        Comment = $('#Level5Comment').val();

    }


    $.ajax({
        type: "POST",
        url: "CSRApprovalRequisition.asmx/Approvedbylevel",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"ID":"' + CSRID + '","Comment":"' + Comment + '" ,"EmployeeID":"' + "" + '"}',
        success: onSuccessApprovedbylevel,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}
function onSuccessApprovedbylevel(data, status) {

    if (data.d != '') {
        var jsonObj = jsonParse(data.d);
        CSRDetail();
        $('#divConfirmation').modal('hide');

    }

}

function ApprovedNo() {
    $('#divConfirmation').modal('hide');
}




function RejectCSR() {

    $('#divConfirmationReject').modal('show');
}
function RejectYes() {

    var url_string = window.location.href
    var url = new URL(url_string);
    var CSRID = url.searchParams.get("ID");
    var Comment = '';
    if ($('#Level1Comment').val() != '') {

        Comment = $('#Level1Comment').val();

    }
    else if ($('#Level2Comment').val() != '') {

        Comment = $('#Level2Comment').val();

    }

    else if ($('#Level3Comment').val() != '') {

        Comment = $('#Level3Comment').val();

    }

    else if ($('#Level4Comment').val() != '') {

        Comment = $('#Level4Comment').val();

    }

    else if ($('#Level5Comment').val() != '') {

        Comment = $('#Level5Comment').val();

    }


    $.ajax({
        type: "POST",
        url: "CSRApprovalRequisition.asmx/Rejectbylevel",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"ID":"' + CSRID + '","Comment":"' + Comment + '","EmployeeID":"' + "" + '"}',
        success: onSuccessRejectbylevel,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        async: false,
        cache: false
    });
}
function onSuccessRejectbylevel(data, status) {

    if (data.d != '') {
        var jsonObj = jsonParse(data.d);
        CSRDetail();
        $('#divConfirmationReject').modal('hide');

    }

}

function RejectNo() {
    $('#divConfirmationReject').modal('hide');
}
$(document).ready(function () {

    //$('#uploadify_button1').uploadify({
    //    'fileSizeLimit': '100MB',
    //    'swf': '../Scripts/Uploadify/uploadify.swf',
    //    'uploader': "../BWSD/GetExcelBWSD.ashx?Type=" + 'U',
    //    'onUploadStart': function () {
    //        if ($('#txtDate').val() == '') {
    //            alert('select calander');
    //            $('#uploadify_button1').uploadify('stop');
    //            return false;
    //        }
    //    },
    //    'width': '140',
    //    'height': '25',
    //    //'wmode': 'transparent',
    //    'onUploadSuccess': function (file, data, response) {

    //        //$('#dialog').jqm({ modal: true });
    //        //$('#dialog').jqm();
    //        //$('#dialog').jqmShow();
    //        $.ajax({
    //            url: "../BWSD/GetExcelBWSD.ashx?Type=" + 'PF' + '&FileName=' + file.name + '&MonthOfSalesData=' + $('#txtDate').val(),
    //            contentType: "application/json; charset=utf-8",
    //            success: OnCompleteDownload,
    //            beforeSend: startingAjax,
    //            complete: ajaxCompleted,
    //            error: onError
    //            //error:  function(a, b, c, d) {
    //            //if (d.info == 404)
    //            //  alert('Could not find upload script. Use a path relative to: ' + '<?= getcwd() ?>');
    //            // else 
    //            //alert('error ' + d.type + ": " + d.info);
    //            //}
    //        });
    //    }
    //});
    $('#dialog').hide();
    $('#dialog1').hide();

    $('#uploadify_button2').uploadify({
        'buttonText': 'Upload DSR',
        'fileSizeLimit': '100MB',
        'swf': '../Scripts/Uploadify/uploadify.swf',
        'uploader': "../BWSD/GetExcelBWSD.ashx?Type=" + 'U',
        'onUploadStart': function () {
            //if ($('#txtDate').val() == '') {
            //    alert('select calander');
            //    $('#uploadify_button1').uploadify('stop');
            //    return false;
            //}
        },
        'width': '140',
        'height': '25',
        //'wmode': 'transparent',
        'onUploadSuccess': function (file, data, response) {

            //$('#dialog').jqm({ modal: true });
            //$('#dialog').jqm();
            //$('#dialog').jqmShow();
            $('#dialog').show();
            $.ajax({
                url: "../BWSD/GetExcelBWSD.ashx?Type=" + 'DSR' + '&FileName=' + file.name ,
                contentType: "application/json; charset=utf-8",
                success: OnCompleteDownload,
                //beforeSend: startingAjax,
                //complete: ajaxCompleted,
                error: onError,
            });
        }
    });
});

function OnCompleteDownload(data, status) {

    $('#dialog').hide();
    //$("#dialog").removeProperty("display");
    //$("#dialog").css("display", "none");


    if (data == 'Your File Has been Processed Successfully') {
       // alert('Your File Has been Processed Successfully');
        ProcessDATADSR();
    }
    else {
        alert('Error Data Upload');
    }
}
function ProcessDATADSR() {
    $('#dialog1').show();
    $.ajax({
        type: "POST",
        url: "../BWSD/GetExcelBWSD.ashx?Type=DSRProcess",
        contentType: "application/json; charset=utf-8",
        success: onSuccessProcessDATADSR,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: onError,
       
    });
}

function onSuccessProcessDATADSR(data, status) {
    $('#dialog1').hide();
    if (data == 'DSuccess') {
        alert('Successful Data Process');
       
    }
    else {
        alert('Error Data Processing');
      
    }
}

function onError(request, status, error) {

    alert('Error is occured');
    $('#dialog').hide();
    $('#dialog1').hide();
    //msg = 'Error is occured';
    //$('#hlabmsg').append(msg);
    //$('#Divmessage').jqmShow();
    //return false;

}


function startingAjax() {

    $('#dialog').show();
    //$('#dialog').jqm({ modal: true });
    //$('#dialog').jqm();
    //$('#dialog').jqmShow();
}
function ajaxCompleted() {

    $('#dialog').hide();
    //$('#dialog').jqmHide();
}


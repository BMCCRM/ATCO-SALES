function pageLoad() {

}

$(document).ready(function () {
    $('#dialog').hide();
    $('#dialog1').hide();

    $('#sheetUploader').change(uploadFile);
    $('#exportExcel').click(exportDoctorExcel);
    $('#exportExcel2').click(exportDoctorExcel2);
});

function uploadFile() {
    //var data = new FormData(form);


    if ($('#sheetUploader')[0].files[0] != undefined) {
        var formData = new FormData();
        formData.append('file', $('#sheetUploader')[0].files[0]);

        $.ajax({
            type: "POST",
            url: "../BWSD/GetExcelRTBDForBrickUpload.ashx?Type=" + 'U',
            data: formData,
            processData: false,
            contentType: false,
            success: function (file, data, response) {
                $('#dialog').show();
                $.ajax({
                    url: "../BWSD/GetExcelRTBDForBrickUpload.ashx?Type=" + 'RTBD' + '&FileName=' + file.name + '&PFileName=' + file,
                    contentType: "application/json; charset=utf-8",
                    success: OnCompleteDownload,
                    //beforeSend: startingAjax,
                    //complete: ajaxCompleted,
                    error: onError,
                    async: false,
                    cache: false
                });
            },
            error: onError,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });
    }
}

//$(document).ready(function () {
//    $('#dialog').hide();
//    $('#dialog1').hide();
//    $('#uploadify_button2').uploadify({
//        'buttonText': 'Upload File',
//        'fileSizeLimit': '100MB',
//        'swf': '../Scripts/Uploadify/uploadify.swf',
//        'uploader': "../BWSD/GetExcelRTBDForBrickUpload.ashx?Type=" + 'U',
//        'onUploadStart': function () {
//        },
//        'width': '140',
//        'height': '25',
//        //'wmode': 'transparent',
//        'onUploadSuccess': function (file, data, response) {
//            $('#dialog').show();
//            $.ajax({
//                url: "../BWSD/GetExcelRTBDForBrickUpload.ashx?Type=" + 'RTBD' + '&FileName=' + file.name + '&PFileName=' + data,
//                contentType: "application/json; charset=utf-8",
//                success: OnCompleteDownload,
//                //beforeSend: startingAjax,
//                //complete: ajaxCompleted,
//                error: onError,
//            });
//        }
//    });
//    $('#exportExcel').click(exportDoctorExcel);
//    $('#exportExcel2').click(exportDoctorExcel2);
//});


function OnCompleteDownload(data, status) {
    $('#dialog').hide();

    if (data == 'Your File Has been Processed Successfully') {
        AlertMsg('Successful Data Process');
        //ProcessDATARTBD();
    }
    else {
        //  alert('Error Data Upload');
        AlertMsg('Error Data Upload');
    }
}

function ProcessDATARTBD() {
    $('#dialog1').show();
    $.ajax({
        type: "POST",
        url: "../BWSD/GetExcelRTBDForBrickUpload.ashx?Type=RTBDProcess",
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
        //alert('Successful Data Process');
        AlertMsg('Successful Data Process');
    }
    else {
        //alert('Error Data Processing');
        AlertMsg('Error Data Processing')
    }
}

function exportDoctorExcel() {
    window.open("../BWSD/GetExcelRTBDForBrickUpload.ashx?Type=D");
};

function exportDoctorExcel2() {
    window.open("../BWSD/GetExcelRTBDForBrickUpload.ashx?Type=DD");
};

function AlertMsg(text) {
    toastr.info(text, 'Alert', {
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

function onError(request, status, error) {
    // alert('Error is occured');
    AlertMsg('Error is occured')
    $('#dialog').hide();
    $('#dialog1').hide();
}

function startingAjax() {
    $('#dialog').show();
}

function ajaxCompleted() {
    $('#dialog').hide();
}

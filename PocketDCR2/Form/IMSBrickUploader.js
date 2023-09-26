$(document).ready(function () {

    $('#dialog').hide();
    $('#uploadify_button2').uploadify({

        'buttonText': 'Upload File',
        'fileSizeLimit': '100MB',
        'swf': '../Scripts/Uploadify/uploadify.swf',
        'uploader': "../Handler/IMSBrickUploader.ashx?Type=" + 'U',
        'onUploadStart': function () {
        },
        'width': '140',
        'height': '25',
        'onUploadSuccess': function (file, data, response) {

            $('#dialog').show();
            $.ajax({
                url: "../Handler/IMSBrickUploader.ashx?Type=" + 'IMSBU' + '&FileName=' + file.name + '&PFileName=' + data,
                contentType: "application/json; charset=utf-8",
                success: OnCompleteDownload,
                error: onError,
            });
        }
    });
});

function OnCompleteDownload(data, status) {
    debugger
    $('#dialog').hide();
    if (data == 'Your File Has been Processed Successfully') {
        alert("Your File Has been Processed Successfully");
    }
    else {
        alert('Error Data Upload');
    }

}
function onError(request, status, error) {

    alert('Error is occured');
    $('#dialog').hide();

}
function startingAjax() {

    $('#dialog').show();
}

function ajaxCompleted() {

    $('#dialog').hide();
}


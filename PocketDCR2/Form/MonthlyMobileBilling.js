
$(document).ready(function () {

    //$("#uploadify_button").uploadify({txtCurrentAddress2
    //    height: 30,
    //    swf: '../Scripts/Uploadify/uploadify.swf',
    //    uploader: "../Handler/GetExcelEmployee.ashx?Type=" + 'D',
    //    width: 120
    //});

    $('#uploadify_button1').uploadify({
        'swf': '../Scripts/Uploadify/uploadify.swf',
        'uploader': "../Handler/GetExcelMobileBill.ashx?Type=" + 'U',
        'width': '140',
        'height': '25',
        //'wmode': 'transparent',
        'onUploadSuccess': function (file, data, response) {
            $('#dialog').jqm({ modal: true });
            $('#dialog').jqm();
            $('#dialog').jqmShow();

            $.ajax({
                url: "../Handler/GetExcelMobileBill.ashx?Type=" + 'PF' + '&FileName=' + file.name + '&date=' + $('#txtDate').val(),
                contentType: "application/json; charset=utf-8",
                success: OnCompleteDownload,
                error: onError
            });
            //$('#dialog').jqmHide();
        }
    });

});

function onError(request, status, error) {

    alert("Alert Has Been Occured");
    return false;

}

function OnCompleteDownload(data, status) {
    var returndata = data;
    //$('#dialog').jqmHide();

    alert(returndata);
}


function onCalendarShown() {

    var cal = $find("calendar1");
    //Setting the default mode to month
    cal._switchMode("months", true);

    //Iterate every month Item and attach click event to it
    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.addHandler(row.cells[j].firstChild, "click", call);
            }
        }
    }
}

function onCalendarHidden() {
    var cal = $find("calendar1");
    //Iterate every month Item and remove click event from it
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

function CurrentDateShowing(e) {
    if (!e.get_selectedDate() || !e.get_element().value)
        e._selectedDate = (new Date()).getDateOnly();
}

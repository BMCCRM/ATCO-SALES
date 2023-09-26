// Global Variables
var ClassId = 0;
var id = 0;
var myData = "", mode = "", msg = "", jsonObj = "", iidd = "", validd = "";
var datte;
$(document).ready(function () {

    date = new Date();
    $('#txtdate').html(date.format("dd/MM/yyyy"));
    datte = new Date().toJSON().slice(0, 10);
    //var params = window.location.search.split('?');
    //var ba = params[1].split('=');
    //ab = ba[1].split('/');
    //var aab = decodeURI(ab[0]);
    //var validd = decodeURI(ab[1]);
    var aab = $.cookie('flmname');
    var d = $.cookie('flmmobile');
    var lat = $.cookie('lat');
    var lan = $.cookie('lan');
    iidd = aab;
    validd = $.cookie('type');
    var name = aab.split('-');
    $('#imagediv').empty();
    $('#imagediv').append('<img src="../TeamImages/' + name[0] + '_image.jpg" style="" width="100%" height="100%; " />');
    $('#txtrep').html(aab);
    if (validd == "Flm") {
        $('#ddlDocTitle').hide();
        $('#ddlDocArea').hide();
        FillStretchedTarget();
        FillTradeActivityFLM();
        FillCustomerChannelFocusFLM();
        FillSellingSkillsFocusAreaFLM();
        FillProduct();
        fillgridSalesFeedback();
        //filllastrecords();
    }
    else {

        $('#ddlDocTitle').show();
        $('#ddlDocArea').show();

        FillStretchedTarget();
        FillTradeActivity();
        FillCustomerChannelFocus();
        FillSellingSkillsFocusArea();
        FillProduct();
        fillgridSalesFeedback();
        filldoctors();
        //filllastrecords();
    }
    //  draw();
    filllastrecords();
    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#btnOk').click(btnOkClicked);

    //initMap(lat, lan);
    $('#divConfirmation').jqm({ modal: true });
    $('#Divmessage').jqm({ modal: true });

    

});

function initMap(lat, lan) {
    //24.868683, 67.0641357
    lat = (lat == "") ? "24.8490202" : lat;
    lan = (lan == "") ? "66.9784621" : lan;
    //var myLatLng = { lat: 37.0625, lng: 95.677068 };

    var myLatLng = { lat: parseFloat(lat), lng: parseFloat(lan) };

    var map = new google.maps.Map($("#mapppp")[0], {
        zoom: 18,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Location'
    });
}

function fillgridSalesFeedback() {

    var mioid = iidd.split('-');
    var mydata = "{'Emp_ID':'" + mioid[0] + "','rType':'" + validd + "'}";
    $.ajax({
        type: "POST",
        url: "salesfeedback.asmx/GridSalesFeedback_CommaSeperate",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: mydata,
        success: successSalesFeedback,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
    //var mioid = iidd.split('-');

    //var mydata = "{'emp_ID':'" + mioid[0] + "','rType':'" + validd + "'}";
    //$.ajax({
    //    type: "POST",
    //    url: "salesfeedback.asmx/GridSalesFeedback",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    data: mydata,
    //    success: successSalesFeedback,
    //    error: onError,
    //    beforeSend: startingAjax,
    //    complete: ajaxCompleted,
    //    cache: false
    //});

}

function successSalesFeedback(data, status) {

    $('#gridSalesFeedback').empty();

    if (validd != "Flm") {
        $('#gridSalesFeedback').empty();
        $('#gridSalesFeedback').prepend($('<table id="datatab"  class="rwd-table"><thead style="background-color:whitesmoke; ">' +
                                            '<tr style="color:black;"><th>Date</th><th>Commitment Level-Sales</th><th>Brand Focus For Today\'s Sale</th>' +
                                            '<th>Customer Or Channel Focus</th><th>Trade Activity</th><th>Engagement Strategy</th><th>Doctor Name</th><th>Remarks</th><th>Delete</th></tr></thead><tbody>'));
        if (data.d != "No") {
            jsonObj = jsonParse(data.d);

            $.each(jsonObj, function (i, option) {
                $('#datatab').append($("<tr style='text-align:center;'><td class='ob_ST'>" + option.DateSF + "</td>"
                    + " <td class='ob_ST'>" + option.StretchedTarget + "</td>"
                     + " <td class='ob_ST'>" + option.ProductName + "</td>"
                      + " <td class='ob_ST'>" + option.CustomerChannelFocus + "</td>"
                     + " <td class='ob_ST'>" + option.TradeActivity + "</td>"
                       + " <td class='ob_ST'>" + option.SellingSkillsFocusArea + "</td>"
                       + " <td class='ob_ST'>" + option.DocName + "</td>"
                         + " <td class='ob_ST'>" + option.Remarks + "</td>"

                    //+ ' <td class="ob_text"><a href="#" onclick="oGrid_Edit(' + option.ID + ');return false">Edit</a>' + "</td>"
                   + "<td class='ob_text'>" + '<a href="#" onclick="oGrid_Delete(' + option.ID + ');return false">Delete</a>' + '</td></tr>'));
            });

        }

        $('#gridSalesFeedback').append($('</tbody></table>'));

        $('#datatab').dataTable({
            "sDom": "<'dataTables_search'<'col-md-4'<'dt_actions'>l><'col-md-8'f>r>t<'dataTables_pager'<'col-md-4'i><'col-md-8'p>>",
            "sPaginationType": "full_numbers",
            "iDisplayLength": 10,
            "bSearchable": false,
            "aaSorting": [[0, "asc"]]
        });
    }
    else {
        $('#gridSalesFeedback').empty();
        $('#gridSalesFeedback').prepend($('<table id="datatab"  class="rwd-table"><thead style="background-color:whitesmoke; ">' +
                                            '<tr style="color:black;"><th>Date</th><th>Commitment Level-Sales</th><th>Brand Focus For Today\'s Sale</th>' +
                                            '<th>Customer Or Channel Focus</th><th>Trade Activity</th><th>Engagement Strategy</th><th>Remarks</th><th>Delete</th></tr></thead><tbody>'));
        if (data.d != "No") {
            jsonObj = jsonParse(data.d);

            $.each(jsonObj, function (i, option) {
                $('#datatab').append($("<tr style='text-align:center;'><td class='ob_ST'>" + option.DateSF + "</td>"
                    + " <td class='ob_ST'>" + option.StretchedTarget + "</td>"
                     + " <td class='ob_ST'>" + option.ProductName + "</td>"
                      + " <td class='ob_ST'>" + option.CustomerChannelFocus + "</td>"
                     + " <td class='ob_ST'>" + option.TradeActivity + "</td>"
                       + " <td class='ob_ST'>" + option.SellingSkillsFocusArea + "</td>"                      
                         + " <td class='ob_ST'>" + option.Remarks + "</td>"

                    //+ ' <td class="ob_text"><a href="#" onclick="oGrid_Edit(' + option.ID + ');return false">Edit</a>' + "</td><td class='ob_text'>"
                    + '<a href="#" onclick="oGrid_Delete(' + option.ID + ');return false">Delete</a>' + '</td></tr>'));
            });

        }

        $('#gridSalesFeedback').append($('</tbody></table>'));

        $('#datatab').dataTable({
            "sDom": "<'dataTables_search'<'col-md-4'<'dt_actions'>l><'col-md-8'f>r>t<'dataTables_pager'<'col-md-4'i><'col-md-8'p>>",
            "sPaginationType": "full_numbers",
            "iDisplayLength": 10,
            "bSearchable": false,
            "aaSorting": [[0, "asc"]]
        });
    }

}

function FillStretchedTarget() {
    $.ajax({
        type: "POST",
        url: "salesfeedback.asmx/FillStretchedTarget",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data, status) {
            $('#ddStretchedTarget').empty();
            $("#ddStretchedTarget").append("<option value='-1'>Commitment Level-Sales</option>");
            if (data.d == "No") {

            }
            else {
                var msg = JSON.parse(data.d);
                $.each(msg, function (i, option) {
                    $("#ddStretchedTarget").append("<option value='" + option.ID + "'>" + option.StretchedTarget + "</option>");
                    //Changes by Zohaib
                    //$("#ddStretchedTarget").append("<option value='" + option.ID + "," + option.StretchedTarget + "'>" + option.StretchedTarget + "</option>");
                });
            }

        },

        error: onError,
        cache: false

    });

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
}

//FillTradeActivity
function FillTradeActivity() {
    $.ajax({
        type: "POST",
        url: "salesfeedback.asmx/FillTradeActivity",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data, status) {
            $('#ddTradeActivity').empty();
            $("#ddTradeActivity").append("<option value='-1'>Trade Activity</option>");
            if (data.d == "No") {

            }
            else {
                var msg = JSON.parse(data.d);
                $.each(msg, function (i, option) {
                    $("#ddTradeActivity").append("<li><input type='checkbox' value='" + option.ID + "," + option.TradeActivity + "'/>" + option.TradeActivity + "</li>");
                });

                $("#tradeActivityMain dt a").on('click', function () {
                    $("#ddTradeActivity").slideToggle('fast');
                });

                $("#tradeActivityMain dd ul li a").on('click', function () {
                    $("#tradeActivityMain dd ul").hide();
                });

                function getSelectedValue(id) {
                    return $("#" + id).find("dt a span.value").html();
                }

                $(document).bind('click', function (e) {
                    var $clicked = $(e.target);
                    if (!$clicked.parents().hasClass("dropdown")) $("#tradeActivityMain dd ul").hide();
                });

                $('#ddTradeActivity input[type="checkbox"]').on('click', function () {

                    var title = $(this).closest('#ddTradeActivity').find('input[type="checkbox"]').val().split(',')[1],
                      title = $(this).val().split(',')[1] + ",";

                    if ($(this).is(':checked')) {
                        var html = '<span title="' + title + '">' + title + '</span>';
                        $('#TradeActivityShow').append(html);
                        $("#TradeActivitytitle").hide();
                    } else {
                        $('span[title="' + title + '"]').remove();
                        var ret = $("#TradeActivitytitle");
                        $('#tradeActivityMain dt a').append(ret);

                    }
                });
            }



        },

        error: onError,
        cache: false

    });

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
}
function FillTradeActivityFLM() {
    $.ajax({
        type: "POST",
        url: "salesfeedback.asmx/FillTradeActivityFlm",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data, status) {
            $('#ddTradeActivity').empty();
            //$("#ddTradeActivity").append("<option value='-1'>Trade Activity</option>");
            //$("#ddTradeActivity").append('<li><input type="checkbox" value="Apple" />Apple</li>');
            if (data.d == "No") {

            }
            else {
                var msg = JSON.parse(data.d);
                $.each(msg, function (i, option) {
                    $("#ddTradeActivity").append("<li><input type='checkbox' value='" + option.ID + ","+option.TradeActivityFLM +"'/>" + option.TradeActivityFLM + "</li>");
                });
            }
            $("#tradeActivityMain dt a").on('click', function () {
                $("#ddTradeActivity").slideToggle('fast');
            });

            $("#tradeActivityMain dd ul li a").on('click', function () {
                $("#tradeActivityMain dd ul").hide();
            });

            function getSelectedValue(id) {
                return $("#" + id).find("dt a span.value").html();
            }

            $(document).bind('click', function (e) {
                var $clicked = $(e.target);
                if (!$clicked.parents().hasClass("dropdown")) $("#tradeActivityMain dd ul").hide();
            });

            $('#ddTradeActivity input[type="checkbox"]').on('click', function () {

                var title = $(this).closest('#ddTradeActivity').find('input[type="checkbox"]').val().split(',')[1],
                  title = $(this).val().split(',')[1] + ",";

                if ($(this).is(':checked')) {
                    var html = '<span title="' + title + '">' + title + '</span>';
                    $('#TradeActivityShow').append(html);
                    $("#TradeActivitytitle").hide();
                } else {
                    $('span[title="' + title + '"]').remove();
                    var ret = $("#TradeActivitytitle");
                    $('#tradeActivityMain dt a').append(ret);

                }
            });
            
        },

        error: onError,
        cache: false

    });

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
}

function FillCustomerChannelFocus() {
    $.ajax({
        type: "POST",
        url: "salesfeedback.asmx/FillCustomerChannelFocus",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data, status) {
            $('#ddCustomerChannelFocus').empty();
            //  $("#ddCustomerChannelFocus").append("<option value='-1'>Customer Channel Focus</option>");
            if (data.d == "No") {

            }
            else {
                var msg = JSON.parse(data.d);
                $.each(msg, function (i, option) {
                    //$("#ddCustomerChannelFocus").append("<option value='" + option.ID + "'>" + option.CustomerChannelFocus + "</option>");
                    $("#ddCustomerChannelFocus").append("<li><input type='checkbox' value='" + option.ID + "," + option.CustomerChannelFocus + "'/>" + option.CustomerChannelFocus + "</li>");
                });

                $("#CustomerChannelFocusMain dt a").on('click', function () {
                    $("#ddCustomerChannelFocus").slideToggle('fast');
                });

                $("#CustomerChannelFocusMain dd ul li a").on('click', function () {
                    $("#CustomerChannelFocusMain dd ul").hide();
                });

                function getSelectedValue(id) {
                    return $("#" + id).find("dt a span.value").html();
                }

                $(document).bind('click', function (e) {
                    var $clicked = $(e.target);
                    if (!$clicked.parents().hasClass("dropdown")) $("#CustomerChannelFocusMain dd ul").hide();
                });

                $('#ddCustomerChannelFocus input[type="checkbox"]').on('click', function () {

                    var title = $(this).closest('#ddCustomerChannelFocus').find('input[type="checkbox"]').val().split(',')[1],
                      title = $(this).val().split(',')[1] + ",";

                    if ($(this).is(':checked')) {
                        var html = '<span title="' + title + '">' + title + '</span>';
                        $('#CustomerChannelFocusShow').append(html);
                        $("#CustomerChannelFocustitle").hide();
                    } else {
                        $('span[title="' + title + '"]').remove();
                        var ret = $("#CustomerChannelFocustitle");
                        $('#CustomerChannelFocusMain dt a').append(ret);

                    }
                });
            }

        },

        error: onError,
        cache: false

    });

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
}
function FillCustomerChannelFocusFLM() {
    $.ajax({
        type: "POST",
        url: "salesfeedback.asmx/FillCustomerChannelFocusFLM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data, status) {
            $('#ddCustomerChannelFocus').empty();
            //     $("#ddCustomerChannelFocus").append("<option value='-1'>Customer Channel Focus</option>");
            if (data.d == "No") {

            }
            else {
                var msg = JSON.parse(data.d);
                $.each(msg, function (i, option) {
                    // $("#ddCustomerChannelFocus").append("<option value='" + option.ID + "'>" + option.CustomerChannelFocusFLM + "</option>");
                    $("#ddCustomerChannelFocus").append("<li><input type='checkbox' value='" + option.ID + "," + option.CustomerChannelFocusFLM + "'/>" + option.CustomerChannelFocusFLM + "</li>");
                });
                $("#CustomerChannelFocusMain dt a").on('click', function () {
                    $("#ddCustomerChannelFocus").slideToggle('fast');
                });

                $("#CustomerChannelFocusMain dd ul li a").on('click', function () {
                    $("#CustomerChannelFocusMain dd ul").hide();
                });

                function getSelectedValue(id) {
                    return $("#" + id).find("dt a span.value").html();
                }

                $(document).bind('click', function (e) {
                    var $clicked = $(e.target);
                    if (!$clicked.parents().hasClass("dropdown")) $("#CustomerChannelFocusMain dd ul").hide();
                });

                $('#ddCustomerChannelFocus input[type="checkbox"]').on('click', function () {

                    var title = $(this).closest('#ddCustomerChannelFocus').find('input[type="checkbox"]').val().split(',')[1],
                      title = $(this).val().split(',')[1] + ",";

                    if ($(this).is(':checked')) {
                        var html = '<span title="' + title + '">' + title + '</span>';
                        $('#CustomerChannelFocusShow').append(html);
                        $("#CustomerChannelFocustitle").hide();
                    } else {
                        $('span[title="' + title + '"]').remove();
                        var ret = $("#CustomerChannelFocustitle");
                        $('#CustomerChannelFocusMain dt a').append(ret);

                    }
                });
            }

        },

        error: onError,
        cache: false

    });

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
}

function FillSellingSkillsFocusArea() {
    $.ajax({
        type: "POST",
        url: "salesfeedback.asmx/FillSellingSkillsFocusArea",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data, status) {
            $('#ddSellingSkillsFocusArea').empty();
            //$("#ddSellingSkillsFocusArea").append("<option value='-1'>Engagement Strategy</option>");
            if (data.d == "No") {

            }
            else {
                var msg = JSON.parse(data.d);
                $.each(msg, function (i, option) {
                    $("#ddSellingSkillsFocusArea").append("<li><input type='checkbox' value='" + option.ID + "," + option.SellingSkillsFocusArea + "'/>" + option.SellingSkillsFocusArea + "</li>");
                });

                $("#ddSellingSkillsFocusAreaMain dt a").on('click', function () {
                    $("#ddSellingSkillsFocusArea").slideToggle('fast');
                });

                $("#ddSellingSkillsFocusAreaMain dd ul li a").on('click', function () {
                    $("#ddSellingSkillsFocusAreaMain dd ul").hide();
                });

                function getSelectedValue(id) {
                    return $("#" + id).find("dt a span.value").html();
                }

                $(document).bind('click', function (e) {
                    var $clicked = $(e.target);
                    if (!$clicked.parents().hasClass("dropdown")) $("#ddSellingSkillsFocusAreaMain dd ul").hide();
                });

                $('#ddSellingSkillsFocusArea input[type="checkbox"]').on('click', function () {

                    var title = $(this).closest('#ddSellingSkillsFocusArea').find('input[type="checkbox"]').val().split(',')[1],
                      title = $(this).val().split(',')[1] + ",";

                    if ($(this).is(':checked')) {
                        var html = '<span title="' + title + '">' + title + '</span>';
                        $('#SellingSkillsFocusAreaShow').append(html);
                        $("#SellingSkillsFocusAreatitle").hide();
                    } else {
                        $('span[title="' + title + '"]').remove();
                        var ret = $("#SellingSkillsFocusAreatitle");
                        $('#ddSellingSkillsFocusAreaMain dt a').append(ret);

                    }
                });
                
            }

        },

        error: onError,
        cache: false

    });

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
}
function FillSellingSkillsFocusAreaFLM() {
    $.ajax({
        type: "POST",
        url: "salesfeedback.asmx/FillSellingSkillsFocusAreaFLM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data, status) {
            $('#ddSellingSkillsFocusArea').empty();
            //$("#ddSellingSkillsFocusArea").append("<option value='-1'>Engagement Strategy</option>");
            if (data.d == "No") {

            }
            else {
                var msg = JSON.parse(data.d);
                $.each(msg, function (i, option) {
                    $("#ddSellingSkillsFocusArea").append("<li><input type='checkbox' value='" + option.ID + "," + option.SellingSkillsFocusAreaFLM + "'/>" + option.SellingSkillsFocusAreaFLM + "</li>");
                });


                $("#ddSellingSkillsFocusAreaMain dt a").on('click', function () {
                    $("#ddSellingSkillsFocusArea").slideToggle('fast');
                });

                $("#ddSellingSkillsFocusAreaMain dd ul li a").on('click', function () {
                    $("#ddSellingSkillsFocusAreaMain dd ul").hide();
                });

                function getSelectedValue(id) {
                    return $("#" + id).find("dt a span.value").html();
                }

                $(document).bind('click', function (e) {
                    var $clicked = $(e.target);
                    if (!$clicked.parents().hasClass("dropdown")) $("#ddSellingSkillsFocusAreaMain dd ul").hide();
                });

                $('#ddSellingSkillsFocusArea input[type="checkbox"]').on('click', function () {

                    var title = $(this).closest('#ddSellingSkillsFocusArea').find('input[type="checkbox"]').val().split(',')[1],
                      title = $(this).val().split(',')[1] + ",";

                    if ($(this).is(':checked')) {
                        var html = '<span title="' + title + '">' + title + '</span>';
                        $('#SellingSkillsFocusAreaShow').append(html);
                        $("#SellingSkillsFocusAreatitle").hide();
                    } else {
                        $('span[title="' + title + '"]').remove();
                        var ret = $("#SellingSkillsFocusAreatitle");
                        $('#ddSellingSkillsFocusAreaMain dt a').append(ret);

                    }
                });
            }

        },

        error: onError,
        cache: false

    });

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
}

function FillProduct() {

    $.ajax({
        type: "POST",
        url: "salesfeedback.asmx/FillProduct",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data, status) {
            $('#ddProduct').empty();

            if (data.d == "No") {

            }
            else {
                var msg = JSON.parse(data.d);
                $.each(msg, function (i, option) {
                    $("#ddProduct").append("<li><input type='checkbox' value='" + option.ProductId + "," + option.ProductName + "'/>" + option.ProductName + "</li>");
                });


                $("#ddProductMain dt a").on('click', function () {
                    $("#ddProduct").slideToggle('fast');
                });

                $("#ddProductMain dd ul li a").on('click', function () {
                    $("#ddProductMain dd ul").hide();
                });

                function getSelectedValue(id) {
                    return $("#" + id).find("dt a span.value").html();
                }

                $(document).bind('click', function (e) {
                    var $clicked = $(e.target);
                    if (!$clicked.parents().hasClass("dropdown")) $("#ddProductMain dd ul").hide();
                });

                $('#ddProduct input[type="checkbox"]').on('click', function () {

                    var title = $(this).closest('#ddProduct').find('input[type="checkbox"]').val().split(',')[1],
                      title = $(this).val().split(',')[1] + ",";

                    if ($(this).is(':checked')) {
                        var html = '<span title="' + title + '">' + title + '</span>';
                        $('#ProductShow').append(html);
                        $("#Producttitle").hide();
                    } else {
                        $('span[title="' + title + '"]').remove();
                        var ret = $("#Producttitle");
                        $('#ddProductMain dt a').append(ret);

                    }
                });
            }

        },

        error: onError,
        cache: false

    });
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
}

function GetStretchedTarget() {

    $.ajax({
        type: "POST",
        url: "StretchedTarget.asmx/GridStretchedTarget",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: onSuccessStretchedTarget,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

    $('#dialog').jqmHide();

}
function onSuccessStretchedTarget(data, status) {

    $('#GridStretchedTarget').empty();
    $('#GridStretchedTarget').prepend($('<table id="datatables" class="display" style="width: 670px;"><thead><tr>' +
                                        '<th Class="ob_gC_Fc">Stretched Target</th>' +
                                        //'<th Class="ob_gC_Fc">Product Name</th>'+
                                        //'<th Class="ob_gC_Fc">Doctor Classes</th>'+
                                        '<th Class="ob_gC_Fc">Edit</th><th Class="ob_gC_Fc">Delete</th></tr></thead><tbody>'));
    jsonObj = jsonParse(data.d);
    $.each(jsonObj, function (i, option) {
        $('#datatables').append($("<tr style='text-align:center;'><td class='ob_ST'>" + option.StretchedTarget + "</td><td class='ob_text'>"
            + '<a href="#" onclick="oGrid_Edit(' + option.ID + ');return false">Edit</a>' + "</td><td class='ob_text'>"
            + '<a href="#" onclick="oGrid_Delete(' + option.ID + ');return false">Delete</a>' + '</td></tr>'));
    });


    $('#GridStretchedTarget').append($('</tbody></table>'));

    //$('#datatables2').dataTable({
    //    "sPaginationType": "full_numbers"
    //});

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

function btnSaveClicked() {

    var isValidated = $('#form1').validate({
        rules: {
            ddStretchedTarget: {
                required: true,
                alpha: true
            }
        }
    });

    if (!$('#form1').valid()) {
        return false;
    }

    mode = $('#hdnMode').val();

    if (mode === "") {

        mode = "AddMode";
    }

    if (mode === "AddMode") {
        SaveData();
    }

    else if (mode === "EditMode") {
        UpdateData();
    }
    else {
        return false;
    }

    return false;
}
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
        url: "salesfeedback.asmx/DeleteSalesFeedback",
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
function filldoctors() {
    var mioid = iidd.split('-');

    var myData = "{'employeeId':'" + mioid[0] + "','dateTime':'" + datte + "'}";

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
    $('#ddlDoctors').empty();

    if (data.d != "No") {
        jsonObj = jsonParse(data.d);
        $.each(jsonObj, function (i, option) {
            $("#ddlDoctors").append("<li><input type='checkbox' value='" + option.DoctorID + "," + option.DoctorName + "'/>" + option.DoctorName + "</li>");
        });

        $("#DoctorsMain dt a").on('click', function () {
            $("#ddlDoctors").slideToggle('fast');
        });

        $("#DoctorsMain dd ul li a").on('click', function () {
            $("#DoctorsMain dd ul").hide();
        });

        function getSelectedValue(id) {
            return $("#" + id).find("dt a span.value").html();
        }

        $(document).bind('click', function (e) {
            var $clicked = $(e.target);
            if (!$clicked.parents().hasClass("dropdown")) $("#DoctorsMain dd ul").hide();
        });

        $('#ddlDoctors input[type="checkbox"]').on('click', function () {

            var title = $(this).closest('#ddlDoctors').find('input[type="checkbox"]').val().split(',')[1],
              title = $(this).val().split(',')[1] + ",";

            if ($(this).is(':checked')) {
                var html = '<span title="' + title + '">' + title + '</span>';
                $('#DoctorsShow').append(html);
                $("#Doctorstitle").hide();
            } else {
                $('span[title="' + title + '"]').remove();
                var ret = $("#Doctorstitle");
                $('#DoctorsMain dt a').append(ret);

            }
        });
    }


    //$('datatabb').dataTable({ bFilter: false, bInfo: false });
}
// Functions
function SaveData() {
    var success = "";
    if ($('#ddStretchedTarget').val() == '-1') {
        alert("Please select all the fields");
        return false;
    }
    if ($('#ddTradeActivity').val() == '-1') {
        alert("Please select all the fields");
        return false;
    }
    //if ($('#ddProduct').val() == '-1') {
    //    alert("Please select all the fields");
    //    return false;
    //}
    if ($('#ddSellingSkillsFocusArea').val() == '-1') {
        alert("Please select all the fields");
        return false;
    }
    //if ($('#ddCustomerChannelFocus').val() == '-1') {
    //    alert("Please select all the fields");
    //    return false;
    //}
    if ($('#txtRemark').val() == '') {
        alert("Please enter Remarks");
        return false;
    }
    $('#hdnMode').val("AddMode");

    var proo = [];
    var custchannel = [];
    var docid = [];
    var prodNames = [];
    var custchannelNames = [];
    var docNames = [];
    var EngStrNames = [];
    var EngStrIDs = [];
    var TradeActNames = [];
    var TradeActIDs = [];

    //$('#ddProduct :selected').each(function (i, selected) {
    //    proo[i] = $(selected).val();
    //});
    //$('#ddCustomerChannelFocus :selected').each(function (i, selected) {
    //    custchannel[i] = $(selected).val();
    //});
    //$('#ddlDoctors :selected').each(function (i, selected) {
    //    docid[i] = $(selected).val();
    //});

    //$('#ddProduct :selected').each(function (i, selected) {
    //    prodNames[i] = $(selected).text();
    //});
    //$('#ddCustomerChannelFocus :selected').each(function (i, selected) {
    //    custchannelNames[i] = $(selected).text();
    //});
    //$('#ddlDoctors :selected').each(function (i, selected) {
    //    docNames[i] = $(selected).text();
    //});

    $('#ddSellingSkillsFocusArea input[type="checkbox"]:checked').each(function (i, selected) {
        EngStrNames[i]= $(selected).val().split(',')[1];
    });
    $('#ddSellingSkillsFocusArea input[type="checkbox"]:checked').each(function (i, selected) {
        EngStrIDs[i] = $(selected).val().split(',')[0];
    });

    $('#ddTradeActivity input[type="checkbox"]:checked').each(function (i, selected) {
        TradeActNames[i] = $(selected).val().split(',')[1];
    });
    $('#ddTradeActivity input[type="checkbox"]:checked').each(function (i, selected) {
        TradeActIDs[i] = $(selected).val().split(',')[0];
    });

    $('#ddProduct input[type="checkbox"]:checked').each(function (i, selected) {
        proo[i] = $(selected).val().split(',')[0];
    });

    $('#ddProduct input[type="checkbox"]:checked').each(function (i, selected) {
        prodNames[i] = $(selected).val().split(',')[1];
    });

    $('#ddCustomerChannelFocus input[type="checkbox"]:checked').each(function (i, selected) {
        custchannel[i] = $(selected).val().split(',')[0];
    });

    $('#ddCustomerChannelFocus input[type="checkbox"]:checked').each(function (i, selected) {
        custchannelNames[i] = $(selected).val().split(',')[1];
    });

    $('#ddlDoctors input[type="checkbox"]:checked').each(function (i, selected) {
        docid[i] = $(selected).val().split(',')[0];
    });

    $('#ddlDoctors input[type="checkbox"]:checked').each(function (i, selected) {
        docNames[i] = $(selected).val().split(',')[1];
    });

    //Faraz work for just View Comma Seprated

    var mioid = iidd.split('-');
    if (validd == "Flm") {
        myData = "{'Emp_ID':'" + mioid[0] + "','Date':'" + $('#txtdate').text() + "','StretchedTargetID':'" + $('#ddStretchedTarget').val() + "," + $('#ddStretchedTarget :selected').text() + "','TradeActivityID':'" + TradeActNames + "','ProductsID':'" + prodNames + "','SellingSkillsFocusAreaID':'" + EngStrNames + "','CustomerChannelFocusID':'" + custchannelNames + "','Remarks':'" + $('#txtRemark').val() + "','docid':'" + docNames + "'}";

        $.ajax({
            type: "POST",
            url: "salesfeedback.asmx/InsertSalesFeedback_ComaSaperate_FLM",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d == "OK") {
                    success = 'asd';
                }
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });
    }
    else {
        myData = "{'Emp_ID':'" + mioid[0] + "','Date':'" + $('#txtdate').text() + "','StretchedTargetID':'" + $('#ddStretchedTarget').val() + "','TradeActivityID':'" + TradeActNames + "','ProductsID':'" + prodNames + "','SellingSkillsFocusAreaID':'" + EngStrNames + "','CustomerChannelFocusID':'" + custchannelNames + "','Remarks':'" + $('#txtRemark').val() + "','docid':'" + docNames + "'}";

        $.ajax({
            type: "POST",
            url: "salesfeedback.asmx/InsertSalesFeedback_ComaSaperate",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d == "OK") {
                    success = 'asd';
                }
            },
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });
    }

    //Loop Insert Data with ID's
    if (proo.length >= custchannel.length || proo.length >= docid.length || proo.length >= TradeActIDs.length || proo.length >= EngStrIDs.length) {
        for (var i = 0; i < proo.length; i++) {
            var productid = proo[i];
            var engstrid = (i >= EngStrIDs.length) ? 0 : EngStrIDs[i];
            var tradeactid = (i >= TradeActIDs.length) ? 0 : TradeActIDs[i];
            var channelid = (i >= custchannel.length) ? 0 : custchannel[i];
            var doctor = (i >= docid.length) ? 0 : docid[i];
            var mioid = iidd.split('-');

            if (validd == "Flm") {
                myData = "{'flmID':'" + mioid[0] + "','Date':'" + $('#txtdate').text() + "','StretchedTargetID':'" + $('#ddStretchedTarget').val() + "','TradeActivityID':'" + tradeactid + "','ProductsID':'" + productid + "','SellingSkillsFocusAreaID':'" + engstrid + "','CustomerChannelFocusID':'" + channelid + "','Remarks':'" + $('#txtRemark').val() + "','docid':'" + doctor + "'}";

                $.ajax({
                    type: "POST",
                    url: "salesfeedback.asmx/InsertSalesFeedback_FLM",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        if (data.d == "OK") {
                            success = 'asd';
                        }
                    },
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    async: false,
                    cache: false
                });
            }
            else {
                myData = "{'employeeID':'" + mioid[0] + "','Date':'" + $('#txtdate').text() + "','StretchedTargetID':'" + $('#ddStretchedTarget').val() + "','TradeActivityID':'" + tradeactid + "','ProductsID':'" + productid + "','SellingSkillsFocusAreaID':'" + engstrid + "','CustomerChannelFocusID':'" + channelid + "','Remarks':'" + $('#txtRemark').val() + "','docid':'" + doctor + "'}";
                $.ajax({
                    type: "POST",
                    url: "salesfeedback.asmx/InsertSalesFeedback",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        if (data.d == "OK") {
                            success = 'asd';
                        }
                    },
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    async: false,
                    cache: false
                });
            }
        }

    }
    else if (custchannel.length >= proo.length || custchannel.length >= docid.length || custchannel.length >= TradeActIDs.length || custchannel.length >= EngStrIDs.length) {
        for (var i = 0; i < custchannel.length; i++) {
            var channelid = custchannel[i];
            var productid = (i >= proo.length) ? 0 : proo[i];
            var engstrid = (i >= EngStrIDs.length) ? 0 : EngStrIDs[i];
            var tradeactid = (i >= TradeActIDs.length) ? 0 : TradeActIDs[i];
            var doctor = (i >= docid.length) ? 0 : docid[i];
            var mioid = iidd.split('-');

            myData = "{'id':'" + mioid[0] + "','Date':'" + $('#txtdate').text() + "','StretchedTargetID':'" + $('#ddStretchedTarget').val() + "','TradeActivityID':'" + tradeactid + "','ProductsID':'" + productid + "','SellingSkillsFocusAreaID':'" + engstrid + "','CustomerChannelFocusID':'" + channelid + "','Remarks':'" + $('#txtRemark').val() + "','docid':'" + doctor + "'}";

            $.ajax({
                type: "POST",
                url: "salesfeedback.asmx/InsertSalesFeedback",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.d == "OK") {
                        success = 'asd';
                    }
                },
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                async: false,
                cache: false
            });
        }
    } else if (TradeActIDs.length >= proo.length || TradeActIDs.length >= docid.length || TradeActIDs.length >= custchannel.length || TradeActIDs.length >= EngStrIDs.length) {
        for (var i = 0; i < TradeActIDs.length; i++) {
            var channelid = TradeActIDs[i];
            var productid = (i >= proo.length) ? 0 : proo[i];
            var engstrid = (i >= EngStrIDs.length) ? 0 : EngStrIDs[i];
            var tradeactid = (i >= TradeActIDs.length) ? 0 : TradeActIDs[i];
            var doctor = (i >= docid.length) ? 0 : docid[i];
            var mioid = iidd.split('-');

            myData = "{'id':'" + mioid[0] + "','Date':'" + $('#txtdate').text() + "','StretchedTargetID':'" + $('#ddStretchedTarget').val() + "','TradeActivityID':'" + tradeactid + "','ProductsID':'" + productid + "','SellingSkillsFocusAreaID':'" + engstrid + "','CustomerChannelFocusID':'" + channelid + "','Remarks':'" + $('#txtRemark').val() + "','docid':'" + doctor + "'}";

            $.ajax({
                type: "POST",
                url: "salesfeedback.asmx/InsertSalesFeedback",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.d == "OK") {
                        success = 'asd';
                    }
                },
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                async: false,
                cache: false
            });
        }
    } else if (EngStrIDs.length >= proo.length || EngStrIDs.length >= docid.length || EngStrIDs.length >= custchannel.length || EngStrIDs.length >= TradeActIDs.length) {
        for (var i = 0; i < EngStrIDs.length; i++) {
            var channelid = EngStrIDs[i];
            var productid = (i >= proo.length) ? 0 : proo[i];
            var engstrid = (i >= EngStrIDs.length) ? 0 : EngStrIDs[i];
            var tradeactid = (i >= TradeActIDs.length) ? 0 : TradeActIDs[i];
            var doctor = (i >= docid.length) ? 0 : docid[i];
            var mioid = iidd.split('-');

            myData = "{'id':'" + mioid[0] + "','Date':'" + $('#txtdate').text() + "','StretchedTargetID':'" + $('#ddStretchedTarget').val() + "','TradeActivityID':'" + tradeactid + "','ProductsID':'" + productid + "','SellingSkillsFocusAreaID':'" + engstrid + "','CustomerChannelFocusID':'" + channelid + "','Remarks':'" + $('#txtRemark').val() + "','docid':'" + doctor + "'}";

            $.ajax({
                type: "POST",
                url: "salesfeedback.asmx/InsertSalesFeedback",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.d == "OK") {
                        success = 'asd';
                    }
                },
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                async: false,
                cache: false
            });
        }
    }
    else {
        for (var i = 0; i < docid.length; i++) {
            var doctor = docid[i];
            var productid = (i >= proo.length) ? 0 : proo[i];
            var channelid = (i >= custchannel.length) ? 0 : custchannel[i];
            var engstrid = (i >= EngStrIDs.length) ? 0 : EngStrIDs[i];
            var tradeactid = (i >= TradeActIDs.length) ? 0 : TradeActIDs[i];
            var mioid = iidd.split('-');

            myData = "{'id':'" + mioid[0] + "','Date':'" + $('#txtdate').text() + "','StretchedTargetID':'" + $('#ddStretchedTarget').val() + "','TradeActivityID':'" + tradeactid + "','ProductsID':'" + productid + "','SellingSkillsFocusAreaID':'" + engstrid + "','CustomerChannelFocusID':'" + channelid + "','Remarks':'" + $('#txtRemark').val() + "','docid':'" + doctor + "'}";

            $.ajax({
                type: "POST",
                url: "salesfeedback.asmx/InsertSalesFeedback",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.d == "OK") {
                        success = 'asd';
                    }
                },
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                async: false,
                cache: false
            });
        }
    }



    if (success == 'asd') {
        mode = $('#hdnMode').val();
        msg = '';

        if (mode === "AddMode") {
            msg = 'Data inserted succesfully!';
            fillgridSalesFeedback();
            ClearFields();
            alert(msg);
        }
    }

}

function oGrid_Edit(sender) {

    $('#hdnMode').val("EditMode");
    id = sender;
    ClearFields();
    myData = "{'id':'" + id + "'}";

    $.ajax({
        type: "POST",
        url: "salesfeedback.asmx/EditSalesFeedback",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetStretchedTarget,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetStretchedTarget(data, status) {
    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $("#ddStretchedTarget").val(jsonObj[0].StretchedTargetID);
        $("#ddProduct").val(jsonObj[0].ProductsID);
        $("#ddCustomerChannelFocus").val(jsonObj[0].CustomerChannelFocusID);
        $("#ddTradeActivity").val(jsonObj[0].TradeActivityID);
        $("#ddSellingSkillsFocusArea").val(jsonObj[0].SellingSkillsFocusAreaID);
        $("#txtRemark").val(jsonObj[0].Remarks);
        $("#ddlDoctors").val(jsonObj[0].DoctorId);
        // sf.ID, CONVERT(VARCHAR(24), sf.Date, 103) as DateSF, emp.LoginId, st.StretchedTarget, ta.TradeActivity, p.ProductName,
        //ssfa.SellingSkillsFocusArea, ccf.CustomerChannelFocus, sf.Remarks
    }
}
function oGrid_Delete(sender) {
    id = sender;
    myData = "{'id':'" + id + "','rType':'" + validd + "'}";

    $.ajax({
        type: "POST",
        url: "salesfeedback.asmx/DeleteSalesFeedback",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            fillgridSalesFeedback();
            ClearFields();
            alert('Data Deleted Successfully');
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

}

function UpdateData() {

    myData = "{'id':'" + id + "','Date':'" + $('#txtdate').text() + "','StretchedTargetID':'" + $('#ddStretchedTarget').val() + "','TradeActivityID':'" + $('#ddTradeActivity').val() + "','ProductsID':'" + $('#ddProduct').val() + "','SellingSkillsFocusAreaID':'" + $('#ddSellingSkillsFocusArea').val() + "','CustomerChannelFocusID':'" + $('#ddCustomerChannelFocus').val() + "','Remarks':'" + $('#txtRemark').val() + "','doctorid':'" + $('#ddlDoctors').val() + "'}";

    $.ajax({
        type: "POST",
        url: "salesfeedback.asmx/UpdateSalesFeedback",
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
            fillgridSalesFeedback();
        }
        else if (mode === "EditMode") {
            msg = 'Data updated succesfully!';
            fillgridSalesFeedback();
        }
        else if (mode === "DeleteMode") {
            $('#divConfirmation').jqmHide();
            msg = 'Data deleted succesfully!';
            //fillgridSalesFeedback();
        }

        ClearFields();

        $('#hdnMode').val("");
        $('#hlabmsg').append(msg);
        alert(msg);

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

function startingAjax() {

    $('#imgLoading').show();
}
function ClearFields() {

    $("#ddStretchedTarget").val("-1");
    $("#ddProduct").val("-1");
    $("#ddCustomerChannelFocus").val("-1");
    $("#ddTradeActivity").val("-1");
    $("#ddSellingSkillsFocusArea").val("-1");
    $("#txtRemark").val("");
    $('#ddlDoctors').val('');
}
function ajaxCompleted() {

    $('#imgLoading').hide();
}

function filllastrecords() {
    if (validd != "Flm") {
        var mioid = iidd.split('-');
        var mydata = "{'empid':'" + mioid[0] + "'}";
        $.ajax({
            type: "POST",
            url: "salesfeedback.asmx/GetlastRecords",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: mydata,
            async: false,
            success: function (data, status) {
                $('#lastrecord').empty();

                if (data.d == "No") {
                    $('#mio').show();
                    $('#flm').hide();
                    $('#mio').dataTable({
                        "sDom": "<'dataTables_search'<'col-md-4'<'dt_actions'>l><'col-md-8'f>r>t<'dataTables_pager'<'col-md-4'i><'col-md-8'p>>",
                        "sPaginationType": "full_numbers",
                        "iDisplayLength": 10,
                        "bSearchable": false,
                        "aaSorting": [[0, "desc"]]
                    });
                }
                else {
                    $('#mio').show();
                    $('#flm').hide();
                    var msg = JSON.parse(data.d);
                    initMap(msg[0].latitude, msg[0].longitude);
                    $.each(msg, function (i, option) {
                        var descrip = option.System;
                        if (descrip == '')
                        {
                            descrip = '--';
                        }
                        var datetimee = option.Createdatetime.split(' ');
                        $("#lastrecord").append("<tr><td>" + option.Createdatetime + " </td><td>"
                            + option.SalesAchieved + "% </td><td>" + option.SalesForeCast + "% </td><td>" + option.joinvisit + " </td><td>" + descrip + " </td>  </tr>");
                    });

                    $('#mio').dataTable({
                        "sDom": "<'dataTables_search'<'col-md-4'<'dt_actions'>l><'col-md-8'f>r>t<'dataTables_pager'<'col-md-4'i><'col-md-8'p>>",
                        "sPaginationType": "full_numbers",
                        "iDisplayLength": 10,
                        "bSearchable": false,
                        "aaSorting": [[0, "desc"]]
                    });
                }
            },
            error: onError,
            cache: false
        });
    } else {
        var mioid = iidd.split('-');
        var mydata = "{'empid':'" + mioid[0] + "'}";
        $.ajax({
            type: "POST",
            url: "salesfeedback.asmx/GetlastRecordsFlm",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: mydata,
            async: false,
            success: function (data, status) {
                $('#flastrecord').empty();
                if (data.d == "No") {
                    $('#mio').hide();
                    $('#flm').show();

                    $('#flm').dataTable({
                        "sDom": "<'dataTables_search'<'col-md-4'<'dt_actions'>l><'col-md-8'f>r>t<'dataTables_pager'<'col-md-4'i><'col-md-8'p>>",
                        "sPaginationType": "full_numbers",
                        "iDisplayLength": 10,
                        "bSearchable": false,
                        "aaSorting": [[0, "desc"]]
                    });
                }
                else {
                    $('#mio').hide();
                    $('#flm').show();
                    var msg = JSON.parse(data.d);
                    //initMap(msg[0].latitude, msg[0].longitude);
                    $.each(msg, function (i, option) {
                        var datetimee = option.Visitdatetime.split(' ');
                        $("#flastrecord").append("<tr><td>" + option.Visitdatetime + " </td><td>"
                            + option.FLMName + " </td><td>" + option.MIOName + " </td><td>"
                            + option.NCSMFocusArea + " </td><td>" + option.PFSPFocusArea + " </td><td>"
                            + option.ChemistsFocusArea + " </td><td>" + option.SalesAchieved + "% </td><td>"
                            + option.SalesForeCast + "% </td><td>" + option.joinvisit + " </td><td>" + option.Description + " </td> </tr>");
                    });
                    $('#flm').dataTable({
                        "sDom": "<'dataTables_search'<'col-md-4'<'dt_actions'>l><'col-md-8'f>r>t<'dataTables_pager'<'col-md-4'i><'col-md-8'p>>",
                        "sPaginationType": "full_numbers",
                        "iDisplayLength": 10,
                        "bSearchable": false,
                        "aaSorting": [[0, "desc"]]
                    });
                }
            },
            error: onError,
            cache: false
        });
        GetLocationOfFLM(mioid[0], validd);
    }

}


function GetLocationOfFLM(empid,check)
{
    myData = "{'empid':'" + empid + "','check':'" + check + "'}";

    $.ajax({
        type: "POST",
        url: "salesfeedback.asmx/GetlocationByEmp",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetLocationOfFLM,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function onSuccessGetLocationOfFLM(data, status) {
    if(data.d != '')
    {
        var msg = JSON.parse(data.d);
        $.each(msg, function (i, option) {
            initMap(option.latitude, option.longitude);
        });
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


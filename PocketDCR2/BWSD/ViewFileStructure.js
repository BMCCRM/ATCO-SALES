var num = 1;
var mode;
var DistId;
var len;



var regex = new RegExp("^[0-9a-zA-Z\.\,\'\-\+\=\*\:\_\/\?\b ]+$");

var validation;

$(document).ready(function () {

    $2('#divConfirmation').jqm({ modal: true });
    $2('#Divmessage').jqm({ modal: true });

    $('#btnOk').click(OKClick)


    $('#btn_custSave').click(Customer);
    $('#btn_invSave').click(Invoice);
    $('#btn_stkSave').click(Stock);


    if ($.cookie('DistId') != undefined ) {

        DistId = $.cookie('DistId');
        var Name = $.cookie('DistName');

        $.ajax({
            type: "POST",
            url: "FileStructureService.asmx/GetStructure",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"DistId":"' + DistId + '"}',
            success: onSuccessGetColumn,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            async: false,
            cache: false
        });



        function onSuccessGetColumn(data, status) {

            var custDiv = '', invDiv = '', stockDiv = '';
            var DistName = Name;
            
             custDiv += '<div class="col-md-12"><div class="form-group"><label class="col-md-2 control-label">File Name</label><label class="col-md-2 control-label">Column Name</label><label class="col-md-2 control-label">Start Index</label><label class="col-md-2 control-label">End Index</label><label class="col-md-2 control-label">Length</label></div></div>';
      
             invDiv += '<div class="col-md-12"><div class="form-group"><label class="col-md-2 control-label">File Name</label><label class="col-md-2 control-label">Column Name</label><label class="col-md-2 control-label">Start Index</label><label class="col-md-2 control-label">End Index</label><label class="col-md-2 control-label">Length</label></div></div>';
      
             stockDiv+= '<div class="col-md-12"><div class="form-group"><label class="col-md-2 control-label">File Name</label><label class="col-md-2 control-label">Column Name</label><label class="col-md-2 control-label">Start Index</label><label class="col-md-2 control-label">End Index</label><label class="col-md-2 control-label">Length</label></div></div>';
      

            if (data.d != "") {


                var jsonObj = jsonParse(data.d);
                debugger;

                if (jsonObj.length > 0) {

                    

                    for (var i = 0; i < jsonObj.length; i++) {
                     

                        if (jsonObj[i].FilesName=='CUST') {
                            custDiv += '<div class="col-md-12"><div class="form-group"><span id="custfname' + (i + 1) + '" class="col-md-2 control-label custfname">' + jsonObj[i].FilesName + '  </span>' +
                                                   '<span id="custcname' + (i + 1) + '" class="col-md-2">' + jsonObj[i].ColumnName + ' </span>' +
                                               '<div class="col-md-2"><input type="text" name="stindex' + (i + 1) +
                                                 '" class="form-control" id="custstindex_' + (i + 1) + '" value="' + jsonObj[i].StartIndex + '" required  placeholder="Start Index" ></div>' +
                                               '<div class="col-md-2"><input type="text" name="endindex' + (i + 1) +
                                              '" class="form-control" id="custendindex_' + (i + 1) + '" value="' + jsonObj[i].EndIndex + '" required  placeholder="End Index" ></div>' +
                                               '<div class="col-md-2"><input type="text" name="length' + (i + 1) +
                                                '" class="form-control" id="custlength_' + (i + 1) + '" value="' + jsonObj[i].Length + '" required  placeholder="Length" ></div>' +
                                               '</div></div></br>';

                           
                        }

                        else if (jsonObj[i].FilesName == 'INV') {
                            invDiv += '<div class="col-md-12"><div class="form-group"><span id="invfname' + (i + 1) + '" class="col-md-2  control-label invfname ">' + jsonObj[i].FilesName + '  </span>' +
                                                '<span id="invcname' + (i + 1) + '" class="col-md-2">' + jsonObj[i].ColumnName + ' </span>' +
                                            '<div class="col-md-2"><input type="text" name="invstindex' + (i + 1) +
                                              '" class="form-control" id="invstindex_' + (i + 1) + '" value="' + jsonObj[i].StartIndex + '" required placeholder="Start Index" ></div>' +
                                            '<div class="col-md-2"><input type="text" name="endindex' + (i + 1) +
                                           '" class="form-control" id="invendindex_' + (i + 1) + '" value="' + jsonObj[i].EndIndex + '" required  placeholder="End Index" ></div>' +
                                            '<div class="col-md-2"><input type="text" name="invlength' + (i + 1) +
                                             '" class="form-control" id="invlength_' + (i + 1) + '" value="' + jsonObj[i].Length + '"  required placeholder="Length" ></div>' +
                                            '</div></div></br>';
                                
                        }
                        else if (jsonObj[i].FilesName == 'STOCK') {
                            stockDiv += '<div class="col-md-12"><div class="form-group"><span id="stkfname' + (i + 1) + '" class="col-md-2 control-label stkfname">' + jsonObj[i].FilesName + '  </span>' +
                                                                        '<span id="stkcname' + (i + 1) + '" class="col-md-2">' + jsonObj[i].ColumnName + ' </span>' +
                                                                    '<div class="col-md-2"><input type="text" name="stkstindex' + (i + 1) +
                                                                      '" class="form-control" id="stkstindex_' + (i + 1) + '" value="' + jsonObj[i].StartIndex + '" required  placeholder="Start Index" ></div>' +
                                                                    '<div class="col-md-2"><input type="text" name="endindex' + (i + 1) +
                                                                   '" class="form-control" id="stkendindex_' + (i + 1) + '" value="' + jsonObj[i].EndIndex + '" required  placeholder="End Index" ></div>' +
                                                                    '<div class="col-md-2"><input type="text" name="length' + (i + 1) +
                                                                     '" class="form-control" id="stklength_' + (i + 1) + '" value="' + jsonObj[i].Length + '" required  placeholder="Length" ></div>' +
                                                                    '</div></div></br>';
                         }
                   

                     
                    }


                    if (jsonObj[0].Flag == '1') {
                        mode = "Update";

                    } 
                     else {
                        mode = "Add";
                    }

                    custDiv += '<input  type="submit" class="btn btnPrimary" id="btn_custSave" onclick="Customer()" value="Save" />';
                    invDiv += '<input type="submit" class="btn btnPrimary" id="btn_invSave" onclick="Invoice()" value="Save"   />';
                    stockDiv += '<input type="submit" class="btn btnPrimary" id="btn_stockSave" onclick="Stock()" value="Save" />';

                    $('#divcust').append(custDiv);
                    $('#divinv').append(invDiv)
                    $('#divstock').append(stockDiv);
                    $('#dname').append(DistName);
                    
                }

            }
            else {
                $('#Divmessage').find('#hlabmsg').text('No Structure Defined');
                $2('#Divmessage').jqmShow();

            }
        }

    }
    else {
        window.open('./DistFileStructure.aspx', '_self');
    }



});



function Customer() {
    debugger;

    //if ((strt == null || strt == '') || (end == null || end == '') || (len == null || len == '')) {
    //    alert('Please Fill All Fields');
    //    return;
    //}
    
        var flag =true;
        var JsonArrayOfRows = [];
        $('.custfname').each(function () {


            var i = this.id.replace("custfname", "");

            var fname = $('#custfname' + i).text().trim();
            var cname = $('#custcname' + i).text().trim();
            var strt = $('#custstindex_' + i).val();
            var end = $('#custendindex_' + i).val();
            var len = $('#custlength_' + i).val();

            if ((strt == null || strt == '') || (end == null || end == '') || (len == null || len == '')) {
             
                JsonArrayOfRows = [];
                flag = false;
                return false;
            }



            var JsonObjectOfRow = {
                FileName: fname,
                Column: cname,
                StartIndex: strt,
                EndIndex: end,
                Length: len,
            };

            JsonArrayOfRows.push(JsonObjectOfRow);
        });

        var mydata = JSON.stringify({
            DistributorId: DistId,
            Mode: mode,
            FileDataJson: JsonArrayOfRows
        });


        if (flag == true) {

            $.ajax({
                type: "POST",
                url: "DistributorFile.svc/SaveDistributorFile",
                contentType: "application/json; charset=utf-8",
                data: mydata,
                success: function () {
                    alert("Data has been saved Successfully");

                },
                error: onError,
                cache: false,
                async: false,
                beforeSend: startingAjax,
                complete: ajaxCompleted
            });
        }
}

function Invoice() {
    debugger;

    var MainJsonArray = [];

    var flag = true;
    var JsonArrayOfRows = [];
    $('.invfname').each(function () {

        var i = this.id.replace("invfname", "");

        var fname = $('#invfname' + i).text().trim();
        var cname = $('#invcname' + i).text().trim();
        var strt = $('#invstindex_' + i).val();
        var end = $('#invendindex_' + i).val();
        var len = $('#invlength_' + i).val();


        if ((strt == null || strt == '') || (end == null || end == '') || (len == null || len == '')) {

            JsonArrayOfRows = [];
            flag = false;
            return false;
        }


        var JsonObjectOfRow = {
            FileName: fname,
            Column: cname,
            StartIndex: strt,
            EndIndex: end,
            Length: len,
        };

        JsonArrayOfRows.push(JsonObjectOfRow);


    });

    var mydata = JSON.stringify({
        DistributorId: DistId,
        Mode: mode,
        FileDataJson: JsonArrayOfRows
    });

    if (flag == true) {

        $.ajax({
            type: "POST",
            url: "DistributorFile.svc/SaveDistributorFile",
            contentType: "application/json; charset=utf-8",
            data: mydata,
            success: function () {
                alert("Data has been saved Successfully");

            },
            error: onError,
            cache: false,
            async: false,
            beforeSend: startingAjax,
            complete: ajaxCompleted
        });
    }
  
}

function Stock() {
    debugger;

    var MainJsonArray = [];

    var flag = true;
    var JsonArrayOfRows = [];
    $('.stkfname').each(function () {

        var i = this.id.replace("stkfname", "");

        var fname = $('#stkfname' + i).text().trim();
        var cname = $('#stkcname' + i).text().trim();
        var strt = $('#stkstindex_' + i).val();
        var end = $('#stkendindex_' + i).val();
        var len = $('#stklength_' + i).val();


        if ((strt == null || strt == '') || (end == null || end == '') || (len == null || len == '')) {

            JsonArrayOfRows = [];
            flag = false;
            return false;
        }

        var JsonObjectOfRow = {
            FileName: fname,
            Column: cname,
            StartIndex: strt,
            EndIndex: end,
            Length: len,
        };

        JsonArrayOfRows.push(JsonObjectOfRow);


    });

    var mydata = JSON.stringify({
        DistributorId: DistId,
        Mode: mode,
        FileDataJson: JsonArrayOfRows
    });

    if (flag==true) {


        $.ajax({
            type: "POST",
            url: "DistributorFile.svc/SaveDistributorFile",
            contentType: "application/json; charset=utf-8",
            data: mydata,
            success: function () {
                alert("Data has been saved Successfully");

            },
            error: onError,
            cache: false,
            async: false,
            beforeSend: startingAjax,
            complete: ajaxCompleted
        });
    }
}


function OKClick() {
    $2('#Divmessage').jqmHide();
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


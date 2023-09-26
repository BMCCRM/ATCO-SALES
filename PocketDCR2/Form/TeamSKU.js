// Global Variables
var ProductSkuId = 0, PackSize = 0, Strength = 0, Form = 0, TypeID = 0;
var myData = "", mode = "", msg = "", jsonObj = "";

// Page Load Event
function pageLoad() {

    ClearFields();

    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#btnOk').click(btnOkClicked);

    $('#divConfirmation').jqm({ modal: true });
    $('#Divmessage').jqm({ modal: true });


    

    FillTeam();
    FillType();

    $('.incentive').hide();

 //   $('#chkDate').on('change', showhideincentivedate);
}



function showhideincentivedate()
{
    
    if ($('#chkDate').attr("checked")) {
        // If checked, show all incentive rows, named all tr with class name incentive to achieve this
        $('.incentive').show();
    } else {
        // If unchecked, hide all incentive rows, named all tr with class name incentive to achieve this
        $('.incentive').hide();
    }


}

//   Button Click Events 
function btnSaveClicked() {
    debugger;
    var isValidated = $('#form1').validate({
        rules: {
            txtCode: {
                required: true,
                digits: true
            },
            txtName: {
                required: true
            },
            txtDistributorPrice: {
                required: true,
                number: true
            },
            txtTradePrice: {
                required: true,
                number: true
            },
            txtRetailPrice: {
                required: true,
                number: true
            },
            ddlTeam: {
                required: true
            },
            dd_producttype: {
                required: true
            },
            txtInstPrice: {
                required: true,
                number: true
            },
            ddltype: {
                required: true
               
           
            },
            txtIncentive: {
                required: true,
                number: true
            },
          

    

        }
    });

    if (!$('#form1').valid()) {
        return false;
    }

    mode = $('#hdnMode').val();
    DefaultData();

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

    myData = "{'skuId':'" + ProductSkuId + "'}";

    $.ajax({
        type: "POST",
        url: "ProductSkuService.asmx/DeleteProductSku",
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
function OnChangedGetProductwithTeam() {

    $('#cboProduct').val("-1");
    TeamID = $('#cboTeam').val();
    myData = "{'TeamID':'" + TeamID + "'}";
    $.ajax({
        type: "POST",
        url: "ProductSkuService.asmx/GetProductSku",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: onSuccessGetProductwithTeam,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false

    });


    $('#dialog').jqmHide();
}

function onSuccessGetProductwithTeam(data, status) {
    document.getElementById('cboProduct').innerHTML = "";
    if (data.d != "") {


        $("#cboProduct").append("<option value='-1'>Select Brand</option>");
        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, tweet) {
            $("#cboProduct").append("<option value='" + jsonObj[i].ProductId + "'>" + jsonObj[i].ProductName + "</option>");
        });
    }
    else {
        $("#cboProduct").append("<option value='-1'>Select Brand</option>");
    }
}
// Functions

function SaveData() {

    var teamIDs = $('#ddlTeam').val() == "" || $('#ddlTeam').val() == null ? "0" : $('#ddlTeam').val().join();
    if (teamIDs == "0") {
        return false;
    }
    myData = "{'productId':'" + $('#cboProduct').val() + "','packsizeId':'" + PackSize + "','strengthId':'" + Strength
        + "','formId':'" + Form + "','skuCode':'" + $('#txtCode').val() + "','skuName':'" + $('#txtName').val()
        + "','isActive':'" + $('#chkActive').attr("checked") + "','distributorPrice':'" + $('#txtDistributorPrice').val()
        + "','tradePrice':'" + $('#txtTradePrice').val() + "','retailPrice':'" + $('#txtRetailPrice').val() + "','teamIDs':'" + teamIDs + "','TypeId':'" + TypeID + "','InstitutionPrice':'" + $('#txtInstPrice').val() + "','IncentiveAmount':'" + $('#txtIncentive').val()
        + "','IncentiveFrom':'" + $('#IncentiveFrom').val() + "','IncentiveTo':'" + $('#IncentiveTo').val() + "'}";

    $.ajax({
        type: "POST",
        url: "ProductSkuService.asmx/InsertProductSkuwithTeamRelation",
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


function btnInsert_Click(sender) {

   
    $('#hdnMode').val("EditMode");


    var dd = sender.parentElement.parentElement.parentElement.parentElement.children[0].innerHTML;
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = dd;
    var extractedText = tempDiv.querySelector('.ob_gCc2').textContent;


   
     
    myData = "{'skuId':'" + extractedText + "'}";

    $.ajax({
        type: "POST",
        url: "ProductSkuService.asmx/GetProductSkuwithTeam",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetProductNew,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}

function oGrid_Edit(sender) {

    $('#hdnMode').val("EditMode");
    ProductSkuId = sender.SkuId;
    myData = "{'skuId':'" + ProductSkuId + "'}";

    $.ajax({
        type: "POST",
        url: "ProductSkuService.asmx/GetProductSkuwithTeam",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetProduct,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    ProductSkuId = sender.SkuId;
    $('#divConfirmation').jqmShow();
}
function UpdateData() {

    

    var isChecked = $('#chkActive').attr("checked");
    var datecheck = $('#chkDate').attr("checked");

    //var intdatecheck = datecheck == "true" ? 1 : 0;

   
    var teamIDs = $('#ddlTeam').val() == "" || $('#ddlTeam').val() == null ? "0" : $('#ddlTeam').val().join();
    if (teamIDs == "0") {
        return false;
    }
    myData = "{'skuId':'" + ProductSkuId + "','productId':'" + $('#cboProduct').val() + "','packsizeId':'" + PackSize
        + "','strengthId':'" + Strength + "','formId':'" + Form + "','skuCode':'" + $('#txtCode').val()
        + "','skuName':'" + $('#txtName').val() + "','isActive':'" + $('#chkActive').attr("checked") + "','distributorPrice':'" + $('#txtDistributorPrice').val()
        + "','tradePrice':'" + $('#txtTradePrice').val() + "','retailPrice':'" + $('#txtRetailPrice').val() + "','teamIDs':'" + teamIDs + "','TypeId':'" + TypeID + "','InstitutionPrice':'" + $('#txtInstPrice').val() + "','IncentiveAmount':'" + $('#txtIncentive').val()
        + "','IncentiveFrom':'" + $('#IncentiveFrom').val() + "','IncentiveTo':'" + $('#IncentiveTo').val() + "','checkk':'" + datecheck + "'}";
    debugger;

    $.ajax({
        type: "POST",
        url: "ProductSkuService.asmx/UpdateProductSkuwithTeamRelation",
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
function ajaxCompleted() {

    $('#imgLoading').hide();
}

function onSuccessGetProductNew(data, status) {
    
    if (data.d != "") {

        ClearFields();
        $('#btnSave').show();
        jsonObj = jsonParse(data.d);


        if (jsonObj[0].PackSizeid == null) {

            $('#cboPacketSize').val("-1");
        }
        else {
            $('#cboPacketSize').val(jsonObj[0].PackSizeid);
        }

        if (jsonObj[0].StrengthId == null) {

            $('#cboStrength').val("-1");
        }
        else {
            $('#cboStrength').val(jsonObj[0].StrengthId);
        }

        if (jsonObj[0].FormId == null) {

            $('#cboForm').val("-1");
        }
        else {
            $('#cboForm').val(jsonObj[0].FormId);
        }

        if (jsonObj[0].Sku_TypeId == null) {

            $('#ddltype').val("-1");
        }
        else {
            $('#ddltype').val(jsonObj[0].Sku_TypeId);

        }


        //$('#cboTeam').val(jsonObj[0].TeamID);
        $("#ddlTeam").val("");
        $(jsonObj).each(function (i, key) {
            $("#ddlTeam option[value=" + key.TeamID + "]").attr('selected', true);
        });
        //FillProductOnTeamChange(jsonObj[0].TeamID);
        $('#cboProduct').val(jsonObj[0].ProductId);
        $('#txtCode').val(jsonObj[0].SkuCode);
        $('#txtName').val(jsonObj[0].SkuName);
        $('#chkActive').attr("checked", jsonObj[0].IsActive == "True" ? true : 0);
        $('#txtDistributorPrice').val(jsonObj[0].DistributorPrice);
        $('#txtTradePrice').val(jsonObj[0].TradePrice);
        $('#txtRetailPrice').val(jsonObj[0].RetailPrice);
        $('#cboForm').val(jsonObj[0].FormId);
        $('#cboStrength').val(jsonObj[0].StrengthId);
        $('#cboPacketSize').val(jsonObj[0].PackSizeid);
        $('#ddltype').val(jsonObj[0].Sku_TypeId);
        $('#txtInstPrice').val(jsonObj[0].InstitutionPrice);
        $('#txtIncentive').val(jsonObj[0].IncentiveAmount);
      //  $('#IncentiveFrom').val(jsonObj[0].IncentiveFromDate);
        //$('#IncentiveTo').val(jsonObj[0].IncentiveToDate);



        //if (new Date() > new Date($('#IncentiveFrom').val()) || new Date() > new Date($('#IncentiveTo').val()))
        //{
        //    $('#btnSave').hide();
        //}  



        

    }
    else {
        msg = 'Due to team relation disable product sku cannot be edited';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
    }
}



function onSuccessGetProduct(data, status) {

    if (data.d != "") {

        ClearFields();
        $('#btnSave').show();
        jsonObj = jsonParse(data.d);


        if (jsonObj[0].PackSizeid == null) {

            $('#cboPacketSize').val("-1");
        }
        else {
            $('#cboPacketSize').val(jsonObj[0].PackSizeid);
        }

        if (jsonObj[0].StrengthId == null) {

            $('#cboStrength').val("-1");
        }
        else {
            $('#cboStrength').val(jsonObj[0].StrengthId);
        }

        if (jsonObj[0].FormId == null) {

            $('#cboForm').val("-1");
        }
        else {
            $('#cboForm').val(jsonObj[0].FormId);
        }

        if (jsonObj[0].Sku_TypeId == null) {

            $('#ddltype').val("-1");
        }
        else {
            $('#ddltype').val(jsonObj[0].Sku_TypeId);

        }


        //$('#cboTeam').val(jsonObj[0].TeamID);
        $("#ddlTeam").val("");
        $(jsonObj).each(function (i, key) {
            $("#ddlTeam option[value=" + key.TeamID + "]").attr('selected', true);
        });
        //FillProductOnTeamChange(jsonObj[0].TeamID);
        $('#cboProduct').val(jsonObj[0].ProductId);
        $('#txtCode').val(jsonObj[0].SkuCode);
        $('#txtName').val(jsonObj[0].SkuName);
        $('#chkActive').attr("checked", jsonObj[0].IsActive == "True" ? true : 0);
        $('#txtDistributorPrice').val(jsonObj[0].DistributorPrice);
        $('#txtTradePrice').val(jsonObj[0].TradePrice);
        $('#txtRetailPrice').val(jsonObj[0].RetailPrice);
        $('#cboForm').val(jsonObj[0].FormId);
        $('#cboStrength').val(jsonObj[0].StrengthId);
        $('#cboPacketSize').val(jsonObj[0].PackSizeid);
        $('#ddltype').val(jsonObj[0].Sku_TypeId);
        $('#txtInstPrice').val(jsonObj[0].InstitutionPrice);
        $('#txtIncentive').val(jsonObj[0].IncentiveAmount);
        $('#IncentiveFrom').val(jsonObj[0].IncentiveFromDate);
        $('#IncentiveTo').val(jsonObj[0].IncentiveToDate);



        //if (new Date() > new Date($('#IncentiveFrom').val()) || new Date() > new Date($('#IncentiveTo').val()))
        //{
        //    $('#btnSave').hide();
        //}  
    

       


    }
    else {
        msg = 'Due to team relation disable product sku cannot be edited';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
    }
}
function onSuccess(data, status) {

    if (data.d == "OK") {

        var mode = $('#hdnMode').val();
        var msg = '';

        if (mode === "AddMode") {
            msg = 'Data inserted succesfully!';
        }
        else if (mode === "EditMode") {
            msg = 'Data updated succesfully!';
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
    else if (data.d == "Duplicate Code!") {
        msg = 'Code already exist! Try different';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
        return false;
    }
    else if (data.d == "Duplicate Name!") {
        msg = 'SKU Name already exist! Try different';
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
    else if (data.d == "LessDate") {



        $('#divConfirmation').jqmHide();
        msg = 'Incentive To date should be greater than Incentive From date!';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

    }
    else if (data.d == "NotAllowed") {



        $('#divConfirmation').jqmHide();
        msg = 'Not Allowed due to policy already exists in the selected range,kindly create new policy';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();

    }
    else if (data.d == "Month Passed") {

        $('#divConfirmation').jqmHide();
        msg = 'Your current month is past IncentiveFrom month,kindly create new policy';
        $('#hlabmsg').append(msg);
        $('#Divmessage').jqmShow();
    }

}
function onError(request, status, error) {
    $('#divConfirmation').jqmHide();
    msg = 'Error occoured';
    $('#hlabmsg').append(msg);
    $('#Divmessage').jqmShow();

}
function startingAjax() {
    $('#imgLoading').show();
}
function DefaultData() {

    PackSize = $('#cboPacketSize').val();
    Strength = $('#cboStrength').val();
    Form = $('#cboForm').val();
    TypeID = $('#ddltype').val();



    if (PackSize == -1) {

        PackSize = 0;
    }



    if (Strength == -1) {

        Strength = 0;
    }

    if (Form == -1) {

        Form = 0;
    }

    if (TypeID == -1) {

        TypeID = 0;
    }


}
function ClearFields() {

    $('#cboProduct').val("-1");
    $('#cboPacketSize').val("-1");
    $('#cboStrength').val("-1");
    $('#cboForm').val("-1");
    $('#txtCode').val("");
    $('#txtName').val("");
    $('#chkActive').attr("checked", true);
    $('#txtDistributorPrice').val("");
    $('#txtTradePrice').val("");
    $('#txtRetailPrice').val("");
    $('#ddlTeam').val("");
    $('#txtInstPrice').val();
}
//function FillProductOnTeamChange(TeamID) {
//    myData = "{'TeamID':'" + TeamID + "'}";

//    $.ajax({
//        type: "POST",
//        url: "ProductSkuService.asmx/GetProductByTeam",
//        data: myData,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            if (data.d != "") {
//                $("#cboProduct").empty();
//                $("#cboProduct").append("<option value='-1'>Select Brand...</option>");

//                var jsonObj = JSON.parse(data.d);
//                $.each(jsonObj, function (i, tweet) {
//                    $("#cboProduct").append("<option value='" + jsonObj[i].ProductId + "'>" + jsonObj[i].ProductName + "</option>");
//                });
//            }
//            else {
//                $("#cboProduct").empty();
//                $("#cboProduct").append("<option value='-1'>Select Brand...</option>");
//            }
//        },
//        error: onError,
//        beforeSend: startingAjax,
//        complete: ajaxCompleted,
//        cache: false,
//        async: false
//    });

//}
function FillTeam() {
    $.ajax({
        type: "POST",
        url: "ProductSkuService.asmx/GetTeam",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != "") {
                $("#ddlTeam").empty();

                var jsonObj = JSON.parse(data.d);
                $.each(jsonObj, function (i, tweet) {
                    $("#ddlTeam").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].TeamName + "</option>");
                });
            }
            else {
                $("#ddlTeam").empty();
                $("#ddlTeam").append("<option value='-1'>No Team Found!</option>");
            }
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        async: false
    });


}




function FillType() {
    $.ajax({
        type: "POST",
        url: "ProductSkuService.asmx/GetProdutcType",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != "") {
                $("#ddltype").empty();

                $("#ddltype").append("<option value='-1'>Select Type</option>");
                // jsonObj = jsonParse(data.d);

                var jsonObj = JSON.parse(data.d);
                $.each(jsonObj, function (i, tweet) {
                    $("#ddltype").append("<option value='" + jsonObj[i].Type_Id + "'>" + jsonObj[i].Type_Name + "</option>");
                });
            }
            else {
                $("#ddltype").empty();
                $("#ddltype").append("<option value='-1'>No Type Found!</option>");
            }
        },
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        async: false
    });


}




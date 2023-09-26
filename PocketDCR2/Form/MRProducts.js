function pageLoad() {

    GetMedReps();
    GetProductSkus();
    $('select#ddlMedReps').listbox({ 'searchbar': true });
    $('select#products').listbox({ 'searchbar': true });
    $('.lbjs-item').removeAttr('selected');

}

function GetMedReps() {

    $.ajax({
        type: 'POST',
        url: 'MRProducts.asmx/ListofMedRepsType6S',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        async: false,
        success: function (data) {
            var response = data.d;
            $.each(response, function (i, tweet) {
                $("select#ddlMedReps").append("<option value='" + tweet.EmployeeId + "'>" + tweet.EmployeeName + "</option>");
            });
            
        },
        error: function (request, status, error) {
            console.log("error: " + error + " status: " + status + " request : " + request);
        }

    });


}

function GetProductSkus() {
    $.ajax({
        type: 'POST',
        url: 'MRProducts.asmx/ListofProductSkus',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        async: false,
        success: function (data) {
            var response = jsonParse(data.d);
            $.each(response, function (i, tweet) {
                $("select#products").append("<option value='" + tweet.SkuId + "'>" + tweet.SkuName + "</option>");
            });
        },
        error: function (request, status, error) {
            console.log("error: " + error + " status: " + status + " request : " + request);
        }
    });
}

function saveorupdate() {

    var selecteddivsofMedreps = $("#lstddlMedReps div[selected='']");
    var selecteddivsofProducts = $("#lstproducts div[selected='']");

    $.each(selecteddivsofMedreps, function (i, tweet) {

        $.ajax({
            type: 'POST',
            url: 'MRProducts.asmx/DeleteAllProductsofMedRep',
            contentType: 'application/json; charset=utf-8',
            data: "{'medRepId':'" + tweet.id + "'}",
            dataType: "json",
            async: false,
            success: function (data) {
                var response = data.d;
                if (response == "Success") {
                    var products = "";
                    $.each(selecteddivsofProducts, function (ji, product) {
                        products += product.id + ";";
                    });
                    products = products.slice(0, -1);


                    $.ajax({
                        type: 'POST',
                        url: 'MRProducts.asmx/InsertAllProductsofMedRep',
                        contentType: 'application/json; charset=utf-8',
                        data: "{'medRepId':'" + tweet.id + "','productId':'" + products + "'}",
                        dataType: "json",
                        async: false,
                        success: function (dataa) {
                            var responce = dataa.d;
                            if (responce == "Success") {
                                alert("Record Save Successfully");
                            }
                        }
                    });
                }
            }
        });
    });

}



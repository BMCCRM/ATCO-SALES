var locationHierarchyLevel = "", ddlHierarchyLevelSelectedIndex = "", ddlHierarchyLevelSelectedValue = "", ddlHierarchyLeve = "";
var myData = null, jsonObj = null;

$('document').ready(function () {


    //add hierarchyLevel while page load
    addLocationHierarchyLevel();
    hideDropDownList();
    emptyLables();
    $('#ddlLocationHierarchyLevel').change(onLocationHierarchyLevelChange);
    $('#ddl1').change(onddl1Change);
    $('#ddl2').change(onddl2Change);
    $('#ddl3').change(onddl3Change);


    //events on btn click
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);
    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);

    function btnYesClicked() {
        DeleteValue = $('#hdnIdForEditDelete').val()
        $('#hdnIdForEditDelete').val(0);

        myData = "{'parentLevelId':'" + DeleteValue + "','levelName':'" + locationHierarchyLevel + "'}";

        $.ajax({
            type: "POST",
            url: "../BWSD/LocationSetup.asmx/DeleteHierarchyLevel",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccess,
            error: onError,
            complete: ajaxCompleted,
            beforeSend: startingAjax,
            cache: false
        });
        return false;
    }
    function btnNoClicked() {

        $('#divConfirmation').jqmHide();
        $('#hdnMode').val("dataAddMode");
        $('#hdnIdForEditDelete').val(0);
        clearFields();
        ajaxCompleted();
        return false;
    }
    function onSuccess(data, status) {


        if (locationHierarchyLevel != -1) {
            if (locationHierarchyLevel == "level1") {
                showRegionTable();
            } else if (locationHierarchyLevel == "level2") {
                showSubRegionTable();
            } else if (locationHierarchyLevel == "level3") {
                showDistrict();
            } else if (locationHierarchyLevel == "level4") {
                showCities();
            }
        }

        if (data.d == "OK") {

            modeValue = $('#hdnMode').val();
            msg = '';

            if (modeValue === "DeleteMode") {

                msg = 'Data deleted succesfully!';
                $('#divConfirmation').jqmHide();
                //  RefreshExistingTable();
            }

            clearFields();
            $('#hdnMode').val("dataAddMode");

            $.fn.jQueryMsg({
                msg: msg,
                msgClass: 'alert',
                fx: 'slide',
                speed: 500
            });
        }

        $('#divConfirmation').jqmHide();
    }





    // Modal Popup Window
    $('#divGrid').jqm({ modal: true });
    $('#divConfirmation').jqm({ modal: true });

    emptyLables();
    $('#divGrid').show();
    $('#lblLevelName').text("Region Name");
    $('#lblLevelDescription').text("Region Description");


    //clear all fields
    function clearFields() {
        $('#txtLevelName').val("");
        $('#txtLevelDescription').val("");
        $('#txtMso').val("");
        $('#txAreaManager').val("");
        $('#txtSalesManager').val("");
        $('#txtRTL').val("");
        $('#txtRTL').val("");
        $('#txtCityNDDCODE').val("");
        $('#txtIsBigCityAllow').attr('checked', false);

        if (locationHierarchyLevel != 'level4') {
            $('#txtLevelDescription').parent().closest('tr').show();
        }

    }

    //add hierarchyLevel
    function addLocationHierarchyLevel() {
        $('#ddlLocationHierarchyLevel').empty();
        $('#ddlLocationHierarchyLevel').append("<option value='-1'>Select Level</option>");
        $('#ddlLocationHierarchyLevel').append("<option value='level1'>Region</option>");
        $('#ddlLocationHierarchyLevel').append("<option value='level2'>Sub Region</option>");
        $('#ddlLocationHierarchyLevel').append("<option value='level3'>District</option>");
        $('#ddlLocationHierarchyLevel').append("<option value='level4'>Cities</option>");
    }

    //hide alldropdownlist
    function hideDropDownList() {
        $('#lbl1').hide();
        $('#lbl2').hide();
        $('#lbl3').hide();
        $('#lbl4').hide();
        $('#ddl1').hide();
        $('#ddl2').hide();
        $('#ddl3').hide();
        $('#ddl4').hide();

        $('#trMso').hide();
        $('#trAreaManager').hide();
        $('#trSalesManager').hide();
        $('#trRTL').hide();
        $('#trCityNDDCODE').hide();
        $('#trIsBigCityAllow').hide();
    }

    function emptyLables() {
        $('#lblLevelName').empty();
        $('#lblLevelDescription').empty();
    }

    function ddlValueReset() {


        $('#ddl2').empty();
        $('#ddl2').append("<option value='-1'> Select...</option>");



        $('#ddl3').empty();
        $('#ddl3').append("<option value='-1'> Select...</option>");

    }

    //table reload
    function showRegionTable() {
        document.getElementById('divTable').innerHTML = "";
        emptyLables();
        $('#lblLevelName').text("Region Name");
        $('#lblLevelDescription').text("Region Description");
        clearFields();

        myData = "{'parentLevelId':'0','levelName':'" + locationHierarchyLevel + "'}";

        $.ajax({
            type: "POST",
            url: "../BWSD/LocationSetup.asmx/ShowCurrentLevel",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillGridViewRegion,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }

    function showSubRegionTable() {
        myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + locationHierarchyLevel + "'}";

        $.ajax({
            type: "POST",
            url: "../BWSD/LocationSetup.asmx/ShowCurrentLevel",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillGridViewSubRegion,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }

    function showDistrict() {
        myData = "{'parentLevelId':'" + $('#ddl2').val() + "','levelName':'level6'}";

        $.ajax({
            type: "POST",
            url: "../BWSD/LocationSetup.asmx/ShowCurrentLevel",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillGridViewDistrict,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }

    function showCities() {
        $('#txtLevelDescription').parent().closest('tr').hide();
        $('#txtLevelDescription').val('hello');
        myData = "{'parentLevelId':'" + $('#ddl3').val() + "','levelName':'level7'}";

        $.ajax({
            type: "POST",
            url: "../BWSD/LocationSetup.asmx/ShowCurrentLevel",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillGridViewCities,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }


    //HierarchyLevel Change
    function onLocationHierarchyLevelChange() {
        locationHierarchyLevel = $('#ddlLocationHierarchyLevel option:selected').val();
        hideDropDownList();
        $('#hdnMode').val('dataAddMode');
        $('#hdnIdForEditDelete').val(0);
        //alert(locationHierarchyLevel);

        if (locationHierarchyLevel == -1) {
            clearFields();
            document.getElementById('divTable').innerHTML = "";
            $('#txtLevelDescription').parent().closest('tr').show();
                        $('#lblLevelName').text("Sub Region Name");
            $('#lblLevelDescription').text("Sub Region Description");
        }
        else if (locationHierarchyLevel == "level1") {

            showRegionTable();

        }
        else if (locationHierarchyLevel == "level2") {
            document.getElementById('divTable').innerHTML = "";
            emptyLables();
            $('#lbl1').show();
            $('#ddl1').show();
            $('#lblLevelName').text("Sub Region Name");
            $('#lblLevelDescription').text("Sub Region Description");
            ddlHierarchyLevelSelectedIndex = $('#ddlLocationHierarchyLevel').get(0).selectedIndex - 1;
            ddlHierarchyLevelSelectedValue = $("#ddlLocationHierarchyLevel option:eq(" + ddlHierarchyLevelSelectedIndex + ")").val();
            ddlHierarchyLevelSelectedText = $("#ddlLocationHierarchyLevel option:eq(" + ddlHierarchyLevelSelectedIndex + ")").text();
            clearFields();
            Fillddl1(ddlHierarchyLevelSelectedValue);
        }
        else if (locationHierarchyLevel == "level3") {
            document.getElementById('divTable').innerHTML = "";
            ddlValueReset();
            emptyLables();
            $('#lbl1').show();
            $('#lbl2').show();
            $('#ddl1').show();
            $('#ddl2').show();


            $('#lblLevelName').text("District Name");
            $('#lblLevelDescription').text("District Description");
            $('#trMso').show();
            $('#trAreaManager').show();
            $('#trSalesManager').show();
            $('#trRTL').show();
            ddlHierarchyLevelSelectedIndex = $('#ddlLocationHierarchyLevel').get(0).selectedIndex - 2;
            ddlHierarchyLevelSelectedValue = $("#ddlLocationHierarchyLevel option:eq(" + ddlHierarchyLevelSelectedIndex + ")").val();
            ddlHierarchyLevelSelectedText = $("#ddlLocationHierarchyLevel option:eq(" + ddlHierarchyLevelSelectedIndex + ")").text();
            clearFields();
            Fillddl1(ddlHierarchyLevelSelectedValue);


        }
        else if (locationHierarchyLevel == "level4") {
            document.getElementById('divTable').innerHTML = "";
            ddlValueReset();
            $('#lbl1').show();
            $('#lbl2').show();
            $('#lbl3').show();
            $('#ddl1').show();
            $('#ddl2').show();
            $('#ddl3').show();

            $('#lblLevelName').text("City Name");
            $('#lblLevelDescription').text("City Description");
            $('#trCityNDDCODE').show();
            $('#trIsBigCityAllow').show();
            ddlHierarchyLevelSelectedIndex = $('#ddlLocationHierarchyLevel').get(0).selectedIndex - 3;
            ddlHierarchyLevelSelectedValue = $("#ddlLocationHierarchyLevel option:eq(" + ddlHierarchyLevelSelectedIndex + ")").val();
            ddlHierarchyLevelSelectedText = $("#ddlLocationHierarchyLevel option:eq(" + ddlHierarchyLevelSelectedIndex + ")").text();
            clearFields();
            Fillddl1(ddlHierarchyLevelSelectedValue);
            $('#txtLevelDescription').parent().closest('tr').hide();
            $('#txtLevelDescription').val('Null');
        }



    }

    //region hierarchy full fill
    function Fillddl1(ddlHierarchyLevelSelectedValue) {
        myData = "{'levelName':'" + ddlHierarchyLevelSelectedValue + "'}";
        $.ajax({
            type: "POST",
            url: "../BWSD/LocationSetup.asmx/FillDropDownList",
            contentType: "application/json; charset=utf-8",
            data: myData,
            dataType: "json",
            success: onSuccessFillddl1,
            error: onError,
            cache: false
        });
    }

    function onSuccessFillddl1(data, status) {
        if (data.d != "") {
            jsonObj = jsonParse(data.d);
            $("#ddl1").empty();
            value = '-1';
            name = 'Select ' + ddlHierarchyLevelSelectedValue + '...';
            $("#ddl1").append("<option value='" + value + "'> Select Region</option>");
            $.each(jsonObj, function (i, tweet) {
                $("#ddl1").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].RegionName + "</option>");
            });
        }
    }

    function onddl1Change() {
        clearFields();
        var ddl1Value = $('#ddl1').val();
        $('#hdnMode').val('dataAddMode');
        $('#hdnIdForEditDelete').val(0);
        if (locationHierarchyLevel == "level2") {
            showSubRegionTable();
        }

        else if (locationHierarchyLevel == "level3") {

            myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + locationHierarchyLevel + "'}";
            $.ajax({
                type: "POST",
                url: "../BWSD/LocationSetup.asmx/ShowCurrentLevel",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessFillddl1Change,
                error: onError,
                cache: false
            });
        }

        else if (locationHierarchyLevel == "level4") {
            $('#txtLevelDescription').parent().closest('tr').hide();
            $('#txtLevelDescription').val('Null');
            myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + locationHierarchyLevel + "'}";
            $.ajax({
                type: "POST",
                url: "../BWSD/LocationSetup.asmx/ShowCurrentLevel",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessFillddl1Change,
                error: onError,
                cache: false
            });
        }
    }

    function onSuccessFillddl1Change(data) {

        if (data.d != "") {

            jsonObj = jsonParse(data.d);
            $("#ddl2").empty();
            value = '-1';
            name = 'Select ' + ddlHierarchyLevelSelectedValue + '...';
            $("#ddl2").append("<option value='" + value + "'> Select Sub Region</option>");
            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].SubRegionName + "</option>");
            });

        }


    }

    function onddl2Change() {
        clearFields();
        if (locationHierarchyLevel == "level3") {

            showDistrict();
        }

        else if (locationHierarchyLevel == "level4") {
            $('#txtLevelDescription').parent().closest('tr').hide();
            $('#txtLevelDescription').val('Null');
            myData = "{'parentLevelId':'" + $('#ddl2').val() + "','levelName':'level5'}";
            $.ajax({
                type: "POST",
                url: "../BWSD/LocationSetup.asmx/ShowCurrentLevel",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessFillddl2Change,
                error: onError,
                cache: false
            });
        }
    }

    function onSuccessFillddl2Change(data) {
        if (data.d != "") {

            jsonObj = jsonParse(data.d);
            $("#ddl3").empty();
            value = '-1';
            name = 'Select ' + ddlHierarchyLevelSelectedValue + '...';
            $("#ddl3").append("<option value='" + value + "'> Select District</option>");
            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].ID + "'>" + jsonObj[i].DistrictName + "</option>");
            });

        }
    }

    function onddl3Change() {
        clearFields();
        $('#hdnMode').val('dataAddMode');
        $('#hdnIdForEditDelete').val(0);
        if (locationHierarchyLevel == "level4") {
            showCities();

        }
    }







    //showCurrentLevel 
    //function ShowCurrentLevel() {
    //    if (locationHierarchyLevel == "level3") {           
    //        var ddl1SelectedValue = $('#ddl1').val();
    //        myData = "{'parentLevelId':'" + $('#ddl2').val() + "','levelName':'" + locationHierarchyLevel + "'}";
    //        $.ajax({
    //            type: "POST",
    //            url: "../BWSD/LocationSetup.asmx/ShowCurrentLevel",
    //            contentType: "application/json; charset=utf-8",
    //            data: myData,
    //            dataType: "json",
    //            success: onSuccessFillddl1,
    //            error: onError,
    //            cache: false
    //        });
    //    }


    //}

    //on btnSaveClicked
    function btnSaveClicked() {
        var isValidated = $("#form1").validate({
            rules: {
                txtLevelName: {
                    required: true
                },
                txtLevelDescription: {
                    required: true
                },
                txtMso: {
                    number: true
                },
                txtAreaManager: {
                    number: true
                },
                txtSalesManager: {
                    number: true
                },
                txtRTL: {
                    number: true
                },
                txtCityNDDCODE: {
                    number: true
                }

            }
        });

        if (!$("#form1").valid()) {
            return false;
        }

        modeValue = $('#hdnMode').val();
        if (modeValue == 'dataAddMode') {
            onDataSave();
        } else if (modeValue == 'EditMode') {
            onDataEditSave();
        }


    }
    function btnCancelClicked() {

        $('#hdnMode').val("dataAddMode");
        $('#hdnIdForEditDelete').val(0);
        clearFields();
        ajaxCompleted();
        return false;
    }
    function onSuccessFillGridViewRegion(data, status) {

        document.getElementById('divTable').innerHTML = "";

        if (data.d != "" && data.d != "[]") {

            jsonObj = jsonParse(data.d);

            _html = '<table id="tableDiv" border="0" class="mGrid">';

            _html += '<tr>';
            _html += '<th>Name</th>';
            _html += '<th>Description</th>';
            _html += '<th> </th>';
            _html += '<th> </th>';
            _html += '</tr>';

            $.each(jsonObj, function (i, tweet) {

                _html += '<tr onclick="GetRowIndex(this.rowIndex);">';
                _html += '<td>' + jsonObj[i].RegionName + '</td>';
                _html += '<td>' + jsonObj[i].Description + '</td>';
                _html += '<td> <input id="' + jsonObj[i].ID + '" type="button" onclick="LoadForEditRegion(' + jsonObj[i].ID + ');" class="form-edit" /></td>';
                _html += '<td> <input id="' + jsonObj[i].ID + '" type="button" onclick="LoadForDeleteRegion(' + jsonObj[i].ID + ');" class="form-del" /></td>';
                _html += '</tr>';

            });

            _html += '</table>';
            document.getElementById('divTable').innerHTML = _html;
        }
        else {
            document.getElementById('divTable').innerHTML = "<h3 style='color:red'>Data Not Found</h3>";
        }
    }

    function onSuccessFillGridViewSubRegion(data, status) {

        document.getElementById('divTable').innerHTML = "";

        if (data.d != "" && data.d != "[]") {

            jsonObj = jsonParse(data.d);

            _html = '<table id="tableDiv" border="0" class="mGrid">';

            _html += '<tr>';
            _html += '<th>Name</th>';
            _html += '<th>Description</th>';
            _html += '<th> </th>';
            _html += '<th> </th>';
            _html += '</tr>';

            $.each(jsonObj, function (i, tweet) {

                _html += '<tr onclick="GetRowIndex(this.rowIndex);">';
                _html += '<td>' + jsonObj[i].SubRegionName + '</td>';
                _html += '<td>' + jsonObj[i].Description + '</td>';
                _html += '<td> <input id="' + jsonObj[i].ID + '" type="button" onclick="LoadForEditRegion(' + jsonObj[i].ID + ');" class="form-edit" /></td>';
                _html += '<td> <input id="' + jsonObj[i].ID + '" type="button" onclick="LoadForDeleteRegion(' + jsonObj[i].ID + ');" class="form-del" /></td>';
                _html += '</tr>';

            });

            _html += '</table>';
            document.getElementById('divTable').innerHTML = _html;
        } else {
            document.getElementById('divTable').innerHTML = "<h3 style='color:red'>Data Not Found</h3>";
        }
    }

    function onSuccessFillGridViewDistrict(data, status) {

        document.getElementById('divTable').innerHTML = "";

        if (data.d != "" && data.d != "[]") {

            jsonObj = jsonParse(data.d);

            _html = '<table id="tableDiv" border="0" class="mGrid">';

            _html += '<tr>';
            _html += '<th>Name</th>';
            _html += '<th>Description</th>';
            _html += '<th>Mso</th>';
            _html += '<th>Area Manager</th>';
            _html += '<th>Sales Manager</th>';
            _html += '<th>RTL</th>';
            _html += '<th> </th>';
            _html += '<th> </th>';
            _html += '</tr>';

            $.each(jsonObj, function (i, tweet) {

                _html += '<tr onclick="GetRowIndex(this.rowIndex);">';
                _html += '<td>' + jsonObj[i].DistrictName + '</td>';
                _html += '<td>' + jsonObj[i].Description + '</td>';
                _html += '<td>' + jsonObj[i].Mso + '</td>';
                _html += '<td>' + jsonObj[i].Area_Manager + '</td>';
                _html += '<td>' + jsonObj[i].Sales_Manager + '</td>';
                _html += '<td>' + jsonObj[i].RTL + '</td>';
                _html += '<td> <input id="' + jsonObj[i].ID + '" type="button" onclick="LoadForEditRegion(' + jsonObj[i].ID + ');" class="form-edit" /></td>';
                _html += '<td> <input id="' + jsonObj[i].ID + '" type="button" onclick="LoadForDeleteRegion(' + jsonObj[i].ID + ');" class="form-del" /></td>';
                _html += '</tr>';

            });

            _html += '</table>';
            document.getElementById('divTable').innerHTML = _html;
        } else {
            document.getElementById('divTable').innerHTML = "<h3 style='color:red'>Data Not Found</h3>";
        }
    }

    function onSuccessFillGridViewCities(data, status) {

        document.getElementById('divTable').innerHTML = "";

        if (data.d != "" && data.d != "[]") {

            jsonObj = jsonParse(data.d);

            _html = '<table id="tableDiv" border="0" class="mGrid">';

            _html += '<tr>';
            _html += '<th>Name</th>';
            _html += '<th>City NDD Code</th>';
            _html += '<th>Big City Dialy Allowance</th>';
            _html += '<th> </th>';
            _html += '<th> </th>';
            _html += '</tr>';

            $.each(jsonObj, function (i, tweet) {

                _html += '<tr onclick="GetRowIndex(this.rowIndex);">';
                _html += '<td>' + jsonObj[i].City + '</td>';
                _html += '<td>' + jsonObj[i].City_NDD_Code + '</td>';
                _html += '<td>' + jsonObj[i].isBigCityDialyAllowance + '</td>';
                _html += '<td> <input id="' + jsonObj[i].ID + '" type="button" onclick="LoadForEditRegion(' + jsonObj[i].ID + ');" class="form-edit" /></td>';
                _html += '<td> <input id="' + jsonObj[i].ID + '" type="button" onclick="LoadForDeleteRegion(' + jsonObj[i].ID + ');" class="form-del" /></td>';
                _html += '</tr>';

            });

            _html += '</table>';
            document.getElementById('divTable').innerHTML = _html;
        } else {
            document.getElementById('divTable').innerHTML = "<h3 style='color:red'>Data Not Found</h3>";
        }
    }


    //on data save 
    function onDataSave() {
        //debugger
        locationHierarchyLevel = $('#ddlLocationHierarchyLevel option:selected').val();
        //check hierarchy is selected
        if (locationHierarchyLevel != -1) {
            var hierarchylabelName = $('#txtLevelName').val();
            var hierarchyDescription = $('#txtLevelDescription').val();
            var regionID = $('#ddl1').val();
            var subRegionID = $('#ddl2').val();
            var InsertLocaltionHierarchy = "";
            var ddl1SelectedValue = $('#ddl1').val();
            var ddl2SelectedValue = $('#ddl2').val();
            var ddl3SelectedValue = $('#ddl3').val();
            var Mso = $('#txtMso').val();
            var areaManager = $('#txAreaManager').val();
            var salesManager = $('#txtSalesManager').val();
            var RTL = $('#txtRTL').val();
            var city_NDD_Code = $('#txtCityNDDCODE').val();
            var isBigCityDialyAllowance = $('#txtIsBigCityAllow').is(':checked') ? 1 : 0;

            if (locationHierarchyLevel == "level1") {
                myData = "{'regionLevelName':'" + hierarchylabelName + "','regionLevelDescription' :'" + hierarchyDescription + "'}";
                InsertLocaltionHierarchy = "InsertLocaltionHierarchy"

            } else if (locationHierarchyLevel == "level2") {
                if (ddl1SelectedValue != -1) {
                    myData = "{'subRegionLevelName':'" + hierarchylabelName + "','subRegionLevelDescription' :'" + hierarchyDescription + "','regionId':'" + regionID + "'}";
                    InsertLocaltionHierarchy = 'InsertSubRegionLocaltionHierarchy'
                } else {
                    alert("Region must be selected ");
                    return false;
                }

            } else if (locationHierarchyLevel == "level3") {
                if (ddl1SelectedValue != -1 && ddl2SelectedValue != -1) {
                    myData = "{'DistrictLevelName':'" + hierarchylabelName + "','DistrictLevelDescription' :'" + hierarchyDescription + "','subRegionId':'" + subRegionID + "' ,'Mso' :'" + Mso + "','areaManager':'" + areaManager + "' ,'salesManager':'" + salesManager + "','RTL':'" + RTL + "'}";
                    InsertLocaltionHierarchy = 'InsertDistrictLocaltionHierarchy'
                } else {
                    alert("Region and Sub Region must be selected ");
                    return false;
                }
            }
            else if (locationHierarchyLevel == "level4") {

                if (ddl1SelectedValue != -1 && ddl2SelectedValue != -1 && ddl3SelectedValue != -1) {
                    myData = "{'City':'" + hierarchylabelName + "','city_NDD_Code' :'" + city_NDD_Code + "','isBigCityDialyAllowance':'" + isBigCityDialyAllowance + "' ,'DistrictID' :'" + ddl3SelectedValue + "'}";
                    InsertLocaltionHierarchy = 'InsertCityLocaltionHierarchy'
                } else {
                    alert("Region, Sub Region and District must be selected ");
                    return false;
                }
            }

            if (myData != '') {

                $.ajax({
                    type: "POST",
                    url: "../BWSD/LocationSetup.asmx/" + InsertLocaltionHierarchy,
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccessReloadTable,
                    error: onError,
                    cache: false
                });
            }

            function OnSuccessReloadTable(data) {
                msg = "";
                if (data.d == "Ok") {
                    msg = "Data successfully inserted";
                    clearFields();
                    $.fn.jQueryMsg({
                        msg: msg,
                        msgClass: 'alert',
                        fx: 'slide',
                        speed: 500
                    });
                } else if (data.d=="alreadyExist") {
                    msg = "Data already Exists";
                    clearFields();
                    $.fn.jQueryMsg({
                        msg: msg,
                        msgClass: 'error',
                        fx: 'slide',
                        speed: 500
                    });
                    }

                if (locationHierarchyLevel != -1) {
                    if (locationHierarchyLevel == "level1") {
                        showRegionTable();
                    } else if (locationHierarchyLevel == "level2") {
                        showSubRegionTable();
                    } else if (locationHierarchyLevel == "level3") {
                        showDistrict();
                    } else if (locationHierarchyLevel == "level4") {
                        showCities();
                    }
                }
            }

        }
        else {

            alert("Hierarchy must be selected!");
        }


        //if (hierarchylabelName == '' && hierarchyDescription == '') {
        //    alert("Should not be null");
        //}

        //if (locationHierarchyLevel == -1) {

        //}

    }


    // on data edit save
    function onDataEditSave() {
        //debugger
        modeValue = $('#hdnMode').val();
        if (locationHierarchyLevel != -1 && modeValue == "EditMode") {
            //debugger
            var hierarchylabelName = $('#txtLevelName').val();
            var hierarchyDescription = $('#txtLevelDescription').val();
            var regionID = $('#ddl1').val();
            var subRegionID = $('#ddl2').val();
            var InsertLocaltionHierarchy = "";
            var ddl1SelectedValue = $('#ddl1').val();
            var ddl2SelectedValue = $('#ddl2').val();
            var ddl3SelectedValue = $('#ddl3').val();
            var Mso = $('#txtMso').val();
            var areaManager = $('#txAreaManager').val();
            var salesManager = $('#txtSalesManager').val();
            var RTL = $('#txtRTL').val();
            var city_NDD_Code = $('#txtCityNDDCODE').val();
            var isBigCityDialyAllowance = $('#txtIsBigCityAllow').is(':checked') ? 1 : 0;
            var IdToBeUpdate = $('#hdnIdForEditDelete').val();

            if (locationHierarchyLevel != -1) {

                if (locationHierarchyLevel == "level1") {
                    if (locationHierarchyLevel != -1) {
                        myData = "{'regionLevelName':'" + hierarchylabelName + "','regionLevelDescription' :'" + hierarchyDescription + "','IdToBeUpdate' :'" + IdToBeUpdate + "'}";
                        updateLocaltionHierarchy = "UpdateRegionLocaltionHierarchy"
                    }
                    else {
                        alert("Region must be selected ");
                        return false;
                    }
                }

                if (locationHierarchyLevel == "level2") {
                    if (ddl1SelectedValue != -1) {
                        myData = "{'subRegionLevelName':'" + hierarchylabelName + "','subRegionLevelDescription' :'" + hierarchyDescription + "','IdToBeUpdate' :'" + IdToBeUpdate + "'}";
                        updateLocaltionHierarchy = "UpdateSubRegionLocaltionHierarchy"
                    } else {
                        alert("Sub Region must be selected ");
                        return false;
                    }
                }
                if (locationHierarchyLevel == "level3") {
                    if (ddl1SelectedValue != -1 && ddl2SelectedValue != -1) {
                        myData = "{'districtLevelName':'" + hierarchylabelName + "','districtLevelDescription' :'" + hierarchyDescription + "','IdToBeUpdate' :'" + IdToBeUpdate + "','Mso' :'" + Mso + "','areaManager' :'" + areaManager + "','salesManager' :'" + salesManager + "','RTL' :'" + RTL + "'}";
                        updateLocaltionHierarchy = "UpdateDistrictLocaltionHierarchy"
                    } else {
                        alert("Resion and Sub Region must be selected ");
                        return false;
                    }
                }

                if (locationHierarchyLevel == "level4") {
                    if (ddl1SelectedValue != -1 && ddl2SelectedValue != -1 && ddl3SelectedValue != -1) {


                        myData = "{'cityLevelName':'" + hierarchylabelName + "','IdToBeUpdate':'" + IdToBeUpdate + "','City_NDD_Code':'" + city_NDD_Code + "','isBigCityDialyAllowance':'" + isBigCityDialyAllowance + "'}";

                        updateLocaltionHierarchy = "UpdateCityLocaltionHierarchy"
                    } else {
                        alert("Resion Sub Region and District must be selected ");
                        return false;
                    }
                }



            }

            if (myData != '') {

                $.ajax({
                    type: "POST",
                    url: "../BWSD/LocationSetup.asmx/" + updateLocaltionHierarchy,
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessEditUpdate,
                    error: onError,
                    cache: false
                });
            }

            function onSuccessEditUpdate(data) {


                msg = "";
                if (data.d == "OkDataUpdated") {
                    $('#hdnMode').val('dataAddMode');
                    $('#hdnIdForEditDelete').val(0);
                    msg = "Data successfully Updated";
                    clearFields();
                    $.fn.jQueryMsg({
                        msg: msg,
                        msgClass: 'alert',
                        fx: 'slide',
                        speed: 500
                    });
                } else if (data.d == "alreadyExist") {
                    msg = "Data already Exists";
                    clearFields();
                    $.fn.jQueryMsg({
                        msg: msg,
                        msgClass: 'error',
                        fx: 'slide',
                        speed: 500
                    });
                }
                //if (data.d == "OkDataUpdated") {
                //    alert("Data successfully Updated");
                //    $('#hdnMode').val('dataAddMode');
                //    $('#hdnIdForEditDelete').val(0);
                //    clearFields();

                //} else {
                //    alert("Data not Updated");
                //}

                if (locationHierarchyLevel != -1) {
                    if (locationHierarchyLevel == "level1") {
                        showRegionTable();
                    } else if (locationHierarchyLevel == "level2") {
                        showSubRegionTable();
                    } else if (locationHierarchyLevel == "level3") {
                        showDistrict();
                    } else if (locationHierarchyLevel == "level4") {
                        showCities();
                    }
                }

            }
        }

    }
});



// on edit by region id
function LoadForEditRegion(RegionId) {

    $('#hdnMode').val("EditMode");
    $('#hdnIdForEditDelete').val(RegionId);

    if (locationHierarchyLevel != -1) {
        if (locationHierarchyLevel == "level1") {
            myData = "{'parentLevelId':'" + RegionId + "','levelName':'" + locationHierarchyLevel + "'}";

            $.ajax({
                type: "POST",
                url: "../BWSD/LocationSetup.asmx/getDataForEditRegion",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: fillDataForEditRegion,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else if (locationHierarchyLevel == "level2") {

            myData = "{'parentLevelId':'" + RegionId + "','levelName':'" + locationHierarchyLevel + "'}";

            $.ajax({
                type: "POST",
                url: "../BWSD/LocationSetup.asmx/getDataForEditRegion",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: fillDataForEditSubRegion,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else if (locationHierarchyLevel == "level3") {

            myData = "{'parentLevelId':'" + RegionId + "','levelName':'" + locationHierarchyLevel + "'}";

            $.ajax({
                type: "POST",
                url: "../BWSD/LocationSetup.asmx/getDataForEditRegion",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: fillDataForEditDistrictRegion,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        else if (locationHierarchyLevel == "level4") {


            myData = "{'parentLevelId':'" + RegionId + "','levelName':'" + locationHierarchyLevel + "'}";

            $.ajax({
                type: "POST",
                url: "../BWSD/LocationSetup.asmx/getDataForEditRegion",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: fillDataForEditCity,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
    }
}

//delete for id;
function LoadForDeleteRegion(RegionId) {

    $('#hdnMode').val("DeleteMode");

    $('#hdnIdForEditDelete').val(RegionId);
    $('#divConfirmation').jqmShow();
    // alert(RegionId);


}


function deleteDataRegion() {
    alert("data deleted successfully");
}


function fillDataForEditRegion(data) {
    //debugger
    modeValue = $('#hdnMode').val();
    if (data.d != "" && modeValue == "EditMode") {
        jsonObj = jsonParse(data.d);
        $.each(jsonObj, function (i, tweet) {
            $("#txtLevelName").val(jsonObj[i].RegionName);
            $("#txtLevelDescription").val(jsonObj[i].Description);
        });

    }
}

function fillDataForEditSubRegion(data) {
    modeValue = $('#hdnMode').val();
    if (data.d != "" && modeValue == "EditMode") {
        jsonObj = jsonParse(data.d);
        $.each(jsonObj, function (i, tweet) {
            $("#txtLevelName").val(jsonObj[i].SubRegionName);
            $("#txtLevelDescription").val(jsonObj[i].Description);
        });

    }

}

function fillDataForEditDistrictRegion(data) {

    //debugger
    modeValue = $('#hdnMode').val();
    if (data.d != "" && modeValue == "EditMode") {
        jsonObj = jsonParse(data.d);
        $.each(jsonObj, function (i, tweet) {
            $("#txtLevelName").val(jsonObj[i].DistrictName);
            $("#txtLevelDescription").val(jsonObj[i].Description);
            $("#txtMso").val(jsonObj[i].Mso);
            $("#txAreaManager").val(jsonObj[i].Area_Manager);
            $("#txtSalesManager").val(jsonObj[i].Sales_Manager);
            $("#txtRTL").val(jsonObj[i].RTL);
        });
    }
}

function fillDataForEditCity(data) {

    modeValue = $('#hdnMode').val();
    if (data.d != "" && modeValue == "EditMode") {
        jsonObj = jsonParse(data.d);
        $.each(jsonObj, function (i, tweet) {
            $("#txtLevelName").val(jsonObj[i].City);
            $("#txtLevelDescription").val('NULL');
            $("#txtCityNDDCODE").val(jsonObj[i].City_NDD_Code);
            $("#txtIsBigCityAllow").attr('checked', (jsonObj[i].isBigCityDialyAllowance.toLowerCase() === 'true' ? true : false));

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
}
function startingAjax() {
    $('#imgLoading').show();
}
function ajaxCompleted() {
    $('#imgLoading').hide();
}

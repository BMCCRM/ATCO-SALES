function pageLoad() {
    IsValidUser();
    GetCurrentUser();

    $2("#ddlDistributor").select2({
        dropdownParent: $2('#g2'),
        placeholder: "Select Distributor",
        allowClear: true
    });
    $2("#ddlDistributorUpdate").select2({
        placeholder: "Select Distributor",
        allowClear: true
    });
    $2("#ddlDistributorUpdate2").select2({
        placeholder: "Select Distributor",
        allowClear: true
    });
    //$2("#ddlBrick").select2({
    //    dropdownParent: $2('#g2'),
    //    placeholder: "Select Brick",
    //    allowClear: true
    //});
    $2("#ddlBrickUpdate").select2({
        placeholder: "Select Brick",
        allowClear: true
    });
    $2("#ddlBrickUpdate2").select2({
        placeholder: "Select Brick",
        allowClear: true
    });
    //$2("#ddlCity").select2({
    //    dropdownParent: $2('#g3'),
    //    placeholder: "Select City",
    //    allowClear: true
    //});
    $2("#ddlCityUpdate").select2({
        placeholder: "Select City",
        allowClear: true
    });
    $2("#ddlCityUpdate2").select2({
        placeholder: "Select City",
        allowClear: true
    });
    $2("#ddlSpeciality").select2({
        dropdownParent: $2('#g4'),
        placeholder: "Select Speciality",
        allowClear: true
    });
    $2("#ddlSpeciality2").select2({
        dropdownParent: $2('#g4'),
        placeholder: "Select Speciality",
        allowClear: true
    });
    $2("#ddlDesignation").select2({
        dropdownParent: $2('#g5'),
        placeholder: "Select Designation",
        allowClear: true
    });
    $2("#ddlDesignation2").select2({
        dropdownParent: $2('#g5'),
        placeholder: "Select Designation",
        allowClear: true
    });
    $2("#ddlQualification").select2({
        dropdownParent: $2('#g5'),
        placeholder: "Select Designation",
        allowClear: true
    });
    $2("#ddlQualification2").select2({
        dropdownParent: $2('#g5'),
        placeholder: "Select Designation",
        allowClear: true
    });

    FillGrid();
    FillSumbitDataGrid();
    FillCity();
    FillDistribuor();
    FillSpeciality();
    FillDesignation();
    FillQualification();
    GetAllBrickUpdate();
    //$2('#ddlCity').change(OnChangeCity);
    //$2('#ddlDistributor').change(OnChangeDistributor);
    $2('#btnResult').click(FillData);
    $2('#btnUpdate').click(Update);

    $2("#ddlCityUpdate").prop("disabled", true);
}

function IsValidUser() {
    $.ajax({
        type: "POST",
        url: "../Reports/NewDashboard.asmx/IsValidUser",
        contentType: "application/json; charset=utf-8",
        success: onSuccessValidUser,
        error: onError,
        cache: false
    });
}
function onSuccessValidUser(data, status) {
    var stat = data.d;

    if (stat) {

    }
    else {
        window.location = "/Form/Login.aspx";
    }
}

function GetCurrentUser() {
    $.ajax({
        type: "POST",
        url: "../form/CommonService.asmx/GetCurrentUser",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUser,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetCurrentUser(data, status) {
    if (data.d != "") {
        EmployeeId = data.d;
    }

    GetCurrentUserLoginID();
}

function GetCurrentUserLoginID() {
    $.ajax({
        type: "POST",
        url: "../form/CommonService.asmx/GetCurrentUserLoginID",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUserLoginID,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetCurrentUserLoginID(data, status) {
    if (data.d != "") {
        CurrentUserLoginId = data.d;
    }

    GetCurrentUserRole();
}

function GetCurrentUserRole() {

    $.ajax({
        type: "POST",
        url: "../form/CommonService.asmx/GetCurrentUserRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUserRole,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });

}
function onSuccessGetCurrentUserRole(data, status) {
    if (data.d != "") {
        CurrentUserRole = data.d;
    }
    EmployeeIdForTeam = EmployeeId;
}

function FillCity() {
    $.ajax({
        type: "POST",
        url: "DoctorBrickAndCityAlignment.asmx/GetAllCity",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {
            //$2('#ddlCity').empty();
            //$2("#ddlCity").append("<option value='-1'>Select City</option>");

            $2('#ddlCityUpdate').empty();
            $2("#ddlCityUpdate").append("<option value='-1'>Select City</option>");

            $2('#ddlCityUpdate2').empty();
            $2("#ddlCityUpdate2").append("<option value='-1'>Select City</option>");

            if (response.d != 'No') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    //$2("#ddlCity").append("<option value='" + option.ID + "'>" + option.City + "</option>");
                    $2("#ddlCityUpdate").append("<option value='" + option.ID + "'>" + option.City + "</option>");
                    $2("#ddlCityUpdate2").append("<option value='" + option.ID + "'>" + option.City + "</option>");
                });
            }
        },
        error: onError,
        cache: false
    });
}

function GetAllBrickUpdate() {
    $.ajax({
        type: "POST",
        url: "DoctorBrickAndCityAlignment.asmx/GetSalesBricksUpdate",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {
            $2('#ddlBrickUpdate').empty();
            $2("#ddlBrickUpdate").append("<option value='-1'>Select Brick</option>");

            $2('#ddlBrickUpdate2').empty();
            $2("#ddlBrickUpdate2").append("<option value='-1'>Select Brick</option>");

            if (response.d != '') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $2("#ddlBrickUpdate2").append("<option value='" + option.brickID + "'>" + option.BrickCode + " - " + option.BrickName + "</option>");
                    $2("#ddlBrickUpdate").append("<option value='" + option.brickID + "'>" + option.BrickCode + " - " + option.BrickName + "</option>");
                });
            }
        },
        error: onError,
        cache: false
    });
}

function OnChangeCity() {
    myData = JSON.stringify({ 'ID': $2('#ddlCity').val() || 0 });
    $.ajax({
        type: "POST",
        url: "DoctorBrickAndCityAlignment.asmx/GetSalesDistributor",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (response, data, status) {
            $2('#ddlDistributor').empty();
            $2("#ddlDistributor").append("<option value='-1'>Select Distributor</option>");

            if (response.d != '') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $2("#ddlDistributor").append("<option value='" + option.ID + "'>" + option.DistributorCode + " - " + option.DistributorName + "</option>");
                });
            }
        },
        error: onError,
        cache: false
    });
}

function FillDistribuor() {

    $.ajax({
        type: "POST",
        url: "DoctorBrickAndCityAlignment.asmx/GetSalesDistributor",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {
            $2('#ddlDistributor').empty();
            $2("#ddlDistributor").append("<option value='-1'>Select Distributor</option>");

            $2('#ddlDistributorUpdate').empty();
            $2("#ddlDistributorUpdate").append("<option value='-1'>Select Distributor</option>");

            $2('#ddlDistributorUpdate2').empty();
            $2("#ddlDistributorUpdate2").append("<option value='-1'>Select Distributor</option>");

            if (response.d != '') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $2("#ddlDistributor").append("<option value='" + option.DistributorID + "'>" + option.DistributorCode + " - " + option.DistributorName + "</option>");
                    $2("#ddlDistributorUpdate").append("<option value='" + option.DistributorID + "'>" + option.DistributorCode + " - " + option.DistributorName + "</option>");
                    $2("#ddlDistributorUpdate2").append("<option value='" + option.DistributorID + "'>" + option.DistributorCode + " - " + option.DistributorName + "</option>");
                });
            }
        },
        error: onError,
        cache: false
    });
}

function OnChangeDistributor() {
    $2('#ddlCityUpdate').val(-1).trigger('change');

    $2('#ddlBrickUpdate').empty();
    $2("#ddlBrickUpdate").append("<option value='-1'>Select Brick</option>");
    myData = JSON.stringify({ 'ID': $2('#ddlDistributorUpdate').val() || 0 });
    $.ajax({
        type: "POST",
        url: "DoctorBrickAndCityAlignment.asmx/GetSalesBricks",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (response, data, status) {
            if (response.d != '') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $2("#ddlBrickUpdate").append("<option value='" + option.brickID + "'>" + option.BrickCode + " - " + option.BrickName + "</option>");
                });
            }
        },
        error: onError,
        cache: false
    });
}

function OnChangeDistributor2() {
    $2('#ddlCityUpdate2').val(-1).trigger('change');

    $2('#ddlBrickUpdate2').empty();
    $2("#ddlBrickUpdate2").append("<option value='-1'>Select Brick</option>");
    myData = JSON.stringify({ 'ID': $2('#ddlDistributorUpdate2').val() || 0 });
    $.ajax({
        type: "POST",
        url: "DoctorBrickAndCityAlignment.asmx/GetSalesBricks",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (response, data, status) {
            if (response.d != '') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $2("#ddlBrickUpdate2").append("<option value='" + option.brickID + "'>" + option.BrickCode + " - " + option.BrickName + "</option>");
                });
            }
        },
        error: onError,
        cache: false
    });
}

function OnChangeBrickUpdate() {
    myData = JSON.stringify({ 'singleBrick': $2('#ddlBrickUpdate').val() || 0 });
    $.ajax({
        type: "POST",
        url: "DoctorBrickAndCityAlignment.asmx/GetBricksCity",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (response, data, status) {
            $2('#ddlCityUpdate').empty();
            $2("#ddlCityUpdate").append("<option value='-1'>Select City</option>");

            if (response.d != '') {
                var msg = $.parseJSON(response.d);

                $.each(msg, function (i, option) {
                    $2("#ddlCityUpdate").append("<option value='" + option.CityID + "'>" + option.CityName + "</option>");
                    $2('#ddlCityUpdate').val(option.CityID).trigger('change');
                });
            }
        },
        error: onError,
        cache: false
    });
}

function OnChangeBrickUpdate2() {
    myData = JSON.stringify({ 'singleBrick': $2('#ddlBrickUpdate2').val() || 0 });
    $.ajax({
        type: "POST",
        url: "DoctorBrickAndCityAlignment.asmx/GetBricksCity",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myData,
        async: false,
        success: function (response, data, status) {
            $2('#ddlCityUpdate2').empty();
            $2("#ddlCityUpdate2").append("<option value='-1'>Select City</option>");

            if (response.d != '') {
                var msg = $.parseJSON(response.d);

                $.each(msg, function (i, option) {
                    $2("#ddlCityUpdate2").append("<option value='" + option.CityID + "'>" + option.CityName + "</option>");
                    $2('#ddlCityUpdate2').val(option.CityID).trigger('change');
                });
            }
        },
        error: onError,
        cache: false
    });
}

function FillSpeciality() {
    $.ajax({
        type: "POST",
        url: "DoctorBrickAndCityAlignment.asmx/GetSpeciality",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {
            $2('#ddlSpeciality').empty();
            $2("#ddlSpeciality").append("<option value='-1'>Select Speciality</option>");

            $2('#ddlSpeciality2').empty();
            $2("#ddlSpeciality2").append("<option value='-1'>Select Speciality</option>");

            if (response.d != '') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $2("#ddlSpeciality").append("<option value='" + option.SpecialityId + "'>" + option.SpecialiityName + "</option>");
                    $2("#ddlSpeciality2").append("<option value='" + option.SpecialityId + "'>" + option.SpecialiityName + "</option>");
                });
            }
        },
        error: onError,
        cache: false
    });
}

function FillDesignation() {
    $.ajax({
        type: "POST",
        url: "DoctorBrickAndCityAlignment.asmx/GetDesignation",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {
            $2('#ddlDesignation').empty();
            $2("#ddlDesignation").append("<option value='-1'>Select Designation</option>");

            $2('#ddlDesignation2').empty();
            $2("#ddlDesignation2").append("<option value='-1'>Select Designation</option>");

            if (response.d != '') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $2("#ddlDesignation").append("<option value='" + option.DesignationId + "'>" + option.DesignationName + "</option>");
                    $2("#ddlDesignation2").append("<option value='" + option.DesignationId + "'>" + option.DesignationName + "</option>");
                });
            }
        },
        error: onError,
        cache: false
    });
}

function FillQualification() {
    $.ajax({
        type: "POST",
        url: "DoctorBrickAndCityAlignment.asmx/GetQualification",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response, data, status) {
            $2('#ddlQualification').empty();
            $2("#ddlQualification").append("<option value='-1'>Select Qualification</option>");

            $2('#ddlQualification2').empty();
            $2("#ddlQualification2").append("<option value='-1'>Select Qualification</option>");

            if (response.d != '') {
                var msg = $.parseJSON(response.d);
                $.each(msg, function (i, option) {
                    $2("#ddlQualification").append("<option value='" + option.QulificationId + "'>" + option.QualificationName + "</option>");
                    $2("#ddlQualification2").append("<option value='" + option.QulificationId + "'>" + option.QualificationName + "</option>");
                });
            }
        },
        error: onError,
        cache: false
    });
}

function FillData() {
    FillGrid();
    FillSumbitDataGrid();
}

function FillGrid() {
    $2("#Grid_DoctorBrickAndCityAlignment").empty();
    ShowLoaderMG('griddiv');

    var CityID, DistributorID, BrickID, SpecialityID, DesignationID;

    //CityID = $2('#ddlCity').val() != null && $2('#ddlCity').val() != '' && $2('#ddlCity').val() != '-1' ? $2('#ddlCity').val() : 0;
    DistributorID = $2('#ddlDistributor').val() != null && $2('#ddlDistributor').val() != '' && $2('#ddlDistributor').val() != '-1' ? $2('#ddlDistributor').val() : 0;
    //BrickID = $2("#ddlBrick").val() != null && $2("#ddlBrick").val() != '' && $2('#ddlBrick').val() != '-1' ? $2("#ddlBrick").val() : 0;
    //SpecialityID = $2("#ddlSpeciality").val() != null && $2("#ddlSpeciality").val() != '' && $2('#ddlSpeciality').val() != '-1' ? $2("#ddlSpeciality").val() : 0;
    //DesignationID = $2("#ddlDesignation").val() != null && $2("#ddlDesignation").val() != '' && $2('#ddlDesignation').val() != '-1' ? $2("#ddlDesignation").val() : 0;

    if (DistributorID != '0') {
        mydata = JSON.stringify({
            //'CityID': CityID,
            'DistributorID': DistributorID,
            //'BrickID': BrickID,
            //'SpecialityID': SpecialityID,
            //'DesignationID': DesignationID,
        });

        $.ajax({
            type: "POST",
            url: "DoctorBrickAndCityAlignment.asmx/GetAllDoctor_BrickAndCitySwitch",
            data: mydata,
            contentType: "application/json; charset=utf-8",
            success: OnsuccessFillGrid,
            beforeSend: startingAjax('griddiv'),
            complete: ajaxCompleted('griddiv'),
            error: onError,
            async: true,
            cache: false
        });
    }
    else {
        $2("#griddiv").empty();
        $2("#griddiv").append("<table id='Grid_DoctorBrickAndCityAlignment' class='table b-1 table-striped table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
        $2("#Grid_DoctorBrickAndCityAlignment").append("<thead>" +
            "<tr style='background-color: #217ebd;color: white;'>" +
                "<th>Doctor Code</th>" +
                "<th>Doctor Name</th>" +
                "<th>Designation</th>" +
                "<th>Speciality</th>" +
                "<th>Qualification</th>" +
                "<th>Address1</th>" +
                "<th>Doctor City</th>" +
                "<th>Distributor Code</th>" +
                "<th>Distributor Name</th>" +
                "<th>Brick Code</th> " +
                "<th>Brick Name</th>" +
                "<th>Action</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody id='values'");

        $2("#Grid_DoctorBrickAndCityAlignment").DataTable({
            responsive: true,
            "lengthMenu": [[20, 30, 50, 70, 90, 100, 150, 200, -1], [20, 30, 50, 70, 90, 100, 150, 200, "All"]]
        });
        HideLoaderMG('griddiv');
    }
}

function OnsuccessFillGrid(data) {
    $2("#Grid_DoctorBrickAndCityAlignment").empty();

    if (data != "") {
        var msg = "";

        if (data.d == undefined) {
            msg = $.parseJSON(data);
        }
        else {
            if (data.d != "") {
                msg = $.parseJSON(data.d);

                var jsonString = JSON.stringify(data.d);
            }
            else {
                msg = 0;
            }
        }

        var table = $2("#Grid_DoctorBrickAndCityAlignment")

        table.DataTable({
            //pagination: "bootstrap",
            filter: true,
            data: data.d,
            destroy: true,
            lengthMenu: [20, 30, 50, 70, 90, 100, 150, 200],
            pageLength: 20,
            "data": msg,
            "columns": [
                { "data": "DoctorCode" },
                { "data": "DoctorName" },
                { "data": "DesignationName" },
                { "data": "SpecialiityName" },
                { "data": "QualificationName" },
                { "data": "Address1" },
                { "data": "City" },
                { "data": "DistributorCode" },
                { "data": "DistributorName" },
                { "data": "BrickCode" },
                { "data": "BrickName" },
                {
                    data: "",
                    render: function (data, type, row) {
                        return "<input type='button' class='Btn btn-sm btn-rounded btn-blueedit' onClick=\"UpdateView('" + row.DoctorId + "','" + row.CityID + "','" + row.DistributorID + "','" + row.BrickID + "','" + row.SpecialityId + "','" + row.DesignationId + "','" + row.QulificationId + "','" + row.Address1 + "');\" value='Edit' />";
                    },
                },
            ]
        });

        $2('#Grid_DoctorBrickAndCityAlignment tbody').on('click', '#edit', function () {
            var data = table.row(this).data();
            console.log(data[0]);
        });
    }
    HideLoaderMG('griddiv');
}

function FillSumbitDataGrid() {
    ShowLoaderMG('griddiv1');

    var CityID, DistributorID, BrickID, SpecialityID, DesignationID;

    $.ajax({
        type: "POST",
        url: "DoctorBrickAndCityAlignment.asmx/GetAllDoctor_BrickAndCitySwitchIn_ProcessData",
        //data: mydata,
        contentType: "application/json; charset=utf-8",
        success: OnsuccessFillSumbitDataGrid,
        beforeSend: startingAjax('griddiv'),
        complete: ajaxCompleted('griddiv'),
        error: onError,
        async: true,
        cache: false
    });
}

function OnsuccessFillSumbitDataGrid(data) {
    if (data != "") {
        var msg = "";

        if (data.d == undefined) {
            msg = $.parseJSON(data);
        }
        else {
            if (data.d != "")
                msg = $.parseJSON(data.d);
            else
                msg = 0;
        }

        $2("#griddiv1").empty();
        $2("#griddiv1").append("<table id='Grid_DoctorBrickAndCityAlignment1' class='table b-1 table-striped table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
        $2("#Grid_DoctorBrickAndCityAlignment1").append("<thead>" +
            "<tr style='background-color: #217ebd;color: white;'>" +
                "<th>Doctor Code</th>" +
                "<th>Doctor Name</th>" +
                "<th>Designation</th>" +
                "<th>Speciality</th>" +
                "<th>Qualification</th>" +
                "<th>Address1</th>" +
                "<th>Doctor City</th>" +
                "<th>Distributor Code</th>" +
                "<th>Distributor Name</th>" +
                "<th>Brick Code</th> " +
                "<th>Brick Name</th>" +
                "<th>Action</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody id='values1'");

        var val = '';

        if (msg.length > 0) {
            for (var i = 0; i < msg.length ; i++) {
                var btnEdit = "<td><input type='button' class='Btn btn-sm btn-rounded btn-blueedit' onClick=\"UpdateViewInProcess('" + msg[i].PK_ID + "','" + msg[i].DoctorId + "','" + msg[i].CityID + "','" + msg[i].DistributorID + "','" + msg[i].BrickID + "','" + msg[i].SpecialityId + "','" + msg[i].DesignationId + "','" + msg[i].QulificationId + "','" + msg[i].Address1 + "', 'Edit');\" value='Edit' />";
                var btnDelete = "<input type='button' class='Btn btn-sm btn-rounded btn-Rededit' onClick=\"Delete('" + msg[i].PK_ID + "');\" value='Delete' /></td>";

                val = "<tr>" +
                    "<td>" + msg[i].DoctorCode + "</td>" +
                    "<td>" + msg[i].DoctorName + "</td>" +
                    "<td>" + msg[i].DesignationName + "</td>" +
                    "<td>" + msg[i].SpecialiityName + "</td>" +
                    "<td>" + msg[i].QualificationName + "</td>" +
                    "<td>" + msg[i].Address1 + "</td>" +
                    "<td>" + msg[i].City + "</td>" +
                    "<td>" + msg[i].DistributorCode + "</td>" +
                    "<td>" + msg[i].DistributorName + "</td>" +
                    "<td>" + msg[i].BrickCode + "</td>" +
                    "<td>" + msg[i].BrickName + "</td>" +
                    btnEdit + '&nbsp;' + btnDelete;

                val += + "</tr></tbody>";

                $2('#Grid_DoctorBrickAndCityAlignment1').append(val);
            }
        }
        $2("#Grid_DoctorBrickAndCityAlignment1").DataTable({
            responsive: true,
            "lengthMenu": [[20, 30, 50, 70, 90, 100, 150, 200, -1], [20, 30, 50, 70, 90, 100, 150, 200, "All"]]
        });
    }
    HideLoaderMG('griddiv1');
}

function UpdateView(DoctorId, CityID, DistributorID, BrickID, Speciality, Designation, Qualification, Address) {
    ClearField();

    $i('#DoctorBrickAndCityAlignmentModal').modal('show');
    $2('#txtDoctorID').val(DoctorId);

    $2('#ddlDistributorUpdate').change(OnChangeDistributor);
    $2('#ddlDistributorUpdate').val(DistributorID).trigger('change');

    $2('#ddlDistributorUpdate2').change(OnChangeDistributor2);
    $2('#ddlDistributorUpdate2').val(DistributorID).trigger('change');

    $2('#ddlBrickUpdate').change(OnChangeBrickUpdate);
    $2('#ddlBrickUpdate').val(BrickID).trigger('change');

    $2('#ddlBrickUpdate2').change(OnChangeBrickUpdate2);
    $2('#ddlBrickUpdate2').val(BrickID).trigger('change');

    $2('#ddlCityUpdate').val(CityID).trigger('change');
    $2('#ddlCityUpdate2').val(CityID).trigger('change');

    $2('#ddlSpeciality').val(Speciality).trigger('change');
    $2('#ddlSpeciality2').val(Speciality).trigger('change');

    $2('#ddlDesignation').val(Designation).trigger('change');
    $2('#ddlDesignation2').val(Designation).trigger('change');

    $2('#ddlQualification').val(Qualification).trigger('change');
    $2('#ddlQualification2').val(Qualification).trigger('change');

    $2('#txtAddress').val(Address);
    $2('#txtAddress2').val(Address);
}

function UpdateViewInProcess(PK_ID, DoctorId, CityID, DistributorID, BrickID, Speciality, Designation, Qualification, Address, Status) {
    ClearField();

    $2('#txtPK_ID').val(PK_ID);
    $2('#txtStatus').val(Status);
    $2('#txtDoctorID').val(DoctorId);
    $2('#ddlCityUpdate').val(CityID).trigger('change');
    $2('#ddlDistributorUpdate').val(DistributorID).trigger('change');
    $2('#ddlBrickUpdate').val(BrickID).trigger('change');
    $2('#ddlSpeciality').val(Speciality).trigger('change');
    $2('#ddlDesignation').val(Designation).trigger('change');
    $2('#ddlQualification').val(Qualification).trigger('change');
    $2('#txtAddress').val(Address);

    $i('#DoctorBrickAndCityAlignmentModal').modal('show');
}

function Delete(PK_ID) {
    swal({
        title: "Delete",
        text: "Are you sure you want to Delete this record?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "No, Cancel",
        closeOnConfirm: false,
        closeOnCancel: false
    },
  function (isConfirm) {
      if (isConfirm) {

          mydata = JSON.stringify({
              'PK_ID': PK_ID,
          });

          $.ajax({
              type: "POST",
              url: "DoctorBrickAndCityAlignment.asmx/DeleteDoctorBrickAndCityInProcessData",
              data: mydata,
              contentType: "application/json; charset=utf-8",
              success: function (data) {
                  if (data != "") {
                      var msg = "";
                      if (data.d == undefined) {
                          msg = $.parseJSON(data);
                      }
                      else {
                          if (data.d != "")
                              msg = $.parseJSON(data.d);
                          else
                              msg = 0;
                      }

                      if (msg.length > 0) {
                          sweetAlert(msg[0].MSG, '', msg[0].MSG == "Delete Successfully" ? 'success' : 'warning');
                      }
                  }
                  FillSumbitDataGrid();
              },
              beforeSend: startingAjax,
              complete: ajaxCompleted,
              error: onError,
              async: false,
              cache: false
          });
      } else {
          swal("Cancelled", "Request has been cancelled:)", "error");
      }
  });
}

function Update() {
    if ($2('#txtDoctorID').val() == '-1' || $2('#txtDoctorID').val() == '' || $2('#txtDoctorID').val() == null) {
        sweetAlert('Please Select Doctor', '', 'warning');
        return;
    } else if ($2('#ddlDistributorUpdate').val() == '-1' || $2('#ddlDistributorUpdate').val() == '' || $2('#ddlDistributorUpdate').val() == null) {
        sweetAlert('Please Select Distributor', '', 'warning');
        return;
    } else if ($2('#ddlBrickUpdate').val() == '-1' || $2('#ddlBrickUpdate').val() == '' || $2('#ddlBrickUpdate').val() == null) {
        sweetAlert('Please Select Brick', '', 'warning');
        return;
    } else if ($2('#ddlCityUpdate').val() == '-1' || $2('#ddlCityUpdate').val() == '' || $2('#ddlCityUpdate').val() == null) {
        sweetAlert('Please Select City', '', 'warning');
        return;
    } else if ($2('#ddlSpeciality').val() == '-1' || $2('#ddlSpeciality').val() == '' || $2('#ddlSpeciality').val() == null) {
        sweetAlert('Please Select Speciality', '', 'warning');
        return;
    } else if ($2('#ddlDesignation').val() == '-1' || $2('#ddlDesignation').val() == '' || $2('#ddlDesignation').val() == null) {
        sweetAlert('Please Select Designation', '', 'warning');
        return;
    } else if ($2('#ddlQualification').val() == '-1' || $2('#ddlQualification').val() == '' || $2('#ddlQualification').val() == null) {
        sweetAlert('Please Select Qualification', '', 'warning');
        return;
    }

    swal({
        title: "Doctor Statistics Alignment",
        text: "Are you sure you want to update the statistics?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Update",
        cancelButtonText: "No, cancel",
        closeOnConfirm: false,
        closeOnCancel: false
    },
  function (isConfirm) {
      if (isConfirm) {
          if ($2('#txtStatus').val() == 'Edit') {
              mydata = JSON.stringify({
                  'PK_ID': $2('#txtPK_ID').val(),
                  'DoctorID': $2('#txtDoctorID').val(),
                  'CityID': $2('#ddlCityUpdate').val(),
                  'DistributorID': $2('#ddlDistributorUpdate').val(),
                  'BrickID': $2('#ddlBrickUpdate').val(),
                  'SpecialityID': $2('#ddlSpeciality').val(),
                  'DesignationID': $2('#ddlDesignation').val(),
                  'QualificationID': $2('#ddlQualification').val(),
                  'Address': $2('#txtAddress').val(),
              });

              $.ajax({
                  type: "POST",
                  url: "DoctorBrickAndCityAlignment.asmx/UpdateDoctorBrickAndCityInProcessData",
                  data: mydata,
                  contentType: "application/json; charset=utf-8",
                  success: function (data) {
                      $i('#DoctorBrickAndCityAlignmentModal').modal('hide');
                      if (data != "") {
                          var msg = "";
                          if (data.d == undefined) {
                              msg = $.parseJSON(data);
                          }
                          else {
                              if (data.d != "")
                                  msg = $.parseJSON(data.d);
                              else
                                  msg = 0;
                          }

                          if (msg.length > 0) {
                              sweetAlert(msg[0].MSG, '', msg[0].MSG == "Insert Successfully" ? 'success' : 'warning');
                          }
                      }
                      FillSumbitDataGrid();
                  },
                  beforeSend: startingAjax,
                  complete: ajaxCompleted,
                  error: onError,
                  async: false,
                  cache: false
              });
          }
          else {
              mydata = JSON.stringify({
                  'DoctorID': $2('#txtDoctorID').val(),
                  'CityID': $2('#ddlCityUpdate').val(),
                  'DistributorID': $2('#ddlDistributorUpdate').val(),
                  'BrickID': $2('#ddlBrickUpdate').val(),
                  'SpecialityID': $2('#ddlSpeciality').val(),
                  'DesignationID': $2('#ddlDesignation').val(),
                  'QualificationID': $2('#ddlQualification').val(),
                  'Address': $2('#txtAddress').val(),
              });

              $.ajax({
                  type: "POST",
                  url: "DoctorBrickAndCityAlignment.asmx/InsertDoctorBrickAndCity",
                  data: mydata,
                  contentType: "application/json; charset=utf-8",
                  success: function (data) {
                      $i('#DoctorBrickAndCityAlignmentModal').modal('hide');
                      if (data != "") {
                          var msg = "";
                          if (data.d == undefined) {
                              msg = $.parseJSON(data);
                          }
                          else {
                              if (data.d != "")
                                  msg = $.parseJSON(data.d);
                              else
                                  msg = 0;
                          }

                          if (msg.length > 0) {
                              sweetAlert(msg[0].MSG, '', msg[0].MSG == "Insert Successfully" ? 'success' : 'warning');
                          }
                      }
                      FillSumbitDataGrid();
                      FillGrid();
                  },
                  beforeSend: startingAjax,
                  complete: ajaxCompleted,
                  error: onError,
                  async: false,
                  cache: false
              });
          }
      } else {
          swal("Cancelled", "Request has been cancelled:)", "error");
      }
  });
}

function ClearField() {
    $2('#txtPK_ID').val("");
    $2('#txtStatus').val("");
    $2('#txtDoctorID').val("");

    $2('#ddlCityUpdate').val(-1).trigger('change');
    $2('#ddlCityUpdate2').val(-1).trigger('change');

    $2('#ddlDistributorUpdate').val(-1).trigger('change');
    $2('#ddlDistributorUpdate2').val(-1).trigger('change');

    $2('#ddlBrickUpdate').val(-1).trigger('change');
    $2('#ddlBrickUpdate2').val(-1).trigger('change');

    $2('#ddlSpeciality').val(-1).trigger('change');
    $2('#ddlSpeciality2').val(-1).trigger('change');

    $2('#ddlDesignation').val(-1).trigger('change');
    $2('#ddlDesignation2').val(-1).trigger('change');

    $2('#ddlQualification').val(-1).trigger('change');
    $2('#ddlQualification2').val(-1).trigger('change');

    $2('#txtAddress').val("");
    $2('#txtAddress2').val("");
}

function onError(request, status, error) {
    msg = 'Error occoured';

    console.log(request);
    console.log(status);
    console.log(error);
}

function startingAjax() {

}
function ajaxCompleted() {

}

function ShowLoaderMG(DivID) {
    $2('#' + DivID + 'MGLW').addClass('MGLoader-Wrapper');
    $2('#' + DivID + 'MGLW div').addClass('MGLoader');
}
function HideLoaderMG(DivID) {

    $2('#' + DivID + 'MGLW').removeClass('MGLoader-Wrapper');
    $2('#' + DivID + 'MGLW div').removeClass('MGLoader');
}
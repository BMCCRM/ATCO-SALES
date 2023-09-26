var EmployeeId = "";
function pageLoad() {
    var cdt = new Date();
    var currentDate = cdt.getDate();
    var currentMonth = cdt.getMonth();
    currentMonth = currentMonth + 1;
    var currentYear = cdt.getFullYear();
    var currentUserRole;
    getLoggedZSM();

    $('#txtDaydate').val(currentMonth + '/' + currentDate + '/' + currentYear);

    $.ajax({
        type: "POST",
        url: "../form/CommonService.asmx/GetCurrentUserRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != "") {
                currentUserRole = data.d;
                if (currentUserRole == "rl5") {
                    getzsmdayview_date(currentDate);
                }
            }
        },
        cache: false
    });

}

function getzsmdayview_date(day) {
    $("#drlist").html('');
    $("#totaldr").html('');


    $.ajax({
        url: "ZSMDayView.asmx/GetZsmDayView",
        type: "POST",
        data: "{'day':'" + day + "','ddate':'" + $('#txtDaydate').val() + "','zsmEmployeeId':'" + EmployeeId + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != "") {
                var result1 = jsonParse(data.d);
                var ppp = 0;
                var drtable = "<table width='100%' cellspacing='0' cellpadding='0' border='0' class='formcss2'><thead><th>Med Rep</th><th>Doctor Name</th><th>Class</th><th>Speciality</th><th>Informed/Uninformed JV</th><th>Is Coaching</th><th>Planned/UnPlanned</th><th></th></thead><tbody>";
                $.each(result1, function(i, option) {
                    ppp += 1;
                    drtable += "<tr>";
                    drtable += "<td>" + option.EmployeeName + "</td>";
                    drtable += "<td>" + option.DoctorName + "</td>";
                    drtable += "<td>" + option.ClassName + "</td>";
                    drtable += "<td>" + option.Speciality + "</td>";
                    if (option.IsInformed == "True") {
                        drtable += "<td>" + "Informed" + "</td>";
                    } else if (option.IsInformed == "False") {
                        drtable += "<td>" + "Un Informed" + "</td>";
                    } else {
                        drtable += "<td>" + "" + "</td>";
                    }

                    if (option.IsCoaching == "True") {
                        drtable += "<td>" + "Yes" + "</td>";
                    } else if (option.IsCoaching == "False") {
                        drtable += "<td>" + "No" + "</td>";
                    } else {
                        drtable += "<td>" + "" + "</td>";
                    }

                    if (option.MIOPlanningId == "") {
                        drtable += "<td>" + "Un Planned Visit" + "</td>";
                    } else {
                        drtable += "<td>" + "Planned Visit" + "</td>";
                    }
                    drtable += "</tr>";

                });

                drtable += "</table>";
                $("#totaldr").text("Your visits for today: " + ppp);
                $("#drlist").prepend($(drtable));
            } else {
                $("#drlist").append("<span>No Visit Found</span>");
            }
        },
        cache: false,
        async: false
    });


}

function getLoggedZSM() {
    $.ajax({
        type: "POST",
        url: "../form/CommonService.asmx/GetCurrentUser",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            EmployeeId = data.d;
        },
        cache: false,
        async: false
    });
}

function onchange_daytextbox() {
    var dat = $('#txtDaydate ').val().split('/')[1];
    getzsmdayview_date(parseInt(dat));
}
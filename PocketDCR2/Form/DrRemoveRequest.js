// Global Variables
var EmployeeId = 0, DoctorId = 0, LevelId1 = 0, LevelId2 = 0, LevelId3 = 0, LevelId4 = 0, LevelId5 = 0, LevelId6 = 0, levelValue = 0, doctorLevel = 0, tempLevelId = 0,
    level1Value = 0, level2Value = 0, level3Value = 0, level4Value = 0, level5Value = 0, level6Value = 0, brickId = 0;
var CurrentUserLoginId = "", CurrentUserRole = "", glbVarLevelName = "", glbQualificationId = "", glbSpecialityId = "", glbClassId = "", glbProductId = "", MiddleName = "",
    Designation = "", Address1 = "", Address2 = "-", MobileNumber2 = "", CNICNum = "", LicenseNum = "", myData = "", value = "", name = "", levelName = "", modeValue = "", msg = "", mode = "";
var jsonObj = null;
var HierarchyLevel1 = null, HierarchyLevel2 = null, HierarchyLevel3 = null, HierarchyLevel4 = null, HierarchyLevel5 = null, HierarchyLevel6 = null;

var ids = [];
var docIds = [];
var empIds = [];
var checkedboxes;

var removeDocID = [];
var removeCheckedBoxes;

// Page Load Event
function pageLoad() {

    GetCurrentUser();
 

    if (CurrentUserRole == "rl6") {
        $('#showlistybtn').show();
        $('#ApproveAll').hide();
        $('#btnApproveAll').hide();
    } else {
        $('#showlistybtn').hide();
    }

    $('#btnApproveYes').click(btnApproveClicked);
    $('#btnApproveNo').click(btnApproveNoClicked);
    $('#btnApprovedOk').click(btnApprovedOkClicked);
    $old('#divApproveConfirmation').jqm({ modal: true });
    $old('#ApproveOkDivmessage').jqm({ modal: true });


 //   $('#btnAddListYes').click(btnAddListClicked);
    $('#btnAddListNo').click(btnAddListNoClicked);
    $('#btnAddListOk').click(btnAddListOkClicked);
    $old('#divAddtoListConfirmation').jqm({ modal: true });
    $old('#AddListOkDivmessage').jqm({ modal: true });



    $old('#divClassIdAndFrequency').jqm({ modal: true });


    $('#btnApproveAll').click(ApproveAll);
    $('#btnApproveAllYes').click(btnApproveAllYesClicked);
    $('#btnApproveAllNo').click(btnApproveAllNoClicked);
    $old('#divApproveAllConfirmation').jqm({ modal: true });
    //$('#btnApproveAll').click(ApproveAll);

    $('.close').click(resetAddToList);
    $('#removeListbtn').click(removeMutipleDocsList);
}

function startingAjax() {

    $('#UpdateProgress1').show();
}

function ajaxCompleted() {

    $('#UpdateProgress1').hide();
}


function FillGrid(empid) {

    if (empid != '-1') {
        var mydata = "{'empid':'" + empid + "'}";
        if (CurrentUserRole == 'rl6') {
            $.ajax({
                type: "POST",
                url: "DoctorsService.asmx/GetAllDataOfRemovalRequest",
                data: mydata,
                contentType: "application/json; charset=utf-8",
                success: Onsuccessfillgrid,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                error: onError,
                async: true,
                cache: false
            });

        }
        else {
            $.ajax({
                type: "POST",
                url: "DoctorsService.asmx/GetAllDataOfRemovalRequest",//GetAllDataWithoutNewRequest
                data: mydata,
                contentType: "application/json; charset=utf-8",
                success: Onsuccessfillgrid,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                error: onError,
                async: true,
                cache: false
            });
        }

        if (CurrentUserRole == 'rl6') {
        
            FillUnlistdocs(EmployeeId);
        }
    }
    else {
        $("#griddiv").empty();
        $("#griddiv").append("<table id='grid-basic' class='dataTables_info dataTables_filter' style='border: 1px solid #616262;'></table>");
        $("#grid-basic").append("<thead style='line-height: 0;'>" +
                        "<tr class='ob_gC'>" +
                        "<th data-column-id='Delete' style='width: 70px;'></th>" +

                                  " <tr class='ob_gC'> <th data-column-id='DocCode' style='width: 90.367px;'>Doctor Code</th>" +
                                   "<th data-column-id='Designation'> Title </th> " +
                                   "<th data-column-id='DoctorName' style='width: 200px;'>Doctor Name</th> " +
                                   "<th data-column-id='ClassName' >Class</th> " +
                                   "<th data-column-id='DoctorBrick' style='width: 300px;'>Brick</th> " +
                                   "<th data-column-id='City' style='width: 115.8px;'>City</th> " +
                                   "<th data-column-id='Addres1' style='width: 115.8px;'>Address</th> " +
                                   "<th data-column-id='Qualification' style='width: 115.8px;'>Qualification</th> " +
                                   "<th data-column-id='Speciality'> Speciality</th> " +
                                   "<th data-column-id='Region'>Region</th> " +
                          //"<th data-column-id='VerifiedByFlm' >Verified by AM</th>" +
                          //"<th data-column-id='VerifiedByRSM' >Verified by SM</th>" +
                          //"<th data-column-id='VerifiedByNSM' >Verified by RTL</th>" +
                          //"<th data-column-id='AprovedByAdmin' >Aproved by Admin</th>" +
                          //"<th data-column-id='Edit' style='display:none; ' ></th>" +

                            "</tr>" +
                          "</thead>" +
                      "<tbody id='values' style='line-height: 1; text-align: left;'>");
        $("#grid-basic").DataTable({
            columnDefs: [{ orderable: false, "targets": -1 }]
        });
    }
}
function Onsuccessfillgrid(response) {

    fildata(response.d);
}

function fildata(data) {

    $("#griddiv").empty();
    $("#griddiv").append("<table id='grid-basic' class='dataTables_info dataTables_filter' style='border: 1px solid #616262;'></table>");
    $("#grid-basic").empty();
    $("#grid-basic").append("<thead style='line-height: 0;'>" +
                        "<tr class='ob_gC'>" +
                        "<th data-column-id='Delete' style='width: 70px;'></th>" +
                        "<th> <th data-column-id='DocCode' style='width: 90.367px;'>Doctor Code</th>" +
                        "<th data-column-id='Designation'> Designation </th> " +
                        "<th data-column-id='DoctorName' style='width: 200px;'>Doctor Name</th> " +
                        "<th data-column-id='ClassName' >Class</th> " +
                        //"<th data-column-id='DoctorBrick' style='width: 300px;'>Brick</th> " +
                        "<th data-column-id='City' style='width: 115.8px;'>City</th> " +
                        "<th data-column-id='Addres1' style='width: 115.8px;'>Address</th> " +
                        "<th data-column-id='Qualification' style='width: 115.8px;'>Qualification</th> " +
                        "<th data-column-id='Speciality'> Speciality</th> " +
                        //"<th data-column-id='VerifiedByFlm' >Verified by AM</th>" +
                        //"<th data-column-id='VerifiedByRSM' >Verified by SM</th>" +
                        //"<th data-column-id='VerifiedByNSM' >Verified by RTL</th>" +
                        //"<th data-column-id='AprovedByAdmin' >Aproved by Admin</th>" +
                        //"<th data-column-id='Edit' style='display:none; ' ></th>" +

                        "</tr>" +
                      "</thead>" +
                      "<tbody id='values' style='line-height: 1; text-align: left;'>");

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

        if (CurrentUserRole == 'rl6') {

            $("#griddiv").empty();
            $("#griddiv").append("<table id='grid-basic' class='dataTables_info dataTables_filter' style='border: 1px solid #616262;'></table>");
            $("#grid-basic").empty();
            $("#grid-basic").append("<thead style='line-height: 0;'>" +
                                "<tr class='ob_gC'>" +
                                //"<th data-column-id='Delete' style='width: 70px;'></th>" +
                                "<th data-column-id='DocCode' style='width: 90.367px;'>Doctor Code</th>" +
                                    "<th data-column-id='Designation' style='width: 115.367px;'> Designation </th> " +
                                    "<th data-column-id='DoctorName' style='width: 200px;'>Doctor Name</th> " +
                                    "<th data-column-id='ClassName'  style='width: 70.367px;'>Class</th> " +
                                    //"<th data-column-id='DoctorBrick' style='width: 170px;'>Brick</th> " +
                                    "<th data-column-id='City' style='width: 115.8px;'>City</th> " +
                                    "<th data-column-id='Addres1' style='width: 200px;'>Address</th> " +
                                    "<th data-column-id='Qualification' style='width: 115.8px;'>Qualification</th> " +
                                    "<th data-column-id='Speciality' style='width: 115.8px;'> Speciality</th> " +
                                    "<th data-column-id='CreateDate' style='width: 115.8px;'> Create Date</th> " +
                                    "<th data-column-id='ReqStatus' style='width: 115.8px;'> Status</th> " +
                                  //"<th data-column-id='VerifiedByFlm' >Verified by AM</th>" +
                                  //"<th data-column-id='VerifiedByRSM' >Verified by SM</th>" +
                                  //"<th data-column-id='VerifiedByNSM' >Verified by RTL</th>" +
                                  //"<th data-column-id='AprovedByAdmin' >Aproved by Admin</th>" +
                                  //"<th data-column-id='Edit' style='display:none; ' ></th>" +
                                "</tr>" +
                              "</thead>" +
                              "<tbody id='values' style='line-height: 1; text-align: left;'>");
            if (msg.length > 0) {
                for (var i = 0; i < msg.length ; i++) {

                    $('#values').append("<tr>" +
                         //"<td><a onClick=\"oGrid_Delete('" + msg[i].DoctorId + "');\" href='#' >Remove</a></td>" +
                        "<td>" + msg[i].DocCode + "</td>" +
                        "<td>" + msg[i].Designation + "</td>" +
                        "<td>" + msg[i].DoctorName + "</td>" +
                        "<td>" + msg[i].ClassName + "</td>" +
                        //((msg[i].DoctorBrick.includes("@br")) ? ("<td>" + msg[i].DoctorBrick.split("@br").join('<br/><br/>') + "</td>") : "<td>" + msg[i].DoctorBrick + "</td>") +
                        "<td>" + msg[i].City + "</td>" +
                        "<td>" + msg[i].Address1 + "</td>" +
                        "<td>" + msg[i].Qualification + "</td>" +
                        "<td>" + msg[i].Speciality + "</td>" +
                        "<td>" + msg[i].CreateDate + "</td>" +
                        "<td>" + msg[i].ReqStatus + "</td>" +

                           //"<td>" + msg[i].VerifiedByFlm + "</td>" +
                           //"<td>" + msg[i].VerifiedByRSM + "</td>" +
                           //"<td>" + msg[i].VerifiedByNSM + "</td>" +
                           //"<td>" + msg[i].AprovedByAdmin + "</td>" +
                       //"<td><a onClick=\"oGrid_Edit('" + msg[i].DoctorId + "');\" href='#' style='display:none; ' >Edit</a></td>" +

                     //"<td><img src='../../assets/img/edit.png' style='cursor: pointer;' title='Edit Button' onclick='OneditClick(" + msg[i].ID + ")'></img>&nbsp;&nbsp;&nbsp;&nbsp; <img src='../../assets/img/delete.png' title='Delete Button' style='cursor: pointer;' onclick='OnDeleteClick(" + msg[i].ID + ")'></img> </td>" +
                    "</tr></tbody>");
                }
            }
            $("#grid-basic").dataTable({
                columnDefs: [{ orderable: false, "targets": -1 }]
            });

        } else if (CurrentUserRole == 'AM') {
            $("#griddiv").empty();
            $("#griddiv").append("<table id='grid-basic' class='dataTables_info dataTables_filter' style='border: 1px solid #616262;'></table>");
            $("#grid-basic").empty();
            $("#grid-basic").append("<thead style='line-height: 0;'>" +
                                "<tr class='ob_gC'>" +
                                //"<th data-column-id='Delete' style='width: 70px;'></th>" +
                               "<th data-column-id='DocCode' style='width: 90.367px;'>Doctor Code</th>" +
                                    "<th data-column-id='Designation' style='width: 115.367px;'> Designation </th> " +
                                    "<th data-column-id='DoctorName' style='width: 200px;'>Doctor Name</th> " +
                                    "<th data-column-id='ClassName'  style='width: 70.367px;'>Class</th> " +
                                    //"<th data-column-id='DoctorBrick' style='width: 200px;'>Brick</th> " +
                                    "<th data-column-id='City' style='width: 115.8px;'>City</th> " +
                                    "<th data-column-id='Addres1' style='width: 200px;'>Address</th> " +
                                    "<th data-column-id='Qualification' style='width: 115.8px;'>Qualification</th> " +
                                    "<th data-column-id='Speciality' style='width: 115.8px;'> Speciality</th> " +
                                  //"<th data-column-id='VerifiedByFlm' >Verified by AM</th>" +
                                  //"<th data-column-id='VerifiedByRSM' >Verified by SM</th>" +
                                  //"<th data-column-id='VerifiedByNSM' >Verified by RTL</th>" +
                                  //"<th data-column-id='AprovedByAdmin' >Aproved by Admin</th>" +
                                  //"<th data-column-id='Edit' style='display:none; ' ></th>" +
                                "</tr>" +
                              "</thead>" +
                              "<tbody id='values' style='line-height: 1; text-align: left;'>");
            var val = '';
            for (var i = 0; i < msg.length ; i++) {
                //if (msg[i].VerifiedByFlm == 'Verified' || msg[i].VerifiedByFlm == 'Rejected') {

                //}
                //else {
                val = "<tr>" +
                   "<td>" + msg[i].DocCode + "</td>" +
                    "<td>" + msg[i].Designation + "</td>" +
                    "<td>" + msg[i].DoctorName + "</td>" +
                    "<td>" + msg[i].ClassName + "</td>" +
                    //((msg[i].DoctorBrick.includes("@br")) ? ("<td>" + msg[i].DoctorBrick.split("@br").join('<br/><br/>') + "</td>") : "<td>" + msg[i].DoctorBrick + "</td>") +
                    "<td>" + msg[i].City + "</td>" +
                    "<td>" + msg[i].Address1 + "</td>" +
                    "<td>" + msg[i].Qualification + "</td>" +
                    "<td>" + msg[i].Speciality + "</td>";

                if (msg[i].VerifiedByFlm == 'Verified') {
                    val += "<td></td>" + "<td>Verified</td>" + "</tr></tbody>";
                }
                else if (msg[i].VerifiedByFlm == 'Rejected') {
                    val += "<td></td>" + "<td>Rejected</td>" + "</tr></tbody>";
                }
                else {
                    val += "<td><a onClick=\"oGrid_Verify('" + msg[i].DoctorId + "','" + CurrentUserRole + "'," + msg[i].EmployeeId + ");\" href='#' >Verify</a></td>" +
                        "<td><a onClick=\"oGrid_Rejected('" + msg[i].DoctorId + "','" + CurrentUserRole + "'," + msg[i].EmployeeId + ");\" href='#' >Reject</a></td>" +
                        "</tr></tbody>";
                }
                //}

                //"<td><img src='../../assets/img/edit.png' style='cursor: pointer;' title='Edit Button' onclick='OneditClick(" + msg[i].ID + ")'></img>&nbsp;&nbsp;&nbsp;&nbsp; <img src='../../assets/img/delete.png' title='Delete Button' style='cursor: pointer;' onclick='OnDeleteClick(" + msg[i].ID + ")'></img> </td>" +

                $('#values').append(val);
            }
            $("#grid-basic").DataTable({
                "order": [[10, "desc"]],
                columnDefs: [{ orderable: false, "targets": -1 }]
            });
        } else if (CurrentUserRole == 'SM') {
            $("#griddiv").empty();
            $("#griddiv").append("<table id='grid-basic' class='dataTables_info dataTables_filter' style='border: 1px solid #616262;'></table>");
            $("#grid-basic").empty();
            $("#grid-basic").append("<thead style='line-height: 0;'>" +
                                "<tr class='ob_gC'>" +
                                    "<th data-column-id='DocCode' style='width: 90.367px;'>Doctor Code</th>" +
                                    "<th data-column-id='Designation' style='width: 115.367px;'> Designation </th> " +
                                    "<th data-column-id='DoctorName' style='width: 200px;'>Doctor Name</th> " +
                                    "<th data-column-id='ClassName'  style='width: 70.367px;'>Class</th> " +
                                    //"<th data-column-id='DoctorBrick' style='width: 200px;'>Brick</th> " +
                                    "<th data-column-id='City' style='width: 115.8px;'>City</th> " +
                                    "<th data-column-id='Addres1' style='width: 200px;'>Address</th> " +
                                    "<th data-column-id='Qualification' style='width: 115.8px;'>Qualification</th> " +
                                    "<th data-column-id='Speciality' style='width: 115.8px;'> Speciality</th> " +
                                //"<th data-column-id='VerifiedByFlm' >Verified by AM</th>" +
                                //"<th data-column-id='VerifiedByRSM' >Verified by SM</th>" +
                                //"<th data-column-id='VerifiedByNSM' >Verified by RTL</th>" +
                                //"<th data-column-id='AprovedByAdmin' >Aproved by Admin</th>" +
                                  "<th data-column-id='Edit'></th>" +
                                  "<th data-column-id='Delete'></th>" +

                                "</tr>" +
                              "</thead>" +
                              "<tbody id='values' style='line-height: 1; text-align: left;'>");
            var val = '';
            for (var i = 0; i < msg.length ; i++) {
                val = "<tr>" +
                        "<td>" + msg[i].DocCode + "</td>" +
                        "<td>" + msg[i].Designation + "</td>" +
                        "<td>" + msg[i].DoctorName + "</td>" +
                        "<td>" + msg[i].ClassName + "</td>" +
                        //((msg[i].DoctorBrick.includes("@br")) ? ("<td>" + msg[i].DoctorBrick.split("@br").join('<br/><br/>') + "</td>") : "<td>" + msg[i].DoctorBrick + "</td>") +
                        "<td>" + msg[i].City + "</td>" +
                        "<td>" + msg[i].Address1 + "</td>" +
                        "<td>" + msg[i].Qualification + "</td>" +
                        "<td>" + msg[i].Speciality + "</td>";
                //"<td>" + msg[i].VerifiedByFlm + "</td>" +
                //"<td>" + msg[i].VerifiedByRSM + "</td>" +
                //"<td>" + msg[i].VerifiedByNSM + "</td>" +
                //"<td>" + msg[i].AprovedByAdmin + "</td>";

                //if ((msg[i].VerifiedByRSM == 'Verified' || msg[i].VerifiedByRSM == 'Rejected') || msg[i].VerifiedByFlm == 'Pending') {
                //    val += "<td>Verify</td>" + "<td>Reject</td>" + "</tr></tbody>";
                //}
                if (msg[i].VerifiedByRSM == 'Verified') {
                    val += "<td></td>" + "<td>Verified</td>" + "</tr></tbody>";
                }
                else if (msg[i].VerifiedByRSM == 'Rejected') {
                    val += "<td></td>" + "<td>Rejected</td>" + "</tr></tbody>";
                }
                else if (msg[i].VerifiedByFlm == 'Pending') {
                    val += "<td></td>" + "<td>Pending by AM</td>" + "</tr></tbody>";
                }
                else {
                    val += "<td><a onClick=\"oGrid_Verify('" + msg[i].DoctorId + "','" + CurrentUserRole + "'," + msg[i].EmployeeId + ");\" href='#' >Verify</a></td>" +
                        "<td><a onClick=\"oGrid_Rejected('" + msg[i].DoctorId + "','" + CurrentUserRole + "'," + msg[i].EmployeeId + ");\" href='#' >Reject</a></td>" +
                        "</tr></tbody>";
                }

                //"<td><img src='../../assets/img/edit.png' style='cursor: pointer;' title='Edit Button' onclick='OneditClick(" + msg[i].ID + ")'></img>&nbsp;&nbsp;&nbsp;&nbsp; <img src='../../assets/img/delete.png' title='Delete Button' style='cursor: pointer;' onclick='OnDeleteClick(" + msg[i].ID + ")'></img> </td>" +

                $('#values').append(val);
            }
            $("#grid-basic").DataTable({
                "order": [[10, "desc"]],
                columnDefs: [{ orderable: false, "targets": -1 }]
            });
        } else if (CurrentUserRole == 'RTL') {
            $("#griddiv").empty();
            $("#griddiv").append("<table id='grid-basic' class='dataTables_info dataTables_filter' style='border: 1px solid #616262;'></table>");
            $("#grid-basic").empty();
            $("#grid-basic").append("<thead style='line-height: 0;'>" +
                                "<tr class='ob_gC'>" +
                                    "<th data-column-id='DocCode' style='width: 90.367px;'>Doctor Code</th>" +
                                    "<th data-column-id='Designation' style='width: 115.367px;'> Designation </th> " +
                                    "<th data-column-id='DoctorName' style='width: 200px;'>Doctor Name</th> " +
                                    "<th data-column-id='ClassName'  style='width: 70.367px;'>Class</th> " +
                                    //"<th data-column-id='DoctorBrick' style='width: 200px;'>Brick</th> " +
                                    "<th data-column-id='City' style='width: 115.8px;'>City</th> " +
                                    "<th data-column-id='Addres1' style='width: 200px;'>Address</th> " +
                                    "<th data-column-id='Qualification' style='width: 115.8px;'>Qualification</th> " +
                                    "<th data-column-id='Speciality' style='width: 115.8px;'> Speciality</th> " +
                                  //"<th data-column-id='VerifiedByFlm' >Verified by AM</th>" +
                                  //"<th data-column-id='VerifiedByRSM' >Verified by SM</th>" +
                                  //"<th data-column-id='VerifiedByNSM' >Verified by RTL</th>" +
                                  //"<th data-column-id='AprovedByAdmin' >Aproved by Admin</th>" +
                                  //"<th data-column-id='Edit'></th>" +
                                  //"<th data-column-id='Delete'></th>" +

                                "</tr>" +
                              "</thead>" +
                              "<tbody id='values' style='line-height: 1; text-align: left;'>");
            var val = '';
            for (var i = 0; i < msg.length ; i++) {
                val = "<tr>" +
                        "<td>" + msg[i].DocCode + "</td>" +
                        "<td>" + msg[i].Designation + "</td>" +
                        "<td>" + msg[i].DoctorName + "</td>" +
                        "<td>" + msg[i].ClassName + "</td>" +
                        //((msg[i].DoctorBrick.includes("@br")) ? ("<td>" + msg[i].DoctorBrick.split("@br").join('<br/><br/>') + "</td>") : "<td>" + msg[i].DoctorBrick + "</td>") +
                        "<td>" + msg[i].City + "</td>" +
                        "<td>" + msg[i].Address1 + "</td>" +
                        "<td>" + msg[i].Qualification + "</td>" +
                        "<td>" + msg[i].Speciality + "</td>" +
                   //"<td>" + msg[i].VerifiedByFlm + "</td>" +
                   //"<td>" + msg[i].VerifiedByRSM + "</td>" +
                   //"<td>" + msg[i].VerifiedByNSM + "</td>" +
                   //"<td>" + msg[i].AprovedByAdmin + "</td>";

                //if ((msg[i].VerifiedByNSM == 'Verified' || msg[i].VerifiedByNSM == 'Rejected') || msg[i].VerifiedByRSM == 'Pending' || msg[i].VerifiedByFlm == 'Pending') {
                //    val += "<td>Verify</td>" + "<td>Reject</td>" + "</tr></tbody>";
                //}
                //else {
                //    val += "<td><a onClick=\"oGrid_Verify('" + msg[i].DoctorId + "','" + CurrentUserRole + "','');\" href='#' >Verify</a></td>" +
                //        "<td><a onClick=\"oGrid_Rejected('" + msg[i].DoctorId + "','" + CurrentUserRole + "','');\" href='#' >Reject</a></td>" +
                //        "</tr></tbody>";
                //}

                //"<td><img src='../../assets/img/edit.png' style='cursor: pointer;' title='Edit Button' onclick='OneditClick(" + msg[i].ID + ")'></img>&nbsp;&nbsp;&nbsp;&nbsp; <img src='../../assets/img/delete.png' title='Delete Button' style='cursor: pointer;' onclick='OnDeleteClick(" + msg[i].ID + ")'></img> </td>" +

                $('#values').append(val);
            }
            $("#grid-basic").DataTable({
                columnDefs: [{ orderable: false, "targets": -1 }]
            });

        } else if (CurrentUserRole == 'Admin' || CurrentUserRole == 'admin') {
            debugger
            $("#griddiv").empty();
            $("#griddiv").append("<table id='grid-basic' class='dataTables_info dataTables_filter' style='border: 1px solid #616262;'></table>");
            $("#grid-basic").empty();
            $("#grid-basic").append("<thead style='line-height: 0;'>" +
                                "<tr class='ob_gC'>" +
                                    "<th data-column-id='DocCode' style='width: 110px;'>Doctor Code</th>" +
                                    "<th data-column-id='Designation' style='width: 115.367px;'> Designation </th> " +
                                    "<th data-column-id='DoctorName' style='width: 200px;'>Doctor Name</th> " +
                                    "<th data-column-id='EmployeeName' style='width: 200px;'>Employee Name</th> " +
                                    "<th data-column-id='ClassName'  style='width: 70.367px;'>Class</th> " +
                                    //"<th data-column-id='DoctorBrick' style='width: 200px;'>Brick</th> " +
                                    "<th data-column-id='City' style='width: 115.8px;'>City</th> " +
                                    "<th data-column-id='Addres1' style='width: 200px;'>Address</th> " +
                                    "<th data-column-id='Qualification' style='width: 115.8px;'>Qualification</th> " +
                                    "<th data-column-id='Speciality' style='width: 115.8px;'> Speciality</th> " +
                                    "<th data-column-id='CreateDate' style='width: 115.8px;'> Create Date</th> " +
                                    "<th data-column-id='Remove' style='width: 115.8px;'>Remove <input style='vertical-align: middle;margin-top: 0px;' type='checkbox' name='ApproveAll' onClick=\"SelectAllApproveCheckBoxes();\"></th> " +
                                  //"<th data-column-id='VerifiedByFlm' >Verified by AM</th>" +
                                  //"<th data-column-id='VerifiedByRSM' >Verified by SM</th>" +
                                  //"<th data-column-id='VerifiedByNSM' >Verified by RTL</th>" +
                                  //"<th data-column-id='AprovedByAdmin' >Aproved by Admin</th>" +
                                  //"<th data-column-id='Edit'></th>" +
                                  //"<th data-column-id='Delete'></th>" +

                                "</tr>" +
                              "</thead>" +
                              "<tbody id='values' style='line-height: 1; text-align: left;'>");
            var val = '';
            if (msg.length > 0) {
                $('#btnApproveAll').show();
                for (var i = 0; i < msg.length ; i++) {
                    val = "<tr>" +
                     "<td>" + msg[i].DocCode + "</td>" +
                      "<td>" + msg[i].Designation + "</td>" +
                      "<td>" + msg[i].DoctorName + "</td>" +
                      "<td>" + msg[i].EmployeeName + "</td>" +
                      "<td>" + msg[i].ClassName + "</td>" +
                      //((msg[i].DoctorBrick.includes("@br")) ? ("<td>" + msg[i].DoctorBrick.split("@br").join('<br/><br/>') + "</td>") : "<td>" + msg[i].DoctorBrick + "</td>") +
                      "<td>" + msg[i].City + "</td>" +
                      "<td>" + msg[i].Address1 + "</td>" +
                       "<td>" + msg[i].Qualification + "</td>" +
                       "<td>" + msg[i].Speciality + "</td>" +
                       "<td>" + msg[i].CreateDate + "</td>" +
                       "<td><a onClick=\"oGrid_ApproveThis('" + msg[i].id + "','" + msg[i].DoctorId + "');\" href='javascript:;' style='vertical-align: text-top;' >Remove</a><input type='checkbox' name='checkboxes' class='approveCheckBox' data-empid='" + msg[i].EmployeeId + "' data-docid='" + msg[i].DoctorId + "' value='" + msg[i].id + "'></td>" +
                       "</tr></tbody>"
                    //"<td>" + msg[i].VerifiedByFlm + "</td>" +
                    //"<td>" + msg[i].VerifiedByRSM + "</td>" +
                    //"<td>" + msg[i].VerifiedByNSM + "</td>" +
                    //"<td>" + msg[i].AprovedByAdmin + "</td>";

                    //if (msg[i].AprovedByAdmin == 'Aproved' || msg[i].AprovedByAdmin == 'Rejected' || msg[i].VerifiedByNSM == 'Pending' || msg[i].VerifiedByNSM == 'Rejected' || msg[i].VerifiedByRSM == 'Pending' || msg[i].VerifiedByRSM == 'Rejected' || msg[i].VerifiedByFlm == 'Pending' || msg[i].VerifiedByFlm == 'Rejected') {
                    //    val += "<td>Verify</td>" + "<td>Reject</td>" + "</tr></tbody>";
                    //}
                    //else {
                    //    val += "<td><a onClick=\"oGrid_Verify('" + msg[i].DoctorId + "','" + CurrentUserRole + "','" + msg[i].MIOID + "');\" href='#' >Aprove</a></td>" +
                    //            "<td><a onClick=\"oGrid_Rejected('" + msg[i].DoctorId + "','" + CurrentUserRole + "','" + msg[i].MIOID + "');\" href='#' >Reject</a></td>" +
                    //            "</tr></tbody>";
                    //}
                    $('#values').append(val);
                }
            }

            $("#grid-basic").DataTable({
                columnDefs: [{ orderable: false, "targets": -1 }]
            });
        }
        else {
            $("#griddiv").empty();
            $("#griddiv").append("<table id='grid-basic' class='dataTables_info dataTables_filter' style='border: 1px solid #616262;'></table>");
            $("#grid-basic").empty();
            $("#grid-basic").append("<thead style='background-color:#0099da none repeat scroll 0 0'>" +
                                "<tr>" +
                                    "<th> <th data-column-id='DocCode' style='width: 90.367px;'>Doctor Code</th>" +
                                    "<th data-column-id='Designation' style='width: 115.367px;'> Designation </th> " +
                                    "<th data-column-id='DoctorName' style='width: 200px;'>Doctor Name</th> " +
                                    "<th data-column-id='ClassName'  style='width: 70.367px;'>Class</th> " +
                                    //"<th data-column-id='DoctorBrick' style='width: 200px;'>Brick</th> " +
                                    "<th data-column-id='City' style='width: 115.8px;'>City</th> " +
                                    "<th data-column-id='Addres1' style='width: 115.8px;'>Address</th> " +
                                    "<th data-column-id='Qualification' style='width: 115.8px;'>Qualification</th> " +
                                    "<th data-column-id='Speciality' style='width: 115.8px;'> Speciality</th> " +
                                    "<th data-column-id='Region'  style='width: 115.8px;'>Region</th> " +
                                  //"<th data-column-id='VerifiedByFlm'>VerifiedByFlm</th>" +
                                  //"<th data-column-id='VerifiedByRSM'>VerifiedByRSM</th>" +
                                  //"<th data-column-id='VerifiedByNSM'>VerifiedByNSM</th>" +
                                  //"<th data-column-id='AprovedByAdmin'>AprovedByAdmin</th>" +
                                "</tr>" +
                              "</thead>" +
                              "<tbody id='values'>");
            var val = '';
            for (var i = 0; i < msg.length ; i++) {
                val = "<tr>" +
                        "<td>" + msg[i].DocCode + "</td>" +
                  "<td>" + msg[i].Designation + "</td>" +
                  "<td>" + msg[i].DoctorName + "</td>" +
                  "<td>" + msg[i].CNIC + "</td>" +
                  //((msg[i].DoctorBrick.includes("@br")) ? ("<td>" + msg[i].DoctorBrick.split("@br").join('<br/><br/>') + "</td>") : "<td>" + msg[i].DoctorBrick + "</td>") +
                  "<td>" + msg[i].City + "</td>" +
                  "<td>" + msg[i].Address1 + "</td>" +
                //  "<td>" + msg[i].Address2 + "</td>" +
                   "<td>" + msg[i].Speciality + "</td>" +
                   "<td>" + msg[i].Qualification + "</td>" +
                   "<td>" + msg[i].MobileNumber1 + "</td>" +
                   //"<td>" + msg[i].VerifiedByFlm + "</td>" +
                   //"<td>" + msg[i].VerifiedByRSM + "</td>" +
                   //"<td>" + msg[i].VerifiedByNSM + "</td>" +
                   //"<td>" + msg[i].AprovedByAdmin + "</td>";
                $('#values').append(val);
            }
            $("#grid-basic").DataTable({
                columnDefs: [{ orderable: false, "targets": -1 }]
            });
        }
    }
    else {

        $("#griddiv").empty();
        $("#griddiv").append("<table id='grid-basic' class='dataTables_info dataTables_filter' style='border: 1px solid #616262;'></table>");
        $("#grid-basic").append("<thead style='line-height: 0;'>" +
                        "<tr class='ob_gC'>" +
                        "<th data-column-id='Delete' style='width: 70px;'></th>" +
                                 "<th data-column-id='DocCode' style='width: 100px;' >Doctor Code </th>" +
                                 "<th data-column-id='Designation' >Title</th>" +
                                  "<th data-column-id='DoctorName' style='width: 150px;'>Doctor Name </th>" +
                                  "<th data-column-id='CNIC' >CNIC</th>" +
                                  "<th data-column-id='Brick' style='width: 300px;'>Brick</th>" +
                                  "<th data-column-id='City' style='width: 120px;'>City</th>" +
                                  "<th data-column-id='Address'  style='width: 250px;'>Address</th>" +
                                  "<th data-column-id='Address 2'  style='width: 250px;'>Address</th>" +
                                  "<th data-column-id='Speciality' >Speciality</th>" +
                                  "<th data-column-id='Qualification' >Qualification</th>" +
                                  "<th data-column-id='Contact' >Contact #</th>" +
                          //"<th data-column-id='VerifiedByFlm' >Verified by AM</th>" +
                          //"<th data-column-id='VerifiedByRSM' >Verified by SM</th>" +
                          //"<th data-column-id='VerifiedByNSM' >Verified by RTL</th>" +
                          //"<th data-column-id='AprovedByAdmin' >Aproved by Admin</th>" +
                          //"<th data-column-id='Edit' style='display:none; ' ></th>" +

                        "</tr>" +
                      "</thead>" +
                      "<tbody id='values' style='line-height: 1; text-align: left;'>");
        $("#grid-basic").DataTable({
            columnDefs: [{ orderable: false, "targets": -1 }]
        });
    }
}

function GetEmployeesLevel6() {
    //var TeamID = $("#ddlT").val();

    $.ajax({
        type: "POST",
        url: "../Reports/NewDashboard.asmx/FillEmployeesLevel6",
        contentType: "application/json; charset=utf-8",
        data: "{'TeamID':'" + -1 + "'}",
        success: onSuccessGetEmployeesLevel6,
        error: onError,
        cache: false,
        asyn: false
    });
}
function onSuccessGetEmployeesLevel6(data, status) {
    document.getElementById('ddl3p').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select Employee...';
        $("#ddl3p").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl3p").append("<option value='" + jsonObj[i].EmployeeId + "'>" + jsonObj[i].EmployeeName + "</option>");
        });
    }
}
function OnChangeddlp6() {

    var empid = $("#ddl3p").val();
    FillGrid(empid);

}



function SelectAllApproveCheckBoxes() {

    if ($('input[name="ApproveAll"]').is(':checked')) {
        $('.approveCheckBox').prop('checked', true);
    } else {
        $('.approveCheckBox').prop('checked', false);
    }

}

function ApproveAll() {

    checkedboxes = document.querySelectorAll('input[name=checkboxes]:checked');

    debugger
    if (checkedboxes.length > 0) {
        for (var i = 0; i < checkedboxes.length; i++) {
            debugger
            ids.push(checkedboxes[i].value);
            docIds.push(checkedboxes[i].attributes['data-docId'].value);
            empIds.push(checkedboxes[i].attributes['data-empid'].value);
            $old('#divApproveAllConfirmation').jqmShow();
        }
    }
    else {
        alert("You must select atleast one option!");
    }
}

function btnApproveAllYesClicked() {

    var mydata = "{'id':'" + ids.toString() + "','docid':'" + docIds.toString() + "','empid':'" + empIds.toString() + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/RemoveThis",
        data: mydata,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            debugger
            FillGrid(1);
            $old('#divApproveAllConfirmation').jqmHide();
            $old('#ApproveOkDivmessage').jqmShow();
            $('#ApproveOkDivmessage').find('#hlabmsg').text("All Removal Requests has been approved");
        },
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: onError,
        async: false,
        cache: false
    });
}

function btnApproveAllNoClicked() {
    $old('#divApproveAllConfirmation').jqmHide();
}


function oGrid_ApproveThis(id, docid) {
    $old('#divApproveConfirmation').jqmShow();
    $('#divApproveConfirmation').find('#btnApproveYes').attr({ '_id': id, '_docid': docid });
}


function btnApproveClicked() {

    var pkid = $(this).attr('_id');
    var docid = $(this).attr('_docid');

    var mydata = "{'id':'" + pkid + "','docid':'" + docid + "','empid':'" + EmployeeId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/RemoveThis",
        data: mydata,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            
            FillGrid(1);
            $old('#divApproveConfirmation').jqmHide();
            $old('#ApproveOkDivmessage').jqmShow();
            $('#ApproveOkDivmessage').find('#hlabmsg').text("Request has been approved!");
        },
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        error: onError,
        async: false,
        cache: false
    });

}

function btnApprovedOkClicked() {
    $old('#ApproveOkDivmessage').jqmHide();
}

function btnApproveNoClicked() {
    $old('#divApproveConfirmation').jqmHide();
}


function oGrid_AddToList(docid) {

    $old('#divAddtoListConfirmation').jqmShow();

    $('#divAddtoListConfirmation').find('#btnApproveAllYes').attr('_docid', docid);
}


function btnAddListOkClicked() {
    $old('#AddListOkDivmessage').jqmHide();
}

function btnAddListNoClicked() {
    $old('#AddListOkDivmessage').jqmHide();
}



function FillUnlistdocs(empid) {

    var mydata = "{'empid':'" + empid + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetAllDCRDoctor",
        data: mydata,
        contentType: "application/json; charset=utf-8",
        success: OnsuccessfillgridUnlistDocs,
        error: onError,
        async: true,
        cache: false
    });
}

function OnsuccessfillgridUnlistDocs(data) {

    if (data != "") {
        $('#inlistdivgrid').empty();
        $('#inlistdivgrid').append(" <table id='grid-unlistdocs' class='dataTables_info dataTables_filter' style='border: 1px solid #616262;'><thead  style='line-height: 0;' >" +
                                   " <tr class='ob_gC'> " +
                                   //"<th data-column-id='DocCode' style='width: 80.367px;'>Doctor Code</th>" +
                                   "<th data-column-id='SelectAll' style='width: 105px;'>Select Multiple<input</th> " +
                                   "<th data-column-id='Designation' style='width: 60px;'> Title </th> " +
                                   "<th data-column-id='DoctorCode' style='width: 90px;'>Doctor Code</th> " +
                                   "<th data-column-id='DoctorName' style='width: 150px;'>Doctor Name</th> " +
                                   "<th data-column-id='ClassName' >Class</th> " +
                                   //"<th data-column-id='DoctorBrick' style='width: 180px;'>Brick</th> " +
                                   "<th data-column-id='City' style='width: 115.8px;'>City</th> " +
                                   "<th data-column-id='Addres1' style='width: 150px;'>Address</th> " +
                                   "<th data-column-id='Qualification' style='width: 110px;'>Qualification</th> " +
                                   "<th data-column-id='Speciality' style='width: 90px;'> Speciality</th> " +
                                   //"<th data-column-id='ReqStatus'>Status</th> " +
                                   "<th style='width: 90px;'>Action</th></tr></thead>" +
                                "<tbody id='unlistrecord' style='line-height: 1; text-align: left;'>");

        var msg = $.parseJSON(data.d);
        var data = [];
        if (msg.length > 0) {
            for (var i = 0; i < msg.length ; i++) {

                data.push([
                    //msg[i].DocCode,
                    msg[i].ReqStatus == "InList" ? "Select <input type='checkbox' name='removeCheckBox' style = 'vertical-align: middle;margin-top: 0px;' value='" + msg[i].DoctorId + "' onClick=\"showRemoveListButton();\"  />" : msg[i].ReqStatus, msg[i].Designation, msg[i].DoctorCode, msg[i].DoctorName, msg[i].ClassName,
                    //((msg[i].DoctorBrick.includes("@br")) ? (msg[i].DoctorBrick.split("@br").join('<br/><br/>')) : msg[i].DoctorBrick),
                    msg[i].City, msg[i].Address1,
                    msg[i].Qualification,
                    msg[i].Speciality,
                    (msg[i].ReqStatus == "InList" ? "<a onClick=\"oGrid_RemoveToList('" + msg[i].DoctorId + "');\" href='#' >Remove-To-List</a>" : msg[i].ReqStatus),
                ]);
            }

            $('#grid-unlistdocs').DataTable({
                data: data,
                deferRender: true,
                "bProcessing": true,
                "bDeferRender": true,
                columnDefs: [{ orderable: false, "targets": 0 }]
            });
        }

    }
}

function removeMutipleDocsList() {

    removeCheckedBoxes = document.querySelectorAll('input[name=removeCheckBox]:checked');

    if (removeCheckedBoxes.length > 0) {
        for (var i = 0; i < removeCheckedBoxes.length; i++) {

            removeDocID.push(removeCheckedBoxes[i].value);

        }
        removeMultipleToList();
    }
    else {
        $("<div><p style='text-align: center;margin: 35px;font-size: 15px;'>Please select atleast one option.</p></div>").dialog({
            modal: true,
            resizable: false,
            title: 'Info',
            buttons: {
                'Ok': function () {
                    $(this).dialog('close');
                }
            }
        });
    }
}

function removeMultipleToList() {
    //var myData = "{'Docid':'" + DoctorId + "','EmployeeId':'" + EmployeeId + "'}";

    if (removeDocID.length != 0 && EmployeeId != 0) {
        $('#hdnMode').val("R");
        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/removeMultipleDocs",
            data: JSON.stringify({
                Docids: removeDocID.toString(),
                EmployeeId: EmployeeId.toString()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //success: onSuccess,
            success: function (data) {

                if (data.d == "Call(s) exist in this month.") {
                    $old('#divAddtoListConfirmation').jqmHide();
                    $old('#AddListOkDivmessage').jqmShow();
                    $('#AddListOkDivmessage').find('#hlabmsg').text("Call(s) exist in this month.");
                    resetAddToList();
                }
                else {
                    $old('#divAddtoListConfirmation').jqmHide();
                    $old('#AddListOkDivmessage').jqmShow();
                    $('#AddListOkDivmessage').find('#hlabmsg').text("Your request has been sent for approval!");
                    resetAddToList();

                }
                FillGrid(EmployeeId);
                FillUnlistdocs(EmployeeId);
            },
            error: onError,
            cache: false
        });
    }
}

function showRemoveListButton() {

    if ($('input[name="removeCheckBox"]').is(':checked')) {
        $('#removeListbtn').css('display', 'block');
    } else {
        $('#removeListbtn').css('display', 'none');
    }

}

function resetAddToList() {
    $('input[name="removeCheckBox"]').prop('checked', false);
    $('#removeListbtn').css('display', 'none');
    removeDocID = [];
}


function oGrid_RemoveToList(DoctorId)
{
    var myData = "{'Docid':'" + DoctorId + "','EmployeeId':'" + EmployeeId + "'}";

    if (myData != "") {
        $('#hdnMode').val("R");
        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/RemoveDocRequest",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //success: onSuccess,
            success: function (data) {

                if (data.d == "Call(s) exist in this month.") {
                    $old('#divAddtoListConfirmation').jqmHide();
                    $old('#AddListOkDivmessage').jqmShow();
                    $('#AddListOkDivmessage').find('#hlabmsg').text("Call(s) exist in this month.");
                }
                else {
                    $old('#divAddtoListConfirmation').jqmHide();
                    $old('#AddListOkDivmessage').jqmShow();
                    $('#AddListOkDivmessage').find('#hlabmsg').text("Your request has been sent for approval!");
                }
                FillGrid(EmployeeId);
                FillUnlistdocs(EmployeeId);
            },
            error: onError,
            cache: false
        });
    }

}

function oGrid_Rejected(DoctorId, userrole) {

    var text = prompt("Fill Comments", "");

    if (text != null) {

        var myData = "{'docid':'" + DoctorId + "','userrole':'" + userrole + "','comment':'" + text + "','status':'2'}";

        if (myData != "") {
            $('#hdnMode').val("R");
            $.ajax({
                type: "POST",
                url: "DoctorsService.asmx/VerifyDoctor",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccess,
                error: onError,
                cache: false
            });
        }
    }

}


// Hierarchical Components
function ShowHierarchy() {

    $('#col1').show();
    $('#col2').show();
    $('#col3').show();
    $('#col4').show();
    $('#col5').show();
    $('#col6').show();
}
function HideHierarchy() {

    $('#col1').hide();
    $('#col2').hide();
    $('#col3').hide();
    $('#col4').hide();
    $('#col5').hide();
    $('#col6').hide();
    $('#rowExistingQualification').hide();
    $('#rowExistingSpeciality').hide();
    $('#rowExistingProduct').hide();
}

// DropDownLists
function RetrieveAppConfig() {

    $.ajax({
        type: "POST",
        url: "AppConfiguration.asmx/GetHierarchyLevels",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetLevels,
        error: onError,
        cache: false
    });
}
function onSuccessGetLevels(data, status) {

    if (data.d != "") {
        var jsonObj = null;
        jsonObj = jsonParse(data.d);
        glbVarLevelName = jsonObj[5].SettingName;

        if (glbVarLevelName == "Level6") {

            HierarchyLevel3 = jsonObj[0].SettingValue;
            HierarchyLevel4 = jsonObj[1].SettingValue;
            HierarchyLevel5 = jsonObj[2].SettingValue;
            HierarchyLevel6 = jsonObj[3].SettingValue;
        }

        EnableHierarchyViaLevel();
    }
}
function EnableHierarchyViaLevel() {

    if (glbVarLevelName == "Level1") {

        //ShowHierarchy();
        $('#outerboxid').hide();
    }
    if (glbVarLevelName == "Level2") {
        //  $('#outerboxid').hide();
    }
    if (glbVarLevelName == "Level3") {
        //  $('#outerboxid').hide();
    }
    if (glbVarLevelName == "Level4") {
        //  $('#outerboxid').hide();
    }
    if (glbVarLevelName == "Level5") {
        // $('#outerboxid').hide();
    }
    if (glbVarLevelName == "Level6") {
        // $('#outerboxid').show();
    }
}
function FillDropDownList() {

    myData = "{'levelName':'" + glbVarLevelName + "'}";

    $.ajax({
        type: "POST",
        url: "DivisionalHierarchy.asmx/FillDropDownList",
        contentType: "application/json; charset=utf-8",
        data: myData,
        dataType: "json",
        success: onSuccessFillDropDownList,
        error: onError,
        cache: false
    });
}
function onSuccessFillDropDownList(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        value = '-1';
        name = 'Select ' + HierarchyLevel3;
        $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl1").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        });

        DefaultDropDownListValue();
    }
}
function DefaultDropDownListValue() {

    if (glbVarLevelName == "Level1") {

        //  $('#outerboxid').hide();
    }
    if (glbVarLevelName == "Level2") {

        //  $('#outerboxid').hide();
    }
    if (glbVarLevelName == "Level3") {

        //  $('#outerboxid').hide();
    }
    if (glbVarLevelName == "Level4") {
        //  $('#outerboxid').hide();

    }
    if (glbVarLevelName == "Level5") {
        // $('#outerboxid').hide();

    }
    if (glbVarLevelName == "Level6") {
        // $('#outerboxid').show();
    }
}

// OnChange DropDownList
function OnChangeddl1() {

    levelValue = $('#ddl1').val();
    myData = "";

    if (levelValue != -1) {

        if (glbVarLevelName == "Level1") {

            myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbVarLevelName + "'}";

            $.ajax({
                type: "POST",
                url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl2,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        if (glbVarLevelName == "Level2") {

            myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbVarLevelName + "'}";

            $.ajax({
                type: "POST",
                url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl2,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        if (glbVarLevelName == "Level3") {

            myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbVarLevelName + "'}";

            $.ajax({
                type: "POST",
                url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl2,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        if (glbVarLevelName == "Level4") {

            myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbVarLevelName + "'}";

            $.ajax({
                type: "POST",
                url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl2,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        if (glbVarLevelName == "Level5") {

            myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbVarLevelName + "'}";

            $.ajax({
                type: "POST",
                url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillddl2,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
    }
}
function onSuccessFillddl2(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        value = '-1';
        name = 'Select ' + HierarchyLevel4;
        $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl2").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        });
    }
}
function OnChangedddl2() {

    myData = "";
    levelName = "";

    if (glbVarLevelName == "Level1") {

        levelName = "Level2";
        myData = "{'parentLevelId':'" + $('#ddl2').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl3,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    if (glbVarLevelName == "Level2") {

        levelName = "Level3";
        myData = "{'parentLevelId':'" + $('#ddl2').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl3,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    if (glbVarLevelName == "Level3") {

        levelName = "Level4";
        myData = "{'parentLevelId':'" + $('#ddl2').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl3,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    if (glbVarLevelName == "Level4") {

        levelName = "Level5";
        myData = "{'parentLevelId':'" + $('#ddl2').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl3,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
}
function onSuccessFillddl3(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        value = '-1';
        name = 'Select ' + HierarchyLevel5;
        $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl3").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        });
    }
}
function OnChangedddl3() {

    myData = "";
    levelName = "";

    if (glbVarLevelName == "Level1") {

        levelName = "Level3";
        myData = "{'parentLevelId':'" + $('#ddl3').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl4,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    if (glbVarLevelName == "Level2") {

        levelName = "Level4";
        myData = "{'parentLevelId':'" + $('#ddl3').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl4,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    if (glbVarLevelName == "Level3") {

        levelName = "Level5";
        myData = "{'parentLevelId':'" + $('#ddl3').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl4,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
}
function onSuccessFillddl4(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        value = '-1';
        name = 'Select ' + HierarchyLevel6;
        $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl4").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        });
    }
}
function OnChangedddl4() {

    myData = "";
    levelName = "";

    if (glbVarLevelName == "Level1") {

        levelName = "Level4";
        myData = "{'parentLevelId':'" + $('#ddl4').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl5,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
    if (glbVarLevelName == "Level2") {

        levelName = "Level5";
        myData = "{'parentLevelId':'" + $('#ddl4').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl5,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
}
function onSuccessFillddl5(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";

        value = '-1';
        name = 'Select...';
        $("#ddl5").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl5").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        });
    }
}
function OnChangedddl5() {

    myData = "";
    levelName = "";

    if (glbVarLevelName == "Level1") {

        levelName = "Level5";
        myData = "{'parentLevelId':'" + $('#ddl5').val() + "','levelName':'" + levelName + "'}";

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSuccessFillddl6,
            error: onError,
            beforeSend: startingAjax,
            complete: ajaxCompleted,
            cache: false
        });
    }
}
function onSuccessFillddl6(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        document.getElementById('ddl6').innerHTML = "";

        value = '-1';
        name = 'Select...';
        $("#ddl6").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddl6").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        });
    }
}

// OnPage Load Multiple Selection DropdownList
function GetQualiification() {

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetQualification",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddlQualification,
        error: onError,
        cache: false
    });
}
function FillddlQualification(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, tweet) {
            $("#ddlQualifications").append("<option value='" + jsonObj[i].QulificationId + "'>" + jsonObj[i].QualificationName + "</option>");
        });
    }
}
function GetSpecialiity() {

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetSpeciality",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddlSpeciality,
        error: onError,
        cache: false
    });
}
function FillddlSpeciality(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, tweet) {
            $("#ddlSpecialities").append("<option value='" + jsonObj[i].SpecialityId + "'>" + jsonObj[i].SpecialiityName + "</option>");
        });
    }
}
function GetClass() {
    debugger
    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetClass",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddlClass,
        error: onError,
        cache: false
    });
}
function FillddlClass(data, status) {
    debugger
    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, tweet) {
            $("#ddlClass").append("<option value='" + jsonObj[i].ClassId + "'>" + jsonObj[i].ClassName + "</option>");
        });
    }
}
function GetProduct() {

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetProduct",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FillddlProduct,
        error: onError,
        cache: false,
        async: false
    });
}
function FillddlProduct(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        $.each(jsonObj, function (i, tweet) {
            $("#ddlProduct").append("<option value='" + jsonObj[i].ProductId + "'>" + jsonObj[i].ProductName + "</option>");
        });
    }
}

// Membership Authorization
function GetCurrentUser() {

    $.ajax({
        type: "POST",
        url: "CommonService.asmx/GetCurrentUser",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUser,
        error: onError,
        cache: false,
        async: false
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
        url: "CommonService.asmx/GetCurrentUserLoginID",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUserLoginID,
        error: onError,
        cache: false,
        async: false
    });
}
function onSuccessGetCurrentUserLoginID(data, status) {

    if (data.d != "") {

        CurrentUserLoginId = data.d;
    }

    GetCurrentUserRole(EmployeeId);
}
function GetCurrentUserRole(Empid) {

    $.ajax({
        type: "POST",
        url: "CommonService.asmx/GetCurrentUserRole",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetCurrentUserRole,
        error: onError,
        cache: false,
        async: false
    });
}
function onSuccessGetCurrentUserRole(data, status) {

    if (data.d != "") {
        //jsonObj = jsonParse(data.d);
        CurrentUserRole = data.d;
        //if (CurrentUserRole == 'rl1') {
        //    $('#outerboxid').hide();
        //} else
        //    if (CurrentUserRole == 'rl2') {
        //        $('#outerboxid').hide();
        //    } else
        //        if (CurrentUserRole == 'rl3') {
        //            $('#outerboxid').hide();
        //        } else
        //            if (CurrentUserRole == 'rl4') {
        //                $('#outerboxid').hide();
        //            } else
        //                if (CurrentUserRole == 'rl5') {
        //                    $('#outerboxid').hide();
        //                    $('#colEdit').hide();
        //                } else
        //                    if (CurrentUserRole == 'rl6') {
        //                        $('#outerboxid').show();
        //                    } else
        //                        if (CurrentUserRole == 'admin') {
        //                            $('#outerboxid').hide();
        //                        }


        modeValue = $('#hdnMode').val();

        if (modeValue == 'EditMode') {

            LoadForEditData();
        }
        else if (modeValue == 'DeleteMode') {

            LoadForDeleteData();
        }
    }

    if (CurrentUserRole == 'rl6' || CurrentUserRole == 'admin') {
        $('#EmployeeDropDown').hide();
        FillGrid(EmployeeId);
    }
    else {
        $('#EmployeeDropDown').show();
        GetEmployeesLevel6()
    }
}


function oGrid_Verifyinsert() {
    var text = prompt("Fill Comments", "");

    if (text != null) {

    }
}

// LoadForEdit function bind onClick event from GridView1_RowDataBound method
function oGrid_Edit(sender) {
    $('#hdnMode').val("EditMode");
    glbVarDoctorId = sender;
    GetCurrentUser();
}
function LoadForEditData() {

    if (CurrentUserRole == 'rl6') {

        $('#rowExistingQualification').show();
        $('#rowExistingSpeciality').show();
        $('#rowExistingProduct').show();
        LoadingEditData();
    }
    else {

        msg = 'Access Denied!';

        $.fn.jQueryMsg({
            msg: msg,
            msgClass: 'error',
            fx: 'slide',
            speed: 200
        });
    }
}
function LoadingEditData() {

    myData = "{'doctorId':'" + glbVarDoctorId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetDoctor",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetDoctor,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false,
        async: false
    });
}
function onSuccessGetDoctor(data, status) {

    if (data.d != "") {

        //$('#hdnMode').val("EditMode");
        ClearFields();
        jsonObj = jsonParse(data.d);

        if (jsonObj != null || jsonObj != "") {

            $('#txtFirstName').val(jsonObj[0].FirstName);

            if (jsonObj[0].LastName == "-") {

                $('#txtLastName').val("");
            }
            else {

                $('#txtLastName').val(jsonObj[0].LastName);
            }

            if (jsonObj[0].MiddleName == "-") {

                $('#txtMiddleName').val("");
            }
            else {

                $('#txtMiddleName').val(jsonObj[0].MiddleName);
            }

            $("#ddlGender").val(jsonObj[0].Gender);
            $('#ddlDesignation').val(jsonObj[0].DesignationId);
            $('#chkKol').attr("checked", jsonObj[0].KOL);
            $('#cboCountries').val(jsonObj[0].Country);
            $('#txtCity').val(jsonObj[0].City);
            $('#txtMobileNumber').val(jsonObj[0].MobileNumber1);
            $('#txtOfficeNumber').val(jsonObj[0].MobileNumber2);
            //$('#chkActive').attr("checked", jsonObj[0].IsActive);
            $('#txtCurrentAddress').val(jsonObj[0].Address1);
            $('#txtCNIC').val(jsonObj[0].CNIC);
            $('#txtLicenseNum').val(jsonObj[0].LiscenseId);
            $('#txtCode').val(jsonObj[0].DocCode);

        }
    }

    GetQualificationById();
}
function GetQualificationById() {

    myData = "{'doctorId':'" + glbVarDoctorId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetQualificationById",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSucessGetQualificationById,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSucessGetQualificationById(data, status) {

    if (data.d != "") {

        //$('#hdnMode').val("EditMode");
        jsonObj = jsonParse(data.d);

        if (jsonObj != null || jsonObj != "") {

            $('#txtExistingQualifications').removeAttr("readonly");
            $('#txtExistingQualifications').val("");
            var qualificationName = "";

            $.each(jsonObj, function (i, tweet) {

                if (jsonObj[0].DoctorId != -1) {

                    qualificationName = qualificationName + jsonObj[i].QualificationName + ' | ';
                }
            });

            $('#txtExistingQualifications').val(qualificationName);
            $('#txtExistingQualifications').attr("readonly", true);
        }
    }

    GetSpeacialityById();
}
function GetSpeacialityById() {

    myData = "{'doctorId':'" + glbVarDoctorId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetSpeacialityById",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetSpeacialityById,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetSpeacialityById(data, status) {

    if (data.d != "") {

        //$('#hdnMode').val("EditMode");
        jsonObj = jsonParse(data.d);

        if (jsonObj != null || jsonObj != "") {

            $('#txtExistingSpecialities').removeAttr("readonly");
            $('#txtExistingSpecialities').val("");
            var specialityName = "";

            $.each(jsonObj, function (i, tweet) {

                if (jsonObj[0].DoctorId != -1) {

                    specialityName = specialityName + jsonObj[i].SpecialityName + ' | ';
                }
            });

            $('#txtExistingSpecialities').val(specialityName);
            $('#txtExistingSpecialities').attr("readonly", true);
        }
    }

    GetClassById();
}
function GetClassById() {

    myData = "{'doctorId':'" + glbVarDoctorId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetClassById",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetClassById,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetClassById(data, status) {

    if (data.d != "") {

        // $('#hdnMode').val("EditMode");
        jsonObj = jsonParse(data.d);

        if (jsonObj != null || jsonObj != "") {

            $('#ddlClass').val(jsonObj[0].ClassId);
        }
    }
    GetDoctorBrick();
    GetProductById();
}
function GetProductById() {

    myData = "{'doctorId':'" + glbVarDoctorId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetProductById",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetProductById,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetProductById(data, status) {

    if (data.d != "") {

        // $('#hdnMode').val("EditMode");
        jsonObj = jsonParse(data.d);

        if (jsonObj != null || jsonObj != "") {

            $('#txtExistingProducts').removeAttr("readonly");
            $('#txtExistingProducts').val("");
            var productName = "";

            $.each(jsonObj, function (i, tweet) {

                if (jsonObj[0].DoctorId != -1) {

                    productName = productName + jsonObj[i].ProductName + ' | ';
                }
            });

            $('#txtExistingProducts').val(productName);
            $('#txtExistingProducts').attr("readonly", true);
        }
    }

    GetDoctorHierarchyLevel();
}
function GetDoctorHierarchyLevel() {

    myData = "{'doctorId':'" + glbVarDoctorId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetDoctorHierarchyLevel",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetDoctorHierarchyLevel,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetDoctorHierarchyLevel(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (glbVarLevelName == "Level1") {

        }
        if (glbVarLevelName == "Level2") {

        }
        if (glbVarLevelName == "Level3") {

            LevelId3 = jsonObj[0].Level3LevelId;
            LevelId4 = jsonObj[0].Level4LevelId;

            $('#ddl1').val(LevelId3);

            myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbVarLevelName + "'}";

            $.ajax({
                type: "POST",
                url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessShowFillddl2,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        if (glbVarLevelName == "Level4") {

        }
        if (glbVarLevelName == "Level5") {

        }
        if (glbVarLevelName == "Level6") {

        }
    }
}
function onSuccessShowFillddl2(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (jsonObj != null || jsonObj != "") {

            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddl6').innerHTML = "";

            value = '-1';
            name = 'Select ' + HierarchyLevel4;
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });

            $('#ddl2').val(LevelId4);
        }
    }

    //  GetDoctorBrick();
}
function GetDoctorBrick() {

    // myData = "{'doctorId':'" + glbVarDoctorId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/GetDoctorBrick",
        // data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetDoctorBrick,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetDoctorBrick(data, status) {

    document.getElementById('ddlBrick').innerHTML = "";

    if (data.d != "") {

        //$('#hdnMode').val("EditMode");
        jsonObj = jsonParse(data.d);

        value = '-1';
        name = 'Select Brick';
        $("#ddlBrick").append("<option value='" + value + "'>" + name + "</option>");

        if (jsonObj != null || jsonObj != "") {

            //$('#ddlBrick').val(jsonObj[0].LevelId);
            $.each(jsonObj, function (i, tweet) {
                $("#ddlBrick").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
        }
    }
}

// LoadForDelete function bind onClick event from GridView1_RowDataBound method
function oGrid_Delete(sender) {

    $('#hdnMode').val("DeleteMode");
    glbVarDoctorId = sender;
    GetCurrentUser();
}
function LoadForDeleteData() {

    if (CurrentUserRole == 'rl6') {

        //$('#divConfirmation').jqmShow();
        btnYesClicked();
    }
    else {

        msg = 'Access Denied!';

        $.fn.jQueryMsg({
            msg: msg,
            msgClass: 'error',
            fx: 'slide',
            speed: 200
        });
    }
}

//   Button Click Events 
function btnSaveClicked() {

    var isValidated = $("#form1").validate({
        rules: {
            txtFirstName: {
                required: true,
                alpha: true
            },
            txtMiddleName: {
                alpha: true
            },
            txtLastName: {
                required: true,
                alpha: true
            },
            txtCity: {
                required: true,
                alpha: true
            },
            txtMobileNumber: {
                required: true
            },
            txtCNIC: {
                required: true
            },
            txtCode: {
                required: true
            }
        }
    });

    if (!$("#form1").valid()) {

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
    $('#rowExistingQualification').hide();
    $('#rowExistingSpeciality').hide();
    $('#rowExistingProduct').hide();
    ajaxCompleted();
    $("#btnRefresh").trigger('click');
    return false;
}
function btnYesClicked() {

    myData = "{'doctorId':'" + glbVarDoctorId + "'}";

    $.ajax({
        type: "POST",
        url: "DoctorsService.asmx/DeleteDoctor",
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

    $old('#divConfirmation').jqmHide();
    $('#hdnMode').val("AddMode");
    ClearFields();
    $('#rowExistingQualification').hide();
    $('#rowExistingSpeciality').hide();
    $('#rowExistingProduct').hide();
    ajaxCompleted();
    return false;
}

function btnOkClicked() {

    //$('#Divmessage').jqmHide();
    $('#hdnMode').val("AddMode");
    $("#btnRefresh").trigger('click');
    ClearFields();
    ajaxCompleted();
    return false;
}

// Functions
function DefaultData() {

    MiddleName = $('#txtMiddleName').val();
    MiddleName = $.trim(MiddleName);
    Address1 = $('#txtCurrentAddress').val();
    Address1 = $.trim(Address1);
    Address2 = '-';
    Address2 = $.trim(Address2);
    MobileNumber2 = $('#txtOfficeNumber').val();
    MobileNumber2 = $.trim(MobileNumber2);
    CNICNum = $('#txtCNIC').val();
    LicenseNum = $('#txtLicenseNum').val();
    LicenseNum = $.trim(LicenseNum);

    if (MiddleName == "") {

        MiddleName = "-";
    }

    if (Address1 == "") {

        Address1 = "-";
    }

    if (Address2 == "") {

        Address2 = "-";
    }

    if (MobileNumber2 == "") {

        MobileNumber2 = "-";
    }
}
function SaveData() {

    //level1Value = $('#ddl1').val();
    //level2Value = $('#ddl2').val();
    //level3Value = $('#ddl3').val();
    //level4Value = $('#ddl4').val();
    //level5Value = $('#ddl5').val();
    //level6Value = $('#ddl6').val();
    brickId = $('#ddlBrick').val();
    Designation = $('#ddlDesignation').val();

    //if (level1Value == null) {

    //    level1Value = -1;
    //}

    //if (level2Value == null) {

    //    level2Value = -1;
    //}

    //if (level3Value == null) {

    //    level3Value = -1;
    //}

    //if (level4Value == null) {

    //    level4Value = -1;
    //}

    //if (level5Value == null) {

    //    level5Value = -1;
    //}

    //if (level6Value == null) {

    //    level6Value = -1;
    //}

    glbQualificationId = $('#ddlQualifications').val();
    glbSpecialityId = $('#ddlSpecialities').val();
    glbClassId = $('#ddlClass').val();
    glbProductId = $('#ddlProduct').val();
    myData = "";
    msg = "";

    if (glbVarLevelName == "Level6") {

        //if (level1Value != -1) { 
        //    if (level2Value != -1) {
        if (brickId != -1) {
            if (glbClassId != -1) {

                myData = "{'firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val() + "','middleName':'" + MiddleName
                    + "','DocCode':'" + $('#txtCode').val() + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation + "','kol':'" + (($('#chkKol').attr("checked") == 'checked') ? 'true' : 'false')
                    + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val() + "','mobileNumber':'" + $('#txtMobileNumber').val()
                    + "','officeNumber':'" + MobileNumber2 + "','currentAddress':'" + Address1 + "','permenantAddress':'" + Address2
                    + "','isActive':'false','qualificationId':'" + glbQualificationId + "','specialityId':'" + glbSpecialityId
                    + "','classId':'" + glbClassId + "','productId':'" + glbProductId + "','level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'" + level3Value
                    + "','level4Id':'" + level4Value + "','level5Id':'" + level5Value + "','level6Id':'" + level6Value + "','levelName':'" + glbVarLevelName
                    + "','brickId':'" + brickId + "','CNIC':'" + $('#txtCNIC').val() + "','licenseId':'" + $('#txtLicenseNum').val() + "','image':'','other':''}";
            }
            else {

                alert('Class must be selected!');
                return false;
            }
        }
        else {
            alert('Brick must be selected!');
            return false;
        }
        //}
        //else {

        //    alert('Region must be selected!');
        //    return false;
        //}
        //}
        //else {

        //    alert('Hierarchy must be selected!');
        //    return false;
        //}
    }

    if (myData != "") {

        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/InsertDoctor",
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
}
function UpdateData() {

    //level1Value = $('#ddl1').val();
    //level2Value = $('#ddl2').val();
    //level3Value = $('#ddl3').val();
    //level4Value = $('#ddl4').val();
    //level5Value = $('#ddl5').val();
    //level6Value = $('#ddl6').val();
    brickId = $('#ddlBrick').val();

    var sadas = $('#ddlBrick').val();

    Designation = $('#ddlDesignation').val();

    //if (level1Value == null) {

    //    level1Value = -1;
    //}

    //if (level2Value == null) {

    //    level2Value = -1;
    //}

    //if (level3Value == null) {

    //    level3Value = -1;
    //}

    //if (level4Value == null) {

    //    level4Value = -1;
    //}

    //if (level5Value == null) {

    //    level5Value = -1;
    //}

    //if (level6Value == null) {

    //    level6Value = -1;
    //}

    glbQualificationId = $('#ddlQualifications').val();
    glbSpecialityId = $('#ddlSpecialities').val();
    glbClassId = $('#ddlClass').val();
    glbProductId = $('#ddlProduct').val();

    myData = "";
    msg = "";

    if (glbVarLevelName == "Level6") {

        //if (level1Value != -1) {
        //    if (level2Value != -1) {
        if (brickId != -1) {
            if (glbClassId != -1) {

                if (glbQualificationId != null && glbSpecialityId != null && glbProductId != null) {

                    myData = "{'doctorId':'" + glbVarDoctorId + "','firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                            + "','middleName':'" + MiddleName + "','DocCode':'" + $('#txtCode').val() + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation
                            + "','kol':'" + (($('#chkKol').attr("checked") == 'checked') ? 'true' : 'false') + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val()
                            + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','officeNumber':'" + MobileNumber2
                            + "','currentAddress':'" + $('#txtCurrentAddress').val() + "','permenantAddress':'" + Address2
                            + "','isActive':'false','qualificationId':'" + glbQualificationId + "','specialityId':'" + glbSpecialityId
                            + "','classId':'" + glbClassId + "','productId':'" + glbProductId + "','level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'" + level3Value
                            + "','level4Id':'" + level4Value + "','level5Id':'" + level5Value + "','level6Id':'" + level6Value + "','levelName':'" + glbVarLevelName
                            + "','type':'" + 1 + "','brickId':'" + brickId + "','CNIC':'" + $('#txtCNIC').val() + "','licenseId':'" + $('#txtLicenseNum').val() + "','image':'','other':''}";
                }
                else if (glbQualificationId == null && glbSpecialityId == null && glbProductId == null) {

                    myData = "{'doctorId':'" + glbVarDoctorId + "','firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                            + "','middleName':'" + MiddleName + "','DocCode':'" + $('#txtCode').val() + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation
                            + "','kol':'" + (($('#chkKol').attr("checked") == 'checked') ? 'true' : 'false') + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val()
                            + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','officeNumber':'" + MobileNumber2
                            + "','currentAddress':'" + $('#txtCurrentAddress').val() + "','permenantAddress':'" + Address2
                            + "','isActive':'false','qualificationId':'" + 0 + "','specialityId':'" + 0
                            + "','classId':'" + glbClassId + "','productId':'" + 0 + "','level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'" + level3Value
                            + "','level4Id':'" + level4Value + "','level5Id':'" + level5Value + "','level6Id':'" + level6Value + "','levelName':'" + glbVarLevelName
                            + "','type':'" + 1 + "','brickId':'" + brickId + "','CNIC':'" + $('#txtCNIC').val() + "','licenseId':'" + $('#txtLicenseNum').val() + "','image':'','other':''}";
                }
                else if (glbQualificationId != null && glbSpecialityId == null && glbProductId == null) {

                    myData = "{'doctorId':'" + glbVarDoctorId + "','firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                            + "','middleName':'" + MiddleName + "','DocCode':'" + $('#txtCode').val() + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation
                            + "','kol':'" + (($('#chkKol').attr("checked") == 'checked') ? 'true' : 'false') + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val()
                            + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','officeNumber':'" + MobileNumber2
                            + "','currentAddress':'" + $('#txtCurrentAddress').val() + "','permenantAddress':'" + Address2
                            + "','isActive':'false','qualificationId':'" + glbQualificationId + "','specialityId':'" + 0
                            + "','classId':'" + glbClassId + "','productId':'" + 0 + "','level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'" + level3Value
                            + "','level4Id':'" + level4Value + "','level5Id':'" + level5Value + "','level6Id':'" + level6Value + "','levelName':'" + glbVarLevelName
                            + "','type':'" + 1 + "','brickId':'" + brickId + "','CNIC':'" + $('#txtCNIC').val() + "','licenseId':'" + $('#txtLicenseNum').val() + "','image':'','other':''}";
                }
                else if (glbQualificationId == null && glbSpecialityId == null && glbProductId != null) {

                    myData = "{'doctorId':'" + glbVarDoctorId + "','firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                            + "','middleName':'" + MiddleName + "','DocCode':'" + $('#txtCode').val() + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation
                            + "','kol':'" + (($('#chkKol').attr("checked") == 'checked') ? 'true' : 'false') + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val()
                            + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','officeNumber':'" + MobileNumber2
                            + "','currentAddress':'" + $('#txtCurrentAddress').val() + "','permenantAddress':'" + Address2
                            + "','isActive':'false','qualificationId':'" + 0 + "','specialityId':'" + 0
                            + "','classId':'" + glbClassId + "','productId':'" + glbProductId + "','level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'" + level3Value
                            + "','level4Id':'" + level4Value + "','level5Id':'" + level5Value + "','level6Id':'" + level6Value + "','levelName':'" + glbVarLevelName
                            + "','type':'" + 1 + "','brickId':'" + brickId + "','CNIC':'" + $('#txtCNIC').val() + "','licenseId':'" + $('#txtLicenseNum').val() + "','image':'','other':''}";
                }
                else if (glbQualificationId != null && glbSpecialityId == null && glbProductId != null) {

                    myData = "{'doctorId':'" + glbVarDoctorId + "','firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                            + "','middleName':'" + MiddleName + "','DocCode':'" + $('#txtCode').val() + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation
                            + "','kol':'" + (($('#chkKol').attr("checked") == 'checked') ? 'true' : 'false') + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val()
                            + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','officeNumber':'" + MobileNumber2
                            + "','currentAddress':'" + $('#txtCurrentAddress').val() + "','permenantAddress':'" + Address2
                            + "','isActive':'false','qualificationId':'" + glbQualificationId + "','specialityId':'" + 0
                            + "','classId':'" + glbClassId + "','productId':'" + glbProductId + "','level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'" + level3Value
                            + "','level4Id':'" + level4Value + "','level5Id':'" + level5Value + "','level6Id':'" + level6Value + "','levelName':'" + glbVarLevelName
                            + "','type':'" + 1 + "','brickId':'" + brickId + "','CNIC':'" + $('#txtCNIC').val() + "','licenseId':'" + $('#txtLicenseNum').val() + "','image':'','other':''}";
                }
                else if (glbQualificationId == null && glbSpecialityId != null && glbProductId == null) {

                    myData = "{'doctorId':'" + glbVarDoctorId + "','firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                            + "','middleName':'" + MiddleName + "','DocCode':'" + $('#txtCode').val() + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation
                            + "','kol':'" + (($('#chkKol').attr("checked") == 'checked') ? 'true' : 'false') + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val()
                            + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','officeNumber':'" + MobileNumber2
                            + "','currentAddress':'" + $('#txtCurrentAddress').val() + "','permenantAddress':'" + Address2
                            + "','isActive':'false','qualificationId':'" + 0 + "','specialityId':'" + glbSpecialityId
                            + "','classId':'" + glbClassId + "','productId':'" + 0 + "','level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'" + level3Value
                            + "','level4Id':'" + level4Value + "','level5Id':'" + level5Value + "','level6Id':'" + level6Value + "','levelName':'" + glbVarLevelName
                            + "','type':'" + 1 + "','brickId':'" + brickId + "','CNIC':'" + $('#txtCNIC').val() + "','licenseId':'" + $('#txtLicenseNum').val() + "','image':'','other':''}";
                }
                else if (glbQualificationId != null && glbSpecialityId != null && glbProductId == null) {

                    myData = "{'doctorId':'" + glbVarDoctorId + "','firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                            + "','middleName':'" + MiddleName + "','DocCode':'" + $('#txtCode').val() + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation
                            + "','kol':'" + (($('#chkKol').attr("checked") == 'checked') ? 'true' : 'false') + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val()
                            + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','officeNumber':'" + MobileNumber2
                            + "','currentAddress':'" + $('#txtCurrentAddress').val() + "','permenantAddress':'" + Address2
                            + "','isActive':'false','qualificationId':'" + glbQualificationId + "','specialityId':'" + glbSpecialityId
                            + "','classId':'" + glbClassId + "','productId':'" + 0 + "','level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'" + level3Value
                            + "','level4Id':'" + level4Value + "','level5Id':'" + level5Value + "','level6Id':'" + level6Value + "','levelName':'" + glbVarLevelName
                            + "','type':'" + 1 + "','brickId':'" + brickId + "','CNIC':'" + $('#txtCNIC').val() + "','licenseId':'" + $('#txtLicenseNum').val() + "','image':'','other':''}";
                }
                else if (glbQualificationId == null && glbSpecialityId != null && glbProductId != null) {

                    myData = "{'doctorId':'" + glbVarDoctorId + "','firstName':'" + $('#txtFirstName').val() + "','lastName':'" + $('#txtLastName').val()
                            + "','middleName':'" + MiddleName + "','DocCode':'" + $('#txtCode').val() + "','gender':'" + $('#ddlGender').val() + "','designation':'" + Designation
                            + "','kol':'" + (($('#chkKol').attr("checked") == 'checked') ? 'true' : 'false') + "','country':'" + $('#cboCountries').val() + "','city':'" + $('#txtCity').val()
                            + "','mobileNumber':'" + $('#txtMobileNumber').val() + "','officeNumber':'" + MobileNumber2
                            + "','currentAddress':'" + $('#txtCurrentAddress').val() + "','permenantAddress':'" + Address2
                            + "','isActive':'false','qualificationId':'" + 0 + "','specialityId':'" + glbSpecialityId
                            + "','classId':'" + glbClassId + "','productId':'" + glbProductId + "','level1Id':'" + level1Value + "','level2Id':'" + level2Value + "','level3Id':'" + level3Value
                            + "','level4Id':'" + level4Value + "','level5Id':'" + level5Value + "','level6Id':'" + level6Value + "','levelName':'" + glbVarLevelName
                            + "','type':'" + 1 + "','brickId':'" + brickId + "','CNIC':'" + $('#txtCNIC').val() + "','licenseId':'" + $('#txtLicenseNum').val() + "','image':'','other':''}";
                }
            }
            else {

                alert('Class must be selected!');
                return false;
            }
        }
        else {

            alert('Brick must be selected!');
            return false;
        }
        //}
        //    else {

        //        alert('Region must be selected!');
        //        return false;
        //    }
        //}
        //else {

        //    alert('Hierarchy must be selected!');
        //    return false;
        //}
    }

    if (myData != "") {

        $.ajax({
            type: "POST",
            url: "DoctorsService.asmx/UpdateDoctor",
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
}
function onSuccess(data, status) {

    var msg = '';

    if (data.d == "OK") {

        var mode = $('#hdnMode').val();

        if (mode === "AddMode") {

            msg = 'Data inserted succesfully!';
        }
        else if (mode === "EditMode") {

            msg = 'Data updated succesfully!';
        }
        else if (mode === "DeleteMode") {

            msg = 'Data deleted succesfully!';
            // $('#divConfirmation').jqmHide();
        }
        else if (mode === "V") {

            msg = 'Doctor Verified succesfully!';
        }
        else if (mode === "R") {

            msg = 'Doctor Rejected succesfully!';
        }

        ClearFields();
        $('#hdnMode').val("");

        window.alert(msg);
        $('#btnOk').click();
        // $('#hlabmsg').append(msg);
        // $('#Divmessage').jqmShow();
    }
    else if (data.d == "Not able to delete this record due to linkup.") {

        // $('#divConfirmation').jqmHide();
        msg = 'Not able to delete this record due to linkup.';

        //$('#hlabmsg').append(msg);

        window.alert(msg);
        $('#btnOk').click();
        // $('#Divmessage').jqmShow();
    } else if (data.d == "Already Exist!") {
        msg = 'Already Exist in Your Doctor List!';
        ClearFields();
        $('#hdnMode').val("");


        window.alert(msg);
        $('#btnOk').click();
        //$('#hlabmsg').append(msg);
        //$('#Divmessage').jqmShow();
    }
}
function onError(request, status, error) {

    //$('#divConfirmation').hide();
    msg = 'Error is occured';


    window.alert(msg);
    $('#btnOk').click();
    //$('#hlabmsg').append(msg);
    //$('#Divmessage').jqmShow();
}
function startingAjax() {

    $('#imgLoading').show();
}
function ajaxCompleted() {

    $('#imgLoading').hide();
}
function DefaultField() {

    document.getElementById('ddl1').innerHTML = "";
    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";
    $('#txtExistingQualifications').val("");
    $('#txtExistingSpecialities').val("");
    $('#txtExistingProducts').val("");
    $('#txtDoctorCode').val("");
    $('#ddlBrick').val("-1");
    $('#txtFirstName').val("");
    $('#txtLastName').val("");
    $('#txtMiddleName').val("");
    $('#ddlGender').val("0");
    $('#ddlDesignation').val("-1");
    $('#chkKol').attr("checked", true);
    $('#cboCountries').val("PK");
    $('#txtCity').val("");
    $('#txtMobileNumber').val("");
    $('#txtOfficeNumber').val("");
    $('#txtCurrentAddress').val("");
    //$('#chkActive').attr("checked", true);
}
function ClearFields() {

    $('#ddl1').val("-1");
    $('#ddl2').val("-1");
    $('#ddl3').val("-1");
    $('#ddl4').val("-1");
    $('#ddl5').val("-1");
    $('#ddl6').val("-1");
    $('#txtExistingQualifications').val("");
    $('#txtExistingSpecialities').val("");
    $('#txtExistingProducts').val("");
    $('#txtDoctorCode').val("");
    $('#ddlBrick').val("-1");
    $('#txtFirstName').val("");
    $('#txtLastName').val("");
    $('#txtMiddleName').val("");
    $('#ddlGender').val("0");
    $('#txtCNIC').val("");
    $('#txtLicenseNum').val("");
    $('#ddlDesignation').val("-1");
    $('#chkKol').attr("checked", true);
    $('#cboCountries').val("PK");
    $('#txtCity').val("");
    $('#txtMobileNumber').val("");
    $('#txtOfficeNumber').val("");
    $('#txtCurrentAddress').val("");
    //$('#chkActive').attr("checked", true);
}
function OnCompleteDownload(data, status) {
    var returndata = data;
    $('#dialog').jqmHide();

    alert(returndata);
}


// Global Variables
var glbVarLevelId = 0,glbVarShiftLevelId = 0 ,glbRowIndex = 0, rowCount = 0, parentId = 0;
var glbVarHierarchyIndex = null, glbVarHierarchyValue = null, glbVarHierarchyName = null, glbValue2 = null, glbName2 = null, glbValue3 = null, glbName3 = null, glbValue4 = null,
    glbName4 = null, glbValue5 = null, glbName5 = null, glbValue6 = null, glbName6 = null, jsonObj = null, value = null, name = null, myData = null, glbIndex2 = null,
    glbIndex3 = null, glbIndex4 = null, glbIndex5 = null, glbIndex6 = null, _html = null, mode = null, msg = null, table = null, mainHierarachy = null, status = null,
    level1Value = null, level2Value = null, level3Value = null, level4Value = null, level5Value = null, level6Value = null;
//$(window).load(function () {
//    $(".loding_box_outer").delay(2000).fadeOut("slow");
//    $("#overlayer").delay(2000).fadeOut("slow");
//    //jQuery("#loading").show();
//})
// Page Load
function pageLoad() {

   

    //jQuery(".loding_box_outer").show();
    $('#ddlShiftHierarchy').attr('disabled', true);
    // Fill Hierarchy Levels
    FillHierarchyLevel();

    // Hide DropDownList
    HideDropDownList();

    // Select Hierarchy Levels
    $('#ddlHierarchyLevel').change(ShowDropDownList);

    // DropDownList
    $('#ddl1').change(OnChangeddl1);
    $('#ddl2').change(OnChangeddl2);
    $('#ddl3').change(OnChangeddl3);
    $('#ddl4').change(OnChangeddl4);
    $('#ddl5').change(OnChangeddl5);
    //$('#ddl6').change(OnChangeddl6);

    // Button Click Event
    $('#btnSave').click(btnSaveClicked);
    $('#btnCancel').click(btnCancelClicked);
    $('#btnYes').click(btnYesClicked);
    $('#btnNo').click(btnNoClicked);

    // Modal Popup Window
    $('#divGrid').jqm({ modal: true });
    $('#divConfirmation').jqm({ modal: true });
}

// Hierarchy Level
function FillHierarchyLevel() {

    $.ajax({
        type: "POST",
        url: "AppConfiguration.asmx/GetHierarchyLevels",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessFillHierarchyLevel,
        error: onError,
        cache: false
    });
}
function onSuccessFillHierarchyLevel(data, status) {

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        document.getElementById('ddlHierarchyLevel').innerHTML = "";
        mainHierarachy = jsonObj[0].SettingName;

        value = "-1";
        name = "Select Level";
        $("#ddlHierarchyLevel").append("<option value='" + value + "'>" + name + "</option>");

        $.each(jsonObj, function (i, tweet) {
            $("#ddlHierarchyLevel").append("<option value='" + jsonObj[i].SettingName + "'>" + jsonObj[i].SettingValue + "</option>");
        });
    }
}

// OnChange Hierarchy Levels
function ShowDropDownList() {

    glbVarHierarchyName = $('#ddlHierarchyLevel option:selected').text();
    glbVarHierarchyValue = $('#ddlHierarchyLevel').val();
    glbVarHierarchyIndex = $('#ddlHierarchyLevel').get(0).selectedIndex;
    $('#hdnHierarchyLevel').val(glbVarHierarchyValue);

    document.getElementById('ddlShiftHierarchy').innerHTML = "";
    if (glbVarHierarchyIndex == 0) {

        HideDropDownList();
        document.getElementById('divTable').innerHTML = "";
    }
    else {

        if (glbVarHierarchyIndex == 1) {

            HideDropDownList();

            myData = "{'parentLevelId':'" + 0 + "','levelName':'" + glbVarHierarchyValue + "'}";

            $.ajax({
                type: "POST",
                url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillGridView,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
        if (glbVarHierarchyIndex == 1) {

            //document.getElementById('divTable').innerHTML = "";
            $('#lbl1').hide(); $('#ddl1').hide();
            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddlShiftHierarchy').innerHTML = "";
            glbIndex2 = $('#ddlHierarchyLevel').get(0).selectedIndex;
            glbValue2 = $("#ddlHierarchyLevel option:eq(" + glbIndex2 + ")").val();
            glbName2 = $("#ddlHierarchyLevel option:eq(" + glbIndex2 + ")").text();

            Fillddl1(glbValue2);

            $('#Label2').hide();
            $('#lbl3').hide();
            $('#lbl4').hide();
            $('#ddl2').hide();
            $('#ddl3').hide();
            $('#ddl4').hide();
            $('#ddl5').hide();
        }
        if (glbVarHierarchyIndex == 2) {

            document.getElementById('divTable').innerHTML = "";
            document.getElementById('ddlShiftHierarchy').innerHTML = "";
            $('#lbl1').show(); $('#ddl1').show();
            document.getElementById('ddl1').innerHTML = "";
            glbIndex2 = $('#ddlHierarchyLevel').get(0).selectedIndex - 1;
            glbValue2 = $("#ddlHierarchyLevel option:eq(" + glbIndex2 + ")").val();
            glbName2 = $("#ddlHierarchyLevel option:eq(" + glbIndex2 + ")").text();

            Fillddl1(glbValue2);

            $('#Label2').hide();
            $('#Label3').hide();
            $('#lbl4').hide();
            $('#ddl2').hide();
            $('#ddl3').hide();
            $('#ddl4').hide();
            $('#ddl5').hide();
        }
        if (glbVarHierarchyIndex == 3) {

            document.getElementById('divTable').innerHTML = "";
            $('#lbl1').show(); $('#ddl1').show();
            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddlShiftHierarchy').innerHTML = "";    
            glbIndex2 = $('#ddlHierarchyLevel').get(0).selectedIndex - 2;
            glbValue2 = $("#ddlHierarchyLevel option:eq(" + glbIndex2 + ")").val();
            glbName2 = $("#ddlHierarchyLevel option:eq(" + glbIndex2 + ")").text();

            $('#Label2').show(); $('#ddl2').show();
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddlShiftHierarchy').innerHTML = "";
            glbIndex3 = $('#ddlHierarchyLevel').get(0).selectedIndex - 1;
            glbValue3 = $("#ddlHierarchyLevel option:eq(" + glbIndex3 + ")").val();
            glbName3 = $("#ddlHierarchyLevel option:eq(" + glbIndex3 + ")").text();

            Fillddl1(glbValue2);

            $('#Label3').hide();
            $('#lbl4').hide();
            $('#ddl3').hide();
            $('#ddl4').hide();
            $('#ddl5').hide();
        }
        if (glbVarHierarchyIndex == 4) {

            document.getElementById('divTable').innerHTML = "";
            $('#lbl1').show(); $('#ddl1').show();
            document.getElementById('ddl1').innerHTML = "";
            document.getElementById('ddlShiftHierarchy').innerHTML = "";
            glbIndex2 = $('#ddlHierarchyLevel').get(0).selectedIndex - 3;
            glbValue2 = $("#ddlHierarchyLevel option:eq(" + glbIndex2 + ")").val();
            glbName2 = $("#ddlHierarchyLevel option:eq(" + glbIndex2 + ")").text();

            $('#Label2').show(); $('#ddl2').show();
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddlShiftHierarchy').innerHTML = "";
            glbIndex3 = $('#ddlHierarchyLevel').get(0).selectedIndex - 2;
            glbValue3 = $("#ddlHierarchyLevel option:eq(" + glbIndex3 + ")").val();
            glbName3 = $("#ddlHierarchyLevel option:eq(" + glbIndex3 + ")").text();

            $('#Label3').show(); $('#ddl3').show();
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddlShiftHierarchy').innerHTML = "";
            glbIndex4 = $('#ddlHierarchyLevel').get(0).selectedIndex - 1;
            glbValue4 = $("#ddlHierarchyLevel option:eq(" + glbIndex4 + ")").val();
            glbName4 = $("#ddlHierarchyLevel option:eq(" + glbIndex4 + ")").text();

            Fillddl1(glbValue2);

            $('#lbl4').hide();
            $('#ddl4').hide();
            $('#ddl5').hide();
        }
        if (glbVarHierarchyIndex == 5) {

            document.getElementById('divTable').innerHTML = "";
            document.getElementById('ddlShiftHierarchy').innerHTML = "";
            $('#lbl1').show(); $('#ddl1').show();
            document.getElementById('ddl1').innerHTML = "";
            glbIndex2 = $('#ddlHierarchyLevel').get(0).selectedIndex - 4;
            glbValue2 = $("#ddlHierarchyLevel option:eq(" + glbIndex2 + ")").val();
            glbName2 = $("#ddlHierarchyLevel option:eq(" + glbIndex2 + ")").text();

            $('#Label2').show(); $('#ddl2').show();
            document.getElementById('ddlShiftHierarchy').innerHTML = "";
            document.getElementById('ddl2').innerHTML = "";
            glbIndex3 = $('#ddlHierarchyLevel').get(0).selectedIndex - 3;
            glbValue3 = $("#ddlHierarchyLevel option:eq(" + glbIndex3 + ")").val();
            glbName3 = $("#ddlHierarchyLevel option:eq(" + glbIndex3 + ")").text();

            $('#Label3').show(); $('#ddl3').show();
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddlShiftHierarchy').innerHTML = "";
            glbIndex4 = $('#ddlHierarchyLevel').get(0).selectedIndex - 2;
            glbValue4 = $("#ddlHierarchyLevel option:eq(" + glbIndex4 + ")").val();
            glbName4 = $("#ddlHierarchyLevel option:eq(" + glbIndex4 + ")").text();

            $('#lbl4').show(); $('#ddl4').show();
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddlShiftHierarchy').innerHTML = "";
            glbIndex5 = $('#ddlHierarchyLevel').get(0).selectedIndex - 1;
            glbValue5 = $("#ddlHierarchyLevel option:eq(" + glbIndex5 + ")").val();
            glbName5 = $("#ddlHierarchyLevel option:eq(" + glbIndex5 + ")").text();

            Fillddl1(glbValue2);
            $('#ddl5').hide();
        }
        if (glbVarHierarchyIndex == 6) {

            document.getElementById('divTable').innerHTML = "";
            document.getElementById('ddlShiftHierarchy').innerHTML = "";
            $('#lbl1').show(); $('#ddl1').show();
            document.getElementById('ddl1').innerHTML = "";
            glbIndex2 = $('#ddlHierarchyLevel').get(0).selectedIndex - 5;
            glbValue2 = $("#ddlHierarchyLevel option:eq(" + glbIndex2 + ")").val();
            glbName2 = $("#ddlHierarchyLevel option:eq(" + glbIndex2 + ")").text();

            $('#Label2').show(); $('#ddl2').show();
            document.getElementById('ddl2').innerHTML = "";
            document.getElementById('ddlShiftHierarchy').innerHTML = "";
            glbIndex3 = $('#ddlHierarchyLevel').get(0).selectedIndex - 4;
            glbValue3 = $("#ddlHierarchyLevel option:eq(" + glbIndex3 + ")").val();
            glbName3 = $("#ddlHierarchyLevel option:eq(" + glbIndex3 + ")").text();

            $('#Label3').show(); $('#ddl3').show();
            document.getElementById('ddl3').innerHTML = "";
            document.getElementById('ddlShiftHierarchy').innerHTML = "";
            glbIndex4 = $('#ddlHierarchyLevel').get(0).selectedIndex - 3;
            glbValue4 = $("#ddlHierarchyLevel option:eq(" + glbIndex4 + ")").val();
            glbName4 = $("#ddlHierarchyLevel option:eq(" + glbIndex4 + ")").text();

            $('#lbl4').show(); $('#ddl4').show();
            document.getElementById('ddl4').innerHTML = "";
            document.getElementById('ddlShiftHierarchy').innerHTML = "";
            glbIndex5 = $('#ddlHierarchyLevel').get(0).selectedIndex - 2;
            glbValue5 = $("#ddlHierarchyLevel option:eq(" + glbIndex5 + ")").val();
            glbName5 = $("#ddlHierarchyLevel option:eq(" + glbIndex5 + ")").text();

            $('#lbl5').show(); $('#ddl5').show();
            document.getElementById('ddl5').innerHTML = "";
            document.getElementById('ddlShiftHierarchy').innerHTML = "";
            glbIndex6 = $('#ddlHierarchyLevel').get(0).selectedIndex - 1;
            glbValue6 = $("#ddlHierarchyLevel option:eq(" + glbIndex6 + ")").val();
            glbName6 = $("#ddlHierarchyLevel option:eq(" + glbIndex6 + ")").text();

            Fillddl1(glbValue2);
        }
    }
}
function HideDropDownList() {

    $('#lbl1').hide();
    $('#Label2').hide();
    $('#Label3').hide();
    $('#lbl4').hide();
    $('#lbl5').hide();
    $('#lbl6').hide();
    $('#ddl1').hide();
    $('#ddl2').hide();
    $('#ddl3').hide();
    $('#ddl4').hide();
    $('#ddl5').hide();
    $('#ddl6').hide();
}

// Load Data in DropDownLists

// DropDownList 1
function Fillddl1(levelName) {

    myData = "{'levelName':'" + levelName + "'}";

    $.ajax({
        type: "POST",
        url: "DivisionalHierarchy.asmx/FillDropDownList",
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
        document.getElementById('ddl1').innerHTML = "";

        value = '-1';
        name = 'Select ' + glbName2 + '...';
        $("#ddl1").append("<option value='" + value + "'>" + name + "</option>");
        $.each(jsonObj, function (i, tweet) {
            $("#ddl1").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        });

        $("#ddlShiftHierarchy").append("<option value='" + value + "'>" + name + "</option>");
        $.each(jsonObj, function (i, tweet) {
            $("#ddlShiftHierarchy").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
        });
    }
}

function OnChangeddl1() {

    level1Value = $('#ddl1').val();

    if (level1Value > 0) {

        glbVarHierarchyValue = $('#ddlHierarchyLevel').val();

        if (glbVarHierarchyIndex != 0) {

            if (glbVarHierarchyIndex == 1) {

                myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbValue2 + "'}";

                $.ajax({
                    type: "POST",
                    url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillGridView,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            if (glbVarHierarchyIndex == 2) {

                myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbValue2 + "'}";

                $.ajax({
                    type: "POST",
                    url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillGridView,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            if (glbVarHierarchyIndex == 3) {

                myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbValue2 + "'}";

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
            if (glbVarHierarchyIndex == 4) {

                myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbValue2 + "'}";

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
            if (glbVarHierarchyIndex == 5) {

                myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbValue2 + "'}";

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
            if (glbVarHierarchyIndex == 6) {

                myData = "{'parentLevelId':'" + $('#ddl1').val() + "','levelName':'" + glbValue2 + "'}";

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
        else {

            document.getElementById('divTable').innerHTML = "";
        }
    }
    else {

        ClearFields();
        document.getElementById('divTable').innerHTML = "";
        document.getElementById('ddl2').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
        document.getElementById('ddlShiftHierarchy').innerHTML = "";
    }
}
function onSuccessFillddl2(data, status) {

    document.getElementById('divTable').innerHTML = "";
    document.getElementById('ddl2').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";
    document.getElementById('ddlShiftHierarchy').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (glbVarHierarchyIndex == 3) {

            value = '-1';
            name = 'Select ' + glbName3 + '...';
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
            $("#ddlShiftHierarchy").append("<option value='" + value + "'>" + name + "</option>");
            $.each(jsonObj, function (i, tweet) {
                $("#ddlShiftHierarchy").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
        }
        if (glbVarHierarchyIndex == 4) {

            document.getElementById('ddl2').innerHTML = "";
            value = '-1';
            name = 'Select ' + glbName3 + '...';
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
            $("#ddlShiftHierarchy").append("<option value='" + value + "'>" + name + "</option>");
            $.each(jsonObj, function (i, tweet) {
                $("#ddlShiftHierarchy").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
        }
        if (glbVarHierarchyIndex == 5) {

            document.getElementById('ddl2').innerHTML = "";
            value = '-1';
            name = 'Select ' + glbName3 + '...';
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
            $("#ddlShiftHierarchy").append("<option value='" + value + "'>" + name + "</option>");
            $.each(jsonObj, function (i, tweet) {
                $("#ddlShiftHierarchy").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
        }
        if (glbVarHierarchyIndex == 6) {

            document.getElementById('ddl2').innerHTML = "";
            value = '-1';
            name = 'Select ' + glbName3 + '...';
            $("#ddl2").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl2").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
            $("#ddlShiftHierarchy").append("<option value='" + value + "'>" + name + "</option>");
            $.each(jsonObj, function (i, tweet) {
                $("#ddlShiftHierarchy").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
        }
    }
}

function OnChangeddl2() {

    level2Value = $('#ddl2').val();

    if (level2Value > 0) {

        glbVarHierarchyValue = $('#ddlHierarchyLevel').val();

        if (glbVarHierarchyIndex != 0) {

            if (glbVarHierarchyIndex == 3) {

                myData = "{'parentLevelId':'" + $('#ddl2').val() + "','levelName':'" + glbValue3 + "'}";

                $.ajax({
                    type: "POST",
                    url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillGridView,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            if (glbVarHierarchyIndex == 4) {

                myData = "{'parentLevelId':'" + $('#ddl2').val() + "','levelName':'" + glbValue3 + "'}";

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
            if (glbVarHierarchyIndex == 5) {

                myData = "{'parentLevelId':'" + $('#ddl2').val() + "','levelName':'" + glbValue3 + "'}";

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
            if (glbVarHierarchyIndex == 6) {

                myData = "{'parentLevelId':'" + $('#ddl2').val() + "','levelName':'" + glbValue3 + "'}";

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
        else {

            document.getElementById('divTable').innerHTML = "";
        }
    }
    else {

        ClearFields();
        document.getElementById('divTable').innerHTML = "";
        document.getElementById('ddl3').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
        document.getElementById('ddlShiftHierarchy').innerHTML = "";
    }
}
function onSuccessFillddl3(data, status) {

    //document.getElementById('divTable').innerHTML = "";
    document.getElementById('ddl3').innerHTML = "";
    document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";
    document.getElementById('ddlShiftHierarchy').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (glbVarHierarchyIndex == 4) {

            value = '-1';
            name = 'Select ' + glbName4 + '...';
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
            $("#ddlShiftHierarchy").append("<option value='" + value + "'>" + name + "</option>");
            $.each(jsonObj, function (i, tweet) {
                $("#ddlShiftHierarchy").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
        }
        if (glbVarHierarchyIndex == 5) {

            document.getElementById('ddl3').innerHTML = "";
            value = '-1';
            name = 'Select ' + glbName4 + '...';
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
            $("#ddlShiftHierarchy").append("<option value='" + value + "'>" + name + "</option>");
            $.each(jsonObj, function (i, tweet) {
                $("#ddlShiftHierarchy").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
        }
        if (glbVarHierarchyIndex == 6) {

            document.getElementById('ddl3').innerHTML = "";
            value = '-1';
            name = 'Select ' + glbName4 + '...';
            $("#ddl3").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl3").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
            $("#ddlShiftHierarchy").append("<option value='" + value + "'>" + name + "</option>");
            $.each(jsonObj, function (i, tweet) {
                $("#ddlShiftHierarchy").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
        }
    }
}
function OnChangeddl3() {

    level3Value = $('#ddl3').val();

    if (level3Value > 0) {

        glbVarHierarchyValue = $('#ddlHierarchyLevel').val();

        if (glbVarHierarchyIndex != 0) {

            if (glbVarHierarchyIndex == 4) {

                myData = "{'parentLevelId':'" + $('#ddl3').val() + "','levelName':'" + glbValue4 + "'}";

                $.ajax({
                    type: "POST",
                    url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillGridView,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            if (glbVarHierarchyIndex == 5) {

                myData = "{'parentLevelId':'" + $('#ddl3').val() + "','levelName':'" + glbValue4 + "'}";

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
            if (glbVarHierarchyIndex == 6) {

                myData = "{'parentLevelId':'" + $('#ddl3').val() + "','levelName':'" + glbValue4 + "'}";

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
        else {

            document.getElementById('divTable').innerHTML = "";
        }
    }
    else {

        ClearFields();
        document.getElementById('divTable').innerHTML = "";
        document.getElementById('ddl4').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
        document.getElementById('ddlShiftHierarchy').innerHTML = "";
    }
}

// DropDownList 4
function onSuccessFillddl4(data, status) {

    //document.getElementById('divTable').innerHTML = "";
    //document.getElementById('ddl4').innerHTML = "";
    document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";
    document.getElementById('ddlShiftHierarchy').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (glbVarHierarchyIndex == 4) {
            document.getElementById('ddl4').innerHTML = "";
            value = '-1';
            name = 'Select ' + glbName5 + '...';
            $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl4").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
            $("#ddlShiftHierarchy").append("<option value='" + value + "'>" + name + "</option>");
            $.each(jsonObj, function (i, tweet) {
                $("#ddlShiftHierarchy").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
        }
        if (glbVarHierarchyIndex == 5) {

            document.getElementById('ddl4').innerHTML = "";
            value = '-1';
            name = 'Select ' + glbName5 + '...';
            $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl4").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
            $("#ddlShiftHierarchy").append("<option value='" + value + "'>" + name + "</option>");
            $.each(jsonObj, function (i, tweet) {
                $("#ddlShiftHierarchy").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
        }
        if (glbVarHierarchyIndex == 6) {

            document.getElementById('ddl4').innerHTML = "";
            value = '-1';
            name = 'Select ' + glbName5 + '...';
            $("#ddl4").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl4").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
            $("#ddlShiftHierarchy").append("<option value='" + value + "'>" + name + "</option>");
            $.each(jsonObj, function (i, tweet) {
                $("#ddlShiftHierarchy").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
        }
    }
}
function OnChangeddl4() {

    level3Value = $('#ddl4').val();

    if (level3Value > 0) {

        glbVarHierarchyValue = $('#ddlHierarchyLevel').val();

        if (glbVarHierarchyIndex != 0) {

            if (glbVarHierarchyIndex == 5) {

                myData = "{'parentLevelId':'" + $('#ddl4').val() + "','levelName':'" + glbValue5 + "'}";

                $.ajax({
                    type: "POST",
                    url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                    data: myData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: onSuccessFillGridView,
                    error: onError,
                    beforeSend: startingAjax,
                    complete: ajaxCompleted,
                    cache: false
                });
            }
            if (glbVarHierarchyIndex == 5) {

                myData = "{'parentLevelId':'" + $('#ddl4').val() + "','levelName':'" + glbValue5 + "'}";

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
            if (glbVarHierarchyIndex == 6) {

                myData = "{'parentLevelId':'" + $('#ddl4').val() + "','levelName':'" + glbValue5 + "'}";

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
        else {

            document.getElementById('divTable').innerHTML = "";
        }
    }
    else {

        ClearFields();
        document.getElementById('divTable').innerHTML = "";
        document.getElementById('ddl5').innerHTML = "";
        document.getElementById('ddl6').innerHTML = "";
        document.getElementById('ddlShiftHierarchy').innerHTML = "";
    }
}
// DropDownList 5
function onSuccessFillddl5(data, status) {

    //document.getElementById('divTable').innerHTML = "";
    //document.getElementById('ddl5').innerHTML = "";
    document.getElementById('ddl6').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);

        if (glbVarHierarchyIndex == 6) {
            document.getElementById('ddlShiftHierarchy').innerHTML = "";
            document.getElementById('ddl5').innerHTML = "";
            value = '-1';
            name = 'Select ' + glbName6 + '...';
            $("#ddl5").append("<option value='" + value + "'>" + name + "</option>");

            $.each(jsonObj, function (i, tweet) {
                $("#ddl5").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
            $("#ddlShiftHierarchy").append("<option value='" + value + "'>" + name + "</option>");
            $.each(jsonObj, function (i, tweet) {
                $("#ddlShiftHierarchy").append("<option value='" + jsonObj[i].LevelId + "'>" + jsonObj[i].LevelName + "</option>");
            });
        }
    }
}
function OnChangeddl5() {

    glbVarHierarchyValue = $('#ddlHierarchyLevel').val();

    if (glbVarHierarchyIndex != 0) {

        if (glbVarHierarchyIndex == 6) {

            myData = "{'parentLevelId':'" + $('#ddl5').val() + "','levelName':'" + glbValue6 + "'}";

            $.ajax({
                type: "POST",
                url: "DivisionalHierarchy.asmx/ShowCurrentLevel",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onSuccessFillGridView,
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                cache: false
            });
        }
    }
}

// Fill Table on the basis of selected item from dropdownlist
function onSuccessFillGridView(data, status) {

    document.getElementById('divTable').innerHTML = "";

    if (data.d != "") {

        jsonObj = jsonParse(data.d);
        _html = '<table id="tableDiv" border="0" class="mGrid">';

        _html += '<tr>';
        _html += '<th>Name</th>';
        _html += '<th>Description</th>';
        _html += '<th>Status</th>';
        _html += '<th> </th>';
        _html += '<th> </th>';
        _html += '</tr>';

        $.each(jsonObj, function (i, tweet) {

            if (jsonObj[i].IsActive == true) {

                status = 'Active';
            }
            else {

                status = 'Deactive';
            }

            _html += '<tr onclick="GetRowIndex(this.rowIndex);">';
            _html += '<td>' + jsonObj[i].LevelName + '</td>';
            _html += '<td>' + jsonObj[i].LevelDescription + '</td>';
            _html += '<td>' + status + '</td>';
            _html += '<td> <input id="' + jsonObj[i].LevelId + '" type="button" onclick="LoadForEdit(' + jsonObj[i].LevelId + ');" class="form-edit" /></td>';
            _html += '<td> <input id="' + jsonObj[i].LevelId + '" type="button" onclick="LoadForDelete(' + jsonObj[i].LevelId + ');" class="form-del" /></td>';
            _html += '</tr>';

        });

        _html += '</table>';
        document.getElementById('divTable').innerHTML = _html;
    }
}

// Fill Table after adding record(s)
function OnSuccessReloadTable(data, status) {

    if (data.d != "") {

        ClearFields();
        mode = $('#hdnMode').val();
        msg = 'Data inserted succesfully!';
        jsonObj = jsonParse(data.d);
        _html = "";

        if (document.getElementById('divTable').innerHTML == "") {

            _html = '<table id="tableDiv" border="0" class="mGrid">';

            _html += '<tr>';
            _html += '<th>Name</th>';
            _html += '<th>Description</th>';
            _html += '<th>Status</th>';
            _html += '<th> </th>';
            _html += '<th> </th>';
            _html += '</tr>';
        }

        $.each(jsonObj, function (i, tweet) {

            if (jsonObj[i].IsActive == true) {

                status = 'Active';
            }
            else {

                status = 'Deactive';
            }

            _html += '<td>' + jsonObj[i].LevelName + '</td>';
            _html += '<td>' + jsonObj[i].LevelDescription + '</td>';
            _html += '<td>' + status + '</td>';
            _html += '<td> <input id="' + jsonObj[i].LevelId + '" type="button" value="Edit" onclick="LoadForEdit(' + jsonObj[i].LevelId + ');" /></td>';
            _html += '<td> <input id="' + jsonObj[i].LevelId + '" type="button" value="Delete" onclick="LoadForDelete(' + jsonObj[i].LevelId + ');" /></td>';
        });

        if (document.getElementById('divTable').innerHTML == "") {

            _html += '</table>';
            document.getElementById('divTable').innerHTML = _html;
        }
        else {

            $("#tableDiv").append('<tr onclick="GetRowIndex(this.rowIndex);">' + _html + '</tr>');
        }

        $.fn.jQueryMsg({
            msg: msg,
            msgClass: 'alert',
            fx: 'slide',
            speed: 500
        });
    }
}

// Get Row Index of Current Table
function GetRowIndex(rowIndex) {

    glbRowIndex = rowIndex;
}

// Reload Table after updating record(s)
function ReloadExistingTable() {

    document.getElementById('tableDiv').rows[glbRowIndex].cells[1].innerText = $('#txtLevelName').val();
    document.getElementById('tableDiv').rows[glbRowIndex].cells[2].innerText = $('#txtLevelDescription').val();
    document.getElementById('tableDiv').rows[glbRowIndex].cells[3].innerText = $('#chkActive').attr("checked");
}

// Reload Table after deleting record(s)
function RefreshExistingTable() {

    table = document.getElementById('tableDiv');
    rowCount = table.rows.length;

    table.deleteRow(glbRowIndex);
    rowCount--;
}

// Button Click Event
function btnSaveClicked() {

    var isValidated = $("#form1").validate({
        rules: {
            txtLevelCode: {
                required: true
            },
            txtLevelName: {
                required: true
            },
            txtLevelDescription: {
                required: true
            }
        }
    });

    if (!$("#form1").valid()) {
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
    return false;
}
function btnYesClicked() {

    myData = "{'levelId':'" + glbVarLevelId + "','levelName':'" + glbVarHierarchyValue + "'}";

    $.ajax({
        type: "POST",
        url: "DivisionalHierarchy.asmx/DeleteHierarchyLevel",
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
    $('#hdnMode').val("AddMode");
    ClearFields();
    ajaxCompleted();
    return false;
}

// Load Data From GridView
function LoadForEdit(levelId) {

    $('#hdnMode').val("EditMode");
    glbVarLevelId = levelId;
    glbVarHierarchyValue = $('#ddlHierarchyLevel').val();

    myData = "{'levelId':'" + glbVarLevelId + "','levelName':'" + glbVarHierarchyValue + "'}";

    $.ajax({
        type: "POST",
        url: "DivisionalHierarchy.asmx/GetHierarchyLevel",
        data: myData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccessGetHierarchyLevel,
        error: onError,
        beforeSend: startingAjax,
        complete: ajaxCompleted,
        cache: false
    });
}
function onSuccessGetHierarchyLevel(data, status) {

    if (data.d != "") {

        ClearFields();
        jsonObj = jsonParse(data.d);

        $('#txtLevelName').val(jsonObj[0].LevelName);
        $('#txtLevelDescription').val(jsonObj[0].LevelDescription);
        $('#chkActive').attr("checked", jsonObj[0].IsActive);
    }
    if ($('#ddlHierarchyLevel').val() == "Level1") {
        $('#ddlShiftHierarchy').attr('disabled', true);
    } else {
        $('#ddlShiftHierarchy').attr('disabled', false);
    }
}
function LoadForDelete(levelId) {

    $('#hdnMode').val("DeleteMode");
    glbVarLevelId = levelId;
    $('#divConfirmation').jqmShow();
}

// Function
function SaveData() {

    value = $('#ddlHierarchyLevel').val();
    glbVarHierarchyValue = value;

    if (glbVarHierarchyValue != "-1") {

        if (mainHierarachy == "Level1" || mainHierarachy == "Level2" || mainHierarachy == "Level3") {

            if (glbVarHierarchyValue == "Level1") {

                myData = "{'levelName':'" + $('#txtLevelName').val()
                + "','levelDescription':'" + $('#txtLevelDescription').val() + "','isActive':'" + $('#chkActive').attr("checked")
                + "','parentLevelId':'" + -1 + "','LevelName':'" + glbVarHierarchyValue + "'}";
            }
            if (glbVarHierarchyValue == "Level2") {

                parentId = $('#ddl1').val();

                if (parentId > 0) {

                    myData = "{'levelName':'" + $('#txtLevelName').val() + "','levelDescription':'" + $('#txtLevelDescription').val()
                        + "','isActive':'" + $('#chkActive').attr("checked") + "','parentLevelId':'" + parentId + "','LevelName':'" + glbVarHierarchyValue + "'}";
                }
                else {

                    alert('BUH Level must be selected!');
                    return false;
                }
            }
            if (glbVarHierarchyValue == "Level3") {

                parentId = $('#ddl2').val();

                if (parentId > 0) {

                    myData = "{'levelName':'" + $('#txtLevelName').val() + "','levelDescription':'" + $('#txtLevelDescription').val()
                        + "','isActive':'" + $('#chkActive').attr("checked") + "','parentLevelId':'" + parentId + "','LevelName':'" + glbVarHierarchyValue + "'}";
                }
                else {

                    alert('BUH & National Level must be selected!');
                    return false;
                }
            }
            //if (glbVarHierarchyValue == "Level3") {

            //    myData = "{'levelName':'" + $('#txtLevelName').val()
            //    + "','levelDescription':'" + $('#txtLevelDescription').val() + "','isActive':'" + $('#chkActive').attr("checked")
            //    + "','parentLevelId':'" + -1 + "','LevelName':'" + glbVarHierarchyValue + "'}";
            //}
            if (glbVarHierarchyValue == "Level4") {

                parentId = $('#ddl3').val();

                if (parentId > 0) {

                    myData = "{'levelName':'" + $('#txtLevelName').val() + "','levelDescription':'" + $('#txtLevelDescription').val()
                        + "','isActive':'" + $('#chkActive').attr("checked") + "','parentLevelId':'" + parentId + "','LevelName':'" + glbVarHierarchyValue + "'}";
                }
                else {

                    alert('National Level must be selected!');
                    return false;
                }
            }
            if (glbVarHierarchyValue == "Level5") {

                parentId = $('#ddl4').val();

                if (parentId > 0) {

                    myData = "{'levelName':'" + $('#txtLevelName').val()
                        + "','levelDescription':'" + $('#txtLevelDescription').val() + "','isActive':'" + $('#chkActive').attr("checked")
                        + "','parentLevelId':'" + parentId + "','LevelName':'" + glbVarHierarchyValue + "'}";
                }
                else {

                    alert('National & Region Level must be selected!');
                    return false;
                }
            }
            if (glbVarHierarchyValue == "Level6") {

                parentId = $('#ddl5').val();

                if (parentId > 0) {

                    myData = "{'levelName':'" + $('#txtLevelName').val()
                    + "','levelDescription':'" + $('#txtLevelDescription').val() + "','isActive':'" + $('#chkActive').attr("checked")
                    + "','parentLevelId':'" + parentId + "','LevelName':'" + glbVarHierarchyValue + "'}";
                }
                else {

                    alert('National, Region & Zone Level must be selected!');
                    return false;
                }
            }
        }

        if (myData != "") {

            $.ajax({
                type: "POST",
                url: "DivisionalHierarchy.asmx/InsertHierarchy",
                data: myData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccessReloadTable,
                error: onError,
                cache: false
            });
        }
    }
    else {

        alert('Hierarchy must be selected!');
        return false;
    }
}

function UpdateData() {
    jQuery(".loding_box_outer").show();
    glbVarShiftLevelId = $('#ddlShiftHierarchy').val();

    myData = "{'ShiftlevelId':'" + glbVarShiftLevelId + "','levelId':'" + glbVarLevelId + "','levelName':'" + $('#txtLevelName').val()
            + "','levelDescription':'" + $('#txtLevelDescription').val() + "','isActive':'" + $('#chkActive').attr("checked") + "','LevelName':'" + glbVarHierarchyValue + "'}";

    if (myData != "") {

        $.ajax({
            type: "POST",
            url: "DivisionalHierarchy.asmx/UpdateHierarchyWithOtherDetails",
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

    //$('.loding_box_outer').parent().find('.loding_box_outer').show().fadeIn();

    jQuery(".loding_box_outer").hide();
    if (data.d != "") {
  
        if (data.d == "OK") {


            mode = $('#hdnMode').val();
            msg = '';

            if (mode === "AddMode") {

                msg = 'Data inserted succesfully!';

            }
            else if (mode === "EditMode") {
                msg = 'Data updated succesfully!';
                $('#divTable').parent().find('.loding_box_outer').show().fadeOut();
            }
            else if (mode === "DeleteMode") {

                msg = 'Data deleted succesfully!';
                $('#divConfirmation').hide();

            }

            ReloadData();
            $('#hlabmsg').text(msg);
            $('#Divmessage').show();

            ClearFields();
            $('#hdnMode').val("");

            $.fn.jQueryMsg({
                msg: msg,
                msgClass: 'alert',
                fx: 'slide',
                speed: 500
            });
        }
        else if (data.d == "UpdateLevel") {
         
            msg = 'Hierarchy shifted succesfully!';
            ReloadData();
            $('#hlabmsg').text(msg);
            $('#Divmessage').show();
            ClearFields();
            $('#hdnMode').val("");
        }
        else if (data.d == "Duplicate Name!") {

            msg = 'Level already exist! Try different';
            $('#hlabmsg').text(msg);
            $('#Divmessage').show();
            return false;
        }
        else if (data.d == "Not able to delete this level due to linkup.") {

            $('#divConfirmation').hide();
            msg = data.d;
            $('#hlabmsg').text(msg);
            $('#Divmessage').show();
            return false;
        }
        else if (data.d === "ManagerNotAvailable") {
            $('#divConfirmation').hide();
            msg = 'No Employee Record Found aganist This Level!';
            $('#hlabmsg').text(msg);
            $('#Divmessage').show();
            return false;


        }
      
        $.fn.jQueryMsg({
            msg: msg,
            msgClass: 'alert',
            fx: 'slide',
            speed: 500
        });
        //$(window).load(function () {
        //    $(".loader").delay(2000).fadeOut("slow");
        //    $("#overlayer").delay(2000).fadeOut("slow");
        //})
    }
}


////function UpdateData() {

////    myData = "{'levelId':'" + glbVarLevelId + "','levelName':'" + $('#txtLevelName').val()
////            + "','levelDescription':'" + $('#txtLevelDescription').val() + "','isActive':'" + $('#chkActive').attr("checked")
////            + "','LevelName':'" + glbVarHierarchyValue + "'}";

////    if (myData != "") {

////        $.ajax({
////            type: "POST",
////            url: "DivisionalHierarchy.asmx/UpdateHierarchy",
////            data: myData,
////            contentType: "application/json; charset=utf-8",
////            dataType: "json",
////            success: onSuccess,
////            error: onError,
////            beforeSend: startingAjax,
////            complete: ajaxCompleted,
////            cache: false
////        });
////    }
////}
////function onSuccess(data, status) {

////    if (data.d == "OK") {

////        mode = $('#hdnMode').val();
////        msg = '';

////        if (mode === "AddMode") {

////            msg = 'Data inserted succesfully!';
////        }
////        else if (mode === "EditMode") {

////            msg = 'Data updated succesfully!';
////            ReloadExistingTable();
////        }
////        else if (mode === "DeleteMode") {

////            msg = 'Data deleted succesfully!';
////            $('#divConfirmation').jqmHide();
////            RefreshExistingTable();
////        }

////        ClearFields();
////        $('#hdnMode').val("");

////        $.fn.jQueryMsg({
////            msg: msg,
////            msgClass: 'alert',
////            fx: 'slide',
////            speed: 500
////        });
////    }
////    else if (data.d == "Duplicate Name!") {

////        alert('Level already exist! Try different');
////        return false;
////    }
////    else if (data.d == "Not able to delete this record due to linkup.") {

////        $.fn.jQueryMsg({
////            msg: 'Employee is present on this level, so unable to delete this level',
////            msgClass: 'alert',
////            fx: 'slide',
////            speed: 500
////        });

////        $('#divConfirmation').jqmHide();
////    }
////}
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
    //jQuery("#loading").HIDE();
    $('#imgLoading').hide();
}
function ClearFields() {

    $('#txtLevelName').val("");
    $('#txtLevelDescription').val("");
    $('#chkActive').attr("checked", true);
}
function ReloadData() {

    if ($('#ddl5').val() != -1 && $('#ddl5').val() != null) {
        OnChangeddl5();
    }
    else if ($('#ddl4').val() != -1 && $('#ddl4').val() != null) {
        OnChangeddl4();
    }
    else if ($('#ddl3').val() != -1 && $('#ddl3').val() != null) {
        OnChangeddl3();
    }
    else if ($('#ddl2').val() != -1 && $('#ddl2').val() != null) {
        OnChangeddl2();
    }
    else if ($('#ddl1').val() != -1 && $('#ddl1').val() != null) {
        OnChangeddl1();
    }
    else if ($('#ddlHierarchyLevel').val() == "Level1") {
        ShowDropDownList();
    }

}
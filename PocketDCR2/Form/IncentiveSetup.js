//Global variable
var monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];
var myData = "", mode = "", msg = "", jsonObj = "";

//Page load function
function pageLoad() {




    $('.a').hide();
    $('.b').hide();
    $('#btn').hide();

    $('.alert').hide();

    $('#ddltype').change(showhide);


    $('#btnsave').click(InsertData);


    $('#txt_datefrom').change(hideall);


    $('.frame').hide();



    $('.button').bind('click', function () {
        $('.modal').addClass('hide');
    });









}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function hideall() {

    $('.a').hide();
    $('.b').hide();
    $('#btn').hide();
    $('#ddltype').val('-1');

}

function showhide() {


    var type = $('#ddltype').val();
    var year = $('#txt_datefrom').val();

    if (year != "") {

        myData = JSON.stringify({
            year: year,
            status: type

        });


        $.ajax({
            type: "POST",
            url: "IncentiveSetup.asmx/GetPolicies",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
              
                if (data.d !== null && data.d !== '') {
                    // Deserialize the JSON data.d back into an array of objects
                    var jsonObj = JSON.parse(data.d);
                 
                    if (type != 0) {
                        $.each(jsonObj, function (i, item) {
                            // Update the textboxes with the corresponding values from the JSON object
                            $('#txt1' + (i + 1)).val(item.Ach_group);
                            $('#txt2' + (i + 1)).val(item.Ach_Zero);
                            $('#txt3' + (i + 1)).val(item.Ach_full);
                            $('#txt4' + (i + 1)).val(item.Ach_half);
                        });
                    } else {
                        $.each(jsonObj, function (i, item) {
                            // Update the textboxes with the corresponding values from the JSON object
                            $('#txt1' + (i + 1)).val(item.Ach_group);
                            $('#txt2' + (i + 1)).val(item.Ach_Zero);
                            // Clear values of other textboxes if any
                            $('#txt3' + (i + 1)).val('');
                            $('#txt4' + (i + 1)).val('');
                        });
                    }
                } else {

                    for (let i = 1; i <= 12; i++) {
                        $('#txt1' + i).val('');
                        $('#txt2' + i).val('');
                        $('#txt3' + i).val('');
                        $('#txt4' + i).val('');
                    }
                }
            },
            error: function (response) {

                alert(response);

            },
            cache: false
        });
    }
    else {
        alert('Select Year First');
        $('#ddltype').val('-1');
        return;
    }

    if (type == 1) {

        $('.a').show();
        $('.b').show();
        $('#btn').show();
    }
    else if (type == 0) {
        $('.a').show();
        $('.b').hide();
        $('#btn').show();
    }

    else {
        $('.a').hide();
        $('.b').hide();
        $('#btn').hide();

    }
}


function InsertData() {


    var status = $('#ddltype').val();
    var year = $('#txt_datefrom').val();
    if (status == 0) {
        const GroupAchievement = [];
        for (let i = 1; i <= 12; i++) {
            const textBoxValue = document.getElementById("txt1" + i).value;

            if (textBoxValue != null) {

                GroupAchievement.push(textBoxValue);

            }
            else {
                GroupAchievement.push('0');

            }
        }

        const ZeroAchievement = [];
        for (let i = 1; i <= 12; i++) {
            const textBoxValue = document.getElementById("txt2" + i).value;
            if (textBoxValue != null) {

                ZeroAchievement.push(textBoxValue);

            }
            else {
                ZeroAchievement.push('0');

            }
        }

        myData = JSON.stringify({
            GroupAchievement: GroupAchievement,
            ZeroAchievement: ZeroAchievement,
            status: status,
            year: year
        });

        $.ajax({
            type: "POST",
            url: "IncentiveSetup.asmx/InsertNonConfirmData",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: SuccesfullInsert,
            error: function (response) {
                alert(response);
            },
            cache: false
        });
    }
    else {

        const GroupAchievement = [];
        for (let i = 1; i <= 12; i++) {
            const textBoxValue = document.getElementById("txt1" + i).value;
            if (textBoxValue != null) {

                GroupAchievement.push(textBoxValue);

            }
            else {
                GroupAchievement.push('0');

            }
        }

        const ZeroAchievement = [];
        for (let i = 1; i <= 12; i++) {
            const textBoxValue = document.getElementById("txt2" + i).value;
            if (textBoxValue != null) {

                ZeroAchievement.push(textBoxValue);

            }
            else {
                ZeroAchievement.push('0');

            }
        }


        const HalfAchievement = [];
        for (let i = 1; i <= 12; i++) {
            const textBoxValue = document.getElementById("txt4" + i).value;
            if (textBoxValue != null) {

                HalfAchievement.push(textBoxValue);

            }
            else {
                HalfAchievement.push('0');

            }
        }


        const FullAchievement = [];
        for (let i = 1; i <= 12; i++) {
            const textBoxValue = document.getElementById("txt3" + i).value;
            if (textBoxValue != null) {

                FullAchievement.push(textBoxValue);

            }
            else {
                FullAchievement.push('0');

            }
        }


        myData = JSON.stringify({
            GroupAchievement: GroupAchievement,
            ZeroAchievement: ZeroAchievement,
            HalfAchievement: HalfAchievement,
            FullAchievement: FullAchievement,
            status: status,
            year: year
        });

        $.ajax({
            type: "POST",
            url: "IncentiveSetup.asmx/InsertConfirmData",
            data: myData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: SuccesfullInsert,
            error: function (response) {
                alert(response);
            },
            cache: false
        });


    }



}


function openModal() {
    // Create a temporary element (e.g., a div)
    var tempElement = document.createElement("div");

    // Add the necessary attributes for modal triggering
    tempElement.setAttribute("data-toggle", "modal");
    tempElement.setAttribute("data-target", "#success_tic");

    // Append the element to the document (it doesn't need to be visible on the page)
    document.body.appendChild(tempElement);

    // Simulate a click event on the element
    var clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
    });
    tempElement.dispatchEvent(clickEvent);

    // Remove the temporary element from the document
    document.body.removeChild(tempElement);
}



function openFailModal() {
    // Create a temporary element (e.g., a div)
    var tempElement = document.createElement("div");

    // Add the necessary attributes for modal triggering
    tempElement.setAttribute("data-toggle", "modal");
    tempElement.setAttribute("data-target", "#myModal");

    // Append the element to the document (it doesn't need to be visible on the page)
    document.body.appendChild(tempElement);

    // Simulate a click event on the element
    var clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
    });
    tempElement.dispatchEvent(clickEvent);

    // Remove the temporary element from the document
    document.body.removeChild(tempElement);
}



function SuccesfullInsert(data) {

  
    if (data.d != "") {

     

       openModal();

        

    }
    else {

        alert('Data Saving Failed');

        openFailModal();

       
    }

}



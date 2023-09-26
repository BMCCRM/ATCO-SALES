//$(document).ready(function () {
//    $('#george').hide();
//    $('label.tree-toggler').click(function () {
//        $(this).parent().children('ul.tree').toggle(300);
//    });
//});
//function show()
//{
//    $('#george').show();
//    $('#kaplan').css('background-color', '#6495ED');
//}


$(document).ready(function () {
    $('#container2').hide();
    $('#employees').hide();
    $('#regionalmanager').hide();
    $('#employee2').hide();
    $('#employee1').hide();
    $('#manager').hide();
    $('#executive').hide();
    $('label.tree-toggler').click(function () {
        $(this).parent().children('ul.tree').toggle(300);
    });
});
function showexecutive() {
    $('#regionalmanager').hide();
    $('#employees').hide();
    $('#employee1').hide();
    $('#employee2').hide();
    $('#container2').show();
    $('#executive').show();
    $('#manager').show();
    $('#kaplan').show();
    $('#SimsonRozani').show();
    $('#TreverNotts').show();
    $('#TreverNotts').removeClass('col-lg-push-3');
   // $('#TreverNotts').removeClass('col-lg-4');
  //  $('#TreverNotts').addClass('col-lg-6');
    $('#TreverNotts').css('background-color', '');


    $('#SimsonRozani').removeClass('col-lg-push-3');
  //  $('#SimsonRozani').removeClass('col-lg-4');
    $('#SimsonRozani').css('background-color', '');
    //$('#SimsonRozani').addClass('col-lg-6');
    $('#KevenHawes').css('background-color', '#cce5ff');
    $('#KevenHawes').addClass('col-lg-push-3');
}
function show() {
    $('#regionalmanager').hide();
    $('#executive').hide();
    $('#TreverNotts').hide();
    $('#SimsonRozani').hide();
    $('#container2').show();
    $('#kaplan').show();
    $('#manager').show();
   // $('#employees').hide();
    $('#employee1').show();
    $('#employee2').show();
    $('#kaplan').css('background-color', '#cce5ff');
    $('#kaplan').addClass('col-lg-push-2');
}

function trevermanager()
{
    $('#employees').hide();
    $('#SimsonRozani').hide();
    $('#executive').hide();
    $('#SimsonRegionsl1').hide();
    $('#SimsonRegionsl2').hide();
    $('#SimsonRegionsl3').hide();
    $('#SimsonRegionsl4').hide();
    $('#container2').show();
    $('#manager').show();
    $('#TreverNotts').show();
    $('#TreverNotts').css('background-color', '#cce5ff');
    $('#TreverNotts').addClass('col-lg-push-3');
   // $('#TreverNotts').removeClass('col-lg-6');
  //  $('#TreverNotts').addClass('col-lg-4');
    $('#regionalmanager').show();
    $('#TreverRegional1').show();
    $('#TreverRegional2').show();
    $('#TreverRegional3').show();
    $('#TreverRegional4').show();
    $('#TreverRegional1').css('background-color', '');
    $('#TreverRegional1').removeClass('col-lg-push-3');
    $('#TreverRegional1').addClass('col-lg-6');

    $('#TreverRegional2').css('background-color', '');
    $('#TreverRegional2').removeClass('col-lg-push-3');
    $('#TreverRegional2').addClass('col-lg-6');


    $('#TreverRegional3').css('background-color', '');
    $('#TreverRegional3').removeClass('col-lg-push-3');
    $('#TreverRegional3').addClass('col-lg-6');


    $('#TreverRegional4').css('background-color', '');
    $('#TreverRegional4').removeClass('col-lg-push-3');
    $('#TreverRegional4').addClass('col-lg-6');

}

function simsonmanager()
{
    $('#executive').hide();
    $('#TreverNotts').hide();
    $('#employees').hide();
    $('#TreverRegional1').hide();
    $('#TreverRegional2').hide();
    $('#TreverRegional3').hide();
    $('#TreverRegional4').hide();
    $('#container2').show();
    $('#manager').show();
    $('#SimsonRozani').show();
    $('#SimsonRozani').css('background-color', '#cce5ff');
    $('#SimsonRozani').addClass('col-lg-push-3');
   // $('#SimsonRozani').removeClass('col-lg-6');
  //  $('#SimsonRozani').addClass('col-lg-4');
    $('#regionalmanager').show();
    $('#SimsonRegionsl1').show();
    $('#SimsonRegionsl2').show();
    $('#SimsonRegionsl3').show();
    $('#SimsonRegionsl4').show();





    $('#SimsonRegionsl1').css('background-color', '');
    $('#SimsonRegionsl1').removeClass('col-lg-push-3');
    $('#SimsonRegionsl1').addClass('col-lg-6');

    $('#SimsonRegionsl2').css('background-color', '');
    $('#SimsonRegionsl2').removeClass('col-lg-push-3');
    $('#SimsonRegionsl2').addClass('col-lg-6');

    $('#SimsonRegionsl3').css('background-color', '');
    $('#SimsonRegionsl3').removeClass('col-lg-push-3');
    $('#SimsonRegionsl3').addClass('col-lg-6');

    $('#SimsonRegionsl4').css('background-color', '');
    $('#SimsonRegionsl4').removeClass('col-lg-push-3');
    $('#SimsonRegionsl4').addClass('col-lg-6');
}


function RSM1FLM1()
{
    $('#executive').hide();
    $('#TreverNotts').hide();
    $('#SimsonRozani').hide();
    $('#SimsonRegionsl1').hide();
    $('#SimsonRegionsl2').hide();
    $('#SimsonRegionsl3').hide();
    $('#SimsonRegionsl4').hide();
    $('#TreverRegional2').hide();
    $('#TreverRegional3').hide();
    $('#TreverRegional4').hide();
    $('#TreverRegional1').show();
    $('#TFLM1E2').hide();
    $('#TFLM1E3').hide();
    $('#TFLM1E4').hide();
    $('#TFLM1E1').show();
    $('#regional2hierarchy').hide();
    $('#container2').show();
    $('#regionalmanager').show();
    $('#employees').show();
    //$('#regional1hierarchy').show();
    $('#SFLM2E1').hide();
    $('#SFLM2E2').hide();
    $('#SFLM2E3').hide();
    $('#SFLM2E4').hide();
    $('#TFLM1E1').show();
    $('#TreverRegional1').css('background-color', '#cce5ff');
    $('#TreverRegional1').addClass('col-lg-push-3');
  //  $('#TreverRegional1').removeClass('col-lg-6');
   // $('#TreverRegional1').addClass('col-lg-4');
}

function RSM1FLM2() {
    //$('#executive').hide();
    //$('#TreverNotts').hide();
    //$('#SimsonRozani').hide();
    //$('#TreverRegional1').hide();
    //$('#TreverRegional3').hide();
    //$('#TreverRegional4').hide();
    //$('#TreverRegional2').show();
    //$('#TFLM1E1').hide();
    //$('#TFLM1E3').hide();
    //$('#TFLM1E4').hide();
    //$('#TFLM1E2').show();
    //$('#TreverRegional2').css('background-color', '#6495ED');
    //$('#TreverRegional2').addClass('col-lg-push-4');
    //$('#TreverRegional2').removeClass('col-lg-6');
    //$('#TreverRegional2').addClass('col-lg-4');


    $('#executive').hide();
    $('#TreverNotts').hide();
    $('#SimsonRozani').hide();
    $('#SimsonRegionsl1').hide();
    $('#SimsonRegionsl2').hide();
    $('#SimsonRegionsl3').hide();
    $('#SimsonRegionsl4').hide();
    $('#TreverRegional1').hide();
    $('#TreverRegional3').hide();
    $('#TreverRegional4').hide();
    $('#TreverRegional2').show();
    $('#TFLM1E1').hide();
    $('#TFLM1E3').hide();
    $('#TFLM1E4').hide();
    $('#TFLM1E2').show();
    $('#regional2hierarchy').hide();
    $('#container2').show();
    $('#regionalmanager').show();
    $('#employees').show();
    //$('#regional1hierarchy').show();
    $('#SFLM2E1').hide();
    $('#SFLM2E2').hide();
    $('#SFLM2E3').hide();
    $('#SFLM2E4').hide();
    $('#TFLM1E2').show();
    $('#TreverRegional2').css('background-color', '#cce5ff');
    $('#TreverRegional2').addClass('col-lg-push-3');
  //  $('#TreverRegional2').removeClass('col-lg-6');
   // $('#TreverRegional2').addClass('col-lg-4');
}

function RSM1FLM3() {
    //$('#executive').hide();
    //$('#TreverNotts').hide();
    //$('#SimsonRozani').hide();
    //$('#TreverRegional2').hide();
    //$('#TreverRegional1').hide();
    //$('#TreverRegional4').hide();
    //$('#TreverRegional3').show();
    //$('#TFLM1E1').hide();
    //$('#TFLM1E2').hide();
    //$('#TFLM1E4').hide();
    //$('#TFLM1E3').show();
    //$('#TreverRegional3').css('background-color', '#6495ED');
    //$('#TreverRegional3').addClass('col-lg-push-4');
    //$('#TreverRegional3').removeClass('col-lg-6');
    //$('#TreverRegional3').addClass('col-lg-4');




    $('#executive').hide();
    $('#TreverNotts').hide();
    $('#SimsonRozani').hide();
    $('#SimsonRegionsl1').hide();
    $('#SimsonRegionsl2').hide();
    $('#SimsonRegionsl3').hide();
    $('#SimsonRegionsl4').hide();
    $('#TreverRegional1').hide();
    $('#TreverRegional2').hide();
    $('#TreverRegional4').hide();
    $('#TreverRegional3').show();
    $('#TFLM1E1').hide();
    $('#TFLM1E3').hide();
    $('#TFLM1E4').hide();
    $('#TFLM1E2').show();
    $('#regional2hierarchy').hide();
    $('#container2').show();
    $('#regionalmanager').show();
    $('#employees').show();
    //$('#regional1hierarchy').show();
    $('#SFLM2E1').hide();
    $('#SFLM2E2').hide();
    $('#SFLM2E3').hide();
    $('#SFLM2E4').hide();
    $('#TFLM1E1').hide();
    $('#TFLM1E2').hide();
    $('#TFLM1E4').hide();
    $('#TFLM1E3').show();
    $('#TreverRegional3').css('background-color', '#cce5ff');
    $('#TreverRegional3').addClass('col-lg-push-3');
   // $('#TreverRegional3').removeClass('col-lg-6');
   // $('#TreverRegional3').addClass('col-lg-4');
}

function RSM1FLM14() {
    //$('#executive').hide();
    //$('#TreverNotts').hide();
    //$('#SimsonRozani').hide();
    //$('#TreverRegional2').hide();
    //$('#TreverRegional3').hide();
    //$('#TreverRegional1').hide();
    //$('#TreverRegional4').show();
    //$('#TFLM1E1').hide();
    //$('#TFLM1E2').hide();
    //$('#TFLM1E3').hide();
    //$('#TFLM1E4').show();
    //$('#TreverRegional4').css('background-color', '#6495ED');
    //$('#TreverRegional4').addClass('col-lg-push-4');
    //$('#TreverRegional4').removeClass('col-lg-6');
    //$('#TreverRegional4').addClass('col-lg-4');



    $('#executive').hide();
    $('#TreverNotts').hide();
    $('#SimsonRozani').hide();
    $('#SimsonRegionsl1').hide();
    $('#SimsonRegionsl2').hide();
    $('#SimsonRegionsl3').hide();
    $('#SimsonRegionsl4').hide();
    $('#TreverRegional1').hide();
    $('#TreverRegional3').hide();
    $('#TreverRegional2').hide();
    $('#TreverRegional4').show();
    $('#TFLM1E1').hide();
    $('#TFLM1E3').hide();
    $('#TFLM1E4').hide();
    $('#TFLM1E4').show();
    $('#regional2hierarchy').hide();
    $('#container2').show();
    $('#regionalmanager').show();
    $('#employees').show();
    //$('#regional1hierarchy').show();
    $('#SFLM2E1').hide();
    $('#SFLM2E2').hide();
    $('#SFLM2E3').hide();
    $('#SFLM2E4').hide();
    $('#TFLM1E1').hide();
    $('#TFLM1E2').hide();
    $('#TFLM1E3').hide();
    $('#TFLM1E4').show();
    $('#TreverRegional4').css('background-color', '#cce5ff');
    $('#TreverRegional4').addClass('col-lg-push-3');
   // $('#TreverRegional4').removeClass('col-lg-6');
   // $('#TreverRegional4').addClass('col-lg-4');
}





function RSM2FLM1() {
    $('#executive').hide();
    $('#TreverNotts').hide();
    $('#TreverRegional1').hide();
    $('#TreverRegional2').hide();
    $('#TreverRegional3').hide();
    $('#TreverRegional4').hide();
    $('#SimsonRozani').hide();
    $('#SimsonRegionsl2').hide();
    $('#SimsonRegionsl3').hide();
    $('#SimsonRegionsl4').hide();
    $('#SFLM2E2').hide();
    $('#SFLM2E3').hide();
    $('#SFLM2E4').hide();
    $('#TFLM1E2').hide();
    $('#TFLM1E3').hide();
    $('#TFLM1E4').hide();
    $('#TFLM1E1').hide();
    $('#regional1hierarchy').hide();
    $('#container2').show();
    $('#regionalmanager').show();
    $('#employees').show();
    $('#SimsonRegionsl1').show();
    $('#SFLM2E1').show();
    $('#SFLM1E11').show();
    $('#SFLM1E12').show();
    $('#SFLM1E13').show();
    $('#SFLM1E14').show();
    $('#SimsonRegionsl1').css('background-color', '#cce5ff');
    $('#SimsonRegionsl1').addClass('col-lg-push-3');
   // $('#SimsonRegionsl1').removeClass('col-lg-6');
 //   $('#SimsonRegionsl1').addClass('col-lg-4');
}

function RSM2FLM2() {
    $('#executive').hide();
    $('#TreverNotts').hide();
    $('#TreverRegional1').hide();
    $('#TreverRegional2').hide();
    $('#TreverRegional3').hide();
    $('#TreverRegional4').hide();
    $('#SimsonRozani').hide();
    $('#SimsonRegionsl1').hide();
    $('#SimsonRegionsl3').hide();
    $('#SimsonRegionsl4').hide();
    $('#SFLM2E1').hide();
    $('#SFLM2E3').hide();
    $('#SFLM2E4').hide();
    $('#TFLM1E2').hide();
    $('#TFLM1E3').hide();
    $('#TFLM1E4').hide();
    $('#TFLM1E1').hide();
    $('#regional1hierarchy').hide();
    $('#container2').show();
    $('#regionalmanager').show();
    $('#employees').show();
    $('#SimsonRegionsl2').show();
    $('#SFLM2E2').show();
    //$('#SFLM1E11').show();
    //$('#SFLM1E12').show();
    //$('#SFLM1E13').show();
    //$('#SFLM1E14').show();
    $('#SimsonRegionsl2').css('background-color', '#cce5ff');
    $('#SimsonRegionsl2').addClass('col-lg-push-3');
  //  $('#SimsonRegionsl2').removeClass('col-lg-6');
   // $('#SimsonRegionsl2').addClass('col-lg-4');
}

function RSM2FLM3() {
    $('#executive').hide();
    $('#TreverNotts').hide();
    $('#TreverRegional1').hide();
    $('#TreverRegional2').hide();
    $('#TreverRegional3').hide();
    $('#TreverRegional4').hide();
    $('#SimsonRozani').hide();
    $('#SimsonRegionsl1').hide();
    $('#SimsonRegionsl2').hide();
    $('#SimsonRegionsl4').hide();
    $('#SFLM2E1').hide();
    $('#SFLM2E2').hide();
    $('#SFLM2E4').hide();
    $('#TFLM1E2').hide();
    $('#TFLM1E3').hide();
    $('#TFLM1E4').hide();
    $('#TFLM1E1').hide();
    $('#regional1hierarchy').hide();
    $('#container2').show();
    $('#regionalmanager').show();
    $('#employees').show();
    $('#SimsonRegionsl3').show();
    $('#SFLM2E3').show();
    //$('#SFLM1E11').show();
    //$('#SFLM1E12').show();
    //$('#SFLM1E13').show();
    //$('#SFLM1E14').show();
    $('#SimsonRegionsl3').css('background-color', '#cce5ff');
    $('#SimsonRegionsl3').addClass('col-lg-push-3');
  //  $('#SimsonRegionsl3').removeClass('col-lg-6');
   // $('#SimsonRegionsl3').addClass('col-lg-4');
}

function RSM2FLM14() {
    $('#executive').hide();
    $('#TreverNotts').hide();
    $('#TreverRegional1').hide();
    $('#TreverRegional2').hide();
    $('#TreverRegional3').hide();
    $('#TreverRegional4').hide();
    $('#SimsonRozani').hide();
    $('#SimsonRegionsl1').hide();
    $('#SimsonRegionsl2').hide();
    $('#SimsonRegionsl3').hide();
    $('#SFLM2E1').hide();
    $('#SFLM2E2').hide();
    $('#SFLM2E3').hide();
    $('#TFLM1E2').hide();
    $('#TFLM1E3').hide();
    $('#TFLM1E4').hide();
    $('#TFLM1E1').hide();
    $('#regional1hierarchy').hide();
    $('#container2').show();
    $('#regionalmanager').show();
    $('#employees').show();
    $('#SimsonRegionsl4').show();
    $('#SFLM2E4').show();
    //$('#SFLM1E11').show();
    //$('#SFLM1E12').show();
    //$('#SFLM1E13').show();
    //$('#SFLM1E14').show();
    $('#SimsonRegionsl4').css('background-color', '#cce5ff');
    $('#SimsonRegionsl4').addClass('col-lg-push-3');
  //  $('#SimsonRegionsl4').removeClass('col-lg-6');
  //  $('#SimsonRegionsl4').addClass('col-lg-4');
}
$(document).ready(function () {
    $('ul.list-inline').toggle();
    $('label.nav-toggle span').click(function () {
        $(this).parent().parent().children('ul.list-inline').toggle(300);
        var cs = $(this).attr("class");
        if (cs == 'nav-toggle-icon glyphicon glyphicon-chevron-right') {
            $(this).removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-down');
        }
        if (cs == 'nav-toggle-icon glyphicon glyphicon-chevron-down') {
            $(this).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
        }
    });
});

$(document).ready(function() {

    $('.button-toggle').click(function() {
        var target = $(this).attr('data-target');
        $(this).toggleClass('opened');
        if ($(this).hasClass('opened')) {
            $(target).fadeIn(300);
        } else {
            $(target).fadeOut(300);
        }
    });
});

$(function() {
    var pull = $('#pull');
    menu = $('.menu-wrap ul');
    menuHeight = menu.height();

    $(pull).on('click', function(e) {
        e.preventDefault();
        menu.slideToggle();
    });

    $(window).resize(function() {
        var w = $(window).width();
        if (w > 320 && menu.is(':hidden')) {
            menu.removeAttr('style');
        }
    });
});

$(window).load(function() {

    $('.user_info-data-inp-year').fancySelect();
    $('.user_info-data-inp-mon').fancySelect();
    $('.user_info-data-inp-numb').fancySelect();

    if ($(window).width() > 480) {
        $('.naw-button').trigger('click');
    }

    $("#accordion-sample").accordion();

    // Hover states on the static widgets
    $("#dialog-link, #icons li").hover(
        function() {
            $(this).addClass("ui-state-hover");
        },
        function() {
            $(this).removeClass("ui-state-hover");
        }
    )
});

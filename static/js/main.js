$(function () {
    var global = {};
    $('#customer, #employee').on('click', function(e) {
        global.year = $("#year").val();
        global.month = $("#month").val().replace(/\b(0+)/gi, "");
        global.day = $("#day").val().replace(/\b(0+)/gi, "");
        if (!global.year || !global.month || !global.day || global.year < 2009) {
            $('.error-tip').fadeIn();
            return;
        }
        global.date = global.year + '-' + global.month + '-' + global.day;
        var dateTime = (new Date(global.date)).getTime();
        var startTime = (new Date('2009-10-19')).getTime();
        var nowTime = (new Date()).getTime();
        if (dateTime < startTime || nowTime < dateTime) {
            $('.error-tip').fadeIn();
            return;
        }
        global.distanceDay = Math.floor((nowTime - dateTime) / 864e5);
        global.currentType = e.currentTarget.id;
        $('.day-number').text(global.distanceDay);
        $('#page2 .slogan').attr('type', global.currentType);
        $('#page3 .result').attr('type', global.currentType);
        $('#page1').fadeOut();
        $('#page2').fadeIn();
    });

    $('.error-tip').on('click', function () {
        $(this).fadeOut();
    });

    $('.go-back').on('click', function(){
        $('#page1').fadeIn();
        $('#page2').fadeOut();
        $('#page3').fadeOut();
    });

    $('#page2 .to-image').on('click', function() {
        $('#page3').fadeIn();
        $('#page2').fadeOut();
    });

    var t = $(window).width(), n = ($(window).height(), t / 10);
    n = 80 < n ? 80 : n, $("html").attr("style", "font-size:" + n + "px")
});

$(function () {
    var global = {};
    $('#customer-button, #employee-button').on('click', function(e) {
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
        $('#page1').fadeOut();
        if (global.currentType === 'customer-button') {
            $('#page2').fadeIn();
        } else {
            $('#page3').fadeIn();
        }
    });

    $('.error-tip').on('click', function () {
        $(this).fadeOut();
    });

    $('.back').on('click', function(){
        $('#page1').fadeIn();
        $('#page2').fadeOut();
        $('#page3').fadeOut();
    });

    $('#page2 .toImage').on('click', function() {
        $('#page4').fadeIn();
        $('#page2').fadeOut();
    });

    $('#page3 .toImage').on('click', function() {
        $('#page5').fadeIn();
        $('#page3').fadeOut();
    });


    $(".p2btn-1").bind("click", function () {
        !function () {
            var t = $("#canvascapture")[0], e = t.offsetWidth, n = t.offsetHeight, a = document.createElement("canvas");
            a.width = 2 * e, a.height = 2 * n, a.getContext("2d").scale(2, 2), html2canvas(t, {
                scale: 1,
                canvas: a,
                width: e,
                height: n,
                useCORS: !0
            }).then(function (t) {
                var e = t.getContext("2d");
                e.mozImageSmoothingEnabled = !1, e.webkitImageSmoothingEnabled = !1, e.msImageSmoothingEnabled = !1, e.imageSmoothingEnabled = !1;
                var n = Canvas2Image.convertToJPEG(t, t.width, t.height);
                n.src;
                $(".p3").append(n), $(n).css({
                    width: t.width + "px",
                    height: t.height + "px",
                    ondragstart: "return false;",
                    "data-type": "bitmap"
                }).addClass("f-full"), $(n).attr({
                    ondragstart: "return false;",
                    "data-type": "bitmap"
                }), $("#canvascapture").addClass("disno")
            })
        }();
        $(".p2").fadeOut();
    });




    $(".conform-button").bind("click", function () {
        if (e.year = $("#year").val(), e.month = $("#month").val().replace(/\b(0+)/gi, ""), e.day = $("#day").val().replace(/\b(0+)/gi, ""), !e.year || !e.month || !e.day) return console.log("空值"), $(".wrongtip").fadeIn(), !1;
        if (e.date = e.year + "-" + e.month + "-" + e.day, console.log(e.date), !function (t, e, n) {
            var a = new Date(t), i = new Date(e), o = new Date(n), r = o.getTime() - a.getTime(),
              d = Math.floor(r / 864e5), s = i.getTime() - o.getTime();
            if (Math.floor(s / 864e5) < 0) return console.log(1), $(".wrongtip").fadeIn(), !1;
            if (d < 0) return console.log(2), $(".wrongtip").fadeIn(), !1;
            return !0
        }("1921-7-1", " 2020-7-1", e.date)) return $(".wrongtip").fadeIn(), !1;
        var t = function (t, e) {
            var n, a, i;
            return n = t.split("-"), a = new Date(n[0], n[1] - 1, n[2]), n = e.split("-"), i = i = new Date(n[0], n[1] - 1, n[2]), parseInt(Math.abs(a - i) / 1e3 / 60 / 60 / 24)
        }("2020-7-1", e.date);
        console.log(t + 1), $(".alldaynum").html(t + 1), $(".share-title").html("今天是我入党的第" + (t + 1) + "天，你呢？"), $(".p1 ").fadeOut(), $("body").append('<script type="text/javascript" src="./js/wxShare.js"><\/script>')
    });
    var t = $(window).width(), n = ($(window).height(), t / 10);
    n = 80 < n ? 80 : n, $("html").attr("style", "font-size:" + n + "px")
});

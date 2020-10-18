$(function () {
    var global = {
        step: 1,
    };
    $('#customer, #employee').on('click', function(e) {
        global.year = $("#year").val();
        global.month = $("#month").val().replace(/\b(0+)/gi, "");
        global.day = $("#day").val().replace(/\b(0+)/gi, "");
        if (!global.year || !global.month || !global.day || global.year < 2009) {
            $('.error-tip').fadeIn();
            return;
        }
        global.date = global.year + '/' + global.month + '/' + global.day;
        var dateTime = (new Date(global.date)).getTime();
        var startTime = (new Date('2009/10/19')).getTime();
        var nowTime = (new Date()).getTime();
        if (dateTime < startTime || nowTime < dateTime) {
            $('.error-tip').fadeIn();
            return;
        }
        global.distanceDay = Math.floor((nowTime - dateTime) / 864e5);
        global.currentType = e.currentTarget.id;
        $('.day-number').text(global.distanceDay);
        $('.share-substr').html('今天是我加入花村行的第' + global.distanceDay + '天，你呢？');
        $('#page2 .slogan').attr('type', global.currentType);
        $('#page3 .result').attr('type', global.currentType);
        $('#page1').fadeOut();
        $('#page2').fadeIn();
        global.step = 2;
    });

    $('.error-tip').on('click', function () {
        $(this).fadeOut();
    });

    $('#page2 .go-back').on('click', function(){
        $('#page1').fadeIn();
        $('#page2').fadeOut();
        $('#page3').fadeOut();
        global.step = 1;
    });

    $('#page2 .to-image').on('click', function() {
        $('#page3').fadeIn();
        $('#page2').fadeOut();
        $('.save-tip').fadeIn();
        global.step = 3;
    });

    var t = $(window).width(), n = ($(window).height(), t / 10);
    n = 80 < n ? 80 : n, $("html").attr("style", "font-size:" + n + "px");

    // 长按方法
    $.fn.longPress = function(fn) {
        var timeout = 0;
        var $this = this;
        for (var i = 0; i < $this.length; i++) {
            var tempIndex = i;
            $this[tempIndex].addEventListener('touchstart', function() {
                timeout = setTimeout(fn, 800); // 长按时间超过800ms，则执行传入的方法
            }, false);
            $this[tempIndex].addEventListener('touchend', function () {
                clearTimeout(timeout); // 长按时间少于800ms，不会执行传入的方法
            }, false);
        }
    };

    function canvas2Image(canvas) {
        var img = document.createElement('img');
        img.src = canvas.toDataURL('image/jpeg');  // 可以根据需要更改格式
        return img;
    }

    function save2Image() {
        // 想要保存的图片节点
        var dom = document.getElementById('page3');

        // 创建一个新的canvas
        var Canvas = document.createElement('canvas');
        var width = $('#page3').width();  // 可见屏幕的宽
        var height = $('#page3').height();  // 可见屏幕的高
        console.log(width, height);
        var scale = window.devicePixelRadio || 1;  // 设备的devicePixelRadio

        // 将Canvas画布放大scale倍，然后放在小的屏幕里，解决模糊问题
        Canvas.width = width * scale;
        Canvas.height = height * scale;
        Canvas.getContext('2d').scale(scale, scale);

        html2canvas(dom, {
            canvas: Canvas,
            scale: scale,
            backgroundColor: 'transparent',
            allowTaint: true,
            useCORS: true,
            logging: true,
            width: width,
            height: height,
        }).then(function(canvas) {
            var context = canvas.getContext('2d');
            // 关闭抗锯齿形
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;
            // canvas转化为图片
            var resultImage = canvas2Image(canvas, canvas.width, canvas.height);
            resultImage.classList = ['result-image'];
            resultImage.style.cssText = "width:100%;height:100%;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;z-index:100";
            document.body.appendChild(resultImage);
        });
    }

    $('#capture').longPress(function() {
        if (global.step === 3 && !$('img.result-image').length) {
            save2Image();
        }
    });
});

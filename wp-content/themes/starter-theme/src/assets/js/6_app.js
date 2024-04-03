(function ($) {
    if (window.location.href.indexOf("#form") > -1) {


        setTimeout(function () {
            $(".formbtn").click();
        }, 100);
    }

    if ($('.features').length) {

        var scrollcheck = $('.features');
    } else {
        var scrollcheck = $('.topscroll');
    }

    $.fn.isInViewport = function () {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    function scrollCheckMobile() {
        var winScrollTop = $(window).scrollTop();
        var distance = scrollcheck.offset().top - 120;
        if (winScrollTop < distance) {
            var firstTop = $('.image_const').offset().top;
            var shiftDistance = (firstTop - winScrollTop) * 0.4;
            $('.mobilebg').css({
                "transform": "translateY(" + shiftDistance + "px)"
            });
        }
    };

    function scrollCheck() {
        var winScrollTop = $(window).scrollTop();
        var distance = scrollcheck.offset().top;
        if (winScrollTop < distance) {
            var firstTop = $('.image_const').offset().top;
            var shiftDistance = (firstTop - winScrollTop) * 0.15;
            $('.desktopbg').css({
                "transform": "translateY(" + shiftDistance + "px)"
            });
        }
    };

    /*$(window).on('resize', function() {
        var target = $('.mobileslick');
        if (target.hasClass('slick-initialized'))
            target.unslick();
        });*/

    window.onload = function () {


        var rellax = new Rellax('.rellax', {center: true});
        if ($('.features').length) {

            $(".imageframe_parallax").addClass("loaded");

            var lazyLoadVideos = $('[data-lazy_video_url]');

            if (lazyLoadVideos.length) {
                lazyLoadVideos.each(function (i, e) {
                    e.querySelector('source').src = e.dataset.lazy_video_url;
                    e.load();
                });
            }

            /*$('.feature2 source').attr('src', '/images/feature_2.mp4');
            $(".feature2")[0].load();

            $('.feature3 source').attr('src', '/images/feature_3.mp4');
            $(".feature3")[0].load();

            $('.feature4 source').attr('src', '/images/feature_4.mp4');
            $(".feature4")[0].load();*/
        }

    }
    $(document).ready(function () {
        scrollCheck();
        scrollCheckMobile();
        /*if ($(window).width() > 767) {} else {
            console.log('slick init');
            $('.mobileslick').slick({
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
            });
        }*/
        // var rellax = new Rellax('.rellax', {
        // 	center: true
        // });
        if ($(window).width() > 1024) {
        }
    });
    $(window).scroll(function () {
        scrollCheck();
        scrollCheckMobile();
    });
    $(document).on('click', '.btnslide1', function (event) {
        var slider = $('.mobileslick');
        slider[0].slick.slickGoTo(parseInt(0));
    });
    $(document).on('click', '.btnslide2', function (event) {
        var slider = $('.mobileslick');
        slider[0].slick.slickGoTo(parseInt(1));
    });
    $(document).on('click', '.btnslide3', function (event) {
        var slider = $('.mobileslick');
        slider[0].slick.slickGoTo(parseInt(2));
    });
    $(document).on('click', '.btnslide4', function (event) {
        var slider = $('.mobileslick');
        slider[0].slick.slickGoTo(parseInt(3));
    });
    $(document).on('click', '.formbtn', function (event) {
        event.preventDefault();
        if ($(window).width() < 768) {
            $('html, body').animate({
                scrollTop: $("#form").offset().top
            }, 500);
        }
    });

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    /*let mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {*/
    ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
            var points = gsap.utils.toArray('.videoframe_vh');
            var indicators = gsap.utils.toArray('.indicator');
            var height = 110 * (points.length - 1);
            var windowheight = $(window).height() / 1.2;
            let tl = gsap.timeline({
                duration: points.length,
                scrollTrigger: {
                    trigger: ".features",
                    start: "center center",
                    end: "+=" + height + "%",
                    scrub: true,
                    id: "points",
                    markers: false
                }
            })
            var pinner = gsap.timeline({
                scrollTrigger: {
                    trigger: ".features .container",
                    start: "top top",
                    end: "+=" + height + "%",
                    scrub: true,
                    pin: ".features .container",
                    pinSpacing: true,
                    id: "pinning",
                    markers: false
                }
            })
            points.forEach(function (elem, i) {
                gsap.set(elem, {
                    position: "absolute",
                    top: 0
                });
                tl.to(indicators[i], {
                    backgroundColor: "orange",
                    duration: 0.25
                }, i)
                if (i != 0) {
                    tl.from(elem.querySelector('video'), {
                        autoAlpha: 0
                    }, i - 0.1)
                    tl.from(elem.querySelector('article'), {
                        translateY: windowheight
                    }, i)
                }
                tl.addLabel('position-' + i)
                if (i != points.length - 1) {
                    tl.to(indicators[i], {
                        backgroundColor: "#adadad",
                        duration: 0.25
                    }, i + 0.75)
                    tl.to(elem.querySelector('article'), {
                        translateY: -windowheight
                    }, i + 0.75)

                }
            });
            $(document).on('click', '.formbtn', function (event) {
                event.preventDefault();
                if ($(window).width() < 768) {
                } else {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: tl.scrollTrigger.labelToScroll(`position-${4}`)
                    });
                }
            });
            indicators.forEach(function (indicator, i) {
                indicator.addEventListener('click', function () {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: tl.scrollTrigger.labelToScroll(`position-${i}`)
                    });
                })
            })
            return () => {
                console.log('kill');
                tl.kill();
                pinner.kill();
            };
        }
    });

    function slickInit(status) {
        var slider = $('.mobileslick');

        if (status) {
            if (!slider.hasClass('slick-initialized')) {
                slider.slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                });
            }
        } else {
            if (slider.hasClass('slick-initialized')) {
                slider.removeClass('slick-initialized slick-slider').slick("unslick");
            }
        }
    }

    window.addEventListener('resize', function (event) {
        if (window.matchMedia("(max-width: 767px)").matches) {
            slickInit(true);
        } else {
            slickInit(false);
        }
    }, true);

})(jQuery);

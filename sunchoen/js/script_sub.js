$(document).ready(function() {
    // 네비게이션
    $('.fadeIn').mouseover(function() {
        $('.submenu-bg').stop().fadeIn(200);
        $(this).children('.submenu-wrap').stop().fadeIn(200);
    })
    $('.fadeIn').mouseout(function() {
        $('.submenu-bg').stop().fadeOut(200);
        $(this).children('.submenu-wrap').stop().fadeOut(200);
    })

    // 글로벌네비게이션
    var $topNavSub = $('.gnb_menu');
    $topNavSub.find('.open_gnb_sub').on('click', function() {
        if ($(this).parent('li').is('.active')) {
            $(this).siblings('ul').stop().slideUp(100, function() {
                $(this).parent('li').removeClass('active');
            });
        } else {
            $(this).siblings('ul').stop().slideDown(100, function() {
                $(this).parent('li').addClass('active');
            });
        }
    });

    $('.gnb_menu a').click(function(e) {
        e.preventDefault();
    })
})
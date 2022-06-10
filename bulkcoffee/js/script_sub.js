$(document).ready(function() {
    // 네비게이션
    $('.slide_effect').hover(
        function() {
            $('.submenu').stop().slideDown(300);
            $('.menu_bg').stop().slideDown(300);
    },  function() {
            $('.submenu').stop().slideUp(300);
            $('.menu_bg').stop().slideUp(300);
    })

    // 버튼 슬라이드
    var width = 960
    var $imgs = $('.recommend > ul');
    var currentSlide = 2;
    var animationSpeed = 300;
    var $slides = $('.recommend > ul > li')
    $('.prev_btn').on('click', function() {
        $imgs.animate({ 'margin-left': '+=' + width + 'px' }, animationSpeed, function() {
            if (--currentSlide == 1) {
                currentSlide = $slides.length/3 - 1;
                $imgs.css('margin-left', -($slides.length/3 - 2) * width + 'px');
            }
        });
    })
    
    $('.next_btn').on('click', function() {
        $imgs.animate({ 'margin-left': '-=' + width + 'px' }, animationSpeed, function() {
            if (++currentSlide == $slides.length/3) {
                currentSlide = 2;
                $imgs.css('margin-left', -width + 'px' );
            }
        });
    })

    function initSlider(){
		$imgs.css('margin-left',-width + 'px');
	}
    window.setInterval(function() {
        $imgs.stop().animate({ 'margin-left' : '-=' + width + 'px'  }, animationSpeed, function() {
            if (++currentSlide == $slides.length/3) { // $slides.length == 5
                currentSlide = 2;
                $imgs.css('margin-left', -width + 'px' );
            }
        })
    }, 10000);

    initSlider()

    var $beverage_button = $('#beverage');
    var $coffee_button = $('#coffee');
    var $sparkling_ade_button = $('#sparkling-ade');
    var $yogurt_smoothie_button = $('#yogurt-smoothie');
    var $prappet_button = $('#prappet');
    var $tea_button = $('#tea');
    var $menu_list = $('.menu-list > li');
    var $more_button = $('.more-box > a');
    var $more_box = $('.more-box');

    $coffee_button.click(function() {
        var checked = $coffee_button.is(':checked');

        if(checked) {
            $menu_list.css({'display' : 'none'});
            $('.coffee').css({'display' : 'block'})
            $more_box.hide();
        }
    })
    $beverage_button.click(function() {
        var checked = $beverage_button.is(':checked')

        if(checked) {
            $menu_list.css({'display' : 'none'});
            $('.beverage').css({'display' : 'block'})
            $more_box.hide();
        }
    })
    $sparkling_ade_button.click(function() {
        var checked = $sparkling_ade_button.is(':checked')

        if(checked) {
            $menu_list.css({'display' : 'none'});
            $('.sparkling-ade').css({'display' : 'block'})
            $more_box.hide();
        }
    })
    $yogurt_smoothie_button.click(function() {
        var checked = $yogurt_smoothie_button.is(':checked')

        if(checked) {
            $menu_list.css({'display' : 'none'});
            $('.yogurt-smoothie').css({'display' : 'block'})
            $more_box.hide();
        }
    })
    $prappet_button.click(function() {
        var checked = $prappet_button.is(':checked')

        if(checked) {
            $menu_list.css({'display' : 'none'});
            $('.prappet').css({'display' : 'block'})
            $more_box.hide();
        }
    })
    $tea_button.click(function() {
        var checked = $tea_button.is(':checked')

        if(checked) {
            $menu_list.css({'display' : 'none'});
            $('.tea').css({'display' : 'block'})
            $more_box.hide();
        }
    })

    $more_button.on('click', function(e) {
        e.preventDefault();
        $menu_list.css({'display' : 'block'});
        $more_box.hide();
    })

})

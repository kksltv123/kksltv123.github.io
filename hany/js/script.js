$(document).ready(function() {
    // 네비게이션
    $('.fadeIn').mouseover(function() {
        $(this).children('.submenu_bg').stop().fadeIn(200);
        $(this).children('.submenu_bg').children('.submenu').stop().fadeIn(200);
    })
    $('.fadeIn').mouseout(function() {
        $(this).children('.submenu_bg').stop().fadeOut(200);
        $(this).children('.submenu_bg').children('.submenu').stop().fadeIn(200);
    })

    // 슬라이드
	var width = 100 // 슬라이드 한 개의 폭
	var animationSpeed = 200; // 화면전환 속도
	var pause = 10000; // 화면전환 후 일시 정지 속도

	var currentSlide = 2; // 초기 슬라이드 
	var interval;
	var dotNum;
	var dMinusC;

	// Caching DOM elements
	var $slideUl = $('#slides');
	var $slides = $('.slide');
	var $dots = $('.slider-nav-dot');

	function initSlider(){
		$slideUl.css('margin-left',-width + '%' );
	}


	function startSlider(action, dotNum) {
        if(action == 'dot') {
			dMinusC = dotNum-currentSlide;
			currentSlide = dotNum;

			for(var i=0; i < $dots.length; i++){ $dots[i].style.background = ""; }
			$dots[currentSlide-2].style.background = "#3f6acc";

			$slideUl.animate({ 'margin-left': '-=' + (dMinusC * width + '%') }, animationSpeed);

		} else {
			interval = setInterval(function() {
				$slideUl.stop().animate({ 'margin-left' : '-=' + width + '%'  }, animationSpeed, function() {
					if (++currentSlide == $slides.length) { // $slides.length == 5
						currentSlide = 2;
						$slideUl.css('margin-left', -width + '%' );
					}

					for(var i = 0; i < $dots.length; i++) { $dots[i].style.background = ""; }
					$dots[currentSlide-2].style.background = "#3f6acc";
				});	
			}, pause);
		}

	}

	function pauseSlider() {
		clearInterval(interval);
	}
	function dotSelected(){
		dotNum = $(this).attr('id');
		dotNum = parseInt(dotNum.substring(7))+1;
		startSlider('dot', dotNum);
	}


	$slideUl
		.on('mouseenter', pauseSlider)
		.on('mouseleave', startSlider);

	$dots
		.on('click', dotSelected)
		.on('mouseenter', pauseSlider)
		.on('mouseleave', startSlider);		

	
	initSlider();
	startSlider();

	// 스크롤링 효과
	var $hany = $('#hany_txt')
	var timer; 

	document.addEventListener('scroll', function(e) {
        if(!timer){
            timer = setTimeout(function() {
                timer = null;
                if(window.scrollY < 900){
                    $hany.css({'font-size' : '50px'});
                }
                if(window.scrollY > 900){
                    $hany.css({'font-size' : '55px'});
                }
                if(window.scrollY > 950){
					$hany.css({'font-size' : '60px'});
                }
            }, 100);
        }
    }); 

	// 모달창
	var $all_menu = $('.btn-allmenu');
	var $modal_layer = $('.modal-layer');
	var $btnClose = $('.btnClose');
	var $modal_layer = $('.modal-layer');
	var $modal_up = $('.modal-up');

	$all_menu.on('click', function() {
		$modal_layer.fadeIn();
	})
	$btnClose.on('click', function() {
		$modal_layer.fadeOut();
	})
	$modal_layer.on('click', function() {
		$modal_layer.fadeOut();
	})
	$modal_up.on('click', function() {
		return false;
	})
})
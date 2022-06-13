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

    // 슬라이드
	var width = 100 // 슬라이드 한 개의 폭
	var animationSpeed = 200; // 화면전환 속도
	var pause = 10000; // 화면전환 후 일시 정지 속도

	var currentSlide = 2; // 초기 슬라이드 
	var interval;
	var dotNum;
	var dMinusC;

	// Caching DOM elements
	var $slideUl = $('.slides');
	var $slides = $('.slide');
	var $dots = $('.slider-nav-dot');
	var $sliderNavPrv = $('#slider-nav-prv');
	var $sliderNavNxt = $('#slider-nav-nxt');

	function initSlider(){
		$slideUl.css('margin-left',-width + '%' );
	}


	function startSlider(action, dotNum) {

		if(action == 'prv'){
			$slideUl.animate({ 'margin-left': '+=' + width + '%' }, animationSpeed, function() {
				if (--currentSlide == 1) {
					currentSlide = $slides.length - 1;
					$slideUl.css('margin-left', -($slides.length - 2) * width + '%');
				}

				for(var i = 0; i < $dots.length; i++){ $dots[i].style.background = ""; }
				$dots[currentSlide-2].style.background = "#f7a61a";
			});
		} else if(action == 'nxt') {
			$slideUl.animate({ 'margin-left': '-=' + width + '%' }, animationSpeed, function() {
				if (++currentSlide == $slides.length) {
					currentSlide = 2;
					$slideUl.css('margin-left', -width + '%' );
				}

				for(var i=0; i<$dots.length; i++){ $dots[i].style.background = ""; }
				$dots[currentSlide-2].style.background = "#f7a61a";
			});
		} else if(action == 'dot') {
			dMinusC = dotNum-currentSlide;
			currentSlide = dotNum;

			for(var i=0; i < $dots.length; i++){ $dots[i].style.background = ""; }
			$dots[currentSlide-2].style.background = "#f7a61a";

			$slideUl.animate({ 'margin-left': '-=' + (dMinusC * width + '%') }, animationSpeed);

		} else {
			interval = setInterval(function() {
				$slideUl.stop().animate({ 'margin-left' : '-=' + width + '%'  }, animationSpeed, function() {
					if (++currentSlide == $slides.length) { // $slides.length == 5
						currentSlide = 2;
						$slideUl.css('margin-left', -width + '%' );
					}

					for(var i = 0; i < $dots.length; i++) { $dots[i].style.background = ""; }
					$dots[currentSlide-2].style.background = "#f7a61a";
				});	
			}, pause);
		}

	}


	function pauseSlider() {
		clearInterval(interval);
	}

	function prvSlide(){
		startSlider('prv');
	}

	function nxtSlide(){
		startSlider('nxt');
	}

	function dotSelected(){
		dotNum = $(this).attr('id');
		dotNum = parseInt(dotNum.substring(7))+1;
		startSlider('dot', dotNum);
	}


	$slideUl
		.on('mouseenter', pauseSlider)
		.on('mouseleave', startSlider);

	$sliderNavPrv
		.on('click',prvSlide)
		.on('mouseenter', pauseSlider)
		.on('mouseleave', startSlider);

	$sliderNavNxt
		.on('click',nxtSlide)
		.on('mouseenter', pauseSlider)
		.on('mouseleave', startSlider);

	$dots
		.on('click', dotSelected)
		.on('mouseenter', pauseSlider)
		.on('mouseleave', startSlider);		

	
	initSlider();
	startSlider();


    

    // 디저트 이미지 효과
	var photoIndex = 0;
	const photo = [
		"images/desert1.png",
		"images/desert2.png",
		"images/desert3.png"
		]
	var $photoList = $('#desert_slide > li > a > img')
	
    $('#desert_box > .page-btns > li').click(function(){
        var $this = $(this);
        var index = $this.index();
        
        $this.addClass('active');
        $this.siblings('.active').removeClass('active');
        
		$photoList.fadeOut(function() {
            $photoList.attr("src", photo[index]).fadeIn(100);
        })
        
    });


    $('#prev_btn_desert').click(function(){
		photoIndex--;
	
		if(photoIndex < 0) photoIndex = photo.length - 1;

		$photoList.fadeOut(function() {
            $photoList.attr("src", photo[photoIndex]).fadeIn(100);
        })

		if(photoIndex == 2) {
			$('#desert_box > .page-btns > li').eq(0).removeClass('active');
		}else {
			$('#desert_box > .page-btns > li').eq(photoIndex + 1).removeClass('active');
		}
		$('#desert_box > .page-btns > li').eq(photoIndex).addClass('active');

    });
    $('#next_btn_desert').click(function(){
		photoIndex++;
		photoIndex %= photo.length;

		$photoList.fadeOut(function() {
            $photoList.attr("src", photo[photoIndex]).fadeIn(100);
        })

		$('#desert_box > .page-btns > li').eq(photoIndex - 1).removeClass('active');
		$('#desert_box > .page-btns > li').eq(photoIndex).addClass('active');

    });
    
    var fadeInOutInterval =  window.setInterval(function() {
        $('#next_btn_desert').click()
    }, 10000);
	
	
	function pauseFadeInOut() {
		clearInterval(fadeInOutInterval);
	}

	function startFadeInOut() {
		fadeInOutInterval =  window.setInterval(function() {
			$('#next_btn_desert').click()
		}, 10000);
	}

	$('#desert_box > button')
		.on('mouseenter', pauseFadeInOut)
		.on('mouseleave', startFadeInOut);		
	$('#desert_box > .page-btns > li')
		.on('mouseenter', pauseFadeInOut)
		.on('mouseleave', startFadeInOut);		
	$('#desert_slide > li')
		.on('mouseenter', pauseFadeInOut)
		.on('mouseleave', startFadeInOut);		

	// 페이지 스크롤 이벤트
	var $banner_wrap = $('#banner_wrap');
	var $offset = 700;
	var $bannerOST = $banner_wrap.offset().top - $offset
	if (matchMedia("screen and (min-width: 1220px)").matches) {
		// 1220px 이상에서 사용할 JavaScript
		$(window).scroll(function() {
			if($(this).scrollTop() > $bannerOST) {
				$('#signature1').animate({ left: '5%' }, 1000).css({ display : 'block' });
				$('#signature2').animate({ right: '5%' }, 1000).css({ display : 'block' });
			}
		});
	  } else {
		  // 1220px 미만에서 사용할 JavaScript
		  $(window).scroll(function() {
			  if($(this).scrollTop() > $bannerOST) {
				  $('#signature1').animate({ opacity : "100%", left: '15%' }, 1000).css({ display : 'block' });
				  $('#signature2').animate({ opacity : "100%", right: '15%' }, 1000).css({ display : 'block' });
			  }
		  });
	  }
})


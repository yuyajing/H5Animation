var mySwiper1;
var preloadImages = ['img/p1-bg.jpg','img/p2-bg.jpg','img/p3-bg.jpg','img/p4-bg.jpg','img/p5-bg.jpg','img/p6-bg.jpg','img/p7-bg.jpg','img/p8-bg.jpg','img/p9-bg.jpg','img/p10-bg.jpg'];  
var imgCount = 0;
var loadedImages = 0;

$(document).ready(function () {
	imgCount = preloadImages.length;
	loadImage();
	
	$('#music').fastButton(function(e){
		audio = document.getElementById('car_audio');
		if(audio.paused){
			audio.play();
			$('#music').attr('src','img/p1-music.png');
		}
		else{
			audio.pause();
			$('#music').attr('src','img/p1-musicoff.png');
		}
	});
});

function openWXShare() {
	$('#wxshare').fadeIn();
}

function closeWXShare() {
	$('#wxshare').fadeOut();
}

function showAlert(msg){
	$('#alertDiv').text(msg);
	$('#alertDiv').show();
	$('#alertDiv').fadeOut(2000);
}

function loadImage() {
	if (loadedImages < imgCount) {
		var img = new Image();
		img.src = preloadImages.pop();
		if (img.complete) {
			imageLoaded(img.src);
			return;
		}
		$(img).load(function () {
			imageLoaded(img.src);
		}).error(function () {
			loadImage();
		});
	}
}

function imageLoaded(imgsrc) {
	loadedImages++;
	$('#loadingText').text(Math.floor(loadedImages / imgCount * 100) + "%");

	if(imgsrc.indexOf('-bg.jpg')>0){
		imgName = imgsrc.substr(imgsrc.lastIndexOf('/')+1);
		tagName = imgName.split('.')[0];
		$('.'+tagName).css('background-image','url('+imgsrc+')');
	}
	
	if (loadedImages == imgCount) {
		startApp();
	} else {
		loadImage();
	}
}

function startApp() {
	$('.cube,#loadingText').fadeOut("slow",
	function () {
		$('#swiper1').show();
		
		mySwiper1 = new Swiper('#swiper1', {
			// Optional parameters
			direction: 'vertical',
			effect: '',
			lazyLoading : true,
			lazyLoadingInPrevNext : true,
			onInit: function (swiper) {
				swiperAnimateCache(swiper);
				swiperAnimate(swiper);
			},
			onSlideChangeStart: function (swiper){
				
			},
			onSlideChangeEnd: function (swiper) {
				swiperAnimate(swiper);
			}
		});

		$('#wxshare').on('tap', function () {
			closeWXShare();
		});
	});
}

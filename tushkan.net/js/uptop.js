/*
Author: Maenkov Vladimir
WEB: mvcreative.ru
*/

$(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() >= 50) {
			$('.upTop').fadeIn(200);
			$('.upTop').hover(function() {
				$('.upTopZone').fadeIn(100);
			}, function() {
				$('.upTopZone').fadeOut(100);
			});
		} else {
			$('.upTop, .upTopZone').fadeOut(200);
		}
	});
	$('.upTopZone, .upTopButton').click(function () {
		$('body, html').animate({scrollTop:0}, 1000);
	});
});


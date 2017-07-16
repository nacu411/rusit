$(document).ready(function(){
	function wow(){
		new WOW().init();
	};

	function scroll(){
		$('a[href^="#"]').bind("click", function(e){
		  var anchor = $(this);
		  $('html, body').stop().animate({
		   scrollTop: $(anchor.attr("href")).offset().top
		  }, 1000);
		  e.preventDefault();
		 });
		 return false;﻿
	}

	function player(){
		$('#play').click(function(){
			$('.mv-wrapper').addClass('fade');
			$("iframe[src]").attr("src", "https://www.youtube.com/embed/a1Y73sPHKxw?rel=0&amp;autoplay=1");
		});
	};
	
	wow();
	scroll();
	player();
});
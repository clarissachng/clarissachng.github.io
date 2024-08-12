jQuery(function($){
	// $(document).ready(function() {
	// 	$(".hamburger").click(function() {
	// 		$(this).toggleClass("active");
	// 		$(".topnav-left").toggleClass("active");
	// 	});
	// });

	
	$(document).ready(function(){

		var $window = $(window),
				win_height_padded = $window.height() * 0.8

		$window.on('scroll', setInterval(maskinleftload, 100));

		function maskinleftload() {
			var scrolled = $window.scrollTop();
			$(".element-fade-up:not(.animated)").each(function () {
				var $this = $(this),
						offsetTop = $this.offset().top;
				if (scrolled + win_height_padded > offsetTop) {
					if ($this.data('timeout')) {
						window.setTimeout(
							function () {
								$this.addClass('triggered ' + $this.data('animation'));
							}, parseInt($this.data('timeout'), 10));
					} else { $this.addClass('triggered ' + $this.data('animation')); }
				}
			});
		}
	})

    // GIF Name Animation
    $(document).ready(function() {
        const $text = $(".text");
        const chars = $text.text().split("");
        $text.html(
            $.map(chars, function(char, i) {
                return `<span style="transform:rotate(${i * 8.125}deg)">${char}</span>`;
            }).join("")
        );
    });

    // Horizontal Scroll Animation
    $(window).on('scroll', function() {
		// var textPosition = $(window).scrollTop() / $(window).height() * 100;
        var textPosition = Math.round($(window).scrollTop() / $(window).height() * 60);
        $('.horizontal-scroll').css('transform', 'translateX(' + (textPosition - 130) + '%)');
    });

	// Change Image Animation
	function preloadImages(imgList) {
		imgList.forEach(function(img) {
			var newImg = new Image();
			newImg.src = img;
		});
	}
	
	var myElement = document.getElementById('intro-shape');
	var imgList = ["/assets/shapes/3.png", "/assets/shapes/5.png", "/assets/shapes/4.png", "/assets/shapes/7.png", "/assets/shapes/8.png"];
	
	preloadImages(imgList);
	
	function changeImage (myElement, imgList) {
		setInterval(function(){
			var randomImage = Math.floor(Math.random() * imgList.length);
			myElement.style.backgroundImage = "url('" + imgList[randomImage] + "')";
		}, 1000); // 1500ms or 1.5 seconds
	}
	
	changeImage(myElement, imgList);

	// Scroll Speed Animation
	$.fn.moveIt = function(){
	
		var $window = $(window);
		var instances = [];
		
		$(this).each(function(){
		instances.push(new moveItItem($(this)));
		});
		
		window.onscroll = function(){
		var scrollTop = $window.scrollTop();
		instances.forEach(function(inst){
			inst.update(scrollTop);
		});
		}
	}
	
	var moveItItem = function(el){
		
		this.el = $(el);
		this.speed = parseInt(this.el.attr('data-scroll-speed'));
	};
	
	moveItItem.prototype.update = function(scrollTop){
		this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
	};
	
		// Initialization
	$(function(){
		$('[data-scroll-speed]').moveIt();
	});	
})

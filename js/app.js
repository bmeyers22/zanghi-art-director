var docLoad;
var winLoad;



$(document).ready(function () {
	initializeRouting();
	setupWorkLightBox();
});

$(window).load(function () {
	winLoad = new Date();
});

var EVENT_GUY;



$(window).resize(function () {
	if ($(window).width() < 505) {
		changeRows505();
	} else if ($(window).width() < 980) {
		changeRows980();
	} else {
		changeRowsDefault();
	}
	if (SLIDE_SIZER !== undefined) {
		clearTimeout(SLIDE_SIZER);
	}
	SLIDE_SIZER = setTimeout(resizeSlidesAbs, 200);
	if (RESIZER !== undefined) {
		clearTimeout(RESIZER);
	}
	RESIZER = setTimeout(responsiveHeader, 500);
	fixHeight();
});

window.onorientationchange = function() {
  switch (window.orientation) {
    case 0:
	$(window).resize();
	fixHeight();
	// run your JavaScript for portrait mode here
        break; 
       
    case 90:
	$(window).resize();
    fixHeight();
	// run your JavaScript for landscape mode with the screen turned left
        break;
   
    case -90: 
	$(window).resize();
    fixHeight();
	// run your JavaScript for landscape mode with the screen turned left
        break;
  }
}

function changeRows505() {
	$('.workSlide .workGridRow').each(function () {
		$(this).removeClass('row');
		$(this).addClass('row-fluid');
		$(this).css('margin-top', '0px');
		var width = 268;
		var margin = ($(window).outerWidth() - width)/2;
		$(this).find('.span3').each( function () {
			$(this).css('margin-left', margin + 'px');
			$(this).css('margin-top', '50px');
		});
	});
	$('#smallTopBarLinks li').click(function () {
		$('.btn-navbar').click();
	});
	resizeSlidesAbs();
}
function changeRows980() {
	var normalizedMargin = 0;
	$('.workSlide .workGridRow').each(function () {
		$(this).removeClass('row');
		$(this).addClass('row-fluid');
		$(this).css('margin-top', '50px');
		var width = 0;
		var margin;
		$(this).find('.span3').each( function () {
			$(this).css('margin-left', '');
			$(this).css('margin-top', '');
			width += $(this).outerWidth(true);
		});
		if ($(this).find('.span3').length < 3) {
			margin = parseInt($($('.workSlide .workGridRow .span3')[0]).css('margin-left')); 
		} else {
			margin = ($(window).outerWidth() - width)/2;
		}
		$($(this).find('.span3')[0]).css('margin-left', margin + 'px');
		
	});
	resizeSlidesAbs();
}
function changeRowsDefault() {
	$('.workSlide .workGridRow').each(function () {
		$(this).removeClass('row-fluid');
		$(this).addClass('row');
		$(this).css('margin-top', '50px');
		$(this).find('.span3').each( function () {
			$(this).css('margin-left', '');
			$(this).css('margin-top', '');
		});
		$($(this).find('.span3')[0]).css('margin-left', '0px');
	});
	resizeSlidesAbs();
}

function initializeRouting() {
	appRouter = new AppRouter;

	appRouter.on ("route", function(trigger, args) {
		
	});


	// Start Backbone history a necessary step for bookmarkable URL's
	Backbone.history.start();

}

function responsiveHeader() {
	var reference;
	if ($(window).width() < 934) {
		reference = $('.topbarLinks').position().left - 840;
	} else {
		reference = WORK_POS;
	}
	GREFERENCE = reference;
	if (CURRENT_ROUTE == 'work') {
		CURRENT_POS = reference
	} else if (CURRENT_ROUTE == 'about') {
		CURRENT_POS = reference + ADD_ABOUT;
	} else if (CURRENT_ROUTE == 'contact') {
		CURRENT_POS = reference + ADD_CONTACT;
	}
	$('#arrowImgWrapper img').stop().animate({'left': CURRENT_POS + 'px'});
}

function initTopNavLinks(page) {
	var reference;
	if ($(window).width() < 934) {
		reference = $('.topbarLinks').position().left - 840;
	} else {
		reference = WORK_POS;
	}
	GREFERENCE = reference;
	if(page == 'work') {
		CURRENT_POS = reference;
	} else if(page == 'about') {
		CURRENT_POS = reference + ADD_ABOUT;
	} else if(page == 'contact') {
		CURRENT_POS = reference + ADD_CONTACT;
	}
	$('.headerArrowImg img').stop().animate({left: CURRENT_POS+'px'});
	$('#workLink').hover(
		function() {
			var go = GREFERENCE;
			$('.headerArrowImg img').stop().animate({"left": go+'px'}, 'slow');
		},
		function () {
			$('.headerArrowImg img').stop().animate({"left": CURRENT_POS+'px'});
		}
	); 
	$('#aboutLink').hover(
		function() {
			var go = GREFERENCE + ADD_ABOUT;
			$('.headerArrowImg img').stop().animate({"left": go+'px'}, 'slow');
		},
		function () {
			$('.headerArrowImg img').stop().animate({"left": CURRENT_POS+'px'});
		}
	); 
	$('#contactLink').hover(
		function() {
			var go = GREFERENCE + ADD_CONTACT;
			$('.headerArrowImg img').stop().animate({"left": go+'px'}, 'slow');
		},
		function () {
			$('.headerArrowImg img').stop().animate({"left": CURRENT_POS+'px'});
		}
	); 
}

function setupWorkLightBox() {
	if (!MOBILE) {
		$('.workLightBoxGray').hover(
			function () {
				$(this).stop().animate({opacity: 0}, 600);
			},
			function () {
				$(this).stop().animate({opacity: 1}, 600);
			}
		);
	} else if (!TABLET) {
		checkLightBoxPos();
		$(window).scroll(function () {
			checkLightBoxPos();
		});
		$(window).on('touchmove', function (e) {
			checkLightBoxPos();
		});
	}
	
}

function checkLightBoxPos() {
	for (var i = 0; i < $('.workLightBoxGray').length; i++) {
		var self = $('.workLightBoxGray')[i];
		if (typeof self.inView == 'undefined') {
			self.inView = false;
		}
		var topScroll = $(window).scrollTop();
		var height = $(window).outerHeight();
		var trigger = $(self).offset().top + ($(self).height()/2);
		if (trigger > topScroll && trigger < (topScroll+height)) {
			if (!self.inView) {
				self.inView = true;
				$(self).stop().animate({opacity: 0}, 600);
			}
		} else {
			if (self.inView) {
				self.inView = false;
				$(self).stop().animate({opacity: 1}, 600);
			}
		}
	}
}

function initDLResume() {
	$('#dlResumeImg').hover(
		function () {
			$(this).stop().animate({opacity: 1}, 'fast');
		},
		function () {
			$(this).stop().animate({opacity: .5}, 'slow');
		}
	);
}

function initContactIcons() {
	$('.contactIcon').hover(
		function () {
			if ($(this).attr('id') != 'phoneIcon') {
				$(this).stop().animate({opacity: 1}, 'fast');
			}
		},
		function () {
			if ($(this).attr('id') != 'phoneIcon') {
				$(this).stop().animate({opacity: .5}, 'slow');
			}
		}
	);
}

function initProjectNav() {
	$('.navArrow').hover(
		function () {
			$(this).css('opacity', 1);
		},
		function () {
			$(this).css('opacity', .5);
		}
	);
	$('.navArrow').click(function () {
		var nextSlide,
			nextString;
		if (CURRENT_SLIDE == NUM_PROJECTS) {
			nextString = '#/about'
		} else {
			nextSlide = CURRENT_SLIDE + 1;
			var project = _.where(PROJECT_ARR, {id: nextSlide});
	        if (project.length > 0) {
	            nextSlide = project[0].title;
	        }
			nextString = '#/work/'+nextSlide;
		}
		var prevSlide,
			prevString;
		if (CURRENT_SLIDE == 1) {
			prevString = '#/work'
		} else {
			prevSlide = CURRENT_SLIDE - 1;
			var project = _.where(PROJECT_ARR, {id: prevSlide});
	        if (project.length > 0) {
	            prevSlide = project[0].title;
	        }
			prevString = '#/work/'+prevSlide;
		}
		if ($(this).hasClass('navArrowRight')) {
			appRouter.navigate(nextString, {trigger: true});
		} else if ($(this).hasClass('navArrowLeft')) {
			appRouter.navigate(prevString, {trigger: true});
		} else {
			$("html, body").bind('click', function () {
				$("html, body").stop();
			});
			$("html, body").animate({ scrollTop: 0 }, 'slow', function () {
				$("html, body").unbind('click');
			});
  			return false;
		}
	});
}

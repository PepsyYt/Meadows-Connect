(function ($) {
	"use strict";
	
	var modelApp = {

		/* ---------------------------------------------
		 Menu
		 --------------------------------------------- */
		menu: function() {
		    var $combinedmenu = $("#main-nav .menu-list").clone();
		    $combinedmenu.appendTo("#mobile-main-nav #main-mobile-container");

		    var $submenu = $("#mobile-main-nav .menu-list li, .overlay .overlay-menu").has(".sub-menu"),
		        $submenuSelector = $(".sub-menu"),
		        $mobileNavSelector = $("#main-mobile-container .main-navigation"),
		        $mobileNavOverlay = $(".mobile-menu-main .menucontent.overlaybg, .mobile-menu-main .slideLeft"),
		        $mobileMenuContent = $(".mobile-menu-main .menucontent"),
		        $mobileNavBar = $("#navtoggole-main"),
		        $mobileNav = $(".menu-mobile"),
		        $menuWrap = $(".menu-list");

		    if ($submenu) {
		        var $hasSubmenuIcon = $("<span class='fa fa-angle-down'></span>");
		        $submenuSelector.prev().append($hasSubmenuIcon);
		    }

		    // Main Navigation Mobile
		    // --------------------------------            
		    $mobileNavSelector.addClass("slideLeft");

		    var menuopen_main = function() {
		            $mobileNavOverlay.removeClass("menuclose").addClass("menuopen");
		        },
		        menuclose_main = function() {
		            $mobileNavOverlay.removeClass("menuopen").addClass("menuclose");
		        };

		    $mobileNavBar.on("click", function() {
		        if ($mobileMenuContent.hasClass("menuopen")) {
		            $(menuclose_main);
		        } else {
		            $(menuopen_main);
		        }
		    });
		    $mobileMenuContent.on("click", function() {
		        if ($mobileMenuContent.hasClass("menuopen")) {
		            $(menuclose_main);
		        }
		    });

		    // Sub Menu
		    // -------------------------------- 
		    var $mobileExtendBtn = $("<span class='menu-click'><i class='menu-arrow fa fa-plus'></i></span>");
		    $submenu.prepend($mobileExtendBtn);

		    $mobileNav.on("click", function() {
		        $menuWrap.slideToggle("slow");
		    });
		    var $mobileSubMenuOpen = $(".menu-click");
		    $mobileSubMenuOpen.on("click", function() {
		        var $this = $(this);
		        $this.siblings(".sub-menu").slideToggle("slow");
		        $this.children(".menu-arrow").toggleClass("menu-extend");
		    });		    

		    var $mobileSubMenuOpen2 = $(".overlay .overlay-menu .fa-angle-down");
		    $mobileSubMenuOpen2.on("click", function() {
		        var $this = $(this);
		        $this.parent().next(".sub-menu").slideToggle("slow");
		        $this.toggleClass("menu-extend");
		    });

		    // For Last menu
		    // --------------------------------
		    var $fullMenuElement = $(".navigation .mainmenu li");
		    $fullMenuElement.on("mouseenter mouseleave", function(e) {
		        var $this = $(this);
		        if ($("ul", $this).length) {
		            var elm = $("ul:first", $this),
		                off = elm.offset(),
		                l = off.left,
		                w = elm.width(),
		                docW = $(".header-bottom > .container").width(),
		                isEntirelyVisible = (l + w <= docW);
		            if (!isEntirelyVisible) {
		                $this.addClass("right-side-menu");
		            } else {
		                $this.removeClass("right-side-menu");
		            }
		        }
		    });

		    var $dropdownSelector = $(".dropdown-menu input, .dropdown-menu label, .dropdown-menu select");
		    $dropdownSelector.click(function(e) {
		        e.stopPropagation();
		    });
		},
		/* ---------------------------------------------
		Magnifying Pop-up
		--------------------------------------------- */
		popup_window: function() {
		    var $videoPopUp = $(".video-pop-up"),
		        $imagePopUp = $(".image-pop-up");
		    $videoPopUp.magnificPopup({
		        disableOn: 700,
		        type: "iframe",
		        mainClass: "mfp-fade",
		        preloader: false,
		        removalDelay: 300,
		        fixedContentPos: false
		    });            
		    $imagePopUp.magnificPopup({
		        type: "image",
		        mainClass: "mfp-fade"
		    });
		},
		/* ---------------------------------------------
		 Header Overlay
		 --------------------------------------------- */
		header_overlay: function() {
			var	overlay = document.querySelector( 'div.overlay' ),
				closeBttn = overlay.querySelector( 'button.overlay-close' ),
				transEndEventNames = {
					'WebkitTransition': 'webkitTransitionEnd',
					'MozTransition': 'transitionend',
					'OTransition': 'oTransitionEnd',
					'msTransition': 'MSTransitionEnd',
					'transition': 'transitionend'
				},
				transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
				support = { transitions : Modernizr.csstransitions };

			function toggleOverlay() {
				if( classie.has( overlay, 'open' ) ) {
					classie.remove( overlay, 'open' );
					var onEndTransitionFn = function( ev ) {
						if( support.transitions ) {
							if( ev.propertyName !== 'visibility' ) return;
							this.removeEventListener( transEndEventName, onEndTransitionFn );
						}
						classie.remove( overlay, 'close' );
					};
					if( support.transitions ) {
						overlay.addEventListener( transEndEventName, onEndTransitionFn );
					}
					else {
						onEndTransitionFn();
					}
				}
				else if( !classie.has( overlay, 'close' ) ) {
					classie.add( overlay, 'open' );
				}
			}
			var $triggerOverlay = $(".trigger-overlay");
			$triggerOverlay.on("click", function() {
				toggleOverlay();
			});
			closeBttn.addEventListener( 'click', toggleOverlay );

			var $mainSearch = $(".main-search");
			$mainSearch.on("click", function(e) {
				e.preventDefault();
				var $searchOverlay = $(".overlay-search");
				$searchOverlay.addClass("open");
			});
			var $overlayClose = $(".overlay-search .overlay-close");
			$overlayClose.on("click", function(e) {
				e.preventDefault();
				var $searchOverlay = $(".overlay-search");
				$searchOverlay.removeClass("open");
			});
		},
 		/* ---------------------------------------------
		 Gallery Style Two Carousel
		 --------------------------------------------- */
		gallary: function () {
			var $sync1 = $(".full-view"),
				$sync2 = $(".list-view"),
				duration = 300;

			$sync1
				.owlCarousel({
					items: 1,
					nav : false,
					owl2row: "true",
					owl2rowTarget: "item"
				})
				.on("changed.owl.carousel", function (e) {
					var syncedPosition = syncPosition(e.item.index);
					if ( syncedPosition !== "stayStill" ) {
						$sync2.trigger("to.owl.carousel", [syncedPosition, duration, true]);
					}
				});
			$sync2
				.owlCarousel({
					margin: 15,
					items: 6,
					nav: false,
					center: false,
					dots: false,
					responsive:{
						280:{
							items: 2
						},
						500:{
							items: 2
						},
						600:{
							items: 3
						},
						800:{
							items: 4
						},
						1000:{
							items: 6
						},
						1200:{
							items: 6
						},
						1400:{
							items: 6
						},
					}
				})
				.on("initialized.owl.carousel", function() {
				   addClassCurrent(0);
				})
				.on("click", ".owl-item", function () {
					$sync1.trigger("to.owl.carousel", [$(this).index(), duration, true]);

				});
				function addClassCurrent( index ) {
					$sync2
						.find(".owl-item.active")
						.removeClass("current")
						.eq( index )
						.addClass("current");
				}
				addClassCurrent(0);
				function syncPosition( index ) {
					addClassCurrent( index );
					var itemsNo = $sync2.find(".owl-item").length;
					var visibleItemsNo = $sync2.find(".owl-item.active").length;
				
					if (itemsNo === visibleItemsNo) {
						return "stayStill";
					}
					var visibleCurrentIndex = $sync2.find(".owl-item.active").index( $sync2.find(".owl-item.current") );
					if (visibleCurrentIndex === 0 && index !== 0) {
						return index - 1;
					}
					if (visibleCurrentIndex === (visibleItemsNo - 1) && index !== (itemsNo - 1)) {
						return index - visibleItemsNo + 2;
					}
					return "stayStill";
				}
		},
		/* ---------------------------------------------
		 Gallery slider
		 --------------------------------------------- */
		gallery: function() {
			var $gallerySlider = $(".gallery-slider");
			$gallerySlider.owlCarousel({
				loop:true,
				items: 3,
				nav: true,
				margin: 15,
				navText: ['<i class="fa fa-angle-left"</i>', '<i class="fa fa-angle-right"></i>'],
				responsive:{
					280:{
						items:2
					},
					480 : {
						items: 2
					},
					768 : {
					   items: 2
					},
					1200 : {
					   items: 3
					}
				}
			});	
		},
		/* ---------------------------------------------
		 Brand slider
		 --------------------------------------------- */
		brand: function() {
			var $brandSlider = $(".brand-slider");
			$brandSlider.owlCarousel({
				loop: false,
				items: 7,
				margin: 30,
				nav: false,
				responsive:{
					280:{
						items: 2
					},
					480 : {
						items: 3
					},
					768 : {
					   items: 5
					},
					1200 : {
					   items: 7
					},
					1400 : {
						items: 7
					}
				}
			});
		},
 		 /* ---------------------------------------------
		 Count To
		 --------------------------------------------- */
		count: function() {
			var $countSelector = $(".stat-count");
			if($countSelector.length) {	
				$countSelector.countTo();
			}
		},
 		/* ---------------------------------------------
		 Mobile Select
		--------------------------------------------- */
		mobileSelect: function() {
			var $selectSelector = $(".apartment-menu-mobile, .blog-menu-mobile, .about-mobile");
			$selectSelector.on("change", function (e) {
				var url = $(this).val();
				if($.isNumeric(url) === true) {
					var $tabNav = $(".apartment-menu li a, .post-filter-area li a, .about-tab li a");
			    	$tabNav.eq(url).tab('show'); 
				} else {
					window.location = url;
				}
			});
		},
		/* ---------------------------------------------
		 text-slider
		 --------------------------------------------- */
		pogoSlider: function() {
			var $sliderSelector = $(".pogoSlider");
			$sliderSelector.pogoSlider({
				autoplay: false,
				autoplayTimeout: 5000,
				displayProgess: true,
				preserveTargetSize: true,
				targetWidth: 1000,
				targetHeight: 400,
				responsive: true,
				generateNav: false
			}).data('plugin_pogoSlider');
		},

		 /* ---------------------------------------------
		 slider
		 --------------------------------------------- */
		category: function() {
			var $categorySlider = $(".category-slider");
			$categorySlider.owlCarousel({
				loop: true,
				items: 12,
				nav: true,
				navText: ['<i class="fa fa-angle-left"</i>', '<i class="fa fa-angle-right"></i>'],
				responsiveClass: true,
				responsiveRefreshRate: true,
				responsive:{
					280:{
						items: 2
					},
					500:{
						items: 3
					},
					600:{
						items: 4
					},
					800:{
						items: 6
					},
					1000:{
						items: 6
					},
					1200: {
						items: 9
					},
					1400: {
						items: 12
					}
				}
			});
		}, 
		/* ---------------------------------------------
		slider
		--------------------------------------------- */
		category_seven: function() {
			var $categorySliderSeven = $(".category-slider-seven");
			$categorySliderSeven.owlCarousel({
				loop: true,
				margin: 0,
				items: 5,
				nav: true,
				navText: ['<i class="fa fa-angle-left"</i>', '<i class="fa fa-angle-right"></i>'],
				responsive:{
					280:{
						items:2
					},
					480 : {
						items: 3
					},
					768 : {
					   items: 4
					},
					1200 : {
					   items: 5
					}
				}
			})
		},
		/* ---------------------------------------------
		testimonial-slider
		--------------------------------------------- */
		testimonial: function() {
			var $testimonialSlider = $(".testimonial-slider");
			$testimonialSlider.owlCarousel({
				 loop: true,
				 margin: 30,
				 items: 3,
				 responsive:{
					280:{
						items: 1
					},
					500:{
						items: 1
					},
					600:{
						items: 2
					},
					800:{
						items: 2
					},
					1000:{
						items: 3
					},
					1200:{
						items: 3
					},
					1400:{
						items: 3
					}
				}
			});
		},
		/* ---------------------------------------------
		Time Count For Coming Soon
		--------------------------------------------- */
		time_count: function() {
			var $selector = $('.commingsoon-count');
			$selector.each(function(){
			    var $this = $(this),
			        data_year = $this.attr('data-year'),
			        data_month = $this.attr('data-month'),
			        data_day = $this.attr('data-day'),
			        data_hour = $this.attr('data-hour'),
			        data_minutes = $this.attr('data-minutes');
			    $this.syotimer({
			        year: data_year,
			        month: data_month,
			        day: data_day,
			        hour: data_hour,
			        minute: data_minutes
			    });    
			});
		},
		/* ---------------------------------------------
		 Widget Mobile fix
		 --------------------------------------------- */
		widget_mobile: function () {
		    function debouncer(func, timeout) {
		        var timeoutID, timeout = timeout || 500;
		        return function () {
		            var scope = this,
		                args = arguments;
		            clearTimeout(timeoutID);
		            timeoutID = setTimeout(function () {
		                func.apply(scope, Array.prototype.slice.call(args));
		            }, timeout);
		        };
		    }
		    function resized() {
		        var $getWidgetTitle = $(".widget .widget-title"),
		            $getWidgetTitleContent,
		            $windowWidthlocal = $(window).width();
		        if ($windowWidthlocal <= 991) {
		            $getWidgetTitleContent = $getWidgetTitle.parent().nextAll().hide();
		            $getWidgetTitle.addClass("expand-margin");
		            $getWidgetTitle.on("click", function(e) {
		                e.stopImmediatePropagation();
		                var $selfLocal = $(this);
		                $selfLocal.toggleClass("expand");
		                $selfLocal.parent().nextAll().slideToggle();
		                return false;
		            });
		            $getWidgetTitle.each(function(){
		                var $selfLocal = $(this);
		                $selfLocal.parent().addClass("mb-widget");
		            });
		        } else {
		            $getWidgetTitleContent = $getWidgetTitle.parent().nextAll().show();
		            $getWidgetTitle.removeClass("expand-margin");
		            $getWidgetTitle.each(function(){
		                var $selfLocal = $(this);
		                $selfLocal.parent().removeClass("mb-widget");
		            });
		        }
		    }
		    resized();

		    var $windowWidth = $(window).width(),
		        $window = $(window);
		    var prevW = window.innerWidth || $windowWidth;
		    $window.resize(debouncer(function (e) {
		        var currentW = window.innerWidth || $windowWidth;
		        if (currentW !== prevW) {
		            resized();
		        }
		        prevW = window.innerWidth || $windowWidth;
		    }));

		    //Mobile Responsive
		    var $extendBtn = $(".extend-btn .extend-icon");
		    $extendBtn.on("click", function(e) {
		        e.preventDefault();
		        var $self = $(this);
		        $self.parent().prev().toggleClass("mobile-extend");
		        $self.parent().toggleClass("extend-btn");
		        $self.toggleClass("up");
		    });
		},
		/* ---------------------------------------------
		 IPad Parallax Issue
		--------------------------------------------- */
		ipad_parallax: function() {
		    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream || /android/i.test(userAgent) || /windows phone/i.test(userAgent)) {
		        $(".jarallax").each(function(){
		            var $self = $(this);
		            var $getImage = $self.attr("data-jarallax");
		            var $objImage = $.parseJSON( $getImage );
		            $self.css({
		                "background-image": "url("+ $objImage.imgSrc +")",
		                "background-size": "cover",
		                "background-repeat": "no-repeat",
		                "background-position": "center center"
		            });
		        });
		    }
		},
		/* ---------------------------------------------
		 Other Function
		--------------------------------------------- */
		othersFunction: function() {
			var $apartmentDropdown = $(".apartment-menu .dropdown");
			$apartmentDropdown.append("<i class='fa fa-angle-down'></i>");

			var $abailityAreaTwo = $(".availability-area.two table th");
			$abailityAreaTwo.append("<i class='fa fa-angle-down'></i>");

			var $mapIframe = $(".map-content, .map-left-content");

			$mapIframe
			    .click(function() {
			    	var $self = $(this);
			        $self.find("iframe").addClass("clicked");
			    })
			    .mouseleave(function(){
			    	var $self = $(this);
			        $self.find("iframe").removeClass("clicked");
			    });
		},

		/* ---------------------------------------------
		 Scroll top
		 --------------------------------------------- */
	    scroll_top: function () {
	    	var $bodyElement = $("body"),
	    	    $window = $(window),
	    	    $scrollHtml = $("<a href='#top' id='scroll-top' class='topbutton btn-hide'><span class='glyphicon glyphicon-menu-up'></span></a>");

	    	$bodyElement.append($scrollHtml);

	    	var $scrolltop = $("#scroll-top");
	    	$window.on("scroll", function() {
	    	    if ($(this).scrollTop() > $(this).height()) {
	    	        $scrolltop
	    	            .addClass("btn-show")
	    	            .removeClass("btn-hide");
	    	    } else {
	    	        $scrolltop
	    	            .addClass("btn-hide")
	    	            .removeClass("btn-show");
	    	    }
	    	});

	    	var $selectorAnchor = $("a[href='#top']");
	    	$selectorAnchor.on("click", function() {
	    	    $("html, body").animate({
	    	        scrollTop: 0
	    	    }, "normal");
	    	    return false;
	    	});
		},
	
		/* ---------------------------------------------
		 function initializ
		 --------------------------------------------- */
		initializ: function() {
			modelApp.menu();
			modelApp.popup_window();
			modelApp.header_overlay();
			modelApp.gallary();
			modelApp.brand();
			modelApp.category();
			modelApp.testimonial();
			modelApp.mobileSelect();
			modelApp.pogoSlider();
			modelApp.gallery();
			modelApp.count();
			modelApp.category_seven();
			modelApp.time_count();
			modelApp.widget_mobile();
			modelApp.ipad_parallax();
			modelApp.othersFunction();
			modelApp.scroll_top();
		}
	};
	/* ---------------------------------------------
	 Document ready function
	 --------------------------------------------- */
	$(function() {
		modelApp.initializ();
	});
	
})(jQuery);
  


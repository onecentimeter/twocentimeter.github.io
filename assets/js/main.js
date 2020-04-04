/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Gallery.
		$('.gallery')
		.wrapInner('<div class="inner"></div>')
		.prepend(browser.mobile ? '' : '<div class="forward"></div><div class="backward"></div>')
		.scrollex({
			top:		'30vh',
			bottom:		'30vh',
			delay:		50,
			initialize:	function() {
				$(this).addClass('is-inactive');
			},
			terminate:	function() {
				$(this).removeClass('is-inactive');
			},
			enter:		function() {
				$(this).removeClass('is-inactive');
			},
			leave:		function() {

				var $this = $(this);

				if ($this.hasClass('onscroll-bidirectional'))
					$this.addClass('is-inactive');

			// Style #1.
				// ...

			// Style #2.
			$('.gallery')
			.on('wheel', '.inner', function(event) {

				var	$this = $(this),
					delta = (event.originalEvent.deltaX * 10);

				// Cap delta.
					if (delta > 0)
						delta = Math.min(25, delta);
					else if (delta < 0)
						delta = Math.max(-25, delta);

				// Scroll.
					$this.scrollLeft( $this.scrollLeft() + delta );

			})
			.on('mouseenter', '.forward, .backward', function(event) {

				var $this = $(this),
					$inner = $this.siblings('.inner'),
					direction = ($this.hasClass('forward') ? 1 : -1);

				// Clear move interval.
					clearInterval(this._gallery_moveIntervalId);

				// Start interval.
					this._gallery_moveIntervalId = setInterval(function() {
						$inner.scrollLeft( $inner.scrollLeft() + (5 * direction) );
					}, 10);

			})
			.on('mouseleave', '.forward, .backward', function(event) {

				// Clear move interval.
					clearInterval(this._gallery_moveIntervalId);

			});

			}
		})
		.children('.inner')
			//.css('overflow', 'hidden')
			.css('overflow-y', browser.mobile ? 'visible' : 'hidden')
			.css('overflow-x', browser.mobile ? 'scroll' : 'hidden')
			.scrollLeft(0);


	// Lightbox.
		$('.gallery.lightbox')
		.on('click', 'a', function(event) {

			var $a = $(this),
				$gallery = $a.parents('.gallery'),
				$modal = $gallery.children('.modal'),
				$modalImg = $modal.find('img'),
				href = $a.attr('href');

			// Not an image? Bail.
				if (!href.match(/\.(jpg|gif|png|mp4)$/))
					return;

			// Prevent default.
				event.preventDefault();
				event.stopPropagation();

			// Locked? Bail.
				if ($modal[0]._locked)
					return;

			// Lock.
				$modal[0]._locked = true;

			// Set src.
				$modalImg.attr('src', href);

			// Set visible.
				$modal.addClass('visible');

			// Focus.
				$modal.focus();

			// Delay.
				setTimeout(function() {

					// Unlock.
						$modal[0]._locked = false;

				}, 600);

		})
		.on('click', '.modal', function(event) {

			var $modal = $(this),
				$modalImg = $modal.find('img');

			// Locked? Bail.
				if ($modal[0]._locked)
					return;

			// Already hidden? Bail.
				if (!$modal.hasClass('visible'))
					return;

			// Lock.
				$modal[0]._locked = true;

			// Clear visible, loaded.
				$modal
					.removeClass('loaded')

			// Delay.
				setTimeout(function() {

					$modal
						.removeClass('visible')

					setTimeout(function() {

						// Clear src.
							$modalImg.attr('src', '');

						// Unlock.
							$modal[0]._locked = false;

						// Focus.
							$body.focus();

					}, 475);

				}, 125);

		})
		.on('keypress', '.modal', function(event) {

			var $modal = $(this);

			// Escape? Hide modal.
				if (event.keyCode == 27)
					$modal.trigger('click');

		})
		.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
			.find('img')
				.on('load', function(event) {

					var $modalImg = $(this),
						$modal = $modalImg.parents('.modal');

					setTimeout(function() {

						// No longer visible? Bail.
							if (!$modal.hasClass('visible'))
								return;

						// Set loaded.
							$modal.addClass('loaded');

					}, 275);

				});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

})(jQuery);
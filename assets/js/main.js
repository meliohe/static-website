/*
	Forty by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = (skel.vars.browser == 'ie' || skel.vars.browser == 'edge' || skel.vars.mobile) ? function() { return $(this) } : function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				on, off;

			on = function() {

				$t.css('background-position', 'center 100%, center 100%, center 0px');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$t.css('background-position', 'center ' + (pos * (-1 * intensity)) + 'px');

					});

			};

			off = function() {

				$t
					.css('background-position', '');

				$window
					.off('scroll._parallax');

			};

			skel.on('change', function() {

				if (skel.breakpoint('medium').active)
					(off)();
				else
					(on)();

			});

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#wrapper'),
			$header = $('#header'),
			$banner = $('#banner');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load pageshow', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Clear transitioning state on unload/hide.
			$window.on('unload pagehide', function() {
				window.setTimeout(function() {
					$('.is-transitioning').removeClass('is-transitioning');
				}, 250);
			});

		// Fix: Enable IE-only tweaks.
			if (skel.vars.browser == 'ie' || skel.vars.browser == 'edge')
				$body.addClass('is-ie');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly').scrolly({
				offset: function() {
					return $header.height() - 2;
				}
			});

		// Tiles.
			var $tiles = $('.tiles > article');

			$tiles.each(function() {

				var $this = $(this),
					$image = $this.find('.image'), $img = $image.find('img'),
					$link = $this.find('.link'),
					x;

				// Image.

					// Set image.
						$this.css('background-image', 'url(' + $img.attr('src') + ')');

					// Set position.
						if (x = $img.data('position'))
							$image.css('background-position', x);

					// Hide original.
						$image.hide();

				// Link.
					if ($link.length > 0) {

						$x = $link.clone()
							.text('')
							.addClass('primary')
							.appendTo($this);

						$link = $link.add($x);

						$link.on('click', function(event) {

							var href = $link.attr('href');

							// Prevent default.
								event.stopPropagation();
								event.preventDefault();

							// Start transitioning.
								$this.addClass('is-transitioning');
								$wrapper.addClass('is-transitioning');

							// Redirect.
								window.setTimeout(function() {

									if ($link.attr('target') == '_blank')
										window.open(href);
									else
										location.href = href;

								}, 500);

						});

					}

			});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() {
					$window.trigger('scroll');
				});

				$window.on('load', function() {

					$banner.scrollex({
						bottom:		$header.height() + 10,
						terminate:	function() { $header.removeClass('alt'); },
						enter:		function() { $header.addClass('alt'); },
						leave:		function() { $header.removeClass('alt'); $header.addClass('reveal'); }
					});

					window.setTimeout(function() {
						$window.triggerHandler('scroll');
					}, 100);

				});

			}

		// Banner.
			$banner.each(function() {

				var $this = $(this),
					$image = $this.find('.image'), $img = $image.find('img');

				// Parallax.
					$this._parallax(0.275);

				// Image.
					if ($image.length > 0) {

						// Set image.
							$this.css('background-image', 'url(' + $img.attr('src') + ')');

						// Hide original.
							$image.hide();

					}

			});

		// emailinquiry.
		var $emailinquiry = $('#emailinquiry'),
		$emailinquiryInner;

	$emailinquiry.wrapInner('<div class="inner"></div>');
	$emailinquiryInner = $emailinquiry.children('.inner');
	$emailinquiry._locked = false;

	$emailinquiry._lock = function() {

		if ($emailinquiry._locked)
			return false;

		$emailinquiry._locked = true;

		window.setTimeout(function() {
			$emailinquiry._locked = false;
		}, 350);

		return true;

	};

	$emailinquiry._show = function() {

		if ($emailinquiry._lock())
			$body.addClass('is-emailinquiry-visible');

	};

	$emailinquiry._hide = function() {

		if ($emailinquiry._lock())
			$body.removeClass('is-emailinquiry-visible');

	};

	$emailinquiry._toggle = function() {

		if ($emailinquiry._lock())
			$body.toggleClass('is-emailinquiry-visible');

	};

	$emailinquiryInner
		.on('click', function(event) {
			event.stopPropagation();
		})
		.on('click', 'a', function(event) {

			var href = $(this).attr('href');

			event.preventDefault();
			event.stopPropagation();

			// Hide.
				$emailinquiry._hide();

			// Redirect.
				window.setTimeout(function() {
					window.location.href = href;
				}, 250);

		});

	$emailinquiry
		.appendTo($body)
		.on('click', function(event) {

			event.stopPropagation();
			event.preventDefault();

			$body.removeClass('is-emailinquiry-visible');

		})
		.append('<a class="close" href="#emailinquiry">Close</a>');

	$body
		.on('click', 'a[href="#emailinquiry"]', function(event) {

			event.stopPropagation();
			event.preventDefault();

			// Toggle.
				$emailinquiry._toggle();

		})
		.on('click', function(event) {

			// Hide.
				$emailinquiry._hide();

		})
		.on('keydown', function(event) {

			// Hide on escape.
				if (event.keyCode == 27)
					$emailinquiry._hide();

		});

		// facebookstuff.
		var $facebookstuff = $('#facebookstuff'),
		$facebookstuffInner;

	$facebookstuff.wrapInner('<div class="inner"></div>');
	$facebookstuffInner = $facebookstuff.children('.inner');
	$facebookstuff._locked = false;

	$facebookstuff._lock = function() {

		if ($facebookstuff._locked)
			return false;

		$facebookstuff._locked = true;

		window.setTimeout(function() {
			$facebookstuff._locked = false;
		}, 350);

		return true;

	};

	$facebookstuff._show = function() {

		if ($facebookstuff._lock())
			$body.addClass('is-facebookstuff-visible');

	};

	$facebookstuff._hide = function() {

		if ($facebookstuff._lock())
			$body.removeClass('is-facebookstuff-visible');

	};

	$facebookstuff._toggle = function() {

		if ($facebookstuff._lock())
			$body.toggleClass('is-facebookstuff-visible');

	};

	$facebookstuffInner
		.on('click', function(event) {
			event.stopPropagation();
		})
		.on('click', 'a', function(event) {

			var href = $(this).attr('href');

			event.preventDefault();
			event.stopPropagation();

			// Hide.
				$facebookstuff._hide();

			// Redirect.
				window.setTimeout(function() {
					window.location.href = href;
				}, 250);

		});

	$facebookstuff
		.appendTo($body)
		.on('click', function(event) {

			event.stopPropagation();
			event.preventDefault();

			$body.removeClass('is-facebookstuff-visible');

		})
		.append('<a class="close" href="#facebookstuff">Close</a>');

	$body
		.on('click', 'a[href="#facebookstuff"]', function(event) {

			event.stopPropagation();
			event.preventDefault();

			// Toggle.
				$facebookstuff._toggle();

		})
		.on('click', function(event) {

			// Hide.
				$facebookstuff._hide();

		})
		.on('keydown', function(event) {

			// Hide on escape.
				if (event.keyCode == 27)
					$facebookstuff._hide();

		});

		// discord.
		var $discord = $('#discord'),
		$discordInner;

	$discord.wrapInner('<div class="inner"></div>');
	$discordInner = $discord.children('.inner');
	$discord._locked = false;

	$discord._lock = function() {

		if ($discord._locked)
			return false;

		$discord._locked = true;

		window.setTimeout(function() {
			$discord._locked = false;
		}, 350);

		return true;

	};

	$discord._show = function() {

		if ($discord._lock())
			$body.addClass('is-discord-visible');

	};

	$discord._hide = function() {

		if ($discord._lock())
			$body.removeClass('is-discord-visible');

	};

	$discord._toggle = function() {

		if ($discord._lock())
			$body.toggleClass('is-discord-visible');

	};

	$discordInner
		.on('click', function(event) {
			event.stopPropagation();
		})
		.on('click', 'a', function(event) {

			var href = $(this).attr('href');

			event.preventDefault();
			event.stopPropagation();

			// Hide.
				$discord._hide();

			// Redirect.
				window.setTimeout(function() {
					window.location.href = href;
				}, 250);

		});

	$discord
		.appendTo($body)
		.on('click', function(event) {

			event.stopPropagation();
			event.preventDefault();

			$body.removeClass('is-discord-visible');

		})
		.append('<a class="close" href="#discord">Close</a>');

	$body
		.on('click', 'a[href="#discord"]', function(event) {

			event.stopPropagation();
			event.preventDefault();

			// Toggle.
				$discord._toggle();

		})
		.on('click', function(event) {

			// Hide.
				$discord._hide();

		})
		.on('keydown', function(event) {

			// Hide on escape.
				if (event.keyCode == 27)
					$discord._hide();

		});

		// Menu.
		var $menu = $('#menu'),
		$menuInner;

	$menu.wrapInner('<div class="inner"></div>');
	$menuInner = $menu.children('.inner');
	$menu._locked = false;

	$menu._lock = function() {

		if ($menu._locked)
			return false;

		$menu._locked = true;

		window.setTimeout(function() {
			$menu._locked = false;
		}, 350);

		return true;

	};

	$menu._show = function() {

		if ($menu._lock())
			$body.addClass('is-menu-visible');

	};

	$menu._hide = function() {

		if ($menu._lock())
			$body.removeClass('is-menu-visible');

	};

	$menu._toggle = function() {

		if ($menu._lock())
			$body.toggleClass('is-menu-visible');

	};

	$menuInner
		.on('click', function(event) {
			event.stopPropagation();
		})
		.on('click', 'a', function(event) {

			var href = $(this).attr('href');

			event.preventDefault();
			event.stopPropagation();

			// Hide.
				$menu._hide();

			// Redirect.
				window.setTimeout(function() {
					window.location.href = href;
				}, 250);

		});

	$menu
		.appendTo($body)
		.on('click', function(event) {

			event.stopPropagation();
			event.preventDefault();

			$body.removeClass('is-menu-visible');

		})
		.append('<a class="close" href="#menu">Close</a>');

	$body
		.on('click', 'a[href="#menu"]', function(event) {

			event.stopPropagation();
			event.preventDefault();

			// Toggle.
				$menu._toggle();

		})
		.on('click', function(event) {

			// Hide.
				$menu._hide();

		})
		.on('keydown', function(event) {

			// Hide on escape.
				if (event.keyCode == 27)
					$menu._hide();

		});

	});

})(jQuery);
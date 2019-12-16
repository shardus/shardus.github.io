(function($) {
    'use strict';

    var submitSuccess = function() {
        $.toast({
            text : '<strong style="font-size: 16px;">Success</strong><p>Check your email for our confirmation message and click the subscribe button to be added to our mailing list! (Be sure to check your Spam!)</p>',
            hideAfter : 10000,
            bgColor : 'green',
            icon : 'success',
            position: 'bottom-center'
        });
    };

    var captchaFailure = function() {
        $.toast({
            text : '<strong style="font-size: 16px;">Failure</strong><p>Your form was not submitted. Please complete reCaptcha before resubmitting!</p>',
            hideAfter : 5000,
            bgColor : 'red',
            icon : 'error',
            position: 'bottom-center'
        });
    }

    $(document).on('ready', function() {
			
        /* MENU JS */
		
        $(window).scroll(function() {
            if ($("#mainNav").offset().top > 100) {
                $("#mainNav").addClass("navbar-shrink");
            } else {
                $("#mainNav").removeClass("navbar-shrink");
            }
        });
		
        $('a.js-scroll-trigger').on('click', function(e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 48
            }, 1000);
            e.preventDefault();
        });
		
        // Closes responsive menu when a scroll trigger link is clicked
        $('.js-scroll-trigger').on('click', function() {
            $('.navbar-collapse').collapse('hide');
        });

        // Activate scrollspy to add active class to navbar items on scroll
        $('body').scrollspy({
            target: '#mainNav',
            offset: 54
        });

        $('.newsletter-form').submit(function(e) {
            var $this = $(this);
            e.preventDefault();
            var $captchaResponse = $this.find('[name="g-recaptcha-response"]').val();
            if ($captchaResponse === '') {
                captchaFailure();
                return;
            };
            $.ajax({
                url:'https://my.sendinblue.com/users/subscribeembed/js_id/387o4/id/1',
                type:'post',
                data:$this.serialize(),
                success: submitSuccess
            });
            $this.find('.form-email').val("");
        });
    });
	
})(jQuery);
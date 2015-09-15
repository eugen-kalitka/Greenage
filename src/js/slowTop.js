(function($) {
    var link = $('.top-link');
    var top = $('#firstArticle').offset().top;
    link.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: top
        }, 500);
    });
})(jQuery);

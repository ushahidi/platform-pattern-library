var modalToggle = function(element) {
   var target = typeof element !== 'undefined' ? element : '.modal';

   if ($('body').hasClass('modal-visible')) { // If modal is already visible...
      $('body').removeClass('modal-visible');
      setTimeout(function() {
         $('.modal').fadeOut('fast');
      }, 400);
   } else { // If modal isn't yet visible...
      modalYpos();
      $(target).fadeIn('fast', function(){
         $('body').addClass('modal-visible');
      });
   }
}

var modalYpos = function() {
   var windowYpos = $(window).scrollTop();

   if (windowYpos > 0) {
      $('.modal-window').css('top', windowYpos + 40);
   }

   $('.modal-body').css('max-height', $(window).height() * 0.66);
}

$('[data-modal], .modal-trigger').click(function(e) {
    if ($(this)[0].hasAttribute('data-modal')) {
        modalToggle('#'+$(this).attr('data-modal'));
    } else {
      modalToggle($(this).closest('.modal'));
    }

    e.preventDefault();
});

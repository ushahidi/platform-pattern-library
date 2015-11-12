$('.custom-select').each(function(){
   var context = $(this),
      selectedOption = $(context).find('option:selected');

   $(context).addClass('init');

   function updateIconClass() {
      $(context).removeClass(function(index, className) {
         return (className.match(/(^|\s)fa-\S+/g) || []).join(' ');
      }).addClass($(selectedOption).attr('data-icon'));
   }

   if ($(selectedOption)[0].hasAttribute('data-icon')) {
      updateIconClass();

      $(context).find('select').on('change', function(){
         selectedOption = $(this).children('option:selected');

         updateIconClass();
      });
   }
});

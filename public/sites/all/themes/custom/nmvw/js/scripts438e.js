
jQuery(document).ready(function($){
  var owl = $('.slider');
  var $loop = false;
    if (owl.children().length > 1) {    
       $loop = true;
    }

  $('.slider').owlCarousel({
    items:1,
    loop:$loop,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:false,
    URLhashListener:true,
    startPosition: 'URLHash',

  });
  
  //expanded menu
  var expanded_menu = $('.block-menu-block').find('li.expanded');
  expanded_menu.each(function(){
      $(this).find('a').first().before('<span class="expanded-symbol">+</span>');
      var element = $(this),
          symbol = $(this).find('span.expanded-symbol');
      
      symbol.click(function(){
      if(element.hasClass('active')){
          element.removeClass('active');
          $(this).text('+');
      } else { 
          element.addClass('active');
          $(this).text('-');
      }
     });
  });
});
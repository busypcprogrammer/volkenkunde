(function ($) {

  $(document).ready(function() {

    var usedFacets = [];

    $('.facetapi-active').each(function (i, item) {

      console.log($(this).closest('li').find('.facetapi-active').length);
      var facet = $(this);

      if ($(this).closest('li').find('.facetapi-active').length < 2) {

        var title = facet.find('span').text();
        title = title.substring(8);
        var length = title.length;
        title = title.substring(0, length - 8);

        var facetCategory = "facet-herkomst";
        var pane = $(this).closest('.pane-facet');
        var types = ['facet-herkomst', 'facet-cultuur', 'facet-stijl-periode', 'facet-trefwoord'];

        $.each(types, function (i, type) {
          if (pane.hasClass(type)) {
            facetCategory = type;
          }
        });

        usedFacets.push({
          href: facet.attr('href'),
          title: title,
          type: facetCategory
        });

      }
    });

    $.each(usedFacets, function (i, item) {
      $('.used-facets').show().prepend('<div class="used-facet text-nmvw ' + item.type + '">' + item.title + '<a class="coll-icon icon-close-small" href="' + item.href + '">✖</a></div>')
    });

    $('.facet-used').removeClass('element-invisible').each(function () {

      var text = $(this).find('span').text();
      text = text.substring(8);

      // Remove the last 7 letters
      var length = text.length;
      text = text.substring(0, length - 8);

      $(this).html(text);
    });

    $('.btn-submit').click(function (e) {
      e.preventDefault();
      $(this).closest('form').submit();
    });

    /*$('.collection-object-detail').each(function () {

      $(this).once(function () {

        var script = 'http://s7.addthis.com/js/250/addthis_widget.js#domready=1';
        if (window.addthis) {
          window.addthis = null;
          window._adr = null;
          window._atc = null;
          window._atd = null;
          window._ate = null;
          window._atr = null;
          window._atw = null;
        }
        $.getScript(script);
      });
    }); */

    $('.collection-object-collapse-legend').on("click", function(e){
      e.preventDefault();
      $(this).find('i').toggleClass('icon-drop-down icon-drop-up');
      $(this).closest('.collection-object-collapse').find('.collection-object-collapse-container').slideToggle('fast');
    }).filter(':first').click();

    $('.toggle-workspace-dropdown').on("click", function(e){
      e.preventDefault();
      $(this).toggleClass('active');
      $('.workspace-button-dropdown').fadeToggle('fast');
    });

    // Toggle add to workspace dropdown
    $('.collection-item-workspace-button').on( "click", function(e) {
      e.preventDefault();
      $(this).closest('.collection-item').siblings('.collection-item').find('.collect ion-item-workspace-dropdown').slideUp('fast');
      $(this).next('.collection-item-workspace-dropdown').slideToggle('fast');
    });

    $('.collection-object-detail .btn-add-workspace-and-object').on("click", function(e){
      e.preventDefault();
      $(this).appendChild('<div class="loader"></div>');

      var object_id = $(this).closest('.collection-object-detail').attr('data-oid');


      $.post('/ajax/workspace/add_workspace_and_object', {"object_id":  object_id}, function(data){
        if(data.workspace_url){
          window.location = Drupal.settings.basePath + Drupal.settings.pathPrefix + data.workspace_url;
        }
      }, 'json');
    });

    $(".collection-object-detail a[data-wid]").on('click', function(e){
      e.preventDefault();

      var button = $(this);

      var wid = $(this).attr('data-wid');
      var object = $(this).closest('.collection-object-detail').attr('data-oid');

      $(this).addClass('loading');

      $.post('/ajax/add_object', {"object_id": object, "workspace_id": wid}, function(data){
        button.removeClass('loading');
        button.addClass('succes');

        setTimeout(function(){
          button.removeClass('succes');
        }, 3000);
      });
    });

    $('#collection-items').delegate('.collection-item-workspace-dropdown a[data-wid]' , 'click' , function(e){
        e.preventDefault();

        var button = $(this);

        var wid = $(this).attr('data-wid');
        var object = $(this).closest('.collection-item').attr('data-oid');

        $(this).addClass('loading');

        $.post('/ajax/add_object', {"object_id": object, "workspace_id": wid}, function(data){
          button.removeClass('loading');
          button.addClass('succes');

          setTimeout(function(){
            button.removeClass('succes');
          }, 3000);
        });
    }).delegate('.btn-add-workspace-and-object' ,'click', function(e){
      e.preventDefault();

      $(this).addClass('loading');

      var object_id = $(this).closest('.collection-item').attr('data-oid');

      $.post('/ajax/workspace/add_workspace_and_object', {"object_id":  object_id}, function(data){
        if(data.workspace_url){
            window.location = Drupal.settings.basePath + Drupal.settings.pathPrefix + data.workspace_url;
        }
      }, 'json');

    }).delegate('.buttons button', 'click', function(e){
      e.preventDefault();

      // GRID - SWITCH LIST VIEW

      // TODO: Remember in cookie

      if($(this).hasClass('list')){

        // TODO: Switch to list

        $('div.grid').removeClass('grid').addClass('list');
        $(this).addClass('active').siblings('button').removeClass('active');


        $.post('/ajax/set_view_mode/list', {}, function(data){
          console.log(data);
        });

        // Show different fields.
        $('div.collection-item-meta li.vk-weergave-lichtbak').css("display","none");
        $('div.collection-item-meta li.vk-weergave-lijst').css("display","block");

      } else {

        // TODO: Switch to grid

        $('div.list').removeClass('list').addClass('grid');
        $(this).addClass('active').siblings('button').removeClass('active');

        $.post('/ajax/set_view_mode/grid');

	// Show different fields.
	$('div.collection-item-meta li.vk-weergave-lichtbak').css("display","block");
	$('div.collection-item-meta li.vk-weergave-lijst').css("display","none");
      }
    });

    $('.pagination_current').attr('contenteditable', '');

    $('[contenteditable]').on('focus', function() {
      var $this = $(this);
      $this.data('before', $this.html());
      return $this;
    }).on('blur', function() {
      var $this = $(this);
      if ($this.data('before') !== $this.html()) {
        $this.data('before', $this.html());
        $this.trigger('change');
      }
      return $this;
    }).on('keydown', function(e){
      if(e.which == 13){
        e.preventDefault();
        var $this = $(this);
        $this.trigger('change');
        return $this;
      }
    });

    function setGetParameter(paramName, paramValue)
    {
      var url = window.location.href;
      if (url.indexOf(paramName + "=") >= 0)
      {
        var prefix = url.substring(0, url.indexOf(paramName));
        var suffix = url.substring(url.indexOf(paramName));
        suffix = suffix.substring(suffix.indexOf("=") + 1);
        suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
        url = prefix + paramName + "=" + paramValue + suffix;
      }
      else
      {
        if (url.indexOf("?") < 0)
          url += "?" + paramName + "=" + paramValue;
        else
          url += "&" + paramName + "=" + paramValue;
      }
      window.location.href = url;
    }

    $('.pagination_current').change(function(){
      var page = $(this).val();
      if(!isNaN(page)){
        if(page > 1){
          setGetParameter('page', page -1);
        }
      }
    });

    // Autosuggest on search
    $('.collection-search-banner input[type="text"]').each(function(){
      $(this).autocomplete({
        source: "/ajax/object_suggest",
        minLength: 2,
        position: { my: "left top", at: "left bottom", collision: "none"},
        select: function( event, ui ) {
          event.preventDefault();
          $(this).val(ui.item.label);
          $(this).parent().next().val(ui.item.value);
        },
        focus: function( event, ui ) {
          event.preventDefault();
          $(this).val(ui.item.label);
          $(this).parent().next().val(ui.item.value)
        }
      });
    });
  });
}(jQuery));

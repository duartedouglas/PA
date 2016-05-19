$(document).on('pageload', function(){
	$('.parallax').parallax();
	$('.tabs').tabs();
	$('.dropdown-button').dropdown();
  $(".button-collapse").sideNav();
  $('.modal-trigger').leanModal({
    dismissible: true,
    opacity: .5,
    complete: function() { 
      $(document).trigger('modalclose');
    }
  });

  if (!navigator.getUserMedia) {
    $('.code-scan').hide();
  }

  var options = [
     {selector: '.collection-item', offset: 200,  }
   ];
   Materialize.scrollFire(options);
});
$(document).ready(function(){
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal-trigger').leanModal();
  $(".button-collapse").sideNav();
});
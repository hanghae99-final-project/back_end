$(function() {

  $('.js-check-all').on('click', function() {
    
    if ( $(this).prop('checked') ) {
      $('.control--checkbox input[type="checkbox"]').each(function() {
        $(this).prop('checked', true);
      })
    } else {
      $('.control--checkbox input[type="checkbox"]').each(function() {
        $(this).prop('checked', false);
      })
    }

  });

  $('.js-ios-switch-all').on('click', function() {
    
    if ( $(this).prop('checked') ) {
      $('.ios-switch input[type="checkbox"]').each(function() {
        $(this).prop('checked', true);
        $(this).closest('tr').addClass('active');
      })
    } else {
      $('.ios-switch input[type="checkbox"]').each(function() {
        $(this).prop('checked', false);
        $(this).closest('tr').removeClass('active');
      })
    }

  });

  

  $('.ios-switch input[type="checkbox"]').on('click', function() {
    if ( $(this).closest('tr').hasClass('active') ) {
      $(this).closest('tr').removeClass('active');
    } else {
      $(this).closest('tr').addClass('active');
    }
  });

    

});
function addItemToCart(name, price) {
  shoppingCart.addItemToCart(name, parseFloat(price), 1);
  var count = shoppingCart.totalCount();
  $('#cartItemCount').text(" (" + count + ")");
}

$(document).ready(function() {
  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    addItemToCart($(this).data('name'), $(this).data('price'));
  });

  $('#searchItem').on('click', function(event) {
    event.preventDefault();
    var keyword = $('#keyword').val().toLowerCase();
    $('.card').each(function() {
      var title = $(this).find('.card-title').text().toLowerCase();
      if (title.includes(keyword)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  $(window).on('resize', function() {
    if ($(window).width() < 768) {
      $('.card').addClass('col-md-6');
    } else {
      $('.card').removeClass('col-md-6');
    }
  });
});

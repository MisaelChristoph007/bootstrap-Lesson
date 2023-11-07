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

  $('#formItem').submit(function(event) {
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

$(document).ready(function(){
  $('#addtocart').on('click',function(){

    var button = $(this);
    var cart = $('#cart');
    var cartTotal = cart.attr('data-totalitems');
    var newCartTotal = parseInt(cartTotal) + 1;

    button.addClass('sendtocart');
    setTimeout(function(){
      button.removeClass('sendtocart');
      cart.addClass('shake').attr('data-totalitems', newCartTotal);
      setTimeout(function(){
        cart.removeClass('shake');
      },500)
    },1000)
  })
})

const cart = {
  items: [],

  addItem: function (name, price) {
    this.items.push({ name, price });
  },

  getTotalPrice: function () {
    return this.items.reduce((total, item) => total + item.price, 0);
  },

  clearCart: function () {
    this.items = [];
  },
};

// Function to update the cart and cart modal
function updateCart() {
  const showCartTable = document.querySelector('.show-cart-popup');
  const totalCartSpan = document.querySelector('.total-cart-popup');
  showCartTable.innerHTML = '';
  cart.items.forEach((item) => {
    showCartTable.innerHTML += `<tr><td>${item.name}</td><td>$${item.price.toFixed(2)}</td></tr>`;
  });
  totalCartSpan.textContent = cart.getTotalPrice().toFixed(2);
  document.getElementById('cartItemCount').textContent = ` (${cart.items.length})`;
}

// Handle the "Order now" button click
document.getElementById('orderButton').addEventListener('click', () => {
  Swal.fire('Order Placed', 'Your order has been placed successfully!', 'success');
  cart.clearCart();
  updateCart();
  $('#cartPopup').modal('hide');
});

// Search functionality
document.getElementById('searchButton').addEventListener('click', () => {
  const keyword = document.getElementById('keyword').value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    if (title.includes(keyword) || keyword === '') {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// Handle the "Clear Cart" button click
document.getElementById('clearCartButton').addEventListener('click', () => {
  cart.clearCart();
  updateCart();
  Swal.fire('Cart Cleared', 'Your cart has been cleared.', 'success');
});

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    cart.addItem(name, price);
    updateCart();
    Swal.fire('Sukses ditambahkan!', `${name} ditambahkan ke keranjang!`, 'success');
  });
});

// Handle the cart button click to open the cart popup
document.getElementById('cart').addEventListener('click', () => {
  updateCart();
  $('#cartPopup').modal('show');
});
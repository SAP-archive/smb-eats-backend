$(function () {

  var goToCartIcon = function ($addTocartBtn) {
    var $cartIcon = $(".my-cart-icon");
    var $image = $('<img width="50px" height="50px" src="' + $addTocartBtn.data("image") + '"/>').css({
    "position": "fixed",
    "z-index": "999"
    });
    $addTocartBtn.prepend($image);
    var position = $cartIcon.position();
    $image.animate({
    top: position.top,
    left: position.left
    }, 500, "linear", function () {
    $image.remove();
    });
  }

  $('.my-cart-btn').myCart({
    currencySymbol: '$',
    classCartIcon: 'my-cart-icon',
    classCartBadge: 'my-cart-badge',
    classProductQuantity: 'my-product-quantity',
    classProductRemove: 'my-product-remove',
    classCheckoutCart: 'my-cart-checkout',
    affixCartIcon: true,
    showCheckoutModal: true,
    numberOfDecimals: 2,
    //cartItems: cartItems,
    clickOnAddToCart: function ($addTocart) {
    goToCartIcon($addTocart);

    },
    afterAddOnCart: function (products, totalPrice, totalQuantity) {
    console.log("afterAddOnCart", products, totalPrice, totalQuantity);
    },
    clickOnCartIcon: function ($cartIcon, products, totalPrice, totalQuantity) {
    console.log("cart icon clicked", $cartIcon, products, totalPrice, totalQuantity);
    },
    checkoutCart: function (products, totalPrice, totalQuantity) {
    console.log(JSON.stringify(products));
    checkout(products);
    },
    getDiscountPrice: function (products, totalPrice, totalQuantity) {
    console.log("calculating discount", products, totalPrice, totalQuantity);
    return totalPrice;
    }
  });
  
  let generateProductHtml = function(product){ 
    return `<div class="col-md-3 text-center">
    <img class="image" src="${product.image}">
    <h2>${product.productid}</h2>
    <h2>${product.name}</h2>
    <h2>Price: ${product.price}${product.priceCurrency}</h2>
    <button class="btn btn-default btn-danger btn-lg my-cart-btn" data-id="${product.productid}" data-name="${product.name}"
    data-source="${product.source}" data-price="${product.price}" data-quantity="1" data-image="${product.image}">Add to Cart</button>
  </div>`;
    };

  let listedProducts = 
  [{
    "productid": "A00001",
    "name": "Pepperoni Pizza",
    "score": 1.0,
    "image": "https://cdn.tasteatlas.com/images/dishes/b05a0af72ad845f3a6abe16143d7853a.jpg?w=600&h=450",
    "price": 16,
    "priceCurrency": "$",
    "inventoryLevel": 100
  },
    {
      "productid": "A00002",
      "name": "Margherita Pizza",
      "image": "https://img.taste.com.au/PwXf3RRU/w720-h480-cfill-q80/taste/2016/11/eat-pray-love-39581-3.jpeg",
      "score": 1.0,
      "price": 15,
      "priceCurrency": "$",
      "inventoryLevel": 100
    },
    {
      "productid": "A00003",
      "name": "Meat Lover",
      "image": "https://i.pinimg.com/originals/3b/8e/b6/3b8eb6a7dee5fe35fad8fdd37a784b2c.jpg",
      "score": 1.0,
      "price": 18,
      "priceCurrency": "$",
      "inventoryLevel": 100
    },
    {
      "productid": "A00004",
      "name": "Veggie Lover",
      "image": "https://i.pinimg.com/originals/5f/f3/3d/5ff33d7df72e71d8755784135a6e6edd.png",
      "score": 1.0,
      "price": 18,
      "priceCurrency": "$",
      "inventoryLevel": 100
    }
  ];
  // if (selectedProduct && selectedProduct.productid) {
  //   let html = generateProductHtml(selectedProduct);
  //   $('#body').append(
  //   `<div class="row" id="SelectedProduct">
  //     ${html}
  //   </div>`);
  // }

  //let listedProducts = <%- JSON.stringify(listedProducts); %>;
  if (listedProducts && listedProducts.length > 0) {
    $('#body').append(
    `<div class="row" id="SimilarProductLabel">
      <p class="text-left"><h1><strong>Pizzas:</strong></h1></p>
    </div>`);
  }

  if (listedProducts && listedProducts.length > 0) {
    $('#body').append(
    `<div id="listedProducts" class="row">
    </div>`);
  }
      
  listedProducts.forEach(product => {
    $('#listedProducts').append(generateProductHtml(product))
  });
  
  ////////////////google map///////////
  $('#body').append(
  `<footer>
  <div class="modal fade" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content bmd-modalContent">

        <div class="modal-body">
          <div class="close-button">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" frameborder="0"></iframe>
          </div>
        </div>

      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->

  </footer>`);

  $.fn.bmdIframe = function( options ) {
    var self = this;
    var settings = $.extend({
      classBtn: '.bmd-modalButton',
      defaultW: 800,
      defaultH: 600
    }, options );
  
    $(settings.classBtn).on('click', function(e) {
    var allowFullscreen = $(this).attr('data-bmdVideoFullscreen') || false;
    
     var dataVideo = {
      'src': $(this).attr('data-bmdSrc'),
      'height': $(this).attr('data-bmdHeight') || settings.defaultH,
      'width': $(this).attr('data-bmdWidth') || settings.defaultW
    };
    
    if ( allowFullscreen ) dataVideo.allowfullscreen = "";
    
    // stampiamo i nostri dati nell'iframe
    $(self).find("iframe").attr(dataVideo);
    });
  
    // se si chiude la modale resettiamo i dati dell'iframe per impedire ad un video di continuare a riprodursi anche quando la modale è chiusa
    this.on('hidden.bs.modal', function(){
    $(this).find('iframe').html("").attr("src", "");
    });

    this.on('show.bs.modal', function (e) {
    // console.log(window.top.scrollY);
    //let windowHeight = $(window).height();
    // console.log(windowHeight);
    
    //let top = windowHeight / 2;
    // console.log(top);
    //$('#myModal').css('top', `${top}px`);
    $('#myModal').css('top', NaN);
    });  
    return this;
  };

  $("#myModal").bmdIframe();
  /////end of google rendering//////////////
  }
);
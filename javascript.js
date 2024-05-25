function copyMenu(){
    //copy inside .dpt-cat to .departments
    var dptCategory = document.querySelector('.dpt-cat');
    var dptPlace = document.querySelector('.departments');
    if (dptCategory && dptPlace) {
        dptPlace.innerHTML = dptCategory.innerHTML;
    }

    //copy inside nav to nav
    var mainNav = document.querySelector('.header-nav nav');
    var navPlace = document.querySelector('.off-canvas nav');
    if (mainNav && navPlace) {
        navPlace.innerHTML = mainNav.innerHTML;
    }

    //copy .header-top .wrapper to .thetop-nav
    var topNav = document.querySelector('.header-top .wrapper');
    var topPlace = document.querySelector('.off-canvas .thetop-nav');
    if (topNav && topPlace) {
        topPlace.innerHTML = topNav.innerHTML;
    }
}
copyMenu();
//show mobile menu
const menuButton = document.querySelector('.trigger'),
      closeButton = document.querySelector('.t-close'),
      addClass = document.querySelector('.site');
      menuButton.addEventListener('click', function(){
        addClass.classList.toggle('showmenu')
      })
      closeButton.addEventListener('click', function(){
        addClass.classList.remove('showmenu')
      })

//show sub menu on mobile
const submenus = document.querySelectorAll('.has-child .icon-small');
submenus.forEach((menu) => menu.addEventListener('click', toggle));

function toggle(e) {
    e.preventDefault();
    submenus.forEach((item) => {
        if (item !== this) {
            item.closest('.has-child').classList.remove('expand');
        }
    });
    this.closest('.has-child').classList.toggle('expand');
}


//slider
const swiper = new Swiper('.swiper', {
   
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
  });

  //=========== SHOW SEARCH============
  const searchButton = document.querySelector('.t-search'),
       tClose = document.querySelector('.search-close'),
       showClass = document.querySelector('.site');
       searchButton.addEventListener('click', function(){
        showClass.classList.toggle('showsearch')
       })
       tClose.addEventListener('click', function(){
        showClass.classList.remove('showsearch')
       })
//==========SHOW DPT MENU=====
const dptButton = document.querySelector('.dpt-cat .dpt-trigger'),
      dptClass = document.querySelector('.site');
      dptButton.addEventListener('click', function(){
        dptClass.classList.toggle('showdpt')
      })
      //==========PRODUCT IMAGE SLIDER=========
      var productThumb = new Swiper('.small-image', {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
          481: {
            spaceBetween: 32,
          }
        }
      });
      
      var productBig = new Swiper('.big-image', {
        loop: true,
        autoHeight: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        thumbs: {
          swiper: productThumb
        }
      });
      //===========stock products bar width percentage
      
var stocks = document.querySelectorAll('.products .stock');
for (let x = 0; x < stocks.length; x++) {
  let stock = stocks[x].dataset.stock,
 
  available = stocks[x].querySelector('.qty-available').innerHTML,
  sold = stocks[x].querySelector('.qty-sold').innerHTML,
  percent = sold*100/stock;
  stocks[x].querySelector('.available').style.width = percent + '%';

}

//=============FILTER SHOW =======
const FtoShow = '.filter';
const Fpopup = document.querySelector(FtoShow);
const Ftrigger = document.querySelector('.filter-trigger');

Ftrigger.addEventListener('click', (event) => {
  event.stopPropagation();  // Prevent the click from propagating to the document
  setTimeout(() => {
    if (!Fpopup.classList.contains('show')) {
      Fpopup.classList.add('show');
    }
  }, 250);
});

// Auto-close the popup by clicking outside of it
document.addEventListener('click', (e) => {
  const isClosest = e.target.closest(FtoShow);
  if (!isClosest && Fpopup.classList.contains('show')) {
    Fpopup.classList.remove('show');
  }
});

// Prevent the popup from closing when clicking inside it
Fpopup.addEventListener('click', (event) => {
  event.stopPropagation();
});
//show cart on click
const divtoShow = '.mini-cart';
const divPopup = document.querySelector(divtoShow);
const divTrigger = document.querySelector('.cart-trigger');
divTrigger.addEventListener('click', () => {
setTimeout(() => {
  if(!divPopup.classList.contains('show')){
    divPopup.classList.add('show');
  }
}, 250 )

})
//close by click outside
document.addEventListener('click', (e) => {
  const isClosest = e.target.closest(divtoShow);
  if(!isClosest && divPopup.classList.contains('show')){
    divPopup.classList.remove('show')
  }
})
//==============show modal on load==========
//===========add to cart========
// Get all quantity input fields and their corresponding price elements
const quantityInputs = document.querySelectorAll('.qty-control input[type="text"]');
const priceElements = document.querySelectorAll('.products.one.cart tbody tr td:nth-child(2)');

// Function to calculate the subtotal for each item
function calculateSubtotal(quantityInput, priceElement) {
  const quantity = parseInt(quantityInput.value, 10);
  const price = parseFloat(priceElement.textContent.replace('$', ''));
  const subtotal = quantity * price;
  return subtotal.toFixed(2);
}

// Function to update the subtotal for each item
function updateSubtotal(quantityInput, priceElement) {
  const subtotal = calculateSubtotal(quantityInput, priceElement);
  const subtotalElement = quantityInput.closest('tr').querySelector('td:nth-child(4)');
  subtotalElement.textContent = `$${subtotal}`;
}

// Add event listeners to quantity input fields
quantityInputs.forEach((input) => {
  input.addEventListener('change', (e) => {
    const priceElement = input.closest('tr').querySelector('td:nth-child(2)');
    updateSubtotal(input, priceElement);
    calculateTotal();
  });
});

// Add event listeners to plus and minus buttons
document.querySelectorAll('.qty-control button').forEach((button) => {
  button.addEventListener('click', (e) => {
    const input = button.closest('.qty-control').querySelector('input[type="text"]');
    const priceElement = input.closest('tr').querySelector('td:nth-child(2)');
    if (button.classList.contains('plus')) {
      input.value = parseInt(input.value, 10) + 1;
    } else if (button.classList.contains('minus')) {
      input.value = Math.max(1, parseInt(input.value, 10) - 1);
    }
    updateSubtotal(input, priceElement);
    calculateTotal();
  });
});

// Calculate and update the total
function calculateTotal() {
  const subtotalElements = document.querySelectorAll('.products.one.cart tbody tr td:nth-child(4)');
  let total = 0;
  subtotalElements.forEach((element) => {
    total += parseFloat(element.textContent.replace('$', ''));
  });
  const totalElement = document.querySelector('.cart-total .grand-total td:nth-child(2)');
  totalElement.textContent = `$${total.toFixed(2)}`;
}

// Initial total calculation on page load
calculateTotal();



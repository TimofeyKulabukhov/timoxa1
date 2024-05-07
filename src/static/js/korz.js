document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const totalPriceElement = document.querySelector('.total-price'); 
    function updateCart() {
        cartContainer.innerHTML = '';
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
          emptyCartMessage.style.display = 'block';
        } else {
          emptyCartMessage.style.display = 'none';
          cart.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.classList.add('cart-item');
            productElement.innerHTML = `
              <img src="${product.image}" alt="${product.title}" class="cart-item-image">
              <div class="cart-item-info">
              <p class="cart-item-price">${product.price}</p>
                <h4 class="cart-item-title">${product.title}</h4>
               
                <div class="item-quantity">
                  <button class="quantity-minus" data-index="${index}">-</button>
                  <input type="number" value="${product.quantity}" class="quantity-input" readonly>
                  <button class="quantity-plus" data-index="${index}">+</button>
                </div>
                <p class="item-subtotal">${(product.price * product.quantity).toFixed(2)}Р</p>
              </div>
              <button class="item-remove" data-index="${index}">✖</button>
            `;
            cartContainer.appendChild(productElement);
      
         
            productElement.querySelector('.quantity-minus').addEventListener('click', decreaseQuantity);
            productElement.querySelector('.quantity-plus').addEventListener('click', increaseQuantity);
            productElement.querySelector('.item-remove').addEventListener('click', removeItem);
          });
        }
      }
    function updateTotalPrice() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        totalPriceElement.textContent = `Итого без доставки: ${totalPrice.toFixed(2)} Р`;
      }
      function updateItemSubtotal(productElement, product) {
        const subtotalElement = productElement.querySelector('.item-subtotal');
        subtotalElement.textContent = `${(product.price * product.quantity).toFixed(2)}Р`;
      }
      function decreaseQuantity(event) {
        // Уменьшаем количество товара
        let index = event.target.dataset.index;
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1); // Удаляем товар, если его количество стало меньше 1
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
      }
      
      function increaseQuantity(event) {
        // Увеличиваем количество товара
        let index = event.target.dataset.index;
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart[index].quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
      }
      
      function removeItem(event) {
        
        let index = event.target.dataset.index;
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
      }
  
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCart);
    });
  
    function addToCart(event) {
      const button = event.target;
      const productCard = button.closest('.product-card');
      const productImage = productCard.querySelector('.product-image').src;
      const productTitle = productCard.querySelector('.product-title').textContent;
      const productPriceText = productCard.querySelector('.product-price').textContent;
      const productPrice = parseFloat(productPriceText.replace(/[^\d.-]/g, ''));
      
      const product = {
        image: productImage,
        title: productTitle,
        price: productPrice, // теперь это должно быть числом
        quantity: 1
      };
  
      addProductToCart(product);
    }
    function changeItemQuantity(productTitle, increment) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let product = cart.find(item => item.title === productTitle);
        if (product) {
          product.quantity += increment;
          if (product.quantity <= 0) {
            cart = cart.filter(item => item.title !== productTitle);
          }
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCart();
          updateTotalPrice();
        }
      }
      
      function removeItemFromCart(productTitle) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.title !== productTitle);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        updateTotalPrice();
      }
      
   
      document.querySelectorAll('.quantity-plus').forEach(button => {
        button.addEventListener('click', (event) => {
          const productName = event.target.closest('.cart-item').querySelector('.cart-item-title').textContent;
          changeItemQuantity(productName, 1);
        });
      });
      
      document.querySelectorAll('.quantity-minus').forEach(button => {
        button.addEventListener('click', (event) => {
          const productName = event.target.closest('.cart-item').querySelector('.cart-item-title').textContent;
          changeItemQuantity(productName, -1);
        });
      });
      
      document.querySelectorAll('.item-remove').forEach(button => {
        button.addEventListener('click', (event) => {
          const productName = event.target.closest('.cart-item').querySelector('.cart-item-title').textContent;
          removeItemFromCart(productName);
        });
      });
      function updateTotalPrice() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        totalPriceElement.textContent = `${total.toFixed(2)} Р`; // Форматируем с двумя знаками после запятой
      }
    function addProductToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let existingProduct = cart.find(item => item.title === product.title);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
      alert('Товар добавлен в корзину');
    }
    setInterval(updateTotalPrice, 1000);
    updateCart();
  });
  
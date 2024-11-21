document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', function() {
        this.style.backgroundColor = '#00b894';
        this.textContent = 'Added';
        setTimeout(() => {
            this.style.backgroundColor = '#333';
            this.textContent = 'Add to Cart';
        }, 2000);
    });
});

document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', function() {
        this.style.backgroundColor = '#d63031';
        this.textContent = 'Purchasing...';
        setTimeout(() => {
            this.style.backgroundColor = '#333';
            this.textContent = 'Buy Now';
        }, 2000);
    });
});





let currentIndex = 0;

function scrollCarousel(direction) {
  const carousel = document.querySelector('.carousel');
  const items = document.querySelectorAll('.carousel-item');
  const totalItems = items.length;

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalItems - 1;
  } else if (currentIndex >= totalItems) {
    currentIndex = 0;
  }

  const scrollAmount = currentIndex * items[0].clientWidth;
  carousel.scrollLeft = scrollAmount;
}





//cart...........................................


let cart = [];

// Function to add item to cart
function addToCart(itemId) {
    const shoeCard = document.getElementById(itemId);
    const item = {
        id: itemId,
        name: shoeCard.querySelector('h3').innerText,
        price: parseFloat(shoeCard.querySelector('.price').innerText.replace('MRP : ₹ ', '')),
        quantity: 1
    };
    
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }
    updateCart();
}

// Function to remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>Price: ₹${item.price} x ${item.quantity} = ₹${itemTotal.toFixed(2)}</p>
                <button onclick="removeFromCart('${item.id}')">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

// Attach event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', () => {
        const shoeId = button.closest('.shoe-card').id; // Get the ID of the shoe card
        addToCart(shoeId);
    });
});

// Cart modal functionality
const cartModal = document.getElementById('cart-modal');
const cartButton = document.querySelector('.cartt-button'); // Select the cart button directly
const closeModal = document.getElementById('close-modal');

// Open the cart modal
cartButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    cartModal.style.display = 'block'; // Show the modal
});

// Close the cart modal
closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none'; // Hide the modal
});

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none'; 
    }
});





// Function to add item to cart..................................................
function addToCart(itemId) {
  const shoeCard = document.getElementById(itemId);
  const item = {
      id: itemId,
      name: shoeCard.querySelector('h3').innerText,
      price: parseFloat(shoeCard.querySelector('.price').innerText.replace('MRP : ₹ ', '')),
      quantity: 1,
      image: shoeCard.querySelector('img').src // Get the image source
  };
  
  const existingItem = cart.find(cartItem => cartItem.id === itemId);
  if (existingItem) {
      existingItem.quantity++;
  } else {
      cart.push(item);
  }
  updateCart();
}

// Function to update the cart display
function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  let totalPrice = 0;

  cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;

      const itemElement = document.createElement('div');
      itemElement.innerHTML = `
          <div style="display: flex; align-items: center; margin-bottom: 10px;">
              <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto; margin-right: 10px;">
              <div>
                  <h4>${item.name}</h4>
                  <p>Price: ₹${item.price} x ${item.quantity} = ₹${itemTotal.toFixed(2)}</p>
                  <button onclick="removeFromCart('${item.id}')">Remove</button>
              </div>
          </div>
      `;
      cartItemsContainer.appendChild(itemElement);
  });

  document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}


// Payment option...............................................


/// Function to toggle the cart display
function toggleCart() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.style.display = cartModal.style.display === 'none' ? 'block' : 'none';
}

// Function to handle checkout
document.getElementById('checkout-button').addEventListener('click', () => {
  // Clear the cart items display
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  // Get the total price
  const totalPrice = parseFloat(document.getElementById('total-price').innerText);

  // Check if the total price is greater than zero
  if (totalPrice > 0) {
      // Show payment options as radio buttons
      const paymentOptionsHTML = `
          <h3>Select Payment Method</h3>
          <label>
              <input type="radio" name="payment" value="UPI" onclick="showPaymentFields('UPI')"> UPI
          </label><br>
          <label>
              <input type="radio" name="payment" value="Debit/Credit Card" onclick="showPaymentFields('Card')"> Debit & Credit Card
          </label><br>
          <div id="payment-fields" style="display: none;"></div>
          <button id="confirm-payment">Confirm Payment</button>
      `;
      cartItemsContainer.innerHTML = paymentOptionsHTML;

      // Reattach the event listener for the confirm payment button
      document.getElementById('confirm-payment').addEventListener('click', handlePaymentConfirmation);
  } else {
      alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
  }
});

// Function to show payment fields based on selected method
function showPaymentFields(method) {
  const paymentFieldsContainer = document.getElementById('payment-fields');
  if (method === 'UPI') {
      paymentFieldsContainer.innerHTML = `
          <label for="upi-id">Enter UPI ID:</label>
          <input type="text" id="upi-id" placeholder="example@upi"><br>
      `;
  } else if (method === 'Card') {
      paymentFieldsContainer.innerHTML = `
          <label for="card-number">Card Number:</label>
          <input type="text" id="card-number" placeholder="1234 5678 9012 3456"><br>
          <label for="cvv">CVV:</label>
          <input type="text" id="cvv" placeholder="123"><br>
          <label for="expiry-date">Expiry Date (MM/YY):</label>
          <input type="text" id="expiry-date" placeholder="MM/YY"><br>
      `;
  }
  paymentFieldsContainer.style.display = 'block'; // Show the payment fields
}

// Function to handle payment confirmation
function handlePaymentConfirmation() {
  const selectedPayment = document.querySelector('input[name="payment"]:checked');
  if (selectedPayment) {
      const method = selectedPayment.value;
      if (method === 'UPI') {
          const upiId = document.getElementById('upi-id').value;
          if (upiId) {
              confirmPayment(method, upiId);
          } else {
              alert('Please enter your UPI ID.');
          }
      } else if (method === 'Debit/Credit Card') {
          const cardNumber = document.getElementById('card-number').value;
          const cvv = document.getElementById('cvv').value;
          const expiryDate = document.getElementById('expiry-date').value;
          if (cardNumber && cvv && expiryDate) {
              confirmPayment(method, { cardNumber, cvv, expiryDate });
          } else {
              alert('Please fill in all card details.');
          }
      }
  } else {
      alert('Please select a payment method.');
  }
}

// Function to confirm payment
function confirmPayment(method, details) {
  if (method === 'UPI') {
      alert(`Payment confirmed! You have selected UPI as your payment method. UPI ID: ${details}`);
  } else if (method === 'Debit/Credit Card') {
      alert(`Payment confirmed! You have selected Debit/Credit Card as your payment method. Card Number: ${details.cardNumber}, CVV: ${details.cvv}, Expiry Date: ${details.expiryDate}`);
  }
 
}
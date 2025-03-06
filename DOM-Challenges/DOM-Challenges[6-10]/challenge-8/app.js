/**
 * Write your challenge solution here
 */

const items = {
  TShirt: {
    price: 19.99,
    currency: '$',
  },
  Jeans: {
    price: 49.99,
    currency: '$',
  },
  Sneakers: {
    price: 79.99,
    currency: '$',
  },
  Hat: {
    price: 24.99,
    currency: '$',
  },
};
const precision = 2;
const cartItems = document.getElementById('cart-items');

function createButton(buttonContent, className = undefined) {
  const button = document.createElement('button');
  className && button.classList.add(className);
  button.innerText = buttonContent;
  return button;
}

function createQuantitySpan(
  quantity,
  className = undefined,
  currency = undefined
) {
  const span = document.createElement('span');
  className && span.classList.add(className);
  span.innerText = currency ? `${currency}${quantity}` : quantity;
  return span;
}

function getQuantityControl(itemName) {
  const price = items[itemName].price;
  const currency = items[itemName].currency;
  const itemQuantityDiv = document.createElement('div');
  itemQuantityDiv.classList.add('quantity-controls');

  const minusButton = createButton('-', 'minus-btn');
  const plusButton = createButton('+', 'plus-btn');
  const removeButton = createButton('remove', 'remove-btn');

  const itemQuantity = createQuantitySpan(1, 'item-quantity');
  const itemPrice = createQuantitySpan(price, 'item-price', currency);

  itemQuantityDiv.appendChild(minusButton);
  itemQuantityDiv.appendChild(itemQuantity);
  itemQuantityDiv.appendChild(plusButton);
  itemQuantityDiv.appendChild(itemPrice);
  itemQuantityDiv.appendChild(removeButton);

  return itemQuantityDiv;
}

function calculatePayment() {
  let sum = 0.0;
  document.querySelectorAll('.item-price').forEach((itemPriceElement) => {
    sum = sum + Number(itemPriceElement.innerText.substring(1));
  });
  document.querySelector('#cart-total h3').innerText = `Total: ${sum.toFixed(
    precision
  )}`;
}

function checkIfAnyCartItemPresent() {
  const totalCartItem = document.querySelectorAll('.cart-item').length;
  if (totalCartItem) return;
  else {
    document.querySelector('.empty-cart').style.display = 'block';
    document.querySelector('#cart-total h3').innerText = `Total: $0.0`;
  }
}

function decreaseItemQuantity(cartItem, itemName, quantity) {
  const itemQuantityElement = cartItem.querySelector('.item-quantity');
  const itemPriceElement = cartItem.querySelector(`.item-price`);

  const itemQuantityOrdered = Number(itemQuantityElement.innerText) - quantity;

  if (itemQuantityOrdered == 0) {
    cartItem.remove();
    checkIfAnyCartItemPresent();
    return;
  }

  itemQuantityElement.innerText = itemQuantityOrdered;
  itemPriceElement.innerText = `${items[itemName].currency}${(
    itemQuantityOrdered * items[itemName].price
  ).toFixed(precision)}`;
  calculatePayment();
}

function increaseItemQuantity(cartItem, itemName) {
  const itemQuantityElement = cartItem.querySelector('.item-quantity');
  const itemPriceElement = cartItem.querySelector(`.item-price`);

  let itemQuantityOrdered = Number(itemQuantityElement.innerText) + 1;

  itemQuantityElement.innerText = itemQuantityOrdered;

  itemPriceElement.innerText = `${items[itemName].currency}${(
    itemQuantityOrdered * items[itemName].price
  ).toFixed(2)}`;
  calculatePayment();
}

function removeCartItem(cartItem) {
  const cartItemQuantity = Number(
    cartItem.querySelector('.item-quantity').innerText
  );
  // const cartItemName = cartItem.firstChild.innerText.trim().split('-').join('');
  const cartItemName = cartItem.dataset.item.trim().split('-').join('');
  decreaseItemQuantity(cartItem, cartItemName, cartItemQuantity);
  calculatePayment();
}

function cartItemOperation(e) {
  //   const itemName = e.target
  //     .closest('.cart-item')
  //     .firstChild.textContent.trim()
  //     .split('-')
  //     .join('');

  const targetButton = e.target;
  const cartItem = targetButton.closest('.cart-item');
  const itemName = cartItem.dataset.item.trim().split('-').join('');
  if (targetButton.matches('.minus-btn')) {
    decreaseItemQuantity(cartItem, itemName, 1);
  }

  if (targetButton.matches('.plus-btn')) {
    increaseItemQuantity(cartItem, itemName);
  }

  if (targetButton.matches('.remove-btn')) {
    removeCartItem(cartItem);
  }
}

function addToCart(itemName, price) {
  const isItemAlreadyAdded = cartItems.querySelector(
    `[data-item="${itemName}"]`
  );

  if (isItemAlreadyAdded) {
    increaseItemQuantity(
      isItemAlreadyAdded,
      itemName.trim().split('-').join('')
    );
    return;
  }

  if (
    cartItems.children.length == 1 &&
    cartItems.firstElementChild.matches('.empty-cart')
  ) {
    cartItems.firstElementChild.style.display = 'none';
  }

  const cartItem = document.createElement('div');
  const itemToBuy = document.createTextNode(itemName);

  cartItem.classList.add('cart-item');
  cartItem.setAttribute('data-item', itemName);

  const itemQuantityDiv = getQuantityControl(
    itemName.trim().split('-').join('')
  );

  cartItem.appendChild(itemToBuy);
  cartItem.append(itemQuantityDiv);

  cartItems.appendChild(cartItem);
  calculatePayment();
}

cartItems.addEventListener('click', cartItemOperation);

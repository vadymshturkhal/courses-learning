'use strict';

// Used dependency injection

const currencyFormat = (price) =>
  new Intl.NumberFormat('en-En', {
    currency: 'usd',
    style: 'currency',
  }).format(price);

for (const price of document.querySelectorAll('.price')) {
  price.textContent = currencyFormat(price.textContent);
}

// Dependency injection
window.api = {};
window.api.currencyFormat = currencyFormat;

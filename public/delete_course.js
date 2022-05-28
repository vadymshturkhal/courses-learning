'use strict';

const $cart = document.querySelector('#cart');
if ($cart) {
  $cart.addEventListener('click', (event) => {
    if (event.target.classList.contains('cart-remove')) {
      const id = event.target.dataset.id;
      fetch('/cart/remove/' + id, {
        method: 'delete',
      })
        .then((res) => res.json())
        .then((cart) => {
          if (cart.courses.length) {
            const html = cart.courses
              .map(
                (course) => `
                  <tr>
                    <td>${course.title}</td>
                    <td>${course.course_quantity}</td>
                    <td>${course.price}</td>
                    <td>
                      <button
                        class="btn btn-small cart-remove"
                        data-id=${course.course_id}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>`
              )
              .join('');
            $cart.querySelector('tbody').innerHTML = html;
            $cart.querySelector('.price').textContent =
              window.api.currencyFormat(cart.price);
          } else {
            $cart.innerHTML = '<p>Cart is empty *from inner*</p>';
          }
        });
    }
  });
}

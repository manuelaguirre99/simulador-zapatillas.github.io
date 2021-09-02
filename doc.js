//Funcion para agregar al carrito de compras

const agregarCarritoButtons = document.querySelectorAll('.agregarcarrito');
agregarCarritoButtons.forEach((agregarCarritoCompraButton) => {
  agregarCarritoCompraButton.addEventListener('click', agregarCarritoClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const containerItemsCarrito = document.querySelector(
  '.containerItemsCarrito'
);

function agregarCarritoClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  agregarItemAlCarrito(itemTitle, itemPrice, itemImage);
}

function agregarItemAlCarrito(itemTitle, itemPrice, itemImage) {
  const elementsTitle = containerItemsCarrito.getElementsByClassName(
    'tituloItemCarrito'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.cantidadItemCarrito'
      );
      elementQuantity.value++;
      $('.toast').toast('show');
      actualizarTotalCarrito();
      return;
    }
  }

  //Agregar item con imagen/precio al carrito 

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row itemCarrito">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title tituloItemCarrito text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 precioItemCarrito">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input cantidadItemCarrito" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  containerItemsCarrito.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removerItemCarrito);

  shoppingCartRow
    .querySelector('.cantidadItemCarrito')
    .addEventListener('change', quantityChanged);

  actualizarTotalCarrito();
}
function removerItemCarrito(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.itemCarrito').remove();
  actualizarTotalCarrito();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  actualizarTotalCarrito();
}

function comprarButtonClicked() {
  containerItemsCarrito.innerHTML = '';
  actualizarTotalCarrito();
}


function actualizarTotalCarrito() {
  let total = 0;
  const totalCarrito = document.querySelector('.totalCarrito');

  const itemsCarrito = document.querySelectorAll('.itemCarrito');

  itemsCarrito.forEach((itemCarrito) => {
    const precioItemCarritoElement = itemCarrito.querySelector(
      '.precioItemCarrito'
    );
    const precioItemCarrito = Number(
      precioItemCarritoElement.textContent.replace('$', '')
    );
    const cantidadItemCarritoElement = itemCarrito.querySelector(
      '.cantidadItemCarrito'
    );
    const cantidadItemCarrito = Number(
      cantidadItemCarritoElement.value
    );
    total = total + precioItemCarrito * cantidadItemCarrito;
  });
  totalCarrito.innerHTML = `${total.toFixed(2)}$`;
}



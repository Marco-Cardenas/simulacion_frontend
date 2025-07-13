function objetosEnCarrito(title, price, tax, all) {
  const div = document.createElement('div');
  const titulo = document.createElement('p');
  const precio = document.createElement('p');
  const iva = document.createElement('p');
  const total = document.createElement('p');

  titulo.innerHTML = title;
  precio.innerHTML = price;
  iva.innerHTML = tax;
  total.innerHTML = all;

  div.appendChild(titulo);
  div.appendChild(precio);
  div.appendChild(iva);
  div.appendChild(total);

  div.classList.add('lista-compras-carrito-class');
  return div;
}


for(let i = 0; i < 8; i++) {
  document.getElementById('lista-compras-carrito').appendChild(objetosEnCarrito('gameFantasy'+i, i, i+1.5, i*2+1.5));
}
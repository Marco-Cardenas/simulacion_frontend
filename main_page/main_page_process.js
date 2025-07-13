function generateObject(imgSRC, gameID, gameTitulo, gameDescripcion, gamePrecio) {
  const objetos = document.createElement('div');
  const objetoCabecera = document.createElement('div');
  const objetoDescripcion = document.createElement('div');
  const objetoBoton = document.createElement('div');
  const img = document.createElement('img');
  const titulo = document.createElement('h3');
  const descripcion = document.createElement('p');
  const precio = document.createElement('p');



  objetos.classList.add('objetos');
  objetoCabecera.classList.add('objeto-cabecera');
  objetoDescripcion.classList.add('objeto-descripcion');
  objetoBoton.classList.add('boton-carrito');
  titulo.classList.add('objeto-titulo');
  descripcion.classList.add('objeto-desc');
  precio.classList.add('objeto-precio');


  img.src = imgSRC;
  img.alt = 'Error en la Imagen'

  titulo.innerHTML = gameTitulo;
  descripcion.innerHTML = gameDescripcion;
  precio.innerHTML = 'Precio: ' + gamePrecio;

  objetoBoton.innerHTML = 'Agregar al Carrito';
  objetoBoton.classList.add(gameID);

  objetoCabecera.appendChild(img);

  objetoDescripcion.appendChild(titulo);
  objetoDescripcion.appendChild(descripcion);
  objetoDescripcion.appendChild(precio);


  objetos.appendChild(objetoCabecera);
  objetos.appendChild(objetoDescripcion);
  objetos.appendChild(objetoBoton);

  return objetos;
}

for(let i = 0; i < 8; i++) {
  document.getElementById('lista-recomendados').appendChild(generateObject('../assets/MultiGames.png', 'lr'+i, 'Zelda', 'Buscando a la princesa', '20$'));
  document.getElementById('lista-nuevos').appendChild(generateObject('../assets/MultiGames.png', 'ln'+i, 'Zelda', 'Buscando a la princesa', '20$'));
  document.getElementById('lista-accion').appendChild(generateObject('../assets/MultiGames.png', 'la'+i, 'Zelda', 'Buscando a la princesa', '20$'));
  document.getElementById('lista-aventura').appendChild(generateObject('../assets/MultiGames.png', 'lav'+i, 'Zelda', 'Buscando a la princesa', '20$'));
  document.getElementById('lista-arcade').appendChild(generateObject('../assets/MultiGames.png', 'lar'+i, 'Zelda', 'Buscando a la princesa', '20$'));

}
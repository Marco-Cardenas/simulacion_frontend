document.addEventListener('DOMContentLoaded', async () => {

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

  loadList()
  async function loadList() {
    const params = new URLSearchParams(window.location.search);
    const userID = params.get('u');
    const URL_ENDPOINT = 'http://localhost:3000/api/myListToBuy/' + userID;
    
    try {
      const respuesta = await fetch(URL_ENDPOINT);
      
      var datosRespuesta = undefined;
      
      if (respuesta.ok) {
        datosRespuesta = await respuesta.json(); // Leer la respuesta JSON del servidor
      } else {
        const errorData = await respuesta.json(); // Intentar leer el mensaje de error del servidor
      }
    } catch (error) {
      console.error('Error en la solicitud Fetch:', error);
    }

    const lista = datosRespuesta.lista;
    if(lista?.length == 0) {
      document.getElementById('Procesar-Compra').style.display = 'none';
      return undefined;
    }  
    document.getElementById('Procesar-Compra').style.display = 'block';
    lista.forEach(game => {
      document.getElementById('lista-compras-carrito').appendChild(objetosEnCarrito(game.title, game.price, game.tax, (game.price + game.tax).toFixed(2)));
    });

  }

  document.getElementById('Procesar-Compra').addEventListener('click', async () => {
    const params = new URLSearchParams(window.location.search);
    const userID = params.get('u');
    const URL_ENDPOINT = 'http://localhost:3000/api/comprar-carrito/' + userID;
    
    try {
      const respuesta = await fetch(URL_ENDPOINT, {
        method: 'PUT'
      });
      
      var datosRespuesta = undefined;
      
      if (respuesta.ok) {
        datosRespuesta = await respuesta.json(); // Leer la respuesta JSON del servidor
      } else {
        const errorData = await respuesta.json(); // Intentar leer el mensaje de error del servidor
      }
    } catch (error) {
      console.error('Error en la solicitud Fetch:', error);
    }

    window.location.href = './buy_page.html' + '?u=' + userID;

  });

  
  document.getElementById('to-main-page-img').addEventListener('click', () => {
    const params = new URLSearchParams(window.location.search);
    const userID = params.get('u');
    window.location.href = '../main_page/main_page.html' + '?u=' + userID;
  });

  document.getElementById('to-main-page-title').addEventListener('click', () => {
    const params = new URLSearchParams(window.location.search);
    const userID = params.get('u');
    window.location.href = '../main_page/main_page.html' + '?u=' + userID;
  });

  document.getElementById('to-login-button').addEventListener('click', () => {
    window.location.href = '../index.html';
  });

});
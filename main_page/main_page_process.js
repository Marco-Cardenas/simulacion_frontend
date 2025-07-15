document.addEventListener('DOMContentLoaded', async () => {

  document.getElementById('to-shop').addEventListener('click', () => {
    const params = new URLSearchParams(window.location.search);
    const userID = params.get('u');
    window.location.href = '../buy_page/buy_page.html' + '?u=' + userID;
  });
  
  function generateObject(imgSRC, gameID, gameTitulo, gameDescripcion, gamePrecio, myGame=0) {
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
      precio.innerHTML = 'Precio: ' + gamePrecio + '$';

      if(myGame == 0) {
        objetoBoton.innerHTML = 'Agregar al Carrito';
      }
      else if(myGame == 1){
        objetoBoton.innerHTML = 'Jugar';
        objetoBoton.style.color = '#ffffff';
        objetoBoton.style.backgroundColor = '#4455ff';
      }
      else {
        objetoBoton.innerHTML = 'En el carrito';
        objetoBoton.style.color = '#000000';
        objetoBoton.style.backgroundColor = '#ffff55';
      }
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

  loadGames();
  async function loadGames() {
    //Endpoint a donde llegaran los datos
    const params = new URLSearchParams(window.location.search);
    const userID = params.get('u');
    const URL_ENDPOINT = 'https://simulacion-backend.vercel.app/api/main_page';
    const URL_ENDPOINT2 = 'https://simulacion-backend.vercel.app/api/myGames/' + userID;
    const URL_ENDPOINT3 = 'https://simulacion-backend.vercel.app/api/myList/' + userID;

    try {
      const respuesta = await fetch(URL_ENDPOINT);
      const respuesta2 = await fetch(URL_ENDPOINT2);
      const respuesta3 = await fetch(URL_ENDPOINT3);


      
      var datosRespuesta = undefined;
      var misJuegos = undefined;
      var miCarrito = undefined;
      
      if (respuesta.ok) {
        datosRespuesta = await respuesta.json(); // Leer la respuesta JSON del servidor
        misJuegos = await respuesta2.json(); // Leer la respuesta JSON del servidor
        miCarrito = await respuesta3.json(); // Leer la respuesta JSON del servidor
      } else {
        const errorData = await respuesta.json(); // Intentar leer el mensaje de error del servidor
      }
    } catch (error) {
      console.error('Error en la solicitud Fetch:', error);
    }

    const games = datosRespuesta.games;
    const eval = {accion: 0, aventura: 0, arcade: 0};
    const listaRecomenar = [];
    games.forEach(async game => {
      var miJuego = 0;
      if(misJuegos.games.includes(game._id)) {
        if(game.tipo == "Accion") {
          eval.accion = 1;
        }
        if(game.tipo == "Arcade") {
          eval.arcade = 1;
        }
        if(game.tipo == "Aventura") {
          eval.aventura = 1;
        }
        miJuego = 1;
      }
      if(miCarrito.lista.includes(game._id)) {
        miJuego = 2;
      }

      if(miJuego == 0) {
        listaRecomenar.push(game);
      }

      if(game.tipo == "Accion") {
        document.getElementById('lista-accion').appendChild(generateObject(game.img, game._id, game.name, game.desc, String(game.price), miJuego));
      }
      if(game.tipo == "Arcade") {
        document.getElementById('lista-arcade').appendChild(generateObject(game.img, game._id, game.name, game.desc, String(game.price), miJuego));
      }
      if(game.tipo == "Aventura") {
        document.getElementById('lista-aventura').appendChild(generateObject(game.img, game._id, game.name, game.desc, String(game.price), miJuego));
      }

    });
    
    if(eval.accion > 0 || eval.arcade > 0 || eval.aventura > 0) {
      document.getElementById('titulo-recomendados').style.display = "block";
      document.getElementById('lista-recomendados').style.display = "block";
      if(eval.accion > 0) {
        if(eval.arcade == 0) {
          eval.accion = 2;
          if(eval.aventura == 0) {
            eval.accion = 3;
          }
        }
        if(eval.aventura == 0) {
          eval.accion = 2;
          if(eval.arcade == 0) {
            eval.accion = 3;
          }
        }
      }

      if(eval.arcade > 0) {
        if(eval.accion == 0) {
          eval.arcade = 2;
          if(eval.aventura == 0) {
            eval.arcade = 3;
          }
        }
        if(eval.aventura == 0) {
          eval.arcade = 2;
          if(eval.accion == 0) {
            eval.arcade = 3;
          }
        }
      }

      if(eval.aventura > 0) {
        if(eval.arcade == 0) {
          eval.aventura = 2;
          if(eval.accion == 0) {
            eval.aventura = 3;
          }
        }
        if(eval.accion == 0) {
          eval.aventura = 2;
          if(eval.arcade == 0) {
            eval.aventura = 3;
          }
        }
      }
    }
    listaRecomenar.forEach(game => {
      if(eval.accion > 0) {
        if(game.tipo == "Accion") {
          eval.accion -= 1;
          document.getElementById('lista-recomendados').appendChild(generateObject(game.img, game._id, game.name, game.desc, String(game.price), 0));
        }
      }

      if(eval.aventura > 0) {
        if(game.tipo == "Aventura") {
          eval.aventura -= 1;
          document.getElementById('lista-recomendados').appendChild(generateObject(game.img, game._id, game.name, game.desc, String(game.price), 0));
        }
      }

      if(eval.arcade > 0) {
        if(game.tipo == "Arcade") {
          eval.arcade -= 1;
          document.getElementById('lista-recomendados').appendChild(generateObject(game.img, game._id, game.name, game.desc, String(game.price), 0));
        }
      }
    });

    const botonesAggCarrito = document.getElementsByClassName('boton-carrito');
    for(let i = 0; i < botonesAggCarrito.length; i++) {
      const juego = botonesAggCarrito[i];
      juego.addEventListener('click', async () => {
        if(juego.innerHTML == 'En el carrito' || juego.innerHTML == 'Jugar') {
          return undefined;
        }
        const params = new URLSearchParams(window.location.search);
        const userID = params.get('u');
        const URL_ENDPOINT = 'https://simulacion-backend.vercel.app/api/add-carrito';

        try {
          const datosAEnviar = { userID: userID, gameID: juego.classList[1] }
          const respuesta = await fetch(URL_ENDPOINT, {
            method: 'PUT', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datosAEnviar) // Convertir el objeto JS a cadena JSON
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
        juego.innerHTML = "En el carrito";
        juego.style.color = '#000000';
        juego.style.backgroundColor = '#ffff55';
      });
    }

  }
  

  document.getElementById('to-login-button').addEventListener('click', () => {
    window.location.href = '../index.html';
  });



});
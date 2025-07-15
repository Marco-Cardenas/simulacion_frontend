document.addEventListener('DOMContentLoaded', async () => {

  document.getElementById('Registrarse').addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = 'sign_up/sign_up.html';
    a.click()
  });


  document.getElementById('submitLogin').addEventListener('click', () => {
    const form = document.getElementById('submitLogin2');
    form.click();
  });


  const formulario = document.getElementById('form-login');
  formulario.addEventListener('submit', async (event) => {
    // Prevenir el envío tradicional del formulario
    event.preventDefault();

    // 1. Recopilar los datos del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // 2. Crear un objeto JavaScript con los datos
    const datosAEnviar = { email: email, password: password };

    //Endpoint a donde llegaran los datos
    const URL_ENDPOINT = 'https://simulacion-backend.vercel.app/api/login';

    try {
      const respuesta = await fetch(URL_ENDPOINT, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(datosAEnviar) // Convertir el objeto JS a cadena JSON
      });

      var datosRespuesta = undefined;
      
      if (respuesta.ok) {
        datosRespuesta = await respuesta.json(); // Leer la respuesta JSON del servidor
        formulario.reset(); // Limpiar el formulario
      } else {
        const errorData = await respuesta.json(); // Intentar leer el mensaje de error del servidor
        formulario.reset(); // Limpiar el formulario
      }
    } catch (error) {
      console.error('Error en la solicitud Fetch:', error);
    }

    if(!datosRespuesta.process) {
      alert('Informacion invalida');
      return undefined;
    }

    window.location.href = 'main_page/main_page.html' + '?u=' + datosRespuesta.isUser._id;
  });


});
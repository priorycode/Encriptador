const btnEncriptar = document.querySelector(".btn-1");
const btnDesenncriptar = document.querySelector(".btn-2");
const btnCopy = document.querySelector(".btn-copy");
const ventanaSalida = document.querySelector(".ventana-salida");
const ventanaText = document.querySelector(".ventana-text");
const parrafoScript = document.querySelector(".escrip-parrafo");
const text = document.getElementById("textarea");
const textEncr = document.getElementById("parrafo-encrip");
const copyMessage = document.querySelector(".copy-message");
const advertencia = document.querySelector(".advertencia");

/**
 * La función encriptarTexto reemplaza ciertas vocales en un texto dado con cadenas específicas para crear
 * una versión encriptada del texto.
 * @param texto: una variable de cadena que representa el texto que se cifrará.
 * @devuelve la entrada `texto` con las vocales reemplazadas por cadenas específicas, de acuerdo con las reglas
 * definido en la función. La cadena resultante se almacena en la variable `textoEncriptado` y luego se devuelve.
 */
function encriptarTexto(texto) {
  var textoEncriptado = texto
    .replace(/e/g, "enter")
    .replace(/i/g, "imes")
    .replace(/a/g, "ai")
    .replace(/o/g, "ober")
    .replace(/u/g, "ufat");
  return textoEncriptado;
}

/**
 * La función desencriptarTexto reemplaza ciertas cadenas en un texto dado para descifrarlo.
 * @param textoEncriptado: una cadena que contiene texto encriptado que debe descifrarse.
 * Retorna el texto descifrado luego de reemplazar ciertos patrones de caracteres con sus letras correspondientes.
 */
function desencriptarTexto(textoEncriptado) {
  var textoDesencriptado = textoEncriptado
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ai/g, "a")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u");
  return textoDesencriptado;
}

/**
 * Esta función copia un texto dado al portapapeles del usuario utilizando
 * la API navigator.clipboard y muestra un mensaje de confirmación.
 */
function copiarTexto(texto) {
  navigator.clipboard.writeText(texto).then(
    function () {
      confirmacionCopiado("Texto copiado");
    },
    function () {
      confirmacionCopiado("Error: Texto no copiado");
    }
  );
}

/**
 * La función muestra un mensaje de confirmación para copiar y lo oculta después de 2 segundos.
 */
function confirmacionCopiado(mensaje) {
  copyMessage.textContent = mensaje;
  copyMessage.classList.add("show-message");
  setTimeout(() => {
    copyMessage.classList.remove("show-message");
  }, 2000);
}

/**
* La función comprueba si una cadena de entrada dada contiene letras mayúsculas o caracteres acentuados y devuelve un valor booleano en consecuencia. 
  @param text: el texto es un parámetro de la función validateInput. Representa el texto de entrada que necesita ser validado para ciertas condiciones.
  @devuelve un valor booleano (verdadero o falso) dependiendo de si la cadena de entrada contiene letras mayúsculas o caracteres acentuados.
 */
function validarInput(texto) {
  if (texto !== texto.toLowerCase()) {
    return false;
  }
  var tildes = ["á", "é", "í", "ó", "ú"];
  for (var i = 0; i < texto.length; i++) {
    if (tildes.includes(texto.charAt(i))) {
      return false;
    }
  }
  return true;
}

var interruptor = 1;

/**
* Este código agrega un detector de eventos al botón "Encriptar" (btnEncriptar) que escucha un evento de clic. 
* Cuando se hace clic en el botón, el código verifica si el valor del elemento "área de texto" (text.value) no está vacío. 
  * Si no está vacío, oculta el elemento "ventanaSalida" y muestra el elemento "ventanaText", 
    establece el contenido de texto del elemento "parrafoScript" al resultado de llamar a la función "encriptarTexto" con el valor del elemento 
    "textarea" como argumento, y establece el valor de la variable "interruptor" en 0. 
  * Si el valor del elemento "textarea" está vacío, el código verifica 
    si el valor de la variable "interruptor" es 1. Si lo es, establece el contenido de texto del elemento "parrafoScript" al resultado de llamar a 
    la función "encriptarTexto" con el contenido de texto del elemento "textEncr" como argumento, y pone el valor de la variable "interruptor" a 0. 
* Finalmente, el código establece el valor del elemento "textarea" en una cadena vacía.
 */
btnEncriptar.addEventListener("click", () => {
  console.log(text.value);
  if (validarInput(text.value)) {
    if (text.value != "") {
      ventanaSalida.style.display = "none";
      ventanaText.style.display = "flex";
      parrafoScript.textContent = encriptarTexto(text.value);
      interruptor = 0;
    } else {
      if (interruptor == 1) {
        parrafoScript.textContent = encriptarTexto(textEncr.textContent);
        interruptor = 0;
      }
    }
    text.value = "";
  } else {
    advertencia.classList.add("adver");
    setTimeout(() => {
      advertencia.classList.remove("adver");
    }, 500);
  }
});

/* 
* Este código agrega un detector de eventos al botón "Desencriptar" (btnDesencriptar) que escucha un evento de clic.
* Cuando se hace clic en el botón, el código verifica si el valor del elemento "área de texto" (text.value) no está vacío.
  * Si no está vacío, oculta el elemento "ventanaSalida" y muestra el elemento "ventanaText", establece el contenido de texto 
    del elemento "parrafoScript" al resultado de llamar a la función "desencriptarTexto" con el valor del elemento "textarea" como argumento, 
    y establece el valor de la variable "interruptor" a 1.
  * Si el valor del elemento "textarea" está vacío, el código establece el contenido de texto del elemento "parrafoScript" al resultado de 
    llamar al "desencriptarTexto" con el contenido de texto del elemento "textEncr" como argumento, y establece el valor de la variable "interruptor" en 1.
* Finalmente, el código establece el valor del elemento "textarea" en una cadena vacía.
*/
btnDesenncriptar.addEventListener("click", () => {
  if (validarInput(text.value)) {
    if (text.value != "") {
      ventanaSalida.style.display = "none";
      ventanaText.style.display = "flex";
      parrafoScript.textContent = desencriptarTexto(text.value);
      interruptor = 1;
    } else {
      parrafoScript.textContent = desencriptarTexto(textEncr.textContent);
      interruptor = 1;
    }
    text.value = "";
  } else {
    advertencia.classList.add("adver");
    setTimeout(() => {
      advertencia.classList.remove("adver");
    }, 500);
  }
});

/* 
Este código agrega un detector de eventos al botón "Copiar" (btnCopy) que escucha un evento de clic. 
* Cuando se hace clic en el botón, llama a la función "copiarTexto" con el contenido de texto del 
  elemento "parrafoScript" como argumento y copia el texto al portapapeles del usuario usando la API navigator.clipboard. 
* También muestra un mensaje de confirmación.
*/
btnCopy.addEventListener("click", () => {
  copiarTexto(parrafoScript.textContent);
});

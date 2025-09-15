const cajaComentario = document.getElementById("cajaComentario");
    const btnEnviar = document.getElementById("btnEnviar");
    const btnBorrar = document.getElementById("btnBorrar");
    const comentarios = document.getElementById("comentarios");
    const emojis = document.querySelectorAll(".emoji-panel span");

    // Cargar comentarios desde localStorage al iniciar
    let listaComentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

    function mostrarComentarios() {
      comentarios.innerHTML = "";
      listaComentarios.forEach(comentario => {
        const div = document.createElement("div");
        div.classList.add("comentario");
        div.textContent = comentario;
        comentarios.prepend(div);
      });
    }

    mostrarComentarios();

    // Insertar emoji en textarea
    emojis.forEach(emoji => {
      emoji.addEventListener("click", () => {
        cajaComentario.value += emoji.textContent;
        cajaComentario.focus();
      });
    });

    // Enviar comentario
    btnEnviar.addEventListener("click", () => {
      const texto = cajaComentario.value.trim();

      if (texto !== "") {
        listaComentarios.push(texto);
        localStorage.setItem("comentarios", JSON.stringify(listaComentarios));
        mostrarComentarios();
        cajaComentario.value = "";
      } else {
        alert("Por favor escribe un comentario antes de enviar.");
      }
    });

    // Botón para borrar todos los comentarios
    btnBorrar.addEventListener("click", () => {
      if (confirm("¿Seguro que quieres borrar todos los comentarios?")) {
        listaComentarios = [];
        localStorage.removeItem("comentarios");
        mostrarComentarios();
      }
    });
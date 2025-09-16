const SUPABASE_URL = "https://qkoanilnlbbjfqjdrkat.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrb2FuaWxubGJiamZxamRya2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5NjIxOTAsImV4cCI6MjA3MzUzODE5MH0.oh2f9MzvRoluJTURBygWT296JJI4FasmJOsE9eusoRc";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const cajaComentario = document.getElementById("cajaComentario");
const btnEnviar = document.getElementById("btnEnviar");
const comentarios = document.getElementById("comentarios");
const emojis = document.querySelectorAll(".emoji-panel span");

// 🆔 Identificador único por usuario
let userId = localStorage.getItem("user_id");
if (!userId) {
  userId = crypto.randomUUID();
  localStorage.setItem("user_id", userId);
}

// Función para mostrar comentarios
async function mostrarComentarios() {
  comentarios.innerHTML = "";

  let { data, error } = await supabase
    .from("comentarios")
    .select("*")
    .order("fecha", { ascending: false });

  if (error) {
    console.error("Error al cargar comentarios:", error);
    return;
  }

  data.forEach(c => {
    const div = document.createElement("div");
    div.classList.add("comentario");

    div.innerHTML = `
        <p>${c.texto}</p>
        <small>${new Date(c.fecha).toLocaleString()}</small>
      `;

    // ✅ Botón borrar solo en comentarios del usuario actual
    // Botón eliminar si es del usuario actual
    if (c.user_id === userId) {
      const btnDelete = document.createElement("button");
      btnDelete.classList.add("delete-btn");
      btnDelete.textContent = "❌";
      btnDelete.addEventListener("click", async () => {
        if (confirm("¿Eliminar este comentario?")) {
          const { error } = await supabase
            .from("comentarios")
            .delete()
            .eq("id", c.id);

          if (error) {
            alert("Error al borrar el comentario.");
            console.error(error);
          } else {
            mostrarComentarios(); // ✅ refresca lista inmediatamente
          }
        }
      });
      div.appendChild(btnDelete);
    }

    comentarios.appendChild(div);
  });
}

// Mostrar comentarios al inicio
mostrarComentarios();

// Insertar emoji en textarea
emojis.forEach(emoji => {
  emoji.addEventListener("click", () => {
    cajaComentario.value += emoji.textContent;
    cajaComentario.focus();
  });
});

// 🚀 Enviar comentario
btnEnviar.addEventListener("click", async () => {
  const texto = cajaComentario.value.trim();

  if (texto !== "") {
    const { error } = await supabase
      .from("comentarios")
      .insert([{ texto, user_id: userId, fecha: new Date().toISOString() }]);

    if (error) {
      console.error("Error al guardar comentario:", error.message);
      alert("Hubo un error al enviar tu comentario.");
    } else {
      cajaComentario.value = ""; // ✅ limpiar textarea
      mostrarComentarios();      // ✅ refrescar lista inmediatamente
    }
  } else {
    alert("Por favor escribe un comentario antes de enviar.");
  }
});

// 🔄 Escuchar cambios en tiempo real (insert / delete)
supabase
  .channel("comentarios-changes")
  .on("postgres_changes", { event: "*", schema: "public", table: "comentarios" }, payload => {
    console.log("Cambio detectado:", payload);
    mostrarComentarios(); // 🔥 refresca lista al instante
  })
  .subscribe();
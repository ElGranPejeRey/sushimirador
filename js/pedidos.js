document.getElementById("pedidoForm").addEventListener("submit", function(e){
      e.preventDefault();

      let nombre = document.getElementById("nombre").value;
      let telefono = document.getElementById("telefono").value;
      let direccion = document.getElementById("direccion").value;
      let pedido = document.getElementById("pedido").value;

      let numero = "56993641249"; 

      let mensaje = `📦 Nuevo Pedido:%0A👤 Nombre: ${nombre}%0A📞 Teléfono: ${telefono}%0A🏠 Dirección: ${direccion}%0A📝 Pedido: ${pedido}`;

      let url = `https://wa.me/${numero}?text=${mensaje}`;
      window.open(url, "_blank");

      this.reset();
    });
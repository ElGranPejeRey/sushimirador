const modo = () => {

    const cuerpo = document.getElementById('cuerpo');

    const boton = document.getElementById('botonOscuro');

    const menu2 = document.getElementById('menu2')



    

    cuerpo.style.transition = '0.6s'

    cuerpo.classList.toggle("oscuro");
    

    if (cuerpo.style.backgroundColor == 'black'){
        cuerpo.style.backgroundColor = 'white'
        cuerpo.style.color = 'black'
        boton.textContent = '🌙'

    }

    else{
        cuerpo.style.backgroundColor = 'black'
        cuerpo.style.color = 'white'
        boton.textContent = '☀️'
    }

    //cerrar menu responsive
    if (menu2.classList.contains('active')) {
        menu2.classList.remove('active');
    }

};

const imgPedidos = document.getElementById('imgPedidos');
const cuerpo = document.getElementById('cuerpo');

imgPedidos.addEventListener('mouseover', () => {
    if (cuerpo.classList.contains('oscuro')) {
        imgPedidos.style.boxShadow = '20px 10px 25px rgba(255, 255, 255, 1)'; // sombra blanca
    } else {
        imgPedidos.style.boxShadow = '20px 10px 25px rgba(0,0,0,0.7)'; // sombra negra
    }
    imgPedidos.style.transform = 'scale(1.03) rotate(6deg)';
});

imgPedidos.addEventListener('mouseout', () => {
    imgPedidos.style.transform = 'scale(1) rotate(0deg)';
    imgPedidos.style.boxShadow = 'none';
});




let hamburguesa = document.getElementById('hamburguesa');
let menu2 = document.getElementById('menu2')

hamburguesa.addEventListener("click", () => {
    menu2.classList.toggle('active')
})
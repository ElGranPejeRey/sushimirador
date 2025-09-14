let hamburguesa = document.getElementById('hamburguesa');
let menu2 = document.getElementById('menu2')

hamburguesa.addEventListener("click", () => {
    menu2.classList.toggle('active')
})

let links = menu2.querySelectorAll("a");
links.forEach(link => {
    link.addEventListener("click", () => {
        menu2.classList.remove("active");
    });
});
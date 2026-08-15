alert("AUTH.JS FUNCIONA");

const form = document.getElementById("registerForm");

if (form) {

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        alert("BOTÓN FUNCIONA");

    });

} else {

    alert("NO ENCUENTRO EL FORMULARIO");

}

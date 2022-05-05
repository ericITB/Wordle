const codigo = [];
const maxIntento = 5;
var contadorTurnos = 1;
var contadorFilas = 0;


/*1. Genera una constante CODIGO_SECRETO de tipo array de 5 número aleatorios entre 0 y 9 usando la libreria Math.random();*/
function CodigoSecreto() {
    for (let i = 0; i < 5; i++) {
        codigo[i] = Math.floor((Math.random() * 10));
    }
    //console.log(codigo);
}

CodigoSecreto();

function EstaNum(codigo, num, pos) {
    if (codigo[pos] == num) {
        return true;
    }
    return false;
}

function Cuenta(codigo, num) {
    let veces = 0;
    for (let i = 0; i < codigo.length; i++) {
        if (codigo[i] == num) {
            veces ++;
        }
    }
    return veces;
}

function CrearCasillas(numFilas) {
    var tabla = document.getElementById("Result");

    for (var j = 0; j < numFilas; j++) {
        var hilera = document.createElement("div");
        hilera.classList.add("rowResult", "w100", "flex", "wrap");
        for (var i = 0; i < 5; i++) {
            var espacio = document.createElement("div");
            espacio.classList.add("w20");
            var numCasilla = document.createElement("div");
            numCasilla.classList.add("celResult");
            numCasilla.classList.add("flex");
            hilera.appendChild(espacio);
            espacio.appendChild(numCasilla);
        }
        tabla.appendChild(hilera);
    }
}
CrearCasillas(maxIntento);

function Codigo() {
    let apartado = document.getElementsByClassName("cel flex");
    for (let i = 0; i < codigo.length; i++) {
        apartado[i].innerHTML = codigo[i];
    }
}

//Lee el input del usuario.
function Comprobar() {
    Result();
    console.log(contadorFilas);
    contadorFilas++;
    contadorTurnos++
}

function Result() {
    let input = document.getElementById("numero");
    let numeroUsuario = input.value;
    let filas = document.getElementsByClassName("rowResult");
    //Insertar numeros en las casillas
    for (let numFila = 0; numFila < filas.length; numFila++) {
        var cajitas = filas[contadorFilas].getElementsByClassName("celResult flex");
        for (let numCasilla = 0; numCasilla < cajitas.length; numCasilla++) {
            cajitas[numCasilla].innerHTML = numeroUsuario[numCasilla];

            if (Cuenta(codigo, numeroUsuario[numCasilla])) {
                cajitas[numCasilla].style.backgroundColor = "yellow";
            }else {
                cajitas[numCasilla].style.backgroundColor = "#5D5D5D";
            }
            if (EstaNum(codigo, numeroUsuario[numCasilla], numCasilla)) {
                cajitas[numCasilla].style.backgroundColor = "green";
            }
        }
    }
    Info(numeroUsuario);
}

function VolverAJugar(){
    let seccion = document.getElementById("prueba");
    var botonRecargar = document.createElement("button");
    botonRecargar.classList.add("w90");
    seccion.appendChild(botonRecargar);
    botonRecargar.setAttribute("onclick", "location.reload()")
    botonRecargar.innerHTML = "Volver a jugar"
}

function Info(numeroUsuario) {
    let info = document.getElementById("info");
    let contadorAciertos = 0
    let botonComprobar = document.getElementById("check");


    for (let num = 0; num < numeroUsuario.length; num++) {
        if (numeroUsuario[num] == codigo[num]) {
            contadorAciertos++
        }
    }

    if (contadorTurnos == maxIntento && contadorAciertos < 5) {
        info.innerHTML = "Has perdido, vuelve a intentarlo";
        Codigo();
        botonComprobar.remove();
        VolverAJugar();
    } else {
        info.innerHTML = "Sigue intentandolo";
    }

    if (contadorAciertos == 5) {
        info.innerHTML = "Has acertado, enhorabuena!!";
        Codigo();
        botonComprobar.remove();
        VolverAJugar();
    }
}

function InputNumeros(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

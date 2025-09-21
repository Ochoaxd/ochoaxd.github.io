function seleccionarMascotaJugador(){
    alert('Seleccionaste tu mascota')
}

let botonMascotaJugador = document.getElementById('boton-mascota')
botonMascotaJugador.addEventListener ('click', seleccionarMascotaJugador)

function seleccionarMascotaJugador(){
    let inputHipodoge = document.getElementById ('Hipodoge')
    let inputCapipepo = document.getElementById ('Capipepo')
    let inputRatiga = document.getElementById ('Ratiga')
    let inputLangostelvis = document.getElementById ('Langostelvis')
    let inputTucapalma = document.getElementById ('Tucapalma')
    let inputPydos = document.getElementById ('Pydos')
    let spanMascotaJugador = document.getElementById ('mascota-jugador')
    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = 'Hipodoge'
    }
        else if (inputCapipepo.checked) {
            spanMascotaJugador.innerHTML = 'Capipepo'
        }
        else if (inputRatiga.checked) {
            spanMascotaJugador.innerHTML = 'Ratiga'
        }
        else if (inputTucapalma.checked) {
            spanMascotaJugador.innerHTML = 'Tucapalma'
        }
        else if (inputLangostelvis.checked) {
            spanMascotaJugador.innerHTML = 'Langostelvis'
        }
        else if (inputPydos.checked) {
            spanMascotaJugador.innerHTML = 'Pydos'
        }
        else {
            alert ('Selecciona una mascota')
        }
        seleccionarMascotaEnemiga()

}
function seleccionarMascotaEnemiga () {

    let ataqueAleatorio  = aleatorio (1, 6)
    let spanMascotaEnemiga = document.getElementById('mascota-enemiga')

    if (ataqueAleatorio == 1){
        spanMascotaEnemiga.innerHTML = 'Hipodoge'
    }
        else if (ataqueAleatorio == 2){
        spanMascotaEnemiga.innerHTML = 'Capipepo'
    }
        else if (ataqueAleatorio == 3){
        spanMascotaEnemiga.innerHTML = 'Ratiga'
    }
        else if (ataqueAleatorio == 4){
        spanMascotaEnemiga.innerHTML = 'Tucapalma'
    }
        else if (ataqueAleatorio == 5){
        spanMascotaEnemiga.innerHTML = 'Langostelvis'
    }
            else  {
            spanMascotaEnemiga.innerHTML = 'Pydos'
        }

}    

function aleatorio (min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}
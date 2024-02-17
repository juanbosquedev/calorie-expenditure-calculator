


function calcularCalorias() {
    let edadAños = parseInt(document.getElementById("edad").value);
    let pesoKg = parseInt(document.getElementById("peso").value);
    let alturaCm = parseInt(document.getElementById("altura").value);
    let actividad = parseFloat(document.getElementById("actividad").value);
    let sexo = document.querySelector('input[name="genero"]:checked').value;

    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    };

    let calculoCalorias = sexo === 'M' ?
        actividad * ((multiplicadorTMB.peso * pesoKg) + (multiplicadorTMB.altura * alturaCm) - (multiplicadorTMB.edad * edadAños) + 5) :
        actividad * ((multiplicadorTMB.peso * pesoKg) + (multiplicadorTMB.altura * alturaCm) - (multiplicadorTMB.edad * edadAños) - 161);

    const resultado = document.getElementById("resultado");
    resultado.style.display = "flex"; // Mostrar el resultado

    resultado.innerHTML = `
        <div class="card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2">Calorías requeridas</h5>
            <div class="mb-3 w-100">
                <input class="form-control text-center" value="${calculoCalorias} kcal" style="font-size: 2rem" disabled>
            </div>
        </div>
    `;
}



function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}
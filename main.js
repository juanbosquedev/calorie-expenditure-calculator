const resultado = document.getElementById("resultado");

function calcularCalorias() {
  let edadAños = parseInt(document.getElementById("edad").value);
  let pesoKg = parseInt(document.getElementById("peso").value);
  let alturaCm = parseInt(document.getElementById("altura").value);
  let actividad = parseFloat(document.getElementById("actividad").value);
  let sexo = document.querySelector('input[name="genero"]:checked').value;

  if (!edadAños || !pesoKg || !alturaCm || !actividad) {
    mostrarMensajeDeError("Faltan campos por llenar");
    return;
  }

  const multiplicadorTMB = {
    peso: 10,
    altura: 6.25,
    edad: 5,
  };

  let calculoCalorias =
    sexo === "M"
      ? actividad *
        (multiplicadorTMB.peso * pesoKg +
          multiplicadorTMB.altura * alturaCm -
          multiplicadorTMB.edad * edadAños +
          5)
      : actividad *
        (multiplicadorTMB.peso * pesoKg +
          multiplicadorTMB.altura * alturaCm -
          multiplicadorTMB.edad * edadAños -
          161);

  let result = Math.floor(calculoCalorias);
  aparecerResultado(result);

 
}

function mostrarMensajeDeError(msg) {
  resultado.style.display = "flex";

  const divError = document.createElement("div");
  divError.className = "d-flex justify-content-center align-items-center h-100";
  divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

  resultado.appendChild(divError);

  setTimeout(() => {
    divError.remove();
    desvanecerResultado();
  }, 5000);
}

// Animaciones
function aparecerResultado(result) {
  resultado.style.display = "flex";
  resultado.innerHTML = `
        <div class="card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2 mb-3">Calorías requeridas</h5>
            <div class="mb-3 w-100">
                <input class="form-control text-center" value="${result} kcal" style="font-size: 2rem" disabled>
            </div>
        </div>
    `;
  resultado.style.top = "100vh";
  resultado.style.display = "block";

  let distancia = 100;
  let resta = 0.3;
  let id = setInterval(() => {
    resta *= 1.1;
    resultado.style.top = `${distancia - resta}vh`;
    if (resta > 100) {
      clearInterval(id);
    }
  }, 1);
  setTimeout(() => {
    desvanecerResultado();
   setTimeout(() => {
    
     limpiarInputs();
   }, 1000); 
  }, 3000);
}

function desvanecerResultado() {
  let distancia = 1;

  let id = setInterval(() => {
    distancia *= 2;
    resultado.style.top = `${distancia}vh`;
    if (distancia > 70) {
      clearInterval(id);
      resultado.style.display = "none";
      resultado.style.top = 0;
    }
  }, 10);
}

const limpiarInputs = () => {
  const campos = ["edad", "peso", "altura", "actividad"];
  campos.forEach((campo) => {
    document.getElementById(campo).value = "";
  });
};
const resultado = document.getElementById("resultado");

function procesarDatosCalorias() {
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let idType = document.getElementById("idType").value;
  let idNumber = parseInt(document.getElementById("idNumber").value);
  let edadAños = parseInt(document.getElementById("edad").value);
  let pesoKg = parseInt(document.getElementById("peso").value);
  let alturaCm = parseInt(document.getElementById("altura").value);
  let actividad = parseFloat(document.getElementById("actividad").value);
  let sexo = document.querySelector('input[name="genero"]:checked').value;

  let inputValues = [
    nombre,
    apellido,
    idType,
    idNumber,
    edadAños,
    pesoKg,
    alturaCm,
    actividad,
  ];
  let validInputs = inputValues.some(
    (inputValue) => inputValue === null || inputValue === ""
  );

  if (validInputs) {
    mostrarMensajeDeError("Faltan campos por llenar");
    return;
  } else {
    calcularCalorias(
      edadAños,
      pesoKg,
      alturaCm,
      actividad,
      sexo,
      nombre,
      apellido,
      idType,
      idNumber
    );
  }
}

function calcularCalorias(
  edad,
  peso,
  altura,
  actividad,
  sexo,
  nombre,
  apellido,
  idType,
  idNumber
) {
  const multiplicadorTMB = {
    peso: 10,
    altura: 6.25,
    edad: 5,
  };
  let calculoCalorias =
    sexo === "M"
      ? actividad *
        (multiplicadorTMB.peso * peso +
          multiplicadorTMB.altura * altura -
          multiplicadorTMB.edad * edad +
          5)
      : actividad *
        (multiplicadorTMB.peso * peso +
          multiplicadorTMB.altura * altura -
          multiplicadorTMB.edad * edad -
          161);

  let resultado = Math.floor(calculoCalorias);
  aparecerResultado(nombre, apellido, idType, idNumber, resultado);
}

function mostrarMensajeDeError(msg) {
  resultado.style.display = "block";
  const divError = document.createElement("div");
  divError.className = "d-flex justify-content-center align-items-center h-100";
  divError.innerHTML = `<span class="alert alert-danger text-center h3 vh-19">${msg}</span>`;

  resultado.appendChild(divError);

  setTimeout(() => {
    divError.remove();
    desvanecerResultado();
  }, 3000);
}

// Animaciones
function aparecerResultado(nombre, apellido, idType, idNumber, result) {
  resultado.style.display = "flex";
  resultado.innerHTML = `
  <article class="d-flex justify-content-center align-items-center h-100">
        <div class="card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <p class="card-title h2 h-100 mb-3">Se recomienda al paciente ${nombre} ${apellido}, de ${idType} n° ${idNumber}; el consumo totald de</p>
            <div class="mb-3 w-100">
                <input class="form-control text-center" value="${result} kcal" style="font-size: 2rem" disabled>
            </div>
        </div>
  </article>
    `;
  resultado.style.top = "100vh";
  resultado.style.display = "flex";

  let distancia = 100;
  let resta = 0.3;
  let id = setInterval(() => {
    resta *= 1.1;
    resultado.style.top = `${distancia - resta}vh`;
    if (resta > 100) {
      clearInterval(id);
    }
  }, 30);
  let calculo = document.getElementById("calculo");
  setTimeout(() => {
    desvanecerResultado();
    setTimeout(() => {
      limpiarInputs();
    }, 200);
  }, 7000);
  setTimeout(() => {
    calculo.remove();
  }, 7000);
}

function desvanecerResultado(calculo) {
  let distancia = 1;
  let id = setInterval(() => {
    distancia *= 2;
    resultado.style.top = `${distancia}vh`;
    if (distancia > 100) {
      clearInterval(id);
      resultado.style.display = "none";
      resultado.style.top = 0;
    }
  }, 100);
}

const limpiarInputs = () => {
  const campos = [
    "nombre",
    "apellido",
    "idType",
    "idNumber",
    "edad",
    "peso",
    "altura",
    "actividad",
  ];
  campos.forEach((campo) => {
    document.getElementById(campo).value = "";
  });
};

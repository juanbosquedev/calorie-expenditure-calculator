const resultado = document.getElementById("resultado");

const procesarDatosCalorias = () => {
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
    if (window.innerWidth < 1200) {
      desplazamiento();
    }
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
  //responsive small divice
  if (window.innerWidth < 1200) {
    desplazamiento();
  }
};

const desplazamiento = () => {
  setTimeout(() => {
    document.getElementById("resultado").scrollIntoView({ behavior: "smooth" });
  }, 1000);
};

const calcularCalorias = (
  edad,
  peso,
  altura,
  actividad,
  sexo,
  nombre,
  apellido,
  idType,
  idNumber
) => {
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
};

const mostrarMensajeDeError = (msg) => {
  resultado.innerHTML = "";

  resultado.style.display = "block";
 



  const divError = document.createElement("div");
  divError.className = "d-flex justify-content-center align-items-center h-100";
  divError.innerHTML = `<span class="alert alert-danger text-center h3 vh-19" style="color:#ef6c28">${msg}</span>`;

  resultado.appendChild(divError);

  setTimeout(() => {
    divError.remove();
    desvanecerResultado();
  }, 4500);
};

const aparecerResultado = (nombre, apellido, idType, idNumber, result) => {
  resultado.style.display = "block";
  resultado.innerHTML = `
  <article class="d-flex justify-content-center align-items-center vh-100">
      <div class="card-body text-center">
          <p class="card-title fs-1 h2 mb-3">
            Se recomienda al paciente 
          <div class="mb-3">
            <input class="form-control text-center fs-2"  value="${nombre} ${apellido}" disabled>
          </div>
          <div class="mb-3">
             <input class="form-control text-center fs-2" value="${idType} n° ${idNumber}" disabled>
          </div>
         <div class="card-title fs-1 h2 mb-3">   el consumo total diario de</div>
            <div class="mb-3">
            <input class="form-control text-center fs-2" value="${result} kcal" disabled>
            </div>
            </p>
      </div>
  </article>
  `;

  resultado.style.display = "flex";

  resultado.style.top = "100vh";

  let distancia = 100;
  let resta = 0.3;
  let id = setInterval(() => {
    resta *= 1.1;
    resultado.style.top = `${distancia - resta}vh`;
    if (resta > 100) {
      clearInterval(id);
    }
  }, 5);
  let calculo = document.getElementById("calculo");
  setTimeout(() => {
    desvanecerResultado();
    setTimeout(() => {
      limpiarInputs();
    }, 200);
  }, 8000);
  setTimeout(() => {
    calculo.remove();
  }, 8000);
};

const desvanecerResultado = () => {
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
};

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

//focus predeterminado
window.onload = () => {
  let focus = document.getElementById("inicio").focus();
};

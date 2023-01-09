/* let nombre;
let dni;
let cursos;
let tramite = 1;
const seleccionCurso = [];
let cursoAInscribir;
let idCursoAInscribir;
let fechaDisponible;
let fec;
let fechaInscribir;
let horariosDisponibles;
let hor;
const cursosDisponible = [
  { id: 1, nombre: "Desarrollo Web", fechasDisponibles: ["20-1", "16-01", "9-02"], horarios: ["Mañana", "Tarde", "Noche"] },
  { id: 2, nombre: "Java Script", fechasDisponibles: ["21-1", "5-01", "16-02"], horarios: ["Mañana", "Tarde", "Noche"] },
  { id: 3, nombre: "Backend", fechasDisponibles: ["20-1", "16-01", "9-02"], horarios: ["Mañana", "Tarde", "Noche"] }];


//Función ingreso de estudiante (futuro login)
function ingresoEstudiante() {
  nombre = prompt(
    "Bienvenido Fundación San Patricio, escriba su Nombre y Apellido"
  );
  dni = prompt("Indique su numero de Documento");
}

//Función para conocer el curso al que se inscribio
function comisionCursada(seleccionCurso) {
  alert(
    "Alumno: " + nombre + " con DNI:" + dni + " se a inscripto correctamente a " + " " + seleccionCurso[0] + " a la comision con inicio " + seleccionCurso[1] + " en el horario de " + seleccionCurso[2] + "."
  );
}


ingresoEstudiante();

//Menu de opciones para ejecutar hasta que indique salir
while (tramite != 0) {
  tramite = prompt(
    "Indique que tramite desea realizar:\n 1-Ver cursos disponibles y fechas.\n  2- Incribirme a un nuevo curso.\n 3- Certificado de alumno regular.\n 4- Otras consultas.\n 0- Salir!"
  );
  switch (tramite) {
    case "1":
      for (const curso of cursosDisponible) {
        alert(curso.nombre + " inicia el " + curso.fechasDisponibles);
      }
      break;
    case "2":
      idCursoAInscribir = prompt(
        "Indique a que curso deseas inscribirte:\n 1:" + cursosDisponible[0].nombre + ",\n 2: " + cursosDisponible[1].nombre + ",\n 3:" + cursosDisponible[2].nombre + "."
      );
      seleccionCurso.push(cursosDisponible.find((cur) => cur.id == idCursoAInscribir).nombre);
      console.log(seleccionCurso);

      //Busco en el array las fechas disponibles
      fechaDisponible = cursosDisponible.find((cur) => cur.id == idCursoAInscribir).fechasDisponibles;
      fec = prompt("Fechas disponibles para ese curso:\n 1: " + fechaDisponible[0] + "\n 2: " + fechaDisponible[1] + "\n 3:" + fechaDisponible[2] + ".");
      //resto uno para obtener el verdadero id en el array fecha.
      fec = fec - 1;
      seleccionCurso.push(fechaDisponible[fec]);
      console.log(seleccionCurso);

      //Busco en el array los horarios disponibles
      horariosDisponibles = cursosDisponible.find((cur) => cur.id == idCursoAInscribir).horarios;
      hor = prompt("Horarios disponibles para ese curso:\n 1: " + horariosDisponibles[0] + "\n 2: " + horariosDisponibles[1] + "\n 3:" + horariosDisponibles[2] + ".");
      //resto uno para obtener el verdadero id en el array horarios.
      hor = hor - 1;
      seleccionCurso.push(horariosDisponibles[hor]);
      console.log(seleccionCurso);

      //envio a una funcion para que el usuario pueda ver que realmente se inscribio al curso.
      comisionCursada(seleccionCurso);
      break;
    case "3":
      alert(
        nombre + "su certificado de alumno regular se está confeccionando, pronto lo recibirá por mail"
      );
      break;
    case "4":
      alert(
        "Gracias por ponerse en contacto, a la brevedad nos estaremos comunicando vía WhatsApp"
      );
      break;
  }
}
 */

//busco las variables en el formulario
let nombreFormulario = document.querySelector("#nombre_contacto");
let mailFormulario = document.querySelector("#mail_contacto");
let asuntoFormulario = document.querySelector("asunto_contacto");
let textoFormulario = document.querySelector("#texto_contacto");

//variable para agregar un error en caso de que haya campos incompletos.
let mensaje_error = document.querySelector(".info");

//Con eventos controlo que no tenga campos vacios.
nombreFormulario.addEventListener("input", function () {
  if (nombreFormulario.value === "") {
    mensaje_error.innerHTML = `<div class="alert alert-warning" role="alert">
    Debes completar el nombre para poder contactarte!
  </div>
    `;
  }
  else {
    mensaje_error.innerHTML = ``;
  }
});

mailFormulario.addEventListener("input", function () {
  if (mailFormulario.value === "") {
    mensaje_error.innerHTML = `<div class="alert alert-warning" role="alert">
    Debes completar el mail  para poder contactarte!
  </div>
    `;
  }
  else {
    mensaje_error.innerHTML = ``;
  }
});



////////////////////////////////////////////////////
//Capturo la info del fomulario y la agrego en el DOM
let formulario = document.querySelector("#formulario");
let info = document.querySelector(".info");

//agregar informacion al DOM
const agregarInfo = formulario.addEventListener("submit", function (e) {
  //para evitar la redireccion.
  e.preventDefault();
  //agrego al DOM
  info.innerHTML = `
  <div class="alert alert-warning" role="alert">
<h5> Muchas gracias ${nombreFormulario.value} tu mensaje fue enviado con exito,
 te responderemos a ${mailFormulario.value}.</h5></div>`;
});


////////////////////////////////////////////////////////////

//Agregamos la funcionalidad de los cursos

const cards = document.querySelectorAll(".card")
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    leerDatosCursos(e.target.parentElement);
  })
})

//carrito de cursos
let cursosCarrito = [];

function leerDatosCursos(curso) {
  const infoCurso = {
    nombreCurso: curso.querySelector(".card-title").textContent,
    descripcion: curso.querySelector(".card-text").textContent,
    dia: curso.querySelector("#day").value,
    turno: curso.querySelector("#turno").value,
    id: cursosCarrito.length,
  };

  //control para que no cargue mal
  if (infoCurso.dia == "Selecciona el día de inicio") {
    let selector = document.querySelector(".noSeleccion");
    selector.innerHTML = `
      <div class="alert alert-success" role="alert">
      <h5>Debes seleccionar un dia</h5>
      </div>`;
  }
  else {
    let selector = document.querySelector(".noSeleccion");
    selector.innerHTML = `
      <div>
      </div>`;
      //control para que no cargue mal
      if(infoCurso.turno=="Selecciona el turno"){
        let selector = document.querySelector(".noSeleccion");
      selector.innerHTML = `
      <div class="alert alert-success" role="alert">
      <h5>Debes seleccionar un turno</h5>
      </div>`;
      }
      else{
        //agregamos el curso al carrito
        cursosCarrito = [...cursosCarrito, infoCurso];
        //guardo el carrito en JSON
        const guardarCursos=(clave,valor)=>{localStorage.setItem(clave,valor)};
        //recorro el array  para guardarlo
        for(const curso of cursosCarrito){
          guardarCursos(curso.id, JSON.stringify(curso));
        }
        
        //LLamo a la funcion para mostrar los productos en el carrito
        carritoHTML();
      }
    
  }
}

//Mostrar los productos en el carrito
const carrito = document.querySelector("#carrito");

function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML();

  cursosCarrito.forEach((curso) => {
    const row = document.createElement("p");
    row.innerHTML = `
    <div class="container">
    <h5>${curso.nombreCurso}</h5>
    <p>${curso.descripcion}</p><p>${curso.dia}</p><p>${curso.turno}</p>
    <button class="btn btn-danger" id="${curso.id}">Eliminar</button>
    </div>
    `;
    carrito.appendChild(row);
  });
}

// Eliminar productos del carrito

carrito.addEventListener("click", eliminarCurso);



function eliminarCurso(e) {
  if (e.target.classList.contains("btn-danger")) {
    let cursoID = e.target.getAttribute("id");
    console.log(cursoID);
    cursosCarrito=cursosCarrito.filter(
      curso=> curso.id!=cursoID
    )/* 
    const eliminado = cursosCarrito.filter(
      curso=> curso.id!= cursoID
    )
    cursosCarrito=eliminado; */

    carritoHTML();
  }
}

function limpiarHTML() {
  carrito.innerHTML = "";
}
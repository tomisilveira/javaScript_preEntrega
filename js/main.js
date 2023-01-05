let nombre;
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
const cursosDisponible = [{ id: 1, nombre: "Desarrollo Web", fechasDisponibles: ["20-1", "16-01", "9-02"], horarios: ["Mañana", "Tarde", "Noche"] },
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
    "Alumno: " + nombre + " con DNI:" + dni + " se a inscripto correctamente a " + " " + seleccionCurso[0] + " a la comision con inicio " + seleccionCurso[1]+" en el horario de "+seleccionCurso[2]+"."
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

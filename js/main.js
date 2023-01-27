


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


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//Constructor de cursos - Agregado por buena practica
class Cursos{
  constructor(nombre,descripcion,dia,turno,id ){
    this.id=id
    this.nombre=nombre
    this.descripcion=descripcion
    this.dia=dia
    this.turno=turno
  }
  mostrarCursos(){
    const card = `<div class="card-body">
    <h5 class="card-title">${this.nombre}</h5>
      <p class="card-text">${this.descripcion}.</p>
      <p class="card-text">${this.dia}.</p>
      <p class="card-text">${this.turno}.</p>
      <a href="#" class="btn btn-primary" id=${this.id}>Agregar</a>
    </div>`
    const container = document.getElementById('listado')
    container.innerHTML +=card
  }
  agregarEvento(){
    const btnCurso=document.getElementById(`${this.id}`)
    const findCurso=cursos.find(c =>c.id==this.id)
    btnCurso.addEventListener(`click`,(e)=>{
      e.preventDefault()
      agregarCurso(findCurso)
    })
  }
  
}



const cursos=[]
//carrito de cursos
let cursosCarrito = JSON.parse(localStorage.getItem('cursosCarrito')) || []; 
mostrarCarrito()

//cargo los datos con fetch de la base de datos local.
fetch('./cursos.json')
    .then(res=>res.json())
    .then(data=>{data.forEach(curso=> {
      let newCurso =new Cursos (curso.nombre,curso.descripcion,curso.dia,curso.turno, curso.id)
      cursos.push(newCurso)
    })

    cursos.forEach(e=>{
      e.mostrarCursos()
    })

    cursos.forEach(e=>{
      e.agregarEvento()
    })

  })
    .catch(err=>console.log(err))


    function agregarCurso(curso){
       const enCarrito = cursosCarrito.find(cur=>cur.id==curso.id)
       if(!enCarrito){
        cursosCarrito.push(curso)
        localStorage.setItem('cursosCarrito', JSON.stringify(cursosCarrito))
        swal("Agregaste el curso", "Exitos en tu nuevo curso", "success");
        mostrarCarrito()
       }
       else{
        //mostrar menjase de que ya tiene agregado ese curso
        swal("", "No se puede agregar dos veces el mismo curso", "error");
       }
    }

    function mostrarCarrito(){
      cursosCarrito.forEach(cur=>{
      const card = `<div class="card-body">
      <h5 class="card-title">${cur.nombre}</h5>
        <p class="card-text">${cur.descripcion}.</p>
        <p class="card-text">${cur.dia}.</p>
        <p class="card-text">${cur.turno}.</p>
        <a href="#" class="btn-danger" id=${cur.id}>Eliminar</a>
      </div>`
      const container = document.getElementById('carrito')
      container.innerHTML +=card
    }
      )
    }
   // Eliminar productos del carrito

   //Mostrar los productos en el carrito
const carrito = document.querySelector("#carrito");
carrito.addEventListener("click", (e=>{
  e.preventDefault()
  console.log(e.target.getAttribute("id"))
  eliminarCurso(e.target.getAttribute("id"))}));



function eliminarCurso(e) {
  swal({
    title: "Estas seguro que desea eliminar el curso del carrito?",
    text: "",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      const enCarrito = cursosCarrito.find(cur=>cur.id==e)
       if(enCarrito){
        console.log(enCarrito)
        cursosCarrito= cursosCarrito.filter(cur => cur != enCarrito);
        localStorage.removeItem('cursosCarrito')
        localStorage.setItem('cursosCarrito', JSON.stringify(cursosCarrito))
        console.log(cursosCarrito)
        limpiarHTML()
        mostrarCarrito()

        
       }
       else{
       
       }
      swal("Curso eliminado del carrito", {
        icon: "success",
      });
    } else {
      swal("Tu curso sigue dentro del carrito");
    }
  });
  const enCarrito = cursosCarrito.find(cur=>cur.id==e)
       if(enCarrito){
        console.log(enCarrito)
        cursosCarrito= cursosCarrito.filter(cur => cur != enCarrito);
        console.log(cursosCarrito)
        limpiarHTML()
        mostrarCarrito()
        /* cursosCarrito.push(curso)
        localStorage.setItem('cursosCarrito', JSON.stringify(cursosCarrito))
        swal("Agregaste el curso", "Exitos en tu nuevo curso", "success"); */
        
       }
       else{
        //mostrar menjase de que ya tiene agregado ese curso
        swal("", "No se puede agregar dos veces el mismo curso", "error");
       }


  }
  function limpiarHTML() {
    carrito.innerHTML = "";
  } 













/* 

//Agregamos la funcionalidad de los cursos

const cards = document.querySelectorAll(".card")
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    //evito que se recargue la pagina - recomendacion de mi tutor corrector.
    e.preventDefault()
    leerDatosCursos(e.target.parentElement);
  })
})



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
    )

    carritoHTML();
  }
}

function limpiarHTML() {
  carrito.innerHTML = "";
} */
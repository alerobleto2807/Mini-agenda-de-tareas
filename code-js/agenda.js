/* lo primero es crear las variables que llamaran a los elementos del html*/
const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#boton-enter");

// crearemos variables para crear el efecto de realizado en las tareas
const check = 'fa-check-circle';
const unCheck = 'fa-circle';
const lineTrought = 'line-through';

let id;
let lista_de_tareas; // en este array vacio se almacenaran las tareas



// creacion de la funcion fecha
const upDate = new Date()
fecha.innerHTML = upDate.toLocaleDateString('es-CR', {weekday:"long",month:"short", day:"numeric"})



// funcion agregar tarea
function agregarTarea(tarea, id, realizado, eliminado){

if(eliminado){
   return
}
   const REALIZADO =  realizado ? check : unCheck;
   const LINE = realizado ?lineTrought :'';

   const elemento = `
                   <li id="elemento">
                   <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                   <p class="text ${LINE}">${tarea}</p>
                   <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                   </li> 
                     `
   lista.insertAdjacentHTML("beforeend", elemento)
}

// necesitamos un boton para cargar ese elemento nuevo 
botonEnter.addEventListener('click', ()=>{
   const tarea = input.value
   if(tarea){
       agregarTarea(tarea,id, false, false)
       lista_de_tareas.push({
          nombe: tarea,
          id: id,
          realizado: false,
          eliminado:false
       })
   }
   localStorage.setItem('MAKELIST',JSON.stringify(lista_de_tareas))
   id++
   input.value ='';
})

// haciendo que la tecla enter funcione para agregar tambien
document.addEventListener('keyup', function(event){
   if(event.key == 'Enter'){
       const tarea = input.value
       if(tarea){
           agregarTarea(tarea,id,false, false)
           lista_de_tareas.push({
            nombe: tarea,
            id: id,
            realizado: false,
            eliminado:false
         })
       }
       localStorage.setItem('MAKELIST',JSON.stringify(lista_de_tareas))
       input.value="";
       id++
   }
})


// craeando lo eventos de click de check y borrar

lista.addEventListener('click',function(event){
   const element = event.target 
   const elementData = element.attributes.data.value
   console.log(elementData)
   
   if(elementData == 'realizado') {
       tareaRealizada(element)
   }
   else if(elementData == 'eliminado') {
       tareaEliminada(element)
       console.log("elimnado")
   }
   localStorage.setItem('MAKELIST',JSON.stringify(lista_de_tareas))
})


function tareaRealizada(element) {
   element.classList.toggle(check)
   element.classList.toggle(unCheck)
   element.parentNode.querySelector(".text").classList.toggle(lineTrought)
   lista_de_tareas[element.id].realizado = lista_de_tareas[element.id].realizado ?false :true

}


function tareaEliminada(element){
   element.parentNode.parentNode.removeChild(element.parentNode)
   lista_de_tareas[element.id].eliminado = true;
}


// como ultimo paso vamos a crear el LocalStorage de la app
// lo primro es crea el local estorage que sere agregado a las funciones importantes
//   localStorage.setItem('MAKELIST',JSON.stringify(lista_de_tareas)) donde se agrega y se actualiza 


// creaando el getItem que nos traera la lista de tareas en el broswer
let data = localStorage.getItem('MAKELIST')
if(data){
    lista_de_tareas = JSON.parse(data)
   
    id = lista_de_tareas.length
    cargarLista(lista_de_tareas)
}else {
    lista_de_tareas= []
    id = 0
}

// creando la funcion cargar lista
function cargarLista(DATA){
   DATA.forEach(function(i){
       agregarTarea(i.nombe,i.id,i.realizado,i.eliminado)
   })
}



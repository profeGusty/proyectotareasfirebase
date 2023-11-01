import {
  onGetTasks,
  saveTask,
  deleteTask,
  getTask,
  updateTask,
  getTasks,
} from "./firebase.js";

const taskContainer = document.getElementById("tasks-container");
const taskForm = document.getElementById("task-form");

let estado = false;
let id = "";

window.addEventListener("DOMContentLoaded", async () => {
  const querySnapshot = await getTasks();

  onGetTasks((querySnapshot) => {
    let html = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();
      html += `
               <div class="card-tarea">
                  <h3>${task.title}</h3>
                  <p>${task.descripcion}</p>
                  <div class="card-botones">
                      <button class='btn-delete' data-id="${doc.id}">Delete</buttton>
                      <button class='btn-edit' data-id="${doc.id}">Editar</buttton>
                  </div>
               </div>    
            `;
    });

    taskContainer.innerHTML = html;

    const btnsDelete = taskContainer.querySelectorAll('.btn-delete')
    
    btnsDelete.forEach(btn => {
      btn.addEventListener('click',(event) =>{
        if (confirm("¿Estas seguro de eliminar esta tarea?")){
            deleteTask(event.target.dataset.id)
        }else{
          return
        }
      })
    })

    const btnsEdit = taskContainer.querySelectorAll('.btn-edit')

     btnsEdit.forEach((btn) => {
          btn.addEventListener('click', async(event) => {
          console.log(event.target.dataset.id);
           const doc = await getTask (event.target.dataset.id)
           const task = doc.data()

           taskForm['task-title'].value = task.title
           taskForm['descripcion'].value = task.descripcion

           estado = true;
           id = event.target.dataset.id;

           taskForm['btn-task-save'].innerText = "Modificar"
       })
     })
  });
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const descripcion = taskForm["descripcion"];

    if(!estado){
      saveTask(title.value, descripcion.value);
    }else{
      updateTask(id,
                {title:title.value,
                 descripcion:descripcion.value})
      estado = false;

      taskForm['btn-task-save'].innerText = "Guardar"
    }

  taskForm.reset();
});

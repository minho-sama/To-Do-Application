import {alertBox} from "./dom"
import {filterByTitle, filterByProject, targetOneTask} from "./loadTodos"

//add todo to localStorage
const submitBtn = document.querySelector('#submitTask')

function addTodo(/*lehet majd úgy kéne h ide rakni a project foldert*/ ){
    const todoName = document.querySelector('#todoName')
    const todoDate = document.querySelector('#dateSet')
    const todoDescription = document.querySelector('#descriptionBox')

    let taskList = []

    submitBtn.addEventListener('click', function(){
        let activeFolder = document.querySelector('.activeProject')
            //read after refresh, before submitting new todo to the same project

        if (localStorage.hasOwnProperty('allTasks')){
            taskList = JSON.parse(localStorage.getItem('allTasks'))
        }

        if (todoName.value == '' || todoDate.value == '' || todoDescription.value == ''){
            alertBox('please fill in all fields!', 'alert-msg')
        }
        else{
            if (activeFolder === null){
                alertBox('please select a project', 'alert-msg')
            }
            else{
                let task = new Todo(activeFolder.textContent, todoName.value, todoDate.value, todoDescription.value)
                taskList.push(task)
                let taskList_serialized = JSON.stringify(taskList)
                localStorage.setItem('allTasks', taskList_serialized)

                //close form
                todoName.value = ""
                todoDate.value = ""
                todoDescription.value = ""
        
                const addBtn = document.querySelector('#addItem')
                const popUpForm = document.querySelector('#popUpForm')
        
                addBtn.value = '+'
                popUpForm.style.display = 'none'

                alertBox('Task Added!', 'success-msg')
                //form closed

                //ide jön majd a loadProjectsFromPopUp()
            }
        }
    })

}

//almost identical to loadProjects, but not with evebt.target (hanem .activeProject)
function loadProjectsFromPopUp(){
    submitBtn.addEventListener('click', function(){

        if (localStorage.hasOwnProperty('allTasks')){
            document.querySelector('#tasksContainer').innerHTML = ""
            let folderName = document.querySelector('.activeProject').textContent

            let arrayOfTasks = filterByProject(folderName)
            arrayOfTasks.forEach(task => {
                let todo = document.createElement('div')
                todo.classList.add('taskTodo')
                todo.innerHTML = `
                <h3 class = 'taskTitle'> ${task.title} </h3> 
                <p class = 'taskDate'>Expires: ${task.date}</p>
                <input type = button class = 'delBtn' value = 'x'></input>
                <input type = button class = 'expandBtn' value = '...'></input>
                `
                document.querySelector('#tasksContainer').appendChild(todo)

                //addDescription eventListener
                showDescription()
                //add Delete event
                addDeleteEvent()
            })  
        }
    })
}

function Todo (project, title, date, description){
    this.project = project
    this.title = title
    this.date = date
    this.description = description
}


//discard popUp
const cancelTask = document.querySelector('#cancelTask')

 const discardTask = function (){
     cancelTask.addEventListener('click', function(){

        //clear fields
        document.querySelector('#todoName').value = ""
        document.querySelector('#dateSet').value = ""
        document.querySelector('#descriptionBox').value = ""

        const addBtn = document.querySelector('#addItem')
        const popUpForm = document.querySelector('#popUpForm')

        addBtn.value = '+'
        popUpForm.style.display = 'none'
        })
 }

//expand buttons to see description, add cancel button too
//valamiért triplán ad hozzá!!! kijavítani
function showDescription(){

    const expandBtns= document.querySelectorAll('.expandBtn')
    expandBtns.forEach(btn => {
        btn.addEventListener('click', function(event){

            let popUp = document.createElement('div')
            popUp.classList.add('descriptionBox')

            //magic
            let parent = event.target.closest('div')
            let title = parent.querySelector('.taskTitle').textContent
            let date = parent.querySelector('.taskDate').textContent

            //find the description in localStorage, magic2
            let titleTrimmed = parent.querySelector('.taskTitle').textContent.trim()
            let description = targetOneTask(titleTrimmed)[0].description

            popUp.innerHTML = `
                <h3>${title}</h3>
                <p class = 'description'> ${description}  </p>
                <p class = 'dateDescription'>${date}</p>
                <input class = 'delDescription' type = button value = 'x'></input>`
            
            const todos = document.querySelector('#todos')
            todos.appendChild(popUp)

           const delDescription = document.querySelectorAll('.delDescription')
            //i dont't where the bug is, favágó módszer lol
            delDescription.forEach(btn => {
                btn.addEventListener('click', function (){
                    document.querySelectorAll('.descriptionBox').forEach(e => e.remove());
                })

        })
        })
    })

}

function addDeleteEvent(){

    const delBtns = document.querySelectorAll('.delBtn')
    delBtns.forEach(button => {
        button.addEventListener('click', function(event){
            // let project = document.querySelector('.activeProject').textContent
            //remove from local storage
            let parent = event.target.closest('div')
            let title = parent.querySelector('.taskTitle').textContent.trim()
            let filteredAllTasks = filterByTitle(title)
            let filteredAllTasks_serialized = JSON.stringify(filteredAllTasks)
            localStorage.setItem('allTasks', filteredAllTasks_serialized)

                //load tasks again to refresh dom
                if (localStorage.hasOwnProperty('allTasks')){
                    document.querySelector('#tasksContainer').innerHTML = ""
                    let folderName = document.querySelector('.activeProject').textContent
            
                    let arrayOfTasks = filterByProject(folderName)
                    arrayOfTasks.forEach(task => {
                    let todo = document.createElement('div')
                    todo.classList.add('taskTodo')
                    todo.innerHTML = `
                    <h3 class = 'taskTitle'> ${task.title} </h3> 
                    <p class = 'taskDate'>Expires: ${task.date}</p>
                    <input type = button class = 'delBtn' value = 'x'></input>
                    <input type = button class = 'expandBtn' value = '...'></input>
                    `
                    document.querySelector('#tasksContainer').appendChild(todo)
            
                        // //addDescription eventListener
                        showDescription()
                        // //add Delete event
                        addDeleteEvent()
                    })
                }

        }
        )
    })
}
            


//ipadben benne van
// function showDescription2(){

//     document.body.addEventListener('click', function(event) {
//         if (event.target.closest('exapndBtn')){
//             const parent = event.target.closest('.expandBtn').closest('div')
//             let title = parent.querySelector('.taskTitle').textContent
//             let date = parent.querySelector('.taskDate').textContent

//             //find the description in localStorage, magic2
//             let titleTrimmed = parent.querySelector('.taskTitle').textContent.trim()
//             let description = targetOneTask(titleTrimmed)[0].description

//             let popUp = document.createElement('div')
//             popUp.classList.add('descriptionBox')
//             popUp.innerHTML = `
//             <h3>${title}</h3>
//             <p class = 'description'> ${description}  </p>
//             <p class = 'dateDescription'>${date}</p>
//             <input class = 'delDescription' type = button value = 'x'></input>`

//             const todos = document.querySelector('#todos')
//             todos.appendChild(popUp)
//         }
//     })
// }
            

//     const delDescription = document.querySelectorAll('.delDescription')
//     delDescription.forEach(btn => {
//     btn.addEventListener('click', function (event){
//     event.target.parentNode.remove()
//     })})


export {showDescription, discardTask, addTodo, loadProjectsFromPopUp, addDeleteEvent}
            //showDescription2


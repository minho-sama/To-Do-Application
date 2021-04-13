import {filterByProject, removeByProject} from "./loadTodos"
import {addDeleteEvent, showDescription} from "./todoHandling"

//popup
const addBtn = document.querySelector('#addItem')

 const popUp = function (){
     addBtn.addEventListener('click', function(){
        const popUpForm = document.querySelector('#popUpForm')

        if (popUpForm.style.display === 'none'){
            addBtn.value = 'x'
            popUpForm.style.display = 'block'
        }
        else{
            addBtn.value = '+'
            popUpForm.style.display = 'none'
        }
    })
 }

//projektekeket bedobni arraybe, aztán LOCAL sTORaGEBE, megszámozni data-index
//egyelőre csak a neveket tárolja el 'key'-ként, de lehet h majd meg kell változtatni
//úgy, hogy egy project 1 object legyen

let projects = []

function projectHandling(){

    const nameField = document.querySelector('#projectName')
    const submitBtn = document.querySelector('#projectSubmit')
    const deleteBtn = document.querySelector('#projectDelete')

    if (localStorage.hasOwnProperty('projects')){
        projects = JSON.parse(localStorage.getItem('projects'))
        
        console.log(localStorage.projects)
    }

    submitBtn.addEventListener('click', function(){
        if (nameField.value !== ""){
            projects.push(nameField.value)
            let projects_serialized = JSON.stringify(projects)
            localStorage.setItem('projects', projects_serialized)
        }

        nameField.value = ""

    })

    //delete all the tasks from localStorage that is in the selected project
    deleteBtn.addEventListener('click', function(){
        let deleteThis = document.querySelector('.activeProject')
        let filteredArray = removeByProject(deleteThis.textContent)
        let filteredArray_serialized = JSON.stringify(filteredArray)
        localStorage.setItem('allTasks', filteredArray_serialized)
    })

    //delete project name from list and from storage
    deleteBtn.addEventListener('click', function(){
        let deleteThis = document.querySelector('.activeProject')
        deleteThis.parentNode.removeChild(deleteThis);

        let projectArray = JSON.parse(localStorage.getItem('projects'))
        projectArray.splice(deleteThis.dataset.index, 1)

        let projectArray_serialized = JSON.stringify(projectArray)
        localStorage.setItem("projects", projectArray_serialized)

        //delete UI 
        document.querySelector('#tasksContainer').innerHTML = ""

    })


}

function appendProjects(){
    const projectList = document.querySelector('#projectList')

    let project = JSON.parse(localStorage.getItem('projects'))

    project.forEach( project => {
        let name = document.createElement('div')
        name.textContent = project
        projectList.appendChild(name)
    })

}

//load projects on click
function loadProjects (){
    const projectList = document.querySelectorAll("#projectList div")
    projectList.forEach(project => {
        project.addEventListener('click', function(event){
            document.querySelector('#tasksContainer').innerHTML = ""
            let folderName = event.target.textContent

            //prevent error message on console.log
            if (localStorage.hasOwnProperty('allTasks')){
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
                //add delete event
                addDeleteEvent()
            })
            }
        })
    })
}

//animation for selecting project
function changeActive (){
    const projectList = document.querySelectorAll('#projectList div')
    projectList.forEach(project => {
        project.addEventListener('click', (event)=>{
            //onclick first it removes all '.activeProject'
            projectList.forEach(project => {
                project.classList.remove('activeProject')
            })
            //then it adds the class
            event.target.classList.add('activeProject')
            
        })
    })
}

//validation form
const submitBtn = document.querySelector('#projectSubmit')
submitBtn.addEventListener('click', function(){
    const nameField = document.querySelector('#projectName')
    if (nameField.value !== ""){
        alertBox('Project added!', 'success-msg')
    }
    else{
        alertBox('please name your project!', 'alert-msg')
    }
})

function alertBox(message, classname){
    let div = document.createElement('div')
    div.classList.add(classname)
    div.textContent = message
    document.querySelector('header').appendChild(div)
    setTimeout(()=> document.querySelector('header').removeChild(div), 2000);
}

function addDataToProjects (){
    const projectList = document.querySelectorAll('#projectList div');
    projectList.forEach((project, i) => project.setAttribute('data-index', i))
}

function showProjects(){
    console.log(projects)
}
export {popUp, projectHandling, appendProjects, changeActive, showProjects, addDataToProjects, alertBox, loadProjects}

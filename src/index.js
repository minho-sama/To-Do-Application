import { 
    popUp, 
    changeActive, 
    projectHandling, 
    appendProjects, 
    showProjects, 
    addDataToProjects, 
    loadProjects
} from "./dom";

import {
    showDescription,
    discardTask,
    addTodo,
    loadProjectsFromPopUp,
    addDeleteEvent
    } from "./todoHandling"

//uncomment -->  'Your Projects' is ALWAYS on if there are no projects!
if (localStorage.hasOwnProperty('projects') == false /*|| JSON.parse(localStorage.projects).length === 0*/){
    let defaultProjects = JSON.stringify(['Your Project'])
    localStorage.setItem('projects', defaultProjects)
}

popUp()
projectHandling()
appendProjects()
changeActive()
addDataToProjects()

//loadTasks
showDescription()
// showDescription2()
discardTask()
addTodo()
loadProjects()

loadProjectsFromPopUp()
addDeleteEvent()

showProjects()
console.table(localStorage)
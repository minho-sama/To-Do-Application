import { popUp, changeActive, projectHandling, appendProjects, showProjects, addDataToProjects, loadProjects} from "./dom";
import {showDescription, discardTask, addTodo, loadProjectsFromPopUp, addDeleteEvent} from "./todoHandling"

if (localStorage.hasOwnProperty('projects') == false){
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


// localStorage.setItem('getProject', function(index){
//     localStorage.getItem('projects')
// })
showProjects()
console.table(localStorage)
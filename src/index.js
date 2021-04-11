import { popUp, changeActive, projectHandling, appendProjects, addDataToProjects, showProjects} from "./dom";

if (localStorage.hasOwnProperty('projects') == false){
    let defaultProjects = JSON.stringify(['Your Project'])
    localStorage.setItem('projects', defaultProjects)
}

popUp()
projectHandling()
appendProjects()
changeActive()
addDataToProjects()



// localStorage.setItem('getProject', function(index){
//     localStorage.getItem('projects')
// })

showProjects()
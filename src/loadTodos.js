//csak ezután kidolgozni a remove itemet!!! (na ez problémás lesz?) ==> iterate through allTasks ==> remove: event.target project && title &&   dátum meg kell hogy egyezzen!
//ha delete a project ==> delete every object that has the this.project = event.target.textContent

//vaaagy ugyanúgy filter de nem csak a projectet nézi hanem az összes többi propertyt is!!!
//miután localStorageből removeolva lett újra loadProject, howDescription(), és a delete btn-nek is újra kell adni I guess

//csak ezután a description box expand


//datet hagyjad, octa literals! convert date from 2021-04-12 to 2021.04.12
function removeOneTaskLocalStorage(title, date){
    let allTasks = JSON.parse(localStorage.allTasks)
    return allTasks.filter(task => task.title !== title && task.date !== date)
     //ezután a szokásos serialize, setItem()
}

function targetOneTask(id){
    let allTasks = JSON.parse(localStorage.getItem("allTasks"))
    return allTasks.filter(task => task.title == id)
}

function filterByProject(project){
    let allTasks = JSON.parse(localStorage.allTasks) 
    return allTasks.filter(task => task.project === project)
    //ezután majd még stringify és setItem()!
}

function filterByTitle(title){
    let allTasks = JSON.parse(localStorage.getItem("allTasks"))
    return allTasks.filter(task => task.title !== title)
}

function removeByProject(project){
    let allTasks = JSON.parse(localStorage.allTasks) 
    return allTasks.filter(task => task.project !== project )
    //ezután stringify és setItem()!
}

export {filterByProject, removeByProject, removeOneTaskLocalStorage, targetOneTask, filterByTitle}
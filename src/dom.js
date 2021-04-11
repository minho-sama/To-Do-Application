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
    }

    submitBtn.addEventListener('click', function(){
        if (nameField.value === ""){
            alert('please name your project!')
        }
        else{
            projects.push(nameField.value)
            let projects_serialized = JSON.stringify(projects)
            localStorage.setItem('projects', projects_serialized)
        }

        nameField.value = ""
    })

        //delete project from list and from storage (not including tasks)
        deleteBtn.addEventListener('click', function(){
            let deleteThis = document.querySelector('.activeProject')
            deleteThis.parentNode.removeChild(deleteThis);
    
            let projectArray = JSON.parse(localStorage.getItem('projects'))
            projectArray.splice(deleteThis.dataset.index, 1)
    
            let projectArray_serialized = JSON.stringify(projectArray)
            localStorage.setItem("projects", projectArray_serialized)
    
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

function addDataToProjects (){
    const projectList = document.querySelectorAll('#projectList div');
    projectList.forEach((project, i) => project.setAttribute('data-index', i))
}

function showProjects(){
    console.log(projects)
}

export {popUp, projectHandling, appendProjects, changeActive, showProjects, addDataToProjects}
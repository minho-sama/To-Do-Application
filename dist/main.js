(()=>{"use strict";const e=document.querySelector("#addItem");let t=[];if(0==localStorage.hasOwnProperty("projects")){let e=JSON.stringify(["Your Project"]);localStorage.setItem("projects",e)}e.addEventListener("click",(function(){const t=document.querySelector("#popUpForm");"none"===t.style.display?(e.value="x",t.style.display="block"):(e.value="+",t.style.display="none")})),function(){const e=document.querySelector("#projectName"),o=document.querySelector("#projectSubmit"),c=document.querySelector("#projectDelete");localStorage.hasOwnProperty("projects")&&(t=JSON.parse(localStorage.getItem("projects"))),o.addEventListener("click",(function(){if(""===e.value)alert("please name your project!");else{t.push(e.value);let o=JSON.stringify(t);localStorage.setItem("projects",o)}e.value=""})),c.addEventListener("click",(function(){let e=document.querySelector(".activeProject");e.parentNode.removeChild(e);let t=JSON.parse(localStorage.getItem("projects"));t.splice(e.dataset.index,1);let o=JSON.stringify(t);localStorage.setItem("projects",o)}))}(),function(){const e=document.querySelector("#projectList");JSON.parse(localStorage.getItem("projects")).forEach((t=>{let o=document.createElement("div");o.textContent=t,e.appendChild(o)}))}(),function(){const e=document.querySelectorAll("#projectList div");e.forEach((t=>{t.addEventListener("click",(t=>{e.forEach((e=>{e.classList.remove("activeProject")})),t.target.classList.add("activeProject")}))}))}(),document.querySelectorAll("#projectList div").forEach(((e,t)=>e.setAttribute("data-index",t))),console.log(t)})();
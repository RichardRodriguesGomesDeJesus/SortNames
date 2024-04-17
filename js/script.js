const form = document.querySelector(".sectionForm__formNames")
const inputName = document.querySelector(".sectionForm__formNames___input")
let list = localStorage.getItem("nameList") ? JSON.parse(localStorage.getItem("nameList") ) : []
const ul = document.querySelector(".sectionList__list")
const btnSort = document.querySelector(".sectionList__sort")
const main = document.querySelector("main")

btnSort.addEventListener("click",(e)=>{
  e.preventDefault()
  if (list.length > 1) {
    // <div class="popupNameSort">
    //   <p>O ganhador foi o <br>Richard</p>
    //   <button class="popupNameSort__button">confirmar</button>
    // </div>
    const exist = document.querySelector(".popupNameSort")
    if(exist){
      exist.remove()
    }
    const div = document.createElement("div")
    div.classList.add("popupNameSort")
    div.innerHTML = `<p>O ganhador foi <br>${list[parseInt(Math.random() * list.length )]}</p>`
    const btn = document.createElement("button")
    btn.classList.add("popupNameSort__button")
    btn.textContent = "Voltar"
    btn.onclick = () =>{
      div.remove()
    }
    div.appendChild(btn)
    main.appendChild(div)
  }
})
showNames(list)
function updateList (list){
  localStorage.setItem("nameList",JSON.stringify(list))
}
form.addEventListener("submit",(e)=>{
  e.preventDefault()
  if (localStorage.getItem("nameList")) {
    localStorage.removeItem("nameList")
  }
  list.push(inputName.value)
  updateList(list)
  showNames(list)
  inputName.value = ""
})

function showNames(names) {
  ul.innerHTML = ""
  names.forEach((name,index) => {
    const li = document.createElement("li")
    const p = document.createElement("p")
    const btn = document.createElement("button")
    li.classList.add("sectionList__list___item")
    p.textContent = name
    p.classList.add("sectionList__list___item____text")
    btn.classList.add("sectionList__list___item____btn--delete")
    btn.onclick = ()=>{
      list = list.filter((e)=> e != name)
      updateList(list)
      li.remove()
    }
    li.appendChild(p)
    li.appendChild(btn)
    ul.appendChild(li)
  });
}

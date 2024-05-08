import { Get, Set } from "./LocalStorage.js"

const inputDarkMode = document.querySelector(".checkbox")
const light ={
        background: "#f0f0f0",
        border:"#333",
        color:"#140d27",
        header:"#4d7e96"
}

const dark ={
    background: "#333",
    border:"#ebe6e0",
    color:"#ebe6e0",
    header:"#0c2f41"
}

inputDarkMode.addEventListener("change", ()=>{
   Set("mode", inputDarkMode.checked)
   majParam(inputDarkMode.checked)
})

let bool = Get("mode", true )
majParam(bool)
inputDarkMode.checked=bool;


function majParam(bool) {
    if (bool) {
        document.documentElement.style.setProperty("--background", light.background)
        document.documentElement.style.setProperty("--border", light.border)
        document.documentElement.style.setProperty("--color", light.color)
        document.documentElement.style.setProperty("--header", light.header)

    } else {
        document.documentElement.style.setProperty("--background", dark.background)
        document.documentElement.style.setProperty("--border", dark.border)
        document.documentElement.style.setProperty("--color", dark.color)
        document.documentElement.style.setProperty("--header", dark.header)
      }
}
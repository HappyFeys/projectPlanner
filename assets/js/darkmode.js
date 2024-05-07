const inputDarkMode = document.querySelector(".checkbox")

inputDarkMode.addEventListener("change", ()=>{
    if (inputDarkMode.checked) {
        document.documentElement.style.setProperty("--background", "#f0f0f0")
        document.documentElement.style.setProperty("--border", "#333")
        document.documentElement.style.setProperty("--color", "#140d27")
        document.documentElement.style.setProperty("--header", "#4D7E96")
    } else {
        document.documentElement.style.setProperty("--background", "#333")
        document.documentElement.style.setProperty("--border", "#ebe6e0")
        document.documentElement.style.setProperty("--color", "#ebe6e0")
        document.documentElement.style.setProperty("--header", "#0C2F41")
      }
})
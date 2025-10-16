export const splashScreen = document?.querySelector("#splashScreen");
export const mainScreen = document?.querySelector("#mainWindow");
export const highScoreScreen = document.querySelector("#highScoreScreen")
export const controlsScreen = document.querySelector("#controlsScreen")

export const triggerBtn = document?.querySelector("#splashScreen > button");
export const highScoreBtn = document.querySelector("#highScoreBtn")
export const controlsBtn = document.querySelector("#controlsBtn")

document.addEventListener("DOMContentLoaded", () => {

    mainScreen?.classList.add("hidden")

    triggerBtn?.addEventListener("click", () => {
        splashScreen?.classList.add("hidden")
        mainScreen?.classList.remove("hidden")
    })

    highScoreBtn?.addEventListener("click", () => {
        highScoreScreen?.classList.add("block")
    })

    controlsBtn?.addEventListener("click", () => {
        controlsScreen?.classList.add("block")
    })
})
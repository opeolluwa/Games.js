import {createApp, ref} from 'vue'

import WelcomeScreen from "./views/welcomeScreen.ts";
import GameScreen from "./views/gameScreen.ts";


const App = createApp({
    components: {
        'app-welcome-window': WelcomeScreen,
        'app-game-window': GameScreen
    },
    setup() {

        const message = ref('Hello Vue!')
        return {
            message
        }
    }
})


window.addEventListener('load', () => {
    App.mount('#app')
})

export const splashScreen = document?.querySelector("#splashScreen");
export const mainScreen = document?.querySelector("#mainWindow");
export const highScoreScreen = document.querySelector("#highScoreScreen");
export const controlsScreen = document.querySelector("#controlsScreen");
export const gamePlayScreen = document.querySelector("#gamePlay");

export const gameMainScreen = document.querySelector("#gameMainScreen");

export const playGameBtn = document?.querySelector("#gamePlayBtn");
export const highScoreBtn = document.querySelector("#highScoreBtn");
export const controlsBtn = document.querySelector("#controlsBtn");

export const usernameForm: HTMLFormElement | null =
    document?.querySelector("#usernameForm");
export const usernameFormInput: HTMLInputElement | null =
    document?.querySelector("#usernameForm > input");


export const gamePromptForm: HTMLFormElement | null = document?.querySelector("#input-controls form");
export const gamePromptFormInput: HTMLInputElement | null = document?.querySelector("#input-controls form input");


export const machineTextStylesheet = {
    maxWidth: '85%',
    backgroundColor: '#2D2D2D',
    color: '#fff',
    padding: '15px 25px',
    borderRadius: '8px 25px 25px 18px',
    marginBottom: '12px',
    marginLeft: '5px'
}

export const typingStateStylesheet = {
    maxWidth: '85%',
    padding: '15px 25px',
    borderRadius: '8px 25px 25px 18px',
    marginBottom: '12px',
    marginLeft: '5px'
}

export const playerTextStylesheet = {
    display: "flex",
    backgroundColor: "oklch(58.205% 0.06063 156.17)",
    color: "#fff",
    padding: "15px 25px",
    borderRadius: "8px 25px 25px 18px",
    marginBottom: "12px",
    marginLeft: "auto",
    marginTop: "1rem",
    maxWidth: "85%",
    width: 'fit-content',
    alignSelf: "flex-end",
};

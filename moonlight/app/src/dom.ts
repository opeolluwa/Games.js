export const splashScreen = document?.querySelector("#splashScreen");
export const gamePlayScreen = document.querySelector("#gamePlay");

export const gameMainScreen = document.querySelector("#gameMainScreen");

export const playGameBtn = document?.querySelector("#gamePlayBtn");

export const usernameForm: HTMLFormElement | null =
    document?.querySelector("#usernameForm");
export const usernameFormInput: HTMLInputElement | null =
    document?.querySelector("#usernameForm > input");


export const gamePromptForm: HTMLFormElement | null = document?.querySelector("#input-controls form");
export const gamePromptFormInput: HTMLInputElement | null = document?.querySelector("#input-controls form input");


export const machineTextStylesheet = {
    maxWidth: '75%',
    backgroundColor: 'oklch(85.94% 0.02452 159.07)',
    color: '#101010',
    padding: '15px 25px',
    paddingLeft: "5px",
    borderRadius: '18px 25px 25px 8px',
    marginBottom: '1rem',
    marginLeft: '5px',
    fontSize: '14px'
}

export const typingStateStylesheet = {
    maxWidth: '75%',
    padding: '15px 25px',
    borderRadius: '8px 25px 25px 18px',
    marginBottom: '12px',
    marginLeft: '5px'
}

export const playerTextStylesheet = {
    display: "flex",
    backgroundColor: "oklch(58.205% 0.06063 156.17)",
    color: "#fff",
    padding: '15px 25px',
    borderRadius: "8px 25px 25px 18px",
    marginBottom: "12px",
    marginLeft: "auto",
    marginTop: "1rem",
    maxWidth: "75%",
    width: 'fit-content',
    alignSelf: "flex-end",
    fontSize: '14px'

};

export function playSound(src: string) {
    const audio = new Audio(src);
    audio.play().then((res) => {
        console.log(res)
    });
}
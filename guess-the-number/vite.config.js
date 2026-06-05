import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        play: resolve(__dirname, "game-play.html"),
        init: resolve(__dirname, "initialize-game.html"),
        quot: resolve(__dirname, "quot.html"),
      },
    },
  },
});

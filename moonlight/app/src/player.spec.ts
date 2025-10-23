import { expect, test, describe } from "vitest";
import { Player } from "./player";

describe("player module", () => {
  test("new player", () => {
    const playerName = "TestPlayer";
    const player = new Player(playerName);
    const info = player.getInformation();

    expect(info.name).toBe(playerName);
    expect(info.identifier).toBeDefined();
    expect(info.stats.win).toBe(0);
    expect(info.stats.loss).toBe(0);
  });
});

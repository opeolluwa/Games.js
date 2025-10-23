import { expect, test, describe } from "vitest";
import { Stats } from "./stats.ts";

describe("stats module", () => {
  test("placeholder test", () => {
    const stats = new Stats();
    expect(stats).toBeDefined();
  });

  test("initial stats are zero", () => {
    const stats = new Stats();
    expect(stats.win).toBe(0);
    expect(stats.loss).toBe(0);
  });

  test("incrementing wins and losses", () => {
    const stats = new Stats();
    stats.incrementWin();
    stats.incrementLoss();
    stats.incrementLoss();
    expect(stats.win).toBe(1);
    expect(stats.loss).toBe(2);
  });

  test("resetting stats", () => {
    const stats = new Stats();
    stats.incrementWin();
    stats.incrementLoss();
    stats.reset();
    expect(stats.win).toBe(0);
    expect(stats.loss).toBe(0);
  });
});

import { generateGuess, getItem } from "./utils.ts";

import { expect, test, describe } from "vitest";

const collection = ["Alex", "Peter", "John"];

describe("utils module", () => {
  test("fetch random item from array", () => {
    const item = getItem(collection);
    expect(item).toBeDefined();
  });
  test("fetch random item from empty array", () => {
    const item = getItem([]);
    expect(item).toBeUndefined();
  });
});

describe("random number generation", () => {
  test("generateGuess returns number between 0 and 100", () => {
    const guess = generateGuess();
    expect(guess).toBeGreaterThanOrEqual(0);
    expect(guess).toBeLessThanOrEqual(100);
  });
});

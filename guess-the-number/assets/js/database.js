import { PGlite } from "@electric-sql/pglite";
import { v4 as uuidv4 } from "uuid";



export class Database {
  __db =  new PGlite("idb://guess-it-game");;

  #sanitizeId(id) {
    if (typeof id !== "string" || !/^[a-zA-Z0-9-]{1,36}$/.test(id))
      throw new Error(`Invalid id: ${id}`);
    return id;
  }

  #sanitizeName(name) {
    if (
      typeof name !== "string" ||
      name.trim().length === 0 ||
      name.length > 100
    )
      throw new Error(`Invalid name: ${name}`);
    return name.trim();
  }

  #sanitizeInt(value, field) {
    const n = Number(value);
    if (!Number.isInteger(n) || n < 0)
      throw new Error(`Invalid ${field}: ${value}`);
    return n;
  }

  #sanitizeAmount(value) {
    const n = Number(value);
    if (!Number.isFinite(n) || n < 0)
      throw new Error(`Invalid amount: ${value}`);
    return parseFloat(n.toFixed(2));
  }

  async init() {
    await this.__db.exec(
      `CREATE TABLE IF NOT EXISTS players (id CHAR(36) PRIMARY KEY, name VARCHAR UNIQUE NOT NULL, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP);

      CREATE TABLE IF NOT EXISTS scoreboard (
        id CHAR(36) PRIMARY KEY,
        player_id CHAR(36) NOT NULL REFERENCES players(id) ON DELETE CASCADE,
        win INTEGER NOT NULL DEFAULT 0,
        loss INTEGER NOT NULL DEFAULT 0,
        current_amount NUMERIC(10, 2) NOT NULL DEFAULT 100.00,
        created_at TIMESTAMP DEFAULT NOW()
      );
      `,
    );
  }

  async createPlayer(name) {
    const id = uuidv4();
    await this.__db.query(
      `INSERT INTO players (id, name) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING`,
      [this.#sanitizeId(id), this.#sanitizeName(name)],
    );
  }

  async getPlayer(name) {
    const result = await this.__db.query(
      `SELECT * FROM players WHERE name = $1`,
      [this.#sanitizeName(name)],
    );
    return result.rows[0] ?? null;
  }

  async saveScore(id, playerId, win, loss, currentAmount) {
    await this.__db.query(
      `INSERT INTO scoreboard (id, player_id, win, loss, current_amount) VALUES ($1, $2, $3, $4, $5)`,
      [
        this.#sanitizeId(id),
        this.#sanitizeId(playerId),
        this.#sanitizeInt(win, "win"),
        this.#sanitizeInt(loss, "loss"),
        this.#sanitizeAmount(currentAmount),
      ],
    );
  }

  async getPlayerScores(playerId) {
    const result = await this.__db.query(
      `SELECT * FROM scoreboard WHERE player_id = $1 ORDER BY created_at DESC`,
      [this.#sanitizeId(playerId)],
    );
    return result.rows;
  }

  async getTopFive() {
    const result = await this.__db.query(
      `SELECT p.name, s.win, s.loss, s.current_amount, s.created_at
       FROM scoreboard s
       JOIN players p ON p.id = s.player_id
       ORDER BY s.current_amount DESC, s.win DESC
       LIMIT 5`,
    );
    return result.rows;
  }

  async getLatestScore(playerId) {
    const result = await this.__db.query(
      `SELECT * FROM scoreboard WHERE player_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [this.#sanitizeId(playerId)],
    );
    return result.rows[0] ?? null;
  }
}

export const db = new Database();
export const dbReady = db.init();

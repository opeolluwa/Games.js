import { Player } from "./player";
import { Stats } from "./stats";
import { Collection } from "@signal/core";
import createLocalStorageAdapter from "@signal/localstorage";

export class Database {
  private readonly PLAYER_DOC_TYPE = "player";
  private playersCollection: Collection<any>;

  constructor() {
    this.playersCollection = new Collection({
      name: this.PLAYER_DOC_TYPE,
      persistence: createLocalStorageAdapter(this.PLAYER_DOC_TYPE),
    });
  }

  /** Save or update a player */
  savePlayer(player: Player): void {
    const info = player.getInformation();
    this.playersCollection.insert(info);
  }

  /** Get player by identifier */
  getPlayer(identifier: string): Player | null {
    const doc = this.playersCollection.findOne({ identifier });
    return doc ? this.toPlayer(doc) : null;
  }

  /** Find player by name (case-insensitive) */
  findPlayerByName(name: string): Player | null {
    const results = this.playersCollection.find({
      where: (doc: any) => doc.name === name.toLowerCase(),
      limit: 1,
    });

    if (!results || results.length === 0) return null;
    return this.toPlayer(results[0]);
  }

  /** Get all players */
  getAllPlayers(): Player[] {
    const docs = this.playersCollection.find({});
    return docs.map((doc: any) => this.toPlayer(doc));
  }

  /** Internal: convert stored doc → Player instance */
  private toPlayer(doc: any): Player {
    const player = new Player(doc.name);
    const stats = new Stats();

    for (let i = 0; i < (doc.stats?.winCount || 0); i++) stats.incrementWin();
    for (let i = 0; i < (doc.stats?.lossCount || 0); i++) stats.incrementLoss();

    player.setStats(stats);
    (player as any).identifier = doc._id || doc.identifier;

    return player;
  }
}

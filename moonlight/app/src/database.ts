import PouchDB from "pouchdb-browser";

import PouchFind from "pouchdb-find";
import { Player } from "./player";
import { Stats } from "./stats";

PouchDB.plugin(PouchFind);
export const appDatabase = new PouchDB("moonlight");

export class Database {
  private db: PouchDB.Database = new PouchDB("moonlight");

  constructor() {
    this.db = new PouchDB("moonlight");
    
  }

  private async createIndexes() {
    await this.db.createIndex({
      index: { fields: ["name"] },
    });
  }

  async savePlayer(player: Player): Promise<void> {
    const info = player.getInformation();

    const doc = {
      _id: info.identifier,
      name: info.name.toLowerCase(),
      stats: {
        winCount: info.stats["win"],
        lossCount: info.stats["loss"],
      },
    };

    this.db.put(doc).then(() => {
      console.log(`💾 Saved player data for ${info.name}`);
    });
  }

  async getPlayer(identifier: string): Promise<Player | null> {
    try {
      const doc: any = await this.db.get(identifier);
      return this.toPlayer(doc);
    } catch {
      return null;
    }
  }

  async findPlayerByName(name: string): Promise<Player | null> {
    const result = await this.db.find({
      selector: { name: name.toLowerCase() },
      limit: 1,
    });

    const doc = result.docs[0];
    return doc ? this.toPlayer(doc) : null;
  }

  async getAllPlayers(): Promise<Player[]> {
    const result = await this.db.allDocs({ include_docs: true });
    return result.rows
      .filter((r) => r.doc)
      .map((r) => this.toPlayer(r.doc as any));
  }

  private toPlayer(doc: any): Player {
    const player = new Player(doc.name);
    const stats = new Stats();
    for (let i = 0; i < (doc.stats?.winCount || 0); i++) stats.incrementWin();
    for (let i = 0; i < (doc.stats?.lossCount || 0); i++) stats.incrementLoss();
    player.setStats(stats);
    (player as any).identifier = doc._id;
    return player;
  }
}

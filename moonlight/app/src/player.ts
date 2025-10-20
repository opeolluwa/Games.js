import { ulid } from "ulid";
import { Stats } from "./stats";

export class Player {
  private name: string;
  private identifier: string;
  private stats: Stats;

  constructor(name: string) {
    this.identifier = ulid();
    this.name = name;
    this.stats = new Stats();
  }

  public getName(): string {
    return this.name;
  }

  public setStats(stats: Stats): void {
    this.stats = stats;
  }

  public getInformation(): { name: string; identifier: string; stats: Stats } {
    return {
      name: this.name,
      identifier: this.identifier,
      stats: this.stats,
    };
  }
}

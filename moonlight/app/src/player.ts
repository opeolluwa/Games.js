import { ulid } from "ulid";
import { Stats } from "./stats";

export class Player {
  private readonly name: string;
  private readonly identifier: string;
  private stats: Stats;

  constructor(name: string, identifier?: string, stats?: Stats) {
    this.identifier = identifier ?? ulid(); // preserve ID if provided
    this.name = name;
    this.stats = stats ?? new Stats(); // reuse existing stats if given
  }

  public getName(): string {
    return this.name;
  }

  public getId(): string {
    return this.identifier;
  }

  public setStats(stats: Stats): void {
    this.stats = stats;
  }

  public get getStats(): Stats {
    return this.stats;
  }

  public getInformation(): {
    name: string;
    identifier: string;
    stats: Stats;
  } {
    return {
      name: this.name,
      identifier: this.identifier,
      stats: this.stats,
    };
  }
}

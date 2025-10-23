export class Stats {
  private winCount: number = 0;
  private lossCount: number = 0;

  public get win(): number {
    return this.winCount;
  }

  public setWin(win: number) {
    this.winCount = win;
  }

  public get loss(): number {
    return this.lossCount;
  }

  public incrementWin(): void {
    this.winCount++;
  }

  public decrementWin(): void {
    if (this.winCount > 0) this.winCount--;
  }

  public incrementLoss(): void {
    this.lossCount++;
  }

  public decrementLoss(): void {
    if (this.lossCount > 0) this.lossCount--;
  }

  public reset(): void {
    this.winCount = 0;
    this.lossCount = 0;
  }
}

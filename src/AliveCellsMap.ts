import { areSigned64bitCoords } from "./numberUtils";

type XCoord = bigint;
type YCoord = bigint;

export enum CellState {
    "PendingLife" = 1,
    "Alive" = 2,
    "PendingDeath" = 3
}

export class AliveCellsMap {
    public readonly xCoordMap = new Map<XCoord, Map<YCoord, CellState>>();

    private readonly emptyYCoords = new Map<YCoord, CellState>().keys();

    public delete(xCoord: XCoord, yCoord: YCoord): AliveCellsMap {
        const yCoordMap = this.xCoordMap.get(xCoord);

        if (yCoordMap) {
            yCoordMap.delete(yCoord);

            if (yCoordMap.size === 0) {
                this.xCoordMap.delete(xCoord);
            }
        }

        return this;
    }

    public forEach(fn: (xCoord: XCoord, yCoord: YCoord) => void): AliveCellsMap {
        for (const xCoord of this.xCoords()) {
            for (const yCoord of this.yCoords(xCoord)) {
                fn(xCoord, yCoord);
            }
        }

        return this;
    }

    public get(xCoord: XCoord, yCoord: YCoord): CellState | undefined {
        return this.xCoordMap.get(xCoord)?.get(yCoord);
    }

    public has(xCoord: XCoord, yCoord: YCoord): boolean {
        return this.get(xCoord, yCoord) !== undefined;
    }

    public isAlive(xCoord: XCoord, yCoord: YCoord): boolean {
        const state = this.get(xCoord, yCoord);

        return state === CellState.Alive || state === CellState.PendingDeath;
    }

    public isDead(xCoord: XCoord, yCoord: YCoord): boolean {
        const state = this.get(xCoord, yCoord);

        return state === undefined || state === CellState.PendingLife;
    }

    public set(xCoord: XCoord, yCoord: YCoord, cellState: CellState): AliveCellsMap {
        if (areSigned64bitCoords(xCoord, yCoord)) {
            const yCoordMap = this.xCoordMap.get(xCoord) ?? new Map<YCoord, CellState>();

            this.xCoordMap.set(xCoord, yCoordMap.set(yCoord, cellState));
        }

        return this;
    }

    public xCoords(): IterableIterator<XCoord> {
        return this.xCoordMap.keys();
    }

    public yCoords(xCoord: XCoord): IterableIterator<YCoord> {
        return this.xCoordMap.get(xCoord)?.keys() ?? this.emptyYCoords;
    }
}

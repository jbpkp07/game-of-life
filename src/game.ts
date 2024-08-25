import { AliveCellsMap, CellState } from "./AliveCellsMap";

type XCoord = bigint;
type YCoord = bigint;

export function nextIteration(aliveCells: AliveCellsMap): void {
    markCellsforNextIteration(aliveCells);
    completeNextIteration(aliveCells);
}

function markCellsforNextIteration(aliveCells: AliveCellsMap): void {
    aliveCells.forEach((xCoord, yCoord) => {
        if (aliveCells.isAlive(xCoord, yCoord)) {
            const sum = getNeighborhoodCellSum(aliveCells, xCoord, yCoord);

            if (sum !== 3 && sum !== 4) {
                aliveCells.set(xCoord, yCoord, CellState.PendingDeath);
            }

            searchNeighborCellsForNewLife(aliveCells, xCoord, yCoord);
        }
    });
}

function completeNextIteration(aliveCells: AliveCellsMap): void {
    aliveCells.forEach((xCoord, yCoord) => {
        const state = aliveCells.get(xCoord, yCoord);

        if (state === CellState.PendingLife) {
            aliveCells.set(xCoord, yCoord, CellState.Alive);
        } else if (state === CellState.PendingDeath) {
            aliveCells.delete(xCoord, yCoord);
        }
    });
}

function searchNeighborCellsForNewLife(aliveCells: AliveCellsMap, xCoord: XCoord, yCoord: YCoord): void {
    checkCellForNewLife(aliveCells, xCoord - 1n, yCoord + 1n);
    checkCellForNewLife(aliveCells, xCoord + 0n, yCoord + 1n);
    checkCellForNewLife(aliveCells, xCoord + 1n, yCoord + 1n);

    checkCellForNewLife(aliveCells, xCoord - 1n, yCoord + 0n);
    checkCellForNewLife(aliveCells, xCoord + 1n, yCoord + 0n);

    checkCellForNewLife(aliveCells, xCoord - 1n, yCoord - 1n);
    checkCellForNewLife(aliveCells, xCoord + 0n, yCoord - 1n);
    checkCellForNewLife(aliveCells, xCoord + 1n, yCoord - 1n);
}

function checkCellForNewLife(aliveCells: AliveCellsMap, xCoord: XCoord, yCoord: YCoord): void {
    if (!aliveCells.has(xCoord, yCoord)) {
        const sum = getNeighborhoodCellSum(aliveCells, xCoord, yCoord);

        if (sum === 3) {
            aliveCells.set(xCoord, yCoord, CellState.PendingLife);
        }
    }
}

function getNeighborhoodCellSum(aliveCells: AliveCellsMap, xCoord: XCoord, yCoord: YCoord): number {
    return (
        Number(aliveCells.isAlive(xCoord - 1n, yCoord + 1n)) +
        Number(aliveCells.isAlive(xCoord + 0n, yCoord + 1n)) +
        Number(aliveCells.isAlive(xCoord + 1n, yCoord + 1n)) +
        Number(aliveCells.isAlive(xCoord - 1n, yCoord + 0n)) +
        Number(aliveCells.isAlive(xCoord + 0n, yCoord + 0n)) +
        Number(aliveCells.isAlive(xCoord + 1n, yCoord + 0n)) +
        Number(aliveCells.isAlive(xCoord - 1n, yCoord - 1n)) +
        Number(aliveCells.isAlive(xCoord + 0n, yCoord - 1n)) +
        Number(aliveCells.isAlive(xCoord + 1n, yCoord - 1n))
    );
}

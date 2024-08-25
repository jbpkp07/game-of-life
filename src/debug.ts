import { AliveCellsMap } from "./AliveCellsMap";
import { logToConsole } from "./standardIO";

const BOARD_SIZE = 40;

export function printGameIterationDEBUG(aliveCells: AliveCellsMap, iteration: string) {
    const board = new Array(BOARD_SIZE).fill(".").map(() => new Array<string>(BOARD_SIZE).fill("."));

    aliveCells.forEach((xCoord, yCoord) => {
        const axisShift = BOARD_SIZE / 2 - 1;
        const row = board[axisShift - Number(yCoord)] as string[];

        row[Number(xCoord) + axisShift] = "0";
    });

    logToConsole("Iteration:", iteration);

    for (const row of board) {
        let rowChars = "";

        for (const cell of row) {
            rowChars += cell + " ";
        }

        logToConsole(rowChars);
    }

    logToConsole("\n");
}

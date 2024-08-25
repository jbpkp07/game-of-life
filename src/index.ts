// import { printGameIterationDEBUG } from "./debug";
import { nextIteration } from "./game";
import { toAliveCellsMapV106, toStdoutLifeFileV106 } from "./lifeFileUtils";
import { logToConsole, readStdinFileLines } from "./standardIO";

const GAME_ITERATIONS = 10;

async function app() {
    logToConsole("Reading stdin...\n");
    const fileLines = await readStdinFileLines();

    logToConsole("Parsing Life File v1.06...\n");
    const aliveCells = toAliveCellsMapV106(fileLines);

    logToConsole("Starting Conway's Game Of Life...\n");

    // printGameIterationDEBUG:  Only supports a 40x40 board for sanity checking with seeds close to (0, 0)
    // printGameIterationDEBUG(aliveCells, "Initial Seed");

    for (let i = 1; i <= GAME_ITERATIONS; i++) {
        nextIteration(aliveCells);

        // printGameIterationDEBUG(aliveCells, String(i));
    }

    toStdoutLifeFileV106(aliveCells);

    logToConsole(`${GAME_ITERATIONS} iterations completed...Done!\n`);
}

async function runApp() {
    try {
        await app();
    } catch (error) {
        logToConsole(error);
    }
}

void runApp();

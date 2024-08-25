import { AliveCellsMap, CellState } from "./AliveCellsMap";
import { writeToStdout } from "./standardIO";

type Validation = {
    isValid: boolean;
    message?: string;
};

export function toStdoutLifeFileV106(aliveCells: AliveCellsMap): void {
    writeToStdout("#Life 1.06");

    aliveCells.forEach((xCoord, yCoord) => writeToStdout(`\n${xCoord} ${yCoord}`));
}

export function toAliveCellsMapV106(fileLines: string[]): AliveCellsMap {
    const { isValid, message } = validateLifeFileV106(fileLines);

    if (!isValid) {
        throw new Error(message);
    }

    return toAliveCellsMap(fileLines);
}

function toAliveCellsMap(fileLines: string[]): AliveCellsMap {
    const aliveCells = new AliveCellsMap();

    fileLines.shift();

    while (fileLines.length > 0) {
        const xyCoordLine = fileLines.shift() as string;
        const [xCoord, yCoord] = xyCoordLine.split(" ").map(BigInt) as [bigint, bigint];

        aliveCells.set(xCoord, yCoord, CellState.Alive);
    }

    return aliveCells;
}

function validateLifeFileV106(fileLines: string[]): Validation {
    const headerValidation = validateHeaderV106(fileLines[0]);

    if (!headerValidation.isValid) {
        return headerValidation;
    }

    return validateCoordsV106(fileLines);
}

function validateHeaderV106(headerLine?: string): Validation {
    if (headerLine !== "#Life 1.06") {
        return {
            isValid: false,
            message: "Life file validation (line 1):  Incorrect header line, must be '#Life 1.06'"
        };
    }

    return { isValid: true };
}

function validateCoordsV106(fileLines: string[]): Validation {
    const xyCoordLineFormat = /^-?[0-9]+ -?[0-9]+$/;

    for (let i = 1; i < fileLines.length; i++) {
        const xyCoordLine = fileLines[i] as string;

        if (!xyCoordLineFormat.test(xyCoordLine)) {
            return {
                isValid: false,
                message: `Life file validation (line ${i + 1}):  Incorrect XY coordinate line, must match '<int> <int>'`
            };
        }
    }

    return { isValid: true };
}

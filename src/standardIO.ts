import { once } from "events";
import { createInterface } from "readline";

export function logToConsole(...message: unknown[]): void {
    const { stdout, stderr } = process;

    if (stdout.isTTY) {
        console.log(...message);
    } else if (stderr.isTTY) {
        (stdout.fd as 1 | 2) = 2; // stderr file descriptor
        console.log(...message);
        (stdout.fd as 1 | 2) = 1; // stdout file descriptor
    } else {
        console.log("Unable to log to console, no TTY file descriptors available");
    }
}

export async function readStdinFileLines(): Promise<string[]> {
    const fileLines: string[] = [];
    const stdinLineReader = createInterface({ input: process.stdin });

    stdinLineReader.on("line", (line) => fileLines.push(line));

    await once(stdinLineReader, "close");

    return fileLines;
}

export function writeToStdout(message: string): void {
    process.stdout.write(message);
}

type XCoord = bigint;
type YCoord = bigint;

const MIN_SIGNED_64BIT_INTEGER = -9223372036854775808n;
const MAX_SIGNED_64BIT_INTEGER = 9223372036854775807n;

export function areSigned64bitCoords(xCoord: XCoord, yCoord: YCoord): boolean {
    return isSigned64bitInteger(xCoord) && isSigned64bitInteger(yCoord);
}

function isSigned64bitInteger(int: bigint): boolean {
    return int >= MIN_SIGNED_64BIT_INTEGER && int <= MAX_SIGNED_64BIT_INTEGER;
}

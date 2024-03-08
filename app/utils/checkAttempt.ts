import { Cell } from './types';

function rowSafe(grid: number[][], num: number, position: Cell) {
    return !(grid[position.row].indexOf(num) > -1);
}

function columnSafe(grid: number[][], num: number, position: Cell) {
    for (let row = 0; row < grid.length; row += 1) {
        if (grid[row][position.column] === num) return false;
    }
    return true;
}

function unitSafe(grid: number[][], num: number, position: Cell, gridUnitSize: number) {
    const startingRow = position.row - (position.row % gridUnitSize);
    const startingCol = position.column - (position.column % gridUnitSize);

    for (let row = 0; row < gridUnitSize; row += 1) {
        for (let col = 0; col < gridUnitSize; col += 1) {
            if (grid[startingRow + row][startingCol + col] === num) return false;
        }
    }
    return true;
}

export function safeToPlace(grid: number[][], num: number, position: Cell, gridUnitSize: number) {
    return rowSafe(grid, num, position)
    && columnSafe(grid, num, position)
    && unitSafe(grid, num, position, gridUnitSize);
}

export function convertGridFormat(grid: number[][], gridSize: number, gridUnitSize: number) {
    const converted = [];
    for (let i = 0; i < gridSize; i += gridUnitSize) {
        for (let j = 0; j < gridSize; j += gridUnitSize) {
            const unit = [];
            for (let m = i; m < i + gridUnitSize; m += 1) {
                for (let n = j; n < j + gridUnitSize; n += 1) {
                    unit.push(grid[m][n]);
                }
            }
            converted.push(unit);
        }
    }
    return converted;
}

export function getCellPositionToCheck(
    unitIndex: number,
    cellIndex: number,
    gridSize: number,
    gridUnitSize: number,
) {
    for (let i = 0; i < gridSize; i += gridUnitSize) {
        for (let j = 0; j < gridSize; j += gridUnitSize) {
            for (let m = i; m < i + gridUnitSize; m += 1) {
                for (let n = j; n < j + gridUnitSize; n += 1) {
                    if (m === unitIndex && n === cellIndex) {
                        return [i + (j / gridUnitSize),
                            (m % gridUnitSize) * gridUnitSize + (n % gridUnitSize)];
                    }
                }
            }
        }
    }
    // use [0,0] as fallback for now;
    return [0, 0];
}

import { Cell } from '../utils/types';
import { safeToPlace } from '../utils/checkAttempt';

export default class GridBuilder {
    // eslint-disable-next-line no-use-before-define
    private static instance: GridBuilder;

    private gridInProgress: number[][];

    private removedCells: Cell[] = [];

    validNumbers: number[];

    playableGrid: number[][] = [];

    completeGrid: number[][] = [];

    gridSize: number;

    gridUnitSize: number;

    private constructor(size: number = 9) {
        this.gridInProgress = Array.from({ length: size }, () => Array(size).fill(0));
        this.gridSize = size;
        this.gridUnitSize = Math.sqrt(size);
        this.validNumbers = Array.from({ length: size }, (_, index) => index + 1);
    }

    public static getInstance(): GridBuilder {
        if (!GridBuilder.instance) {
            GridBuilder.instance = new GridBuilder();
            GridBuilder.instance.buildNewGrid('medium');
        }

        return GridBuilder.instance;
    }

    private nextEmptyCell(): Cell | undefined {
        for (let row = 0; row < this.gridSize; row += 1) {
            for (let column = 0; column < this.gridSize; column += 1) {
                if (this.gridInProgress[row][column] === 0) {
                    return {
                        row,
                        column,
                    };
                }
            }
        }
        return undefined;
    }

    static shuffle <T>(array: T[]) {
        if (array.length < 2) return [...array];
        const shuffled = [...array];
        for (let i = 0; i < shuffled.length; i += 1) {
            const randomIndex = Math.floor(Math.random() * (shuffled.length - i) + i);
            [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
        }
        return shuffled;
    }

    private getRandomCell(): Cell {
        const randomRow = Math.floor(Math.random() * this.gridSize);
        const randomCol = Math.floor(Math.random() * this.gridSize);
        if (this.playableGrid[randomRow][randomCol] !== 0) {
            return {
                row: randomRow,
                column: randomCol,
                value: this.playableGrid[randomRow][randomCol],
            };
        }
        return this.getRandomCell();
    }

    private hasOneSolution(iterations: number) {
        const uniqueGrids = new Set();
        uniqueGrids.add(this.completeGrid.join());
        for (let check = 0; check < iterations; check += 1) {
            this.gridInProgress = this.playableGrid.map((row) => row.slice());
            this.generate();
            uniqueGrids.add(this.gridInProgress.join());
        }
        return uniqueGrids.size === 1;
    }

    private generate(): boolean {
        const nextCell = this.nextEmptyCell();

        if (nextCell != null) {
            const shuffled = GridBuilder.shuffle(this.validNumbers);

            for (let i = 0; i < shuffled.length; i += 1) {
                if (safeToPlace(this.gridInProgress, shuffled[i], nextCell, this.gridUnitSize)) {
                    this.gridInProgress[nextCell.row][nextCell.column] = shuffled[i];
                    const gridCompleted = this.generate();
                    if (gridCompleted === false) {
                        this.gridInProgress[nextCell.row][nextCell.column] = 0;
                    } else {
                        return true;
                    }
                }
            }
            return false;
        }
        return true;
    }

    private resetGrid(size: number) {
        this.gridInProgress = Array.from({ length: size }, () => Array(size).fill(0));
        this.gridSize = size;
        this.gridUnitSize = Math.sqrt(size);
        this.validNumbers = Array.from({ length: size }, (_, index) => index + 1);
        this.playableGrid = [];
        this.completeGrid = [];
        this.removedCells = [];
    }

    private addDifficulty(difficulty: 'easy' | 'medium' | 'hard') {
        const levelMap: Record<number, Record<string, number>> = {
            4: {
                easy: 4,
                medium: 6,
                hard: 8,
            },
            9: {
                easy: 30,
                medium: 40,
                hard: 50,
            },
        };

        while (this.removedCells.length < levelMap[this.gridSize][difficulty]) {
            const cellToRemove = this.getRandomCell();
            this.removedCells.push(cellToRemove);
            this.playableGrid[cellToRemove.row][cellToRemove.column] = 0;
            if (!this.hasOneSolution(this.removedCells.length)) {
                this.playableGrid[cellToRemove.row][cellToRemove.column] = cellToRemove.value ?? 0;
                this.removedCells.pop();
            }
        }
    }

    public buildNewGrid(difficulty: 'easy' | 'medium' | 'hard', size: number = 9): void {
        this.resetGrid(size);
        this.generate();
        this.playableGrid = this.gridInProgress.map((row) => row.slice());
        this.completeGrid = this.gridInProgress.map((row) => row.slice());

        this.addDifficulty(difficulty);
    }
}

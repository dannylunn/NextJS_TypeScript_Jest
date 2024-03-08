'use client';

// eslint-disable-next-line camelcase
import { Noto_Sans } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import GridComponent from './gridComponent';
import { getCellPositionToCheck } from './utils/checkAttempt';
import { Cell } from './utils/types';
import NumbersComponent from './numbersComponent';

const notoSans = Noto_Sans({ subsets: ['latin'] });
const validKeyboardInputs = ['Backspace', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

type SudokuProps = {
    gridSize: number,
    gridUnitSize: number,
    validNumbers: number[],
    startingGrid: number[][],
    completeGrid: number[][],
}

export default function Sudoku({ props }: { props: SudokuProps }) {
    const {
        gridSize,
        gridUnitSize,
        validNumbers,
        startingGrid,
        completeGrid,
    } = props;
    const [grid, setGrid] = useState<number[][]>(startingGrid);
    const [selectedCell, setSelectedCell] = useState<Cell>({ row: 0, column: 0 });
    const [incorrectCells, setIncorrectCells] = useState<Cell[]>([]);
    const [remainingNumbers, setRemainingNumbers] = useState<number[]>(Array(gridSize + 1).fill(0));
    const [mistakes, setMistakes] = useState<number>(0);

    const routerRef = useRef(useRouter());

    useEffect(() => {
        setGrid(startingGrid);
        setIncorrectCells([]);
        setMistakes(0);
    }, [startingGrid]);

    useEffect(() => {
        const nextRemainingNumbers = Array(gridSize + 1).fill(0);
        for (let unit = 0; unit < gridSize; unit += 1) {
            for (let cell = 0; cell < gridSize; cell += 1) {
                nextRemainingNumbers[grid[unit][cell]] += 1;
            }
        }
        if (nextRemainingNumbers[0] === 0) {
            routerRef.current.push(mistakes === 0 ? '/newGameForm?title=perfect' : '/newGameForm?title=won');
        }
        setRemainingNumbers(nextRemainingNumbers);
    }, [grid, mistakes, routerRef, gridSize]);

    const checkAttempt = (numToCheck: number) => {
        const {
            row,
            column,
            unit,
            unitPosition,
        } = selectedCell;
        if (unit != null && unitPosition != null) {
            const newGrid = grid.map((rowCopy) => rowCopy.slice());
            newGrid[unit][unitPosition] = numToCheck;
            setGrid(newGrid);
            if (numToCheck !== completeGrid[row][column]) {
                if (mistakes >= 3) {
                    routerRef.current.push('/newGameForm?title=lost');
                } else {
                    setIncorrectCells([...incorrectCells, selectedCell]);
                    setMistakes(mistakes + 1);
                }
            }
        }
    };

    const selectCell = (unitIndex: number, cellIndex: number) => {
        const [row, column] = getCellPositionToCheck(unitIndex, cellIndex, gridSize, gridUnitSize);
        setSelectedCell({
            row,
            column,
            unit: unitIndex,
            unitPosition: cellIndex,
        });
    };

    const keyboardInput = (event: KeyboardEvent) => {
        if (validKeyboardInputs.indexOf(event.key) !== -1
        && selectedCell.unit != null
        && selectedCell.unitPosition != null) {
            if (event.key === 'Backspace') {
                const filteredIncorrectCells = incorrectCells.filter((cell) => (
                    cell.unit !== selectedCell.unit
                    && cell.unitPosition !== selectedCell.unitPosition
                ));
                setIncorrectCells(filteredIncorrectCells);
                const newGrid = grid.map((rowCopy) => rowCopy.slice());
                newGrid[selectedCell.unit][selectedCell.unitPosition] = 0;
                setGrid(newGrid);
            } else {
                checkAttempt(parseInt(event.key, 10));
            }
        }
    };

    const getHint = () => {
        if (selectedCell.unit != null && selectedCell.unitPosition != null) {
            const hint = completeGrid[selectedCell.row][selectedCell.column];
            const newGrid = grid.map((rowCopy) => rowCopy.slice());
            newGrid[selectedCell.unit][selectedCell.unitPosition] = hint;
            setGrid(newGrid);
        }
    };

    return (
        <div className={`min-h-screen p-20 font-light ${notoSans.className}`}>
            <header className="h-24 w-full flex items-center justify-center">
                <div className="w-[600px] max-w-full grid grid-cols-3 gap-0">
                    <div className="flex justify-center items-center">
                        <Link
                            href={{
                                pathname: '/newGameForm',
                                query: { title: 'new' },
                            }}
                            className="underline underline-offset-2 text-[2.5vmin] text-zinc-800 dark:text-zinc-400 font-normal"
                        >
                            New Game
                        </Link>
                    </div>
                    <div data-testid="mistakes" className="flex justify-center items-center text-[4vmin] text-zinc-800 dark:text-zinc-400">
                        {mistakes}
                        /3
                    </div>
                    <div className="flex justify-center">
                        <button type="button" onClick={getHint} className="underline underline-offset-2 decoration-1 text-[2.5vmin] text-zinc-800 dark:text-zinc-400">Hint</button>
                    </div>
                </div>
            </header>
            <main className="w-full flex items-center justify-center flex-col">
                <GridComponent
                    grid={grid}
                    startingGrid={startingGrid}
                    gridSize={gridSize}
                    selectedCell={selectedCell}
                    incorrectCells={incorrectCells}
                    selectCellHandler={selectCell}
                    keyboardInputHandler={keyboardInput}
                />
                <NumbersComponent
                    numbers={validNumbers}
                    remainingNumbers={remainingNumbers}
                    gridSize={gridSize}
                    handler={checkAttempt}
                />
            </main>
        </div>
    );
}

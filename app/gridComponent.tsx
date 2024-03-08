'use client';

import { useEffect } from 'react';
import { Cell } from '@/app/utils/types';

type GridProps = {
    startingGrid: number[][],
    grid: number[][],
    gridSize: number,
    selectedCell: Cell,
    incorrectCells: Cell[],
    selectCellHandler: (unitIndex: number, unitPositionIndex: number) => void,
    keyboardInputHandler: (event: KeyboardEvent) => void,
}

export default function GridComponent({
    grid,
    startingGrid,
    gridSize,
    selectedCell,
    incorrectCells,
    selectCellHandler,
    keyboardInputHandler,
}: GridProps) {
    useEffect(() => {
        document.addEventListener('keyup', keyboardInputHandler);
        return () => document.removeEventListener('keyup', keyboardInputHandler);
    }, [keyboardInputHandler]);

    const gridClassVariants: Record<number, string> = {
        4: 'grid-cols-2',
        9: 'grid-cols-3',
    };

    const shouldHighlight = (unitIndex: number, cellIndex: number) => (
        unitIndex === selectedCell.unit && cellIndex === selectedCell.unitPosition);

    const markAsIncorrect = (unitIndex: number, cellIndex: number) => {
        for (let i = 0; i < incorrectCells.length; i += 1) {
            if (unitIndex === incorrectCells[i].unit
                && cellIndex === incorrectCells[i].unitPosition) {
                return true;
            }
        }
        return false;
    };

    return (
        <div className={`w-[600px] max-w-full aspect-square grid ${gridClassVariants[gridSize]} gap-0 outline outline-4 outline-offset-0 outline-slate-800 dark:outline-slate-400`}>
            {grid.map((unit, unitIndex) => (
                /* eslint-disable react/no-array-index-key */
                <div key={unitIndex} className={`w-full aspect-square grid grid-flow-row auto-rows-fr ${gridClassVariants[gridSize]} gap-0 outline outline-2 outline-offset-0 outline-slate-800 dark:outline-slate-400`}>
                    {unit.map((cell, index) => (
                        <button type="button" onClick={() => selectCellHandler(unitIndex, index)} key={index} disabled={startingGrid[unitIndex][index] !== 0} className={`flex items-center justify-center outline outline-1 outline-offset-0 outline-slate-500/50 text-[4vmin] ${markAsIncorrect(unitIndex, index) ? 'text-red-600' : 'text-zinc-800 dark:text-zinc-400'} ${shouldHighlight(unitIndex, index) ? 'bg-slate-400/25' : ''}`} data-testid={`unit${unitIndex}-cell${index}`}>{cell === 0 ? '' : cell}</button>
                    ))}
                </div>
            ))}
        </div>
    );
}

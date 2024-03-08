import { convertGridFormat } from './utils/checkAttempt';
import GridBuilder from './grid/gridBuilder';
import Sudoku from './sudoku';

export default function Page() {
    const gridInstance = GridBuilder.getInstance();
    const startingGrid = {
        gridSize: gridInstance.gridSize,
        gridUnitSize: gridInstance.gridUnitSize,
        validNumbers: gridInstance.validNumbers,
        startingGrid: convertGridFormat(
            gridInstance.playableGrid,
            gridInstance.gridSize,
            gridInstance.gridUnitSize,
        ),
        completeGrid: gridInstance.completeGrid,
    };
    return <Sudoku props={startingGrid} />;
}

type NumbersProps = {
    numbers: number[],
    remainingNumbers: number[],
    gridSize: number,
    handler: (numToCheck: number) => void;
}

export default function NumbersComponent({
    numbers,
    remainingNumbers,
    gridSize,
    handler,
}: NumbersProps) {
    return (
        <div className="h-24 w-[600px] max-w-full flex">
            {numbers.map((num) => (
                <button key={num} type="button" disabled={remainingNumbers[num] >= gridSize} onClick={() => handler(num)} className={`flex grow justify-center items-center text-[4vmin] ${remainingNumbers[num] >= gridSize ? 'text-zinc-200 dark:text-zinc-800 cursor-default' : 'text-zinc-800 dark:text-zinc-400 cursor-pointer'}`} data-testid={`input-${num}`}>{num}</button>
            ))}
        </div>
    );
}

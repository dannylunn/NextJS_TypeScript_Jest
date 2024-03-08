import { ErrorProps } from './utils/types';

export default function ErrorComponent({ error, reset }: ErrorProps) {
    return (
        <div className="relative w-4/5 max-w-lg h-4/5 max-h-72 flex flex-col justify-center items-center border-none rounded-xl bg-neutral-200 dark:bg-neutral-800 p-3 sm:p-12">
            <h1 className="mb-4 text-xl sm:text-2xl font-light text-black dark:text-white text-center">Something went wrong</h1>
            <p className="mb-12 text-xs sm:text-base font-light text-black dark:text-white text-center">{error.digest}</p>
            <button type="button" onClick={() => reset()} className="h-12 px-4 flex justify-center items-center rounded-lg outline outline-2 outline-neutral-600 dark:outline-neutral-400 hover:bg-neutral-300 hover:dark:bg-neutral-600 text-m sm:text-xl text-black dark:text-white cursor-pointer">Try Again</button>
        </div>
    );
}

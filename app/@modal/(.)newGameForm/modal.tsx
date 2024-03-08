'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { createPortal } from 'react-dom';
import createNewGame from '@/app/actions';
import messages from './messages';

export default function Modal() {
    const title = useSearchParams().get('title') ?? 'new';
    const router = useRouter();

    return createPortal(
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/70 flex justify-center items-center z-10">
            <dialog onClose={() => router.back()} className="relative w-4/5 max-w-lg h-4/5 max-h-72 flex flex-col gap-12 justify-center items-center border-none rounded-xl bg-neutral-200 dark:bg-neutral-800 p-3 sm:p-5">
                <button type="button" onClick={() => router.back()} aria-label="Close button" className="absolute top-2.5 right-2.5 w-12 h-12 bg-transparent border-none rounded-2xl cursor-pointer flex justify-center items-center text-4xl after:content-['x'] after:text-black after:dark:text-white" />
                <h1 className="text-xl sm:text-3xl font-light text-black dark:text-white text-center">{messages[title]}</h1>
                <form action={createNewGame} className="w-full sm:w-4/5 h-12 flex gap-4 sm:gap-8 text-m sm:text-xl text-black dark:text-white">
                    <input
                        className="grow flex justify-center items-center rounded-lg outline outline-2 outline-green-600 dark:outline-green-400 hover:bg-green-600 hover:dark:bg-green-800 hover:text-white cursor-pointer"
                        type="submit"
                        name="easy"
                        value="Easy"
                    />
                    <input
                        className="grow flex justify-center items-center rounded-lg outline outline-2 outline-orange-600 dark:outline-orange-400 hover:bg-orange-600 hover:dark:bg-orange-800 hover:text-white cursor-pointer"
                        type="submit"
                        name="medium"
                        value="Medium"
                    />
                    <input
                        className="grow flex justify-center items-center rounded-lg outline outline-2 outline-red-600 dark:outline-red-400 hover:bg-red-600 hover:dark:bg-red-800 hover:text-white cursor-pointer"
                        type="submit"
                        name="hard"
                        value="Hard"
                    />
                </form>
            </dialog>
        </div>,
        document.getElementById('modal-root')!,
    );
}

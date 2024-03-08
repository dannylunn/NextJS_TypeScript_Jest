'use client';

// eslint-disable-next-line camelcase
import { Noto_Sans } from 'next/font/google';
import ErrorComponent from './errorComponent';
import { ErrorProps } from './utils/types';

const notoSans = Noto_Sans({ subsets: ['latin'] });

export default function GlobalError({ error, reset }: ErrorProps) {
    return (
        <html lang="en">
            <body className={`absolute w-full h-full flex justify-center items-center font-light ${notoSans.className}`}>
                <ErrorComponent
                    error={error}
                    reset={reset}
                />
            </body>
        </html>
    );
}

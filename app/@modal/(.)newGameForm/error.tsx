'use client';

// eslint-disable-next-line camelcase
import { Noto_Sans } from 'next/font/google';
import ErrorComponent from '@/app/errorComponent';
import { ErrorProps } from '../../utils/types';

const notoSans = Noto_Sans({ subsets: ['latin'] });

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div className={`absolute top-0 bottom-0 left-0 right-0 bg-black/70 flex justify-center items-center z-10 font-light ${notoSans.className}`}>
            <ErrorComponent
                error={error}
                reset={reset}
            />
        </div>
    );
}

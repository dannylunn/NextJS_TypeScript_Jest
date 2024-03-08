'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const apiPath = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://web';

export default async function createNewGame(formData?: FormData) {
    let difficulty: 'easy' | 'medium' | 'hard' = 'medium';
    if (formData != null) {
        if (formData.has('easy')) {
            difficulty = 'easy';
        } else if (formData.has('medium')) {
            difficulty = 'medium';
        } else if (formData.has('hard')) {
            difficulty = 'hard';
        }
    }

    await fetch(`${apiPath}/grid/buildNewGame?difficulty=${difficulty}`);

    revalidatePath('/');
    redirect('/');
}

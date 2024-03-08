/* eslint-disable import/prefer-default-export */
import { type NextRequest, NextResponse } from 'next/server';
import GridBuilder from '@/app/grid/gridBuilder';

export async function GET(request: NextRequest): Promise<NextResponse> {
    const { searchParams } = request.nextUrl;

    try {
        const gridInstance = GridBuilder.getInstance();
        gridInstance.buildNewGrid(
            searchParams.get('difficulty') as 'easy' | 'medium' | 'hard' ?? 'medium',
        );
        return new NextResponse('New game successfully built', { status: 200 });
    } catch (error) {
        return new NextResponse(`Failed to create new game. Error: ${error}`, { status: 400 });
    }
}

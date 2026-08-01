import { NextResponse } from 'next/server';
import { getMovieById } from '@/lib/omdb';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const movie = await getMovieById(id);
    return NextResponse.json({ movie });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}

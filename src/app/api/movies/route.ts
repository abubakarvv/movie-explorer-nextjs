import { NextResponse } from 'next/server';
import { searchMovies } from '@/lib/omdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') ?? 'batman';

  try {
    const result = await searchMovies(query);
    return NextResponse.json({
      movies: result.Search ?? [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}

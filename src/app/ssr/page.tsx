import Link from 'next/link';
import { MovieCard } from '@/components/movie-card';
import { searchMovies } from '@/lib/omdb';

export default async function SSRPage() {
  const result = await searchMovies('batman');
  const movies = result.Search ?? [];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">SSR</p>
            <h1 className="text-3xl font-semibold">Server-Side Rendering Movie Explorer</h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Movies are fetched on the server before the page reaches the browser.
            </p>
          </div>
          <Link href="/" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">
            Back home
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {movies.map((movie: any) => (
            <MovieCard key={movie.imdbID} movie={movie} href={`/ssr/${movie.imdbID}`} />
          ))}
        </div>
      </div>
    </main>
  );
}

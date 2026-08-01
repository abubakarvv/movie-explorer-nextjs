import Link from 'next/link';
import { getMovieById } from '@/lib/omdb';

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function SSRMovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = await params;
  const movie = await getMovieById(id);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <Link href="/ssr" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">
          ← Back to list
        </Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="rounded-3xl bg-slate-100 p-4">
            {movie.Poster && movie.Poster !== 'N/A' ? (
              <img src={movie.Poster} alt={`${movie.Title} poster`} className="h-full w-full rounded-2xl object-cover" />
            ) : (
              <div className="flex h-80 items-center justify-center text-slate-500">No poster available</div>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">SSR detail view</p>
              <h1 className="text-3xl font-semibold">{movie.Title}</h1>
            </div>
            <p className="text-slate-600">{movie.Plot}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Release date</p><p className="font-semibold">{movie.Released}</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Rating</p><p className="font-semibold">{movie.imdbRating}/10</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Director</p><p className="font-semibold">{movie.Director}</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Genre</p><p className="font-semibold">{movie.Genre}</p></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

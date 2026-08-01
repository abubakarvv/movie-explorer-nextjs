'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { MovieDetails } from '@/types/movie';

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CSRMovieDetailPage({ params }: MovieDetailPageProps) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movieId, setMovieId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      const resolvedParams = await params;
      const id = resolvedParams.id;
      if (active) {
        setMovieId(id);
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/movie/${id}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error ?? 'Unable to load movie details.');
        }
        if (active) {
          setMovie(data.movie);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Unexpected error');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [params]);

  if (loading) {
    return <div className="min-h-screen p-10 text-center text-slate-600">Loading movie details...</div>;
  }

  if (error || !movie) {
    return <div className="min-h-screen p-10 text-center text-rose-600">{error ?? 'Movie not found.'}</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <Link href="/csr" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">
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
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">CSR detail view</p>
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

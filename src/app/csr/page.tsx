'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MovieCard } from '@/components/movie-card';
import type { MovieDetails, MovieSummary } from '@/types/movie';

export default function CSRPage() {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [query, setQuery] = useState('batman');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadMovies() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/movies?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('Unable to load movies.');
        }

        const data = await response.json();
        if (active) {
          setMovies(data.movies ?? []);
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

    loadMovies();

    return () => {
      active = false;
    };
  }, [query]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">CSR</p>
            <h1 className="text-3xl font-semibold">Client-Side Rendering Movie Explorer</h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Data appears after the page renders because the browser fetches it with useEffect.
            </p>
          </div>
          <Link href="/" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">
            Back home
          </Link>
        </div>

        <label className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-sm font-medium text-slate-700">Search movies</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try 'spiderman' or 'inception'"
            className="rounded-2xl border border-slate-300 px-4 py-3 outline-none ring-0 focus:border-cyan-500"
          />
        </label>

        {loading && <div className="rounded-3xl bg-white p-8 text-center text-slate-600 shadow-sm">Loading movies...</div>}
        {error && <div className="rounded-3xl bg-rose-50 p-8 text-center text-rose-600 shadow-sm">{error}</div>}

        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} href={`/csr/${movie.imdbID}`} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

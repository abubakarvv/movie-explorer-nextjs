import Link from "next/link";
import type { MovieSummary } from "@/types/movie";

interface MovieCardProps {
  movie: MovieSummary;
  href: string;
}

export function MovieCard({ movie, href }: MovieCardProps) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-[2/3] bg-slate-100">
        {movie.Poster && movie.Poster !== "N/A" ? (
          <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            No poster available
          </div>
        )}
      </div>
      <div className="space-y-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-600">
          {movie.Type}
        </p>
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-cyan-700">
          {movie.Title}
        </h3>
        <p className="text-sm text-slate-600">Released in {movie.Year}</p>
      </div>
    </Link>
  );
}

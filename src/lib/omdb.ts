const OMDB_API_KEY = process.env.OMDB_API_KEY ?? "trilogy";
const OMDB_BASE_URL = "https://www.omdbapi.com/";

async function fetchOmdb(params: Record<string, string>) {
  const query = new URLSearchParams({
    apikey: OMDB_API_KEY,
    ...params,
  });

  const response = await fetch(`${OMDB_BASE_URL}?${query.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("OMDb could not be reached right now.");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "No results were found.");
  }

  return data;
}

export async function searchMovies(query: string) {
  const trimmed = query.trim() || "batman";
  return fetchOmdb({ s: trimmed, type: "movie" });
}

export async function getMovieById(imdbId: string) {
  return fetchOmdb({ i: imdbId });
}

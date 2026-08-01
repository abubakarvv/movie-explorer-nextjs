export interface MovieSummary {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface MovieDetails extends MovieSummary {
  Genre: string;
  Plot: string;
  Director: string;
  Actors: string;
  Runtime: string;
  Released: string;
  imdbRating: string;
  Country: string;
}

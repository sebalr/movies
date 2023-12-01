import { Genre } from 'src/app/movies/types/genre.td';

export interface MovieBasic {
  title: string;
  description: string;
  rating: number;
  duration: string;
  genre: Genre[];
  releasedDate: string;
}

export interface MovieDetail extends MovieBasic {
  trailerLink: string;
}

export interface Bookmarked {
  bookmarked: boolean;
}

export interface MovieBasicBookmarked extends MovieBasic, Bookmarked { }
export interface MovieDetailBookmarked extends MovieDetail, Bookmarked { }

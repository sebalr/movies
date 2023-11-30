import { MovieDetail } from 'src/app/movies/types/movie.interface';

export type SortBy = keyof Pick<MovieDetail, "title" | "releasedDate">

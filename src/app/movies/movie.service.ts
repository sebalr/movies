import { Injectable } from '@angular/core';
import { Observable, map, of, zip } from 'rxjs';
import { BOOKMARKED_MOVIES } from 'src/app/movies/constants/movie.constants';
import { MovieBasic, MovieBasicBookmarked, MovieDetail, MovieDetailBookmarked } from 'src/app/movies/types/movie.interface';
import { SortInformation } from 'src/app/movies/types/sort-information.interface';
import { movies } from 'src/assets/db/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  public getMovies(sort: SortInformation | null): Observable<MovieBasic[]> {
    return of(movies).pipe(map((movies: MovieBasic[]) => sort === null ? movies : this.sortMovies(movies, sort)));
  }

  public getMovie(title: string): Observable<MovieDetailBookmarked | undefined> {
    return zip(this.getBookmarkedMovies(), of(movies)).pipe(
      map(([bookmarked, movies]) => {
        const movie = movies.find(movie => movie.title === title);
        return movie ? { ...movie, bookmarked: bookmarked.includes(movie.title) } : undefined;
      }
      ));
  }

  public getBookmarkedMovies(): Observable<string[]> {
    return of(JSON.parse(localStorage.getItem(BOOKMARKED_MOVIES) ?? '[]'));
  }

  public bookmark(movie: MovieBasic): void {
    const bookmarkedMovies: string[] = JSON.parse(localStorage.getItem(BOOKMARKED_MOVIES) ?? '[]');
    bookmarkedMovies.push(movie.title);

    localStorage.setItem(BOOKMARKED_MOVIES, JSON.stringify(bookmarkedMovies));
  }

  public removeBookmark(movie: MovieBasic): void {
    const bookmarkedMovies: string[] = JSON.parse(localStorage.getItem(BOOKMARKED_MOVIES) ?? '[]');
    bookmarkedMovies.splice(bookmarkedMovies.indexOf(movie.title), 1);

    localStorage.setItem(BOOKMARKED_MOVIES, JSON.stringify(bookmarkedMovies));
  }

  private sortMovies(movies: MovieBasic[], information: SortInformation): MovieBasic[] {
    return [...movies].sort((a, b) => {
      if (information.sortBy === 'title') {
        return information.sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      } else if (information.sortBy === 'releasedDate') {
        return information.sortOrder === 'asc' ? new Date(a.releasedDate).getTime() - new Date(b.releasedDate).getTime() : new Date(b.releasedDate).getTime() - new Date(a.releasedDate).getTime();
      }
      return 0;
    });
  }

}

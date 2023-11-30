import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { MovieBasic, MovieDetail } from 'src/app/movies/types/movie.interface';
import { SortInformation } from 'src/app/movies/types/sort-information.interface';
import { movies } from 'src/assets/db/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  public getMovies(sort: SortInformation | null): Observable<MovieBasic[]> {
    return of(movies).pipe(map((movies: MovieBasic[]) => sort === null ? movies : this.sortMovies(movies, sort)));
  }

  public getMovie(title: string): Observable<MovieDetail | undefined> {
    return of(movies).pipe(map(movies => movies.find(movie => movie.title === title)));
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

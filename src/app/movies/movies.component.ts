import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest, map, startWith, switchMap } from 'rxjs';
import { MovieBasicBookmarked } from 'src/app/movies/types/movie.interface';
import { SortInformation } from 'src/app/movies/types/sort-information.interface';
import { MovieService } from 'src/app/movies/movie.service';
import { SortBy } from 'src/app/movies/types/sort-by.td';
import { MovieThumbnailComponent } from 'src/app/movies/movie-thumbnail/movie-thumbnail.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, MovieThumbnailComponent],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public movies$: Observable<MovieBasicBookmarked[]> | undefined;

  private sort$ = new BehaviorSubject<SortInformation | null>(null);

  constructor(private moviesService: MovieService) { }

  public ngOnInit(): void {
    const sorted$ = this.sort$.pipe(switchMap(sortInformation => this.moviesService.getMovies(sortInformation)));
    const bookmarked$ = this.moviesService.getBookmarkedMovies().pipe(startWith([] as string[]));
    this.movies$ = combineLatest([bookmarked$, sorted$])
      .pipe(map(([bookmarked, sorted]) => sorted.map(movie => ({ ...movie, bookmarked: bookmarked.includes(movie.title) }))));
  }

  public sort(sortBy: SortBy): void {
    const current = this.sort$.value;

    const sortOrder = current?.sortBy === sortBy && current?.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sort$.next({ sortBy, sortOrder });
  }

  public bookmark(movie: MovieBasicBookmarked): void {
    this.moviesService.bookmark(movie);
  }

  public removeBookmark(movie: MovieBasicBookmarked): void {
    this.moviesService.removeBookmark(movie);
  }
}

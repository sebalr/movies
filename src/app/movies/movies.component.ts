import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
import { MovieBasic, MovieBasicBookmarked } from 'src/app/movies/types/movie.interface';
import { SortInformation } from 'src/app/movies/types/sort-information.interface';
import { MovieService } from 'src/app/movies/movie.service';
import { SortBy } from 'src/app/movies/types/sort-by.td';
import { MovieThumbnailComponent } from 'src/app/movies/movie-thumbnail/movie-thumbnail.component';
import { SortingComponent } from 'src/app/movies/sorting/sorting.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FiltersComponent } from 'src/app/movies/filters/filters.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    CommonModule,
    FiltersComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MovieThumbnailComponent,
    SortingComponent
  ],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public movies$: Observable<MovieBasicBookmarked[]> | undefined;
  public filterForm = new FormControl<string>('');
  private sort$ = new BehaviorSubject<SortInformation | null>(null);

  private readonly movieHasText = (movie: MovieBasic, text: string) => `${movie.description}${movie.title}`.toLocaleLowerCase()
    .includes(text.toLocaleLowerCase());

  constructor(private moviesService: MovieService) { }

  public ngOnInit(): void {
    this.initSubscriptions();
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

  private initSubscriptions() {
    const filter$ = this.filterForm.valueChanges.pipe(startWith(''), debounceTime(150), distinctUntilChanged());
    const sorted$ = this.sort$.pipe(switchMap(sortInformation => this.moviesService.getMovies(sortInformation)));
    const bookmarked$ = this.moviesService.getBookmarkedMovies().pipe(startWith([] as string[]));
    this.movies$ = combineLatest([bookmarked$, sorted$, filter$])
      .pipe(
        map(([bookmarked, sorted, filterBy]) =>
          sorted
            .filter(movie => this.movieHasText(movie, filterBy ?? ''))
            .map(movie => ({ ...movie, bookmarked: bookmarked.includes(movie.title) }))
        )
      );
  }
}

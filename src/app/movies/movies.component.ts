import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { MovieBasic } from 'src/app/movies/types/movie.interface';
import { SortInformation } from 'src/app/movies/types/sort-information.interface';
import { MovieService } from 'src/app/movies/movie.service';
import { SortBy } from 'src/app/movies/types/sort-by.td';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public movies$: Observable<MovieBasic[]> | undefined;

  private sort$ = new BehaviorSubject<SortInformation | null>(null);

  constructor(private moviesService: MovieService) { }

  public ngOnInit(): void {
    this.movies$ = this.sort$.pipe(switchMap(sortInformation => this.moviesService.getMovies(sortInformation)));
  }

  public sort(sortBy: SortBy): void {
    const current = this.sort$.value;

    const sortOrder = current?.sortBy === sortBy && current?.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sort$.next({ sortBy, sortOrder });
  }
}

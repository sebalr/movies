import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, filter, map, switchMap } from 'rxjs';
import { MovieDetailBookmarked } from 'src/app/movies/types/movie.interface';
import { MovieService } from 'src/app/movies/movie.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatCardModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  public movie$: Observable<MovieDetailBookmarked | undefined> | undefined;

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.movie$ = this.route.params.pipe(filter(params => params['title']),
      map(params => params['title']),
      switchMap(movieTitle => this.movieService.getMovie(movieTitle)));
  }


}

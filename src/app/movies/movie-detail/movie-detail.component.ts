import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Subject, filter, map, switchMap, takeUntil } from 'rxjs';
import { MovieDetailBookmarked } from 'src/app/movies/types/movie.interface';
import { MovieService } from 'src/app/movies/movie.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { BookmarkComponent } from 'src/app/shared/bookmark/bookmark.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage, BookmarkComponent, MatCardModule, YouTubePlayerModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  public movie: MovieDetailBookmarked | undefined;
  public videoId: string | undefined;

  private destroyRef = inject(DestroyRef);

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    const destroyed = new Subject<void>();

    this.destroyRef.onDestroy(() => {
      destroyed.next();
      destroyed.complete();
    });

    this.route.params.pipe(filter(params => params['title']),
      map(params => params['title']),
      switchMap(movieTitle => this.movieService.getMovie(movieTitle)),
      takeUntil(destroyed)
    )
      .subscribe(movie => {
        this.movie = movie;
        const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

        const match = movie?.trailerLink.match(regex);

        if (match) {
          this.videoId = match[1];
        }
      });
  }

  public bookmarkAction(): void {
    if (this.movie) {
      if (this.movie.bookmarked) {
        this.movie.bookmarked = false;
        this.movieService.removeBookmark(this.movie);
      } else {
        this.movie.bookmarked = true;
        this.movieService.bookmark(this.movie);
      }
    }
  }

}

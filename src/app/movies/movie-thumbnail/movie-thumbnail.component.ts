import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieBasicBookmarked } from 'src/app/movies/types/movie.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common'
import { RatingStartComponent } from 'src/app/shared/rating-start/rating-start.component';
import { BookmarkComponent } from 'src/app/shared/bookmark/bookmark.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-thumbnail',
  standalone: true,
  imports: [
    CommonModule,
    BookmarkComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    NgOptimizedImage,
    RatingStartComponent
  ],
  templateUrl: './movie-thumbnail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./movie-thumbnail.component.scss']
})
export class MovieThumbnailComponent {
  @Input({ required: true }) movie!: MovieBasicBookmarked;
  @Output() onBookmarked = new EventEmitter<void>();
  @Output() onBookmarkRemoved = new EventEmitter<void>();

  constructor(private router: Router) { }

  public openDetail(): void {
    this.router.navigate(['/', this.movie.title]);
  }

  public bookmarkAction(): void {
    if (this.movie.bookmarked) {
      this.movie.bookmarked = false;
      this.onBookmarkRemoved.emit();
    } else {
      this.movie.bookmarked = true;
      this.onBookmarked.emit();
    }
  }

}

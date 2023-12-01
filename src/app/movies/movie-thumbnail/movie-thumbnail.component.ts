import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieBasicBookmarked } from 'src/app/movies/types/movie.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-movie-thumbnail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './movie-thumbnail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./movie-thumbnail.component.scss']
})
export class MovieThumbnailComponent {
  @Input({ required: true }) movie!: MovieBasicBookmarked;
  @Output() onBookmarked = new EventEmitter<void>();
  @Output() onBookmarkRemoved = new EventEmitter<void>();

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

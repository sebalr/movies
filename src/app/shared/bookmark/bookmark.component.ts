import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Bookmarked } from 'src/app/movies/types/movie.interface';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent {
  @Input({ required: true }) public movie!: Bookmarked;
  @Output() public bookmarked = new EventEmitter<void>();

  public notBookmakedIcon = 'bookmark';
  public bookmakedIcon = 'bookmark_added';

  public bookmarkAction($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.bookmarked.emit();
  }

  public setBookmarkedIcon(icon: string) {
    this.bookmakedIcon = icon;
  }

  public setNotBookmarkedIcon(icon: string) {
    this.notBookmakedIcon = icon;
  }


}

import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { SortBy } from 'src/app/movies/types/sort-by.td';

@Component({
  selector: 'app-sorting',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule, MatButtonToggleModule, MatSortModule],
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent {
  @Output() public sortChange = new EventEmitter<SortBy>();

  public sort($event: Sort) {
    this.sortChange.emit($event.active as SortBy);
  }

}

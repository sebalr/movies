import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rating-start',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rating-start.component.html',
  styleUrls: ['./rating-start.component.scss']
})
export class RatingStartComponent {
  @Input({ required: true }) rating: number = 0;

}

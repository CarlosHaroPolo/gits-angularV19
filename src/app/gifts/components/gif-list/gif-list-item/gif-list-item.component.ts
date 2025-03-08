import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Gif } from '../../../interfaces/gif.interface';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListItemComponent {
  url= input.required<string>();
}

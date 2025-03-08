import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifsService } from '../../services/gifs.service';
import { GitMapper } from '../../mapper/gif.mapper';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {


  searchGifs=signal<Gif[]>([]);
 service = inject(GifsService);

  onSearch(query:string){
   this.service.searchQueryGifs(query)
   .subscribe(resp=>{
     this.searchGifs.set(resp)
   })
   ;
  }
}

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop'
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
@Component({
  selector: 'app-gifs-history',
  imports: [GifListComponent],
  templateUrl: './gifs-history.component.html',
})
export default class GifsHistoryComponent {
 /*  query=inject(ActivatedRoute).params.subscribe((params)=>{
    console.log(params['query'])
  }) */

    gifService = inject(GifsService);

    query=toSignal(
      inject(ActivatedRoute).params.pipe(
        map(params=>params['query'])
      ) // aca se encuentra todo los parámetros
    )
    gifsByKey=computed(()=>{
    return  this.gifService.getHistoryGifs(this.query());
    })
 }



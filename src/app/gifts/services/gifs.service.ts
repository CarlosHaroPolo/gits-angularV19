import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import type{ giphyResponse } from '../interfaces/giphy.interface';
import type { Gif } from '../interfaces/gif.interface';
import { GitMapper } from '../mapper/gif.mapper';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
 constructor(){
  this.loadTrendingGifs()
 }

  env=environment
  private http = inject(HttpClient)
  trendingGifs=signal<Gif[]>([]);
  trendingGifsLoading= signal(true);
  loadTrendingGifs(){
  /* https://api.giphy.com/v1/gifs/trending?api_key=mklA26Kwjg4JlUyQKiDLocGgRU1vXxQE&limit=1&offset=0&rating=g&bundle=messaging_non_clips */
        //primero va la url ; luego los parámetros
  this.http.get<giphyResponse>(`${this.env.giphyUrl}/gifs/trending`,{
    params:{
      api_key:this.env.giphyApiKey,
      limit:20
    }
  })
  .subscribe(resp=>{
     // estas mandado la data y estas que se encarga de trasformar en el formato que queremos
     // y por ultimo lo guardas en la señal
     let x=GitMapper.mapGiphyItemGifArray(resp.data)
    this.trendingGifs.set(x);
    console.log(x)
    this.trendingGifsLoading.set(false);
  })
  }
}

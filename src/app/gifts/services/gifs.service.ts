import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import type{ giphyResponse } from '../interfaces/giphy.interface';
import type { Gif } from '../interfaces/gif.interface';
import { GitMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

 constructor(){
  this.loadTrendingGifs()
 }

 searchHistory =signal<Record<string,Gif[]>>({});


 searhHistoryKeys=computed(()=>Object.keys(this.searchHistory())) //conforme que se actalice va mostar esto

  env=environment
  private http = inject(HttpClient)
  trendingGifs=signal<Gif[]>([]);
  trendingGifsLoading= signal(true);
  searchGifsLoading=signal(true);

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

  searchQueryGifs(query:string){
   return this.http.get<giphyResponse>(`${this.env.giphyUrl}/gifs/search`,{
      params:{
        api_key:this.env.giphyApiKey,
        limit:20,
        q:query
      }
    }).pipe(
      map(({data})=>data),
      map(resp=>GitMapper.mapGiphyItemGifArray(resp)),
      tap(resp=>{
     this.searchGifsLoading.set(false);
      }),
     tap(items=>{
       this.searchHistory.update(history=>({
      ...history, // ejplo perro:[gif1,gif2,...]
      [query.toLowerCase()]:items,
       }))
     })
      // historial
    )
    /* .subscribe(resp=>{
      // estas mandado la data y estas que se encarga de trasformar en el formato que queremos
      // y por ultimo lo guardas en la señal
      let x=GitMapper.mapGiphyItemGifArray(resp.data)
     this.searchGifs.set(x);
     console.log(x)
   }) */
  }
 getHistoryGifs(query:string):Gif[]{

  return this.searchHistory()[query]??[];
 }
}

import { Gif } from "../interfaces/gif.interface";
import { giphy } from "../interfaces/giphy.interface";

export class GitMapper{

  // creas una funcion estatica
  static mapGiphyItemGif(item:giphy):Gif{
   return{
    id: item.id,
    title: item.title,
    url:item.images.original.url
   }
  }
  static mapGiphyItemGifArray(items:giphy[]):Gif[]{
    // el map se encarga de serializar uno por uno
    return items.map(this.mapGiphyItemGif)
   }
}

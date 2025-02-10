import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifService {

  public gifList: Gif[] = [];
  private apikey = 'XkAovFI7MBT8arc9SoaMR60NPg0GJpCC';
  private _tagsHistory: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs/search';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();

  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    //? Verificamos si el tag ya se encuentra en nuestro array de string
    if (this._tagsHistory.includes(tag)) {
      //? Borramos el tag anterior y filtramos solo los que no tenga el tag
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    //? Insertamos el tag al inicio
    this._tagsHistory.unshift(tag);
    //? Hacemos que solo tenga 10 history
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    //? Con el signo '!' le decimos a ts que siempre vendra una data
    const temporal = JSON.parse(localStorage.getItem('history')!);
    this._tagsHistory = temporal;
    
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', 10)
      .set('q', tag);
    //? El .get() es un 'observable'
    //? En Angular, un observable es una abstracción para manejar flujos de datos asíncronos
    //? Observable: Es un objeto en el cual a lo largo del tiempo, puede estar emitiendo diferentes valores
    this.http.get<SearchResponse>(`${this.serviceUrl}`, { params })
      .subscribe(resp => {
        this.gifList = resp.data;
      })
  }

}

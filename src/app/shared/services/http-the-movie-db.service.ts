import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpTheMovieDBService {

  constructor(private http: HttpClient) { }

  private getParams(name?: string) {
    if (name) {
      name = name.replace(' ', '+');
      return new HttpParams().set('api_key', environment.theMovieDB.apiKey).append('query', name);
    }
    return new HttpParams().set('api_key', environment.theMovieDB.apiKey);
  }

  getMovieByQuery(title: string): Observable<any> {
    // https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
    return this.http.get(environment.theMovieDB.databaseURL + '/search/movie', { params: this.getParams(title) });
  }

  getSeriesByQuery(title: string): Observable<any> {
    // https://api.themoviedb.org/3/search/tvapi_key={api_key}&query=Jack+Reacher
    return this.http.get(environment.theMovieDB.databaseURL + '/search/tv', { params: this.getParams(title) });
  }

  getMovieById(id: string): Observable<any> {
    return this.http.get(environment.theMovieDB.databaseURL + '/movie/' + id, { params: this.getParams() });
  }

  getSeriesById(id: string): Observable<any> {
    return this.http.get(environment.theMovieDB.databaseURL + '/tv/' + id, { params: this.getParams() });
  }

  getPosterURL(path: string): string {
    return environment.theMovieDB.imageDatabaseURL + path;
  }
}

// strzały do bazy: muszą być 3 piewsze litery, zeby był strzał.
// po strzale zapisuję lokalnie wszystkie filmy/seriale ze strzału
// nastpne zapytanie użytkownika będzie najpierw przeszukiwać lokalnią bazę
// a póżniej, jeli nie znajdzie filmu/serialu lokalnie to wykona następny strzał i tak samo w kółko

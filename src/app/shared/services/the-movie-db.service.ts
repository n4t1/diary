import { Injectable } from '@angular/core';
import { HttpTheMovieDBService } from './http-the-movie-db.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDbService {

  private localMovieDbObs = new BehaviorSubject<Array<any>>([]);
  private localSeriesDbObs = new BehaviorSubject<Array<any>>([]);

  constructor(private httpTheMovieDB: HttpTheMovieDBService) { }

  searchMovieDb(titleVal: string) {
    if (titleVal.length > 2) {
      if (this.localMovieDbObs.getValue().length === 0) {
        this.httpTheMovieDB.getMovieByQuery(titleVal).subscribe(val => {
          // console.log('Return value from query, localDb length = 0');
          this.localMovieDbObs.next(val.results);
          // console.log(this.localMovieDbObs.getValue());
        });
      } else if (this.localMovieDbObs.getValue().length > 0 && this.localMovieDbObs.getValue().
        filter(e => e.title !== titleVal)) {
        this.httpTheMovieDB.getMovieByQuery(titleVal).subscribe(val => {
          // console.log('Return value from query, localDb not have title value');
          // this.localMovieDbObs.next(val.results);
        });
      }
      // return this.localMovieDbObs.getValue().filter(e => e.title === titleVal);
      this.localMovieDbObs.subscribe(val => {
        this.localMovieDbObs.next(val.filter(e => e.title === titleVal));
      });
    }
  }

  searchSeriesDb(titleVal: string) {
    if (titleVal.length > 2) {
      this.httpTheMovieDB.getSeriesByQuery(titleVal).subscribe(val => {
        // this.titleResults = val.results;
        // console.log(this.titleResults);
      });
    }
  }

  getPosterURL(posterPath: string) {
    return this.httpTheMovieDB.getPosterURL(posterPath);
  }

  getSeriesById(id: string) {
    this.httpTheMovieDB.getSeriesById(id).subscribe(val => {
      // this.seriesSeasons = val.seasons;
      // console.log('Seasons');
      // console.log(this.seriesSeasons);
    });
  }
}

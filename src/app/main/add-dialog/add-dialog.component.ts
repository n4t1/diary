import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AngularFirestoreService } from '../../shared/services/angular-firestore.service';
import { HttpTheMovieDBService } from '../../shared/services/http-the-movie-db.service';
import { TheMovieDbService } from '../../shared/services/the-movie-db.service';
import { Film } from '../../shared/models/film';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  addForm: FormGroup;
  titleResults: Array<any>;
  seriesSeasons = [];
  seriesSeasonEpisodes = 0;
  seriesSeasonName = '';
  posters: string;
  private itsMovieStat: boolean;
  private addMovieOrSeriesId: string;

  constructor(
    private dialogRef: MatDialogRef<AddDialogComponent>,
    private db: AngularFirestoreService,
    private httpTheMovieDB: HttpTheMovieDBService,
    private theMovieDB: TheMovieDbService
  ) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      status: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      seasons: new FormControl(null, [Validators.required]),
      episodes: new FormControl(null, [Validators.required]),
      // score: new FormControl({value: null}),
    });

    this.getType();
  }

  onSubmit() {
    const film: Film = {
      status: this.addForm.get('status').value,
      type: this.addForm.get('type').value,
      title: this.addForm.get('title').value,
      user_episode: this.addForm.get('episodes').value,
      user_season: this.addForm.get('seasons').value ? this.seriesSeasonName : null,
      film_id: this.addMovieOrSeriesId,
      poster: this.posters,
      episodes: this.seriesSeasonEpisodes
    };
    this.dialogRef.close();
    this.db.addFilm(film);
  }

  private getType() {
    this.addForm.get('type').valueChanges.subscribe(val => {
      this.itsMovieOrSeriesType(val);
    });
  }

  private itsMovieOrSeriesType(type: string) {
    const episodes = this.addForm.get('episodes');
    const seasons = this.addForm.get('seasons');

    if (type === 'movie') {
      episodes.disable();
      episodes.setValue(1);
      seasons.disable();
      seasons.setValue(1);
      this.seriesSeasonEpisodes = 1;

      this.itsMovieStat = true;
    } else {
      episodes.enable();
      episodes.setValue(null);
      seasons.enable();
      seasons.setValue(null);

      this.itsMovieStat = false;
    }
    this.searchMovieAndSeriesByQuery();
  }

  private searchMovieDb(titleVal: string) {
    this.httpTheMovieDB.getMovieByQuery(titleVal).subscribe(val => {
      this.titleResults = val.results;
      console.log(this.titleResults);
    });
    // this.theMovieDB.searchMovieDb(titleVal);
    // console.log('Title results:');
    // console.log(this.titleResults);
  }

  private searchSeriesDb(titleVal: string) {
    this.httpTheMovieDB.getSeriesByQuery(titleVal).subscribe(val => {
      this.titleResults = val.results;
      console.log(this.titleResults);
    });
  }

  searchMovieAndSeriesByQuery() {
    const titleVal: string = this.addForm.get('title').value;
    this.titleResults = [];
    this.seriesSeasons = [];

    if (titleVal) {
      switch (this.itsMovieStat) {
        case true:
          this.searchMovieDb(titleVal);
          break;
        case false:
          this.searchSeriesDb(titleVal);
          break;
      }
    }
  }

  getPosterURL(posterPath: string) {
    return this.httpTheMovieDB.getPosterURL(posterPath);
  }

  getSeriesById() {
    if (!this.itsMovieStat) {
      this.httpTheMovieDB.getSeriesById(this.addMovieOrSeriesId).subscribe(val => {
        this.seriesSeasons = val.seasons;
        console.log('Seasons');
        console.log(this.seriesSeasons);
      });
    }
  }

  getMovieOrSerie(film) {
    this.addMovieOrSeriesId = film.id;
    this.posters = film.poster_path;
    console.log('getID');
    console.log(this.addMovieOrSeriesId);
    this.getSeriesById();
  }

  getSeason(season) {
    console.log('Season');
    console.log(season);
    this.seriesSeasonEpisodes = season.episode_count;
    this.seriesSeasonName = season.name;
  }
}

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { AngularFirestoreService } from '../../../../shared/services/angular-firestore.service';
import { Film } from '../../../../shared/models/film';
import { HttpTheMovieDBService } from '../../../../shared/services/http-the-movie-db.service';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() status: string;
  films: Array<Film>;
  showPoster = false;
  spinner = true;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'poster', 'title', 'type', 'user_episode'];

  constructor(private db: AngularFirestoreService, private httpMovieDB: HttpTheMovieDBService, private dialog: MatDialog) {
    this.spinner = true;
  }

  ngOnInit() {
    this.getFilms();
  }

  getFilms() {
    this.db.getFilms().subscribe(val => {
      if (this.status !== 'all') {
        this.films = val.filter(e => e.status === this.status);
      } else {
        this.films = val;
      }
      this.spinner = false;
    });
  }

  deleteFilm(film: Film): void {
    const title = film.title + ' ' + film.user_season;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: { title: title, id: film.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result.isOK === true) {
        this.db.deleteFilm(result.id);
      }
    });
  }

  addEpisode(id: string) {
    const episode = this.films.find(e => e.id === id);
    episode.user_episode += 1;
    if (episode.user_episode === episode.episodes) {
      episode.status = 'done';
      console.log(episode.status);
    }
    this.db.updateFilm(episode);
  }

  removeEpisode(id: string) {
    const episode = this.films.find(e => e.id === id);
    episode.user_episode -= 1;
    episode.status = 'watch';
    this.db.updateFilm(episode);
  }

  getPosterURL(url: string) {
    return this.httpMovieDB.getPosterURL(url);
  }
}

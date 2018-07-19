import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Film } from '../models/film';
import { AngularFireauthService } from './angular-fireauth.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AngularFirestoreService {

  private filmCollection: AngularFirestoreCollection<Film>;
  private filmDoc: AngularFirestoreDocument<Film>;
  private films: Observable<Film[]>;
  private film: Observable<Film>;

  private filmID: string;

  constructor(private db: AngularFirestore, private auth: AngularFireauthService, private snackBar: MatSnackBar) {
   }

  addFilm(film: Film) {
    const id = this.db.createId();
    const user_id = this.auth.user.uid;
    const filmObj: Film = film;
    filmObj.id = id;
    filmObj.user_id = user_id;
    this.filmCollection.doc(id).set(filmObj);
    // console.log('addFilm');
    const snackBarRef = this.snackBar.open('Add ' + filmObj.type + ': ' + filmObj.title, '', {duration: 1000 });
  }

  getFilms() {
    this.filmCollection = this.db.collection<Film>('films', ref => ref.where('user_id', '==', this.auth.user.uid));
    this.films = this.filmCollection.valueChanges();

    return this.films;
  }

  updateFilm(film: Film) {
    this.filmDoc = this.db.doc<Film>('films/' + film.id);
    this.film = this.filmDoc.valueChanges();

    this.filmDoc.update(film);
  }

  deleteFilm(id: string) {
    this.filmDoc = this.db.doc<Film>('films/' + id);
    this.filmDoc.delete();

    console.log('deleteFilm');
  }
}

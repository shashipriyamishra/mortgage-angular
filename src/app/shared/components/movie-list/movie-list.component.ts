import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MovieService } from "../../../core/services/movie.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies = [];
  constructor(private movieService:MovieService,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.movieService.getMovieList().pipe(first()).subscribe(movies => {
      console.log('movie',movies);
      this.movies = movies;
  });
  }

  watch(movie) {
    let localstorage = JSON.parse(localStorage.getItem('currentUser'));
    const userId = localstorage.userId;
    const data = {
      userId: userId,
      movieId: movie.movieId

    }
    this.movieService.watch(data)
        .pipe(first())
        .subscribe(
            data => {
                console.log('moviedata',data)
                let snackBarRef = this.snackBar.open('Watched', 'close', {
                  duration: 3000
                });
            },
            error => {
                
                let snackBarRef = this.snackBar.open('error while watching', 'close', {
                  duration: 3000
                });
            });
}

watched(){
  this.movieService.getMovieList().pipe(first()).subscribe(movies => {
    console.log('movie',movies);
    this.movies = movies;
});
}

}

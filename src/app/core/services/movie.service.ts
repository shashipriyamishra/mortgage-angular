
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http :HttpClient) { }

  getMovieList(): Observable<any>{
    return this.http.get<any>(`http://localhost:8085/movies`);
        
  }
  watched(data){
    return this.http.get<any>(`http://localhost:8085/user${data.userId}/movies` )
  }
  watch(data) {
    return this.http.post<any>(`http://localhost:8085/usermovies`,data )
        .pipe(map(movie => {
           
            console.log('movie',movie)
  
            return movie;
        }));
  }
}

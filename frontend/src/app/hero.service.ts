import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Hero} from "./hero";
import {HEROES} from "./mock-heroes";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import {map,tap, catchError} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  constructor(private messageService: MessageService,
              private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  // TODO: Get data with HttpClient!
  getHero(id: number) {
    const hero = HEROES.find(hero => hero.id === id);
    if (hero) this.log(`fetched Hero id: ${hero.id}`);
    return of(hero);
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`)
  }
}

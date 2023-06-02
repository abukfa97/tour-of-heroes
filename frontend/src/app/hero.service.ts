import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Hero} from "./hero";
import {HEROES} from "./mock-heroes";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  constructor(private messageService: MessageService,
              private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: number) {
    const hero = HEROES.find(hero => hero.id === id);
    if (hero) this.log(`fetched Hero id: ${hero.id}`);
    return of(hero);
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`)
  }
}

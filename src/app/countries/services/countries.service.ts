import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiURL : string = 'https://restcountries.com/v3.1/';

  // inicializamos los arreglo para recuperar la cache o info entre paginas
  public cacheStore: CacheStore = {
    byCapital : {  term: '', countries: [] },
    byCountries : {   term: '', countries: []},
    byRegion : {   region: '', countries: []},
  }


  constructor(private http : HttpClient) {
    this.fromLocalStorage();
  }


  private saveToLocalScorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private fromLocalStorage(){
    if(!localStorage.getItem('cacheStore'))  return;  // sino existe salimos


    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);

  }




  // regresamos null y no un arreglo
  searchCountryByAlphaCode(code : string) : Observable<Country | null>{

    const url : string = `${this.apiURL}/alpha/${code}`;

    //pipe metodo para especificar metodos RxJS
    return this.http.get<Country[]>(url)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null),  // si tiene algo regresamos la primera poscicion o nullo
      catchError(erro => of(null)),
      delay(2002)

    );


  }


  private getCountriesRequest(url: string): Observable<Country[]>{

    return this.http.get<Country[]>(url)
    .pipe(
      catchError(erro => of([])),
      delay(2002)
    );
  }


  searchCapital(term : string) : Observable<Country[]> {

    const url : string = `${this.apiURL}/capital/${term}`;


    return this.getCountriesRequest(url)
    // aqui hacemos el guardado de la cache
    .pipe(
      //tap, cuando venga un nuevo mensaje en este obserbable pasa por el tap lo ejecuta pero no va a influir en nada
      //aqui en tap recuperamos la informacion
      tap( countries => this.cacheStore.byCapital = {  term, countries}),
      tap(() => this.saveToLocalScorage() )
    );


    // //pipe metodo para especificar metodos RxJS
    // return this.http.get<Country[]>(url)
    // .pipe(
    //   catchError(erro => of([])) // el of si encuentra un error regresa un arreglo vacio
    //   // el tap sirve para hacer efectos secundarios cada que pase por aqui podemos hacer algo
    //   // tap( countries => console.log('paso por el tap', countries)),
    //   // map( countries => [] ),  // el operador map transforma la informacion
    //   // tap( countries => console.log('paso por el tap', countries)),

    // );
  }

  searchCountry(term : string) : Observable<Country[]>{


    const url : string = `${this.apiURL}/name/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCountries = {term, countries}),
      tap(() => this.saveToLocalScorage() )
    );

     //pipe metodo para especificar metodos RxJS
    //  return this.http.get<Country[]>(url)
    //  .pipe(
    //    catchError(erro => of([]))
    //  );


  }


  searchRegion(region : Region) : Observable<Country[]>{


    const url : string = `${this.apiURL}/region/${region}`;

    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byRegion = {region, countries}),
      tap(() => this.saveToLocalScorage() )
    );


     //pipe metodo para especificar metodos RxJS
    //  return this.http.get<Country[]>(url)
    //  .pipe(
    //    catchError(erro => of([]))
    //  );
  }

}

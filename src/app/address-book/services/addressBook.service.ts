import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Contact } from '../interfaces/contacts.interface';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {


  private apiURL : string = '127.0.0.1:8000/api/contacts';
  private apiKey = 'ccaf5c9a22e854856d0c5b1b96c81e851bafb288'; // Aquí debes reemplazar con tu clave API


  constructor(private http : HttpClient) {

  }

  private getContact(url: string): Observable<Contact[]>{


    const headers = new HttpHeaders().set('x-api-key', this.apiKey);

    return this.http.get<Contact[]>(url, {headers: headers})
    .pipe(
      catchError(erro => of([])),
      delay(2002)
    );
  }




  getAllContact(term : string) : Observable<Contact[]>{

    const url : string = this.apiURL;

    return this.getContact(url)

  }


}

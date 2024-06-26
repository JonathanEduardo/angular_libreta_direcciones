import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Contact, Datum } from '../interfaces/contacts.interface';
import { ContactDetail, InfoContact } from '../interfaces/contactDetail.interface';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {


  private apiURL: string = 'http://127.0.0.1:8000/api';
  private apiURLDetails: string = 'http://127.0.0.1:8000/api/contacts';
  private apiKey = 'ccaf5c9a22e854856d0c5b1b96c81e851bafb288'; // Aquí debes reemplazar con tu clave API


  constructor(private http : HttpClient) {

  }

  private getContact(url: string): Observable<Contact[]>{


    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.get<Contact[]>(url, { headers: headers })
    .pipe(
      catchError(error => of([])),
      // delay(2000)
    );
  }



  private getDetail(url: string): Observable<ContactDetail>{


    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.get<ContactDetail>(url, { headers: headers })
    .pipe(
     // catchError(error => of()),
      // delay(2000)
    );
  }




  getAllContact(term : string) : Observable<Contact[]>{


    const url : string = `${this.apiURL}/contacts${term}`;
    return this.getContact(url)

  }


  getDetailsContact(id : number) : Observable<ContactDetail>{
    const url : string = `${this.apiURL}/details/${id}`;
    return this.getDetail(url)

  }


  addAddress(id:number, InfoContact: InfoContact, endPoint : string) : Observable <InfoContact> {

    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post<InfoContact>(`${this.apiURL}/${endPoint}`, InfoContact, { headers: headers });
  }

  updateInfo(id:number, InfoContact: InfoContact, endPoint : string) : Observable <InfoContact> {

    console.log("entra al servicio");
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.put<InfoContact>(`${this.apiURL}/${endPoint}/update/${id}`, InfoContact, { headers: headers });
  }

  


  addContact( datosContacto: Datum) : Observable <Datum> {

    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post<Datum>(`${this.apiURL}/contact/add`, datosContacto, { headers: headers });
  }

 

}

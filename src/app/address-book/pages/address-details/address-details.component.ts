import { Component, OnInit } from '@angular/core';
import { AddressBookService } from '../../services/addressBook.service';
import { Contact }  from '../../interfaces/contacts.interface'
@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {


  public contacts :Contact[] =[];

  constructor(private AddressBookService: AddressBookService) { }

  ngOnInit(): void {

    this.getAllContact("na");
  }

  getAllContact(term : string ){

    this.AddressBookService.getAllContact(term)
    .subscribe( contacts => {
        this.contacts = contacts;
    })

    console.log(this.contacts);

  }


}

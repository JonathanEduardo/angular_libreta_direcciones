
import { Component, OnInit } from '@angular/core';
import { AddressBookService } from '../../services/addressBook.service';
import { Contact } from '../../interfaces/contacts.interface';
import { ContactDetail, InfoContact } from '../../interfaces/contactDetail.interface';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {


  public contacts :Contact[] =[];
  public modal : boolean = false;

  public contactDetail : ContactDetail = {
    res: "example",
    data: {
      id: 0,
      name: "",
      created_at: new Date(),
      updated_at: new Date(),
      phone_numbers: [],
      emails: [],
      addresses: []
    }
  };

  // creamos el modelo para utilizarlo en el input
  public newAddres: InfoContact = {id:0, contact_id:0, address:"aver", email:"", phone_number:""};


  title: string = 'esta es mi vida perros';

  constructor(private AddressBookService: AddressBookService) {
  //  this.getAllContact("na");


   }

  ngOnInit(): void {
    this.AddressBookService.getAllContact("term")
    .subscribe( contacts=> {
      this.contacts = contacts;
      console.log(this.contacts[0].data.data  );
      //console.log(this.contacts[0].data  );

    });
  }

  getAllContact(term : string ) : void{

  }

  detailId(id : number){
    this.modal = true;


    this.AddressBookService.getDetailsContact(id)
    .subscribe( detalles=> {
      this.contactDetail = detalles;

      // console.log( this.contactDetail.data.addresses[0].  );
      //console.log(this.contacts[0].data  );

    });


    console.log(this.contactDetail.data.id);

  }

  closeMod(){
    this.modal = false;
  }


  addAddress(): void{



    console.log(this.newAddres.address);
  }





}

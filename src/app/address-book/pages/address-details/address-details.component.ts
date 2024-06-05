
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


  public contacts: Contact[] = [];
  public modal: boolean = true;

  /*
  * Inicializacion de contactoDetail
  ! id en 0 para entendimiento de que esta vacio
  */
  public contactDetail: ContactDetail = {
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

  /*
  * se crea un modelo para utilizarlo en el input
  */
  public newAddres: InfoContact = { contact_id: 0, address: "address", email:"email", phone_number:"(254) 250-8387", created_at: new Date(2024, 4, 30) };
  public tabActual: string = "direcciones";


  swichTab(tabActual : string){
    this.tabActual = tabActual;
  }
  constructor(private AddressBookService: AddressBookService) {
    //  this.getAllContact("na");


  }

  /*
   * Inicializamos el servicio para traer todos los registros de los contactos
   */
  ngOnInit(): void {
    this.AddressBookService.getAllContact("term")
      .subscribe(contacts => {
        this.contacts = contacts;  // obtenemos el resultado de los contactos

        // onsole.log(this.contacts[0].data.data);
        //console.log(this.contacts[0].data  );
      });
  }

  getAllContact(term: string): void {

  }

  /*
  * Extrae detalles de contacto por id
  */
  detailId(id: number) {
    this.modal = true;  // Activamos el modal

    // Nos subcribimos a el evento para extraer  el detalle del contacto por id
    this.AddressBookService.getDetailsContact(id)
      .subscribe(detalles => {
        this.contactDetail = detalles;   // obtenemos el resultado

        // console.log( this.contactDetail.data.addresses[0].  );
        //console.log(this.contacts[0].data  );
      });

    //console.log(this.contactDetail.data.id);

  }

  closeMod() {
    this.modal = false;
  }



  /*
  * ! Metodo para agregar una nueva direccion
  */
  addAddress(): void {

    //extraemo del detalle el id del contacto actual para ingresarlo a la interfaz de la direccion
    this.newAddres.contact_id = this.contactDetail.data.id;
    console.log(this.newAddres);


    this.newAddres.contact_id = this.contactDetail.data.id;
    this.AddressBookService.addAddress(this.newAddres.contact_id, this.newAddres)
      .subscribe(info => {
        // Actualizar lista de address agregandolo a la lista de contactos
        // this.contactDetail.data.addresses.push(this.newAddres);

        //LLamamos la funcion para actualizar registros del contacto seleccionado
        this.detailId(this.newAddres.contact_id);


      }

      )


    //console.log(this.newAddres.address + ' Este es el id del contacto: ' + this.newAddres.contact_id);
  }





}


import { Component, OnInit } from '@angular/core';
import { AddressBookService } from '../../services/addressBook.service';
import { Contact, Datum } from '../../interfaces/contacts.interface';
import { ContactDetail, InfoContact } from '../../interfaces/contactDetail.interface';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {


  public contacts: Contact[] = [];
  public curretPage: number = 0;
  public lastPage: number = 0;
  
  public modal: boolean = false;

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
  public dataInfoContact: InfoContact = { contact_id: 0, address: "address", email:"email", phone_number:"(254) 250-8387", created_at: new Date(2024, 4, 30) };
  public tabActual: string = "addresses"; // En la barra de opciones indica cual esta activa
  public dataContact: Datum = { id:0, name:"Nombre contacto"};  //modelo para agregar un nuevo contacto



  /*
   * funcion para cambiarla tabulacion
   */
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
    this.AddressBookService.getAllContact("")
      .subscribe(contacts => {
        this.contacts = contacts;  // obtenemos el resultado de los contactos
        this.curretPage = this.contacts[0].data.current_page;
        this.lastPage= this.contacts[0].data.last_page;
        // onsole.log(this.contacts[0].data.data);
        console.log(this.contacts[0].data.current_page  );
      });
  }

  getContacts(term: string): void {
    this.AddressBookService.getAllContact("")
    .subscribe(contacts => {
      this.contacts = contacts;  // obtenemos el resultado de los contactos

      // onsole.log(this.contacts[0].data.data);
      //console.log(this.contacts[0].data  );
    });
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
    this.dataInfoContact.contact_id = this.contactDetail.data.id;
    console.log(this.dataInfoContact);


    this.dataInfoContact.contact_id = this.contactDetail.data.id;
    this.AddressBookService.addAddress(this.dataInfoContact.contact_id, this.dataInfoContact, this.tabActual)
      .subscribe(info => {
        // Actualizar lista de address agregandolo a la lista de contactos
        // this.contactDetail.data.addresses.push(this.dataInfoContact);

        //LLamamos la funcion para actualizar registros del contacto seleccionado
        this.detailId(this.dataInfoContact.contact_id);


      }

      )


    //console.log(this.dataInfoContact.address + ' Este es el id del contacto: ' + this.dataInfoContact.contact_id);
  }

  editInfo(infoContact: InfoContact):void{

    // this.dataInfoContact = infoContact;  asi no ya que si bien sirve podria servir para otra cosa ya que es como si apuntaran a la misma informacion

    this.dataInfoContact.id = infoContact.id
    this.dataInfoContact.contact_id = infoContact.contact_id;
    this.dataInfoContact.address = infoContact.address;
    this.dataInfoContact.email = infoContact.email;
    this.dataInfoContact.phone_number = infoContact.phone_number;
    this.dataInfoContact.updated_at = new Date();


    console.log( this.dataInfoContact);
  }

  updateInfo():void{

    this.AddressBookService.updateInfo( this.dataInfoContact.id!,  this.dataInfoContact, this.tabActual)
    .subscribe(info => {

        //LLamamos la funcion para actualizar registros del contacto seleccionado
      this.detailId(this.dataInfoContact.contact_id);
      console.log("creo que se logro");
    });
  }

  addContact(): void {


    console.log(this.dataContact);

    this.AddressBookService.addContact(this.dataContact)
      .subscribe(info => {
        this.ngOnInit();


      }

      )


    //console.log(this.dataInfoContact.address + ' Este es el id del contacto: ' + this.dataInfoContact.contact_id);
  }



  next(goTo:number ) {

    

    if(this.curretPage + goTo >= 0 ){

      console.log(`${this.curretPage} + ${goTo} <= 0 && ${this.curretPage} + ${goTo} <= ${this.lastPage}`);
      this.curretPage = this.curretPage + goTo;
      

      this.AddressBookService.getAllContact("?page=" + this.curretPage)
      .subscribe(contacts => {
        this.contacts = contacts;  // obtenemos el resultado de los contactos
  
        // onsole.log(this.contacts[0].data.data);
        //console.log(this.contacts[0].data  );
      });
      
    }


  }


}

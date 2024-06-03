import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressDetailsComponent } from './pages/address-details/address-details.component';
import { AddressRoutingModule } from './address-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddressDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    // importamos las rutas child
    AddressRoutingModule,
    FormsModule
  ]
})
export class AddressBookModule { }

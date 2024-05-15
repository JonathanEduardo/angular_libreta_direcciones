import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AddressDetailsComponent } from './pages/by-capital-page/by-capital-page.component';
import { AddressDetailsComponent } from './pages/address-details/address-details.component';




const routes :Routes = [
  {
    path: 'address',
    component: AddressDetailsComponent,
  },

  {
    path: '**',
    redirectTo: 'by-address'
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [],
})

export class CountriesRoutingModule { }

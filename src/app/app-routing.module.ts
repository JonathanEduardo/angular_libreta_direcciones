import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactComponent } from './shared/pages/contact/contact.component';

const routes : Routes = [
  // {
  //   path: '',
  //   component: HomePageComponent
  // },

  {
    path: 'about',
    component: AboutPageComponent
  },


  {
    path: 'contact',
    component: ContactComponent
  },


  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule )   //importamos el module principal donde tenemos ya importado el routin module
  },

  {
    path: 'book',
    loadChildren: () => import('./address-book/address-book.module').then( m => m.AddressBookModule )   //importamos el module principal donde tenemos ya importado el routin module
  },


  {
    path: '**',
    redirectTo: 'book'   // ahora lo dirijimos al countries para que me mande aa by capital
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [],
})

export class AppRountingModule { }

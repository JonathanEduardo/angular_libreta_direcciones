import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries : Country [] = [];
  public regions:  Region[] = ['Africa', 'Americas', 'Asia', 'Europa', 'Oceania'] ;  // creamos un tipo para que sea forzado a eso
  public selectedRegion?: Region;

  constructor(private countriesService : CountriesService) { }


  // usaremos el ngOnInit para recuperar la informacion entre cada página
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries; // recuperamos la cache para mantener valores

    this.selectedRegion = this.countriesService.cacheStore.byRegion.region; // recuperamos la cache para mantener valores
  }


  // cambiamos el term a tipo region
  searchByRegion( term : Region ){

    this.selectedRegion = term;
    this.countriesService.searchRegion(term)
    .subscribe(
      countries => {
        this.countries = countries;
      }
    )
  }

}

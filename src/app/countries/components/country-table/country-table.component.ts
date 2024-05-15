import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [
  ]
})
export class CountryTableComponent  {

  @Input() public countries: Country[] = [];

  constructor() { }




}

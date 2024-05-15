import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  @Input() placeholder :string = "";
  @Input() initialValue : string = "";  // RECIBIMOS EL VALOR INICIAL
  @Output()  public onValue = new EventEmitter<string>();  // hacemos output de la funcion que emitiremos esta sera para en click enter
  @Output()  public onDebunce = new EventEmitter<string>();  // hacemos output de la funcion que emitiremos esta sera para el debunce


  private debouncer: Subject<string> = new Subject<string>();
  private denucerSuscription?: Subscription;  // es opcional ya que no siempre lo tendremos

  // en el oninit inicializamos el debunce
  ngOnInit(): void {
    // igualamos el debucesuscription para posteriormente destruirlo
    this.denucerSuscription = this.debouncer
    .pipe(
      debounceTime(1000)  // le damos tiempo de espera
    )
    .subscribe(value => {
      // console.log('denuncer value ', value),
      this.onDebunce.emit(value);
    })
  }

  ngOnDestroy(): void {
    this.denucerSuscription?.unsubscribe();
  }



  constructor() { }


  //buscra mediante el clik enter
  emitValue(value: string):void{
    this.onValue.emit(value);  // la emitimos con el valor
  }


  //debounce
  onKeyPress(searchTerm : string){
    this.debouncer.next( searchTerm)
  }



}

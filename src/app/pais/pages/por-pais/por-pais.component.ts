import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  public termino: string = '';
  public placeholder: string = 'Buscar Pais...';
  public hayError: boolean = false;
  public paises: Country[] = [];

  constructor(
    private paisService: PaisService
  ) {

  }

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;

    if (!this.termino) {
      return
    }

    this.paisService.buscarPais(this.termino)
      .subscribe(paises => {
        console.log(paises)
        this.paises = paises
      }, (err) => {
        console.log('Error', err)
        this.hayError = true
        this.paises = []
      })
  }

  sugerencias(termino: string) {
    this.hayError = false;
  }
}

import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li {
      cursor: pointer
    }
    `
  ]
})
export class PorPaisComponent {

  public termino: string = '';
  public placeholder: string = 'Buscar Pais...';
  public hayError: boolean = false;
  public paises: Country[] = [];
  public paisesSugeridos: Country[] = [];
  public mostarSugerencias: boolean = false;

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
    this.mostarSugerencias = true;
    this.termino = termino;

    this.paisService.buscarPais(termino)
      .subscribe(paises => {
        if (paises.length > 0) {
          this.paisesSugeridos = paises.splice(0, 6)
        }
      }, (err) => this.paisesSugeridos = [])
  }

  buscarSugerido() {
    this.buscar(this.termino);
    this.mostarSugerencias = false;
  }
}

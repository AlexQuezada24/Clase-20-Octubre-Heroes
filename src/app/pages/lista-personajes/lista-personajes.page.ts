import { Component, ViewChild } from '@angular/core';
import { Personaje } from 'src/app/interfaces/personaje';
import { PersonajeService } from 'src/app/services/personaje';
import { IonContent, IonicModule, ViewWillEnter, LoadingController} from '@ionic/angular'; 
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.page.html',
  styleUrls: ['./lista-personajes.page.scss'],
  standalone: true,
  imports: [
    IonicModule,    
    RouterModule,
    CommonModule
    
  ]
})
export class ListaPersonajesPage implements ViewWillEnter {
  @ViewChild(IonContent) content: IonContent | undefined;

  allPersonajes: Personaje[] = [];
  personajesMostrados: Personaje[] = [];

  paginaActual: number = 0;
  personajesPorPagina: number = 10;
  totalPaginas: number = 0;
  inicioIndex: number = 0;

  private loading: HTMLIonLoadingElement | null = null;

  constructor(
    private personajeService: PersonajeService,
    private loadingCtrl: LoadingController
  ) { }

  ionViewWillEnter() {
    this.paginaActual = 0;
    this.cargarDatosConLoading();
  }

  async cargarDatosConLoading() {
    await this.presentLoading();

    this.personajeService.getPersonajes().pipe(
      finalize(() => {
        this.hideLoading();
      })
    ).subscribe(data => {
        this.allPersonajes = data;
        this.totalPaginas = Math.ceil(this.allPersonajes.length / this.personajesPorPagina);
        this.cargarPersonajes();
      }, error => {
        console.error('Error al cargar personajes:', error);
    });
  }

  cargarPersonajes() {
    this.inicioIndex = this.paginaActual * this.personajesPorPagina;
    const finIndex = this.inicioIndex + this.personajesPorPagina;
    this.personajesMostrados = this.allPersonajes.slice(this.inicioIndex, finIndex);
    this.content?.scrollToTop(500);
  }

  siguientePagina() {
    if ((this.paginaActual + 1) < this.totalPaginas) {
      this.paginaActual++;
      this.cargarPersonajes();
    }
  }
  
  isFirstPage(): boolean {
    return this.paginaActual === 0;
  }

  isLastPage(): boolean {
    return (this.paginaActual + 1) === this.totalPaginas;
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando héroes...',
      spinner: 'crescent'
    });
    await this.loading.present();
  }

  hideLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

}
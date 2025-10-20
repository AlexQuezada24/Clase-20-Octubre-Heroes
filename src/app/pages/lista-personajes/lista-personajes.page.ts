import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Personaje } from 'src/app/interfaces/personaje';
import { PersonajeService } from 'src/app/services/personaje';

@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.page.html',
  styleUrls: ['./lista-personajes.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
})
export class ListaPersonajesPage implements OnInit {

  personajes: Personaje[] = [];

  constructor(private personajeService: PersonajeService) {}

  ngOnInit() {
    this.personajeService.getPersonajes().subscribe((data: Personaje[]) => {
      this.personajes = data;
    });
  }
}
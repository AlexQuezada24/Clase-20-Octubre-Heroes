
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PersonajeService } from 'src/app/services/personaje';
import { Personaje } from 'src/app/interfaces/personaje';

@Component({
  selector: 'app-detalle-personaje',
  templateUrl: './detalle-personaje.page.html',
  styleUrls: ['./detalle-personaje.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
  ],
})
export class DetallePersonajePage implements OnInit {

  personaje: Personaje | undefined;
  personajeNoEncontrado = false;

  constructor(
    private route: ActivatedRoute,
    private personajeService: PersonajeService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const indice = +id;
      this.personajeService.getPersonaje(indice).subscribe((data: Personaje | undefined) => {
        this.personaje = data;
        if (!data) {
          this.personajeNoEncontrado = true;
        }
      });
    }
  }
}

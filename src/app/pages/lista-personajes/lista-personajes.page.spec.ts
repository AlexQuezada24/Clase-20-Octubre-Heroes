import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaPersonajesPage } from './lista-personajes.page';

describe('ListaPersonajesPage', () => {
  let component: ListaPersonajesPage;
  let fixture: ComponentFixture<ListaPersonajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPersonajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

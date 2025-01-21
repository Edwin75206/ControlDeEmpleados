import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeConfirmacionComponent } from './mensaje-confirmacion.component';

describe('MensajeConfirmacionComponent', () => {
  let component: MensajeConfirmacionComponent;
  let fixture: ComponentFixture<MensajeConfirmacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MensajeConfirmacionComponent]
    });
    fixture = TestBed.createComponent(MensajeConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

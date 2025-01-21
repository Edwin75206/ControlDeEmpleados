import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmpleadoComponent } from './add-edit-empleado.component';

describe('AddEditEmpleadoComponent', () => {
  let component: AddEditEmpleadoComponent;
  let fixture: ComponentFixture<AddEditEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditEmpleadoComponent]
    });
    fixture = TestBed.createComponent(AddEditEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

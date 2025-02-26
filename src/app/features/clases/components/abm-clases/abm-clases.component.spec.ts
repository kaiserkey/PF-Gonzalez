import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmClasesComponent } from './abm-clases.component';

describe('AbmClasesComponent', () => {
  let component: AbmClasesComponent;
  let fixture: ComponentFixture<AbmClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbmClasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

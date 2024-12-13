import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemMetasComponent } from './sem-metas.component';

describe('SemMetasComponent', () => {
  let component: SemMetasComponent;
  let fixture: ComponentFixture<SemMetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemMetasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

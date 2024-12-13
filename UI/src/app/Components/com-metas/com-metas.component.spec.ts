import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComMetasComponent } from './com-metas.component';

describe('ComMetasComponent', () => {
  let component: ComMetasComponent;
  let fixture: ComponentFixture<ComMetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComMetasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

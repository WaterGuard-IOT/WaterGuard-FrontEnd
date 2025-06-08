import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankDetailComponent } from './tank-detail.component';

describe('TankDetailComponent', () => {
  let component: TankDetailComponent;
  let fixture: ComponentFixture<TankDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TankDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TankDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

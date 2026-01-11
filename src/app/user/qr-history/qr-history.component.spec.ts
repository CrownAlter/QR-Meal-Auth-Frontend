import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrHistoryComponent } from './qr-history.component';

describe('QrHistoryComponent', () => {
  let component: QrHistoryComponent;
  let fixture: ComponentFixture<QrHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

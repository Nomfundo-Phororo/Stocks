import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTablesComponent } from './stock-tables.component';

describe('StockTablesComponent', () => {
  let component: StockTablesComponent;
  let fixture: ComponentFixture<StockTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

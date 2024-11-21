import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSourceComponent } from './dialog-add-source.component';

describe('DialogAddSourceComponent', () => {
  let component: DialogAddSourceComponent;
  let fixture: ComponentFixture<DialogAddSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddSourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

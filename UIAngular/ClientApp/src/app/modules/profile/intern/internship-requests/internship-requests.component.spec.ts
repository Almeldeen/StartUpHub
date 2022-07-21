import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipRequestsComponent } from './internship-requests.component';

describe('InternshipRequestsComponent', () => {
  let component: InternshipRequestsComponent;
  let fixture: ComponentFixture<InternshipRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternshipRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshipRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

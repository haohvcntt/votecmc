import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteStasticComponent } from './vote-stastic.component';

describe('VoteStasticComponent', () => {
  let component: VoteStasticComponent;
  let fixture: ComponentFixture<VoteStasticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoteStasticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteStasticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

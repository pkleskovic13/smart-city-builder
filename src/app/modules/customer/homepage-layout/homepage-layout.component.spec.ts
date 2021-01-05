import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageLayoutComponent } from './homepage-layout.component';

describe('HomepageLayoutComponent', () => {
  let component: HomepageLayoutComponent;
  let fixture: ComponentFixture<HomepageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

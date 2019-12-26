import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonModalLauncherComponent } from './ion-modal-launcher.component';

describe('IonModalLauncherComponent', () => {
  let component: IonModalLauncherComponent;
  let fixture: ComponentFixture<IonModalLauncherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonModalLauncherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonModalLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

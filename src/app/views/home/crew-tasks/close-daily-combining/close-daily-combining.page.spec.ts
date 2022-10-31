import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CloseDailyCombiningPage } from './close-daily-combining.page';

describe('CloseDailyCombiningPage', () => {
  let component: CloseDailyCombiningPage;
  let fixture: ComponentFixture<CloseDailyCombiningPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseDailyCombiningPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CloseDailyCombiningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

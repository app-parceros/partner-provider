import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavorListComponent } from './favor-list.component';

describe('FavorListComponent', () => {
  let component: FavorListComponent;
  let fixture: ComponentFixture<FavorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavorListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

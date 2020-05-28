import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {TabAvailableFavorsComponent} from './tab-available-favors.component';

describe('TabAvailableFavorsComponent', () => {
    let component: TabAvailableFavorsComponent;
    let fixture: ComponentFixture<TabAvailableFavorsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TabAvailableFavorsComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(TabAvailableFavorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

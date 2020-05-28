import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {TabCurrentFavorComponent} from './tab-current-favor.component';

describe('TabCurrentFavorComponent', () => {
    let component: TabCurrentFavorComponent;
    let fixture: ComponentFixture<TabCurrentFavorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TabCurrentFavorComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(TabCurrentFavorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-tab-home',
    templateUrl: './tab-home.component.html',
    styleUrls: ['./tab-home.component.scss'],
})
export class TabHomeComponent implements OnInit {

    public darkMode = true;

    constructor() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.darkMode = prefersDark.matches;
    }

    ngOnInit() {
    }

    changeMode(event) {
        document.body.classList.toggle('dark');
        /*if (event.returnValue) {
            document.body.classList.toggle('dark');
        } else {
            document.body.classList.toggle('dark');
        }*/
    }

}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  constructor(private appComponent: AppComponent){

  }
  isSideNavVisible: boolean=true;
  @ViewChild('headerLogo') headerLogo!: ElementRef<HTMLElement>;
  @ViewChild('sideArrow') sideArrow!: ElementRef<HTMLImageElement>;
  @ViewChild('mainNav') mainNav!: ElementRef<HTMLElement>;
  displaySideNav(): void {
    if (this.isSideNavVisible) {
      this.appComponent.hideSideNav(this.headerLogo, this.sideArrow, this.mainNav);
    }
    else {
      this.appComponent.showSideNav(this.headerLogo, this.sideArrow, this.mainNav);
    }
    this.isSideNavVisible = !this.isSideNavVisible;
  }
}

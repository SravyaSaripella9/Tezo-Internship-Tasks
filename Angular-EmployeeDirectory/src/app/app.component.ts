import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { EmployeesComponent } from './employees/employees.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SideNavComponent, EmployeesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{
  title = 'Angular-EmployeeDirectory';
  @ViewChild('sideNav') sideNav!: ElementRef<HTMLElement>;
  @ViewChild('mainBody') mainBody!: ElementRef<HTMLElement>;
  hideSideNav(headerLogo: ElementRef<HTMLElement>, sideArrow: ElementRef<HTMLImageElement>, mainNav: ElementRef<HTMLElement>): void{
    this.sideNav.nativeElement.classList.add("side-nav-close");
    this.sideNav.nativeElement.style.width = "6%";
    headerLogo.nativeElement.style.width = "40px";
    headerLogo.nativeElement.style.overflow = "hidden";
    sideArrow.nativeElement.style.rotate = "180deg";
    mainNav.nativeElement.style.width = "94%";
    this.mainBody.nativeElement.style.width = "94%";
  }
  showSideNav(headerLogo: ElementRef<HTMLElement>, sideArrow: ElementRef<HTMLImageElement>, mainNav: ElementRef<HTMLElement>): void{
    this.sideNav.nativeElement.classList.remove("side-nav-close");
    this.sideNav.nativeElement.style.width = "20%";
    headerLogo.nativeElement.style.width = "18%";
    sideArrow.nativeElement.style.rotate = "360deg";
    mainNav.nativeElement.style.width = "80%";
    this.mainBody.nativeElement.style.width = "80%";
  }
} 
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-side-menu',
  templateUrl: './nav-side-menu.component.html',
  styleUrls: ['./nav-side-menu.component.css']
})
export class NavSideMenuComponent {

  @ViewChild('navbar') navbar!: ElementRef<HTMLDivElement>;

  isNavbarCollapsed = false;
  navbarStateClass = '';
  private navbarStates = {
    0: 'nav-expanded',   //false
    1: 'nav-collapsed'   //true
  }

  ngOnInit() {
    this.isNavbarCollapsed = this.getStoredIsNavbarCollapsed();
    this.applyNavbarState();
  }


  switchNavbarState() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    this.applyNavbarState();
  }

  applyNavbarState () {
    this.navbarStateClass = this.navbarStates[Number(this.isNavbarCollapsed)];
    this.setStoredIsNavbarCollapsed(this.isNavbarCollapsed);
  }

  private getStoredIsNavbarCollapsed() {
    let tempIsNavbarCollapsed = localStorage.getItem('isNavbarCollapsed');
    if (tempIsNavbarCollapsed) {
      return !!JSON.parse(tempIsNavbarCollapsed);
    }
    return false;
  }

  private setStoredIsNavbarCollapsed(newValue: boolean) {
    localStorage.setItem('isNavbarCollapsed', JSON.stringify(newValue));
  }
}

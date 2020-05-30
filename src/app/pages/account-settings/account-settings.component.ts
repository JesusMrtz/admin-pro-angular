import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor(public settingsService: SettingsService) { }

  ngOnInit(): void {
    this.applyCheckInitial();
  }

  changeColor(theme: string, linkTheme: any) {
    this.applyCheck(linkTheme);
    this.settingsService.applyTheme(theme);
  }

  applyCheck(linkTheme: any) {
    this.deleteCheckbox();
    linkTheme.classList.add('working');
  }

  applyCheckInitial() {
    const selectors: any = document.getElementsByClassName('selector');
    const theme = this.settingsService.settingTheme.theme;

    for (const ref of selectors) {
      if (ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }
    }
  }

  deleteCheckbox() {
    const selectors: any = document.getElementsByClassName('selector');

    for (const ref of selectors) {
      ref.classList.remove('working');
    }
  }

}

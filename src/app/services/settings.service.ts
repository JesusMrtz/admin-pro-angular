import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settingTheme: SettingsTheme = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default.css'
  };

  constructor(@Inject(DOCUMENT) private document) {
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem('settingsTheme', JSON.stringify(this.settingTheme));
  }

  loadSettings() {
    if (localStorage.getItem('settingsTheme')) {
      this.settingTheme = JSON.parse(localStorage.getItem('settingsTheme'));
      this.applyTheme(this.settingTheme.theme);
    }
  }

  applyTheme(theme: string) {
    const URL = `assets/css/colors/${theme}.css`;
    this.document.getElementById('theme').setAttribute('href', URL);

    this.settingTheme.themeUrl = URL;
    this.settingTheme.theme = theme;
    this.saveSettings();
  }
}

interface SettingsTheme {
  themeUrl: string;
  theme: string;
}

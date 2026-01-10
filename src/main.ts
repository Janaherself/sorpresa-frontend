import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { ThemeService } from './app/services/theme.service';

bootstrapApplication(App, appConfig)
  .then(ref => { ref.injector.get(ThemeService).initTheme(); })
  .catch((err) => console.error(err));

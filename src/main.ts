import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideAnimations(),
  provideToastr({
  positionClass: 'toast-top-right',
  timeOut: 3000,
  toastClass: 'crazy-toast',
  progressBar: true,
  closeButton: true,
  enableHtml: true, // ✅ enables emoji and HTML formatting
})

  ],
}).catch((err) => console.error(err));

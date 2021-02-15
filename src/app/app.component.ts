import { Component } from '@angular/core';
import { Mode } from './models/mode.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mode = Mode.Light;
  switchMode(mode) {
    if(mode === Mode.Light) {
      document.body.style.setProperty('--bg-color','#272727');
      document.body.style.setProperty('--text-color','#f8fafb');
      this.mode = Mode.Dark;
    } else {
      document.body.style.setProperty('--bg-color','#f8fafb');
      document.body.style.setProperty('--text-color','#272727');
      this.mode = Mode.Light;
    }

  }
}

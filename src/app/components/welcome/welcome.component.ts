import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  @Output() playClicked = new EventEmitter();
  
  onPlay() {
    this.playClicked.emit();
  }
}

import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-errorpage',
  imports: [RouterLink],
  templateUrl: './errorpage.html',
  styleUrl: './errorpage.css',
})
export class Errorpage {
  @Input() errorString!: string;

  retry() {
    window.location.reload();
  }
}

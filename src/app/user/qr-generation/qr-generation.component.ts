import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-qr-generation',
  standalone: false,
  templateUrl: './qr-generation.component.html',
  styleUrl: './qr-generation.component.css'
})
export class QrGenerationComponent {
  @Input() userData!: string;
}

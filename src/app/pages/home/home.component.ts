import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { PdfModalComponent } from '../../components/pdf-modal/pdf-modal.component';

import { TankService } from '../../data/services/tank/tank.service';
import { Tank } from '../../data/models/tank/tank.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToolbarComponent, CommonModule, PdfModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  showModal = false;
  tank!: Tank;

  constructor(private tankService: TankService) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      const userId = Number(storedId);
      this.tankService.getTanksByUser(userId).subscribe({
        next: (tanks) => {
          if (tanks.length > 0) {
            this.tank = tanks[0]; // Tomamos el primer tanque del usuario
          } else {
            console.warn('No hay tanques registrados para este usuario.');
          }
        },
        error: (err) => {
          console.error('Error al obtener tanques:', err);
        }
      });
    } else {
      console.warn('No userId found in localStorage.');
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  savePdf() {
    this.showModal = false;
    console.log('Generando el PDF...');
  }
}

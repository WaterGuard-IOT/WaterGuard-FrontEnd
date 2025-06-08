import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { PdfModalComponent } from '../../components/pdf-modal/pdf-modal.component';

import { TankService } from '../../data/services/tank/tank.service';
import { Tank } from '../../data/models/tank/tank.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToolbarComponent, CommonModule, PdfModalComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  tanks: Tank[] = [];
  showModal = false;

  constructor(private tankService: TankService) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      const userId = Number(storedId);
      this.tankService.getTanksByUser(userId).subscribe({
        next: (tanks) => {
          this.tanks = tanks;
        },
        error: (err) => {
          console.error('Error al obtener tanques:', err);
        }
      });
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

  getStatus(porcentaje: number): string {
  if (porcentaje < 30) return 'Crítico';
  if (porcentaje < 60) return 'Atención';
  return 'Normal';
}

getStatusClass(porcentaje: number): string {
  if (porcentaje < 30) return 'critico';
  if (porcentaje < 60) return 'atencion';
  return 'normal';
}

}

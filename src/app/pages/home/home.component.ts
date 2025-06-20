import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { PdfModalComponent } from '../../components/pdf-modal/pdf-modal.component';
import { TankService } from '../../data/services/tank/tank.service';
import { Tank } from '../../data/models/tank/tank.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ToolbarComponent,
    CommonModule,
    PdfModalComponent,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  tanks: Tank[] = [];
  showModal = false;
  showNewTankForm = false;
  editMode = false;
  editingTankId: number | null = null;

  newTank: any = {
    name: '',
    capacity: 0,
    currentLevel: 0,
    criticalLevel: 20,
    optimalLevel: 80,
    pumpActive: true,
    status: 'normal',
    location: {
      latitude: 0,
      longitude: 0,
      address: '',
    },
    userId: null,
  };

  constructor(private tankService: TankService) {}

  ngOnInit(): void {
    this.loadTanks();
  }

  loadTanks(): void {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      const userId = Number(storedId);
      this.tankService.getTanksByUser(userId).subscribe({
        next: (tanks) => (this.tanks = tanks),
        error: (err) => console.error('Error al obtener tanques:', err),
      });
    }
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  savePdf(): void {
    this.showModal = false;
    console.log('Generando el PDF...');
  }

  openNewTankModal(): void {
    this.resetForm();
    this.showNewTankForm = true;
    this.editMode = false;
  }

  cancelNewTank(): void {
    this.showNewTankForm = false;
    this.resetForm();
  }

  saveTank(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    this.newTank.userId = +userId;

    if (this.editMode && this.editingTankId !== null) {
      // Editar
      this.tankService.updateTank(this.editingTankId, this.newTank).subscribe({
        next: () => {
          this.loadTanks();
          this.cancelNewTank();
        },
        error: (err) => console.error('Error al actualizar tanque', err),
      });
    } else {
      // Crear
      this.tankService.createTank(this.newTank).subscribe({
        next: () => {
          this.loadTanks();
          this.cancelNewTank();
        },
        error: (err) => console.error('Error al crear tanque', err),
      });
    }
  }

  editTank(tank: Tank): void {
    this.newTank = JSON.parse(JSON.stringify(tank)); // Clonar para edición segura
    this.editMode = true;
    this.editingTankId = tank.id;
    this.showNewTankForm = true;
  }

  deleteTank(id: number): void {
    if (confirm('¿Estás seguro de eliminar este tanque?')) {
      this.tankService.deleteTank(id).subscribe({
        next: () => {
          this.tanks = this.tanks.filter((t) => t.id !== id);
        },
        error: (err) => console.error('Error al eliminar tanque', err),
      });
    }
  }

  private resetForm(): void {
    this.newTank = {
      name: '',
      capacity: 0,
      currentLevel: 0,
      criticalLevel: 20,
      optimalLevel: 80,
      pumpActive: true,
      status: 'normal',
      location: {
        latitude: 0,
        longitude: 0,
        address: '',
      },
      userId: null,
    };
    this.editMode = false;
    this.editingTankId = null;
  }
}

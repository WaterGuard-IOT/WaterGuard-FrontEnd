import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { TankService } from '../../data/services/tank/tank.service';
import { Tank } from '../../data/models/tank/tank.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ToolbarComponent, RouterModule, CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  waterLevel: number = 0;
  waterStatus: string = 'Sin datos';
  totalTanks: number = 0;
  alerts: string[] = [];

  // Umbrales configurables
  phMin: number = 6.5;
  phMax: number = 8.5;
  tempMin: number = 15;
  tempMax: number = 25;
  nivelCritico: number = 25;
  nivelOptimo: number = 80;

  constructor(private tankService: TankService) {}

  ngOnInit(): void {
    this.loadThresholds();

    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.tankService.getTanksByUser(+userId).subscribe({
      next: (tanks: Tank[]) => {
        this.totalTanks = tanks.length;

        if (tanks.length > 0) {
          const lastTank = tanks[0];
          this.waterLevel = lastTank.nivel?.porcentaje ?? 0;
          this.waterStatus = `pH: ${lastTank.calidad?.ph ?? 'N/A'}`;

          // Recorremos todos los tanques para detectar alertas
          this.alerts = [];
          tanks.forEach((tank) => {
            this.generateAlerts(tank);
          });
        }
      },
      error: (err) => {
        console.error('Error al cargar los tanques:', err);
      }
    });
  }

  private loadThresholds(): void {
    this.phMin = Number(localStorage.getItem('phMin') ?? 6.5);
    this.phMax = Number(localStorage.getItem('phMax') ?? 8.5);
    this.tempMin = Number(localStorage.getItem('tempMin') ?? 15);
    this.tempMax = Number(localStorage.getItem('tempMax') ?? 25);
    this.nivelCritico = Number(localStorage.getItem('nivelCritico') ?? 25);
    this.nivelOptimo = Number(localStorage.getItem('nivelOptimo') ?? 80);
  }

  private generateAlerts(tank: Tank): void {
    if (tank.nivel?.porcentaje < this.nivelCritico) {
      this.alerts.push(`Tanque #${tank.id}: Nivel crítico (< ${this.nivelCritico}%)`);
    }

    if (tank.calidad?.ph < this.phMin || tank.calidad?.ph > this.phMax) {
      this.alerts.push(`Tanque #${tank.id}: pH fuera de rango (${this.phMin} - ${this.phMax}), actual: ${tank.calidad.ph}`);
    }

    if (tank.calidad?.temperatura < this.tempMin || tank.calidad?.temperatura > this.tempMax) {
      this.alerts.push(`Tanque #${tank.id}: Temperatura fuera de rango (${this.tempMin}°C - ${this.tempMax}°C), actual: ${tank.calidad.temperatura}°C`);
    }

    if (tank.calidad?.turbidez > 5) {
      this.alerts.push(`Tanque #${tank.id}: Alta turbidez detectada (${tank.calidad.turbidez} NTU)`);
    }

    if (tank.nivel?.porcentaje > this.nivelOptimo) {
      this.alerts.push(`Tanque #${tank.id}: Nivel superior al óptimo (> ${this.nivelOptimo}%)`);
    }

  }
}

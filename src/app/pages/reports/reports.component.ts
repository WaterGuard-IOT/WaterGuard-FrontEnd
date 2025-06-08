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

  constructor(private tankService: TankService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.tankService.getTanksByUser(+userId).subscribe({
      next: (tanks: Tank[]) => {
        this.totalTanks = tanks.length;

        if (tanks.length > 0) {
          const lastTank = tanks[0];
          this.waterLevel = lastTank.nivel?.porcentaje ?? 0;
          this.waterStatus = `pH: ${lastTank.calidad?.ph ?? 'N/A'}`;
          this.generateAlerts(lastTank);
        }
      },
      error: (err) => {
        console.error('Error al cargar los tanques:', err);
      }
    });
  }

  private generateAlerts(tank: Tank): void {
    this.alerts = [];

    if (tank.nivel?.porcentaje < 25) {
      this.alerts.push('Nivel de agua crítico: menos del 25%');
    }

    if (tank.calidad?.ph < 6.5 || tank.calidad?.ph > 8.5) {
      this.alerts.push(`pH fuera de rango ideal (actual: ${tank.calidad.ph})`);
    }

    if (tank.calidad?.temperatura < 15 || tank.calidad?.temperatura > 25) {
      this.alerts.push(`Temperatura fuera de rango (actual: ${tank.calidad.temperatura}°C)`);
    }

    if (tank.calidad?.turbidez > 5) {
      this.alerts.push(`Alta turbidez detectada (actual: ${tank.calidad.turbidez} NTU)`);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { TankService } from '../../data/services/tank/tank.service';
import { AlertService } from '../../data/services/alert/alert.service';
import { Alert } from '../../data/models/alert/alert.model';
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
  alerts: Alert[] = [];

  constructor(
    private tankService: TankService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.tankService.getTanksByUser(+userId).subscribe({
      next: (tanks: Tank[]) => {
        this.totalTanks = tanks.length;

        if (tanks.length > 0) {
  const lastTank = tanks[0];

  const porcentaje =
    lastTank.nivel?.porcentaje ??
    (lastTank.currentLevel && lastTank.capacity
      ? (lastTank.currentLevel / lastTank.capacity) * 100
      : 0);

  this.waterLevel = Math.round(porcentaje);

  this.waterStatus = lastTank.calidad?.ph !== undefined
  ? `pH: ${lastTank.calidad.ph}`
  : 'Pendiente de medición';

}


        tanks.forEach((tank) => {
          this.generateAndCreateAlerts(tank);
          this.fetchAlertsByTank(tank.id);
        });
      },
      error: (err: any) => {
        console.error('Error al cargar los tanques:', err);
      }
    });
  }

  fetchAlertsByTank(tankId: number): void {
    this.alertService.getAlertsByTank(tankId.toString()).subscribe({
      next: (alerts: Alert[]) => {
        const unresolved = alerts.filter(a => !a.resolved);

        this.alerts = [
          ...this.alerts,
          ...unresolved.filter(a => !this.alerts.some(existing => existing.id === a.id))
        ];

        this.alerts.sort((a, b) => {
          const dateA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
          const dateB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
          return dateB - dateA;
        });

        this.alerts = this.alerts.slice(0, 5);
      },
      error: (err: any) => {
        console.error('Error al obtener alertas:', err);
      }
    });
  }

  generateAndCreateAlerts(tank: Tank): void {
    const nivel = tank.nivel;
    const calidad = tank.calidad;
    const timestamp = new Date().toISOString();

    const porcentaje = nivel?.porcentaje ?? 
      (tank.currentLevel && tank.capacity
        ? (tank.currentLevel / tank.capacity) * 100
        : 0);

    this.alertService.getAlertsByTank(tank.id.toString()).subscribe(existingAlerts => {
      const tryCreate = (type: string, severity: string, message: string) => {
        const exists = existingAlerts.some(a => a.message === message && a.type === type && !a.resolved);
        if (!exists) {
          const newAlert: Alert = {
            tankId: tank.id.toString(),
            type,
            severity,
            message,
            timestamp,
            resolved: false,
            pumpActivated: tank.pumpActive
          };
          this.alertService.createAlert(newAlert).subscribe();
        }
      };

      if (porcentaje < 25) {
        tryCreate('Nivel de Agua', 'CRITICO', `Nivel crítico detectado: ${porcentaje.toFixed(1)}%`);
      }

      if (porcentaje > 80) {
        tryCreate('Nivel de Agua', 'MODERADO', `Nivel por encima del óptimo: ${porcentaje.toFixed(1)}%`);
      }

      if (calidad?.ph !== undefined && (calidad.ph < 6.5 || calidad.ph > 8.5)) {
        tryCreate('pH', 'ALTO', `pH fuera de rango (${calidad.ph})`);
      }

      if (calidad?.temperatura !== undefined && (calidad.temperatura < 15 || calidad.temperatura > 25)) {
        tryCreate('Temperatura', 'MODERADO', `Temperatura anormal: ${calidad.temperatura}°C`);
      }

      if (calidad?.turbidez !== undefined && calidad.turbidez > 5) {
        tryCreate('Turbidez', 'MODERADO', `Alta turbidez: ${calidad.turbidez} NTU`);
      }
    });
  }

  markAsResolved(alert: Alert): void {
  const updated = { ...alert, resolved: true };
  this.alertService.updateAlert(alert.id!, updated).subscribe(() => {
    this.alerts = this.alerts.filter(a => a.id !== alert.id);
  });
}

deleteAlert(alert: Alert): void {
  this.alertService.deleteAlert(alert.id!).subscribe(() => {
    this.alerts = this.alerts.filter(a => a.id !== alert.id);
  });
}

}

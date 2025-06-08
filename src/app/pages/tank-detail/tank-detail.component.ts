import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TankService } from '../../data/services/tank/tank.service';
import { Tank } from '../../data/models/tank/tank.model';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';

import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-tank-detail',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, NgChartsModule],
  templateUrl: './tank-detail.component.html',
  styleUrl: './tank-detail.component.css'
})
export class TankDetailComponent implements OnInit {
  tank?: Tank;
  isLoading = true;
  bombaActiva = false;
  mensajeBomba = '';


  chartLabels: string[] = [];
  chartData: ChartConfiguration<'line'>['data']['datasets'] = [];
  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  constructor(
    private route: ActivatedRoute,
    private tankService: TankService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const tankId = idParam ? +idParam : 0;

    if (tankId > 0) {
      this.tankService.getTankById(tankId).subscribe({
        next: (data) => {
          this.tank = data;
          this.isLoading = false;
          this.setupChart(data.nivel.porcentaje);
        },
        error: (err) => {
          console.error('Error al obtener tanque:', err);
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }

  getStatus(porcentaje: number): string {
    if (porcentaje >= 75) return 'Normal';
    if (porcentaje >= 40) return 'Precaución';
    return 'Crítico';
  }

  getStatusClass(porcentaje: number): string {
    if (porcentaje >= 75) return 'normal';
    if (porcentaje >= 40) return 'precaucion';
    return 'critico';
  }

  private setupChart(actualNivel: number): void {
    const historico = [
      actualNivel - 10,
      actualNivel - 5,
      actualNivel - 8,
      actualNivel - 3,
      actualNivel,
    ];

    this.chartLabels = ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Hoy'];
    this.chartData = [
      {
        data: historico.map(v => Math.max(0, Math.min(v, 100))),
        label: 'Nivel de agua (%)',
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.3)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ];
  }

  togglePump(): void {
  this.bombaActiva = !this.bombaActiva;
  this.mensajeBomba = this.bombaActiva
    ? 'La bomba se ha activado correctamente.'
    : 'La bomba se ha desactivado correctamente.';

  setTimeout(() => {
    this.mensajeBomba = '';
  }, 3000);
}
}

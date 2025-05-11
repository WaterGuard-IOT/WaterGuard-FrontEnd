import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { WaterStatusService } from '../../data/services/water-status/water-status.service';
import { TrendsService } from '../../data/services/trends/trend.service';
import { WaterStatus } from '../../data/models/water-status/water-statu';
import { Trends } from '../../data/models/trends/trend';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [CommonModule, ToolbarComponent],
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  waterStatus!: WaterStatus;
  trends: Trends[] = [];

  constructor(
    private waterStatusService: WaterStatusService,
    private trendsService: TrendsService
  ) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (userId) {
      this.waterStatusService.getByUserId(userId).subscribe(data => {
        this.waterStatus = data[0];
      });

      this.trendsService.getByUserId(userId).subscribe(data => {
        this.trends = data;
      });
    }
  }

  mapVolumenToMensajes(volumen: number): { accion: string, resultado: string } {
    if (volumen >= 75) {
      return {
        accion: 'Detener bomba automáticamente',
        resultado: 'Se evita el sobrellenado del tanque'
      };
    } else if (volumen >= 50) {
      return {
        accion: 'Mantener bomba apagada',
        resultado: 'Nivel dentro del rango óptimo'
      };
    } else if (volumen >= 30) {
      return {
        accion: 'Activar bomba',
        resultado: 'Llenado continuo hasta nivel seguro'
      };
    } else if (volumen >= 15) {
      return {
        accion: 'Activar bomba para iniciar llenado',
        resultado: 'El nivel comienza a subir de forma controlada'
      };
    } else {
      return {
        accion: 'Activar alerta por nivel crítico',
        resultado: 'Alerta enviada al sistema'
      };
    }
  }
}

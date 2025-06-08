import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { TankService } from '../../data/services/tank/tank.service';
import { Tank } from '../../data/models/tank/tank.model';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [CommonModule, ToolbarComponent],
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  tanks: Tank[] = [];

  constructor(private tankService: TankService) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (userId) {
      this.tankService.getTanksByUser(userId).subscribe(tanks => {
        this.tanks = tanks.filter(t => t.nivel); // Asegura que tengan datos
      });
    }
  }

  mapVolumenToMensajes(volumen: number): { accion: string; resultado: string } {
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

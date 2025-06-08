import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms'; // ✅ Importa FormsModule
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { AuthService } from '../../shared/auth-service/auth.service';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule,
    FormsModule, // ✅ Asegúrate de incluirlo aquí
    ToolbarComponent
  ],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  phMin: number = 6.5;
  phMax: number = 8.5;
  tempMin: number = 15;
  tempMax: number = 25;
  nivelCritico: number = 20;
  nivelOptimo: number = 80;

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }

  updatePhThresholds() {
    alert(`pH actualizado: ${this.phMin} - ${this.phMax}`);
  }

  updateTempThresholds() {
    alert(`Temperatura actualizada: ${this.tempMin}°C - ${this.tempMax}°C`);
  }

  updateNivelThresholds() {
    alert(`Niveles actualizados: Crítico ${this.nivelCritico}% - Óptimo ${this.nivelOptimo}%`);
  }
  resetDefaults(): void {
  this.phMin = 6.5;
  this.phMax = 8.5;
  this.tempMin = 15;
  this.tempMax = 25;
  this.nivelCritico = 20;
  this.nivelOptimo = 80;
  alert('Valores restaurados a los valores por defecto');
}

}

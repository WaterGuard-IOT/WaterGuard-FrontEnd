import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { AuthService } from '../../shared/auth-service/auth.service';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule,
    FormsModule,
    ToolbarComponent
  ],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  phMin: number = 6.5;
  phMax: number = 8.5;
  tempMin: number = 15;
  tempMax: number = 25;
  nivelCritico: number = 20;
  nivelOptimo: number = 80;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Cargar valores guardados si existen
    this.phMin = parseFloat(localStorage.getItem('phMin') || '6.5');
    this.phMax = parseFloat(localStorage.getItem('phMax') || '8.5');
    this.tempMin = parseFloat(localStorage.getItem('tempMin') || '15');
    this.tempMax = parseFloat(localStorage.getItem('tempMax') || '25');
    this.nivelCritico = parseFloat(localStorage.getItem('nivelCritico') || '20');
    this.nivelOptimo = parseFloat(localStorage.getItem('nivelOptimo') || '80');
  }

  updatePhThresholds() {
    localStorage.setItem('phMin', this.phMin.toString());
    localStorage.setItem('phMax', this.phMax.toString());
    alert(`pH actualizado: ${this.phMin} - ${this.phMax}`);
  }

  updateTempThresholds() {
    localStorage.setItem('tempMin', this.tempMin.toString());
    localStorage.setItem('tempMax', this.tempMax.toString());
    alert(`Temperatura actualizada: ${this.tempMin}°C - ${this.tempMax}°C`);
  }

  updateNivelThresholds() {
    localStorage.setItem('nivelCritico', this.nivelCritico.toString());
    localStorage.setItem('nivelOptimo', this.nivelOptimo.toString());
    alert(`Niveles actualizados: Crítico ${this.nivelCritico}% - Óptimo ${this.nivelOptimo}%`);
  }

  resetDefaults(): void {
    this.phMin = 6.5;
    this.phMax = 8.5;
    this.tempMin = 15;
    this.tempMax = 25;
    this.nivelCritico = 20;
    this.nivelOptimo = 80;

    this.updatePhThresholds();
    this.updateTempThresholds();
    this.updateNivelThresholds();

    alert('Valores restaurados a los valores por defecto');
  }

  logout(): void {
    this.authService.logout();
  }
}

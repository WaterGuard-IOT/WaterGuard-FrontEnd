import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { PdfModalComponent } from '../../components/pdf-modal/pdf-modal.component';

import { WaterStatusService } from '../../data/services/water-status/water-status.service';
import { TrendsService } from '../../data/services/trends/trend.service';
import { AlertService } from '../../data/services/alerts/alert.service';

import { WaterStatus } from '../../data/models/water-status/water-statu';
import { Trends } from '../../data/models/trends/trend';
import { Alerts } from '../../data/models/alerts/alert';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToolbarComponent, CommonModule, PdfModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  showModal = false;

  userId: number = 0;
  waterStatus!: WaterStatus;
  trends: Trends[] = [];
  alerts: Alerts[] = [];

  constructor(
    private waterStatusService: WaterStatusService,
    private trendsService: TrendsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      this.userId = Number(storedId);
      this.loadData();
    } else {
      console.warn('No userId found in localStorage.');
      
    }
  }

  loadData(): void {
    this.waterStatusService.getByUserId(this.userId).subscribe(data => {
      this.waterStatus = data[0];
    });

    this.trendsService.getByUserId(this.userId).subscribe(data => {
      this.trends = data;
    });

    this.alertService.getByUserId(this.userId).subscribe(data => {
      this.alerts = data;
    });
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
}

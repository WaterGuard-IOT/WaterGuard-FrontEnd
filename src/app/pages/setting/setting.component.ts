import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { AuthService } from '../../shared/auth-service/auth.service';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, RouterModule, MatExpansionModule, ToolbarComponent],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}

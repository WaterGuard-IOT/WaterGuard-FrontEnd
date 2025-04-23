import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica si el usuario está autenticado
  if (authService.isAuthenticated()) {
    return true; // Permite la navegación
  } else {
    // Redirige al login si no está autenticado
    return router.navigate(['/login']).then(() => false);
  }
};
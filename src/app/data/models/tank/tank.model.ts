import { User } from '../users/user.model';
import { WaterLevel } from '../water-level/water-level.model';
import { WaterQuality } from '../water-quality/water-quality.model';

export interface Tank {
  id: number;
  usuario: User;

  name: string;
  capacity: number;
  currentLevel: number;
  criticalLevel: number;
  optimalLevel: number;
  lastUpdated: string;
  status: string;
  pumpActive: boolean;

  // Embedded object
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };

  // Relaciones nuevas que se devuelven en GET
  calidad?: WaterQuality;
  nivel?: WaterLevel;
}

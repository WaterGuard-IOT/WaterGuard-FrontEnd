import { WaterQuality } from '../water-quality/water-quality.model';
import { WaterLevel } from '../water-level/water-level.model';
import { User } from '../users/user.model';

export interface Tank {
  id: number;
  usuario: User;              
  calidad: WaterQuality;      
  nivel: WaterLevel;         
}

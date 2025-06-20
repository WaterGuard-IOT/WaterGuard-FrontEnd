export interface Alert {
  id?: number;
  tankId: string;
  type: string;
  severity: string;
  message: string;
  timestamp?: string;
  resolved: boolean;
  pumpActivated: boolean;
}

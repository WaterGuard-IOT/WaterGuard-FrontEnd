export interface WaterQuality {
  id: number;
  ph: number;
  turbidez: number;
  conductividad: number;
  temperatura: number;
  fechaRegistro: string; // LocalDateTime se transforma a string en JSON
}

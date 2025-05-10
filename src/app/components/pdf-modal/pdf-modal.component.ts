import { Component, EventEmitter, Output } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pdf-modal',
  standalone: true,
  imports: [],
  templateUrl: './pdf-modal.component.html',
  styleUrl: './pdf-modal.component.css',
})
export class PdfModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  download() {
    const element = document.querySelector('.card') as HTMLElement;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // yyyy-mm-dd
    const fileName = `Reporte_${dateStr}.pdf`;
  
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(fileName);
    });
  
    this.closeModal.emit();
  }
  
}

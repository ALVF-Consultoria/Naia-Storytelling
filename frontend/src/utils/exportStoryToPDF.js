import { jsPDF } from "jspdf";

export function exportStoryToPDF(title, storyText) {
  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  const margin = 50;
  const pageWidth = doc.internal.pageSize.getWidth() - margin * 2;
  const pageHeight = doc.internal.pageSize.getHeight();
  const lineHeight = 18;

  // Título
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.text(title, pageWidth / 2 + margin, 70, { align: "center" });

  doc.setFont("times", "normal");
  doc.setFontSize(12);

  // Divide o texto em parágrafos com base em quebras de linha duplas
  const paragraphs = storyText.split(/\n\s*\n/);

  let y = 110;

  paragraphs.forEach((paragraph, i) => {
    const lines = doc.splitTextToSize(paragraph.trim(), pageWidth);

    lines.forEach((line) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    y += lineHeight; // espaço extra entre parágrafos
  });

  // Rodapé com numeração de páginas
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Página ${i} de ${totalPages}`,
      pageWidth / 2 + margin,
      pageHeight - 30,
      { align: "center" }
    );
  }

  doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
}

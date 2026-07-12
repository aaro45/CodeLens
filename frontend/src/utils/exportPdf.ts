import jsPDF from "jspdf";

interface ReportData {
  similarity: number;
  added: number;
  removed: number;
  modified: number;
  analysis: string;
  language: string;
  originalCode: string;
  modifiedCode: string;
}

export const exportPDF = ({
  similarity,
  added,
  removed,
  modified,
  analysis,
  language,
  originalCode,
  modifiedCode,
}: ReportData) => {
  const doc = new jsPDF();

  const pageWidth = 170;
  const pageHeight = 280;
  let y = 20;

  const checkPage = (extra = 10) => {
    if (y + extra > pageHeight) {
      doc.addPage();
      y = 20;
    }
  };

  doc.setFontSize(20);
  doc.text("CodeLens Report", 20, y);
  y += 12;

  doc.setFontSize(12);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 20, y);
  y += 10;
  doc.text(`Language: ${language}`, 20, y);
  y += 10;
  doc.text(`Similarity: ${similarity}%`, 20, y);
  y += 8;
  doc.text(`Added Lines: ${added}`, 20, y);
  y += 8;
  doc.text(`Removed Lines: ${removed}`, 20, y);
  y += 8;
  doc.text(`Modified Lines: ${modified}`, 20, y);
  y += 15;

  doc.setFontSize(16);
  doc.text("AI Analysis", 20, y);
  y += 10;

  const cleanAnalysis = analysis
    .replace(/\*\*/g, "")
    .replace(/`/g, "");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const analysisLines = doc.splitTextToSize(cleanAnalysis, pageWidth);

  for (const line of analysisLines) {
    checkPage(7);
    doc.text(line, 20, y);
    y += 7;
  }

  y += 8;
  checkPage(20);

  doc.setFontSize(16);
  doc.text("Original Code", 20, y);
  y += 10;

  doc.setFont("courier", "normal");
  doc.setFontSize(10);

  const originalWrapped: string[] = [];

  originalCode.split("\n").forEach((line) => {
    originalWrapped.push(...doc.splitTextToSize(line, pageWidth));
  });

  for (const line of originalWrapped) {
    checkPage(5);
    doc.text(line, 20, y);
    y += 5;
  }

  y += 10;
  checkPage(20);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Modified Code", 20, y);
  y += 10;

  doc.setFont("courier", "normal");
  doc.setFontSize(10);

  const modifiedWrapped: string[] = [];

  modifiedCode.split("\n").forEach((line) => {
    modifiedWrapped.push(...doc.splitTextToSize(line, pageWidth));
  });

  for (const line of modifiedWrapped) {
    checkPage(5);
    doc.text(line, 20, y);
    y += 5;
  }

  doc.save("CodeLens_Report.pdf");
};
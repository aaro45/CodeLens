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

  doc.setFontSize(20);
    doc.text("CodeLens Report", 20, 20);

    doc.setFontSize(12);

    doc.text(`Generated: ${new Date().toLocaleString()}`,20,32);

    doc.text(`Language : ${language}`,20,42);

    doc.text(`Similarity : ${similarity}%`,20,55);
    doc.text(`Added Lines : ${added}`,20,65);
    doc.text(`Removed Lines : ${removed}`,20,75);
    doc.text(`Modified Lines : ${modified}`,20,85);

    doc.setFontSize(16);
    doc.text("AI Analysis",20,100);

    const cleanAnalysis = analysis
    .replace(/\*\*/g, "")
    .replace(/`/g, "");

    const lines = doc.splitTextToSize(cleanAnalysis, 170);

    doc.setFontSize(11);
    doc.text(lines, 20, 110);
  let y = 100 + lines.length * 7 + 10;

    if (y > 260) {
    doc.addPage();
    y = 20;
    }

    doc.setFontSize(16);
    doc.text("Original Code", 20, y);

    const originalLines = doc.splitTextToSize(originalCode, 170);
    doc.setFontSize(11);
    doc.text(originalLines, 20, y + 10);

    y += originalLines.length * 5 + 20;

    const modifiedLines = doc.splitTextToSize(modifiedCode,170);

    if(y + modifiedLines.length*5 > 270){
        doc.addPage();
        y=20;
    }

    doc.setFontSize(16);
    doc.text("Modified Code",20,y);

    doc.setFontSize(11);
    doc.text(modifiedLines,20,y+10);

  doc.save("CodeLens_Report.pdf");
};
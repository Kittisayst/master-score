import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Extend jsPDF type to include autoTable
interface jsPDFWithAutoTable extends jsPDF {
    lastAutoTable: { finalY: number };
}

export const generatePDFReport = (scores: any[]) => {
    const doc = new jsPDF() as jsPDFWithAutoTable;

    // Title
    doc.setFontSize(22);
    doc.setTextColor(79, 70, 229); // Indigo
    doc.text("Quiz Event Summary Report", 105, 20, { align: "center" });
    
    // Date
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 30, { align: "center" });

    // Stats
    const totalPlayers = scores.length;
    const avgScore = totalPlayers > 0 
        ? (scores.reduce((acc, curr) => acc + curr.score, 0) / totalPlayers).toFixed(1) 
        : "0";
    const maxScore = totalPlayers > 0 
        ? Math.max(...scores.map(s => s.score)) 
        : 0;

    doc.setFillColor(243, 244, 246);
    doc.roundedRect(14, 40, 182, 30, 3, 3, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(`Total Players: ${totalPlayers}`, 25, 60);
    doc.text(`Average Score: ${avgScore}`, 85, 60);
    doc.text(`Highest Score: ${maxScore}`, 145, 60);

    // Table
    const tableData = scores.map((s, index) => [
        index + 1,
        `${s.name} ${s.surname}`,
        s.institute,
        s.selectedCategory || 'N/A',
        s.score
    ]);

    autoTable(doc, {
        startY: 80,
        head: [['#', 'Name', 'Institute', 'Category', 'Score']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [79, 70, 229] },
        styles: { fontSize: 10 },
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text('Master Score System', 14, doc.internal.pageSize.height - 10);
        doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 25, doc.internal.pageSize.height - 10);
    }

    doc.save("quiz_summary_report.pdf");
};

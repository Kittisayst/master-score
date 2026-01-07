import jsPDF from 'jspdf';
import type { UserInfo } from '../store/useQuizStore';
import NotoSansLao from '../assets/font/NotoSansLao.ttf';

export const generateCertificate = async (userInfo: UserInfo, score: number, totalQuestions: number) => {
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    // Load Font
    try {
        const fontResponse = await fetch(NotoSansLao);
        const fontBuffer = await fontResponse.arrayBuffer();
        
        // Convert ArrayBuffer to binary string
        let fontBinary = '';
        const bytes = new Uint8Array(fontBuffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            fontBinary += String.fromCharCode(bytes[i]);
        }

        doc.addFileToVFS('NotoSansLao.ttf', fontBinary);
        doc.addFont('NotoSansLao.ttf', 'NotoSansLao', 'normal');
        doc.setFont('NotoSansLao');
    } catch (error) {
        console.error("Failed to load custom font:", error);
        // Fallback to standard font if loading fails
        doc.setFont("helvetica");
    }

    // Background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 297, 210, 'F');
    
    // Border
    doc.setLineWidth(2);
    doc.setDrawColor(79, 70, 229); // Indigo-600
    doc.rect(10, 10, 277, 190);
    
    doc.setLineWidth(1);
    doc.setDrawColor(236, 72, 153); // Pink-500
    doc.rect(12, 12, 273, 186);

    // Title
    doc.setFontSize(40);
    doc.setTextColor(79, 70, 229);
    doc.text("Certificate of Achievement", 148.5, 50, { align: "center" });

    // Subtitle
    doc.setFontSize(20);
    doc.setTextColor(107, 114, 128); // Gray-500
    doc.text("This is to certify that", 148.5, 70, { align: "center" });

    // Name
    doc.setFontSize(35);
    doc.setTextColor(31, 41, 55); // Gray-800
    doc.text(`${userInfo.name} ${userInfo.surname}`, 148.5, 90, { align: "center" });

    // Institute
    doc.setFontSize(16);
    doc.setTextColor(107, 114, 128);
    doc.text(`from ${userInfo.institute}`, 148.5, 105, { align: "center" });

    // Achievement Text
    doc.setFontSize(20);
    doc.setTextColor(55, 65, 81); // Gray-700
    doc.text(`Has successfully completed the Quiz Competition`, 148.5, 130, { align: "center" });
    
    // Score
    doc.setFontSize(25);
    doc.setTextColor(79, 70, 229);
    doc.text(`Score: ${score} / ${totalQuestions * 10}`, 148.5, 145, { align: "center" }); 
    
    // Date
    const date = new Date().toLocaleDateString();
    doc.setFontSize(14);
    doc.setTextColor(156, 163, 175);
    doc.text(`Date: ${date}`, 148.5, 170, { align: "center" });

    // Footer
    doc.setFontSize(12);
    doc.text("Master Score System", 148.5, 190, { align: "center" });

    // Save
    doc.save(`${userInfo.name}_Certificate.pdf`);
};

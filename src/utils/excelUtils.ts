import * as XLSX from 'xlsx';
import type { Question } from '../store/useQuizStore';

// Define the shape of the Excel row for questions
interface QuestionRow {
    ID: number;
    Question: string;
    ChoiceA: string;
    ChoiceB: string;
    ChoiceC: string;
    ChoiceD: string;
    CorrectAnswer: string;
    Category?: string;
}

export const parseQuestionsExcel = (file: File): Promise<Question[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json<QuestionRow>(sheet);

                const questions: Question[] = jsonData.map((row) => ({
                    id: row.ID,
                    question: row.Question,
                    choices: [
                        String(row.ChoiceA),
                        String(row.ChoiceB),
                        String(row.ChoiceC),
                        String(row.ChoiceD)
                    ],
                    correctAnswer: String(row.CorrectAnswer),
                    category: row.Category || 'General Knowledge'
                })).filter(q => q.question && q.correctAnswer); // Basic validation

                resolve(questions);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsBinaryString(file);
    });
};

export const exportScorboardToExcel = (scores: any[]) => {
    const ws = XLSX.utils.json_to_sheet(scores);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Scoreboard");
    XLSX.writeFile(wb, "quiz_scoreboard.xlsx");
};

export const generateQuestionTemplate = () => {
    const headers = [
        { ID: 1, Question: "Example Question?", ChoiceA: "Option 1", ChoiceB: "Option 2", ChoiceC: "Option 3", ChoiceD: "Option 4", CorrectAnswer: "Option 1", Category: "General Knowledge" }
    ];
    const ws = XLSX.utils.json_to_sheet(headers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "question_template.xlsx");
};

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
    BarChart3,
    FileSpreadsheet,
    FileText,
    Users,
    TrendingUp,
    Trophy,
    ArrowLeft,
} from "lucide-react";
import { exportScorboardToExcel } from "../utils/excelUtils";
import { generatePDFReport } from "../utils/reportUtils";

interface ReportPageProps {
    onBack: () => void;
}

export function ReportPage({ onBack }: ReportPageProps) {
    const { t } = useTranslation();

    // Fetch data directly from local storage for analytics
    const scores = useMemo(() => {
        try {
            return JSON.parse(localStorage.getItem("quiz_scores") || "[]");
        } catch (e) {
            return [];
        }
    }, []);

    // Derived Statistics
    const stats = useMemo(() => {
        const total = scores.length;
        if (total === 0) return { total: 0, avg: 0, high: 0, bestCat: "-" };

        const sum = scores.reduce(
            (acc: number, curr: any) => acc + curr.score,
            0
        );
        const avg = (sum / total).toFixed(1);
        const high = Math.max(...scores.map((s: any) => s.score));

        // Category Analysis
        const catCounts: Record<string, number> = {};
        scores.forEach((s: any) => {
            const cat = s.selectedCategory || "General Knowledge";
            catCounts[cat] = (catCounts[cat] || 0) + 1;
        });
        const bestCat =
            Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
            "-";

        return { total, avg, high, bestCat };
    }, [scores]);

    const handleExportExcel = () => {
        exportScorboardToExcel(scores);
    };

    const handleExportPDF = () => {
        generatePDFReport(scores);
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {t("reportTitle")}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Real-time analytics and insights
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleExportExcel}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm"
                    >
                        <FileSpreadsheet size={18} />
                        {t("exportExcel")}
                    </button>
                    <button
                        onClick={handleExportPDF}
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-sm"
                    >
                        <FileText size={18} />
                        {t("exportPDF")}
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">
                            {t("totalPlayers")}
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                            {stats.total}
                        </p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">
                            {t("averageScore")}
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                            {stats.avg}
                        </p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                        <Trophy size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">
                            {t("highestScore")}
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                            {stats.high}
                        </p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                        <BarChart3 size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">
                            Popular Category
                        </p>
                        <p
                            className="text-xl font-bold text-gray-800 truncate max-w-[150px]"
                            title={stats.bestCat}
                        >
                            {stats.bestCat}
                        </p>
                    </div>
                </div>
            </div>

            {/* Recent Table (Mini) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <TrendingUp size={18} className="text-gray-400" />
                        {t("recentActivity")}
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Institute</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3 text-right">Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {scores
                                .slice()
                                .reverse()
                                .slice(0, 5)
                                .map((s: any, i: number) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="px-6 py-3 font-medium text-gray-800">
                                            {s.name} {s.surname}
                                        </td>
                                        <td className="px-6 py-3 text-gray-600">
                                            {s.institute}
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600">
                                                {s.selectedCategory ||
                                                    "General"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-right font-bold text-gray-800">
                                            {s.score}
                                        </td>
                                    </tr>
                                ))}
                            {scores.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-8 text-center text-gray-400"
                                    >
                                        No data available yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

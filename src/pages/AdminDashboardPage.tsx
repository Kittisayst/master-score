import { useRef, useState } from "react";
import { useQuizStore } from "../store/useQuizStore";
import {
    parseQuestionsExcel,
    exportScorboardToExcel,
    generateQuestionTemplate,
} from "../utils/excelUtils";
import {
    Settings,
    Upload,
    Download,
    Trash2,
    Save,
    FileSpreadsheet,
    LogOut,
    CheckCircle,
    RotateCcw,
    Monitor,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function AdminDashboardPage({ onLogout }: { onLogout: () => void }) {
    const { t } = useTranslation();
    const {
        questionTime,
        questionsPerSession,
        allQuestions,
        setQuestionTime,
        setQuestionsPerSession,
        setAllQuestions,
        resetScores,
        resetSettings,
    } = useQuizStore();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<{
        show: boolean;
        text: string;
        type: "success" | "error";
    }>({ show: false, text: "", type: "success" });

    // Local state for settings form
    const [time, setTime] = useState(questionTime);
    const [count, setCount] = useState(questionsPerSession);

    const showNotification = (
        text: string,
        type: "success" | "error" = "success"
    ) => {
        setMessage({ show: true, text, type });
        setTimeout(() => setMessage({ ...message, show: false }), 3000);
    };

    const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const questions = await parseQuestionsExcel(file);
            if (questions.length === 0)
                throw new Error("No valid questions found");

            setAllQuestions(questions);
            showNotification(t("importSuccess", { count: questions.length }));
        } catch (error) {
            console.error(error);
            showNotification(t("importFail"), "error");
        }

        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleExportResults = () => {
        const history = JSON.parse(localStorage.getItem("quiz_scores") || "[]");
        if (history.length === 0) {
            showNotification(t("noScoresExport"), "error");
            return;
        }
        exportScorboardToExcel(history);
        showNotification(t("exportSuccess"));
    };

    const handleSaveSettings = () => {
        setQuestionTime(time);
        setQuestionsPerSession(count);
        showNotification(t("settingsSaved"));
    };

    const handleResetScores = () => {
        if (confirm(t("confirmClear"))) {
            resetScores();
            showNotification(t("leaderboardCleared"));
        }
    };

    const handleResetDefaults = () => {
        if (confirm(t("confirmReset"))) {
            resetSettings();
            setTime(30); // Update local state to match default
            setCount(10); // Update local state to match default
            showNotification(t("settingsSaved"));
        }
    };

    return (
        <div className="p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Settings className="text-indigo-600" />
                    {t("adminDashboard")}
                </h2>
                <button
                    onClick={onLogout}
                    className="text-gray-500 hover:text-red-500 flex items-center gap-1 font-medium text-sm transition-colors"
                >
                    <LogOut size={16} /> {t("logout")}
                </button>
            </div>

            {message.show && (
                <div
                    className={`mb-6 p-3 rounded-lg flex items-center gap-2 ${
                        message.type === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    <CheckCircle size={18} />
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Data Management */}
                <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <FileSpreadsheet size={20} /> {t("dataManagement")}
                    </h3>

                    <div className="space-y-3">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImport}
                            accept=".xlsx,.xls"
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                        >
                            <Upload size={16} /> {t("importQuestions")}
                        </button>

                        <button
                            onClick={generateQuestionTemplate}
                            className="w-full bg-white border border-indigo-200 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                        >
                            <Download size={16} /> {t("downloadTemplate")}
                        </button>
                        <p className="text-xs text-gray-400 text-center">
                            {t("currentQuestions")} {allQuestions.length}
                        </p>

                        <button
                            onClick={handleExportResults}
                            className="w-full bg-white border border-green-200 text-green-700 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                        >
                            <Download size={16} /> {t("exportResults")}
                        </button>

                        <hr className="my-4 border-gray-200" />

                        <button
                            onClick={handleResetScores}
                            className="w-full bg-white border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                        >
                            <Trash2 size={16} /> {t("clearLeaderboard")}
                        </button>
                    </div>
                </section>

                {/* Game Settings */}
                <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <Settings size={20} /> {t("gameConfig")}
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                {t("timePerQuestion")}
                            </label>
                            <input
                                type="number"
                                value={time}
                                onChange={(e) =>
                                    setTime(Number(e.target.value))
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                {t("questionsPerSession")}
                            </label>
                            <input
                                type="number"
                                value={count}
                                onChange={(e) =>
                                    setCount(Number(e.target.value))
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        <button
                            onClick={handleSaveSettings}
                            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                        >
                            <Save size={16} /> {t("saveSettings")}
                        </button>

                        <button
                            onClick={handleResetDefaults}
                            className="w-full mt-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                        >
                            <RotateCcw size={16} /> {t("resetDefaults")}
                        </button>
                    </div>

                    <hr className="my-6 border-gray-100" />

                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <Monitor size={20} /> Layout Settings
                    </h3>

                    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                        <button
                            onClick={() =>
                                useQuizStore
                                    .getState()
                                    .setLayoutMode("standard")
                            }
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                                useQuizStore.getState().layoutMode ===
                                "standard"
                                    ? "bg-white text-indigo-600 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            Standard (Laptop)
                        </button>
                        <button
                            onClick={() =>
                                useQuizStore.getState().setLayoutMode("large")
                            }
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                                useQuizStore.getState().layoutMode === "large"
                                    ? "bg-white text-indigo-600 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            Large (Touch TV)
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import { Trophy, Play } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ScoreEntry {
    name: string;
    surname: string;
    institute: string;
    score: number;
    time: string; // ISO date
}

export function ScoreboardPage({
    onBack,
}: {
    onBack: (destination: "home") => void; // Kept as object for minimal change, or simplify
}) {
    const { t } = useTranslation();
    const [scores, setScores] = useState<ScoreEntry[]>([]);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem("quiz_scores") || "[]");
        // Sort by score (desc), then by date (desc) - usually time taken is better but we don't track time taken yet, just timestamp
        const sorted = history.sort((a: ScoreEntry, b: ScoreEntry) => {
            if (b.score !== a.score) return b.score - a.score;
            return new Date(b.time).getTime() - new Date(a.time).getTime();
        });
        setScores(sorted);
    }, []);

    return (
        <div className="p-8 h-full flex flex-col">
            <div className="flex flex-col items-center mb-6 gap-2">
                <img
                    src="/LOGO.png"
                    alt="College Logo"
                    className="h-24 w-auto object-contain drop-shadow-sm"
                />
                <h1 className="text-2xl md:text-3xl font-bold text-indigo-900 tracking-tight text-center">
                    {t("eventTitle")}
                </h1>
            </div>

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <Trophy className="text-yellow-500" size={32} />
                    {t("scoreboard")}
                    <span className="ml-4 text-sm font-normal bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                        {t("totalPlayers")}: {scores.length}
                    </span>
                </h2>
                <button
                    onClick={() => onBack("home")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2 shadow-md hover:scale-105 transform duration-200"
                >
                    <Play size={20} />
                    {t("startPlaying")}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm tracking-wider">
                            <th className="p-4 rounded-tl-lg">{t("rank")}</th>
                            <th className="p-4">{t("name")}</th>
                            <th className="p-4">{t("institute")}</th>
                            <th className="p-4 text-right rounded-tr-lg">
                                {t("score")}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {scores.map((entry, index) => (
                            <tr
                                key={index}
                                className={index < 3 ? "bg-yellow-50/50" : ""}
                            >
                                <td className="p-4 font-bold text-gray-500">
                                    {index === 0
                                        ? "🥇"
                                        : index === 1
                                        ? "🥈"
                                        : index === 2
                                        ? "🥉"
                                        : `#${index + 1}`}
                                </td>
                                <td className="p-4 font-medium text-gray-900">
                                    {entry.name} {entry.surname}
                                </td>
                                <td className="p-4 text-gray-500">
                                    {entry.institute}
                                </td>
                                <td className="p-4 text-right font-bold text-indigo-600">
                                    {entry.score}
                                </td>
                            </tr>
                        ))}
                        {scores.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="p-8 text-center text-gray-400"
                                >
                                    {t("noScores")}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

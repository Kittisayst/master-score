import { useQuizStore } from "../store/useQuizStore";
import {
    RefreshCcw,
    ListOrdered,
    Eye,
    Check,
    X,
    ArrowLeft,
    Download,
    Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { audioManager } from "../utils/audioManager";
import confetti from "canvas-confetti";
import { generateCertificate } from "../utils/certificateUtils";

export function SummaryPage({
    onViewScoreboard,
}: {
    onViewScoreboard: () => void;
}) {
    const { t } = useTranslation();
    const {
        score,
        questions,
        correctAnswersCount,
        restart,
        userAnswers,
        userInfo,
        gameMode,
        startChallenge,
    } = useQuizStore();
    const [showReview, setShowReview] = useState(false);

    // Calculate accuracy percentage
    const accuracy = Math.round((correctAnswersCount / questions.length) * 100);

    useEffect(() => {
        if (!showReview) {
            if (score > 0) {
                audioManager.playWin();
                // Launch confetti for a win
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ["#6366f1", "#a855f7", "#ec4899", "#facc15"],
                });
            } else audioManager.playCompletion();
        }
    }, [score, showReview]);

    if (showReview) {
        return (
            <section
                aria-label="Review Answers"
                className="p-4 md:p-8 h-full flex flex-col"
            >
                <header className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => setShowReview(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                        aria-label="Back to Summary"
                    >
                        <ArrowLeft size={24} className="text-gray-600" />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {t("reviewAnswers")}
                    </h2>
                </header>

                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    {questions.map((q, index) => {
                        const userAnswer = userAnswers.find(
                            (a) => a.questionId === q.id
                        );
                        const isCorrect = userAnswer?.isCorrect;

                        return (
                            <article
                                key={q.id}
                                className={`p-4 rounded-xl border-2 ${
                                    isCorrect
                                        ? "border-green-100 bg-green-50"
                                        : "border-red-100 bg-red-50"
                                }`}
                            >
                                <h3 className="font-semibold text-gray-800 mb-3 flex gap-2">
                                    <span className="text-gray-500">
                                        #{index + 1}
                                    </span>
                                    {q.question}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div
                                        className={`p-3 rounded-lg flex items-center justify-between ${
                                            isCorrect
                                                ? "bg-green-200 text-green-800 font-bold"
                                                : "bg-red-200 text-red-800"
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            {t("yourAnswer")}:{" "}
                                            {userAnswer?.answer || "-"}
                                        </span>
                                        {isCorrect ? (
                                            <Check size={18} />
                                        ) : (
                                            <X size={18} />
                                        )}
                                    </div>
                                    {!isCorrect && (
                                        <div className="p-3 rounded-lg bg-green-100 text-green-800 font-bold flex items-center gap-2">
                                            <Check size={18} />
                                            {t("correct")}: {q.correctAnswer}
                                        </div>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        );
    }
    return (
        <section
            aria-label="Quiz Summary"
            className="p-12 text-center flex flex-col items-center justify-center h-full"
        >
            <header className="mb-6">
                <div className="w-40 h-40 rounded-full bg-indigo-100 flex flex-col items-center justify-center mx-auto mb-6 shadow-inner relative group">
                    <span className="text-sm text-indigo-400 font-semibold uppercase tracking-wide">
                        {t("totalScore")}
                    </span>
                    <span className="text-5xl font-bold text-indigo-600">
                        {score}
                    </span>
                </div>

                <div className="mb-4">
                    <span className="text-2xl font-bold text-gray-800">
                        {correctAnswersCount} / {questions.length}
                    </span>
                    <span className="text-gray-500 ml-2">
                        {t("correctAnswers")}
                    </span>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {t("quizCompleted")}
                </h2>
                <p className="text-gray-500">
                    {accuracy >= 80
                        ? t("outstanding")
                        : accuracy >= 50
                        ? t("goodJob")
                        : t("keepPracticing")}
                </p>
            </header>

            <div className="flex flex-col gap-3 w-full max-w-2xl">
                <div className="flex gap-3 w-full">
                    <button
                        onClick={restart}
                        className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-semibold transition shadow-md"
                    >
                        <RefreshCcw size={20} />
                        {t("playAgain")}
                    </button>
                    <button
                        onClick={onViewScoreboard}
                        className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-indigo-100 hover:border-indigo-300 text-indigo-700 px-4 py-3 rounded-lg font-semibold transition"
                    >
                        <ListOrdered size={20} />
                        {t("viewScoreboard")}
                    </button>
                </div>

                {/* Standard Mode: Show Review, Play Again, Scoreboard */}

                <button
                    onClick={() => setShowReview(true)}
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold transition"
                >
                    <Eye size={20} />
                    {t("reviewAnswers")}
                </button>

                {/* Challenge Unlock Logic */}
                {gameMode === "standard" && accuracy >= 80 && (
                    <div className="w-full pt-4 border-t border-gray-100 mt-2">
                        <p className="text-sm text-center text-gray-500 mb-2">
                            {t("challengeIntro")}
                        </p>
                        <button
                            onClick={startChallenge}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-3 rounded-lg font-semibold transition shadow-lg animate-pulse"
                        >
                            <Trophy size={20} />
                            {t("startChallenge")}
                        </button>
                    </div>
                )}

                {/* Challenge Success: Download Button */}
                {gameMode === "challenge" && accuracy >= 80 && userInfo && (
                    <div className="w-full pt-4 border-t border-gray-100 mt-2">
                        <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center mb-3 font-bold">
                            {t("challengeSuccess")}
                        </div>
                        <button
                            onClick={() =>
                                generateCertificate(
                                    userInfo,
                                    score,
                                    questions.length
                                )
                            }
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-4 py-3 rounded-lg font-semibold transition shadow-md"
                        >
                            <Download size={20} />
                            {t("downloadCertificate")}
                        </button>
                    </div>
                )}

                {/* Challenge Failed */}
                {gameMode === "challenge" && accuracy < 80 && (
                    <div className="w-full pt-4 border-t border-gray-100 mt-2">
                        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center mb-3 font-bold">
                            {t("challengeFailed")}
                        </div>
                        <p className="text-sm text-gray-500 text-center">
                            {t("tryAgain")}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

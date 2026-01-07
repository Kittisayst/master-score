import { useEffect, useState } from "react";
import { useQuizStore } from "../store/useQuizStore";
import { Timer, HelpCircle, Flame, Trophy } from "lucide-react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { audioManager } from "../utils/audioManager";

export function QuizPage() {
    const { t } = useTranslation();
    const {
        questions,
        currentQuestionIndex,
        timeLeft,
        answerQuestion,
        tickTimer,
        streak,
        gameMode,
    } = useQuizStore();

    const [isShaking, setIsShaking] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    useEffect(() => {
        const timer = setInterval(() => {
            tickTimer();
            if (timeLeft <= 5 && timeLeft > 0) {
                audioManager.playClick(); // Warning tick
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [tickTimer, timeLeft]);

    const handleAnswer = (choice: string) => {
        if (choice === currentQuestion.correctAnswer) {
            audioManager.playCorrect();
            answerQuestion(choice);
        } else {
            // Shake effect for wrong answer
            audioManager.playWrong();
            setIsShaking(true);
            setTimeout(() => {
                setIsShaking(false);
                answerQuestion(choice);
            }, 500); // Wait for shake to finish before moving on (optional, but better UX)
        }
    };

    if (!currentQuestion) return <div>Loading...</div>;

    const progress = (currentQuestionIndex / questions.length) * 100;

    return (
        <div
            className={clsx(
                "p-8 h-full flex flex-col",
                isShaking && "animate-shake"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                {gameMode === "challenge" && (
                    <div className="absolute top-4 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse border border-yellow-200 shadow-sm z-10">
                        <Trophy size={14} />
                        {t("challengeMode")}
                    </div>
                )}{" "}
                <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                    <HelpCircle size={24} />
                    <div className="flex flex-col">
                        <span>
                            {t("question")} {currentQuestionIndex + 1} /{" "}
                            {questions.length}
                        </span>
                        {gameMode === "challenge" && (
                            <span className="text-xs text-yellow-600 font-bold flex items-center gap-1">
                                <Trophy size={12} /> {t("challengeMode")}
                            </span>
                        )}
                    </div>
                </div>
                <div
                    className={clsx(
                        "flex items-center gap-2 font-bold text-xl px-4 py-2 rounded-full",
                        timeLeft <= 10
                            ? "bg-red-100 text-red-600 animate-pulse"
                            : "bg-indigo-50 text-indigo-600"
                    )}
                >
                    <Timer size={24} />
                    <span>{timeLeft}s</span>
                </div>
                {streak >= 3 && (
                    <div className="flex items-center gap-1 font-bold text-orange-500 animate-bounce">
                        <Flame size={24} fill="currentColor" />
                        <span>x{streak}</span>
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Question */}
            <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center leading-snug">
                    {currentQuestion.question}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.choices.map((choice, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(choice)}
                            className="p-6 text-lg font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 transform hover:scale-[1.02] shadow-sm active:scale-95 text-left"
                        >
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-sm font-bold text-gray-500 group-hover:bg-indigo-200 group-hover:text-indigo-700">
                                    {String.fromCharCode(65 + index)}
                                </span>
                                {choice}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

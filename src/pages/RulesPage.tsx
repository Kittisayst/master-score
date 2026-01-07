import { ArrowLeft, BookOpen, Trophy, Award, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

export function RulesPage({ onBack }: { onBack: () => void }) {
    const { t } = useTranslation();

    const rules = [
        {
            icon: <BookOpen className="text-blue-500" size={32} />,
            title: t("rule1Title"),
            desc: t("rule1Desc"),
            color: "bg-blue-50 border-blue-100",
        },
        {
            icon: <Trophy className="text-yellow-500" size={32} />,
            title: t("rule2Title"),
            desc: t("rule2Desc"),
            color: "bg-yellow-50 border-yellow-100",
        },
        {
            icon: <Award className="text-purple-500" size={32} />,
            title: t("rule3Title"),
            desc: t("rule3Desc"),
            color: "bg-purple-50 border-purple-100",
        },
        {
            icon: <Star className="text-pink-500" size={32} />,
            title: t("rule4Title"),
            desc: t("rule4Desc"),
            color: "bg-pink-50 border-pink-100",
        },
    ];

    return (
        <div className="p-8 md:p-12 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                    <ArrowLeft size={24} className="text-gray-600" />
                </button>
                <h1 className="text-3xl font-bold text-gray-800">
                    {t("howToPlay")}
                </h1>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rules.map((rule, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-2xl border-2 ${rule.color} shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}
                        >
                            <div className="mb-4 bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-sm">
                                {rule.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {rule.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {rule.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-indigo-50 p-6 rounded-2xl border border-indigo-100 text-center">
                    <h3 className="text-lg font-bold text-indigo-800 mb-2">
                        Developer Note 👨‍💻
                    </h3>
                    <p className="text-indigo-600">{t("developer")}</p>
                </div>
            </div>
        </div>
    );
}

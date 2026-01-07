import { useState } from "react";
import { useQuizStore } from "../store/useQuizStore";
import {
    Play,
    Info,
    Calculator,
    FlaskConical,
    Cpu,
    Leaf,
    Globe2,
    Lightbulb,
    Layers,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const CATEGORIES = [
    {
        id: "All",
        icon: Layers,
        color: "bg-pink-100 text-pink-600 border-pink-200",
    },
    {
        id: "Mathematics",
        icon: Calculator,
        color: "bg-blue-100 text-blue-600 border-blue-200",
    },
    {
        id: "Science",
        icon: FlaskConical,
        color: "bg-purple-100 text-purple-600 border-purple-200",
    },
    {
        id: "Technology",
        icon: Cpu,
        color: "bg-indigo-100 text-indigo-600 border-indigo-200",
    },
    {
        id: "Environment",
        icon: Leaf,
        color: "bg-green-100 text-green-600 border-green-200",
    },
    {
        id: "Culture",
        icon: Globe2,
        color: "bg-orange-100 text-orange-600 border-orange-200",
    },
    {
        id: "General Knowledge",
        icon: Lightbulb,
        color: "bg-yellow-100 text-yellow-600 border-yellow-200",
    },
];

export function RegisterPage({ onInfoClick }: { onInfoClick: () => void }) {
    const { t } = useTranslation();
    const registerUser = useQuizStore((state) => state.registerUser);
    const startQuiz = useQuizStore((state) => state.startQuiz);

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        institute: "",
        selectedCategory: "All",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            formData.name &&
            formData.surname &&
            formData.institute &&
            formData.selectedCategory
        ) {
            registerUser(formData);
            startQuiz();
        } else {
            // Maybe show error if category not selected
            alert(t("selectCategory"));
        }
    };

    return (
        <section
            aria-labelledby="register-heading"
            className="p-4 md:p-8 text-center h-full flex flex-col"
        >
            <header className="mb-4">
                <h1
                    id="register-heading"
                    className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1"
                >
                    {t("registerTitle")}
                </h1>
                <p className="text-gray-500 text-sm">{t("registerSubtitle")}</p>
            </header>

            <form
                onSubmit={handleSubmit}
                className="max-w-4xl mx-auto space-y-4 w-full flex-1 flex flex-col"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder={t("enterInstitute")}
                        value={formData.institute}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                institute: e.target.value,
                            })
                        }
                    />
                    <div className="flex gap-3">
                        <input
                            type="text"
                            required
                            className="w-1/2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder={t("enterFirstName")}
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                        />
                        <input
                            type="text"
                            required
                            className="w-1/2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder={t("enterLastName")}
                            value={formData.surname}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    surname: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto min-h-[200px] border-t border-gray-100 pt-4">
                    <label className="block text-left text-sm font-bold text-gray-700 mb-3 px-1">
                        {t("selectCategory")}
                    </label>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 pb-2 px-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        selectedCategory: cat.id,
                                    })
                                }
                                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all duration-200 ${
                                    formData.selectedCategory === cat.id
                                        ? `${cat.color} border-current ring-2 ring-offset-1 ring-indigo-200 bg-opacity-100 scale-105 shadow-md`
                                        : "bg-white border-gray-100 text-gray-400 hover:border-gray-300 hover:bg-gray-50 bg-opacity-50"
                                }`}
                            >
                                <cat.icon size={28} />
                                <span className={`text-sm font-semibold`}>
                                    {t("cat_" + cat.id)}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                    <button
                        type="submit"
                        disabled={!formData.selectedCategory}
                        className={`w-full bg-indigo-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform ${
                            !formData.selectedCategory
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-indigo-700 hover:scale-[1.01] active:scale-95"
                        }`}
                    >
                        <Play size={20} className="fill-current" />
                        {t("startQuiz")}
                    </button>

                    <button
                        type="button"
                        onClick={onInfoClick}
                        className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition"
                    >
                        <Info size={18} />
                        {t("howToPlay")}
                    </button>
                </div>
            </form>
        </section>
    );
}

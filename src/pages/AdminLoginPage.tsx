import { useState } from "react";
import { Lock } from "lucide-react";
import { useTranslation } from "react-i18next";

export function AdminLoginPage({
    onLogin,
    onBack,
}: {
    onLogin: () => void;
    onBack: () => void;
}) {
    const { t } = useTranslation();
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === "1234") {
            onLogin();
        } else {
            setError(true);
            setPin("");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 h-full">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="text-gray-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {t("adminAccess")}
                </h2>
                <p className="text-gray-500 mb-6">{t("enterPin")}</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        maxLength={4}
                        value={pin}
                        onChange={(e) => {
                            setPin(e.target.value);
                            setError(false);
                        }}
                        className="w-full text-center text-3xl tracking-[1em] font-bold p-3 border-b-2 border-indigo-200 focus:border-indigo-600 outline-none mb-4 transition-colors"
                        placeholder="••••"
                        autoFocus
                    />
                    {error && (
                        <p className="text-red-500 text-sm mb-4">
                            {t("incorrectPin")}
                        </p>
                    )}

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onBack}
                            className="flex-1 py-3 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition"
                        >
                            {t("cancel")}
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                        >
                            {t("enter")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

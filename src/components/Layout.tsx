import clsx from "clsx";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Settings, Volume2, VolumeX, BarChart3 } from "lucide-react";
import { audioManager } from "../utils/audioManager";
import { useState } from "react";
import { useQuizStore } from "../store/useQuizStore";

interface LayoutProps {
    children: ReactNode;
    className?: string;
    onAdminClick?: () => void;
    onReportClick?: () => void;
}

export function Layout({
    children,
    className,
    onAdminClick,
    onReportClick,
}: LayoutProps) {
    const { t, i18n } = useTranslation();
    const [isMuted, setIsMuted] = useState(audioManager.isAudioMuted());
    const layoutMode = useQuizStore((state) => state.layoutMode);

    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "lo" : "en";
        i18n.changeLanguage(newLang);
    };

    const toggleSound = () => {
        const newState = !isMuted;
        setIsMuted(newState);
        audioManager.setMuted(newState);
        if (!newState) audioManager.playClick();
    };

    // Dynamic classes based on layout mode
    const isLarge = layoutMode === "large";

    // Wrapper: Full screen no padding in large mode
    const wrapperClasses = isLarge
        ? "p-0 h-screen w-screen overflow-hidden justify-start"
        : "p-4 min-h-screen justify-center";

    // Card: Responsive width, fixed height concept preserved but responsive
    // Old: w-[65vw]
    // New: w-[95vw] md:w-[85vw] lg:w-[75vw] xl:w-[65vw]
    const cardClasses = isLarge
        ? "w-[95vw] md:w-[85vw] lg:w-[75vw] xl:w-[65vw] h-full rounded-none shadow-none mb-0"
        : "w-[95vw] md:w-[85vw] lg:w-[75vw] xl:w-[65vw] h-[85vh] rounded-2xl shadow-2xl mb-6";

    // Footer: Absolute bottom in large mode
    const footerClasses = isLarge
        ? "absolute bottom-0 w-full p-2 text-center text-xs text-gray-400 bg-white/90 backdrop-blur border-t border-gray-100"
        : "text-white/90 text-center text-sm font-medium drop-shadow-md pb-4";

    return (
        <div
            role="application"
            className={clsx(
                "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center relative transition-all duration-300",
                wrapperClasses
            )}
        >
            <header className="absolute top-4 right-4 flex items-center gap-2 z-50">
                <button
                    onClick={toggleSound}
                    className={clsx(
                        "backdrop-blur-sm p-2 rounded-full border transition-all font-medium",
                        isLarge
                            ? "bg-gray-100/50 hover:bg-gray-200/50 text-gray-600 border-gray-200"
                            : "bg-white/20 hover:bg-white/30 text-white border-white/30"
                    )}
                    title={isMuted ? "Unmute" : "Mute"}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                {onReportClick && (
                    <button
                        onClick={onReportClick}
                        className={clsx(
                            "backdrop-blur-sm p-2 rounded-full border transition-all font-medium",
                            isLarge
                                ? "bg-gray-100/50 hover:bg-gray-200/50 text-gray-600 border-gray-200"
                                : "bg-white/20 hover:bg-white/30 text-white border-white/30"
                        )}
                        title="Reports"
                        aria-label="Reports"
                    >
                        <BarChart3 size={18} />
                    </button>
                )}

                {onAdminClick && (
                    <button
                        onClick={onAdminClick}
                        className={clsx(
                            "backdrop-blur-sm p-2 rounded-full border transition-all font-medium",
                            isLarge
                                ? "bg-gray-100/50 hover:bg-gray-200/50 text-gray-600 border-gray-200"
                                : "bg-white/20 hover:bg-white/30 text-white border-white/30"
                        )}
                        title="Admin Settings"
                        aria-label="Admin Settings"
                    >
                        <Settings size={18} />
                    </button>
                )}
                <button
                    onClick={toggleLanguage}
                    className={clsx(
                        "backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 border transition-all font-medium",
                        isLarge
                            ? "bg-gray-100/50 hover:bg-gray-200/50 text-gray-600 border-gray-200"
                            : "bg-white/20 hover:bg-white/30 text-white border-white/30"
                    )}
                    aria-label="Toggle Language"
                >
                    <Globe size={18} />
                    {i18n.language === "en" ? "LA" : "EN"}
                </button>
            </header>

            <main
                className={clsx(
                    "bg-white/95 backdrop-blur overflow-hidden flex flex-col transition-all duration-300 ease-in-out",
                    cardClasses,
                    className
                )}
            >
                {children}
            </main>
            <footer className={footerClasses}>
                <p>{t("developer")}</p>
                <p className="text-xs opacity-80 mt-1">{t("phone")}</p>
            </footer>
        </div>
    );
}

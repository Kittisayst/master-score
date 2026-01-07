import { useState } from "react";
import { Layout } from "./components/Layout";
import { RegisterPage } from "./pages/RegisterPage";
import { QuizPage } from "./pages/QuizPage";
import { SummaryPage } from "./pages/SummaryPage";
import { ScoreboardPage } from "./pages/ScoreboardPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { RulesPage } from "./pages/RulesPage";
import { ReportPage } from "./pages/ReportPage";
import { useQuizStore } from "./store/useQuizStore";
import { useTranslation } from "react-i18next";

function App() {
    const { t } = useTranslation();
    const status = useQuizStore((state) => state.status);

    // Local view state to toggle scoreboard
    const [view, setView] = useState<
        | "home"
        | "scoreboard"
        | "adminLevel1"
        | "adminLevel2"
        | "rules"
        | "report"
    >("scoreboard");

    // Persist intent (where to go after login)
    const [postLoginView, setPostLoginView] = useState<
        "adminLevel2" | "report"
    >("adminLevel2");

    const restart = useQuizStore((state) => state.restart);

    const handleAdminClick = () => {
        setPostLoginView("adminLevel2");
        setView("adminLevel1");
    };

    const handleReportClick = () => {
        setPostLoginView("report");
        setView("adminLevel1");
    };

    const renderContent = () => {
        if (view === "scoreboard") {
            return (
                <ScoreboardPage
                    onBack={() => {
                        restart(); // Reset to idle so we go to RegisterPage
                        setView("home");
                    }}
                />
            );
        }

        if (view === "adminLevel1") {
            return (
                <AdminLoginPage
                    onLogin={() => setView(postLoginView)}
                    onBack={() => setView("scoreboard")}
                />
            );
        }

        if (view === "adminLevel2") {
            return (
                <AdminDashboardPage onLogout={() => setView("scoreboard")} />
            );
        }

        if (view === "rules") {
            return <RulesPage onBack={() => setView("home")} />;
        }

        if (view === "report") {
            return <ReportPage onBack={() => setView("scoreboard")} />;
        }

        switch (status) {
            case "idle":
                return (
                    <>
                        <RegisterPage onInfoClick={() => setView("rules")} />
                        <div className="text-center pb-4">
                            <button
                                onClick={() => setView("scoreboard")}
                                className="text-sm text-indigo-600 hover:underline"
                            >
                                {t("viewScoreboard")}
                            </button>
                        </div>
                    </>
                );
            case "playing":
                return <QuizPage />;
            case "finished":
                return (
                    <SummaryPage
                        onViewScoreboard={() => setView("scoreboard")}
                    />
                );
            default:
                return <div>Unknown State</div>;
        }
    };

    return (
        <Layout
            onAdminClick={handleAdminClick}
            onReportClick={handleReportClick}
        >
            {renderContent()}
        </Layout>
    );
}

export default App;

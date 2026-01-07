import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  en: {
    translation: {
      "scoreboard": "Leaderboard",
      "backToHome": "Back to Home",
      "startPlaying": "Start Playing",
      "rank": "Rank",
      "name": "Name",
      "institute": "Institute",
      "score": "Score",
      "noScores": "No scores yet. Be the first to play!",
      "eventTitle": "45th College Event",
      
      "registerTitle": "Quiz Master",
      "registerSubtitle": "Enter your details to start the challenge",
      "enterInstitute": "Institute / Organization",
      "enterFirstName": "First Name",
      "enterLastName": "Last Name",
      "startQuiz": "Start Quiz",
      
      "question": "Question",
      "choiceA": "A",
      "choiceB": "B",
      "choiceC": "C",
      "choiceD": "D",
      
      "quizCompleted": "Quiz Completed!",
      "totalScore": "Total Score",
      "correctAnswers": "Correct Answers",
      "playAgain": "Play Again",
      "viewScoreboard": "Scoreboard", 
      "startChallenge": "Challenge for Certificate 🏆",
      "challengeMode": "Challenge Mode",
      "challengeFailed": "Challenge Failed",
      "tryAgain": "Try Again",
      "challengeSuccess": "Challenge Passed! 🎉",
      "challengeIntro": "Get 4/5 (80%) correct to unlock certificate!",
      "outstanding": "Outstanding Performance! 🌟",
      "goodJob": "Good Job! 👍",
      "keepPracticing": "Keep Practicing! 💪",
      
      "totalPlayers": "Total Participants",
      "developer": "Developed by: Mr. Kittisay Sengtong | Luang Prabang Technical and Vocational College",
      "phone": "Tel: 020 97717015",

      // Admin Login
      "adminAccess": "Admin Access",
      "enterPin": "Enter PIN to configure quiz settings",
      "incorrectPin": "Incorrect PIN",
      "cancel": "Cancel",
      "enter": "Enter",

      // Admin Dashboard
      "adminDashboard": "Admin Dashboard",
      "logout": "Logout",
      "dataManagement": "Data Management",
      "importQuestions": "Import Questions",
      "downloadTemplate": "Download Template",
      "currentQuestions": "Current Questions:",
      "exportResults": "Export Results",
      "clearLeaderboard": "Clear Leaderboard",
      "gameConfig": "Game Config",
      "timePerQuestion": "Time per Question (seconds)",
      "questionsPerSession": "Questions per Session",
      "saveSettings": "Save Settings",
      "resetDefaults": "Reset Defaults",
      
      // Notifications
      "importSuccess": "Successfully imported {{count}} questions!",
      "importFail": "Failed to import. Check format.",
      "noScoresExport": "No scores to export",
      "exportSuccess": "Scoreboard exported!",
      "settingsSaved": "Settings saved!",
      "leaderboardCleared": "Leaderboard cleared!",
      "confirmClear": "Are you sure you want to delete ALL scores? This cannot be undone.",
      "confirmReset": "Reset all settings and questions to default? This cannot be undone.",
      
      // Rules Page
      "howToPlay": "How to Play",
      "gameRules": "Game Rules",
      "rule1Title": "Standard Round",
      "rule1Desc": "Answer 10 questions. 30s limit. Points = Correct + Time Left.",
      "rule2Title": "Challenge Mode",
      "rule2Desc": "Score 80%+ to unlock the Challenge Round: 5 Qs, 15s limit!",
      "rule3Title": "Earn Certificate",
      "rule3Desc": "Pass the Challenge Mode with 80% score to get your Certificate.",
      "rule4Title": "Leaderboard",
      "rule4Desc": "Compete for the highest score on the global leaderboard.",

      // Categories
      "selectCategory": "Select Category",
      "cat_Mathematics": "Mathematics",
      "cat_Science": "Science",
      "cat_Technology": "Technology",
      "cat_Environment": "Environment",
      "cat_Culture": "Culture",
      "cat_General Knowledge": "General Knowledge",
      "cat_All": "All Categories",

      // Report
      "reportTitle": "Summary Report",
      "averageScore": "Average Score",
      "highestScore": "Highest Score",
      "exportExcel": "Export Excel",
      "exportPDF": "Export PDF",
      "categoryDist": "Category Distribution",
      "scoreDist": "Score Distribution",
      "recentActivity": "Recent Activity"
    }
  },
  lo: {
    translation: {
      "scoreboard": "ຕາຕະລາງຄະແນນ",
      "backToHome": "ກັບໄປໜ້າຫຼັກ",
      "startPlaying": "ເລີ່ມຫຼິ້ນເກມ",
      "rank": "ອັນດັບ",
      "name": "ຊື່ ແລະ ນາມສະກຸນ",
      "institute": "ສະຖາບັນ / ພາກສ່ວນ",
      "score": "ຄະແນນ",
      "noScores": "ຍັງບໍ່ມີຄະແນນ. ມາຫຼິ້ນເປັນຄົນທຳອິດເລີຍ!",
      "eventTitle": "ງານ 45 ປີ ວິທະຍາໄລ",
      
      "registerTitle": "Quiz Master",
      "registerSubtitle": "ປ້ອນຂໍ້ມູນຂອງທ່ານເພື່ອເລີ່ມການທົດສອບ",
      "enterInstitute": "ສະຖາບັນ / ພາກສ່ວນ",
      "enterFirstName": "ຊື່",
      "enterLastName": "ນາມສະກຸນ",
      "startQuiz": "ເລີ່ມຕອບຄຳຖາມ",
      
      "question": "ຄຳຖາມທີ",
      "choiceA": "ກ",
      "choiceB": "ຂ",
      "choiceC": "ຄ",
      "choiceD": "ງ",
      
      "quizCompleted": "ການທົດສອບສຳເລັດ!",
      "totalScore": "ຄະແນນລວມ",
      "correctAnswers": "ຕອບຖືກ",
      "playAgain": "ຫຼິ້ນອີກຄັ້ງ",
      "viewScoreboard": "ເບິ່ງຄະແນນ",
      "reviewAnswers": "ເບິ່ງຄຳຕອບຄືນ",
      "yourAnswer": "ຄຳຕອບຂອງທ່ານ",
      "correct": "ຄຳຕອບທີ່ຖືກຕ້ອງ",
      "downloadCertificate": "ດາວໂຫຼດໃບຢັ້ງຢືນ",
      "startChallenge": "ທົດສອບຊິງໃບຢັ້ງຢືນ 🏆",
      "challengeMode": "ໂຫມດທົດສອບພິເສດ",
      "challengeFailed": "ການທົດສອບບໍ່ຜ່ານ",
      "tryAgain": "ລອງໃໝ່ອີກຄັ້ງ",
      "challengeSuccess": "ຍິນດີນຳ! ຜ່ານການທົດສອບ 🎉",
      "challengeIntro": "ຕອບຖືກ 4 ໃນ 5 ຂໍ້ (80%) ເພື່ອຮັບໃບຢັ້ງຢືນ!",
      "outstanding": "ຜົນງານຍອດຢ້ຽມ! 🌟",
      "goodJob": "ເຮັດໄດ້ດີຫຼາຍ! 👍",
      "keepPracticing": "ພະຍາຍາມຕື່ມອີກເດີ! 💪",

      "totalPlayers": "ຜູ້ເຂົ້າຮ່ວມທັງໝົດ",
      "developer": "ພັດທະນາໂດຍ: ອາຈານ ກິດຕິໄຊ ແສງທອງ | ວິທະຍາໄລ ເຕັກນິກ-ວິຊາຊີບ ຫຼວງພະບາງ",
      "phone": "ໂທ: 020 97717015",

      // Admin Login
      "adminAccess": "ເຂົ້າສູ່ລະບົບຜູ້ຄວບຄຸມ",
      "enterPin": "ປ້ອນລະຫັດ PIN ເພື່ອຕັ້ງຄ່າ",
      "incorrectPin": "ລະຫັດ PIN ບໍ່ຖືກຕ້ອງ",
      "cancel": "ຍົກເລີກ",
      "enter": "ຕົກລົງ",

      // Admin Dashboard
      "adminDashboard": "ໜ້າຜູ້ຄວບຄຸມລະບົບ",
      "logout": "ອອກຈາກລະບົບ",
      "dataManagement": "ຈັດການຂໍ້ມູນ",
      "importQuestions": "ນຳເຂົ້າຄຳຖາມ",
      "downloadTemplate": "ດາວໂຫຼດແບບຟອມ",
      "currentQuestions": "ຈຳນວນຄຳຖາມປັດຈຸບັນ:",
      "exportResults": "ສົ່ງອອກຄະແນນ",
      "clearLeaderboard": "ລ້າງຄະແນນທັງໝົດ",
      "gameConfig": "ຕັ້ງຄ່າເກມ",
      "timePerQuestion": "ເວລາຕໍ່ຄຳຖາມ (ວິນາທີ)",
      "questionsPerSession": "ຈຳນວນຄຳຖາມຕໍ່ຮອບ",
      "saveSettings": "ບັນທຶກການຕັ້ງຄ່າ",

      // Notifications
      "importSuccess": "ນຳເຂົ້າສຳເລັດ {{count}} ຄຳຖາມ!",
      "importFail": "ນຳເຂົ້າບໍ່ສຳເລັດ. ກະລຸນາກວດສອບໄຟລ໌.",
      "noScoresExport": "ບໍ່ມີຄະແນນທີ່ຈະສົ່ງອອກ",
      "exportSuccess": "ສົ່ງອອກຕາຕະລາງຄະແນນສຳເລັດ!",
      "settingsSaved": "ບັນທຶກການຕັ້ງຄ່າສຳເລັດ!",
      "leaderboardCleared": "ລ້າງຕາຕະລາງຄະແນນສຳເລັດ!",
      "confirmClear": "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບຄະແນນທັງໝົດ? ການກະທຳນີ້ບໍ່ສາມາດຍ້ອນກັບໄດ້.",
      "confirmReset": "ຕ້ອງການຄືນຄ່າການຕັ້ງຄ່າ ແລະ ຄຳຖາມທັງໝົດເປັນຄ່າເລີ່ມຕົ້ນບໍ່?",

      // Rules Page
      "howToPlay": "ວິທີການຫຼິ້ນ",
      "gameRules": "ກົດລະບຽບ ແລະ ເງື່ອນໄຂ",
      "rule1Title": "ຕອບຄຳຖາມທົ່ວໄປ",
      "rule1Desc": "ຕອບ 10 ຄຳຖາມ. ມີເວລາ 30 ວິນາທີຕໍ່ຂໍ້. ຕອບຖືກໄດ້ຄະແນນ + ເວລາທີ່ເຫຼືອ.",
      "rule2Title": "ໂຫມດທ້າທາຍ (Challenge)",
      "rule2Desc": "ຫາກໄດ້ຄະແນນ 80% ຂຶ້ນໄປ, ປົດລັອກໂຫມດພິເສດ: 5 ຂໍ້, 15 ວິນາທີ!",
      "rule3Title": "ຮັບໃບຢັ້ງຢືນ",
      "rule3Desc": "ຜ່ານໂຫມດທ້າທາຍດ້ວຍຄະແນນ 80% ເພື່ອຮັບໃບຢັ້ງຢືນສຸດພິເສດ.",
      "rule4Title": "ການຈັດອັນດັບ",
      "rule4Desc": "ຄະແນນຂອງທ່ານຈະຖືກບັນທຶກລົງໃນຕາຕະລາງຄະແນນລວມ.",

      // Categories
      "selectCategory": "ເລືອກໝວດໝູ່",
      "cat_Mathematics": "ຄະນິດສາດ",
      "cat_Science": "ວິທະຍາສາດ",
      "cat_Technology": "ເຕັກໂນໂລຊີ",
      "cat_Environment": "ສິ່ງແວດລ້ອມ",
      "cat_Culture": "ວັດທະນະທຳ",
      "cat_General Knowledge": "ຄວາມຮູ້ທົ່ວໄປ",
      "cat_All": "ທັງໝົດ",

      // Report
      "reportTitle": "ບົດລາຍງານສະຫຼຸບ",
      "averageScore": "ຄະແນນສະເລ່ຍ",
      "highestScore": "ຄະແນນສູງສຸດ",
      "exportExcel": "ສົ່ງອອກ Excel",
      "exportPDF": "ສົ່ງອອກ PDF",
      "categoryDist": "ການແຈກຢາຍໝວດໝູ່",
      "scoreDist": "ການແຈກຢາຍຄະແນນ",
      "recentActivity": "ການເຄື່ອນໄຫວລ່າສຸດ"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "lo", // Default to Lao
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;

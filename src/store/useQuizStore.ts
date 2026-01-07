import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import defaultQuestions from '../data/questions.json';

// Define types
export interface Question {
  id: number;
  question: string;
  choices: string[];
  correctAnswer: string;
  category?: string; // Optional for backward compatibility, but we should fill it
}

export interface UserInfo {
  name: string;
  surname: string;
  institute: string;
  selectedCategory: string; // Add selected category
}

interface QuizState {
  status: 'idle' | 'playing' | 'finished';
  userInfo: UserInfo | null;
  questions: Question[];
  allQuestions: Question[];
  
  // Settings
  questionTime: number;
  questionsPerSession: number;

  currentQuestionIndex: number;
  score: number;
  correctAnswersCount: number;
  streak: number; 
  userAnswers: { questionId: number, answer: string, isCorrect: boolean }[];
  timeLeft: number;
  timerActive: boolean;
  gameMode: 'standard' | 'challenge';
  layoutMode: 'standard' | 'large';
  
  // Actions
  registerUser: (info: UserInfo) => void;
  startQuiz: () => void;
  startChallenge: () => void;
  answerQuestion: (selectedAnswer: string) => void;
  tickTimer: () => void;
  restart: () => void;

  setLayoutMode: (mode: 'standard' | 'large') => void;
  
  // Admin Actions
  setAllQuestions: (questions: Question[]) => void;
  setQuestionTime: (seconds: number) => void;
  setQuestionsPerSession: (count: number) => void;
  resetScores: () => void;
  resetSettings: () => void;
}

// Helper to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      status: 'idle',
      userInfo: null,
      questions: [],
      allQuestions: defaultQuestions,
      
      questionTime: 30,
      questionsPerSession: 10,

      currentQuestionIndex: 0,
      score: 0,
      correctAnswersCount: 0,
      streak: 0,
      userAnswers: [],
      timeLeft: 30,
      timerActive: false,
      gameMode: 'standard',
      layoutMode: 'standard',

      registerUser: (info) => set({ userInfo: info }),

      setLayoutMode: (mode) => set({ layoutMode: mode }),

      startQuiz: () => {
        const { allQuestions, questionsPerSession, questionTime, userInfo } = get();
        
        let filteredQuestions = allQuestions;
        if (userInfo?.selectedCategory && userInfo.selectedCategory !== 'All') {
            filteredQuestions = allQuestions.filter(q => q.category === userInfo.selectedCategory);
            if (filteredQuestions.length === 0) {
                console.warn(`No questions found for category: ${userInfo.selectedCategory}. Using all questions.`);
                filteredQuestions = allQuestions;
            }
        }

        const shuffled = shuffleArray(filteredQuestions).slice(0, questionsPerSession); 
        
        set({
          status: 'playing',
          gameMode: 'standard',
          questions: shuffled,
          currentQuestionIndex: 0,
          score: 0,
          correctAnswersCount: 0,
          streak: 0,
          userAnswers: [],
          timeLeft: questionTime,
          timerActive: true,
        });
      },

      startChallenge: () => {
          const { allQuestions, userInfo } = get();
          
          let filteredQuestions = allQuestions;
          if (userInfo?.selectedCategory && userInfo.selectedCategory !== 'All') {
             filteredQuestions = allQuestions.filter(q => q.category === userInfo.selectedCategory);
              if (filteredQuestions.length === 0) filteredQuestions = allQuestions;
          }

          const shuffled = shuffleArray(filteredQuestions).slice(0, 5); 
          
          set({
            status: 'playing',
            gameMode: 'challenge',
            questions: shuffled,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswersCount: 0,
            streak: 0,
            userAnswers: [],
            timeLeft: 15,
            timerActive: true,
          });
      },

      answerQuestion: (selectedAnswer) => {
        const { questions, currentQuestionIndex, score, correctAnswersCount, timeLeft, questionTime, streak, userAnswers } = get();
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        
        const newUserAnswers = [
            ...userAnswers,
            { questionId: currentQuestion.id, answer: selectedAnswer, isCorrect }
        ];
        
        let newStreak = isCorrect ? streak + 1 : 0;
        let bonus = 0;

        if (isCorrect) {
            bonus = timeLeft;
            if (newStreak >= 3) {
                bonus += 5 * Math.floor(newStreak / 3);
            }
        }

        const pointsEarned = isCorrect ? (10 + bonus) : 0;
        const newScore = score + pointsEarned;
        const newCorrectCount = isCorrect ? correctAnswersCount + 1 : correctAnswersCount;

        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex >= questions.length) {
          set({
            score: newScore,
            correctAnswersCount: newCorrectCount,
            streak: newStreak,
            userAnswers: newUserAnswers,
            status: 'finished',
            timerActive: false,
          });
          
          const history = JSON.parse(localStorage.getItem('quiz_scores') || '[]');
          history.push({
            ...get().userInfo,
            score: newScore,
            time: new Date().toISOString(),
          });
          localStorage.setItem('quiz_scores', JSON.stringify(history));

        } else {
          const nextTime = get().gameMode === 'challenge' ? 15 : questionTime;

          set({
            score: newScore,
            correctAnswersCount: newCorrectCount,
            streak: newStreak,
            userAnswers: newUserAnswers,
            currentQuestionIndex: nextIndex,
            timeLeft: nextTime,
          });
        }
      },

      tickTimer: () => {
        const { timeLeft, timerActive, answerQuestion } = get();
        if (!timerActive) return;

        if (timeLeft <= 1) {
          answerQuestion(''); 
        } else {
          set({ timeLeft: timeLeft - 1 });
        }
      },

      restart: () => {
        const { questionTime } = get();
        set({
          status: 'idle',
          currentQuestionIndex: 0,
          score: 0,
          correctAnswersCount: 0,
          timeLeft: questionTime,
          timerActive: false,
        });
      },

      setAllQuestions: (newQuestions) => {
          set({ allQuestions: newQuestions });
      },
      setQuestionTime: (seconds) => {
          set({ questionTime: seconds });
      },
      setQuestionsPerSession: (count) => {
          set({ questionsPerSession: count });
      },
      resetScores: () => {
          localStorage.removeItem('quiz_scores');
      },
      resetSettings: () => {
          set({
              questionTime: 30,
              questionsPerSession: 10,
              allQuestions: defaultQuestions,
              layoutMode: 'standard'
          });
          window.location.reload();
      }
    }),
    {
      name: 'quiz-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
          status: state.status,
          userInfo: state.userInfo,
          questions: state.questions,
          allQuestions: state.allQuestions,
          questionTime: state.questionTime,
          questionsPerSession: state.questionsPerSession,
          currentQuestionIndex: state.currentQuestionIndex,
          score: state.score,
          correctAnswersCount: state.correctAnswersCount,
          streak: state.streak,
          userAnswers: state.userAnswers,
          timeLeft: state.timeLeft,
          timerActive: state.timerActive,
          gameMode: state.gameMode,
          layoutMode: state.layoutMode,
      }),
    }
  )
);

import Icon from "@/components/ui/icon";

export type IconName = Parameters<typeof Icon>[0]["name"];
export type Tab = "subjects" | "tests" | "check" | "reference";

export const SUBJECTS: { id: string; name: string; icon: IconName; color: string; tests: number; done: number }[] = [
  { id: "math", name: "Математика", icon: "Calculator", color: "purple", tests: 24, done: 9 },
  { id: "russian", name: "Русский язык", icon: "BookOpen", color: "cyan", tests: 18, done: 14 },
  { id: "physics", name: "Физика", icon: "Zap", color: "orange", tests: 20, done: 4 },
  { id: "chemistry", name: "Химия", icon: "FlaskConical", color: "pink", tests: 16, done: 2 },
  { id: "history", name: "История", icon: "Landmark", color: "green", tests: 22, done: 7 },
  { id: "biology", name: "Биология", icon: "Leaf", color: "cyan", tests: 15, done: 11 },
  { id: "geography", name: "География", icon: "Globe", color: "orange", tests: 14, done: 5 },
  { id: "informatics", name: "Информатика", icon: "Monitor", color: "purple", tests: 12, done: 6 },
];

export const COLOR_MAP: Record<string, string> = {
  purple: "neon-border-purple",
  cyan: "neon-border-cyan",
  orange: "neon-border-orange",
  pink: "neon-border-pink",
  green: "neon-border-cyan",
};

export const COLOR_TEXT: Record<string, string> = {
  purple: "text-purple-400",
  cyan: "text-cyan-400",
  orange: "text-orange-400",
  pink: "text-pink-400",
  green: "text-emerald-400",
};

export const COLOR_BG: Record<string, string> = {
  purple: "bg-purple-500/10",
  cyan: "bg-cyan-500/10",
  orange: "bg-orange-500/10",
  pink: "bg-pink-500/10",
  green: "bg-emerald-500/10",
};

export const COLOR_PROGRESS: Record<string, string> = {
  purple: "bg-gradient-to-r from-purple-500 to-pink-500",
  cyan: "bg-gradient-to-r from-cyan-500 to-emerald-400",
  orange: "bg-gradient-to-r from-orange-500 to-amber-400",
  pink: "bg-gradient-to-r from-pink-500 to-rose-400",
  green: "bg-gradient-to-r from-emerald-500 to-cyan-400",
};

export const MATH_QUESTIONS = [
  {
    id: 1,
    theme: "Алгебра",
    question: "Решите уравнение: 2x² - 5x + 3 = 0",
    options: ["x = 1 и x = 1,5", "x = 2 и x = 3", "x = -1 и x = -1,5", "x = 0 и x = 2,5"],
    correct: 0,
    explanation: "По формуле дискриминанта: D = 25 - 24 = 1. x₁ = (5+1)/4 = 1,5; x₂ = (5-1)/4 = 1",
  },
  {
    id: 2,
    theme: "Геометрия",
    question: "Площадь прямоугольника 48 см². Одна сторона 8 см. Найдите периметр.",
    options: ["28 см", "32 см", "22 см", "40 см"],
    correct: 0,
    explanation: "Вторая сторона = 48 / 8 = 6 см. Периметр = 2(8+6) = 28 см.",
  },
  {
    id: 3,
    theme: "Проценты",
    question: "В классе 25 учеников. 12 из них — девочки. Какой % мальчиков?",
    options: ["48%", "52%", "40%", "60%"],
    correct: 1,
    explanation: "Мальчиков: 25 - 12 = 13. Процент: 13/25 × 100% = 52%",
  },
];

export const REFERENCES: { subject: string; topic: string; icon: IconName; color: string }[] = [
  { subject: "Математика", topic: "Формулы квадратных уравнений", icon: "Calculator", color: "purple" },
  { subject: "Русский", topic: "Правила пунктуации", icon: "BookOpen", color: "cyan" },
  { subject: "Физика", topic: "Основные формулы механики", icon: "Zap", color: "orange" },
  { subject: "Химия", topic: "Таблица растворимости", icon: "FlaskConical", color: "pink" },
  { subject: "История", topic: "Хронология ключевых дат", icon: "Landmark", color: "green" },
  { subject: "Биология", topic: "Строение клетки", icon: "Leaf", color: "cyan" },
];

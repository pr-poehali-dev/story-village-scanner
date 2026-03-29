import { useState } from "react";
import Icon from "@/components/ui/icon";

type IconName = Parameters<typeof Icon>[0]["name"];

const SUBJECTS: { id: string; name: string; icon: IconName; color: string; tests: number; done: number }[] = [
  { id: "math", name: "Математика", icon: "Calculator", color: "purple", tests: 24, done: 9 },
  { id: "russian", name: "Русский язык", icon: "BookOpen", color: "cyan", tests: 18, done: 14 },
  { id: "physics", name: "Физика", icon: "Zap", color: "orange", tests: 20, done: 4 },
  { id: "chemistry", name: "Химия", icon: "FlaskConical", color: "pink", tests: 16, done: 2 },
  { id: "history", name: "История", icon: "Landmark", color: "green", tests: 22, done: 7 },
  { id: "biology", name: "Биология", icon: "Leaf", color: "cyan", tests: 15, done: 11 },
  { id: "geography", name: "География", icon: "Globe", color: "orange", tests: 14, done: 5 },
  { id: "informatics", name: "Информатика", icon: "Monitor", color: "purple", tests: 12, done: 6 },
];

const COLOR_MAP: Record<string, string> = {
  purple: "neon-border-purple",
  cyan: "neon-border-cyan",
  orange: "neon-border-orange",
  pink: "neon-border-pink",
  green: "neon-border-cyan",
};

const COLOR_TEXT: Record<string, string> = {
  purple: "text-purple-400",
  cyan: "text-cyan-400",
  orange: "text-orange-400",
  pink: "text-pink-400",
  green: "text-emerald-400",
};

const COLOR_BG: Record<string, string> = {
  purple: "bg-purple-500/10",
  cyan: "bg-cyan-500/10",
  orange: "bg-orange-500/10",
  pink: "bg-pink-500/10",
  green: "bg-emerald-500/10",
};

const COLOR_PROGRESS: Record<string, string> = {
  purple: "bg-gradient-to-r from-purple-500 to-pink-500",
  cyan: "bg-gradient-to-r from-cyan-500 to-emerald-400",
  orange: "bg-gradient-to-r from-orange-500 to-amber-400",
  pink: "bg-gradient-to-r from-pink-500 to-rose-400",
  green: "bg-gradient-to-r from-emerald-500 to-cyan-400",
};

const MATH_QUESTIONS = [
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

const REFERENCES: { subject: string; topic: string; icon: IconName; color: string }[] = [
  { subject: "Математика", topic: "Формулы квадратных уравнений", icon: "Calculator", color: "purple" },
  { subject: "Русский", topic: "Правила пунктуации", icon: "BookOpen", color: "cyan" },
  { subject: "Физика", topic: "Основные формулы механики", icon: "Zap", color: "orange" },
  { subject: "Химия", topic: "Таблица растворимости", icon: "FlaskConical", color: "pink" },
  { subject: "История", topic: "Хронология ключевых дат", icon: "Landmark", color: "green" },
  { subject: "Биология", topic: "Строение клетки", icon: "Leaf", color: "cyan" },
];

type Tab = "subjects" | "tests" | "check" | "reference";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("subjects");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const totalTests = SUBJECTS.reduce((s, x) => s + x.tests, 0);
  const totalDone = SUBJECTS.reduce((s, x) => s + x.done, 0);
  const overallPercent = Math.round((totalDone / totalTests) * 100);

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === MATH_QUESTIONS[currentQ].correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentQ < MATH_QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setSelectedSubject(null);
    setActiveTab("subjects");
  };

  const startTest = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setActiveTab("tests");
  };

  const tabs: { id: Tab; label: string; icon: IconName }[] = [
    { id: "subjects", label: "Предметы", icon: "BookMarked" },
    { id: "tests", label: "Тесты", icon: "ClipboardList" },
    { id: "check", label: "Проверка", icon: "CheckCircle" },
    { id: "reference", label: "Справочник", icon: "Library" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background glow blobs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 left-0 w-64 h-64 bg-pink-500/6 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-white/5 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-glow">
              <Icon name="GraduationCap" size={18} className="text-white" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-white leading-none">
                ОГЭ <span className="gradient-text-purple">Подготовка</span>
              </h1>
              <p className="text-xs text-muted-foreground">Твой путь к пятёрке</p>
            </div>
          </div>
          <div className="flex items-center gap-2 glass-card rounded-xl px-3 py-1.5">
            <Icon name="Flame" size={14} className="text-orange-400" />
            <span className="text-sm font-semibold text-white">{overallPercent}%</span>
            <span className="text-xs text-muted-foreground">готов</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 pb-28 pt-6">

        {/* SUBJECTS TAB */}
        {activeTab === "subjects" && (
          <div className="space-y-6 animate-fade-in">
            <div className="glass-card neon-border-purple rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-muted-foreground text-sm">Общий прогресс</p>
                  <p className="text-3xl font-display font-bold gradient-text-purple">{overallPercent}%</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold text-lg">{totalDone}/{totalTests}</p>
                  <p className="text-muted-foreground text-xs">тестов пройдено</p>
                </div>
              </div>
              <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full progress-bar-fill"
                  style={{ width: `${overallPercent}%` }}
                />
              </div>
            </div>

            <div>
              <h2 className="text-white font-display font-semibold text-lg mb-3">Выбери предмет</h2>
              <div className="grid grid-cols-2 gap-3">
                {SUBJECTS.map((subj, i) => {
                  const pct = Math.round((subj.done / subj.tests) * 100);
                  return (
                    <button
                      key={subj.id}
                      onClick={() => startTest(subj.id)}
                      className={`glass-card ${COLOR_MAP[subj.color]} rounded-2xl p-4 text-left hover:scale-105 transition-all duration-200 animate-fade-in stagger-${Math.min(i + 1, 6)}`}
                    >
                      <div className={`w-10 h-10 rounded-xl ${COLOR_BG[subj.color]} flex items-center justify-center mb-3`}>
                        <Icon name={subj.icon} size={20} className={COLOR_TEXT[subj.color]} />
                      </div>
                      <p className="text-white font-semibold text-sm leading-tight mb-1">{subj.name}</p>
                      <p className="text-muted-foreground text-xs mb-2">{subj.done}/{subj.tests} тестов</p>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${COLOR_PROGRESS[subj.color]} rounded-full progress-bar-fill`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className={`text-xs font-bold mt-1 ${COLOR_TEXT[subj.color]}`}>{pct}%</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-white font-display font-semibold text-lg mb-3">Статистика</h2>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { label: "Пройдено", value: totalDone, icon: "CheckCircle2" as IconName, color: "text-emerald-400" },
                  { label: "Осталось", value: totalTests - totalDone, icon: "Clock" as IconName, color: "text-orange-400" },
                  { label: "Предметов", value: SUBJECTS.length, icon: "BookMarked" as IconName, color: "text-purple-400" },
                ]).map((stat, i) => (
                  <div key={i} className="glass-card rounded-2xl p-4 text-center">
                    <Icon name={stat.icon} size={20} className={`${stat.color} mx-auto mb-2`} />
                    <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
                    <p className="text-muted-foreground text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TESTS TAB */}
        {activeTab === "tests" && (
          <div className="animate-fade-in">
            {!selectedSubject ? (
              <div className="space-y-4">
                <h2 className="text-white font-display font-semibold text-xl">Выбери предмет для теста</h2>
                {SUBJECTS.map((subj) => (
                  <button
                    key={subj.id}
                    onClick={() => startTest(subj.id)}
                    className={`w-full glass-card ${COLOR_MAP[subj.color]} rounded-2xl p-4 flex items-center gap-4 hover:scale-[1.02] transition-all`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${COLOR_BG[subj.color]} flex items-center justify-center shrink-0`}>
                      <Icon name={subj.icon} size={22} className={COLOR_TEXT[subj.color]} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white font-semibold">{subj.name}</p>
                      <p className="text-muted-foreground text-sm">{subj.tests} вариантов</p>
                    </div>
                    <Icon name="ChevronRight" size={18} className="text-muted-foreground" />
                  </button>
                ))}
              </div>
            ) : finished ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-scale-in">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 animate-glow">
                  <Icon name="Trophy" size={40} className="text-white" />
                </div>
                <h2 className="text-3xl font-display font-bold gradient-text-purple mb-2">Тест завершён!</h2>
                <p className="text-muted-foreground mb-6">Правильных ответов</p>
                <div className="glass-card neon-border-purple rounded-2xl px-12 py-6 mb-8">
                  <p className="text-6xl font-display font-bold text-white">
                    {score}<span className="text-muted-foreground text-3xl">/{MATH_QUESTIONS.length}</span>
                  </p>
                  <p className={`text-lg font-semibold mt-2 ${score === MATH_QUESTIONS.length ? "text-emerald-400" : score > 0 ? "text-orange-400" : "text-red-400"}`}>
                    {score === MATH_QUESTIONS.length ? "Отлично! 🎉" : score > 1 ? "Хорошо! Продолжай" : "Нужно повторить"}
                  </p>
                </div>
                <button
                  onClick={handleRestart}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Вернуться к предметам
                </button>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <button onClick={() => setSelectedSubject(null)} className="flex items-center gap-1 text-muted-foreground hover:text-white transition-colors">
                    <Icon name="ArrowLeft" size={16} />
                    <span className="text-sm">Назад</span>
                  </button>
                  <div className="glass-card rounded-xl px-3 py-1.5 flex items-center gap-2">
                    <Icon name="HelpCircle" size={14} className="text-purple-400" />
                    <span className="text-sm text-white font-medium">{currentQ + 1} / {MATH_QUESTIONS.length}</span>
                  </div>
                </div>

                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full progress-bar-fill"
                    style={{ width: `${((currentQ + 1) / MATH_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <div className="glass-card neon-border-purple rounded-2xl p-5">
                  <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-lg">
                    {MATH_QUESTIONS[currentQ].theme}
                  </span>
                  <p className="text-white font-semibold text-lg mt-3 leading-relaxed">
                    {MATH_QUESTIONS[currentQ].question}
                  </p>
                </div>

                <div className="space-y-3">
                  {MATH_QUESTIONS[currentQ].options.map((opt, idx) => {
                    const isCorrect = idx === MATH_QUESTIONS[currentQ].correct;
                    const isSelected = idx === selected;
                    let cls = "w-full glass-card rounded-2xl p-4 text-left flex items-center gap-4 transition-all duration-300 ";
                    if (!answered) {
                      cls += "hover:border-purple-500/50 hover:scale-[1.01] cursor-pointer";
                    } else if (isCorrect) {
                      cls += "border-emerald-500/50 bg-emerald-500/10";
                    } else if (isSelected && !isCorrect) {
                      cls += "border-red-500/50 bg-red-500/10";
                    }
                    return (
                      <button key={idx} onClick={() => handleAnswer(idx)} className={cls} disabled={answered}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm
                          ${!answered ? "bg-white/5 text-muted-foreground" :
                            isCorrect ? "bg-emerald-500 text-white" :
                            isSelected ? "bg-red-500 text-white" : "bg-white/5 text-muted-foreground"}`}>
                          {answered && isCorrect ? "✓" : answered && isSelected && !isCorrect ? "✗" : String.fromCharCode(65 + idx)}
                        </div>
                        <span className={`font-medium ${answered && isCorrect ? "text-emerald-400" : answered && isSelected ? "text-red-400" : "text-white"}`}>
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {answered && (
                  <div className="glass-card border-emerald-500/20 rounded-2xl p-4 bg-emerald-500/5 animate-fade-in">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Lightbulb" size={16} className="text-emerald-400" />
                      <span className="text-emerald-400 font-semibold text-sm">Объяснение</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{MATH_QUESTIONS[currentQ].explanation}</p>
                  </div>
                )}

                {answered && (
                  <button
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 rounded-2xl hover:opacity-90 transition-opacity animate-fade-in"
                  >
                    {currentQ < MATH_QUESTIONS.length - 1 ? "Следующий вопрос →" : "Завершить тест"}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* CHECK ANSWERS TAB */}
        {activeTab === "check" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-white font-display font-semibold text-xl mb-1">Проверка ответов</h2>
              <p className="text-muted-foreground text-sm">Введи номер задания и свой ответ</p>
            </div>

            <div className="glass-card neon-border-purple rounded-2xl p-5 space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Предмет</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors">
                  {SUBJECTS.map((s) => <option key={s.id} value={s.id} className="bg-gray-900">{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Номер задания</label>
                <input
                  type="text"
                  placeholder="Например: 5"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Твой ответ</label>
                <input
                  type="text"
                  placeholder="Введи ответ..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity">
                Проверить ответ
              </button>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Icon name="History" size={16} className="text-purple-400" />
                Последние проверки
              </h3>
              {[
                { task: "Задание 3 — Математика", answer: "12", status: "correct" },
                { task: "Задание 7 — Русский язык", answer: "нисходящий", status: "wrong" },
                { task: "Задание 1 — Физика", answer: "60", status: "correct" },
              ].map((item, i) => (
                <div key={i} className={`glass-card rounded-2xl p-4 mb-3 flex items-center gap-4 ${item.status === "correct" ? "border-emerald-500/20" : "border-red-500/20"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.status === "correct" ? "bg-emerald-500/15" : "bg-red-500/15"}`}>
                    <Icon name={item.status === "correct" ? "Check" : "X"} size={18} className={item.status === "correct" ? "text-emerald-400" : "text-red-400"} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{item.task}</p>
                    <p className="text-muted-foreground text-xs">Ответ: {item.answer}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${item.status === "correct" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                    {item.status === "correct" ? "Верно" : "Неверно"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REFERENCE TAB */}
        {activeTab === "reference" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-white font-display font-semibold text-xl mb-1">Справочные материалы</h2>
              <p className="text-muted-foreground text-sm">Формулы, правила, таблицы</p>
            </div>

            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск по материалам..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>

            <div className="space-y-3">
              {REFERENCES.map((ref, i) => (
                <button
                  key={i}
                  className={`w-full glass-card ${COLOR_MAP[ref.color]} rounded-2xl p-4 flex items-center gap-4 hover:scale-[1.01] transition-all animate-fade-in stagger-${Math.min(i + 1, 6)}`}
                >
                  <div className={`w-12 h-12 rounded-xl ${COLOR_BG[ref.color]} flex items-center justify-center shrink-0`}>
                    <Icon name={ref.icon} size={22} className={COLOR_TEXT[ref.color]} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-muted-foreground text-xs mb-0.5">{ref.subject}</p>
                    <p className="text-white font-semibold text-sm">{ref.topic}</p>
                  </div>
                  <Icon name="ChevronRight" size={18} className="text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>

            <div className="glass-card neon-border-cyan rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Star" size={16} className="text-cyan-400" />
                <span className="text-cyan-400 text-sm font-semibold">Формула дня</span>
              </div>
              <p className="text-muted-foreground text-xs mb-1">Математика — Алгебра</p>
              <p className="text-white font-semibold mb-2">Дискриминант квадратного уравнения</p>
              <div className="bg-white/5 rounded-xl px-4 py-3 text-center">
                <p className="text-2xl font-display font-bold gradient-text-cyan">D = b² − 4ac</p>
              </div>
              <p className="text-muted-foreground text-xs mt-3">
                Если D &gt; 0 — два корня, D = 0 — один корень, D &lt; 0 — нет вещественных корней
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-white/5">
        <div className="max-w-2xl mx-auto flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedSubject(null); }}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-all duration-200 ${activeTab === tab.id ? "text-purple-400" : "text-muted-foreground hover:text-white"}`}
            >
              <div className={`relative transition-all duration-200 ${activeTab === tab.id ? "scale-110" : ""}`}>
                <Icon name={tab.icon} size={22} />
                {activeTab === tab.id && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full" />
                )}
              </div>
              <span className={`text-xs font-medium ${activeTab === tab.id ? "text-purple-400" : ""}`}>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
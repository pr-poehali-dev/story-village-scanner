import { useState } from "react";
import Icon from "@/components/ui/icon";
import { SUBJECTS, MATH_QUESTIONS, type Tab, type IconName } from "@/components/ogeData";
import TabSubjects from "@/components/TabSubjects";
import TabTests from "@/components/TabTests";
import { TabCheck, TabReference } from "@/components/TabCheckReference";

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
        {activeTab === "subjects" && (
          <TabSubjects
            totalTests={totalTests}
            totalDone={totalDone}
            overallPercent={overallPercent}
            onStartTest={startTest}
          />
        )}

        {activeTab === "tests" && (
          <TabTests
            selectedSubject={selectedSubject}
            currentQ={currentQ}
            selected={selected}
            answered={answered}
            score={score}
            finished={finished}
            onStartTest={startTest}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onRestart={handleRestart}
            onBack={() => setSelectedSubject(null)}
          />
        )}

        {activeTab === "check" && <TabCheck />}

        {activeTab === "reference" && <TabReference />}
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

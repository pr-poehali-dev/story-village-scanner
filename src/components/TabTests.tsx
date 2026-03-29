import Icon from "@/components/ui/icon";
import { SUBJECTS, MATH_QUESTIONS, COLOR_MAP, COLOR_TEXT, COLOR_BG } from "@/components/ogeData";

interface TabTestsProps {
  selectedSubject: string | null;
  currentQ: number;
  selected: number | null;
  answered: boolean;
  score: number;
  finished: boolean;
  onStartTest: (subjectId: string) => void;
  onAnswer: (idx: number) => void;
  onNext: () => void;
  onRestart: () => void;
  onBack: () => void;
}

export default function TabTests({
  selectedSubject,
  currentQ,
  selected,
  answered,
  score,
  finished,
  onStartTest,
  onAnswer,
  onNext,
  onRestart,
  onBack,
}: TabTestsProps) {
  if (!selectedSubject) {
    return (
      <div className="space-y-4 animate-fade-in">
        <h2 className="text-white font-display font-semibold text-xl">Выбери предмет для теста</h2>
        {SUBJECTS.map((subj) => (
          <button
            key={subj.id}
            onClick={() => onStartTest(subj.id)}
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
    );
  }

  if (finished) {
    return (
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
          onClick={onRestart}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          Вернуться к предметам
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground hover:text-white transition-colors">
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
            <button key={idx} onClick={() => onAnswer(idx)} className={cls} disabled={answered}>
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
          onClick={onNext}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 rounded-2xl hover:opacity-90 transition-opacity animate-fade-in"
        >
          {currentQ < MATH_QUESTIONS.length - 1 ? "Следующий вопрос →" : "Завершить тест"}
        </button>
      )}
    </div>
  );
}

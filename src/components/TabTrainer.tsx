import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { SUBJECTS, TRAINER_TASKS, COLOR_MAP, COLOR_TEXT, COLOR_BG } from "@/components/ogeData";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export default function TabTrainer() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [tasks, setTasks] = useState<typeof TRAINER_TASKS["math"]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<null | "like" | "dislike">(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const startTrainer = (subjectId: string) => {
    const raw = TRAINER_TASKS[subjectId] ?? [];
    setTasks(shuffle(raw));
    setSelectedSubject(subjectId);
    setCurrentIdx(0);
    setUserAnswer("");
    setChecked(false);
    setIsCorrect(false);
    setShowHint(false);
    setScore(0);
    setFinished(false);
    setFeedback(null);
    setFeedbackSent(false);
  };

  useEffect(() => {
    if (selectedSubject && !finished && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIdx, selectedSubject, finished]);

  const handleCheck = () => {
    if (!userAnswer.trim() || checked) return;
    const correct = normalize(userAnswer) === normalize(tasks[currentIdx].answer);
    setIsCorrect(correct);
    setChecked(true);
    if (correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentIdx < tasks.length - 1) {
      setCurrentIdx((i) => i + 1);
      setUserAnswer("");
      setChecked(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      setFinished(true);
    }
  };

  const handleFeedback = (val: "like" | "dislike") => {
    setFeedback(val);
    setFeedbackSent(true);
  };

  if (!selectedSubject) {
    return (
      <div className="space-y-4 animate-fade-in">
        <div>
          <h2 className="text-white font-display font-semibold text-xl mb-1">Тренажёр</h2>
          <p className="text-muted-foreground text-sm">Введи ответ вручную — как на настоящем экзамене</p>
        </div>
        {SUBJECTS.map((subj) => {
          const count = (TRAINER_TASKS[subj.id] ?? []).length;
          return (
            <button
              key={subj.id}
              onClick={() => startTrainer(subj.id)}
              className={`w-full glass-card ${COLOR_MAP[subj.color]} rounded-2xl p-4 flex items-center gap-4 hover:scale-[1.02] transition-all`}
            >
              <div className={`w-12 h-12 rounded-xl ${COLOR_BG[subj.color]} flex items-center justify-center shrink-0`}>
                <Icon name={subj.icon} size={22} className={COLOR_TEXT[subj.color]} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white font-semibold">{subj.name}</p>
                <p className="text-muted-foreground text-sm">{count} задания</p>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Icon name="PenLine" size={16} />
                <span className="text-xs">ввод ответа</span>
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  if (finished) {
    const percent = Math.round((score / tasks.length) * 100);
    const subj = SUBJECTS.find((s) => s.id === selectedSubject);
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-scale-in gap-5">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center animate-glow">
          <Icon name="PenLine" size={38} className="text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-display font-bold gradient-text-purple mb-1">Тренажёр пройден!</h2>
          <p className="text-muted-foreground text-sm">{subj?.name}</p>
        </div>
        <div className="glass-card neon-border-purple rounded-2xl px-12 py-6">
          <p className="text-6xl font-display font-bold text-white">
            {score}<span className="text-muted-foreground text-3xl">/{tasks.length}</span>
          </p>
          <p className={`text-lg font-semibold mt-2 ${percent === 100 ? "text-emerald-400" : percent >= 60 ? "text-orange-400" : "text-red-400"}`}>
            {percent === 100 ? "Идеально! 🎉" : percent >= 60 ? "Хороший результат!" : "Нужно повторить"}
          </p>
        </div>

        {!feedbackSent ? (
          <div className="glass-card rounded-2xl p-5 w-full max-w-sm">
            <p className="text-white font-semibold mb-3 text-sm">Понравился тренажёр?</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleFeedback("like")}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all font-semibold text-sm"
              >
                <Icon name="ThumbsUp" size={18} /> Да, полезно
              </button>
              <button
                onClick={() => handleFeedback("dislike")}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all font-semibold text-sm"
              >
                <Icon name="ThumbsDown" size={18} /> Нет
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-4 w-full max-w-sm flex items-center gap-3">
            <Icon name={feedback === "like" ? "Heart" : "MessageCircle"} size={20} className={feedback === "like" ? "text-emerald-400" : "text-orange-400"} />
            <p className="text-muted-foreground text-sm">
              {feedback === "like" ? "Спасибо! Рады, что помогли 🚀" : "Спасибо за честность — будем улучшать!"}
            </p>
          </div>
        )}

        <div className="flex gap-3 w-full max-w-sm">
          <button
            onClick={() => startTrainer(selectedSubject)}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Ещё раз
          </button>
          <button
            onClick={() => setSelectedSubject(null)}
            className="flex-1 glass-card text-white font-semibold py-3 rounded-xl hover:bg-white/5 transition-all"
          >
            Другой предмет
          </button>
        </div>
      </div>
    );
  }

  const task = tasks[currentIdx];

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setSelectedSubject(null)}
          className="flex items-center gap-1 text-muted-foreground hover:text-white transition-colors"
        >
          <Icon name="ArrowLeft" size={16} />
          <span className="text-sm">Назад</span>
        </button>
        <div className="glass-card rounded-xl px-3 py-1.5 flex items-center gap-2">
          <Icon name="PenLine" size={14} className="text-cyan-400" />
          <span className="text-sm text-white font-medium">{currentIdx + 1} / {tasks.length}</span>
        </div>
      </div>

      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
          style={{ width: `${((currentIdx + 1) / tasks.length) * 100}%` }}
        />
      </div>

      <div className="glass-card neon-border-cyan rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-lg">
            {task.theme}
          </span>
          <span className="text-xs text-muted-foreground ml-auto">
            Счёт: {score}/{currentIdx + (checked ? 1 : 0)}
          </span>
        </div>
        <p className="text-white font-semibold text-lg leading-relaxed">{task.question}</p>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !checked) handleCheck(); }}
            disabled={checked}
            placeholder="Введи ответ..."
            className={`w-full bg-white/5 border rounded-2xl px-5 py-4 text-white placeholder:text-muted-foreground focus:outline-none transition-all text-base font-medium
              ${!checked ? "border-white/10 focus:border-cyan-500/50" :
                isCorrect ? "border-emerald-500/60 bg-emerald-500/8" : "border-red-500/60 bg-red-500/8"}`}
          />
          {checked && (
            <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center
              ${isCorrect ? "bg-emerald-500" : "bg-red-500"}`}>
              <Icon name={isCorrect ? "Check" : "X"} size={14} className="text-white" />
            </div>
          )}
        </div>

        {!checked && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan-400 transition-colors"
          >
            <Icon name="Lightbulb" size={13} />
            {showHint ? "Скрыть подсказку" : "Показать подсказку"}
          </button>
        )}

        {showHint && !checked && (
          <div className="glass-card border-cyan-500/20 rounded-xl p-3 bg-cyan-500/5 animate-fade-in">
            <p className="text-cyan-300 text-sm">💡 {task.hint}</p>
          </div>
        )}
      </div>

      {!checked ? (
        <button
          onClick={handleCheck}
          disabled={!userAnswer.trim()}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-4 rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Проверить ответ
        </button>
      ) : (
        <>
          <div className={`glass-card rounded-2xl p-4 animate-fade-in ${isCorrect ? "border-emerald-500/20 bg-emerald-500/5" : "border-red-500/20 bg-red-500/5"}`}>
            <div className="flex items-center gap-2 mb-2">
              <Icon name={isCorrect ? "CheckCircle" : "XCircle"} size={16} className={isCorrect ? "text-emerald-400" : "text-red-400"} />
              <span className={`font-semibold text-sm ${isCorrect ? "text-emerald-400" : "text-red-400"}`}>
                {isCorrect ? "Верно!" : `Правильный ответ: ${task.answer}`}
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{task.explanation}</p>
          </div>
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-4 rounded-2xl hover:opacity-90 transition-opacity animate-fade-in"
          >
            {currentIdx < tasks.length - 1 ? "Следующее задание →" : "Завершить тренажёр"}
          </button>
        </>
      )}
    </div>
  );
}

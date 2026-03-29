import Icon from "@/components/ui/icon";
import { SUBJECTS, COLOR_MAP, COLOR_TEXT, COLOR_BG, COLOR_PROGRESS } from "@/components/ogeData";

interface TabSubjectsProps {
  totalTests: number;
  totalDone: number;
  overallPercent: number;
  onStartTest: (subjectId: string) => void;
}

export default function TabSubjects({ totalTests, totalDone, overallPercent, onStartTest }: TabSubjectsProps) {
  return (
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
                onClick={() => onStartTest(subj.id)}
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
            { label: "Пройдено", value: totalDone, icon: "CheckCircle2" as const, color: "text-emerald-400" },
            { label: "Осталось", value: totalTests - totalDone, icon: "Clock" as const, color: "text-orange-400" },
            { label: "Предметов", value: SUBJECTS.length, icon: "BookMarked" as const, color: "text-purple-400" },
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
  );
}

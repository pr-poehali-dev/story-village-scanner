import Icon from "@/components/ui/icon";
import { SUBJECTS, REFERENCES, COLOR_MAP, COLOR_TEXT, COLOR_BG } from "@/components/ogeData";

export function TabCheck() {
  return (
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
  );
}

export function TabReference() {
  return (
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
  );
}

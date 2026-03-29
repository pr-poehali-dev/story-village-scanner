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

export interface Question {
  id: number;
  theme: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const MATH_QUESTIONS: Question[] = [
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
  {
    id: 4,
    theme: "Степени и корни",
    question: "Вычислите: √144 + 2³",
    options: ["20", "18", "16", "22"],
    correct: 0,
    explanation: "√144 = 12, 2³ = 8. Ответ: 12 + 8 = 20.",
  },
  {
    id: 5,
    theme: "Линейные уравнения",
    question: "Решите: 3(x - 4) = 2x + 1",
    options: ["x = 13", "x = 11", "x = 7", "x = 5"],
    correct: 0,
    explanation: "3x - 12 = 2x + 1 → x = 13.",
  },
];

const RUSSIAN_QUESTIONS: Question[] = [
  {
    id: 1,
    theme: "Орфография",
    question: "Выберите слово с буквой «И» в корне:",
    options: ["зар..сль", "прим..рять", "выр..сти", "р..стение"],
    correct: 1,
    explanation: "«Примерять» — корень «мер», нет чередования. Примерять одежду = мерить.",
  },
  {
    id: 2,
    theme: "Пунктуация",
    question: "Где нужна запятая? «Солнце светило ярко (?) и птицы пели громко»",
    options: ["Запятая нужна", "Запятая не нужна", "Нужно тире", "Нужна точка с запятой"],
    correct: 1,
    explanation: "Однородные сказуемые с одним подлежащим, соединённые одиночным «и», запятой не разделяются.",
  },
  {
    id: 3,
    theme: "Морфология",
    question: "Какой частью речи является слово «бегом» в предложении «Он шёл бегом»?",
    options: ["Существительное", "Наречие", "Глагол", "Деепричастие"],
    correct: 1,
    explanation: "«Бегом» отвечает на вопрос «как?» и является наречием образа действия.",
  },
  {
    id: 4,
    theme: "Синтаксис",
    question: "Найдите предложение с обращением:",
    options: [
      "Друг пришёл вовремя.",
      "Друг, ты пришёл вовремя!",
      "Мой друг пришёл.",
      "Пришёл мой лучший друг.",
    ],
    correct: 1,
    explanation: "Обращение — это слово, называющее того, к кому обращаются. Выделяется запятыми.",
  },
  {
    id: 5,
    theme: "Лексика",
    question: "Какое слово является синонимом к слову «храбрый»?",
    options: ["Трусливый", "Смелый", "Осторожный", "Хитрый"],
    correct: 1,
    explanation: "Синонимы — слова близкие по значению. «Смелый» = «храбрый» = «отважный».",
  },
];

const PHYSICS_QUESTIONS: Question[] = [
  {
    id: 1,
    theme: "Механика",
    question: "Тело движется со скоростью 20 м/с. За сколько секунд оно пройдёт 100 м?",
    options: ["5 с", "10 с", "2 с", "20 с"],
    correct: 0,
    explanation: "t = S / v = 100 / 20 = 5 с.",
  },
  {
    id: 2,
    theme: "Термодинамика",
    question: "При каком процессе давление газа не меняется?",
    options: ["Изохорный", "Изотермический", "Изобарный", "Адиабатный"],
    correct: 2,
    explanation: "Изобарный процесс — давление постоянно (p = const).",
  },
  {
    id: 3,
    theme: "Электричество",
    question: "Сила тока 2 А, сопротивление 5 Ом. Найдите напряжение.",
    options: ["2,5 В", "10 В", "7 В", "3 В"],
    correct: 1,
    explanation: "По закону Ома: U = I × R = 2 × 5 = 10 В.",
  },
  {
    id: 4,
    theme: "Оптика",
    question: "Угол падения луча 30°. Чему равен угол отражения?",
    options: ["60°", "45°", "30°", "15°"],
    correct: 2,
    explanation: "По закону отражения: угол падения = угол отражения = 30°.",
  },
  {
    id: 5,
    theme: "Динамика",
    question: "Масса тела 5 кг, сила 20 Н. Найдите ускорение.",
    options: ["0,25 м/с²", "100 м/с²", "4 м/с²", "15 м/с²"],
    correct: 2,
    explanation: "По второму закону Ньютона: a = F / m = 20 / 5 = 4 м/с².",
  },
];

const CHEMISTRY_QUESTIONS: Question[] = [
  {
    id: 1,
    theme: "Периодическая таблица",
    question: "Сколько электронов на внешнем уровне у кислорода (O, №8)?",
    options: ["2", "4", "6", "8"],
    correct: 2,
    explanation: "Кислород: 2,6 — на внешнем уровне 6 электронов. Отсюда валентность II.",
  },
  {
    id: 2,
    theme: "Реакции",
    question: "Какой тип реакции: CaO + H₂O → Ca(OH)₂?",
    options: ["Разложение", "Соединение", "Замещение", "Обмен"],
    correct: 1,
    explanation: "Два вещества соединяются в одно — это реакция соединения.",
  },
  {
    id: 3,
    theme: "Кислоты",
    question: "Какая кислота содержится в желудочном соке?",
    options: ["Серная", "Азотная", "Соляная", "Уксусная"],
    correct: 2,
    explanation: "Желудочный сок содержит соляную кислоту (HCl), pH ≈ 1,5–2.",
  },
  {
    id: 4,
    theme: "Валентность",
    question: "Валентность серы в H₂SO₄:",
    options: ["II", "IV", "VI", "VIII"],
    correct: 2,
    explanation: "В серной кислоте H₂SO₄ валентность серы равна VI (высшая валентность).",
  },
  {
    id: 5,
    theme: "Металлы",
    question: "Какой металл самый лёгкий?",
    options: ["Алюминий", "Железо", "Литий", "Натрий"],
    correct: 2,
    explanation: "Литий (Li) — самый лёгкий металл, плотность 0,534 г/см³.",
  },
];

const HISTORY_QUESTIONS: Question[] = [
  {
    id: 1,
    theme: "Древняя Русь",
    question: "В каком году было Крещение Руси?",
    options: ["862 г.", "988 г.", "1054 г.", "1147 г."],
    correct: 1,
    explanation: "Крещение Руси состоялось в 988 году при князе Владимире Святославиче.",
  },
  {
    id: 2,
    theme: "Монгольское нашествие",
    question: "Кто возглавил монгольское нашествие на Русь в 1237 году?",
    options: ["Чингисхан", "Батый", "Тимур", "Мамай"],
    correct: 1,
    explanation: "Батый (Бату-хан) возглавил западный поход монголов и разорил Рязань, Владимир, Киев.",
  },
  {
    id: 3,
    theme: "Образование государства",
    question: "Когда Москва впервые упоминается в летописях?",
    options: ["1097 г.", "1147 г.", "1223 г.", "1380 г."],
    correct: 1,
    explanation: "Первое упоминание Москвы в летописях — 1147 год, при Юрии Долгоруком.",
  },
  {
    id: 4,
    theme: "Реформы Петра I",
    question: "В каком году Пётр I принял титул императора?",
    options: ["1700 г.", "1709 г.", "1721 г.", "1725 г."],
    correct: 2,
    explanation: "В 1721 году после победы в Северной войне Пётр I принял титул Императора Всероссийского.",
  },
  {
    id: 5,
    theme: "XIX век",
    question: "В каком году было отменено крепостное право в России?",
    options: ["1825 г.", "1842 г.", "1861 г.", "1881 г."],
    correct: 2,
    explanation: "Манифест об отмене крепостного права подписан Александром II 19 февраля 1861 года.",
  },
];

const BIOLOGY_QUESTIONS: Question[] = [
  {
    id: 1,
    theme: "Клетка",
    question: "Какой органоид является «энергетической станцией» клетки?",
    options: ["Ядро", "Рибосома", "Митохондрия", "Вакуоль"],
    correct: 2,
    explanation: "Митохондрии синтезируют АТФ — основной источник энергии для клетки.",
  },
  {
    id: 2,
    theme: "Фотосинтез",
    question: "Где в клетке растения происходит фотосинтез?",
    options: ["Митохондрии", "Хлоропласты", "Лизосомы", "Ядро"],
    correct: 1,
    explanation: "Фотосинтез происходит в хлоропластах — органоидах, содержащих хлорофилл.",
  },
  {
    id: 3,
    theme: "Генетика",
    question: "Сколько хромосом в соматической клетке человека?",
    options: ["23", "46", "48", "92"],
    correct: 1,
    explanation: "Соматические клетки человека диплоидные: 46 хромосом (23 пары).",
  },
  {
    id: 4,
    theme: "Системы органов",
    question: "Какой орган вырабатывает инсулин?",
    options: ["Печень", "Почки", "Поджелудочная железа", "Надпочечники"],
    correct: 2,
    explanation: "Инсулин вырабатывается β-клетками островков Лангерганса поджелудочной железы.",
  },
  {
    id: 5,
    theme: "Экология",
    question: "Кто является производителем (продуцентом) в экосистеме?",
    options: ["Хищники", "Травоядные", "Растения", "Грибы"],
    correct: 2,
    explanation: "Продуценты — организмы, производящие органику из неорганики с помощью фотосинтеза, это растения.",
  },
];

const GEOGRAPHY_QUESTIONS: Question[] = [
  {
    id: 1,
    theme: "Карта мира",
    question: "Какой материк самый большой по площади?",
    options: ["Африка", "Северная Америка", "Евразия", "Антарктида"],
    correct: 2,
    explanation: "Евразия — крупнейший материк, площадь около 54,8 млн км².",
  },
  {
    id: 2,
    theme: "Климат",
    question: "Какой климатический пояс расположен вдоль экватора?",
    options: ["Тропический", "Субэкваториальный", "Экваториальный", "Умеренный"],
    correct: 2,
    explanation: "Вдоль экватора (0°) находится экваториальный пояс — жаркий и влажный круглый год.",
  },
  {
    id: 3,
    theme: "Россия",
    question: "Какое озеро является самым глубоким в мире?",
    options: ["Каспийское море", "Байкал", "Ладожское", "Аральское"],
    correct: 1,
    explanation: "Байкал — самое глубокое озеро мира, максимальная глубина 1642 м.",
  },
  {
    id: 4,
    theme: "Рельеф",
    question: "Какая гора является высочайшей на Земле?",
    options: ["Эльбрус", "Монблан", "Эверест (Джомолунгма)", "Килиманджаро"],
    correct: 2,
    explanation: "Эверест (Джомолунгма) — 8849 м, высочайшая вершина мира (Гималаи).",
  },
  {
    id: 5,
    theme: "Население",
    question: "Какая страна самая населённая в мире?",
    options: ["Россия", "США", "Индия", "Китай"],
    correct: 2,
    explanation: "По последним данным Индия опередила Китай и стала самой населённой страной (более 1,4 млрд).",
  },
];

const INFORMATICS_QUESTIONS: Question[] = [
  {
    id: 1,
    theme: "Системы счисления",
    question: "Переведите число 10 из десятичной в двоичную систему:",
    options: ["1010", "1100", "1001", "0110"],
    correct: 0,
    explanation: "10 = 8 + 2 = 2³ + 2¹ = 1010₂.",
  },
  {
    id: 2,
    theme: "Алгоритмы",
    question: "Какой оператор используется для ветвления в алгоритме?",
    options: ["Цикл", "Условие (если-то)", "Присваивание", "Вывод"],
    correct: 1,
    explanation: "Ветвление — конструкция «если условие, то действие А, иначе действие Б».",
  },
  {
    id: 3,
    theme: "Единицы информации",
    question: "Сколько байт в 1 килобайте?",
    options: ["100", "256", "1000", "1024"],
    correct: 3,
    explanation: "1 килобайт = 2¹⁰ = 1024 байта (в стандарте IEC).",
  },
  {
    id: 4,
    theme: "Сети",
    question: "Что такое IP-адрес?",
    options: [
      "Имя пользователя в сети",
      "Уникальный адрес устройства в сети",
      "Пароль для входа в интернет",
      "Название браузера",
    ],
    correct: 1,
    explanation: "IP-адрес — уникальный числовой идентификатор устройства в компьютерной сети.",
  },
  {
    id: 5,
    theme: "Логика",
    question: "Результат операции: 1 AND 0 =",
    options: ["1", "0", "2", "−1"],
    correct: 1,
    explanation: "Логическое И (AND): 1 AND 0 = 0. Истина только когда оба операнда = 1.",
  },
];

export const ALL_QUESTIONS: Record<string, Question[]> = {
  math: MATH_QUESTIONS,
  russian: RUSSIAN_QUESTIONS,
  physics: PHYSICS_QUESTIONS,
  chemistry: CHEMISTRY_QUESTIONS,
  history: HISTORY_QUESTIONS,
  biology: BIOLOGY_QUESTIONS,
  geography: GEOGRAPHY_QUESTIONS,
  informatics: INFORMATICS_QUESTIONS,
};

export const REFERENCES: { subject: string; topic: string; icon: IconName; color: string }[] = [
  { subject: "Математика", topic: "Формулы квадратных уравнений", icon: "Calculator", color: "purple" },
  { subject: "Русский", topic: "Правила пунктуации", icon: "BookOpen", color: "cyan" },
  { subject: "Физика", topic: "Основные формулы механики", icon: "Zap", color: "orange" },
  { subject: "Химия", topic: "Таблица растворимости", icon: "FlaskConical", color: "pink" },
  { subject: "История", topic: "Хронология ключевых дат", icon: "Landmark", color: "green" },
  { subject: "Биология", topic: "Строение клетки", icon: "Leaf", color: "cyan" },
];

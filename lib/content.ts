export const OFFICE_ADDRESS = {
  line1: "1502, One Lodha Place",
  line2: "Lower Parel",
  city: "Mumbai, Maharashtra 400013",
  country: "India",
};

export const TERMINAL_LINES = [
  "> IWM Quant research shell — online.",
  "> loading market data pipeline........ OK",
  "> hypothesis queue..................... 3 pending review",
  "> walk-forward validation.............. in progress",
  "> regime monitor....................... calm / trending",
  "> risk limits.......................... all green",
  "> execution quality audit.............. scheduled 16:00 IST",
  "> ▌ready. what shall we test today?",
];

export const ABOUT = {
  heading: "A research firm that happens to trade",
  paragraphs: [
    "IWM Quant — I Wealth Management Quant — is a proprietary quantitative trading and research firm based in Mumbai. We apply the scientific method to financial markets: form a hypothesis, test it honestly against data, and only then let it near capital.",
    "Our edge doesn't come from secrets or speed alone. It comes from a culture that treats every market question as a puzzle worth solving properly — with statistics, software, and healthy scepticism about our own ideas.",
    "We are deliberately small and deeply collaborative. Researchers, developers and traders sit at one desk, argue about assumptions in the open, and share ownership of every strategy that goes live.",
  ],
  chips: ["Research-driven", "Technology-first", "Risk-obsessed", "Collaborative by design"],
};

export const PILLARS = [
  {
    title: "Quantitative Research",
    body: "We study how prices actually behave — market microstructure, cross-sectional patterns, volatility dynamics — and turn what survives rigorous testing into systematic strategies.",
    icon: "Σ",
  },
  {
    title: "Trading Technology",
    body: "Our researchers and engineers build the full stack in-house: data pipelines, simulation environments, risk systems and execution infrastructure designed to be fast, measured and reliable.",
    icon: "λ",
  },
  {
    title: "Risk & Portfolio Science",
    body: "Position sizing, drawdown control and portfolio construction are first-class research problems here — because staying in the game matters more than any single trade.",
    icon: "∂",
  },
];

export const CULTURE = {
  heading: "We take games seriously",
  intro:
    "Great trading decisions are made under uncertainty, with incomplete information and real stakes. That's exactly what good games teach. Game-playing isn't a perk at IWM Quant — it's part of how we train judgment.",
  cards: [
    {
      icon: "♠",
      title: "Poker nights",
      body: "Thinking in probabilities, sizing bets to conviction, folding gracefully when the evidence turns against you — poker is our favourite classroom for expected value.",
    },
    {
      icon: "♞",
      title: "Chess & Go",
      body: "Long-horizon planning under constraints. Weekly boards in the office teach patience, positional judgment and the cost of a single careless move.",
    },
    {
      icon: "🎯",
      title: "Strategy & simulation games",
      body: "Fast decisions with incomplete information, from trading simulations to strategy video games. Team tournaments every quarter — bragging rights are permanent.",
    },
    {
      icon: "⚙",
      title: "Hackathons & puzzle hunts",
      body: "Two internal hackathons a year and a standing puzzle ladder. Some of our production tooling started life as a weekend hack.",
    },
  ],
};

export type LabStatus = "RUNNING" | "CALIBRATING" | "BACKTESTING" | "PAUSED";

export const LAB_EXPERIMENTS: {
  id: string;
  name: string;
  status: LabStatus;
  body: string;
  tags: string[];
  spark: number[];
}[] = [
  {
    id: "EXP-001",
    name: "Neural Architecture Search",
    status: "RUNNING",
    body: "Automated exploration of network architectures for short-horizon signal extraction — letting the search space surprise us instead of hand-designing every model.",
    tags: ["deep learning", "intraday", "automl"],
    spark: [3, 4, 3.6, 5, 5.4, 5.1, 6.2, 6.8, 6.5, 7.4, 8.1, 7.8, 8.6, 9.2],
  },
  {
    id: "EXP-002",
    name: "Regime-Switching Models",
    status: "RUNNING",
    body: "Hidden Markov cascades that classify the market's mood — trending, choppy, stressed — so every downstream strategy can adapt its behaviour in real time.",
    tags: ["regimes", "hmm", "adaptive sizing"],
    spark: [5, 5.6, 5.2, 6, 5.4, 6.6, 6.2, 7, 6.4, 7.6, 7.2, 8, 7.6, 8.4],
  },
  {
    id: "EXP-003",
    name: "Order-Flow Imbalance Alpha",
    status: "CALIBRATING",
    body: "Translating order-book pressure into short-horizon directional forecasts, with careful attention to how market impact decays across venues.",
    tags: ["microstructure", "order book", "short horizon"],
    spark: [4, 3.4, 4.6, 4, 5.2, 4.4, 5.6, 5, 6.2, 5.4, 6.6, 6, 7, 6.6],
  },
  {
    id: "EXP-004",
    name: "Options Surface Relative Value",
    status: "PAUSED",
    body: "Relative-value structures across the implied volatility surface. Paused while we study expiry-week liquidity before committing further capital.",
    tags: ["derivatives", "volatility", "relative value"],
    spark: [6, 6.4, 6.1, 6.6, 6.2, 6.7, 6.4, 6.8, 6.5, 6.8, 6.6, 6.7, 6.7, 6.7],
  },
  {
    id: "EXP-005",
    name: "Text-to-Signal Distillation",
    status: "RUNNING",
    body: "Language-model pipelines that read filings, news and transcripts, and distil them into orthogonal factors a portfolio can actually use.",
    tags: ["nlp", "alternative data", "factors"],
    spark: [3, 3.8, 3.4, 4.4, 4, 5, 4.6, 5.6, 5.2, 6.2, 5.8, 6.8, 6.4, 7.4],
  },
  {
    id: "EXP-006",
    name: "RL Portfolio Allocation",
    status: "BACKTESTING",
    body: "A reinforcement-learning agent that allocates risk across sub-strategies, trained against simulated regime shifts so it learns humility before it meets real markets.",
    tags: ["reinforcement learning", "allocation", "simulation"],
    spark: [2, 3, 2.6, 3.8, 3.2, 4.4, 4, 5.2, 4.6, 5.8, 5.4, 6.6, 6.2, 7.6],
  },
];

export const RESEARCH: {
  id: string;
  title: string;
  tag: string;
  date: string;
  abstract: string;
  featured?: boolean;
}[] = [
  {
    id: "RP-2026-04",
    title: "Quantum-Inspired Pattern Recognition in Market Anomalies",
    tag: "MACHINE LEARNING",
    date: "2026-05",
    abstract:
      "We explore quantum-inspired kernel methods for separating genuine structural breaks from noise in order-flow data, and discuss where these feature maps meaningfully outperform classical dimensionality reduction — and where they simply overfit beautifully.",
    featured: true,
  },
  {
    id: "RP-2026-03",
    title: "Microstructure: Noise or Signal? Order-Book Dynamics at Short Horizons",
    tag: "MICROSTRUCTURE",
    date: "2026-03",
    abstract:
      "A study of queue dynamics in limit order books, examining when the shape and evolution of the book carries exploitable directional information — after realistic costs — and when it is merely noise wearing a convincing costume.",
  },
  {
    id: "RP-2026-02",
    title: "Regime Detection with Hidden Markov Cascades",
    tag: "REGIMES",
    date: "2026-02",
    abstract:
      "Stacked hidden Markov models can flag transitions between market regimes earlier than simple volatility thresholds. We discuss the design choices that matter, and the failure modes that make naive implementations dangerous.",
  },
  {
    id: "RP-2026-01",
    title: "Cross-Sectional Momentum in Small Caps",
    tag: "FACTORS",
    date: "2026-01",
    abstract:
      "Momentum in less liquid names is real but fragile: execution style determines whether the edge survives. We map how liquidity-aware scheduling changes the capacity and character of the strategy.",
  },
  {
    id: "RP-2025-06",
    title: "Volatility Surface Forecasting with Temporal Transformers",
    tag: "DERIVATIVES",
    date: "2025-11",
    abstract:
      "Attention-based models that treat the implied-volatility surface as a sequence learn structure that parametric interpolation misses — particularly in the wings, where the interesting risk lives.",
  },
  {
    id: "RP-2025-05",
    title: "Tail-Risk Hedging with Convex Overlays",
    tag: "RISK",
    date: "2025-09",
    abstract:
      "Systematic option overlays can convert catastrophic drawdowns into survivable ones for a modest, budgeted cost. We frame hedging as insurance design and study what makes an overlay worth its premium.",
  },
];

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Data",
    body: "Clean, versioned, point-in-time-correct market and alternative data. Most quant failures are data failures in disguise, so this layer gets obsessive attention.",
  },
  {
    n: "02",
    title: "Signal",
    body: "Every hypothesis fights for its life: out-of-sample validation, regime slicing, decay analysis. Most ideas die here — and that's the system working.",
  },
  {
    n: "03",
    title: "Risk",
    body: "Hard drawdown budgets, factor-aware construction, convex tail protection. The portfolio is engineered to survive the day we're wrong.",
  },
  {
    n: "04",
    title: "Execution",
    body: "Microstructure-aware execution that measures every basis point of cost. Alpha is discovered in research — it is kept or lost in execution.",
  },
];

export const PRINCIPLES = [
  { title: "Evidence over ego", body: "If the data disagrees with the story, the story loses." },
  { title: "Risk is a budget", body: "Spent deliberately, never discovered after the fact." },
  { title: "Small edges, compounded", body: "We industrialise many modest edges instead of hunting one miracle." },
  { title: "Automation with judgment", body: "Machines execute; humans own the assumptions." },
  { title: "Capacity honesty", body: "Every strategy has limits — we measure and respect them." },
  { title: "Kill switches everywhere", body: "Anything live can be halted instantly, by anyone on the desk." },
];

export type Role = {
  id: string;
  title: string;
  type: "Full-time" | "Internship" | "Graduate";
  team: string;
  location: string;
  blurb: string;
  skills: string[];
};

export const ROLES: Role[] = [
  {
    id: "QR-01",
    title: "Quantitative Researcher",
    type: "Full-time",
    team: "Research",
    location: "Mumbai",
    blurb:
      "Design, test and productionise predictive models for systematic strategies. You'll own ideas end-to-end — from hypothesis to live monitoring — and defend them in open research reviews.",
    skills: ["probability & statistics", "Python", "ML fundamentals", "intellectual honesty"],
  },
  {
    id: "QD-01",
    title: "Quantitative Developer",
    type: "Full-time",
    team: "Technology",
    location: "Mumbai",
    blurb:
      "Build the systems the desk runs on: market data pipelines, backtesting engines, execution and risk infrastructure. Performance matters, but correctness matters more.",
    skills: ["C++ or Rust", "Python", "distributed systems", "care for correctness"],
  },
  {
    id: "QT-01",
    title: "Quantitative Trader",
    type: "Full-time",
    team: "Trading",
    location: "Mumbai",
    blurb:
      "Run live systematic strategies, make risk decisions in real time, and feed what the market teaches you back into research. Calm under pressure, ruthless with expected value.",
    skills: ["probabilistic thinking", "game theory", "mental arithmetic", "composure"],
  },
  {
    id: "DE-01",
    title: "Data Engineer",
    type: "Full-time",
    team: "Technology",
    location: "Mumbai",
    blurb:
      "Own the data layer that everything else depends on — ingestion, validation, versioning and point-in-time correctness across market and alternative datasets.",
    skills: ["Python", "SQL", "data pipelines", "attention to detail"],
  },
  {
    id: "IN-01",
    title: "Quant Internship (Summer)",
    type: "Internship",
    team: "Research / Technology",
    location: "Mumbai",
    blurb:
      "Ten weeks embedded with the desk, working on a real research or infrastructure problem with a dedicated mentor. Strong interns receive full-time offers.",
    skills: ["strong math/CS fundamentals", "curiosity", "love of puzzles"],
  },
  {
    id: "GR-01",
    title: "Graduate Programme",
    type: "Graduate",
    team: "Rotational",
    location: "Mumbai",
    blurb:
      "A structured first year rotating across research, technology and trading before you specialise. Learn how the whole machine works, then pick where you make it better.",
    skills: ["recent STEM degree", "competitive drive", "team-first mindset"],
  },
];

export const PERKS = [
  { icon: "♟", title: "Games culture", body: "Poker nights, chess ladder, strategy-game tournaments and an actual games room — because decision training should be fun." },
  { icon: "📚", title: "Learning budget", body: "Books, courses and conferences funded, plus internal seminars where anyone can teach anything." },
  { icon: "🌐", title: "Global markets exposure", body: "Work across asset classes and geographies from day one — small firm, wide canvas." },
  { icon: "🤝", title: "Flat by design", body: "One open desk. The best argument wins, regardless of whose it is." },
  { icon: "⚡", title: "Serious tooling", body: "Research clusters, quality data and fast iteration loops. We don't make smart people wait on slow machines." },
  { icon: "🩺", title: "Health & food", body: "Comprehensive insurance, a stocked kitchen, and proper coffee within arm's reach of every desk." },
];

export const HIRING_STEPS = [
  {
    n: "01",
    title: "Application",
    body: "A CV and a few short answers. No cover-letter theatre — we read for evidence of curiosity and rigour.",
  },
  {
    n: "02",
    title: "Games & puzzles",
    body: "Probability puzzles, market games and brainteasers — done live, so we can see how you think, not just what you memorised.",
  },
  {
    n: "03",
    title: "Technical rounds",
    body: "Deep dives with the people you'd actually work with: statistics and modelling for research, systems and code for engineering.",
  },
  {
    n: "04",
    title: "Desk visit & offer",
    body: "Spend time with the team, ask us anything, then decide. We move fast when we're excited — and we tell you either way.",
  },
];

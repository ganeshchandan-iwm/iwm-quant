export const OFFICE_ADDRESS = {
  line1: "1502, One Lodha Place",
  line2: "Lower Parel",
  city: "Mumbai, Maharashtra 400013",
  country: "India",
};

export const TICKER: { sym: string; px: string; chg: number }[] = [
  { sym: "NIFTY 50", px: "24,812.40", chg: +0.62 },
  { sym: "SENSEX", px: "81,342.15", chg: +0.48 },
  { sym: "BANKNIFTY", px: "53,118.90", chg: -0.21 },
  { sym: "IWM", px: "228.44", chg: +1.12 },
  { sym: "SPX", px: "6,148.02", chg: +0.34 },
  { sym: "NDX", px: "22,410.77", chg: +0.71 },
  { sym: "USDINR", px: "85.62", chg: -0.08 },
  { sym: "GOLD", px: "3,342.10", chg: +0.29 },
  { sym: "CRUDE", px: "68.14", chg: -1.05 },
  { sym: "VIX", px: "13.87", chg: -3.42 },
  { sym: "BTCUSD", px: "108,240", chg: +2.18 },
  { sym: "US10Y", px: "4.28%", chg: +0.02 },
];

export const TERMINAL_LINES = [
  "> IWM Quant System v2026.07 online.",
  "> Connecting to market data bus... OK (2ms)",
  "> [09:15:02] Scanning 2,000+ symbols across NSE / BSE / CME...",
  "> [09:15:04] Regime detected: LOW-VOL DRIFT · confidence 0.87",
  "> [09:15:09] Signal #4821 armed · long basket (12 names)",
  "> [09:15:11] Risk check passed · drawdown budget 1.2%",
  "> [09:15:12] Orders routed · slippage 0.4 bps",
  "> ▌Awaiting next anomaly...",
];

export const STATS = [
  { value: 2.1, suffix: "B+", label: "market ticks processed daily", decimals: 1 },
  { value: 240, suffix: "+", label: "live signals in production", decimals: 0 },
  { value: 0.3, suffix: "ms", label: "median decision latency", decimals: 1 },
  { value: 99.98, suffix: "%", label: "system uptime", decimals: 2 },
];

export const PILLARS = [
  {
    title: "Systematic Alpha",
    body: "Hypothesis-driven signals mined from price, flow and alternative data — validated out-of-sample before a single rupee is risked.",
    icon: "Σ",
  },
  {
    title: "Risk Engineering",
    body: "Portfolio construction with hard drawdown budgets, regime-aware sizing and convex tail hedges. Survival first, returns second.",
    icon: "∂",
  },
  {
    title: "Execution Research",
    body: "Microstructure-aware routing that measures every basis point of slippage. Alpha is earned in research and kept in execution.",
    icon: "λ",
  },
];

export const EQUITY_CURVE = [
  100, 101.2, 100.6, 102.4, 103.1, 102.7, 104.6, 105.9, 105.1, 107.2, 108.8,
  108.1, 110.4, 111.2, 113.0, 112.1, 114.7, 116.3, 115.4, 118.1, 119.6, 118.9,
  121.4, 123.2, 122.5, 125.1, 127.0, 126.2, 129.3, 131.1, 130.2, 133.5, 135.4,
  134.5, 137.9, 140.2,
];

export type LabStatus = "RUNNING" | "CALIBRATING" | "BACKTESTING" | "PAUSED";

export const LAB_EXPERIMENTS: {
  id: string;
  name: string;
  status: LabStatus;
  body: string;
  metrics: { label: string; value: string }[];
  spark: number[];
}[] = [
  {
    id: "EXP-001",
    name: "Neural Architecture Search",
    status: "RUNNING",
    body: "Automated discovery of optimal network architectures for high-frequency signal extraction. Population of 512 candidate nets evolved nightly.",
    metrics: [
      { label: "accuracy", value: "94.7%" },
      { label: "latency", value: "0.3ms" },
      { label: "gen", value: "#1,204" },
    ],
    spark: [3, 4, 3.6, 5, 5.4, 5.1, 6.2, 6.8, 6.5, 7.4, 8.1, 7.8, 8.6, 9.2],
  },
  {
    id: "EXP-002",
    name: "Regime-Switching HMM",
    status: "RUNNING",
    body: "Hidden Markov cascade that classifies intraday market regimes — trend, chop, panic — and re-weights every downstream signal in real time.",
    metrics: [
      { label: "hit rate", value: "71.2%" },
      { label: "states", value: "6" },
      { label: "switch lag", value: "1.8s" },
    ],
    spark: [5, 5.6, 5.2, 6, 5.4, 6.6, 6.2, 7, 6.4, 7.6, 7.2, 8, 7.6, 8.4],
  },
  {
    id: "EXP-003",
    name: "Order-Flow Imbalance Alpha",
    status: "CALIBRATING",
    body: "Level-2 order-book pressure translated into 30–300 second directional forecasts. Currently calibrating impact decay across venues.",
    metrics: [
      { label: "IC", value: "0.084" },
      { label: "horizon", value: "120s" },
      { label: "venues", value: "3" },
    ],
    spark: [4, 3.4, 4.6, 4, 5.2, 4.4, 5.6, 5, 6.2, 5.4, 6.6, 6, 7, 6.6],
  },
  {
    id: "EXP-004",
    name: "Options Surface Arbitrage",
    status: "PAUSED",
    body: "Relative-value trades across the implied volatility surface. Paused pending expiry-week liquidity study.",
    metrics: [
      { label: "sharpe (bt)", value: "2.4" },
      { label: "capacity", value: "med" },
      { label: "greeks", value: "hedged" },
    ],
    spark: [6, 6.4, 6.1, 6.6, 6.2, 6.7, 6.4, 6.8, 6.5, 6.8, 6.6, 6.7, 6.7, 6.7],
  },
  {
    id: "EXP-005",
    name: "Sentiment Distillation Engine",
    status: "RUNNING",
    body: "LLM pipeline that distills filings, news and social flow into a single orthogonal sentiment factor, refreshed every 90 seconds.",
    metrics: [
      { label: "docs/day", value: "1.4M" },
      { label: "factor IC", value: "0.061" },
      { label: "refresh", value: "90s" },
    ],
    spark: [3, 3.8, 3.4, 4.4, 4, 5, 4.6, 5.6, 5.2, 6.2, 5.8, 6.8, 6.4, 7.4],
  },
  {
    id: "EXP-006",
    name: "RL Portfolio Allocator",
    status: "BACKTESTING",
    body: "Reinforcement-learning agent allocating risk across 40+ sub-strategies, trained against 15 years of simulated regime shifts.",
    metrics: [
      { label: "episodes", value: "2.6M" },
      { label: "reward", value: "+18.4" },
      { label: "epoch", value: "77" },
    ],
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
    title: "Quantum Pattern Recognition in Market Anomalies",
    tag: "MACHINE LEARNING",
    date: "2026-05",
    abstract:
      "We map order-flow anomalies onto quantum-inspired kernel spaces and show that entanglement-motivated feature maps separate structural breaks from noise 3.2× better than classical PCA baselines.",
    featured: true,
  },
  {
    id: "RP-2026-03",
    title: "Microstructure: Noise or Signal? Order-Book Dynamics at 100ms",
    tag: "MICROSTRUCTURE",
    date: "2026-03",
    abstract:
      "A study of 4.8 billion order-book events showing that queue-position decay contains exploitable directional information up to 40 seconds ahead — after fees.",
  },
  {
    id: "RP-2026-02",
    title: "Regime Detection with Hidden Markov Cascades",
    tag: "REGIMES",
    date: "2026-02",
    abstract:
      "Stacked HMMs detect regime transitions 11 minutes earlier than volatility-threshold rules, cutting strategy drawdowns by 34% in walk-forward tests.",
  },
  {
    id: "RP-2026-01",
    title: "Cross-Sectional Momentum in Small Caps",
    tag: "FACTORS",
    date: "2026-01",
    abstract:
      "Small-cap momentum survives transaction costs only when execution is liquidity-scheduled; we quantify the capacity frontier at ₹120 crore per day.",
  },
  {
    id: "RP-2025-06",
    title: "Volatility Surface Forecasting with Temporal Transformers",
    tag: "DERIVATIVES",
    date: "2025-11",
    abstract:
      "Attention over the full implied-volatility surface beats SABR-based interpolation by 22% RMSE at the weekly horizon, with the largest gains in wings.",
  },
  {
    id: "RP-2025-05",
    title: "Tail-Risk Hedging with Convex Overlays",
    tag: "RISK",
    date: "2025-09",
    abstract:
      "A systematic put-spread-collar overlay that costs 80 bps annually and cut the 2025 April drawdown from −9.4% to −3.1% in live trading.",
  },
];

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Data",
    body: "Terabytes of tick, order-book, fundamental and alternative data — cleaned, versioned, and point-in-time correct. Garbage never gets in.",
  },
  {
    n: "02",
    title: "Signal",
    body: "Every hypothesis fights for its life: out-of-sample validation, regime slicing, decay analysis. Fewer than 4% of ideas reach production.",
  },
  {
    n: "03",
    title: "Risk",
    body: "Hard drawdown budgets, factor-neutral construction, convex tail hedges. The portfolio is engineered to survive the day we're wrong.",
  },
  {
    n: "04",
    title: "Execution",
    body: "Microstructure-aware routing measures every basis point. Alpha is discovered in research — it is kept or lost in execution.",
  },
];

export const PRINCIPLES = [
  { title: "Evidence over ego", body: "If the data disagrees with the story, the story loses." },
  { title: "Risk is a budget", body: "Spent deliberately, never discovered after the fact." },
  { title: "Small edges, compounded", body: "We industrialise many modest edges instead of hunting one miracle." },
  { title: "Automation with judgment", body: "Machines execute; humans own the assumptions." },
  { title: "Capacity honesty", body: "Every strategy carries a measured capacity — and we respect it." },
  { title: "Kill switches everywhere", body: "Anything live can be halted in under a second." },
];
